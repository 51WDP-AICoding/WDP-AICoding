# API Code Example Index（新版后台摘录）

版本基线：WDP API 2.2.1
（BIM 条线基线：BIM API 2.1.1）

## 来源与边界

- 来源：`wdpapidoc-admin` 鉴权后台接口（非公开）。
- 第一优先来源：`https://wdpapidoc-admin.51aes.com/manual/doc`（第一轮编写/补完仅使用该来源）。
- 本地摘录用于提升生成代码速度，减少重复在线查询。
- 不在仓库中保存后台 token；每次查询前向用户索取临时 token。
- 其他资料（本地历史文件、案例）默认不参与第一轮，只有在你要求交叉验证时才使用。

## 官方脚本摘录（可读版）

- `official-general-event-registration.md`（通用事件监听）
- `official-initialize-scene.md`（场景初始）
- `official-scene-camera.md`（场景相机）
- `official-generic-base-attributes.md`（通用基础属性）
- `official-entity-general-behavior.md`（实体/单体通用行为：实体一般行为）
- `official-entity-coverings.md`（实体覆盖物：已整理完整）
- `official-layer-models.md`（图层/模型：图层控制 + 模型控制）
- `official-material-settings.md`（材质设置：材质替换 + 材质高亮）
- `official-cluster.md`（点聚合：数据部署 + 效果配置 + 周边搜索）
- `official-function-components.md`（功能组件：环境 + 控件 + 工具 + 设置）
- `official-bim-core-operations.md`（BIM 首批：模型列表 + Hierarchy 加载）
- `official-bim-full.md`（BIM 全量：通用事件/BIM事件/通用行为/全局设置/模型行为/构件行为/空间操作）
- `official-gis-full.md`（GIS 全量：事件监听/部署/通用行为/矢量图层/影像图层/3DTiles 图层）

说明：
- 若后台草稿与线上已发布文档不一致，开发默认以线上发布口径为准，除非用户明确指定按后台草稿执行。
- 每次对本目录的实质性变更（新增/修正/合并/删除）均记录在 `CHANGELOG.md`。

## 按官网分类的整理进度（WDP API 2.2.1）

1. 通用事件监听：已整理
2. 场景初始：已整理（补充完整事件列表 + Renderer控制方法）
3. 场景相机：已整理（补充Camera机位对象 + CameraStart完整用法）
4. 通用基础属性：已整理
5. 实体/单体通用行为：已整理（补充GetBoundingBox/ArrayDuplicate/RunAction/CreateByGeoJson等）
6. 实体覆盖物：已整理（补充CustomPoi/Group/智能建模系列/StaticInstance/UI事件监听）
7. 图层/模型：已整理（补充Tiles激活/节点分组/NodeSelection/GetNodesBoundingBox）
8. 材质设置：已整理
9. 点聚合【私有化环境/lite】：已整理
10. 功能组件：已整理（补充屏幕拾取/PickerPolyline/DOM坐标绑定/AssetLoader/DaaS）
11. 空间理解（新增）：已整理（坐标转换/GetGlobal/GetAll/GetBoundingBox/取点工具）
12. BIM API（全量分类）：已整理（基于在线文档管理平台）
13. GIS API（全量分类）：已整理（基于在线文档管理平台，GIS 2.1.0）

## 交叉验证补充（案例驱动）

1. `CpmpleteAppSmples/ComputerCenterDigitalTwinManagement`
- 补充能力：`HeatMap / Path / Bound / Scene.Create(s) / ClearByTypes`
- 对应模板：`covering-advanced.template.js`

2. `CpmpleteAppSmples/HospitalDigitalTwinManagement`
- 补充能力：`Plugin.Install(BimApi) / CameraRoam / PlayRoam / StopRoam`
- 对应模板：`bim-plugin-and-roam.template.js`
