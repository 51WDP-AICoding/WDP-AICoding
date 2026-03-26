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

### 1. 相机聚焦（Focus）
- **问题**: 调用`Focus`但相机没有移动到目标位置
- **解决方案**: 
  - 确认传递的`eid`存在并且有效
  - 确认实体已加载完成并可见

### 2. 漫游路径（Roam.StartPath）
- **问题**: 开始漫游路径但相机没有移动
- **解决方案**: 
  - 确保先调用`LoadPath`加载路径
  - 确认`pathId`存在并且有效

### 3. 自由漫游（Roam.StartFreeRoam）
- **问题**: 自由漫游模式下键盘控制不响应
- **解决方案**: 
  - 确保页面有焦点
  - 确认键盘事件监听器正确设置

### 4. 相机动画（CameraControl.CreateAnimation）
- **问题**: 创建相机动画但播放时不流畅或不按预期路径移动
- **解决方案**: 
  - 确保关键帧时间值递增且在0到duration范围内
  - 关键帧数量不要过少，至少需要3-4个关键帧才能形成平滑路径

## � 高阶事件与交互技巧

### 1. 相机运动原因追溯
使用 `OnCameraMotionStartEvent` 和 `OnCameraMotionEndEvent` 回调时，**务必解析 `res.result.cameraMotionReason` 枚举**。这能够帮你区分相机运动是来自于手动操作控制（`E_DeviceInput`），还是 API 调用（例如 `E_API_FocusToEntities`、`E_API_PlayCameraRoam`）。

### 2. 漫游进度可视化 UI
当需要前端实现跟随镜头漫游的进度条时，注册监听 `OnCameraRoamingFrame` 事件，读取 `res.result.progressRatio`（0~1 的浮点数）实时更新 DOM，以获得帧级别的同步动画。

## �📋 验证方法

### 验证相机控制
1. 获取当前相机位置
2. 移动相机到新位置
3. 验证位置是否改变

### 验证漫游功能
1. 获取所有漫游路径
2. 加载并开始漫游
3. 测试暂停、恢复和停止功能

## 🔗 参考资料（相对路径）

- 🔗 `../official_api_code_example/official-scene-camera.md`

## 🚨 强制性要求（再次强调）

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在场景就绪后(progress === 100)才执行相机操作**
3. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
4. 🚨 **漫游路径操作前必须确保路径已加载**
5. 🚨 **相机动画必须考虑性能影响，避免过于频繁的相机操作**

⚠️ 忽略这些要求将导致相机操作失败、漫游路径无法正常工作或应用性能下降。无论任何情况，都需要先确认场景已完全加载，再进行相机和漫游操作。