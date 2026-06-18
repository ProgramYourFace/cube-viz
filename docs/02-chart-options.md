I'll produce the chart-options surface design directly. This is a writing task grounded in the research findings already provided, and I have everything I need.

# cube-viz Chart-Options Surface — One Configurable Component per Chart Family

> **Status:** Stable contract proposal, v1. This fills `ChartOptions.familyOptions` from the spec-schema design (§3) and defines the per-family option catalog. It is the chart-options agent's deliverable: the renderer maps `NormalizedChartData` + `ChartOptions` onto Recharts; specs never carry a single Recharts prop. Anything below the line `ChartOptions` → `NormalizedChartData` boundary is implementation; anything above is contract.

---

## 0. Design axioms for the option layer

1. **One component per *family*, not per *variant*.** Embeddable ships orientation and stacking as separate *component identities* (`BarChartStackedHorizontalPro`, `LineChartGroupedPro`, …). cube-viz inverts this: a single `<BarChart>` takes `orientation` + `stackMode` as typed inputs. The chart-options agent owns exactly the **family-specific** knobs (`familyOptions`); cross-family knobs (legend/tooltip/axes/colors/format) live in the shared envelope already defined in spec-schema §3.
2. **Options are pure data.** Every option is JSON-serializable; no `var()` strings, no functions, no Recharts elements. The renderer is the *only* place Recharts types appear.
3. **The mapping is the seam.** Family components consume `NormalizedChartData` (`{ categories, series[], raw, empty }`) plus `ChartOptions`. They translate to Recharts props *internally*. Swapping Recharts touches only family components — never specs, the adapter, or `familyOptions`.
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
| **`combo`** | `ComboChartPro`, `BarLineChartPro`, `DualAxisChartPro` | per-series `render: bar\|line\|area` + `axis: left\|right` |

**Justification of the list.** These eight are the union of every chart shape present in the aa-app Cube model's natural questions: time series of measures (`line`/`area`/`bar` over `start_time`/`timestamp`), categorical comparison (`bar` over `device_id`/`event_type`), part-to-whole (`pie` over `event_category`/`shape_kind`), correlation (`scatter` of `avg_speed` × `fuel_efficiency`, bubble-sized by `count`), single-figure roll-ups (`kpi` for `fleet_overview` measures), tabular detail (`table` for `tablePivot` of any view), and mixed-metric overlays (`combo` for `total_distance` bars + `avg_speed` line on dual axes). Anything Embeddable does beyond this (radar, funnel, sankey, treemap, sunburst) has **no member in the aa-app model** that motivates it; they are deliberately out of scope for v1 and can be added as families later without breaking the contract. Radial is folded into `kpi` (a gauge KPI) rather than shipped standalone, since the only radial use here is single-value progress.

> Naming note: spec-schema §3 listed `family` as `bar|line|area|pie|scatter|radial|composed|kpi|table`. This design **finalizes** that list to the eight above: `composed → combo` (clearer), and `radial` folded into `kpi` (`kpi.display:"gauge"`). This is an additive/rename refinement; if the spec-schema enum ships first, the renderer treats `composed` as an alias of `combo` and `radial` as `kpi{display:"gauge"}`.

---

## 2. Per-family option catalog

All families share the envelope from spec-schema §3 (`mapping`, `orientation`, `stackMode`, `legend`, `tooltip`, `axes`, `colors`, `format`). Below, **`familyOptions`** is the *family-specific* extension validated by a family-specific zod schema. Each option lists its **Recharts/shadcn primitive**.

### 2.0 Cross-family states (every family implements these identically)

These are not in `familyOptions` — they are rendering states the family component derives from `NormalizedChartData` + fetch status, so they're specified once:

| State | Trigger | Recharts/shadcn implementation |
|---|---|---|
| **loading** | adapter fetch pending (`cube().load` in flight, incl. `Continue wait` polling) | shadcn `<Skeleton>` sized to `ChartContainer`'s height class; no Recharts mount yet |
| **error** | adapter threw / non-200 | shadcn `<Alert variant="destructive">` with `annotation`-free message; never leaks tenant data |
| **empty** | `NormalizedChartData.empty === true` (noFilter dropped everything or zero rows) | centered muted `<div>` "No data" inside `ChartContainer`; Recharts not mounted (avoids 0-row axis glitches) |
| **partial** | some series empty | render present series; legend marks absent keys as muted |

`ChartContainer` **always** carries a height class (`min-h-[200px]`/`aspect-*`) so `ResponsiveContainer` can measure on first paint — a hard Recharts 3 requirement.

---

### 2.1 `bar` — the canonical collapse demonstrator

```ts
interface BarFamilyOptions {
  // orientation + stackMode come from the SHARED envelope (ChartOptions), not here.
  // familyOptions = bar-specific geometry only:
  barRadius?: number;             // rounded bar corners → <Bar radius={[r,r,0,0]} /> (top corners; flips for horizontal)
  barCategoryGap?: number | string; // → <BarChart barCategoryGap>  (gap between category clusters)
  barGap?: number | string;       // → <BarChart barGap>  (gap between bars in a grouped cluster)
  maxBarSize?: number;            // → <Bar maxBarSize>
  showValueLabels?: boolean;      // → <LabelList dataKey valueAccessor> on each <Bar>
  referenceLines?: ReferenceLineOpt[]; // → <ReferenceLine y={..}|x={..} label stroke>
}

interface ReferenceLineOpt {
  axis: "x" | "y";
  value: number;
  label?: string;
  colorToken?: ChartColorToken;   // → stroke="var(--chart-N)"
}
```

**How one component covers all six Bar Pros:**

| Spec input | Recharts translation (inside `<BarChart>`) |
|---|---|
| `orientation:"vertical"` (default) | `<BarChart>` default layout; `XAxis type="category"`, `YAxis type="number"` |
| `orientation:"horizontal"` | `<BarChart layout="vertical">`; **swap**: `YAxis type="category" dataKey=index`, `XAxis type="number"` |
| `stackMode:"none"` | each series `<Bar>` with **no** `stackId` → grouped side-by-side (Recharts default for multiple Bars) |
| `stackMode:"grouped"` | same as `none` for bars (explicit alias); distinct `stackId` per series |
| `stackMode:"stacked"` | every `<Bar>` shares one `stackId="s"` (or `SeriesMeta.stackId` groups) |
| `stackMode:"percent"` | shared `stackId` + `<BarChart stackOffset="expand">`; y-axis `tickFormat` forced to `percent` |
| single vs multi series | `series.length === 1` → one `<Bar>`; N → N `<Bar>` elements mapped from `NormalizedSeries[]` |
| legend on/off | shared envelope `legend` → `<ChartLegend content={<ChartLegendContent/>}/>` rendered or omitted |
| tooltip | `tooltip` → `<ChartTooltip content={<ChartTooltipContent indicator=.. />}/>` |
| axis config | `axes.x/y` → `<XAxis/>`/`<YAxis/>` `hide`/`scale`/`domain`/`tickFormatter` |
| color per series | `NormalizedSeries.colorToken` → `<Bar fill="var(--chart-N)">` (via `ChartConfig` `--color-<key>`) |

---

### 2.2 `line`

```ts
interface LineFamilyOptions {
  curve?: "linear" | "monotone" | "step" | "natural"; // → <Line type=...>
  strokeWidth?: number;           // → <Line strokeWidth>
  dots?: boolean | "active";      // → <Line dot={false|true} activeDot>
  connectNulls?: boolean;         // → <Line connectNulls>  (gaps from null in NormalizedSeries.data)
  showArea?: boolean;             // light area fill under line → switch to <Area> w/ low fillOpacity
  chrome?: "full" | "none";       // "none" = sparkline: hide axes/grid/legend/tooltip
  referenceLines?: ReferenceLineOpt[];
  showValueLabels?: boolean;      // → <LabelList> on <Line>
}
```

| Spec input | Recharts |
|---|---|
| multi-series | one `<Line dataKey>` per `NormalizedSeries.key` inside `<LineChart>` |
| `chrome:"none"` (sparkline) | `<LineChart>` with `<XAxis hide/> <YAxis hide/>` no grid/legend/tooltip; container `aspect-[4/1]` |
| `connectNulls` | `<Line connectNulls={true}>`; otherwise nulls break the line |
| dual axis | `SeriesMeta.axis:"right"` → that `<Line yAxisId="right">` + a second `<YAxis yAxisId="right" orientation="right">` |

Line ignores `orientation`/`stackMode` (validated: a warning if set, no effect — lines don't stack in cube-viz; stacked-line use `area`).

---

### 2.3 `area`

```ts
interface AreaFamilyOptions {
  curve?: "linear" | "monotone" | "step" | "natural"; // → <Area type>
  fillOpacity?: number;           // → <Area fillOpacity>  (default 0.4)
  strokeWidth?: number;
  connectNulls?: boolean;
  dots?: boolean;
  referenceLines?: ReferenceLineOpt[];
}
```

`stackMode` is the load-bearing input (absorbs `StackedAreaChartPro`/`AreaChartPercentPro`):

| `stackMode` | Recharts |
|---|---|
| `none` | overlapping `<Area>` (each own baseline), `fillOpacity` lets them show through |
| `stacked` | every `<Area stackId="a">` |
| `percent` | shared `stackId` + `<AreaChart stackOffset="expand">`; y forced `percent` |

`orientation` is ignored (areas are time-series-vertical only).

---

### 2.4 `pie` (covers pie + donut)

```ts
interface PieFamilyOptions {
  innerRadiusPct?: number;        // 0 = pie, >0 = donut → <Pie innerRadius={`${n}%`}>
  outerRadiusPct?: number;        // → <Pie outerRadius>
  padAngle?: number;              // → <Pie paddingAngle>
  cornerRadius?: number;          // → <Pie cornerRadius>
  showLabels?: "none" | "value" | "percent" | "name"; // → <Pie label> / <LabelList>
  centerLabel?: { value?: "total" | string; label?: string }; // donut center text (custom <text>)
  maxSlices?: number;             // top-N; remainder grouped → "Other" slice (adapter-side aggregation)
}
```

Pie uses `mapping.category` as the slice dimension and **one** measure (`mapping.series.mode:"measures"` with a single member, or `mode:"pivot"` is invalid for pie → validation error). Per-slice color comes from the **data row** (`fill: "var(--chart-N)"`), not the series element — a Recharts 3 requirement for `<Cell>`. The renderer assigns `chart-1..5` round-robin (cycling for >5 slices), matching Embeddable's numbered ramp.

| Spec input | Recharts |
|---|---|
| `innerRadiusPct:0` | `<Pie>` (full pie) |
| `innerRadiusPct:60` | `<Pie innerRadius="60%">` (donut) |
| per-slice color | `data.map((d,i) => <Cell fill={`var(--chart-${(i%5)+1})`}/>)` |
| `centerLabel` | absolutely-positioned `<text>` in donut hole via `<Label content>` |

---

### 2.5 `scatter` (covers scatter + bubble)

```ts
interface ScatterFamilyOptions {
  // mapping for scatter is special: x AND y are measures/dimensions, not category+series.
  x: Member;                      // → <XAxis type="number" dataKey>  (e.g. device_locations.avg_speed)
  y: Member;                      // → <YAxis type="number" dataKey>  (e.g. device_trips.fuel_efficiency)
  size?: Member;                  // bubble radius measure → <ZAxis dataKey range=[min,max]>
  sizeRange?: [number, number];   // → <ZAxis range>
  groupBy?: Member;               // one <Scatter> series per distinct value (e.g. per device_id)
  shape?: "circle" | "square" | "triangle" | "diamond"; // → <Scatter shape>
  referenceLines?: ReferenceLineOpt[];
}
```

Scatter is the one family whose mapping does **not** reduce to category+series: it consumes `raw.rows` (the `tablePivot` output) and projects `{x,y,z}` per point. `size` present ⇒ bubble (absorbs `BubbleChartPro`) via Recharts `<ZAxis>`. `groupBy` ⇒ multiple `<Scatter>` series, each colored from the ramp.

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
| `display:"number"` | plain styled `<div>` (NOT Recharts): big number formatted via `format`, optional delta chip |
| `comparison` | delta computed adapter-side from `compareDateRange`; arrow + color from `goodDirection` |
| `sparkline` | embed a `line` family render with `chrome:"none"` |
| `display:"gauge"` | Recharts `<RadialBarChart><RadialBar/></RadialBarChart>` with `startAngle/endAngle`; thresholds → colored arcs |

A `number` KPI is intentionally **not** Recharts — it's a formatted value with a delta, so it renders as a shadcn card. This is the family where "one component" most reduces vendor sprawl (`KPIChartPro`+`KPINumberPro`+`ComparisonKPIPro` → one `<Kpi>`).

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

Table does **not** use Recharts. It renders shadcn `<Table>` from `raw.rows` (`resultSet.tablePivot()`) and `raw.annotation` (`resultSet.tableColumns()` → titles/types). Pivot mode (`mapping.series.mode:"pivot"`) produces grouped columns via `tableColumns`' nested `children`. Sorting/paging are client-side over `raw.rows`.

---

### 2.8 `combo` (covers combo / bar+line / dual-axis)

```ts
interface ComboFamilyOptions {
  series: ComboSeriesOpt[];       // per-series render type + axis — THIS is the combo seam
  referenceLines?: ReferenceLineOpt[];
}

interface ComboSeriesOpt {
  member: Member;                 // a measure from query
  render: "bar" | "line" | "area";// → <Bar>|<Line>|<Area> inside <ComposedChart>
  axis?: "left" | "right";        // → yAxisId; "right" mounts a 2nd <YAxis>
  colorToken?: ChartColorToken;
  stackId?: string;               // bars/areas with same stackId stack
  curve?: "linear" | "monotone" | "step"; // line/area only
  label?: string;
}
```

Combo renders `<ComposedChart>` and maps each `ComboSeriesOpt` to `<Bar>`/`<Line>`/`<Area>` by `render`, with `yAxisId` from `axis`. This single family absorbs `ComboChartPro` (mixed), `BarLineChartPro` (one bar + one line), and `DualAxisChartPro` (`axis:"right"` on some series). `mapping.category` is the shared x; `mapping.series` is ignored (combo declares series inline so each can pick its render type).

---

## 3. The mapping seam — adapter → Recharts, with specs never seeing Recharts props

The family component is a pure function `(NormalizedChartData, ChartOptions) → ReactElement`. Here is the **bar** family's seam in full, showing that no Recharts shape ever appears in the spec — it's all derived from the normalized adapter output.

```tsx
function BarChartFamily({ data, options }: { data: NormalizedChartData; options: ChartOptions }) {
  if (loading) return <Skeleton className="min-h-[240px]" />;
  if (error)   return <Alert variant="destructive">…</Alert>;
  if (data.empty) return <EmptyState />;

  const fo = mergeDefaults("bar", options.familyOptions);   // §4
  const horizontal = options.orientation === "horizontal";
  const stacked = options.stackMode === "stacked" || options.stackMode === "percent";

  // 1) ChartConfig is DERIVED from normalized series — colors/labels flow to shadcn --color-<key>
  const chartConfig: ChartConfig = Object.fromEntries(
    data.series.map(s => [s.key, { label: s.label, color: `var(--${s.colorToken ?? defaultRamp(s)})` }])
  );

  // 2) recharts-shaped row array is built HERE, from categories + series.data (never in the spec)
  const rows = data.categories.map((cat, i) => ({
    __cat: cat,
    ...Object.fromEntries(data.series.map(s => [s.key, s.data[i]])),
  }));

  const numberFmt = makeFormatter(options.format, data.raw.annotation); // §5

  return (
    <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
      <BarChart data={rows} layout={horizontal ? "vertical" : "horizontal"}
                stackOffset={options.stackMode === "percent" ? "expand" : undefined}
                barGap={fo.barGap} barCategoryGap={fo.barCategoryGap}>
        <CartesianGrid vertical={!horizontal} />
        {horizontal
          ? (<><YAxis type="category" dataKey="__cat" hide={options.axes?.y?.hide}/>
                <XAxis type="number" tickFormatter={numberFmt} domain={domainOf(options.axes?.x)}/></>)
          : (<><XAxis type="category" dataKey="__cat" hide={options.axes?.x?.hide}/>
                <YAxis type="number" tickFormatter={numberFmt} scale={options.axes?.y?.scale ?? "auto"}/></>)}
        {options.tooltip?.show !== false &&
          <ChartTooltip content={<ChartTooltipContent indicator={options.tooltip?.indicator ?? "dot"} />} />}
        {options.legend?.show &&
          <ChartLegend content={<ChartLegendContent />} verticalAlign={legendVA(options.legend.position)} />}
        {data.series.map(s => (
          <Bar key={s.key} dataKey={s.key}
               stackId={stacked ? (s.meta?.stackId ?? "stack") : undefined}
               fill={`var(--color-${s.key})`}            // resolves via ChartConfig
               radius={cornerRadius(fo.barRadius, horizontal)}
               maxBarSize={fo.maxBarSize}>
            {fo.showValueLabels && <LabelList dataKey={s.key} formatter={numberFmt} />}
          </Bar>
        ))}
        {fo.referenceLines?.map((r, k) => (
          <ReferenceLine key={k} {...(r.axis === "y" ? { y: r.value } : { x: r.value })}
                         label={r.label} stroke={`var(--${r.colorToken ?? "muted-foreground"})`} />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
```

**The seam, stated:**

- **Spec side** carries only `mapping` (which members are categories vs series), `orientation`, `stackMode`, semantic `colorToken`s, and abstract axis/legend/tooltip options. None of these are Recharts names.
- **Adapter side** turns the Cube `ResultSet` into `{ categories, series:[{key,label,data,colorToken,meta}] }` — already aligned, already labeled, already formatted-hint-bearing.
- **Family component** is the *only* place that knows `layout="vertical"`, `stackId`, `<Bar dataKey>`, `stackOffset="expand"`, `<ZAxis>`, `yAxisId`, `<Cell fill>`, etc. exist.

So to swap Recharts for a different lib, you reimplement the eight family components against the *same* `(NormalizedChartData, ChartOptions)` signature — the spec, the `familyOptions` schemas, the adapter, the variable model, and every stored JSON file are untouched. This is the abstraction-seam guarantee the brief demanded.

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
    envelope: { stackMode: "stacked", legend: { show: true, position: "bottom" }, tooltip: { show: true } },
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
  combo: {
    envelope: { legend: { show: true, position: "bottom" }, tooltip: { show: true } },
    familyOptions: { series: [] } satisfies ComboFamilyOptions, // series is required from the spec
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
- **area** — defaults to `stacked` because a single-series area is rare; multi-series area without stacking is visually muddy.
- **pie** — `maxSlices:8` + auto-"Other" prevents the 30-slice unreadable pie that the aa-app `device_id`/`address` dimensions would otherwise produce.
- **kpi** — `number` (the 90% case); gauge is opt-in.
- **table** — paged + sortable + sticky header (the obvious table affordances).
- **combo** — `series:[]` is intentionally empty: combo *requires* the author to declare each series' render type, so an empty combo renders the empty state rather than guessing.

Validation (zod) runs **after** merge so required-but-defaulted fields (e.g. `combo.series` non-empty, `scatter.x`/`y` present, `pie` single-measure) are enforced on the resolved object.

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

| Family | Absorbs (Embeddable Pro) | Load-bearing inputs | Recharts/shadcn primitive | Uses Recharts? |
|---|---|---|---|---|
| `bar` | 6 Bar Pros | `orientation`×`stackMode`, multi-`series` | `BarChart`+`Bar` (`layout`,`stackId`,`stackOffset`) | yes |
| `line` | Line/Grouped/Multi/Sparkline | `series.length`, `chrome`, `connectNulls`, dual-axis | `LineChart`+`Line` | yes |
| `area` | Area/Stacked/Percent | `stackMode` | `AreaChart`+`Area` (`stackOffset`) | yes |
| `pie` | Pie/Donut | `innerRadiusPct`, `maxSlices` | `PieChart`+`Pie`+`Cell` | yes |
| `scatter` | Scatter/Bubble | `x`/`y`/`size`/`groupBy` | `ScatterChart`+`Scatter`+`ZAxis` | yes |
| `kpi` | KPI/Number/Comparison/Radial | `display`, `comparison`, `gauge` | shadcn card / `RadialBarChart` | gauge only |
| `table` | Table/Pivot | `columns`, pivot via `mapping` | shadcn `Table` | no |
| `combo` | Combo/BarLine/DualAxis | per-`series.render`+`axis` | `ComposedChart`+`Bar`/`Line`/`Area` | yes |

**The contract:** eight families; cross-family knobs in the shared envelope; family-specific knobs in `familyOptions` (one zod schema per family); every family is a pure `(NormalizedChartData, ChartOptions) → ReactElement` with Recharts confined inside; total defaults deep-merged (arrays replaced) then validated; formatting driven by Cube member `meta` with overrides, implemented as one resolver using vetted unit/date libraries — mirroring `withUnits`' data-model intent while discarding its HOC. Specs never contain a Recharts prop, so the rendering library can be replaced by reimplementing eight components against this unchanged signature.