/**
 * Opt-in presets — host-side helpers that are NOT part of cube-viz's core/default
 * behavior. Import explicitly from `cube-viz/presets`.
 *
 * - `createUnitFormatter` / `unitFormatter` — a batteries-included metric↔imperial
 *   unit `ValueFormatter` driven by Cube member meta (the consuming app's choice,
 *   not baked into the renderer).
 */
export * from "./unit-formatter";
