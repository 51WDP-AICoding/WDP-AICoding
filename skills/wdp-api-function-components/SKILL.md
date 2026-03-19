---
name: wdp-api-function-components
description: 处理 WDP 功能组件 API 的实现与排障。用于天气、水面、天空盒、粒子特效、后处理等功能组件的创建、配置与控制；涉及场景特效和环境组件时使用本技能。
---

# WDP 功能组件子技能

覆盖范围：天气、水面、天空盒、粒子特效、后处理。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 场景已完成基础加载（`SceneReady(100%)`）。
3. 功能组件参数已完成基础校验。

## 标准流程

1. 创建功能组件。
- 天气：`App.Weather.Create(opt)`。
- 水面：`App.Water.Create(opt)`。
- 天空盒：`App.SkyBox.Create(opt)`。
- 粒子特效：`App.ParticleEffect.Create(opt)`。
- 后处理：`App.PostProcess.Create(opt)`。

2. 配置组件参数。
- 使用 `Update/Set` 系列方法更新参数。

3. 控制组件状态。
- 启停：`Start/Stop/Pause/Resume`。
- 显隐：`Show/Hide`。

4. 销毁组件。
- 使用 `Destroy` 方法销毁组件。

## 质量门槛

1. 创建前检查环境支持度。
2. 参数更新前做类型和范围校验。
3. 组件销毁前先停止运行。

## 特殊编排流警告 (天气动态嗅探相关)

如果涉及到**"天气组件的动态嗅探、自适应降级、兜底保护"**操作：
请立即停止拼接此处的原子API！
请直接查阅：`../workflows/workflow-weather-dynamic-sniffing.md` 剧本进行降级控制编排。

## 高频问题

1. 组件创建成功但无效果。
- 检查参数配置和场景状态。

2. 组件更新无效。
- 检查组件实例是否有效，参数是否正确。

3. 组件性能问题。
- 检查组件数量和参数复杂度。

## 参考资料（相对路径）

- `../official_api_code_example/official-function-components.md`

## 输出要求

始终输出：
1. 组件类型与配置摘要
2. 调用链路与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）