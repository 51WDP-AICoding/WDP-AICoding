/**
 * entity-general-behavior.template.js
 * 用途：实体检索、显隐、删除、落地。
 * 版本：WDP API 2.2.1
 */

async function getByEidsSafe(app, eids) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(eids) || eids.length === 0) {
    throw new Error('eids is required');
  }
  return app.Scene.GetByEids(eids);
}

async function getByTypesSafe(app, types) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(types) || types.length === 0) {
    throw new Error('types is required');
  }
  return app.Scene.GetByTypes(types);
}

async function setVisibleByObjectsSafe(app, objects, visible) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(objects) || objects.length === 0) {
    throw new Error('objects is required');
  }
  return app.Scene.SetVisibleByObjects(objects, visible);
}

async function clearByEidsSafe(app, eids) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(eids) || eids.length === 0) {
    throw new Error('eids is required');
  }
  return app.Scene.ClearByEids(eids);
}

async function snapToSafe(entityObj, coordZRef, coordZOffset) {
  if (!entityObj) throw new Error('entityObj is required');
  return entityObj.SnapTo({
    calculateCoordZ: {
      coordZRef,
      coordZOffset
    }
  });
}

// 示例
// const { result } = await getByTypesSafe(App, ['Particle', 'Path']);
// await setVisibleByObjectsSafe(App, result?.Path || [], false);
