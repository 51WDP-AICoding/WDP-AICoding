# Skills API Code Example — 更新日志

记录每次对 `skills/` 目录的实质性变更，包括新增内容、修正、合并与删除。

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

### 背景
基于 `wdpapidoc-admin` 后台接口完成第一轮方法级摘录后，发现以下问题：
1. 多个文件缺少出参结构，AI 生成代码时无法验证返回值
2. 部分新增实体类型（CustomPoi、Group、智能建模系列）未覆盖
3. 工具类（屏幕拾取、DOM坐标绑定、取线工具）完全缺失
4. 空间理解（坐标转换、包围盒）无独立 skill 文件

### 新增文件

| 文件 | 内容说明 |
|------|---------|
| `official-spatial-understanding.md` | 空间理解与坐标转换：GetGlobal/GetAll/GetBoundingBox/GIS↔Cartesian/取点工具 |
| `skills/wdp-api-spatial-understanding/SKILL.md` | 空间理解 sub-skill，含路由规则与典型用法 |

### 更新文件（补充缺失内容）

#### `official-initialize-scene.md`
- 补充完整事件列表（OnVideoStreamConnected/OnVideoStreamDisconnected/OnVideoStreamError 等 5 个视频流事件）
- 补充 `App.Renderer` 控制方法出参结构（Stop/Restart/GetStats/GetSnapshot）
- 补充 `OnSceneError` 错误事件及错误码说明

#### `official-scene-camera.md`
- 补充所有关键方法出参结构（FlyTo/Focus/GetCameraInfo 等）
- 新增 Camera 机位对象完整用法（含 SaveCamera/LoadCamera/DeleteCamera）
- 新增 CameraStart 对象（场景初始相机配置）完整参数说明

#### `official-entity-general-behavior.md`
- 补充场景管理高级操作：`GetBoundingBox`（多实体包围盒）、`ArrayDuplicate`（阵列复制）
- 补充 `SetSceneStyle`（场景风格化）、`RunAction`/`EndAction`（矢量工具编排）
- 补充 `CreateByGeoJson`（GeoJSON 批量创建实体）
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
