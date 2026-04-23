# 2026-04-22 源码修改日志同步与补充计划

> **目标**：全面、诚实地将 `wdpapi_skills` (release/1.0.0) 在 4 月 22 日的更新应用到本知识库。
> **原则**：绝不混淆 SKILL（路由与边界）与 Official（API 真值代码示例）；针对所有修改点提供配套的 `skill` 及 `official` 修改方案。

---

## 模块一：智能建模与工程实例 API 补全

**依据**：修改日志第 3.2、4.2、5 节（新增 Modeler 演示、静态实例模型与 WIM 模型）。

| 修改目标分类 | 文件路径 | 对应修改方案 |
|---|---|---|
| **Official 补充** | `skills/official_api_code_example/official-entity-coverings.md` | 1. 补充 **ModelerEmbank (路基/堤坝)**、**ModelerFence (围栏)**、**ModelerFloor (楼板)**、**ModelerWater (水面)**、**ModelerRiver (河道)** 的完整代码示例（包含特定的 `ModelerFenceStyle` 大写、三维坐标数组 `[][][]` 结构等）。<br>2. 补充 **StaticInstance (工程实例模型)** 的大段 API 示例：批量放置、更新、节点隐藏/高亮轮廓（DeleteComponents, SetNodesTransform 等）。<br>3. 补充 **Hierarchy (结构模型)** 及 **WIM 河道/水面建模** 的使用说明及 API 示例。 |
| **SKILL 增强** | `skills/wdp-api-coverings-unified/SKILL.md` | 在“常用覆盖物快速参考”及“高频问题/验证要点”中，新增一条对**智能建模系列 (Modeler) 的强行传参约束警告**（如：注意 `ModelerFenceStyle` 大写，`ModelerFloor` 必须为三维数组等）。确保 AI 在规划代码时能有意识防范。 |

---

## 模块二：工具类 API (Tools) 与空间拾取彻底纠错

**依据**：修改日志第 8 节（`tools/` 伪造的 API 被源码校对替换）及第 3.3 节（新增了诸多测量工具）。

| 修改目标分类 | 文件路径 | 对应修改方案 |
|---|---|---|
| **Official 补充** | `skills/official_api_code_example/official-function-components.md` <br> 及相关工具/控件文档 | 1. **完全重写 Compass (指南针) 和 MiniMap (小地图)** 的 API 示例，抛弃 `Show()/Hide()`，使用官方源文件中的 `Start(opt?)/End()/Get()`。<br>2. **新增 ChinaMap (中国行政区划地图)**、**Color (颜色格式工具)**、**MoveLinear (线性移动工具)**、**Screen (屏幕边界工具)**、**PickerMaterial (材质拾取)** 的真实 API 说明及代码示例块。 |
| **Official 补充** | `skills/official_api_code_example/official-spatial-understanding.md` | 1. **重写 PickerPoint (拾取点坐标)** 的 API 示例，纠正入参为必填三参：`StartPickPoint(coordinateShow, iconShow, coordZRef)`，纠正获取历史方法为 `GetPickedPoints(coordZRef?)`。<br>2. **重写 CoordAide (坐标辅助标注)** 的 API 示例，纠正 Display 参数为 `{entity, coordZRef, coordZ}`。<br>3. **重写 PickerPolyline** 的获取参数，修正为 `coordZRef`。 |
| **SKILL 增强** | `skills/wdp-api-function-components/SKILL.md` <br> `skills/wdp-api-spatial-understanding/SKILL.md` | 在工具类能力索引表格中，同步更新这批重写后的方法名和参数签名。彻底扫除 `Show()` 的历史遗留干扰。 |

---

## 模块三：场景管理与系统扩展

**依据**：修改日志第 3.1、3.4 节（`App.Scene` 下的 EarthTiles, Effects, Project 以及数据参考系）。

| 修改目标分类 | 文件路径 | 对应修改方案 |
|---|---|---|
| **Official 补充** | 寻找合适的 `official-*.md` (可归类至 function-components 或 initialization) | **新增全局管控 API 的示例代码**：<br>1. `App.EarthTiles` (球形地图底板)<br>2. `App.Effects` (后处理特效)<br>3. `App.Project` (工程资产管理，非项目管理)<br>4. `App.Outliner` (场景大纲/实体列表，很重要，用于查看场景全貌)<br>5. `App.GeoReference` / `LocalGeoReference` (地理参考坐标系配置，影响坐标系准度)<br>6. `App.NodeSelection` (节点选择工厂) 及 `App.Editor` (编辑器状态)。 |
| **SKILL 增强** | `skills/wdp-api-function-components/SKILL.md` | 在“数据模型”及“系统类”相关表格中，扩充对这几个新域工具和对象的认知索引及功能概括。 |

---

## 模块四： Getter / Setter 双写规范与 `result.object.eid` 扫尾

**依据**：修改日志第 5、6、7 节（返回结构及格式规范化强制要求）。

| 修改目标分类 | 文件路径 | 对应修改方案 |
|---|---|---|
| **Official 补充** | `skills/official_api_code_example/` 下**所有包含属性读写**的文档 | **全局清扫更新**：所有的 setter 示例都必须呈现双写并列表达：<br>`// 方式一：属性赋值`<br>`entity.prop = value;`<br>`// 方式二：异步调用`<br>`await entity.SetXxx(value);`<br>同样的，所有 getter 示例也必须呈现双写法。 |
| **Official 补充** | `skills/official_api_code_example/` 下所有文档 | **复查出参表格和示例 JSON**，不能有 `result: { eid: '...' }`，必须替换为 `result: { object: { eid: '...' } }` 或类似 `result.object` 引用说明。 |
| **SKILL 增强** | `skills/wdp-api-generic-base-attributes/SKILL.md` | **重写格式强制要求**：将之前生硬插入的 JS 代码块优化成一段精炼的规范说明，即：“在展示 API 属性赋值时，需从官方提取展示双写格式”，使格式约束符合文档的路由描述定位，而不直接写代码。 |

---

**使用说明**：
本方案可供后续多个 Task 分拆执行（例如 Task 1 专做“模块一”，Task 2 专做“模块二”），并在执行时对照源文件（`wdpapi_skills` 库代码）进行二次比对。