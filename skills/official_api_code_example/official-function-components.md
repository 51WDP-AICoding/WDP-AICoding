# Official excerpt sync: 功能组件

Version baseline: WDP API 2.3.0
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
// 参数1可选值：Sunny、Cloudy、PartlyCloudy、Overcast、LightRain、ModerateRain、HeavyRain、
// LightSnow、ModerateSnow、HeavySnow、Foggy、Sand、Haze、auto、自定义（需 UE 预先定义天气）
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

- 坐标点高度转换（TransformPointsByCoordZRef）

```javascript
/**
 * 将坐标点按指定高度参考系进行转换
 * @param points: Array (required) 坐标数组 [[lng, lat, z], ...]
 * @param coordZRef: string (required) 高度参考系：'surface'(表面), 'ground'(地面), 'altitude'(海拔)
 * @param coordZOffset: number (required) 高度偏移量（单位：米）
 * @returns {Promise<{success: boolean, result: {points: Array}}>} 转换后的坐标点
 */
const pointZ = await App.Tools.Coordinate.TransformPointsByCoordZRef({
    points: [[-154.29668951,483.69997297,34], [-154.32559641,483.7124225,2]],
    coordZRef: 'surface',  // surface:表面; ground:地面; altitude:海拔
    coordZOffset: 50       // 高度偏移(单位:米)
});
console.log(pointZ);
// 出参示例：
// {
//   success: true,
//   result: {
//     points: [[-154.29668951,483.69997297,84], [-154.32559641,483.7124225,52]]
//   }
// }
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

- 补充控制参数 (Stats 与 Snapshot)

```javascript
// 获取渲染实时状态
const res = await App.Renderer.GetStats();
console.log(res.result.framerate); // 实时帧率
console.log(res.result.bitrate); // 实时码率

// 截图
const snapshot = await App.Renderer.GetSnapshot([1920, 1080], 0.8);
```

- 设置渲染模式

```javascript
await App.Renderer.SetRendererMode('fixed', [1920, 1080]);
```
**参数说明：**

| 参数 | 值 | 类型 | 备注 |
|------|-----|------|------|
| type | full, fixed | string | 渲染模式: full: 自动适应容器尺寸; fixed: 固定分辨率 |
| resolution | [100~7680, 100~4320] | Integer | 渲染分辨率; fixed时有效<br>注: chrome浏览器最高支持4K: 4096 * 2160; 使用51Browser可以达到8K支持 7680 * 4320 |

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

---

## Topic: 屏幕拾取扩展（id: 1408-picker）

- 通过屏幕坐标拾取实体

```javascript
// 点击屏幕某点，获取该点对应的三维实体
const res = await App.Tools.Picker.PickByScreenPos([960, 540]);
console.log(res);
/*
  出参示例：
  {
    success: true,
    result: {
      eid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      oType: 'Static',
      object: EntityObject,
      worldPos: [12345.67, 23456.78, 5.2],
      location: [121.4853, 31.2384, 5.2]
    }
  }
*/
```

- 通过屏幕坐标拾取 AES Tiles 节点

```javascript
// 点击 AES 底板上的单体，获取其 nodeId
const res = await App.Tools.Picker.PickAesTilesNodeByScreenPos([960, 540]);
console.log(res);
// 出参: { success: true, result: { nodeId: '895874688', tilesObject, worldPos } }

// 框选屏幕区域，获取区域内所有 AES 底板单体的 nodeId
const res2 = await App.Tools.Picker.PickAesTilesNodesByRectangle({
  p0: [100, 100],  // 矩形左上角屏幕坐标
  p1: [800, 600]   // 矩形右下角屏幕坐标
});
console.log(res2);
// 出参: { success: true, result: { nodeIds: ['895874688', ...], tilesObject } }
```

- 通过屏幕坐标拾取材质

```javascript
const res = await App.Tools.Picker.PickMaterialByScreenPos([960, 540]);
console.log(res);
// 出参: { success: true, result: { materialId, materialName, eid } }
```

- 取线工具（PickerPolyline）

```javascript
// 启动取线工具（用户在场景中依次点击获取折线坐标）
await App.Tools.PickerPolyline.StartPickPolyline();

// 监听取线事件
App.Renderer.RegisterSceneEvent([{
  name: 'OnPickPolylineEvent',
  func: async (res) => {
    // res.result.polyline: [{ location, worldPos }, ...]
    console.log(res);
  }
}]);

// 获取已取线列表
const lines = await App.Tools.PickerPolyline.GetPickedPolylines();

// 结束取线工具
await App.Tools.PickerPolyline.EndPickPolyline();
```

---

## Topic: DOM 坐标绑定（Screen）（id: 1408-screen）

```javascript
// 将多个 DOM 元素批量绑定到场景中 GIS 坐标，随相机移动自动更新位置
// 注意：locations 和 enableChangeNotify 均为数组（支持批量）
const res = await App.Tools.Screen.AddScreenPosBound({
  locations: [
    [121.4853, 31.2384, 10],   // 第一个绑定坐标
    [121.4900, 31.2400, 10]    // 第二个绑定坐标
  ],
  enableChangeNotify: [true, false]  // 是否在坐标变化时触发通知（与 locations 一一对应）
});
// 出参: { success: boolean, result: { ids: ['xxx', 'yyy'] } }
// ids 为系统分配的绑定 ID，用于后续更新/移除

// 更新绑定坐标（通过 id）
await App.Tools.Screen.UpdateScreenPosBound({
  id: 'xxx',                          // AddScreenPosBound 返回的 id
  location: [121.4900, 31.2400, 15]
});

// 移除绑定
await App.Tools.Screen.RemoveScreenPosBound('xxx');
```

---

## Topic: 资产加载（AssetLoader）（id: 1408-asset）

```javascript
// 通过资产 ID 加载模型资产
const res = await App.DataModel.AssetLoader.LoadAssetById('asset-id-xxxx');
// 出参: { success: true, result: { assetId, meshSize: { x, y, z } } }  // 单位：厘米

// 替换场景中某实体的资产
await App.DataModel.AssetLoader.ReplaceAssetById(entityObj, 'new-asset-id-xxxx');

// 获取资产的网格尺寸
const sizeRes = await App.DataModel.AssetLoader.GetMeshSizeById('asset-id-xxxx');
// 出参: { success: true, result: { size: { x, y, z } } }  // 单位：厘米
```

---

## Topic: 云盘数据（DaaS）（id: 1408-daas）

```javascript
// 获取云盘文件列表
const res = await App.DataModel.DaaS.GetCloudDiskFileList({
  folderId: 'folder-id-xxxx',  // 文件夹 ID（可选，不填则获取根目录）
  fileType: 'model'            // 文件类型过滤（可选）：model / texture / all
});
/*
  出参示例：
  {
    success: true,
    result: {
      files: [{ fileId, fileName, fileType, size, updateTime }]
    }
  }
*/
```

---

## Topic: 数据聚合（Cluster）（id: 1408-cluster）

```javascript
// Cluster：对 DaaS 数据进行空间聚合展示（POI 聚合）
// 完整参数结构（来自 docx 原始文档）：
const clusterOpt = {
  openOnClick: true,          // 点击聚合点时是否展开
  mode: 'local',              // 数据模式：local（本地）/ remote（远程）
  url: 'http://your-daas-url', // DaaS 数据地址（mode=remote 时有效）
  aggregationLimit: 99,       // 聚合阈值：单个聚合点最多包含的数据量
  algorithm: {
    type: 'squareD',          // 聚合算法：squareD（方形距离）
    parameters: {
      squareD: { length: '30' }  // 聚合格子边长（屏幕像素）
    }
  },
  filters: {
    attr: [{
      queryId: 'AAA',                    // 查询 ID（自定义，用于区分多个过滤器）
      gather: 'guangzhou_poi',           // DaaS 数据集名称
      condition: { adname: ['白云区'] }, // 过滤条件（字段名: 值数组）
      calculateCoordZ: {
        coordZRef: 'surface',            // surface/ground/altitude
        coordZOffset: 40                 // 高度偏移（单位：米）
      },
      aggicon: {                         // 聚合点样式
        type: 'poi',
        poiStyle: {
          markerNormalUrl: 'http://example.com/agg_marker.png',
          markerSize: [50, 50],
          labelContent: ['{count}', 'ff0000ff', '16']  // 显示聚合数量
        }
      },
      covering: {                        // 单体点样式（展开后）
        type: 'poi',
        poiStyle: {
          markerNormalUrl: 'http://example.com/single_marker.png',
          markerSize: [25, 57],
          labelContent: ['{name}', '00ff00ff', '12']   // 显示数据字段
        }
      }
    }]
  }
};

// 启动聚合
await App.DataModel.Cluster.Start(clusterOpt);

// 结束聚合（清除所有聚合点）
await App.DataModel.Cluster.End();

// 修改聚合参数（所有参数均为可选，仅更新传入的字段）
await App.DataModel.Cluster.Modify({
  aggregationLimit: 50,
  algorithm: {
    type: 'squareD',
    parameters: { squareD: { length: '50' } }
  }
});
```
