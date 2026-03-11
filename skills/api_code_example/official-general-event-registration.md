# 官方脚本摘录（新版后台）：通用事件监听

版本基线：WDP API 2.2.1
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

## 条目：通用事件监听（id: 1343）

- 注册云渲染事件

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

