---
name: wdp-entry-agent
description: WDP 能力统一入口与调度技能。用于识别需求所属 API 域、执行接入基线检查、路由到对应 sub skill，并按相对路径最小化加载参考资料以产出可执行方案。处理跨域问题时使用本技能。
---

# WDP 入口编排技能

作为对外分发时的唯一入口。只负责调度，不替代子 skill 的领域实现细节。

## 统一基线

- API 基线：`WDP API 2.2.1`。
- 先满足时序和依赖，再做参数调优。
- 参数先用默认值，再按用户意图做最小改动。

## 参数信息门禁（强制）

- 对以下高敏感信息，若无法确认，不得直接执行开发：
- 效果参数（如高度、半径、宽度、透明度、动画时长）
- 颜色参数（含 HEXA/RGBA、渐变配置）
- 坐标参数（GIS/Cartesian 口径、坐标数组、中心点来源）
- 呈现范围参数（距离、distanceFactor、场景时间等）
- 若以上信息缺失或存在歧义，必须先向用户明确索取，再继续实现。
- 不允许在未确认关键参数时“猜测实现”并提交为最终方案。

## 临时性标注（案例驱动校准中）

- 本技能的“调度闭环规范”当前为临时增强版。
- 目标是通过多个真实案例持续校准调用顺序、状态流转和异常分支。
- 在你未明确确认前，不将其视为最终定稿规则。

## 案例吸收规则（精简版）

仅吸收可直接提升后续多元需求交付能力的规则：

1. 时序编排模板
- 固定链路：触发 -> API 调用链 -> UI/状态回写 -> 下一阶段条件。

2. 批量对象操作
- 同类对象统一采用“批量创建 / 批量更新 / 批量清理”三段式。

3. 流程状态机
- 每个阶段必须定义：阶段编号、前置条件、完成信号、失败回退。

4. 参数分层
- 固定参数（资源ID/平台参数）与可调参数（颜色/速度/半径/时长）分离存放。

5. 事件门禁
- 未满足 Ready 信号时禁止执行业务 API，避免竞态和偶发失败。

6. 天气与时间成对控制
- 天气查询/设置与时间查询/设置应成对使用。
- 切换效果前先读取当前值，关闭时可回滚到基线状态。

7. 相机链路分层
- 优先顺序：`SetCameraPose/UpdateCamera`（直接设置） -> `FlyTo/Focus`（过渡） -> `Follow`（持续跟随）。
- 大量镜头动作时，必须定义“停止/重置”动作（如 ResetCameraLimit、停止漫游）。

8. 覆盖物生命周期
- 覆盖物统一采用 `customId` 管理。
- 操作顺序固定：创建前清理旧对象（`GetByCustomId/ClearByCustomId`） -> Add/Create -> 显示/聚焦 -> 退出时清理。

9. 版本约束（1.0 案例吸收边界）
- 禁止把 1.0 案例中的“具体方法名、参数结构、枚举值、返回字段”直接写入当前 skill。
- 仅当方法框架一致（调用阶段、前后置关系、回滚链路一致）时，允许吸收“使用注意事项”。
- 若涉及具体方法细节，必须以在线 2.x 文档为准；案例仅作旁证。

## 当前盲区输入清单（缺失则暂停开发）

以下信息缺失时，不得输出“可交付实现”，需先向用户索取：

1. 业务联动规则表
- 何种状态触发何种动作，及动作先后顺序。

2. 关键实体语义映射
- eid / 模型ID / 路径ID 对应的真实业务对象含义。

3. 效果参数可用区间
- 颜色、半径、高度、速度、时长、天气枚举等可用范围。

4. 异常优先级与回退策略
- 哪类失败优先处理、失败后恢复到哪个稳定状态。

5. 场景基线状态
- 默认天气、默认时间、默认镜头姿态、默认跟随/漫游状态。
- 若未给出，不得输出“可恢复默认状态”的最终实现。

## 职责边界

- 本 skill 负责：
- 需求分类与子 skill 路由
- 接入前置基线校验
- 输出最小闭环执行方案
- 本 skill 不负责：
- 具体 API 业务实现（交由对应 sub skill）
- 页面视觉样式与业务 UI 设计

## 接入基线检查（先做）

1. 校验运行时配置。
- 必须存在 `window.projectGlobalConfigs.renderer`。
- 必须包含 `id`、`env.url`、`env.order`。
- `env.order` 必须是 32 位十六进制字符串。
- 渲染口令获取/下发/环境匹配流程以 `../wdp-frontend-integration/SKILL.md` 为准。

2. 校验容器与尺寸。
- `renderer.id` 对应 DOM 必须存在。
- 容器尺寸可计算为数字，避免 `width/height` 约束错误。

3. 校验 SDK 依赖链。
- 必须先有 `CloudApi`，再有 `WdpApi`。
- 若出现 `CloudApi is not defined`，优先检查脚本 URL 是否真实返回 JS。
- 命中 BIM/GIS 子域时，必须先校验 `Plugin.Install(BimApi/GisApi)` 成功，再执行领域 API。

4. 校验初始化时序。
- 推荐顺序：`SetTimeoutTime -> Renderer.Start -> RegisterEvents -> SceneReady(100%) -> 业务 API`。

## 路由规则

1. 启动/接入失败、渲染不可用。
- `../wdp-api-initialize-scene/SKILL.md`

2. 事件不触发、重复触发、回调异常。
- `../wdp-api-general-event-registration/SKILL.md`

3. 镜头飞行、聚焦、视角异常。
- `../wdp-api-scene-camera/SKILL.md`

4. 基础属性读取/写入、状态一致性问题。
- `../wdp-api-generic-base-attributes/SKILL.md`

5. 实体检索、显隐、删除、落地等通用行为问题。
- `../wdp-api-entity-general-behavior/SKILL.md`

6. 覆盖物创建/更新/显隐/删除（实时视频、Window、POI、Web组件）问题。
- `../wdp-api-entity-coverings/SKILL.md`

7. 图层控制、node控制、静态/骨骼/工程摆放模型问题。
- `../wdp-api-layer-models/SKILL.md`

8. 模型材质替换、材质高亮、材质拾取问题。
- `../wdp-api-material-settings/SKILL.md`

9. 点聚合数据部署、聚合样式、周边搜索问题（私有化/lite）。
- `../wdp-api-cluster/SKILL.md`

10. 环境/控件/工具/设置等功能组件问题。
- `../wdp-api-function-components/SKILL.md`

11. 高级覆盖物问题（HeatMap/Path/Bound、Scene.Create(s)、ClearByTypes）。
- `../wdp-api-covering-advanced/SKILL.md`

12. BIM 模型/构件/空间行为问题（BIM 2.1.1 全量分类）。
- `../bim-api-core-operations/SKILL.md`

13. BIM 插件安装与相机漫游问题（Plugin.Install、CameraRoam）。
- `../wdp-bim-plugin-and-roam/SKILL.md`

14. GIS 图层接入与行为问题（GeoLayer、WMS/WMTS/3DTiles、GIS 事件）。
- `../gis-api-core-operations/SKILL.md`

15. 页面容器、脚本接入、交互层级问题。
- `../wdp-frontend-integration/SKILL.md`

16. 项目管理平台源码批量下载与解压需求（项目列表/版本管理/下载源码）。
- `../wdp-internal-case-acquisition/SKILL.md`

17. 复合任务。
- 编排 1 个主 sub skill + 1 个辅助 sub skill。

## 参考资料读取顺序（相对路径）

1. 先读索引。
- `../api_code_example/OFFICIAL_EXCERPT_INDEX.md`
- `../api_code_example/DOC_PLATFORM.md`

读取原则：
- 第一轮编写/补完：仅使用 `wdpapidoc-admin/manual/doc` 在线文档内容。
- 交叉验证阶段：仅在用户明确要求时，再使用 `example` 或其他本地历史资料。

2. 再读命中域的官方摘录。
- `../api_code_example/official-initialize-scene.md`
- `../api_code_example/official-general-event-registration.md`
- `../api_code_example/official-scene-camera.md`
- `../api_code_example/official-generic-base-attributes.md`
- `../api_code_example/official-entity-general-behavior.md`
- `../api_code_example/official-entity-coverings.md`
- `../api_code_example/official-layer-models.md`
- `../api_code_example/official-material-settings.md`
- `../api_code_example/official-cluster.md`
- `../api_code_example/official-function-components.md`
- `../api_code_example/official-bim-core-operations.md`
- `../api_code_example/official-bim-full.md`
- `../api_code_example/official-gis-full.md`
- `../api_code_example/covering-advanced.template.js`
- `../api_code_example/bim-plugin-and-roam.template.js`
- `../api_code_example/gis-core-operations.template.js`

3. 最后读临时案例参考。
- `example` 为临时参考，不作为最终权威。
- 默认开发执行禁止读取 `example/trueProjects/*`；仅在“skill 调优阶段”使用案例源码。

## 文档后台访问约束

- 文档平台地址以 `../api_code_example/DOC_PLATFORM.md` 为准。
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

1. 触发源
- 页面动作 / 场景事件 / 定时任务。

2. 前置条件
- Scene Ready、对象可用、插件安装、关键参数确认完成。

3. 执行链
- 主调用链顺序 + 失败分支（兜底处理）。

4. 状态回写
- UI 状态、缓存对象、全局状态同步。

5. 验证信号
- API 返回值、事件回调、可视化结果。

6. 回滚清理
- 关闭路径、对象释放、失败恢复。

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）
