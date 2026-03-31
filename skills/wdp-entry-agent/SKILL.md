---
name: wdp-entry-agent
description: WDP 能力统一入口与调度技能。用于识别需求所属 API 域、执行接入基线检查、路由到对应 sub skill，并按相对路径最小化加载参考资料以产出可执行方案。处理跨域问题时使用本技能。
---

# WDP 入口编排技能

作为对外分发时的唯一入口。只负责调度，不替代子 skill 的领域实现细节。

## 执行流程（严格顺序）

### Step 1: 意图解析（必须）
读取 `wdp-intent-orchestrator/SKILL.md`
- 解析用户需求的业务实体和隐藏模块
- 输出《系统意图与架构设计报告》
- 确定需要涉及的技能域（BIM/GIS/相机/实体行为等）
- 校验核心参数（URL、Order、容器）

### Step 2: 基础初始化（必须）
读取 `wdp-api-initialization-unified/SKILL.md`
- 获取 npm install wdpapi（必须先执行）
- 获取 import → new WdpApi() → Renderer.Start() 链路（依赖npm install）

### Step 3: 插件安装（按需）
根据意图编排结果：
- 如需BIM → 读取 `wdp-api-bim-unified`，获取 @wdp-api/bim-api 安装
- 如需GIS → 读取 `gis-api-core-operations`，获取 @wdp-api/gis-api 安装

### Step 4: 核心功能（按需）
根据意图编排结果，读取对应技能：
- 相机问题 → `wdp-api-camera-unified`
- 实体行为 → `wdp-api-entity-general-behavior`
- 覆盖物 → `wdp-api-coverings-unified`
- 图层模型 → `wdp-api-layer-models`
- 材质设置 → `wdp-api-material-settings`
- 点聚合 → `wdp-api-cluster`
- 功能组件 → `wdp-api-function-components`
- 空间理解 → `wdp-api-spatial-understanding`

## 强制性检查点 (MANDATORY CHECKPOINT)

任何使用本库的AI必须首先执行以下步骤，否则生成的代码将无法正常工作：

1. 读取本文件完成路由判断
2. **执行意图编排**：读取 `wdp-intent-orchestrator/SKILL.md`，输出《系统意图与架构设计报告》
3. 检查是否存在未完成的 Context Memory（`.context-memory/` 目录），存在则 `ReadState` 恢复上下文，不存在则初始化新 Memory
4. 读取`../official_api_code_example/universal-bootstrap.template.html`、`universal-bootstrap.template.main.js`、`universal-bootstrap.template.package.json`作为基础骨架
5. **按执行流程顺序**读取对应子技能（先initialization，再按需读取BIM/GIS等）
6. 生成代码时必须使用`new WdpApi()`初始化，**根据业务需求在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**，然后`App.Renderer.Start()`启动渲染器

警告：跳过上述任何步骤将导致生成的代码无法正常工作！

## 执行阻断点（输出代码前必须检查）

- [ ] 已执行意图编排，输出《系统意图与架构设计报告》
- [ ] 已读取 initialization-unified 获取基础初始化链路
- [ ] 已根据意图编排结果读取对应插件技能（BIM/GIS）
- [ ] 已确认 Plugin.Install 在 Renderer.Start 之前（如需要插件）
- [ ] 已确认核心参数（URL、Order）不为假值

## 必要参数要求

任何WDP应用都必须包含以下核心参数：

1. **服务器URL**
   - 例如: `在此填写您的服务器地址(http/https结尾)`
   - 不同环境的URL不可混用

2. **验证口令**
   - 32位十六进制字符串
   - 例如: `在此填写您的三十六位验证口令`
   - 必须与服务器URL匹配

3. **渲染容器ID**
   - DOM元素ID
   - 例如: `player`
   - 渲染容器必须在初始化前就绪

## 统一基线

- API 基线：`WDP API 2.3.0`。
- 插件版本基线：BIM `@wdp-api/bim-api@^2.2.0`、GIS `@wdp-api/gis-api@^2.1.0`。
- 先满足时序和依赖，再做参数调优。
- 参数先用默认值，再按用户意图做最小改动。

## 状态管理基线（跨域基础设施）

> 注意：`wdp-context-memory` 不是路由目标，而是包裹所有路由的底层设施。如需了解状态管理详情，参考 `../wdp-context-memory/SKILL.md`

每次调度必须遵守：

1. **执行前**：`ReadState("transient.selection")` 等获取前置上下文，禁止基于假设操作
2. **执行后**：`UpdateState()` 回写所有状态变更，禁止私自缓存到局部变量
3. **每 3-5 步**：`ValidateConsistency()` 校验状态与用户需求是否冲突
4. **任务切换时**：触发自动修剪，归档 transient，保留 spatial/task 骨架

### 上下文清理
- 任务切换时使用 `/clear` 清理无关上下文
- 使用 subagents 隔离不同任务，避免污染主对话

参考规范：`../wdp-context-memory/INTEGRATION_SPEC.md`
Schema 定义：`../wdp-context-memory/MEMORY_SCHEMA.json`

## 推荐的二阶段思考与检索思路（平稳模式）

在面对任何具体的需求时，为了防止代码拼接错误，我们推荐您作为 AI Agent 优先考虑采用以下两阶段策略（这仅仅是建议，不作为阻断任务推进的绝对门禁）：

**建议环节 1：原子 API 字典查错**
如果只是想知道"这个具体的参数能不能填 `true`"或遇到某条控制台抛出的运行错误，去阅读底层的 `official-*.md` 等基础词典会比看大剧本快得多。

## 小白友好的"参数提问与开箱即用"原则
由于我们的受众可能是对代码或产品不熟悉的用户，必须放弃提供"一跑就报错的半成品"。如果你接到的是一个"完整的端到端需求（例如：帮我写一个显示大楼并能点击隐藏的一整套代码）"，**你必须先读取 `../official_api_code_example/universal-bootstrap.template.html`、`universal-bootstrap.template.main.js`、`universal-bootstrap.template.package.json` 作为骨架**，再将具体的业务 API 查验后注入到该外壳中，而不是直接输出残缺的 JS 片段。

面对核心 WDP 参数（如决定应用能否启动的 URL，口令 Order，必须操作的特定 EID 等）缺失时：

1. **结构化追问核心参数**：
  **严禁**直接填入诸如 `'YOUR_URL'` 这类的假值生成代码。必须友善地向用户提问，例如："为了给您提供直接可用的代码，请补充以下信息：1. 您部署的 WDP 服务器地址；2. 验证口令"。
2. **强制配置分离**：
  获取参数后，在输出的代码中，必须将所有需要用户修改或查看的业务配置统一提取到文件**最顶部**，标记为"用户配置区"并加以中文注释，绝对不要把配置项散落在业务逻辑函数中，防止小白用户"瞎找"。
3. **显性验证反馈**：
  在关键的执行节点（如初始化成功/失败、数据加载完毕、API 报错），输出的代码里必须包含小白可见的 **UI 提示**（例如使用 `alert('加载成功')` 或在页面上输出日志），而不是仅仅依赖浏览器的 Console 控制台输出（小白不看F12）。
4. **非核心视觉参数可 Mock**：
  只有完全不影响程序运行通畅跑通的非致命参数（比如相机的动画时长、颜色代码的默认值），才允许按你的"常识直觉"填充，并必须在输出代码后用自然语言提示用户"已经用了默认的展示效果"。

## 前端层叠规范（按需引用）

数字孪生项目普遍采用"3D 场景 + 多模块 UI 覆盖层"架构，当生成多模块 UI 或排查"点击无效/弹窗被遮挡"问题时，按需引用 `../wdp-css-layer-management/SKILL.md`。

核心要点：所有模块全屏容器必须声明 z-index 并使用 `pointer-events: none/auto` 穿透模式。

## 案例吸收与生命周期规则
1. 批量对象操作：同类对象统一采用"批量创建 / 批量更新 / 批量清理"三段式。
2. 事件门禁：未满足 Ready 信号时禁止执行业务 API，避免竞态。
3. 清理：所有实体覆盖物必须有相对应的清退机制（如 `.Clear()` / `.StopRoam()` 等）。


## 职责边界

- 本 skill 负责：
- 需求分类与子 skill 路由
- 接入前置基线校验
- 输出最小闭环执行方案
- 本 skill 不负责：
- 具体 API 业务实现（交由对应 sub skill）
- 页面视觉样式与业务 UI 设计

## 接入与排障基线检查（按需）
> 当不是全新搭建项目，而是排查现有工程不显示的错误时使用：

1. 校验渲染口令：`env.url` 与 `env.order` 是否匹配环境。
2. 校验 SDK 依赖链：必须先有 `CloudApi`，再有 `WdpApi`；BIM/GIS 必须通过 `Plugin.Install`。

## 路由规则（问题分类与子技能映射）
> 注意：以下路由用于定位单一报错或单一参数改动。整链路开发需求应按路由合并加载多个子技能，并交叉检查初始化链路中的插件安装步骤。

| # | 问题类型 | 目标 Skill |
|---|---------|-----------|
| 1 | 启动/接入失败、渲染不可用、页面容器、脚本接入、交互层级问题 | `../wdp-api-initialization-unified/SKILL.md` |
| 2 | 事件不触发、重复触发、回调异常 | `../wdp-api-general-event-registration/SKILL.md` |
| 3 | 镜头飞行、聚焦、视角异常、相机漫游问题 | `../wdp-api-camera-unified/SKILL.md` |
| 4 | 属性获取与代理对象认知（.Get()方法、循环引用处理） | `../wdp-api-generic-base-attributes/SKILL.md` |
| 5 | 实体检索、显隐、删除、落地等通用行为问题 | `../wdp-api-entity-general-behavior/SKILL.md` |
| 6 | 覆盖物创建/更新/显隐/删除（实时视频、Window、POI、Web组件、HeatMap/Path/Bound、Scene.Create(s)、ClearByTypes）问题 | `../wdp-api-coverings-unified/SKILL.md` |
| 7 | 图层控制、node控制、静态/骨骼/工程摆放模型问题 | `../wdp-api-layer-models/SKILL.md` |
| 8 | 模型材质替换、材质高亮、材质拾取问题 | `../wdp-api-material-settings/SKILL.md` |
| 9 | 点聚合数据部署、聚合样式、周边搜索问题（私有化/lite） | `../wdp-api-cluster/SKILL.md` |
| 10 | 环境/控件/工具/设置等功能组件问题 | `../wdp-api-function-components/SKILL.md` |
| 11 | BIM 模型/构件/空间行为问题、BIM 插件安装问题 | `../wdp-api-bim-unified/SKILL.md` |
| 12 | GIS 图层接入与行为问题（GeoLayer、WMS/WMTS/3DTiles、GIS 事件） | `../gis-api-core-operations/SKILL.md` |
| 13 | 空间理解、坐标转换、位置计算（GIS/Cartesian/屏幕坐标互转） | `../wdp-api-spatial-understanding/SKILL.md` |
| 14 | 意图编排、复杂任务分解、需求精确化 | `../wdp-intent-orchestrator/SKILL.md` |


> 注：任务恢复、上下文丢失、"之前做了什么"、长对话状态不一致、跨会话续作等问题，请参考 [状态管理基线] 章节，使用 `wdp-context-memory` 提供的 `ReadState`/`UpdateState` 等工具处理。

## 参考资料读取顺序（相对路径）

| 顺序 | 文件路径 | 说明 |
|------|---------|------|
| 1 | `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` | 索引文件 |
| 2 | `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` | 在线文档覆盖审计 |
| 3 | `../wdp-context-memory/INTEGRATION_SPEC.md` | 状态管理规范 |
| 4 | `../wdp-context-memory/MEMORY_SCHEMA.json` | Schema 定义 |
| 5 | `../official_api_code_example/official-*.md` | 根据路由命中对应的官方摘录 |

### 官方摘录文件列表
- `official-initialize-scene.md` - 场景初始化
- `official-general-event-registration.md` - 事件注册
- `official-scene-camera.md` - 相机操作
- `official-generic-base-attributes.md` - 基础属性
- `official-entity-general-behavior.md` - 实体行为
- `official-entity-coverings.md` - 覆盖物
- `official-layer-models.md` - 图层模型
- `official-material-settings.md` - 材质设置
- `official-cluster.md` - 点聚合
- `official-function-components.md` - 功能组件
- `official-bim-core-operations.md` - BIM 核心操作
- `official-bim-full.md` - BIM 完整文档
- `official-gis-full.md` - GIS 完整文档


## 文档后台访问约束

- 文档平台地址以 `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` 为准。
- 不保存后台 token 到仓库。
- 每次需要读取后台文档时，先向用户请求临时 token。

## 执行流程

1. 分类问题并命中路由。
2. 初始化/恢复 Context Memory（`ReadState` 获取当前上下文）。
3. 执行接入基线检查。
4. 按最小原则加载参考资料。
5. 调用子 skill 生成修复或实现方案（子 skill 返回 `changes` 声明）。
6. `UpdateState` 回写状态变更 + `ValidateConsistency` 校验。
7. 输出验证步骤与缺失信息。

## 调度闭环规范（强制）

每次产出实现方案时，必须显式给出以下 8 项：

1. **触发源** - 页面动作 / 场景事件 / 定时任务
2. **前置条件** - Scene Ready、对象可用、插件安装、关键参数确认完成
3. **状态读取** - 执行前 `ReadState` 了哪些 key_path，获取到了什么值
4. **执行链** - 主调用链顺序 + 失败分支（兜底处理）
5. **状态回写** - 执行后 `UpdateState` 了哪些字段，变更内容是什么
6. **验证信号** - API 返回值、事件回调、可视化结果
7. **一致性校验** - `ValidateConsistency` 结果，是否存在冲突及处理方式
8. **回滚清理** - 关闭路径、对象释放、失败恢复

## 全局编码约束（强制执行）

### ❌ 严禁编造API方法名
**AI严禁凭经验猜测或编造WDP API方法名。** WDP API命名不遵循通用规范，必须通过官方文档确认。

**常见错误示例**（AI编造的不存在API）：
```javascript
// 编造的API - 不存在！
await App.CameraControl.FollowTarget(targetObj);
await App.CameraControl.SaveCurrentView('default');
await App.CameraControl.LoadSavedView('default');
await App.Camera.LookAt(entity);
```

**正确做法**：
- 查阅 `../official_api_code_example/official-*.md` 确认真实API
- 如文档中无所需功能，应向用户说明并寻求替代方案
- 不得基于通识经验推测API存在

### ❌ 禁止凭经验猜测参数
WDP API参数命名不统一，**必须通过官方文档确认参数格式**。

**常见参数差异**：
- 目标实体可能是 `eid`、`entity`、`targetEid`、`target`、`entityId`
- 动画时长可能是 `duration`、`flyTime`、`time`、`animationTime`
- 位置可能是 `location`、`position`、`coord`、`coordinates`

**正确做法**：
- 查阅官方文档确认准确的参数名和结构
- 参数名必须以文档为准，不可猜测

## 编码前自检清单

- [ ] 事件回调/查询返回的 object 是否通过 `.Get()` 获取属性？（详见 `wdp-api-generic-base-attributes`"关键认知"）
- [ ] 是否混淆了 nodeId 和 eid？（详见 `wdp-api-entity-general-behavior`"实体标识体系"）
- [ ] 视觉反馈方式（描边/高亮/房间高亮）是否选型正确？（详见 `wdp-api-entity-general-behavior`"视觉反馈选型指南"）
- [ ] 异步操作是否有 try-catch 防护？
- [ ] 模块全屏容器是否声明了 z-index？（详见 `wdp-css-layer-management`）
- [ ] 每个可切换状态是否都有开启 + 关闭两条路径？
- [ ] **是否查阅了 official 文档确认API方法名和参数？（严禁编造）**

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）
6. 状态变更记录（`ReadState`/`UpdateState` 摘要）
