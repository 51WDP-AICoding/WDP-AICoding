---
name: wdp-api-general-event-registration
description: 处理 WDP 通用事件注册与治理。用于规范事件注册时机、回调守卫、重复绑定回收和日志可观测性；涉及事件不触发或重复触发时使用本技能。
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

1. 事件不触发。
- 检查注册时机、事件名和渲染启动状态。

2. 事件重复触发。
- 检查是否重复注册且未解绑。

3. 回调空对象报错。
- 检查回调守卫和字段容错。
- 检查是否误将代理对象当作普通 JSON 读取属性（如 `res.result.object.eid` 返回 undefined），详见 `../wdp-api-generic-base-attributes/SKILL.md`"关键认知"章节。

## 核心事件高阶参数认知（Checklist补充）

1. **鼠标交互体系 (`OnEntityClicked`, `OnMouseEnterEntity`)**：
   - 区分鼠标键位：当收到交互回调时，可以通过 `res.result.triggerType` 判定触发键位（`LeftMouseButton`、`RightMouseButton`、`MiddleMouseButton`），防止右键拖拽误触点击。
   - POI 图标判断：POI 的 `res.result.triggerArea === 'marker'` 可用于精确判断用户点击的是图标本身还是其他区域。
2. **选区体系 (`OnEntitySelectionChanged`, `OnEntityNodeSelectionChanged`)**：
   - 状态差分：必须解析 `res.result.selectionType` (`Add`、`Remove`、`Clear`) 才能确切知道当前对象是被加入了多选集合还是被剔除。
3. **系统网络与底座预警 (`onInternalError`, `onConnectError`, `onRTCFailed`)**：
   - 提供容错排查：抓取 `res.code` 和 `res.message`（如 13000-13007 错误码），如果做监控数据大屏，可以截获 `onUEWarningOrError` 呈现底层引擎崩溃信息。
4. **视频清理回收 (`OnRealTimeVideoEvent`)**：
   - 捕捉原生窗口关闭：如果需要处理视频弹窗被用户点 X 关闭，需监听此事件并判断 `res.result.name === 'onDestroy'` 来清理本地维护的数组状态 (`res.result.removed`)。

## 参考资料（相对路径）

- `../official_api_code_example/official-general-event-registration.md`

## 输出要求

始终输出：
1. 事件注册或回收改动点
2. 稳定性影响
3. 修复补丁或实现建议
4. 验证步骤与预期