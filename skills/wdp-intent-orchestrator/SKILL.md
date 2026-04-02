---
name: wdp-intent-orchestrator
description: WDP 意图编排与需求精确化。用于在编码前把自然语言业务诉求整理成《系统意图与架构设计报告》，完成需求拆解、能力路由、前置参数核查、清理链路补全和长流程状态管理判断。适用于需求文档解析、模糊需求澄清、跨多个 WDP 子域的任务规划，不用于直接编写业务代码。
---

# WDP 意图编排技能

只做 4 件事：

1. 解析需求并拆成可执行子任务
2. 从资源中匹配原生 API 能力与子 skill 路由
3. 在编码前拦住缺失参数、错误对象类型、缺失清理链路等问题
4. 输出《系统意图与架构设计报告》

不要在本技能里直接生成业务代码。

## 读取顺序

按顺序读取：

1. `resources/business-scenarios.json`
2. `resources/api-patterns.json`
3. `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md`
4. 需要在线核对时再读 `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md`

具体 API 真值直接回到对应 `official-*.md` 摘录确认，不依赖本地二次汇总 catalog。

## 工作流

### 1. 解析原始需求

先提取：

- 用户要完成的业务目标
- 涉及的对象类别
- 已知对象 Id
- 已知坐标、位置、范围、角度、时长
- 是否有“进入链路”和“退出/清理链路”

把自然语言需求拆成 1 个主任务和若干子任务。不要把“路径创建”“沿路径运动”“相机跟随”“高亮”“清理”混成一件事。

### 2. 匹配能力与路由

用 `resources/business-scenarios.json` 做场景模板匹配。

用 `resources/api-patterns.json` 做调用顺序匹配。

用 `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` 先确定应查哪份 `official-*.md`，再把能力映射到本仓库子 skill：

- `initialization` -> `wdp-api-initialization-unified`
- `events` -> `wdp-api-general-event-registration`
- `camera` -> `wdp-api-camera-unified`
- `base-attributes` -> `wdp-api-generic-base-attributes`
- `entity-behavior` -> `wdp-api-entity-general-behavior`
- `coverings` -> `wdp-api-coverings-unified`
- `layers-models` -> `wdp-api-layer-models`
- `materials` -> `wdp-api-material-settings`
- `cluster` -> `wdp-api-cluster`
- `function-components` -> `wdp-api-function-components`
- `bim` / `bim-core` -> `wdp-api-bim-unified`
- `gis` -> `gis-api-core-operations`
- `spatial-understanding` -> `wdp-api-spatial-understanding`

### 3. 执行输入门禁

编码前必须检查以下门禁。

#### 对象门禁

- 先确认对象类别，再确认对象 Id
- 如果只有 Id 没有对象类别，先报缺口
- 如果对象 Id 还不存在，先明确获取路径，不得假设一个 Id 继续规划

对象 Id 的合法来源通常只有：

- 创建返回值
- 屏幕拾取结果
- 事件回调结果
- 实体查询结果
- BIM 构件查询结果
- GIS 要素点击或属性查询结果
- 平台资源发布信息

#### 动作门禁

如果需求包含以下动作，必须显式写出原生 API 能力，不允许只写业务描述：

- 路径移动
- 相机跟随
- 天气切换
- 高亮
- 清理回收
- 屏幕拾取

#### 清理门禁

只要有创建、注册、绑定、启动动作，就必须补充对应退出链路：

- 事件解绑
- 实体 `Delete` / `Clear`
- 漫游或跟随停止
- 屏幕绑定移除
- 选中状态清空

如果用户只描述“开启”，没有描述“关闭/离开页面/卸载”，要在报告里主动补上清理要求。

#### 长流程门禁

如果符合以下任一条件，必须继续读取 `../wdp-context-memory/SKILL.md` 并启用状态管理：

- 预计超过 5 步
- 跨多个 WDP 子 skill
- 需要跨多轮对话完成
- 需要保留选中状态、相机状态、任务进度

#### 真值门禁

禁止：

- 编造 API 名称
- 编造参数名
- 编造对象 Id
- 使用 `YOUR_URL` 之类假值
- 在未确认对象来源时直接下结论

发现缺失关键信息时，直接向用户追问，不要引用不存在的工具名。

### 4. 归一化高频歧义

遇到以下自然语言时，按下面方式拆解：

- “画路径” -> `coverings`
- “沿路径走 / 巡检车行驶 / 路线回放” -> `entity-behavior`
- “跟车 / 跟拍 / 跟随实体” -> `camera`
- “点模型拿 nodeId / 点底板单体” -> `function-components` 的 picker 能力，后续再路由到 `layers-models` 或 `bim`
- “高亮构件” -> `bim`
- “高亮 GIS 要素” -> `gis`
- “离开页面清空 / 卸载清理” -> 清理链路，通常跨 `events`、`entity-behavior`、`coverings`、`camera`

## 输出要求

输出 `《系统意图与架构设计报告》`，至少包含：

1. 原始诉求
2. 子任务拆解
3. 命中的 API 能力与调用顺序
4. Primary / Secondary skill 路由
5. 已确认输入
6. 缺失输入
7. 对象类别与对象 Id 来源
8. 清理链路
9. 是否需要 `wdp-context-memory`

## 报告最小模板

```markdown
# 系统意图与架构设计报告

## 原始诉求

## 子任务拆解

## API 能力与调用顺序

## Skill 路由
- Primary:
- Secondary:

## 已确认输入

## 缺失输入

## 对象信息
- 对象类别:
- 对象 Id:
- Id 来源:

## 清理链路

## 状态管理判断
- 是否启用 `wdp-context-memory`:
- 原因:
```

## 质量底线

始终遵守：

1. 先做需求拆解，再做编码路由
2. 先确认对象类别，再确认对象 Id
3. 先确认 Id 来源，再决定后续 API
4. 先确认进入链路，再补清理链路
5. 长流程任务必须挂上 `wdp-context-memory`
6. 缺信息时先问，不要猜
