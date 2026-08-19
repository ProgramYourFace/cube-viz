/**
 * MARK GEOMETRY — the shape of the ink, set once for the app.
 *
 * These used to be per-chart `familyOptions`: `barRadius`, `padAngle`, `fillOpacity`
 * and the rest. Every one of them was honored by the renderer, and every one of them
 * was the wrong kind of question to put in front of someone building a chart. A person
 * opens the editor to answer something about their fleet; "how round should the bar
 * corners be" is not that, and no value they pick is wrong — which is exactly what
 * makes the choice worthless. A knob whose every setting is defensible carries no
 * information, it only carries a decision.
 *
 * So they moved here: ONE resolved geometry for the whole app, supplied by the host
 * through `CubeVizProvider`'s `theme.marks` and defaulted to values that look right
 * without anyone touching them. A saved chart can no longer carry a stale look, the
 * editor has nothing to show for them, and restyling every chart at once is a one-line
 * change instead of a migration.
 *
 * What stays a spec option is what changes MEANING: stacking, orientation, transforms,
 * what each series is called. Appearance is a property of the product; meaning is a
 * property of the chart.
 */

/** The resolved geometry every family renders with. All fields required — see {@link DEFAULT_MARK_THEME}. */
export interface ChartMarkTheme {
  /** Bar corner radius, px. */
  barRadius: number;
  /** Space BETWEEN the bars of one group, as a 0..1 fraction of the group's slot. */
  barGap: number;
  /** Space between CATEGORY bands, as a 0..1 fraction of the band. */
  barCategoryGap: number;
  /** Upper bound on bar thickness, px — keeps a 3-category chart from drawing slabs. */
  maxBarSize: number;
  /** Peak opacity of an OVERLAPPING area's gradient fill (translucent so series behind stay visible). */
  areaFillOpacity: number;
  /**
   * Fill opacity of STACKED / percent area bands. Stacked bands never overlap, so
   * translucency buys nothing and costs legibility: at 0.4 a band over a dark
   * background is indistinguishable from a second overlapping series, which is
   * exactly how users read it. Near-solid ribbons are what make a stack read as
   * "one on top of the other".
   */
  stackedAreaFillOpacity: number;
  /** Stroke width for line + area marks, px. */
  lineWidth: number;
  /** Gap between pie slices, DEGREES. */
  pieGapAngle: number;
  /** Pie/donut slice corner radius, px. */
  pieCornerRadius: number;
  /** Pie outer radius as a percentage of the available radius. */
  pieRadiusPct: number;
  /** Bubble AREA range [min, max] in px² — area, not radius, so size reads honestly. */
  bubbleAreaRange: readonly [number, number];
}

/**
 * The look cube-viz ships with. Chosen to read well in a dashboard TILE — the size
 * every chart here actually renders at — which is why bars are capped and the area
 * fill is light enough to stack two or three deep without turning to mud.
 */
export const DEFAULT_MARK_THEME: ChartMarkTheme = {
  barRadius: 4,
  barGap: 0.1,
  barCategoryGap: 0.2,
  maxBarSize: 64,
  areaFillOpacity: 0.4,
  stackedAreaFillOpacity: 0.85,
  lineWidth: 2,
  pieGapAngle: 0,
  pieCornerRadius: 0,
  pieRadiusPct: 80,
  bubbleAreaRange: [40, 400],
};

/**
 * Fill in whatever the host left out. Called at the render boundary (ChartRenderer),
 * so a family always receives a COMPLETE theme and never has to write `?? 4` — the
 * fallback lives in exactly one place, which is the point of moving these at all.
 */
export function resolveMarkTheme(theme?: Partial<ChartMarkTheme>): ChartMarkTheme {
  return theme ? { ...DEFAULT_MARK_THEME, ...theme } : DEFAULT_MARK_THEME;
}
