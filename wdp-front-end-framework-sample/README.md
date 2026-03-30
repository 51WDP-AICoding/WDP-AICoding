# WDP 前端工程示例

## 快速启动

本工程已包含所有依赖（node_modules），**无需执行 npm install** 即可直接启动！

### 启动命令

```bash
npx vite . --port 8090
```

然后浏览器访问：`http://localhost:8090`

---

## API 版本

- **WDP API**: 2.3.0
- **BIM API**: 2.2.0
- **GIS API**: 2.1.0

---

## 文件结构

```
wdp-front-end-framework-sample/
├── index.html          # HTML 入口
├── main.js             # JavaScript 主逻辑（包含 API 2.3.0+ 新特性示例）
├── package.json        # npm 配置
├── package-lock.json   # 版本锁定
├── node_modules/       # 已提交的依赖包
└── README.md           # 本文件
```

---

## 新 API 特性示例

### WDP 2.3.0+ 鼠标事件增强

```javascript
// 支持 triggerType 和 layerType
await App.Renderer.RegisterSceneEvent([{
    name: 'OnEntityClicked',
    func: async (res) => {
        const { eid, triggerType, layerType } = res.result;
        // triggerType: 'LeftMouseButton' | 'RightMouseButton' | 'MiddleMouseButton'
        // layerType: '3dtiles' | 'wms' | 'wmts' | 'vector' | 'poi' | 'entity'
    }
}]);
```

### GIS 2.1.0+ featureType 支持

```javascript
await App.Renderer.RegisterSceneEvent([{
    name: 'OnGeoLayerFeatureClicked',
    func: async (res) => {
        const { featureId, featureType } = res.result;
        // featureType: 'point' | 'line' | 'polygon'
    }
}]);
```

---

## 配置说明

修改 `main.js` 中的配置：

```javascript
const WDP_CONFIG = {
    SERVER_URL: 'https://dtp-api.51aes.com',  // 服务器地址
    ORDER_CODE: 'your-order-code',             // 渲染口令
    CONTAINER_ID: 'player',                    // 容器 ID
    RESOLUTION: [1920, 1080]                   // 分辨率
};
```

---

## 常见问题

### 1. 端口被占用

更换端口：
```bash
npx vite . --port 8080
```

### 2. 需要重新安装依赖

如果确实需要重新安装（如更新版本）：
```bash
npm install
```

---

## 参考资料

- `../skills/wdp-api-initialization-unified/SKILL.md` - 初始化规范
- `../skills/official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` - API 文档索引
