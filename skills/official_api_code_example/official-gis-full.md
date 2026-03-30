# official-gis-full（GIS 2.1.0 在线完整摘录 - 2026.03.26 更新）

来源：`https://wdpapidoc-admin.51aes.com/manual/doc` 对应在线接口。

整理规则：只使用在线文档管理平台数据；其他资料本轮不参与。

> **版本更新**：GIS API 2.1.0 (2026.03.26) 新增 `OnGeoLayerFeatureClicked` 回调 `featureType` 字段

## 通用事件监听

### 通用事件监听（id: 1319）

```javascript
App.Renderer.RegisterEvent([
    {
        name: 'onStopedRenderCloud', func: function (res) {
            // io client disconnect
            // 渲染服务中断 todo
        }
    },
    {
        name: 'onVideoReady', func: function () {
            // 视频流链接成功 todo
        }
    }
])
```

```javascript
App.Renderer.UnRegisterEvent(['onStopedRenderCloud']);
```

```javascript
App.Renderer.RegisterEvents([
	{
        name: 'onStopedRenderCloud', func: (res) => {
            // io client disconnect
            // 渲染服务中断 todo
        }
    },
  	...
]);
```

```javascript
App.Renderer.UnRegisterEvents(['onStopedRenderCloud']);
```

```javascript
 await App.Renderer.RegisterSceneEvent([
    {
      name: 'OnWdpSceneIsReady', func: async function (res) {
        // { "event_name": "OnWdpSceneIsReady", "result": { "progress": 100 } }
        if(res.result.progress === 100) {
            // 场景加载完成
        }
      }
    },
    {
      name: 'OnWdpSceneChanged', func: async function (res) {
        // 实体对象操作后回调；
        // res.result --> {added[object]，updated[object]，removed[object]}
      }
    },
    {
      name: 'OnMouseEnterEntity', func: async function (res) {
        // 鼠标滑入实体事件回调; 包含数据信息与实体对象
        //1.15.0支持window鼠标滑入
      }
    },
    {
      name: 'OnMouseOutEntity', func: async function (res) {
        // 鼠标滑出实体事件回调; 包含数据信息与实体对象
        //1.15.0支持window鼠标滑入
      }
    },
    {
      name: 'OnEntityClicked', func: async function (res) {
        // 覆盖物被点击事件回调; 包含数据信息与实体对象
        // 新增triggerType类型，区分左，中，右鼠标事件>=1.15.1
      }
    },
    {
      name: 'OnEntityDbClicked', func: async function (res) {
        // 覆盖物被双击点击事件回调; 包含数据信息与实体对象
      }
    },
    {
      name: 'OnWebJSEvent', func: async function (res) {
        // 接收widnow内嵌页面发送的数据
        // { "event_name": "OnWebJSEvent", "result": { "name": "自定义name", "args": "自定义数据" }}
      }
    },
    {
      name: 'MeasureResult', func: async function (res) {
        // 测量工具数据回调
      }
    },
   {
      name: 'OnMoveAlongPathProcessEvent', func: async function (res) {
        // 支持1.14.0(包含1.14.0)版本以上
        // 覆盖物沿路径移动(节点监测)
      }
    },
   {
      name: 'OnRealTimeVideoEvent', func: async function (res) {
        // 支持1.14.0(包含1.14.0)版本以上
        // 实时视频关闭按钮点击销毁后的事件
      }
    },
    {
      name: 'OnMoveAlongPathEndEvent', func: async function (res) {
        // 覆盖物移动结束信息回调
      }
    },
    {
      name: 'OnCameraMotionStartEvent', func: async function (res) {
        // 相机运动开始信息回调
        // 相机运动回调事件
        /*
          E_API_FocusToEntities：FocusToNodes（相机聚焦nodeId单体）；Focus（相机聚集实体）
          E_API_FocusToAllEntities：FocusToAll（按类型聚焦实体）；
          E_API_FocusToPosition：FlyTo（相机聚焦到坐标点）；
          E_API_CameraStop：stop(停止相机移动/旋转)；
          E_API_FollowEntitiy：Follow（相机跟随实体）；
          E_API_CameraMove：Move（相机移动）；
          E_API_CameraRotate：Rotate（相机旋转）；
          E_API_CameraAround：Around（场景旋转）；
          E_API_PlayCameraRoam：PlayCameraRoam（漫游）；
          E_API_UpdateCamera：SetCameraPose（设置镜头位置）；ResetCameraPose（重置镜头位置）；UpdateCamera（更新镜头位置）；注：只有镜头位置发生变化时才会触发
          E_DeviceInput：CameraStepRotate（相机step旋转）；CameraStepZoom（相机step缩放）；
          */
      }
    },
    {
      name: 'OnCameraMotionEndEvent', func: async function (res) {
        // 相机运动结束信息回调
      }
    },
  {
      name: 'OnCameraRoamingFrame', func: async function (res) {
        // 相机漫游节点事件
      }
    },
    {
      name: 'PickPointEvent', func: async function (res) {
        // 取点工具取点数据回调
      }
    },
    {
      name: 'OnEntitySelectionChanged', func: async function (res) {
        // 实体被选取[框选]、数据回调
      }
    },
    {
      name: 'OnEntityNodeSelectionChanged', func: async function (res) {
        // 模型node选择状态变化数据回调
      }
    },
    {
       name: 'OnEntityReady', func: async function (res) {
           // 3DTilesEntity，WMSEntity，WMTSEntity 加载完成;
           // {success: true, message: '', result: { object: 对象, progress: 100 }}
        }
     },
 
    {
       name: 'OnCreateGeoLayerEvent', func: async function (res) {
           // 用于GisApi； WMS,WMTS 添加 报错回调
        }
     },
    {
       name: 'OnGeoLayerFeatureClicked', func: async function (res) {
           // 用于GisApi；点击实体回调
        }
     }
  ])
```

```javascript
await App.Renderer.GetRegisterSceneEvent();
```

```javascript
await App.Renderer.UnRegisterSceneEvent(['OnWdpSceneIsReady']);
```

```javascript
await App.Renderer.RegisterSceneEvents([
    {
        name: 'OnEntityClicked', func: async function (res) {
            console.log(res)
        }
    }
])
```

```javascript
const res = await App.Renderer.GetRegisterSceneEvents();
console.log(res);
```

```javascript
await App.Renderer.UnRegisterSceneEvents(['OnEntityClicked'])
```

```javascript
await App.Renderer.RegisterErrorEvent([
	{
     // 配合字段检测使用
      name: 'OnValidateError',
      func: (res) => {
          // 业务代码 
      }
	}
]);
```

```javascript
await App.Renderer.UnRegisterErrorEvent(['OnValidateError']);
```

```javascript
App.Renderer.Stop()
```

```javascript
App.System.SetDefaultKeyboard(boolean); 
```

```javascript
await App.System.SetDefaultBrowserFunctionKeyboard(boolean);
```


## GIS事件监听

### GIS事件监听（id: 1320）

```javascript
App.Renderer.RegisterSceneEvent([
    {
       name: 'OnCreateGeoLayerEvent', func: async function (res) {
           // 用于GisApi； WMS,WMTS 添加 报错回调
        }
     },
    {
       name: 'OnGeoLayerFeatureClicked', func: async function (res) {
           // 用于GisApi；点击实体回调
        }
     }
])
```


## 安装部署

### 部署说明（id: 1321）

```javascript
import WdpApi from "wdpapi"
import GisApi from "@wdp-api/gis-api";
```

```javascript
// 设置初始化参数
const config = {
  "id": 'player',
  "url": "https://dtp-api.51aes.com",
  "order": "27c5520d11545b8d433edcd6dcbe405e",
  "debugMode": "normal",
  "resolution": [1920, 1080],
  "keyboard": {
      "normal": false,
      "func": false
  }
}

// 实例化wdpapi对象
const App = new WdpApi(config);

// 绑定GisApi功能到wdpapi对象
const res = await App.Plugin.Install(GisApi);
console.log(res.result.id)

// 插件卸载
await App.Plugin.Uninstall(res.result.id);
```

```javascript
const res = await App.gis.GetVersion();
console.log(res);

{
    "success": true,
    "message": "",
    "result": {
        "GisApiJsSdk": "1.3.0",
        "GisApiScenePlugins": "1.8.0"
    }
}
```

```javascript

App.Renderer.RegisterSceneEvent([
    {
        name: 'OnWdpSceneIsReady', func: async function (res) {
            if (res.result.progress === 100) {
                // 场景加载完成
            }
        }
    },
    {
        name: 'OnCreateGeoLayerEvent', func: async function (res) {
            // geoLayerType 类型错误
        }
    }
])
```


## 注意事项

### 注意事项（id: 1322）

```javascript
// 创建一个全局缓存对象，用于存储重要的应用数据
const cache = new Map();

// 示例: 创建一个地理图层对象，并传入JSON数据
const entityObj = new App.GeoLayer({
    // json data
});

// 将地理图层对象添加到应用场景中，并打印添加结果
const res = await App.Scene.Add(entityObj);
console.log(res);

// 将成功添加的地理图层对象缓存起来，以便后续操作
if (res.success) cache.set('geolayer', entityObj);

// 示例: 更新缓存中的地理图层对象的数据
const updateRes = await cache.get('geolayer').Update({json data});
console.log(updateRes);

// 示例: 设置缓存中的地理图层对象的可见性
const visibilityRes = await cache.get('geolayer').SetLayerVisible(true / false);
console.log(visibilityRes);

// 示例: 删除缓存中的地理图层对象
const deleteRes = await cache.get('geolayer').Delete();
console.log(deleteRes);

// 示例: 查询缓存中的地理图层对象的信息
const getRes = await cache.get('geolayer').Get();
console.log(getRes);

```


### 版本历史（id: 1323）

- 本条目未提供代码块（contentType=5）。


## 通用行为

### 聚焦图层实体（id: 1324）

```javascript
const jsondata = {
    "rotation": {
        "pitch": -40, //俯仰角, 参考(-90~0)
        "yaw": 0 //偏航角, 参考(0正北, -180~180)
    },
    "distanceFactor": 0.8, //参数范围[0.1~1];实体占满屏幕百分比
    "flyTime": 1, //过渡时长(单位:秒)
    "entity": [cache.get('geolayer')] //实体对象; cache.get('geolayer')  new App.GeoLayer({}); 时缓存的对象
}

const res = await App.CameraControl.Focus(jsondata);
```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| rotation | object | ✅ | 相机姿态 |
| -pitch | number | 俯仰角, 参考(-90~0) |
| -yaw | number | 偏航角, 参考(0正北, -180~180) |
| distanceFactor | number | 参数范围[0.1~1];实体占满屏幕百分比 |
| flyTime | number | 过渡时长(单位:秒) |
| entity | object | ✅ | 实体对象 |


### 设置图层显隐（id: 1325）

```javascript
// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的对象

await cache.get('geolayer').SetLayerVisible(false); //隐藏图层
await cache.get('geolayer').SetLayerVisible(true); //显示图层
```


### 设置图层偏移（id: 1326）

```javascript
const jsondata = {
    "geoLayerOffset": [430,215,15]  //XYZ轴偏移量，单位为m
  }
const res = await GeoLayerObj.SetGeoLayerOffset(jsondata); // GeoLayerObj为矢量图层对象
```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| geoLayerOffset | array | ✅ | XYZ轴偏移量，单位：米 |


### 获取图层偏移信息（id: 1342）

```javascript
const res = await GeoLayerObj.GetGeoLayerOffset();  // GeoLayerObj为矢量图层对象
console.log(res);
```


### 设置图层旋转（id: 1328）

```javascript
const jsondata = {
     "GeoLayerRotation": [1,0,0]  //pitch: 俯仰角, yaw: 偏航角, roll: 翻滚角
}
// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的对象
await cache.get('geolayer').SetGeoLayerRotation(jsondata);

```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| GeoLayerRotation | number | ✅ | pitch: 俯仰角, yaw: 偏航角, roll: 翻滚角 |


### 图层删除（id: 1330）

```javascript
// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的对象
await cache.get('geolayer').Delete();
```

```javascript
await App.gis.RemoveAll();
```


## 矢量图层

### 添加矢量点图层（id: 1334）

```javascript
const entityObj = new App.GeoLayer({//创建图层对象
    "geoLayerUrl": "point.shp", //支持在线地址和绝对路径file:///E:/test/point.shp和相对路径(需将文件放到项目文件目录的Content文件夹下)
    "geoLayerType": "shp", //Shp，支持shp，WFS,geojson
    "geoLayerParams": {
        "serviceLayerName": "",
        "featureType": "point", //Polygon/line/point
        "needGCJOffset": false,
        "layerHeightOffset":500,
        "batchFeatureNum": 40 //合批处理要素数量
    },
    "geoFeatureStyle": {
        "styleDesc": "Default", //StyleDesc用于描述材质和纹理等固定表现，支持Default（不透明）,Default1（半透明）
        "pointStyle":
        {
            "pointColor": "00f1d0eb", //点颜色
            "pointSize": 100, //点大小
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

```javascript
const entityObj = new App.GeoLayer({ //创建图层对象
    "geoLayerUrl": "WFS:http://cim.51aes.com/geoserver/Shanghai/ows?", //WFS地址前需标注“WFS:”
    "geoLayerType": "WFS", //Shp，支持shp，WFS,geojson
    "geoLayerOperation": {
        "tile_MaximumScreenSpaceError": 8
    },
    "geoLayerParams": {
        "serviceLayerName": "Shanghai:pointClip",
        "featureType": "point", //Polygon/line/point
        "needGCJOffset": false,
        "batchFeatureNum": 40 //合批处理要素数量
    },
    "geoFeatureStyle": {
        "styleDesc": "Default1",
        "pointStyle":
        {
            "pointColor": "00f1d0eb", //点颜色
            "pointSize": 100, //点大小       
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

| 类型 | 维度 | 核心特征 | 典型应用 |
| --- | --- | --- | --- |
| wkbPoint | 2D | 单个 XY 坐标点，基础类型 | 2D 地图 POI 标注、平面点位渲染 |
| wkbMultiPoint | 2D | 多个独立 wkbPoint 的集合 | 批量离散点标注、2D 点要素集合 |
| wkbPoint25D | 2.5D | 带 Z 坐标的单点（高程 / 深度） | 3D 地形上的高程点、无人机航点 |
| wkbMultiPoint25D | 2.5D | 多个 wkbPoint25D 的集合 | 批量 3D 高程点、山区测点批量渲染 |


### 添加矢量线图层（id: 1335）

```javascript
const entityObj = new App.GeoLayer({ //创建图层对象
    "geoLayerUrl": "line.shp", //支持在线地址和绝对路径E:/test/line.shp和相对路径(需将文件放到项目文件目录的Content文件夹下)
    "geoLayerType": "shp", //Shp，支持shp，WFS，geojson
    "geoLayerParams": {
        "serviceLayerName": "",
        "featureType": "line", //Polygon/line/point
        "needGCJOffset": false,
        "layerHeightOffset":500,
        "batchFeatureNum": 40 //合批处理要素数量
    },
    "geoFeatureStyle": {
        "styleDesc": "Default", //StyleDesc用于描述材质和纹理等固定表现
        "lineStyle":
        {
            "lineColor": "00f1d0eb", //线颜色
            "lineWidth": 10, //线宽
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

```javascript
const entityObj = new App.GeoLayer({  //创建图层对象
    "geoLayerUrl": "WFS:http://cim.51aes.com/geoserver/Shanghai/ows?", //WFS地址前需标注“WFS:”
    "geoLayerType": "shp", //Shp，支持shp，WFS，geojson
    "geoLayerOperation": {
        "tile_MaximumScreenSpaceError": 8
    },
    "geoLayerParams": {
        "serviceLayerName": "Shanghai:lineClip",
        "featureType": "line", //Polygon/line/point
        "needGCJOffset": false,
        "batchFeatureNum": 40 //合批处理要素数量
    },
    "geoFeatureStyle": {
        "styleDesc": "Default1",
        "lineStyle":
        {
            "lineColor": "00f1d0eb",
            "lineWidth": 10, //线宽
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

| 类型 | 维度 | 核心特征 | 典型应用 |
| --- | --- | --- | --- |
| wkbLineString | 2D | 单条折线 / 直线，XY 坐标 | 2D 道路、河流、单条航线 |
| wkbMultiLineString | 2D | 多个独立 wkbLineString 的集合 | 批量 2D 离散线、多条道路 / 航线 |
| wkbLineString25D | 2.5D | 单条带 Z 坐标的线（高程 / 深度） | 3D 地形公路、带海拔的输电线 |
| wkbMultiLineString25D | 2.5D | 多个 wkbLineString25D 的集合 | 批量 3D 高程线、山区多条徒步路线 |
| wkbCurve | 2D/3D | 单条弯曲曲线（非折线） | 弧形道路、圆形轨道、自然弯曲河流 |
| wkbMultiCurve | 2D/3D | 多个独立 wkbCurve 的集合 | 多个环形道路、多段圆弧管线 |


### 添加矢量面图层（通用样式）（id: 1332）

```javascript
const entityObj = new App.GeoLayer({//创建图层对象
    "geoLayerUrl": "buildingClip.shp",//支持在线地址和本地地址（绝对路径和相对路径）
    "geoLayerType": "shp", //Shp，支持shp，WFS，geojson
    "geoLayerParams": {
        "serviceLayerName": "",
        "featureType": "Polygon", //Polygon/line/point
        "needGCJOffset": false,
        "batchFeatureNum": 40, //合批处理要素数量，文件中具有大量要素时，调高此参数可以大幅提高加载性能
        "layerHeightOffset":500  //高度偏移
    },
    "geoFeatureStyle": {
        "styleDesc": "Default", //StyleDesc用于描述材质和纹理等固定表现，支持Default（不透明）,Default1（半透明）
        "polygonStyle": {
            "filledColor": "f8e4ffff", //多边形填充颜色
            "bOutline": true,//是否显示轮廓
            "outlineColor": "ffa5c8ff", //轮廓颜色
            "outlineWidth": 1, //轮廓宽度
            "bExtrude": true, //是否拉伸
            "extrudeHeight": 100, //图层整体拉伸高度
            "extrudeHeightField": "height" //拉伸高度对应属性值，与extrudeHeight属性二选一
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

```javascript
const entityObj = new App.GeoLayer({ //创建图层对象
    "geoLayerUrl": "WFS:http://cim.51aes.com/geoserver/Shanghai/ows?", //WFS地址前需标注“WFS:”
    "geoLayerType": "WFS", //Shp，支持shp，WFS，geojson
    "geoLayerParams": {
        "serviceLayerName": "TEST:SHANGHAI",  //图层名称，必填
        "featureType": "Polygon", //Polygon/line/point
        "needGCJOffset": false,
        "batchFeatureNum": 40, //合批处理要素数量，文件中具有大量要素时，调高此参数可以大幅提高加载性能
        "layerHeightOffset":500  //高度偏移
    },
    "geoFeatureStyle": {
        "styleDesc": "Default", //StyleDesc用于描述材质和纹理等固定表现，支持Default,Default1
        "polygonStyle": {
            "filledColor": "f8e4ffff", //多边形填充颜色
            "bOutline": true, //是否显示轮廓
            "outlineColor": "ffa5c8ff", //轮廓颜色
            "outlineWidth": 1, //轮廓宽度
            "bExtrude": true, //是否拉伸
            "extrudeHeight": 100, //图层整体拉伸高度
            "extrudeHeightField": "height" //拉伸高度对应属性值，与extrudeHeight属性二选一
        }
    }
});

const res = await App.Scene.Add(entityObj);
```

| 类型 | 维度 | 核心特征 | 典型用途 |
| --- | --- | --- | --- |
| wkbPolygon | 2D | 单一面（可带孔洞），平面 | 普通地块、行政边界 |
| wkbMultiPolygon | 2D | 多个独立 Polygon 集合 | 离散多地块、岛屿群 |
| wkbPolygon25D | 2.5D | 带 Z 坐标的单一面，无真 3D 体积 | 带高程的地块、水下区域 |
| wkbMultiPolygon25D | 2.5D | 多个 Polygon25D 集合 | 多组带高程的离散地块 |
| wkbSurface | 2D/3D | 广义曲面基类，支持弯曲面 | 非平面曲面（球面、圆柱面） |
| wkbPolyhedralSurface | 3D | 多面体表面，多个平面拼接成 3D 外壳 | 3D 建筑外立面、多面体单元 |
| wkbMultiSurface | 3D | 多个 Surface 集合，离散 3D 曲面 | 多栋建筑外立面、多地形曲面 |


### 添加矢量面图层（专题样式）（id: 1333）

```javascript
const entityObj = new App.GeoLayer({ //创建图层对象
    "geoLayerUrl": "WFS:http://cim.51aes.com/geoserver/Shanghai/ows?", //WFS地址前需标注“WFS:”
    "geoLayerType": "WFS", //Shp, 支持shp, WFS，geojson
    "geoLayerParams": {
        "serviceLayerName": "",
        "featureType": "Polygon", //Polygon/line/point
        "needGCJOffset": false,
        "batchFeatureNum": 1, //合批处理要素数量，以专题样式展示的时候请设置此参数为1
        "layerHeightOffset":500
    },
    "geoLayerSymbol": //专题样式配置
    {
        "symbolField": "Level1", //样式配置属性
        "symbolScheme": "EqualNum", //字段计算规则,支持等于、数字范围、包含,schema有EqualStr、ContainStr、EqualNum、NumRange,（NumRange的params格式为“90,100”）
        "geoFeatureSymbolArray": [
            {
                "symbolParams": "1", //属性值或者属性范围
                "geoFeatureStyle": { //该属性值或者属性条件下的多边形样式
                    "styleDesc": "Default",
                    "polygonStyle": {
                        "filledColor": "00f1d0eb",
                        "bOutline": true,
                        "outlineColor": "FFFFFFFF",
                        "outlineWidth": 1,
                        "bExtrude": true,
                        "extrudeHeight": 100
                    }
                }
            },
            {
                "symbolParams": "2",
                "geoFeatureStyle": {
                    "styleDesc": "Default",
                    "polygonStyle": {
                        "filledColor": "f14e00eb",
                        "bOutline": true,
                        "outlineColor": "FFFFFFFF",
                        "outlineWidth": 1,
                        "bExtrude": true,
                        "extrudeHeight": 80
                    }
                }
            },
            {
                "symbolParams": "3",
                "geoFeatureStyle": {
                    "styleDesc": "Default",
                    "polygonStyle": {
                        "filledColor": "e618ffe3",
                        "bOutline": true,
                        "outlineColor": "FFFFFFFF",
                        "outlineWidth": 1,
                        "bExtrude": true,
                        "extrudeHeight": 60
                    }
                }
            },
            {
                "symbolParams": "4",
                "geoFeatureStyle": {
                    "styleDesc": "Default",
                    "polygonStyle": {
                        "filledColor": "52c41af5",
                        "bOutline": true,
                        "outlineColor": "FFFFFFFF",
                        "outlineWidth": 5,
                        "bExtrude": true,
                        "extrudeHeight": 50
                    }
                }
            },
            {
                "symbolParams": "5",
                "geoFeatureStyle": {
                    "styleDesc": "Default",
                    "polygonStyle": {
                        "filledColor": "1890ffe3",
                        "bOutline": true,
                        "outlineColor": "FFFFFFFF",
                        "outlineWidth": 2,
                        "bExtrude": true,
                        "extrudeHeight": 90
                    }
                }
            }
        ]
    }
})

const res = await App.Scene.Add(entityObj);
```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| geoLayerUrl | string | ✅ | 支持在线地址; | 支持本地地址: "file:///D:/xxx/buildingClip.shp"; D: 渲染机盘符 |
| GeoLayerType | string | ✅ | shp/WFS/geojson |
| geoLayerParams | object | ✅ | 图层参数,只有当数据类型GDB,WFS,ArcGISFeatureService时才需要设置此参数,其他情况保持为空或者无需设置 |
| -serviceLayerName | string | 图层名称,比如"roads",当数据类型是WFS时,图层名称需添加数据集名称,比如:"Chengdu:WatersClip" |
| -featureType | string | ✅ | 类型:Polygon/line/point |
| -NeedGCJOffset | boolean | ✅ | 是否自动开启GCJ偏移 |
| -batchFeatureNum | object | ✅ | 批量加载要素数量，提高此参数可有效提高加载速度，但可能造成卡顿 |
| -layerHeightOffset | number | 初始高度偏移量 |
| geoLayerSymbol | object | 图层专题样式对象 |
| -symbolField | string | 专题样式指定属性字段 |
| -symbolScheme | string | 字段计算规则,schem有EqualStr,ContainStr,EqualNum,NumRange,(NumRange的params格式为"90,100"),依次表示支持字符等于,字符包含,数字等于,数字范围 |
| -geoFeatureSymbolArray | array | 图层样式数组 |
| --geoFeatureStyle | object | ✅ | 图层样式 |
| ---styleDesc | string | ✅ | StyleDesc用于描述材质和纹理等固定表现; 材质和纹理: Default（不透明）, Default1（半透明） |
| ---polygonStyle | object | ✅ | 多边形样式 |
| ----filledColor | string | ✅ | 多边形填充颜色 |
| ----bOutline | boolean | ✅ | 是否显示轮廓 |
| ----outlineColor | string | ✅ | 轮廓颜色 |
| ----outlineWidth | number | ✅ | 轮廓宽度 |
| ----bExtrude | boolean | ✅ | 是否拉伸 |
| ----extrudeHeight | number | ✅ | 拉伸高度 |
| ----extrudeHeightField | string | ✅ | 拉伸高度对应属性值height（采用extrudeHeight设置的高度值拉伸），Elevation（采用数据中包含的高程值拉伸） |


### 矢量图层样式更新（id: 1336）

```javascript
const jsondata = {
    "geoFeatureStyle": {
        "styleDesc": "Default", //材质和纹理: Default, Default1
        "polygonStyle": {
            "filledColor": "ffff00ff", //多边形填充颜色
            "bOutline": true, //是否显示轮廓
            "outlineColor": "00ffffff", //轮廓颜色
            "outlineWidth": 1, //轮廓宽度
            "bExtrude": true, //是否拉伸
            "extrudeHeight": 100, //图层整体拉伸高度
            "extrudeHeightField": "height" //拉伸高度对应属性值,与extrudeHeight属性二选一
        }
    }
}

const res = await cache.get('geolayer').Update(jsondata);
```


### 矢量图层要素高亮（id: 1337）

```javascript
const jsondata = {
    "featureId": "0", //要素id,可通过点击查询要素属性获取
    "highlightColor": "ffff00", // 默认值为ffff00
    "bHighlight": true, // 默认为true
}
const res = await GeoLayerObj.SetGeoLayerFeatureHighlight(jsondata); // GeoLayerObj为获取的矢量图层对象
console.log(res);
```

```javascript
App.Renderer.RegisterSceneEvent([
    {
        name: 'OnGeoLayerFeatureClicked', func: async function (res) {
           // 回调的res数据:
           {
               "FeatureId": "0",
               "featureType": "point", // 新增字段：用于区分点/线/面 (point/line/polygon)
               "BasicInfo": {
                  "gml_id": "clip.3606",
                }
            }

        }
    }
])
```

| 参数 | 类型 | 是否必选 | 取值范围 |
| --- | --- | --- | --- |
| featureId | string | Yes | 要素id，通过要素点击事件获取 |
| highlightColor | string | No | / |
| bHighlight | boolean | No | 默认为true代表高亮；设为false，取消高亮 |

> **版本更新说明**：GIS API 2.1.0 (2026.03.26) 中，`OnGeoLayerFeatureClicked` 回调数据新增 `featureType` 字段，用于区分点/线/面类型。


### 矢量图层点击事件（id: 1338）

```javascript
async function SetClickEvent () {
  const geoLayerObj = new App.GeoLayer({});
  geoLayerObj.onClick(async ev => {
    console.log(ev)
  })
}
```


## 影像图层

### 添加WMS图层（id: 1339）

```javascript
const entityObj = new App.GeoLayer({//创建图层对象
  "geoLayerUrl": "http://cim.51aes.com/geoserver/Shanghai/wms?layers=Shanghai:clip",  //WMS服务地址示例
  "geoLayerType": "wms",  //图层类型
  "geoLayerParams": {
        "layerHeightOffset":500
    },
});

const res = await App.Scene.Add(entityObj);  //将图层对象加载到场景中

```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| geoLayerUrl | string | ✅ | 数据服务地址 |
| geoLayerType | string | ✅ | wms |
| layerHeightOffset | number | no | 初始高度偏移量，单位m |


### 添加WMTS图层（id: 1340）

```javascript
const entityObj = new App.GeoLayer({//创建图层对象
  "geoLayerUrl": "https://t0.tianditu.gov.cn/img_c/wmts?tk=5d73b4bcbf63acbfbcc08ad39931d032&request=GetCapabilities&service=wmts",  //WMTS服务地址示例
  "geoLayerType": "WMTS",  //图层类型
    "geoLayerParams": {
        "layerHeightOffset":500
    },
});

const res = await App.Scene.Add(entityObj);  //将图层对象加载到场景中

```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| geoLayerUrl | string | ✅ | 数据服务地址 |
| geoLayerType | string | ✅ | WMTS |
| layerHeightOffset | number | no | 初始高度偏移量，单位m |


## 三维切片图层

### 添加3D Tiles图层（id: 1341）

```javascript
const entityObj = new App.GeoLayer({//创建图层对象
  "geoLayerUrl": "http://10.67.8.110:9003/model/tl10qi4Qf/tileset.json",  //3D Tiles服务地址示例,目前仅支持倾斜摄影模型转换的3D tiles模型
  "geoLayerType": "3DTiles",  //图层类型
  "geoLayerOperation": {
      "tile_MaximumScreenSpaceError": 8  //瓦片最大屏幕空间误差,此参数越小，越倾向于加载高层级瓦片
  },
  "geoFeatureStyle": {
      "filterColor": "eaff60"
  },
    "geoLayerParams": {
        "layerHeightOffset":500
    },
});

const res = await App.Scene.Add(entityObj);  //将图层对象加载到场景中

```

```javascript
const jsondata = {
  "geoFeatureStyle": {
    "filterColor": "ffff60"
  }
}

// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的3D Tiles对象
await cache.get('geolayer').Update(jsondata);

```

```javascript
// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的3D Tiles对象

await  cache.get('geolayer').SetGeoLayerOutLine({
  "styleName": "SkyBlue",
  "bOutLine": true
})
```

```javascript
// cache.get('geolayer')  new App.GeoLayer({}); 时缓存的3D Tiles对象

await  cache.get('geolayer').SetGeoLayerHighlight({
  "styleName": "SkyBlue",
  "bHighlight": true
})
```

| 参数 | 类型 | 必填 | 取值范围 |
| --- | --- | --- | --- |
| geoLayerUrl | string | ✅ | 数据服务地址; 本地地址: "file:///D:/xxx/buildingClip.json"; D: 渲染机盘符 |
| geoLayerType | string | ✅ | 3DTiles |
| tile_MaximumScreenSpaceError | number | no | [1~128]，瓦片最大屏幕空间误差，此参数越小，越倾向于加载高层级瓦片 |
| filterColor | string | no | HEX颜色 |
| layerHeightOffset | number | no | 初始高度偏移量（单位m） |


