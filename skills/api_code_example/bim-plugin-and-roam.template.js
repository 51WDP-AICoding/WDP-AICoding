/**
 * BIM Plugin + Camera Roam Template
 */

export async function installBimPlugin(app, BimApi) {
  const res = await app.Plugin.Install(BimApi);
  if (!res?.success) {
    throw new Error("[BIM] Plugin.Install failed");
  }
  return res;
}

export async function createCameraRoam(app, roamJson) {
  const entityObj = new app.CameraRoam(roamJson);
  const res = await app.Scene.Add(entityObj);
  if (!res?.success) {
    throw new Error("[BIM] CameraRoam add failed");
  }
  return entityObj;
}

export async function playCameraRoam(app, entityObj, args = { progressRatio: 0, speedRatio: 1, bReverse: false }) {
  return app.CameraControl.PlayRoam(entityObj, args);
}

export async function stopCameraRoam(app) {
  return app.CameraControl.StopRoam();
}
