---
name: wdp-api-initialization-unified
description: 处理 WDP 场景初始化与前端接入。用于规范实例创建、渲染启动、场景就绪门禁、SDK加载、容器设置和页面交互层级。
---

# WDP 初始化与前端集成

## 🚨 六条强制性要求

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须显式调用`App.Renderer.Start()`**
3. 🚨 **必须注册场景就绪事件**
4. 🚨 **必须在场景就绪后才执行业务逻辑**
5. 🚨 **必须确保渲染容器DOM已就绪且尺寸可度量**
6. 🚨 **使用BIM/GIS API时，必须在`Renderer.Start()`之前通过`App.Plugin.Install()`安装对应插件**

⚠️ 以上任何一条不满足，代码将无法正常工作！

---

## 📋 环境准备

### 1. 安装依赖

> ⚠️ **npm 操作需用户手动完成，AI 不予直接实施（执行失败率较高），除非用户明确要求必须依靠 AI 执行**

```bash
# 基础依赖（必须）
npm install wdpapi

# 如需 BIM 功能
npm install @wdp-api/bim-api@^2.2.0

# 如需 GIS 功能  
npm install @wdp-api/gis-api@^2.1.0

# 开发服务器
npm install -D vite
```

### 2. 启动开发服务器

```bash
npx vite . --port 8090
```

> ⚠️ 必须使用 Vite/Webpack 等支持模块解析的服务器，不能使用 http-server 等纯静态服务器

---

## 📋 初始化流程

### 1. package.json 示例

```json
{
  "name": "wdp-project",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "wdpapi": "^2.3.0",
    "@wdp-api/bim-api": "^2.2.0",
    "@wdp-api/gis-api": "^2.1.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 2. 核心代码模板

```javascript
import WdpApi from 'wdpapi';
import BimApi from '@wdp-api/bim-api';  // 按需
import GisApi from '@wdp-api/gis-api';  // 按需

// 1. 创建实例
const App = new WdpApi({
  id: 'player',
  url: 'https://dtp-api.51aes.com',
  order: 'YOUR_ORDER_CODE'
});

// 2. 安装插件（如需）
if (BimApi) await App.Plugin.Install(BimApi);
if (GisApi) await App.Plugin.Install(GisApi);

// 3. 启动渲染器
await App.Renderer.Start();

// 4. 注册场景就绪事件
await App.Renderer.RegisterSceneEvent([{
  name: 'OnWdpSceneIsReady',
  func: async (res) => {
    if (res.result.progress === 100) {
      console.log('✅ 场景就绪');
      // 执行业务代码...
    }
  }
}]);
```

### 3. 关键参数说明

| 参数 | 说明 | 注意 |
|------|------|------|
| `id` | 渲染容器DOM ID | 参数名是`id`不是`container` |
| `url` | 服务器地址 | 与`order`必须匹配同一环境 |
| `order` | 32位验证码 | 勿硬编码入仓库 |

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

- `../official_api_code_example/official-initialize-scene.md`
- `../wdp-api-spatial-understanding/SKILL.md` - 场景就绪后的空间探查
