var us = Object.defineProperty;
var ms = (e, t, n) => t in e ? us(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ua = (e, t, n) => ms(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as g, Fragment as ie } from "react/jsx-runtime";
import * as k from "react";
import { useMemo as X, createContext as oi, useContext as _r, useState as bt, useCallback as Be, useEffect as tn, useRef as tt, createElement as ds, useSyncExternalStore as si, useId as hs, Component as fs } from "react";
import { ruleX as li, text as yt, ruleY as ci, colorLegend as Tr, stack as ui, group as ps, barX as gs, barY as vs, lineX as bs, lineY as Tn, defineChart as Ye, areaY as or, dot as ys, cell as ks } from "@tanstack/charts";
import { crosshair as mi } from "@tanstack/charts/crosshair";
import { scaleBand as ws } from "@tanstack/charts/scales/band";
import { scaleLinear as pn } from "@tanstack/charts/scales/linear";
import { scalePoint as Ns } from "@tanstack/charts/scales/point";
import { Chart as Cs } from "@tanstack/charts/react/core";
import { motion as di } from "@tanstack/charts/motion";
import { tooltip as Or } from "@tanstack/charts/tooltip";
import { d3Curve as Kn } from "@tanstack/charts/d3/shape";
import { brushX as Ss } from "@tanstack/charts/interaction/brush";
import { controlledSignal as xs } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Ms, scaleLog as ma, scaleSqrt as Rs } from "d3-scale";
import { curveNatural as _s, curveStepAfter as Ts, curveMonotoneX as Os } from "d3-shape";
import { format as ce, isValid as Dt, parseISO as gn, subDays as ge, startOfWeek as vn, endOfWeek as bn, startOfMonth as nt, endOfMonth as Vt, startOfQuarter as rt, endOfQuarter as jt, startOfYear as at, endOfYear as Wt, subWeeks as sr, subMonths as it, subQuarters as ot, subYears as st, differenceInCalendarDays as As, parse as hi } from "date-fns";
import { z as d } from "zod";
import { clsx as Ds } from "clsx";
import { Minus as fi, ArrowUp as On, ArrowDown as An, CalendarRange as pi, ChevronsUpDown as Ls, AreaChart as Es, BarChart3 as gi, Grid3X3 as Ps, Table as Fs, Gauge as $s, ScatterChart as Is, PieChart as zs, LineChart as Vs, AlertCircle as Ar, ChevronLeft as Dr, ChevronRight as nn, ChevronDown as Qe, Check as Je, ChevronUp as js, CalendarIcon as vi, MoreVertical as Ws, RefreshCw as Hs, Image as qs, Sheet as Bs, Type as Lr, MapPin as bi, Hash as lr, Calendar as yi, Search as Us, Table2 as ki, Database as wi, Layers as Er, Variable as Ks, Plus as kt, Trash2 as xt, ListFilter as Gs, Box as Ni, EyeOff as Ci, Eye as Si, X as da, Save as xi, SlidersHorizontal as Ys, Braces as Qs, Undo2 as Js, Redo2 as Xs, RotateCcw as Zs, Pencil as el, Copy as tl, Bold as nl, Italic as rl, Strikethrough as al, Heading1 as il, Heading2 as ol, List as sl, ListOrdered as ll, Quote as cl } from "lucide-react";
import * as yn from "@radix-ui/react-popover";
import { cva as Pr } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
import ul from "@cubejs-client/core";
import { DayPicker as ml, useDayPicker as dl } from "react-day-picker";
import { pie as hl, radialArc as cr, radialText as Gn, polar as Mi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as Ri } from "react-grid-layout";
import { useEditor as _i, EditorContent as Ti } from "@tiptap/react";
import Oi from "@tiptap/starter-kit";
const gt = 2, kn = d.object({ var: d.string().min(1) }).strict();
function Ne(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const wn = (e) => d.union([e, kn]), fl = d.union([d.string(), d.number(), d.boolean()]), Ke = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), ur = d.union([d.tuple([d.string(), d.string()]), d.string()]), Ai = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), ae = d.string().min(1), pl = d.enum([
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
]), gl = d.object({
  member: ae,
  operator: pl,
  values: d.array(d.union([fl, kn])).optional()
}).strict(), mr = d.lazy(
  () => d.union([
    gl,
    d.object({ and: d.array(mr) }).strict(),
    d.object({ or: d.array(mr) }).strict()
  ])
), vl = d.object({
  dimension: ae,
  granularity: wn(Ke).optional(),
  dateRange: wn(ur).optional(),
  compareDateRange: d.array(ur).optional()
}).strict(), ha = d.enum(["asc", "desc"]), bl = d.union([
  d.record(ae, ha),
  d.array(d.tuple([ae, ha]))
]), Di = d.object({
  measures: d.array(ae).optional(),
  dimensions: d.array(ae).optional(),
  timeDimensions: d.array(vl).optional(),
  filters: d.array(mr).optional(),
  segments: d.array(ae).optional(),
  order: bl.optional(),
  limit: wn(d.number()).optional(),
  offset: wn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), yl = d.string().min(1), Qv = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Ge = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), kl = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Dn = d.object({
  kind: kl.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: d.string().optional()
}).strict(), fa = d.object({
  label: d.string().optional(),
  colorToken: Ge.optional(),
  stackId: d.string().optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: Dn.optional()
}).strict(), wl = d.object({
  category: d.object({ member: ae }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(ae),
      meta: d.record(ae, fa).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ae,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(ae).optional(),
      pivot: ae,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: d.record(ae, fa).optional()
    }).strict()
  ])
}).strict(), Nl = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Cl = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), pa = d.union([d.number(), d.literal("auto")]), ga = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([pa, pa]).optional(),
  tickFormat: Dn.optional()
}).strict(), Sl = d.object({
  x: ga.optional(),
  y: ga.optional()
}).strict(), xl = d.object({
  byKey: d.record(d.string(), Ge).optional(),
  ramp: d.array(Ge).optional()
}).strict(), cn = 7, Ml = d.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Rl = d.object({
  kind: Ml,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: d.number().int().min(2).max(90).optional()
}).strict(), Li = d.object({
  family: yl,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: wl.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Nl.optional(),
  tooltip: Cl.optional(),
  axes: Sl.optional(),
  colors: xl.optional(),
  format: Dn.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * does NOT bump {@link SCHEMA_VERSION} — every existing v2 spec stays valid.
   */
  transform: Rl.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), _l = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), Tl = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Ol = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(Ke).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: Ai, label: d.string() }).strict()),
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
}).strict(), Fr = {
  id: d.string().min(1),
  title: d.string().optional()
}, Al = d.object({ ...Fr, type: d.literal("chart"), query: Di.default({}), chart: Li }).strict(), Dl = d.object({ ...Fr, type: d.literal("text"), doc: _l }).strict(), Ll = d.object({ ...Fr, type: d.literal("input"), control: Ol }).strict(), El = d.discriminatedUnion("type", [
  Al,
  Dl,
  Ll
]), Pl = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), Fl = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), Ei = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), $l = d.object({
  name: d.string().min(1),
  type: Ei,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: Ai.optional()
}).strict(), Pi = {
  schemaVersion: d.literal(gt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, Fi = d.object({ ...Pi, kind: d.literal("chart"), query: Di.default({}), chart: Li }).strict(), dr = d.object({
  ...Pi,
  kind: d.literal("dashboard"),
  variables: d.array($l),
  widgets: d.array(El),
  layout: d.array(Pl),
  grid: Fl.optional()
}).strict(), $i = d.discriminatedUnion("kind", [Fi, dr]);
function be(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function $r(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function Il(e) {
  if (!be(e.axes)) return;
  const t = $r(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function zl(e) {
  if (!be(e.mapping)) return;
  const t = e.mapping.series;
  if (!be(t) || !be(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!be(a)) continue;
    const i = $r(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Vl(e) {
  if (!be(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => be(n) ? $r(n, "side") ?? {} : n
  ));
}
function jl(e) {
  const t = be(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(be) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = be(e.mapping) ? e.mapping : void 0, a = r && be(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = be(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function va(e) {
  be(e) && (e.family === "combo" && jl(e), Il(e), zl(e), Vl(e));
}
function Wl(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    va(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      be(n) && n.type === "chart" && va(n.chart);
  return t;
}
const Hl = {
  1: Wl
};
function ql(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > gt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${gt} — update the library`
    );
  for (; n < gt; ) {
    const r = Hl[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return $i.parse(t);
}
function Jv(e) {
  try {
    return { ok: !0, spec: ql(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Xv(e) {
  return $i.parse(e);
}
function Bl(e) {
  return ul(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Ul(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function M(...e) {
  return Ds(e);
}
function Kl({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: M("cv-skeleton", e), ...t });
}
const Gl = Pr(
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
), Ln = k.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: M(Gl({ variant: t }), e),
    ...n
  }
));
Ln.displayName = "Alert";
const En = k.forwardRef(
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
En.displayName = "AlertTitle";
const Pn = k.forwardRef(
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
Pn.displayName = "AlertDescription";
const Yl = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Ql = "MMM d, yyyy";
function Ii(e) {
  if (e instanceof Date) return Dt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Dt(r) ? r : null;
  }
  const t = gn(e);
  if (Dt(t)) return t;
  const n = new Date(e);
  return Dt(n) ? n : null;
}
function Ir(e) {
  return /^\d{4}-\d{2}/.test(e) ? Dt(gn(e)) : !1;
}
function Jl(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Yl[t] : Ql;
}
function Ht(e, t, n) {
  const r = Ii(e);
  return r ? ce(r, Jl(t, n)) : String(e);
}
function Zv(e, t) {
  return (n) => n == null ? "" : Ht(n, e, t);
}
function eb(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ht(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ht(e, t.format, t.granularity) : String(e) : Ir(e) ? Ht(e, t.format, t.granularity) : e;
}
const ba = "—", Xl = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ya(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Zl(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of Xl)
    if (n >= r) return ya((e / r).toFixed(t)) + a;
  return ya(e.toFixed(t));
}
function ec(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function tc(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Zl(e, n.decimals ?? 1) : ec(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function zi(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function nc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || zi(e.value) ? !0 : typeof e.value == "string" ? Ir(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const zr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? ba : (zi(t) || typeof t == "string" || typeof t == "number") && nc(e) ? Ht(t, n, r) : typeof t == "number" ? tc(t, e) : String(t);
};
function rc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function tb(e, t) {
  return (n, r) => {
    const a = r ? rc(r, t) : void 0;
    return zr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function ac(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function ic(e) {
  const t = Ke.safeParse(e);
  return t.success ? t.data : void 0;
}
function oc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = ic(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Vi(e, t, n, r) {
  const a = oc(e, t);
  return {
    value(i, o, s = "value") {
      const c = o ? ac(o, e) : void 0, u = c == null ? void 0 : c.meta;
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
const Fn = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: Ge.optional()
}).strict(), Vr = d.boolean().optional(), sc = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(Fn).optional(),
  comparePrevious: Vr
}).strict(), ji = d.enum(["linear", "monotone", "step", "natural"]), lc = d.object({
  curve: ji.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(Fn).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Vr
}).strict(), cc = d.object({
  curve: ji.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(Fn).optional(),
  comparePrevious: Vr
}).strict(), uc = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), mc = d.object({
  x: ae,
  y: ae,
  size: ae.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: ae.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(Fn).optional()
}).strict(), dc = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: ae,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([ae, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: ae.optional(),
    timeDimension: ae.optional(),
    granularity: d.union([Ke, kn]).optional(),
    dateRange: d.union([ur, kn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: Ge }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), hc = d.object({
  member: ae,
  label: d.string().optional(),
  format: Dn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), fc = d.object({
  member: ae,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: Ge.optional()
}).strict(), pc = d.object({
  columns: d.array(hc).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(fc).optional()
}).strict(), gc = d.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Ge.optional(),
  /** Print each cell's formatted value inside the cell. */
  showValues: d.boolean().optional()
}).strict(), Ve = {
  bar: sc,
  line: lc,
  area: cc,
  pie: uc,
  scatter: mc,
  heatmap: gc,
  kpi: dc,
  table: pc
}, je = {
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
function ka(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function hr(e, t) {
  if (t === void 0) return e;
  if (!ka(e) || !ka(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? hr(e[r], a) : a);
  }
  return n;
}
const vc = { envelope: {}, familyOptions: {} };
function bc(e, t) {
  return {
    ...hr({ ...t.envelope }, e),
    familyOptions: hr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Wi = {}, wa = () => {
}, yc = {
  target: Wi,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: wa,
  emitPoint: wa
}, Nn = k.createContext(null);
Nn.displayName = "ChartInteractionContext";
function Hi() {
  return k.useContext(Nn) ?? yc;
}
function jr({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = k.useContext(Nn), o = k.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  k.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = k.useCallback((v) => {
    const { parent: b, widgetId: y, onRangeSelect: w } = o.current, x = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(x) : b == null || b.emitRange(x);
  }, []), c = k.useCallback((v) => {
    const { parent: b, widgetId: y, onPointSelect: w } = o.current, x = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(x) : b == null || b.emitPoint(x);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), h = i == null ? void 0 : i.target, f = k.useMemo(
    () => h || r ? { ...h, ...r } : Wi,
    [h, r]
  ), p = k.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: f,
      rangeEnabled: u,
      pointEnabled: m,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, f, u, m, s, c]
  );
  return /* @__PURE__ */ l(Nn.Provider, { value: p, children: a });
}
function lt(e, t) {
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
function Gt(e) {
  return e.label || e.key;
}
function qe(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Wr(e, t) {
  const n = e.series.map(Gt), r = e.series.map(qe), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Tr({ placement: Mt(t.legendPlacement) })), a;
}
function Mt(e) {
  return e === "top" ? "top" : "bottom";
}
function rn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Cn(e = 0.2) {
  return ws().padding(e);
}
function qi() {
  return Ns().padding(0.02);
}
const kc = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function wc(e) {
  if (typeof e == "string" && kc.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return Ii(e);
}
function Bi(e) {
  return e.toISOString().slice(0, -1);
}
function Na(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Ke.safeParse(n);
  return r.success ? r.data : void 0;
}
function Ui(e, t) {
  var m, h, f;
  const n = (h = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : h.member, r = (f = e.raw.annotation) == null ? void 0 : f.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const p of Object.keys(r))
    if (p === n || p.startsWith(`${n}.`)) {
      a = p;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? Na(n) : Na(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const p of e.categories) {
    if (typeof p == "number" && i === void 0 || typeof p == "string" && !Ir(p)) return null;
    const v = wc(p);
    if (!v) return null;
    s.push(v);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((p) => c.has(p.getTime()) ? !1 : (c.add(p.getTime()), !0)).sort((p, v) => p.getTime() - v.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function Ki(e) {
  return e ? Ms : qi;
}
function Hr(e) {
  return e ? "t" : "cat";
}
function Gi(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Bi(r)) : t.category(r);
}
function Ca(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Bi(t);
}
function Yi(e, t) {
  const n = Hi(), [r, a] = k.useState(null), i = k.useRef({ opts: t, interactions: n, temporal: e });
  k.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return k.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (p) => p !== void 0 && s.some((v) => v.getTime() === p.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], h = u ?? { start: m, end: m }, f = u === null;
    return [
      Ss({
        id: "cv-brush-x",
        values: s,
        range: xs(
          h,
          (p, { reason: v }) => {
            if (v.type !== "commit") return;
            const b = i.current.temporal, y = p.start.getTime() === p.end.getTime();
            if (a(y ? null : p), y || !b) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: b.member,
              granularity: b.granularity,
              from: Ca(b, p.start),
              to: Ca(b, p.end)
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
        selectionStyle: f ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: f ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function Nc(e, t) {
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
function wt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? ma().domain(r) : ma();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: pn().domain(r), nice: !1 } : { scale: pn, nice: !0 };
}
function Yt(e) {
  switch (e) {
    case "monotone":
      return Kn(Os);
    case "step":
      return Kn(Ts);
    case "natural":
      return Kn(_s);
    default:
      return;
  }
}
function qr(e, t) {
  var o, s, c, u, m, h, f, p, v, b;
  const n = e.raw.annotation, r = (y) => {
    var w, x, N, S, C, R;
    if (y)
      return ((w = n == null ? void 0 : n.measures[y]) == null ? void 0 : w.shortTitle) ?? ((x = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : x.shortTitle) ?? ((N = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : N.shortTitle) ?? ((S = n == null ? void 0 : n.measures[y]) == null ? void 0 : S.title) ?? ((C = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : C.title) ?? ((R = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : R.title) ?? y;
  }, a = e.series[0], i = (y) => {
    var w;
    return y ? (w = y.meta) != null && w.measure ? r(y.meta.measure) : y.label : void 0;
  };
  return {
    x: (s = (o = t.axes) == null ? void 0 : o.x) != null && s.labelHide ? void 0 : ((u = (c = t.axes) == null ? void 0 : c.x) == null ? void 0 : u.label) ?? r((h = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : h.member),
    y: (p = (f = t.axes) == null ? void 0 : f.y) != null && p.labelHide ? void 0 : ((b = (v = t.axes) == null ? void 0 : v.y) == null ? void 0 : b.label) ?? i(a)
  };
}
function Br(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Cc(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function Qt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function $n(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.datum.value, r.datum.member, "tooltip");
  return {
    use: Or,
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
          value: e.percentShare && s > 0 && typeof c.datum.value == "number" ? Qt(c.datum.value / s, e.locale) : n(c),
          color: c.color
        }))
      };
    }
  };
}
function Ur(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [];
  return e.forEach((a, i) => {
    const o = `var(--${a.colorToken ?? "muted-foreground"})`, s = { stroke: o, strokeWidth: 1.25, strokeDasharray: "4 4" }, c = a.axis === "x", u = c ? t[a.value] : void 0;
    if (c && u == null) return;
    if (n != null && n.swap ? !c : c) {
      const h = n != null && n.swap ? a.value : u;
      r.push(li([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        yt([{ v: h, label: a.label }], {
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
      r.push(ci([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        yt([{ v: h, label: a.label }], {
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
function Qi(e, t, n) {
  const r = e.filter((i) => i.value !== null && !i.companion);
  if (!r.length) return [];
  const a = Hr((n == null ? void 0 : n.temporal) ?? null);
  return [
    yt(r, {
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
const Sc = di({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), xc = di({ initial: !1 });
function Xe({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = k.useRef(null), u = Hi(), m = u.pointEnabled && !r, h = k.useRef(s);
  k.useLayoutEffect(() => {
    h.current = s;
  });
  const f = k.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const x = h.current, N = x ? x(w) : Nc(w, u.target);
      N && u.emitPoint(N);
    },
    [u]
  ), [p, v] = k.useState({ w: 0, h: 0 }), b = k.useId().replace(/:/g, "");
  k.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const x = new ResizeObserver((N) => {
      var C;
      const S = (C = N[0]) == null ? void 0 : C.contentRect;
      S && v({ w: Math.floor(S.width), h: Math.floor(S.height) });
    });
    return x.observe(w), () => x.disconnect();
  }, []);
  const y = r ? Math.max(24, p.h || Math.round((p.w || 160) / 5)) : Math.max(i, p.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: p.w > 0 && /* @__PURE__ */ l(
        Cs,
        {
          definition: e,
          renderer: a ? Sc : xc,
          width: p.w,
          height: y,
          ariaLabel: t,
          idPrefix: b,
          onSelect: o ?? (m ? f : void 0)
        }
      )
    }
  );
}
function Sa(e, t) {
  let n;
  return e === void 0 ? n = t : typeof e == "string" ? n = Number.parseFloat(e) / 100 : n = e > 1 ? e / 100 : e, Number.isFinite(n) || (n = t), Math.min(0.9, Math.max(0, n));
}
function Mc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = k.useMemo(() => {
    var E, O, _, F, I, A, K, Y;
    const o = t.orientation === "horizontal", s = t.stackMode === "percent", c = t.stackMode === "stacked" || s, u = e.series.filter((W) => {
      var q;
      return (q = W.meta) == null ? void 0 : q.companion;
    }), m = u.length ? e.series.filter((W) => {
      var q;
      return !((q = W.meta) != null && q.companion);
    }) : e.series, h = c ? m : e.series, f = lt(e, { series: h }), p = new Map(e.series.map((W) => [Gt(W), qe(W)])), v = qr(e, t), b = o ? (O = (E = t.axes) == null ? void 0 : E.y) == null ? void 0 : O.hide : (F = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : F.hide, y = o ? (I = t.axes) == null ? void 0 : I.x : (A = t.axes) == null ? void 0 : A.y, w = wt(y), x = Sa(r.barCategoryGap, 0.2), N = Cc(t) ?? Br(e.series[0]), S = (W) => s ? Qt(W) : n.value(W, N, "axis"), C = b ? !1 : {
      label: v.x,
      ticks: { format: (W) => n.category(W) }
    }, R = y != null && y.hide ? !1 : { label: v.y, ticks: { format: S } }, T = s ? ui({ offset: "normalize" }) : c ? void 0 : ps(r.barGap === void 0 ? {} : { padding: Sa(r.barGap, 0.1) }), D = {
      id: "cv-bars",
      z: "label",
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (W) => `${W.label} ${W.i}`,
      layout: T,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (W) => {
        const q = p.get(W.label) ?? "var(--chart-1)";
        return W.companion ? `color-mix(in oklab, ${q} 40%, transparent)` : q;
      }
    }, P = [
      o ? gs(f, { ...D, x: "value", y: "cat" }) : vs(f, { ...D, x: "cat", y: "value" })
    ];
    if (c && !s && u.length) {
      const W = e.categories.map((q, j) => {
        var H, te, ne;
        return {
          cat: typeof q == "number" ? q : String(q),
          value: u.reduce((re, pe) => {
            const Ce = pe.data[j];
            return typeof Ce != "number" ? re : (re ?? 0) + Ce;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((te = (H = u[0]) == null ? void 0 : H.meta) == null ? void 0 : te.measure) ?? ((ne = u[0]) == null ? void 0 : ne.key),
          companion: !0,
          i: j
        };
      });
      if (W.some((q) => q.value !== null)) {
        const q = {
          id: "cv-bars-prev",
          key: (j) => `prev ${j.i}`,
          curve: Yt("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        P.push(
          o ? bs(W, { ...q, x: "value", y: "cat" }) : Tn(W, { ...q, x: "cat", y: "value" })
        );
      }
    }
    return P.push(...Ur(r.referenceLines, e.categories, { swap: o })), r.showValueLabels && !s && P.push(...Qi(f, n, { swap: o })), Ye({
      marks: P,
      x: o ? { scale: w.scale, nice: w.nice, grid: !0, axis: R } : { scale: () => Cn(x), axis: C },
      y: o ? { scale: () => Cn(x), axis: C } : { scale: w.scale, nice: w.nice, grid: !0, axis: R },
      color: Wr(c ? { ...e, series: h } : e, {
        legend: rn(t) && h.length > 1,
        legendPlacement: Mt((K = t.legend) == null ? void 0 : K.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: o ? "group-y" : "group-x",
      tooltip: ((Y = t.tooltip) == null ? void 0 : Y.show) === !1 ? void 0 : $n({ format: n, percentShare: s }),
      keyboard: !0
    });
  }, [e, t, n, r]), i = e.series.map(Gt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(Xe, { definition: a, ariaLabel: i, className: "cv-chart--fill" });
}
function Rc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = r.chrome === "none", i = k.useMemo(
    () => a ? null : Ui(e, t),
    [e, t, a]
  ), o = k.useMemo(() => Gi(i, n), [i, n]), s = Yi(i, {
    label: o,
    ariaLabel: "Time range"
  }), c = k.useMemo(() => {
    var w, x, N, S, C, R, T;
    const m = Hr(i), h = r.connectNulls ?? !1, f = Yt(r.curve ?? "monotone"), p = qr(e, t), v = wt((w = t.axes) == null ? void 0 : w.y), b = e.categories.length <= 1, y = e.series.map((D) => {
      var E, O, _, F;
      const P = lt(e, { series: [D], skipNull: h, temporal: i });
      return Tn(P, {
        id: `cv-line-${D.key}`,
        x: m,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: f,
        strokeWidth: r.strokeWidth ?? 2,
        strokeDasharray: (E = D.meta) != null && E.companion ? "5 4" : void 0,
        strokeOpacity: (O = D.meta) != null && O.companion ? 0.55 : void 0,
        stroke: qe(D),
        points: !a && !((_ = D.meta) != null && _.companion) && ((((F = D.meta) == null ? void 0 : F.dots) ?? r.dots) === !0 || b)
      });
    });
    return a || (y.push(
      ...Ur(r.referenceLines, (i == null ? void 0 : i.dates) ?? e.categories),
      ...Qi(
        r.showValueLabels ? lt(e, { skipNull: !0, temporal: i }) : [],
        n,
        { temporal: i }
      )
    ), y.push(mi({ x: {}, y: !1 }))), Ye({
      marks: y,
      x: {
        scale: Ki(i),
        axis: a || (N = (x = t.axes) == null ? void 0 : x.x) != null && N.hide ? !1 : {
          label: p.x,
          ticks: { format: o }
        }
      },
      y: {
        scale: v.scale,
        nice: v.nice,
        grid: !a,
        axis: a || (C = (S = t.axes) == null ? void 0 : S.y) != null && C.hide ? !1 : {
          label: p.y,
          ticks: {
            format: (D) => {
              var P, E, O;
              return n.value(D, ((E = (P = e.series[0]) == null ? void 0 : P.meta) == null ? void 0 : E.measure) ?? ((O = e.series[0]) == null ? void 0 : O.key), "axis");
            }
          }
        }
      },
      guides: !a,
      color: Wr(e, {
        legend: !a && rn(t) && e.series.length > 1,
        legendPlacement: Mt((R = t.legend) == null ? void 0 : R.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: a || ((T = t.tooltip) == null ? void 0 : T.show) === !1 ? void 0 : $n({ format: n, category: o }),
      margin: a ? 4 : void 0,
      keyboard: !a,
      controls: s
    });
  }, [e, t, n, r, a, i, o, s]), u = e.series.map(Gt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    Xe,
    {
      definition: c,
      ariaLabel: u,
      sparkline: a,
      className: a ? void 0 : "cv-chart--fill"
    }
  );
}
function _c({
  data: e,
  options: t,
  format: n
}) {
  var p, v;
  const r = t.familyOptions ?? {}, a = ((v = (p = t.mapping) == null ? void 0 : p.series) == null ? void 0 : v.mode) === "pivot", i = t.stackMode ?? (a ? "stacked" : "none"), o = i === "stacked" || i === "percent", s = i === "percent", c = k.useMemo(() => Ui(e, t), [e, t]), u = k.useMemo(() => Gi(c, n), [c, n]), m = Yi(c, { label: u, ariaLabel: "Time range" }), h = k.useMemo(() => {
    var F, I, A, K, Y, W, q;
    const b = Hr(c), y = r.connectNulls ?? !1, w = Yt(r.curve ?? "monotone"), x = r.fillOpacity ?? 0.4, N = r.strokeWidth ?? 2, S = qr(e, t), C = wt((F = t.axes) == null ? void 0 : F.y), R = Br(e.series[0]), T = e.series.filter((j) => {
      var H;
      return !((H = j.meta) != null && H.companion);
    }), D = s ? [] : e.series.filter((j) => {
      var H;
      return (H = j.meta) == null ? void 0 : H.companion;
    }), P = new Map(e.series.map((j) => [j.key, qe(j)])), E = [], O = (j) => `cv-area-fill-${j.replace(/[^a-zA-Z0-9_-]/g, "-")}`, _ = o ? void 0 : T.map((j) => ({
      id: O(j.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: qe(j), opacity: x * 0.15 },
        { offset: 1, color: qe(j), opacity: x }
      ]
    }));
    if (o) {
      const j = lt(e, { series: T, skipNull: y, temporal: c });
      E.push(
        or(j, {
          id: "cv-area-stack",
          x: b,
          y: "value",
          z: "label",
          color: "label",
          // "i" alone collides across series inside a single multi-series mark.
          key: (H) => `${H.key}:${H.i}`,
          curve: w,
          fillOpacity: x,
          // Boundary stroke; evaluated from each z-group's first row → per-series color.
          stroke: (H) => P.get(H.key) ?? "currentColor",
          strokeWidth: N,
          layout: s ? ui({ offset: "normalize" }) : void 0
        })
      );
    } else
      for (const j of T) {
        const H = lt(e, { series: [j], skipNull: y, temporal: c });
        E.push(
          or(H, {
            id: `cv-area-${j.key}`,
            x: b,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: w,
            fill: `url(#${O(j.key)})`,
            stroke: qe(j),
            strokeWidth: N
          })
        );
      }
    for (const j of D) {
      const H = lt(e, { series: [j], skipNull: y, temporal: c });
      E.push(
        Tn(H, {
          id: `cv-area-prev-${j.key}`,
          x: b,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: w,
          strokeWidth: N,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: qe(j)
        })
      );
    }
    return E.push(...Ur(r.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories)), E.push(mi({ x: {}, y: !1 })), Ye({
      marks: E,
      gradients: _,
      x: {
        scale: Ki(c),
        axis: (A = (I = t.axes) == null ? void 0 : I.x) != null && A.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: C.scale,
        nice: C.nice,
        grid: !0,
        axis: (Y = (K = t.axes) == null ? void 0 : K.y) != null && Y.hide ? !1 : {
          label: S.y,
          ticks: {
            format: (j) => s ? Qt(j) : n.value(j, R, "axis")
          }
        }
      },
      color: Wr(e, {
        legend: rn(t) && e.series.length > 1,
        legendPlacement: Mt((W = t.legend) == null ? void 0 : W.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((q = t.tooltip) == null ? void 0 : q.show) === !1 ? void 0 : $n({ format: n, percentShare: s, category: u }),
      keyboard: !0,
      controls: m
    });
  }, [e, t, n, r, o, s, c, u, m]), f = e.series.map(Gt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(Xe, { definition: h, ariaLabel: f, className: "cv-chart--fill" });
}
const xa = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Tc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.series[0], i = Br(a), o = k.useMemo(() => {
    const f = e.categories.map((p, v) => ({
      label: n.category(p),
      value: (a == null ? void 0 : a.data[v]) ?? 0
    }));
    return Oc(f, r.maxSlices).map((p, v) => ({
      ...p,
      token: ct[v % ct.length]
    }));
  }, [e, n, a, r.maxSlices]), s = o.reduce((f, p) => f + p.value, 0), c = o.some((f) => f.value < 0), u = c || o.length === 0 || s <= 0, m = k.useMemo(() => {
    var C, R;
    if (u) return null;
    const f = (r.innerRadiusPct ?? 0) / 100, p = (r.outerRadiusPct ?? 80) / 100, v = f > 0, b = r.showLabels ?? "percent", y = hl(o, {
      value: "value",
      gapAngle: (r.padAngle ?? 0) * Math.PI / 180
    }), x = [cr(y, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: T }) => T * f,
      outerRadius: ({ radius: T }) => T * p,
      cornerRadius: r.cornerRadius
    })];
    if (b !== "none") {
      const T = (P) => b === "name" ? P.label : b === "value" ? n.value(P.value, i, "label") : Qt(P.fraction), D = v ? (f + p) / 2 : p * 0.75;
      x.push(
        Gn(
          y.filter((P) => P.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (P) => P.angle,
            radius: D,
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
      if (x.push(
        Gn([{ id: "cv-pie-center" }], {
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
        const D = r.centerLabel.label;
        x.push(
          Gn([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => D,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const N = {
      domain: o.map((T) => T.label),
      range: o.map((T) => `var(--${T.token})`)
    };
    rn(t) && (N.legend = Tr({ placement: Mt((C = t.legend) == null ? void 0 : C.position) }));
    const S = a ? a.label || a.key : "";
    return Ye({
      marks: [
        Mi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: pn().domain([0, Math.PI * 2]) },
          radius: { scale: pn().domain([0, 1]) },
          marks: x
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: N,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((R = t.tooltip) == null ? void 0 : R.show) === !1 ? void 0 : {
        use: Or,
        className: "cv-chart-tooltip",
        content: (T) => {
          const D = T[0];
          if (!D) return { rows: [] };
          const P = D.datum;
          return {
            title: P.label,
            rows: [
              {
                label: S,
                value: `${n.value(P.value, i, "tooltip")} (${Qt(P.fraction)})`,
                color: D.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [u, o, s, t, n, r, a, i]);
  if (c)
    return /* @__PURE__ */ l("div", { style: xa, children: "Pie charts can't show negative values" });
  if (!m)
    return /* @__PURE__ */ l("div", { style: xa, children: "No data" });
  const h = o.map((f) => f.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(Xe, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function Oc(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function Ac({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.annotation, i = (f) => {
    var p, v;
    return ((p = a == null ? void 0 : a.measures[f]) == null ? void 0 : p.shortTitle) ?? ((v = a == null ? void 0 : a.dimensions[f]) == null ? void 0 : v.shortTitle) ?? f;
  }, o = r.x ? i(r.x) : "x", s = r.y ? i(r.y) : "y", c = r.size ? i(r.size) : void 0, u = k.useMemo(() => {
    var F, I, A, K, Y, W, q, j, H, te, ne, re, pe, Ce, Le, se, $;
    if (!r.x || !r.y) return null;
    const f = Lc(e.raw.rows, r);
    if (f.length === 0) return null;
    const p = !!r.groupBy, v = [];
    if (p)
      for (const L of f)
        L.group !== void 0 && !v.includes(L.group) && v.push(L.group);
    const [b, y] = r.sizeRange ?? [40, 400], w = Math.sqrt(Math.max(b, 0) / Math.PI), x = Math.sqrt(Math.max(y, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    };
    p ? (N.z = "group", N.color = "group") : N.fill = `var(--${ct[0]})`, r.size ? (N.r = (L) => L.size ?? 0, N.rScale = { scale: () => Rs().range([w, x]) }) : N.r = 4;
    const S = [ys(f, N)];
    (F = r.referenceLines) == null || F.forEach((L, B) => {
      const G = `var(--${L.colorToken ?? "muted-foreground"})`, z = { stroke: G, strokeWidth: 1.25, strokeDasharray: "4 4" };
      L.axis === "y" ? (S.push(ci([L.value], { id: `cv-ref-${B}`, ...z })), L.label && S.push(
        yt([{ v: L.value, label: L.label }], {
          id: `cv-ref-label-${B}`,
          y: "v",
          text: "label",
          fill: G,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (S.push(li([L.value], { id: `cv-ref-${B}`, ...z })), L.label && S.push(
        yt([{ v: L.value, label: L.label }], {
          id: `cv-ref-label-${B}`,
          x: "v",
          text: "label",
          fill: G,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let C;
    p && (C = {
      domain: v,
      range: v.map(
        (L, B) => `var(--${ct[B % ct.length]})`
      )
    }, rn(t) && (C.legend = Tr({ placement: Mt((I = t.legend) == null ? void 0 : I.position) })));
    const R = (K = (A = t.axes) == null ? void 0 : A.x) != null && K.labelHide ? void 0 : ((W = (Y = t.axes) == null ? void 0 : Y.x) == null ? void 0 : W.label) ?? o, T = (j = (q = t.axes) == null ? void 0 : q.y) != null && j.labelHide ? void 0 : ((te = (H = t.axes) == null ? void 0 : H.y) == null ? void 0 : te.label) ?? s, D = wt((ne = t.axes) == null ? void 0 : ne.x), P = wt((re = t.axes) == null ? void 0 : re.y), E = r.x, O = r.y, _ = r.size;
    return Ye({
      marks: S,
      x: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (Ce = (pe = t.axes) == null ? void 0 : pe.x) != null && Ce.hide ? !1 : {
          label: R,
          ticks: { format: (L) => n.value(L, E, "axis") }
        }
      },
      y: {
        scale: P.scale,
        nice: P.nice,
        grid: !0,
        axis: (se = (Le = t.axes) == null ? void 0 : Le.y) != null && se.hide ? !1 : {
          label: T,
          ticks: { format: (L) => n.value(L, O, "axis") }
        }
      },
      color: C,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: (($ = t.tooltip) == null ? void 0 : $.show) === !1 ? void 0 : {
        use: Or,
        className: "cv-chart-tooltip",
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (L) => {
          const G = L[0];
          if (!G) return { rows: [] };
          const z = G.datum, V = [
            { label: o, value: n.value(z.x, E, "tooltip") },
            { label: s, value: n.value(z.y, O, "tooltip") }
          ];
          return _ && V.push({
            label: c ?? _,
            value: n.value(z.size, _, "tooltip")
          }), { title: z.group, color: G.color, rows: V };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, r, o, s, c]), m = r.groupBy, h = (f) => {
    var v;
    if (!f || !m) return null;
    const p = (v = f.datum) == null ? void 0 : v.group;
    return p === void 0 ? null : { member: m, value: p, label: p };
  };
  return u ? /* @__PURE__ */ l(
    Xe,
    {
      definition: u,
      ariaLabel: `${o} vs ${s} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: h
    }
  ) : /* @__PURE__ */ l("div", { style: Dc, children: "No data" });
}
const Dc = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Lc(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = Yn(r[t.x]), o = Yn(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? Yn(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function Yn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ec(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function Ma(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Pc(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Fc(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Ji(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Fc(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => Ji(e, t, n), r;
}
function $c({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = Ec(t), s = e.raw.rows, c = e.raw.annotation, u = k.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const f = Ma(s, a), p = Ma(s, i), v = /* @__PURE__ */ new Map();
    return s.forEach((b, y) => {
      const w = Pc(b[o]), x = b[f], N = b[p];
      if (w === null || x === null || x === void 0 || N === null || N === void 0)
        return;
      const S = typeof x == "number" ? x : String(x), C = String(N);
      v.set(`${S}\0${C}`, {
        cat: S,
        label: C,
        value: w,
        key: `${S}|${C}`,
        member: o,
        i: y
      });
    }), [...v.values()];
  }, [s, a, i, o]), m = k.useMemo(() => {
    var x, N, S, C, R, T, D, P, E, O, _, F, I;
    let f = Number.POSITIVE_INFINITY, p = Number.NEGATIVE_INFINITY;
    for (const A of u)
      A.value < f && (f = A.value), A.value > p && (p = A.value);
    const v = (A) => {
      if (!A) return;
      const K = (c == null ? void 0 : c.dimensions[A]) ?? (c == null ? void 0 : c.timeDimensions[A]) ?? (c == null ? void 0 : c.measures[A]);
      return (K == null ? void 0 : K.shortTitle) ?? (K == null ? void 0 : K.title) ?? A;
    }, b = (N = (x = t.axes) == null ? void 0 : x.x) != null && N.labelHide ? void 0 : ((C = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : C.label) ?? v(a), y = (T = (R = t.axes) == null ? void 0 : R.y) != null && T.labelHide ? void 0 : ((P = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : P.label) ?? v(i), w = [
      ks(u, {
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
      yt(u, {
        id: "cv-heatmap-values",
        x: "cat",
        y: "label",
        text: (A) => n.value(A.value, A.member, "label"),
        fill: "currentColor",
        fontSize: 10
      })
    ), Ye({
      marks: w,
      x: {
        scale: () => Cn(0.05),
        axis: (O = (E = t.axes) == null ? void 0 : E.x) != null && O.hide ? !1 : {
          label: b,
          ticks: { format: (A) => n.category(A) }
        }
      },
      y: {
        scale: () => Cn(0.05),
        axis: (F = (_ = t.axes) == null ? void 0 : _.y) != null && F.hide ? !1 : { label: y }
      },
      color: {
        scale: Ji(f, p, r.colorToken ?? "chart-1")
      },
      tooltip: ((I = t.tooltip) == null ? void 0 : I.show) === !1 ? void 0 : $n({ format: n })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const h = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(Xe, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function Ic(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function zc(e) {
  return `cv-kpi-trend--${e}`;
}
function Vc(e) {
  var c, u, m, h;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (f) => r.value(f, a.measure, "kpi"), o = Xi([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : h.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Yc, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(jc, { ...e, value: o, label: s, fo: a, fmt: i });
}
function jc({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var f;
  const a = n.goodDirection ?? ((f = n.comparison) == null ? void 0 : f.goodDirection) ?? "up", i = t === null ? null : Jc(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Wc(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((p) => p !== null), m = i ? i.diff : c ? Uc(c) : 0, h = zc(Ic(m, a));
  return /* @__PURE__ */ g("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ g("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Kc, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Hc, {}) : /* @__PURE__ */ l(qc, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Bc, { data: e, series: c, colorClass: h }) })
  ] });
}
function Wc(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Hc() {
  return /* @__PURE__ */ g(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(pi, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function qc() {
  return /* @__PURE__ */ g("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(fi, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Bc({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = k.useMemo(() => {
    const a = lt(e, { series: [t], skipNull: !0 }), i = wt(void 0);
    return Ye({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        or(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: Yt("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Tn(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: Yt("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: qi, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    Xe,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Uc(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Kc({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? fi : a ? On : An, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const Lt = -(2 * Math.PI) / 3, fr = 2 * Math.PI / 3, Gc = fr - Lt;
function Yc({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, h;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : Qc(e, r)) ?? "chart-1", u = k.useMemo(() => {
    const f = (s - a) / (o - a), p = Lt + f * Gc, v = ({ radius: w }) => w * 0.7, b = cr([{ startAngle: Lt, endAngle: fr }], {
      id: "cv-gauge-track",
      innerRadius: v,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), y = f > 0 ? [
      b,
      cr([{ startAngle: Lt, endAngle: p }], {
        id: "cv-gauge-value",
        innerRadius: v,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [b];
    return Ye({
      marks: [
        Mi({
          id: "cv-gauge",
          startAngle: Lt,
          endAngle: fr,
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
      Xe,
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
function Qc(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Xi(e, t) {
  for (const n of e) {
    const r = Zi(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Jc(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Xi(e, r.value));
  else {
    const s = e[1];
    a = s ? Zi(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function Zi(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const eo = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: M("cv-table", e), ...t }) })
);
eo.displayName = "Table";
const to = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: M("cv-table-header", e), ...t }));
to.displayName = "TableHeader";
const no = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: M("cv-table-body", e), ...t }));
no.displayName = "TableBody";
const un = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: M("cv-table-row", e),
      ...t
    }
  )
);
un.displayName = "TableRow";
const pr = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: M("cv-table-head", e),
    ...t
  }
));
pr.displayName = "TableHead";
const mn = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: M("cv-table-cell", e),
    ...t
  }
));
mn.displayName = "TableCell";
const Xc = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: M("cv-table-caption", e), ...t }));
Xc.displayName = "TableCaption";
const ro = Pr(
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
), U = k.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: M(ro({ variant: t, size: n }), e),
      ...a
    }
  )
);
U.displayName = "Button";
function Zc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = k.useMemo(
    () => eu(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = k.useState(null), [u, m] = k.useState(0), h = r.sortable !== !1, f = r.pageSize ?? 25, p = k.useMemo(() => {
    if (!s) return a;
    const N = s.dir === "asc" ? 1 : -1;
    return [...a].sort((S, C) => iu(S[s.member], C[s.member]) * N);
  }, [a, s]), v = Math.max(1, Math.ceil(p.length / f)), b = Math.min(u, v - 1), y = p.slice(b * f, b * f + f), w = (N) => {
    h && (c(
      (S) => (S == null ? void 0 : S.member) === N ? { member: N, dir: S.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), m(0));
  }, x = r.rowHeight === "compact";
  return /* @__PURE__ */ g("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: M("cv-table-scroll", r.stickyHeader && "cv-table-scroll--sticky"), children: /* @__PURE__ */ g(eo, { children: [
      /* @__PURE__ */ l(to, { className: M(r.stickyHeader && "cv-table-header--sticky"), children: /* @__PURE__ */ g(un, { children: [
        r.showRowNumbers && /* @__PURE__ */ l(pr, { className: "cv-table-rownum", children: "#" }),
        o.map((N) => /* @__PURE__ */ l(
          pr,
          {
            className: Ra(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: h ? /* @__PURE__ */ g(
              U,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: () => w(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ l(au, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ g(no, { children: [
        y.map((N, S) => /* @__PURE__ */ g(un, { children: [
          r.showRowNumbers && /* @__PURE__ */ l(
            mn,
            {
              className: M(
                "cv-table-cell--right cv-table-cell--muted",
                x && "cv-table-cell--compact"
              ),
              children: b * f + S + 1
            }
          ),
          o.map((C) => {
            const R = ou(C.member, N[C.member], r.conditionalFormat);
            return /* @__PURE__ */ l(
              mn,
              {
                className: M(Ra(C.align), x && "cv-table-cell--compact"),
                style: R ? { color: R } : void 0,
                children: C.render(N[C.member])
              },
              C.member
            );
          })
        ] }, S)),
        y.length === 0 && /* @__PURE__ */ l(un, { children: /* @__PURE__ */ l(
          mn,
          {
            colSpan: o.length + (r.showRowNumbers ? 1 : 0),
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    p.length > f && /* @__PURE__ */ g("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ g("span", { children: [
        b * f + 1,
        "–",
        Math.min((b + 1) * f, p.length),
        " of",
        " ",
        p.length
      ] }),
      /* @__PURE__ */ g("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.max(0, N - 1)),
            disabled: b === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.min(v - 1, N + 1)),
            disabled: b >= v - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function eu(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : nu(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = t ? ru(t, c) : void 0, m = t ? c in t.measures : !1, h = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, f = s.align ?? (m ? "right" : "left");
    return {
      member: c,
      label: h,
      align: f,
      width: s.width,
      render: (p) => tu(p, m, c, r)
    };
  });
}
function tu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function nu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function ru(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ra(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function au({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(On, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(An, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Ls, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function iu(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function ou(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && su(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function su(e, t, n) {
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
const et = "cv-sidebar--default", lu = "cv-sidebar--wide", ao = "a date or category", Qn = [
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
    hint: ao,
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
], cu = [
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
    hint: ao,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], uu = [
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
], mu = [
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
], du = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], hu = [
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
], fu = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], We = (e) => fu.indexOf(e), Ie = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: gi,
    order: We("bar"),
    component: Mc,
    optionsSchema: Ve.bar,
    defaults: je.bar,
    wells: Qn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: et
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Vs,
    order: We("line"),
    component: Rc,
    optionsSchema: Ve.line,
    defaults: je.line,
    wells: Qn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: et
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Es,
    order: We("area"),
    component: _c,
    optionsSchema: Ve.area,
    defaults: je.area,
    wells: Qn,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: et
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: zs,
    order: We("pie"),
    component: Tc,
    optionsSchema: Ve.pie,
    defaults: je.pie,
    wells: uu,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: et
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Is,
    order: We("scatter"),
    component: Ac,
    optionsSchema: Ve.scatter,
    defaults: je.scatter,
    wells: mu,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: et
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: $s,
    order: We("kpi"),
    component: Vc,
    optionsSchema: Ve.kpi,
    defaults: je.kpi,
    wells: du,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: lu
  },
  table: {
    family: "table",
    label: "Table",
    icon: Fs,
    order: We("table"),
    component: Zc,
    optionsSchema: Ve.table,
    defaults: je.table,
    wells: hu,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: et
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Ps,
    order: We("heatmap"),
    component: $c,
    optionsSchema: Ve.heatmap,
    defaults: je.heatmap,
    wells: cu,
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
    sidebarWidthClass: et
  }
}, pu = Ie.bar, gu = Ie.line, vu = Ie.area, bu = Ie.pie, yu = Ie.scatter, ku = Ie.heatmap, wu = Ie.kpi, Nu = Ie.table, Kr = [
  pu,
  gu,
  vu,
  bu,
  yu,
  ku,
  wu,
  Nu
], Cu = d.any();
function Gr(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? vc;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Cu;
    },
    resolveOptions: (o) => bc(o, i.defaults(o.family))
  };
  return i;
}
const In = Gr(Kr);
function Su(e, t = In) {
  return t.resolveOptions(e);
}
function xu(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Yr(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function Mu(e) {
  const t = Math.floor(e ?? cn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Ru(e, t) {
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
function _u(e) {
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
function Tu(e, t) {
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
function Ou(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function Au(e, t, n) {
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
function Du(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Tu(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Ou(o.meta)
      }))
    };
  }
  const a = Mu(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Ru(i.data, a) : _u(i.data)
    }))
  };
}
const nb = Object.fromEntries(
  Object.entries(Ie).map(([e, t]) => [e, t.component])
);
function io({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = In
}) {
  const u = X(() => Su(t, c), [t, c]), m = c.get(u.family), h = (m == null ? void 0 : m.queryless) ?? !1, f = Yr(m) ? u.transform : void 0, p = X(() => Du(e, f), [e, f]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(Kl, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ g(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ar, {}),
      /* @__PURE__ */ l(En, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Pn, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : xu(p), b = Au(
    r ?? Vi(e.raw.annotation, u, zr),
    f
  ), y = (i == null ? void 0 : i[u.family]) ?? c.require(u.family).component;
  return /* @__PURE__ */ l(
    y,
    {
      data: p,
      options: u,
      config: v,
      format: b,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const ct = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Jn = 8;
function _a(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function oo(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ct, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function Ta(e, t) {
  const n = oo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Lu(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function ln(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Lu(e[n]);
  return t;
}
function Eu(e) {
  return {
    measures: ln(e.measures ?? {}),
    dimensions: ln(e.dimensions ?? {}),
    segments: ln(e.segments ?? {}),
    timeDimensions: ln(e.timeDimensions ?? {})
  };
}
function vt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function zn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = (t == null ? void 0 : t.format) ?? n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Pu(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Fu(e, t) {
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
function $u(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Vn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function Iu(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function so(e, t, n, r, a = In) {
  const i = Eu(e.annotation()), o = Fu(i, r), s = $u(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const h = n.measures ?? [];
    if (a.require(t.family).measureOnly && h.length > 0) {
      const f = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: h.map((b) => Vn(f[b])),
          meta: { ...zn(vt(i, h[0]), void 0, t.format), measure: h[0] }
        }
      ];
      return Ta(p, t.colors), {
        categories: h.map(
          (b) => {
            var y, w;
            return ((y = vt(i, b)) == null ? void 0 : y.shortTitle) ?? ((w = vt(i, b)) == null ? void 0 : w.title) ?? b;
          }
        ),
        series: p,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || _a(p)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Vu(e, c.series, t, i) : ju(e, c.category.member, c.series, t, i), m = zu(e, c);
  return Iu(u, o), Ta(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || _a(u)
  };
}
function zu(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Vu(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = vt(r, s), u = i == null ? void 0 : i[s], m = o.map((h) => Vn(h[s]));
    return {
      key: s,
      label: Pu(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...zn(c, u, n.format), measure: s }
    };
  });
}
function ju(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, h = { x: [t], y: [s, "measures"] }, p = e.seriesNames(h).filter((w) => {
    const x = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return x === void 0 || u.has(x);
  }), v = e.chartPivot(h), b = vt(a, i), y = p.map((w) => {
    var E, O;
    const x = (E = w.yValues) == null ? void 0 : E[0], N = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, S = vt(a, N), C = (S == null ? void 0 : S.shortTitle) ?? (S == null ? void 0 : S.title) ?? N, R = x ?? w.shortTitle ?? w.title ?? w.key, T = m ? `${C} · ${R}` : R, D = v.map((_) => Vn(_[w.key])), P = (O = n.meta) == null ? void 0 : O[N];
    return {
      key: w.key,
      label: T,
      data: D,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...zn(S ?? b, P, r.format),
        measure: N
      }
    };
  });
  return Wu(y, b, r.format);
}
function Wu(e, t, n) {
  var m, h, f;
  if (e.length <= Jn) return e;
  const r = (p) => p.data.reduce((v, b) => v + (b ?? 0), 0), a = [...e].sort((p, v) => r(v) - r(p)), i = a.slice(0, Jn - 1), o = a.slice(Jn - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (p, v) => {
    let b = 0, y = !1;
    for (const w of o) {
      const x = w.data[v];
      x !== null && (b += x, y = !0);
    }
    return y ? b : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...zn(t, void 0, n), ...(f = (h = i[0]) == null ? void 0 : h.meta) != null && f.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Vn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ee = (e) => ce(e, "yyyy-MM-dd");
function Hu(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ee(t), ee(t)];
  if (n === "yesterday") {
    const o = ge(t, 1);
    return [ee(o), ee(o)];
  }
  if (n === "this week") return [ee(vn(t)), ee(bn(t))];
  if (n === "this month") return [ee(nt(t)), ee(Vt(t))];
  if (n === "this quarter") return [ee(rt(t)), ee(jt(t))];
  if (n === "this year") return [ee(at(t)), ee(Wt(t))];
  if (n === "last week") {
    const o = sr(t, 1);
    return [ee(vn(o)), ee(bn(o))];
  }
  if (n === "last month") {
    const o = it(t, 1);
    return [ee(nt(o)), ee(Vt(o))];
  }
  if (n === "last quarter") {
    const o = ot(t, 1);
    return [ee(rt(o)), ee(jt(o))];
  }
  if (n === "last year") {
    const o = st(t, 1);
    return [ee(at(o)), ee(Wt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ee(ge(t, a - 1)), ee(t)] : i.startsWith("week") ? [ee(ge(t, a * 7 - 1)), ee(t)] : i.startsWith("month") ? [ee(nt(it(t, a))), ee(Vt(it(t, 1)))] : i.startsWith("quarter") ? [ee(rt(ot(t, a))), ee(jt(ot(t, 1)))] : [ee(at(st(t, a))), ee(Wt(st(t, 1)))];
}
function Nt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const qu = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Bu(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Jt(e, t, n) {
  var r;
  if (Ne(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Uu(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Jt(o, t, n);
    if (!Nt(s))
      if (Array.isArray(s))
        for (const c of s)
          Nt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? Hu(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Ku(e, t, n) {
  if ("and" in e) {
    const r = gr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = gr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Uu(e, t, n);
}
function gr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Ku(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Gu(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Jt(e.granularity, t, n);
    Nt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Jt(e.dateRange, t, n);
    Nt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function lo(e, t, n) {
  const r = qu(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Gu(i, r, t))), e.filters !== void 0) {
    const i = gr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = Jt(e.limit, r, t);
    Nt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = Jt(e.offset, r, t);
    Nt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function co() {
  let e, t;
  return (n, r, a) => {
    const i = lo(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Yu(e, t) {
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
class Qu extends Error {
}
const Ju = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Qu(`"${e}" cannot be parsed into a number`);
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
function Oa(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Xu extends Error {
}
class Aa extends Error {
}
class Zu extends Error {
}
class Xn extends Error {
}
class em extends Error {
}
class tm {
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
      throw new Aa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Oa(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Zu(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Xn(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Xn(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, h = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof h == "number")
        o = this.cls.mul(o, h);
      else if (Oa(h))
        o = this.cls.mul(o, this.convertFraction(h));
      else
        throw new Xn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new Aa(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const h = this.describe(m);
      if (o.indexOf(m) === -1 && h.system === c) {
        const p = this.to(m);
        if (i ? this.cls.gt(p, s) : this.cls.lt(p, s))
          continue;
        (u === null || (i ? this.cls.lte(p, s) && this.cls.gt(p, u.val) : this.cls.gte(p, s) && this.cls.lt(p, u.val))) && (u = {
          val: p,
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
        throw new em(`Meausure "${t}" not found.`);
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
    throw new Xu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function nm(e) {
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
function rm(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = nm(e);
  return (r) => new tm({
    measures: e,
    unitCache: n,
    cls: Ju
  }, r);
}
const am = {
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
}, im = {
  systems: {
    metric: am
  }
}, om = {
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
}, sm = {
  systems: {
    SI: om
  }
}, lm = {
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
}, cm = {
  systems: {
    SI: lm
  }
}, um = {
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
}, mm = {
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
}, dm = {
  systems: {
    metric: um,
    imperial: mm
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
}, hm = {
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
}, fm = {
  systems: {
    SI: hm
  }
}, pm = {
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
}, gm = {
  systems: {
    SI: pm
  }
}, vm = {
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
}, bm = {
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
}, ym = {
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
}, km = {
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
}, wm = {
  systems: {
    bit: vm,
    byte: bm,
    IECBit: ym,
    IECByte: km
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
}, Nm = {
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
}, Cm = {
  systems: {
    metric: Nm
  }
}, Sm = {
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
}, xm = {
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
}, Mm = {
  systems: {
    SI: Sm,
    nutrition: xm
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
}, Rm = {
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
}, _m = {
  systems: {
    SI: Rm
  }
}, Tm = {
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
}, Om = {
  systems: {
    SI: Tm
  }
}, Am = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Dm = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Lm = {
  systems: {
    metric: Am,
    imperial: Dm
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
}, Em = {
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
}, Pm = {
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
}, Fm = {
  systems: {
    metric: Em,
    imperial: Pm
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
}, $m = {
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
}, Im = {
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
}, zm = {
  systems: {
    metric: $m,
    imperial: Im
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
}, Vm = {
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
}, jm = {
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
}, Wm = {
  systems: {
    metric: Vm,
    imperial: jm
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
}, Hm = {
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
}, qm = {
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
}, Bm = {
  systems: {
    metric: Hm,
    imperial: qm
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
}, Um = {
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
}, Km = {
  systems: {
    SI: Um
  }
}, Gm = {
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
}, Ym = {
  systems: {
    unit: Gm
  }
}, Qm = {
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
}, Jm = {
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
}, Xm = {
  systems: {
    metric: Qm,
    imperial: Jm
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
}, Zm = {
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
}, ed = {
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
}, td = {
  systems: {
    metric: Zm,
    imperial: ed
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
}, nd = {
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
}, rd = {
  systems: {
    SI: nd
  }
}, ad = {
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
}, id = {
  systems: {
    SI: ad
  }
}, od = {
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
}, sd = {
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
}, ld = {
  systems: {
    metric: od,
    imperial: sd
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
}, cd = {
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
}, ud = {
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
}, md = {
  systems: {
    metric: cd,
    imperial: ud
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
}, dd = {
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
}, hd = {
  systems: {
    SI: dd
  }
}, fd = {
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
}, pd = {
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
}, gd = {
  systems: {
    metric: fd,
    imperial: pd
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
}, vd = {
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
}, bd = {
  systems: {
    SI: vd
  }
}, yd = {
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
}, kd = {
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
}, wd = {
  systems: {
    metric: yd,
    imperial: kd
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
}, Nd = {
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
}, Cd = {
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
}, Sd = {
  systems: {
    metric: Nd,
    imperial: Cd
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
}, xd = {
  acceleration: im,
  angle: sm,
  apparentPower: cm,
  area: dm,
  charge: fm,
  current: gm,
  digital: wm,
  each: Cm,
  energy: Mm,
  force: _m,
  frequency: Om,
  illuminance: Lm,
  length: Fm,
  mass: zm,
  massFlowRate: Wm,
  pace: Bm,
  partsPer: Km,
  pieces: Ym,
  power: Xm,
  pressure: td,
  reactiveEnergy: rd,
  reactivePower: id,
  speed: ld,
  torque: gd,
  temperature: md,
  time: hd,
  voltage: bd,
  volume: wd,
  volumeFlowRate: Sd
}, Md = rm(xd), Rd = {
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
function _d(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Md(t).from(e.from).to(e.to)
  };
}
const vr = {
  ...Object.fromEntries(
    Object.entries(Rd).map(([e, t]) => [e, _d(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function jn(e) {
  return e ? { ...vr, ...e } : vr;
}
function Td(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Od(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Ad(e) {
  return e != null && e.quantity ? Od(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Dd = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function uo(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Da(e, t) {
  const n = e * (Dd[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${uo(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Zn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return uo((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Ld(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function La(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function mo(e = vr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return zr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Da(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return La(Zn(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Da(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return La(Zn(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? Ld(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Zn(n, t)}${u}`;
  };
}
const Wn = oi(null);
Wn.displayName = "CubeVizContext";
function Ee() {
  const e = _r(Wn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Ze() {
  return Ee().families;
}
function Ed(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function rb({
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
    () => Gr(Kr, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = X(
    () => Ed(e) ? Bl(e) : e,
    [e]
  ), h = X(
    () => {
      var y;
      return {
        chartRamp: (y = t == null ? void 0 : t.chartRamp) != null && y.length ? t.chartRamp : ct,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = X(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), p = X(() => a ?? {}, [a]), v = X(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), b = X(
    () => ({
      cubeClient: m,
      registry: p,
      families: u,
      locale: f,
      theme: h,
      maps: v
    }),
    [m, p, u, f, h, v]
  );
  return /* @__PURE__ */ l(Wn.Provider, { value: b, children: /* @__PURE__ */ l(
    "div",
    {
      className: M(
        "cv-root",
        h.mode === "dark" && "dark",
        h.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(
        jr,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      )
    }
  ) });
}
function Qr({
  families: e,
  children: t
}) {
  const n = Ee(), r = (e ?? []).map((i) => i.family).join("|"), a = X(() => !e || e.length === 0 ? n : { ...n, families: Gr(Kr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(ie, { children: t }) : /* @__PURE__ */ l(Wn.Provider, { value: a, children: t });
}
function Pd(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Fd = 5e3;
function ho(e, t) {
  const { cubeClient: n } = Ee(), r = (t == null ? void 0 : t.skip) ?? !1, a = X(
    () => e.limit === void 0 ? { ...e, limit: Fd } : e,
    [e]
  ), i = X(() => JSON.stringify(a), [a]), [o, s] = bt({ isLoading: !r }), [c, u] = bt(0), m = Be(() => u((h) => h + 1), []);
  return tn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let h = !0;
    const f = new AbortController();
    return s((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: f.signal }).then((p) => {
      h && s({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      h && s({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      h = !1, f.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Hn = oi(null);
Hn.displayName = "DashboardContext";
function Jr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = tt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Yu(r, t), key: r });
  const i = a.current.store, o = $d(i, r);
  return ds(Hn.Provider, { value: o }, n);
}
function $d(e, t) {
  const n = Be(
    (i, o) => e.set(i, o),
    [e]
  ), r = Be(
    (i) => lo(i, e.getAll(), t),
    [e, t]
  ), a = Be(
    (i) => Bu(i, e.getAll(), t),
    [e, t]
  );
  return X(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Id(e) {
  const t = si(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function fo() {
  const e = _r(Hn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Id(e);
}
function an() {
  return _r(Hn);
}
const zd = () => () => {
};
function er(e, t, n) {
  var N;
  const r = an(), { locale: a } = Ee(), i = Ze(), o = tt(null);
  o.current === null && (o.current = co());
  const s = o.current, c = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !c, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), h = si(
    u && r ? r.store.subscribe : zd,
    m,
    m
  ), { resultSet: f, isLoading: p, error: v, refetch: b } = ho(h, { skip: n == null ? void 0 : n.skip }), y = ((N = t.format) == null ? void 0 : N.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = X(() => jn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: X(() => {
    if (f)
      return so(f, t, h, { unitSystem: y, conversions: w }, i);
  }, [f, t, h, y, w, i]), isLoading: p, error: v, refetch: b, resolvedQuery: h };
}
function ze() {
  const { cubeClient: e } = Ee(), [t, n] = bt({ isLoading: !0 });
  return tn(() => {
    let r = !0;
    return n({ isLoading: !0 }), Ul(e).then((a) => {
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
function ab() {
  const { locale: e } = Ee(), { formatValue: t, units: n } = e;
  return X(
    () => t ?? mo(jn(n)),
    [t, n]
  );
}
function po() {
  const [e, t] = bt(0), n = tt(null), r = tt(null), a = tt(null), i = tt(0), o = Be((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = Be(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = Be(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const h = new ResizeObserver((f) => {
        var p, v;
        for (const b of f) {
          const y = ((v = (p = b.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : v.inlineSize) ?? b.contentRect.width;
          o(y);
        }
      });
      h.observe(u), r.current = h;
    },
    [o, s]
  );
  return tn(() => s, [s]), [c, e];
}
const Vd = "day";
function jd(e, t) {
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
        granularity: r.granularity ?? Vd,
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
function Wd(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = gn(e[0]), i = gn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = As(i, a) + 1;
    return [J(ge(a, o)), J(ge(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = ge(t, 1);
    return [J(a), J(a)];
  }
  if (n === "yesterday") {
    const a = ge(t, 2);
    return [J(a), J(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [J(ge(t, 2 * a - 1)), J(ge(t, a))];
    if (i.startsWith("week")) return [J(ge(t, 14 * a - 1)), J(ge(t, 7 * a))];
    if (i.startsWith("month"))
      return [J(nt(it(t, 2 * a))), J(ge(nt(it(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [J(rt(ot(t, 2 * a))), J(ge(rt(ot(t, a)), 1))];
    if (i.startsWith("year"))
      return [J(at(st(t, 2 * a))), J(ge(at(st(t, a)), 1))];
  }
  if (n === "this week") {
    const a = sr(t, 1);
    return [J(vn(a)), J(bn(a))];
  }
  if (n === "this month") {
    const a = it(t, 1);
    return [J(nt(a)), J(Vt(a))];
  }
  if (n === "this quarter") {
    const a = ot(t, 1);
    return [J(rt(a)), J(jt(a))];
  }
  if (n === "this year") {
    const a = st(t, 1);
    return [J(at(a)), J(Wt(a))];
  }
  if (n === "last week") {
    const a = sr(t, 2);
    return [J(vn(a)), J(bn(a))];
  }
  if (n === "last month") {
    const a = it(t, 2);
    return [J(nt(a)), J(Vt(a))];
  }
  if (n === "last quarter") {
    const a = ot(t, 2);
    return [J(rt(a)), J(jt(a))];
  }
  if (n === "last year") {
    const a = st(t, 2);
    return [J(at(a)), J(Wt(a))];
  }
}
function Hd(e, t, n = In) {
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
  const s = Wd(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const qd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Xr({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var I;
  const { registry: c, locale: u } = Ee(), m = Ze(), h = ((I = m.get(t.family)) == null ? void 0 : I.queryless) ?? !1, f = X(() => {
    var A;
    return (A = t.format) != null && A.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), p = X(() => {
    const A = e ?? {};
    return A.timezone || !(u != null && u.timezone) ? A : { ...A, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: v, isLoading: b, error: y, refetch: w, resolvedQuery: x } = er(
    p,
    f,
    { skip: h }
  ), N = X(() => jd(p, f), [p, f]), S = er(
    (N == null ? void 0 : N.query) ?? p,
    (N == null ? void 0 : N.chart) ?? f,
    { skip: !N }
  ), C = X(
    () => Hd(x, f, m),
    [x, f, m]
  ), R = er(
    (C == null ? void 0 : C.query) ?? p,
    f,
    { skip: !C, skipResolve: !0 }
  ), T = X(
    () => ({ [f.family]: Pd(c, f.family, m) }),
    [c, f.family, m]
  ), D = X(() => {
    let A = v ?? qd;
    if (N && S.data) {
      A = { ...A, series: S.data.series, categories: S.data.categories };
      const K = A.raw.rows.length > 0, Y = A.series.some((W) => W.data.some((q) => q !== null));
      A = { ...A, empty: !K && !Y };
    }
    if (C && R.data) {
      if (C.mode === "kpiRow") {
        const K = R.data.raw.rows[0];
        if (K) {
          const Y = A.raw.rows[0];
          A = {
            ...A,
            raw: { ...A.raw, rows: Y ? [Y, K] : [K] }
          };
        }
      } else if (!R.data.empty) {
        const K = new Map(R.data.series.map((Y) => [Y.key, Y]));
        if (!A.empty && A.series.length > 0) {
          const Y = A.categories.length, W = A.series.map((q) => {
            const j = K.get(q.key), H = Array.from({ length: Y }, (te, ne) => (j == null ? void 0 : j.data[ne]) ?? null);
            return {
              ...q,
              key: `${q.key}__prev`,
              label: `${q.label} (prev)`,
              colorToken: q.colorToken,
              data: H,
              meta: { ...q.meta, companion: !0 }
            };
          });
          A = { ...A, series: [...A.series, ...W] };
        } else {
          const Y = R.data.series.map((W) => ({
            ...W,
            key: `${W.key}__prev`,
            label: `${W.label} (prev)`,
            data: [...W.data],
            meta: { ...W.meta, companion: !0 }
          }));
          A = {
            ...A,
            categories: R.data.categories,
            series: Y,
            empty: !1
          };
        }
      }
    }
    return A;
  }, [v, N, S.data, C, R.data]);
  tn(() => {
    n == null || n({ rows: D.raw.rows, refetch: w, isLoading: b });
  }, [n, D.raw.rows, w, b]);
  const P = {}, E = X(
    () => u.formatValue ?? mo(jn(u.units)),
    [u.formatValue, u.units]
  ), O = X(
    () => Vi(D.raw.annotation, f, E, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [D.raw.annotation, f, E, u.locale, u.unitSystem]
  ), _ = f.mapping, F = X(
    () => ({
      categoryMember: _ == null ? void 0 : _.category.member,
      pivotMember: (_ == null ? void 0 : _.series.mode) === "pivot" ? _.series.pivot : void 0,
      formatCategory: O.category
    }),
    [_, O]
  );
  return /* @__PURE__ */ l(
    jr,
    {
      widgetId: i,
      target: F,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        io,
        {
          data: D,
          options: f,
          config: P,
          format: O,
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
function Bd({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Xr,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const go = "cube-viz-prose";
function Ud(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Kd({ doc: e }) {
  const t = Ud(e), n = X(
    () => t ? e : null,
    [t, e]
  ), r = _i(
    {
      extensions: [Oi],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: M(go) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(Ti, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const dn = [
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
], Gd = Object.fromEntries(
  dn.map((e) => [e.value, e.label])
);
function Ea(e) {
  return Gd[e.trim().toLowerCase()] ?? e;
}
const Yd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Qd({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = dl(), a = M(ro({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ g("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: M(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Dr, {})
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
        children: /* @__PURE__ */ l(nn, {})
      }
    )
  ] });
}
function Jd({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
function vo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    ml,
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
        MonthCaption: Qd,
        DayButton: Jd,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? Dr : nn, { className: M("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ l(yn.Root, { "data-slot": "popover", ...e });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ l(yn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Oe({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(yn.Portal, { children: /* @__PURE__ */ l(
    yn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: M("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Se({
  ...e
}) {
  return /* @__PURE__ */ l(ye.Root, { "data-slot": "select", ...e });
}
function br({
  ...e
}) {
  return /* @__PURE__ */ l(ye.Group, { "data-slot": "select-group", ...e });
}
function xe({
  ...e
}) {
  return /* @__PURE__ */ l(ye.Value, { "data-slot": "select-value", ...e });
}
function Me({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ g(
    ye.Trigger,
    {
      "data-slot": "select-trigger",
      className: M("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(ye.Icon, { asChild: !0, children: /* @__PURE__ */ l(Qe, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Xd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ye.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: M("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(js, {})
    }
  );
}
function Zd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ye.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: M("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Qe, {})
    }
  );
}
function Re({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(ye.Portal, { children: /* @__PURE__ */ g(
    ye.Content,
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
        /* @__PURE__ */ l(Xd, {}),
        /* @__PURE__ */ l(
          ye.Viewport,
          {
            className: M(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Zd, {})
      ]
    }
  ) });
}
function yr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ye.Label,
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
    ye.Item,
    {
      "data-slot": "select-item",
      className: M("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(ye.ItemIndicator, { children: /* @__PURE__ */ l(Je, {}) }) }),
        /* @__PURE__ */ l(ye.ItemText, { children: t })
      ]
    }
  );
}
const Ct = "cv-field", eh = "cv-field-label", Et = "yyyy-MM-dd";
function th(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Pa(e) {
  if (!e) return;
  const t = hi(e, Et, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function nh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Yd, [i, o] = bt(!1), s = typeof e == "string", [c, u] = th(e), m = Pa(c), h = Pa(u), f = m ? { from: m, to: h } : void 0;
  let p;
  s ? p = Ea(e) : m && h ? p = `${ce(m, "MMM d, yyyy")} – ${ce(h, "MMM d, yyyy")}` : m ? p = ce(m, "MMM d, yyyy") : p = "Pick a date range";
  const v = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ g(_e, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(
      U,
      {
        variant: "outline",
        className: M(
          "cv-daterange-trigger",
          p === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(vi, {}),
          p
        ]
      }
    ) }),
    /* @__PURE__ */ g(Oe, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((b) => /* @__PURE__ */ l(
        U,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(b), o(!1);
          },
          children: Ea(b)
        },
        b
      )) }),
      /* @__PURE__ */ l(
        vo,
        {
          mode: "range",
          selected: f,
          defaultMonth: m,
          disabled: v,
          onSelect: (b) => {
            b != null && b.from && b.to ? t([ce(b.from, Et), ce(b.to, Et)]) : b != null && b.from ? t([ce(b.from, Et), ce(b.from, Et)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const rh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function ah(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function ih(e) {
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
function oh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = fo(), i = r.rangeVariable ? ih(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? ah(i) : rh), s = typeof e == "string" ? e : "", c = o.join(",");
  return tn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ g(
    Se,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Me, { className: Ct, children: /* @__PURE__ */ l(xe, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: o.map((u) => /* @__PURE__ */ l(de, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function sh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: M(Ct, "cv-field--multi"),
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
    Se,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Me, { className: Ct, children: /* @__PURE__ */ l(xe, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: r.options.map((i) => /* @__PURE__ */ l(de, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function lh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = ze(), o = X(() => {
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
      className: Ct,
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
function ch({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Ct,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function uh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Ct,
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
function mh({ value: e, onChange: t, decl: n }) {
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
const dh = {
  dateRange: nh,
  granularity: oh,
  select: sh,
  memberSelect: lh,
  text: ch,
  number: uh,
  toggle: mh
};
function hh({ control: e, title: t }) {
  var p;
  const { registry: n } = Ee(), { decls: r, resolveValue: a, setVar: i } = fo(), o = X(
    () => r.find((v) => v.name === e.variable),
    [r, e.variable]
  ), s = hs();
  if (!o)
    return /* @__PURE__ */ g("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((p = n.controls) == null ? void 0 : p[c]) ?? dh[c], m = a(e.variable), h = (v) => i(e.variable, v), f = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: h, decl: o, control: e.control }) : /* @__PURE__ */ g("div", { children: [
    /* @__PURE__ */ l("label", { className: eh, htmlFor: s, children: f }),
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
const bo = k.forwardRef(
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
bo.displayName = "Card";
const yo = k.forwardRef(
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
yo.displayName = "CardHeader";
const ko = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: M("cv-card-title", e),
      ...t
    }
  )
);
ko.displayName = "CardTitle";
const fh = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-description", e), ...t })
);
fh.displayName = "CardDescription";
const ph = k.forwardRef(
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
ph.displayName = "CardAction";
const wo = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-content", e), ...t })
);
wo.displayName = "CardContent";
const gh = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: M("cv-card-footer", e), ...t })
);
gh.displayName = "CardFooter";
const Sn = "cube-viz-drag-handle";
function No(e) {
  var s;
  const { registry: t } = Ee(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ g(bo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ g(
      yo,
      {
        ...i,
        className: M(Sn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(ko, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(wo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class Fa extends fs {
  constructor() {
    super(...arguments);
    ua(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ g(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ar, {}),
      /* @__PURE__ */ l(En, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Pn, { children: n.message })
    ] }) : this.props.children;
  }
}
function vh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function bh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function yh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const kh = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Ue(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let ft = null;
function Co(e = {}) {
  return ft || (e.includeStyleProperties ? (ft = e.includeStyleProperties, ft) : (ft = Ue(window.getComputedStyle(document.documentElement)), ft));
}
function xn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function wh(e) {
  const t = xn(e, "border-left-width"), n = xn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Nh(e) {
  const t = xn(e, "border-top-width"), n = xn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function So(e, t = {}) {
  const n = t.width || wh(e), r = t.height || Nh(e);
  return { width: n, height: r };
}
function Ch() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const we = 16384;
function Sh(e) {
  (e.width > we || e.height > we) && (e.width > we && e.height > we ? e.width > e.height ? (e.height *= we / e.width, e.width = we) : (e.width *= we / e.height, e.height = we) : e.width > we ? (e.height *= we / e.width, e.width = we) : (e.width *= we / e.height, e.height = we));
}
function Mn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function xh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Mh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), xh(a);
}
const ke = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ke(n, t);
};
function Rh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function _h(e, t) {
  return Co(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Th(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? Rh(n) : _h(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function $a(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = kh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Th(o, n, a, r)), t.appendChild(s);
}
function Oh(e, t, n) {
  $a(e, t, ":before", n), $a(e, t, ":after", n);
}
const Ia = "application/font-woff", za = "image/jpeg", Ah = {
  woff: Ia,
  woff2: Ia,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: za,
  jpeg: za,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Dh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Zr(e) {
  const t = Dh(e).toLowerCase();
  return Ah[t] || "";
}
function Lh(e) {
  return e.split(/,/)[1];
}
function kr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Eh(e, t) {
  return `data:${t};base64,${e}`;
}
async function xo(e, t, n) {
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
const tr = {};
function Ph(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ea(e, t, n) {
  const r = Ph(e, t, n.includeQueryParams);
  if (tr[r] != null)
    return tr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await xo(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Lh(s)));
    a = Eh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return tr[r] = a, a;
}
async function Fh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Mn(t);
}
async function $h(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Mn(s);
  }
  const n = e.poster, r = Zr(n), a = await ea(n, r, t);
  return Mn(a);
}
async function Ih(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await qn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function zh(e, t) {
  return ke(e, HTMLCanvasElement) ? Fh(e) : ke(e, HTMLVideoElement) ? $h(e, t) : ke(e, HTMLIFrameElement) ? Ih(e, t) : e.cloneNode(Mo(e));
}
const Vh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Mo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function jh(e, t, n) {
  var r, a;
  if (Mo(t))
    return t;
  let i = [];
  return Vh(e) && e.assignedNodes ? i = Ue(e.assignedNodes()) : ke(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ue(e.contentDocument.body.childNodes) : i = Ue(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || ke(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => qn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Wh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Co(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), ke(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Hh(e, t) {
  ke(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ke(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function qh(e, t) {
  if (ke(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Bh(e, t, n) {
  return ke(t, Element) && (Wh(e, t, n), Oh(e, t, n), Hh(e, t), qh(e, t)), t;
}
async function Uh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await qn(u, t, !0));
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
async function qn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => zh(r, t)).then((r) => jh(e, r, t)).then((r) => Bh(e, r, t)).then((r) => Uh(r, t));
}
const Ro = /url\((['"]?)([^'"]+?)\1\)/g, Kh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Gh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Yh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Qh(e) {
  const t = [];
  return e.replace(Ro, (n, r, a) => (t.push(a), n)), t.filter((n) => !kr(n));
}
async function Jh(e, t, n, r, a) {
  try {
    const i = n ? yh(t, n) : t, o = Zr(t);
    let s;
    return a || (s = await ea(i, o, r)), e.replace(Yh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Xh(e, { preferredFontFormat: t }) {
  return t ? e.replace(Gh, (n) => {
    for (; ; ) {
      const [r, , a] = Kh.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function _o(e) {
  return e.search(Ro) !== -1;
}
async function To(e, t, n) {
  if (!_o(e))
    return e;
  const r = Xh(e, n);
  return Qh(r).reduce((i, o) => i.then((s) => Jh(s, o, t, n)), Promise.resolve(r));
}
async function pt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await To(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Zh(e, t) {
  await pt("background", e, t) || await pt("background-image", e, t), await pt("mask", e, t) || await pt("-webkit-mask", e, t) || await pt("mask-image", e, t) || await pt("-webkit-mask-image", e, t);
}
async function ef(e, t) {
  const n = ke(e, HTMLImageElement);
  if (!(n && !kr(e.src)) && !(ke(e, SVGImageElement) && !kr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await ea(r, Zr(r), t);
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
async function tf(e, t) {
  const r = Ue(e.childNodes).map((a) => Oo(a, t));
  await Promise.all(r).then(() => e);
}
async function Oo(e, t) {
  ke(e, Element) && (await Zh(e, t), await ef(e, t), await tf(e, t));
}
function nf(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Va = {};
async function ja(e) {
  let t = Va[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Va[e] = t, t;
}
async function Wa(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), xo(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function Ha(e) {
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
async function rf(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ue(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = ja(c).then((m) => Wa(m, t)).then((m) => Ha(m).forEach((h) => {
              try {
                a.insertRule(h, h.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (f) {
                console.error("Error inserting rule from remote css", {
                  rule: h,
                  error: f
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
        a.href != null && r.push(ja(a.href).then((s) => Wa(s, t)).then((s) => Ha(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ue(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function af(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => _o(t.style.getPropertyValue("src")));
}
async function of(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ue(e.ownerDocument.styleSheets), r = await rf(n, t);
  return af(r);
}
function Ao(e) {
  return e.trim().replace(/["']/g, "");
}
function sf(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Ao(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function lf(e, t) {
  const n = await of(e, t), r = sf(e);
  return (await Promise.all(n.filter((i) => r.has(Ao(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return To(i.cssText, o, t);
  }))).join(`
`);
}
async function cf(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await lf(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function uf(e, t = {}) {
  const { width: n, height: r } = So(e, t), a = await qn(e, t, !0);
  return await cf(a, t), await Oo(a, t), nf(a, t), await Mh(a, n, r);
}
async function mf(e, t = {}) {
  const { width: n, height: r } = So(e, t), a = await uf(e, t), i = await Mn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Ch(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || Sh(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function df(e, t = {}) {
  return (await mf(e, t)).toDataURL();
}
function hf(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function ff(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function pf(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function gf(e, t, n = 2) {
  const r = await df(e, {
    pixelRatio: n,
    backgroundColor: pf(e),
    cacheBust: !0
  });
  ff(r, `${hf(t)}.png`);
}
function vf({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = k.useState(!1), [o, s] = k.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const v = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    bh(vh(t), `${v}.csv`);
  }, h = async () => {
    const v = r == null ? void 0 : r.current;
    if (!(!v || a)) {
      i(!0), s(null);
      try {
        await gf(v, e);
      } catch (b) {
        s(b instanceof Error ? b.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, f = (v) => v.stopPropagation(), p = (v = !0) => M("cv-menu-item", !v && "cv-menu-item--disabled");
  return /* @__PURE__ */ g(_e, { children: [
    /* @__PURE__ */ l(
      Te,
      {
        onMouseDown: f,
        onPointerDown: f,
        onTouchStart: f,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Ws, {})
      }
    ),
    /* @__PURE__ */ g(Oe, { align: "end", className: "cv-menu", onMouseDown: f, onPointerDown: f, onTouchStart: f, children: [
      n ? /* @__PURE__ */ g("button", { type: "button", onClick: n, className: p(), children: [
        /* @__PURE__ */ l(Hs, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ g("button", { type: "button", onClick: h, disabled: a, className: p(!a), children: [
        /* @__PURE__ */ l(qs, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ g("button", { type: "button", onClick: m, disabled: !c, className: p(c), children: [
        /* @__PURE__ */ l(Bs, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function qa({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        Xr,
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
      return /* @__PURE__ */ l(Kd, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(hh, { control: e.control, title: e.title });
  }
}
function wr({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = bt({ rows: [] }), s = Be(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = tt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Fa, { children: /* @__PURE__ */ l(qa, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    vf,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    No,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Fa, { children: /* @__PURE__ */ l(
        qa,
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
const Do = (e) => e.filter((t) => t.type === "chart");
function bf(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Do(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Ne(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function yf(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(Ne);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of Do(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function kf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n,
  children: r
}) {
  const a = an(), i = a == null ? void 0 : a.setVar, o = k.useMemo(() => bf(e.widgets), [e.widgets]), s = k.useMemo(() => yf(e.widgets), [e.widgets]), c = k.useRef({ onRangeSelect: t, onPointSelect: n });
  c.current = { onRangeSelect: t, onPointSelect: n };
  const u = k.useCallback(
    (p) => {
      var v, b;
      if (i) {
        const y = p != null && p.widgetId ? o.get(p.widgetId) : void 0;
        if (y) i(y, p ? [p.from, p.to] : void 0);
        else if (!p) for (const w of new Set(o.values())) i(w, void 0);
      }
      (b = (v = c.current).onRangeSelect) == null || b.call(v, p);
    },
    [i, o]
  ), m = k.useCallback(
    (p) => {
      var v, b;
      if (i)
        if (p) {
          const y = s.get(p.member);
          y && i(y, [String(p.value)]);
        } else
          for (const y of new Set(s.values())) i(y, void 0);
      (b = (v = c.current).onPointSelect) == null || b.call(v, p);
    },
    [i, s]
  ), h = !!(t || i && o.size), f = !!(n || i && s.size);
  return /* @__PURE__ */ l(
    jr,
    {
      onRangeSelect: h ? u : void 0,
      onPointSelect: f ? m : void 0,
      children: r
    }
  );
}
const wf = "lg", Nf = 640;
function Cf(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Sf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function ib({
  spec: e,
  editable: t = !1,
  families: n,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = po(), s = e.grid ?? {}, c = s.cols ?? 12, u = s.rowHeight ?? 40, m = s.margin ?? [12, 12], h = s.containerPadding ?? m, f = X(
    () => ({ [wf]: Sf(e.layout) }),
    [e.layout]
  ), p = X(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  ), v = !t && o > 0 && o < Nf;
  return /* @__PURE__ */ l(Qr, { families: n, children: /* @__PURE__ */ l(Jr, { spec: e, children: /* @__PURE__ */ l(kf, { spec: e, onRangeSelect: r, onPointSelect: a, children: /* @__PURE__ */ l("div", { ref: i, className: "cv-dashboard", children: o <= 0 ? null : v ? /* @__PURE__ */ l(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: m[1],
        padding: `${h[1]}px ${h[0]}px`
      },
      children: Cf(e.layout).map((b) => {
        const y = p.get(b.i);
        if (!y) return null;
        const w = b.h * u + (b.h - 1) * m[1];
        return /* @__PURE__ */ l("div", { style: { height: w }, children: /* @__PURE__ */ l(wr, { widget: y, editable: !1 }) }, b.i);
      })
    }
  ) : /* @__PURE__ */ l(
    Ri,
    {
      width: o,
      layouts: f,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: u,
      margin: m,
      containerPadding: h,
      dragConfig: { enabled: t, handle: `.${Sn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = p.get(b.i);
        return y ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(wr, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) }) }) }) });
}
function ob({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(Qr, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    No,
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
        Bd,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function Bn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function xf(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Fe(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Un(e) {
  return e ? e.cubes.filter((t) => Fe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Bn(t),
    joinTargets: xf(t)
  })) : [];
}
function qt(e, t) {
  if (!(!e || !t))
    return Un(e).find((n) => n.name === t);
}
function ta(e) {
  return e.shortTitle || e.title || e.name;
}
function ut(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Lo(e) {
  return ut(e.meta, "group");
}
function Mf(e) {
  return ut(e.meta, "geoPoint");
}
function Ba(e) {
  const t = ut(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Rf(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function hn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function _f(e, t) {
  if (t)
    return Xt(e, "time", t).find(hn);
}
function Tf(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Lo(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Eo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ut(n, "quantity"),
    unit: ut(n, "unit")
  };
}
function fn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ut(n, "quantity"),
    unit: ut(n, "unit")
  };
}
function Po(e, t) {
  return {
    name: e.name,
    label: ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Of(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = Mf({ meta: i });
    !o || !Fe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Ba({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Ba({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Rf(o[0].name, s[0].name),
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
function Xt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Fe(a) || n && a.name !== n) continue;
    const i = Bn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Of(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Fe(s) && o(Eo(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Fe(s) && s.type !== "time" && o(fn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Fe(s) && s.type === "time" && o(fn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Fe(s) && s.type === "number" && o(fn(s, a.name));
  }
  return r;
}
function Af(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Fe(a) || n && !n.has(a.name)) continue;
    const i = Bn(a);
    for (const o of a.segments) {
      if (!Fe(o)) continue;
      const s = Po(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function $e(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Bn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(Eo(i, n.name)) : a(fn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Po(o, n.name));
    }
    return Xt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Ua(e) {
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
const Nr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Fo = {
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
function Df(e) {
  return e === "number";
}
function Pe(e) {
  return e.target !== void 0;
}
function fe(e, t) {
  return e.kinds.includes(t);
}
function $o(e, t, n) {
  if (!fe(e, t)) {
    const r = e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} takes ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function mt(e) {
  return e.chart.familyOptions ?? {};
}
function na(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Io(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Lf(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Ef(e, t, n) {
  var o, s;
  const r = e.chart;
  if (na(r)) return;
  const a = on(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = mt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Rt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = mt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!Pe(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = on(a);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = Io(a), h = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, h);
        break;
      }
      case "pivot": {
        const m = na(a) ?? Ef(e, t, n);
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
function ra(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function aa(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Pf(e, t) {
  return { ...e, dimensions: ra(e.dimensions, t) };
}
function zo(e, t) {
  const n = aa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Vo(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Ff(e) {
  const t = $f(e);
  return t === void 0 ? qf : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function $f(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function At(e, t, n, r) {
  if (Df(n)) return { ...e, measures: ra(e.measures, t) };
  if (n === "time") {
    const a = sn(e) ?? r;
    return Vo(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? Ff(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return Pf(e, t);
}
function Pt(e, t, n, r) {
  const a = e.query ?? {}, i = Rt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = sn(a);
  if ((o == null ? void 0 : o.dimension) === n) return Vo(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = aa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return zo(a, n);
}
function If(e, t, n, r) {
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
  return { category: { member: e }, series: Ho(t, r) };
}
function Bt(e, t, n) {
  var c, u;
  const r = Rt(e, t, n), a = (m) => t.find((h) => {
    var f;
    return ((f = h.target) == null ? void 0 : f.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : on(e.chart),
    measures: o ? r[o.id] ?? [] : Io(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : na(e.chart)
  };
}
function Ut(e, t, n) {
  const r = { ...Wo(e.chart), ...Lf(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: If(n.category, n.measures, n.pivot, r)
    }
  };
}
function Rn(e, t, n) {
  const r = { ...mt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function ia(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !Pe(i)) return e;
  const o = i.target, s = Rt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = sn(c);
      u && u !== r && (c = Pt(e, t, u, n)), c = At(c, r, a, m);
      const h = Bt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...h, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : ra(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = Pt(e, t, s[0], n)), c = At(c, r, a);
      const m = Bt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = Pt(e, t, u, n)), c = At(c, r, a);
      const m = Bt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = Pt(e, t, u, n)), c = At(c, r, a), Rn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(mt(e)[o.key]) ? [...mt(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = At(c, r, a), Rn(e, c, { [o.key]: u });
    }
  }
}
function zf(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Pe(a)) return e;
  const i = a.target, o = Pt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Bt(e, t), c = aa(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : zo(o, s.pivot);
      return Ut(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Bt(e, t);
      return Ut(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Rn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(mt(e)[i.key]) ? mt(e)[i.key] : [];
      return Rn(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Vf(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = sn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function jf(e, t) {
  if (fe(t, e)) return e;
  if (e === "category" && fe(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && fe(t, "category") || e === "time" && fe(t, "category")) return "category";
}
function Wf(e, t, n) {
  const r = Rt(e, t), a = /* @__PURE__ */ new Map();
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
      const m = jf(Vf(e, u), o);
      m && (i = ia(i, n, o.id, u, m));
    }
  }
  return i;
}
function Hf(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Pe(a)) continue;
    const i = n.findIndex((o) => fe(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Ft(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function jo(e) {
  var o, s, c, u, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return Ft(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Ft(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return Ft(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Ft(i);
}
function Cr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Wo(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function on(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function sn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Ho(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const qf = "day";
function Sr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Bf(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Sr(r) && Sr(a) ? Wf(e, r.wells, a.wells) : Uf(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Uf(e, t) {
  var p;
  const { chart: n } = e, r = e.query ?? {}, a = Cr(n).length ? Cr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((v) => v.dimension), o = on(n) ?? ((p = r.dimensions) == null ? void 0 : p[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (v, b, y) => !!v && y.indexOf(v) === b
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Sr(t)) {
    const v = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: v } } : c;
  }
  const u = [...a], m = [...s], h = (v) => i.includes(v) ? "time" : "category";
  let f = c;
  for (const v of t.wells) {
    if (!v.target || !v.channel) continue;
    const b = fe(v, "category") ? [
      [m, h],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, h]
    ];
    let y = 0;
    for (const [w, x] of b)
      for (let N = 0; N < w.length; ) {
        if (v.cardinality === "one" && y > 0 || !fe(v, x(w[N]))) {
          N += 1;
          continue;
        }
        f = ia(f, t.wells, v.id, w[N], x(w[N])), w.splice(N, 1), y += 1;
      }
  }
  return f;
}
function Ka(e) {
  return Td(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function qo(e) {
  return Ad(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Kf(e, t) {
  return t.require(e).wells;
}
function Bo(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Rt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function $t(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = ia(e, o.wells, n, r, a);
  return Yf(e, s, o.wells);
}
function Gf(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = zf(e, i.wells, n, r);
  return Uo(e, o, i.wells);
}
function Yf(e, t, n) {
  return Qf(e, Uo(e, t, n));
}
function Qf(e, t) {
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
function Uo(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(Rt(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
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
function _n(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(yi, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(lr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(bi, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Lr, { className: "cv-member-type-icon" });
  }
}
function Ko({
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
  const { meta: u, isLoading: m } = ze(), h = k.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return Xt(u, n).filter((y) => b.has(y.cube));
    }
    return Xt(u, n, e);
  }, [u, n, e, t]), f = k.useMemo(() => {
    const b = Jf(h), y = b.length > 1, w = [];
    for (const [x, N] of b)
      for (const [S, C] of Tf(N, () => "Other")) {
        const R = y ? S === "Other" ? x : `${x} · ${S}` : S;
        w.push({ key: `${x}:${S}`, label: R, items: C });
      }
    return w;
  }, [h]), p = f.length > 1, v = h.find((b) => b.name === r);
  return /* @__PURE__ */ g(Se, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(Me, { id: s, className: c, children: /* @__PURE__ */ l(xe, { placeholder: m ? "Loading…" : i, children: v ? /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
      _n(v.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Re, { children: f.map((b) => /* @__PURE__ */ g(br, { children: [
      p && b.label ? /* @__PURE__ */ l(yr, { children: b.label }) : null,
      b.items.map((y) => /* @__PURE__ */ l(de, { value: y.name, children: /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
        _n(y.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: y.label })
      ] }) }, y.name))
    ] }, b.key)) })
  ] });
}
function Jf(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Zt({
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
const Ga = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(bi, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(lr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(lr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Lr, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(yi, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Ya = ["geoPoint", "number", "numberDimension", "category", "time"];
function Go({
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
  var _, F;
  const { meta: u, isLoading: m } = ze(), [h, f] = k.useState(!1), [p, v] = k.useState(""), [b, y] = k.useState(r.viewLocked ?? "tables"), [w, x] = k.useState({});
  k.useEffect(() => {
    h && y(r.viewLocked ?? "tables");
  }, [h, r.viewLocked]);
  const N = k.useMemo(() => new Set(t), [t]), S = p.trim().toLowerCase(), C = k.useMemo(() => {
    if (b !== "tables") {
      const A = r.views.find((K) => K.name === b) ?? qt(u, b);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const I = [];
    r.sourceCube && I.push({ cube: r.sourceCube, tag: "source" });
    for (const A of r.relatedCubes) I.push({ cube: A, tag: "related" });
    return I;
  }, [b, r, u]), R = [
    ...Ya.filter((I) => fe(e, I)),
    ...Ya.filter((I) => !fe(e, I))
  ], T = (I) => {
    const A = [], K = /* @__PURE__ */ new Map();
    for (const Y of R) {
      const W = Ga[Y], q = $o(e, Y, n ?? []);
      let j = Xt(u, W.metaKind, I);
      Y === "time" && (j = [...j].sort(
        (H, te) => Number(hn(te)) - Number(hn(H))
      ));
      for (const H of j) {
        if (N.has(H.name) || S && !(H.label.toLowerCase().includes(S) || H.name.toLowerCase().includes(S))) continue;
        const te = Lo(H), ne = te ? `g:${te.toLowerCase()}` : `k:${W.label}`;
        let re = K.get(ne);
        re || (re = {
          key: ne,
          label: te ?? W.label,
          headerIcon: te ? void 0 : W.icon,
          rejected: q !== void 0,
          items: []
        }, K.set(ne, re), A.push(ne)), q === void 0 && (re.rejected = !1), re.items.push({ option: H, kind: Y, blocked: q });
      }
    }
    return A.map((Y) => K.get(Y));
  }, D = C.map((I) => ({ section: I, groups: T(I.cube.name) })).filter((I) => I.groups.length > 0), P = D.length > 0, E = (I, A) => {
    i(I, A), f(!1), v("");
  }, O = b === "tables" ? "All related tables" : ((_ = r.views.find((I) => I.name === b)) == null ? void 0 : _.title) ?? ((F = qt(u, b)) == null ? void 0 : F.title) ?? b;
  return /* @__PURE__ */ g(_e, { open: h, onOpenChange: f, children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: c }),
    /* @__PURE__ */ g(Oe, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ g("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ g("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Us, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (I) => v(I.target.value),
              placeholder: m ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ l(
          Xf,
          {
            browse: b,
            label: O,
            views: r.viewLocked ? r.views.filter((I) => I.name === r.viewLocked) : [],
            onBrowse: y
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: P ? D.map(({ section: I, groups: A }, K) => {
        const Y = A.reduce((H, te) => H + te.items.length, 0), W = I.tag === "related", q = w[I.cube.name] ?? W, j = S.length > 0 ? !0 : !q;
        return /* @__PURE__ */ g("div", { children: [
          I.tag === "related" && K > 0 && D[K - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => x((H) => ({ ...H, [I.cube.name]: !q })),
              className: "cv-picker-table",
              children: [
                j ? /* @__PURE__ */ l(Qe, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(nn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(ki, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: I.cube.title }),
                I.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : I.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: Y })
              ]
            }
          ),
          j ? A.map((H) => /* @__PURE__ */ g(
            "div",
            {
              className: M(
                "cv-picker-group",
                H.rejected && "cv-picker-group--rejected"
              ),
              children: [
                A.length > 1 ? /* @__PURE__ */ g("div", { className: "cv-picker-group-header", children: [
                  H.headerIcon,
                  H.label,
                  H.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                H.items.map(({ option: te, kind: ne, blocked: re }) => /* @__PURE__ */ l(
                  Zf,
                  {
                    option: te,
                    kindIcon: Ga[ne].icon,
                    badge: ne === "time" && hn(te) ? "default" : void 0,
                    reason: re ?? a(te),
                    onPick: () => E(te.name, ne)
                  },
                  te.name
                ))
              ]
            },
            H.key
          )) : null
        ] }, I.cube.name);
      }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: m ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Xf({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = k.useState(!1), o = (s) => {
    r(s), i(!1);
  };
  return /* @__PURE__ */ g(_e, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ g(
      Te,
      {
        className: "cv-picker-source-trigger",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ l(wi, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ g(Oe, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Qa, { active: e === "tables", icon: /* @__PURE__ */ l(ki, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ g(ie, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ l(
          Qa,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ l(Er, { className: "cv-ec-icon" }),
            onClick: () => o(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Qa({
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
        e ? /* @__PURE__ */ l(Je, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Zf({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
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
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: t })
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
const ep = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], It = "yyyy-MM-dd";
function tp(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ja(e) {
  if (!e) return;
  const t = hi(e, It, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function oa({ value: e, onChange: t }) {
  const [n, r] = k.useState(!1), a = typeof e == "string", [i, o] = tp(e), s = Ja(i), c = Ja(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${ce(s, "MMM d, yyyy")} – ${ce(c, "MMM d, yyyy")}` : s ? ce(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ g(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(U, { variant: "outline", size: "sm", className: M("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(vi, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: M("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ g(Oe, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ g("div", { className: "cv-daterange-presets", children: [
        ep.map((h) => /* @__PURE__ */ l(
          U,
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
        vo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([ce(h.from, It), ce(h.to, It)]) : h != null && h.from ? t([ce(h.from, It), ce(h.from, It)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function np(e) {
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
function rp(e, t) {
  const n = new Set(np(t));
  return e.filter((r) => n.has(r.type));
}
function ap(e) {
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
function ip(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function op(e, t, n) {
  const r = ap(e), a = { name: ip(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Yo = k.createContext({});
function sp({
  createVariable: e,
  children: t
}) {
  const n = k.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Yo.Provider, { value: n, children: t });
}
function lp() {
  return k.useContext(Yo);
}
function cp({ kind: e, value: t, onChange: n, className: r }) {
  const a = an(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = lp(), [s, c] = k.useState(!1), [u, m] = k.useState(!1), [h, f] = k.useState(""), p = k.useMemo(() => rp(i, e), [i, e]), v = p.find((w) => w.name === t), b = (w) => {
    n(w), c(!1), m(!1);
  }, y = () => {
    if (!o) return;
    const w = op(e, h || "Variable", i);
    o(w), b(w.name), f("");
  };
  return /* @__PURE__ */ g(
    _e,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(U, { variant: "outline", size: "sm", className: M("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Ks, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: M("cv-var-trigger-label", !v && "cv-var-trigger-label--placeholder"), children: v ? v.label ?? v.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ g(Oe, { align: "start", className: "cv-var-popover", children: [
          p.length > 0 ? p.map((w) => /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => b(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Je, { className: "cv-ec-icon" }) : null
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
                onChange: (w) => f(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && y(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(U, { size: "sm", className: "cv-var-new-add", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ g(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(kt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function St({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Ne(t), [i, o] = k.useState(a ? "var" : "fixed");
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
            o("fixed"), Ne(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: s(i === "var"), onClick: () => o("var"), children: "Variable" })
    ] }),
    i === "var" ? /* @__PURE__ */ l(
      cp,
      {
        kind: e,
        value: Ne(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(Ne(t) ? void 0 : t, (c) => n(c))
  ] });
}
const up = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function nr(e) {
  return "member" in e && "operator" in e;
}
function mp({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var E;
  const { meta: s } = ze(), c = ((E = an()) == null ? void 0 : E.decls) ?? [], [u, m] = k.useState(null), [h, f] = k.useState(null), p = r ?? [], v = p.length === 1 && !nr(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(nr) ? p[0] : void 0, b = v ? "any" : "all", y = [], w = [];
  v || p.forEach((O) => nr(O) ? y.push(O) : w.push(O));
  const x = v ? v.or : y, N = w.length === 0 && (x.length >= 2 || b === "any"), S = (O) => b === "any" ? O.length ? [{ or: O }] : [] : [...O, ...w], C = (O) => {
    const _ = O.filter((I) => I.member.length > 0), F = S(_);
    a(F.length > 0 ? F : void 0);
  }, R = (O) => {
    const _ = O === "any" ? x.length ? [{ or: x }] : [] : [...x];
    a(_.length > 0 ? _ : void 0);
  }, T = (O, _) => C(x.map((F, I) => I === O ? { ...F, ..._ } : F)), D = (O) => C(x.filter((_, F) => F !== O)), P = (O) => {
    const F = { ...h ?? { member: "", operator: "equals", values: [] }, ...O };
    F.member ? (f(null), m(x.length), C([...x, F])) : f(F);
  };
  return /* @__PURE__ */ g("div", { "data-slot": "filter-builder", className: M("cv-filter-builder", o), children: [
    x.length === 0 && !h ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    N ? /* @__PURE__ */ g("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Zt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: b,
          onChange: R
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    x.map((O, _) => {
      const F = $e(s, O.member);
      return u === _ ? /* @__PURE__ */ l(
        Xa,
        {
          leaf: O,
          member: F,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (I) => T(_, I),
          onDone: () => m(null),
          onRemove: () => D(_)
        },
        _
      ) : /* @__PURE__ */ l(
        dp,
        {
          text: hp(O, F == null ? void 0 : F.label, c),
          disabled: i,
          onEdit: () => m(_),
          onRemove: () => D(_)
        },
        _
      );
    }),
    h ? /* @__PURE__ */ l(
      Xa,
      {
        leaf: h,
        member: $e(s, h.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: P,
        onRemove: () => f(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ g("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ g(
      U,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!h,
        onClick: () => {
          m(null), f({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(kt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function dp({
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
      U,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(xt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function Xa({
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
  const { meta: u } = ze(), m = Ua(t == null ? void 0 : t.type), h = m.includes(e.operator) ? e.operator : m[0], f = !Nr.has(h);
  k.useEffect(() => {
    h !== e.operator && o({ operator: h });
  }, [e.operator, o, h]);
  const p = (v) => {
    const b = $e(u, v);
    o({ member: v, operator: Ua(b == null ? void 0 : b.type)[0], values: [] });
  };
  return /* @__PURE__ */ g("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ g("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ g("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ g(U, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Je, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(xt, { className: "cv-ec-icon" })
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
          Go,
          {
            well: up,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: p,
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
                    _n(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(Qe, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Ko,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: p,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ g("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ g(
        Se,
        {
          value: h,
          onValueChange: (v) => o({
            operator: v,
            values: Nr.has(v) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(Me, { className: "cv-ec-full", children: /* @__PURE__ */ l(xe, {}) }),
            /* @__PURE__ */ l(Re, { children: m.map((v) => /* @__PURE__ */ l(de, { value: v, children: Fo[v] }, v)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ g("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        fp,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (v) => o({ values: v })
        }
      )
    ] }) : null
  ] });
}
function hp(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = Fo[e.operator] ?? e.operator;
  if (Nr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Ne(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function fp({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Ne(r[0]);
  if (t === "time") {
    const s = a ? r[0] : pp(r);
    return /* @__PURE__ */ l(
      St,
      {
        kind: "dateRange",
        value: s,
        onChange: (c) => n(c === void 0 ? [] : Ne(c) ? [c] : gp(c)),
        renderFixed: (c, u) => /* @__PURE__ */ l(oa, { value: c, onChange: u })
      }
    );
  }
  const i = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", o = a ? r[0] : r.filter((s) => !Ne(s));
  return /* @__PURE__ */ l(
    St,
    {
      kind: i,
      value: o,
      onChange: (s) => n(s === void 0 ? [] : Ne(s) ? [s] : s),
      renderFixed: (s, c) => /* @__PURE__ */ l(
        le,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => c(vp(u.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function pp(e) {
  const t = e.filter((n) => !Ne(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function gp(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function vp(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function bp({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ g(_e, { children: [
    /* @__PURE__ */ g(
      Te,
      {
        className: M(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Gs, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ g(Oe, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ g("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(yp, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(mp, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function yp({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ze(), a = Af(r, n);
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
function kp({ currentName: e, hasFields: t, onSelect: n }) {
  var b;
  const { meta: r } = ze(), a = k.useMemo(() => Un(r), [r]), i = a.filter((y) => y.type === "view"), o = a.filter((y) => y.type === "cube"), s = a.find((y) => y.name === e), [c, u] = k.useState(!1), [m, h] = k.useState(null), f = (y) => {
    if (y === e) {
      u(!1);
      return;
    }
    t ? h(y) : (n(y), u(!1));
  }, p = () => {
    m && n(m), h(null), u(!1);
  }, v = m ? ((b = a.find((y) => y.name === m)) == null ? void 0 : b.title) ?? m : "";
  return /* @__PURE__ */ g(
    _e,
    {
      open: c,
      onOpenChange: (y) => {
        u(y), y || h(null);
      },
      children: [
        /* @__PURE__ */ g(
          Te,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(wi, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: M("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(Oe, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ g("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ g("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: v }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ g("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(U, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => h(null), children: "Cancel" }),
            /* @__PURE__ */ l(U, { size: "sm", className: "cv-ec-h7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ g("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ g(ie, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((y) => /* @__PURE__ */ l(
              Za,
              {
                icon: /* @__PURE__ */ l(Er, { className: "cv-ec-icon" }),
                label: y.title,
                active: y.name === e,
                onClick: () => f(y.name)
              },
              y.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((y) => /* @__PURE__ */ l(
            Za,
            {
              icon: /* @__PURE__ */ l(Ni, { className: "cv-ec-icon" }),
              label: y.title,
              active: y.name === e,
              onClick: () => f(y.name)
            },
            y.name
          ))
        ] }) })
      ]
    }
  );
}
function Za({
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
        n ? /* @__PURE__ */ l(Je, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function ei(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function wp({
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
            onChange: (c) => ei(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv-axis-chrome-input"
          }
        ),
        /* @__PURE__ */ l(
          Cp,
          {
            hidden: o,
            what: "axis title",
            onClick: () => ei(e, t, n, { labelHide: o ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Np({
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
          n ? /* @__PURE__ */ l(Ci, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Si, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Cp({
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
      children: e ? /* @__PURE__ */ l(Ci, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Si, { className: "cv-ec-icon" })
    }
  );
}
const Qo = k.forwardRef(
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
Qo.displayName = "Label";
function oe({
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
      /* @__PURE__ */ l(Qo, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function xr({
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
        /* @__PURE__ */ l(xr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Sp = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, xp = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function Mp({ spec: e, update: t }) {
  var y, w, x, N;
  const n = Ze(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const S = o.Customize;
    return /* @__PURE__ */ l(S, { spec: e, update: t });
  }
  const s = (S) => t({ ...e, chart: { ...r, ...S } }), c = (S) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...S } } }), u = ((w = (y = r.mapping) == null ? void 0 : y.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", f = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", p = Yr(o) ? /* @__PURE__ */ g(ie, { children: [
    /* @__PURE__ */ l(
      oe,
      {
        label: "Compare",
        hint: f === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ g(
          Se,
          {
            value: f,
            onValueChange: (S) => {
              var C;
              return s({
                transform: S === "none" ? void 0 : S === "rollingAvg" ? { kind: "rollingAvg", window: ((C = r.transform) == null ? void 0 : C.window) ?? cn } : { kind: S }
              });
            },
            children: [
              /* @__PURE__ */ l(Me, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(xe, {}) }),
              /* @__PURE__ */ l(Re, { children: xp.map((S) => /* @__PURE__ */ l(de, { value: S, children: Sp[S] }, S)) })
            ]
          }
        )
      }
    ),
    f === "rollingAvg" ? /* @__PURE__ */ l(ti, { label: "Window (points)", children: /* @__PURE__ */ l(
      le,
      {
        type: "number",
        min: 2,
        max: 90,
        className: "cv-ec-h8 cv-transform-window",
        value: ((N = r.transform) == null ? void 0 : N.window) ?? cn,
        onChange: (S) => {
          const C = parseInt(S.target.value, 10), R = Number.isFinite(C) ? Math.min(90, Math.max(2, C)) : cn;
          s({ transform: { kind: "rollingAvg", window: R } });
        }
      }
    ) }) : null
  ] }) : null, v = /* @__PURE__ */ l(oe, { label: "Stacked", children: /* @__PURE__ */ l(
    Zt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: h,
      onChange: (S) => s({ stackMode: S })
    }
  ) }), b = (() => {
    var S, C;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ g(ie, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (R) => s({ orientation: R ? "horizontal" : "vertical" })
            }
          ),
          v
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ g(ie, { children: [
          v,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((C = (S = r.mapping) == null ? void 0 : S.series) == null ? void 0 : C.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ g(ie, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (R) => c({ innerRadiusPct: R ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(oe, { label: "Slice labels", children: /* @__PURE__ */ l(
            Zt,
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
              onChange: (R) => c({ showLabels: R })
            }
          ) }),
          /* @__PURE__ */ l(ti, { label: "Max slices", children: /* @__PURE__ */ l(
            le,
            {
              type: "number",
              min: 1,
              className: "cv-ec-h8",
              value: i.maxSlices ?? "",
              placeholder: "8",
              onChange: (R) => {
                const T = parseInt(R.target.value, 10);
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
        return /* @__PURE__ */ g(ie, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Compact rows",
              checked: i.rowHeight === "compact",
              onChange: (R) => c({ rowHeight: R ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sortable columns",
              checked: i.sortable !== !1,
              onChange: (R) => c({ sortable: R })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sticky header",
              checked: i.stickyHeader !== !1,
              onChange: (R) => c({ stickyHeader: R })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Row numbers",
              checked: i.showRowNumbers === !0,
              onChange: (R) => c({ showRowNumbers: R })
            }
          )
        ] });
      case "heatmap":
        return /* @__PURE__ */ l(
          me,
          {
            label: "Show values",
            checked: i.showValues === !0,
            onChange: (R) => c({ showValues: R || void 0 })
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
    p
  ] });
}
function Rp(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || Yr(n);
}
function ti({ label: e, children: t }) {
  return /* @__PURE__ */ g("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function Jo(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function Xo(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!Pe(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      fe(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function _p(e) {
  let t = 0;
  for (const n of e)
    Pe(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Tp(e, t) {
  return e.some((n) => Pe(n) && n.cardinality === "many" && fe(n, t));
}
const Op = 0.35, Ap = 0.4, Dp = 0.3, Lp = 0.1;
function Ep(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Dp : e.supportsCartesianAxes ? Lp : e.wells.some(
    (a) => Pe(a) && a.channel === "x" && fe(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Zo(e) {
  const t = e.filter(Pe);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Pp(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Fp = (e, t, n) => e === 1 ? t : n;
function $p(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Pp(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${Fp(r, "measure", "measures")}`;
  return Zo(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function Ip(e, t) {
  const n = Jo(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = Xo(s, n), u = _p(s), m = Math.max(0, n.length - c.matched.length), h = Hf(s, r) + 0.5 * m, f = u > 0 ? h / u : 0, p = c.leftover.filter(
      (b) => b.kind !== "time" && !Tp(s, b.kind)
    ).length, v = f - Op * p + Ep(o, a) - (Zo(s) ? Ap : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(v * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: $p(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function zp(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Vp(e, t, n) {
  const r = e.require(n), a = Xo(r.wells, Jo(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = $t(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function es(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Bf(e, r, n));
  };
}
function jp({ spec: e, update: t, empty: n }) {
  const r = Ze(), a = e.chart.family, i = es(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ g("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(ts, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function Wp({ spec: e, update: t }) {
  const n = Ze(), r = e.chart.family, a = es(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ g(_e, { children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(Qe, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ g(Oe, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(ts, { spec: e, family: r, onPick: a, families: n }),
      Rp(r, n) ? /* @__PURE__ */ g("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Mp, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function ts({ spec: e, family: t, onPick: n, families: r }) {
  const a = k.useMemo(() => Ip(r, e), [r, e]), i = k.useMemo(() => zp(a), [a]), o = k.useMemo(
    () => new Map(a.map((h) => [h.family, h])),
    [a]
  ), s = k.useMemo(
    () => new Set(a.filter((h) => h.fits).map((h) => h.family)),
    [a]
  ), c = Up(e, r, s), u = (h, f) => /* @__PURE__ */ l(
    Hp,
    {
      fit: h,
      active: h.family === t,
      preview: c.get(h.family),
      families: r,
      reason: f ? h.reason : void 0,
      onPick: n
    },
    h.family
  ), m = r.list().map(
    (h) => o.get(h.family) ?? {
      family: h.family,
      descriptor: h,
      score: 0,
      fits: !1,
      reason: h.label
    }
  );
  return /* @__PURE__ */ g("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ g("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((h) => u(h, !0)) })
    ] }) : null,
    /* @__PURE__ */ g("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: m.map((h) => u(h, !1)) })
    ] })
  ] });
}
function Hp({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: a,
  onPick: i
}) {
  const o = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ g("div", { className: M("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"), children: [
    /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
      tg,
      {
        preview: n,
        families: r,
        fallback: /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" })
      },
      n.key
    ) : /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" }) }),
    /* @__PURE__ */ g("span", { className: "cv-type-tile-caption", children: [
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
  ] });
}
function ns(e, t) {
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
function qp(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const ni = 200, Bp = () => () => {
};
function Up(e, t, n) {
  const r = e.query, a = qp(r), i = k.useMemo(() => {
    const f = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof f == "number" ? Math.min(f, ni) : ni
    };
  }, [r]), o = an(), s = k.useRef(null);
  s.current === null && (s.current = co());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, m = k.useSyncExternalStore(
    o ? o.store.subscribe : Bp,
    u,
    u
  ), { resultSet: h } = ho(m, { skip: !a });
  return k.useMemo(() => {
    const f = /* @__PURE__ */ new Map();
    for (const p of t.list()) {
      const v = p.family;
      if (p.queryless) continue;
      const y = (h && n.has(v) ? Kp(e, v, t, h, m) : void 0) ?? eg(v, t);
      y && f.set(v, y);
    }
    return f;
  }, [e, t, h, m, n]);
}
function Kp(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Vp(n, e, t), o = ns(i.chart, n), s = so(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const dt = "sample.category", en = "sample.group", ve = "sample.value", De = "sample.count", rs = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Mr = [18, 27, 21, 34, 26, 39], Rr = [12, 9, 17, 14, 22, 16], Gp = rs.flatMap((e, t) => [
  { [dt]: e, [en]: "North", [ve]: Mr[t], [De]: Rr[t] },
  {
    [dt]: e,
    [en]: "South",
    [ve]: Math.round(Mr[t] * 0.62),
    [De]: Math.round(Rr[t] * 0.78)
  }
]), Yp = {
  measures: [ve, De],
  dimensions: [dt, en]
}, Qp = {
  measures: {
    [ve]: { title: "Value", shortTitle: "Value", type: "number" },
    [De]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [dt]: { title: "Day", shortTitle: "Day", type: "string" },
    [en]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function as(e) {
  const t = [
    { key: ve, label: "Value", data: Mr, colorToken: "chart-1" },
    { key: De, label: "Count", data: Rr, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: rs,
    series: t,
    raw: { rows: Gp, query: Yp, annotation: Qp },
    empty: !1
  };
}
const Jp = as(1), Xp = as(2), zt = (e, t) => ({
  family: e,
  mapping: { category: { member: dt }, series: { mode: "measures", members: t } }
}), Zp = {
  bar: zt("bar", [ve, De]),
  line: zt("line", [ve, De]),
  area: { ...zt("area", [ve, De]), stackMode: "stacked" },
  pie: zt("pie", [ve]),
  scatter: { family: "scatter", familyOptions: { x: ve, y: De } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: dt },
      series: { mode: "pivot", value: ve, pivot: en }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: ve, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: dt }, { member: ve }, { member: De }] }
  }
};
function eg(e, t) {
  const n = Zp[e] ?? zt(e, [ve, De]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Jp : Xp,
    options: ns(n, t)
  };
}
const tg = k.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = k.useRef(null);
  return k.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(ng, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    io,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class ng extends k.Component {
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
function rg(e, t) {
  return e.allowedCubes.includes(t);
}
function ag(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function ig(e, t, n, r) {
  const a = Un(e), i = a.filter((N) => N.type === "view"), o = Bo(t, r), s = Object.values(o).flat();
  let c;
  for (const N of s) {
    const S = $e(e, N);
    if (S) {
      c = S;
      break;
    }
  }
  const u = !c && n ? qt(e, n) : void 0, m = c ? qt(e, c.cube) : u, h = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, f = t.query.measures ?? [], p = f.length ? Ft(f[0]) : void 0;
  if (h)
    return { viewLocked: h, relatedCubes: [], views: i, measureSource: p, allowedCubes: [h] };
  const v = p ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), b = v ? qt(e, v) : void 0, y = a.filter((N) => N.type === "cube"), w = v ? ag(y, v) : y, x = v ? [v, ...w.map((N) => N.name)] : y.map((N) => N.name);
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: w,
    views: i,
    measureSource: p,
    allowedCubes: x
  };
}
function og(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function sg(e, t, n, r, a, i) {
  var Z, Ae, ht, _t, Tt;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : lg(a), m = o.familyOptions ?? {}, h = Array.isArray(m.columns) ? m.columns : [], f = Wo(o), p = f[r], v = c === "table" && n.id === "columns", b = c === "bar" || c === "line" || c === "area", y = ((Ae = (Z = o.mapping) == null ? void 0 : Z.series) == null ? void 0 : Ae.mode) === "measures", w = b && n.id === "y", x = w && y, N = v ? (ht = h.find((Q) => Q.member === r)) == null ? void 0 : ht.label : x ? p == null ? void 0 : p.label : void 0, S = x ? p == null ? void 0 : p.colorToken : void 0, C = sn(s), R = n.kinds.includes("time") && (C == null ? void 0 : C.dimension) === r, T = R ? C == null ? void 0 : C.granularity : void 0, D = R ? C == null ? void 0 : C.dateRange : void 0, P = (c === "line" || c === "area") && n.id === "y" && y, E = P ? p == null ? void 0 : p.curve : void 0, O = P ? p == null ? void 0 : p.dots : void 0, _ = (Q) => {
    var la, ca;
    if ((la = o.mapping) != null && la.series && o.mapping.series.mode !== "measures") return;
    const ue = ((ca = o.mapping) != null && ca.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], he = { ...f };
    Q && Object.keys(Q).length > 0 ? he[r] = Q : delete he[r];
    const Ot = on(o);
    Ot && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Ot }, series: Ho(ue, he) }
      }
    });
  }, F = (Q) => {
    const ue = h.map((he) => he.member === r ? { ...he, ...Q } : he);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: ue } } });
  }, I = (Q) => {
    v ? F({ label: Q }) : x && _({ ...p, label: Q });
  }, A = (Q) => {
    x && _({ ...p, colorToken: Q ?? void 0 });
  }, K = (Q) => {
    if (!C) return;
    const ue = { ...C };
    for (const he of Object.keys(Q)) {
      const Ot = Q[he];
      Ot === void 0 ? delete ue[he] : ue[he] = Ot;
    }
    t({ ...e, query: { ...s, timeDimensions: [ue] } });
  }, Y = (Q) => K({ granularity: Q }), W = (Q) => K({ dateRange: Q }), q = (Q) => {
    x && _({ ...p, curve: Q });
  }, j = (Q) => {
    x && _({ ...p, dots: Q });
  }, H = () => t(Gf(e, c, n.id, r, i)), te = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), ne = (_t = o.mapping) == null ? void 0 : _t.series, re = (ne && ne.mode === "pivot" ? ne.value : Cr(o)[0]) ?? ((Tt = s.measures) == null ? void 0 : Tt[0]), pe = te ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...re ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...re ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], Ce = (() => {
    const Q = og(s.order)[0];
    if (!Q) return "none";
    const [ue, he] = Q;
    return re && ue === re ? he === "desc" ? "value-desc" : "value-asc" : ue === r ? u === "time" ? he === "desc" ? "time-desc" : "time-asc" : he === "asc" ? "label-asc" : "label-desc" : "none";
  })(), Le = (Q) => {
    let ue;
    switch (Q) {
      case "none":
        ue = void 0;
        break;
      case "value-desc":
        ue = re ? [[re, "desc"]] : void 0;
        break;
      case "value-asc":
        ue = re ? [[re, "asc"]] : void 0;
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
  }, se = typeof s.limit == "number" ? s.limit : void 0, $ = (Q) => t({ ...e, query: { ...s, limit: Q && Q > 0 ? Q : void 0 } }), B = (c === "bar" || c === "line" || c === "area") && R, G = B && m.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: S,
    granularity: T,
    dateRange: D,
    curve: E,
    dots: O,
    canLineStyle: P,
    canRename: v || x,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && y,
    isTimeField: R,
    isCategoryField: te,
    sortValue: Ce,
    sortOptions: pe,
    onSort: Le,
    limit: se,
    onLimit: $,
    canComparePrevious: B,
    comparePrevious: G,
    comparePreviousReady: B && D !== void 0,
    onComparePrevious: (Q) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: Q || void 0 } } }),
    onRename: I,
    onRecolor: A,
    onGranularity: Y,
    onDateRange: W,
    onCurve: q,
    onDots: j,
    onRemove: H
  };
}
function lg(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ri(e, t, n, r) {
  var h;
  const { chart: a, query: i } = e, o = a.family, s = (f) => {
    if (r < 0 || r >= f.length || n === r) return f;
    const p = f.slice(), [v] = p.splice(n, 1);
    return p.splice(r, 0, v), p;
  };
  if (o === "table" && t.id === "columns") {
    const f = a.familyOptions ?? {}, p = s(Array.isArray(f.columns) ? f.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...f, columns: p } } };
  }
  const c = s(i.measures ?? []), u = (h = a.mapping) == null ? void 0 : h.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const f = s(u.values);
    m = { ...a.mapping, series: { ...u, value: f[0], values: f } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const cg = Ge.options;
function ug({
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
        cg.map((i) => {
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
const mg = Ke.options, dg = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function is({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: i,
  className: o
}) {
  const s = n && n.length > 0 ? n : mg;
  return /* @__PURE__ */ g(
    Se,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ l(Me, { id: i, className: o, children: /* @__PURE__ */ l(xe, { placeholder: r }) }),
        /* @__PURE__ */ l(Re, { children: s.map((c) => /* @__PURE__ */ l(de, { value: c, children: dg[c] }, c)) })
      ]
    }
  );
}
const hg = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function fg({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = Ze(), u = sg(e, t, n, r, a, c), m = (a == null ? void 0 : a.label) ?? r, h = u.label || m, f = u.canColor && i !== void 0, p = u.canRename || f || u.isTimeField || u.isCategoryField || u.canLineStyle || !!o, v = (y) => {
    const w = y.trim();
    u.onRename(w.length > 0 ? w : void 0);
  }, b = /* @__PURE__ */ g(ie, { children: [
    f ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? _n(a.type) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: h })
  ] });
  return /* @__PURE__ */ g("div", { "data-slot": "field-pill", className: M("cv-field-pill", s), children: [
    p ? /* @__PURE__ */ g(_e, { children: [
      /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${h}`,
          children: b
        }
      ) }),
      /* @__PURE__ */ l(Oe, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ g("div", { className: "cv-field-pill-config", children: [
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
        f ? /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l(ug, { value: u.colorToken, onChange: u.onRecolor })
        ] }) : null,
        u.isTimeField ? /* @__PURE__ */ g(ie, { children: [
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              St,
              {
                kind: "dateRange",
                value: u.dateRange,
                onChange: u.onDateRange,
                renderFixed: (y, w) => /* @__PURE__ */ l(oa, { value: y, onChange: w })
              }
            )
          ] }),
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              St,
              {
                kind: "granularity",
                value: u.granularity,
                onChange: u.onGranularity,
                renderFixed: (y, w) => /* @__PURE__ */ l(is, { value: y, onChange: w, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          u.canComparePrevious ? /* @__PURE__ */ g("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ g("label", { className: "cv-ec-row", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                xr,
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
        u.isCategoryField ? /* @__PURE__ */ g(ie, { children: [
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
        u.canLineStyle ? /* @__PURE__ */ g(ie, { children: [
          /* @__PURE__ */ g("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: hg.map(([y, w]) => /* @__PURE__ */ g(
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
                  (u.curve ?? "monotone") === y ? /* @__PURE__ */ l(Je, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              y
            )) })
          ] }),
          /* @__PURE__ */ g("label", { className: "cv-ec-row", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(xr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ g("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ g(
            U,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canUp,
              onClick: o.onUp,
              children: [
                /* @__PURE__ */ l(On, { className: "cv-ec-icon" }),
                "Up"
              ]
            }
          ),
          /* @__PURE__ */ g(
            U,
            {
              variant: "outline",
              size: "sm",
              className: "cv-ec-h8 cv-ec-flex1",
              disabled: !o.canDown,
              onClick: o.onDown,
              children: [
                /* @__PURE__ */ l(An, { className: "cv-ec-icon" }),
                "Down"
              ]
            }
          )
        ] }) : null,
        /* @__PURE__ */ g(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: u.onRemove,
            children: [
              /* @__PURE__ */ l(da, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: h, children: b }),
    /* @__PURE__ */ l(
      U,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: u.onRemove,
        "aria-label": `Remove ${h}`,
        children: /* @__PURE__ */ l(da, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function pg({
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
  lockedSingle: f,
  disableReorder: p,
  label: v,
  note: b,
  pickerSide: y,
  pickerAlign: w,
  control: x
}) {
  const N = n.cardinality === "many" && !f, S = N || r.length === 0, C = r.length, R = h === "vertical", T = v ?? n.label, D = ["number", "category", "time"].filter((O) => !fe(n, O)).map((O) => $o(n, O, r)).find((O) => O !== void 0) ?? n.hint, P = a.length === 0 && !n.optional && fe(n, "number") ? "Add a measure to start" : void 0, E = /* @__PURE__ */ l(
    Go,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: y ?? (R ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          title: D,
          className: M(
            "cv-well-add",
            R && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(kt, { className: "cv-ec-icon" }),
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
      className: M("cv-well-group", !R && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ g("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: T }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: x }) : null,
        /* @__PURE__ */ g("div", { className: M("cv-well-fields", R ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((O, _) => /* @__PURE__ */ l(
            fg,
            {
              spec: e,
              update: t,
              well: n,
              member: O,
              option: i(O),
              resolvedColor: o(O),
              className: R ? "cv-field-pill--full" : void 0,
              reorder: N && C > 1 && !p ? {
                canUp: _ > 0,
                canDown: _ < C - 1,
                onUp: () => t(ri(e, n, _, _ - 1)),
                onDown: () => t(ri(e, n, _, _ + 1))
              } : void 0
            },
            O
          )),
          S ? E : null
        ] }),
        P ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: P }) : null,
        b ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: b }) : null
      ]
    }
  );
}
function rr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ g(_e, { children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ g("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(Qe, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Oe, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function sa(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function gg({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = sa(e, t), a = jo(e), i = (u = e.query.timeDimensions) == null ? void 0 : u[0], o = n.display ?? "number", s = n.gauge, c = (m) => {
    const h = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!h) return;
    const f = { ...h };
    for (const p of Object.keys(m)) {
      const v = m[p];
      v === void 0 ? delete f[p] : f[p] = v;
    }
    delete f.granularity, t({ ...e, query: { ...e.query, timeDimensions: [f] } });
  };
  return /* @__PURE__ */ g("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Kt, { label: "Time field", children: /* @__PURE__ */ l(
      Ko,
      {
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (m) => c({ dimension: m }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Kt, { label: "Date range", children: /* @__PURE__ */ l(
      St,
      {
        kind: "dateRange",
        value: i.dateRange,
        onChange: (m) => c({ dateRange: m }),
        renderFixed: (m, h) => /* @__PURE__ */ l(oa, { value: m, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(oe, { label: "Display", children: /* @__PURE__ */ l(
      Zt,
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
    o === "gauge" ? /* @__PURE__ */ l(Kt, { label: "Gauge max", children: /* @__PURE__ */ l(
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
function vg({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = sa(e, t), a = n.comparison, i = a !== void 0, o = k.useRef(void 0);
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
    i ? /* @__PURE__ */ g(ie, { children: [
      /* @__PURE__ */ l(oe, { label: "Against", children: /* @__PURE__ */ l(
        Zt,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Kt, { label: "Baseline value", children: /* @__PURE__ */ l(
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
        /* @__PURE__ */ l(pi, { className: "cv-kpi-warn-icon" }),
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
function bg({ spec: e, update: t }) {
  const { fo: n, setFO: r } = sa(e, t), a = n.sparkline, i = a !== void 0, o = n.comparison !== void 0, s = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ g("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Show sparkline",
        checked: i,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    i ? /* @__PURE__ */ g(ie, { children: [
      /* @__PURE__ */ l(Kt, { label: "Trend granularity", children: /* @__PURE__ */ l(
        St,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ l(is, { value: u, onChange: m, className: "cv-ec-h8 cv-ec-full" })
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
function Kt({ label: e, children: t }) {
  return /* @__PURE__ */ g("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function yg({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var pe, Ce, Le, se;
  const { meta: a } = ze(), { locale: i } = Ee(), o = Ze(), { chart: s } = e, c = s.family, u = o.require(c), m = u.queryless ?? !1, h = jo(e), f = k.useMemo(() => jn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), p = k.useCallback(
    ($) => $ && (i == null ? void 0 : i.unitSystem) === "imperial" && f[$] ? f[$].imperialUnit : $,
    [i == null ? void 0 : i.unitSystem, f]
  ), v = k.useMemo(() => Kf(c, o), [c, o]), b = k.useMemo(() => Bo(e, o), [e, o]), y = k.useMemo(() => new Map(v.map(($) => [$.id, $])), [v]), [w, x] = k.useState(void 0), N = k.useMemo(
    () => ig(a, e, w, o),
    [a, e, w, o]
  ), S = k.useMemo(() => Object.values(b).flat(), [b]), C = k.useCallback(
    ($) => {
      x($), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), R = k.useMemo(
    () => {
      var $;
      return N.viewLocked ? [N.viewLocked] : [($ = N.sourceCube) == null ? void 0 : $.name, ...N.relatedCubes.map((L) => L.name)].filter(
        Boolean
      );
    },
    [N]
  ), T = k.useMemo(
    () => Object.values(b).every(($) => $.length === 0),
    [b]
  ), D = k.useMemo(() => {
    const $ = (b.y ?? [])[0], L = $ ? $e(a, $) : void 0;
    return {
      leftKey: $ ? Ka(L) : void 0,
      leftLabel: $ ? kg(L, p(L == null ? void 0 : L.unit)) : void 0
    };
  }, [b, a, p]), P = k.useCallback(
    ($, L) => {
      var B;
      if (L) {
        if (!rg(N, L.cube))
          return "Clear the current fields to use a different dataset.";
        if (L.memberType === "measure" && N.measureSource && L.cube !== N.measureSource)
          return `Measures come from one table (${((B = N.sourceCube) == null ? void 0 : B.title) ?? N.measureSource}). Remove them to switch.`;
        if ($ === "y" && L.memberType === "measure") {
          const { leftKey: G, leftLabel: z } = D;
          if (G !== void 0 && Ka(L) !== G)
            return `This axis shows ${z}; ${L.label ?? "this field"} is ${qo(L)}`;
        }
      }
    },
    [N, D]
  ), E = D.leftLabel, O = k.useMemo(() => {
    var L;
    const $ = {};
    if (c === "bar" || c === "line" || c === "area") {
      const B = (L = s.mapping) == null ? void 0 : L.series;
      if (B && B.mode === "measures") {
        const G = B.members.map((V) => {
          var Z, Ae;
          return { key: V, colorToken: (Ae = (Z = B.meta) == null ? void 0 : Z[V]) == null ? void 0 : Ae.colorToken };
        }), z = oo(G, s.colors);
        B.members.forEach((V, Z) => {
          $[V] = z[Z];
        });
      }
    }
    return $;
  }, [c, s.mapping, s.colors]), _ = k.useCallback(
    ($, L, B) => {
      const G = $e(a, L);
      if (P($, G)) return;
      let z = B === "geoPoint" && (G != null && G.latMember) && G.lngMember ? $t(
        $t(e, c, "lat", G.latMember, "numberDimension", o),
        c,
        "lng",
        G.lngMember,
        "numberDimension",
        o
      ) : $t(e, c, $, L, B, o);
      const V = u.canonicalTimeWell;
      if (V && $ !== V && (b[V] ?? []).length === 0) {
        const Z = _f(a, G == null ? void 0 : G.cube);
        Z && Z.name !== L && !P(V, Z) && (z = $t(z, c, V, Z.name, "time", o));
      }
      t(z);
    },
    [P, a, t, e, c, o, u, b]
  ), F = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, I = F.left.map(($) => y.get($)).filter(Boolean), A = F.bottom.map(($) => y.get($)).filter(Boolean), K = (pe = b.color) == null ? void 0 : pe[0], Y = ((Ce = b.y) == null ? void 0 : Ce.length) ?? 0, W = K && Y > 1 ? `${Y} measures × ${((Le = $e(a, K)) == null ? void 0 : Le.label) ?? "this split"} — one series per measure per value.` : void 0, q = u.hasLegend, j = (b.y ?? [])[0], H = ($) => {
    var G, z, V, Z;
    if (!$) return;
    const L = (G = s.mapping) == null ? void 0 : G.series;
    return (L && L.mode === "measures" ? (V = (z = L.meta) == null ? void 0 : z[$]) == null ? void 0 : V.label : void 0) ?? ((Z = $e(a, $)) == null ? void 0 : Z.label);
  }, te = ($) => {
    var B, G, z, V;
    const L = (Z, Ae) => Ae ? /* @__PURE__ */ l(wp, { spec: e, update: t, axis: Z, title: "Title", auto: H(Ae) }) : null;
    switch ($) {
      case "y":
        return L("y", j);
      // the single value axis
      case "x":
        return L("x", (G = (B = s.mapping) == null ? void 0 : B.category) == null ? void 0 : G.member);
      case "sy":
        return L("y", (z = b.sy) == null ? void 0 : z[0]);
      // scatter Y axis
      case "sx":
        return L("x", (V = b.sx) == null ? void 0 : V[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ne = ($, L) => /* @__PURE__ */ l(
    pg,
    {
      spec: e,
      update: t,
      well: $,
      placed: b[$.id] ?? [],
      allPlaced: S,
      optionFor: (B) => $e(a, B),
      colorFor: (B) => O[B],
      scope: N,
      blockReason: (B) => P($.id, B),
      onAdd: (B, G) => _($.id, B, G),
      badge: $.id === "y" ? E : void 0,
      orientation: L,
      note: $.id === "color" ? W : void 0,
      control: te($.id)
    },
    $.id
  ), re = () => {
    const $ = y.get("value"), L = (b.value ?? []).length > 0, B = s.familyOptions ?? {};
    return /* @__PURE__ */ g(ie, { children: [
      /* @__PURE__ */ g("div", { className: "cv-edit-kpi-value", children: [
        $ ? ne($, "vertical") : null,
        L ? /* @__PURE__ */ l(
          rr,
          {
            label: "Time, range & display",
            summary: B.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(gg, { spec: e, update: t })
          }
        ) : null
      ] }),
      L ? /* @__PURE__ */ g(ie, { children: [
        /* @__PURE__ */ l(rr, { label: "Comparison", summary: B.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(vg, { spec: e, update: t }) }),
        /* @__PURE__ */ l(rr, { label: "Sparkline", summary: B.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(bg, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ g("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ g("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !T || m ? /* @__PURE__ */ l(Wp, { spec: e, update: t }) : null,
      /* @__PURE__ */ g("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          kp,
          {
            currentName: N.viewLocked ?? ((se = N.sourceCube) == null ? void 0 : se.name),
            hasFields: S.length > 0,
            onSelect: C
          }
        ),
        /* @__PURE__ */ l(bp, { spec: e, update: t, cube: h, scopeCubes: R, scope: N })
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: "cv-edit-overlay-body", children: [
      I.length > 0 ? /* @__PURE__ */ l("div", { className: M("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? re() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        I.map(($) => ne($, "vertical"))
      ) }) : null,
      /* @__PURE__ */ g("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ g("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(jp, { spec: e, update: t, empty: T && !m })
        ] }),
        A.length > 0 ? /* @__PURE__ */ g("div", { className: "cv-edit-overlay-bottom", children: [
          A.map(($) => ne($, "horizontal")),
          q && !T ? /* @__PURE__ */ l(Np, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function kg(e, t) {
  const n = qo(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function os(e, t) {
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
function ar(e) {
  const t = Fi.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function wg({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = k.useState(() => ({
    spec: e,
    issues: ar(e)
  })), [i, o] = k.useState(e);
  k.useEffect(() => {
    a({ spec: e, issues: ar(e) }), o(e);
  }, [e]);
  const s = os((f) => t(f), n), c = r.spec, u = r.issues, m = u.length === 0, h = k.useCallback(
    (f) => {
      const p = ar(f);
      a({ spec: f, issues: p }), p.length === 0 && (o(f), s(f));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: h };
}
const Ng = () => {
};
function Cg({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = Ze(), { draft: s, issues: c, valid: u, committed: m, update: h } = wg({
    spec: e,
    onChange: t ?? Ng,
    debounceMs: r
  }), f = o.get(s.chart.family), p = (f == null ? void 0 : f.queryless) ?? !1, v = m, b = (T) => {
    var D, P, E;
    return (((D = T == null ? void 0 : T.measures) == null ? void 0 : D.length) ?? 0) > 0 || (((P = T == null ? void 0 : T.dimensions) == null ? void 0 : P.length) ?? 0) > 0 || (((E = T == null ? void 0 : T.timeDimensions) == null ? void 0 : E.some((O) => typeof O.granularity == "string")) ?? !1);
  }, y = (T) => {
    var D;
    return (((D = T == null ? void 0 : T.measures) == null ? void 0 : D.length) ?? 0) > 0;
  }, w = (f == null ? void 0 : f.requiresMeasure) ?? s.chart.family !== "table", x = p || b(s.query) && b(v.query) && (!w || y(s.query) && y(v.query)), N = w && !y(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = k.useCallback(
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
  ), C = x ? /* @__PURE__ */ l(
    Xr,
    {
      query: v.query ?? {},
      chart: v.chart,
      editing: !0,
      updateFamilyOptions: S
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: N }) }), R = n ? /* @__PURE__ */ g(U, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(xi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "chart-editor",
      className: M("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ g(Ln, { variant: "destructive", children: [
          /* @__PURE__ */ l(Ar, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(En, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Pn, { children: /* @__PURE__ */ g("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((T, D) => /* @__PURE__ */ g("li", { children: [
              T.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: T.path }) : null,
              " ",
              T.message
            ] }, D)),
            c.length > 3 ? /* @__PURE__ */ g("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(yg, { spec: s, update: h, toolbar: R, children: C }) })
      ]
    }
  );
}
function Sg({
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
  className: f
}) {
  const p = a || i, [v, b] = k.useState(!1);
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
      className: M("cv-editor-toolbar", f),
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
          /* @__PURE__ */ g(U, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(gi, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ g(U, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Lr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ g(U, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Ys, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ g(U, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Qs, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ g("div", { className: "cv-editor-toolbar-actions", children: [
          p ? /* @__PURE__ */ g(ie, { children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(Js, {})
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
                children: /* @__PURE__ */ l(Xs, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ g(
            U,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(Zs, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ g(
            U,
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
                v ? /* @__PURE__ */ l(Je, {}) : /* @__PURE__ */ l(xi, {}),
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
const ss = "lg", ls = 12;
function xg(e, t) {
  const n = t[ss];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function Mg(e, t) {
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
const Rg = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function _g(e, t, n, r = ls) {
  const a = Rg[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function cs(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? ls) {
  const a = _g(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Tg(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return cs(e, a);
}
function Og(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Ag(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Dg = 12, Lg = 900, Eg = 0.4;
function Pg(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Fg({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = po(), u = e.grid ?? {}, m = u.cols ?? Dg, h = u.rowHeight ?? 40, f = u.margin ?? [12, 12], p = u.containerPadding ?? [0, 0], v = Math.max(Eg, Math.min(1, c / Lg)), b = Math.round(v / 0.05) * 0.05, y = Math.max(8, Math.round(h * b)), w = [
    Math.round(f[0] * b),
    Math.round(f[1] * b)
  ], x = [
    Math.round(p[0] * b),
    Math.round(p[1] * b)
  ], N = k.useMemo(
    () => ({ [ss]: Pg(e.layout) }),
    [e.layout]
  ), S = k.useMemo(
    () => new Map(e.widgets.map((P) => [P.id, P])),
    [e.widgets]
  ), C = k.useRef(o);
  k.useEffect(() => {
    C.current = o;
  }, [o]);
  const R = k.useRef(e.layout);
  k.useEffect(() => {
    R.current = e.layout;
  }, [e.layout]);
  const T = k.useRef(null), D = k.useCallback(
    (P, E) => {
      const _ = xg(P, E).map((F) => ({ ...F }));
      $g(R.current, _) || C.current(_);
    },
    []
  );
  return /* @__PURE__ */ l(Jr, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    Ri,
    {
      width: c,
      layouts: N,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: y,
      margin: w,
      containerPadding: x,
      dragConfig: { enabled: !0, handle: `.${Sn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: D,
      children: e.layout.map((P) => {
        const E = S.get(P.i);
        if (!E) return null;
        const O = E.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ g(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${E.title ?? E.type}`,
              "aria-pressed": O,
              onPointerDown: (_) => {
                T.current = { x: _.clientX, y: _.clientY };
              },
              onClick: (_) => {
                const F = T.current;
                F && Math.hypot(_.clientX - F.x, _.clientY - F.y) > 5 || n(E.id);
              },
              onKeyDown: (_) => {
                (_.key === "Enter" || _.key === " ") && (_.preventDefault(), n(E.id));
              },
              className: M(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                O && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(wr, { widget: E, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: M(Sn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ g("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${E.title ?? E.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), r(E.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(el, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${E.title ?? E.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), a(E.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(tl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${E.title ?? E.type}`,
                      onClick: (_) => {
                        _.stopPropagation(), i(E.id);
                      },
                      className: M("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(xt, {})
                    }
                  )
                ] })
              ]
            },
            P.i
          )
        );
      })
    }
  ) : null }) });
}
function $g(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Ig = k.memo(Fg);
function zg(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Vg({
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
  const a = _i({
    extensions: [Oi],
    editable: !0,
    content: zg(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: M(go, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(oe, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ g("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(jg, { editor: a }),
    /* @__PURE__ */ l(Ti, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function He({ active: e, onClick: t, title: n, children: r }) {
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
function jg({ editor: e }) {
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
          He,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(nl, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(rl, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(al, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          He,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(il, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(ol, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          He,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(sl, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(ll, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(cl, {})
          }
        )
      ]
    }
  );
}
const Wg = Pr(
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
function Hg({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: M(Wg({ variant: t }), e), ...n });
}
function qg({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = ze(), c = k.useMemo(() => Un(o), [o]), u = c.filter((f) => f.type === "cube"), m = c.filter((f) => f.type === "view"), h = c.find((f) => f.name === e);
  return /* @__PURE__ */ g(Se, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Me, { id: a, className: i, children: /* @__PURE__ */ l(xe, { placeholder: s ? "Loading…" : n, children: h ? /* @__PURE__ */ l(ir, { option: h }) : void 0 }) }),
    /* @__PURE__ */ g(Re, { children: [
      m.length > 0 ? /* @__PURE__ */ g(br, { children: [
        /* @__PURE__ */ l(yr, { children: "Views" }),
        m.map((f) => /* @__PURE__ */ l(de, { value: f.name, children: /* @__PURE__ */ l(ir, { option: f }) }, f.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ g(br, { children: [
        /* @__PURE__ */ l(yr, { children: "Cubes" }),
        u.map((f) => /* @__PURE__ */ l(de, { value: f.name, children: /* @__PURE__ */ l(ir, { option: f }) }, f.name))
      ] }) : null
    ] })
  ] });
}
function ir({ option: e }) {
  const t = e.type === "view" ? Er : Ni;
  return /* @__PURE__ */ g("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Hg, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const Bg = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Ug(e) {
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
function Kg({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(Ug(s));
  };
  return /* @__PURE__ */ g("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      oe,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ g(
          Se,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Me, { children: /* @__PURE__ */ l(xe, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Re, { children: t.map((s) => /* @__PURE__ */ l(de, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(oe, { label: "Control", children: /* @__PURE__ */ g(Se, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Me, { children: /* @__PURE__ */ l(xe, {}) }),
      /* @__PURE__ */ l(Re, { children: Tl.options.map((s) => /* @__PURE__ */ l(de, { value: s, children: Bg[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Gg, { control: r, onChange: a, variables: t })
  ] });
}
function Gg({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Yg, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Jg, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Xg, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Zg, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(ev, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(tv, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Yg({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ g(ie, { children: [
    /* @__PURE__ */ l(
      oe,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          Qg,
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
function Qg({
  selected: e,
  onChange: t
}) {
  const [n, r] = k.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(dn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === dn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ g(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Te, { asChild: !0, children: /* @__PURE__ */ g(U, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(Qe, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Oe, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: dn.map((s) => {
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
                children: c ? /* @__PURE__ */ l(Je, { className: "cv-ed-icon-xs" }) : null
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
function Jg({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = Ke.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ g(ie, { children: [
    /* @__PURE__ */ l(
      oe,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ g(
          Se,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Me, { children: /* @__PURE__ */ l(xe, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ g(Re, { children: [
                /* @__PURE__ */ l(de, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(de, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(oe, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Ke.options.map((s) => {
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
function Xg({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ g(ie, { children: [
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
      oe,
      {
        label: "Options",
        action: /* @__PURE__ */ g(U, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(kt, {}),
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
            U,
            {
              variant: "ghost",
              size: "icon",
              className: M("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(xt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Zg({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ g(ie, { children: [
    /* @__PURE__ */ l(oe, { label: "From", children: /* @__PURE__ */ g(
      Se,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Me, { children: /* @__PURE__ */ l(xe, {}) }),
          /* @__PURE__ */ g(Re, { children: [
            /* @__PURE__ */ l(de, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(de, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(de, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      oe,
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
          qg,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function ev({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ l(oe, { label: "Placeholder", children: /* @__PURE__ */ l(
    le,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function tv({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ l(oe, { label: a, children: /* @__PURE__ */ l(
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
  return /* @__PURE__ */ g(ie, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function nv(e) {
  return { schemaVersion: gt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function rv(e) {
  const t = {
    schemaVersion: gt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function av(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function ai({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = r ? (o) => r([...t, o]) : void 0;
  return /* @__PURE__ */ g("div", { "data-slot": "widget-edit-panel", className: M("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      oe,
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
      /* @__PURE__ */ l(Jr, { spec: nv(t), children: /* @__PURE__ */ l(sp, { createVariable: i, children: /* @__PURE__ */ l("div", { className: M(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Cg,
        {
          fill: a,
          spec: rv(e),
          onChange: (o) => n(av(e, o))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Vg, { widget: e, onChange: n }) : /* @__PURE__ */ l(Kg, { widget: e, variables: t, onChange: n })
  ] });
}
function iv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ g(ie, { children: [
    r ? /* @__PURE__ */ l(
      nn,
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
function ov({
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
  const u = i !== void 0, [m, h] = k.useState(a), f = r ? u ? i : m : !0, p = k.useId(), v = k.useCallback(() => {
    const b = !f;
    u || h(b), o == null || o(b);
  }, [f, u, o]);
  return /* @__PURE__ */ g(
    "section",
    {
      "data-slot": "section",
      "data-state": f ? "open" : "closed",
      className: M("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          iv,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: f,
            onToggle: v,
            regionId: p
          }
        ),
        f ? /* @__PURE__ */ l("div", { id: p, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function sv(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function lv(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function cv(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function uv(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function mv(e, t) {
  switch (e) {
    case "chart":
      return lv(t);
    case "text":
      return cv(t);
    case "input":
      return uv(t);
  }
}
function dv(e) {
  return { name: e, type: "string" };
}
function hv(e) {
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
const ii = {
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
function fv({
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
    t(e.map((h, f) => f === u ? pv(h, m) : h));
  }, o = (u) => t(e.filter((m, h) => h !== u)), s = () => t([...e, dv(a())]), c = (u, m) => {
    const h = u + m;
    if (h < 0 || h >= e.length) return;
    const f = e.slice();
    [f[u], f[h]] = [f[h], f[u]], t(f);
  };
  return /* @__PURE__ */ l(
    ov,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ g(U, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(kt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ g("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ g("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ g(U, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(kt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        gv,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((h, f) => f !== m && h.name === u.name && u.name !== ""),
          onChange: (h) => i(m, h),
          onRemove: () => o(m),
          onMove: (h) => c(m, h)
        },
        m
      )) })
    }
  );
}
function pv(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = hv(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function gv({
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
              children: s ? /* @__PURE__ */ l(Qe, {}) : /* @__PURE__ */ l(nn, {})
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
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: ii[e.type] }),
          /* @__PURE__ */ g("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(On, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(An, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: M("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(xt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ g("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(oe, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ g(Se, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ l(Me, { children: /* @__PURE__ */ l(xe, {}) }),
            /* @__PURE__ */ l(Re, { children: Ei.options.map((m) => /* @__PURE__ */ l(de, { value: m, children: ii[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(oe, { label: "Label", hint: "Optional human label for controls.", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
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
          /* @__PURE__ */ l(vv, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function vv({
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
    return /* @__PURE__ */ l(oe, { label: "Default", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : bv(e.default);
  return /* @__PURE__ */ l(oe, { label: "Default", hint: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    le,
    {
      value: r,
      placeholder: yv(e.type),
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
function bv(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function yv(e) {
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
function sb({
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
  families: f,
  className: p
}) {
  var B, G;
  const [v, b] = k.useState(e), [y, w] = k.useState(e);
  k.useEffect(() => {
    b(e), w(e);
  }, [e]);
  const [x, N] = k.useState(null), S = k.useRef(0), [C, R] = k.useState(null), T = k.useRef(x), D = k.useRef(C), P = k.useRef(v);
  k.useEffect(() => {
    T.current = x, D.current = C, P.current = v;
  });
  const E = k.useRef(null);
  E.current === null && (E.current = i ?? sv());
  const O = i ?? E.current, _ = os(
    (z) => r == null ? void 0 : r(z),
    o
  ), F = k.useCallback(
    (z) => {
      S.current = Date.now(), b((V) => {
        const Z = z(V);
        return _(Z), Z;
      });
    },
    [_]
  ), I = k.useRef(t);
  k.useEffect(() => {
    if (!t || t === I.current) return;
    const z = 500;
    let V = null;
    const Z = () => {
      var Tt;
      const Ae = Date.now() - S.current;
      if (Ae < z) {
        V = setTimeout(Z, z - Ae);
        return;
      }
      I.current = t;
      const ht = /* @__PURE__ */ new Set();
      ((Tt = D.current) == null ? void 0 : Tt.kind) === "widget" && ht.add(D.current.id), T.current && ht.add(T.current);
      const _t = Nv(t, P.current, ht);
      b(_t), n == null || n(_t);
    };
    return Z(), () => {
      V && clearTimeout(V);
    };
  }, [t]);
  const A = k.useCallback(
    (z) => {
      const V = mv(z, O());
      F((Z) => cs(Z, V)), N(V.id), R({ kind: "widget", id: V.id });
    },
    [F, O]
  ), K = k.useCallback((z) => N(z), []), Y = k.useCallback((z) => {
    N(z), R({ kind: "widget", id: z });
  }, []), W = k.useCallback(
    (z) => {
      F((V) => Og(V, z)), N((V) => V === z ? null : V), R((V) => (V == null ? void 0 : V.kind) === "widget" && V.id === z ? null : V);
    },
    [F]
  ), q = k.useCallback(
    (z) => {
      const V = O();
      F((Z) => Tg(Z, z, V)), N(V);
    },
    [F, O]
  ), j = k.useCallback(
    (z) => F((V) => Ag(V, z)),
    [F]
  ), H = k.useCallback(
    (z) => F((V) => {
      const Z = Mg(V.layout, z);
      return wv(V.layout, Z) ? V : { ...V, layout: Z };
    }),
    [F]
  ), te = k.useCallback(
    (z) => F((V) => ({ ...V, name: z || void 0 })),
    [F]
  ), ne = k.useCallback(
    (z) => F((V) => ({ ...V, variables: z })),
    [F]
  ), re = k.useDeferredValue(v), pe = k.useMemo(
    () => dr.safeParse(re),
    [re]
  ), Ce = k.useCallback(() => {
    const z = dr.safeParse(v);
    z.success && (a == null || a(z.data), w(v));
  }, [v, a]), Le = v !== y, se = (C == null ? void 0 : C.kind) === "widget" ? v.widgets.find((z) => z.id === C.id) ?? null : null;
  k.useEffect(() => {
    (C == null ? void 0 : C.kind) === "widget" && !v.widgets.some((z) => z.id === C.id) && R(null);
  }, [C, v.widgets]);
  const $ = k.useCallback(() => R(null), []), L = (C == null ? void 0 : C.kind) === "variables" ? "Dashboard variables" : se ? se.title ?? `${kv(se.type)} widget` : "";
  return /* @__PURE__ */ l(Qr, { families: f, children: /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((G = (B = v.grid) == null ? void 0 : B.margin) == null ? void 0 : G[0]) ?? 12 },
      className: M("cv-dashboard-editor", p),
      children: [
        /* @__PURE__ */ l(
          Sg,
          {
            name: v.name ?? "",
            onNameChange: te,
            onAdd: A,
            onEditVariables: () => R({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: h,
            discardDisabled: !Le,
            onSave: a ? Ce : void 0,
            saveDisabled: !pe.success || !Le,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        pe.success ? null : /* @__PURE__ */ g("p", { className: "cv-dashboard-editor-validation", children: [
          pe.error.issues.length,
          " validation issue",
          pe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: C ? null : /* @__PURE__ */ l(
          Ig,
          {
            spec: v,
            selectedId: x,
            onSelect: K,
            onEdit: Y,
            onDuplicate: q,
            onDelete: W,
            onLayoutChange: H
          }
        ) }),
        C ? /* @__PURE__ */ g(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": L,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ g("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ g("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ g(U, { variant: "ghost", size: "sm", onClick: $, children: [
                    /* @__PURE__ */ l(Dr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: L })
                ] }),
                se ? /* @__PURE__ */ g(
                  U,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => W(se.id),
                    children: [
                      /* @__PURE__ */ l(xt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: C.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(fv, { variables: v.variables, onChange: ne }) }) : (se == null ? void 0 : se.type) === "chart" ? /* @__PURE__ */ l(
                ai,
                {
                  fill: !0,
                  widget: se,
                  variables: v.variables,
                  onChange: j,
                  onVariablesChange: ne
                }
              ) : se ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                ai,
                {
                  widget: se,
                  variables: v.variables,
                  onChange: j,
                  onVariablesChange: ne
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function kv(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function wv(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Nv(e, t, n) {
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
  _c as AreaChartFamily,
  cc as AreaFamilyOptionsSchema,
  Sl as AxesOptionsSchema,
  ga as AxisOptionsSchema,
  Qv as BUILTIN_CHART_FAMILIES,
  je as BUILTIN_DEFAULTS,
  Ve as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Mc as BarChartFamily,
  sc as BarFamilyOptionsSchema,
  ss as CANONICAL_BREAKPOINT,
  Ge as ChartColorTokenSchema,
  yg as ChartEditOverlay,
  Cg as ChartEditor,
  yl as ChartFamilySchema,
  jr as ChartInteractionProvider,
  Li as ChartOptionsSchema,
  io as ChartRenderer,
  Fi as ChartSpecSchema,
  Rl as ChartTransformSchema,
  ob as ChartView,
  Al as ChartWidgetSchema,
  xl as ColorAssignmentSchema,
  fc as CondFormatRuleSchema,
  Xr as CubeChart,
  Bd as CubeChartSpec,
  Di as CubeQuerySchema,
  Wn as CubeVizContext,
  rb as CubeVizProvider,
  ct as DEFAULT_COLOR_RAMP,
  ls as DEFAULT_COLS,
  cn as DEFAULT_TRANSFORM_WINDOW,
  vr as DEFAULT_UNIT_CONVERSIONS,
  Sn as DRAG_HANDLE_CLASS,
  ib as Dashboard,
  sb as DashboardEditor,
  Jr as DashboardProvider,
  dr as DashboardSpecSchema,
  ur as DateRangeSchema,
  vc as EMPTY_FAMILY_DEFAULT,
  ba as EM_DASH,
  Ig as EditorCanvas,
  Sg as EditorToolbar,
  Qr as FamilyRegistryOverride,
  mp as FilterBuilder,
  pl as FilterOperatorSchema,
  kl as FormatKindSchema,
  Dn as FormatOptionsSchema,
  Yl as GRANULARITY_PATTERN,
  Ke as GranularitySchema,
  Fl as GridConfigSchema,
  $c as HeatmapChartFamily,
  gc as HeatmapFamilyOptionsSchema,
  Tl as InputControlKindSchema,
  Ol as InputControlSchema,
  Kg as InputWidgetEditor,
  Ll as InputWidgetSchema,
  hh as InputWidgetView,
  Vc as KpiFamily,
  dc as KpiFamilyOptionsSchema,
  Pl as LayoutItemSchema,
  gl as LeafFilterSchema,
  Nl as LegendOptionsSchema,
  Rc as LineChartFamily,
  lc as LineFamilyOptionsSchema,
  ae as MemberSchema,
  ha as OrderDirSchema,
  bl as OrderSpecSchema,
  Tc as PieChartFamily,
  uc as PieFamilyOptionsSchema,
  mr as QueryFilterSchema,
  Fn as ReferenceLineOptSchema,
  wr as RenderWidget,
  gt as SCHEMA_VERSION,
  fl as ScalarSchema,
  Ac as ScatterChartFamily,
  mc as ScatterFamilyOptionsSchema,
  wl as SeriesMappingSchema,
  fa as SeriesMetaSchema,
  $i as SpecSchema,
  hc as TableColumnOptSchema,
  Zc as TableFamily,
  pc as TableFamilyOptionsSchema,
  Vg as TextWidgetEditor,
  Dl as TextWidgetSchema,
  Kd as TextWidgetView,
  vl as TimeDimensionSchema,
  _l as TipTapDocSchema,
  Cl as TooltipOptionsSchema,
  Ml as TransformKindSchema,
  kn as VarRefSchema,
  $l as VariableDeclSchema,
  Ei as VariableTypeSchema,
  Ai as VariableValueSchema,
  fv as VariablesPanel,
  No as WidgetChrome,
  ai as WidgetEditPanel,
  El as WidgetSpecSchema,
  Ff as adaptiveGranularity,
  cs as appendWidget,
  vu as areaChartFamily,
  Ta as assignColors,
  Td as axisKey,
  pu as barChartFamily,
  Gr as buildFamilyRegistry,
  nb as builtinCharts,
  Ie as builtinFamilyDescriptors,
  In as builtinFamilyRegistry,
  Bl as createCubeClient,
  sv as createIdFactory,
  co as createQueryResolver,
  mo as createUnitsFormatter,
  Yu as createVariableStore,
  Jl as datePattern,
  hr as deepMerge,
  Kr as defaultChartFamilies,
  hv as defaultForType,
  zr as defaultFormatter,
  Ul as fetchMeta,
  eb as formatCategory,
  Ht as formatDateValue,
  Rf as geoPointId,
  ku as heatmapChartFamily,
  Nt as isEmptyValue,
  Ne as isVarRef,
  wu as kpiChartFamily,
  gu as lineChartFamily,
  ql as loadSpec,
  Ir as looksLikeIsoDate,
  Vi as makeChartFormat,
  Zv as makeDateFormatter,
  tb as makeFormatter,
  Mg as mergeLayout,
  jn as mergeUnitConversions,
  lv as newChartWidget,
  uv as newInputWidget,
  cv as newTextWidget,
  dv as newVariable,
  mv as newWidget,
  so as normalize,
  xg as pickCanonicalLayout,
  bu as pieChartFamily,
  _g as placeNewItem,
  Ad as quantityLabel,
  Og as removeWidget,
  Ag as replaceWidget,
  Pd as resolveChart,
  Su as resolveOptions,
  bc as resolveOptionsWith,
  lo as resolveQuery,
  Hu as resolveRelativeDateRange,
  oo as resolveSeriesColors,
  Bu as resolveValue,
  Jv as safeLoadSpec,
  yu as scatterChartFamily,
  Nu as tableChartFamily,
  Ii as toDate,
  Eu as toResultAnnotation,
  wg as useChartEditorState,
  Hi as useChartInteractions,
  po as useContainerWidth,
  ze as useCubeMeta,
  ho as useCubeQuery,
  Ee as useCubeVizContext,
  fo as useDashboard,
  os as useDebouncedCallback,
  Ze as useFamilyRegistry,
  ab as useFormatter,
  er as useNormalizedSeries,
  an as useOptionalDashboard,
  Xv as validateSpec
};
//# sourceMappingURL=index.js.map
