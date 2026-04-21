---
name: wdp-api-camera-unified
description: 处理场景相机控制、视角切换、漫游路径与动画的实现与排障。用于相机操作、视角切换、路径漫游、动画控制等功能实现。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述相机控制的能力范围和功能分类
- ✅ 说明相机操作的强制性要求和严禁事项
- ✅ 描述相机与漫游的最佳实践和常见问题
- ✅ 说明 Apply vs SetCameraPose 等易混淆概念的区别

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-scene-camera.md`

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

## ❌ 严禁事项

### 禁止编造API方法名
**AI严禁凭经验猜测或编造相机相关API方法名。**

❌ **错误示例**（AI编造的不存在API）：
- `App.CameraControl.FollowTarget(targetObj)` - 不存在！
- `App.Camera.LookAt(entity)` - 不存在！
- `App.CameraControl.SetFollowMode(true)` - 不存在！

✅ **正确做法**：
- 查阅 `../official_api_code_example/official-scene-camera.md` 确认真实API
- 如文档中无"跟随"相关API，应向用户说明并寻求替代方案
- 不得基于通识经验推测API存在

### 禁止凭经验猜测参数
WDP API参数命名不统一，**必须通过官方文档确认参数格式**，不能凭经验猜测。

❌ **错误示例**：
- `App.CameraControl.Focus({ target: eid, duration: 1000 })` - 参数名错误！

✅ **正确做法**：
- 查阅官方文档确认准确的参数名和结构
- 参数可能为 `eid`、`entity`、`targetEid`、`duration`、`flyTime` 等，必须以文档为准

## 📋 相机与漫游能力范围

> ⚠️ **以下方法名仅为功能描述，具体方法签名以 `official-scene-camera.md` 为准**。

### 1. 基础相机控制
- 相机聚焦：Focus、FlyTo
- 节点聚焦：FocusToNodes（聚焦到底板或项目下的节点）
- 相机跟随：Follow、Stop
- 相机移动：Move（按方向/距离）
- 相机旋转：Rotate（按方向/角度）
- 相机环绕：Around（围绕指定实体旋转）
- 获取相机信息：GetCameraPose、GetCameraInfo
- 数字人漫游：PlayEntityRoam、StopEntityRoam（>= 2.3.1）

### 2. 视角切换
- 预设视角切换：ResetCameraPose
- 设置绝对视角位置：SetCameraPose（推荐用于"回到某视角"场景）
- 应用机位预设对象：Apply（仅用于 `new App.Camera()` 创建并 `Scene.Add()` 后的对象，**不要用 Apply 来恢复通过 GetCameraPose 获取的位置**）
- ⚠️ **Apply vs SetCameraPose 区别**：`Apply` 接收 Camera 实体对象，内部可能有额外处理逻辑导致飞行目标偏移；`SetCameraPose` 接收 `{location, rotation, flyTime}` 纯数据，直接设置绝对坐标，行为可预测。**保存/恢复视角应使用 GetCameraPose + SetCameraPose 组合**。

### 3. 相机限制
- 设置相机限制（软限制）：SetCameraLimit
- 设置相机锁定限制（硬限制）：SetCameraLockLimit
- 重置相机限制：ResetCameraLimit
- 获取相机限制：GetCameraLimit

### 4. 漫游路径
- 路径加载与管理：CameraRoam 对象创建、Update
- 路径漫游控制：PlayRoam、PauseRoam、StopRoam
- 漫游进度查询：GetCameraRoamingInfo
- 路径事件监听：RegisterSceneEvent (OnRoamPathStart 等)

### 5. 自由漫游模式
- 相机模式设置：SetCameraMode（RTS/FPS/TPS）
- 相机动画设置：SetCameraAnimation

### 6. 相机动画与步进控制
- 相机动画控制：CameraStepMove、CameraStepRotate、CameraStepZoom、StopCameraStepUpdate
- 相机速度配置：GetCameraSpeed、SetCameraSpeed
- 相机动画配置：GetCameraAnimation、SetCameraAnimation

## ⚠️ 常见问题解决

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 相机聚焦（Focus）不生效 | eid 无效或实体未加载 | 确认 eid 存在且有效；确认实体已加载完成并可见 |
| 相机跟随（Follow）不生效 | 跟随目标对象无效，或把跟随问题误当成路径/覆盖物问题处理 | 确认目标实体对象有效；先区分"实体是否会动"和"镜头是否跟随"是两层问题 |
| 漫游路径（Roam.StartPath）不移动 | 路径未加载或 pathId 无效 | 确保先调用 LoadPath 加载路径；确认 pathId 存在且有效 |
| 自由漫游（Roam.StartFreeRoam）键盘不响应 | 页面无焦点或事件监听错误 | 确保页面有焦点；确认键盘事件监听器正确设置 |
| 相机动画（CameraControl.CreateAnimation）不流畅 | 关键帧设置不当 | 确保关键帧时间值递增且在 0-duration 范围内；关键帧至少 3-4 个 |

## 🔀 与路径运动的边界

- `Bound` / `Scene.Move` 负责"实体怎么沿路径运动"
- `CameraControl.Follow` 负责"镜头怎么跟随目标实体"
- 不要把"车辆不动"和"镜头不跟"混成一个问题排查
- 典型整链路通常是：
  1. `wdp-api-coverings-unified` 创建 `Path` / `Particle`
  2. `wdp-api-entity-general-behavior` 通过 `Bound` 或 `Scene.Move` 让实体运动
  3. `wdp-api-camera-unified` 通过 `Follow` 做跟拍

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
