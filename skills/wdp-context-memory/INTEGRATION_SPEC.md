# WDP Context Memory 集成规范

**版本**: 1.0.0  
**适用范围**: 由 `wdp-entry-agent` 统一调度  
**目标**: 定义状态管理通用原则和字段映射

---

## 重要说明

本文档**不由各 api skill 直接引用**，而是通过 `wdp-entry-agent` 统一调度：

```
用户指令 → wdp-entry-agent → 调度 api skill → 自动读写 Context Memory
                      ↑
                      └── 本文档供 entry-agent 参考
```

各 `wdp-api-*` skill 只需关注：
1. **读取所需状态**（通过 entry-agent 传递）
2. **声明影响的状态字段**（在 SKILL.md 中说明）
3. **返回变更结果**（由 entry-agent 自动回写）

---

## 1. 集成原则

### 1.1 单一事实来源 (SSoT)
所有状态必须通过 `wdp-context-memory` 维护，禁止各 skill 私自缓存。

### 1.2 显式状态流转
状态变更必须通过 `UpdateState()` 显式回写，不允许隐式状态传递。

### 1.3 防御性读取
读取状态时必须处理空值情况，不得假设状态一定存在。

---

## 2. 通用集成模式

### 模式 A：Entry-Agent 自动代理（推荐）

```javascript
// 在 wdp-entry-agent 中统一处理
async function dispatchSkill(skillName, params) {
  // 1. 读取前置上下文
  const context = {
    selection: ReadState("transient.selection"),
    camera: ReadState("transient.camera"),
    loadedEntities: ReadState("spatial.loadedEntities")
  }
  
  // 2. 调用 skill（传入上下文）
  const result = await skill.execute(params, context)
  
  // 3. 根据 result.changes 自动回写状态
  if (result.changes) {
    UpdateState(result.changes)
  }
  
  // 4. 定期校验
  if (shouldValidate()) {
    ValidateConsistency()
  }
}
```

**各 skill 只需返回变更声明：**
```javascript
// skill 执行后返回
return {
  success: true,
  changes: {
    "transient.camera.location": newLocation,
    "transient.lastApiCall": { method: "...", ... }
  }
}
```

### 模式 B：Skill 直接读写（特殊情况）

仅当 skill 需要高频读写状态时使用（如相机拖拽）：
```javascript
// 在 skill 内部直接调用
UpdateState({ "transient.camera": newCamera })
```

---

## 3. 各层级状态字段说明

### 3.1 Transient（瞬时状态）

| 字段路径 | 说明 | 典型维护者 |
|---------|------|-----------|
| `transient.selection.entity` | 当前选中实体 | 实体选择操作 |
| `transient.selection.nodeId` | BIM构件Node ID | 构件选择操作 |
| `transient.camera.location` | 相机位置 [x,y,z] | 相机控制skill |
| `transient.camera.rotation` | 相机旋转 {pitch,yaw,roll} | 相机控制skill |
| `transient.lastApiCall` | 最后API调用记录 | 所有skill |
| `transient.interactionMode` | 当前交互模式 | 交互控制skill |

### 3.2 Spatial（空间上下文）

| 字段路径 | 说明 | 典型维护者 |
|---------|------|-----------|
| `spatial.coordinateSystem` | 坐标系 global/local/relative | 初始化skill |
| `spatial.sceneOrigin` | 场景原点 | 初始化skill |
| `spatial.loadedEntities` | 已加载实体清单 | 实体加载/删除skill |
| `spatial.activeLayers` | 激活的图层 | 图层控制skill |
| `spatial.spatialAnchors` | 空间锚点 | 空间标注skill |

### 3.3 Task（任务进度）

| 字段路径 | 说明 | 典型维护者 |
|---------|------|-----------|
| `task.goal` | 任务目标 | entry-agent |
| `task.status` | 任务状态 | entry-agent |
| `task.completedSteps` | 已完成步骤 | entry-agent |
| `task.pendingSteps` | 待执行步骤 | entry-agent |
| `task.slots` | 待确认参数槽 | entry-agent |

---

## 4. 状态变更流程图

```
┌─────────────────┐
│   用户指令输入   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ReadState()    │ ← 读取当前上下文
│  获取所需状态    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   执行业务逻辑   │ ← 调用 WDP API
│  (Skill 内部)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  UpdateState()  │ ← 强制回写状态
│  更新上下文      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ValidateConsistency() │ ← 定期校验
│   (每 3-5 步)    │
└─────────────────┘
```

---

## 5. 错误处理规范

### 5.1 状态读取失败
```javascript
const selection = ReadState("transient.selection")
if (!selection) {
  // 策略 1: 使用默认值
  // 策略 2: 中止操作，要求用户选择
  // 策略 3: 自动触发选择流程
}
```

### 5.2 状态更新失败
```javascript
try {
  UpdateState({ ... })
} catch (e) {
  if (e instanceof ValidationError) {
    // Schema 校验失败，修正数据格式
  } else if (e instanceof PersistenceError) {
    // 持久化失败，重试或告警
  }
}
```

### 5.3 一致性校验失败
```javascript
const conflicts = ValidateConsistency([...])
if (conflicts.length > 0) {
  // 关键冲突：停止执行，询问用户
  if (conflicts.some(c => c.critical)) {
    throw new ClarificationRequired(conflicts)
  }
  // 非关键冲突：记录警告，继续执行
}
```

---

## 6. 性能优化建议

### 6.1 批量更新
```javascript
// ✅ 推荐：一次更新多个字段
UpdateState({
  "transient.selection": newSelection,
  "transient.camera": newCamera,
  "transient.lastApiCall": lastCall
})

// ❌ 避免：多次单独更新
UpdateState({ "transient.selection": newSelection })
UpdateState({ "transient.camera": newCamera })
UpdateState({ "transient.lastApiCall": lastCall })
```

### 6.2 精准读取
```javascript
// ✅ 推荐：只读需要的字段
const entityId = ReadState("transient.selection.entity.eid")

// ❌ 避免：读取整个状态树
const state = ReadState()  // 无参数
const entityId = state.transient.selection.entity.eid
```

### 6.3 缓存策略
```javascript
// 允许在单次操作中缓存读取结果
const selection = ReadState("transient.selection")
// 在同一次操作中多次使用 selection，不再重复读取
use(selection)
use(selection)

// 但跨操作必须重新读取
```

---

## 7. 版本兼容性

### 7.1 Schema 演进
- 新增字段：向后兼容，旧代码忽略新字段
- 删除字段：标记为 deprecated，保留至少 2 个版本
- 修改字段：创建新字段，旧字段保留别名

### 7.2 迁移策略
```javascript
// 读取时自动迁移旧版本数据
if (state._meta.version === "0.9") {
  // 自动转换旧格式到新格式
  migratedState = migrateFrom09(state)
}
```

---

## 8. 验证清单

集成新的 `wdp-api-*` Skill 时，检查以下事项：

- [ ] 所有状态读取使用 `ReadState(key_path)`
- [ ] 所有状态变更使用 `UpdateState(patch)`
- [ ] API 调用后及时回写 `transient.lastApiCall`
- [ ] 实体变更后更新 `spatial.loadedEntities`
- [ ] 相机变更后更新 `transient.camera`
- [ ] 任务进度更新 `task.completedSteps` 和 `task.pendingSteps`
- [ ] 定期调用 `ValidateConsistency()`
- [ ] 处理状态读取的空值情况
- [ ] 处理 Schema 校验错误
- [ ] 更新本规范文档（如有新的集成模式）

---

## 9. 示例：完整 Skill 集成代码

```javascript
// wdp-api-example-skill/SKILL.md 中的示例

// 1. 前置：读取上下文
const context = {
  selection: ReadState("transient.selection"),
  camera: ReadState("transient.camera"),
  loadedEntities: ReadState("spatial.loadedEntities")
}

// 2. 校验前置条件
if (!context.selection) {
  throw new Error("No entity selected. Please select an entity first.")
}

// 3. 执行 API 调用
const result = await App.ExampleAPI.SomeAction({
  targetId: context.selection.entity.eid,
  // ... 其他参数
})

// 4. 更新状态（强制）
UpdateState({
  "transient.lastApiCall": {
    method: "ExampleAPI.SomeAction",
    params: { targetId: context.selection.entity.eid },
    response: { success: result.success, message: result.message },
    timestamp: new Date().toISOString()
  }
})

// 5. 如结果影响空间上下文
if (result.success && result.changedEntities) {
  UpdateState({
    "spatial.loadedEntities": updateEntities(context.loadedEntities, result.changedEntities)
  })
}

// 6. 更新任务进度
UpdateState({
  "task.completedSteps": [
    ...ReadState("task.completedSteps"),
    { stepId: "example-action", description: "执行示例操作", result: "success" }
  ]
})
```

---

## 附录：字段映射速查表

| WDP API | Context Memory 字段 | 说明 |
|---------|---------------------|------|
| `App.Scene.GetByEids` | `spatial.loadedEntities` | 实体列表 |
| `App.CameraControl.Focus` | `transient.camera` | 相机参数 |
| `App.Entity.SetVisible` | `spatial.loadedEntities[].visible` | 显隐状态 |
| `App.Component.SetHighlight` | `transient.selection` | 当前选中 |
| `App.BimModel.StartModelSection` | `transient.sectionPlane` | 剖切平面 |
| `App.Poi` / `App.Coverage` | `spatial.loadedEntities[].type` | 覆盖物类型 |

---

**维护者**: WDP-AICoding Team  
**最后更新**: 2026-03-20
