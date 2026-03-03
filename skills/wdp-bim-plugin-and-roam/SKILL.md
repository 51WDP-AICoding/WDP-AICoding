---
name: wdp-bim-plugin-and-roam
description: 处理 BIM 插件安装与相机漫游链路（Plugin.Install(BimApi)、CameraRoam、PlayRoam/StopRoam）的实现与排障。用于项目接入 BIM 插件并执行引导漫游、中断漫游、回归镜头时使用本技能。
---

# BIM 插件与漫游子技能

本技能只处理“插件安装 + 漫游链路”，BIM 模型/构件/空间能力由 `bim-api-core-operations` 负责。

## 版本与来源约束（强制）

- 具体方法名、参数结构、枚举值、返回字段仅以官方在线文档为准。
- 历史案例只用于流程优化（时序、门禁、回滚），不作为方法真值来源。

## 能力范围

1. BIM 插件安装
- `App.Plugin.Install(BimApi)`
- 安装结果校验与失败降级

2. 漫游对象创建与播放
- `new App.CameraRoam({...})`
- `Scene.Add(entityObj)`
- `CameraControl.PlayRoam(entityObj, args)`
- `CameraControl.StopRoam()`

3. 漫游状态联动
- `OnCameraMotionEndEvent` 回调处理
- 业务 UI 的“开始/退出引导”状态同步

## 执行流程

1. 渲染器实例创建后先 `Install(BimApi)`，成功再进入业务逻辑。
2. 构造 `CameraRoam` 并 `Scene.Add`。
3. `PlayRoam` 启动，结束或中断时调用 `StopRoam`。
4. 必须监听运动结束事件做 UI 和状态回收。

## 参考资料（相对路径）

- `../api_code_example/official-bim-full.md`
- `../api_code_example/bim-plugin-and-roam.template.js`
- `../api_code_example/official-scene-camera.md`

## 输出要求

始终输出：
1. 插件安装结果与校验点
2. 漫游帧参数与播放参数
3. 开始/停止/回收调用链
4. 验证步骤（安装成功、漫游开始、漫游结束回调、可中断）
