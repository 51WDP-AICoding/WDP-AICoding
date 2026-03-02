---
name: wdp-api-cluster
description: 处理 WDP 点聚合（私有化环境/lite）API 的实现与排障。用于聚合数据部署、效果配置、启动/更新/停止和周边搜索；涉及 Cluster 能力时使用本技能。
---

# WDP 点聚合子技能

覆盖范围：数据部署、聚合效果配置、周边搜索。

## 前置条件

1. 当前环境支持 `App.DataModel.Cluster`（私有化/lite 场景）。
2. 已确认 `gather` 命名与数据字段规范。
3. 坐标和条件字段通过最小合法性校验。

## 标准流程

1. 部署或更新数据。
- `Create / Update / Delete / Reset / DeleteGather`。

2. 配置并启动聚合。
- `Start(opt)` 启动。
- `Modify(opt)` 调整样式与筛选。
- `End()` 停止聚合。

3. 执行周边搜索。
- `SearchByPoint / SearchByLine / SearchByArea`。

4. 结果校验。
- `GetList / Count / GetGatherList` 校验数据与命中量。

## 质量门槛

1. 先建数据再启聚合，避免空聚合启动。
2. 搜索前校验 `queryId/gather/selector`。
3. 修改配置时只改必要字段，避免整体覆盖引发回归。

## 高频问题

1. 聚合无显示。
- 检查是否已 `Start`，以及 `gather` 数据是否存在。

2. 周边搜索结果为空。
- 检查坐标格式和 `distance` 单位，确认筛选条件是否过严。

3. 修改样式后不生效。
- 检查 `queryId` 是否对应当前聚合实例。

## 参考资料（相对路径）

- `../api_code_example/official-cluster.md`
- `../api_code_example/cluster.template.js`
- `../example/EXAMPLE_REFERENCE.md`

## 输出要求

始终输出：
1. 聚合数据范围（gather/queryId）
2. 调用链路与结果摘要
3. 验证步骤与结果
4. 回滚建议（如有）
