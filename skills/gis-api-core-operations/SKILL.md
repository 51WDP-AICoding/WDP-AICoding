---
name: gis-api-core-operations
description: 处理 GIS API 的核心能力编排与排障。用于 GisApi 插件安装、GeoLayer 图层接入、图层更新/显隐/偏移/高亮与 GIS 事件联动实现。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述 GIS 插件安装的前置条件和强制性要求
- ✅ 说明 GeoLayer 图层的类型和能力范围
- ✅ 描述 GIS 图层操作的功能分类
- ✅ 列出 GIS 相关的事件类型
- ✅ 提供常见问题解决方案

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-gis-full.md`

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

## 前置条件

1. 已完成 `wdp-api-initialization-unified` 中的5步公式
2. 已执行 `npm install @wdp-api/gis-api`
3. 已执行 `await App.Plugin.Install(GisApi)` 且必须在 `Renderer.Start()` 之前

> 📖 **完整插件安装 API 签名**：参考 `../official_api_code_example/official-gis-full.md`

---

## 1. GeoLayer 图层类型

GeoLayer 支持多种数据源类型：

| 图层类型 | geoLayerType | 说明 |
|---------|-------------|------|
| 矢量点/线/面 | `shp` / `WFS` / `geojson` | Shapefile、WFS服务、GeoJSON |
| WMS | `wms` | Web Map Service |
| WMTS | `WMTS` | Web Map Tile Service |
| 3D Tiles | `3DTiles` | Cesium 3D Tiles 格式 |

**核心参数**：
- `geoLayerUrl` - 数据URL（支持在线地址、绝对路径、相对路径）
- `geoLayerParams.featureType` - 要素类型（point/line/Polygon）
- `geoLayerParams.layerHeightOffset` - 图层高度偏移（单位：米）
- `geoFeatureStyle` - 样式配置（颜色、线宽、挤出高度等）

> 📖 **完整 GeoLayer 创建 API 签名**：参考 `../official_api_code_example/official-gis-full.md`

---

## 2. 图层操作能力

**基础操作**：
- **显隐控制**：`SetLayerVisible(boolean)`
- **位置偏移**：`SetGeoLayerOffset({geoLayerOffset})` / `GetGeoLayerOffset()`
- **旋转控制**：`SetGeoLayerRotation({GeoLayerRotation})`
- **样式更新**：`Update({geoFeatureStyle})`
- **删除图层**：`Delete()` / `App.gis.RemoveAll()`

**要素交互**：
- **要素高亮**：`SetGeoLayerFeatureHighlight({featureId, highlightColor, bHighlight})`
- **点击事件**：`OnGeoLayerFeatureClicked`（GIS 2.1.0+ 支持 featureType 字段）
- **错误事件**：`OnCreateGeoLayerEvent`（图层创建错误回调）

**图层聚焦**：
- 使用 `App.CameraControl.Focus({entity: [geoLayer]})`

> 📖 **完整图层操作 API 签名**：参考 `../official_api_code_example/official-gis-full.md`

---

## 3. 能力范围速查表

| 功能 | 方法 | 说明 |
|------|------|------|
| 安装插件 | `App.Plugin.Install(GisApi)` | 必须在Renderer.Start()之前 |
| 获取版本 | `App.gis.GetVersion()` | 返回GIS插件版本信息 |
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

## 4. 常见问题解决

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 图层不显示 | 坐标系统不匹配、URL不可访问 | 确认srs与场景坐标系统匹配；检查URL可访问性；尝试调整layerHeightOffset |
| 要素点击事件不触发 | 注册时机不当、图层不可见 | 确认在场景就绪后注册；验证图层可见；检查是否被遮挡 |
| 样式不符合预期 | 颜色格式错误 | 颜色使用RGBA字符串，如"00f1d0eb" |
| 3DTiles加载失败 | 路径错误或数据量大 | 检查tileset.json路径；大数据量需更长加载时间 |

---

## 5. 参考资料

**代码生成前必须阅读**：
- `../official_api_code_example/official-gis-full.md` - **GIS API 完整文档（真值来源）**

**相关文档**：
- `./GIS_PLUGIN_INSTALLATION.md` - GIS 插件安装最佳实践
- `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` - 在线文档访问说明
