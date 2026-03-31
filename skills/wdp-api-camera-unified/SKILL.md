---
name: wdp-api-camera-unified
description: 处理场景相机控制、视角切换、漫游路径与动画的实现与排障。用于相机操作、视角切换、路径漫游、动画控制等功能实现。
---

# WDP 相机与漫游统一技能

## 🚨 强制性要求

任何使用相机和漫游功能的代码必须遵循以下要求：

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在场景就绪后(progress === 100)才执行相机操作**
3. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
4. 🚨 **漫游路径操作前必须确保路径已加载**
5. 🚨 **相机动画必须考虑性能影响，避免过于频繁的相机操作**

⚠️ 如果上述任何一点不满足，相机和漫游相关代码可能无法正常工作！

## 📋 相机与漫游能力范围

> ⚠️ **以下方法名仅为功能描述，具体方法签名以 `official-scene-camera.md` 为准**。

### 1. 基础相机控制
- 相机聚焦：Focus、FlyTo
- 相机移动：Move（按方向/距离）
- 相机旋转：Rotate（按方向/角度）
- 获取相机信息：GetCameraPose、GetCameraInfo

### 2. 视角切换
- 预设视角切换：ResetCameraPose
- 自定义视角保存与加载：SaveCurrentView、LoadSavedView、GetAllSavedViews

### 3. 漫游路径
- 路径加载与管理：CameraRoam 对象创建、Update
- 路径漫游控制：PlayRoam、PauseRoam、StopRoam
- 路径事件监听：RegisterSceneEvent (OnRoamPathStart 等)

### 4. 自由漫游模式
- 相机模式设置：SetCameraMode（RTS/FPS/TPS）
- 相机动画设置：SetCameraAnimation

### 5. 相机动画
- 相机动画控制：CameraStepMove、CameraStepRotate、CameraStepZoom、StopCameraStepUpdate

## ⚠️ 常见问题解决

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 相机聚焦（Focus）不生效 | eid 无效或实体未加载 | 确认 eid 存在且有效；确认实体已加载完成并可见 |
| 漫游路径（Roam.StartPath）不移动 | 路径未加载或 pathId 无效 | 确保先调用 LoadPath 加载路径；确认 pathId 存在且有效 |
| 自由漫游（Roam.StartFreeRoam）键盘不响应 | 页面无焦点或事件监听错误 | 确保页面有焦点；确认键盘事件监听器正确设置 |
| 相机动画（CameraControl.CreateAnimation）不流畅 | 关键帧设置不当 | 确保关键帧时间值递增且在 0-duration 范围内；关键帧至少 3-4 个 |

## 🎯 高阶事件与交互技巧

### 1. 相机运动原因追溯
使用 `OnCameraMotionStartEvent` 和 `OnCameraMotionEndEvent` 回调时，**务必解析 `res.result.cameraMotionReason` 枚举**。这能够帮你区分相机运动是来自于手动操作控制（`E_DeviceInput`），还是 API 调用（例如 `E_API_FocusToEntities`、`E_API_PlayCameraRoam`）。

### 2. 漫游进度可视化 UI
当需要前端实现跟随镜头漫游的进度条时，注册监听 `OnCameraRoamingFrame` 事件，读取 `res.result.progressRatio`（0~1 的浮点数）实时更新 DOM，以获得帧级别的同步动画。

## ✅ 验证方法

### 验证相机控制
1. 获取当前相机位置（参考 `official-scene-camera.md` 中 `GetCameraPose`）
2. 移动相机到新位置（参考 `official-scene-camera.md` 中 `FlyTo` 或 `SetCameraPose`）
3. 验证位置是否改变（再次调用 `GetCameraPose` 对比）

### 验证漫游功能
1. 创建 CameraRoam 对象（参考 `official-scene-camera.md` 中 `CameraRoam` 创建）
2. 添加到场景（`App.Scene.Add`）
3. 开始漫游（`PlayRoam`）
4. 测试暂停（`PauseRoam`）、继续（`PlayRoam`）和停止（`StopRoam`）

### 成功标志

| 验证项 | 成功标志 |
|--------|---------|
| 相机聚焦 | 相机平滑移动到目标位置，控制台无报错 |
| 相机移动 | `GetCameraPose` 返回的位置发生变化 |
| 漫游路径 | 相机沿路径自动移动，`progressRatio` 从 0 到 1 |
| 相机动画 | 动画流畅播放，关键帧过渡自然 |

### 失败排查

如验证失败，按以下顺序排查：
1. 检查场景是否就绪（progress === 100）
2. 检查目标 eid/pathId 是否有效
3. 检查网络连接
4. 检查浏览器控制台报错
5. 参考 [常见问题](#常见问题解决) 章节
6. 查阅 `official-scene-camera.md` 确认 API 调用方式

---

## 🔗 参考资料（相对路径）

- `../official_api_code_example/official-scene-camera.md`
