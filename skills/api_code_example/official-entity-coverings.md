# Official excerpt sync: 实体覆盖物

Version baseline: WDP API 2.2.1
Source: public wdpapidoc API (category: 实体覆盖物, categoryId: 572)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 实时视频 (id: 1373)

- 实时视频 RealTimeVideo

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
  },
  "bVisible": true,
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  }
})

const res = await App.Scene.Add(realTimeVideo, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔
    coordZOffset: 50 //高度(单位:米)
  }
});
```

- 成员函数

```javascript
// 示例
  const obj = new App.RealTimeVideo({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
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

```javascript
/*
基于浏览器开发的video，相对于3D渲染POI，只能播放浏览器支持的MP4格式，且不支持daas
*/
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
object.Update(jsonData)
// 删除video
object.Delete()
// 获取video
App.Component.VideoUI.Get();
```

## Topic: window (id: 1375)

- Window

```javascript
const window = new App.Window({
  "location": [121.50007292, 31.22579403, 30],
  "windowStyle": {
    "url": "http://wdpapi.51aes.com/doc-static/images/static/echarts.html",
    "size": [500, 350], //window大小(单位:像素)
    "offset": [0, 0]
  },
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "bVisible": true,
  "visible2D": {
    "camera": {
      "hideDistance": 2000,  //定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
      "hideType": "default", //实体超出显示距离(none:不显示; default:圆圈显示)
      "scaleMode": "2D" //是否受相机的透视影响(2D:不影响; 3D:影响)
    },
    "interaction": { //被"交互"影响的可见性(POI有效)
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
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
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

```javascript
/*
基于浏览器渲染的窗口，相对于UE渲染窗口
优点：像素清晰
缺点：位置固定，不能跟随镜头动
基于浏览器渲染窗口，添加多少个Window点取决的web页面的DOM元素，不在依赖UE渲染
*/
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
// 获取Window
App.Component.WindowUI.Get();
```

## Topic: POI (id: 1377)

- POI

```javascript
const poi = new App.Poi({
  "location": [121.50007292, 31.22579403, 30],
  "poiStyle": {
    "markerNormalUrl": "https://wdp5-api-debug.51aes.com/static/newMarker.png",
    "markerActivateUrl": "https://wdp5-api-debug.51aes.com/static/newMarker_active.png",
    "markerSize": [100,159],
    "labelBgImageUrl": "https://wdp5-api-debug.51aes.com/static/newLabel.png",
    "labelBgSize": [177,66],
    "labelBgOffset": [10,168], //// label可以向上下左右偏移；当[0,0]时，label切图的左上角对齐location (x,y 单位:像素)
    "labelContent": [" 文本内容A","ffffff","18"],
    "labelContentOffset": [45, 23], // labeContent可以向上下左右偏移; 当[0,0]时，labelContent的左上角对齐label的左上角 (x,y 单位:像素)
    "labelTop": false, //label是否置于marker顶层
    "scrollSpeed": 5,// 文本滚动速度(0:不滚动)
    "textBoxWidth": 200, // 文本框宽度(默认100)
    "labelContentJustification": "Left", //文本内容对齐方式: Left, Center, Right
    "labelContentAutoWrap": true, //label内容是否自动换行
    "scrollPolicy": "default"  //文本长度超过文本框时滚动; always: 总是滚动
  },
  "entityName": "myName",
  "customId": "myId1",
  "customData": {
    "data": "myCustomData"
  },
  "bVisible": true,
  "visible2D": {
    "camera": {
      "hideDistance": 2000,  //定义实体隐藏的距离(单位:米),相机超过此距离时,实体会被隐藏
      "hideType": "default", //实体超出显示距离(none:不显示; default:圆圈显示)
      "scaleMode": "2D" //是否受相机的透视影响(2D:不影响; 3D:影响)；透视包括近大远小、overlapOrder生效
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

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

```javascript
/*
基于浏览器渲染的POI，相对于UE渲染POI
优点：像素清晰
确定：位置固定，不能跟随镜头动
基于浏览器渲染的poi，添加多少个poi点取决的web页面的DOM元素，不在依赖UE渲染
*/
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
object.Update(jsonData)
// 删除
object.Delete()
// 获取
object.Get()
```

## Topic: 场景特效 (id: 1380)

- 场景特效 Particle

```javascript
const particle = new App.Particle({
  "location": [121.50007292, 31.22579403, 30],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [30, 30, 30],
  "particleType": "vehicle_taxi",
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

- 事件

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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 灯光特效 (id: 1382)

- 灯光特效Light

```javascript
const entityObj = new App.Light({
  "location": [121.47731869, 31.22435528, 61],
  "bVisible": true, //是否可见(true/false)
  "scale3d": [30, 30, 30],
  "lightStyle": {
    "intensity": 40, //灯光强度(0~100)
    "color": "968afeff", //灯光颜色(HEX颜色值)
    "angle": 50, //灯光张角(0~50)
    "attenuation": 200, //灯光衰减长度(单位:米)
    "shadows": true, //是否开启阴影(true/false)
    "haze": true, //是否开启烟雾(true/false)
    "haze_Intensity": 90 //烟雾强度(0~100)
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
  obj.Get();
  obj.Delete();
```

## Topic: 3D文字 (id: 1383)

- 3D文字 Text

```javascript
const text3d = new App.Text3D({
  "location": [121.46434372, 31.23499129, 60],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [100, 30, 30],
  "text3DStyle": {
    "text": "3D文字",
    "color": "ff00ff", //HEX或rgba(0,0,0)
    "type": "plain", //样式(plain; reflection; metal)
    "outline": 0.4, //轮廓(单位:百分比), 取值范围[0~1]
    "portrait": false, //纵向(true/false)
    "space": 0.1 //间距(单位:米)
  },
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

## Topic: 可视域 (id: 1384)

- 可视域 Viewshed

```javascript
const viewshed = new App.Viewshed({
  "location": [121.47025042, 31.23065615, 90],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "viewshedStyle": {
    "fieldOfView": 70, //可视域水平视角范围(0~120)
    "radius": 600, //半径(单位:米)
    "outline": true, //轮廓
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 路径 (id: 1385)

- 路径 Path

```javascript
const path = new App.Path({
  "polyline": {
    "coordinates": [
      [121.49968476, 31.24861346, 44],
      [121.49956979, 31.25093239, 96],
      [121.47613890, 31.23725069, 39]
    ]
  },
  "pathStyle": {
    "type": "arrow",
    "width": 100,
    "color": "b4fed7", //HEX或rgb(0,0,0)
    "passColor": "ffb3deff"
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
```

## Topic: 迁徒图 (id: 1386)

- 迁徒图 Parabola

```javascript
const parabola = new App.Parabola({
  "polyline": {
    "coordinates": [
      [121.49968476, 31.24861346, 44],
      [121.47025042, 31.23065615, 90]
    ]
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

## Topic: 区域轮廓 (id: 1387)

- 区域轮廓 Range

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
    "type": "loop_line", //类型
    "fillAreaType": "block", //底部区域填充类型
    "height": 200, //围栏高度(单位:米)
    "strokeWeight": 10, //底部轮廓线宽度(单位:米; 注: 区域中含有内环"innerLoops"时无效)
    "color": "ff3772ff", //HEXA或rgba(0,0,0,0.8)
    "fillAreaColor": "fa34008f", //HEXA或rgba(0,0,0,0.8)
    "bBlocked": false    //是否开启碰撞检测
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
    "shape": "circle",
    "type": "loop_line", //类型
    "fillAreaType": "block", //底部区域填充类型
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

## Topic: 区域热力图 (id: 1389)

- 区域热力图 HeatMap

```javascript
const mapdata = [],
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
    "gradientSetting": [
      //自定义热力点渐变颜色(HEX颜色值)
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
    features: mapdata
  }
});

const res = await App.Scene.Add(heatmap, {
  calculateCoordZ: {
    coordZRef: "surface", //surface:表面;ground:地面;altitude:海拔,
    coordZOffset: 10 //高度(单位:米)
  }
});
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
    "value": Math.floor(Math.random() * 100)
  })
}
const columnarheatmap = new App.ColumnarHeatMap({
  "columnarHeatMapStyle": {
    "type": "cube", //柱状热力图柱体外观类型; (cube:方柱, cylinder:圆柱, needle:针状, frame:线框)
    "brushDiameter": 550, //热力点笔刷直径(单位:米, 单个热力点覆盖直径)
    "mappingValueRange": [1, 100], //热力点热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "columnarWidth": 5, //(单位:米), 柱状热力图单体宽度(此宽度同时受整个热力图范围大小影响;柱状热力图最多500x500个柱子,如果热力图整体范围长度,宽度/单体柱子宽度 <= 500,则采用单体柱子宽度;否则单体柱子宽度会自动反算一个合适的值)
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
      //自定义渐变颜色(HEX颜色值)
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 路径热力图 (id: 1392)

- 路径热力图 RoadHeatMap

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
const roadheatmap = new App.RoadHeatMap({
  "roadHeatMapStyle": {
    "width": 50, //宽度
    "mappingValueRange": [1, 100], //热力值范围(1:绿色接近透明, 100:最红, 线性计算)
    "gradientSetting": [
      //自定义渐变颜色(HEX颜色值)
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 栅格图 (id: 1394)

- 栅格图 Raster

```javascript
const raster = new App.Raster({
  "rasterStyle": {
    "path": "http://wdpapi.51aes.com/doc-static/images/static/raster/raster.tif", //目前仅支持TIF格式
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
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 高亮区域 (id: 1395)

- 高亮区域 HighlightArea

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
    "interiorColor": "cbba89ff", //内部颜色
    "exteriorColor": "00ffffff", //外部颜色
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
```

- 成员函数

```javascript
// 示例
  const obj = new App.HighlightArea({...});
  obj.Update(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
```

---

## Topic: 自定义 POI（CustomPoi）(id: 1395-ext)

> 版本要求：>=1.16.2 & >=2.1.2

```javascript
// CustomPoi：支持三态样式（normal/hover/active）的 POI
const customPoi = new App.CustomPoi({
  location: [121.4853, 31.2384, 10],
  entityName: '自定义POI',
  customId: 'my-custom-poi',
  bVisible: true,
  generalLabelStyle: {
    bgColor: 'ffffff80',
    textColor: 'ffffffff',
    fontSize: 14,
    borderColor: '00aaff',
    borderWidth: 1,
    padding: [8, 12],
    offset: [0, -60]
  },
  specificLabelStyle: {
    normal:  { bgColor: 'ffffff80', textColor: 'ffffffff' },
    hover:   { bgColor: '00aaffcc', textColor: 'ffffffff' },
    active:  { bgColor: 'ff6600ff', textColor: 'ffffffff' }
  },
  labelStyle: {
    content: '<div style="padding:8px">{{name}}</div>',
    data: { name: '我的自定义POI' }
  }
});
const res = await App.Scene.Add(customPoi);
// 出参: { success: boolean, message: string, result: { object: CustomPoiObject } }

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
