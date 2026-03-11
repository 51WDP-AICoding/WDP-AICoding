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

## 渲染口令与服务接入规则（前端侧）

1. 配置来源与结构固定。
- 前端统一从 `window.projectGlobalConfigs.renderer` 读取接入参数。
- 必须包含：`id`、`env.url`、`env.order`、`resolution`。
- `env.order` 必须是 32 位十六进制字符串。

2. 口令与服务环境必须匹配。
- `env.url` 与 `env.order` 必须来自同一渲染环境（公有云/私有化不可混用）。
- 若出现 `Cannot POST /service/Renderers/Any/order`，优先排查 `url/order` 不匹配。

3. 注入时机固定。
- 先加载配置（如 `config/index.js`），再创建 `new WdpApi({...})`。
- 初始化对象时直接传入 `order`，不在业务流程中二次拼接。

4. 安全约束。
- 示例项目允许明文口令仅用于本地验证。
- 团队正式项目禁止将真实口令硬编码入公开仓库；应由部署环境注入。
- 口令更新后，必须同步更新验证文档与启动说明。

## 边界说明

- 项目管理平台源码批量下载/解压属于内部案例获取流程，不在本技能范围内。
- 命中该需求时，路由到：`../wdp-internal-case-acquisition/SKILL.md`。

## 临时性标注（案例驱动校准中）

- 本技能中的“前端交互到场景调用链”属于临时增强规则。
- 后续将通过真实项目案例持续修订触发时机、状态回写与容错逻辑。

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

## 前端调度闭环（强制）

1. 触发源
- 明确按钮/组件事件或页面生命周期入口。

2. 前置条件
- App 已创建、渲染可用、场景 Ready、关键参数齐备。

3. 执行链
- 前端事件 -> WDP API 调用 -> 结果处理（成功/失败）。

4. 状态回写
- 按钮状态、加载状态、日志输出、缓存对象同步更新。

5. 验证信号
- 控制台/日志关键行 + 页面可见变化。

6. 清理回滚
- 关闭按钮逆向操作、异常时恢复默认状态。

## 参考资料（相对路径）

- `../api_code_example/README.md`
- `../api_code_example/official-initialize-scene.md`

## 输出要求

始终输出：
1. 前端接入问题位置
2. 最小修复补丁
3. 验证步骤
4. 预期现象
