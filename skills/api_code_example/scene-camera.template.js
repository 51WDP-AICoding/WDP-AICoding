/**
 * scene-camera.template.js
 * 用途：相机信息读取、飞行、聚焦。
 * 版本：WDP API 2.2.1
 */

/**
 * @param {Object} app WdpApi 实例
 */
async function getCameraInfoSafe(app) {
  if (!app) throw new Error('app is required');
  return app.CameraControl.GetCameraInfo();
}

/**
 * @param {Object} app WdpApi 实例
 * @param {Object} flyConfig
 * @param {number[]} flyConfig.targetPosition [lon,lat,height]
 * @param {{pitch:number,yaw:number}} flyConfig.rotation
 * @param {number} flyConfig.distance 距离
 * @param {number} flyConfig.flyTime 飞行时长(秒)
 */
async function flyToSafe(app, flyConfig) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(flyConfig?.targetPosition)) {
    throw new Error('flyConfig.targetPosition is required');
  }
  return app.CameraControl.FlyTo(flyConfig);
}

/**
 * @param {Object} app WdpApi 实例
 * @param {Object} focusConfig
 * @param {Object[]} focusConfig.entity 目标实体数组
 * @param {{pitch:number,yaw:number}} [focusConfig.rotation]
 * @param {number} [focusConfig.distanceFactor]
 * @param {number} [focusConfig.flyTime]
 */
async function focusSafe(app, focusConfig) {
  if (!app) throw new Error('app is required');
  return app.CameraControl.Focus(focusConfig);
}

// 使用示例
// const cameraInfo = await getCameraInfoSafe(App);
// console.log(cameraInfo);
// await flyToSafe(App, {
//   targetPosition: [121.5, 31.2, 300],
//   rotation: { pitch: -20, yaw: 110 },
//   distance: 500,
//   flyTime: 1
// });
