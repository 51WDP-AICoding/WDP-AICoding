/**
 * general-event-registration.template.js
 * 用途：统一注册通用事件，避免重复监听。
 * 版本：WDP API 2.2.1
 */

/**
 * @param {Object} app WdpApi 实例
 * @param {Object} handlers 事件处理器集合
 * @param {Function} [handlers.onVideoReady]
 * @param {Function} [handlers.onRenderCloudConnected]
 * @param {Function} [handlers.onStopedRenderCloud]
 */
async function registerGeneralEvents(app, handlers = {}) {
  if (!app) throw new Error('app is required');

  await app.Renderer.RegisterEvent([
    {
      name: 'onVideoReady',
      func: (res) => {
        try {
          handlers.onVideoReady?.(res);
          console.log('[event] onVideoReady', { ok: true });
        } catch (err) {
          console.error('[event] onVideoReady failed', err);
        }
      }
    },
    {
      name: 'onRenderCloudConnected',
      func: (res) => {
        try {
          handlers.onRenderCloudConnected?.(res);
          console.log('[event] onRenderCloudConnected', { ok: true });
        } catch (err) {
          console.error('[event] onRenderCloudConnected failed', err);
        }
      }
    },
    {
      name: 'onStopedRenderCloud',
      func: (reason) => {
        try {
          handlers.onStopedRenderCloud?.(reason);
          console.warn('[event] onStopedRenderCloud', { reason });
        } catch (err) {
          console.error('[event] onStopedRenderCloud failed', err);
        }
      }
    }
  ]);
}

// 使用示例
// await registerGeneralEvents(App, {
//   onVideoReady: () => {
//     document.getElementById('loading')?.remove();
//   }
// });
