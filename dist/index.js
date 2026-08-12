var As = Object.defineProperty;
var Ds = (e, t, n) => t in e ? As(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ma = (e, t, n) => Ds(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as v, Fragment as ue } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as ee, createContext as Ci, useContext as zr, useState as Nt, useCallback as Ye, useEffect as rn, useRef as ot, createElement as Ls, useSyncExternalStore as Si, useId as Es, Component as Is } from "react";
import { ruleX as xi, ruleY as Mi, text as Jt, colorLegend as Vr, group as Fs, stack as Ti, barX as Ta, barY as Ra, lineX as Ps, lineY as In, defineChart as et, areaY as dr, dot as Ri, cell as $s } from "@tanstack/charts";
import { crosshair as _i } from "@tanstack/charts/crosshair";
import { scaleBand as zs } from "@tanstack/charts/scales/band";
import { scaleLinear as yn } from "@tanstack/charts/scales/linear";
import { scalePoint as Vs } from "@tanstack/charts/scales/point";
import { Chart as js } from "@tanstack/charts/react/core";
import { motion as Oi } from "@tanstack/charts/motion";
import { tooltip as jr } from "@tanstack/charts/tooltip";
import { d3Curve as Zn } from "@tanstack/charts/d3/shape";
import { brushX as Ws } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Hs } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Bs, scaleLog as _a, scaleSqrt as qs } from "d3-scale";
import { curveNatural as Us, curveStepAfter as Ks, curveMonotoneX as Gs } from "d3-shape";
import { format as pe, isValid as It, parseISO as kn, subDays as we, startOfWeek as wn, endOfWeek as Nn, startOfMonth as st, endOfMonth as Ht, startOfQuarter as lt, endOfQuarter as Bt, startOfYear as ct, endOfYear as qt, subWeeks as fr, subMonths as ut, subQuarters as mt, subYears as dt, differenceInCalendarDays as Ys, parse as Ai } from "date-fns";
import { z as f } from "zod";
import { clsx as Qs } from "clsx";
import { Minus as Di, ArrowUp as Fn, ArrowDown as Pn, CalendarRange as Li, ChevronsUpDown as Js, AreaChart as Xs, BarChart3 as Ei, Grid3X3 as Zs, Table as el, Gauge as tl, ScatterChart as nl, PieChart as rl, LineChart as al, AlertCircle as Wr, ChevronLeft as Hr, ChevronRight as an, ChevronDown as tt, Check as nt, ChevronUp as il, CalendarIcon as Ii, MoreVertical as ol, RefreshCw as sl, Image as ll, Sheet as cl, Type as Br, MapPin as Fi, Hash as hr, Calendar as Pi, Search as ul, ListChecks as ml, Table2 as $i, Database as zi, Layers as qr, Variable as dl, Plus as Ct, Trash2 as Rt, ListFilter as fl, Box as Vi, EyeOff as ji, Eye as Wi, X as Oa, Save as Hi, SlidersHorizontal as hl, Braces as pl, Undo2 as gl, Redo2 as vl, RotateCcw as bl, Pencil as yl, Copy as kl, Bold as wl, Italic as Nl, Strikethrough as Cl, Heading1 as Sl, Heading2 as xl, List as Ml, ListOrdered as Tl, Quote as Rl } from "lucide-react";
import * as Cn from "@radix-ui/react-popover";
import { cva as Ur } from "class-variance-authority";
import * as Ce from "@radix-ui/react-select";
import _l from "@cubejs-client/core";
import { DayPicker as Ol, useDayPicker as Al } from "react-day-picker";
import { pie as Dl, radialArc as pr, radialText as er, polar as Bi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as qi } from "react-grid-layout";
import { useEditor as Ui, EditorContent as Ki } from "@tiptap/react";
import Gi from "@tiptap/starter-kit";
const kt = 3, Sn = f.object({ var: f.string().min(1) }).strict();
function Me(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const xn = (e) => f.union([e, Sn]), Ll = f.union([f.string(), f.number(), f.boolean()]), Je = f.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), gr = f.union([f.tuple([f.string(), f.string()]), f.string()]), Yi = f.union([
  f.string(),
  f.number(),
  f.boolean(),
  f.tuple([f.string(), f.string()]),
  // absolute date range
  f.array(f.string()),
  f.array(f.number())
]), se = f.string().min(1), El = f.enum([
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
]), Il = f.object({
  member: se,
  operator: El,
  values: f.array(f.union([Ll, Sn])).optional()
}).strict(), vr = f.lazy(
  () => f.union([
    Il,
    f.object({ and: f.array(vr) }).strict(),
    f.object({ or: f.array(vr) }).strict()
  ])
), Fl = f.object({
  dimension: se,
  granularity: xn(Je).optional(),
  dateRange: xn(gr).optional(),
  compareDateRange: f.array(gr).optional()
}).strict(), Aa = f.enum(["asc", "desc"]), Pl = f.union([
  f.record(se, Aa),
  f.array(f.tuple([se, Aa]))
]), Qi = f.object({
  measures: f.array(se).optional(),
  dimensions: f.array(se).optional(),
  timeDimensions: f.array(Fl).optional(),
  filters: f.array(vr).optional(),
  segments: f.array(se).optional(),
  order: Pl.optional(),
  limit: xn(f.number()).optional(),
  offset: xn(f.number()).optional(),
  total: f.boolean().optional(),
  timezone: f.string().optional()
}).strict(), $l = f.string().min(1), xb = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Xe = f.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), zl = f.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Kr = f.object({
  kind: zl.optional(),
  decimals: f.number().optional(),
  abbreviate: f.boolean().optional(),
  prefix: f.string().optional(),
  suffix: f.string().optional(),
  unitSystem: f.enum(["metric", "imperial"]).optional(),
  dateFormat: f.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: f.string().optional()
}).strict(), Da = f.object({
  label: f.string().optional(),
  colorToken: Xe.optional(),
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
}).strict(), Vl = f.object({
  category: f.object({ member: se }).strict(),
  series: f.union([
    f.object({
      mode: f.literal("measures"),
      members: f.array(se),
      meta: f.record(se, Da).optional()
    }).strict(),
    f.object({
      mode: f.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: se,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: f.array(se).optional(),
      pivot: se,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: f.record(se, Da).optional()
    }).strict()
  ])
}).strict(), jl = f.object({
  show: f.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: f.enum(["top", "bottom"]).optional()
}).strict(), Wl = f.object({
  show: f.boolean().optional(),
  indicator: f.enum(["dot", "line", "dashed"]).optional(),
  showTotal: f.boolean().optional()
}).strict(), La = f.object({
  label: f.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: f.boolean().optional(),
  hide: f.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: f.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: f.tuple([f.number(), f.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Kr.optional()
}).strict(), Hl = f.object({
  x: La.optional(),
  y: La.optional()
}).strict(), Bl = f.object({
  byKey: f.record(f.string(), Xe).optional(),
  ramp: f.array(Xe).optional()
}).strict(), dn = 7, ql = f.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Ul = f.object({
  kind: ql,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: f.number().int().min(2).max(90).optional()
}).strict(), Ji = f.object({
  family: $l,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Vl.optional(),
  orientation: f.enum(["vertical", "horizontal"]).optional(),
  stackMode: f.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: jl.optional(),
  tooltip: Wl.optional(),
  axes: Hl.optional(),
  colors: Bl.optional(),
  format: Kr.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: Ul.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: f.record(f.string(), f.unknown()).optional()
}).strict(), Kl = f.object({ type: f.string(), content: f.array(f.unknown()).optional() }).passthrough(), Gl = f.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Yl = f.object({
  variable: f.string().min(1),
  control: f.discriminatedUnion("kind", [
    f.object({
      kind: f.literal("dateRange"),
      presets: f.array(f.string()).optional(),
      allowFuture: f.boolean().optional()
    }).strict(),
    f.object({
      kind: f.literal("granularity"),
      options: f.array(Je).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: f.string().optional()
    }).strict(),
    f.object({
      kind: f.literal("select"),
      options: f.array(f.object({ value: Yi, label: f.string() }).strict()),
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
}).strict(), Gr = {
  id: f.string().min(1),
  title: f.string().optional()
}, Ql = f.object({ ...Gr, type: f.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), Jl = f.object({ ...Gr, type: f.literal("text"), doc: Kl }).strict(), Xl = f.object({ ...Gr, type: f.literal("input"), control: Yl }).strict(), Zl = f.discriminatedUnion("type", [
  Ql,
  Jl,
  Xl
]), ec = f.object({
  i: f.string(),
  x: f.number(),
  y: f.number(),
  w: f.number(),
  h: f.number(),
  minW: f.number().optional(),
  minH: f.number().optional(),
  static: f.boolean().optional()
}).strict(), tc = f.object({
  cols: f.number().optional(),
  rowHeight: f.number().optional(),
  margin: f.tuple([f.number(), f.number()]).optional(),
  containerPadding: f.tuple([f.number(), f.number()]).optional()
}).strict(), Xi = f.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), nc = f.object({
  name: f.string().min(1),
  type: Xi,
  label: f.string().optional(),
  array: f.boolean().optional(),
  default: Yi.optional()
}).strict(), Zi = {
  schemaVersion: f.literal(kt),
  id: f.string().min(1),
  name: f.string().optional(),
  description: f.string().optional(),
  createdAt: f.string().optional(),
  updatedAt: f.string().optional()
}, eo = f.object({ ...Zi, kind: f.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), br = f.object({
  ...Zi,
  kind: f.literal("dashboard"),
  variables: f.array(nc),
  widgets: f.array(Zl),
  layout: f.array(ec),
  grid: tc.optional()
}).strict(), to = f.discriminatedUnion("kind", [eo, br]);
function le(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function _t(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function rc(e) {
  if (!le(e.axes)) return;
  const t = _t(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function ac(e) {
  if (!le(e.mapping)) return;
  const t = e.mapping.series;
  if (!le(t) || !le(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!le(a)) continue;
    const i = _t(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function ic(e) {
  if (!le(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => le(n) ? _t(n, "side") ?? {} : n
  ));
}
function oc(e) {
  const t = le(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(le) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = le(e.mapping) ? e.mapping : void 0, a = r && le(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = le(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function Ea(e) {
  le(e) && (e.family === "combo" && oc(e), rc(e), ac(e), ic(e));
}
function sc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ea(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      le(n) && n.type === "chart" && Ea(n.chart);
  return t;
}
function lc(e) {
  if (!le(e.mapping)) return;
  const t = e.mapping.series;
  if (!le(t) || !le(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!le(a)) continue;
    const i = _t(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function cc(e) {
  if (!le(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function uc(e) {
  if (le(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!le(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = _t(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function mc(e) {
  if (!le(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = _t(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Ia(e) {
  le(e) && (lc(e), cc(e), uc(e), mc(e));
}
function dc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ia(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      le(n) && n.type === "chart" && Ia(n.chart);
  return t;
}
const fc = {
  1: sc,
  2: dc
};
function hc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${kt} — update the library`
    );
  for (; n < kt; ) {
    const r = fc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return to.parse(t);
}
function Mb(e) {
  try {
    return { ok: !0, spec: hc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Tb(e) {
  return to.parse(e);
}
function pc(e) {
  return _l(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function gc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function R(...e) {
  return Qs(e);
}
function vc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: R("cv-skeleton", e), ...t });
}
const bc = Ur(
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
    className: R(bc({ variant: t }), e),
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
const yc = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, kc = "MMM d, yyyy";
function no(e) {
  if (e instanceof Date) return It(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return It(r) ? r : null;
  }
  const t = kn(e);
  if (It(t)) return t;
  const n = new Date(e);
  return It(n) ? n : null;
}
function Yr(e) {
  return /^\d{4}-\d{2}/.test(e) ? It(kn(e)) : !1;
}
function wc(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? yc[t] : kc;
}
function Ut(e, t, n) {
  const r = no(e);
  return r ? pe(r, wc(t, n)) : String(e);
}
function Rb(e, t) {
  return (n) => n == null ? "" : Ut(n, e, t);
}
function _b(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ut(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ut(e, t.format, t.granularity) : String(e) : Yr(e) ? Ut(e, t.format, t.granularity) : e;
}
const Fa = "—", Nc = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Pa(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Cc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of Nc)
    if (n >= r) return Pa((e / r).toFixed(t)) + a;
  return Pa(e.toFixed(t));
}
function Sc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function xc(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Cc(e, n.decimals ?? 1) : Sc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function ro(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Mc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || ro(e.value) ? !0 : typeof e.value == "string" ? Yr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Qr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Fa : (ro(t) || typeof t == "string" || typeof t == "number") && Mc(e) ? Ut(t, n, r) : typeof t == "number" ? xc(t, e) : String(t);
};
function Tc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ob(e, t) {
  return (n, r) => {
    const a = r ? Tc(r, t) : void 0;
    return Qr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Rc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function _c(e) {
  const t = Je.safeParse(e);
  return t.success ? t.data : void 0;
}
function Oc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = _c(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Jr(e, t, n, r) {
  const a = Oc(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : Jr(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, c = "value") {
      const u = s ? Rc(s, e) : void 0, m = u == null ? void 0 : u.meta;
      return n({
        value: o,
        member: s,
        meta: m,
        title: (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title),
        role: c,
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
  colorToken: Xe.optional()
}).strict(), Xr = f.boolean().optional(), Ac = f.object({
  barRadius: f.number().optional(),
  barCategoryGap: f.union([f.number(), f.string()]).optional(),
  barGap: f.union([f.number(), f.string()]).optional(),
  maxBarSize: f.number().optional(),
  showValueLabels: f.boolean().optional(),
  referenceLines: f.array(jn).optional(),
  comparePrevious: Xr
}).strict(), ao = f.enum(["linear", "monotone", "step", "natural"]), Dc = f.object({
  curve: ao.optional(),
  strokeWidth: f.number().optional(),
  dots: f.union([f.boolean(), f.literal("active")]).optional(),
  connectNulls: f.boolean().optional(),
  chrome: f.enum(["full", "none"]).optional(),
  referenceLines: f.array(jn).optional(),
  showValueLabels: f.boolean().optional(),
  comparePrevious: Xr
}).strict(), Lc = f.object({
  curve: ao.optional(),
  fillOpacity: f.number().optional(),
  strokeWidth: f.number().optional(),
  connectNulls: f.boolean().optional(),
  dots: f.boolean().optional(),
  referenceLines: f.array(jn).optional(),
  comparePrevious: Xr
}).strict(), Ec = f.object({
  innerRadiusPct: f.number().optional(),
  outerRadiusPct: f.number().optional(),
  padAngle: f.number().optional(),
  cornerRadius: f.number().optional(),
  showLabels: f.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: f.object({ value: f.string().optional(), label: f.string().optional() }).strict().optional(),
  maxSlices: f.number().optional()
}).strict(), Ic = f.object({
  x: se,
  y: se,
  size: se.optional(),
  sizeRange: f.tuple([f.number(), f.number()]).optional(),
  groupBy: se.optional(),
  referenceLines: f.array(jn).optional()
}).strict(), Fc = f.object({
  display: f.enum(["number", "gauge"]).optional(),
  measure: se,
  comparison: f.object({
    mode: f.enum(["previousPeriod", "value"]),
    value: f.union([se, f.number()]).optional(),
    showAsPercent: f.boolean().optional(),
    goodDirection: f.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: f.object({
    member: se.optional(),
    timeDimension: se.optional(),
    granularity: f.union([Je, Sn]).optional(),
    dateRange: f.union([gr, Sn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: f.enum(["up", "down"]).optional(),
  gauge: f.object({
    min: f.number().optional(),
    max: f.number(),
    thresholds: f.array(f.object({ at: f.number(), colorToken: Xe }).strict()).optional()
  }).strict().optional()
}).strict(), Pc = f.object({
  member: se,
  label: f.string().optional(),
  format: Kr.optional(),
  align: f.enum(["left", "right", "center"]).optional(),
  width: f.number().optional(),
  hidden: f.boolean().optional()
}).strict(), $c = f.object({
  member: se,
  when: f.object({
    op: f.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: f.number()
  }).strict(),
  colorToken: Xe.optional()
}).strict(), zc = f.object({
  columns: f.array(Pc).optional(),
  pageSize: f.number().optional(),
  sortable: f.boolean().optional(),
  stickyHeader: f.boolean().optional(),
  rowHeight: f.enum(["compact", "default"]).optional(),
  showRowNumbers: f.boolean().optional(),
  conditionalFormat: f.array($c).optional()
}).strict(), Vc = f.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Xe.optional(),
  /** Print each cell's formatted value inside the cell. */
  showValues: f.boolean().optional()
}).strict(), He = {
  bar: Ac,
  line: Dc,
  area: Lc,
  pie: Ec,
  scatter: Ic,
  heatmap: Vc,
  kpi: Fc,
  table: zc
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
      barRadius: 4,
      maxBarSize: 64,
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
      strokeWidth: 2,
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
      fillOpacity: 0.4,
      strokeWidth: 2,
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
      outerRadiusPct: 80,
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
    familyOptions: {
      sizeRange: [40, 400]
    }
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
      colorToken: "chart-1",
      showValues: !1
    }
  },
  table: {
    envelope: {},
    familyOptions: {
      pageSize: 25,
      sortable: !0,
      stickyHeader: !0,
      rowHeight: "default"
    }
  }
};
function $a(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function yr(e, t) {
  if (t === void 0) return e;
  if (!$a(e) || !$a(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? yr(e[r], a) : a);
  }
  return n;
}
const jc = { envelope: {}, familyOptions: {} };
function Wc(e, t) {
  return {
    ...yr({ ...t.envelope }, e),
    familyOptions: yr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const io = {}, za = () => {
}, Hc = {
  target: io,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: za,
  emitPoint: za
}, Mn = b.createContext(null);
Mn.displayName = "ChartInteractionContext";
function oo() {
  return b.useContext(Mn) ?? Hc;
}
function Zr({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Mn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((g) => {
    const { parent: y, widgetId: k, onRangeSelect: w } = o.current, S = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(S) : y == null || y.emitRange(S);
  }, []), c = b.useCallback((g) => {
    const { parent: y, widgetId: k, onPointSelect: w } = o.current, S = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(S) : y == null || y.emitPoint(S);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), d = i == null ? void 0 : i.target, h = b.useMemo(
    () => d || r ? { ...d, ...r } : io,
    [d, r]
  ), p = b.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: h,
      rangeEnabled: u,
      pointEnabled: m,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, h, u, m, s, c]
  );
  return /* @__PURE__ */ l(Mn.Provider, { value: p, children: a });
}
function Ge(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var s, c, u;
    const o = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const m of n) {
      const d = m.data[i] ?? null;
      d === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: d,
        key: m.key,
        label: m.label,
        member: ((c = m.meta) == null ? void 0 : c.measure) ?? m.key,
        companion: ((u = m.meta) == null ? void 0 : u.companion) ?? !1,
        i
      });
    }
  }), r;
}
function kr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function so(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = kr(n), a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function wr(e, t, n) {
  const r = [];
  return e.categories.forEach((a, i) => {
    var m, d, h;
    const o = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const p of t) {
      const g = p.data[i];
      if (typeof g == "number" && Number.isFinite(g)) {
        const y = kr(p);
        s.set(y, (s.get(y) ?? 0) + Math.abs(g));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const p of t) {
      const g = p.data[i] ?? null, y = kr(p), k = s.get(y) ?? 0, w = g === null || k === 0 ? null : Math.abs(g) / k;
      let S = 0, N = 0;
      if (g !== null) {
        const C = g < 0 ? u : c;
        S = C.get(y) ?? 0, N = S + g, C.set(y, N);
      }
      const x = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: g,
        key: p.key,
        label: p.label,
        member: ((d = p.meta) == null ? void 0 : d.measure) ?? p.key,
        companion: ((h = p.meta) == null ? void 0 : h.companion) ?? !1,
        i,
        stack: y,
        y1: S * x,
        y2: N * x,
        share: w
      });
    }
  }), r;
}
function Nr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Xt(e) {
  return e.label || e.key;
}
function Ke(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ea(e, t) {
  const n = e.series.map(Xt), r = e.series.map(Ke), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Vr({ placement: Ot(t.legendPlacement) })), a;
}
function Ot(e) {
  return e === "top" ? "top" : "bottom";
}
function on(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Tn(e = 0.2) {
  return zs().padding(e);
}
function lo() {
  return Vs().padding(0.02);
}
const Bc = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function qc(e) {
  if (typeof e == "string" && Bc.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return no(e);
}
function co(e) {
  return e.toISOString().slice(0, -1);
}
function Va(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Je.safeParse(n);
  return r.success ? r.data : void 0;
}
function uo(e, t) {
  var m, d, h;
  const n = (d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member, r = (h = e.raw.annotation) == null ? void 0 : h.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const p of Object.keys(r))
    if (p === n || p.startsWith(`${n}.`)) {
      a = p;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? Va(n) : Va(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const p of e.categories) {
    if (typeof p == "number" && i === void 0 || typeof p == "string" && !Yr(p)) return null;
    const g = qc(p);
    if (!g) return null;
    s.push(g);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((p) => c.has(p.getTime()) ? !1 : (c.add(p.getTime()), !0)).sort((p, g) => p.getTime() - g.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function mo(e) {
  return e ? Bs : lo;
}
function ta(e) {
  return e ? "t" : "cat";
}
function Rn(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? co(r)) : t.category(r);
}
function ja(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : co(t);
}
function fo(e, t) {
  const n = oo(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (p) => p !== void 0 && s.some((g) => g.getTime() === p.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], d = u ?? { start: m, end: m }, h = u === null;
    return [
      Ws({
        id: "cv-brush-x",
        values: s,
        range: Hs(
          d,
          (p, { reason: g }) => {
            if (g.type !== "commit") return;
            const y = i.current.temporal, k = p.start.getTime() === p.end.getTime();
            if (a(k ? null : p), k || !y) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: y.member,
              granularity: y.granularity,
              from: ja(y, p.start),
              to: ja(y, p.end)
            });
          }
        ),
        format: (p) => i.current.opts.label(p),
        ariaLabel: t.ariaLabel ?? "Time range",
        startAriaLabel: "Range start",
        endAriaLabel: "Range end",
        // The behavior PAINTS its handles (they are its keyboard sliders), so the
        // collapsed resting range would otherwise show as a solid block against the
        // first bucket. Resting paints nothing at all; a committed range gets the
        // real selection wash plus visible grips.
        handleSize: 10,
        selectionStyle: h ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: h ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function Uc(e, t) {
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
function St(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? _a().domain(r) : _a();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: yn().domain(r), nice: !1 } : { scale: yn, nice: !0 };
}
function Cr(e, t) {
  var n;
  return ((n = e.meta) == null ? void 0 : n.curve) ?? t;
}
function ho(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function ft(e) {
  switch (e) {
    case "monotone":
      return Zn(Gs);
    case "step":
      return Zn(Ks);
    case "natural":
      return Zn(Us);
    default:
      return;
  }
}
function na(e, t) {
  var o, s, c, u, m, d, h, p, g, y;
  const n = e.raw.annotation, r = (k) => {
    var w, S, N, x, C, T;
    if (k)
      return ((w = n == null ? void 0 : n.measures[k]) == null ? void 0 : w.shortTitle) ?? ((S = n == null ? void 0 : n.dimensions[k]) == null ? void 0 : S.shortTitle) ?? ((N = n == null ? void 0 : n.timeDimensions[k]) == null ? void 0 : N.shortTitle) ?? ((x = n == null ? void 0 : n.measures[k]) == null ? void 0 : x.title) ?? ((C = n == null ? void 0 : n.dimensions[k]) == null ? void 0 : C.title) ?? ((T = n == null ? void 0 : n.timeDimensions[k]) == null ? void 0 : T.title) ?? k;
  }, a = e.series[0], i = (k) => {
    var w;
    return k ? (w = k.meta) != null && w.measure ? r(k.meta.measure) : k.label : void 0;
  };
  return {
    x: (s = (o = t.axes) == null ? void 0 : o.x) != null && s.labelHide ? void 0 : ((u = (c = t.axes) == null ? void 0 : c.x) == null ? void 0 : u.label) ?? r((d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member),
    y: (p = (h = t.axes) == null ? void 0 : h.y) != null && p.labelHide ? void 0 : ((y = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : y.label) ?? i(a)
  };
}
function Ie(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function ra(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Kc(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function Ze(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function aa(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Wn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: jr,
    className: aa(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((d) => {
        var h;
        return { datum: d, color: (h = e.colorOf) == null ? void 0 : h.call(e, d) };
      }) : a.map((d) => ({ datum: d.datum, color: d.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const d of s) {
          const h = d.datum.value;
          d.datum.companion || typeof h != "number" || !Number.isFinite(h) || (c += h, u += 1);
        }
      const m = s.map((d) => ({
        label: d.datum.label,
        value: e.percentShare && c > 0 && typeof d.datum.value == "number" ? Ze(d.datum.value / c, e.locale) : n(d.datum),
        color: d.color
      }));
      return e.showTotal && u > 1 && m.push({
        label: "Total",
        value: e.percentShare ? Ze(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: m };
    }
  };
}
function ia(e) {
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
function oa(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], a = t[0];
  return e.forEach((i, o) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", m = u ? t[i.value] : void 0;
    if (u && m == null) return;
    const d = n != null && n.swap ? !u : u, h = d ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      d ? xi([h], { id: `cv-ref-${o}`, ...c }) : Mi([h], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const p = u ? n == null ? void 0 : n.valueAnchor : a;
    if (p == null) return;
    const g = (n == null ? void 0 : n.swap) === !0;
    r.push(
      ia(
        Jt(
          [
            {
              x: d ? h : p,
              y: d ? p : h,
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
            dy: d ? g ? -6 : 8 : -6,
            dx: d ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function sa(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function po(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = ta((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? Ze(c, n.locale) : "";
  };
  return [
    ia(
      Jt(r, {
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
const Gc = Oi({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Yc = Oi({ initial: !1 });
function rt({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = b.useRef(null), u = oo(), m = u.pointEnabled && !r, d = b.useRef(s);
  b.useLayoutEffect(() => {
    d.current = s;
  });
  const h = b.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const S = d.current, N = S ? S(w) : Uc(w, u.target);
      N && u.emitPoint(N);
    },
    [u]
  ), [p, g] = b.useState({ w: 0, h: 0 }), y = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((N) => {
      var C;
      const x = (C = N[0]) == null ? void 0 : C.contentRect;
      x && g({ w: Math.floor(x.width), h: Math.floor(x.height) });
    });
    return S.observe(w), () => S.disconnect();
  }, []);
  const k = r ? Math.max(24, p.h || Math.round((p.w || 160) / 5)) : Math.max(i, p.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: p.w > 0 && /* @__PURE__ */ l(
        js,
        {
          definition: e,
          renderer: a ? Gc : Yc,
          width: p.w,
          height: k,
          ariaLabel: t,
          idPrefix: y,
          onSelect: o ?? (m ? h : void 0)
        }
      )
    }
  );
}
function Wa(e, t) {
  let n;
  return e === void 0 ? n = t : typeof e == "string" ? n = Number.parseFloat(e) / 100 : n = e > 1 ? e / 100 : e, Number.isFinite(n) || (n = t), Math.min(0.9, Math.max(0, n));
}
function Qc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = b.useMemo(() => {
    var q, re, ie, me, fe, V, G, J, oe, ae, $, j;
    const o = t.orientation === "horizontal", s = t.stackMode === "percent", c = t.stackMode === "stacked" || s, u = e.series.filter((I) => {
      var M;
      return (M = I.meta) == null ? void 0 : M.companion;
    }), m = u.length ? e.series.filter((I) => {
      var M;
      return !((M = I.meta) != null && M.companion);
    }) : e.series, d = c ? m : e.series, p = (c ? so(d) : []).length > 1, g = p ? wr(e, d, { normalize: s }) : Ge(e, { series: d }), y = new Map(e.series.map((I) => [Xt(I), Ke(I)])), k = /* @__PURE__ */ new Map();
    if (p)
      for (const I of g) {
        const M = k.get(I.i);
        M ? M.push(I) : k.set(I.i, [I]);
      }
    const w = na(e, t), S = o ? (re = (q = t.axes) == null ? void 0 : q.y) == null ? void 0 : re.hide : (me = (ie = t.axes) == null ? void 0 : ie.x) == null ? void 0 : me.hide, N = o ? (fe = t.axes) == null ? void 0 : fe.x : (V = t.axes) == null ? void 0 : V.y, x = St(N), C = Wa(r.barCategoryGap, 0.2), T = o ? (G = t.axes) == null ? void 0 : G.y : (J = t.axes) == null ? void 0 : J.x, A = Ie(n, T), W = Ie(n, N), B = Kc(t) ?? ra(e.series[0]), F = (I) => s ? Ze(I) : W.value(I, B, "axis"), O = S ? !1 : {
      label: w.x,
      ticks: { format: (I) => A.category(I) }
    }, _ = N != null && N.hide ? !1 : { label: w.y, ticks: { format: F } }, D = Fs(
      r.barGap === void 0 ? {} : { padding: Wa(r.barGap, 0.1) }
    ), Q = p ? D : s ? Ti({ offset: "normalize" }) : c ? void 0 : D, z = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (I) => p ? I.stack : I.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (I) => `${I.label} ${I.i}`,
      layout: Q,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (I) => {
        const M = y.get(I.label) ?? "var(--chart-1)";
        return I.companion ? `color-mix(in oklab, ${M} 40%, transparent)` : M;
      }
    }, H = [
      p ? o ? Ta(g, { ...z, x1: "y1", x2: "y2", y: "cat" }) : Ra(g, { ...z, x: "cat", y1: "y1", y2: "y2" }) : o ? Ta(g, { ...z, x: "value", y: "cat" }) : Ra(g, { ...z, x: "cat", y: "value" })
    ];
    if (c && !s && u.length) {
      const I = e.categories.map((M, P) => {
        var K, E, L;
        return {
          cat: typeof M == "number" ? M : String(M),
          value: u.reduce((U, te) => {
            const ce = te.data[P];
            return typeof ce != "number" ? U : (U ?? 0) + ce;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((E = (K = u[0]) == null ? void 0 : K.meta) == null ? void 0 : E.measure) ?? ((L = u[0]) == null ? void 0 : L.key),
          companion: !0,
          i: P
        };
      });
      if (I.some((M) => M.value !== null)) {
        const M = {
          id: "cv-bars-prev",
          key: (P) => `prev ${P.i}`,
          curve: ft("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        H.push(
          o ? Ps(I, { ...M, x: "value", y: "cat" }) : In(I, { ...M, x: "cat", y: "value" })
        );
      }
    }
    if (H.push(
      ...oa(r.referenceLines, e.categories, {
        swap: o,
        valueAnchor: sa(e)
      })
    ), r.showValueLabels) {
      const I = c ? p ? g : wr(e, d, { normalize: s }) : g;
      H.push(
        ...po(I, n, {
          swap: o,
          share: s,
          stacked: c
        })
      );
    }
    return et({
      marks: H,
      x: o ? { scale: x.scale, nice: x.nice, grid: !0, axis: _ } : { scale: () => Tn(C), axis: O },
      y: o ? { scale: () => Tn(C), axis: O } : { scale: x.scale, nice: x.nice, grid: !0, axis: _ },
      color: ea(c ? { ...e, series: d } : e, {
        legend: on(t) && d.length > 1,
        legendPlacement: Ot((oe = t.legend) == null ? void 0 : oe.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: o ? "group-y" : "group-x",
      tooltip: ((ae = t.tooltip) == null ? void 0 : ae.show) === !1 ? void 0 : Wn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: s && !p,
        value: s && p ? (I) => {
          const M = I.share;
          return typeof M == "number" ? Ze(M) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: p ? (I) => k.get(I.i) ?? [I] : void 0,
        colorOf: p ? (I) => y.get(I.label) ?? "var(--chart-1)" : void 0,
        indicator: ($ = t.tooltip) == null ? void 0 : $.indicator,
        showTotal: (j = t.tooltip) == null ? void 0 : j.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, r]), i = e.series.map(Xt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(rt, { definition: a, ariaLabel: i, className: "cv-chart--fill" });
}
function Jc({
  data: e,
  options: t,
  format: n
}) {
  var h;
  const r = t.familyOptions ?? {}, a = r.chrome === "none", i = b.useMemo(
    () => a ? null : uo(e, t),
    [e, t, a]
  ), o = b.useMemo(() => Rn(i, n), [i, n]), s = (h = t.axes) == null ? void 0 : h.x, c = b.useMemo(
    () => s != null && s.tickFormat ? Rn(i, Ie(n, s)) : o,
    [i, n, s, o]
  ), u = fo(i, {
    label: o,
    ariaLabel: "Time range"
  }), m = b.useMemo(() => {
    var x, C, T, A, W, B, F, O, _;
    const p = ta(i), g = r.connectNulls ?? !1, y = r.curve ?? "monotone", k = na(e, t), w = St((x = t.axes) == null ? void 0 : x.y), S = e.categories.length <= 1, N = e.series.map((D) => {
      var z, H, q;
      const Q = Ge(e, { series: [D], skipNull: g, temporal: i });
      return In(Q, {
        id: `cv-line-${D.key}`,
        x: p,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        // Per-series shape wins over the family default: the shape picker on a
        // field pill writes `meta.curve`, and reading only `fo.curve` here made
        // that control do nothing.
        curve: ft(Cr(D, y)),
        strokeWidth: r.strokeWidth ?? 2,
        strokeDasharray: (z = D.meta) != null && z.companion ? "5 4" : void 0,
        strokeOpacity: (H = D.meta) != null && H.companion ? 0.55 : void 0,
        stroke: Ke(D),
        points: !a && !((q = D.meta) != null && q.companion) && (ho(D, r.dots) || S)
      });
    });
    return a || (N.push(
      ...oa(r.referenceLines, (i == null ? void 0 : i.dates) ?? e.categories, {
        valueAnchor: sa(e)
      }),
      ...po(
        r.showValueLabels ? Ge(e, { skipNull: !0, temporal: i }) : [],
        n,
        { temporal: i }
      )
    ), N.push(_i({ x: {}, y: !1, marker: r.dots !== !1 }))), et({
      marks: N,
      x: {
        scale: mo(i),
        axis: a || (T = (C = t.axes) == null ? void 0 : C.x) != null && T.hide ? !1 : {
          label: k.x,
          ticks: { format: c }
        }
      },
      y: {
        scale: w.scale,
        nice: w.nice,
        grid: !a,
        axis: a || (W = (A = t.axes) == null ? void 0 : A.y) != null && W.hide ? !1 : {
          label: k.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (D) => {
              var Q, z, H, q;
              return Ie(n, (Q = t.axes) == null ? void 0 : Q.y).value(
                D,
                ((H = (z = e.series[0]) == null ? void 0 : z.meta) == null ? void 0 : H.measure) ?? ((q = e.series[0]) == null ? void 0 : q.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !a,
      color: ea(e, {
        legend: !a && on(t) && e.series.length > 1,
        legendPlacement: Ot((B = t.legend) == null ? void 0 : B.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: a || ((F = t.tooltip) == null ? void 0 : F.show) === !1 ? void 0 : Wn({
        format: n,
        category: o,
        indicator: (O = t.tooltip) == null ? void 0 : O.indicator,
        showTotal: (_ = t.tooltip) == null ? void 0 : _.showTotal
      }),
      margin: a ? 4 : void 0,
      keyboard: !a,
      controls: u
    });
  }, [e, t, n, r, a, i, o, c, u]), d = e.series.map(Xt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    rt,
    {
      definition: m,
      ariaLabel: d,
      sparkline: a,
      className: a ? void 0 : "cv-chart--fill"
    }
  );
}
function Xc({
  data: e,
  options: t,
  format: n
}) {
  var y, k, w;
  const r = t.familyOptions ?? {}, a = ((k = (y = t.mapping) == null ? void 0 : y.series) == null ? void 0 : k.mode) === "pivot", i = t.stackMode ?? (a ? "stacked" : "none"), o = i === "stacked" || i === "percent", s = i === "percent", c = b.useMemo(() => uo(e, t), [e, t]), u = b.useMemo(() => Rn(c, n), [c, n]), m = (w = t.axes) == null ? void 0 : w.x, d = b.useMemo(
    () => m != null && m.tickFormat ? Rn(c, Ie(n, m)) : u,
    [c, n, m, u]
  ), h = fo(c, { label: u, ariaLabel: "Time range" }), p = b.useMemo(() => {
    var re, ie, me, fe, V, G, J, oe, ae;
    const S = ta(c), N = r.connectNulls ?? !1, x = r.curve ?? "monotone", C = ft(x), T = r.fillOpacity ?? 0.4, A = r.strokeWidth ?? 2, W = na(e, t), B = St((re = t.axes) == null ? void 0 : re.y), F = ra(e.series[0]), O = e.series.filter(($) => {
      var j;
      return !((j = $.meta) != null && j.companion);
    }), _ = s ? [] : e.series.filter(($) => {
      var j;
      return (j = $.meta) == null ? void 0 : j.companion;
    }), D = new Map(e.series.map(($) => [$.key, Ke($)])), Q = [], z = ($) => `cv-area-fill-${$.replace(/[^a-zA-Z0-9_-]/g, "-")}`, H = o ? void 0 : O.map(($) => ({
      id: z($.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: Ke($), opacity: T * 0.15 },
        { offset: 1, color: Ke($), opacity: T }
      ]
    }));
    if (o)
      for (const { stackId: $, series: j } of so(O)) {
        const I = Ge(e, { series: j, skipNull: N, temporal: c });
        Q.push(
          dr(I, {
            id: $ ? `cv-area-stack-${$}` : "cv-area-stack",
            x: S,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (M) => `${M.key}:${M.i}`,
            // STACKED draws a whole stack from a single mark, so the shape is a
            // property of that stack — a per-series `meta.curve` cannot apply
            // here (it does in overlap mode, where each series has its own mark).
            curve: C,
            fillOpacity: T,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (M) => D.get(M.key) ?? "currentColor",
            strokeWidth: A,
            layout: s ? Ti({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const $ of O) {
        const j = Ge(e, { series: [$], skipNull: N, temporal: c });
        Q.push(
          dr(j, {
            id: `cv-area-${$.key}`,
            x: S,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            // Per-series shape (the field pill's picker writes `meta.curve`) wins
            // over the family default wherever the series has its own mark.
            curve: ft(Cr($, x)),
            fill: `url(#${z($.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: Ke($),
            strokeWidth: A
          })
        );
      }
    for (const $ of _) {
      const j = Ge(e, { series: [$], skipNull: N, temporal: c });
      Q.push(
        In(j, {
          id: `cv-area-prev-${$.key}`,
          x: S,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: ft(Cr($, x)),
          strokeWidth: A,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: Ke($)
        })
      );
    }
    const q = new Set(
      O.filter(($) => ho($, r.dots)).map(($) => $.key)
    );
    if (q.size > 0) {
      const $ = o ? wr(e, O, { normalize: s, temporal: c }).filter(
        (j) => q.has(j.key) && j.value !== null
      ) : Ge(e, {
        series: O.filter((j) => q.has(j.key)),
        skipNull: !0,
        temporal: c
      });
      Q.push(
        Ri($, {
          id: "cv-area-dots",
          x: S,
          y: (j) => o ? j.y2 ?? null : j.value,
          z: "label",
          color: "label",
          key: (j) => `${j.key}:${j.i}`,
          r: 3
        })
      );
    }
    return Q.push(
      ...oa(r.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories, {
        valueAnchor: sa(e)
      })
    ), Q.push(_i({ x: {}, y: !1, marker: !0 })), et({
      marks: Q,
      gradients: H,
      x: {
        scale: mo(c),
        axis: (me = (ie = t.axes) == null ? void 0 : ie.x) != null && me.hide ? !1 : {
          label: W.x,
          ticks: { format: d }
        }
      },
      y: {
        scale: B.scale,
        nice: B.nice,
        grid: !0,
        axis: (V = (fe = t.axes) == null ? void 0 : fe.y) != null && V.hide ? !1 : {
          label: W.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: ($) => {
              var j;
              return s ? Ze($) : Ie(n, (j = t.axes) == null ? void 0 : j.y).value($, F, "axis");
            }
          }
        }
      },
      color: ea(e, {
        legend: on(t) && e.series.length > 1,
        legendPlacement: Ot((G = t.legend) == null ? void 0 : G.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((J = t.tooltip) == null ? void 0 : J.show) === !1 ? void 0 : Wn({
        format: n,
        percentShare: s,
        category: u,
        indicator: (oe = t.tooltip) == null ? void 0 : oe.indicator,
        showTotal: (ae = t.tooltip) == null ? void 0 : ae.showTotal
      }),
      keyboard: !0,
      controls: h
    });
  }, [e, t, n, r, o, s, c, u, d, h]), g = e.series.map(Xt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(rt, { definition: p, ariaLabel: g, className: "cv-chart--fill" });
}
const Ha = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Zc({ data: e, options: t, format: n }) {
  var p, g;
  const r = t.familyOptions ?? {}, a = e.series[0], i = ra(a), o = (g = (p = t.colors) == null ? void 0 : p.ramp) != null && g.length ? t.colors.ramp : Bn, s = b.useMemo(() => {
    const y = e.categories.map((k, w) => ({
      label: n.category(k),
      value: (a == null ? void 0 : a.data[w]) ?? 0
    }));
    return eu(y, r.maxSlices).map((k, w) => ({
      ...k,
      token: o[w % o.length]
    }));
  }, [e, n, a, r.maxSlices, o]), c = s.reduce((y, k) => y + k.value, 0), u = s.some((y) => y.value < 0), m = u || s.length === 0 || c <= 0, d = b.useMemo(() => {
    var W, B, F;
    if (m) return null;
    const y = (r.innerRadiusPct ?? 0) / 100, k = (r.outerRadiusPct ?? 80) / 100, w = y > 0, S = r.showLabels ?? "percent", N = Dl(s, {
      value: "value",
      gapAngle: (r.padAngle ?? 0) * Math.PI / 180
    }), C = [pr(N, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: O }) => O * y,
      outerRadius: ({ radius: O }) => O * k,
      cornerRadius: r.cornerRadius
    })];
    if (S !== "none") {
      const O = (D) => S === "name" ? D.label : S === "value" ? n.value(D.value, i, "label") : Ze(D.fraction), _ = w ? (y + k) / 2 : k * 0.75;
      C.push(
        er(
          N.filter((D) => D.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (D) => D.angle,
            radius: _,
            text: O,
            fill: "var(--foreground)",
            fontSize: 11,
            anchor: "middle",
            baseline: "middle"
          }
        )
      );
    }
    if (w && r.centerLabel) {
      const O = r.centerLabel.value === void 0 || r.centerLabel.value === "total" ? n.value(c, i, "label") : r.centerLabel.value;
      if (C.push(
        er([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => O,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), r.centerLabel.label) {
        const _ = r.centerLabel.label;
        C.push(
          er([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => _,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const T = {
      domain: s.map((O) => O.label),
      range: s.map((O) => `var(--${O.token})`)
    };
    on(t) && (T.legend = Vr({ placement: Ot((W = t.legend) == null ? void 0 : W.position) }));
    const A = a ? a.label || a.key : "";
    return et({
      marks: [
        Bi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: yn().domain([0, Math.PI * 2]) },
          radius: { scale: yn().domain([0, 1]) },
          marks: C
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: T,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((B = t.tooltip) == null ? void 0 : B.show) === !1 ? void 0 : {
        use: jr,
        className: aa((F = t.tooltip) == null ? void 0 : F.indicator),
        content: (O) => {
          const _ = O[0];
          if (!_) return { rows: [] };
          const D = _.datum;
          return {
            title: D.label,
            rows: [
              {
                label: A,
                value: `${n.value(D.value, i, "tooltip")} (${Ze(D.fraction)})`,
                color: _.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, s, c, t, n, r, a, i]);
  if (u)
    return /* @__PURE__ */ l("div", { style: Ha, children: "Pie charts can't show negative values" });
  if (!d)
    return /* @__PURE__ */ l("div", { style: Ha, children: "No data" });
  const h = s.map((y) => y.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(rt, { definition: d, ariaLabel: h, className: "cv-chart--fill" });
}
function eu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function tu({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.annotation, i = (h) => {
    var p, g;
    return ((p = a == null ? void 0 : a.measures[h]) == null ? void 0 : p.shortTitle) ?? ((g = a == null ? void 0 : a.dimensions[h]) == null ? void 0 : g.shortTitle) ?? h;
  }, o = r.x ? i(r.x) : "x", s = r.y ? i(r.y) : "y", c = r.size ? i(r.size) : void 0, u = b.useMemo(() => {
    var Q, z, H, q, re, ie, me, fe, V, G, J, oe, ae, $, j, I, M, P, K, E;
    if (!r.x || !r.y) return null;
    const h = ru(e.raw.rows, r);
    if (h.length === 0) return null;
    const p = !!r.groupBy, g = [];
    if (p)
      for (const L of h)
        L.group !== void 0 && !g.includes(L.group) && g.push(L.group);
    const [y, k] = r.sizeRange ?? [40, 400], w = Math.sqrt(Math.max(y, 0) / Math.PI), S = Math.sqrt(Math.max(k, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, x = (z = (Q = t.colors) == null ? void 0 : Q.ramp) != null && z.length ? t.colors.ramp : Bn;
    p ? (N.z = "group", N.color = "group") : N.fill = `var(--${x[0]})`, r.size ? (N.r = (L) => L.size ?? 0, N.rScale = { scale: () => qs().range([w, S]) }) : N.r = 4;
    const C = [Ri(h, N)];
    (H = r.referenceLines) == null || H.forEach((L, U) => {
      const te = `var(--${L.colorToken ?? "muted-foreground"})`, ce = { stroke: te, strokeWidth: 1.25, strokeDasharray: "4 4" };
      L.axis === "y" ? (C.push(Mi([L.value], { id: `cv-ref-${U}`, ...ce })), L.label && C.push(
        Jt([{ v: L.value, label: L.label }], {
          id: `cv-ref-label-${U}`,
          y: "v",
          text: "label",
          fill: te,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (C.push(xi([L.value], { id: `cv-ref-${U}`, ...ce })), L.label && C.push(
        Jt([{ v: L.value, label: L.label }], {
          id: `cv-ref-label-${U}`,
          x: "v",
          text: "label",
          fill: te,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let T;
    p && (T = {
      domain: g,
      range: g.map((L, U) => `var(--${x[U % x.length]})`)
    }, on(t) && (T.legend = Vr({ placement: Ot((q = t.legend) == null ? void 0 : q.position) })));
    const A = (ie = (re = t.axes) == null ? void 0 : re.x) != null && ie.labelHide ? void 0 : ((fe = (me = t.axes) == null ? void 0 : me.x) == null ? void 0 : fe.label) ?? o, W = (G = (V = t.axes) == null ? void 0 : V.y) != null && G.labelHide ? void 0 : ((oe = (J = t.axes) == null ? void 0 : J.y) == null ? void 0 : oe.label) ?? s, B = St((ae = t.axes) == null ? void 0 : ae.x), F = St(($ = t.axes) == null ? void 0 : $.y), O = r.x, _ = r.y, D = r.size;
    return et({
      marks: C,
      x: {
        scale: B.scale,
        nice: B.nice,
        grid: !0,
        axis: (I = (j = t.axes) == null ? void 0 : j.x) != null && I.hide ? !1 : {
          label: A,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (L) => {
              var U;
              return Ie(n, (U = t.axes) == null ? void 0 : U.x).value(L, O, "axis");
            }
          }
        }
      },
      y: {
        scale: F.scale,
        nice: F.nice,
        grid: !0,
        axis: (P = (M = t.axes) == null ? void 0 : M.y) != null && P.hide ? !1 : {
          label: W,
          ticks: {
            format: (L) => {
              var U;
              return Ie(n, (U = t.axes) == null ? void 0 : U.y).value(L, _, "axis");
            }
          }
        }
      },
      color: T,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((K = t.tooltip) == null ? void 0 : K.show) === !1 ? void 0 : {
        use: jr,
        className: aa((E = t.tooltip) == null ? void 0 : E.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (L) => {
          const te = L[0];
          if (!te) return { rows: [] };
          const ce = te.datum, We = [
            { label: o, value: n.value(ce.x, O, "tooltip") },
            { label: s, value: n.value(ce.y, _, "tooltip") }
          ];
          return D && We.push({
            label: c ?? D,
            value: n.value(ce.size, D, "tooltip")
          }), { title: ce.group, color: te.color, rows: We };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, r, o, s, c]), m = r.groupBy, d = (h) => {
    var g;
    if (!h || !m) return null;
    const p = (g = h.datum) == null ? void 0 : g.group;
    return p === void 0 ? null : { member: m, value: p, label: p };
  };
  return u ? /* @__PURE__ */ l(
    rt,
    {
      definition: u,
      ariaLabel: `${o} vs ${s} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: d
    }
  ) : /* @__PURE__ */ l("div", { style: nu, children: "No data" });
}
const nu = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function ru(e, t) {
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
function au(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function iu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function ou(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function go(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? ou(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => go(e, t, n), r;
}
function su({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = au(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const h = Nr(s, a), p = Nr(s, i), g = /* @__PURE__ */ new Map();
    return s.forEach((y, k) => {
      const w = iu(y[o]), S = y[h], N = y[p];
      if (w === null || S === null || S === void 0 || N === null || N === void 0)
        return;
      const x = typeof S == "number" ? S : String(S), C = String(N);
      g.set(`${x}\0${C}`, {
        cat: x,
        label: C,
        value: w,
        key: `${x}|${C}`,
        member: o,
        i: k
      });
    }), [...g.values()];
  }, [s, a, i, o]), m = b.useMemo(() => {
    var S, N, x, C, T, A, W, B, F, O, _, D, Q, z;
    let h = Number.POSITIVE_INFINITY, p = Number.NEGATIVE_INFINITY;
    for (const H of u)
      H.value < h && (h = H.value), H.value > p && (p = H.value);
    const g = (H) => {
      if (!H) return;
      const q = (c == null ? void 0 : c.dimensions[H]) ?? (c == null ? void 0 : c.timeDimensions[H]) ?? (c == null ? void 0 : c.measures[H]);
      return (q == null ? void 0 : q.shortTitle) ?? (q == null ? void 0 : q.title) ?? H;
    }, y = (N = (S = t.axes) == null ? void 0 : S.x) != null && N.labelHide ? void 0 : ((C = (x = t.axes) == null ? void 0 : x.x) == null ? void 0 : C.label) ?? g(a), k = (A = (T = t.axes) == null ? void 0 : T.y) != null && A.labelHide ? void 0 : ((B = (W = t.axes) == null ? void 0 : W.y) == null ? void 0 : B.label) ?? g(i), w = [
      $s(u, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return r.showValues && w.push(
      // Decorative: the in-cell number restates the cell's own value, so it must
      // not emit a second focus point (the tooltip would list the cell twice).
      ia(
        Jt(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (H) => n.value(H.value, H.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), et({
      marks: w,
      x: {
        scale: () => Tn(0.05),
        axis: (O = (F = t.axes) == null ? void 0 : F.x) != null && O.hide ? !1 : {
          label: y,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (H) => {
              var q;
              return Ie(n, (q = t.axes) == null ? void 0 : q.x).category(H);
            }
          }
        }
      },
      y: {
        scale: () => Tn(0.05),
        axis: (D = (_ = t.axes) == null ? void 0 : _.y) != null && D.hide ? !1 : {
          label: k,
          ticks: {
            format: (H) => {
              var q;
              return Ie(n, (q = t.axes) == null ? void 0 : q.y).category(H);
            }
          }
        }
      },
      color: {
        scale: go(h, p, r.colorToken ?? "chart-1")
      },
      tooltip: ((Q = t.tooltip) == null ? void 0 : Q.show) === !1 ? void 0 : Wn({ format: n, indicator: (z = t.tooltip) == null ? void 0 : z.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const d = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(rt, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function lu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function cu(e) {
  return `cv-kpi-trend--${e}`;
}
function uu(e) {
  var c, u, m, d;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (h) => r.value(h, a.measure, "kpi"), o = vo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((d = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : d.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(yu, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(mu, { ...e, value: o, label: s, fo: a, fmt: i });
}
function mu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var h;
  const a = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", i = t === null ? null : wu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && du(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((p) => p !== null), m = i ? i.diff : c ? gu(c) : 0, d = cu(lu(m, a));
  return /* @__PURE__ */ v("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ v("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(vu, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(fu, {}) : /* @__PURE__ */ l(hu, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(pu, { data: e, series: c, colorClass: d }) })
  ] });
}
function du(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function fu() {
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
function hu() {
  return /* @__PURE__ */ v("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Di, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function pu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = Ge(e, { series: [t], skipNull: !0 }), i = St(void 0);
    return et({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        dr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: ft("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        In(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: ft("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: lo, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    rt,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function gu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function vu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Di : a ? Fn : Pn, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: `cv-kpi-chip cv-kpi-delta ${i ? "cv-kpi-delta--flat" : o ? "cv-kpi-delta--good" : "cv-kpi-delta--bad"}`,
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${r(e.diff)}`,
      children: [
        /* @__PURE__ */ l(s, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: c })
      ]
    }
  );
}
const Ft = -(2 * Math.PI) / 3, Sr = 2 * Math.PI / 3, bu = Sr - Ft;
function yu({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, d;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((d = r.gauge) == null ? void 0 : d.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : ku(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const h = (s - a) / (o - a), p = Ft + h * bu, g = ({ radius: w }) => w * 0.7, y = pr([{ startAngle: Ft, endAngle: Sr }], {
      id: "cv-gauge-track",
      innerRadius: g,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = h > 0 ? [
      y,
      pr([{ startAngle: Ft, endAngle: p }], {
        id: "cv-gauge-value",
        innerRadius: g,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [y];
    return et({
      marks: [
        Bi({
          id: "cv-gauge",
          startAngle: Ft,
          endAngle: Sr,
          marks: k
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ v("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      rt,
      {
        definition: u,
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
function ku(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function vo(e, t) {
  for (const n of e) {
    const r = bo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function wu(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = vo(e, r.value));
  else {
    const s = e[1];
    a = s ? bo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function bo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const yo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: R("cv-table", e), ...t }) })
);
yo.displayName = "Table";
const ko = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: R("cv-table-header", e), ...t }));
ko.displayName = "TableHeader";
const wo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: R("cv-table-body", e), ...t }));
wo.displayName = "TableBody";
const fn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: R("cv-table-row", e),
      ...t
    }
  )
);
fn.displayName = "TableRow";
const xr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: R("cv-table-head", e),
    ...t
  }
));
xr.displayName = "TableHead";
const hn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: R("cv-table-cell", e),
    ...t
  }
));
hn.displayName = "TableCell";
const Nu = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: R("cv-table-caption", e), ...t }));
Nu.displayName = "TableCaption";
const No = Ur(
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
), Y = b.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: R(No({ variant: t, size: n }), e),
      ...a
    }
  )
);
Y.displayName = "Button";
function Cu({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Su(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, m] = b.useState(0), d = r.sortable !== !1, h = r.pageSize ?? 25, p = b.useMemo(() => {
    var C;
    if (!s) return a;
    const N = s.dir === "asc" ? 1 : -1, x = ((C = o.find((T) => T.member === s.member)) == null ? void 0 : C.key) ?? s.member;
    return [...a].sort((T, A) => _u(T[x], A[x]) * N);
  }, [a, s, o]), g = Math.max(1, Math.ceil(p.length / h)), y = Math.min(u, g - 1), k = p.slice(y * h, y * h + h), w = (N) => {
    d && (c(
      (x) => (x == null ? void 0 : x.member) === N ? { member: N, dir: x.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), m(0));
  }, S = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: R("cv-table-scroll", r.stickyHeader && "cv-table-scroll--sticky"), children: /* @__PURE__ */ v(yo, { children: [
      /* @__PURE__ */ l(ko, { className: R(r.stickyHeader && "cv-table-header--sticky"), children: /* @__PURE__ */ v(fn, { children: [
        r.showRowNumbers && /* @__PURE__ */ l(xr, { className: "cv-table-rownum", children: "#" }),
        o.map((N) => /* @__PURE__ */ l(
          xr,
          {
            className: Ba(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: d ? /* @__PURE__ */ v(
              Y,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: () => w(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ l(Ru, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ v(wo, { children: [
        k.map((N, x) => /* @__PURE__ */ v(fn, { children: [
          r.showRowNumbers && /* @__PURE__ */ l(
            hn,
            {
              className: R(
                "cv-table-cell--right cv-table-cell--muted",
                S && "cv-table-cell--compact"
              ),
              children: y * h + x + 1
            }
          ),
          o.map((C) => {
            const T = Ou(C.member, N[C.key], r.conditionalFormat);
            return /* @__PURE__ */ l(
              hn,
              {
                className: R(Ba(C.align), S && "cv-table-cell--compact"),
                style: T ? { color: T } : void 0,
                children: C.render(N[C.key])
              },
              C.member
            );
          })
        ] }, x)),
        k.length === 0 && /* @__PURE__ */ l(fn, { children: /* @__PURE__ */ l(
          hn,
          {
            colSpan: o.length + (r.showRowNumbers ? 1 : 0),
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    p.length > h && /* @__PURE__ */ v("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ v("span", { children: [
        y * h + 1,
        "–",
        Math.min((y + 1) * h, p.length),
        " of",
        " ",
        p.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          Y,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.max(0, N - 1)),
            disabled: y === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          Y,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.min(g - 1, N + 1)),
            disabled: y >= g - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Su(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Mu(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = Nr(e, c), m = t ? Tu(t, c) : void 0, d = t ? c in t.measures : !1, h = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, p = s.align ?? (d ? "right" : "left"), g = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: h,
      align: p,
      width: s.width,
      render: (y) => xu(y, d, c, g)
    };
  });
}
function xu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Mu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Tu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ba(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Ru({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Fn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Pn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Js, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function _u(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Ou(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Au(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Au(e, t, n) {
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
const it = "cv-sidebar--default", Du = "cv-sidebar--wide", Co = "a date or category", nr = [
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
    hint: Co,
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
], Lu = [
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
    hint: Co,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Eu = [
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
], Iu = [
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
], Fu = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Pu = [
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
], $u = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], qe = (e) => $u.indexOf(e), Ve = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Ei,
    order: qe("bar"),
    component: Qc,
    optionsSchema: He.bar,
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
    sidebarWidthClass: it
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: al,
    order: qe("line"),
    component: Jc,
    optionsSchema: He.line,
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
    sidebarWidthClass: it
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Xs,
    order: qe("area"),
    component: Xc,
    optionsSchema: He.area,
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
    sidebarWidthClass: it
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: rl,
    order: qe("pie"),
    component: Zc,
    optionsSchema: He.pie,
    defaults: Be.pie,
    wells: Eu,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: it
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: nl,
    order: qe("scatter"),
    component: tu,
    optionsSchema: He.scatter,
    defaults: Be.scatter,
    wells: Iu,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: it
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: tl,
    order: qe("kpi"),
    component: uu,
    optionsSchema: He.kpi,
    defaults: Be.kpi,
    wells: Fu,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Du
  },
  table: {
    family: "table",
    label: "Table",
    icon: el,
    order: qe("table"),
    component: Cu,
    optionsSchema: He.table,
    defaults: Be.table,
    wells: Pu,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: it
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Zs,
    order: qe("heatmap"),
    component: su,
    optionsSchema: He.heatmap,
    defaults: Be.heatmap,
    wells: Lu,
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
    hasCustomizeOptions: !0,
    // the "Show values" toggle
    supportsComparePrevious: !1,
    requiresMeasure: !0,
    sidebarWidthClass: it
  }
}, zu = Ve.bar, Vu = Ve.line, ju = Ve.area, Wu = Ve.pie, Hu = Ve.scatter, Bu = Ve.heatmap, qu = Ve.kpi, Uu = Ve.table, la = [
  zu,
  Vu,
  ju,
  Wu,
  Hu,
  Bu,
  qu,
  Uu
], Ku = f.any();
function ca(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? jc;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Ku;
    },
    resolveOptions: (o) => Wc(o, i.defaults(o.family))
  };
  return i;
}
const Hn = ca(la);
function Gu(e, t = Hn) {
  return t.resolveOptions(e);
}
function ua(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function Yu(e) {
  const t = Math.floor(e ?? dn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Qu(e, t) {
  const n = new Array(e.length);
  for (let r = 0; r < e.length; r++) {
    const a = Math.max(0, r - t + 1);
    let i = 0, o = 0;
    for (let s = a; s <= r; s++) {
      const c = e[s];
      c == null || !Number.isFinite(c) || (i += c, o += 1);
    }
    n[r] = o === 0 ? null : i / o;
  }
  return n;
}
function Ju(e) {
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
function Xu(e, t) {
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
function Zu(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function em(e, t, n) {
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
function tm(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Xu(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Zu(o.meta)
      }))
    };
  }
  const a = Yu(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Qu(i.data, a) : Ju(i.data)
    }))
  };
}
function nm(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Ab = Object.fromEntries(
  Object.entries(Ve).map(([e, t]) => [e, t.component])
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
  registry: c = Hn
}) {
  const u = ee(() => Gu(t, c), [t, c]), m = c.get(u.family), d = (m == null ? void 0 : m.queryless) ?? !1, h = ua(m) ? u.transform : void 0, p = ee(() => tm(e, h), [e, h]);
  if (!d && (a != null && a.loading))
    return /* @__PURE__ */ l(vc, { className: "cv-chart-skeleton" });
  if (!d && (a != null && a.error))
    return /* @__PURE__ */ v($n, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Wr, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Vn, { children: a.error.message })
    ] });
  if (!d && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const g = n && Object.keys(n).length > 0 ? n : nm(p), y = em(
    r ?? Jr(e.raw.annotation, u, Qr),
    h
  ), k = (i == null ? void 0 : i[u.family]) ?? c.require(u.family).component;
  return /* @__PURE__ */ l(
    k,
    {
      data: p,
      options: u,
      config: g,
      format: y,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const Bn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], rr = 8;
function qa(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function xo(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : Bn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = a(u.key, u.colorToken);
    m && i.add(m);
  }
  let o = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const m = n[o++ % n.length];
      if (!i.has(m))
        return i.add(m), m;
    }
    return n[o++ % n.length];
  };
  return e.map((u) => a(u.key, u.colorToken) ?? s());
}
function Ua(e, t) {
  const n = xo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function rm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function un(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = rm(e[n]);
  return t;
}
function am(e) {
  return {
    measures: un(e.measures ?? {}),
    dimensions: un(e.dimensions ?? {}),
    segments: un(e.segments ?? {}),
    timeDimensions: un(e.timeDimensions ?? {})
  };
}
function wt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function qn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function im(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function om(e, t) {
  var r, a;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [i, o] of Object.entries(e.measures)) {
    const s = (r = o.meta) == null ? void 0 : r.unit;
    if (!s || ((a = o.meta) == null ? void 0 : a.convert) === !1) continue;
    const c = t.conversions[s];
    c && (n.set(i, { to: c.toImperial, unit: c.imperialUnit }), e.measures[i] = { ...o, meta: { ...o.meta, unit: c.imperialUnit } });
  }
  return n;
}
function sm(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Un(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function lm(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Mo(e, t, n, r, a = Hn) {
  const i = am(e.annotation()), o = om(i, r), s = sm(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const d = n.measures ?? [];
    if (a.require(t.family).measureOnly && d.length > 0) {
      const h = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => Un(h[y])),
          meta: { ...qn(wt(i, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Ua(p, t.colors), {
        categories: d.map(
          (y) => {
            var k, w;
            return ((k = wt(i, y)) == null ? void 0 : k.shortTitle) ?? ((w = wt(i, y)) == null ? void 0 : w.title) ?? y;
          }
        ),
        series: p,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || qa(p)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? um(e, c.series, t, i) : mm(e, c.category.member, c.series, t, i), m = cm(e, c);
  return lm(u, o), Ua(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || qa(u)
  };
}
function cm(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function um(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = wt(r, s), u = i == null ? void 0 : i[s], m = o.map((d) => Un(d[s]));
    return {
      key: s,
      label: im(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...qn(c, u, n.format), measure: s }
    };
  });
}
function mm(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, d = { x: [t], y: [s, "measures"] }, p = e.seriesNames(d).filter((w) => {
    const S = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return S === void 0 || u.has(S);
  }), g = e.chartPivot(d), y = wt(a, i), k = p.map((w) => {
    var F, O;
    const S = (F = w.yValues) == null ? void 0 : F[0], N = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, x = wt(a, N), C = (O = n.meta) == null ? void 0 : O[N], T = (C == null ? void 0 : C.label) ?? (x == null ? void 0 : x.shortTitle) ?? (x == null ? void 0 : x.title) ?? N, A = S ?? w.shortTitle ?? w.title ?? w.key, W = m ? `${T} · ${A}` : A, B = g.map((_) => Un(_[w.key]));
    return {
      key: w.key,
      label: W,
      data: B,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...qn(x ?? y, C, r.format),
        measure: N
      }
    };
  });
  return dm(k, y, r.format);
}
function dm(e, t, n) {
  var m, d, h;
  if (e.length <= rr) return e;
  const r = (p) => p.data.reduce((g, y) => g + (y ?? 0), 0), a = [...e].sort((p, g) => r(g) - r(p)), i = a.slice(0, rr - 1), o = a.slice(rr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (p, g) => {
    let y = 0, k = !1;
    for (const w of o) {
      const S = w.data[g];
      S !== null && (y += S, k = !0);
    }
    return k ? y : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...qn(t, void 0, n), ...(h = (d = i[0]) == null ? void 0 : d.meta) != null && h.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Un(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ne = (e) => pe(e, "yyyy-MM-dd");
function fm(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ne(t), ne(t)];
  if (n === "yesterday") {
    const o = we(t, 1);
    return [ne(o), ne(o)];
  }
  if (n === "this week") return [ne(wn(t)), ne(Nn(t))];
  if (n === "this month") return [ne(st(t)), ne(Ht(t))];
  if (n === "this quarter") return [ne(lt(t)), ne(Bt(t))];
  if (n === "this year") return [ne(ct(t)), ne(qt(t))];
  if (n === "last week") {
    const o = fr(t, 1);
    return [ne(wn(o)), ne(Nn(o))];
  }
  if (n === "last month") {
    const o = ut(t, 1);
    return [ne(st(o)), ne(Ht(o))];
  }
  if (n === "last quarter") {
    const o = mt(t, 1);
    return [ne(lt(o)), ne(Bt(o))];
  }
  if (n === "last year") {
    const o = dt(t, 1);
    return [ne(ct(o)), ne(qt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ne(we(t, a - 1)), ne(t)] : i.startsWith("week") ? [ne(we(t, a * 7 - 1)), ne(t)] : i.startsWith("month") ? [ne(st(ut(t, a))), ne(Ht(ut(t, 1)))] : i.startsWith("quarter") ? [ne(lt(mt(t, a))), ne(Bt(mt(t, 1)))] : [ne(ct(dt(t, a))), ne(qt(dt(t, 1)))];
}
function xt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const hm = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function pm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Zt(e, t, n) {
  var r;
  if (Me(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function gm(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Zt(o, t, n);
    if (!xt(s))
      if (Array.isArray(s))
        for (const c of s)
          xt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? fm(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function vm(e, t, n) {
  if ("and" in e) {
    const r = Mr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Mr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return gm(e, t, n);
}
function Mr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = vm(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function bm(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Zt(e.granularity, t, n);
    xt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Zt(e.dateRange, t, n);
    xt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function To(e, t, n) {
  const r = hm(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => bm(i, r, t))), e.filters !== void 0) {
    const i = Mr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = Zt(e.limit, r, t);
    xt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = Zt(e.offset, r, t);
    xt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Ro() {
  let e, t;
  return (n, r, a) => {
    const i = To(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function ym(e, t) {
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
class km extends Error {
}
const wm = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new km(`"${e}" cannot be parsed into a number`);
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
function Ka(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Nm extends Error {
}
class Ga extends Error {
}
class Cm extends Error {
}
class ar extends Error {
}
class Sm extends Error {
}
class xm {
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
      throw new Ga(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ka(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Cm(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new ar(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new ar(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, d = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof d == "number")
        o = this.cls.mul(o, d);
      else if (Ka(d))
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
      throw new Ga(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const d = this.describe(m);
      if (o.indexOf(m) === -1 && d.system === c) {
        const p = this.to(m);
        if (i ? this.cls.gt(p, s) : this.cls.lt(p, s))
          continue;
        (u === null || (i ? this.cls.lte(p, s) && this.cls.gt(p, u.val) : this.cls.gte(p, s) && this.cls.lt(p, u.val))) && (u = {
          val: p,
          unit: m,
          singular: d.singular,
          plural: d.plural
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
      for (const [r, a] of Object.entries(this.measureData))
        for (const [i, o] of Object.entries(a.systems))
          for (const [s, c] of Object.entries(o))
            n.push(this.describeUnit({
              abbr: s,
              measure: r,
              system: i,
              unit: c
            }));
    else {
      if (!this.isMeasure(t))
        throw new Sm(`Meausure "${t}" not found.`);
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
    throw new Nm(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Mm(e) {
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
function Tm(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Mm(e);
  return (r) => new xm({
    measures: e,
    unitCache: n,
    cls: wm
  }, r);
}
const Rm = {
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
}, _m = {
  systems: {
    metric: Rm
  }
}, Om = {
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
}, Am = {
  systems: {
    SI: Om
  }
}, Dm = {
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
}, Lm = {
  systems: {
    SI: Dm
  }
}, Em = {
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
}, Im = {
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
}, Fm = {
  systems: {
    metric: Em,
    imperial: Im
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
}, Pm = {
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
}, $m = {
  systems: {
    SI: Pm
  }
}, zm = {
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
}, Vm = {
  systems: {
    SI: zm
  }
}, jm = {
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
}, Wm = {
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
}, Hm = {
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
}, Bm = {
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
}, qm = {
  systems: {
    bit: jm,
    byte: Wm,
    IECBit: Hm,
    IECByte: Bm
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
}, Um = {
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
}, Km = {
  systems: {
    metric: Um
  }
}, Gm = {
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
}, Ym = {
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
}, Qm = {
  systems: {
    SI: Gm,
    nutrition: Ym
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
}, Jm = {
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
}, Xm = {
  systems: {
    SI: Jm
  }
}, Zm = {
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
}, ed = {
  systems: {
    SI: Zm
  }
}, td = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, nd = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, rd = {
  systems: {
    metric: td,
    imperial: nd
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
}, ad = {
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
}, id = {
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
}, od = {
  systems: {
    metric: ad,
    imperial: id
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
}, sd = {
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
}, ld = {
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
}, ud = {
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
}, md = {
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
}, dd = {
  systems: {
    metric: ud,
    imperial: md
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
}, fd = {
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
}, hd = {
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
}, pd = {
  systems: {
    metric: fd,
    imperial: hd
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
}, gd = {
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
}, vd = {
  systems: {
    SI: gd
  }
}, bd = {
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
}, yd = {
  systems: {
    unit: bd
  }
}, kd = {
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
}, wd = {
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
}, Nd = {
  systems: {
    metric: kd,
    imperial: wd
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
}, Cd = {
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
}, Sd = {
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
}, xd = {
  systems: {
    metric: Cd,
    imperial: Sd
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
}, Md = {
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
}, Td = {
  systems: {
    SI: Md
  }
}, Rd = {
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
}, _d = {
  systems: {
    SI: Rd
  }
}, Od = {
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
}, Ad = {
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
}, Dd = {
  systems: {
    metric: Od,
    imperial: Ad
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
}, Ld = {
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
}, Ed = {
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
}, Id = {
  systems: {
    metric: Ld,
    imperial: Ed
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
}, Fd = {
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
}, Pd = {
  systems: {
    SI: Fd
  }
}, $d = {
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
}, zd = {
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
}, Vd = {
  systems: {
    metric: $d,
    imperial: zd
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
}, jd = {
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
}, Wd = {
  systems: {
    SI: jd
  }
}, Hd = {
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
}, Bd = {
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
}, qd = {
  systems: {
    metric: Hd,
    imperial: Bd
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
}, Ud = {
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
}, Kd = {
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
}, Gd = {
  systems: {
    metric: Ud,
    imperial: Kd
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
}, Yd = {
  acceleration: _m,
  angle: Am,
  apparentPower: Lm,
  area: Fm,
  charge: $m,
  current: Vm,
  digital: qm,
  each: Km,
  energy: Qm,
  force: Xm,
  frequency: ed,
  illuminance: rd,
  length: od,
  mass: cd,
  massFlowRate: dd,
  pace: pd,
  partsPer: vd,
  pieces: yd,
  power: Nd,
  pressure: xd,
  reactiveEnergy: Td,
  reactivePower: _d,
  speed: Dd,
  torque: Vd,
  temperature: Id,
  time: Pd,
  voltage: Wd,
  volume: qd,
  volumeFlowRate: Gd
}, Qd = Tm(Yd), Jd = {
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
function Xd(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Qd(t).from(e.from).to(e.to)
  };
}
const Tr = {
  ...Object.fromEntries(
    Object.entries(Jd).map(([e, t]) => [e, Xd(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Kn(e) {
  return e ? { ...Tr, ...e } : Tr;
}
function Zd(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function ef(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function tf(e) {
  return e != null && e.quantity ? ef(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const nf = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function _o(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ya(e, t) {
  const n = e * (nf[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], o = i.map(([c, u], m) => {
    const d = m < i.length - 1 ? Math.floor(a / c) : Math.round(a / c);
    return a -= d * c, [d, u];
  }), s = o.findIndex((c) => c[0] > 0);
  if (s === -1) {
    const c = Math.abs(n);
    return c === 0 ? "0s" : c < 1e3 ? `${r}${_o(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function ir(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return _o((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function rf(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Qa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Oo(e = Tr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Qr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Ya(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Qa(ir(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Ya(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Qa(ir(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? rf(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${ir(n, t)}${u}`;
  };
}
const Gn = Ci(null);
Gn.displayName = "CubeVizContext";
function Fe() {
  const e = zr(Gn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function at() {
  return Fe().families;
}
function af(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Db({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((k) => k.family).join("|"), u = ee(
    () => ca(la, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ee(
    () => af(e) ? pc(e) : e,
    [e]
  ), d = ee(
    () => {
      var k;
      return {
        chartRamp: (k = t == null ? void 0 : t.chartRamp) != null && k.length ? t.chartRamp : Bn,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), h = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), p = ee(() => a ?? {}, [a]), g = ee(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), y = ee(
    () => ({
      cubeClient: m,
      registry: p,
      families: u,
      locale: h,
      theme: d,
      maps: g
    }),
    [m, p, u, h, d, g]
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
        Zr,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      )
    }
  ) });
}
function ma({
  families: e,
  children: t
}) {
  const n = Fe(), r = (e ?? []).map((i) => i.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: ca(la, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(ue, { children: t }) : /* @__PURE__ */ l(Gn.Provider, { value: a, children: t });
}
function of(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const sf = 5e3;
function Ao(e, t) {
  const { cubeClient: n } = Fe(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: sf } : e,
    [e]
  ), i = ee(() => JSON.stringify(a), [a]), [o, s] = Nt({ isLoading: !r }), [c, u] = Nt(0), m = Ye(() => u((d) => d + 1), []);
  return rn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let d = !0;
    const h = new AbortController();
    return s((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: h.signal }).then((p) => {
      d && s({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      d && s({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      d = !1, h.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Yn = Ci(null);
Yn.displayName = "DashboardContext";
function da({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = ot(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: ym(r, t), key: r });
  const i = a.current.store, o = lf(i, r);
  return Ls(Yn.Provider, { value: o }, n);
}
function lf(e, t) {
  const n = Ye(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ye(
    (i) => To(i, e.getAll(), t),
    [e, t]
  ), a = Ye(
    (i) => pm(i, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function cf(e) {
  const t = Si(e.store.subscribe, e.store.getAll, e.store.getAll);
  return ee(
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
  const e = zr(Yn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return cf(e);
}
function sn() {
  return zr(Yn);
}
const uf = () => () => {
};
function or(e, t, n) {
  var N;
  const r = sn(), { locale: a } = Fe(), i = at(), o = ot(null);
  o.current === null && (o.current = Ro());
  const s = o.current, c = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !c, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), d = Si(
    u && r ? r.store.subscribe : uf,
    m,
    m
  ), { resultSet: h, isLoading: p, error: g, refetch: y } = Ao(d, { skip: n == null ? void 0 : n.skip }), k = ((N = t.format) == null ? void 0 : N.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = ee(() => Kn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (h)
      return Mo(h, t, d, { unitSystem: k, conversions: w }, i);
  }, [h, t, d, k, w, i]), isLoading: p, error: g, refetch: y, resolvedQuery: d };
}
function je() {
  const { cubeClient: e } = Fe(), [t, n] = Nt({ isLoading: !0 });
  return rn(() => {
    let r = !0;
    return n({ isLoading: !0 }), gc(e).then((a) => {
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
function Lb() {
  const { locale: e } = Fe(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? Oo(Kn(n)),
    [t, n]
  );
}
function Lo() {
  const [e, t] = Nt(0), n = ot(null), r = ot(null), a = ot(null), i = ot(0), o = Ye((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = Ye(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = Ye(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const d = new ResizeObserver((h) => {
        var p, g;
        for (const y of h) {
          const k = ((g = (p = y.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : g.inlineSize) ?? y.contentRect.width;
          o(k);
        }
      });
      d.observe(u), r.current = d;
    },
    [o, s]
  );
  return rn(() => s, [s]), [c, e];
}
const mf = "day";
function df(e, t) {
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
        granularity: r.granularity ?? mf,
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
const Z = (e) => pe(e, "yyyy-MM-dd");
function ff(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = kn(e[0]), i = kn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = Ys(i, a) + 1;
    return [Z(we(a, o)), Z(we(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = we(t, 1);
    return [Z(a), Z(a)];
  }
  if (n === "yesterday") {
    const a = we(t, 2);
    return [Z(a), Z(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [Z(we(t, 2 * a - 1)), Z(we(t, a))];
    if (i.startsWith("week")) return [Z(we(t, 14 * a - 1)), Z(we(t, 7 * a))];
    if (i.startsWith("month"))
      return [Z(st(ut(t, 2 * a))), Z(we(st(ut(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [Z(lt(mt(t, 2 * a))), Z(we(lt(mt(t, a)), 1))];
    if (i.startsWith("year"))
      return [Z(ct(dt(t, 2 * a))), Z(we(ct(dt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = fr(t, 1);
    return [Z(wn(a)), Z(Nn(a))];
  }
  if (n === "this month") {
    const a = ut(t, 1);
    return [Z(st(a)), Z(Ht(a))];
  }
  if (n === "this quarter") {
    const a = mt(t, 1);
    return [Z(lt(a)), Z(Bt(a))];
  }
  if (n === "this year") {
    const a = dt(t, 1);
    return [Z(ct(a)), Z(qt(a))];
  }
  if (n === "last week") {
    const a = fr(t, 2);
    return [Z(wn(a)), Z(Nn(a))];
  }
  if (n === "last month") {
    const a = ut(t, 2);
    return [Z(st(a)), Z(Ht(a))];
  }
  if (n === "last quarter") {
    const a = mt(t, 2);
    return [Z(lt(a)), Z(Bt(a))];
  }
  if (n === "last year") {
    const a = dt(t, 2);
    return [Z(ct(a)), Z(qt(a))];
  }
}
function hf(e, t, n = Hn) {
  var u, m;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (m = e.timeDimensions) == null ? void 0 : m[0];
  if (!i) return null;
  const o = i.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = ff(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const pf = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function fa({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var Q;
  const { registry: c, locale: u } = Fe(), m = at(), d = ((Q = m.get(t.family)) == null ? void 0 : Q.queryless) ?? !1, h = ee(() => {
    var z;
    return (z = t.format) != null && z.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), p = ee(() => {
    const z = e ?? {};
    return z.timezone || !(u != null && u.timezone) ? z : { ...z, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: g, isLoading: y, error: k, refetch: w, resolvedQuery: S } = or(
    p,
    h,
    { skip: d }
  ), N = ee(() => df(p, h), [p, h]), x = or(
    (N == null ? void 0 : N.query) ?? p,
    (N == null ? void 0 : N.chart) ?? h,
    { skip: !N }
  ), C = ee(
    () => hf(S, h, m),
    [S, h, m]
  ), T = or(
    (C == null ? void 0 : C.query) ?? p,
    h,
    { skip: !C, skipResolve: !0 }
  ), A = ee(
    () => ({ [h.family]: of(c, h.family, m) }),
    [c, h.family, m]
  ), W = ee(() => {
    let z = g ?? pf;
    if (N && x.data) {
      z = { ...z, series: x.data.series, categories: x.data.categories };
      const H = z.raw.rows.length > 0, q = z.series.some((re) => re.data.some((ie) => ie !== null));
      z = { ...z, empty: !H && !q };
    }
    if (C && T.data) {
      if (C.mode === "kpiRow") {
        const H = T.data.raw.rows[0];
        if (H) {
          const q = z.raw.rows[0];
          z = {
            ...z,
            raw: { ...z.raw, rows: q ? [q, H] : [H] }
          };
        }
      } else if (!T.data.empty) {
        const H = new Map(T.data.series.map((q) => [q.key, q]));
        if (!z.empty && z.series.length > 0) {
          const q = z.categories.length, re = z.series.map((ie) => {
            const me = H.get(ie.key), fe = Array.from({ length: q }, (V, G) => (me == null ? void 0 : me.data[G]) ?? null);
            return {
              ...ie,
              key: `${ie.key}__prev`,
              label: `${ie.label} (prev)`,
              colorToken: ie.colorToken,
              data: fe,
              meta: { ...ie.meta, companion: !0 }
            };
          });
          z = { ...z, series: [...z.series, ...re] };
        } else {
          const q = T.data.series.map((re) => ({
            ...re,
            key: `${re.key}__prev`,
            label: `${re.label} (prev)`,
            data: [...re.data],
            meta: { ...re.meta, companion: !0 }
          }));
          z = {
            ...z,
            categories: T.data.categories,
            series: q,
            empty: !1
          };
        }
      }
    }
    return z;
  }, [g, N, x.data, C, T.data]);
  rn(() => {
    n == null || n({ rows: W.raw.rows, refetch: w, isLoading: y });
  }, [n, W.raw.rows, w, y]);
  const B = {}, F = ee(
    () => u.formatValue ?? Oo(Kn(u.units)),
    [u.formatValue, u.units]
  ), O = ee(
    () => Jr(W.raw.annotation, h, F, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [W.raw.annotation, h, F, u.locale, u.unitSystem]
  ), _ = h.mapping, D = ee(
    () => ({
      categoryMember: _ == null ? void 0 : _.category.member,
      pivotMember: (_ == null ? void 0 : _.series.mode) === "pivot" ? _.series.pivot : void 0,
      formatCategory: O.category
    }),
    [_, O]
  );
  return /* @__PURE__ */ l(
    Zr,
    {
      widgetId: i,
      target: D,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        So,
        {
          data: W,
          options: h,
          config: B,
          format: O,
          state: d ? { loading: !1 } : { loading: y && !g, error: k },
          components: A,
          registry: m,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function gf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    fa,
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
function vf(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function bf({ doc: e }) {
  const t = vf(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = Ui(
    {
      extensions: [Gi],
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
  return t ? /* @__PURE__ */ l(Ki, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
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
], yf = Object.fromEntries(
  pn.map((e) => [e.value, e.label])
);
function Ja(e) {
  return yf[e.trim().toLowerCase()] ?? e;
}
const kf = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function wf({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Al(), a = R(No({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ v("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: R(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Hr, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: pe(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: R(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(an, {})
      }
    )
  ] });
}
function Nf({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
    Ol,
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
        MonthCaption: wf,
        DayButton: Nf,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? Hr : an, { className: R("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Root, { "data-slot": "popover", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Le({
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
function Te({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Root, { "data-slot": "select", ...e });
}
function Rr({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Group, { "data-slot": "select-group", ...e });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Value, { "data-slot": "select-value", ...e });
}
function _e({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Trigger,
    {
      "data-slot": "select-trigger",
      className: R("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Ce.Icon, { asChild: !0, children: /* @__PURE__ */ l(tt, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Cf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(il, {})
    }
  );
}
function Sf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(tt, {})
    }
  );
}
function Oe({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(Ce.Portal, { children: /* @__PURE__ */ v(
    Ce.Content,
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
        /* @__PURE__ */ l(Cf, {}),
        /* @__PURE__ */ l(
          Ce.Viewport,
          {
            className: R(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Sf, {})
      ]
    }
  ) });
}
function _r({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.Label,
    {
      "data-slot": "select-label",
      className: R("cv-select-label", e),
      ...t
    }
  );
}
function be({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Item,
    {
      "data-slot": "select-item",
      className: R("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Ce.ItemIndicator, { children: /* @__PURE__ */ l(nt, {}) }) }),
        /* @__PURE__ */ l(Ce.ItemText, { children: t })
      ]
    }
  );
}
const Mt = "cv-field", xf = "cv-field-label", Pt = "yyyy-MM-dd";
function Mf(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Xa(e) {
  if (!e) return;
  const t = Ai(e, Pt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Tf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? kf, [i, o] = Nt(!1), s = typeof e == "string", [c, u] = Mf(e), m = Xa(c), d = Xa(u), h = m ? { from: m, to: d } : void 0;
  let p;
  s ? p = Ja(e) : m && d ? p = `${pe(m, "MMM d, yyyy")} – ${pe(d, "MMM d, yyyy")}` : m ? p = pe(m, "MMM d, yyyy") : p = "Pick a date range";
  const g = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Ae, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(
      Y,
      {
        variant: "outline",
        className: R(
          "cv-daterange-trigger",
          p === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Ii, {}),
          p
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((y) => /* @__PURE__ */ l(
        Y,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(y), o(!1);
          },
          children: Ja(y)
        },
        y
      )) }),
      /* @__PURE__ */ l(
        Io,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: g,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([pe(y.from, Pt), pe(y.to, Pt)]) : y != null && y.from ? t([pe(y.from, Pt), pe(y.from, Pt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Rf = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function _f(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Of(e) {
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
function Af({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Do(), i = r.rangeVariable ? Of(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? _f(i) : Rf), s = typeof e == "string" ? e : "", c = o.join(",");
  return rn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ v(
    Te,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(_e, { className: Mt, children: /* @__PURE__ */ l(Re, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Oe, { children: o.map((u) => /* @__PURE__ */ l(be, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Df({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: R(Mt, "cv-field--multi"),
        value: [...i],
        onChange: (o) => {
          const s = Array.from(o.target.selectedOptions, (u) => u.value), c = r.options.every((u) => typeof u.value == "number");
          t(c ? s.map((u) => Number(u)) : s);
        },
        children: r.options.map((o) => /* @__PURE__ */ l("option", { value: String(o.value), children: o.label }, String(o.value)))
      }
    );
  }
  const a = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    Te,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(_e, { className: Mt, children: /* @__PURE__ */ l(Re, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Oe, { children: r.options.map((i) => /* @__PURE__ */ l(be, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Lf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = je(), o = ee(() => {
    if (!a) return [];
    const s = [];
    for (const c of a.cubes)
      if (!(r.cube && c.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const u of c.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const u of c.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [a, r.cube, r.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: Mt,
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
function Ef({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Mt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function If({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Mt,
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
function Ff({ value: e, onChange: t, decl: n }) {
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
const Pf = {
  dateRange: Tf,
  granularity: Af,
  select: Df,
  memberSelect: Lf,
  text: Ef,
  number: If,
  toggle: Ff
};
function $f({ control: e, title: t }) {
  var p;
  const { registry: n } = Fe(), { decls: r, resolveValue: a, setVar: i } = Do(), o = ee(
    () => r.find((g) => g.name === e.variable),
    [r, e.variable]
  ), s = Es();
  if (!o)
    return /* @__PURE__ */ v("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((p = n.controls) == null ? void 0 : p[c]) ?? Pf[c], m = a(e.variable), d = (g) => i(e.variable, g), h = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: d, decl: o, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ l("label", { className: xf, htmlFor: s, children: h }),
    /* @__PURE__ */ l(
      u,
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
const zf = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-description", e), ...t })
);
zf.displayName = "CardDescription";
const Vf = b.forwardRef(
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
Vf.displayName = "CardAction";
const zo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-content", e), ...t })
);
zo.displayName = "CardContent";
const jf = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-footer", e), ...t })
);
jf.displayName = "CardFooter";
const _n = "cube-viz-drag-handle";
function Vo(e) {
  var s;
  const { registry: t } = Fe(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ v(Fo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ v(
      Po,
      {
        ...i,
        className: R(_n, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l($o, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(zo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class Za extends Is {
  constructor() {
    super(...arguments);
    Ma(this, "state", { error: null });
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
      /* @__PURE__ */ l(Wr, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Vn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Wf(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Hf(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Bf(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const qf = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Qe(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let vt = null;
function jo(e = {}) {
  return vt || (e.includeStyleProperties ? (vt = e.includeStyleProperties, vt) : (vt = Qe(window.getComputedStyle(document.documentElement)), vt));
}
function On(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Uf(e) {
  const t = On(e, "border-left-width"), n = On(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Kf(e) {
  const t = On(e, "border-top-width"), n = On(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Wo(e, t = {}) {
  const n = t.width || Uf(e), r = t.height || Kf(e);
  return { width: n, height: r };
}
function Gf() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const xe = 16384;
function Yf(e) {
  (e.width > xe || e.height > xe) && (e.width > xe && e.height > xe ? e.width > e.height ? (e.height *= xe / e.width, e.width = xe) : (e.width *= xe / e.height, e.height = xe) : e.width > xe ? (e.height *= xe / e.width, e.width = xe) : (e.width *= xe / e.height, e.height = xe));
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
async function Qf(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Jf(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Qf(a);
}
const Se = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Se(n, t);
};
function Xf(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Zf(e, t) {
  return jo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function eh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? Xf(n) : Zf(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function ei(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = qf();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(eh(o, n, a, r)), t.appendChild(s);
}
function th(e, t, n) {
  ei(e, t, ":before", n), ei(e, t, ":after", n);
}
const ti = "application/font-woff", ni = "image/jpeg", nh = {
  woff: ti,
  woff2: ti,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ni,
  jpeg: ni,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function rh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ha(e) {
  const t = rh(e).toLowerCase();
  return nh[t] || "";
}
function ah(e) {
  return e.split(/,/)[1];
}
function Or(e) {
  return e.search(/^(data:)/) !== -1;
}
function ih(e, t) {
  return `data:${t};base64,${e}`;
}
async function Ho(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const a = await r.blob();
  return new Promise((i, o) => {
    const s = new FileReader();
    s.onerror = o, s.onloadend = () => {
      try {
        i(n({ res: r, result: s.result }));
      } catch (c) {
        o(c);
      }
    }, s.readAsDataURL(a);
  });
}
const sr = {};
function oh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function pa(e, t, n) {
  const r = oh(e, t, n.includeQueryParams);
  if (sr[r] != null)
    return sr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Ho(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), ah(s)));
    a = ih(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return sr[r] = a, a;
}
async function sh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : An(t);
}
async function lh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return An(s);
  }
  const n = e.poster, r = ha(n), a = await pa(n, r, t);
  return An(a);
}
async function ch(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Qn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function uh(e, t) {
  return Se(e, HTMLCanvasElement) ? sh(e) : Se(e, HTMLVideoElement) ? lh(e, t) : Se(e, HTMLIFrameElement) ? ch(e, t) : e.cloneNode(Bo(e));
}
const mh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Bo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function dh(e, t, n) {
  var r, a;
  if (Bo(t))
    return t;
  let i = [];
  return mh(e) && e.assignedNodes ? i = Qe(e.assignedNodes()) : Se(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Qe(e.contentDocument.body.childNodes) : i = Qe(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Se(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Qn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function fh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : jo(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Se(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function hh(e, t) {
  Se(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Se(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function ph(e, t) {
  if (Se(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function gh(e, t, n) {
  return Se(t, Element) && (fh(e, t, n), th(e, t, n), hh(e, t), ph(e, t)), t;
}
async function vh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Qn(u, t, !0));
    }
  }
  const a = Object.values(r);
  if (a.length) {
    const i = "http://www.w3.org/1999/xhtml", o = document.createElementNS(i, "svg");
    o.setAttribute("xmlns", i), o.style.position = "absolute", o.style.width = "0", o.style.height = "0", o.style.overflow = "hidden", o.style.display = "none";
    const s = document.createElementNS(i, "defs");
    o.appendChild(s);
    for (let c = 0; c < a.length; c++)
      s.appendChild(a[c]);
    e.appendChild(o);
  }
  return e;
}
async function Qn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => uh(r, t)).then((r) => dh(e, r, t)).then((r) => gh(e, r, t)).then((r) => vh(r, t));
}
const qo = /url\((['"]?)([^'"]+?)\1\)/g, bh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, yh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function kh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function wh(e) {
  const t = [];
  return e.replace(qo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Or(n));
}
async function Nh(e, t, n, r, a) {
  try {
    const i = n ? Bf(t, n) : t, o = ha(t);
    let s;
    return a || (s = await pa(i, o, r)), e.replace(kh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Ch(e, { preferredFontFormat: t }) {
  return t ? e.replace(yh, (n) => {
    for (; ; ) {
      const [r, , a] = bh.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Uo(e) {
  return e.search(qo) !== -1;
}
async function Ko(e, t, n) {
  if (!Uo(e))
    return e;
  const r = Ch(e, n);
  return wh(r).reduce((i, o) => i.then((s) => Nh(s, o, t, n)), Promise.resolve(r));
}
async function bt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Ko(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Sh(e, t) {
  await bt("background", e, t) || await bt("background-image", e, t), await bt("mask", e, t) || await bt("-webkit-mask", e, t) || await bt("mask-image", e, t) || await bt("-webkit-mask-image", e, t);
}
async function xh(e, t) {
  const n = Se(e, HTMLImageElement);
  if (!(n && !Or(e.src)) && !(Se(e, SVGImageElement) && !Or(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await pa(r, ha(r), t);
  await new Promise((i, o) => {
    e.onload = i, e.onerror = t.onImageErrorHandler ? (...c) => {
      try {
        i(t.onImageErrorHandler(...c));
      } catch (u) {
        o(u);
      }
    } : o;
    const s = e;
    s.decode && (s.decode = i), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
  });
}
async function Mh(e, t) {
  const r = Qe(e.childNodes).map((a) => Go(a, t));
  await Promise.all(r).then(() => e);
}
async function Go(e, t) {
  Se(e, Element) && (await Sh(e, t), await xh(e, t), await Mh(e, t));
}
function Th(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const ri = {};
async function ai(e) {
  let t = ri[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, ri[e] = t, t;
}
async function ii(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Ho(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function oi(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const a = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const c = a.exec(r);
    if (c === null)
      break;
    t.push(c[0]);
  }
  r = r.replace(a, "");
  const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(o, "gi");
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
async function Rh(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Qe(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = ai(c).then((m) => ii(m, t)).then((m) => oi(m).forEach((d) => {
              try {
                a.insertRule(d, d.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
                  error: h
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            r.push(u);
          }
        });
      } catch (i) {
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(ai(a.href).then((s) => ii(s, t)).then((s) => oi(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Qe(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function _h(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Uo(t.style.getPropertyValue("src")));
}
async function Oh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Qe(e.ownerDocument.styleSheets), r = await Rh(n, t);
  return _h(r);
}
function Yo(e) {
  return e.trim().replace(/["']/g, "");
}
function Ah(e) {
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
async function Dh(e, t) {
  const n = await Oh(e, t), r = Ah(e);
  return (await Promise.all(n.filter((i) => r.has(Yo(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Ko(i.cssText, o, t);
  }))).join(`
`);
}
async function Lh(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Dh(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Eh(e, t = {}) {
  const { width: n, height: r } = Wo(e, t), a = await Qn(e, t, !0);
  return await Lh(a, t), await Go(a, t), Th(a, t), await Jf(a, n, r);
}
async function Ih(e, t = {}) {
  const { width: n, height: r } = Wo(e, t), a = await Eh(e, t), i = await An(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Gf(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || Yf(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function Fh(e, t = {}) {
  return (await Ih(e, t)).toDataURL();
}
function Ph(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function $h(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function zh(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Vh(e, t, n = 2) {
  const r = await Fh(e, {
    pixelRatio: n,
    backgroundColor: zh(e),
    cacheBust: !0
  });
  $h(r, `${Ph(t)}.png`);
}
function jh({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const g = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Hf(Wf(t), `${g}.csv`);
  }, d = async () => {
    const g = r == null ? void 0 : r.current;
    if (!(!g || a)) {
      i(!0), s(null);
      try {
        await Vh(g, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, h = (g) => g.stopPropagation(), p = (g = !0) => R("cv-menu-item", !g && "cv-menu-item--disabled");
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ l(
      De,
      {
        onMouseDown: h,
        onPointerDown: h,
        onTouchStart: h,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(ol, {})
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv-menu", onMouseDown: h, onPointerDown: h, onTouchStart: h, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: p(), children: [
        /* @__PURE__ */ l(sl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ v("button", { type: "button", onClick: d, disabled: a, className: p(!a), children: [
        /* @__PURE__ */ l(ll, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !c, className: p(c), children: [
        /* @__PURE__ */ l(cl, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function si({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        fa,
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
      return /* @__PURE__ */ l(bf, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l($f, { control: e.control, title: e.title });
  }
}
function Ar({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = Nt({ rows: [] }), s = Ye(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = ot(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Za, { children: /* @__PURE__ */ l(si, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    jh,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    Vo,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Za, { children: /* @__PURE__ */ l(
        si,
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
function Wh(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Qo(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Me(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function Hh(e) {
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
function Bh({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = sn(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => Wh(e.widgets), [e.widgets]), c = b.useMemo(() => Hh(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const m = b.useCallback(
    (g) => {
      var y, k;
      if (o) {
        const w = g != null && g.widgetId ? s.get(g.widgetId) : void 0;
        if (w) o(w, g ? [g.from, g.to] : void 0);
        else if (!g) for (const S of new Set(s.values())) o(S, void 0);
      }
      (k = (y = u.current).onRangeSelect) == null || k.call(y, g);
    },
    [o, s]
  ), d = b.useCallback(
    (g) => {
      var y, k;
      if (o)
        if (g) {
          const w = c.get(g.member);
          w && o(w, [String(g.value)]);
        } else
          for (const w of new Set(c.values())) o(w, void 0);
      (k = (y = u.current).onPointSelect) == null || k.call(y, g);
    },
    [o, c]
  ), h = !!(n || t && o && s.size), p = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    Zr,
    {
      onRangeSelect: h ? m : void 0,
      onPointSelect: p ? d : void 0,
      children: a
    }
  );
}
const qh = "lg", Uh = 640;
function Kh(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Gh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Eb({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = Lo(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, d = c.margin ?? [12, 12], h = c.containerPadding ?? d, p = ee(
    () => ({ [qh]: Gh(e.layout) }),
    [e.layout]
  ), g = ee(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), y = !t && s > 0 && s < Uh;
  return /* @__PURE__ */ l(ma, { families: n, children: /* @__PURE__ */ l(da, { spec: e, children: /* @__PURE__ */ l(
    Bh,
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
            padding: `${h[1]}px ${h[0]}px`
          },
          children: Kh(e.layout).map((k) => {
            const w = g.get(k.i);
            if (!w) return null;
            const S = k.h * m + (k.h - 1) * d[1];
            return /* @__PURE__ */ l("div", { style: { height: S }, children: /* @__PURE__ */ l(Ar, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        qi,
        {
          width: s,
          layouts: p,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: d,
          containerPadding: h,
          dragConfig: { enabled: t, handle: `.${_n}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = g.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Ar, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function Ib({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(ma, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
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
        gf,
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
function Yh(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function $e(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Xn(e) {
  return e ? e.cubes.filter((t) => $e(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Jn(t),
    joinTargets: Yh(t)
  })) : [];
}
function Kt(e, t) {
  if (!(!e || !t))
    return Xn(e).find((n) => n.name === t);
}
function ga(e) {
  return e.shortTitle || e.title || e.name;
}
function ht(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Jo(e) {
  return ht(e.meta, "group");
}
function Qh(e) {
  return ht(e.meta, "geoPoint");
}
function li(e) {
  const t = ht(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Jh(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function gn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Xh(e, t) {
  if (t)
    return en(e, "time", t).find(gn);
}
function Zh(e, t) {
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
    label: ga(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ht(n, "quantity"),
    unit: ht(n, "unit")
  };
}
function vn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ga(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ht(n, "quantity"),
    unit: ht(n, "unit")
  };
}
function Zo(e, t) {
  return {
    name: e.name,
    label: ga(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function ep(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = Qh({ meta: i });
    !o || !$e(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && li({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && li({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Jh(o[0].name, s[0].name),
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
function en(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!$e(a) || n && a.name !== n) continue;
    const i = Jn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...ep(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        $e(s) && o(Xo(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        $e(s) && s.type !== "time" && o(vn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        $e(s) && s.type === "time" && o(vn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        $e(s) && s.type === "number" && o(vn(s, a.name));
  }
  return r;
}
function tp(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!$e(a) || n && !n.has(a.name)) continue;
    const i = Jn(a);
    for (const o of a.segments) {
      if (!$e(o)) continue;
      const s = Zo(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function ze(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Jn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(Xo(i, n.name)) : a(vn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Zo(o, n.name));
    }
    return en(e, "geoPoint").find((n) => n.name === t);
  }
}
function ci(e) {
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
const Dr = /* @__PURE__ */ new Set([
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
function np(e) {
  return e === "number";
}
function Pe(e) {
  return e.target !== void 0;
}
function ke(e, t) {
  return e.kinds.includes(t);
}
function va(e, t, n) {
  if (!ke(e, t)) {
    const r = e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} takes ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function pt(e) {
  return e.chart.familyOptions ?? {};
}
function ba(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function ts(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function rp(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function ap(e, t, n) {
  var o, s;
  const r = e.chart;
  if (ba(r)) return;
  const a = ln(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = pt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function At(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = pt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!Pe(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = ln(a);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = ts(a), d = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, d);
        break;
      }
      case "pivot": {
        const m = ba(a) ?? ap(e, t, n);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "option": {
        const m = i[u.key];
        r[c.id] = typeof m == "string" && m ? [m] : [];
        break;
      }
      case "optionList": {
        const m = Array.isArray(i[u.key]) ? i[u.key] : [];
        r[c.id] = m.map((d) => d && typeof d == "object" ? d.member : void 0).filter((d) => typeof d == "string");
        break;
      }
    }
  }
  return r;
}
function ya(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function ka(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function ip(e, t) {
  return { ...e, dimensions: ya(e.dimensions, t) };
}
function ns(e, t) {
  const n = ka(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function rs(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function op(e) {
  const t = sp(e);
  return t === void 0 ? hp : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function sp(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Et(e, t, n, r) {
  if (np(n)) return { ...e, measures: ya(e.measures, t) };
  if (n === "time") {
    const a = cn(e) ?? r;
    return rs(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? op(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return ip(e, t);
}
function $t(e, t, n, r) {
  const a = e.query ?? {}, i = At(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = cn(a);
  if ((o == null ? void 0 : o.dimension) === n) return rs(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = ka(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return ns(a, n);
}
function lp(e, t, n, r) {
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
function Gt(e, t, n) {
  var c, u;
  const r = At(e, t, n), a = (m) => t.find((d) => {
    var h;
    return ((h = d.target) == null ? void 0 : h.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : ln(e.chart),
    measures: o ? r[o.id] ?? [] : ts(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : ba(e.chart)
  };
}
function Yt(e, t, n) {
  const r = { ...is(e.chart), ...rp(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: lp(n.category, n.measures, n.pivot, r)
    }
  };
}
function Dn(e, t, n) {
  const r = { ...pt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function wa(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !Pe(i)) return e;
  const o = i.target, s = At(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = cn(c);
      u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a, m);
      const d = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...d, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : ya(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = $t(e, t, s[0], n)), c = Et(c, r, a);
      const m = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a);
      const m = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a), Dn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(pt(e)[o.key]) ? [...pt(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = Et(c, r, a), Dn(e, c, { [o.key]: u });
    }
  }
}
function cp(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Pe(a)) return e;
  const i = a.target, o = $t(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Gt(e, t), c = ka(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : ns(o, s.pivot);
      return Yt(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Gt(e, t);
      return Yt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Dn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(pt(e)[i.key]) ? pt(e)[i.key] : [];
      return Dn(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function up(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = cn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function mp(e, t) {
  if (ke(t, e)) return e;
  if (e === "category" && ke(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && ke(t, "category") || e === "time" && ke(t, "category")) return "category";
}
function dp(e, t, n) {
  const r = At(e, t), a = /* @__PURE__ */ new Map();
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
    if (!Pe(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = mp(up(e, u), o);
      m && (i = wa(i, n, o.id, u, m));
    }
  }
  return i;
}
function fp(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Pe(a)) continue;
    const i = n.findIndex((o) => ke(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function zt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function as(e) {
  var o, s, c, u, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return zt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return zt(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return zt(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return zt(i);
}
function Lr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function is(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function ln(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function cn(e) {
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
const hp = "day";
function Er(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function pp(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Er(r) && Er(a) ? dp(e, r.wells, a.wells) : gp(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function gp(e, t) {
  var p;
  const { chart: n } = e, r = e.query ?? {}, a = Lr(n).length ? Lr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((g) => g.dimension), o = ln(n) ?? ((p = r.dimensions) == null ? void 0 : p[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (g, y, k) => !!g && k.indexOf(g) === y
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Er(t)) {
    const g = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: g } } : c;
  }
  const u = [...a], m = [...s], d = (g) => i.includes(g) ? "time" : "category";
  let h = c;
  for (const g of t.wells) {
    if (!g.target || !g.channel) continue;
    const y = ke(g, "category") ? [
      [m, d],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, d]
    ];
    let k = 0;
    for (const [w, S] of y)
      for (let N = 0; N < w.length; ) {
        if (g.cardinality === "one" && k > 0 || !ke(g, S(w[N]))) {
          N += 1;
          continue;
        }
        h = wa(h, t.wells, g.id, w[N], S(w[N])), w.splice(N, 1), k += 1;
      }
  }
  return h;
}
function ss(e) {
  return Zd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function ls(e) {
  return tf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function vp(e, t) {
  return t.require(e).wells;
}
function cs(e, t) {
  var i;
  const n = t.require(e.chart.family), r = At(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function Vt(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = wa(e, o.wells, n, r, a);
  return yp(e, s, o.wells);
}
function bp(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = cp(e, i.wells, n, r);
  return us(e, o, i.wells);
}
function yp(e, t, n) {
  return kp(e, us(e, t, n));
}
function kp(e, t) {
  var s, c;
  const n = ((s = e.query) == null ? void 0 : s.timeDimensions) ?? [], r = ((c = t.query) == null ? void 0 : c.timeDimensions) ?? [];
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
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(At(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
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
      return /* @__PURE__ */ l(hr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(Fi, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Br, { className: "cv-member-type-icon" });
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
  className: c
}) {
  const { meta: u, isLoading: m } = je(), d = b.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return en(u, n).filter((k) => y.has(k.cube));
    }
    return en(u, n, e);
  }, [u, n, e, t]), h = b.useMemo(() => {
    const y = wp(d), k = y.length > 1, w = [];
    for (const [S, N] of y)
      for (const [x, C] of Zh(N, () => "Other")) {
        const T = k ? x === "Other" ? S : `${S} · ${x}` : x;
        w.push({ key: `${S}:${x}`, label: T, items: C });
      }
    return w;
  }, [d]), p = h.length > 1, g = d.find((y) => y.name === r);
  return /* @__PURE__ */ v(Te, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(_e, { id: s, className: c, children: /* @__PURE__ */ l(Re, { placeholder: m ? "Loading…" : i, children: g ? /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
      Ln(g.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: g.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Oe, { children: h.map((y) => /* @__PURE__ */ v(Rr, { children: [
      p && y.label ? /* @__PURE__ */ l(_r, { children: y.label }) : null,
      y.items.map((k) => /* @__PURE__ */ l(be, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
        Ln(k.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, y.key)) })
  ] });
}
function wp(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function tn({
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
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: R(
              "cv-segmented-option",
              a === "sm" && "cv-segmented-option--sm",
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
function ui(e) {
  return e.reason === void 0;
}
function Np(e, t, n, r, a) {
  return va(e, t, [...n]) ?? (a == null ? void 0 : a(r));
}
function Cp(e, t, n) {
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
function Sp(e) {
  try {
    const t = ds();
    if (!t) return;
    e ? t.setItem(En, "1") : t.removeItem(En);
  } catch {
  }
}
let Ir = fs();
const bn = /* @__PURE__ */ new Set();
let yt;
function xp() {
  for (const e of [...bn]) e();
}
function hs(e) {
  e !== Ir && (Ir = e, xp());
}
function Mp() {
  if (yt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== En || hs(fs());
  };
  e.addEventListener("storage", t), yt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const mn = {
  get: () => Ir,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Sp(e), hs(e);
  },
  subscribe: (e) => (bn.add(e), Mp(), () => {
    bn.delete(e), bn.size === 0 && (yt == null || yt(), yt = void 0);
  })
}, mi = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Fi, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(hr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(hr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Br, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Pi, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, di = ["geoPoint", "number", "numberDimension", "category", "time"];
function ps({
  well: e,
  placed: t,
  inWell: n,
  scope: r,
  blockReason: a,
  onSelect: i,
  align: o = "start",
  side: s = "bottom",
  children: c
}) {
  var me, fe;
  const { meta: u, isLoading: m } = je(), [d, h] = b.useState(!1), [p, g] = b.useState(""), y = b.useSyncExternalStore(
    mn.subscribe,
    mn.get,
    mn.getServer
  ), k = mn.set, w = b.useId(), [S, N] = b.useState(r.viewLocked ?? "tables"), [x, C] = b.useState({});
  b.useEffect(() => {
    d && N(r.viewLocked ?? "tables");
  }, [d, r.viewLocked]);
  const T = b.useMemo(() => new Set(t), [t]), A = p.trim().toLowerCase(), W = b.useMemo(() => {
    if (S !== "tables") {
      const G = r.views.find((J) => J.name === S) ?? Kt(u, S);
      return G ? [{ cube: G, tag: "dataset" }] : [];
    }
    const V = [];
    r.sourceCube && V.push({ cube: r.sourceCube, tag: "source" });
    for (const G of r.relatedCubes) V.push({ cube: G, tag: "related" });
    return V;
  }, [S, r, u]), B = [
    ...di.filter((V) => ke(e, V)),
    ...di.filter((V) => !ke(e, V))
  ], F = (V) => {
    const G = [], J = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Set();
    for (const ae of B) {
      const $ = mi[ae], j = va(e, ae, n ?? []);
      let I = en(u, $.metaKind, V);
      ae === "time" && (I = [...I].sort(
        (M, P) => Number(gn(P)) - Number(gn(M))
      ));
      for (const M of I) {
        if (T.has(M.name) || oe.has(M.name) || A && !(M.label.toLowerCase().includes(A) || M.name.toLowerCase().includes(A))) continue;
        oe.add(M.name);
        const P = Jo(M), K = P ? `g:${P.toLowerCase()}` : `k:${$.label}`;
        let E = J.get(K);
        E || (E = {
          key: K,
          label: P ?? $.label,
          headerIcon: P ? void 0 : $.icon,
          rejected: j !== void 0,
          items: []
        }, J.set(K, E), G.push(K)), j === void 0 && (E.rejected = !1), E.items.push({
          option: M,
          kind: ae,
          reason: Np(e, ae, n ?? [], M, a)
        });
      }
    }
    return G.map((ae) => J.get(ae));
  }, O = W.map((V) => ({ section: V, groups: F(V.cube.name) })).filter((V) => V.groups.length > 0), _ = y ? O.reduce(
    (V, G) => V + G.groups.reduce((J, oe) => J + oe.items.filter((ae) => !ui(ae)).length, 0),
    0
  ) : 0, D = y ? O.map((V) => ({
    section: V.section,
    groups: V.groups.map((G) => ({ ...G, rejected: !1, items: G.items.filter(ui) })).filter((G) => G.items.length > 0)
  })).filter((V) => V.groups.length > 0) : O, Q = D.length > 0, z = !Q && _ > 0, H = (V, G) => {
    i(V, G), h(!1), g("");
  }, q = S === "tables" ? "All related tables" : ((me = r.views.find((V) => V.name === S)) == null ? void 0 : me.title) ?? ((fe = Kt(u, S)) == null ? void 0 : fe.title) ?? S, re = r.viewLocked ? r.views.filter((V) => V.name === r.viewLocked) : [], ie = y ? _ > 0 ? `Only compatible fields — ${_} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ v(Ae, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: c }),
    /* @__PURE__ */ v(Le, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ v("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ v("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(ul, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: p,
              onChange: (V) => g(V.target.value),
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
            "aria-label": ie,
            title: ie,
            onClick: () => k(!y),
            className: R("cv-picker-compat", y && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(ml, { className: "cv-ec-icon" }),
              y && _ > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: _ }) : null
            ]
          }
        ),
        re.length > 0 ? /* @__PURE__ */ l(
          Tp,
          {
            browse: S,
            label: q,
            views: re,
            onBrowse: N
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: Q ? D.map(({ section: V, groups: G }, J) => {
        const oe = G.reduce((I, M) => I + M.items.length, 0), ae = V.tag === "related", $ = x[V.cube.name] ?? ae, j = A.length > 0 ? !0 : !$;
        return /* @__PURE__ */ v("div", { children: [
          V.tag === "related" && J > 0 && D[J - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => C((I) => ({ ...I, [V.cube.name]: !$ })),
              className: "cv-picker-table",
              children: [
                j ? /* @__PURE__ */ l(tt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(an, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l($i, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: V.cube.title }),
                V.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : V.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: oe })
              ]
            }
          ),
          j ? G.map((I) => /* @__PURE__ */ v(
            "div",
            {
              className: R(
                "cv-picker-group",
                I.rejected && "cv-picker-group--rejected"
              ),
              children: [
                G.length > 1 ? /* @__PURE__ */ v("div", { className: "cv-picker-group-header", children: [
                  I.headerIcon,
                  I.label,
                  I.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                I.items.map(({ option: M, kind: P, reason: K }) => /* @__PURE__ */ l(
                  Rp,
                  {
                    option: M,
                    kindIcon: mi[P].icon,
                    badge: P === "time" && gn(M) ? "default" : void 0,
                    reason: K,
                    onPick: () => H(M.name, P)
                  },
                  M.name
                ))
              ]
            },
            I.key
          )) : null
        ] }, V.cube.name);
      }) : z ? /* @__PURE__ */ v("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ v("p", { children: [
          _,
          " ",
          A ? "matching " : "",
          "field",
          _ === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          _ === 1 ? "it" : "them",
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
function Tp({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ v(Ae, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      De,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(zi, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(fi, { active: e === "tables", icon: /* @__PURE__ */ l($i, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ue, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          fi,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(qr, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function fi({
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
function Rp({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
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
const _p = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], jt = "yyyy-MM-dd";
function Op(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function hi(e) {
  if (!e) return;
  const t = Ai(e, jt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Na({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = Op(e), s = hi(i), c = hi(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${pe(s, "MMM d, yyyy")} – ${pe(c, "MMM d, yyyy")}` : s ? pe(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: R("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Ii, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: R("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Le, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-daterange-presets", children: [
        _p.map((d) => /* @__PURE__ */ l(
          Y,
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
          Y,
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
          selected: u,
          defaultMonth: s,
          onSelect: (d) => {
            d != null && d.from && d.to ? t([pe(d.from, jt), pe(d.to, jt)]) : d != null && d.from ? t([pe(d.from, jt), pe(d.from, jt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Ap(e) {
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
function Dp(e, t) {
  const n = new Set(Ap(t));
  return e.filter((r) => n.has(r.type));
}
function Lp(e) {
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
function Ep(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function Ip(e, t, n) {
  const r = Lp(e), a = { name: Ep(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const gs = b.createContext({});
function Fp({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(gs.Provider, { value: n, children: t });
}
function Pp() {
  return b.useContext(gs);
}
function $p({ kind: e, value: t, onChange: n, className: r }) {
  const a = sn(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Pp(), [s, c] = b.useState(!1), [u, m] = b.useState(!1), [d, h] = b.useState(""), p = b.useMemo(() => Dp(i, e), [i, e]), g = p.find((w) => w.name === t), y = (w) => {
    n(w), c(!1), m(!1);
  }, k = () => {
    if (!o) return;
    const w = Ip(e, d || "Variable", i);
    o(w), y(w.name), h("");
  };
  return /* @__PURE__ */ v(
    Ae,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: R("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(dl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: R("cv-var-trigger-label", !g && "cv-var-trigger-label--placeholder"), children: g ? g.label ?? g.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Le, { align: "start", className: "cv-var-popover", children: [
          p.length > 0 ? p.map((w) => /* @__PURE__ */ v(
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
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ v("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              he,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: d,
                onChange: (w) => h(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(Y, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(Ct, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function Tt({
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
  const c = (u) => R("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ v("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ v("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), Me(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      $p,
      {
        kind: e,
        value: Me(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(Me(t) ? void 0 : t, (u) => n(u))
  ] });
}
const zp = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function lr(e) {
  return "member" in e && "operator" in e;
}
function Vp({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var F;
  const { meta: s } = je(), c = ((F = sn()) == null ? void 0 : F.decls) ?? [], [u, m] = b.useState(null), [d, h] = b.useState(null), p = r ?? [], g = p.length === 1 && !lr(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(lr) ? p[0] : void 0, y = g ? "any" : "all", k = [], w = [];
  g || p.forEach((O) => lr(O) ? k.push(O) : w.push(O));
  const S = g ? g.or : k, N = w.length === 0 && (S.length >= 2 || y === "any"), x = (O) => y === "any" ? O.length ? [{ or: O }] : [] : [...O, ...w], C = (O) => {
    const _ = O.filter((Q) => Q.member.length > 0), D = x(_);
    a(D.length > 0 ? D : void 0);
  }, T = (O) => {
    const _ = O === "any" ? S.length ? [{ or: S }] : [] : [...S];
    a(_.length > 0 ? _ : void 0);
  }, A = (O, _) => C(S.map((D, Q) => Q === O ? { ...D, ..._ } : D)), W = (O) => C(S.filter((_, D) => D !== O)), B = (O) => {
    const D = { ...d ?? { member: "", operator: "equals", values: [] }, ...O };
    D.member ? (h(null), m(S.length), C([...S, D])) : h(D);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: R("cv-filter-builder", o), children: [
    S.length === 0 && !d ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    N ? /* @__PURE__ */ v("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        tn,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: y,
          onChange: T
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    S.map((O, _) => {
      const D = ze(s, O.member);
      return u === _ ? /* @__PURE__ */ l(
        pi,
        {
          leaf: O,
          member: D,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (Q) => A(_, Q),
          onDone: () => m(null),
          onRemove: () => W(_)
        },
        _
      ) : /* @__PURE__ */ l(
        jp,
        {
          text: Wp(O, D == null ? void 0 : D.label, c),
          disabled: i,
          onEdit: () => m(_),
          onRemove: () => W(_)
        },
        _
      );
    }),
    d ? /* @__PURE__ */ l(
      pi,
      {
        leaf: d,
        member: ze(s, d.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: B,
        onRemove: () => h(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ v("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      Y,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!d,
        onClick: () => {
          m(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Ct, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function jp({
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
      Y,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(Rt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function pi({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: a,
  disabled: i,
  onChange: o,
  onDone: s,
  onRemove: c
}) {
  const { meta: u } = je(), m = ci(t == null ? void 0 : t.type), d = m.includes(e.operator) ? e.operator : m[0], h = !Dr.has(d), p = b.useId(), g = b.useId(), y = b.useId(), k = b.useId(), w = b.useId(), S = b.useId();
  b.useEffect(() => {
    d !== e.operator && o({ operator: d });
  }, [e.operator, o, d]);
  const N = (x) => {
    const C = ze(u, x);
    o({ member: x, operator: ci(C == null ? void 0 : C.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ v("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(nt, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(Rt, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: p, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          ps,
          {
            well: zp,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: N,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                id: g,
                disabled: i,
                "aria-labelledby": `${p} ${g}`,
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
          onChange: N,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: y, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ v(
        Te,
        {
          value: d,
          onValueChange: (x) => o({
            operator: x,
            values: Dr.has(x) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              _e,
              {
                id: k,
                "aria-labelledby": `${y} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Re, {})
              }
            ),
            /* @__PURE__ */ l(Oe, { children: m.map((x) => /* @__PURE__ */ l(be, { value: x, children: es[x] }, x)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: S, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Hp,
        {
          fieldId: S,
          labelId: w,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (x) => o({ values: x })
        }
      )
    ] }) : null
  ] });
}
function Wp(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = es[e.operator] ?? e.operator;
  if (Dr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Me(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Hp({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Me(i[0]);
  if (t === "time") {
    const u = o ? i[0] : Bp(i);
    return /* @__PURE__ */ l(
      Tt,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : Me(m) ? [m] : qp(m)),
        renderFixed: (m, d) => /* @__PURE__ */ l(Na, { value: m, onChange: d })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !Me(u));
  return /* @__PURE__ */ l(
    Tt,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : Me(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(
        he,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (d) => m(Up(d.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Bp(e) {
  const t = e.filter((n) => !Me(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function qp(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Up(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Kp({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ v(
      De,
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
    /* @__PURE__ */ v(Le, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(Gp, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Vp, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function Gp({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = je(), a = tp(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
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
function Yp({ currentName: e, hasFields: t, onSelect: n }) {
  var y;
  const { meta: r } = je(), a = b.useMemo(() => Xn(r), [r]), i = a.filter((k) => k.type === "view"), o = a.filter((k) => k.type === "cube"), s = a.find((k) => k.name === e), [c, u] = b.useState(!1), [m, d] = b.useState(null), h = (k) => {
    if (k === e) {
      u(!1);
      return;
    }
    t ? d(k) : (n(k), u(!1));
  }, p = () => {
    m && n(m), d(null), u(!1);
  }, g = m ? ((y = a.find((k) => k.name === m)) == null ? void 0 : y.title) ?? m : "";
  return /* @__PURE__ */ v(
    Ae,
    {
      open: c,
      onOpenChange: (k) => {
        u(k), k || d(null);
      },
      children: [
        /* @__PURE__ */ v(
          De,
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
        /* @__PURE__ */ l(Le, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ v("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ v("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: g }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(Y, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => d(null), children: "Cancel" }),
            /* @__PURE__ */ l(Y, { size: "sm", className: "cv-ec-h7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ v(ue, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((k) => /* @__PURE__ */ l(
              gi,
              {
                icon: /* @__PURE__ */ l(qr, { className: "cv-ec-icon" }),
                label: k.title,
                active: k.name === e,
                onClick: () => h(k.name)
              },
              k.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((k) => /* @__PURE__ */ l(
            gi,
            {
              icon: /* @__PURE__ */ l(Vi, { className: "cv-ec-icon" }),
              label: k.title,
              active: k.name === e,
              onClick: () => h(k.name)
            },
            k.name
          ))
        ] }) })
      ]
    }
  );
}
function gi({
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
function vi(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Qp({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.labelHide === !0, s = b.useId(), c = b.useId(), u = n === "y" ? "Value axis title" : "Category axis title";
  return /* @__PURE__ */ v(
    "div",
    {
      className: R(
        "cv-axis-chrome",
        o && "cv-axis-chrome--hidden"
      ),
      children: [
        r ? /* @__PURE__ */ l("span", { id: s, className: "cv-axis-chrome-label", children: r }) : null,
        /* @__PURE__ */ l(
          "input",
          {
            id: c,
            ...r ? { "aria-labelledby": s } : { "aria-label": u },
            value: i.label ?? "",
            placeholder: a ?? "Axis title",
            disabled: o,
            onChange: (d) => vi(e, t, n, { label: d.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv-axis-chrome-input"
          }
        ),
        /* @__PURE__ */ l(
          Xp,
          {
            hidden: o,
            what: "axis title",
            onClick: () => vi(e, t, n, { labelHide: o ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Jp({
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
          n ? /* @__PURE__ */ l(ji, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Wi, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Xp({
  hidden: e,
  what: t,
  onClick: n
}) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      onClick: n,
      "aria-label": e ? `Show ${t}` : `Hide ${t}`,
      title: e ? `Show ${t}` : `Hide ${t}`,
      className: "cv-chrome-eye",
      children: e ? /* @__PURE__ */ l(ji, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Wi, { className: "cv-ec-icon" })
    }
  );
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
function Fr({
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
function ve({
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
        /* @__PURE__ */ l(Fr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Zp = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, eg = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function tg({ spec: e, update: t }) {
  var k, w, S;
  const n = at(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((w = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", d = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", h = ((S = r.transform) == null ? void 0 : S.kind) ?? "none", p = ua(o) ? /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Compare",
        hint: h === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ v(
          Te,
          {
            value: h,
            onValueChange: (N) => {
              var x;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((x = r.transform) == null ? void 0 : x.window) ?? dn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(_e, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Re, {}) }),
              /* @__PURE__ */ l(Oe, { children: eg.map((N) => /* @__PURE__ */ l(be, { value: N, children: Zp[N] }, N)) })
            ]
          }
        )
      }
    ),
    h === "rollingAvg" ? /* @__PURE__ */ l(bi, { label: "Window (points)", children: (N) => {
      var x;
      return /* @__PURE__ */ l(
        he,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((x = r.transform) == null ? void 0 : x.window) ?? dn,
          onChange: (C) => {
            const T = parseInt(C.target.value, 10), A = Number.isFinite(T) ? Math.min(90, Math.max(2, T)) : dn;
            s({ transform: { kind: "rollingAvg", window: A } });
          }
        }
      );
    } }) : null
  ] }) : null, g = /* @__PURE__ */ l(de, { label: "Stacked", children: /* @__PURE__ */ l(
    tn,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: d,
      onChange: (N) => s({ stackMode: N })
    }
  ) }), y = (() => {
    var N, x;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ l(
            ve,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (C) => s({ orientation: C ? "horizontal" : "vertical" })
            }
          ),
          g
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ue, { children: [
          g,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((x = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : x.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ l(
            ve,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (C) => c({ innerRadiusPct: C ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(de, { label: "Slice labels", children: /* @__PURE__ */ l(
            tn,
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
              onChange: (C) => c({ showLabels: C })
            }
          ) }),
          /* @__PURE__ */ l(bi, { label: "Max slices", children: (C) => /* @__PURE__ */ l(
            he,
            {
              id: C,
              type: "number",
              min: 1,
              className: "cv-ec-h8",
              value: i.maxSlices ?? "",
              placeholder: "8",
              onChange: (T) => {
                const A = parseInt(T.target.value, 10);
                c({ maxSlices: Number.isFinite(A) && A > 0 ? A : void 0 });
              }
            }
          ) })
        ] });
      // KPI is configured by its three inline blocks in the config strip (Value /
      // Comparison / Sparkline — see ChartEditOverlay), so the chart-type popover shows
      // no Options for a KPI (no confusing split).
      case "kpi":
        return null;
      case "table":
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ l(
            ve,
            {
              label: "Compact rows",
              checked: i.rowHeight === "compact",
              onChange: (C) => c({ rowHeight: C ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ l(
            ve,
            {
              label: "Sortable columns",
              checked: i.sortable !== !1,
              onChange: (C) => c({ sortable: C })
            }
          ),
          /* @__PURE__ */ l(
            ve,
            {
              label: "Sticky header",
              checked: i.stickyHeader !== !1,
              onChange: (C) => c({ stickyHeader: C })
            }
          ),
          /* @__PURE__ */ l(
            ve,
            {
              label: "Row numbers",
              checked: i.showRowNumbers === !0,
              onChange: (C) => c({ showRowNumbers: C })
            }
          )
        ] });
      case "heatmap":
        return /* @__PURE__ */ l(
          ve,
          {
            label: "Show values",
            checked: i.showValues === !0,
            onChange: (C) => c({ showValues: C || void 0 })
          }
        );
      case "scatter":
        return null;
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ v("div", { className: "cv-customize", children: [
    y,
    p
  ] });
}
function ng(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ua(n);
}
function bi({
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
    if (!Pe(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      ke(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function rg(e) {
  let t = 0;
  for (const n of e)
    Pe(n) && (t += n.optional ? 1 : 3);
  return t;
}
function ag(e, t) {
  return e.some((n) => Pe(n) && n.cardinality === "many" && ke(n, t));
}
const ig = 0.35, og = 0.4, sg = 0.3, lg = 0.1;
function cg(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? sg : e.supportsCartesianAxes ? lg : e.wells.some(
    (a) => Pe(a) && a.channel === "x" && ke(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function ks(e) {
  const t = e.filter(Pe);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function ug(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const mg = (e, t, n) => e === 1 ? t : n;
function dg(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${ug(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${mg(r, "measure", "measures")}`;
  return ks(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function fg(e, t) {
  const n = bs(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = ys(s, n), u = rg(s), m = Math.max(0, n.length - c.matched.length), d = fp(s, r) + 0.5 * m, h = u > 0 ? d / u : 0, p = c.leftover.filter(
      (y) => y.kind !== "time" && !ag(s, y.kind)
    ).length, g = h - ig * p + cg(o, a) - (ks(s) ? og : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(g * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: dg(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function hg(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function pg(e, t, n) {
  const r = e.require(n), a = ys(r.wells, bs(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = Vt(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function ws(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(pp(e, r, n));
  };
}
function gg({ spec: e, update: t, empty: n }) {
  const r = at(), a = e.chart.family, i = ws(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ v("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Ns, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function vg({ spec: e, update: t }) {
  const n = at(), r = e.chart.family, a = ws(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(
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
    /* @__PURE__ */ v(Le, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(Ns, { spec: e, family: r, onPick: a, families: n }),
      ng(r, n) ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(tg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Ns({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => fg(r, e), [r, e]), i = b.useMemo(() => hg(a), [a]), o = b.useMemo(
    () => new Map(a.map((d) => [d.family, d])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((d) => d.fits).map((d) => d.family)),
    [a]
  ), c = wg(e, r, s), u = (d, h) => /* @__PURE__ */ l(
    bg,
    {
      fit: d,
      active: d.family === t,
      preview: c.get(d.family),
      families: r,
      reason: h ? d.reason : void 0,
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
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((d) => u(d, !0)) })
    ] }) : null,
    /* @__PURE__ */ v("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: m.map((d) => u(d, !1)) })
    ] })
  ] });
}
function bg({
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
          Og,
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
function yg(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const yi = 200, kg = () => () => {
};
function wg(e, t, n) {
  const r = e.query, a = yg(r), i = b.useMemo(() => {
    const h = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof h == "number" ? Math.min(h, yi) : yi
    };
  }, [r]), o = sn(), s = b.useRef(null);
  s.current === null && (s.current = Ro());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, m = b.useSyncExternalStore(
    o ? o.store.subscribe : kg,
    u,
    u
  ), { resultSet: d } = Ao(m, { skip: !a });
  return b.useMemo(() => {
    const h = /* @__PURE__ */ new Map();
    for (const p of t.list()) {
      const g = p.family;
      if (p.queryless || a && n.has(g) && !d) continue;
      const w = (d && n.has(g) ? Ng(e, g, t, d, m) : void 0) ?? _g(g, t);
      w && h.set(g, w);
    }
    return h;
  }, [e, t, d, m, n, a]);
}
function Ng(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : pg(n, e, t), o = Cs(i.chart, n), s = Mo(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const gt = "sample.category", nn = "sample.group", Ne = "sample.value", Ee = "sample.count", Ss = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Pr = [18, 27, 21, 34, 26, 39], $r = [12, 9, 17, 14, 22, 16], Cg = Ss.flatMap((e, t) => [
  { [gt]: e, [nn]: "North", [Ne]: Pr[t], [Ee]: $r[t] },
  {
    [gt]: e,
    [nn]: "South",
    [Ne]: Math.round(Pr[t] * 0.62),
    [Ee]: Math.round($r[t] * 0.78)
  }
]), Sg = {
  measures: [Ne, Ee],
  dimensions: [gt, nn]
}, xg = {
  measures: {
    [Ne]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ee]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [gt]: { title: "Day", shortTitle: "Day", type: "string" },
    [nn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function xs(e) {
  const t = [
    { key: Ne, label: "Value", data: Pr, colorToken: "chart-1" },
    { key: Ee, label: "Count", data: $r, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: Ss,
    series: t,
    raw: { rows: Cg, query: Sg, annotation: xg },
    empty: !1
  };
}
const Mg = xs(1), Tg = xs(2), Wt = (e, t) => ({
  family: e,
  mapping: { category: { member: gt }, series: { mode: "measures", members: t } }
}), Rg = {
  bar: Wt("bar", [Ne, Ee]),
  line: Wt("line", [Ne, Ee]),
  area: { ...Wt("area", [Ne, Ee]), stackMode: "stacked" },
  pie: Wt("pie", [Ne]),
  scatter: { family: "scatter", familyOptions: { x: Ne, y: Ee } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: gt },
      series: { mode: "pivot", value: Ne, pivot: nn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ne, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: gt }, { member: Ne }, { member: Ee }] }
  }
};
function _g(e, t) {
  const n = Rg[e] ?? Wt(e, [Ne, Ee]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Mg : Tg,
    options: Cs(n, t)
  };
}
const Og = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(Ag, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    So,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Ag extends b.Component {
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
function Dg(e, t) {
  return e.allowedCubes.includes(t);
}
function Lg(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function Eg(e, t, n, r) {
  const a = Xn(e), i = a.filter((N) => N.type === "view"), o = cs(t, r), s = Object.values(o).flat();
  let c;
  for (const N of s) {
    const x = ze(e, N);
    if (x) {
      c = x;
      break;
    }
  }
  const u = !c && n ? Kt(e, n) : void 0, m = c ? Kt(e, c.cube) : u, d = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, h = t.query.measures ?? [], p = h.length ? zt(h[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: i, measureSource: p, allowedCubes: [d] };
  const g = p ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), y = g ? Kt(e, g) : void 0, k = a.filter((N) => N.type === "cube"), w = g ? Lg(k, g) : k, S = g ? [g, ...w.map((N) => N.name)] : k.map((N) => N.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: w,
    views: i,
    measureSource: p,
    allowedCubes: S
  };
}
function Ig(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Fg(e, t, n, r, a, i) {
  var U, te, ce, We, Dt;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : Pg(a), m = o.familyOptions ?? {}, d = Array.isArray(m.columns) ? m.columns : [], h = is(o), p = h[r], g = c === "table" && n.id === "columns", y = c === "bar" || c === "line" || c === "area", k = ((te = (U = o.mapping) == null ? void 0 : U.series) == null ? void 0 : te.mode) === "measures", w = y && n.id === "y", S = w && k, N = g ? (ce = d.find((X) => X.member === r)) == null ? void 0 : ce.label : S ? p == null ? void 0 : p.label : void 0, x = S ? p == null ? void 0 : p.colorToken : void 0, C = cn(s), T = n.kinds.includes("time") && (C == null ? void 0 : C.dimension) === r, A = T ? C == null ? void 0 : C.granularity : void 0, W = T ? C == null ? void 0 : C.dateRange : void 0, B = (c === "line" || c === "area") && n.id === "y" && k, F = B ? p == null ? void 0 : p.curve : void 0, O = B ? p == null ? void 0 : p.dots : void 0, _ = (X) => {
    var Sa, xa;
    if ((Sa = o.mapping) != null && Sa.series && o.mapping.series.mode !== "measures") return;
    const ge = ((xa = o.mapping) != null && xa.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ye = { ...h };
    X && Object.keys(X).length > 0 ? ye[r] = X : delete ye[r];
    const Lt = ln(o);
    Lt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Lt }, series: os(ge, ye) }
      }
    });
  }, D = (X) => {
    const ge = d.map((ye) => ye.member === r ? { ...ye, ...X } : ye);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: ge } } });
  }, Q = (X) => {
    g ? D({ label: X }) : S && _({ ...p, label: X });
  }, z = (X) => {
    S && _({ ...p, colorToken: X ?? void 0 });
  }, H = (X) => {
    if (!C) return;
    const ge = { ...C };
    for (const ye of Object.keys(X)) {
      const Lt = X[ye];
      Lt === void 0 ? delete ge[ye] : ge[ye] = Lt;
    }
    t({ ...e, query: { ...s, timeDimensions: [ge] } });
  }, q = (X) => H({ granularity: X }), re = (X) => H({ dateRange: X }), ie = (X) => {
    S && _({ ...p, curve: X });
  }, me = (X) => {
    S && _({ ...p, dots: X });
  }, fe = () => t(bp(e, c, n.id, r, i)), V = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), G = (We = o.mapping) == null ? void 0 : We.series, J = (G && G.mode === "pivot" ? G.value : Lr(o)[0]) ?? ((Dt = s.measures) == null ? void 0 : Dt[0]), oe = V ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...J ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...J ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ae = (() => {
    const X = Ig(s.order)[0];
    if (!X) return "none";
    const [ge, ye] = X;
    return J && ge === J ? ye === "desc" ? "value-desc" : "value-asc" : ge === r ? u === "time" ? ye === "desc" ? "time-desc" : "time-asc" : ye === "asc" ? "label-asc" : "label-desc" : "none";
  })(), $ = (X) => {
    let ge;
    switch (X) {
      case "none":
        ge = void 0;
        break;
      case "value-desc":
        ge = J ? [[J, "desc"]] : void 0;
        break;
      case "value-asc":
        ge = J ? [[J, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ge = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ge = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ge } });
  }, j = typeof s.limit == "number" ? s.limit : void 0, I = (X) => t({ ...e, query: { ...s, limit: X && X > 0 ? X : void 0 } }), P = (c === "bar" || c === "line" || c === "area") && T, K = P && m.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: x,
    granularity: A,
    dateRange: W,
    curve: F,
    dots: O,
    canLineStyle: B,
    canRename: g || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: T,
    isCategoryField: V,
    sortValue: ae,
    sortOptions: oe,
    onSort: $,
    limit: j,
    onLimit: I,
    canComparePrevious: P,
    comparePrevious: K,
    comparePreviousReady: P && W !== void 0,
    onComparePrevious: (X) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: X || void 0 } } }),
    onRename: Q,
    onRecolor: z,
    onGranularity: q,
    onDateRange: re,
    onCurve: ie,
    onDots: me,
    onRemove: fe
  };
}
function Pg(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ki(e, t, n, r) {
  var d;
  const { chart: a, query: i } = e, o = a.family, s = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const p = h.slice(), [g] = p.splice(n, 1);
    return p.splice(r, 0, g), p;
  };
  if (o === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, p = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: p } } };
  }
  const c = s(i.measures ?? []), u = (d = a.mapping) == null ? void 0 : d.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    m = { ...a.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const $g = Xe.options;
function zg({
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
        $g.map((i) => {
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
const Vg = Je.options, jg = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Ms({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: i,
  className: o
}) {
  const s = n && n.length > 0 ? n : Vg;
  return /* @__PURE__ */ v(
    Te,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ l(_e, { id: i, className: o, children: /* @__PURE__ */ l(Re, { placeholder: r }) }),
        /* @__PURE__ */ l(Oe, { children: s.map((c) => /* @__PURE__ */ l(be, { value: c, children: jg[c] }, c)) })
      ]
    }
  );
}
const Wg = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Hg({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = at(), u = Fg(e, t, n, r, a, c), m = b.useId(), d = b.useId(), h = b.useId(), p = b.useId(), g = b.useId(), y = b.useId(), k = (a == null ? void 0 : a.label) ?? r, w = u.label || k, S = u.canColor && i !== void 0, N = u.canRename || S || u.isTimeField || u.isCategoryField || u.canLineStyle || !!o, x = (T) => {
    const A = T.trim();
    u.onRename(A.length > 0 ? A : void 0);
  }, C = /* @__PURE__ */ v(ue, { children: [
    S ? /* @__PURE__ */ l(
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
    N ? /* @__PURE__ */ v(Ae, { children: [
      /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${w}`,
          children: C
        }
      ) }),
      /* @__PURE__ */ l(Le, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ v("div", { className: "cv-field-pill-config", children: [
        u.canRename ? /* @__PURE__ */ v("label", { className: "cv-ec-field", htmlFor: m, children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
          /* @__PURE__ */ l(
            he,
            {
              id: m,
              defaultValue: u.label ?? "",
              placeholder: k,
              className: "cv-ec-h8",
              onBlur: (T) => x(T.target.value),
              onKeyDown: (T) => {
                T.key === "Enter" && (x(T.target.value), T.target.blur());
              }
            }
          )
        ] }) : null,
        S ? /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l(zg, { value: u.colorToken, onChange: u.onRecolor })
        ] }) : null,
        u.isTimeField ? /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              Tt,
              {
                kind: "dateRange",
                value: u.dateRange,
                onChange: u.onDateRange,
                renderFixed: (T, A) => /* @__PURE__ */ l(Na, { value: T, onChange: A })
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              Tt,
              {
                kind: "granularity",
                value: u.granularity,
                onChange: u.onGranularity,
                renderFixed: (T, A) => /* @__PURE__ */ l(Ms, { value: T, onChange: A, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          u.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: g, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                Fr,
                {
                  id: g,
                  checked: u.comparePrevious,
                  onChange: u.onComparePrevious,
                  "aria-label": "Compare to previous period"
                }
              )
            ] }),
            u.comparePrevious && !u.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
          ] }) : null
        ] }) : null,
        u.isCategoryField ? /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: d, children: [
            /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Sort" }),
            /* @__PURE__ */ l(
              "select",
              {
                id: d,
                "aria-labelledby": h,
                value: u.sortValue,
                onChange: (T) => u.onSort(T.target.value),
                className: "cv-field-pill-select",
                children: u.sortOptions.map((T) => /* @__PURE__ */ l("option", { value: T.key, children: T.label }, T.key))
              }
            )
          ] }),
          /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: p, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
            /* @__PURE__ */ l(
              he,
              {
                id: p,
                type: "number",
                min: 1,
                defaultValue: u.limit ?? "",
                placeholder: "All",
                className: "cv-ec-h8",
                onBlur: (T) => {
                  const A = T.target.value.trim();
                  u.onLimit(A === "" ? void 0 : Number(A));
                },
                onKeyDown: (T) => {
                  if (T.key === "Enter") {
                    const A = T.target.value.trim();
                    u.onLimit(A === "" ? void 0 : Number(A)), T.target.blur();
                  }
                }
              }
            )
          ] })
        ] }) : null,
        u.canLineStyle ? /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: Wg.map(([T, A]) => /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                onClick: () => u.onCurve(T),
                className: R(
                  "cv-line-shape-option",
                  (u.curve ?? "monotone") === T && "cv-line-shape-option--active"
                ),
                children: [
                  A,
                  (u.curve ?? "monotone") === T ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              T
            )) })
          ] }),
          /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: y, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(Fr, { id: y, checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ v("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ v(
            Y,
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
            Y,
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
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: u.onRemove,
            children: [
              /* @__PURE__ */ l(Oa, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: w, children: C }),
    /* @__PURE__ */ l(
      Y,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: u.onRemove,
        "aria-label": `Remove ${w}`,
        children: /* @__PURE__ */ l(Oa, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function Bg({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: a,
  optionFor: i,
  colorFor: o,
  scope: s,
  blockReason: c,
  onAdd: u,
  badge: m,
  orientation: d,
  lockedSingle: h,
  disableReorder: p,
  label: g,
  note: y,
  pickerSide: k,
  pickerAlign: w,
  control: S
}) {
  const N = n.cardinality === "many" && !h, x = N || r.length === 0, C = r.length, T = d === "vertical", A = g ?? n.label, W = ["number", "category", "time"].filter((O) => !ke(n, O)).map((O) => va(n, O, r)).find((O) => O !== void 0) ?? n.hint, B = a.length === 0 && !n.optional && ke(n, "number") ? "Add a measure to start" : void 0, F = /* @__PURE__ */ l(
    ps,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: k ?? (T ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          title: W,
          className: R(
            "cv-well-add",
            T && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Ct, { className: "cv-ec-icon" }),
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
      className: R("cv-well-group", !T && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: A }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        S ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: S }) : null,
        /* @__PURE__ */ v("div", { className: R("cv-well-fields", T ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((O, _) => /* @__PURE__ */ l(
            Hg,
            {
              spec: e,
              update: t,
              well: n,
              member: O,
              option: i(O),
              resolvedColor: o(O),
              className: T ? "cv-field-pill--full" : void 0,
              reorder: N && C > 1 && !p ? {
                canUp: _ > 0,
                canDown: _ < C - 1,
                onUp: () => t(ki(e, n, _, _ - 1)),
                onDown: () => t(ki(e, n, _, _ + 1))
              } : void 0
            },
            O
          )),
          x ? F : null
        ] }),
        B ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: B }) : null,
        y ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: y }) : null
      ]
    }
  );
}
function cr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(
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
    /* @__PURE__ */ l(Le, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function Ca(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function qg({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ca(e, t), a = as(e), i = (u = e.query.timeDimensions) == null ? void 0 : u[0], o = n.display ?? "number", s = n.gauge, c = (m) => {
    const d = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!d) return;
    const h = { ...d };
    for (const p of Object.keys(m)) {
      const g = m[p];
      g === void 0 ? delete h[p] : h[p] = g;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Qt, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      ms,
      {
        id: m,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (d) => c({ dimension: d }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Qt, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      Tt,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (d) => c({ dateRange: d }),
        renderFixed: (d, h) => /* @__PURE__ */ l(Na, { value: d, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(de, { label: "Display", children: /* @__PURE__ */ l(
      tn,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: o,
        onChange: (m) => r({ display: m })
      }
    ) }),
    o === "gauge" ? /* @__PURE__ */ l(Qt, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      he,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const h = parseFloat(d.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Ug({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ca(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Show comparison",
        checked: i,
        onChange: (m) => r({
          comparison: m ? o.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    i ? /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ l(de, { label: "Against", children: /* @__PURE__ */ l(
        tn,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (a == null ? void 0 : a.mode) ?? "previousPeriod",
          onChange: (m) => r({ comparison: { ...a, mode: m } })
        }
      ) }),
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Qt, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        he,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const h = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(h) ? h : void 0 } });
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
        ve,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ l(
        ve,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: c !== "down",
          onChange: (m) => r({ goodDirection: m ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Kg({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Ca(e, t), a = n.sparkline, i = a !== void 0, o = n.comparison !== void 0, s = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Show sparkline",
        checked: i,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    i ? /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ l(Qt, { label: "Trend granularity", children: ({ id: u, labelId: m }) => /* @__PURE__ */ l(
        Tt,
        {
          labelId: m,
          kind: "granularity",
          value: c,
          onChange: (d) => r({ sparkline: { ...a, granularity: d } }),
          renderFixed: (d, h) => /* @__PURE__ */ l(Ms, { id: u, value: d, onChange: h, className: "cv-ec-h8 cv-ec-full" })
        }
      ) }),
      o ? null : /* @__PURE__ */ l(
        ve,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: s !== "down",
          onChange: (u) => r({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Qt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function Gg({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var ae, $, j, I;
  const { meta: a } = je(), { locale: i } = Fe(), o = at(), { chart: s } = e, c = s.family, u = o.require(c), m = u.queryless ?? !1, d = u.enforcesAxisUnit, h = as(e), p = b.useMemo(() => Kn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), g = b.useCallback(
    (M) => M && (i == null ? void 0 : i.unitSystem) === "imperial" && p[M] ? p[M].imperialUnit : M,
    [i == null ? void 0 : i.unitSystem, p]
  ), y = b.useMemo(() => vp(c, o), [c, o]), k = b.useMemo(() => cs(e, o), [e, o]), w = b.useMemo(() => new Map(y.map((M) => [M.id, M])), [y]), [S, N] = b.useState(void 0), x = b.useMemo(
    () => Eg(a, e, S, o),
    [a, e, S, o]
  ), C = b.useMemo(() => Object.values(k).flat(), [k]), T = b.useCallback(
    (M) => {
      N(M), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), A = b.useMemo(
    () => {
      var M;
      return x.viewLocked ? [x.viewLocked] : [(M = x.sourceCube) == null ? void 0 : M.name, ...x.relatedCubes.map((P) => P.name)].filter(
        Boolean
      );
    },
    [x]
  ), W = b.useMemo(
    () => Object.values(k).every((M) => M.length === 0),
    [k]
  ), B = b.useMemo(() => {
    const M = (k.y ?? [])[0], P = M ? ze(a, M) : void 0;
    return {
      leftKey: M ? ss(P) : void 0,
      leftLabel: M ? Yg(P, g(P == null ? void 0 : P.unit)) : void 0
    };
  }, [k, a, g]), F = b.useCallback(
    (M, P) => {
      var K;
      if (P) {
        if (!Dg(x, P.cube))
          return "Clear the current fields to use a different dataset.";
        if (P.memberType === "measure" && x.measureSource && P.cube !== x.measureSource)
          return `Measures come from one table (${((K = x.sourceCube) == null ? void 0 : K.title) ?? x.measureSource}). Remove them to switch.`;
        if (d && M === "y" && P.memberType === "measure") {
          const { leftKey: E, leftLabel: L } = B;
          return Cp(P, E, L);
        }
      }
    },
    [x, B, d]
  ), O = B.leftLabel, _ = b.useMemo(() => {
    var P;
    const M = {};
    if (c === "bar" || c === "line" || c === "area") {
      const K = (P = s.mapping) == null ? void 0 : P.series;
      if (K && K.mode === "measures") {
        const E = K.members.map((U) => {
          var te, ce;
          return { key: U, colorToken: (ce = (te = K.meta) == null ? void 0 : te[U]) == null ? void 0 : ce.colorToken };
        }), L = xo(E, s.colors);
        K.members.forEach((U, te) => {
          M[U] = L[te];
        });
      }
    }
    return M;
  }, [c, s.mapping, s.colors]), D = b.useCallback(
    (M, P, K) => {
      const E = ze(a, P);
      if (F(M, E)) return;
      let L = K === "geoPoint" && (E != null && E.latMember) && E.lngMember ? Vt(
        Vt(e, c, "lat", E.latMember, "numberDimension", o),
        c,
        "lng",
        E.lngMember,
        "numberDimension",
        o
      ) : Vt(e, c, M, P, K, o);
      const U = u.canonicalTimeWell;
      if (U && M !== U && (k[U] ?? []).length === 0) {
        const te = Xh(a, E == null ? void 0 : E.cube);
        te && te.name !== P && !F(U, te) && (L = Vt(L, c, U, te.name, "time", o));
      }
      t(L);
    },
    [F, a, t, e, c, o, u, k]
  ), Q = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, z = Q.left.map((M) => w.get(M)).filter(Boolean), H = Q.bottom.map((M) => w.get(M)).filter(Boolean), q = (ae = k.color) == null ? void 0 : ae[0], re = (($ = k.y) == null ? void 0 : $.length) ?? 0, ie = q && re > 1 ? `${re} measures × ${((j = ze(a, q)) == null ? void 0 : j.label) ?? "this split"} — one series per measure per value.` : void 0, me = u.hasLegend, fe = (k.y ?? [])[0], V = (M) => {
    var E, L, U, te;
    if (!M) return;
    const P = (E = s.mapping) == null ? void 0 : E.series;
    return (P && P.mode === "measures" ? (U = (L = P.meta) == null ? void 0 : L[M]) == null ? void 0 : U.label : void 0) ?? ((te = ze(a, M)) == null ? void 0 : te.label);
  }, G = (M) => {
    var K, E, L, U;
    const P = (te, ce) => ce ? /* @__PURE__ */ l(Qp, { spec: e, update: t, axis: te, title: "Title", auto: V(ce) }) : null;
    switch (M) {
      case "y":
        return P("y", fe);
      // the single value axis
      case "x":
        return P("x", (E = (K = s.mapping) == null ? void 0 : K.category) == null ? void 0 : E.member);
      case "sy":
        return P("y", (L = k.sy) == null ? void 0 : L[0]);
      // scatter Y axis
      case "sx":
        return P("x", (U = k.sx) == null ? void 0 : U[0]);
      // scatter X axis
      default:
        return null;
    }
  }, J = (M, P) => /* @__PURE__ */ l(
    Bg,
    {
      spec: e,
      update: t,
      well: M,
      placed: k[M.id] ?? [],
      allPlaced: C,
      optionFor: (K) => ze(a, K),
      colorFor: (K) => _[K],
      scope: x,
      blockReason: (K) => F(M.id, K),
      onAdd: (K, E) => D(M.id, K, E),
      badge: M.id === "y" ? O : void 0,
      orientation: P,
      note: M.id === "color" ? ie : void 0,
      control: G(M.id)
    },
    M.id
  ), oe = () => {
    const M = w.get("value"), P = (k.value ?? []).length > 0, K = s.familyOptions ?? {};
    return /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ v("div", { className: "cv-edit-kpi-value", children: [
        M ? J(M, "vertical") : null,
        P ? /* @__PURE__ */ l(
          cr,
          {
            label: "Time, range & display",
            summary: K.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(qg, { spec: e, update: t })
          }
        ) : null
      ] }),
      P ? /* @__PURE__ */ v(ue, { children: [
        /* @__PURE__ */ l(cr, { label: "Comparison", summary: K.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Ug, { spec: e, update: t }) }),
        /* @__PURE__ */ l(cr, { label: "Sparkline", summary: K.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Kg, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !W || m ? /* @__PURE__ */ l(vg, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          Yp,
          {
            currentName: x.viewLocked ?? ((I = x.sourceCube) == null ? void 0 : I.name),
            hasFields: C.length > 0,
            onSelect: T
          }
        ),
        /* @__PURE__ */ l(Kp, { spec: e, update: t, cube: h, scopeCubes: A, scope: x })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-body", children: [
      z.length > 0 ? /* @__PURE__ */ l("div", { className: R("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? oe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        z.map((M) => J(M, "vertical"))
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ v("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(gg, { spec: e, update: t, empty: W && !m })
        ] }),
        H.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-edit-overlay-bottom", children: [
          H.map((M) => J(M, "horizontal")),
          me && !W ? /* @__PURE__ */ l(Jp, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Yg(e, t) {
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
function ur(e) {
  const t = eo.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Qg({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = b.useState(() => ({
    spec: e,
    issues: ur(e)
  })), [i, o] = b.useState(e);
  b.useEffect(() => {
    a({ spec: e, issues: ur(e) }), o(e);
  }, [e]);
  const s = Ts((h) => t(h), n), c = r.spec, u = r.issues, m = u.length === 0, d = b.useCallback(
    (h) => {
      const p = ur(h);
      a({ spec: h, issues: p }), p.length === 0 && (o(h), s(h));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: d };
}
const Jg = () => {
};
function Xg({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = at(), { draft: s, issues: c, valid: u, committed: m, update: d } = Qg({
    spec: e,
    onChange: t ?? Jg,
    debounceMs: r
  }), h = o.get(s.chart.family), p = (h == null ? void 0 : h.queryless) ?? !1, g = m, y = (A) => {
    var W, B, F;
    return (((W = A == null ? void 0 : A.measures) == null ? void 0 : W.length) ?? 0) > 0 || (((B = A == null ? void 0 : A.dimensions) == null ? void 0 : B.length) ?? 0) > 0 || (((F = A == null ? void 0 : A.timeDimensions) == null ? void 0 : F.some((O) => typeof O.granularity == "string")) ?? !1);
  }, k = (A) => {
    var W;
    return (((W = A == null ? void 0 : A.measures) == null ? void 0 : W.length) ?? 0) > 0;
  }, w = (h == null ? void 0 : h.requiresMeasure) ?? s.chart.family !== "table", S = p || y(s.query) && y(g.query) && (!w || k(s.query) && k(g.query)), N = w && !k(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", x = b.useCallback(
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
  ), C = S ? /* @__PURE__ */ l(
    fa,
    {
      query: g.query ?? {},
      chart: g.chart,
      editing: !0,
      updateFamilyOptions: x
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: N }) }), T = n ? /* @__PURE__ */ v(Y, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(Hi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: R("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ v($n, { variant: "destructive", children: [
          /* @__PURE__ */ l(Wr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(zn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Vn, { children: /* @__PURE__ */ v("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((A, W) => /* @__PURE__ */ v("li", { children: [
              A.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: A.path }) : null,
              " ",
              A.message
            ] }, W)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Gg, { spec: s, update: d, toolbar: T, children: C }) })
      ]
    }
  );
}
function Zg({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: a,
  onRedo: i,
  canUndo: o,
  canRedo: s,
  onDiscard: c,
  discardDisabled: u,
  onSave: m,
  saveDisabled: d,
  className: h
}) {
  const p = a || i, [g, y] = b.useState(!1);
  b.useEffect(() => {
    if (!g) return;
    const w = setTimeout(() => y(!1), 1600);
    return () => clearTimeout(w);
  }, [g]), b.useEffect(() => {
    d || y(!1);
  }, [d]);
  const k = () => {
    m == null || m(), y(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: R("cv-editor-toolbar", h),
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
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Ei, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Br, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(hl, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(pl, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-actions", children: [
          p ? /* @__PURE__ */ v(ue, { children: [
            /* @__PURE__ */ l(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(gl, {})
              }
            ),
            /* @__PURE__ */ l(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(vl, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ v(
            Y,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(bl, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(
            Y,
            {
              size: "sm",
              onClick: k,
              disabled: d,
              "aria-live": "polite",
              className: R(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                g && "cv-editor-toolbar-save--saved"
              ),
              children: [
                g ? /* @__PURE__ */ l(nt, {}) : /* @__PURE__ */ l(Hi, {}),
                " ",
                g ? "Saved" : "Save"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
const Rs = "lg", _s = 12;
function ev(e, t) {
  const n = t[Rs];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function tv(e, t) {
  const n = new Map(e.map((o) => [o.i, o])), r = new Map(t.map((o) => [o.i, o])), a = [], i = (o, s) => {
    const c = {
      i: o.i,
      x: o.x,
      y: o.y,
      w: o.w,
      h: o.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (c.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (c.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (c.static = s.static), a.push(c);
  };
  for (const o of e) {
    const s = r.get(o.i);
    s && i(s, o);
  }
  for (const o of t)
    n.has(o.i) || i(o, void 0);
  return a;
}
const nv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function rv(e, t, n, r = _s) {
  const a = nv[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function Os(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? _s) {
  const a = rv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function av(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Os(e, a);
}
function iv(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function ov(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const sv = 12, lv = 900, cv = 0.4;
function uv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function mv({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = Lo(), u = e.grid ?? {}, m = u.cols ?? sv, d = u.rowHeight ?? 40, h = u.margin ?? [12, 12], p = u.containerPadding ?? [0, 0], g = Math.max(cv, Math.min(1, c / lv)), y = Math.round(g / 0.05) * 0.05, k = Math.max(8, Math.round(d * y)), w = [
    Math.round(h[0] * y),
    Math.round(h[1] * y)
  ], S = [
    Math.round(p[0] * y),
    Math.round(p[1] * y)
  ], N = b.useMemo(
    () => ({ [Rs]: uv(e.layout) }),
    [e.layout]
  ), x = b.useMemo(
    () => new Map(e.widgets.map((B) => [B.id, B])),
    [e.widgets]
  ), C = b.useRef(o);
  b.useEffect(() => {
    C.current = o;
  }, [o]);
  const T = b.useRef(e.layout);
  b.useEffect(() => {
    T.current = e.layout;
  }, [e.layout]);
  const A = b.useRef(null), W = b.useCallback(
    (B, F) => {
      const _ = ev(B, F).map((D) => ({ ...D }));
      dv(T.current, _) || C.current(_);
    },
    []
  );
  return /* @__PURE__ */ l(da, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    qi,
    {
      width: c,
      layouts: N,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: k,
      margin: w,
      containerPadding: S,
      dragConfig: { enabled: !0, handle: `.${_n}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: W,
      children: e.layout.map((B) => {
        const F = x.get(B.i);
        if (!F) return null;
        const O = F.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${F.title ?? F.type}`,
              "aria-pressed": O,
              onPointerDown: (_) => {
                A.current = { x: _.clientX, y: _.clientY };
              },
              onClick: (_) => {
                const D = A.current;
                D && Math.hypot(_.clientX - D.x, _.clientY - D.y) > 5 || n(F.id);
              },
              onKeyDown: (_) => {
                (_.key === "Enter" || _.key === " ") && (_.preventDefault(), n(F.id));
              },
              className: R(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                O && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(Ar, { widget: F, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: R(_n, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ v("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${F.title ?? F.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), r(F.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(yl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${F.title ?? F.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), a(F.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(kl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${F.title ?? F.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), i(F.id);
                      },
                      className: R("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Rt, {})
                    }
                  )
                ] })
              ]
            },
            B.i
          )
        );
      })
    }
  ) : null }) });
}
function dv(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const fv = b.memo(mv);
function hv(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function pv({
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
  const a = Ui({
    extensions: [Gi],
    editable: !0,
    content: hv(e.doc),
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
    /* @__PURE__ */ l(gv, { editor: a }),
    /* @__PURE__ */ l(Ki, { editor: a })
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
function gv({ editor: e }) {
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
            children: /* @__PURE__ */ l(wl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Nl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Cl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(Sl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(xl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Ml, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Tl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(Rl, {})
          }
        )
      ]
    }
  );
}
const vv = Ur(
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
function bv({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: R(vv({ variant: t }), e), ...n });
}
function yv({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = je(), c = b.useMemo(() => Xn(o), [o]), u = c.filter((h) => h.type === "cube"), m = c.filter((h) => h.type === "view"), d = c.find((h) => h.name === e);
  return /* @__PURE__ */ v(Te, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(_e, { id: a, className: i, children: /* @__PURE__ */ l(Re, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(mr, { option: d }) : void 0 }) }),
    /* @__PURE__ */ v(Oe, { children: [
      m.length > 0 ? /* @__PURE__ */ v(Rr, { children: [
        /* @__PURE__ */ l(_r, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ l(be, { value: h.name, children: /* @__PURE__ */ l(mr, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(Rr, { children: [
        /* @__PURE__ */ l(_r, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ l(be, { value: h.name, children: /* @__PURE__ */ l(mr, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function mr({ option: e }) {
  const t = e.type === "view" ? qr : Vi;
  return /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(bv, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const kv = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function wv(e) {
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
function Nv({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(wv(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Te,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Re, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Oe, { children: t.map((s) => /* @__PURE__ */ l(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Control", children: /* @__PURE__ */ v(Te, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Re, {}) }),
      /* @__PURE__ */ l(Oe, { children: Gl.options.map((s) => /* @__PURE__ */ l(be, { value: s, children: kv[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Cv, { control: r, onChange: a, variables: t })
  ] });
}
function Cv({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Sv, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Mv, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Tv, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Rv, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(_v, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Ov, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Sv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          xv,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      ve,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function xv({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(pn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === pn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(tt, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Le, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: pn.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ v(
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
                className: R("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(nt, { className: "cv-ed-icon-xs" }) : null
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
function Mv({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = Je.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Te,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Re, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Oe, { children: [
                /* @__PURE__ */ l(be, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Je.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: R("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Tv({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ l(
      ve,
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
        action: /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Ct, {}),
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
            Y,
            {
              variant: "ghost",
              size: "icon",
              className: R("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(Rt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Rv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ l(de, { label: "From", children: /* @__PURE__ */ v(
      Te,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Re, {}) }),
          /* @__PURE__ */ v(Oe, { children: [
            /* @__PURE__ */ l(be, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(be, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(be, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
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
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          yv,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function _v({
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
function Ov({
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
  return /* @__PURE__ */ v(ue, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function Av(e) {
  return { schemaVersion: kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Dv(e) {
  const t = {
    schemaVersion: kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Lv(e, t) {
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
      /* @__PURE__ */ l(da, { spec: Av(t), children: /* @__PURE__ */ l(Fp, { createVariable: o, children: /* @__PURE__ */ l("div", { className: R(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Xg,
        {
          fill: a,
          spec: Dv(e),
          onChange: (s) => n(Lv(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(pv, { widget: e, onChange: n }) : /* @__PURE__ */ l(Nv, { widget: e, variables: t, onChange: n })
  ] });
}
function Ev({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ v(ue, { children: [
    r ? /* @__PURE__ */ l(
      an,
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
function Iv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: a = !0,
  open: i,
  onOpenChange: o,
  className: s,
  children: c
}) {
  const u = i !== void 0, [m, d] = b.useState(a), h = r ? u ? i : m : !0, p = b.useId(), g = b.useCallback(() => {
    const y = !h;
    u || d(y), o == null || o(y);
  }, [h, u, o]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: R("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          Ev,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: h,
            onToggle: g,
            regionId: p
          }
        ),
        h ? /* @__PURE__ */ l("div", { id: p, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function Fv(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Pv(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function $v(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function zv(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Vv(e, t) {
  switch (e) {
    case "chart":
      return Pv(t);
    case "text":
      return $v(t);
    case "input":
      return zv(t);
  }
}
function jv(e) {
  return { name: e, type: "string" };
}
function Wv(e) {
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
function Hv({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = b.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, i = (u, m) => {
    t(e.map((d, h) => h === u ? Bv(d, m) : d));
  }, o = (u) => t(e.filter((m, d) => d !== u)), s = () => t([...e, jv(a())]), c = (u, m) => {
    const d = u + m;
    if (d < 0 || d >= e.length) return;
    const h = e.slice();
    [h[u], h[d]] = [h[d], h[u]], t(h);
  };
  return /* @__PURE__ */ l(
    Iv,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(Ct, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(Ct, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        qv,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((d, h) => h !== m && d.name === u.name && u.name !== ""),
          onChange: (d) => i(m, d),
          onRemove: () => o(m),
          onMove: (d) => c(m, d)
        },
        m
      )) })
    }
  );
}
function Bv(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Wv(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function qv({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, c] = b.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, m = b.useId();
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
              onClick: () => c((d) => !d),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(tt, {}) : /* @__PURE__ */ l(an, {})
            }
          ),
          /* @__PURE__ */ l(
            he,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Ni[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              Y,
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
              Y,
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
              Y,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Rt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(de, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ v(Te, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Re, {}) }),
            /* @__PURE__ */ l(Oe, { children: Xi.options.map((d) => /* @__PURE__ */ l(be, { value: d, children: Ni[d] }, d)) })
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
            ve,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ l(Uv, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Uv({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      ve,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : Kv(e.default);
  return /* @__PURE__ */ l(de, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    he,
    {
      id: n,
      value: a,
      placeholder: Gv(e.type),
      onChange: (i) => {
        const o = i.target.value;
        if (o === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const s = o.split(",").map((c) => c.trim()).filter(Boolean);
          t(s);
          return;
        }
        t(o);
      }
    }
  ) });
}
function Kv(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Gv(e) {
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
function Fb({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: r,
  onSave: a,
  newId: i,
  debounceMs: o = 300,
  onUndo: s,
  onRedo: c,
  canUndo: u,
  canRedo: m,
  onDiscard: d,
  families: h,
  className: p
}) {
  var P, K;
  const [g, y] = b.useState(e), [k, w] = b.useState(e);
  b.useEffect(() => {
    y(e), w(e);
  }, [e]);
  const [S, N] = b.useState(null), x = b.useRef(0), [C, T] = b.useState(null), A = b.useRef(S), W = b.useRef(C), B = b.useRef(g);
  b.useEffect(() => {
    A.current = S, W.current = C, B.current = g;
  });
  const F = b.useRef(null);
  F.current === null && (F.current = i ?? Fv());
  const O = i ?? F.current, _ = Ts(
    (E) => r == null ? void 0 : r(E),
    o
  ), D = b.useCallback(
    (E) => {
      x.current = Date.now(), y((L) => {
        const U = E(L);
        return _(U), U;
      });
    },
    [_]
  ), Q = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === Q.current) return;
    const E = 500;
    let L = null;
    const U = () => {
      var Dt;
      const te = Date.now() - x.current;
      if (te < E) {
        L = setTimeout(U, E - te);
        return;
      }
      Q.current = t;
      const ce = /* @__PURE__ */ new Set();
      ((Dt = W.current) == null ? void 0 : Dt.kind) === "widget" && ce.add(W.current.id), A.current && ce.add(A.current);
      const We = Jv(t, B.current, ce);
      y(We), n == null || n(We);
    };
    return U(), () => {
      L && clearTimeout(L);
    };
  }, [t]);
  const z = b.useCallback(
    (E) => {
      const L = Vv(E, O());
      D((U) => Os(U, L)), N(L.id), T({ kind: "widget", id: L.id });
    },
    [D, O]
  ), H = b.useCallback((E) => N(E), []), q = b.useCallback((E) => {
    N(E), T({ kind: "widget", id: E });
  }, []), re = b.useCallback(
    (E) => {
      D((L) => iv(L, E)), N((L) => L === E ? null : L), T((L) => (L == null ? void 0 : L.kind) === "widget" && L.id === E ? null : L);
    },
    [D]
  ), ie = b.useCallback(
    (E) => {
      const L = O();
      D((U) => av(U, E, L)), N(L);
    },
    [D, O]
  ), me = b.useCallback(
    (E) => D((L) => ov(L, E)),
    [D]
  ), fe = b.useCallback(
    (E) => D((L) => {
      const U = tv(L.layout, E);
      return Qv(L.layout, U) ? L : { ...L, layout: U };
    }),
    [D]
  ), V = b.useCallback(
    (E) => D((L) => ({ ...L, name: E || void 0 })),
    [D]
  ), G = b.useCallback(
    (E) => D((L) => ({ ...L, variables: E })),
    [D]
  ), J = b.useDeferredValue(g), oe = b.useMemo(
    () => br.safeParse(J),
    [J]
  ), ae = b.useCallback(() => {
    const E = br.safeParse(g);
    E.success && (a == null || a(E.data), w(g));
  }, [g, a]), $ = g !== k, j = (C == null ? void 0 : C.kind) === "widget" ? g.widgets.find((E) => E.id === C.id) ?? null : null;
  b.useEffect(() => {
    (C == null ? void 0 : C.kind) === "widget" && !g.widgets.some((E) => E.id === C.id) && T(null);
  }, [C, g.widgets]);
  const I = b.useCallback(() => T(null), []), M = (C == null ? void 0 : C.kind) === "variables" ? "Dashboard variables" : j ? j.title ?? `${Yv(j.type)} widget` : "";
  return /* @__PURE__ */ l(ma, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((K = (P = g.grid) == null ? void 0 : P.margin) == null ? void 0 : K[0]) ?? 12 },
      className: R("cv-dashboard-editor", p),
      children: [
        /* @__PURE__ */ l(
          Zg,
          {
            name: g.name ?? "",
            onNameChange: V,
            onAdd: z,
            onEditVariables: () => T({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: d,
            discardDisabled: !$,
            onSave: a ? ae : void 0,
            saveDisabled: !oe.success || !$,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        oe.success ? null : /* @__PURE__ */ v("p", { className: "cv-dashboard-editor-validation", children: [
          oe.error.issues.length,
          " validation issue",
          oe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: C ? null : /* @__PURE__ */ l(
          fv,
          {
            spec: g,
            selectedId: S,
            onSelect: H,
            onEdit: q,
            onDuplicate: ie,
            onDelete: re,
            onLayoutChange: fe
          }
        ) }),
        C ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": M,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ v("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ v("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: I, children: [
                    /* @__PURE__ */ l(Hr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: M })
                ] }),
                j ? /* @__PURE__ */ v(
                  Y,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => re(j.id),
                    children: [
                      /* @__PURE__ */ l(Rt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: C.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(Hv, { variables: g.variables, onChange: G }) }) : (j == null ? void 0 : j.type) === "chart" ? /* @__PURE__ */ l(
                wi,
                {
                  fill: !0,
                  widget: j,
                  variables: g.variables,
                  onChange: me,
                  onVariablesChange: G
                }
              ) : j ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                wi,
                {
                  widget: j,
                  variables: g.variables,
                  onChange: me,
                  onVariablesChange: G
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Yv(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Qv(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Jv(e, t, n) {
  const r = new Map(t.widgets.map((u) => [u.id, u])), a = new Set(e.widgets.map((u) => u.id)), i = e.widgets.map(
    (u) => n.has(u.id) && r.has(u.id) ? r.get(u.id) : u
  );
  for (const u of t.widgets)
    !a.has(u.id) && n.has(u.id) && i.push(u);
  const o = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), c = e.layout.map(
    (u) => n.has(u.i) && o.has(u.i) ? o.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && c.push(u);
  return { ...e, widgets: i, layout: c };
}
export {
  Xc as AreaChartFamily,
  Lc as AreaFamilyOptionsSchema,
  Hl as AxesOptionsSchema,
  La as AxisOptionsSchema,
  xb as BUILTIN_CHART_FAMILIES,
  Be as BUILTIN_DEFAULTS,
  He as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Qc as BarChartFamily,
  Ac as BarFamilyOptionsSchema,
  Rs as CANONICAL_BREAKPOINT,
  Xe as ChartColorTokenSchema,
  Gg as ChartEditOverlay,
  Xg as ChartEditor,
  $l as ChartFamilySchema,
  Zr as ChartInteractionProvider,
  Ji as ChartOptionsSchema,
  So as ChartRenderer,
  eo as ChartSpecSchema,
  Ul as ChartTransformSchema,
  Ib as ChartView,
  Ql as ChartWidgetSchema,
  Bl as ColorAssignmentSchema,
  $c as CondFormatRuleSchema,
  fa as CubeChart,
  gf as CubeChartSpec,
  Qi as CubeQuerySchema,
  Gn as CubeVizContext,
  Db as CubeVizProvider,
  Bn as DEFAULT_COLOR_RAMP,
  _s as DEFAULT_COLS,
  dn as DEFAULT_TRANSFORM_WINDOW,
  Tr as DEFAULT_UNIT_CONVERSIONS,
  _n as DRAG_HANDLE_CLASS,
  Eb as Dashboard,
  Fb as DashboardEditor,
  da as DashboardProvider,
  br as DashboardSpecSchema,
  gr as DateRangeSchema,
  jc as EMPTY_FAMILY_DEFAULT,
  Fa as EM_DASH,
  fv as EditorCanvas,
  Zg as EditorToolbar,
  ma as FamilyRegistryOverride,
  Vp as FilterBuilder,
  El as FilterOperatorSchema,
  zl as FormatKindSchema,
  Kr as FormatOptionsSchema,
  yc as GRANULARITY_PATTERN,
  Je as GranularitySchema,
  tc as GridConfigSchema,
  su as HeatmapChartFamily,
  Vc as HeatmapFamilyOptionsSchema,
  Gl as InputControlKindSchema,
  Yl as InputControlSchema,
  Nv as InputWidgetEditor,
  Xl as InputWidgetSchema,
  $f as InputWidgetView,
  uu as KpiFamily,
  Fc as KpiFamilyOptionsSchema,
  ec as LayoutItemSchema,
  Il as LeafFilterSchema,
  jl as LegendOptionsSchema,
  Jc as LineChartFamily,
  Dc as LineFamilyOptionsSchema,
  se as MemberSchema,
  Aa as OrderDirSchema,
  Pl as OrderSpecSchema,
  Zc as PieChartFamily,
  Ec as PieFamilyOptionsSchema,
  vr as QueryFilterSchema,
  jn as ReferenceLineOptSchema,
  Ar as RenderWidget,
  kt as SCHEMA_VERSION,
  Ll as ScalarSchema,
  tu as ScatterChartFamily,
  Ic as ScatterFamilyOptionsSchema,
  Vl as SeriesMappingSchema,
  Da as SeriesMetaSchema,
  to as SpecSchema,
  Pc as TableColumnOptSchema,
  Cu as TableFamily,
  zc as TableFamilyOptionsSchema,
  pv as TextWidgetEditor,
  Jl as TextWidgetSchema,
  bf as TextWidgetView,
  Fl as TimeDimensionSchema,
  Kl as TipTapDocSchema,
  Wl as TooltipOptionsSchema,
  ql as TransformKindSchema,
  Sn as VarRefSchema,
  nc as VariableDeclSchema,
  Xi as VariableTypeSchema,
  Yi as VariableValueSchema,
  Hv as VariablesPanel,
  Vo as WidgetChrome,
  wi as WidgetEditPanel,
  Zl as WidgetSpecSchema,
  op as adaptiveGranularity,
  Os as appendWidget,
  ju as areaChartFamily,
  Ua as assignColors,
  Zd as axisKey,
  zu as barChartFamily,
  ca as buildFamilyRegistry,
  Ab as builtinCharts,
  Ve as builtinFamilyDescriptors,
  Hn as builtinFamilyRegistry,
  pc as createCubeClient,
  Fv as createIdFactory,
  Ro as createQueryResolver,
  Oo as createUnitsFormatter,
  ym as createVariableStore,
  wc as datePattern,
  yr as deepMerge,
  la as defaultChartFamilies,
  Wv as defaultForType,
  Qr as defaultFormatter,
  gc as fetchMeta,
  _b as formatCategory,
  Ut as formatDateValue,
  Jh as geoPointId,
  Bu as heatmapChartFamily,
  xt as isEmptyValue,
  Me as isVarRef,
  qu as kpiChartFamily,
  Vu as lineChartFamily,
  hc as loadSpec,
  Yr as looksLikeIsoDate,
  Jr as makeChartFormat,
  Rb as makeDateFormatter,
  Ob as makeFormatter,
  tv as mergeLayout,
  Kn as mergeUnitConversions,
  Pv as newChartWidget,
  zv as newInputWidget,
  $v as newTextWidget,
  jv as newVariable,
  Vv as newWidget,
  Mo as normalize,
  ev as pickCanonicalLayout,
  Wu as pieChartFamily,
  rv as placeNewItem,
  tf as quantityLabel,
  iv as removeWidget,
  ov as replaceWidget,
  of as resolveChart,
  Gu as resolveOptions,
  Wc as resolveOptionsWith,
  To as resolveQuery,
  fm as resolveRelativeDateRange,
  xo as resolveSeriesColors,
  pm as resolveValue,
  Mb as safeLoadSpec,
  Hu as scatterChartFamily,
  Uu as tableChartFamily,
  no as toDate,
  am as toResultAnnotation,
  Qg as useChartEditorState,
  oo as useChartInteractions,
  Lo as useContainerWidth,
  je as useCubeMeta,
  Ao as useCubeQuery,
  Fe as useCubeVizContext,
  Do as useDashboard,
  Ts as useDebouncedCallback,
  at as useFamilyRegistry,
  Lb as useFormatter,
  or as useNormalizedSeries,
  sn as useOptionalDashboard,
  Tb as validateSpec
};
//# sourceMappingURL=index.js.map
