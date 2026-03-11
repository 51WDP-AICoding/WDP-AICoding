/**
 * function-components.template.js
 * 用途：环境/控件/工具/设置的常用调用包装。
 * 版本：WDP API 2.2.1
 */

async function setSceneTimeSafe(app, time, duration, realtime) {
  if (!app) throw new Error('app is required');
  return app.Environment.SetSkylightTime(time, duration, realtime);
}

async function setSceneWeatherSafe(app, weather, duration, realtime) {
  if (!app) throw new Error('app is required');
  return app.Environment.SetSceneWeather(weather, duration, realtime);
}

// 当天气枚举不明确时，按候选值逐个探测并返回首个可用值。
async function detectSceneWeatherSafe(app, weatherCandidates, duration = 1, realtime = false) {
  if (!app) throw new Error('app is required');
  if (!Array.isArray(weatherCandidates) || weatherCandidates.length === 0) {
    throw new Error('weatherCandidates is required');
  }
  for (const weather of weatherCandidates) {
    const res = await app.Environment.SetSceneWeather(weather, duration, realtime);
    if (res && res.success) {
      return { weather, response: res };
    }
  }
  return { weather: '', response: null };
}

async function setSceneStyleSafe(app, style) {
  if (!app) throw new Error('app is required');
  return app.Scene.SetSceneStyle(style);
}

async function startMiniMapSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.Tools.MiniMap.Start(payload);
}

async function endMiniMapSafe(app) {
  if (!app) throw new Error('app is required');
  return app.Tools.MiniMap.End();
}

async function startCompassSafe(app, payload) {
  if (!app) throw new Error('app is required');
  return app.Tools.Compass.Start(payload);
}

async function setRendererModeSafe(app, mode, resolution) {
  if (!app) throw new Error('app is required');
  return app.Renderer.SetRendererMode(mode, resolution);
}

async function setFrameRateSafe(app, fps) {
  if (!app) throw new Error('app is required');
  return app.Renderer.SetFrameRateLimit(fps);
}

async function setBitrateSafe(app, bitrate) {
  if (!app) throw new Error('app is required');
  return app.Renderer.SetBitrate(bitrate);
}

async function setTimeoutSafe(app, ms) {
  if (!app) throw new Error('app is required');
  return app.System.SetTimeoutTime(ms);
}
