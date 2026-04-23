# Official excerpt sync: 实体交互与编辑

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 实体交互与编辑, categoryId: 571)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 实体操作行为 (id: 1362)

- 获取屏幕内实体

```javascript
const res = await App.Tools.Picker.GetEntitiesInViewport(['Particle'], false);
console.log(res);
//参数一: 筛选实体类型
//参数二: 反向筛选(true/false)

//示例
const entityObj = res.result.objects[0];
console.log(await entityObj.Get());


/* 实体类型(注意大小写)
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效
  
  RealTimeVideo    实时视频
  Window           窗口
  Poi              POI
  Particle         特效
  Effects          粒子特效
  Text3D           3D文字
  Light            灯光
  Viewshed         可视域
  Path             路径
  Parabola         迁徙图
  Range            区域轮廓
  HeatMap          热力图
  ColumnarHeatMap  柱状热力图
  SpaceHeatMap     点云热力图
  RoadHeatMap      路径热力图
  MeshHeatMap      3D网格热力图
*/
```

- 获取屏幕指定区域内实体

```javascript
const res = await App.Tools.Picker.PickEntityByRectangle({
  p0: [0,0], //屏幕左上角像素坐标
  p1: [window.innerWidth,window.innerHeight], //屏幕右下角像素坐标
  bMustBeFullyEnclosed: false,
  entityTypeFilter: ["Path"], //实体类型
  bFilterForExclude: false, //反向筛选(true/false)
  selectMode: 'New' //['New'(单选), 'Add'(加选), 'Subtract'(减选), 'Reverse'(反选)]
})

console.log(res);
const entityObj = res.result[0];
console.log(await entityObj.Get());


/* 实体类型(注意大小写)
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效

  RealTimeVideo    实时视频
  Window           窗口
  Poi              POI
  Particle         特效
  Effects          粒子特效
  Text3D           3D文字
  Light            灯光
  Viewshed         可视域
  Path             路径
  Parabola         迁徙图
  Range            区域轮廓
  HeatMap          热力图
  ColumnarHeatMap  柱状热力图
  SpaceHeatMap     点云热力图
  RoadHeatMap      路径热力图
  MeshHeatMap      3D网格热力图
*/
```

- 鼠标框选获取实体

```javascript
await App.Tools.Picker.StartRectPick({
  "bMustBeFullyEnclosed": true,
  "entityTypeFilter": [], //筛选实体类型
  "bFilterForExclude": false, //反向筛选entityTypeFilter (true/false)
  "selectMode": "New", //['None', 'New'(单选), 'Add'(加选), 'Subtract'(减选), 'Reverse'(反选)]
  "highlightColor": "2afe17",
  "rectangleStyle": {
    "borderColor": "d9ff88", //选框颜色
    "borderThickness": 1 //选框线宽
  }
})




/* entityTypeFilter (注意大小写)
  Tiles:           底板图层
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效

  RealTimeVideo    实时视频
  Window           窗口
  Poi              POI
  Particle         特效
  Effects          粒子特效
  Text3D           3D文字
  Light            灯光
  Viewshed         可视域
  Path             路径
  Parabola         迁徙图
  Range            区域轮廓
  HeatMap          热力图
  ColumnarHeatMap  柱状热力图
  SpaceHeatMap     点云热力图
  RoadHeatMap      路径热力图
  MeshHeatMap      3D网格热力图
*/
```

- 结束框选

```javascript
await App.Tools.Picker.EndRectPick();
```

- 鼠标点选获取[描边]实体/单体

```javascript
const jsondata = {
  pickFilter: {
    //tip::: [可选]
    filterEntityTypes: [], //筛选实体类型
    excludeEntities: [], //排除实体对象
    bFilterForExclude: false, //反向筛选(true/false)
  },
  selectionMode: "New", //['None', 'New'(单选), 'Add'(加选), 'Subtract'(减选), 'Reverse'(反选)]
};

await App.Setting.SetDefaultActionSetting(jsondata);
```

- Gizmo行为

```javascript
/* 覆盖物实体 Gizmo：
    1、先向场景中添加实体 (如:Particle(特效))
    2、开启Gizmo模式, 开启实体选取
    3、选中添加的particle, 实体自动Gizmo模式
    注: Poi, Particle(特效), Text3D(3D文字), Viewshed(可视域) 有效
  */

  /* AES模型 Gizmo：
    1、开启Gizmo模式, 开启实体选取
    2、选中AES模型, 模型自动Gizmo模式
  */
  
  // 开启Gizmo模式
await App.Setting.SetGizmoSetting({
    gizmoState: "Enable", //开关Gizmo (Enable/Disable)
    gizmoCoordinateSystem: "World", //世界坐标系
    bPreserveScaleRatio: true //保持实体缩放比例
})

// 开启实体选取
await App.Setting.SetDefaultActionSetting( {
  "selectionMode": "New"
});
```

## Topic: 设置实体/单体轮廓&高亮 (id: 1363)

- 自定义实体/单体[轮廓 高亮]样式

```javascript
// 自定义轮廓、高亮样式(styleName, hexa颜色; alpha: 高亮有效)
App.Setting.SetVisualColorStyle('customStyleName', "0f5dff4c")     // 'customStyleName'为自定义颜色名称，定义好后，可在设置高亮时传入

const style = await App.Setting.GetVisualColorStyle();
console.log(style);


// 设置轮廓线宽
App.Setting.SetOutlineThickness(2);  //自定义线宽

const thickness= await App.Setting.GetOutlineThickness();
console.log(thickness);
```

- 设置实体轮廓

```javascript
// 添加的覆盖物/模型对象
// entityObj1和entityObj2是场景中对象
entityObj1.SetEntityOutline({
    bOutline : true,
    styleName: "Blue"
  })

App.Scene.SetEntityOutline({
    entities: [entityObj1,entityObj2],
    bOutline : true,
    styleName: "Blue"
  });
```

- 设置实体高亮

```javascript
// 添加的覆盖物/模型对象
// entityObj1和entityObj2是场景中对象
entityObj1.SetEntityHighlight({
    bHighlight: true,
    styleName: "Blue"
  })

App.Scene.SetEntityHighlight({
    entities: [entityObj1,entityObj2],
    bHighlight: true,
    styleName: "Blue"
  })
```

- styleName 颜色列表
| 序号 | styleName | hexa |
|:---:|:---|:---|
| 0 | Default | FFBF0077 |
| 1 | Black | 00000077 |
| 2 | DarkBlue | 00008B77 |
| 3 | MediumBlue | 0000CD77 |
| 4 | Blue | 0000FF77 |
| 5 | DarkGreen | 00640077 |
| 6 | Green | 00800077 |
| 7 | SpringGreen | 00FF7F77 |
| 8 | MidnightBlue | 19197077 |
| 9 | ForestGreen | 2E8B5777 |
| 10 | SeaGreen | 2E8B5777 |
| 11 | LimeGreen | 32CD3277 |
| 12 | RoyalBlue | 4169E177 |
| 13 | SteelBlue | 4682B477 |
| 14 | Maroon | 80000077 |
| 15 | Purple | 80008077 |
| 16 | Olive | 80800077 |
| 17 | Gray | 80808077 |
| 18 | SkyBlue | 87CEEB77 |
| 19 | BlueViolet | 8A2BE277 |
| 20 | DarkRed | 8B000077 |
| 21 | LightGreen | 90EE9077 |
| 22 | MediumPurple | 9370DB77 |
| 23 | DarkViolet | 9400D377 |
| 24 | PaleGreen | 98FB9877 |
| 25 | YellowGreen | 9ACD3277 |
| 26 | Sienna | A0522D77 |
| 27 | Brown | A52A2A77 |
| 28 | DarkGray | A9A9A977 |
| 29 | LightBlue | ADD8E677 |
| 30 | GreenYellow | ADFF2F77 |
| 31 | PowderBlue | B0E0E677 |
| 32 | Silver | C0C0C077 |
| 33 | IndianRed | CD5C5C77 |
| 34 | Chocolate | D2691E77 |
| 35 | LightGray | D3D3D377 |
| 36 | Thistle | D8BFD877 |
| 37 | Orchid | DA70D677 |
| 38 | GoldenRod | DAA52077 |
| 39 | Plum | DDA0DD77 |
| 40 | LightCyan | E0FFFF77 |
| 41 | DarkSalmon | E9967A77 |
| 42 | Violet | EE82EE77 |
| 43 | LightCoral | F0808077 |
| 44 | Wheat | F5DEB377 |
| 45 | Salmon | FA807277 |
| 46 | Linen | FAF0E677 |
| 47 | DeepPink | FF149377 |
| 48 | OrangeRed | FF450077 |
| 49 | Tomato | FF634777 |
| 50 | HotPink | FF69B477 |
| 51 | Coral | FF7F5077 |
| 52 | DarkOrange | FF8C0077 |
| 53 | LightSalmon | FFA07A77 |
| 54 | Orange | FFA50077 |
| 55 | LightPink | FFB6C177 |
| 56 | Pink | FFC0CB77 |
| 57 | Gold | FFD70077 |
| 58 | FloralWhite | FFFAF077 |
| 59 | Snow | FFFAFA77 |
| 60 | Yellow | FFFF0077 |
| 61 | LightYellow | FFFFE077 |
| 62 | Ivory | FFFFF077 |
| 63 | White | FFFFFF77 |
## Topic: 选中实体操作行为 (id: 1364)

- 添加选中实体

```javascript
// 方法一
await App.Scene.Selection.Add([obj, obj, ...]);
//方法二
await App.Scene.AddSelection([obj, obj, ...]);
```

- 获取所有选中实体

```javascript
const res = await App.Scene.GetSelection();
console.log(res);
```

- 取消选中实体

```javascript
const res = await App.Scene.GetSelection();
const someObj = res.result;
App.Scene.RemoveSelection(someObj);
```

- 取消所有选中实体

```javascript
App.Scene.ClearSelection();
```

## Topic: 选中单体操作行为 (id: 1365)

- 添加选中单体

```javascript
const res = await App.Scene.GetTiles();
if (res.success && res.result?.Tiles?.length > 0) {
  const tilesObj = res.result.Tiles[0];

  // xxx 为底板上模型的nodeId
  const res = await App.Scene.NodeSelection.Add(tilesObj , ['xxx', 'xxx']);
  console.log(res);
}
```

- 取消选中单体

```javascript
const res = await App.Scene.GetTiles();
if (res.success && res.result?.Tiles?.length > 0) {
  const tilesObj = res.result.Tiles[0];

  // xxx 为底板上模型的nodeId
  const res = await App.Scene.NodeSelection.Remove(tilesObj, ['xxx', 'xxx']);
  console.log(res);
}
```

- 取消所有选中单体

```javascript
const res = await App.Scene.NodeSelection.Clear();
console.log(res);
```

- 选中单体轮廓描边

```javascript
const res = await App.Scene.NodeSelection.Draw();
console.log(res);
```

## Topic: 实体[裁剪]行为 (id: 1366)

- [裁剪]热力图

```javascript
const geo = {
  "coordinates": [
    [
      [121.497223,31.251557,0],
      [121.476501,31.237163,0],
      [121.514851,31.245237,0]
    ]
  ]
}

//geo + 镂空颜色(可选); heatmapObj 为 new HeatMap({...}) 时创建的对象;
const res = await heatmapObj.Clip(geo, "bd20ffff");
console.log(res)

//await heatmapObj.UnClip();  //取消裁剪
```

- [裁剪]柱状热力图

```javascript
const geo = {
  "coordinates": [
    [
      [121.497223,31.251557,0],
      [121.476501,31.237163,0],
      [121.514851,31.245237,0]
    ]
  ]
}

//geo + 镂空颜色(可选); columnarheatmap 为 new ColumnarHeatMap({...}) 时创建的对象;
const res = await columnarheatmapObj.Clip(geo, "fef595ff");
console.log(res)
//await columnarheatmapObj.UnClip();  //取消裁剪
```

## Topic: 实体[编辑]行为 (id: 1367)

- [编辑]路径

```javascript
const jsondata = {
  "method": "add", //add; delete
  "index": [2, 0], //坐标点索引
  "coordinates": [
    [121.46164010, 31.22692061, 11],
    [121.46881138, 31.22606828, 68]
    ]
}

const res = await pathObj.Modify(jsondata);  // pathObj 为 new Path({...}) 时创建的对象;
console.log(res)


/*
  method: "add" ::::::
  index: [n], 在坐标点索引n+1之后添加坐标点;
  index: [n+1], 在最后一个坐标点索引之外添加坐标点;

  method: "delete" ::::::
  index: [2], 删除第2个坐标点;
  index: [2,10], 删除[2~10]之间的数据点;
*/
```

- [编辑]区域热力图

```javascript
const mapdata = [],
    points = [
        [121.49378441, 31.22786931, 21],
        [121.48928671, 31.22207976, 14],
        [121.48146687, 31.25121877, 81],
        [121.46073678, 31.22045260, 42]
    ];
for (let i = 0; i < points.length; i++) {
    mapdata.push({
        "point": points[i],
        "value": Math.floor(Math.random() * 100)
    })
}

const jsondata = {
    "method": "add", //add; delete
    "index": [2, 0], //坐标点索引
    "features": mapdata
}

const res = await heatmapObj.Modify(jsondata);  // heatmapObj为 new HeatMap({...}) 时创建的对象;
console.log(res)

/*
  method: "add" ::::::
  index: [n], 在坐标点索引n+1之后添加坐标点;
  index: [n+1], 在最后一个坐标点索引之外添加坐标点;

  method: "delete" ::::::
  index: [2], 删除第2个坐标点;
  index: [2,10], 删除[2~10]之间的坐标点;
*/
```

- [编辑]柱状热力图

```javascript
const mapdata = [],
    points = [
        [121.49378441, 31.22786931, 21],
        [121.48928671, 31.22207976, 14],
        [121.48146687, 31.25121877, 81],
        [121.46073678, 31.22045260, 42]
    ];
for (let i = 0; i < points.length; i++) {
    mapdata.push({
        "point": points[i],
        "value": Math.floor(Math.random() * 100)
    })
}

const jsondata = {
    "method": "add", //add; delete
    "index": [2, 0], //坐标点索引
    "features": mapdata
}

const res = await colheatmapObj.Modify(jsondata);  // colheatmapObj为 new ColumnarHeatMap({...}) 时创建的对象;
console.log(res)

/*
  method: "add" ::::::
  index: [n], 在坐标点索引n+1之后添加坐标点;
  index: [n+1], 在最后一个坐标点索引之外添加坐标点;

  method: "delete" ::::::
  index: [2], 删除第2个坐标点;
  index: [2,10], 删除[2~10]之间的坐标点;
*/
```

- [编辑]点云热力图

```javascript
const mapdata = [],
    points = [
        [121.49378441, 31.22786931, 21],
        [121.48928671, 31.22207976, 14],
        [121.48146687, 31.25121877, 81],
        [121.46073678, 31.22045260, 42]
    ];
for (let i = 0; i < points.length; i++) {
    mapdata.push({
        "point": points[i],
        "value": Math.floor(Math.random() * 100)
    })
}

const jsondata = {
    "method": "add", //add; delete
    "index": [2, 0], //坐标点索引
    "features": mapdata
}

const res = await spaceheatmapObj.Modify(jsondata);  // spaceheatmapObj为 new SpaceHeatMap({...}) 时创建的对象;
console.log(res)

/*
  method: "add" ::::::
  index: [n], 在坐标点索引n+1之后添加坐标点;
  index: [n+1], 在最后一个坐标点索引之外添加坐标点;

  method: "delete" ::::::
  index: [2], 删除第2个坐标点;
  index: [2,10], 删除[2~10]之间的坐标点;
*/
```

- [编辑]路径热力图

```javascript
const mapdata = [],
      points = [
        [121.49179549,31.24038985,18],
        [121.51553357,31.23050451,93],
        [121.48560978,31.24052903,12],
        [121.51587775,31.25126291,78]
        ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}

const jsondata = {
  "method": "add", //add; delete
  "index": [2], //坐标点索引
  "features": mapdata
}

const res = await roadheatmapObj.Modify(jsondata);  // roadheatmapObj为 new RoadHeatMap({...}) 时创建的对象;
console.log(res)



/*
  method: "add" ::::::
  index: [n], 在坐标点索引n+1之后添加坐标点;
  index: [n+1], 在最后一个坐标点索引之外添加坐标点;

  method: "delete" ::::::
  index: [2], 删除第2个坐标点;
  index: [2,10], 删除[2~10]之间的坐标点;
*/
```

## Topic: 场景管理高级操作 (id: 1357-ext)

- 获取实体包围盒

```javascript
// 获取一个或多个实体的包围盒（传入实体对象数组）
const allRes = await App.Scene.GetAll();
const entities = allRes.result.objects;

const res = await App.Scene.GetBoundingBox(entities);
console.log(res);
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

- 通过 Eids 获取实体类型

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

- 获取场景全局对象

```javascript
const res = await App.Scene.GetGlobal();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      geoReference: GeoReferenceObject,
      cameraStart: CameraStartObject,
      wdpGlobalSettings: { ... }
    }
  }
*/
```

- 获取底板对象

```javascript
// 获取场景中的 Tiles 底板对象
const res = await App.Scene.GetTiles();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      Tiles: [TilesObject, ...]
    }
  }
*/

// 获取工程底板对象
const res2 = await App.Scene.GetProject();
console.log(res2);
```

- 批量阵列复制实体

```javascript
// 将一组实体按指定方向/旋转/缩放复制 n 份
const res = await App.Scene.ArrayDuplicate({
  entities: [poiObj, pathObj],   // 要复制的实体对象数组
  num: 5,                        // 复制数量
  translation: [100, 0, 0],      // 每份的位移偏移量 [x, y, z]（单位：米）
  rotator: { pitch: 0, yaw: 10, roll: 0 },  // 每份的旋转增量（可选）
  scale: [1, 1, 1],              // 每份的缩放（可选）
  coordType: 'GIS',              // 坐标类型：GIS / Cartesian（可选）
  bInstance: false,              // 是否以 Instance 方式复制（可选）
  instanceName: 'myInstance'     // Instance 名称（bInstance=true 时有效）
});
console.log(res);
// 出参: { success: boolean, message: string, result: { objects: EntityObject[] } }
```

- 设置场景风格

```javascript
// 设置场景渲染风格
const res = await App.Scene.SetSceneStyle('comic');
// 可选风格：'comic'（漫画风）/ 'default'（默认）/ 'night'（夜间）等
console.log(res);
// 出参: { success: boolean, message: string }
```

- 场景回到初始化状态

```javascript
const res = await App.Scene.ResetSceneState();
console.log(res);
// 出参: { success: boolean, message: string }
```

- 实体沿路径移动（Scene.Move）

```javascript
// 让实体沿指定路径移动（与 Bound 覆盖物方式不同，此为直接调用）
const res = await App.Scene.Move({
  path: pathObj,       // 路径实体对象
  entity: particleObj, // 要移动的实体对象
  moving: {
    time: 30,          // 总时长（单位：秒）
    bLoop: true,       // 是否循环
    bReverse: false,   // 是否反向
    state: 'play'      // play / pause / stop
  }
});
console.log(res);
// 出参: { success: boolean, message: string }
```

- 执行/结束/获取场景动作

```javascript
// 执行场景预设动作（如场景中预设的动画序列）
const res = await App.Scene.RunAction('actionName');
console.log(res);

// 结束场景动作
const res2 = await App.Scene.EndAction('actionName');
console.log(res2);

// 获取场景动作列表
const res3 = await App.Scene.GetAction();
console.log(res3);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      actions: ['actionName1', 'actionName2', ...]
    }
  }
*/
```

- 通过 GeoJson 批量创建实体

```javascript
// 从 GeoJSON 数据批量创建实体
const geoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [121.4853, 31.2384, 10] },
      properties: { entityName: 'poi1', customId: 'id1' }
    }
  ]
};

const res = await App.Scene.CreateByGeoJson({
  type: 'Poi',          // 实体类型
  geoJson: geoJson,
  poiStyle: {           // 对应实体类型的样式
    markerNormalUrl: 'http://example.com/marker.png',
    markerSize: [50, 114]
  }
});
console.log(res);
```

---

