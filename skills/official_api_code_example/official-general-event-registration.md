# 官方脚本摘录（新版后台）：通用事件监听

版本基线：WDP API 2.2.1
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

## 条目：通用事件监听（id: 1343）

- 注册云渲染(建立连接)生命周期错误与异常事件

```javascript
App.Renderer.RegisterEvent([
    // [高价值补充字典] 以下为系统底层的抛出事件名（请按需选用）
    { name: 'onStopedRenderCloud', func: function (res) { /* io client disconnect 渲染服务中断 */ } },
    { name: 'onRenderCloudError', func: function (res) { /* 渲染服务错误 */ } },
    { name: 'onSocketError', func: function () { /* socket服务不存在 */ } },
    { name: 'onUnavailableRender', func: function () { /* 渲染服务不可用 */ } },
    { name: 'onRenderCloudConnected', func: function () { /* 渲染服务连接成功 */ } },
    { name: 'onInternalError', func: function (res) { /* 渲染服务内部错误 */ } },
    { name: 'onConnectError', func: function (res) { /* 渲染服务连接错误 */ } },
    { name: 'onVideoStreamLoaded', func: function () { /* 视频流加载成功 */ } },
    { name: 'onDataChannelConnectedLoading', func: function () { /* 数据通道连接成功 */ } },
    { name: 'onWebRtcDisconnected', func: function () { /* WebRTC连接断开 */ } },
    { name: 'onRTCFailed', func: function (res) { /* WebRTC连接建立失败 */ } },
    { name: 'onUEWarningOrError', func: function (res) { /* 云端UE引擎推流抛出的警告或严重错误 */ } },
    { name: 'onVideoReady', func: function () { /* 视频流首帧可用事件 */ } },
    { name: 'onDeviceRotated', func: function () { /* 终端设备旋转变化反馈 */ } },
    { name: 'onResizedFinished', func: function () { /* 窗口重新设置尺寸完成反馈 */ } },
])
```

- 注销云渲染事件

```javascript
App.Renderer.UnRegisterEvent(['onStopedRenderCloud']);
```

- ∗注册云渲染事件（可重复注册）

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

- ∗注销重复已注册云渲染事件

```javascript
App.Renderer.UnRegisterEvents(['onStopedRenderCloud']);
```

- 注册场景事件

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
        // 实体对象操作后回调；res.result: {added: object[], updated: object[], removed: string[eid]}
      }
    },
    {
      name: 'OnMouseEnterEntity', func: async function (res) {
        // 鼠标滑入实体事件回调；res.result: { object, position: number[], nodeId: string }
      }
    },
    {
      name: 'OnMouseOutEntity', func: async function (res) {
        // 鼠标滑出实体事件回调；res.result: { object, position: number[], nodeId: string }
      }
    },
    {
      name: 'OnEntityClicked', func: async function (res) {
        // 覆盖物/实体被点击事件回调
        // res.result: { object, position, nodeId, triggerType: 'LeftMouseButton'|'RightMouseButton'|'MiddleMouseButton', triggerArea: 'marker' }
      }
    },
    {
      name: 'OnEntityDbClicked', func: async function (res) {
        // 覆盖物/实体被双击点击事件回调; res.result 结构同 OnEntityClicked 
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
        // 覆盖物沿路径移动进度；res.result: { path, move, bound, passedPoint[], passedOriginalPoint[], passedPointIndex }
      }
    },
   {
      name: 'OnMoveAlongPathBlockEvent', func: async function (res) {
        // 路径移动碰撞检测事件；res.result: { move, range, point: number[] }
      }
    },
    {
      name: 'OnMoveAlongPathEndEvent', func: async function (res) {
        // 覆盖物移动结束信息回调；res.result: { path, move, bound, bReverse: boolean }
      }
    },
   {
      name: 'OnRealTimeVideoEvent', func: async function (res) {
        // 实时视频销毁；res.result: { name: 'onDestroy', removed: string[id] }
      }
    },
    {
      name: 'OnCameraMotionStartEvent', func: async function (res) {
        // 相机运动开始信息回调
        // res.result.cameraMotionReason 枚举包含：E_API_FocusToEntities, E_API_FocusToPosition, E_API_CameraStop, E_API_CameraRotate, E_API_PlayCameraRoam 等
      }
    },
    {
      name: 'OnCameraMotionEndEvent', func: async function (res) {
        // 相机运动结束信息回调；res.result: { cameraMotionReason } 同上
      }
    },
    {
      name: 'OnCameraRoamingFrame', func: async function (res) {
        // 相机漫游帧事件；res.result: { cameraRoam, frameIndex, bFinished, location, progressRatio }
      }
    },
    {
      name: 'OnEntityGraphicsReady', func: async function (res) {
        // 实体图形渲染（GPU层侧）真正就绪；res.result: { object, progress }
      }
    },
    {
      name: 'OnVegetationCreating', func: async function (res) {
        // 植被创建中事件；res.result: { object, tip }
      }
    },
    {
      name: 'OnVegetationCreated', func: async function (res) {
        // 植被大面积创建完成事件；res.result: { object, vegetationNum }
      }
    },
    {
      name: 'OnWdpMaterialHit', func: async function (res) {
        // 实体材质网格/面点击穿透事件；res.result: { eid, meshName, materialIndex }
      }
    },
    {
      name: 'PickPointEvent', func: async function (res) {
        // 取点工具取点数据回调
      }
    },
    {
      name: 'OnEntitySelectionChanged', func: async function (res) {
        // 实体框选/多选变化回调；res.result: { objects: object[], selectionType: 'Add'|'Remove'|'Clear' }
      }
    },
    {
      name: 'OnEntityNodeSelectionChanged', func: async function (res) {
        // 模型node选择状态变化回调；res.result: { object, nodeIds: string[], selectionType: 'Add'|'Remove'|'Clear' }
      }
    },
    {
       name: 'OnEntityReady', func: async function (res) {
           // 实体（包括 3DTilesEntity 等）加载完成; res.result: { object: 对象, progress: 100 }
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

- 获取场景事件

```javascript
await App.Renderer.GetRegisterSceneEvent();
```

- 注销场景事件

```javascript
await App.Renderer.UnRegisterSceneEvent(['OnWdpSceneIsReady']);
```

- ∗场景事件注册（可重复注册）

```javascript
await App.Renderer.RegisterSceneEvents([
    {
        name: 'OnEntityClicked', func: async function (res) {
            console.log(res)
        }
    }
])
```

- ∗获取已注册重复注册事件

```javascript
const res = await App.Renderer.GetRegisterSceneEvents();
console.log(res);
```

- ∗注销已注册重复注册事件

```javascript
await App.Renderer.UnRegisterSceneEvents(['OnEntityClicked'])
```

- 注册监听错误事件

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

- 注销错误事件

```javascript
await App.Renderer.UnRegisterErrorEvent(['OnValidateError']);
```

- 关闭云渲染

```javascript
App.Renderer.Stop()
```

- 设置默认键盘

```javascript
App.System.SetDefaultKeyboard(boolean); 
```

- 设置默认浏览器功能键盘

```javascript
await App.System.SetDefaultBrowserFunctionKeyboard(boolean);
```

