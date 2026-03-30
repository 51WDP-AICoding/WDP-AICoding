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

## 📋 环境准备（AI生成配置，用户手动安装）

### 1. 检测现有环境

AI生成 `check-env.js`，用户运行：`node check-env.js`

```javascript
const fs = require('fs');
const path = require('path');
const projectPath = process.argv[2] || '.';

const checks = [
  ['package.json', 'package.json'],
  ['node_modules', 'node_modules'],
  ['wdpapi', 'node_modules/wdpapi'],
  ['BIM插件', 'node_modules/@wdp-api/bim-api'],
  ['GIS插件', 'node_modules/@wdp-api/gis-api']
];

checks.forEach(([name, p]) => {
  const exists = fs.existsSync(path.join(projectPath, p));
  console.log(exists ? `✅ ${name}` : `⚠️ ${name} 未找到`);
});
```

### 2. 小白安装指南

**第一步：安装 Node.js**
1. 访问 https://nodejs.org，下载 LTS 版本
2. 双击安装，一路"下一步"
3. 验证：`node -v` 显示版本号即成功

**第二步：安装依赖**（根据检测结果选择执行）

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

**第三步：启动**
```bash
npx vite . --port 8090
```

**常见问题：**
- `npm 不是内部命令` → 重新安装 Node.js，勾选 "Add to PATH"
- 安装卡住 → 按 `Ctrl+C` 取消，切换网络重试
- 权限错误 → Win: 管理员运行 cmd / Mac: 加 `sudo`

---

## 📋 初始化流程

### 1. AI生成 package.json

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

> ⚠️ AI不执行`npm install`，请用户手动运行
> 
> **重要**：如果修改了 package.json 中的版本号，必须重新运行 `npm install` 才能生效！

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

### 1. `Failed to resolve module specifier "wdpapi"`
**原因**：使用了纯静态服务器（http-server、python -m http.server 等）
**解决**：必须使用 Vite/Webpack 等支持模块解析的服务器
```bash
npm install -D vite
npx vite . --port 8090
```

### 2. `BimApi is not defined`
**原因**：插件未安装或未导入
**解决**：
```bash
npm install @wdp-api/bim-api@^2.2.0
```
```javascript
import BimApi from '@wdp-api/bim-api';
```

### 3. `Renderer.Start` 报路由错误
**原因**：`url`与`order`不匹配
**解决**：确保两者来自同一渲染环境（公有云/私有化不可混用）

### 4. 场景不显示/黑屏
**检查清单**：
- [ ] 容器DOM已存在且尺寸正确
- [ ] `url`与`order`匹配
- [ ] 网络连接正常
- [ ] 浏览器控制台无红色报错

---

## 🔗 参考资料

- `../official_api_code_example/official-initialize-scene.md`
- `../wdp-api-spatial-understanding/SKILL.md` - 场景就绪后的空间探查
