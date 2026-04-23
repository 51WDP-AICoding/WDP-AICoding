# official-entity-general-behavior 拆分分析报告

> 分析时间：2026-04-23
> 分析目标：评估 official-entity-general-behavior.md (2402行) 是否需要拆分，以及如何按高频组合方式拆分

---

## 一、当前文件规模评估

| 指标 | 数值 |
|------|------|
| 总行数 | 2,402 行 |
| Topic 数量 | 16 个 |
| 平均每个 Topic | ~150 行 |

**与 coverings 对比**：
- coverings 拆分前：2,431 行 → 拆分为 3 文件（1220+222+890）
- entity-general-behavior 当前：2,402 行

---

## 二、Topic 分类与内容分布

| Topic | id | 核心内容 | 估计行数 | 业务场景使用频率 |
|-------|----|---------|---------|-----------------|
| 实体一般行为 | 1358 | GetByTypes/GetByEntityName/GetByCustomId/GetByEids/GetAll + SnapTo + SetVisible + ClearByTypes/Objects/Eids | ~244行 | 极高（所有场景都用到查询和清理） |
| Eid通用行为 | 1359 | GetByEids + ClearByEids | ~34行 | 高 |
| EntityName通用行为 | 1360 | GetByEntityName + UpdateByEntityName/Names + FocusByEntityName + ClearByEntityName | ~123行 | 中 |
| CustomId通用行为 | 1361 | GetByCustomId + UpdateByCustomId/Ids + FocusByCustomId + ClearByCustomId | ~124行 | 中 |
| 实体操作行为 | 1362 | GetEntitiesInViewport/PickEntityByRectangle/StartRectPick/EndRectPick/SetDefaultActionSetting/Gizmo | ~178行 | 中（编辑器场景） |
| 设置实体/单体轮廓&高亮 | 1363 | SetVisualColorStyle/SetOutlineThickness + SetEntityOutline/Highlight + 颜色列表(64行) | ~120行 | 中 |
| 选中实体操作行为 | 1364 | Selection.Add/GetSelection/RemoveSelection/ClearSelection | ~30行 | 低 |
| 选中单体操作行为 | 1365 | NodeSelection.Add/Remove/Clear/Draw | ~40行 | 低 |
| 实体[裁剪]行为 | 1366 | Clip/UnClip（HeatMap/ColumnarHeatMap） | ~40行 | 低 |
| 实体[编辑]行为 | 1367 | Modify（Path/HeatMap系列） | ~160行 | 低 |
| 实体[批量]行为 | 1368 | Scene.Create/Creates | ~120行 | 高（批量创建场景） |
| 实体移动 | 1369 | Bound 路径绑定 | ~80行 | **极高**（巡检/巡逻/接驳车） |
| 数据驱动实体移动 | 1370 | 数据驱动移动 | ~50行 | 低 |
| 实体点击事件 | 1371 | OnEntityClicked/OnEntityDbClicked | ~30行 | 高 |
| 场景管理高级操作 | 1357-ext | GetBoundingBox/ArrayDuplicate/RunAction/CreateByGeoJson | ~120行 | 中 |
| 实体滑过事件 | 1372 | OnMouseEnterEntity/OnMouseOutEntity | ~20行 | 中 |

---

## 三、业务场景使用模式分析

基于 `wdp-intent-orchestrator/resources/business-scenarios/` 分析：

| 业务场景 | entity-general-behavior 使用内容 | 使用频率 |
|---------|--------------------------------|---------|
| **AI机器狗巡逻** | Bound（路径绑定）、Scene.Add、Scene.Delete | **极高** |
| **景区接驳车监控** | Bound、Scene.Add、Scene.Update、Scene.Delete | **极高** |
| **AI机器人巡检** | Bound、Scene.Add | **极高** |
| **视频周界监控** | Scene.Creates、Scene.Delete、ClearByTypes | 高 |
| **应急指挥** | Scene.Creates、Scene.Delete、ClearByTypes | 高 |
| **火情告警** | Scene.Creates、Scene.Delete | 高 |
| **网格化巡检** | Scene.Creates、Scene.Delete、ClearByTypes | 高 |
| **森林防火扑救** | Bound、Scene.Creates、Scene.Delete | 高 |
| **BIM楼层拆解** | GetByEids（获取BIM实体） | 中 |

### 高频组合模式

**模式 A：实体查询与清理**（最高频）
- GetByTypes / GetByEids / GetByEntityName / GetByCustomId / GetAll
- ClearByTypes / ClearByEids / ClearByEntityName / ClearByCustomId / ClearByObjects
- SetVisible / SnapTo

**模式 B：路径移动**（高频，特定场景）
- Bound（路径绑定）
- Scene.Add(Bound)
- 相机跟随（CameraControl.Follow，属于 camera skill）

**模式 C：批量创建**（中频）
- Scene.Create / Creates
- UpdateByEntityName / UpdateByCustomId

**模式 D：选择与高亮**（中频，编辑器/交互场景）
- GetEntitiesInViewport / PickEntityByRectangle / StartRectPick
- SetEntityOutline / SetEntityHighlight
- Selection / NodeSelection

**模式 E：实体编辑**（低频）
- Modify（Path/HeatMap）
- Clip/UnClip

---

## 四、拆分方案建议

### 方案一：按功能域拆分（推荐）

基于业务紧密度和职责边界，拆分为 3 个文件：

#### 文件 1：实体查询与管理 (official-entity-general-behavior-core.md)
**预计行数**：~600 行
**包含 Topic**：
- 实体一般行为（1358）- GetByTypes/GetByEids/GetByEntityName/GetByCustomId/GetAll
- Eid通用行为（1359）
- EntityName通用行为（1360）
- CustomId通用行为（1361）
- 实体操作行为（1362）- Gizmo部分
- 实体点击/滑过事件（1371, 1372）

**理由**：这些是所有场景的**基础操作**，几乎所有业务场景都会用到查询和清理。

#### 文件 2：实体移动与批量操作 (official-entity-general-behavior-movement.md)
**预计行数**：~300 行
**包含 Topic**：
- 实体移动（1369）- Bound 路径绑定
- 数据驱动实体移动（1370）
- 实体[批量]行为（1368）- Scene.Create/Creates

**理由**：Bound 是巡检/巡逻/接驳车场景的**核心能力**，与批量创建在"复杂场景搭建"中经常一起使用。

#### 文件 3：实体交互与编辑 (official-entity-general-behavior-interaction.md)
**预计行数**：~400 行
**包含 Topic**：
- 实体操作行为（1362）- Picker/RectPick/选择
- 设置实体/单体轮廓&高亮（1363）- 含64行颜色列表
- 选中实体操作行为（1364）
- 选中单体操作行为（1365）
- 实体[裁剪]行为（1366）
- 实体[编辑]行为（1367）- Modify
- 场景管理高级操作（1357-ext）

**理由**：这些属于**高级交互和编辑能力**，主要用于编辑器场景或需要用户交互的复杂场景。

---

### 方案二：保守拆分（2文件）

#### 文件 1：核心实体行为 (official-entity-general-behavior-core.md)
**包含**：查询/清理/移动/批量 + 事件
**预计行数**：~900 行

#### 文件 2：高级交互与编辑 (official-entity-general-behavior-advanced.md)
**包含**：选择/高亮/裁剪/编辑/高级操作
**预计行数**：~500 行

---

### 方案三：不拆分，仅精简

**适用条件**：
- 如果认为所有内容都属于"实体通用行为"单一职责
- 且可以通过精简冗余内容（重复类型列表、颜色列表）减少行数
- 则保持现状

**精简潜力**：
- 重复的类型列表：约 5 处重复，每处约 30 行 = 150 行冗余
- 颜色列表：64 行（可链接到官方文档而非内联）
- 总计可减少约 200 行

---

## 五、关键结论与建议

### 5.1 是否需要拆分？

**建议：需要拆分，采用方案一（3 文件）**

理由：
1. **文件过大**：2402 行对于 AI 单次读取和精确检索存在压力
2. **职责可分离**：查询管理、移动批量、交互编辑三个领域有明确的职责边界
3. **场景匹配**：不同业务场景关注不同部分（巡检关注 Bound，编辑器关注 Picker/Highlight）
4. **与 coverings 对齐**：coverings 已按业务紧密度拆分，entity-general-behavior 也应保持一致风格

### 5.2 推荐的拆分方式

**首选方案一（3 文件）**：
- core：查询管理（600行）- 所有场景的入口
- movement：移动批量（300行）- 巡检/巡逻/接驳车专用
- interaction：交互编辑（400行）- 编辑器/高亮/裁剪

### 5.3 配套 SKILL 调整

如果拆分 official 文件，`wdp-api-entity-general-behavior/SKILL.md` 需要同步更新：
1. **路由表更新**：明确三个分类的使用场景
2. **快速参考索引**：按分类重新组织
3. **交叉引用**：说明何时需要组合使用

### 5.4 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 拆分后跨文件引用复杂 | 在 SKILL 中维护清晰的分类索引 |
| 历史代码依赖原文件名 | 保留原文件作为过渡期 |
| AI 可能加载错误分类 | 通过场景类型精准路由 |

---

## 六、实施建议（如决定拆分）

### 阶段一：准备
1. 创建 3 个新 official 文件
2. 将内容按上述分类迁移
3. 更新 `OFFICIAL_EXCERPT_INDEX.md` 索引

### 阶段二：SKILL 同步
1. 更新 `wdp-api-entity-general-behavior/SKILL.md` 的路由和索引
2. 更新 `wdp-intent-orchestrator` 的场景模块引用（如有需要）

### 阶段三：验证
1. 检查所有业务场景是否仍能正确路由
2. 验证 AI 在生成代码时是否能正确组合使用

---

## 附录：当前 Topic 完整列表

| 序号 | Topic | id | 建议归属 |
|------|-------|----|---------|
| 1 | 实体一般行为 | 1358 | core |
| 2 | Eid通用行为 | 1359 | core |
| 3 | EntityName通用行为 | 1360 | core |
| 4 | CustomId通用行为 | 1361 | core |
| 5 | 实体操作行为 | 1362 | interaction（Picker部分）/ core（Gizmo部分） |
| 6 | 设置实体/单体轮廓&高亮 | 1363 | interaction |
| 7 | 选中实体操作行为 | 1364 | interaction |
| 8 | 选中单体操作行为 | 1365 | interaction |
| 9 | 实体[裁剪]行为 | 1366 | interaction |
| 10 | 实体[编辑]行为 | 1367 | interaction |
| 11 | 实体[批量]行为 | 1368 | movement |
| 12 | 实体移动 | 1369 | movement |
| 13 | 数据驱动实体移动 | 1370 | movement |
| 14 | 实体点击事件 | 1371 | core |
| 15 | 场景管理高级操作 | 1357-ext | interaction |
| 16 | 实体滑过事件 | 1372 | core |

---

*分析完成。如需实施拆分，建议先与用户确认方案后执行。*
