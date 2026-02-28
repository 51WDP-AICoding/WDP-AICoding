---
name: wdp-frontend-integration
description: 处理 WDP 在前端页面中的接入与排障。用于校验容器挂载、SDK 加载顺序、页面交互层级和启动入口一致性；涉及 HTML/CSS/前端启动问题时使用本技能。
---

# WDP 前端接入子技能

只负责前端接入层，不负责具体业务 API 语义。

## 负责范围

- 渲染容器与配置项的映射
- SDK 与业务脚本加载顺序
- 场景层/UI 层交互关系
- 启动命令与文档一致性

## 接入硬约束

1. 保持容器可挂载。
- 页面必须存在与 `renderer.id` 一致的 DOM。
- 容器宽高必须是可计算数值。

2. 保持脚本顺序正确。
- 先加载 `CloudApi` 运行时。
- 再加载 `WdpApi` 主 SDK。
- 最后加载项目配置与业务入口。

3. 保持页面交互层级可用。
- 场景层不被全屏 UI 误拦截。
- 非控件区域允许穿透到 3D 场景。

4. 保持文档与实际运行一致。
- `npm script`、端口、访问地址必须一致。

## 高频问题

1. `CloudApi is not defined`。
- 检查 CloudApi 脚本是否真实返回 JS，而非 HTML 页面。

2. `WdpApi is not defined`。
- 检查 SDK 顺序与加载失败状态码。

3. `width/height must be a number`。
- 检查容器尺寸与分辨率参数格式。

## 最小检查清单

1. 打开 Network，确认 SDK 请求为 200 且 `type=script`。
2. 打开 Console，确认存在 `CloudApi` 与 `WdpApi`。
3. 启动后可见视频流，按钮状态从禁用变为可用。

## 参考资料（相对路径）

- `../api_code_example/README.md`
- `../api_code_example/official-initialize-scene.md`
- `../example/EXAMPLE_REFERENCE.md`

## 输出要求

始终输出：
1. 前端接入问题位置
2. 最小修复补丁
3. 验证步骤
4. 预期现象
