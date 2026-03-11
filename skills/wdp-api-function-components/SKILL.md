---
name: wdp-api-function-components
description: 处理 WDP 功能组件 API 的实现与排障。用于环境（时间/天气/风格）、控件（信息/统计/指南针/小地图）、工具（坐标、测量、取点、剖切、截图等）和设置（渲染模式、码率、帧率、超时、音量等）调用。
---

# WDP 功能组件子技能

覆盖范围：环境、控件、工具、设置。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 工具类调用前确认场景就绪与权限。
3. 设置项变更前明确目标环境（开发/演示/生产）。

## 参数信息门禁（强制）

- 对天气、时间、风格、渲染参数等高敏感字段，若无明确取值，不得直接猜测并落代码。
- 天气枚举值必须满足以下任一来源：
  1. 在线文档参数表明确列出；
  2. 用户明确指定取值；
  3. 运行时探测验证后确认可用。
- 当前本地官方摘录仅明确示例：`SetSceneWeather('Sunny', 3, false)`。
- 对“冬季/下雪”等效果需求，若未确认有效枚举，必须先向用户索取或执行探测流程。

## 标准流程

1. 环境控制。
- 时间与天气：`Environment.Get/Set...`
- 场景风格：`Scene.SetSceneStyle`

2. 控件启停。
- 小地图：`Tools.MiniMap.Start/End`
- 指南针：`Tools.Compass.Start/End`
- 统计与信息：`Renderer.GetStats/System.GetInfomation`

3. 工具调用。
- 坐标转换：`Tools.Coordinate.*`
- 取点/测量：`Tools.PickerPoint`、`Tools.Measure`
- 剖切：`Scene.Section.Start/End`
- 截图：`Renderer.GetSnapshot`

4. 设置调优。
- 渲染模式/帧率/码率：`Renderer.Set*`
- 超时/键盘/音量/画质比例：`System.Set*`、`Setting.Set*`

## 天气枚举探测流程（推荐）

当需求包含“下雪/下雨”等效果时，先执行一次候选值探测：

```javascript
const candidates = ['Sunny', 'Cloudy', 'Rain', 'Snow', 'Snowy', 'HeavySnow'];
for (const weather of candidates) {
  const res = await App.Environment.SetSceneWeather(weather, 1, false);
  console.log(weather, res);
}
```

将 `success=true` 且视觉效果符合预期的值记录到项目配置，再用于功能按钮切换。

## 质量门槛

1. 设置项调整要记录默认值和回滚值。
2. 工具启用后必须提供关闭路径。
3. 高风险设置（码率/帧率/分辨率）变更后必须复测稳定性。
4. 天气效果提交前必须附“枚举值 + 成功截图/日志”。

## 高频问题

1. 工具调用无响应。
- 检查是否已注册相关事件与场景状态。

2. 设置变更后画面异常。
- 检查码率、帧率、分辨率组合是否越界。

3. 天气切换成功但视觉无变化。
- 检查天气枚举是否为当前运行时支持值；必要时重做探测。

## 参考资料（相对路径）

- `../api_code_example/official-function-components.md`
- `../api_code_example/function-components.template.js`

## 输出要求

始终输出：
1. 功能组件分类与目标调用
2. 关键参数与影响面
3. 验证步骤与结果
4. 回滚建议（如有）
