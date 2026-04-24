---
name: wdp-context-memory
description: WDP 上下文状态管理。Hot 层（运行时状态）、Warm 层（路由链路）、Cold 层（业务数据）。MCP 自动处理路由记录和步数计数，AI 按需调用 ReadState/WriteState。
---

# WDP Context Memory

## 核心定位

防止长对话后 skill 路由漂移，提供跨步骤的上下文连续性。

**MCP 自动处理**：路由记录、步数计数、域切换追踪、阈值刷新
**AI 按需调用**：ReadState 查询上下文，WriteState 更新状态

---

## 三层存储

| 层级 | 内容 | AI 使用方式 |
|------|------|------------|
| **Hot** | currentSkill, stepCount, selection, camera | 自动注入上下文，可直接读取 |
| **Warm** | routingChain, currentRouting | ReadState("warm", "currentRouting") |
| **Cold** | entities, spatialData, apiParams | ReadState("cold", "entities.xxx") |

---

## 客户端持久化缓存管理（重要！）

**MCP 服务端不直接在本地系统上创建和写入缓存文件**，为了保护服务安全和用户隐私，缓存持久化是由作为客户端的 **你（AI 编程助手）** 负责的。

1. **处理服务端发出的缓存写入指令**
   当服务端在执行 `start_wdp_workflow` 或 `write_context_state` 返回 `_cache` 字段或明确要求写入时，如果指令要求写入本地文件，请 **务必立刻调用你自带的系统文件写入能力（例如 node 的 fs、python 的写入命令或直接执行 bash/powershell 脚本）** 将对应的 `content` 数据写入到对应的本地 `.wdp-cache` 目录下的指定路径。
   *(注意：如果目标目录 `.wdp-cache` 不存在，必须在写入前先新建它。内容格式为严格的 JSON。)*

2. **读取本地缓存进行加速（Warm / Cold 层）**
   由于长流程文档非常长，在后续对话或新的路由阶段：
   - 检查本地是否已经有合法的 `.wdp-cache/warm.json` 或 `cold.json`
   - 若存在且包含有效缓存，请在传参时带上，服务端或你自身可以优先使用已缓存的摘要，避免高额的 Token 损耗。

---

## 什么时候调用 ReadState？

**必须调用**：
- 长对话后恢复上下文（第50步提到"刚才的门"）
- 跨步骤引用之前的数据（"刚才的车"、"之前的路径"）
- 确认当前 skill 域（防止路由漂移）

**示例**：
```javascript
// 恢复上下文
const selection = ReadState("hot", "selection");
const entity = ReadState("cold", `entities.targetNodes.${selection.nodeId}`);
const routing = ReadState("warm", "currentRouting");
```

---

## 什么时候调用 WriteState？

**必须调用**：
- 用户操作后记录选中状态（点击、选择）
- API 调用后更新业务数据（创建实体后记录 eid）

**示例**：
```javascript
// 记录用户选择
WriteState("hot", { selection: { nodeId: "node-597", type: "bimNode" } });

// 记录创建的实体
WriteState("cold", { entities: { pois: [{ eid: "poi-001", location: [x,y,z] }] } });
```

---

## 什么时候不需要调用？

| 操作 | 说明 |
|------|------|
| 路由链路记录 | MCP 自动写入 Warm 层 |
| 步数计数 | MCP 自动递增 Hot.stepCount |
| 域切换追踪 | MCP 自动更新 Hot.currentSkill |
| 阈值刷新 | step % 20 === 0 时 MCP 自动重新加载 skill |

---

## 接口定义

### ReadState(layer, path)
- **layer**: "hot" | "warm" | "cold"
- **path**: 数据路径，如 "currentRouting" 或 "entities.targetNodes.node-597"
- **返回**: 对应路径的数据对象

### WriteState(layer, data)
- **layer**: "hot" | "warm" | "cold"
- **data**: 要写入的数据对象

---

## 一句话总结

> **MCP 自动处理关键路径，AI 按需 ReadState 查询上下文、WriteState 更新状态。**
