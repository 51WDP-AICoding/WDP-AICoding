# 官方脚本摘录（新版后台）：场景相机

版本基线：WDP API 2.3.0
来源：wdpapidoc-admin（鉴权后台接口）

## 使用说明
- 本文件基于后台内容摘录，优先用于本地快速编码。
- 若线上文档与本文件不一致，以已发布线上文档为准。
- 不在仓库中保存后台 token；查询时向用户临时索取。

## 条目：相机模式/位置/限制设置（id: 1345）

- 设置镜头模式

```javascript
const res = await App.CameraControl.SetCameraMode('RTS');
console.log(res);

/*
  RTS (飞行模式)
  FPS (第一人称模式)
  TPS (第三人称模式)
*/
```

- 相机模式快捷键说明

| 快捷键 | RTS(沙盘模式) | FPS(第一人称) | TPS(第三人称) |
|--------|---------------|---------------|---------------|
| 鼠标右键 | 旋转视角 | 环视周围 | 调整朝向 |
| Alt+鼠标右键 | 相机围绕鼠标中心旋转 | 无 | 无 |
| 鼠标左键 | 平移相机 | 环视周围 | 平移相机 |
| W/↑ | 与地面平行前进 | 前进 | 沿机身角度前进 |
| S/↓ | 与地面平行后退 | 后退 | 沿机身角度后退 |
| A/← | 与地面平行向左移动 | 向左移动 | 与地面平行向左移动 |
| D/→ | 与地面平行向右移动 | 向右移动 | 与地面平行向右移动 |
| E/PgUp | 上升 | 无 | 上升 |
| Q/PgDn | 下降 | 无 | 下降 |
| 空格 | 无 | 跳起(高度x2后落地) | 无 |
| C | 无 | 下蹲(高度/2) | 无 |
| Shift+移动 | 加速移动(移动速度x3) | 加速移动(移动速度x3) | 加速移动(移动速度x3) |

- 设置镜头自身旋转

```javascript
const res = await App.CameraControl.ToggleCameraSelfRotate(true);
console.log(res); 
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| bSelfRotate | boolean | 是 | true/false | 当镜头模式为飞行模式时，设置成true，镜头以自身旋转；设置成false，镜头以场景的屏幕中心旋转 |


- 获取镜头位置

```javascript
const res = await App.CameraControl.GetCameraPose();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      location: [121.4853, 31.2384, 900],  // 相机 GIS 坐标 [lng, lat, z]
      rotation: {
        pitch: -35,   // 俯仰角（-90~0）
        yaw: 0        // 偏航角（-180~180）
      }
    }
  }
*/
```

- 设置镜头位置

```javascript
const jsondata = {
  "location": [121.48537621,31.23840069,900],
  "rotation": {
    "pitch": -35, //俯仰角, 参考(-90~0)
    "yaw": 0 //偏航角, 参考(-180~180)
  },
  "flyTime": 1 //过渡时长(单位:秒)
}

const res = await App.CameraControl.SetCameraPose(jsondata);
console.log(res);
// 出参: { success: boolean, message: string }
```

- 重置镜头位置

```javascript
//相机初始状态效果若不理想，可以对相机初始状态进行调整
const jsondata = {
  "state": 'Default', //Default: 相机初始状态; Last: 相机最后一次位置
  "flyTime": 1, //过渡时长(单位:秒)
}

const res = await App.CameraControl.ResetCameraPose(jsondata);
console.log(res);
// 出参: { success: boolean, message: string }
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| state | string | 是 | Default/Last | Default: 相机的初始状态；若相机初始状态效果若不理想，可以对相机初始状态进行调整；初始镜头的值在log中的WdpCameraStartEntity可以找到<br>Last: 相机最后一次位置，即SetCameraPose设置的最后一次位置 |
| flyTime | number | 否 | - | 过渡时长(单位:秒) |

- 获取镜头Limit值

```javascript
const res = await App.CameraControl.GetCameraLimit();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      locationLimit: [[lng,lat], ...],  // 位置区域限制（多边形顶点）
      pitchLimit: [-80, 0],             // 俯仰角范围
      yawLimit: [-180, 180],            // 偏航角范围
      viewDistanceLimit: [100, 5000]    // 视距范围（单位：米）
    }
  }
*/
```

- 设置镜头Limit值

```javascript
const jsondata = {
  "locationLimit": [ //设置相机位置区域(至少三个坐标点,三角区域)[选填]
    [121.47095414, 31.22534628],
    [121.47264982, 31.23423431],
    [121.49467492, 31.24871524]
  ],
  "pitchLimit": [-80, 0], //俯仰角; 取值范围[-90~0]
  "yawLimit": [-100, 100], //偏航角; 取值范围[-180~180]
  "viewDistanceLimit": [100, 1000] //相机距离实体距离范围
}

const res = await App.CameraControl.SetCameraLimit(jsondata);
console.log(res);
```

- 设置镜头固定Limit值

```javascript
const jsondata = {
  "locationLimit": 100, // 鼠标拖动场景时, 相机前后左右移动[-100,100]范围(单位:米)
  "pitchLimit": 10, // 当前pitch(俯仰角)可移动的[-10,0]范围; 取值范围[0~90]
  "yawLimit": 20, // 当前yaw(偏航角)可移动的[-20,20]范围; 取值范围[0~180]
  "viewDistanceLimit": 100 // 鼠标滚轮时, 当前视距的[-100,100]范围(单位:米)
}

const res = await App.CameraControl.SetCameraLockLimit(jsondata);
console.log(res);
```

- 重置镜头Limit值

```javascript
const res = await App.CameraControl.ResetCameraLimit('Default');
// Default: 相机初始Limit; Free: 无Limit限制
console.log(res);
// 出参: { success: boolean, message: string }
```

- 设置镜头速度

```javascript
const res = await App.CameraControl.SetCameraSpeed({
    rotationYawSpeedScale: 1, // [选填] 左右旋转时候的相机速度倍率，1.0是正常速度(取值>=0)
    rotationPitchSpeedScale: 1, // [选填] 上下旋转时候的相机速度倍率，1.0是正常速度(取值>=0)
    zoomSpeedScale: 1, // [选填] 滚轮鼠标缩放的相机速度，1.0是正常速度(取值>=0)
    keyMovementBaseSpeed: 1, // [选填] 键盘控制相机移动的速度，1.0是正常速度(取值>=0)
    enableDynamicSpeed: true // [选填] 是否开启动态速度 (默认开启) 如果开启 离地面越远相机速度越快
});
console.log(res);
  
```

- 获取镜头速度

```javascript
const res = await App.CameraControl.GetCameraSpeed();
console.log(res);
```

- 设置镜头圆圈动画

```javascript
const res = await App.CameraControl.SetCameraAnimation({
    showTouchEffect: true, // [选填] 是否显示点击鼠标之后的圆圈动画效果，默认开启
    showRotateICON: true // [选填] 是否显示旋转镜头时候的圆圈图标，默认开启
});
console.log(res);
```

- 获取镜头圆圈动画

```javascript
const res = await App.CameraControl.GetCameraAnimation();
console.log(res);
```

## 条目：相机通用行为（id: 1346）

- 获取相机信息

```javascript
const res = await App.CameraControl.GetCameraInfo();
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      location: [121.4853, 31.2384, 900],
      rotation: { pitch: -35, yaw: 0 },
      locationLimit: [],
      pitchLimit: [-90, 0],
      yawLimit: [-180, 180],
      viewDistanceLimit: [0, 10000],
      fieldOfView: 90,
      controlMode: 'RTS'
    }
  }
*/
```

- 更新相机信息

```javascript
const jsondata = {
  location: [121.48940131, 31.25135281, 500],
  locationLimit: [], //设置相机位置区域(至少三个坐标点,三角区域)[选填]
  rotation: { pitch: -30, yaw: 0 },
  pitchLimit: [-90, 0], // 俯仰角, 参考(-90~0)
  yawLimit: [-180, 180], // 偏航角, 参考(-180~180)
  viewDistanceLimit: [500, 600],
  fieldOfView: 90, // 相机视锥横向视角[0, 120]
  controlMode: "RTS", // 控制模式; RTS (飞行模式); TPS (第三人称模式); FPS (第一人称模式)
  flyTime: 1, // 过渡时长(单位:秒)
};

await App.CameraControl.UpdateCamera(jsondata);
```

- 参数： 

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| location | array | 是 | - | - |
| locationLimit | array | 是 | - | 设置相机位置区域(至少三个坐标点,三角区域) [选填] |
| rotation | object | - | - | - |
| -pitch | number | -30 | [-90,0] | - |
| -yaw | number | 0 | [-180,180] | - |
| pitchLimit | array | [-90,0] | [-90,0] | - |
| yawLimit | array | [-180,180] | [-180,180] | - |
| viewDistanceLimit | array | [0,10000] | [0,+∞) | - |
| fieldOfView | number | 90 | [0,120] | - |
| controlMode | string | RTS, TPS, FPS | RTS (飞行模式); TPS (第三人称模式); FPS (第一人称模式) | - |

- 相机速度移动

```javascript
const res = await App.CameraControl.Move({
  direction: 'right', // 移动方向
  velocity: 10 //速度(单位: 米/秒)
});

console.log(res)
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| direction | string | 是 | forward/backward/left/right/up/down | forward: 前; backward: 后; left: 左; right: 右; up: 上; down: 下 |
| velocity | number | 是 | - | 速度(单位: 米/秒) |

- 相机距离移动

```javascript
const res = await App.CameraControl.Move({
  direction: 'right', // 移动方向
  distance: 10, //距离（单位：米）
  velocity: 10 //速度(单位: 米/秒)
});
/*
direction: 移动方向
  forward 前; 
  backward 后; 
  left 左; 
  right 右; 
  up 上; 
  down 下;
*/
```

- 相机速度旋转

```javascript
const res = await App.CameraControl.Rotate({
  direction: "right",
  velocity: 10,
});

console.log(res);
```

- 参数说明：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| direction | string | 是 | up/down/left/right | 旋转方向 |
| velocity | number | 是 | - | 速度(单位: 米/秒) |

- 相机角度旋转

```javascript
await App.CameraControl.Rotate({
  direction: 'right', //旋转方向
  angle: 20, //角度
  velocity: 10 //速度(单位: 米/秒)
});
// direction: up; down; left; right
  
```

- 相机围绕目标旋转

```javascript
const jsondata = {
  "targetPosition": [121.53148991,31.2427778,57],
  "rotation": {
    "pitch": -25, //俯仰角(-90~0)
    "yaw": 0, //偏航角(-180~180; 0:东; 90:南; -90:北)
  },
  "distance": 3000, //距离(单位:米)
  "flyTime": 1 //过渡时长(单位:秒)
}
await App.CameraControl.FlyTo(jsondata)
await wait(1500);
// 先飞到某个地方，然后再旋转
const res = await App.CameraControl.Around({
  direction: 'clockwise', //旋转方向
  velocity: 10 //速度(单位: 米/秒)
});
// direction: clockwise 顺时针; anticlockwise 逆时针


```

- 停止移动、旋转

```javascript
await App.CameraControl.Stop();
```

- 数字人漫游（PlayEntityRoam）

```javascript
const jsondata = {
  followPitch: -20, // 跟随俯仰角
  followDistance: 500, // 跟随距离
  forwardSpeed: 600, // 前进速度
  rotateSpeed: 100, // 旋转速度
  enableSwitch: true, // 是否允许切换
  enableCollision: true, // 是否开启碰撞
  forwardClip: 'run', // 前进动画剪辑
  accelerateClip: 'sprint', // 加速动画剪辑
  jumpClip: 'jump' // 跳跃动画剪辑
};

await App.CameraControl.PlayEntityRoam(jsondata);
```

- 停止数字人漫游

```javascript
await App.CameraControl.StopEntityRoam();
```

## 条目：相机Step行为（id: 1347）

- 相机step移动

```javascript
const res = await App.CameraControl.CameraStepMove({
  moveDirection: "E_Forward", // 移动方向
  step: 0.5, //速度的倍率 -1 ~ 1
  bContinuous: true, //是否连续
});

console.log(res);


/*
  moveDirection: 移动方向
  E_Forward: 前;
  E_Backward: 后;
  E_Left: 左;
  E_Right: 右;
  E_Up: 上;
  E_Down: 下
*/
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| moveDirection | string | 是 | E_Forward/E_Backward/E_Left/E_Right/E_Up/E_Down | E_Forward: 前; E_Backward: 后; E_Left: 左; E_Right: 右; E_Up: 上; E_Down: 下 |
| step | number | 是 | [-1~1] | 速度的倍率 |
| bContinuous | boolean | 是 | true/false | 是否连续 |

- 相机step旋转

```javascript
const res = await App.CameraControl.CameraStepRotate({
  rotateDirection: 'E_Pitch', //E_Pitch: 俯仰角, E_Yaw: 偏航角
  step: 0.5, //速度的倍率 -1 ~ 1
  bContinuous: true //是否连续
});

console.log(res);
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| rotateDirection | string | 是 | E_Pitch/E_Yaw | E_Pitch: 俯仰角; E_Yaw: 偏航角 |
| step | number | 是 | [-1~1] | 速度的倍率 |
| bContinuous | boolean | 是 | true/false | 是否连续 |

- 相机step缩放

```javascript
const res = await App.CameraControl.CameraStepZoom({
  step: 0.5, //速度的倍率 -1 ~ 1
  bContinuous: true //是否连续
});

console.log(res);
```

- 参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| step | number | 是 | [-1~1] | 速度的倍率; (正数放大视野; 负数缩小视野) |
| bContinuous | boolean | 是 | true/false | 是否连续 |

- 停止移动、旋转、缩放

```javascript
await App.CameraControl.StopCameraStepUpdate();
```

## 条目：相机聚焦行为（id: 1348）

- 相机聚焦到坐标点

```javascript
const jsondata = {
    "targetPosition": [121.48533665,31.24164246,30],
    "rotation": {
        "pitch": -30, //俯仰角, 参考(-90~0)
        "yaw": 0, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
    },
    "distance": 500, //距离(单位:米)
    "flyTime": 1 //过渡时长(单位:秒)
}

await App.CameraControl.FlyTo(jsondata)
```

- 参数描述：

| 参数 | 是否必填 | 默认值 | 备注 |
|------|----------|--------|------|
| targetPosition | 是 | 无 | 位置 |
| rotation | 否 | pitch: -30, yaw: 0 | 旋转角度 |
| distance | 否 | 10 | 距离 |
| flyTime | 否 | 1 | 镜头飞行时间 |

- 相机聚焦nodeId单体

- AESTiles底板（自动生成底板）整体为一个实体（EID），AES底板上的每个单体有不重复的nodeId。

```javascript
const jsondata = {
  // "entity": entity, // 默认是AESTiles对象，如果对象是Instance是必填
  "nodeIds": ['895874688','882098004'], // 实体 nodeIds
  "rotation": {
    "pitch": -30, // 俯仰角(-90~0)
    "yaw": 0 // 偏航角(-180~180; 0:东; 90:南; -90:北)
  },
  "distanceFactor": 0.4, //距离(单位:米)
  "flyTime": 1 //过渡时长(单位:秒)
}
// 如果entity对象是Instance
// const res = await App.CameraControl.FocusToNodes(jsondata, "Instance");
const res = await App.CameraControl.FocusToNodes(jsondata);
console.log(res);

/*
* @param {*} jsondata - 聚焦节点的JSON数据；
* @param {type} string- 可选参数，默认为Tiles。当设置type是Instance时，entity必须传Instance所属的Entity对象；当type设置Tiles时，entity为当前AESTiles的对象，也可以不填；当type设置Project时，entity为当前项目的Project对象，也可以不填；
*/
```

- 相机聚焦到实体

- 各类覆盖物、用户模型、官方静态模型、官方骨骼模型等都为实体概念。

```javascript
const jsondata = {
  rotation: {
    pitch: -30, //俯仰角, 参考(-90~0)
    yaw: 0, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
  },
  distanceFactor: 0.4, //参数范围[0.1~1]; 实体占满屏幕百分比
  flyTime: 1, //过渡时长(单位:秒)
  entity: [pathObject], //实体对象
};

const res = await App.CameraControl.Focus(jsondata);
console.log(res);
// 出参: { success: boolean, message: string }
```

- 按类型聚焦实体

```javascript
await App.CameraControl.FocusToAll({
  types: ["Poi", "Path"], // 实体类型
  bFilterForExclude: false, // 是否排除指定的类型
});


// types (注意大小写)
/*
  RealTimeVideo  实时视频
  Window  窗口
  Poi  POI
  Particle  特效
  Text3D  3D文字
  Viewshed  可视域
  Path  路径
  Parabola  迁徙图
  Range  区域轮廓
  HeatMap  热力图
  ColumnarHeatMap  柱状热力图
  SpaceHeatMap  点云热力图
  RoadHeatMap  路径热力图
*/
```

- 聚焦全部实体

```javascript
await App.CameraControl.FocusToAll();
```

- 相机跟随实体

```javascript
const jsondata = {
  followRotation: {
    pitch: -20, //俯仰角, 参考(-90~0)
    yaw: 20, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
  },
  useRelativeRotation: true, //相对实体进行offset
  distance: 200,
  bFPS: true, //true 第一人称视角/false 第三人称视角
  entity: followParticle, //实体对象
};

await App.CameraControl.Follow(jsondata);
```

- 停止相机跟随

```javascript
await App.CameraControl.Stop();
```

---

## 条目：相机机位（Camera 对象）（id: 1348-ext）

- Camera 对象（机位预设）

```javascript
// 创建机位对象
const cameraObj = new App.Camera({
  location: [121.4853, 31.2384, 500],
  rotation: { pitch: -30, yaw: 0 },
  locationLimit: [],
  pitchLimit: [-90, 0],
  yawLimit: [-180, 180],
  viewDistanceLimit: [0, 10000],
  fieldOfView: 90,
  controlMode: 'RTS',
  entityName: '机位1',
  customId: 'custom_id_1',
  customData: { data: 'my_data' }
});

// 添加到场景
const res = await App.Scene.Add(cameraObj);
console.log(res);
// 出参: { success: boolean, message: string, result: { object: CameraObject } }

// 应用机位（飞行到该机位）
const applyRes = await App.CameraControl.Apply(cameraObj, 1); // 第二参数为 flyTime（秒）
console.log(applyRes);
// 出参: { success: boolean, message: string }

// 读取/设置自定义字段
// 方式一：
// console.log(cameraObj.entityName);
// 方式二：
const nameRes = await cameraObj.GetEntityName(); // { success: true, result: '机位1' }

// 方式一：
// console.log(cameraObj.customId);
// 方式二：
const idRes = await cameraObj.GetCustomId();

// 方式一：
// console.log(cameraObj.customData);
// 方式二：
const dataRes = await cameraObj.GetCustomData();

// 方式一：
// console.log(cameraObj.parentEid);
// 方式二：
const parentRes = await cameraObj.GetParentEid();

// 获取机位信息
const getRes = await cameraObj.Get();
console.log(getRes);

// 更新机位
await cameraObj.Update({
  location: [121.4900, 31.2400, 600],
  rotation: { pitch: -25, yaw: 45 }
});
```

- CameraStart 对象（初始相机）

```javascript
// 获取初始相机对象
const startRes = await App.Scene.GetCameraStart();
const cameraStart = startRes.result.object;

// 读取初始相机属性
console.log(cameraStart.location);   // 初始位置 [lng, lat, z]
console.log(cameraStart.rotation);   // 初始朝向 { pitch, yaw }

// 更新初始相机（修改场景默认视角）
await cameraStart.Update({
  location: [121.4853, 31.2384, 800],
  rotation: { pitch: -40, yaw: 0 }
});
```

---

## 条目：相机漫游（id: 1349）

- 相机漫游

```javascript
const jsondata = {
  frames: [
    {
      location: [121.49067713, 31.11991912, 300],
      rotation: {
        pitch: -25, //俯仰角, 参考(-90~0)
        yaw: 0, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
      },
      time: 20, //镜头到下一帧的时间(单位:秒)
    },
    {
      location: [121.49060113, 31.114312, 300],
      rotation: {
        pitch: -15,
        yaw: 80,
      },
      time: 20,
    },
    {
      location: [121.49687008, 31.13777349, 300],
      rotation: {
        pitch: -20,
        yaw: 160,
      },
      time: 15,
    },
    {
      location: [121.49441582, 31.13728981, 300],
      rotation: {
        // 最后一帧 镜头停止后的姿态，不需要写时间
        pitch: -15,
        yaw: 240,
      },
    },
  ],
};

const entityObj = new App.CameraRoam(jsondata);
const res = await App.Scene.Add(entityObj);

// 开启相机漫游
const args = {
  progressRatio: 0, //镜头位置切换到整体漫游比例,范围[0,1]
  speedRatio: 1, //相机漫游移动倍率
  bReverse: false, //是否反向
};

await App.CameraControl.PlayRoam(entityObj, args);
```

- CameraRoam参数：

| 参数 | 类型 | 必填 | 默认值 | 备注 |
|------|------|------|--------|------|
| bAutoRotation | boolean | 否 | false | 镜头是否自动对准下一个目标点 |
| bResetAfterFinished | boolean | 否 | true | 镜头结束时是否重置 |
| frames[].location | Array | 否 | 无 | 漫游的动画帧 |
| frames[].rotation | {pitch: number, yaw: number} | 否 | 无 | 镜头角度; pitch: 俯仰角(-90~0); yaw: 偏航角(-180~180; 0:东; 90:南; -90:北) |
| frames[].time | number | 否 | 无 | 相机到下一帧的时间(单位:秒); 最后一帧不需要写时间，因为时间是帧与帧之间的 |

- PlayRoam参数：

| 参数 | 类型 | 必填 | 取值范围 | 备注 |
|------|------|------|----------|------|
| progressRatio | number | 否 | [0,1] | 镜头位置切换到整体漫游比例 |
| speedRatio | number | 否 | - | 相机漫游移动倍率 |
| bReverse | boolean | 否 | - | 是否反向 |

- 暂停漫游

```javascript
const res = await App.CameraControl.PauseRoam({
      bEnableRotatingOnPause: false,
      bEnableZoomingOnPause: false
    });
console.log(res);
```

- 参数：

| 参数 | 类型 | 必填 | 默认值 | 备注 |
|------|------|------|--------|------|
| bEnableRotatingOnPause | boolean | 否 | false | 是否允许暂停时旋转镜头 (>=1.15.1) |
| bEnableZoomingOnPause | boolean | 否 | false | 是否允许暂停时缩放镜头 (>=1.15.1) |

- 继续漫游

```javascript
const res = await App.CameraControl.PlayRoam();
console.log(res);
```

- 停止漫游

```javascript
const res = await App.CameraControl.StopRoam();
console.log(res);
```

- 更新相机漫游

```javascript
const jsondata = {
  "frames": [
    {
      "location": [121.48216421, 31.10446008, 300],
      "rotation": {
        "pitch": -25, //俯仰角, 参考(-90~0)
        "yaw": -90, //偏航角, 参考(-180~180; 0:东; 90:南; -90:北)
      },
      "time": 20 //镜头到下一帧的时间(单位:秒)
    },
    {
      "location": [121.48405533, 31.12949274, 300],
      "rotation": {
        "pitch": -15,
        "yaw": 0
      },
      "time": 20
    },
    {
      "location": [121.48880933, 31.13466789, 300],
      "rotation": {
        "pitch": -25,
        "yaw": 90
      }
    }
  ]
}

// roamObj 为 new App.CameraRoam({...}) 时创建的对象;
await roamObj.Update(jsondata);

// 开启相机漫游
const args = {
  "state": "play", //play:漫游; pause:暂停; stop:结束
  "progressRatio": 0, //镜头位置切换到整体漫游比例,范围[0,1]
  "speedRatio": 1, //相机漫游移动倍率
  "bReverse": false //是否反向
}

await App.CameraControl.PlayCameraRoam(roamObj, args);
```

- 获取镜头漫游进度

```javascript
const res = await App.CameraControl.GetCameraRoamingInfo(obj); // 漫游对象
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      progressRatio: 0.45,   // 当前漫游进度比例 [0,1]
      isPlaying: true,       // 是否正在播放
      isPaused: false        // 是否已暂停
    }
  }
*/
```

- 参数：

| 参数 | 类型 | 必填 | 默认值 | 备注 |
|------|------|------|--------|------|
| obj | object | 是 | 无 | CameraRoam对象 |

- 获取相机漫游信息

```javascript
// roamObj 为 new App.CameraRoam({...}) 时创建的对象;
const _res = await roamObj.Get();
console.log(_res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      object: {
        frames: [...],
        bAutoRotation: false,
        bResetAfterFinished: true
      }
    }
  }
*/
```

- 停止相机漫游

```javascript
await App.CameraControl.Stop();
```

