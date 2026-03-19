---
name: wdp-api-initialization-unified
description: 处理 WDP 场景初始化与前端接入的实现与排障。用于规范实例创建、渲染启动、场景就绪门禁、SDK加载顺序、容器设置和页面交互层级；涉及启动失败、接入不稳定或前端交互问题时使用本技能。
---

# WDP 初始化与前端集成统一技能

🚨 **本技能负责初始化链路和前端接入层，不承担具体业务API语义和相机业务编排。**

## 🚨 强制性要求

任何使用WDP API的代码必须遵循以下要求：

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须显式调用`App.Renderer.Start()`**
3. 🚨 **必须注册场景就绪事件**
4. 🚨 **必须在场景就绪后才执行业务逻辑**
5. 🚨 **必须按正确顺序加载SDK依赖（先CloudApi，后WdpApi）**
6. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**

⚠️ 如果上述任何一点不满足，生成的代码将无法正常工作！

## 📋 初始化与集成能力范围

### 1. API层初始化

#### 1.1 参数要求
- 📋 `id`: 渲染容器DOM ID，必须存在且有效
- 📋 `url`: 服务器URL，必须为有效的服务URL
- 📋 `order`: 验证码，必须满足32位十六进制格式

#### 1.2 初始化流程
1. ✅ 检查 SDK 可用性
   - 🚨 先确认 `CloudApi` 与 `WdpApi` 可用

2. ✅ 创建 App 实例
   - 🚨 使用最小配置初始化 `new WdpApi(...)`

3. ✅ 设置系统超时
   - 🚨 启动前调用 `App.System.SetTimeoutTime(...)`

4. ✅ 启动渲染器
   - 🚨 执行 `await App.Renderer.Start()`
   - 🚨 仅在 `success` 为 true 时继续

5. ✅ 注册场景就绪门禁
   - 🚨 仅在 `OnWdpSceneIsReady && progress === 100` 后允许业务 API

6. ✅ 执行空间基准探查（强制，每次接入执行一次）
   - 🚨 场景就绪后立即执行，获取场景空间基础信息，作为后续业务开发的前置确认
   - 🔗 详细流程见：`../wdp-api-spatial-understanding/SKILL.md`
   - 📋 探查内容：坐标系原点、相机位置、实体列表与类型分布、场景包围盒、底板图层（如有）
   - 🚨 探查结果必须输出摘要，确认坐标系类型（WGS84/GCJ02）后再继续业务编码

### 2. 前端层集成

#### 2.1 SDK加载方式（重要）

**🚨 唯一推荐方式：npm安装（生产环境必须使用）**

```bash
npm install wdpapi @wdp-api/bim-api
```

```javascript
// 正确：ES Module导入方式
import WdpApi from 'wdpapi';
import BimApi from '@wdp-api/bim-api';
```

**⚠️ 浏览器CDN方式（不推荐，仅限快速原型测试）**

浏览器CDN加载可能出现以下问题：
- 插件安装异常
- 加载顺序难以保证
- 版本不一致风险
- 跨域请求失败
- 生产环境不稳定

如必须使用CDN测试，按此严格顺序加载（不使用`async/defer`）：
```html
<script src="https://dtp-api.51aes.com/api/js-sdk/v2.0/CloudApi.min.js"></script>
<script src="https://dtp-api.51aes.com/api/js-sdk/v2.0/wdpApi.min.js"></script>
<script src="https://dtp-api.51aes.com/api/js-sdk/v2.0/bimApi.min.js"></script>
```

> 🚨 **强制性要求**：所有生产代码必须使用npm安装方式，禁止在生产环境使用浏览器CDN加载！

#### 2.2 渲染容器设置
- 🚨 容器大小必须在Renderer.start前为可度量的非相对数值（px等）
- 🚨 容器必须已存在于DOM中

#### 2.3 页面交互层级
- 🚨 保持页面交火层级可用 (z-index 检查)
- 🚨 非控件区域必须给scene留点击穿透能力

#### 2.4 按钮状态管理
- 🚨 所有控制UI（漫游、显隐状态控制等）必须遵守`syncButtonStates()`联动更新流
- 🚨 任何脱离API当前执行状态值的写死CSS/UI样式修改都是违规的

## 📋 标准流程

### 1. 前端调度闭环（强制）

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

### 2. 渲染口令与服务接入规则

1. 配置来源与结构固定
   - 前端统一从 `window.projectGlobalConfigs.renderer` 读取接入参数。
   - 必须包含：`id`、`env.url`、`env.order`、`resolution`。
   - `env.order` 必须是 32 位十六进制字符串。

2. 口令与服务环境必须匹配
   - `env.url` 与 `env.order` 必须来自同一渲染环境（公有云/私有化不可混用）。
   - 若出现 `Cannot POST /service/Renderers/Any/order`，优先排查 `url/order` 不匹配。

3. 注入时机固定
   - 先加载配置（如 `config/index.js`），再创建 `new WdpApi({...})`。
   - 初始化对象时直接传入 `order`，不在业务流程中二次拼接。

4. 安全约束
   - 示例项目允许明文口令仅用于本地验证。
   - 团队正式项目禁止将真实口令硬编码入公开仓库；应由部署环境注入。
   - 口令更新后，必须同步更新验证文档与启动说明。

### 3. 本地开发服务器规则

- 必须用 HTTP 服务器访问，不能直接双击打开 HTML（`file://` 协议下 SDK 跨域请求会失败）。
- 推荐启动方式（从项目根目录）：
  ```
  python -m http.server 8092
  ```
  访问：`http://localhost:8092/bim-demo/index.html`
- 或在 `package.json` 中配置 `"start": "python -m http.server 8092"`，用 `npm start` 启动。
- 服务器必须从**包含项目子目录的父目录**启动，访问路径包含子目录名；或从项目目录启动，访问根路径。

## 📋 失败处理

### 1. 初始化失败处理

1. 🚨 初始化失败立即中断后续业务调用
   - ⚠️ 不要在失败情况下继续执行，可能导致级联错误
   - ✅ 建议显示友好的错误信息给用户

2. 🚨 记录 `url/order/containerId` 与错误对象

3. 🚨 给出可复现步骤，不吞错
   - ✅ 错误信息应包含足够的上下文，便于排查
   - ✅ 建议使用try/catch捕获异常，但不隐藏错误

### 2. 最小检查清单

1. 打开 Network，确认 SDK 请求为 200 且 `type=script`。
2. 打开 Console，确认存在 `CloudApi` 与 `WdpApi`。
3. 启动后可见视频流，按钮状态从禁用变为可用。

## ⚠️ 高频问题

### 1. SDK加载问题

1. ⚠️ `CloudApi is not defined`
   - 💡 检查 `CloudApi.min.js` 是否已加载（Network 面板确认 200 且 type=script）。
   - 💡 若用 CDN，确认 URL 返回的是真实 JS 而非 HTML 错误页。
   - 💡 若用本地文件，确认文件路径正确（服务器根目录与 HTML 引用路径一致）。

2. ⚠️ `WdpApi is not defined` / `WdpApi SDK 未加载`
   - 💡 **根本原因**：`wdpApi.min.js` 是 `var WdpApi = (function(e){...})(CloudApi)` 格式，依赖 `CloudApi` 全局变量。
   - 💡 必须先加载 `CloudApi.min.js`，再加载 `wdpApi.min.js`。
   - 💡 检查 Network 面板，确认两个文件都是 200 且按顺序加载。

3. ⚠️ `BimApi is not defined` / `BimApi SDK 未加载`
   - 💡 `bimApi.min.js`（`@wdp-api/bim-api` 包的 `dist/index.umd.js`）通过 UMD 格式挂到 `globalThis.BimApi`。
   - 💡 确认 `bimApi.min.js` 在 `wdpApi.min.js` 之后加载。
   - 💡 在 app.js 中用 `window.BimApi` 访问，而非直接用 `BimApi`（严格模式下 var 不一定挂到 window）。

### 2. 初始化问题

1. ⚠️ `Renderer.Start` 返回参数错误
   - 💡 检查容器尺寸或分辨率参数类型
   - 💡 确保resolution参数为数组格式：[width, height]

2. ⚠️ `Renderer.Start` 报路由错误
   - 💡 检查 `url` 与 `order` 是否属于同一服务环境
   - 💡 验证order码是否过期或无效

3. ⚠️ `width/height must be a number`
   - 💡 检查容器尺寸与分辨率参数格式。

4. ⚠️ 浏览器缓存导致旧代码生效
   - 💡 给 script 标签加版本参数：`<script src="app.js?v=2"></script>`。
   - 💡 或在 DevTools 中勾选 "Disable cache" 后刷新。

## 🔗 参考资料（相对路径）

- 🔗 `../official_api_code_example/official-initialize-scene.md`

## 🚨 强制性要求（再次强调）

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须显式调用`App.Renderer.Start()`**
3. 🚨 **必须注册场景就绪事件**
4. 🚨 **必须在场景就绪后才执行业务逻辑**
5. 🚨 **必须按正确顺序加载SDK依赖（先CloudApi，后WdpApi）**
6. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**

⚠️ 如果上述任何一点不满足，生成的代码将无法正常工作！