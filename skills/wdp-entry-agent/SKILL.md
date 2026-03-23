---
name: wdp-entry-agent
description: WDP 能力统一入口与调度技能。用于识别需求所属 API 域、执行接入基线检查、路由到对应 sub skill，并按相对路径最小化加载参考资料以产出可执行方案。处理跨域问题时使用本技能。
---

# WDP 入口编排技能

作为对外分发时的唯一入口。只负责调度，不替代子 skill 的领域实现细节。

## 强制性检查点 (MANDATORY CHECKPOINT)

任何使用本库的AI必须首先执行以下步骤，否则生成的代码将无法正常工作：

1. 读取本文件完成路由判断
2. 读取`../official_api_code_example/universal-bootstrap.template.html`、`universal-bootstrap.template.main.js`、`universal-bootstrap.template.package.json`作为基础骨架
3. 按照路由规则读取对应子技能
4. 生成代码时必须使用`new WdpApi()`初始化，**根据业务需求在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**，然后`App.Renderer.Start()`启动渲染器

警告：跳过上述任何步骤将导致生成的代码无法正常工作！

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

- API 基线：`WDP API 2.2.1`。
- 先满足时序和依赖，再做参数调优。
- 参数先用默认值，再按用户意图做最小改动。

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

1. 启动/接入失败、渲染不可用、页面容器、脚本接入、交互层级问题。
- `../wdp-api-initialization-unified/SKILL.md`

2. 事件不触发、重复触发、回调异常。
- `../wdp-api-general-event-registration/SKILL.md`

3. 镜头飞行、聚焦、视角异常、相机漫游问题。
- `../wdp-api-camera-unified/SKILL.md`

4. 基础属性读取/写入、状态一致性问题。
- `../wdp-api-generic-base-attributes/SKILL.md`

5. 实体检索、显隐、删除、落地等通用行为问题。
- `../wdp-api-entity-general-behavior/SKILL.md`

6. 覆盖物创建/更新/显隐/删除（实时视频、Window、POI、Web组件、HeatMap/Path/Bound、Scene.Create(s)、ClearByTypes）问题。
- `../wdp-api-coverings-unified/SKILL.md`

7. 图层控制、node控制、静态/骨骼/工程摆放模型问题。
- `../wdp-api-layer-models/SKILL.md`

8. 模型材质替换、材质高亮、材质拾取问题。
- `../wdp-api-material-settings/SKILL.md`

9. 点聚合数据部署、聚合样式、周边搜索问题（私有化/lite）。
- `../wdp-api-cluster/SKILL.md`

10. 环境/控件/工具/设置等功能组件问题。
- `../wdp-api-function-components/SKILL.md`

11. BIM 模型/构件/空间行为问题、BIM 插件安装问题。
- `../wdp-api-bim-unified/SKILL.md`

12. GIS 图层接入与行为问题（GeoLayer、WMS/WMTS/3DTiles、GIS 事件）。
- `../gis-api-core-operations/SKILL.md`

13. 项目管理平台源码批量下载与解压需求（项目列表/版本管理/下载源码）。
- `../wdp-internal-case-acquisition/SKILL.md`

## 参考资料读取顺序（相对路径）

1. 先读索引。
- `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md`
- `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md`


2. 再读命中域的官方摘录。
- `../official_api_code_example/official-initialize-scene.md`
- `../official_api_code_example/official-general-event-registration.md`
- `../official_api_code_example/official-scene-camera.md`
- `../official_api_code_example/official-generic-base-attributes.md`
- `../official_api_code_example/official-entity-general-behavior.md`
- `../official_api_code_example/official-entity-coverings.md`
- `../official_api_code_example/official-layer-models.md`
- `../official_api_code_example/official-material-settings.md`
- `../official_api_code_example/official-cluster.md`
- `../official_api_code_example/official-function-components.md`
- `../official_api_code_example/official-bim-core-operations.md`
- `../official_api_code_example/official-bim-full.md`
- `../official_api_code_example/official-gis-full.md`


## 文档后台访问约束

- 文档平台地址以 `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` 为准。
- 不保存后台 token 到仓库。
- 每次需要读取后台文档时，先向用户请求临时 token。

## 执行流程

1. 分类问题并命中路由。
2. 执行接入基线检查。
3. 按最小原则加载参考资料。
4. 调用子 skill 生成修复或实现方案。
5. 输出验证步骤与缺失信息。

## 调度闭环规范（强制）

每次产出实现方案时，必须显式给出以下 6 项：

1. **触发源**
   - 页面动作 / 场景事件 / 定时任务

2. **前置条件**
   - Scene Ready、对象可用、插件安装、关键参数确认完成

3. **执行链**
   - 主调用链顺序 + 失败分支（兜底处理）

4. **状态回写**
   - UI 状态、缓存对象、全局状态同步

5. **验证信号**
   - API 返回值、事件回调、可视化结果

6. **回滚清理**
   - 关闭路径、对象释放、失败恢复

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）

---

## 强制性检查点（再次强调）

任何使用本库的AI必须执行以下步骤，否则生成的代码将无法正常工作：

1. 读取本文件完成路由判断
2. 读取`../official_api_code_example/universal-bootstrap.template.html`、`universal-bootstrap.template.main.js`、`universal-bootstrap.template.package.json`作为基础骨架
3. 按照路由规则读取对应子技能
4. 读取相关官方文档摘录
5. 生成代码时必须使用`new WdpApi()`初始化，**根据业务需求在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**，然后`App.Renderer.Start()`启动渲染器

请确保遵循上述步骤并参考"小白友好的参数提问与开箱即用"原则，确保生成的代码可以直接运行。
