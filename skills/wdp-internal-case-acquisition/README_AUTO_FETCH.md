# 自动化拉取、解压、分析（内部案例）

## 作用
一条命令自动完成：
1. 拉取项目列表（分页）
2. 过滤 `平台=WDP5` 且 `当前版本=终版交付`
3. 进入版本列表，选择每个项目最新版本
4. 下载源码 zip 到 `skills/example/trueProjects`
5. 自动解压
6. 生成深度分析报告（JSON + Markdown）

## 脚本位置
`skills/wdp-internal-case-acquisition/auto_fetch_extract_analyze.ps1`

## 最小用法
在仓库根目录 `D:\WorkFiles_Codex\WDP_AIcoding` 执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\wdp-internal-case-acquisition\auto_fetch_extract_analyze.ps1 `
  -Token '你的Admin-Token' `
  -DownloadTop 1
```

## 常用参数
- `-Token` 必填。每次手动输入，不落盘。
- `-DownloadTop` 下载多少个项目（默认 1）。
- `-TargetPlatform` 默认 `WDP5`。
- `-TargetVersionType` 默认 `终版交付`。
- `-OutputDir` 默认 `..\example\trueProjects`（相对脚本目录）。
- `-SkipDownload` 只做解压+分析。
- `-SkipExtract` 只下载。
- `-SkipAnalyze` 不做分析。

## 输出
在 `skills/example/trueProjects` 下生成：
- `project_<projectId>_version_<versionId>.zip`
- `project_<projectId>_version_<versionId>/`（解压目录）
- `acquire_report_yyyyMMdd_HHmmss.json`
- `acquire_report_yyyyMMdd_HHmmss.md`

## 深度分析内容（用于提升 skill）
- 项目结构摘要（根目录、源码文件数）
- 入口文件识别结果
- 依赖清单（dependencies/devDependencies）
- API 调用扫描：`App.*` / `WdpApi.*` / `CloudApi.*`
- 按文件聚合的调用分布（热点文件）
- 质量信号：`try/catch`、`await`、`console.error`
- `skillInsights`：可直接反馈到 skill 的优化建议

## 分析后必须执行（蒸馏回写）

1. 从报告中提取“可泛化规则”（时序、门禁、回滚、参数分层）。
2. 回写到对应 skill（入口 skill 或子 skill），不要把案例路径当运行时依赖。
3. 标记案例价值：
- 高价值：保留（API 命中高、调用链完整）。
- 低价值：删除（无 API 命中且无可复用流程）。

## 1.0 案例回写限制（强制）

- 不回写：具体方法名、参数字段、枚举值、返回字段（避免 1.0 污染 2.x skill）。
- 可回写：方法框架一致时的使用注意事项（例如调用时序、前置门禁、清理与回滚策略）。
- 若结论依赖具体 API 细节，必须先用在线 2.x 文档复核，再允许写入 skill。

## 说明
- 脚本不会保存 token。
- 若接口字段后续变更，需要同步调整脚本中的解析字段。
- 若项目 API 调用封装在外部静态资源中，源码扫描可能显示 0，此时需补充运行态日志验证。

## 案例保留与清理规则
- 目标：仅保留对当前 skill 有“可验证提升价值”的案例，减少缓存与本地存储。
- 判定口径（默认）：
  - `apiTokenHits > 0`（源码中命中 `App.` / `WdpApi.` / `CloudApi.`）可保留。
  - `apiTokenHits = 0` 且无运行态补充价值（无特殊封装说明、无可复用流程）应删除。
- 清理范围：`skills/example/trueProjects` 下的 zip、解压目录、临时 run 目录与旧报告。
- 执行要求：每次清理后必须更新“历史剔除记录”。

## 历史剔除记录
### 2026-03-03
- 已删除：`run_20260303_deep1/`
- 已删除：`project_63_version_124/`
- 已删除：`project_63_version_124.zip`
- 原因：源码扫描 `apiTokenHits = 0`，未发现显式 WDP/BIM/GIS API 调用，对当前 skill 提升价值低。
