# Official excerpt sync: 数据可视化与特效覆盖物

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 数据可视化与特效覆盖物, categoryId: 572)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 场景特效 (id: 1380)

- 场景特效 Particle  
`App.Particle` 在场景中添加场景特效实体。通过 `particleType` 字段指定特效类型标识（从平台资源库获取，例如 `'vehicle_taxi'`），支持位置、旋转、缩放及可见性控制，并可绑定交互事件。  

```javascript
const particle = new App.Particle({
  "location": [121.50007292, 31.22579403, 30],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [30, 30, 30],//正整数
  "particleType": "vehicle_taxi",//取值范围：	flame, 3dmark_build_loop, 3dmark_build, 3dmark_camera_loop,3dmark_camera, 3dmark_sign, 3dmark_warning, title_only,vehicle_car, vehicle_car_black, vehicle_car_white, vehicle_taxi,shield, fire, arrow, alarm, circle, pyramid, marker_cube,marker_pyramid, marker_site, marker_cone, tool_wrench,weather_tornado, circle_glass, circle_compass, circle_outside,circle_inside, circle_scan, circle_diffuse, circle_area, circle_area2, circle_flash
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(particle, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Particle({...});
  obj.Update(json);
  // 方式一：
  // obj.rotator = {pitch: 0, yaw: 30, roll: 0};
  // 方式二：
  await obj.SetRotator({pitch: 0, yaw: 30, roll: 0});
  // 方式一：
  // obj.scale3d = [30, 30, 30];
  // 方式二：
  await obj.SetScale3d([30, 30, 30]);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  // 方式一：
  // obj.particleType = 'smoke_chimney';
  // 方式二：
  await obj.SetParticleType('smoke_chimney');//切换特效类型
  // 方式一：
  // console.log(obj.bLocked);
  // 方式二：
  await obj.GetLocked();//获取场景特效的锁定状态
  // 方式一：
  // obj.bLocked = true;
  // 方式二：
  await obj.SetLocked(true);//设置场景特效的锁定状态
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);//交互事件
  })
```


## Topic: 灯光特效 (id: 1382)

- 灯光特效Light  
`App.Light` 在场景中添加聚光灯实体，支持灯光强度（0~100）、HEXA 颜色、张角（0~50）、衰减长度、阴影开关以及烟雾效果（haze）配置。灯光不支持交互事件。

```javascript
const entityObj = new App.Light({
  "location": [121.47731869, 31.22435528, 61],//必填
  "bVisible": true, //是否可见(true/false)
  "scale3d": [30, 30, 30],//设置缩放值，只能按照等比例缩放，例如[10,10,10]，如果使用不等比放缩会导致haze（烟雾）导致超出灯光
  "lightStyle": {
    "intensity": 40, //必填，灯光强度(0~100)
    "color": "968afeff", //必填，灯光颜色(HEX颜色值)
    "angle": 50, //必填，灯光张角(0~50)
    "attenuation": 200, //必填，任意整数，灯光衰减长度(单位:米)
    "shadows": true, //必填，是否开启阴影(true/false)
    "haze": true, //必填，是否开启烟雾(true/false)
    "haze_Intensity": 90 //必填，烟雾强度(0~100)
  }
});

const res = await App.Scene.Add(entityObj, {
  "calculateCoordZ": {  //坐标类型及坐标高度; [可选] 最高优先级
    "coordZRef": "surface",//surface:表面;ground:地面;altitude:海拔
    "coordZOffset": 100 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Light({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  obj.Delete();
```
- 成员属性

| 属性 | 类型 | 说明 | 是否只读 |
|------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[lng, lat, alt]` | 经纬度及高度 | 否 |
| `rotator` | `{ pitch, yaw, roll }` | 旋转角度（-180~180） | 否 |
| `scale3d` | `[x, y, z]` | 缩放比例 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `intensity` | `number` | 灯光强度（0~100） | 否 |
| `color` | `string` | 灯光颜色（HEXA） | 否 |
| `angle` | `number` | 灯光张角（0~50度） | 否 |
| `attenuation` | `number` | 衰减长度（米） | 否 |
| `shadows` | `boolean` | 是否开启阴影 | 否 |
| `haze` | `boolean` | 是否开启烟雾 | 否 |
| `haze_Intensity` | `number` | 烟雾强度（0~100） | 否 |


## Topic: 可视域 (id: 1384)

- 可视域 Viewshed  
`App.Viewshed` 在场景中以观测点为中心进行可视域分析，以彩色锥形区域区分可见（绿色）与不可见（遮挡）区域。支持水平视角（0~120°）、可视半径、是否显示轮廓线，以及两种区域颜色的独立设置，适用于安防监控覆盖分析、城市规划视线分析等场景。

```javascript
const viewshed = new App.Viewshed({
  "location": [121.47025042, 31.23065615, 90],//必填，坐标位置
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "viewshedStyle": {
    "fieldOfView": 70, //可视域水平视角范围(0~120)
    "radius": 600, //半径(单位:米)
    "outline": true, //	轮廓勾边
    "hiddenColor": "75fe97ff", //不可见区域颜色(HEXA颜色值)
    "visibleColor": "3cff71ff" //可见区域颜色(HEXA颜色值)
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(viewshed, {
  calculateCoordZ: {
    coordZRef: "ground", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```
- 成员函数

```javascript
// 示例
  const obj = new App.Viewshed({...});
  obj.Update(json);
  // 方式一：
  // obj.rotator = {pitch: 0, yaw: 30, roll: 0};
  // 方式二：
  await obj.SetRotator({pitch: 0, yaw: 30, roll: 0});
  // 方式一：
  // obj.scale3d = [30, 30, 30];
  // 方式二：
  await obj.SetScale3d([30, 30, 30]);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  // 方式一：
  // console.log(obj.location);
  // 方式二：
  await obj.GetLocation();//获取观测点坐标
  // 方式一：
  // obj.location = [121.47025042, 31.23065615, 90];
  // 方式二：
  await obj.SetLocation([121.47025042, 31.23065615, 90]);//设置观测点坐标
  obj.GetData();//获取实体当前所有属性数据
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[number, number, number]` | 观测点经纬度坐标及高度 `[lng, lat, alt]` | 否 |
| `rotator` | `{ pitch: number, yaw: number, roll: number }` | 旋转角度（-180~180） | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `fieldOfView` | `number` | 水平视角范围（0~120 度） | 否 |
| `radius` | `number` | 可视半径（米） | 否 |
| `outline` | `boolean` | 是否显示轮廓线 | 否 |
| `hiddenColor` | `string` | 不可见区域颜色（HEXA 格式） | 否 |
| `visibleColor` | `string` | 可见区域颜色（HEXA 格式） | 否 |


## Topic: 迁徒图 (id: 1386)

- 迁徒图 Parabola  
`App.Parabola` 在场景中绘制从起点到终点的空间抛物弧线，支持 `arrow`（箭头）、`solid`（实线）、`scanline`（扫描线）三种渲染类型，可控制弧顶高度、弧顶位置比例（0~1）、聚集/扩展方向（gather）以及线宽和颜色,适用于数据流向展示、城市间连线、迁徙动效等场景。

```javascript
// 1. 创建抛物线（从浦东到浦西）
const parabola = new App.Parabola({
  "polyline": {
    "coordinates": [  
      [121.49968476, 31.24861346, 44],//起点
      [121.47025042, 31.23065615, 90]//终点
    ]  //坐标位置，格式[[x,y,z],[x,y,z]]，需为2个坐标点
  },
  "parabolaStyle": {
    "topHeight": 800, //弧顶高度(单位:米)
    "topScale": 1, //弧顶位置比例(单位为%, 取值[0~1])
    "type": "scanline", //样式类型(arrow, solid, scanline)
    "width": 20, //线宽(单位:米)
    "color": "ff3fafff", //HEXA或rgba(0,0,0,0.8)
    "gather": true //true: 向内聚集, false: 向外扩展
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(parabola, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});


// 2. 修改样式
await parabola.SetType('arrow')
await parabola.SetColor('00ff00ff')
await parabola.SetWidth(30)
await parabola.SetTopHeight(1200)
await parabola.SetTopScale(0.5)
await parabola.SetGather(false)   // 向外扩展

// 3. 读取属性
const topHeight = await parabola.GetTopHeight()
console.log('弧顶高度:', topHeight.result)   // number

const type = await parabola.GetType()
console.log('样式类型:', type.result)         // string

// 4. 更新路径坐标（多点连线）
await parabola.SetCoordinates([
  [121.49968476, 31.24861346, 44],
  [121.48000000, 31.24000000, 50],
  [121.47025042, 31.23065615, 90]
])

// 5. 交互事件
parabola.onClick((ev) => {
  console.log('点击了抛物线:', ev.result.object)
})

// 6. 删除
const del = await parabola.Delete()
console.log('删除结果:', del.result)
```

- 成员函数

```javascript
// 示例
  const obj = new App.Parabola({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```
- 成员属性  

| 属性 | 类型 | 说明 | 是否只读 |
|------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `coordinates` | `[[lng, lat, alt], ...]` | 折点坐标数组 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `topHeight` | `number` | 弧顶高度（米） | 否 |
| `topScale` | `number` | 弧顶位置比例（0~1） | 否 |
| `type` | `string` | 渲染样式类型 | 否 |
| `width` | `number` | 线宽（米） | 否 |
| `color` | `string` | 颜色（HEXA） | 否 |
| `gather` | `boolean` | 聚集方向 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |

## Topic: 区域热力图 (id: 1389)

- 区域热力图 HeatMap  
WDPAPI 提供 5 种热力图类型，均通过 GeoJSON Feature 数组（`points.features`）传入数据点，每个 Feature 包含 `geometry.coordinates`（坐标）和 `properties.value`（热力值），适用于数据密度展示、区域分析、交通热度、空间分布可视化等场景。

```javascript
//创建区域热力图
const mapdata = [],//热力数据点，包含坐标和点位数值
  points = [
    [121.49656333, 31.22702479, 49],
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
const heatmap = new App.HeatMap({
  "heatMapStyle": {
    "type": "fit", //样式类型(fit: 投影型 plane: 平面型)
    "brushDiameter": 2000, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力点热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "mappingHeightRange": [0, 800],//热力图贴花高度限制（仅作用于type为fit时有效）
    "gradientSetting": [
      //自定义热力点渐变颜色(HEX颜色值)，定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大 |
      "c9ff6f", "d153fe", "01edff", "feb539", "ffd30f"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    features: mapdata // GeoJSON Feature 数组，每个 Feature 含 `geometry.coordinates` 和 `properties.value`
  }
});

const res = await App.Scene.Add(heatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔,
    coordZOffset: 10 //高度(单位:米)
  }
});


// 裁剪
await heatmap.Clip(
  [[121.45, 31.23], [121.48, 31.23], [121.47, 31.25]],
  'ff000080'
)
// 取消裁剪
await heatmap.UnClip()
// 更新热力值范围
await heatmap.SetMappingValueRange([10, 90])
const range = await heatmap.GetMappingValueRange()
console.log('热力值范围:', range.result)   // [10, 90]
```

- 成员函数

```javascript
// 示例
  const obj = new App.HeatMap({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.Get();
  obj.GetHeatValue([121.49579361,31.23447654,81]);
  obj.Filter();
  obj.UnFilter();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `heatMapStyle` | `object` | 热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 柱状热力图 (id: 1390)

- 柱状热力图

```javascript
const mapdata = [],
  points = [
    [121.48766129, 31.23586660, 35],
    [121.49968476, 31.24861346, 44],
    [121.49956979, 31.25093239, 96],
    [121.47613890, 31.23725069, 39]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)//需要在“mappingValueRange”定义的区间内
  })
}
const columnarheatmap = new App.ColumnarHeatMap({
  "columnarHeatMapStyle": {
    "type": "cube", //柱状热力图柱体外观类型; (cube:方柱, cylinder:圆柱, needle:针状, frame:线框)
    "brushDiameter": 550, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力点热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "columnarWidth": 5, //(单位:米), 单个柱子的直径，单位米；若单个柱子直径较小，表现上过渡平滑，但会让单个点位包含更多柱子，效率降低
    "mappingValueRange":[10, 90],//热力值映射范围
    "mappingHeightRange": [0, 500], //单体柱表达最小值,最大的实际高度(单位:米)
    "enableGap": false, //true 开启柱间隙; false 柱子之间紧贴无间隙
    "gradientSetting": [
      //自定义热力点渐变颜色(HEX颜色值)
      "ffae12", "8f62ff", "60ff4b", "a207ff", "ff15c8"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    "features": mapdata
  }
});

const res = await App.Scene.Add(columnarheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.ColumnarHeatMap({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.GetData();//获取柱状热力图实体的所有属性对象
  obj.GetHeatValue([121.49579361,31.23447654,81]);
  obj.Filter();
  obj.UnFilter();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `columnarHeatMapStyle` | `object` | 柱状热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 点云热力图 (id: 1391)

- 点云热力图 SpaceHeatMap

```javascript
const mapdata = [],
  points = [
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
const spaceheatmap = new App.SpaceHeatMap({
  "spaceHeatMapStyle": {
    "brushDiameter": 100, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "gradientSetting": [
      //自定义渐变颜色(HEX颜色值)	,定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大
      "0000ff", "ff5500", "00ff00", "ffff00", "00ffff"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    "features": mapdata
  }
});

const res = await App.Scene.Add(spaceheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.SpaceHeatMap({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.GetData();// 获取点云热力图实体的所有属性对象
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `spaceHeatMapStyle` | `object` | 点云热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 3D网格热力图 (id: 1393)

- 3D网格热力图 MeshHeatMap
> 版本要求：SDK >= 2.0.2 或 >= 1.15.4
```javascript
const mapdata = [],
points = [
  [121.50646076,31.05227214],
  [121.53648849,31.05375943],
  [121.52800827,31.05715536],
  [121.51782879,31.06306783],
  [121.51136453,31.05309944],
];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
//tip::: Create covering
const meshHeatMap = new App.MeshHeatMap({
  "meshHeatMapStyle": {
    "pointData": mapdata, // 用于生成mesh的点数据数组
    "meshBoundary": points, // 用于限制Mesh边界的多边形，至少三个点，为空时默认生成矩形范围的Mesh
    "pointCoordZ": 0, // 点的高度值
    "meshGridSpace": 100, // 网格单元大小，用于控制生成的Mesh密度，值越小密度越大越光滑，但是相应性能消耗较大
    "mappingValueRange": [ 0, 50 ], // 点业务值有效范围，用于截取业务值，Range为空时默认不截取
    "mappingHeightRange": [ 0, 50 ], // 点业务值映射的Mesh高度变化范围，范围越大Mesh起伏越大
    "gradientSetting": [ // 业务值映射颜色渐变设置，基于给定的颜色数组线性插值颜色，至少要有两个颜色
      "00ffff",
      "fdff00",
      "009fff",
      "f300ff",
      "ff0000"
    ],
    "opacity": 0.5 // 热力图茎体透明度，范围0-1
  },
  "entityName": "my-meshheatmap-id",
  "customId": "my-meshheatmap-id",
  "customData": {
    "data": "myCustomData"
  }
});
//tip::: 向场景中添加实体
const res = await App.Scene.Add(meshHeatMap,{
  "calculateCoordZ": {  //[可选] 最高优先级
    "coordZRef": "surface",//Surface:表面;Ground:地面;Altitude:海拔
    "coordZOffset": 50 //高度(单位:米)
  }
});
console.log(res);
```

- 成员函数

```javascript
// 示例
  const obj = new App.MeshHeatMap({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.GetData();//获取3D网格热力图实体的所有属性对象
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `spaceHeatMapStyle` | `object` | 点云热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 栅格图 (id: 1394)

- 栅格图 Raster  
`App.Raster` 在场景中指定地理坐标处叠加一张图片，以米为单位定义宽高，支持透明度控制。常用于在三维地图上叠加卫星影像、热力底图、自定义图层等平铺图片资源。


```javascript
const raster = new App.Raster({
  "rasterStyle": {
    "path": "http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif", //tif格式支持：Float32 - Thirty two bit floating point;tif文件地址，支持2种形式：·在线地址：如"http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif"·本地地址：如"D:/xxx/raster.tif"； D: 在线席位所在盘符
    "type": "fit", //样式类型(fit: 投影型 plane: 平面型)
    "gradientSetting": [
      //自定义渐变颜色(HEXA颜色值)
      "91ffd5", "ff1af5", "ff0455", "ff71d3", "fed500"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(raster, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Raster({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  // 方式一：
  // console.log(obj.location);
  // 方式二：
  await obj.GetLocation();//获取栅格图的中心坐标位置
  // 方式一：
  // obj.location = [121.47025042, 31.23065615, 90];
  // 方式二：
  await obj.SetLocation([121.47025042, 31.23065615, 90]);//设置栅格图的中心坐标位置
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[lng, lat, alt]` | 栅格图中心坐标 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `url` | `string` | 图片 URL | 否 |
| `size` | `[w, h]` | 栅格尺寸（米） | 否 |
| `opacity` | `number` | 透明度（0~1） | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |
| `parentEid` | `string` | 父实体 EID | 否 |
| `index` | `number` | 排序索引 | 否 |


## Topic: 高亮区域 (id: 1395)

- 高亮区域 HighlightArea  
`App.HighlightArea` 在场景中以多边形区域（Polygon2D）方式标记并高亮一块地理范围，支持内部/外部颜色、外部勾边颜色，以及饱和度（-100~100）、亮度（-100~100）、对比度（-100~100）的图像调整参数，适用于区域标注、地块高亮、兴趣区展示等场景。

```javascript
const highlightarea = new App.HighlightArea({
  "polygon2D": {
    "coordinates": [
      [
        [121.44988564758069, 31.250519581243555],
        [121.44931229954645, 31.237062463089813],
        [121.47069915607464, 31.23800903013435],
        [121.46964214200186, 31.251854247249092]
      ]
    ]
  },
  "highlightAreaStyle": {
    "interiorColor": "cbba89ff", //内部颜色，HEXA
    "exteriorColor": "00ffffff", //外部颜色，HEXA
    "exteriorOutlineColor": "ff00ffff", //外部勾边颜色
    "exteriorSaturation": 10, //饱和度(-100, 100)
    "exteriorBrightness": 15, //亮度(-100, 100)
    "exteriorContrast": 10 //对比度(-100, 100)
  },
  "bVisible": true
});

const res = await App.Scene.Add(highlightarea, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});


// 2. 修改颜色
await highlightArea.SetInteriorColor('ff000080')
await highlightArea.SetExteriorColor('0000ff40')
await highlightArea.SetExteriorOutlineColor('ffff00ff')

// 3. 调整图像参数
await highlightArea.SetExteriorSaturation(-20)
await highlightArea.SetExteriorBrightness(30)
await highlightArea.SetExteriorContrast(5)

// 4. 更新区域范围
await highlightArea.SetCoordinates([[
  [121.44988564758069, 31.250519581243555],
  [121.44931229954645, 31.237062463089813],
  [121.48000000000000, 31.24000000000000],
  [121.46964214200186, 31.251854247249092]
]])

// 5. 交互事件
highlightArea.onClick((ev) => {
  console.log('点击了高亮区域:', ev.result.object)
})

// 6. 删除
const del = await highlightArea.Delete()
console.log('删除结果:', del.result)
```
- 参数描述

1. 当设置一个高亮轮廓时，customColors的优先级高于interiorColor

2. 当exteriorColor和exteriorOutlineColor的颜色透明度设置成ff，exteriorSaturation，exteriorBrightness，exteriorContrast不生效

3. 其他当exteriorColor和exteriorOutlineColor的颜色透明度设置成不透明，exteriorSaturation，exteriorBrightness，exteriorContrast都生效，且效果叠加

4. 高亮区域是一个色块，不是一个模型或者box，所以没有交互能力（即鼠标点击、鼠标滑入滑出等能力）  

- 成员函数

```javascript
// 示例
  const obj = new App.HighlightArea({...});
  obj.Update(json);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `coordinates` | `[[[lng, lat], ...]]` | 多边形顶点坐标数组 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `interiorColor` | `string` | 内部颜色（HEXA） | 否 |
| `exteriorColor` | `string` | 外部颜色（HEXA） | 否 |
| `exteriorOutlineColor` | `string` | 外部勾边颜色（HEXA） | 否 |
| `exteriorSaturation` | `number` | 外部饱和度（-100~100） | 否 |
| `exteriorBrightness` | `number` | 外部亮度（-100~100） | 否 |
| `exteriorContrast` | `number` | 外部对比度（-100~100） | 否 |

---

