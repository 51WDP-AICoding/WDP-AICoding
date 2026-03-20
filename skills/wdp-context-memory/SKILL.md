---
name: wdp-context-memory
description: WDP 结构化状态管理技能。解决 Agent 长流程任务中的"记忆变形"与"指令幻觉"问题，通过三层状态架构（Hot/Warm/Cold Memory）确保各 wdp-api-* 技能调用时的逻辑一致性。
---

# WDP Context Memory 技能

## 🎯 核心设计目标

停止让 Agent 以"对话摘要"的形式记忆，转而以**结构化状态表（Structured State Table）**的形式维护实时上下文。

### 解决的核心问题
1. **记忆变形（Memory Deformation）** - 长对话后 Agent 对早期状态的记忆模糊或错误
2. **指令幻觉** - Agent 基于假设而非实际状态做决策
3. **状态不一致** - 多个 Skill 各自维护状态导致冲突

---

## 🏗️ 三层状态架构

### A. 瞬时工作区 (Transient State / Hot Memory)
**用途**：存储当前步操作所需的原子信息  
**生命周期**：单步操作，高频读写，随任务阶段快速更新

```javascript
// 典型字段
transient: {
  selection: { entity, nodeId, screenPosition },  // 当前选中对象
  camera: { location, rotation, zoom },           // 当前相机参数
  lastApiCall: { method, params, response },      // 上一次API调用记录
  interactionMode: "select"                       // 当前交互模式
}
```

### B. 空间与环境上下文 (Spatial Context / Warm Memory)
**用途**：存储场景内的空间关系  
**生命周期**：跨多个指令有效，场景切换或重置时变更

```javascript
// 典型字段
spatial: {
  coordinateSystem: "global",                     // Global/Local/Relative
  sceneOrigin: { location, crs },                 // 场景原点/锚点
  activeLayers: [{ layerId, visible, opacity }], // 已激活的环境图层
  spatialAnchors: [{ anchorId, label, location }], // 用户提及的空间锚点
  loadedEntities: [{ eid, entityName, type }]    // 已加载的实体清单
}
```

### C. 任务进度树 (Task Progress / Cold Memory)
**用途**：追踪宏观目标的达成情况  
**生命周期**：整个任务期间，只读为主，用于逻辑闭环判断

```javascript
// 典型字段
task: {
  goal: "string",                                 // 最终目标描述
  status: "in_progress",                          // pending/completed/failed
  completedSteps: [{ stepId, description, result }], // 已完成步骤
  pendingSteps: [{ stepId, dependencies, blocking }], // 待执行步骤
  slots: { required: [], optional: [] }           // 待确认的参数槽位
}
```

---

## 🔌 标准化交互协议

### 1. ReadState(key_path)
**触发场景**：任何 Skill 需要获取上下文信息时

```javascript
// 允许使用路径表达式精准读取
ReadState("transient.selection.entity.eid")
ReadState("spatial.loadedEntities")
ReadState("task.pendingSteps[0]")

// 拒绝全文读取，节省 Token
// ❌ 错误：ReadState() 不带参数返回整个状态树
```

**Agent 提示词**：
> 当需要获取上下文时，使用 `ReadState(key_path)`。必须使用精准路径，如 `transient.camera.location` 而非读取整个状态树。路径使用点号分隔，数组使用索引如 `loadedEntities[0]`。

### 2. UpdateState(patch_json)
**触发场景**：任何对环境造成改变的 API 调用后

```javascript
// 采用 JSON Patch 模式进行局部更新
UpdateState({
  "transient.selection.entity": { eid: "123", type: "HierarchyMeshEntity" },
  "transient.lastApiCall": { method: "Scene.GetByEids", success: true }
})

// 自动记录时间戳
// _meta.updatedAt 会自动更新
```

**Agent 提示词**：
> 执行任何改变场景的 API 调用后，必须使用 `UpdateState()` 回写状态。采用 JSON Patch 格式，只更新变更的字段。禁止私自缓存状态到变量中。

### 3. ValidateConsistency()
**触发场景**：每 3-5 轮对话后，或检测到潜在冲突时

```javascript
// 检查清单
ValidateConsistency([
  { path: "task.goal", check: "not_empty", critical: true },
  { path: "spatial.loadedEntities", check: "length_gt_0", msg: "场景为空但未初始化" },
  { path: "transient.selection", check: "optional", msg: "未选中对象可能影响操作" }
])
```

**Agent 提示词**：
> 每完成 3-5 步操作或感知到逻辑冲突时，调用 `ValidateConsistency()`。检查状态与自然语言需求是否冲突。若冲突，强制触发澄清流程，禁止基于假设继续执行。

---

## 🛡️ 记忆一致性保障机制

### 1. 强制 Schema 约束
```javascript
// 所有写入必须通过 Schema 校验
UpdateState({
  "transient.camera.location": [1, 2]  // ❌ 错误：Vector3 需要 3 个元素
})
// 报错：ValidationError: Vector3 requires exactly 3 items

UpdateState({
  "spatial.coordinateSystem": "invalid"  // ❌ 错误：必须是 enum 之一
})
// 报错：ValidationError: must be one of ["global", "local", "relative"]
```

### 2. 单一事实来源 (SSoT)
**强制性规定**：
- ❌ 禁止各 `wdp-api-*` Skill 私自缓存状态
- ✅ 所有状态必须统一通过 `wdp-context-memory` 进行交换
- ✅ 任何状态变更必须通过 `UpdateState()` 回写

### 3. 自动修剪 (Pruning)
**触发条件**：
- `transient` 区域超过 20 个字段时
- 任务目标切换时（如从"加载模型"切换到"楼层显隐"）
- 用户明确说"重新开始"或"换一个新的任务"

**修剪策略**：
```javascript
// 归档到 cold storage
archive("transient.lastApiCall", { reason: "task_switch", timestamp })

// 清理临时变量
prune("transient.temp_*")  // 删除所有以 temp_ 开头的字段
```

---

## 📁 持久化存储

### 存储位置
```
[工作库根目录]/
├── skills/
├── temp_optimization/
└── .context-memory/           # ← Git 忽略
    ├── {taskId}_memory.json   # 状态文件
    ├── {taskId}_archive.json  # 归档文件
    └── manifest.json          # 任务索引
```

### 初始化流程
**新对话/新任务开始时**：
1. 检查是否存在未完成的同 ID 任务
2. 询问用户是否恢复或重新开始
3. 如无明确指令，默认创建新的内存文件

---

## 🔄 Skill 集成标准步骤

### 调用前（Before）
```javascript
// 1. 读取所需上下文
const selection = ReadState("transient.selection.entity")
const camera = ReadState("transient.camera")

// 2. 校验前置条件
if (!selection) {
  throw new PreconditionError("No entity selected")
}
```

### 调用后（After）
```javascript
// 1. 执行 API 调用
const result = await App.Scene.GetByEids([eid])

// 2. 更新状态（强制）
UpdateState({
  "transient.lastApiCall": {
    method: "Scene.GetByEids",
    params: { eid },
    response: { success: result.success },
    timestamp: new Date().toISOString()
  }
})

// 3. 如结果影响空间上下文，更新 Warm Memory
if (result.success && result.result.length > 0) {
  UpdateState({
    "spatial.loadedEntities": [...loadedEntities, newEntity]
  })
}
```

---

## 📝 Agent 使用提示词

### 场景 1：初始化任务
> 用户开启新任务时，创建新的 Context Memory。询问用户存储位置，如无明确指定，使用默认路径 `{workspace}/.context-memory/{taskId}_memory.json`。设置 `task.goal` 为用户需求描述，初始化 `pendingSteps` 为待办清单。

### 场景 2：执行 API 调用
> 调用任何 WDP API 前，先 `ReadState` 获取所需上下文。调用后必须 `UpdateState` 记录调用结果。禁止私自缓存任何状态到局部变量。

### 场景 3：检测冲突
> 当用户指令与当前状态冲突时（如"隐藏刚才选中的楼层"但 `transient.selection` 为空），立即调用 `ValidateConsistency()`。若确认冲突，停止执行并询问用户澄清，禁止基于假设推断。

### 场景 4：任务切换
> 当用户说"换个任务"或"现在做另一件事"时，触发自动修剪。将当前 transient 状态归档，保留 spatial 和 task 结构，重新初始化 pendingSteps。

---

## 📋 验证清单

- [ ] 所有状态变更通过 `UpdateState()` 完成
- [ ] 读取状态使用精准路径 `ReadState("a.b.c")`
- [ ] 每 3-5 步执行一次 `ValidateConsistency()`
- [ ] 不私自缓存状态到 Skill 内部变量
- [ ] 定期自动修剪过期 transient 数据
- [ ] 持久化文件存储在 `.context-memory/` 并 Git 忽略

---

## 🔗 参考资料

- `MEMORY_SCHEMA.json` - 完整 JSON Schema 定义
- `INTEGRATION_SPEC.md` - 各 Skill 集成详细规范
- `../official_api_code_example/` - WDP API 参数参考
