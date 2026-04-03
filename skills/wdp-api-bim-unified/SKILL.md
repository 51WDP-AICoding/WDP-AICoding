---
name: wdp-api-bim-unified
description: 处理 BIM API 的模型/构件/空间核心能力、插件安装与验证的实现与排障。用于 BIM 接入、插件安装、模型行为调用、构件联动与空间操作实现。
---


## ⚠️ 本文档职责范围

**本文档仅提供**：
- 能力范围说明（模型操作、构件操作、空间操作等）
- 使用场景判断（何时使用本 Skill）
- 最佳实践和常见错误
- 激活与聚焦的关系说明（独立无依赖）

**本文档不提供**（必须查阅 official 文档）：
- ❌ 具体代码示例
- ❌ 详细参数结构
- ❌ 返回数据结构

**代码生成前必须查阅**：
- `../official_api_code_example/official-bim-full.md` - **完整 API 文档（真值来源，包含核心操作）**

**禁止基于本文档描述自行推理代码**，必须以 official 文档中的代码示例为准。

## 🚨 强制性要求

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在`Renderer.Start()`之前调用`App.Plugin.Install(BimApi)`安装BIM插件**
3. 🚨 **必须验证插件安装成功后才能调用BIM相关接口**
4. 🚨 **必须在场景就绪后(progress === 100)才执行BIM业务操作**
5. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
6. 🚨 **在操作大型BIM模型时应考虑性能影响**
7. 🚨 **npm 安装时必须使用 `@wdp-api/bim-api`，具体版本请参考 `../wdp-api-initialization-unified/SKILL.md`**
8. 🚨 **涉及到bim类功能的开发，必须提醒用户需要增加一个激活交互模型对象的功能，否则构件类功能不会起效，往往此功能不会在用户需求中自然描述，因为属于功能实现的前置要求，所以需要你来提醒，不过要注意激活模型会提升性能消耗，所以不要做成常态激活，可以提供一个手动激活的功能**

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

### 2.7 模型其他操作
```javascript
// 激活模型，注意任何构件级的交互操作，必须先激活对应模型
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

## 视觉反馈选型指南（重要）

| 高亮类型 | 适用 Skill | 方法 | 适用场景 |
|---------|-----------|------|---------|
| **BIM 构件高亮** | `wdp-api-bim-unified` | `SetNodeHighLight` / `SetNodesHighlight` | BIM 模型内部构件高亮（nodeId 级别） |
| **BIM 房间高亮** | `wdp-api-bim-unified` | `SetRoomHighLight` | BIM 房间/空间高亮（roomId 级别） |
| **模型材质高亮** | `wdp-api-material-settings` | `SetEntitySlotsHighlight` | 模型 mesh slot 级别高亮，精确控制材质 |
| **实体高亮** | `wdp-api-entity-general-behavior` | `SetEntityHighlight` | 普通实体（覆盖物/模型）整体高亮 |
| **实体描边** | `wdp-api-entity-general-behavior` | `SetEntityOutline` | 实体边缘发光轮廓 |
| **Tiles 节点高亮** | `wdp-api-layer-models` | `SetNodesHighlight` | AES 底板 Tiles 节点高亮 |
| **Tiles 图层高亮** | `wdp-api-layer-models` | `SetLayersHighlight` | AES 底板图层高亮 |

**⚠️ 关键区分**：
- BIM 构件高亮 (`SetNodeHighLight`)：操作的是 BIM 模型**内部节点**（nodeId），需要 BIM 插件
- 模型材质高亮 (`SetEntitySlotsHighlight`)：操作的是**模型材质槽位**（meshName/materialIndex），不需要 BIM 插件
- 实体高亮 (`SetEntityHighlight`)：操作的是**整个实体**（eid），适用于覆盖物和一般模型

**选型建议**：
- 需要高亮 BIM 模型内部特定构件 → 使用 `wdp-api-bim-unified` 的 `SetNodeHighLight`
- 需要高亮 BIM 房间/空间 → 使用 `wdp-api-bim-unified` 的 `SetRoomHighLight`
- 需要精确控制模型材质 → 使用 `wdp-api-material-settings` 的 `SetEntitySlotsHighlight`
- 需要高亮普通实体或覆盖物 → 使用 `wdp-api-entity-general-behavior` 的 `SetEntityHighlight`

---

## 3. 构件操作
// 再次提醒，任何构件操作，需要先激活模型，且可以建议用户激活模型可以单独做一个交互点，不要常态化激活，性能上会有明显消耗。

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

#### ⚠️ 构件级激活的编排建议（性能相关）

- `entity.Active(true)` 只应在**真正需要构件级操作**时调用，如 `SetNodeVisibility`、`SetOtherNodesVisibility`、`SetNodeHighLight`、`GetNodeInfo`、`SetNodeFocus`。
- **不要**在 `SceneReady` 后立刻对大模型做常态化激活，也不要把激活结果长期当作默认常开状态；这会带来明显性能消耗。
- 推荐编排：
  1. 页面初始化阶段只完成模型对象获取，不做激活
  2. 用户点击“构件显隐/高亮/孤立/属性/聚焦”时，再执行一次激活
  3. 若一个交互链路内连续调用多个构件 API，可复用本次激活结果，但不要把“已激活”误当成页面全局常驻前置

#### ⚠️ 孤立/反选显隐的语义陷阱

- `SetNodeVisibility(nodeId, visible)` 的布尔值描述的是**目标节点本身**是否可见。
- `SetOtherNodesVisibility(nodeIds, visible)` 的布尔值描述的是**除目标节点外的其他节点**是否可见。
- 这两个布尔值的作用对象不同，不能按同一套 toggle 心智直接复用。

#### ⚠️ SetOtherNodesVisibility 使用注意事项

**方法签名：**
```javascript
await entity.SetOtherNodesVisibility(nodeIds, visibility)
```

**参数说明：**
| 参数 | 类型 | 说明 |
|------|------|------|
| `nodeIds` | `string[]` | 要**排除**的节点ID数组（这些节点不受影响） |
| `visibility` | `boolean` | **其他节点**（排除后的所有节点）的显隐状态 |

**工作原理：**
- `visibility: false` → 显示其他节点（恢复效果）
- `visibility: true` → 隐藏其他节点，只显示输入id的节点（孤立效果）

**推荐心智模型：**
- 不要把第二个参数理解成“是否开启孤立”
- 要把第二个参数理解成“其他节点是否可见”
- 因此：
  - “开启孤立” = `其他节点不可见 = true`
  - “关闭孤立” = `其他节点可见 = false`


**完整示例（双向切换）：**
```javascript
let isIsolated = true;

async function toggleIsolate() {
    isIsolated = !isIsolated;
    // 关键：visibility 参数与孤立状态相反
    await entity.SetOtherNodesVisibility(['72'], !isIsolated);
}
```

#### ⚠️ 与 `SetNodeShowAll` 的编排冲突

- `SetNodeShowAll()` 是**全量恢复类操作**，会把节点显隐状态整体拉回“全部显示”。
- 因此它更适合作为“全局复位/兜底恢复”动作，而不是日常孤立 toggle 链路中的常规步骤。
- 如果在 `SetOtherNodesVisibility(["72"], true)` 之后紧接着调用 `SetNodeShowAll()`，孤立效果会被直接覆盖。
- 编排建议：
  - 日常孤立开启：优先只调用 `SetOtherNodesVisibility(nodeIds, true)`
  - 日常孤立恢复：优先只调用 `SetOtherNodesVisibility(nodeIds, false)`
  - 全量复位时：再视情况调用 `SetNodeShowAll()`

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
| 剖切不生效 | `coordZRef` 可用 `"ground"`/ `"surface"`/ `"altitude"`；`transform.location` 使用相对坐标 |
| 拆楼状态错乱 | 必须先关闭再开启：`EndBuildingLayer()` → `StartBuildingLayer()` |
| 插件安装失败 | 确认 `typeof BimApi !== 'undefined'`；传入的是构造函数而非实例；
| 构件操作后页面明显变卡 | 检查是否在 `SceneReady` 后就常态化执行了 `entity.Active(true)`；改为仅在构件级交互触发时激活 |
| 孤立/反选后无法恢复显示 | `SetOtherNodesVisibility` 的第二个参数需根据状态动态切换，`!isIsolated` 而非固定 `false` |
| 孤立按钮点击后无效果或效果瞬间消失 | 检查是否在孤立调用后又执行了 `SetNodeShowAll()` 之类的全量恢复操作，导致隔离结果被覆盖 |

---

## 7. 参考资料

- `../official_api_code_example/official-bim-full.md` - **BIM API 完整文档（真值来源，包含核心操作）**
- `../official_api_code_example/ONLINE_COVERAGE_AUDIT.md` - 在线文档访问说明
