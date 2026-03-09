param([string]$Token)

$ErrorActionPreference = 'Stop'
$baseUrl = 'https://wdpapidoc.51aes.com/api/backend'
$headers = @{ 'Authorization' = "Bearer $Token" }

function Read-Utf8 {
    param($Response)
    $Response.RawContentStream.Position = 0
    $reader = [System.IO.StreamReader]::new($Response.RawContentStream, [System.Text.Encoding]::UTF8)
    try { return ($reader.ReadToEnd() | ConvertFrom-Json) } finally { $reader.Dispose() }
}

function Get-Category {
    param([int]$TypeId, [int]$VersionId)
    $body = @{ lang = 'cn'; typeId = $TypeId; versionId = $VersionId } | ConvertTo-Json
    $r = Invoke-WebRequest -UseBasicParsing -Method Post -Uri "$baseUrl/web/api/category" -Headers $headers -ContentType 'application/json' -Body $body
    return (Read-Utf8 $r).data
}

function Count-Methods {
    param([int]$ChildId)
    $r = Invoke-WebRequest -UseBasicParsing -Uri "$baseUrl/web/api/info?id=$ChildId" -Headers $headers
    $info = (Read-Utf8 $r).data
    $count = 0
    foreach ($item in $info.itemList) {
        if ($item.contentType -eq 5) {
            try {
                $payload = $item.content | ConvertFrom-Json
                $matches = [regex]::Matches($payload.code, 'App\.\w+\(')
                $count += $matches.Count
            } catch {}
        }
    }
    return @{ title = $info.title; id = $ChildId; methodCount = $count }
}

Write-Output "=== WDP API 2.2.1 (versionId=128) ==="
$wdpCats = Get-Category -TypeId 1 -VersionId 128
foreach ($cat in ($wdpCats | Sort-Object sort)) {
    Write-Output "-- Category: $($cat.name) (id=$($cat.id))"
    foreach ($child in ($cat.children | Sort-Object sort)) {
        $result = Count-Methods -ChildId $child.id
        Write-Output "   Topic: $($result.title) (id=$($result.id)) => App.*( count: $($result.methodCount)"
    }
}

Write-Output ""
Write-Output "=== GIS API 2.1.0 (versionId=127) ==="
$gisCats = Get-Category -TypeId 2 -VersionId 127
foreach ($cat in ($gisCats | Sort-Object sort)) {
    Write-Output "-- Category: $($cat.name) (id=$($cat.id))"
    foreach ($child in ($cat.children | Sort-Object sort)) {
        $result = Count-Methods -ChildId $child.id
        Write-Output "   Topic: $($result.title) (id=$($result.id)) => App.*( count: $($result.methodCount)"
    }
}

Write-Output ""
Write-Output "=== BIM API 2.1.1 (versionId=129) ==="
$bimCats = Get-Category -TypeId 5 -VersionId 129
foreach ($cat in ($bimCats | Sort-Object sort)) {
    Write-Output "-- Category: $($cat.name) (id=$($cat.id))"
    foreach ($child in ($cat.children | Sort-Object sort)) {
        $result = Count-Methods -ChildId $child.id
        Write-Output "   Topic: $($result.title) (id=$($result.id)) => App.*( count: $($result.methodCount)"
    }
}
