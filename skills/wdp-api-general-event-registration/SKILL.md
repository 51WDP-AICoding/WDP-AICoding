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

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 事件不触发 | 注册时机不当、事件名错误、渲染未启动 | 检查前置条件（App实例化、Renderer.Start成功）、确认事件名正确、在场景就绪后注册 |
| 事件重复触发 | 重复注册且未解绑 | 统一注册入口，避免多处绑定；路由切换时回收旧监听 |
| 回调空对象报错 | 回调守卫缺失、字段容错不足 | 先校验 `res` 结构再执行业务；检查是否误将代理对象当作普通 JSON 读取属性，详见 `../wdp-api-generic-base-attributes/SKILL.md`"关键认知"章节 |

---

## 事件解绑示例

### 解绑单个场景事件
```javascript
// 保存事件引用以便解绑
const clickHandler = (res) => {
  console.log('点击:', res.result.eid);
};

// 注册
await App.Renderer.RegisterSceneEvent([{
  name: 'OnEntityClicked',
  func: clickHandler
}]);

// 解绑场景事件
await App.Renderer.UnRegisterSceneEvent(['OnEntityClicked']);
```

### 解绑云渲染事件
```javascript
// 注册云渲染事件
App.Renderer.RegisterEvent([
  { name: 'onStopedRenderCloud', func: (res) => { /* 处理渲染中断 */ } },
  { name: 'onConnectError', func: (res) => { /* 处理连接错误 */ } }
]);

// 解绑云渲染事件
App.Renderer.UnRegisterEvent(['onStopedRenderCloud', 'onConnectError']);
```

### 路由切换时批量解绑
```javascript
// 维护事件注册列表
const activeEvents = [];

// 注册时记录
async function registerEvent(name, handler) {
  await App.Renderer.RegisterSceneEvent([{ name, func: handler }]);
  activeEvents.push({ name, handler });
}

// 路由切换时批量清理
async function cleanupEvents() {
  // 解绑所有场景事件
  for (const event of activeEvents) {
    await App.Renderer.UnRegisterSceneEvent([event.name]);
  }
  // 清理本地状态
  activeEvents.length = 0;
}
```

### 重复注册事件机制
适用于需要多次注册同一事件的场景：
```javascript
// 注册（可重复注册同一事件）
await App.Renderer.RegisterSceneEvents([
  { name: 'OnEntityClicked', func: handler1 },
  { name: 'OnEntityClicked', func: handler2 }
]);

// 获取已注册的重复事件
const res = await App.Renderer.GetRegisterSceneEvents();

// 注销指定的重复注册事件
await App.Renderer.UnRegisterSceneEvents(['OnEntityClicked']);
```

## 核心事件高阶参数认知（Checklist补充）

1. **鼠标交互体系 (`OnEntityClicked`, `OnMouseEnterEntity`, `OnEntityDbClicked`, `OnMouseLeaveEntity`)**：
   - 区分鼠标键位：当收到交互回调时，可以通过 `res.result.triggerType` 判定触发键位（`LeftMouseButton`、`RightMouseButton`、`MiddleMouseButton`），防止右键拖拽误触点击。
   - POI 图标判断：POI 的 `res.result.triggerArea === 'marker'` 可用于精确判断用户点击的是图标本身还是其他区域。
   - **图层类型识别（WDP 2.3.0+）**：鼠标事件回调中可通过 `res.result.layerType` 识别被点击的图层类型
     ```javascript
     await App.Renderer.RegisterSceneEvent([{
       name: 'OnEntityClicked',
       func: (res) => {
         const { eid, triggerType, layerType } = res.result;
         
         // 区分不同图层类型
         switch(layerType) {
           case '3dtiles': console.log('3DTiles 模型'); break;
           case 'wms': console.log('WMS 图层'); break;
           case 'wmts': console.log('WMTS 图层'); break;
           case 'vector': console.log('矢量图层'); break;
           case 'poi': console.log('POI 图标'); break;
           case 'entity': console.log('普通实体'); break;
         }
         
         // 区分鼠标键位
         if (triggerType === 'LeftMouseButton') console.log('左键');
         else if (triggerType === 'RightMouseButton') console.log('右键');
         else if (triggerType === 'MiddleMouseButton') console.log('中键');
       }
     }]);
     ```
     
   - **双击事件**：`OnEntityDbClicked` 回调结构与 `OnEntityClicked` 相同
     ```javascript
     await App.Renderer.RegisterSceneEvent([{
       name: 'OnEntityDbClicked',
       func: (res) => {
         console.log('双击实体:', res.result.eid);
       }
     }]);
     ```
     
   - **Hover 事件**：`OnMouseEnterEntity` / `OnMouseOutEntity`
     ```javascript
     await App.Renderer.RegisterSceneEvent([
       {
         name: 'OnMouseEnterEntity',
         func: (res) => { console.log('鼠标进入:', res.result.eid); }
       },
       {
         name: 'OnMouseOutEntity',
         func: (res) => { console.log('鼠标离开:', res.result.eid); }
       }
     ]);
     ```
2. **选区体系 (`OnEntitySelectionChanged`, `OnEntityNodeSelectionChanged`)**：
   - 状态差分：必须解析 `res.result.selectionType` (`Add`、`Remove`、`Clear`) 才能确切知道当前对象是被加入了多选集合还是被剔除。
3. **系统网络与底座预警 (`onInternalError`, `onConnectError`, `onRTCFailed`)**：
   - 提供容错排查：抓取 `res.code` 和 `res.message`（如 13000-13007 错误码），如果做监控数据大屏，可以截获 `onUEWarningOrError` 呈现底层引擎崩溃信息。
4. **视频清理回收 (`OnRealTimeVideoEvent`)**：
   - 捕捉原生窗口关闭：如果需要处理视频弹窗被用户点 X 关闭，需监听此事件并判断 `res.result.name === 'onDestroy'` 来清理本地维护的数组状态 (`res.result.removed`)。

## 事件验证

### 验证步骤

1. **事件注册验证**
   - 确认 `App.Renderer.RegisterSceneEvent` 调用无报错
   - 检查返回的 Promise 是否成功 resolve

2. **回调触发测试**
   ```javascript
   // 测试事件是否触发
   let eventTriggered = false;
   
   await App.Renderer.RegisterSceneEvent([{
     name: 'OnEntityClicked',
     func: (res) => {
       eventTriggered = true;
       console.log('✅ 事件触发成功:', res.result);
     }
   }]);
   
   // 手动触发测试（如点击场景中的实体）
   setTimeout(() => {
     if (!eventTriggered) {
       console.warn('⚠️ 事件未触发，请检查：1) 注册时机 2) 事件名 3) 场景就绪状态');
     }
   }, 5000);
   ```

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