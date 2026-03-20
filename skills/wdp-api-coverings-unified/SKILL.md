---
name: wdp-api-coverings-unified
description: 处理 WDP 覆盖物 API 的实现与排障。用于 POI、标记、热区、线条、多边形、文本标签、区域轮廓、热力图、路径、粒子特效、灯光、3D文字等覆盖物的创建、配置与控制；涉及场景标注和交互覆盖物时使用本技能。
---

# WDP 覆盖物子技能

覆盖范围：POI、标记、热区、线条、多边形、文本标签、Window、区域轮廓(Range)、热力图(HeatMap/ColumnarHeatMap)、路径(Path)、迁徒图(Parabola)、粒子特效(Particle/Effects)、灯光(Light)、3D文字(Text3D)、可视域(Viewshed)、栅格图(Raster)、高亮区域(HighlightArea)等。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载（`SceneReady(100%)`）。
3. 覆盖物参数已完成基础校验。

## 标准流程

1. 创建覆盖物。
- **POI**：`new App.Poi(opt)` → `App.Scene.Add(poi, {calculateCoordZ: {...}})`
- **Window**：`new App.Window(opt)` → `App.Scene.Add(window, {calculateCoordZ: {...}})`
- **标记**：`App.Marker.Create(opt)`。
- **热区**：`App.HotZone.Create(opt)`。
- **线条**：`App.Line.Create(opt)`。
- **多边形**：`App.Polygon.Create(opt)`。
- **文本标签**：`App.Label.Create(opt)`。
- **区域轮廓**：`new App.Range(opt)` → `App.Scene.Add(range, {calculateCoordZ: {...}})`
- **热力图**：`new App.HeatMap(opt)` → `App.Scene.Add(heatmap, {calculateCoordZ: {...}})`
- **柱状热力图**：`new App.ColumnarHeatMap(opt)` → `App.Scene.Add(heatmap, {calculateCoordZ: {...}})`
- **路径**：`new App.Path(opt)` → `App.Scene.Add(path, {calculateCoordZ: {...}})`
- **迁徒图**：`new App.Parabola(opt)` → `App.Scene.Add(parabola, {calculateCoordZ: {...}})`
- **粒子特效**：`new App.Particle(opt)` 或 `new App.Effects(opt)`
- **灯光**：`new App.Light(opt)`
- **3D文字**：`new App.Text3D(opt)`
- **可视域**：`new App.Viewshed(opt)`
- **栅格图**：`new App.Raster(opt)`
- **高亮区域**：`new App.HighlightArea(opt)`

2. 配置覆盖物参数。
- 使用 `Update/Set` 系列方法更新参数。
- POI/Window/Range 等使用 `obj.Update(json)`。

3. 控制覆盖物状态。
- 显隐：`SetVisible(boolean)` 或 `Show/Hide`。
- 高亮：`SetHighlight`。
- 获取信息：`Get()`。

4. 销毁覆盖物。
- 使用 `Delete()` 方法销毁覆盖物。

## 典型场景索引

### 场景1：POI + Window 交互组合
**典型用法**：POI 作为场景中的可点击标记，点击后弹出 Window 显示详情或视频。

**索引路径**：
1. 创建 POI → 绑定 `onClick` 事件
2. 在点击回调中创建 Window
3. 参考：`../official_api_code_example/official-entity-coverings.md` 中 `[demo]POI添加Window`

**关键方法**：
- `poiObj.onClick(callback)` - POI 点击事件绑定
- `new App.Window({...})` - 创建内嵌窗口
- `App.Scene.Creates([poiData, windowData])` - 批量创建

### 场景2：区域标注（Range）
用于在场景中标注围栏、区域范围等。

### 场景3：热力图展示（HeatMap）
用于展示区域热度分布。

### 场景4：路径展示（Path）
用于展示轨迹、路线等。

## 常用覆盖物快速参考

### POI（兴趣点标记）
```javascript
const poi = new App.Poi({
  location: [121.500, 31.238, 10],
  poiStyle: {
    markerNormalUrl: 'http://example.com/marker.png',
    markerActivateUrl: 'http://example.com/marker_active.png',
    markerSize: [60, 90]
  },
  entityName: 'myPoi',
  customId: 'poi-001',
  bVisible: true
});
const res = await App.Scene.Add(poi, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
// 方法：Update, SetVisible, Get, Delete, onClick
```

### Window（内嵌窗口）
```javascript
const window = new App.Window({
  location: [121.500, 31.238, 10],
  windowStyle: {
    url: 'http://example.com/page.html',
    size: [500, 350]
  }
});
const res = await App.Scene.Add(window, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 50 }
});
```

### Range（区域轮廓）
```javascript
const range = new App.Range({
  polygon2D: {
    coordinates: [[[121.45, 31.23], [121.46, 31.23], [121.46, 31.24], [121.45, 31.24]]]
  },
  rangeStyle: {
    type: 'loop_line',
    height: 200,
    color: 'ff3772ff'
  }
});
const res = await App.Scene.Add(range, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

### HeatMap（热力图）
```javascript
const heatmap = new App.HeatMap({
  heatMapStyle: {
    type: 'fit',
    brushDiameter: 2000,
    mappingValueRange: [1, 100]
  },
  points: { features: [{point: [121.5, 31.2, 0], value: 80}] }
});
const res = await App.Scene.Add(heatmap, {
  calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 }
});
```

## 质量门槛

1. 创建前检查参数合法性。
2. 参数更新前做类型和范围校验。
3. 批量操作前先输出目标清单摘要。
4. **重要**：POI/Window/Range 等覆盖物需要通过 `App.Scene.Add()` 添加到场景，并建议配置 `calculateCoordZ` 参数确保正确显示高度。

## 高频问题

1. **覆盖物创建成功但无显示**。
   - 检查坐标系和位置参数。
   - 检查是否配置了 `calculateCoordZ` 参数（对于需要高度的覆盖物）。
   - 检查场景是否已完成加载（`SceneReady(100%)`）。

2. **POI/Window 等覆盖物添加后位置不对**。
   - 确保使用 `calculateCoordZ` 参数指定高度参考（surface/ground/altitude）。
   - 检查 `coordZOffset` 偏移值是否合理。

3. **覆盖物更新无效**。
   - 检查覆盖物实例是否有效，参数是否正确。
   - 确认已正确获取到 `App.Scene.Add()` 返回的实例对象。

4. **覆盖物交互问题**。
   - 检查事件注册和回调函数。
   - POI/Particle 等支持 `onClick` 事件绑定。

5. **POI 点击后未弹出 Window**。
   - 确认已使用 `poiObj.onClick()` 绑定事件。
   - 确认 Window 的 URL 和位置参数正确。
   - 参考 `official-entity-coverings.md` 中的 `[demo]POI添加Window` 示例。

## 参考资料（相对路径）

- `../official_api_code_example/official-entity-coverings.md`

## 输出要求

始终输出：
1. 覆盖物类型与配置摘要
2. 调用链路与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）
