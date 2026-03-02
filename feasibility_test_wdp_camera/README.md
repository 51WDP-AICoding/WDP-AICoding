# WDP 可行性测试系统

目标：
- 接入云渲染视频流
- 提供可切换的功能按钮（POI、区域轮廓、热力图、场景时间）
- 提供 BOSS 一键复位（关闭效果 + 恢复默认时间 + 还原镜头）

## 固定测试参数

- 渲染地址：`https://dtp-api.51aes.com`
- 渲染口令：`35c7d23d58998c9402ed87b45ee70473`
- 目标实体 EID：`-9149062448540868842`
- SDK 依赖：
  - `https://wdpapi.51aes.com/sdk/wdpApi.min.js`（该文件提供 `CloudApi` 运行时）
  - `https://unpkg.com/wdpapi@2.2.1/dist/wdpApi.min.js`

## 启动方式

```bash
cd d:\WorkFiles_Codex\WDP_AIcoding\feasibility_test_wdp_camera
npm run start
```

浏览器打开：

```text
http://localhost:8090/
```

## 操作步骤

1. 等待“视频流已就绪”。
2. 点击 `POI / 区域轮廓 / 热力图 / 场景时间` 任一按钮，观察开启效果。
3. 再点一次同一按钮，观察关闭效果。
4. 点击 `BOSS复位`，观察全部效果关闭、场景时间恢复、镜头回到目标楼。

## 文件说明

- `config/index.js`：渲染配置与测试目标
- `index.html`：页面结构
- `app.js`：初始化、事件监听、按钮动作
- `style.css`：基础样式
