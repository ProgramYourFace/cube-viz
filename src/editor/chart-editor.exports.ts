/**
 * Public surface of the ChartEditor (B2, docs/03 §A3.1). Kept as a standalone
 * re-export file so the chart-editor and dashboard-editor can each own their barrel
 * without clobbering a shared `editor/index.ts`; the main barrel re-exports from here.
 */

export { ChartEditor } from "./ChartEditor";
export type { ChartEditorProps } from "./ChartEditor";

// Chart Builder v4 — the panel-less, on-chart editing surface (docs/05): field slots
// arranged around the live preview. Reusable by a host that wants to wrap its own
// chart preview with the same direct-manipulation slots. The pure well↔spec seam
// (`chart/builder/wells.ts` dispatching to the channel interpreter in
// `chart/builder/channels.ts`, + `axis.ts`) sits unchanged underneath.
export { ChartEditOverlay } from "./chart/onchart/ChartEditOverlay";
export type { ChartEditOverlayProps } from "./chart/onchart/ChartEditOverlay";

export { FilterBuilder } from "./chart/FilterBuilder";
export type { FilterBuilderProps } from "./chart/FilterBuilder";

// The pure typed-well shapes that the public `ChartFamilyDescriptor` references
// (`wells: WellDef[]`, `placeField?(..., kind: FieldKind)`). A host registering its
// own family needs these to type its `wells` array and placement-hook params.
//
// A well may now declare WHERE its member lives in the spec (`target: WellTarget`) and
// WHICH visual role it feeds (`channel: Channel`). Declaring both opts the well into
// the generic interpreter — the host gets read/place/remove and lossless type-switching
// for free and can skip the `readWells`/`placeField`/`removeField` hooks entirely. A
// well with no `target` stays host-managed, as before.
export type { WellDef, FieldKind, WellTarget, Channel } from "./chart/builder/wells";

// The adaptive default time bucket for a freshly-placed date (span-aware: ≤2 days →
// hour, ≤90 → day, ≤730 → month, else year). Host families with their own time well
// reuse it so their placement matches the builtins'.
export { adaptiveGranularity } from "./chart/builder/wells";

// Host geo families reproduce a filled synthetic location id from their stored pair.
export { geoPointId } from "./primitives/meta-helpers";

// The `/v1/meta` projection the editor itself runs on, exported so hosts can build
// meta-driven UI OUTSIDE the library (e.g. aa-app's chart-creation wizard reads the
// same atlas paths / grains / aggregate families the field picker renders) without
// re-parsing Cube meta themselves. Pure functions over `useCubeMeta()`'s result.
export {
  canonicalTimeOf,
  collapseFamilies,
  familyKeyOf,
  findCube,
  findMember,
  grainAggLabel,
  listCubes,
  listMembers,
  memberAgg,
  memberAggDefault,
  memberCanonicalTime,
  memberFamilyTitle,
  memberGroup,
  pathLabel,
} from "./primitives/meta-helpers";
export type { CubeOption, FamilyRow, MemberKind, MemberOption } from "./primitives/meta-helpers";

// The controlled-spec engine (validate + debounce-emit), for advanced hosts.
export { useChartEditorState } from "./chart/useChartEditorState";
export type {
  UseChartEditorState,
  UseChartEditorStateOptions,
  ChartEditorIssue,
} from "./chart/useChartEditorState";
