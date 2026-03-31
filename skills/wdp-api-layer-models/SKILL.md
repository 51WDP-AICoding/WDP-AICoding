---
name: wdp-api-layer-models
description: 处理 WDP 图层/模型 API 的实现与排障。用于图层显隐/高亮/描边、单体（node）控制，以及静态模型、骨骼模型、工程摆放模型与实例对象的更新控制；涉及图层和模型操作时使用本技能。
---

# WDP 图层/模型子技能

覆盖范围：图层/单体控制器、静态模型、骨骼模型、工程摆放模型、工程摆放实例。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载，目标实体可检索。
3. 节点级操作前先确认 `nodeIds` 有效。

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

### 节点可见性分组
用于批量管理 node 显隐：
```javascript
// 添加分组
await App.Scene.Node.AddVisibilityGroup(tilesObj, {
  groupName: 'floor-1',
  nodeIds: ['895874688', '882098004']
});

// 更新分组显隐
await App.Scene.Node.UpdateVisibilityGroup(tilesObj, {
  groupName: 'floor-1',
  nodeIds: [...], // 可选
  bVisible: false
});

// 移除分组
await App.Scene.Node.RemoveVisibilityGroup(tilesObj, 'floor-1');

// 获取分组信息
await App.Scene.Node.GetVisibilityGroup(tilesObj, 'floor-1');
```

### 节点选择器（NodeSelection）
用于 BIM 构件选中和描边：
```javascript
// 添加选中并绘制描边
await App.Scene.NodeSelection.Add(tilesObj, ['895874688', '882098004']);
await App.Scene.NodeSelection.Draw();

// 合并操作：添加并立即绘制
await App.Scene.NodeSelection.AddDraw(tilesObj, ['895874688']);

// 移除选中
await App.Scene.NodeSelection.Remove(tilesObj, ['895874688']);

// 清除所有选中
await App.Scene.NodeSelection.ClearDraw();
```

### 节点包围盒
用于空间分析和相机聚焦：
```javascript
const res = await tilesObj.GetNodesBoundingBox(['895874688', '882098004']);
// res.result: { center: [lng, lat, z], size: [w, h, d] }
```

### AES Tiles 激活控制
```javascript
// 激活底板（进入可交互状态）
await App.Scene.Tiles.ActivateAesTiles(tilesObj);

// 停用底板
await App.Scene.Tiles.DeactivateAesTiles(tilesObj);

// 查询激活状态
const res = await App.Scene.Tiles.IsActivated(tilesObj);
// res.result.bActivated: boolean
```

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
