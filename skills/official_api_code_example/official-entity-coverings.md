# Official excerpt sync: 实体覆盖物

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 实体覆盖物, categoryId: 572)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 实时视频 (id: 1373)

- 实时视频 RealTimeVideo  
`App.RealTimeVideo` 在场景中指定位置叠加一个实时视频窗口，支持 RTSP 等视频流协议。可配置窗口分辨率、偏移、播放状态（play/pause/stop）、重叠层级、背景图与内边距、标签文字及按钮图标，适合监控摄像头可视化、直播画面接入等场景。

```javascript
const realTimeVideo = new App.RealTimeVideo({
  "location": [121.50007292, 31.22579403, 30],
  "realTimeVideoStyle": {
    "url": "rtsp://admin:admin123456@121.63.247.105:20037/h264/ch1/sub/av_stream",
    "resolution": [400, 300], //窗口大小(单位:像素)
    "offset": [0, 0], //x>0,y>0 向右、上偏移(x,y 单位:像素)
    "state": "pause",  //play:播放; pause:暂停;
    "overlapOrder": 1, //重叠层级; 数值越大越浮在最上层;范围[1~10]
    "bokeh": 0.5, //边缘虚化(单位:比例); 范围[0,1]
    "conrnerShift": [
      [40, -40], [0, -40], [10, 0], [0, 0]
    ] //角点偏移(单位:像素); 点位固定顺序 [左上,右上,左下,右下]; 每个角点的原始位置为[0,0]; X>0 向右,Y>0 向上
    "bgUrl":"https://wdp5-api-debug.51aes.com/static/newLabel.png",
    "bgPadding":[0, 0, 0, 0],
    "bgOverlap":"hide",
    "labelContent":['xxxx', '000000ff', '24'] ,
    "labelOffset":[0, 0] //标签偏移（像素）
    "labelSize":[w, h]//标签尺寸（像素）
    "labelContentJustification":'Left'//标签文字对齐方式，取值范围：'Left'/'Center'/'Right'
    "labelContentAutoWrap":true//boolean，标签文字是否自动换行
    "btnNormalUrl":"daas://example/normal.png"//按钮正常状态图片 URL（daas:// 协议）
    "btnActivateUrl":"daas://example/activate.png"//按钮激活状态图片 URL（daas:// 协议）
    "btnOffset":[x, y]//按钮偏移（像素）
    "btnSize":[w, h]//按钮尺寸（像素）
  },
  "bVisible": true,//是否可见
  "entityName": "myName",//实体名称
  "customId": "myId1",//自定义ID
  "customData": {
    "data": "myCustomData"//自定义数据
  }
})

const res = await App.Scene.Add(realTimeVideo, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```
- 出参描述
| 字段 | 类型 | 说明 |
|------|------|------|
| `result.object` | `object` | 新建实体的唯一标识 |


- 成员函数

```javascript
// 示例
  const obj = new App.RealTimeVideo({...});
  obj.Update(json);//更新实体属性，参数结构与创建入参相同。
  obj.SetVisible(boolean);
  obj.SetResolution([w, h]);
  obj.Delete();
  obj.GetData();//获取实体当前所有属性数据。
  obj.GetLocation();//获取实时视频的坐标位置，[121.47025042, 31.23065615, 90]
  obj.SetLocation([121.47025042, 31.23065615, 90]);//设置实时视频的坐标位置。
```

```javascript
const data = {
  "realTimeVideoStyle": {
    "state": "pause"  //play:播放; pause:暂停;
  }
}
```

## Topic: 视频 web行为 (id: 1374)

- 添加视频 web  
`App.Component.VideoUI` 是挂载到场景坐标的 DOM 视频播放组件，支持 mp4、rtsp 等多种视频格式，提供自动播放、循环播放、静音等播放控制，以及像素级窗口尺寸和偏移控制。与覆盖物不同，VideoUI 通过工厂类统一管理，提供完整的 CRUD 接口及 DOM 对象查询能力。

```javascript
/*
基于浏览器开发的video，相对于3D渲染POI，只能播放浏览器支持的MP4格式，且不支持daas
*/

// 1. 创建单个 VideoUI 组件（mp4 视频，自动播放循环静音）
//方法一：
const videoUI = new App.VideoUI({
  "videoUIContent": {
    "src": "mp4 video url",
    "autoplay": true,
    "controls": true,
    "loop": true,
    "muted": false,
    "preload": "auto"
  },
  "windowStyle": {
    "width": "400px",
    "height": "300px",
    "position": "absolute",
    "left": "500px",
    "top": "200px",
    "zIndex": "1000",
    "background": "none"
  }
});
const res = App.Component.VideoUI.Add([videoUI]);
console.log(res);

//方法二：
const { result: entity }  = await App.Component.VideoUI.Create({
  location: [121.4737, 31.2304, 50],       // [经度, 纬度, 高度]
  videoUIStyle: {
    url: 'https://example.com/camera/cam-entrance.mp4', // 视频 URL（支持 mp4/rtsp 等）
    resolution: [480, 270],                // 视频窗口像素尺寸 [宽, 高]
    offset: [0, -135],                     // 屏幕偏移：向上偏移 135 像素
    autoplay: true,                        // 自动播放
    loop: true,                            // 循环播放
    muted: true,                           // 静音（自动播放时通常需要静音）
    overlapOrder: 5,                       // 重叠层级
  },
  bVisible: true,
  entityName: '监控摄像头-入口',
  customId: 'video-ui-entrance',
})


// 2. 切换视频源（例如切换到 rtsp 流）
const { result: updated } = await App.Component.VideoUI.Update({
  eid: entity.eid,
  videoUIStyle: {
    url: 'rtsp://192.168.1.100:554/stream/cam001',
    autoplay: true,
    loop: false,
    muted: false,
  },
})
console.log('切换视频源结果:', updated)

// 3. 查询 DOM 对象并控制播放
const videoEl = App.Component.VideoUI.Get(entity.compId)
videoEl.pause()

// 4. 删除组件
const { result: deleted } = await App.Component.VideoUI.Delete(entity.eid)
console.log('删除结果:', deleted)

```

- 成员函数

```javascript
App.Component.VideoUI.Add([videoUI]);
// 和add创建一样，两种创建video的方式
// Add方式是添加的数组对象，Create添加的是json数据
App.Component.VideoUI.Create(jsonData);
// 批量创建video
App.Component.VideoUI.Creates(jsonData);
// 更新video
object.Update(jsonData);
// 删除video
object.Delete();
//查询 DOM 对象
//传入 `compId`：返回对应 DOM 视频对象，可直接调用 HTMLVideoElement 原生方法
// 不传 `compId`：返回所有 DOM 视频对象数组
// 获取指定 compId 的 DOM 视频对象并控制播放
const videoEl = App.Component.VideoUI.Get('comp-001')
videoEl.pause()    // 暂停
videoEl.play()     // 播放
// 获取所有 DOM 视频对象
const allVideos = App.Component.VideoUI.Get()
allVideos.forEach((v) => v.muted = true)   // 全部静音
//为 VideoUI 注册交互事件，无返回值。
App.Component.VideoUI.AddEvents([{ name, func }, ...]);
//示例
App.Component.VideoUI.AddEvents([
  {
    name: 'onClick',
    func: (ev) => {
      console.log('VideoUI 被点击', ev)
    }
  }
]);

```

## Topic: window (id: 1375)

- Window  
在场景中指定位置叠加一个实时视频窗口，支持 RTSP 等视频流协议。可配置窗口分辨率、偏移、播放状态（play/pause/stop）、重叠层级、背景图与内边距、标签文字及按钮图标，适合监控摄像头可视化、直播画面接入等场景。

```javascript
const window = new App.Window({
  "location": [121.50007292, 31.22579403, 30],
  "windowStyle": {
    "url": "http://wdpapi.51aes.com/doc-static/images/static/echarts.html",//窗口内容的网页 URL（以 iframe 形式嵌入）
    resolution: [400, 300],// 窗口像素尺寸（宽、高）
    "size": [500, 350], //window大小(单位:像素)
    "offset": [0, 0],//屏幕像素偏移量
    overlapOrder: 5,//重叠层级（1~10）
    bgUrl: 'https://example.com/bg.png',//背景图片 URL 
    bgPadding: [10, 10, 10, 10]//背景图内边距（像素）,[top, right, bottom, left]
  },
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "bVisible": true, //是否可见
  "visible2D": {
    "camera": {
      "hideDistance": 2000,  //定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
      "hideType": "default", //实体超出显示距离(none:不显示; default:圆圈显示)
      "scaleMode": "2D" //是否受相机的透视影响(2D:不影响; 3D:影响)
    },
    "interaction": { //被"交互"影响的可见性(POI有效)
      "clickTop": true,
      "hoverTop": true  //当发生滑过时，需要显示在最上层
    },
    "entity": {
      "overlapOrder": 1 //重叠层级; 数值越大越浮在最上层；范围[1~10]
    }
  }
})

const res = await App.Scene.Add(window, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Window({...});
  obj.Update(json);//更新实体属性，参数结构与创建入参相同。
  obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  obj.Delete();
  obj.GetLocation();//获取窗口锚点的经纬度坐标及高度。
  obj.SetLocation();//设置窗口锚点的经纬度坐标及高度
 
```

- window与3D世界通信

```javascript
w51_event('EventKey', {...});
```

```javascript
const jsondata = {
        "squadName": "Super hero WdpApi",
        "active": true,
        "definitions": {
            "state": { "enum": ["CA", "NY", "... etc ..."] }
        },
        "properties": {
            "first_name": { "type": "string" },
            "shipping_address": { "$ref": "/schemas/address" },
        }
    }

    const button= document.getElementById("button");
    button.addEventListener('click', (ev) => {
        w51_event('EventKey', jsondata);
    })
```

- 接收widnow发送的事件及数据

```javascript
App.Renderer.RegisterSceneEvent([
    {
        name: 'OnWebJSEvent', func: function (data) {
            console.log(data)；
            // { "event_name": "OnWebJSEvent", "result": { "name": "自定义name", "args": "自定义数据" }}
        }
    }
])
```

## Topic: window web行为 (id: 1376)

- 添加Window web  
`App.Component.WindowUI` 是挂载到场景坐标的 DOM 窗口组件，以 iframe 形式嵌入指定 URL 的网页内容。与覆盖物（Covering）不同，WindowUI 通过工厂类统一管理，提供 Add / Create / Creates / Update / Get / Delete / Deletes 等 CRUD 接口及事件注册能力。

```javascript
/*
基于浏览器渲染的窗口，相对于UE渲染窗口
优点：像素清晰
缺点：位置固定，不能跟随镜头动
基于浏览器渲染窗口，添加多少个Window点取决的web页面的DOM元素，不在依赖UE渲染
*/
// 1. 创建单个 WindowUI 组件
//方法一：
const windowUI = new App.WindowUI({
  "windowUIContent": {
    "url": "http://wdpapi.51aes.com/doc-static/images/static/echarts.html"
  },
  "windowStyle": {
    "width": "500px",
    "height": "350px",
    "position": "absolute",
    "left": "300px",
    "top": "200px",
    "zIndex": "1000",
    "background": "#ffffff",
    "border": "solid 1px #cccccc",
    "borderRadius": "8px",
    "overflowX": "hidden",
    "overflowY": "hidden"
  }
});
const res = App.Component.WindowUI.Add([windowUI]);
//方法二：
const { result: entity } = await App.Component.WindowUI.Create({
  location: [121.4737, 31.2304, 50],
  windowUIStyle: {
    url: 'https://example.com/panel/info',
    resolution: [400, 300],
    offset: [0, -150],
    overlapOrder: 5,
  },
  bVisible: true,
  entityName: '信息窗口',
  customId: 'window-ui-001',
})
console.log('WindowUI 创建完成，EID:', entity.eid)

// 2. 更新组件
const { result: updated } = await App.Component.WindowUI.Update({
  eid: entity.eid,
  windowUIStyle: {
    url: 'https://example.com/panel/info?v=2',
    resolution: [500, 350],
  },
  bVisible: true,
})
console.log('更新结果:', updated)

// 3. 删除组件
const { result: deleted } = await App.Component.WindowUI.Delete(entity.eid)
console.log('删除结果:', deleted)
```

- 成员函数

```javascript
App.Component.WindowUI.Add([object]);
// 和add创建一样，两种创建window的方式
// Add方式是添加的数组对象，Create添加的是json数据
App.Component.WindowUI.Create(jsonData);
// 批量创建Window
App.Component.WindowUI.Creates(jsonData);
// 更新Window
object.Update(jsonData)
// 删除Window
object.Delete()
// 获取Window实体数据或所有 DOM 对象
// 传入 `eid`：返回对应单个实体
// 不传 `eid`：返回所有实体数组
App.Component.WindowUI.Get();
```

## Topic: POI (id: 1377)

- POI  
`App.Poi` 用于在场景中添加带有图标和标签的 POI 点位覆盖物。支持正常/激活两套图标、标签背景图与文本自定义、文本滚动与对齐、相机距离隐藏、重叠层级及鼠标交互事件。

```javascript
const poi = new App.Poi({
  "location": [121.50007292, 31.22579403, 30],
  "poiStyle": {
    "markerNormalUrl": "https://wdp5-api-debug.51aes.com/static/newMarker.png",//必填，正常状态,图片url地址,支持2种形式：1，在线地址:如"http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png" 2，本地地址:如"file:///D:/xxx/markerNormal.png"; D: 在线席位所在盘符
    "markerActivateUrl": "https://wdp5-api-debug.51aes.com/static/newMarker_active.png",//必填，激活状态,由鼠标划过或点击触发
    "markerSize": [100,159],//必填，图标尺寸（像素）
    "labelVisible":true,//是否显示label
    "labelBgImageUrl": "https://wdp5-api-debug.51aes.com/static/newLabel.png",//非必填，图片url地址
    "labelBgSize": [177,66],//label图片大小(宽, 高 单位:像素)
    "labelBgOffset": [10,168], //// label可以向上下左右偏移；当[0,0]时，label切图的左上角对齐location (x,y 单位:像素)
    "labelContent": [" 文本内容A","ffffff","18"],//	富文本; 格式: ["text", "color" ,"size"] color: HEXA格式；size:(字号*分辨率高/分辨率宽)得出值再取整；
    "labelContentOffset": [45, 23], // labeContent可以向上下左右偏移; 当[0,0]时，labelContent的左上角对齐label的左上角 (x,y 单位:像素)
    "labelTop": false, //label是否置于marker顶层
    "scrollSpeed": 5,// 文本滚动速度(0:不滚动)
    "textBoxWidth": 200, // 文本框宽度(默认100)
    "labelContentOffset":	[5,5],//label内容相对于label左上角偏移(x,y 单位:像素)；注: x为正向右, y为正向下
    "labelTop":true//label是否置于marker顶层
    "labelContentJustification": "Left", //文本内容对齐方式: Left, Center, Right
    "labelContentAutoWrap": true, //label内容是否自动换行
    "scrollPolicy": "default"  //文本长度超过文本框时滚动; always: 总是滚动
  },
  "entityName": "myName",
  "customId": "myId1", // 自定义ID
  "customData": {
    "data": "myCustomData"  //自定义数据
  },
  "bVisible": true,//是否可见
  "visible2D": {
    "camera": {
      "hideDistance": 2000,  //定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
      "hideType": "default", //实体超出显示距离(none:不显示; default:圆圈显示)
      "scaleMode": "2D" ,//是否受相机的透视影响(2D:不影响; 3D:影响)；透视包括近大远小、overlapOrder生效
      "url": "https://wdp5-api-debug.51aes.com/static/newLabel.png",//hideType设置成url，当超过设定的hideDistance，缩略图为url
      "size":[10,10] //	url的大小
    },
    "interaction": { //被"交互"影响的可见性(POI有效)
      "clickTop": true, //当发生点击(优先级高于滑过)时,需要显示在最上层
      "hoverTop": true  //当发生滑过时，需要显示在最上层
    },
    "entity": {
      "overlapOrder": 1 // 跨2D覆盖物类型的层级设置，当scaleMode为2D时生效; 数值越大越在最上层；范围[1~10]
    }
  }
})

const res = await App.Scene.Add(poi, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)；
  }
});
/*
若想使用location中的z值，即如下操作；同理所有的覆盖物都是这样操作
const res = await App.Scene.Add(poi);
*/
```

- 成员函数

```javascript
// 示例
  const obj = new App.Poi({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  obj.GetOType();//获取实体的类型标识
  obj.GetLocation();//获取 POI 的位置坐标
  obj.SetLocation([121.5, 31.2, 10]);//设置 POI 的位置坐标
  obk.GetLocked();//获取 POI 的锁定状态
  obj.SetLocked(true);//设置 POI 的锁定状态
  obj.GetPivotOffset();//获取 POI 的轴心偏移
  obj.SetPivotOffset([0, 0, 5]);//设置 POI 的轴心偏移
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```  
- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| eid | string | 实体唯一标识 | 是 |
| oType | string | 实体类型标识 | 是 |
| location | [number, number, number] | 实体位置（经度、纬度、高度） | 否 |
| bVisible | boolean | 实体可见性 | 否 |
| bLocked | boolean | 实体是否锁定 | 否 |
| pivotOffset | [number, number, number] | 轴心偏移 | 否 |
| markerVisible | boolean | 是否显示图标 | 否 |
| markerNormalUrl | string | 正常状态图标 URL | 否 |
| markerActivateUrl | string | 激活状态图标 URL | 否 |
| markerSize | [number, number] | 图标尺寸（像素） | 否 |
| labelVisible | boolean | 是否显示标签 | 否 |
| labelBgImageUrl | string | 标签背景图 URL | 否 |
| labelBgSize | [number, number] | 标签背景尺寸 | 否 |
| labelBgOffset | [number, number] | 标签左上角相对 marker 中心点的偏移 | 否 |
| labelContent | [string, string, number] | 标签文本、颜色、字号 | 否 |
| labelContentOffset | [number, number] | 标签文本相对偏移 | 否 |
| labelTop | boolean | 标签是否置于图标顶层 | 否 |
| scrollSpeed | number | 文本滚动速度（0 = 不滚动） | 否 |
| textBoxWidth | number | 文本框宽度（默认 100） | 否 |
| labelContentJustification | string | 文本对齐方式 | 否 |
| labelContentAutoWrap | boolean | 文本是否自动换行 | 否 |
| scrollPolicy | string | 滚动策略 | 否 |
| overlapOrder | number | 重叠层级（1~10） | 否 |
| hideDistance | number | 隐藏距离（米） | 否 |
| hideType | string | 超距隐藏类型 | 否 |
| scaleMode | string | 是否受相机透视影响 | 否 |
| clickTop | boolean | 点击时是否置顶 | 否 |
| hoverTop | boolean | 悬停时是否置顶 | 否 |
| entityName | string | 实体名称 | 否 |
| customId | string | 自定义 ID | 否 |
| customData | object | 自定义数据 | 否 |
| parentEid | string | 父实体 EID | 否 |


- [demo]POI添加Window

```javascript
await App.Renderer.RegisterSceneEvent([
  {
    name: 'OnWebJSEvent',
    func: async (res) => {
      // 接收window内嵌页面发送的数据
      // { "event_name": "OnWebJSEvent", "result": { "name": "xxx", "args": {} }}
      console.log(res);
    }
  }
]);
const jsonData = [
  {
    "type": "Poi",
    "location": [-294.15355414,-346.31192099,77],
    "customId": "myPoi-id-1",
    "entityName": "myPoi",
    "customData": {"data": "myCustomData"},
    "poiStyle": {
      "markerNormalUrl": "http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png",
      "markerActivateUrl": "http://wdpapi.51aes.com/doc-static/images/static/markerActive.png",
      "markerSize": [100,228],
      "labelVisible": false
    }
  },
  {
    "type": "Window",
    "location": [-294.15355414,-346.31192099,77],
    "customId": "myPoi-id-1_window",
    "entityName": "myPoi_window",
    "customData": {"data": "myCustomData"},
    "windowStyle": {
      "url": "https://wdpapi.51aes.com/doc-static/sample1.html",
      "size": [500, 320],
      "offset": [52, 176]
    }
  }
];
const res = await App.Scene.Creates(jsonData, { // 坐标类型
  "calculateCoordZ": {  // [可选] 最高优先级
    "coordZRef":"surface",// Surface:表面;Ground:地面;Altitude:海拔
    "coordZOffset": 200 // 高度(单位:米)
  }
});
console.log(res);
if (res.success) {
  const result = await App.CameraControl.Focus({
    "rotation": {
      "pitch": -40, //俯仰角(-90~0)
      "yaw": -90 //偏航角(-180~180; 0:东; 90:南; -90:北)
    },
    "distanceFactor": 0.15, //聚焦倍率[0.1 ~ 1]
    "flyTime": 1, //过渡时长(单位:秒)
    "entity": res.result.objects //覆盖物对象
  });
  console.log(result);
}
```

## Topic: POI web行为 (id: 1379)

- 添加POI web  
`App.Component.PoiUI` 是绑定到地理坐标的 DOM 点位组件，通过直接注入 HTML 字符串渲染点位内容（无 iframe），支持隐藏距离、透视缩放模式（2D/3D）及重叠层级控制。与覆盖物 `App.Poi` 不同，PoiUI 通过工厂类统一管理，提供完整的 CRUD 接口。

```javascript
/*
基于浏览器渲染的POI，相对于UE渲染POI
优点：像素清晰
确定：位置固定，不能跟随镜头动
基于浏览器渲染的poi，添加多少个poi点取决的web页面的DOM元素，不在依赖UE渲染
*/
// 1. 创建单个 PoiUI 组件，使用自定义 HTML 内容
//方法一：
const poiUI = new App.PoiUI({
  "poiUIContent": {
    "normalImage": "http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png",
    "activeImage": "http://wdpapi.51aes.com/doc-static/images/static/markerActive.png",
    "content": ""
  },
  "windowStyle": {
    "width": "79px",
    "height": "180px",
    "position": "absolute",
    "left": "500px",
    "top": "200px",
    "zIndex": "1000",
    "background": "none"
  }
});
const res = App.Component.PoiUI.Add([poiUI]);
//方法二：
const { result: entity } = await App.Component.PoiUI.Create({
  location: [121.4737, 31.2304, 0],//经纬度坐标及高度
  poiUIStyle: {
    domContent: `
      <div style="background:#1a2d4e;color:#fff;padding:8px 12px;border-radius:4px;font-size:13px;">
        <div style="font-weight:bold;">设备 A001</div>
        <div>状态：<span style="color:#00ff88;">正常</span></div>
        <div>温度：36.5°C</div>
      </div>
    `,// 点位内容 HTML 字符串
    offset: [0, -20],//屏幕偏移量（像素）
    overlapOrder: 5,//重叠层级
    hideDistance: 2000,//相机距离超过此值时隐藏（米）
    scaleMode: '2D',//是否受相机透视影响,取值范围：'2D'/'3D'
  },
  bVisible: true,
  entityName: '设备点位-A001',
  customId: 'poi-ui-001',
})
console.log('PoiUI 创建完成，EID:', entity.eid)

// 2. 更新 HTML 内容（例如刷新状态数据）
const { result: updated } = await App.Component.PoiUI.Update({
  eid: entity.eid,
  poiUIStyle: {
    domContent: `
      <div style="background:#1a2d4e;color:#fff;padding:8px 12px;border-radius:4px;font-size:13px;">
        <div style="font-weight:bold;">设备 A001</div>
        <div>状态：<span style="color:#ff4444;">告警</span></div>
        <div>温度：85.2°C</div>
      </div>
    `,
  },
})
console.log('更新结果:', updated)

// 3. 删除组件
const { result: deleted } = await App.Component.PoiUI.Delete(entity.eid)
console.log('删除结果:', deleted)
```

- 成员函数

```javascript
App.Component.PoiUI.Add([object]);
// 和add创建一样，两种创建window的方式
// Add方式是添加的数组对象，Create添加的是json数据
App.Component.PoiUI.Create(jsonData);
// 批量创建
App.Component.PoiUI.Creates(jsonData);
// 更新
object.Update(jsonData);
// 删除
object.Delete(eid);//删除指定实体
object.Deletes(eids[]);//批量删除实体
// 获取实体数据
// 传入 `eid`：返回对应单个实体
// 不传 `eid`：返回所有实体数组
object.Get()
// 事件注册
object.AddEvents([{ name, func }, ...])//为 PoiUI 注册交互事件，无返回值
```

## Topic: 场景特效 (id: 1380)

- 场景特效 Particle  
`App.Particle` 在场景中添加场景特效实体。通过 `particleType` 字段指定特效类型标识（从平台资源库获取，例如 `'vehicle_taxi'`），支持位置、旋转、缩放及可见性控制，并可绑定交互事件。  

```javascript
const particle = new App.Particle({
  "location": [121.50007292, 31.22579403, 30],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [30, 30, 30],//正整数
  "particleType": "vehicle_taxi",//取值范围：	flame, 3dmark_build_loop, 3dmark_build, 3dmark_camera_loop,3dmark_camera, 3dmark_sign, 3dmark_warning, title_only,vehicle_car, vehicle_car_black, vehicle_car_white, vehicle_taxi,shield, fire, arrow, alarm, circle, pyramid, marker_cube,marker_pyramid, marker_site, marker_cone, tool_wrench,weather_tornado, circle_glass, circle_compass, circle_outside,circle_inside, circle_scan, circle_diffuse, circle_area, circle_area2, circle_flash
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(particle, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Particle({...});
  obj.Update(json);
  obj.SetRotator(json);
  obj.SetScale3d(json);
  obj.SetVisible(boolean);
  obj.SetParticleType('smoke_chimney');//切换特效类型
  obj.GetLocked();//获取场景特效的锁定状态
  obj.SetLocked();//设置场景特效的锁定状态
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);//交互事件
  })
```


## Topic: 粒子特效 (id: 1381)

- 粒子特效 Effects

```javascript
const entityObj = new App.Effects({
  "location": [121.51132810, 31.23485399, 52],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 0, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [1, 1, 1],
  "bVisible": true, //是否可见(true/false)
  "speed": 1, //动画速率
  "seedId": "ac2a41915c7c7097be7dc64602e0e4fb", //模型编号，seedId来自平台粒子特效
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(entityObj, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Effects({...});
  obj.Update(json);
  obj.SetRotator(json);
  obj.SetScale3d(json);
  obj.SetVisible(boolean);
  obj.entityName; //方式一：属性访问
  await obj.GetEntityName(); //方式二：异步方法
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 灯光特效 (id: 1382)

- 灯光特效Light  
`App.Light` 在场景中添加聚光灯实体，支持灯光强度（0~100）、HEXA 颜色、张角（0~50）、衰减长度、阴影开关以及烟雾效果（haze）配置。灯光不支持交互事件。

```javascript
const entityObj = new App.Light({
  "location": [121.47731869, 31.22435528, 61],//必填
  "bVisible": true, //是否可见(true/false)
  "scale3d": [30, 30, 30],//设置缩放值，只能按照等比例缩放，例如[10,10,10]，如果使用不等比放缩会导致haze（烟雾）导致超出灯光
  "lightStyle": {
    "intensity": 40, //必填，灯光强度(0~100)
    "color": "968afeff", //必填，灯光颜色(HEX颜色值)
    "angle": 50, //必填，灯光张角(0~50)
    "attenuation": 200, //必填，任意整数，灯光衰减长度(单位:米)
    "shadows": true, //必填，是否开启阴影(true/false)
    "haze": true, //必填，是否开启烟雾(true/false)
    "haze_Intensity": 90 //必填，烟雾强度(0~100)
  }
});

const res = await App.Scene.Add(entityObj, {
  "calculateCoordZ": {  //坐标类型及坐标高度; [可选] 最高优先级
    "coordZRef": "surface",//surface:表面;ground:地面;altitude:海拔
    "coordZOffset": 100 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Light({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  obj.Delete();
```
- 成员属性

| 属性 | 类型 | 说明 | 是否只读 |
|------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[lng, lat, alt]` | 经纬度及高度 | 否 |
| `rotator` | `{ pitch, yaw, roll }` | 旋转角度（-180~180） | 否 |
| `scale3d` | `[x, y, z]` | 缩放比例 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `intensity` | `number` | 灯光强度（0~100） | 否 |
| `color` | `string` | 灯光颜色（HEXA） | 否 |
| `angle` | `number` | 灯光张角（0~50度） | 否 |
| `attenuation` | `number` | 衰减长度（米） | 否 |
| `shadows` | `boolean` | 是否开启阴影 | 否 |
| `haze` | `boolean` | 是否开启烟雾 | 否 |
| `haze_Intensity` | `number` | 烟雾强度（0~100） | 否 |


## Topic: 3D文字 (id: 1383)

- 3D文字 Text  
`App.Text3D` 用于在 WDPAPI 三维场景中创建和管理 3D 文字覆盖物，支持多种材质类型（平面/反射/金属）、轮廓、纵向排列、字间距、面向相机及形状背景（正方形/圆形/三角形）等样式，适用于场景标注、标题展示等场景。

```javascript
const text3d = new App.Text3D({
  "location": [121.46434372, 31.23499129, 60],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [100, 30, 30],//	特效的大小
  "text3DStyle": {
    "text": "3D文字",
    "color": "ff00ff", //HEX或rgba(0,0,0)
    "type": "plain", //样式(plain; reflection; metal)
    "outline": 0.4, //轮廓(单位:百分比), 取值范围[0~1]
    "portrait": false, //纵向(true/false)
    "space": 0.1,//间距(单位:米)
    "faceToCamera":false,//是否朝向镜头
    "shape":"square",//类型5种：① 默认是空，代表3D文字不发生换行② square: 在方形范围内换行③ circle: 在圆形范围内换行④ triangle: 在三角形范围内换行⑤ auto: 在不规则范围内换行
    "radius":100,//shape为空时，不生效
    "drawDebugBoundary":false,//shape为空时，不生效
  },
   "visible2D": {
    "camera": {
      "hideDistance": 2000,  //定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
    }
  }
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(text3d, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Text3D({...});
  obj.Update(json);
  obj.SetRotator(json);
  obj.SetScale3d(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```
- 成员属性 

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[number, number, number]` | 经纬度坐标及高度 `[lng, lat, alt]` | 否 |
| `rotator` | `{ pitch: number, yaw: number, roll: number }` | 旋转角度（-180~180） | 否 |
| `scale3d` | `[number, number, number]` | 缩放比例 `[x, y, z]` | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `text` | `string` | 文字内容 | 否 |
| `color` | `string` | 颜色（HEX 或 rgba 格式） | 否 |
| `type` | `'plain' \| 'reflection' \| 'metal'` | 材质类型 | 否 |
| `outline` | `number` | 轮廓比例（0~1） | 否 |
| `portrait` | `boolean` | 是否纵向排列 | 否 |
| `space` | `number` | 字间距（米） | 否 |
| `faceToCamera` | `boolean` | 是否始终面向相机 | 否 |
| `shape` | `'square' \| 'circle' \| 'triangle'` | 背景形状 | 否 |
| `radius` | `number` | 背景形状半径 | 否 |


## Topic: 可视域 (id: 1384)

- 可视域 Viewshed  
`App.Viewshed` 在场景中以观测点为中心进行可视域分析，以彩色锥形区域区分可见（绿色）与不可见（遮挡）区域。支持水平视角（0~120°）、可视半径、是否显示轮廓线，以及两种区域颜色的独立设置，适用于安防监控覆盖分析、城市规划视线分析等场景。

```javascript
const viewshed = new App.Viewshed({
  "location": [121.47025042, 31.23065615, 90],//必填，坐标位置
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "viewshedStyle": {
    "fieldOfView": 70, //可视域水平视角范围(0~120)
    "radius": 600, //半径(单位:米)
    "outline": true, //	轮廓勾边
    "hiddenColor": "75fe97ff", //不可见区域颜色(HEXA颜色值)
    "visibleColor": "3cff71ff" //可见区域颜色(HEXA颜色值)
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(viewshed, {
  calculateCoordZ: {
    coordZRef: "ground", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```
- 成员函数

```javascript
// 示例
  const obj = new App.Viewshed({...});
  obj.Update(json);
  obj.SetRotator(json);
  obj.SetScale3d(json);
  obj.SetVisible(boolean);
  obj.GetLocation();//获取观测点坐标
  obj.SetLocation();//设置观测点坐标
  obj.GetData();//获取实体当前所有属性数据
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[number, number, number]` | 观测点经纬度坐标及高度 `[lng, lat, alt]` | 否 |
| `rotator` | `{ pitch: number, yaw: number, roll: number }` | 旋转角度（-180~180） | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `fieldOfView` | `number` | 水平视角范围（0~120 度） | 否 |
| `radius` | `number` | 可视半径（米） | 否 |
| `outline` | `boolean` | 是否显示轮廓线 | 否 |
| `hiddenColor` | `string` | 不可见区域颜色（HEXA 格式） | 否 |
| `visibleColor` | `string` | 可见区域颜色（HEXA 格式） | 否 |


## Topic: 路径 (id: 1385)
- 路径 Path  
`App.Path` 在场景中绘制折线路径，支持 `arrow`（箭头）、`solid`（实线）、`scanline`（扫描线）、`dashed`（虚线）四种样式，可设置颜色、宽度、透明度和动画速度。注意：Path **不支持旋转和缩放**（Transform）操作。

```javascript
const path = new App.Path({
  "polyline": {
    "coordinates": [
      [121.49968476, 31.24861346, 44],
      [121.49956979, 31.25093239, 96],
      [121.47613890, 31.23725069, 39]
    ]
  },//坐标位置,格式[[x,y,z],[x,y,z],....]
  "pathStyle": {
    "type": "arrow",//路径样式,取值范围：fit_solid(贴合地面), adaptive_solid(等宽路径), none, solid, arrow, arrow_dot, dashed_dot,arrow_dashed, flash, scan_line, brimless_arrow, railway, pipe_round, pipe_square, dashed_line
    "width": 100,//	宽度,单位米(在"adaptive_solid"中,单位像素)
    "color": "b4fed7", //HEX或rgb(0,0,0)
    "passColor": "ffb3deff",//实体已移动的颜色,应用于"实体沿路径移动"
    "speedupFactor":1,//任一数值，加速比，相对于原速度的加成比例，支持正负数，正负表示方向，仅对以下type生效：arrow round_pipe square_pipe railway brimless_arrow dashed_line arrow_dot arrow_dashed dashed_dot flash scan_line
    "opacity":1,//	路径透明度，仅对一下type生效：scan_line,取值范围：[0,1]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(path, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.Path({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
  //动态增删路径折点，无需重建实体
  obj.Modify({ 
    method: 'add', //操作类型：'add'/'delete'
    index: [2, 0], //`add` 时为插入位置；`delete` 时为 `[起始索引, 删除数量]`
    coordinates: [[121.475, 31.235, 0]] // `add` 时提供要插入的坐标点列表；`delete` 时可省略
    });

```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[x, y, z]` | 路径整体位置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `sType` | `string` | 样式类型 | 否 |
| `width` | `number` | 路径宽度（米） | 否 |
| `speedupFactor` | `number` | 动画速度倍数 | 否 |
| `opacity` | `number` | 透明度（0~1） | 否 |
| `color` | `string` | 路径颜色（HEXA） | 否 |
| `passColor` | `string` | 已经过路径颜色（HEXA） | 否 |
| `coordinates` | `[[x, y, z], ...]` | 路径折点坐标数组 | 否 |
| `bClosed` | `boolean` | 是否闭合路径 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |

## Topic: 迁徒图 (id: 1386)

- 迁徒图 Parabola  
`App.Parabola` 在场景中绘制从起点到终点的空间抛物弧线，支持 `arrow`（箭头）、`solid`（实线）、`scanline`（扫描线）三种渲染类型，可控制弧顶高度、弧顶位置比例（0~1）、聚集/扩展方向（gather）以及线宽和颜色,适用于数据流向展示、城市间连线、迁徙动效等场景。

```javascript
// 1. 创建抛物线（从浦东到浦西）
const parabola = new App.Parabola({
  "polyline": {
    "coordinates": [  
      [121.49968476, 31.24861346, 44],//起点
      [121.47025042, 31.23065615, 90]//终点
    ]  //坐标位置，格式[[x,y,z],[x,y,z]]，需为2个坐标点
  },
  "parabolaStyle": {
    "topHeight": 800, //弧顶高度(单位:米)
    "topScale": 1, //弧顶位置比例(单位为%, 取值[0~1])
    "type": "scanline", //样式类型(arrow, solid, scanline)
    "width": 20, //线宽(单位:米)
    "color": "ff3fafff", //HEXA或rgba(0,0,0,0.8)
    "gather": true //true: 向内聚集, false: 向外扩展
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(parabola, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});


// 2. 修改样式
await parabola.SetType('arrow')
await parabola.SetColor('00ff00ff')
await parabola.SetWidth(30)
await parabola.SetTopHeight(1200)
await parabola.SetTopScale(0.5)
await parabola.SetGather(false)   // 向外扩展

// 3. 读取属性
const topHeight = await parabola.GetTopHeight()
console.log('弧顶高度:', topHeight.result)   // number

const type = await parabola.GetType()
console.log('样式类型:', type.result)         // string

// 4. 更新路径坐标（多点连线）
await parabola.SetCoordinates([
  [121.49968476, 31.24861346, 44],
  [121.48000000, 31.24000000, 50],
  [121.47025042, 31.23065615, 90]
])

// 5. 交互事件
parabola.onClick((ev) => {
  console.log('点击了抛物线:', ev.result.object)
})

// 6. 删除
const del = await parabola.Delete()
console.log('删除结果:', del.result)
```

- 成员函数

```javascript
// 示例
  const obj = new App.Parabola({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```
- 成员属性  

| 属性 | 类型 | 说明 | 是否只读 |
|------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `coordinates` | `[[lng, lat, alt], ...]` | 折点坐标数组 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `topHeight` | `number` | 弧顶高度（米） | 否 |
| `topScale` | `number` | 弧顶位置比例（0~1） | 否 |
| `type` | `string` | 渲染样式类型 | 否 |
| `width` | `number` | 线宽（米） | 否 |
| `color` | `string` | 颜色（HEXA） | 否 |
| `gather` | `boolean` | 聚集方向 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |

## Topic: 区域轮廓 (id: 1387)

- 区域轮廓 Range  
`App.Range` 在场景中渲染多边形区域轮廓，支持可定制的轮廓线（颜色、宽度、实线/虚线）和填充（颜色、透明度），并可通过 `extrudeHeight` 将平面多边形拉伸为立体体块。坐标格式遵循 GeoJSON Polygon 规范（第一个数组为外环，首尾坐标闭合,适用于区域标注、围栏展示、建筑体块等场景。

```javascript
const entityObj = new App.Range({
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
  "rangeStyle": {
    "shape": "polygon",
    "type": "loop_line", //类型，取值范围：none, wave, loop_line, grid, stripe, bias, box_wave_line, box_wave, box_solid_line, box_solid；注意：当为box相关类型时，"strokeWeight"无效
    "fillAreaType": "block", //底部区域填充类型，取值范围：none, solid, block, block2, dot, dot2, dot3, dash_line, radar
    "height": 200, //围栏高度(单位:米)
    "strokeWeight": 10, //底部轮廓线宽度(单位:米; 注: 区域中含有内环"innerLoops"时无效)
    "color": "ff3772ff", //HEXA或rgba(0,0,0,0.8)，围栏颜色；前6位是颜色，后面2位是颜色透明度；
    "fillAreaColor": "fa34008f", //HEXA或rgba(0,0,0,0.8)，封底颜色；围栏颜色；前6位是颜色，后面2位是颜色透明度；
    "bBlocked": false ,  //是否开启碰撞检测，开启后，当移动实体闯入该区域，会返回碰撞点坐标，同时实体停止移动
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
})

// 向场景中添加实体
const res = await App.Scene.Add(entityObj, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
const obj = new App.Range({ ...});
obj.Update(json);
obj.SetVisible(boolean);
obj.Get();
obj.GetRangeInfo()
obj.Delete();
obj.onClick(ev => {
  const newObj = ev.result.object;
  console.log(ev);
})
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `lineColor` | `string` | 轮廓线颜色（HEXA） | 否 |
| `lineWidth` | `number` | 轮廓线宽度（米） | 否 |
| `extrudeHeight` | `number` | 拉伸高度（米） | 否 |
| `coordinates` | `[[lng, lat], ...]` | 多边形外环坐标 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |


- 添加SHP轮廓

```javascript
const _shp = "http://wdpapi.51aes.com/doc-static/images/static/gis/polygon.shp"
const resultGeo = await App.DataModel.Geometry.CreateGeometryFromShapefile(_shp);
if (resultGeo.success) {
  //tip::: 创建覆盖物对象
  const range = new App.Range({
    "polygon2D": {
      "coordinates": resultGeo.result.polygon2D[0].polygon
    },
    "rangeStyle": {
      "type": "loop_line",
      "fillAreaType": "dot2",
      "height": 50,
      "strokeWeight": 20,
      "color": "8bffddff",
      "fillAreaColor": "8bffddff",
      "bBlocked": false
    }
  });
  //tip::: 向场景中添加实体
  const res = await App.Scene.Add(range,{
    calculateCoordZ: {
      coordZRef: "surface", //Surface:表面;Ground:地面;Altitude:海拔
      coordZOffset: 50 //[可选]高度(单位:米)
    }
  });
  console.log(res); //call::: 回调信息
  //tip::: 缓存全局对象, 用于后续操作
  cache.set('range',res.result.object);
  if (res.success) {
    const jsondata = {
      "rotation": {
        "pitch": -30, //俯仰角(-90~0)
        "yaw": 0, //偏航角(-180~180; 0:东; 90:南; -90:北)
      },
      "distanceFactor": 0.15, //聚焦倍率[0.1 ~ 1]
      "flyTime": 1, //过渡时长(单位:秒)
      "entity": [cache.get('range')] //覆盖物对象
    }
    await App.CameraControl.Focus(jsondata);
  }
}
```

- 添加GeoJson轮廓

```javascript
const _geojson = "http://wdpapi.51aes.com/doc-static/images/static/gis/polygon.geojson"
const resultGeo = await App.DataModel.Geometry.CreateGeometryFromGeoJson(_geojson);
if (resultGeo.success) {
  //tip::: 创建覆盖物对象
  const range = new App.Range({
    "polygon2D": {
      "coordinates": resultGeo.result.polygon2D[0].polygon
    },
    "rangeStyle": {
      "type": "grid",
      "fillAreaType": "dot",
      "height": 50,
      "strokeWeight": 10,
      "color": "dd0606ff",
      "fillAreaColor": "8bffddff",
      "bBlocked": false
    }
  });
  //tip::: 向场景中添加实体
  const res = await App.Scene.Add(range,{
    calculateCoordZ: {
      coordZRef: "surface", //Surface:表面;Ground:地面;Altitude:海拔,
      coordZOffset: 50 //[可选]高度(单位:米)
    }
  });
  console.log(res); //call::: 回调信息
  //tip::: 缓存全局对象, 用于后续操作
  cache.set('range',res.result.object);
  if (res.success) {
    const jsondata = {
      "rotation": {
        "pitch": -30, //俯仰角(-90~0)
        "yaw": 150, //偏航角(-180~180; 0:东; 90:南; -90:北)
      },
      "distanceFactor": 0.15, //聚焦倍率[0.1 ~ 1]
      "flyTime": 1, //过渡时长(单位:秒)
      "entity": [cache.get('range')] //覆盖物对象
    }
    await App.CameraControl.Focus(jsondata);
  }
}
```

## Topic: 圆形区域轮廓 (id: 1388)

- 圆形区域轮廓 Range

```javascript
const entityObj = new App.Range({
  "circlePolygon2D": {
    "center": [121.49885272, 31.24683565, 46],
    "radius": 200
  },
  "rangeStyle": {
    "shape": "circle",//轮廓类型，圆形区域轮廓
    "type": "loop_line", //围栏样式：none, wave, loop_line, grid, stripe, bias,box_wave_line, box_wave, box_solid_line, box_solid
    "fillAreaType": "block", //底部区域填充类型：none, solid, block, block2, dot, dot2, dot3, dash_line, radar
    "height": 200, //围栏高度(单位:米)
    "strokeWeight": 10, //底部轮廓线宽度(单位:米)
    "color": "ff3772ff" //HEXA或rgba(0,0,0,0.8)
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
})

// 向场景中添加实体
const res = await App.Scene.Add(entityObj, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
const obj = new App.Range({ ...});
obj.Update(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
obj.onClick(ev => {
  const newObj = ev.result.object;
  console.log(ev);
})
```
- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `lineColor` | `string` | 轮廓线颜色（HEXA） | 否 |
| `lineWidth` | `number` | 轮廓线宽度（米） | 否 |
| `extrudeHeight` | `number` | 拉伸高度（米） | 否 |
| `coordinates` | `[[lng, lat], ...]` | 多边形外环坐标 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |

## Topic: 区域热力图 (id: 1389)

- 区域热力图 HeatMap  
WDPAPI 提供 5 种热力图类型，均通过 GeoJSON Feature 数组（`points.features`）传入数据点，每个 Feature 包含 `geometry.coordinates`（坐标）和 `properties.value`（热力值），适用于数据密度展示、区域分析、交通热度、空间分布可视化等场景。

```javascript
//创建区域热力图
const mapdata = [],//热力数据点，包含坐标和点位数值
  points = [
    [121.49656333, 31.22702479, 49],
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
const heatmap = new App.HeatMap({
  "heatMapStyle": {
    "type": "fit", //样式类型(fit: 投影型 plane: 平面型)
    "brushDiameter": 2000, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力点热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "mappingHeightRange": [0, 800],//热力图贴花高度限制（仅作用于type为fit时有效）
    "gradientSetting": [
      //自定义热力点渐变颜色(HEX颜色值)，定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大 |
      "c9ff6f", "d153fe", "01edff", "feb539", "ffd30f"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    features: mapdata // GeoJSON Feature 数组，每个 Feature 含 `geometry.coordinates` 和 `properties.value`
  }
});

const res = await App.Scene.Add(heatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔,
    coordZOffset: 10 //高度(单位:米)
  }
});


// 裁剪
await heatmap.Clip(
  [[121.45, 31.23], [121.48, 31.23], [121.47, 31.25]],
  'ff000080'
)
// 取消裁剪
await heatmap.UnClip()
// 更新热力值范围
await heatmap.SetMappingValueRange([10, 90])
const range = await heatmap.GetMappingValueRange()
console.log('热力值范围:', range.result)   // [10, 90]
```

- 成员函数

```javascript
// 示例
  const obj = new App.HeatMap({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.GetHeatValue([121.49579361,31.23447654,81]);
  obj.Filter();
  obj.UnFilter();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `heatMapStyle` | `object` | 热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 柱状热力图 (id: 1390)

- 柱状热力图

```javascript
const mapdata = [],
  points = [
    [121.48766129, 31.23586660, 35],
    [121.49968476, 31.24861346, 44],
    [121.49956979, 31.25093239, 96],
    [121.47613890, 31.23725069, 39]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)//需要在“mappingValueRange”定义的区间内
  })
}
const columnarheatmap = new App.ColumnarHeatMap({
  "columnarHeatMapStyle": {
    "type": "cube", //柱状热力图柱体外观类型; (cube:方柱, cylinder:圆柱, needle:针状, frame:线框)
    "brushDiameter": 550, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力点热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "columnarWidth": 5, //(单位:米), 单个柱子的直径，单位米；若单个柱子直径较小，表现上过渡平滑，但会让单个点位包含更多柱子，效率降低
    "mappingValueRange":[10, 90],//热力值映射范围
    "mappingHeightRange": [0, 500], //单体柱表达最小值,最大的实际高度(单位:米)
    "enableGap": false, //true 开启柱间隙; false 柱子之间紧贴无间隙
    "gradientSetting": [
      //自定义热力点渐变颜色(HEX颜色值)
      "ffae12", "8f62ff", "60ff4b", "a207ff", "ff15c8"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    "features": mapdata
  }
});

const res = await App.Scene.Add(columnarheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.ColumnarHeatMap({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();//获取柱状热力图实体的所有属性对象
  obj.GetHeatValue([121.49579361,31.23447654,81]);
  obj.Filter();
  obj.UnFilter();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `columnarHeatMapStyle` | `object` | 柱状热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 点云热力图 (id: 1391)

- 点云热力图 SpaceHeatMap

```javascript
const mapdata = [],
  points = [
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
const spaceheatmap = new App.SpaceHeatMap({
  "spaceHeatMapStyle": {
    "brushDiameter": 100, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "gradientSetting": [
      //自定义渐变颜色(HEX颜色值)	,定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大
      "0000ff", "ff5500", "00ff00", "ffff00", "00ffff"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    "features": mapdata
  }
});

const res = await App.Scene.Add(spaceheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.SpaceHeatMap({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();// 获取点云热力图实体的所有属性对象
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `spaceHeatMapStyle` | `object` | 点云热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 路径热力图 (id: 1392)

- 路径热力图 RoadHeatMap

```javascript
//热力数据点，包含坐标和点位数值
const mapdata = [],
  points = [
    [121.46434372, 31.23499129, 60],
    [121.49099537, 31.23099794, 22],
    [121.47780699, 31.23877183, 79]
  ];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)//点位数值，需要在“mappingValueRange”定义的区间内
  })
}
const roadheatmap = new App.RoadHeatMap({
  "roadHeatMapStyle": {
    "width": 50, //宽度
    "mappingValueRange": [1, 100], //热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "gradientSetting": [
      //自定义渐变颜色(HEX颜色值),定义热力点的表现色阶，需要为5个值，对应点位数值的从小到大
      "ff91fd", "cdff75", "ff9e79", "ff07a2", "fea587"
    ],
    "type": "plane", //类型(fit: 投影型 plane: 平面型)
    "filter": ["water"] //fit类型时, 生效的图层; 值为空则作用所有图层
    //常用的filter: "building","terrain","water","road","tree"
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "points": {
    "features": mapdata
  }
});

const res = await App.Scene.Add(roadheatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.RoadHeatMap({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 3D网格热力图 (id: 1393)

- 3D网格热力图 MeshHeatMap
> 版本要求：SDK >= 2.0.2 或 >= 1.15.4
```javascript
const mapdata = [],
points = [
  [121.50646076,31.05227214],
  [121.53648849,31.05375943],
  [121.52800827,31.05715536],
  [121.51782879,31.06306783],
  [121.51136453,31.05309944],
];
for (let i = 0; i < points.length; i++) {
  mapdata.push({
    "point": points[i],
    "value": Math.floor(Math.random() * 100)
  })
}
//tip::: Create covering
const meshHeatMap = new App.MeshHeatMap({
  "meshHeatMapStyle": {
    "pointData": mapdata, // 用于生成mesh的点数据数组
    "meshBoundary": points, // 用于限制Mesh边界的多边形，至少三个点，为空时默认生成矩形范围的Mesh
    "pointCoordZ": 0, // 点的高度值
    "meshGridSpace": 100, // 网格单元大小，用于控制生成的Mesh密度，值越小密度越大越光滑，但是相应性能消耗较大
    "mappingValueRange": [ 0, 50 ], // 点业务值有效范围，用于截取业务值，Range为空时默认不截取
    "mappingHeightRange": [ 0, 50 ], // 点业务值映射的Mesh高度变化范围，范围越大Mesh起伏越大
    "gradientSetting": [ // 业务值映射颜色渐变设置，基于给定的颜色数组线性插值颜色，至少要有两个颜色
      "00ffff",
      "fdff00",
      "009fff",
      "f300ff",
      "ff0000"
    ],
    "opacity": 0.5 // 热力图茎体透明度，范围0-1
  },
  "entityName": "my-meshheatmap-id",
  "customId": "my-meshheatmap-id",
  "customData": {
    "data": "myCustomData"
  }
});
//tip::: 向场景中添加实体
const res = await App.Scene.Add(meshHeatMap,{
  "calculateCoordZ": {  //[可选] 最高优先级
    "coordZRef": "surface",//Surface:表面;Ground:地面;Altitude:海拔
    "coordZOffset": 50 //高度(单位:米)
  }
});
console.log(res);
```

- 成员函数

```javascript
// 示例
  const obj = new App.MeshHeatMap({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();//获取3D网格热力图实体的所有属性对象
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `spaceHeatMapStyle` | `object` | 点云热力图样式配置 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `points` | `object` | GeoJSON Feature 数据 | 否 |


## Topic: 栅格图 (id: 1394)

- 栅格图 Raster  
`App.Raster` 在场景中指定地理坐标处叠加一张图片，以米为单位定义宽高，支持透明度控制。常用于在三维地图上叠加卫星影像、热力底图、自定义图层等平铺图片资源。


```javascript
const raster = new App.Raster({
  "rasterStyle": {
    "path": "http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif", //tif格式支持：Float32 - Thirty two bit floating point;tif文件地址，支持2种形式：·在线地址：如"http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif"·本地地址：如"D:/xxx/raster.tif"； D: 在线席位所在盘符
    "type": "fit", //样式类型(fit: 投影型 plane: 平面型)
    "gradientSetting": [
      //自定义渐变颜色(HEXA颜色值)
      "91ffd5", "ff1af5", "ff0455", "ff71d3", "fed500"
    ]
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
});

const res = await App.Scene.Add(raster, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 10 //高度(单位:米)
  }
});
```


- 成员函数

```javascript
// 示例
  const obj = new App.Raster({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.GetData();//获取实体当前所有属性数据
  obj.GetLocation();//获取栅格图的中心坐标位置
  obj.SetLocation();//设置栅格图的中心坐标位置
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `location` | `[lng, lat, alt]` | 栅格图中心坐标 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `bLocked` | `boolean` | 是否锁定 | 否 |
| `url` | `string` | 图片 URL | 否 |
| `size` | `[w, h]` | 栅格尺寸（米） | 否 |
| `opacity` | `number` | 透明度（0~1） | 否 |
| `entityName` | `string` | 实体名称 | 否 |
| `customId` | `string` | 自定义 ID | 否 |
| `customData` | `object` | 自定义数据 | 否 |
| `parentEid` | `string` | 父实体 EID | 否 |
| `index` | `number` | 排序索引 | 否 |


## Topic: 高亮区域 (id: 1395)

- 高亮区域 HighlightArea  
`App.HighlightArea` 在场景中以多边形区域（Polygon2D）方式标记并高亮一块地理范围，支持内部/外部颜色、外部勾边颜色，以及饱和度（-100~100）、亮度（-100~100）、对比度（-100~100）的图像调整参数，适用于区域标注、地块高亮、兴趣区展示等场景。

```javascript
const highlightarea = new App.HighlightArea({
  "polygon2D": {
    "coordinates": [
      [
        [121.44988564758069, 31.250519581243555],
        [121.44931229954645, 31.237062463089813],
        [121.47069915607464, 31.23800903013435],
        [121.46964214200186, 31.251854247249092]
      ]
    ]
  },
  "highlightAreaStyle": {
    "interiorColor": "cbba89ff", //内部颜色，HEXA
    "exteriorColor": "00ffffff", //外部颜色，HEXA
    "exteriorOutlineColor": "ff00ffff", //外部勾边颜色
    "exteriorSaturation": 10, //饱和度(-100, 100)
    "exteriorBrightness": 15, //亮度(-100, 100)
    "exteriorContrast": 10 //对比度(-100, 100)
  },
  "bVisible": true
});

const res = await App.Scene.Add(highlightarea, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});


// 2. 修改颜色
await highlightArea.SetInteriorColor('ff000080')
await highlightArea.SetExteriorColor('0000ff40')
await highlightArea.SetExteriorOutlineColor('ffff00ff')

// 3. 调整图像参数
await highlightArea.SetExteriorSaturation(-20)
await highlightArea.SetExteriorBrightness(30)
await highlightArea.SetExteriorContrast(5)

// 4. 更新区域范围
await highlightArea.SetCoordinates([[
  [121.44988564758069, 31.250519581243555],
  [121.44931229954645, 31.237062463089813],
  [121.48000000000000, 31.24000000000000],
  [121.46964214200186, 31.251854247249092]
]])

// 5. 交互事件
highlightArea.onClick((ev) => {
  console.log('点击了高亮区域:', ev.result.object)
})

// 6. 删除
const del = await highlightArea.Delete()
console.log('删除结果:', del.result)
```
- 参数描述

1. 当设置一个高亮轮廓时，customColors的优先级高于interiorColor

2. 当exteriorColor和exteriorOutlineColor的颜色透明度设置成ff，exteriorSaturation，exteriorBrightness，exteriorContrast不生效

3. 其他当exteriorColor和exteriorOutlineColor的颜色透明度设置成不透明，exteriorSaturation，exteriorBrightness，exteriorContrast都生效，且效果叠加

4. 高亮区域是一个色块，不是一个模型或者box，所以没有交互能力（即鼠标点击、鼠标滑入滑出等能力）  

- 成员函数

```javascript
// 示例
  const obj = new App.HighlightArea({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
```

- 成员属性  

| 属性名 | 类型 | 说明 | 是否只读 |
|--------|------|------|----------|
| `eid` | `string` | 实体唯一标识 | 是 |
| `oType` | `string` | 实体类型标识 | 是 |
| `coordinates` | `[[[lng, lat], ...]]` | 多边形顶点坐标数组 | 否 |
| `bVisible` | `boolean` | 是否可见 | 否 |
| `interiorColor` | `string` | 内部颜色（HEXA） | 否 |
| `exteriorColor` | `string` | 外部颜色（HEXA） | 否 |
| `exteriorOutlineColor` | `string` | 外部勾边颜色（HEXA） | 否 |
| `exteriorSaturation` | `number` | 外部饱和度（-100~100） | 否 |
| `exteriorBrightness` | `number` | 外部亮度（-100~100） | 否 |
| `exteriorContrast` | `number` | 外部对比度（-100~100） | 否 |

---

## Topic: 自定义 POI（CustomPoi）(id: 1395-ext)  

`App.CustomPoi` 在 `App.Poi` 的基础上增加了对标签容器尺寸、背景、全局文字样式及逐字段局部样式（含滚动动画）的支持，标签以 HTML 方式渲染，可实现更丰富的视觉效果，适用于需要富文本或复杂排版标注的场景。  

> 版本要求：>=1.16.2 & >=2.1.2

```javascript
// CustomPoi：支持三态样式（normal/hover/active）的 POI
const labelStyle = {
  width: 200,//label的宽度
  height: 150,//label的高度，如果不单独设置label高度，那label高度是根据labelContent中的count均分(例如：height设置90，labelContent中count是3，那每行的高度是30)
  visible: true,//label是否展示
  offset: [30, 150],//label相对marker的偏移量
  zIndex: 0, // 默认0（只有0,1）， 0 是maker在上，label在下，1是maker在下，label在上。不重叠的情况下，都可以点击
  background: [
    "ffffffff",
    "https://wdp5-api-debug.51aes.com/static/LabelBg.png",
    //label的背景色，颜色可以和图片颜色叠加
  ],
};
const generalLabelStyle = {
  width: 200,
  height: 37,
  fontSize: 14,
  padding: "12 10 1 5",
  color: "f6f4f4",
  textAlign: "center",
  autoWrap: false,
  animation: "bottomToTop", // 滚动方式，从左向右(leftToRight)，从右向左（rightToLeft），从上向下（topToBottom），从下向上（bottomToTop）
  scrollSpeed: 0, // 滚动速度，单位px/s
};
const specificLabelStyle = {
  content2: {
    // 对应labelContent的索引序号（索引第二个就是content2）
    width:50,//设置labelContent中的显示文本的每个元素宽度
    height:50,//设置labelContent中的显示文本的每个元素高度，
    fontSize: 12,//字体大小
    padding: "1 10 20 5",//上、右、下、左
    color: "c9b01c",
    textAlign: "right",//字体居center(中)、left(左)、right(右)
    autoWrap:true,//是否自动换行
  },
};
const poi = new App.CustomPoi({
  location: [121.46182747, 31.13989956, 64],
  poiStyle: {
    markerNormalUrl: "https://wdp5-api-debug.51aes.com/static/newMarker.png",//正常状态,图片url地址,支持2种形式:·在线地址:如"http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png"·本地地址:如"file:///D:/xxx/markerNormal.png"; D: 在线席位所在盘符注意：当不用markerNormalUrl时候，入参要写成markerNormalUrl:""
    markerActivateUrl:
      "https://wdp5-api-debug.51aes.com/static/newMarker_active.png",//激活状态,由鼠标划过或点击触发注意：当不用markerActivateUrl时候，入参要写成markerActivateUrl:""
    markerSize: [100, 159],
    markerOffset: [0, 0],
    labelContent: [
      "Sample Title",
      "Sample description",
      "This is sample code 1",
      "This is sample code 2",
    ], // label内容数组，每一个代表一行
    labelStyle, // label框样式
    generalLabelStyle, // label整体内容样式
    specificLabelStyle, // label每行内容样式
    visible2D: {
      camera: {
        hideDistance: 2000, // 定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
        hideType: "default", // 实体超出显示距离(none:不显示; default:圆圈显示)
        scaleMode: "2D", // 是否受相机的透视影响(2D:不影响; 3D:影响)；透视包括近大远小、overlapOrder生效
        url:"https://wdp5-api-debug.51aes.com/static/newMarker.png",//当hideType设置成url时，url才生效
        size:[40,50],//图片大小
      },
      interaction: {
        // 被"交互"影响的可见性(POI有效)
        clickTop: true, // 当发生点击(优先级高于滑过)时,需要显示在最上层
        hoverTop: true, // 当发生滑过时，需要显示在最上层
      },
      entity: {
        overlapOrder: 1, // 跨2D覆盖物类型的层级设置，当scaleMode为2D时生效; 数值越大越在最上层；范围[1~10]
      },
    },
  },
  entityName: "myName1",
  customId: "my-custompoi-id",
  customData: {
    data: "myCustomData",
  },
});
//tip::: 向场景中添加实体
const res = await App.Scene.Add(poi, {
  calculateCoordZ: {
    //[可选] 最高优先级
    coordZRef: "surface", //Surface:表面;Ground:地面;Altitude:海拔
    coordZOffset: 50, //高度(单位:米)
  },
});
console.log(res);
// 出参: { success: boolean, message: string, result: { object: CustomPoiObject } }
```


```javascript
// 更新数据
await customPoi.Update({ labelStyle: { data: { name: '更新后的POI' } } });
customPoi.SetVisible(true);
customPoi.Get();
customPoi.Delete();
```



---

## Topic: 实体组（Group）(id: 1395-group)

```javascript
// Group：将多个实体组合为一个组，统一管理
const group = new App.Group({ entityName: '我的组', customId: 'my-group', bVisible: true });
const groupRes = await App.Scene.Add(group);
const groupObj = groupRes.result.object;

await groupObj.Add([poiObj, pathObj, particleObj]);  // 添加成员
await groupObj.Remove([poiObj]);                      // 移除成员
await groupObj.UnGroup();                             // 解散组（成员保留）
await groupObj.SetVisible(false);
await groupObj.Get();    // 出参含成员列表
await groupObj.Delete(); // 删除组及所有成员
```

---

## Topic: 智能建模系列（id: 1395-modeler）

```javascript
// 区域植被（Vegetation）
const vegetation = new App.Vegetation({
  polygon2D: { coordinates: [[[121.4853,31.2384],[121.4900,31.2384],[121.4900,31.2420],[121.4853,31.2420]]] },
  entityName: '区域植被', customId: 'my-vegetation', bVisible: true,
  vegetationStyle: { density: 0.8, type: 'tree_broad', scale: [1,1,1] }
});
const vegRes = await App.Scene.Add(vegetation);
const vegObj = vegRes.result.object;

// Vegetation 额外方法（剔除区域管理）
// cullRegions 结构：[{ index: -1, name: "testName", bEnable: true, loopPoints: [[100,100],[300,300]] }]
// index: -1 表示新增；>=0 表示更新已有区域

// 查询剔除区域
const queryRes = await vegObj.QueryRegion();
// 出参: { success: boolean, result: { cullRegions: [...] } }

// 移除剔除区域（传入 index 数组）
await vegObj.RemoveRegion([0, 1]);

// 更新剔除区域名称
await vegObj.UpdateRegionName([{ index: 0, name: 'AAA' }]);

// 启用/禁用剔除区域
await vegObj.ToggleRegion([{ index: 0, bEnable: true }]);

// 挡水岸堤（ModelerEmbank）
const embank = new App.ModelerEmbank({
  polyline: { coordinates: [[121.4853,31.2384,0],[121.4900,31.2400,0]] },
  entityName: '挡水岸堤', customId: 'my-embank', bVisible: true,
  embankStyle: { width: 20, height: 5, slope: 1.5 }
});
await App.Scene.Add(embank);

// 水面水体（ModelerWater）
const water = new App.ModelerWater({
  polygon2D: { coordinates: [[[121.4853,31.2384],[121.4900,31.2384],[121.4900,31.2420]]] },
  entityName: '水面水体', customId: 'my-water', bVisible: true,
  waterStyle: { waterLevel: 5, color: '0066ffaa', waveSpeed: 1.0, waveHeight: 0.5 }
});
await App.Scene.Add(water);

// 河道水岸（ModelerRiver）
const river = new App.ModelerRiver({
  polyline: { coordinates: [[121.4853,31.2384,0],[121.4900,31.2400,0]] },
  entityName: '河道水岸', customId: 'my-river', bVisible: true,
  riverStyle: { width: 50, waterLevel: 2, bankHeight: 3 }
});
await App.Scene.Add(river);

// 智能建模围栏（ModelerFence）
const fence = new App.ModelerFence({
  polyline: { coordinates: [[121.4853,31.2384,0],[121.4900,31.2384,0],[121.4900,31.2420,0],[121.4853,31.2420,0]] },
  entityName: '围栏', customId: 'my-fence', bVisible: true,
  fenceStyle: { height: 3, type: 'iron', bClosed: true }
});
await App.Scene.Add(fence);

// 智能建模楼板（ModelerFloor）
const floor = new App.ModelerFloor({
  polygon2D: { coordinates: [[[121.4853,31.2384],[121.4900,31.2384],[121.4900,31.2420],[121.4853,31.2420]]] },
  entityName: '楼板', customId: 'my-floor', bVisible: true,
  floorStyle: { height: 0, thickness: 0.3, color: 'ccccccff' }
});
await App.Scene.Add(floor);
```

---

## Topic: 静态实例模型（StaticInstance）(id: 1395-instance)  

`App.StaticInstance` 将同一个模型资产在多个位置同时实例化，所有实例共享同一份模型数据，渲染性能远优于创建多个独立的 `App.Static` 实体。每个实例可独立设置位置、旋转、缩放和自定义 ID。

```javascript
// StaticInstance：静态模型的实例化，适合大量重复模型（如树木、路灯）
// instanceComponentInfos 完整结构（来自 docx 原始文档）：
const staticInstance = new App.StaticInstance({
  entityName: '静态实例', customId: 'my-static-instance', bVisible: true,
  instanceComponentInfos: [{
    componentName: '实验学校06',       // 组件名称
    parentName: '',                    // 父组件名称（顶层为空）
    assetId: '883786d39171015f0fc8396ae4115a66', // 资产 ID
    meshName: 'WZ_WZSYXX_06',         // 网格名称
    componentLocation: [0, 0, 0],     // 组件自身位置（笛卡尔，单位：厘米）
    componentRotator: { pitch: 0, yaw: 0, roll: 0 },
    componentScale: [1, 1, 1],
    nodeIds: [10000001, 10000002],     // 实例节点 ID 列表
    positions: [[0,0,0], [5000,0,0]], // 各节点位置（笛卡尔，单位：厘米）
    idToRotator: {},                  // 节点 ID → 旋转（可选，覆盖默认）
    idToScale: {},                    // 节点 ID → 缩放（可选，覆盖默认）
    hiddenIds: []                     // 隐藏的节点 ID 列表
  }]
});
const res = await App.Scene.Add(staticInstance);

// 更新某个实例的位置（通过 nodeId 定位）
await staticInstance.Update({
  instanceComponentInfos: [{ nodeIds: [10000001], positions: [[1000,0,0]] }]
});

// StaticInstance 额外方法（来自 docx 原始文档）：
// 删除指定组件
await staticInstance.DeleteComponents(['实验学校06']);

// 设置组件变换（key 为 "componentName_meshName" 格式）
await staticInstance.SetComponentsTransform({
  '实验学校06_WZ_WZSYXX_06': {
    rotator: { pitch: 0, yaw: 45, roll: 0 },
    location: [0, 0, 0],
    scale3d: [1, 1, 1]
  }
});

// 删除指定节点
await staticInstance.DeleteNodes([10000001, 10000002]);

// 设置节点变换
await staticInstance.SetNodesTransform([{
  nodeIds: [10000001],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  location: [1000, 0, 0],
  scale3d: [1, 1, 1]
}]);

// 描边指定组件（第二参数 true=开启, false=关闭）
await staticInstance.OutlineComponents(['实验学校06'], true);

// 聚焦指定组件
await staticInstance.FocusComponents(['实验学校06']);
```

---

## Topic: UI 组件事件监听与坐标跟随（id: 1374-1376-1379-ext）

> 补充：WindowUI / PoiUI / VideoUI 的事件监听和坐标跟随更新（基础创建用法见上方各 Topic）

- PoiUI 点击 / 悬停事件

```javascript
// PoiUI 支持 onClick / onHover 事件
const poiUI = new App.PoiUI({
  poiUIContent: {
    normalImage: 'http://example.com/marker.png',
    activeImage: 'http://example.com/marker_active.png',
    content: '<div>{{name}}</div>',
    data: { name: '我的POI' }
  },
  windowStyle: { width: '79px', height: '180px', position: 'absolute', left: '500px', top: '200px', zIndex: '1000', background: 'none' }
});
const res = App.Component.PoiUI.Add([poiUI]);
const obj = res.result.objects[0];

// 注册点击事件
obj.onClick((ev) => {
  console.log('PoiUI clicked', ev);
  // ev.result: { object: PoiUIObject, customId, customData }
});

// 注册悬停事件
obj.onHover((ev) => {
  console.log('PoiUI hovered', ev);
});
```

- PoiUI 坐标跟随更新

```javascript
// PoiUI 本身位置固定（基于 CSS），若需跟随三维坐标移动，
// 配合 App.Tools.Screen.AddScreenPosBound 实现：
const screenRes = await App.Tools.Screen.AddScreenPosBound({
  id: 'my-poi-ui-dom-id',          // PoiUI 对应的 DOM 元素 ID
  location: [121.4853, 31.2384, 10],
  offset: [0, -90],
  bAutoHide: true
});

// 当实体位置变化时更新绑定坐标
await App.Tools.Screen.UpdateScreenPosBound({
  id: 'my-poi-ui-dom-id',
  location: [121.4900, 31.2400, 10]
});
```

- WindowUI 与内嵌页面双向通信

```javascript
// WindowUI 内嵌页面 → 外部：使用 w51_event
// （在内嵌 HTML 页面中调用）
w51_event('MyCustomEvent', { key: 'value' });

// 外部监听 WindowUI 发出的事件
App.Renderer.RegisterSceneEvent([{
  name: 'OnWebJSEvent',
  func: (data) => {
    // data.result: { name: 'MyCustomEvent', args: { key: 'value' } }
    console.log('WindowUI event:', data);
  }
}]);

// 外部 → WindowUI 内嵌页面：通过 postMessage
const windowUIObj = res.result.objects[0];
windowUIObj.PostMessage({ type: 'update', payload: { value: 42 } });
```
