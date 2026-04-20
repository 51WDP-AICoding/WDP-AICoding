---
name: wdp-api-initialization-unified
description: 处理 WDP 场景初始化与前端接入。用于规范实例创建、渲染启动、场景就绪门禁、SDK加载、容器设置和页面交互层级。
---

# 📋 本文档职责范围

## 🚨 架构铁律（绝对禁止违背）

1. ❌ **禁止使用 CDN <script> 引入 wdpapi！** 即使是"随便搭个框架"，也绝对不被允许。
2. ✅ **必须采用 npm 工程化基线**。所有的新工程必须包含 `package.json`，且显式声明 `"wdpapi": "^2.3.0"` 依赖。
3. ✅ **必须采用构建工具**（如 Vite）。必须生成支持 ES Module 引入（`import WdpApi from 'wdpapi'`）的基础配置。
4. ⚠️ **违背以上铁律将直接导致代码评估失败被拒！**

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述 WDP 平台初始化的标准流程和步骤
- ✅ 说明初始化参数的含义和注意事项
- ✅ 列出初始化过程中的强制性要求和常见错误
- ✅ 描述各阶段的事件注册点和时机

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码模板（由 universal-bootstrap.template.* 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-initialize-scene.md`
> 🚨 **必须阅读**：`../official_api_code_example/universal-bootstrap.template.main.js`
> 🚨 **必须阅读**：`../official_api_code_example/universal-bootstrap.template.package.json`

---

# WDP 初始化与前端集成

## 快速开始（5步流程）

> ⚠️ **严格顺序警告：必须先执行第1步（npm install），完成后才能执行第2步（import）**

### 第1步：生成工程框架与安装依赖
> ⚠️ **大模型核心指令：你必须生成 `package.json`、`vite.config.js`，绝不能直接写一个带 `<script src="http...wdpapi.js">` 的 HTML 交差！**

**基础依赖（必须）**：`wdpapi@^2.3.0`
> ⚠️ **必须先执行此步骤，完成后才能进行第2步**
> 
> **注意**：npm 操作需用户手动完成，AI 不予直接实施（执行失败率较高），除非用户明确要求必须依靠 AI 执行

**基础依赖（必须）**：`wdpapi@^2.3.0`

**按需依赖**：
- BIM 功能：`@wdp-api/bim-api@^2.2.0`
- GIS 功能：`@wdp-api/gis-api@^2.1.0`

**开发服务器（必须）**：`vite@^5.0.0`（或其他支持模块解析的服务器）

> ⚠️ 必须使用 Vite/Webpack 等支持模块解析的服务器，不能使用 http-server 等纯静态服务器

### 第2步：导入模块（代码中编写）
> ⚠️ **注意：必须在第1步 npm install 完成后，才能编写import代码**

基础导入：`import WdpApi from 'wdpapi'`

按需导入：
- BIM：`import BimApi from '@wdp-api/bim-api'`
- GIS：`import GisApi from '@wdp-api/gis-api'`

### 第3步：创建实例
```javascript
const App = new WdpApi({ id: 'player', url: '...', order: '...' });
```

### 第4步：安装插件（如需要）
> ⚠️ **必须在 Renderer.Start() 之前执行**

```javascript
if (BimApi) await App.Plugin.Install(BimApi);
if (GisApi) await App.Plugin.Install(GisApi);
```

### 第5步：启动渲染
```javascript
await App.Renderer.Start();
```

## 🚨 六条强制性要求

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须显式调用`App.Renderer.Start()`**
3. 🚨 **必须注册场景就绪事件**
4. 🚨 **必须在场景就绪后才执行业务逻辑**
5. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**
6. 🚨 **使用BIM/GIS API时，必须在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**

⚠️ 以上任何一条不满足，代码将无法正常工作！

---

## 运行时控制

初始化完成后，可通过以下 API 进行运行时控制和监控：

### 渲染控制
| 功能 | API | 说明 |
|-----|-----|------|
| 停止/重启渲染 | `App.Renderer.Stop()` / `Restart()` | 暂停或恢复渲染服务 |
| 启动指定任务 | `App.Renderer.StartByTaskId(io, taskId)` | 通过 TaskId 启动 |
| 设置分辨率 | `App.Renderer.SetResolution(w, h)` | 固定分辨率模式 |
| 设置分辨率倍率 | `App.Renderer.SetResolutionMultiple(n)` | 相对容器尺寸缩放 |
| 设置渲染模式 | `App.Renderer.SetRendererMode(type, resolution)` | `fixed`固定/`full`自适应 |
| 设置帧率上限 | `App.Renderer.SetFrameRateLimit(fps)` | 限制渲染帧率 |
| 设置码率 | `App.Renderer.SetBitrate(mbps)` | 视频流码率控制 |
| 获取实时状态 | `App.Renderer.GetStats()` | 码率、帧率、延迟等 |
| 注册云渲染事件| `App.Renderer.RegisterEvent()` | 监听云渲染状态 |
| 注销事件 | `App.Renderer.UnRegisterEvent/UnRegisterErrorEvent/UnRegisterSceneEvent()` | 移除事件监听 |

> 📖 **完整 API 签名和示例**：参考 `../official_api_code_example/official-initialize-scene.md` - 条目：Renderer 控制方法（id: 1344-ext）

### 系统信息与配置
| 功能 | API | 说明 |
|-----|-----|------|
| 获取系统信息 | `App.System.GetInfomation()` | 平台、浏览器、SDK 版本 |
| 获取 API 版本 | `App.Setting.GetApiVersion()` | 当前 API 版本号 |
| 参数重置 | `App.System.SetOption({url, order, resolution})` | 动态修改连接参数 |
| 设置超时 | `App.System.SetTimeoutTime(ms)` | 接口请求超时（默认 10s）|

> 📖 **完整 API 签名和示例**：参考 `../official_api_code_example/official-initialize-scene.md` - 条目：系统信息与版本（id: 1344-sys）

---

## 📋 初始化流程详解

### 1. 创建实例参数

| 参数 | 说明 | 必填 | 注意 |
|------|------|------|------|
| `id` | [必填] 渲染容器DOM ID | 是 | 参数名是`id`不是`container` |
| `url` | [必填] 服务器地址 | 是 | 与`order`必须匹配同一环境 |
| `order` | [必填] 32位验证码 | 是 | 勿硬编码入仓库 |
| `resolution` | [选填] 输出分辨率 `[宽, 高]` | 否 | Chrome最高4K |
| `debugMode` | [选填] 日志级别 | 否 | `none`/`normal`/`high`/`all` |
| `keyboard` | [选填] 键盘事件 | 否 | `{ normal: false, func: false }` |
| `prefix` | [选填] 二次代理路径名 | 否 | 如 `/service` |
| `initLog` | [选填] 品牌Logo日志 | 否 | `true`显示，`false`不显示 |
| `bCached` | [选填] 实体缓存 | 否 | `true`缓存所有entity |

**出参说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | boolean | 操作是否成功 |
| `message` | string | 返回信息 |
| `result` | WdpApi | WdpApi实例对象（App），后续所有API均通过该实例调用 |

> 📖 **完整API签名和代码示例**：参考 `../official_api_code_example/official-initialize-scene.md`

### 2. 事件注册时机

**Renderer.Start() 成功后**，需要注册场景就绪事件：

> 📖 **事件注册详情**：参考 `../wdp-api-general-event-registration/SKILL.md`
> 📖 **完整事件列表和返回结构**：参考 `../official_api_code_example/official-general-event-registration.md`

---

## ⚠️ 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| `Failed to resolve module specifier "wdpapi"` | 使用了纯静态服务器 | 使用 Vite: `npm install -D vite && npx vite . --port 8090` |
| `BimApi is not defined` | 插件未安装或未导入 | `npm install @wdp-api/bim-api@^2.2.0` 并确认 import |
| `Renderer.Start` 报路由错误 | `url`与`order`不匹配 | 确保两者来自同一渲染环境 |
| 场景不显示/黑屏 | 多种原因 | 检查：容器DOM存在且尺寸正确、url与order匹配、网络正常、控制台无报错 |
| **初始化失败: Error: 渲染器启动失败: 用户没有可用的在线席位** | 单页面多导航场景下重复创建WDP实例 | **使用单页面结构实现导航页面切换时，确保整个应用只创建一个WDP实例**。不同页面/视图应共享同一个实例，通过显隐容器或切换场景实现，而不是销毁重建 |

---

## 🔗 参考资料

**代码生成前必须阅读**：
- `../official_api_code_example/official-initialize-scene.md` - 完整 API 签名和返回结构
- `../official_api_code_example/universal-bootstrap.template.main.js` - 启动代码模板
- `../official_api_code_example/universal-bootstrap.template.package.json` - 依赖配置模板

**使用 BIM/GIS 功能时额外必须阅读**：
- `../official_api_code_example/official-bim-full.md` - 包含 `App.Plugin.Install(BimApi)` 完整 API 签名（Topic ID 1477）
- `../official_api_code_example/official-gis-full.md` - 包含 `App.Plugin.Install(GisApi)` 完整 API 签名

**相关能力**：
- `../wdp-api-spatial-understanding/SKILL.md` - 场景就绪后的空间探查
