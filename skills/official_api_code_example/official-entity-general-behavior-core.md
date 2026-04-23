# Official excerpt sync: 实体查询与管理

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 实体查询与管理, categoryId: 571)

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
