---
name: wdp-api-cluster
description: 处理 WDP 点聚合（私有化环境/lite）API 的实现与排障。用于聚合数据部署、效果配置、启动/更新/停止和周边搜索；涉及 Cluster 能力时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述点聚合的操作流程（数据部署→配置启动→周边搜索）
- ✅ 说明 API 方法分类（数据/配置/搜索）
- ✅ 提供质量门槛和最佳实践
- ✅ 列出常见问题和解决方案

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-cluster.md`

---

# WDP 点聚合子技能

覆盖范围：数据部署、聚合效果配置、周边搜索。

## 前置条件

1. 当前环境支持 `App.DataModel.Cluster`（私有化/lite 场景）。
2. 已确认 `gather` 命名与数据字段规范。
3. 坐标和条件字段通过最小合法性校验。

## 标准流程

### 1. 数据部署
- `Create` - 创建聚合数据
- `Update` - 更新聚合数据
- `Delete` - 删除指定数据
- `Reset` - 重置聚合数据
- `DeleteGather` - 删除整个 gather
- `GetList` - 获取数据列表
- `Count` - 获取数据数量
- `GetGatherList` - 获取 gather 列表

### 2. 配置并启动聚合
- `Start(opt)` - 启动聚合显示
- `Modify(opt)` - 调整样式与筛选
- `End()` - 停止聚合

### 3. 执行周边搜索
- `SearchByPoint` - 按点周边搜索
- `SearchByLine` - 按线周边搜索
- `SearchByArea` - 按区域周边搜索

### 4. 结果校验
- `GetList / Count / GetGatherList` - 校验数据与命中量

## 质量门槛

1. 先建数据再启聚合，避免空聚合启动。
2. 搜索前校验 `queryId/gather/selector`。
3. 修改配置时只改必要字段，避免整体覆盖引发回归。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 聚合无显示 | 未调用 Start 或 gather 数据不存在 | 检查是否已调用 Start；确认 gather 数据已创建且不为空 |
| 周边搜索结果为空 | 坐标格式错误或筛选条件过严 | 检查坐标格式（应为 'lng,lat'）；确认 distance 单位正确；放宽筛选条件 |
| 修改样式后不生效 | queryId 不匹配 | 检查 queryId 是否对应当前聚合实例；确认 Modify 参数结构正确 |

## 参考资料（相对路径）

- `../official_api_code_example/official-cluster.md` - 详细 API 参数和代码示例

## 输出要求

始终输出：
1. 聚合数据范围（gather/queryId）
2. 调用链路与结果摘要
3. 验证步骤与结果
4. 回滚建议（如有）
