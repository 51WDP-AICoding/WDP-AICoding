/**
 * cluster.template.js
 * 用途：点聚合数据部署、效果配置、周边搜索。
 * 版本：WDP API 2.2.1（私有化/lite）
 */

async function clusterCreateSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.Create(payload);
}

async function clusterUpdateSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.Update(payload);
}

async function clusterDeleteSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.Delete(payload);
}

async function clusterStartSafe(app, opt) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.Start(opt);
}

async function clusterModifySafe(app, opt) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.Modify(opt);
}

async function clusterEndSafe(app) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.End();
}

async function clusterSearchByPointSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.SearchByPoint(payload);
}

async function clusterSearchByLineSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.SearchByLine(payload);
}

async function clusterSearchByAreaSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.DataModel.Cluster.SearchByArea(payload);
}
