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

## 注意事项与底线

1. **不做代码生成**：本技能专职做“解析与立项架构图”，不要在本环节过早编写具体业务的 `.js` 执行代码。梳理清晰后指导自己切换回具体 API skill 进行开发。
2. **参数门禁的刚性**：绝不允许在产生《意图与架构设计报告》时使用伪造的 URL 或 Order 的占位符（如 'YOUR_URL'）。遇到缺失必须直接向用户发起询问拦截。
3. **不可逆行为的确权**：如果需求涉及到业务全局卸载、全部对象清除，需要在模块功能说明里加上【确认锁】以防错删。
