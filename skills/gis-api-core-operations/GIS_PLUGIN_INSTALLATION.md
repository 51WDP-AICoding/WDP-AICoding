# GIS 插件安装最佳实践

## 问题描述

在使用 WDP API 进行 GIS 相关开发时，正确安装 GIS 插件是关键的第一步。错误的安装方式可能导致功能无法正常使用或出现意外错误。

## 错误示例

以下是一个常见的错误示例，这种方式可能导致错误：

```javascript
// ❌ 错误方式 - 不要这样做
const installResult = await App.Plugin.Install(['GIS']);
```

这种错误发生的原因是 `App.Plugin.Install()` 函数期望接收一个构造函数（可以用 `new` 操作符实例化的函数或类），而不是字符串或数组。

## 正确安装方式

### 标准 npm 安装方式

在项目中使用 npm 安装 GIS API 包（确保在项目文件夹下安装，而非工作库文件夹）：

```bash
# 在项目目录中执行
npm install wdpapi
npm install @wdp-api/gis-api
```

然后在代码中正确引入和安装：

```javascript
// ✅ 正确方式
import WdpApi from 'wdpapi';
import GisApi from '@wdp-api/gis-api';

// 初始化 WDP API
const App = new WdpApi({
    id: 'player',
    url: 'https://your-server.com',
    order: 'your-order-code'
});

// 安装 GIS 插件
const installResult = await App.Plugin.Install(GisApi);
if (!installResult.success) {
    throw new Error('GIS 插件安装失败: ' + (installResult.message || '未知错误'));
}

// 启动渲染器
await App.Renderer.Start();
```

## 验证 GIS 插件是否安装成功

安装 GIS 插件后，可以通过以下方式验证是否安装成功：

```javascript
// 获取 GIS 插件版本信息
const versionInfo = await App.gis.GetVersion();
console.log('GIS 插件版本信息:', versionInfo);

// 如果成功，应该返回类似以下内容：
// {
//   "success": true,
//   "message": "",
//   "result": {
//     "GisApiJsSdk": "1.3.0",
//     "GisApiScenePlugins": "1.8.0"
//   }
// }
```

## 卸载 GIS 插件

如果需要卸载 GIS 插件，可以使用以下方法：

```javascript
// 安装插件时会返回插件 ID
const installResult = await App.Plugin.Install(GisApi);
const pluginId = installResult.result.id;

// 使用插件 ID 卸载插件
await App.Plugin.Uninstall(pluginId);
```

## 总结

1. 不要使用 `App.Plugin.Install(['GIS'])` 这种方式安装 GIS 插件
2. 使用 npm 安装 GIS API 包：`npm install @wdp-api/gis-api`
3. 在代码中使用 `import GisApi from '@wdp-api/gis-api'` 然后 `App.Plugin.Install(GisApi)`
4. 确保在项目文件夹下安装依赖，而不是在工作库文件夹下
5. 安装后，使用 `App.gis.GetVersion()` 验证 GIS 插件是否安装成功

正确安装 GIS 插件是使用 GIS 相关功能的前提，请确保按照上述最佳实践进行操作。