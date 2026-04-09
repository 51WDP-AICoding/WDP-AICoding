# WDP 本地 Skill 库使用说明

> 本文档指导开发者如何在本地直接使用 WDP Skill 库进行数字孪生应用开发

---

## 一、Skill 库概述

本仓库包含完整的 WDP（数字孪生平台）开发技能库，采用 **Skill Code** 规范组织。开发者通过引用 Skill 文件，让 AI 助手基于标准化知识产出高质量代码。

### 核心特点

| 特性 | 说明 |
|------|------|
| **模块化** | 按功能域拆分为独立 Skill，按需加载 |
| **真值来源** | 所有 API 代码示例来自官方文档摘录 |
| **路由清晰** | 通过 `wdp-entry-agent` 统一分发到对应子技能 |
| **验证机制** | 提供自检清单，确保代码准确性 |

---

## 二、快速开始

### 2.1 仓库结构

```
WDP_AIcoding/
├── skills/                          # Skill 文件目录
│   ├── wdp-entry-agent/             # 入口代理（必用）
│   ├── wdp-intent-orchestrator/     # 意图编排
│   ├── wdp-api-initialization-unified/   # 场景初始化
│   ├── wdp-api-camera-unified/      # 相机操作
│   ├── wdp-api-entity-general-behavior/  # 实体行为
│   ├── wdp-api-coverings-unified/     # 覆盖物
│   ├── wdp-api-layer-models/        # 图层模型
│   ├── wdp-api-bim-unified/         # BIM 功能
│   ├── gis-api-core-operations/     # GIS 功能
│   ├── official_api_code_example/   # 官方 API 摘录（真值来源）
│   └── ...
├── wdp-front-end-framework-sample/  # 示例工程
├── README.md                        # 更新日志
└── SKILL_DESIGN_GUIDE.md           # Skill 设计规范
```

### 2.2 使用方式

#### 方式一：指令式调用（推荐）

在 AI 对话中直接使用 `/skill-name` 指令：

```
/skill wdp-entry-agent
```

AI 会自动读取对应 Skill 文件并按规范执行。

#### 方式二：显式读取

让 AI 读取指定 Skill 文件：

```
请读取 skills/wdp-api-camera-unified/SKILL.md，帮我实现相机漫游功能
```

#### 方式三：多 Skill 组合

复杂需求需要组合多个 Skill：

```
请按以下顺序读取 Skill：
1. skills/wdp-entry-agent/SKILL.md
2. skills/wdp-api-initialization-unified/SKILL.md
3. skills/wdp-api-camera-unified/SKILL.md

需求：初始化 WDP 场景后实现相机沿路径漫游
```

---

## 三、标准开发流程

### Step 0：需求分析与意图编排

**使用 Skill**：`wdp-intent-orchestrator`

**操作**：
```
请读取 skills/wdp-intent-orchestrator/SKILL.md，分析以下需求：

[描述你的业务需求]
```

**产出**：《系统意图与架构设计报告》

包含：
- 子任务拆解
- 命中的 API 能力与调用顺序
- Skill 路由（Primary/Secondary）
- 缺失输入与待确认参数

---

### Step 1：场景初始化

**使用 Skill**：`wdp-api-initialization-unified`

**操作**：
```
请读取 skills/wdp-api-initialization-unified/SKILL.md，
基于意图报告完成场景初始化代码
```

**关键配置**（需在代码顶部设置）：
```javascript
// ==================== 用户配置区 ====================
const WDP_CONFIG = {
    SERVER_URL: 'https://your-server.com',  // 服务器地址
    ORDER_CODE: 'your-32-char-order-code',  // 渲染口令
    CONTAINER_ID: 'player',                  // 容器 ID
    RESOLUTION: [1920, 1080]                // 分辨率
};
// =================================================
```

**阻断检查**：
- [ ] 包名是 `wdpapi`（不是 `@wdp-api/xxx`）
- [ ] 安装命令：`npm install wdpapi@^2.3.0`
- [ ] 导入方式：`import WdpApi from 'wdpapi'`

---

### Step 2：功能开发（按需路由）

根据需求类型，读取对应 Skill：

| 需求类型 | Skill 路径 | 关键 API |
|---------|-----------|---------|
| **相机操作** | `skills/wdp-api-camera-unified/` | FlyTo, CameraRoam, Follow |
| **实体行为** | `skills/wdp-api-entity-general-behavior/` | Bound, Scene.Move, ClearByTypes |
| **覆盖物** | `skills/wdp-api-coverings-unified/` | Path, POI, Window, HeatMap |
| **图层模型** | `skills/wdp-api-layer-models/` | Tiles, Static, Skeletal |
| **材质设置** | `skills/wdp-api-material-settings/` | SetMaterial, OnWdpMaterialHit |
| **BIM 功能** | `skills/wdp-api-bim-unified/` | SetNodeHighLight, GetNodeTree |
| **GIS 功能** | `skills/gis-api-core-operations/` | GeoLayer, WMS, 3DTiles |
| **空间理解** | `skills/wdp-api-spatial-understanding/` | 坐标转换, GetBoundingBox |

**操作示例**：
```
请读取 skills/wdp-api-camera-unified/SKILL.md，
参考 official-scene-camera.md 实现相机跟随功能
```

---

### Step 3：代码验证

**必须查阅 Official 文档**：

所有 API 代码示例必须以 `skills/official_api_code_example/` 目录下的文件为真值来源：

```
请读取 skills/official_api_code_example/official-scene-camera.md，
确认相机 API 的方法名和参数
```

**Official 文档列表**：
- `official-initialize-scene.md` — 场景初始化
- `official-scene-camera.md` — 相机操作
- `official-entity-coverings.md` — 覆盖物
- `official-entity-general-behavior.md` — 实体行为
- `official-layer-models.md` — 图层模型
- `official-bim-full.md` — BIM 完整文档
- `official-gis-full.md` — GIS 完整文档
- ...（详见 `OFFICIAL_EXCERPT_INDEX.md`）

---

## 四、Skill 使用规范

### 4.1 读取顺序规范

复杂任务必须按顺序读取：

```
1. wdp-entry-agent（路由判断）
2. wdp-intent-orchestrator（需求拆解）
3. wdp-api-initialization-unified（初始化）
4. [功能域 Skill]（业务实现）
5. official_api_code_example/official-*.md（代码验证）
```

### 4.2 长流程任务状态管理

符合以下任一条件，必须启用状态管理：

- 预计步骤超过 5 步
- 跨多个 wdp-api-* Skill
- 需要保持选中状态、相机位置等上下文
- 任务可能分多次对话完成

**使用 Skill**：`wdp-context-memory`

**操作**：
```
请读取 skills/wdp-context-memory/SKILL.md，
初始化状态管理并执行 ReadState/UpdateState
```

---

## 五、高频场景示例

### 场景 1：初始化 + 相机飞行

```
请按以下步骤执行：

1. 读取 skills/wdp-intent-orchestrator/SKILL.md，
   分析需求：初始化 WDP 场景，然后飞行到指定位置

2. 读取 skills/wdp-api-initialization-unified/SKILL.md，
   生成初始化代码

3. 读取 skills/wdp-api-camera-unified/SKILL.md 和 
   skills/official_api_code_example/official-scene-camera.md，
   生成 FlyTo 代码

4. 整合为完整可运行代码
```

### 场景 2：创建路径 + 实体沿路径移动

```
请按以下步骤执行：

1. 读取 skills/wdp-intent-orchestrator/SKILL.md 拆解需求

2. 读取 skills/wdp-api-coverings-unified/SKILL.md 和 
   official-entity-coverings.md，创建 Path 覆盖物

3. 读取 skills/wdp-api-entity-general-behavior/SKILL.md 和 
   official-entity-general-behavior.md，实现 Bound 沿路径移动

4. 补充清理链路（StopRoam、ClearByTypes）
```

### 场景 3：BIM 构件高亮

```
请按以下步骤执行：

1. 确认已初始化并安装 BIM 插件
2. 读取 skills/wdp-api-bim-unified/SKILL.md
3. 读取 official_api_code_example/official-bim-full.md
4. 实现 SetNodeHighLight 或 SetNodesHighlight
```

---

## 六、编码约束（强制执行）

### ❌ 严禁事项

| 禁止行为 | 正确做法 |
|---------|---------|
| 编造 API 方法名 | 查阅 official-*.md 确认 |
| 凭经验猜测参数 | 查阅 official-*.md 确认 |
| 使用 `YOUR_URL` 假值 | 追问用户真实参数 |
| 使用 CDN/script 标签引入 | 使用 `npm install wdpapi` |
| 未确认对象来源就继续 | 先明确对象 Id 获取路径 |

### ✅ 必须遵守

1. **代码生成前必须查阅 official 文档**
2. **核心参数缺失时必须追问**
3. **所有创建必须有对应清理**
4. **长流程必须启用 wdp-context-memory**

---

## 七、示例工程

### 快速体验

```bash
# 进入示例工程
cd wdp-front-end-framework-sample

# 启动（无需 npm install，已包含依赖）
npx vite . --port 8090
```

浏览器访问：`http://localhost:8090`

### 示例工程结构

```
wdp-front-end-framework-sample/
├── index.html          # HTML 入口
├── main.js             # 主逻辑（含 API 2.3.0+ 示例）
├── package.json        # npm 配置
└── README.md           # 示例说明
```

---

## 八、故障排查

### 问题 1：AI 生成了错误的 API 调用

**解决**：
```
请重新读取 skills/official_api_code_example/official-[对应模块].md，
确认正确的方法名和参数，然后修正代码
```

### 问题 2：不确定使用哪个 Skill

**解决**：
```
请读取 skills/wdp-entry-agent/SKILL.md，
根据路由规则判断应该使用哪个子 skill
```

### 问题 3：需要验证代码正确性

**解决**：
```
请读取 skills/SKILL_DESIGN_GUIDE.md 第 6 章，
执行深度检查步骤，对比 official 文档验证代码
```

---

## 九、参考资源

| 资源 | 路径 | 用途 |
|------|------|------|
| **入口代理** | `skills/wdp-entry-agent/SKILL.md` | 路由判断与基线检查 |
| **意图编排** | `skills/wdp-intent-orchestrator/SKILL.md` | 需求拆解与架构设计 |
| **API 索引** | `skills/official_api_code_example/OFFICIAL_EXCERPT_INDEX.md` | 快速查找 official 文档 |
| **设计规范** | `SKILL_DESIGN_GUIDE.md` | Skill 设计与优化规范 |
| **更新日志** | `README.md` | 版本更新记录 |

---

## 十、版本信息

- **WDP API**: 2.3.0
- **BIM API**: 2.2.0
- **GIS API**: 2.1.0

---

> 💡 **提示**：本文档描述的是本地 Skill 库的直接使用方式。AI 助手通过读取 Skill 文件获取领域知识，结合 Official 文档的真值来源，产出准确的 WDP 应用代码。
