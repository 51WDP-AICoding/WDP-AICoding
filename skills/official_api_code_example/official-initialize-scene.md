# 官方脚本摘录（新版后台）：场景初始

版本基线：WDP API 2.2.1
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

## 条目：初始场景（id: 1344）

- 初始场景

```javascript
// 安装 wdpapi
npm install wdpapi
```

```javascript
// 引入 wdpapi
import WdpApi from "wdpapi";
```

```javascript
// 设置初始化参数
const App = new WdpApi({
  id: 'player', // [必填] 渲染场景容器(DOM id)
  url: 'http://IP:Port/service', // [必填] 云渲染服务地址,通过云平台获取
  order: '8099702a64dbb8ef4a0a2f7b5b1c42b0', // [必填] 云渲染口令, 通过云平台获取
  resolution: [3840, 2160], //[选填] 设置云渲染输出分辨率[宽度，高度]
  debugMode: 'normal', //[选填] none: 无日志输出, normal: 普通级别日志输出，high：高级别日志输出，all：全日志输出
  keyboard: { //[选填] 键盘事件（开关）
    normal: false, //[选填] 键盘事件, 不包含 F1~F12 [默认禁用]
    func: false //[选填] 键盘 F1 ~ F12 按键 [默认禁用]
  },
  prefix: '', // [选填] 二次代理时填写的云平台路径名（/service）
  initLog: false, // [选填]  true = 显示品牌logo日志， false=不显示品牌logo日志
  bCached: false, // [选填]  true = 场景加载完。默认缓存场景中所有对象， false = 场景加载完。不缓存场景中所有对象
});
```

- 参数说明: 
  参数 
  值 
  类型 
  备注 
  id 
   
  string 
  渲染3D场景窗口的Dom节点 
  url 
   
  string 
  云渲染服务地址 
  order 
   
  string 
  渲染口令 
  resolution 
  [100~7680, 100~4320] 
  [Integer] 
  设置云渲染输出分辨率 
  注: chrome浏览器最高支持4K: 4096 * 2160; 使用51Browser可以达到8K支持 7680 * 4320 
  debugMode 
  none, normal, high,all 
  string 
  none: 不打印日志; 
  normal: 普通日志(传输数据结果); 
  high: 高级日志,包括鼠标点击等底层传输日志; 
  all:全部日志 
  keyboard 
  normal 
  boolean 
  normal: true/false 键盘事件 
  func 
  boolean 
  func: true/false 浏览器F1~F12功能键 
  prefix 
   
  设置2次代理，默认为空，设置不代理 
  initLog 
  false/true 
  boolean 
  true = 显示品牌logo日志， false=不显示品牌logo日志 
  bCached 
  false/true 
  boolean 
  true = 场景加载完。默认缓存场景中所有entity， false = 场景加载完。不缓存场景中所有entity

- 参数重置

```javascript
await App.System.SetOption({
    "url": "https://dtp-api.51aes.com",
    "order": "2399702a64dbb8ef4a0a2f7b5b1c41a0",
    "resolution": [3840,2160]
})
```

- 渲染模式与分辨率调整 (全网罗)

```javascript
// 设置固定渲染模式
await App.Renderer.SetRendererMode('fixed', [3840, 2160]);  // 可以是 'fixed' 或 'full'

// 设置或者调整具体的分辨率
await App.Renderer.SetResolution(1920, 1080);

// 以倍数形式缩放当前分辨率 (如 1.5 倍)
await App.Renderer.SetResolutionMultiple(1.5);
```

- 参数说明： 
  参数 
  值 
  类型 
  备注 
  type 
  full, fixed 
  string 
  渲染模式; full: 自动适应容器尺寸; fixed: 固定分辨率 
  resolution 
  [100~7680, 100~4320] 
  Integer 
  渲染分辨率; fixed时有效 
  注: chrome浏览器最高支持4K: 4096 * 2160; 使用51Browser可以达到8K支持 7680 * 4320

- 设置接口请求超时时长

- 用于大数据api接口调用

```javascript
await App.System.SetTimeoutTime(30000); //30s; 默认: 10s
```

- 启动场景

```javascript
// Renderer.Start() 出参：{ success: boolean, message: string }
App.Renderer.Start().then((res: any) => {
    if (res.success) {

        // ── 视频流事件（RegisterEvent）──────────────────────────────
        App.Renderer.RegisterEvent([
            {
                name: 'onVideoReady', func: async function (res: any) {
                    // 视频流链接成功
                }
            },
            {
                name: 'onStopedRenderCloud', func: async function (res: any) {
                    // 渲染服务中断
                }
            },
            {
                name: 'onVideoStart', func: async function (res: any) {
                    // 视频流开始播放
                }
            },
            {
                name: 'onVideoStop', func: async function (res: any) {
                    // 视频流停止
                }
            },
            {
                name: 'onVideoError', func: async function (res: any) {
                    // 视频流错误
                }
            }
        ]);

        // ── 错误事件（RegisterErrorEvent）──────────────────────────
        App.Renderer.RegisterErrorEvent([
            {
                name: 'OnValidateError', func: async function (res: any) {
                    // 鉴权失败事件回调
                    // res.result: { code: number, message: string }
                }
            }
        ]);

        // ── 场景事件（RegisterSceneEvent）──────────────────────────
        App.Renderer.RegisterSceneEvent([
            {
                name: 'OnWdpSceneIsReady', func: async function (res: any) {
                    // 场景加载进度回调
                    // res.result: { progress: number }  // progress === 100 时加载完成
                    if (res.result.progress === 100) {
                        // 场景加载完成
                    }
                }
            },
            {
                name: 'OnEntityClicked', func: async function (res: any) {
                    // Entity 被点击事件回调
                    // res.result: { eid: string, oType: string, object: EntityObject, screenPos: [x,y] }
                }
            },
            {
                name: 'OnMouseEnterEntity', func: async function (res: any) {
                    // 鼠标滑入实体事件回调
                    // res.result: { eid: string, oType: string, object: EntityObject }
                }
            },
            {
                name: 'OnMouseOutEntity', func: async function (res: any) {
                    // 鼠标滑出实体事件回调
                    // res.result: { eid: string, oType: string, object: EntityObject }
                }
            },
            {
                name: 'OnWebJSEvent', func: async function (res: any) {
                    // 接收 Window 内嵌页面发送的数据
                    // res.result: { data: any }
                }
            },
            {
                name: 'MeasureResult', func: async function (res: any) {
                    // 测量工具数据回调
                    // res.result: { type: string, value: number, unit: string }
                }
            },
            {
                name: 'OnMoveAlongPathEndEvent', func: async function (res: any) {
                    // 覆盖物移动结束信息回调
                    // res.result: { eid: string }
                }
            },
            {
                name: 'OnCameraMotionStartEvent', func: async function (res: any) {
                    // 相机运动开始信息回调
                }
            },
            {
                name: 'OnCameraMotionEndEvent', func: async function (res: any) {
                    // 相机运动结束信息回调
                }
            },
            {
                name: 'PickPointEvent', func: async function (res: any) {
                    // 取点工具取点数据回调
                    // res.result: { location: [lng,lat,z], worldPos: [x,y,z] }
                }
            },
            {
                name: 'OnEntitySelectionChanged', func: async function (res: any) {
                    // 实体被选取数据回调
                    // res.result: { eids: string[], objects: EntityObject[] }
                }
            },
            {
                name: 'OnEntityReady', func: async function (res: any) {
                    // 3DTilesEntity / WMSEntity / WMTSEntity 加载完成
                    // res.result: { object: EntityObject, progress: 100 }
                }
            },
            {
                name: 'OnRoamFinished', func: async function (res: any) {
                    // 相机漫游结束回调
                    // res.result: { eid: string }
                }
            },
            {
                name: 'OnPickPolylineEvent', func: async function (res: any) {
                    // 取线工具取线数据回调
                    // res.result: { polyline: [[lng,lat,z], ...] }
                }
            }
        ]);
    }
}).catch(err => {
    console.log(err)
});
```

- 成员函数

- Add(object) 
  		用途: 向场景中, 添加实体; 示例如下

```javascript
const path = new App.Path({ "polyline":  { "coordinates": [121.50007292,31.22579403,30]}, "pathStyle":  style })
const res = await App.Scene.Add(path);
console.log(res);
// 出参: { success: boolean, message: string, result: { object: EntityObject } }
```

- Covering.Clear() 
  		用途: 清除场景中的所有覆盖物实体

- 场景回到初始化状态

```javascript
await App.Scene.ResetSceneState();
// 出参: { success: boolean, message: string }
```

---

## 条目：Renderer 控制方法（id: 1344-ext）

- 停止/重启渲染

```javascript
// 停止渲染
const res = await App.Renderer.Stop();
// 出参: { success: boolean, message: string }

// 重启渲染
const res2 = await App.Renderer.Restart();
// 出参: { success: boolean, message: string }
```

- 通过 TaskId 启动渲染

```javascript
// 适用于已有任务 ID 的场景
const res = await App.Renderer.StartByTaskId(io, taskId);
// 出参: { success: boolean, message: string }
```

- 设置分辨率倍率

```javascript
// 设置渲染分辨率倍率（相对于容器尺寸）
const res = await App.Renderer.SetResolutionMultiple(1.5); // 1.5倍
// 出参: { success: boolean, message: string }
```

- 设置固定分辨率

```javascript
const res = await App.Renderer.SetResolution(1920, 1080);
// 出参: { success: boolean, message: string }
```

- 设置帧率上限

```javascript
const res = await App.Renderer.SetFrameRateLimit(60); // 单位: fps
// 出参: { success: boolean, message: string }
```

- 设置码率

```javascript
const res = await App.Renderer.SetBitrate(8); // 单位: Mbps
// 出参: { success: boolean, message: string }
```

- 获取渲染实时状态

```javascript
const res = await App.Renderer.GetStats();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      bitrate: 8.2,                // 当前码率（Mbps）
      avgBitrate: 8.0,             // 平均码率
      framerate: 60,               // 实时帧率
      avgframerate: 59.5,          // 平均帧率
      currentRoundTripTime: 0.045, // 当前网络往返延迟（秒）
      packetsLost: 0,              // 丢失的数据包数量
      bytesReceived: 10485760,     // 接收的总字节数
      video_codec: 'H264'          // 视频编解码器类型
      // ... (其他如 bytesReceivedStart, framesDecoded 等)
    }
  }
*/
```

- 截图（获取当前画面 base64 图片）

```javascript
const res = await App.Renderer.GetSnapshot([1920, 1080], 0.9);
// 参数1: 截图分辨率 [宽, 高]（可选，默认当前分辨率）
// 参数2: 图片质量 0~1（可选，默认 0.9）
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      base64: 'data:image/jpeg;base64,/9j/4AAQ...'  // base64 图片字符串
    }
  }
*/
```

- 注销事件

```javascript
// 注销视频流事件
App.Renderer.UnRegisterEvent(['onVideoReady', 'onStopedRenderCloud']);

// 注销错误事件
App.Renderer.UnRegisterErrorEvent(['OnValidateError']);

// 注销场景事件
App.Renderer.UnRegisterSceneEvent(['OnEntityClicked', 'OnWdpSceneIsReady']);
```

---

## 条目：系统信息与版本（id: 1344-sys）

- 获取系统信息

```javascript
const res = await App.System.GetInfomation();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      platform: 'web',
      browserVersion: 'Chrome/120.0',
      sdkVersion: '2.2.1',
      rendererVersion: '5.x.x'
    }
  }
*/
```

- 获取 API 版本

```javascript
const res = await App.Setting.GetApiVersion();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      version: '2.2.1'
    }
  }
*/
```

