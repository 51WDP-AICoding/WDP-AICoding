/**
 * BIM Model Behaviors Template (2.1.1)
 * Source: official-bim-full.md
 * Note: call these after model entity is ready.
 */

function assertEntity(entity) {
  if (!entity) throw new Error("[BIM] entity is required");
}

export async function activateModel(entity, active = true) {
  assertEntity(entity);
  return entity.Active(active);
}

export async function moveModel(entity, location) {
  assertEntity(entity);
  return entity.SetLocation(location);
}

export async function rotateModel(entity, rotator) {
  assertEntity(entity);
  return entity.SetRotator(rotator);
}

export async function scaleModel(entity, scale3d) {
  assertEntity(entity);
  return entity.SetScale3d(scale3d);
}

export async function focusModel(entity) {
  assertEntity(entity);
  return entity.SetFocus();
}

export async function setModelVisible(entity, visible) {
  assertEntity(entity);
  return entity.SetVisible(visible);
}

export async function groundModel(entity) {
  assertEntity(entity);
  return entity.SetGround();
}

export async function startModelSection(entity, options) {
  assertEntity(entity);
  return entity.StartModelSection(options);
}

export async function resetModelSection(entity) {
  assertEntity(entity);
  return entity.ResetModelSection();
}

export async function endModelSection(entity) {
  assertEntity(entity);
  return entity.EndModelSection();
}

export async function startBuildingLayer(entity) {
  assertEntity(entity);
  return entity.StartBuildingLayer();
}

export async function endBuildingLayer(entity) {
  assertEntity(entity);
  return entity.EndBuildingLayer();
}

export async function unloadModel(entity) {
  assertEntity(entity);
  return entity.Delete();
}
