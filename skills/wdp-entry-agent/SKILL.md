---
name: wdp-entry-agent
description: WDP 能力统一入口与调度技能。用于识别需求所属 API 域、执行接入基线检查、路由到对应 sub skill，并按相对路径最小化加载参考资料以产出可执行方案。处理跨域问题时使用本技能。
---

# WDP 入口编排技能

作为对外分发时的唯一入口。只负责调度，不替代子 skill 的领域实现细节。

## ⚠️ 文档职责分工

| 文档类型 | 职责 | 禁止事项 |
|---------|------|---------|
| **Entry Agent（本文档）** | 路由判断、执行流程、基线检查 | 不包含具体 API 代码示例 |
| **Sub Skill** | 能力说明、使用场景、依赖关系 | 不包含具体返回结构、详细参数 |
| **official-*.md** | 具体 API 签名、返回结构、代码示例（唯一真值） | 不包含路由逻辑 |

**代码生成前必须查阅对应 official-*.md 文档获取准确代码示例，禁止基于 Skill 描述自行推理。**

## 🚨 强制性要求

1. **必须先执行意图编排**：读取 `../wdp-intent-orchestrator/SKILL.md`，输出《系统意图与架构设计报告》
2. **必须读取 initialization-unified**：获取基础初始化链路（`npm install wdpapi` → `new WdpApi()` → `Renderer.Start()`）
3. **必须检查 Context Memory**：存在 `.context-memory/` 则 `ReadState` 恢复，不存在则初始化新 Memory
4. **必须使用骨架文件**：端到端需求先读取 `../official_api_code_example/universal-bootstrap.template.*` 三件套作为基础骨架
5. **必须按序加载子技能**：先 initialization，再按需读取插件，最后核心功能
6. **Plugin.Install 必须在 Renderer.Start 之前**（如需插件）
7. **核心参数（URL、Order）不得为假值**，缺失时必须向用户追问，禁止填入 `'YOUR_URL'` 等假值

## 执行流程（严格顺序）

### Step 1: 意图解析（必须）
读取 `../wdp-intent-orchestrator/SKILL.md`
- 解析用户需求的业务实体和隐藏模块
- 输出《系统意图与架构设计报告》
- 确定需要涉及的技能域（BIM/GIS/相机/实体行为等）
- 校验核心参数（URL、Order、容器）

### Step 2: 基础初始化（必须）
读取 `../wdp-api-initialization-unified/SKILL.md`
- 获取 npm install wdpapi（必须先执行）
- 获取 import → new WdpApi() → Renderer.Start() 链路

### Step 3: 插件安装（按需）
根据意图编排结果：
- 如需BIM → 读取 `../wdp-api-bim-unified/SKILL.md`，获取 @wdp-api/bim-api 安装
- 如需GIS → 读取 `../gis-api-core-operations/SKILL.md`，获取 @wdp-api/gis-api 安装

### Step 4: 核心功能（按需）
根据意图编排结果，读取对应技能：
- 相机、镜头相关行为 → `../wdp-api-camera-unified/SKILL.md`
- 实体行为相关行为 → `../wdp-api-entity-general-behavior/SKILL.md`
- 覆盖物相关行为 → `../wdp-api-coverings-unified/SKILL.md`
- AES 底板图层/单体控制、静态/骨骼/工程摆放模型 → `../wdp-api-layer-models/SKILL.md`
- 材质设置相关行为 → `../wdp-api-material-settings/SKILL.md`
- 点聚合（大体量标签分层表达） → `../wdp-api-cluster/SKILL.md`
- 功能组件相关行为 → `../wdp-api-function-components/SKILL.md`
- 空间理解相关行为 → `../wdp-api-spatial-understanding/SKILL.md`
- BIM 模型/构件/空间相关行为 → `../wdp-api-bim-unified/SKILL.md`
- GIS 图层接入及应用相关行为 → `../gis-api-core-operations/SKILL.md`

## 路由规则（问题分类与子技能映射）

> 单一报错/参数改动命中单条路由；整链路开发需求合并加载多个子技能，交叉检查初始化链路中的插件安装步骤。

| # | 问题类型 | 目标 Skill |
|---|---------|-----------|
| 1 | 启动/接入失败、渲染不可用、页面容器、脚本接入、交互层级问题 | `../wdp-api-initialization-unified/SKILL.md` |
| 2 | 事件不触发、重复触发、回调异常 | `../wdp-api-general-event-registration/SKILL.md` |
| 3 | 镜头飞行、聚焦、视角异常、相机漫游问题 | `../wdp-api-camera-unified/SKILL.md` |
| 4 | 属性获取与代理对象认知（.Get()方法、循环引用处理） | `../wdp-api-generic-base-attributes/SKILL.md` |
| 5 | 实体检索、显隐、删除、落地等通用行为问题 | `../wdp-api-entity-general-behavior/SKILL.md` |
| 6 | 覆盖物创建/更新/显隐/删除（实时视频、Window、POI、Web组件、HeatMap/Path/Bound、Scene.Create(s)、ClearByTypes） | `../wdp-api-coverings-unified/SKILL.md` |
| 7 | AES 底板图层/单体控制、静态/骨骼/工程摆放模型问题 | `../wdp-api-layer-models/SKILL.md` |
| 8 | 模型材质替换、材质高亮、材质拾取问题 | `../wdp-api-material-settings/SKILL.md` |
| 9 | 点聚合数据部署、聚合样式、周边搜索问题（私有化/lite） | `../wdp-api-cluster/SKILL.md` |
| 10 | 环境/控件/工具/设置等功能组件问题 | `../wdp-api-function-components/SKILL.md` |
| 11 | BIM 模型/构件/空间行为问题、BIM 插件安装问题 | `../wdp-api-bim-unified/SKILL.md` |
| 12 | GIS 图层接入与行为问题（GeoLayer、WMS/WMTS/3DTiles、GIS 事件） | `../gis-api-core-operations/SKILL.md` |
| 13 | 空间理解、坐标转换、位置计算（GIS/Cartesian/屏幕坐标互转） | `../wdp-api-spatial-understanding/SKILL.md` |
| 14 | 意图编排、复杂任务分解、需求精确化 | `../wdp-intent-orchestrator/SKILL.md` |

> 非路由目标（底层设施，按需引用）：`wdp-context-memory`（状态管理）、`wdp-css-layer-management`（UI 层叠规范）、`wdp-internal-case-acquisition`（案例采集）

## 必要参数要求

任何WDP应用都必须包含以下核心参数：

1. **服务器URL** — 例如: `http://your-server.com`（http/https 结尾），不同环境不可混用
2. **验证口令** — 32位十六进制字符串，必须与服务器URL匹配
3. **渲染容器ID** — DOM元素ID（如 `player`），必须在初始化前就绪

**参数缺失时的处理**：严禁填入假值，必须结构化追问用户；获取后在代码最顶部设"用户配置区"并加中文注释。

## 统一基线

- API 基线：`WDP API 2.3.0`
- 插件版本基线：BIM `@wdp-api/bim-api@^2.2.0`、GIS `@wdp-api/gis-api@^2.1.0`
- 先满足时序和依赖，再做参数调优
- 参数先用默认值，再按用户意图做最小改动

## 状态管理基线（跨域基础设施）

> `wdp-context-memory` 不是路由目标，而是包裹所有路由的底层设施。详情参考 `../wdp-context-memory/SKILL.md`

每次调度必须遵守：
1. **执行前**：`ReadState()` 获取前置上下文，禁止基于假设操作
2. **执行后**：`UpdateState()` 回写所有状态变更，禁止私自缓存到局部变量
3. **每 3-5 步**：`ValidateConsistency()` 校验状态与用户需求是否冲突
4. **任务切换时**：触发自动修剪，归档 transient，保留 spatial/task 骨架

上下文清理：任务切换时使用 `/clear`；使用 subagents 隔离不同任务。参考 `../wdp-context-memory/INTEGRATION_SPEC.md`，Schema 定义：`../wdp-context-memory/MEMORY_SCHEMA.json`

## 小白友好原则

1. **禁止假值**：核心参数缺失时必须追问，禁止填 `'YOUR_URL'` 等假值
2. **配置分离**：所有需用户修改的配置统一提取到文件最顶部"用户配置区"，加中文注释
3. **显性反馈**：关键执行节点（初始化成功/失败、数据加载、API 报错）必须包含 UI 提示（如 `alert()`），不依赖 Console
4. **非核心参数可 Mock**：不影响运行的视觉参数可用默认值，但须提示用户"已使用默认展示效果"

## 前端层叠规范（按需引用）

数字孪生项目普遍采用"3D 场景 + 多模块 UI 覆盖层"架构，生成多模块 UI 或排查"点击无效/弹窗被遮挡"问题时，按需引用 `../wdp-css-layer-management/SKILL.md`。

核心要点：所有模块全屏容器必须声明 z-index 并使用 `pointer-events: none/auto` 穿透模式。

## 接入与排障基线检查（按需）

> 排查现有工程不显示错误时使用（非全新搭建项目）

1. 校验渲染口令：`env.url` 与 `env.order` 是否匹配环境
2. 校验 SDK 依赖链：必须先有 `CloudApi`，再有 `WdpApi`；BIM/GIS 必须通过 `Plugin.Install`

## ❌ 全局编码约束（强制执行）

### 严禁编造 API 方法名
WDP API 命名不遵循通用规范，必须通过 `../official_api_code_example/official-*.md` 确认。不得基于通识经验推测 API 存在。

### 严禁凭经验猜测参数
WDP API 参数命名不统一（如目标实体可能是 `eid`/`entity`/`targetEid`/`target`/`entityId`，时长可能是 `duration`/`flyTime`/`time`），必须通过官方文档确认。

## 编码前自检清单

- [ ] 事件回调/查询返回的 object 是否通过 `.Get()` 获取属性？
- [ ] 是否混淆了 nodeId 和 eid？
- [ ] 视觉反馈方式（描边/高亮/房间高亮）是否选型正确？
- [ ] 异步操作是否有 try-catch 防护？
- [ ] 模块全屏容器是否声明了 z-index？
- [ ] 每个可切换状态是否都有开启 + 关闭两条路径？
- [ ] **是否查阅了 official 文档确认 API 方法名和参数？**

## 案例吸收与生命周期规则

1. 批量对象操作：同类对象统一采用"批量创建 / 批量更新 / 批量清理"三段式
2. 事件门禁：未满足 Ready 信号时禁止执行业务 API，避免竞态
3. 清理：所有实体覆盖物必须有相对应的清退机制（如 `.Clear()` / `.StopRoam()` 等）

## 调度闭环规范

每次产出实现方案时，必须显式给出以下 8 项：

1. **触发源** — 页面动作 / 场景事件 / 定时任务
2. **前置条件** — Scene Ready、对象可用、插件安装、关键参数确认完成
3. **状态读取** — 执行前 `ReadState` 了哪些 key_path，获取到了什么值
4. **执行链** — 主调用链顺序 + 失败分支（兜底处理）
5. **状态回写** — 执行后 `UpdateState` 了哪些字段，变更内容是什么
6. **验证信号** — API 返回值、事件回调、可视化结果
7. **一致性校验** — `ValidateConsistency` 结果，是否存在冲突及处理方式
8. **回滚清理** — 关闭路径、对象释放、失败恢复

## 参考资料读取顺序（相对路径）

| 顺序 | 文件路径 | 说明 |
|------|---------|------|
| 1 | `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` | 索引文件 |
| 2 | `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` | 在线文档覆盖审计 |
| 3 | `../wdp-context-memory/INTEGRATION_SPEC.md` | 状态管理规范 |
| 4 | `../wdp-context-memory/MEMORY_SCHEMA.json` | Schema 定义 |
| 5 | `../official_api_code_example/official-*.md` | 根据路由命中对应的官方摘录 |

### 官方摘录文件列表
- `official-initialize-scene.md` — 场景初始化
- `official-general-event-registration.md` — 事件注册
- `official-scene-camera.md` — 相机操作
- `official-generic-base-attributes.md` — 基础属性
- `official-entity-general-behavior.md` — 实体行为
- `official-entity-coverings.md` — 覆盖物
- `official-layer-models.md` — 图层模型
- `official-material-settings.md` — 材质设置
- `official-cluster.md` — 点聚合
- `official-function-components.md` — 功能组件
- `official-bim-full.md` — BIM 完整文档
- `official-gis-full.md` — GIS 完整文档

## 文档后台访问约束

- 文档平台地址以 `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` 为准
- 不保存后台 token 到仓库
- 每次需要读取后台文档时，先向用户请求临时 token

## 职责边界

**本 skill 负责**：需求分类与子 skill 路由、接入前置基线校验、输出最小闭环执行方案

**本 skill 不负责**：具体 API 业务实现（交由对应 sub skill）、页面视觉样式与业务 UI 设计

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）
6. 状态变更记录（`ReadState`/`UpdateState` 摘要）