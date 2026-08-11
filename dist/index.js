var Ho = Object.defineProperty;
var Bo = (e, t, n) => t in e ? Ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ra = (e, t, n) => Bo(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as g, Fragment as ne } from "react/jsx-runtime";
import * as k from "react";
import { useMemo as X, createContext as Ja, useContext as wr, useState as ft, useCallback as je, useEffect as Gt, useRef as Je, createElement as Ko, useSyncExternalStore as Xa, useId as Uo, Component as Go } from "react";
import { ruleX as Za, text as pt, ruleY as ei, colorLegend as Cr, stack as ti, group as Yo, barX as Qo, barY as Jo, lineX as Xo, lineY as Cn, defineChart as Be, areaY as tr, dot as Zo, cell as es } from "@tanstack/charts";
import { crosshair as ni } from "@tanstack/charts/crosshair";
import { scaleBand as ts } from "@tanstack/charts/scales/band";
import { scaleLinear as ln } from "@tanstack/charts/scales/linear";
import { scalePoint as ns } from "@tanstack/charts/scales/point";
import { Chart as rs } from "@tanstack/charts/react/core";
import { motion as ri } from "@tanstack/charts/motion";
import { tooltip as Nr } from "@tanstack/charts/tooltip";
import { d3Curve as Wn } from "@tanstack/charts/d3/shape";
import { brushX as as } from "@tanstack/charts/interaction/brush";
import { controlledSignal as is } from "@tanstack/charts/interaction/signal";
import { scaleUtc as os, scaleLog as aa, scaleSqrt as ss } from "d3-scale";
import { curveNatural as ls, curveStepAfter as cs, curveMonotoneX as us } from "d3-shape";
import { format as ce, isValid as _t, parseISO as cn, subDays as pe, startOfWeek as un, endOfWeek as mn, startOfMonth as Xe, endOfMonth as Et, startOfQuarter as Ze, endOfQuarter as Pt, startOfYear as et, endOfYear as Ft, subWeeks as nr, subMonths as tt, subQuarters as nt, subYears as rt, differenceInCalendarDays as ms, parse as ai } from "date-fns";
import { z as d } from "zod";
import { clsx as ds } from "clsx";
import { Minus as ii, ArrowUp as Nn, ArrowDown as Sn, CalendarRange as oi, ChevronsUpDown as hs, AreaChart as fs, BarChart3 as si, Grid3X3 as ps, Table as gs, Gauge as vs, ScatterChart as bs, PieChart as ys, LineChart as ks, AlertCircle as Sr, ChevronLeft as xr, ChevronRight as Yt, ChevronDown as Ke, Check as Ue, ChevronUp as ws, CalendarIcon as li, MoreVertical as Cs, RefreshCw as Ns, Image as Ss, Sheet as xs, Type as Mr, MapPin as ci, Hash as rr, Calendar as ui, Search as Ms, Table2 as mi, Database as di, Layers as Rr, Variable as Rs, Plus as gt, Trash2 as wt, ListFilter as _s, Box as hi, EyeOff as fi, Eye as pi, X as ia, Save as gi, SlidersHorizontal as Ts, Braces as Os, Undo2 as As, Redo2 as Ds, RotateCcw as Ls, Pencil as Es, Copy as Ps, Bold as Fs, Italic as $s, Strikethrough as Is, Heading1 as zs, Heading2 as Vs, List as js, ListOrdered as Ws, Quote as qs } from "lucide-react";
import * as dn from "@radix-ui/react-popover";
import { cva as _r } from "class-variance-authority";
import * as ve from "@radix-ui/react-select";
import Hs from "@cubejs-client/core";
import { DayPicker as Bs, useDayPicker as Ks } from "react-day-picker";
import { pie as Us, radialArc as ar, radialText as qn, polar as vi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as bi } from "react-grid-layout";
import { useEditor as yi, EditorContent as ki } from "@tiptap/react";
import wi from "@tiptap/starter-kit";
const dt = 2, hn = d.object({ var: d.string().min(1) }).strict();
function ke(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const fn = (e) => d.union([e, hn]), Gs = d.union([d.string(), d.number(), d.boolean()]), qe = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), ir = d.union([d.tuple([d.string(), d.string()]), d.string()]), Ci = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), te = d.string().min(1), Ys = d.enum([
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
]), Qs = d.object({
  member: te,
  operator: Ys,
  values: d.array(d.union([Gs, hn])).optional()
}).strict(), or = d.lazy(
  () => d.union([
    Qs,
    d.object({ and: d.array(or) }).strict(),
    d.object({ or: d.array(or) }).strict()
  ])
), Js = d.object({
  dimension: te,
  granularity: fn(qe).optional(),
  dateRange: fn(ir).optional(),
  compareDateRange: d.array(ir).optional()
}).strict(), oa = d.enum(["asc", "desc"]), Xs = d.union([
  d.record(te, oa),
  d.array(d.tuple([te, oa]))
]), Ni = d.object({
  measures: d.array(te).optional(),
  dimensions: d.array(te).optional(),
  timeDimensions: d.array(Js).optional(),
  filters: d.array(or).optional(),
  segments: d.array(te).optional(),
  order: Xs.optional(),
  limit: fn(d.number()).optional(),
  offset: fn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Zs = d.string().min(1), sv = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], He = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), el = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), xn = d.object({
  kind: el.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: d.string().optional()
}).strict(), sa = d.object({
  label: d.string().optional(),
  colorToken: He.optional(),
  stackId: d.string().optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: xn.optional()
}).strict(), tl = d.object({
  category: d.object({ member: te }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(te),
      meta: d.record(te, sa).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: te,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(te).optional(),
      pivot: te,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: d.record(te, sa).optional()
    }).strict()
  ])
}).strict(), nl = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), rl = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), la = d.union([d.number(), d.literal("auto")]), ca = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([la, la]).optional(),
  tickFormat: xn.optional()
}).strict(), al = d.object({
  x: ca.optional(),
  y: ca.optional()
}).strict(), il = d.object({
  byKey: d.record(d.string(), He).optional(),
  ramp: d.array(He).optional()
}).strict(), tn = 7, ol = d.enum(["rollingAvg", "cumulative", "percentOfTotal"]), sl = d.object({
  kind: ol,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: d.number().int().min(2).max(90).optional()
}).strict(), Si = d.object({
  family: Zs,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: tl.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: nl.optional(),
  tooltip: rl.optional(),
  axes: al.optional(),
  colors: il.optional(),
  format: xn.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * does NOT bump {@link SCHEMA_VERSION} — every existing v2 spec stays valid.
   */
  transform: sl.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), ll = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), cl = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), ul = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(qe).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: Ci, label: d.string() }).strict()),
      multiple: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("memberSelect"),
      from: d.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: d.string().optional()
    }).strict(),
    d.object({ kind: d.literal("text"), placeholder: d.string().optional() }).strict(),
    d.object({
      kind: d.literal("number"),
      min: d.number().optional(),
      max: d.number().optional(),
      step: d.number().optional()
    }).strict(),
    d.object({ kind: d.literal("toggle") }).strict()
  ])
}).strict(), Tr = {
  id: d.string().min(1),
  title: d.string().optional()
}, ml = d.object({ ...Tr, type: d.literal("chart"), query: Ni.default({}), chart: Si }).strict(), dl = d.object({ ...Tr, type: d.literal("text"), doc: ll }).strict(), hl = d.object({ ...Tr, type: d.literal("input"), control: ul }).strict(), fl = d.discriminatedUnion("type", [
  ml,
  dl,
  hl
]), pl = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), gl = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), xi = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), vl = d.object({
  name: d.string().min(1),
  type: xi,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: Ci.optional()
}).strict(), Mi = {
  schemaVersion: d.literal(dt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, Ri = d.object({ ...Mi, kind: d.literal("chart"), query: Ni.default({}), chart: Si }).strict(), sr = d.object({
  ...Mi,
  kind: d.literal("dashboard"),
  variables: d.array(vl),
  widgets: d.array(fl),
  layout: d.array(pl),
  grid: gl.optional()
}).strict(), _i = d.discriminatedUnion("kind", [Ri, sr]);
function ge(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Or(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function bl(e) {
  if (!ge(e.axes)) return;
  const t = Or(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function yl(e) {
  if (!ge(e.mapping)) return;
  const t = e.mapping.series;
  if (!ge(t) || !ge(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!ge(a)) continue;
    const i = Or(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function kl(e) {
  if (!ge(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => ge(n) ? Or(n, "side") ?? {} : n
  ));
}
function wl(e) {
  const t = ge(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(ge) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = ge(e.mapping) ? e.mapping : void 0, a = r && ge(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = ge(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function ua(e) {
  ge(e) && (e.family === "combo" && wl(e), bl(e), yl(e), kl(e));
}
function Cl(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ua(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ge(n) && n.type === "chart" && ua(n.chart);
  return t;
}
const Nl = {
  1: Cl
};
function Sl(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > dt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${dt} — update the library`
    );
  for (; n < dt; ) {
    const r = Nl[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return _i.parse(t);
}
function lv(e) {
  try {
    return { ok: !0, spec: Sl(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function cv(e) {
  return _i.parse(e);
}
function xl(e) {
  return Hs(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Ml(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function M(...e) {
  return ds(e);
}
function Rl({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: M("cv-skeleton", e), ...t });
}
const _l = _r(
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
), Mn = k.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: M(_l({ variant: t }), e),
    ...n
  }
));
Mn.displayName = "Alert";
const Rn = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: M("cv-alert-title", e),
      ...t
    }
  )
);
Rn.displayName = "AlertTitle";
const _n = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: M("cv-alert-description", e),
      ...t
    }
  )
);
_n.displayName = "AlertDescription";
const Tl = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Ol = "MMM d, yyyy";
function Ti(e) {
  if (e instanceof Date) return _t(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return _t(r) ? r : null;
  }
  const t = cn(e);
  if (_t(t)) return t;
  const n = new Date(e);
  return _t(n) ? n : null;
}
function Ar(e) {
  return /^\d{4}-\d{2}/.test(e) ? _t(cn(e)) : !1;
}
function Al(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Tl[t] : Ol;
}
function $t(e, t, n) {
  const r = Ti(e);
  return r ? ce(r, Al(t, n)) : String(e);
}
function uv(e, t) {
  return (n) => n == null ? "" : $t(n, e, t);
}
function mv(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? $t(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? $t(e, t.format, t.granularity) : String(e) : Ar(e) ? $t(e, t.format, t.granularity) : e;
}
const ma = "—", Dl = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function da(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ll(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of Dl)
    if (n >= r) return da((e / r).toFixed(t)) + a;
  return da(e.toFixed(t));
}
function El(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Pl(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Ll(e, n.decimals ?? 1) : El(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function Oi(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Fl(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Oi(e.value) ? !0 : typeof e.value == "string" ? Ar(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Dr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? ma : (Oi(t) || typeof t == "string" || typeof t == "number") && Fl(e) ? $t(t, n, r) : typeof t == "number" ? Pl(t, e) : String(t);
};
function $l(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function dv(e, t) {
  return (n, r) => {
    const a = r ? $l(r, t) : void 0;
    return Dr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Il(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function zl(e) {
  const t = qe.safeParse(e);
  return t.success ? t.data : void 0;
}
function Vl(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = zl(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Ai(e, t, n, r) {
  const a = Vl(e, t);
  return {
    value(i, o, s = "value") {
      const c = o ? Il(o, e) : void 0, u = c == null ? void 0 : c.meta;
      return n({
        value: i,
        member: o,
        meta: u,
        title: (c == null ? void 0 : c.shortTitle) ?? (c == null ? void 0 : c.title),
        role: s,
        format: t.format,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    },
    category(i) {
      return n({
        value: i,
        role: "category",
        format: t.format,
        granularity: a,
        locale: r == null ? void 0 : r.locale,
        unitSystem: r == null ? void 0 : r.unitSystem
      });
    }
  };
}
const Tn = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: He.optional()
}).strict(), Lr = d.boolean().optional(), jl = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(Tn).optional(),
  comparePrevious: Lr
}).strict(), Di = d.enum(["linear", "monotone", "step", "natural"]), Wl = d.object({
  curve: Di.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(Tn).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Lr
}).strict(), ql = d.object({
  curve: Di.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(Tn).optional(),
  comparePrevious: Lr
}).strict(), Hl = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), Bl = d.object({
  x: te,
  y: te,
  size: te.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: te.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(Tn).optional()
}).strict(), Kl = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: te,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([te, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: te.optional(),
    timeDimension: te.optional(),
    granularity: d.union([qe, hn]).optional(),
    dateRange: d.union([ir, hn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: He }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), Ul = d.object({
  member: te,
  label: d.string().optional(),
  format: xn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), Gl = d.object({
  member: te,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: He.optional()
}).strict(), Yl = d.object({
  columns: d.array(Ul).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(Gl).optional()
}).strict(), Ql = d.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: He.optional(),
  /** Print each cell's formatted value inside the cell. */
  showValues: d.boolean().optional()
}).strict(), Fe = {
  bar: jl,
  line: Wl,
  area: ql,
  pie: Hl,
  scatter: Bl,
  heatmap: Ql,
  kpi: Kl,
  table: Yl
}, $e = {
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
      legend: { show: !0, position: "right" },
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
      shape: "circle",
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
function ha(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function lr(e, t) {
  if (t === void 0) return e;
  if (!ha(e) || !ha(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? lr(e[r], a) : a);
  }
  return n;
}
const Jl = { envelope: {}, familyOptions: {} };
function Xl(e, t) {
  return {
    ...lr({ ...t.envelope }, e),
    familyOptions: lr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Li = {}, fa = () => {
}, Zl = {
  target: Li,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: fa,
  emitPoint: fa
}, pn = k.createContext(null);
pn.displayName = "ChartInteractionContext";
function Ei() {
  return k.useContext(pn) ?? Zl;
}
function Er({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = k.useContext(pn), o = k.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  k.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = k.useCallback((v) => {
    const { parent: b, widgetId: y, onRangeSelect: w } = o.current, S = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(S) : b == null || b.emitRange(S);
  }, []), c = k.useCallback((v) => {
    const { parent: b, widgetId: y, onPointSelect: w } = o.current, S = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(S) : b == null || b.emitPoint(S);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), h = i == null ? void 0 : i.target, p = k.useMemo(
    () => h || r ? { ...h, ...r } : Li,
    [h, r]
  ), f = k.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: p,
      rangeEnabled: u,
      pointEnabled: m,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, p, u, m, s, c]
  );
  return /* @__PURE__ */ l(pn.Provider, { value: f, children: a });
}
function at(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var s, c, u;
    const o = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const m of n) {
      const h = m.data[i] ?? null;
      h === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: h,
        key: m.key,
        label: m.label,
        member: ((c = m.meta) == null ? void 0 : c.measure) ?? m.key,
        companion: ((u = m.meta) == null ? void 0 : u.companion) ?? !1,
        i
      });
    }
  }), r;
}
function Wt(e) {
  return e.label || e.key;
}
function Ve(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Pr(e, t) {
  const n = e.series.map(Wt), r = e.series.map(Ve), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Cr({ placement: Ct(t.legendPlacement) })), a;
}
function Ct(e) {
  return e === "top" ? "top" : "bottom";
}
function Qt(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function gn(e = 0.2) {
  return ts().padding(e);
}
function Pi() {
  return ns().padding(0.02);
}
const ec = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function tc(e) {
  if (typeof e == "string" && ec.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return Ti(e);
}
function Fi(e) {
  return e.toISOString().slice(0, -1);
}
function pa(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = qe.safeParse(n);
  return r.success ? r.data : void 0;
}
function $i(e, t) {
  var m, h, p;
  const n = (h = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : h.member, r = (p = e.raw.annotation) == null ? void 0 : p.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const f of Object.keys(r))
    if (f === n || f.startsWith(`${n}.`)) {
      a = f;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? pa(n) : pa(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const f of e.categories) {
    if (typeof f == "number" && i === void 0 || typeof f == "string" && !Ar(f)) return null;
    const v = tc(f);
    if (!v) return null;
    s.push(v);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((f) => c.has(f.getTime()) ? !1 : (c.add(f.getTime()), !0)).sort((f, v) => f.getTime() - v.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function Ii(e) {
  return e ? os : Pi;
}
function Fr(e) {
  return e ? "t" : "cat";
}
function zi(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Fi(r)) : t.category(r);
}
function ga(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Fi(t);
}
function Vi(e, t) {
  const n = Ei(), [r, a] = k.useState(null), i = k.useRef({ opts: t, interactions: n, temporal: e });
  k.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return k.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (f) => f !== void 0 && s.some((v) => v.getTime() === f.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], h = u ?? { start: m, end: m }, p = u === null;
    return [
      as({
        id: "cv-brush-x",
        values: s,
        range: is(
          h,
          (f, { reason: v }) => {
            if (v.type !== "commit") return;
            const b = i.current.temporal, y = f.start.getTime() === f.end.getTime();
            if (a(y ? null : f), y || !b) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: b.member,
              granularity: b.granularity,
              from: ga(b, f.start),
              to: ga(b, f.end)
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
        selectionStyle: p ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: p ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function nc(e, t) {
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
function vt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? aa().domain(r) : aa();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: ln().domain(r), nice: !1 } : { scale: ln, nice: !0 };
}
function qt(e) {
  switch (e) {
    case "monotone":
      return Wn(us);
    case "step":
      return Wn(cs);
    case "natural":
      return Wn(ls);
    default:
      return;
  }
}
function $r(e, t) {
  var o, s, c, u, m, h, p, f, v, b;
  const n = e.raw.annotation, r = (y) => {
    var w, S, C, x, N, _;
    if (y)
      return ((w = n == null ? void 0 : n.measures[y]) == null ? void 0 : w.shortTitle) ?? ((S = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : S.shortTitle) ?? ((C = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : C.shortTitle) ?? ((x = n == null ? void 0 : n.measures[y]) == null ? void 0 : x.title) ?? ((N = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : N.title) ?? ((_ = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : _.title) ?? y;
  }, a = e.series[0], i = (y) => {
    var w;
    return y ? (w = y.meta) != null && w.measure ? r(y.meta.measure) : y.label : void 0;
  };
  return {
    x: (s = (o = t.axes) == null ? void 0 : o.x) != null && s.labelHide ? void 0 : ((u = (c = t.axes) == null ? void 0 : c.x) == null ? void 0 : u.label) ?? r((h = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : h.member),
    y: (f = (p = t.axes) == null ? void 0 : p.y) != null && f.labelHide ? void 0 : ((b = (v = t.axes) == null ? void 0 : v.y) == null ? void 0 : b.label) ?? i(a)
  };
}
function Ir(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function rc(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function Ht(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function On(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.datum.value, r.datum.member, "tooltip");
  return {
    use: Nr,
    className: "cv-chart-tooltip",
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0;
      let s = 0;
      if (e.percentShare)
        for (const c of a) {
          const u = c.datum.value;
          typeof u == "number" && Number.isFinite(u) && (s += u);
        }
      return {
        title: o,
        rows: a.map((c) => ({
          label: c.datum.label,
          value: e.percentShare && s > 0 && typeof c.datum.value == "number" ? Ht(c.datum.value / s, e.locale) : n(c),
          color: c.color
        }))
      };
    }
  };
}
function zr(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [];
  return e.forEach((a, i) => {
    const o = `var(--${a.colorToken ?? "muted-foreground"})`, s = { stroke: o, strokeWidth: 1.25, strokeDasharray: "4 4" }, c = a.axis === "x", u = c ? t[a.value] : void 0;
    if (c && u == null) return;
    if (n != null && n.swap ? !c : c) {
      const h = n != null && n.swap ? a.value : u;
      r.push(Za([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        pt([{ v: h, label: a.label }], {
          id: `cv-ref-label-${i}`,
          x: "v",
          text: "label",
          fill: o,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      );
    } else {
      const h = n != null && n.swap ? u : a.value;
      r.push(ei([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        pt([{ v: h, label: a.label }], {
          id: `cv-ref-label-${i}`,
          y: "v",
          text: "label",
          fill: o,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      );
    }
  }), r;
}
function ji(e, t, n) {
  const r = e.filter((i) => i.value !== null && !i.companion);
  if (!r.length) return [];
  const a = Fr((n == null ? void 0 : n.temporal) ?? null);
  return [
    pt(r, {
      id: "cv-value-labels",
      x: n != null && n.swap ? "value" : a,
      y: n != null && n.swap ? a : "value",
      text: (i) => t.value(i.value, i.member, "label"),
      fill: "currentColor",
      fontSize: 10,
      dy: n != null && n.swap ? 0 : -8,
      dx: n != null && n.swap ? 12 : 0
    })
  ];
}
const ac = ri({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), ic = ri({ initial: !1 });
function Ge({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = k.useRef(null), u = Ei(), m = u.pointEnabled && !r, h = k.useRef(s);
  k.useLayoutEffect(() => {
    h.current = s;
  });
  const p = k.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const S = h.current, C = S ? S(w) : nc(w, u.target);
      C && u.emitPoint(C);
    },
    [u]
  ), [f, v] = k.useState({ w: 0, h: 0 }), b = k.useId().replace(/:/g, "");
  k.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((C) => {
      var N;
      const x = (N = C[0]) == null ? void 0 : N.contentRect;
      x && v({ w: Math.floor(x.width), h: Math.floor(x.height) });
    });
    return S.observe(w), () => S.disconnect();
  }, []);
  const y = r ? Math.max(24, f.h || Math.round((f.w || 160) / 5)) : Math.max(i, f.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: f.w > 0 && /* @__PURE__ */ l(
        rs,
        {
          definition: e,
          renderer: a ? ac : ic,
          width: f.w,
          height: y,
          ariaLabel: t,
          idPrefix: b,
          onSelect: o ?? (m ? p : void 0)
        }
      )
    }
  );
}
function va(e, t) {
  let n;
  return e === void 0 ? n = t : typeof e == "string" ? n = Number.parseFloat(e) / 100 : n = e > 1 ? e / 100 : e, Number.isFinite(n) || (n = t), Math.min(0.9, Math.max(0, n));
}
function oc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = k.useMemo(() => {
    var A, F, O, R, q, D, U, Y;
    const o = t.orientation === "horizontal", s = t.stackMode === "percent", c = t.stackMode === "stacked" || s, u = e.series.filter((j) => {
      var W;
      return (W = j.meta) == null ? void 0 : W.companion;
    }), m = u.length ? e.series.filter((j) => {
      var W;
      return !((W = j.meta) != null && W.companion);
    }) : e.series, h = c ? m : e.series, p = at(e, { series: h }), f = new Map(e.series.map((j) => [Wt(j), Ve(j)])), v = $r(e, t), b = o ? (F = (A = t.axes) == null ? void 0 : A.y) == null ? void 0 : F.hide : (R = (O = t.axes) == null ? void 0 : O.x) == null ? void 0 : R.hide, y = o ? (q = t.axes) == null ? void 0 : q.x : (D = t.axes) == null ? void 0 : D.y, w = vt(y), S = va(r.barCategoryGap, 0.2), C = rc(t) ?? Ir(e.series[0]), x = (j) => s ? Ht(j) : n.value(j, C, "axis"), N = b ? !1 : {
      label: v.x,
      ticks: { format: (j) => n.category(j) }
    }, _ = y != null && y.hide ? !1 : { label: v.y, ticks: { format: x } }, T = s ? ti({ offset: "normalize" }) : c ? void 0 : Yo(r.barGap === void 0 ? {} : { padding: va(r.barGap, 0.1) }), P = {
      id: "cv-bars",
      z: "label",
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (j) => `${j.label} ${j.i}`,
      layout: T,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (j) => {
        const W = f.get(j.label) ?? "var(--chart-1)";
        return j.companion ? `color-mix(in oklab, ${W} 40%, transparent)` : W;
      }
    }, L = [
      o ? Qo(p, { ...P, x: "value", y: "cat" }) : Jo(p, { ...P, x: "cat", y: "value" })
    ];
    if (c && !s && u.length) {
      const j = e.categories.map((W, $) => {
        var B, re, ie;
        return {
          cat: typeof W == "number" ? W : String(W),
          value: u.reduce((oe, fe) => {
            const we = fe.data[$];
            return typeof we != "number" ? oe : (oe ?? 0) + we;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((re = (B = u[0]) == null ? void 0 : B.meta) == null ? void 0 : re.measure) ?? ((ie = u[0]) == null ? void 0 : ie.key),
          companion: !0,
          i: $
        };
      });
      if (j.some((W) => W.value !== null)) {
        const W = {
          id: "cv-bars-prev",
          key: ($) => `prev ${$.i}`,
          curve: qt("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        L.push(
          o ? Xo(j, { ...W, x: "value", y: "cat" }) : Cn(j, { ...W, x: "cat", y: "value" })
        );
      }
    }
    return L.push(...zr(r.referenceLines, e.categories, { swap: o })), r.showValueLabels && !s && L.push(...ji(p, n, { swap: o })), Be({
      marks: L,
      x: o ? { scale: w.scale, nice: w.nice, grid: !0, axis: _ } : { scale: () => gn(S), axis: N },
      y: o ? { scale: () => gn(S), axis: N } : { scale: w.scale, nice: w.nice, grid: !0, axis: _ },
      color: Pr(c ? { ...e, series: h } : e, {
        legend: Qt(t) && h.length > 1,
        legendPlacement: Ct((U = t.legend) == null ? void 0 : U.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: o ? "group-y" : "group-x",
      tooltip: ((Y = t.tooltip) == null ? void 0 : Y.show) === !1 ? void 0 : On({ format: n, percentShare: s }),
      keyboard: !0
    });
  }, [e, t, n, r]), i = e.series.map(Wt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(Ge, { definition: a, ariaLabel: i, className: "cv-chart--fill" });
}
function sc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = r.chrome === "none", i = k.useMemo(
    () => a ? null : $i(e, t),
    [e, t, a]
  ), o = k.useMemo(() => zi(i, n), [i, n]), s = Vi(i, {
    label: o,
    ariaLabel: "Time range"
  }), c = k.useMemo(() => {
    var w, S, C, x, N, _, T;
    const m = Fr(i), h = r.connectNulls ?? !1, p = qt(r.curve ?? "monotone"), f = $r(e, t), v = vt((w = t.axes) == null ? void 0 : w.y), b = e.categories.length <= 1, y = e.series.map((P) => {
      var A, F, O, R;
      const L = at(e, { series: [P], skipNull: h, temporal: i });
      return Cn(L, {
        id: `cv-line-${P.key}`,
        x: m,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: p,
        strokeWidth: r.strokeWidth ?? 2,
        strokeDasharray: (A = P.meta) != null && A.companion ? "5 4" : void 0,
        strokeOpacity: (F = P.meta) != null && F.companion ? 0.55 : void 0,
        stroke: Ve(P),
        points: !a && !((O = P.meta) != null && O.companion) && ((((R = P.meta) == null ? void 0 : R.dots) ?? r.dots) === !0 || b)
      });
    });
    return a || (y.push(
      ...zr(r.referenceLines, (i == null ? void 0 : i.dates) ?? e.categories),
      ...ji(
        r.showValueLabels ? at(e, { skipNull: !0, temporal: i }) : [],
        n,
        { temporal: i }
      )
    ), y.push(ni({ x: {}, y: !1 }))), Be({
      marks: y,
      x: {
        scale: Ii(i),
        axis: a || (C = (S = t.axes) == null ? void 0 : S.x) != null && C.hide ? !1 : {
          label: f.x,
          ticks: { format: o }
        }
      },
      y: {
        scale: v.scale,
        nice: v.nice,
        grid: !a,
        axis: a || (N = (x = t.axes) == null ? void 0 : x.y) != null && N.hide ? !1 : {
          label: f.y,
          ticks: {
            format: (P) => {
              var L, A, F;
              return n.value(P, ((A = (L = e.series[0]) == null ? void 0 : L.meta) == null ? void 0 : A.measure) ?? ((F = e.series[0]) == null ? void 0 : F.key), "axis");
            }
          }
        }
      },
      guides: !a,
      color: Pr(e, {
        legend: !a && Qt(t) && e.series.length > 1,
        legendPlacement: Ct((_ = t.legend) == null ? void 0 : _.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: a || ((T = t.tooltip) == null ? void 0 : T.show) === !1 ? void 0 : On({ format: n, category: o }),
      margin: a ? 4 : void 0,
      keyboard: !a,
      controls: s
    });
  }, [e, t, n, r, a, i, o, s]), u = e.series.map(Wt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    Ge,
    {
      definition: c,
      ariaLabel: u,
      sparkline: a,
      className: a ? void 0 : "cv-chart--fill"
    }
  );
}
function lc({
  data: e,
  options: t,
  format: n
}) {
  var f, v;
  const r = t.familyOptions ?? {}, a = ((v = (f = t.mapping) == null ? void 0 : f.series) == null ? void 0 : v.mode) === "pivot", i = t.stackMode ?? (a ? "stacked" : "none"), o = i === "stacked" || i === "percent", s = i === "percent", c = k.useMemo(() => $i(e, t), [e, t]), u = k.useMemo(() => zi(c, n), [c, n]), m = Vi(c, { label: u, ariaLabel: "Time range" }), h = k.useMemo(() => {
    var R, q, D, U, Y, j, W;
    const b = Fr(c), y = r.connectNulls ?? !1, w = qt(r.curve ?? "monotone"), S = r.fillOpacity ?? 0.4, C = r.strokeWidth ?? 2, x = $r(e, t), N = vt((R = t.axes) == null ? void 0 : R.y), _ = Ir(e.series[0]), T = e.series.filter(($) => {
      var B;
      return !((B = $.meta) != null && B.companion);
    }), P = s ? [] : e.series.filter(($) => {
      var B;
      return (B = $.meta) == null ? void 0 : B.companion;
    }), L = new Map(e.series.map(($) => [$.key, Ve($)])), A = [], F = ($) => `cv-area-fill-${$.replace(/[^a-zA-Z0-9_-]/g, "-")}`, O = o ? void 0 : T.map(($) => ({
      id: F($.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: Ve($), opacity: S * 0.15 },
        { offset: 1, color: Ve($), opacity: S }
      ]
    }));
    if (o) {
      const $ = at(e, { series: T, skipNull: y, temporal: c });
      A.push(
        tr($, {
          id: "cv-area-stack",
          x: b,
          y: "value",
          z: "label",
          color: "label",
          // "i" alone collides across series inside a single multi-series mark.
          key: (B) => `${B.key}:${B.i}`,
          curve: w,
          fillOpacity: S,
          // Boundary stroke; evaluated from each z-group's first row → per-series color.
          stroke: (B) => L.get(B.key) ?? "currentColor",
          strokeWidth: C,
          layout: s ? ti({ offset: "normalize" }) : void 0
        })
      );
    } else
      for (const $ of T) {
        const B = at(e, { series: [$], skipNull: y, temporal: c });
        A.push(
          tr(B, {
            id: `cv-area-${$.key}`,
            x: b,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: w,
            fill: `url(#${F($.key)})`,
            stroke: Ve($),
            strokeWidth: C
          })
        );
      }
    for (const $ of P) {
      const B = at(e, { series: [$], skipNull: y, temporal: c });
      A.push(
        Cn(B, {
          id: `cv-area-prev-${$.key}`,
          x: b,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: w,
          strokeWidth: C,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: Ve($)
        })
      );
    }
    return A.push(...zr(r.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories)), A.push(ni({ x: {}, y: !1 })), Be({
      marks: A,
      gradients: O,
      x: {
        scale: Ii(c),
        axis: (D = (q = t.axes) == null ? void 0 : q.x) != null && D.hide ? !1 : {
          label: x.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: N.scale,
        nice: N.nice,
        grid: !0,
        axis: (Y = (U = t.axes) == null ? void 0 : U.y) != null && Y.hide ? !1 : {
          label: x.y,
          ticks: {
            format: ($) => s ? Ht($) : n.value($, _, "axis")
          }
        }
      },
      color: Pr(e, {
        legend: Qt(t) && e.series.length > 1,
        legendPlacement: Ct((j = t.legend) == null ? void 0 : j.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((W = t.tooltip) == null ? void 0 : W.show) === !1 ? void 0 : On({ format: n, percentShare: s, category: u }),
      keyboard: !0,
      controls: m
    });
  }, [e, t, n, r, o, s, c, u, m]), p = e.series.map(Wt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(Ge, { definition: h, ariaLabel: p, className: "cv-chart--fill" });
}
const ba = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function cc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.series[0], i = Ir(a), o = k.useMemo(() => {
    const p = e.categories.map((f, v) => ({
      label: n.category(f),
      value: (a == null ? void 0 : a.data[v]) ?? 0
    }));
    return uc(p, r.maxSlices).map((f, v) => ({
      ...f,
      token: it[v % it.length]
    }));
  }, [e, n, a, r.maxSlices]), s = o.reduce((p, f) => p + f.value, 0), c = o.some((p) => p.value < 0), u = c || o.length === 0 || s <= 0, m = k.useMemo(() => {
    var N, _;
    if (u) return null;
    const p = (r.innerRadiusPct ?? 0) / 100, f = (r.outerRadiusPct ?? 80) / 100, v = p > 0, b = r.showLabels ?? "percent", y = Us(o, {
      value: "value",
      gapAngle: (r.padAngle ?? 0) * Math.PI / 180
    }), S = [ar(y, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: T }) => T * p,
      outerRadius: ({ radius: T }) => T * f,
      cornerRadius: r.cornerRadius
    })];
    if (b !== "none") {
      const T = (L) => b === "name" ? L.label : b === "value" ? n.value(L.value, i, "label") : Ht(L.fraction), P = v ? (p + f) / 2 : f * 0.75;
      S.push(
        qn(
          y.filter((L) => L.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (L) => L.angle,
            radius: P,
            text: T,
            fill: "var(--foreground)",
            fontSize: 11,
            anchor: "middle",
            baseline: "middle"
          }
        )
      );
    }
    if (v && r.centerLabel) {
      const T = r.centerLabel.value === void 0 || r.centerLabel.value === "total" ? n.value(s, i, "label") : r.centerLabel.value;
      if (S.push(
        qn([{ id: "cv-pie-center" }], {
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
      ), r.centerLabel.label) {
        const P = r.centerLabel.label;
        S.push(
          qn([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => P,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const C = {
      domain: o.map((T) => T.label),
      range: o.map((T) => `var(--${T.token})`)
    };
    Qt(t) && (C.legend = Cr({ placement: Ct((N = t.legend) == null ? void 0 : N.position) }));
    const x = a ? a.label || a.key : "";
    return Be({
      marks: [
        vi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: ln().domain([0, Math.PI * 2]) },
          radius: { scale: ln().domain([0, 1]) },
          marks: S
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: C,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((_ = t.tooltip) == null ? void 0 : _.show) === !1 ? void 0 : {
        use: Nr,
        className: "cv-chart-tooltip",
        content: (T) => {
          const P = T[0];
          if (!P) return { rows: [] };
          const L = P.datum;
          return {
            title: L.label,
            rows: [
              {
                label: x,
                value: `${n.value(L.value, i, "tooltip")} (${Ht(L.fraction)})`,
                color: P.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [u, o, s, t, n, r, a, i]);
  if (c)
    return /* @__PURE__ */ l("div", { style: ba, children: "Pie charts can't show negative values" });
  if (!m)
    return /* @__PURE__ */ l("div", { style: ba, children: "No data" });
  const h = o.map((p) => p.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(Ge, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function uc(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function mc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.annotation, i = (p) => {
    var f, v;
    return ((f = a == null ? void 0 : a.measures[p]) == null ? void 0 : f.shortTitle) ?? ((v = a == null ? void 0 : a.dimensions[p]) == null ? void 0 : v.shortTitle) ?? p;
  }, o = r.x ? i(r.x) : "x", s = r.y ? i(r.y) : "y", c = r.size ? i(r.size) : void 0, u = k.useMemo(() => {
    var R, q, D, U, Y, j, W, $, B, re, ie, oe, fe, we, Oe, se, I;
    if (!r.x || !r.y) return null;
    const p = hc(e.raw.rows, r);
    if (p.length === 0) return null;
    const f = !!r.groupBy, v = [];
    if (f)
      for (const E of p)
        E.group !== void 0 && !v.includes(E.group) && v.push(E.group);
    const [b, y] = r.sizeRange ?? [40, 400], w = Math.sqrt(Math.max(b, 0) / Math.PI), S = Math.sqrt(Math.max(y, 0) / Math.PI), C = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    };
    f ? (C.z = "group", C.color = "group") : C.fill = `var(--${it[0]})`, r.size ? (C.r = (E) => E.size ?? 0, C.rScale = { scale: () => ss().range([w, S]) }) : C.r = 4;
    const x = [Zo(p, C)];
    (R = r.referenceLines) == null || R.forEach((E, H) => {
      const G = `var(--${E.colorToken ?? "muted-foreground"})`, z = { stroke: G, strokeWidth: 1.25, strokeDasharray: "4 4" };
      E.axis === "y" ? (x.push(ei([E.value], { id: `cv-ref-${H}`, ...z })), E.label && x.push(
        pt([{ v: E.value, label: E.label }], {
          id: `cv-ref-label-${H}`,
          y: "v",
          text: "label",
          fill: G,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (x.push(Za([E.value], { id: `cv-ref-${H}`, ...z })), E.label && x.push(
        pt([{ v: E.value, label: E.label }], {
          id: `cv-ref-label-${H}`,
          x: "v",
          text: "label",
          fill: G,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let N;
    f && (N = {
      domain: v,
      range: v.map(
        (E, H) => `var(--${it[H % it.length]})`
      )
    }, Qt(t) && (N.legend = Cr({ placement: Ct((q = t.legend) == null ? void 0 : q.position) })));
    const _ = (U = (D = t.axes) == null ? void 0 : D.x) != null && U.labelHide ? void 0 : ((j = (Y = t.axes) == null ? void 0 : Y.x) == null ? void 0 : j.label) ?? o, T = ($ = (W = t.axes) == null ? void 0 : W.y) != null && $.labelHide ? void 0 : ((re = (B = t.axes) == null ? void 0 : B.y) == null ? void 0 : re.label) ?? s, P = vt((ie = t.axes) == null ? void 0 : ie.x), L = vt((oe = t.axes) == null ? void 0 : oe.y), A = r.x, F = r.y, O = r.size;
    return Be({
      marks: x,
      x: {
        scale: P.scale,
        nice: P.nice,
        grid: !0,
        axis: (we = (fe = t.axes) == null ? void 0 : fe.x) != null && we.hide ? !1 : {
          label: _,
          ticks: { format: (E) => n.value(E, A, "axis") }
        }
      },
      y: {
        scale: L.scale,
        nice: L.nice,
        grid: !0,
        axis: (se = (Oe = t.axes) == null ? void 0 : Oe.y) != null && se.hide ? !1 : {
          label: T,
          ticks: { format: (E) => n.value(E, F, "axis") }
        }
      },
      color: N,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((I = t.tooltip) == null ? void 0 : I.show) === !1 ? void 0 : {
        use: Nr,
        className: "cv-chart-tooltip",
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (E) => {
          const G = E[0];
          if (!G) return { rows: [] };
          const z = G.datum, V = [
            { label: o, value: n.value(z.x, A, "tooltip") },
            { label: s, value: n.value(z.y, F, "tooltip") }
          ];
          return O && V.push({
            label: c ?? O,
            value: n.value(z.size, O, "tooltip")
          }), { title: z.group, color: G.color, rows: V };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, r, o, s, c]), m = r.groupBy, h = (p) => {
    var v;
    if (!p || !m) return null;
    const f = (v = p.datum) == null ? void 0 : v.group;
    return f === void 0 ? null : { member: m, value: f, label: f };
  };
  return u ? /* @__PURE__ */ l(
    Ge,
    {
      definition: u,
      ariaLabel: `${o} vs ${s} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: h
    }
  ) : /* @__PURE__ */ l("div", { style: dc, children: "No data" });
}
const dc = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function hc(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = Hn(r[t.x]), o = Hn(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? Hn(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function Hn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function fc(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function ya(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function pc(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function gc(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Wi(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? gc(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => Wi(e, t, n), r;
}
function vc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = fc(t), s = e.raw.rows, c = e.raw.annotation, u = k.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const p = ya(s, a), f = ya(s, i), v = /* @__PURE__ */ new Map();
    return s.forEach((b, y) => {
      const w = pc(b[o]), S = b[p], C = b[f];
      if (w === null || S === null || S === void 0 || C === null || C === void 0)
        return;
      const x = typeof S == "number" ? S : String(S), N = String(C);
      v.set(`${x}\0${N}`, {
        cat: x,
        label: N,
        value: w,
        key: `${x}|${N}`,
        member: o,
        i: y
      });
    }), [...v.values()];
  }, [s, a, i, o]), m = k.useMemo(() => {
    var S, C, x, N, _, T, P, L, A, F, O, R, q;
    let p = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY;
    for (const D of u)
      D.value < p && (p = D.value), D.value > f && (f = D.value);
    const v = (D) => {
      if (!D) return;
      const U = (c == null ? void 0 : c.dimensions[D]) ?? (c == null ? void 0 : c.timeDimensions[D]) ?? (c == null ? void 0 : c.measures[D]);
      return (U == null ? void 0 : U.shortTitle) ?? (U == null ? void 0 : U.title) ?? D;
    }, b = (C = (S = t.axes) == null ? void 0 : S.x) != null && C.labelHide ? void 0 : ((N = (x = t.axes) == null ? void 0 : x.x) == null ? void 0 : N.label) ?? v(a), y = (T = (_ = t.axes) == null ? void 0 : _.y) != null && T.labelHide ? void 0 : ((L = (P = t.axes) == null ? void 0 : P.y) == null ? void 0 : L.label) ?? v(i), w = [
      es(u, {
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
      pt(u, {
        id: "cv-heatmap-values",
        x: "cat",
        y: "label",
        text: (D) => n.value(D.value, D.member, "label"),
        fill: "currentColor",
        fontSize: 10
      })
    ), Be({
      marks: w,
      x: {
        scale: () => gn(0.05),
        axis: (F = (A = t.axes) == null ? void 0 : A.x) != null && F.hide ? !1 : {
          label: b,
          ticks: { format: (D) => n.category(D) }
        }
      },
      y: {
        scale: () => gn(0.05),
        axis: (R = (O = t.axes) == null ? void 0 : O.y) != null && R.hide ? !1 : { label: y }
      },
      color: {
        scale: Wi(p, f, r.colorToken ?? "chart-1")
      },
      tooltip: ((q = t.tooltip) == null ? void 0 : q.show) === !1 ? void 0 : On({ format: n })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const h = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(Ge, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function bc(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function yc(e) {
  return `cv-kpi-trend--${e}`;
}
function kc(e) {
  var c, u, m, h;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (p) => r.value(p, a.measure, "kpi"), o = qi([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : h.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Tc, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(wc, { ...e, value: o, label: s, fo: a, fmt: i });
}
function wc({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var p;
  const a = n.goodDirection ?? ((p = n.comparison) == null ? void 0 : p.goodDirection) ?? "up", i = t === null ? null : Ac(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Cc(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((f) => f !== null), m = i ? i.diff : c ? Mc(c) : 0, h = yc(bc(m, a));
  return /* @__PURE__ */ g("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ g("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Rc, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Nc, {}) : /* @__PURE__ */ l(Sc, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(xc, { data: e, series: c, colorClass: h }) })
  ] });
}
function Cc(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Nc() {
  return /* @__PURE__ */ g(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(oi, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Sc() {
  return /* @__PURE__ */ g("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(ii, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function xc({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = k.useMemo(() => {
    const a = at(e, { series: [t], skipNull: !0 }), i = vt(void 0);
    return Be({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        tr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: qt("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Cn(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: qt("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Pi, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    Ge,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Mc(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Rc({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? ii : a ? Nn : Sn, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ g(
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
const Tt = -(2 * Math.PI) / 3, cr = 2 * Math.PI / 3, _c = cr - Tt;
function Tc({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, h;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : Oc(e, r)) ?? "chart-1", u = k.useMemo(() => {
    const p = (s - a) / (o - a), f = Tt + p * _c, v = ({ radius: w }) => w * 0.7, b = ar([{ startAngle: Tt, endAngle: cr }], {
      id: "cv-gauge-track",
      innerRadius: v,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), y = p > 0 ? [
      b,
      ar([{ startAngle: Tt, endAngle: f }], {
        id: "cv-gauge-value",
        innerRadius: v,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [b];
    return Be({
      marks: [
        vi({
          id: "cv-gauge",
          startAngle: Tt,
          endAngle: cr,
          marks: y
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ g("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      Ge,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ g("div", { className: "cv-kpi-gauge-center", children: [
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
function Oc(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function qi(e, t) {
  for (const n of e) {
    const r = Hi(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Ac(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = qi(e, r.value));
  else {
    const s = e[1];
    a = s ? Hi(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function Hi(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Bi = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: M("cv-table", e), ...t }) })
);
Bi.displayName = "Table";
const Ki = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: M("cv-table-header", e), ...t }));
Ki.displayName = "TableHeader";
const Ui = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: M("cv-table-body", e), ...t }));
Ui.displayName = "TableBody";
const nn = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: M("cv-table-row", e),
      ...t
    }
  )
);
nn.displayName = "TableRow";
const ur = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: M("cv-table-head", e),
    ...t
  }
));
ur.displayName = "TableHead";
const rn = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: M("cv-table-cell", e),
    ...t
  }
));
rn.displayName = "TableCell";
const Dc = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: M("cv-table-caption", e), ...t }));
Dc.displayName = "TableCaption";
const Gi = _r(
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
), K = k.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: M(Gi({ variant: t, size: n }), e),
      ...a
    }
  )
);
K.displayName = "Button";
function Lc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = k.useMemo(
    () => Ec(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = k.useState(null), [u, m] = k.useState(0), h = r.sortable !== !1, p = r.pageSize ?? 25, f = k.useMemo(() => {
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1;
    return [...a].sort((x, N) => zc(x[s.member], N[s.member]) * C);
  }, [a, s]), v = Math.max(1, Math.ceil(f.length / p)), b = Math.min(u, v - 1), y = f.slice(b * p, b * p + p), w = (C) => {
    h && (c(
      (x) => (x == null ? void 0 : x.member) === C ? { member: C, dir: x.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0));
  }, S = r.rowHeight === "compact";
  return /* @__PURE__ */ g("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: M("cv-table-scroll", r.stickyHeader && "cv-table-scroll--sticky"), children: /* @__PURE__ */ g(Bi, { children: [
      /* @__PURE__ */ l(Ki, { className: M(r.stickyHeader && "cv-table-header--sticky"), children: /* @__PURE__ */ g(nn, { children: [
        r.showRowNumbers && /* @__PURE__ */ l(ur, { className: "cv-table-rownum", children: "#" }),
        o.map((C) => /* @__PURE__ */ l(
          ur,
          {
            className: ka(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: h ? /* @__PURE__ */ g(
              K,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: () => w(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ l(Ic, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ g(Ui, { children: [
        y.map((C, x) => /* @__PURE__ */ g(nn, { children: [
          r.showRowNumbers && /* @__PURE__ */ l(
            rn,
            {
              className: M(
                "cv-table-cell--right cv-table-cell--muted",
                S && "cv-table-cell--compact"
              ),
              children: b * p + x + 1
            }
          ),
          o.map((N) => {
            const _ = Vc(N.member, C[N.member], r.conditionalFormat);
            return /* @__PURE__ */ l(
              rn,
              {
                className: M(ka(N.align), S && "cv-table-cell--compact"),
                style: _ ? { color: _ } : void 0,
                children: N.render(C[N.member])
              },
              N.member
            );
          })
        ] }, x)),
        y.length === 0 && /* @__PURE__ */ l(nn, { children: /* @__PURE__ */ l(
          rn,
          {
            colSpan: o.length + (r.showRowNumbers ? 1 : 0),
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    f.length > p && /* @__PURE__ */ g("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ g("span", { children: [
        b * p + 1,
        "–",
        Math.min((b + 1) * p, f.length),
        " of",
        " ",
        f.length
      ] }),
      /* @__PURE__ */ g("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          K,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: b === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          K,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((C) => Math.min(v - 1, C + 1)),
            disabled: b >= v - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Ec(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Fc(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = t ? $c(t, c) : void 0, m = t ? c in t.measures : !1, h = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, p = s.align ?? (m ? "right" : "left");
    return {
      member: c,
      label: h,
      align: p,
      width: s.width,
      render: (f) => Pc(f, m, c, r)
    };
  });
}
function Pc(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Fc(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function $c(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ka(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Ic({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Nn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Sn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(hs, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function zc(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Vc(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && jc(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function jc(e, t, n) {
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
const Qe = "cv-sidebar--default", Wc = "cv-sidebar--wide", Yi = "a date or category", Bn = [
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
    hint: Yi,
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
], qc = [
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
    hint: Yi,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Hc = [
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
], Bc = [
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
], Kc = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Uc = [
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
], Gc = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], Ie = (e) => Gc.indexOf(e), Ee = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: si,
    order: Ie("bar"),
    component: oc,
    optionsSchema: Fe.bar,
    defaults: $e.bar,
    wells: Bn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Qe
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: ks,
    order: Ie("line"),
    component: sc,
    optionsSchema: Fe.line,
    defaults: $e.line,
    wells: Bn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Qe
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: fs,
    order: Ie("area"),
    component: lc,
    optionsSchema: Fe.area,
    defaults: $e.area,
    wells: Bn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Qe
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: ys,
    order: Ie("pie"),
    component: cc,
    optionsSchema: Fe.pie,
    defaults: $e.pie,
    wells: Hc,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Qe
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: bs,
    order: Ie("scatter"),
    component: mc,
    optionsSchema: Fe.scatter,
    defaults: $e.scatter,
    wells: Bc,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: Qe
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: vs,
    order: Ie("kpi"),
    component: kc,
    optionsSchema: Fe.kpi,
    defaults: $e.kpi,
    wells: Kc,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Wc
  },
  table: {
    family: "table",
    label: "Table",
    icon: gs,
    order: Ie("table"),
    component: Lc,
    optionsSchema: Fe.table,
    defaults: $e.table,
    wells: Uc,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Qe
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: ps,
    order: Ie("heatmap"),
    component: vc,
    optionsSchema: Fe.heatmap,
    defaults: $e.heatmap,
    wells: qc,
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
    sidebarWidthClass: Qe
  }
}, Yc = Ee.bar, Qc = Ee.line, Jc = Ee.area, Xc = Ee.pie, Zc = Ee.scatter, eu = Ee.heatmap, tu = Ee.kpi, nu = Ee.table, Vr = [
  Yc,
  Qc,
  Jc,
  Xc,
  Zc,
  eu,
  tu,
  nu
], ru = d.any();
function jr(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? Jl;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? ru;
    },
    resolveOptions: (o) => Xl(o, i.defaults(o.family))
  };
  return i;
}
const An = jr(Vr);
function au(e, t = An) {
  return t.resolveOptions(e);
}
function iu(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Wr(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function ou(e) {
  const t = Math.floor(e ?? tn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function su(e, t) {
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
function lu(e) {
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
function cu(e, t) {
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
function uu(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function mu(e, t, n) {
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
function du(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = cu(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: uu(o.meta)
      }))
    };
  }
  const a = ou(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? su(i.data, a) : lu(i.data)
    }))
  };
}
const hv = Object.fromEntries(
  Object.entries(Ee).map(([e, t]) => [e, t.component])
);
function hu({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = An
}) {
  const u = X(() => au(t, c), [t, c]), m = c.get(u.family), h = (m == null ? void 0 : m.queryless) ?? !1, p = Wr(m) ? u.transform : void 0, f = X(() => du(e, p), [e, p]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(Rl, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ g(Mn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Sr, {}),
      /* @__PURE__ */ l(Rn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(_n, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : iu(f), b = mu(
    r ?? Ai(e.raw.annotation, u, Dr),
    p
  ), y = (i == null ? void 0 : i[u.family]) ?? c.require(u.family).component;
  return /* @__PURE__ */ l(
    y,
    {
      data: f,
      options: u,
      config: v,
      format: b,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const it = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Kn = 8;
function wa(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Qi(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : it, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function Ca(e, t) {
  const n = Qi(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function fu(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Zt(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = fu(e[n]);
  return t;
}
function pu(e) {
  return {
    measures: Zt(e.measures ?? {}),
    dimensions: Zt(e.dimensions ?? {}),
    segments: Zt(e.segments ?? {}),
    timeDimensions: Zt(e.timeDimensions ?? {})
  };
}
function ht(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Dn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = (t == null ? void 0 : t.format) ?? n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function gu(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function vu(e, t) {
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
function bu(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Ln(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function yu(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function ku(e, t, n, r, a = An) {
  const i = pu(e.annotation()), o = vu(i, r), s = bu(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const h = n.measures ?? [];
    if (a.require(t.family).measureOnly && h.length > 0) {
      const p = s[0] ?? {}, f = [
        {
          key: "value",
          label: "Value",
          data: h.map((b) => Ln(p[b])),
          meta: { ...Dn(ht(i, h[0]), void 0, t.format), measure: h[0] }
        }
      ];
      return Ca(f, t.colors), {
        categories: h.map(
          (b) => {
            var y, w;
            return ((y = ht(i, b)) == null ? void 0 : y.shortTitle) ?? ((w = ht(i, b)) == null ? void 0 : w.title) ?? b;
          }
        ),
        series: f,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || wa(f)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Cu(e, c.series, t, i) : Nu(e, c.category.member, c.series, t, i), m = wu(e, c);
  return yu(u, o), Ca(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || wa(u)
  };
}
function wu(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Cu(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = ht(r, s), u = i == null ? void 0 : i[s], m = o.map((h) => Ln(h[s]));
    return {
      key: s,
      label: gu(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Dn(c, u, n.format), measure: s }
    };
  });
}
function Nu(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, h = { x: [t], y: [s, "measures"] }, f = e.seriesNames(h).filter((w) => {
    const S = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return S === void 0 || u.has(S);
  }), v = e.chartPivot(h), b = ht(a, i), y = f.map((w) => {
    var A, F;
    const S = (A = w.yValues) == null ? void 0 : A[0], C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, x = ht(a, C), N = (x == null ? void 0 : x.shortTitle) ?? (x == null ? void 0 : x.title) ?? C, _ = S ?? w.shortTitle ?? w.title ?? w.key, T = m ? `${N} · ${_}` : _, P = v.map((O) => Ln(O[w.key])), L = (F = n.meta) == null ? void 0 : F[C];
    return {
      key: w.key,
      label: T,
      data: P,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Dn(x ?? b, L, r.format),
        measure: C
      }
    };
  });
  return Su(y, b, r.format);
}
function Su(e, t, n) {
  var m, h, p;
  if (e.length <= Kn) return e;
  const r = (f) => f.data.reduce((v, b) => v + (b ?? 0), 0), a = [...e].sort((f, v) => r(v) - r(f)), i = a.slice(0, Kn - 1), o = a.slice(Kn - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (f, v) => {
    let b = 0, y = !1;
    for (const w of o) {
      const S = w.data[v];
      S !== null && (b += S, y = !0);
    }
    return y ? b : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...Dn(t, void 0, n), ...(p = (h = i[0]) == null ? void 0 : h.meta) != null && p.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Ln(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ee = (e) => ce(e, "yyyy-MM-dd");
function xu(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ee(t), ee(t)];
  if (n === "yesterday") {
    const o = pe(t, 1);
    return [ee(o), ee(o)];
  }
  if (n === "this week") return [ee(un(t)), ee(mn(t))];
  if (n === "this month") return [ee(Xe(t)), ee(Et(t))];
  if (n === "this quarter") return [ee(Ze(t)), ee(Pt(t))];
  if (n === "this year") return [ee(et(t)), ee(Ft(t))];
  if (n === "last week") {
    const o = nr(t, 1);
    return [ee(un(o)), ee(mn(o))];
  }
  if (n === "last month") {
    const o = tt(t, 1);
    return [ee(Xe(o)), ee(Et(o))];
  }
  if (n === "last quarter") {
    const o = nt(t, 1);
    return [ee(Ze(o)), ee(Pt(o))];
  }
  if (n === "last year") {
    const o = rt(t, 1);
    return [ee(et(o)), ee(Ft(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ee(pe(t, a - 1)), ee(t)] : i.startsWith("week") ? [ee(pe(t, a * 7 - 1)), ee(t)] : i.startsWith("month") ? [ee(Xe(tt(t, a))), ee(Et(tt(t, 1)))] : i.startsWith("quarter") ? [ee(Ze(nt(t, a))), ee(Pt(nt(t, 1)))] : [ee(et(rt(t, a))), ee(Ft(rt(t, 1)))];
}
function bt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Mu = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Ru(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Bt(e, t, n) {
  var r;
  if (ke(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function _u(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Bt(o, t, n);
    if (!bt(s))
      if (Array.isArray(s))
        for (const c of s)
          bt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? xu(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Tu(e, t, n) {
  if ("and" in e) {
    const r = mr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = mr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return _u(e, t, n);
}
function mr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Tu(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Ou(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Bt(e.granularity, t, n);
    bt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Bt(e.dateRange, t, n);
    bt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Ji(e, t, n) {
  const r = Mu(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Ou(i, r, t))), e.filters !== void 0) {
    const i = mr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = Bt(e.limit, r, t);
    bt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = Bt(e.offset, r, t);
    bt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Au() {
  let e, t;
  return (n, r, a) => {
    const i = Ji(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Du(e, t) {
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
class Lu extends Error {
}
const Eu = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Lu(`"${e}" cannot be parsed into a number`);
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
function Na(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Pu extends Error {
}
class Sa extends Error {
}
class Fu extends Error {
}
class Un extends Error {
}
class $u extends Error {
}
class Iu {
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
      throw new Sa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Na(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Fu(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Un(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Un(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, h = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof h == "number")
        o = this.cls.mul(o, h);
      else if (Na(h))
        o = this.cls.mul(o, this.convertFraction(h));
      else
        throw new Un("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new Sa(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const h = this.describe(m);
      if (o.indexOf(m) === -1 && h.system === c) {
        const f = this.to(m);
        if (i ? this.cls.gt(f, s) : this.cls.lt(f, s))
          continue;
        (u === null || (i ? this.cls.lte(f, s) && this.cls.gt(f, u.val) : this.cls.gte(f, s) && this.cls.lt(f, u.val))) && (u = {
          val: f,
          unit: m,
          singular: h.singular,
          plural: h.plural
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
        throw new $u(`Meausure "${t}" not found.`);
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
    throw new Pu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function zu(e) {
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
function Vu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = zu(e);
  return (r) => new Iu({
    measures: e,
    unitCache: n,
    cls: Eu
  }, r);
}
const ju = {
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
}, Wu = {
  systems: {
    metric: ju
  }
}, qu = {
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
}, Hu = {
  systems: {
    SI: qu
  }
}, Bu = {
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
}, Ku = {
  systems: {
    SI: Bu
  }
}, Uu = {
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
}, Gu = {
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
}, Yu = {
  systems: {
    metric: Uu,
    imperial: Gu
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
}, Qu = {
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
}, Ju = {
  systems: {
    SI: Qu
  }
}, Xu = {
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
}, Zu = {
  systems: {
    SI: Xu
  }
}, em = {
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
}, tm = {
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
}, nm = {
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
}, rm = {
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
}, am = {
  systems: {
    bit: em,
    byte: tm,
    IECBit: nm,
    IECByte: rm
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
}, im = {
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
}, om = {
  systems: {
    metric: im
  }
}, sm = {
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
}, lm = {
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
}, cm = {
  systems: {
    SI: sm,
    nutrition: lm
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
}, um = {
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
}, mm = {
  systems: {
    SI: um
  }
}, dm = {
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
}, hm = {
  systems: {
    SI: dm
  }
}, fm = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, pm = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, gm = {
  systems: {
    metric: fm,
    imperial: pm
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
}, vm = {
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
}, bm = {
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
}, ym = {
  systems: {
    metric: vm,
    imperial: bm
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
}, km = {
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
}, wm = {
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
}, Cm = {
  systems: {
    metric: km,
    imperial: wm
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
}, Nm = {
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
}, Sm = {
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
}, xm = {
  systems: {
    metric: Nm,
    imperial: Sm
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
}, Mm = {
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
}, Rm = {
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
}, _m = {
  systems: {
    metric: Mm,
    imperial: Rm
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
}, Tm = {
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
}, Om = {
  systems: {
    SI: Tm
  }
}, Am = {
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
}, Dm = {
  systems: {
    unit: Am
  }
}, Lm = {
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
}, Em = {
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
}, Pm = {
  systems: {
    metric: Lm,
    imperial: Em
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
}, Fm = {
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
}, $m = {
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
}, Im = {
  systems: {
    metric: Fm,
    imperial: $m
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
}, zm = {
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
}, Vm = {
  systems: {
    SI: zm
  }
}, jm = {
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
}, Wm = {
  systems: {
    SI: jm
  }
}, qm = {
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
}, Hm = {
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
}, Bm = {
  systems: {
    metric: qm,
    imperial: Hm
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
}, Km = {
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
}, Um = {
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
}, Gm = {
  systems: {
    metric: Km,
    imperial: Um
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
}, Ym = {
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
}, Qm = {
  systems: {
    SI: Ym
  }
}, Jm = {
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
}, Xm = {
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
}, Zm = {
  systems: {
    metric: Jm,
    imperial: Xm
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
}, ed = {
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
}, td = {
  systems: {
    SI: ed
  }
}, nd = {
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
}, rd = {
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
}, ad = {
  systems: {
    metric: nd,
    imperial: rd
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
}, id = {
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
}, od = {
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
}, sd = {
  systems: {
    metric: id,
    imperial: od
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
}, ld = {
  acceleration: Wu,
  angle: Hu,
  apparentPower: Ku,
  area: Yu,
  charge: Ju,
  current: Zu,
  digital: am,
  each: om,
  energy: cm,
  force: mm,
  frequency: hm,
  illuminance: gm,
  length: ym,
  mass: Cm,
  massFlowRate: xm,
  pace: _m,
  partsPer: Om,
  pieces: Dm,
  power: Pm,
  pressure: Im,
  reactiveEnergy: Vm,
  reactivePower: Wm,
  speed: Bm,
  torque: Zm,
  temperature: Gm,
  time: Qm,
  voltage: td,
  volume: ad,
  volumeFlowRate: sd
}, cd = Vu(ld), ud = {
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
function md(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => cd(t).from(e.from).to(e.to)
  };
}
const dr = {
  ...Object.fromEntries(
    Object.entries(ud).map(([e, t]) => [e, md(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function En(e) {
  return e ? { ...dr, ...e } : dr;
}
function dd(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function hd(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function fd(e) {
  return e != null && e.quantity ? hd(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const pd = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Xi(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function xa(e, t) {
  const n = e * (pd[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], o = i.map(([c, u], m) => {
    const h = m < i.length - 1 ? Math.floor(a / c) : Math.round(a / c);
    return a -= h * c, [h, u];
  }), s = o.findIndex((c) => c[0] > 0);
  if (s === -1) {
    const c = Math.abs(n);
    return c === 0 ? "0s" : c < 1e3 ? `${r}${Xi(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Gn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Xi((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function gd(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ma(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Zi(e = dr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Dr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return xa(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Ma(Gn(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return xa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Ma(Gn(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? gd(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Gn(n, t)}${u}`;
  };
}
const Pn = Ja(null);
Pn.displayName = "CubeVizContext";
function Ae() {
  const e = wr(Pn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Ye() {
  return Ae().families;
}
function vd(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function fv({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((y) => y.family).join("|"), u = X(
    () => jr(Vr, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = X(
    () => vd(e) ? xl(e) : e,
    [e]
  ), h = X(
    () => {
      var y;
      return {
        chartRamp: (y = t == null ? void 0 : t.chartRamp) != null && y.length ? t.chartRamp : it,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), p = X(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), f = X(() => a ?? {}, [a]), v = X(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), b = X(
    () => ({
      cubeClient: m,
      registry: f,
      families: u,
      locale: p,
      theme: h,
      maps: v
    }),
    [m, f, u, p, h, v]
  );
  return /* @__PURE__ */ l(Pn.Provider, { value: b, children: /* @__PURE__ */ l(
    "div",
    {
      className: M(
        "cv-root",
        h.mode === "dark" && "dark",
        h.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(
        Er,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      )
    }
  ) });
}
function qr({
  families: e,
  children: t
}) {
  const n = Ae(), r = (e ?? []).map((i) => i.family).join("|"), a = X(() => !e || e.length === 0 ? n : { ...n, families: jr(Vr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(ne, { children: t }) : /* @__PURE__ */ l(Pn.Provider, { value: a, children: t });
}
function bd(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const yd = 5e3;
function kd(e, t) {
  const { cubeClient: n } = Ae(), r = (t == null ? void 0 : t.skip) ?? !1, a = X(
    () => e.limit === void 0 ? { ...e, limit: yd } : e,
    [e]
  ), i = X(() => JSON.stringify(a), [a]), [o, s] = ft({ isLoading: !r }), [c, u] = ft(0), m = je(() => u((h) => h + 1), []);
  return Gt(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let h = !0;
    const p = new AbortController();
    return s((f) => ({ resultSet: f.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: p.signal }).then((f) => {
      h && s({
        resultSet: f,
        isLoading: !1
      });
    }).catch((f) => {
      h && s({
        isLoading: !1,
        error: f instanceof Error ? f : new Error(String(f))
      });
    }), () => {
      h = !1, p.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Fn = Ja(null);
Fn.displayName = "DashboardContext";
function Hr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = Je(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Du(r, t), key: r });
  const i = a.current.store, o = wd(i, r);
  return Ko(Fn.Provider, { value: o }, n);
}
function wd(e, t) {
  const n = je(
    (i, o) => e.set(i, o),
    [e]
  ), r = je(
    (i) => Ji(i, e.getAll(), t),
    [e, t]
  ), a = je(
    (i) => Ru(i, e.getAll(), t),
    [e, t]
  );
  return X(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Cd(e) {
  const t = Xa(e.store.subscribe, e.store.getAll, e.store.getAll);
  return X(
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
function eo() {
  const e = wr(Fn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Cd(e);
}
function $n() {
  return wr(Fn);
}
const Nd = () => () => {
};
function Yn(e, t, n) {
  var C;
  const r = $n(), { locale: a } = Ae(), i = Ye(), o = Je(null);
  o.current === null && (o.current = Au());
  const s = o.current, c = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !c, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), h = Xa(
    u && r ? r.store.subscribe : Nd,
    m,
    m
  ), { resultSet: p, isLoading: f, error: v, refetch: b } = kd(h, { skip: n == null ? void 0 : n.skip }), y = ((C = t.format) == null ? void 0 : C.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = X(() => En(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: X(() => {
    if (p)
      return ku(p, t, h, { unitSystem: y, conversions: w }, i);
  }, [p, t, h, y, w, i]), isLoading: f, error: v, refetch: b, resolvedQuery: h };
}
function Pe() {
  const { cubeClient: e } = Ae(), [t, n] = ft({ isLoading: !0 });
  return Gt(() => {
    let r = !0;
    return n({ isLoading: !0 }), Ml(e).then((a) => {
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
function pv() {
  const { locale: e } = Ae(), { formatValue: t, units: n } = e;
  return X(
    () => t ?? Zi(En(n)),
    [t, n]
  );
}
function to() {
  const [e, t] = ft(0), n = Je(null), r = Je(null), a = Je(null), i = Je(0), o = je((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = je(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = je(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const h = new ResizeObserver((p) => {
        var f, v;
        for (const b of p) {
          const y = ((v = (f = b.contentBoxSize) == null ? void 0 : f[0]) == null ? void 0 : v.inlineSize) ?? b.contentRect.width;
          o(y);
        }
      });
      h.observe(u), r.current = h;
    },
    [o, s]
  );
  return Gt(() => s, [s]), [c, e];
}
const Sd = "day";
function xd(e, t) {
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
        granularity: r.granularity ?? Sd,
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
const J = (e) => ce(e, "yyyy-MM-dd");
function Md(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = cn(e[0]), i = cn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = ms(i, a) + 1;
    return [J(pe(a, o)), J(pe(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = pe(t, 1);
    return [J(a), J(a)];
  }
  if (n === "yesterday") {
    const a = pe(t, 2);
    return [J(a), J(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [J(pe(t, 2 * a - 1)), J(pe(t, a))];
    if (i.startsWith("week")) return [J(pe(t, 14 * a - 1)), J(pe(t, 7 * a))];
    if (i.startsWith("month"))
      return [J(Xe(tt(t, 2 * a))), J(pe(Xe(tt(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [J(Ze(nt(t, 2 * a))), J(pe(Ze(nt(t, a)), 1))];
    if (i.startsWith("year"))
      return [J(et(rt(t, 2 * a))), J(pe(et(rt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = nr(t, 1);
    return [J(un(a)), J(mn(a))];
  }
  if (n === "this month") {
    const a = tt(t, 1);
    return [J(Xe(a)), J(Et(a))];
  }
  if (n === "this quarter") {
    const a = nt(t, 1);
    return [J(Ze(a)), J(Pt(a))];
  }
  if (n === "this year") {
    const a = rt(t, 1);
    return [J(et(a)), J(Ft(a))];
  }
  if (n === "last week") {
    const a = nr(t, 2);
    return [J(un(a)), J(mn(a))];
  }
  if (n === "last month") {
    const a = tt(t, 2);
    return [J(Xe(a)), J(Et(a))];
  }
  if (n === "last quarter") {
    const a = nt(t, 2);
    return [J(Ze(a)), J(Pt(a))];
  }
  if (n === "last year") {
    const a = rt(t, 2);
    return [J(et(a)), J(Ft(a))];
  }
}
function Rd(e, t, n = An) {
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
  const s = Md(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const _d = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Br({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var q;
  const { registry: c, locale: u } = Ae(), m = Ye(), h = ((q = m.get(t.family)) == null ? void 0 : q.queryless) ?? !1, p = X(() => {
    var D;
    return (D = t.format) != null && D.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), f = X(() => {
    const D = e ?? {};
    return D.timezone || !(u != null && u.timezone) ? D : { ...D, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: v, isLoading: b, error: y, refetch: w, resolvedQuery: S } = Yn(
    f,
    p,
    { skip: h }
  ), C = X(() => xd(f, p), [f, p]), x = Yn(
    (C == null ? void 0 : C.query) ?? f,
    (C == null ? void 0 : C.chart) ?? p,
    { skip: !C }
  ), N = X(
    () => Rd(S, p, m),
    [S, p, m]
  ), _ = Yn(
    (N == null ? void 0 : N.query) ?? f,
    p,
    { skip: !N, skipResolve: !0 }
  ), T = X(
    () => ({ [p.family]: bd(c, p.family, m) }),
    [c, p.family, m]
  ), P = X(() => {
    let D = v ?? _d;
    if (C && x.data) {
      D = { ...D, series: x.data.series, categories: x.data.categories };
      const U = D.raw.rows.length > 0, Y = D.series.some((j) => j.data.some((W) => W !== null));
      D = { ...D, empty: !U && !Y };
    }
    if (N && _.data) {
      if (N.mode === "kpiRow") {
        const U = _.data.raw.rows[0];
        if (U) {
          const Y = D.raw.rows[0];
          D = {
            ...D,
            raw: { ...D.raw, rows: Y ? [Y, U] : [U] }
          };
        }
      } else if (!_.data.empty) {
        const U = new Map(_.data.series.map((Y) => [Y.key, Y]));
        if (!D.empty && D.series.length > 0) {
          const Y = D.categories.length, j = D.series.map((W) => {
            const $ = U.get(W.key), B = Array.from({ length: Y }, (re, ie) => ($ == null ? void 0 : $.data[ie]) ?? null);
            return {
              ...W,
              key: `${W.key}__prev`,
              label: `${W.label} (prev)`,
              colorToken: W.colorToken,
              data: B,
              meta: { ...W.meta, companion: !0 }
            };
          });
          D = { ...D, series: [...D.series, ...j] };
        } else {
          const Y = _.data.series.map((j) => ({
            ...j,
            key: `${j.key}__prev`,
            label: `${j.label} (prev)`,
            data: [...j.data],
            meta: { ...j.meta, companion: !0 }
          }));
          D = {
            ...D,
            categories: _.data.categories,
            series: Y,
            empty: !1
          };
        }
      }
    }
    return D;
  }, [v, C, x.data, N, _.data]);
  Gt(() => {
    n == null || n({ rows: P.raw.rows, refetch: w, isLoading: b });
  }, [n, P.raw.rows, w, b]);
  const L = {}, A = X(
    () => u.formatValue ?? Zi(En(u.units)),
    [u.formatValue, u.units]
  ), F = X(
    () => Ai(P.raw.annotation, p, A, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [P.raw.annotation, p, A, u.locale, u.unitSystem]
  ), O = p.mapping, R = X(
    () => ({
      categoryMember: O == null ? void 0 : O.category.member,
      pivotMember: (O == null ? void 0 : O.series.mode) === "pivot" ? O.series.pivot : void 0,
      formatCategory: F.category
    }),
    [O, F]
  );
  return /* @__PURE__ */ l(
    Er,
    {
      widgetId: i,
      target: R,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        hu,
        {
          data: P,
          options: p,
          config: L,
          format: F,
          state: h ? { loading: !1 } : { loading: b && !v, error: y },
          components: T,
          registry: m,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function Td({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Br,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const no = "cube-viz-prose";
function Od(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Ad({ doc: e }) {
  const t = Od(e), n = X(
    () => t ? e : null,
    [t, e]
  ), r = yi(
    {
      extensions: [wi],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: M(no) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(ki, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const an = [
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
], Dd = Object.fromEntries(
  an.map((e) => [e.value, e.label])
);
function Ra(e) {
  return Dd[e.trim().toLowerCase()] ?? e;
}
const Ld = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Ed({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Ks(), a = M(Gi({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ g("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: M(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(xr, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: ce(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: M(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Yt, {})
      }
    )
  ] });
}
function Pd({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: M(
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
function ro({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Bs,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: M("cv-cal", e),
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
        MonthCaption: Ed,
        DayButton: Pd,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? xr : Yt, { className: M("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ l(dn.Root, { "data-slot": "popover", ...e });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ l(dn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function _e({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(dn.Portal, { children: /* @__PURE__ */ l(
    dn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: M("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Ce({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Root, { "data-slot": "select", ...e });
}
function hr({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Group, { "data-slot": "select-group", ...e });
}
function Ne({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Value, { "data-slot": "select-value", ...e });
}
function Se({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ g(
    ve.Trigger,
    {
      "data-slot": "select-trigger",
      className: M("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(ve.Icon, { asChild: !0, children: /* @__PURE__ */ l(Ke, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Fd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: M("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(ws, {})
    }
  );
}
function $d({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: M("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Ke, {})
    }
  );
}
function xe({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(ve.Portal, { children: /* @__PURE__ */ g(
    ve.Content,
    {
      "data-slot": "select-content",
      className: M(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Fd, {}),
        /* @__PURE__ */ l(
          ve.Viewport,
          {
            className: M(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l($d, {})
      ]
    }
  ) });
}
function fr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.Label,
    {
      "data-slot": "select-label",
      className: M("cv-select-label", e),
      ...t
    }
  );
}
function de({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ g(
    ve.Item,
    {
      "data-slot": "select-item",
      className: M("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(ve.ItemIndicator, { children: /* @__PURE__ */ l(Ue, {}) }) }),
        /* @__PURE__ */ l(ve.ItemText, { children: t })
      ]
    }
  );
}
const yt = "cv-field", Id = "cv-field-label", Ot = "yyyy-MM-dd";
function zd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function _a(e) {
  if (!e) return;
  const t = ai(e, Ot, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Vd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Ld, [i, o] = ft(!1), s = typeof e == "string", [c, u] = zd(e), m = _a(c), h = _a(u), p = m ? { from: m, to: h } : void 0;
  let f;
  s ? f = Ra(e) : m && h ? f = `${ce(m, "MMM d, yyyy")} – ${ce(h, "MMM d, yyyy")}` : m ? f = ce(m, "MMM d, yyyy") : f = "Pick a date range";
  const v = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ g(Me, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(
      K,
      {
        variant: "outline",
        className: M(
          "cv-daterange-trigger",
          f === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(li, {}),
          f
        ]
      }
    ) }),
    /* @__PURE__ */ g(_e, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((b) => /* @__PURE__ */ l(
        K,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(b), o(!1);
          },
          children: Ra(b)
        },
        b
      )) }),
      /* @__PURE__ */ l(
        ro,
        {
          mode: "range",
          selected: p,
          defaultMonth: m,
          disabled: v,
          onSelect: (b) => {
            b != null && b.from && b.to ? t([ce(b.from, Ot), ce(b.to, Ot)]) : b != null && b.from ? t([ce(b.from, Ot), ce(b.from, Ot)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const jd = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Wd(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function qd(e) {
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
function Hd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = eo(), i = r.rangeVariable ? qd(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? Wd(i) : jd), s = typeof e == "string" ? e : "", c = o.join(",");
  return Gt(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ g(
    Ce,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Se, { className: yt, children: /* @__PURE__ */ l(Ne, { placeholder: "—" }) }),
        /* @__PURE__ */ l(xe, { children: o.map((u) => /* @__PURE__ */ l(de, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Bd({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: M(yt, "cv-field--multi"),
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
  return /* @__PURE__ */ g(
    Ce,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Se, { className: yt, children: /* @__PURE__ */ l(Ne, { placeholder: "—" }) }),
        /* @__PURE__ */ l(xe, { children: r.options.map((i) => /* @__PURE__ */ l(de, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Kd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = Pe(), o = X(() => {
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
  return /* @__PURE__ */ g(
    "select",
    {
      className: yt,
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
function Ud({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: yt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function Gd({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: yt,
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
function Yd({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ g("label", { className: "cv-toggle", children: [
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
const Qd = {
  dateRange: Vd,
  granularity: Hd,
  select: Bd,
  memberSelect: Kd,
  text: Ud,
  number: Gd,
  toggle: Yd
};
function Jd({ control: e, title: t }) {
  var f;
  const { registry: n } = Ae(), { decls: r, resolveValue: a, setVar: i } = eo(), o = X(
    () => r.find((v) => v.name === e.variable),
    [r, e.variable]
  ), s = Uo();
  if (!o)
    return /* @__PURE__ */ g("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((f = n.controls) == null ? void 0 : f[c]) ?? Qd[c], m = a(e.variable), h = (v) => i(e.variable, v), p = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: h, decl: o, control: e.control }) : /* @__PURE__ */ g("div", { children: [
    /* @__PURE__ */ l("label", { className: Id, htmlFor: s, children: p }),
    /* @__PURE__ */ l(
      u,
      {
        value: m,
        onChange: h,
        decl: o,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const ao = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: M(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
ao.displayName = "Card";
const io = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: M(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
io.displayName = "CardHeader";
const oo = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: M("cv-card-title", e),
      ...t
    }
  )
);
oo.displayName = "CardTitle";
const Xd = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-description", e), ...t })
);
Xd.displayName = "CardDescription";
const Zd = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: M("cv-card-action", e),
      ...t
    }
  )
);
Zd.displayName = "CardAction";
const so = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-content", e), ...t })
);
so.displayName = "CardContent";
const eh = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-footer", e), ...t })
);
eh.displayName = "CardFooter";
const vn = "cube-viz-drag-handle";
function lo(e) {
  var s;
  const { registry: t } = Ae(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ g(ao, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ g(
      io,
      {
        ...i,
        className: M(vn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(oo, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(so, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class Ta extends Go {
  constructor() {
    super(...arguments);
    ra(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ g(Mn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Sr, {}),
      /* @__PURE__ */ l(Rn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(_n, { children: n.message })
    ] }) : this.props.children;
  }
}
function th(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function nh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function rh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const ah = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function We(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let ct = null;
function co(e = {}) {
  return ct || (e.includeStyleProperties ? (ct = e.includeStyleProperties, ct) : (ct = We(window.getComputedStyle(document.documentElement)), ct));
}
function bn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function ih(e) {
  const t = bn(e, "border-left-width"), n = bn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function oh(e) {
  const t = bn(e, "border-top-width"), n = bn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function uo(e, t = {}) {
  const n = t.width || ih(e), r = t.height || oh(e);
  return { width: n, height: r };
}
function sh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ye = 16384;
function lh(e) {
  (e.width > ye || e.height > ye) && (e.width > ye && e.height > ye ? e.width > e.height ? (e.height *= ye / e.width, e.width = ye) : (e.width *= ye / e.height, e.height = ye) : e.width > ye ? (e.height *= ye / e.width, e.width = ye) : (e.width *= ye / e.height, e.height = ye));
}
function yn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function ch(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function uh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), ch(a);
}
const be = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || be(n, t);
};
function mh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function dh(e, t) {
  return co(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function hh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? mh(n) : dh(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function Oa(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = ah();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(hh(o, n, a, r)), t.appendChild(s);
}
function fh(e, t, n) {
  Oa(e, t, ":before", n), Oa(e, t, ":after", n);
}
const Aa = "application/font-woff", Da = "image/jpeg", ph = {
  woff: Aa,
  woff2: Aa,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Da,
  jpeg: Da,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function gh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Kr(e) {
  const t = gh(e).toLowerCase();
  return ph[t] || "";
}
function vh(e) {
  return e.split(/,/)[1];
}
function pr(e) {
  return e.search(/^(data:)/) !== -1;
}
function bh(e, t) {
  return `data:${t};base64,${e}`;
}
async function mo(e, t, n) {
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
const Qn = {};
function yh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Ur(e, t, n) {
  const r = yh(e, t, n.includeQueryParams);
  if (Qn[r] != null)
    return Qn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await mo(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), vh(s)));
    a = bh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return Qn[r] = a, a;
}
async function kh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : yn(t);
}
async function wh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return yn(s);
  }
  const n = e.poster, r = Kr(n), a = await Ur(n, r, t);
  return yn(a);
}
async function Ch(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await In(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Nh(e, t) {
  return be(e, HTMLCanvasElement) ? kh(e) : be(e, HTMLVideoElement) ? wh(e, t) : be(e, HTMLIFrameElement) ? Ch(e, t) : e.cloneNode(ho(e));
}
const Sh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", ho = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function xh(e, t, n) {
  var r, a;
  if (ho(t))
    return t;
  let i = [];
  return Sh(e) && e.assignedNodes ? i = We(e.assignedNodes()) : be(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = We(e.contentDocument.body.childNodes) : i = We(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || be(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => In(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Mh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : co(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), be(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Rh(e, t) {
  be(e, HTMLTextAreaElement) && (t.innerHTML = e.value), be(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function _h(e, t) {
  if (be(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Th(e, t, n) {
  return be(t, Element) && (Mh(e, t, n), fh(e, t, n), Rh(e, t), _h(e, t)), t;
}
async function Oh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await In(u, t, !0));
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
async function In(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Nh(r, t)).then((r) => xh(e, r, t)).then((r) => Th(e, r, t)).then((r) => Oh(r, t));
}
const fo = /url\((['"]?)([^'"]+?)\1\)/g, Ah = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Dh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Lh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Eh(e) {
  const t = [];
  return e.replace(fo, (n, r, a) => (t.push(a), n)), t.filter((n) => !pr(n));
}
async function Ph(e, t, n, r, a) {
  try {
    const i = n ? rh(t, n) : t, o = Kr(t);
    let s;
    return a || (s = await Ur(i, o, r)), e.replace(Lh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Fh(e, { preferredFontFormat: t }) {
  return t ? e.replace(Dh, (n) => {
    for (; ; ) {
      const [r, , a] = Ah.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function po(e) {
  return e.search(fo) !== -1;
}
async function go(e, t, n) {
  if (!po(e))
    return e;
  const r = Fh(e, n);
  return Eh(r).reduce((i, o) => i.then((s) => Ph(s, o, t, n)), Promise.resolve(r));
}
async function ut(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await go(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function $h(e, t) {
  await ut("background", e, t) || await ut("background-image", e, t), await ut("mask", e, t) || await ut("-webkit-mask", e, t) || await ut("mask-image", e, t) || await ut("-webkit-mask-image", e, t);
}
async function Ih(e, t) {
  const n = be(e, HTMLImageElement);
  if (!(n && !pr(e.src)) && !(be(e, SVGImageElement) && !pr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Ur(r, Kr(r), t);
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
async function zh(e, t) {
  const r = We(e.childNodes).map((a) => vo(a, t));
  await Promise.all(r).then(() => e);
}
async function vo(e, t) {
  be(e, Element) && (await $h(e, t), await Ih(e, t), await zh(e, t));
}
function Vh(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const La = {};
async function Ea(e) {
  let t = La[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, La[e] = t, t;
}
async function Pa(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), mo(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function Fa(e) {
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
async function jh(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        We(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = Ea(c).then((m) => Pa(m, t)).then((m) => Fa(m).forEach((h) => {
              try {
                a.insertRule(h, h.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (p) {
                console.error("Error inserting rule from remote css", {
                  rule: h,
                  error: p
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
        a.href != null && r.push(Ea(a.href).then((s) => Pa(s, t)).then((s) => Fa(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        We(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function Wh(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => po(t.style.getPropertyValue("src")));
}
async function qh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = We(e.ownerDocument.styleSheets), r = await jh(n, t);
  return Wh(r);
}
function bo(e) {
  return e.trim().replace(/["']/g, "");
}
function Hh(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(bo(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Bh(e, t) {
  const n = await qh(e, t), r = Hh(e);
  return (await Promise.all(n.filter((i) => r.has(bo(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return go(i.cssText, o, t);
  }))).join(`
`);
}
async function Kh(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Bh(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Uh(e, t = {}) {
  const { width: n, height: r } = uo(e, t), a = await In(e, t, !0);
  return await Kh(a, t), await vo(a, t), Vh(a, t), await uh(a, n, r);
}
async function Gh(e, t = {}) {
  const { width: n, height: r } = uo(e, t), a = await Uh(e, t), i = await yn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || sh(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || lh(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function Yh(e, t = {}) {
  return (await Gh(e, t)).toDataURL();
}
function Qh(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Jh(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Xh(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Zh(e, t, n = 2) {
  const r = await Yh(e, {
    pixelRatio: n,
    backgroundColor: Xh(e),
    cacheBust: !0
  });
  Jh(r, `${Qh(t)}.png`);
}
function ef({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = k.useState(!1), [o, s] = k.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const v = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    nh(th(t), `${v}.csv`);
  }, h = async () => {
    const v = r == null ? void 0 : r.current;
    if (!(!v || a)) {
      i(!0), s(null);
      try {
        await Zh(v, e);
      } catch (b) {
        s(b instanceof Error ? b.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, p = (v) => v.stopPropagation(), f = (v = !0) => M("cv-menu-item", !v && "cv-menu-item--disabled");
  return /* @__PURE__ */ g(Me, { children: [
    /* @__PURE__ */ l(
      Re,
      {
        onMouseDown: p,
        onPointerDown: p,
        onTouchStart: p,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Cs, {})
      }
    ),
    /* @__PURE__ */ g(_e, { align: "end", className: "cv-menu", onMouseDown: p, onPointerDown: p, onTouchStart: p, children: [
      n ? /* @__PURE__ */ g("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ l(Ns, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ g("button", { type: "button", onClick: h, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ l(Ss, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ g("button", { type: "button", onClick: m, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ l(xs, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function $a({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        Br,
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
      return /* @__PURE__ */ l(Ad, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Jd, { control: e.control, title: e.title });
  }
}
function gr({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = ft({ rows: [] }), s = je(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = Je(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Ta, { children: /* @__PURE__ */ l($a, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    ef,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    lo,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Ta, { children: /* @__PURE__ */ l(
        $a,
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
const yo = (e) => e.filter((t) => t.type === "chart");
function tf(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of yo(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && ke(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function nf(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(ke);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of yo(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function rf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n,
  children: r
}) {
  const a = $n(), i = a == null ? void 0 : a.setVar, o = k.useMemo(() => tf(e.widgets), [e.widgets]), s = k.useMemo(() => nf(e.widgets), [e.widgets]), c = k.useRef({ onRangeSelect: t, onPointSelect: n });
  c.current = { onRangeSelect: t, onPointSelect: n };
  const u = k.useCallback(
    (f) => {
      var v, b;
      if (i) {
        const y = f != null && f.widgetId ? o.get(f.widgetId) : void 0;
        if (y) i(y, f ? [f.from, f.to] : void 0);
        else if (!f) for (const w of new Set(o.values())) i(w, void 0);
      }
      (b = (v = c.current).onRangeSelect) == null || b.call(v, f);
    },
    [i, o]
  ), m = k.useCallback(
    (f) => {
      var v, b;
      if (i)
        if (f) {
          const y = s.get(f.member);
          y && i(y, [String(f.value)]);
        } else
          for (const y of new Set(s.values())) i(y, void 0);
      (b = (v = c.current).onPointSelect) == null || b.call(v, f);
    },
    [i, s]
  ), h = !!(t || i && o.size), p = !!(n || i && s.size);
  return /* @__PURE__ */ l(
    Er,
    {
      onRangeSelect: h ? u : void 0,
      onPointSelect: p ? m : void 0,
      children: r
    }
  );
}
const af = "lg", of = 640;
function sf(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function lf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function gv({
  spec: e,
  editable: t = !1,
  families: n,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = to(), s = e.grid ?? {}, c = s.cols ?? 12, u = s.rowHeight ?? 40, m = s.margin ?? [12, 12], h = s.containerPadding ?? m, p = X(
    () => ({ [af]: lf(e.layout) }),
    [e.layout]
  ), f = X(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  ), v = !t && o > 0 && o < of;
  return /* @__PURE__ */ l(qr, { families: n, children: /* @__PURE__ */ l(Hr, { spec: e, children: /* @__PURE__ */ l(rf, { spec: e, onRangeSelect: r, onPointSelect: a, children: /* @__PURE__ */ l("div", { ref: i, className: "cv-dashboard", children: o <= 0 ? null : v ? /* @__PURE__ */ l(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: m[1],
        padding: `${h[1]}px ${h[0]}px`
      },
      children: sf(e.layout).map((b) => {
        const y = f.get(b.i);
        if (!y) return null;
        const w = b.h * u + (b.h - 1) * m[1];
        return /* @__PURE__ */ l("div", { style: { height: w }, children: /* @__PURE__ */ l(gr, { widget: y, editable: !1 }) }, b.i);
      })
    }
  ) : /* @__PURE__ */ l(
    bi,
    {
      width: o,
      layouts: p,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: u,
      margin: m,
      containerPadding: h,
      dragConfig: { enabled: t, handle: `.${vn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = f.get(b.i);
        return y ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(gr, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) }) }) }) });
}
function vv({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(qr, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    lo,
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
        Td,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function zn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function cf(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function De(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Vn(e) {
  return e ? e.cubes.filter((t) => De(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: zn(t),
    joinTargets: cf(t)
  })) : [];
}
function It(e, t) {
  if (!(!e || !t))
    return Vn(e).find((n) => n.name === t);
}
function Gr(e) {
  return e.shortTitle || e.title || e.name;
}
function ot(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function ko(e) {
  return ot(e.meta, "group");
}
function uf(e) {
  return ot(e.meta, "geoPoint");
}
function Ia(e) {
  const t = ot(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function mf(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function on(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function df(e, t) {
  if (t)
    return Kt(e, "time", t).find(on);
}
function hf(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = ko(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function wo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ot(n, "quantity"),
    unit: ot(n, "unit")
  };
}
function sn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ot(n, "quantity"),
    unit: ot(n, "unit")
  };
}
function Co(e, t) {
  return {
    name: e.name,
    label: Gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function ff(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = uf({ meta: i });
    !o || !De(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Ia({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Ia({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: mf(o[0].name, s[0].name),
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
function Kt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!De(a) || n && a.name !== n) continue;
    const i = zn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...ff(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        De(s) && o(wo(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        De(s) && s.type !== "time" && o(sn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        De(s) && s.type === "time" && o(sn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        De(s) && s.type === "number" && o(sn(s, a.name));
  }
  return r;
}
function pf(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!De(a) || n && !n.has(a.name)) continue;
    const i = zn(a);
    for (const o of a.segments) {
      if (!De(o)) continue;
      const s = Co(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Le(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = zn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(wo(i, n.name)) : a(sn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Co(o, n.name));
    }
    return Kt(e, "geoPoint").find((n) => n.name === t);
  }
}
function za(e) {
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
const vr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), No = {
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
function gf(e) {
  return e === "number";
}
function jn(e) {
  return e.target !== void 0;
}
function mt(e, t) {
  return e.kinds.includes(t);
}
function st(e) {
  return e.chart.familyOptions ?? {};
}
function Yr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function So(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function vf(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function bf(e, t, n) {
  var o, s;
  const r = e.chart;
  if (Yr(r)) return;
  const a = Jt(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = st(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Nt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = st(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!jn(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = Jt(a);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = So(a), h = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, h);
        break;
      }
      case "pivot": {
        const m = Yr(a) ?? bf(e, t, n);
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
        r[c.id] = m.map((h) => h && typeof h == "object" ? h.member : void 0).filter((h) => typeof h == "string");
        break;
      }
    }
  }
  return r;
}
function Qr(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Jr(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function yf(e, t) {
  return { ...e, dimensions: Qr(e.dimensions, t) };
}
function xo(e, t) {
  const n = Jr(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Mo(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function kf(e) {
  const t = wf(e);
  return t === void 0 ? Rf : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function wf(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Rt(e, t, n, r) {
  if (gf(n)) return { ...e, measures: Qr(e.measures, t) };
  if (n === "time") {
    const a = Xt(e) ?? r;
    return Mo(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? kf(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return yf(e, t);
}
function At(e, t, n, r) {
  const a = e.query ?? {}, i = Nt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = Xt(a);
  if ((o == null ? void 0 : o.dimension) === n) return Mo(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = Jr(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return xo(a, n);
}
function Cf(e, t, n, r) {
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
  return { category: { member: e }, series: To(t, r) };
}
function zt(e, t, n) {
  var c, u;
  const r = Nt(e, t, n), a = (m) => t.find((h) => {
    var p;
    return ((p = h.target) == null ? void 0 : p.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : Jt(e.chart),
    measures: o ? r[o.id] ?? [] : So(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Yr(e.chart)
  };
}
function Vt(e, t, n) {
  const r = { ..._o(e.chart), ...vf(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Cf(n.category, n.measures, n.pivot, r)
    }
  };
}
function kn(e, t, n) {
  const r = { ...st(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Xr(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !jn(i)) return e;
  const o = i.target, s = Nt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = Xt(c);
      u && u !== r && (c = At(e, t, u, n)), c = Rt(c, r, a, m);
      const h = zt({ ...e, query: c }, t, [r]);
      return Vt(e, c, { ...h, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Qr(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = At(e, t, s[0], n)), c = Rt(c, r, a);
      const m = zt({ ...e, query: c }, t, [r]);
      return Vt(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = At(e, t, u, n)), c = Rt(c, r, a);
      const m = zt({ ...e, query: c }, t, [r]);
      return Vt(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = At(e, t, u, n)), c = Rt(c, r, a), kn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(st(e)[o.key]) ? [...st(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = Rt(c, r, a), kn(e, c, { [o.key]: u });
    }
  }
}
function Nf(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !jn(a)) return e;
  const i = a.target, o = At(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = zt(e, t), c = Jr(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : xo(o, s.pivot);
      return Vt(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = zt(e, t);
      return Vt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return kn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(st(e)[i.key]) ? st(e)[i.key] : [];
      return kn(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Sf(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = Xt(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function xf(e, t) {
  if (mt(t, e)) return e;
  if (e === "category" && mt(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && mt(t, "category") || e === "time" && mt(t, "category")) return "category";
}
function Mf(e, t, n) {
  const r = Nt(e, t), a = /* @__PURE__ */ new Map();
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
    if (!jn(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = xf(Sf(e, u), o);
      m && (i = Xr(i, n, o.id, u, m));
    }
  }
  return i;
}
function Dt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Ro(e) {
  var o, s, c, u, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return Dt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Dt(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return Dt(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Dt(i);
}
function br(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function _o(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Jt(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Xt(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function To(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Rf = "day";
function yr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function _f(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = yr(r) && yr(a) ? Mf(e, r.wells, a.wells) : Tf(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Tf(e, t) {
  var f;
  const { chart: n } = e, r = e.query ?? {}, a = br(n).length ? br(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((v) => v.dimension), o = Jt(n) ?? ((f = r.dimensions) == null ? void 0 : f[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (v, b, y) => !!v && y.indexOf(v) === b
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!yr(t)) {
    const v = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: v } } : c;
  }
  const u = [...a], m = [...s], h = (v) => i.includes(v) ? "time" : "category";
  let p = c;
  for (const v of t.wells) {
    if (!v.target || !v.channel) continue;
    const b = mt(v, "category") ? [
      [m, h],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, h]
    ];
    let y = 0;
    for (const [w, S] of b)
      for (let C = 0; C < w.length; ) {
        if (v.cardinality === "one" && y > 0 || !mt(v, S(w[C]))) {
          C += 1;
          continue;
        }
        p = Xr(p, t.wells, v.id, w[C], S(w[C])), w.splice(C, 1), y += 1;
      }
  }
  return p;
}
function Va(e) {
  return dd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Oo(e) {
  return fd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Of(e, t) {
  return t.require(e).wells;
}
function Ao(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Nt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function en(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Xr(e, o.wells, n, r, a);
  return Df(e, s, o.wells);
}
function Af(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = Nf(e, i.wells, n, r);
  return Do(e, o, i.wells);
}
function Df(e, t, n) {
  return Lf(e, Do(e, t, n));
}
function Lf(e, t) {
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
function Do(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(Nt(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
const le = k.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ l(
    "input",
    {
      ref: r,
      type: t,
      "data-slot": "input",
      className: M("cv-input", e),
      ...n
    }
  )
);
le.displayName = "Input";
function wn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(ui, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(rr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(ci, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Mr, { className: "cv-member-type-icon" });
  }
}
function Lo({
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
  const { meta: u, isLoading: m } = Pe(), h = k.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return Kt(u, n).filter((y) => b.has(y.cube));
    }
    return Kt(u, n, e);
  }, [u, n, e, t]), p = k.useMemo(() => {
    const b = Ef(h), y = b.length > 1, w = [];
    for (const [S, C] of b)
      for (const [x, N] of hf(C, () => "Other")) {
        const _ = y ? x === "Other" ? S : `${S} · ${x}` : x;
        w.push({ key: `${S}:${x}`, label: _, items: N });
      }
    return w;
  }, [h]), f = p.length > 1, v = h.find((b) => b.name === r);
  return /* @__PURE__ */ g(Ce, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(Se, { id: s, className: c, children: /* @__PURE__ */ l(Ne, { placeholder: m ? "Loading…" : i, children: v ? /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
      wn(v.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(xe, { children: p.map((b) => /* @__PURE__ */ g(hr, { children: [
      f && b.label ? /* @__PURE__ */ l(fr, { children: b.label }) : null,
      b.items.map((y) => /* @__PURE__ */ l(de, { value: y.name, children: /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
        wn(y.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: y.label })
      ] }) }, y.name))
    ] }, b.key)) })
  ] });
}
function Ef(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ut({
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
      className: M("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: M(
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
const ja = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(ci, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(rr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(rr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Mr, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(ui, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Pf = ["geoPoint", "number", "numberDimension", "category", "time"];
function Eo({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: i = "start",
  side: o = "bottom",
  children: s
}) {
  var F, O;
  const { meta: c, isLoading: u } = Pe(), [m, h] = k.useState(!1), [p, f] = k.useState(""), [v, b] = k.useState(n.viewLocked ?? "tables"), [y, w] = k.useState({});
  k.useEffect(() => {
    m && b(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const S = k.useMemo(() => new Set(t), [t]), C = p.trim().toLowerCase(), x = k.useMemo(() => {
    if (v !== "tables") {
      const q = n.views.find((D) => D.name === v) ?? It(c, v);
      return q ? [{ cube: q, tag: "dataset" }] : [];
    }
    const R = [];
    n.sourceCube && R.push({ cube: n.sourceCube, tag: "source" });
    for (const q of n.relatedCubes) R.push({ cube: q, tag: "related" });
    return R;
  }, [v, n, c]), N = e.kinds.length > 1, _ = (R) => {
    const q = [], D = /* @__PURE__ */ new Map();
    for (const U of Pf) {
      if (!e.kinds.includes(U)) continue;
      const Y = ja[U];
      let j = Kt(c, Y.metaKind, R);
      U === "time" && (j = [...j].sort(
        (W, $) => Number(on($)) - Number(on(W))
      ));
      for (const W of j) {
        if (S.has(W.name) || C && !(W.label.toLowerCase().includes(C) || W.name.toLowerCase().includes(C))) continue;
        const $ = ko(W), B = $ ? `g:${$.toLowerCase()}` : `k:${Y.label}`;
        let re = D.get(B);
        re || (re = { key: B, label: $ ?? Y.label, headerIcon: $ ? void 0 : Y.icon, items: [] }, D.set(B, re), q.push(B)), re.items.push({ option: W, kind: U });
      }
    }
    return q.map((U) => D.get(U));
  }, T = x.map((R) => ({ section: R, groups: _(R.cube.name) })).filter((R) => R.groups.length > 0), P = T.length > 0, L = (R, q) => {
    a(R, q), h(!1), f("");
  }, A = v === "tables" ? "All related tables" : ((F = n.views.find((R) => R.name === v)) == null ? void 0 : F.title) ?? ((O = It(c, v)) == null ? void 0 : O.title) ?? v;
  return /* @__PURE__ */ g(Me, { open: m, onOpenChange: h, children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: s }),
    /* @__PURE__ */ g(_e, { align: i, side: o, className: "cv-picker", children: [
      /* @__PURE__ */ g("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ g("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Ms, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (R) => f(R.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ l(
          Ff,
          {
            browse: v,
            label: A,
            views: n.viewLocked ? n.views.filter((R) => R.name === n.viewLocked) : [],
            onBrowse: b
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: P ? T.map(({ section: R, groups: q }, D) => {
        const U = q.reduce(($, B) => $ + B.items.length, 0), Y = R.tag === "related", j = y[R.cube.name] ?? Y, W = C.length > 0 ? !0 : !j;
        return /* @__PURE__ */ g("div", { children: [
          R.tag === "related" && D > 0 && T[D - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => w(($) => ({ ...$, [R.cube.name]: !j })),
              className: "cv-picker-table",
              children: [
                W ? /* @__PURE__ */ l(Ke, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(Yt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(mi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: R.cube.title }),
                R.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : R.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: U })
              ]
            }
          ),
          W ? q.map(($) => /* @__PURE__ */ g("div", { className: "cv-picker-group", children: [
            q.length > 1 ? /* @__PURE__ */ g("div", { className: "cv-picker-group-header", children: [
              $.headerIcon,
              $.label
            ] }) : null,
            $.items.map(({ option: B, kind: re }) => /* @__PURE__ */ l(
              $f,
              {
                option: B,
                kindIcon: N ? ja[re].icon : void 0,
                badge: re === "time" && on(B) ? "default" : void 0,
                reason: r(B),
                onPick: () => L(B.name, re)
              },
              B.name
            ))
          ] }, $.key)) : null
        ] }, R.cube.name);
      }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Ff({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = k.useState(!1), o = (s) => {
    r(s), i(!1);
  };
  return /* @__PURE__ */ g(Me, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ g(
      Re,
      {
        className: "cv-picker-source-trigger",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ l(di, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ g(_e, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Wa, { active: e === "tables", icon: /* @__PURE__ */ l(mi, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ g(ne, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ l(
          Wa,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ l(Rr, { className: "cv-ec-icon" }),
            onClick: () => o(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Wa({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: n,
      className: M(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Ue, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function $f({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
  return t ? /* @__PURE__ */ g(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ g("span", { className: "cv-picker-row-main", children: [
          r,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e.label })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: "Not available" })
      ]
    }
  ) : /* @__PURE__ */ g(
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
const If = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Lt = "yyyy-MM-dd";
function zf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function qa(e) {
  if (!e) return;
  const t = ai(e, Lt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Zr({ value: e, onChange: t }) {
  const [n, r] = k.useState(!1), a = typeof e == "string", [i, o] = zf(e), s = qa(i), c = qa(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${ce(s, "MMM d, yyyy")} – ${ce(c, "MMM d, yyyy")}` : s ? ce(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ g(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(K, { variant: "outline", size: "sm", className: M("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(li, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: M("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ g(_e, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ g("div", { className: "cv-daterange-presets", children: [
        If.map((h) => /* @__PURE__ */ l(
          K,
          {
            variant: "ghost",
            size: "sm",
            className: M("cv-daterange-preset", e === h && "cv-daterange-preset--active"),
            onClick: () => {
              t(h), r(!1);
            },
            children: h
          },
          h
        )),
        /* @__PURE__ */ l(
          K,
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
        ro,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([ce(h.from, Lt), ce(h.to, Lt)]) : h != null && h.from ? t([ce(h.from, Lt), ce(h.from, Lt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Vf(e) {
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
function jf(e, t) {
  const n = new Set(Vf(t));
  return e.filter((r) => n.has(r.type));
}
function Wf(e) {
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
function qf(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function Hf(e, t, n) {
  const r = Wf(e), a = { name: qf(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Po = k.createContext({});
function Bf({
  createVariable: e,
  children: t
}) {
  const n = k.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Po.Provider, { value: n, children: t });
}
function Kf() {
  return k.useContext(Po);
}
function Uf({ kind: e, value: t, onChange: n, className: r }) {
  const a = $n(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Kf(), [s, c] = k.useState(!1), [u, m] = k.useState(!1), [h, p] = k.useState(""), f = k.useMemo(() => jf(i, e), [i, e]), v = f.find((w) => w.name === t), b = (w) => {
    n(w), c(!1), m(!1);
  }, y = () => {
    if (!o) return;
    const w = Hf(e, h || "Variable", i);
    o(w), b(w.name), p("");
  };
  return /* @__PURE__ */ g(
    Me,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(K, { variant: "outline", size: "sm", className: M("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Rs, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: M("cv-var-trigger-label", !v && "cv-var-trigger-label--placeholder"), children: v ? v.label ?? v.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ g(_e, { align: "start", className: "cv-var-popover", children: [
          f.length > 0 ? f.map((w) => /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => b(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Ue, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ g("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              le,
              {
                autoFocus: !0,
                value: h,
                onChange: (w) => p(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && y(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(K, { size: "sm", className: "cv-var-new-add", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function kt({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = ke(t), [i, o] = k.useState(a ? "var" : "fixed");
  k.useEffect(() => {
    a && o("var");
  }, [a]);
  const s = (c) => M("cv-bind-seg", c && "cv-bind-seg--active");
  return /* @__PURE__ */ g("div", { className: "cv-bind", children: [
    /* @__PURE__ */ g("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: s(i === "fixed"),
          onClick: () => {
            o("fixed"), ke(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: s(i === "var"), onClick: () => o("var"), children: "Variable" })
    ] }),
    i === "var" ? /* @__PURE__ */ l(
      Uf,
      {
        kind: e,
        value: ke(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(ke(t) ? void 0 : t, (c) => n(c))
  ] });
}
const Gf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Jn(e) {
  return "member" in e && "operator" in e;
}
function Yf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var A;
  const { meta: s } = Pe(), c = ((A = $n()) == null ? void 0 : A.decls) ?? [], [u, m] = k.useState(null), [h, p] = k.useState(null), f = r ?? [], v = f.length === 1 && !Jn(f[0]) && "or" in f[0] && Array.isArray(f[0].or) && f[0].or.every(Jn) ? f[0] : void 0, b = v ? "any" : "all", y = [], w = [];
  v || f.forEach((F) => Jn(F) ? y.push(F) : w.push(F));
  const S = v ? v.or : y, C = w.length === 0 && (S.length >= 2 || b === "any"), x = (F) => b === "any" ? F.length ? [{ or: F }] : [] : [...F, ...w], N = (F) => {
    const O = F.filter((q) => q.member.length > 0), R = x(O);
    a(R.length > 0 ? R : void 0);
  }, _ = (F) => {
    const O = F === "any" ? S.length ? [{ or: S }] : [] : [...S];
    a(O.length > 0 ? O : void 0);
  }, T = (F, O) => N(S.map((R, q) => q === F ? { ...R, ...O } : R)), P = (F) => N(S.filter((O, R) => R !== F)), L = (F) => {
    const R = { ...h ?? { member: "", operator: "equals", values: [] }, ...F };
    R.member ? (p(null), m(S.length), N([...S, R])) : p(R);
  };
  return /* @__PURE__ */ g("div", { "data-slot": "filter-builder", className: M("cv-filter-builder", o), children: [
    S.length === 0 && !h ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ g("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Ut,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: b,
          onChange: _
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    S.map((F, O) => {
      const R = Le(s, F.member);
      return u === O ? /* @__PURE__ */ l(
        Ha,
        {
          leaf: F,
          member: R,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (q) => T(O, q),
          onDone: () => m(null),
          onRemove: () => P(O)
        },
        O
      ) : /* @__PURE__ */ l(
        Qf,
        {
          text: Jf(F, R == null ? void 0 : R.label, c),
          disabled: i,
          onEdit: () => m(O),
          onRemove: () => P(O)
        },
        O
      );
    }),
    h ? /* @__PURE__ */ l(
      Ha,
      {
        leaf: h,
        member: Le(s, h.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: L,
        onRemove: () => p(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ g("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ g(
      K,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!h,
        onClick: () => {
          m(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(gt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Qf({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ g("div", { className: "cv-filter-summary", children: [
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
      K,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(wt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function Ha({
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
  const { meta: u } = Pe(), m = za(t == null ? void 0 : t.type), h = m.includes(e.operator) ? e.operator : m[0], p = !vr.has(h);
  k.useEffect(() => {
    h !== e.operator && o({ operator: h });
  }, [e.operator, o, h]);
  const f = (v) => {
    const b = Le(u, v);
    o({ member: v, operator: za(b == null ? void 0 : b.type)[0], values: [] });
  };
  return /* @__PURE__ */ g("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ g("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ g("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ g(K, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Ue, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          K,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(wt, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Eo,
          {
            well: Gf,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: f,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                disabled: i,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ g("span", { className: "cv-filter-field-value", children: [
                    wn(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(Ke, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Lo,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: f,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ g("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ g(
        Ce,
        {
          value: h,
          onValueChange: (v) => o({
            operator: v,
            values: vr.has(v) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(Se, { className: "cv-ec-full", children: /* @__PURE__ */ l(Ne, {}) }),
            /* @__PURE__ */ l(xe, { children: m.map((v) => /* @__PURE__ */ l(de, { value: v, children: No[v] }, v)) })
          ]
        }
      )
    ] }),
    p ? /* @__PURE__ */ g("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Xf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (v) => o({ values: v })
        }
      )
    ] }) : null
  ] });
}
function Jf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = No[e.operator] ?? e.operator;
  if (vr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (ke(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Xf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && ke(r[0]);
  if (t === "time") {
    const s = a ? r[0] : Zf(r);
    return /* @__PURE__ */ l(
      kt,
      {
        kind: "dateRange",
        value: s,
        onChange: (c) => n(c === void 0 ? [] : ke(c) ? [c] : ep(c)),
        renderFixed: (c, u) => /* @__PURE__ */ l(Zr, { value: c, onChange: u })
      }
    );
  }
  const i = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", o = a ? r[0] : r.filter((s) => !ke(s));
  return /* @__PURE__ */ l(
    kt,
    {
      kind: i,
      value: o,
      onChange: (s) => n(s === void 0 ? [] : ke(s) ? [s] : s),
      renderFixed: (s, c) => /* @__PURE__ */ l(
        le,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => c(tp(u.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Zf(e) {
  const t = e.filter((n) => !ke(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function ep(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function tp(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function np({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ g(Me, { children: [
    /* @__PURE__ */ g(
      Re,
      {
        className: M(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(_s, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ g(_e, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ g("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(rp, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Yf, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function rp({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Pe(), a = pf(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ g("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: a.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o(s.name),
        title: s.description ?? s.name,
        className: M(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function ap({ currentName: e, hasFields: t, onSelect: n }) {
  var b;
  const { meta: r } = Pe(), a = k.useMemo(() => Vn(r), [r]), i = a.filter((y) => y.type === "view"), o = a.filter((y) => y.type === "cube"), s = a.find((y) => y.name === e), [c, u] = k.useState(!1), [m, h] = k.useState(null), p = (y) => {
    if (y === e) {
      u(!1);
      return;
    }
    t ? h(y) : (n(y), u(!1));
  }, f = () => {
    m && n(m), h(null), u(!1);
  }, v = m ? ((b = a.find((y) => y.name === m)) == null ? void 0 : b.title) ?? m : "";
  return /* @__PURE__ */ g(
    Me,
    {
      open: c,
      onOpenChange: (y) => {
        u(y), y || h(null);
      },
      children: [
        /* @__PURE__ */ g(
          Re,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(di, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: M("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(_e, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ g("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ g("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: v }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ g("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(K, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => h(null), children: "Cancel" }),
            /* @__PURE__ */ l(K, { size: "sm", className: "cv-ec-h7", onClick: f, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ g("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ g(ne, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((y) => /* @__PURE__ */ l(
              Ba,
              {
                icon: /* @__PURE__ */ l(Rr, { className: "cv-ec-icon" }),
                label: y.title,
                active: y.name === e,
                onClick: () => p(y.name)
              },
              y.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((y) => /* @__PURE__ */ l(
            Ba,
            {
              icon: /* @__PURE__ */ l(hi, { className: "cv-ec-icon" }),
              label: y.title,
              active: y.name === e,
              onClick: () => p(y.name)
            },
            y.name
          ))
        ] }) })
      ]
    }
  );
}
function Ba({
  icon: e,
  label: t,
  active: n,
  onClick: r
}) {
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: r,
      className: M(
        "cv-ec-menu-item",
        n && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: e }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: t }),
        n ? /* @__PURE__ */ l(Ue, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Ka(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function ip({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var s;
  const i = ((s = e.chart.axes) == null ? void 0 : s[n]) ?? {}, o = i.labelHide === !0;
  return /* @__PURE__ */ g(
    "div",
    {
      className: M(
        "cv-axis-chrome",
        o && "cv-axis-chrome--hidden"
      ),
      children: [
        r ? /* @__PURE__ */ l("span", { className: "cv-axis-chrome-label", children: r }) : null,
        /* @__PURE__ */ l(
          "input",
          {
            value: i.label ?? "",
            placeholder: a ?? "Axis title",
            disabled: o,
            onChange: (c) => Ka(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv-axis-chrome-input"
          }
        ),
        /* @__PURE__ */ l(
          sp,
          {
            hidden: o,
            what: "axis title",
            onClick: () => Ka(e, t, n, { labelHide: o ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function op({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ g("div", { className: M("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(fi, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(pi, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function sp({
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
      children: e ? /* @__PURE__ */ l(fi, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(pi, { className: "cv-ec-icon" })
    }
  );
}
const Fo = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: M("cv-label", e),
      ...t
    }
  )
);
Fo.displayName = "Label";
function ae({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ g("div", { "data-slot": "field-row", className: M("cv-field-row", i), children: [
    /* @__PURE__ */ g("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Fo, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function kr({
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
      className: M("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function me({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: i
}) {
  const o = k.useId();
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "switch-row",
      className: M("cv-switch-row", i),
      children: [
        /* @__PURE__ */ g(
          "label",
          {
            htmlFor: o,
            className: M("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(kr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const lp = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, cp = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function up({ spec: e, update: t }) {
  var y, w, S, C;
  const n = Ye(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const x = o.Customize;
    return /* @__PURE__ */ l(x, { spec: e, update: t });
  }
  const s = (x) => t({ ...e, chart: { ...r, ...x } }), c = (x) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...x } } }), u = ((w = (y = r.mapping) == null ? void 0 : y.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", p = ((S = r.transform) == null ? void 0 : S.kind) ?? "none", f = Wr(o) ? /* @__PURE__ */ g(ne, { children: [
    /* @__PURE__ */ l(
      ae,
      {
        label: "Compare",
        hint: p === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ g(
          Ce,
          {
            value: p,
            onValueChange: (x) => {
              var N;
              return s({
                transform: x === "none" ? void 0 : x === "rollingAvg" ? { kind: "rollingAvg", window: ((N = r.transform) == null ? void 0 : N.window) ?? tn } : { kind: x }
              });
            },
            children: [
              /* @__PURE__ */ l(Se, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Ne, {}) }),
              /* @__PURE__ */ l(xe, { children: cp.map((x) => /* @__PURE__ */ l(de, { value: x, children: lp[x] }, x)) })
            ]
          }
        )
      }
    ),
    p === "rollingAvg" ? /* @__PURE__ */ l(Ua, { label: "Window (points)", children: /* @__PURE__ */ l(
      le,
      {
        type: "number",
        min: 2,
        max: 90,
        className: "cv-ec-h8 cv-transform-window",
        value: ((C = r.transform) == null ? void 0 : C.window) ?? tn,
        onChange: (x) => {
          const N = parseInt(x.target.value, 10), _ = Number.isFinite(N) ? Math.min(90, Math.max(2, N)) : tn;
          s({ transform: { kind: "rollingAvg", window: _ } });
        }
      }
    ) }) : null
  ] }) : null, v = /* @__PURE__ */ l(ae, { label: "Stacked", children: /* @__PURE__ */ l(
    Ut,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: h,
      onChange: (x) => s({ stackMode: x })
    }
  ) }), b = (() => {
    var x, N;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (_) => s({ orientation: _ ? "horizontal" : "vertical" })
            }
          ),
          v
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ g(ne, { children: [
          v,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((N = (x = r.mapping) == null ? void 0 : x.series) == null ? void 0 : N.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (_) => c({ innerRadiusPct: _ ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ae, { label: "Slice labels", children: /* @__PURE__ */ l(
            Ut,
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
              onChange: (_) => c({ showLabels: _ })
            }
          ) }),
          /* @__PURE__ */ l(Ua, { label: "Max slices", children: /* @__PURE__ */ l(
            le,
            {
              type: "number",
              min: 1,
              className: "cv-ec-h8",
              value: i.maxSlices ?? "",
              placeholder: "8",
              onChange: (_) => {
                const T = parseInt(_.target.value, 10);
                c({ maxSlices: Number.isFinite(T) && T > 0 ? T : void 0 });
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
        return /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Compact rows",
              checked: i.rowHeight === "compact",
              onChange: (_) => c({ rowHeight: _ ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sortable columns",
              checked: i.sortable !== !1,
              onChange: (_) => c({ sortable: _ })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sticky header",
              checked: i.stickyHeader !== !1,
              onChange: (_) => c({ stickyHeader: _ })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Row numbers",
              checked: i.showRowNumbers === !0,
              onChange: (_) => c({ showRowNumbers: _ })
            }
          )
        ] });
      case "heatmap":
        return /* @__PURE__ */ l(
          me,
          {
            label: "Show values",
            checked: i.showValues === !0,
            onChange: (_) => c({ showValues: _ || void 0 })
          }
        );
      case "scatter":
        return null;
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ g("div", { className: "cv-customize", children: [
    b,
    f
  ] });
}
function mp(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || Wr(n);
}
function Ua({ label: e, children: t }) {
  return /* @__PURE__ */ g("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function $o(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(_f(e, r, n));
  };
}
function dp({ spec: e, update: t, empty: n }) {
  const r = Ye(), a = e.chart.family, i = $o(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ g("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Io, { family: a, onPick: i, families: r })
  ] }) }) : null;
}
function hp({ spec: e, update: t }) {
  const n = Ye(), r = e.chart.family, a = $o(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ g(Me, { children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(Ke, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ g(_e, { align: "center", className: "cv-type-popover", children: [
      /* @__PURE__ */ g("div", { className: "cv-type-popover-section", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Chart type" }),
        /* @__PURE__ */ l(Io, { family: r, onPick: a, families: n })
      ] }),
      mp(r, n) ? /* @__PURE__ */ g("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(up, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Io({ family: e, onPick: t, families: n }) {
  return /* @__PURE__ */ l("div", { className: "cv-type-grid", children: n.families().map((r) => {
    const a = n.require(r).icon, i = r === e;
    return /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => t(r),
        "aria-pressed": i,
        className: M(
          "cv-type-tile",
          i && "cv-type-tile--active"
        ),
        children: [
          /* @__PURE__ */ l(a, { className: "cv-ec-icon--lg" }),
          n.require(r).label
        ]
      },
      r
    );
  }) });
}
function fp(e, t) {
  return e.allowedCubes.includes(t);
}
function pp(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function gp(e, t, n, r) {
  const a = Vn(e), i = a.filter((C) => C.type === "view"), o = Ao(t, r), s = Object.values(o).flat();
  let c;
  for (const C of s) {
    const x = Le(e, C);
    if (x) {
      c = x;
      break;
    }
  }
  const u = !c && n ? It(e, n) : void 0, m = c ? It(e, c.cube) : u, h = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, p = t.query.measures ?? [], f = p.length ? Dt(p[0]) : void 0;
  if (h)
    return { viewLocked: h, relatedCubes: [], views: i, measureSource: f, allowedCubes: [h] };
  const v = f ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), b = v ? It(e, v) : void 0, y = a.filter((C) => C.type === "cube"), w = v ? pp(y, v) : y, S = v ? [v, ...w.map((C) => C.name)] : y.map((C) => C.name);
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: w,
    views: i,
    measureSource: f,
    allowedCubes: S
  };
}
function vp(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function bp(e, t, n, r, a, i) {
  var Z, Te, lt, St, xt;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : yp(a), m = o.familyOptions ?? {}, h = Array.isArray(m.columns) ? m.columns : [], p = _o(o), f = p[r], v = c === "table" && n.id === "columns", b = c === "bar" || c === "line" || c === "area", y = ((Te = (Z = o.mapping) == null ? void 0 : Z.series) == null ? void 0 : Te.mode) === "measures", w = b && n.id === "y", S = w && y, C = v ? (lt = h.find((Q) => Q.member === r)) == null ? void 0 : lt.label : S ? f == null ? void 0 : f.label : void 0, x = S ? f == null ? void 0 : f.colorToken : void 0, N = Xt(s), _ = n.kinds.includes("time") && (N == null ? void 0 : N.dimension) === r, T = _ ? N == null ? void 0 : N.granularity : void 0, P = _ ? N == null ? void 0 : N.dateRange : void 0, L = (c === "line" || c === "area") && n.id === "y" && y, A = L ? f == null ? void 0 : f.curve : void 0, F = L ? f == null ? void 0 : f.dots : void 0, O = (Q) => {
    var ta, na;
    if ((ta = o.mapping) != null && ta.series && o.mapping.series.mode !== "measures") return;
    const ue = ((na = o.mapping) != null && na.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], he = { ...p };
    Q && Object.keys(Q).length > 0 ? he[r] = Q : delete he[r];
    const Mt = Jt(o);
    Mt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Mt }, series: To(ue, he) }
      }
    });
  }, R = (Q) => {
    const ue = h.map((he) => he.member === r ? { ...he, ...Q } : he);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: ue } } });
  }, q = (Q) => {
    v ? R({ label: Q }) : S && O({ ...f, label: Q });
  }, D = (Q) => {
    S && O({ ...f, colorToken: Q ?? void 0 });
  }, U = (Q) => {
    if (!N) return;
    const ue = { ...N };
    for (const he of Object.keys(Q)) {
      const Mt = Q[he];
      Mt === void 0 ? delete ue[he] : ue[he] = Mt;
    }
    t({ ...e, query: { ...s, timeDimensions: [ue] } });
  }, Y = (Q) => U({ granularity: Q }), j = (Q) => U({ dateRange: Q }), W = (Q) => {
    S && O({ ...f, curve: Q });
  }, $ = (Q) => {
    S && O({ ...f, dots: Q });
  }, B = () => t(Af(e, c, n.id, r, i)), re = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), ie = (St = o.mapping) == null ? void 0 : St.series, oe = (ie && ie.mode === "pivot" ? ie.value : br(o)[0]) ?? ((xt = s.measures) == null ? void 0 : xt[0]), fe = re ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...oe ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...oe ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], we = (() => {
    const Q = vp(s.order)[0];
    if (!Q) return "none";
    const [ue, he] = Q;
    return oe && ue === oe ? he === "desc" ? "value-desc" : "value-asc" : ue === r ? u === "time" ? he === "desc" ? "time-desc" : "time-asc" : he === "asc" ? "label-asc" : "label-desc" : "none";
  })(), Oe = (Q) => {
    let ue;
    switch (Q) {
      case "none":
        ue = void 0;
        break;
      case "value-desc":
        ue = oe ? [[oe, "desc"]] : void 0;
        break;
      case "value-asc":
        ue = oe ? [[oe, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ue = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ue = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ue } });
  }, se = typeof s.limit == "number" ? s.limit : void 0, I = (Q) => t({ ...e, query: { ...s, limit: Q && Q > 0 ? Q : void 0 } }), H = (c === "bar" || c === "line" || c === "area") && _, G = H && m.comparePrevious === !0;
  return {
    kind: u,
    label: C,
    colorToken: x,
    granularity: T,
    dateRange: P,
    curve: A,
    dots: F,
    canLineStyle: L,
    canRename: v || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && y,
    isTimeField: _,
    isCategoryField: re,
    sortValue: we,
    sortOptions: fe,
    onSort: Oe,
    limit: se,
    onLimit: I,
    canComparePrevious: H,
    comparePrevious: G,
    comparePreviousReady: H && P !== void 0,
    onComparePrevious: (Q) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: Q || void 0 } } }),
    onRename: q,
    onRecolor: D,
    onGranularity: Y,
    onDateRange: j,
    onCurve: W,
    onDots: $,
    onRemove: B
  };
}
function yp(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ga(e, t, n, r) {
  var h;
  const { chart: a, query: i } = e, o = a.family, s = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const f = p.slice(), [v] = f.splice(n, 1);
    return f.splice(r, 0, v), f;
  };
  if (o === "table" && t.id === "columns") {
    const p = a.familyOptions ?? {}, f = s(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...p, columns: f } } };
  }
  const c = s(i.measures ?? []), u = (h = a.mapping) == null ? void 0 : h.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = s(u.values);
    m = { ...a.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const kp = He.options;
function wp({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: M("cv-color-picker", a),
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
            className: M(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        kp.map((i) => {
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
              className: M(
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
const Cp = qe.options, Np = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function zo({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: i,
  className: o
}) {
  const s = n && n.length > 0 ? n : Cp;
  return /* @__PURE__ */ g(
    Ce,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ l(Se, { id: i, className: o, children: /* @__PURE__ */ l(Ne, { placeholder: r }) }),
        /* @__PURE__ */ l(xe, { children: s.map((c) => /* @__PURE__ */ l(de, { value: c, children: Np[c] }, c)) })
      ]
    }
  );
}
const Sp = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function xp({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = Ye(), u = bp(e, t, n, r, a, c), m = (a == null ? void 0 : a.label) ?? r, h = u.label || m, p = u.canColor && i !== void 0, f = u.canRename || p || u.isTimeField || u.isCategoryField || u.canLineStyle || !!o, v = (y) => {
    const w = y.trim();
    u.onRename(w.length > 0 ? w : void 0);
  }, b = /* @__PURE__ */ g(ne, { children: [
    p ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? wn(a.type) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: h })
  ] });
  return /* @__PURE__ */ g("div", { "data-slot": "field-pill", className: M("cv-field-pill", s), children: [
    f ? /* @__PURE__ */ g(Me, { children: [
      /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${h}`,
          children: b
        }
      ) }),
      /* @__PURE__ */ l(_e, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ g("div", { className: "cv-field-pill-config", children: [
        u.canRename ? /* @__PURE__ */ g("label", { className: "cv-ec-field", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
          /* @__PURE__ */ l(
            le,
            {
              defaultValue: u.label ?? "",
              placeholder: m,
              className: "cv-ec-h8",
              onBlur: (y) => v(y.target.value),
              onKeyDown: (y) => {
                y.key === "Enter" && (v(y.target.value), y.target.blur());
              }
            }
          )
        ] }) : null,
        p ? /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l(wp, { value: u.colorToken, onChange: u.onRecolor })
        ] }) : null,
        u.isTimeField ? /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              kt,
              {
                kind: "dateRange",
                value: u.dateRange,
                onChange: u.onDateRange,
                renderFixed: (y, w) => /* @__PURE__ */ l(Zr, { value: y, onChange: w })
              }
            )
          ] }),
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              kt,
              {
                kind: "granularity",
                value: u.granularity,
                onChange: u.onGranularity,
                renderFixed: (y, w) => /* @__PURE__ */ l(zo, { value: y, onChange: w, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          u.canComparePrevious ? /* @__PURE__ */ g("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ g("label", { className: "cv-ec-row", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                kr,
                {
                  checked: u.comparePrevious,
                  onChange: u.onComparePrevious,
                  "aria-label": "Compare to previous period"
                }
              )
            ] }),
            u.comparePrevious && !u.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
          ] }) : null
        ] }) : null,
        u.isCategoryField ? /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ g("label", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Sort" }),
            /* @__PURE__ */ l(
              "select",
              {
                value: u.sortValue,
                onChange: (y) => u.onSort(y.target.value),
                className: "cv-field-pill-select",
                children: u.sortOptions.map((y) => /* @__PURE__ */ l("option", { value: y.key, children: y.label }, y.key))
              }
            )
          ] }),
          /* @__PURE__ */ g("label", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
            /* @__PURE__ */ l(
              le,
              {
                type: "number",
                min: 1,
                defaultValue: u.limit ?? "",
                placeholder: "All",
                className: "cv-ec-h8",
                onBlur: (y) => {
                  const w = y.target.value.trim();
                  u.onLimit(w === "" ? void 0 : Number(w));
                },
                onKeyDown: (y) => {
                  if (y.key === "Enter") {
                    const w = y.target.value.trim();
                    u.onLimit(w === "" ? void 0 : Number(w)), y.target.blur();
                  }
                }
              }
            )
          ] })
        ] }) : null,
        u.canLineStyle ? /* @__PURE__ */ g(ne, { children: [
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: Sp.map(([y, w]) => /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                onClick: () => u.onCurve(y),
                className: M(
                  "cv-line-shape-option",
                  (u.curve ?? "monotone") === y && "cv-line-shape-option--active"
                ),
                children: [
                  w,
                  (u.curve ?? "monotone") === y ? /* @__PURE__ */ l(Ue, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              y
            )) })
          ] }),
          /* @__PURE__ */ g("label", { className: "cv-ec-row", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(kr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ g("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ g(
            K,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canUp,
              onClick: o.onUp,
              children: [
                /* @__PURE__ */ l(Nn, { className: "cv-ec-icon" }),
                "Up"
              ]
            }
          ),
          /* @__PURE__ */ g(
            K,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canDown,
              onClick: o.onDown,
              children: [
                /* @__PURE__ */ l(Sn, { className: "cv-ec-icon" }),
                "Down"
              ]
            }
          )
        ] }) : null,
        /* @__PURE__ */ g(
          K,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: u.onRemove,
            children: [
              /* @__PURE__ */ l(ia, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: h, children: b }),
    /* @__PURE__ */ l(
      K,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: u.onRemove,
        "aria-label": `Remove ${h}`,
        children: /* @__PURE__ */ l(ia, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function Mp({
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
  orientation: h,
  lockedSingle: p,
  disableReorder: f,
  label: v,
  note: b,
  pickerSide: y,
  pickerAlign: w,
  control: S
}) {
  const C = n.cardinality === "many" && !p, x = C || r.length === 0, N = r.length, _ = h === "vertical", T = v ?? n.label, P = /* @__PURE__ */ l(
    Eo,
    {
      well: n,
      placed: a,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: y ?? (_ ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          className: M(
            "cv-well-add",
            _ && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }),
            r.length === 0 ? T : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "well-group",
      className: M("cv-well-group", !_ && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ g("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: T }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        S ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: S }) : null,
        /* @__PURE__ */ g("div", { className: M("cv-well-fields", _ ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((L, A) => /* @__PURE__ */ l(
            xp,
            {
              spec: e,
              update: t,
              well: n,
              member: L,
              option: i(L),
              resolvedColor: o(L),
              className: _ ? "cv-field-pill--full" : void 0,
              reorder: C && N > 1 && !f ? {
                canUp: A > 0,
                canDown: A < N - 1,
                onUp: () => t(Ga(e, n, A, A - 1)),
                onDown: () => t(Ga(e, n, A, A + 1))
              } : void 0
            },
            L
          )),
          x ? P : null
        ] }),
        b ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: b }) : null
      ]
    }
  );
}
function Xn({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ g(Me, { children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ g("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(Ke, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(_e, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function ea(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Rp({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = ea(e, t), a = Ro(e), i = (u = e.query.timeDimensions) == null ? void 0 : u[0], o = n.display ?? "number", s = n.gauge, c = (m) => {
    const h = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!h) return;
    const p = { ...h };
    for (const f of Object.keys(m)) {
      const v = m[f];
      v === void 0 ? delete p[f] : p[f] = v;
    }
    delete p.granularity, t({ ...e, query: { ...e.query, timeDimensions: [p] } });
  };
  return /* @__PURE__ */ g("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(jt, { label: "Time field", children: /* @__PURE__ */ l(
      Lo,
      {
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (m) => c({ dimension: m }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(jt, { label: "Date range", children: /* @__PURE__ */ l(
      kt,
      {
        kind: "dateRange",
        value: i.dateRange,
        onChange: (m) => c({ dateRange: m }),
        renderFixed: (m, h) => /* @__PURE__ */ l(Zr, { value: m, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(ae, { label: "Display", children: /* @__PURE__ */ l(
      Ut,
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
    o === "gauge" ? /* @__PURE__ */ l(jt, { label: "Gauge max", children: /* @__PURE__ */ l(
      le,
      {
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (m) => {
          const h = parseFloat(m.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function _p({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = ea(e, t), a = n.comparison, i = a !== void 0, o = k.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ g("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Show comparison",
        checked: i,
        onChange: (m) => r({
          comparison: m ? o.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    i ? /* @__PURE__ */ g(ne, { children: [
      /* @__PURE__ */ l(ae, { label: "Against", children: /* @__PURE__ */ l(
        Ut,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(jt, { label: "Baseline value", children: /* @__PURE__ */ l(
        le,
        {
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const h = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(h) ? h : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ g("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(oi, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ g("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        me,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ l(
        me,
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
function Tp({ spec: e, update: t }) {
  const { fo: n, setFO: r } = ea(e, t), a = n.sparkline, i = a !== void 0, o = n.comparison !== void 0, s = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ g("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Show sparkline",
        checked: i,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    i ? /* @__PURE__ */ g(ne, { children: [
      /* @__PURE__ */ l(jt, { label: "Trend granularity", children: /* @__PURE__ */ l(
        kt,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ l(zo, { value: u, onChange: m, className: "cv-ec-h8 cv-ec-full" })
        }
      ) }),
      o ? null : /* @__PURE__ */ l(
        me,
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
function jt({ label: e, children: t }) {
  return /* @__PURE__ */ g("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function Op({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var fe, we, Oe, se;
  const { meta: a } = Pe(), { locale: i } = Ae(), o = Ye(), { chart: s } = e, c = s.family, u = o.require(c), m = u.queryless ?? !1, h = Ro(e), p = k.useMemo(() => En(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), f = k.useCallback(
    (I) => I && (i == null ? void 0 : i.unitSystem) === "imperial" && p[I] ? p[I].imperialUnit : I,
    [i == null ? void 0 : i.unitSystem, p]
  ), v = k.useMemo(() => Of(c, o), [c, o]), b = k.useMemo(() => Ao(e, o), [e, o]), y = k.useMemo(() => new Map(v.map((I) => [I.id, I])), [v]), [w, S] = k.useState(void 0), C = k.useMemo(
    () => gp(a, e, w, o),
    [a, e, w, o]
  ), x = k.useMemo(() => Object.values(b).flat(), [b]), N = k.useCallback(
    (I) => {
      S(I), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), _ = k.useMemo(
    () => {
      var I;
      return C.viewLocked ? [C.viewLocked] : [(I = C.sourceCube) == null ? void 0 : I.name, ...C.relatedCubes.map((E) => E.name)].filter(
        Boolean
      );
    },
    [C]
  ), T = k.useMemo(
    () => Object.values(b).every((I) => I.length === 0),
    [b]
  ), P = k.useMemo(() => {
    const I = (b.y ?? [])[0], E = I ? Le(a, I) : void 0;
    return {
      leftKey: I ? Va(E) : void 0,
      leftLabel: I ? Ap(E, f(E == null ? void 0 : E.unit)) : void 0
    };
  }, [b, a, f]), L = k.useCallback(
    (I, E) => {
      var H;
      if (E) {
        if (!fp(C, E.cube))
          return "Clear the current fields to use a different dataset.";
        if (E.memberType === "measure" && C.measureSource && E.cube !== C.measureSource)
          return `Measures come from one table (${((H = C.sourceCube) == null ? void 0 : H.title) ?? C.measureSource}). Remove them to switch.`;
        if (I === "y" && E.memberType === "measure") {
          const { leftKey: G, leftLabel: z } = P;
          if (G !== void 0 && Va(E) !== G)
            return `This axis shows ${z}; ${E.label ?? "this field"} is ${Oo(E)}`;
        }
      }
    },
    [C, P]
  ), A = P.leftLabel, F = k.useMemo(() => {
    var E;
    const I = {};
    if (c === "bar" || c === "line" || c === "area") {
      const H = (E = s.mapping) == null ? void 0 : E.series;
      if (H && H.mode === "measures") {
        const G = H.members.map((V) => {
          var Z, Te;
          return { key: V, colorToken: (Te = (Z = H.meta) == null ? void 0 : Z[V]) == null ? void 0 : Te.colorToken };
        }), z = Qi(G, s.colors);
        H.members.forEach((V, Z) => {
          I[V] = z[Z];
        });
      }
    }
    return I;
  }, [c, s.mapping, s.colors]), O = k.useCallback(
    (I, E, H) => {
      const G = Le(a, E);
      if (L(I, G)) return;
      let z = H === "geoPoint" && (G != null && G.latMember) && G.lngMember ? en(
        en(e, c, "lat", G.latMember, "numberDimension", o),
        c,
        "lng",
        G.lngMember,
        "numberDimension",
        o
      ) : en(e, c, I, E, H, o);
      const V = u.canonicalTimeWell;
      if (V && I !== V && (b[V] ?? []).length === 0) {
        const Z = df(a, G == null ? void 0 : G.cube);
        Z && Z.name !== E && !L(V, Z) && (z = en(z, c, V, Z.name, "time", o));
      }
      t(z);
    },
    [L, a, t, e, c, o, u, b]
  ), R = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, q = R.left.map((I) => y.get(I)).filter(Boolean), D = R.bottom.map((I) => y.get(I)).filter(Boolean), U = (fe = b.color) == null ? void 0 : fe[0], Y = ((we = b.y) == null ? void 0 : we.length) ?? 0, j = U && Y > 1 ? `${Y} measures × ${((Oe = Le(a, U)) == null ? void 0 : Oe.label) ?? "this split"} — one series per measure per value.` : void 0, W = u.hasLegend, $ = (b.y ?? [])[0], B = (I) => {
    var G, z, V, Z;
    if (!I) return;
    const E = (G = s.mapping) == null ? void 0 : G.series;
    return (E && E.mode === "measures" ? (V = (z = E.meta) == null ? void 0 : z[I]) == null ? void 0 : V.label : void 0) ?? ((Z = Le(a, I)) == null ? void 0 : Z.label);
  }, re = (I) => {
    var H, G, z, V;
    const E = (Z, Te) => Te ? /* @__PURE__ */ l(ip, { spec: e, update: t, axis: Z, title: "Title", auto: B(Te) }) : null;
    switch (I) {
      case "y":
        return E("y", $);
      // the single value axis
      case "x":
        return E("x", (G = (H = s.mapping) == null ? void 0 : H.category) == null ? void 0 : G.member);
      case "sy":
        return E("y", (z = b.sy) == null ? void 0 : z[0]);
      // scatter Y axis
      case "sx":
        return E("x", (V = b.sx) == null ? void 0 : V[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ie = (I, E) => /* @__PURE__ */ l(
    Mp,
    {
      spec: e,
      update: t,
      well: I,
      placed: b[I.id] ?? [],
      allPlaced: x,
      optionFor: (H) => Le(a, H),
      colorFor: (H) => F[H],
      scope: C,
      blockReason: (H) => L(I.id, H),
      onAdd: (H, G) => O(I.id, H, G),
      badge: I.id === "y" ? A : void 0,
      orientation: E,
      note: I.id === "color" ? j : void 0,
      control: re(I.id)
    },
    I.id
  ), oe = () => {
    const I = y.get("value"), E = (b.value ?? []).length > 0, H = s.familyOptions ?? {};
    return /* @__PURE__ */ g(ne, { children: [
      /* @__PURE__ */ g("div", { className: "cv-edit-kpi-value", children: [
        I ? ie(I, "vertical") : null,
        E ? /* @__PURE__ */ l(
          Xn,
          {
            label: "Time, range & display",
            summary: H.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Rp, { spec: e, update: t })
          }
        ) : null
      ] }),
      E ? /* @__PURE__ */ g(ne, { children: [
        /* @__PURE__ */ l(Xn, { label: "Comparison", summary: H.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(_p, { spec: e, update: t }) }),
        /* @__PURE__ */ l(Xn, { label: "Sparkline", summary: H.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Tp, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ g("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ g("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !T || m ? /* @__PURE__ */ l(hp, { spec: e, update: t }) : null,
      /* @__PURE__ */ g("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          ap,
          {
            currentName: C.viewLocked ?? ((se = C.sourceCube) == null ? void 0 : se.name),
            hasFields: x.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ l(np, { spec: e, update: t, cube: h, scopeCubes: _, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: "cv-edit-overlay-body", children: [
      q.length > 0 ? /* @__PURE__ */ l("div", { className: M("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? oe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        q.map((I) => ie(I, "vertical"))
      ) }) : null,
      /* @__PURE__ */ g("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ g("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(dp, { spec: e, update: t, empty: T && !m })
        ] }),
        D.length > 0 ? /* @__PURE__ */ g("div", { className: "cv-edit-overlay-bottom", children: [
          D.map((I) => ie(I, "horizontal")),
          W && !T ? /* @__PURE__ */ l(op, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Ap(e, t) {
  const n = Oo(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Vo(e, t) {
  const n = k.useRef(e);
  k.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = k.useRef(null), a = k.useRef(null);
  return k.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, a.current !== null && (n.current(...a.current), a.current = null));
    },
    []
  ), k.useCallback(
    (...i) => {
      r.current !== null && clearTimeout(r.current), a.current = i, r.current = setTimeout(() => {
        r.current = null, a.current = null, n.current(...i);
      }, t);
    },
    [t]
  );
}
function Zn(e) {
  const t = Ri.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Dp({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = k.useState(() => ({
    spec: e,
    issues: Zn(e)
  })), [i, o] = k.useState(e);
  k.useEffect(() => {
    a({ spec: e, issues: Zn(e) }), o(e);
  }, [e]);
  const s = Vo((p) => t(p), n), c = r.spec, u = r.issues, m = u.length === 0, h = k.useCallback(
    (p) => {
      const f = Zn(p);
      a({ spec: p, issues: f }), f.length === 0 && (o(p), s(p));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: h };
}
const Lp = () => {
};
function Ep({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = Ye(), { draft: s, issues: c, valid: u, committed: m, update: h } = Dp({
    spec: e,
    onChange: t ?? Lp,
    debounceMs: r
  }), p = o.get(s.chart.family), f = (p == null ? void 0 : p.queryless) ?? !1, v = m, b = (T) => {
    var P, L, A;
    return (((P = T == null ? void 0 : T.measures) == null ? void 0 : P.length) ?? 0) > 0 || (((L = T == null ? void 0 : T.dimensions) == null ? void 0 : L.length) ?? 0) > 0 || (((A = T == null ? void 0 : T.timeDimensions) == null ? void 0 : A.some((F) => typeof F.granularity == "string")) ?? !1);
  }, y = (T) => {
    var P;
    return (((P = T == null ? void 0 : T.measures) == null ? void 0 : P.length) ?? 0) > 0;
  }, w = (p == null ? void 0 : p.requiresMeasure) ?? s.chart.family !== "table", S = f || b(s.query) && b(v.query) && (!w || y(s.query) && y(v.query)), C = w && !y(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", x = k.useCallback(
    (T) => {
      h({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...T }
        }
      });
    },
    [s, h]
  ), N = S ? /* @__PURE__ */ l(
    Br,
    {
      query: v.query ?? {},
      chart: v.chart,
      editing: !0,
      updateFamilyOptions: x
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: C }) }), _ = n ? /* @__PURE__ */ g(K, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(gi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "chart-editor",
      className: M("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ g(Mn, { variant: "destructive", children: [
          /* @__PURE__ */ l(Sr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(Rn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(_n, { children: /* @__PURE__ */ g("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((T, P) => /* @__PURE__ */ g("li", { children: [
              T.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: T.path }) : null,
              " ",
              T.message
            ] }, P)),
            c.length > 3 ? /* @__PURE__ */ g("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Op, { spec: s, update: h, toolbar: _, children: N }) })
      ]
    }
  );
}
function Pp({
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
  saveDisabled: h,
  className: p
}) {
  const f = a || i, [v, b] = k.useState(!1);
  k.useEffect(() => {
    if (!v) return;
    const w = setTimeout(() => b(!1), 1600);
    return () => clearTimeout(w);
  }, [v]), k.useEffect(() => {
    h || b(!1);
  }, [h]);
  const y = () => {
    m == null || m(), b(!0);
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: M("cv-editor-toolbar", p),
      children: [
        /* @__PURE__ */ l(
          le,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ g("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ g(K, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(si, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ g(K, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Mr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ g(K, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Ts, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ g(K, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Os, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ g("div", { className: "cv-editor-toolbar-actions", children: [
          f ? /* @__PURE__ */ g(ne, { children: [
            /* @__PURE__ */ l(
              K,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(As, {})
              }
            ),
            /* @__PURE__ */ l(
              K,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(Ds, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ g(
            K,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(Ls, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ g(
            K,
            {
              size: "sm",
              onClick: y,
              disabled: h,
              "aria-live": "polite",
              className: M(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                v && "cv-editor-toolbar-save--saved"
              ),
              children: [
                v ? /* @__PURE__ */ l(Ue, {}) : /* @__PURE__ */ l(gi, {}),
                " ",
                v ? "Saved" : "Save"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
const jo = "lg", Wo = 12;
function Fp(e, t) {
  const n = t[jo];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function $p(e, t) {
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
const Ip = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function zp(e, t, n, r = Wo) {
  const a = Ip[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function qo(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Wo) {
  const a = zp(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Vp(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return qo(e, a);
}
function jp(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Wp(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const qp = 12, Hp = 900, Bp = 0.4;
function Kp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Up({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = to(), u = e.grid ?? {}, m = u.cols ?? qp, h = u.rowHeight ?? 40, p = u.margin ?? [12, 12], f = u.containerPadding ?? [0, 0], v = Math.max(Bp, Math.min(1, c / Hp)), b = Math.round(v / 0.05) * 0.05, y = Math.max(8, Math.round(h * b)), w = [
    Math.round(p[0] * b),
    Math.round(p[1] * b)
  ], S = [
    Math.round(f[0] * b),
    Math.round(f[1] * b)
  ], C = k.useMemo(
    () => ({ [jo]: Kp(e.layout) }),
    [e.layout]
  ), x = k.useMemo(
    () => new Map(e.widgets.map((L) => [L.id, L])),
    [e.widgets]
  ), N = k.useRef(o);
  k.useEffect(() => {
    N.current = o;
  }, [o]);
  const _ = k.useRef(e.layout);
  k.useEffect(() => {
    _.current = e.layout;
  }, [e.layout]);
  const T = k.useRef(null), P = k.useCallback(
    (L, A) => {
      const O = Fp(L, A).map((R) => ({ ...R }));
      Gp(_.current, O) || N.current(O);
    },
    []
  );
  return /* @__PURE__ */ l(Hr, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    bi,
    {
      width: c,
      layouts: C,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: y,
      margin: w,
      containerPadding: S,
      dragConfig: { enabled: !0, handle: `.${vn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: P,
      children: e.layout.map((L) => {
        const A = x.get(L.i);
        if (!A) return null;
        const F = A.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ g(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${A.title ?? A.type}`,
              "aria-pressed": F,
              onPointerDown: (O) => {
                T.current = { x: O.clientX, y: O.clientY };
              },
              onClick: (O) => {
                const R = T.current;
                R && Math.hypot(O.clientX - R.x, O.clientY - R.y) > 5 || n(A.id);
              },
              onKeyDown: (O) => {
                (O.key === "Enter" || O.key === " ") && (O.preventDefault(), n(A.id));
              },
              className: M(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                F && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(gr, { widget: A, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: M(vn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ g("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${A.title ?? A.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), r(A.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Es, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${A.title ?? A.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), a(A.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Ps, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${A.title ?? A.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), i(A.id);
                      },
                      className: M("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(wt, {})
                    }
                  )
                ] })
              ]
            },
            L.i
          )
        );
      })
    }
  ) : null }) });
}
function Gp(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Yp = k.memo(Up);
function Qp(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Jp({
  widget: e,
  onChange: t
}) {
  const n = k.useRef(t);
  k.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = k.useRef(e);
  k.useEffect(() => {
    r.current = e;
  }, [e]);
  const a = yi({
    extensions: [wi],
    editable: !0,
    content: Qp(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: M(no, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(ae, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ g("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Xp, { editor: a }),
    /* @__PURE__ */ l(ki, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function ze({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: M("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function Xp({ editor: e }) {
  const [, t] = k.useReducer((n) => n + 1, 0);
  return k.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          ze,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Fs, {})
          }
        ),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l($s, {})
          }
        ),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Is, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(zs, {})
          }
        ),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Vs, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(js, {})
          }
        ),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Ws, {})
          }
        ),
        /* @__PURE__ */ l(
          ze,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(qs, {})
          }
        )
      ]
    }
  );
}
const Zp = _r(
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
function eg({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: M(Zp({ variant: t }), e), ...n });
}
function tg({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = Pe(), c = k.useMemo(() => Vn(o), [o]), u = c.filter((p) => p.type === "cube"), m = c.filter((p) => p.type === "view"), h = c.find((p) => p.name === e);
  return /* @__PURE__ */ g(Ce, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Se, { id: a, className: i, children: /* @__PURE__ */ l(Ne, { placeholder: s ? "Loading…" : n, children: h ? /* @__PURE__ */ l(er, { option: h }) : void 0 }) }),
    /* @__PURE__ */ g(xe, { children: [
      m.length > 0 ? /* @__PURE__ */ g(hr, { children: [
        /* @__PURE__ */ l(fr, { children: "Views" }),
        m.map((p) => /* @__PURE__ */ l(de, { value: p.name, children: /* @__PURE__ */ l(er, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ g(hr, { children: [
        /* @__PURE__ */ l(fr, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ l(de, { value: p.name, children: /* @__PURE__ */ l(er, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function er({ option: e }) {
  const t = e.type === "view" ? Rr : hi;
  return /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(eg, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const ng = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function rg(e) {
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
function ag({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(rg(s));
  };
  return /* @__PURE__ */ g("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ae,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ g(
          Ce,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Se, { children: /* @__PURE__ */ l(Ne, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(xe, { children: t.map((s) => /* @__PURE__ */ l(de, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ae, { label: "Control", children: /* @__PURE__ */ g(Ce, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Se, { children: /* @__PURE__ */ l(Ne, {}) }),
      /* @__PURE__ */ l(xe, { children: cl.options.map((s) => /* @__PURE__ */ l(de, { value: s, children: ng[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(ig, { control: r, onChange: a, variables: t })
  ] });
}
function ig({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(og, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(lg, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(cg, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(ug, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(mg, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(dg, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function og({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ g(ne, { children: [
    /* @__PURE__ */ l(
      ae,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          sg,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      me,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function sg({
  selected: e,
  onChange: t
}) {
  const [n, r] = k.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(an.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === an.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ g(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Re, { asChild: !0, children: /* @__PURE__ */ g(K, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(Ke, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(_e, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: an.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ g(
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
                className: M("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Ue, { className: "cv-ed-icon-xs" }) : null
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
function lg({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = qe.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ g(ne, { children: [
    /* @__PURE__ */ l(
      ae,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ g(
          Ce,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Se, { children: /* @__PURE__ */ l(Ne, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ g(xe, { children: [
                /* @__PURE__ */ l(de, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(de, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ae, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: qe.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: M("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function cg({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ g(ne, { children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      ae,
      {
        label: "Options",
        action: /* @__PURE__ */ g(K, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(gt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ g("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            le,
            {
              className: "cv-ed-grow",
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            le,
            {
              className: "cv-ed-grow",
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            K,
            {
              variant: "ghost",
              size: "icon",
              className: M("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(wt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function ug({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ g(ne, { children: [
    /* @__PURE__ */ l(ae, { label: "From", children: /* @__PURE__ */ g(
      Ce,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Se, { children: /* @__PURE__ */ l(Ne, {}) }),
          /* @__PURE__ */ g(xe, { children: [
            /* @__PURE__ */ l(de, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(de, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(de, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ae,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          K,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          tg,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function mg({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ l(ae, { label: "Placeholder", children: /* @__PURE__ */ l(
    le,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function dg({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ l(ae, { label: a, children: /* @__PURE__ */ l(
    le,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (i) => {
        const o = i.target.value;
        t({ ...e, [r]: o === "" ? void 0 : Number(o) });
      }
    }
  ) });
  return /* @__PURE__ */ g(ne, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function hg(e) {
  return { schemaVersion: dt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function fg(e) {
  const t = {
    schemaVersion: dt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function pg(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Ya({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = r ? (o) => r([...t, o]) : void 0;
  return /* @__PURE__ */ g("div", { "data-slot": "widget-edit-panel", className: M("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ae,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          le,
          {
            value: e.title ?? "",
            placeholder: "Untitled",
            onChange: (o) => n({ ...e, title: o.target.value || void 0 })
          }
        )
      }
    ) : null,
    e.type === "chart" ? (
      // The chart's query may carry {var} tokens bound to dashboard variables.
      // Provide a variable store (seeded from the dashboard's decls) so the live
      // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
      // Cube and 400s ("granularity must be a string").
      /* @__PURE__ */ l(Hr, { spec: hg(t), children: /* @__PURE__ */ l(Bf, { createVariable: i, children: /* @__PURE__ */ l("div", { className: M(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Ep,
        {
          fill: a,
          spec: fg(e),
          onChange: (o) => n(pg(e, o))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Jp, { widget: e, onChange: n }) : /* @__PURE__ */ l(ag, { widget: e, variables: t, onChange: n })
  ] });
}
function gg({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ g(ne, { children: [
    r ? /* @__PURE__ */ l(
      Yt,
      {
        className: M("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "section-header",
      className: M("cv-section-header", s),
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
function vg({
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
  const u = i !== void 0, [m, h] = k.useState(a), p = r ? u ? i : m : !0, f = k.useId(), v = k.useCallback(() => {
    const b = !p;
    u || h(b), o == null || o(b);
  }, [p, u, o]);
  return /* @__PURE__ */ g(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: M("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          gg,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: p,
            onToggle: v,
            regionId: f
          }
        ),
        p ? /* @__PURE__ */ l("div", { id: f, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function bg(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function yg(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function kg(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function wg(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Cg(e, t) {
  switch (e) {
    case "chart":
      return yg(t);
    case "text":
      return kg(t);
    case "input":
      return wg(t);
  }
}
function Ng(e) {
  return { name: e, type: "string" };
}
function Sg(e) {
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
const Qa = {
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
function xg({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = k.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, i = (u, m) => {
    t(e.map((h, p) => p === u ? Mg(h, m) : h));
  }, o = (u) => t(e.filter((m, h) => h !== u)), s = () => t([...e, Ng(a())]), c = (u, m) => {
    const h = u + m;
    if (h < 0 || h >= e.length) return;
    const p = e.slice();
    [p[u], p[h]] = [p[h], p[u]], t(p);
  };
  return /* @__PURE__ */ l(
    vg,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ g(K, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(gt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ g("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ g("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ g(K, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(gt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        Rg,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((h, p) => p !== m && h.name === u.name && u.name !== ""),
          onChange: (h) => i(m, h),
          onRemove: () => o(m),
          onMove: (h) => c(m, h)
        },
        m
      )) })
    }
  );
}
function Mg(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Sg(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Rg({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, c] = k.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ g("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => c((m) => !m),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(Ke, {}) : /* @__PURE__ */ l(Yt, {})
            }
          ),
          /* @__PURE__ */ l(
            le,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => a({ name: m.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Qa[e.type] }),
          /* @__PURE__ */ g("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              K,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Nn, {})
              }
            ),
            /* @__PURE__ */ l(
              K,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Sn, {})
              }
            ),
            /* @__PURE__ */ l(
              K,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(wt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ g("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ae, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ g(Ce, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ l(Se, { children: /* @__PURE__ */ l(Ne, {}) }),
            /* @__PURE__ */ l(xe, { children: xi.options.map((m) => /* @__PURE__ */ l(de, { value: m, children: Qa[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(ae, { label: "Label", hint: "Optional human label for controls.", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
            le,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (m) => a({ label: m.target.value })
            }
          ) }),
          /* @__PURE__ */ l(
            me,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => a({ array: m })
            }
          ),
          /* @__PURE__ */ l(_g, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function _g({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      me,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ae, { label: "Default", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      le,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const i = a.target.value;
          t(i === "" ? void 0 : Number(i));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Tg(e.default);
  return /* @__PURE__ */ l(ae, { label: "Default", hint: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    le,
    {
      value: r,
      placeholder: Og(e.type),
      onChange: (a) => {
        const i = a.target.value;
        if (i === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const o = i.split(",").map((s) => s.trim()).filter(Boolean);
          t(o);
          return;
        }
        t(i);
      }
    }
  ) });
}
function Tg(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Og(e) {
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
function bv({
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
  onDiscard: h,
  families: p,
  className: f
}) {
  var H, G;
  const [v, b] = k.useState(e), [y, w] = k.useState(e);
  k.useEffect(() => {
    b(e), w(e);
  }, [e]);
  const [S, C] = k.useState(null), x = k.useRef(0), [N, _] = k.useState(null), T = k.useRef(S), P = k.useRef(N), L = k.useRef(v);
  k.useEffect(() => {
    T.current = S, P.current = N, L.current = v;
  });
  const A = k.useRef(null);
  A.current === null && (A.current = i ?? bg());
  const F = i ?? A.current, O = Vo(
    (z) => r == null ? void 0 : r(z),
    o
  ), R = k.useCallback(
    (z) => {
      x.current = Date.now(), b((V) => {
        const Z = z(V);
        return O(Z), Z;
      });
    },
    [O]
  ), q = k.useRef(t);
  k.useEffect(() => {
    if (!t || t === q.current) return;
    const z = 500;
    let V = null;
    const Z = () => {
      var xt;
      const Te = Date.now() - x.current;
      if (Te < z) {
        V = setTimeout(Z, z - Te);
        return;
      }
      q.current = t;
      const lt = /* @__PURE__ */ new Set();
      ((xt = P.current) == null ? void 0 : xt.kind) === "widget" && lt.add(P.current.id), T.current && lt.add(T.current);
      const St = Lg(t, L.current, lt);
      b(St), n == null || n(St);
    };
    return Z(), () => {
      V && clearTimeout(V);
    };
  }, [t]);
  const D = k.useCallback(
    (z) => {
      const V = Cg(z, F());
      R((Z) => qo(Z, V)), C(V.id), _({ kind: "widget", id: V.id });
    },
    [R, F]
  ), U = k.useCallback((z) => C(z), []), Y = k.useCallback((z) => {
    C(z), _({ kind: "widget", id: z });
  }, []), j = k.useCallback(
    (z) => {
      R((V) => jp(V, z)), C((V) => V === z ? null : V), _((V) => (V == null ? void 0 : V.kind) === "widget" && V.id === z ? null : V);
    },
    [R]
  ), W = k.useCallback(
    (z) => {
      const V = F();
      R((Z) => Vp(Z, z, V)), C(V);
    },
    [R, F]
  ), $ = k.useCallback(
    (z) => R((V) => Wp(V, z)),
    [R]
  ), B = k.useCallback(
    (z) => R((V) => {
      const Z = $p(V.layout, z);
      return Dg(V.layout, Z) ? V : { ...V, layout: Z };
    }),
    [R]
  ), re = k.useCallback(
    (z) => R((V) => ({ ...V, name: z || void 0 })),
    [R]
  ), ie = k.useCallback(
    (z) => R((V) => ({ ...V, variables: z })),
    [R]
  ), oe = k.useDeferredValue(v), fe = k.useMemo(
    () => sr.safeParse(oe),
    [oe]
  ), we = k.useCallback(() => {
    const z = sr.safeParse(v);
    z.success && (a == null || a(z.data), w(v));
  }, [v, a]), Oe = v !== y, se = (N == null ? void 0 : N.kind) === "widget" ? v.widgets.find((z) => z.id === N.id) ?? null : null;
  k.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !v.widgets.some((z) => z.id === N.id) && _(null);
  }, [N, v.widgets]);
  const I = k.useCallback(() => _(null), []), E = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : se ? se.title ?? `${Ag(se.type)} widget` : "";
  return /* @__PURE__ */ l(qr, { families: p, children: /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((G = (H = v.grid) == null ? void 0 : H.margin) == null ? void 0 : G[0]) ?? 12 },
      className: M("cv-dashboard-editor", f),
      children: [
        /* @__PURE__ */ l(
          Pp,
          {
            name: v.name ?? "",
            onNameChange: re,
            onAdd: D,
            onEditVariables: () => _({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: h,
            discardDisabled: !Oe,
            onSave: a ? we : void 0,
            saveDisabled: !fe.success || !Oe,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        fe.success ? null : /* @__PURE__ */ g("p", { className: "cv-dashboard-editor-validation", children: [
          fe.error.issues.length,
          " validation issue",
          fe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: N ? null : /* @__PURE__ */ l(
          Yp,
          {
            spec: v,
            selectedId: S,
            onSelect: U,
            onEdit: Y,
            onDuplicate: W,
            onDelete: j,
            onLayoutChange: B
          }
        ) }),
        N ? /* @__PURE__ */ g(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": E,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ g("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ g("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ g(K, { variant: "ghost", size: "sm", onClick: I, children: [
                    /* @__PURE__ */ l(xr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: E })
                ] }),
                se ? /* @__PURE__ */ g(
                  K,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => j(se.id),
                    children: [
                      /* @__PURE__ */ l(wt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: N.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(xg, { variables: v.variables, onChange: ie }) }) : (se == null ? void 0 : se.type) === "chart" ? /* @__PURE__ */ l(
                Ya,
                {
                  fill: !0,
                  widget: se,
                  variables: v.variables,
                  onChange: $,
                  onVariablesChange: ie
                }
              ) : se ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Ya,
                {
                  widget: se,
                  variables: v.variables,
                  onChange: $,
                  onVariablesChange: ie
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Ag(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Dg(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Lg(e, t, n) {
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
  lc as AreaChartFamily,
  ql as AreaFamilyOptionsSchema,
  al as AxesOptionsSchema,
  ca as AxisOptionsSchema,
  sv as BUILTIN_CHART_FAMILIES,
  $e as BUILTIN_DEFAULTS,
  Fe as BUILTIN_FAMILY_OPTION_SCHEMAS,
  oc as BarChartFamily,
  jl as BarFamilyOptionsSchema,
  jo as CANONICAL_BREAKPOINT,
  He as ChartColorTokenSchema,
  Op as ChartEditOverlay,
  Ep as ChartEditor,
  Zs as ChartFamilySchema,
  Er as ChartInteractionProvider,
  Si as ChartOptionsSchema,
  hu as ChartRenderer,
  Ri as ChartSpecSchema,
  sl as ChartTransformSchema,
  vv as ChartView,
  ml as ChartWidgetSchema,
  il as ColorAssignmentSchema,
  Gl as CondFormatRuleSchema,
  Br as CubeChart,
  Td as CubeChartSpec,
  Ni as CubeQuerySchema,
  Pn as CubeVizContext,
  fv as CubeVizProvider,
  it as DEFAULT_COLOR_RAMP,
  Wo as DEFAULT_COLS,
  tn as DEFAULT_TRANSFORM_WINDOW,
  dr as DEFAULT_UNIT_CONVERSIONS,
  vn as DRAG_HANDLE_CLASS,
  gv as Dashboard,
  bv as DashboardEditor,
  Hr as DashboardProvider,
  sr as DashboardSpecSchema,
  ir as DateRangeSchema,
  Jl as EMPTY_FAMILY_DEFAULT,
  ma as EM_DASH,
  Yp as EditorCanvas,
  Pp as EditorToolbar,
  qr as FamilyRegistryOverride,
  Yf as FilterBuilder,
  Ys as FilterOperatorSchema,
  el as FormatKindSchema,
  xn as FormatOptionsSchema,
  Tl as GRANULARITY_PATTERN,
  qe as GranularitySchema,
  gl as GridConfigSchema,
  vc as HeatmapChartFamily,
  Ql as HeatmapFamilyOptionsSchema,
  cl as InputControlKindSchema,
  ul as InputControlSchema,
  ag as InputWidgetEditor,
  hl as InputWidgetSchema,
  Jd as InputWidgetView,
  kc as KpiFamily,
  Kl as KpiFamilyOptionsSchema,
  pl as LayoutItemSchema,
  Qs as LeafFilterSchema,
  nl as LegendOptionsSchema,
  sc as LineChartFamily,
  Wl as LineFamilyOptionsSchema,
  te as MemberSchema,
  oa as OrderDirSchema,
  Xs as OrderSpecSchema,
  cc as PieChartFamily,
  Hl as PieFamilyOptionsSchema,
  or as QueryFilterSchema,
  Tn as ReferenceLineOptSchema,
  gr as RenderWidget,
  dt as SCHEMA_VERSION,
  Gs as ScalarSchema,
  mc as ScatterChartFamily,
  Bl as ScatterFamilyOptionsSchema,
  tl as SeriesMappingSchema,
  sa as SeriesMetaSchema,
  _i as SpecSchema,
  Ul as TableColumnOptSchema,
  Lc as TableFamily,
  Yl as TableFamilyOptionsSchema,
  Jp as TextWidgetEditor,
  dl as TextWidgetSchema,
  Ad as TextWidgetView,
  Js as TimeDimensionSchema,
  ll as TipTapDocSchema,
  rl as TooltipOptionsSchema,
  ol as TransformKindSchema,
  hn as VarRefSchema,
  vl as VariableDeclSchema,
  xi as VariableTypeSchema,
  Ci as VariableValueSchema,
  xg as VariablesPanel,
  lo as WidgetChrome,
  Ya as WidgetEditPanel,
  fl as WidgetSpecSchema,
  kf as adaptiveGranularity,
  qo as appendWidget,
  Jc as areaChartFamily,
  Ca as assignColors,
  dd as axisKey,
  Yc as barChartFamily,
  jr as buildFamilyRegistry,
  hv as builtinCharts,
  Ee as builtinFamilyDescriptors,
  An as builtinFamilyRegistry,
  xl as createCubeClient,
  bg as createIdFactory,
  Au as createQueryResolver,
  Zi as createUnitsFormatter,
  Du as createVariableStore,
  Al as datePattern,
  lr as deepMerge,
  Vr as defaultChartFamilies,
  Sg as defaultForType,
  Dr as defaultFormatter,
  Ml as fetchMeta,
  mv as formatCategory,
  $t as formatDateValue,
  mf as geoPointId,
  eu as heatmapChartFamily,
  bt as isEmptyValue,
  ke as isVarRef,
  tu as kpiChartFamily,
  Qc as lineChartFamily,
  Sl as loadSpec,
  Ar as looksLikeIsoDate,
  Ai as makeChartFormat,
  uv as makeDateFormatter,
  dv as makeFormatter,
  $p as mergeLayout,
  En as mergeUnitConversions,
  yg as newChartWidget,
  wg as newInputWidget,
  kg as newTextWidget,
  Ng as newVariable,
  Cg as newWidget,
  ku as normalize,
  Fp as pickCanonicalLayout,
  Xc as pieChartFamily,
  zp as placeNewItem,
  fd as quantityLabel,
  jp as removeWidget,
  Wp as replaceWidget,
  bd as resolveChart,
  au as resolveOptions,
  Xl as resolveOptionsWith,
  Ji as resolveQuery,
  xu as resolveRelativeDateRange,
  Qi as resolveSeriesColors,
  Ru as resolveValue,
  lv as safeLoadSpec,
  Zc as scatterChartFamily,
  nu as tableChartFamily,
  Ti as toDate,
  pu as toResultAnnotation,
  Dp as useChartEditorState,
  Ei as useChartInteractions,
  to as useContainerWidth,
  Pe as useCubeMeta,
  kd as useCubeQuery,
  Ae as useCubeVizContext,
  eo as useDashboard,
  Vo as useDebouncedCallback,
  Ye as useFamilyRegistry,
  pv as useFormatter,
  Yn as useNormalizedSeries,
  $n as useOptionalDashboard,
  cv as validateSpec
};
//# sourceMappingURL=index.js.map
