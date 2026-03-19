---
name: wdp-api-spatial-understanding
description: 处理 WDP 场景空间信息获取与坐标转换。用于场景启动后获取坐标系原点、实体列表、包围盒中心、相机位置，以及 GIS/Cartesian/屏幕坐标之间的互转；涉及空间定位、坐标系确认、取点交互时使用本技能。
---

# WDP 空间理解子技能

只负责空间信息读取与坐标转换，不负责实体创建和 UI 渲染。

## 强制性要求

任何使用WDP空间理解API的代码必须遵循以下要求：

1. 必须使用`new WdpApi()`创建实例
2. 必须显式调用`App.Renderer.Start()`
3. 必须注册场景就绪事件
4. 必须在场景就绪后才执行空间理解操作

如果上述任何一点不满足，空间理解相关代码将无法正常工作！

## 定位说明

本技能是**每次接入新渲染场景的强制步骤**，在 `OnWdpSceneIsReady && progress === 100` 后立即执行。
执行时机由 `wdp-api-initialize-scene` 的第6步触发，本技能负责具体实现。
探查结果作为后续所有业务 API 调用的空间基准，未完成探查前不得开始业务编码。

## 前置条件

1. `App` 初始化成功。
2. `Renderer.Start()` 成功。
3. 场景满足 `OnWdpSceneIsReady && progress === 100`。

## 标准流程

### 场景启动后基准探测

> **注意**：此处为底层原子描述。如果业务需求是"场景初始化与坐标探测"，请直接使用高级编排库：`../workflows/workflow-scene-ready-spatial-probe.md` 里面含有完整轻量探测代码与 `_wdpSpatialBaseline` 全局挂载方案。

**基本探测示例**：
```javascript
// 在场景就绪后执行
if (res.result.progress === 100) {
  // 创建基准信息对象
  const spatialBaseline = {
    timestamp: Date.now(),
    cameraPosition: null,
    coordSystem: null,
    entityCount: 0
  };
  
  // 获取当前相机位置
  const cameraRes = await App.Camera.GetCurrentState();
  if (cameraRes.success) {
    spatialBaseline.cameraPosition = cameraRes.result;
  }
  
  // 获取坐标系信息
  const globalRes = await App.Scene.GetGlobal();
  if (globalRes.success) {
    spatialBaseline.coordSystem = globalRes.result;
  }
  
  console.log('空间基准信息:', spatialBaseline);
}
```

### 全量基准探测（重量层：全量拉取场景物体）

**仅在明确排障需求下执行**

```javascript
// 获取所有实体
const getAllRes = await App.Scene.GetAll();
if (getAllRes.success) {
  const entities = getAllRes.result;
  
  // 获取实体数量
  spatialBaseline.entityCount = entities.length;
  
  // 计算包围盒
  if (entities.length > 0) {
    const boundingRes = await App.Scene.GetBoundingBox(entities);
    if (boundingRes.success) {
      spatialBaseline.boundingBox = boundingRes.result;
    }
  }
  
  // 清理数组引用，防止内存占用
  entities.length = 0;
}
```

### 坐标转换

| 需求 | 调用方法 | 示例 |
|------|----------|------|
| GIS → 世界坐标 | `App.Tools.Coordinate.GISToCartesian([[lng,lat,z]])` | `await App.Tools.Coordinate.GISToCartesian([[116.3, 39.9, 0]])` |
| 世界坐标 → GIS | `App.Tools.Coordinate.CartesianToGIS([[x,y,z]])` | `await App.Tools.Coordinate.CartesianToGIS([[100, 200, 50]])` |
| 世界坐标 → 屏幕坐标 | `App.Tools.Coordinate.WorldPosToScreenPos([x,y,z])` | `await App.Tools.Coordinate.WorldPosToScreenPos([100, 200, 50])` |
| GIS → 屏幕坐标 | `App.Tools.Coordinate.GISToScreenPos([lng,lat,z])` | `await App.Tools.Coordinate.GISToScreenPos([116.3, 39.9, 0])` |
| 坐标系互转 | `App.Tools.Coordinate.Exchange(fromCRS, toCRS, point)` | `await App.Tools.Coordinate.Exchange('GCJ02', 'WGS84', [116.3, 39.9])` |
| 批量高度基准转换 | `App.Tools.Coordinate.TransformPointsByCoordZRef({points, coordZRef, coordZOffset})` | `await App.Tools.Coordinate.TransformPointsByCoordZRef({points: [[116.3, 39.9, 0]], coordZRef: 'Terrain', coordZOffset: 10})` |

### 用户取点交互

```javascript
// 1. 启动取点
await App.Tools.PickerPoint.StartPickPoint();

// 2. 监听事件
await App.Renderer.RegisterSceneEvent([
  {
    name: 'PickPointEvent',
    func: function(res) {
      if (res.success) {
        console.log('取点结果:', res.result);
      }
    }
  }
]);

// 3. 结束取点
await App.Tools.PickerPoint.EndPickPoint();

// 4. 获取历史取点
const historyRes = await App.Tools.PickerPoint.GetPickedPoints();
if (historyRes.success) {
  console.log('历史取点:', historyRes.result);
}
```

## 参数规则（2.2.1 基线）

1. **坐标格式统一**
   - GIS 坐标：`[lng, lat, z]`（经度、纬度、高度，单位：度/米）
   - Cartesian 坐标：`[x, y, z]`（世界坐标，单位：米）
   - 屏幕坐标：`[x, y]`（像素）

2. **批量转换优先**
   - `GISToCartesian` / `CartesianToGIS` 支持传入坐标数组，优先批量调用减少请求次数

3. **高度基准选择**
   - `coordZRef` 可选：`Terrain`（地形贴合）、`Sea`（海平面）、`Ellipsoid`（椭球面）
   - 默认推荐 `Terrain`，适合大多数地面场景

4. **坐标系确认**
   - 使用 `GetGlobal()` 确认场景坐标系类型后，再决定是否需要 `Exchange` 转换

## 高频问题

1. **坐标转换结果偏移**
   - 检查源坐标系是否正确（国内地图常见 GCJ02 偏移问题）
   - 使用 `Exchange('GCJ02', 'WGS84', point)` 纠偏

2. **GetBoundingBox 返回空或异常**
   - 确认传入的实体数组不为空
   - 部分实体类型（如 Group）可能不参与包围盒计算，过滤后重试

3. **PickPointEvent 未触发**
   - 确认 `StartPickPoint()` 已调用
   - 确认 `PickPointEvent` 已在 `RegisterSceneEvent` 中注册（需在 `Renderer.Start()` 成功后注册）
   - 确认场景已完全加载（`progress === 100`）

4. **GetAll 返回实体列表为空**
   - 确认场景已完全加载（`progress === 100`）
   - 若初始化时 `bCached: false`，部分实体可能未缓存，需重新查询

## 参考资料（相对路径）

- `../official_api_code_example/official-spatial-understanding.md`
- `../workflows/workflow-scene-ready-spatial-probe.md`

## 输出要求

始终输出：
1. 获取到的空间基准信息摘要（坐标系原点、相机位置、实体数量）
2. 坐标转换的输入/输出对照
3. 验证步骤与结果
4. 异常处理策略（坐标偏移、空列表等）

---

## 强制性要求（再次强调）

任何使用WDP空间理解API的代码必须遵循以下要求：

1. 必须使用`new WdpApi()`创建实例
2. 必须显式调用`App.Renderer.Start()`
3. 必须注册场景就绪事件
4. 必须在场景就绪后才执行空间理解操作
5. 大型数据获取操作（如GetAll）后必须清理引用，避免内存占用

空间理解是场景初始化后的必要步骤，获取的基准信息将作为后续业务操作的重要依据。确保按照标准流程执行基准探测，并正确选择坐标系统和转换方法。