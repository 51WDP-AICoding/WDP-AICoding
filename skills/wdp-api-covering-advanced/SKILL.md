---
name: wdp-api-covering-advanced
description: 处理高级覆盖物与场景批量创建能力（HeatMap/Path/Bound、Scene.Create/Creates、ClearByTypes）的实现与排障。用于项目涉及热力图、路径运动对象、批量覆盖物构建与清理时使用本技能。
---

# 高级覆盖物子技能

本技能聚焦“覆盖物高级能力”，不处理初始化与基础事件注册。

## 能力范围

1. 批量创建与清理
- `Scene.Create(...)`
- `Scene.Creates(...)`
- `Scene.ClearByTypes([...])`

2. 高级覆盖物对象
- `new App.HeatMap({...})`
- `new App.Path({...})`
- `new App.Bound({...})`
- `Scene.Add(...)`

3. 交互联动
- `onClick` 绑定对象行为
- `Window/POI` 显隐联动

## 执行流程

1. 先确认容器与渲染已就绪（依赖入口 skill 完成初始化）。
2. 用 `Create/Creates` 或 `new Object + Scene.Add` 构建覆盖物。
3. 统一用 `ClearByTypes` 管理生命周期，避免残留对象。
4. 对交互对象添加 `customId`，便于后续检索与回收。

## 参考资料（相对路径）

- `../api_code_example/official-entity-coverings.md`
- `../api_code_example/official-function-components.md`
- `../api_code_example/entity-coverings.template.js`
- `../api_code_example/covering-advanced.template.js`

## 输出要求

始终输出：
1. 覆盖物类型清单（Poi/Window/HeatMap/Path/Bound）
2. 创建与清理调用链
3. 最小可运行代码
4. 验证步骤（创建成功、点击联动、清理成功）
