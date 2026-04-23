# official-bim-full（BIM 2.2.0 在线完整摘录 - 2026.03.26 更新）

来源：`https://wdpapidoc-admin.51aes.com/manual/doc` 对应在线接口。

整理规则：只使用在线文档管理平台数据；其他资料本轮不参与。

---

## 快速开始（核心操作）

> 本章节选取自原 `official-bim-core-operations.md`，提供最常用的 3 个核心操作。

### 1. 获取 BIM 模型列表

```javascript
const list = await App.DCP.GetModelList();
console.log("BIM model list:", list);
```

说明：
- 用于查询当前场景可用 BIM 模型清单。
- 常见返回字段可用于后续选择模型并加载（如模型标识、资源信息）。

### 2. 新增并加载 BIM 模型（Hierarchy）

```javascript
const entityObj = new App.Hierarchy({
  assetId: "your_asset_id",
  seedId: "your_seed_id",
  noFindHandle: true
});

await App.Scene.Add(entityObj);
```

参数说明：
- `assetId`: BIM 资源标识（由模型列表或业务配置提供）
- `seedId`: 种子标识（由资源发布侧提供）
- `noFindHandle`: 未找到处理句柄时是否忽略（通常可先 `true`）

### 3. 对象级基础行为

以下为 BIM 模型对象常见基础能力：

- `Update(...)`
- `SetRotator(...)`
- `SetScale3d(...)`
- `SetVisible(...)`
- `Get(...)`
- `Delete(...)`

说明：
- 这部分在后台多个条目中分散出现，详见下文各专题章节。

### 最小链路建议

1. `GetModelList` 获取目标模型元数据
2. `new App.Hierarchy({...})` 构造对象
3. `App.Scene.Add(entityObj)` 加载入场景
4. 再执行对象级行为（显隐、旋转、缩放、删除等）

---

## 完整 API 参考

以下章节包含完整的 BIM API 文档：


## 通用事件监听

### 通用事件监听（id: 1475）

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


## 版本历史

### 版本历史（id: 1515）

- 本条目未提供代码块（contentType=5）。


## BIM事件监听

### BIM事件监听（id: 1476）

```javascript
App.Renderer.RegisterSceneEvent([
  {
    name: 'OnMouseEnterComponent',
    func: async (res) => {
      // 鼠标滑入构件事件回调（需先激活目标层级BIM模型）; 包含鼠标所在叶子级构件及其所属的所有上级构件的nodeId，level及其他数据信息
      console.log(res);
    }
  }，
 {
    name: 'OnMouseOutComponent',
    func: async (res) => {
      // 鼠标滑出构件事件回调（需先激活目标层级BIM模型）; 包含鼠标所在叶子级构件及其所属的所有上级构件的nodeId，level及其他数据信息
      console.log(res);
    }
  }，
{
    name: 'OnNodeClicked',
    func: async (res) => {
      // 层级模型构件被点击事件回调（需先激活目标层级BIM模型）; 包含鼠标所在叶子级构件及其所属的所有上级构件的nodeId，level及其他数据信息
      console.log(res);
    }
  }
])
```


## 安装部署

### 部署说明（id: 1477）

```javascript
import WdpApi from "wdpapi";
import BimApi from '@wdp-api/bim-api';
```

```javascript
// 设置初始化参数
const config = {
    "id": "player", //渲染容器dom id
    "url": "https://dtp-api.51aes.com/Renderers/Any/order", //渲染服务地址
    "order": "8099702a64dbb8ef4a0a2f7b5b1c42b0", //渲染口令
    "resolution": [1920,1080], //场景输出分辨率;
    "debugMode": "normal", //[可选] none:不打印日志, normal:普通日志
    "keyboard": { //[可选]
        "normal": false, //[可选]  键盘事件(wasd方向)开启关闭
        "func": false //[可选]  浏览器F1~F12功能键开启关闭
    }
}

// 实例化wdpapi对象
const App = new WdpApi(config);

// 绑定BIM/DCP功能到wdpapi对象
const res = await App.Plugin.Install(BimApi);
console.log(res.result.id)

// 插件卸载
await App.Plugin.Uninstall(res.result.id);
```

```javascript
await App.DCP.GetVersion();
// 出参示例
{
  "success": true,
  "message": "",
  "result": {
    // 表示插件在UE侧是否正常
    "isReady": false,
    // UE侧SDK版本号
    "apiVersion": "3.0.0",
    // 当前使用的BIM/DCP SDK版本
    "sdkVersion": "1.1.6"
  }
}
```


## 通用行为

### 属性获取（id: 1478）

```javascript
//entity可通过Eid获取实体或通过CustomId获取实体进行调用
const res = await entity.Get();
console.log(res);

//例子：
const re = await App.Scene.GetByEids(['xxx','xxx']); //其中'xxx'是你的实体eid编号
const entity = re.result[0];
const res = await entity.Get();
console.log(res);
```


## 全局设置

### 设置全局高亮样式（id: 1479）

```javascript
//此方法对高亮空间方法不生效，即SetRoomHighLight不生效
const res = await App.DCP.SetNodeDefaultHighLightStyle("ffb212", {opacity: 0.8, bCanBeOccluded: true});
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| highLightColor | string | 高亮颜色，用于节点高亮显示 | 十六进制颜色代码（如："ffb212"） | 是 |
| opacity | number | 不透明度，用于设置高亮的透明程度 | 0.0 ~ 1.0 | 否 |
| bCanBeOccluded | boolean | 是否可被遮挡，决定是否被其他物体遮挡 | true / false | 否 |


### 获取全局高亮样式（id: 1480）

```javascript
const res = await App.DCP.GetNodeDefaultHighLightStyle();
console.log(res);
```


## 模型行为

### 获取模型列表（id: 1481）

```javascript
// lite包：该接口获取到的是场景中消费的模型
// 同一个lite，下载2个场景，接口获取到的是2个场景消费的模型之和 >=wdp5.10
const res = await App.DCP.GetModelList(); //获取上传的所有模型，返回一个模型列表
console.log(res);
```

```javascript
/*
// 例子
const res = await App.DCP.GetModelList("",{
  pageNumber: 1,
  pageSize: 15,
  fetchAll: true,
});
console.log(res);
*/
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| keyword | string | 搜索关键字，模糊搜索，大小写敏感，当前只针对模型名称有效 | 否 |
| pageNumber | number | 当前页面 | 否 |
| pageSize | number | 分页大小 | 否 |
| fetchAll | boolean | 是否全部加载 | 否 |


### 新加载模型（id: 1482）

```javascript
const entityObj = new App.Hierarchy({
    "location": [121.4962461,31.23960914,57],
    "assetId": entity.assetId,
    "assetName": entity.assetName, 
    "seedId": entity.seedId, //模型编号 seedId
    "entityName": "modelName",
    "customId": "my-hierarchy-id",
    "customData": {
      "data": "modelCustomData"
    },
    "tempLoad": true, // 对已经存在于场景中的模型进行卸载和重新加载(EID和原设置不变), 以节约性能 [可选]
    "castShadow": true, // 模型是否产生投影 [可选]
  });
  const res = await App.Scene.Add(entityObj);
  console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| location | Array | 模型位置 | 是 |
| assetId | string | Daas资产库中资产id（资产带有版本号） | 字符串 | 否 |
| assetName | string | 指定资源库中的模型名称 | 字符串 | 否 |
| seedId | string | 导入模型生成的seedId（没有版本号） | 字符串或数字 | 是 |
| entityName | string | 模型名称（在场景中显示的名称） | 字符串（如："modelName"） | 否 |
| customId | string | 自定义 ID | 字符串 | 否 |
| customData | Object | 自定义数据（用于携带额外信息） | JSON 对象（如：{"data":"modelCustomData"}） | 否 |
| tempLoad | boolean | 对已经存在于场景中的模型进行卸载和重新加载(EID和原设置不变), 以节约性能 [可选] | true / false（默认 false） | 否 |
| castShadow | boolean | 模型是否产生投影 [可选] | true / false（默认 true） | 否 |
| bReceivesDecals | boolean | 模型是否受贴花影响 | true / false（默认 false） | 否 |


### 模型临时加载卸载（id: 1483）

```javascript
//model可通过Eid获取或通过新加载模型
//对场景中已加载的模型进行业务中临时的卸载/加载，该模型EID和模型设置各属性不变；在模型量很大时，用于解决性能 
const res = await model.Update({"tempLoad": false}); //  true: 加载; false: 卸载;
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| tempLoad | boolean | 临时加载/卸载 | true / false | 是 |


### 根据metadata获取案例内模型（id: 1484）

```javascript
//编辑器上传模型时，上传带有metadata业务数据的zip包
//搜索metadata中的key-value（一到多组），取其交集筛选出场景中符合要求的BIM模型实体
//输入参数为key: value形式，值可多个，同一key内取合集；
//如果值为空，则搜索结果为空；
//如果key或value搜索不到，则返回空

const res = await App.DCP.GetModelsByMetadata({
  "metadata01": ["string"],
  "metadata02": ["string"], 
  "metadata03": ["string"]
});
console.log(res);
/*
// 例子
const res = await App.Dcp.GetModelsByMetadata({
  projectCode:"KT240",
  buildNo: "T1",
  floor: "L30",
  modelType: ['ARC','MEP'],
  pipeType: ["AC","DR","EL","ELV","FS","PL","TG"],
  });
  console.log(res);
*/
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| metadata | object | 元数据筛选条件，key: value形式；元数据筛选对象，包含一个或多个键值对，用于筛选模型 | key: string，value: Array，如：{"metadata01": ["string"]} | 是 |


### 激活模型（id: 1485）

```javascript
//entity可通过Eid获取实体或通过新加载模型获取实体
const res = await entity.Active(true); 
console.log(res);
```


### 模型移动（id: 1486）

```javascript
//entity可通过Eid获取实体或通过新加载模型获取
// 方式一：
// entity.location = [121.49510278, 31.24402272, 0];
// 方式二：
const res = await entity.SetLocation([121.49510278,31.24402272,0]); 
console.log(res);

```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| location | Array | 坐标位置 [longitude, latitude, altitude] | 模型位置，包含经度、纬度、高度坐标；如：[121.49510278,31.24402272,0] | 是 |


### 模型旋转（id: 1487）

```javascript
//entity可通过Eid获取实体或通过新加载模型获取
// 方式一：
// entity.rotator = {pitch: 0, yaw: 30, roll: 0};
// 方式二：
const res = await entity.SetRotator({ 
"pitch": 0, //俯仰角
"yaw": 30, //偏航角
"roll": 0 //翻滚角
}); 
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| pitch | number | 俯仰角 | -180 ~ 180 (0正北，90南，-90北) | 是 |
| yaw | number | 偏航角 | -180 ~ 180 | 是 |
| roll | number | 翻滚角 | -180 ~ 180 | 是 |


### 模型缩放（id: 1488）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
// 方式一：
// entity.scale3d = [30, 30, 30];
// 方式二：
const res = await entity.SetScale3d([30,30,30]); 
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| scale3d | number[] | 三维缩放比例 | 三元素数组，如[30,30,30] | 是 |


### 模型聚焦（id: 1489）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.SetFocus();
console.log(res);
```


### 模型显隐（id: 1490）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
// 方式一：
// entity.bVisible = false;
// 方式二：
const res = await entity.SetVisible(false); 
console.log(res);

```


### 模型落地（id: 1491）

```javascript
//entity可通过Eid获取实体或通过新加载模型获取实体
const res = await entity.SetGround();
console.log(res);
```


### 剖切开启（id: 1492）

```javascript
const options = {
        coordZRef: 'ground', // surface; ground; altitude
        strokeColor: '00B3E5', // 被切物体描边颜色(HEX颜色值)
        strokeWeight: 2, // 被切物体描边宽度[0~1]
        invert: false, // 被切物体(true:内部可见; false:外部可见)
        showlocation: true, // true:显示剖切参考顶角location; false:隐藏剖切参考顶角location
        transform: {
              location: entity.location, // 剖切体底部一个顶角对应的位置
              rotator: {
                pitch: 0, // 俯仰角, 参考(-180~180)
                yaw: 0, // 偏航角, 参考(0正北, -180~180)
                roll: 0 // 翻滚角, 参考(-180~180)
              },
              size: [150, 150, 150] // 长、宽、高
        }
}
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.StartModelSection(options); 
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| coordZRef | string | 剖切基准高度类型 | "surface" / "ground" / "altitude | 是 |
| strokeColor | string | 被切物体描边颜色（HEX颜色值） | 颜色字符串，如："00B3E5" | 是 |
| strokeWeight | number | 被切物体描边宽度 | 0 ~ 1 | 是 |
| invert | boolean | 被切物体显示模式 | true（内部可见）/ false（外部可见） | 是 |
| showlocation | boolean | 是否显示剖切参考顶角位置 | true / false | 是 |
| transform | object | 剖切体的变换设置 | 包含location, rotator, size | 是 |
| location | Array | 剖切体底部一个顶角对应的位置 | 数组（如：[经度, 纬度, 高度]） | 是 |
| rotator | object | 剖切体的旋转设置 | pitch, yaw, roll对象 | 是 |
| pitch | number | 俯仰角 | -180 ~ 180 | 是 |
| yaw | number | 偏航角 | -180 ~ 180（0表示正北） | 是 |
| roll | number | 翻滚角 | -180 ~ 180 | 是 |
| size | Array | 剖切体的长、宽、高 | 数组（如：[150, 150, 150]） | 是 |


### 剖切重置（id: 1493）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取列表
const res = await entity.ResetModelSection();
console.log(res);

```


### 剖切关闭（id: 1494）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.EndModelSection(); 
console.log(res);
```


### 开启拆楼（id: 1495）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.StartBuildingLayer();
console.log(res);
```


### 关闭拆楼（id: 1497）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体 
const res = await entity.EndBuildingLayer();
console.log(res);
```


### 模型卸载（id: 1496）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.Delete(); 
console.log(res);
```


## 构件行为

### 获取构件树（id: 1498）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//tip::: 查询模型列表; 参数为空, 则查询顶层树
const res = await entity.GetNodeTree();  //entity可通过Eid获取实体或通过模型列表获取进行调用
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件id | / | 否 |
| pageNumber | number | 当前页面 | / | 否 |
| pageSize | number | 页面大小 | / | 否 |
| fetchAll | boolean | 是否全部加载 | / | 否 |


### 构件树搜索（id: 1499）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//返回的搜索结果是树形结构；参数nodeId根据获取构件数获取
const res = await entity.GetNodeTreeBySearch("542"); //entity可通过Eid获取实体或通过模型列表获取进行调用；"542"参数为构件编号，根据你需求进行输入
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件编号，用于搜索节点树 | 是 |


### 构件列表搜索（id: 1500）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//返回的搜索结果是列表结构; 参数nodeId根据获取构件数获取
const res = await entity.GetNodeListBySearch("597");//entity可通过Eid获取实体或通过模型列表获取进行调用
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| searchKey | string | 构件编号，用于搜索节点 | 是 |


### 获取构件属性（id: 1501）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
const res = await entity.GetNodeInfo("441"); //entity可通过Eid获取实体或通过模型列表获取进行调用
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件编号（用于指定节点）如："441" | 是 |


### 通过节点ID获取构件树（id: 1502）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
const res = await entity.GetNodeTreeById("597"); //entity可通过Eid获取实体或通过模型列表获取进行调用； nodeId根据获取构件数获取
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件编号，用于获取构件树 | 是 |


### 获取父级节点ID（id: 1503）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
const res = await entity.GetNodeParentId("416"); //entity可通过Eid获取实体或通过模型列表获取进行调用
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 节点ID（用于查找父节点，如："416"） | 是 |


### 根据属性获取案例内构件（id: 1504）

```javascript
//属性为BIM模型叶子节点中带有的属性数据，支持存取源文件中的自定义属性，目前属性支持仅支持类型为element类型的
//搜索属性中的key-value（一到多组），取其交集，筛选出场景中所有符合业务要求的构件（及其属于哪个BIM模型实体）
//key: value形式，值为数组可多个，同一key内取value的合集；
//如果value为空，则搜索结果为空；
//如果key或value搜索不到，则返回空
const res = await App.DCP.GetNodesByProperties({
  "key01": ["string"],
  "key02": ["string"],
  "key03": ["string"]
});
console.log(res);

```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| filter | Object | 元数据筛选对象，包含一个或多个键值对，用于筛选出模型构件 | key: string，value: Array，如：{ "key01": ["string"],} | 是 |


### 构件聚焦（id: 1505）

```javascript
const jsondata = {
   cameraParams:{
          "rotation": {
            "pitch": -40, //俯仰角;取值[-90~0]
            "yaw": 0 //偏航角;取值[-180~180](0:东; 90:南; -90:北)
          },
          "distanceFactor": 0.5, //视野参数范围[0.1~1]; 占满屏幕百分比
          "flyTime": 1, //过渡时长(单位:秒)
    }
}
//entity可通过Eid获取实体或通过模型列表获取进行调用
//参数nodeId根据获取构件数获取
const res = await entity.SetNodeFocus("596", jsondata);
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件节点ID | 字符串（如："596"） | 是 |
| cameraParam | object | 相机视角参数 | JSON对象 | 是 |
| rotation | object | 相机旋转角度设置 | JSON对象，包含 pitch 和 yaw | 是 |
| pitch | number | 俯仰角 | [-90, 0] | 是 |
| yaw | number | 偏航角 | [-180, 180]（0: 东，90: 南，-90: 北） | 是 |
| distanceFactor | number | 视野占屏幕比例 | [0.1, 1] | 是 |
| flyTime | number | 视角过渡时长（单位：秒） | 任意正数（如：1） | 是 |


### 构件显隐（id: 1506）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
const res = await entity.SetNodeVisibility("597", false);
console.log(res);

  
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件节点ID；如："597 | 是 |
| visible | boolean | 是否显示节点（true: 显示; false: 隐藏） | true / false | 是 |


### 构件反选显隐（id: 1507）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
const res = await entity.SetOtherNodesVisibility(["597"], false); // 排除此nodeId节点，其他节点显示/隐藏
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | arrray | 排除此nodeId节点，其他节点显示或隐藏 | 否 | 是 |
| visible | boolean | 显示/隐藏 | true/false | 是 |


### 构件全部显示（id: 1508）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取模型
const res = await entity.SetNodeShowAll(); 
console.log(res);


```


### 构件高亮（id: 1509）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
const res = await entity.SetNodeHighLight("597", true, true, { // 此处NodeId支持写单个构件ID，也可以写多个构件ID数组，如 ["597", "598", "599"]
    color: "76fffc", 
    opacity: 1, 
    bCanBeOccluded: true,
    outlineStyle: {
      bOutline: true,
      color: "00B3E6",
      lineWidth: 0.5,
      brightness: 10,
      mode: "Flowing"
    }
  });
 console.log(res);


```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | 	string 或 array<string> | 构件节点ID，支持单个构件或多个构件 | 是 |
| status | boolean | 是否高亮 | true（高亮）/ false（不高亮） | 是 |
| unique | boolean | 是否排它（仅在status=true时生效 | true / false | 是 |
| color | string | 高亮颜色（HEX值） | 颜色字符串，如："76fffc" | 是 |
| opacity | number | 高亮透明度 | 0.0 ~ 1.0（默认0.5） | 否 |
| bCanBeOccluded | boolean | 是否可被遮挡 | true / false | 否 |
| outlineStyle.bOutline | boolean | 是否描边 | true / false | 否(描边和高亮是互斥的；true是描边，false是高亮) |
| outlineStyle.color | string | 描边的颜色 | 否 |
| outlineStyle.lineWidth | number | 线的粗细 | 0.0 ~ 1.0（默认0.5） | 否 |
| outlineStyle.brightness | number | 设置线的高亮程度 |
| outlineStyle.mode | string | 样式 | 默认（Flowing） | Flowing：流动；Flashing：闪烁 |


### 获取构件坐标（id: 1510）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体
//参数nodeId根据获取构件数获取
//构件移动中一定要使用center来获取构件的坐标
const res = await entity.GetNodeCoord({
    "nodeId": "xxxx", // 构件的nodeId
    "coordType":"top",// top: 构件顶面中心(默认top), center: 构件中心, bottom: 构件底面中心;以世界坐标上下为准，不受构件旋转影响
  }); // 返回坐标参考为altitude
  console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string | 构件节点ID | 字符串（如："xxxx"） | 是 |
| coordType | string | 坐标类型（默认：top） | "top"（顶面中心）、"center"（构件中心：构件移动中一定要使用center来获取构件的坐标）、"bottom"（底面中心） | 是 |


### 构件移动（id: 1511）

```javascript
const res = await entity.SetNodeLocation("597", [113.30635492,23.33026007,90]);
console.log(res);

```


## 空间操作

### 根据Room属性获取空间（跨模型）（id: 1512）

```javascript
/**
 * 属性指Revit格式的用户模型中，Room（如有）中带有的所有属性数据，支持存取源文件中的Room自定义属性
 * 搜索Room属性中的key-value（一到多组），取其交集，筛选出场景中所有符合业务要求的空间（及其属于哪个BIM模型实体）
 * key、value值精确搜索，适用于业务筛选开发
 */
const res = await App.DCP.GetByProperties(
    {
      "Space Code": "XXXX-XXXX-XXXX", 
          // key: value形式，值为数组可多个，同一key内取value的合集；如果value为空，则搜索结果为空；如果key或value搜索不到，则返回空
         // Space Code 可以根据获取构件属性api命令进行筛选获取
    }, 
    {
      "type": "space", // element | space
      "disableDetails": true
    }
 );
console.log(res);
/*
const res = await App.DCP.GetByProperties(
    {
      "Space Code": ["T1-L30-STR-003", "T1-L30-STR-001"], 
    }, 
    {
      "type": "space", // element | space
      "disableDetails": true
    }
 );
console.log(res);
*/
  
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| Revit文件中原始文件属性 | string/array | 属性指Revit格式的用户模型中，Room（如有）中带有的所有属性数据，支持存取源文件中的Room自定义属性 | 单个字符串或字符串数组 | 是 |
| type | string | 查询类型：element（构件）或space（空间） | "element" / "space" | 是 |
| disableDetails | boolean | 是否禁用详情（用于性能优化） | true / false | 否 |


### 高亮空间（id: 1513）

```javascript
//entity可通过Eid获取实体或通过新模型加载获取实体类型
const res = await entity.SetRoomHighLight({
    "roomIds":["8763522","8763529","8763533"],// roomIds根据Room属性获取空间（跨模型）运行获取
    "bVisible": true, // 非必填，默认true
    "colorStyle": { 
      "color": "0000ff", // HEX颜色值；非必填，默认值0000ff
      "opacity": 0.50, // 透明度，取值范围 0-1，精确到小数点后2位；非必填，默认值0.50
      "bCanBeOccluded": true,
    }// 高亮颜色设置仅本次生效，不受全局设置影响
  });
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| roomIds | [string] | 空间ID列表，可跨模型使用 | 是 |
| bVisible | boolean | 是否可见（高亮开关），默认true | true / false | 否 |
| colorStyle | object | 高亮颜色设置（仅本次生效） | JSON对象，见下表 | 否 |
| color | string | 高亮颜色（HEX值），默认0000ff | 颜色字符串（如："0000ff"） | 否 |
| opacity | number | 高亮透明度，默认0.50 | 0.00 ~ 1.00，保留两位小数 | 否 |
| bCanBeOccluded | boolean | 是否可被遮挡 | true / false | 否 |


### 聚焦空间（id: 1514）

```javascript
const jsondata = {
    roomIds: ["8763522"], // [必填] 空间ID；roomIds根据Room属性获取空间（跨模型）运行获取
    rotation: { 
      pitch: -40, // [选填] 俯仰角;取值范围[-90~0]，默认值-30  
      yaw: 0 // [选填] 偏航角;取值范围[-180~180](0:东; 90:南; -90:北)，默认值0
    },
    distanceFactor: 0.5, // [选填] 视野参数范围[0.1~1]; 占满屏幕百分比，默认值0.8
    flyTime: 1, // [选填] 过渡时长(单位:秒)，默认值1
  }
//entity可通过Eid获取实体或通过新模型加载获取实体类型
const res = await entity.SetRoomFocus(jsondata);
console.log(res);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| roomIds | string[] | 空间ID列表，可跨模型使用 | 是 |
| rotation | object | 相机旋转角度 | JSON对象 | 否 |
| pitch | number | 俯仰角 | [-90, 0]，默认-30 | 否 |
| yaw | number | 偏航角 | [-180, 180]，默认0 | 否 |
| distanceFactor | number | 视野参数范围（屏幕占比） | [0.1, 1.0]，默认0.8 | 否 |
| flyTime | number | 过渡时长（单位：秒） | 大于0的数字，默认1 | 否 |


## 批量构件专题高亮（新增于 2.2.0）

### 批量构件专题高亮（id: 1738）

```javascript
// entity为所控制的模型实体
await entity.SetNodesHighlight([
    {
      nodeId: "597",  // string | Array<string> 可为单个构件id字符串或多个构件id组成的字符串数组
      color: "76fffc", 
      hightlight: true,
      opacity: 1, 
      bCanBeOccluded: true
    },
    {
      nodeId: "598",
      color: "00B3E6", 
      hightlight: false,
      opacity: 1, 
      bCanBeOccluded: true
    }
  ]);
```

| 参数名 | 类型 | 描述 | 取值范围 | 是否必填 |
| --- | --- | --- | --- | --- |
| nodeId | string 或 Array<string> | 构件节点ID，可为单个字符串或多个构件id组成的数组 | 如："597" 或 ["597", "598"] | 是 |
| color | string | 高亮颜色（HEX值） | 颜色字符串，如："76fffc" | 是 |
| hightlight | boolean | 是否高亮 | true / false | 是 |
| opacity | number | 高亮透明度 | 0.0 ~ 1.0 | 否 |
| bCanBeOccluded | boolean | 是否可被遮挡 | true / false | 否 |


