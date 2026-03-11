---
name: bim-api-core-operations
description: 处理 BIM API 2.1.1 的模型/构件/空间核心能力编排与排障。用于 BIM 接入、模型行为调用、构件联动与空间操作实现。
---

# BIM 核心操作子技能

第一轮编写/补完仅参考在线管理文档：`https://wdpapidoc-admin.51aes.com/manual/doc`。

## 版本与来源约束（强制）

- 具体方法名、参数结构、枚举值、返回字段仅以官方在线文档为准。
- 历史案例只用于流程优化（时序、门禁、回滚），不作为方法真值来源。

## 前置安装门禁（强制）

- 执行任意 BIM API 前，必须先完成 `App.Plugin.Install(BimApi)`。
- 若未确认插件安装成功，不得继续执行模型/构件/空间相关接口。
- 首次进入 BIM 调用链时，必须输出安装结果与失败信息（如有）。
- 若仅命中 BIM 核心能力且未提供安装上下文，应先路由 `../wdp-bim-plugin-and-roam/SKILL.md` 完成安装校验。

## 能力范围（已补完）

1. 模型行为
- 模型列表、新加载、临时加载/卸载、按 metadata 过滤
- 激活、移动、旋转、缩放、聚焦、显隐、落地
- 剖切开启/重置/关闭
- 拆楼开启/关闭
- 模型卸载

2. 构件行为
- 构件树获取、树搜索、列表搜索
- 构件属性、父子节点定位
- 按属性筛构件
- 构件聚焦、显隐、反选显隐、全部显示
- 构件高亮、坐标获取、位置移动

3. 空间操作
- 按 Room 属性跨模型获取空间
- 空间高亮
- 空间聚焦

## 参考资料（相对路径）

- `../api_code_example/official-bim-full.md`（首选）
- `../api_code_example/official-bim-core-operations.md`
- `../api_code_example/bim-core-operations.template.js`
- `../api_code_example/bim-model-behaviors.template.js`
- `../api_code_example/bim-component-space.template.js`

## 执行流程

1. 先确认 `BimApi` 插件安装成功（未安装则先安装）。
2. 再确定目标实体来源（`eid` 或新加载 `Hierarchy`）。
3. 按任务域选择调用链：模型行为 / 构件行为 / 空间操作。
4. 严格使用 `official-bim-full.md` 的方法名与参数结构。
5. 每次输出都给出：调用链、关键参数、验证结果。

## 输出要求

始终输出：
1. 目标 BIM 标识（`assetId/seedId/eid`）
2. 命中的 BIM 分类与接口名
3. 最小可运行代码
4. 验证步骤与通过标准
5. 缺失信息（如仍需用户补充）
