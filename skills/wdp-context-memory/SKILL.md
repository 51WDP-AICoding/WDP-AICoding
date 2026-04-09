---
name: wdp-context-memory
description: WDP 结构化状态管理技能。通过三层状态架构（Hot/Warm/Cold Memory）确保各 wdp-api-* 技能调用时的逻辑一致性。
---

# WDP Context Memory 技能

## 🎯 核心职责

作为 WDP 技能库的**单一事实来源（SSoT）**，维护所有技能共享的结构化状态。

**禁止**：各 `wdp-api-*` skill 私自缓存状态  
**强制**：所有状态变更通过 `UpdateState()` 回写

---

## 🏗️ 三层状态架构

| 层级 | 路径前缀 | 用途 | 生命周期 |
|------|----------|------|----------|
| **Hot** | `transient.*` | 当前操作状态 | 单步操作 |
| **Warm** | `spatial.*` | 空间环境上下文 | 跨指令有效 |
| **Cold** | `task.*` | 任务进度追踪 | 整个任务期间 |
| **Renderer** | `renderer.*` | 渲染器状态 | 渲染会话期间 |

**完整 Schema 定义**：见 `MEMORY_SCHEMA.json`

---

## 🔌 核心操作

### ReadState(key_path)
```javascript
// ✅ 精准读取
const camera = ReadState("transient.camera")
const entityId = ReadState("transient.selection.entity.eid")

// ❌ 禁止全文读取
ReadState()  // 不带参数
```

### UpdateState(patch_json)
```javascript
// API 调用后必须回写
UpdateState({
  "transient.camera.location": newLocation,
  "transient.lastApiCall": { method: "FlyTo", success: true }
})
```

### ValidateConsistency()
```javascript
// 每 3-5 步执行一次校验
ValidateConsistency([
  { path: "task.goal", check: "not_empty", critical: true },
  { path: "transient.selection", check: "optional" }
])
```

---

## 📋 常用状态速查

### 选择相关
- `transient.selection.entity` - 选中实体
- `transient.selection.nodeId` - BIM构件ID
- `transient.selection.featureId` - GIS要素ID
- `transient.selection.materialIndex` - 材质索引
- `transient.selection.selectionType` - 选择类型

### 相机相关
- `transient.camera.location/rotation` - 相机位姿
- `transient.cameraRoam` - 漫游状态
- `transient.cameraFollow` - 跟随状态
- `spatial.cameraObjects` - 机位预设

### 实体与图层
- `spatial.loadedEntities` - 已加载实体（20种类型）
- `spatial.bimModels/bimState` - BIM模型/状态
- `spatial.gisLayers/gisState` - GIS图层/状态

### 工具与事件
- `transient.measurement` - 测量状态
- `transient.tools` - 当前工具
- `transient.eventRegistry` - 事件注册表
- `transient.materialPicking` - 材质拾取

---

## 🛡️ 关键规则

1. **读取**：使用精准路径，禁止全文读取
2. **写入**：API 调用后必须 `UpdateState()`
3. **校验**：每 3-5 步执行 `ValidateConsistency()`
4. **Schema**：所有写入必须通过 `MEMORY_SCHEMA.json` 校验

---

## 📁 相关文件

- `MEMORY_SCHEMA.json` - 完整状态定义（35+ 字段）
- `INTEGRATION_SPEC.md` - 集成规范与字段映射
