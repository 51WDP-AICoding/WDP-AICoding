# Official excerpt sync: 空间标注与交互覆盖物

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 空间标注与交互覆盖物, categoryId: 572)

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
  // 方式一：
  // console.log(obj.location);
  // 方式二：
  await obj.GetLocation();//获取实时视频的坐标位置，[121.47025042, 31.23065615, 90]
  // 方式一：
  // obj.location = [121.47025042, 31.23065615, 90];
  // 方式二：
  await obj.SetLocation([121.47025042, 31.23065615, 90]);//设置实时视频的坐标位置。
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
  // 方式一：
  // console.log(obj.location);
  // 方式二：
  await obj.GetLocation();//获取窗口锚点的经纬度坐标及高度。
  // 方式一：
  // obj.location = [121.47025042, 31.23065615, 90];
  // 方式二：
  await obj.SetLocation([121.47025042, 31.23065615, 90]);//设置窗口锚点的经纬度坐标及高度
 
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
  // 方式一：
  // console.log(obj.location);
  // 方式二：
  await obj.GetLocation();//获取 POI 的位置坐标
  // 方式一：
  // obj.location = [121.5, 31.2, 10];
  // 方式二：
  await obj.SetLocation([121.5, 31.2, 10]);//设置 POI 的位置坐标
  // 方式一：
  // console.log(obj.bLocked);
  // 方式二：
  await obj.GetLocked();//获取 POI 的锁定状态
  // 方式一：
  // obj.bLocked = true;
  // 方式二：
  await obj.SetLocked(true);//设置 POI 的锁定状态
  // 方式一：
  // console.log(obj.pivotOffset);
  // 方式二：
  await obj.GetPivotOffset();//获取 POI 的轴心偏移
  // 方式一：
  // obj.pivotOffset = [0, 0, 5];
  // 方式二：
  await obj.SetPivotOffset([0, 0, 5]);//设置 POI 的轴心偏移
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
  // 方式一：
  // obj.rotator = {pitch: 0, yaw: 30, roll: 0};
  // 方式二：
  await obj.SetRotator({pitch: 0, yaw: 30, roll: 0});
  // 方式一：
  // obj.scale3d = [100, 30, 30];
  // 方式二：
  await obj.SetScale3d([100, 30, 30]);
  // 方式一：
  // obj.bVisible = boolean;
  // 方式二：
  await obj.SetVisible(boolean);
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
// 方式一：
// obj.bVisible = boolean;
// 方式二：
await obj.SetVisible(boolean);
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
// 方式一：
// obj.bVisible = boolean;
// 方式二：
await obj.SetVisible(boolean);
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
