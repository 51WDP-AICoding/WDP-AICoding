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

#### 2.1 场景与模式匹配

用 `resources/business-scenarios.json` 做场景模板匹配。

用 `resources/api-patterns.json` 做调用顺序匹配。

#### 2.2 Skill 路由（复用现有资源）

**路由规则源**：读取 `../wdp-entry-agent/SKILL.md` 获取完整的问题类型 → skill 映射规则。

该文件已定义：
- 13个skill的路由规则
- 阻断性要求（高频错误警示）
- 编码约束（严禁猜API、严禁假值）

**快速查找提示**（常用映射）：

| 能力域/关键词 | 目标 Skill |
|-------------|-----------|
| `initialization` | `wdp-api-initialization-unified` |
| `events` / `事件注册` | `wdp-api-general-event-registration` |
| `camera` / `相机` / `跟随` | `wdp-api-camera-unified` |
| `base-attributes` | `wdp-api-generic-base-attributes` |
| `entity-behavior` / `路径移动` | `wdp-api-entity-general-behavior` |
| `coverings` / `覆盖物` / `路径` / `POI` | `wdp-api-coverings-unified` |
| `layers-models` | `wdp-api-layer-models` |
| `materials` | `wdp-api-material-settings` |
| `cluster` | `wdp-api-cluster` |
| `function-components` / `拾取` | `wdp-api-function-components` |
| `bim` / `bim-core` / `构件` | `wdp-api-bim-unified` |
| `gis` / `GIS要素` | `gis-api-core-operations` |
| `spatial-understanding` / `空间/坐标信息获取` | `wdp-api-spatial-understanding` |

#### 2.3 Official 文档索引

用 `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` 确定应查哪份 `official-*.md`。

具体 API 真值直接回到对应 `official-*.md` 摘录确认，不依赖本地二次汇总 catalog。

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

如果符合以下任一条件，必须继续读取 `../wdp-context-memory/SKILL.md` 了解三层架构：

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

#### API 规划检查（意图解析阶段）

**注意**：本检查用于**意图解析和架构设计阶段**，验证API调用规划的合理性，**不替代**MCP服务中代码实际生产环节中的一些强制检查步骤。

读取 `resources/api-compliance-checklist.json`，对架构方案中涉及的每个API进行规划级检查：

1. **必填参数规划**：是否在方案中规划了所有 `required_params`
2. **前置条件规划**：是否考虑了 `prerequisites`（如SceneReady监听）
3. **返回值收集规划**：是否规划了收集 `return_value` 用于后续清理
4. **常见错误预防**：是否在方案中规避了 `common_mistakes` 中的典型问题
5. **清理动作规划**：是否在清理链路中规划了对应的 `cleanup_action`

**与编码检查的区别**：
- **本检查**：在意图解析阶段，检查API调用规划是否完整、合理
- **MCP编码检查**：在代码生成后，检查实际代码的语法和运行时正确性

如发现规划级问题，在报告"合规性检查"章节简要列出（不展开详细检查过程）。

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

输出 `《系统意图与架构设计报告》`，用于指导后续编码工作。报告应简洁明了，避免冗余信息。

### 报告核心章节

1. **原始诉求**：用户的自然语言需求
2. **子任务拆解**：主任务和子任务列表
3. **API调用链路**：关键API调用顺序（步骤1→2→3→4→5）
4. **Skill路由**：Primary和Secondary skill列表
5. **已确认输入**：已明确的参数和数据
6. **缺失输入**：需要用户补充的信息
7. **对象信息**：对象类别、Id、Id来源
8. **清理链路**：创建动作与清理动作的对应关系
9. **状态管理判断**：是否启用 `wdp-context-memory`

### 报告简洁模板

```markdown
# 系统意图与架构设计报告

## 1. 原始诉求
{用户需求的简洁描述}

## 2. 子任务拆解
- {子任务1}
- {子任务2}
- ...

## 3. API调用链路
```
步骤1: {API1}({参数}) → {输出}
步骤2: {API2}({参数}) → {输出}
步骤3: {API3}({参数}) → {输出}
```

## 4. Skill路由
- **Primary**: {skill1}, {skill2}
- **Secondary**: {skill3}, {skill4}

## 5. 已确认输入
- {参数1}: {值}
- {参数2}: {值}

## 6. 缺失输入
- {需要用户补充的信息}

## 7. 对象信息
- **对象类别**: {Poi/Range/Particle等}
- **对象Id**: {customId或来源}
- **Id来源**: {创建返回值/事件回调等}

## 8. 清理链路
| 创建动作 | 清理动作 |
|---------|---------|
| {API1} | {清理API1} |
| {API2} | {清理API2} |

## 9. 状态管理判断
- **是否启用**: {是/否}
- **原因**: {长流程/跨skill/需保留状态}
```

### 报告生成原则

1. **简洁优先**：只包含核心信息，避免冗余描述
2. **结构化**：使用列表、表格、代码块等结构化格式
3. **可直接使用**：报告内容应可直接用于指导编码
4. **合规性检查**：生成报告前，通过 `api-compliance-checklist.json` 检查API合规性，但不在报告中展开详细检查过程

## 质量底线

始终遵守：

1. 先做需求拆解，再做编码路由
2. 先确认对象类别，再确认对象 Id
3. 先确认 Id 来源，再决定后续 API
4. 先确认进入链路，再补清理链路
5. 长流程任务必须挂上 `wdp-context-memory`
6. 缺信息时先问，不要猜
