I'll produce the chart-options surface design directly. This is a writing task grounded in the research findings already provided, and I have everything I need.

# cube-viz Chart-Options Surface — One Configurable Component per Chart Family

> **Status:** Stable contract, updated for spec v2 (2026-08). This fills `ChartOptions.familyOptions` from the spec-schema design (§3) and defines the per-family option catalog. It is the chart-options agent's deliverable: the renderer maps `NormalizedChartData` + `ChartOptions` onto `@tanstack/charts` marks (Recharts was replaced in 2026-08); specs never carry a single renderer prop. Anything below the line `ChartOptions` → `NormalizedChartData` boundary is implementation; anything above is contract. **v2 changes:** the `combo` family and all dual-axis support were removed; a `heatmap` family was added; the renderer seam is now `src/charts/tanstack.tsx` (§3).
>
> **Since v2 shipped (additive, no version bump):** `chart.transform` — presentation transforms applied once in `ChartRenderer` (§2.9); **temporal category axes** on line/area (§2.2); and the **semantic interaction seam** — brush-to-drill and click-to-cross-filter reported in Cube terms, never pixels (§3.1).

---

## 0. Design axioms for the option layer

1. **One component per *family*, not per *variant*.** Embeddable ships orientation and stacking as separate *component identities* (`BarChartStackedHorizontalPro`, `LineChartGroupedPro`, …). cube-viz inverts this: a single `<BarChart>` takes `orientation` + `stackMode` as typed inputs. The chart-options agent owns exactly the **family-specific** knobs (`familyOptions`); cross-family knobs (legend/tooltip/axes/colors/format) live in the shared envelope already defined in spec-schema §3.
2. **Options are pure data.** Every option is JSON-serializable; no `var()` strings, no functions, no renderer elements. The family components are the *only* place TanStack Charts types appear.
3. **The mapping is the seam.** Family components consume `NormalizedChartData` (`{ categories, series[], raw, empty }`) plus `ChartOptions`. They translate to `defineChart` marks *internally*. Swapping the render library touches only family components — never specs, the adapter, or `familyOptions`. (This guarantee was exercised for real in the 2026-08 Recharts → `@tanstack/charts` migration.)
4. **Defaults are total.** Every family has a complete default option object; a stored spec carries only *overrides*, deep-merged over defaults so a `{}` familyOptions renders a sensible chart.
5. **Format intelligence lives on the data model, behavior on the theme.** We mirror Embeddable's `withUnits` *intent* (member `meta.{unit,quantity,convert}` drives formatting) but **not** its HOC mechanism — see §5.

---

## 1. The family set (8 families) and the Pro-component collapse

cube-viz ships **eight** families. The table below shows which Embeddable `*Pro` components collapse into each. The collapse is the whole point: 20+ vendor components → 8 configurable families, with `orientation`/`stackMode`/`mode`/`series-count` as *inputs*.

| cube-viz family | Embeddable `*Pro` components it absorbs | What becomes an input instead of a component |
|---|---|---|
| **`bar`** | `BarChartPro`, `BarChartHorizontalPro`, `BarChartGroupedPro`, `BarChartGroupedHorizontalPro`, `BarChartStackedPro`, `BarChartStackedHorizontalPro` | `orientation: vertical\|horizontal` × `stackMode: none\|grouped\|stacked\|percent` (the 6 Bar Pros are exactly orientation×stack) |
| **`line`** | `LineChartPro`, `LineChartGroupedPro`, `LineChartMultiPro`, `SparklinePro` | single vs multi-series is just `series.members.length`; sparkline is `chrome:"none"` |
| **`area`** | `AreaChartPro`, `StackedAreaChartPro`, `AreaChartPercentPro` | `stackMode: none\|stacked\|percent` |
| **`pie`** | `PieChartPro`, `DonutChartPro` | donut is `innerRadius > 0`; not a separate component |
| **`scatter`** | `ScatterChartPro`, `BubbleChartPro` | bubble is "bind a measure to `size`"; not a separate component |
| **`kpi`** | `KPIChartPro`, `KPINumberPro`, `ComparisonKPIPro` | comparison is `comparison: {...}`; one Number component |
| **`table`** | `TableChartPro`, `PivotTableChartPro` | pivot is `mapping.series.mode:"pivot"`; one Table component |
| **`heatmap`** | *(no Embeddable ancestor — added in spec v2)* | two dimensions × one measure; color IS the value encoding |

**Justification of the list.** These eight are the union of every chart shape present in the aa-app Cube model's natural questions: time series of measures (`line`/`area`/`bar` over `start_time`/`timestamp`), categorical comparison (`bar` over `device_id`/`event_type`), part-to-whole (`pie` over `event_category`/`shape_kind`), correlation (`scatter` of `avg_speed` × `fuel_efficiency`, bubble-sized by `count`), single-figure roll-ups (`kpi` for `fleet_overview` measures), tabular detail (`table` for `tablePivot` of any view), and density matrices (`heatmap` of a measure over e.g. day × device). Anything Embeddable does beyond this (radar, funnel, sankey, treemap, sunburst) has **no member in the aa-app model** that motivates it; they are deliberately out of scope and can be added as families later without breaking the contract. Radial is folded into `kpi` (a gauge KPI) rather than shipped standalone, since the only radial use here is single-value progress.

> Naming note: spec-schema §3 originally listed `family` as `bar|line|area|pie|scatter|radial|composed|kpi|table`; v1 finalized `composed → combo` and folded `radial` into `kpi` (`kpi.display:"gauge"`). **Spec v2 then removed `combo` entirely** (with all dual-axis support) and added `heatmap` — `loadSpec` migrates v1 combo widgets to `bar`/`line` (see docs/01-spec-schema.md and `src/spec/migrate.ts`).

---

## 2. Per-family option catalog

All families share the envelope from spec-schema §3 (`mapping`, `orientation`, `stackMode`, `legend`, `tooltip`, `axes`, `colors`, `format`, `transform`). Below, **`familyOptions`** is the *family-specific* extension validated by a family-specific zod schema. Each option lists its **renderer primitive** — since the 2026-08 migration these are `@tanstack/charts` mark options (the doc's original Recharts annotations were rewritten to match).

### 2.0 Cross-family states (every family implements these identically)

These are not in `familyOptions` — they are rendering states the family component derives from `NormalizedChartData` + fetch status, so they're specified once:

| State | Trigger | Implementation |
|---|---|---|
| **loading** | adapter fetch pending (`cube().load` in flight, incl. `Continue wait` polling) | `cv-chart-skeleton` placeholder sized to the widget body; no chart mount yet |
| **error** | adapter threw / non-200 | `cv-chart-error` alert with `annotation`-free message; never leaks tenant data |
| **empty** | `NormalizedChartData.empty === true` (noFilter dropped everything or zero rows) | centered muted `cv-chart-empty` "No data"; the chart is not mounted (avoids 0-row axis glitches) |
| **partial** | some series empty | render present series; legend marks absent keys as muted |

The chart shell (`CvChart` in `src/charts/tanstack.tsx`) measures its own box with a `ResizeObserver` and only mounts the TanStack `<Chart>` once it has a non-zero width, with a `minHeight` floor (200px; sparklines exempt) — the widget body sizes charts via CSS.

---

### 2.1 `bar` — the canonical collapse demonstrator

```ts
interface BarFamilyOptions {
  // orientation + stackMode come from the SHARED envelope (ChartOptions), not here.
  // familyOptions = bar-specific geometry only:
  barRadius?: number;             // rounded bar corners → bar mark `radius`
  barCategoryGap?: number | string; // → band-scale `padding` (gap between category clusters)
  barGap?: number | string;       // → `group({ padding })` (gap between bars in a grouped cluster)
  maxBarSize?: number;            // → bar mark `maxThickness`
  showValueLabels?: boolean;      // → a `text` mark per non-null row (valueLabelMarks)
  referenceLines?: ReferenceLineOpt[]; // → `ruleX`/`ruleY` marks + optional `text` labels
  comparePrevious?: boolean;      // previous-period companion series (muted; §2.x shared)
}

interface ReferenceLineOpt {
  axis: "x" | "y";
  value: number;
  label?: string;
  colorToken?: ChartColorToken;   // → stroke="var(--chart-N)"
}
```

**How one component covers all six Bar Pros:**

| Spec input | Translation (inside the bar family, TanStack marks) |
|---|---|
| `orientation:"vertical"` (default) | `barY` mark; x = band (category) scale, y = value scale |
| `orientation:"horizontal"` | `barX` mark — the same rows with x/y channels swapped (axis hide/scale options swap with them) |
| `stackMode:"none"` | `layout: group()` → side-by-side bars per category |
| `stackMode:"grouped"` | same as `none` for bars (explicit alias) |
| `stackMode:"stacked"` | implicit stack: repeated categories stack automatically once `z` is set |
| `stackMode:"percent"` | `layout: stack({ offset: "normalize" })`; value ticks forced to `percent` |
| single vs multi series | ONE mark renders all series from long `SeriesRow`s (§3); `z`/`color` = series label |
| legend on/off | shared envelope `legend` → `colorLegend({ placement })` on the chart color scale, or omitted |
| tooltip | `tooltip` → the shared `cubeTooltip` (structured title + swatched rows, member-aware formatting) |
| axis config | `axes.x/y` → axis `label`/`hide`, `valueScale` (`linear`/`log`, explicit domain), tick format |
| color per series | `NormalizedSeries.colorToken` → chart color scale `domain` (labels) + `range` (`var(--chart-N)`) |

---

### 2.2 `line`

```ts
interface LineFamilyOptions {
  curve?: "linear" | "monotone" | "step" | "natural"; // → d3Curve(...) on the lineY mark
  strokeWidth?: number;           // → lineY `strokeWidth`
  dots?: boolean | "active";      // → lineY `points` (true = always; "active" = focus only)
  connectNulls?: boolean;         // null rows skipped (true) vs preserved as gaps (false)
  chrome?: "full" | "none";       // "none" = sparkline: hide axes/grid/legend/tooltip
  referenceLines?: ReferenceLineOpt[];
  showValueLabels?: boolean;      // → text marks (valueLabelMarks)
  comparePrevious?: boolean;      // dashed/muted previous-period companion series
}
```

| Spec input | Translation |
|---|---|
| multi-series | one `lineY` mark per `NormalizedSeries` (rows built per series via `buildSeriesRows`) |
| `chrome:"none"` (sparkline) | axes/grid/guides/legend/tooltip off, `margin: 4`, compact aspect via `cv-chart--sparkline` |
| `connectNulls` | `skipNull` row filtering (true) — otherwise null rows break the line |
| single data point | forced visible point so a one-bucket series degrades gracefully instead of rendering nothing |
| category member is a **time dimension** | the x axis becomes a real `scaleUtc` instead of the evenly-spaced point scale — see **Temporal axes** below |

Line ignores `orientation`/`stackMode` (validated: a warning if set, no effect — lines don't stack in cube-viz; stacked-line use `area`). **Dual-axis (`SeriesMeta.axis:"right"` + a second y axis) was removed in spec v2** along with the combo family; a series' `meta.axis` is stripped by the v1→v2 migration and ignored.

#### Temporal axes (line + area)

`annotationToAxis(data, options)` in `src/charts/tanstack.tsx` decides, per render, whether this chart's category axis is *honestly* temporal. **Both** halves of the rule must hold — an annotation alone is not enough, and date-looking strings alone are not either:

1. `mapping.category.member` resolves to a `timeDimensions` entry of the **result annotation**. Cube keys a bucketed time dimension as `<member>.<granularity>`, so an exact key match *or* a `<member>.` prefix match counts, and the trailing segment yields the granularity (`GranularitySchema.safeParse`).
2. **Every** category parses as a date: an ISO-shaped string (`looksLikeIsoDate`), or a bare number *only* when a granularity says it is an epoch bucket — a plain numeric dimension must never be silently read as epoch millis.

It also returns `null` when fewer than **two distinct** buckets survive (one bucket has no elapsed spacing to be honest about, and a degenerate utc domain would pin it to the plot edge), and the line family skips the check entirely for a sparkline (`chrome:"none"` — a shape, not an axis).

When it matches, the family switches three things and nothing else:

| | non-temporal (unchanged) | temporal |
|---|---|---|
| x scale | `pointScale()` | d3 **`scaleUtc`** (`categoryScale(temporal)`) |
| x channel on every mark | `"cat"` (the raw category) | `"t"` — a UTC-anchored `Date` per row (`categoryChannel(temporal)`) |
| tick / tooltip / crosshair label | `format.category(v)` | `categoryLabeler(temporal, format)` |

**What this buys:** buckets sit at their true elapsed distance, so a missing day draws as a **gap** instead of collapsing into the next bucket, and irregular buckets stop reading as regular ones.

**Zone-less buckets are anchored as UTC.** Cube emits bucket strings with no offset (`"2026-07-15"`, `"2026-07-15T00:00:00.000"`). Reading those as local time and then plotting/ticking in UTC would shift labels across a day boundary, so `toUtcDate` parses the zone-less shape *as* UTC (offset-bearing strings and epoch millis still go through the vetted `toDate`).

**Tick labels round-trip to the originating bucket.** `categoryLabeler` builds a `Date.getTime() → original category` map: a tick that lands exactly on a bucket formats the **original** category value, so labels are byte-identical to the pre-temporal ones in any viewer timezone — only the *spacing* changed. A `scaleUtc` tick that falls *between* buckets formats its UTC wall clock instead. `referenceLineMarks` receives `temporal.dates` so a category rule is reprojected onto the same x value the marks plot against, and `valueLabelMarks` takes the same `t`/`cat` channel.

**Bars and heatmaps keep band scales** — a bar needs a bandwidth to be drawn in, and both heatmap axes are categorical by construction.

---

### 2.3 `area`

```ts
interface AreaFamilyOptions {
  curve?: "linear" | "monotone" | "step" | "natural"; // → d3Curve(...) on the areaY mark
  fillOpacity?: number;           // → area fill opacity (default 0.4; gradient fill)
  strokeWidth?: number;
  connectNulls?: boolean;
  dots?: boolean;
  referenceLines?: ReferenceLineOpt[];
  comparePrevious?: boolean;
}
```

`stackMode` is the load-bearing input (absorbs `StackedAreaChartPro`/`AreaChartPercentPro`):

| `stackMode` | Translation |
|---|---|
| `none` | overlapping `areaY` marks (each own baseline, stacking opted out), `fillOpacity` lets them show through |
| `stacked` | implicit stack (repeated categories stack once `z` is set) |
| `percent` | `stack({ offset: "normalize" })`; y ticks forced `percent` |

When the spec sets no `stackMode`, the area family defaults it **shape-awarely**: a color-split pivot stacks (parts of a whole); multiple independent measures overlap instead of summing into a misleading band. `orientation` is ignored (areas are time-series-vertical only).

Area gets the same **temporal category axis** as line (see §2.2): a time-dimension category renders on `scaleUtc`, every `areaY`/`lineY` mark reads the `t` channel, and ticks/tooltip/crosshair go through `categoryLabeler`. Both the stacked (one mark over long rows) and the overlap (one mark per series) paths pass `temporal` to `buildSeriesRows`, so the companion previous-period line lands on the same axis as the primaries.

---

### 2.4 `pie` (covers pie + donut)

```ts
interface PieFamilyOptions {
  innerRadiusPct?: number;        // 0 = pie, >0 = donut → radialArc inner radius
  outerRadiusPct?: number;        // → radialArc outer radius
  padAngle?: number;              // → pie() transform `gapAngle`
  cornerRadius?: number;          // → radialArc corner radius
  showLabels?: "none" | "value" | "percent" | "name"; // → radialText slice labels
  centerLabel?: { value?: "total" | string; label?: string }; // donut center text (radialText)
  maxSlices?: number;             // top-N; remainder grouped → "Other" slice (adapter-side aggregation)
}
```

Pie uses `mapping.category` as the slice dimension and **one** measure (`mapping.series.mode:"measures"` with a single member, or `mode:"pivot"` is invalid for pie → validation error). It renders on the TanStack **polar** marks: the eager `pie()` transform allocates angles, `radialArc` draws the slices, `radialText` draws slice/center labels. Per-slice color: the arc's `color` channel is the slice label, and the chart color scale gets an explicit domain (labels) + range (`chart-1..5` token vars, round-robin — cycling for >5 slices, matching Embeddable's numbered ramp), so the built-in legend renders one swatch per slice and pie legends now render correctly.

| Spec input | Translation |
|---|---|
| `innerRadiusPct:0` | full pie (`radialArc` from center) |
| `innerRadiusPct:60` | donut (`radialArc` with 60% inner radius) |
| per-slice color | color scale `domain` = slice labels, `range` = `var(--chart-N)` by post-rollup slice index |
| `centerLabel` | `radialText` in the donut hole |

---

### 2.5 `scatter` (covers scatter + bubble)

```ts
interface ScatterFamilyOptions {
  // mapping for scatter is special: x AND y are measures/dimensions, not category+series.
  x: Member;                      // → numeric x channel  (e.g. device_locations.avg_speed)
  y: Member;                      // → numeric y channel  (e.g. device_trips.fuel_efficiency)
  size?: Member;                  // bubble radius measure → per-point radius
  sizeRange?: [number, number];   // area-px² range mapped through a sqrt radius scale
  groupBy?: Member;               // color points per distinct value (e.g. per device_id)
  shape?: "circle" | "square" | "triangle" | "diamond"; // → point symbol
  referenceLines?: ReferenceLineOpt[];
}
```

Scatter is the one family whose mapping does **not** reduce to category+series: it consumes `raw.rows` (the `tablePivot` output) and projects `{x,y,size}` per point onto a `dot` mark. `size` present ⇒ bubble (absorbs `BubbleChartPro`) via a sqrt bubble-radius scale (the `sizeRange` values keep their historical area-px² semantics). `groupBy` ⇒ the point's color channel with a fixed first-seen domain → ramp-token mapping, so a filtered group never repaints the survivors.

---

### 2.6 `kpi` (covers KPI/Number/Comparison + folded-in radial gauge)

```ts
interface KpiFamilyOptions {
  display?: "number" | "gauge";   // "gauge" absorbs the old radial family
  measure: Member;                // the single value (e.g. fleet_overview.device_trips_total_distance)
  comparison?: {
    mode: "previousPeriod" | "value";
    value?: Member | number;      // baseline for delta
    showAsPercent?: boolean;      // delta as % vs absolute
    goodDirection?: "up" | "down";// colors delta green/red by direction
  };
  sparkline?: { member: Member; timeDimension: Member }; // tiny trend → reuse line chrome:"none"
  gauge?: { min?: number; max: number; thresholds?: { at: number; colorToken: ChartColorToken }[] };
  icon?: string;                  // optional lucide icon name (chrome)
}
```

| Spec input | implementation |
|---|---|
| `display:"number"` | plain styled `<div>` (NOT a chart): big number formatted via `format`, optional delta chip |
| `comparison` | delta computed adapter-side from `compareDateRange`; arrow + color from `goodDirection` |
| `sparkline` | inline `areaY` footer (`currentColor`, inheriting the delta trend color) |
| `display:"gauge"` | polar `radialArc` track + value (240° sweep, parity with the old `RadialBarChart`); thresholds → colored bands, HTML center readout |

A `number` KPI is intentionally **not** a chart — it's a formatted value with a delta, so it renders as a styled card (`cv-kpi-*`). This is the family where "one component" most reduces vendor sprawl (`KPIChartPro`+`KPINumberPro`+`ComparisonKPIPro` → one `<Kpi>`).

---

### 2.7 `table` (covers table + pivot)

```ts
interface TableFamilyOptions {
  columns?: TableColumnOpt[];     // override/order; default = all members from annotation
  pageSize?: number;              // client paging (default 25)
  sortable?: boolean;             // header-click sort (client) → default true
  stickyHeader?: boolean;
  rowHeight?: "compact" | "default";
  showRowNumbers?: boolean;
  conditionalFormat?: CondFormatRule[]; // cell coloring by value
}

interface TableColumnOpt {
  member: Member;
  label?: string;
  format?: FormatOptions;         // per-column number/date/unit formatting
  align?: "left" | "right" | "center";
  width?: number;
  hidden?: boolean;
}

interface CondFormatRule {
  member: Member;
  when: { op: "gt" | "lt" | "gte" | "lte" | "eq"; value: number };
  colorToken?: ChartColorToken;   // cell bg/text tint
}
```

Table does **not** use the chart renderer. It renders a plain styled table (`cv-table-*`) from `raw.rows` (`resultSet.tablePivot()`) and `raw.annotation` (`resultSet.tableColumns()` → titles/types). Pivot mode (`mapping.series.mode:"pivot"`) produces grouped columns via `tableColumns`' nested `children`. Sorting/paging are client-side over `raw.rows`.

---

### 2.8 `heatmap` (added in spec v2)

```ts
interface HeatmapFamilyOptions {
  colorToken?: ChartColorToken;   // the single-hue ramp token; cells shade light→dark within it
  showValues?: boolean;           // print each cell's formatted value inside the cell
}
```

A two-dimension × one-measure matrix drawn with the TanStack `cell` mark. Deliberately minimal options (simplicity over knobs) — the grid's members live in the **generic `mapping` envelope**, not in `familyOptions`:

| Mapping role | Heatmap meaning |
|---|---|
| `mapping.category.member` | the **column** (x) dimension |
| `mapping.series.pivot` | the **row** (y) dimension |
| `mapping.series.value` | the measure that colors each cell |

Both axes are band scales; the value encodes as a single-hue sequential ramp on `colorToken` (`opacity 0.15 → 1.0` realized as `color-mix(var(--chart-N) P%, transparent)`, so it stays theme-adaptive in light and dark). Like scatter/table it consumes `raw.rows` directly (one row per (x, y) pair; duplicates keep the last row). There is **no series legend** (color IS the value encoding) and no cartesian display envelope (orientation/stacking/axis-scale don't apply). The combo family that previously occupied this section was **removed in spec v2** together with all dual-axis support — v1 combo specs migrate to `bar`/`line` (see docs/01-spec-schema.md).

---

### 2.9 Presentation transforms (`chart.transform`) — cross-family, *not* `familyOptions`

The one option in this section that is **not** family-specific. `chart.transform` (spec §3.6) reshapes the already-aggregated, already-normalized series before the family sees it, so "7-day rolling average" / "running total" / "% of total" are a display choice rather than three new Cube measures. It lives in `src/charts/transforms.ts`; the whole module is **pure** and operates on `{ categories, series[].data }`, never on raw rows — which is why no family file changed to gain it.

```ts
chart.transform = { kind: "rollingAvg", window: 7 }   // window: int 2…90, default 7
chart.transform = { kind: "cumulative" }              // window ignored
chart.transform = { kind: "percentOfTotal" }          // window ignored
```

**Where it applies.** `ChartRenderer` calls `familySupportsTransform(descriptor)`, which is `supportsMapping && supportsCartesianAxes && !queryless` — i.e. **bar / line / area**, plus any host family declaring both flags. Deliberately conservative, because a transform reshapes values *along the category axis* and only means something where categories are an ordered, shared axis:

| Excluded | Why |
|---|---|
| `kpi` | one aggregate; there is no category series to roll or sum |
| `table` | shows the raw rows — silently rewriting cells would misrepresent the data |
| `pie` | no category ordering (rolling/cumulative are meaningless) and it already shows shares |
| `scatter` | no `mapping`/category axis at all (x/y live in `familyOptions`) |
| `heatmap` | mapping-driven but **not** cartesian (both axes band, value is a color) — a rolling mean across columns would read as real data |
| host `map` / `ai` | declare neither flag (and `ai` is query-less) |

**Null semantics** (explicit, and the reason each kind reads honestly):

| Kind | Rule |
|---|---|
| `rollingAvg` | trailing mean over `window` categories, per series. Leading positions with fewer than `window` samples average **what exists** rather than emitting null — a leading gap in the line reads as broken data, not as "warming up". Nulls are skipped in **both** the sum and the count, so a gap doesn't drag the mean toward zero; a window containing only nulls stays `null`. |
| `cumulative` | running sum per series. Nulls accumulate as 0 (the total must not reset or jump), but the **output stays null** where the input was null — a genuine gap stays visible instead of being papered over with a flat carried-forward total. |
| `percentOfTotal` | each value as its share (0..1) of the **category total across series** — the same geometry `stackMode: "percent"` expands to, made explicit as data. A zero or non-finite category total yields `null` for that whole category (no divide-by-zero spikes); a null input stays null and contributes nothing to the total. |

**`percentOfTotal` also changes how values are formatted.** A share is no longer in the measure's unit, so:

- `transformedChartFormat(format, transform, locale)` wraps the bound `ChartFormat` and formats **every** value surface (axis ticks, tooltip, value labels) as `Intl` `style:"percent"` with 0 fraction digits — mirroring `percentTick`, so a `percentOfTotal` chart reads identically to a `percent`-stacked one. `null`/`undefined`/`""` return `""` **before** numeric coercion, because `Number(null)` is `0` and a gap must not render as a real "0%". Category formatting is untouched.
- The per-series `meta` is rewritten by `percentSeriesMeta`: `unit`, `quantity` and `convert` are **dropped** (a "42%" suffixed with "km" is a lie, and unit conversion must not re-run) and `format` becomes `{ kind: "percent", decimals: 0 }`. `meta.measure` is **kept** deliberately — it still drives the axis title and tooltip label ("Revenue"), which stay correct.

  These two travel together but do different work: `ChartFormat` is built from the annotation + `options.format` and does not read series meta, so the meta rewrite alone would not change a single rendered tick. It exists to keep the normalized data **self-describing** for any other consumer (image export, a host family, debug).

**Identity discipline.** Series identity is preserved exactly — `key`, `label`, `colorToken` and `meta` carry through untouched (except the unit fields above), so the derived `ChartConfig` is the same either way. With no transform, empty data, or no categories, `applyTransform` returns the **same object**, so the caller's `useMemo` identity stays stable and a non-transformed chart pays nothing.

**Editor surface.** One "Compare" select in the type picker's Options panel (`CustomizeSection`), with the window input revealed only for `rollingAvg`. `hasCustomizeOptions` returns true for a family that supports the transform even when it has no family knobs of its own — that is `line`, which is otherwise edited entirely in context.

---

## 3. The renderer seam — adapter → TanStack marks, with specs never seeing renderer props

The family component is a pure function `(NormalizedChartData, ChartOptions) → ReactElement`: it translates the normalized adapter output into a TanStack `defineChart` definition (marks + scales + color + tooltip) and hands it to the shared `CvChart` shell. The seam lives in **`src/charts/tanstack.tsx`** — the only file that knows how cube-viz's `NormalizedChartData` maps onto the TanStack grammar (the same role `_shared.ts` played for the Recharts stack this seam replaced).

**The long-row shape.** Families feed marks with LONG rows — `SeriesRow`, one row per `(category, series)` pair — built by `buildSeriesRows(data)`:

```ts
/** One (category, series) observation in mark-ready long form. Lives ONLY in src/charts/tanstack.tsx. */
interface SeriesRow {
  cat: string | number;   // category value (x for vertical, y for horizontal charts)
  t?: Date;               // TEMPORAL axis only: `cat` parsed to a UTC-anchored Date (§2.2).
                          // Absent on every non-temporal chart, which keeps reading `cat`.
  value: number | null;   // the measured value (null gaps preserved by the marks)
  key: string;            // series key (Cube member or pivot value) — identity, not display
  label: string;          // series display label — the z/color channel value
  member?: string;        // source measure driving unit formatting for this row
  companion?: boolean;    // previous-period companion series (dashed/lighter styling)
  i: number;              // category index (stable positional identity for motion)
}
```

`z`/`color` are keyed by the series **label** so the built-in legend and grouped tooltip read naturally, while the row still carries the series **key** + source **member** so tooltip/label formatting stays unit-aware. This row shape never appears in a spec and is not exported from the public barrel.

**The shared helpers** (all in `tanstack.tsx`, consumed by every family):

- `seriesColor(data)` — the categorical color mapping: explicit `domain` (labels) + `range` (`var(--chart-N)` token vars) in series order, so a filtered series never repaints the survivors; optionally attaches `colorLegend({ placement })`.
- `legendPlacement` / `legendDisplay` — TanStack legends are **top/bottom only**; `left`/`right` degrade to `bottom` (as before).
- `bandScale` / `pointScale` / `valueScale` — category and value scales; `valueScale` honors the spec's `scale` (`"linear" | "log"`) and `domain` (`[min|"auto", max|"auto"]`).
- `annotationToAxis` / `categoryScale` / `categoryChannel` / `categoryLabeler` — the temporal category axis (§2.2): detect it from the annotation + the categories, then pick `scaleUtc` vs `pointScale`, the `t` vs `cat` channel, and the bucket-round-tripping tick formatter. Returns `null` for every non-temporal chart, so bars/heatmaps and non-date categories are untouched.
- `useTemporalBrush` — the controlled `brushX` range selector (below), mounted only on a temporal axis and only when a host supplied an `onRangeSelect` somewhere up the tree. Returns a **memoized** `ChartControl[]` (or `undefined`) that a family drops into `defineChart({ controls })` and into that definition's deps.
- `resolvePointSelection` — clicked `ChartPoint` → the Cube member + raw value it stands for (below).
- `chartCurve` — cube-viz curve name → TanStack curve contract (via `d3-shape`).
- `resolvedAxisLabels` — spec override wins, else the mapped member's `shortTitle`. (Dual-axis support was removed with the combo family; a series' `meta.axis` is ignored.)
- `cubeTooltip` — the built-in interactive tooltip wired for cube data: structured content (title = formatted category, one swatched row per focused series), member-aware value formatting, `percentShare` for the percent stackMode. Tooltips are pinnable via click (a TanStack built-in behavior).
- `referenceLineMarks` / `valueLabelMarks` — `ruleX`/`ruleY` + `text` marks for reference lines and direct value labels.
- `CvChart` — the family-facing shell: measures its container (`ResizeObserver`), mounts the TanStack React `<Chart>` with the shared **spring-motion renderer** (entrance animation disable-able for live tiles/editor churn), and scopes gradient/clip IDs per instance so several charts share one document. It is **also** the single place click-to-select is wired (below), so every family gets it without knowing about it.

**The seam, stated:**

- **Spec side** carries only `mapping` (which members are categories vs series), `orientation`, `stackMode`, semantic `colorToken`s, and abstract axis/legend/tooltip options. None of these are renderer names.
- **Adapter side** turns the Cube `ResultSet` into `{ categories, series:[{key,label,data,colorToken,meta}] }` — already aligned, already labeled, already formatted-hint-bearing.
- **Family component** is the *only* place that knows `barY`/`lineY`/`areaY`/`cell`, `group()`/`stack({offset})`, band/point scales, `colorLegend`, etc. exist — and `tanstack.tsx` is the only place that knows the `SeriesRow` shape.

So to swap the render library, you reimplement the family components (plus `tanstack.tsx`) against the *same* `(NormalizedChartData, ChartOptions)` signature — the spec, the `familyOptions` schemas, the adapter, the variable model, and every stored JSON file are untouched. This guarantee was exercised in 2026-08 when Recharts was replaced by `@tanstack/charts` with zero spec changes (the simultaneous v2 spec bump came from the combo/dual-axis *feature* removal, not the renderer swap). Interaction gains from the new stack: pinnable tooltips, keyboard focus, spring motion — and range brushing, which was future work on the Recharts stack, now ships as the semantic seam in §3.1.

### 3.1 Semantic interaction — the renderer reports Cube terms, never pixels

cube-viz never hands a host pixels, scene coordinates, or renderer points. A chart reports **what the reader pointed at, in Cube terms**, and the host (or the dashboard, see docs/01 §5) decides what that means. The contract lives in `src/provider/interactions.tsx` and is exported from the root:

```ts
interface RangeSelection { widgetId?: string; member: string; granularity?: Granularity; from: string; to: string; }
interface PointSelection { widgetId?: string; member: string; value: string | number; label: string; }

interface ChartInteractionHandlers {
  onRangeSelect?: (selection: RangeSelection | null) => void;  // brush committed / cleared
  onPointSelect?: (selection: PointSelection | null) => void;  // mark clicked / blank click
}
```

Handlers are **optional end to end**. With none supplied, `rangeEnabled`/`pointEnabled` stay false: no brush is mounted and no `onSelect` is attached, so an existing embed renders and behaves exactly as before. They can be supplied at three nesting levels — `<CubeVizProvider interactions>` → `<Dashboard>` / `<ChartView>` → `<CubeChart>` — and nesting is **innermost-wins per channel**, so a chart that overrides only `onPointSelect` still inherits the dashboard's `onRangeSelect`.

**`CubeChart` publishes the semantic target.** It is the only layer holding both the resolved `mapping` and the bound formatter, so it puts `{ categoryMember, pivotMember, formatCategory }` into the context instead of each family re-deriving them; the shell and the brush read it from there. Nothing is threaded through `ChartRenderer` as props.

**Range brushing** (`useTemporalBrush`, temporal axes only). A controlled `brushX` over the bucket set; only a **commit** is application state (previews follow the pointer locally). A committed drag emits the *semantic* ISO bounds — the bucket strings Cube itself emitted — plus the bare member (no `.granularity` suffix) and the granularity. A blank click commits a zero-width range, which is read as "cleared" and reported as `null`. Because `brushX`'s range is non-nullable, "nothing selected" is a **collapsed** range parked on the first bucket, painted with nothing at all — deliberately not the full extent, because a selection spanning the plot would swallow every new drag as a move-selection gesture.

> **Documented trade-off:** enabling the brush hands plot pointer events to the D3 overlay, so **hover-tooltip inspection gives way to drag-to-select** on that chart. Keyboard focus and the handles' slider role still work. This is why the brush is opt-in per chart rather than always-on.

**Click select** (`CvChart` `onSelect` → `resolvePointSelection`), in order:

1. **Colour split wins over category.** When the series *are* a pivot (`mapping.series.mode === "pivot"`) and the clicked datum belongs to a z/colour group, the click identifies a **series**, so the split dimension and that series' raw pivot value are reported — the more specific signal, and the one a host cross-filters on. (A stacked bar segment, a heatmap cell, or one line of a colour-split chart all land here.)
2. Otherwise the **category** dimension with the row's raw value, labelled through the chart's own bound formatter.
3. A datum that keeps only a display label (pie slices) reports that label as both value and label against the category member.

A click on the **blank surface** is an explicit clear (`null`). A click on a datum the chart cannot name semantically (a KPI gauge arc, an ungrouped bubble) is **ignored** rather than reported as a clear — it was not a deselect. A family whose datum has its own shape supplies `resolveSelection` to name the member itself; `scatter` does exactly that, reporting its `groupBy` value (and nothing at all when ungrouped). Sparklines never attach the handler.

**Identity discipline** runs through the whole seam: handlers are held in latest-refs and reached through two stable emitters, so a host passing a fresh inline arrow every render never changes the context value and therefore never rebuilds a memoized chart definition.


---

## 4. Defaults & partial-merge

Each family ships a complete `DEFAULTS[family]` object. A stored spec's `familyOptions` is **deep-merged over** it (objects merged recursively; **arrays replaced wholesale**, never element-merged, so `referenceLines`/`columns`/`series` are predictable). Envelope options (`legend`/`tooltip`/`axes`/`format`/`colors`) have their own envelope defaults merged the same way.

```ts
const DEFAULTS: Record<ChartFamily, { envelope: Partial<ChartOptions>; familyOptions: object }> = {
  bar: {
    envelope: {
      orientation: "vertical", stackMode: "none",
      legend: { show: true, position: "bottom" },
      tooltip: { show: true, indicator: "dot" },
      format: { kind: "auto" },
    },
    familyOptions: { barRadius: 4, maxBarSize: 64, showValueLabels: false } satisfies BarFamilyOptions,
  },
  line: {
    envelope: { legend: { show: true, position: "bottom" }, tooltip: { show: true, indicator: "line" } },
    familyOptions: { curve: "monotone", strokeWidth: 2, dots: "active", connectNulls: false, chrome: "full" } satisfies LineFamilyOptions,
  },
  area: {
    // No static stackMode: the area renderer defaults it SHAPE-AWARELY (§2.3);
    // an explicit spec stackMode always wins.
    envelope: { legend: { show: true, position: "bottom" }, tooltip: { show: true } },
    familyOptions: { curve: "monotone", fillOpacity: 0.4, strokeWidth: 2, connectNulls: false } satisfies AreaFamilyOptions,
  },
  pie: {
    envelope: { legend: { show: true, position: "right" }, tooltip: { show: true } },
    familyOptions: { innerRadiusPct: 0, outerRadiusPct: 80, showLabels: "percent", maxSlices: 8 } satisfies PieFamilyOptions,
  },
  scatter: {
    envelope: { legend: { show: true, position: "bottom" }, tooltip: { show: true } },
    familyOptions: { shape: "circle", sizeRange: [40, 400] } as Partial<ScatterFamilyOptions>,
  },
  kpi: {
    envelope: { format: { kind: "auto" } },
    familyOptions: { display: "number" } satisfies KpiFamilyOptions as object,
  },
  table: {
    envelope: {},
    familyOptions: { pageSize: 25, sortable: true, stickyHeader: true, rowHeight: "default" } satisfies TableFamilyOptions,
  },
  heatmap: {
    // No legend envelope: the heatmap has no series legend (color encodes the value).
    envelope: { tooltip: { show: true, indicator: "dot" }, format: { kind: "auto" } },
    familyOptions: { colorToken: "chart-1", showValues: false } satisfies HeatmapFamilyOptions,
  },
};

function mergeDefaults<F extends ChartFamily>(family: F, partial?: object): object {
  return deepMerge(DEFAULTS[family].familyOptions, partial ?? {}); // arrays: replace, objects: recurse
}
function resolveOptions(opts: ChartOptions): ChartOptions {
  const d = DEFAULTS[opts.family];
  return { ...deepMerge(d.envelope, opts), familyOptions: deepMerge(d.familyOptions, opts.familyOptions ?? {}) };
}
```

**Default rationale per family:**

- **bar** — vertical + unstacked is the least-surprising comparison chart; rounded corners + legend match the shadcn examples.
- **line** — `monotone` curve and `connectNulls:false` (gaps are honest; `fillMissingDates:true` in the adapter already injects bucket rows, so a genuine null = a genuine gap).
- **area** — no static `stackMode` default: the renderer picks shape-awarely (§2.3 — pivot splits stack, independent measures overlap); an explicit spec value wins.
- **pie** — `maxSlices:8` + auto-"Other" prevents the 30-slice unreadable pie that the aa-app `device_id`/`address` dimensions would otherwise produce.
- **kpi** — `number` (the 90% case); gauge is opt-in.
- **table** — paged + sortable + sticky header (the obvious table affordances).
- **heatmap** — `chart-1` ramp + `showValues:false`: the color field is the signal; in-cell numbers are opt-in.

Validation (zod) runs **after** merge so required-but-defaulted fields (e.g. `scatter.x`/`y` present, `pie` single-measure) are enforced on the resolved object.

---

## 5. Number / date / unit formatting — mirror `withUnits`' *intent*, not its *mechanism*

aa-app-embeddable's `withUnits(base)` HOC wraps every chart to (1) inject a `__unitPlan` from `clientContext.unitSystem`, (2) convert each `DataResponse` row to the viewer's units, and (3) append `(km)`/`(mi)` to member display names. It reads unit/quantity/convert off each Cube member's `meta` and converts via a hand-rolled `UNIT_RULES` table.

**Decision: cube-viz adopts the *data-model-driven* intent but rejects the HOC and the hand-rolled rules.**

| `withUnits` does | cube-viz does instead | why |
|---|---|---|
| Wrap each of ~25 components in an HOC | **No HOC.** Formatting is a single resolver `makeFormatter(format, annotation)` called inside every family component | We already have *one* component per family (8, not 25), so there's nothing to wrap-to-dedupe; the HOC existed to fight Embeddable's component sprawl that cube-viz doesn't have |
| Convert rows in the component | **Convert in the adapter** (§6 of spec-schema), before normalization | Keeps family components quantity-agnostic; conversion happens once, at the boundary, on `NormalizedSeries.data` |
| Hand-rolled `UNIT_RULES` (km→mi, etc.) | **A vetted units library** for conversions | Project memory: "libraries over custom math" (Turf-style guidance). Convert via `convert-units`/`js-quantities` keyed by member `meta.unit`, not a bespoke table |
| Read `meta.{unit,quantity,convert}` off members | **Same** — meta is the source of truth | Decoupling preserved: a new measure needs zero component code |
| `formatDurationPrecise` for `quantity:'time'` → "2d 19h" | **Same behavior, centralized** in the theme/registry formatter, not per chart | Embeddable put `dataNumberFormatter` on the *theme* precisely so duration logic stayed DRY; cube-viz keeps one formatter, defaulted by quantity |
| Append `(km)`/`(ms)` to labels & exports | **Same** — `format.suffix` derived from resolved unit; export menu `(ms)` handled by the table/CSV exporter once | One place to make `meta.quantity:'time'` render as `2d 19h` everywhere |

**The resolver (the single formatting seam):**

```ts
function makeFormatter(spec: FormatOptions | undefined, ann: ResultAnnotation) {
  return (value: number, member?: Member): string => {
    const m = member ? ann.measures[member] ?? ann.dimensions[member] : undefined;
    const meta = m?.meta;                                  // { unit, quantity, convert }
    // 1) resolve kind: explicit spec.kind, else auto from quantity
    const kind = spec?.kind && spec.kind !== "auto" ? spec.kind
      : meta?.quantity === "time" ? "duration"
      : meta?.convert === false && isRatio(meta) ? "percent"
      : "number";
    // 2) unit-convert via vetted lib when convert !== false and unitSystem differs
    const v = (meta?.convert !== false && spec?.unitSystem)
      ? convertUnits(value, meta!.unit, targetUnit(meta!.unit, spec.unitSystem)) : value;
    // 3) format by kind (duration → "2d 19h" via a duration lib; percent/currency/number via Intl.NumberFormat)
    return formatByKind(kind, v, { ...spec, suffix: spec?.suffix ?? unitSuffix(meta, spec?.unitSystem) });
  };
}
```

- **Defaults from the data model.** `format.kind:"auto"` (the default) derives: `quantity:'time'` → `duration`; `convert:false` ratio members → `percent`; everything else → `number` with the member's unit suffix. The aa-app values are stored in metric base units (km, L, km/h, ms) and carry `meta.unit`, so this "just works" with zero per-chart config — exactly Embeddable's decoupling.
- **Overrides win.** A spec's `format` (`decimals`/`abbreviate`/`prefix`/`suffix`/`unitSystem`/`dateFormat`) overrides the derived default, per-chart or per-series (`SeriesMeta.format`) or per-column (`TableColumnOpt.format`).
- **Dates.** Time-dimension category buckets format by `format.dateFormat` (a `date-fns`/`Intl.DateTimeFormat` pattern), defaulted by the resolved granularity (`day`→`MMM d`, `month`→`MMM yyyy`, etc.). Date math goes through a vetted date lib, never hand-rolled — again per project memory.
- **Casting.** Because Cube returns measures as **strings** unless `castNumerics:true`, the adapter always loads with `castNumerics:true`; the formatter therefore always receives real `number`s and never re-parses.
- **Never re-derive titles.** Labels come from `annotation().shortTitle` (then `SeriesMeta.label` override) — the formatter handles *values*, the adapter handles *labels*.

This gives the same DRY, unit-aware, duration-savvy behavior `withUnits` delivered across 25 Embeddable components, but with one resolver, conversions from a vetted library, and zero HOC wrapping — appropriate because cube-viz's one-component-per-family design already eliminated the sprawl the HOC was invented to manage.

---

## 6. Summary

| Family | Absorbs (Embeddable Pro) | Load-bearing inputs | Renderer primitive (TanStack marks) | Uses the chart renderer? |
|---|---|---|---|---|
| `bar` | 6 Bar Pros | `orientation`×`stackMode`, multi-`series` | `barY`/`barX` (`group()`/implicit stack/`stack({offset:"normalize"})`) | yes |
| `line` | Line/Grouped/Multi/Sparkline | `series.length`, `chrome`, `connectNulls` | `lineY` (+ crosshair) | yes |
| `area` | Area/Stacked/Percent | `stackMode` (shape-aware default) | `areaY` (implicit stack / `offset:"normalize"`) | yes |
| `pie` | Pie/Donut | `innerRadiusPct`, `maxSlices` | polar `pie()`+`radialArc`+`radialText` | yes |
| `scatter` | Scatter/Bubble | `x`/`y`/`size`/`groupBy` | `dot` (sqrt bubble-radius scale) | yes |
| `kpi` | KPI/Number/Comparison/Radial | `display`, `comparison`, `gauge` | styled card / polar `radialArc` gauge + `areaY` sparkline | gauge/sparkline only |
| `table` | Table/Pivot | `columns`, pivot via `mapping` | styled `cv-table-*` table | no |
| `heatmap` | *(new in v2)* | `mapping` (category=columns, pivot=rows, value=measure), `colorToken`, `showValues` | `cell` (+ optional `text`) | yes |

**The contract:** eight families; cross-family knobs in the shared envelope; family-specific knobs in `familyOptions` (one zod schema per family); every family is a pure `(NormalizedChartData, ChartOptions) → ReactElement` with the render library confined inside (`src/charts/tanstack.tsx` + the family files); total defaults deep-merged (arrays replaced) then validated; formatting driven by Cube member `meta` with overrides, implemented as one resolver using vetted unit/date libraries — mirroring `withUnits`' data-model intent while discarding its HOC. Specs never contain a renderer prop, so the rendering library can be replaced by reimplementing eight components against this unchanged signature — proven by the 2026-08 Recharts → `@tanstack/charts` swap.
---

## 7. Open questions / known gaps

Real, currently-unresolved items. Each is either verified in the code today or a bounded risk we have accepted — none are speculative.

### 7.1 A bucketed date column renders as em-dashes in the `table` family

**Verified, and pre-existing** (it predates the channel well model — the old per-family `placeTable` writer stored the same shape).

`TableFamily` resolves each column with `row[col.member]` (`resolveColumns` → `renderCell` in `src/charts/table.tsx`), where `col.member` is the member string the editor stored. For a **time dimension with a granularity**, the editor stores the *bare* member (`trips.start_time`) — the picker's member name, bound into `query.timeDimensions[0].dimension` — while Cube's `tablePivot()` keys that column `trips.start_time.day`. The lookup misses, `renderCell` receives `undefined`, and its no-data branch prints `—` for every row.

The `heatmap` family already solves exactly this with `rowKeyFor(rows, member)`: if `member` is not a key of the first row, fall back to the first key with a `<member>.` prefix. The fix is to apply the same resolution in the table's column resolver (and to the sort comparator, which indexes rows by the same key). Not done here because it touches the table family's rendering, which this change set does not own.

Note the well model does *not* have the same ambiguity: `annotationToAxis` (§2.2) matches a bare member against a `<member>.<granularity>` annotation key on purpose, so temporal axes are unaffected.

### 7.2 TanStack Charts is pre-1.0 — the brush and scale APIs may churn

cube-viz pins `@tanstack/charts` `^0.9.0`. The interaction seam (§3.1) reaches into the newest and least-settled parts of that surface: `interaction/brush` (`brushX`, `BrushRange`, `BrushXChange`), `interaction/signal` (`controlledSignal`), and the `defineChart({ controls })` slot; the temporal axis (§2.2) additionally hands a raw d3 `scaleUtc` to the `x.scale` contract. A minor release of a 0.x package may rename or reshape any of them.

The exposure is deliberately bounded: **all of it is confined to `src/charts/tanstack.tsx`**, the same file the Recharts → TanStack swap already proved is the only renderer-aware seam. Nothing above it — the spec, the `RangeSelection`/`PointSelection` contract, `familyOptions`, the adapter, stored JSON — names a TanStack type. An upstream break is a rewrite of one file, not a spec migration.

### 7.3 A chart with the brush enabled loses hover inspection

Not a bug — a **trade-off with no current workaround**, restated here because it is the one behavioral cost of the interaction seam. Mounting `brushX` gives the D3 overlay pointer events across the plot, so on that chart hover-tooltip inspection gives way to drag-to-select. Keyboard focus and the handles' slider role continue to work.

This is why range selection is opt-in per chart (no `onRangeSelect` anywhere up the tree ⇒ no brush is mounted, and `DashboardDrill` additionally refuses to advertise a handler on a board with no `dateRange` variable binding to write to). A chart that must keep hover inspection simply does not receive a range handler. Whether the two can coexist — a modifier-gated drag, or an inspection affordance that survives the overlay — is upstream-dependent (see §7.2).
