# WDP API Skills Update Plan (Based on `release/1.0.0` logs)

## Overview of Remote Changes (`modifyLogs/2026-04-21.md`)
The remote repository (`wdpapi_skills.git` branch `release/1.0.0`) had a massive documentation and code example overhaul with the following major points:

1. **Digital Human Roaming (Camera Control)**: 
   - Added `PlayEntityRoam` and `StopEntityRoam` APIs.
   - Files affected: `reference/04-camera/camera-control/SKILL.md`
2. **Camera Preset Base Attributes Expansion**: 
   - Added `entityName`, `customId`, `customData`, `parentEid` support.
   - Added their getter/setter methods.
   - Files affected: `reference/04-camera/camera-preset/SKILL.md`
3. **Getter Method Access Unification**: 
   - All getter examples now show two ways of access: Direct Property Access (`entity.propName`) and Async Method Call (`await entity.GetXxx()`).
   - Unified `**出参（entity.GetXxx）：**` formatting.
   - Files affected: `04-camera/camera-preset`, `04-camera/camera-roams`, `06-model/static`, `06-model/vegetation`
4. **Massive Coverings Update (15 Modules)**: 
   - Uniform getter formats (as above).
   - Removed duplicated setter `success`/`message` outputs.
   - Added `parentEid` to all property tables.
   - Added missing `entityName`, `customId`, `customData`, `parentEid` getter/setter blocks.
   - **CRITICAL FIX**: Replaced `result.eid` with `result.object` for `App.Scene.Add()` outputs, and clarified that the returned object is the complete entity object capable of running member methods.
   - Files affected: All 15 covering modules in `reference/05-covering/`.

## Mapping to Local Skills & Optimization Plan
Our local repository organizes content slightly differently (e.g., `wdp-api-camera-unified` instead of `04-camera`). Here is how we will map and plan the updates:

### Phase 1: Update Camera APIs
**Target Local Dir**: `skills/wdp-api-camera-unified/` and `skills/official_api_code_example/official-scene-camera.md`
- **Task**: Check for `PlayEntityRoam` and `StopEntityRoam` APIs. Add them if missing.
- **Task**: For `App.Camera` (camera-preset), update the properties and methods to include `entityName`, `customId`, `customData`, `parentEid`.
- **Task**: Ensure the getter examples (like `CameraRoam`, `CameraStart`, `Camera`) demonstrate both property and method access correctly.

### Phase 2: Fix `App.Scene.Add()` Return Values across all Coverings & Models
**Target Local Dirs**: `skills/wdp-api-coverings-unified/`, `skills/wdp-api-layer-models/`, and `skills/official_api_code_example/official-entity-coverings.md`
- **Task**: The old return format was `{ success: true, result: { eid: 'xxx' } }`. We MUST update this everywhere to `{ success: true, result: { object: EntityObject } }` where `EntityObject` is the actual instance.
- **Task**: Fix JS snippets that mistakenly read `result.eid`. They should be reading `result.object.eid` or just using the `result.object` directly.

### Phase 3: Unify Getters and Base Attributes (entityName, customId, customData, parentEid)
**Target Local Dirs**: `skills/wdp-api-generic-base-attributes/`, `skills/wdp-api-entity-general-behavior/`, and specific covering/model files.
- **Task**: Ensure that the core base attribute properties reflect the new addition of `parentEid`.
- **Task**: Ensure that when documenting entity retrieval (`GetXxx`), we show both the synchronous property access and the async method call.
- **Task**: Clean up redundant setter output documentation.

## Next Steps
This plan separates the complex updates into logical phases. I will present this plan to the user for confirmation before executing any edits.