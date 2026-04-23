---
name: wdp-api-coverings-unified
description: 处理 WDP 覆盖物 API 的实现与排障。用于 POI、Window、Range、热力图、路径、粒子特效、灯光、3D文字等覆盖物的创建、配置与控制；涉及场景标注和交互覆盖物时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述覆盖物的分类和能力范围
- ✅ 说明不同覆盖物的使用场景
- ✅ 提供覆盖物操作的通用流程
- ✅ 列出常见问题和解决方案

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）
- ❌ 不负责 `Bound` / `Scene.Move` 这类“实体沿路径运动”行为编排
- ❌ 不负责 `CameraControl.Follow` 这类相机跟随逻辑

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-entity-coverings.md`

---

# WDP 覆盖物子技能

覆盖范围：POI、Window、Range（区域轮廓）、热力图系列（HeatMap/ColumnarHeatMap/SpaceHeatMap/RoadHeatMap/MeshHeatMap）、Path（路径）、Parabola（迁徙图）、Particle/Effects（粒子特效）、Light（灯光）、Text3D（3D文字）、Viewshed（可视域）、Raster（栅格图）、HighlightArea（高亮区域）、RealTimeVideo（实时视频）、CustomPoi（自定义POI）、Group（实体组）、智能建模系列、StaticInstance（静态实例模型）等。

## 边界说明（重要）

- `Path` 在本技能中表示**路径实体本身的创建、更新、显隐、删除和样式控制**
- 如果需求变成“让车辆/实体沿着路径动起来”，应切到 `../wdp-api-entity-general-behavior/SKILL.md`
- 如果需求变成“镜头跟着移动中的实体走”，应再叠加 `../wdp-api-camera-unified/SKILL.md`
- 所以“路径展示”和“沿路径运动”不是同一类问题，不能只靠 coverings 单域完成

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载（`SceneReady(100%)`）。
3. 覆盖物参数已完成基础校验。

## 标准流程

### 1. 创建覆盖物

**通用模式**（大多数覆盖物）：
```javascript
const obj = new App.CoveringType(opt);
const res = await App.Scene.Add(obj, {calculateCoordZ: {...}});
```

**特殊模式**（Web行为组件）：
```javascript
// VideoUI/WindowUI/PoiUI 使用 App.Component
const obj = new App.VideoUI(opt);
await App.Component.VideoUI.Add([obj]);
```

**支持的覆盖物类型**：
- 基础覆盖物：Poi, Window, Range, Path, Parabola, Text3D, Viewshed, Raster, HighlightArea, RealTimeVideo, CustomPoi, Group, StaticInstance
- 热力图系列：HeatMap, ColumnarHeatMap, SpaceHeatMap, RoadHeatMap, MeshHeatMap
- 特效系列：Effects, Light, Particle
- 智能建模：Vegetation, ModelerEmbank, ModelerWater, ModelerRiver, ModelerFence, ModelerFloor
- Web行为：VideoUI, WindowUI, PoiUI

> 📖 **完整覆盖物创建 API 签名**：参考 `../official_api_code_example/official-entity-coverings.md`

### 2. 配置覆盖物参数
- 使用 `Update/Set` 系列方法更新参数
- POI/Window/Range 等使用 `obj.Update(json)`

### 3. 控制覆盖物状态
- 显隐：`SetVisible(boolean)` 或 `Show/Hide`
- 高亮：`SetHighlight`
- 获取信息：`Get()`

### 4. 销毁覆盖物
- 使用 `Delete()` 方法销毁覆盖物

## 典型场景索引

| 场景 | 典型用法 | 关键方法 | 参考文档 |
|------|---------|---------|---------|
| **POI + Window 交互** | POI 作为可点击标记，点击后弹出 Window | `poiObj.onClick(callback)`, `new App.Window({...})`, `App.Scene.Creates([...])` | official-entity-coverings.md `[demo]POI添加Window` |
| **区域标注（Range）** | 创建多边形/圆形区域轮廓，支持 SHP/GeoJSON 导入 | `new App.Range({...})`, `obj.GetRangeInfo()`, `App.DataModel.Geometry.CreateGeometryFromShapefile/GeoJson` | official-entity-coverings.md `Topic: 区域轮廓` |
| **热力图展示** | 区域/柱状/点云/路径/3D网格热力图 | `new App.HeatMap/ColumnarHeatMap/SpaceHeatMap/RoadHeatMap/MeshHeatMap({...})`, `obj.GetHeatValue()`, `obj.Filter/UnFilter` | official-entity-coverings.md `Topic: 热力图系列` |
| **路径展示（Path）** | 轨迹、路线、管网等线状数据可视化 | `new App.Path({polyline, pathStyle})`, `obj.Update()`, `obj.onClick(callback)` | official-entity-coverings.md `Topic: 路径` |

> 💡 **注意**：Path 在本技能中表示**路径实体本身的创建、更新、显隐、删除和样式控制**。如果需求变成"让车辆/实体沿着路径动起来"，应切到 `../wdp-api-entity-general-behavior/SKILL.md`。

## 常用覆盖物快速参考

### POI（兴趣点标记）
- **创建**：`new App.Poi({location, poiStyle, entityName, customId})`
- **添加**：`App.Scene.Add(poi, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 POI API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: POI

### Window（内嵌窗口）
- **创建**：`new App.Window({location, windowStyle: {url, size}})`
- **添加**：`App.Scene.Add(window, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`

> 📖 **完整 Window API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: Window

### Range（区域轮廓）
- **创建**：`new App.Range({polygon2D/circlePolygon2D, rangeStyle})`
- **添加**：`App.Scene.Add(range, {calculateCoordZ: {...}})`
- **方法**：`Update`, `GetRangeInfo`, `SetVisible`, `Delete`

> 📖 **完整 Range API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 区域轮廓/圆形区域轮廓

### HeatMap（热力图系列）
- **类型**：`HeatMap`, `ColumnarHeatMap`, `SpaceHeatMap`, `RoadHeatMap`, `MeshHeatMap`
- **创建**：`new App.HeatMap({heatMapStyle, points})` 等
- **添加**：`App.Scene.Add(heatmap, {calculateCoordZ: {...}})`
- **方法**：`Update`, `GetHeatValue`, `Filter`, `UnFilter`, `SetVisible`, `Delete`
- **特殊方法**：`Clip` / `UnClip` - 热力图裁剪/取消裁剪

> 📖 **完整热力图 API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 区域热力图/柱状热力图/点云热力图/路径热力图/3D网格热力图

### Path（路径）
- **创建**：`new App.Path({polyline, pathStyle})`
- **添加**：`App.Scene.Add(path, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **特殊方法**：`Modify` - 动态增删路径点
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 Path API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 路径

### Parabola（抛物线/迁徙图）
- **创建**：`new App.Parabola({polyline, parabolaStyle})`
- **添加**：`App.Scene.Add(parabola, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **特殊方法**：`SetGather` / `GetGather` - 设置聚集/扩展方向
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 Parabola API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 抛物线

### Particle（粒子特效）
- **创建**：`new App.Particle({location, particleType, scale3d})`
- **添加**：`App.Scene.Add(particle, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 Particle API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 粒子

### Light（灯光）
- **创建**：`new App.Light({location, lightStyle})`
- **添加**：`App.Scene.Add(light, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`

> 📖 **完整 Light API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 灯光

### Text3D（3D文字）
- **创建**：`new App.Text3D({location, text3DStyle})`
- **添加**：`App.Scene.Add(text3d, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 Text3D API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 3D文字

### Viewshed（可视域）
- **创建**：`new App.Viewshed({location, viewshedStyle})`
- **添加**：`App.Scene.Add(viewshed, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 Viewshed API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 可视域

### Raster（栅格图）
- **创建**：`new App.Raster({location, rasterStyle})`
- **添加**：`App.Scene.Add(raster, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`

> 📖 **完整 Raster API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 栅格图

### HighlightArea（高亮区域）
- **创建**：`new App.HighlightArea({polygon2D, highlightAreaStyle})`
- **添加**：`App.Scene.Add(highlightArea, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 HighlightArea API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 高亮区域

### RealTimeVideo（实时视频）
- **创建**：`new App.RealTimeVideo({location, realTimeVideoStyle})`
- **添加**：`App.Scene.Add(realTimeVideo, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`

> 📖 **完整 RealTimeVideo API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 实时视频

### CustomPoi（自定义POI）
- **创建**：`new App.CustomPoi({location, poiStyle})`
- **添加**：`App.Scene.Add(customPoi, {calculateCoordZ: {...}})`
- **方法**：`Update`, `SetVisible`, `Get`, `Delete`, `onClick`
- **特殊方法**：`SetLabelContent`, `SetLabelStyle`, `SetGeneralLabelStyle`, `SetSpecificLabelStyle`
- **交互事件**：`onClick`, `onDbClick`, `onMouseEnter`, `onMouseOut`

> 📖 **完整 CustomPoi API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 自定义POI

### 结构模型（Hierarchy）
- **特点**：支持通过 `seedId` 动态绑定/切换资产模型（如建筑物），并可以局部替换指定的材质（`changedMaterialInfo`）。
- **创建**：`new App.Hierarchy({seedId, changedMaterialInfo, location...})`
- **方法**：`Update`, `SetSeedId`, `SetChangedMaterialInfo`

> 📖 **完整 Hierarchy API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 结构模型

### 智能建模系列（Modeler）
- **类型**：`Vegetation`（植被）, `ModelerEmbank`（路基）, `ModelerFence`（围栏）, `ModelerFloor`（楼板）, `ModelerWater`（水面）, `ModelerRiver`（河道）。
- **创建**：`new App.ModelerFloor({...})` 等
- **🚨 特殊约束（极易出错，必须检查）**：
  1. `ModelerFence` 的样式对象 key 必须大写 `M`：`ModelerFenceStyle`，而非 `modelerFenceStyle`。
  2. `ModelerFloor` 和 `ModelerWater` 的 `coordinates` 必须是三维数组 `[][][]`。
- **方法**：`Update`, `Delete`；`Vegetation` 有特有的剔除区域管理方法。

> 📖 **完整 Modeler API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 智能建模系列

### 工程实例模型（ProjectInstance）
- **特点**：用于加载和控制具有内部节点树的 BIM 或工程模型，可以对指定节点（Node）进行显示、高亮和描边控制。
- **创建**：`new App.ProjectInstance({hiddenNodes, location...})`
- **方法**：`Update`, `SetNodesHighlight`, `ClearNodesHighlight`, `SetNodesOutline`, `SetNodesVisible`

> 📖 **完整 ProjectInstance API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 工程实例模型

### Group（实体组）
- **创建**：`new App.Group({entityName, customId, bVisible})`
- **添加**：`App.Scene.Add(group)`
- **方法**：`Add(entities)` - 添加成员, `Remove(entities)` - 移除成员, `UnGroup()` - 解散组, `SetVisible(boolean)`, `Get()`, `Delete()`

> 📖 **完整 Group API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: 实体组

### Web 行为组件（PoiUI / VideoUI / WindowUI）

**创建方式**：通过 `App.Component.xxx` 工厂类管理（非 `App.Scene.Add`）

| 组件 | 方法 | 说明 |
|------|------|------|
| **PoiUI** | `App.Component.PoiUI.Add([entity])` | 添加点位组件（对象方式） |
| **PoiUI** | `App.Component.PoiUI.Create(jsonData)` | 创建单个点位组件 |
| **PoiUI** | `App.Component.PoiUI.Creates(jsonData)` | 批量创建点位组件 |
| **PoiUI** | `App.Component.PoiUI.Get()` | 获取单个/所有点位组件 |
| **VideoUI** | `App.Component.VideoUI.Add([entity])` | 添加视频组件（对象方式） |
| **VideoUI** | `App.Component.VideoUI.Create(jsonData)` | 创建单个视频组件 |
| **VideoUI** | `App.Component.VideoUI.Creates(jsonData)` | 批量创建视频组件 |
| **VideoUI** | `App.Component.VideoUI.Get()` | 获取单个/所有视频组件/DOM对象 |
| **WindowUI** | `App.Component.WindowUI.Add([entity])` | 添加窗口组件（对象方式） |
| **WindowUI** | `App.Component.WindowUI.Create(jsonData)` | 创建单个窗口组件 |
| **WindowUI** | `App.Component.WindowUI.Creates(jsonData)` | 批量创建窗口组件 |
| **WindowUI** | `App.Component.WindowUI.Get()` | 获取单个/所有窗口组件 |

**事件绑定**：
- `obj.onClick(callback)` - 点击事件
- `obj.onHover(callback)` - 悬停事件
- `windowUIObj.PostMessage(data)` - WindowUI 与内嵌页面通信

> 📖 **完整 Web 行为组件 API 签名**：参考 `../official_api_code_example/official-entity-coverings.md` - Topic: UI 组件事件监听与坐标跟随

> 📖 **完整事件回调结构**：参考 `../official_api_code_example/official-entity-coverings.md`

## 质量门槛

1. 创建前检查参数合法性。
2. 参数更新前做类型和范围校验。
3. 批量操作前先输出目标清单摘要。
4. **重要**：POI/Window/Range 等覆盖物需要通过 `App.Scene.Add()` 添加到场景，并建议配置 `calculateCoordZ` 参数确保正确显示高度。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 覆盖物创建成功但无显示 | 坐标系错误、未配置 calculateCoordZ、场景未就绪 | 检查坐标系和位置参数；配置 `calculateCoordZ` 参数；确认 `SceneReady(100%)` |
| POI/Window 添加后位置不对 | 高度参考设置错误或偏移值不合理 | 使用 `calculateCoordZ` 指定高度参考（surface/ground/altitude）；检查 `coordZOffset` |
| 覆盖物更新无效 | 实例无效或参数错误 | 检查覆盖物实例是否有效；确认参数正确；确认已获取 `App.Scene.Add()` 返回的实例 `result.object` 并直接调用其 `Update` 方法 |
| 覆盖物交互问题 | 事件注册或回调函数错误 | 检查事件注册和回调函数；POI/Particle 支持 `onClick` 事件绑定 |
| POI 点击后未弹出 Window | 事件未绑定或参数错误 | 确认已使用 `poiObj.onClick()` 绑定事件；确认 Window 的 URL 和位置参数正确；参考 `official-entity-coverings.md` |

## 参考资料（相对路径）

- `../official_api_code_example/official-entity-coverings.md`

## 输出要求

始终输出：
1. 覆盖物类型与配置摘要
2. 调用链路与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）
