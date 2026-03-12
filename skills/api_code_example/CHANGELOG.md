
记录每次对 `skills/` 目录的实质性变更，包括新增内容、修正、合并与删除。

---

## [2026-03-12] 空间探查策略优化：轻重分层 + 内存安全

### 背景
`GetAll()` 在大型场景中可能返回数百至数千个实体对象，全量获取会产生大量数据并占用内存。
将探查函数拆分为轻重两层，默认只执行轻量层，避免不必要的性能开销。

### 更新文件

#### `skills/wdp-api-spatial-understanding/SKILL.md`
- **标准流程重构**：明确分为"轻量层（默认执行）"和"重量层（按需执行）"两层
- **轻量层**（默认）：坐标系原点、相机位置、底板图层（GetTiles）、坐标往返验证，不调用 `GetAll()`
- **重量层**（按需）：`GetAll()` 全量实体统计 + `GetBoundingBox()`，仅在用户明确要求时调用
- **内存安全**：重量层执行后只保留统计摘要（`entityCount` + `entityTypeMap`），立即 `entities = null` 释放实体对象引用
- **新增 `window._wdpSpatialBaseline` 数据结构说明表**：明确每个字段的来源层（轻量/重量）和类型

#### `WORK_PLAN.md`
- 新增"完成记录"表格，标记 P0/P1/P3/P4/P6 及本次优化的完成状态
- 清理已完成项，保留待完成项（P2/P3-剩余/P5/P7）

#### `skills/README.md`
- "当前 API 资料状态"补充两轮补充说明及新增 `official-spatial-understanding.md` 条目

---

## [2026-03-12] 第二轮补充：基于 docx 原始文档填补 API 缺口

### 背景
读取 `WDPAPI 文档（补充出入参信息）.docx` 原始文档，精准补完上一轮遗留的 API 缺口。

### 更新文件

#### `official-entity-coverings.md`
- **Vegetation 剔除区域管理**：补充 `QueryRegion`（查询）、`RemoveRegion`（移除）、`UpdateRegionName`（改名）、`ToggleRegion`（启用/禁用）四个方法，含 `cullRegions` 完整结构说明
- **StaticInstance 完整 instanceComponentInfos 结构**：补充 `componentName/parentName/assetId/meshName/componentLocation/componentRotator/componentScale/nodeIds/positions/idToRotator/idToScale/hiddenIds` 全字段说明
- **StaticInstance 额外方法**：补充 `DeleteComponents`、`SetComponentsTransform`（key 格式为 `componentName_meshName`）、`DeleteNodes`、`SetNodesTransform`、`OutlineComponents`、`FocusComponents` 六个方法

#### `official-function-components.md`
- **修正 `Screen.AddScreenPosBound` 入参**：原文档入参为单个 `id/location/offset/bAutoHide`，修正为正确的批量入参 `locations`（数组）+ `enableChangeNotify`（数组），出参为 `{ ids: [...] }`
- **新增 `Cluster.Start/End/Modify`**：补充完整的 DaaS 数据聚合 API，含 `openOnClick/mode/url/aggregationLimit/algorithm/filters.attr` 完整结构，`aggicon/covering` 样式配置，以及 `Modify` 的可选参数说明

### 确认已完整（无需修改）
- `official-entity-general-behavior.md`：`GetTypesByEids` 出参、`Scene.Move` 完整入参已在上一轮补充
- `official-initialize-scene.md`：`StartByTaskId`、`SetResolutionMultiple`、`GetInfomation`、`GetApiVersion` 已在上一轮补充

---

## [2026-03-12] 空间基准探查固化为接入标准流程

### 背景
接入新渲染场景时，需要在场景就绪后立即获取空间基础信息（坐标系原点、相机位置、实体分布、包围盒、底板图层），作为后续业务开发的前置确认。将此步骤固化为强制标准流程，避免每次接入遗漏。

### 更新文件

#### `skills/wdp-api-initialize-scene/SKILL.md`
- 在"标准时序"中新增**第6步：执行空间基准探查（强制，每次接入执行一次）**
- 明确触发时机：`OnWdpSceneIsReady && progress === 100` 后立即执行
- 指向 `wdp-api-spatial-understanding/SKILL.md` 获取具体实现

#### `skills/wdp-api-spatial-understanding/SKILL.md`
- 新增**定位说明**：明确本技能是每次接入的强制步骤，由 initialize-scene 第6步触发
- 新增**可复用探查函数模板** `exploreSpatialBaseline()`，包含6个探查项：
  1. 坐标系原点与坐标系类型（GetGlobal）
  2. 相机默认位置（GetCameraPose）
  3. 实体列表与类型分布（GetAll + reduce 统计）
  4. 场景整体包围盒（GetBoundingBox）
  5. AES 底板图层（GetTiles + GetLayers，按需）
  6. 坐标系往返验证（GISToCartesian → CartesianToGIS，误差 <0.000001）
- 探查结果存入 `window._wdpSpatialBaseline`，供后续业务使用

### 影响范围
- 所有新接入 WDP 场景的项目，均应在 `OnWdpSceneIsReady` 回调中调用 `exploreSpatialBaseline()`
- 未完成探查前不得开始业务编码（坐标系类型未确认时，GIS 坐标可能存在 GCJ02 偏移风险）

---

## [2026-03-11] 第一轮系统性补充（WDP API 2.2.1 基线）
- 补充 `ClearByTypes`（按类型批量清除）

#### `official-entity-coverings.md`
- 新增 `CustomPoi`（三态样式 POI，>=1.16.2 & >=2.1.2）
- 新增 `Group`（实体组：Add/Remove/UnGroup/Delete）
- 新增智能建模系列：Vegetation / ModelerEmbank / ModelerWater / ModelerRiver / ModelerFence / ModelerFloor
- 新增 `StaticInstance`（静态模型实例化，适合大量重复模型）
- 补充 PoiUI 事件监听（onClick/onHover）
- 补充 PoiUI 坐标跟随（配合 Screen.AddScreenPosBound）
- 补充 WindowUI 双向通信（w51_event + PostMessage）

#### `official-layer-models.md`
- 补充 AES Tiles 激活/停用（ActivateAesTiles/DeactivateAesTiles/IsActivated）
- 补充手动创建底板（CreateAesTilesEntityWithOutGRPC）
- 补充节点可见性分组（AddVisibilityGroup/UpdateVisibilityGroup/RemoveVisibilityGroup/GetVisibilityGroup）
- 补充 NodeSelection 合并操作（AddDraw/RemoveDraw/ClearDraw）
- 补充 `GetNodesBoundingBox`（节点包围盒，>=2.2.1）

#### `official-function-components.md`
- 补充 `Picker.PickByScreenPos`（屏幕拾取实体，含出参结构）
- 补充 `Picker.PickAesTilesNodeByScreenPos` / `PickAesTilesNodesByRectangle`（AES节点拾取）
- 补充 `Picker.PickMaterialByScreenPos`（材质拾取）
- 补充 `PickerPolyline`（取线工具：Start/GetPickedPolylines/End + 事件监听）
- 补充 `Screen.AddScreenPosBound`（DOM坐标绑定/更新/移除）
- 补充 `AssetLoader`（LoadAssetById/ReplaceAssetById/GetMeshSizeById）
- 补充 `DaaS.GetCloudDiskFileList`（云盘文件列表）

### 合并与删除（减少冗余，提升 AI 调度效率）

本轮补充初期创建了 3 个 `-extended.md` 临时文件，经架构评估后合并回功能域文件并删除：

| 删除文件 | 合并去向 | 合并原则 |
|---------|---------|---------|
| `official-entity-coverings-extended.md` | → `official-entity-coverings.md` | 同一功能域（实体类型），去重后只追加原文件缺失内容 |
| `official-tools-extended.md` | → `official-function-components.md` | 同一功能域（工具类），去重后只追加原文件缺失内容 |
| `official-component-ui.md` | → `official-entity-coverings.md` | UI组件事件监听属于覆盖物行为补充，基础创建用法原文件已有 |

**合并决策依据：** AI 检索基于文件名+内容语义匹配，分散的 `-extended.md` 文件会增加"去哪个文件找"的歧义成本。按功能域合并、控制单文件 <400行，是一次命中率最高的结构。

### 更新 OFFICIAL_EXCERPT_INDEX.md
- 整理进度条目从 12 项更新为 13 项（新增空间理解）
- 各条目补充具体补充内容说明

---

## [历史] 初始版本（第一轮线上核对）

- 基于公开 wdpapidoc API 完成 13 个分类的方法级摘录
- 核对结果见 `ONLINE_COVERAGE_AUDIT.md`
- 同步脚本见 `sync_public_official_excerpts.ps1`
