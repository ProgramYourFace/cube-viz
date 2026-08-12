var As = Object.defineProperty;
var Ds = (e, t, n) => t in e ? As(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ta = (e, t, n) => Ds(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as v, Fragment as me } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as Z, createContext as Ci, useContext as Vr, useState as Ct, useCallback as Ge, useEffect as an, useRef as st, createElement as Ls, useSyncExternalStore as Si, useId as Es, Component as Is } from "react";
import { ruleX as Mi, ruleY as xi, text as Xt, colorLegend as jr, group as Fs, stack as Ti, barX as _a, barY as Ra, lineX as Ps, lineY as In, defineChart as et, areaY as fr, dot as _i, cell as $s } from "@tanstack/charts";
import { crosshair as Ri } from "@tanstack/charts/crosshair";
import { scaleBand as zs } from "@tanstack/charts/scales/band";
import { scaleLinear as yn } from "@tanstack/charts/scales/linear";
import { scalePoint as Vs } from "@tanstack/charts/scales/point";
import { Chart as js } from "@tanstack/charts/react/core";
import { motion as Oi } from "@tanstack/charts/motion";
import { tooltip as Wr } from "@tanstack/charts/tooltip";
import { d3Curve as Zn } from "@tanstack/charts/d3/shape";
import { brushX as Ws } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Bs } from "@tanstack/charts/interaction/signal";
import { scaleUtc as qs, scaleLog as Oa, scaleSqrt as Us } from "d3-scale";
import { curveNatural as Hs, curveStepAfter as Ks, curveMonotoneX as Gs } from "d3-shape";
import { format as fe, isValid as Ft, parseISO as kn, subDays as ke, startOfWeek as wn, endOfWeek as Nn, startOfMonth as lt, endOfMonth as qt, startOfQuarter as ct, endOfQuarter as Ut, startOfYear as ut, endOfYear as Ht, subWeeks as hr, subMonths as mt, subQuarters as dt, subYears as ft, differenceInCalendarDays as Ys, parse as Ai } from "date-fns";
import { z as f } from "zod";
import { clsx as Qs } from "clsx";
import { Minus as Di, ArrowUp as Fn, ArrowDown as Pn, CalendarRange as Li, ChevronsUpDown as Js, AreaChart as Xs, BarChart3 as Ei, Grid3X3 as Zs, Table as el, Gauge as tl, ScatterChart as nl, PieChart as rl, LineChart as al, AlertCircle as Br, ChevronLeft as qr, ChevronRight as on, ChevronDown as tt, Check as nt, ChevronUp as il, CalendarIcon as Ii, MoreVertical as ol, RefreshCw as sl, Image as ll, Sheet as cl, Type as Ur, MapPin as Fi, Hash as pr, Calendar as Pi, Search as ul, ListChecks as ml, Table2 as $i, Database as zi, Layers as Hr, Variable as dl, Plus as St, Trash2 as Ot, ListFilter as fl, Box as Vi, EyeOff as hl, Eye as pl, X as Aa, Save as ji, SlidersHorizontal as gl, Braces as vl, Undo2 as bl, Redo2 as yl, RotateCcw as kl, Pencil as wl, Copy as Nl, Bold as Cl, Italic as Sl, Strikethrough as Ml, Heading1 as xl, Heading2 as Tl, List as _l, ListOrdered as Rl, Quote as Ol } from "lucide-react";
import * as Cn from "@radix-ui/react-popover";
import { cva as Kr } from "class-variance-authority";
import * as Ne from "@radix-ui/react-select";
import Al from "@cubejs-client/core";
import { DayPicker as Dl, useDayPicker as Ll } from "react-day-picker";
import { pie as El, radialArc as gr, radialText as er, polar as Wi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as Bi } from "react-grid-layout";
import { useEditor as qi, EditorContent as Ui } from "@tiptap/react";
import Hi from "@tiptap/starter-kit";
const wt = 4, Sn = f.object({ var: f.string().min(1) }).strict();
function Me(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Mn = (e) => f.union([e, Sn]), Il = f.union([f.string(), f.number(), f.boolean()]), Qe = f.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), vr = f.union([f.tuple([f.string(), f.string()]), f.string()]), Ki = f.union([
  f.string(),
  f.number(),
  f.boolean(),
  f.tuple([f.string(), f.string()]),
  // absolute date range
  f.array(f.string()),
  f.array(f.number())
]), le = f.string().min(1), Fl = f.enum([
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
]), Pl = f.object({
  member: le,
  operator: Fl,
  values: f.array(f.union([Il, Sn])).optional()
}).strict(), br = f.lazy(
  () => f.union([
    Pl,
    f.object({ and: f.array(br) }).strict(),
    f.object({ or: f.array(br) }).strict()
  ])
), $l = f.object({
  dimension: le,
  granularity: Mn(Qe).optional(),
  dateRange: Mn(vr).optional(),
  compareDateRange: f.array(vr).optional()
}).strict(), Da = f.enum(["asc", "desc"]), zl = f.union([
  f.record(le, Da),
  f.array(f.tuple([le, Da]))
]), Gi = f.object({
  measures: f.array(le).optional(),
  dimensions: f.array(le).optional(),
  timeDimensions: f.array($l).optional(),
  filters: f.array(br).optional(),
  segments: f.array(le).optional(),
  order: zl.optional(),
  limit: Mn(f.number()).optional(),
  offset: Mn(f.number()).optional(),
  total: f.boolean().optional(),
  timezone: f.string().optional()
}).strict(), Vl = f.string().min(1), Db = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Je = f.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), jl = f.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Gr = f.object({
  kind: jl.optional(),
  decimals: f.number().optional(),
  abbreviate: f.boolean().optional(),
  prefix: f.string().optional(),
  suffix: f.string().optional(),
  unitSystem: f.enum(["metric", "imperial"]).optional(),
  dateFormat: f.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: f.string().optional()
}).strict(), La = f.object({
  label: f.string().optional(),
  colorToken: Je.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: f.string().optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: f.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: f.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), Wl = f.object({
  category: f.object({ member: le }).strict(),
  series: f.union([
    f.object({
      mode: f.literal("measures"),
      members: f.array(le),
      meta: f.record(le, La).optional()
    }).strict(),
    f.object({
      mode: f.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: le,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: f.array(le).optional(),
      pivot: le,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: f.record(le, La).optional()
    }).strict()
  ])
}).strict(), Bl = f.object({
  show: f.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: f.enum(["top", "bottom"]).optional()
}).strict(), ql = f.object({
  show: f.boolean().optional(),
  indicator: f.enum(["dot", "line", "dashed"]).optional(),
  showTotal: f.boolean().optional()
}).strict(), Ea = f.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: f.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: f.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: f.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: f.tuple([f.number(), f.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Gr.optional()
}).strict(), Ul = f.object({
  x: Ea.optional(),
  y: Ea.optional()
}).strict(), Hl = f.object({
  byKey: f.record(f.string(), Je).optional(),
  ramp: f.array(Je).optional()
}).strict(), fn = 7, Kl = f.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Gl = f.object({
  kind: Kl,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: f.number().int().min(2).max(90).optional()
}).strict(), Yi = f.object({
  family: Vl,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Wl.optional(),
  orientation: f.enum(["vertical", "horizontal"]).optional(),
  stackMode: f.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Bl.optional(),
  tooltip: ql.optional(),
  axes: Ul.optional(),
  colors: Hl.optional(),
  format: Gr.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: Gl.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: f.record(f.string(), f.unknown()).optional()
}).strict(), Yl = f.object({ type: f.string(), content: f.array(f.unknown()).optional() }).passthrough(), Ql = f.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Jl = f.object({
  variable: f.string().min(1),
  control: f.discriminatedUnion("kind", [
    f.object({
      kind: f.literal("dateRange"),
      presets: f.array(f.string()).optional(),
      allowFuture: f.boolean().optional()
    }).strict(),
    f.object({
      kind: f.literal("granularity"),
      options: f.array(Qe).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: f.string().optional()
    }).strict(),
    f.object({
      kind: f.literal("select"),
      options: f.array(f.object({ value: Ki, label: f.string() }).strict()),
      multiple: f.boolean().optional()
    }).strict(),
    f.object({
      kind: f.literal("memberSelect"),
      from: f.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: f.string().optional()
    }).strict(),
    f.object({ kind: f.literal("text"), placeholder: f.string().optional() }).strict(),
    f.object({
      kind: f.literal("number"),
      min: f.number().optional(),
      max: f.number().optional(),
      step: f.number().optional()
    }).strict(),
    f.object({ kind: f.literal("toggle") }).strict()
  ])
}).strict(), Yr = {
  id: f.string().min(1),
  title: f.string().optional()
}, Xl = f.object({ ...Yr, type: f.literal("chart"), query: Gi.default({}), chart: Yi }).strict(), Zl = f.object({ ...Yr, type: f.literal("text"), doc: Yl }).strict(), ec = f.object({ ...Yr, type: f.literal("input"), control: Jl }).strict(), tc = f.discriminatedUnion("type", [
  Xl,
  Zl,
  ec
]), nc = f.object({
  i: f.string(),
  x: f.number(),
  y: f.number(),
  w: f.number(),
  h: f.number(),
  minW: f.number().optional(),
  minH: f.number().optional(),
  static: f.boolean().optional()
}).strict(), rc = f.object({
  cols: f.number().optional(),
  rowHeight: f.number().optional(),
  margin: f.tuple([f.number(), f.number()]).optional(),
  containerPadding: f.tuple([f.number(), f.number()]).optional()
}).strict(), Qi = f.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), ac = f.object({
  name: f.string().min(1),
  type: Qi,
  label: f.string().optional(),
  array: f.boolean().optional(),
  default: Ki.optional()
}).strict(), Ji = {
  schemaVersion: f.literal(wt),
  id: f.string().min(1),
  name: f.string().optional(),
  description: f.string().optional(),
  createdAt: f.string().optional(),
  updatedAt: f.string().optional()
}, Xi = f.object({ ...Ji, kind: f.literal("chart"), query: Gi.default({}), chart: Yi }).strict(), yr = f.object({
  ...Ji,
  kind: f.literal("dashboard"),
  variables: f.array(ac),
  widgets: f.array(tc),
  layout: f.array(nc),
  grid: rc.optional()
}).strict(), Zi = f.discriminatedUnion("kind", [Xi, yr]);
function ne(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function rt(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function ic(e) {
  if (!ne(e.axes)) return;
  const t = rt(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function oc(e) {
  if (!ne(e.mapping)) return;
  const t = e.mapping.series;
  if (!ne(t) || !ne(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!ne(a)) continue;
    const i = rt(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function sc(e) {
  if (!ne(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => ne(n) ? rt(n, "side") ?? {} : n
  ));
}
function lc(e) {
  const t = ne(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(ne) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = ne(e.mapping) ? e.mapping : void 0, a = r && ne(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = ne(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function Ia(e) {
  ne(e) && (e.family === "combo" && lc(e), ic(e), oc(e), sc(e));
}
function cc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ia(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ne(n) && n.type === "chart" && Ia(n.chart);
  return t;
}
function uc(e) {
  if (!ne(e.mapping)) return;
  const t = e.mapping.series;
  if (!ne(t) || !ne(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!ne(a)) continue;
    const i = rt(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function mc(e) {
  if (!ne(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function dc(e) {
  if (ne(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!ne(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = rt(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function fc(e) {
  if (!ne(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = rt(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Fa(e) {
  ne(e) && (uc(e), mc(e), dc(e), fc(e));
}
function hc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Fa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ne(n) && n.type === "chart" && Fa(n.chart);
  return t;
}
const pc = {
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
function gc(e) {
  if (!ne(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = pc[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = rt(r, a) ?? {};
  e.familyOptions = r;
}
function vc(e) {
  if (ne(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!ne(n) || n.labelHide !== !0) continue;
      const r = rt(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function Pa(e) {
  ne(e) && (gc(e), vc(e));
}
function bc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Pa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ne(n) && n.type === "chart" && Pa(n.chart);
  return t;
}
const yc = {
  1: cc,
  2: hc,
  3: bc
};
function kc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > wt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${wt} — update the library`
    );
  for (; n < wt; ) {
    const r = yc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return Zi.parse(t);
}
function Lb(e) {
  try {
    return { ok: !0, spec: kc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Eb(e) {
  return Zi.parse(e);
}
function wc(e) {
  return Al(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Nc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function R(...e) {
  return Qs(e);
}
function Cc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: R("cv-skeleton", e), ...t });
}
const Sc = Kr(
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
), $n = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: R(Sc({ variant: t }), e),
    ...n
  }
));
$n.displayName = "Alert";
const zn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: R("cv-alert-title", e),
      ...t
    }
  )
);
zn.displayName = "AlertTitle";
const Vn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: R("cv-alert-description", e),
      ...t
    }
  )
);
Vn.displayName = "AlertDescription";
const Mc = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, xc = "MMM d, yyyy";
function eo(e) {
  if (e instanceof Date) return Ft(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Ft(r) ? r : null;
  }
  const t = kn(e);
  if (Ft(t)) return t;
  const n = new Date(e);
  return Ft(n) ? n : null;
}
function Qr(e) {
  return /^\d{4}-\d{2}/.test(e) ? Ft(kn(e)) : !1;
}
function Tc(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Mc[t] : xc;
}
function Kt(e, t, n) {
  const r = eo(e);
  return r ? fe(r, Tc(t, n)) : String(e);
}
function Ib(e, t) {
  return (n) => n == null ? "" : Kt(n, e, t);
}
function Fb(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Kt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Kt(e, t.format, t.granularity) : String(e) : Qr(e) ? Kt(e, t.format, t.granularity) : e;
}
const $a = "—", _c = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function za(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Rc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of _c)
    if (n >= r) return za((e / r).toFixed(t)) + a;
  return za(e.toFixed(t));
}
function Oc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Ac(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Rc(e, n.decimals ?? 1) : Oc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function to(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Dc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || to(e.value) ? !0 : typeof e.value == "string" ? Qr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Jr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? $a : (to(t) || typeof t == "string" || typeof t == "number") && Dc(e) ? Kt(t, n, r) : typeof t == "number" ? Ac(t, e) : String(t);
};
function Lc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Pb(e, t) {
  return (n, r) => {
    const a = r ? Lc(r, t) : void 0;
    return Jr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Ec(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ic(e) {
  const t = Qe.safeParse(e);
  return t.success ? t.data : void 0;
}
function Fc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Ic(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Xr(e, t, n, r) {
  const a = Fc(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : Xr(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, u = "value") {
      const c = s ? Ec(s, e) : void 0, m = c == null ? void 0 : c.meta;
      return n({
        value: o,
        member: s,
        meta: m,
        title: (c == null ? void 0 : c.shortTitle) ?? (c == null ? void 0 : c.title),
        role: u,
        format: t.format,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    },
    category(o) {
      return n({
        value: o,
        role: "category",
        format: t.format,
        granularity: a,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    }
  };
  return i;
}
const jn = f.object({
  axis: f.enum(["x", "y"]),
  value: f.number(),
  label: f.string().optional(),
  colorToken: Je.optional()
}).strict(), Zr = f.boolean().optional(), Pc = f.object({
  showValueLabels: f.boolean().optional(),
  referenceLines: f.array(jn).optional(),
  comparePrevious: Zr
}).strict(), no = f.enum(["linear", "monotone", "step", "natural"]), $c = f.object({
  curve: no.optional(),
  dots: f.union([f.boolean(), f.literal("active")]).optional(),
  connectNulls: f.boolean().optional(),
  chrome: f.enum(["full", "none"]).optional(),
  referenceLines: f.array(jn).optional(),
  showValueLabels: f.boolean().optional(),
  comparePrevious: Zr
}).strict(), zc = f.object({
  curve: no.optional(),
  connectNulls: f.boolean().optional(),
  dots: f.boolean().optional(),
  referenceLines: f.array(jn).optional(),
  comparePrevious: Zr
}).strict(), Vc = f.object({
  innerRadiusPct: f.number().optional(),
  showLabels: f.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: f.object({ value: f.string().optional(), label: f.string().optional() }).strict().optional(),
  maxSlices: f.number().optional()
}).strict(), jc = f.object({
  x: le,
  y: le,
  size: le.optional(),
  groupBy: le.optional(),
  referenceLines: f.array(jn).optional()
}).strict(), Wc = f.object({
  display: f.enum(["number", "gauge"]).optional(),
  measure: le,
  comparison: f.object({
    mode: f.enum(["previousPeriod", "value"]),
    value: f.union([le, f.number()]).optional(),
    showAsPercent: f.boolean().optional(),
    goodDirection: f.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: f.object({
    member: le.optional(),
    timeDimension: le.optional(),
    granularity: f.union([Qe, Sn]).optional(),
    dateRange: f.union([vr, Sn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: f.enum(["up", "down"]).optional(),
  gauge: f.object({
    min: f.number().optional(),
    max: f.number(),
    thresholds: f.array(f.object({ at: f.number(), colorToken: Je }).strict()).optional()
  }).strict().optional()
}).strict(), Bc = f.object({
  member: le,
  label: f.string().optional(),
  format: Gr.optional(),
  align: f.enum(["left", "right", "center"]).optional(),
  width: f.number().optional(),
  hidden: f.boolean().optional()
}).strict(), qc = f.object({
  member: le,
  when: f.object({
    op: f.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: f.number()
  }).strict(),
  colorToken: Je.optional()
}).strict(), Uc = f.object({
  columns: f.array(Bc).optional(),
  pageSize: f.number().optional(),
  conditionalFormat: f.array(qc).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), Hc = f.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Je.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), We = {
  bar: Pc,
  line: $c,
  area: zc,
  pie: Vc,
  scatter: jc,
  heatmap: Hc,
  kpi: Wc,
  table: Uc
}, Be = {
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
function Va(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function kr(e, t) {
  if (t === void 0) return e;
  if (!Va(e) || !Va(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? kr(e[r], a) : a);
  }
  return n;
}
const Kc = { envelope: {}, familyOptions: {} };
function Gc(e, t) {
  return {
    ...kr({ ...t.envelope }, e),
    familyOptions: kr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const ro = {}, ja = () => {
}, Yc = {
  target: ro,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: ja,
  emitPoint: ja
}, xn = b.createContext(null);
xn.displayName = "ChartInteractionContext";
function ao() {
  return b.useContext(xn) ?? Yc;
}
function ea({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(xn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((p) => {
    const { parent: y, widgetId: k, onRangeSelect: w } = o.current, N = p && p.widgetId === void 0 && k !== void 0 ? { ...p, widgetId: k } : p;
    w ? w(N) : y == null || y.emitRange(N);
  }, []), u = b.useCallback((p) => {
    const { parent: y, widgetId: k, onPointSelect: w } = o.current, N = p && p.widgetId === void 0 && k !== void 0 ? { ...p, widgetId: k } : p;
    w ? w(N) : y == null || y.emitPoint(N);
  }, []), c = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), d = i == null ? void 0 : i.target, g = b.useMemo(
    () => d || r ? { ...d, ...r } : ro,
    [d, r]
  ), h = b.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: g,
      rangeEnabled: c,
      pointEnabled: m,
      emitRange: s,
      emitPoint: u
    }),
    [e, i == null ? void 0 : i.widgetId, g, c, m, s, u]
  );
  return /* @__PURE__ */ l(xn.Provider, { value: h, children: a });
}
function Ke(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var s, u, c;
    const o = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const m of n) {
      const d = m.data[i] ?? null;
      d === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: d,
        key: m.key,
        label: m.label,
        member: ((u = m.meta) == null ? void 0 : u.measure) ?? m.key,
        companion: ((c = m.meta) == null ? void 0 : c.companion) ?? !1,
        i
      });
    }
  }), r;
}
function wr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function io(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = wr(n), a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function Nr(e, t, n) {
  const r = [];
  return e.categories.forEach((a, i) => {
    var m, d, g;
    const o = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const h of t) {
      const p = h.data[i];
      if (typeof p == "number" && Number.isFinite(p)) {
        const y = wr(h);
        s.set(y, (s.get(y) ?? 0) + Math.abs(p));
      }
    }
    const u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
    for (const h of t) {
      const p = h.data[i] ?? null, y = wr(h), k = s.get(y) ?? 0, w = p === null || k === 0 ? null : Math.abs(p) / k;
      let N = 0, M = 0;
      if (p !== null) {
        const x = p < 0 ? c : u;
        N = x.get(y) ?? 0, M = N + p, x.set(y, M);
      }
      const S = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: p,
        key: h.key,
        label: h.label,
        member: ((d = h.meta) == null ? void 0 : d.measure) ?? h.key,
        companion: ((g = h.meta) == null ? void 0 : g.companion) ?? !1,
        i,
        stack: y,
        y1: N * S,
        y2: M * S,
        share: w
      });
    }
  }), r;
}
function Cr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Zt(e) {
  return e.label || e.key;
}
function He(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ta(e, t) {
  const n = e.series.map(Zt), r = e.series.map(He), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = jr({ placement: At(t.legendPlacement) })), a;
}
function At(e) {
  return e === "top" ? "top" : "bottom";
}
function sn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Tn(e = 0.2) {
  return zs().padding(e);
}
function oo() {
  return Vs().padding(0.02);
}
const Qc = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Jc(e) {
  if (typeof e == "string" && Qc.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return eo(e);
}
function so(e) {
  return e.toISOString().slice(0, -1);
}
function Wa(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Qe.safeParse(n);
  return r.success ? r.data : void 0;
}
function lo(e, t) {
  var m, d, g;
  const n = (d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member, r = (g = e.raw.annotation) == null ? void 0 : g.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const h of Object.keys(r))
    if (h === n || h.startsWith(`${n}.`)) {
      a = h;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? Wa(n) : Wa(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const h of e.categories) {
    if (typeof h == "number" && i === void 0 || typeof h == "string" && !Qr(h)) return null;
    const p = Jc(h);
    if (!p) return null;
    s.push(p);
  }
  const u = /* @__PURE__ */ new Set(), c = s.filter((h) => u.has(h.getTime()) ? !1 : (u.add(h.getTime()), !0)).sort((h, p) => h.getTime() - p.getTime());
  return c.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: c };
}
function co(e) {
  return e ? qs : oo;
}
function na(e) {
  return e ? "t" : "cat";
}
function _n(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? so(r)) : t.category(r);
}
function Ba(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : so(t);
}
function uo(e, t) {
  const n = ao(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, u = (h) => h !== void 0 && s.some((p) => p.getTime() === h.getTime()), c = r && u(r.start) && u(r.end) ? r : null, m = s[0], d = c ?? { start: m, end: m }, g = c === null;
    return [
      Ws({
        id: "cv-brush-x",
        values: s,
        range: Bs(
          d,
          (h, { reason: p }) => {
            if (p.type !== "commit") return;
            const y = i.current.temporal, k = h.start.getTime() === h.end.getTime();
            if (a(k ? null : h), k || !y) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: y.member,
              granularity: y.granularity,
              from: Ba(y, h.start),
              to: Ba(y, h.end)
            });
          }
        ),
        format: (h) => i.current.opts.label(h),
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
  }, [o, e, r]);
}
function Xc(e, t) {
  var o;
  if (!e) return null;
  const n = e.datum;
  if (!n || typeof n != "object") return null;
  const r = typeof n.key == "string" ? n.key : void 0, a = typeof n.label == "string" ? n.label : void 0;
  if (t.pivotMember && r !== void 0 && e.group !== null)
    return { member: t.pivotMember, value: r, label: a ?? r };
  if (!t.categoryMember) return null;
  const i = n.cat;
  return typeof i == "string" || typeof i == "number" ? {
    member: t.categoryMember,
    value: i,
    label: ((o = t.formatCategory) == null ? void 0 : o.call(t, i)) ?? String(i)
  } : a !== void 0 ? { member: t.categoryMember, value: a, label: a } : null;
}
function Mt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? Oa().domain(r) : Oa();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: yn().domain(r), nice: !1 } : { scale: yn, nice: !0 };
}
function Sr(e, t) {
  var n;
  return ((n = e.meta) == null ? void 0 : n.curve) ?? t;
}
function mo(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function ht(e) {
  switch (e) {
    case "monotone":
      return Zn(Gs);
    case "step":
      return Zn(Ks);
    case "natural":
      return Zn(Hs);
    default:
      return;
  }
}
function xt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ra(e, t) {
  var o, s, u, c;
  const n = e.raw.annotation, r = (m) => {
    var d, g, h, p, y, k;
    if (m)
      return ((d = n == null ? void 0 : n.measures[m]) == null ? void 0 : d.shortTitle) ?? ((g = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : g.shortTitle) ?? ((h = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : h.shortTitle) ?? ((p = n == null ? void 0 : n.measures[m]) == null ? void 0 : p.title) ?? ((y = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : y.title) ?? ((k = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : k.title) ?? m;
  }, a = e.series[0], i = (m) => {
    var d;
    return m ? (d = m.meta) != null && d.measure ? r(m.meta.measure) : m.label : void 0;
  };
  return {
    x: xt((o = t.axes) == null ? void 0 : o.x, r((u = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : u.member)),
    y: xt((c = t.axes) == null ? void 0 : c.y, i(a))
  };
}
function Ee(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function aa(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Zc(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function Xe(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function ia(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Wn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Wr,
    className: ia(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((d) => {
        var g;
        return { datum: d, color: (g = e.colorOf) == null ? void 0 : g.call(e, d) };
      }) : a.map((d) => ({ datum: d.datum, color: d.color }));
      let u = 0, c = 0;
      if (e.percentShare || e.showTotal)
        for (const d of s) {
          const g = d.datum.value;
          d.datum.companion || typeof g != "number" || !Number.isFinite(g) || (u += g, c += 1);
        }
      const m = s.map((d) => ({
        label: d.datum.label,
        value: e.percentShare && u > 0 && typeof d.datum.value == "number" ? Xe(d.datum.value / u, e.locale) : n(d.datum),
        color: d.color
      }));
      return e.showTotal && c > 1 && m.push({
        label: "Total",
        value: e.percentShare ? Xe(1, e.locale) : e.format.value(u, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: m };
    }
  };
}
function oa(e) {
  return {
    ...e,
    initialize: (t) => {
      const n = e.initialize(t), r = n.render;
      return {
        ...n,
        render: (a) => ({ ...r(a), points: [] })
      };
    }
  };
}
function sa(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], a = t[0];
  return e.forEach((i, o) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, u = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, c = i.axis === "x", m = c ? t[i.value] : void 0;
    if (c && m == null) return;
    const d = n != null && n.swap ? !c : c, g = d ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      d ? Mi([g], { id: `cv-ref-${o}`, ...u }) : xi([g], { id: `cv-ref-${o}`, ...u })
    ), !i.label) return;
    const h = c ? n == null ? void 0 : n.valueAnchor : a;
    if (h == null) return;
    const p = (n == null ? void 0 : n.swap) === !0;
    r.push(
      oa(
        Xt(
          [
            {
              x: d ? g : h,
              y: d ? h : g,
              label: i.label
            }
          ],
          {
            id: `cv-ref-label-${o}`,
            x: "x",
            y: "y",
            text: "label",
            fill: s,
            fontSize: 10,
            // Sit just clear of the rule: above a horizontal rule, just right of a
            // vertical one (mirroring the old Recharts label offsets).
            dy: d ? p ? -6 : 8 : -6,
            dx: d ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function la(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function fo(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = na((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const u = s.share;
    return typeof u == "number" ? Xe(u, n.locale) : "";
  };
  return [
    oa(
      Xt(r, {
        id: "cv-value-labels",
        x: n != null && n.swap ? i : a,
        y: n != null && n.swap ? a : i,
        text: o,
        fill: "currentColor",
        fontSize: 10,
        dy: n != null && n.swap ? 0 : -8,
        dx: n != null && n.swap ? 12 : 0
      })
    )
  ];
}
const eu = Oi({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), tu = Oi({ initial: !1 });
function at({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const u = b.useRef(null), c = ao(), m = c.pointEnabled && !r, d = b.useRef(s);
  b.useLayoutEffect(() => {
    d.current = s;
  });
  const g = b.useCallback(
    (w) => {
      if (w === null) {
        c.emitPoint(null);
        return;
      }
      const N = d.current, M = N ? N(w) : Xc(w, c.target);
      M && c.emitPoint(M);
    },
    [c]
  ), [h, p] = b.useState({ w: 0, h: 0 }), y = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = u.current;
    if (!w || typeof ResizeObserver > "u") return;
    const N = new ResizeObserver((M) => {
      var x;
      const S = (x = M[0]) == null ? void 0 : x.contentRect;
      S && p({ w: Math.floor(S.width), h: Math.floor(S.height) });
    });
    return N.observe(w), () => N.disconnect();
  }, []);
  const k = r ? Math.max(24, h.h || Math.round((h.w || 160) / 5)) : Math.max(i, h.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: u,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: h.w > 0 && /* @__PURE__ */ l(
        js,
        {
          definition: e,
          renderer: a ? eu : tu,
          width: h.w,
          height: k,
          ariaLabel: t,
          idPrefix: y,
          onSelect: o ?? (m ? g : void 0)
        }
      )
    }
  );
}
function nu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var K, re, ae, ue, $, H, G, oe, ie, se, P, E;
    const s = t.orientation === "horizontal", u = t.stackMode === "percent", c = t.stackMode === "stacked" || u, m = e.series.filter((C) => {
      var O;
      return (O = C.meta) == null ? void 0 : O.companion;
    }), d = m.length ? e.series.filter((C) => {
      var O;
      return !((O = C.meta) != null && O.companion);
    }) : e.series, g = c ? d : e.series, p = (c ? io(g) : []).length > 1, y = p ? Nr(e, g, { normalize: u }) : Ke(e, { series: g }), k = new Map(e.series.map((C) => [Zt(C), He(C)])), w = /* @__PURE__ */ new Map();
    if (p)
      for (const C of y) {
        const O = w.get(C.i);
        O ? O.push(C) : w.set(C.i, [C]);
      }
    const N = ra(e, t), M = s ? (re = (K = t.axes) == null ? void 0 : K.y) == null ? void 0 : re.hide : (ue = (ae = t.axes) == null ? void 0 : ae.x) == null ? void 0 : ue.hide, S = s ? ($ = t.axes) == null ? void 0 : $.x : (H = t.axes) == null ? void 0 : H.y, x = Mt(S), _ = r.barCategoryGap, A = s ? (G = t.axes) == null ? void 0 : G.y : (oe = t.axes) == null ? void 0 : oe.x, q = Ee(n, A), j = Ee(n, S), L = Zc(t) ?? aa(e.series[0]), D = (C) => u ? Xe(C) : j.value(C, L, "axis"), T = M ? !1 : {
      label: N.x,
      ticks: { format: (C) => q.category(C) }
    }, F = S != null && S.hide ? !1 : { label: N.y, ticks: { format: D } }, B = Fs({ padding: r.barGap }), te = p ? B : u ? Ti({ offset: "normalize" }) : c ? void 0 : B, z = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (C) => p ? C.stack : C.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (C) => `${C.label} ${C.i}`,
      layout: te,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (C) => {
        const O = k.get(C.label) ?? "var(--chart-1)";
        return C.companion ? `color-mix(in oklab, ${O} 40%, transparent)` : O;
      }
    }, J = [
      p ? s ? _a(y, { ...z, x1: "y1", x2: "y2", y: "cat" }) : Ra(y, { ...z, x: "cat", y1: "y1", y2: "y2" }) : s ? _a(y, { ...z, x: "value", y: "cat" }) : Ra(y, { ...z, x: "cat", y: "value" })
    ];
    if (c && !u && m.length) {
      const C = e.categories.map((O, V) => {
        var I, W, Y;
        return {
          cat: typeof O == "number" ? O : String(O),
          value: m.reduce((ce, ye) => {
            const je = ye.data[V];
            return typeof je != "number" ? ce : (ce ?? 0) + je;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((W = (I = m[0]) == null ? void 0 : I.meta) == null ? void 0 : W.measure) ?? ((Y = m[0]) == null ? void 0 : Y.key),
          companion: !0,
          i: V
        };
      });
      if (C.some((O) => O.value !== null)) {
        const O = {
          id: "cv-bars-prev",
          key: (V) => `prev ${V.i}`,
          curve: ht("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        J.push(
          s ? Ps(C, { ...O, x: "value", y: "cat" }) : In(C, { ...O, x: "cat", y: "value" })
        );
      }
    }
    if (J.push(
      ...sa(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: la(e)
      })
    ), a.showValueLabels) {
      const C = c ? p ? y : Nr(e, g, { normalize: u }) : y;
      J.push(
        ...fo(C, n, {
          swap: s,
          share: u,
          stacked: c
        })
      );
    }
    return et({
      marks: J,
      x: s ? { scale: x.scale, nice: x.nice, grid: !0, axis: F } : { scale: () => Tn(_), axis: T },
      y: s ? { scale: () => Tn(_), axis: T } : { scale: x.scale, nice: x.nice, grid: !0, axis: F },
      color: ta(c ? { ...e, series: g } : e, {
        legend: sn(t) && g.length > 1,
        legendPlacement: At((ie = t.legend) == null ? void 0 : ie.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((se = t.tooltip) == null ? void 0 : se.show) === !1 ? void 0 : Wn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: u && !p,
        value: u && p ? (C) => {
          const O = C.share;
          return typeof O == "number" ? Xe(O) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: p ? (C) => w.get(C.i) ?? [C] : void 0,
        colorOf: p ? (C) => k.get(C.label) ?? "var(--chart-1)" : void 0,
        indicator: (P = t.tooltip) == null ? void 0 : P.indicator,
        showTotal: (E = t.tooltip) == null ? void 0 : E.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(Zt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(at, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function ru({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var h;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : lo(e, t),
    [e, t, i]
  ), s = b.useMemo(() => _n(o, n), [o, n]), u = (h = t.axes) == null ? void 0 : h.x, c = b.useMemo(
    () => u != null && u.tickFormat ? _n(o, Ee(n, u)) : s,
    [o, n, u, s]
  ), m = uo(o, {
    label: s,
    ariaLabel: "Time range"
  }), d = b.useMemo(() => {
    var x, _, A, q, j, L, D, T, F;
    const p = na(o), y = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = ra(e, t), N = Mt((x = t.axes) == null ? void 0 : x.y), M = e.categories.length <= 1, S = e.series.map((B) => {
      var z, J, K;
      const te = Ke(e, { series: [B], skipNull: y, temporal: o });
      return In(te, {
        id: `cv-line-${B.key}`,
        x: p,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        // Per-series shape wins over the family default: the shape picker on a
        // field pill writes `meta.curve`, and reading only `fo.curve` here made
        // that control do nothing.
        curve: ht(Sr(B, k)),
        strokeWidth: r.lineWidth,
        strokeDasharray: (z = B.meta) != null && z.companion ? "5 4" : void 0,
        strokeOpacity: (J = B.meta) != null && J.companion ? 0.55 : void 0,
        stroke: He(B),
        points: !i && !((K = B.meta) != null && K.companion) && (mo(B, a.dots) || M)
      });
    });
    return i || (S.push(
      ...sa(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: la(e)
      }),
      ...fo(
        a.showValueLabels ? Ke(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), S.push(Ri({ x: {}, y: !1, marker: a.dots !== !1 }))), et({
      marks: S,
      x: {
        scale: co(o),
        axis: i || (A = (_ = t.axes) == null ? void 0 : _.x) != null && A.hide ? !1 : {
          label: w.x,
          ticks: { format: c }
        }
      },
      y: {
        scale: N.scale,
        nice: N.nice,
        grid: !i,
        axis: i || (j = (q = t.axes) == null ? void 0 : q.y) != null && j.hide ? !1 : {
          label: w.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (B) => {
              var te, z, J, K;
              return Ee(n, (te = t.axes) == null ? void 0 : te.y).value(
                B,
                ((J = (z = e.series[0]) == null ? void 0 : z.meta) == null ? void 0 : J.measure) ?? ((K = e.series[0]) == null ? void 0 : K.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ta(e, {
        legend: !i && sn(t) && e.series.length > 1,
        legendPlacement: At((L = t.legend) == null ? void 0 : L.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((D = t.tooltip) == null ? void 0 : D.show) === !1 ? void 0 : Wn({
        format: n,
        category: s,
        indicator: (T = t.tooltip) == null ? void 0 : T.indicator,
        showTotal: (F = t.tooltip) == null ? void 0 : F.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, a, r, i, o, s, c, m]), g = e.series.map(Zt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    at,
    {
      definition: d,
      ariaLabel: g,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function au({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, N;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", u = o === "percent", c = b.useMemo(() => lo(e, t), [e, t]), m = b.useMemo(() => _n(c, n), [c, n]), d = (N = t.axes) == null ? void 0 : N.x, g = b.useMemo(
    () => d != null && d.tickFormat ? _n(c, Ee(n, d)) : m,
    [c, n, d, m]
  ), h = uo(c, { label: m, ariaLabel: "Time range" }), p = b.useMemo(() => {
    var re, ae, ue, $, H, G, oe, ie, se;
    const M = na(c), S = a.connectNulls ?? !1, x = a.curve ?? "monotone", _ = ht(x), A = r.areaFillOpacity, q = r.lineWidth, j = ra(e, t), L = Mt((re = t.axes) == null ? void 0 : re.y), D = aa(e.series[0]), T = e.series.filter((P) => {
      var E;
      return !((E = P.meta) != null && E.companion);
    }), F = u ? [] : e.series.filter((P) => {
      var E;
      return (E = P.meta) == null ? void 0 : E.companion;
    }), B = new Map(e.series.map((P) => [P.key, He(P)])), te = [], z = (P) => `cv-area-fill-${P.replace(/[^a-zA-Z0-9_-]/g, "-")}`, J = s ? void 0 : T.map((P) => ({
      id: z(P.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: He(P), opacity: A * 0.15 },
        { offset: 1, color: He(P), opacity: A }
      ]
    }));
    if (s)
      for (const { stackId: P, series: E } of io(T)) {
        const C = Ke(e, { series: E, skipNull: S, temporal: c });
        te.push(
          fr(C, {
            id: P ? `cv-area-stack-${P}` : "cv-area-stack",
            x: M,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (O) => `${O.key}:${O.i}`,
            // STACKED draws a whole stack from a single mark, so the shape is a
            // property of that stack — a per-series `meta.curve` cannot apply
            // here (it does in overlap mode, where each series has its own mark).
            curve: _,
            fillOpacity: A,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (O) => B.get(O.key) ?? "currentColor",
            strokeWidth: q,
            layout: u ? Ti({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const P of T) {
        const E = Ke(e, { series: [P], skipNull: S, temporal: c });
        te.push(
          fr(E, {
            id: `cv-area-${P.key}`,
            x: M,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            // Per-series shape (the field pill's picker writes `meta.curve`) wins
            // over the family default wherever the series has its own mark.
            curve: ht(Sr(P, x)),
            fill: `url(#${z(P.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: He(P),
            strokeWidth: q
          })
        );
      }
    for (const P of F) {
      const E = Ke(e, { series: [P], skipNull: S, temporal: c });
      te.push(
        In(E, {
          id: `cv-area-prev-${P.key}`,
          x: M,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: ht(Sr(P, x)),
          strokeWidth: q,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: He(P)
        })
      );
    }
    const K = new Set(
      T.filter((P) => mo(P, a.dots)).map((P) => P.key)
    );
    if (K.size > 0) {
      const P = s ? Nr(e, T, { normalize: u, temporal: c }).filter(
        (E) => K.has(E.key) && E.value !== null
      ) : Ke(e, {
        series: T.filter((E) => K.has(E.key)),
        skipNull: !0,
        temporal: c
      });
      te.push(
        _i(P, {
          id: "cv-area-dots",
          x: M,
          y: (E) => s ? E.y2 ?? null : E.value,
          z: "label",
          color: "label",
          key: (E) => `${E.key}:${E.i}`,
          r: 3
        })
      );
    }
    return te.push(
      ...sa(a.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories, {
        valueAnchor: la(e)
      })
    ), te.push(Ri({ x: {}, y: !1, marker: !0 })), et({
      marks: te,
      gradients: J,
      x: {
        scale: co(c),
        axis: (ue = (ae = t.axes) == null ? void 0 : ae.x) != null && ue.hide ? !1 : {
          label: j.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: L.scale,
        nice: L.nice,
        grid: !0,
        axis: (H = ($ = t.axes) == null ? void 0 : $.y) != null && H.hide ? !1 : {
          label: j.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (P) => {
              var E;
              return u ? Xe(P) : Ee(n, (E = t.axes) == null ? void 0 : E.y).value(P, D, "axis");
            }
          }
        }
      },
      color: ta(e, {
        legend: sn(t) && e.series.length > 1,
        legendPlacement: At((G = t.legend) == null ? void 0 : G.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : Wn({
        format: n,
        percentShare: u,
        category: m,
        indicator: (ie = t.tooltip) == null ? void 0 : ie.indicator,
        showTotal: (se = t.tooltip) == null ? void 0 : se.showTotal
      }),
      keyboard: !0,
      controls: h
    });
  }, [e, t, n, a, r, s, u, c, m, g, h]), y = e.series.map(Zt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(at, { definition: p, ariaLabel: y, className: "cv-chart--fill" });
}
const qa = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function iu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var p, y;
  const a = t.familyOptions ?? {}, i = e.series[0], o = aa(i), s = (y = (p = t.colors) == null ? void 0 : p.ramp) != null && y.length ? t.colors.ramp : qn, u = b.useMemo(() => {
    const k = e.categories.map((w, N) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[N]) ?? 0
    }));
    return ou(k, a.maxSlices).map((w, N) => ({
      ...w,
      token: s[N % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), c = u.reduce((k, w) => k + w.value, 0), m = u.some((k) => k.value < 0), d = m || u.length === 0 || c <= 0, g = b.useMemo(() => {
    var j, L, D;
    if (d) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = r.pieRadiusPct / 100, N = k > 0, M = a.showLabels ?? "percent", S = El(u, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), _ = [gr(S, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: T }) => T * k,
      outerRadius: ({ radius: T }) => T * w,
      cornerRadius: r.pieCornerRadius
    })];
    if (M !== "none") {
      const T = (B) => M === "name" ? B.label : M === "value" ? n.value(B.value, o, "label") : Xe(B.fraction), F = N ? (k + w) / 2 : w * 0.75;
      _.push(
        er(
          S.filter((B) => B.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (B) => B.angle,
            radius: F,
            text: T,
            fill: "var(--foreground)",
            fontSize: 11,
            anchor: "middle",
            baseline: "middle"
          }
        )
      );
    }
    if (N && a.centerLabel) {
      const T = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(c, o, "label") : a.centerLabel.value;
      if (_.push(
        er([{ id: "cv-pie-center" }], {
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
      ), a.centerLabel.label) {
        const F = a.centerLabel.label;
        _.push(
          er([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => F,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const A = {
      domain: u.map((T) => T.label),
      range: u.map((T) => `var(--${T.token})`)
    };
    sn(t) && (A.legend = jr({ placement: At((j = t.legend) == null ? void 0 : j.position) }));
    const q = i ? i.label || i.key : "";
    return et({
      marks: [
        Wi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: yn().domain([0, Math.PI * 2]) },
          radius: { scale: yn().domain([0, 1]) },
          marks: _
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: A,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((L = t.tooltip) == null ? void 0 : L.show) === !1 ? void 0 : {
        use: Wr,
        className: ia((D = t.tooltip) == null ? void 0 : D.indicator),
        content: (T) => {
          const F = T[0];
          if (!F) return { rows: [] };
          const B = F.datum;
          return {
            title: B.label,
            rows: [
              {
                label: q,
                value: `${n.value(B.value, o, "tooltip")} (${Xe(B.fraction)})`,
                color: F.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [d, u, c, t, n, a, r, i, o]);
  if (m)
    return /* @__PURE__ */ l("div", { style: qa, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: qa, children: "No data" });
  const h = u.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(at, { definition: g, ariaLabel: h, className: "cv-chart--fill" });
}
function ou(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function su({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (h) => {
    var p, y;
    return ((p = i == null ? void 0 : i.measures[h]) == null ? void 0 : p.shortTitle) ?? ((y = i == null ? void 0 : i.dimensions[h]) == null ? void 0 : y.shortTitle) ?? h;
  }, s = a.x ? o(a.x) : "x", u = a.y ? o(a.y) : "y", c = a.size ? o(a.size) : void 0, m = b.useMemo(() => {
    var te, z, J, K, re, ae, ue, $, H, G, oe, ie, se, P;
    if (!a.x || !a.y) return null;
    const h = cu(e.raw.rows, a);
    if (h.length === 0) return null;
    const p = !!a.groupBy, y = [];
    if (p)
      for (const E of h)
        E.group !== void 0 && !y.includes(E.group) && y.push(E.group);
    const [k, w] = r.bubbleAreaRange, N = Math.sqrt(Math.max(k, 0) / Math.PI), M = Math.sqrt(Math.max(w, 0) / Math.PI), S = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, x = (z = (te = t.colors) == null ? void 0 : te.ramp) != null && z.length ? t.colors.ramp : qn;
    p ? (S.z = "group", S.color = "group") : S.fill = `var(--${x[0]})`, a.size ? (S.r = (E) => E.size ?? 0, S.rScale = { scale: () => Us().range([N, M]) }) : S.r = 4;
    const _ = [_i(h, S)];
    (J = a.referenceLines) == null || J.forEach((E, C) => {
      const O = `var(--${E.colorToken ?? "muted-foreground"})`, V = { stroke: O, strokeWidth: 1.25, strokeDasharray: "4 4" };
      E.axis === "y" ? (_.push(xi([E.value], { id: `cv-ref-${C}`, ...V })), E.label && _.push(
        Xt([{ v: E.value, label: E.label }], {
          id: `cv-ref-label-${C}`,
          y: "v",
          text: "label",
          fill: O,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (_.push(Mi([E.value], { id: `cv-ref-${C}`, ...V })), E.label && _.push(
        Xt([{ v: E.value, label: E.label }], {
          id: `cv-ref-label-${C}`,
          x: "v",
          text: "label",
          fill: O,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let A;
    p && (A = {
      domain: y,
      range: y.map((E, C) => `var(--${x[C % x.length]})`)
    }, sn(t) && (A.legend = jr({ placement: At((K = t.legend) == null ? void 0 : K.position) })));
    const q = xt((re = t.axes) == null ? void 0 : re.x, s), j = xt((ae = t.axes) == null ? void 0 : ae.y, u), L = Mt((ue = t.axes) == null ? void 0 : ue.x), D = Mt(($ = t.axes) == null ? void 0 : $.y), T = a.x, F = a.y, B = a.size;
    return et({
      marks: _,
      x: {
        scale: L.scale,
        nice: L.nice,
        grid: !0,
        axis: (G = (H = t.axes) == null ? void 0 : H.x) != null && G.hide ? !1 : {
          label: q,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (E) => {
              var C;
              return Ee(n, (C = t.axes) == null ? void 0 : C.x).value(E, T, "axis");
            }
          }
        }
      },
      y: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (ie = (oe = t.axes) == null ? void 0 : oe.y) != null && ie.hide ? !1 : {
          label: j,
          ticks: {
            format: (E) => {
              var C;
              return Ee(n, (C = t.axes) == null ? void 0 : C.y).value(E, F, "axis");
            }
          }
        }
      },
      color: A,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((se = t.tooltip) == null ? void 0 : se.show) === !1 ? void 0 : {
        use: Wr,
        className: ia((P = t.tooltip) == null ? void 0 : P.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (E) => {
          const O = E[0];
          if (!O) return { rows: [] };
          const V = O.datum, I = [
            { label: s, value: n.value(V.x, T, "tooltip") },
            { label: u, value: n.value(V.y, F, "tooltip") }
          ];
          return B && I.push({
            label: c ?? B,
            value: n.value(V.size, B, "tooltip")
          }), { title: V.group, color: O.color, rows: I };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, u, c]), d = a.groupBy, g = (h) => {
    var y;
    if (!h || !d) return null;
    const p = (y = h.datum) == null ? void 0 : y.group;
    return p === void 0 ? null : { member: d, value: p, label: p };
  };
  return m ? /* @__PURE__ */ l(
    at,
    {
      definition: m,
      ariaLabel: `${s} vs ${u} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: g
    }
  ) : /* @__PURE__ */ l("div", { style: lu, children: "No data" });
}
const lu = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function cu(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = tr(r[t.x]), o = tr(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? tr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function tr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function uu(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function mu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function du(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function ho(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? du(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => ho(e, t, n), r;
}
function fu({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = uu(t), s = e.raw.rows, u = e.raw.annotation, c = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const g = Cr(s, a), h = Cr(s, i), p = /* @__PURE__ */ new Map();
    return s.forEach((y, k) => {
      const w = mu(y[o]), N = y[g], M = y[h];
      if (w === null || N === null || N === void 0 || M === null || M === void 0)
        return;
      const S = typeof N == "number" ? N : String(N), x = String(M);
      p.set(`${S}\0${x}`, {
        cat: S,
        label: x,
        value: w,
        key: `${S}|${x}`,
        member: o,
        i: k
      });
    }), [...p.values()];
  }, [s, a, i, o]), m = b.useMemo(() => {
    var N, M, S, x, _, A, q, j;
    let g = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY;
    for (const L of c)
      L.value < g && (g = L.value), L.value > h && (h = L.value);
    const p = (L) => {
      if (!L) return;
      const D = (u == null ? void 0 : u.dimensions[L]) ?? (u == null ? void 0 : u.timeDimensions[L]) ?? (u == null ? void 0 : u.measures[L]);
      return (D == null ? void 0 : D.shortTitle) ?? (D == null ? void 0 : D.title) ?? L;
    }, y = xt((N = t.axes) == null ? void 0 : N.x, p(a)), k = xt((M = t.axes) == null ? void 0 : M.y, p(i)), w = [
      $s(c, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return c.length > 0 && c.length <= 100 && w.push(
      // Decorative: the in-cell number restates the cell's own value, so it must
      // not emit a second focus point (the tooltip would list the cell twice).
      oa(
        Xt(c, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (L) => n.value(L.value, L.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), et({
      marks: w,
      x: {
        scale: () => Tn(0.05),
        axis: (x = (S = t.axes) == null ? void 0 : S.x) != null && x.hide ? !1 : {
          label: y,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (L) => {
              var D;
              return Ee(n, (D = t.axes) == null ? void 0 : D.x).category(L);
            }
          }
        }
      },
      y: {
        scale: () => Tn(0.05),
        axis: (A = (_ = t.axes) == null ? void 0 : _.y) != null && A.hide ? !1 : {
          label: k,
          ticks: {
            format: (L) => {
              var D;
              return Ee(n, (D = t.axes) == null ? void 0 : D.y).category(L);
            }
          }
        }
      },
      color: {
        scale: ho(g, h, r.colorToken ?? "chart-1")
      },
      tooltip: ((q = t.tooltip) == null ? void 0 : q.show) === !1 ? void 0 : Wn({ format: n, indicator: (j = t.tooltip) == null ? void 0 : j.indicator })
    });
  }, [c, t, n, r, u, a, i]);
  if (c.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const d = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(at, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function hu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function pu(e) {
  return `cv-kpi-trend--${e}`;
}
function gu(e) {
  var u, c, m, d;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (g) => r.value(g, a.measure, "kpi"), o = po([t.raw.rows[0] ?? {}], a.measure), s = ((c = (u = t.raw.annotation) == null ? void 0 : u.measures[a.measure]) == null ? void 0 : c.shortTitle) ?? ((d = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : d.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Mu, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(vu, { ...e, value: o, label: s, fo: a, fmt: i });
}
function vu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const a = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : Tu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && bu(e.raw.query, n), u = n.sparkline ? e.series[0] : void 0, c = !!u && u.data.some((h) => h !== null), m = i ? i.diff : u ? Nu(u) : 0, d = pu(hu(m, a));
  return /* @__PURE__ */ v("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ v("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Cu, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(yu, {}) : /* @__PURE__ */ l(ku, {}))
    ] }),
    c && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(wu, { data: e, series: u, colorClass: d }) })
  ] });
}
function bu(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function yu() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Li, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function ku() {
  return /* @__PURE__ */ v("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Di, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function wu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = Ke(e, { series: [t], skipNull: !0 }), i = Mt(void 0);
    return et({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        fr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: ht("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        In(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: ht("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: oo, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    at,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Nu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Cu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Di : a ? Fn : Pn, u = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: `cv-kpi-chip cv-kpi-delta ${i ? "cv-kpi-delta--flat" : o ? "cv-kpi-delta--good" : "cv-kpi-delta--bad"}`,
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${r(e.diff)}`,
      children: [
        /* @__PURE__ */ l(s, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: u })
      ]
    }
  );
}
const Pt = -(2 * Math.PI) / 3, Mr = 2 * Math.PI / 3, Su = Mr - Pt;
function Mu({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, d;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((d = r.gauge) == null ? void 0 : d.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), u = (e === null ? void 0 : xu(e, r)) ?? "chart-1", c = b.useMemo(() => {
    const g = (s - a) / (o - a), h = Pt + g * Su, p = ({ radius: w }) => w * 0.7, y = gr([{ startAngle: Pt, endAngle: Mr }], {
      id: "cv-gauge-track",
      innerRadius: p,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = g > 0 ? [
      y,
      gr([{ startAngle: Pt, endAngle: h }], {
        id: "cv-gauge-value",
        innerRadius: p,
        cornerRadius: 8,
        fill: `var(--${u})`
      })
    ] : [y];
    return et({
      marks: [
        Wi({
          id: "cv-gauge",
          startAngle: Pt,
          endAngle: Mr,
          marks: k
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, u]);
  return /* @__PURE__ */ v("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      at,
      {
        definition: c,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ v("div", { className: "cv-kpi-gauge-center", children: [
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
function xu(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function po(e, t) {
  for (const n of e) {
    const r = go(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Tu(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = po(e, r.value));
  else {
    const s = e[1];
    a = s ? go(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function go(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const vo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: R("cv-table", e), ...t }) })
);
vo.displayName = "Table";
const bo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: R("cv-table-header", e), ...t }));
bo.displayName = "TableHeader";
const yo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: R("cv-table-body", e), ...t }));
yo.displayName = "TableBody";
const hn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: R("cv-table-row", e),
      ...t
    }
  )
);
hn.displayName = "TableRow";
const ko = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: R("cv-table-head", e),
    ...t
  }
));
ko.displayName = "TableHead";
const xr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: R("cv-table-cell", e),
    ...t
  }
));
xr.displayName = "TableCell";
const _u = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: R("cv-table-caption", e), ...t }));
_u.displayName = "TableCaption";
const wo = Kr(
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
), U = b.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: R(wo({ variant: t, size: n }), e),
      ...a
    }
  )
);
U.displayName = "Button";
function Ru({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Ou(a, i, r, n),
    [a, i, r, n]
  ), [s, u] = b.useState(null), [c, m] = b.useState(0), d = r.pageSize ?? 25, g = b.useMemo(() => {
    var S;
    if (!s) return a;
    const N = s.dir === "asc" ? 1 : -1, M = ((S = o.find((x) => x.member === s.member)) == null ? void 0 : S.key) ?? s.member;
    return [...a].sort((x, _) => Iu(x[M], _[M]) * N);
  }, [a, s, o]), h = Math.max(1, Math.ceil(g.length / d)), p = Math.min(c, h - 1), y = g.slice(p * d, p * d + d), k = (N) => {
    u(
      (M) => (M == null ? void 0 : M.member) === N ? { member: N, dir: M.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), m(0);
  }, w = g.length > 12;
  return /* @__PURE__ */ v("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ v(vo, { children: [
      /* @__PURE__ */ l(bo, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(hn, { children: o.map((N) => /* @__PURE__ */ l(
        ko,
        {
          className: Ua(N.align),
          style: N.width ? { width: N.width } : void 0,
          children: /* @__PURE__ */ v(
            U,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(N.member),
              children: [
                N.label,
                /* @__PURE__ */ l(Eu, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        N.member
      )) }) }),
      /* @__PURE__ */ v(yo, { children: [
        y.map((N, M) => /* @__PURE__ */ l(hn, { children: o.map((S) => {
          const x = Fu(S.member, N[S.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            xr,
            {
              className: R(Ua(S.align), w && "cv-table-cell--compact"),
              style: x ? { color: x } : void 0,
              children: S.render(N[S.key])
            },
            S.member
          );
        }) }, M)),
        y.length === 0 && /* @__PURE__ */ l(hn, { children: /* @__PURE__ */ l(
          xr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    g.length > d && /* @__PURE__ */ v("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ v("span", { children: [
        p * d + 1,
        "–",
        Math.min((p + 1) * d, g.length),
        " of",
        " ",
        g.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.max(0, N - 1)),
            disabled: p === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.min(h - 1, N + 1)),
            disabled: p >= h - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Ou(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Du(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const u = s.member, c = Cr(e, u), m = t ? Lu(t, u) : void 0, d = t ? u in t.measures : !1, g = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? u, h = s.align ?? (d ? "right" : "left"), p = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: u,
      key: c,
      label: g,
      align: h,
      width: s.width,
      render: (y) => Au(y, d, u, p)
    };
  });
}
function Au(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Du(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Lu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ua(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Eu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Fn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Pn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Js, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Iu(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Fu(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Pu(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Pu(e, t, n) {
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
const ot = "cv-sidebar--default", $u = "cv-sidebar--wide", No = "a date or category", nr = [
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
    label: "Category",
    hint: No,
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
], zu = [
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
    hint: No,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Vu = [
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
], ju = [
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
], Wu = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Bu = [
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
], qu = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], qe = (e) => qu.indexOf(e), ze = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Ei,
    order: qe("bar"),
    component: nu,
    optionsSchema: We.bar,
    defaults: Be.bar,
    wells: nr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ot
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: al,
    order: qe("line"),
    component: ru,
    optionsSchema: We.line,
    defaults: Be.line,
    wells: nr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ot
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Xs,
    order: qe("area"),
    component: au,
    optionsSchema: We.area,
    defaults: Be.area,
    wells: nr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ot
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: rl,
    order: qe("pie"),
    component: iu,
    optionsSchema: We.pie,
    defaults: Be.pie,
    wells: Vu,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ot
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: nl,
    order: qe("scatter"),
    component: su,
    optionsSchema: We.scatter,
    defaults: Be.scatter,
    wells: ju,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ot
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: tl,
    order: qe("kpi"),
    component: gu,
    optionsSchema: We.kpi,
    defaults: Be.kpi,
    wells: Wu,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: $u
  },
  table: {
    family: "table",
    label: "Table",
    icon: el,
    order: qe("table"),
    component: Ru,
    optionsSchema: We.table,
    defaults: Be.table,
    wells: Bu,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ot
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Zs,
    order: qe("heatmap"),
    component: fu,
    optionsSchema: We.heatmap,
    defaults: Be.heatmap,
    wells: zu,
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
    sidebarWidthClass: ot
  }
}, Uu = ze.bar, Hu = ze.line, Ku = ze.area, Gu = ze.pie, Yu = ze.scatter, Qu = ze.heatmap, Ju = ze.kpi, Xu = ze.table, ca = [
  Uu,
  Hu,
  Ku,
  Gu,
  Yu,
  Qu,
  Ju,
  Xu
], Zu = f.any();
function ua(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) n.set(o.family, o);
  for (const o of t ?? []) n.set(o.family, o);
  Object.freeze(n);
  const r = [...n.values()].sort(
    (o, s) => o.order - s.order || o.family.localeCompare(s.family)
  ), a = r.map((o) => o.family), i = {
    get: (o) => n.get(o),
    require: (o) => {
      const s = n.get(o);
      if (!s)
        throw new Error(
          `Unknown chart family "${o}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`
        );
      return s;
    },
    list: () => r,
    families: () => a,
    defaults: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? Kc;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Zu;
    },
    resolveOptions: (o) => Gc(o, i.defaults(o.family))
  };
  return i;
}
const Bn = ua(ca);
function em(e, t = Bn) {
  return t.resolveOptions(e);
}
const Ha = {
  barRadius: 4,
  barGap: 0.1,
  barCategoryGap: 0.2,
  maxBarSize: 64,
  areaFillOpacity: 0.4,
  lineWidth: 2,
  pieGapAngle: 0,
  pieCornerRadius: 0,
  pieRadiusPct: 80,
  bubbleAreaRange: [40, 400]
};
function Co(e) {
  return e ? { ...Ha, ...e } : Ha;
}
function ma(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function tm(e) {
  const t = Math.floor(e ?? fn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function nm(e, t) {
  const n = new Array(e.length);
  for (let r = 0; r < e.length; r++) {
    const a = Math.max(0, r - t + 1);
    let i = 0, o = 0;
    for (let s = a; s <= r; s++) {
      const u = e[s];
      u == null || !Number.isFinite(u) || (i += u, o += 1);
    }
    n[r] = o === 0 ? null : i / o;
  }
  return n;
}
function rm(e) {
  const t = new Array(e.length);
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    if (a == null || !Number.isFinite(a)) {
      t[r] = null;
      continue;
    }
    n += a, t[r] = n;
  }
  return t;
}
function am(e, t) {
  const n = new Array(t).fill(0);
  for (let r = 0; r < t; r++) {
    let a = 0;
    for (const i of e) {
      const o = i.data[r];
      o == null || !Number.isFinite(o) || (a += o);
    }
    n[r] = a;
  }
  return e.map((r) => {
    const a = new Array(t);
    for (let i = 0; i < t; i++) {
      const o = r.data[i], s = n[i];
      if (o == null || !Number.isFinite(o)) {
        a[i] = null;
        continue;
      }
      a[i] = !Number.isFinite(s) || s === 0 ? null : o / s;
    }
    return a;
  });
}
function im(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function om(e, t, n) {
  if ((t == null ? void 0 : t.kind) !== "percentOfTotal") return e;
  const r = new Intl.NumberFormat(n, { style: "percent", maximumFractionDigits: 0 });
  return {
    ...e,
    value: (a, i, o) => {
      if (a == null || a === "") return "";
      const s = typeof a == "number" ? a : Number(a);
      return Number.isFinite(s) ? r.format(s) : "";
    }
  };
}
function sm(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = am(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: im(o.meta)
      }))
    };
  }
  const a = tm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? nm(i.data, a) : rm(i.data)
    }))
  };
}
function lm(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const $b = Object.fromEntries(
  Object.entries(ze).map(([e, t]) => [e, t.component])
);
function So({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: u = Bn,
  theme: c
}) {
  const m = Z(() => em(t, u), [t, u]), d = Z(() => Co(c), [c]), g = u.get(m.family), h = (g == null ? void 0 : g.queryless) ?? !1, p = ma(g) ? m.transform : void 0, y = Z(() => sm(e, p), [e, p]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(Cc, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ v($n, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Br, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Vn, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : lm(y), w = om(
    r ?? Xr(e.raw.annotation, m, Jr),
    p
  ), N = (i == null ? void 0 : i[m.family]) ?? u.require(m.family).component;
  return /* @__PURE__ */ l(
    N,
    {
      data: y,
      options: m,
      config: k,
      format: w,
      theme: d,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const qn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], rr = 8;
function Ka(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Mo(e, t) {
  var u;
  const n = (u = t == null ? void 0 : t.ramp) != null && u.length ? t.ramp : qn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (c, m) => r[c] ?? m, i = /* @__PURE__ */ new Set();
  for (const c of e) {
    const m = a(c.key, c.colorToken);
    m && i.add(m);
  }
  let o = 0;
  const s = () => {
    for (let c = 0; c < n.length; c++) {
      const m = n[o++ % n.length];
      if (!i.has(m))
        return i.add(m), m;
    }
    return n[o++ % n.length];
  };
  return e.map((c) => a(c.key, c.colorToken) ?? s());
}
function Ga(e, t) {
  const n = Mo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function cm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function mn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = cm(e[n]);
  return t;
}
function um(e) {
  return {
    measures: mn(e.measures ?? {}),
    dimensions: mn(e.dimensions ?? {}),
    segments: mn(e.segments ?? {}),
    timeDimensions: mn(e.timeDimensions ?? {})
  };
}
function Nt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Un(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function mm(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function dm(e, t) {
  var r, a;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [i, o] of Object.entries(e.measures)) {
    const s = (r = o.meta) == null ? void 0 : r.unit;
    if (!s || ((a = o.meta) == null ? void 0 : a.convert) === !1) continue;
    const u = t.conversions[s];
    u && (n.set(i, { to: u.toImperial, unit: u.imperialUnit }), e.measures[i] = { ...o, meta: { ...o.meta, unit: u.imperialUnit } });
  }
  return n;
}
function fm(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Hn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function hm(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function xo(e, t, n, r, a = Bn) {
  const i = um(e.annotation()), o = dm(i, r), s = fm(e.tablePivot(), o), u = t.mapping;
  if (!u) {
    const d = n.measures ?? [];
    if (a.require(t.family).measureOnly && d.length > 0) {
      const g = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => Hn(g[y])),
          meta: { ...Un(Nt(i, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Ga(h, t.colors), {
        categories: d.map(
          (y) => {
            var k, w;
            return ((k = Nt(i, y)) == null ? void 0 : k.shortTitle) ?? ((w = Nt(i, y)) == null ? void 0 : w.title) ?? y;
          }
        ),
        series: h,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || Ka(h)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const c = u.series.mode === "measures" ? gm(e, u.series, t, i) : vm(e, u.category.member, u.series, t, i), m = pm(e, u);
  return hm(c, o), Ga(c, t.colors), {
    categories: m,
    series: c,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Ka(c)
  };
}
function pm(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function gm(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const u = Nt(r, s), c = i == null ? void 0 : i[s], m = o.map((d) => Hn(d[s]));
    return {
      key: s,
      label: mm(u, c, s),
      data: m,
      ...c != null && c.colorToken ? { colorToken: c.colorToken } : {},
      meta: { ...Un(u, c, n.format), measure: s }
    };
  });
}
function vm(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, u = o && o.length > 0 ? o : [i], c = new Set(u), m = u.length > 1, d = { x: [t], y: [s, "measures"] }, h = e.seriesNames(d).filter((w) => {
    const N = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return N === void 0 || c.has(N);
  }), p = e.chartPivot(d), y = Nt(a, i), k = h.map((w) => {
    var L, D;
    const N = (L = w.yValues) == null ? void 0 : L[0], M = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, S = Nt(a, M), x = (D = n.meta) == null ? void 0 : D[M], _ = (x == null ? void 0 : x.label) ?? (S == null ? void 0 : S.shortTitle) ?? (S == null ? void 0 : S.title) ?? M, A = N ?? w.shortTitle ?? w.title ?? w.key, q = m ? `${_} · ${A}` : A, j = p.map((T) => Hn(T[w.key]));
    return {
      key: w.key,
      label: q,
      data: j,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Un(S ?? y, x, r.format),
        measure: M
      }
    };
  });
  return bm(k, y, r.format);
}
function bm(e, t, n) {
  var m, d, g;
  if (e.length <= rr) return e;
  const r = (h) => h.data.reduce((p, y) => p + (y ?? 0), 0), a = [...e].sort((h, p) => r(p) - r(h)), i = a.slice(0, rr - 1), o = a.slice(rr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, u = Array.from({ length: s }, (h, p) => {
    let y = 0, k = !1;
    for (const w of o) {
      const N = w.data[p];
      N !== null && (y += N, k = !0);
    }
    return k ? y : null;
  }), c = {
    key: "__other",
    label: `Other (${o.length})`,
    data: u,
    meta: { ...Un(t, void 0, n), ...(g = (d = i[0]) == null ? void 0 : d.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, c];
}
function Hn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ee = (e) => fe(e, "yyyy-MM-dd");
function ym(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ee(t), ee(t)];
  if (n === "yesterday") {
    const o = ke(t, 1);
    return [ee(o), ee(o)];
  }
  if (n === "this week") return [ee(wn(t)), ee(Nn(t))];
  if (n === "this month") return [ee(lt(t)), ee(qt(t))];
  if (n === "this quarter") return [ee(ct(t)), ee(Ut(t))];
  if (n === "this year") return [ee(ut(t)), ee(Ht(t))];
  if (n === "last week") {
    const o = hr(t, 1);
    return [ee(wn(o)), ee(Nn(o))];
  }
  if (n === "last month") {
    const o = mt(t, 1);
    return [ee(lt(o)), ee(qt(o))];
  }
  if (n === "last quarter") {
    const o = dt(t, 1);
    return [ee(ct(o)), ee(Ut(o))];
  }
  if (n === "last year") {
    const o = ft(t, 1);
    return [ee(ut(o)), ee(Ht(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ee(ke(t, a - 1)), ee(t)] : i.startsWith("week") ? [ee(ke(t, a * 7 - 1)), ee(t)] : i.startsWith("month") ? [ee(lt(mt(t, a))), ee(qt(mt(t, 1)))] : i.startsWith("quarter") ? [ee(ct(dt(t, a))), ee(Ut(dt(t, 1)))] : [ee(ut(ft(t, a))), ee(Ht(ft(t, 1)))];
}
function Tt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const km = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function wm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function en(e, t, n) {
  var r;
  if (Me(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Nm(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = en(o, t, n);
    if (!Tt(s))
      if (Array.isArray(s))
        for (const u of s)
          Tt(u) || a.push(u);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? ym(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Cm(e, t, n) {
  if ("and" in e) {
    const r = Tr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Tr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Nm(e, t, n);
}
function Tr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Cm(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Sm(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = en(e.granularity, t, n);
    Tt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = en(e.dateRange, t, n);
    Tt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function To(e, t, n) {
  const r = km(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Sm(i, r, t))), e.filters !== void 0) {
    const i = Tr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = en(e.limit, r, t);
    Tt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = en(e.offset, r, t);
    Tt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function _o() {
  let e, t;
  return (n, r, a) => {
    const i = To(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Mm(e, t) {
  let n = {};
  for (const i of e)
    i.default !== void 0 && (n[i.name] = i.default);
  if (t)
    for (const i of Object.keys(t)) {
      const o = t[i];
      o !== void 0 && (n[i] = o);
    }
  const r = /* @__PURE__ */ new Set(), a = () => {
    for (const i of r) i();
  };
  return {
    get(i) {
      return n[i];
    },
    getAll() {
      return n;
    },
    set(i, o) {
      if (o === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, i)) return;
        const s = { ...n };
        delete s[i], n = s;
      } else {
        if (n[i] === o) return;
        n = { ...n, [i]: o };
      }
      a();
    },
    subscribe(i) {
      return r.add(i), () => {
        r.delete(i);
      };
    }
  };
}
class xm extends Error {
}
const Tm = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new xm(`"${e}" cannot be parsed into a number`);
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
function Ya(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class _m extends Error {
}
class Qa extends Error {
}
class Rm extends Error {
}
class ar extends Error {
}
class Om extends Error {
}
class Am {
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
      throw new Qa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ya(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
    const a = this.destination, i = this.origin;
    if (i.abbr === a.abbr)
      return this.val;
    if (a.measure != i.measure)
      throw new Rm(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const u = this.measureData[i.measure].anchors;
      if (u == null)
        throw new ar(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const c = u[i.system];
      if (c == null)
        throw new ar(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = c[a.system]) === null || n === void 0 ? void 0 : n.transform, d = (r = c[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof d == "number")
        o = this.cls.mul(o, d);
      else if (Ya(d))
        o = this.cls.mul(o, this.convertFraction(d));
      else
        throw new ar("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return a.unit.anchor_shift && (o = this.cls.add(o, this.convertFraction(a.unit.anchor_shift))), this.cls.div(o, this.convertFraction(a.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, r, a;
    if (this.origin == null)
      throw new Qa(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, u = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, u = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let c = null;
    for (const m of this.possibilities()) {
      const d = this.describe(m);
      if (o.indexOf(m) === -1 && d.system === u) {
        const h = this.to(m);
        if (i ? this.cls.gt(h, s) : this.cls.lt(h, s))
          continue;
        (c === null || (i ? this.cls.lte(h, s) && this.cls.gt(h, c.val) : this.cls.gte(h, s) && this.cls.lt(h, c.val))) && (c = {
          val: h,
          unit: m,
          singular: d.singular,
          plural: d.plural
        });
      }
    }
    return c ?? {
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
      for (const [r, a] of Object.entries(this.measureData))
        for (const [i, o] of Object.entries(a.systems))
          for (const [s, u] of Object.entries(o))
            n.push(this.describeUnit({
              abbr: s,
              measure: r,
              system: i,
              unit: u
            }));
    else {
      if (!this.isMeasure(t))
        throw new Om(`Meausure "${t}" not found.`);
      const r = this.measureData[t];
      for (const [a, i] of Object.entries(r.systems))
        for (const [o, s] of Object.entries(i))
          n.push(this.describeUnit({
            abbr: o,
            measure: t,
            system: a,
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
      for (const a of Object.values(r.systems))
        n = n.concat(Object.keys(a));
    throw new _m(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
  }
  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  possibilities(t) {
    let n = [], r = [];
    typeof t == "string" && this.isMeasure(t) ? r.push(t) : this.origin != null ? r.push(this.origin.measure) : r = Object.keys(this.measureData);
    for (const a of r) {
      const i = this.measureData[a].systems;
      for (const o of Object.values(i))
        n = [
          ...n,
          ...Object.keys(o)
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
function Dm(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e))
    for (const [a, i] of Object.entries(r.systems))
      for (const [o, s] of Object.entries(i))
        t.set(o, {
          measure: n,
          system: a,
          abbr: o,
          unit: s
        });
  return t;
}
function Lm(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Dm(e);
  return (r) => new Am({
    measures: e,
    unitCache: n,
    cls: Tm
  }, r);
}
const Em = {
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
}, Im = {
  systems: {
    metric: Em
  }
}, Fm = {
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
}, Pm = {
  systems: {
    SI: Fm
  }
}, $m = {
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
}, zm = {
  systems: {
    SI: $m
  }
}, Vm = {
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
}, jm = {
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
}, Wm = {
  systems: {
    metric: Vm,
    imperial: jm
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
}, Bm = {
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
}, qm = {
  systems: {
    SI: Bm
  }
}, Um = {
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
}, Hm = {
  systems: {
    SI: Um
  }
}, Km = {
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
}, Gm = {
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
}, Ym = {
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
}, Qm = {
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
}, Jm = {
  systems: {
    bit: Km,
    byte: Gm,
    IECBit: Ym,
    IECByte: Qm
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
}, Xm = {
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
}, Zm = {
  systems: {
    metric: Xm
  }
}, ed = {
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
}, td = {
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
}, nd = {
  systems: {
    SI: ed,
    nutrition: td
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
}, rd = {
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
}, ad = {
  systems: {
    SI: rd
  }
}, id = {
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
}, od = {
  systems: {
    SI: id
  }
}, sd = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, ld = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, cd = {
  systems: {
    metric: sd,
    imperial: ld
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
}, ud = {
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
}, md = {
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
}, dd = {
  systems: {
    metric: ud,
    imperial: md
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
}, fd = {
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
}, hd = {
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
}, pd = {
  systems: {
    metric: fd,
    imperial: hd
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
}, gd = {
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
}, vd = {
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
}, bd = {
  systems: {
    metric: gd,
    imperial: vd
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
}, yd = {
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
}, kd = {
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
}, wd = {
  systems: {
    metric: yd,
    imperial: kd
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
}, Nd = {
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
}, Cd = {
  systems: {
    SI: Nd
  }
}, Sd = {
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
}, Md = {
  systems: {
    unit: Sd
  }
}, xd = {
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
}, Td = {
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
}, _d = {
  systems: {
    metric: xd,
    imperial: Td
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
}, Rd = {
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
}, Od = {
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
}, Ad = {
  systems: {
    metric: Rd,
    imperial: Od
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
}, Dd = {
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
}, Ld = {
  systems: {
    SI: Dd
  }
}, Ed = {
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
}, Id = {
  systems: {
    SI: Ed
  }
}, Fd = {
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
}, Pd = {
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
}, $d = {
  systems: {
    metric: Fd,
    imperial: Pd
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
}, zd = {
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
}, Vd = {
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
}, jd = {
  systems: {
    metric: zd,
    imperial: Vd
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
}, Wd = {
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
}, Bd = {
  systems: {
    SI: Wd
  }
}, qd = {
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
}, Ud = {
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
}, Hd = {
  systems: {
    metric: qd,
    imperial: Ud
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
}, Kd = {
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
}, Gd = {
  systems: {
    SI: Kd
  }
}, Yd = {
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
}, Qd = {
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
}, Jd = {
  systems: {
    metric: Yd,
    imperial: Qd
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
}, Xd = {
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
}, Zd = {
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
}, ef = {
  systems: {
    metric: Xd,
    imperial: Zd
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
}, tf = {
  acceleration: Im,
  angle: Pm,
  apparentPower: zm,
  area: Wm,
  charge: qm,
  current: Hm,
  digital: Jm,
  each: Zm,
  energy: nd,
  force: ad,
  frequency: od,
  illuminance: cd,
  length: dd,
  mass: pd,
  massFlowRate: bd,
  pace: wd,
  partsPer: Cd,
  pieces: Md,
  power: _d,
  pressure: Ad,
  reactiveEnergy: Ld,
  reactivePower: Id,
  speed: $d,
  torque: Hd,
  temperature: jd,
  time: Bd,
  voltage: Gd,
  volume: Jd,
  volumeFlowRate: ef
}, nf = Lm(tf), rf = {
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
function af(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => nf(t).from(e.from).to(e.to)
  };
}
const _r = {
  ...Object.fromEntries(
    Object.entries(rf).map(([e, t]) => [e, af(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Kn(e) {
  return e ? { ..._r, ...e } : _r;
}
function of(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function sf(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function lf(e) {
  return e != null && e.quantity ? sf(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const cf = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Ro(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ja(e, t) {
  const n = e * (cf[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], o = i.map(([u, c], m) => {
    const d = m < i.length - 1 ? Math.floor(a / u) : Math.round(a / u);
    return a -= d * u, [d, c];
  }), s = o.findIndex((u) => u[0] > 0);
  if (s === -1) {
    const u = Math.abs(n);
    return u === 0 ? "0s" : u < 1e3 ? `${r}${Ro(u.toFixed(u < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((u) => u[0] > 0).map(([u, c]) => `${u}${c}`).join(" ");
}
function ir(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Ro((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function uf(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Xa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Oo(e = _r) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Jr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Ja(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Xa(ir(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Ja(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Xa(ir(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? uf(a, o) : {}, u = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", c = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${u}${ir(n, t)}${c}`;
  };
}
const Gn = Ci(null);
Gn.displayName = "CubeVizContext";
function Ie() {
  const e = Vr(Gn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function it() {
  return Ie().families;
}
function mf(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function zb({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const u = (i ?? []).map((k) => k.family).join("|"), c = Z(
    () => ua(ca, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [u]
  ), m = Z(
    () => mf(e) ? wc(e) : e,
    [e]
  ), d = Z(
    () => {
      var k;
      return {
        chartRamp: (k = t == null ? void 0 : t.chartRamp) != null && k.length ? t.chartRamp : qn,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Co(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), g = Z(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = Z(() => a ?? {}, [a]), p = Z(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), y = Z(
    () => ({
      cubeClient: m,
      registry: h,
      families: c,
      locale: g,
      theme: d,
      maps: p
    }),
    [m, h, c, g, d, p]
  );
  return /* @__PURE__ */ l(Gn.Provider, { value: y, children: /* @__PURE__ */ l(
    "div",
    {
      className: R(
        "cv-root",
        d.mode === "dark" && "dark",
        d.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(
        ea,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      )
    }
  ) });
}
function da({
  families: e,
  children: t
}) {
  const n = Ie(), r = (e ?? []).map((i) => i.family).join("|"), a = Z(() => !e || e.length === 0 ? n : { ...n, families: ua(ca, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(me, { children: t }) : /* @__PURE__ */ l(Gn.Provider, { value: a, children: t });
}
function df(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const ff = 5e3;
function Ao(e, t) {
  const { cubeClient: n } = Ie(), r = (t == null ? void 0 : t.skip) ?? !1, a = Z(
    () => e.limit === void 0 ? { ...e, limit: ff } : e,
    [e]
  ), i = Z(() => JSON.stringify(a), [a]), [o, s] = Ct({ isLoading: !r }), [u, c] = Ct(0), m = Ge(() => c((d) => d + 1), []);
  return an(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let d = !0;
    const g = new AbortController();
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: g.signal }).then((h) => {
      d && s({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      d && s({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      d = !1, g.abort();
    };
  }, [n, i, r, u]), { ...o, refetch: m };
}
const Yn = Ci(null);
Yn.displayName = "DashboardContext";
function fa({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = st(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Mm(r, t), key: r });
  const i = a.current.store, o = hf(i, r);
  return Ls(Yn.Provider, { value: o }, n);
}
function hf(e, t) {
  const n = Ge(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ge(
    (i) => To(i, e.getAll(), t),
    [e, t]
  ), a = Ge(
    (i) => wm(i, e.getAll(), t),
    [e, t]
  );
  return Z(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function pf(e) {
  const t = Si(e.store.subscribe, e.store.getAll, e.store.getAll);
  return Z(
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
function Do() {
  const e = Vr(Yn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return pf(e);
}
function ln() {
  return Vr(Yn);
}
const gf = () => () => {
};
function or(e, t, n) {
  var M;
  const r = ln(), { locale: a } = Ie(), i = it(), o = st(null);
  o.current === null && (o.current = _o());
  const s = o.current, u = (n == null ? void 0 : n.skipResolve) ?? !1, c = r !== null && !u, m = () => !c || !r ? e : s(e, r.store.getAll(), r.decls), d = Si(
    c && r ? r.store.subscribe : gf,
    m,
    m
  ), { resultSet: g, isLoading: h, error: p, refetch: y } = Ao(d, { skip: n == null ? void 0 : n.skip }), k = ((M = t.format) == null ? void 0 : M.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = Z(() => Kn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: Z(() => {
    if (g)
      return xo(g, t, d, { unitSystem: k, conversions: w }, i);
  }, [g, t, d, k, w, i]), isLoading: h, error: p, refetch: y, resolvedQuery: d };
}
function Ve() {
  const { cubeClient: e } = Ie(), [t, n] = Ct({ isLoading: !0 });
  return an(() => {
    let r = !0;
    return n({ isLoading: !0 }), Nc(e).then((a) => {
      r && n({ meta: a, isLoading: !1 });
    }).catch((a) => {
      r && n({
        isLoading: !1,
        error: a instanceof Error ? a : new Error(String(a))
      });
    }), () => {
      r = !1;
    };
  }, [e]), t;
}
function Vb() {
  const { locale: e } = Ie(), { formatValue: t, units: n } = e;
  return Z(
    () => t ?? Oo(Kn(n)),
    [t, n]
  );
}
function Lo() {
  const [e, t] = Ct(0), n = st(null), r = st(null), a = st(null), i = st(0), o = Ge((c) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, c !== i.current && (i.current = c, t(c));
    }));
  }, []), s = Ge(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), u = Ge(
    (c) => {
      if (s(), n.current = c, !c || typeof ResizeObserver > "u") return;
      const m = c.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const d = new ResizeObserver((g) => {
        var h, p;
        for (const y of g) {
          const k = ((p = (h = y.contentBoxSize) == null ? void 0 : h[0]) == null ? void 0 : p.inlineSize) ?? y.contentRect.width;
          o(k);
        }
      });
      d.observe(c), r.current = d;
    },
    [o, s]
  );
  return an(() => s, [s]), [u, e];
}
const vf = "day";
function bf(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), i = (m = e.timeDimensions) == null ? void 0 : m[0], o = r.timeDimension ?? (i == null ? void 0 : i.dimension);
  if (!a || !o) return null;
  const s = r.dateRange ?? (i == null ? void 0 : i.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: o,
        granularity: r.granularity ?? vf,
        ...s !== void 0 ? { dateRange: s } : {}
      }
    ],
    ...e.filters ? { filters: e.filters } : {},
    ...e.segments ? { segments: e.segments } : {},
    // Keep the trend's buckets/relative-ranges in the host timezone (same as the headline).
    ...e.timezone ? { timezone: e.timezone } : {},
    order: [[o, "asc"]]
  }, chart: {
    family: "line",
    mapping: {
      category: { member: o },
      series: { mode: "measures", members: [a] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const X = (e) => fe(e, "yyyy-MM-dd");
function yf(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = kn(e[0]), i = kn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = Ys(i, a) + 1;
    return [X(ke(a, o)), X(ke(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = ke(t, 1);
    return [X(a), X(a)];
  }
  if (n === "yesterday") {
    const a = ke(t, 2);
    return [X(a), X(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [X(ke(t, 2 * a - 1)), X(ke(t, a))];
    if (i.startsWith("week")) return [X(ke(t, 14 * a - 1)), X(ke(t, 7 * a))];
    if (i.startsWith("month"))
      return [X(lt(mt(t, 2 * a))), X(ke(lt(mt(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [X(ct(dt(t, 2 * a))), X(ke(ct(dt(t, a)), 1))];
    if (i.startsWith("year"))
      return [X(ut(ft(t, 2 * a))), X(ke(ut(ft(t, a)), 1))];
  }
  if (n === "this week") {
    const a = hr(t, 1);
    return [X(wn(a)), X(Nn(a))];
  }
  if (n === "this month") {
    const a = mt(t, 1);
    return [X(lt(a)), X(qt(a))];
  }
  if (n === "this quarter") {
    const a = dt(t, 1);
    return [X(ct(a)), X(Ut(a))];
  }
  if (n === "this year") {
    const a = ft(t, 1);
    return [X(ut(a)), X(Ht(a))];
  }
  if (n === "last week") {
    const a = hr(t, 2);
    return [X(wn(a)), X(Nn(a))];
  }
  if (n === "last month") {
    const a = mt(t, 2);
    return [X(lt(a)), X(qt(a))];
  }
  if (n === "last quarter") {
    const a = dt(t, 2);
    return [X(ct(a)), X(Ut(a))];
  }
  if (n === "last year") {
    const a = ft(t, 2);
    return [X(ut(a)), X(Ht(a))];
  }
}
function kf(e, t, n = Bn) {
  var c, m;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((c = r.comparison) == null ? void 0 : c.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (m = e.timeDimensions) == null ? void 0 : m[0];
  if (!i) return null;
  const o = i.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = yf(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const wf = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function ha({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var te;
  const { registry: u, locale: c, theme: m } = Ie(), d = it(), g = ((te = d.get(t.family)) == null ? void 0 : te.queryless) ?? !1, h = Z(() => {
    var z;
    return (z = t.format) != null && z.unitSystem || !(c != null && c.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: c.unitSystem } };
  }, [t, c == null ? void 0 : c.unitSystem]), p = Z(() => {
    const z = e ?? {};
    return z.timezone || !(c != null && c.timezone) ? z : { ...z, timezone: c.timezone };
  }, [e, c == null ? void 0 : c.timezone]), { data: y, isLoading: k, error: w, refetch: N, resolvedQuery: M } = or(
    p,
    h,
    { skip: g }
  ), S = Z(() => bf(p, h), [p, h]), x = or(
    (S == null ? void 0 : S.query) ?? p,
    (S == null ? void 0 : S.chart) ?? h,
    { skip: !S }
  ), _ = Z(
    () => kf(M, h, d),
    [M, h, d]
  ), A = or(
    (_ == null ? void 0 : _.query) ?? p,
    h,
    { skip: !_, skipResolve: !0 }
  ), q = Z(
    () => ({ [h.family]: df(u, h.family, d) }),
    [u, h.family, d]
  ), j = Z(() => {
    let z = y ?? wf;
    if (S && x.data) {
      z = { ...z, series: x.data.series, categories: x.data.categories };
      const J = z.raw.rows.length > 0, K = z.series.some((re) => re.data.some((ae) => ae !== null));
      z = { ...z, empty: !J && !K };
    }
    if (_ && A.data) {
      if (_.mode === "kpiRow") {
        const J = A.data.raw.rows[0];
        if (J) {
          const K = z.raw.rows[0];
          z = {
            ...z,
            raw: { ...z.raw, rows: K ? [K, J] : [J] }
          };
        }
      } else if (!A.data.empty) {
        const J = new Map(A.data.series.map((K) => [K.key, K]));
        if (!z.empty && z.series.length > 0) {
          const K = z.categories.length, re = z.series.map((ae) => {
            const ue = J.get(ae.key), $ = Array.from({ length: K }, (H, G) => (ue == null ? void 0 : ue.data[G]) ?? null);
            return {
              ...ae,
              key: `${ae.key}__prev`,
              label: `${ae.label} (prev)`,
              colorToken: ae.colorToken,
              data: $,
              meta: { ...ae.meta, companion: !0 }
            };
          });
          z = { ...z, series: [...z.series, ...re] };
        } else {
          const K = A.data.series.map((re) => ({
            ...re,
            key: `${re.key}__prev`,
            label: `${re.label} (prev)`,
            data: [...re.data],
            meta: { ...re.meta, companion: !0 }
          }));
          z = {
            ...z,
            categories: A.data.categories,
            series: K,
            empty: !1
          };
        }
      }
    }
    return z;
  }, [y, S, x.data, _, A.data]);
  an(() => {
    n == null || n({ rows: j.raw.rows, refetch: N, isLoading: k });
  }, [n, j.raw.rows, N, k]);
  const L = {}, D = Z(
    () => c.formatValue ?? Oo(Kn(c.units)),
    [c.formatValue, c.units]
  ), T = Z(
    () => Xr(j.raw.annotation, h, D, {
      locale: c.locale,
      unitSystem: c.unitSystem
    }),
    [j.raw.annotation, h, D, c.locale, c.unitSystem]
  ), F = h.mapping, B = Z(
    () => ({
      categoryMember: F == null ? void 0 : F.category.member,
      pivotMember: (F == null ? void 0 : F.series.mode) === "pivot" ? F.series.pivot : void 0,
      formatCategory: T.category
    }),
    [F, T]
  );
  return /* @__PURE__ */ l(
    ea,
    {
      widgetId: i,
      target: B,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        So,
        {
          data: j,
          options: h,
          config: L,
          format: T,
          state: g ? { loading: !1 } : { loading: k && !y, error: w },
          components: q,
          registry: d,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function Nf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    ha,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const Eo = "cube-viz-prose";
function Cf(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Sf({ doc: e }) {
  const t = Cf(e), n = Z(
    () => t ? e : null,
    [t, e]
  ), r = qi(
    {
      extensions: [Hi],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: R(Eo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(Ui, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const pn = [
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
], Mf = Object.fromEntries(
  pn.map((e) => [e.value, e.label])
);
function Za(e) {
  return Mf[e.trim().toLowerCase()] ?? e;
}
const xf = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Tf({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Ll(), a = R(wo({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ v("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: R(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(qr, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: fe(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: R(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(on, {})
      }
    )
  ] });
}
function _f({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: R(
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
function Io({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Dl,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: R("cv-cal", e),
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
        MonthCaption: Tf,
        DayButton: _f,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? qr : on, { className: R("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Oe({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Root, { "data-slot": "popover", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function De({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(Cn.Portal, { children: /* @__PURE__ */ l(
    Cn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: R("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function xe({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Root, { "data-slot": "select", ...e });
}
function Rr({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Group, { "data-slot": "select-group", ...e });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Value, { "data-slot": "select-value", ...e });
}
function _e({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ne.Trigger,
    {
      "data-slot": "select-trigger",
      className: R("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Ne.Icon, { asChild: !0, children: /* @__PURE__ */ l(tt, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Rf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(il, {})
    }
  );
}
function Of({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(tt, {})
    }
  );
}
function Re({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(Ne.Portal, { children: /* @__PURE__ */ v(
    Ne.Content,
    {
      "data-slot": "select-content",
      className: R(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Rf, {}),
        /* @__PURE__ */ l(
          Ne.Viewport,
          {
            className: R(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Of, {})
      ]
    }
  ) });
}
function Or({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.Label,
    {
      "data-slot": "select-label",
      className: R("cv-select-label", e),
      ...t
    }
  );
}
function ge({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ne.Item,
    {
      "data-slot": "select-item",
      className: R("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Ne.ItemIndicator, { children: /* @__PURE__ */ l(nt, {}) }) }),
        /* @__PURE__ */ l(Ne.ItemText, { children: t })
      ]
    }
  );
}
const _t = "cv-field", Af = "cv-field-label", $t = "yyyy-MM-dd";
function Df(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ei(e) {
  if (!e) return;
  const t = Ai(e, $t, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Lf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? xf, [i, o] = Ct(!1), s = typeof e == "string", [u, c] = Df(e), m = ei(u), d = ei(c), g = m ? { from: m, to: d } : void 0;
  let h;
  s ? h = Za(e) : m && d ? h = `${fe(m, "MMM d, yyyy")} – ${fe(d, "MMM d, yyyy")}` : m ? h = fe(m, "MMM d, yyyy") : h = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Oe, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      U,
      {
        variant: "outline",
        className: R(
          "cv-daterange-trigger",
          h === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Ii, {}),
          h
        ]
      }
    ) }),
    /* @__PURE__ */ v(De, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((y) => /* @__PURE__ */ l(
        U,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(y), o(!1);
          },
          children: Za(y)
        },
        y
      )) }),
      /* @__PURE__ */ l(
        Io,
        {
          mode: "range",
          selected: g,
          defaultMonth: m,
          disabled: p,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([fe(y.from, $t), fe(y.to, $t)]) : y != null && y.from ? t([fe(y.from, $t), fe(y.from, $t)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Ef = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function If(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Ff(e) {
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
function Pf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Do(), i = r.rangeVariable ? Ff(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? If(i) : Ef), s = typeof e == "string" ? e : "", u = o.join(",");
  return an(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, u]), /* @__PURE__ */ v(
    xe,
    {
      value: s,
      onValueChange: (c) => t(c),
      children: [
        /* @__PURE__ */ l(_e, { className: _t, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: o.map((c) => /* @__PURE__ */ l(ge, { value: c, children: c[0].toUpperCase() + c.slice(1) }, c)) })
      ]
    }
  );
}
function $f({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: R(_t, "cv-field--multi"),
        value: [...i],
        onChange: (o) => {
          const s = Array.from(o.target.selectedOptions, (c) => c.value), u = r.options.every((c) => typeof c.value == "number");
          t(u ? s.map((c) => Number(c)) : s);
        },
        children: r.options.map((o) => /* @__PURE__ */ l("option", { value: String(o.value), children: o.label }, String(o.value)))
      }
    );
  }
  const a = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    xe,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(_e, { className: _t, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: r.options.map((i) => /* @__PURE__ */ l(ge, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function zf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = Ve(), o = Z(() => {
    if (!a) return [];
    const s = [];
    for (const u of a.cubes)
      if (!(r.cube && u.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const c of u.measures) s.push({ name: c.name, label: c.shortTitle ?? c.title ?? c.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const c of u.dimensions) s.push({ name: c.name, label: c.shortTitle ?? c.title ?? c.name });
      }
    return s;
  }, [a, r.cube, r.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: _t,
      value: typeof e == "string" ? e : "",
      disabled: i,
      onChange: (s) => t(s.target.value || void 0),
      children: [
        /* @__PURE__ */ l("option", { value: "", children: i ? "Loading…" : "—" }),
        o.map((s) => /* @__PURE__ */ l("option", { value: s.name, children: s.label }, s.name))
      ]
    }
  );
}
function Vf({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: _t,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function jf({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: _t,
      min: r.min,
      max: r.max,
      step: r.step,
      value: typeof e == "number" ? e : "",
      onChange: (a) => {
        const i = a.target.value;
        t(i === "" ? void 0 : Number(i));
      }
    }
  );
}
function Wf({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ v("label", { className: "cv-toggle", children: [
    /* @__PURE__ */ l(
      "input",
      {
        type: "checkbox",
        className: "cv-toggle-check",
        checked: e === !0,
        onChange: (a) => t(a.target.checked)
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-toggle-label", children: n.label ?? n.name })
  ] });
}
const Bf = {
  dateRange: Lf,
  granularity: Pf,
  select: $f,
  memberSelect: zf,
  text: Vf,
  number: jf,
  toggle: Wf
};
function qf({ control: e, title: t }) {
  var h;
  const { registry: n } = Ie(), { decls: r, resolveValue: a, setVar: i } = Do(), o = Z(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = Es();
  if (!o)
    return /* @__PURE__ */ v("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const u = e.control.kind, c = ((h = n.controls) == null ? void 0 : h[u]) ?? Bf[u], m = a(e.variable), d = (p) => i(e.variable, p), g = t ?? o.label ?? o.name;
  return u === "toggle" ? /* @__PURE__ */ l(c, { value: m, onChange: d, decl: o, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ l("label", { className: Af, htmlFor: s, children: g }),
    /* @__PURE__ */ l(
      c,
      {
        value: m,
        onChange: d,
        decl: o,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const Fo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
Fo.displayName = "Card";
const Po = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
Po.displayName = "CardHeader";
const $o = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R("cv-card-title", e),
      ...t
    }
  )
);
$o.displayName = "CardTitle";
const Uf = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-description", e), ...t })
);
Uf.displayName = "CardDescription";
const Hf = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: R("cv-card-action", e),
      ...t
    }
  )
);
Hf.displayName = "CardAction";
const zo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-content", e), ...t })
);
zo.displayName = "CardContent";
const Kf = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-footer", e), ...t })
);
Kf.displayName = "CardFooter";
const Rn = "cube-viz-drag-handle";
function Vo(e) {
  var s;
  const { registry: t } = Ie(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ v(Fo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ v(
      Po,
      {
        ...i,
        className: R(Rn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l($o, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(zo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class ti extends Is {
  constructor() {
    super(...arguments);
    Ta(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v($n, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Br, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Vn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Gf(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Yf(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Qf(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Jf = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Ye(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let bt = null;
function jo(e = {}) {
  return bt || (e.includeStyleProperties ? (bt = e.includeStyleProperties, bt) : (bt = Ye(window.getComputedStyle(document.documentElement)), bt));
}
function On(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Xf(e) {
  const t = On(e, "border-left-width"), n = On(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Zf(e) {
  const t = On(e, "border-top-width"), n = On(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Wo(e, t = {}) {
  const n = t.width || Xf(e), r = t.height || Zf(e);
  return { width: n, height: r };
}
function eh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Se = 16384;
function th(e) {
  (e.width > Se || e.height > Se) && (e.width > Se && e.height > Se ? e.width > e.height ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se) : e.width > Se ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se));
}
function An(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function nh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function rh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), nh(a);
}
const Ce = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ce(n, t);
};
function ah(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function ih(e, t) {
  return jo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function oh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? ah(n) : ih(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function ni(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = Jf();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(oh(o, n, a, r)), t.appendChild(s);
}
function sh(e, t, n) {
  ni(e, t, ":before", n), ni(e, t, ":after", n);
}
const ri = "application/font-woff", ai = "image/jpeg", lh = {
  woff: ri,
  woff2: ri,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ai,
  jpeg: ai,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ch(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function pa(e) {
  const t = ch(e).toLowerCase();
  return lh[t] || "";
}
function uh(e) {
  return e.split(/,/)[1];
}
function Ar(e) {
  return e.search(/^(data:)/) !== -1;
}
function mh(e, t) {
  return `data:${t};base64,${e}`;
}
async function Bo(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const a = await r.blob();
  return new Promise((i, o) => {
    const s = new FileReader();
    s.onerror = o, s.onloadend = () => {
      try {
        i(n({ res: r, result: s.result }));
      } catch (u) {
        o(u);
      }
    }, s.readAsDataURL(a);
  });
}
const sr = {};
function dh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ga(e, t, n) {
  const r = dh(e, t, n.includeQueryParams);
  if (sr[r] != null)
    return sr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Bo(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), uh(s)));
    a = mh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return sr[r] = a, a;
}
async function fh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : An(t);
}
async function hh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return An(s);
  }
  const n = e.poster, r = pa(n), a = await ga(n, r, t);
  return An(a);
}
async function ph(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Qn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function gh(e, t) {
  return Ce(e, HTMLCanvasElement) ? fh(e) : Ce(e, HTMLVideoElement) ? hh(e, t) : Ce(e, HTMLIFrameElement) ? ph(e, t) : e.cloneNode(qo(e));
}
const vh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", qo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function bh(e, t, n) {
  var r, a;
  if (qo(t))
    return t;
  let i = [];
  return vh(e) && e.assignedNodes ? i = Ye(e.assignedNodes()) : Ce(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ye(e.contentDocument.body.childNodes) : i = Ye(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Ce(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Qn(s, n)).then((u) => {
    u && t.appendChild(u);
  }), Promise.resolve()), t;
}
function yh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : jo(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Ce(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function kh(e, t) {
  Ce(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ce(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function wh(e, t) {
  if (Ce(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Nh(e, t, n) {
  return Ce(t, Element) && (yh(e, t, n), sh(e, t, n), kh(e, t), wh(e, t)), t;
}
async function Ch(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const u = e.querySelector(s), c = document.querySelector(s);
      !u && c && !r[s] && (r[s] = await Qn(c, t, !0));
    }
  }
  const a = Object.values(r);
  if (a.length) {
    const i = "http://www.w3.org/1999/xhtml", o = document.createElementNS(i, "svg");
    o.setAttribute("xmlns", i), o.style.position = "absolute", o.style.width = "0", o.style.height = "0", o.style.overflow = "hidden", o.style.display = "none";
    const s = document.createElementNS(i, "defs");
    o.appendChild(s);
    for (let u = 0; u < a.length; u++)
      s.appendChild(a[u]);
    e.appendChild(o);
  }
  return e;
}
async function Qn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => gh(r, t)).then((r) => bh(e, r, t)).then((r) => Nh(e, r, t)).then((r) => Ch(r, t));
}
const Uo = /url\((['"]?)([^'"]+?)\1\)/g, Sh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Mh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function xh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Th(e) {
  const t = [];
  return e.replace(Uo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Ar(n));
}
async function _h(e, t, n, r, a) {
  try {
    const i = n ? Qf(t, n) : t, o = pa(t);
    let s;
    return a || (s = await ga(i, o, r)), e.replace(xh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Rh(e, { preferredFontFormat: t }) {
  return t ? e.replace(Mh, (n) => {
    for (; ; ) {
      const [r, , a] = Sh.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Ho(e) {
  return e.search(Uo) !== -1;
}
async function Ko(e, t, n) {
  if (!Ho(e))
    return e;
  const r = Rh(e, n);
  return Th(r).reduce((i, o) => i.then((s) => _h(s, o, t, n)), Promise.resolve(r));
}
async function yt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Ko(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Oh(e, t) {
  await yt("background", e, t) || await yt("background-image", e, t), await yt("mask", e, t) || await yt("-webkit-mask", e, t) || await yt("mask-image", e, t) || await yt("-webkit-mask-image", e, t);
}
async function Ah(e, t) {
  const n = Ce(e, HTMLImageElement);
  if (!(n && !Ar(e.src)) && !(Ce(e, SVGImageElement) && !Ar(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await ga(r, pa(r), t);
  await new Promise((i, o) => {
    e.onload = i, e.onerror = t.onImageErrorHandler ? (...u) => {
      try {
        i(t.onImageErrorHandler(...u));
      } catch (c) {
        o(c);
      }
    } : o;
    const s = e;
    s.decode && (s.decode = i), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
  });
}
async function Dh(e, t) {
  const r = Ye(e.childNodes).map((a) => Go(a, t));
  await Promise.all(r).then(() => e);
}
async function Go(e, t) {
  Ce(e, Element) && (await Oh(e, t), await Ah(e, t), await Dh(e, t));
}
function Lh(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const ii = {};
async function oi(e) {
  let t = ii[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, ii[e] = t, t;
}
async function si(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Bo(s, t.fetchRequestInit, ({ result: u }) => (n = n.replace(o, `url(${u})`), [o, u]));
  });
  return Promise.all(i).then(() => n);
}
function li(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const a = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const u = a.exec(r);
    if (u === null)
      break;
    t.push(u[0]);
  }
  r = r.replace(a, "");
  const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(o, "gi");
  for (; ; ) {
    let u = i.exec(r);
    if (u === null) {
      if (u = s.exec(r), u === null)
        break;
      i.lastIndex = s.lastIndex;
    } else
      s.lastIndex = i.lastIndex;
    t.push(u[0]);
  }
  return t;
}
async function Eh(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const u = i.href, c = oi(u).then((m) => si(m, t)).then((m) => li(m).forEach((d) => {
              try {
                a.insertRule(d, d.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (g) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
                  error: g
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            r.push(c);
          }
        });
      } catch (i) {
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(oi(a.href).then((s) => si(s, t)).then((s) => li(s).forEach((u) => {
          o.insertRule(u, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function Ih(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Ho(t.style.getPropertyValue("src")));
}
async function Fh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ye(e.ownerDocument.styleSheets), r = await Eh(n, t);
  return Ih(r);
}
function Yo(e) {
  return e.trim().replace(/["']/g, "");
}
function Ph(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Yo(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function $h(e, t) {
  const n = await Fh(e, t), r = Ph(e);
  return (await Promise.all(n.filter((i) => r.has(Yo(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Ko(i.cssText, o, t);
  }))).join(`
`);
}
async function zh(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await $h(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Vh(e, t = {}) {
  const { width: n, height: r } = Wo(e, t), a = await Qn(e, t, !0);
  return await zh(a, t), await Go(a, t), Lh(a, t), await rh(a, n, r);
}
async function jh(e, t = {}) {
  const { width: n, height: r } = Wo(e, t), a = await Vh(e, t), i = await An(a), o = document.createElement("canvas"), s = o.getContext("2d"), u = t.pixelRatio || eh(), c = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = c * u, o.height = m * u, t.skipAutoScale || th(o), o.style.width = `${c}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function Wh(e, t = {}) {
  return (await jh(e, t)).toDataURL();
}
function Bh(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function qh(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Uh(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Hh(e, t, n = 2) {
  const r = await Wh(e, {
    pixelRatio: n,
    backgroundColor: Uh(e),
    cacheBust: !0
  });
  qh(r, `${Bh(t)}.png`);
}
function Kh({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), u = t.length > 0, c = !!r;
  if (!u && !n && !c) return null;
  const m = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Yf(Gf(t), `${p}.csv`);
  }, d = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || a)) {
      i(!0), s(null);
      try {
        await Hh(p, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (p) => p.stopPropagation(), h = (p = !0) => R("cv-menu-item", !p && "cv-menu-item--disabled");
  return /* @__PURE__ */ v(Oe, { children: [
    /* @__PURE__ */ l(
      Ae,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(ol, {})
      }
    ),
    /* @__PURE__ */ v(De, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: h(), children: [
        /* @__PURE__ */ l(sl, {}),
        "Refresh"
      ] }) : null,
      c ? /* @__PURE__ */ v("button", { type: "button", onClick: d, disabled: a, className: h(!a), children: [
        /* @__PURE__ */ l(ll, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !u, className: h(u), children: [
        /* @__PURE__ */ l(cl, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function ci({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        ha,
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
      return /* @__PURE__ */ l(Sf, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(qf, { control: e.control, title: e.title });
  }
}
function Dr({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = Ct({ rows: [] }), s = Ge(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), u = st(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(ti, { children: /* @__PURE__ */ l(ci, { widget: e }) }) });
  const c = n ? null : /* @__PURE__ */ l(
    Kh,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: u
    }
  );
  return /* @__PURE__ */ l(
    Vo,
    {
      widget: e,
      title: e.title,
      menu: c,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: u, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(ti, { children: /* @__PURE__ */ l(
        ci,
        {
          widget: e,
          onState: s,
          onRangeSelect: r,
          onPointSelect: a
        }
      ) }) })
    }
  );
}
const Qo = (e) => e.filter((t) => t.type === "chart");
function Gh(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Qo(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Me(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function Yh(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(Me);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of Qo(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Qh({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = ln(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => Gh(e.widgets), [e.widgets]), u = b.useMemo(() => Yh(e.widgets), [e.widgets]), c = b.useRef({ onRangeSelect: n, onPointSelect: r });
  c.current = { onRangeSelect: n, onPointSelect: r };
  const m = b.useCallback(
    (p) => {
      var y, k;
      if (o) {
        const w = p != null && p.widgetId ? s.get(p.widgetId) : void 0;
        if (w) o(w, p ? [p.from, p.to] : void 0);
        else if (!p) for (const N of new Set(s.values())) o(N, void 0);
      }
      (k = (y = c.current).onRangeSelect) == null || k.call(y, p);
    },
    [o, s]
  ), d = b.useCallback(
    (p) => {
      var y, k;
      if (o)
        if (p) {
          const w = u.get(p.member);
          w && o(w, [String(p.value)]);
        } else
          for (const w of new Set(u.values())) o(w, void 0);
      (k = (y = c.current).onPointSelect) == null || k.call(y, p);
    },
    [o, u]
  ), g = !!(n || t && o && s.size), h = !!(r || t && o && u.size);
  return /* @__PURE__ */ l(
    ea,
    {
      onRangeSelect: g ? m : void 0,
      onPointSelect: h ? d : void 0,
      children: a
    }
  );
}
const Jh = "lg", Xh = 640;
function Zh(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function ep(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function jb({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = Lo(), u = e.grid ?? {}, c = u.cols ?? 12, m = u.rowHeight ?? 40, d = u.margin ?? [12, 12], g = u.containerPadding ?? d, h = Z(
    () => ({ [Jh]: ep(e.layout) }),
    [e.layout]
  ), p = Z(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), y = !t && s > 0 && s < Xh;
  return /* @__PURE__ */ l(da, { families: n, children: /* @__PURE__ */ l(fa, { spec: e, children: /* @__PURE__ */ l(
    Qh,
    {
      spec: e,
      drill: r,
      onRangeSelect: a,
      onPointSelect: i,
      children: /* @__PURE__ */ l("div", { ref: o, className: "cv-dashboard", children: s <= 0 ? null : y ? /* @__PURE__ */ l(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: d[1],
            padding: `${g[1]}px ${g[0]}px`
          },
          children: Zh(e.layout).map((k) => {
            const w = p.get(k.i);
            if (!w) return null;
            const N = k.h * m + (k.h - 1) * d[1];
            return /* @__PURE__ */ l("div", { style: { height: N }, children: /* @__PURE__ */ l(Dr, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        Bi,
        {
          width: s,
          layouts: h,
          breakpoints: { lg: 0 },
          cols: { lg: c },
          rowHeight: m,
          margin: d,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${Rn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = p.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Dr, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function Wb({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(da, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Vo,
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
        Nf,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function Jn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function tp(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Pe(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Xn(e) {
  return e ? e.cubes.filter((t) => Pe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Jn(t),
    joinTargets: tp(t)
  })) : [];
}
function Gt(e, t) {
  if (!(!e || !t))
    return Xn(e).find((n) => n.name === t);
}
function va(e) {
  return e.shortTitle || e.title || e.name;
}
function pt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Jo(e) {
  return pt(e.meta, "group");
}
function np(e) {
  return pt(e.meta, "geoPoint");
}
function ui(e) {
  const t = pt(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function rp(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function gn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function ap(e, t) {
  if (t)
    return tn(e, "time", t).find(gn);
}
function ip(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Jo(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Xo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: va(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: pt(n, "quantity"),
    unit: pt(n, "unit")
  };
}
function vn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: va(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: pt(n, "quantity"),
    unit: pt(n, "unit")
  };
}
function Zo(e, t) {
  return {
    name: e.name,
    label: va(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function op(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = np({ meta: i });
    !o || !Pe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (u) => u.type === "number" && ui({ meta: u.meta }) === "latitude"
    ), s = i.filter(
      (u) => u.type === "number" && ui({ meta: u.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: rp(o[0].name, s[0].name),
      label: a,
      title: a,
      shortTitle: a,
      type: "geoPoint",
      memberType: "dimension",
      cube: e.name,
      connectedComponent: t,
      latMember: o[0].name,
      lngMember: s[0].name
    });
  }
  return r;
}
function tn(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Pe(a) || n && a.name !== n) continue;
    const i = Jn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...op(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Pe(s) && o(Xo(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Pe(s) && s.type !== "time" && o(vn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Pe(s) && s.type === "time" && o(vn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Pe(s) && s.type === "number" && o(vn(s, a.name));
  }
  return r;
}
function sp(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Pe(a) || n && !n.has(a.name)) continue;
    const i = Jn(a);
    for (const o of a.segments) {
      if (!Pe(o)) continue;
      const s = Zo(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function $e(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Jn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(Xo(i, n.name)) : a(vn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Zo(o, n.name));
    }
    return tn(e, "geoPoint").find((n) => n.name === t);
  }
}
function mi(e) {
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
const Lr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), es = {
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
function lp(e) {
  return e === "number";
}
function Fe(e) {
  return e.target !== void 0;
}
function be(e, t) {
  return e.kinds.includes(t);
}
function ba(e, t, n) {
  if (!be(e, t)) {
    const r = e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} takes ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function gt(e) {
  return e.chart.familyOptions ?? {};
}
function ya(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function ts(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function cp(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function up(e, t, n) {
  var o, s;
  const r = e.chart;
  if (ya(r)) return;
  const a = cn(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const u of t)
    if (((o = u.target) == null ? void 0 : o.kind) === "option") {
      const c = gt(e)[u.target.key];
      typeof c == "string" && i.add(c);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((u) => !i.has(u));
}
function Dt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = gt(e), o = (u, c) => u.cardinality === "one" ? c.slice(0, 1) : c;
  for (const u of t) {
    if (!Fe(u)) continue;
    const c = u.target;
    switch (c.kind) {
      case "category": {
        const m = cn(a);
        r[u.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = ts(a), d = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[u.id] = o(u, d);
        break;
      }
      case "pivot": {
        const m = ya(a) ?? up(e, t, n);
        r[u.id] = m ? [m] : [];
        break;
      }
      case "option": {
        const m = i[c.key];
        r[u.id] = typeof m == "string" && m ? [m] : [];
        break;
      }
      case "optionList": {
        const m = Array.isArray(i[c.key]) ? i[c.key] : [];
        r[u.id] = m.map((d) => d && typeof d == "object" ? d.member : void 0).filter((d) => typeof d == "string");
        break;
      }
    }
  }
  return r;
}
function ka(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function wa(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function mp(e, t) {
  return { ...e, dimensions: ka(e.dimensions, t) };
}
function ns(e, t) {
  const n = wa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function rs(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function dp(e) {
  const t = fp(e);
  return t === void 0 ? kp : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function fp(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function It(e, t, n, r) {
  if (lp(n)) return { ...e, measures: ka(e.measures, t) };
  if (n === "time") {
    const a = un(e) ?? r;
    return rs(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? dp(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return mp(e, t);
}
function zt(e, t, n, r) {
  const a = e.query ?? {}, i = Dt(e, t);
  for (const [s, u] of Object.entries(i))
    if (s !== r && u.includes(n))
      return a;
  const o = un(a);
  if ((o == null ? void 0 : o.dimension) === n) return rs(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = wa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return ns(a, n);
}
function hp(e, t, n, r) {
  if (!e) return;
  const a = {};
  for (const o of t) {
    const s = r[o];
    s && Object.keys(s).length > 0 && (a[o] = s);
  }
  const i = Object.keys(a).length > 0;
  if (n && t.length > 0) {
    const o = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...i ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...i ? { meta: a } : {} };
    return { category: { member: e }, series: o };
  }
  return { category: { member: e }, series: os(t, r) };
}
function Yt(e, t, n) {
  var u, c;
  const r = Dt(e, t, n), a = (m) => t.find((d) => {
    var g;
    return ((g = d.target) == null ? void 0 : g.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (u = r[i.id]) == null ? void 0 : u[0] : cn(e.chart),
    measures: o ? r[o.id] ?? [] : ts(e.chart),
    pivot: s ? (c = r[s.id]) == null ? void 0 : c[0] : ya(e.chart)
  };
}
function Qt(e, t, n) {
  const r = { ...is(e.chart), ...cp(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: hp(n.category, n.measures, n.pivot, r)
    }
  };
}
function Dn(e, t, n) {
  const r = { ...gt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Na(e, t, n, r, a) {
  const i = t.find((c) => c.id === n);
  if (!i || !Fe(i)) return e;
  const o = i.target, s = Dt(e, t)[n] ?? [];
  let u = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const c = s[0], m = un(u);
      c && c !== r && (u = zt(e, t, c, n)), u = It(u, r, a, m);
      const d = Yt({ ...e, query: u }, t, [r]);
      return Qt(e, u, { ...d, category: r });
    }
    case "measures": {
      const c = i.cardinality === "one" ? [r] : ka(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (u = zt(e, t, s[0], n)), u = It(u, r, a);
      const m = Yt({ ...e, query: u }, t, [r]);
      return Qt(e, u, { ...m, measures: c });
    }
    case "pivot": {
      const c = s[0];
      c && c !== r && (u = zt(e, t, c, n)), u = It(u, r, a);
      const m = Yt({ ...e, query: u }, t, [r]);
      return Qt(e, u, { ...m, pivot: r });
    }
    case "option": {
      const c = s[0];
      return c && c !== r && (u = zt(e, t, c, n)), u = It(u, r, a), Dn(e, u, { [o.key]: r });
    }
    case "optionList": {
      const c = Array.isArray(gt(e)[o.key]) ? [...gt(e)[o.key]] : [];
      return c.some((m) => (m == null ? void 0 : m.member) === r) || c.push({ member: r }), u = It(u, r, a), Dn(e, u, { [o.key]: c });
    }
  }
}
function pp(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Fe(a)) return e;
  const i = a.target, o = zt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Yt(e, t), u = wa(s.measures, r), c = u.length ? s.pivot : void 0, m = u.length || !s.pivot ? o : ns(o, s.pivot);
      return Qt(e, m, { ...s, measures: u, pivot: c });
    }
    case "pivot": {
      const s = Yt(e, t);
      return Qt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Dn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(gt(e)[i.key]) ? gt(e)[i.key] : [];
      return Dn(e, o, {
        [i.key]: s.filter((u) => (u == null ? void 0 : u.member) !== r)
      });
    }
  }
}
function gp(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = un(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function vp(e, t) {
  if (be(t, e)) return e;
  if (e === "category" && be(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && be(t, "category") || e === "time" && be(t, "category")) return "category";
}
function bp(e, t, n) {
  const r = Dt(e, t), a = /* @__PURE__ */ new Map();
  for (const o of t) {
    if (!o.channel) continue;
    const s = r[o.id] ?? [];
    s.length && a.set(o.channel, [...a.get(o.channel) ?? [], ...s]);
  }
  let i = {
    ...e,
    chart: { ...e.chart, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of n) {
    if (!Fe(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const u = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const c of u) {
      const m = vp(gp(e, c), o);
      m && (i = Na(i, n, o.id, c, m));
    }
  }
  return i;
}
function yp(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Fe(a)) continue;
    const i = n.findIndex((o) => be(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Vt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function as(e) {
  var o, s, u, c, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return Vt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Vt(r);
  const a = (c = (u = t.timeDimensions) == null ? void 0 : u[0]) == null ? void 0 : c.dimension;
  if (a) return Vt(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Vt(i);
}
function Er(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function is(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function cn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function un(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function os(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const kp = "day";
function Ir(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function wp(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Ir(r) && Ir(a) ? bp(e, r.wells, a.wells) : Np(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Np(e, t) {
  var h;
  const { chart: n } = e, r = e.query ?? {}, a = Er(n).length ? Er(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((p) => p.dimension), o = cn(n) ?? ((h = r.dimensions) == null ? void 0 : h[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (p, y, k) => !!p && k.indexOf(p) === y
  ), u = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Ir(t)) {
    const p = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...u, chart: { ...u.chart, mapping: p } } : u;
  }
  const c = [...a], m = [...s], d = (p) => i.includes(p) ? "time" : "category";
  let g = u;
  for (const p of t.wells) {
    if (!p.target || !p.channel) continue;
    const y = be(p, "category") ? [
      [m, d],
      [c, () => "number"]
    ] : [
      [c, () => "number"],
      [m, d]
    ];
    let k = 0;
    for (const [w, N] of y)
      for (let M = 0; M < w.length; ) {
        if (p.cardinality === "one" && k > 0 || !be(p, N(w[M]))) {
          M += 1;
          continue;
        }
        g = Na(g, t.wells, p.id, w[M], N(w[M])), w.splice(M, 1), k += 1;
      }
  }
  return g;
}
function ss(e) {
  return of(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function ls(e) {
  return lf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Cp(e, t) {
  return t.require(e).wells;
}
function cs(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Dt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function jt(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Na(e, o.wells, n, r, a);
  return Mp(e, s, o.wells);
}
function Sp(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = pp(e, i.wells, n, r);
  return us(e, o, i.wells);
}
function Mp(e, t, n) {
  return xp(e, us(e, t, n));
}
function xp(e, t) {
  var s, u;
  const n = ((s = e.query) == null ? void 0 : s.timeDimensions) ?? [], r = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [];
  if (n.length !== 1 || r.length !== 1) return t;
  const [a] = n, [i] = r;
  if (a.dimension === i.dimension || i.dateRange !== void 0 || a.dateRange === void 0) return t;
  const o = {
    ...i,
    granularity: a.granularity ?? i.granularity,
    dateRange: a.dateRange
  };
  return { ...t, query: { ...t.query ?? {}, timeDimensions: [o] } };
}
function us(e, t, n) {
  var u, c;
  const r = ((u = e.query) == null ? void 0 : u.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((c = t.query) == null ? void 0 : c.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(Dt(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
const he = b.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = b.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: R("cv-input", e),
        ...r
      }
    );
  }
);
he.displayName = "Input";
function Ln(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(Pi, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(pr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(Fi, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Ur, { className: "cv-member-type-icon" });
  }
}
function ms({
  cube: e,
  cubes: t,
  kind: n,
  value: r,
  onChange: a,
  placeholder: i = "Select member…",
  disabled: o,
  id: s,
  className: u
}) {
  const { meta: c, isLoading: m } = Ve(), d = b.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return tn(c, n).filter((k) => y.has(k.cube));
    }
    return tn(c, n, e);
  }, [c, n, e, t]), g = b.useMemo(() => {
    const y = Tp(d), k = y.length > 1, w = [];
    for (const [N, M] of y)
      for (const [S, x] of ip(M, () => "Other")) {
        const _ = k ? S === "Other" ? N : `${N} · ${S}` : S;
        w.push({ key: `${N}:${S}`, label: _, items: x });
      }
    return w;
  }, [d]), h = g.length > 1, p = d.find((y) => y.name === r);
  return /* @__PURE__ */ v(xe, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(_e, { id: s, className: u, children: /* @__PURE__ */ l(Te, { placeholder: m ? "Loading…" : i, children: p ? /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
      Ln(p.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Re, { children: g.map((y) => /* @__PURE__ */ v(Rr, { children: [
      h && y.label ? /* @__PURE__ */ l(Or, { children: y.label }) : null,
      y.items.map((k) => /* @__PURE__ */ l(ge, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
        Ln(k.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, y.key)) })
  ] });
}
function Tp(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function nn({
  options: e,
  value: t,
  onChange: n,
  fullWidth: r = !0,
  size: a = "default",
  disabled: i,
  "aria-label": o,
  className: s
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": o,
      className: R("cv-segmented", s),
      children: e.map((u) => {
        const c = u.value === t;
        return /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": c,
            title: u.title,
            disabled: i || u.disabled,
            onClick: () => n(u.value),
            className: R(
              "cv-segmented-option",
              a === "sm" && "cv-segmented-option--sm",
              r && "cv-segmented-option--full",
              c && "cv-segmented-option--selected"
            ),
            children: [
              u.icon,
              u.label
            ]
          },
          u.value
        );
      })
    }
  );
}
function di(e) {
  return e.reason === void 0;
}
function _p(e, t, n, r, a) {
  return ba(e, t, [...n]) ?? (a == null ? void 0 : a(r));
}
function Rp(e, t, n) {
  if (t !== void 0 && ss(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${ls(e)}`;
}
const En = "cube-viz:field-picker:only-compatible";
function ds() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function fs() {
  var e;
  try {
    return ((e = ds()) == null ? void 0 : e.getItem(En)) === "1";
  } catch {
    return !1;
  }
}
function Op(e) {
  try {
    const t = ds();
    if (!t) return;
    e ? t.setItem(En, "1") : t.removeItem(En);
  } catch {
  }
}
let Fr = fs();
const bn = /* @__PURE__ */ new Set();
let kt;
function Ap() {
  for (const e of [...bn]) e();
}
function hs(e) {
  e !== Fr && (Fr = e, Ap());
}
function Dp() {
  if (kt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== En || hs(fs());
  };
  e.addEventListener("storage", t), kt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const dn = {
  get: () => Fr,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Op(e), hs(e);
  },
  subscribe: (e) => (bn.add(e), Dp(), () => {
    bn.delete(e), bn.size === 0 && (kt == null || kt(), kt = void 0);
  })
}, fi = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Fi, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(pr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(pr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Ur, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Pi, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, hi = ["geoPoint", "number", "numberDimension", "category", "time"];
function ps({
  well: e,
  placed: t,
  inWell: n,
  scope: r,
  blockReason: a,
  onSelect: i,
  align: o = "start",
  side: s = "bottom",
  children: u
}) {
  var ae, ue;
  const { meta: c, isLoading: m } = Ve(), [d, g] = b.useState(!1), [h, p] = b.useState(""), y = b.useSyncExternalStore(
    dn.subscribe,
    dn.get,
    dn.getServer
  ), k = dn.set, w = b.useId(), [N, M] = b.useState(r.viewLocked ?? "tables"), [S, x] = b.useState({});
  b.useEffect(() => {
    d && M(r.viewLocked ?? "tables");
  }, [d, r.viewLocked]);
  const _ = b.useMemo(() => new Set(t), [t]), A = h.trim().toLowerCase(), q = b.useMemo(() => {
    if (N !== "tables") {
      const H = r.views.find((G) => G.name === N) ?? Gt(c, N);
      return H ? [{ cube: H, tag: "dataset" }] : [];
    }
    const $ = [];
    r.sourceCube && $.push({ cube: r.sourceCube, tag: "source" });
    for (const H of r.relatedCubes) $.push({ cube: H, tag: "related" });
    return $;
  }, [N, r, c]), j = [
    ...hi.filter(($) => be(e, $)),
    ...hi.filter(($) => !be(e, $))
  ], L = ($) => {
    const H = [], G = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Set();
    for (const ie of j) {
      const se = fi[ie], P = ba(e, ie, n ?? []);
      let E = tn(c, se.metaKind, $);
      ie === "time" && (E = [...E].sort(
        (C, O) => Number(gn(O)) - Number(gn(C))
      ));
      for (const C of E) {
        if (_.has(C.name) || oe.has(C.name) || A && !(C.label.toLowerCase().includes(A) || C.name.toLowerCase().includes(A))) continue;
        oe.add(C.name);
        const O = Jo(C), V = O ? `g:${O.toLowerCase()}` : `k:${se.label}`;
        let I = G.get(V);
        I || (I = {
          key: V,
          label: O ?? se.label,
          headerIcon: O ? void 0 : se.icon,
          rejected: P !== void 0,
          items: []
        }, G.set(V, I), H.push(V)), P === void 0 && (I.rejected = !1), I.items.push({
          option: C,
          kind: ie,
          reason: _p(e, ie, n ?? [], C, a)
        });
      }
    }
    return H.map((ie) => G.get(ie));
  }, D = q.map(($) => ({ section: $, groups: L($.cube.name) })).filter(($) => $.groups.length > 0), T = y ? D.reduce(
    ($, H) => $ + H.groups.reduce((G, oe) => G + oe.items.filter((ie) => !di(ie)).length, 0),
    0
  ) : 0, F = y ? D.map(($) => ({
    section: $.section,
    groups: $.groups.map((H) => ({ ...H, rejected: !1, items: H.items.filter(di) })).filter((H) => H.items.length > 0)
  })).filter(($) => $.groups.length > 0) : D, B = F.length > 0, te = !B && T > 0, z = ($, H) => {
    i($, H), g(!1), p("");
  }, J = N === "tables" ? "All related tables" : ((ae = r.views.find(($) => $.name === N)) == null ? void 0 : ae.title) ?? ((ue = Gt(c, N)) == null ? void 0 : ue.title) ?? N, K = r.viewLocked ? r.views.filter(($) => $.name === r.viewLocked) : [], re = y ? T > 0 ? `Only compatible fields — ${T} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ v(Oe, { open: d, onOpenChange: g, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: u }),
    /* @__PURE__ */ v(De, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ v("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ v("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(ul, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: h,
              onChange: ($) => p($.target.value),
              placeholder: m ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            "aria-pressed": y,
            "aria-label": re,
            title: re,
            onClick: () => k(!y),
            className: R("cv-picker-compat", y && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(ml, { className: "cv-ec-icon" }),
              y && T > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: T }) : null
            ]
          }
        ),
        K.length > 0 ? /* @__PURE__ */ l(
          Lp,
          {
            browse: N,
            label: J,
            views: K,
            onBrowse: M
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: B ? F.map(({ section: $, groups: H }, G) => {
        const oe = H.reduce((E, C) => E + C.items.length, 0), ie = $.tag === "related", se = S[$.cube.name] ?? ie, P = A.length > 0 ? !0 : !se;
        return /* @__PURE__ */ v("div", { children: [
          $.tag === "related" && G > 0 && F[G - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => x((E) => ({ ...E, [$.cube.name]: !se })),
              className: "cv-picker-table",
              children: [
                P ? /* @__PURE__ */ l(tt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(on, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l($i, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: $.cube.title }),
                $.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : $.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: oe })
              ]
            }
          ),
          P ? H.map((E) => /* @__PURE__ */ v(
            "div",
            {
              className: R(
                "cv-picker-group",
                E.rejected && "cv-picker-group--rejected"
              ),
              children: [
                H.length > 1 ? /* @__PURE__ */ v("div", { className: "cv-picker-group-header", children: [
                  E.headerIcon,
                  E.label,
                  E.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                E.items.map(({ option: C, kind: O, reason: V }) => /* @__PURE__ */ l(
                  Ep,
                  {
                    option: C,
                    kindIcon: fi[O].icon,
                    badge: O === "time" && gn(C) ? "default" : void 0,
                    reason: V,
                    onPick: () => z(C.name, O)
                  },
                  C.name
                ))
              ]
            },
            E.key
          )) : null
        ] }, $.cube.name);
      }) : te ? /* @__PURE__ */ v("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ v("p", { children: [
          T,
          " ",
          A ? "matching " : "",
          "field",
          T === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          T === 1 ? "it" : "them",
          "."
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "cv-picker-show-all",
            onClick: () => k(!1),
            children: "Show all fields"
          }
        )
      ] }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: m ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Lp({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (u) => {
    r(u), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ v(Oe, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ae,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(zi, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ v(De, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(pi, { active: e === "tables", icon: /* @__PURE__ */ l($i, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(me, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((u) => /* @__PURE__ */ l(
          pi,
          {
            active: e === u.name,
            icon: /* @__PURE__ */ l(Hr, { className: "cv-ec-icon" }),
            onClick: () => o(u.name),
            children: u.title
          },
          u.name
        ))
      ] }) : null
    ] })
  ] });
}
function pi({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: n,
      className: R(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Ep({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
  return t ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ v("span", { className: "cv-picker-row-main", children: [
          r,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e.label })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: t })
      ]
    }
  ) : /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: n,
      title: e.description ?? e.name,
      className: "cv-picker-row",
      children: [
        r,
        /* @__PURE__ */ l("span", { className: "cv-picker-row-label", children: e.label }),
        a ? /* @__PURE__ */ l("span", { className: "cv-picker-badge", children: a }) : null
      ]
    }
  );
}
const Ip = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Wt = "yyyy-MM-dd";
function Fp(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function gi(e) {
  if (!e) return;
  const t = Ai(e, Wt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Ca({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = Fp(e), s = gi(i), u = gi(o), c = s ? { from: s, to: u } : void 0, m = a ? e : s && u ? `${fe(s, "MMM d, yyyy")} – ${fe(u, "MMM d, yyyy")}` : s ? fe(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Oe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: R("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Ii, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: R("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ v(De, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-daterange-presets", children: [
        Ip.map((d) => /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: R("cv-daterange-preset", e === d && "cv-daterange-preset--active"),
            onClick: () => {
              t(d), r(!1);
            },
            children: d
          },
          d
        )),
        /* @__PURE__ */ l(
          U,
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
        Io,
        {
          mode: "range",
          selected: c,
          defaultMonth: s,
          onSelect: (d) => {
            d != null && d.from && d.to ? t([fe(d.from, Wt), fe(d.to, Wt)]) : d != null && d.from ? t([fe(d.from, Wt), fe(d.from, Wt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Pp(e) {
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
function $p(e, t) {
  const n = new Set(Pp(t));
  return e.filter((r) => n.has(r.type));
}
function zp(e) {
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
function Vp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function jp(e, t, n) {
  const r = zp(e), a = { name: Vp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const gs = b.createContext({});
function Wp({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(gs.Provider, { value: n, children: t });
}
function Bp() {
  return b.useContext(gs);
}
function qp({ kind: e, value: t, onChange: n, className: r }) {
  const a = ln(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Bp(), [s, u] = b.useState(!1), [c, m] = b.useState(!1), [d, g] = b.useState(""), h = b.useMemo(() => $p(i, e), [i, e]), p = h.find((w) => w.name === t), y = (w) => {
    n(w), u(!1), m(!1);
  }, k = () => {
    if (!o) return;
    const w = jp(e, d || "Variable", i);
    o(w), y(w.name), g("");
  };
  return /* @__PURE__ */ v(
    Oe,
    {
      open: s,
      onOpenChange: (w) => {
        u(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: R("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(dl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: R("cv-var-trigger-label", !p && "cv-var-trigger-label--placeholder"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(De, { align: "start", className: "cv-var-popover", children: [
          h.length > 0 ? h.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => y(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: c ? /* @__PURE__ */ v("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              he,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: d,
                onChange: (w) => g(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(U, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(St, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function Rt({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = Me(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const u = (c) => R("cv-bind-seg", c && "cv-bind-seg--active");
  return /* @__PURE__ */ v("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ v("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: u(o === "fixed"),
          onClick: () => {
            s("fixed"), Me(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: u(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      qp,
      {
        kind: e,
        value: Me(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(Me(t) ? void 0 : t, (c) => n(c))
  ] });
}
const Up = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function lr(e) {
  return "member" in e && "operator" in e;
}
function Hp({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var L;
  const { meta: s } = Ve(), u = ((L = ln()) == null ? void 0 : L.decls) ?? [], [c, m] = b.useState(null), [d, g] = b.useState(null), h = r ?? [], p = h.length === 1 && !lr(h[0]) && "or" in h[0] && Array.isArray(h[0].or) && h[0].or.every(lr) ? h[0] : void 0, y = p ? "any" : "all", k = [], w = [];
  p || h.forEach((D) => lr(D) ? k.push(D) : w.push(D));
  const N = p ? p.or : k, M = w.length === 0 && (N.length >= 2 || y === "any"), S = (D) => y === "any" ? D.length ? [{ or: D }] : [] : [...D, ...w], x = (D) => {
    const T = D.filter((B) => B.member.length > 0), F = S(T);
    a(F.length > 0 ? F : void 0);
  }, _ = (D) => {
    const T = D === "any" ? N.length ? [{ or: N }] : [] : [...N];
    a(T.length > 0 ? T : void 0);
  }, A = (D, T) => x(N.map((F, B) => B === D ? { ...F, ...T } : F)), q = (D) => x(N.filter((T, F) => F !== D)), j = (D) => {
    const F = { ...d ?? { member: "", operator: "equals", values: [] }, ...D };
    F.member ? (g(null), m(N.length), x([...N, F])) : g(F);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: R("cv-filter-builder", o), children: [
    N.length === 0 && !d ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    M ? /* @__PURE__ */ v("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        nn,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: y,
          onChange: _
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    N.map((D, T) => {
      const F = $e(s, D.member);
      return c === T ? /* @__PURE__ */ l(
        vi,
        {
          leaf: D,
          member: F,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (B) => A(T, B),
          onDone: () => m(null),
          onRemove: () => q(T)
        },
        T
      ) : /* @__PURE__ */ l(
        Kp,
        {
          text: Gp(D, F == null ? void 0 : F.label, u),
          disabled: i,
          onEdit: () => m(T),
          onRemove: () => q(T)
        },
        T
      );
    }),
    d ? /* @__PURE__ */ l(
      vi,
      {
        leaf: d,
        member: $e(s, d.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: j,
        onRemove: () => g(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ v("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      U,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!d,
        onClick: () => {
          m(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(St, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Kp({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ v("div", { className: "cv-filter-summary", children: [
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
      U,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(Ot, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function vi({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: a,
  disabled: i,
  onChange: o,
  onDone: s,
  onRemove: u
}) {
  const { meta: c } = Ve(), m = mi(t == null ? void 0 : t.type), d = m.includes(e.operator) ? e.operator : m[0], g = !Lr.has(d), h = b.useId(), p = b.useId(), y = b.useId(), k = b.useId(), w = b.useId(), N = b.useId();
  b.useEffect(() => {
    d !== e.operator && o({ operator: d });
  }, [e.operator, o, d]);
  const M = (S) => {
    const x = $e(c, S);
    o({ member: S, operator: mi(x == null ? void 0 : x.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ v("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(nt, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: u,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(Ot, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          ps,
          {
            well: Up,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: M,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                id: p,
                disabled: i,
                "aria-labelledby": `${h} ${p}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ v("span", { className: "cv-filter-field-value", children: [
                    Ln(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(tt, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        ms,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: M,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: y, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ v(
        xe,
        {
          value: d,
          onValueChange: (S) => o({
            operator: S,
            values: Lr.has(S) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              _e,
              {
                id: k,
                "aria-labelledby": `${y} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Te, {})
              }
            ),
            /* @__PURE__ */ l(Re, { children: m.map((S) => /* @__PURE__ */ l(ge, { value: S, children: es[S] }, S)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: N, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Yp,
        {
          fieldId: N,
          labelId: w,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (S) => o({ values: S })
        }
      )
    ] }) : null
  ] });
}
function Gp(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = es[e.operator] ?? e.operator;
  if (Lr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Me(o)) {
      const s = n.find((u) => u.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Yp({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Me(i[0]);
  if (t === "time") {
    const c = o ? i[0] : Qp(i);
    return /* @__PURE__ */ l(
      Rt,
      {
        labelId: a,
        kind: "dateRange",
        value: c,
        onChange: (m) => n(m === void 0 ? [] : Me(m) ? [m] : Jp(m)),
        renderFixed: (m, d) => /* @__PURE__ */ l(Ca, { value: m, onChange: d })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", u = o ? i[0] : i.filter((c) => !Me(c));
  return /* @__PURE__ */ l(
    Rt,
    {
      labelId: a,
      kind: s,
      value: u,
      onChange: (c) => n(c === void 0 ? [] : Me(c) ? [c] : c),
      renderFixed: (c, m) => /* @__PURE__ */ l(
        he,
        {
          id: r,
          value: (c ?? []).map(String).join(", "),
          onChange: (d) => m(Xp(d.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Qp(e) {
  const t = e.filter((n) => !Me(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Jp(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Xp(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Zp({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (u) => t({ ...e, query: { ...i, filters: u } });
  return /* @__PURE__ */ v(Oe, { children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: R(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(fl, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(De, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(eg, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Hp, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function eg({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Ve(), a = sp(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const u = new Set(i);
    u.has(s) ? u.delete(s) : u.add(s);
    const c = [...u];
    t({ ...e, query: { ...e.query, segments: c.length ? c : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: a.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o(s.name),
        title: s.description ?? s.name,
        className: R(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function tg({ currentName: e, hasFields: t, onSelect: n }) {
  var y;
  const { meta: r } = Ve(), a = b.useMemo(() => Xn(r), [r]), i = a.filter((k) => k.type === "view"), o = a.filter((k) => k.type === "cube"), s = a.find((k) => k.name === e), [u, c] = b.useState(!1), [m, d] = b.useState(null), g = (k) => {
    if (k === e) {
      c(!1);
      return;
    }
    t ? d(k) : (n(k), c(!1));
  }, h = () => {
    m && n(m), d(null), c(!1);
  }, p = m ? ((y = a.find((k) => k.name === m)) == null ? void 0 : y.title) ?? m : "";
  return /* @__PURE__ */ v(
    Oe,
    {
      open: u,
      onOpenChange: (k) => {
        c(k), k || d(null);
      },
      children: [
        /* @__PURE__ */ v(
          Ae,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(zi, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: R("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(De, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ v("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ v("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: p }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(U, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => d(null), children: "Cancel" }),
            /* @__PURE__ */ l(U, { size: "sm", className: "cv-ec-h7", onClick: h, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ v(me, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((k) => /* @__PURE__ */ l(
              bi,
              {
                icon: /* @__PURE__ */ l(Hr, { className: "cv-ec-icon" }),
                label: k.title,
                active: k.name === e,
                onClick: () => g(k.name)
              },
              k.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((k) => /* @__PURE__ */ l(
            bi,
            {
              icon: /* @__PURE__ */ l(Vi, { className: "cv-ec-icon" }),
              label: k.title,
              active: k.name === e,
              onClick: () => g(k.name)
            },
            k.name
          ))
        ] }) })
      ]
    }
  );
}
function bi({
  icon: e,
  label: t,
  active: n,
  onClick: r
}) {
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: r,
      className: R(
        "cv-ec-menu-item",
        n && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: e }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: t }),
        n ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function ng(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function rg({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var d;
  const i = ((d = e.chart.axes) == null ? void 0 : d[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", u = b.useId(), c = b.useId(), m = n === "y" ? "Value axis title" : "Category axis title";
  return /* @__PURE__ */ v("div", { className: R("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: u, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: c,
        ...r ? { "aria-labelledby": u } : { "aria-label": m },
        value: o,
        placeholder: "No title",
        onChange: (g) => ng(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function ag({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ v("div", { className: R("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(hl, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(pl, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const vs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: R("cv-label", e),
      ...t
    }
  )
);
vs.displayName = "Label";
function de({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: R("cv-field-row", i), children: [
    /* @__PURE__ */ v("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(vs, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Pr({
  checked: e,
  onChange: t,
  disabled: n,
  id: r,
  "aria-label": a,
  className: i
}) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      role: "switch",
      id: r,
      "aria-checked": e,
      "aria-label": a,
      disabled: n,
      "data-state": e ? "checked" : "unchecked",
      onClick: () => t(!e),
      className: R("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function Ze({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: i
}) {
  const o = b.useId();
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "switch-row",
      className: R("cv-switch-row", i),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: o,
            className: R("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(Pr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const ig = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, og = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function sg({ spec: e, update: t }) {
  var k, w, N;
  const n = it(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const M = o.Customize;
    return /* @__PURE__ */ l(M, { spec: e, update: t });
  }
  const s = (M) => t({ ...e, chart: { ...r, ...M } }), u = (M) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...M } } }), c = ((w = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? c : n.defaults(a).envelope.stackMode) ?? "none", d = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", g = ((N = r.transform) == null ? void 0 : N.kind) ?? "none", h = ma(o) ? /* @__PURE__ */ v(me, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ v(
          xe,
          {
            value: g,
            onValueChange: (M) => {
              var S;
              return s({
                transform: M === "none" ? void 0 : M === "rollingAvg" ? { kind: "rollingAvg", window: ((S = r.transform) == null ? void 0 : S.window) ?? fn } : { kind: M }
              });
            },
            children: [
              /* @__PURE__ */ l(_e, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Te, {}) }),
              /* @__PURE__ */ l(Re, { children: og.map((M) => /* @__PURE__ */ l(ge, { value: M, children: ig[M] }, M)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(cg, { label: "Window (points)", children: (M) => {
      var S;
      return /* @__PURE__ */ l(
        he,
        {
          id: M,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((S = r.transform) == null ? void 0 : S.window) ?? fn,
          onChange: (x) => {
            const _ = parseInt(x.target.value, 10), A = Number.isFinite(_) ? Math.min(90, Math.max(2, _)) : fn;
            s({ transform: { kind: "rollingAvg", window: A } });
          }
        }
      );
    } }) : null
  ] }) : null, p = /* @__PURE__ */ l(de, { label: "Stacked", children: /* @__PURE__ */ l(
    nn,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: d,
      onChange: (M) => s({ stackMode: M })
    }
  ) }), y = (() => {
    var M, S;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(me, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (x) => s({ orientation: x ? "horizontal" : "vertical" })
            }
          ),
          p
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(me, { children: [
          p,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((S = (M = r.mapping) == null ? void 0 : M.series) == null ? void 0 : S.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(me, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (x) => u({ innerRadiusPct: x ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(de, { label: "Slice labels", children: /* @__PURE__ */ l(
            nn,
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
              onChange: (x) => u({ showLabels: x })
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
  return /* @__PURE__ */ v("div", { className: "cv-customize", children: [
    y,
    h
  ] });
}
function lg(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ma(n);
}
function cg({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function bs(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function ys(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!Fe(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], u = [];
    for (let c = 0; c < n.length && s.length < o; )
      be(i, n[c].kind) ? (s.push(n[c].kind), u.push(n[c].member), n.splice(c, 1)) : c += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: u }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function ug(e) {
  let t = 0;
  for (const n of e)
    Fe(n) && (t += n.optional ? 1 : 3);
  return t;
}
function mg(e, t) {
  return e.some((n) => Fe(n) && n.cardinality === "many" && be(n, t));
}
const dg = 0.35, fg = 0.4, hg = 0.3, pg = 0.1;
function gg(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? hg : e.supportsCartesianAxes ? pg : e.wells.some(
    (a) => Fe(a) && a.channel === "x" && be(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function ks(e) {
  const t = e.filter(Fe);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function vg(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const bg = (e, t, n) => e === 1 ? t : n;
function yg(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${vg(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((u) => u === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${bg(r, "measure", "measures")}`;
  return ks(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function kg(e, t) {
  const n = bs(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, u = ys(s, n), c = ug(s), m = Math.max(0, n.length - u.matched.length), d = yp(s, r) + 0.5 * m, g = c > 0 ? d / c : 0, h = u.leftover.filter(
      (y) => y.kind !== "time" && !mg(s, y.kind)
    ).length, p = g - dg * h + gg(o, a) - (ks(s) ? fg : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(p * 1e3) / 1e3,
      fits: c > 0 && u.missing.length === 0,
      reason: yg(o, u)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function wg(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Ng(e, t, n) {
  const r = e.require(n), a = ys(r.wells, bs(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, u) => {
      i = jt(i, n, o.well.id, s, o.kinds[u], e);
    });
  return i;
}
function ws(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(wp(e, r, n));
  };
}
function Cg({ spec: e, update: t, empty: n }) {
  const r = it(), a = e.chart.family, i = ws(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ v("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Ns, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function Sg({ spec: e, update: t }) {
  const n = it(), r = e.chart.family, a = ws(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ v(Oe, { children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(tt, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(De, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(Ns, { spec: e, family: r, onPick: a, families: n }),
      lg(r, n) ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(sg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Ns({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => kg(r, e), [r, e]), i = b.useMemo(() => wg(a), [a]), o = b.useMemo(
    () => new Map(a.map((d) => [d.family, d])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((d) => d.fits).map((d) => d.family)),
    [a]
  ), u = _g(e, r, s), c = (d, g) => /* @__PURE__ */ l(
    Mg,
    {
      fit: d,
      active: d.family === t,
      preview: u.get(d.family),
      families: r,
      reason: g ? d.reason : void 0,
      onPick: n
    },
    d.family
  ), m = r.list().map(
    (d) => o.get(d.family) ?? {
      family: d.family,
      descriptor: d,
      score: 0,
      fits: !1,
      reason: d.label
    }
  );
  return /* @__PURE__ */ v("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((d) => c(d, !0)) })
    ] }) : null,
    /* @__PURE__ */ v("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: m.map((d) => c(d, !1)) })
    ] })
  ] });
}
function Mg({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: a,
  onPick: i
}) {
  const o = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ v(
    "div",
    {
      className: R("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Pg,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ v("span", { className: "cv-type-tile-caption", children: [
          /* @__PURE__ */ l("span", { className: "cv-type-tile-label", children: s }),
          a ? /* @__PURE__ */ l("span", { className: "cv-type-tile-reason", children: a }) : null
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => i(e.family),
            "aria-pressed": t,
            "aria-label": a ? `${s} — ${a}` : s,
            title: e.reason,
            className: "cv-type-tile-hit"
          }
        )
      ]
    }
  );
}
function Cs(e, t) {
  var r, a, i;
  const n = ((r = t.defaults(e.family).familyOptions) == null ? void 0 : r.chrome) !== void 0;
  return {
    ...e,
    legend: { ...e.legend, show: !1 },
    tooltip: { ...e.tooltip, show: !1 },
    axes: {
      x: { ...(a = e.axes) == null ? void 0 : a.x, hide: !0 },
      y: { ...(i = e.axes) == null ? void 0 : i.y, hide: !0 }
    },
    familyOptions: n ? { ...e.familyOptions, chrome: "none" } : e.familyOptions
  };
}
function xg(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const yi = 200, Tg = () => () => {
};
function _g(e, t, n) {
  const r = e.query, a = xg(r), i = b.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, yi) : yi
    };
  }, [r]), o = ln(), s = b.useRef(null);
  s.current === null && (s.current = _o());
  const u = s.current, c = () => o ? u(i, o.store.getAll(), o.decls) : i, m = b.useSyncExternalStore(
    o ? o.store.subscribe : Tg,
    c,
    c
  ), { resultSet: d } = Ao(m, { skip: !a });
  return b.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const h of t.list()) {
      const p = h.family;
      if (h.queryless || a && n.has(p) && !d) continue;
      const w = (d && n.has(p) ? Rg(e, p, t, d, m) : void 0) ?? Fg(p, t);
      w && g.set(p, w);
    }
    return g;
  }, [e, t, d, m, n, a]);
}
function Rg(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Ng(n, e, t), o = Cs(i.chart, n), s = xo(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const vt = "sample.category", rn = "sample.group", we = "sample.value", Le = "sample.count", Ss = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], $r = [18, 27, 21, 34, 26, 39], zr = [12, 9, 17, 14, 22, 16], Og = Ss.flatMap((e, t) => [
  { [vt]: e, [rn]: "North", [we]: $r[t], [Le]: zr[t] },
  {
    [vt]: e,
    [rn]: "South",
    [we]: Math.round($r[t] * 0.62),
    [Le]: Math.round(zr[t] * 0.78)
  }
]), Ag = {
  measures: [we, Le],
  dimensions: [vt, rn]
}, Dg = {
  measures: {
    [we]: { title: "Value", shortTitle: "Value", type: "number" },
    [Le]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [vt]: { title: "Day", shortTitle: "Day", type: "string" },
    [rn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function Ms(e) {
  const t = [
    { key: we, label: "Value", data: $r, colorToken: "chart-1" },
    { key: Le, label: "Count", data: zr, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: Ss,
    series: t,
    raw: { rows: Og, query: Ag, annotation: Dg },
    empty: !1
  };
}
const Lg = Ms(1), Eg = Ms(2), Bt = (e, t) => ({
  family: e,
  mapping: { category: { member: vt }, series: { mode: "measures", members: t } }
}), Ig = {
  bar: Bt("bar", [we, Le]),
  line: Bt("line", [we, Le]),
  area: { ...Bt("area", [we, Le]), stackMode: "stacked" },
  pie: Bt("pie", [we]),
  scatter: { family: "scatter", familyOptions: { x: we, y: Le } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: vt },
      series: { mode: "pivot", value: we, pivot: rn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: we, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: vt }, { member: we }, { member: Le }] }
  }
};
function Fg(e, t) {
  const n = Ig[e] ?? Bt(e, [we, Le]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Lg : Eg,
    options: Cs(n, t)
  };
}
const Pg = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l($g, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    So,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class $g extends b.Component {
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
function zg(e, t) {
  return e.allowedCubes.includes(t);
}
function Vg(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function jg(e, t, n, r) {
  const a = Xn(e), i = a.filter((M) => M.type === "view"), o = cs(t, r), s = Object.values(o).flat();
  let u;
  for (const M of s) {
    const S = $e(e, M);
    if (S) {
      u = S;
      break;
    }
  }
  const c = !u && n ? Gt(e, n) : void 0, m = u ? Gt(e, u.cube) : c, d = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, g = t.query.measures ?? [], h = g.length ? Vt(g[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: i, measureSource: h, allowedCubes: [d] };
  const p = h ?? (u == null ? void 0 : u.cube) ?? (c == null ? void 0 : c.name), y = p ? Gt(e, p) : void 0, k = a.filter((M) => M.type === "cube"), w = p ? Vg(k, p) : k, N = p ? [p, ...w.map((M) => M.name)] : k.map((M) => M.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: w,
    views: i,
    measureSource: h,
    allowedCubes: N
  };
}
function Wg(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Bg(e, t, n, r, a, i) {
  var Y, ce, ye, je, Lt;
  const { chart: o, query: s } = e, u = o.family, c = n.kinds.length === 1 ? n.kinds[0] : qg(a), m = o.familyOptions ?? {}, d = Array.isArray(m.columns) ? m.columns : [], g = is(o), h = g[r], p = u === "table" && n.id === "columns", y = u === "bar" || u === "line" || u === "area", k = ((ce = (Y = o.mapping) == null ? void 0 : Y.series) == null ? void 0 : ce.mode) === "measures", w = y && n.id === "y", N = w && k, M = p ? (ye = d.find((Q) => Q.member === r)) == null ? void 0 : ye.label : N ? h == null ? void 0 : h.label : void 0, S = N ? h == null ? void 0 : h.colorToken : void 0, x = un(s), _ = n.kinds.includes("time") && (x == null ? void 0 : x.dimension) === r, A = _ ? x == null ? void 0 : x.granularity : void 0, q = _ ? x == null ? void 0 : x.dateRange : void 0, j = (u === "line" || u === "area") && n.id === "y" && k, L = j ? h == null ? void 0 : h.curve : void 0, D = j ? h == null ? void 0 : h.dots : void 0, T = (Q) => {
    var Ma, xa;
    if ((Ma = o.mapping) != null && Ma.series && o.mapping.series.mode !== "measures") return;
    const pe = ((xa = o.mapping) != null && xa.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ve = { ...g };
    Q && Object.keys(Q).length > 0 ? ve[r] = Q : delete ve[r];
    const Et = cn(o);
    Et && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Et }, series: os(pe, ve) }
      }
    });
  }, F = (Q) => {
    const pe = d.map((ve) => ve.member === r ? { ...ve, ...Q } : ve);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: pe } } });
  }, B = (Q) => {
    p ? F({ label: Q }) : N && T({ ...h, label: Q });
  }, te = (Q) => {
    N && T({ ...h, colorToken: Q ?? void 0 });
  }, z = (Q) => {
    if (!x) return;
    const pe = { ...x };
    for (const ve of Object.keys(Q)) {
      const Et = Q[ve];
      Et === void 0 ? delete pe[ve] : pe[ve] = Et;
    }
    t({ ...e, query: { ...s, timeDimensions: [pe] } });
  }, J = (Q) => z({ granularity: Q }), K = (Q) => z({ dateRange: Q }), re = (Q) => {
    N && T({ ...h, curve: Q });
  }, ae = (Q) => {
    N && T({ ...h, dots: Q });
  }, ue = () => t(Sp(e, u, n.id, r, i)), $ = (n.id === "x" || n.id === "slices" || n.id === "hx") && (c === "category" || c === "time"), H = (je = o.mapping) == null ? void 0 : je.series, G = (H && H.mode === "pivot" ? H.value : Er(o)[0]) ?? ((Lt = s.measures) == null ? void 0 : Lt[0]), oe = $ ? c === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...G ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...G ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ie = (() => {
    const Q = Wg(s.order)[0];
    if (!Q) return "none";
    const [pe, ve] = Q;
    return G && pe === G ? ve === "desc" ? "value-desc" : "value-asc" : pe === r ? c === "time" ? ve === "desc" ? "time-desc" : "time-asc" : ve === "asc" ? "label-asc" : "label-desc" : "none";
  })(), se = (Q) => {
    let pe;
    switch (Q) {
      case "none":
        pe = void 0;
        break;
      case "value-desc":
        pe = G ? [[G, "desc"]] : void 0;
        break;
      case "value-asc":
        pe = G ? [[G, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        pe = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        pe = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: pe } });
  }, P = typeof s.limit == "number" ? s.limit : void 0, E = (Q) => t({ ...e, query: { ...s, limit: Q && Q > 0 ? Q : void 0 } }), O = (u === "bar" || u === "line" || u === "area") && _, V = O && m.comparePrevious === !0;
  return {
    kind: c,
    label: M,
    colorToken: S,
    granularity: A,
    dateRange: q,
    curve: L,
    dots: D,
    canLineStyle: j,
    canRename: p || N,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: _,
    isCategoryField: $,
    sortValue: ie,
    sortOptions: oe,
    onSort: se,
    limit: P,
    onLimit: E,
    canComparePrevious: O,
    comparePrevious: V,
    comparePreviousReady: O && q !== void 0,
    onComparePrevious: (Q) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: Q || void 0 } } }),
    onRename: B,
    onRecolor: te,
    onGranularity: J,
    onDateRange: K,
    onCurve: re,
    onDots: ae,
    onRemove: ue
  };
}
function qg(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ki(e, t, n, r) {
  var d;
  const { chart: a, query: i } = e, o = a.family, s = (g) => {
    if (r < 0 || r >= g.length || n === r) return g;
    const h = g.slice(), [p] = h.splice(n, 1);
    return h.splice(r, 0, p), h;
  };
  if (o === "table" && t.id === "columns") {
    const g = a.familyOptions ?? {}, h = s(Array.isArray(g.columns) ? g.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...g, columns: h } } };
  }
  const u = s(i.measures ?? []), c = (d = a.mapping) == null ? void 0 : d.series;
  let m = a.mapping;
  if (c && c.mode === "measures")
    m = { ...a.mapping, series: { ...c, members: u } };
  else if (c && c.mode === "pivot" && c.values && c.values.length > 1) {
    const g = s(c.values);
    m = { ...a.mapping, series: { ...c, value: g[0], values: g } };
  }
  return { ...e, query: { ...i, measures: u }, chart: { ...a, mapping: m } };
}
const Ug = Je.options;
function Hg({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: R("cv-color-picker", a),
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
            className: R(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        Ug.map((i) => {
          const o = e === i;
          return /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o,
              "aria-label": i,
              title: i,
              disabled: r,
              onClick: () => t(o && n ? null : i),
              className: R(
                "cv-color-swatch cv-color-swatch--token",
                o && "cv-color-swatch--selected"
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
const Kg = Qe.options, Gg = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
}, cr = "__none__";
function xs({
  value: e,
  onChange: t,
  options: n,
  allowNone: r,
  noneLabel: a = "None",
  placeholder: i = "Granularity…",
  disabled: o,
  id: s,
  className: u
}) {
  const c = n && n.length > 0 ? n : Kg;
  return /* @__PURE__ */ v(
    xe,
    {
      value: e ?? (r ? cr : void 0),
      onValueChange: (m) => t(m === cr ? void 0 : m),
      disabled: o,
      children: [
        /* @__PURE__ */ l(_e, { id: s, className: u, children: /* @__PURE__ */ l(Te, { placeholder: i }) }),
        /* @__PURE__ */ v(Re, { children: [
          r ? /* @__PURE__ */ l(ge, { value: cr, children: a }) : null,
          c.map((m) => /* @__PURE__ */ l(ge, { value: m, children: Gg[m] }, m))
        ] })
      ]
    }
  );
}
const Yg = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Qg({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const u = it(), c = Bg(e, t, n, r, a, u), m = b.useId(), d = b.useId(), g = b.useId(), h = b.useId(), p = b.useId(), y = b.useId(), k = (a == null ? void 0 : a.label) ?? r, w = c.label || k, N = c.canColor && i !== void 0, M = c.canRename || N || c.isTimeField || c.isCategoryField || c.canLineStyle || !!o, S = (_) => {
    const A = _.trim();
    c.onRename(A.length > 0 ? A : void 0);
  }, x = /* @__PURE__ */ v(me, { children: [
    N ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? Ln(a.type) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: w })
  ] });
  return /* @__PURE__ */ v("div", { "data-slot": "field-pill", className: R("cv-field-pill", s), children: [
    M ? /* @__PURE__ */ v(Oe, { children: [
      /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${w}`,
          children: x
        }
      ) }),
      /* @__PURE__ */ l(De, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ v("div", { className: "cv-field-pill-config", children: [
        c.canRename ? /* @__PURE__ */ v("label", { className: "cv-ec-field", htmlFor: m, children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
          /* @__PURE__ */ l(
            he,
            {
              id: m,
              defaultValue: c.label ?? "",
              placeholder: k,
              className: "cv-ec-h8",
              onBlur: (_) => S(_.target.value),
              onKeyDown: (_) => {
                _.key === "Enter" && (S(_.target.value), _.target.blur());
              }
            }
          )
        ] }) : null,
        N ? /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l(Hg, { value: c.colorToken, onChange: c.onRecolor })
        ] }) : null,
        c.isTimeField ? /* @__PURE__ */ v(me, { children: [
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              Rt,
              {
                kind: "dateRange",
                value: c.dateRange,
                onChange: c.onDateRange,
                renderFixed: (_, A) => /* @__PURE__ */ l(Ca, { value: _, onChange: A })
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              Rt,
              {
                kind: "granularity",
                value: c.granularity,
                onChange: c.onGranularity,
                renderFixed: (_, A) => /* @__PURE__ */ l(xs, { value: _, onChange: A, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          c.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: p, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                Pr,
                {
                  id: p,
                  checked: c.comparePrevious,
                  onChange: c.onComparePrevious,
                  "aria-label": "Compare to previous period"
                }
              )
            ] }),
            c.comparePrevious && !c.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
          ] }) : null
        ] }) : null,
        c.isCategoryField ? /* @__PURE__ */ v(me, { children: [
          /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: d, children: [
            /* @__PURE__ */ l("span", { id: g, className: "cv-ec-label", children: "Sort" }),
            /* @__PURE__ */ l(
              "select",
              {
                id: d,
                "aria-labelledby": g,
                value: c.sortValue,
                onChange: (_) => c.onSort(_.target.value),
                className: "cv-field-pill-select",
                children: c.sortOptions.map((_) => /* @__PURE__ */ l("option", { value: _.key, children: _.label }, _.key))
              }
            )
          ] }),
          /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: h, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
            /* @__PURE__ */ l(
              he,
              {
                id: h,
                type: "number",
                min: 1,
                defaultValue: c.limit ?? "",
                placeholder: "All",
                className: "cv-ec-h8",
                onBlur: (_) => {
                  const A = _.target.value.trim();
                  c.onLimit(A === "" ? void 0 : Number(A));
                },
                onKeyDown: (_) => {
                  if (_.key === "Enter") {
                    const A = _.target.value.trim();
                    c.onLimit(A === "" ? void 0 : Number(A)), _.target.blur();
                  }
                }
              }
            )
          ] })
        ] }) : null,
        c.canLineStyle ? /* @__PURE__ */ v(me, { children: [
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: Yg.map(([_, A]) => /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                onClick: () => c.onCurve(_),
                className: R(
                  "cv-line-shape-option",
                  (c.curve ?? "monotone") === _ && "cv-line-shape-option--active"
                ),
                children: [
                  A,
                  (c.curve ?? "monotone") === _ ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              _
            )) })
          ] }),
          /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: y, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(Pr, { id: y, checked: c.dots === !0, onChange: c.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ v("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ v(
            U,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canUp,
              onClick: o.onUp,
              children: [
                /* @__PURE__ */ l(Fn, { className: "cv-ec-icon" }),
                "Up"
              ]
            }
          ),
          /* @__PURE__ */ v(
            U,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canDown,
              onClick: o.onDown,
              children: [
                /* @__PURE__ */ l(Pn, { className: "cv-ec-icon" }),
                "Down"
              ]
            }
          )
        ] }) : null,
        /* @__PURE__ */ v(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: c.onRemove,
            children: [
              /* @__PURE__ */ l(Aa, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: w, children: x }),
    /* @__PURE__ */ l(
      U,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: c.onRemove,
        "aria-label": `Remove ${w}`,
        children: /* @__PURE__ */ l(Aa, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function Jg({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: a,
  optionFor: i,
  colorFor: o,
  scope: s,
  blockReason: u,
  onAdd: c,
  badge: m,
  orientation: d,
  lockedSingle: g,
  disableReorder: h,
  label: p,
  note: y,
  pickerSide: k,
  pickerAlign: w,
  control: N
}) {
  const M = n.cardinality === "many" && !g, S = M || r.length === 0, x = r.length, _ = d === "vertical", A = p ?? n.label, q = ["number", "category", "time"].filter((D) => !be(n, D)).map((D) => ba(n, D, r)).find((D) => D !== void 0) ?? n.hint, j = a.length === 0 && !n.optional && be(n, "number") ? "Add a measure to start" : void 0, L = /* @__PURE__ */ l(
    ps,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: u,
      onSelect: c,
      side: k ?? (_ ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          title: q,
          className: R(
            "cv-well-add",
            _ && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(St, { className: "cv-ec-icon" }),
            r.length === 0 ? A : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: R("cv-well-group", !_ && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: A }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        N ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: N }) : null,
        /* @__PURE__ */ v("div", { className: R("cv-well-fields", _ ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((D, T) => /* @__PURE__ */ l(
            Qg,
            {
              spec: e,
              update: t,
              well: n,
              member: D,
              option: i(D),
              resolvedColor: o(D),
              className: _ ? "cv-field-pill--full" : void 0,
              reorder: M && x > 1 && !h ? {
                canUp: T > 0,
                canDown: T < x - 1,
                onUp: () => t(ki(e, n, T, T - 1)),
                onDown: () => t(ki(e, n, T, T + 1))
              } : void 0
            },
            D
          )),
          S ? L : null
        ] }),
        j ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: j }) : null,
        y ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: y }) : null
      ]
    }
  );
}
function ur({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Oe, { children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(tt, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(De, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function Sa(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Xg({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = Sa(e, t), a = as(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], o = n.display ?? "number", s = n.gauge, u = n.goodDirection ?? "up", c = (d) => {
    const g = i ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!g) return;
    const h = { ...g };
    for (const p of Object.keys(d)) {
      const y = d[p];
      y === void 0 ? delete h[p] : h[p] = y;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Jt, { label: "Time field", children: ({ id: d }) => /* @__PURE__ */ l(
      ms,
      {
        id: d,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (g) => c({ dimension: g }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Jt, { label: "Date range", children: ({ labelId: d }) => /* @__PURE__ */ l(
      Rt,
      {
        labelId: d,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => c({ dateRange: g }),
        renderFixed: (g, h) => /* @__PURE__ */ l(Ca, { value: g, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(de, { label: "Display", children: /* @__PURE__ */ l(
      nn,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: o,
        onChange: (d) => r({ display: d })
      }
    ) }),
    /* @__PURE__ */ l(
      Ze,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: u !== "down",
        onChange: (d) => r({ goodDirection: d ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(Jt, { label: "Gauge max", children: ({ id: d }) => /* @__PURE__ */ l(
      he,
      {
        id: d,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (g) => {
          const h = parseFloat(g.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Zg({ spec: e, update: t }) {
  var c;
  const { fo: n, setFO: r } = Sa(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (c = e.query.timeDimensions) == null ? void 0 : c[0], u = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(de, { label: "Compare to", children: /* @__PURE__ */ l(
      nn,
      {
        "aria-label": "Compare to",
        size: "sm",
        options: [
          { value: "none", label: "Nothing" },
          { value: "previousPeriod", label: "Prev period" },
          { value: "value", label: "Fixed value" }
        ],
        value: u,
        onChange: (m) => r({
          comparison: m === "none" ? void 0 : (
            // Re-entering restores the config the user last had, so toggling
            // through "Nothing" is not destructive.
            { ...o.current ?? { showAsPercent: !0 }, mode: m }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ v(me, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Jt, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        he,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const g = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(g) ? g : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Li, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        Ze,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      )
    ] }) : null
  ] });
}
function ev({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Sa(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(Jt, { label: "Trend", children: ({ id: s, labelId: u }) => /* @__PURE__ */ l(
      Rt,
      {
        labelId: u,
        kind: "granularity",
        value: o,
        onChange: (c) => r({
          sparkline: c === void 0 ? void 0 : { ...a, granularity: c }
        }),
        renderFixed: (c, m) => /* @__PURE__ */ l(
          xs,
          {
            id: s,
            value: c,
            onChange: m,
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
function Jt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function tv({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var ie, se, P, E;
  const { meta: a } = Ve(), { locale: i } = Ie(), o = it(), { chart: s } = e, u = s.family, c = o.require(u), m = c.queryless ?? !1, d = c.enforcesAxisUnit, g = as(e), h = b.useMemo(() => Kn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), p = b.useCallback(
    (C) => C && (i == null ? void 0 : i.unitSystem) === "imperial" && h[C] ? h[C].imperialUnit : C,
    [i == null ? void 0 : i.unitSystem, h]
  ), y = b.useMemo(() => Cp(u, o), [u, o]), k = b.useMemo(() => cs(e, o), [e, o]), w = b.useMemo(() => new Map(y.map((C) => [C.id, C])), [y]), [N, M] = b.useState(void 0), S = b.useMemo(
    () => jg(a, e, N, o),
    [a, e, N, o]
  ), x = b.useMemo(() => Object.values(k).flat(), [k]), _ = b.useCallback(
    (C) => {
      M(C), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), A = b.useMemo(
    () => {
      var C;
      return S.viewLocked ? [S.viewLocked] : [(C = S.sourceCube) == null ? void 0 : C.name, ...S.relatedCubes.map((O) => O.name)].filter(
        Boolean
      );
    },
    [S]
  ), q = b.useMemo(
    () => Object.values(k).every((C) => C.length === 0),
    [k]
  ), j = b.useMemo(() => {
    const C = (k.y ?? [])[0], O = C ? $e(a, C) : void 0;
    return {
      leftKey: C ? ss(O) : void 0,
      leftLabel: C ? nv(O, p(O == null ? void 0 : O.unit)) : void 0
    };
  }, [k, a, p]), L = b.useCallback(
    (C, O) => {
      var V;
      if (O) {
        if (!zg(S, O.cube))
          return "Clear the current fields to use a different dataset.";
        if (O.memberType === "measure" && S.measureSource && O.cube !== S.measureSource)
          return `Measures come from one table (${((V = S.sourceCube) == null ? void 0 : V.title) ?? S.measureSource}). Remove them to switch.`;
        if (d && C === "y" && O.memberType === "measure") {
          const { leftKey: I, leftLabel: W } = j;
          return Rp(O, I, W);
        }
      }
    },
    [S, j, d]
  ), D = j.leftLabel, T = b.useMemo(() => {
    var O;
    const C = {};
    if (u === "bar" || u === "line" || u === "area") {
      const V = (O = s.mapping) == null ? void 0 : O.series;
      if (V && V.mode === "measures") {
        const I = V.members.map((Y) => {
          var ce, ye;
          return { key: Y, colorToken: (ye = (ce = V.meta) == null ? void 0 : ce[Y]) == null ? void 0 : ye.colorToken };
        }), W = Mo(I, s.colors);
        V.members.forEach((Y, ce) => {
          C[Y] = W[ce];
        });
      }
    }
    return C;
  }, [u, s.mapping, s.colors]), F = b.useCallback(
    (C, O, V) => {
      const I = $e(a, O);
      if (L(C, I)) return;
      let W = V === "geoPoint" && (I != null && I.latMember) && I.lngMember ? jt(
        jt(e, u, "lat", I.latMember, "numberDimension", o),
        u,
        "lng",
        I.lngMember,
        "numberDimension",
        o
      ) : jt(e, u, C, O, V, o);
      const Y = c.canonicalTimeWell;
      if (Y && C !== Y && (k[Y] ?? []).length === 0) {
        const ce = ap(a, I == null ? void 0 : I.cube);
        ce && ce.name !== O && !L(Y, ce) && (W = jt(W, u, Y, ce.name, "time", o));
      }
      t(W);
    },
    [L, a, t, e, u, o, c, k]
  ), B = u === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : c.zones, te = B.left.map((C) => w.get(C)).filter(Boolean), z = B.bottom.map((C) => w.get(C)).filter(Boolean), J = (ie = k.color) == null ? void 0 : ie[0], K = ((se = k.y) == null ? void 0 : se.length) ?? 0, re = J && K > 1 ? `${K} measures × ${((P = $e(a, J)) == null ? void 0 : P.label) ?? "this split"} — one series per measure per value.` : void 0, ae = c.hasLegend, ue = (k.y ?? [])[0], $ = (C) => {
    var I, W, Y, ce;
    if (!C) return;
    const O = (I = s.mapping) == null ? void 0 : I.series;
    return (O && O.mode === "measures" ? (Y = (W = O.meta) == null ? void 0 : W[C]) == null ? void 0 : Y.label : void 0) ?? ((ce = $e(a, C)) == null ? void 0 : ce.label);
  }, H = (C) => {
    var V, I, W, Y;
    const O = (ce, ye) => ye ? /* @__PURE__ */ l(rg, { spec: e, update: t, axis: ce, title: "Title", auto: $(ye) }) : null;
    switch (C) {
      case "y":
        return O("y", ue);
      // the single value axis
      case "x":
        return O("x", (I = (V = s.mapping) == null ? void 0 : V.category) == null ? void 0 : I.member);
      case "sy":
        return O("y", (W = k.sy) == null ? void 0 : W[0]);
      // scatter Y axis
      case "sx":
        return O("x", (Y = k.sx) == null ? void 0 : Y[0]);
      // scatter X axis
      default:
        return null;
    }
  }, G = (C, O) => /* @__PURE__ */ l(
    Jg,
    {
      spec: e,
      update: t,
      well: C,
      placed: k[C.id] ?? [],
      allPlaced: x,
      optionFor: (V) => $e(a, V),
      colorFor: (V) => T[V],
      scope: S,
      blockReason: (V) => L(C.id, V),
      onAdd: (V, I) => F(C.id, V, I),
      badge: C.id === "y" ? D : void 0,
      orientation: O,
      note: C.id === "color" ? re : void 0,
      control: H(C.id)
    },
    C.id
  ), oe = () => {
    var I;
    const C = w.get("value"), O = (k.value ?? []).length > 0, V = s.familyOptions ?? {};
    return /* @__PURE__ */ v(me, { children: [
      /* @__PURE__ */ v("div", { className: "cv-edit-kpi-value", children: [
        C ? G(C, "vertical") : null,
        O ? /* @__PURE__ */ l(
          ur,
          {
            label: "Time, range & display",
            summary: V.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Xg, { spec: e, update: t })
          }
        ) : null
      ] }),
      O ? /* @__PURE__ */ v(me, { children: [
        /* @__PURE__ */ l(
          ur,
          {
            label: "Comparison",
            summary: V.comparison === void 0 ? "None" : V.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(Zg, { spec: e, update: t })
          }
        ),
        /* @__PURE__ */ l(
          ur,
          {
            label: "Trend",
            summary: ((I = V.sparkline) == null ? void 0 : I.granularity) ?? "None",
            children: /* @__PURE__ */ l(ev, { spec: e, update: t })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !q || m ? /* @__PURE__ */ l(Sg, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          tg,
          {
            currentName: S.viewLocked ?? ((E = S.sourceCube) == null ? void 0 : E.name),
            hasFields: x.length > 0,
            onSelect: _
          }
        ),
        /* @__PURE__ */ l(Zp, { spec: e, update: t, cube: g, scopeCubes: A, scope: S })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-body", children: [
      te.length > 0 ? /* @__PURE__ */ l("div", { className: R("cv-edit-sidebar", c.sidebarWidthClass), children: u === "kpi" ? oe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        te.map((C) => G(C, "vertical"))
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ v("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Cg, { spec: e, update: t, empty: q && !m })
        ] }),
        z.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-edit-overlay-bottom", children: [
          z.map((C) => G(C, "horizontal")),
          ae && !q ? /* @__PURE__ */ l(ag, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function nv(e, t) {
  const n = ls(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ts(e, t) {
  const n = b.useRef(e);
  b.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = b.useRef(null), a = b.useRef(null);
  return b.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, a.current !== null && (n.current(...a.current), a.current = null));
    },
    []
  ), b.useCallback(
    (...i) => {
      r.current !== null && clearTimeout(r.current), a.current = i, r.current = setTimeout(() => {
        r.current = null, a.current = null, n.current(...i);
      }, t);
    },
    [t]
  );
}
function mr(e) {
  const t = Xi.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function rv({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = b.useState(() => ({
    spec: e,
    issues: mr(e)
  })), [i, o] = b.useState(e);
  b.useEffect(() => {
    a({ spec: e, issues: mr(e) }), o(e);
  }, [e]);
  const s = Ts((g) => t(g), n), u = r.spec, c = r.issues, m = c.length === 0, d = b.useCallback(
    (g) => {
      const h = mr(g);
      a({ spec: g, issues: h }), h.length === 0 && (o(g), s(g));
    },
    [s]
  );
  return { draft: u, issues: c, valid: m, committed: i, update: d };
}
const av = () => {
};
function iv({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = it(), { draft: s, issues: u, valid: c, committed: m, update: d } = rv({
    spec: e,
    onChange: t ?? av,
    debounceMs: r
  }), g = o.get(s.chart.family), h = (g == null ? void 0 : g.queryless) ?? !1, p = m, y = (A) => {
    var q, j, L;
    return (((q = A == null ? void 0 : A.measures) == null ? void 0 : q.length) ?? 0) > 0 || (((j = A == null ? void 0 : A.dimensions) == null ? void 0 : j.length) ?? 0) > 0 || (((L = A == null ? void 0 : A.timeDimensions) == null ? void 0 : L.some((D) => typeof D.granularity == "string")) ?? !1);
  }, k = (A) => {
    var q;
    return (((q = A == null ? void 0 : A.measures) == null ? void 0 : q.length) ?? 0) > 0;
  }, w = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", N = h || y(s.query) && y(p.query) && (!w || k(s.query) && k(p.query)), M = w && !k(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = b.useCallback(
    (A) => {
      d({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...A }
        }
      });
    },
    [s, d]
  ), x = N ? /* @__PURE__ */ l(
    ha,
    {
      query: p.query ?? {},
      chart: p.chart,
      editing: !0,
      updateFamilyOptions: S
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: M }) }), _ = n ? /* @__PURE__ */ v(U, { size: "sm", disabled: !c, onClick: () => n(m), children: [
    /* @__PURE__ */ l(ji, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: R("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        c ? null : /* @__PURE__ */ v($n, { variant: "destructive", children: [
          /* @__PURE__ */ l(Br, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(zn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Vn, { children: /* @__PURE__ */ v("ul", { className: "cv-chart-editor-issues", children: [
            u.slice(0, 3).map((A, q) => /* @__PURE__ */ v("li", { children: [
              A.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: A.path }) : null,
              " ",
              A.message
            ] }, q)),
            u.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              u.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(tv, { spec: s, update: d, toolbar: _, children: x }) })
      ]
    }
  );
}
function ov({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: a,
  onRedo: i,
  canUndo: o,
  canRedo: s,
  onDiscard: u,
  discardDisabled: c,
  onSave: m,
  saveDisabled: d,
  className: g
}) {
  const h = a || i, [p, y] = b.useState(!1);
  b.useEffect(() => {
    if (!p) return;
    const w = setTimeout(() => y(!1), 1600);
    return () => clearTimeout(w);
  }, [p]), b.useEffect(() => {
    d || y(!1);
  }, [d]);
  const k = () => {
    m == null || m(), y(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: R("cv-editor-toolbar", g),
      children: [
        /* @__PURE__ */ l(
          he,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Ei, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Ur, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(gl, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(vl, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-actions", children: [
          h ? /* @__PURE__ */ v(me, { children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(bl, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(yl, {})
              }
            )
          ] }) : null,
          u ? /* @__PURE__ */ v(
            U,
            {
              variant: "ghost",
              size: "sm",
              onClick: u,
              disabled: c,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(kl, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(
            U,
            {
              size: "sm",
              onClick: k,
              disabled: d,
              "aria-live": "polite",
              className: R(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                p && "cv-editor-toolbar-save--saved"
              ),
              children: [
                p ? /* @__PURE__ */ l(nt, {}) : /* @__PURE__ */ l(ji, {}),
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
const _s = "lg", Rs = 12;
function sv(e, t) {
  const n = t[_s];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, u) => Math.max(s, u.x + u.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function lv(e, t) {
  const n = new Map(e.map((o) => [o.i, o])), r = new Map(t.map((o) => [o.i, o])), a = [], i = (o, s) => {
    const u = {
      i: o.i,
      x: o.x,
      y: o.y,
      w: o.w,
      h: o.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (u.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (u.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (u.static = s.static), a.push(u);
  };
  for (const o of e) {
    const s = r.get(o.i);
    s && i(s, o);
  }
  for (const o of t)
    n.has(o.i) || i(o, void 0);
  return a;
}
const cv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function uv(e, t, n, r = Rs) {
  const a = cv[n], i = Math.min(a.w, r), o = e.reduce((s, u) => Math.max(s, u.y + u.h), 0);
  return {
    i: t,
    x: 0,
    y: o,
    w: i,
    h: a.h,
    minW: Math.min(a.minW, i),
    minH: a.minH
  };
}
function Os(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Rs) {
  const a = uv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function mv(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Os(e, a);
}
function dv(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function fv(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const hv = 12, pv = 900, gv = 0.4;
function vv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function bv({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, u] = Lo(), c = e.grid ?? {}, m = c.cols ?? hv, d = c.rowHeight ?? 40, g = c.margin ?? [12, 12], h = c.containerPadding ?? [0, 0], p = Math.max(gv, Math.min(1, u / pv)), y = Math.round(p / 0.05) * 0.05, k = Math.max(8, Math.round(d * y)), w = [
    Math.round(g[0] * y),
    Math.round(g[1] * y)
  ], N = [
    Math.round(h[0] * y),
    Math.round(h[1] * y)
  ], M = b.useMemo(
    () => ({ [_s]: vv(e.layout) }),
    [e.layout]
  ), S = b.useMemo(
    () => new Map(e.widgets.map((j) => [j.id, j])),
    [e.widgets]
  ), x = b.useRef(o);
  b.useEffect(() => {
    x.current = o;
  }, [o]);
  const _ = b.useRef(e.layout);
  b.useEffect(() => {
    _.current = e.layout;
  }, [e.layout]);
  const A = b.useRef(null), q = b.useCallback(
    (j, L) => {
      const T = sv(j, L).map((F) => ({ ...F }));
      yv(_.current, T) || x.current(T);
    },
    []
  );
  return /* @__PURE__ */ l(fa, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: u > 0 ? /* @__PURE__ */ l(
    Bi,
    {
      width: u,
      layouts: M,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: k,
      margin: w,
      containerPadding: N,
      dragConfig: { enabled: !0, handle: `.${Rn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: q,
      children: e.layout.map((j) => {
        const L = S.get(j.i);
        if (!L) return null;
        const D = L.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${L.title ?? L.type}`,
              "aria-pressed": D,
              onPointerDown: (T) => {
                A.current = { x: T.clientX, y: T.clientY };
              },
              onClick: (T) => {
                const F = A.current;
                F && Math.hypot(T.clientX - F.x, T.clientY - F.y) > 5 || n(L.id);
              },
              onKeyDown: (T) => {
                (T.key === "Enter" || T.key === " ") && (T.preventDefault(), n(L.id));
              },
              className: R(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                D && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(Dr, { widget: L, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: R(Rn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ v("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${L.title ?? L.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), r(L.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(wl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${L.title ?? L.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), a(L.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Nl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${L.title ?? L.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), i(L.id);
                      },
                      className: R("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Ot, {})
                    }
                  )
                ] })
              ]
            },
            j.i
          )
        );
      })
    }
  ) : null }) });
}
function yv(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const kv = b.memo(bv);
function wv(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Nv({
  widget: e,
  onChange: t
}) {
  const n = b.useRef(t);
  b.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = b.useRef(e);
  b.useEffect(() => {
    r.current = e;
  }, [e]);
  const a = qi({
    extensions: [Hi],
    editable: !0,
    content: wv(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: R(Eo, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(de, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Cv, { editor: a }),
    /* @__PURE__ */ l(Ui, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function Ue({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: R("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function Cv({ editor: e }) {
  const [, t] = b.useReducer((n) => n + 1, 0);
  return b.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Cl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Sl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Ml, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(xl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Tl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(_l, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Rl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(Ol, {})
          }
        )
      ]
    }
  );
}
const Sv = Kr(
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
function Mv({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: R(Sv({ variant: t }), e), ...n });
}
function xv({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = Ve(), u = b.useMemo(() => Xn(o), [o]), c = u.filter((g) => g.type === "cube"), m = u.filter((g) => g.type === "view"), d = u.find((g) => g.name === e);
  return /* @__PURE__ */ v(xe, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(_e, { id: a, className: i, children: /* @__PURE__ */ l(Te, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(dr, { option: d }) : void 0 }) }),
    /* @__PURE__ */ v(Re, { children: [
      m.length > 0 ? /* @__PURE__ */ v(Rr, { children: [
        /* @__PURE__ */ l(Or, { children: "Views" }),
        m.map((g) => /* @__PURE__ */ l(ge, { value: g.name, children: /* @__PURE__ */ l(dr, { option: g }) }, g.name))
      ] }) : null,
      c.length > 0 ? /* @__PURE__ */ v(Rr, { children: [
        /* @__PURE__ */ l(Or, { children: "Cubes" }),
        c.map((g) => /* @__PURE__ */ l(ge, { value: g.name, children: /* @__PURE__ */ l(dr, { option: g }) }, g.name))
      ] }) : null
    ] })
  ] });
}
function dr({ option: e }) {
  const t = e.type === "view" ? Hr : Vi;
  return /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Mv, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const Tv = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function _v(e) {
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
function Rv({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(_v(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          xe,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Re, { children: t.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Control", children: /* @__PURE__ */ v(xe, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
      /* @__PURE__ */ l(Re, { children: Ql.options.map((s) => /* @__PURE__ */ l(ge, { value: s, children: Tv[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Ov, { control: r, onChange: a, variables: t })
  ] });
}
function Ov({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Av, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Lv, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Ev, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Iv, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Fv, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Pv, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Av({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(me, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          Dv,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      Ze,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function Dv({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const u = new Set(a);
    u.has(s) ? u.delete(s) : u.add(s), t(pn.filter((c) => u.has(c.value)).map((c) => c.value));
  }, o = a.size === 0 ? "Default set" : a.size === pn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Oe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(tt, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(De, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: pn.map((s) => {
      const u = a.has(s.value);
      return /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          "aria-pressed": u,
          onClick: () => i(s.value),
          className: "cv-preset-select-item",
          children: [
            /* @__PURE__ */ l(
              "span",
              {
                className: R("cv-preset-select-check", u && "cv-preset-select-check--checked"),
                children: u ? /* @__PURE__ */ l(nt, { className: "cv-ed-icon-xs" }) : null
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
function Lv({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const u = new Set(r);
    u.has(s) ? u.delete(s) : u.add(s);
    const c = Qe.options.filter((m) => u.has(m));
    t({ ...e, options: c.length > 0 ? c : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ v(me, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          xe,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Re, { children: [
                /* @__PURE__ */ l(ge, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Qe.options.map((s) => {
      const u = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": u,
          onClick: () => a(s),
          className: R("cv-granularity-chip", u && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Ev({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (u, c) => c === i ? { value: o.value ?? String(u.value), label: o.label ?? u.label } : u
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ v(me, { children: [
    /* @__PURE__ */ l(
      Ze,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      de,
      {
        label: "Options",
        action: /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(St, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ v("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            he,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            he,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            U,
            {
              variant: "ghost",
              size: "icon",
              className: R("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(Ot, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Iv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(me, { children: [
    /* @__PURE__ */ l(de, { label: "From", children: /* @__PURE__ */ v(
      xe,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
          /* @__PURE__ */ v(Re, { children: [
            /* @__PURE__ */ l(ge, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(ge, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(ge, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      de,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          xv,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Fv({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(de, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    he,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function Pv({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(de, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    he,
    {
      id: `${n}-${a}`,
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [a]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ v(me, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function $v(e) {
  return { schemaVersion: wt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function zv(e) {
  const t = {
    schemaVersion: wt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Vv(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function wi({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: R("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      de,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          he,
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
      /* @__PURE__ */ l(fa, { spec: $v(t), children: /* @__PURE__ */ l(Wp, { createVariable: o, children: /* @__PURE__ */ l("div", { className: R(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        iv,
        {
          fill: a,
          spec: zv(e),
          onChange: (s) => n(Vv(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Nv, { widget: e, onChange: n }) : /* @__PURE__ */ l(Rv, { widget: e, variables: t, onChange: n })
  ] });
}
function jv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const u = /* @__PURE__ */ v(me, { children: [
    r ? /* @__PURE__ */ l(
      on,
      {
        className: R("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "section-header",
      className: R("cv-section-header", s),
      children: [
        r ? /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: i,
            "aria-expanded": a,
            "aria-controls": o,
            className: "cv-section-toggle",
            children: u
          }
        ) : /* @__PURE__ */ l("div", { className: "cv-section-heading", children: u }),
        n ? /* @__PURE__ */ l(
          "div",
          {
            className: "cv-section-actions",
            onClick: (c) => c.stopPropagation(),
            children: n
          }
        ) : null
      ]
    }
  );
}
function Wv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: a = !0,
  open: i,
  onOpenChange: o,
  className: s,
  children: u
}) {
  const c = i !== void 0, [m, d] = b.useState(a), g = r ? c ? i : m : !0, h = b.useId(), p = b.useCallback(() => {
    const y = !g;
    c || d(y), o == null || o(y);
  }, [g, c, o]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": g ? "open" : "closed",
      className: R("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          jv,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: g,
            onToggle: p,
            regionId: h
          }
        ),
        g ? /* @__PURE__ */ l("div", { id: h, "data-slot": "section-body", className: "cv-section-body", children: u }) : null
      ]
    }
  );
}
function Bv(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function qv(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Uv(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Hv(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Kv(e, t) {
  switch (e) {
    case "chart":
      return qv(t);
    case "text":
      return Uv(t);
    case "input":
      return Hv(t);
  }
}
function Gv(e) {
  return { name: e, type: "string" };
}
function Yv(e) {
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
const Ni = {
  dateRange: "Date range",
  time: "Time",
  granularity: "Granularity",
  string: "String",
  number: "Number",
  boolean: "Boolean",
  dimension: "Dimension",
  measure: "Measure",
  dimensionOrMeasure: "Dimension or measure"
};
function Qv({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = b.useRef(0), a = () => {
    if (n) return n();
    let c;
    do
      c = `var_${++r.current}`;
    while (e.some((m) => m.name === c));
    return c;
  }, i = (c, m) => {
    t(e.map((d, g) => g === c ? Jv(d, m) : d));
  }, o = (c) => t(e.filter((m, d) => d !== c)), s = () => t([...e, Gv(a())]), u = (c, m) => {
    const d = c + m;
    if (d < 0 || d >= e.length) return;
    const g = e.slice();
    [g[c], g[d]] = [g[d], g[c]], t(g);
  };
  return /* @__PURE__ */ l(
    Wv,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(St, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(St, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((c, m) => /* @__PURE__ */ l(
        Xv,
        {
          decl: c,
          index: m,
          total: e.length,
          duplicate: e.some((d, g) => g !== m && d.name === c.name && c.name !== ""),
          onChange: (d) => i(m, d),
          onRemove: () => o(m),
          onMove: (d) => u(m, d)
        },
        m
      )) })
    }
  );
}
function Jv(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Yv(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Xv({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, u] = b.useState(!0), c = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, m = b.useId();
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ v("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => u((d) => !d),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(tt, {}) : /* @__PURE__ */ l(on, {})
            }
          ),
          /* @__PURE__ */ l(
            he,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": c ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Ni[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Fn, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Pn, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Ot, {})
              }
            )
          ] })
        ] }),
        c ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: c }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(de, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ v(xe, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
            /* @__PURE__ */ l(Re, { children: Qi.options.map((d) => /* @__PURE__ */ l(ge, { value: d, children: Ni[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ l(
            de,
            {
              label: "Label",
              htmlFor: m,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                he,
                {
                  id: m,
                  value: e.label ?? "",
                  placeholder: e.name,
                  onChange: (d) => a({ label: d.target.value })
                }
              )
            }
          ),
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ l(Zv, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Zv({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      Ze,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (i) => t(i)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(de, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      he,
      {
        id: n,
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (i) => {
          const o = i.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : eb(e.default);
  return /* @__PURE__ */ l(de, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    he,
    {
      id: n,
      value: a,
      placeholder: tb(e.type),
      onChange: (i) => {
        const o = i.target.value;
        if (o === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const s = o.split(",").map((u) => u.trim()).filter(Boolean);
          t(s);
          return;
        }
        t(o);
      }
    }
  ) });
}
function eb(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function tb(e) {
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
function Bb({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: r,
  onSave: a,
  newId: i,
  debounceMs: o = 300,
  onUndo: s,
  onRedo: u,
  canUndo: c,
  canRedo: m,
  onDiscard: d,
  families: g,
  className: h
}) {
  var O, V;
  const [p, y] = b.useState(e), [k, w] = b.useState(e);
  b.useEffect(() => {
    y(e), w(e);
  }, [e]);
  const [N, M] = b.useState(null), S = b.useRef(0), [x, _] = b.useState(null), A = b.useRef(N), q = b.useRef(x), j = b.useRef(p);
  b.useEffect(() => {
    A.current = N, q.current = x, j.current = p;
  });
  const L = b.useRef(null);
  L.current === null && (L.current = i ?? Bv());
  const D = i ?? L.current, T = Ts(
    (I) => r == null ? void 0 : r(I),
    o
  ), F = b.useCallback(
    (I) => {
      S.current = Date.now(), y((W) => {
        const Y = I(W);
        return T(Y), Y;
      });
    },
    [T]
  ), B = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === B.current) return;
    const I = 500;
    let W = null;
    const Y = () => {
      var Lt;
      const ce = Date.now() - S.current;
      if (ce < I) {
        W = setTimeout(Y, I - ce);
        return;
      }
      B.current = t;
      const ye = /* @__PURE__ */ new Set();
      ((Lt = q.current) == null ? void 0 : Lt.kind) === "widget" && ye.add(q.current.id), A.current && ye.add(A.current);
      const je = ab(t, j.current, ye);
      y(je), n == null || n(je);
    };
    return Y(), () => {
      W && clearTimeout(W);
    };
  }, [t]);
  const te = b.useCallback(
    (I) => {
      const W = Kv(I, D());
      F((Y) => Os(Y, W)), M(W.id), _({ kind: "widget", id: W.id });
    },
    [F, D]
  ), z = b.useCallback((I) => M(I), []), J = b.useCallback((I) => {
    M(I), _({ kind: "widget", id: I });
  }, []), K = b.useCallback(
    (I) => {
      F((W) => dv(W, I)), M((W) => W === I ? null : W), _((W) => (W == null ? void 0 : W.kind) === "widget" && W.id === I ? null : W);
    },
    [F]
  ), re = b.useCallback(
    (I) => {
      const W = D();
      F((Y) => mv(Y, I, W)), M(W);
    },
    [F, D]
  ), ae = b.useCallback(
    (I) => F((W) => fv(W, I)),
    [F]
  ), ue = b.useCallback(
    (I) => F((W) => {
      const Y = lv(W.layout, I);
      return rb(W.layout, Y) ? W : { ...W, layout: Y };
    }),
    [F]
  ), $ = b.useCallback(
    (I) => F((W) => ({ ...W, name: I || void 0 })),
    [F]
  ), H = b.useCallback(
    (I) => F((W) => ({ ...W, variables: I })),
    [F]
  ), G = b.useDeferredValue(p), oe = b.useMemo(
    () => yr.safeParse(G),
    [G]
  ), ie = b.useCallback(() => {
    const I = yr.safeParse(p);
    I.success && (a == null || a(I.data), w(p));
  }, [p, a]), se = p !== k, P = (x == null ? void 0 : x.kind) === "widget" ? p.widgets.find((I) => I.id === x.id) ?? null : null;
  b.useEffect(() => {
    (x == null ? void 0 : x.kind) === "widget" && !p.widgets.some((I) => I.id === x.id) && _(null);
  }, [x, p.widgets]);
  const E = b.useCallback(() => _(null), []), C = (x == null ? void 0 : x.kind) === "variables" ? "Dashboard variables" : P ? P.title ?? `${nb(P.type)} widget` : "";
  return /* @__PURE__ */ l(da, { families: g, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((V = (O = p.grid) == null ? void 0 : O.margin) == null ? void 0 : V[0]) ?? 12 },
      className: R("cv-dashboard-editor", h),
      children: [
        /* @__PURE__ */ l(
          ov,
          {
            name: p.name ?? "",
            onNameChange: $,
            onAdd: te,
            onEditVariables: () => _({ kind: "variables" }),
            onUndo: s,
            onRedo: u,
            canUndo: c,
            canRedo: m,
            onDiscard: d,
            discardDisabled: !se,
            onSave: a ? ie : void 0,
            saveDisabled: !oe.success || !se,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        oe.success ? null : /* @__PURE__ */ v("p", { className: "cv-dashboard-editor-validation", children: [
          oe.error.issues.length,
          " validation issue",
          oe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: x ? null : /* @__PURE__ */ l(
          kv,
          {
            spec: p,
            selectedId: N,
            onSelect: z,
            onEdit: J,
            onDuplicate: re,
            onDelete: K,
            onLayoutChange: ue
          }
        ) }),
        x ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": C,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ v("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ v("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: E, children: [
                    /* @__PURE__ */ l(qr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: C })
                ] }),
                P ? /* @__PURE__ */ v(
                  U,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => K(P.id),
                    children: [
                      /* @__PURE__ */ l(Ot, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: x.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(Qv, { variables: p.variables, onChange: H }) }) : (P == null ? void 0 : P.type) === "chart" ? /* @__PURE__ */ l(
                wi,
                {
                  fill: !0,
                  widget: P,
                  variables: p.variables,
                  onChange: ae,
                  onVariablesChange: H
                }
              ) : P ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                wi,
                {
                  widget: P,
                  variables: p.variables,
                  onChange: ae,
                  onVariablesChange: H
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function nb(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function rb(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function ab(e, t, n) {
  const r = new Map(t.widgets.map((c) => [c.id, c])), a = new Set(e.widgets.map((c) => c.id)), i = e.widgets.map(
    (c) => n.has(c.id) && r.has(c.id) ? r.get(c.id) : c
  );
  for (const c of t.widgets)
    !a.has(c.id) && n.has(c.id) && i.push(c);
  const o = new Map(t.layout.map((c) => [c.i, c])), s = new Set(e.layout.map((c) => c.i)), u = e.layout.map(
    (c) => n.has(c.i) && o.has(c.i) ? o.get(c.i) : c
  );
  for (const c of t.layout)
    !s.has(c.i) && n.has(c.i) && u.push(c);
  return { ...e, widgets: i, layout: u };
}
export {
  au as AreaChartFamily,
  zc as AreaFamilyOptionsSchema,
  Ul as AxesOptionsSchema,
  Ea as AxisOptionsSchema,
  Db as BUILTIN_CHART_FAMILIES,
  Be as BUILTIN_DEFAULTS,
  We as BUILTIN_FAMILY_OPTION_SCHEMAS,
  nu as BarChartFamily,
  Pc as BarFamilyOptionsSchema,
  _s as CANONICAL_BREAKPOINT,
  Je as ChartColorTokenSchema,
  tv as ChartEditOverlay,
  iv as ChartEditor,
  Vl as ChartFamilySchema,
  ea as ChartInteractionProvider,
  Yi as ChartOptionsSchema,
  So as ChartRenderer,
  Xi as ChartSpecSchema,
  Gl as ChartTransformSchema,
  Wb as ChartView,
  Xl as ChartWidgetSchema,
  Hl as ColorAssignmentSchema,
  qc as CondFormatRuleSchema,
  ha as CubeChart,
  Nf as CubeChartSpec,
  Gi as CubeQuerySchema,
  Gn as CubeVizContext,
  zb as CubeVizProvider,
  qn as DEFAULT_COLOR_RAMP,
  Rs as DEFAULT_COLS,
  Ha as DEFAULT_MARK_THEME,
  fn as DEFAULT_TRANSFORM_WINDOW,
  _r as DEFAULT_UNIT_CONVERSIONS,
  Rn as DRAG_HANDLE_CLASS,
  jb as Dashboard,
  Bb as DashboardEditor,
  fa as DashboardProvider,
  yr as DashboardSpecSchema,
  vr as DateRangeSchema,
  Kc as EMPTY_FAMILY_DEFAULT,
  $a as EM_DASH,
  kv as EditorCanvas,
  ov as EditorToolbar,
  da as FamilyRegistryOverride,
  Hp as FilterBuilder,
  Fl as FilterOperatorSchema,
  jl as FormatKindSchema,
  Gr as FormatOptionsSchema,
  Mc as GRANULARITY_PATTERN,
  Qe as GranularitySchema,
  rc as GridConfigSchema,
  fu as HeatmapChartFamily,
  Hc as HeatmapFamilyOptionsSchema,
  Ql as InputControlKindSchema,
  Jl as InputControlSchema,
  Rv as InputWidgetEditor,
  ec as InputWidgetSchema,
  qf as InputWidgetView,
  gu as KpiFamily,
  Wc as KpiFamilyOptionsSchema,
  nc as LayoutItemSchema,
  Pl as LeafFilterSchema,
  Bl as LegendOptionsSchema,
  ru as LineChartFamily,
  $c as LineFamilyOptionsSchema,
  le as MemberSchema,
  Da as OrderDirSchema,
  zl as OrderSpecSchema,
  iu as PieChartFamily,
  Vc as PieFamilyOptionsSchema,
  br as QueryFilterSchema,
  jn as ReferenceLineOptSchema,
  Dr as RenderWidget,
  wt as SCHEMA_VERSION,
  Il as ScalarSchema,
  su as ScatterChartFamily,
  jc as ScatterFamilyOptionsSchema,
  Wl as SeriesMappingSchema,
  La as SeriesMetaSchema,
  Zi as SpecSchema,
  Bc as TableColumnOptSchema,
  Ru as TableFamily,
  Uc as TableFamilyOptionsSchema,
  Nv as TextWidgetEditor,
  Zl as TextWidgetSchema,
  Sf as TextWidgetView,
  $l as TimeDimensionSchema,
  Yl as TipTapDocSchema,
  ql as TooltipOptionsSchema,
  Kl as TransformKindSchema,
  Sn as VarRefSchema,
  ac as VariableDeclSchema,
  Qi as VariableTypeSchema,
  Ki as VariableValueSchema,
  Qv as VariablesPanel,
  Vo as WidgetChrome,
  wi as WidgetEditPanel,
  tc as WidgetSpecSchema,
  dp as adaptiveGranularity,
  Os as appendWidget,
  Ku as areaChartFamily,
  Ga as assignColors,
  of as axisKey,
  Uu as barChartFamily,
  ua as buildFamilyRegistry,
  $b as builtinCharts,
  ze as builtinFamilyDescriptors,
  Bn as builtinFamilyRegistry,
  wc as createCubeClient,
  Bv as createIdFactory,
  _o as createQueryResolver,
  Oo as createUnitsFormatter,
  Mm as createVariableStore,
  Tc as datePattern,
  kr as deepMerge,
  ca as defaultChartFamilies,
  Yv as defaultForType,
  Jr as defaultFormatter,
  Nc as fetchMeta,
  Fb as formatCategory,
  Kt as formatDateValue,
  rp as geoPointId,
  Qu as heatmapChartFamily,
  Tt as isEmptyValue,
  Me as isVarRef,
  Ju as kpiChartFamily,
  Hu as lineChartFamily,
  kc as loadSpec,
  Qr as looksLikeIsoDate,
  Xr as makeChartFormat,
  Ib as makeDateFormatter,
  Pb as makeFormatter,
  lv as mergeLayout,
  Kn as mergeUnitConversions,
  qv as newChartWidget,
  Hv as newInputWidget,
  Uv as newTextWidget,
  Gv as newVariable,
  Kv as newWidget,
  xo as normalize,
  sv as pickCanonicalLayout,
  Gu as pieChartFamily,
  uv as placeNewItem,
  lf as quantityLabel,
  dv as removeWidget,
  fv as replaceWidget,
  df as resolveChart,
  Co as resolveMarkTheme,
  em as resolveOptions,
  Gc as resolveOptionsWith,
  To as resolveQuery,
  ym as resolveRelativeDateRange,
  Mo as resolveSeriesColors,
  wm as resolveValue,
  Lb as safeLoadSpec,
  Yu as scatterChartFamily,
  Xu as tableChartFamily,
  eo as toDate,
  um as toResultAnnotation,
  rv as useChartEditorState,
  ao as useChartInteractions,
  Lo as useContainerWidth,
  Ve as useCubeMeta,
  Ao as useCubeQuery,
  Ie as useCubeVizContext,
  Do as useDashboard,
  Ts as useDebouncedCallback,
  it as useFamilyRegistry,
  Vb as useFormatter,
  or as useNormalizedSeries,
  ln as useOptionalDashboard,
  Eb as validateSpec
};
//# sourceMappingURL=index.js.map
