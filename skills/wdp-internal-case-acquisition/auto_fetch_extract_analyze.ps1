param(
    [Parameter(Mandatory = $true)]
    [string]$Token,

    [string]$BaseUrl = 'https://51cmp.51aes.com:779',

    [int]$PageSize = 10,

    [int]$MaxPages = 30,

    [string]$TargetPlatform = 'WDP5',

    [string]$TargetVersionType = '终版交付',

    [int]$DownloadTop = 1,

    [string]$OutputDir = '..\\example\\trueProjects',

    [switch]$SkipDownload,

    [switch]$SkipExtract,

    [switch]$SkipAnalyze
)

$ErrorActionPreference = 'Stop'

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$resolvedOutputDir = [System.IO.Path]::GetFullPath((Join-Path $scriptRoot $OutputDir))
if (-not (Test-Path $resolvedOutputDir)) {
    New-Item -ItemType Directory -Path $resolvedOutputDir | Out-Null
}

$headers = @{ Authorization = "Bearer $Token" }
$apiBase = "$BaseUrl/api"

function Get-RespList {
    param([object]$Resp)

    if ($null -eq $Resp) { return @() }
    if ($Resp.PSObject.Properties.Name -contains 'rows' -and $Resp.rows) { return @($Resp.rows) }
    if ($Resp.PSObject.Properties.Name -contains 'data' -and $Resp.data) {
        if ($Resp.data.PSObject.Properties.Name -contains 'list' -and $Resp.data.list) { return @($Resp.data.list) }
        if ($Resp.data.PSObject.Properties.Name -contains 'rows' -and $Resp.data.rows) { return @($Resp.data.rows) }
    }
    if ($Resp.PSObject.Properties.Name -contains 'list' -and $Resp.list) { return @($Resp.list) }
    return @()
}

function Invoke-ApiGet {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url,
        [hashtable]$Query = @{}
    )

    $full = if ($Query.Count -gt 0) {
        $queryStr = ($Query.GetEnumerator() | ForEach-Object {
            "$([uri]::EscapeDataString([string]$_.Key))=$([uri]::EscapeDataString([string]$_.Value))"
        }) -join '&'
        "$Url`?$queryStr"
    } else {
        $Url
    }

    Write-Host "[GET] $full"
    return Invoke-RestMethod -Method Get -Uri $full -Headers $headers -TimeoutSec 120
}

function Resolve-VersionTypeText {
    param([int]$VersionType)
    switch ($VersionType) {
        1 { return '初版交付' }
        2 { return '过程版交付' }
        3 { return '终版交付' }
        default { return [string]$VersionType }
    }
}

function Resolve-VersionTypeNum {
    param([string]$VersionTypeText)
    switch ($VersionTypeText) {
        '初版交付' { return 1 }
        '过程版交付' { return 2 }
        '终版交付' { return 3 }
        default { return $null }
    }
}

function Get-ProjectRows {
    $rows = @()
    for ($page = 1; $page -le $MaxPages; $page++) {
        $resp = Invoke-ApiGet -Url "$apiBase/project/list" -Query @{
            page = $page
            size = $PageSize
            name = ''
            sjNum = ''
            creatorName = ''
            orgId = ''
        }

        $pageRows = @(Get-RespList -Resp $resp)
        if ($pageRows.Count -eq 0) { break }

        $rows += $pageRows
        if ($pageRows.Count -lt $PageSize) { break }
    }
    return $rows
}

function Match-Project {
    param([object]$Project)

    $platform = [string]$Project.wdpVersion
    $targetTypeNum = Resolve-VersionTypeNum -VersionTypeText $TargetVersionType
    $projectTypeNum = if ($Project.versionType -ne $null -and [string]$Project.versionType -ne '') { [int]$Project.versionType } else { $null }

    $typeMatched = $false
    if ($targetTypeNum -ne $null -and $projectTypeNum -ne $null) {
        $typeMatched = ($projectTypeNum -eq $targetTypeNum)
    } else {
        $typeMatched = ((Resolve-VersionTypeText -VersionType $projectTypeNum) -eq $TargetVersionType)
    }

    return ($platform -eq $TargetPlatform -and $typeMatched)
}

function Get-VersionRows {
    param([long]$ProjectId)

    $resp = Invoke-ApiGet -Url "$apiBase/version/list" -Query @{
        projectId = $ProjectId
        page = 1
        size = 100
        userId = ''
        search = ''
    }

    return @(Get-RespList -Resp $resp)
}

function Resolve-PreferVersion {
    param([object[]]$Versions)

    if ($Versions.Count -eq 0) { return $null }

    $sorted = $Versions | Sort-Object -Property @{Expression = {
        if ($_.updatedAt) { [datetime]$_.updatedAt }
        elseif ($_.updateTime) { [datetime]$_.updateTime }
        else { Get-Date '1900-01-01' }
    }}, @{Expression = {
        if ($_.createdAt) { [datetime]$_.createdAt }
        elseif ($_.createTime) { [datetime]$_.createTime }
        else { Get-Date '1900-01-01' }
    }} -Descending

    return $sorted[0]
}

function Download-VersionZip {
    param(
        [long]$VersionId,
        [string]$ZipPath
    )

    if (Test-Path $ZipPath) {
        $stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
        $old = [System.IO.Path]::ChangeExtension($ZipPath, ".bak_$stamp.zip")
        Rename-Item -Path $ZipPath -NewName (Split-Path -Leaf $old)
    }

    $uri = "$apiBase/version/downloadSourceCode?versionId=$VersionId"
    Write-Host "[DOWNLOAD] $uri -> $ZipPath"
    Invoke-WebRequest -Method Get -Uri $uri -Headers $headers -TimeoutSec 300 -OutFile $ZipPath
}

function Expand-ZipSafe {
    param(
        [string]$ZipPath,
        [string]$DestDir
    )

    if (-not (Test-Path $DestDir)) {
        New-Item -ItemType Directory -Path $DestDir | Out-Null
    }

    Write-Host "[EXTRACT] $ZipPath -> $DestDir"
    Expand-Archive -Path $ZipPath -DestinationPath $DestDir -Force
}

function Normalize-Text {
    param([string]$Input)
    if ([string]::IsNullOrWhiteSpace($Input)) { return '' }
    return ($Input -replace "`r", ' ' -replace "`n", ' ' -replace '\s+', ' ').Trim()
}

function Get-EntryFile {
    param([string]$Dir)

    $candidates = @(
        'src/main.js', 'src/main.ts', 'src/App.vue',
        'main.js', 'index.js', 'app.js', 'src/index.js'
    )

    foreach ($c in $candidates) {
        $full = Join-Path $Dir $c
        if (Test-Path $full) { return $full }
    }

    return ''
}

function Extract-ApiCallsFromFile {
    param([string]$File)

    $calls = @()
    $content = Get-Content -Raw -Encoding UTF8 $File -ErrorAction SilentlyContinue
    if ([string]::IsNullOrWhiteSpace($content)) { return @() }

    $patterns = @(
        '(?m)(App\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*\(',
        '(?m)(App\.[A-Za-z0-9_]+)\s*\(',
        '(?m)(WdpApi\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*\(',
        '(?m)(WdpApi\.[A-Za-z0-9_]+)\s*\(',
        '(?m)(CloudApi\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*\(',
        '(?m)(CloudApi\.[A-Za-z0-9_]+)\s*\('
    )

    foreach ($p in $patterns) {
        $ms = [regex]::Matches($content, $p)
        foreach ($m in $ms) {
            $name = $m.Groups[1].Value
            if (-not [string]::IsNullOrWhiteSpace($name)) {
                $calls += $name
            }
        }
    }

    return @($calls | Sort-Object -Unique)
}

function Analyze-ProjectFolder {
    param([string]$Dir)

    $result = [ordered]@{
        path = $Dir
        rootItems = @()
        packageJsonPath = ''
        hasPackageJson = $false
        packageName = ''
        packageVersion = ''
        entryFile = ''
        sourceFileCount = 0
        jsTsVueFileCount = 0
        detectedDeps = @()
        apiCallCount = 0
        apiCallsTop = @()
        apiCallsByFile = @()
        hasAppApiCalls = $false
        hasWdpApiCalls = $false
        hasCloudApiCalls = $false
        qualitySignals = [ordered]@{
            hasTryCatch = $false
            hasAwait = $false
            hasConsoleError = $false
        }
        skillInsights = @()
    }

    $rootItems = Get-ChildItem -Path $Dir -Force -ErrorAction SilentlyContinue | Select-Object -First 30
    $result.rootItems = @($rootItems | ForEach-Object { $_.Name })

    $pkgCandidates = Get-ChildItem -Path $Dir -Recurse -Filter 'package.json' -File -ErrorAction SilentlyContinue
    $pkgFile = $pkgCandidates | Select-Object -First 1

    if ($pkgFile) {
        $pkg = $pkgFile.FullName
        $result.packageJsonPath = $pkg
        $result.hasPackageJson = $true
        try {
            $pkgObj = Get-Content -Raw -Encoding UTF8 $pkg | ConvertFrom-Json
            $result.packageName = [string]$pkgObj.name
            $result.packageVersion = [string]$pkgObj.version

            $deps = @()
            if ($pkgObj.dependencies) { $deps += $pkgObj.dependencies.PSObject.Properties.Name }
            if ($pkgObj.devDependencies) { $deps += $pkgObj.devDependencies.PSObject.Properties.Name }
            $result.detectedDeps = @($deps | Sort-Object -Unique)
        }
        catch {
            $result.packageName = '[parse-error]'
        }
    }

    $entry = Get-EntryFile -Dir $Dir
    $result.entryFile = $entry

    $allFiles = Get-ChildItem -Path $Dir -Recurse -File -ErrorAction SilentlyContinue
    $result.sourceFileCount = @($allFiles).Count

    $codeFiles = @($allFiles | Where-Object { $_.Extension -in @('.js', '.ts', '.vue', '.jsx', '.tsx') })
    $result.jsTsVueFileCount = $codeFiles.Count

    $apiCallsByFile = @()
    $allCalls = @()

    foreach ($f in $codeFiles) {
        $calls = Extract-ApiCallsFromFile -File $f.FullName
        if ($calls.Count -gt 0) {
            $relative = $f.FullName.Replace($Dir, '').TrimStart('\\')
            $apiCallsByFile += [pscustomobject]@{
                file = $relative
                callCount = $calls.Count
                calls = $calls
            }
            $allCalls += $calls
        }

        $content = Get-Content -Raw -Encoding UTF8 $f.FullName -ErrorAction SilentlyContinue
        if ($content) {
            if ($content -match '\btry\s*\{') { $result.qualitySignals.hasTryCatch = $true }
            if ($content -match '\bawait\s+') { $result.qualitySignals.hasAwait = $true }
            if ($content -match 'console\.error\s*\(') { $result.qualitySignals.hasConsoleError = $true }
        }
    }

    $uniqCalls = @($allCalls | Sort-Object -Unique)
    $result.apiCallCount = $uniqCalls.Count
    $result.apiCallsTop = @($uniqCalls | Select-Object -First 50)
    $result.apiCallsByFile = @($apiCallsByFile | Sort-Object callCount -Descending | Select-Object -First 20)

    $result.hasAppApiCalls = (($uniqCalls | Where-Object { $_ -like 'App.*' }).Count -gt 0)
    $result.hasWdpApiCalls = (($uniqCalls | Where-Object { $_ -like 'WdpApi.*' }).Count -gt 0)
    $result.hasCloudApiCalls = (($uniqCalls | Where-Object { $_ -like 'CloudApi.*' }).Count -gt 0)

    $insights = @()
    if ($result.apiCallCount -eq 0) {
        $insights += '未在源码中扫描到显式 App/WdpApi/CloudApi 调用，可能为模板项目或 API 封装在外部静态资源。'
    }
    if ($result.hasAppApiCalls) {
        $insights += '存在 App.* 直接调用，适合作为 wdp-api 子技能方法样例来源。'
    }
    if (-not $result.qualitySignals.hasTryCatch) {
        $insights += 'API 调用缺少明显 try/catch，建议在 skill 中强化异常处理模板。'
    }
    if (-not $result.qualitySignals.hasConsoleError) {
        $insights += '缺少 console.error 错误落点，建议统一错误日志格式。'
    }
    if (-not $result.entryFile) {
        $insights += '未识别到典型入口文件，建议在案例索引中补充项目启动入口说明。'
    }

    $result.skillInsights = $insights

    return [pscustomobject]$result
}

$projects = Get-ProjectRows
$matched = @($projects | Where-Object { Match-Project -Project $_ })

Write-Host "[INFO] 项目总数: $($projects.Count)"
Write-Host "[INFO] 过滤后项目数(platform=$TargetPlatform, currentVersion=$TargetVersionType): $($matched.Count)"

$selected = @()
foreach ($p in $matched) {
    $versions = Get-VersionRows -ProjectId ([long]$p.id)
    $best = Resolve-PreferVersion -Versions $versions

    if ($null -eq $best) { continue }

    $selected += [pscustomobject]@{
        projectId = [long]$p.id
        projectName = [string](Normalize-Text -Input $p.name)
        platform = [string]$p.wdpVersion
        currentVersion = Resolve-VersionTypeText -VersionType ([int]$p.versionType)
        versionId = [long]$best.id
        versionNo = [string]$best.version
        updateTime = if ($best.updatedAt) { [string]$best.updatedAt } else { [string]$best.updateTime }
    }
}

$selected = @($selected | Sort-Object -Property updateTime -Descending | Select-Object -First $DownloadTop)

if ($selected.Count -eq 0) {
    throw '没有找到符合条件的项目版本。'
}

$report = [ordered]@{
    generatedAt = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    criteria = [ordered]@{
        targetPlatform = $TargetPlatform
        targetVersionType = $TargetVersionType
        downloadTop = $DownloadTop
    }
    selected = @()
    analysis = @()
}

foreach ($item in $selected) {
    $baseName = "project_$($item.projectId)_version_$($item.versionId)"
    $zipPath = Join-Path $resolvedOutputDir "$baseName.zip"
    $extractDir = Join-Path $resolvedOutputDir $baseName

    if (-not $SkipDownload) {
        Download-VersionZip -VersionId $item.versionId -ZipPath $zipPath
    }

    if ((-not $SkipExtract) -and (Test-Path $zipPath)) {
        Expand-ZipSafe -ZipPath $zipPath -DestDir $extractDir
    }

    $entry = [ordered]@{
        projectId = $item.projectId
        projectName = $item.projectName
        platform = $item.platform
        currentVersion = $item.currentVersion
        versionId = $item.versionId
        versionNo = $item.versionNo
        zipPath = $zipPath
        extractDir = $extractDir
    }

    $report.selected += [pscustomobject]$entry

    if (-not $SkipAnalyze) {
        $analysis = Analyze-ProjectFolder -Dir $extractDir
        $report.analysis += $analysis
    }
}

$timestamp = (Get-Date).ToString('yyyyMMdd_HHmmss')
$reportJsonPath = Join-Path $resolvedOutputDir ("acquire_report_" + $timestamp + '.json')
$reportMdPath = Join-Path $resolvedOutputDir ("acquire_report_" + $timestamp + '.md')

$report | ConvertTo-Json -Depth 12 | Out-File -Encoding UTF8 $reportJsonPath

$md = @()
$md += "# Acquisition Report"
$md += ""
$md += "- generatedAt: $($report.generatedAt)"
$md += "- platform: $TargetPlatform"
$md += "- currentVersion: $TargetVersionType"
$md += "- downloadTop: $DownloadTop"
$md += ""
$md += "## Selected"
foreach ($s in $report.selected) {
    $md += "- projectId=$($s.projectId), versionId=$($s.versionId), versionNo=$($s.versionNo), projectName=$($s.projectName)"
}
$md += ""
$md += "## Analysis"
foreach ($a in $report.analysis) {
    $md += "- path=$($a.path)"
    $md += "- package=$($a.packageName)@$($a.packageVersion), packageJson=$($a.packageJsonPath)"
    $md += "- entryFile=$($a.entryFile), codeFiles=$($a.jsTsVueFileCount), allFiles=$($a.sourceFileCount)"
    $md += "- apiCallCount=$($a.apiCallCount), hasApp=$($a.hasAppApiCalls), hasWdpApi=$($a.hasWdpApiCalls), hasCloudApi=$($a.hasCloudApiCalls)"
    $md += "- topApiCalls=$(([string]::Join(', ', $a.apiCallsTop)))"
    $md += "- qualitySignals: tryCatch=$($a.qualitySignals.hasTryCatch), await=$($a.qualitySignals.hasAwait), consoleError=$($a.qualitySignals.hasConsoleError)"
    if ($a.apiCallsByFile.Count -gt 0) {
        $md += "- apiCallsByFile:"
        foreach ($f in $a.apiCallsByFile) {
            $md += "  - $($f.file) => $($f.callCount) calls"
        }
    }
    if ($a.skillInsights.Count -gt 0) {
        $md += "- skillInsights:"
        foreach ($i in $a.skillInsights) {
            $md += "  - $i"
        }
    }
    $md += ""
}

$md -join [Environment]::NewLine | Out-File -Encoding UTF8 $reportMdPath

Write-Host "[DONE] JSON Report: $reportJsonPath"
Write-Host "[DONE] MD Report: $reportMdPath"
