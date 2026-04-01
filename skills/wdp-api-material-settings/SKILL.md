---
name: wdp-api-material-settings
description: 处理 WDP 材质设置 API 的实现与排障。用于材质实例创建、材质拾取、模型材质替换和材质高亮控制；涉及模型材质变更时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述材质设置的操作流程（创建→获取槽位→替换/高亮）
- ✅ 说明获取材质槽位的多种方式（工具/事件/查询）
- ✅ 提供质量门槛和最佳实践
- ✅ 列出常见问题和解决方案

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-material-settings.md`

---

# WDP 材质设置子技能

覆盖范围：模型材质替换、模型材质高亮。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 目标模型对象可检索（`GetByEids` 或现有对象引用）。
3. 材质替换前可获取 `meshName/materialIndex/materialEid`。

## 高亮方法选型指南（重要）

| 高亮类型 | 适用 Skill | 方法 | 适用场景 |
|---------|-----------|------|---------|
| **模型材质高亮** | `wdp-api-material-settings` | `SetEntitySlotsHighlight` | 模型 mesh slot 级别高亮，精确控制材质 |
| **BIM 构件高亮** | `wdp-api-bim-unified` | `SetNodeHighLight` / `SetNodesHighlight` | BIM 模型内部构件高亮 |
| **BIM 房间高亮** | `wdp-api-bim-unified` | `SetRoomHighLight` | BIM 房间/空间高亮 |
| **实体高亮** | `wdp-api-entity-general-behavior` | `SetEntityHighlight` | 普通实体（覆盖物/模型）高亮 |
| **实体描边** | `wdp-api-entity-general-behavior` | `SetEntityOutline` | 实体边缘发光轮廓 |
| **Tiles 节点高亮** | `wdp-api-layer-models` | `SetNodesHighlight` | AES 底板 Tiles 节点高亮 |
| **Tiles 图层高亮** | `wdp-api-layer-models` | `SetLayersHighlight` | AES 底板图层高亮 |

**⚠️ 注意**：不同高亮方法属于不同的 API 命名空间和 Skill 域，不可混用。材质高亮 (`SetEntitySlotsHighlight`) 专门用于模型材质级别，与 BIM 构件高亮 (`SetNodeHighLight`) 是不同的体系。

---

## 标准流程

### 1. 创建材质实例
- **方法**：`new App.Material({seedId})` → `App.Scene.Add(material)`
- **获取 materialEid**：从返回结果中提取 `result.object.materialEid`

> 📖 **完整代码示例**：参考 `../official_api_code_example/official-material-settings.md`

### 2. 获取目标材质槽位

| 方式 | 方法 | 适用场景 |
|------|------|---------|
| 工具模式 | `App.Tools.PickerMaterial.Start/GetMaterials/End` | 交互式拾取 |
| 事件模式 | `OnWdpMaterialHit` 事件监听 | 点击触发 |
| 数据查询 | `App.DataModel.Material.GetList` | 批量查询 |

> 📖 **完整 API 签名**：参考 `../official_api_code_example/official-material-settings.md`

### 3. 执行替换或高亮

| 操作 | 方法 | 说明 |
|------|------|------|
| 同类替换 | `SetModelMaterial({TargetMaterials, MaterialEid})` | 批量替换相同材质 |
| 批量赋予 | `Apply(jsondata)` | 不同材质到不同模型 |
| 材质高亮 | `SetEntitySlotsHighlight([{entity, meshName, MaterialIndex, bHighlight}])` | MaterialIndex: -1=所有材质 |

> 📖 **完整 API 签名**：参考 `../official_api_code_example/official-material-settings.md`

### 4. 校验结果
- **方法**：`modelObj.GetMaterial()`
- **说明**：对象级回读材质信息

> 📖 **完整代码示例**：参考 `../official_api_code_example/official-material-settings.md`

## 质量门槛

1. 替换前必须校验目标槽位数组非空。
2. 材质高亮与替换不能混用同一临时参数对象。
3. 批量操作前先输出目标 EID 和 mesh 摘要。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 替换接口成功但模型无变化 | meshName/materialIndex 不匹配 | 检查 `meshName` 和 `materialIndex` 是否与目标模型匹配；确认材质槽位存在 |
| 高亮未生效 | MaterialIndex 或 entity 对象类型错误 | 检查 `MaterialIndex` 是否正确；确认 `entity` 对象类型支持高亮操作 |
| 拾取结果为空 | PickerMaterial 未启动或无可拾取材质 | 检查 `PickerMaterial` 是否已启动；确认场景中有可拾取材质；检查拾取操作是否正确执行 |

## 参考资料（相对路径）

- `../official_api_code_example/official-material-settings.md`

## 输出要求

始终输出：
1. 材质目标范围（对象/槽位）
2. 替换或高亮调用链路
3. 验证步骤与结果
4. 回滚建议（如有）