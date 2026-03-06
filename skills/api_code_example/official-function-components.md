# Official excerpt sync: 功能组件

Version baseline: WDP API 2.2.1
Source: public wdpapidoc API (category: 功能组件, categoryId: 576)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 环境 (id: 1406)

- 场景光照

```javascript
// 获取时间
await App.Environment.GetSkylightTime();

// 设置时间
// 参数1：切换到的时间点；参数2：切换效果的持续时间；参数3：应用实时时间
await App.Environment.SetSkylightTime('12:30', 3, false);
```

- 场景天气

```javascript
// 获取天气
await App.Environment.GetSceneWeather();

// 设置天气
// 参数1：切换到的天气；参数2：切换效果的持续时间；参数3：应用实时天气（目前不支持实时天气）
// 参数3设置成true即实时时间，需要有外网才能访问
await App.Environment.SetSceneWeather('Sunny', 3, false);
```

- 场景风格化

```javascript
const style = "comic"; //comic, sketch, dark, ashy, false(关闭)
const res = await App.Scene.SetSceneStyle(style);
```

## Topic: 控件 (id: 1407)

- 获取API信息

```javascript
// 获取WdpApi信息
await App.System.GetInfomation();

// 获取行业插件信息
await App.Plugin.Get();

/*
  {
    "success": true,
    "message": "",
    "result": [
      {
        "name": "GisApi",
        "des": "GIS API Plugins",
        "version": "1.1.0"
      },
      {
        "name": "CimApi",
        "des": "CIM API Plugins",
        "version": "1.1.0"
      },
      {
        "name": "IseApi",
        "des": "ISE API Plugins",
        "version": "1.1.0"
      },
      {
        "des": "",
        "name": "BIM/DCP-API",
        "version": "1.6.0"
      }
    ]
  }
*/
```

- RTC信息

```javascript
await App.Renderer.GetStats();
```

- 获取对象的bounding box数据

```javascript
await App.Scene.GetBoundingBox([obj, obj, obj]);
```

- 小地图

```javascript
const _url = "http://wdpapi.51aes.com/doc-static/images/static/MiniMap/"
const jsondata = {
    "type": "manual",
    "source": {
        "bg": _url + "Minimap.png",  //背景平面图(注: 大小4096x4096 必需)
        "needle": _url + "Minimap_needle.png", //中心指针
        "mask": _url + "Minimap_mask.jpg", //遮罩图(黑白色 必需)
        "frame": _url + "Minimap_outline.png" //外框图
    },
    "mappingAnchors": [ 
       //图片左上角、右下角映射到场景坐标(注: 平面图上方为正北)
        [121.54900666925667, 31.175366234862334],
        [121.42595948541654, 31.068307985569852]
    ],
    "display": {
        "position": [300, 100], //位置(单位:像素; 注:以屏幕分辨率1920 * 1080的左上角为基准点，基准点可按anchors参数调整)
        "size": 300, //大小(单位:像素; 注:以屏幕分辨率1920 * 1080为基准)
        "anchors": "leftTop" // 同时影响位置参考点&屏幕拉伸参考点
        // 拉伸：不同分辨率下，小地图位置会按1920*1080进行短边自适应。在开发和展示的屏幕比例不同时，可选择相应的缩放锚点
        // leftTop, leftMiddle, leftDown
        // middleTop, middleCenter, middleDown
        // rightTop, rightMiddle, rightDown
    }
}

const res = await App.Tools.MiniMap.Start(jsondata);
console.log(res)



//关闭小地图
const res = await App.Tools.MiniMap.End();
console.log(res)
```

- 指南针

```javascript
const jsondata = {
    "source": {
        "bg": "http://wdpapi.51aes.com/doc-static/images/static/compass_bg.png", //指南针背景图
        "needle": "http://wdpapi.51aes.com/doc-static/images/static/compass_needle.png" //中心指针
    },
    "display": {
        "position": [300,100], //位置(单位:像素; 注:以屏幕分辨率1920 * 1080的左上角为基准点，基准点可按anchors参数调整))
        "size": 300, //大小(单位:像素; 注:以屏幕分辨率1920 * 1080为基准)
        "anchors": "leftTop" // 同时影响位置参考点&屏幕拉伸参考点
        // 拉伸：不同分辨率下，指南针位置会按1920*1080进行短边自适应。在开发和展示的屏幕比例不同时，可选择相应的缩放锚点
        // leftTop, leftMiddle, leftDown
        // middleTop, middleCenter, middleDown
        // rightTop, rightMiddle, rightDown
    }
}

const res = await App.Tools.Compass.Start(jsondata);
console.log(res)



//关闭指南针
const res = await App.Tools.Compass.End();
console.log(res)
```

## Topic: 工具 (id: 1408)

- GIS转笛卡尔

```javascript
const coord = [
    [121.478818,31.24251593,94],
    [121.47274158,31.22456944,95],
    [121.48836526,31.22625219,68],
    [121.49542527,31.2341436,58]
  ]

const res = await App.Tools.Coordinate.GISToCartesian(coord);
console.log(res.result.to)
```

- 笛卡尔转GIS

```javascript
const cartesian = [
    [5000, 5000, 20],
    [50000, 10000, 20],
    [70000, 70000, 20],
    [10000, 70000, 20]
  ]

const res = await App.Tools.Coordinate.CartesianToGIS(cartesian);
console.log(res.result.to)
```

- GIS转屏幕坐标

```javascript
const coord = [  //注意: 坐标必须在屏幕区域内
    [121.47274158,31.22456944,95],
    [121.48836526,31.22625219,68],
    [121.49542527,31.2341436,58]
  ]

const res = await App.Tools.Coordinate.GISToScreenPos(coord);
console.log(res.result.to)
```

- CAD转换成经纬度

```javascript
// 创建CAD局部坐标
const { result } = await App.Tools.Coordinate.CreateCADGeoRef({
  cadPoints: [
    [1363051.25,1183997.5,0],
    [-258250.23,-495587.8,0]
  ],
  worldPoints: [
    [121.46803088,31.23803171,80],
    [121.49125594,31.22895244,16]
  ]
});
// CAD转经纬度
const geoObj = result.object;
const res = await App.Tools.Coordinate.LocalToGlobalGeoRef(geoObj,
  [
    [1532640.320,1752786.25,0],
    [1363051.225,1183997.35,0],
    [1231995.625,493529.375,0],
    [173426.875,-244088.125,0],
    [-294465.375,-21562.235,0],
    [-1984983.125,-733952.5,0],
    [-1143592.5,-114504.375,0],
    [-5587255.34,747446.875,0],
    [-258250.43,-495587.355,0]
  ]
);
console.log(res.result.to);
```

- 屏幕坐标转GIS坐标

```javascript
const res = await App.Tools.Picker.PickWorldPointByScreenPos([480, 573]);
console.log(res);
```

- 坐标几何辅助

```javascript
// 添加坐标点辅助
const coords = [
    [121.48874015,31.23789002,66],
    [121.48598707,31.24150321,1],
    [121.503394,31.24398916,49],
    [121.49355523,31.23633749,38],
    [121.51654214,31.23608135,29],
    [121.4942991,31.23271274,70]
  ]
 // surface:表面; ground:地面; altitude:海拔
  await App.DataModel.Geometry.StartShowCoord(coords, 'surface');

  // 关闭坐标点辅助
  App.DataModel.Geometry.EndShowCoord();
```

- 转置工具

```javascript
/**
 * @param fromProjection: string (required) 来源坐标系
 * @param toProjection: string (required) 目标坐标系
 * @param coordinates: Array (required) 坐标数组
 */
const res = await App.Tools.Coordinate.Exchange('+proj=longlat +datum=WGS84 +no_defs', '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs', [[120.433311998519, 5.73111656594612, 10], [120.433311998519, 5.73111656594612, 5]]);
console.log(res);
```

- 取点工具

```javascript
// 开启取点工具
// 参数一: true:显示坐标信息; false:隐藏坐标信息
// 参数二: true:显示取点标记; false:隐藏取点标记
// 参数三: surface:表面; ground:地面; altitude:海拔
await App.Tools.PickerPoint.StartPickPoint(true, true, "surface");

// 获取坐标点
// 参数: surface:表面; ground:地面; altitude:海拔
await App.Tools.PickerPoint.GetPickedPoints("surface");

// 关闭取点工具
await App.Tools.PickerPoint.EndPickPoint();
```

- 测量工具

```javascript
// 开启测量工具
await App.Tools.Measure.Start();

// 关闭测量工具
await App.Tools.Measure.End();
```

- 剖切体工具

```javascript
// 开启剖切体  
const res = await App.Scene.Section.Start({
      "coordZRef": "surface", //surface:表面;ground:地面;altitude:海拔
      "strokeColor": "56a8ff",//被切物体描边颜色(HEX颜色值)
      "strokeWeight": 0.8, //被切物体描边宽度[0~1]
      "invert": false, //被切物体(true:内部可见; false:外部可见)
      "transform": {
        "location": [121.51117039,31.2503413,30], //剖切体底部中心对应的位置
        "rotator": {
          "pitch": 0, //俯仰角, 参考(-180~180)
          "yaw": 30, //偏航角, 参考(0正北, -180~180)
          "roll": 0 //翻滚角, 参考(-180~180)
        },
        "scale3d": [1, 1, 1]
      }
  })
```

```javascript
//关闭剖切体
const res = await App.Scene.Section.End();
```

- 工程定制API调用

```javascript
const jsondata = {
  "apiClassName": "WdpCameraControlAPI",
  "apiFuncName": "GetCameraInfo",
  "args": {
      // json数据
   }
}
const res = await App.Customize.RunCustomizeApi(jsondata);
console.log(res);
```

- 获取场景快照

```javascript
/**
* @param {number[]} resolution - 图像的分辨率,以 [宽度, 高度] 的形式表示.
* @param {number} quality - 快照的画质,取值范围为 [0, 1], 0 表示最低质量, 1 表示最高质量.
*/
await App.Renderer.GetSnapshot([1920, 1080], 0.8);
```

- RGBA转HEXA

```javascript
/**
* RGBA对象转16进制颜色字符串
* @param {string} decimal - RGBA: A的取值范围0~1
* @param {string} integer - RGBA: A的取值范围0~255
*/

const color = {
  r: 100,
  g: 50,
  b: 200,
  a: 1
}

const res = await App.Tools.Color.RgbaToHexa(color, 'decimal');
```

- HEXA转RGBA

```javascript
/**
* 16进制颜色字符串转RGBA对象
* @param {string} decimal - RGBA: A的取值范围0~1
* @param {string} integer - RGBA: A的取值范围0~255
*/

const res = await App.Tools.Color.HexaToRgba('f38929ff', 'decimal');
```

- 可显示中国地图

```javascript
// 切换中国地图
/**
 * @param bChinaMap: boolean 是否切换中国地图
 */
const res = await App.Tools.ChinaMap.Switch({bChinaMap: true});
console.log(res);
```

```javascript
// 高亮省份
/**
 * @param provinceCode: string 省份代号（SH, BJ, ...）
 * @param bHighlight: boolean 是否高亮
 * @param color: string 高亮颜色
 */
const res = await App.Tools.ChinaMap.HighlightProvince({
  provinceCode: "SH",
  bHighlight: true,
  color: 'FF0000'
});
console.log(res);

// province
/*
BJ—北京市；SH—上海市；TJ—天津市 ；CQ—重庆市；HE—河北省；SX—山西省；NM—内蒙古自治区；LN—辽宁省；JL—吉林省；HL—黑龙江省；
JS—江苏省；ZJ—浙江省；AH—安徽省；FJ—福建省；JX—江西省；SD—山东省；HA—河南省；HB—湖北省；HN—湖南省；GD—广东省；GX—广西壮族自治区；
HI—海南省；SC—四川省；GZ—贵州省；YN—云南省；XZ—西藏自治区；SN—陕西省；GS—甘肃省；QH—青海省；NX—宁夏回族自治区；XJ—新疆维吾尔族自治区；
TW—台湾省；HK-香港；MO-澳门
*/
```

```javascript
// 显隐省份名字
/**
 * @param provinceCode: string 省份代号（SH, BJ, ...）
 * @param bVisible: boolean 是否显示
 * @param bVisible: boolean 是否显示
 */
const res = await App.Tools.ChinaMap.SetProvinceNameVisibility({
  provinceCode: "SH",
  bVisible: true,
  color: 'FF0000'
});
console.log(res);
```

```javascript
// 创建迁徙图
const res = await App.Tools.ChinaMap.CreateMigration({
  migrationId: "test-id", // 迁徙图ID
  type: 1, // 1 ~ 5表示迁徙类型，也即抛物线类型
  hubProvinceCode: "BJ", // 迁徙中心，省份代号
  bGathered: false, // 中心聚集，true表示周围向中心迁徙，false表示从中心迁徙到周围
  peripheralProvincesInfo: [ // 周围省份迁移信息
    {
      provinceCode:"SH", // 省份代号（SH, BJ, ...）
      markSize:5, // 迁徙目标点的粒子效果大小
      markColor:"FF0000", // 迁徙目标点的粒子效果颜色
      lineWidth:250, // 迁徙线路的大小
      lineColor:"00FF00", // 迁徙线路的颜色
      curvature:-1 // 曲率：-1~1， 越小抛物线越水平
      
    },
    {
      provinceCode:"HL",
      markSize:5,
      markColor:"FF0000",
      lineWidth:250,
      lineColor:"00FF00",
      curvature:-1
      
    },				
    {
      provinceCode:"MO",
      markSize:5,
      markColor:"FF0000",
      lineWidth:250,
      lineColor:"00FF00",
      curvature:-1
      
    },
    {
      provinceCode:"XZ",
      markSize:5,
      markColor:"FF0000",
      lineWidth:250,
      lineColor:"00FF00",
      curvature:-1
      
    }		
  ]
});
console.log(res);
```

- 矢量工具

```javascript
// 开启矢量工具
  await App.Scene.RunAction('EditShapeAction', {
    Eid: entity.eid
  });
  await App.Renderer.RegisterSceneEvent([
    {
      name: 'EditShapeEvent',
      func: async (res) => {
        console.log("EditShapeEvent", res);
        cache.set('EditShapeEventCache', res.result.editPoints?.filter(v => v.state === 'Edit'));
      }
    }
  ]);
  /**
  {
  "editPoints":
  [
  {"pointIndex":0,"point":[25046.149130655285,-8652.5433520855458,-2.6794229764726483],"state":"Edit","attribute":{}},
  {"pointIndex":1,"point":[25048.429555139999,-8661.3853958300006,-3.7411248399999999],"state":"None","attribute":{}},
  {"pointIndex":2,"point":[25047.033014739998,-8660.5509877599998,-3.7646360600000004],"state":"None","attribute":{}}],
  "bClosed":false,
  "EntityType":"BP_PathEntity_C"
  }
  */

// 增删矢量点位
await App.Setting.SetEditShapeActionSetting({
  lineWidth: 1,
  editMode: 'InsertOrDelete'
});

// 移除矢量点位
await App.Tools.Shape.UpdateShapePoints(Obj, "Remove");   // Obj为定义的矢量点位对象

// 关闭矢量工具
await App.Scene.EndAction();
```

## Topic: 设置 (id: 1409)

- 设置日志级别

```javascript
App.Debug.SetLogMode("high");  // none, normal, high,none:不打印日志
```

- 设置键盘

```javascript
// 键盘事件是否开启（默认关闭）
App.System.SetDefaultKeyboard(false);  // true, false
```

```javascript
// 当键盘事件被启用时，是否开启浏览器的 F1 - F12 功能键（默认关闭）
App.System.SetDefaultBrowserFunctionKeyboard(false);  // true, false
```

- 设置渲染模式

```javascript
await App.Renderer.SetRendererMode('fixed', [1920, 1080]);
```

- 设置帧率

```javascript
await App.Renderer.SetFrameRateLimit(40); //范围 [30~60]
```

- 设置码率

```javascript
await App.Renderer.SetBitrate(10); //范围 [5~15]
```

- 设置接口请求超时时长

```javascript
// 用于大数据api接口调用
await App.System.SetTimeoutTime(30000); //30s; 默认: 10s
```

- 设置场景音效

```javascript
await App.Setting.SetAudioVolume(50); //范围 [0~100]
```

- 设置场景精度

```javascript
//场景精度默认100
const res = await App.Setting.SetScreenPercentage(100);
console.log(res);
```

- 获取场景精度

```javascript
const res = await App.Setting.GetScreenPercentage();
console.log(res);
```
