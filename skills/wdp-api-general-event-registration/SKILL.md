---
name: wdp-api-general-event-registration
description: 处理 WDP 通用事件注册与治理。用于规范事件注册时机、回调守卫、重复绑定回收和日志可观测性；涉及事件不触发或重复触发时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述事件注册的标准流程和最佳实践
- ✅ 说明事件解绑和内存回收机制
- ✅ 列出核心事件的高阶参数和用法
- ✅ 提供事件验证方法和排查指南

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-general-event-registration.md`

---

# WDP 通用事件注册子技能

只负责事件层，避免在本 skill 中混入大段业务逻辑。

## 前置条件

1. `App` 已实例化。
2. `Renderer.Start()` 已成功。
3. 场景相关事件在合适时机注册。

## 标准流程

1. 定义事件清单。
- 明确事件名、用途、成功条件、失败分支。

2. 统一注册入口。
- 只在一个入口注册，避免多处重复绑定。

3. 在回调中先做守卫。
- 先校验 `res` 结构，再执行业务分发。

4. 输出结构化日志。
- 至少记录 `eventName`、关键参数摘要、结果、错误对象。

5. 维护解绑机制。
- 路由切换或重建场景时回收旧监听。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 事件不触发 | 注册时机不当、事件名错误、渲染未启动 | 检查前置条件（App实例化、Renderer.Start成功）、确认事件名正确、在场景就绪后注册 |
| 事件重复触发 | 重复注册且未解绑 | 统一注册入口，避免多处绑定；路由切换时回收旧监听 |
| 回调空对象报错 | 回调守卫缺失、字段容错不足 | 先校验 `res` 结构再执行业务；检查是否误将代理对象当作普通 JSON 读取属性，详见 `../wdp-api-generic-base-attributes/SKILL.md`"关键认知"章节 |

---

## 事件注册与查询

### 单次注册（触发后自动注销）
- **注册**：`RegisterSceneEvent` / `RegisterErrorEvent` / `RegisterEvent`
- **获取已注册**：`GetRegisterSceneEvent()` - 获取当前已注册的单次场景事件列表
- **解绑**：`UnRegisterSceneEvent` / `UnRegisterErrorEvent` / `UnRegisterEvent`

> 📖 **完整 API 签名**：参考 `../official_api_code_example/official-general-event-registration.md`

### 持续注册（多次触发，需手动注销）
- **注册**：`RegisterSceneEvents` / `RegisterEvents` / `RegisterErrorEvents`
- **获取已注册**：`GetRegisterSceneEvents()` - 获取当前已注册的持续场景事件列表
- **解绑**：`UnRegisterSceneEvents` / `UnRegisterEvents` / `UnRegisterErrorEvents`

> 📖 **完整 API 签名**：参考 `../official_api_code_example/official-general-event-registration.md`

### 路由切换时批量解绑
**推荐做法**：
1. 维护事件注册列表（`activeEvents` 数组）
2. 注册时记录事件名和处理器
3. 路由切换时遍历解绑

> 📖 **完整代码示例**：参考 `../official_api_code_example/official-general-event-registration.md`

## 核心事件高阶参数认知（Checklist补充）

1. **鼠标交互体系 (`OnEntityClicked`, `OnMouseEnterEntity`, `OnEntityDbClicked`, `OnMouseOutEntity`)**：
   - **区分鼠标键位**：通过 `res.result.triggerType` 判定触发键位（`LeftMouseButton`/`RightMouseButton`/`MiddleMouseButton`）
   - **POI 图标判断**：`res.result.triggerArea === 'marker'` 可精确判断点击的是图标本身
   - **图层类型识别（WDP 2.3.0+）**：通过 `res.result.layerType` 识别被点击的图层类型（`3dtiles`/`wms`/`wmts`/`vector`/`poi`/`entity`）
   - **双击事件**：`OnEntityDbClicked` 回调结构与 `OnEntityClicked` 相同
   - **Hover 事件**：`OnMouseEnterEntity` / `OnMouseOutEntity`

   > 📖 **完整事件注册 API 签名**：参考 `../official_api_code_example/official-general-event-registration.md`

2. **选区体系 (`OnEntitySelectionChanged`, `OnEntityNodeSelectionChanged`)**：
   - 状态差分：必须解析 `res.result.selectionType` (`Add`、`Remove`、`Clear`) 才能确切知道当前对象是被加入了多选集合还是被剔除。

3. **相机运动与漫游 (`OnCameraMotionStartEvent`, `OnCameraMotionEndEvent`, `OnCameraRoamingFrame`)**：
   - 相机运动开始/结束事件，包含 `cameraMotionReason` 枚举
   - 相机漫游帧事件，包含 `frameIndex`, `bFinished`, `progressRatio`

4. **系统网络与底座预警 (`onInternalError`, `onConnectError`, `onRTCFailed`)**：
   - 提供容错排查：抓取 `res.code` 和 `res.message`（如 13000-13007 错误码），如果做监控数据大屏，可以截获 `onUEWarningOrError` 呈现底层引擎崩溃信息。

5. **视频清理回收 (`OnRealTimeVideoEvent`)**：
   - 捕捉原生窗口关闭：如果需要处理视频弹窗被用户点 X 关闭，需监听此事件并判断 `res.result.name === 'onDestroy'` 来清理本地维护的数组状态 (`res.result.removed`)。

6. **植被与材质 (`OnVegetationCreating`, `OnVegetationCreated`, `OnWdpMaterialHit`)**：
   - 植被创建中/完成事件
   - 材质网格点击穿透事件，包含 `meshName`, `materialIndex`

7. **GIS 事件 (`OnCreateGeoLayerEvent`, `OnGeoLayerFeatureClicked`)**：
   - WMS/WMTS 添加报错回调
   - GIS 要素点击回调

## 事件验证

### 验证步骤

1. **事件注册验证**
   - 确认 `App.Renderer.RegisterSceneEvent` 调用无报错
   - 检查返回的 Promise 是否成功 resolve

2. **回调触发测试**
   - 注册测试事件处理器
   - 执行交互操作（如点击场景中的实体）
   - 检查回调是否被触发

   > 📖 **完整测试代码示例**：参考 `../official_api_code_example/official-general-event-registration.md`

3. **回调参数验证**
   - 检查 `res.result` 是否包含预期字段（如 `eid`、`triggerType`、`layerType`）
   - 验证字段类型是否正确

### 成功标志

| 验证项 | 成功标志 |
|--------|---------|
| 事件注册 | `RegisterSceneEvent` 返回 resolved Promise，无报错 |
| 回调触发 | 执行交互操作后，控制台输出事件日志 |
| 参数完整 | `res.result` 包含预期的字段（eid、triggerType 等） |
| 无重复触发 | 单次交互只触发一次回调 |

### 失败排查

如验证失败，按以下顺序排查：
1. 检查前置条件（App实例化、Renderer.Start成功）
2. 确认事件名拼写正确（区分大小写）
3. 检查是否在场景就绪后注册事件
4. 参考 [高频问题](#高频问题) 章节

---

## 参考资料（相对路径）

- `../official_api_code_example/official-general-event-registration.md`
- `../wdp-api-generic-base-attributes/SKILL.md` - 回调守卫和属性读取

## 输出要求

始终输出：
1. 事件注册或回收改动点
2. 稳定性影响
3. 修复补丁或实现建议
4. 验证步骤与预期
