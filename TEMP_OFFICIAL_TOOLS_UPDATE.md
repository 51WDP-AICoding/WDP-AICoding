# 待插入/更新的 official Tools 代码演示内容草稿

## 1. official-spatial-understanding.md 更新内容

### 拾取点坐标 (PickerPoint)
- `StartPickPoint(coordinateShow, iconShow, coordZRef)`
- `GetPickedPoints(coordZRef)`

```javascript
// 1. 开启拾取：参数1(是否显示坐标文本), 参数2(是否显示默认图标), 参数3(高度基准)
await App.Tools.PickerPoint.StartPickPoint(true, true, 'surface')

// 2. 用户在画面中点击...
// 3. 结束拾取
await App.Tools.PickerPoint.EndPickPoint()

// 4. 获取拾取结果（指定与开启时一致的高度基准，或者默认0）
const res = await App.Tools.PickerPoint.GetPickedPoints('surface')
console.log('获取到的点数组：', res.result) 
// res.result: [[lng1, lat1, alt1], [lng2, lat2, alt2]...]
```

### 拾取折线 (PickerPolyline)
- `GetPickedPolylines(coordZRef)` 参数说明

```javascript
await App.Tools.PickerPolyline.StartPickPolyline()
// 绘制折线...
await App.Tools.PickerPolyline.EndPickPolyline()

// 传入高度参考基准获取折线结果（0 代表 surface）
const linesRes = await App.Tools.PickerPolyline.GetPickedPolylines(0)
linesRes.result.forEach(line => {
  console.log('折线节点坐标：', line.coordinates)
})
```

## 2. official-function-components.md 更新内容

### 指南针 (Compass) 修正
- 不要使用 `Show` / `Hide`，正确的 API 是 `Start` / `End` / `Get`。

```javascript
// 开启指南针（可自定义背景图和锚点位置）
const startRes = await App.Tools.Compass.Start({
  source: {
    bg: 'https://example.com/compass-bg.png', // 可选：替换表盘
  },
  display: {
    anchors: 'rightTop', // 定位锚点：leftTop, rightBottom 等
    position: [16, 16],  // 偏移量 [x, y]
    size: 60             // 尺寸
  }
})

// 获取指南针状态
const data = await App.Tools.Compass.Get()

// 关闭指南针
await App.Tools.Compass.End()
```

### 小地图 (MiniMap) 修正
- 同样修正为 `Start` / `End` / `Get`。

```javascript
// 开启小地图（需要配置小地图切片源、遮罩及 GIS 映射范围）
await App.Tools.MiniMap.Start({
  source: {
    bg: 'https://example.com/minimap-bg.png',
    mask: 'https://example.com/minimap-mask.png',
    frame: 'https://example.com/minimap-frame.png'
  },
  mappingAnchors: [
    [121.4, 31.2], // 西南角 GIS 坐标
    [121.5, 31.3]  // 东北角 GIS 坐标
  ],
  display: {
    position: [16, 16],
    size: 180
  }
})

// 关闭小地图
await App.Tools.MiniMap.End()
```

### 中国地图 (ChinaMap)
- 实现中国版图切换及省份高亮和迁徙图。

```javascript
// 1. 显示中国地图
await App.Tools.ChinaMap.Switch({ bChinaMap: true })

// 2. 高亮北京并设置名称颜色
await App.Tools.ChinaMap.HighlightProvince({
  provinceCode: '110000',
  bHighlight: true,
  color: '#FF5500FF'
})
await App.Tools.ChinaMap.SetProvinceNameVisibility({
  provinceCode: '110000',
  bVisible: true,
  color: '#FFFFFFFF'
})

// 3. 创建迁徙图
await App.Tools.ChinaMap.CreateMigration({
  migrationId: 'migration_001',
  type: 0,                   // 0 迁入，1 迁出
  hubProvinceCode: '110000', // 枢纽省份（北京）
  bGathered: true,           // 是否聚合模式
  peripheralProvincesInfo: [
    {
      provinceCode: '440000', // 周边省份（广东）
      markSize: 10, markColor: '#FF0000FF', 
      lineWidth: 2, lineColor: '#00FF00FF', curvature: 0.5
    }
  ]
})
```

### 坐标辅助系统 (CoordAide) 修正
- 在指定的实体上显示世界坐标轴。

```javascript
// 传入包含需要显示坐标轴的实体数组 (entity)
await App.Tools.CoordAide.Display({
  entity: [myPoiObj.result.object], 
  coordZRef: 0,
  coordZ: 0
})

// 清除所有的辅助坐标轴
await App.Tools.CoordAide.Clear()