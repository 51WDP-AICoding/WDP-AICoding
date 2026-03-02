/**
 * gis-core-operations.template.js
 * 用途：GisApi 插件安装、GeoLayer 加载、图层更新/显隐/偏移/高亮。
 * 版本：GIS API 2.1.0
 */

async function installGisApiSafe(app, GisApi) {
  if (!app) throw new Error('app is required');
  if (!GisApi) throw new Error('GisApi is required');
  return app.Plugin.Install(GisApi);
}

async function getGisVersionSafe(app) {
  if (!app) throw new Error('app is required');
  return app.gis.GetVersion();
}

function createGeoLayerSafe(app, options) {
  if (!app) throw new Error('app is required');
  return new app.GeoLayer(options);
}

async function addGeoLayerSafe(app, geoLayerObj) {
  if (!app) throw new Error('app is required');
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return app.Scene.Add(geoLayerObj);
}

async function setGeoLayerVisibleSafe(geoLayerObj, visible) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.SetLayerVisible(visible);
}

async function setGeoLayerOffsetSafe(geoLayerObj, geoLayerOffset) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.SetGeoLayerOffset({ geoLayerOffset });
}

async function getGeoLayerOffsetSafe(geoLayerObj) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.GetGeoLayerOffset();
}

async function setGeoLayerRotationSafe(geoLayerObj, GeoLayerRotation) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.SetGeoLayerRotation({ GeoLayerRotation });
}

async function updateGeoLayerSafe(geoLayerObj, patch) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.Update(patch);
}

async function setGeoLayerFeatureHighlightSafe(geoLayerObj, payload) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.SetGeoLayerFeatureHighlight(payload);
}

async function focusGeoLayerSafe(app, geoLayerObj, rotation, distanceFactor, flyTime) {
  if (!app) throw new Error('app is required');
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return app.CameraControl.Focus({
    rotation,
    distanceFactor,
    flyTime,
    entity: [geoLayerObj],
  });
}

async function deleteGeoLayerSafe(geoLayerObj) {
  if (!geoLayerObj) throw new Error('geoLayerObj is required');
  return geoLayerObj.Delete();
}

async function removeAllGeoLayersSafe(app) {
  if (!app) throw new Error('app is required');
  return app.gis.RemoveAll();
}
