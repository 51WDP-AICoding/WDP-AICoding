---
name: wdp-api-initialize-scene
description: 处理 WDP 场景初始化相关实现与排障。用于规范实例创建、渲染启动、场景就绪门禁和初始化失败分支；涉及启动失败或接入不稳定时使用本技能。
---

# WDP 场景初始化子技能

只负责初始化链路，不承担页面样式和相机业务编排。

## 前置条件

1. 存在 `window.projectGlobalConfigs.renderer`。
2. 配置包含 `id`、`env.url`、`env.order`。
3. `env.order` 满足 32 位十六进制格式。
4. 渲染容器 DOM 已就绪。

## 标准时序

1. 检查 SDK 可用性。
- 先确认 `CloudApi` 与 `WdpApi` 可用。

2. 创建 App 实例。
- 使用最小配置初始化 `new WdpApi(...)`。

3. 设置系统超时。
- 启动前调用 `App.System.SetTimeoutTime(...)`。

4. 启动渲染器。
- 执行 `await App.Renderer.Start()`。
- 仅在 `success` 为 true 时继续。

5. 注册场景就绪门禁。
- 仅在 `OnWdpSceneIsReady && progress === 100` 后允许业务 API。

## 失败处理

1. 初始化失败立即中断后续业务调用。
2. 记录 `url/order/containerId` 与错误对象。
3. 给出可复现步骤，不吞错。

## 高频问题

1. `WdpApi is not defined` 或 `CloudApi is not defined`。
- 检查 SDK 依赖顺序和脚本 URL 正确性。

2. `Renderer.Start` 返回参数错误。
- 检查容器尺寸或分辨率参数类型。

3. `Renderer.Start` 报路由错误。
- 检查 `env.url` 与 `order` 是否属于同一服务环境。

## 参考资料（相对路径）

- `../api_code_example/official-initialize-scene.md`
- `../api_code_example/initialize-scene.template.js`

## 输出要求

始终输出：
1. 初始化链路问题点或改动点
2. 对后续 API 可用性的影响
3. 验证步骤与结果
4. 最小复现与修复说明
