# 官方脚本摘录（新版后台）：实体覆盖物（分批）

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：实体覆盖物）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 第一批：实时视频 / Window / POI（含 Web 组件）

### 实时视频（id: 1373）

```javascript
const realTimeVideo = new App.RealTimeVideo({
  location: [121.50007292, 31.22579403, 30],
  realTimeVideoStyle: {
    url: 'rtsp://xxx',
    resolution: [400, 300],
    offset: [0, 0],
    state: 'pause'
  },
  bVisible: true
});
const res = await App.Scene.Add(realTimeVideo, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

```javascript
obj.Update(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
```

### 视频 Web 行为（id: 1374）

```javascript
const videoUI = new App.VideoUI({
  videoUIContent: { src: 'mp4 video url', autoplay: true, controls: true },
  windowStyle: { width: '400px', height: '300px', left: '500px', top: '200px' }
});
App.Component.VideoUI.Add([videoUI]);
```

```javascript
App.Component.VideoUI.Create(jsonData);
App.Component.VideoUI.Creates(jsonData);
object.Update(jsonData);
object.Delete();
App.Component.VideoUI.Get();
```

### Window（id: 1375）

```javascript
const windowObj = new App.Window({
  location: [121.50007292, 31.22579403, 30],
  windowStyle: { url: 'http://wdpapi.51aes.com/doc-static/images/static/echarts.html', size: [500, 350], offset: [0, 0] },
  bVisible: true
});
const res = await App.Scene.Add(windowObj, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

```javascript
w51_event('EventKey', { any: 'payload' });
```

```javascript
await App.Renderer.RegisterSceneEvent([
  { name: 'OnWebJSEvent', func: (data) => console.log(data) }
]);
```

### Window Web 行为（id: 1376）

```javascript
const windowUI = new App.WindowUI({
  windowUIContent: { url: 'http://wdpapi.51aes.com/doc-static/images/static/echarts.html' },
  windowStyle: { width: '500px', height: '350px', left: '300px', top: '200px' }
});
App.Component.WindowUI.Add([windowUI]);
```

```javascript
App.Component.WindowUI.Create(jsonData);
App.Component.WindowUI.Creates(jsonData);
object.Update(jsonData);
object.Delete();
App.Component.WindowUI.Get();
```

### POI（id: 1377）

```javascript
const poi = new App.Poi({
  location: [121.50007292, 31.22579403, 30],
  poiStyle: {
    markerNormalUrl: 'http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png',
    markerActivateUrl: 'http://wdpapi.51aes.com/doc-static/images/static/markerActive.png',
    markerSize: [100, 159]
  }
});
const res = await App.Scene.Add(poi, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

```javascript
obj.Update(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
obj.onClick((ev) => console.log(ev));
```

### POI Web 行为（id: 1379）

```javascript
const poiUI = new App.PoiUI({
  poiUIContent: {
    normalImage: 'http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png',
    activeImage: 'http://wdpapi.51aes.com/doc-static/images/static/markerActive.png'
  },
  windowStyle: { width: '79px', height: '180px', left: '500px', top: '200px' }
});
App.Component.PoiUI.Add([poiUI]);
```

```javascript
App.Component.PoiUI.Create(jsonData);
App.Component.PoiUI.Creates(jsonData);
object.Update(jsonData);
object.Delete();
object.Get();
```

## 第二批：场景特效 / 粒子特效 / 灯光特效 / 3D文字 / 可视域 / 路径

### 场景特效（Particle，id: 1380）

```javascript
const particle = new App.Particle({
  location: [121.50007292, 31.22579403, 30],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  scale3d: [30, 30, 30],
  particleType: 'vehicle_taxi',
  bVisible: true
});
await App.Scene.Add(particle, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

```javascript
obj.Update(json);
obj.SetRotator(json);
obj.SetScale3d(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
```

### 粒子特效（Effects，id: 1381）

```javascript
const effect = new App.Effects({
  location: [121.51132810, 31.23485399, 52],
  rotator: { pitch: 0, yaw: 0, roll: 0 },
  scale3d: [1, 1, 1],
  bVisible: true,
  speed: 1,
  seedId: 'ac2a41915c7c7097be7dc64602e0e4fb'
});
await App.Scene.Add(effect, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 灯光特效（Light，id: 1382）

```javascript
const light = new App.Light({
  location: [121.47731869, 31.22435528, 61],
  bVisible: true,
  scale3d: [30, 30, 30],
  lightStyle: {
    intensity: 40,
    color: '968afeff',
    angle: 50,
    attenuation: 200,
    shadows: true,
    haze: true,
    haze_Intensity: 90
  }
});
await App.Scene.Add(light, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 100 }
});
```

### 3D 文字（Text3D，id: 1383）

```javascript
const text3d = new App.Text3D({
  location: [121.46434372, 31.23499129, 60],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  scale3d: [100, 30, 30],
  text3DStyle: { text: '3D文字', color: 'ff00ff', type: 'plain', outline: 0.4, portrait: false, space: 0.1 },
  bVisible: true
});
await App.Scene.Add(text3d, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 可视域（Viewshed，id: 1384）

```javascript
const viewshed = new App.Viewshed({
  location: [121.47025042, 31.23065615, 90],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  viewshedStyle: {
    fieldOfView: 70,
    radius: 600,
    outline: true,
    hiddenColor: '75fe97ff',
    visibleColor: '3cff71ff'
  },
  bVisible: true
});
await App.Scene.Add(viewshed, {
  calculateCoordZ: { coordZRef: 'ground', coordZOffset: 10 }
});
```

### 路径（Path，id: 1385）

```javascript
const path = new App.Path({
  polyline: {
    coordinates: [
      [121.49968476, 31.24861346, 44],
      [121.49956979, 31.25093239, 96],
      [121.47613890, 31.23725069, 39]
    ]
  },
  pathStyle: { type: 'arrow', width: 100, color: 'b4fed7', passColor: 'ffb3deff' },
  bVisible: true
});
await App.Scene.Add(path, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

## 第三批：迁徒图 / 区域轮廓 / 圆形区域轮廓 / 多种热力图 / 栅格图 / 高亮区域

### 迁徒图（Parabola，id: 1386）

```javascript
const parabola = new App.Parabola({
  polyline: { coordinates: [[121.49968476, 31.24861346, 44], [121.47025042, 31.23065615, 90]] },
  parabolaStyle: { topHeight: 800, topScale: 1, type: 'scanline', width: 20, color: 'ff3fafff', gather: true },
  bVisible: true
});
await App.Scene.Add(parabola, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 区域轮廓（Range，id: 1387）

```javascript
const range = new App.Range({
  polygon2D: { coordinates: [[[121.4498, 31.2505], [121.4493, 31.2370], [121.4706, 31.2380], [121.4696, 31.2518]]] },
  rangeStyle: { shape: 'polygon', type: 'loop_line', fillAreaType: 'block', height: 200, strokeWeight: 10, color: 'ff3772ff' },
  bVisible: true
});
await App.Scene.Add(range, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### 圆形区域轮廓（Range-circle，id: 1388）

```javascript
const rangeCircle = new App.Range({
  circlePolygon2D: { center: [121.49885272, 31.24683565, 46], radius: 200 },
  rangeStyle: { shape: 'circle', type: 'loop_line', fillAreaType: 'block', height: 200, strokeWeight: 10, color: 'ff3772ff' },
  bVisible: true
});
await App.Scene.Add(rangeCircle, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### 区域热力图（HeatMap，id: 1389）

```javascript
const heatmap = new App.HeatMap({
  heatMapStyle: { type: 'fit', brushDiameter: 2000, mappingValueRange: [1, 100], gradientSetting: ['c9ff6f', 'd153fe', '01edff'] },
  points: { features: mapdata },
  bVisible: true
});
await App.Scene.Add(heatmap, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### 柱状热力图（ColumnarHeatMap，id: 1390）

```javascript
const columnar = new App.ColumnarHeatMap({
  columnarHeatMapStyle: { type: 'cube', brushDiameter: 550, mappingValueRange: [1, 100], mappingHeightRange: [0, 500] },
  points: { features: mapdata },
  bVisible: true
});
await App.Scene.Add(columnar, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### 点云热力图（SpaceHeatMap，id: 1391）

```javascript
const spaceheat = new App.SpaceHeatMap({
  spaceHeatMapStyle: { brushDiameter: 100, mappingValueRange: [1, 100], gradientSetting: ['0000ff', 'ff5500', '00ff00'] },
  points: { features: mapdata },
  bVisible: true
});
await App.Scene.Add(spaceheat, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 路径热力图（RoadHeatMap，id: 1392）

```javascript
const roadheat = new App.RoadHeatMap({
  roadHeatMapStyle: { width: 50, mappingValueRange: [1, 100], type: 'plane', filter: ['water'] },
  points: { features: mapdata },
  bVisible: true
});
await App.Scene.Add(roadheat, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 3D 网格热力图（MeshHeatMap，id: 1393）

```javascript
const meshHeatMap = new App.MeshHeatMap({
  meshHeatMapStyle: {
    pointData: mapdata,
    meshBoundary: points,
    pointCoordZ: 0,
    meshGridSpace: 100,
    mappingValueRange: [0, 50],
    mappingHeightRange: [0, 50],
    opacity: 0.5
  }
});
await App.Scene.Add(meshHeatMap, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### 栅格图（Raster，id: 1394）

```javascript
const raster = new App.Raster({
  rasterStyle: { path: 'http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif', type: 'fit', gradientSetting: ['91ffd5', 'ff1af5'] },
  bVisible: true
});
await App.Scene.Add(raster, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### 高亮区域（HighlightArea，id: 1395）

```javascript
const highlight = new App.HighlightArea({
  polygon2D: { coordinates: [[[121.4498, 31.2505], [121.4493, 31.2370], [121.4706, 31.2380], [121.4696, 31.2518]]] },
  highlightAreaStyle: {
    interiorColor: 'cbba89ff',
    exteriorColor: '00ffffff',
    exteriorOutlineColor: 'ff00ffff',
    exteriorSaturation: 10
  },
  bVisible: true
});
await App.Scene.Add(highlight, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```
