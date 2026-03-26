---
name: wdp-api-material-settings
description: 处理 WDP 材质设置 API 的实现与排障。用于材质实例创建、材质拾取、模型材质替换和材质高亮控制；涉及模型材质变更时使用本技能。
---

# WDP 材质设置子技能

覆盖范围：模型材质替换、模型材质高亮。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 目标模型对象可检索（`GetByEids` 或现有对象引用）。
3. 材质替换前可获取 `meshName/materialIndex/materialEid`。

## 标准流程

1. 创建材质实例。
- `new App.Material({ seedId })` 后 `App.Scene.Add(material)`。

2. 获取目标材质槽位。
- 方式A（工具模式）：通过 `App.Tools.PickerMaterial.Start/GetMaterials/End`。
- 方式B（事件模式）：注册 `OnWdpMaterialHit` 事件。抛出的 `res.result` 包含精确被点击面的 `eid`/`meshName`/`materialIndex`，这是实现“点击模型某面改变特定部分颜色”的关键链路。
- 方式C（数据查询）：通过 `App.DataModel.Material.GetList([modelObj])`。

3. 执行替换或高亮。
- 替换：`SetModelMaterial` 或 `Apply`。
- 高亮：`SetEntitySlotsHighlight`。

4. 校验结果。
- 对象级回读：`modelObj.GetMaterial()`。
- 记录替换目标和结果状态。

## 质量门槛

1. 替换前必须校验目标槽位数组非空。
2. 材质高亮与替换不能混用同一临时参数对象。
3. 批量操作前先输出目标 EID 和 mesh 摘要。

## 高频问题

1. 替换接口成功但模型无变化。
- 检查 `meshName/materialIndex` 是否匹配目标模型。

2. 高亮未生效。
- 检查 `MaterialIndex` 与 `entity` 对象类型。

3. 拾取结果为空。
- 检查 `PickerMaterial` 是否已启动，且场景中有可拾取材质。

## 参考资料（相对路径）

- `../official_api_code_example/official-material-settings.md`

## 输出要求

始终输出：
1. 材质目标范围（对象/槽位）
2. 替换或高亮调用链路
3. 验证步骤与结果
4. 回滚建议（如有）