---
name: wdp-api-entity-coverings
description: 处理 WDP 实体覆盖物 API 的实现与排障。用于规范实时视频、Window、POI 及其 Web 组件（VideoUI/WindowUI/PoiUI）的创建、更新、显隐、删除与事件联动；涉及覆盖物接入时使用本技能。
---

# WDP 实体覆盖物子技能

当前为完整范围（按官网“实体覆盖物”）：
- 第一批：实时视频、Window、POI 及对应 web 行为
- 第二批：场景特效、粒子特效、灯光特效、3D文字、可视域、路径
- 第三批：迁徒图、区域轮廓、圆形区域轮廓、区域热力图、柱状热力图、点云热力图、路径热力图、3D网格热力图、栅格图、高亮区域

## 前置条件

1. `App` 已初始化且渲染可用。
2. 覆盖物对象在 `SceneReady(100%)` 后执行批量业务行为。
3. 坐标与样式参数完成最小合法性检查。

## 标准流程

1. 创建覆盖物对象。
- 3D 覆盖物：`new App.RealTimeVideo / App.Window / App.Poi`。
- Web 组件：`new App.VideoUI / App.WindowUI / App.PoiUI`。

2. 执行添加与更新。
- 3D 覆盖物通过 `App.Scene.Add/Creates`。
- Web 组件通过 `App.Component.*.Add/Create/Creates`。

3. 执行行为与联动。
- 对象级 `Update/Get/SetVisible/Delete`。
- 必要时通过 `OnWebJSEvent` 做页面到场景的数据联动。

4. 校验结果。
- 记录对象数量、关键样式参数、事件回调结果。

## 质量门槛

1. 覆盖物批量创建前先打印目标清单。
2. 删除前保留对象 id/eid 摘要，避免误删。
3. UI 组件层与 3D 场景层冲突时优先确认 zIndex 与交互穿透。

## 高频问题

1. 覆盖物可见但样式异常。
- 检查样式字段结构、资源 URL 可访问性。

2. Web 组件显示正常但无法联动场景。
- 检查 `OnWebJSEvent` 注册时机和消息格式。

3. 批量创建后对象为空。
- 检查创建参数中的 `type`、坐标和必填样式字段。

## 参考资料（相对路径）

- `../api_code_example/official-entity-coverings.md`
- `../api_code_example/entity-coverings.template.js`

## 输出要求

始终输出：
1. 覆盖物类型与目标对象范围
2. 创建/更新/删除链路改动点
3. 验证步骤与结果
4. 回滚建议（如有）
