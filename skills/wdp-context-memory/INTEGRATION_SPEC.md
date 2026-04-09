# WDP Context Memory 集成规范

**版本**: 1.0.0  
**最后更新**: 2026-04-09

---

## 核心原则

1. **单一事实来源 (SSoT)** - 所有状态通过本 skill 维护，禁止私自缓存
2. **显式状态流转** - 变更必须通过 `UpdateState()` 回写
3. **防御性读取** - 处理空值，不假设状态存在

---

## 集成模式

### 模式 A：Entry-Agent 自动代理（推荐）

```javascript
// Entry-Agent 统一处理
const context = {
  selection: ReadState("transient.selection"),
  camera: ReadState("transient.camera"),
  loadedEntities: ReadState("spatial.loadedEntities")
}

const result = await skill.execute(params, context)

if (result.changes) {
  UpdateState(result.changes)
}
```

**Skill 只需返回变更声明**：
```javascript
return {
  success: true,
  changes: {
    "transient.camera.location": newLocation,
    "transient.lastApiCall": { method: "...", ... }
  }
}
```

### 模式 B：Skill 直接读写（特殊情况）

仅高频读写时使用（如相机拖拽）：
```javascript
UpdateState({ "transient.camera": newCamera })
```

---

## 状态字段速查

### Transient（瞬时状态）

| 字段路径 | 说明 | 维护者 |
|---------|------|--------|
| `transient.selection.*` | 选中实体/nodeId/featureId/materialIndex | 选择操作 |
| `transient.camera.*` | 相机位姿/限制/视角/控制模式 | 相机skill |
| `transient.cameraRoam` | 漫游状态 | 相机skill |
| `transient.cameraFollow` | 跟随状态 | 相机skill |
| `transient.materialPicking` | 材质拾取 | 拾取事件 |
| `transient.measurement` | 测量状态 | 测量工具 |
| `transient.tools` | 当前工具 | 工具管理 |
| `transient.rectangleSelection` | 框选状态 | 框选操作 |
| `transient.eventRegistry` | 事件注册表 | 事件注册 |
| `transient.lastApiCall` | 最后API调用 | 所有skill |

### Spatial（空间上下文）

| 字段路径 | 说明 | 维护者 |
|---------|------|--------|
| `spatial.loadedEntities` | 已加载实体（20种类型） | 实体操作 |
| `spatial.bimModels` | BIM模型列表 | BIM skill |
| `spatial.bimState` | BIM操作状态 | BIM skill |
| `spatial.gisLayers` | GIS图层列表 | GIS skill |
| `spatial.gisState` | GIS操作状态 | GIS skill |
| `spatial.cameraObjects` | 相机机位预设 | 相机skill |
| `spatial.environment` | 场景环境设置 | 环境skill |
| `spatial.aesTiles` | Tiles底板状态 | Tiles skill |
| `spatial.clusterDeployment` | 点聚合状态 | 聚合skill |
| `spatial.spatialUnderstanding` | 空间理解 | 空间skill |

### Task & Renderer

| 字段路径 | 说明 | 维护者 |
|---------|------|--------|
| `task.goal/status/completedSteps/pendingSteps` | 任务进度 | entry-agent |
| `renderer.status/startTime/resolution/networkStats` | 渲染器状态 | 初始化skill |

---

## 字段映射速查表

| WDP API | Context Memory 字段 |
|---------|---------------------|
| `App.Scene.GetByEids` | `spatial.loadedEntities` |
| `App.CameraControl.*` | `transient.camera/cameraRoam/cameraFollow` |
| `App.Camera.Create` | `spatial.cameraObjects` |
| `App.Tools.Picker.*` | `transient.selection/rectangleSelection` |
| `OnWdpMaterialHit` | `transient.materialPicking` |
| `OnGeoLayerFeatureClicked` | `transient.selection.featureId` |
| `App.BimModel.*` | `spatial.bimModels/bimState` |
| `App.Gis.*` | `spatial.gisLayers/gisState` |
| `App.Environment.*` | `spatial.environment` |
| `App.Tools.Measure.*` | `transient.measurement` |
| `App.Event.Register` | `transient.eventRegistry` |
| `App.Renderer.*` | `renderer.*` |

---

## 验证清单

- [ ] 读取使用 `ReadState(key_path)`，禁止全文读取
- [ ] 变更使用 `UpdateState(patch)` 回写
- [ ] API 调用后更新 `transient.lastApiCall`
- [ ] 每 3-5 步执行 `ValidateConsistency()`
- [ ] 处理状态读取的空值情况

---

**完整 Schema 定义**: `MEMORY_SCHEMA.json`
