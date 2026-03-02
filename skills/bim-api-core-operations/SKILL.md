---
name: bim-api-core-operations
description: 处理 BIM API 2.1.1 的模型/构件/空间核心能力编排与排障。用于 BIM 接入、模型行为调用、构件联动与空间操作实现。
---

# BIM 核心操作子技能

第一轮编写/补完仅参考在线管理文档：`https://wdpapidoc-admin.51aes.com/manual/doc`。

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

1. 先确定目标实体来源（`eid` 或新加载 `Hierarchy`）。
2. 按任务域选择调用链：模型行为 / 构件行为 / 空间操作。
3. 严格使用 `official-bim-full.md` 的方法名与参数结构。
4. 每次输出都给出：调用链、关键参数、验证结果。

## 输出要求

始终输出：
1. 目标 BIM 标识（`assetId/seedId/eid`）
2. 命中的 BIM 分类与接口名
3. 最小可运行代码
4. 验证步骤与通过标准
5. 缺失信息（如仍需用户补充）
