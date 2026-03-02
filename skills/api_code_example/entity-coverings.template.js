/**
 * entity-coverings.template.js
 * 用途：实体覆盖物（实时视频/Window/POI）及 Web 组件（VideoUI/WindowUI/PoiUI）通用调用。
 * 版本：WDP API 2.2.1
 */

async function addRealTimeVideoSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.RealTimeVideo(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addWindowSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Window(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addPoiSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Poi(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addParticleSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Particle(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addEffectsSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Effects(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addLightSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Light(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addText3DSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Text3D(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addViewshedSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Viewshed(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addPathSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Path(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addParabolaSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Parabola(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addRangeSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Range(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addHeatMapSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.HeatMap(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addColumnarHeatMapSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.ColumnarHeatMap(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addSpaceHeatMapSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.SpaceHeatMap(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addRoadHeatMapSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.RoadHeatMap(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addMeshHeatMapSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.MeshHeatMap(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addRasterSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.Raster(payload);
  return app.Scene.Add(obj, addOptions);
}

async function addHighlightAreaSafe(app, payload, addOptions) {
  if (!app) throw new Error('app is required');
  const obj = new app.HighlightArea(payload);
  return app.Scene.Add(obj, addOptions);
}

function addVideoUISafe(app, payload) {
  if (!app) throw new Error('app is required');
  const obj = new app.VideoUI(payload);
  return app.Component.VideoUI.Add([obj]);
}

function addWindowUISafe(app, payload) {
  if (!app) throw new Error('app is required');
  const obj = new app.WindowUI(payload);
  return app.Component.WindowUI.Add([obj]);
}

function addPoiUISafe(app, payload) {
  if (!app) throw new Error('app is required');
  const obj = new app.PoiUI(payload);
  return app.Component.PoiUI.Add([obj]);
}

async function registerWebEventSafe(app, handler) {
  if (!app) throw new Error('app is required');
  return app.Renderer.RegisterSceneEvent([
    {
      name: 'OnWebJSEvent',
      func: handler
    }
  ]);
}
