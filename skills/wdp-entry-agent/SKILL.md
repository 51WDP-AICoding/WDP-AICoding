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

2. 校验容器与尺寸。
- `renderer.id` 对应 DOM 必须存在。
- 容器尺寸可计算为数字，避免 `width/height` 约束错误。

3. 校验 SDK 依赖链。
- 必须先有 `CloudApi`，再有 `WdpApi`。
- 若出现 `CloudApi is not defined`，优先检查脚本 URL 是否真实返回 JS。

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

5. 页面容器、脚本接入、交互层级问题。
- `../wdp-frontend-integration/SKILL.md`

6. 复合任务。
- 编排 1 个主 sub skill + 1 个辅助 sub skill。

## 参考资料读取顺序（相对路径）

1. 先读索引。
- `../api_code_example/OFFICIAL_EXCERPT_INDEX.md`

2. 再读命中域的官方摘录。
- `../api_code_example/official-initialize-scene.md`
- `../api_code_example/official-general-event-registration.md`
- `../api_code_example/official-scene-camera.md`
- `../api_code_example/official-generic-base-attributes.md`

3. 最后读临时案例参考。
- `../example/EXAMPLE_REFERENCE.md`
- `example` 与 `AICoding` 均为临时参考，不作为最终权威。

## 文档后台访问约束

- 不保存后台 token 到仓库。
- 每次需要读取后台文档时，先向用户请求临时 token。

## 执行流程

1. 分类问题并命中路由。
2. 执行接入基线检查。
3. 按最小原则加载参考资料。
4. 调用子 skill 生成修复或实现方案。
5. 输出验证步骤与缺失信息。

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）
