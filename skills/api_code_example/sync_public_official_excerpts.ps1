param(
    [string[]]$Targets = @(
        'entity-general-behavior',
        'entity-coverings',
        'layer-models',
        'material-settings',
        'function-components'
    )
)

$ErrorActionPreference = 'Stop'

$baseUrl = 'https://wdpapidoc.51aes.com/api/backend'
$versionId = 128

$targetMap = @{
    'entity-general-behavior' = @{
        CategoryId = 571
        FileName = 'official-entity-general-behavior.md'
    }
    'entity-coverings' = @{
        CategoryId = 572
        FileName = 'official-entity-coverings.md'
    }
    'layer-models' = @{
        CategoryId = 573
        FileName = 'official-layer-models.md'
    }
    'material-settings' = @{
        CategoryId = 574
        FileName = 'official-material-settings.md'
    }
    'function-components' = @{
        CategoryId = 576
        FileName = 'official-function-components.md'
    }
}

function Read-Utf8JsonResponse {
    param(
        $Response
    )

    $Response.RawContentStream.Position = 0
    $reader = [System.IO.StreamReader]::new($Response.RawContentStream, [System.Text.Encoding]::UTF8)
    try {
        return ($reader.ReadToEnd() | ConvertFrom-Json)
    } finally {
        $reader.Dispose()
    }
}

function Invoke-DocsGet {
    param(
        [string]$Path
    )

    $response = Invoke-WebRequest -UseBasicParsing "$baseUrl$Path"
    return Read-Utf8JsonResponse -Response $response
}

function Invoke-DocsPost {
    param(
        [string]$Path,
        [hashtable]$Body
    )

    $response = Invoke-WebRequest -UseBasicParsing "$baseUrl$Path" `
        -Method Post `
        -ContentType 'application/json' `
        -Body ($Body | ConvertTo-Json)
    return Read-Utf8JsonResponse -Response $response
}

function Convert-ItemToMarkdownLines {
    param(
        $Item
    )

    $lines = New-Object System.Collections.Generic.List[string]

    switch ($Item.contentType) {
        1 {
            $content = ($Item.content -replace '\s+', ' ').Trim()
            if ($content) {
                $lines.Add("- $content")
                $lines.Add('')
            }
        }
        5 {
            try {
                $payload = $Item.content | ConvertFrom-Json
                $code = $payload.code.Trim()
                if ($code) {
                    $lines.Add('```javascript')
                    foreach ($line in ($code -split "`r?`n")) {
                        $lines.Add($line)
                    }
                    $lines.Add('```')
                    $lines.Add('')
                }
            } catch {
            }
        }
        default {
        }
    }

    return $lines
}

function New-CategoryMarkdown {
    param(
        $Category
    )

    $doc = Invoke-DocsPost -Path '/web/api/category' -Body @{
        lang = 'cn'
        typeId = 1
        versionId = $versionId
    }

    $categoryNode = $doc.data | Where-Object { [int]$_.id -eq [int]$Category.CategoryId } | Select-Object -First 1
    if (-not $categoryNode) {
        throw "Category not found: $($Category.CategoryId)"
    }

    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add("# Official excerpt sync: $($categoryNode.name)")
    $lines.Add('')
    $lines.Add('Version baseline: WDP API 2.2.1')
    $lines.Add("Source: public wdpapidoc API (category: $($categoryNode.name), categoryId: $($Category.CategoryId))")
    $lines.Add('')
    $lines.Add('## Notes')
    $lines.Add('- Generated from public child-topic detail pages.')
    $lines.Add('- Prefer the online published docs when any mismatch appears.')
    $lines.Add('- This file focuses on method-level code excerpts and does not fully mirror tables or images.')
    $lines.Add('')

    foreach ($child in ($categoryNode.children | Sort-Object sort)) {
        $info = Invoke-DocsGet -Path "/web/api/info?id=$($child.id)"
        $lines.Add("## Topic: $($info.data.title) (id: $($child.id))")
        $lines.Add('')

        foreach ($item in ($info.data.itemList | Sort-Object sort)) {
            $itemLines = Convert-ItemToMarkdownLines -Item $item
            foreach ($line in $itemLines) {
                $lines.Add($line)
            }
        }
    }

    return ($lines -join "`r`n").TrimEnd() + "`r`n"
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

foreach ($target in $Targets) {
    if (-not $targetMap.ContainsKey($target)) {
        throw "Unknown target: $target"
    }

    $config = $targetMap[$target]
    $markdown = New-CategoryMarkdown -Category $config
    $outputPath = Join-Path $scriptDir $config.FileName
    [System.IO.File]::WriteAllText($outputPath, $markdown, [System.Text.UTF8Encoding]::new($false))
    Write-Output "Synced $($config.FileName)"
}
