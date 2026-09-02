var Xl = Object.defineProperty;
var Jl = (e, t, n) => t in e ? Xl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Sr = (e, t, n) => Jl(e, typeof t != "symbol" ? t + "" : t, n);
import { z as v } from "zod";
import { jsx as l, jsxs as b, Fragment as he } from "react/jsx-runtime";
import * as w from "react";
import { useMemo as ie, createContext as Ra, useContext as xo, useState as Mt, useCallback as st, useEffect as Cn, useRef as Ct, createElement as Zl, useSyncExternalStore as Na, useId as ec, Component as tc } from "react";
import { ruleX as _a, ruleY as xa, text as hn, colorLegend as Mo, group as nc, stack as Ma, barX as Ni, barY as _i, lineX as rc, lineY as nr, defineChart as pt, areaY as qr, dot as Fa, cell as oc } from "@tanstack/charts";
import { crosshair as Aa } from "@tanstack/charts/crosshair";
import { scaleBand as ic } from "@tanstack/charts/scales/band";
import { scaleLinear as Vn } from "@tanstack/charts/scales/linear";
import { scalePoint as ac } from "@tanstack/charts/scales/point";
import { Chart as sc } from "@tanstack/charts/react/core";
import { motion as $a } from "@tanstack/charts/motion";
import { tooltip as Fo } from "@tanstack/charts/tooltip";
import { d3Curve as kr } from "@tanstack/charts/d3/shape";
import { brushX as lc } from "@tanstack/charts/interaction/brush";
import { controlledSignal as cc } from "@tanstack/charts/interaction/signal";
import { scaleUtc as uc, scaleLog as xi, scaleSqrt as dc } from "d3-scale";
import { curveNatural as mc, curveStepAfter as fc, curveMonotoneX as gc } from "d3-shape";
import { format as we, isValid as en, parseISO as zn, subDays as Re, startOfWeek as Hn, endOfWeek as Gn, startOfMonth as St, endOfMonth as sn, startOfQuarter as kt, endOfQuarter as ln, startOfYear as Rt, endOfYear as cn, subWeeks as Wr, subMonths as Nt, subQuarters as _t, subYears as xt, differenceInCalendarDays as pc, parse as Oa } from "date-fns";
import { clsx as hc } from "clsx";
import * as xe from "@radix-ui/react-select";
import { Minus as Pa, ArrowUp as Ao, ArrowDown as $o, CalendarRange as Ia, Search as Ta, ChevronsUpDown as vc, AreaChart as yc, BarChart3 as Da, Grid3X3 as bc, Table as wc, Gauge as Cc, ScatterChart as Sc, PieChart as kc, LineChart as Rc, AlertCircle as Oo, ChevronLeft as Po, ChevronRight as Sn, ChevronDown as ht, Check as Ut, ChevronUp as Nc, CalendarIcon as Ea, MoreVertical as _c, RefreshCw as xc, Image as Mc, Sheet as Fc, ListChecks as Ac, Table2 as La, Database as Va, Layers as za, Calendar as $c, Type as Ha, Hash as Mi, MapPin as Oc, Variable as Pc, Plus as zt, Trash2 as Kt, ListFilter as Ic, EyeOff as Tc, Eye as Dc, AlertTriangle as Ec, GripVertical as Lc, X as Fi, ArrowLeftRight as Vc, Save as Ga, SlidersHorizontal as zc, Braces as Hc, Undo2 as Gc, Redo2 as jc, RotateCcw as Bc, Pencil as qc, Copy as Wc, Bold as Uc, Italic as Kc, Strikethrough as Yc, Heading1 as Qc, Heading2 as Xc, List as Jc, ListOrdered as Zc, Quote as eu, Box as tu } from "lucide-react";
import * as jn from "@radix-ui/react-popover";
import { cva as Io } from "class-variance-authority";
import nu from "@cubejs-client/core";
import { DayPicker as ru, useDayPicker as ou } from "react-day-picker";
import { pie as iu, radialArc as Ur, radialText as Rr, polar as ja } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as Ba } from "react-grid-layout";
import { useEditor as qa, EditorContent as Wa } from "@tiptap/react";
import Ua from "@tiptap/starter-kit";
const Et = 5, Bn = v.object({ var: v.string().min(1) }).strict();
function _e(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const qn = (e) => v.union([e, Bn]), au = v.union([v.string(), v.number(), v.boolean()]), ut = v.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Ht = "auto", su = v.union([ut, v.literal(Ht)]), Kr = v.union([v.tuple([v.string(), v.string()]), v.string()]), Ka = v.union([
  v.string(),
  v.number(),
  v.boolean(),
  v.tuple([v.string(), v.string()]),
  // absolute date range
  v.array(v.string()),
  v.array(v.number())
]), fe = v.string().min(1), lu = v.enum([
  "equals",
  "notEquals",
  "gt",
  "gte",
  "lt",
  "lte",
  "contains",
  "notContains",
  "startsWith",
  "endsWith",
  "set",
  "notSet",
  "inDateRange",
  "notInDateRange",
  "beforeDate",
  "beforeOrOnDate",
  "afterDate",
  "afterOrOnDate",
  "measureFilter"
]), cu = v.object({
  member: fe,
  operator: lu,
  values: v.array(v.union([au, Bn])).optional()
}).strict(), Yr = v.lazy(
  () => v.union([
    cu,
    v.object({ and: v.array(Yr) }).strict(),
    v.object({ or: v.array(Yr) }).strict()
  ])
), uu = v.object({
  dimension: fe,
  granularity: qn(su).optional(),
  dateRange: qn(Kr).optional(),
  compareDateRange: v.array(Kr).optional()
}).strict(), Ai = v.enum(["asc", "desc"]), du = v.union([
  v.record(fe, Ai),
  v.array(v.tuple([fe, Ai]))
]), Ya = v.object({
  measures: v.array(fe).optional(),
  dimensions: v.array(fe).optional(),
  timeDimensions: v.array(uu).optional(),
  filters: v.array(Yr).optional(),
  segments: v.array(fe).optional(),
  order: du.optional(),
  limit: qn(v.number()).optional(),
  offset: qn(v.number()).optional(),
  total: v.boolean().optional(),
  timezone: v.string().optional()
}).strict(), mu = v.string().min(1), hw = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], dt = v.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), fu = v.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), To = v.object({
  kind: fu.optional(),
  decimals: v.number().optional(),
  abbreviate: v.boolean().optional(),
  prefix: v.string().optional(),
  suffix: v.string().optional(),
  unitSystem: v.enum(["metric", "imperial"]).optional(),
  dateFormat: v.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: v.string().optional()
}).strict(), $i = v.object({
  label: v.string().optional(),
  colorToken: dt.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: v.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: v.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), gu = v.object({
  category: v.object({ member: fe }).strict(),
  series: v.union([
    v.object({
      mode: v.literal("measures"),
      members: v.array(fe),
      meta: v.record(fe, $i).optional()
    }).strict(),
    v.object({
      mode: v.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: fe,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: v.array(fe).optional(),
      pivot: fe,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: v.record(fe, $i).optional()
    }).strict()
  ])
}).strict(), pu = v.object({
  show: v.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: v.enum(["top", "bottom"]).optional()
}).strict(), hu = v.object({
  show: v.boolean().optional(),
  indicator: v.enum(["dot", "line", "dashed"]).optional(),
  showTotal: v.boolean().optional()
}).strict(), Oi = v.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: v.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: v.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: v.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: v.tuple([v.number(), v.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: To.optional()
}).strict(), vu = v.object({
  x: Oi.optional(),
  y: Oi.optional()
}).strict(), yu = v.object({
  byKey: v.record(v.string(), dt).optional(),
  ramp: v.array(dt).optional()
}).strict(), Pn = 7, bu = v.enum(["rollingAvg", "cumulative", "percentOfTotal"]), wu = v.object({
  kind: bu,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: v.number().int().min(2).max(90).optional()
}).strict(), Qa = v.object({
  family: mu,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: gu.optional(),
  orientation: v.enum(["vertical", "horizontal"]).optional(),
  stackMode: v.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: pu.optional(),
  tooltip: hu.optional(),
  axes: vu.optional(),
  colors: yu.optional(),
  format: To.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: wu.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: v.record(v.string(), v.unknown()).optional()
}).strict(), Cu = v.object({ type: v.string(), content: v.array(v.unknown()).optional() }).passthrough(), Su = v.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), ku = v.object({
  variable: v.string().min(1),
  control: v.discriminatedUnion("kind", [
    v.object({
      kind: v.literal("dateRange"),
      presets: v.array(v.string()).optional(),
      allowFuture: v.boolean().optional()
    }).strict(),
    v.object({
      kind: v.literal("granularity"),
      options: v.array(ut).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: v.string().optional()
    }).strict(),
    v.object({
      kind: v.literal("select"),
      options: v.array(v.object({ value: Ka, label: v.string() }).strict()),
      multiple: v.boolean().optional()
    }).strict(),
    v.object({
      kind: v.literal("memberSelect"),
      from: v.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: v.string().optional()
    }).strict(),
    v.object({ kind: v.literal("text"), placeholder: v.string().optional() }).strict(),
    v.object({
      kind: v.literal("number"),
      min: v.number().optional(),
      max: v.number().optional(),
      step: v.number().optional()
    }).strict(),
    v.object({ kind: v.literal("toggle") }).strict()
  ])
}).strict(), Do = {
  id: v.string().min(1),
  title: v.string().optional()
}, Ru = v.object({ ...Do, type: v.literal("chart"), query: Ya.default({}), chart: Qa }).strict(), Nu = v.object({ ...Do, type: v.literal("text"), doc: Cu }).strict(), _u = v.object({ ...Do, type: v.literal("input"), control: ku }).strict(), xu = v.discriminatedUnion("type", [
  Ru,
  Nu,
  _u
]), Mu = v.object({
  i: v.string(),
  x: v.number(),
  y: v.number(),
  w: v.number(),
  h: v.number(),
  minW: v.number().optional(),
  minH: v.number().optional(),
  static: v.boolean().optional()
}).strict(), Fu = v.object({
  cols: v.number().optional(),
  rowHeight: v.number().optional(),
  margin: v.tuple([v.number(), v.number()]).optional(),
  containerPadding: v.tuple([v.number(), v.number()]).optional()
}).strict(), Xa = v.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Au = v.object({
  name: v.string().min(1),
  type: Xa,
  label: v.string().optional(),
  array: v.boolean().optional(),
  default: Ka.optional()
}).strict(), Ja = {
  schemaVersion: v.literal(Et),
  id: v.string().min(1),
  name: v.string().optional(),
  description: v.string().optional(),
  createdAt: v.string().optional(),
  updatedAt: v.string().optional()
}, Za = v.object({ ...Ja, kind: v.literal("chart"), query: Ya.default({}), chart: Qa }).strict(), Qr = v.object({
  ...Ja,
  kind: v.literal("dashboard"),
  variables: v.array(Au),
  widgets: v.array(xu),
  layout: v.array(Mu),
  grid: Fu.optional()
}).strict(), es = v.discriminatedUnion("kind", [Za, Qr]);
function ee(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Je(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function $u(e) {
  if (!ee(e.axes)) return;
  const t = Je(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Ou(e) {
  if (!ee(e.mapping)) return;
  const t = e.mapping.series;
  if (!ee(t) || !ee(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!ee(o)) continue;
    const i = Je(o, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Pu(e) {
  if (!ee(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => ee(n) ? Je(n, "side") ?? {} : n
  ));
}
function Iu(e) {
  const t = ee(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(ee) : [];
  e.family = n.some((a) => a.render === "bar") ? "bar" : "line";
  const r = ee(e.mapping) ? e.mapping : void 0, o = r && ee(r.series) ? r.series : void 0, i = (o == null ? void 0 : o.mode) === "measures" && Array.isArray(o.members) ? o.members.filter((a) => typeof a == "string") : [];
  if (o && i.length > 0) {
    const a = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (a[s.member] = { colorToken: s.colorToken });
    if (Object.keys(a).length > 0) {
      const s = ee(o.meta) ? o.meta : {};
      o.meta = { ...a, ...s };
    }
  }
  e.familyOptions = {};
}
function Pi(e) {
  ee(e) && (e.family === "combo" && Iu(e), $u(e), Ou(e), Pu(e));
}
function Tu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Pi(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ee(n) && n.type === "chart" && Pi(n.chart);
  return t;
}
function Du(e) {
  if (!ee(e.mapping)) return;
  const t = e.mapping.series;
  if (!ee(t) || !ee(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!ee(o)) continue;
    const i = Je(o, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Eu(e) {
  if (!ee(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function Lu(e) {
  if (ee(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!ee(n) || !Array.isArray(n.domain) || n.domain.every((o) => typeof o == "number")) continue;
      const r = Je(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function Vu(e) {
  if (!ee(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = Je(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Ii(e) {
  ee(e) && (Du(e), Eu(e), Lu(e), Vu(e));
}
function zu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ii(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ee(n) && n.type === "chart" && Ii(n.chart);
  return t;
}
const Hu = {
  bar: ["barRadius", "barCategoryGap", "barGap", "maxBarSize"],
  line: ["strokeWidth"],
  area: ["fillOpacity", "strokeWidth"],
  pie: ["outerRadiusPct", "padAngle", "cornerRadius", "maxSlices"],
  scatter: ["sizeRange"],
  // Not geometry, same reasoning: settings whose every value was defensible, replaced
  // by one right answer. Sorting and a pinned header are always on, row density follows
  // the row count, row numbers are gone, and the heatmap prints in-cell values whenever
  // the grid is small enough to read them.
  table: ["sortable", "stickyHeader", "rowHeight", "showRowNumbers"],
  heatmap: ["showValues"]
};
function Gu(e) {
  if (!ee(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = Hu[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const o of n) r = Je(r, o) ?? {};
  e.familyOptions = r;
}
function ju(e) {
  if (ee(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!ee(n) || n.labelHide !== !0) continue;
      const r = Je(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function Ti(e) {
  ee(e) && (Gu(e), ju(e));
}
function Bu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ti(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ee(n) && n.type === "chart" && Ti(n.chart);
  return t;
}
function qu(e) {
  if (!ee(e.mapping)) return;
  const t = e.mapping.series;
  if (!ee(t) || !ee(t.meta)) return;
  let n;
  const r = {};
  for (const [a, s] of Object.entries(t.meta)) {
    if (!ee(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = Je(s, "curve");
    c && (r[a] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const o = e.family;
  if (n === void 0 || o !== "line" && o !== "area") return;
  const i = ee(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function Wu(e) {
  const t = structuredClone(e), n = (r) => {
    ee(r) && qu(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      ee(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Uu = {
  1: Tu,
  2: zu,
  3: Bu,
  4: Wu
};
function Ku(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Et)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Et} — update the library`
    );
  for (; n < Et; ) {
    const r = Uu[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return es.parse(t);
}
function vw(e) {
  try {
    return { ok: !0, spec: Ku(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function yw(e) {
  return es.parse(e);
}
function Yu(e) {
  return nu(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Qu(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function O(...e) {
  return hc(e);
}
function Xu({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: O("cv-skeleton", e), ...t });
}
const Ju = Io(
  // Semantic classes (styles/ui.css).
  "cv-alert",
  {
    variants: {
      variant: {
        default: "cv-alert--default",
        destructive: "cv-alert--destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), rr = w.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: O(Ju({ variant: t }), e),
    ...n
  }
));
rr.displayName = "Alert";
const or = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: O("cv-alert-title", e),
      ...t
    }
  )
);
or.displayName = "AlertTitle";
const ir = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: O("cv-alert-description", e),
      ...t
    }
  )
);
ir.displayName = "AlertDescription";
const Zu = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, ed = "MMM d, yyyy";
function ts(e) {
  if (e instanceof Date) return en(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return en(r) ? r : null;
  }
  const t = zn(e);
  if (en(t)) return t;
  const n = new Date(e);
  return en(n) ? n : null;
}
function Eo(e) {
  return /^\d{4}-\d{2}/.test(e) ? en(zn(e)) : !1;
}
function td(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Zu[t] : ed;
}
function un(e, t, n) {
  const r = ts(e);
  return r ? we(r, td(t, n)) : String(e);
}
function bw(e, t) {
  return (n) => n == null ? "" : un(n, e, t);
}
function ww(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? un(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? un(e, t.format, t.granularity) : String(e) : Eo(e) ? un(e, t.format, t.granularity) : e;
}
const Di = "—", nd = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Ei(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function rd(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: o } of nd)
    if (n >= r) return Ei((e / r).toFixed(t)) + o;
  return Ei(e.toFixed(t));
}
function od(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function id(e, t) {
  const { format: n, meta: r, locale: o } = t, i = n != null && n.abbreviate ? rd(e, n.decimals ?? 1) : od(e, n, o), a = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${a ? ` ${a}` : ""}`;
}
function ns(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ad(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || ns(e.value) ? !0 : typeof e.value == "string" ? Eo(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Lo = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Di : (ns(t) || typeof t == "string" || typeof t == "number") && ad(e) ? un(t, n, r) : typeof t == "number" ? id(t, e) : String(t);
};
function sd(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Cw(e, t) {
  return (n, r) => {
    const o = r ? sd(r, t) : void 0;
    return Lo({
      value: n,
      meta: o == null ? void 0 : o.meta,
      title: (o == null ? void 0 : o.shortTitle) ?? (o == null ? void 0 : o.title),
      role: "value",
      format: e
    });
  };
}
function ld(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function cd(e) {
  const t = ut.safeParse(e);
  return t.success ? t.data : void 0;
}
function ud(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const o of Object.keys(e.timeDimensions))
      if (o !== n && o.startsWith(`${n}.`)) {
        const i = cd(o.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Vo(e, t, n, r) {
  const o = ud(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (a) => !a || Object.keys(a).length === 0 ? i : Vo(
      e,
      { ...t, format: { ...t.format, ...a } },
      n,
      r
    ),
    value(a, s, c = "value") {
      const u = s ? ld(s, e) : void 0, d = u == null ? void 0 : u.meta;
      return n({
        value: a,
        member: s,
        meta: d,
        title: (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title),
        role: c,
        format: t.format,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    },
    category(a) {
      return n({
        value: a,
        role: "category",
        format: t.format,
        granularity: o,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    }
  };
  return i;
}
const ar = v.object({
  axis: v.enum(["x", "y"]),
  value: v.number(),
  label: v.string().optional(),
  colorToken: dt.optional()
}).strict(), zo = v.boolean().optional(), dd = v.object({
  showValueLabels: v.boolean().optional(),
  referenceLines: v.array(ar).optional(),
  comparePrevious: zo
}).strict(), rs = v.enum(["linear", "monotone", "step", "natural"]), md = v.object({
  curve: rs.optional(),
  dots: v.union([v.boolean(), v.literal("active")]).optional(),
  connectNulls: v.boolean().optional(),
  chrome: v.enum(["full", "none"]).optional(),
  referenceLines: v.array(ar).optional(),
  showValueLabels: v.boolean().optional(),
  comparePrevious: zo
}).strict(), fd = v.object({
  curve: rs.optional(),
  connectNulls: v.boolean().optional(),
  dots: v.boolean().optional(),
  referenceLines: v.array(ar).optional(),
  comparePrevious: zo
}).strict(), gd = v.object({
  innerRadiusPct: v.number().optional(),
  showLabels: v.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: v.object({ value: v.string().optional(), label: v.string().optional() }).strict().optional(),
  maxSlices: v.number().optional()
}).strict(), pd = v.object({
  x: fe,
  y: fe,
  size: fe.optional(),
  groupBy: fe.optional(),
  referenceLines: v.array(ar).optional()
}).strict(), hd = v.object({
  display: v.enum(["number", "gauge"]).optional(),
  measure: fe,
  comparison: v.object({
    mode: v.enum(["previousPeriod", "value"]),
    value: v.union([fe, v.number()]).optional(),
    showAsPercent: v.boolean().optional(),
    goodDirection: v.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: v.object({
    member: fe.optional(),
    timeDimension: fe.optional(),
    granularity: v.union([ut, Bn]).optional(),
    dateRange: v.union([Kr, Bn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: v.enum(["up", "down"]).optional(),
  gauge: v.object({
    min: v.number().optional(),
    max: v.number(),
    thresholds: v.array(v.object({ at: v.number(), colorToken: dt }).strict()).optional()
  }).strict().optional()
}).strict(), vd = v.object({
  member: fe,
  label: v.string().optional(),
  format: To.optional(),
  align: v.enum(["left", "right", "center"]).optional(),
  width: v.number().optional(),
  hidden: v.boolean().optional()
}).strict(), yd = v.object({
  member: fe,
  when: v.object({
    op: v.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: v.number()
  }).strict(),
  colorToken: dt.optional()
}).strict(), bd = v.object({
  columns: v.array(vd).optional(),
  pageSize: v.number().optional(),
  conditionalFormat: v.array(yd).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), wd = v.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: dt.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), et = {
  bar: dd,
  line: md,
  area: fd,
  pie: gd,
  scatter: pd,
  heatmap: wd,
  kpi: hd,
  table: bd
}, tt = {
  bar: {
    envelope: {
      orientation: "vertical",
      stackMode: "none",
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    familyOptions: {
      showValueLabels: !1
    }
  },
  line: {
    envelope: {
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "line" },
      format: { kind: "auto" }
    },
    familyOptions: {
      curve: "monotone",
      dots: "active",
      connectNulls: !1,
      chrome: "full"
    }
  },
  area: {
    // No static stackMode: the area renderer defaults it SHAPE-AWARELY (a color-split
    // pivot stacks as parts of a whole; multiple independent measures overlap instead of
    // summing into a misleading band). An explicit spec stackMode always wins.
    envelope: {
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    familyOptions: {
      curve: "monotone",
      connectNulls: !1
    }
  },
  pie: {
    envelope: {
      // Was `"right"`, which the renderer has always drawn at the bottom.
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    familyOptions: {
      innerRadiusPct: 0,
      showLabels: "percent",
      maxSlices: 8
    }
  },
  scatter: {
    envelope: {
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    // x/y are required from the spec, so they are absent from the default skeleton.
    familyOptions: {}
  },
  kpi: {
    envelope: { format: { kind: "auto" } },
    // measure is required from the spec.
    familyOptions: { display: "number" }
  },
  heatmap: {
    // No legend envelope: the heatmap has no series legend (color encodes value).
    envelope: {
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    familyOptions: {
      colorToken: "chart-1"
    }
  },
  table: {
    envelope: {},
    familyOptions: {
      pageSize: 25
    }
  }
};
function Li(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Xr(e, t) {
  if (t === void 0) return e;
  if (!Li(e) || !Li(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const o = t[r];
    o !== void 0 && (n[r] = r in e ? Xr(e[r], o) : o);
  }
  return n;
}
const Cd = { envelope: {}, familyOptions: {} };
function Sd(e, t) {
  return {
    ...Xr({ ...t.envelope }, e),
    familyOptions: Xr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const os = {}, Vi = () => {
}, kd = {
  target: os,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Vi,
  emitPoint: Vi
}, Wn = w.createContext(null);
Wn.displayName = "ChartInteractionContext";
function is() {
  return w.useContext(Wn) ?? kd;
}
function Ho({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: o
}) {
  const i = w.useContext(Wn), a = w.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  w.useLayoutEffect(() => {
    a.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = w.useCallback((p) => {
    const { parent: h, widgetId: y, onRangeSelect: C } = a.current, S = p && p.widgetId === void 0 && y !== void 0 ? { ...p, widgetId: y } : p;
    C ? C(S) : h == null || h.emitRange(S);
  }, []), c = w.useCallback((p) => {
    const { parent: h, widgetId: y, onPointSelect: C } = a.current, S = p && p.widgetId === void 0 && y !== void 0 ? { ...p, widgetId: y } : p;
    C ? C(S) : h == null || h.emitPoint(S);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), d = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), m = i == null ? void 0 : i.target, g = w.useMemo(
    () => m || r ? { ...m, ...r } : os,
    [m, r]
  ), f = w.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: g,
      rangeEnabled: u,
      pointEnabled: d,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, g, u, d, s, c]
  );
  return /* @__PURE__ */ l(Wn.Provider, { value: f, children: o });
}
function it(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((o, i) => {
    var s, c, u;
    const a = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const d of n) {
      const m = d.data[i] ?? null;
      m === null && (t != null && t.skipNull) || r.push({
        cat: typeof o == "number" ? o : String(o),
        ...a ? { t: a } : {},
        value: m,
        key: d.key,
        label: d.label,
        member: ((c = d.meta) == null ? void 0 : c.measure) ?? d.key,
        companion: ((u = d.meta) == null ? void 0 : u.companion) ?? !1,
        i
      });
    }
  }), r;
}
function Jr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function as(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = Jr(n), o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function Zr(e, t, n) {
  const r = [];
  return e.categories.forEach((o, i) => {
    var d, m, g;
    const a = (d = n == null ? void 0 : n.temporal) == null ? void 0 : d.dates[i], s = /* @__PURE__ */ new Map();
    for (const f of t) {
      const p = f.data[i];
      if (typeof p == "number" && Number.isFinite(p)) {
        const h = Jr(f);
        s.set(h, (s.get(h) ?? 0) + Math.abs(p));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const f of t) {
      const p = f.data[i] ?? null, h = Jr(f), y = s.get(h) ?? 0, C = p === null || y === 0 ? null : Math.abs(p) / y;
      let S = 0, A = 0;
      if (p !== null) {
        const N = p < 0 ? u : c;
        S = N.get(h) ?? 0, A = S + p, N.set(h, A);
      }
      const k = n != null && n.normalize && y > 0 ? 1 / y : 1;
      r.push({
        cat: typeof o == "number" ? o : String(o),
        ...a ? { t: a } : {},
        value: p,
        key: f.key,
        label: f.label,
        member: ((m = f.meta) == null ? void 0 : m.measure) ?? f.key,
        companion: ((g = f.meta) == null ? void 0 : g.companion) ?? !1,
        i,
        stack: h,
        y1: S * k,
        y2: A * k,
        share: C
      });
    }
  }), r;
}
function eo(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((o) => o.startsWith(r)) ?? t;
}
function vn(e) {
  return e.label || e.key;
}
function ot(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Go(e, t) {
  const n = e.series.map(vn), r = e.series.map(ot), o = { domain: n, range: r };
  return t != null && t.legend && (o.legend = Mo({ placement: Yt(t.legendPlacement) })), o;
}
function Yt(e) {
  return e === "top" ? "top" : "bottom";
}
function kn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Un(e = 0.2) {
  return ic().padding(e);
}
function ss() {
  return ac().padding(0.02);
}
const Rd = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Nd(e) {
  if (typeof e == "string" && Rd.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return ts(e);
}
function ls(e) {
  return e.toISOString().slice(0, -1);
}
function zi(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = ut.safeParse(n);
  return r.success ? r.data : void 0;
}
function cs(e, t) {
  var d, m, g;
  const n = (m = (d = t.mapping) == null ? void 0 : d.category) == null ? void 0 : m.member, r = (g = e.raw.annotation) == null ? void 0 : g.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let o;
  for (const f of Object.keys(r))
    if (f === n || f.startsWith(`${n}.`)) {
      o = f;
      break;
    }
  if (o === void 0) return null;
  const i = o === n ? zi(n) : zi(o, n), a = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const f of e.categories) {
    if (typeof f == "number" && i === void 0 || typeof f == "string" && !Eo(f)) return null;
    const p = Nd(f);
    if (!p) return null;
    s.push(p);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((f) => c.has(f.getTime()) ? !1 : (c.add(f.getTime()), !0)).sort((f, p) => f.getTime() - p.getTime());
  return u.length < 2 ? null : { member: a, granularity: i, dates: s, categories: e.categories, values: u };
}
function us(e) {
  return e ? uc : ss;
}
function jo(e) {
  return e ? "t" : "cat";
}
function Kn(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, o) => {
    const i = e.categories[o];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? ls(r)) : t.category(r);
}
function Hi(e, t) {
  const n = e.dates.findIndex((o) => o.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : ls(t);
}
function ds(e, t) {
  const n = is(), [r, o] = w.useState(null), i = w.useRef({ opts: t, interactions: n, temporal: e });
  w.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const a = n.rangeEnabled && e !== null;
  return w.useMemo(() => {
    if (!a || !e) return;
    const s = e.values, c = (f) => f !== void 0 && s.some((p) => p.getTime() === f.getTime()), u = r && c(r.start) && c(r.end) ? r : null, d = s[0], m = u ?? { start: d, end: d }, g = u === null;
    return [
      lc({
        id: "cv-brush-x",
        values: s,
        range: cc(
          m,
          (f, { reason: p }) => {
            if (p.type !== "commit") return;
            const h = i.current.temporal, y = f.start.getTime() === f.end.getTime();
            if (o(y ? null : f), y || !h) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: h.member,
              granularity: h.granularity,
              from: Hi(h, f.start),
              to: Hi(h, f.end)
            });
          }
        ),
        format: (f) => i.current.opts.label(f),
        ariaLabel: t.ariaLabel ?? "Time range",
        startAriaLabel: "Range start",
        endAriaLabel: "Range end",
        // The behavior PAINTS its handles (they are its keyboard sliders), so the
        // collapsed resting range would otherwise show as a solid block against the
        // first bucket. Resting paints nothing at all; a committed range gets the
        // real selection wash plus visible grips.
        handleSize: 10,
        selectionStyle: g ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: g ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [a, e, r]);
}
function _d(e, t) {
  var a;
  if (!e) return null;
  const n = e.datum;
  if (!n || typeof n != "object") return null;
  const r = typeof n.key == "string" ? n.key : void 0, o = typeof n.label == "string" ? n.label : void 0;
  if (t.pivotMember && r !== void 0 && e.group !== null)
    return { member: t.pivotMember, value: r, label: o ?? r };
  if (!t.categoryMember) return null;
  const i = n.cat;
  return typeof i == "string" || typeof i == "number" ? {
    member: t.categoryMember,
    value: i,
    label: ((a = t.formatCategory) == null ? void 0 : a.call(t, i)) ?? String(i)
  } : o !== void 0 ? { member: t.categoryMember, value: o, label: o } : null;
}
function Gt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const o = () => r ? xi().domain(r) : xi();
    return { scale: r ? o() : o, nice: !r };
  }
  return r ? { scale: Vn().domain(r), nice: !1 } : { scale: Vn, nice: !0 };
}
function ms(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function yn(e) {
  switch (e) {
    case "monotone":
      return kr(gc);
    case "step":
      return kr(fc);
    case "natural":
      return kr(mc);
    default:
      return;
  }
}
function jt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function Bo(e, t) {
  var a, s, c, u;
  const n = e.raw.annotation, r = (d) => {
    var m, g, f, p, h, y;
    if (d)
      return ((m = n == null ? void 0 : n.measures[d]) == null ? void 0 : m.shortTitle) ?? ((g = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : g.shortTitle) ?? ((f = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : f.shortTitle) ?? ((p = n == null ? void 0 : n.measures[d]) == null ? void 0 : p.title) ?? ((h = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : h.title) ?? ((y = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : y.title) ?? d;
  }, o = e.series[0], i = (d) => {
    var m;
    return d ? (m = d.meta) != null && m.measure ? r(d.meta.measure) : d.label : void 0;
  };
  return {
    x: jt((a = t.axes) == null ? void 0 : a.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: jt((u = t.axes) == null ? void 0 : u.y, i(o))
  };
}
function qe(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function qo(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function xd(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function mt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function Wo(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function sr(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Fo,
    className: Wo(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const o = r, i = o[0], a = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((m) => {
        var g;
        return { datum: m, color: (g = e.colorOf) == null ? void 0 : g.call(e, m) };
      }) : o.map((m) => ({ datum: m.datum, color: m.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const m of s) {
          const g = m.datum.value;
          m.datum.companion || typeof g != "number" || !Number.isFinite(g) || (c += g, u += 1);
        }
      const d = s.map((m) => ({
        label: m.datum.label,
        value: e.percentShare && c > 0 && typeof m.datum.value == "number" ? mt(m.datum.value / c, e.locale) : n(m.datum),
        color: m.color
      }));
      return e.showTotal && u > 1 && d.push({
        label: "Total",
        value: e.percentShare ? mt(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: a, rows: d };
    }
  };
}
function Uo(e) {
  return {
    ...e,
    initialize: (t) => {
      const n = e.initialize(t), r = n.render;
      return {
        ...n,
        render: (o) => ({ ...r(o), points: [] })
      };
    }
  };
}
function Ko(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], o = t[0];
  return e.forEach((i, a) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", d = u ? t[i.value] : void 0;
    if (u && d == null) return;
    const m = n != null && n.swap ? !u : u, g = m ? n != null && n.swap ? i.value : d : n != null && n.swap ? d : i.value;
    if (r.push(
      m ? _a([g], { id: `cv-ref-${a}`, ...c }) : xa([g], { id: `cv-ref-${a}`, ...c })
    ), !i.label) return;
    const f = u ? n == null ? void 0 : n.valueAnchor : o;
    if (f == null) return;
    const p = (n == null ? void 0 : n.swap) === !0;
    r.push(
      Uo(
        hn(
          [
            {
              x: m ? g : f,
              y: m ? f : g,
              label: i.label
            }
          ],
          {
            id: `cv-ref-label-${a}`,
            x: "x",
            y: "y",
            text: "label",
            fill: s,
            fontSize: 10,
            // Sit just clear of the rule: above a horizontal rule, just right of a
            // vertical one (mirroring the old Recharts label offsets).
            dy: m ? p ? -6 : 8 : -6,
            dx: m ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function Yo(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function fs(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const o = jo((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, a = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? mt(c, n.locale) : "";
  };
  return [
    Uo(
      hn(r, {
        id: "cv-value-labels",
        x: n != null && n.swap ? i : o,
        y: n != null && n.swap ? o : i,
        text: a,
        fill: "currentColor",
        fontSize: 10,
        dy: n != null && n.swap ? 0 : -8,
        dx: n != null && n.swap ? 12 : 0
      })
    )
  ];
}
const Md = $a({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Fd = $a({ initial: !1 });
function vt({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: o = !0,
  minHeight: i = 200,
  onSelect: a,
  resolveSelection: s
}) {
  const c = w.useRef(null), u = is(), d = u.pointEnabled && !r, m = w.useRef(s);
  w.useLayoutEffect(() => {
    m.current = s;
  });
  const g = w.useCallback(
    (C) => {
      if (C === null) {
        u.emitPoint(null);
        return;
      }
      const S = m.current, A = S ? S(C) : _d(C, u.target);
      A && u.emitPoint(A);
    },
    [u]
  ), [f, p] = w.useState({ w: 0, h: 0 }), h = w.useId().replace(/:/g, "");
  w.useLayoutEffect(() => {
    const C = c.current;
    if (!C || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((A) => {
      var N;
      const k = (N = A[0]) == null ? void 0 : N.contentRect;
      k && p({ w: Math.floor(k.width), h: Math.floor(k.height) });
    });
    return S.observe(C), () => S.disconnect();
  }, []);
  const y = r ? Math.max(24, f.h || Math.round((f.w || 160) / 5)) : Math.max(i, f.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: f.w > 0 && /* @__PURE__ */ l(
        sc,
        {
          definition: e,
          renderer: o ? Md : Fd,
          width: f.w,
          height: y,
          ariaLabel: t,
          idPrefix: h,
          onSelect: a ?? (d ? g : void 0)
        }
      )
    }
  );
}
function Ad({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = w.useMemo(() => {
    var te, re, ce, me, ue, pe, ve, H, ne, le, I, x;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, d = e.series.filter((R) => {
      var F;
      return (F = R.meta) == null ? void 0 : F.companion;
    }), m = d.length ? e.series.filter((R) => {
      var F;
      return !((F = R.meta) != null && F.companion);
    }) : e.series, g = u ? m : e.series, p = (u ? as(g) : []).length > 1, h = p ? Zr(e, g, { normalize: c }) : it(e, { series: g }), y = new Map(e.series.map((R) => [vn(R), ot(R)])), C = /* @__PURE__ */ new Map();
    if (p)
      for (const R of h) {
        const F = C.get(R.i);
        F ? F.push(R) : C.set(R.i, [R]);
      }
    const S = Bo(e, t), A = s ? (re = (te = t.axes) == null ? void 0 : te.y) == null ? void 0 : re.hide : (me = (ce = t.axes) == null ? void 0 : ce.x) == null ? void 0 : me.hide, k = s ? (ue = t.axes) == null ? void 0 : ue.x : (pe = t.axes) == null ? void 0 : pe.y, N = Gt(k), $ = r.barCategoryGap, _ = s ? (ve = t.axes) == null ? void 0 : ve.y : (H = t.axes) == null ? void 0 : H.x, D = qe(n, _), E = qe(n, k), M = xd(t) ?? qo(e.series[0]), P = (R) => c ? mt(R) : E.value(R, M, "axis"), V = A ? !1 : {
      label: S.x,
      ticks: { format: (R) => D.category(R) }
    }, T = k != null && k.hide ? !1 : { label: S.y, ticks: { format: P } }, U = nc({ padding: r.barGap }), z = p ? U : c ? Ma({ offset: "normalize" }) : u ? void 0 : U, L = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (R) => p ? R.stack : R.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (R) => `${R.label} ${R.i}`,
      layout: z,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (R) => {
        const F = y.get(R.label) ?? "var(--chart-1)";
        return R.companion ? `color-mix(in oklab, ${F} 40%, transparent)` : F;
      }
    }, X = [
      p ? s ? Ni(h, { ...L, x1: "y1", x2: "y2", y: "cat" }) : _i(h, { ...L, x: "cat", y1: "y1", y2: "y2" }) : s ? Ni(h, { ...L, x: "value", y: "cat" }) : _i(h, { ...L, x: "cat", y: "value" })
    ];
    if (u && !c && d.length) {
      const R = e.categories.map((F, G) => {
        var j, Q, Z;
        return {
          cat: typeof F == "number" ? F : String(F),
          value: d.reduce((B, W) => {
            const q = W.data[G];
            return typeof q != "number" ? B : (B ?? 0) + q;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((Q = (j = d[0]) == null ? void 0 : j.meta) == null ? void 0 : Q.measure) ?? ((Z = d[0]) == null ? void 0 : Z.key),
          companion: !0,
          i: G
        };
      });
      if (R.some((F) => F.value !== null)) {
        const F = {
          id: "cv-bars-prev",
          key: (G) => `prev ${G.i}`,
          curve: yn("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        X.push(
          s ? rc(R, { ...F, x: "value", y: "cat" }) : nr(R, { ...F, x: "cat", y: "value" })
        );
      }
    }
    if (X.push(
      ...Ko(o.referenceLines, e.categories, {
        swap: s,
        valueAnchor: Yo(e)
      })
    ), o.showValueLabels) {
      const R = u ? p ? h : Zr(e, g, { normalize: c }) : h;
      X.push(
        ...fs(R, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return pt({
      marks: X,
      x: s ? { scale: N.scale, nice: N.nice, grid: !0, axis: T } : { scale: () => Un($), axis: V },
      y: s ? { scale: () => Un($), axis: V } : { scale: N.scale, nice: N.nice, grid: !0, axis: T },
      color: Go(u ? { ...e, series: g } : e, {
        legend: kn(t) && g.length > 1,
        legendPlacement: Yt((ne = t.legend) == null ? void 0 : ne.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((le = t.tooltip) == null ? void 0 : le.show) === !1 ? void 0 : sr({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !p,
        value: c && p ? (R) => {
          const F = R.share;
          return typeof F == "number" ? mt(F) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: p ? (R) => C.get(R.i) ?? [R] : void 0,
        colorOf: p ? (R) => y.get(R.label) ?? "var(--chart-1)" : void 0,
        indicator: (I = t.tooltip) == null ? void 0 : I.indicator,
        showTotal: (x = t.tooltip) == null ? void 0 : x.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, o, r]), a = e.series.map(vn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(vt, { definition: i, ariaLabel: a, className: "cv-chart--fill" });
}
function $d({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f;
  const o = t.familyOptions ?? {}, i = o.chrome === "none", a = w.useMemo(
    () => i ? null : cs(e, t),
    [e, t, i]
  ), s = w.useMemo(() => Kn(a, n), [a, n]), c = (f = t.axes) == null ? void 0 : f.x, u = w.useMemo(
    () => c != null && c.tickFormat ? Kn(a, qe(n, c)) : s,
    [a, n, c, s]
  ), d = ds(a, {
    label: s,
    ariaLabel: "Time range"
  }), m = w.useMemo(() => {
    var $, _, D, E, M, P, V, T, U;
    const p = jo(a), h = o.connectNulls ?? !1, y = o.curve ?? "monotone", C = yn(y), S = Bo(e, t), A = Gt(($ = t.axes) == null ? void 0 : $.y), k = e.categories.length <= 1, N = e.series.map((z) => {
      var X, te, re;
      const L = it(e, { series: [z], skipNull: h, temporal: a });
      return nr(L, {
        id: `cv-line-${z.key}`,
        x: p,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: C,
        strokeWidth: r.lineWidth,
        strokeDasharray: (X = z.meta) != null && X.companion ? "5 4" : void 0,
        strokeOpacity: (te = z.meta) != null && te.companion ? 0.55 : void 0,
        stroke: ot(z),
        points: !i && !((re = z.meta) != null && re.companion) && (ms(z, o.dots) || k)
      });
    });
    return i || (N.push(
      ...Ko(o.referenceLines, (a == null ? void 0 : a.dates) ?? e.categories, {
        valueAnchor: Yo(e)
      }),
      ...fs(
        o.showValueLabels ? it(e, { skipNull: !0, temporal: a }) : [],
        n,
        { temporal: a }
      )
    ), N.push(Aa({ x: {}, y: !1, marker: o.dots !== !1 }))), pt({
      marks: N,
      x: {
        scale: us(a),
        axis: i || (D = (_ = t.axes) == null ? void 0 : _.x) != null && D.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: A.scale,
        nice: A.nice,
        grid: !i,
        axis: i || (M = (E = t.axes) == null ? void 0 : E.y) != null && M.hide ? !1 : {
          label: S.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (z) => {
              var L, X, te, re;
              return qe(n, (L = t.axes) == null ? void 0 : L.y).value(
                z,
                ((te = (X = e.series[0]) == null ? void 0 : X.meta) == null ? void 0 : te.measure) ?? ((re = e.series[0]) == null ? void 0 : re.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: Go(e, {
        legend: !i && kn(t) && e.series.length > 1,
        legendPlacement: Yt((P = t.legend) == null ? void 0 : P.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((V = t.tooltip) == null ? void 0 : V.show) === !1 ? void 0 : sr({
        format: n,
        category: s,
        indicator: (T = t.tooltip) == null ? void 0 : T.indicator,
        showTotal: (U = t.tooltip) == null ? void 0 : U.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: d
    });
  }, [e, t, n, o, r, i, a, s, u, d]), g = e.series.map(vn).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    vt,
    {
      definition: m,
      ariaLabel: g,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function Od({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var y, C, S;
  const o = t.familyOptions ?? {}, i = ((C = (y = t.mapping) == null ? void 0 : y.series) == null ? void 0 : C.mode) === "pivot", a = t.stackMode ?? (i ? "stacked" : "none"), s = a === "stacked" || a === "percent", c = a === "percent", u = w.useMemo(() => cs(e, t), [e, t]), d = w.useMemo(() => Kn(u, n), [u, n]), m = (S = t.axes) == null ? void 0 : S.x, g = w.useMemo(
    () => m != null && m.tickFormat ? Kn(u, qe(n, m)) : d,
    [u, n, m, d]
  ), f = ds(u, { label: d, ariaLabel: "Time range" }), p = w.useMemo(() => {
    var ce, me, ue, pe, ve, H, ne, le, I;
    const A = jo(u), k = o.connectNulls ?? !1, N = o.curve ?? "monotone", $ = yn(N), _ = r.areaFillOpacity, D = r.stackedAreaFillOpacity, E = r.lineWidth, M = Bo(e, t), P = Gt((ce = t.axes) == null ? void 0 : ce.y), V = qo(e.series[0]), T = e.series.filter((x) => {
      var R;
      return !((R = x.meta) != null && R.companion);
    }), U = c ? [] : e.series.filter((x) => {
      var R;
      return (R = x.meta) == null ? void 0 : R.companion;
    }), z = new Map(e.series.map((x) => [x.key, ot(x)])), L = [], X = (x) => `cv-area-fill-${x.replace(/[^a-zA-Z0-9_-]/g, "-")}`, te = s ? void 0 : T.map((x) => ({
      id: X(x.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: ot(x), opacity: _ * 0.15 },
        { offset: 1, color: ot(x), opacity: _ }
      ]
    }));
    if (s)
      for (const { stackId: x, series: R } of as(T)) {
        const F = it(e, { series: R, skipNull: k, temporal: u });
        L.push(
          qr(F, {
            id: x ? `cv-area-stack-${x}` : "cv-area-stack",
            x: A,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (G) => `${G.key}:${G.i}`,
            curve: $,
            fillOpacity: D,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (G) => z.get(G.key) ?? "currentColor",
            strokeWidth: E,
            layout: c ? Ma({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const x of T) {
        const R = it(e, { series: [x], skipNull: k, temporal: u });
        L.push(
          qr(R, {
            id: `cv-area-${x.key}`,
            x: A,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: $,
            fill: `url(#${X(x.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: ot(x),
            strokeWidth: E
          })
        );
      }
    for (const x of U) {
      const R = it(e, { series: [x], skipNull: k, temporal: u });
      L.push(
        nr(R, {
          id: `cv-area-prev-${x.key}`,
          x: A,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: $,
          strokeWidth: E,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: ot(x)
        })
      );
    }
    const re = new Set(
      T.filter((x) => ms(x, o.dots)).map((x) => x.key)
    );
    if (re.size > 0) {
      const x = s ? Zr(e, T, { normalize: c, temporal: u }).filter(
        (R) => re.has(R.key) && R.value !== null
      ) : it(e, {
        series: T.filter((R) => re.has(R.key)),
        skipNull: !0,
        temporal: u
      });
      L.push(
        Fa(x, {
          id: "cv-area-dots",
          x: A,
          y: (R) => s ? R.y2 ?? null : R.value,
          z: "label",
          color: "label",
          key: (R) => `${R.key}:${R.i}`,
          r: 3
        })
      );
    }
    return L.push(
      ...Ko(o.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: Yo(e)
      })
    ), L.push(Aa({ x: {}, y: !1, marker: !0 })), pt({
      marks: L,
      gradients: te,
      x: {
        scale: us(u),
        axis: (ue = (me = t.axes) == null ? void 0 : me.x) != null && ue.hide ? !1 : {
          label: M.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: P.scale,
        nice: P.nice,
        grid: !0,
        axis: (ve = (pe = t.axes) == null ? void 0 : pe.y) != null && ve.hide ? !1 : {
          label: M.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (x) => {
              var R;
              return c ? mt(x) : qe(n, (R = t.axes) == null ? void 0 : R.y).value(x, V, "axis");
            }
          }
        }
      },
      color: Go(e, {
        legend: kn(t) && e.series.length > 1,
        legendPlacement: Yt((H = t.legend) == null ? void 0 : H.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((ne = t.tooltip) == null ? void 0 : ne.show) === !1 ? void 0 : sr({
        format: n,
        percentShare: c,
        category: d,
        indicator: (le = t.tooltip) == null ? void 0 : le.indicator,
        showTotal: (I = t.tooltip) == null ? void 0 : I.showTotal
      }),
      keyboard: !0,
      controls: f
    });
  }, [e, t, n, o, r, s, c, u, d, g, f]), h = e.series.map(vn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(vt, { definition: p, ariaLabel: h, className: "cv-chart--fill" });
}
const Pd = 0.26, Id = 0.03, Gi = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Td({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var p, h;
  const o = t.familyOptions ?? {}, i = e.series[0], a = qo(i), s = (h = (p = t.colors) == null ? void 0 : p.ramp) != null && h.length ? t.colors.ramp : ur, c = w.useMemo(() => {
    const y = e.categories.map((C, S) => ({
      label: n.category(C),
      value: (i == null ? void 0 : i.data[S]) ?? 0
    }));
    return Dd(y, o.maxSlices).map((C, S) => ({
      ...C,
      token: s[S % s.length]
    }));
  }, [e, n, i, o.maxSlices, s]), u = c.reduce((y, C) => y + C.value, 0), d = c.some((y) => y.value < 0), m = d || c.length === 0 || u <= 0, g = w.useMemo(() => {
    var M, P, V;
    if (m) return null;
    const y = (o.innerRadiusPct ?? 0) / 100, C = y > 0, S = o.showLabels ?? "percent", A = S !== "none", k = A ? Math.min(r.pieRadiusPct / 100, 1 - Pd) : r.pieRadiusPct / 100, N = iu(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), _ = [Ur(N, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: T }) => T * y,
      outerRadius: ({ radius: T }) => T * k,
      cornerRadius: r.pieCornerRadius
    })];
    if (A) {
      const T = (U) => S === "name" ? U.label : S === "value" ? n.value(U.value, a, "label") : mt(U.fraction);
      _.push(
        Rr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          N.filter((U) => U.value > 0 && U.fraction >= Id),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (U) => U.angle,
            radius: k,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: T,
            fill: "var(--foreground)",
            fontSize: 11,
            // "outside" reads each slice's own angle and anchors the text away from
            // the centre — start on the right half, end on the left — so labels grow
            // outward instead of back across the slice they belong to.
            anchor: "outside",
            baseline: "middle"
          }
        )
      );
    }
    if (C && o.centerLabel) {
      const T = o.centerLabel.value === void 0 || o.centerLabel.value === "total" ? n.value(u, a, "label") : o.centerLabel.value;
      if (_.push(
        Rr([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => T,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), o.centerLabel.label) {
        const U = o.centerLabel.label;
        _.push(
          Rr([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => U,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const D = {
      domain: c.map((T) => T.label),
      range: c.map((T) => `var(--${T.token})`)
    };
    kn(t) && (D.legend = Mo({ placement: Yt((M = t.legend) == null ? void 0 : M.position) }));
    const E = i ? i.label || i.key : "";
    return pt({
      marks: [
        ja({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Vn().domain([0, Math.PI * 2]) },
          radius: { scale: Vn().domain([0, 1]) },
          marks: _
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: D,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((P = t.tooltip) == null ? void 0 : P.show) === !1 ? void 0 : {
        use: Fo,
        className: Wo((V = t.tooltip) == null ? void 0 : V.indicator),
        content: (T) => {
          const U = T[0];
          if (!U) return { rows: [] };
          const z = U.datum;
          return {
            title: z.label,
            rows: [
              {
                label: E,
                value: `${n.value(z.value, a, "tooltip")} (${mt(z.fraction)})`,
                color: U.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, c, u, t, n, o, r, i, a]);
  if (d)
    return /* @__PURE__ */ l("div", { style: Gi, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: Gi, children: "No data" });
  const f = c.map((y) => y.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(vt, { definition: g, ariaLabel: f, className: "cv-chart--fill" });
}
function Dd(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, a) => a.value - i.value), r = n.slice(0, t - 1), o = n.slice(t - 1);
  return [...r, { label: "Other", value: o.reduce((i, a) => i + a.value, 0) }];
}
function Ed({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = e.raw.annotation, a = (f) => {
    var p, h;
    return ((p = i == null ? void 0 : i.measures[f]) == null ? void 0 : p.shortTitle) ?? ((h = i == null ? void 0 : i.dimensions[f]) == null ? void 0 : h.shortTitle) ?? f;
  }, s = o.x ? a(o.x) : "x", c = o.y ? a(o.y) : "y", u = o.size ? a(o.size) : void 0, d = w.useMemo(() => {
    var z, L, X, te, re, ce, me, ue, pe, ve, H, ne, le, I;
    if (!o.x || !o.y) return null;
    const f = Vd(e.raw.rows, o);
    if (f.length === 0) return null;
    const p = !!o.groupBy, h = [];
    if (p)
      for (const x of f)
        x.group !== void 0 && !h.includes(x.group) && h.push(x.group);
    const [y, C] = r.bubbleAreaRange, S = Math.sqrt(Math.max(y, 0) / Math.PI), A = Math.sqrt(Math.max(C, 0) / Math.PI), k = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, N = (L = (z = t.colors) == null ? void 0 : z.ramp) != null && L.length ? t.colors.ramp : ur;
    p ? (k.z = "group", k.color = "group") : k.fill = `var(--${N[0]})`, o.size ? (k.r = (x) => x.size ?? 0, k.rScale = { scale: () => dc().range([S, A]) }) : k.r = 4;
    const $ = [Fa(f, k)];
    (X = o.referenceLines) == null || X.forEach((x, R) => {
      const F = `var(--${x.colorToken ?? "muted-foreground"})`, G = { stroke: F, strokeWidth: 1.25, strokeDasharray: "4 4" };
      x.axis === "y" ? ($.push(xa([x.value], { id: `cv-ref-${R}`, ...G })), x.label && $.push(
        hn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${R}`,
          y: "v",
          text: "label",
          fill: F,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : ($.push(_a([x.value], { id: `cv-ref-${R}`, ...G })), x.label && $.push(
        hn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${R}`,
          x: "v",
          text: "label",
          fill: F,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let _;
    p && (_ = {
      domain: h,
      range: h.map((x, R) => `var(--${N[R % N.length]})`)
    }, kn(t) && (_.legend = Mo({ placement: Yt((te = t.legend) == null ? void 0 : te.position) })));
    const D = jt((re = t.axes) == null ? void 0 : re.x, s), E = jt((ce = t.axes) == null ? void 0 : ce.y, c), M = Gt((me = t.axes) == null ? void 0 : me.x), P = Gt((ue = t.axes) == null ? void 0 : ue.y), V = o.x, T = o.y, U = o.size;
    return pt({
      marks: $,
      x: {
        scale: M.scale,
        nice: M.nice,
        grid: !0,
        axis: (ve = (pe = t.axes) == null ? void 0 : pe.x) != null && ve.hide ? !1 : {
          label: D,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (x) => {
              var R;
              return qe(n, (R = t.axes) == null ? void 0 : R.x).value(x, V, "axis");
            }
          }
        }
      },
      y: {
        scale: P.scale,
        nice: P.nice,
        grid: !0,
        axis: (ne = (H = t.axes) == null ? void 0 : H.y) != null && ne.hide ? !1 : {
          label: E,
          ticks: {
            format: (x) => {
              var R;
              return qe(n, (R = t.axes) == null ? void 0 : R.y).value(x, T, "axis");
            }
          }
        }
      },
      color: _,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((le = t.tooltip) == null ? void 0 : le.show) === !1 ? void 0 : {
        use: Fo,
        className: Wo((I = t.tooltip) == null ? void 0 : I.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (x) => {
          const F = x[0];
          if (!F) return { rows: [] };
          const G = F.datum, j = [
            { label: s, value: n.value(G.x, V, "tooltip") },
            { label: c, value: n.value(G.y, T, "tooltip") }
          ];
          return U && j.push({
            label: u ?? U,
            value: n.value(G.size, U, "tooltip")
          }), { title: G.group, color: F.color, rows: j };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, o, r, s, c, u]), m = o.groupBy, g = (f) => {
    var h;
    if (!f || !m) return null;
    const p = (h = f.datum) == null ? void 0 : h.group;
    return p === void 0 ? null : { member: m, value: p, label: p };
  };
  return d ? /* @__PURE__ */ l(
    vt,
    {
      definition: d,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: g
    }
  ) : /* @__PURE__ */ l("div", { style: Ld, children: "No data" });
}
const Ld = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Vd(e, t) {
  const n = [];
  return e.forEach((r, o) => {
    const i = Nr(r[t.x]), a = Nr(r[t.y]);
    i === null || a === null || n.push({
      x: i,
      y: a,
      size: t.size ? Nr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: o
    });
  }), n;
}
function Nr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function zd(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function Hd(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Gd(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function gs(e, t, n) {
  const r = (o) => {
    const i = typeof o == "number" ? o : Number(o), a = Number.isFinite(i) ? Gd(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(a * 100)}%, transparent)`;
  };
  return r.copy = () => gs(e, t, n), r;
}
function jd({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: o, y: i, value: a } = zd(t), s = e.raw.rows, c = e.raw.annotation, u = w.useMemo(() => {
    if (!o || !i || !a || s.length === 0) return [];
    const g = eo(s, o), f = eo(s, i), p = /* @__PURE__ */ new Map();
    return s.forEach((h, y) => {
      const C = Hd(h[a]), S = h[g], A = h[f];
      if (C === null || S === null || S === void 0 || A === null || A === void 0)
        return;
      const k = typeof S == "number" ? S : String(S), N = String(A);
      p.set(`${k}\0${N}`, {
        cat: k,
        label: N,
        value: C,
        key: `${k}|${N}`,
        member: a,
        i: y
      });
    }), [...p.values()];
  }, [s, o, i, a]), d = w.useMemo(() => {
    var S, A, k, N, $, _, D, E;
    let g = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY;
    for (const M of u)
      M.value < g && (g = M.value), M.value > f && (f = M.value);
    const p = (M) => {
      if (!M) return;
      const P = (c == null ? void 0 : c.dimensions[M]) ?? (c == null ? void 0 : c.timeDimensions[M]) ?? (c == null ? void 0 : c.measures[M]);
      return (P == null ? void 0 : P.shortTitle) ?? (P == null ? void 0 : P.title) ?? M;
    }, h = jt((S = t.axes) == null ? void 0 : S.x, p(o)), y = jt((A = t.axes) == null ? void 0 : A.y, p(i)), C = [
      oc(u, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return u.length > 0 && u.length <= 100 && C.push(
      // Decorative: the in-cell number restates the cell's own value, so it must
      // not emit a second focus point (the tooltip would list the cell twice).
      Uo(
        hn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (M) => n.value(M.value, M.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), pt({
      marks: C,
      x: {
        scale: () => Un(0.05),
        axis: (N = (k = t.axes) == null ? void 0 : k.x) != null && N.hide ? !1 : {
          label: h,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (M) => {
              var P;
              return qe(n, (P = t.axes) == null ? void 0 : P.x).category(M);
            }
          }
        }
      },
      y: {
        scale: () => Un(0.05),
        axis: (_ = ($ = t.axes) == null ? void 0 : $.y) != null && _.hide ? !1 : {
          label: y,
          ticks: {
            format: (M) => {
              var P;
              return qe(n, (P = t.axes) == null ? void 0 : P.y).category(M);
            }
          }
        }
      },
      color: {
        scale: gs(g, f, r.colorToken ?? "chart-1")
      },
      tooltip: ((D = t.tooltip) == null ? void 0 : D.show) === !1 ? void 0 : sr({ format: n, indicator: (E = t.tooltip) == null ? void 0 : E.indicator })
    });
  }, [u, t, n, r, c, o, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const m = `Heatmap of ${a ?? "value"} by ${o ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(vt, { definition: d, ariaLabel: m, className: "cv-chart--fill" });
}
function Bd(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function qd(e) {
  return `cv-kpi-trend--${e}`;
}
function Wd(e) {
  var c, u, d, m;
  const { data: t, options: n, format: r } = e, o = n.familyOptions ?? {}, i = (g) => r.value(g, o.measure, "kpi"), a = ps([t.raw.rows[0] ?? {}], o.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[o.measure]) == null ? void 0 : u.shortTitle) ?? ((m = (d = t.raw.annotation) == null ? void 0 : d.measures[o.measure]) == null ? void 0 : m.title) ?? o.measure;
  return o.display === "gauge" ? /* @__PURE__ */ l(tm, { value: a, label: s, fmt: i, fo: o }) : /* @__PURE__ */ l(Ud, { ...e, value: a, label: s, fo: o, fmt: i });
}
function Ud({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const o = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : rm(e.raw.rows, t, n), a = !!n.comparison, s = a && !i && Kd(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((f) => f !== null), d = i ? i.diff : c ? Jd(c) : 0, m = qd(Bd(d, o));
  return /* @__PURE__ */ b("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ b("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      a && (i ? /* @__PURE__ */ l(Zd, { delta: i, goodDirection: o, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Yd, {}) : /* @__PURE__ */ l(Qd, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Xd, { data: e, series: c, colorClass: m }) })
  ] });
}
function Kd(e, t) {
  var r, o, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (o = e.timeDimensions) == null ? void 0 : o[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((a) => !a) : String(n).trim() === "";
}
function Yd() {
  return /* @__PURE__ */ b(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Ia, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Qd() {
  return /* @__PURE__ */ b("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Pa, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Xd({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = w.useMemo(() => {
    const o = it(e, { series: [t], skipNull: !0 }), i = Gt(void 0);
    return pt({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        qr(o, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: yn("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        nr(o, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: yn("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: ss, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    vt,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Jd(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Zd({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var d;
  const o = e.diff > 0, i = e.diff === 0, a = i ? !0 : o === (t === "up"), s = i ? Pa : o ? Ao : $o, c = (d = n.comparison) != null && d.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ b(
    "span",
    {
      className: `cv-kpi-chip cv-kpi-delta ${i ? "cv-kpi-delta--flat" : a ? "cv-kpi-delta--good" : "cv-kpi-delta--bad"}`,
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${r(e.diff)}`,
      children: [
        /* @__PURE__ */ l(s, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: c })
      ]
    }
  );
}
const tn = -(2 * Math.PI) / 3, to = 2 * Math.PI / 3, em = to - tn;
function tm({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, m;
  const o = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, i = ((m = r.gauge) == null ? void 0 : m.max) ?? Math.max(e ?? 0, 1), a = i > o ? i : o + 1, s = e === null ? o : Math.max(o, Math.min(a, e)), c = (e === null ? void 0 : nm(e, r)) ?? "chart-1", u = w.useMemo(() => {
    const g = (s - o) / (a - o), f = tn + g * em, p = ({ radius: C }) => C * 0.7, h = Ur([{ startAngle: tn, endAngle: to }], {
      id: "cv-gauge-track",
      innerRadius: p,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), y = g > 0 ? [
      h,
      Ur([{ startAngle: tn, endAngle: f }], {
        id: "cv-gauge-value",
        innerRadius: p,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [h];
    return pt({
      marks: [
        ja({
          id: "cv-gauge",
          startAngle: tn,
          endAngle: to,
          marks: y
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [o, a, s, c]);
  return /* @__PURE__ */ b("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      vt,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ b("div", { className: "cv-kpi-gauge-center", children: [
      /* @__PURE__ */ l(
        "span",
        {
          className: e === null ? "cv-kpi-gauge-value cv-kpi-gauge-value--empty" : "cv-kpi-gauge-value",
          children: e === null ? "—" : n(e)
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-kpi-gauge-label", children: t })
    ] })
  ] });
}
function nm(e, t) {
  var o;
  const n = (o = t.gauge) == null ? void 0 : o.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((a, s) => a.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function ps(e, t) {
  for (const n of e) {
    const r = hs(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function rm(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let o = null;
  if (r.mode === "value")
    typeof r.value == "number" ? o = r.value : typeof r.value == "string" && (o = ps(e, r.value));
  else {
    const s = e[1];
    o = s ? hs(s[n.measure]) : null;
  }
  if (o === null) return null;
  const i = t - o, a = o !== 0 ? i / o : null;
  return { current: t, baseline: o, diff: i, pct: a };
}
function hs(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function at(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Oe(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: at(n, r[e])
    }));
  };
}
function lr(e) {
  return e instanceof Function;
}
function om(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function im(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const a = t(i);
      a != null && a.length && r(a);
    });
  };
  return r(e), n;
}
function K(e, t, n) {
  let r = [], o;
  return (i) => {
    let a;
    n.key && n.debug && (a = Date.now());
    const s = e(i);
    if (!(s.length !== r.length || s.some((d, m) => r[m] !== d)))
      return o;
    r = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), o = t(...s), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - a) * 100) / 100, m = Math.round((Date.now() - u) * 100) / 100, g = m / 16, f = (p, h) => {
        for (p = String(p); p.length < h; )
          p = " " + p;
        return p;
      };
      console.info(`%c⏱ ${f(m, 5)} /${f(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function Y(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function am(e, t, n, r) {
  const o = () => {
    var a;
    return (a = i.getValue()) != null ? a : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: K(() => [e, n, t, i], (a, s, c, u) => ({
      table: a,
      column: s,
      row: c,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), Y(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((a) => {
    a.createCell == null || a.createCell(i, n, t, e);
  }, {}), i;
}
function sm(e, t, n, r) {
  var o, i;
  const s = {
    ...e._getDefaultColumnDef(),
    ...t
  }, c = s.accessorKey;
  let u = (o = (i = s.id) != null ? i : c ? typeof String.prototype.replaceAll == "function" ? c.replaceAll(".", "_") : c.replace(/\./g, "_") : void 0) != null ? o : typeof s.header == "string" ? s.header : void 0, d;
  if (s.accessorFn ? d = s.accessorFn : c && (c.includes(".") ? d = (g) => {
    let f = g;
    for (const h of c.split(".")) {
      var p;
      f = (p = f) == null ? void 0 : p[h], process.env.NODE_ENV !== "production" && f === void 0 && console.warn(`"${h}" in deeply nested key "${c}" returned undefined.`);
    }
    return f;
  } : d = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let m = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: r,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: K(() => [!0], () => {
      var g;
      return [m, ...(g = m.columns) == null ? void 0 : g.flatMap((f) => f.getFlatColumns())];
    }, Y(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: K(() => [e._getOrderColumnsFn()], (g) => {
      var f;
      if ((f = m.columns) != null && f.length) {
        let p = m.columns.flatMap((h) => h.getLeafColumns());
        return g(p);
      }
      return [m];
    }, Y(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(m, e);
  return m;
}
const Se = "debugHeaders";
function ji(e, t, n) {
  var r;
  let i = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const a = [], s = (c) => {
        c.subHeaders && c.subHeaders.length && c.subHeaders.map(s), a.push(c);
      };
      return s(i), a;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: t
    })
  };
  return e._features.forEach((a) => {
    a.createHeader == null || a.createHeader(i, e);
  }), i;
}
const lm = {
  createTable: (e) => {
    e.getHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, a;
      const s = (i = r == null ? void 0 : r.map((m) => n.find((g) => g.id === m)).filter(Boolean)) != null ? i : [], c = (a = o == null ? void 0 : o.map((m) => n.find((g) => g.id === m)).filter(Boolean)) != null ? a : [], u = n.filter((m) => !(r != null && r.includes(m.id)) && !(o != null && o.includes(m.id)));
      return Mn(t, [...s, ...u, ...c], e);
    }, Y(e.options, Se, "getHeaderGroups")), e.getCenterHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Mn(t, n, e, "center")), Y(e.options, Se, "getCenterHeaderGroups")), e.getLeftHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Mn(t, i, e, "left");
    }, Y(e.options, Se, "getLeftHeaderGroups")), e.getRightHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Mn(t, i, e, "right");
    }, Y(e.options, Se, "getRightHeaderGroups")), e.getFooterGroups = K(() => [e.getHeaderGroups()], (t) => [...t].reverse(), Y(e.options, Se, "getFooterGroups")), e.getLeftFooterGroups = K(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), Y(e.options, Se, "getLeftFooterGroups")), e.getCenterFooterGroups = K(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), Y(e.options, Se, "getCenterFooterGroups")), e.getRightFooterGroups = K(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), Y(e.options, Se, "getRightFooterGroups")), e.getFlatHeaders = K(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Y(e.options, Se, "getFlatHeaders")), e.getLeftFlatHeaders = K(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Y(e.options, Se, "getLeftFlatHeaders")), e.getCenterFlatHeaders = K(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Y(e.options, Se, "getCenterFlatHeaders")), e.getRightFlatHeaders = K(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Y(e.options, Se, "getRightFlatHeaders")), e.getCenterLeafHeaders = K(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Y(e.options, Se, "getCenterLeafHeaders")), e.getLeftLeafHeaders = K(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Y(e.options, Se, "getLeftLeafHeaders")), e.getRightLeafHeaders = K(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Y(e.options, Se, "getRightLeafHeaders")), e.getLeafHeaders = K(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, a, s, c, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(a = (s = n[0]) == null ? void 0 : s.headers) != null ? a : [], ...(c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []].map((d) => d.getLeafHeaders()).flat();
    }, Y(e.options, Se, "getLeafHeaders"));
  }
};
function Mn(e, t, n, r) {
  var o, i;
  let a = 0;
  const s = function(g, f) {
    f === void 0 && (f = 1), a = Math.max(a, f), g.filter((p) => p.getIsVisible()).forEach((p) => {
      var h;
      (h = p.columns) != null && h.length && s(p.columns, f + 1);
    }, 0);
  };
  s(e);
  let c = [];
  const u = (g, f) => {
    const p = {
      depth: f,
      id: [r, `${f}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    g.forEach((y) => {
      const C = [...h].reverse()[0], S = y.column.depth === p.depth;
      let A, k = !1;
      if (S && y.column.parent ? A = y.column.parent : (A = y.column, k = !0), C && (C == null ? void 0 : C.column) === A)
        C.subHeaders.push(y);
      else {
        const N = ji(n, A, {
          id: [r, f, A.id, y == null ? void 0 : y.id].filter(Boolean).join("_"),
          isPlaceholder: k,
          placeholderId: k ? `${h.filter(($) => $.column === A).length}` : void 0,
          depth: f,
          index: h.length
        });
        N.subHeaders.push(y), h.push(N);
      }
      p.headers.push(y), y.headerGroup = p;
    }), c.push(p), f > 0 && u(h, f - 1);
  }, d = t.map((g, f) => ji(n, g, {
    depth: a,
    index: f
  }));
  u(d, a - 1), c.reverse();
  const m = (g) => g.filter((p) => p.column.getIsVisible()).map((p) => {
    let h = 0, y = 0, C = [0];
    p.subHeaders && p.subHeaders.length ? (C = [], m(p.subHeaders).forEach((A) => {
      let {
        colSpan: k,
        rowSpan: N
      } = A;
      h += k, C.push(N);
    })) : h = 1;
    const S = Math.min(...C);
    return y = y + S, p.colSpan = h, p.rowSpan = y, {
      colSpan: h,
      rowSpan: y
    };
  });
  return m((o = (i = c[0]) == null ? void 0 : i.headers) != null ? o : []), c;
}
const Qo = (e, t, n, r, o, i, a) => {
  let s = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: a,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (c) => {
      if (s._valuesCache.hasOwnProperty(c))
        return s._valuesCache[c];
      const u = e.getColumn(c);
      if (u != null && u.accessorFn)
        return s._valuesCache[c] = u.accessorFn(s.original, r), s._valuesCache[c];
    },
    getUniqueValues: (c) => {
      if (s._uniqueValuesCache.hasOwnProperty(c))
        return s._uniqueValuesCache[c];
      const u = e.getColumn(c);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (s._uniqueValuesCache[c] = u.columnDef.getUniqueValues(s.original, r), s._uniqueValuesCache[c]) : (s._uniqueValuesCache[c] = [s.getValue(c)], s._uniqueValuesCache[c]);
    },
    renderValue: (c) => {
      var u;
      return (u = s.getValue(c)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => im(s.subRows, (c) => c.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let c = [], u = s;
      for (; ; ) {
        const d = u.getParentRow();
        if (!d) break;
        c.push(d), u = d;
      }
      return c.reverse();
    },
    getAllCells: K(() => [e.getAllLeafColumns()], (c) => c.map((u) => am(e, s, u, u.id)), Y(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: K(() => [s.getAllCells()], (c) => c.reduce((u, d) => (u[d.column.id] = d, u), {}), Y(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let c = 0; c < e._features.length; c++) {
    const u = e._features[c];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, cm = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, vs = (e, t, n) => {
  var r, o;
  const i = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(t)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
vs.autoRemove = (e) => ze(e);
const ys = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
ys.autoRemove = (e) => ze(e);
const bs = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
bs.autoRemove = (e) => ze(e);
const ws = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
ws.autoRemove = (e) => ze(e);
const Cs = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Cs.autoRemove = (e) => ze(e) || !(e != null && e.length);
const Ss = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ss.autoRemove = (e) => ze(e) || !(e != null && e.length);
const ks = (e, t, n) => e.getValue(t) === n;
ks.autoRemove = (e) => ze(e);
const Rs = (e, t, n) => e.getValue(t) == n;
Rs.autoRemove = (e) => ze(e);
const Xo = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
Xo.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, a = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > a) {
    const s = i;
    i = a, a = s;
  }
  return [i, a];
};
Xo.autoRemove = (e) => ze(e) || ze(e[0]) && ze(e[1]);
const Qe = {
  includesString: vs,
  includesStringSensitive: ys,
  equalsString: bs,
  arrIncludes: ws,
  arrIncludesAll: Cs,
  arrIncludesSome: Ss,
  equals: ks,
  weakEquals: Rs,
  inNumberRange: Xo
};
function ze(e) {
  return e == null || e === "";
}
const um = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Oe("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? Qe.includesString : typeof r == "number" ? Qe.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? Qe.equals : Array.isArray(r) ? Qe.arrIncludes : Qe.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return lr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : Qe[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, o;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((d) => d.id === e.id), a = at(n, i ? i.value : void 0);
        if (Bi(o, a, e)) {
          var s;
          return (s = r == null ? void 0 : r.filter((d) => d.id !== e.id)) != null ? s : [];
        }
        const c = {
          id: e.id,
          value: a
        };
        if (i) {
          var u;
          return (u = r == null ? void 0 : r.map((d) => d.id === e.id ? c : d)) != null ? u : [];
        }
        return r != null && r.length ? [...r, c] : [c];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = at(t, o)) == null ? void 0 : i.filter((a) => {
          const s = n.find((c) => c.id === a.id);
          if (s) {
            const c = s.getFilterFn();
            if (Bi(c, a.value, s))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function Bi(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const dm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), mm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, fm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, gm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const a = i.getValue(e);
    a != null && (r === void 0 ? a >= a && (r = o = a) : (r > a && (r = a), o < a && (o = a)));
  }), [r, o];
}, pm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n) return r / n;
}, hm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!om(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, a) => i - a);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, vm = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), ym = (e, t) => new Set(t.map((n) => n.getValue(e))).size, bm = (e, t) => t.length, _r = {
  sum: dm,
  min: mm,
  max: fm,
  extent: gm,
  mean: pm,
  median: hm,
  unique: vm,
  uniqueCount: ym,
  count: bm
}, wm = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: Oe("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((r) => r !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, r;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((r = t.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      if (typeof r == "number")
        return _r.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return _r.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return lr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : _r[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, r;
      e.setGrouping(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const r = t.getColumn(n);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, r) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var o;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((o = n.subRows) != null && o.length);
    };
  }
};
function Cm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((a) => a.id === i)).filter(Boolean), ...r];
}
const Sm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Oe("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = K((n) => [dn(t, n)], (n) => n.findIndex((r) => r.id === e.id), Y(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = dn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = dn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = K(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const a = [...t], s = [...o];
        for (; s.length && a.length; ) {
          const c = a.shift(), u = s.findIndex((d) => d.id === c);
          u > -1 && i.push(s.splice(u, 1)[0]);
        }
        i = [...i, ...s];
      }
      return Cm(i, n, r);
    }, Y(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, xr = () => ({
  left: [],
  right: []
}), km = {
  getInitialState: (e) => ({
    columnPinning: xr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Oe("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, a;
        if (n === "right") {
          var s, c;
          return {
            left: ((s = o == null ? void 0 : o.left) != null ? s : []).filter((m) => !(r != null && r.includes(m))),
            right: [...((c = o == null ? void 0 : o.right) != null ? c : []).filter((m) => !(r != null && r.includes(m))), ...r]
          };
        }
        if (n === "left") {
          var u, d;
          return {
            left: [...((u = o == null ? void 0 : o.left) != null ? u : []).filter((m) => !(r != null && r.includes(m))), ...r],
            right: ((d = o == null ? void 0 : o.right) != null ? d : []).filter((m) => !(r != null && r.includes(m)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((m) => !(r != null && r.includes(m))),
          right: ((a = o == null ? void 0 : o.right) != null ? a : []).filter((m) => !(r != null && r.includes(m)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var o, i, a;
      return ((o = r.columnDef.enablePinning) != null ? o : !0) && ((i = (a = t.options.enableColumnPinning) != null ? a : t.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((s) => s.id), {
        left: r,
        right: o
      } = t.getState().columnPinning, i = n.some((s) => r == null ? void 0 : r.includes(s)), a = n.some((s) => o == null ? void 0 : o.includes(s));
      return i ? "left" : a ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      return o ? (n = (r = t.getState().columnPinning) == null || (r = r[o]) == null ? void 0 : r.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.getCenterVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((a) => !i.includes(a.column.id));
    }, Y(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), Y(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), Y(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? xr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : xr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Y(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Y(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, Y(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function Rm(e) {
  return e || (typeof document < "u" ? document : null);
}
const Fn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Mr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Nm = {
  getDefaultColumnDef: () => Fn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Mr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Oe("columnSizing", e),
    onColumnSizingInfoChange: Oe("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Fn.minSize, (r = i ?? e.columnDef.size) != null ? r : Fn.size), (o = e.columnDef.maxSize) != null ? o : Fn.maxSize);
    }, e.getStart = K((n) => [n, dn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), Y(t.options, "debugColumns", "getStart")), e.getAfter = K((n) => [n, dn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), Y(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: r,
          ...o
        } = n;
        return o;
      });
    }, e.getCanResize = () => {
      var n, r;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((r = t.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const r = (o) => {
        if (o.subHeaders.length)
          o.subHeaders.forEach(r);
        else {
          var i;
          n += (i = o.column.getSize()) != null ? i : 0;
        }
      };
      return r(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const r = t.getColumn(e.column.id), o = r == null ? void 0 : r.getCanResize();
      return (i) => {
        if (!r || !o || (i.persist == null || i.persist(), Fr(i) && i.touches && i.touches.length > 1))
          return;
        const a = e.getSize(), s = e ? e.getLeafHeaders().map((C) => [C.column.id, C.column.getSize()]) : [[r.id, r.getSize()]], c = Fr(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, d = (C, S) => {
          typeof S == "number" && (t.setColumnSizingInfo((A) => {
            var k, N;
            const $ = t.options.columnResizeDirection === "rtl" ? -1 : 1, _ = (S - ((k = A == null ? void 0 : A.startOffset) != null ? k : 0)) * $, D = Math.max(_ / ((N = A == null ? void 0 : A.startSize) != null ? N : 0), -0.999999);
            return A.columnSizingStart.forEach((E) => {
              let [M, P] = E;
              u[M] = Math.round(Math.max(P + P * D, 0) * 100) / 100;
            }), {
              ...A,
              deltaOffset: _,
              deltaPercentage: D
            };
          }), (t.options.columnResizeMode === "onChange" || C === "end") && t.setColumnSizing((A) => ({
            ...A,
            ...u
          })));
        }, m = (C) => d("move", C), g = (C) => {
          d("end", C), t.setColumnSizingInfo((S) => ({
            ...S,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, f = Rm(n), p = {
          moveHandler: (C) => m(C.clientX),
          upHandler: (C) => {
            f == null || f.removeEventListener("mousemove", p.moveHandler), f == null || f.removeEventListener("mouseup", p.upHandler), g(C.clientX);
          }
        }, h = {
          moveHandler: (C) => (C.cancelable && (C.preventDefault(), C.stopPropagation()), m(C.touches[0].clientX), !1),
          upHandler: (C) => {
            var S;
            f == null || f.removeEventListener("touchmove", h.moveHandler), f == null || f.removeEventListener("touchend", h.upHandler), C.cancelable && (C.preventDefault(), C.stopPropagation()), g((S = C.touches[0]) == null ? void 0 : S.clientX);
          }
        }, y = _m() ? {
          passive: !1
        } : !1;
        Fr(i) ? (f == null || f.addEventListener("touchmove", h.moveHandler, y), f == null || f.addEventListener("touchend", h.upHandler, y)) : (f == null || f.addEventListener("mousemove", p.moveHandler, y), f == null || f.addEventListener("mouseup", p.upHandler, y)), t.setColumnSizingInfo((C) => ({
          ...C,
          startOffset: c,
          startSize: a,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: s,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? Mr() : (n = e.initialState.columnSizingInfo) != null ? n : Mr());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    };
  }
};
let An = null;
function _m() {
  if (typeof An == "boolean") return An;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return An = e, An;
}
function Fr(e) {
  return e.type === "touchstart";
}
const xm = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Oe("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((r) => ({
        ...r,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, r;
      const o = e.columns;
      return (n = o.length ? o.some((i) => i.getIsVisible()) : (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = K(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), Y(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = K(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], Y(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => K(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), Y(e.options, "debugColumns", n));
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var r;
      e.setColumnVisibility(n ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var r;
      n = (r = n) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((o, i) => ({
        ...o,
        [i.id]: n || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var r;
      e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
    };
  }
};
function dn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Mm = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Fm = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Oe("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, r, o, i;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && ((i = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => Qe.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return lr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : Qe[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Am = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Oe("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var o, i;
      e.setExpanded(r ? {} : (o = (i = e.initialState) == null ? void 0 : i.expanded) != null ? o : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((o) => !o.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const a = i.split(".");
        r = Math.max(r, a.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((r) => {
        var o;
        const i = r === !0 ? !0 : !!(r != null && r[e.id]);
        let a = {};
        if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((s) => {
          a[s] = !0;
        }) : a = r, n = (o = n) != null ? o : !i, !i && n)
          return {
            ...a,
            [e.id]: !0
          };
        if (i && !n) {
          const {
            [e.id]: s,
            ...c
          } = a;
          return c;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var n;
      const r = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var n, r, o;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((r = t.options.enableExpanding) != null ? r : !0) && !!((o = e.subRows) != null && o.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, r = e;
      for (; n && r.parentId; )
        r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, no = 0, ro = 10, Ar = () => ({
  pageIndex: no,
  pageSize: ro
}), $m = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Ar(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Oe("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (r) => {
      const o = (i) => at(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Ar() : (o = e.initialState.pagination) != null ? o : Ar());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = at(r, o.pageIndex);
        const a = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, a)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? no : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : no);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? ro : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : ro);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, at(r, o.pageSize)), a = o.pageSize * o.pageIndex, s = Math.floor(a / i);
        return {
          ...o,
          pageIndex: s,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let a = at(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof a == "number" && (a = Math.max(-1, a)), {
        ...o,
        pageCount: a
      };
    }), e.getPageOptions = K(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, a) => a)), o;
    }, Y(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, $r = () => ({
  top: [],
  bottom: []
}), Om = {
  getInitialState: (e) => ({
    rowPinning: $r(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Oe("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((c) => {
        let {
          id: u
        } = c;
        return u;
      }) : [], a = o ? e.getParentRows().map((c) => {
        let {
          id: u
        } = c;
        return u;
      }) : [], s = /* @__PURE__ */ new Set([...a, e.id, ...i]);
      t.setRowPinning((c) => {
        var u, d;
        if (n === "bottom") {
          var m, g;
          return {
            top: ((m = c == null ? void 0 : c.top) != null ? m : []).filter((h) => !(s != null && s.has(h))),
            bottom: [...((g = c == null ? void 0 : c.bottom) != null ? g : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var f, p;
          return {
            top: [...((f = c == null ? void 0 : c.top) != null ? f : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)],
            bottom: ((p = c == null ? void 0 : c.bottom) != null ? p : []).filter((h) => !(s != null && s.has(h)))
          };
        }
        return {
          top: ((u = c == null ? void 0 : c.top) != null ? u : []).filter((h) => !(s != null && s.has(h))),
          bottom: ((d = c == null ? void 0 : c.bottom) != null ? d : []).filter((h) => !(s != null && s.has(h)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: r,
        enablePinning: o
      } = t.options;
      return typeof r == "function" ? r(e) : (n = r ?? o) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: r,
        bottom: o
      } = t.getState().rowPinning, i = n.some((s) => r == null ? void 0 : r.includes(s)), a = n.some((s) => o == null ? void 0 : o.includes(s));
      return i ? "top" : a ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      if (!o) return -1;
      const i = (n = o === "top" ? t.getTopRows() : t.getBottomRows()) == null ? void 0 : n.map((a) => {
        let {
          id: s
        } = a;
        return s;
      });
      return (r = i == null ? void 0 : i.indexOf(e.id)) != null ? r : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? $r() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : $r());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = (t, n, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((a) => {
          const s = e.getRow(a, !0);
          return s.getIsAllParentsExpanded() ? s : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((a) => t.find((s) => s.id === a))
      )).filter(Boolean).map((a) => ({
        ...a,
        position: r
      }));
    }, e.getTopRows = K(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), Y(e.options, "debugRows", "getTopRows")), e.getBottomRows = K(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), Y(e.options, "debugRows", "getBottomRows")), e.getCenterRows = K(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, Y(e.options, "debugRows", "getCenterRows"));
  }
}, Pm = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Oe("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const r = {
          ...n
        }, o = e.getPreGroupedRowModel().flatRows;
        return t ? o.forEach((i) => {
          i.getCanSelect() && (r[i.id] = !0);
        }) : o.forEach((i) => {
          delete r[i.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const r = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), o = {
        ...n
      };
      return e.getRowModel().rows.forEach((i) => {
        oo(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = K(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Or(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Y(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = K(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Or(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Y(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = K(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Or(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Y(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let r = !!(t.length && Object.keys(n).length);
      return r && t.some((o) => o.getCanSelect() && !n[o.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((o) => o.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let r = !!t.length;
      return r && t.some((o) => !n[o.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, r) => {
      const o = e.getIsSelected();
      t.setRowSelection((i) => {
        var a;
        if (n = typeof n < "u" ? n : !o, e.getCanSelect() && o === n)
          return i;
        const s = {
          ...i
        };
        return oo(s, e.id, n, (a = r == null ? void 0 : r.selectChildren) != null ? a : !0, t), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Jo(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return io(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return io(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (r) => {
        var o;
        n && e.toggleSelected((o = r.target) == null ? void 0 : o.checked);
      };
    };
  }
}, oo = (e, t, n, r, o) => {
  var i;
  const a = o.getRow(t, !0);
  n ? (a.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), a.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = a.subRows) != null && i.length && a.getCanSelectSubRows() && a.subRows.forEach((s) => oo(e, s.id, n, r, o));
};
function Or(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(a, s) {
    return a.map((c) => {
      var u;
      const d = Jo(c, n);
      if (d && (r.push(c), o[c.id] = c), (u = c.subRows) != null && u.length && (c = {
        ...c,
        subRows: i(c.subRows)
      }), d)
        return c;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function Jo(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function io(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((a) => {
    if (!(i && !o) && (a.getCanSelect() && (Jo(a, t) ? i = !0 : o = !1), a.subRows && a.subRows.length)) {
      const s = io(a, t);
      s === "all" ? i = !0 : (s === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const ao = /([0-9]+)/gm, Im = (e, t, n) => Ns(ft(e.getValue(n)).toLowerCase(), ft(t.getValue(n)).toLowerCase()), Tm = (e, t, n) => Ns(ft(e.getValue(n)), ft(t.getValue(n))), Dm = (e, t, n) => Zo(ft(e.getValue(n)).toLowerCase(), ft(t.getValue(n)).toLowerCase()), Em = (e, t, n) => Zo(ft(e.getValue(n)), ft(t.getValue(n))), Lm = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, Vm = (e, t, n) => Zo(e.getValue(n), t.getValue(n));
function Zo(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function ft(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ns(e, t) {
  const n = e.split(ao).filter(Boolean), r = t.split(ao).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), a = parseInt(o, 10), s = parseInt(i, 10), c = [a, s].sort();
    if (isNaN(c[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(c[1]))
      return isNaN(a) ? -1 : 1;
    if (a > s)
      return 1;
    if (s > a)
      return -1;
  }
  return n.length - r.length;
}
const Jt = {
  alphanumeric: Im,
  alphanumericCaseSensitive: Tm,
  text: Dm,
  textCaseSensitive: Em,
  datetime: Lm,
  basic: Vm
}, zm = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Oe("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return Jt.datetime;
        if (typeof i == "string" && (r = !0, i.split(ao).length > 1))
          return Jt.alphanumeric;
      }
      return r ? Jt.text : Jt.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return lr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : Jt[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((a) => {
        const s = a == null ? void 0 : a.find((f) => f.id === e.id), c = a == null ? void 0 : a.findIndex((f) => f.id === e.id);
        let u = [], d, m = i ? n : o === "desc";
        if (a != null && a.length && e.getCanMultiSort() && r ? s ? d = "toggle" : d = "add" : a != null && a.length && c !== a.length - 1 ? d = "replace" : s ? d = "toggle" : d = "replace", d === "toggle" && (i || o || (d = "remove")), d === "add") {
          var g;
          u = [...a, {
            id: e.id,
            desc: m
          }], u.splice(0, u.length - ((g = t.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else d === "toggle" ? u = a.map((f) => f.id === e.id ? {
          ...f,
          desc: m
        } : f) : d === "remove" ? u = a.filter((f) => f.id !== e.id) : u = [{
          id: e.id,
          desc: m
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var n, r;
      return ((n = (r = e.columnDef.sortDescFirst) != null ? r : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var r, o;
      const i = e.getFirstSortDir(), a = e.getIsSorted();
      return a ? a !== i && ((r = t.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(n && (o = t.options.enableMultiRemove) != null) || o) ? !1 : a === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var n, r;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((r = t.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, r;
      return (n = (r = e.columnDef.enableMultiSort) != null ? r : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const r = (n = t.getState().sorting) == null ? void 0 : n.find((o) => o.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, r;
      return (n = (r = t.getState().sorting) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (r) => {
        n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, r;
      e.setSorting(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Hm = [
  lm,
  xm,
  Sm,
  km,
  cm,
  um,
  Mm,
  //depends on ColumnFaceting
  Fm,
  //depends on ColumnFiltering
  zm,
  wm,
  //depends on RowSorting
  Am,
  $m,
  Om,
  Pm,
  Nm
];
function Gm(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...Hm, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((g, f) => Object.assign(g, f.getDefaultOptions == null ? void 0 : f.getDefaultOptions(o)), {}), a = (g) => o.options.mergeOptions ? o.options.mergeOptions(i, g) : {
    ...i,
    ...g
  };
  let c = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((g) => {
    var f;
    c = (f = g.getInitialState == null ? void 0 : g.getInitialState(c)) != null ? f : c;
  });
  const u = [];
  let d = !1;
  const m = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: c,
    _queue: (g) => {
      u.push(g), d || (d = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        d = !1;
      }).catch((f) => setTimeout(() => {
        throw f;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (g) => {
      const f = at(g, o.options);
      o.options = a(f);
    },
    getState: () => o.options.state,
    setState: (g) => {
      o.options.onStateChange == null || o.options.onStateChange(g);
    },
    _getRowId: (g, f, p) => {
      var h;
      return (h = o.options.getRowId == null ? void 0 : o.options.getRowId(g, f, p)) != null ? h : `${p ? [p.id, f].join(".") : f}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, f) => {
      let p = (f ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[g];
      if (!p && (p = o.getCoreRowModel().rowsById[g], !p))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return p;
    },
    _getDefaultColumnDef: K(() => [o.options.defaultColumn], (g) => {
      var f;
      return g = (f = g) != null ? f : {}, {
        header: (p) => {
          const h = p.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (p) => {
          var h, y;
          return (h = (y = p.renderValue()) == null || y.toString == null ? void 0 : y.toString()) != null ? h : null;
        },
        ...o._features.reduce((p, h) => Object.assign(p, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...g
      };
    }, Y(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: K(() => [o._getColumnDefs()], (g) => {
      const f = function(p, h, y) {
        return y === void 0 && (y = 0), p.map((C) => {
          const S = sm(o, C, y, h), A = C;
          return S.columns = A.columns ? f(A.columns, S, y + 1) : [], S;
        });
      };
      return f(g);
    }, Y(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: K(() => [o.getAllColumns()], (g) => g.flatMap((f) => f.getFlatColumns()), Y(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: K(() => [o.getAllFlatColumns()], (g) => g.reduce((f, p) => (f[p.id] = p, f), {}), Y(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: K(() => [o.getAllColumns(), o._getOrderColumnsFn()], (g, f) => {
      let p = g.flatMap((h) => h.getLeafColumns());
      return f(p);
    }, Y(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const f = o._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !f && console.error(`[Table] Column with id '${g}' does not exist.`), f;
    }
  };
  Object.assign(o, m);
  for (let g = 0; g < o._features.length; g++) {
    const f = o._features[g];
    f == null || f.createTable == null || f.createTable(o);
  }
  return o;
}
function jm() {
  return (e) => K(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, a) {
      i === void 0 && (i = 0);
      const s = [];
      for (let u = 0; u < o.length; u++) {
        const d = Qo(e, e._getRowId(o[u], u, a), o[u], u, i, void 0, a == null ? void 0 : a.id);
        if (n.flatRows.push(d), n.rowsById[d.id] = d, s.push(d), e.options.getSubRows) {
          var c;
          d.originalSubRows = e.options.getSubRows(o[u], u), (c = d.originalSubRows) != null && c.length && (d.subRows = r(d.originalSubRows, i + 1, d));
        }
      }
      return s;
    };
    return n.rows = r(t), n;
  }, Y(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Bm(e) {
  const t = [], n = (r) => {
    var o;
    t.push(r), (o = r.subRows) != null && o.length && r.getIsExpanded() && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function qm(e, t, n) {
  return n.options.filterFromLeafRows ? Wm(e, t, n) : Um(e, t, n);
}
function Wm(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const d = [];
    for (let g = 0; g < c.length; g++) {
      var m;
      let f = c[g];
      const p = Qo(n, f.id, f.original, f.index, f.depth, void 0, f.parentId);
      if (p.columnFilters = f.columnFilters, (m = f.subRows) != null && m.length && u < a) {
        if (p.subRows = s(f.subRows, u + 1), f = p, t(f) && !p.subRows.length) {
          d.push(f), i[f.id] = f, o.push(f);
          continue;
        }
        if (t(f) || p.subRows.length) {
          d.push(f), i[f.id] = f, o.push(f);
          continue;
        }
      } else
        f = p, t(f) && (d.push(f), i[f.id] = f, o.push(f));
    }
    return d;
  };
  return {
    rows: s(e),
    flatRows: o,
    rowsById: i
  };
}
function Um(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const d = [];
    for (let g = 0; g < c.length; g++) {
      let f = c[g];
      if (t(f)) {
        var m;
        if ((m = f.subRows) != null && m.length && u < a) {
          const h = Qo(n, f.id, f.original, f.index, f.depth, void 0, f.parentId);
          h.subRows = s(f.subRows, u + 1), f = h;
        }
        d.push(f), o.push(f), i[f.id] = f;
      }
    }
    return d;
  };
  return {
    rows: s(e),
    flatRows: o,
    rowsById: i
  };
}
function Km() {
  return (e) => K(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let g = 0; g < t.flatRows.length; g++)
        t.flatRows[g].columnFilters = {}, t.flatRows[g].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((g) => {
      var f;
      const p = e.getColumn(g.id);
      if (!p)
        return;
      const h = p.getFilterFn();
      if (!h) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${p.id}.`);
        return;
      }
      o.push({
        id: g.id,
        filterFn: h,
        resolvedValue: (f = h.resolveFilterValue == null ? void 0 : h.resolveFilterValue(g.value)) != null ? f : g.value
      });
    });
    const a = (n ?? []).map((g) => g.id), s = e.getGlobalFilterFn(), c = e.getAllLeafColumns().filter((g) => g.getCanGlobalFilter());
    r && s && c.length && (a.push("__global__"), c.forEach((g) => {
      var f;
      i.push({
        id: g.id,
        filterFn: s,
        resolvedValue: (f = s.resolveFilterValue == null ? void 0 : s.resolveFilterValue(r)) != null ? f : r
      });
    }));
    let u, d;
    for (let g = 0; g < t.flatRows.length; g++) {
      const f = t.flatRows[g];
      if (f.columnFilters = {}, o.length)
        for (let p = 0; p < o.length; p++) {
          u = o[p];
          const h = u.id;
          f.columnFilters[h] = u.filterFn(f, h, u.resolvedValue, (y) => {
            f.columnFiltersMeta[h] = y;
          });
        }
      if (i.length) {
        for (let p = 0; p < i.length; p++) {
          d = i[p];
          const h = d.id;
          if (d.filterFn(f, h, d.resolvedValue, (y) => {
            f.columnFiltersMeta[h] = y;
          })) {
            f.columnFilters.__global__ = !0;
            break;
          }
        }
        f.columnFilters.__global__ !== !0 && (f.columnFilters.__global__ = !1);
      }
    }
    const m = (g) => {
      for (let f = 0; f < a.length; f++)
        if (g.columnFilters[a[f]] === !1)
          return !1;
      return !0;
    };
    return qm(t.rows, m, e);
  }, Y(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function Ym(e) {
  return (t) => K(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
    if (!r.rows.length)
      return r;
    const {
      pageSize: o,
      pageIndex: i
    } = n;
    let {
      rows: a,
      flatRows: s,
      rowsById: c
    } = r;
    const u = o * i, d = u + o;
    a = a.slice(u, d);
    let m;
    t.options.paginateExpandedRows ? m = {
      rows: a,
      flatRows: s,
      rowsById: c
    } : m = Bm({
      rows: a,
      flatRows: s,
      rowsById: c
    }), m.flatRows = [];
    const g = (f) => {
      m.flatRows.push(f), f.subRows.length && f.subRows.forEach(g);
    };
    return m.rows.forEach(g), m;
  }, Y(t.options, "debugTable", "getPaginationRowModel"));
}
function Qm() {
  return (e) => K(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((c) => {
      var u;
      return (u = e.getColumn(c.id)) == null ? void 0 : u.getCanSort();
    }), a = {};
    i.forEach((c) => {
      const u = e.getColumn(c.id);
      u && (a[c.id] = {
        sortUndefined: u.columnDef.sortUndefined,
        invertSorting: u.columnDef.invertSorting,
        sortingFn: u.getSortingFn()
      });
    });
    const s = (c) => {
      const u = c.map((d) => ({
        ...d
      }));
      return u.sort((d, m) => {
        for (let f = 0; f < i.length; f += 1) {
          var g;
          const p = i[f], h = a[p.id], y = h.sortUndefined, C = (g = p == null ? void 0 : p.desc) != null ? g : !1;
          let S = 0;
          if (y) {
            const A = d.getValue(p.id), k = m.getValue(p.id), N = A === void 0, $ = k === void 0;
            if (N || $) {
              if (y === "first") return N ? -1 : 1;
              if (y === "last") return N ? 1 : -1;
              S = N && $ ? 0 : N ? y : -y;
            }
          }
          if (S === 0 && (S = h.sortingFn(d, m, p.id)), S !== 0)
            return C && (S *= -1), h.invertSorting && (S *= -1), S;
        }
        return d.index - m.index;
      }), u.forEach((d) => {
        var m;
        o.push(d), (m = d.subRows) != null && m.length && (d.subRows = s(d.subRows));
      }), u;
    };
    return {
      rows: s(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, Y(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function qi(e, t) {
  return e ? Xm(e) ? /* @__PURE__ */ w.createElement(e, t) : e : null;
}
function Xm(e) {
  return Jm(e) || typeof e == "function" || Zm(e);
}
function Jm(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function Zm(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function ef(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = w.useState(() => ({
    current: Gm(t)
  })), [r, o] = w.useState(() => n.current.initialState);
  return n.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (a) => {
      o(a), e.onStateChange == null || e.onStateChange(a);
    }
  })), n.current;
}
const _s = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: O("cv-table", e), ...t }) })
);
_s.displayName = "Table";
const xs = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: O("cv-table-header", e), ...t }));
xs.displayName = "TableHeader";
const Ms = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: O("cv-table-body", e), ...t }));
Ms.displayName = "TableBody";
const In = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: O("cv-table-row", e),
      ...t
    }
  )
);
In.displayName = "TableRow";
const Fs = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: O("cv-table-head", e),
    ...t
  }
));
Fs.displayName = "TableHead";
const so = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: O("cv-table-cell", e),
    ...t
  }
));
so.displayName = "TableCell";
const tf = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: O("cv-table-caption", e), ...t }));
tf.displayName = "TableCaption";
const As = Io(
  // Semantic classes (styles/ui.css). `.cv-btn` carries the transition + :active
  // scale that give every button a tactile press response (it visibly reacts when
  // clicked); disabled buttons have pointer-events:none so they never animate.
  "cv-btn",
  {
    variants: {
      variant: {
        default: "cv-btn--default",
        secondary: "cv-btn--secondary",
        outline: "cv-btn--outline",
        ghost: "cv-btn--ghost",
        destructive: "cv-btn--destructive"
      },
      size: {
        sm: "cv-btn--size-sm",
        default: "cv-btn--size-default",
        lg: "cv-btn--size-lg",
        icon: "cv-btn--size-icon"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), J = w.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...o }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: O(As({ variant: t, size: n }), e),
      ...o
    }
  )
);
J.displayName = "Button";
const be = w.forwardRef(
  ({ className: e, type: t, id: n, ...r }, o) => {
    const i = w.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: o,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: O("cv-input", e),
        ...r
      }
    );
  }
);
be.displayName = "Input";
const nf = 8, rf = 12;
function of({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, o = e.raw.rows, i = e.raw.annotation, a = w.useMemo(
    () => af(o, i, r, n),
    [o, i, r, n]
  ), s = w.useMemo(
    () => a.map(($) => ({
      id: $.member,
      accessorFn: (_) => _[$.key],
      header: $.label,
      cell: (_) => $.render(_.getValue()),
      sortingFn: (_, D, E) => df(_.getValue(E), D.getValue(E)),
      // Global search matches what the reader SEES, not the raw number.
      filterFn: (_, D, E) => Wi($.text(_.getValue(D)), E),
      meta: $
    })),
    [a]
  ), [c, u] = w.useState([]), [d, m] = w.useState(""), [g, f] = w.useState({
    pageIndex: 0,
    pageSize: r.pageSize ?? 25
  }), p = ef({
    data: o,
    columns: s,
    state: { sorting: c, globalFilter: d, pagination: g },
    onSortingChange: u,
    onGlobalFilterChange: m,
    onPaginationChange: f,
    globalFilterFn: ($, _, D) => a.some((E) => Wi(E.text($.original[E.key]), D)),
    getCoreRowModel: jm(),
    getFilteredRowModel: Km(),
    getSortedRowModel: Qm(),
    getPaginationRowModel: Ym(),
    autoResetPageIndex: !0,
    enableMultiSort: !0,
    isMultiSortEvent: ($) => $.shiftKey
  }), h = p.getFilteredRowModel().rows.length, y = p.getPageCount(), { pageIndex: C, pageSize: S } = p.getState().pagination, A = o.length > nf, k = h > rf, N = p.getRowModel().rows;
  return /* @__PURE__ */ b("div", { className: "cv-table-family", children: [
    A && /* @__PURE__ */ b("div", { className: "cv-table-toolbar", children: [
      /* @__PURE__ */ b("div", { className: "cv-table-search", children: [
        /* @__PURE__ */ l(Ta, { className: "cv-table-search-icon" }),
        /* @__PURE__ */ l(
          be,
          {
            className: "cv-table-search-input",
            value: d,
            onChange: ($) => m($.target.value),
            placeholder: "Search",
            "aria-label": "Search rows"
          }
        )
      ] }),
      d && /* @__PURE__ */ b("span", { className: "cv-table-meta", children: [
        h,
        " of ",
        o.length
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ b(_s, { children: [
      /* @__PURE__ */ l(xs, { className: "cv-table-header--sticky", children: p.getHeaderGroups().map(($) => /* @__PURE__ */ l(In, { children: $.headers.map((_) => {
        const D = _.column.columnDef.meta, E = _.column.getIsSorted();
        return /* @__PURE__ */ l(
          Fs,
          {
            className: Ui(D.align),
            style: D.width ? { width: D.width } : void 0,
            "aria-sort": E === "asc" ? "ascending" : E === "desc" ? "descending" : "none",
            children: /* @__PURE__ */ b(
              J,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: _.column.getToggleSortingHandler(),
                title: "Sort (shift-click to add a column)",
                children: [
                  qi(_.column.columnDef.header, _.getContext()),
                  /* @__PURE__ */ l(uf, { dir: E || void 0 })
                ]
              }
            )
          },
          _.id
        );
      }) }, $.id)) }),
      /* @__PURE__ */ b(Ms, { children: [
        N.map(($) => /* @__PURE__ */ l(In, { children: $.getVisibleCells().map((_) => {
          const D = _.column.columnDef.meta, E = mf(D.member, _.getValue(), r.conditionalFormat);
          return /* @__PURE__ */ l(
            so,
            {
              className: O(Ui(D.align), k && "cv-table-cell--compact"),
              style: E ? { color: E } : void 0,
              children: qi(_.column.columnDef.cell, _.getContext())
            },
            _.id
          );
        }) }, $.id)),
        N.length === 0 && /* @__PURE__ */ l(In, { children: /* @__PURE__ */ l(so, { colSpan: Math.max(1, s.length), className: "cv-table-empty", children: d ? "No matches" : "No data" }) })
      ] })
    ] }) }),
    y > 1 && /* @__PURE__ */ b("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ b("span", { children: [
        C * S + 1,
        "–",
        Math.min((C + 1) * S, h),
        " of",
        " ",
        h
      ] }),
      /* @__PURE__ */ b("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          J,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => p.previousPage(),
            disabled: !p.getCanPreviousPage(),
            children: "Prev"
          }
        ),
        /* @__PURE__ */ b("span", { className: "cv-table-meta", children: [
          C + 1,
          " / ",
          y
        ] }),
        /* @__PURE__ */ l(
          J,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => p.nextPage(),
            disabled: !p.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function af(e, t, n, r) {
  var a;
  const o = e.length > 0 ? Object.keys(e[0]) : lf(t);
  return ((a = n.columns) != null && a.length ? n.columns : o.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = eo(e, c), d = t ? cf(t, c) : void 0, m = t ? c in t.measures : !1, g = s.label ?? (d == null ? void 0 : d.shortTitle) ?? (d == null ? void 0 : d.title) ?? c, f = s.align ?? (m ? "right" : "left"), p = s.format && r.derive ? r.derive(s.format) : r, h = (y) => sf(y, m, c, p);
    return {
      member: c,
      key: u,
      label: g,
      align: f,
      width: s.width,
      render: (y) => h(y),
      text: h
    };
  });
}
function sf(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const o = typeof e == "number" ? e : Number(e);
    return Number.isFinite(o) ? String(r.value(o, n)) : String(e);
  }
  return String(r.category(e));
}
function Wi(e, t) {
  const n = t.trim().toLowerCase();
  return n ? e.toLowerCase().includes(n) : !0;
}
function lf(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function cf(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ui(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function uf({ dir: e }) {
  return e ? e === "asc" ? /* @__PURE__ */ l(Ao, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l($o, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(vc, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function df(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function mf(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const o of n)
      if (o.member === e && ff(r, o.when.op, o.when.value))
        return `var(--${o.colorToken ?? "chart-1"})`;
  }
}
function ff(e, t, n) {
  switch (t) {
    case "gt":
      return e > n;
    case "lt":
      return e < n;
    case "gte":
      return e >= n;
    case "lte":
      return e <= n;
    case "eq":
      return e === n;
  }
}
const wt = "cv-sidebar--default", gf = "cv-sidebar--wide", $s = "a date or category", Pr = [
  {
    id: "y",
    label: "Values",
    hint: "the numbers to show",
    cardinality: "many",
    kinds: ["number"],
    target: { kind: "measures" },
    channel: "y"
  },
  {
    id: "x",
    // "Category" named the spec's storage slot, not what the user sees — the strip
    // along the bottom of the chart. placementBlockReason speaks it too
    // ("Horizontal axis needs a date or category").
    label: "Horizontal axis",
    hint: $s,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0,
    // A split IS the mapping's pivot dimension (series = measure × value).
    target: { kind: "pivot" },
    channel: "color"
  }
], pf = [
  {
    id: "value",
    label: "Value",
    hint: "the number that colors each cell",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "measures" },
    channel: "y"
  },
  {
    id: "hy",
    label: "Rows",
    hint: "a category (one row each)",
    cardinality: "one",
    kinds: ["category"],
    // Rows are stored exactly like a split (the mapping's pivot) but read as a
    // POSITION channel by the mark — hence `row`, not `color`.
    target: { kind: "pivot" },
    channel: "row"
  },
  {
    id: "hx",
    label: "Columns",
    hint: $s,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], hf = [
  {
    id: "slices",
    label: "Slices",
    hint: "one slice per value",
    cardinality: "one",
    kinds: ["category", "time"],
    target: { kind: "category" },
    channel: "x"
  },
  {
    id: "size",
    label: "Size",
    hint: "size of each slice",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "measures" },
    channel: "y"
  }
], vf = [
  {
    id: "sx",
    label: "Horizontal axis",
    hint: "a number",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "x" },
    channel: "x"
  },
  {
    id: "sy",
    label: "Vertical axis",
    hint: "a number",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "y" },
    channel: "y"
  },
  {
    id: "size",
    label: "Bubble size",
    hint: "a number",
    cardinality: "one",
    kinds: ["number"],
    optional: !0,
    target: { kind: "option", key: "size" },
    channel: "size"
  },
  {
    id: "color",
    label: "Split by",
    hint: "color points by category",
    cardinality: "one",
    kinds: ["category"],
    optional: !0,
    target: { kind: "option", key: "groupBy" },
    channel: "color"
  }
], yf = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], bf = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"],
    target: { kind: "optionList", key: "columns" },
    // A table column is pure DETAIL — no position/paint role — so a table's fields
    // only survive a type switch into another detail-bearing family.
    channel: "detail"
  }
], wf = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], nt = (e) => wf.indexOf(e), Ze = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Da,
    order: nt("bar"),
    component: Ad,
    optionsSchema: et.bar,
    defaults: tt.bar,
    wells: Pr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: wt
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Rc,
    order: nt("line"),
    component: $d,
    optionsSchema: et.line,
    defaults: tt.line,
    wells: Pr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: wt
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: yc,
    order: nt("area"),
    component: Od,
    optionsSchema: et.area,
    defaults: tt.area,
    wells: Pr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: wt
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: kc,
    order: nt("pie"),
    component: Td,
    optionsSchema: et.pie,
    defaults: tt.pie,
    wells: hf,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: wt
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Sc,
    order: nt("scatter"),
    component: Ed,
    optionsSchema: et.scatter,
    defaults: tt.scatter,
    wells: vf,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: wt
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Cc,
    order: nt("kpi"),
    component: Wd,
    optionsSchema: et.kpi,
    defaults: tt.kpi,
    wells: yf,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: gf
  },
  table: {
    family: "table",
    label: "Table",
    icon: wc,
    order: nt("table"),
    component: of,
    optionsSchema: et.table,
    defaults: tt.table,
    wells: bf,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: wt
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: bc,
    order: nt("heatmap"),
    component: jd,
    optionsSchema: et.heatmap,
    defaults: tt.heatmap,
    wells: pf,
    zones: { left: ["value", "hy"], bottom: ["hx"] },
    // Roles live in the generic mapping envelope: category = x, pivot = y, value = measure.
    supportsMapping: !0,
    // No cartesian display envelope: both axes are band (category) axes and color is the
    // value — orientation/stacking/axis-scale options don't apply, so the editor shows no
    // axis chrome for the heatmap (coherent with pie/scatter).
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    // single measure — nothing to keep consistent
    measureOnly: !1,
    hasLegend: !1,
    // the color ramp IS the value encoding; no series legend
    hasCustomizeOptions: !1,
    // nothing to customize — the grid decides its own labels
    supportsComparePrevious: !1,
    requiresMeasure: !0,
    sidebarWidthClass: wt
  }
}, Cf = Ze.bar, Sf = Ze.line, kf = Ze.area, Rf = Ze.pie, Nf = Ze.scatter, _f = Ze.heatmap, xf = Ze.kpi, Mf = Ze.table, ei = [
  Cf,
  Sf,
  kf,
  Rf,
  Nf,
  _f,
  xf,
  Mf
], Ff = v.any();
function ti(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e) n.set(a.family, a);
  for (const a of t ?? []) n.set(a.family, a);
  Object.freeze(n);
  const r = [...n.values()].sort(
    (a, s) => a.order - s.order || a.family.localeCompare(s.family)
  ), o = r.map((a) => a.family), i = {
    get: (a) => n.get(a),
    require: (a) => {
      const s = n.get(a);
      if (!s)
        throw new Error(
          `Unknown chart family "${a}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`
        );
      return s;
    },
    list: () => r,
    families: () => o,
    defaults: (a) => {
      var s;
      return ((s = n.get(a)) == null ? void 0 : s.defaults) ?? Cd;
    },
    optionsSchema: (a) => {
      var s;
      return ((s = n.get(a)) == null ? void 0 : s.optionsSchema) ?? Ff;
    },
    resolveOptions: (a) => Sd(a, i.defaults(a.family))
  };
  return i;
}
const cr = ti(ei);
function Af(e, t = cr) {
  return t.resolveOptions(e);
}
const Ki = {
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
  bubbleAreaRange: [40, 400]
};
function Os(e) {
  return e ? { ...Ki, ...e } : Ki;
}
function ni(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function $f(e) {
  const t = Math.floor(e ?? Pn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Of(e, t) {
  const n = new Array(e.length);
  for (let r = 0; r < e.length; r++) {
    const o = Math.max(0, r - t + 1);
    let i = 0, a = 0;
    for (let s = o; s <= r; s++) {
      const c = e[s];
      c == null || !Number.isFinite(c) || (i += c, a += 1);
    }
    n[r] = a === 0 ? null : i / a;
  }
  return n;
}
function Pf(e) {
  const t = new Array(e.length);
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (o == null || !Number.isFinite(o)) {
      t[r] = null;
      continue;
    }
    n += o, t[r] = n;
  }
  return t;
}
function If(e, t) {
  const n = new Array(t).fill(0);
  for (let r = 0; r < t; r++) {
    let o = 0;
    for (const i of e) {
      const a = i.data[r];
      a == null || !Number.isFinite(a) || (o += a);
    }
    n[r] = o;
  }
  return e.map((r) => {
    const o = new Array(t);
    for (let i = 0; i < t; i++) {
      const a = r.data[i], s = n[i];
      if (a == null || !Number.isFinite(a)) {
        o[i] = null;
        continue;
      }
      o[i] = !Number.isFinite(s) || s === 0 ? null : a / s;
    }
    return o;
  });
}
function Tf(e) {
  const { unit: t, quantity: n, convert: r, ...o } = e ?? {};
  return { ...o, format: { kind: "percent", decimals: 0 } };
}
function Df(e, t, n) {
  if ((t == null ? void 0 : t.kind) !== "percentOfTotal") return e;
  const r = new Intl.NumberFormat(n, { style: "percent", maximumFractionDigits: 0 });
  return {
    ...e,
    value: (o, i, a) => {
      if (o == null || o === "") return "";
      const s = typeof o == "number" ? o : Number(o);
      return Number.isFinite(s) ? r.format(s) : "";
    }
  };
}
function Ef(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = If(e.series, r);
    return {
      ...e,
      series: e.series.map((a, s) => ({
        ...a,
        data: i[s],
        meta: Tf(a.meta)
      }))
    };
  }
  const o = $f(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Of(i.data, o) : Pf(i.data)
    }))
  };
}
function Lf(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Sw = Object.fromEntries(
  Object.entries(Ze).map(([e, t]) => [e, t.component])
);
function Ps({
  data: e,
  options: t,
  config: n,
  format: r,
  state: o,
  components: i,
  editing: a,
  updateFamilyOptions: s,
  registry: c = cr,
  theme: u
}) {
  const d = ie(() => Af(t, c), [t, c]), m = ie(() => Os(u), [u]), g = c.get(d.family), f = (g == null ? void 0 : g.queryless) ?? !1, p = ni(g) ? d.transform : void 0, h = ie(() => Ef(e, p), [e, p]);
  if (!f && (o != null && o.loading))
    return /* @__PURE__ */ l(Xu, { className: "cv-chart-skeleton" });
  if (!f && (o != null && o.error))
    return /* @__PURE__ */ b(rr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Oo, {}),
      /* @__PURE__ */ l(or, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(ir, { children: o.error.message })
    ] });
  if (!f && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const y = n && Object.keys(n).length > 0 ? n : Lf(h), C = Df(
    r ?? Vo(e.raw.annotation, d, Lo),
    p
  ), S = (i == null ? void 0 : i[d.family]) ?? c.require(d.family).component;
  return /* @__PURE__ */ l(
    S,
    {
      data: h,
      options: d,
      config: y,
      format: C,
      theme: m,
      state: o,
      editing: a,
      updateFamilyOptions: s
    }
  );
}
const ur = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Ir = 8;
function Yi(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Is(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ur, r = (t == null ? void 0 : t.byKey) ?? {}, o = (u, d) => r[u] ?? d, i = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = o(u.key, u.colorToken);
    d && i.add(d);
  }
  let a = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[a++ % n.length];
      if (!i.has(d))
        return i.add(d), d;
    }
    return n[a++ % n.length];
  };
  return e.map((u) => o(u.key, u.colorToken) ?? s());
}
function Qi(e, t) {
  const n = Is(e, t);
  return e.forEach((r, o) => {
    r.colorToken = n[o];
  }), e;
}
function Vf(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function $n(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Vf(e[n]);
  return t;
}
function zf(e) {
  return {
    measures: $n(e.measures ?? {}),
    dimensions: $n(e.dimensions ?? {}),
    segments: $n(e.segments ?? {}),
    timeDimensions: $n(e.timeDimensions ?? {})
  };
}
function Lt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function dr(e, t, n) {
  const r = e == null ? void 0 : e.meta, o = {};
  (r == null ? void 0 : r.unit) !== void 0 && (o.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (o.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (o.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && o.unit === void 0 && (o.unit = "%");
  let a = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!a || a.kind === void 0 || a.kind === "auto") && (a = { ...a, kind: "currency" }), a && (o.format = a), t != null && t.stackId && (o.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (o.dots = t.dots), o;
}
function Hf(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Gf(e, t) {
  var r, o;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [i, a] of Object.entries(e.measures)) {
    const s = (r = a.meta) == null ? void 0 : r.unit;
    if (!s || ((o = a.meta) == null ? void 0 : o.convert) === !1) continue;
    const c = t.conversions[s];
    c && (n.set(i, { to: c.toImperial, unit: c.imperialUnit }), e.measures[i] = { ...a, meta: { ...a.meta, unit: c.imperialUnit } });
  }
  return n;
}
function jf(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [o, i] of t) {
      const a = mr(r[o]);
      a !== null && (r[o] = i.to(a));
    }
    return r;
  });
}
function Bf(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const o = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      o && (r.data = r.data.map((i) => i === null ? null : o.to(i)));
    }
}
function Ts(e, t, n, r, o = cr) {
  const i = zf(e.annotation()), a = Gf(i, r), s = jf(e.tablePivot(), a), c = t.mapping;
  if (!c) {
    const m = n.measures ?? [];
    if (o.require(t.family).measureOnly && m.length > 0) {
      const g = s[0] ?? {}, f = [
        {
          key: "value",
          label: "Value",
          data: m.map((h) => mr(g[h])),
          meta: { ...dr(Lt(i, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return Qi(f, t.colors), {
        categories: m.map(
          (h) => {
            var y, C;
            return ((y = Lt(i, h)) == null ? void 0 : y.shortTitle) ?? ((C = Lt(i, h)) == null ? void 0 : C.title) ?? h;
          }
        ),
        series: f,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || Yi(f)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Wf(e, c.series, t, i) : Kf(e, c.category.member, c.series, t, i), d = qf(e, c);
  return Bf(u, a), Qi(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Yi(u)
  };
}
function qf(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((o) => o.x);
}
function Wf(e, t, n, r) {
  const { members: o, meta: i } = t, a = e.chartPivot();
  return o.map((s) => {
    const c = Lt(r, s), u = i == null ? void 0 : i[s], d = a.map((m) => mr(m[s]));
    return {
      key: s,
      label: Hf(c, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...dr(c, u, n.format), measure: s }
    };
  });
}
function Uf(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function Kf(e, t, n, r, o) {
  const { value: i, values: a, pivot: s } = n, c = a && a.length > 0 ? a : [i], u = new Set(c), d = c.length > 1, m = { x: [t], y: [s, "measures"] }, f = e.seriesNames(m).filter((k) => {
    const N = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return N === void 0 || u.has(N);
  }), p = e.chartPivot(m), h = Lt(o, i), y = o.dimensions[s], C = (y == null ? void 0 : y.type) === "boolean", S = (y == null ? void 0 : y.shortTitle) ?? (y == null ? void 0 : y.title) ?? s, A = f.map((k) => {
    var z, L;
    const N = (z = k.yValues) == null ? void 0 : z[0], $ = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : i, _ = Lt(o, $), D = (L = n.meta) == null ? void 0 : L[$], E = (D == null ? void 0 : D.label) ?? (_ == null ? void 0 : _.shortTitle) ?? (_ == null ? void 0 : _.title) ?? $, M = N ?? k.shortTitle ?? k.title ?? k.key, P = C ? Uf(M) : void 0, V = P ? `${S}: ${P}` : M, T = d ? `${E} · ${V}` : V, U = p.map((X) => mr(X[k.key]));
    return {
      key: k.key,
      label: T,
      data: U,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...dr(_ ?? h, D, r.format),
        measure: $
      }
    };
  });
  return Yf(A, h, r.format);
}
function Yf(e, t, n) {
  var d, m, g;
  if (e.length <= Ir) return e;
  const r = (f) => f.data.reduce((p, h) => p + (h ?? 0), 0), o = [...e].sort((f, p) => r(p) - r(f)), i = o.slice(0, Ir - 1), a = o.slice(Ir - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: s }, (f, p) => {
    let h = 0, y = !1;
    for (const C of a) {
      const S = C.data[p];
      S !== null && (h += S, y = !0);
    }
    return y ? h : null;
  }), u = {
    key: "__other",
    label: `Other (${a.length})`,
    data: c,
    meta: { ...dr(t, void 0, n), ...(g = (m = i[0]) == null ? void 0 : m.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function mr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ae = (e) => we(e, "yyyy-MM-dd");
function Qf(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ae(t), ae(t)];
  if (n === "yesterday") {
    const a = Re(t, 1);
    return [ae(a), ae(a)];
  }
  if (n === "this week") return [ae(Hn(t)), ae(Gn(t))];
  if (n === "this month") return [ae(St(t)), ae(sn(t))];
  if (n === "this quarter") return [ae(kt(t)), ae(ln(t))];
  if (n === "this year") return [ae(Rt(t)), ae(cn(t))];
  if (n === "last week") {
    const a = Wr(t, 1);
    return [ae(Hn(a)), ae(Gn(a))];
  }
  if (n === "last month") {
    const a = Nt(t, 1);
    return [ae(St(a)), ae(sn(a))];
  }
  if (n === "last quarter") {
    const a = _t(t, 1);
    return [ae(kt(a)), ae(ln(a))];
  }
  if (n === "last year") {
    const a = xt(t, 1);
    return [ae(Rt(a)), ae(cn(a))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const o = Number(r[1]);
  if (!Number.isFinite(o) || o < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ae(Re(t, o - 1)), ae(t)] : i.startsWith("week") ? [ae(Re(t, o * 7 - 1)), ae(t)] : i.startsWith("month") ? [ae(St(Nt(t, o))), ae(sn(Nt(t, 1)))] : i.startsWith("quarter") ? [ae(kt(_t(t, o))), ae(ln(_t(t, 1)))] : [ae(Rt(xt(t, o))), ae(cn(xt(t, 1)))];
}
function Ds(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function ri(e) {
  if (Array.isArray(e) && e.length === 2 && typeof e[0] == "string") {
    const t = Date.parse(e[0]), n = Date.parse(e[1]);
    if (!Number.isNaN(t) && !Number.isNaN(n)) return Math.max(1, Math.abs(n - t) / 864e5);
  }
  if (typeof e == "string") {
    const t = e.match(/(\d+)\s*(day|week|month|quarter|year)/i);
    if (t) {
      const r = { day: 1, week: 7, month: 30, quarter: 91, year: 365 };
      return Number(t[1]) * (r[t[2].toLowerCase()] ?? 1);
    }
    const n = e.toLowerCase();
    if (n.includes("today") || n.includes("yesterday")) return 1;
    if (n.includes("week")) return 7;
    if (n.includes("month")) return 30;
    if (n.includes("quarter")) return 91;
    if (n.includes("year")) return 365;
  }
}
function Es(e) {
  const t = ri(e);
  return t === void 0 ? void 0 : Ds(t);
}
function oi(e) {
  const t = ri(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Bt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Xf = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Jf(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((o) => o.name === e)) == null ? void 0 : r.default;
}
function bn(e, t, n) {
  var r;
  if (_e(e)) {
    const o = e.var;
    return Object.prototype.hasOwnProperty.call(n, o) && n[o] !== void 0 ? n[o] : (r = t.get(o)) == null ? void 0 : r.default;
  }
  return e;
}
function Zf(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const o = [];
  for (const a of e.values) {
    const s = bn(a, t, n);
    if (!Bt(s))
      if (Array.isArray(s))
        for (const c of s)
          Bt(c) || o.push(c);
      else
        o.push(s);
  }
  if (o.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && o.length === 1 && typeof o[0] == "string" ? Qf(o[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? o };
}
function eg(e, t, n) {
  if ("and" in e) {
    const r = lo(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = lo(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Zf(e, t, n);
}
function lo(e, t, n) {
  const r = [];
  for (const o of e) {
    const i = eg(o, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function tg(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const o = bn(e.dateRange, t, n);
    Bt(o) || (r.dateRange = o);
  }
  if (e.granularity !== void 0) {
    const o = bn(e.granularity, t, n);
    Bt(o) || (r.granularity = o === Ht ? oi(r.dateRange) : o);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Ls(e, t, n) {
  const r = Xf(n), o = {};
  if (e.measures !== void 0 && (o.measures = [...e.measures]), e.dimensions !== void 0 && (o.dimensions = [...e.dimensions]), e.segments !== void 0 && (o.segments = [...e.segments]), e.timeDimensions !== void 0 && (o.timeDimensions = e.timeDimensions.map((i) => tg(i, r, t))), e.filters !== void 0) {
    const i = lo(e.filters, r, t);
    i.length > 0 && (o.filters = i);
  }
  if (e.order !== void 0 && (o.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = bn(e.limit, r, t);
    Bt(i) || (o.limit = i);
  }
  if (e.offset !== void 0) {
    const i = bn(e.offset, r, t);
    Bt(i) || (o.offset = i);
  }
  return e.total !== void 0 && (o.total = e.total), e.timezone !== void 0 && (o.timezone = e.timezone), o;
}
function Vs() {
  let e, t;
  return (n, r, o) => {
    const i = Ls(n, r, o), a = JSON.stringify(i);
    return e !== void 0 && a === t ? e : (e = i, t = a, i);
  };
}
function ng(e, t) {
  let n = {};
  for (const i of e)
    i.default !== void 0 && (n[i.name] = i.default);
  if (t)
    for (const i of Object.keys(t)) {
      const a = t[i];
      a !== void 0 && (n[i] = a);
    }
  const r = /* @__PURE__ */ new Set(), o = () => {
    for (const i of r) i();
  };
  return {
    get(i) {
      return n[i];
    },
    getAll() {
      return n;
    },
    set(i, a) {
      if (a === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, i)) return;
        const s = { ...n };
        delete s[i], n = s;
      } else {
        if (n[i] === a) return;
        n = { ...n, [i]: a };
      }
      o();
    },
    subscribe(i) {
      return r.add(i), () => {
        r.delete(i);
      };
    }
  };
}
class rg extends Error {
}
const og = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new rg(`"${e}" cannot be parsed into a number`);
    return t;
  },
  add(e, t) {
    return Number(e) + Number(t);
  },
  sub(e, t) {
    return Number(e) - Number(t);
  },
  mul(e, t) {
    return Number(e) * Number(t);
  },
  div(e, t) {
    return Number(e) / Number(t);
  },
  lt(e, t) {
    return Number(e) < Number(t);
  },
  lte(e, t) {
    return Number(e) <= Number(t);
  },
  gt(e, t) {
    return Number(e) > Number(t);
  },
  gte(e, t) {
    return Number(e) >= Number(t);
  }
};
function Xi(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class ig extends Error {
}
class Ji extends Error {
}
class ag extends Error {
}
class Tr extends Error {
}
class sg extends Error {
}
class lg {
  constructor(t, n) {
    this.destination = null, this.origin = null, this.cls = t.cls, this.val = this.cls.create(n || 0), this.measureData = t.measures, this.unitCache = t.unitCache;
  }
  /**
   * Lets the converter know the source unit abbreviation
   *
   * @throws OperationOrderError, UnknownUnitError
   */
  from(t) {
    if (this.destination != null)
      throw new Ji(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Xi(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
  }
  /**
   * Converts the unit and returns the value
   *
   * @throws OperationOrderError, UnknownUnitError, IncompatibleUnitError, MeasureStructureError
   */
  to(t) {
    var n, r;
    if (this.origin == null)
      throw new Error(".to must be called after .from");
    this.destination = this.getUnit(t), this.destination == null && this.throwUnsupportedUnitError(t);
    const o = this.destination, i = this.origin;
    if (i.abbr === o.abbr)
      return this.val;
    if (o.measure != i.measure)
      throw new ag(`Cannot convert incompatible measures of ${o.measure} and ${i.measure}`);
    let a = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (a = this.cls.sub(a, this.convertFraction(i.unit.anchor_shift))), i.system != o.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Tr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${o.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Tr(`Unable to find anchor for "${i.measure}" to "${o.measure}". Please make sure it is defined.`);
      const d = (n = u[o.system]) === null || n === void 0 ? void 0 : n.transform, m = (r = u[o.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        a = d(a, this.cls);
      else if (typeof m == "number")
        a = this.cls.mul(a, m);
      else if (Xi(m))
        a = this.cls.mul(a, this.convertFraction(m));
      else
        throw new Tr("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return o.unit.anchor_shift && (a = this.cls.add(a, this.convertFraction(o.unit.anchor_shift))), this.cls.div(a, this.convertFraction(o.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, r, o;
    if (this.origin == null)
      throw new Ji(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let a = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (a = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (o = t.system) !== null && o !== void 0 ? o : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const m = this.describe(d);
      if (a.indexOf(d) === -1 && m.system === c) {
        const f = this.to(d);
        if (i ? this.cls.gt(f, s) : this.cls.lt(f, s))
          continue;
        (u === null || (i ? this.cls.lte(f, s) && this.cls.gt(f, u.val) : this.cls.gte(f, s) && this.cls.lt(f, u.val))) && (u = {
          val: f,
          unit: d,
          singular: m.singular,
          plural: m.plural
        });
      }
    }
    return u ?? {
      val: this.val,
      unit: this.origin.abbr,
      singular: this.origin.unit.name.singular,
      plural: this.origin.unit.name.plural
    };
  }
  /**
   * Finds the unit
   */
  getUnit(t) {
    var n;
    return (n = this.unitCache.get(t)) !== null && n !== void 0 ? n : null;
  }
  /**
   * Provides additional information about the unit
   *
   * @throws UnknownUnitError
   */
  describe(t) {
    const n = this.getUnit(t);
    if (n != null)
      return this.describeUnit(n);
    this.throwUnsupportedUnitError(t);
  }
  describeUnit(t) {
    return {
      abbr: t.abbr,
      measure: t.measure,
      system: t.system,
      singular: t.unit.name.singular,
      plural: t.unit.name.plural
    };
  }
  /**
   * Detailed list of all supported units
   *
   * If a measure is supplied the list will only contain
   * details about that measure. Otherwise the list will contain
   * details abaout all measures.
   *
   * However, if the measure doesn't exist, an empty array will be
   * returned
   *
   *
   */
  list(t) {
    const n = [];
    if (t == null)
      for (const [r, o] of Object.entries(this.measureData))
        for (const [i, a] of Object.entries(o.systems))
          for (const [s, c] of Object.entries(a))
            n.push(this.describeUnit({
              abbr: s,
              measure: r,
              system: i,
              unit: c
            }));
    else {
      if (!this.isMeasure(t))
        throw new sg(`Meausure "${t}" not found.`);
      const r = this.measureData[t];
      for (const [o, i] of Object.entries(r.systems))
        for (const [a, s] of Object.entries(i))
          n.push(this.describeUnit({
            abbr: a,
            measure: t,
            system: o,
            unit: s
          }));
    }
    return n;
  }
  isMeasure(t) {
    return t in this.measureData;
  }
  throwUnsupportedUnitError(t) {
    let n = [];
    for (const r of Object.values(this.measureData))
      for (const o of Object.values(r.systems))
        n = n.concat(Object.keys(o));
    throw new ig(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
  }
  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  possibilities(t) {
    let n = [], r = [];
    typeof t == "string" && this.isMeasure(t) ? r.push(t) : this.origin != null ? r.push(this.origin.measure) : r = Object.keys(this.measureData);
    for (const o of r) {
      const i = this.measureData[o].systems;
      for (const a of Object.values(i))
        n = [
          ...n,
          ...Object.keys(a)
        ];
    }
    return n;
  }
  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  measures() {
    return Object.keys(this.measureData);
  }
}
function cg(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e))
    for (const [o, i] of Object.entries(r.systems))
      for (const [a, s] of Object.entries(i))
        t.set(a, {
          measure: n,
          system: o,
          abbr: a,
          unit: s
        });
  return t;
}
function ug(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = cg(e);
  return (r) => new lg({
    measures: e,
    unitCache: n,
    cls: og
  }, r);
}
const dg = {
  "g-force": {
    name: {
      singular: "g-force",
      plural: "g-forces"
    },
    to_anchor: 9.80665
  },
  "m/s2": {
    name: {
      singular: "Metre per second squared",
      plural: "Metres per second squared"
    },
    to_anchor: 1
  },
  g0: {
    name: {
      singular: "Standard Gravity",
      plural: "Standard Gravities"
    },
    to_anchor: 9.80665
  }
}, mg = {
  systems: {
    metric: dg
  }
}, fg = {
  rad: {
    name: {
      singular: "radian",
      plural: "radians"
    },
    to_anchor: {
      numerator: 180,
      denominator: Math.PI
    }
  },
  deg: {
    name: {
      singular: "degree",
      plural: "degrees"
    },
    to_anchor: 1
  },
  grad: {
    name: {
      singular: "gradian",
      plural: "gradians"
    },
    to_anchor: {
      numerator: 9,
      denominator: 10
    }
  },
  arcmin: {
    name: {
      singular: "arcminute",
      plural: "arcminutes"
    },
    to_anchor: {
      numerator: 1,
      denominator: 60
    }
  },
  arcsec: {
    name: {
      singular: "arcsecond",
      plural: "arcseconds"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3600
    }
  }
}, gg = {
  systems: {
    SI: fg
  }
}, pg = {
  VA: {
    name: {
      singular: "Volt-Ampere",
      plural: "Volt-Amperes"
    },
    to_anchor: 1
  },
  mVA: {
    name: {
      singular: "Millivolt-Ampere",
      plural: "Millivolt-Amperes"
    },
    to_anchor: 1e-3
  },
  kVA: {
    name: {
      singular: "Kilovolt-Ampere",
      plural: "Kilovolt-Amperes"
    },
    to_anchor: 1e3
  },
  MVA: {
    name: {
      singular: "Megavolt-Ampere",
      plural: "Megavolt-Amperes"
    },
    to_anchor: 1e6
  },
  GVA: {
    name: {
      singular: "Gigavolt-Ampere",
      plural: "Gigavolt-Amperes"
    },
    to_anchor: 1e9
  }
}, hg = {
  systems: {
    SI: pg
  }
}, vg = {
  nm2: {
    name: {
      singular: "Square Nanometer",
      plural: "Square Nanometers"
    },
    to_anchor: 1e-18
  },
  μm2: {
    name: {
      singular: "Square Micrometer",
      plural: "Square Micrometers"
    },
    to_anchor: 1e-12
  },
  mm2: {
    name: {
      singular: "Square Millimeter",
      plural: "Square Millimeters"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  cm2: {
    name: {
      singular: "Square Centimeter",
      plural: "Square Centimeters"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e4
    }
  },
  dm2: {
    name: {
      singular: "Square Decimeter",
      plural: "Square Decimeters"
    },
    to_anchor: {
      numerator: 1,
      denominator: 100
    }
  },
  m2: {
    name: {
      singular: "Square Meter",
      plural: "Square Meters"
    },
    to_anchor: 1
  },
  a: {
    name: {
      singular: "Are",
      plural: "Ares"
    },
    to_anchor: 100
  },
  ha: {
    name: {
      singular: "Hectare",
      plural: "Hectares"
    },
    to_anchor: 1e4
  },
  km2: {
    name: {
      singular: "Square Kilometer",
      plural: "Square Kilometers"
    },
    to_anchor: 1e6
  }
}, yg = {
  in2: {
    name: {
      singular: "Square Inch",
      plural: "Square Inches"
    },
    to_anchor: {
      numerator: 1,
      denominator: 144
    }
  },
  yd2: {
    name: {
      singular: "Square Yard",
      plural: "Square Yards"
    },
    to_anchor: 9
  },
  ft2: {
    name: {
      singular: "Square Foot",
      plural: "Square Feet"
    },
    to_anchor: 1
  },
  ac: {
    name: {
      singular: "Acre",
      plural: "Acres"
    },
    to_anchor: 43560
  },
  mi2: {
    name: {
      singular: "Square Mile",
      plural: "Square Miles"
    },
    to_anchor: 27878400
  }
}, bg = {
  systems: {
    metric: vg,
    imperial: yg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 10.7639
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 10.7639
        }
      }
    }
  }
}, wg = {
  c: {
    name: {
      singular: "Coulomb",
      plural: "Coulombs"
    },
    to_anchor: 1
  },
  mC: {
    name: {
      singular: "Millicoulomb",
      plural: "Millicoulombs"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  μC: {
    name: {
      singular: "Microcoulomb",
      plural: "Microcoulombs"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  nC: {
    name: {
      singular: "Nanocoulomb",
      plural: "Nanocoulombs"
    },
    to_anchor: 1e-9
  },
  pC: {
    name: {
      singular: "Picocoulomb",
      plural: "Picocoulombs"
    },
    to_anchor: 1e-12
  }
}, Cg = {
  systems: {
    SI: wg
  }
}, Sg = {
  A: {
    name: {
      singular: "Ampere",
      plural: "Amperes"
    },
    to_anchor: 1
  },
  μA: {
    name: {
      singular: "Microampere",
      plural: "Microamperes"
    },
    to_anchor: 1e-6
  },
  mA: {
    name: {
      singular: "Milliampere",
      plural: "Milliamperes"
    },
    to_anchor: 1e-3
  },
  kA: {
    name: {
      singular: "Kiloampere",
      plural: "Kiloamperes"
    },
    to_anchor: 1e3
  },
  MA: {
    name: {
      singular: "Megaampere",
      plural: "Megaamperes"
    },
    to_anchor: 1e6
  }
}, kg = {
  systems: {
    SI: Sg
  }
}, Rg = {
  bit: {
    name: {
      singular: "Bit",
      plural: "Bits"
    },
    to_anchor: 1
  },
  kb: {
    name: {
      singular: "Kilobit",
      plural: "Kilobits"
    },
    to_anchor: 1e3
  },
  Mb: {
    name: {
      singular: "Megabit",
      plural: "Megabits"
    },
    to_anchor: 1e6
  },
  Gb: {
    name: {
      singular: "Gigabit",
      plural: "Gigabits"
    },
    to_anchor: 1e9
  },
  Tb: {
    name: {
      singular: "Terabit",
      plural: "Terabits"
    },
    to_anchor: 1e12
  }
}, Ng = {
  byte: {
    name: {
      singular: "Byte",
      plural: "Bytes"
    },
    to_anchor: 1
  },
  kB: {
    name: {
      singular: "Kilobyte",
      plural: "Kilobytes"
    },
    to_anchor: 1e3
  },
  MB: {
    name: {
      singular: "Megabyte",
      plural: "Megabytes"
    },
    to_anchor: 1e6
  },
  GB: {
    name: {
      singular: "Gigabyte",
      plural: "Gigabytes"
    },
    to_anchor: 1e9
  },
  TB: {
    name: {
      singular: "Terabyte",
      plural: "Terabytes"
    },
    to_anchor: 1e12
  }
}, _g = {
  Kib: {
    name: {
      singular: "Kibibit",
      plural: "Kibibits"
    },
    to_anchor: 1
  },
  Mib: {
    name: {
      singular: "Mebibit",
      plural: "Mebibits"
    },
    to_anchor: 1024
  },
  Gib: {
    name: {
      singular: "Gibibit",
      plural: "Gibibits"
    },
    to_anchor: 1048576
  },
  Tib: {
    name: {
      singular: "Tebibit",
      plural: "Tebibits"
    },
    to_anchor: 1073741824
  }
}, xg = {
  KiB: {
    name: {
      singular: "Kibibyte",
      plural: "Kibibytes"
    },
    to_anchor: 1
  },
  MiB: {
    name: {
      singular: "Mebibyte",
      plural: "Mebibytes"
    },
    to_anchor: 1024
  },
  GiB: {
    name: {
      singular: "Gibibyte",
      plural: "Gibibytes"
    },
    to_anchor: 1048576
  },
  TiB: {
    name: {
      singular: "Tebibyte",
      plural: "Tebibytes"
    },
    to_anchor: 1073741824
  }
}, Mg = {
  systems: {
    bit: Rg,
    byte: Ng,
    IECBit: _g,
    IECByte: xg
  },
  anchors: {
    bit: {
      byte: {
        ratio: 0.125
      },
      IECBit: {
        ratio: 9765625e-10
      },
      IECByte: {
        ratio: 1220703125e-13
      }
    },
    byte: {
      bit: {
        ratio: 8
      },
      IECBit: {
        ratio: 78125e-7
      },
      IECByte: {
        ratio: 9765625e-10
      }
    },
    IECBit: {
      bit: {
        ratio: 1024
      },
      byte: {
        ratio: 128
      },
      IECByte: {
        ratio: 0.125
      }
    },
    IECByte: {
      bit: {
        ratio: 8192
      },
      byte: {
        ratio: 1024
      },
      IECBit: {
        ratio: 8
      }
    }
  }
}, Fg = {
  ea: {
    name: {
      singular: "Each",
      plural: "Each"
    },
    to_anchor: 1
  },
  dz: {
    name: {
      singular: "Dozen",
      plural: "Dozens"
    },
    to_anchor: 12
  }
}, Ag = {
  systems: {
    metric: Fg
  }
}, $g = {
  Ws: {
    name: {
      singular: "Watt-second",
      plural: "Watt-seconds"
    },
    to_anchor: 1
  },
  Wm: {
    name: {
      singular: "Watt-minute",
      plural: "Watt-minutes"
    },
    to_anchor: 60
  },
  Wh: {
    name: {
      singular: "Watt-hour",
      plural: "Watt-hours"
    },
    to_anchor: 3600
  },
  mWh: {
    name: {
      singular: "Milliwatt-hour",
      plural: "Milliwatt-hours"
    },
    to_anchor: 3.6
  },
  kWh: {
    name: {
      singular: "Kilowatt-hour",
      plural: "Kilowatt-hours"
    },
    to_anchor: 36e5
  },
  MWh: {
    name: {
      singular: "Megawatt-hour",
      plural: "Megawatt-hours"
    },
    to_anchor: 36e8
  },
  GWh: {
    name: {
      singular: "Gigawatt-hour",
      plural: "Gigawatt-hours"
    },
    to_anchor: 36e11
  },
  J: {
    name: {
      singular: "Joule",
      plural: "Joules"
    },
    to_anchor: 1
  },
  kJ: {
    name: {
      singular: "Kilojoule",
      plural: "Kilojoules"
    },
    to_anchor: 1e3
  },
  MJ: {
    name: {
      singular: "Megajoule",
      plural: "Megajoules"
    },
    to_anchor: 1e6
  },
  GJ: {
    name: {
      singular: "Gigajoule",
      plural: "Gigajoules"
    },
    to_anchor: 1e9
  }
}, Og = {
  cal: {
    name: {
      singular: "calorie",
      plural: "calories"
    },
    to_anchor: 1
  },
  kcal: {
    name: {
      singular: "Kilocalorie",
      plural: "Kilocalories"
    },
    to_anchor: 1e3
  }
}, Pg = {
  systems: {
    SI: $g,
    nutrition: Og
  },
  anchors: {
    SI: {
      nutrition: {
        ratio: {
          numerator: 1,
          denominator: 4.184
        }
      }
    },
    nutrition: {
      SI: {
        ratio: 4.184
      }
    }
  }
}, Ig = {
  N: {
    name: {
      singular: "Newton",
      plural: "Newtons"
    },
    to_anchor: 1
  },
  kN: {
    name: {
      singular: "Kilonewton",
      plural: "Kilonewtons"
    },
    to_anchor: 1e3
  },
  lbf: {
    name: {
      singular: "Pound-force",
      plural: "Pound-forces"
    },
    to_anchor: 4.44822
  },
  kgf: {
    name: {
      singular: "Kilogram-force",
      plural: "Kilogram-forces"
    },
    to_anchor: 9.807
  }
}, Tg = {
  systems: {
    SI: Ig
  }
}, Dg = {
  mHz: {
    name: {
      singular: "millihertz",
      plural: "millihertz"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  Hz: {
    name: {
      singular: "hertz",
      plural: "hertz"
    },
    to_anchor: 1
  },
  kHz: {
    name: {
      singular: "kilohertz",
      plural: "kilohertz"
    },
    to_anchor: 1e3
  },
  MHz: {
    name: {
      singular: "megahertz",
      plural: "megahertz"
    },
    to_anchor: 1e6
  },
  GHz: {
    name: {
      singular: "gigahertz",
      plural: "gigahertz"
    },
    to_anchor: 1e9
  },
  THz: {
    name: {
      singular: "terahertz",
      plural: "terahertz"
    },
    to_anchor: 1e12
  },
  rpm: {
    name: {
      singular: "rotation per minute",
      plural: "rotations per minute"
    },
    to_anchor: {
      numerator: 1,
      denominator: 60
    }
  },
  "deg/s": {
    name: {
      singular: "degree per second",
      plural: "degrees per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 360
    }
  },
  "rad/s": {
    name: {
      singular: "radian per second",
      plural: "radians per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 6.283185307179586
      // Math.PI * 2
    }
  }
}, Eg = {
  systems: {
    SI: Dg
  }
}, Lg = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Vg = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, zg = {
  systems: {
    metric: Lg,
    imperial: Vg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: {
          numerator: 1,
          denominator: 10.76391
        }
      }
    },
    imperial: {
      metric: {
        ratio: 10.76391
      }
    }
  }
}, Hg = {
  nm: {
    name: {
      singular: "Nanometer",
      plural: "Nanometers"
    },
    to_anchor: 1e-9
  },
  μm: {
    name: {
      singular: "Micrometer",
      plural: "Micrometers"
    },
    to_anchor: 1e-6
  },
  mm: {
    name: {
      singular: "Millimeter",
      plural: "Millimeters"
    },
    to_anchor: 1e-3
  },
  cm: {
    name: {
      singular: "Centimeter",
      plural: "Centimeters"
    },
    to_anchor: 0.01
  },
  dm: {
    name: {
      singular: "Decimeter",
      plural: "Decimeters"
    },
    to_anchor: 0.1
  },
  m: {
    name: {
      singular: "Meter",
      plural: "Meters"
    },
    to_anchor: 1
  },
  km: {
    name: {
      singular: "Kilometer",
      plural: "Kilometers"
    },
    to_anchor: 1e3
  }
}, Gg = {
  mil: {
    name: {
      singular: "Mil",
      plural: "Mils"
    },
    to_anchor: {
      numerator: 1,
      denominator: 12e3
    }
  },
  in: {
    name: {
      singular: "Inch",
      plural: "Inches"
    },
    to_anchor: {
      numerator: 1,
      denominator: 12
    }
  },
  yd: {
    name: {
      singular: "Yard",
      plural: "Yards"
    },
    to_anchor: 3
  },
  "ft-us": {
    name: {
      singular: "US Survey Foot",
      plural: "US Survey Feet"
    },
    to_anchor: 1.000002
  },
  ft: {
    name: {
      singular: "Foot",
      plural: "Feet"
    },
    to_anchor: 1
  },
  fathom: {
    name: {
      singular: "Fathom",
      plural: "Fathoms"
    },
    to_anchor: 6
  },
  mi: {
    name: {
      singular: "Mile",
      plural: "Miles"
    },
    to_anchor: 5280
  },
  nMi: {
    name: {
      singular: "Nautical Mile",
      plural: "Nautical Miles"
    },
    to_anchor: 6076.12
  }
}, jg = {
  systems: {
    metric: Hg,
    imperial: Gg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 3.28084
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 3.28084
        }
      }
    }
  }
}, Bg = {
  mcg: {
    name: {
      singular: "Microgram",
      plural: "Micrograms"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  mg: {
    name: {
      singular: "Milligram",
      plural: "Milligrams"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  g: {
    name: {
      singular: "Gram",
      plural: "Grams"
    },
    to_anchor: 1
  },
  kg: {
    name: {
      singular: "Kilogram",
      plural: "Kilograms"
    },
    to_anchor: 1e3
  },
  mt: {
    name: {
      singular: "Metric Tonne",
      plural: "Metric Tonnes"
    },
    to_anchor: 1e6
  }
}, qg = {
  oz: {
    name: {
      singular: "Ounce",
      plural: "Ounces"
    },
    to_anchor: {
      numerator: 1,
      denominator: 16
    }
  },
  lb: {
    name: {
      singular: "Pound",
      plural: "Pounds"
    },
    to_anchor: 1
  },
  st: {
    name: {
      singular: "Stone",
      plural: "Stones"
    },
    to_anchor: 14
  },
  t: {
    name: {
      singular: "Ton",
      plural: "Tons"
    },
    to_anchor: 2e3
  }
}, Wg = {
  systems: {
    metric: Bg,
    imperial: qg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: {
          numerator: 1,
          denominator: 453.59237
        }
      }
    },
    imperial: {
      metric: {
        ratio: 453.59237
      }
    }
  }
}, Ug = {
  "kg/s": {
    name: {
      singular: "Kilogram per second",
      plural: "Kilograms per second"
    },
    to_anchor: 1
  },
  "kg/min": {
    name: {
      singular: "Kilogram per minute",
      plural: "Kilograms per minute"
    },
    to_anchor: 1 / 60
  },
  "kg/h": {
    name: {
      singular: "Kilogram per hour",
      plural: "Kilograms per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3600
    }
  },
  "mt/h": {
    name: {
      singular: "Ton per hour",
      plural: "Tons per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3.6
    }
  }
}, Kg = {
  "lb/s": {
    name: {
      singular: "Pound per second",
      plural: "Pounds per second"
    },
    to_anchor: 1
  },
  "lb/h": {
    name: {
      singular: "Pound per hour",
      plural: "Pounds per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3600
    }
  }
}, Yg = {
  systems: {
    metric: Ug,
    imperial: Kg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: {
          numerator: 1,
          denominator: 0.453592
        }
      }
    },
    imperial: {
      metric: {
        ratio: 0.453592
      }
    }
  }
}, Qg = {
  "min/km": {
    name: {
      singular: "Minute per kilometre",
      plural: "Minutes per kilometre"
    },
    to_anchor: 0.06
  },
  "s/m": {
    name: {
      singular: "Second per metre",
      plural: "Seconds per metre"
    },
    to_anchor: 1
  }
}, Xg = {
  "min/mi": {
    name: {
      singular: "Minute per mile",
      plural: "Minutes per mile"
    },
    to_anchor: 0.0113636
  },
  "s/ft": {
    name: {
      singular: "Second per foot",
      plural: "Seconds per foot"
    },
    to_anchor: 1
  }
}, Jg = {
  systems: {
    metric: Qg,
    imperial: Xg
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 0.3048
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 0.3048
        }
      }
    }
  }
}, Zg = {
  ppm: {
    name: {
      singular: "Part-per Million",
      plural: "Parts-per Million"
    },
    to_anchor: 1
  },
  ppb: {
    name: {
      singular: "Part-per Billion",
      plural: "Parts-per Billion"
    },
    to_anchor: 1e-3
  },
  ppt: {
    name: {
      singular: "Part-per Trillion",
      plural: "Parts-per Trillion"
    },
    to_anchor: 1e-6
  },
  ppq: {
    name: {
      singular: "Part-per Quadrillion",
      plural: "Parts-per Quadrillion"
    },
    to_anchor: 1e-9
  }
}, ep = {
  systems: {
    SI: Zg
  }
}, tp = {
  pcs: {
    name: {
      singular: "Piece",
      plural: "Pieces"
    },
    to_anchor: 1
  },
  "bk-doz": {
    name: {
      singular: "Bakers Dozen",
      plural: "Bakers Dozen"
    },
    to_anchor: 13
  },
  cp: {
    name: {
      singular: "Couple",
      plural: "Couples"
    },
    to_anchor: 2
  },
  "doz-doz": {
    name: {
      singular: "Dozen Dozen",
      plural: "Dozen Dozen"
    },
    to_anchor: 144
  },
  doz: {
    name: {
      singular: "Dozen",
      plural: "Dozens"
    },
    to_anchor: 12
  },
  "gr-gr": {
    name: {
      singular: "Great Gross",
      plural: "Great Gross"
    },
    to_anchor: 1728
  },
  gros: {
    name: {
      singular: "Gross",
      plural: "Gross"
    },
    to_anchor: 144
  },
  "half-dozen": {
    name: {
      singular: "Half Dozen",
      plural: "Half Dozen"
    },
    to_anchor: 6
  },
  "long-hundred": {
    name: {
      singular: "Long Hundred",
      plural: "Long Hundred"
    },
    to_anchor: 120
  },
  ream: {
    name: {
      singular: "Reams",
      plural: "Reams"
    },
    to_anchor: 500
  },
  scores: {
    name: {
      singular: "Scores",
      plural: "Scores"
    },
    to_anchor: 20
  },
  "sm-gr": {
    name: {
      singular: "Small Gross",
      plural: "Small Gross"
    },
    to_anchor: 120
  },
  trio: {
    name: {
      singular: "Trio",
      plural: "Trio"
    },
    to_anchor: 3
  }
}, np = {
  systems: {
    unit: tp
  }
}, rp = {
  W: {
    name: {
      singular: "Watt",
      plural: "Watts"
    },
    to_anchor: 1
  },
  mW: {
    name: {
      singular: "Milliwatt",
      plural: "Milliwatts"
    },
    to_anchor: 1e-3
  },
  kW: {
    name: {
      singular: "Kilowatt",
      plural: "Kilowatts"
    },
    to_anchor: 1e3
  },
  MW: {
    name: {
      singular: "Megawatt",
      plural: "Megawatts"
    },
    to_anchor: 1e6
  },
  GW: {
    name: {
      singular: "Gigawatt",
      plural: "Gigawatts"
    },
    to_anchor: 1e9
  },
  PS: {
    name: {
      singular: "Horsepower (metric)",
      plural: "Horsepower (metric)"
    },
    to_anchor: 735.49875
  }
}, op = {
  "Btu/s": {
    name: {
      singular: "British thermal unit per second",
      plural: "British thermal units per second"
    },
    to_anchor: 778.16937
  },
  "ft-lb/s": {
    name: {
      singular: "Foot-pound per second",
      plural: "Foot-pounds per second"
    },
    to_anchor: 1
  },
  hp: {
    name: {
      singular: "Horsepower (British)",
      plural: "Horsepower (British)"
    },
    to_anchor: 550
  }
}, ip = {
  systems: {
    metric: rp,
    imperial: op
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 0.737562149
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 0.737562149
        }
      }
    }
  }
}, ap = {
  Pa: {
    name: {
      singular: "pascal",
      plural: "pascals"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  kPa: {
    name: {
      singular: "kilopascal",
      plural: "kilopascals"
    },
    to_anchor: 1
  },
  MPa: {
    name: {
      singular: "megapascal",
      plural: "megapascals"
    },
    to_anchor: 1e3
  },
  hPa: {
    name: {
      singular: "hectopascal",
      plural: "hectopascals"
    },
    to_anchor: {
      numerator: 1,
      denominator: 10
    }
  },
  mbar: {
    name: {
      singular: "millibar",
      plural: "millibar"
    },
    to_anchor: 0.1
  },
  bar: {
    name: {
      singular: "bar",
      plural: "bar"
    },
    to_anchor: 100
  },
  torr: {
    name: {
      singular: "torr",
      plural: "torr"
    },
    to_anchor: {
      numerator: 101325,
      denominator: 76e4
    }
  },
  mH2O: {
    name: {
      singular: "meter of water @ 4°C",
      plural: "meters of water @ 4°C"
    },
    to_anchor: 9.80665
  },
  mmHg: {
    name: {
      singular: "millimeter of mercury",
      plural: "millimeters of mercury"
    },
    to_anchor: 0.133322
  }
}, sp = {
  psi: {
    name: {
      singular: "pound per square inch",
      plural: "pounds per square inch"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  ksi: {
    name: {
      singular: "kilopound per square inch",
      plural: "kilopound per square inch"
    },
    to_anchor: 1
  },
  inHg: {
    name: {
      singular: "Inch of mercury",
      plural: "Inches of mercury"
    },
    to_anchor: 491154e-9
  }
}, lp = {
  systems: {
    metric: ap,
    imperial: sp
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 14503768078e-14
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 14503768078e-14
        }
      }
    }
  }
}, cp = {
  VARh: {
    name: {
      singular: "Volt-Ampere Reactive Hour",
      plural: "Volt-Amperes Reactive Hour"
    },
    to_anchor: 1
  },
  mVARh: {
    name: {
      singular: "Millivolt-Ampere Reactive Hour",
      plural: "Millivolt-Amperes Reactive Hour"
    },
    to_anchor: 1e-3
  },
  kVARh: {
    name: {
      singular: "Kilovolt-Ampere Reactive Hour",
      plural: "Kilovolt-Amperes Reactive Hour"
    },
    to_anchor: 1e3
  },
  MVARh: {
    name: {
      singular: "Megavolt-Ampere Reactive Hour",
      plural: "Megavolt-Amperes Reactive Hour"
    },
    to_anchor: 1e6
  },
  GVARh: {
    name: {
      singular: "Gigavolt-Ampere Reactive Hour",
      plural: "Gigavolt-Amperes Reactive Hour"
    },
    to_anchor: 1e9
  }
}, up = {
  systems: {
    SI: cp
  }
}, dp = {
  VAR: {
    name: {
      singular: "Volt-Ampere Reactive",
      plural: "Volt-Amperes Reactive"
    },
    to_anchor: 1
  },
  mVAR: {
    name: {
      singular: "Millivolt-Ampere Reactive",
      plural: "Millivolt-Amperes Reactive"
    },
    to_anchor: 1e-3
  },
  kVAR: {
    name: {
      singular: "Kilovolt-Ampere Reactive",
      plural: "Kilovolt-Amperes Reactive"
    },
    to_anchor: 1e3
  },
  MVAR: {
    name: {
      singular: "Megavolt-Ampere Reactive",
      plural: "Megavolt-Amperes Reactive"
    },
    to_anchor: 1e6
  },
  GVAR: {
    name: {
      singular: "Gigavolt-Ampere Reactive",
      plural: "Gigavolt-Amperes Reactive"
    },
    to_anchor: 1e9
  }
}, mp = {
  systems: {
    SI: dp
  }
}, fp = {
  "m/s": {
    name: {
      singular: "Metre per second",
      plural: "Metres per second"
    },
    to_anchor: 3.6
  },
  "km/h": {
    name: {
      singular: "Kilometre per hour",
      plural: "Kilometres per hour"
    },
    to_anchor: 1
  },
  "mm/h": {
    name: {
      singular: "Millimeter per hour",
      plural: "Millimeters per hour"
    },
    to_anchor: 1e-6
  }
}, gp = {
  mph: {
    name: {
      singular: "Mile per hour",
      plural: "Miles per hour"
    },
    to_anchor: 1
  },
  knot: {
    name: {
      singular: "Knot",
      plural: "Knots"
    },
    to_anchor: 1.150779
  },
  "ft/s": {
    name: {
      singular: "Foot per second",
      plural: "Feet per second"
    },
    to_anchor: 0.681818
  },
  "ft/min": {
    name: {
      singular: "Foot per minute",
      plural: "Feet per minute"
    },
    to_anchor: 0.0113636
  },
  "in/h": {
    name: {
      singular: "Inch per hour",
      plural: "Inches per hour"
    },
    to_anchor: 1578e-8
  }
}, pp = {
  systems: {
    metric: fp,
    imperial: gp
  },
  anchors: {
    metric: {
      imperial: {
        ratio: {
          numerator: 1,
          denominator: 1.609344
        }
      }
    },
    imperial: {
      metric: {
        ratio: 1.609344
      }
    }
  }
}, hp = {
  C: {
    name: {
      singular: "degree Celsius",
      plural: "degrees Celsius"
    },
    to_anchor: 1,
    anchor_shift: 0
  },
  K: {
    name: {
      singular: "Kelvin",
      plural: "Kelvins"
    },
    to_anchor: 1,
    anchor_shift: 273.15
  }
}, vp = {
  F: {
    name: {
      singular: "degree Fahrenheit",
      plural: "degrees Fahrenheit"
    },
    to_anchor: 1
  },
  R: {
    name: {
      singular: "degree Rankine",
      plural: "degrees Rankine"
    },
    to_anchor: 1,
    anchor_shift: 459.67
  }
}, yp = {
  systems: {
    metric: hp,
    imperial: vp
  },
  anchors: {
    metric: {
      imperial: {
        transform: function(e, t) {
          return t.add(t.div(e, t.div(5, 9)), 32);
        }
      }
    },
    imperial: {
      metric: {
        transform: function(e, t) {
          return t.mul(t.sub(e, 32), t.div(5, 9));
        }
      }
    }
  }
}, bp = {
  ns: {
    name: {
      singular: "Nanosecond",
      plural: "Nanoseconds"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e9
    }
  },
  mu: {
    name: {
      singular: "Microsecond",
      plural: "Microseconds"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  ms: {
    name: {
      singular: "Millisecond",
      plural: "Milliseconds"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  s: {
    name: {
      singular: "Second",
      plural: "Seconds"
    },
    to_anchor: 1
  },
  min: {
    name: {
      singular: "Minute",
      plural: "Minutes"
    },
    to_anchor: 60
  },
  h: {
    name: {
      singular: "Hour",
      plural: "Hours"
    },
    to_anchor: 3600
    // 60 * 60
  },
  d: {
    name: {
      singular: "Day",
      plural: "Days"
    },
    to_anchor: 86400
    // 60 * 60 * 24
  },
  week: {
    name: {
      singular: "Week",
      plural: "Weeks"
    },
    to_anchor: 604800
    // 60 * 60 * 24 * 7
  },
  month: {
    name: {
      singular: "Month",
      plural: "Months"
    },
    to_anchor: {
      numerator: 31557600,
      // 60 * 60 * 24 * 365.25
      denominator: 12
    }
  },
  year: {
    name: {
      singular: "Year",
      plural: "Years"
    },
    to_anchor: 31557600
    // 60 * 60 * 24 * 365.25,
  }
}, wp = {
  systems: {
    SI: bp
  }
}, Cp = {
  Nm: {
    name: {
      singular: "Newton-meter",
      plural: "Newton-meters"
    },
    to_anchor: 1
  },
  cNm: {
    name: {
      singular: "Centinewton-meter",
      plural: "Centinewton-meters"
    },
    to_anchor: 0.01
  },
  dNm: {
    name: {
      singular: "Decinewton-meter",
      plural: "Decinewton-meters"
    },
    to_anchor: 0.1
  },
  kgm: {
    name: {
      singular: "Kilogram-meter",
      plural: "Kilogram-meters"
    },
    to_anchor: 9.806649999787735
    // 1 / 0.1019716213,
  },
  "kg-cm": {
    name: {
      singular: "Kilogram-centimeter",
      plural: "Kilogram-centimeters"
    },
    to_anchor: 0.09806649999787735
    // 1 / 10.19716213,
  }
}, Sp = {
  "lbf-ft": {
    name: {
      singular: "Pound-foot",
      plural: "Pound-feet"
    },
    to_anchor: 1
  },
  "lbf-in": {
    name: {
      singular: "Pound-inch",
      plural: "Pound-inches"
    },
    to_anchor: 0.08333333333333333
    // 1 / 12,
  },
  "ozf-in": {
    name: {
      singular: "Ounce-inch",
      plural: "Ounce-inches"
    },
    to_anchor: 0.005208333271755643
    // 1 / 192.00000227,
  }
}, kp = {
  systems: {
    metric: Cp,
    imperial: Sp
  },
  anchors: {
    metric: {
      imperial: {
        ratio: {
          numerator: 1,
          denominator: 1.355818
        }
      }
    },
    imperial: {
      metric: {
        ratio: 1.355818
      }
    }
  }
}, Rp = {
  V: {
    name: {
      singular: "Volt",
      plural: "Volts"
    },
    to_anchor: 1
  },
  μV: {
    name: {
      singular: "Microvolt",
      plural: "Microvolts"
    },
    to_anchor: 1e-6
  },
  mV: {
    name: {
      singular: "Millivolt",
      plural: "Millivolts"
    },
    to_anchor: 1e-3
  },
  kV: {
    name: {
      singular: "Kilovolt",
      plural: "Kilovolts"
    },
    to_anchor: 1e3
  },
  MV: {
    name: {
      singular: "Megavolt",
      plural: "Megavolts"
    },
    to_anchor: 1e6
  }
}, Np = {
  systems: {
    SI: Rp
  }
}, _p = {
  mm3: {
    name: {
      singular: "Cubic Millimeter",
      plural: "Cubic Millimeters"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  cm3: {
    name: {
      singular: "Cubic Centimeter",
      plural: "Cubic Centimeters"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  dm3: {
    name: {
      singular: "Cubic Decimeter",
      plural: "Cubic Decimeters"
    },
    to_anchor: 1
  },
  ml: {
    name: {
      singular: "Millilitre",
      plural: "Millilitres"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  cl: {
    name: {
      singular: "Centilitre",
      plural: "Centilitres"
    },
    to_anchor: {
      numerator: 1,
      denominator: 100
    }
  },
  dl: {
    name: {
      singular: "Decilitre",
      plural: "Decilitres"
    },
    to_anchor: {
      numerator: 1,
      denominator: 10
    }
  },
  l: {
    name: {
      singular: "Litre",
      plural: "Litres"
    },
    to_anchor: 1
  },
  kl: {
    name: {
      singular: "Kilolitre",
      plural: "Kilolitres"
    },
    to_anchor: 1e3
  },
  Ml: {
    name: {
      singular: "Megalitre",
      plural: "Megalitres"
    },
    to_anchor: 1e6
  },
  Gl: {
    name: {
      singular: "Gigalitre",
      plural: "Gigalitres"
    },
    to_anchor: 1e9
  },
  m3: {
    name: {
      singular: "Cubic meter",
      plural: "Cubic meters"
    },
    to_anchor: 1e3
  },
  km3: {
    name: {
      singular: "Cubic kilometer",
      plural: "Cubic kilometers"
    },
    to_anchor: 1e12
  },
  // Swedish units
  krm: {
    name: {
      singular: "Kryddmått",
      plural: "Kryddmått"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  tsk: {
    name: {
      singular: "Tesked",
      plural: "Teskedar"
    },
    to_anchor: {
      numerator: 5,
      denominator: 1e3
    }
  },
  msk: {
    name: {
      singular: "Matsked",
      plural: "Matskedar"
    },
    to_anchor: {
      numerator: 15,
      denominator: 1e3
    }
  },
  kkp: {
    name: {
      singular: "Kaffekopp",
      plural: "Kaffekoppar"
    },
    to_anchor: {
      numerator: 150,
      denominator: 1e3
    }
  },
  glas: {
    name: {
      singular: "Glas",
      plural: "Glas"
    },
    to_anchor: {
      numerator: 200,
      denominator: 1e3
    }
  },
  kanna: {
    name: {
      singular: "Kanna",
      plural: "Kannor"
    },
    to_anchor: 2.617
  }
}, xp = {
  tsp: {
    name: {
      singular: "Teaspoon",
      plural: "Teaspoons"
    },
    to_anchor: {
      numerator: 1,
      denominator: 6
    }
  },
  Tbs: {
    name: {
      singular: "Tablespoon",
      plural: "Tablespoons"
    },
    to_anchor: {
      numerator: 1,
      denominator: 2
    }
  },
  in3: {
    name: {
      singular: "Cubic inch",
      plural: "Cubic inches"
    },
    to_anchor: 0.55411
  },
  "fl-oz": {
    name: {
      singular: "Fluid Ounce",
      plural: "Fluid Ounces"
    },
    to_anchor: 1
  },
  cup: {
    name: {
      singular: "Cup",
      plural: "Cups"
    },
    to_anchor: 8
  },
  pnt: {
    name: {
      singular: "Pint",
      plural: "Pints"
    },
    to_anchor: 16
  },
  qt: {
    name: {
      singular: "Quart",
      plural: "Quarts"
    },
    to_anchor: 32
  },
  gal: {
    name: {
      singular: "Gallon",
      plural: "Gallons"
    },
    to_anchor: 128
  },
  ft3: {
    name: {
      singular: "Cubic foot",
      plural: "Cubic feet"
    },
    to_anchor: 957.506
  },
  yd3: {
    name: {
      singular: "Cubic yard",
      plural: "Cubic yards"
    },
    to_anchor: 25852.7
  }
}, Mp = {
  systems: {
    metric: _p,
    imperial: xp
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 33.8140226
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 33.8140226
        }
      }
    }
  }
}, Fp = {
  "mm3/s": {
    name: {
      singular: "Cubic Millimeter per second",
      plural: "Cubic Millimeters per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e6
    }
  },
  "cm3/s": {
    name: {
      singular: "Cubic Centimeter per second",
      plural: "Cubic Centimeters per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  "dm3/s": {
    name: {
      singular: "Cubic Decimeter per second",
      plural: "Cubic Decimeters per second"
    },
    to_anchor: 1
  },
  "dm3/min": {
    name: {
      singular: "Cubic Decimeter per minute",
      plural: "Cubic Decimeters per minute"
    },
    to_anchor: 1 / 60
  },
  "dm3/h": {
    name: {
      singular: "Cubic Decimeter per hour",
      plural: "Cubic Decimeters per hour"
    },
    to_anchor: 1 / 3600
  },
  "dm3/d": {
    name: {
      singular: "Cubic Decimeter per day",
      plural: "Cubic Decimeters per day"
    },
    to_anchor: 1 / 86400
  },
  "dm3/a": {
    name: {
      singular: "Cubic Decimeter per year",
      plural: "Cubic Decimeters per year"
    },
    to_anchor: 1 / 31557600
  },
  "ml/s": {
    name: {
      singular: "Millilitre per second",
      plural: "Millilitres per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 1e3
    }
  },
  "cl/s": {
    name: {
      singular: "Centilitre per second",
      plural: "Centilitres per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 100
    }
  },
  "dl/s": {
    name: {
      singular: "Decilitre per second",
      plural: "Decilitres per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 10
    }
  },
  "l/s": {
    name: {
      singular: "Litre per second",
      plural: "Litres per second"
    },
    to_anchor: 1
  },
  "l/min": {
    name: {
      singular: "Litre per minute",
      plural: "Litres per minute"
    },
    to_anchor: {
      numerator: 1,
      denominator: 60
    }
  },
  "l/h": {
    name: {
      singular: "Litre per hour",
      plural: "Litres per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3600
    }
  },
  "l/d": {
    name: {
      singular: "Litre per day",
      plural: "Litres per day"
    },
    to_anchor: 1 / 86400
  },
  "l/a": {
    name: {
      singular: "Litre per year",
      plural: "Litres per year"
    },
    to_anchor: 1 / 31557600
  },
  "kl/s": {
    name: {
      singular: "Kilolitre per second",
      plural: "Kilolitres per second"
    },
    to_anchor: 1e3
  },
  "kl/min": {
    name: {
      singular: "Kilolitre per minute",
      plural: "Kilolitres per minute"
    },
    to_anchor: {
      numerator: 50,
      denominator: 3
    }
  },
  "kl/h": {
    name: {
      singular: "Kilolitre per hour",
      plural: "Kilolitres per hour"
    },
    to_anchor: {
      numerator: 5,
      denominator: 18
    }
  },
  "m3/s": {
    name: {
      singular: "Cubic meter per second",
      plural: "Cubic meters per second"
    },
    to_anchor: 1e3
  },
  "m3/min": {
    name: {
      singular: "Cubic meter per minute",
      plural: "Cubic meters per minute"
    },
    to_anchor: {
      numerator: 50,
      denominator: 3
    }
  },
  "m3/h": {
    name: {
      singular: "Cubic meter per hour",
      plural: "Cubic meters per hour"
    },
    to_anchor: {
      numerator: 5,
      denominator: 18
    }
  },
  "m3/d": {
    name: {
      singular: "Cubic meter per day",
      plural: "Cubic meters per day"
    },
    to_anchor: 5 / 432
  },
  "m3/a": {
    name: {
      singular: "Cubic meter per year",
      plural: "Cubic meters per year"
    },
    to_anchor: 5 / 157788
  },
  "km3/s": {
    name: {
      singular: "Cubic kilometer per second",
      plural: "Cubic kilometers per second"
    },
    to_anchor: 1e12
  }
}, Ap = {
  "tsp/s": {
    name: {
      singular: "Teaspoon per second",
      plural: "Teaspoons per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 6
    }
  },
  "Tbs/s": {
    name: {
      singular: "Tablespoon per second",
      plural: "Tablespoons per second"
    },
    to_anchor: {
      numerator: 1,
      denominator: 2
    }
  },
  "in3/s": {
    name: {
      singular: "Cubic inch per second",
      plural: "Cubic inches per second"
    },
    to_anchor: 0.55411
  },
  "in3/min": {
    name: {
      singular: "Cubic inch per minute",
      plural: "Cubic inches per minute"
    },
    to_anchor: {
      numerator: 0.55411,
      denominator: 60
    }
  },
  "in3/h": {
    name: {
      singular: "Cubic inch per hour",
      plural: "Cubic inches per hour"
    },
    to_anchor: {
      numerator: 0.55411,
      denominator: 3600
    }
  },
  "fl-oz/s": {
    name: {
      singular: "Fluid Ounce per second",
      plural: "Fluid Ounces per second"
    },
    to_anchor: 1
  },
  "fl-oz/min": {
    name: {
      singular: "Fluid Ounce per minute",
      plural: "Fluid Ounces per minute"
    },
    to_anchor: {
      numerator: 1,
      denominator: 60
    }
  },
  "fl-oz/h": {
    name: {
      singular: "Fluid Ounce per hour",
      plural: "Fluid Ounces per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 3600
    }
  },
  "cup/s": {
    name: {
      singular: "Cup per second",
      plural: "Cups per second"
    },
    to_anchor: 8
  },
  "pnt/s": {
    name: {
      singular: "Pint per second",
      plural: "Pints per second"
    },
    to_anchor: 16
  },
  "pnt/min": {
    name: {
      singular: "Pint per minute",
      plural: "Pints per minute"
    },
    to_anchor: {
      numerator: 4,
      denominator: 15
    }
  },
  "pnt/h": {
    name: {
      singular: "Pint per hour",
      plural: "Pints per hour"
    },
    to_anchor: {
      numerator: 1,
      denominator: 225
    }
  },
  "qt/s": {
    name: {
      singular: "Quart per second",
      plural: "Quarts per second"
    },
    to_anchor: 32
  },
  "gal/s": {
    name: {
      singular: "Gallon per second",
      plural: "Gallons per second"
    },
    to_anchor: 128
  },
  "gal/min": {
    name: {
      singular: "Gallon per minute",
      plural: "Gallons per minute"
    },
    to_anchor: {
      numerator: 32,
      denominator: 15
    }
  },
  "gal/h": {
    name: {
      singular: "Gallon per hour",
      plural: "Gallons per hour"
    },
    to_anchor: {
      numerator: 8,
      denominator: 225
    }
  },
  "ft3/s": {
    name: {
      singular: "Cubic foot per second",
      plural: "Cubic feet per second"
    },
    to_anchor: 957.506
  },
  "ft3/min": {
    name: {
      singular: "Cubic foot per minute",
      plural: "Cubic feet per minute"
    },
    to_anchor: {
      numerator: 957.506,
      denominator: 60
    }
  },
  "ft3/h": {
    name: {
      singular: "Cubic foot per hour",
      plural: "Cubic feet per hour"
    },
    to_anchor: {
      numerator: 957.506,
      denominator: 3600
    }
  },
  "yd3/s": {
    name: {
      singular: "Cubic yard per second",
      plural: "Cubic yards per second"
    },
    to_anchor: 25852.7
  },
  "yd3/min": {
    name: {
      singular: "Cubic yard per minute",
      plural: "Cubic yards per minute"
    },
    to_anchor: {
      numerator: 25852.7,
      denominator: 60
    }
  },
  "yd3/h": {
    name: {
      singular: "Cubic yard per hour",
      plural: "Cubic yards per hour"
    },
    to_anchor: {
      numerator: 25852.7,
      denominator: 3600
    }
  }
}, $p = {
  systems: {
    metric: Fp,
    imperial: Ap
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 33.8140227
      }
    },
    imperial: {
      metric: {
        ratio: {
          numerator: 1,
          denominator: 33.8140227
        }
      }
    }
  }
}, Op = {
  acceleration: mg,
  angle: gg,
  apparentPower: hg,
  area: bg,
  charge: Cg,
  current: kg,
  digital: Mg,
  each: Ag,
  energy: Pg,
  force: Tg,
  frequency: Eg,
  illuminance: zg,
  length: jg,
  mass: Wg,
  massFlowRate: Yg,
  pace: Jg,
  partsPer: ep,
  pieces: np,
  power: ip,
  pressure: lp,
  reactiveEnergy: up,
  reactivePower: mp,
  speed: pp,
  torque: kp,
  temperature: yp,
  time: wp,
  voltage: Np,
  volume: Mp,
  volumeFlowRate: $p
}, Pp = ug(Op), Ip = {
  // length / distance
  km: { from: "km", to: "mi", label: "mi" },
  m: { from: "m", to: "ft", label: "ft" },
  cm: { from: "cm", to: "in", label: "in" },
  mm: { from: "mm", to: "in", label: "in" },
  // speed
  "km/h": { from: "km/h", to: "mph", label: "mph" },
  "km/hr": { from: "km/h", to: "mph", label: "mph" },
  kph: { from: "km/h", to: "mph", label: "mph" },
  "m/s": { from: "m/s", to: "mph", label: "mph" },
  // volume
  L: { from: "l", to: "gal", label: "gal" },
  l: { from: "l", to: "gal", label: "gal" },
  ml: { from: "ml", to: "fl-oz", label: "fl oz" },
  mL: { from: "ml", to: "fl-oz", label: "fl oz" },
  // mass / weight
  kg: { from: "kg", to: "lb", label: "lb" },
  g: { from: "g", to: "oz", label: "oz" },
  mg: { from: "mg", to: "oz", label: "oz" },
  // temperature
  "°C": { from: "C", to: "F", label: "°F" },
  C: { from: "C", to: "F", label: "°F" }
};
function Tp(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Pp(t).from(e.from).to(e.to)
  };
}
const co = {
  ...Object.fromEntries(
    Object.entries(Ip).map(([e, t]) => [e, Tp(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function fr(e) {
  return e ? { ...co, ...e } : co;
}
function Dp(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Ep(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Lp(e) {
  return e != null && e.quantity ? Ep(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Vp = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function zs(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Zi(e, t) {
  const n = e * (Vp[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let o = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], a = i.map(([c, u], d) => {
    const m = d < i.length - 1 ? Math.floor(o / c) : Math.round(o / c);
    return o -= m * c, [m, u];
  }), s = a.findIndex((c) => c[0] > 0);
  if (s === -1) {
    const c = Math.abs(n);
    return c === 0 ? "0s" : c < 1e3 ? `${r}${zs(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + a.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Dr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const o = Math.abs(e);
    for (const [i, a] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (o >= i) return zs((e / i).toFixed(n.decimals ?? 1)) + a;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function zp(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ea(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Hs(e = co) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Lo(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, o = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Zi(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const d = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ea(Dr(n, t), i.prefix, i.suffix);
    }
    if (o === "time") return Zi(n, r == null ? void 0 : r.unit);
    if (o === "count" || (r == null ? void 0 : r.convert) === !1) return ea(Dr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const a = r == null ? void 0 : r.unit, s = a ? zp(o, a) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Dr(n, t)}${u}`;
  };
}
const Gs = w.createContext(null);
function Hp({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(Gs.Provider, { value: e, children: t });
}
function js() {
  return w.useContext(Gs) ?? void 0;
}
const gr = Ra(null);
gr.displayName = "CubeVizContext";
function We() {
  const e = xo(gr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function yt() {
  return We().families;
}
function Gp(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function kw({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: o,
  families: i,
  interactions: a,
  children: s
}) {
  const c = (i ?? []).map((S) => S.family).join("|"), u = ie(
    () => ti(ei, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), d = ie(
    () => Gp(e) ? Yu(e) : e,
    [e]
  ), m = ie(
    () => {
      var S;
      return {
        chartRamp: (S = t == null ? void 0 : t.chartRamp) != null && S.length ? t.chartRamp : ur,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Os(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), g = ie(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), f = ie(() => o ?? {}, [o]), p = ie(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), h = ie(
    () => ({
      cubeClient: d,
      registry: f,
      families: u,
      locale: g,
      theme: m,
      maps: p
    }),
    [d, f, u, g, m, p]
  ), [y, C] = Mt(null);
  return /* @__PURE__ */ l(gr.Provider, { value: h, children: /* @__PURE__ */ l(
    "div",
    {
      ref: C,
      className: O(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(Hp, { container: y, children: /* @__PURE__ */ l(
        Ho,
        {
          onRangeSelect: a == null ? void 0 : a.onRangeSelect,
          onPointSelect: a == null ? void 0 : a.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function ii({
  families: e,
  children: t
}) {
  const n = We(), r = (e ?? []).map((i) => i.family).join("|"), o = ie(() => !e || e.length === 0 ? n : { ...n, families: ti(ei, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(he, { children: t }) : /* @__PURE__ */ l(gr.Provider, { value: o, children: t });
}
function jp(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Bp = 5e3;
function Bs(e, t) {
  const { cubeClient: n } = We(), r = (t == null ? void 0 : t.skip) ?? !1, o = ie(
    () => e.limit === void 0 ? { ...e, limit: Bp } : e,
    [e]
  ), i = ie(() => JSON.stringify(o), [o]), [a, s] = Mt({ isLoading: !r }), [c, u] = Mt(0), d = st(() => u((m) => m + 1), []);
  return Cn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let m = !0;
    const g = new AbortController();
    return s((f) => ({ resultSet: f.resultSet, isLoading: !0 })), n.load(o, { castNumerics: !0, signal: g.signal }).then((f) => {
      m && s({
        resultSet: f,
        isLoading: !1
      });
    }).catch((f) => {
      m && s({
        isLoading: !1,
        error: f instanceof Error ? f : new Error(String(f))
      });
    }), () => {
      m = !1, g.abort();
    };
  }, [n, i, r, c]), { ...a, refetch: d };
}
const pr = Ra(null);
pr.displayName = "DashboardContext";
function ai({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, o = Ct(null);
  (o.current === null || o.current.key !== r) && (o.current = { store: ng(r, t), key: r });
  const i = o.current.store, a = qp(i, r);
  return Zl(pr.Provider, { value: a }, n);
}
function qp(e, t) {
  const n = st(
    (i, a) => e.set(i, a),
    [e]
  ), r = st(
    (i) => Ls(i, e.getAll(), t),
    [e, t]
  ), o = st(
    (i) => Jf(i, e.getAll(), t),
    [e, t]
  );
  return ie(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: o, decls: t }),
    [e, n, r, o, t]
  );
}
function Wp(e) {
  const t = Na(e.store.subscribe, e.store.getAll, e.store.getAll);
  return ie(
    () => ({
      vars: t,
      setVar: e.setVar,
      resolveQuery: e.resolveQuery,
      resolveValue: e.resolveValue,
      decls: e.decls
    }),
    [t, e]
  );
}
function qs() {
  const e = xo(pr);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Wp(e);
}
function Rn() {
  return xo(pr);
}
const Up = () => () => {
}, Kp = Object.freeze({}), Yp = Object.freeze([]);
function Er(e, t, n) {
  var A;
  const r = Rn(), { locale: o } = We(), i = yt(), a = Ct(null);
  a.current === null && (a.current = Vs());
  const s = a.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), d = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? Kp,
    (r == null ? void 0 : r.decls) ?? Yp
  ) : e, m = Na(
    u && r ? r.store.subscribe : Up,
    d,
    d
  ), { resultSet: g, isLoading: f, error: p, refetch: h } = Bs(m, { skip: n == null ? void 0 : n.skip }), y = ((A = t.format) == null ? void 0 : A.unitSystem) ?? (o == null ? void 0 : o.unitSystem), C = ie(() => fr(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]);
  return { data: ie(() => {
    if (g)
      return Ts(g, t, m, { unitSystem: y, conversions: C }, i);
  }, [g, t, m, y, C, i]), isLoading: f, error: p, refetch: h, resolvedQuery: m };
}
function bt() {
  const { cubeClient: e } = We(), [t, n] = Mt({ isLoading: !0 });
  return Cn(() => {
    let r = !0;
    return n({ isLoading: !0 }), Qu(e).then((o) => {
      r && n({ meta: o, isLoading: !1 });
    }).catch((o) => {
      r && n({
        isLoading: !1,
        error: o instanceof Error ? o : new Error(String(o))
      });
    }), () => {
      r = !1;
    };
  }, [e]), t;
}
function hr() {
  const { locale: e } = We(), t = w.useMemo(() => fr(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return w.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function Rw() {
  const { locale: e } = We(), { formatValue: t, units: n } = e;
  return ie(
    () => t ?? Hs(fr(n)),
    [t, n]
  );
}
function Ws() {
  const [e, t] = Mt(0), n = Ct(null), r = Ct(null), o = Ct(null), i = Ct(0), a = st((u) => {
    o.current === null && (o.current = requestAnimationFrame(() => {
      o.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = st(() => {
    r.current && (r.current.disconnect(), r.current = null), o.current !== null && (cancelAnimationFrame(o.current), o.current = null);
  }, []), c = st(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== i.current && (i.current = d, t(d));
      const m = new ResizeObserver((g) => {
        var f, p;
        for (const h of g) {
          const y = ((p = (f = h.contentBoxSize) == null ? void 0 : f[0]) == null ? void 0 : p.inlineSize) ?? h.contentRect.width;
          a(y);
        }
      });
      m.observe(u), r.current = m;
    },
    [a, s]
  );
  return Cn(() => s, [s]), [c, e];
}
const Qp = "day";
function Xp(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const o = r.member ?? (n == null ? void 0 : n.measure), i = (d = e.timeDimensions) == null ? void 0 : d[0], a = r.timeDimension ?? (i == null ? void 0 : i.dimension);
  if (!o || !a) return null;
  const s = r.dateRange ?? (i == null ? void 0 : i.dateRange);
  return { query: {
    measures: [o],
    timeDimensions: [
      {
        dimension: a,
        granularity: r.granularity ?? Qp,
        ...s !== void 0 ? { dateRange: s } : {}
      }
    ],
    ...e.filters ? { filters: e.filters } : {},
    ...e.segments ? { segments: e.segments } : {},
    // Keep the trend's buckets/relative-ranges in the host timezone (same as the headline).
    ...e.timezone ? { timezone: e.timezone } : {},
    order: [[a, "asc"]]
  }, chart: {
    family: "line",
    mapping: {
      category: { member: a },
      series: { mode: "measures", members: [o] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const oe = (e) => we(e, "yyyy-MM-dd");
function Jp(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const o = zn(e[0]), i = zn(e[1]);
    if (Number.isNaN(o.getTime()) || Number.isNaN(i.getTime())) return;
    const a = pc(i, o) + 1;
    return [oe(Re(o, a)), oe(Re(o, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const o = Re(t, 1);
    return [oe(o), oe(o)];
  }
  if (n === "yesterday") {
    const o = Re(t, 2);
    return [oe(o), oe(o)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const o = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [oe(Re(t, 2 * o - 1)), oe(Re(t, o))];
    if (i.startsWith("week")) return [oe(Re(t, 14 * o - 1)), oe(Re(t, 7 * o))];
    if (i.startsWith("month"))
      return [oe(St(Nt(t, 2 * o))), oe(Re(St(Nt(t, o)), 1))];
    if (i.startsWith("quarter"))
      return [oe(kt(_t(t, 2 * o))), oe(Re(kt(_t(t, o)), 1))];
    if (i.startsWith("year"))
      return [oe(Rt(xt(t, 2 * o))), oe(Re(Rt(xt(t, o)), 1))];
  }
  if (n === "this week") {
    const o = Wr(t, 1);
    return [oe(Hn(o)), oe(Gn(o))];
  }
  if (n === "this month") {
    const o = Nt(t, 1);
    return [oe(St(o)), oe(sn(o))];
  }
  if (n === "this quarter") {
    const o = _t(t, 1);
    return [oe(kt(o)), oe(ln(o))];
  }
  if (n === "this year") {
    const o = xt(t, 1);
    return [oe(Rt(o)), oe(cn(o))];
  }
  if (n === "last week") {
    const o = Wr(t, 2);
    return [oe(Hn(o)), oe(Gn(o))];
  }
  if (n === "last month") {
    const o = Nt(t, 2);
    return [oe(St(o)), oe(sn(o))];
  }
  if (n === "last quarter") {
    const o = _t(t, 2);
    return [oe(kt(o)), oe(ln(o))];
  }
  if (n === "last year") {
    const o = xt(t, 2);
    return [oe(Rt(o)), oe(cn(o))];
  }
}
function Zp(e, t, n = cr) {
  var u, d;
  const r = t.familyOptions ?? {}, o = n.require(t.family).comparePreviousMode;
  if (o === "series") {
    if (!r.comparePrevious) return null;
  } else if (o === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (d = e.timeDimensions) == null ? void 0 : d[0];
  if (!i) return null;
  const a = i.dateRange;
  if (a !== void 0 && typeof a == "object" && !Array.isArray(a)) return null;
  const s = Jp(a);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: o } : null;
}
const eh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function si({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: o,
  widgetId: i,
  onRangeSelect: a,
  onPointSelect: s
}) {
  var z;
  const { registry: c, locale: u, theme: d } = We(), m = yt(), g = ((z = m.get(t.family)) == null ? void 0 : z.queryless) ?? !1, f = ie(() => {
    var L;
    return (L = t.format) != null && L.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), p = ie(() => {
    const L = e ?? {};
    return L.timezone || !(u != null && u.timezone) ? L : { ...L, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: h, isLoading: y, error: C, refetch: S, resolvedQuery: A } = Er(
    p,
    f,
    { skip: g }
  ), k = ie(() => Xp(p, f), [p, f]), N = Er(
    (k == null ? void 0 : k.query) ?? p,
    (k == null ? void 0 : k.chart) ?? f,
    { skip: !k }
  ), $ = ie(
    () => Zp(A, f, m),
    [A, f, m]
  ), _ = Er(
    ($ == null ? void 0 : $.query) ?? p,
    f,
    { skip: !$, skipResolve: !0 }
  ), D = ie(
    () => ({ [f.family]: jp(c, f.family, m) }),
    [c, f.family, m]
  ), E = ie(() => {
    let L = h ?? eh;
    if (k && N.data) {
      L = { ...L, series: N.data.series, categories: N.data.categories };
      const X = L.raw.rows.length > 0, te = L.series.some((re) => re.data.some((ce) => ce !== null));
      L = { ...L, empty: !X && !te };
    }
    if ($ && _.data) {
      if ($.mode === "kpiRow") {
        const X = _.data.raw.rows[0];
        if (X) {
          const te = L.raw.rows[0];
          L = {
            ...L,
            raw: { ...L.raw, rows: te ? [te, X] : [X] }
          };
        }
      } else if (!_.data.empty) {
        const X = new Map(_.data.series.map((te) => [te.key, te]));
        if (!L.empty && L.series.length > 0) {
          const te = L.categories.length, re = L.series.map((ce) => {
            const me = X.get(ce.key), ue = Array.from({ length: te }, (pe, ve) => (me == null ? void 0 : me.data[ve]) ?? null);
            return {
              ...ce,
              key: `${ce.key}__prev`,
              label: `${ce.label} (prev)`,
              colorToken: ce.colorToken,
              data: ue,
              meta: { ...ce.meta, companion: !0 }
            };
          });
          L = { ...L, series: [...L.series, ...re] };
        } else {
          const te = _.data.series.map((re) => ({
            ...re,
            key: `${re.key}__prev`,
            label: `${re.label} (prev)`,
            data: [...re.data],
            meta: { ...re.meta, companion: !0 }
          }));
          L = {
            ...L,
            categories: _.data.categories,
            series: te,
            empty: !1
          };
        }
      }
    }
    return L;
  }, [h, k, N.data, $, _.data]);
  Cn(() => {
    n == null || n({ rows: E.raw.rows, refetch: S, isLoading: y });
  }, [n, E.raw.rows, S, y]);
  const M = {}, P = ie(
    () => u.formatValue ?? Hs(fr(u.units)),
    [u.formatValue, u.units]
  ), V = ie(
    () => Vo(E.raw.annotation, f, P, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [E.raw.annotation, f, P, u.locale, u.unitSystem]
  ), T = f.mapping, U = ie(
    () => ({
      categoryMember: T == null ? void 0 : T.category.member,
      pivotMember: (T == null ? void 0 : T.series.mode) === "pivot" ? T.series.pivot : void 0,
      formatCategory: V.category
    }),
    [T, V]
  );
  return /* @__PURE__ */ l(
    Ho,
    {
      widgetId: i,
      target: U,
      onRangeSelect: a,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Ps,
        {
          data: E,
          options: f,
          config: M,
          format: V,
          state: g ? { loading: !1 } : { loading: y && !h, error: C },
          components: D,
          registry: m,
          theme: d.marks,
          editing: r,
          updateFamilyOptions: o
        }
      )
    }
  );
}
function th({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    si,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const Us = "cube-viz-prose";
function nh(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function rh({ doc: e }) {
  const t = nh(e), n = ie(
    () => t ? e : null,
    [t, e]
  ), r = qa(
    {
      extensions: [Ua],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: O(Us) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(Wa, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Tn = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this week", label: "This week" },
  { value: "this month", label: "This month" },
  { value: "this quarter", label: "This quarter" },
  { value: "this year", label: "This year" },
  { value: "last 7 days", label: "Last 7 days" },
  { value: "last 30 days", label: "Last 30 days" },
  { value: "last 90 days", label: "Last 90 days" },
  { value: "last week", label: "Last week (previous)" },
  { value: "last month", label: "Last month (previous)" },
  { value: "last quarter", label: "Last quarter (previous)" },
  { value: "last year", label: "Last year (previous)" },
  { value: "last 6 months", label: "Last 6 months" },
  { value: "last 12 months", label: "Last 12 months" }
], oh = Object.fromEntries(
  Tn.map((e) => [e.value, e.label])
);
function ta(e) {
  return oh[e.trim().toLowerCase()] ?? e;
}
const ih = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function ah({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = ou(), o = O(As({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ b("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: O(o, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Po, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: we(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: O(o, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Sn, {})
      }
    )
  ] });
}
function sh({ day: e, modifiers: t, className: n, style: r, ...o }) {
  const i = !!t.selected && !t.outside && !t.disabled, a = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...o,
      style: { ...r, color: i ? "var(--primary-foreground)" : a ? "var(--muted-foreground)" : "var(--foreground)" },
      className: O(
        "cv-cal-day-btn",
        // size-9 cells touch edge-to-edge, so a contiguous range reads as one band.
        i && "cv-cal-day-btn--selected",
        t.today && !i && "cv-cal-day-btn--today",
        t.disabled && "cv-cal-day-btn--disabled",
        n
      )
    }
  );
}
function Ks({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    ru,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: O("cv-cal", e),
      classNames: {
        months: "cv-cal-months",
        month: "cv-cal-month",
        month_caption: "",
        // Native table: <th> weekdays + <td> days share columns -> always aligned.
        month_grid: "cv-cal-grid",
        weekdays: "",
        weekday: "cv-cal-weekday",
        week: "",
        day: "cv-cal-day",
        hidden: "cv-cal-hidden",
        ...t
      },
      components: {
        MonthCaption: ah,
        DayButton: sh,
        Chevron: ({ orientation: o, className: i, ...a }) => /* @__PURE__ */ l(o === "left" ? Po : Sn, { className: O("cv-icon", i), ...a })
      },
      ...r
    }
  );
}
function He({
  ...e
}) {
  return /* @__PURE__ */ l(jn.Root, { "data-slot": "popover", ...e });
}
function Ge({
  ...e
}) {
  return /* @__PURE__ */ l(jn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function je({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const o = js();
  return /* @__PURE__ */ l(jn.Portal, { container: o, children: /* @__PURE__ */ l(
    jn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: O("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Root, { "data-slot": "select", ...e });
}
function uo({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Group, { "data-slot": "select-group", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Value, { "data-slot": "select-value", ...e });
}
function Ee({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ b(
    xe.Trigger,
    {
      "data-slot": "select-trigger",
      className: O("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(xe.Icon, { asChild: !0, children: /* @__PURE__ */ l(ht, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function lh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Nc, {})
    }
  );
}
function ch({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(ht, {})
    }
  );
}
function Le({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const o = js();
  return /* @__PURE__ */ l(xe.Portal, { container: o, children: /* @__PURE__ */ b(
    xe.Content,
    {
      "data-slot": "select-content",
      className: O(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(lh, {}),
        /* @__PURE__ */ l(
          xe.Viewport,
          {
            className: O(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(ch, {})
      ]
    }
  ) });
}
function mo({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.Label,
    {
      "data-slot": "select-label",
      className: O("cv-select-label", e),
      ...t
    }
  );
}
function Ce({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ b(
    xe.Item,
    {
      "data-slot": "select-item",
      className: O("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(xe.ItemIndicator, { children: /* @__PURE__ */ l(Ut, {}) }) }),
        /* @__PURE__ */ l(xe.ItemText, { children: t })
      ]
    }
  );
}
const qt = "cv-field", uh = "cv-field-label", nn = "yyyy-MM-dd";
function dh(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function na(e) {
  if (!e) return;
  const t = Oa(e, nn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function mh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, o = r.presets ?? ih, [i, a] = Mt(!1), s = typeof e == "string", [c, u] = dh(e), d = na(c), m = na(u), g = d ? { from: d, to: m } : void 0;
  let f;
  s ? f = ta(e) : d && m ? f = `${we(d, "MMM d, yyyy")} – ${we(m, "MMM d, yyyy")}` : d ? f = we(d, "MMM d, yyyy") : f = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ b(He, { open: i, onOpenChange: a, children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(
      J,
      {
        variant: "outline",
        className: O(
          "cv-daterange-trigger",
          f === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Ea, {}),
          f
        ]
      }
    ) }),
    /* @__PURE__ */ b(je, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: o.map((h) => /* @__PURE__ */ l(
        J,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(h), a(!1);
          },
          children: ta(h)
        },
        h
      )) }),
      /* @__PURE__ */ l(
        Ks,
        {
          mode: "range",
          selected: g,
          defaultMonth: d,
          disabled: p,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([we(h.from, nn), we(h.to, nn)]) : h != null && h.from ? t([we(h.from, nn), we(h.from, nn)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const fh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function gh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: o } = qs(), i = r.rangeVariable ? ri(o(r.rangeVariable)) : void 0, a = r.options ?? (i !== void 0 ? Ds(i) : fh), s = typeof e == "string" ? e : "", c = a.join(",");
  return Cn(() => {
    s && !a.includes(s) && t(a[0]);
  }, [s, c]), /* @__PURE__ */ b(
    Te,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Ee, { className: qt, children: /* @__PURE__ */ l(De, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Le, { children: a.map((u) => /* @__PURE__ */ l(Ce, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function ph({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((a) => String(a))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: O(qt, "cv-field--multi"),
        value: [...i],
        onChange: (a) => {
          const s = Array.from(a.target.selectedOptions, (u) => u.value), c = r.options.every((u) => typeof u.value == "number");
          t(c ? s.map((u) => Number(u)) : s);
        },
        children: r.options.map((a) => /* @__PURE__ */ l("option", { value: String(a.value), children: a.label }, String(a.value)))
      }
    );
  }
  const o = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ b(
    Te,
    {
      value: o,
      onValueChange: (i) => {
        const a = r.options.find((s) => String(s.value) === i);
        t(a ? a.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Ee, { className: qt, children: /* @__PURE__ */ l(De, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Le, { children: r.options.map((i) => /* @__PURE__ */ l(Ce, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function hh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: o, isLoading: i } = bt(), a = ie(() => {
    if (!o) return [];
    const s = [];
    for (const c of o.cubes)
      if (!(r.cube && c.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const u of c.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const u of c.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [o, r.cube, r.from]);
  return /* @__PURE__ */ b(
    "select",
    {
      className: qt,
      value: typeof e == "string" ? e : "",
      disabled: i,
      onChange: (s) => t(s.target.value || void 0),
      children: [
        /* @__PURE__ */ l("option", { value: "", children: i ? "Loading…" : "—" }),
        a.map((s) => /* @__PURE__ */ l("option", { value: s.name, children: s.label }, s.name))
      ]
    }
  );
}
function vh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: qt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (o) => t(o.target.value)
    }
  );
}
function yh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: qt,
      min: r.min,
      max: r.max,
      step: r.step,
      value: typeof e == "number" ? e : "",
      onChange: (o) => {
        const i = o.target.value;
        t(i === "" ? void 0 : Number(i));
      }
    }
  );
}
function bh({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ b("label", { className: "cv-toggle", children: [
    /* @__PURE__ */ l(
      "input",
      {
        type: "checkbox",
        className: "cv-toggle-check",
        checked: e === !0,
        onChange: (o) => t(o.target.checked)
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-toggle-label", children: n.label ?? n.name })
  ] });
}
const wh = {
  dateRange: mh,
  granularity: gh,
  select: ph,
  memberSelect: hh,
  text: vh,
  number: yh,
  toggle: bh
};
function Ch({ control: e, title: t }) {
  var f;
  const { registry: n } = We(), { decls: r, resolveValue: o, setVar: i } = qs(), a = ie(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = ec();
  if (!a)
    return /* @__PURE__ */ b("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((f = n.controls) == null ? void 0 : f[c]) ?? wh[c], d = o(e.variable), m = (p) => i(e.variable, p), g = t ?? a.label ?? a.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: d, onChange: m, decl: a, control: e.control }) : /* @__PURE__ */ b("div", { children: [
    /* @__PURE__ */ l("label", { className: uh, htmlFor: s, children: g }),
    /* @__PURE__ */ l(
      u,
      {
        value: d,
        onChange: m,
        decl: a,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const Ys = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
Ys.displayName = "Card";
const Qs = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
Qs.displayName = "CardHeader";
const Xs = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O("cv-card-title", e),
      ...t
    }
  )
);
Xs.displayName = "CardTitle";
const Sh = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-description", e), ...t })
);
Sh.displayName = "CardDescription";
const kh = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: O("cv-card-action", e),
      ...t
    }
  )
);
kh.displayName = "CardAction";
const Js = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-content", e), ...t })
);
Js.displayName = "CardContent";
const Rh = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-footer", e), ...t })
);
Rh.displayName = "CardFooter";
const Yn = "cube-viz-drag-handle";
function Zs(e) {
  var s;
  const { registry: t } = We(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: o, dragHandleProps: i, children: a } = e;
  return /* @__PURE__ */ b(Ys, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ b(
      Qs,
      {
        ...i,
        className: O(Yn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(Xs, { className: "cv-widget-chrome-title", children: r }),
          o
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Js, { className: "cv-widget-chrome-body", children: a })
  ] });
}
class ra extends tc {
  constructor() {
    super(...arguments);
    Sr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ b(rr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Oo, {}),
      /* @__PURE__ */ l(or, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(ir, { children: n.message })
    ] }) : this.props.children;
  }
}
function Nh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let a = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(a) && !Number.isFinite(Number(a)) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
  }, r = t.map(n).join(","), o = e.map((i) => t.map((a) => n(i[a])).join(",")).join(`
`);
  return `${r}
${o}`;
}
function _h(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), o = URL.createObjectURL(r), i = document.createElement("a");
  i.href = o, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(o), 0);
}
function xh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), o.href = e, o.href;
}
const Mh = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function lt(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let Ot = null;
function el(e = {}) {
  return Ot || (e.includeStyleProperties ? (Ot = e.includeStyleProperties, Ot) : (Ot = lt(window.getComputedStyle(document.documentElement)), Ot));
}
function Qn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Fh(e) {
  const t = Qn(e, "border-left-width"), n = Qn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Ah(e) {
  const t = Qn(e, "border-top-width"), n = Qn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function tl(e, t = {}) {
  const n = t.width || Fh(e), r = t.height || Ah(e);
  return { width: n, height: r };
}
function $h() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ae = 16384;
function Oh(e) {
  (e.width > Ae || e.height > Ae) && (e.width > Ae && e.height > Ae ? e.width > e.height ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae) : e.width > Ae ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae));
}
function Xn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Ph(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Ih(e, t, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${t}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(e), Ph(o);
}
const Me = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Me(n, t);
};
function Th(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Dh(e, t) {
  return el(t).map((n) => {
    const r = e.getPropertyValue(n), o = e.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function Eh(e, t, n, r) {
  const o = `.${e}:${t}`, i = n.cssText ? Th(n) : Dh(n, r);
  return document.createTextNode(`${o}{${i}}`);
}
function oa(e, t, n, r) {
  const o = window.getComputedStyle(e, n), i = o.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const a = Mh();
  try {
    t.className = `${t.className} ${a}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Eh(a, n, o, r)), t.appendChild(s);
}
function Lh(e, t, n) {
  oa(e, t, ":before", n), oa(e, t, ":after", n);
}
const ia = "application/font-woff", aa = "image/jpeg", Vh = {
  woff: ia,
  woff2: ia,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: aa,
  jpeg: aa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function zh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function li(e) {
  const t = zh(e).toLowerCase();
  return Vh[t] || "";
}
function Hh(e) {
  return e.split(/,/)[1];
}
function fo(e) {
  return e.search(/^(data:)/) !== -1;
}
function Gh(e, t) {
  return `data:${t};base64,${e}`;
}
async function nl(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const o = await r.blob();
  return new Promise((i, a) => {
    const s = new FileReader();
    s.onerror = a, s.onloadend = () => {
      try {
        i(n({ res: r, result: s.result }));
      } catch (c) {
        a(c);
      }
    }, s.readAsDataURL(o);
  });
}
const Lr = {};
function jh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ci(e, t, n) {
  const r = jh(e, t, n.includeQueryParams);
  if (Lr[r] != null)
    return Lr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const i = await nl(e, n.fetchRequestInit, ({ res: a, result: s }) => (t || (t = a.headers.get("Content-Type") || ""), Hh(s)));
    o = Gh(i, t);
  } catch (i) {
    o = n.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${e}`;
    i && (a = typeof i == "string" ? i : i.message), a && console.warn(a);
  }
  return Lr[r] = o, o;
}
async function Bh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Xn(t);
}
async function qh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), a = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, a == null || a.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Xn(s);
  }
  const n = e.poster, r = li(n), o = await ci(n, r, t);
  return Xn(o);
}
async function Wh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await vr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Uh(e, t) {
  return Me(e, HTMLCanvasElement) ? Bh(e) : Me(e, HTMLVideoElement) ? qh(e, t) : Me(e, HTMLIFrameElement) ? Wh(e, t) : e.cloneNode(rl(e));
}
const Kh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", rl = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Yh(e, t, n) {
  var r, o;
  if (rl(t))
    return t;
  let i = [];
  return Kh(e) && e.assignedNodes ? i = lt(e.assignedNodes()) : Me(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = lt(e.contentDocument.body.childNodes) : i = lt(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes), i.length === 0 || Me(e, HTMLVideoElement) || await i.reduce((a, s) => a.then(() => vr(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Qh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const o = window.getComputedStyle(e);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : el(n).forEach((i) => {
    let a = o.getPropertyValue(i);
    i === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), Me(e, HTMLIFrameElement) && i === "display" && a === "inline" && (a = "block"), i === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(i, a, o.getPropertyPriority(i));
  });
}
function Xh(e, t) {
  Me(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Me(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Jh(e, t) {
  if (Me(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((o) => e.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Zh(e, t, n) {
  return Me(t, Element) && (Qh(e, t, n), Lh(e, t, n), Xh(e, t), Jh(e, t)), t;
}
async function ev(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await vr(u, t, !0));
    }
  }
  const o = Object.values(r);
  if (o.length) {
    const i = "http://www.w3.org/1999/xhtml", a = document.createElementNS(i, "svg");
    a.setAttribute("xmlns", i), a.style.position = "absolute", a.style.width = "0", a.style.height = "0", a.style.overflow = "hidden", a.style.display = "none";
    const s = document.createElementNS(i, "defs");
    a.appendChild(s);
    for (let c = 0; c < o.length; c++)
      s.appendChild(o[c]);
    e.appendChild(a);
  }
  return e;
}
async function vr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Uh(r, t)).then((r) => Yh(e, r, t)).then((r) => Zh(e, r, t)).then((r) => ev(r, t));
}
const ol = /url\((['"]?)([^'"]+?)\1\)/g, tv = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, nv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function rv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function ov(e) {
  const t = [];
  return e.replace(ol, (n, r, o) => (t.push(o), n)), t.filter((n) => !fo(n));
}
async function iv(e, t, n, r, o) {
  try {
    const i = n ? xh(t, n) : t, a = li(t);
    let s;
    return o || (s = await ci(i, a, r)), e.replace(rv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function av(e, { preferredFontFormat: t }) {
  return t ? e.replace(nv, (n) => {
    for (; ; ) {
      const [r, , o] = tv.exec(n) || [];
      if (!o)
        return "";
      if (o === t)
        return `src: ${r};`;
    }
  }) : e;
}
function il(e) {
  return e.search(ol) !== -1;
}
async function al(e, t, n) {
  if (!il(e))
    return e;
  const r = av(e, n);
  return ov(r).reduce((i, a) => i.then((s) => iv(s, a, t, n)), Promise.resolve(r));
}
async function Pt(e, t, n) {
  var r;
  const o = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (o) {
    const i = await al(o, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function sv(e, t) {
  await Pt("background", e, t) || await Pt("background-image", e, t), await Pt("mask", e, t) || await Pt("-webkit-mask", e, t) || await Pt("mask-image", e, t) || await Pt("-webkit-mask-image", e, t);
}
async function lv(e, t) {
  const n = Me(e, HTMLImageElement);
  if (!(n && !fo(e.src)) && !(Me(e, SVGImageElement) && !fo(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, o = await ci(r, li(r), t);
  await new Promise((i, a) => {
    e.onload = i, e.onerror = t.onImageErrorHandler ? (...c) => {
      try {
        i(t.onImageErrorHandler(...c));
      } catch (u) {
        a(u);
      }
    } : a;
    const s = e;
    s.decode && (s.decode = i), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = o) : e.href.baseVal = o;
  });
}
async function cv(e, t) {
  const r = lt(e.childNodes).map((o) => sl(o, t));
  await Promise.all(r).then(() => e);
}
async function sl(e, t) {
  Me(e, Element) && (await sv(e, t), await lv(e, t), await cv(e, t));
}
function uv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), e;
}
const sa = {};
async function la(e) {
  let t = sa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, sa[e] = t, t;
}
async function ca(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let s = a.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), nl(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(a, `url(${c})`), [a, c]));
  });
  return Promise.all(i).then(() => n);
}
function ua(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const o = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const c = o.exec(r);
    if (c === null)
      break;
    t.push(c[0]);
  }
  r = r.replace(o, "");
  const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, a = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(a, "gi");
  for (; ; ) {
    let c = i.exec(r);
    if (c === null) {
      if (c = s.exec(r), c === null)
        break;
      i.lastIndex = s.lastIndex;
    } else
      s.lastIndex = i.lastIndex;
    t.push(c[0]);
  }
  return t;
}
async function dv(e, t) {
  const n = [], r = [];
  return e.forEach((o) => {
    if ("cssRules" in o)
      try {
        lt(o.cssRules || []).forEach((i, a) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = a + 1;
            const c = i.href, u = la(c).then((d) => ca(d, t)).then((d) => ua(d).forEach((m) => {
              try {
                o.insertRule(m, m.startsWith("@import") ? s += 1 : o.cssRules.length);
              } catch (g) {
                console.error("Error inserting rule from remote css", {
                  rule: m,
                  error: g
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(u);
          }
        });
      } catch (i) {
        const a = e.find((s) => s.href == null) || document.styleSheets[0];
        o.href != null && r.push(la(o.href).then((s) => ca(s, t)).then((s) => ua(s).forEach((c) => {
          a.insertRule(c, a.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((o) => {
    if ("cssRules" in o)
      try {
        lt(o.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${o.href}`, i);
      }
  }), n));
}
function mv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => il(t.style.getPropertyValue("src")));
}
async function fv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = lt(e.ownerDocument.styleSheets), r = await dv(n, t);
  return mv(r);
}
function ll(e) {
  return e.trim().replace(/["']/g, "");
}
function gv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(ll(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function pv(e, t) {
  const n = await fv(e, t), r = gv(e);
  return (await Promise.all(n.filter((i) => r.has(ll(i.style.fontFamily))).map((i) => {
    const a = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return al(i.cssText, a, t);
  }))).join(`
`);
}
async function hv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await pv(e, t);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function vv(e, t = {}) {
  const { width: n, height: r } = tl(e, t), o = await vr(e, t, !0);
  return await hv(o, t), await sl(o, t), uv(o, t), await Ih(o, n, r);
}
async function yv(e, t = {}) {
  const { width: n, height: r } = tl(e, t), o = await vv(e, t), i = await Xn(o), a = document.createElement("canvas"), s = a.getContext("2d"), c = t.pixelRatio || $h(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return a.width = u * c, a.height = d * c, t.skipAutoScale || Oh(a), a.style.width = `${u}`, a.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, a.width, a.height)), s.drawImage(i, 0, 0, a.width, a.height), a;
}
async function bv(e, t = {}) {
  return (await yv(e, t)).toDataURL();
}
function wv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Cv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Sv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function kv(e, t, n = 2) {
  const r = await bv(e, {
    pixelRatio: n,
    backgroundColor: Sv(e),
    cacheBust: !0
  });
  Cv(r, `${wv(t)}.png`);
}
function Rv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [o, i] = w.useState(!1), [a, s] = w.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const d = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    _h(Nh(t), `${p}.csv`);
  }, m = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || o)) {
      i(!0), s(null);
      try {
        await kv(p, e);
      } catch (h) {
        s(h instanceof Error ? h.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (p) => p.stopPropagation(), f = (p = !0) => O("cv-menu-item", !p && "cv-menu-item--disabled");
  return /* @__PURE__ */ b(He, { children: [
    /* @__PURE__ */ l(
      Ge,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(_c, {})
      }
    ),
    /* @__PURE__ */ b(je, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ b("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ l(xc, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ b("button", { type: "button", onClick: m, disabled: o, className: f(!o), children: [
        /* @__PURE__ */ l(Mc, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ b("button", { type: "button", onClick: d, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ l(Fc, {}),
        "Export CSV"
      ] }),
      a ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: a }) : null
    ] })
  ] });
}
function da({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        si,
        {
          query: e.query,
          chart: e.chart,
          onState: t,
          widgetId: e.id,
          onRangeSelect: n,
          onPointSelect: r
        }
      );
    case "text":
      return /* @__PURE__ */ l(rh, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Ch, { control: e.control, title: e.title });
  }
}
function go({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: o
}) {
  const [i, a] = Mt({ rows: [] }), s = st(
    (d) => a({ rows: d.rows, refetch: d.refetch }),
    []
  ), c = Ct(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(ra, { children: /* @__PURE__ */ l(da, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Rv,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    Zs,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(ra, { children: /* @__PURE__ */ l(
        da,
        {
          widget: e,
          onState: s,
          onRangeSelect: r,
          onPointSelect: o
        }
      ) }) })
    }
  );
}
const cl = (e) => e.filter((t) => t.type === "chart");
function Nv(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const o of cl(e)) {
    const i = (r = (n = o.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && _e(i.dateRange) && t.set(o.id, i.dateRange.var);
  }
  return t;
}
function _v(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (o) => {
    for (const i of o)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const a = (i.values ?? []).find(_e);
        a && t.set(i.member, a.var);
      }
  };
  for (const o of cl(e)) n(((r = o.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function xv({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: o
}) {
  const i = Rn(), a = i == null ? void 0 : i.setVar, s = w.useMemo(() => Nv(e.widgets), [e.widgets]), c = w.useMemo(() => _v(e.widgets), [e.widgets]), u = w.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const d = w.useCallback(
    (p) => {
      var h, y;
      if (a) {
        const C = p != null && p.widgetId ? s.get(p.widgetId) : void 0;
        if (C) a(C, p ? [p.from, p.to] : void 0);
        else if (!p) for (const S of new Set(s.values())) a(S, void 0);
      }
      (y = (h = u.current).onRangeSelect) == null || y.call(h, p);
    },
    [a, s]
  ), m = w.useCallback(
    (p) => {
      var h, y;
      if (a)
        if (p) {
          const C = c.get(p.member);
          C && a(C, [String(p.value)]);
        } else
          for (const C of new Set(c.values())) a(C, void 0);
      (y = (h = u.current).onPointSelect) == null || y.call(h, p);
    },
    [a, c]
  ), g = !!(n || t && a && s.size), f = !!(r || t && a && c.size);
  return /* @__PURE__ */ l(
    Ho,
    {
      onRangeSelect: g ? d : void 0,
      onPointSelect: f ? m : void 0,
      children: o
    }
  );
}
const Mv = "lg", Fv = 640;
function Av(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function $v(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Nw({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: o,
  onPointSelect: i
}) {
  const [a, s] = Ws(), c = e.grid ?? {}, u = c.cols ?? 12, d = c.rowHeight ?? 40, m = c.margin ?? [12, 12], g = c.containerPadding ?? m, f = ie(
    () => ({ [Mv]: $v(e.layout) }),
    [e.layout]
  ), p = ie(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && s > 0 && s < Fv;
  return /* @__PURE__ */ l(ii, { families: n, children: /* @__PURE__ */ l(ai, { spec: e, children: /* @__PURE__ */ l(
    xv,
    {
      spec: e,
      drill: r,
      onRangeSelect: o,
      onPointSelect: i,
      children: /* @__PURE__ */ l("div", { ref: a, className: "cv-dashboard", children: s <= 0 ? null : h ? /* @__PURE__ */ l(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: m[1],
            padding: `${g[1]}px ${g[0]}px`
          },
          children: Av(e.layout).map((y) => {
            const C = p.get(y.i);
            if (!C) return null;
            const S = y.h * d + (y.h - 1) * m[1];
            return /* @__PURE__ */ l("div", { style: { height: S }, children: /* @__PURE__ */ l(go, { widget: C, editable: !1 }) }, y.i);
          })
        }
      ) : /* @__PURE__ */ l(
        Ba,
        {
          width: s,
          layouts: f,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: d,
          margin: m,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${Yn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((y) => {
            const C = p.get(y.i);
            return C ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(go, { widget: C, editable: t }) }, y.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function _w({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(ii, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Zs,
    {
      widget: {
        id: e.id,
        type: "chart",
        title: e.name,
        query: e.query,
        chart: e.chart
      },
      title: e.name,
      menu: null,
      dragHandleProps: {},
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l(
        th,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function ul(e, t = "None") {
  if (_e(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => ul(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Ov(e) {
  switch (e) {
    case "dateRange":
      return ["dateRange", "time"];
    case "granularity":
      return ["granularity"];
    case "string":
      return ["string", "dimension", "dimensionOrMeasure"];
    case "number":
      return ["number", "measure"];
    case "boolean":
      return ["boolean"];
  }
}
function Pv(e, t) {
  const n = new Set(Ov(t));
  return e.filter((r) => n.has(r.type));
}
function Iv(e) {
  switch (e) {
    case "dateRange":
      return "dateRange";
    case "granularity":
      return "granularity";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "string":
      return "string";
  }
}
function Tv(e, t, n) {
  const r = new Set(n.map((s) => s.name)), o = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = o, a = 2;
  for (; r.has(i); ) i = `${o}_${a++}`;
  return i;
}
function Dv(e, t, n) {
  const r = Iv(e), o = { name: Tv(t, e, n), type: r }, i = t.trim();
  return i && (o.label = i), r === "dateRange" ? o.default = "last 7 days" : r === "granularity" && (o.default = "day"), o;
}
const Vr = ut.options, po = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Ev(e, t = "None") {
  const n = ul(e, t);
  return n === Ht ? "Auto" : po[n] ?? n;
}
const zr = "__none__";
function dl({
  value: e,
  onChange: t,
  options: n,
  allowAuto: r,
  autoHint: o,
  allowNone: i,
  noneLabel: a = "None",
  placeholder: s = "Group dates by…",
  disabled: c,
  id: u,
  className: d
}) {
  const m = n && n.length > 0 ? n : Vr, g = e && e !== Ht && !m.includes(e) ? [...m, e].sort(
    (p, h) => Vr.indexOf(p) - Vr.indexOf(h)
  ) : m, f = o ? `Auto (${po[o]})` : "Auto";
  return /* @__PURE__ */ b(
    Te,
    {
      value: e ?? (i ? zr : ""),
      onValueChange: (p) => t(p === zr ? void 0 : p),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Ee, { id: u, className: d, children: /* @__PURE__ */ l(De, { placeholder: s }) }),
        /* @__PURE__ */ b(Le, { children: [
          i ? /* @__PURE__ */ l(Ce, { value: zr, children: a }) : null,
          r ? /* @__PURE__ */ l(Ce, { value: Ht, children: f }) : null,
          g.map((p) => /* @__PURE__ */ l(Ce, { value: p, children: po[p] }, p))
        ] })
      ]
    }
  );
}
function yr(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Lv(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Vv(e) {
  return ho(e, "category");
}
function ho(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function Xe(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function br(e) {
  return e ? e.cubes.filter((t) => Xe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: yr(t),
    joinTargets: Lv(t),
    category: Vv(t),
    path: ho(t, "path"),
    grain: ho(t, "grain")
  })) : [];
}
function zv(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function ct(e, t) {
  if (!(!e || !t))
    return br(e).find((n) => n.name === t);
}
function ui(e) {
  return e.shortTitle || e.title || e.name;
}
function Pe(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function ml(e) {
  return Pe(e.meta, "group");
}
function Hv(e) {
  return Pe(e.meta, "geoPoint");
}
function ma(e) {
  const t = Pe(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Gv(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function Dn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function fl(e, t) {
  if (t)
    return Ft(e, "time", t).find(Dn);
}
function jv(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const i = ml(o), a = i ? `g:${i.toLowerCase()}` : `f:${t(o)}`;
    let s = r.get(a);
    s || (s = { label: i ?? t(o), items: [] }, r.set(a, s), n.push(a)), s.items.push(o);
  }
  return n.map((o) => [r.get(o).label, r.get(o).items]);
}
function Jn(e) {
  const t = Pe(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function Bv(e) {
  switch (e) {
    case "flow":
      return "total";
    case "gauge":
      return "avg";
    case "counter":
      return "max";
    case "stat":
      return "avg";
    default:
      return;
  }
}
function di(e) {
  return Pe(e.meta, "agg");
}
function Zn(e) {
  const t = Pe(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function qv(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = Bv(Jn(e));
  return t !== void 0 && di(e) === t;
}
function Wv(e) {
  return Pe(e.meta, "familyHint");
}
function Uv(e) {
  return Pe(e.meta, "soloHint");
}
function er(e) {
  return Pe(e.meta, "familyTitle");
}
function Kv(e, t) {
  if (Zn(t))
    return gl(e, t).map(er).find((n) => n !== void 0);
}
function mi(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function Yv(e) {
  return `each ${mi(e)}`;
}
function gl(e, t) {
  const n = Zn(t);
  if (!n) return [t];
  const r = [
    ...Ft(e, "measure", t.cube),
    ...Ft(e, "numberDimension", t.cube)
  ], o = /* @__PURE__ */ new Set(), i = [];
  for (const a of r)
    Zn(a) !== n || o.has(a.name) || (o.add(a.name), i.push(a));
  return i.length > 0 ? i : [t];
}
function Qv(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = Zn(r.option);
    if (!o) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(o);
    i || (i = { familyKey: o, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(o, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const o = r.variants.find((s) => er(s.option)), i = r.variants.findIndex((s) => qv(s.option)), a = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : a >= 0 ? a : 0, r.label = er((o == null ? void 0 : o.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function fi(e, t) {
  switch (e.type) {
    case "time":
      return "date";
    case "boolean":
      return "yes/no";
    case "geoPoint":
      return "map";
    case "segment":
      return "filter";
    case "number": {
      if (e.quantity === "time") return "time";
      const n = (t == null ? void 0 : t(e.unit)) ?? e.unit;
      return !n || n === "count" ? "#" : n;
    }
    default:
      return "text";
  }
}
function pl(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ui(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Pe(n, "quantity"),
    unit: Pe(n, "unit")
  };
}
function En(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ui(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Pe(n, "quantity"),
    unit: Pe(n, "unit")
  };
}
function hl(e, t) {
  return {
    name: e.name,
    label: ui(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Xv(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e.dimensions) {
    const i = o.meta, a = Hv({ meta: i });
    !a || !Xe(o) || n.set(a, [...n.get(a) ?? [], o]);
  }
  const r = [];
  for (const [o, i] of n) {
    const a = i.filter(
      (c) => c.type === "number" && ma({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && ma({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || a.length !== 1 || s.length !== 1 || r.push({
      name: Gv(a[0].name, s[0].name),
      label: o,
      title: o,
      shortTitle: o,
      type: "geoPoint",
      memberType: "dimension",
      cube: e.name,
      connectedComponent: t,
      latMember: a[0].name,
      lngMember: s[0].name
    });
  }
  return r;
}
function fa(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function Ft(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const o of e.cubes) {
    if (!Xe(o) || n && o.name !== n) continue;
    const i = yr(o), a = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Xv(o, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of o.measures)
        Xe(s) && a(pl(s, o.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of o.dimensions)
        Xe(s) && s.type !== "time" && !fa(s) && a(En(s, o.name));
    if (t === "time")
      for (const s of o.dimensions)
        Xe(s) && s.type === "time" && a(En(s, o.name));
    if (t === "numberDimension")
      for (const s of o.dimensions)
        Xe(s) && s.type === "number" && !fa(s) && a(En(s, o.name));
  }
  return r;
}
function Jv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const o of e.cubes) {
    if (!Xe(o) || n && !n.has(o.name)) continue;
    const i = yr(o);
    for (const a of o.segments) {
      if (!Xe(a)) continue;
      const s = hl(a, o.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function $e(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = yr(n), o = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? o(pl(i, n.name)) : o(En(i, n.name)) : void 0;
      const a = n.segments.find((s) => s.name === t);
      if (a) return o(hl(a, n.name));
    }
    return Ft(e, "geoPoint").find((n) => n.name === t);
  }
}
function ga(e) {
  const t = ["set", "notSet"];
  switch (e) {
    case "string":
      return [
        "equals",
        "notEquals",
        "contains",
        "notContains",
        "startsWith",
        "endsWith",
        ...t
      ];
    case "number":
      return ["equals", "notEquals", "gt", "gte", "lt", "lte", ...t];
    case "boolean":
      return ["equals", "notEquals", ...t];
    case "time":
      return [
        "inDateRange",
        "notInDateRange",
        "beforeDate",
        "beforeOrOnDate",
        "afterDate",
        "afterOrOnDate",
        ...t
      ];
    default:
      return ["equals", "notEquals", ...t];
  }
}
const vo = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), vl = {
  equals: "equals",
  notEquals: "does not equal",
  gt: "greater than",
  gte: "greater than or equal",
  lt: "less than",
  lte: "less than or equal",
  contains: "contains",
  notContains: "does not contain",
  startsWith: "starts with",
  endsWith: "ends with",
  set: "is set",
  notSet: "is not set",
  inDateRange: "in date range",
  notInDateRange: "not in date range",
  beforeDate: "before",
  beforeOrOnDate: "before or on",
  afterDate: "after",
  afterOrOnDate: "after or on",
  measureFilter: "measure filter"
};
function Zv(e) {
  return e === "number";
}
function Ue(e) {
  return e.target !== void 0;
}
function ke(e, t) {
  return e.kinds.includes(t);
}
function gi(e, t, n) {
  if (!ke(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function At(e) {
  return e.chart.familyOptions ?? {};
}
function pi(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function yl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function ey(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function ty(e, t, n) {
  var a, s;
  const r = e.chart;
  if (pi(r)) return;
  const o = Nn(r), i = new Set(n ?? []);
  o && i.add(o);
  for (const c of t)
    if (((a = c.target) == null ? void 0 : a.kind) === "option") {
      const u = At(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Qt(e, t, n) {
  var s;
  const r = {}, o = e.chart, i = At(e), a = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!Ue(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const d = Nn(o);
        r[c.id] = d ? [d] : [];
        break;
      }
      case "measures": {
        const d = yl(o), m = d.length ? d : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = a(c, m);
        break;
      }
      case "pivot": {
        const d = pi(o) ?? ty(e, t, n);
        r[c.id] = d ? [d] : [];
        break;
      }
      case "option": {
        const d = i[u.key];
        r[c.id] = typeof d == "string" && d ? [d] : [];
        break;
      }
      case "optionList": {
        const d = Array.isArray(i[u.key]) ? i[u.key] : [];
        r[c.id] = d.map((m) => m && typeof m == "object" ? m.member : void 0).filter((m) => typeof m == "string");
        break;
      }
    }
  }
  return r;
}
function hi(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function vi(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function ny(e, t) {
  return { ...e, dimensions: hi(e.dimensions, t) };
}
function bl(e, t) {
  const n = vi(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function wl(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function xw(e) {
  return e === void 0 ? uy : oi(e);
}
const ry = "last 30 days";
function Zt(e, t, n, r) {
  if (Zv(n)) return { ...e, measures: hi(e.measures, t) };
  if (n === "time") {
    const o = _n(e) ?? r;
    return wl(e, {
      dimension: t,
      granularity: (o == null ? void 0 : o.granularity) ?? Ht,
      dateRange: o ? o.dateRange : ry
    });
  }
  return ny(e, t);
}
function rn(e, t, n, r) {
  const o = e.query ?? {}, i = Qt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return o;
  const a = _n(o);
  if ((a == null ? void 0 : a.dimension) === n) return wl(o, void 0);
  if ((o.measures ?? []).includes(n)) {
    const s = vi(o.measures, n);
    return { ...o, measures: s.length ? s : void 0 };
  }
  return bl(o, n);
}
function oy(e, t, n, r) {
  if (!e) return;
  const o = {};
  for (const a of t) {
    const s = r[a];
    s && Object.keys(s).length > 0 && (o[a] = s);
  }
  const i = Object.keys(o).length > 0;
  if (n && t.length > 0) {
    const a = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...i ? { meta: o } : {} } : { mode: "pivot", value: t[0], pivot: n, ...i ? { meta: o } : {} };
    return { category: { member: e }, series: a };
  }
  return { category: { member: e }, series: kl(t, r) };
}
function mn(e, t, n) {
  var c, u;
  const r = Qt(e, t, n), o = (d) => t.find((m) => {
    var g;
    return ((g = m.target) == null ? void 0 : g.kind) === d;
  }), i = o("category"), a = o("measures"), s = o("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : Nn(e.chart),
    measures: a ? r[a.id] ?? [] : yl(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : pi(e.chart)
  };
}
function fn(e, t, n) {
  const r = { ...Sl(e.chart), ...ey(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: oy(n.category, n.measures, n.pivot, r)
    }
  };
}
function tr(e, t, n) {
  const r = { ...At(e), ...n };
  for (const [o, i] of Object.entries(n)) i === void 0 && delete r[o];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function yi(e, t, n, r, o) {
  const i = t.find((u) => u.id === n);
  if (!i || !Ue(i)) return e;
  const a = i.target, s = Qt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (a.kind) {
    case "category": {
      const u = s[0], d = _n(c);
      u && u !== r && (c = rn(e, t, u, n)), c = Zt(c, r, o, d);
      const m = mn({ ...e, query: c }, t, [r]);
      return fn(e, c, { ...m, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : hi(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = rn(e, t, s[0], n)), c = Zt(c, r, o);
      const d = mn({ ...e, query: c }, t, [r]);
      return fn(e, c, { ...d, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = rn(e, t, u, n)), c = Zt(c, r, o);
      const d = mn({ ...e, query: c }, t, [r]);
      return fn(e, c, { ...d, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = rn(e, t, u, n)), c = Zt(c, r, o), tr(e, c, { [a.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(At(e)[a.key]) ? [...At(e)[a.key]] : [];
      return u.some((d) => (d == null ? void 0 : d.member) === r) || u.push({ member: r }), c = Zt(c, r, o), tr(e, c, { [a.key]: u });
    }
  }
}
function iy(e, t, n, r) {
  const o = t.find((s) => s.id === n);
  if (!o || !Ue(o)) return e;
  const i = o.target, a = rn(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: a, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = mn(e, t), c = vi(s.measures, r), u = c.length ? s.pivot : void 0, d = c.length || !s.pivot ? a : bl(a, s.pivot);
      return fn(e, d, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = mn(e, t);
      return fn(e, a, { ...s, pivot: void 0 });
    }
    case "option":
      return tr(e, a, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(At(e)[i.key]) ? At(e)[i.key] : [];
      return tr(e, a, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function ay(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = _n(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function sy(e, t) {
  if (ke(t, e)) return e;
  if (e === "category" && ke(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && ke(t, "category") || e === "time" && ke(t, "category")) return "category";
}
function ly(e, t, n) {
  const r = Qt(e, t), o = /* @__PURE__ */ new Map();
  for (const a of t) {
    if (!a.channel) continue;
    const s = r[a.id] ?? [];
    s.length && o.set(a.channel, [...o.get(a.channel) ?? [], ...s]);
  }
  let i = {
    ...e,
    chart: { ...e.chart, mapping: void 0, familyOptions: void 0 }
  };
  for (const a of n) {
    if (!Ue(a) || !a.channel) continue;
    const s = o.get(a.channel);
    if (!(s != null && s.length)) continue;
    const c = a.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const d = sy(ay(e, u), a);
      d && (i = yi(i, n, a.id, u, d));
    }
  }
  return i;
}
function cy(e, t) {
  const n = [...t];
  let r = 0;
  for (const o of e) {
    if (!Ue(o)) continue;
    const i = n.findIndex((a) => ke(o, a));
    i >= 0 ? (n.splice(i, 1), r += o.optional ? 1 : 3) : o.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Tt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Cl(e) {
  var a, s, c, u, d;
  const t = e.query ?? {}, n = (a = t.measures) == null ? void 0 : a.find(Boolean);
  if (n) return Tt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Tt(r);
  const o = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (o) return Tt(o);
  const i = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return Tt(i);
}
function yo(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Sl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Nn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function _n(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function kl(e, t) {
  const n = {};
  for (const o of e) {
    const i = t[o];
    i && Object.keys(i).length > 0 && (n[o] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const uy = "day";
function bo(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function dy(e, t, n) {
  const r = n.require(e.chart.family), o = n.require(t), i = bo(r) && bo(o) ? ly(e, r.wells, o.wells) : my(e, o);
  return { ...i, chart: { ...i.chart, family: t } };
}
function my(e, t) {
  var f;
  const { chart: n } = e, r = e.query ?? {}, o = yo(n).length ? yo(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((p) => p.dimension), a = Nn(n) ?? ((f = r.dimensions) == null ? void 0 : f[0]) ?? i[0], s = [a, ...r.dimensions ?? [], ...i].filter(
    (p, h, y) => !!p && y.indexOf(p) === h
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!bo(t)) {
    const p = a ? { category: { member: a }, series: { mode: "measures", members: o } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: p } } : c;
  }
  const u = [...o], d = [...s], m = (p) => i.includes(p) ? "time" : "category";
  let g = c;
  for (const p of t.wells) {
    if (!p.target || !p.channel) continue;
    const h = ke(p, "category") ? [
      [d, m],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [d, m]
    ];
    let y = 0;
    for (const [C, S] of h)
      for (let A = 0; A < C.length; ) {
        if (p.cardinality === "one" && y > 0 || !ke(p, S(C[A]))) {
          A += 1;
          continue;
        }
        g = yi(g, t.wells, p.id, C[A], S(C[A])), C.splice(A, 1), y += 1;
      }
  }
  return g;
}
function Rl(e) {
  return Dp(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Nl(e) {
  return Lp(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function fy(e, t) {
  return t.require(e).wells;
}
function gn(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Qt(e, n.wells), o = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return o ? { ...r, ...o } : r;
}
function It(e, t, n, r, o, i) {
  const a = i.require(t);
  if (a.placeField) return a.placeField(e, n, r, o);
  const s = yi(e, a.wells, n, r, o);
  return gy(e, s, a.wells);
}
function _l(e, t, n, r, o) {
  const i = o.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const a = iy(e, i.wells, n, r);
  return xl(e, a, i.wells);
}
function gy(e, t, n) {
  return py(e, xl(e, t, n));
}
function py(e, t) {
  var s, c;
  const n = ((s = e.query) == null ? void 0 : s.timeDimensions) ?? [], r = ((c = t.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (n.length !== 1 || r.length !== 1) return t;
  const [o] = n, [i] = r;
  if (o.dimension === i.dimension || i.dateRange !== void 0 || o.dateRange === void 0) return t;
  const a = {
    ...i,
    granularity: o.granularity ?? i.granularity,
    dateRange: o.dateRange
  };
  return { ...t, query: { ...t.query ?? {}, timeDimensions: [a] } };
}
function xl(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const o = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(o.map((d) => d.dimension)), a = new Set(Object.values(Qt(t, n)).flat()), s = r.filter((d) => !i.has(d.dimension) && a.has(d.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...o, ...s] } };
}
function Ml({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: O("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ b(w.Fragment, { children: [
    n.divider ? /* @__PURE__ */ l("span", { className: "cv-picker-aggseg-divider", "aria-hidden": !0 }) : null,
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": n.selected,
        disabled: n.disabled,
        title: n.title ?? `Aggregation: ${n.label}`,
        onClick: n.onSelect,
        className: O("cv-picker-aggseg-opt", n.selected && "cv-picker-aggseg-opt--on"),
        children: n.label
      }
    )
  ] }, n.label)) });
}
function Fl(e, t) {
  var o;
  const n = (o = e.meta) == null ? void 0 : o.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = di(e) ?? "";
  return r === "value" ? Yv(t == null ? void 0 : t.grain) : r === "max" && Jn(e) === "counter" ? "latest" : r;
}
function bi(e) {
  return di(e) === "value";
}
function wi(e) {
  return `Plots each ${mi(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function hy(e, t, n) {
  if (bi(n)) return wi(t);
  switch (Jn(n) ?? e.map(Jn).find(Boolean)) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const o = mi(t == null ? void 0 : t.grain);
      return `Describes one ${o} at a time — the average across ${o}s is usually right.`;
    }
    case "part":
      return e.map(Wv).find(Boolean);
    default:
      return;
  }
}
function wo({ option: e }) {
  const t = hr();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: fi(e, t) });
}
function Al({
  cube: e,
  cubes: t,
  kind: n,
  value: r,
  onChange: o,
  placeholder: i = "Select member…",
  disabled: a,
  id: s,
  className: c
}) {
  const { meta: u, isLoading: d } = bt(), m = w.useMemo(() => {
    if (t) {
      const h = new Set(t);
      return Ft(u, n).filter((y) => h.has(y.cube));
    }
    return Ft(u, n, e);
  }, [u, n, e, t]), g = w.useMemo(() => {
    const h = vy(m), y = h.length > 1, C = [];
    for (const [S, A] of h)
      for (const [k, N] of jv(A, () => "Other")) {
        const $ = y ? k === "Other" ? S : `${S} · ${k}` : k;
        C.push({ key: `${S}:${k}`, label: $, items: N });
      }
    return C;
  }, [m]), f = g.length > 1, p = m.find((h) => h.name === r);
  return /* @__PURE__ */ b(Te, { value: r, onValueChange: o, disabled: a || d, children: [
    /* @__PURE__ */ l(Ee, { id: s, className: c, children: /* @__PURE__ */ l(De, { placeholder: d ? "Loading…" : i, children: p ? /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(wo, { option: p }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Le, { children: g.map((h) => /* @__PURE__ */ b(uo, { children: [
      f && h.label ? /* @__PURE__ */ l(mo, { children: h.label }) : null,
      h.items.map((y) => /* @__PURE__ */ l(Ce, { value: y.name, children: /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(wo, { option: y }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: y.label })
      ] }) }, y.name))
    ] }, h.key)) })
  ] });
}
function vy(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Vt({
  options: e,
  value: t,
  onChange: n,
  fullWidth: r = !0,
  size: o = "default",
  disabled: i,
  "aria-label": a,
  className: s
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": a,
      className: O("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ b(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: O(
              "cv-segmented-option",
              o === "sm" && "cv-segmented-option--sm",
              r && "cv-segmented-option--full",
              u && "cv-segmented-option--selected"
            ),
            children: [
              c.icon,
              c.label
            ]
          },
          c.value
        );
      })
    }
  );
}
function pa(e) {
  return e.reason === void 0;
}
function $l(e, t, n, r, o) {
  const i = gi(e, t, [...n]);
  return i ? yy(i, e, r) : o == null ? void 0 : o(r);
}
function yy(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function by(e, t, n) {
  if (t !== void 0 && Rl(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Nl(e)}`;
}
const Ci = "cube-viz:field-picker:only-compatible";
function Ol() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Pl() {
  var e;
  try {
    return ((e = Ol()) == null ? void 0 : e.getItem(Ci)) !== "0";
  } catch {
    return !0;
  }
}
function wy(e) {
  try {
    const t = Ol();
    if (!t) return;
    t.setItem(Ci, e ? "1" : "0");
  } catch {
  }
}
let Co = Pl();
const Ln = /* @__PURE__ */ new Set();
let Dt;
function Cy() {
  for (const e of [...Ln]) e();
}
function Il(e) {
  e !== Co && (Co = e, Cy());
}
function Sy() {
  if (Dt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Ci || Il(Pl());
  };
  e.addEventListener("storage", t), Dt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const On = {
  get: () => Co,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    wy(e), Il(e);
  },
  subscribe: (e) => (Ln.add(e), Sy(), () => {
    Ln.delete(e), Ln.size === 0 && (Dt == null || Dt(), Dt = void 0);
  })
}, ky = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Oc, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(Mi, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(Mi, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Ha, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l($c, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, ha = ["geoPoint", "number", "numberDimension", "category", "time"];
function Si({
  well: e,
  placed: t,
  inWell: n,
  scope: r,
  blockReason: o,
  onSelect: i,
  align: a = "start",
  side: s = "bottom",
  children: c
}) {
  var pe, ve;
  const { meta: u, isLoading: d } = bt(), [m, g] = w.useState(!1), [f, p] = w.useState(""), h = w.useSyncExternalStore(
    On.subscribe,
    On.get,
    On.getServer
  ), y = On.set, C = w.useId(), [S, A] = w.useState(r.viewLocked ?? "tables"), [k, N] = w.useState({}), [$, _] = w.useState({});
  w.useEffect(() => {
    m && A(r.viewLocked ?? "tables");
  }, [m, r.viewLocked]);
  const D = w.useMemo(() => new Set(t), [t]), E = f.trim().toLowerCase(), M = hr(), P = w.useMemo(() => {
    if (S !== "tables") {
      const F = r.views.find((G) => G.name === S) ?? ct(u, S);
      return F ? [{ cube: F, tag: "dataset" }] : [];
    }
    const H = [];
    r.sourceCube && H.push({ cube: r.sourceCube, tag: "source" });
    const le = r.relatedCubes.some((F) => F.path ?? F.category) ? "More tables" : "Related tables", I = (F) => F.path ? zv(F.path) : F.category, x = /* @__PURE__ */ new Map();
    for (const F of r.relatedCubes) {
      const G = I(F);
      G !== void 0 && !x.has(G) && x.set(G, x.size);
    }
    const R = [...r.relatedCubes].sort((F, G) => {
      const j = I(F), Q = I(G);
      return j === Q ? 0 : j === void 0 ? 1 : Q === void 0 ? -1 : (x.get(j) ?? 0) - (x.get(Q) ?? 0);
    });
    for (const F of R) H.push({ cube: F, tag: "related", heading: I(F) ?? le });
    return H;
  }, [S, r, u]), V = [
    ...ha.filter((H) => ke(e, H)),
    ...ha.filter((H) => !ke(e, H))
  ], T = (H) => {
    const ne = [], le = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Set();
    for (const x of V) {
      const R = ky[x], F = gi(e, x, n ?? []);
      let G = Ft(u, R.metaKind, H);
      x === "time" && (G = [...G].sort(
        (j, Q) => Number(Dn(Q)) - Number(Dn(j))
      ));
      for (const j of G) {
        if (D.has(j.name) || I.has(j.name)) continue;
        const Q = er(j) ?? Kv(u, j);
        if (E && !(j.label.toLowerCase().includes(E) || j.name.toLowerCase().includes(E) || ((Q == null ? void 0 : Q.toLowerCase().includes(E)) ?? !1)))
          continue;
        I.add(j.name);
        const Z = ml(j), B = Z ? `g:${Z.toLowerCase()}` : `k:${R.label}`;
        let W = le.get(B);
        W || (W = {
          key: B,
          label: Z ?? R.label,
          headerIcon: Z ? void 0 : R.icon,
          rejected: F !== void 0,
          items: []
        }, le.set(B, W), ne.push(B)), F === void 0 && (W.rejected = !1), W.items.push({
          option: j,
          kind: x,
          reason: $l(e, x, n ?? [], j, o)
        });
      }
    }
    return ne.map((x) => le.get(x));
  }, U = P.map((H) => ({ section: H, groups: T(H.cube.name) })).filter((H) => H.groups.length > 0), z = h ? U.reduce(
    (H, ne) => H + ne.groups.reduce((le, I) => le + I.items.filter((x) => !pa(x)).length, 0),
    0
  ) : 0, L = h ? U.map((H) => ({
    section: H.section,
    groups: H.groups.map((ne) => ({ ...ne, rejected: !1, items: ne.items.filter(pa) })).filter((ne) => ne.items.length > 0)
  })).filter((H) => H.groups.length > 0) : U, X = L.length > 0, te = !X && z > 0, re = (H, ne) => {
    i(H, ne), g(!1), p("");
  }, ce = S === "tables" ? "All related tables" : ((pe = r.views.find((H) => H.name === S)) == null ? void 0 : pe.title) ?? ((ve = ct(u, S)) == null ? void 0 : ve.title) ?? S, me = r.viewLocked ? r.views.filter((H) => H.name === r.viewLocked) : [], ue = h ? z > 0 ? `Only compatible fields — ${z} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ b(He, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: c }),
    /* @__PURE__ */ b(je, { align: a, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ b("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ b("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Ta, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: C,
              "aria-label": "Search fields",
              value: f,
              onChange: (H) => p(H.target.value),
              placeholder: d ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ b(
          "button",
          {
            type: "button",
            "aria-pressed": h,
            "aria-label": ue,
            title: ue,
            onClick: () => y(!h),
            className: O("cv-picker-compat", h && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(Ac, { className: "cv-ec-icon" }),
              h && z > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: z }) : null
            ]
          }
        ),
        me.length > 0 ? /* @__PURE__ */ l(
          Ry,
          {
            browse: S,
            label: ce,
            views: me,
            onBrowse: A
          }
        ) : null
      ] }),
      S === "tables" && r.sourceCube ? /* @__PURE__ */ b("div", { className: "cv-picker-anchor", children: [
        "Reading from ",
        /* @__PURE__ */ l("strong", { children: r.sourceCube.title }),
        r.sourceCube.grain ? ` (${r.sourceCube.grain})` : "",
        " · joined tables included"
      ] }) : null,
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: X ? L.map(({ section: H, groups: ne }, le) => {
        const I = ne.reduce((Q, Z) => Q + Z.items.length, 0), x = H.tag === "related", R = k[H.cube.name] ?? x, F = E.length > 0 ? !0 : !R, G = le > 0 ? L[le - 1].section : void 0, j = H.tag === "related" && H.heading !== void 0 && ((G == null ? void 0 : G.tag) !== "related" || G.heading !== H.heading);
        return /* @__PURE__ */ b("div", { children: [
          j ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: H.heading }) : null,
          /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => N((Q) => ({ ...Q, [H.cube.name]: !R })),
              className: "cv-picker-table",
              children: [
                F ? /* @__PURE__ */ l(ht, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(Sn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(La, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: H.cube.title }),
                H.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: H.cube.grain }) : null,
                H.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : H.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: I })
              ]
            }
          ),
          F ? ne.map((Q) => /* @__PURE__ */ b(
            "div",
            {
              className: O(
                "cv-picker-group",
                Q.rejected && "cv-picker-group--rejected"
              ),
              children: [
                ne.length > 1 ? /* @__PURE__ */ b("div", { className: "cv-picker-group-header", children: [
                  Q.headerIcon,
                  Q.label,
                  Q.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                Qv(Q.items).map((Z) => {
                  const B = Z.familyKey ? $[Z.familyKey] : void 0, W = Z.variants.findIndex((Ie) => Ie.option.name === B), q = W >= 0 ? W : Z.defaultIndex, { option: se, kind: de, reason: Fe } = Z.variants[q], Be = Z.familyKey ? {
                    options: Z.variants.map((Ie, xn) => {
                      const ye = ct(u, Ie.option.cube), Ke = bi(Ie.option);
                      return {
                        label: Fl(Ie.option, ye),
                        selected: xn === q,
                        disabled: Ie.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: Ie.reason ?? (Ke ? wi(ye) : void 0),
                        divider: Ke && xn > 0,
                        onSelect: () => {
                          _((Ye) => ({ ...Ye, [Z.familyKey]: Ie.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Ny,
                    {
                      option: se,
                      label: Z.familyKey ? Z.label : void 0,
                      unitBadge: fi(se, M),
                      badge: de === "time" && Dn(se) ? "default" : void 0,
                      reason: Fe,
                      agg: Be,
                      onPick: () => re(se.name, de)
                    },
                    Z.familyKey ?? se.name
                  );
                })
              ]
            },
            Q.key
          )) : null
        ] }, H.cube.name);
      }) : te ? /* @__PURE__ */ b("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ b("p", { children: [
          z,
          " ",
          E ? "matching " : "",
          "field",
          z === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          z === 1 ? "it" : "them",
          "."
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "cv-picker-show-all",
            onClick: () => y(!1),
            children: "Show all fields"
          }
        )
      ] }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: d ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Ry({ browse: e, label: t, views: n, onBrowse: r }) {
  const [o, i] = w.useState(!1), a = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ b(He, { open: o, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ge,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(Va, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ b(je, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(va, { active: e === "tables", icon: /* @__PURE__ */ l(La, { className: "cv-ec-icon" }), onClick: () => a("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ b(he, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          va,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(za, { className: "cv-ec-icon" }),
            onClick: () => a(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function va({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ b(
    "button",
    {
      type: "button",
      onClick: n,
      className: O(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Ut, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Ny({ option: e, label: t, reason: n, onPick: r, unitBadge: o, badge: i, agg: a }) {
  const s = o ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: o }) : null, c = t ?? e.label, u = a ? /* @__PURE__ */ l(Ml, { options: a.options }) : null, d = n ? /* @__PURE__ */ b(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: n,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ b("span", { className: "cv-picker-row-main", children: [
          s,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: c })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: n })
      ]
    }
  ) : /* @__PURE__ */ b(
    "button",
    {
      type: "button",
      onClick: r,
      title: e.description ? `${c} — ${e.description}` : c,
      className: "cv-picker-row",
      children: [
        s,
        /* @__PURE__ */ l("span", { className: "cv-picker-row-label", children: c }),
        i ? /* @__PURE__ */ l("span", { className: "cv-picker-badge", children: i }) : null
      ]
    }
  );
  return u ? /* @__PURE__ */ b("span", { className: "cv-picker-rowwrap", children: [
    d,
    u
  ] }) : d;
}
const _y = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], on = "yyyy-MM-dd";
function xy(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ya(e) {
  if (!e) return;
  const t = Oa(e, on, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function ki({ value: e, onChange: t }) {
  const [n, r] = w.useState(!1), o = typeof e == "string", [i, a] = xy(e), s = ya(i), c = ya(a), u = s ? { from: s, to: c } : void 0, d = o ? e : s && c ? `${we(s, "MMM d, yyyy")} – ${we(c, "MMM d, yyyy")}` : s ? we(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ b(He, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(J, { variant: "outline", size: "sm", className: O("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Ea, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: O("cv-daterange-label", d === "Any time" && "cv-daterange-label--placeholder"), children: d })
    ] }) }),
    /* @__PURE__ */ b(je, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ b("div", { className: "cv-daterange-presets", children: [
        _y.map((m) => /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "sm",
            className: O("cv-daterange-preset", e === m && "cv-daterange-preset--active"),
            onClick: () => {
              t(m), r(!1);
            },
            children: m
          },
          m
        )),
        /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-daterange-preset cv-daterange-preset--muted",
            onClick: () => {
              t(void 0), r(!1);
            },
            children: "Any time"
          }
        )
      ] }),
      /* @__PURE__ */ l(
        Ks,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (m) => {
            m != null && m.from && m.to ? t([we(m.from, on), we(m.to, on)]) : m != null && m.from ? t([we(m.from, on), we(m.from, on)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Tl = w.createContext({});
function My({
  createVariable: e,
  children: t
}) {
  const n = w.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Tl.Provider, { value: n, children: t });
}
function Fy() {
  return w.useContext(Tl);
}
function Ay({ kind: e, value: t, onChange: n, className: r }) {
  const o = Rn(), i = (o == null ? void 0 : o.decls) ?? [], { createVariable: a } = Fy(), [s, c] = w.useState(!1), [u, d] = w.useState(!1), [m, g] = w.useState(""), f = w.useMemo(() => Pv(i, e), [i, e]), p = f.find((C) => C.name === t), h = (C) => {
    n(C), c(!1), d(!1);
  }, y = () => {
    if (!a) return;
    const C = Dv(e, m || "Variable", i);
    a(C), h(C.name), g("");
  };
  return /* @__PURE__ */ b(
    He,
    {
      open: s,
      onOpenChange: (C) => {
        c(C), C || d(!1);
      },
      children: [
        /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(J, { variant: "outline", size: "sm", className: O("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Pc, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: O("cv-var-trigger-label", !p && "cv-var-trigger-label--placeholder"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ b(je, { align: "start", className: "cv-var-popover", children: [
          f.length > 0 ? f.map((C) => /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => h(C.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: C.label ?? C.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: C.type }),
                C.name === t ? /* @__PURE__ */ l(Ut, { className: "cv-ec-icon" }) : null
              ]
            },
            C.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          a ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ b("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              be,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: m,
                onChange: (C) => g(C.target.value),
                onKeyDown: (C) => {
                  C.key === "Enter" && y(), C.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(J, { size: "sm", className: "cv-var-new-add", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(zt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function Wt({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: o
}) {
  const i = _e(t), [a, s] = w.useState(i ? "var" : "fixed");
  w.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => O("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ b("div", { className: "cv-bind", ...o ? { role: "group", "aria-labelledby": o } : {}, children: [
    /* @__PURE__ */ b("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(a === "fixed"),
          onClick: () => {
            s("fixed"), _e(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(a === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    a === "var" ? /* @__PURE__ */ l(
      Ay,
      {
        kind: e,
        value: _e(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(_e(t) ? void 0 : t, (u) => n(u))
  ] });
}
const $y = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Hr(e) {
  return "member" in e && "operator" in e;
}
function Oy({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: o,
  disabled: i,
  className: a
}) {
  var M;
  const { meta: s } = bt(), c = ((M = Rn()) == null ? void 0 : M.decls) ?? [], [u, d] = w.useState(null), [m, g] = w.useState(null), f = r ?? [], p = f.length === 1 && !Hr(f[0]) && "or" in f[0] && Array.isArray(f[0].or) && f[0].or.every(Hr) ? f[0] : void 0, h = p ? "any" : "all", y = [], C = [];
  p || f.forEach((P) => Hr(P) ? y.push(P) : C.push(P));
  const S = p ? p.or : y, A = C.length === 0 && (S.length >= 2 || h === "any"), k = (P) => h === "any" ? P.length ? [{ or: P }] : [] : [...P, ...C], N = (P) => {
    const V = P.filter((U) => U.member.length > 0), T = k(V);
    o(T.length > 0 ? T : void 0);
  }, $ = (P) => {
    const V = P === "any" ? S.length ? [{ or: S }] : [] : [...S];
    o(V.length > 0 ? V : void 0);
  }, _ = (P, V) => N(S.map((T, U) => U === P ? { ...T, ...V } : T)), D = (P) => N(S.filter((V, T) => T !== P)), E = (P) => {
    const T = { ...m ?? { member: "", operator: "equals", values: [] }, ...P };
    T.member ? (g(null), d(S.length), N([...S, T])) : g(T);
  };
  return /* @__PURE__ */ b("div", { "data-slot": "filter-builder", className: O("cv-filter-builder", a), children: [
    S.length === 0 && !m ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    A ? /* @__PURE__ */ b("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Vt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: h,
          onChange: $
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    S.map((P, V) => {
      const T = $e(s, P.member);
      return u === V ? /* @__PURE__ */ l(
        ba,
        {
          leaf: P,
          member: T,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (U) => _(V, U),
          onDone: () => d(null),
          onRemove: () => D(V)
        },
        V
      ) : /* @__PURE__ */ l(
        Py,
        {
          text: Iy(P, T == null ? void 0 : T.label, c),
          disabled: i,
          onEdit: () => d(V),
          onRemove: () => D(V)
        },
        V
      );
    }),
    m ? /* @__PURE__ */ l(
      ba,
      {
        leaf: m,
        member: $e(s, m.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: E,
        onRemove: () => g(null)
      }
    ) : null,
    C.length > 0 ? /* @__PURE__ */ b("p", { className: "cv-filter-groups-note", children: [
      C.length,
      " grouped filter",
      C.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ b(
      J,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!m,
        onClick: () => {
          d(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(zt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Py({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ b("div", { className: "cv-filter-summary", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: n,
        className: "cv-filter-summary-text",
        title: "Edit filter",
        children: e
      }
    ),
    /* @__PURE__ */ l(
      J,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(Kt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function ba({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: o,
  disabled: i,
  onChange: a,
  onDone: s,
  onRemove: c
}) {
  const { meta: u } = bt(), d = ga(t == null ? void 0 : t.type), m = d.includes(e.operator) ? e.operator : d[0], g = !vo.has(m), f = w.useId(), p = w.useId(), h = w.useId(), y = w.useId(), C = w.useId(), S = w.useId();
  w.useEffect(() => {
    m !== e.operator && a({ operator: m });
  }, [e.operator, a, m]);
  const A = (k) => {
    const N = $e(u, k);
    a({ member: k, operator: ga(N == null ? void 0 : N.type)[0], values: [] });
  };
  return /* @__PURE__ */ b("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ b("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ b("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ b(J, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Ut, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(Kt, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Field" }),
      o ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Si,
          {
            well: $y,
            placed: [],
            scope: o,
            blockReason: () => {
            },
            onSelect: A,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ b(
              "button",
              {
                type: "button",
                id: p,
                disabled: i,
                "aria-labelledby": `${f} ${p}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ b("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(wo, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(ht, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Al,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: A,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ b(
        Te,
        {
          value: m,
          onValueChange: (k) => a({
            operator: k,
            values: vo.has(k) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              Ee,
              {
                id: y,
                "aria-labelledby": `${h} ${y}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(De, {})
              }
            ),
            /* @__PURE__ */ l(Le, { children: d.map((k) => /* @__PURE__ */ l(Ce, { value: k, children: vl[k] }, k)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: C, htmlFor: S, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Ty,
        {
          fieldId: S,
          labelId: C,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (k) => a({ values: k })
        }
      )
    ] }) : null
  ] });
}
function Iy(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const o = vl[e.operator] ?? e.operator;
  if (vo.has(e.operator)) return `${r} ${o}`;
  const i = (e.values ?? []).map((a) => {
    if (_e(a)) {
      const s = n.find((c) => c.name === a.var);
      return `{${((s == null ? void 0 : s.label) ?? a.var).replace(/[{}]/g, "")}}`;
    }
    return String(a);
  });
  return i.length > 0 ? `${r} ${o} ${i.join(", ")}` : `${r} ${o} …`;
}
function Ty({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: o
}) {
  const i = e ?? [], a = i.length === 1 && _e(i[0]);
  if (t === "time") {
    const u = a ? i[0] : Dy(i);
    return /* @__PURE__ */ l(
      Wt,
      {
        labelId: o,
        kind: "dateRange",
        value: u,
        onChange: (d) => n(d === void 0 ? [] : _e(d) ? [d] : Ey(d)),
        renderFixed: (d, m) => /* @__PURE__ */ l(ki, { value: d, onChange: m })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? i[0] : i.filter((u) => !_e(u));
  return /* @__PURE__ */ l(
    Wt,
    {
      labelId: o,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : _e(u) ? [u] : u),
      renderFixed: (u, d) => /* @__PURE__ */ l(
        be,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (m) => d(Ly(m.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Dy(e) {
  const t = e.filter((n) => !_e(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Ey(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Ly(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Vy({ spec: e, update: t, cube: n, scopeCubes: r, scope: o }) {
  const { query: i } = e, a = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ b(He, { children: [
    /* @__PURE__ */ b(
      Ge,
      {
        className: O(
          "cv-filters-trigger",
          a > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Ic, { className: "cv-ec-icon--lg" }),
          "Filter",
          a > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: a }) : null
        ]
      }
    ),
    /* @__PURE__ */ b(je, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ b("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(zy, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Oy, { cube: n, cubes: r, scope: o, value: i.filters, onChange: s })
    ] })
  ] });
}
function zy({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = bt(), o = Jv(r, n);
  if (o.length === 0) return null;
  const i = new Set(e.query.segments ?? []), a = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ b("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: o.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => a(s.name),
        title: s.description ?? s.name,
        className: O(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function Hy(e, t, n, r) {
  var i;
  const o = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...o, ...r } } } });
}
function Gy({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: o
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, a = i.label ?? o ?? "", s = i.label === "", c = w.useId(), u = w.useId(), d = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ b("div", { className: O("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": d },
        value: a,
        placeholder: "No title",
        onChange: (g) => Hy(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function jy({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ b("div", { className: O("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(Tc, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Dc, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Dl = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: O("cv-label", e),
      ...t
    }
  )
);
Dl.displayName = "Label";
function ge({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: o,
  className: i,
  children: a
}) {
  return /* @__PURE__ */ b("div", { "data-slot": "field-row", className: O("cv-field-row", i), children: [
    /* @__PURE__ */ b("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Dl, { htmlFor: r, className: "cv-field-row-label", children: e }),
      o ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: o }) : null
    ] }),
    a,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function So({
  checked: e,
  onChange: t,
  disabled: n,
  id: r,
  "aria-label": o,
  className: i
}) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      role: "switch",
      id: r,
      "aria-checked": e,
      "aria-label": o,
      disabled: n,
      "data-state": e ? "checked" : "unchecked",
      onClick: () => t(!e),
      className: O("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function gt({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: o,
  className: i
}) {
  const a = w.useId();
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "switch-row",
      className: O("cv-switch-row", i),
      children: [
        /* @__PURE__ */ b(
          "label",
          {
            htmlFor: a,
            className: O("cv-switch-row-label", o && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(So, { id: a, checked: n, onChange: r, disabled: o })
      ]
    }
  );
}
const By = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, qy = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function Wy({ spec: e, update: t }) {
  var C, S, A;
  const n = yt(), { chart: r } = e, o = r.family, i = r.familyOptions ?? {}, a = n.require(o);
  if (a.Customize) {
    const k = a.Customize;
    return /* @__PURE__ */ l(k, { spec: e, update: t });
  }
  const s = (k) => t({ ...e, chart: { ...r, ...k } }), c = (k) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...k } } }), u = ((S = (C = r.mapping) == null ? void 0 : C.series) == null ? void 0 : S.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (o === "area" ? u : n.defaults(o).envelope.stackMode) ?? "none", m = d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none", g = ((A = r.transform) == null ? void 0 : A.kind) ?? "none", f = ni(a) ? /* @__PURE__ */ b(he, { children: [
    /* @__PURE__ */ l(
      ge,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ b(
          Te,
          {
            value: g,
            onValueChange: (k) => {
              var N;
              return s({
                transform: k === "none" ? void 0 : k === "rollingAvg" ? { kind: "rollingAvg", window: ((N = r.transform) == null ? void 0 : N.window) ?? Pn } : { kind: k }
              });
            },
            children: [
              /* @__PURE__ */ l(Ee, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(De, {}) }),
              /* @__PURE__ */ l(Le, { children: qy.map((k) => /* @__PURE__ */ l(Ce, { value: k, children: By[k] }, k)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(Ky, { label: "Window (points)", children: (k) => {
      var N;
      return /* @__PURE__ */ l(
        be,
        {
          id: k,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((N = r.transform) == null ? void 0 : N.window) ?? Pn,
          onChange: ($) => {
            const _ = parseInt($.target.value, 10), D = Number.isFinite(_) ? Math.min(90, Math.max(2, _)) : Pn;
            s({ transform: { kind: "rollingAvg", window: D } });
          }
        }
      );
    } }) : null
  ] }) : null, p = /* @__PURE__ */ l(ge, { label: "Line shape", children: /* @__PURE__ */ l(
    Vt,
    {
      "aria-label": "Line shape",
      size: "sm",
      options: [
        { value: "monotone", label: "Smooth" },
        { value: "linear", label: "Straight" },
        { value: "step", label: "Step" },
        { value: "natural", label: "Curved" }
      ],
      value: i.curve ?? "monotone",
      onChange: (k) => c({ curve: k })
    }
  ) }), h = /* @__PURE__ */ l(ge, { label: "Stacked", children: /* @__PURE__ */ l(
    Vt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: m,
      onChange: (k) => s({ stackMode: k })
    }
  ) }), y = (() => {
    var k, N;
    switch (o) {
      case "bar":
        return /* @__PURE__ */ b(he, { children: [
          /* @__PURE__ */ l(
            gt,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: ($) => s({ orientation: $ ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return p;
      case "area":
        return /* @__PURE__ */ b(he, { children: [
          p,
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((N = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : N.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ b(he, { children: [
          /* @__PURE__ */ l(
            gt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: ($) => c({ innerRadiusPct: $ ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ge, { label: "Slice labels", children: /* @__PURE__ */ l(
            Vt,
            {
              "aria-label": "Slice labels",
              size: "sm",
              options: [
                { value: "none", label: "None" },
                { value: "percent", label: "%" },
                { value: "value", label: "Value" },
                { value: "name", label: "Name" }
              ],
              value: i.showLabels ?? "percent",
              onChange: ($) => c({ showLabels: $ })
            }
          ) })
        ] });
      // KPI is configured by its three inline blocks in the config strip (Value /
      // Comparison / Sparkline — see ChartEditOverlay), so the chart-type popover shows
      // no Options for a KPI (no confusing split).
      case "kpi":
        return null;
      // Table and heatmap have NO options. Sorting and a pinned header are what makes a
      // table usable, so they are always on; row density follows the row count, and the
      // heatmap prints in-cell numbers whenever the grid is small enough to read them.
      // Each of those was a switch whose every setting was defensible — which is the
      // definition of a question not worth asking.
      case "table":
      case "heatmap":
        return null;
      case "scatter":
        return null;
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ b("div", { className: "cv-customize", children: [
    y,
    f
  ] });
}
function Uy(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ni(n);
}
function Ky({
  label: e,
  children: t
}) {
  const n = w.useId();
  return /* @__PURE__ */ b("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function El(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function Ll(e, t) {
  const n = [...t], r = [], o = [];
  for (const i of e) {
    if (!Ue(i)) continue;
    const a = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < a; )
      ke(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || o.push(i);
  }
  return { matched: r, missing: o, leftover: n };
}
function Yy(e) {
  let t = 0;
  for (const n of e)
    Ue(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Qy(e, t) {
  return e.some((n) => Ue(n) && n.cardinality === "many" && ke(n, t));
}
const Xy = 0.35, Jy = 0.4, Zy = 0.3, eb = 0.1;
function tb(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Zy : e.supportsCartesianAxes ? eb : e.wells.some(
    (o) => Ue(o) && o.channel === "x" && ke(o, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Vl(e) {
  const t = e.filter(Ue);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function nb(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const rb = (e, t, n) => e === 1 ? t : n;
function ob(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${nb(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const o = n.get("x") ?? [], i = n.get("y") ?? [], a = `${r} ${rb(r, "measure", "measures")}`;
  return Vl(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : o.includes("number") && i.includes("number") ? "One measure against another" : o.includes("time") ? `${a} over time` : o.includes("category") ? n.has("color") ? `${a} by category, split in colours` : `${a} by category` : r === 1 ? "One headline number" : r > 1 ? `${a}, no breakdown` : "Fits your fields";
}
function ib(e, t) {
  const n = El(t), r = n.map((a) => a.kind), o = r.includes("time"), i = [];
  for (const a of e.list()) {
    if (a.queryless) continue;
    const s = a.wells, c = Ll(s, n), u = Yy(s), d = Math.max(0, n.length - c.matched.length), m = cy(s, r) + 0.5 * d, g = u > 0 ? m / u : 0, f = c.leftover.filter(
      (h) => h.kind !== "time" && !Qy(s, h.kind)
    ).length, p = g - Xy * f + tb(a, o) - (Vl(s) ? Jy : 0);
    i.push({
      family: a.family,
      descriptor: a,
      score: Math.round(p * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: ob(a, c)
    });
  }
  return i.sort((a, s) => s.score - a.score || a.descriptor.order - s.descriptor.order);
}
function ab(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function sb(e, t, n) {
  const r = e.require(n), o = Ll(r.wells, El(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const a of o.matched)
    a.members.forEach((s, c) => {
      i = It(i, n, a.well.id, s, a.kinds[c], e);
    });
  return i;
}
function zl(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(dy(e, r, n));
  };
}
function lb({ spec: e, update: t, empty: n }) {
  const r = yt(), o = e.chart.family, i = zl(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ b("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Hl, { spec: e, family: o, onPick: i, families: r })
  ] }) }) : null;
}
function cb({ spec: e, update: t }) {
  const n = yt(), r = e.chart.family, o = zl(e, t, n), i = n.require(r), a = i.icon;
  return /* @__PURE__ */ b(He, { children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(a, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(ht, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ b(je, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(Hl, { spec: e, family: r, onPick: o, families: n }),
      Uy(r, n) ? /* @__PURE__ */ b("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Wy, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Hl({ spec: e, family: t, onPick: n, families: r }) {
  const o = w.useMemo(() => ib(r, e), [r, e]), i = w.useMemo(() => ab(o), [o]), a = w.useMemo(
    () => new Map(o.map((m) => [m.family, m])),
    [o]
  ), s = w.useMemo(
    () => new Set(o.filter((m) => m.fits).map((m) => m.family)),
    [o]
  ), c = fb(e, r, s), u = (m, g) => /* @__PURE__ */ l(
    ub,
    {
      fit: m,
      active: m.family === t,
      preview: c.get(m.family),
      families: r,
      reason: g ? m.reason : void 0,
      onPick: n
    },
    m.family
  ), d = r.list().map(
    (m) => a.get(m.family) ?? {
      family: m.family,
      descriptor: m,
      score: 0,
      fits: !1,
      reason: m.label
    }
  );
  return /* @__PURE__ */ b("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ b("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((m) => u(m, !0)) })
    ] }) : null,
    /* @__PURE__ */ b("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: d.map((m) => u(m, !1)) })
    ] })
  ] });
}
function ub({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: o,
  onPick: i
}) {
  const a = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ b(
    "div",
    {
      className: O("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Sb,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(a, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(a, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ b("span", { className: "cv-type-tile-caption", children: [
          /* @__PURE__ */ l("span", { className: "cv-type-tile-label", children: s }),
          o ? /* @__PURE__ */ l("span", { className: "cv-type-tile-reason", children: o }) : null
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => i(e.family),
            "aria-pressed": t,
            "aria-label": o ? `${s} — ${o}` : s,
            title: e.reason,
            className: "cv-type-tile-hit"
          }
        )
      ]
    }
  );
}
function Gl(e, t) {
  var r, o, i;
  const n = ((r = t.defaults(e.family).familyOptions) == null ? void 0 : r.chrome) !== void 0;
  return {
    ...e,
    legend: { ...e.legend, show: !1 },
    tooltip: { ...e.tooltip, show: !1 },
    axes: {
      x: { ...(o = e.axes) == null ? void 0 : o.x, hide: !0 },
      y: { ...(i = e.axes) == null ? void 0 : i.y, hide: !0 }
    },
    familyOptions: n ? { ...e.familyOptions, chrome: "none" } : e.familyOptions
  };
}
function db(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((o) => o.granularity !== void 0)) ?? !1);
}
const wa = 200, mb = () => () => {
};
function fb(e, t, n) {
  const r = e.query, o = db(r), i = w.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, wa) : wa
    };
  }, [r]), a = Rn(), s = w.useRef(null);
  s.current === null && (s.current = Vs());
  const c = s.current, u = () => a ? c(i, a.store.getAll(), a.decls) : i, d = w.useSyncExternalStore(
    a ? a.store.subscribe : mb,
    u,
    u
  ), { resultSet: m } = Bs(d, { skip: !o });
  return w.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const f of t.list()) {
      const p = f.family;
      if (f.queryless || o && n.has(p) && !m) continue;
      const C = (m && n.has(p) ? gb(e, p, t, m, d) : void 0) ?? Cb(p, t);
      C && g.set(p, C);
    }
    return g;
  }, [e, t, m, d, n, o]);
}
function gb(e, t, n, r, o) {
  try {
    const i = t === e.chart.family ? e : sb(n, e, t), a = Gl(i.chart, n), s = Ts(r, a, i.query ?? o, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(o)}`, data: s, options: a };
  } catch {
    return;
  }
}
const $t = "sample.category", wn = "sample.group", Ne = "sample.value", Ve = "sample.count", jl = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ko = [18, 27, 21, 34, 26, 39], Ro = [12, 9, 17, 14, 22, 16], pb = jl.flatMap((e, t) => [
  { [$t]: e, [wn]: "North", [Ne]: ko[t], [Ve]: Ro[t] },
  {
    [$t]: e,
    [wn]: "South",
    [Ne]: Math.round(ko[t] * 0.62),
    [Ve]: Math.round(Ro[t] * 0.78)
  }
]), hb = {
  measures: [Ne, Ve],
  dimensions: [$t, wn]
}, vb = {
  measures: {
    [Ne]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ve]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [$t]: { title: "Day", shortTitle: "Day", type: "string" },
    [wn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function Bl(e) {
  const t = [
    { key: Ne, label: "Value", data: ko, colorToken: "chart-1" },
    { key: Ve, label: "Count", data: Ro, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: jl,
    series: t,
    raw: { rows: pb, query: hb, annotation: vb },
    empty: !1
  };
}
const yb = Bl(1), bb = Bl(2), an = (e, t) => ({
  family: e,
  mapping: { category: { member: $t }, series: { mode: "measures", members: t } }
}), wb = {
  bar: an("bar", [Ne, Ve]),
  line: an("line", [Ne, Ve]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: an("area", [Ne, Ve]),
  pie: an("pie", [Ne]),
  scatter: { family: "scatter", familyOptions: { x: Ne, y: Ve } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: $t },
      series: { mode: "pivot", value: Ne, pivot: wn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ne, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: $t }, { member: Ne }, { member: Ve }] }
  }
};
function Cb(e, t) {
  const n = wb[e] ?? an(e, [Ne, Ve]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? yb : bb,
    options: Gl(n, t)
  };
}
const Sb = w.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const o = w.useRef(null);
  return w.useEffect(() => {
    const i = o.current;
    if (i)
      for (const a of i.querySelectorAll("[tabindex]")) a.tabIndex = -1;
  }), /* @__PURE__ */ l(kb, { fallback: r, children: /* @__PURE__ */ l("div", { ref: o, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Ps,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class kb extends w.Component {
  constructor(t) {
    super(t), this.state = { failed: !1 };
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function Rb(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Nb(e, t, n, r, o, i) {
  var j, Q, Z, B, W;
  const { chart: a, query: s } = e, c = a.family, u = n.kinds.length === 1 ? n.kinds[0] : _b(o), d = a.familyOptions ?? {}, m = Array.isArray(d.columns) ? d.columns : [], g = Sl(a), f = g[r], p = c === "table" && n.id === "columns", h = c === "bar" || c === "line" || c === "area", y = ((Q = (j = a.mapping) == null ? void 0 : j.series) == null ? void 0 : Q.mode) === "measures", C = h && n.id === "y", S = C && y, A = p ? (Z = m.find((q) => q.member === r)) == null ? void 0 : Z.label : S ? f == null ? void 0 : f.label : void 0, k = S ? f == null ? void 0 : f.colorToken : void 0, N = _n(s), $ = n.kinds.includes("time") && (N == null ? void 0 : N.dimension) === r, _ = $ ? N == null ? void 0 : N.granularity : void 0, D = $ ? N == null ? void 0 : N.dateRange : void 0, E = (c === "line" || c === "area") && n.id === "y" && y, M = E ? f == null ? void 0 : f.dots : void 0, P = (q) => {
    var Be, Ie;
    if ((Be = a.mapping) != null && Be.series && a.mapping.series.mode !== "measures") return;
    const se = ((Ie = a.mapping) != null && Ie.series && a.mapping.series.mode === "measures" ? a.mapping.series.members : s.measures) ?? [], de = { ...g };
    q && Object.keys(q).length > 0 ? de[r] = q : delete de[r];
    const Fe = Nn(a);
    Fe && t({
      ...e,
      chart: {
        ...a,
        mapping: { category: { member: Fe }, series: kl(se, de) }
      }
    });
  }, V = (q) => {
    const se = m.map((de) => de.member === r ? { ...de, ...q } : de);
    t({ ...e, chart: { ...a, familyOptions: { ...d, columns: se } } });
  }, T = (q) => {
    p ? V({ label: q }) : S && P({ ...f, label: q });
  }, U = (q) => {
    S && P({ ...f, colorToken: q ?? void 0 });
  }, z = (q) => {
    if (!N) return;
    const se = { ...N };
    for (const de of Object.keys(q)) {
      const Fe = q[de];
      Fe === void 0 ? delete se[de] : se[de] = Fe;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, L = (q) => z({ granularity: q }), X = (q) => z({ dateRange: q }), te = (q) => {
    S && P({ ...f, dots: q });
  }, re = () => t(_l(e, c, n.id, r, i)), ce = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), me = (B = a.mapping) == null ? void 0 : B.series, ue = (me && me.mode === "pivot" ? me.value : yo(a)[0]) ?? ((W = s.measures) == null ? void 0 : W[0]), pe = ce ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...ue ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...ue ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ve = (() => {
    const q = Rb(s.order)[0];
    if (!q) return "none";
    const [se, de] = q;
    return ue && se === ue ? de === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? de === "desc" ? "time-desc" : "time-asc" : de === "asc" ? "label-asc" : "label-desc" : "none";
  })(), H = (q) => {
    let se;
    switch (q) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = ue ? [[ue, "desc"]] : void 0;
        break;
      case "value-asc":
        se = ue ? [[ue, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        se = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        se = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: se } });
  }, ne = typeof s.limit == "number" ? s.limit : void 0, le = (q) => t({ ...e, query: { ...s, limit: q && q > 0 ? q : void 0 } }), x = (c === "bar" || c === "line" || c === "area") && $, R = x && d.comparePrevious === !0;
  return {
    kind: u,
    label: A,
    colorToken: k,
    granularity: _,
    dateRange: D,
    dots: M,
    canPoints: E,
    canRename: p || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && y,
    isTimeField: $,
    isCategoryField: ce,
    sortValue: ve,
    sortOptions: pe,
    onSort: H,
    limit: ne,
    onLimit: le,
    canComparePrevious: x,
    comparePrevious: R,
    comparePreviousReady: x && D !== void 0,
    onComparePrevious: (q) => t({ ...e, chart: { ...a, familyOptions: { ...d, comparePrevious: q || void 0 } } }),
    onRename: T,
    onRecolor: U,
    onGranularity: L,
    onDateRange: X,
    onDots: te,
    onRemove: re
  };
}
function _b(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function No(e, t, n, r) {
  var m;
  const { chart: o, query: i } = e, a = o.family, s = (g) => {
    if (r < 0 || r >= g.length || n === r) return g;
    const f = g.slice(), [p] = f.splice(n, 1);
    return f.splice(r, 0, p), f;
  };
  if (a === "table" && t.id === "columns") {
    const g = o.familyOptions ?? {}, f = s(Array.isArray(g.columns) ? g.columns : []);
    return { ...e, chart: { ...o, familyOptions: { ...g, columns: f } } };
  }
  const c = s(i.measures ?? []), u = (m = o.mapping) == null ? void 0 : m.series;
  let d = o.mapping;
  if (u && u.mode === "measures")
    d = { ...o.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const g = s(u.values);
    d = { ...o.mapping, series: { ...u, value: g[0], values: g } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...o, mapping: d } };
}
function xb(e, t) {
  return e.allowedCubes.includes(t);
}
function Mb(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const o = e.get(r.shift());
    for (const i of (o == null ? void 0 : o.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function ql(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function _o(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = Mb(e, n);
    let o = !0;
    for (const i of t)
      if (!r.has(i)) {
        o = !1;
        break;
      }
    if (o) return !0;
  }
  return !1;
}
function Fb(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    _o(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function Ca(e, t, n, r) {
  var k;
  const o = br(e), i = o.filter((N) => N.type === "view"), a = gn(t, r), s = Object.values(a).flat();
  let c;
  for (const N of s) {
    const $ = $e(e, N);
    if ($) {
      c = $;
      break;
    }
  }
  const u = !c && n ? ct(e, n) : void 0, d = c ? ct(e, c.cube) : u, m = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, g = t.query.measures ?? [], f = g.length ? Tt(g[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: i, measureSource: f, allowedCubes: [m] };
  const p = f ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), h = p ? ct(e, p) : void 0, y = ql(o), C = /* @__PURE__ */ new Set();
  for (const N of s) {
    const $ = (k = $e(e, N)) == null ? void 0 : k.cube;
    $ && y.has($) && C.add($);
  }
  f && y.has(f) && C.add(f), !C.size && p && y.has(p) && C.add(p);
  const S = Fb(y, C), A = S.filter((N) => N !== p).map((N) => y.get(N)).sort((N, $) => N.title.localeCompare($.title));
  return {
    sourceCube: (h == null ? void 0 : h.type) === "cube" ? h : void 0,
    relatedCubes: A,
    views: i,
    measureSource: f,
    allowedCubes: S
  };
}
function Ab(e, t, n) {
  if (!t) return e;
  const r = ql(br(t)), o = e.query ?? {}, i = new Set(Object.values(gn(e, n)).flat()), a = (h) => {
    const y = Tt(h);
    return y !== void 0 && r.has(y) ? y : void 0;
  }, s = /* @__PURE__ */ new Set();
  for (const h of [...o.measures ?? [], ...o.dimensions ?? []]) {
    const y = a(h);
    y && s.add(y);
  }
  const c = o.timeDimensions ?? [];
  for (const h of c) {
    const y = a(h.dimension);
    y && s.add(y);
  }
  if (_o(r, s)) return e;
  const u = (o.measures ?? []).map(a).find((h) => h !== void 0) ?? [...i].map((h) => {
    var y;
    return (y = $e(t, h)) == null ? void 0 : y.cube;
  }).find((h) => h !== void 0 && r.has(h));
  if (!u) return e;
  const d = /* @__PURE__ */ new Set([u]), m = (h) => _o(r, /* @__PURE__ */ new Set([...d, h])) && (d.add(h), !0), g = [];
  for (const h of c) {
    const y = a(h.dimension);
    if (y && m(y)) {
      g.push(h);
      continue;
    }
    if (i.has(h.dimension))
      g.push(h);
    else {
      const C = fl(t, u);
      C && !g.some((S) => S.dimension === C.name) && g.push({ ...h, dimension: C.name });
    }
  }
  const f = (h) => {
    if (i.has(h)) return !0;
    const y = a(h);
    return y !== void 0 && m(y);
  }, p = {
    ...o,
    measures: (o.measures ?? []).filter(f),
    dimensions: (o.dimensions ?? []).filter(f),
    timeDimensions: g
  };
  return { ...e, query: p };
}
class wr extends w.Component {
  constructor() {
    super(...arguments);
    Sr(this, "state", { error: null, resetKey: this.props.resetKey });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  static getDerivedStateFromProps(n, r) {
    return n.resetKey !== r.resetKey ? { error: null, resetKey: n.resetKey } : null;
  }
  componentDidCatch(n, r) {
    console.error(`cube-viz: ${this.props.label} failed to render`, n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ b("div", { className: "cv-ed-broken", role: "alert", children: [
      /* @__PURE__ */ l(Ec, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
      /* @__PURE__ */ b("div", { children: [
        /* @__PURE__ */ b("strong", { className: "cv-ed-broken-title", children: [
          this.props.label,
          " couldn’t be shown"
        ] }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-msg", children: n.message }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-hint", children: "The rest of the chart is still editable — undo the last change to this control, or clear the value it holds." })
      ] })
    ] }) : this.props.children;
  }
}
const $b = dt.options;
function Ob({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: o
}) {
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: O("cv-color-picker", o),
      children: [
        n ? /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": e === void 0,
            "aria-label": "Auto color",
            disabled: r,
            onClick: () => t(null),
            className: O(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        $b.map((i) => {
          const a = e === i;
          return /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": a,
              "aria-label": i,
              title: i,
              disabled: r,
              onClick: () => t(a && n ? null : i),
              className: O(
                "cv-color-swatch cv-color-swatch--token",
                a && "cv-color-swatch--selected"
              ),
              style: { backgroundColor: `var(--${i})` }
            },
            i
          );
        })
      ]
    }
  );
}
function Pb({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: o,
  resolvedColor: i,
  reorder: a,
  getSwap: s,
  className: c
}) {
  const u = yt(), d = hr(), m = Nb(e, t, n, r, o, u), g = w.useId(), f = w.useId(), p = w.useId(), h = w.useId(), y = w.useId(), C = w.useId(), S = (o == null ? void 0 : o.label) ?? r, A = m.label || S, k = m.canColor && i !== void 0, N = m.canRename || k || m.isTimeField || m.isCategoryField || m.canPoints || s !== void 0, $ = (M) => {
    const P = M.trim();
    m.onRename(P.length > 0 ? P : void 0);
  }, _ = (M) => {
    !a || !M.altKey || (M.key === "ArrowUp" && a.index > 0 ? (M.preventDefault(), a.onMove(-1)) : M.key === "ArrowDown" && a.index < a.total - 1 && (M.preventDefault(), a.onMove(1)));
  }, D = /* @__PURE__ */ b(he, { children: [
    a ? /* @__PURE__ */ l(Lc, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
    k ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : o ? (
      // What the field HOLDS, in words ("km", "#", "date") — same chip as the
      // picker rows, converted to the viewer's unit system.
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: fi(o, d) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: A })
  ] }), E = a ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "field-pill",
      className: O("cv-field-pill", (a == null ? void 0 : a.dragging) && "cv-field-pill--dragging", c),
      draggable: !!a,
      onDragStart: a == null ? void 0 : a.onDragStart,
      onDragOver: a ? (M) => {
        M.preventDefault(), a.onDragOver();
      } : void 0,
      onDragEnd: a == null ? void 0 : a.onDragEnd,
      onKeyDown: a ? _ : void 0,
      children: [
        N ? /* @__PURE__ */ b(He, { children: [
          /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${A}${E}`,
              ...a ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: D
            }
          ) }),
          /* @__PURE__ */ l(je, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ b("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(Ib, { getSwap: s, display: A }) : null,
            m.canRename ? /* @__PURE__ */ b("label", { className: "cv-ec-field", htmlFor: g, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                be,
                {
                  id: g,
                  defaultValue: m.label ?? "",
                  placeholder: S,
                  className: "cv-ec-h8",
                  onBlur: (M) => $(M.target.value),
                  onKeyDown: (M) => {
                    M.key === "Enter" && ($(M.target.value), M.target.blur());
                  }
                }
              )
            ] }) : null,
            k ? /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(Ob, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ b(he, { children: [
              /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  Wt,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (M, P) => /* @__PURE__ */ l(ki, { value: M, onChange: P })
                  }
                )
              ] }),
              /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  Wt,
                  {
                    kind: "granularity",
                    value: m.granularity,
                    onChange: m.onGranularity,
                    renderFixed: (M, P) => /* @__PURE__ */ l(
                      dl,
                      {
                        value: M,
                        onChange: P,
                        allowAuto: !0,
                        autoHint: oi(m.dateRange),
                        options: Es(m.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              m.canComparePrevious ? /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ b("label", { className: "cv-ec-row", htmlFor: y, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    So,
                    {
                      id: y,
                      checked: m.comparePrevious,
                      onChange: m.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                m.comparePrevious && !m.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            m.isCategoryField ? /* @__PURE__ */ b(he, { children: [
              /* @__PURE__ */ b("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: f, children: [
                /* @__PURE__ */ l("span", { id: p, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: f,
                    "aria-labelledby": p,
                    value: m.sortValue,
                    onChange: (M) => m.onSort(M.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((M) => /* @__PURE__ */ l("option", { value: M.key, children: M.label }, M.key))
                  }
                )
              ] }),
              /* @__PURE__ */ b("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: h, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  be,
                  {
                    id: h,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (M) => {
                      const P = M.target.value.trim();
                      m.onLimit(P === "" ? void 0 : Number(P));
                    },
                    onKeyDown: (M) => {
                      if (M.key === "Enter") {
                        const P = M.target.value.trim();
                        m.onLimit(P === "" ? void 0 : Number(P)), M.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ b("label", { className: "cv-ec-row", htmlFor: C, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(So, { id: C, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ b(
              J,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: m.onRemove,
                children: [
                  /* @__PURE__ */ l(Fi, { className: "cv-ec-icon" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : (
          // Nothing to configure, but a reorderable pill still has to be REACHABLE for
          // the keyboard move to exist at all — so it takes focus even without a popover.
          /* @__PURE__ */ l(
            "span",
            {
              className: "cv-field-pill-body",
              title: `${A}${E}`,
              ...a ? {
                tabIndex: 0,
                "aria-label": `${A}, position ${a.index + 1} of ${a.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: D
            }
          )
        ),
        /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: m.onRemove,
            "aria-label": `Remove ${A}`,
            children: /* @__PURE__ */ l(Fi, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function Ib({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ b(he, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(Ml, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
      n.hint ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: n.hint }) : null
    ] }) : null,
    /* @__PURE__ */ l(
      Si,
      {
        well: n.picker.well,
        placed: n.picker.placed,
        inWell: n.picker.inWell,
        scope: n.picker.scope,
        blockReason: n.picker.blockReason,
        onSelect: n.picker.onSelect,
        side: "right",
        align: "start",
        children: /* @__PURE__ */ b("button", { type: "button", className: "cv-field-pill-swap", title: `Swap ${t} for another field`, children: [
          /* @__PURE__ */ l(Vc, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function Tb({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: o,
  optionFor: i,
  colorFor: a,
  scope: s,
  blockReason: c,
  onAdd: u,
  swapFor: d,
  badge: m,
  orientation: g,
  lockedSingle: f,
  disableReorder: p,
  label: h,
  note: y,
  pickerSide: C,
  pickerAlign: S,
  control: A
}) {
  const k = n.cardinality === "many" && !f, N = k || r.length === 0, $ = r.length, _ = g === "vertical", D = h ?? n.label, E = k && $ > 1 && !p, [M, P] = w.useState(null), V = ["number", "category", "time"].filter((z) => !ke(n, z)).map((z) => gi(n, z, r)).find((z) => z !== void 0) ?? n.hint, T = o.length === 0 && !n.optional && ke(n, "number") ? "Pick a number to get started" : void 0, U = /* @__PURE__ */ l(
    Si,
    {
      well: n,
      placed: o,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: C ?? (_ ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ b(
        "button",
        {
          type: "button",
          title: V,
          className: O(
            "cv-well-add",
            _ && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(zt, { className: "cv-ec-icon" }),
            r.length === 0 ? D : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "well-group",
      className: O("cv-well-group", !_ && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ b("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: D }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        A ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: A }) : null,
        /* @__PURE__ */ l(wr, { label: D, resetKey: e, children: /* @__PURE__ */ b("div", { className: O("cv-well-fields", _ ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((z, L) => /* @__PURE__ */ l(
            Pb,
            {
              spec: e,
              update: t,
              well: n,
              member: z,
              option: i(z),
              resolvedColor: a(z),
              getSwap: d ? () => d(z) : void 0,
              className: _ ? "cv-field-pill--full" : void 0,
              reorder: E ? {
                index: L,
                total: $,
                dragging: M === L,
                onDragStart: () => P(L),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  M === null || M === L || (t(No(e, n, M, L)), P(L));
                },
                onDragEnd: () => P(null),
                onMove: (X) => t(No(e, n, L, L + X))
              } : void 0
            },
            z
          )),
          N ? U : null
        ] }) }),
        T ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: T }) : null,
        y ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: y }) : null
      ]
    }
  );
}
function Gr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ b(He, { children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ b("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(ht, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(je, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(wr, { label: e, children: n }) })
  ] });
}
function Ri(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Db({ spec: e, update: t }) {
  var d;
  const { fo: n, setFO: r } = Ri(e, t), o = Cl(e), i = (d = e.query.timeDimensions) == null ? void 0 : d[0], a = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (m) => {
    const g = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!g) return;
    const f = { ...g };
    for (const p of Object.keys(m)) {
      const h = m[p];
      h === void 0 ? delete f[p] : f[p] = h;
    }
    delete f.granularity, t({ ...e, query: { ...e.query, timeDimensions: [f] } });
  };
  return /* @__PURE__ */ b("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(pn, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      Al,
      {
        id: m,
        cube: o,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (g) => u({ dimension: g }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(pn, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      Wt,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => u({ dateRange: g }),
        renderFixed: (g, f) => /* @__PURE__ */ l(ki, { value: g, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ l(ge, { label: "Display", children: /* @__PURE__ */ l(
      Vt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: a,
        onChange: (m) => r({ display: m })
      }
    ) }),
    /* @__PURE__ */ l(
      gt,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (m) => r({ goodDirection: m ? "up" : "down" })
      }
    ),
    a === "gauge" ? /* @__PURE__ */ l(pn, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      be,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (g) => {
          const f = parseFloat(g.target.value);
          r({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Eb({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ri(e, t), o = n.comparison, i = o !== void 0, a = w.useRef(void 0);
  o && (a.current = o);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (o == null ? void 0 : o.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ b("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ge, { label: "Compare to", children: /* @__PURE__ */ l(
      Vt,
      {
        "aria-label": "Compare to",
        size: "sm",
        options: [
          { value: "none", label: "Nothing" },
          { value: "previousPeriod", label: "Prev period" },
          { value: "value", label: "Fixed value" }
        ],
        value: c,
        onChange: (d) => r({
          comparison: d === "none" ? void 0 : (
            // Re-entering restores the config the user last had, so toggling
            // through "Nothing" is not destructive.
            { ...a.current ?? { showAsPercent: !0 }, mode: d }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ b(he, { children: [
      (o == null ? void 0 : o.mode) === "value" ? /* @__PURE__ */ l(pn, { label: "Baseline value", children: ({ id: d }) => /* @__PURE__ */ l(
        be,
        {
          id: d,
          type: "number",
          className: "cv-ec-h8",
          value: (o == null ? void 0 : o.value) ?? "",
          onChange: (m) => {
            const g = parseFloat(m.target.value);
            r({ comparison: { ...o, value: Number.isFinite(g) ? g : void 0 } });
          }
        }
      ) }) : null,
      (o == null ? void 0 : o.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ b("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Ia, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ b("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        gt,
        {
          label: "Show as %",
          checked: ((o == null ? void 0 : o.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...o, showAsPercent: d } })
        }
      )
    ] }) : null
  ] });
}
function Lb({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Ri(e, t), o = n.sparkline, i = o !== void 0, a = o == null ? void 0 : o.granularity, s = Es((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ b("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(pn, { label: "Trend", children: ({ id: d, labelId: m }) => /* @__PURE__ */ l(
      Wt,
      {
        labelId: m,
        kind: "granularity",
        value: a,
        onChange: (g) => r({
          sparkline: g === void 0 ? void 0 : { ...o, granularity: g }
        }),
        renderFixed: (g, f) => /* @__PURE__ */ l(
          dl,
          {
            id: d,
            value: g,
            onChange: f,
            options: s,
            allowNone: !0,
            noneLabel: "No trend",
            className: "cv-ec-h8 cv-ec-full"
          }
        )
      }
    ) }),
    i ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Colored by the direction set on the value." }) : null
  ] });
}
function pn({
  label: e,
  children: t
}) {
  const n = w.useId(), r = w.useId();
  return /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function Vb({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var H, ne, le;
  const { meta: o } = bt(), i = yt(), a = w.useCallback(
    (I) => t(Ab(I, o, i)),
    [t, o, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), d = u.queryless ?? !1, m = u.enforcesAxisUnit, g = Cl(e), f = hr(), p = w.useMemo(() => fy(c, i), [c, i]), h = w.useMemo(() => gn(e, i), [e, i]), y = w.useMemo(() => new Map(p.map((I) => [I.id, I])), [p]), C = w.useMemo(
    () => Ca(o, e, void 0, i),
    [o, e, i]
  ), S = w.useMemo(() => Object.values(h).flat(), [h]), A = w.useMemo(
    () => {
      var I;
      return C.viewLocked ? [C.viewLocked] : [(I = C.sourceCube) == null ? void 0 : I.name, ...C.relatedCubes.map((x) => x.name)].filter(
        Boolean
      );
    },
    [C]
  ), k = w.useMemo(
    () => Object.values(h).every((I) => I.length === 0),
    [h]
  ), N = w.useCallback(
    (I) => {
      const x = (I.y ?? [])[0], R = x ? $e(o, x) : void 0;
      return {
        leftKey: x ? Rl(R) : void 0,
        leftLabel: x ? zb(R, f(R == null ? void 0 : R.unit)) : void 0
      };
    },
    [o, f]
  ), $ = w.useMemo(() => N(h), [N, h]), _ = w.useCallback(
    (I, x) => (R, F) => {
      var G;
      if (F) {
        if (!xb(I, F.cube))
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && I.measureSource && F.cube !== I.measureSource)
          return `This chart's numbers come from ${((G = I.sourceCube) == null ? void 0 : G.title) ?? I.measureSource}. Remove them to use another table.`;
        if (m && R === "y" && F.memberType === "measure")
          return by(F, x.leftKey, x.leftLabel);
      }
    },
    [m]
  ), D = w.useMemo(
    () => _(C, $),
    [_, C, $]
  ), E = $.leftLabel, M = w.useMemo(() => {
    var x;
    const I = {};
    if (c === "bar" || c === "line" || c === "area") {
      const R = (x = s.mapping) == null ? void 0 : x.series;
      if (R && R.mode === "measures") {
        const F = R.members.map((j) => {
          var Q, Z;
          return { key: j, colorToken: (Z = (Q = R.meta) == null ? void 0 : Q[j]) == null ? void 0 : Z.colorToken };
        }), G = Is(F, s.colors);
        R.members.forEach((j, Q) => {
          I[j] = G[Q];
        });
      }
    }
    return I;
  }, [c, s.mapping, s.colors]), P = w.useCallback(
    (I, x, R) => {
      const F = $e(o, x);
      if (D(I, F)) return;
      let G = R === "geoPoint" && (F != null && F.latMember) && F.lngMember ? It(
        It(e, c, "lat", F.latMember, "numberDimension", i),
        c,
        "lng",
        F.lngMember,
        "numberDimension",
        i
      ) : It(e, c, I, x, R, i);
      const j = u.canonicalTimeWell;
      if (j && I !== j && (h[j] ?? []).length === 0) {
        const Q = fl(o, F == null ? void 0 : F.cube);
        Q && Q.name !== x && !D(j, Q) && (G = It(G, c, j, Q.name, "time", i));
      }
      a(G);
    },
    [D, o, a, e, c, i, u, h]
  ), V = w.useCallback(
    (I, x) => {
      if (d) return;
      const R = y.get(I), F = $e(o, x);
      if (!R || !F) return;
      const G = (h[I] ?? []).indexOf(x), j = _l(e, c, I, x, i), Q = gn(j, i), Z = Ca(o, j, void 0, i), B = _(Z, N(Q)), W = Q[I] ?? [], q = Object.values(Q).flat(), se = (ye, Ke) => {
        if (ye === x) return;
        let Ye = It(j, c, I, ye, Ke, i);
        const Xt = (gn(Ye, i)[I] ?? []).indexOf(ye);
        G >= 0 && Xt > G && (Ye = No(Ye, R, Xt, G)), a(Ye);
      }, de = gl(o, F), Fe = ct(o, F.cube), Be = de.length > 1 ? {
        options: de.map((ye, Ke) => {
          const Ye = ye.memberType === "measure" ? "number" : "numberDimension", Cr = ye.name === x ? void 0 : $l(R, Ye, W, ye, (Ql) => B(I, Ql)), Xt = bi(ye);
          return {
            label: Fl(ye, ct(o, ye.cube)),
            selected: ye.name === x,
            disabled: Cr !== void 0,
            title: Cr ?? (Xt ? wi(Fe) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: Xt && Ke > 0,
            onSelect: () => se(ye.name, Ye)
          };
        })
      } : void 0, xn = S.filter((ye) => {
        var Ke;
        return ((Ke = $e(o, ye)) == null ? void 0 : Ke.cube) === F.cube;
      }).length === 1 ? Uv(F) : void 0;
      return {
        picker: {
          well: R,
          placed: q,
          inWell: W,
          scope: Z,
          blockReason: (ye) => B(I, ye),
          onSelect: se
        },
        agg: Be,
        hint: Be ? hy(de, Fe, F) : void 0,
        notice: xn
      };
    },
    [d, y, o, h, S, e, c, i, _, N, a]
  ), T = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, U = T.left.map((I) => y.get(I)).filter(Boolean), z = T.bottom.map((I) => y.get(I)).filter(Boolean), L = (H = h.color) == null ? void 0 : H[0], X = ((ne = h.y) == null ? void 0 : ne.length) ?? 0, te = L && X > 1 ? `${X} values × ${((le = $e(o, L)) == null ? void 0 : le.label) ?? "this split"} — one series per value per group.` : void 0, re = u.hasLegend, ce = (h.y ?? [])[0], me = (I) => {
    var F, G, j, Q;
    if (!I) return;
    const x = (F = s.mapping) == null ? void 0 : F.series;
    return (x && x.mode === "measures" ? (j = (G = x.meta) == null ? void 0 : G[I]) == null ? void 0 : j.label : void 0) ?? ((Q = $e(o, I)) == null ? void 0 : Q.label);
  }, ue = (I) => {
    var R, F, G, j;
    const x = (Q, Z) => Z ? /* @__PURE__ */ l(Gy, { spec: e, update: a, axis: Q, title: "Title", auto: me(Z) }) : null;
    switch (I) {
      case "y":
        return x("y", ce);
      // the single value axis
      case "x":
        return x("x", (F = (R = s.mapping) == null ? void 0 : R.category) == null ? void 0 : F.member);
      case "sy":
        return x("y", (G = h.sy) == null ? void 0 : G[0]);
      // scatter Y axis
      case "sx":
        return x("x", (j = h.sx) == null ? void 0 : j[0]);
      // scatter X axis
      default:
        return null;
    }
  }, pe = (I, x) => /* @__PURE__ */ l(
    Tb,
    {
      spec: e,
      update: a,
      well: I,
      placed: h[I.id] ?? [],
      allPlaced: S,
      optionFor: (R) => $e(o, R),
      colorFor: (R) => M[R],
      scope: C,
      blockReason: (R) => D(I.id, R),
      onAdd: (R, F) => P(I.id, R, F),
      swapFor: (R) => V(I.id, R),
      badge: I.id === "y" ? E : void 0,
      orientation: x,
      note: I.id === "color" ? te : void 0,
      control: ue(I.id)
    },
    I.id
  ), ve = () => {
    var F;
    const I = y.get("value"), x = (h.value ?? []).length > 0, R = s.familyOptions ?? {};
    return /* @__PURE__ */ b(he, { children: [
      /* @__PURE__ */ b("div", { className: "cv-edit-kpi-value", children: [
        I ? pe(I, "vertical") : null,
        x ? /* @__PURE__ */ l(
          Gr,
          {
            label: "Time, range & display",
            summary: R.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Db, { spec: e, update: a })
          }
        ) : null
      ] }),
      x ? /* @__PURE__ */ b(he, { children: [
        /* @__PURE__ */ l(
          Gr,
          {
            label: "Comparison",
            summary: R.comparison === void 0 ? "None" : R.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(Eb, { spec: e, update: a })
          }
        ),
        /* @__PURE__ */ l(
          Gr,
          {
            label: "Trend",
            summary: Ev(
              (F = R.sparkline) == null ? void 0 : F.granularity
            ),
            children: /* @__PURE__ */ l(Lb, { spec: e, update: a })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ b("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ b("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !k || d ? /* @__PURE__ */ l(cb, { spec: e, update: a }) : null,
      /* @__PURE__ */ b("div", { className: "cv-edit-overlay-actions", children: [
        S.length > 0 && C.sourceCube ? /* @__PURE__ */ b(
          "span",
          {
            className: "cv-edit-anchor",
            title: C.sourceCube.grain ?? C.sourceCube.title,
            children: [
              /* @__PURE__ */ l(Va, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: C.sourceCube.title }),
              C.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: C.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(Vy, { spec: e, update: a, cube: g, scopeCubes: A, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-edit-overlay-body", children: [
      U.length > 0 ? /* @__PURE__ */ l("div", { className: O("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ve() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        U.map((I) => pe(I, "vertical"))
      ) }) : null,
      /* @__PURE__ */ b("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ b("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(lb, { spec: e, update: a, empty: k && !d })
        ] }),
        z.length > 0 ? /* @__PURE__ */ b("div", { className: "cv-edit-overlay-bottom", children: [
          z.map((I) => pe(I, "horizontal")),
          re && !k ? /* @__PURE__ */ l(jy, { spec: e, update: a }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function zb(e, t) {
  const n = Nl(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Wl(e, t) {
  const n = w.useRef(e);
  w.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = w.useRef(null), o = w.useRef(null);
  return w.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, o.current !== null && (n.current(...o.current), o.current = null));
    },
    []
  ), w.useCallback(
    (...i) => {
      r.current !== null && clearTimeout(r.current), o.current = i, r.current = setTimeout(() => {
        r.current = null, o.current = null, n.current(...i);
      }, t);
    },
    [t]
  );
}
function jr(e) {
  const t = Za.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Hb({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, o] = w.useState(() => ({
    spec: e,
    issues: jr(e)
  })), [i, a] = w.useState(e);
  w.useEffect(() => {
    o({ spec: e, issues: jr(e) }), a(e);
  }, [e]);
  const s = Wl((g) => t(g), n), c = r.spec, u = r.issues, d = u.length === 0, m = w.useCallback(
    (g) => {
      const f = jr(g);
      o({ spec: g, issues: f }), f.length === 0 && (a(g), s(g));
    },
    [s]
  );
  return { draft: c, issues: u, valid: d, committed: i, update: m };
}
const Gb = () => {
};
function jb({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: o = !1,
  className: i
}) {
  const a = yt(), { draft: s, issues: c, valid: u, committed: d, update: m } = Hb({
    spec: e,
    onChange: t ?? Gb,
    debounceMs: r
  }), g = a.get(s.chart.family), f = (g == null ? void 0 : g.queryless) ?? !1, p = d, h = (_) => {
    var D, E, M;
    return (((D = _ == null ? void 0 : _.measures) == null ? void 0 : D.length) ?? 0) > 0 || (((E = _ == null ? void 0 : _.dimensions) == null ? void 0 : E.length) ?? 0) > 0 || (((M = _ == null ? void 0 : _.timeDimensions) == null ? void 0 : M.some((P) => typeof P.granularity == "string")) ?? !1);
  }, y = (_) => {
    var D;
    return (((D = _ == null ? void 0 : _.measures) == null ? void 0 : D.length) ?? 0) > 0;
  }, C = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", S = f || h(s.query) && h(p.query) && (!C || y(s.query) && y(p.query)), A = C && !y(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", k = w.useCallback(
    (_) => {
      m({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ..._ }
        }
      });
    },
    [s, m]
  ), N = S ? /* @__PURE__ */ l(
    si,
    {
      query: p.query ?? {},
      chart: p.chart,
      editing: !0,
      updateFamilyOptions: k
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: A }) }), $ = n ? /* @__PURE__ */ b(J, { size: "sm", disabled: !u, onClick: () => n(d), children: [
    /* @__PURE__ */ l(Ga, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "chart-editor",
      className: O("cv-chart-editor", o ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ b(rr, { variant: "destructive", children: [
          /* @__PURE__ */ l(Oo, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(or, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(ir, { children: /* @__PURE__ */ b("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((_, D) => /* @__PURE__ */ b("li", { children: [
              _.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: _.path }) : null,
              " ",
              _.message
            ] }, D)),
            c.length > 3 ? /* @__PURE__ */ b("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(wr, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(Vb, { spec: s, update: m, toolbar: $, children: N }) }) })
      ]
    }
  );
}
function Bb({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: o,
  onRedo: i,
  canUndo: a,
  canRedo: s,
  onDiscard: c,
  discardDisabled: u,
  onSave: d,
  saveDisabled: m,
  className: g
}) {
  const f = o || i, [p, h] = w.useState(!1);
  w.useEffect(() => {
    if (!p) return;
    const C = setTimeout(() => h(!1), 1600);
    return () => clearTimeout(C);
  }, [p]), w.useEffect(() => {
    m || h(!1);
  }, [m]);
  const y = () => {
    d == null || d(), h(!0);
  };
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: O("cv-editor-toolbar", g),
      children: [
        /* @__PURE__ */ l(
          be,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (C) => t(C.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ b("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ b(J, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Da, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ b(J, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Ha, {}),
            " Text"
          ] }),
          /* @__PURE__ */ b(J, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(zc, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ b(J, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Hc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ b("div", { className: "cv-editor-toolbar-actions", children: [
          f ? /* @__PURE__ */ b(he, { children: [
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !a,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(Gc, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(jc, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ b(
            J,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(Bc, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ b(
            J,
            {
              size: "sm",
              onClick: y,
              disabled: m,
              "aria-live": "polite",
              className: O(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                p && "cv-editor-toolbar-save--saved"
              ),
              children: [
                p ? /* @__PURE__ */ l(Ut, {}) : /* @__PURE__ */ l(Ga, {}),
                " ",
                p ? "Saved" : "Save"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
const Ul = "lg", Kl = 12;
function qb(e, t) {
  const n = t[Ul];
  if (n && n.length > 0) return n;
  let r, o = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const a = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    a > o && (r = i, o = a);
  }
  return r ?? e;
}
function Wb(e, t) {
  const n = new Map(e.map((a) => [a.i, a])), r = new Map(t.map((a) => [a.i, a])), o = [], i = (a, s) => {
    const c = {
      i: a.i,
      x: a.x,
      y: a.y,
      w: a.w,
      h: a.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (c.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (c.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (c.static = s.static), o.push(c);
  };
  for (const a of e) {
    const s = r.get(a.i);
    s && i(s, a);
  }
  for (const a of t)
    n.has(a.i) || i(a, void 0);
  return o;
}
const Ub = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Kb(e, t, n, r = Kl) {
  const o = Ub[n], i = Math.min(o.w, r), a = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
  return {
    i: t,
    x: 0,
    y: a,
    w: i,
    h: o.h,
    minW: Math.min(o.minW, i),
    minH: o.minH
  };
}
function Yl(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Kl) {
  const o = Kb(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, o]
  };
}
function Yb(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const o = JSON.parse(JSON.stringify(r));
  if (o.id = n, o.type === "chart") {
    const i = o.chart.familyOptions;
    i && typeof i.chartId == "string" && (o.chart = { ...o.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Yl(e, o);
}
function Qb(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Xb(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Jb = 12, Zb = 900, e0 = 0.4;
function t0(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function n0({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: o,
  onDelete: i,
  onLayoutChange: a
}) {
  const [s, c] = Ws(), u = e.grid ?? {}, d = u.cols ?? Jb, m = u.rowHeight ?? 40, g = u.margin ?? [12, 12], f = u.containerPadding ?? [0, 0], p = Math.max(e0, Math.min(1, c / Zb)), h = Math.round(p / 0.05) * 0.05, y = Math.max(8, Math.round(m * h)), C = [
    Math.round(g[0] * h),
    Math.round(g[1] * h)
  ], S = [
    Math.round(f[0] * h),
    Math.round(f[1] * h)
  ], A = w.useMemo(
    () => ({ [Ul]: t0(e.layout) }),
    [e.layout]
  ), k = w.useMemo(
    () => new Map(e.widgets.map((E) => [E.id, E])),
    [e.widgets]
  ), N = w.useRef(a);
  w.useEffect(() => {
    N.current = a;
  }, [a]);
  const $ = w.useRef(e.layout);
  w.useEffect(() => {
    $.current = e.layout;
  }, [e.layout]);
  const _ = w.useRef(null), D = w.useCallback(
    (E, M) => {
      const V = qb(E, M).map((T) => ({ ...T }));
      r0($.current, V) || N.current(V);
    },
    []
  );
  return /* @__PURE__ */ l(ai, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    Ba,
    {
      width: c,
      layouts: A,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: y,
      margin: C,
      containerPadding: S,
      dragConfig: { enabled: !0, handle: `.${Yn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: D,
      children: e.layout.map((E) => {
        const M = k.get(E.i);
        if (!M) return null;
        const P = M.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ b(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${M.title ?? M.type}`,
              "aria-pressed": P,
              onPointerDown: (V) => {
                _.current = { x: V.clientX, y: V.clientY };
              },
              onClick: (V) => {
                const T = _.current;
                T && Math.hypot(V.clientX - T.x, V.clientY - T.y) > 5 || n(M.id);
              },
              onKeyDown: (V) => {
                (V.key === "Enter" || V.key === " ") && (V.preventDefault(), n(M.id));
              },
              className: O(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                P && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(go, { widget: M, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: O(Yn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ b("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${M.title ?? M.type}`,
                      onClick: (V) => {
                        V.stopPropagation(), r(M.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(qc, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${M.title ?? M.type}`,
                      onClick: (V) => {
                        V.stopPropagation(), o(M.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Wc, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${M.title ?? M.type}`,
                      onClick: (V) => {
                        V.stopPropagation(), i(M.id);
                      },
                      className: O("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Kt, {})
                    }
                  )
                ] })
              ]
            },
            E.i
          )
        );
      })
    }
  ) : null }) });
}
function r0(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const o = n.get(r.i);
    if (!o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h) return !1;
  }
  return !0;
}
const o0 = w.memo(n0);
function i0(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function a0({
  widget: e,
  onChange: t
}) {
  const n = w.useRef(t);
  w.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = w.useRef(e);
  w.useEffect(() => {
    r.current = e;
  }, [e]);
  const o = qa({
    extensions: [Ua],
    editable: !0,
    content: i0(e.doc),
    onUpdate: ({ editor: i }) => {
      const a = i.getJSON();
      n.current({ ...r.current, doc: a });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: O(Us, "cv-text-editor-content")
      }
    }
  });
  return o ? /* @__PURE__ */ l(ge, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ b("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(s0, { editor: o }),
    /* @__PURE__ */ l(Wa, { editor: o })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function rt({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (o) => o.preventDefault(),
      onClick: t,
      className: O("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function s0({ editor: e }) {
  const [, t] = w.useReducer((n) => n + 1, 0);
  return w.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          rt,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Uc, {})
          }
        ),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Kc, {})
          }
        ),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Yc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(Qc, {})
          }
        ),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Xc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Jc, {})
          }
        ),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Zc, {})
          }
        ),
        /* @__PURE__ */ l(
          rt,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(eu, {})
          }
        )
      ]
    }
  );
}
const l0 = Io(
  // Semantic classes (styles/ui.css).
  "cv-badge",
  {
    variants: {
      variant: {
        default: "cv-badge--default",
        secondary: "cv-badge--secondary",
        outline: "cv-badge--outline",
        destructive: "cv-badge--destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function c0({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: O(l0({ variant: t }), e), ...n });
}
function u0({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: o,
  className: i
}) {
  const { meta: a, isLoading: s } = bt(), c = w.useMemo(() => br(a), [a]), u = c.filter((g) => g.type === "view"), d = c.find((g) => g.name === e), m = w.useMemo(() => {
    const g = c.filter((y) => y.type === "cube"), f = g.some((y) => y.category), p = [], h = /* @__PURE__ */ new Map();
    for (const y of g) {
      const C = y.category ?? (f ? "More tables" : "Tables");
      h.has(C) || (h.set(C, []), p.push(C)), h.get(C).push(y);
    }
    return p.sort((y, C) => y === "More tables" ? 1 : C === "More tables" ? -1 : y.localeCompare(C)), p.map((y) => ({ label: y, items: h.get(y) }));
  }, [c]);
  return /* @__PURE__ */ b(Te, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Ee, { id: o, className: i, children: /* @__PURE__ */ l(De, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(Br, { option: d }) : void 0 }) }),
    /* @__PURE__ */ b(Le, { children: [
      u.length > 0 ? /* @__PURE__ */ b(uo, { children: [
        /* @__PURE__ */ l(mo, { children: "Saved datasets" }),
        u.map((g) => /* @__PURE__ */ l(Ce, { value: g.name, children: /* @__PURE__ */ l(Br, { option: g }) }, g.name))
      ] }) : null,
      m.map((g) => /* @__PURE__ */ b(uo, { children: [
        /* @__PURE__ */ l(mo, { children: g.label }),
        g.items.map((f) => /* @__PURE__ */ l(Ce, { value: f.name, children: /* @__PURE__ */ l(Br, { option: f }) }, f.name))
      ] }, g.label))
    ] })
  ] });
}
function Br({ option: e }) {
  const t = e.type === "view" ? za : tu;
  return /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(c0, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const d0 = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function m0(e) {
  switch (e) {
    case "dateRange":
      return { kind: "dateRange" };
    case "granularity":
      return { kind: "granularity" };
    case "select":
      return { kind: "select", options: [] };
    case "memberSelect":
      return { kind: "memberSelect", from: "dimension" };
    case "text":
      return { kind: "text" };
    case "number":
      return { kind: "number" };
    case "toggle":
      return { kind: "toggle" };
  }
}
function f0({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, o = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), a = (s) => {
    s !== r.kind && o(m0(s));
  };
  return /* @__PURE__ */ b("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ge,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ b(
          Te,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Ee, { children: /* @__PURE__ */ l(De, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Le, { children: t.map((s) => /* @__PURE__ */ l(Ce, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ge, { label: "Control", children: /* @__PURE__ */ b(Te, { value: r.kind, onValueChange: (s) => a(s), children: [
      /* @__PURE__ */ l(Ee, { children: /* @__PURE__ */ l(De, {}) }),
      /* @__PURE__ */ l(Le, { children: Su.options.map((s) => /* @__PURE__ */ l(Ce, { value: s, children: d0[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(g0, { control: r, onChange: o, variables: t })
  ] });
}
function g0({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(p0, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(v0, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(y0, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(b0, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(w0, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(C0, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function p0({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ b(he, { children: [
    /* @__PURE__ */ l(
      ge,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          h0,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      gt,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function h0({
  selected: e,
  onChange: t
}) {
  const [n, r] = w.useState(!1), o = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(o);
    c.has(s) ? c.delete(s) : c.add(s), t(Tn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, a = o.size === 0 ? "Default set" : o.size === Tn.length ? "All presets" : `${o.size} selected`;
  return /* @__PURE__ */ b(He, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ge, { asChild: !0, children: /* @__PURE__ */ b(J, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: a }),
      /* @__PURE__ */ l(ht, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(je, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Tn.map((s) => {
      const c = o.has(s.value);
      return /* @__PURE__ */ b(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => i(s.value),
          className: "cv-preset-select-item",
          children: [
            /* @__PURE__ */ l(
              "span",
              {
                className: O("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Ut, { className: "cv-ed-icon-xs" }) : null
              }
            ),
            s.label
          ]
        },
        s.value
      );
    }) }) })
  ] });
}
function v0({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), o = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = ut.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), a = "__none__";
  return /* @__PURE__ */ b(he, { children: [
    /* @__PURE__ */ l(
      ge,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ b(
          Te,
          {
            value: e.rangeVariable ?? a,
            onValueChange: (s) => t({ ...e, rangeVariable: s === a ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Ee, { children: /* @__PURE__ */ l(De, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ b(Le, { children: [
                /* @__PURE__ */ l(Ce, { value: a, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(Ce, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ge, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: ut.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => o(s),
          className: O("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function y0({
  control: e,
  onChange: t
}) {
  const n = (i, a) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: a.value ?? String(c.value), label: a.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), o = (i) => t({ ...e, options: e.options.filter((a, s) => s !== i) });
  return /* @__PURE__ */ b(he, { children: [
    /* @__PURE__ */ l(
      gt,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      ge,
      {
        label: "Options",
        action: /* @__PURE__ */ b(J, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(zt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, a) => /* @__PURE__ */ b("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            be,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${a + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(a, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            be,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${a + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(a, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            J,
            {
              variant: "ghost",
              size: "icon",
              className: O("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => o(a),
              children: /* @__PURE__ */ l(Kt, {})
            }
          )
        ] }, a)) })
      }
    )
  ] });
}
function b0({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ b(he, { children: [
    /* @__PURE__ */ l(ge, { label: "From", children: /* @__PURE__ */ b(
      Te,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Ee, { children: /* @__PURE__ */ l(De, {}) }),
          /* @__PURE__ */ b(Le, { children: [
            /* @__PURE__ */ l(Ce, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(Ce, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(Ce, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ge,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          u0,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function w0({
  control: e,
  onChange: t
}) {
  const n = w.useId();
  return /* @__PURE__ */ l(ge, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    be,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function C0({
  control: e,
  onChange: t
}) {
  const n = w.useId(), r = (o, i) => /* @__PURE__ */ l(ge, { label: i, htmlFor: `${n}-${o}`, children: /* @__PURE__ */ l(
    be,
    {
      id: `${n}-${o}`,
      type: "number",
      value: e[o] ?? "",
      onChange: (a) => {
        const s = a.target.value;
        t({ ...e, [o]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ b(he, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function S0(e) {
  return { schemaVersion: Et, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function k0(e) {
  const t = {
    schemaVersion: Et,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function R0(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Sa({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: o = !1
}) {
  const i = w.useId(), a = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ b("div", { "data-slot": "widget-edit-panel", className: O("cv-widget-panel", o && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ge,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          be,
          {
            id: i,
            value: e.title ?? "",
            placeholder: "Untitled",
            onChange: (s) => n({ ...e, title: s.target.value || void 0 })
          }
        )
      }
    ) : null,
    e.type === "chart" ? (
      // The chart's query may carry {var} tokens bound to dashboard variables.
      // Provide a variable store (seeded from the dashboard's decls) so the live
      // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
      // Cube and 400s ("granularity must be a string").
      /* @__PURE__ */ l(ai, { spec: S0(t), children: /* @__PURE__ */ l(My, { createVariable: a, children: /* @__PURE__ */ l("div", { className: O(o && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        jb,
        {
          fill: o,
          spec: k0(e),
          onChange: (s) => n(R0(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(a0, { widget: e, onChange: n }) : /* @__PURE__ */ l(f0, { widget: e, variables: t, onChange: n })
  ] });
}
function N0({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: o = !0,
  onToggle: i,
  regionId: a,
  className: s
}) {
  const c = /* @__PURE__ */ b(he, { children: [
    r ? /* @__PURE__ */ l(
      Sn,
      {
        className: O("cv-section-chevron", o && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "section-header",
      className: O("cv-section-header", s),
      children: [
        r ? /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: i,
            "aria-expanded": o,
            "aria-controls": a,
            className: "cv-section-toggle",
            children: c
          }
        ) : /* @__PURE__ */ l("div", { className: "cv-section-heading", children: c }),
        n ? /* @__PURE__ */ l(
          "div",
          {
            className: "cv-section-actions",
            onClick: (u) => u.stopPropagation(),
            children: n
          }
        ) : null
      ]
    }
  );
}
function _0({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: o = !0,
  open: i,
  onOpenChange: a,
  className: s,
  children: c
}) {
  const u = i !== void 0, [d, m] = w.useState(o), g = r ? u ? i : d : !0, f = w.useId(), p = w.useCallback(() => {
    const h = !g;
    u || m(h), a == null || a(h);
  }, [g, u, a]);
  return /* @__PURE__ */ b(
    "section",
    {
      "data-slot": "section",
      "data-state": g ? "open" : "closed",
      className: O("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          N0,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: g,
            onToggle: p,
            regionId: f
          }
        ),
        g ? /* @__PURE__ */ l("div", { id: f, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function x0(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function M0(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function F0(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function A0(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function $0(e, t) {
  switch (e) {
    case "chart":
      return M0(t);
    case "text":
      return F0(t);
    case "input":
      return A0(t);
  }
}
function O0(e) {
  return { name: e, type: "string" };
}
function P0(e) {
  switch (e) {
    case "dateRange":
      return "last 30 days";
    case "time":
      return "today";
    case "granularity":
      return "day";
    case "number":
      return 0;
    case "boolean":
      return !1;
    case "string":
    case "dimension":
    case "measure":
    case "dimensionOrMeasure":
      return "";
  }
}
const ka = {
  dateRange: "Date range",
  time: "Time",
  granularity: "Group dates by",
  string: "Text",
  number: "Number",
  boolean: "Yes/no",
  dimension: "Category field",
  measure: "Number field",
  dimensionOrMeasure: "Any field"
};
function I0({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = w.useRef(0), o = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((d) => d.name === u));
    return u;
  }, i = (u, d) => {
    t(e.map((m, g) => g === u ? T0(m, d) : m));
  }, a = (u) => t(e.filter((d, m) => m !== u)), s = () => t([...e, O0(o())]), c = (u, d) => {
    const m = u + d;
    if (m < 0 || m >= e.length) return;
    const g = e.slice();
    [g[u], g[m]] = [g[m], g[u]], t(g);
  };
  return /* @__PURE__ */ l(
    _0,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ b(J, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(zt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ b("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ b("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ b(J, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(zt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, d) => /* @__PURE__ */ l(
        D0,
        {
          decl: u,
          index: d,
          total: e.length,
          duplicate: e.some((m, g) => g !== d && m.name === u.name && u.name !== ""),
          onChange: (m) => i(d, m),
          onRemove: () => a(d),
          onMove: (m) => c(d, m)
        },
        d
      )) })
    }
  );
}
function T0(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = P0(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function D0({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: o,
  onRemove: i,
  onMove: a
}) {
  const [s, c] = w.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, d = w.useId();
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ b("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => c((m) => !m),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(ht, {}) : /* @__PURE__ */ l(Sn, {})
            }
          ),
          /* @__PURE__ */ l(
            be,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => o({ name: m.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: ka[e.type] }),
          /* @__PURE__ */ b("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => a(-1),
                children: /* @__PURE__ */ l(Ao, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => a(1),
                children: /* @__PURE__ */ l($o, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Kt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ b("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ge, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ b(Te, { value: e.type, onValueChange: (m) => o({ type: m }), children: [
            /* @__PURE__ */ l(Ee, { children: /* @__PURE__ */ l(De, {}) }),
            /* @__PURE__ */ l(Le, { children: Xa.options.map((m) => /* @__PURE__ */ l(Ce, { value: m, children: ka[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(
            ge,
            {
              label: "Label",
              htmlFor: d,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                be,
                {
                  id: d,
                  value: e.label ?? "",
                  placeholder: e.name,
                  onChange: (m) => o({ label: m.target.value })
                }
              )
            }
          ),
          /* @__PURE__ */ l(
            gt,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => o({ array: m })
            }
          ),
          /* @__PURE__ */ l(E0, { decl: e, onChange: (m) => o({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function E0({
  decl: e,
  onChange: t
}) {
  const n = w.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      gt,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (i) => t(i)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ge, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      be,
      {
        id: n,
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (i) => {
          const a = i.target.value;
          t(a === "" ? void 0 : Number(a));
        }
      }
    ) });
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, o = Array.isArray(e.default) ? e.default.join(", ") : L0(e.default);
  return /* @__PURE__ */ l(ge, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    be,
    {
      id: n,
      value: o,
      placeholder: V0(e.type),
      onChange: (i) => {
        const a = i.target.value;
        if (a === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const s = a.split(",").map((c) => c.trim()).filter(Boolean);
          t(s);
          return;
        }
        t(a);
      }
    }
  ) });
}
function L0(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function V0(e) {
  switch (e) {
    case "dateRange":
      return "last 30 days";
    case "time":
      return "today";
    case "granularity":
      return "day";
    default:
      return "";
  }
}
function Mw({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: r,
  onSave: o,
  newId: i,
  debounceMs: a = 300,
  onUndo: s,
  onRedo: c,
  canUndo: u,
  canRedo: d,
  onDiscard: m,
  families: g,
  onCreateChart: f,
  openWidgetId: p,
  className: h
}) {
  var Q, Z;
  const [y, C] = w.useState(e), [S, A] = w.useState(e);
  w.useEffect(() => {
    C(e), A(e);
  }, [e]);
  const [k, N] = w.useState(null), $ = w.useRef(0), [_, D] = w.useState(null), E = w.useRef(k), M = w.useRef(_), P = w.useRef(y);
  w.useEffect(() => {
    E.current = k, M.current = _, P.current = y;
  });
  const V = w.useRef(null);
  V.current === null && (V.current = i ?? x0());
  const T = i ?? V.current, U = Wl(
    (B) => r == null ? void 0 : r(B),
    a
  ), z = w.useCallback(
    (B) => {
      $.current = Date.now(), C((W) => {
        const q = B(W);
        return U(q), q;
      });
    },
    [U]
  ), L = w.useRef(t);
  w.useEffect(() => {
    if (!t || t === L.current) return;
    const B = 500;
    let W = null;
    const q = () => {
      var Be;
      const se = Date.now() - $.current;
      if (se < B) {
        W = setTimeout(q, B - se);
        return;
      }
      L.current = t;
      const de = /* @__PURE__ */ new Set();
      ((Be = M.current) == null ? void 0 : Be.kind) === "widget" && de.add(M.current.id), E.current && de.add(E.current);
      const Fe = G0(t, P.current, de);
      C(Fe), n == null || n(Fe);
    };
    return q(), () => {
      W && clearTimeout(W);
    };
  }, [t]);
  const X = w.useCallback(
    (B) => {
      if (B === "chart" && f) {
        f();
        return;
      }
      const W = $0(B, T());
      z((q) => Yl(q, W)), N(W.id), D({ kind: "widget", id: W.id });
    },
    [z, T, f]
  ), te = w.useRef(void 0);
  w.useEffect(() => {
    !p || te.current === p || y.widgets.some((B) => B.id === p) && (te.current = p, N(p), D({ kind: "widget", id: p }));
  }, [p, y.widgets]);
  const re = w.useCallback((B) => N(B), []), ce = w.useCallback((B) => {
    N(B), D({ kind: "widget", id: B });
  }, []), me = w.useCallback(
    (B) => {
      z((W) => Qb(W, B)), N((W) => W === B ? null : W), D((W) => (W == null ? void 0 : W.kind) === "widget" && W.id === B ? null : W);
    },
    [z]
  ), ue = w.useCallback(
    (B) => {
      const W = T();
      z((q) => Yb(q, B, W)), N(W);
    },
    [z, T]
  ), pe = w.useCallback(
    (B) => z((W) => Xb(W, B)),
    [z]
  ), ve = w.useCallback(
    (B) => z((W) => {
      const q = Wb(W.layout, B);
      return H0(W.layout, q) ? W : { ...W, layout: q };
    }),
    [z]
  ), H = w.useCallback(
    (B) => z((W) => ({ ...W, name: B || void 0 })),
    [z]
  ), ne = w.useCallback(
    (B) => z((W) => ({ ...W, variables: B })),
    [z]
  ), le = w.useDeferredValue(y), I = w.useMemo(
    () => Qr.safeParse(le),
    [le]
  ), x = w.useCallback(() => {
    const B = Qr.safeParse(y);
    B.success && (o == null || o(B.data), A(y));
  }, [y, o]), R = y !== S, F = (_ == null ? void 0 : _.kind) === "widget" ? y.widgets.find((B) => B.id === _.id) ?? null : null;
  w.useEffect(() => {
    (_ == null ? void 0 : _.kind) === "widget" && !y.widgets.some((B) => B.id === _.id) && D(null);
  }, [_, y.widgets]);
  const G = w.useCallback(() => D(null), []), j = (_ == null ? void 0 : _.kind) === "variables" ? "Dashboard variables" : F ? F.title ?? `${z0(F.type)} widget` : "";
  return /* @__PURE__ */ l(ii, { families: g, children: /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Z = (Q = y.grid) == null ? void 0 : Q.margin) == null ? void 0 : Z[0]) ?? 12 },
      className: O("cv-dashboard-editor", h),
      children: [
        /* @__PURE__ */ l(
          Bb,
          {
            name: y.name ?? "",
            onNameChange: H,
            onAdd: X,
            onEditVariables: () => D({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: d,
            onDiscard: m,
            discardDisabled: !R,
            onSave: o ? x : void 0,
            saveDisabled: !I.success || !R,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        I.success ? null : /* @__PURE__ */ b("p", { className: "cv-dashboard-editor-validation", children: [
          I.error.issues.length,
          " validation issue",
          I.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: _ ? null : /* @__PURE__ */ l(
          o0,
          {
            spec: y,
            selectedId: k,
            onSelect: re,
            onEdit: ce,
            onDuplicate: ue,
            onDelete: me,
            onLayoutChange: ve
          }
        ) }),
        _ ? /* @__PURE__ */ b(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": j,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ b("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ b("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ b(J, { variant: "ghost", size: "sm", onClick: G, children: [
                    /* @__PURE__ */ l(Po, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: j })
                ] }),
                F ? /* @__PURE__ */ b(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => me(F.id),
                    children: [
                      /* @__PURE__ */ l(Kt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(wr, { label: j, resetKey: y, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: _.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(I0, { variables: y.variables, onChange: ne }) }) : (F == null ? void 0 : F.type) === "chart" ? /* @__PURE__ */ l(
                Sa,
                {
                  fill: !0,
                  widget: F,
                  variables: y.variables,
                  onChange: pe,
                  onVariablesChange: ne
                }
              ) : F ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Sa,
                {
                  widget: F,
                  variables: y.variables,
                  onChange: pe,
                  onVariablesChange: ne
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function z0(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function H0(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = t[n];
    if (r.i !== o.i || r.x !== o.x || r.y !== o.y || r.w !== o.w || r.h !== o.h || r.minW !== o.minW || r.minH !== o.minH || r.static !== o.static)
      return !1;
  }
  return !0;
}
function G0(e, t, n) {
  const r = new Map(t.widgets.map((u) => [u.id, u])), o = new Set(e.widgets.map((u) => u.id)), i = e.widgets.map(
    (u) => n.has(u.id) && r.has(u.id) ? r.get(u.id) : u
  );
  for (const u of t.widgets)
    !o.has(u.id) && n.has(u.id) && i.push(u);
  const a = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), c = e.layout.map(
    (u) => n.has(u.i) && a.has(u.i) ? a.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && c.push(u);
  return { ...e, widgets: i, layout: c };
}
export {
  Ht as AUTO_GRANULARITY,
  Od as AreaChartFamily,
  fd as AreaFamilyOptionsSchema,
  vu as AxesOptionsSchema,
  Oi as AxisOptionsSchema,
  hw as BUILTIN_CHART_FAMILIES,
  tt as BUILTIN_DEFAULTS,
  et as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Ad as BarChartFamily,
  dd as BarFamilyOptionsSchema,
  Ul as CANONICAL_BREAKPOINT,
  dt as ChartColorTokenSchema,
  Vb as ChartEditOverlay,
  jb as ChartEditor,
  mu as ChartFamilySchema,
  Ho as ChartInteractionProvider,
  Qa as ChartOptionsSchema,
  Ps as ChartRenderer,
  Za as ChartSpecSchema,
  wu as ChartTransformSchema,
  _w as ChartView,
  Ru as ChartWidgetSchema,
  yu as ColorAssignmentSchema,
  yd as CondFormatRuleSchema,
  si as CubeChart,
  th as CubeChartSpec,
  Ya as CubeQuerySchema,
  gr as CubeVizContext,
  kw as CubeVizProvider,
  ur as DEFAULT_COLOR_RAMP,
  Kl as DEFAULT_COLS,
  Ki as DEFAULT_MARK_THEME,
  Pn as DEFAULT_TRANSFORM_WINDOW,
  co as DEFAULT_UNIT_CONVERSIONS,
  Yn as DRAG_HANDLE_CLASS,
  Nw as Dashboard,
  Mw as DashboardEditor,
  ai as DashboardProvider,
  Qr as DashboardSpecSchema,
  Kr as DateRangeSchema,
  Cd as EMPTY_FAMILY_DEFAULT,
  Di as EM_DASH,
  o0 as EditorCanvas,
  Bb as EditorToolbar,
  ii as FamilyRegistryOverride,
  Oy as FilterBuilder,
  lu as FilterOperatorSchema,
  fu as FormatKindSchema,
  To as FormatOptionsSchema,
  Zu as GRANULARITY_PATTERN,
  su as GranularityChoiceSchema,
  ut as GranularitySchema,
  Fu as GridConfigSchema,
  jd as HeatmapChartFamily,
  wd as HeatmapFamilyOptionsSchema,
  Su as InputControlKindSchema,
  ku as InputControlSchema,
  f0 as InputWidgetEditor,
  _u as InputWidgetSchema,
  Ch as InputWidgetView,
  Wd as KpiFamily,
  hd as KpiFamilyOptionsSchema,
  Mu as LayoutItemSchema,
  cu as LeafFilterSchema,
  pu as LegendOptionsSchema,
  $d as LineChartFamily,
  md as LineFamilyOptionsSchema,
  fe as MemberSchema,
  Ai as OrderDirSchema,
  du as OrderSpecSchema,
  Td as PieChartFamily,
  gd as PieFamilyOptionsSchema,
  Yr as QueryFilterSchema,
  ar as ReferenceLineOptSchema,
  go as RenderWidget,
  Et as SCHEMA_VERSION,
  au as ScalarSchema,
  Ed as ScatterChartFamily,
  pd as ScatterFamilyOptionsSchema,
  gu as SeriesMappingSchema,
  $i as SeriesMetaSchema,
  es as SpecSchema,
  vd as TableColumnOptSchema,
  of as TableFamily,
  bd as TableFamilyOptionsSchema,
  a0 as TextWidgetEditor,
  Nu as TextWidgetSchema,
  rh as TextWidgetView,
  uu as TimeDimensionSchema,
  Cu as TipTapDocSchema,
  hu as TooltipOptionsSchema,
  bu as TransformKindSchema,
  Bn as VarRefSchema,
  Au as VariableDeclSchema,
  Xa as VariableTypeSchema,
  Ka as VariableValueSchema,
  I0 as VariablesPanel,
  Zs as WidgetChrome,
  Sa as WidgetEditPanel,
  xu as WidgetSpecSchema,
  xw as adaptiveGranularity,
  Yl as appendWidget,
  kf as areaChartFamily,
  Qi as assignColors,
  oi as autoGranularityFor,
  Dp as axisKey,
  Cf as barChartFamily,
  ti as buildFamilyRegistry,
  Sw as builtinCharts,
  Ze as builtinFamilyDescriptors,
  cr as builtinFamilyRegistry,
  fl as canonicalTimeOf,
  Qv as collapseFamilies,
  Yu as createCubeClient,
  x0 as createIdFactory,
  Vs as createQueryResolver,
  Hs as createUnitsFormatter,
  ng as createVariableStore,
  td as datePattern,
  Xr as deepMerge,
  ei as defaultChartFamilies,
  P0 as defaultForType,
  Lo as defaultFormatter,
  Zn as familyKeyOf,
  Qu as fetchMeta,
  ct as findCube,
  $e as findMember,
  ww as formatCategory,
  un as formatDateValue,
  Gv as geoPointId,
  Yv as grainAggLabel,
  Ds as granularitiesForSpan,
  Es as granularityOptionsFor,
  _f as heatmapChartFamily,
  Bt as isEmptyValue,
  _e as isVarRef,
  xf as kpiChartFamily,
  Sf as lineChartFamily,
  br as listCubes,
  Ft as listMembers,
  Ku as loadSpec,
  Eo as looksLikeIsoDate,
  Vo as makeChartFormat,
  bw as makeDateFormatter,
  Cw as makeFormatter,
  di as memberAgg,
  qv as memberAggDefault,
  Dn as memberCanonicalTime,
  er as memberFamilyTitle,
  ml as memberGroup,
  Wb as mergeLayout,
  fr as mergeUnitConversions,
  M0 as newChartWidget,
  A0 as newInputWidget,
  F0 as newTextWidget,
  O0 as newVariable,
  $0 as newWidget,
  Ts as normalize,
  zv as pathLabel,
  qb as pickCanonicalLayout,
  Rf as pieChartFamily,
  Kb as placeNewItem,
  Lp as quantityLabel,
  ri as rangeSpanDays,
  Qb as removeWidget,
  Xb as replaceWidget,
  jp as resolveChart,
  Os as resolveMarkTheme,
  Af as resolveOptions,
  Sd as resolveOptionsWith,
  Ls as resolveQuery,
  Qf as resolveRelativeDateRange,
  Is as resolveSeriesColors,
  Jf as resolveValue,
  vw as safeLoadSpec,
  Nf as scatterChartFamily,
  Mf as tableChartFamily,
  ts as toDate,
  zf as toResultAnnotation,
  Hb as useChartEditorState,
  is as useChartInteractions,
  Ws as useContainerWidth,
  bt as useCubeMeta,
  Bs as useCubeQuery,
  We as useCubeVizContext,
  qs as useDashboard,
  Wl as useDebouncedCallback,
  hr as useDisplayUnit,
  yt as useFamilyRegistry,
  Rw as useFormatter,
  Er as useNormalizedSeries,
  Rn as useOptionalDashboard,
  yw as validateSpec
};
//# sourceMappingURL=index.js.map
