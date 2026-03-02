/**
 * BIM Core Operations Template (2.1.1 first batch)
 * Usage:
 * 1) replace assetId / seedId with real values
 * 2) call loadBimModel() after renderer and scene are ready
 * 3) use returned entityObj for follow-up operations
 */

export async function getBimModelList(App) {
  const list = await App.DCP.GetModelList();
  console.log("[BIM] model list:", list);
  return list;
}

export async function loadBimModel(App, {
  assetId,
  seedId,
  noFindHandle = true
}) {
  if (!assetId || !seedId) {
    throw new Error("[BIM] assetId and seedId are required");
  }

  const entityObj = new App.Hierarchy({
    assetId,
    seedId,
    noFindHandle
  });

  await App.Scene.Add(entityObj);
  console.log("[BIM] model loaded:", { assetId, seedId });
  return entityObj;
}

export async function runBimCoreDemo(App, params) {
  await getBimModelList(App);
  const entityObj = await loadBimModel(App, params);
  return entityObj;
}
