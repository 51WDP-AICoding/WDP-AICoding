---
name: wdp-api-spatial-understanding
description: 处理 WDP 场景空间信息获取与坐标转换。用于场景启动后获取坐标系原点、实体列表、包围盒中心、相机位置，以及 GIS/Cartesian/屏幕坐标之间的互转；涉及空间定位、坐标系确认、取点交互时使用本技能。
---

# WDP 空间理解子技能

只负责空间信息读取与坐标转换，不负责实体创建和 UI 渲染。

## 强制性要求

1. 必须使用`new WdpApi()`创建实例
2. 必须显式调用`App.Renderer.Start()`
3. 必须注册场景就绪事件
4. 必须在场景就绪后才执行空间理解操作

⚠️ 如果上述任何一点不满足，空间理解相关代码将无法正常工作！

## 定位说明

本技能是**每次接入新渲染场景的强制步骤**，在 `OnWdpSceneIsReady && progress === 100` 后立即执行。
执行时机由 `wdp-api-initialize-scene` 的第6步触发，本技能负责具体实现。
探查结果作为后续所有业务 API 调用的空间基准，未完成探查前不得开始业务编码。

## 前置条件

1. `App` 初始化成功。
2. `Renderer.Start()` 成功。
3. 场景满足 `OnWdpSceneIsReady && progress === 100`。

---

## 1. 场景空间信息获取

```javascript
// 获取坐标系原点
const globalRes = await App.Scene.GetGlobal();
const origin = globalRes.result.geoReference?.origin;

// 获取当前相机位置
const poseRes = await App.CameraControl.GetCameraPose();

// 获取所有实体列表
const allRes = await App.Scene.GetAll();

// 获取场景包围盒中心
const bboxRes = await App.Scene.GetBoundingBox(allRes.result.objects);
```

---

## 2. 坐标转换

| 需求 | 调用方法 | 示例 |
|------|----------|------|
| GIS → 世界坐标 | `App.Tools.Coordinate.GISToCartesian([[lng,lat,z]])` | `await App.Tools.Coordinate.GISToCartesian([[116.3, 39.9, 0]])` |
| 世界坐标 → GIS | `App.Tools.Coordinate.CartesianToGIS([[x,y,z]])` | `await App.Tools.Coordinate.CartesianToGIS([[100, 200, 50]])` |
| 世界坐标 → 屏幕坐标 | `App.Tools.Coordinate.WorldPosToScreenPos([x,y,z])` | `await App.Tools.Coordinate.WorldPosToScreenPos([100, 200, 50])` |
| GIS → 屏幕坐标 | `App.Tools.Coordinate.GISToScreenPos([lng,lat,z])` | `await App.Tools.Coordinate.GISToScreenPos([116.3, 39.9, 0])` |
| 坐标系互转 | `App.Tools.Coordinate.Exchange(fromCRS, toCRS, point)` | `await App.Tools.Coordinate.Exchange('GCJ02', 'WGS84', [116.3, 39.9])` |
| 批量高度基准转换 | `App.Tools.Coordinate.TransformPointsByCoordZRef({points, coordZRef, coordZOffset})` | `await App.Tools.Coordinate.TransformPointsByCoordZRef({points: [[116.3, 39.9, 0]], coordZRef: 'Terrain', coordZOffset: 10})` |

### 坐标格式说明
- **GIS 坐标**：`[lng, lat, z]`（经度、纬度、高度，单位：度/米）
- **Cartesian 坐标**：`[x, y, z]`（世界坐标，单位：米）
- **屏幕坐标**：`[x, y]`（像素）

---

## 3. 用户取点交互

```javascript
// 1. 启动取点
await App.Tools.PickerPoint.StartPickPoint();

// 2. 监听事件
await App.Renderer.RegisterSceneEvent([{
  name: 'PickPointEvent',
  func: (res) => {
    console.log('取点结果:', res.result.location);  // GIS坐标
  }
}]);

// 3. 结束取点
await App.Tools.PickerPoint.EndPickPoint();

// 4. 获取历史取点
const historyRes = await App.Tools.PickerPoint.GetPickedPoints();
```

---

## 4. 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 坐标转换结果偏移 | 源坐标系不正确（国内地图常见 GCJ02 偏移） | 使用 `Exchange('GCJ02', 'WGS84', point)` 纠偏 |
| GetBoundingBox 返回空 | 传入的实体数组为空或包含不支持类型 | 确认实体数组非空；过滤 Group 等不参与计算的实体 |
| PickPointEvent 未触发 | 未启动取点工具或事件未注册 | 确认 `StartPickPoint()` 已调用；确认事件在 `Renderer.Start()` 后注册 |
| GetAll 返回空列表 | 场景未完全加载或缓存设置问题 | 确认 `progress === 100`；检查初始化时 `bCached` 设置 |

---

## 5. 参考资料

- `../official_api_code_example/official-spatial-understanding.md` - **空间理解 API 完整文档（真值来源）**
- `../official_api_code_example/official-scene-camera.md` - 相机方法真值来源
- `../wdp-api-initialization-unified/SKILL.md` - 场景初始化
