---
name: gis-api-core-operations
description: 处理 GIS API 2.1.0 的核心能力编排与排障。用于 GisApi 插件安装、GeoLayer 图层接入、图层更新/显隐/偏移/高亮与 GIS 事件联动实现。
---

# GIS 核心操作子技能

第一轮编写/补完仅参考在线管理文档：`https://wdpapidoc-admin.51aes.com/manual/doc`。

## 前置安装门禁（强制）

- 执行任意 GIS API 前，必须先完成 `App.Plugin.Install(GisApi)`。
- 若未确认插件安装成功，不得继续执行 `GeoLayer` 创建、更新、显隐、事件监听。
- 首次进入 GIS 调用链时，必须输出安装结果与插件版本信息（`App.gis.GetVersion()`）。

## 能力范围（已补完）

1. 插件与版本
- `App.Plugin.Install(GisApi)` / `App.Plugin.Uninstall(...)`
- `App.gis.GetVersion()`

2. GeoLayer 接入
- `new App.GeoLayer({...})` 创建图层对象
- `App.Scene.Add(entityObj)` 加载图层
- 支持 `shp / WFS / geojson / wms / WMTS / 3DTiles`

3. 图层通用行为
- `SetLayerVisible`
- `SetGeoLayerOffset` / `GetGeoLayerOffset`
- `SetGeoLayerRotation`
- `Update`
- `Delete` / `App.gis.RemoveAll()`

4. 要素与事件
- `SetGeoLayerFeatureHighlight`
- `OnCreateGeoLayerEvent`
- `OnGeoLayerFeatureClicked`

## 参考资料（相对路径）

- `../api_code_example/official-gis-full.md`（首选）
- `../api_code_example/gis-core-operations.template.js`

## 执行流程

1. 先确认基础 App 已初始化并可渲染。
2. 安装 GisApi 插件并记录插件 id。
3. 按图层类型构造 `GeoLayer` 并 `Scene.Add`。
4. 绑定 GIS 事件后再执行高亮、偏移、更新等业务行为。
5. 输出调用链、关键参数、验证结果。

## 输出要求

始终输出：
1. GIS 目标（图层类型、数据源 URL、关键对象）
2. 命中的接口名与最小调用链
3. 最小可运行代码
4. 验证步骤与通过标准
5. 缺失信息（如仍需用户补充）
