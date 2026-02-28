# 官方脚本摘录（新版后台）：通用基础属性

版本基线：WDP API 2.2.1
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

## 条目：App.Scene（id: 1350）

- Add (往场景里添加entity)

```javascript
await App.Scene.Add(obj, {
  "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
    "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
    "coordZOffset": 50   // 高度(单位:米)
  }
});
```

- 参数描述 
  参数 
  类型 
  必填 
  取值范围 
  备注 
  object 
  Array | Object 
   
  对象数组或对象 
  calculateCoordZ 
  coordZRef 
  string 
  可选 
  surface, ground, altitude 
  surface:表面; ground:地面; altitude:海拔 
  coordZOffset 
  number 
  可选 
   
  高度(单位:米) 
  calculateCoordZ 最高优先级; 缺省时采用obj里的坐标coordz 
  返回：

```javascript
{
    "success": true, // true, false
    "message": '',
    "result": {
        "object": {}, // "objects": [],
        "sceneChangeInfo": {}
    }
}
```

- Update (多个相同类型对象统一更新)

- 注：只应用于覆盖物类型

```javascript
await App.Scene.Update([obj, obj, ...],
    { poiStyle: { ... } }, {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- 返回：

```javascript
{
    success: true,
    message: '',
    result: {
        sceneChangeInfo: {
            updated: [obj1, obj2]
        }
    }
}
```

- Updates (多个类型对象更新)

- 注：只应用于覆盖物类型

```javascript
await App.Scene.Updates([
    { object: entityObj1, jsonData: entityObj1Json},
    { object: entityObj2, jsonData: entityObj2Json},
], {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- 返回：

```javascript
{
    success: true,
    message: '',
    result: {
        sceneChangeInfo: {
            updated: [obj1, obj2]
        }
    }
}
```

- Create (批量添加相同分类的entity)

```javascript
await App.Scene.Create({
    ... // 默认属性值
}, [{
   ... // 批量属性值
}], {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
      }
   }
);
```

- 返回：

```javascript
{
    "success": true, // true, false
    "message": '',
    "result": {
        "objects": [obj, ...]
        "sceneChangeInfo": {}
    }
}
```

- Creates (批量添加不同分类的entity)

```javascript
await App.Scene.Creates([{
	... // 批量属性值
}], {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
      }
   }
);
```

- 返回：

```javascript
{
    "success": true, // true, false
    "message": '',
    "result": {
        "objects": [obj, ...]
        "sceneChangeInfo": {}
    }
}
```

- GetAll (获取场景中所有entity对象)

```javascript
await App.Scene.GetAll();
```

- GetByEids (通过eid获取对象)

```javascript
await App.Scene.GetByEids(['-9151314316185345952', '-9151314316965221260', ...]);
```

- GetByEntityName (通过entityName获取entity)

```javascript
await App.Scene.GetByEntityName(['name01', 'name02', ...]);
```

- GetByCustomId (通过customId获取entity)

```javascript
await App.Scene.GetByCustomId(['cuId01', 'cuId02', ...]);
```

- GetByTypes (通过类型获取entity)

```javascript
await App.Scene.GetByTypes(['Poi', 'Static', ...]); //更多类型查看: 实体类型表
```

- Delete (批量删除entity)

```javascript
await App.Scene.Delete([obj, obj, ...]);
```

- ClearByTypes (批量删除entity)

```javascript
await App.Scene.ClearByTypes(['xxx', 'xxx', ...]);
/*
  Static           静态模型
  Skeletal         骨骼模型
  Hierarchy        结构模型
  ISEHierarchy     ISE结构模型
  Effects          粒子特效
*/

/*
  RealTimeVideo    实时视频
  Window           窗口
  Poi              POI
  Particle         特效
  Effects          粒子特效
  Light            灯光
  Text3D           3D文字
  Viewshed         可视域
  Path             路径
  Parabola         迁徙图
  Range            区域轮廓
  HeatMap          热力图
  ColumnarHeatMap  柱状热力图
  SpaceHeatMap     点云热力图
  RoadHeatMap      路径热力图
  Raster           栅格图
  HighlightArea    高亮区域
*/
```

- ClearByObjects (批量删除entity)

```javascript
await App.Scene.ClearByObjects([obj, obj, ...]);
```

- ClearByEids(批量删除entity)

```javascript
await App.Scene.ClearByEids(['xxx', 'xxx', ...]);
```

- Covering.Clear (删除场景中所有覆盖物)

```javascript
await App.Scene.Covering.Clear();
```

- ClearByCustomId (通过customId批量删除)

```javascript
await App.Scene.ClearByCustomId(['xxx', 'xxx', ...]);
```

- ClearByEntityName (通过entityName批量删除)

```javascript
await App.Scene.ClearByEntityName(['xxx', 'xxx', ...]);
```

- UpdateByCustomId (通过customId批量更新同类entity)

```javascript
await App.Scene.UpdateByCustomId(['xxx', 'xxx', ...], { poiStyle: { ... } }, {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- UpdateByCustomIds (通过customId批量更新不同类entity)

```javascript
await App.Scene.UpdateByCustomId([
        { customId: 'cuId01', poiStyle: { ... } },
        { customId: 'cuId02', pathStyle: { ... } }
    ], {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- UpdateByEntityName (通过entityName批量更新同类entity)

```javascript
await App.Scene.UpdateByEntityName(['xxx', 'xxx', ...], { poiStyle: { ... } }, {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- UpdateByEntityNames (通过entityName批量更新不同类entity)

```javascript
await App.Scene.UpdateByEntityNames([
        { entityName: 'name01', poiStyle: { ... } },
        { entityName: 'name02', pathStyle: { ... } }
    ], {
    "calculateCoordZ": {   // 坐标类型及坐标高度; [可选] 最高优先级
        "coordZRef": "surface",   // surface: 表面;  ground: 地面;  altitude: 海拔
        "coordZOffset": 50   // 高度(单位:米)
    }
});
```

- SetVisibleByObjects (批量显隐entity)

```javascript
await App.Scene.SetVisibleByObjects([obj, obj, ...], false);
```

- SetVisible (批量显隐entity)

```javascript
await App.Scene.SetVisible([obj, obj, ...], false);
```

- SetLocation (多个对象移动到同一个位置)

```javascript
await App.Scene.SetLocation([obj, obj, ...], { x: 121.50796384, y: 31.23267352, z: 50 });
```

- SetLocations (多个对象移动到不同位置)

```javascript
await App.Scene.SetLocations([
    { object: obj1, location: { x: 121.50796384, y: 31.23267352, z: 50 } },
    { object: obj2, location: { x: 121.52796384, y: 31.25267352, z: 50 } },
]);
```

- SetRotator (多个对象旋转到同一角度)

```javascript
await App.Scene.SetRotator([obj, obj, ...], { pitch: 70, yaw: 20, roll: 80 });
```

- SetRotators (多个对象旋转到不同角度)

```javascript
await App.Scene.SetRotators([
    { object: obj1, rotator: { pitch: 70, yaw: 20, roll: 80 } }
    { object: obj2, rotator: { pitch: 50, yaw: 30, roll: 70 } }
]);
```

- SetScale3D (多个对象缩放相同倍数)

```javascript
await App.Scene.SetScale3D([obj, obj, ...], { x: 10, y: 50, z: 50 });
```

- SetScale3Ds (多个对象缩放不同倍数)

```javascript
await App.Scene.SetScale3Ds([
    { object: obj, scale3d: { x: 10, y: 50, z: 50 } }
]);
```

- SetLocked (多个对象同时锁定解锁)

```javascript
await App.Scene.SetLocked([obj, obj, ...], false);
```

- GetBound (获取对象的bounding box数据; 实体box范围)

```javascript
await App.Scene.GetBound([obj, obj, obj]);
```

- 返回：

```javascript
{
    "success": true,
    "message": "",
    "result": {
        "entitiesBound": {  //Cartesian 笛卡尔坐标
            "min": [
                575.0857058653336,
                583.5574901356209,
                11.27789306640625
            ],
            "max": [
                1730.7478152403335,
                -1138.2877247081292,
                601.21044921875
            ],
            "isValid": 1
        }
    }
}
```

## 条目：Geometry（id: 1351）

- Geometry GIS坐标: point 单点实体

```javascript
const object = new App.Poi({
  "location": [121.46434372, 31.23499129, 200],
  "poiStyle": { ... }
})
```

- 参数描述： 
  参数 
  类型 
  必填 
  备注 
  location 
  array 
   
  格式: [lng, lat, coordz]; coordz: 海拔高度 
  poiStyle 
  JSON 
   
  JSON 数据

- Geometry GIS坐标: polyline 多点实体

```javascript
const object = new App.Path({
    "polyline": {
        "coordinates": [
            [121.49968476, 31.24861346, 44],
            [121.49956979, 31.25093239, 96],
            [121.47613890, 31.23725069, 39]
        ]
    },
    "pathStyle": { ... }
});​
```

- 参数描述 
  参数 
  类型 
  必填 
  备注 
  polyline-coordinates 
  array 
   
  坐标位置,格式[[lng, lat, coordz],[[lng, lat, coordz],....] 
  pathStyle 
  JSON 
   
  JSON 数据

- Geometry GIS坐标: polygon2D 多点实体

```javascript
const object= new App.Range({
    "polygon2D": {
        "coordinates": [
            [  //外环坐标数据
                [121.44988564758069, 31.250519581243555],
                [121.44931229954645, 31.237062463089813],
                [121.47069915607464, 31.23800903013435],
                [121.46964214200186, 31.251854247249092]
            ],
            [  //内环坐标数据
                [121.45523929837454, 31.247795686070997],
                [121.45496451671893, 31.240059486959915],
                [121.46707798490596, 31.24170746459223]
            ]
        ]
    },
    "rangeStyle": { ... }
})
```

- 参数描述参数 
  类型 
  必填 
  备注 
  polyline-coordinates 
  array 
   
  坐标，格式中第一个数组为外环，后续为内环： 
  [ 
       [[lng,lat],[lng,lat],....], 
       [[lng,lat],[lng,lat],....], 
       .... 
  ] 
  rangeStyle 
  JSON 
   
  JSON 数据

- Geometry GIS坐标: points 多点实体

```javascript
const object = new App.HeatMap({
    "points": {
        "features": [
            { "point": [121.49656333, 31.22702479, 49], "value": 89 },
            { "point": [121.46434372, 31.23499129, 60], "value": 62 },
            { "point": [121.49099537, 31.23099794, 22], "value": 54 }
        ]
    },
    "heatMapStyle": { ... }
});
```

- 参数描述： 
  参数 
  类型 
  必填 
  备注 
  points.features 
  point 
  array 
   
  [lng,lat,coordz] 
   
  value 
  number 
   
  需要在“mappingValueRange”定义的区间内 
  heatMapStyle 
   
  JSON 
   
  JSON 数据

## 条目：基础与自定义属性（id: 1352）

- 基础与自定义属性

- 3D文字Text3D为示例, 适用所有实体覆盖物

```javascript
const obj = new App.Text3D({
    ... ...
    // 基础属性，所有实例全部具有
    "bLocked": true, //添加的实体是否锁定, 不可点击、框选等操作(true/false) [可选]
    "bVisible": true, //添加的实体是否可见(true/false) [可选]

    // 自定义属性，所有实例全部具有; 按业务需求 自行定义内容
    "entityName": "myName", //[可选]
    "customId": "myId", //[可选]
    "customData": { //[可选]
        "data": "myCustomData"
    }

})
```

- 参数描述： 
  参数 
  类型 
  必填 
  取值范围 
  备注 
  bLocked 
  boolean 
  可选 
  true, false 
  添加的实体是否锁定, 不可点击、框选等操作 
  bVisible 
  boolean 
  可选 
  true, false 
  添加的实体是否可见 
  entityName 
  string 
  可选 
   
  配置后可使用EntityName系列功能 
  customId 
  string 
  可选 
   
  配置后可使用CustomId系列功能 
  customData 
  object 
  可选 
   
  按业务需求配置 
  属性设置 
  以字母b开始的key; Get/Set属性省略字母b, 且首字母大写

```javascript
// 获取 getter:
// 方式一:
console.log("bLocked:: ", obj.bLocked);
console.log("bVisible:: ", obj.bVisible);
console.log("entityName:: ", obj.entityName);
console.log("customId:: ", obj.customId);

// 方式二:
console.log("GetLocked:: ", await obj.GetLocked());
console.log("GetVisible:: ", await obj.GetVisible());
console.log("GetEntityName:: ", await obj.GetEntityName());
console.log("GetCustomId:: ", await obj.GetCustomId());
```

```javascript
// 设置 setter:
// 方式一:
obj.bLocked = false;
obj.bVisible = false;
obj.entityName = 'newName';
obj.customId = 'newId';

// 方式二:
await obj.SetLocked(false);
await obj.SetVisible(false);
await obj.SetEntityName('newName');
await obj.SetCustomId('newId');
```

- 接收一：对象点击事件

```javascript
text3d.onClick(async ev => {
    const obj = ev.result.object;
    console.log(await obj.Get());
})
```

- 接收二：事件监听回调

```javascript
App.Renderer.RegisterSceneEvents([
  {
    name: 'OnEntityClicked', func: async function (res) {
      // 覆盖物被点击事件回调; 包含数据信息与实体对象
      if (res.result.object.entityName === "myName") {
        const jsondata = {
          "text3DStyle": {
            "text": "更新3D文字",
            "color": "a421ffff",
            "type": "plain",
            "outline": 0.2,
            "portrait": false,
            "space": 0.2
          }
        }
        const newObj = res.result.object;
        newObj.Update(jsondata, {
          "calculateCoordZ": {  //[可选] 最高优先级
            "coordZRef": "surface",//surface:表面;ground:地面;altitude:海拔
            "coordZOffset": 0 //高度(单位:米)
          }
        });

        const info = await newObj.Get();
        console.log(info)
      };
    }
  }
])
```

## 条目：实体扩展属性（id: 1353）

- 实体扩展属性

- 其它实例属性参照各实例属性字段

```javascript
// particleObj 为 new App.Particle({...}) 时创建的对象;

// 获取Particle属性
async function getParticleAttr () {
    // 方式一:
    console.log("location:: ", particleObj.location);
    console.log("type:: ", particleObj.particleType);
    console.log("rotator:: ", particleObj.rotator);
    console.log("scale3d:: ", particleObj.scale3d);

    // 方式二:
    console.log("location:: ", await particleObj.GetLocation());
    console.log("type:: ", await particleObj.GetParticleType());
    console.log("rotator:: ", await particleObj.GetRrotator());
    console.log("scale3d:: ", await particleObj.GetScale3d());
}
getParticleAttr();


// 设置Particle属性
async function setParticleAttr () {
    // 方式一:
    particleObj.location = [121.46141528,31.23360944,86];
    particleObj.particleType = "vehicle_car_white";
    particleObj.rotator = {
        "pitch": 0, "yaw": 40, "roll": 0
    };
    particleObj.scale3d = [200, 200, 200];

    // 方式二:
    await particleObj.SetLocation([121.46141528,31.23360944,86]);
    await particleObj.SetParticleType("vehicle_car_white");
    await particleObj.SetRotator({
        "pitch": 0, "yaw": 40, "roll": 0
    });
    await particleObj.SetScale3d([200, 200, 200]);
}
setParticleAttr();

```

- 实例中属性字段key是type时，设置属性时映射的新字段为sType

```javascript
// pathObj 为 new App.Path({...}) 时创建的对象;

// 获取Path属性
async function getPathAttr (attr) {
    // 方式一:
    console.log("coordinates:: ", pathObj.coordinates);
    console.log("sType:: ", pathObj.sType);
    console.log("width:: ", pathObj.width);
    console.log("color:: ", pathObj.color);
    console.log("passColor:: ", pathObj.passColor);

    // 方式二:
    console.log("coordinates:: ", await pathObj.GetCoordinates());
    console.log("sType:: ", await pathObj.GetsType());
    console.log("width:: ", await pathObj.GetWidth());
    console.log("color:: ", await pathObj.GetColor());
    console.log("passColor:: ", await pathObj.GetPassColor());
}
getPathAttr();


// 设置Path属性
async function setPathAttr (attr) {
    // 方式一:
    pathObj.coordinates = [
      [121.50056782,31.22792919,23],
      [121.49728647,31.22611933,90],
      [121.48236809,31.23146931,60]
    ];
    pathObj.sType = "solid";
    pathObj.width = 50;
    pathObj.color = "ff4b3dff";
    pathObj.passColor = "affff2ff";

    // 方式二:
    await pathObj.SetCoordinates([
      [121.50056782,31.22792919,23],
      [121.49728647,31.22611933,90],
      [121.48236809,31.23146931,60]
    ]);
    await pathObj.SetsType("solid");
    await pathObj.SetWidth(50);
    await pathObj.SetColor("ff4b3dff");
    await pathObj.SetPassColor("affff2ff");
}
setPathAttr();
```

## 条目：实体通用方法（id: 1354）

- 实体成员函数

- 示例: Text3D 成员函数

```javascript
const obj = new App.Text3D({ ... });
obj.Update(json);
obj.Get/SetLocation(json);
obj.Get/SetRotator(json);
obj.Get/SetScale3d(json);
obj.Get/SetLocked(boolean);
obj.Get/SetVisible(boolean);
obj.Get/SetEntityName(string);
obj.Get/SetCustomId(string);
obj.Get/SetCustomData(json);
obj.Get();
obj.oType;  //get
obj.bLocked = boolean;   //get/set
obj.location = [121.49328325, 31.23863899, 10];   //get/set
obj.rotator = {pitch: 0, yaw: 60, roll: 0}   //get/set
obj.scale3d = [5,5,5];   //get/set
obj.bVisible = boolean;   //get/set
obj.entityName = '';   //get/set
obj.customId = '';   //get/set
obj.customData = {};   //get/set
obj.Delete(); //不支持工程模型
obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
})
obj.onMouseEnter(ev => {
    console.log(ev);
})
obj.onMouseOut(ev => {
    console.log(ev);
})
```

- Update(data)

- 用途：更新Text3D实体 
  data同Add时的参数

- Get/SetLocation(jsondata)

- 用途：获取/设置Text3D实体位置 
  const jsondata = [121.48073857,31.22738813,67]

- Get/SetRotator(jsondata)

- 用途：获取/设置Text3D实体旋转 
  单体3D实体对象有效 (场景特效: Particle, 3D文字: Text3D, 可视域: Viewshed, 粒子特效: Effects, 灯光: Light, 模型)

```javascript
const jsondata = {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
}
```

- Get/SetScale3d(jsondata)

- 用途：获取/设置Text3D实体缩放 
  单体3D实体对象有效 (场景特效: Particle, 3D文字: Text3D, 可视域: Viewshed, 粒子特效: Effects, 灯光: Light, 模型)

```javascript
const jsondata = [200,200,200]; //缩放比例(x,y,z)坐标轴
```

- Get/SetLocked(boolean)

- 用途：获取/设置Text3D实体锁定/解锁 
  锁定后不可点击、框选等操作 
  true:锁定；false：解锁

- Get/SetVisible(boolean)

- 用途：获取/设置Text3D实体显隐 
  true:显示；false：隐藏

- Get/SetEntityName(string)

- 用途：获取/设置Text3D 自定义EntityName (按业务所需)

- Get/SetCustomId(string)

- 用途：获取/设置Text3D 自定义CustomId (按业务所需)

- Get/SetCustomData(json)

- 用途：获取/设置Text3D 自定义CustomData (按业务所需)

- Get()

- 用途：获取Text3D信息

- oType

- 用途：获取Text3D实体的类型

- bRemoved

- 用途：获取Text3D实体是否已删除

- Delete()

- 用途：删除Text3D实体

- onClick()

- onMouseEnter()

- onMouseOut()

## 条目：rotation 相关（id: 1355）

- 相机相关Focus

```javascript
const jsondata = {
    "rotation": {
        "pitch": -30, //俯仰角, 参考(-90~0)
        "yaw": 0, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
    }
}
```

- 参数描述： 
  参数 
  取值范围 
  描述 
  rotation 
  pitch 
  [-90~0] 
   
  yaw 
  [-180~180] 
  0:东; 90:南; -90:北

## 条目：rotator 相关（id: 1356）

- 实体相关

```javascript
const jsondata = {
    "rotator": {
      "pitch": 0, //俯仰角, 参考(-180~180)
      "yaw": 30, //偏航角, 参考(-180~180)
      "roll": 0 //翻滚角, 参考(-180~180)
    }
}
```

- 参数描述： 
  正东为x轴 
  参数 
  取值范围 
  描述 
  rotator 
  pitch 
  [-180~180] 
  俯仰角 
   
  yaw 
  [-180~180] 
  偏航角 
   
  roll 
  [-180~180] 
  翻滚角

## 条目：实体类型表（id: 1357）

- 实体类型对应表

- 适用于通用行为里对需求类型的API操作；如下：

```javascript
awiat App.Scene.GetByTypes(types);
awiat App.Scene.ClearByTypes(types);
```

- 参数说明： 
  类型 
  备注 
  GetByTypes是否支持 
  ClearByObjects是否支持 
  Tiles 
  底板图层 
  是 
  是 
  Static 
  静态模型 
  是 
  是 
  Skeletal 
  骨骼模型 
  是 
  是 
  Hierarchy 
  结构模型 
  是 
  是 
  ISEHierarchy 
  ISE结构模型 
  是 
  是 
  ModelerWater 
  水面水体 
  是 
  是 
  ModelerRiver 
  河道水岸 
  是 
  是 
  ModelerEmbank 
  挡水岸堤 
  是 
  是 
  Vegetation 
  区域植被 
  是 
  是 
  CameraStart 
  镜头初始状态 
  是 
  是 
  CameraRoam 
  镜头漫游 
  是 
  是 
  Bound 
  覆盖物沿路径移动 
  是 
  是 
  Environment 
  环境 
  是 
  是 
  RealTimeVideo 
  实时视频 
  是 
  是 
  Window 
  窗口 
  是 
  是 
  Poi 
  POI 
  是 
  是 
  Particle 
  特效 
  是 
  是 
  Effects 
  粒子特效 
  是 
  是 
  Text3D 
  3D文字 
  是 
  是 
  Light 
  灯光 
  是 
  是 
  Viewshed 
  可视域 
  是 
  是 
  Path 
  路径 
  是 
  是 
  Parabola 
  迁徙图 
  是 
  是 
  Range 
  区域轮廓 
  是 
  是 
  HeatMap 
  热力图 
  是 
  是 
  ColumnarHeatMap 
  柱状热力图 
  是 
  是 
  SpaceHeatMap 
  点云热力图 
  是 
  是 
  RoadHeatMap 
  路径热力图 
  是 
  是 
  Raster 
  栅格图 
  是 
  是 
  HighlightArea 
  高亮区域 
  是 
  是 
  ProjectModel 
  工程模型 
  是 
  否 
  ProjectInstance 
  工程Instance模型 
  是 
  否

