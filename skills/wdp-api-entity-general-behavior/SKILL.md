---
name: wdp-api-entity-general-behavior
description: 处理 WDP 实体/单体通用行为 API 的实现与排障。用于规范按类型、EID、EntityName、CustomId 的实体检索，以及显隐、删除、落地等通用行为调用；涉及实体对象操作时使用本技能。
---

# WDP 实体/单体通用行为子技能

只负责实体通用行为域，不负责前端布局和相机编排。

## ⚠️ 本文档职责范围

**本文档仅提供**：
- 能力范围说明（实体检索、显隐、删除、落地等）
- 使用场景判断（何时使用本 Skill）
- 实体标识体系说明（eid/nodeId/entityName/customId 区别）
- 最佳实践和常见错误

**本文档不提供**（必须查阅 official 文档）：
- ❌ 具体代码示例
- ❌ 详细参数结构
- ❌ 返回数据结构

**代码生成前必须查阅**：根据业务场景选择对应的 official 文档：
- 实体查询与管理（GetByXxx/ClearByXxx/SetVisible/事件）：`../official_api_code_example/official-entity-general-behavior-core.md`
- 实体移动与批量（Bound/Scene.Create/Creates）：`../official_api_code_example/official-entity-general-behavior-movement.md`
- 实体交互与编辑（Picker/Selection/Outline/Highlight/Modify/Clip）：`../official_api_code_example/official-entity-general-behavior-interaction.md`
- BIM 相关操作（房间高亮等）：`../official_api_code_example/official-bim-full.md`

**禁止基于本文档描述自行推理代码**，必须以 official 文档中的代码示例为准。

## 与相邻技能的边界

- `Path` / `Poi` / `Window` / `Particle` / `Effects` 等**实体创建**优先属于 `../wdp-api-coverings-unified/SKILL.md`
- `Bound` / `Scene.Move` 这类“实体沿路径运动”属于本技能
- `CameraControl.Follow` / 跟拍 / 跟车属于 `../wdp-api-camera-unified/SKILL.md`
- 因此，“先创建路径，再让车辆沿路径移动，再让镜头跟随车辆”是一个典型的多 skill 组合场景

## 前置条件

1. `App` 已初始化且渲染可用。
2. 依赖场景状态的行为在 `SceneReady(100%)` 后执行。
3. 输入参数完成必填、类型、范围校验。

## 实体标识体系

| 标识 | 含义 | 适用操作 |
|------|------|---------|
| `eid` | 场景实体唯一标识 | `GetByEids`、`SetVisible`、`SetEntityOutline`、`Focus` 等 |
| `nodeId` | BIM 模型内部节点标识 | `NodeSelection.Add/Remove`、`SetRoomHighLight` 等 |
| `entityName` | 实体自定义名称 | `GetByEntityName`、`UpdateByEntityName` 等 |
| `customId` | 实体自定义 ID | `GetByCustomId`、`UpdateByCustomId` 等 |

**注意**：`nodeId` 与 `eid` 是不同体系，不可交叉使用。事件回调中的 `result.nodeId` 不能当作 `eid` 去匹配实体。

## 标准流程

1. 明确检索方式。
- 优先按最稳定键检索：`Eid > CustomId > EntityName > Type`。
- 标识选择参考上方"实体标识体系"。

2. 执行对象获取。
- 使用 `App.Scene.GetByEids/GetByCustomId/GetByEntityName/GetByTypes/GetAll` 获取对象。

3. 执行实体行为。
- 显隐：`SetVisible` 或 `SetVisibleByObjects`。
- 删除：`ClearByTypes/ClearByObjects/ClearByEids`。
- 落地：对象级 `SnapTo(...)`。
- 批量更新：`UpdateByEntityName/UpdateByCustomId`。
- 聚焦：`FocusByEntityName/FocusByCustomId`。

4. 校验执行结果。
- 记录目标集合数量、成功/失败数量、失败对象摘要。

## 批量操作指南

| 操作类型 | 方法 | 说明 |
|---------|------|------|
| **批量显隐** | `SetVisibleByObjects(objects, boolean)` | `true`=显示, `false`=隐藏 |
| **批量删除** | `ClearByTypes(types)` / `ClearByObjects(objects)` / `ClearByEids(eids)` | 方式1按类型，方式2按对象，方式3按Eid |
| **批量更新** | `UpdateByEntityName(name, json)` / `UpdateByCustomId(id, json)` | 按名称或自定义ID更新 |
| **批量聚焦** | `FocusByEntityName(name)` / `FocusByCustomId(id)` | 按名称或自定义ID聚焦 |

> 📖 **完整代码示例**：参考对应的 official 文档（见上方分类）

## 实体选中操作

### 实体级选中（覆盖物/模型）
```javascript
// 添加选中
await App.Scene.Selection.Add([obj1, obj2]);
// 或
await App.Scene.AddSelection([obj1, obj2]);

// 获取所有选中
const res = await App.Scene.GetSelection();

// 取消选中
await App.Scene.RemoveSelection([obj1]);

// 清除所有选中
await App.Scene.ClearSelection();
```

### 单体级选中（BIM node）
```javascript
// 获取底板对象
const res = await App.Scene.GetTiles();
const tilesObj = res.result.Tiles[0];

// 添加选中单体
await App.Scene.NodeSelection.Add(tilesObj, ['nodeId1', 'nodeId2']);

// 绘制描边（选中后必须调用才会显示）
await App.Scene.NodeSelection.Draw();

// 合并操作：添加并立即绘制
await App.Scene.NodeSelection.AddDraw(tilesObj, ['nodeId1']);

// 移除选中单体
await App.Scene.NodeSelection.Remove(tilesObj, ['nodeId1']);

// 清除所有选中单体
await App.Scene.NodeSelection.Clear();
```

## 高级操作

### 实体编辑（路径/热力图）
```javascript
// 编辑路径：添加/删除坐标点
await pathObj.Modify({
  method: 'add', // add 或 delete
  index: [2, 0], // 坐标点索引
  coordinates: [[121.46, 31.22, 11], [121.46, 31.22, 68]]
});

// 编辑热力图数据
await heatmapObj.Modify({
  method: 'add',
  index: [2, 0],
  features: [{ point: [121.49, 31.22, 21], value: 80 }]
});
```

### 实体裁剪（热力图系列）
```javascript
const geo = {
  coordinates: [[[121.49, 31.25, 0], [121.47, 31.23, 0], [121.51, 31.24, 0]]]
};

// 裁剪热力图
await heatmapObj.Clip(geo, 'bd20ffff'); // geo + 镂空颜色

// 取消裁剪
await heatmapObj.UnClip();

// 柱状热力图同样支持
await columnarHeatMapObj.Clip(geo, 'fef595ff');
await columnarHeatMapObj.UnClip();
```

### 实体沿路径移动（Bound）

**创建移动对象：**
```javascript
const moveObj = new App.Bound({
  moving: particleObj, // 移动的覆盖物
  path: pathObj,       // 路径
  boundStyle: {
    time: 50,          // 总时长(秒)
    bLoop: true,       // 是否循环
    bReverse: false,   // 是否反向
    state: 'play'      // play/pause/stop
  },
  rotator: { pitch: 0, yaw: 0, roll: 0 }, // 相对路径的旋转
  offset: { left: 0, forward: 0, up: 0 }  // 相对路径的偏移
});
await App.Scene.Add(moveObj);
```

**控制方法：**
| 方法 | 说明 |
|------|------|
| `SetTime(seconds)` | 设置移动总时长（秒） |
| `GetTime()` | 获取当前设置的总时长 |
| `SetLoop(boolean)` | 设置是否循环运动 |
| `GetLoop()` | 获取是否循环运动 |
| `SetReverse(boolean)` | 设置是否反向运动 |
| `GetReverse()` | 获取是否反向运动 |
| `SetState('play'/'pause'/'stop')` | 控制运动状态 |
| `GetState()` | 获取当前运动状态 |
| `SetOffset({left, forward, up})` | 设置相对路径的偏移 |
| `GetOffset()` | 获取当前偏移设置 |
| `SetRotator({pitch, yaw, roll})` | 设置相对路径的旋转 |
| `GetRotator()` | 获取当前旋转设置 |
| `SetSpeed(speed)` | 设置移动速度（米/秒） |
| `GetSpeed()` | 获取当前移动速度 |
| `Update(json)` | 更新 Bound 配置 |
| `Delete()` | 删除移动对象 |

**边界提醒：**
- 这里的重点是“运动行为”
- 如果还没有 `Path` / `Particle` 实体本身，先去 `wdp-api-coverings-unified`
- 如果还要“镜头跟随运动中的对象”，再叠加 `wdp-api-camera-unified`

> 📖 **完整 Bound API 签名**：参考 `../official_api_code_example/official-entity-general-behavior-movement.md` - Topic: 实体移动

## 质量门槛

1. 不对空对象集合直接调用批量行为。
2. 不在未确认对象类型时执行高风险删除。
3. 删除/批量修改前先输出目标清单摘要。

## 特殊编排流警告 (BIM楼层级显隐相关)

如果涉及到**"BIM 模型的楼层级显隐、结构控制、隔离与兜底保护"**操作：
请特别注意以下技术限制：

### BIM 楼层显隐技术限制

**核心问题：**
BIM 模型的楼层实体是**主建筑的子节点**，存储在场景的 `Hierarchy` 数组中，**不是独立实体**。

**因此：**
- ❌ `GetByEntityName()` 无法查询到楼层实体（返回空数组）
- ❌ `UpdateByEntityName()` 无法批量更新楼层显隐
- ❌ 楼层实体不在 `entitiesData` 中

**正确做法：**
```javascript
// Step 1: 获取所有实体
const allRes = await App.Scene.GetAll();

// Step 2: 从 Hierarchy 数组中筛选楼层（不是 entitiesData）
const allEntities = allRes.result.Hierarchy || [];

// Step 3: 根据 entityName 筛选目标楼层
const floorNames = ['xxx-GF-AR.rvt', 'xxx-1F-ST.rvt', ...];
const matchedEntities = allEntities.filter(e => {
    const name = e.entityName || e.BasicInfoAtom?.entityName;
    return floorNames.includes(name);
});

// Step 4: 逐个调用 SetVisible（无法使用批量 API）
for (const floorEntity of matchedEntities) {
    await floorEntity.SetVisible(isVisible); // true=显示, false=隐藏
}
```

**关键提示：**
1. 楼层文件名必须与场景中的 `entityName` 完全匹配（包括大小写和扩展名）
2. 主建筑模型（如"三层办公楼建筑.rvt"）通常也在 `Hierarchy` 中，注意区分
3. 隐藏楼层时建议确保主建筑模型保持可见

## 视觉反馈选型指南（重要）

| 高亮类型 | 适用 Skill | 方法 | 适用场景 |
|---------|-----------|------|---------|
| **实体描边** | `wdp-api-entity-general-behavior` | `SetEntityOutline` | 实体边缘发光轮廓，不改变外观 |
| **实体高亮** | `wdp-api-entity-general-behavior` | `SetEntityHighlight` | 改变表面颜色/透明度 |
| **BIM 构件高亮** | `wdp-api-bim-unified` | `SetNodeHighLight` / `SetNodesHighlight` | BIM 模型内部构件高亮 |
| **BIM 房间高亮** | `wdp-api-bim-unified` | `SetRoomHighLight` | BIM 房间/空间高亮 |
| **模型材质高亮** | `wdp-api-material-settings` | `SetEntitySlotsHighlight` | 模型 mesh slot 级别高亮 |
| **Tiles 节点高亮** | `wdp-api-layer-models` | `SetNodesHighlight` | AES 底板 Tiles 节点高亮 |
| **Tiles 图层高亮** | `wdp-api-layer-models` | `SetLayersHighlight` | AES 底板图层高亮 |
| **临时悬浮提示** | 无需 3D API | CSS / 覆盖物 | 用 UI 层实现更灵活 |

**⚠️ 关键区分**：
- **实体描边** (`SetEntityOutline`)：适用于选中标识，不改变实体外观，边缘发光
- **实体高亮** (`SetEntityHighlight`)：适用于区域/组级标识，改变表面颜色/透明度
- BIM 相关高亮需要使用 `wdp-api-bim-unified`，需要安装 BIM 插件
- 材质级别高亮需要使用 `wdp-api-material-settings`

**选中/取消选中标准模式：**
1. 选中前：先清除之前的选中状态（避免多个同时选中）
2. 选中：设置描边/高亮
3. 取消：清除描边/高亮
4. 切换（toggle）：如果已选中则取消，否则选中

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 通过名称/自定义ID查不到对象 | 写入字段未在基础属性中正确设置 | 检查 `entityName`/`customId` 是否在基础属性中正确设置；确认大小写一致 |
| 批量删除误删 | 类型大小写错误或目标列表构造不当 | 检查类型大小写；确认目标列表构造正确；删除前输出目标清单摘要 |
| 显隐成功但视觉异常 | 被后续调用覆盖或对象自身状态变更 | 检查是否有后续调用覆盖了显隐状态；确认对象自身状态未发生变更 |

## 参考资料（相对路径）

- `../official_api_code_example/official-entity-general-behavior-core.md`
- `../official_api_code_example/official-entity-general-behavior-movement.md`
- `../official_api_code_example/official-entity-general-behavior-interaction.md`
- `../official_api_code_example/official-bim-full.md` — BIM 房间高亮方法真值来源（SetRoomHighLight 等，见完整 API 文档）

## 输出要求

始终输出：
1. 目标实体筛选方式
2. 执行行为与影响范围
3. 验证步骤与结果
4. 最小复现与回滚建议（如有）
