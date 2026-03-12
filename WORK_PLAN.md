# WDP API Skill 补充工作计划

## 原始资料来源
`D:\WorkFiles_Codex\Product_Report\WDP产品介绍\01_原始资料\WDPAPI 文档（补充出入参信息）.docx`

## 当前 skill 库基线
- 版本：WDP API 2.2.1
- 已有 official-*.md 文件覆盖范围见 OFFICIAL_EXCERPT_INDEX.md

---

## 完成记录

| 优先级 | 内容 | 状态 | 完成时间 |
|--------|------|------|----------|
| P0 | 新建 official-spatial-understanding.md + wdp-api-spatial-understanding/SKILL.md | ✅ 完成 | 2026-03-12 |
| P1 | official-initialize-scene.md 补充 StartByTaskId/SetResolutionMultiple/GetInfomation/GetApiVersion | ✅ 完成（确认已有） | 2026-03-12 |
| P3 | official-entity-general-behavior.md 补充 GetTypesByEids/Scene.Move | ✅ 完成（确认已有） | 2026-03-12 |
| P4 | official-entity-coverings.md 补充 Vegetation完整方法/StaticInstance完整结构和额外方法 | ✅ 完成 | 2026-03-12 |
| P6 | official-function-components.md 修正 Screen.AddScreenPosBound/补充 Cluster.Start/End/Modify | ✅ 完成 | 2026-03-12 |
| 优化 | wdp-api-spatial-understanding/SKILL.md 探查函数拆分轻重两层，GetAll 默认不执行，执行后释放引用 | ✅ 完成 | 2026-03-12 |

---

## 待完成内容（按优先级）

### P2：更新 official-scene-camera.md
补充以下内容：
- `App.CameraControl.GetCameraPose()` 出参：`{location:[lng,lat,z], rotation:{pitch,yaw}}`
- `App.CameraControl.SetCameraPose({location,rotation,flyTime})` 出参
- `App.CameraControl.GetCameraInfo()` 出参（完整相机信息）
- `App.CameraControl.UpdateCamera({...})` 完整入参
- `App.CameraControl.FlyTo({targetPosition,rotation,distance,flyTime})` 入参
- `App.CameraControl.Move({direction,velocity})` 入参
- `App.CameraControl.Focus({rotation,distanceFactor,flyTime,entity})` 出参
- `App.CameraControl.FocusToAll({types,bFilterForExclude})` 入参
- `App.CameraControl.Follow({entity,followRotation,useRelativeRotation,distance,bFPS})` 入参
- `App.CameraControl.PlayRoam(obj,{progressRatio,speedRatio,bReverse})` 入参
- `App.CameraControl.PauseRoam({bEnableRotatingOnPause,bEnableZoomingOnPause})` 入参
- `App.CameraControl.GetCameraRoamingInfo(obj)` 出参（进度比例等）
- `App.CameraControl.Apply(camera, flyTime)` 入参
- `App.CameraControl.CameraStepMove/Rotate/Zoom` 入参
- `App.CameraControl.GetCameraSpeed/SetCameraSpeed` 出入参
- `App.CameraControl.GetCameraAnimation/SetCameraAnimation` 出入参
- `App.CameraControl.ToggleCameraSelfRotate(bool)` 入参
- `App.CameraControl.FocusToNodes({entity,nodeIds,distanceFactor}, mode)` 入参
- `App.CameraControl.ResetCameraLimit(mode)` 出参
- `App.CameraControl.SetCameraLimit/SetCameraLockLimit` 入参
- `App.CameraControl.GetCameraLimit()` 出参
- `App.CameraControl.ResetCameraPose({state,flyTime})` 入参
- `App.CameraControl.SetCameraMode(mode)` 出参
- CameraStart 对象完整成员属性方法
- CameraRoam 对象完整成员属性方法（new App.CameraRoam）
- Camera（机位）对象完整成员属性方法（new App.Camera）

---

### P3-剩余：更新 official-entity-general-behavior.md
以下内容尚未补充：
- `App.Scene.GetGlobal()` 出参（完整结构）
- `App.Scene.GetGlobalSettings()` 出参
- `App.Scene.GetCameraStart()` 出参
- `App.Scene.GetTiles()` 出参
- `App.Scene.GetProject()` 出参
- `App.Scene.ArrayDuplicate({entities,num,translation,rotator,scale,coordType,bInstance,instanceName})` 入参
- `App.Scene.RunAction/EndAction/GetAction` 入参
- `App.Scene.SetSceneStyle(style)` 入参（comic等）
- `App.Scene.ResetSceneState()` 出参
- `App.Scene.CreateByGeoJson/CreateByShapefile` 入参
- `App.Scene.Section.Start/End` 剖切工具

---

### P5：新增 official-component-ui.md
覆盖 App.Component 系列（当前完全没有）：
- `App.Component.WindowUI` - 窗口组件（Create/Creates/Add/Update/Remove/Get/AddEvents）
- `App.Component.PoiUI` - 点位组件
- `App.Component.VideoUI` - 视频组件

---

### P7：更新 official-layer-models.md（剩余部分）
- `App.Scene.Tiles.SetLayersOutline/SetLayersHighlight/SetLayersVisibility`
- `App.Scene.Node.SetNodesOutline/SetNodesHighlight/SetNodesVisibility`
- `App.Scene.NodeSelection.Add/Remove/Draw/Clear`

---

## 执行顺序建议（更新后）
1. P2（scene-camera 补充）- 高频使用，优先级高
2. P3-剩余（entity-general-behavior 剩余部分）
3. P5（component-ui 新增）
4. P7-剩余（layer-models 剩余部分）
