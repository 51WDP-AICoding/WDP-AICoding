/**
 * initialize-scene.template.js
 * 用途：WDP 场景初始化、启动、场景 ready 门禁。
 * 版本：WDP API 2.2.1
 */

let App = null;

/**
 * @param {Object} rendererConfig
 * @param {string} rendererConfig.id 渲染容器 id，默认 player
 * @param {string} rendererConfig.url 渲染服务地址
 * @param {string} rendererConfig.order 32 位十六进制口令
 * @param {number[]} [rendererConfig.resolution] 分辨率 [width, height]
 * @param {string} [rendererConfig.debugMode] 调试模式：normal/debug/none
 * @param {Object} [rendererConfig.keyboard] 键盘配置
 */
function initWdp(rendererConfig) {
  if (typeof WdpApi === 'undefined') {
    throw new Error('WdpApi is not defined');
  }

  const cfg = {
    id: rendererConfig.id || 'player',
    url: rendererConfig.url,
    order: rendererConfig.order,
    resolution: rendererConfig.resolution || [1920, 1080],
    debugMode: rendererConfig.debugMode || 'normal',
    keyboard: rendererConfig.keyboard || { normal: false, func: false }
  };

  App = new WdpApi(cfg);
  return App;
}

/**
 * @param {Function} onSceneReady 场景 ready 回调
 */
async function startRendererWithGate(onSceneReady) {
  if (!App) throw new Error('App is not initialized');

  const startRes = await App.Renderer.Start();
  if (!startRes.success) {
    throw new Error(`Renderer.Start failed: ${startRes.message || 'unknown'}`);
  }

  await App.Renderer.RegisterSceneEvent([
    {
      name: 'OnWdpSceneIsReady',
      func: async (res) => {
        const progress = res?.result?.progress || 0;
        if (progress === 100) {
          await onSceneReady?.(res);
        }
      }
    }
  ]);
}

// 使用示例
// const renderer = window.projectGlobalConfigs.renderer;
// initWdp({
//   id: 'player',
//   url: renderer.env.url,
//   order: renderer.env.order
// });
// await startRendererWithGate(async () => {
//   console.log('scene ready');
//   // TODO: 进入业务初始化
// });
