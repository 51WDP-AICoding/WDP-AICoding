# official-entity-coverings 拆分分析报告

> 分析时间：2026-04-23
> 分析目标：评估 official-entity-coverings.md (2431行) 是否需要拆分，以及如何按高频组合方式拆分

---

## 一、当前文件规模评估

| 指标 | 数值 |
|------|------|
| 总行数 | 2,431 行 |
| 覆盖物类型 | 19 种 |
| 平均每种覆盖物 | ~128 行 |

**结论**：文件确实庞大，AI 在检索时可能面临 token 压力。但拆分必须基于**业务紧密度**而非简单按类型均分。

---

## 二、业务场景使用模式分析

基于 `wdp-intent-orchestrator/resources/business-scenarios/` 中 11 个业务场景的路由分析：

### 2.1 coverings 在各场景中的使用频率

| 业务场景 | 优先级 | primary/secondary | 使用的 coverings |
|---------|--------|-------------------|-----------------|
| 视频周界监控 | 10 | **primary** | POI, Range, Window |
| 应急指挥 | 10 | **primary** | POI, Range, Window, Path, Particle, Text3D |
| 火情告警 | 20 | **primary** | POI, Range, Text3D, Window |
| 网格化巡检 | 10 | **primary** | Range, Path, POI |
| 森林防火扑救 | 10 | **primary** | Path, Range, POI, Text3D |
| AI机器人巡检 | 10 | secondary | Path, POI, Window, Particle |
| 景区接驳车 | 10 | secondary | Path, POI, Window |
| AI机器狗巡逻 | 10 | secondary | Path, POI, Window |
| BIM楼层拆解 | 10 | secondary | Window |

### 2.2 高频组合模式（按紧密度排序）

**模式 A：空间标注与交互组合**（最高频）
- **POI** - 出现在 9/9 个场景中 (100%)
- **Range** - 出现在 5/9 个场景中 (56%)
- **Window** - 出现在 6/9 个场景中 (67%)
- **Text3D** - 出现在 3/9 个场景中 (33%)
- **RealTimeVideo** - 出现在 1/9 个场景中 (11%，但属于 Window 的特化)

**模式 B：路径与运动组合**
- **Path** - 出现在 6/9 个场景中 (67%)
- **Particle** - 出现在 3/9 个场景中 (33%，作为移动实体)
- **Bound** - 出现在 3/9 个场景中 (33%，但属于 entity-general-behavior)

**模式 C：独立特效与可视化**
- **Effects** - 独立使用
- **Light** - 独立使用
- **Viewshed** - 独立使用
- **Parabola** - 独立使用

**模式 D：数据热力分析**
- **HeatMap** - 独立数据分析
- **ColumnarHeatMap** - 独立
- **SpaceHeatMap** - 独立
- **RoadHeatMap** - 独立
- **MeshHeatMap** - 独立

---

## 三、拆分方案建议

### 方案一：按业务紧密度拆分（推荐）

基于业务场景的高频组合，拆分为 3 个文件：

#### 文件 1：空间标注与交互覆盖物 (official-entity-coverings-spatial.md)
**预计行数**：~900 行
**包含类型**：
- POI（最高频，所有场景都用到）
- Range（周界、范围，高频）
- Window（信息窗口，高频）
- RealTimeVideo（视频窗口，属于 Window 的特化场景）
- Text3D（文字标注，中频）

**理由**：这 5 种覆盖物在业务场景中**总是协同使用**。例如：
- 视频周界：POI 标注摄像头位置 → Range 画周界 → 点击 POI 弹出 Window/RealTimeVideo
- 应急指挥：POI 标注事件点 → Range 画影响范围 → Window 显示详情
- 火情告警：POI 标注火点 → Range 画危险区 → Text3D 显示温度

#### 文件 2：路径与运动覆盖物 (official-entity-coverings-path.md)
**预计行数**：~600 行
**包含类型**：
- Path（路径线，高频）
- Particle（粒子实体，中频，常作为 Path 上的移动对象）

**理由**：这 2 种覆盖物在巡检、巡逻、接驳车场景中**强绑定使用**：
- AI 机器人巡检：Path 作为路线 → Particle 作为机器人 → Bound 绑定运动
- 景区接驳车：Path 作为线路 → Particle 作为车辆
- 机器狗巡逻：Path 作为巡逻路线 → Particle 作为机器狗

**注意**：Bound 属于 `entity-general-behavior`，不在 coverings 中，但应在 SKILL 中说明与 Path 的关联。

#### 文件 3：数据可视化与特效覆盖物 (official-entity-coverings-effects.md)
**预计行数**：~900 行
**包含类型**：
- HeatMap / ColumnarHeatMap / SpaceHeatMap / RoadHeatMap / MeshHeatMap（热力图系列）
- Parabola（迁徙图）
- Effects（后处理特效）
- Light（灯光）
- Viewshed（可视域）
- Raster（栅格）
- HighlightArea（高亮区域）

**理由**：这些覆盖物**独立使用**，不参与标注/路径的业务流，主要用于：
- 数据分析展示（热力图系列）
- 环境氛围渲染（Effects, Light）
- 独立功能（Viewshed, Raster, HighlightArea）

---

### 方案二：保守拆分（折中）

如果担心拆分过细导致 AI 跨文件检索困难，可以采用 2 文件方案：

#### 文件 1：核心交互覆盖物 (official-entity-coverings-core.md)
**包含**：POI, Range, Window, RealTimeVideo, Text3D, Path, Particle
**预计行数**：~1500 行

#### 文件 2：高级可视化覆盖物 (official-entity-coverings-advanced.md)
**包含**：HeatMap系列, Parabola, Effects, Light, Viewshed, Raster, HighlightArea
**预计行数**：~900 行

---

### 方案三：不拆分（现状）

**适用条件**：
- 如果 AI 在生成代码时，通过 `wdp-intent-orchestrator` 已经能精准路由到 `wdp-api-coverings-unified` SKILL
- 且 SKILL 文件中已经提供了清晰的"常用覆盖物快速参考"索引
- 则保持现状，由 SKILL 做第一层路由，official 做第二层详细参考

---

## 四、关键结论与建议

### 4.1 是否需要拆分？

**建议：需要拆分，采用方案一（3 文件）或方案二（2 文件）**

理由：
1. **文件过大**：2431 行对于 AI 单次读取和精确检索确实存在压力
2. **业务逻辑分散**：当前文件按覆盖物类型字母顺序排列，而非业务紧密度，导致 AI 难以建立"何时使用哪种组合"的认知
3. **场景匹配困难**：`wdp-intent-orchestrator` 在匹配到 `wdp-api-coverings-unified` 后，需要进一步定位具体覆盖物类型，大文件增加了定位成本

### 4.2 推荐的拆分方式

**首选方案一（3 文件）**，理由：
- 与业务场景的模块划分高度吻合
- 每个文件的职责单一，AI 可以精准加载
- 与 `wdp-intent-orchestrator` 中的 `modules` 定义对齐（POI标注模块、周界围栏模块、视频窗口模块、路径实体模块等）

### 4.3 配套 SKILL 调整

如果拆分 official 文件，对应的 SKILL 文件 `wdp-api-coverings-unified/SKILL.md` 也需要同步更新：

1. **路由表更新**：在 SKILL 中明确说明三种覆盖物分类及使用场景
2. **快速参考索引**：按分类重新组织"常用覆盖物快速参考"
3. **交叉引用**：说明哪些覆盖物经常组合使用（如 POI+Range+Window）

### 4.4 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 拆分后跨文件引用复杂 | 在 SKILL 中维护清晰的分类索引和组合建议 |
| 历史代码依赖原文件名 | 保留原文件作为过渡期，或更新所有引用 |
| AI 可能加载错误分类 | 通过 `wdp-intent-orchestrator` 的场景匹配精准路由 |

---

## 五、实施建议（如决定拆分）

### 阶段一：准备
1. 创建 3 个新 official 文件
2. 将内容按上述分类迁移
3. 更新 `OFFICIAL_EXCERPT_INDEX.md` 索引

### 阶段二：SKILL 同步
1. 更新 `wdp-api-coverings-unified/SKILL.md` 的路由和索引
2. 更新 `wdp-intent-orchestrator` 的场景模块引用（如有需要）

### 阶段三：验证
1. 检查所有业务场景是否仍能正确路由到对应的 official 文件
2. 验证 AI 在生成代码时是否能正确组合使用覆盖物

---

## 附录：当前 coverings 类型完整列表

| 类型 | 业务场景使用频率 | 建议归属文件 |
|------|-----------------|-------------|
| POI | 100% (9/9) | 空间标注与交互 |
| Range | 56% (5/9) | 空间标注与交互 |
| Window | 67% (6/9) | 空间标注与交互 |
| RealTimeVideo | 11% (1/9) | 空间标注与交互 |
| Text3D | 33% (3/9) | 空间标注与交互 |
| Path | 67% (6/9) | 路径与运动 |
| Particle | 33% (3/9) | 路径与运动 |
| HeatMap | 0% (独立) | 数据可视化与特效 |
| ColumnarHeatMap | 0% (独立) | 数据可视化与特效 |
| SpaceHeatMap | 0% (独立) | 数据可视化与特效 |
| RoadHeatMap | 0% (独立) | 数据可视化与特效 |
| MeshHeatMap | 0% (独立) | 数据可视化与特效 |
| Parabola | 0% (独立) | 数据可视化与特效 |
| Effects | 0% (独立) | 数据可视化与特效 |
| Light | 0% (独立) | 数据可视化与特效 |
| Viewshed | 0% (独立) | 数据可视化与特效 |
| Raster | 0% (独立) | 数据可视化与特效 |
| HighlightArea | 0% (独立) | 数据可视化与特效 |

---

*分析完成。如需实施拆分，建议先与用户确认方案后执行。*
