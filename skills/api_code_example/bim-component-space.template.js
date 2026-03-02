/**
 * BIM Component + Space Template (2.1.1)
 * Source: official-bim-full.md
 */

function assertEntity(entity) {
  if (!entity) throw new Error("[BIM] entity is required");
}

export async function getNodeTree(entity) {
  assertEntity(entity);
  return entity.GetNodeTree();
}

export async function searchNodeTree(entity, keyword) {
  assertEntity(entity);
  return entity.GetNodeTreeBySearch(keyword);
}

export async function searchNodeList(entity, keyword) {
  assertEntity(entity);
  return entity.GetNodeListBySearch(keyword);
}

export async function getNodeInfo(entity, nodeId) {
  assertEntity(entity);
  return entity.GetNodeInfo(nodeId);
}

export async function getNodeTreeById(entity, nodeId) {
  assertEntity(entity);
  return entity.GetNodeTreeById(nodeId);
}

export async function getNodeParentId(entity, nodeId) {
  assertEntity(entity);
  return entity.GetNodeParentId(nodeId);
}

export async function focusNode(entity, nodeId, jsondata = {}) {
  assertEntity(entity);
  return entity.SetNodeFocus(nodeId, jsondata);
}

export async function setNodeVisibility(entity, nodeId, visible) {
  assertEntity(entity);
  return entity.SetNodeVisibility(nodeId, visible);
}

export async function setOtherNodesVisibility(entity, nodeIds, visible) {
  assertEntity(entity);
  return entity.SetOtherNodesVisibility(nodeIds, visible);
}

export async function showAllNodes(entity) {
  assertEntity(entity);
  return entity.SetNodeShowAll();
}

export async function setNodeHighlight(entity, nodeId, visible, cleanOthers, style) {
  assertEntity(entity);
  return entity.SetNodeHighLight(nodeId, visible, cleanOthers, style);
}

export async function getNodeCoord(entity, payload) {
  assertEntity(entity);
  return entity.GetNodeCoord(payload);
}

export async function setNodeLocation(entity, nodeId, location) {
  assertEntity(entity);
  return entity.SetNodeLocation(nodeId, location);
}

export async function setRoomHighlight(entity, payload) {
  assertEntity(entity);
  return entity.SetRoomHighLight(payload);
}

export async function setRoomFocus(entity, payload) {
  assertEntity(entity);
  return entity.SetRoomFocus(payload);
}
