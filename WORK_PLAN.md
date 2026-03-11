# WDP API Skill 补充工作计划

## 原始资料来源
`D:\WorkFiles_Codex\Product_Report\WDP产品介绍\01_原始资料\WDPAPI 文档（补充出入参信息）.docx`

## 当前 skill 库基线
- 版本：WDP API 2.2.1
- 已有 official-*.md 文件覆盖范围见 OFFICIAL_EXCERPT_INDEX.md

---

## 需要补充的内容（按优先级）

### P0：新增文件 - 坐标与空间理解（对应路线第4条）
新建 `skills/api_code_example/official-spatial-understanding.md`

覆盖以下 API：
1. `App.Tools.Coordinate.GISToCartesian([[lng,lat,z]])` → 返回 Cartesian 坐标
2. `App.Tools.Coordinate.CartesianToGIS([[x,y,z]])` → 返回 GIS 坐标
3. `App.Tools.Coordinate.WorldPosToScreenPos([x,y,z])` → 返回屏幕坐标
4. `App.Tools.Coordinate.GISToScreenPos([lng,lat,z])` → 返回屏幕坐标
5. `App.Tools.Coordinate.Exchange(fromCRS, toCRS, point)` → 坐标系转换
6. `App.Tools.Coordinate.TransformPointsByCoordZRef({points, coordZRef, coordZOffset})` → 批量坐标高度转换
7. `App.CameraControl.GetCameraPose()` → 获取当前相机位置（场景中心参考）
8. `App.Scene.GetAll()` → 获取所有实体（含 eid/type/entityName）
9. `App.Scene.GetGlobal()` → 获取 GeoReference + CameraStart + WdpGlobalSettings
10. `App.Scene.GetGlobalSettings()` → 获取全局设置
11. `App.Tools.PickerPoint.StartPickPoint/EndPickPoint/GetPickedPoints` → 取点工具
12. `App.Scene.GetBoundingBox([obj,...])` → 获取对象包围盒
13. `App.DataModel.GeoReference` 对象（坐标系信息）
14. `App.DataModel.LocalGeoReference` 对象（局部坐标系）

新建 `skills/wdp-api-spatial-understanding/SKILL.md`

---

### P1：更新 official-initialize-scene.md
补充以下内容：
- `App.Renderer.Start()` 出参结构：`{success: bool, message: string}`
- `App.Renderer.Restart()` / `Stop()`
- `App.Renderer.StartByTaskId(io, taskId)` 出参
- `App.Renderer.SetResolutionMultiple(n)` 出参
- `App.Renderer.SetResolution(w, h)` 出参
- `App.Renderer.SetFrameRateLimit(fps)` 出参
- `App.Renderer.SetBitrate(mbps)` 出参
- `App.Renderer.GetStats()` 出参（流实时信息）
- `App.Renderer.GetSnapshot([w,h], quality)` 出参（base64图片）
- `App.Renderer.RegisterErrorEvent/UnRegisterErrorEvent` 错误事件名列表：`OnValidateError`
- `App.Renderer.RegisterEvent/UnRegisterEvent` 视频流事件名列表
- `App.Renderer.RegisterSceneEvent/UnRegisterSceneEvent` 场景事件名列表（补全）
- `App.System.GetInfomation()` 出参（系统信息）
- `App.Setting.GetApiVersion()` 出参

---

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

### P3：更新 official-entity-general-behavior.md
补充以下内容：
- `App.Scene.GetTypesByEids(['eid1','eid2'])` 出参
- `App.Scene.GetBoundingBox([obj,...])` 出参：`{center:[x,y,z], size:[w,h,d]}`
- `App.Scene.GetGlobal()` 出参
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
- `App.Scene.Move({path,entity,moving})` 完整入参

---

### P4：新增 official-entity-coverings-extended.md
覆盖当前 official-entity-coverings.md 未包含的新覆盖物类型：
- `App.CustomPoi` (>=1.16.2 & >=2.1.2) - 自定义POI，含 labelStyle/generalLabelStyle/specificLabelStyle
- `App.MeshHeatMap` (>=2.0.2 & >=1.15.4) - 3D网格热力图
- `App.RealTimeVideo` - 实时视频（完整成员属性）
- `App.Bound` - 物体沿路径移动（完整成员属性）
- `App.Effects` - 粒子特效（完整成员属性）
- `App.Group` - 组（Add/Remove/UnGroup）
- `App.StaticInstance` - 静态实例（instanceComponentInfos）
- `App.Skeletal` - 骨骼模型（animSequences/animSequenceIndex/bPause/bLoop/playRate）
- `App.Vegetation` - 智能建模植被
- `App.ModelerEmbank/Water/River/Fence/Floor` - 智能建模系列
- `App.ProjectModel/ProjectInstance` - 工程摆放模型
- `App.Tiles/EarthTiles/Project` - 底板系列（完整方法）

---

### P5：新增 official-component-ui.md
覆盖 App.Component 系列（当前完全没有）：
- `App.Component.WindowUI` - 窗口组件（Create/Creates/Add/Update/Remove/Get/AddEvents）
- `App.Component.PoiUI` - 点位组件
- `App.Component.VideoUI` - 视频组件

---

### P6：新增 official-tools-extended.md
覆盖工具类扩展：
- `App.Tools.Picker.PickByScreenPos/PickWorldPointByScreenPos`
- `App.Tools.Picker.PickAesTilesNodeByScreenPos/PickAesTilesNodesByRectangle`
- `App.Tools.Picker.PickMaterialByScreenPos`
- `App.Tools.PickerPolyline.StartPickPolyline/EndPickPolyline/GetPickedPolylines`
- `App.Tools.Shape.UpdateShapePoints/RangePickShapePoints`
- `App.Tools.MiniMap.Start/End/Get`
- `App.Tools.Compass.Start/End/Get`
- `App.Tools.Screen.AddScreenPosBound/UpdateScreenPosBound/RemoveScreenPosBound`
- `App.Tools.ChinaMap.Switch/HighlightProvince/SetProvinceNameVisibility/CreateMigration`
- `App.Tools.Color.RgbaToHexa/HexaToRgba`
- `App.DataModel.AssetLoader.LoadAssetById/ReplaceAssetById/GetMeshSizeById`
- `App.DataModel.DaaS.GetCloudDiskFileList`
- `App.DataModel.Cluster.Start/End/Modify` (>=1.16.3 & >=2.1.3)

---

### P7：更新 official-layer-models.md
补充 Tiles 相关完整方法：
- `App.Scene.Tiles.ActivateAesTiles/DeactivateAesTiles/IsActivated`
- `App.Scene.Tiles.SetLayersOutline/SetLayersHighlight/SetLayersVisibility`
- `App.Scene.Tiles.GetLayers`
- `App.Scene.Tiles.CreateAesTilesEntityWithOutGRPC`
- `App.Scene.Node.SetNodesOutline/SetNodesHighlight/SetNodesVisibility`
- `App.Scene.Node.AddVisibilityGroup/UpdateVisibilityGroup/RemoveVisibilityGroup/GetVisibilityGroup`
- `App.Scene.NodeSelection.Add/Remove/Draw/Clear/AddDraw/RemoveDraw/ClearDraw`
- `entity.GetNodesBoundingBox(['nodeId1','nodeId2'])` (>=2.2.1)

---

## 新增 SKILL 文件

### skills/wdp-api-spatial-understanding/SKILL.md
用途：项目启动后获取基础空间信息
- 获取场景中心点（通过 GetCameraPose 或 GetAll 后计算包围盒）
- 获取所有实体的 eid/type/entityName/坐标
- 坐标系确认（GeoReference）
- 随机撒点获取坐标（PickerPoint 工具）
- 坐标转换（GIS ↔ Cartesian ↔ Screen）

---

## 执行顺序建议
1. P0（空间理解 skill）- 新建，独立，不依赖其他
2. P1（initialize-scene 补充）- 基础，影响所有其他 skill
3. P2（scene-camera 补充）- 高频使用
4. P4（新覆盖物类型）- 内容量大，分批处理
5. P3（entity-general-behavior 补充）
6. P5（component-ui 新增）
7. P6（tools-extended 新增）
8. P7（layer-models 补充）
