# 官方脚本摘录（新版后台）：空间理解与坐标工具

版本基线：WDP API 2.2.1
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

---

## 条目：获取场景全局信息（id: 2001）

### 获取场景全局对象（GeoReference + CameraStart + 全局设置）

```javascript
const res = await App.Scene.GetGlobal();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      geoReference: GeoReferenceObject,   // 坐标系对象
      cameraStart: CameraStartObject,     // 初始相机对象
      wdpGlobalSettings: { ... }          // 全局设置对象
    }
  }
*/
```

### 获取全局设置

```javascript
const res = await App.Scene.GetGlobalSettings();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      object: WdpGlobalSettingsObject
    }
  }
*/
```

### 获取初始相机对象

```javascript
const res = await App.Scene.GetCameraStart();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      object: CameraStartObject
    }
  }
*/
```

---

## 条目：获取场景实体列表（id: 2002）

### 获取场景中所有实体

```javascript
const res = await App.Scene.GetAll();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      objects: [
        {
          eid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          oType: 'Poi',
          entityName: '我的POI',
          customId: '',
          customData: {}
        },
        // ...更多实体
      ]
    }
  }
*/
```

### 按类型获取实体

```javascript
const res = await App.Scene.GetByTypes(['Poi', 'Path', 'Static']);
console.log(res);
/*
  常用 oType 值：
  Poi / CustomPoi / Path / Window / Range / Text3D / Light / Particle
  HighlightArea / HeatMap / ColumnarHeatMap / SpaceHeatMap / RoadHeatMap
  MeshHeatMap / Viewshed / Parabola / Raster / RealTimeVideo / Bound
  Static / StaticInstance / Skeletal / Vegetation
  ModelerEmbank / ModelerWater / ModelerRiver / ModelerFence / ModelerFloor
  ProjectModel / ProjectInstance / Effects
  Tiles / EarthTiles / Project / Group
*/
```

### 通过 eid 获取实体类型

```javascript
const res = await App.Scene.GetTypesByEids(['eid1', 'eid2']);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      objects: [
        { eid: 'eid1', oType: 'Poi' },
        { eid: 'eid2', oType: 'Path' }
      ]
    }
  }
*/
```

---

## 条目：获取实体包围盒（id: 2003）

### 获取一个或多个实体的包围盒

```javascript
// 先获取实体对象
const allRes = await App.Scene.GetAll();
const entities = allRes.result.objects;

// 获取包围盒（传入实体对象数组）
const bboxRes = await App.Scene.GetBoundingBox(entities);
console.log(bboxRes);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      center: [121.4853, 31.2384, 50],   // 包围盒中心 GIS 坐标 [lng, lat, z]
      size: [500, 300, 100]              // 包围盒尺寸 [宽, 高, 深]（单位：米）
    }
  }
*/
```

> 用途：可通过 `result.center` 获取场景中心坐标，用于相机初始定位或空间分析。

---

## 条目：坐标系对象（id: 2004）

### GeoReference 对象（全局坐标系）

```javascript
// 通过 GetGlobal() 获取 GeoReference 对象
const globalRes = await App.Scene.GetGlobal();
const geoRef = globalRes.result.geoReference;

// 读取坐标系信息
console.log(geoRef.origin);       // 坐标系原点 [lng, lat, z]
console.log(geoRef.coordSystem);  // 坐标系类型（如 'WGS84'）

// 也可以直接创建 GeoReference 对象
const geoRefObj = new App.DataModel.GeoReference({
  origin: [121.4853, 31.2384, 0],
  coordSystem: 'WGS84'
});
```

### LocalGeoReference 对象（局部坐标系）

```javascript
// 局部坐标系：以场景某点为原点，使用局部 XYZ 坐标
const localGeoRef = new App.DataModel.LocalGeoReference({
  origin: [121.4853, 31.2384, 0],  // 局部坐标系原点（GIS 坐标）
  rotation: 0                       // 旋转角度（单位：度）
});
```

---

## 条目：坐标转换工具（id: 2005）

### GIS 坐标 → Cartesian（世界坐标）

```javascript
// 输入：GIS 坐标数组（支持批量）
const res = await App.Tools.Coordinate.GISToCartesian([
  [121.4853, 31.2384, 50],
  [121.4900, 31.2400, 30]
]);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      points: [
        [12345.67, 23456.78, 50],   // Cartesian [x, y, z]
        [12400.00, 23500.00, 30]
      ]
    }
  }
*/
```

### Cartesian（世界坐标）→ GIS 坐标

```javascript
const res = await App.Tools.Coordinate.CartesianToGIS([
  [12345.67, 23456.78, 50]
]);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      points: [
        [121.4853, 31.2384, 50]   // GIS [lng, lat, z]
      ]
    }
  }
*/
```

### 世界坐标 → 屏幕坐标

```javascript
const res = await App.Tools.Coordinate.WorldPosToScreenPos([12345.67, 23456.78, 50]);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      screenPos: [960, 540]   // 屏幕像素坐标 [x, y]
    }
  }
*/
```

### GIS 坐标 → 屏幕坐标

```javascript
const res = await App.Tools.Coordinate.GISToScreenPos([121.4853, 31.2384, 50]);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      screenPos: [960, 540]   // 屏幕像素坐标 [x, y]
    }
  }
*/
```

### 坐标系之间转换（Exchange）

```javascript
// 在不同坐标系之间转换坐标
const res = await App.Tools.Coordinate.Exchange(
  'WGS84',    // fromCRS: 源坐标系
  'GCJ02',    // toCRS: 目标坐标系
  [121.4853, 31.2384, 0]  // point: 坐标点
);
console.log(res);
/*
  支持的坐标系：WGS84, GCJ02, BD09
  出参示例：
  {
    success: true,
    message: '',
    result: {
      point: [121.4917, 31.2378, 0]
    }
  }
*/
```

### 批量坐标高度转换（TransformPointsByCoordZRef）

```javascript
// 将一批坐标点的高度统一参考某个基准面进行偏移
const res = await App.Tools.Coordinate.TransformPointsByCoordZRef({
  points: [
    [121.4853, 31.2384, 0],
    [121.4900, 31.2400, 0]
  ],
  coordZRef: 'Terrain',   // 高度参考：Terrain（地形）/ Sea（海平面）/ Ellipsoid（椭球面）
  coordZOffset: 5         // 高度偏移量（单位：米）
});
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      points: [
        [121.4853, 31.2384, 23.5],
        [121.4900, 31.2400, 18.2]
      ]
    }
  }
*/
```

---

## 条目：取点工具（id: 2006）

### 启动取点工具（用户在场景中点击获取坐标）

```javascript
// 启动取点工具
await App.Tools.PickerPoint.StartPickPoint();

// 监听取点事件（在 RegisterSceneEvent 中注册）
App.Renderer.RegisterSceneEvent([
  {
    name: 'PickPointEvent',
    func: async function (res) {
      console.log(res);
      /*
        出参示例：
        {
          result: {
            location: [121.4853, 31.2384, 5.2],  // GIS 坐标
            worldPos: [12345.67, 23456.78, 5.2]  // Cartesian 坐标
          }
        }
      */
    }
  }
]);
```

### 结束取点工具

```javascript
await App.Tools.PickerPoint.EndPickPoint();
```

### 获取已取点列表

```javascript
const res = await App.Tools.PickerPoint.GetPickedPoints();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      points: [
        { location: [121.4853, 31.2384, 5.2], worldPos: [12345.67, 23456.78, 5.2] },
        { location: [121.4900, 31.2400, 3.1], worldPos: [12400.00, 23500.00, 3.1] }
      ]
    }
  }
*/
```

---

## 条目：获取当前相机位置（id: 2007）

```javascript
const res = await App.CameraControl.GetCameraPose();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      location: [121.4853, 31.2384, 900],  // 相机 GIS 坐标 [lng, lat, z]
      rotation: {
        pitch: -35,   // 俯仰角（-90~0）
        yaw: 0        // 偏航角（-180~180）
      }
    }
  }
*/
```

> 用途：在执行相机操作前先记录当前位置，可用于回退或空间分析。

---

## 典型用法：场景启动后快速获取空间基准

```javascript
// 场景加载完成后，一次性获取空间基准信息
App.Renderer.RegisterSceneEvent([
  {
    name: 'OnWdpSceneIsReady',
    func: async function (res) {
      if (res.result.progress === 100) {

        // 1. 获取坐标系原点
        const globalRes = await App.Scene.GetGlobal();
        const origin = globalRes.result.geoReference?.origin;
        console.log('场景坐标系原点:', origin);

        // 2. 获取当前相机位置
        const poseRes = await App.CameraControl.GetCameraPose();
        console.log('当前相机位置:', poseRes.result.location);

        // 3. 获取所有实体列表
        const allRes = await App.Scene.GetAll();
        console.log('场景实体数量:', allRes.result.objects.length);

        // 4. 获取场景包围盒中心
        if (allRes.result.objects.length > 0) {
          const bboxRes = await App.Scene.GetBoundingBox(allRes.result.objects);
          console.log('场景中心坐标:', bboxRes.result.center);
        }
      }
    }
  }
]);
```
