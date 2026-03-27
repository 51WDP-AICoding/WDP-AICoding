---
name: wdp-intent-orchestrator
description: WDP 意图编排与需求精确化。负责在最上游解析用户混沌的业务诉求，推导场景隐藏模块，输出带有正确 API 组合架构且参数合规的《系统意图与架构设计报告》。是连接人类意图与底层子域代码生成的“产品经理兼架构师”。
---

# WDP 意图编排技能 (Intent Orchestrator)

本技能结合了**模糊业务场景解析（架构推导）**与**技术参数/时序规范验证（需求澄清）**的两大核心优势。
它作为工作流的最上游网关，负责把普通人类描述（如“我要实现安防巡检”）规范化为 WDP 开发的结构化工程意图，再分发给下游技能。

## 前置动作

任何使用本库的 AI 在处理新任务的第一句话时，必须先启动**意图编排工作流**，完成以下核查。

## 标准工作流（Pipeline）

### 阶段 1：场景解析与降维拆解
理解用户的混沌需求，提取出需要实现的 WDP 系统功能模块。

1. **提取关键词**：抓取关键业务实体语汇（如周界、巡检、点位绑定等）。
2. **场景模板匹配**：查阅本目录的 `resources/business-scenarios.json` 模板库。如果符合现有预设（如应急指挥、视频周界），直接复用其拆分好的一系列“模块”。
3. **推导隐藏需求**：人类通常只会描述主路径（“我要一个地图”），你必须主动补全交互所需的衍生模块（例如：弹层信息窗、视角重置、高亮态交互）。

### 阶段 2：架构选型与调用序列（API Architecture）
不要立刻写代码，而是先“选好组件”。

1. 读取 `resources/wdp-api-catalog.unified.json` 与 `resources/api-patterns.json`。
2. 为阶段 1 中分拆出的每一个模块分配必须的 **顶级 WDP API**。
3. **时序组合**：根据组合经验，排出这批 API 的调用顺序，如 `新实例化(new) -> 追加场景(Scene.Add) -> 注册事件(RegisterSceneEvent) -> 相机位移(SetCameraPose)`。

### 阶段 3：技术域边界与依赖收口
在选定了 API 之后，为这些模块“找业务归属域”。

1. **主要与次要域认领**：明确本需求要转交给哪些技能域干活。在解析出 `wdp-api-catalog.unified.json` 中的 `domain` 时，请严格映射至本仓库的以下子技能域目录：
   - `initialization` -> `wdp-api-initialization-unified`
   - `events` -> `wdp-api-general-event-registration`
   - `camera` -> `wdp-api-camera-unified`
   - `base-attributes` -> `wdp-api-generic-base-attributes`
   - `entity-behavior` -> `wdp-api-entity-general-behavior`
   - `coverings` -> `wdp-api-coverings-unified`
   - `layers-models` -> `wdp-api-layer-models`
   - `materials` -> `wdp-api-material-settings`
   - `cluster` -> `wdp-api-cluster`
   - `function-components` -> `wdp-api-function-components`
   - `bim` / `bim-core` -> `wdp-api-bim-unified`
   - `gis` -> `gis-api-core-operations`
   - `spatial-understanding` -> `wdp-api-spatial-understanding`
2. **强制依赖与插件声明**：凡涉及 GIS 必须引入 GisApi 并执行 Plugin.Install；涉及 BIM 必须引入 BimApi 并完成授权解析。

### 阶段 4：防雷参数强校验（Clarification）
这是直接阻断下游踩坑的最重要门禁：

1. **绝对必要基础参数（必须校验）**：
   - 部署服务器 URL（`不写假值，无则必须追问用户`）
   - 验证口令 Order（`无则必须追问`）
   - 前端挂载容器 DOM ID（`若缺则默认 "player"`）
2. **业务逻辑/视觉参数（可选补充）**：
   - 操作的特定实体 UID/名称，高亮点云色号，动效时长等。（`可按常识 Mock 备选，并在随后的回复中标注`）
3. 对于因用户少给参数导致的阻断，应使用友好措辞进行反问追问。

---

## 报告模板（意图编排输出标准）

在经过上述4阶段逻辑运算后，你必须对外输出一份名为 `《系统意图与架构设计报告》` 的结构化摘要。报告的固定格式如下：

```markdown
# 🔍 系统意图与架构设计报告

## 📌 业务解构
- **原始诉求**：人类原始自然语言输入
- **衍生模块划分**：
  1. [主要功能名称]：需解决的目的...
  2. [关联补充模块]：为了形成完整体验而额外追捕的流程，如对象的兜底释放...

## 🏗️ 架构与 API 组合蓝图
- **命中的设计模式**：[如匹配到了 resources/api-patterns.json 中的某种 pattern]
- **模块 A (如周界围栏)**：`new App.Range()` -> `App.Scene.Add()`
- **模块 B (如交互高亮)**：`App.Renderer.RegisterSceneEvent()` -> `实体 UID 检索`
- **执行时序依赖**：先 [模块 A] 必须在 `scene.progress === 100` 后加载，再进行 [模块 B]。

## 📦 对应 WDP 技能子域分发
- **主域 (Primary)**：`wdp-api-xxx-unified`
- **辅助域 (Secondary)**：`wdp-api-yyy-unified`

## 🛡️ 核心参数与状态门禁校验
- [x] URL : `传入的具体值` (如果缺失则打 [ ] 并红字警告)
- [x] 口令 : `传入的具体值`
- [x] 容器 : `player` (默认推演)
- [] 动态 UID : `缺失，必须向用户追问`

## 🚷 防暴毙清理机制（Clean-up）
- [简述由于创建了哪些常驻物，所以在离开该业务模块时必须调用的销毁与解绑方法，如 Destroy/Clear 等]
```

## 阶段 5：执行计划细化（Execution Plan）

在架构确定后，进一步细化执行计划，明确各阶段的具体任务：

1. **初始化阶段**
   - SDK加载（CloudApi、WdpApi、BimApi/GisApi等）
   - 实例创建（new WdpApi()）
   - 渲染启动（App.Renderer.Start()）
   - 场景就绪监听（OnWdpSceneIsReady）

2. **准备阶段**
   - 插件安装（如需要：App.Plugin.Install()）
   - 数据加载（实体数据、配置数据等）
   - 基础环境设置（相机初始位置、初始视角等）

3. **业务实现阶段**
   - 核心功能实现（创建覆盖物、注册事件等）
   - 交互逻辑设置（点击、悬停、拖拽等）
   - 视觉效果配置（高亮、动画、材质等）

4. **验证与清理阶段**
   - 结果验证（功能是否按预期工作）
   - 资源清理（Clear、Delete、StopRoam等）
   - 错误处理（try-catch、错误回调等）

## 质量门槛

1. 必须识别出所有必要参数，并明确标记缺失的参数。
2. 必须考虑完整的依赖链，特别是初始化和场景就绪的前置依赖。
3. 执行计划必须包含验证和错误处理步骤。
4. 对于复杂需求，必须拆分为清晰的子任务。
5. 对每个可切换状态，确认存在开启路径 + 关闭路径 + toggle 支持 + 冲突处理。
6. 删除/卸载等不可逆操作必须有确认步骤。

## 高频问题处理

1. **参数不足**
   - 问题：用户提供的信息不足以实现需求
   - 解决：使用ask_followup_question工具提问，获取必要信息

2. **需求冲突**
   - 问题：用户需求中存在相互冲突的部分
   - 解决：明确指出冲突点，提供可行的替代方案

3. **技术限制**
   - 问题：用户需求超出WDP API能力范围
   - 解决：说明技术限制，提供最接近的可行方案

4. **性能考量**
   - 问题：用户需求可能导致性能问题
   - 解决：提出优化建议，如批量处理、减少实时计算等

## 示例转换

### 示例1：模糊需求转换

**原始需求**：
"我想做一个可以显示3D建筑，然后点击建筑物能高亮显示的功能。"

**结构化输出**：
```markdown
# 🔍 系统意图与架构设计报告

## 📌 业务解构
- **原始诉求**：我想做一个可以显示3D建筑，然后点击建筑物能高亮显示的功能。
- **衍生模块划分**：
  1. 场景初始化：加载SDK、创建实例、启动渲染
  2. 实体高亮交互：注册点击事件、获取实体、设置高亮

## 🏗️ 架构与 API 组合蓝图
- **命中的设计模式**：实体交互模式
- **模块 A (场景初始化)**：`new WdpApi()` -> `App.Renderer.Start()` -> `OnWdpSceneIsReady`
- **模块 B (实体高亮)**：`App.Renderer.RegisterSceneEvent(OnEntityClicked)` -> `entity.SetHighlight()`
- **执行时序依赖**：模块 A 必须在 `scene.progress === 100` 后，再进行模块 B

## 📦 对应 WDP 技能子域分发
- **主域 (Primary)**：`wdp-api-entity-general-behavior`
- **辅助域 (Secondary)**：`wdp-api-initialization-unified`, `wdp-api-general-event-registration`

## 🛡️ 核心参数与状态门禁校验
- [ ] URL : 缺失，必须向用户追问
- [ ] 口令 : 缺失，必须向用户追问
- [x] 容器 : `player` (默认推演)
- [ ] 建筑物实体ID/类型 : 缺失，必须向用户追问

## 🚷 防暴毙清理机制
- 高亮状态需要在组件卸载时清除
- 事件监听需要在页面关闭时解绑
```

### 示例2：复杂需求转换

**原始需求**：
"做一个地图，上面显示一些标记点，点击标记可以弹出信息，还要能切换地图的2D和3D视图。"

**结构化输出**：
```markdown
# 🔍 系统意图与架构设计报告

## 📌 业务解构
- **原始诉求**：做一个地图，上面显示一些标记点，点击标记可以弹出信息，还要能切换地图的2D和3D视图。
- **衍生模块划分**：
  1. 场景初始化与GIS加载：加载SDK、安装GIS插件、加载地图底图
  2. 标记点创建与交互：创建POI、注册点击事件、弹出信息窗口
  3. 视角切换控制：2D/3D视图切换、相机视角变换

## 🏗️ 架构与 API 组合蓝图
- **命中的设计模式**：GIS地图+覆盖物交互模式
- **模块 A (GIS初始化)**：`new WdpApi()` -> `App.Plugin.Install(GisApi)` -> `App.Renderer.Start()`
- **模块 B (标记点创建)**：`new App.Poi()` -> `App.Scene.Add()` -> `poi.onClick()`
- **模块 C (信息窗口)**：`new App.Window()` -> `App.Scene.Add()`
- **模块 D (视角切换)**：`App.CameraControl.SetCameraPose()`
- **执行时序依赖**：模块 A -> 地图加载完成 -> 模块 B -> 模块 C；模块 D 可随时触发

## 📦 对应 WDP 技能子域分发
- **主域 (Primary)**：`gis-api-core-operations`
- **辅助域 (Secondary)**：`wdp-api-coverings-unified`, `wdp-api-camera-unified`, `wdp-api-initialization-unified`

## 🛡️ 核心参数与状态门禁校验
- [ ] URL : 缺失，必须向用户追问
- [ ] 口令 : 缺失，必须向用户追问
- [x] 容器 : `player` (默认推演)
- [ ] 标记点数据 : 缺失，必须向用户追问（坐标和信息内容）
- [ ] 地图初始中心点 : 缺失，建议追问

## 🚷 防暴毙清理机制
- POI和Window需要在组件卸载时Delete
- 事件监听需要在页面关闭时解绑
- 相机漫游需要支持停止/重置
```

## 注意事项与底线

1. **不做代码生成**：本技能专职做"解析与立项架构图"，不要在本环节过早编写具体业务的 `.js` 执行代码。梳理清晰后指导自己切换回具体 API skill 进行开发。
2. **参数门禁的刚性**：绝不允许在产生《意图与架构设计报告》时使用伪造的 URL 或 Order 的占位符（如 'YOUR_URL'）。遇到缺失必须直接向用户发起询问拦截。
3. **不可逆行为的确权**：如果需求涉及到业务全局卸载、全部对象清除，需要在模块功能说明里加上【确认锁】以防错删。
