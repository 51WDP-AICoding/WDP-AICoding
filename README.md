# WDP AI Coding 项目更新日志

## 2026-03-26 更新记录

### 渲染器 (Renderer) 与底层回调能力升级

吸收并归纳了 `reference_skill/02-renderer` 环境下的全量生命周期控制与场景回调知识，全面提升了各个子系统的业务深度和诊断能力，主要改动如下：

#### 字典库 (Official Excerpt) 扩容
- **通用事件字典优化** (`official-general-event-registration.md`)：补充底层渲染云主控流断开及 WebRTC 的完整异常错误码对照表（13000~13007 等）。
- **初始化字典优化** (`official-initialize-scene.md`)：重写 `GetStats()` 用例，加入往返延迟、平均帧率、带宽大小及丢包率等弱网网络状况诊断参数的数据定义。

#### 子技能 (Sub Skill) 高阶认知增强
| Skill 文件 | 升级与补充内容 |
|-----------|---------|
| `wdp-api-general-event-registration` | 新增 **鼠标键位拦截**（通过 `triggerType` 防右键误触）、**框选状态差分**（通过 `selectionType` 判定加减清选区）以及原生视频弹窗的物理销毁拦截原则。 |
| `wdp-api-camera-unified` | 新增漫游过程中运用 `progressRatio` 获取漫游进度条回显的技巧，以及采用 `cameraMotionReason` 追溯用户操作或打断行为的检查清单。 |
| `wdp-api-material-settings` | 引入并强调基于 `OnWdpMaterialHit` 高阶事件抛出的 `materialIndex` 与 `meshName` 来替代普通点击事件，实现子构件/单个贴图面精准抓取换色的编排范式。 |

#### 统一检索导向更新
- **入口索引优化** (`OFFICIAL_EXCERPT_INDEX.md`)：在相机、事件和单体行为等条目中加入了网络状态、基础构件截获与打断判定等新标签与引导映射。

---

## 2026-03-24 更新记录

### 示例工程 (wdp-front-end-framework-sample)

#### 功能增强
- **新增手动获取空间信息按钮**：用户可随时点击按钮重新获取坐标系和相机信息
- **相机方法名修正**：`App.Camera.GetCurrentState()` → `App.CameraControl.GetCameraPose()`
- **坐标系信息展示优化**：排除 `CameraStart` 字段，避免与相机面板信息重复

#### 稳定性修复
- **循环引用处理**：`App.Scene.GetGlobal()` 返回的对象含循环引用，采用安全序列化避免 `JSON.stringify` 崩溃
- **时序修正**：`RegisterSceneEvent` 注册移至 `Renderer.Start()` 之前，消除竞态条件
- **延迟加载**：场景就绪后增加 2 秒延迟，确保内部对象完全初始化后再执行 API 调用

#### 工程结构
- **node_modules 本地化**：依赖从父目录迁移到工程文件夹内，便于打包分发
- **新增 package-lock.json**：锁定依赖版本，确保环境一致性

---

### Sub Skill 修正

#### 方法名对齐与文档补链

| Skill 文件 | 修正内容 |
|-----------|---------|
| `skills/wdp-api-spatial-understanding/SKILL.md` | `GetCurrentState` → `GetCameraPose`；增加循环引用处理说明；补链 `official-scene-camera.md` |
| `skills/wdp-api-entity-general-behavior/SKILL.md` | 补链 `official-bim-core-operations.md`（`SetRoomHighLight` 方法来源）|
| `skills/wdp-api-camera-unified/SKILL.md` | 方法列表与 `official-scene-camera.md` 对齐；增加"方法名以 official 为准"提示 |
| `skills/wdp-api-bim-unified/SKILL.md` | 补链 `official-scene-camera.md`（`CameraControl.Focus` 来源）|
| `skills/gis-api-core-operations/SKILL.md` | 补链 `GIS_PLUGIN_INSTALLATION.md` |

---

### 仓库清理

- **删除历史文件夹**：`feasibility_test_wdp_camera/`（6 个文件）
- **删除临时文件夹**：`temp_optimization/`（1 个文件）
- **清理临时脚本**：删除 `D` 和 `_tmp_write.js` 临时文件

---

### 新增内容

- **新增 Skill**：`skills/wdp-css-layer-management/SKILL.md`（CSS 图层管理）
- **新增示例工程**：完整的 WDP 前端框架示例，含插件安装、场景初始化、空间信息获取功能

---

### 提交记录

| Commit | 说明 |
|--------|------|
| `44ed2dd` | fix: 修正示例工程API调用错误 & sub skill跨域方法名对齐 |
| `b103cf3` | chore: remove obsolete feasibility_test_wdp_camera folder |
| `4e0db1f` | chore: remove obsolete temp_optimization folder |