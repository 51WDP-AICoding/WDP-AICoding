---
name: wdp-api-entity-general-behavior
description: 处理 WDP 实体/单体通用行为 API 的实现与排障。用于规范按类型、EID、EntityName、CustomId 的实体检索，以及显隐、删除、落地等通用行为调用；涉及实体对象操作时使用本技能。
---

# WDP 实体/单体通用行为子技能

只负责实体通用行为域，不负责前端布局和相机编排。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 依赖场景状态的行为在 `SceneReady(100%)` 后执行。
3. 输入参数完成必填、类型、范围校验。

## 标准流程

1. 明确检索方式。
- 优先按最稳定键检索：`Eid > CustomId > EntityName > Type`。

2. 执行对象获取。
- 使用 `App.Scene.GetByEids/GetByCustomId/GetByEntityName/GetByTypes/GetAll` 获取对象。

3. 执行实体行为。
- 显隐：`SetVisible` 或 `SetVisibleByObjects`。
- 删除：`ClearByTypes/ClearByObjects/ClearByEids`。
- 落地：对象级 `SnapTo(...)`。

4. 校验执行结果。
- 记录目标集合数量、成功/失败数量、失败对象摘要。

## 质量门槛

1. 不对空对象集合直接调用批量行为。
2. 不在未确认对象类型时执行高风险删除。
3. 删除/批量修改前先输出目标清单摘要。

## 特殊编排流警告 (BIM楼层级显隐相关)

如果涉及到**"BIM 模型的楼层级显隐、结构控制、隔离与兜底保护"**操作：
请特别注意以下技术限制：

### BIM 楼层显隐技术限制

**核心问题：**
BIM 模型的楼层实体是**主建筑的子节点**，存储在场景的 `Hierarchy` 数组中，**不是独立实体**。

**因此：**
- ❌ `GetByEntityName()` 无法查询到楼层实体（返回空数组）
- ❌ `UpdateByEntityName()` 无法批量更新楼层显隐
- ❌ 楼层实体不在 `entitiesData` 中

**正确做法：**
```javascript
// Step 1: 获取所有实体
const allRes = await app.Scene.GetAll();

// Step 2: 从 Hierarchy 数组中筛选楼层（不是 entitiesData）
const allEntities = allRes.result.Hierarchy || [];

// Step 3: 根据 entityName 筛选目标楼层
const floorNames = ['xxx-GF-AR.rvt', 'xxx-1F-ST.rvt', ...];
const matchedEntities = allEntities.filter(e => {
    const name = e.entityName || e.BasicInfoAtom?.entityName;
    return floorNames.includes(name);
});

// Step 4: 逐个调用 SetVisible（无法使用批量 API）
for (const floorEntity of matchedEntities) {
    await floorEntity.SetVisible(isVisible); // true=显示, false=隐藏
}
```

**关键提示：**
1. 楼层文件名必须与场景中的 `entityName` 完全匹配（包括大小写和扩展名）
2. 主建筑模型（如"三层办公楼建筑.rvt"）通常也在 `Hierarchy` 中，注意区分
3. 隐藏楼层时建议确保主建筑模型保持可见

## 高频问题

1. 通过名称/自定义ID查不到对象。
- 检查写入字段是否在基础属性中正确设置。

2. 批量删除误删。
- 检查类型大小写和目标列表构造。

3. 显隐成功但视觉异常。
- 检查是否被后续调用覆盖、或对象自身状态变更。

## 参考资料（相对路径）

- `../official_api_code_example/official-entity-general-behavior.md`

## 输出要求

始终输出：
1. 目标实体筛选方式
2. 执行行为与影响范围
3. 验证步骤与结果
4. 最小复现与回滚建议（如有）