---
name: wdp-api-layer-models
description: 处理 WDP 图层/模型 API 的实现与排障。用于图层显隐/高亮/描边、单体（node）控制，以及静态模型、骨骼模型、工程摆放模型与实例对象的更新控制；涉及图层和模型操作时使用本技能。
---

# WDP 图层/模型子技能

覆盖范围：图层/单体控制器、静态模型、骨骼模型、工程摆放模型、工程摆放实例。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载，目标实体可检索。
3. 节点级操作前先确认 `nodeIds` 有效。

## 标准流程

1. 获取目标对象。
- 图层对象：`App.Scene.GetTiles()` 后定位 `Tiles/Project/EarthTiles`。
- 模型对象：`App.Scene.GetByEids([...])`。

2. 执行图层行为。
- 图层显隐：`SetLayersVisibility`。
- 图层高亮：`SetLayersHighlight`。
- 图层描边：`SetLayersOutline`（版本能力受限时做分支）。

3. 执行单体（node）行为。
- `SetNodesOutline/SetNodesHighlight/SetNodesVisibility`（对象级或工厂级）。

4. 执行模型对象行为。
- `Update/SetRotator/SetScale3d/SetVisible/Get/Delete`。

## 质量门槛

1. Node 行为必须先做 `nodeIds` 非空校验。
2. 批量模型更新前先输出目标 EID 摘要。
3. 跨引擎能力差异（如 AES5/AES6）必须显式分支处理。

## 高频问题

1. 图层接口返回成功但表现无变化。
- 检查目标层名称和当前引擎能力支持范围。

2. node 控制无效。
- 检查 nodeId 来源是否匹配当前实体版本。

3. 工程摆放模型更新异常。
- 检查对象类型（ProjectModel/ProjectInstance）和参数字段差异。

## 参考资料（相对路径）

- `../official_api_code_example/official-layer-models.md`

## 输出要求

始终输出：
1. 图层/模型目标范围
2. 关键调用链路与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）