---
name: wdp-api-generic-base-attributes
description: 处理 WDP 通用基础属性 API 的实现与排障。用于规范实体属性读写、批量属性更新和属性变更监听；涉及实体属性操作时使用本技能。
---

# WDP 通用基础属性子技能

覆盖范围：实体属性读写、批量属性更新、属性变更监听。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 目标实体对象可检索（`GetByEids` 或现有对象引用）。
3. 属性字段名和类型已确认。

## 关键认知：WDP 实体对象是代理引用，不是普通 JSON

`GetByEids` / `GetByCustomId` / `GetByEntityName` / `GetAll` 返回的对象，以及事件回调中的 `result.object`，都是 **WDP 实体代理对象**（Proxy/Object wrapper）。不能直接访问 `.eid`、`.entityName` 等属性。

```javascript
// ❌ 错误：将代理对象当作普通对象
const eid = result.object.eid          // undefined
const name = entityObj.entityName      // undefined

// ✅ 正确：通过 Get() 获取属性
const info = await result.object.Get()
const eid = info.result.eid
const name = info.result.entityName
```

**防御性编程模板：**
```javascript
async function getEntityInfo(proxyObj) {
  if (!proxyObj) return null
  try {
    const info = await proxyObj.Get()
    return info?.result ?? null
  } catch (e) {
    console.warn('获取实体信息失败:', e)
    return null
  }
}
```

## 标准流程

1. 获取目标对象。
- 使用 `App.Scene.GetByEids/GetByCustomId/GetByEntityName/GetByTypes` 获取对象。
- **注意**：返回的是代理对象，读取属性必须调用 `.Get()`，见上方"关键认知"。

2. 执行属性读写。
- 读取：`GetBaseAttribute/GetBaseAttributes`。
- 写入：`SetBaseAttribute/SetBaseAttributes`。

3. 监听属性变更。
- 注册：`App.Event.On('EntityBaseAttributeChanged', callback)`。
- 回收：`App.Event.Off('EntityBaseAttributeChanged', callback)`。

4. 校验结果。
- 记录目标集合数量、成功/失败数量、失败对象摘要。

## 质量门槛

1. 不对空对象集合直接调用批量行为。
2. 批量更新前先输出目标清单摘要。
3. 属性变更监听必须有解绑机制。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 属性写入成功但读取为空 | 字段名大小写错误或类型不匹配 | 检查字段名大小写；确认属性类型与写入值一致 |
| 批量更新部分失败 | 部分对象类型不支持或状态异常 | 检查失败对象的类型和状态；分批处理不同类型对象 |
| 监听回调不触发 | 注册时机不当或事件名错误 | 确保在场景就绪后注册；确认事件名拼写正确 |

## 参考资料（相对路径）

- `../official_api_code_example/official-generic-base-attributes.md`

## 输出要求

始终输出：
1. 目标实体筛选方式
2. 属性操作与影响范围
3. 验证步骤与结果
4. 回滚建议（如有）