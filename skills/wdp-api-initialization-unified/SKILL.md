---
name: wdp-api-initialization-unified
description: 处理 WDP 场景初始化与前端接入。用于规范实例创建、渲染启动、场景就绪门禁、SDK加载、容器设置和页面交互层级。
---

# 📋 本文档职责范围

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

### 第1步：安装依赖（终端执行）
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

## 📋 初始化流程详解

### 1. 创建实例参数

| 参数 | 说明 | 必填 | 注意 |
|------|------|------|------|
| `id` | 渲染容器DOM ID | ✅ | 参数名是`id`不是`container` |
| `url` | 服务器地址 | ✅ | 与`order`必须匹配同一环境 |
| `order` | 32位验证码 | ✅ | 勿硬编码入仓库 |
| `resolution` | 输出分辨率 | ❌ | `[宽, 高]`，Chrome最高4K |
| `debugMode` | 日志级别 | ❌ | `none`/`normal`/`high`/`all` |
| `keyboard` | 键盘事件 | ❌ | `{ normal: false, func: false }` |
| `bCached` | 实体缓存 | ❌ | `true`缓存所有entity |

### 2. 事件注册时机

**Renderer.Start() 成功后**，需要注册以下事件：

**视频流事件**（RegisterEvent）：
- `onVideoReady` - 视频流链接成功
- `onStopedRenderCloud` - 渲染服务中断
- `onVideoStart` - 视频流开始播放
- `onVideoStop` - 视频流停止
- `onVideoError` - 视频流错误

**错误事件**（RegisterErrorEvent）：
- `OnValidateError` - 鉴权失败

**场景事件**（RegisterSceneEvent）：
- `OnWdpSceneIsReady` - 场景加载进度（`res.result.progress === 100` 时完成）
- `OnEntityClicked` - Entity 被点击
- `OnMouseEnterEntity` - 鼠标滑入实体
- `OnMouseOutEntity` - 鼠标滑出实体
- `OnEntitySelectionChanged` - 实体被选取
- `OnEntityReady` - 3DTilesEntity/WMSEntity/WMTSEntity 加载完成
- 其他：详见官方文档

> 📖 **完整事件列表和返回结构**：参考 `../official_api_code_example/official-initialize-scene.md`

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
