let App = null;
let sceneReady = false;

const ui = {
  loading: document.getElementById('loading'),
  loadingText: document.getElementById('loadingText'),
  focusBtn: document.getElementById('focusBtn'),
  status: document.getElementById('status'),
  log: document.getElementById('log')
};

function log(message, payload) {
  const ts = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  let payloadText = '';
  if (payload !== undefined) {
    try {
      const seen = new WeakSet();
      payloadText = JSON.stringify(payload, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        return value;
      });
    } catch (e) {
      payloadText = String(payload);
    }
  }

  const line = payload !== undefined ? `[${ts}] ${message} ${payloadText}` : `[${ts}] ${message}`;
  ui.log.textContent = `${line}\n${ui.log.textContent}`;
  console.log(message, payload || '');
}

function setStatus(text) {
  ui.status.textContent = `状态：${text}`;
}

function validateConfig(config) {
  if (!config?.env?.order || !/^[a-fA-F0-9]{32}$/.test(config.env.order)) {
    throw new Error('渲染口令无效，必须是 32 位十六进制字符串');
  }
  if (!document.getElementById(config.id || 'player')) {
    throw new Error('渲染容器不存在');
  }
}

function initWdp() {
  if (typeof WdpApi === 'undefined') {
    throw new Error('WdpApi is not defined，请检查 SDK 加载');
  }

  const config = window.projectGlobalConfigs.renderer;
  validateConfig(config);

  App = new WdpApi({
    id: config.id,
    url: config.env.url,
    order: config.env.order,
    resolution: config.resolution,
    rendererMode: config.rendererMode,
    debugMode: config.debugMode,
    keyboard: config.keyboard,
    prefix: config.prefix
  });

  log('WdpApi 实例创建完成', { id: config.id, url: config.env.url });
}

async function registerEvents() {
  await App.Renderer.RegisterEvent([
    {
      name: 'onVideoReady',
      func: () => {
        ui.loading.style.display = 'none';
        setStatus('视频流已就绪，可操作');
        log('onVideoReady：视频流连接成功');
      }
    },
    {
      name: 'onRenderCloudConnected',
      func: () => {
        setStatus('云渲染已连接');
        log('onRenderCloudConnected');
      }
    },
    {
      name: 'onStopedRenderCloud',
      func: (reason) => {
        setStatus('渲染服务已中断');
        ui.focusBtn.disabled = true;
        log('onStopedRenderCloud', { reason });
      }
    }
  ]);

  await App.Renderer.RegisterSceneEvent([
    {
      name: 'OnWdpSceneIsReady',
      func: async (res) => {
        const progress = res?.result?.progress || 0;
        ui.loadingText.textContent = `场景加载中：${progress}%`;
        if (progress === 100 && !sceneReady) {
          sceneReady = true;
          ui.focusBtn.disabled = false;
          setStatus('场景已就绪，等待按钮触发');
          log('OnWdpSceneIsReady 100%');
        }
      }
    }
  ]);
}

async function startRenderer() {
  await App.System.SetTimeoutTime(30000);
  setStatus('启动渲染器中');
  const res = await App.Renderer.Start();
  if (!res.success) {
    throw new Error(`Renderer.Start 失败: ${res.message || 'unknown'}`);
  }
  log('Renderer.Start 成功');
}

async function focusToTargetByEid() {
  if (!sceneReady) {
    throw new Error('场景未就绪，无法执行聚焦');
  }

  const target = window.projectGlobalConfigs.testTarget;
  const eid = target.eid;

  setStatus('获取目标实体中');
  log('开始获取实体', { eid });

  const getRes = await App.Scene.GetByEids([eid]);
  if (!getRes.success || !Array.isArray(getRes.result) || getRes.result.length === 0) {
    throw new Error('GetByEids 未返回有效实体');
  }

  const entity = getRes.result[0];

  setStatus('执行镜头飞跃聚焦');
  const focusPayload = {
    rotation: target.focus.rotation,
    distanceFactor: target.focus.distanceFactor,
    flyTime: target.focus.flyTime,
    entity: [entity]
  };

  const focusRes = await App.CameraControl.Focus(focusPayload);
  if (!focusRes.success) {
    throw new Error(`CameraControl.Focus 失败: ${focusRes.message || 'unknown'}`);
  }

  setStatus('聚焦完成');
  log('聚焦成功', { eid, flyTime: target.focus.flyTime, distanceFactor: target.focus.distanceFactor });
}

async function bootstrap() {
  try {
    setStatus('初始化中');
    initWdp();
    await startRenderer();
    await registerEvents();
  } catch (err) {
    setStatus('初始化失败');
    ui.loadingText.textContent = '初始化失败，请查看日志';
    log('初始化失败', { error: err.message });
    alert(err.message);
  }
}

ui.focusBtn.addEventListener('click', async () => {
  try {
    ui.focusBtn.disabled = true;
    await focusToTargetByEid();
  } catch (err) {
    log('按钮动作失败', { error: err.message });
    alert(err.message);
  } finally {
    ui.focusBtn.disabled = false;
  }
});

window.addEventListener('load', bootstrap);

