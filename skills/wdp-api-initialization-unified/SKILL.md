---
name: wdp-api-initialization-unified
description: 处理 WDP 场景初始化与前端接入的实现与排障。用于规范实例创建、渲染启动、场景就绪门禁、SDK加载、容器设置和页面交互层级；涉及启动失败、接入不稳定或前端交互问题时使用本技能。
---

# WDP 初始化与前端集成统一技能

🚨 **本技能负责初始化链路和前端接入层，不承担具体业务API语义和相机业务编排。**

## 🚨 强制性要求

任何使用WDP API的代码必须遵循以下要求：

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须显式调用`App.Renderer.Start()`**
3. 🚨 **必须注册场景就绪事件**
4. 🚨 **必须在场景就绪后才执行业务逻辑**
5. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**
6. 🚨 **使用BIM/GIS API时，必须在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**

⚠️ 如果上述任何一点不满足，生成的代码将无法正常工作！

## 📋 初始化与集成能力范围

### 1. API层初始化

#### 1.1 参数要求
- 📋 `id`: 渲染容器DOM ID，必须存在且有效（注意：参数名是 `id` 不是 `container`）
- 📋 `url`: 服务器URL，必须为有效的服务URL
- 📋 `order`: 验证码，必须满足32位十六进制格式

#### 1.2 初始化流程
1. ✅ 安装并导入 SDK
   ```bash
   npm install wdpapi
   ```
   ```javascript
   import WdpApi from 'wdpapi';
   ```

2. ✅ 创建 App 实例
   - 🚨 使用最小配置初始化 `new WdpApi({id, url, order})`（注意参数名是 `id`）

2.5 ✅ 安装所需插件（按需，在 Renderer.Start 之前执行）
   - 🚨 **使用 BIM 相关 API（`App.BimModel` / `App.Component` / `App.Asset` / `App.Space`）时必须安装 BIM 插件**：
     ```bash
     npm install @wdp-api/bim-api
     ```
     ```javascript
     import BimApi from '@wdp-api/bim-api';
     const bimRes = await App.Plugin.Install(BimApi);
     if (!bimRes.success) throw new Error('BIM插件安装失败: ' + bimRes.message);
     ```
   - 🚨 **使用 GIS 相关 API（`App.gis` / `App.GeoLayer`）时必须安装 GIS 插件**：
     ```bash
     npm install @wdp-api/gis-api
     ```
     ```javascript
     import GisApi from '@wdp-api/gis-api';
     const gisRes = await App.Plugin.Install(GisApi);
     if (!gisRes.success) throw new Error('GIS插件安装失败: ' + gisRes.message);
     ```
   - 🚨 使用 `App.Entity` / `App.Covering` / `App.CameraControl` 等基础 API 时**无需额外插件**
   - ⚠️ `Plugin.Install()` 必须在 `Renderer.Start()` **之前**执行；插件提供的业务 API 调用必须在场景就绪（progress === 100）**之后**执行

3. ✅ 启动渲染器
   - 🚨 执行 `await App.Renderer.Start()`

4. ✅ 注册场景就绪门禁
   - 🚨 使用 `App.Renderer.RegisterSceneEvent()` 注册 `OnWdpSceneIsReady` 事件
   - 🚨 在回调中判断 `res.result.progress === 100` 表示场景就绪

5. ✅ 执行空间基准探查（强制，每次接入执行一次）
   - 🚨 场景就绪后立即执行，获取场景空间基础信息，作为后续业务开发的前置确认
   - 🔗 详细流程见：`../wdp-api-spatial-understanding/SKILL.md`
   - 📋 探查内容：坐标系原点、相机位置、实体列表与类型分布、场景包围盒、底板图层（如有）
   - 🚨 探查结果必须输出摘要，确认坐标系类型（WGS84/GCJ02）后再继续业务编码

### 2. 前端层集成

#### 2.1 SDK安装方式

**npm安装（唯一方式）**

```bash
npm install wdpapi
```

```javascript
// ES Module导入方式
import WdpApi from 'wdpapi';
```

> 💡 **注意**：wdpapi 2.x+ 版本已将 cloudapi 作为内置依赖，无需手动安装。

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
   - 前端统一从环境变量或配置文件读取接入参数。
   - 必须包含：`container`、`url`、`order`。
   - `order` 必须是 32 位十六进制字符串。

2. 口令与服务环境必须匹配
   - `url` 与 `order` 必须来自同一渲染环境（公有云/私有化不可混用）。
   - 若出现 `Cannot POST /service/Renderers/Any/order`，优先排查 `url/order` 不匹配。

3. 注入时机固定
   - 先加载配置，再创建 `new WdpApi({...})`。
   - 初始化对象时直接传入 `order`，不在业务流程中二次拼接。

4. 安全约束
   - 示例项目允许明文口令仅用于本地验证。
   - 团队正式项目禁止将真实口令硬编码入公开仓库；应由部署环境注入。
   - 口令更新后，必须同步更新验证文档与启动说明。

## 📋 失败处理

### 1. 初始化失败处理

1. 🚨 初始化失败立即中断后续业务调用
   - ⚠️ 不要在失败情况下继续执行，可能导致级联错误
   - ✅ 建议显示友好的错误信息给用户

2. 🚨 记录 `url/order/container` 与错误对象

3. 🚨 给出可复现步骤，不吞错
   - ✅ 错误信息应包含足够的上下文，便于排查
   - ✅ 建议使用try/catch捕获异常，但不隐藏错误

### 2. 最小检查清单

1. 打开 Network，确认 SDK 请求为 200。
2. 打开 Console，确认 `WdpApi` 可正常导入使用。
3. 启动后可见视频流，按钮状态从禁用变为可用。

## ⚠️ 高频问题

### 1. SDK加载问题

1. ⚠️ `WdpApi is not defined` / `WdpApi SDK 未加载`
   - 💡 检查是否正确执行 `npm install wdpapi`
   - 💡 检查导入语句是否正确：`import WdpApi from 'wdpapi'`

2. ⚠️ `BimApi is not defined` / `BimApi SDK 未加载`
   - 💡 确认已安装 `@wdp-api/bim-api`：`npm install @wdp-api/bim-api`
   - 💡 导入方式：`import BimApi from '@wdp-api/bim-api'`

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
5. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**
6. 🚨 **使用BIM/GIS API时，必须在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**

⚠️ 如果上述任何一点不满足，生成的代码将无法正常工作！
