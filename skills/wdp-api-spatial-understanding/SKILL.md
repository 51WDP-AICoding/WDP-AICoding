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

**分两层执行，默认只执行轻量层：**

#### 轻量层（默认执行，数据量小）

1. 获取坐标系原点与坐标系类型。
   - `App.Scene.GetGlobal()` → `result.geoReference.origin / coordSystem`
   - 记录场景的 GIS 坐标系原点，作为后续坐标计算的基准。
   - ⚠️ 若 `coordSystem` 为 `GCJ02`，后续 GIS 坐标需先 `Exchange` 纠偏。

2. 获取当前相机位置。
   - `App.CameraControl.GetCameraPose()` → `result.location / rotation`
   - 记录相机当前 GIS 坐标，用于诊断或回退。

3. 获取底板图层（GetTiles，轻量）。
   - `App.Scene.GetTiles()` → 获取 Tiles 对象，再 `GetLayers()` 获取图层列表。
   - 不涉及全量实体遍历，数据量可控。

4. 坐标系往返验证。
   - `GISToCartesian(origin)` → `CartesianToGIS(result)` → 误差 < 0.000001 为正常。

#### 重量层（按需执行，用户明确要求时才执行）

5. 获取所有实体列表（**默认不执行**）。
   - `App.Scene.GetAll()` → `result.objects[]`
   - 场景实体数量可能达到数百至数千，全量获取会产生大量数据。
   - **执行后只保留统计摘要**（类型分布 Map、数量），不在 baseline 中保留实体对象数组引用。
   - 执行完毕后立即将实体数组引用置 `null`，避免内存泄漏。

6. 获取场景整体包围盒（依赖第5步，**默认不执行**）。
   - `App.Scene.GetBoundingBox(entities)` → `result.center / size`
   - 需要传入实体对象数组，依赖 `GetAll()` 结果。
   - 获取完成后立即释放实体数组引用。

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

### 轻量探查（默认执行）

每次接入新场景时，在 `OnWdpSceneIsReady && progress === 100` 回调中调用。
**不执行 GetAll，数据量可控，结果存入 `window._wdpSpatialBaseline`。**

```javascript
/**
 * 场景空间基准探查 - 轻量层（默认执行）
 * 只获取坐标系、相机、底板图层，不遍历全量实体
 */
async function exploreSpatialBaseline() {
  const baseline = {};

  // 1. 坐标系原点与坐标系类型
  const globalRes = await App.Scene.GetGlobal();
  baseline.origin = globalRes.result.geoReference.origin;           // [lng, lat, z]
  baseline.coordSystem = globalRes.result.geoReference.coordSystem; // 'WGS84' | 'GCJ02' | ...
  console.log('[空间基准] 坐标系原点:', baseline.origin, '坐标系:', baseline.coordSystem);
  // ⚠️ 若 coordSystem 为 GCJ02，后续 GIS 坐标需先 Exchange 纠偏

  // 2. 相机默认位置
  const cameraRes = await App.CameraControl.GetCameraPose();
  baseline.cameraLocation = cameraRes.result.location;  // [lng, lat, z]
  baseline.cameraRotation = cameraRes.result.rotation;  // { pitch, yaw }
  console.log('[空间基准] 相机位置:', baseline.cameraLocation);

  // 3. 底板图层（轻量，不遍历全量实体）
  const tilesRes = await App.Scene.GetTiles();
  const tilesObj = tilesRes.result?.Tiles?.[0] || tilesRes.result?.EarthTiles?.[0];
  if (tilesObj) {
    const layersRes = await App.Scene.Tiles.GetLayers(tilesObj);
    baseline.tilesLayers = layersRes.result;  // 图层列表（轻量）
    console.log('[空间基准] 底板图层:', baseline.tilesLayers);
  }

  // 4. 坐标系往返验证
  const toCartesian = await App.Tools.Coordinate.GISToCartesian([baseline.origin]);
  const backToGIS = await App.Tools.Coordinate.CartesianToGIS(toCartesian.result.to);
  const err = Math.abs(backToGIS.result.to[0][0] - baseline.origin[0]);
  baseline.coordRoundTripError = err;
  console.log('[空间基准] 坐标往返误差:', err, err < 0.000001 ? '✅ 正常' : '⚠️ 异常，请检查坐标系配置');

  console.log('[空间基准] 轻量探查完成 ✅', baseline);
  // 存入全局缓存，供后续业务使用；不含实体对象引用，内存安全
  window._wdpSpatialBaseline = baseline;
  return baseline;
}

// 在 OnWdpSceneIsReady 中调用：
App.Renderer.RegisterSceneEvent([{
  name: 'OnWdpSceneIsReady',
  func: async (res) => {
    if (res.result.progress === 100) {
      await exploreSpatialBaseline();
    }
  }
}]);
```

---

### 重量探查（按需执行，用户明确要求时才调用）

> ⚠️ 场景实体数量可能达到数百至数千，全量获取会产生大量数据。
> 执行后**只保留统计摘要**，不保留实体对象数组引用，执行完毕立即释放。

```javascript
/**
 * 场景空间基准探查 - 重量层（按需执行）
 * 获取全量实体统计摘要 + 场景包围盒
 * 执行完毕后自动释放实体对象引用，避免内存泄漏
 */
async function exploreSpatialBaselineHeavy() {
  const baseline = window._wdpSpatialBaseline || {};

  // 5. 全量实体统计（只保留摘要，不保留对象引用）
  const allRes = await App.Scene.GetAll();
  let entities = allRes.result.objects;  // 临时引用，用完即释放

  baseline.entityCount = entities.length;
  baseline.entityTypeMap = entities.reduce((acc, e) => {
    acc[e.oType] = (acc[e.oType] || 0) + 1;
    return acc;
  }, {});
  console.log('[空间基准] 实体总数:', baseline.entityCount, '类型分布:', baseline.entityTypeMap);

  // 6. 场景整体包围盒（依赖全量实体列表）
  if (entities.length > 0) {
    const bboxRes = await App.Scene.GetBoundingBox(entities);
    baseline.bboxCenter = bboxRes.result.center;  // [lng, lat, z]
    baseline.bboxSize = bboxRes.result.size;       // [宽, 高, 深]（米）
    console.log('[空间基准] 包围盒中心:', baseline.bboxCenter, '尺寸:', baseline.bboxSize);
  }

  // 释放实体对象引用，避免内存泄漏
  entities = null;

  console.log('[空间基准] 重量探查完成 ✅', baseline);
  // 合并回全局缓存（只追加摘要字段，不含实体对象）
  window._wdpSpatialBaseline = baseline;
  return baseline;
}

// 用户明确要求时调用（例如：用户说"帮我看看场景里有哪些实体"）：
// await exploreSpatialBaselineHeavy();
```

---

### `window._wdpSpatialBaseline` 数据结构说明

| 字段 | 来源 | 类型 | 说明 |
|------|------|------|------|
| `origin` | 轻量层 | `[lng, lat, z]` | 坐标系原点 GIS 坐标 |
| `coordSystem` | 轻量层 | `string` | 坐标系类型（WGS84/GCJ02/...） |
| `cameraLocation` | 轻量层 | `[lng, lat, z]` | 相机初始位置 |
| `cameraRotation` | 轻量层 | `{pitch, yaw}` | 相机初始朝向 |
| `tilesLayers` | 轻量层 | `array` | 底板图层列表 |
| `coordRoundTripError` | 轻量层 | `number` | 坐标往返误差（<0.000001 为正常） |
| `entityCount` | 重量层 | `number` | 场景实体总数 |
| `entityTypeMap` | 重量层 | `{oType: count}` | 实体类型分布统计 |
| `bboxCenter` | 重量层 | `[lng, lat, z]` | 场景包围盒中心 |
| `bboxSize` | 重量层 | `[宽, 高, 深]` | 场景包围盒尺寸（米） |

> **注意**：`baseline` 中**不存储实体对象引用**（`EntityObject[]`），重量层执行完毕后立即释放，避免内存泄漏。

## 参考资料（相对路径）

- `../api_code_example/official-spatial-understanding.md`

## 输出要求

始终输出：
1. 获取到的空间基准信息摘要（坐标系原点、相机位置、实体数量）
2. 坐标转换的输入/输出对照
3. 验证步骤与结果
4. 异常处理策略（坐标偏移、空列表等）
