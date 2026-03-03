---
name: wdp-internal-case-acquisition
description: 内部验证用案例源码拉取、解压、分析技能。用于从 51CMP 平台按条件批量下载源码，并生成分析报告供 skills 交叉验证。
---

# WDP 内部案例获取子技能

仅用于内部验证，不作为通用 API 开发入口。

## 适用范围

- 从 51CMP 后台批量拉取“我的项目”源码。
- 按平台/当前版本筛选案例（如 `WDP5 + 终版交付`）。
- 下载后自动解压并输出分析结果，供 skill 编写验证使用。

## 自动化脚本入口（推荐）

脚本路径：`skills/wdp-internal-case-acquisition/auto_fetch_extract_analyze.ps1`

最小执行命令（在仓库根目录）：

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\wdp-internal-case-acquisition\auto_fetch_extract_analyze.ps1 `
  -Token '你的Admin-Token' `
  -DownloadTop 1
```

脚本默认行为：
1. 拉取项目列表（分页）。
2. 过滤 `platform = WDP5` 且 `currentVersion = 终版交付`。
3. 查询版本列表并选取每个项目最新版本。
4. 下载 zip 至 `skills/example/trueProjects`。
5. 自动解压。
6. 输出 JSON + Markdown 报告。

## 接口链路（固定顺序）

1. 项目列表：`GET /api/project/list?page={page}&size={size}&...`
2. 版本列表：`GET /api/version/list?projectId={id}&page={page}&size={size}&...`
3. 源码下载：`GET /api/version/downloadSourceCode?versionId={id}`（zip blob）

## 鉴权与安全

- 使用 `Authorization: Bearer <token>`。
- token 仅临时使用，不入库、不写入脚本文件。
- 用户在会话中暴露过 token 时，执行完成后应提醒用户及时失效并更新。

## 默认筛选口径

- 平台：`WDP5`
- 当前版本：`终版交付`

若筛选口径变化，必须先向用户确认字段和值后再执行。

## 命名与落盘规则

- zip 文件：`project_{projectId}_version_{versionId}.zip`
- 解压目录：`project_{projectId}_version_{versionId}/`
- 原 zip 默认保留，作为归档与重试依据。

默认目录：
- `D:\WorkFiles_Codex\WDP_AIcoding\skills\example\trueProjects`

## 解压与校验要求

1. 下载完成后立即解压到同级目录。
2. 同名目录已存在时允许覆盖解压，但要记录覆盖行为。
3. 最少校验：
- zip 文件大小 > 0
- 解压目录存在
- 目录中存在源码特征文件（如 `package.json`）

## 输出要求

始终输出：
1. 实际筛选条件（字段+值）
2. 下载成功清单（projectId/versionId/路径）
3. 解压结果（目录路径）
4. 深度分析结果（入口文件、依赖、API调用扫描、按文件调用分布、质量信号、skillInsights）
5. 失败项与原因（如有）

