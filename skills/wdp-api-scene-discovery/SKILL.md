---
name: wdp-api-scene-discovery
description: 场景要素发现。当缺少对象ID/坐标/相机位时，提供五条发现路径：屏幕拾取 → 实体扫描 → BIM层级遍历 → 相机位查询 → 坐标取点。将发现结果写入 context-memory 供后续步骤引用。
---

# WDP Scene Discovery

## 核心定位

解决"不知道场景里有什么 → 无法提供合法 ID/坐标 → MCP 门禁阻断"的死锁。

**本 skill 不是替代其他 skill**，而是在调用业务 API 之前的**前置发现步骤**。每条路径的具体 API 调用方法由对应的 official 文档和 sub skill 提供，本 skill 只描述策略和路由。

---

## 什么时候触发本 skill？

| 条件 | 示例 |
|------|------|
| 用户描述了操作目标，但无 ID | "把那个楼高亮"、"把车移到..." |
| 用户主动询问场景内容 | "场景里有哪些实体？"、"帮我看看有什么" |
| 任务需要坐标/位置但用户未提供 | "在门口放个标记"、"从这到那画条线" |
| 任务需要相机定位但无预设名 | "飞到大门口"、"切到俯视图" |
| intent-orchestrator 检测到 `object_id_missing` | 自动化触发 |

**不触发的情况**：用户已提供明确的 eid/nodeId/entityName/customId 和坐标，直接执行即可。

---

## 五条发现路径

按可靠性从高到低排列。每条路径标注了**路由到哪个 sub skill 读取 API 真值**，具体方法签名不在此重复。

### 路径 A：屏幕拾取实体（交互式，首选）

```
目标：获取 entityId / nodeId
路由：→ function-components (Picker 能力) + general-event-registration (事件注册)
策略：
  1. 生成页面，启动 WDP 场景
  2. 注册拾取事件，回调中拿到 entityId / nodeId / 坐标
  3. 将结果写入 context-memory（见下方回写模式）
  4. 拾取完成后，触发后续业务步骤
优势：零前置信息，任何可渲染场景都适用
```

### 路径 B：实体扫描（编程式）

```
目标：列出场景中全部实体或某一类实体
路由：→ spatial-understanding (场景全局查询能力) + entity-general-behavior (单类型查询)
策略：
  1. 全量扫描或按类型过滤 — 具体 API 方法见 official-spatial-understanding.md
  2. 展示 { eid, entityName, type } 列表给用户选择
  3. 将选中实体写入 Cold.entities.snapshot
优势：全量枚举，一次性建立场景快照
```

### 路径 C：BIM 层级遍历

```
目标：BIM 场景中定位构件、房间、楼层
路由：→ bim-unified (Hierarchy 层级遍历能力)
策略：
  1. 从根节点展开层级（按需分页，避免全部展开）
  2. 按名称/类型过滤匹配用户描述的子节点
  3. 确认 nodeId → 写入 Cold 层
适用：BIM 楼宇/构件/房间定位需求
```

### 路径 D：相机位查询

```
目标：获取相机参数（预设位或当前位）
路由：→ camera-unified (预设位能力) + spatial-understanding (相机状态获取)
策略：
  1. 预设位查询（如有）或获取当前相机状态
  2. 写入 Hot.camera 供后续 FlyTo 使用
适用：视角跳转、漫游起点设定、"记住当前视角"
```

### 路径 E：坐标取点（交互式）

```
目标：用户需要场景中某个位置坐标，但不能或不想手动输入
路由：→ spatial-understanding (PickerPoint / PickerPolyline 交互取点能力)
策略：
  1. 启动取点工具 → 回调获取 worldPos 和 location
  2. 取完后释放工具
  3. 写入 Cold.spatialData
与路径 A 的区别：A 拿实体 ID，E 拿坐标点
```

---

## 与 context-memory 联动（必须执行）

发现完成后必须写回，且**写入后必须立即 ReadState 验证**.

```javascript
// === 写入 ===
WriteState("cold", {
  entities: { snapshot: [...发现的实体列表], discoveredAt: new Date().toISOString() }
});
WriteState("hot", {
  selection: { nodeId: "xxx", type: "bimNode", source: "picker" }
});
WriteState("cold", {
  spatialData: { points: [{ name: "入口", worldPos: [x,y,z] }] }
});

// === 验证（写入后立即执行，不可省略）===
const verified = ReadState("cold", "entities.snapshot");
if (!verified || verified.length === 0) {
  // 写入失败：检查 .wdp-cache 目录是否存在、cold.json 是否合法
  // 重试写入一次，仍失败则阻断后续步骤并告知用户
}
```

---

## 决策流程

```
用户需求包含操作目标？
  ├─ 有明确 ID + 坐标？ → 跳过本 skill，直接执行
  ├─ 缺 entityId / nodeId？
  │   ├─ 有类型名？ → 路径 B
  │   ├─ BIM 场景？ → 路径 C
  │   └─ 可渲染？ → 路径 A
  ├─ 缺坐标/位置？
  │   ├─ 可渲染？ → 路径 E
  │   └─ 不可渲染？ → 追问用户
  ├─ 缺相机参数？
  │   └─ 路径 D
  └─ 完全不知道？
      ├─ 可渲染？ → 路径 A + E（冷启动）
      └─ 不可渲染？ → 追问用户提供数据文件或描述
```

---

## 边界

- **需要 WDP 运行时**：路径 A/D/E 需要场景已启动；B/C 需要部分 API 可用
- **拾取/取点依赖用户操作**：AI 无法代替用户点击，需生成交互页面引导
- **不是通用检查器**：聚焦"发现 → 回写 → 引用"链路
- **遵循 official 文档**：各路径涉及的 API 方法名和参数均以对应 official-*.md 为准，本 skill 仅描述策略路由

---

## 一句话总结

> **不知道操作什么/在哪里 → 拾取/扫描/遍历/取点 → 写入 memory 并验证 → 后续步骤自动引用。**