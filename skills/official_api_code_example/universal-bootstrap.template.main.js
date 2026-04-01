// ==============================================
// === 插件导入区：根据业务需求取消注释 ===
// ==============================================
// 版本基线：WDP API 2.3.0, BIM API 2.2.0, GIS API 2.1.0
// 插件版本必须与 WDP API 版本兼容，详见各 Skill 文档
import WdpApi from 'wdpapi';
// import BimApi from '@wdp-api/bim-api';  // 使用 BIM 功能时取消注释，并执行 npm install @wdp-api/bim-api@^2.2.0
// import GisApi from '@wdp-api/gis-api';  // 使用 GIS 功能时取消注释，并执行 npm install @wdp-api/gis-api@^2.1.0

// ==============================================
// === 用户配置区：非开发人员请只修改这里的内容 ===
// ==============================================
const WDP_CONFIG = {
    SERVER_URL: '在此填写您的服务器地址(http/https结尾)', // 例: http://192.168.1.100:8888
    ORDER_CODE: '在此填写您的验证口令',                   // 32位十六进制字符串
    TARGET_EID: ''                                        // 可选：默认想操作的模型实体编号
};

// UI 状态反馈快捷函数
function showStatus(msg, isError = false) {
    const bar = document.getElementById('status-bar');
    bar.innerText = `系统状态：${msg}`;
    bar.style.color = isError ? '#e74c3c' : '#2ecc71';
    console[isError ? 'error' : 'log'](msg);
}

// 解锁业务按钮
function unlockUI() {
    document.querySelectorAll('#ui-panel button').forEach(btn => btn.disabled = false);
}

// ==============================================
// 核心加载与初始化逻辑 (严格的 Promise 时序)
// ==============================================
let App = null;

async function bootstrap() {
    try {
        showStatus('初始化场景...');
        App = new WdpApi({
            id: 'player',
            url: WDP_CONFIG.SERVER_URL,
            order: WDP_CONFIG.ORDER_CODE
        });

        // ==============================================
        // === 插件安装区：根据业务需求取消注释 ===
        // ⚠️ Plugin.Install() 必须在 Renderer.Start() 之前执行
        // ==============================================

        // BIM 插件（使用 App.BimModel / App.Component / App.Asset / App.Space 时必须安装）
        // if (typeof BimApi !== 'undefined') {
        //     showStatus('安装 BIM 插件...');
        //     const bimRes = await App.Plugin.Install(BimApi);
        //     if (!bimRes.success) throw new Error('BIM插件安装失败: ' + (bimRes.message || '未知错误'));
        //     showStatus('BIM 插件安装成功');
        // }

        // GIS 插件（使用 App.gis / App.GeoLayer 时必须安装）
        // if (typeof GisApi !== 'undefined') {
        //     showStatus('安装 GIS 插件...');
        //     const gisRes = await App.Plugin.Install(GisApi);
        //     if (!gisRes.success) throw new Error('GIS插件安装失败: ' + (gisRes.message || '未知错误'));
        //     showStatus('GIS 插件安装成功');
        // }

        showStatus('开始渲染...');
        const startRes = await App.Renderer.Start();
        if (!startRes.success) throw new Error('渲染启动失败: ' + (startRes.message || '口令或服务端错误'));

        // 监听场景完成事件
        await App.Renderer.RegisterSceneEvent([{
            name: 'OnWdpSceneIsReady',
            func: async (res) => {
                const progress = res?.result?.progress || 0;
                if (progress === 100) {
                    showStatus('场景已就绪，可用！');
                    unlockUI();
                    
                    // 🏁 在此处可以放置自动执行的默认动作
                    // executeAutoActions();
                }
            }
        }]);

    } catch (err) {
        showStatus(err.message, true);
        alert("严重错误: " + err.message);
    }
}

// ==============================================
// === 业务逻辑区：所有的 DOM 点击、动画、模型显隐均写于此 ===
// ==============================================

document.getElementById('btn-action-1').addEventListener('click', async () => {
    // [AI 注意] 这里填充你查找到的各种 WDP API 逻辑
    alert("你点击了动作 1，但我还没绑定具体的 WDP API。");
});

document.getElementById('btn-action-2').addEventListener('click', async () => {
    alert("你点击了动作 2，但这只是个空壳。");
});

// 启动主干
bootstrap();
<task_progress>
- [x] 阅读全部相关 skill 文件
- [x] 重新审视 npm 安装方式的特殊约束
- [x] 输出完整修改建议
- [x] P0: 重写 universal-bootstrap.template.html
- [ ] P0: 创建 universal-bootstrap.template.main.js
- [ ] P0: 创建 universal-bootstrap.template.package.json
- [ ] P1: 修改 wdp-api-initialization-unified/SKILL.md
- [ ] P1: 修改 wdp-entry-agent/SKILL.md
- [ ] P2: 修改 wdp-api-function-components/SKILL.md
- [ ] P2: 修改 BIM_PLUGIN_INSTALLATION.md
- [ ] P2: 修改 GIS_PLUGIN_INSTALLATION.md
- [ ] P3: 修改 wdp-api-bim-unified/SKILL.md
- [ ] P3: 修改 gis-api-core-operations/SKILL.md
</task_progress>
</write_to_file>