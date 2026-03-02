# API Code Example（WDP 2.2.1）

本目录提供可直接复用的 API 脚本摘录与模板，目标是减少重复生成代码的成本。

## 文件清单

1. `initialize-scene.template.js`
- 场景初始化与启动链路模板
- 对应技能：`../wdp-api-initialize-scene/SKILL.md`

2. `general-event-registration.template.js`
- 通用事件注册模板
- 对应技能：`../wdp-api-general-event-registration/SKILL.md`

3. `scene-camera.template.js`
- 相机读取/飞行/聚焦模板
- 对应技能：`../wdp-api-scene-camera/SKILL.md`

4. `generic-base-attributes.template.js`
- 通用基础属性读取/更新模板
- 对应技能：`../wdp-api-generic-base-attributes/SKILL.md`

5. `entity-general-behavior.template.js`
- 实体/单体通用行为模板（检索、显隐、删除、落地）
- 对应技能：`../wdp-api-entity-general-behavior/SKILL.md`

6. `entity-coverings.template.js`
- 实体覆盖物模板（实时视频、Window、POI、Web组件）
- 对应技能：`../wdp-api-entity-coverings/SKILL.md`

7. `layer-models.template.js`
- 图层/模型模板（图层控制、node控制、模型控制）
- 对应技能：`../wdp-api-layer-models/SKILL.md`

8. `material-settings.template.js`
- 材质设置模板（材质创建、拾取、替换、高亮）
- 对应技能：`../wdp-api-material-settings/SKILL.md`

9. `cluster.template.js`
- 点聚合模板（数据部署、聚合配置、周边搜索）
- 对应技能：`../wdp-api-cluster/SKILL.md`

10. `function-components.template.js`
- 功能组件模板（环境、控件、工具、设置）
- 对应技能：`../wdp-api-function-components/SKILL.md`

11. `bim-core-operations.template.js`
- BIM 首批模板（模型列表、Hierarchy 加载）
- 对应技能：`../bim-api-core-operations/SKILL.md`

12. `bim-model-behaviors.template.js`
- BIM 模型行为模板（激活、移动、旋转、缩放、聚焦、显隐、落地、剖切、拆楼、卸载）
- 对应技能：`../bim-api-core-operations/SKILL.md`

13. `bim-component-space.template.js`
- BIM 构件/空间模板（构件树、搜索、属性、聚焦、显隐、高亮、坐标、移动、空间高亮/聚焦）
- 对应技能：`../bim-api-core-operations/SKILL.md`

14. `covering-advanced.template.js`
- 覆盖物高级模板（HeatMap、Path、Bound、Scene.Create(s)、ClearByTypes）
- 对应技能：`../wdp-api-covering-advanced/SKILL.md`

15. `bim-plugin-and-roam.template.js`
- BIM 插件与漫游模板（Plugin.Install、CameraRoam、PlayRoam/StopRoam）
- 对应技能：`../wdp-bim-plugin-and-roam/SKILL.md`

16. `gis-core-operations.template.js`
- GIS 核心模板（GisApi 安装、GeoLayer 加载、图层更新/偏移/高亮）
- 对应技能：`../gis-api-core-operations/SKILL.md`

17. `official-*.md`
- 来自新版后台的可读脚本摘录（用于快速复制方法）
- BIM 全量摘录：`official-bim-full.md`（按 BIM 2.1.1 官网分类）
- GIS 全量摘录：`official-gis-full.md`（按 GIS 2.1.0 官网分类）

18. `DOC_PLATFORM.md`
- 文档平台固定入口（公共文档站 + 管理后台）

## 使用方式

1. 优先查看 `official-*.md` 获取对应 API 的现成脚本。
2. 在项目中复制模板文件并替换 `TODO`、参数对象和业务回调。
3. 保留时序门禁：`Renderer.Start()` 成功后再注册场景事件，场景 ready 后再进入业务调用。

## 安全与流程约束

- 不在仓库或脚本中保存后台 token。
- 每次需要查询 `wdpapidoc-admin` 时，由用户临时提供 token。
- 若后台草稿与线上发布文档冲突，默认按线上发布口径执行，除非用户明确指定按后台草稿。

## 参数约定（统一）

- `id`: 渲染容器 DOM id，默认 `player`
- `url`: 渲染服务地址，默认 `https://dtp-api.51aes.com`
- `order`: 32 位十六进制渲染口令
- `resolution`: 分辨率数组 `[width, height]`
- `debugMode`: 日志级别，默认 `normal`
- `keyboard`: 键盘配置，默认 `{ normal: false, func: false }`
