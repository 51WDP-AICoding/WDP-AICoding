/**
 * material-settings.template.js
 * 用途：模型材质替换与高亮。
 * 版本：WDP API 2.2.1
 */

async function createMaterialSafe(app, seedId) {
  if (!app) throw new Error('app is required');
  const material = new app.Material({ seedId });
  return app.Scene.Add(material);
}

async function startPickerMaterialSafe(app, continuous, handler) {
  if (!app) throw new Error('app is required');
  return app.Tools.PickerMaterial.Start({
    bContinuous: continuous,
    func: handler
  });
}

async function getPickerMaterialsSafe(app) {
  if (!app) throw new Error('app is required');
  return app.Tools.PickerMaterial.GetMaterials();
}

async function endPickerMaterialSafe(app) {
  if (!app) throw new Error('app is required');
  return app.Tools.PickerMaterial.End();
}

async function setModelMaterialSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Material.SetModelMaterial(payload);
}

async function applyMaterialSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Material.Apply(payload);
}

async function setEntitySlotsHighlightSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Material.SetEntitySlotsHighlight(payload);
}
