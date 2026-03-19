# Sub-skill Optimization Tracker

## Sub-skills to Optimize
1. wdp-api-bim-unified
2. wdp-api-camera-unified
3. wdp-api-cluster
4. wdp-api-coverings-unified
5. wdp-api-entity-general-behavior
6. wdp-api-function-components
7. wdp-api-general-event-registration
8. wdp-api-generic-base-attributes
9. wdp-api-initialization-unified
10. wdp-api-layer-models
11. wdp-api-material-settings
12. wdp-api-spatial-understanding

## Optimization Status

| Sub-skill | Template.js References | api_code_example References | Optimized |
|-----------|------------------------|----------------------------|-----------|
| wdp-api-bim-unified | Yes | Yes | |
| wdp-api-camera-unified | Yes | Yes | |
| wdp-api-cluster | Yes | Yes | |
| wdp-api-coverings-unified | Yes | Yes | |
| wdp-api-entity-general-behavior | Yes | Yes | |
| wdp-api-function-components | Yes | Yes | |
| wdp-api-general-event-registration | Yes | Yes | |
| wdp-api-generic-base-attributes | Yes | Yes | |
| wdp-api-initialization-unified | Yes | Yes | |
| wdp-api-layer-models | Yes | Yes | |
| wdp-api-material-settings | Yes | Yes | |
| wdp-api-spatial-understanding | No | Yes | |

## Optimization Guidelines

1. **Remove references to template.js files**
2. **Update api_code_example to official_api_code_example**
3. **Make sub-skills more concise**:
   - Focus on conceptual overviews
   - Provide clear references to official documentation
   - Avoid duplicating code from official documentation
4. **Maintain consistent structure**:
   - name and description
   - Strong requirements (if applicable)
   - Capability overview
   - Standard process
   - Quality thresholds/best practices
   - Common problems and solutions
   - References

## Additional Notes
- wdp-api-entity-general-behavior references a workflow file: `../workflows/workflow-bim-floor-isolated-visibility.md`. Need to check if this file exists and if it needs to be updated.
- wdp-api-function-components references a workflow file: `../workflows/workflow-weather-dynamic-sniffing.md`. Need to check if this file exists and if it needs to be updated.
- wdp-api-function-components also references another file: `../api_code_example/mandatory-flow.md`. Need to check if this file exists and if it needs to be updated.
- wdp-api-coverings-unified has extensive code examples that should be simplified, with references to the official documentation instead.
- wdp-api-camera-unified has extensive code examples that should be simplified, with references to the official documentation instead.
- wdp-api-initialization-unified has extensive code examples that should be simplified, with references to the official documentation instead.
- wdp-api-initialization-unified references several other files:
  - `../api_code_example/mandatory-flow.md`
  - `../api_code_example/common-errors.md`
  - `../api_code_example/code-generation-checklist.md`
  - `../api_code_example/README.md`
  - `../workflows/workflow-frontend-bootstrapping.md`
  - `../workflows/workflow-project-scaffolding-vite.md`
  - `../mandatory-requirements.md`
- wdp-api-spatial-understanding references a workflow file: `../workflows/workflow-scene-ready-spatial-probe.md`
- wdp-api-spatial-understanding references a file outside both folders: `../mandatory-requirements.md`
- wdp-api-bim-unified has extensive code examples that should be simplified, with references to the official documentation instead.
- wdp-api-bim-unified references several template.js files:
  - `../api_code_example/bim-core-operations.template.js`
  - `../api_code_example/bim-model-behaviors.template.js`
  - `../api_code_example/bim-component-space.template.js`
  - `../api_code_example/bim-plugin-and-roam.template.js`

## Summary of Findings

After analyzing all 12 sub-skills, we found that:

1. **Template.js References**: 11 out of 12 sub-skills reference template.js files that need to be removed.
2. **api_code_example References**: All 12 sub-skills use the old folder name `api_code_example` instead of `official_api_code_example`.
3. **Code Duplication**: Several sub-skills (wdp-api-coverings-unified, wdp-api-camera-unified, wdp-api-initialization-unified, wdp-api-bim-unified) have extensive code examples that duplicate content from the official documentation.
4. **Workflow References**: Several sub-skills reference workflow files that need to be checked and possibly updated.
5. **External References**: Some sub-skills reference files outside both the sub-skill and official_api_code_example folders.

## Optimization Plan

1. **First Pass**: Update all references from `api_code_example` to `official_api_code_example` and remove all references to template.js files.
2. **Second Pass**: Simplify sub-skills with extensive code examples, focusing on conceptual overviews and references to official documentation.
3. **Third Pass**: Check and update all workflow references and external references.
4. **Final Pass**: Verify all optimizations and ensure consistent structure across all sub-skills.