# 官方脚本摘录（新版后台）：功能组件

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：功能组件，子项 id: 1406/1407/1408/1409）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 环境（id: 1406）

```javascript
await App.Environment.GetSkylightTime();
await App.Environment.SetSkylightTime('12:30', 3, false);
await App.Environment.GetSceneWeather();
await App.Environment.SetSceneWeather('Sunny', 3, false);
await App.Scene.SetSceneStyle('comic'); // comic / sketch / dark / ashy / false
```

## 控件（id: 1407）

```javascript
await App.System.GetInfomation();
await App.Plugin.Get();
await App.Renderer.GetStats();
await App.Scene.GetBoundingBox([obj1, obj2]);
```

```javascript
await App.Tools.MiniMap.Start(miniMapConfig);
await App.Tools.MiniMap.End();
await App.Tools.Compass.Start(compassConfig);
await App.Tools.Compass.End();
```

## 工具（id: 1408）

```javascript
await App.Tools.Coordinate.GISToCartesian([[121.47, 31.24, 90]]);
await App.Tools.Coordinate.CartesianToGIS([[5000, 5000, 20]]);
await App.Tools.Coordinate.GISToScreenPos([[121.47, 31.24, 90]]);
await App.Tools.Picker.PickWorldPointByScreenPos([480, 573]);
```

```javascript
await App.Tools.PickerPoint.StartPickPoint(true, true, 'surface');
await App.Tools.PickerPoint.GetPickedPoints('surface');
await App.Tools.PickerPoint.EndPickPoint();
await App.Tools.Measure.Start();
await App.Tools.Measure.End();
```

```javascript
await App.Scene.Section.Start({
  coordZRef: 'surface',
  strokeColor: '56a8ff',
  strokeWeight: 0.8,
  invert: false,
  transform: { location: [121.51, 31.25, 30], rotator: { pitch: 0, yaw: 30, roll: 0 }, scale3d: [1, 1, 1] }
});
await App.Scene.Section.End();
```

```javascript
await App.Renderer.GetSnapshot([1920, 1080], 0.8);
await App.Tools.Color.RgbaToHexa({ r: 100, g: 50, b: 200, a: 1 }, 'decimal');
await App.Tools.Color.HexaToRgba('f38929ff', 'decimal');
```

## 设置（id: 1409）

```javascript
App.Debug.SetLogMode('high'); // none / normal / high
App.System.SetDefaultKeyboard(false);
App.System.SetDefaultBrowserFunctionKeyboard(false);
await App.Renderer.SetRendererMode('fixed', [1920, 1080]);
await App.Renderer.SetFrameRateLimit(40); // 30~60
await App.Renderer.SetBitrate(10); // 5~15
await App.System.SetTimeoutTime(30000);
await App.Setting.SetAudioVolume(50); // 0~100
await App.Setting.SetScreenPercentage(100);
await App.Setting.GetScreenPercentage();
```
