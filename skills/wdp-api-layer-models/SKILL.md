---
name: wdp-api-layer-models
description: 处理 AES 底板图层/单体控制及场景基础模型（Static/Skeletal/ProjectModel）的实现与排障。用于 AES5/AES6 底板图层显隐/高亮/描边、底板单体控制，以及静态模型、骨骼模型、工程摆放模型与实例对象的更新控制。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述 AES 底板（Tiles/EarthTiles）图层控制能力
- ✅ 描述 AES 底板单体（node）控制能力
- ✅ 描述场景基础模型（Static/Skeletal/ProjectModel）的操作
- ✅ 说明 AES5/AES6 版本差异和调用路径
- ✅ 明确与 BIM 模型的边界区分

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供 BIM 模型相关操作（由 wdp-api-bim-unified 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-layer-models.md`

---

# ⚠️ 重要边界说明：本 Skill vs BIM Skill

## 概念区分

| 概念 | 本 Skill (wdp-api-layer-models) | BIM Skill (wdp-api-bim-unified) |
|------|--------------------------------|--------------------------------|
| **操作对象** | AES 底板单体（node） | BIM 模型构件（component/node） |
| **数据来源** | 场景自带底板（Tiles/EarthTiles） | 外部加载的 BIM 模型（Hierarchy） |
| **获取方式** | `App.Scene.GetTiles()` | `App.DCP.GetModelList()` / `new App.Hierarchy()` |
| **调用路径** | `App.Scene.Node.SetNodesXxx()` 或 `tilesObj.SetNodesXxx()` | `entity.SetNodeXxx()` |
| **方法命名** | 复数形式：`SetNodesHighlight` | 单数形式：`SetNodeHighLight` |
| **插件依赖** | 无需插件 | 必须安装 BIM 插件 |

## 快速判断使用哪个 Skill

**使用本 Skill 的场景**：
- 操作 AES 底板图层（Terrain, Building, Road, Water 等）
- 操作 AES 底板上的单体（通过 nodeId 控制）
- 创建/操作静态模型（Static）、骨骼模型（Skeletal）
- 操作工程摆放模型（ProjectModel/Instance）

**使用 BIM Skill 的场景**：
- 加载外部 BIM 模型（.rvt, .ifc 等格式）
- 操作 BIM 模型的构件树
- 执行剖切、拆楼等 BIM 特有功能
- 需要构件属性查询（GetNodeInfo）

---

# WDP 图层/模型子技能

覆盖范围：AES 底板图层/单体控制、静态模型、骨骼模型、工程摆放模型、工程摆放实例。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载，目标实体可检索。
3. 节点级操作前先确认 `nodeIds` 有效。

## 视觉反馈选型指南（重要）

| 高亮类型 | 适用 Skill | 方法 | 适用场景 |
|---------|-----------|------|---------|
| **Tiles 节点高亮** | `wdp-api-layer-models` | `SetNodesHighlight` | AES 底板（Tiles/EarthTiles）单体节点高亮 |
| **Tiles 图层高亮** | `wdp-api-layer-models` | `SetLayersHighlight` | AES 底板图层高亮（Building/Road/Water等） |
| **Tiles 节点描边** | `wdp-api-layer-models` | `SetNodesOutline` | AES 底板单体描边（NodeSelection） |
| **BIM 构件高亮** | `wdp-api-bim-unified` | `SetNodeHighLight` / `SetNodesHighlight` | BIM 模型内部构件高亮 |
| **BIM 房间高亮** | `wdp-api-bim-unified` | `SetRoomHighLight` | BIM 房间/空间高亮 |
| **模型材质高亮** | `wdp-api-material-settings` | `SetEntitySlotsHighlight` | 模型 mesh slot 级别高亮 |
| **实体高亮** | `wdp-api-entity-general-behavior` | `SetEntityHighlight` | 普通实体整体高亮 |
| **实体描边** | `wdp-api-entity-general-behavior` | `SetEntityOutline` | 实体边缘发光轮廓 |

**⚠️ 关键区分**：
- **Tiles 节点高亮** (`SetNodesHighlight`)：操作的是 AES 底板（Tiles/EarthTiles）上的单体节点（nodeId），通过 `App.Scene.Node` 工厂或 `tilesObj` 调用
- **Tiles 图层高亮** (`SetLayersHighlight`)：操作的是整个图层（Building/Road/Water等），通过 `App.Scene.Tiles/EarthTiles` 调用
- BIM 相关高亮需要使用 `wdp-api-bim-unified`，需要安装 BIM 插件
- 材质级别高亮需要使用 `wdp-api-material-settings`

**⚠️ 版本限制**：AES6 UE5.1 暂不支持图层描边功能，请改用图层高亮。

---

## 关键认知：AES5 与 AES6 的 API 差异

WDP 引擎版本不同，图层 API 调用路径不同：

| 引擎版本 | 底板类型 | 获取方式 | 图层操作路径 |
|---------|---------|---------|-------------|
| AES5 | Tiles | `res.result[0].Tiles[0]` | `App.Scene.Tiles.SetLayersXxx` |
| AES5 | Project | `res.result[1].Project[0]` | `App.Scene.Project.SetLayersXxx` |
| AES6 | EarthTiles | `res.result[2].EarthTiles[0]` | `App.Scene.EarthTiles.SetLayersXxx` |

> ⚠️ **重要**：AES6 UE5.1 暂不支持图层描边功能。

## 标准流程

### 1. 获取目标对象

**图层对象**：
```javascript
const res = await App.Scene.GetTiles();
// AES5: tilesObj = res.result[0].Tiles[0]
// AES6: tilesObj = res.result[2].EarthTiles[0]
```

**模型对象**：
- 静态/骨骼模型：`new App.Static/App.Skeletal` → `App.Scene.Add`
- 工程摆放模型：`App.Scene.GetByEids([...])`

### 2. 执行图层行为

**方式A - 工厂模式**（推荐，自动适配版本）：
```javascript
// AES5
await App.Scene.Tiles.SetLayersVisibility({ layers: ['Building'], bVisible: false });
await App.Scene.Tiles.SetLayersHighlight({ layers: ['Building'], bHighlight: true, styleName: 'SpringGreen' });

// AES6
await App.Scene.EarthTiles.SetLayersVisibility({ layers: ['Water'], bVisible: false });
await App.Scene.EarthTiles.SetLayersHighlight({ layers: ['Terrain'], bHighlight: true, styleName: 'Tomato' });
```

**方式B - 对象模式**：
```javascript
const result = await tilesObj.GetLayers();
// 或对象级操作（如支持）
```

### 3. 执行单体（node）行为

**工厂模式**（推荐）：
```javascript
await App.Scene.Node.SetNodesOutline(
  { entity: tilesObj, nodeIds: [...], bOutline: true, styleName: 'SpringGreen' },
  'Tiles' // 或 'Project' / 'EarthTiles' 根据底板类型
);

await App.Scene.Node.SetNodesHighlight(
  { entity: tilesObj, nodeIds: [...], bHighlight: true, styleName: 'SpringGreen' },
  'Tiles'
);

await App.Scene.Node.SetNodesVisibility(
  { entity: tilesObj, nodeIds: [...], bVisible: false },
  'Tiles'
);
```

**对象模式**（适用于已获取的 tiles 对象）：
```javascript
tilesObj.SetNodesOutline({ nodeIds: [...], bOutline: true, styleName: 'SpringGreen' });
tilesObj.SetNodesHighlight({ nodeIds: [...], bHighlight: true, styleName: 'SpringGreen' });
tilesObj.SetNodesVisibility({ nodeIds: [...], bVisible: false });
```

### 4. 执行模型对象行为

```javascript
obj.Update(json);
obj.SetRotator(json);
obj.SetScale3d(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
obj.onClick(callback); // 支持事件绑定
```

## 高级功能

| 功能 | 方法 | 说明 |
|------|------|------|
| **节点可见性分组** | `AddVisibilityGroup(tilesObj, {groupName, nodeIds})` | 批量管理 node 显隐 |
| **节点可见性分组** | `UpdateVisibilityGroup(tilesObj, {groupName, nodeIds, bVisible})` | 更新分组显隐 |
| **节点可见性分组** | `RemoveVisibilityGroup(tilesObj, groupName)` | 移除分组 |
| **节点可见性分组** | `GetVisibilityGroup(tilesObj, groupName)` | 获取分组信息 |
| **节点选择器** | `NodeSelection.Add(tilesObj, nodeIds)` / `Draw()` | 添加选中并绘制描边 |
| **节点选择器** | `NodeSelection.AddDraw(tilesObj, nodeIds)` | 合并操作：添加并立即绘制 |
| **节点选择器** | `NodeSelection.Remove(tilesObj, nodeIds)` | 移除选中 |
| **节点选择器** | `NodeSelection.ClearDraw()` | 清除所有选中 |
| **节点包围盒** | `tilesObj.GetNodesBoundingBox(nodeIds)` | 空间分析和相机聚焦 |
| **Tiles 激活控制** | `Tiles.ActivateAesTiles(tilesObj)` / `DeactivateAesTiles(tilesObj)` | 激活/停用底板 |
| **Tiles 激活控制** | `Tiles.IsActivated(tilesObj)` | 查询激活状态 |

> 📖 **完整代码示例**：`../official_api_code_example/official-layer-models.md`

## 质量门槛

1. **版本兼容性**：Node 行为必须先做 `nodeIds` 非空校验，并确认 AES5/AES6 差异。
2. **批量操作**：批量模型更新前先输出目标 EID 摘要。
3. **跨引擎分支**：跨引擎能力差异（如 AES5/AES6）必须显式分支处理。
4. **分组管理**：使用 VisibilityGroup 批量管理 node 显隐，避免逐个操作。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 图层接口返回成功但表现无变化 | 目标层名称错误或引擎能力不支持 | 检查目标层名称拼写；确认当前引擎版本支持该功能（AES5/AES6 能力差异） |
| node 控制无效 | nodeId 来源与实体版本不匹配，或调用路径错误 | 检查 nodeId 来源是否匹配当前实体版本；确认使用正确的工厂路径（Tiles/Project/EarthTiles） |
| 工程摆放模型更新异常 | 对象类型错误或参数字段不匹配 | 检查对象类型（ProjectModel/ProjectInstance）；确认参数字段与对象类型匹配 |
| AES6 图层描边不生效 | UE5.1 暂不支持该功能 | 改用图层高亮或其他视觉反馈方式 |
| NodeSelection 描边不显示 | 未调用 Draw 方法 | 添加选中后必须调用 `Draw()` 方法才会显示描边 |
| VisibilityGroup 更新无效 | 分组名称错误或 nodeIds 不匹配 | 确认分组名称正确；检查 nodeIds 是否在分组中存在 |

## 参考资料（相对路径）

- `../official_api_code_example/official-layer-models.md`

## 输出要求

始终输出：
1. 图层/模型目标范围（AES版本/底板类型）
2. 关键调用链路与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）
