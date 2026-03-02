/**
 * layer-models.template.js
 * 用途：图层/单体控制器 + 静态/骨骼/工程摆放模型通用调用。
 * 版本：WDP API 2.2.1
 */

async function getTilesSafe(app) {
  if (!app) throw new Error('app is required');
  return app.Scene.GetTiles();
}

async function setLayersVisibilitySafe(layerObj, layers, visible) {
  if (!layerObj) throw new Error('layerObj is required');
  return layerObj.SetLayersVisibility({ layers, bVisible: visible });
}

async function setLayersHighlightSafe(layerObj, layers, highlight, styleName) {
  if (!layerObj) throw new Error('layerObj is required');
  return layerObj.SetLayersHighlight({ layers, bHighlight: highlight, styleName });
}

async function setLayersOutlineSafe(layerObj, layers, outline, styleName) {
  if (!layerObj) throw new Error('layerObj is required');
  return layerObj.SetLayersOutline({ layers, bOutline: outline, styleName });
}

async function setNodesVisibilitySafe(targetObj, nodeIds, visible) {
  if (!targetObj) throw new Error('targetObj is required');
  return targetObj.SetNodesVisibility({ nodeIds, bVisible: visible });
}

async function setNodesHighlightSafe(targetObj, nodeIds, highlight, styleName) {
  if (!targetObj) throw new Error('targetObj is required');
  return targetObj.SetNodesHighlight({ nodeIds, bHighlight: highlight, styleName });
}

async function setNodesOutlineSafe(targetObj, nodeIds, outline, styleName) {
  if (!targetObj) throw new Error('targetObj is required');
  return targetObj.SetNodesOutline({ nodeIds, bOutline: outline, styleName });
}

async function getByEidsSafe(app, eids) {
  if (!app) throw new Error('app is required');
  return app.Scene.GetByEids(eids);
}
