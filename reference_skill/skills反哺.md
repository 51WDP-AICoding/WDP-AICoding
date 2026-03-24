# WDP 数字孪生项目通用经验教训

> 来源：Demo1（智慧医院数字孪生 IOC）项目复盘  
> 日期：2026-03-23  
> 定位：面向 WDP-AICoding 通用 Skills 库的改进输入

---

## 一、通用错误模式

### 模式 1：WDP API 对象引用 vs 普通 JSON 对象混淆

**严重度：严重 — 直接导致功能完全失效**

WDP API 中，`GetByEids` 返回的对象、事件回调中的 `result.object` 等，都是**实体代理对象**（Proxy/Object wrapper），不是普通 JS 对象。不能直接访问 `.eid`、`.entityName` 等属性。

```javascript
// ❌ 错误：将代理对象当作普通对象
const eid = result.object.eid          // undefined
const name = entityObj.entityName      // undefined

// ✅ 正确：通过 Get() 获取属性
const info = await result.object.Get()
const eid = info.result.eid
const name = info.result.entityName
```

**触发场景：**
- `OnEntityClicked` / `OnMouseEnterEntity` / `OnMouseOutEntity` 事件回调
- `GetByEids` / `GetByCustomId` / `GetByEntityName` 返回的对象
- `Scene.GetAll()` 返回的对象

**影响范围：** 所有需要从实体对象读取属性的场景（点击匹配、条件过滤、日志输出等）。

---

### 模式 2：nodeId 与 eid 混淆

**严重度：严重 — 导致实体匹配完全失败**

| 标识 | 含义 | 适用操作 |
|------|------|---------|
| `eid` | 场景实体唯一标识 | `GetByEids`、`SetVisible`、`SetEntityOutline`、`Focus` 等 |
| `nodeId` | BIM 模型内部节点标识 | `NodeSelection.Add/Remove`、`SetRoomHighLight` 等 |
| `entityName` | 实体自定义名称 | `GetByEntityName`、`UpdateByEntityName` 等 |
| `customId` | 实体自定义 ID | `GetByCustomId`、`UpdateByCustomId` 等 |

```javascript
// ❌ 错误：用 nodeId 当 eid 去匹配
const clickedId = result.nodeId
const device = devices.find(d => d.eid === clickedId)  // 永远匹配不到

// ✅ 正确：从 object.Get() 获取真正的 eid
const info = await result.object.Get()
const eid = info.result.eid
const device = devices.find(d => d.eid === eid)
```

---

### 模式 3：fixed 全屏层的 z-index 级联失控

**严重度：高 — 导致 UI 点击事件被拦截**

数字孪生项目普遍采用"3D 场景 + 多模块 UI 覆盖层"架构，每个模块通常有自己的 `position: fixed; inset: 0` 全屏容器配合 `pointer-events: none/auto` 穿透模式。当多个这样的层共存时，缺少 z-index 管理会导致事件被上层透明层拦截。

```
.ui-layer (z-index: 10, pointer-events: none)
  ├─ NavBar .nav-wrapper (z-index: 100, fixed, 全屏, pointer-events: none)
  └─ ModuleA .module-container (无 z-index, fixed, 全屏)  ← 被 NavBar 遮挡
       └─ .panel (pointer-events: auto)                   ← 点击无效！
```

**标准 z-index 层级表：**

| 层级 | z-index 范围 | 用途 | 示例 |
|------|-------------|------|------|
| 场景层 | 0-9 | 3D 渲染容器 | `#player` |
| UI 基础层 | 10-19 | UI 总容器 | `.ui-layer` |
| 模块容器层 | 20-29 | 各功能模块全屏容器 | SpaceManager, DeviceManager |
| 全局覆盖层 | 100-199 | 始终存在的 UI（导航栏等） | NavBar, LoadingOverlay |
| 模态框层 | 1000+ | 弹窗、确认框 | `.modal-overlay` |

**标准穿透结构：**
```css
.module-container {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 20; /* 必须声明！ */
}
.module-container > * {
  pointer-events: auto;
}
```

---

### 模式 4：视觉反馈 API 选型不当

**严重度：中 — 影响用户体验正确性**

| 场景 | 推荐方式 | API | 特征 |
|------|---------|-----|------|
| 单体选中标识 | **描边** | `SetEntityOutline` | 不改变外观，边缘发光轮廓 |
| 区域/组级标识 | 高亮 | `SetEntityHighlight` | 改变表面颜色/透明度 |
| BIM 房间标识 | 房间高亮 | `SetRoomHighLight` | 仅 BIM 插件，按 roomId 操作 |
| 临时悬浮提示 | 无需 3D API | CSS / 覆盖物 | 用 UI 层实现更灵活 |

**选中/取消选中的标准模式：**
1. 选中前：先清除之前的选中状态（避免多个同时选中）
2. 选中：设置描边/高亮
3. 取消：清除描边/高亮
4. 切换（toggle）：如果已选中则取消，否则选中

---

### 模式 5：交互状态机路径不完整

**严重度：中 — 导致功能不可逆或体验缺失**

所有可切换的 UI 状态必须显式列出所有状态转换路径：

```
对每个可切换状态，检查：
├─ 开启路径：触发条件 + 执行动作 ✓
├─ 关闭路径：触发条件 + 执行动作 ← 最容易遗漏
├─ 切换路径：是否支持 toggle
└─ 冲突处理：A 状态下触发 B 怎么办
```

**高频遗漏场景：**
- 高亮/选中状态缺少"再次点击取消"
- 展开/折叠缺少"切换"逻辑
- 危险操作（删除/卸载）缺少确认弹窗
- 模态框缺少点击遮罩关闭

---

## 二、对 Skills 库的改进建议

### 2.1 wdp-api-general-event-registration — P0 紧急

在 SKILL.md 中增加以下内容：

```markdown
## 关键认知：事件回调中的 object 是代理引用

OnEntityClicked / OnMouseEnterEntity / OnMouseOutEntity 等事件的
res.result.object 不是普通 JS 对象，而是 WDP 实体代理对象。

### 错误做法 ❌
const eid = res.result.object.eid  // undefined

### 正确做法 ✅
const info = await res.result.object.Get()
const eid = info.result.eid

### nodeId vs eid
- nodeId: BIM 模型内部节点标识，用于 NodeSelection 等节点级操作
- eid: 场景实体唯一标识，用于 GetByEids、SetVisible 等实体级操作
- 两者完全不同，不要混用

### 防御性编程模板
async function handleEntityClick(res) {
  const result = res?.result
  if (!result?.object) return
  let eid = null
  try {
    const info = await result.object.Get()
    eid = info?.result?.eid
  } catch (e) {
    console.warn('获取实体信息失败:', e)
  }
  if (!eid) return
  // 后续匹配逻辑...
}
```

### 2.2 wdp-api-entity-general-behavior — P1

在 SKILL.md 中增加视觉反馈选型指南（见模式 4 的表格）和选中/取消选中标准模式。

### 2.3 新建 wdp-css-layer-management — P0

```markdown
---
name: wdp-css-layer-management
description: WDP 数字孪生项目的 CSS 层叠管理规范。用于防止多模块 fixed 全屏层
  的 z-index 冲突和 pointer-events 穿透失效。
---

# WDP CSS 层叠管理

## 核心规则
1. 所有模块级全屏容器必须声明 z-index
2. 遵循全局 z-index 层级表（见下）
3. pointer-events 穿透模式必须使用标准结构

## z-index 层级表
| 层级 | 范围 | 用途 |
|------|------|------|
| 场景层 | 0-9 | #player 渲染容器 |
| UI 基础层 | 10-19 | .ui-layer 总容器 |
| 模块容器层 | 20-29 | 各功能模块全屏容器 |
| 全局覆盖层 | 100-199 | NavBar、LoadingOverlay |
| 模态框层 | 1000+ | 弹窗、确认框 |

## 标准穿透结构
.module-container {
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 20;
}
.module-container > * { pointer-events: auto; }

## 高频问题
1. 模块内面板点击无效 → 检查模块容器是否缺少 z-index
2. 模态框被遮挡 → 检查 z-index 是否达到 1000+
3. 3D 场景无法交互 → 检查是否有 UI 层未设置 pointer-events: none
```

### 2.4 wdp-input-requirements-clarification — P1

增加以下检查项：

```markdown
## 交互状态机完整性检查
对每个可切换状态，确认：
- [ ] 开启路径（触发条件 + 执行动作）
- [ ] 关闭路径（触发条件 + 执行动作）
- [ ] 切换路径（是否支持 toggle）
- [ ] 冲突处理（A 状态下触发 B）

## 危险操作检查
- [ ] 删除/卸载操作是否有确认弹窗
- [ ] 不可逆操作是否有明确提示
```

### 2.5 编码前自检清单 — P2

建议在 entry-agent 或通用工作流中嵌入：

```markdown
## WDP 编码自检清单

### API 相关
- [ ] 事件回调中的 object 是否通过 .Get() 获取属性？
- [ ] 是否混淆了 nodeId 和 eid？
- [ ] 视觉反馈方式（描边/高亮/房间高亮）是否选型正确？
- [ ] 异步操作是否有 try-catch 防护？

### CSS 层叠相关
- [ ] 模块全屏容器是否声明了 z-index？
- [ ] z-index 是否在全局层级表中有对应位置？
- [ ] pointer-events 穿透结构是否正确？

### 交互逻辑相关
- [ ] 每个可切换状态是否都有开启+关闭两条路径？
- [ ] 危险操作是否有确认步骤？
```

---

## 三、优先级

| 优先级 | 改进项 | 理由 |
|--------|--------|------|
| **P0** | 事件注册 skill 增加 object 引用 + nodeId/eid 区分 | 直接导致功能完全失效，所有项目都会遇到 |
| **P0** | 新建 CSS 层叠管理 skill | 同样导致功能失效，所有模块化项目都会遇到 |
| **P1** | 实体行为 skill 增加视觉反馈选型指南 | 影响用户体验正确性 |
| **P1** | 需求澄清 skill 增加状态机检查项 | 从源头防止遗漏 |
| **P2** | 编码前自检清单 | 提升整体质量 |