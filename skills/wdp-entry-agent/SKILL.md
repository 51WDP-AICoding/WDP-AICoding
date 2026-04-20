---
name: wdp-entry-agent
description: WDP 能力统一入口与调度技能。用于识别需求所属 API 域、执行接入基线检查、路由到对应 sub skill，并按相对路径最小化加载参考资料以产出可执行方案。处理跨域问题时使用本技能。
---

# WDP 入口编排技能

作为对外分发时的唯一入口。只负责调度，不替代子 skill 的领域实现细节。

## ⚠️ 文档职责分工

| 文档类型 | 职责 | 禁止事项 |
|---------|------|---------|
| **Entry Agent（本文档）** | 路由判断、执行流程、基线检查 | 不包含具体 API 代码示例 |
| **Sub Skill** | 能力说明、使用场景、依赖关系 | 不包含具体返回结构、详细参数 |
| **official-*.md** | 具体 API 签名、返回结构、代码示例（唯一真值） | 不包含路由逻辑 |

**代码生成前必须查阅对应 official-*.md 文档获取准确代码示例，禁止基于 Skill 描述自行推理。**

---

## 🚨 执行流程（严格顺序）

| 步骤 | 必须读取 | 关键获取 | 阻断检查 |
|:---:|:---|:---|:---|
| **Step 0** | 判断任务类型 | - | 长流程任务必须初始化 wdp-context-memory |
| **Step 1** | `../wdp-intent-orchestrator/SKILL.md` | 《系统意图与架构设计报告》 | 未输出报告禁止继续 |
| **Step 2** ⚠️ | `../wdp-api-initialization-unified/SKILL.md` | `npm install wdpapi@^2.3.0`<br>`import WdpApi from 'wdpapi'` | **包名必须是 `wdpapi`**<br>不是 `@wdp-api/xxx` |
| **Step 3** | 按需读取 BIM/GIS skill | `Plugin.Install(xxxApi)` | 必须在 Renderer.Start 之前 |
| **Step 4** | 按需读取功能 skill：<br>- 事件注册：`wdp-api-general-event-registration`<br>- 相机控制：`wdp-api-camera-unified`<br>- 实体行为：`wdp-api-entity-general-behavior`<br>- 覆盖物：`wdp-api-coverings-unified`<br>- 图层模型：`wdp-api-layer-models`<br>- 材质设置：`wdp-api-material-settings`<br>- 点聚合：`wdp-api-cluster`<br>- 功能组件：`wdp-api-function-components`<br>- BIM：`wdp-api-bim-unified`<br>- GIS：`gis-api-core-operations`<br>- 空间理解：`wdp-api-spatial-understanding` | 业务 API 代码 | 必须等待 Scene Ready |

## 补充提醒：
> 🔴 **Step 0 判断标准（长流程任务）**
> 
> 符合以下任一条件，必须在 Step 0 初始化 wdp-context-memory：
> - 预计步骤超过 5 步
> - 需要跨多个 wdp-api-* skill 调用
> - 需要保持选中状态、相机位置等上下文
> - 任务可能分多次对话完成
> 
> 初始化方式：读取 `../wdp-context-memory/SKILL.md`

> 🔴 **Step 2 高频错误警示**
> 
> 执行此步骤时，**必须**确认：
> - 包名是 `wdpapi`（不是 `@wdp-api/cloud-api`）
> - 安装命令是 `npm install wdpapi@^2.3.0`
> - 导入方式是 `import WdpApi from 'wdpapi'`
> 
> 如果 npm 安装失败，**禁止**改用 CDN/script 标签，必须检查包名是否正确。

---

## 🚨 七条阻断性要求

| # | 要求 | 阻断场景 |
|:---:|:---|:---|
| 1 | **长流程任务必须初始化 wdp-context-memory** | 多步骤任务未使用状态管理 |
| 2 | 必须先执行意图编排 | 未读取 orchestrator 就写代码 |
| 3 | **必须读取 initialization** ⚠️ | npm 安装失败时未检查包名 |
| 4 | 必须检查 Context Memory | 重复创建 WDP 实例 |
| 5 | 必须使用骨架文件 | 直接从头写代码 |
| 6 | Plugin.Install 必须在 Renderer.Start 之前 | 顺序错误 |
| 7 | 核心参数（URL、Order）不得为假值 | 填入 `YOUR_URL` |
| 8 | **必须使用 npm install wdpapi** ⚠️ | 改用 CDN/script 标签 |

> ⚠️ **高亮**：第 1、3、8 条是最常见错误，执行时必须大声确认。

---

## 统一基线

| 类型 | 包名 | 版本 | 安装命令 |
|:---:|:---|:---:|:---|
| **核心 SDK** ⚠️ | `wdpapi` | `2.3.0` | `npm install wdpapi@^2.3.0` |
| BIM 插件 | `@wdp-api/bim-api` | `2.2.0` | `npm install @wdp-api/bim-api@^2.2.0` |
| GIS 插件 | `@wdp-api/gis-api` | `2.1.0` | `npm install @wdp-api/gis-api@^2.1.0` |

> ⚠️ **注意**：核心 SDK 包名没有 `@wdp-api/` 前缀！
> ⚠️ **注意**：npm行为ai自行安装失败率很高，给出具体步骤，让用户自行完成相关指令！

---

## 路由决策表（关键词快速匹配）

> 单一报错/参数改动命中单条路由；整链路开发需求合并加载多个子技能。

| 能力域/关键词 | 目标 Skill |
|--------------|-----------|
| 初始化 / npm安装 / Renderer.Start / 黑屏 / 容器 / wdpapi包 / 实例创建 | `wdp-api-initialization-unified` |
| 事件注册 / 回调 / 触发 / 解绑 / RegisterSceneEvent / OnEntityClicked / 事件不触发 / 重复触发 | `wdp-api-general-event-registration` |
| 相机 / 视角 / 飞行 / 漫游 / 跟随 / CameraControl / Focus / FlyTo / CameraRoam / 跟拍 | `wdp-api-camera-unified` |
| 属性读取 / .Get() / 代理对象 / GetBaseAttribute / SetBaseAttribute / 属性写入 / 循环引用 | `wdp-api-generic-base-attributes` |
| 实体检索 / 显隐 / 删除 / Bound / Scene.Move / ClearByTypes / Selection / NodeSelection / SnapTo | `wdp-api-entity-general-behavior` |
| 覆盖物 / POI / Window / Range / Path / 热力图 / Particle / Effects / 创建覆盖物 | `wdp-api-coverings-unified` |
| 底板 / Tiles / EarthTiles / 图层 / 单体 / node / SetNodesHighlight / SetLayersVisibility | `wdp-api-layer-models` |
| 材质 / 高亮 / 拾取 / PickerMaterial / SetEntitySlotsHighlight / Material / mesh / 材质替换 | `wdp-api-material-settings` |
| 聚合 / Cluster / 周边搜索 / gather / 点聚合 / SearchByPoint | `wdp-api-cluster` |
| 天气 / 光照 / 测量 / 剖切 / 取点 / 工具 / MiniMap / Compass / AssetLoader | `wdp-api-function-components` |
| BIM / 构件 / node / 房间 / 剖切 / 拆楼 / SetNodeHighLight / SetRoomHighLight / Hierarchy | `wdp-api-bim-unified` |
| GIS / GeoLayer / WMS / WMTS / 3DTiles / 图层 / 要素 / GIS事件 | `gis-api-core-operations` |
| 坐标转换 / 空间信息 / 包围盒 / Cartesian / GIS / 取点 / PickerPoint / GetGlobal | `wdp-api-spatial-understanding` |
| 意图编排 / 需求分解 / 架构设计 / 系统意图 / 任务规划 | `wdp-intent-orchestrator` |

> **非路由目标（底层设施，按需引用）**：
> | 设施 | 用途 | 引用时机 |
> |------|------|---------|
> | `wdp-intent-orchestrator` | 意图编排、复杂任务分解 | Step 1 必须读取 |
> | `wdp-context-memory` | 长流程状态管理 | 长流程任务（>5步/跨skill） |

---

## 必要参数要求

任何WDP应用都必须包含以下核心参数：

1. **服务器URL** — 例如: `http://your-server.com`（http/https 结尾），不同环境不可混用
2. **验证口令** — 32位十六进制字符串，必须与服务器URL匹配
3. **渲染容器ID** — DOM元素ID（如 `player`），必须在初始化前就绪

**参数缺失时的处理**：严禁填入假值，必须结构化追问用户；获取后在代码最顶部设"用户配置区"并加中文注释。

---

## 状态管理引用

> `wdp-context-memory` 不是路由目标，而是包裹所有路由的底层设施。
> 
> 每次调度：MCP 自动处理路由记录和步数计数，AI 按需调用 `ReadState("hot"/"warm"/"cold", path)` 查询上下文
> 
> 详情参考 `../wdp-context-memory/SKILL.md`

---

## 调度闭环规范

每次产出实现方案时，必须显式给出以下 8 项：

1. **触发源** — 页面动作 / 场景事件 / 定时任务
2. **前置条件** — Scene Ready、对象可用、插件安装、关键参数确认完成
3. **状态读取** — 执行前 `ReadState` 了哪些 key_path，获取到了什么值
4. **执行链** — 主调用链顺序 + 失败分支（兜底处理）
5. **状态回写** — 执行后 `WriteState` 了哪些字段，变更内容是什么
6. **验证信号** — API 返回值、事件回调、可视化结果
7. **一致性校验** — 状态一致性检查结果，是否存在冲突及处理方式
8. **回滚清理** — 关闭路径、对象释放、失败恢复

---

## 参考资料索引

**代码生成前必须阅读**：
- `../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` — 官方文档索引
- `../official_api_code_example/official-*.md` — 根据路由命中对应的官方摘录

**状态管理**：
- `../wdp-context-memory/SKILL.md`

---

## 职责边界

**本 skill 负责**：需求分类与子 skill 路由、接入前置基线校验、输出最小闭环执行方案

**本 skill 不负责**：具体 API 业务实现（交由对应 sub skill）、页面视觉样式与业务 UI 设计

---

## 输出格式

始终输出：
1. 命中的 skill 路由
2. 已使用参考文件（相对路径）
3. 最小改动方案
4. 验证步骤与通过标准
5. 缺失信息与待补充 case（如有）
6. 状态变更记录（ReadState/WriteState 调用摘要）

---

## 🧠 快速路由口诀

### 核心口诀
- 初始化问题 → initialization
- 事件问题 → event-registration
- 相机问题 → camera
- 属性/.Get() → base-attributes
- 实体检索/Bound → entity-behavior
- POI/Window/Path → coverings
- Tiles/底板 → layer-models
- 材质/拾取 → material-settings
- 聚合/Cluster → cluster
- 天气/工具 → function-components
- BIM/构件 → bim
- GIS/图层 → gis
- 坐标/空间 → spatial-understanding

