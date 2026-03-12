---
name: wdp-api-spatial-understanding
description: 处理 WDP 场景空间信息获取与坐标转换。用于场景启动后获取坐标系原点、实体列表、包围盒中心、相机位置，以及 GIS/Cartesian/屏幕坐标之间的互转；涉及空间定位、坐标系确认、取点交互时使用本技能。
---

# WDP 空间理解子技能

只负责空间信息读取与坐标转换，不负责实体创建和 UI 渲染。

## 定位说明

本技能是**每次接入新渲染场景的强制步骤**，在 `OnWdpSceneIsReady && progress === 100` 后立即执行。
执行时机由 `wdp-api-initialize-scene` 的第6步触发，本技能负责具体实现。
探查结果作为后续所有业务 API 调用的空间基准，未完成探查前不得开始业务编码。

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

## 可复用探查函数模板

每次接入新场景时，在 `OnWdpSceneIsReady && progress === 100` 回调中直接调用：

```javascript
/**
 * 场景空间基准探查（每次接入执行一次）
 * 返回空间基准摘要，供后续业务使用
 */
async function exploreSpatialBaseline() {
  const baseline = {};

  // 1. 坐标系原点与坐标系类型
  const globalRes = await App.Scene.GetGlobal();
  baseline.origin = globalRes.result.geoReference.origin;       // [lng, lat, z]
  baseline.coordSystem = globalRes.result.geoReference.coordSystem; // 'WGS84' | 'GCJ02' | ...
  console.log('[空间基准] 坐标系原点:', baseline.origin, '坐标系:', baseline.coordSystem);
  // ⚠️ 若 coordSystem 为 GCJ02，后续 GIS 坐标需先 Exchange 纠偏

  // 2. 相机默认位置
  const cameraRes = await App.CameraControl.GetCameraPose();
  baseline.cameraLocation = cameraRes.result.location;          // [lng, lat, z]
  baseline.cameraRotation = cameraRes.result.rotation;          // { pitch, yaw }
  console.log('[空间基准] 相机位置:', baseline.cameraLocation);

  // 3. 实体列表与类型分布
  const allRes = await App.Scene.GetAll();
  baseline.entities = allRes.result.objects;
  baseline.entityCount = baseline.entities.length;
  baseline.entityTypeMap = baseline.entities.reduce((acc, e) => {
    acc[e.oType] = (acc[e.oType] || 0) + 1;
    return acc;
  }, {});
  console.log('[空间基准] 实体总数:', baseline.entityCount, '类型分布:', baseline.entityTypeMap);

  // 4. 场景整体包围盒
  if (baseline.entityCount > 0) {
    const bboxRes = await App.Scene.GetBoundingBox(baseline.entities);
    baseline.bboxCenter = bboxRes.result.center;  // [lng, lat, z]
    baseline.bboxSize = bboxRes.result.size;       // [宽, 高, 深]（米）
    console.log('[空间基准] 包围盒中心:', baseline.bboxCenter, '尺寸:', baseline.bboxSize);
  }

  // 5. AES 底板图层（如有 Tiles）
  if (baseline.entityTypeMap['Tiles'] || baseline.entityTypeMap['EarthTiles']) {
    const tilesRes = await App.Scene.GetTiles();
    if (tilesRes.result.length > 0) {
      const tilesObj = tilesRes.result[0].Tiles?.[0] || tilesRes.result[2]?.EarthTiles?.[0];
      if (tilesObj) {
        const layersRes = await App.Scene.Tiles.GetLayers(tilesObj);
        baseline.tilesLayers = layersRes.result;
        console.log('[空间基准] 底板图层:', baseline.tilesLayers);
      }
    }
  }

  // 6. 坐标系往返验证
  const testGIS = [baseline.origin];
  const toCartesian = await App.Tools.Coordinate.GISToCartesian(testGIS);
  const backToGIS = await App.Tools.Coordinate.CartesianToGIS(toCartesian.result.to);
  const err = Math.abs(backToGIS.result.to[0][0] - baseline.origin[0]);
  baseline.coordRoundTripError = err;
  console.log('[空间基准] 坐标往返误差:', err, err < 0.000001 ? '✅ 正常' : '⚠️ 异常，请检查坐标系配置');

  console.log('[空间基准] 探查完成 ✅', baseline);
  return baseline;
}

// 在 OnWdpSceneIsReady 中调用：
App.Renderer.RegisterSceneEvent([{
  name: 'OnWdpSceneIsReady',
  func: async (res) => {
    if (res.result.progress === 100) {
      const baseline = await exploreSpatialBaseline();
      // 将 baseline 存入全局缓存，供后续业务使用
      window._wdpSpatialBaseline = baseline;
    }
  }
}]);
```

## 参考资料（相对路径）

- `../api_code_example/official-spatial-understanding.md`

## 输出要求

始终输出：
1. 获取到的空间基准信息摘要（坐标系原点、相机位置、实体数量）
2. 坐标转换的输入/输出对照
3. 验证步骤与结果
4. 异常处理策略（坐标偏移、空列表等）
