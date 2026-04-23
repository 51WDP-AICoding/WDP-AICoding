# Official excerpt sync: 路径与运动覆盖物

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 路径与运动覆盖物, categoryId: 572)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 粒子特效 (id: 1381)

- 粒子特效 Effects

```javascript
const entityObj = new App.Effects({
  "location": [121.51132810, 31.23485399, 52],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 0, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [1, 1, 1],
  "bVisible": true, //是否可见(true/false)
  "speed": 1, //动画速率
  "seedId": "ac2a41915c7c7097be7dc64602e0e4fb", //模型编号，seedId来自平台粒子特效
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(entityObj, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Effects({...});
  obj.Update(json);
  // 方式一：
  // obj.rotator = {pitch: 0, yaw: 0, roll: 0};
  // 方式二：
  await obj.SetRotator({pitch: 0, yaw: 0, roll: 0});
  // 方式一：
  // obj.scale3d = [1, 1, 1];
  // 方式二：
  await obj.SetScale3d([1, 1, 1]);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
  // 方式一：
  // console.log(obj.entityName);
  // 方式二：
  await obj.GetEntityName();
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 路径 (id: 1385)
- 路径 Path  
`App.Path` 在场景中绘制折线路径，支持 `arrow`（箭头）、`solid`（实线）、`scanline`（扫描线）、`dashed`（虚线）四种样式，可设置颜色、宽度、透明度和动画速度。注意：Path **不支持旋转和缩放**（Transform）操作。

```javascript
const path = new App.Path({
  "polyline": {
    "coordinates": [
      [121.49968476, 31.24861346, 44],
      [121.49956979, 31.25093239, 96],
      [121.47613890, 31.23725069, 39]
    ]
  },//坐标位置,格式[[x,y,z],[x,y,z],....]
  "pathStyle": {
    "type": "arrow",//路径样式,取值范围：fit_solid(贴合地面), adaptive_solid(等宽路径), none, solid, arrow, arrow_dot, dashed_dot,arrow_dashed, flash, scan_line, brimless_arrow, railway, pipe_round, pipe_square, dashed_line
    "width": 100,//	宽度,单位米(在"adaptive_solid"中,单位像素)
    "color": "b4fed7", //HEX或rgb(0,0,0)
    "passColor": "ffb3deff",//实体已移动的颜色,应用于"实体沿路径移动"
    "speedupFactor":1,//任一数值，加速比，相对于原速度的加成比例，支持正负数，正负表示方向，仅对以下type生效：arrow round_pipe square_pipe railway brimless_arrow dashed_line arrow_dot arrow_dashed dashed_dot flash scan_line
    "opacity":1,//	路径透明度，仅对一下type生效：scan_line,取值范围：[0,1]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(path, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Path({...});
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
  //动态增删路径折点，无需重建实体
  obj.Modify({ 
    method: 'add', //操作类型：'add'/'delete'
    index: [2, 0], //`add` 时为插入位置；`delete` 时为 `[起始索引, 删除数量]`
    coordinates: [[121.475, 31.235, 0]] // `add` 时提供要插入的坐标点列表；`delete` 时可省略
    });

```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[x, y, z]` | 路径整体位置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `sType` | `string` | 样式类型 | 否 |
| `width` | `number` | 路径宽度（米） | 否 |
| `speedupFactor` | `number` | 动画速度倍数 | 否 |
| `opacity` | `number` | 透明度（0~1） | 否 |
| `color` | `string` | 路径颜色（HEXA） | 否 |
| `passColor` | `string` | 已经过路径颜色（HEXA） | 否 |
| `coordinates` | `[[x, y, z], ...]` | 路径折点坐标数组 | 否 |
| `bClosed` | `boolean` | 是否闭合路径 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |

## Topic: 路径热力图 (id: 1392)

- 路径热力图 RoadHeatMap

```javascript
//热力数据点，包含坐标和点位数值
const mapdata = [],
  points = [
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)//点位数值，需要在“mappingValueRange”定义的区间内
  })
}
const roadheatmap = new App.RoadHeatMap({
  "roadHeatMapStyle": {
    "width": 50, //宽度
    "mappingValueRange": [1, 100], //热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "gradientSetting": [
      //自定义渐变颜色(HEX颜色值),定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大
      "ff91fd", "cdff75", "ff9e79", "ff07a2", "fea587"
    ],
    "type": "plane", //类型(fit: 投影型 plane: 平面型)
    "filter": ["water"] //fit类型时, 生效的图层; 值为空则作用所有图层
    //常用的filter: "building","terrain","water","road","tree"
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

const res = await App.Scene.Add(roadheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.RoadHeatMap({...});
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

