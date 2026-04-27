---
name: wdp-context-memory
description: WDP 上下文状态管理双层架构。System 层（系统路由缓存，MCP自动处理），Business 层（业务逻辑缓存，AI手动维护）。
---

# WDP Context Memory

## 核心定位

防止长对话后业务状态与路由配置丢失，提供跨轮对话的上下文连续性。

**MCP 自动处理（System层）**：路由记录、文档快照、意图摘要
**AI 按需调用（Business层）**：通过 `read_context_state` 查询业务缓存，通过 `write_context_state` 更新业务数据

---

## 双层存储架构

| 层级 | 内容 | 维护者 | 使用方式 |
|------|------|--------|------------|
| **System** | workflow匹配的技能、摘要、当前路由配置 | **MCP服务端全自动** | `read_context_state("system")` |
| **Business**| 业务关键参数（如URL、Token、坐标、生成的模型ID、核心场景配置等） | **AI助手主动写入** | `write_context_state("business", data)` |

*所有缓存文件统一由服务端落盘至 `.wdp-cache/context-memory/` 目录下。*

---

## 什么时候调用 `write_context_state`？

**只要在对话中产生了明确的、对后续有用的关键业务数据，就应该立即保存！**

**典型场景**：
- 用户确认了正确的 WDP Server URL 和 Order 口令
- 生成/导入 BIM 模型后获取到的 `eid` 或 `assetId`
- 从 API 返回值里拿到的关键业务坐标、空间边界 (`location` / `bound`)
- 处理大体量数据（如 `scene-discovery` 发现的上百个实体快照，详见 `wdp-api-scene-discovery/SKILL.md`）

**调用要求**：
- **layer 参数**：固定传 `"business"`
- 你不需要通过操作本地文件系统（`fs`）来落盘！服务端底层会自动执行合并覆盖。只要你调用了该工具，数据就会稳定保留。

**示例**：
```javascript
// 当获取到重要的模型实体 ID 后，立即存入业务记忆
write_context_state({
  projectPath: "...",
  layer: "business",
  data: { 
    coreConfig: { serviceUrl: "https://...", targetEid: "model-123" }
  }
});
```

---

## 什么时候调用 `read_context_state`？

**典型场景**：
- 开启新的一轮长对话，或在执行下一步任务前需要回顾之前的设定
- 跨步骤引用之前的数据（"上次生成的那个 POI 坐标"、"之前激活的大楼 ID"）
- 你在分析逻辑时，发现丢失了某个必须的参数，可以尝试在 `business` 层查询。

---

## 一句话总结

> **MCP 服务端全自动接管了 System 层路由记忆；作为 AI，你在获得关键业务参数后随手调用工具写入 Business 层即可保障数据稳定继承。**
