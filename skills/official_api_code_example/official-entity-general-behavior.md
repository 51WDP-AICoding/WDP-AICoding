# Official excerpt sync: 实体/单体通用行为

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 实体/单体通用行为, categoryId: 571)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 实体一般行为 (id: 1358)

- 通过[类型]获取实体

```javascript
const types = ['Particle', 'Path'];
const { result } = await App.Scene.GetByTypes(types);
console.log(result);

// types
/*
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  ProjectModel     工程摆放模型
  ProjectInstance  工程Instance

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
  Raster           栅格图
  HighlightArea    高亮区域
*/
```

- 通过EntityName获取实体

```javascript
// BasicInfoAtom: { "entityName": "商业办公楼", "customId": "myId", "customData": "{'data':'myCustomData'}" }
const EntityName = ["myName1","myName2"];
const res = await App.Scene.GetByEntityName(["EntityName"]);
console.log(res);
```

- 通过CustomId获取实体

```javascript
// BasicInfoAtom: { "entityName": "商业办公楼", "customId": "myId", "customData": "{'data':'myCustomData'}" }
const customId = ["myId1","myId2"];
const res = await App.Scene.GetByCustomId(["customId"]);
console.log(res);
```

- 通过Eids获取实体

```javascript
const Eids = [
  '-9151314316185345952',
  '-9151314316965221260',
  '-9151314316350575262'
];

const res = await App.Scene.GetByEids(Eids);
console.log(res);
```

- 获取全部实体对象

```javascript
const { result } = await App.Scene.GetAll();
console.log(result)

// 示例: 获取AES静态模型信息
const modelObj = result?.Static?.[0];
const model = await modelObj.Get();
console.log(model);

// 示例: 隐藏AES静态模型
// 方式一：
// modelObj.bVisible = false;
// 方式二：
await modelObj.SetVisible(false); // true: 显示; false: 隐藏


// 示例: 更新路径Path
for (i = 0; i < result?.Path.length; i++) {
  const pathObj = result.Path[i];
  pathObj.Update({
    "pathStyle": {
      "type": "solid",
      "width": 20,
      "color": "ffadfbff",
      "passColor": "29ff52ff"
    }
  }, {
    calculateCoordZ: {  //坐标类型及坐标高度; [可选] 最高优先级
      coordZRef: "surface",  //surface:表面; ground:地面; altitude:海拔
      coordZOffset: 50
    }
  })
  

/* 回调实体类型
  Tiles            底板图层
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  CameraStart      镜头初始状态

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
  Raster           栅格图
  HighlightArea    高亮区域
*/
```

- 实体落地

```javascript
// 示例Particle(特效) 落地
// particleObj 为 new App.Particle({...}) 时创建的对象;

const res = await particleObj.SnapTo({
  calculateCoordZ: {
    coordZRef: "ground", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
console.log(res);
```

- 设置实体显隐

```javascript
// 示例Particle(特效) 显隐
// particleObj 为 new App.Particle({...}) 时创建的对象;

// SetVisible (true or false)
// 方式一：
// particleObj.bVisible = false;
// 方式二：
const res = await particleObj.SetVisible(false);
console.log(res);
```

- 通过[对象]显隐实体

```javascript
const objs = [ // 实体对象
  particleObj, pathObj
];
const res = await App.Scene.SetVisibleByObjects(objs,false);
console.log(res);
//true: 显示; false: 隐藏
```

- 通过[类型]删除实体

```javascript
注：目前不支持ProjectModel和ProjectInstance

const types = ["Particle", "Range"];
const res = await App.Scene.ClearByTypes(types);
console.log(res);

/* types (注意大小写)
   Static:          静态模型
   Skeletal:        骨骼模型
   Hierarchy        结构模型
   ISEHierarchy     ISE结构模型

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
   Raster           栅格图
   HighlightArea    高亮区域
*/
```

- 通过[对象]删除实体

```javascript
注：目前不支持ProjectModel和ProjectInstance
const objs = [ // 实体对象
  particleObj, pathObj
];
const res = await App.Scene.ClearByObjects(objs);
```

- 通过[Eids]删除实体

```javascript
注：目前不支持ProjectModel和ProjectInstance
const Eids = [
    '-9151314316185345952',
    '-9151314316965221260',
    '-9151314316350575262'
];
const res = await App.Scene.ClearByEids(Eids);
console.log(res);
```

## Topic: Eid通用行为 (id: 1359)

- 通过Eid获取实体

```javascript
// 鼠标点击场景内实体, 会收到返回的实体Eid
 
const res= await App.Scene.GetByEids(["-91513143085896763520","-91513143077246328320"]);
console.log(res);

const obj = res.result[0]; // 其中某个对象
console.log(await obj.Get()); // 获取此实体信息
```

```javascript
{
    success: true,
    message: '',
    result: [obj, ...]
}
```

- 通过[Eids]删除实体

```javascript
注：目前不支持ProjectModel和ProjectInstance
const Eids = [
  '-9151314316185345952',
  '-9151314316965221260',
  '-9151314316350575262'
];
const res = await App.Scene.ClearByEids(Eids);
console.log(res);
```

## Topic: EntityName通用行为 (id: 1360)

- 通过EntityName获取实体

```javascript
// 方式一：
const { result } = await App.Scene.GetByTypes(['Static','Path']);
const name = await result['Path']?.[0]?.Get();
console.error(name.result.entityName); //商业办公楼

// 方式二：
const {result} = await Object.Get();
console.error(result.entityName); //商业办公楼

const res= await App.Scene.GetByEntityName(["商业办公楼"]);
console.log(res);

const obj = res.result[0];
console.log(await obj.Get());


/*
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效
  ModelerWater     水面水体
  ModelerRiver     河道水岸
  ModelerEmbank    挡水岸堤
  Vegetation       区域植被

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
  Raster           栅格图
  HighlightArea    高亮区域
*/
```

- 通过EntityName更新实体

```javascript
// 此示例通过EntityName更新路径(path)样式
const jsondata = {
  "pathStyle": {
  "type": "solid",
  "width": 120,
  "color": "aa6afeff",
  "passColor": "ffe077ff"
  }
}

const EntityName = ["myName1", "myName2"];
const res = await App.Scene.UpdateByEntityName(EntityName, jsondata);
console.log(res);
```

- 通过EntityNames更新实体

```javascript
// 此示例通过entityNames更新路径(path)样式
const jsondata = [
  {
    "pathStyle": {
      "type": "solid",
      "width": 120,
      "color": "c4ff5bff",
      "passColor": "ff1bc8ff"
    },
    "entityName": "myName1" //分类标识
 },
 {
    "pathStyle": {
      "type": "arrow",
      "width": 200,
      "color": "e2faffff",
      "passColor": "faff7dff"
    },
    "entityName": "myName2"
  }
]

const res = await App.Scene.UpdateByEntityNames(jsondata);
console.log(res);
```

- 通过EntityName聚焦实体

```javascript
const jsondata = {
  "rotation": {
      "pitch": -30, //俯仰角, 参考(-90~0)
      "yaw": 0 //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
  },
  "distanceFactor": 0.5, //参数范围[0.1~1]; 实体占满屏幕百分比
  "flyTime": 1, //过渡时长(单位:秒)
}

const EntityName = ["myName1", "myName2"];
const res = await App.CameraControl.FocusByEntityName(EntityName, jsondata);
console.log(res);
```

- 通过EntityName删除实体

```javascript
const EntityName = ["myName1", "myName2"];
const res = await App.Scene.ClearByEntityName(EntityName);
console.log(res);
```

## Topic: CustomId通用行为 (id: 1361)

- 通过CustomId获取实体

```javascript
// 方式一：
const { result } = await App.Scene.GetByTypes(['Static','Path']);
const name = await result['Path']?.[0]?.Get();
console.error(name.result.customId); //商业办公楼

// 方式二：
const {result} = await Object.Get();
console.error(result.customId); //商业办公楼

const res= await App.Scene.GetByCustomId(["myId"]);
console.log(myId);

const obj = res.result[0];
console.log(await obj.Get());


/*
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效
  ModelerWater     水面水体
  ModelerRiver     河道水岸
  ModelerEmbank    挡水岸堤
  Vegetation       区域植被

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
  Raster           栅格图
  HighlightArea    高亮区域
*/
```

- 通过CustomId更新实体

```javascript
// 此示例通过customId更新路径(path)样式
const jsondata = {
  "pathStyle": {
    "type": "solid",
    "width": 120,
    "color": "aa6afeff",
    "passColor": "ffe077ff"
  }
}

const customId = ["myId1", "myId2"];
const res = await App.Scene.UpdateByCustomId(customId, jsondata);
console.log(res);
```

- 通过CustomIds更新实体

```javascript
// 此示例通过customIds更新路径(path)样式
const jsondata = [
  {
    "pathStyle": {
      "type": "solid",
      "width": 120,
      "color": "c4ff5bff",
      "passColor": "ff1bc8ff"
    },
    "customId": "myId1" //分类标识
 },
 {
    "pathStyle": {
      "type": "arrow",
      "width": 200,
      "color": "e2faffff",
      "passColor": "faff7dff"
    },
    "customId": "myId2"
  }
]

const res = await App.Scene.UpdateByCustomIds(jsondata);
console.log(res);
```

- 通过CustomId聚焦实体

```javascript
const jsondata = {
  "rotation": {
      "pitch": -30, //俯仰角, 参考(-90~0)
      "yaw": 0 //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
  },
  "distanceFactor": 0.4, //参数范围[0.1~1]; 实体占满屏幕百分比
  "flyTime": 1, //过渡时长(单位:秒)
}

const customId = ["myId1", "myId2"];
const res = await App.CameraControl.FocusByCustomId(customId, jsondata);
console.log(res);
```

- 通过CustomId删除实例

```javascript
const customId = ["myId1", "myId2"];
const res = await App.Scene.ClearByCustomId(customId);
console.log(res);
```

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


## Topic: 实体点击事件 (id: 1371)

- 实体点击事件

```javascript
await App.Renderer.RegisterSceneEvent([        // 点击事件一定要注册
  {
    name: 'OnEntityClicked',
    func: async (res) => {
      // 覆盖物被点击事件回调; 包含数据信息与实体对象
      console.log(res);
    }
  }
]);

let flag = true, __winObj = null;

//示例: 添加path实体
const entityObj = new App.Path({
    "polyline": {
        "coordinates": [
            [121.49921961, 31.23764884, 77],
            [121.46326121, 31.22644542, 31],
            [121.49408610, 31.24848319, 73]
        ]
    },
    "pathStyle": {
        "type": "arrow",
        "width": 100,
        "color": "ff2620ff",
        "passColor": "c117feff"
    }
});
await App.Scene.Add(entityObj).then(async res => {
    if (res.success) {
        // 聚焦
        const jsondata = {
            "rotation": {
                "pitch": -40,
                "yaw": 0,
            },
            "distanceFactor": 0.8,
            "flyTime": 1,
            "entity": [entityObj]
        }
        await App.CameraControl.Focus(jsondata);

        res.result.object.onClick(async ev => {
            // 点击path实体, 更新样式
            const upjsondata = {
                "pathStyle": {
                    "type": "solid",
                    "width": 120,
                    "color": "ffd8e5ff",
                    "passColor": "36fe7eff"
                }
            }
            ev.result.object.Update(upjsondata);


            // 点击path实体, toggle方式添加window
            if (flag) {
                flag = false;
                const entityObj = new App.Window({
                    "location": ev.result.position,
                    "windowStyle": {
                        "url": "http://wdpapi.51aes.com/doc-static/images/static/echarts.html",
                        "size": [500, 350],
                        "offset": [0, 0]
                    }
                })
                const res = await App.Scene.Add(entityObj);
                __winObj = res.result.object;
            } else {
                __winObj.Delete();
                flag = true;
            }
        })
    }
})
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

## Topic: 实体滑过事件 (id: 1372)

- 实体滑过事件

```javascript
// 鼠标滑过事件
App.Renderer.UnRegisterSceneEvents([
  "OnMouseEnterEntity", "OnMouseOutEntity"
])
App.Renderer.RegisterSceneEvents([
  { name: 'OnMouseEnterEntity', func: function (res) {} },
  { name: 'OnMouseOutEntity', func: function (res) {} }
])

// 示例: 添加path实体
const entityObj = new App.Path({
  "polyline": {
    "coordinates": [
      [121.47635644, 31.11820445, 25],
      [121.47139989, 31.11113569, 40],
      [121.50090474, 31.12182567, 80]
    ]
  },
  "pathStyle": {
    "type": "solid",
    "width": 50,
    "color": "0099ffff",
    "passColor": "e950ffff"
  }
});

await App.Scene.Add(entityObj).then(async res => {
  if (res.success) {

    // 鼠标滑入
    res.result.object.onMouseEnter(async ev => {
      console.error("onMouseEnter", ev);
    })

    // 鼠标滑出
    res.result.object.onMouseOut(async ev => {
      console.error("onMouseOut", ev);
    })

  }
})
```
