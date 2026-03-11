---
name: wdp-api-spatial-understanding
description: 处理 WDP 场景空间信息获取与坐标转换。用于场景启动后获取坐标系原点、实体列表、包围盒中心、相机位置，以及 GIS/Cartesian/屏幕坐标之间的互转；涉及空间定位、坐标系确认、取点交互时使用本技能。
---

# WDP 空间理解子技能

只负责空间信息读取与坐标转换，不负责实体创建和 UI 渲染。

## 前置条件

1. `App` 初始化成功。
2. `Renderer.Start()` 成功。
3. 场景满足 `OnWdpSceneIsReady && progress === 100`。

## 标准流程

### 场景启动后获取空间基准（推荐在 OnWdpSceneIsReady 中执行）

1. 获取坐标系原点。
   - `App.Scene.GetGlobal()` → `result.geoReference.origin`
   - 记录场景的 GIS 坐标系原点，作为后续坐标计算的基准。

2. 获取当前相机位置。
   - `App.CameraControl.GetCameraPose()` → `result.location`
   - 记录相机当前 GIS 坐标，用于诊断或回退。

3. 获取所有实体列表。
   - `App.Scene.GetAll()` → `result.objects[]`
   - 每个实体包含 `eid`、`oType`、`entityName`、`customId`、`customData`。

4. 获取场景包围盒中心。
   - `App.Scene.GetBoundingBox(entities)` → `result.center`
   - 可用于相机初始定位或空间分析。

### 坐标转换

| 需求 | 调用方法 |
|------|----------|
| GIS → 世界坐标 | `App.Tools.Coordinate.GISToCartesian([[lng,lat,z]])` |
| 世界坐标 → GIS | `App.Tools.Coordinate.CartesianToGIS([[x,y,z]])` |
| 世界坐标 → 屏幕坐标 | `App.Tools.Coordinate.WorldPosToScreenPos([x,y,z])` |
| GIS → 屏幕坐标 | `App.Tools.Coordinate.GISToScreenPos([lng,lat,z])` |
| 坐标系互转（WGS84/GCJ02/BD09） | `App.Tools.Coordinate.Exchange(fromCRS, toCRS, point)` |
| 批量高度基准转换 | `App.Tools.Coordinate.TransformPointsByCoordZRef({points, coordZRef, coordZOffset})` |

### 用户取点交互

1. 启动取点：`App.Tools.PickerPoint.StartPickPoint()`
2. 监听事件：`RegisterSceneEvent` 中注册 `PickPointEvent`
3. 结束取点：`App.Tools.PickerPoint.EndPickPoint()`
4. 获取历史取点：`App.Tools.PickerPoint.GetPickedPoints()`

## 参数规则（2.2.1 基线）

1. 坐标格式统一。
   - GIS 坐标：`[lng, lat, z]`（经度、纬度、高度，单位：度/米）
   - Cartesian 坐标：`[x, y, z]`（世界坐标，单位：米）
   - 屏幕坐标：`[x, y]`（像素）

2. 批量转换优先。
   - `GISToCartesian` / `CartesianToGIS` 支持传入坐标数组，优先批量调用减少请求次数。

3. 高度基准选择。
   - `coordZRef` 可选：`Terrain`（地形贴合）、`Sea`（海平面）、`Ellipsoid`（椭球面）
   - 默认推荐 `Terrain`，适合大多数地面场景。

4. 坐标系确认。
   - 使用 `GetGlobal()` 确认场景坐标系类型后，再决定是否需要 `Exchange` 转换。

## 高频问题

1. 坐标转换结果偏移。
   - 检查源坐标系是否正确（国内地图常见 GCJ02 偏移问题）。
   - 使用 `Exchange('GCJ02', 'WGS84', point)` 纠偏。

2. GetBoundingBox 返回空或异常。
   - 确认传入的实体数组不为空。
   - 部分实体类型（如 Group）可能不参与包围盒计算，过滤后重试。

3. PickPointEvent 未触发。
   - 确认 `StartPickPoint()` 已调用。
   - 确认 `PickPointEvent` 已在 `RegisterSceneEvent` 中注册（需在 `Renderer.Start()` 成功后注册）。

4. GetAll 返回实体列表为空。
   - 确认场景已完全加载（`progress === 100`）。
   - 若初始化时 `bCached: false`，部分实体可能未缓存，需重新查询。

## 参考资料（相对路径）

- `../api_code_example/official-spatial-understanding.md`

## 输出要求

始终输出：
1. 获取到的空间基准信息摘要（坐标系原点、相机位置、实体数量）
2. 坐标转换的输入/输出对照
3. 验证步骤与结果
4. 异常处理策略（坐标偏移、空列表等）
