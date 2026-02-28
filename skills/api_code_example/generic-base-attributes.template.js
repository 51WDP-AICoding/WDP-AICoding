/**
 * generic-base-attributes.template.js
 * 用途：通用基础属性读取/更新（模式化封装）。
 * 版本：WDP API 2.2.1
 */

/**
 * 说明：不同项目“基础属性”接口名称可能不同。
 * 请按官方文档将 read/update 映射到具体 API。
 */

/**
 * @param {Function} reader 读取函数
 * @param {Object} params 读取参数
 */
async function readBaseAttributes(reader, params = {}) {
  if (typeof reader !== 'function') {
    throw new Error('reader must be a function');
  }
  const res = await reader(params);
  return res;
}

/**
 * @param {Function} updater 更新函数
 * @param {Object} params 更新参数
 */
async function updateBaseAttributes(updater, params = {}) {
  if (typeof updater !== 'function') {
    throw new Error('updater must be a function');
  }
  const res = await updater(params);
  return res;
}

/**
 * 先读后改模板
 * @param {Function} reader
 * @param {Function} updater
 * @param {Object} readParams
 * @param {Object} updateParams
 */
async function readThenUpdate(reader, updater, readParams, updateParams) {
  const before = await readBaseAttributes(reader, readParams);
  const update = await updateBaseAttributes(updater, updateParams);
  const after = await readBaseAttributes(reader, readParams);

  return { before, update, after };
}

// 使用示例（伪代码）
// const result = await readThenUpdate(
//   (p) => App.SomeModule.GetBaseAttributes(p),
//   (p) => App.SomeModule.UpdateBaseAttributes(p),
//   { id: 'target' },
//   { id: 'target', visible: true }
// );
// console.log(result);
