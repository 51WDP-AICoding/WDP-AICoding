---
name: gis-api-core-operations
description: 处理 GIS API 的核心能力编排与排障。用于 GisApi 插件安装、GeoLayer 图层接入、图层更新/显隐/偏移/高亮与 GIS 事件联动实现。API版本请参考 ../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md
---

# GIS 核心操作子技能

## 强制性要求

1. 必须使用`new WdpApi()`创建实例
2. 必须在`Renderer.Start()`之前调用`App.Plugin.Install(GisApi)`安装GIS插件
3. 必须验证插件安装成功后才能调用GIS相关接口
4. 必须在场景就绪后(progress === 100)才执行GIS业务操作
5. 必须使用官方文档指定的方法名、参数结构和返回字段
6. 🚨 **npm 安装时必须使用 `@wdp-api/gis-api`，具体版本请参考 `../wdp-api-initialization-unified/SKILL.md`**

⚠️ 如果上述任何一点不满足，GIS相关代码将无法正常工作！

---

## 1. GIS插件安装

```javascript
import GisApi from '@wdp-api/gis-api';

// 安装GIS插件
const res = await App.Plugin.Install(GisApi);
console.log(res.result.id);  // 插件ID

// 获取插件版本
const versionRes = await App.gis.GetVersion();
console.log('GIS插件版本:', versionRes?.result);

// 插件卸载
await App.Plugin.Uninstall(res.result.id);
```

---

## 2. 创建GeoLayer图层

### 2.1 矢量点图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "point.shp",  // 支持在线地址、绝对路径(file:///D:/test/point.shp)、相对路径
  "geoLayerType": "shp",       // shp | WFS | geojson
  "geoLayerParams": {
    "serviceLayerName": "",
    "featureType": "point",    // point | line | Polygon
    "needGCJOffset": false,
    "layerHeightOffset": 500,
    "batchFeatureNum": 40      // 合批处理要素数量
  },
  "geoFeatureStyle": {
    "styleDesc": "Default",    // Default(不透明) | Default1(半透明)
    "pointStyle": {
      "pointColor": "00f1d0eb",
      "pointSize": 100
    }
  }
});
const res = await App.Scene.Add(entityObj);
```

### 2.2 矢量线图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "line.shp",
  "geoLayerType": "shp",
  "geoLayerParams": {
    "featureType": "line",
    "needGCJOffset": false,
    "layerHeightOffset": 500,
    "batchFeatureNum": 40
  },
  "geoFeatureStyle": {
    "styleDesc": "Default",
    "lineStyle": {
      "lineColor": "00f1d0eb",
      "lineWidth": 10
    }
  }
});
const res = await App.Scene.Add(entityObj);
```

### 2.3 矢量面图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "buildingClip.shp",
  "geoLayerType": "shp",
  "geoLayerParams": {
    "featureType": "Polygon",
    "needGCJOffset": false,
    "batchFeatureNum": 40,
    "layerHeightOffset": 500
  },
  "geoFeatureStyle": {
    "styleDesc": "Default",
    "polygonStyle": {
      "filledColor": "f8e4ffff",
      "bOutline": true,
      "outlineColor": "ffa5c8ff",
      "outlineWidth": 1,
      "bExtrude": true,
      "extrudeHeight": 100,
      "extrudeHeightField": "height"  // 与extrudeHeight二选一
    }
  }
});
const res = await App.Scene.Add(entityObj);
```

### 2.4 WMS图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "http://cim.51aes.com/geoserver/Shanghai/wms?layers=Shanghai:clip",
  "geoLayerType": "wms",
  "geoLayerParams": {
    "layerHeightOffset": 500
  }
});
const res = await App.Scene.Add(entityObj);
```

### 2.5 WMTS图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "https://t0.tianditu.gov.cn/img_c/wmts?tk=xxx&request=GetCapabilities&service=wmts",
  "geoLayerType": "WMTS",
  "geoLayerParams": {
    "layerHeightOffset": 500
  }
});
const res = await App.Scene.Add(entityObj);
```

### 2.6 3D Tiles图层
```javascript
const entityObj = new App.GeoLayer({
  "geoLayerUrl": "http://10.67.8.110:9003/model/tl10qi4Qf/tileset.json",
  "geoLayerType": "3DTiles",
  "geoLayerOperation": {
    "tile_MaximumScreenSpaceError": 8  // 越小越倾向于加载高层级瓦片
  },
  "geoFeatureStyle": {
    "filterColor": "eaff60"
  },
  "geoLayerParams": {
    "layerHeightOffset": 500
  }
});
const res = await App.Scene.Add(entityObj);
```

---

## 3. 图层操作

```javascript
// 缓存图层对象以便后续操作
const cache = new Map();
if (res.success) cache.set('geolayer', entityObj);
const geoLayer = cache.get('geolayer');

// 设置图层显隐
await geoLayer.SetLayerVisible(false);  // 隐藏
await geoLayer.SetLayerVisible(true);   // 显示

// 设置图层偏移
await geoLayer.SetGeoLayerOffset({ "geoLayerOffset": [430, 215, 15] });  // XYZ轴偏移，单位：米

// 获取图层偏移
await geoLayer.GetGeoLayerOffset();

// 设置图层旋转
await geoLayer.SetGeoLayerRotation({ "GeoLayerRotation": [1, 0, 0] });  // pitch, yaw, roll

// 更新图层样式
await geoLayer.Update({
  "geoFeatureStyle": {
    "styleDesc": "Default",
    "polygonStyle": {
      "filledColor": "ffff00ff",
      "bOutline": true,
      "outlineColor": "00ffffff",
      "outlineWidth": 1,
      "bExtrude": true,
      "extrudeHeight": 100
    }
  }
});

// 删除图层
await geoLayer.Delete();

// 删除全部图层
await App.gis.RemoveAll();
```

---

## 4. 要素高亮与事件

### 4.1 要素高亮
```javascript
// 高亮指定要素
await geoLayer.SetGeoLayerFeatureHighlight({
  "featureId": "0",        // 要素id，通过点击事件获取
  "highlightColor": "ffff00",
  "bHighlight": true       // true=高亮，false=取消高亮
});
```

### 4.2 要素点击事件
```javascript
// 方式1：通过 RegisterSceneEvent
await App.Renderer.RegisterSceneEvent([{
  name: 'OnGeoLayerFeatureClicked',
  func: async (res) => {
    // GIS 2.1.0+ 新增 featureType 字段区分点/线/面
    const { FeatureId, featureType, BasicInfo } = res.result;
    console.log(`要素类型: ${featureType}`);  // point | line | polygon
  }
}]);

// 方式2：通过图层对象 onClick
geoLayer.onClick(async (ev) => {
  console.log(ev);
});
```

### 4.3 图层创建错误事件
```javascript
await App.Renderer.RegisterSceneEvent([{
  name: 'OnCreateGeoLayerEvent',
  func: async (res) => {
    // geoLayerType 类型错误回调
    console.log('图层创建错误:', res);
  }
}]);
```

---

## 5. 图层聚焦

```javascript
await App.CameraControl.Focus({
  "rotation": {
    "pitch": -40,        // 俯仰角 [-90~0]
    "yaw": 0             // 偏航角 [-180~180]，0=正北
  },
  "distanceFactor": 0.8, // 视野参数 [0.1~1]，占满屏幕百分比
  "flyTime": 1,          // 过渡时长(秒)
  "entity": [geoLayer]   // 图层对象数组
});
```

---

## 6. 能力范围速查表

| 功能 | 方法 | 说明 |
|------|------|------|
| 安装插件 | `App.Plugin.Install(GisApi)` | 必须在Renderer.Start()之前 |
| 获取版本 | `App.gis.GetVersion()` | 返回GisApiJsSdk和GisApiScenePlugins版本 |
| 创建图层 | `new App.GeoLayer({...})` | 支持shp/WFS/geojson/wms/wmts/3DTiles |
| 添加图层 | `App.Scene.Add(geoLayer)` | 返回success和eid |
| 图层显隐 | `geoLayer.SetLayerVisible(bool)` | true=显示，false=隐藏 |
| 设置偏移 | `geoLayer.SetGeoLayerOffset({geoLayerOffset})` | XYZ轴偏移，单位：米 |
| 获取偏移 | `geoLayer.GetGeoLayerOffset()` | 返回当前偏移值 |
| 设置旋转 | `geoLayer.SetGeoLayerRotation({GeoLayerRotation})` | pitch/yaw/roll |
| 更新图层 | `geoLayer.Update({...})` | 更新样式或参数 |
| 删除图层 | `geoLayer.Delete()` | 删除单个图层 |
| 删除全部 | `App.gis.RemoveAll()` | 删除所有GIS图层 |
| 要素高亮 | `geoLayer.SetGeoLayerFeatureHighlight({...})` | 高亮指定要素 |
| 图层聚焦 | `App.CameraControl.Focus({entity:[geoLayer]})` | 相机聚焦到图层 |

---

## 7. 常见问题解决

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 图层不显示 | 坐标系统不匹配、URL不可访问 | 确认srs与场景坐标系统匹配；检查URL可访问性；尝试调整layerHeightOffset |
| 要素点击事件不触发 | 注册时机不当、图层不可见 | 确认在场景就绪后注册；验证图层可见；检查是否被遮挡 |
| 样式不符合预期 | 颜色格式错误 | 颜色使用RGBA字符串，如"00f1d0eb" |
| 3DTiles加载失败 | 路径错误或数据量大 | 检查tileset.json路径；大数据量需更长加载时间 |

---

## 8. 参考资料

- `./GIS_PLUGIN_INSTALLATION.md` - GIS 插件安装最佳实践
- `../official_api_code_example/official-gis-full.md` - **GIS API 完整文档（真值来源）**
- `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` - 在线文档访问说明
