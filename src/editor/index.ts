/**
 * Editors — the chart editor (build/edit a ChartSpec from Cube /meta with live
 * preview) and the dashboard editor (drag/resize widgets; add charts/text/inputs;
 * select-to-edit; variables panel). JSON-in / JSON-out; the host owns persistence.
 *
 * The edit UI is a placement-agnostic, container-responsive surface — no mobile
 * chrome (bottom sheets etc.). On mobile the host shell (e.g. a React Native
 * WebView) owns presentation.
 */
export * from "./chart-editor.exports";
export * from "./dashboard-editor.exports";
