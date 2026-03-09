# WDP API Online Coverage Audit

Last verified: 2026-03-09

## Scope

- Local files: `skills/api_code_example/official-*.md`
- Sync helper: `skills/api_code_example/sync_public_official_excerpts.ps1`
- Online sources:
  - `https://wdpapidoc.51aes.com/apifunc/wdpapi`
  - `https://wdpapidoc.51aes.com/api/backend/web/type/list`
  - `https://wdpapidoc.51aes.com/api/backend/web/api/category`
  - `https://wdpapidoc.51aes.com/api/backend/web/api/info?id=<childTopicId>`

## Verification rule

- Version baseline:
  - WDP API `2.2.1`
  - GIS API `2.1.0`
  - BIM API `2.1.1`
- Method extraction rule:
  - Count only callable entries matching `App...(` inside code blocks
- Verification standard:
  - `missing=0`
  - `extra=0`

## Final result

- Category-level coverage: aligned
- Method-level coverage: aligned
- WDP / GIS / BIM local excerpt files are now aligned with the public online docs under the current extraction rule

## WDP API 2.2.1

1. `official-general-event-registration.md`
- online `15`
- local `15`
- missing `0`
- extra `0`

2. `official-initialize-scene.md`
- online `9`
- local `9`
- missing `0`
- extra `0`

3. `official-scene-camera.md`
- online `35`
- local `35`
- missing `0`
- extra `0`

4. `official-generic-base-attributes.md`
- online `37`
- local `37`
- missing `0`
- extra `0`

5. `official-entity-general-behavior.md`
- online `63`
- local `63`
- missing `0`
- extra `0`

6. `official-entity-coverings.md`
- online `38`
- local `38`
- missing `0`
- extra `0`

7. `official-layer-models.md`
- online `15`
- local `15`
- missing `0`
- extra `0`

8. `official-material-settings.md`
- online `9`
- local `9`
- missing `0`
- extra `0`

9. `official-cluster.md`
- online `14`
- local `14`
- missing `0`
- extra `0`

10. `official-function-components.md`
- online `52`
- local `52`
- missing `0`
- extra `0`

## GIS API 2.1.0

- file: `official-gis-full.md`
- online `22`
- local `22`
- missing `0`
- extra `0`

## BIM API 2.1.1

- file: `official-bim-full.md`
- online `27`
- local `27`
- missing `0`
- extra `0`

## Current totals

- global unique callable entries across all `official-*.md`: `239`
- per-file unique method sum: `339`

## Notes

- The five WDP excerpt files that previously lagged behind the online docs were regenerated from the public child-topic detail endpoints:
  - `official-entity-general-behavior.md`
  - `official-entity-coverings.md`
  - `official-layer-models.md`
  - `official-material-settings.md`
  - `official-function-components.md`
- The sync script intentionally focuses on method-level code excerpts. It does not fully mirror tables, images, or all rich-text parameter descriptions.
- If the online docs change again, rerun:

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\api_code_example\sync_public_official_excerpts.ps1
```
