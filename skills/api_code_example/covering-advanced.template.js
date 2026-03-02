/**
 * Covering Advanced Template
 * Focus: HeatMap / Path / Bound / Scene.Create(s) / ClearByTypes
 */

export async function createCoverings(app, jsonData) {
  return app.Scene.Creates(jsonData);
}

export async function clearCoverings(app, types = ["Poi", "Window", "HeatMap", "Path", "Bound"]) {
  return app.Scene.ClearByTypes(types);
}

export async function addHeatMap(app, options) {
  const heatmap = new app.HeatMap(options);
  return app.Scene.Add(heatmap);
}

export async function addPath(app, options) {
  const path = new app.Path(options);
  return app.Scene.Add(path);
}

export async function addBound(app, options) {
  const bound = new app.Bound(options);
  return app.Scene.Add(bound);
}
