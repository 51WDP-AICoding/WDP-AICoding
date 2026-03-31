---
name: wdp-api-bim-unified
description: 处理 BIM API 的模型/构件/空间核心能力、插件安装与验证的实现与排障。用于 BIM 接入、插件安装、模型行为调用、构件联动与空间操作实现。
---

# WDP BIM功能统一技能

## 🚨 强制性要求

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在`Renderer.Start()`之前调用`App.Plugin.Install(BimApi)`安装BIM插件**
3. 🚨 **必须验证插件安装成功后才能调用BIM相关接口**
4. 🚨 **必须在场景就绪后(progress === 100)才执行BIM业务操作**
5. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
6. 🚨 **在操作大型BIM模型时应考虑性能影响**
7. 🚨 **npm 安装时必须使用 `@wdp-api/bim-api`，具体版本请参考 `../wdp-api-initialization-unified/SKILL.md`**

⚠️ 如果上述任何一点不满足，BIM相关代码将无法正常工作！

---

## 前置条件

1. 已完成 `wdp-api-initialization-unified` 中的5步公式
2. 已执行 `npm install @wdp-api/bim-api`
3. 已执行 `await App.Plugin.Install(BimApi)` 且必须在 `Renderer.Start()` 之前

## 1. BIM插件安装

```javascript
import BimApi from '@wdp-api/bim-api';

// 安装BIM插件（必须在 Renderer.Start() 之前）
const res = await App.Plugin.Install(BimApi);
console.log(res.result.id);  // 插件ID

// 插件卸载
await App.Plugin.Uninstall(res.result.id);

// 验证插件版本
await App.DCP.GetVersion();
```

---

## 2. 模型操作

### 2.1 获取模型列表
```javascript
const res = await App.DCP.GetModelList();
// 分页查询
const res = await App.DCP.GetModelList("", { pageNumber: 1, pageSize: 15, fetchAll: true });
```

### 2.2 新加载模型
```javascript
const entityObj = new App.Hierarchy({
  "location": [121.4962461, 31.23960914, 57],
  "assetId": entity.assetId,
  "seedId": entity.seedId,  // 模型编号（必填）
  "entityName": "modelName",
  "customId": "my-hierarchy-id",
  "tempLoad": false,  // 临时加载/卸载
  "castShadow": true,  // 是否产生投影
});
const res = await App.Scene.Add(entityObj);
```

### 2.3 模型显隐控制
```javascript
// entity 通过 Eid 获取实体或通过新加载模型获取
await entity.SetVisible(false);  // 隐藏
await entity.SetVisible(true);   // 显示
```

### 2.4 模型剖切
```javascript
// 开启剖切
await entity.StartModelSection({
  coordZRef: 'ground',  // surface | ground | altitude
  strokeColor: '00B3E5',
  strokeWeight: 2,
  invert: false,
  showlocation: true,
  transform: {
    location: entity.location,
    rotator: { pitch: 0, yaw: 0, roll: 0 },
    size: [150, 150, 150]
  }
});

// 重置剖切
await entity.ResetModelSection();

// 关闭剖切
await entity.EndModelSection();
```

### 2.5 拆楼功能
```javascript
// 开启拆楼（先关闭再开启避免状态锁死）
await entity.EndBuildingLayer();
await entity.StartBuildingLayer();

// 关闭拆楼
await entity.EndBuildingLayer();
```

### 2.6 模型其他操作
```javascript
// 激活模型
await entity.Active(true);

// 模型移动
await entity.SetLocation([121.49510278, 31.24402272, 0]);

// 模型旋转
await entity.SetRotator({ pitch: 0, yaw: 30, roll: 0 });

// 模型缩放
await entity.SetScale3d([30, 30, 30]);

// 模型聚焦
await entity.SetFocus();

// 模型落地
await entity.SetGround();

// 模型卸载
await entity.Delete();

// 临时加载/卸载（性能优化）
await entity.Update({ "tempLoad": false });
```

---

## 3. 构件操作

### 3.1 获取构件树
```javascript
// 获取顶层树
await entity.GetNodeTree();

// 获取指定节点下的树
await entity.GetNodeTree({ nodeId: "xxx", pageNumber: 1, pageSize: 50 });
```

### 3.2 构件搜索
```javascript
// 树搜索（返回树形结构）
await entity.GetNodeTreeBySearch("542");

// 列表搜索（返回列表结构）
await entity.GetNodeListBySearch("597");

// 通过节点ID获取构件树
await entity.GetNodeTreeById("597");

// 获取父级节点ID
await entity.GetNodeParentId("416");
```

### 3.3 构件属性
```javascript
// 获取构件属性
await entity.GetNodeInfo("441");

// 获取构件坐标
coordType: "top" | "center" | "bottom"
await entity.GetNodeCoord({ nodeId: "xxxx", coordType: "center" });
```

### 3.4 构件高亮
```javascript
// 单个构件高亮
await entity.SetNodeHighLight("597", true, true, {
  color: "76fffc",
  opacity: 1,
  bCanBeOccluded: true,
  outlineStyle: {
    bOutline: true,
    color: "00B3E6",
    lineWidth: 0.5,
    brightness: 10,
    mode: "Flowing"  // Flowing | Flashing
  }
});

// 批量构件专题高亮（BIM 2.2.0+）
await entity.SetNodesHighlight([
  { nodeId: "597", color: "76fffc", hightlight: true, opacity: 1, bCanBeOccluded: true },
  { nodeId: ["598", "599"], color: "00B3E6", hightlight: true, opacity: 1, bCanBeOccluded: true }
]);

// 清除所有高亮
await entity.SetNodesHighlight([{ nodeId: "all", hightlight: false }]);
```

**SetNodeHighLight vs SetNodesHighlight 区别**：
| 特性 | SetNodeHighLight | SetNodesHighlight (2.2.0+) |
|------|------------------|---------------------------|
| 适用场景 | 单个构件交互反馈 | 批量构件专题展示 |
| 性能 | 逐个调用 | 批量处理 |
| 功能 | 基础高亮+描边 | 支持批量、系统级着色 |

### 3.5 构件显隐
```javascript
// 单个构件显隐
await entity.SetNodeVisibility("597", false);

// 反选显隐（排除指定节点，其他节点显隐）
await entity.SetOtherNodesVisibility(["597"], false);

// 全部显示
await entity.SetNodeShowAll();
```

### 3.6 构件聚焦与移动
```javascript
// 构件聚焦
await entity.SetNodeFocus("596", {
  cameraParams: {
    rotation: { pitch: -40, yaw: 0 },
    distanceFactor: 0.5,
    flyTime: 1
  }
});

// 构件移动
await entity.SetNodeLocation("597", [113.30635492, 23.33026007, 90]);
```

### 3.7 根据属性获取构件
```javascript
// 跨模型搜索构件
const res = await App.DCP.GetNodesByProperties({
  "key01": ["string"],
  "key02": ["string"]
});
```

---

## 4. 空间操作

### 4.1 获取空间
```javascript
// 根据Room属性获取空间（跨模型）
const res = await App.DCP.GetByProperties(
  { "Space Code": ["T1-L30-STR-003"] },
  { type: "space", disableDetails: true }
);
```

### 4.2 空间高亮
```javascript
await entity.SetRoomHighLight({
  roomIds: ["8763522", "8763529"],
  bVisible: true,
  colorStyle: {
    color: "0000ff",
    opacity: 0.50,
    bCanBeOccluded: true
  }
});
```

### 4.3 空间聚焦
```javascript
await entity.SetRoomFocus({
  roomIds: ["8763522"],
  rotation: { pitch: -40, yaw: 0 },
  distanceFactor: 0.5,
  flyTime: 1
});
```

---

## 5. 全局设置

```javascript
// 设置全局高亮样式（对SetRoomHighLight不生效）
await App.DCP.SetNodeDefaultHighLightStyle("ffb212", { opacity: 0.8, bCanBeOccluded: true });

// 获取全局高亮样式
await App.DCP.GetNodeDefaultHighLightStyle();
```

---

## 6. 常见问题解决

| 问题 | 解决方案 |
|------|---------|
| 构件显隐不生效 | 确认参数顺序：`SetNodeVisibility(nodeId, visible)`，`true`=显示，`false`=隐藏 |
| 剖切不生效 | `coordZRef` 可用 `"ground"`/`"surface"`/`"altitude"`；`transform.location` 使用相对坐标 |
| 拆楼状态错乱 | 必须先关闭再开启：`EndBuildingLayer()` → `StartBuildingLayer()` |
| 插件安装失败 | 确认 `typeof BimApi !== 'undefined'`；传入的是构造函数而非实例；

---

## 7. 参考资料

- `../official_api_code_example/official-bim-full.md` - **BIM API 完整文档（真值来源）**
- `../official_api_code_example/official-bim-core-operations.md`
- `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` - 在线文档访问说明
