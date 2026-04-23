# Official excerpt sync: 实体移动与批量操作

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 实体移动与批量操作, categoryId: 571)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 实体[批量]行为 (id: 1368)

- [批量]添加实例 (同类型)

```javascript
const normal = { // ========== 通用样式
  "type": "Path",//示例：批量添加路径(path)类型实体
  "entityName": "myName",  //可选
  "pathStyle": {
    "width": 100,
    "passColor": "dc0affff"
  }
}
const dataArr = [ // ========== 数据体
  {
    "polyline": {
      "coordinates": [
        [121.48595648, 31.24834326, 30],
        [121.48600786, 31.24252899, 30],
        [121.50577283, 31.22653989, 30]
      ]
    },
    "customId": "myId1",
    "pathStyle": {
      "type": "arrow",
      "color": "78ffffff"
    }
  },
  {
    "polyline": {
      "coordinates": [
        [121.49709136, 31.22516669, 30],
        [121.49662428, 31.23543741, 30],
        [121.51043061, 31.22969411, 30]
      ]
    },
    "customId": "myId2",
    "pathStyle": {
      "type": "solid",
      "color": "52f1feff"
    }
  }
]

const res = await App.Scene.Create(normal, dataArr,
  {  //  [可选] 坐标类型及坐标高度; 最高优先级
    calculateCoordZ: {
      coordZRef: "surface", // surface: 表面; ground: 地面; altitude: 海拔
      coordZOffset: 50 // 高度(单位:米)
    }
  }
)
console.log(res)
```

- [批量]添加实例 (多类型)

```javascript
const jsondata = [
  //====== Window  窗口
  {
    "type": "Window",
    "location": [121.46426478,31.22406702,47],
    "windowStyle": {
      "url": "http://wdpapi.51aes.com/doc-static/images/static/echarts.html",
      "size": [500, 350],
      "offset": [0, 0]
    },
    "bVisible": true,
    "entityName": "myName1",
    "customId": "myId1",
    "customData": {
      "data": "Window"
    }
  },

  //====== Poi
  {
    "type": "Poi",
    "location": [121.46491415,31.21866105,87],
    "poiStyle": {
      "markerNormalUrl": "http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png",
      "markerActivateUrl": "http://wdpapi.51aes.com/doc-static/images/static/markerActive.png",
      "markerSize": [100, 228],
      "labelBgImageUrl": "http://wdpapi.51aes.com/doc-static/images/static/LabelBg.png",
      "labelBgSize": [200, 50],
      "labelBgOffset": [50, 200],
      "labelContent": [" 文本内容A", "ff0000ff", "24"]
    },
    "bVisible": true,
    "entityName": "myName2",
    "customId": "myId2",
    "customData": {
      "data": "Poi"
    }
  },

  //====== Particle  特效
  {
    "type": "Particle",
    "location": [121.49172858,31.22476437,67],
    "rotator": {
      "pitch": 0,
      "yaw": 30,
      "roll": 0
    },
    "bVisible": true,
    "scale3d": [50, 50, 50],
    "particleType": "vehicle_taxi",
    "entityName": "myName3",
    "customId": "myId3",
    "customData": {
      "data": "Particle"
    }
  },

  //====== Text3D  3D文字
  {
    "type": "Text3D",
    "location": [121.46376561,31.22870602,76],
    "rotator": {
      "pitch": 0,
      "yaw": 30,
      "roll": 0
    },
    "scale3d": [1000, 100, 100],
    "text3DStyle": {
      "text": "3D文字",
      "color": "10ff1bff",
      "type": "plain",
      "outline": 0.4,
      "portrait": false,
      "space": 0.1
    },
    "bVisible": true,
    "entityName": "myName4",
    "customId": "myId3",
    "customData": {
      "data": "Text3D"
    }
  },

  //====== Viewshed  可视域
  {
    "type": "Viewshed",
    "location": [121.47315875,31.24472542,27],
    "rotator": {
      "pitch": 0,
      "yaw": 30,
      "roll": 0
    },
    "viewshedStyle": {
      "fieldOfView": 70,
      "radius": 600,
      "outline": true,
      "hiddenColor": "ff136dff",
      "visibleColor": "feaecfff"
    },
    "bVisible": true,
    "entityName": "myName5",
    "customId": "myId5",
    "customData": {
      "data": "Viewshed"
    }
  },

  //====== Path  路径
  {
    "type": "Path",
    "polyline": {
      "coordinates": [
        [121.50114770,31.23691142,93],
        [121.48007773,31.22050415,27],
        [121.47985493,31.24031196,45],
        [121.49030648,31.23537047,33]
      ]
    },
    "pathStyle": {
      "type": "arrow",
      "width": 100,
      "color": "eaffc7ff",
      "passColor": "ff6d96ff"
    },
    "bVisible": true,
    "entityName": "myName6",
    "customId": "myId6",
    "customData": {
      "data": "Path"
    }
  },

  //====== Parabola  迁徙图
  {
    "type": "Parabola",
    "polyline": {
      "coordinates": [
        [121.47607446,31.24372538,84],
        [121.48749492,31.23361823,8]
      ]
    },
    "parabolaStyle": {
      "topHeight": 800,
      "topScale": 1,
      "type": "scanline",
      "width": 20,
      "color": "b1ff8bff",
      "gather": true
    },
    "bVisible": true,
    "entityName": "myName7",
    "customId": "myId7",
    "customData": {
      "data": "Parabola"
    }
  },

  //====== Range  区域轮廓
  {
    "type": "Range",
    "polygon2D": {
      "coordinates": [
        [
          [121.47122131,31.24264779],
          [121.48769236,31.23035225],
          [121.50016626,31.22821735]
        ]
      ]
    },
    "rangeStyle": {
      "type": "loop_line",
      "fillAreaType": "block",
      "height": 200,
      "strokeWeight": 10,
      "color": "6fff46ff"
    },
    "bVisible": true,
    "entityName": "myName8",
    "customId": "myId8",
    "customData": {
      "data": "Range"
    }
  },

  //====== HeatMap  热力图
  {
    "type": "HeatMap",
    "heatMapStyle": {
      "type": "fit",
      "brushDiameter": 2000,
      "mappingValueRange": [1, 100],
      "gradientSetting": [
        "b4ff25ff", "a174ffff", "2e15feff", "d0ff30ff", "b3ffa4ff"
      ]
    },
    "bVisible": true,
    "entityName": "myName9",
    "customId": "myId9",
    "customData": {
      "data": "HeatMap"
    },
    "points": {
      "features": [
        {
          "point": [121.48783892,31.22955413,91],
          "value": 87
        },
        {
          "point": [121.49360144,31.23134998,41],
          "value": 80
        },
        {
          "point": [121.46524329,31.24312496,77],
          "value": 95
        },
        {
          "point": [121.48712254,31.24286490,34],
          "value": 70
        },
        {
          "point": [121.47944776,31.24252262,86],
          "value": 65
        }
      ]
    }
  },

  //====== ColumnarHeatMap  柱状热力图
  {
    "type": "ColumnarHeatMap",
    "columnarHeatMapStyle": {
      "type": "cube",
      "brushDiameter": 1000,
      "mappingValueRange": [1, 100],
      "columnarWidth": 20,
      "mappingHeightRange": [0, 500],
      "enableGap": false,
      "gradientSetting": [
        "f7ffbfff", "ff0083ff", "8991ffff", "a0a7feff", "ff2131ff"
      ]
    },
    "bVisible": true,
    "entityName": "myName10",
    "customId": "myId10",
    "customData": {
      "data": "ColumnarHeatMap"
    },
    "points": {
      "features": [
        {
          "point": [121.49140589,31.25237391,61],
          "value": 87
        },
        {
          "point": [121.48047463,31.22617967,38],
          "value": 80
        },
        {
          "point": [121.48477522,31.23823883,84],
          "value": 95
        },
        {
          "point": [121.48203408,31.25113752,16],
          "value": 70
        },
        {
          "point": [121.49542774,31.23945532,13],
          "value": 65
        }
      ]
    }
  },

  //====== RoadHeatMap  路径热力图
  {
    "type": "RoadHeatMap",
    "roadHeatMapStyle": {
      "width": 50,
      "mappingValueRange": [1, 100],
      "gradientSetting": [
        "ffee1aff", "ffb540ff", "f4ff4bff", "d961feff", "b456ffff"
      ],
      "type": "plane",
      "filter": []
    },
    "bVisible": true,
    "entityName": "myName11",
    "customId": "myId11",
    "customData": {
      "data": "RoadHeatMap"
    },
    "points": {
      "features": [
        {
          "point": [121.47799331,31.23097751,83],
          "value": 87
        },
        {
          "point": [121.49095564,31.22740179,57],
          "value": 80
        },
        {
          "point": [121.46961736,31.24484216,93],
          "value": 95
        },
        {
          "point": [121.49208500,31.25120664,52],
          "value": 70
        },
        {
          "point": [121.48651742,31.22413720,30],
          "value": 65
        }
      ]
    }
  },

  //====== SpaceHeatMap  点云热力图
  {
    "type": "SpaceHeatMap",
    "spaceHeatMapStyle": {
      "brushDiameter": 100,
      "mappingValueRange": [1, 100],
      "gradientSetting": [
        "0000ff", "ff5500", "00ff00", "ffff00", "00ffff"
      ]
    },
    "bVisible": true,
    "entityName": "myName12",
    "customId": "myId12",
    "customData": {
      "data": "SpaceHeatMap"
    },
    "points": {
      "features": [
          {
          "point": [121.48641573,31.23901035,87],
          "value": 87
        },
        {
          "point": [121.46117788,31.22258222,89],
          "value": 80
        },
        {
          "point": [121.47008568,31.22681936,13],
          "value": 95
        },
        {
          "point": [121.49895380,31.22317413,65],
          "value": 70
        },
        {
          "point": [121.47750177,31.22547035,94],
          "value": 65
        }
      ]
    }
  },

  //====== Range  圆形区域轮廓
  {
  "type": "Range",
    "circlePolygon2D": {
      "center": [121.49986350,31.24269398,49],
      "radius": 300
    },
    "rangeStyle": {
      "shape": "circle",
      "type": "grid",
      "fillAreaType": "radar",
      "height": 150,
      "strokeWeight": 10,
      "color": "2948feff"
    },
    "bVisible": true,
    "entityName": "myName13",
    "customId": "myId13",
    "customData": {
      "data": "CircleRange"
    }
  }，

  //======light  灯光
 {
    "type": "Light",
    "location": [121.49189794,31.24282414,0],
    "rotator": {
      "pitch": 0,
      "yaw": 0,
      "roll": 0
    },
    "scale3d": [100, 100, 100],
    "lightStyle": {
      "intensity": 40,
      "color": "ff00ff",
      "angle": 50,
      "attenuation": 200,
      "shadows": true,
      "haze": true,
      "haze_Intensity": 90
    }，
    "bVisible": true,
    "entityName": "myName14",
    "customId": "myId14",
    "customData": {
      "data": "CircleRange"
    }
 }
]

const res = await App.Scene.Creates(jsondata, { // 坐标类型
  "calculateCoordZ": {  //  [可选]；坐标类型及坐标高度; 最高优先级
    "coordZRef":"surface",// surface: 表面; ground: 地面; altitude: 海拔,
    "coordZOffset": 200 // 海拔高度(单位:米)
  }
});
console.log(res);
```

- [批量]添加实例 (多对象)

```javascript
const objs = [poiObject, pathObject, particleObject...];
const res = await App.Scene.Add(objs, {
  calculateCoordZ: {   // 坐标类型及坐标高度; [可选] 最高优先级
    coordZRef: "surface", //surface:表面; ground:地面; altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
console.log(res);
```

- [批量]设置实例缩放: 相同倍数  
多个对象缩放相同倍数

```javascript
const obj = [ // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 粒子特效 Effects, 灯光 Light, 模型)
  particleObj, text3dObj
];

const res = await App.Scene.SetScale3D(obj, {
  x: 400, //缩放比例
  y: 400,
  z: 400
});
console.log(res);
```

- [批量]设置实例缩放: 不同倍数  
多个对象缩放不同倍数

```javascript
const res = await App.Scene.SetScale3Ds([
    {
        object: cache.get('particle'),  // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        scale3d: { x: 200, y: 200, z: 200 }
    },
    {
        object: cache.get('text3d'),  // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        scale3d: { x: 400, y: 400, z: 400 }
    }
]);
console.log(res);
```

- [批量]设置实例旋转: 同角度  
多个对象旋转到同一角度

```javascript
const obj = [ // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
  particleObj, text3dObj  
];

const res = await App.Scene.SetRotator(obj, {
  "pitch": 0, //俯仰角, 参考(-180~180)
  "yaw": 60, //偏航角, 参考(0正北, -180~180)
  "roll": 0 //翻滚角, 参考(-180~180)
});
console.log(res);
```

- [批量]设置实例旋转: 不同角度  
多个对象旋转到不同角度

```javascript
const res = await App.Scene.SetRotators([
    {
        object: cache.get('particle'),  // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        rotator: { "pitch": 0, "yaw": 60, "roll": 0 }
    },
    {
        object: cache.get('text3d'),  // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        rotator: { "pitch": 0, "yaw": 30, "roll": 0 }
    }
]);
console.log(res);
```

- [批量]设置实例位置: 同位置  
多个对象移动到同一个位置
```javascript
const obj = [ // 单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
  particleObj, text3dObj  
];

const res = await App.Scene.SetLocation(obj, {
  x: 121.48701062,
  y: 31.23299679,
  z: 100
});
console.log(res);
```

- [批量]设置实例位置: 不同位置  
多个对象移动到不同位置
```javascript
const res = await App.Scene.SetLocations([
    {
        object: cache.get('particle'),  //单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        location: { x: 121.48814278, y: 31.22652611, z: 100 }
    },
    {
        object: cache.get('text3d'),   //单体3D实体对象(场景特效 Particle, 3D文字 Text3D, 可视域 Viewshed, 粒子特效 Effects, 灯光 Light, 模型)
        location: { x: 121.48814278, y: 31.24652611, z: 100 }
    }
]);
console.log(res);
```

- [批量]设置实例显隐

```javascript
const obj = [ 
  particleObj, text3dObj, pathObj  // 实体对象
];

const res = await App.Scene.SetVisible(obj, false);
//true: 显示; false: 隐藏
console.log(res);
```

- [批量]设置实例锁定/解锁

```javascript
const obj = [ 
  particleObj, text3dObj, pathObj  // 实体对象
];

await App.Scene.SetLocked(obj, false);
//true: 锁定; false: 解锁
console.log(res);
```

- [批量]更新同类型实体

```javascript
// 此示例通过对象批量更新路径(path)样式
const jsondata = {
  "pathStyle": {
    "type": "solid",
    "width": 100,
    "color": "99ebffff",
    "passColor": "bdffedff"
  }
}

const obj = [ 
  path1Obj, path2Obj, path3Obj  // 同类型实体对象
];

const res = await App.Scene.Update(obj, jsondata, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
console.log(res);
```

- [批量]更新多类型实体

```javascript
const particleJson = {  // particle jsondata
    "rotator": {
        "pitch": 0,
        "yaw": 10,
        "roll": 0
    },
    "scale3d": [50, 50, 50],
    "particleType": "vehicle_car_black"
}

const pathJson = {  // path jsondata
    "pathStyle": {
        "type": "solid",
        "width": 100,
        "color": "ff17e7ff",
        "passColor": "e241ffff"
    }
}

const res = await App.Scene.Updates([
    { object: cache.get('particle'), jsonData: particleJson },  // 数据结构 { object: object, jsonData: entityJson }
    { object: cache.get('path'), jsonData: pathJson },
], {  // [可选] 坐标类型及坐标高度; 最高优先级
    calculateCoordZ: {
        coordZRef: 'ground',  // surface: 表面; ground: 地面; altitude: 海拔
        coordZOffset: 10  // 高度(单位:米)
    }
});

// cache.get('particle'), cache.get('path') 创建此实体时缓存的对象
```

- [批量]删除实例

```javascript
const obj = [ 
  particleObj, text3dObj, pathObj  // 实体对象
];

const res = await App.Scene.Delete(obj);
console.log(res);
```

## Topic: 实体移动 (id: 1369)

- 实体移动 Bound  
实体移动是创建一个实体与路径的bound，实体是与路径绑定的
```javascript
const path = new App.Path({
  "polyline": {
    "coordinates": [
      [121.45378835,31.11244461,69],
      [121.47707094,31.0923774,85],
      [121.45493835,31.11174904,94],
      [121.47697603,31.09265285,33],
      [121.46656664,31.11655328,41],
      [121.47577947,31.09422706,56],
    ],
  },
  "pathStyle": {
    "type": "arrow",
    "width": 20,
    "speedupFactor": 1,
    "opacity": 1,
    "color": "a54cffff",
    "passColor": "c9ff23ff"
  },
  "customId": "my-movePath-id",
  "bVisible": true //是否可见(true/false)
});
const { success } = await App.Scene.Add(path,{
  "calculateCoordZ": {  //[可选] 最高优先级
    "coordZRef": "surface",//Surface:表面;Ground:地面;Altitude:海拔
    "coordZOffset": 50 //高度(单位:米)
  }
});
if (success) {
  //tip::: 添加覆盖物(小车)
  const particle = new App.Particle({
    "location": [121.45378835,31.11244461,69],
    "rotator": {
      "pitch": 0, //俯仰角
      "yaw": 0, //偏航角(0北)
      "roll": 0 //翻滚角
    },
    "scale3d": [30, 30, 30],
    "particleType": "vehicle_taxi",
    "customId": "my-moveParticle-id",
    "bVisible": true //是否可见(true/false)
  });
  await App.Scene.Add(particle,{
    "calculateCoordZ": {  //[可选] 最高优先级
      "coordZRef": "surface",//Surface:表面;Ground:地面;Altitude:海拔
      "coordZOffset": 50 //高度(单位:米)
    }
  });
  //wide::: 覆盖物(小车) 沿路径移动
  const moveObj = new App.Bound({
    "moving": particle, //移动的覆盖物
    "path": path, //路径
    "boundStyle": {
      "time": 50, //总时长(单位:秒)
      "bLoop": true, //是否循环(true/false)
      "bReverse": false, //是否反向移动(true/false)
      "state":"play", //play:移动；pause:暂停；stop：停止
    },
    "customId": "my-moveObj-id",
    "rotator":{
      "pitch": 0, // 相对路径的俯仰角，上+，下-，参考(-180~180)
      "yaw": 0, // 相对路径的偏航角, 左+，右-，参考(0沿路径, -180~180)
      "roll": 0 // 相对路径的翻滚角,左+，右-， 参考(-180~180)
    },// 原始设置清空，使用自动匹配，相对角度调整用rotator
    "offset":{
      "left": 0, // 相对路径走向的左右调整，左+，右-，单位：米
      "forward": 0, // 沿着路径的前后调整，前+，后-，单位：米
      "up": 0 // 相对路径走向的垂直上下，上+，下-，单位：米
    }, // 原始设置清空，使用自动匹配，相对位置调整用offset
  });
  await App.Scene.Add(moveObj);
  const jsondata = {
    "rotation": {
      "pitch": -40, //俯仰角(-90~0)
      "yaw": 50, //偏航角(-180~180; 0:东; 90:南; -90:北)
    },
    "distanceFactor": 0.8, //聚焦倍率[0.1 ~ 1]
    "flyTime": 1, //过渡时长(单位:秒)
    "entity": [path] //覆盖物对象
  }
  await App.CameraControl.Focus(jsondata);
}
//bLoop为false时，实体移动到终点停止后，如果要再次从头移动，请先更新state为stop后，再play。
```

- 更新实体移动

```javascript
// 方式一：直接更新路径点
const jsondata = {
  "moving":particle, //移动的覆盖物；particle为创建的对象
  "path": path, //路径；path为创建的对象
  "boundStyle": {
    "bLoop": true, //是否循环(true/false)
    "state":"play", //play:移动；pause:暂停；stop：停止
    "pathUpdatePoints": [[-154.29668951,483.69997297,34], [-154.32559641,483.7124225,2]] //路径更新点
  },
  "rotator":{
    "pitch": 10, // 相对路径的俯仰角，上+，下-，参考(-180~180)
    "yaw": 20, // 相对路径的偏航角, 左+，右-，参考(0沿路径, -180~180)
    "roll": 30 // 相对路径的翻滚角,左+，右-， 参考(-180~180)
  },// 原始设置清空，使用自动匹配，相对角度调整用rotator
  "offset":{
    "left": 50, // 相对路径走向的左右调整，左+，右-，单位：米
    "forward": 20, // 沿着路径的前后调整，前+，后-，单位：米
    "up": 10 // 相对路径走向的垂直上下，上+，下-，单位：米
  }, // 原始设置清空，使用自动匹配，相对位置调整用offset
}
const res = await cache.get('moveObj').Update(jsondata);
console.log(res);
```

- 更新实体移动（使用 TransformPointsByCoordZRef 转换坐标高度）

```javascript
// 方式二：使用 TransformPointsByCoordZRef 更新路径偏移高度，获取更新后的路径坐标
const pointZ = await App.Tools.Coordinate.TransformPointsByCoordZRef({
    points: [[-154.29668951,483.69997297,34], [-154.32559641,483.7124225,2]],
    coordZRef: 'surface',  // surface:表面; ground:地面; altitude:海拔
    coordZOffset: 50       // 高度偏移(单位:米)
});
console.log(pointZ);  // 返回转换后的坐标点

const jsondata = {
  "moving":particle, //移动的覆盖物；particle为创建的对象
  "path": path, //路径；path为创建的对象
  "boundStyle": {
    "bLoop": true, //是否循环(true/false)
    "state":"play", //play:移动；pause:暂停；stop：停止
    "pathUpdatePoints": pointZ.result.points //使用转换后的路径更新点
  },
  "rotator":{
    "pitch": 10, // 相对路径的俯仰角，上+，下-，参考(-180~180)
    "yaw": 20, // 相对路径的偏航角, 左+，右-，参考(0沿路径, -180~180)
    "roll": 30 // 相对路径的翻滚角,左+，右-， 参考(-180~180)
  },
  "offset":{
    "left": 50, // 相对路径走向的左右调整，左+，右-，单位：米
    "forward": 20, // 沿着路径的前后调整，前+，后-，单位：米
    "up": 10 // 相对路径走向的垂直上下，上+，下-，单位：米
  }
}
const res = await cache.get('moveObj').Update(jsondata);
console.log(res);
```
- Bound中可以更新的属性

| 属性 | 子属性 | 是否可以更新 |
|:---|:---|:---:|
| moving | - | 是 |
| path | - | 是 |
| boundStyle | time | 否 |
|  | bLoop | 是 |
|  | bReverse | 否 |
|  | state | 是 |
| rotator | pitch | 是 |
|  | yaw | 是 |
|  | roll | 是 |
| offset | left | 是 |
|  | forward | 是 |
|  | up | 是 |

- 成员函数

```javascript
// 示例
const obj = new App.Bound({ ...});
obj.Update(json); //同Add中的参数
//bound中可以更新的属性：moving、path、boundStyle的bLoop、state属性、rotator的pitch、yaw、roll属性、offset的left、forward、up属性
obj.SetTime(50);
obj.SetReverse(false); //是否反向移动(true/false)；false为正向移动，true为反向移动
obj.SetLoop(true); //是否循环(true/false)；true为循环移动，false为到达终点后终止
obj.SetState('pause'); //play:移动; pause:暂停; stop:停止
obj.SetOffset({
  "left": 0, //实体相对路径走向的左右调整，左+，右-，单位：米
  "forward": 0, //实体沿着路径的前后调整，前+，后-，单位：米
  "up": 0 //实体相对路径走向的垂直上下，上+，下-，单位：米
});
// 方式一：
// obj.rotator = {pitch: 0, yaw: 30, roll: 0};
// 方式二：
await obj.SetRotator({ 
  "pitch": 0, //相对路径的俯仰角，上+，下-，参考(-180~180)
  "yaw": 30, //相对路径的偏航角, 左+，右-，参考(0沿路径, -180~180)
  "roll": 0 //相对路径的翻滚角,左+，右-， 参考(-180~180)
});
// 方式一：
// obj.bVisible = boolean;
// 方式二：
await obj.SetVisible(boolean);
obj.Get();
obj.Delete();
```

## Topic: 数据驱动实体移动 (id: 1370)

- 数据驱动实体移动  
数据驱动实体移动的移动过程实体不是与路径绑定的，可以实现多个实体同时通过一个目标点；  
为对象指定目标点和运动时间。对象会从当前位置按照规定的时间平移到目标点；  
当数组中包含多个不同对象的运动信息时，它们会近乎在同一时间开始第一次运动，对于其中的每一个对象，到达各自的目标点后，它会自动向下一个目标点运动。  

```javascript
const poi = new App.Poi({
  "location": [121.37624691,31.15963937,37],
  "poiStyle": {
    "markerNormalUrl": "https://wdpapi.51aes.com/doc-static/images/static/markerNormal.png",
    "markerActivateUrl": "https://wdpapi.51aes.com/doc-static/images/static/markerActive.png",
    "markerSize": [50,114],
    "labelBgImageUrl": "https://wdpapi.51aes.com/doc-static/images/static/LabelBg.png",
    "labelBgSize": [115,22],
    "labelBgOffset": [25,100], //x>0,y>0 向右、上偏移(x,y 单位:像素)
    "labelContent": ["数据驱动移动","fcffb7ff","12"],
    "labelTop": false,
    "scrollSpeed": 5,
    "textBoxWidth": 200,
    "labelContentJustification": "Left",
    "labelContentAutoWrap": true,
    "scrollPolicy": "default"
  },
  "entityName": "myName1",
  "customId": "my-poi-id",
  "customData": {
    "data": "myCustomData"
  }
})
const res = await App.Scene.Add(poi);
const entityObj = [
  {
    objects: [poi],
    location: [121.40110354,31.15382552,3],
    time: 0 //实体移动到该位置所需时间
  },
  {
    objects: [poi],
    location: [121.3942475,31.14479155,98],
    time: 5
  },
  {
    objects: [poi],
    location: [121.40488661,31.17504119,29],
    time: 10
  },
  {
    objects: [poi],
    location: [121.38337962,31.17722974,65],
    time: 5
  },
  {
    objects: [poi],
    location: [121.38337962,31.17722974,65],
    time: 15
  },
]
await App.Tools.MoveLinear.Move(entityObj,{
  "calculateCoordZ": {  //坐标类型及坐标高度; [可选] 最高优先级
    "coordZRef": "surface",//Surface:表面;Ground:地面;Altitude:海拔
    "coordZOffset": 50 //海拔 高度(单位:米)
  }
});
```
- 参数描述

| 参数 | 类型 | 必填 | 备注 |
|------|------|------|------|
| objects | array | 是 | 移动的对象 |
| location | array | 是 | 路径坐标 |
| time | number | 是 | 实体移动到该位置所需时间 |


