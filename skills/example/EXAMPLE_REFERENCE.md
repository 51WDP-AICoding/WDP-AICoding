# WDP Example Reference（临时整合）

状态：临时参考，非最终权威标准。
用途：为入口调度与首批 sub skill 提供最小可复用参考片段。

## A. 启动与接入（来自 WDP_Show）

- SDK 接入建议：优先 `npm i wdpapi`；script 模式先 `cloudapi` 后 `wdpapi`。
- 最小初始化参数：`id`、`url`、`order`、`resolution`、`debugMode`、`keyboard`。
- 启动链路：`new WdpApi(...)` -> `App.Renderer.Start()`。
- 时序门禁：场景相关 API 在 `OnWdpSceneIsReady && progress === 100` 后调用。
- 常见报错优先排查：`WdpApi is not defined`（先查脚本可达性与加载顺序）。

## B. BIM 插件链路（来自 BIM-API / BIM_演示模块）

- 安装依赖：`wdpapi`、`@wdp-api/bim-api`。
- 插件初始化顺序：
  `new WdpApi(...)` -> `App.Plugin.Install(BimApi)` -> `App.DCP.GetVersion` -> `App.Renderer.Start()`。
- 卸载：`App.Plugin.Uninstall(pluginId)`。
- DCP 版本检查用于确认插件就绪状态。

## C. 实体稳定引用（来自 BIM_演示模块 / entity 草案）

- 推荐链路：`Scene.GetByEids` -> `SetCustomId` -> `Scene.GetByCustomId`。
- 目标：避免一次性实体句柄不稳定，提升后续操作可追踪性。

## D. 演示链路与治理规则（来自 BIM_演示模块）

- API 调用统一 `async/await`，避免同链路并发乱序。
- 关键链路失败后立即 `return`，禁止继续后续动作。
- 按钮状态应与真实状态一致，关闭动作要清理关联目标。
- 常见演示路径：获取并缓存 -> 激活模型 -> 相机/楼层/构件交互 -> 诊断。

## E. 使用边界

- 本文件仅为临时整合参考，后续以官方 API 文档与真实 case 为准。
- 如果本文件无法覆盖当前问题，应向用户明确回报缺失并请求补充资料。
