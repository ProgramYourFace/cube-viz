var hs = Object.defineProperty;
var fs = (e, t, n) => t in e ? hs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ha = (e, t, n) => fs(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as p, Fragment as se } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as ee, createContext as li, useContext as Or, useState as bt, useCallback as Ue, useEffect as tn, useRef as nt, createElement as ps, useSyncExternalStore as ci, useId as gs, Component as vs } from "react";
import { ruleX as ui, text as yt, ruleY as mi, colorLegend as Ar, stack as di, group as bs, barX as ys, barY as ks, lineX as ws, lineY as _n, defineChart as Qe, areaY as or, dot as Ns, cell as Cs } from "@tanstack/charts";
import { crosshair as hi } from "@tanstack/charts/crosshair";
import { scaleBand as Ss } from "@tanstack/charts/scales/band";
import { scaleLinear as pn } from "@tanstack/charts/scales/linear";
import { scalePoint as xs } from "@tanstack/charts/scales/point";
import { Chart as Ms } from "@tanstack/charts/react/core";
import { motion as fi } from "@tanstack/charts/motion";
import { tooltip as Dr } from "@tanstack/charts/tooltip";
import { d3Curve as Kn } from "@tanstack/charts/d3/shape";
import { brushX as Rs } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Ts } from "@tanstack/charts/interaction/signal";
import { scaleUtc as _s, scaleLog as fa, scaleSqrt as Os } from "d3-scale";
import { curveNatural as As, curveStepAfter as Ds, curveMonotoneX as Ls } from "d3-shape";
import { format as de, isValid as Dt, parseISO as gn, subDays as ye, startOfWeek as vn, endOfWeek as bn, startOfMonth as rt, endOfMonth as Vt, startOfQuarter as at, endOfQuarter as jt, startOfYear as it, endOfYear as Wt, subWeeks as sr, subMonths as ot, subQuarters as st, subYears as lt, differenceInCalendarDays as Es, parse as pi } from "date-fns";
import { z as h } from "zod";
import { clsx as Is } from "clsx";
import { Minus as gi, ArrowUp as On, ArrowDown as An, CalendarRange as vi, ChevronsUpDown as Ps, AreaChart as Fs, BarChart3 as bi, Grid3X3 as $s, Table as zs, Gauge as Vs, ScatterChart as js, PieChart as Ws, LineChart as Hs, AlertCircle as Lr, ChevronLeft as Er, ChevronRight as nn, ChevronDown as Je, Check as Xe, ChevronUp as Bs, CalendarIcon as yi, MoreVertical as qs, RefreshCw as Us, Image as Ks, Sheet as Gs, Type as Ir, MapPin as ki, Hash as lr, Calendar as wi, Search as Ys, Table2 as Ni, Database as Ci, Layers as Pr, Variable as Qs, Plus as kt, Trash2 as xt, ListFilter as Js, Box as Si, EyeOff as xi, Eye as Mi, X as pa, Save as Ri, SlidersHorizontal as Xs, Braces as Zs, Undo2 as el, Redo2 as tl, RotateCcw as nl, Pencil as rl, Copy as al, Bold as il, Italic as ol, Strikethrough as sl, Heading1 as ll, Heading2 as cl, List as ul, ListOrdered as ml, Quote as dl } from "lucide-react";
import * as yn from "@radix-ui/react-popover";
import { cva as Fr } from "class-variance-authority";
import * as Ne from "@radix-ui/react-select";
import hl from "@cubejs-client/core";
import { DayPicker as fl, useDayPicker as pl } from "react-day-picker";
import { pie as gl, radialArc as cr, radialText as Gn, polar as Ti } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as _i } from "react-grid-layout";
import { useEditor as Oi, EditorContent as Ai } from "@tiptap/react";
import Di from "@tiptap/starter-kit";
const gt = 2, kn = h.object({ var: h.string().min(1) }).strict();
function xe(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const wn = (e) => h.union([e, kn]), vl = h.union([h.string(), h.number(), h.boolean()]), Ge = h.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), ur = h.union([h.tuple([h.string(), h.string()]), h.string()]), Li = h.union([
  h.string(),
  h.number(),
  h.boolean(),
  h.tuple([h.string(), h.string()]),
  // absolute date range
  h.array(h.string()),
  h.array(h.number())
]), oe = h.string().min(1), bl = h.enum([
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
]), yl = h.object({
  member: oe,
  operator: bl,
  values: h.array(h.union([vl, kn])).optional()
}).strict(), mr = h.lazy(
  () => h.union([
    yl,
    h.object({ and: h.array(mr) }).strict(),
    h.object({ or: h.array(mr) }).strict()
  ])
), kl = h.object({
  dimension: oe,
  granularity: wn(Ge).optional(),
  dateRange: wn(ur).optional(),
  compareDateRange: h.array(ur).optional()
}).strict(), ga = h.enum(["asc", "desc"]), wl = h.union([
  h.record(oe, ga),
  h.array(h.tuple([oe, ga]))
]), Ei = h.object({
  measures: h.array(oe).optional(),
  dimensions: h.array(oe).optional(),
  timeDimensions: h.array(kl).optional(),
  filters: h.array(mr).optional(),
  segments: h.array(oe).optional(),
  order: wl.optional(),
  limit: wn(h.number()).optional(),
  offset: wn(h.number()).optional(),
  total: h.boolean().optional(),
  timezone: h.string().optional()
}).strict(), Nl = h.string().min(1), rb = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Ye = h.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Cl = h.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Dn = h.object({
  kind: Cl.optional(),
  decimals: h.number().optional(),
  abbreviate: h.boolean().optional(),
  prefix: h.string().optional(),
  suffix: h.string().optional(),
  unitSystem: h.enum(["metric", "imperial"]).optional(),
  dateFormat: h.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: h.string().optional()
}).strict(), va = h.object({
  label: h.string().optional(),
  colorToken: Ye.optional(),
  stackId: h.string().optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: h.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: h.boolean().optional(),
  format: Dn.optional()
}).strict(), Sl = h.object({
  category: h.object({ member: oe }).strict(),
  series: h.union([
    h.object({
      mode: h.literal("measures"),
      members: h.array(oe),
      meta: h.record(oe, va).optional()
    }).strict(),
    h.object({
      mode: h.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: oe,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: h.array(oe).optional(),
      pivot: oe,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: h.record(oe, va).optional()
    }).strict()
  ])
}).strict(), xl = h.object({
  show: h.boolean().optional(),
  position: h.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Ml = h.object({
  show: h.boolean().optional(),
  indicator: h.enum(["dot", "line", "dashed"]).optional(),
  showTotal: h.boolean().optional()
}).strict(), ba = h.union([h.number(), h.literal("auto")]), ya = h.object({
  label: h.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: h.boolean().optional(),
  hide: h.boolean().optional(),
  scale: h.enum(["linear", "log"]).optional(),
  domain: h.tuple([ba, ba]).optional(),
  tickFormat: Dn.optional()
}).strict(), Rl = h.object({
  x: ya.optional(),
  y: ya.optional()
}).strict(), Tl = h.object({
  byKey: h.record(h.string(), Ye).optional(),
  ramp: h.array(Ye).optional()
}).strict(), cn = 7, _l = h.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Ol = h.object({
  kind: _l,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: h.number().int().min(2).max(90).optional()
}).strict(), Ii = h.object({
  family: Nl,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Sl.optional(),
  orientation: h.enum(["vertical", "horizontal"]).optional(),
  stackMode: h.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: xl.optional(),
  tooltip: Ml.optional(),
  axes: Rl.optional(),
  colors: Tl.optional(),
  format: Dn.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * does NOT bump {@link SCHEMA_VERSION} — every existing v2 spec stays valid.
   */
  transform: Ol.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: h.record(h.string(), h.unknown()).optional()
}).strict(), Al = h.object({ type: h.string(), content: h.array(h.unknown()).optional() }).passthrough(), Dl = h.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Ll = h.object({
  variable: h.string().min(1),
  control: h.discriminatedUnion("kind", [
    h.object({
      kind: h.literal("dateRange"),
      presets: h.array(h.string()).optional(),
      allowFuture: h.boolean().optional()
    }).strict(),
    h.object({
      kind: h.literal("granularity"),
      options: h.array(Ge).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: h.string().optional()
    }).strict(),
    h.object({
      kind: h.literal("select"),
      options: h.array(h.object({ value: Li, label: h.string() }).strict()),
      multiple: h.boolean().optional()
    }).strict(),
    h.object({
      kind: h.literal("memberSelect"),
      from: h.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: h.string().optional()
    }).strict(),
    h.object({ kind: h.literal("text"), placeholder: h.string().optional() }).strict(),
    h.object({
      kind: h.literal("number"),
      min: h.number().optional(),
      max: h.number().optional(),
      step: h.number().optional()
    }).strict(),
    h.object({ kind: h.literal("toggle") }).strict()
  ])
}).strict(), $r = {
  id: h.string().min(1),
  title: h.string().optional()
}, El = h.object({ ...$r, type: h.literal("chart"), query: Ei.default({}), chart: Ii }).strict(), Il = h.object({ ...$r, type: h.literal("text"), doc: Al }).strict(), Pl = h.object({ ...$r, type: h.literal("input"), control: Ll }).strict(), Fl = h.discriminatedUnion("type", [
  El,
  Il,
  Pl
]), $l = h.object({
  i: h.string(),
  x: h.number(),
  y: h.number(),
  w: h.number(),
  h: h.number(),
  minW: h.number().optional(),
  minH: h.number().optional(),
  static: h.boolean().optional()
}).strict(), zl = h.object({
  cols: h.number().optional(),
  rowHeight: h.number().optional(),
  margin: h.tuple([h.number(), h.number()]).optional(),
  containerPadding: h.tuple([h.number(), h.number()]).optional()
}).strict(), Pi = h.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Vl = h.object({
  name: h.string().min(1),
  type: Pi,
  label: h.string().optional(),
  array: h.boolean().optional(),
  default: Li.optional()
}).strict(), Fi = {
  schemaVersion: h.literal(gt),
  id: h.string().min(1),
  name: h.string().optional(),
  description: h.string().optional(),
  createdAt: h.string().optional(),
  updatedAt: h.string().optional()
}, $i = h.object({ ...Fi, kind: h.literal("chart"), query: Ei.default({}), chart: Ii }).strict(), dr = h.object({
  ...Fi,
  kind: h.literal("dashboard"),
  variables: h.array(Vl),
  widgets: h.array(Fl),
  layout: h.array($l),
  grid: zl.optional()
}).strict(), zi = h.discriminatedUnion("kind", [$i, dr]);
function we(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function zr(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function jl(e) {
  if (!we(e.axes)) return;
  const t = zr(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Wl(e) {
  if (!we(e.mapping)) return;
  const t = e.mapping.series;
  if (!we(t) || !we(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!we(a)) continue;
    const i = zr(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Hl(e) {
  if (!we(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => we(n) ? zr(n, "side") ?? {} : n
  ));
}
function Bl(e) {
  const t = we(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(we) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = we(e.mapping) ? e.mapping : void 0, a = r && we(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = we(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function ka(e) {
  we(e) && (e.family === "combo" && Bl(e), jl(e), Wl(e), Hl(e));
}
function ql(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ka(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      we(n) && n.type === "chart" && ka(n.chart);
  return t;
}
const Ul = {
  1: ql
};
function Kl(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > gt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${gt} — update the library`
    );
  for (; n < gt; ) {
    const r = Ul[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return zi.parse(t);
}
function ab(e) {
  try {
    return { ok: !0, spec: Kl(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function ib(e) {
  return zi.parse(e);
}
function Gl(e) {
  return hl(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Yl(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function R(...e) {
  return Is(e);
}
function Ql({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: R("cv-skeleton", e), ...t });
}
const Jl = Fr(
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
), Ln = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: R(Jl({ variant: t }), e),
    ...n
  }
));
Ln.displayName = "Alert";
const En = b.forwardRef(
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
En.displayName = "AlertTitle";
const In = b.forwardRef(
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
In.displayName = "AlertDescription";
const Xl = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Zl = "MMM d, yyyy";
function Vi(e) {
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
function Vr(e) {
  return /^\d{4}-\d{2}/.test(e) ? Dt(gn(e)) : !1;
}
function ec(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Xl[t] : Zl;
}
function Ht(e, t, n) {
  const r = Vi(e);
  return r ? de(r, ec(t, n)) : String(e);
}
function ob(e, t) {
  return (n) => n == null ? "" : Ht(n, e, t);
}
function sb(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ht(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ht(e, t.format, t.granularity) : String(e) : Vr(e) ? Ht(e, t.format, t.granularity) : e;
}
const wa = "—", tc = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Na(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function nc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of tc)
    if (n >= r) return Na((e / r).toFixed(t)) + a;
  return Na(e.toFixed(t));
}
function rc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function ac(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? nc(e, n.decimals ?? 1) : rc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function ji(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ic(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || ji(e.value) ? !0 : typeof e.value == "string" ? Vr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const jr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? wa : (ji(t) || typeof t == "string" || typeof t == "number") && ic(e) ? Ht(t, n, r) : typeof t == "number" ? ac(t, e) : String(t);
};
function oc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function lb(e, t) {
  return (n, r) => {
    const a = r ? oc(r, t) : void 0;
    return jr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function sc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function lc(e) {
  const t = Ge.safeParse(e);
  return t.success ? t.data : void 0;
}
function cc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = lc(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Wi(e, t, n, r) {
  const a = cc(e, t);
  return {
    value(i, o, s = "value") {
      const c = o ? sc(o, e) : void 0, u = c == null ? void 0 : c.meta;
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
const Pn = h.object({
  axis: h.enum(["x", "y"]),
  value: h.number(),
  label: h.string().optional(),
  colorToken: Ye.optional()
}).strict(), Wr = h.boolean().optional(), uc = h.object({
  barRadius: h.number().optional(),
  barCategoryGap: h.union([h.number(), h.string()]).optional(),
  barGap: h.union([h.number(), h.string()]).optional(),
  maxBarSize: h.number().optional(),
  showValueLabels: h.boolean().optional(),
  referenceLines: h.array(Pn).optional(),
  comparePrevious: Wr
}).strict(), Hi = h.enum(["linear", "monotone", "step", "natural"]), mc = h.object({
  curve: Hi.optional(),
  strokeWidth: h.number().optional(),
  dots: h.union([h.boolean(), h.literal("active")]).optional(),
  connectNulls: h.boolean().optional(),
  chrome: h.enum(["full", "none"]).optional(),
  referenceLines: h.array(Pn).optional(),
  showValueLabels: h.boolean().optional(),
  comparePrevious: Wr
}).strict(), dc = h.object({
  curve: Hi.optional(),
  fillOpacity: h.number().optional(),
  strokeWidth: h.number().optional(),
  connectNulls: h.boolean().optional(),
  dots: h.boolean().optional(),
  referenceLines: h.array(Pn).optional(),
  comparePrevious: Wr
}).strict(), hc = h.object({
  innerRadiusPct: h.number().optional(),
  outerRadiusPct: h.number().optional(),
  padAngle: h.number().optional(),
  cornerRadius: h.number().optional(),
  showLabels: h.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: h.object({ value: h.string().optional(), label: h.string().optional() }).strict().optional(),
  maxSlices: h.number().optional()
}).strict(), fc = h.object({
  x: oe,
  y: oe,
  size: oe.optional(),
  sizeRange: h.tuple([h.number(), h.number()]).optional(),
  groupBy: oe.optional(),
  shape: h.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: h.array(Pn).optional()
}).strict(), pc = h.object({
  display: h.enum(["number", "gauge"]).optional(),
  measure: oe,
  comparison: h.object({
    mode: h.enum(["previousPeriod", "value"]),
    value: h.union([oe, h.number()]).optional(),
    showAsPercent: h.boolean().optional(),
    goodDirection: h.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: h.object({
    member: oe.optional(),
    timeDimension: oe.optional(),
    granularity: h.union([Ge, kn]).optional(),
    dateRange: h.union([ur, kn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: h.enum(["up", "down"]).optional(),
  gauge: h.object({
    min: h.number().optional(),
    max: h.number(),
    thresholds: h.array(h.object({ at: h.number(), colorToken: Ye }).strict()).optional()
  }).strict().optional(),
  icon: h.string().optional()
}).strict(), gc = h.object({
  member: oe,
  label: h.string().optional(),
  format: Dn.optional(),
  align: h.enum(["left", "right", "center"]).optional(),
  width: h.number().optional(),
  hidden: h.boolean().optional()
}).strict(), vc = h.object({
  member: oe,
  when: h.object({
    op: h.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: h.number()
  }).strict(),
  colorToken: Ye.optional()
}).strict(), bc = h.object({
  columns: h.array(gc).optional(),
  pageSize: h.number().optional(),
  sortable: h.boolean().optional(),
  stickyHeader: h.boolean().optional(),
  rowHeight: h.enum(["compact", "default"]).optional(),
  showRowNumbers: h.boolean().optional(),
  conditionalFormat: h.array(vc).optional()
}).strict(), yc = h.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Ye.optional(),
  /** Print each cell's formatted value inside the cell. */
  showValues: h.boolean().optional()
}).strict(), je = {
  bar: uc,
  line: mc,
  area: dc,
  pie: hc,
  scatter: fc,
  heatmap: yc,
  kpi: pc,
  table: bc
}, We = {
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
function Ca(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function hr(e, t) {
  if (t === void 0) return e;
  if (!Ca(e) || !Ca(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? hr(e[r], a) : a);
  }
  return n;
}
const kc = { envelope: {}, familyOptions: {} };
function wc(e, t) {
  return {
    ...hr({ ...t.envelope }, e),
    familyOptions: hr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Bi = {}, Sa = () => {
}, Nc = {
  target: Bi,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Sa,
  emitPoint: Sa
}, Nn = b.createContext(null);
Nn.displayName = "ChartInteractionContext";
function qi() {
  return b.useContext(Nn) ?? Nc;
}
function Hr({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Nn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((v) => {
    const { parent: k, widgetId: y, onRangeSelect: w } = o.current, x = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(x) : k == null || k.emitRange(x);
  }, []), c = b.useCallback((v) => {
    const { parent: k, widgetId: y, onPointSelect: w } = o.current, x = v && v.widgetId === void 0 && y !== void 0 ? { ...v, widgetId: y } : v;
    w ? w(x) : k == null || k.emitPoint(x);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), d = i == null ? void 0 : i.target, f = b.useMemo(
    () => d || r ? { ...d, ...r } : Bi,
    [d, r]
  ), g = b.useMemo(
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
  return /* @__PURE__ */ l(Nn.Provider, { value: g, children: a });
}
function ct(e, t) {
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
function fr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Gt(e) {
  return e.label || e.key;
}
function qe(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Br(e, t) {
  const n = e.series.map(Gt), r = e.series.map(qe), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Ar({ placement: Mt(t.legendPlacement) })), a;
}
function Mt(e) {
  return e === "top" ? "top" : "bottom";
}
function rn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Cn(e = 0.2) {
  return Ss().padding(e);
}
function Ui() {
  return xs().padding(0.02);
}
const Cc = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Sc(e) {
  if (typeof e == "string" && Cc.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return Vi(e);
}
function Ki(e) {
  return e.toISOString().slice(0, -1);
}
function xa(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Ge.safeParse(n);
  return r.success ? r.data : void 0;
}
function Gi(e, t) {
  var m, d, f;
  const n = (d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member, r = (f = e.raw.annotation) == null ? void 0 : f.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const g of Object.keys(r))
    if (g === n || g.startsWith(`${n}.`)) {
      a = g;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? xa(n) : xa(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const g of e.categories) {
    if (typeof g == "number" && i === void 0 || typeof g == "string" && !Vr(g)) return null;
    const v = Sc(g);
    if (!v) return null;
    s.push(v);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((g) => c.has(g.getTime()) ? !1 : (c.add(g.getTime()), !0)).sort((g, v) => g.getTime() - v.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function Yi(e) {
  return e ? _s : Ui;
}
function qr(e) {
  return e ? "t" : "cat";
}
function Qi(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Ki(r)) : t.category(r);
}
function Ma(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Ki(t);
}
function Ji(e, t) {
  const n = qi(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (g) => g !== void 0 && s.some((v) => v.getTime() === g.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], d = u ?? { start: m, end: m }, f = u === null;
    return [
      Rs({
        id: "cv-brush-x",
        values: s,
        range: Ts(
          d,
          (g, { reason: v }) => {
            if (v.type !== "commit") return;
            const k = i.current.temporal, y = g.start.getTime() === g.end.getTime();
            if (a(y ? null : g), y || !k) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: k.member,
              granularity: k.granularity,
              from: Ma(k, g.start),
              to: Ma(k, g.end)
            });
          }
        ),
        format: (g) => i.current.opts.label(g),
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
function xc(e, t) {
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
    const a = () => r ? fa().domain(r) : fa();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: pn().domain(r), nice: !1 } : { scale: pn, nice: !0 };
}
function Yt(e) {
  switch (e) {
    case "monotone":
      return Kn(Ls);
    case "step":
      return Kn(Ds);
    case "natural":
      return Kn(As);
    default:
      return;
  }
}
function Ur(e, t) {
  var o, s, c, u, m, d, f, g, v, k;
  const n = e.raw.annotation, r = (y) => {
    var w, x, N, S, C, M;
    if (y)
      return ((w = n == null ? void 0 : n.measures[y]) == null ? void 0 : w.shortTitle) ?? ((x = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : x.shortTitle) ?? ((N = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : N.shortTitle) ?? ((S = n == null ? void 0 : n.measures[y]) == null ? void 0 : S.title) ?? ((C = n == null ? void 0 : n.dimensions[y]) == null ? void 0 : C.title) ?? ((M = n == null ? void 0 : n.timeDimensions[y]) == null ? void 0 : M.title) ?? y;
  }, a = e.series[0], i = (y) => {
    var w;
    return y ? (w = y.meta) != null && w.measure ? r(y.meta.measure) : y.label : void 0;
  };
  return {
    x: (s = (o = t.axes) == null ? void 0 : o.x) != null && s.labelHide ? void 0 : ((u = (c = t.axes) == null ? void 0 : c.x) == null ? void 0 : u.label) ?? r((d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member),
    y: (g = (f = t.axes) == null ? void 0 : f.y) != null && g.labelHide ? void 0 : ((k = (v = t.axes) == null ? void 0 : v.y) == null ? void 0 : k.label) ?? i(a)
  };
}
function Kr(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Mc(e) {
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
function Fn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.datum.value, r.datum.member, "tooltip");
  return {
    use: Dr,
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
function Gr(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [];
  return e.forEach((a, i) => {
    const o = `var(--${a.colorToken ?? "muted-foreground"})`, s = { stroke: o, strokeWidth: 1.25, strokeDasharray: "4 4" }, c = a.axis === "x", u = c ? t[a.value] : void 0;
    if (c && u == null) return;
    if (n != null && n.swap ? !c : c) {
      const d = n != null && n.swap ? a.value : u;
      r.push(ui([d], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        yt([{ v: d, label: a.label }], {
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
      const d = n != null && n.swap ? u : a.value;
      r.push(mi([d], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        yt([{ v: d, label: a.label }], {
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
function Xi(e, t, n) {
  const r = e.filter((i) => i.value !== null && !i.companion);
  if (!r.length) return [];
  const a = qr((n == null ? void 0 : n.temporal) ?? null);
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
const Rc = fi({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Tc = fi({ initial: !1 });
function Ze({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = b.useRef(null), u = qi(), m = u.pointEnabled && !r, d = b.useRef(s);
  b.useLayoutEffect(() => {
    d.current = s;
  });
  const f = b.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const x = d.current, N = x ? x(w) : xc(w, u.target);
      N && u.emitPoint(N);
    },
    [u]
  ), [g, v] = b.useState({ w: 0, h: 0 }), k = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const x = new ResizeObserver((N) => {
      var C;
      const S = (C = N[0]) == null ? void 0 : C.contentRect;
      S && v({ w: Math.floor(S.width), h: Math.floor(S.height) });
    });
    return x.observe(w), () => x.disconnect();
  }, []);
  const y = r ? Math.max(24, g.h || Math.round((g.w || 160) / 5)) : Math.max(i, g.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: g.w > 0 && /* @__PURE__ */ l(
        Ms,
        {
          definition: e,
          renderer: a ? Rc : Tc,
          width: g.w,
          height: y,
          ariaLabel: t,
          idPrefix: k,
          onSelect: o ?? (m ? f : void 0)
        }
      )
    }
  );
}
function Ra(e, t) {
  let n;
  return e === void 0 ? n = t : typeof e == "string" ? n = Number.parseFloat(e) / 100 : n = e > 1 ? e / 100 : e, Number.isFinite(n) || (n = t), Math.min(0.9, Math.max(0, n));
}
function _c({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = b.useMemo(() => {
    var D, A, O, F, K, P, G, ne;
    const o = t.orientation === "horizontal", s = t.stackMode === "percent", c = t.stackMode === "stacked" || s, u = e.series.filter((H) => {
      var q;
      return (q = H.meta) == null ? void 0 : q.companion;
    }), m = u.length ? e.series.filter((H) => {
      var q;
      return !((q = H.meta) != null && q.companion);
    }) : e.series, d = c ? m : e.series, f = ct(e, { series: d }), g = new Map(e.series.map((H) => [Gt(H), qe(H)])), v = Ur(e, t), k = o ? (A = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : A.hide : (F = (O = t.axes) == null ? void 0 : O.x) == null ? void 0 : F.hide, y = o ? (K = t.axes) == null ? void 0 : K.x : (P = t.axes) == null ? void 0 : P.y, w = wt(y), x = Ra(r.barCategoryGap, 0.2), N = Mc(t) ?? Kr(e.series[0]), S = (H) => s ? Qt(H) : n.value(H, N, "axis"), C = k ? !1 : {
      label: v.x,
      ticks: { format: (H) => n.category(H) }
    }, M = y != null && y.hide ? !1 : { label: v.y, ticks: { format: S } }, _ = s ? di({ offset: "normalize" }) : c ? void 0 : bs(r.barGap === void 0 ? {} : { padding: Ra(r.barGap, 0.1) }), I = {
      id: "cv-bars",
      z: "label",
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (H) => `${H.label} ${H.i}`,
      layout: _,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (H) => {
        const q = g.get(H.label) ?? "var(--chart-1)";
        return H.companion ? `color-mix(in oklab, ${q} 40%, transparent)` : q;
      }
    }, E = [
      o ? ys(f, { ...I, x: "value", y: "cat" }) : ks(f, { ...I, x: "cat", y: "value" })
    ];
    if (c && !s && u.length) {
      const H = e.categories.map((q, j) => {
        var Z, z, U;
        return {
          cat: typeof q == "number" ? q : String(q),
          value: u.reduce((Q, ie) => {
            const le = ie.data[j];
            return typeof le != "number" ? Q : (Q ?? 0) + le;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((z = (Z = u[0]) == null ? void 0 : Z.meta) == null ? void 0 : z.measure) ?? ((U = u[0]) == null ? void 0 : U.key),
          companion: !0,
          i: j
        };
      });
      if (H.some((q) => q.value !== null)) {
        const q = {
          id: "cv-bars-prev",
          key: (j) => `prev ${j.i}`,
          curve: Yt("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        E.push(
          o ? ws(H, { ...q, x: "value", y: "cat" }) : _n(H, { ...q, x: "cat", y: "value" })
        );
      }
    }
    return E.push(...Gr(r.referenceLines, e.categories, { swap: o })), r.showValueLabels && !s && E.push(...Xi(f, n, { swap: o })), Qe({
      marks: E,
      x: o ? { scale: w.scale, nice: w.nice, grid: !0, axis: M } : { scale: () => Cn(x), axis: C },
      y: o ? { scale: () => Cn(x), axis: C } : { scale: w.scale, nice: w.nice, grid: !0, axis: M },
      color: Br(c ? { ...e, series: d } : e, {
        legend: rn(t) && d.length > 1,
        legendPlacement: Mt((G = t.legend) == null ? void 0 : G.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: o ? "group-y" : "group-x",
      tooltip: ((ne = t.tooltip) == null ? void 0 : ne.show) === !1 ? void 0 : Fn({ format: n, percentShare: s }),
      keyboard: !0
    });
  }, [e, t, n, r]), i = e.series.map(Gt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(Ze, { definition: a, ariaLabel: i, className: "cv-chart--fill" });
}
function Oc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = r.chrome === "none", i = b.useMemo(
    () => a ? null : Gi(e, t),
    [e, t, a]
  ), o = b.useMemo(() => Qi(i, n), [i, n]), s = Ji(i, {
    label: o,
    ariaLabel: "Time range"
  }), c = b.useMemo(() => {
    var w, x, N, S, C, M, _;
    const m = qr(i), d = r.connectNulls ?? !1, f = Yt(r.curve ?? "monotone"), g = Ur(e, t), v = wt((w = t.axes) == null ? void 0 : w.y), k = e.categories.length <= 1, y = e.series.map((I) => {
      var D, A, O, F;
      const E = ct(e, { series: [I], skipNull: d, temporal: i });
      return _n(E, {
        id: `cv-line-${I.key}`,
        x: m,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: f,
        strokeWidth: r.strokeWidth ?? 2,
        strokeDasharray: (D = I.meta) != null && D.companion ? "5 4" : void 0,
        strokeOpacity: (A = I.meta) != null && A.companion ? 0.55 : void 0,
        stroke: qe(I),
        points: !a && !((O = I.meta) != null && O.companion) && ((((F = I.meta) == null ? void 0 : F.dots) ?? r.dots) === !0 || k)
      });
    });
    return a || (y.push(
      ...Gr(r.referenceLines, (i == null ? void 0 : i.dates) ?? e.categories),
      ...Xi(
        r.showValueLabels ? ct(e, { skipNull: !0, temporal: i }) : [],
        n,
        { temporal: i }
      )
    ), y.push(hi({ x: {}, y: !1 }))), Qe({
      marks: y,
      x: {
        scale: Yi(i),
        axis: a || (N = (x = t.axes) == null ? void 0 : x.x) != null && N.hide ? !1 : {
          label: g.x,
          ticks: { format: o }
        }
      },
      y: {
        scale: v.scale,
        nice: v.nice,
        grid: !a,
        axis: a || (C = (S = t.axes) == null ? void 0 : S.y) != null && C.hide ? !1 : {
          label: g.y,
          ticks: {
            format: (I) => {
              var E, D, A;
              return n.value(I, ((D = (E = e.series[0]) == null ? void 0 : E.meta) == null ? void 0 : D.measure) ?? ((A = e.series[0]) == null ? void 0 : A.key), "axis");
            }
          }
        }
      },
      guides: !a,
      color: Br(e, {
        legend: !a && rn(t) && e.series.length > 1,
        legendPlacement: Mt((M = t.legend) == null ? void 0 : M.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: a || ((_ = t.tooltip) == null ? void 0 : _.show) === !1 ? void 0 : Fn({ format: n, category: o }),
      margin: a ? 4 : void 0,
      keyboard: !a,
      controls: s
    });
  }, [e, t, n, r, a, i, o, s]), u = e.series.map(Gt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    Ze,
    {
      definition: c,
      ariaLabel: u,
      sparkline: a,
      className: a ? void 0 : "cv-chart--fill"
    }
  );
}
function Ac({
  data: e,
  options: t,
  format: n
}) {
  var g, v;
  const r = t.familyOptions ?? {}, a = ((v = (g = t.mapping) == null ? void 0 : g.series) == null ? void 0 : v.mode) === "pivot", i = t.stackMode ?? (a ? "stacked" : "none"), o = i === "stacked" || i === "percent", s = i === "percent", c = b.useMemo(() => Gi(e, t), [e, t]), u = b.useMemo(() => Qi(c, n), [c, n]), m = Ji(c, { label: u, ariaLabel: "Time range" }), d = b.useMemo(() => {
    var F, K, P, G, ne, H, q;
    const k = qr(c), y = r.connectNulls ?? !1, w = Yt(r.curve ?? "monotone"), x = r.fillOpacity ?? 0.4, N = r.strokeWidth ?? 2, S = Ur(e, t), C = wt((F = t.axes) == null ? void 0 : F.y), M = Kr(e.series[0]), _ = e.series.filter((j) => {
      var Z;
      return !((Z = j.meta) != null && Z.companion);
    }), I = s ? [] : e.series.filter((j) => {
      var Z;
      return (Z = j.meta) == null ? void 0 : Z.companion;
    }), E = new Map(e.series.map((j) => [j.key, qe(j)])), D = [], A = (j) => `cv-area-fill-${j.replace(/[^a-zA-Z0-9_-]/g, "-")}`, O = o ? void 0 : _.map((j) => ({
      id: A(j.key),
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
      const j = ct(e, { series: _, skipNull: y, temporal: c });
      D.push(
        or(j, {
          id: "cv-area-stack",
          x: k,
          y: "value",
          z: "label",
          color: "label",
          // "i" alone collides across series inside a single multi-series mark.
          key: (Z) => `${Z.key}:${Z.i}`,
          curve: w,
          fillOpacity: x,
          // Boundary stroke; evaluated from each z-group's first row → per-series color.
          stroke: (Z) => E.get(Z.key) ?? "currentColor",
          strokeWidth: N,
          layout: s ? di({ offset: "normalize" }) : void 0
        })
      );
    } else
      for (const j of _) {
        const Z = ct(e, { series: [j], skipNull: y, temporal: c });
        D.push(
          or(Z, {
            id: `cv-area-${j.key}`,
            x: k,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: w,
            fill: `url(#${A(j.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: qe(j),
            strokeWidth: N
          })
        );
      }
    for (const j of I) {
      const Z = ct(e, { series: [j], skipNull: y, temporal: c });
      D.push(
        _n(Z, {
          id: `cv-area-prev-${j.key}`,
          x: k,
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
    return D.push(...Gr(r.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories)), D.push(hi({ x: {}, y: !1 })), Qe({
      marks: D,
      gradients: O,
      x: {
        scale: Yi(c),
        axis: (P = (K = t.axes) == null ? void 0 : K.x) != null && P.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: C.scale,
        nice: C.nice,
        grid: !0,
        axis: (ne = (G = t.axes) == null ? void 0 : G.y) != null && ne.hide ? !1 : {
          label: S.y,
          ticks: {
            format: (j) => s ? Qt(j) : n.value(j, M, "axis")
          }
        }
      },
      color: Br(e, {
        legend: rn(t) && e.series.length > 1,
        legendPlacement: Mt((H = t.legend) == null ? void 0 : H.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((q = t.tooltip) == null ? void 0 : q.show) === !1 ? void 0 : Fn({ format: n, percentShare: s, category: u }),
      keyboard: !0,
      controls: m
    });
  }, [e, t, n, r, o, s, c, u, m]), f = e.series.map(Gt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(Ze, { definition: d, ariaLabel: f, className: "cv-chart--fill" });
}
const Ta = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Dc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.series[0], i = Kr(a), o = b.useMemo(() => {
    const f = e.categories.map((g, v) => ({
      label: n.category(g),
      value: (a == null ? void 0 : a.data[v]) ?? 0
    }));
    return Lc(f, r.maxSlices).map((g, v) => ({
      ...g,
      token: ut[v % ut.length]
    }));
  }, [e, n, a, r.maxSlices]), s = o.reduce((f, g) => f + g.value, 0), c = o.some((f) => f.value < 0), u = c || o.length === 0 || s <= 0, m = b.useMemo(() => {
    var C, M;
    if (u) return null;
    const f = (r.innerRadiusPct ?? 0) / 100, g = (r.outerRadiusPct ?? 80) / 100, v = f > 0, k = r.showLabels ?? "percent", y = gl(o, {
      value: "value",
      gapAngle: (r.padAngle ?? 0) * Math.PI / 180
    }), x = [cr(y, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: _ }) => _ * f,
      outerRadius: ({ radius: _ }) => _ * g,
      cornerRadius: r.cornerRadius
    })];
    if (k !== "none") {
      const _ = (E) => k === "name" ? E.label : k === "value" ? n.value(E.value, i, "label") : Qt(E.fraction), I = v ? (f + g) / 2 : g * 0.75;
      x.push(
        Gn(
          y.filter((E) => E.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (E) => E.angle,
            radius: I,
            text: _,
            fill: "var(--foreground)",
            fontSize: 11,
            anchor: "middle",
            baseline: "middle"
          }
        )
      );
    }
    if (v && r.centerLabel) {
      const _ = r.centerLabel.value === void 0 || r.centerLabel.value === "total" ? n.value(s, i, "label") : r.centerLabel.value;
      if (x.push(
        Gn([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => _,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), r.centerLabel.label) {
        const I = r.centerLabel.label;
        x.push(
          Gn([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => I,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const N = {
      domain: o.map((_) => _.label),
      range: o.map((_) => `var(--${_.token})`)
    };
    rn(t) && (N.legend = Ar({ placement: Mt((C = t.legend) == null ? void 0 : C.position) }));
    const S = a ? a.label || a.key : "";
    return Qe({
      marks: [
        Ti({
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
      tooltip: ((M = t.tooltip) == null ? void 0 : M.show) === !1 ? void 0 : {
        use: Dr,
        className: "cv-chart-tooltip",
        content: (_) => {
          const I = _[0];
          if (!I) return { rows: [] };
          const E = I.datum;
          return {
            title: E.label,
            rows: [
              {
                label: S,
                value: `${n.value(E.value, i, "tooltip")} (${Qt(E.fraction)})`,
                color: I.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [u, o, s, t, n, r, a, i]);
  if (c)
    return /* @__PURE__ */ l("div", { style: Ta, children: "Pie charts can't show negative values" });
  if (!m)
    return /* @__PURE__ */ l("div", { style: Ta, children: "No data" });
  const d = o.map((f) => f.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(Ze, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function Lc(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function Ec({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.annotation, i = (f) => {
    var g, v;
    return ((g = a == null ? void 0 : a.measures[f]) == null ? void 0 : g.shortTitle) ?? ((v = a == null ? void 0 : a.dimensions[f]) == null ? void 0 : v.shortTitle) ?? f;
  }, o = r.x ? i(r.x) : "x", s = r.y ? i(r.y) : "y", c = r.size ? i(r.size) : void 0, u = b.useMemo(() => {
    var F, K, P, G, ne, H, q, j, Z, z, U, Q, ie, le, fe, ae, re;
    if (!r.x || !r.y) return null;
    const f = Pc(e.raw.rows, r);
    if (f.length === 0) return null;
    const g = !!r.groupBy, v = [];
    if (g)
      for (const T of f)
        T.group !== void 0 && !v.includes(T.group) && v.push(T.group);
    const [k, y] = r.sizeRange ?? [40, 400], w = Math.sqrt(Math.max(k, 0) / Math.PI), x = Math.sqrt(Math.max(y, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    };
    g ? (N.z = "group", N.color = "group") : N.fill = `var(--${ut[0]})`, r.size ? (N.r = (T) => T.size ?? 0, N.rScale = { scale: () => Os().range([w, x]) }) : N.r = 4;
    const S = [Ns(f, N)];
    (F = r.referenceLines) == null || F.forEach((T, $) => {
      const W = `var(--${T.colorToken ?? "muted-foreground"})`, L = { stroke: W, strokeWidth: 1.25, strokeDasharray: "4 4" };
      T.axis === "y" ? (S.push(mi([T.value], { id: `cv-ref-${$}`, ...L })), T.label && S.push(
        yt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${$}`,
          y: "v",
          text: "label",
          fill: W,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (S.push(ui([T.value], { id: `cv-ref-${$}`, ...L })), T.label && S.push(
        yt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${$}`,
          x: "v",
          text: "label",
          fill: W,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let C;
    g && (C = {
      domain: v,
      range: v.map(
        (T, $) => `var(--${ut[$ % ut.length]})`
      )
    }, rn(t) && (C.legend = Ar({ placement: Mt((K = t.legend) == null ? void 0 : K.position) })));
    const M = (G = (P = t.axes) == null ? void 0 : P.x) != null && G.labelHide ? void 0 : ((H = (ne = t.axes) == null ? void 0 : ne.x) == null ? void 0 : H.label) ?? o, _ = (j = (q = t.axes) == null ? void 0 : q.y) != null && j.labelHide ? void 0 : ((z = (Z = t.axes) == null ? void 0 : Z.y) == null ? void 0 : z.label) ?? s, I = wt((U = t.axes) == null ? void 0 : U.x), E = wt((Q = t.axes) == null ? void 0 : Q.y), D = r.x, A = r.y, O = r.size;
    return Qe({
      marks: S,
      x: {
        scale: I.scale,
        nice: I.nice,
        grid: !0,
        axis: (le = (ie = t.axes) == null ? void 0 : ie.x) != null && le.hide ? !1 : {
          label: M,
          ticks: { format: (T) => n.value(T, D, "axis") }
        }
      },
      y: {
        scale: E.scale,
        nice: E.nice,
        grid: !0,
        axis: (ae = (fe = t.axes) == null ? void 0 : fe.y) != null && ae.hide ? !1 : {
          label: _,
          ticks: { format: (T) => n.value(T, A, "axis") }
        }
      },
      color: C,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((re = t.tooltip) == null ? void 0 : re.show) === !1 ? void 0 : {
        use: Dr,
        className: "cv-chart-tooltip",
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (T) => {
          const W = T[0];
          if (!W) return { rows: [] };
          const L = W.datum, V = [
            { label: o, value: n.value(L.x, D, "tooltip") },
            { label: s, value: n.value(L.y, A, "tooltip") }
          ];
          return O && V.push({
            label: c ?? O,
            value: n.value(L.size, O, "tooltip")
          }), { title: L.group, color: W.color, rows: V };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, r, o, s, c]), m = r.groupBy, d = (f) => {
    var v;
    if (!f || !m) return null;
    const g = (v = f.datum) == null ? void 0 : v.group;
    return g === void 0 ? null : { member: m, value: g, label: g };
  };
  return u ? /* @__PURE__ */ l(
    Ze,
    {
      definition: u,
      ariaLabel: `${o} vs ${s} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: d
    }
  ) : /* @__PURE__ */ l("div", { style: Ic, children: "No data" });
}
const Ic = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Pc(e, t) {
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
function Fc(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function $c(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function zc(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Zi(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? zc(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => Zi(e, t, n), r;
}
function Vc({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = Fc(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const f = fr(s, a), g = fr(s, i), v = /* @__PURE__ */ new Map();
    return s.forEach((k, y) => {
      const w = $c(k[o]), x = k[f], N = k[g];
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
  }, [s, a, i, o]), m = b.useMemo(() => {
    var x, N, S, C, M, _, I, E, D, A, O, F, K;
    let f = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY;
    for (const P of u)
      P.value < f && (f = P.value), P.value > g && (g = P.value);
    const v = (P) => {
      if (!P) return;
      const G = (c == null ? void 0 : c.dimensions[P]) ?? (c == null ? void 0 : c.timeDimensions[P]) ?? (c == null ? void 0 : c.measures[P]);
      return (G == null ? void 0 : G.shortTitle) ?? (G == null ? void 0 : G.title) ?? P;
    }, k = (N = (x = t.axes) == null ? void 0 : x.x) != null && N.labelHide ? void 0 : ((C = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : C.label) ?? v(a), y = (_ = (M = t.axes) == null ? void 0 : M.y) != null && _.labelHide ? void 0 : ((E = (I = t.axes) == null ? void 0 : I.y) == null ? void 0 : E.label) ?? v(i), w = [
      Cs(u, {
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
        text: (P) => n.value(P.value, P.member, "label"),
        fill: "currentColor",
        fontSize: 10
      })
    ), Qe({
      marks: w,
      x: {
        scale: () => Cn(0.05),
        axis: (A = (D = t.axes) == null ? void 0 : D.x) != null && A.hide ? !1 : {
          label: k,
          ticks: { format: (P) => n.category(P) }
        }
      },
      y: {
        scale: () => Cn(0.05),
        axis: (F = (O = t.axes) == null ? void 0 : O.y) != null && F.hide ? !1 : { label: y }
      },
      color: {
        scale: Zi(f, g, r.colorToken ?? "chart-1")
      },
      tooltip: ((K = t.tooltip) == null ? void 0 : K.show) === !1 ? void 0 : Fn({ format: n })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const d = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(Ze, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function jc(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Wc(e) {
  return `cv-kpi-trend--${e}`;
}
function Hc(e) {
  var c, u, m, d;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (f) => r.value(f, a.measure, "kpi"), o = eo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((d = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : d.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Xc, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Bc, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Bc({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var f;
  const a = n.goodDirection ?? ((f = n.comparison) == null ? void 0 : f.goodDirection) ?? "up", i = t === null ? null : eu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && qc(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((g) => g !== null), m = i ? i.diff : c ? Yc(c) : 0, d = Wc(jc(m, a));
  return /* @__PURE__ */ p("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ p("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Qc, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Uc, {}) : /* @__PURE__ */ l(Kc, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Gc, { data: e, series: c, colorClass: d }) })
  ] });
}
function qc(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Uc() {
  return /* @__PURE__ */ p(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(vi, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Kc() {
  return /* @__PURE__ */ p("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(gi, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Gc({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = ct(e, { series: [t], skipNull: !0 }), i = wt(void 0);
    return Qe({
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
        _n(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: Yt("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Ui, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    Ze,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Yc(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Qc({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? gi : a ? On : An, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ p(
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
const Lt = -(2 * Math.PI) / 3, pr = 2 * Math.PI / 3, Jc = pr - Lt;
function Xc({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, d;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((d = r.gauge) == null ? void 0 : d.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : Zc(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const f = (s - a) / (o - a), g = Lt + f * Jc, v = ({ radius: w }) => w * 0.7, k = cr([{ startAngle: Lt, endAngle: pr }], {
      id: "cv-gauge-track",
      innerRadius: v,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), y = f > 0 ? [
      k,
      cr([{ startAngle: Lt, endAngle: g }], {
        id: "cv-gauge-value",
        innerRadius: v,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [k];
    return Qe({
      marks: [
        Ti({
          id: "cv-gauge",
          startAngle: Lt,
          endAngle: pr,
          marks: y
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ p("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      Ze,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ p("div", { className: "cv-kpi-gauge-center", children: [
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
function Zc(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function eo(e, t) {
  for (const n of e) {
    const r = to(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function eu(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = eo(e, r.value));
  else {
    const s = e[1];
    a = s ? to(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function to(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const no = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: R("cv-table", e), ...t }) })
);
no.displayName = "Table";
const ro = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: R("cv-table-header", e), ...t }));
ro.displayName = "TableHeader";
const ao = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: R("cv-table-body", e), ...t }));
ao.displayName = "TableBody";
const un = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: R("cv-table-row", e),
      ...t
    }
  )
);
un.displayName = "TableRow";
const gr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: R("cv-table-head", e),
    ...t
  }
));
gr.displayName = "TableHead";
const mn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: R("cv-table-cell", e),
    ...t
  }
));
mn.displayName = "TableCell";
const tu = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: R("cv-table-caption", e), ...t }));
tu.displayName = "TableCaption";
const io = Fr(
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
), B = b.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: R(io({ variant: t, size: n }), e),
      ...a
    }
  )
);
B.displayName = "Button";
function nu({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => ru(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, m] = b.useState(0), d = r.sortable !== !1, f = r.pageSize ?? 25, g = b.useMemo(() => {
    var C;
    if (!s) return a;
    const N = s.dir === "asc" ? 1 : -1, S = ((C = o.find((M) => M.member === s.member)) == null ? void 0 : C.key) ?? s.member;
    return [...a].sort((M, _) => lu(M[S], _[S]) * N);
  }, [a, s, o]), v = Math.max(1, Math.ceil(g.length / f)), k = Math.min(u, v - 1), y = g.slice(k * f, k * f + f), w = (N) => {
    d && (c(
      (S) => (S == null ? void 0 : S.member) === N ? { member: N, dir: S.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), m(0));
  }, x = r.rowHeight === "compact";
  return /* @__PURE__ */ p("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: R("cv-table-scroll", r.stickyHeader && "cv-table-scroll--sticky"), children: /* @__PURE__ */ p(no, { children: [
      /* @__PURE__ */ l(ro, { className: R(r.stickyHeader && "cv-table-header--sticky"), children: /* @__PURE__ */ p(un, { children: [
        r.showRowNumbers && /* @__PURE__ */ l(gr, { className: "cv-table-rownum", children: "#" }),
        o.map((N) => /* @__PURE__ */ l(
          gr,
          {
            className: _a(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: d ? /* @__PURE__ */ p(
              B,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: () => w(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ l(su, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ p(ao, { children: [
        y.map((N, S) => /* @__PURE__ */ p(un, { children: [
          r.showRowNumbers && /* @__PURE__ */ l(
            mn,
            {
              className: R(
                "cv-table-cell--right cv-table-cell--muted",
                x && "cv-table-cell--compact"
              ),
              children: k * f + S + 1
            }
          ),
          o.map((C) => {
            const M = cu(C.member, N[C.key], r.conditionalFormat);
            return /* @__PURE__ */ l(
              mn,
              {
                className: R(_a(C.align), x && "cv-table-cell--compact"),
                style: M ? { color: M } : void 0,
                children: C.render(N[C.key])
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
    g.length > f && /* @__PURE__ */ p("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ p("span", { children: [
        k * f + 1,
        "–",
        Math.min((k + 1) * f, g.length),
        " of",
        " ",
        g.length
      ] }),
      /* @__PURE__ */ p("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          B,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.max(0, N - 1)),
            disabled: k === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          B,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((N) => Math.min(v - 1, N + 1)),
            disabled: k >= v - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function ru(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : iu(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = fr(e, c), m = t ? ou(t, c) : void 0, d = t ? c in t.measures : !1, f = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, g = s.align ?? (d ? "right" : "left");
    return {
      member: c,
      key: u,
      label: f,
      align: g,
      width: s.width,
      render: (v) => au(v, d, c, r)
    };
  });
}
function au(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function iu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function ou(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function _a(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function su({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(On, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(An, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Ps, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function lu(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function cu(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && uu(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function uu(e, t, n) {
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
const tt = "cv-sidebar--default", mu = "cv-sidebar--wide", oo = "a date or category", Qn = [
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
    hint: oo,
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
], du = [
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
    hint: oo,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], hu = [
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
], fu = [
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
], pu = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], gu = [
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
], vu = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], He = (e) => vu.indexOf(e), ze = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: bi,
    order: He("bar"),
    component: _c,
    optionsSchema: je.bar,
    defaults: We.bar,
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
    sidebarWidthClass: tt
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Hs,
    order: He("line"),
    component: Oc,
    optionsSchema: je.line,
    defaults: We.line,
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
    sidebarWidthClass: tt
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Fs,
    order: He("area"),
    component: Ac,
    optionsSchema: je.area,
    defaults: We.area,
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
    sidebarWidthClass: tt
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Ws,
    order: He("pie"),
    component: Dc,
    optionsSchema: je.pie,
    defaults: We.pie,
    wells: hu,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: tt
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: js,
    order: He("scatter"),
    component: Ec,
    optionsSchema: je.scatter,
    defaults: We.scatter,
    wells: fu,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: tt
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Vs,
    order: He("kpi"),
    component: Hc,
    optionsSchema: je.kpi,
    defaults: We.kpi,
    wells: pu,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: mu
  },
  table: {
    family: "table",
    label: "Table",
    icon: zs,
    order: He("table"),
    component: nu,
    optionsSchema: je.table,
    defaults: We.table,
    wells: gu,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: tt
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: $s,
    order: He("heatmap"),
    component: Vc,
    optionsSchema: je.heatmap,
    defaults: We.heatmap,
    wells: du,
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
    sidebarWidthClass: tt
  }
}, bu = ze.bar, yu = ze.line, ku = ze.area, wu = ze.pie, Nu = ze.scatter, Cu = ze.heatmap, Su = ze.kpi, xu = ze.table, Yr = [
  bu,
  yu,
  ku,
  wu,
  Nu,
  Cu,
  Su,
  xu
], Mu = h.any();
function Qr(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? kc;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Mu;
    },
    resolveOptions: (o) => wc(o, i.defaults(o.family))
  };
  return i;
}
const $n = Qr(Yr);
function Ru(e, t = $n) {
  return t.resolveOptions(e);
}
function Tu(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Jr(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function _u(e) {
  const t = Math.floor(e ?? cn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Ou(e, t) {
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
function Au(e) {
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
function Du(e, t) {
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
function Lu(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function Eu(e, t, n) {
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
function Iu(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Du(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Lu(o.meta)
      }))
    };
  }
  const a = _u(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Ou(i.data, a) : Au(i.data)
    }))
  };
}
const cb = Object.fromEntries(
  Object.entries(ze).map(([e, t]) => [e, t.component])
);
function so({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = $n
}) {
  const u = ee(() => Ru(t, c), [t, c]), m = c.get(u.family), d = (m == null ? void 0 : m.queryless) ?? !1, f = Jr(m) ? u.transform : void 0, g = ee(() => Iu(e, f), [e, f]);
  if (!d && (a != null && a.loading))
    return /* @__PURE__ */ l(Ql, { className: "cv-chart-skeleton" });
  if (!d && (a != null && a.error))
    return /* @__PURE__ */ p(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Lr, {}),
      /* @__PURE__ */ l(En, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(In, { children: a.error.message })
    ] });
  if (!d && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : Tu(g), k = Eu(
    r ?? Wi(e.raw.annotation, u, jr),
    f
  ), y = (i == null ? void 0 : i[u.family]) ?? c.require(u.family).component;
  return /* @__PURE__ */ l(
    y,
    {
      data: g,
      options: u,
      config: v,
      format: k,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const ut = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Jn = 8;
function Oa(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function lo(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ut, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function Aa(e, t) {
  const n = lo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Pu(e) {
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
  for (const n of Object.keys(e)) t[n] = Pu(e[n]);
  return t;
}
function Fu(e) {
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
function $u(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function zu(e, t) {
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
function Vu(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Vn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function ju(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function co(e, t, n, r, a = $n) {
  const i = Fu(e.annotation()), o = zu(i, r), s = Vu(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const d = n.measures ?? [];
    if (a.require(t.family).measureOnly && d.length > 0) {
      const f = s[0] ?? {}, g = [
        {
          key: "value",
          label: "Value",
          data: d.map((k) => Vn(f[k])),
          meta: { ...zn(vt(i, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Aa(g, t.colors), {
        categories: d.map(
          (k) => {
            var y, w;
            return ((y = vt(i, k)) == null ? void 0 : y.shortTitle) ?? ((w = vt(i, k)) == null ? void 0 : w.title) ?? k;
          }
        ),
        series: g,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || Oa(g)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Hu(e, c.series, t, i) : Bu(e, c.category.member, c.series, t, i), m = Wu(e, c);
  return ju(u, o), Aa(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Oa(u)
  };
}
function Wu(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Hu(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = vt(r, s), u = i == null ? void 0 : i[s], m = o.map((d) => Vn(d[s]));
    return {
      key: s,
      label: $u(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...zn(c, u, n.format), measure: s }
    };
  });
}
function Bu(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, d = { x: [t], y: [s, "measures"] }, g = e.seriesNames(d).filter((w) => {
    const x = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return x === void 0 || u.has(x);
  }), v = e.chartPivot(d), k = vt(a, i), y = g.map((w) => {
    var D, A;
    const x = (D = w.yValues) == null ? void 0 : D[0], N = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, S = vt(a, N), C = (S == null ? void 0 : S.shortTitle) ?? (S == null ? void 0 : S.title) ?? N, M = x ?? w.shortTitle ?? w.title ?? w.key, _ = m ? `${C} · ${M}` : M, I = v.map((O) => Vn(O[w.key])), E = (A = n.meta) == null ? void 0 : A[N];
    return {
      key: w.key,
      label: _,
      data: I,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...zn(S ?? k, E, r.format),
        measure: N
      }
    };
  });
  return qu(y, k, r.format);
}
function qu(e, t, n) {
  var m, d, f;
  if (e.length <= Jn) return e;
  const r = (g) => g.data.reduce((v, k) => v + (k ?? 0), 0), a = [...e].sort((g, v) => r(v) - r(g)), i = a.slice(0, Jn - 1), o = a.slice(Jn - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (g, v) => {
    let k = 0, y = !1;
    for (const w of o) {
      const x = w.data[v];
      x !== null && (k += x, y = !0);
    }
    return y ? k : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...zn(t, void 0, n), ...(f = (d = i[0]) == null ? void 0 : d.meta) != null && f.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Vn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const te = (e) => de(e, "yyyy-MM-dd");
function Uu(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [te(t), te(t)];
  if (n === "yesterday") {
    const o = ye(t, 1);
    return [te(o), te(o)];
  }
  if (n === "this week") return [te(vn(t)), te(bn(t))];
  if (n === "this month") return [te(rt(t)), te(Vt(t))];
  if (n === "this quarter") return [te(at(t)), te(jt(t))];
  if (n === "this year") return [te(it(t)), te(Wt(t))];
  if (n === "last week") {
    const o = sr(t, 1);
    return [te(vn(o)), te(bn(o))];
  }
  if (n === "last month") {
    const o = ot(t, 1);
    return [te(rt(o)), te(Vt(o))];
  }
  if (n === "last quarter") {
    const o = st(t, 1);
    return [te(at(o)), te(jt(o))];
  }
  if (n === "last year") {
    const o = lt(t, 1);
    return [te(it(o)), te(Wt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [te(ye(t, a - 1)), te(t)] : i.startsWith("week") ? [te(ye(t, a * 7 - 1)), te(t)] : i.startsWith("month") ? [te(rt(ot(t, a))), te(Vt(ot(t, 1)))] : i.startsWith("quarter") ? [te(at(st(t, a))), te(jt(st(t, 1)))] : [te(it(lt(t, a))), te(Wt(lt(t, 1)))];
}
function Nt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Ku = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Gu(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Jt(e, t, n) {
  var r;
  if (xe(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Yu(e, t, n) {
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
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? Uu(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Qu(e, t, n) {
  if ("and" in e) {
    const r = vr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = vr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Yu(e, t, n);
}
function vr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Qu(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Ju(e, t, n) {
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
function uo(e, t, n) {
  const r = Ku(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Ju(i, r, t))), e.filters !== void 0) {
    const i = vr(e.filters, r, t);
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
function mo() {
  let e, t;
  return (n, r, a) => {
    const i = uo(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Xu(e, t) {
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
class Zu extends Error {
}
const em = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Zu(`"${e}" cannot be parsed into a number`);
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
function Da(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class tm extends Error {
}
class La extends Error {
}
class nm extends Error {
}
class Xn extends Error {
}
class rm extends Error {
}
class am {
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
      throw new La(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Da(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new nm(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Xn(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Xn(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, d = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof d == "number")
        o = this.cls.mul(o, d);
      else if (Da(d))
        o = this.cls.mul(o, this.convertFraction(d));
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
      throw new La(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const d = this.describe(m);
      if (o.indexOf(m) === -1 && d.system === c) {
        const g = this.to(m);
        if (i ? this.cls.gt(g, s) : this.cls.lt(g, s))
          continue;
        (u === null || (i ? this.cls.lte(g, s) && this.cls.gt(g, u.val) : this.cls.gte(g, s) && this.cls.lt(g, u.val))) && (u = {
          val: g,
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
        throw new rm(`Meausure "${t}" not found.`);
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
    throw new tm(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function im(e) {
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
function om(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = im(e);
  return (r) => new am({
    measures: e,
    unitCache: n,
    cls: em
  }, r);
}
const sm = {
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
}, lm = {
  systems: {
    metric: sm
  }
}, cm = {
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
}, um = {
  systems: {
    SI: cm
  }
}, mm = {
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
}, dm = {
  systems: {
    SI: mm
  }
}, hm = {
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
}, fm = {
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
}, pm = {
  systems: {
    metric: hm,
    imperial: fm
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
}, gm = {
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
}, vm = {
  systems: {
    SI: gm
  }
}, bm = {
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
}, ym = {
  systems: {
    SI: bm
  }
}, km = {
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
}, wm = {
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
}, Nm = {
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
}, Cm = {
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
}, Sm = {
  systems: {
    bit: km,
    byte: wm,
    IECBit: Nm,
    IECByte: Cm
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
}, xm = {
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
}, Mm = {
  systems: {
    metric: xm
  }
}, Rm = {
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
}, Tm = {
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
}, _m = {
  systems: {
    SI: Rm,
    nutrition: Tm
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
}, Om = {
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
}, Am = {
  systems: {
    SI: Om
  }
}, Dm = {
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
}, Lm = {
  systems: {
    SI: Dm
  }
}, Em = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Im = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Pm = {
  systems: {
    metric: Em,
    imperial: Im
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
}, Fm = {
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
}, $m = {
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
}, zm = {
  systems: {
    metric: Fm,
    imperial: $m
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
}, Vm = {
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
}, jm = {
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
}, Hm = {
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
}, Bm = {
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
}, qm = {
  systems: {
    metric: Hm,
    imperial: Bm
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
}, Um = {
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
}, Km = {
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
}, Gm = {
  systems: {
    metric: Um,
    imperial: Km
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
}, Ym = {
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
}, Qm = {
  systems: {
    SI: Ym
  }
}, Jm = {
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
}, Xm = {
  systems: {
    unit: Jm
  }
}, Zm = {
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
}, ed = {
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
}, td = {
  systems: {
    metric: Zm,
    imperial: ed
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
}, nd = {
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
}, rd = {
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
}, ad = {
  systems: {
    metric: nd,
    imperial: rd
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
}, id = {
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
}, od = {
  systems: {
    SI: id
  }
}, sd = {
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
}, ld = {
  systems: {
    SI: sd
  }
}, cd = {
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
}, ud = {
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
}, md = {
  systems: {
    metric: cd,
    imperial: ud
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
}, dd = {
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
}, hd = {
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
}, fd = {
  systems: {
    metric: dd,
    imperial: hd
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
}, pd = {
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
}, gd = {
  systems: {
    SI: pd
  }
}, vd = {
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
}, bd = {
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
}, yd = {
  systems: {
    metric: vd,
    imperial: bd
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
}, kd = {
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
}, wd = {
  systems: {
    SI: kd
  }
}, Nd = {
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
}, Cd = {
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
}, Sd = {
  systems: {
    metric: Nd,
    imperial: Cd
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
}, xd = {
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
}, Md = {
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
}, Rd = {
  systems: {
    metric: xd,
    imperial: Md
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
}, Td = {
  acceleration: lm,
  angle: um,
  apparentPower: dm,
  area: pm,
  charge: vm,
  current: ym,
  digital: Sm,
  each: Mm,
  energy: _m,
  force: Am,
  frequency: Lm,
  illuminance: Pm,
  length: zm,
  mass: Wm,
  massFlowRate: qm,
  pace: Gm,
  partsPer: Qm,
  pieces: Xm,
  power: td,
  pressure: ad,
  reactiveEnergy: od,
  reactivePower: ld,
  speed: md,
  torque: yd,
  temperature: fd,
  time: gd,
  voltage: wd,
  volume: Sd,
  volumeFlowRate: Rd
}, _d = om(Td), Od = {
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
function Ad(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => _d(t).from(e.from).to(e.to)
  };
}
const br = {
  ...Object.fromEntries(
    Object.entries(Od).map(([e, t]) => [e, Ad(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function jn(e) {
  return e ? { ...br, ...e } : br;
}
function Dd(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Ld(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Ed(e) {
  return e != null && e.quantity ? Ld(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Id = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function ho(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ea(e, t) {
  const n = e * (Id[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${ho(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Zn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return ho((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Pd(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ia(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function fo(e = br) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return jr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Ea(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Ia(Zn(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Ea(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Ia(Zn(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? Pd(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Zn(n, t)}${u}`;
  };
}
const Wn = li(null);
Wn.displayName = "CubeVizContext";
function Ie() {
  const e = Or(Wn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function et() {
  return Ie().families;
}
function Fd(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function ub({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((y) => y.family).join("|"), u = ee(
    () => Qr(Yr, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ee(
    () => Fd(e) ? Gl(e) : e,
    [e]
  ), d = ee(
    () => {
      var y;
      return {
        chartRamp: (y = t == null ? void 0 : t.chartRamp) != null && y.length ? t.chartRamp : ut,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), g = ee(() => a ?? {}, [a]), v = ee(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), k = ee(
    () => ({
      cubeClient: m,
      registry: g,
      families: u,
      locale: f,
      theme: d,
      maps: v
    }),
    [m, g, u, f, d, v]
  );
  return /* @__PURE__ */ l(Wn.Provider, { value: k, children: /* @__PURE__ */ l(
    "div",
    {
      className: R(
        "cv-root",
        d.mode === "dark" && "dark",
        d.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(
        Hr,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      )
    }
  ) });
}
function Xr({
  families: e,
  children: t
}) {
  const n = Ie(), r = (e ?? []).map((i) => i.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: Qr(Yr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(se, { children: t }) : /* @__PURE__ */ l(Wn.Provider, { value: a, children: t });
}
function $d(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const zd = 5e3;
function po(e, t) {
  const { cubeClient: n } = Ie(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: zd } : e,
    [e]
  ), i = ee(() => JSON.stringify(a), [a]), [o, s] = bt({ isLoading: !r }), [c, u] = bt(0), m = Ue(() => u((d) => d + 1), []);
  return tn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let d = !0;
    const f = new AbortController();
    return s((g) => ({ resultSet: g.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: f.signal }).then((g) => {
      d && s({
        resultSet: g,
        isLoading: !1
      });
    }).catch((g) => {
      d && s({
        isLoading: !1,
        error: g instanceof Error ? g : new Error(String(g))
      });
    }), () => {
      d = !1, f.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Hn = li(null);
Hn.displayName = "DashboardContext";
function Zr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = nt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Xu(r, t), key: r });
  const i = a.current.store, o = Vd(i, r);
  return ps(Hn.Provider, { value: o }, n);
}
function Vd(e, t) {
  const n = Ue(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ue(
    (i) => uo(i, e.getAll(), t),
    [e, t]
  ), a = Ue(
    (i) => Gu(i, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function jd(e) {
  const t = ci(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function go() {
  const e = Or(Hn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return jd(e);
}
function an() {
  return Or(Hn);
}
const Wd = () => () => {
};
function er(e, t, n) {
  var N;
  const r = an(), { locale: a } = Ie(), i = et(), o = nt(null);
  o.current === null && (o.current = mo());
  const s = o.current, c = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !c, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), d = ci(
    u && r ? r.store.subscribe : Wd,
    m,
    m
  ), { resultSet: f, isLoading: g, error: v, refetch: k } = po(d, { skip: n == null ? void 0 : n.skip }), y = ((N = t.format) == null ? void 0 : N.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = ee(() => jn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (f)
      return co(f, t, d, { unitSystem: y, conversions: w }, i);
  }, [f, t, d, y, w, i]), isLoading: g, error: v, refetch: k, resolvedQuery: d };
}
function Ve() {
  const { cubeClient: e } = Ie(), [t, n] = bt({ isLoading: !0 });
  return tn(() => {
    let r = !0;
    return n({ isLoading: !0 }), Yl(e).then((a) => {
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
function mb() {
  const { locale: e } = Ie(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? fo(jn(n)),
    [t, n]
  );
}
function vo() {
  const [e, t] = bt(0), n = nt(null), r = nt(null), a = nt(null), i = nt(0), o = Ue((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = Ue(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = Ue(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const d = new ResizeObserver((f) => {
        var g, v;
        for (const k of f) {
          const y = ((v = (g = k.contentBoxSize) == null ? void 0 : g[0]) == null ? void 0 : v.inlineSize) ?? k.contentRect.width;
          o(y);
        }
      });
      d.observe(u), r.current = d;
    },
    [o, s]
  );
  return tn(() => s, [s]), [c, e];
}
const Hd = "day";
function Bd(e, t) {
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
        granularity: r.granularity ?? Hd,
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
const X = (e) => de(e, "yyyy-MM-dd");
function qd(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = gn(e[0]), i = gn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = Es(i, a) + 1;
    return [X(ye(a, o)), X(ye(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = ye(t, 1);
    return [X(a), X(a)];
  }
  if (n === "yesterday") {
    const a = ye(t, 2);
    return [X(a), X(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [X(ye(t, 2 * a - 1)), X(ye(t, a))];
    if (i.startsWith("week")) return [X(ye(t, 14 * a - 1)), X(ye(t, 7 * a))];
    if (i.startsWith("month"))
      return [X(rt(ot(t, 2 * a))), X(ye(rt(ot(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [X(at(st(t, 2 * a))), X(ye(at(st(t, a)), 1))];
    if (i.startsWith("year"))
      return [X(it(lt(t, 2 * a))), X(ye(it(lt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = sr(t, 1);
    return [X(vn(a)), X(bn(a))];
  }
  if (n === "this month") {
    const a = ot(t, 1);
    return [X(rt(a)), X(Vt(a))];
  }
  if (n === "this quarter") {
    const a = st(t, 1);
    return [X(at(a)), X(jt(a))];
  }
  if (n === "this year") {
    const a = lt(t, 1);
    return [X(it(a)), X(Wt(a))];
  }
  if (n === "last week") {
    const a = sr(t, 2);
    return [X(vn(a)), X(bn(a))];
  }
  if (n === "last month") {
    const a = ot(t, 2);
    return [X(rt(a)), X(Vt(a))];
  }
  if (n === "last quarter") {
    const a = st(t, 2);
    return [X(at(a)), X(jt(a))];
  }
  if (n === "last year") {
    const a = lt(t, 2);
    return [X(it(a)), X(Wt(a))];
  }
}
function Ud(e, t, n = $n) {
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
  const s = qd(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Kd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function ea({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var K;
  const { registry: c, locale: u } = Ie(), m = et(), d = ((K = m.get(t.family)) == null ? void 0 : K.queryless) ?? !1, f = ee(() => {
    var P;
    return (P = t.format) != null && P.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), g = ee(() => {
    const P = e ?? {};
    return P.timezone || !(u != null && u.timezone) ? P : { ...P, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: v, isLoading: k, error: y, refetch: w, resolvedQuery: x } = er(
    g,
    f,
    { skip: d }
  ), N = ee(() => Bd(g, f), [g, f]), S = er(
    (N == null ? void 0 : N.query) ?? g,
    (N == null ? void 0 : N.chart) ?? f,
    { skip: !N }
  ), C = ee(
    () => Ud(x, f, m),
    [x, f, m]
  ), M = er(
    (C == null ? void 0 : C.query) ?? g,
    f,
    { skip: !C, skipResolve: !0 }
  ), _ = ee(
    () => ({ [f.family]: $d(c, f.family, m) }),
    [c, f.family, m]
  ), I = ee(() => {
    let P = v ?? Kd;
    if (N && S.data) {
      P = { ...P, series: S.data.series, categories: S.data.categories };
      const G = P.raw.rows.length > 0, ne = P.series.some((H) => H.data.some((q) => q !== null));
      P = { ...P, empty: !G && !ne };
    }
    if (C && M.data) {
      if (C.mode === "kpiRow") {
        const G = M.data.raw.rows[0];
        if (G) {
          const ne = P.raw.rows[0];
          P = {
            ...P,
            raw: { ...P.raw, rows: ne ? [ne, G] : [G] }
          };
        }
      } else if (!M.data.empty) {
        const G = new Map(M.data.series.map((ne) => [ne.key, ne]));
        if (!P.empty && P.series.length > 0) {
          const ne = P.categories.length, H = P.series.map((q) => {
            const j = G.get(q.key), Z = Array.from({ length: ne }, (z, U) => (j == null ? void 0 : j.data[U]) ?? null);
            return {
              ...q,
              key: `${q.key}__prev`,
              label: `${q.label} (prev)`,
              colorToken: q.colorToken,
              data: Z,
              meta: { ...q.meta, companion: !0 }
            };
          });
          P = { ...P, series: [...P.series, ...H] };
        } else {
          const ne = M.data.series.map((H) => ({
            ...H,
            key: `${H.key}__prev`,
            label: `${H.label} (prev)`,
            data: [...H.data],
            meta: { ...H.meta, companion: !0 }
          }));
          P = {
            ...P,
            categories: M.data.categories,
            series: ne,
            empty: !1
          };
        }
      }
    }
    return P;
  }, [v, N, S.data, C, M.data]);
  tn(() => {
    n == null || n({ rows: I.raw.rows, refetch: w, isLoading: k });
  }, [n, I.raw.rows, w, k]);
  const E = {}, D = ee(
    () => u.formatValue ?? fo(jn(u.units)),
    [u.formatValue, u.units]
  ), A = ee(
    () => Wi(I.raw.annotation, f, D, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [I.raw.annotation, f, D, u.locale, u.unitSystem]
  ), O = f.mapping, F = ee(
    () => ({
      categoryMember: O == null ? void 0 : O.category.member,
      pivotMember: (O == null ? void 0 : O.series.mode) === "pivot" ? O.series.pivot : void 0,
      formatCategory: A.category
    }),
    [O, A]
  );
  return /* @__PURE__ */ l(
    Hr,
    {
      widgetId: i,
      target: F,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        so,
        {
          data: I,
          options: f,
          config: E,
          format: A,
          state: d ? { loading: !1 } : { loading: k && !v, error: y },
          components: _,
          registry: m,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function Gd({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    ea,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const bo = "cube-viz-prose";
function Yd(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Qd({ doc: e }) {
  const t = Yd(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = Oi(
    {
      extensions: [Di],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: R(bo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(Ai, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
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
], Jd = Object.fromEntries(
  dn.map((e) => [e.value, e.label])
);
function Pa(e) {
  return Jd[e.trim().toLowerCase()] ?? e;
}
const Xd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Zd({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = pl(), a = R(io({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ p("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: R(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Er, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: de(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: R(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(nn, {})
      }
    )
  ] });
}
function eh({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
function yo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    fl,
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
        MonthCaption: Zd,
        DayButton: eh,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? Er : nn, { className: R("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(yn.Root, { "data-slot": "popover", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ l(yn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Le({
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
      className: R("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Root, { "data-slot": "select", ...e });
}
function yr({
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
  return /* @__PURE__ */ p(
    Ne.Trigger,
    {
      "data-slot": "select-trigger",
      className: R("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Ne.Icon, { asChild: !0, children: /* @__PURE__ */ l(Je, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function th({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Bs, {})
    }
  );
}
function nh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: R("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Je, {})
    }
  );
}
function Oe({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(Ne.Portal, { children: /* @__PURE__ */ p(
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
        /* @__PURE__ */ l(th, {}),
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
        /* @__PURE__ */ l(nh, {})
      ]
    }
  ) });
}
function kr({
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
  return /* @__PURE__ */ p(
    Ne.Item,
    {
      "data-slot": "select-item",
      className: R("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Ne.ItemIndicator, { children: /* @__PURE__ */ l(Xe, {}) }) }),
        /* @__PURE__ */ l(Ne.ItemText, { children: t })
      ]
    }
  );
}
const Ct = "cv-field", rh = "cv-field-label", Et = "yyyy-MM-dd";
function ah(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Fa(e) {
  if (!e) return;
  const t = pi(e, Et, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function ih({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Xd, [i, o] = bt(!1), s = typeof e == "string", [c, u] = ah(e), m = Fa(c), d = Fa(u), f = m ? { from: m, to: d } : void 0;
  let g;
  s ? g = Pa(e) : m && d ? g = `${de(m, "MMM d, yyyy")} – ${de(d, "MMM d, yyyy")}` : m ? g = de(m, "MMM d, yyyy") : g = "Pick a date range";
  const v = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ p(Ae, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(
      B,
      {
        variant: "outline",
        className: R(
          "cv-daterange-trigger",
          g === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(yi, {}),
          g
        ]
      }
    ) }),
    /* @__PURE__ */ p(Le, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((k) => /* @__PURE__ */ l(
        B,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(k), o(!1);
          },
          children: Pa(k)
        },
        k
      )) }),
      /* @__PURE__ */ l(
        yo,
        {
          mode: "range",
          selected: f,
          defaultMonth: m,
          disabled: v,
          onSelect: (k) => {
            k != null && k.from && k.to ? t([de(k.from, Et), de(k.to, Et)]) : k != null && k.from ? t([de(k.from, Et), de(k.from, Et)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const oh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function sh(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function lh(e) {
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
function ch({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = go(), i = r.rangeVariable ? lh(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? sh(i) : oh), s = typeof e == "string" ? e : "", c = o.join(",");
  return tn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ p(
    Re,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(_e, { className: Ct, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Oe, { children: o.map((u) => /* @__PURE__ */ l(ge, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function uh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: R(Ct, "cv-field--multi"),
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
  return /* @__PURE__ */ p(
    Re,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(_e, { className: Ct, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Oe, { children: r.options.map((i) => /* @__PURE__ */ l(ge, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function mh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = Ve(), o = ee(() => {
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
  return /* @__PURE__ */ p(
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
function dh({ value: e, onChange: t, control: n }) {
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
function hh({ value: e, onChange: t, control: n }) {
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
function fh({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ p("label", { className: "cv-toggle", children: [
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
const ph = {
  dateRange: ih,
  granularity: ch,
  select: uh,
  memberSelect: mh,
  text: dh,
  number: hh,
  toggle: fh
};
function gh({ control: e, title: t }) {
  var g;
  const { registry: n } = Ie(), { decls: r, resolveValue: a, setVar: i } = go(), o = ee(
    () => r.find((v) => v.name === e.variable),
    [r, e.variable]
  ), s = gs();
  if (!o)
    return /* @__PURE__ */ p("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((g = n.controls) == null ? void 0 : g[c]) ?? ph[c], m = a(e.variable), d = (v) => i(e.variable, v), f = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: d, decl: o, control: e.control }) : /* @__PURE__ */ p("div", { children: [
    /* @__PURE__ */ l("label", { className: rh, htmlFor: s, children: f }),
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
const ko = b.forwardRef(
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
ko.displayName = "Card";
const wo = b.forwardRef(
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
wo.displayName = "CardHeader";
const No = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R("cv-card-title", e),
      ...t
    }
  )
);
No.displayName = "CardTitle";
const vh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-description", e), ...t })
);
vh.displayName = "CardDescription";
const bh = b.forwardRef(
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
bh.displayName = "CardAction";
const Co = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-content", e), ...t })
);
Co.displayName = "CardContent";
const yh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("cv-card-footer", e), ...t })
);
yh.displayName = "CardFooter";
const Sn = "cube-viz-drag-handle";
function So(e) {
  var s;
  const { registry: t } = Ie(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ p(ko, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ p(
      wo,
      {
        ...i,
        className: R(Sn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(No, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Co, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class $a extends vs {
  constructor() {
    super(...arguments);
    ha(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ p(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Lr, {}),
      /* @__PURE__ */ l(En, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(In, { children: n.message })
    ] }) : this.props.children;
  }
}
function kh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function wh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Nh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Ch = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Ke(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let ft = null;
function xo(e = {}) {
  return ft || (e.includeStyleProperties ? (ft = e.includeStyleProperties, ft) : (ft = Ke(window.getComputedStyle(document.documentElement)), ft));
}
function xn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Sh(e) {
  const t = xn(e, "border-left-width"), n = xn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function xh(e) {
  const t = xn(e, "border-top-width"), n = xn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Mo(e, t = {}) {
  const n = t.width || Sh(e), r = t.height || xh(e);
  return { width: n, height: r };
}
function Mh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Se = 16384;
function Rh(e) {
  (e.width > Se || e.height > Se) && (e.width > Se && e.height > Se ? e.width > e.height ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se) : e.width > Se ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se));
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
async function Th(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function _h(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Th(a);
}
const Ce = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ce(n, t);
};
function Oh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Ah(e, t) {
  return xo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Dh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? Oh(n) : Ah(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function za(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = Ch();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Dh(o, n, a, r)), t.appendChild(s);
}
function Lh(e, t, n) {
  za(e, t, ":before", n), za(e, t, ":after", n);
}
const Va = "application/font-woff", ja = "image/jpeg", Eh = {
  woff: Va,
  woff2: Va,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ja,
  jpeg: ja,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Ih(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ta(e) {
  const t = Ih(e).toLowerCase();
  return Eh[t] || "";
}
function Ph(e) {
  return e.split(/,/)[1];
}
function wr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Fh(e, t) {
  return `data:${t};base64,${e}`;
}
async function Ro(e, t, n) {
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
function $h(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function na(e, t, n) {
  const r = $h(e, t, n.includeQueryParams);
  if (tr[r] != null)
    return tr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Ro(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Ph(s)));
    a = Fh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return tr[r] = a, a;
}
async function zh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Mn(t);
}
async function Vh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Mn(s);
  }
  const n = e.poster, r = ta(n), a = await na(n, r, t);
  return Mn(a);
}
async function jh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Bn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Wh(e, t) {
  return Ce(e, HTMLCanvasElement) ? zh(e) : Ce(e, HTMLVideoElement) ? Vh(e, t) : Ce(e, HTMLIFrameElement) ? jh(e, t) : e.cloneNode(To(e));
}
const Hh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", To = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Bh(e, t, n) {
  var r, a;
  if (To(t))
    return t;
  let i = [];
  return Hh(e) && e.assignedNodes ? i = Ke(e.assignedNodes()) : Ce(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ke(e.contentDocument.body.childNodes) : i = Ke(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Ce(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Bn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function qh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : xo(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Ce(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Uh(e, t) {
  Ce(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ce(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Kh(e, t) {
  if (Ce(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Gh(e, t, n) {
  return Ce(t, Element) && (qh(e, t, n), Lh(e, t, n), Uh(e, t), Kh(e, t)), t;
}
async function Yh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Bn(u, t, !0));
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
async function Bn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Wh(r, t)).then((r) => Bh(e, r, t)).then((r) => Gh(e, r, t)).then((r) => Yh(r, t));
}
const _o = /url\((['"]?)([^'"]+?)\1\)/g, Qh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Jh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Xh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Zh(e) {
  const t = [];
  return e.replace(_o, (n, r, a) => (t.push(a), n)), t.filter((n) => !wr(n));
}
async function ef(e, t, n, r, a) {
  try {
    const i = n ? Nh(t, n) : t, o = ta(t);
    let s;
    return a || (s = await na(i, o, r)), e.replace(Xh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function tf(e, { preferredFontFormat: t }) {
  return t ? e.replace(Jh, (n) => {
    for (; ; ) {
      const [r, , a] = Qh.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Oo(e) {
  return e.search(_o) !== -1;
}
async function Ao(e, t, n) {
  if (!Oo(e))
    return e;
  const r = tf(e, n);
  return Zh(r).reduce((i, o) => i.then((s) => ef(s, o, t, n)), Promise.resolve(r));
}
async function pt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Ao(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function nf(e, t) {
  await pt("background", e, t) || await pt("background-image", e, t), await pt("mask", e, t) || await pt("-webkit-mask", e, t) || await pt("mask-image", e, t) || await pt("-webkit-mask-image", e, t);
}
async function rf(e, t) {
  const n = Ce(e, HTMLImageElement);
  if (!(n && !wr(e.src)) && !(Ce(e, SVGImageElement) && !wr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await na(r, ta(r), t);
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
async function af(e, t) {
  const r = Ke(e.childNodes).map((a) => Do(a, t));
  await Promise.all(r).then(() => e);
}
async function Do(e, t) {
  Ce(e, Element) && (await nf(e, t), await rf(e, t), await af(e, t));
}
function of(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Wa = {};
async function Ha(e) {
  let t = Wa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Wa[e] = t, t;
}
async function Ba(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Ro(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function qa(e) {
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
async function sf(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ke(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = Ha(c).then((m) => Ba(m, t)).then((m) => qa(m).forEach((d) => {
              try {
                a.insertRule(d, d.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (f) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
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
        a.href != null && r.push(Ha(a.href).then((s) => Ba(s, t)).then((s) => qa(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ke(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function lf(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Oo(t.style.getPropertyValue("src")));
}
async function cf(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ke(e.ownerDocument.styleSheets), r = await sf(n, t);
  return lf(r);
}
function Lo(e) {
  return e.trim().replace(/["']/g, "");
}
function uf(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Lo(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function mf(e, t) {
  const n = await cf(e, t), r = uf(e);
  return (await Promise.all(n.filter((i) => r.has(Lo(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Ao(i.cssText, o, t);
  }))).join(`
`);
}
async function df(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await mf(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function hf(e, t = {}) {
  const { width: n, height: r } = Mo(e, t), a = await Bn(e, t, !0);
  return await df(a, t), await Do(a, t), of(a, t), await _h(a, n, r);
}
async function ff(e, t = {}) {
  const { width: n, height: r } = Mo(e, t), a = await hf(e, t), i = await Mn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Mh(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || Rh(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function pf(e, t = {}) {
  return (await ff(e, t)).toDataURL();
}
function gf(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function vf(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function bf(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function yf(e, t, n = 2) {
  const r = await pf(e, {
    pixelRatio: n,
    backgroundColor: bf(e),
    cacheBust: !0
  });
  vf(r, `${gf(t)}.png`);
}
function kf({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const v = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    wh(kh(t), `${v}.csv`);
  }, d = async () => {
    const v = r == null ? void 0 : r.current;
    if (!(!v || a)) {
      i(!0), s(null);
      try {
        await yf(v, e);
      } catch (k) {
        s(k instanceof Error ? k.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, f = (v) => v.stopPropagation(), g = (v = !0) => R("cv-menu-item", !v && "cv-menu-item--disabled");
  return /* @__PURE__ */ p(Ae, { children: [
    /* @__PURE__ */ l(
      De,
      {
        onMouseDown: f,
        onPointerDown: f,
        onTouchStart: f,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(qs, {})
      }
    ),
    /* @__PURE__ */ p(Le, { align: "end", className: "cv-menu", onMouseDown: f, onPointerDown: f, onTouchStart: f, children: [
      n ? /* @__PURE__ */ p("button", { type: "button", onClick: n, className: g(), children: [
        /* @__PURE__ */ l(Us, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ p("button", { type: "button", onClick: d, disabled: a, className: g(!a), children: [
        /* @__PURE__ */ l(Ks, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ p("button", { type: "button", onClick: m, disabled: !c, className: g(c), children: [
        /* @__PURE__ */ l(Gs, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function Ua({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        ea,
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
      return /* @__PURE__ */ l(Qd, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(gh, { control: e.control, title: e.title });
  }
}
function Nr({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = bt({ rows: [] }), s = Ue(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = nt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l($a, { children: /* @__PURE__ */ l(Ua, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    kf,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    So,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l($a, { children: /* @__PURE__ */ l(
        Ua,
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
const Eo = (e) => e.filter((t) => t.type === "chart");
function wf(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Eo(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && xe(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function Nf(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(xe);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of Eo(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Cf({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = an(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => wf(e.widgets), [e.widgets]), c = b.useMemo(() => Nf(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const m = b.useCallback(
    (v) => {
      var k, y;
      if (o) {
        const w = v != null && v.widgetId ? s.get(v.widgetId) : void 0;
        if (w) o(w, v ? [v.from, v.to] : void 0);
        else if (!v) for (const x of new Set(s.values())) o(x, void 0);
      }
      (y = (k = u.current).onRangeSelect) == null || y.call(k, v);
    },
    [o, s]
  ), d = b.useCallback(
    (v) => {
      var k, y;
      if (o)
        if (v) {
          const w = c.get(v.member);
          w && o(w, [String(v.value)]);
        } else
          for (const w of new Set(c.values())) o(w, void 0);
      (y = (k = u.current).onPointSelect) == null || y.call(k, v);
    },
    [o, c]
  ), f = !!(n || t && o && s.size), g = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    Hr,
    {
      onRangeSelect: f ? m : void 0,
      onPointSelect: g ? d : void 0,
      children: a
    }
  );
}
const Sf = "lg", xf = 640;
function Mf(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Rf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function db({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = vo(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, d = c.margin ?? [12, 12], f = c.containerPadding ?? d, g = ee(
    () => ({ [Sf]: Rf(e.layout) }),
    [e.layout]
  ), v = ee(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), k = !t && s > 0 && s < xf;
  return /* @__PURE__ */ l(Xr, { families: n, children: /* @__PURE__ */ l(Zr, { spec: e, children: /* @__PURE__ */ l(
    Cf,
    {
      spec: e,
      drill: r,
      onRangeSelect: a,
      onPointSelect: i,
      children: /* @__PURE__ */ l("div", { ref: o, className: "cv-dashboard", children: s <= 0 ? null : k ? /* @__PURE__ */ l(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: d[1],
            padding: `${f[1]}px ${f[0]}px`
          },
          children: Mf(e.layout).map((y) => {
            const w = v.get(y.i);
            if (!w) return null;
            const x = y.h * m + (y.h - 1) * d[1];
            return /* @__PURE__ */ l("div", { style: { height: x }, children: /* @__PURE__ */ l(Nr, { widget: w, editable: !1 }) }, y.i);
          })
        }
      ) : /* @__PURE__ */ l(
        _i,
        {
          width: s,
          layouts: g,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: d,
          containerPadding: f,
          dragConfig: { enabled: t, handle: `.${Sn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((y) => {
            const w = v.get(y.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Nr, { widget: w, editable: t }) }, y.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function hb({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(Xr, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    So,
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
        Gd,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function qn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Tf(e) {
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
    connectedComponent: qn(t),
    joinTargets: Tf(t)
  })) : [];
}
function Bt(e, t) {
  if (!(!e || !t))
    return Un(e).find((n) => n.name === t);
}
function ra(e) {
  return e.shortTitle || e.title || e.name;
}
function mt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Io(e) {
  return mt(e.meta, "group");
}
function _f(e) {
  return mt(e.meta, "geoPoint");
}
function Ka(e) {
  const t = mt(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Of(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function hn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Af(e, t) {
  if (t)
    return Xt(e, "time", t).find(hn);
}
function Df(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Io(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Po(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: mt(n, "quantity"),
    unit: mt(n, "unit")
  };
}
function fn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: mt(n, "quantity"),
    unit: mt(n, "unit")
  };
}
function Fo(e, t) {
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Lf(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = _f({ meta: i });
    !o || !Fe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Ka({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Ka({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Of(o[0].name, s[0].name),
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
    const i = qn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Lf(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Fe(s) && o(Po(s, a.name));
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
function Ef(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Fe(a) || n && !n.has(a.name)) continue;
    const i = qn(a);
    for (const o of a.segments) {
      if (!Fe(o)) continue;
      const s = Fo(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function $e(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = qn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(Po(i, n.name)) : a(fn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Fo(o, n.name));
    }
    return Xt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Ga(e) {
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
const Cr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), $o = {
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
function If(e) {
  return e === "number";
}
function Pe(e) {
  return e.target !== void 0;
}
function be(e, t) {
  return e.kinds.includes(t);
}
function aa(e, t, n) {
  if (!be(e, t)) {
    const r = e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} takes ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function dt(e) {
  return e.chart.familyOptions ?? {};
}
function ia(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function zo(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Pf(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Ff(e, t, n) {
  var o, s;
  const r = e.chart;
  if (ia(r)) return;
  const a = on(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = dt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Rt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = dt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
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
        const m = zo(a), d = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, d);
        break;
      }
      case "pivot": {
        const m = ia(a) ?? Ff(e, t, n);
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
function oa(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function sa(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function $f(e, t) {
  return { ...e, dimensions: oa(e.dimensions, t) };
}
function Vo(e, t) {
  const n = sa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function jo(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function zf(e) {
  const t = Vf(e);
  return t === void 0 ? Kf : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Vf(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function At(e, t, n, r) {
  if (If(n)) return { ...e, measures: oa(e.measures, t) };
  if (n === "time") {
    const a = sn(e) ?? r;
    return jo(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? zf(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return $f(e, t);
}
function It(e, t, n, r) {
  const a = e.query ?? {}, i = Rt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = sn(a);
  if ((o == null ? void 0 : o.dimension) === n) return jo(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = sa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return Vo(a, n);
}
function jf(e, t, n, r) {
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
  return { category: { member: e }, series: Bo(t, r) };
}
function qt(e, t, n) {
  var c, u;
  const r = Rt(e, t, n), a = (m) => t.find((d) => {
    var f;
    return ((f = d.target) == null ? void 0 : f.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : on(e.chart),
    measures: o ? r[o.id] ?? [] : zo(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : ia(e.chart)
  };
}
function Ut(e, t, n) {
  const r = { ...Ho(e.chart), ...Pf(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: jf(n.category, n.measures, n.pivot, r)
    }
  };
}
function Rn(e, t, n) {
  const r = { ...dt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function la(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !Pe(i)) return e;
  const o = i.target, s = Rt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = sn(c);
      u && u !== r && (c = It(e, t, u, n)), c = At(c, r, a, m);
      const d = qt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...d, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : oa(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = It(e, t, s[0], n)), c = At(c, r, a);
      const m = qt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = It(e, t, u, n)), c = At(c, r, a);
      const m = qt({ ...e, query: c }, t, [r]);
      return Ut(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = It(e, t, u, n)), c = At(c, r, a), Rn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(dt(e)[o.key]) ? [...dt(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = At(c, r, a), Rn(e, c, { [o.key]: u });
    }
  }
}
function Wf(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Pe(a)) return e;
  const i = a.target, o = It(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = qt(e, t), c = sa(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : Vo(o, s.pivot);
      return Ut(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = qt(e, t);
      return Ut(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Rn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(dt(e)[i.key]) ? dt(e)[i.key] : [];
      return Rn(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Hf(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = sn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Bf(e, t) {
  if (be(t, e)) return e;
  if (e === "category" && be(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && be(t, "category") || e === "time" && be(t, "category")) return "category";
}
function qf(e, t, n) {
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
      const m = Bf(Hf(e, u), o);
      m && (i = la(i, n, o.id, u, m));
    }
  }
  return i;
}
function Uf(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Pe(a)) continue;
    const i = n.findIndex((o) => be(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Pt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Wo(e) {
  var o, s, c, u, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return Pt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Pt(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return Pt(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Pt(i);
}
function Sr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Ho(e) {
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
function Bo(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Kf = "day";
function xr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Gf(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = xr(r) && xr(a) ? qf(e, r.wells, a.wells) : Yf(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Yf(e, t) {
  var g;
  const { chart: n } = e, r = e.query ?? {}, a = Sr(n).length ? Sr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((v) => v.dimension), o = on(n) ?? ((g = r.dimensions) == null ? void 0 : g[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (v, k, y) => !!v && y.indexOf(v) === k
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!xr(t)) {
    const v = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: v } } : c;
  }
  const u = [...a], m = [...s], d = (v) => i.includes(v) ? "time" : "category";
  let f = c;
  for (const v of t.wells) {
    if (!v.target || !v.channel) continue;
    const k = be(v, "category") ? [
      [m, d],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, d]
    ];
    let y = 0;
    for (const [w, x] of k)
      for (let N = 0; N < w.length; ) {
        if (v.cardinality === "one" && y > 0 || !be(v, x(w[N]))) {
          N += 1;
          continue;
        }
        f = la(f, t.wells, v.id, w[N], x(w[N])), w.splice(N, 1), y += 1;
      }
  }
  return f;
}
function qo(e) {
  return Dd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Uo(e) {
  return Ed(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Qf(e, t) {
  return t.require(e).wells;
}
function Ko(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Rt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function Ft(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = la(e, o.wells, n, r, a);
  return Xf(e, s, o.wells);
}
function Jf(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = Wf(e, i.wells, n, r);
  return Go(e, o, i.wells);
}
function Xf(e, t, n) {
  return Zf(e, Go(e, t, n));
}
function Zf(e, t) {
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
function Go(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(Rt(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
const me = b.forwardRef(
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
me.displayName = "Input";
function Tn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(wi, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(lr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(ki, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Ir, { className: "cv-member-type-icon" });
  }
}
function Yo({
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
  const { meta: u, isLoading: m } = Ve(), d = b.useMemo(() => {
    if (t) {
      const k = new Set(t);
      return Xt(u, n).filter((y) => k.has(y.cube));
    }
    return Xt(u, n, e);
  }, [u, n, e, t]), f = b.useMemo(() => {
    const k = ep(d), y = k.length > 1, w = [];
    for (const [x, N] of k)
      for (const [S, C] of Df(N, () => "Other")) {
        const M = y ? S === "Other" ? x : `${x} · ${S}` : S;
        w.push({ key: `${x}:${S}`, label: M, items: C });
      }
    return w;
  }, [d]), g = f.length > 1, v = d.find((k) => k.name === r);
  return /* @__PURE__ */ p(Re, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(_e, { id: s, className: c, children: /* @__PURE__ */ l(Te, { placeholder: m ? "Loading…" : i, children: v ? /* @__PURE__ */ p("span", { className: "cv-member-option", children: [
      Tn(v.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Oe, { children: f.map((k) => /* @__PURE__ */ p(yr, { children: [
      g && k.label ? /* @__PURE__ */ l(kr, { children: k.label }) : null,
      k.items.map((y) => /* @__PURE__ */ l(ge, { value: y.name, children: /* @__PURE__ */ p("span", { className: "cv-member-option", children: [
        Tn(y.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: y.label })
      ] }) }, y.name))
    ] }, k.key)) })
  ] });
}
function ep(e) {
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
      className: R("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ p(
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
function Ya(e) {
  return e.reason === void 0;
}
function tp(e, t, n, r, a) {
  return aa(e, t, [...n]) ?? (a == null ? void 0 : a(r));
}
function np(e, t, n) {
  if (t !== void 0 && qo(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Uo(e)}`;
}
const Mr = "cube-viz:field-picker:only-compatible";
function Qo() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function rp() {
  var e;
  try {
    return ((e = Qo()) == null ? void 0 : e.getItem(Mr)) === "1";
  } catch {
    return !1;
  }
}
function ap(e) {
  try {
    const t = Qo();
    if (!t) return;
    e ? t.setItem(Mr, "1") : t.removeItem(Mr);
  } catch {
  }
}
const Qa = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(ki, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(lr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(lr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Ir, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(wi, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Ja = ["geoPoint", "number", "numberDimension", "category", "time"];
function Jo({
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
  var j, Z;
  const { meta: u, isLoading: m } = Ve(), [d, f] = b.useState(!1), [g, v] = b.useState(""), [k, y] = b.useState(rp), w = b.useCallback((z) => {
    y(z), ap(z);
  }, []), x = b.useId(), N = b.useId(), [S, C] = b.useState(r.viewLocked ?? "tables"), [M, _] = b.useState({});
  b.useEffect(() => {
    d && C(r.viewLocked ?? "tables");
  }, [d, r.viewLocked]);
  const I = b.useMemo(() => new Set(t), [t]), E = g.trim().toLowerCase(), D = b.useMemo(() => {
    if (S !== "tables") {
      const U = r.views.find((Q) => Q.name === S) ?? Bt(u, S);
      return U ? [{ cube: U, tag: "dataset" }] : [];
    }
    const z = [];
    r.sourceCube && z.push({ cube: r.sourceCube, tag: "source" });
    for (const U of r.relatedCubes) z.push({ cube: U, tag: "related" });
    return z;
  }, [S, r, u]), A = [
    ...Ja.filter((z) => be(e, z)),
    ...Ja.filter((z) => !be(e, z))
  ], O = (z) => {
    const U = [], Q = /* @__PURE__ */ new Map();
    for (const ie of A) {
      const le = Qa[ie], fe = aa(e, ie, n ?? []);
      let ae = Xt(u, le.metaKind, z);
      ie === "time" && (ae = [...ae].sort(
        (re, T) => Number(hn(T)) - Number(hn(re))
      ));
      for (const re of ae) {
        if (I.has(re.name) || E && !(re.label.toLowerCase().includes(E) || re.name.toLowerCase().includes(E))) continue;
        const T = Io(re), $ = T ? `g:${T.toLowerCase()}` : `k:${le.label}`;
        let W = Q.get($);
        W || (W = {
          key: $,
          label: T ?? le.label,
          headerIcon: T ? void 0 : le.icon,
          rejected: fe !== void 0,
          items: []
        }, Q.set($, W), U.push($)), fe === void 0 && (W.rejected = !1), W.items.push({
          option: re,
          kind: ie,
          reason: tp(e, ie, n ?? [], re, a)
        });
      }
    }
    return U.map((ie) => Q.get(ie));
  }, F = D.map((z) => ({ section: z, groups: O(z.cube.name) })).filter((z) => z.groups.length > 0), K = k ? F.reduce(
    (z, U) => z + U.groups.reduce((Q, ie) => Q + ie.items.filter((le) => !Ya(le)).length, 0),
    0
  ) : 0, P = k ? F.map((z) => ({
    section: z.section,
    groups: z.groups.map((U) => ({ ...U, rejected: !1, items: U.items.filter(Ya) })).filter((U) => U.items.length > 0)
  })).filter((z) => z.groups.length > 0) : F, G = P.length > 0, ne = !G && K > 0, H = (z, U) => {
    i(z, U), f(!1), v("");
  }, q = S === "tables" ? "All related tables" : ((j = r.views.find((z) => z.name === S)) == null ? void 0 : j.title) ?? ((Z = Bt(u, S)) == null ? void 0 : Z.title) ?? S;
  return /* @__PURE__ */ p(Ae, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: c }),
    /* @__PURE__ */ p(Le, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ p("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ p("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Ys, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: x,
              "aria-label": "Search fields",
              value: g,
              onChange: (z) => v(z.target.value),
              placeholder: m ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ l(
          ip,
          {
            browse: S,
            label: q,
            views: r.viewLocked ? r.views.filter((z) => z.name === r.viewLocked) : [],
            onBrowse: C
          }
        )
      ] }),
      /* @__PURE__ */ p("div", { className: "cv-picker-filter", children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "checkbox",
            id: N,
            className: "cv-picker-filter-box",
            checked: k,
            onChange: (z) => w(z.target.checked)
          }
        ),
        /* @__PURE__ */ l("label", { htmlFor: N, className: "cv-picker-filter-label", children: "Only compatible fields" }),
        k ? /* @__PURE__ */ l("span", { className: "cv-picker-filter-count", children: K === 0 ? "none hidden" : `${K} hidden` }) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: G ? P.map(({ section: z, groups: U }, Q) => {
        const ie = U.reduce((re, T) => re + T.items.length, 0), le = z.tag === "related", fe = M[z.cube.name] ?? le, ae = E.length > 0 ? !0 : !fe;
        return /* @__PURE__ */ p("div", { children: [
          z.tag === "related" && Q > 0 && P[Q - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => _((re) => ({ ...re, [z.cube.name]: !fe })),
              className: "cv-picker-table",
              children: [
                ae ? /* @__PURE__ */ l(Je, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(nn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(Ni, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: z.cube.title }),
                z.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : z.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: ie })
              ]
            }
          ),
          ae ? U.map((re) => /* @__PURE__ */ p(
            "div",
            {
              className: R(
                "cv-picker-group",
                re.rejected && "cv-picker-group--rejected"
              ),
              children: [
                U.length > 1 ? /* @__PURE__ */ p("div", { className: "cv-picker-group-header", children: [
                  re.headerIcon,
                  re.label,
                  re.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                re.items.map(({ option: T, kind: $, reason: W }) => /* @__PURE__ */ l(
                  op,
                  {
                    option: T,
                    kindIcon: Qa[$].icon,
                    badge: $ === "time" && hn(T) ? "default" : void 0,
                    reason: W,
                    onPick: () => H(T.name, $)
                  },
                  T.name
                ))
              ]
            },
            re.key
          )) : null
        ] }, z.cube.name);
      }) : ne ? /* @__PURE__ */ p("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ p("p", { children: [
          K,
          " ",
          E ? "matching " : "",
          "field",
          K === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          K === 1 ? "it" : "them",
          "."
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "cv-picker-show-all",
            onClick: () => w(!1),
            children: "Show all fields"
          }
        )
      ] }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: m ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function ip({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (s) => {
    r(s), i(!1);
  };
  return /* @__PURE__ */ p(Ae, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ p(
      De,
      {
        className: "cv-picker-source-trigger",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ l(Ci, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ p(Le, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Xa, { active: e === "tables", icon: /* @__PURE__ */ l(Ni, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ p(se, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ l(
          Xa,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ l(Pr, { className: "cv-ec-icon" }),
            onClick: () => o(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Xa({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ p(
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
        e ? /* @__PURE__ */ l(Xe, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function op({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
  return t ? /* @__PURE__ */ p(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ p("span", { className: "cv-picker-row-main", children: [
          r,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e.label })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: t })
      ]
    }
  ) : /* @__PURE__ */ p(
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
const sp = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], $t = "yyyy-MM-dd";
function lp(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Za(e) {
  if (!e) return;
  const t = pi(e, $t, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function ca({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = lp(e), s = Za(i), c = Za(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${de(s, "MMM d, yyyy")} – ${de(c, "MMM d, yyyy")}` : s ? de(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ p(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(B, { variant: "outline", size: "sm", className: R("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(yi, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: R("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ p(Le, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ p("div", { className: "cv-daterange-presets", children: [
        sp.map((d) => /* @__PURE__ */ l(
          B,
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
          B,
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
        yo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (d) => {
            d != null && d.from && d.to ? t([de(d.from, $t), de(d.to, $t)]) : d != null && d.from ? t([de(d.from, $t), de(d.from, $t)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function cp(e) {
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
function up(e, t) {
  const n = new Set(cp(t));
  return e.filter((r) => n.has(r.type));
}
function mp(e) {
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
function dp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function hp(e, t, n) {
  const r = mp(e), a = { name: dp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Xo = b.createContext({});
function fp({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Xo.Provider, { value: n, children: t });
}
function pp() {
  return b.useContext(Xo);
}
function gp({ kind: e, value: t, onChange: n, className: r }) {
  const a = an(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = pp(), [s, c] = b.useState(!1), [u, m] = b.useState(!1), [d, f] = b.useState(""), g = b.useMemo(() => up(i, e), [i, e]), v = g.find((w) => w.name === t), k = (w) => {
    n(w), c(!1), m(!1);
  }, y = () => {
    if (!o) return;
    const w = hp(e, d || "Variable", i);
    o(w), k(w.name), f("");
  };
  return /* @__PURE__ */ p(
    Ae,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(B, { variant: "outline", size: "sm", className: R("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Qs, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: R("cv-var-trigger-label", !v && "cv-var-trigger-label--placeholder"), children: v ? v.label ?? v.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ p(Le, { align: "start", className: "cv-var-popover", children: [
          g.length > 0 ? g.map((w) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => k(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Xe, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ p("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              me,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: d,
                onChange: (w) => f(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && y(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(B, { size: "sm", className: "cv-var-new-add", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ p(
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
function St({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = xe(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => R("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ p("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ p("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), xe(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      gp,
      {
        kind: e,
        value: xe(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(xe(t) ? void 0 : t, (u) => n(u))
  ] });
}
const vp = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function nr(e) {
  return "member" in e && "operator" in e;
}
function bp({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var D;
  const { meta: s } = Ve(), c = ((D = an()) == null ? void 0 : D.decls) ?? [], [u, m] = b.useState(null), [d, f] = b.useState(null), g = r ?? [], v = g.length === 1 && !nr(g[0]) && "or" in g[0] && Array.isArray(g[0].or) && g[0].or.every(nr) ? g[0] : void 0, k = v ? "any" : "all", y = [], w = [];
  v || g.forEach((A) => nr(A) ? y.push(A) : w.push(A));
  const x = v ? v.or : y, N = w.length === 0 && (x.length >= 2 || k === "any"), S = (A) => k === "any" ? A.length ? [{ or: A }] : [] : [...A, ...w], C = (A) => {
    const O = A.filter((K) => K.member.length > 0), F = S(O);
    a(F.length > 0 ? F : void 0);
  }, M = (A) => {
    const O = A === "any" ? x.length ? [{ or: x }] : [] : [...x];
    a(O.length > 0 ? O : void 0);
  }, _ = (A, O) => C(x.map((F, K) => K === A ? { ...F, ...O } : F)), I = (A) => C(x.filter((O, F) => F !== A)), E = (A) => {
    const F = { ...d ?? { member: "", operator: "equals", values: [] }, ...A };
    F.member ? (f(null), m(x.length), C([...x, F])) : f(F);
  };
  return /* @__PURE__ */ p("div", { "data-slot": "filter-builder", className: R("cv-filter-builder", o), children: [
    x.length === 0 && !d ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    N ? /* @__PURE__ */ p("div", { className: "cv-filter-match", children: [
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
          value: k,
          onChange: M
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    x.map((A, O) => {
      const F = $e(s, A.member);
      return u === O ? /* @__PURE__ */ l(
        ei,
        {
          leaf: A,
          member: F,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (K) => _(O, K),
          onDone: () => m(null),
          onRemove: () => I(O)
        },
        O
      ) : /* @__PURE__ */ l(
        yp,
        {
          text: kp(A, F == null ? void 0 : F.label, c),
          disabled: i,
          onEdit: () => m(O),
          onRemove: () => I(O)
        },
        O
      );
    }),
    d ? /* @__PURE__ */ l(
      ei,
      {
        leaf: d,
        member: $e(s, d.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: E,
        onRemove: () => f(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ p("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ p(
      B,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!d,
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
function yp({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ p("div", { className: "cv-filter-summary", children: [
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
      B,
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
function ei({
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
  const { meta: u } = Ve(), m = Ga(t == null ? void 0 : t.type), d = m.includes(e.operator) ? e.operator : m[0], f = !Cr.has(d), g = b.useId(), v = b.useId(), k = b.useId(), y = b.useId(), w = b.useId(), x = b.useId();
  b.useEffect(() => {
    d !== e.operator && o({ operator: d });
  }, [e.operator, o, d]);
  const N = (S) => {
    const C = $e(u, S);
    o({ member: S, operator: Ga(C == null ? void 0 : C.type)[0], values: [] });
  };
  return /* @__PURE__ */ p("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ p("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ p("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ p(B, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Xe, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          B,
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
    /* @__PURE__ */ p("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: g, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Jo,
          {
            well: vp,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: N,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                id: v,
                disabled: i,
                "aria-labelledby": `${g} ${v}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ p("span", { className: "cv-filter-field-value", children: [
                    Tn(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(Je, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Yo,
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
    /* @__PURE__ */ p("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: k, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ p(
        Re,
        {
          value: d,
          onValueChange: (S) => o({
            operator: S,
            values: Cr.has(S) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              _e,
              {
                id: y,
                "aria-labelledby": `${k} ${y}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Te, {})
              }
            ),
            /* @__PURE__ */ l(Oe, { children: m.map((S) => /* @__PURE__ */ l(ge, { value: S, children: $o[S] }, S)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ p("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: x, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        wp,
        {
          fieldId: x,
          labelId: w,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (S) => o({ values: S })
        }
      )
    ] }) : null
  ] });
}
function kp(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = $o[e.operator] ?? e.operator;
  if (Cr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (xe(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function wp({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && xe(i[0]);
  if (t === "time") {
    const u = o ? i[0] : Np(i);
    return /* @__PURE__ */ l(
      St,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : xe(m) ? [m] : Cp(m)),
        renderFixed: (m, d) => /* @__PURE__ */ l(ca, { value: m, onChange: d })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !xe(u));
  return /* @__PURE__ */ l(
    St,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : xe(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(
        me,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (d) => m(Sp(d.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Np(e) {
  const t = e.filter((n) => !xe(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Cp(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Sp(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function xp({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ p(Ae, { children: [
    /* @__PURE__ */ p(
      De,
      {
        className: R(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Js, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ p(Le, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ p("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(Mp, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(bp, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function Mp({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Ve(), a = Ef(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ p("div", { className: "cv-filter-segments", children: [
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
function Rp({ currentName: e, hasFields: t, onSelect: n }) {
  var k;
  const { meta: r } = Ve(), a = b.useMemo(() => Un(r), [r]), i = a.filter((y) => y.type === "view"), o = a.filter((y) => y.type === "cube"), s = a.find((y) => y.name === e), [c, u] = b.useState(!1), [m, d] = b.useState(null), f = (y) => {
    if (y === e) {
      u(!1);
      return;
    }
    t ? d(y) : (n(y), u(!1));
  }, g = () => {
    m && n(m), d(null), u(!1);
  }, v = m ? ((k = a.find((y) => y.name === m)) == null ? void 0 : k.title) ?? m : "";
  return /* @__PURE__ */ p(
    Ae,
    {
      open: c,
      onOpenChange: (y) => {
        u(y), y || d(null);
      },
      children: [
        /* @__PURE__ */ p(
          De,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(Ci, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: R("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(Le, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ p("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ p("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: v }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ p("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(B, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => d(null), children: "Cancel" }),
            /* @__PURE__ */ l(B, { size: "sm", className: "cv-ec-h7", onClick: g, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ p("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ p(se, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((y) => /* @__PURE__ */ l(
              ti,
              {
                icon: /* @__PURE__ */ l(Pr, { className: "cv-ec-icon" }),
                label: y.title,
                active: y.name === e,
                onClick: () => f(y.name)
              },
              y.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((y) => /* @__PURE__ */ l(
            ti,
            {
              icon: /* @__PURE__ */ l(Si, { className: "cv-ec-icon" }),
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
function ti({
  icon: e,
  label: t,
  active: n,
  onClick: r
}) {
  return /* @__PURE__ */ p(
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
        n ? /* @__PURE__ */ l(Xe, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function ni(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Tp({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.labelHide === !0, s = b.useId(), c = b.useId(), u = n === "y" ? "Value axis title" : "Category axis title";
  return /* @__PURE__ */ p(
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
            onChange: (d) => ni(e, t, n, { label: d.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv-axis-chrome-input"
          }
        ),
        /* @__PURE__ */ l(
          Op,
          {
            hidden: o,
            what: "axis title",
            onClick: () => ni(e, t, n, { labelHide: o ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function _p({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ p("div", { className: R("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(xi, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Mi, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Op({
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
      children: e ? /* @__PURE__ */ l(xi, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Mi, { className: "cv-ec-icon" })
    }
  );
}
const Zo = b.forwardRef(
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
Zo.displayName = "Label";
function ce({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ p("div", { "data-slot": "field-row", className: R("cv-field-row", i), children: [
    /* @__PURE__ */ p("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Zo, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Rr({
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
function pe({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: i
}) {
  const o = b.useId();
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "switch-row",
      className: R("cv-switch-row", i),
      children: [
        /* @__PURE__ */ p(
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
        /* @__PURE__ */ l(Rr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Ap = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, Dp = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function Lp({ spec: e, update: t }) {
  var y, w, x;
  const n = et(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((w = (y = r.mapping) == null ? void 0 : y.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", d = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", f = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", g = Jr(o) ? /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ l(
      ce,
      {
        label: "Compare",
        hint: f === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ p(
          Re,
          {
            value: f,
            onValueChange: (N) => {
              var S;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((S = r.transform) == null ? void 0 : S.window) ?? cn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(_e, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Te, {}) }),
              /* @__PURE__ */ l(Oe, { children: Dp.map((N) => /* @__PURE__ */ l(ge, { value: N, children: Ap[N] }, N)) })
            ]
          }
        )
      }
    ),
    f === "rollingAvg" ? /* @__PURE__ */ l(ri, { label: "Window (points)", children: (N) => {
      var S;
      return /* @__PURE__ */ l(
        me,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((S = r.transform) == null ? void 0 : S.window) ?? cn,
          onChange: (C) => {
            const M = parseInt(C.target.value, 10), _ = Number.isFinite(M) ? Math.min(90, Math.max(2, M)) : cn;
            s({ transform: { kind: "rollingAvg", window: _ } });
          }
        }
      );
    } }) : null
  ] }) : null, v = /* @__PURE__ */ l(ce, { label: "Stacked", children: /* @__PURE__ */ l(
    Zt,
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
  ) }), k = (() => {
    var N, S;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ l(
            pe,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (C) => s({ orientation: C ? "horizontal" : "vertical" })
            }
          ),
          v
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ p(se, { children: [
          v,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((S = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : S.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ l(
            pe,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (C) => c({ innerRadiusPct: C ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ce, { label: "Slice labels", children: /* @__PURE__ */ l(
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
              onChange: (C) => c({ showLabels: C })
            }
          ) }),
          /* @__PURE__ */ l(ri, { label: "Max slices", children: (C) => /* @__PURE__ */ l(
            me,
            {
              id: C,
              type: "number",
              min: 1,
              className: "cv-ec-h8",
              value: i.maxSlices ?? "",
              placeholder: "8",
              onChange: (M) => {
                const _ = parseInt(M.target.value, 10);
                c({ maxSlices: Number.isFinite(_) && _ > 0 ? _ : void 0 });
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
        return /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ l(
            pe,
            {
              label: "Compact rows",
              checked: i.rowHeight === "compact",
              onChange: (C) => c({ rowHeight: C ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ l(
            pe,
            {
              label: "Sortable columns",
              checked: i.sortable !== !1,
              onChange: (C) => c({ sortable: C })
            }
          ),
          /* @__PURE__ */ l(
            pe,
            {
              label: "Sticky header",
              checked: i.stickyHeader !== !1,
              onChange: (C) => c({ stickyHeader: C })
            }
          ),
          /* @__PURE__ */ l(
            pe,
            {
              label: "Row numbers",
              checked: i.showRowNumbers === !0,
              onChange: (C) => c({ showRowNumbers: C })
            }
          )
        ] });
      case "heatmap":
        return /* @__PURE__ */ l(
          pe,
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
  return /* @__PURE__ */ p("div", { className: "cv-customize", children: [
    k,
    g
  ] });
}
function Ep(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || Jr(n);
}
function ri({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ p("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function es(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function ts(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!Pe(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      be(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function Ip(e) {
  let t = 0;
  for (const n of e)
    Pe(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Pp(e, t) {
  return e.some((n) => Pe(n) && n.cardinality === "many" && be(n, t));
}
const Fp = 0.35, $p = 0.4, zp = 0.3, Vp = 0.1;
function jp(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? zp : e.supportsCartesianAxes ? Vp : e.wells.some(
    (a) => Pe(a) && a.channel === "x" && be(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function ns(e) {
  const t = e.filter(Pe);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Wp(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Hp = (e, t, n) => e === 1 ? t : n;
function Bp(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Wp(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${Hp(r, "measure", "measures")}`;
  return ns(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function qp(e, t) {
  const n = es(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = ts(s, n), u = Ip(s), m = Math.max(0, n.length - c.matched.length), d = Uf(s, r) + 0.5 * m, f = u > 0 ? d / u : 0, g = c.leftover.filter(
      (k) => k.kind !== "time" && !Pp(s, k.kind)
    ).length, v = f - Fp * g + jp(o, a) - (ns(s) ? $p : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(v * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Bp(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function Up(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Kp(e, t, n) {
  const r = e.require(n), a = ts(r.wells, es(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = Ft(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function rs(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Gf(e, r, n));
  };
}
function Gp({ spec: e, update: t, empty: n }) {
  const r = et(), a = e.chart.family, i = rs(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ p("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(as, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function Yp({ spec: e, update: t }) {
  const n = et(), r = e.chart.family, a = rs(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ p(Ae, { children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(Je, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ p(Le, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(as, { spec: e, family: r, onPick: a, families: n }),
      Ep(r, n) ? /* @__PURE__ */ p("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Lp, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function as({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => qp(r, e), [r, e]), i = b.useMemo(() => Up(a), [a]), o = b.useMemo(
    () => new Map(a.map((d) => [d.family, d])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((d) => d.fits).map((d) => d.family)),
    [a]
  ), c = Zp(e, r, s), u = (d, f) => /* @__PURE__ */ l(
    Qp,
    {
      fit: d,
      active: d.family === t,
      preview: c.get(d.family),
      families: r,
      reason: f ? d.reason : void 0,
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
  return /* @__PURE__ */ p("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ p("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((d) => u(d, !0)) })
    ] }) : null,
    /* @__PURE__ */ p("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: m.map((d) => u(d, !1)) })
    ] })
  ] });
}
function Qp({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: a,
  onPick: i
}) {
  const o = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ p(
    "div",
    {
      className: R("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          lg,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ p("span", { className: "cv-type-tile-caption", children: [
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
function is(e, t) {
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
function Jp(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const ai = 200, Xp = () => () => {
};
function Zp(e, t, n) {
  const r = e.query, a = Jp(r), i = b.useMemo(() => {
    const f = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof f == "number" ? Math.min(f, ai) : ai
    };
  }, [r]), o = an(), s = b.useRef(null);
  s.current === null && (s.current = mo());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, m = b.useSyncExternalStore(
    o ? o.store.subscribe : Xp,
    u,
    u
  ), { resultSet: d } = po(m, { skip: !a });
  return b.useMemo(() => {
    const f = /* @__PURE__ */ new Map();
    for (const g of t.list()) {
      const v = g.family;
      if (g.queryless || a && n.has(v) && !d) continue;
      const w = (d && n.has(v) ? eg(e, v, t, d, m) : void 0) ?? sg(v, t);
      w && f.set(v, w);
    }
    return f;
  }, [e, t, d, m, n, a]);
}
function eg(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Kp(n, e, t), o = is(i.chart, n), s = co(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const ht = "sample.category", en = "sample.group", ke = "sample.value", Ee = "sample.count", os = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Tr = [18, 27, 21, 34, 26, 39], _r = [12, 9, 17, 14, 22, 16], tg = os.flatMap((e, t) => [
  { [ht]: e, [en]: "North", [ke]: Tr[t], [Ee]: _r[t] },
  {
    [ht]: e,
    [en]: "South",
    [ke]: Math.round(Tr[t] * 0.62),
    [Ee]: Math.round(_r[t] * 0.78)
  }
]), ng = {
  measures: [ke, Ee],
  dimensions: [ht, en]
}, rg = {
  measures: {
    [ke]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ee]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [ht]: { title: "Day", shortTitle: "Day", type: "string" },
    [en]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function ss(e) {
  const t = [
    { key: ke, label: "Value", data: Tr, colorToken: "chart-1" },
    { key: Ee, label: "Count", data: _r, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: os,
    series: t,
    raw: { rows: tg, query: ng, annotation: rg },
    empty: !1
  };
}
const ag = ss(1), ig = ss(2), zt = (e, t) => ({
  family: e,
  mapping: { category: { member: ht }, series: { mode: "measures", members: t } }
}), og = {
  bar: zt("bar", [ke, Ee]),
  line: zt("line", [ke, Ee]),
  area: { ...zt("area", [ke, Ee]), stackMode: "stacked" },
  pie: zt("pie", [ke]),
  scatter: { family: "scatter", familyOptions: { x: ke, y: Ee } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: ht },
      series: { mode: "pivot", value: ke, pivot: en }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: ke, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: ht }, { member: ke }, { member: Ee }] }
  }
};
function sg(e, t) {
  const n = og[e] ?? zt(e, [ke, Ee]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? ag : ig,
    options: is(n, t)
  };
}
const lg = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(cg, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    so,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class cg extends b.Component {
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
function ug(e, t) {
  return e.allowedCubes.includes(t);
}
function mg(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function dg(e, t, n, r) {
  const a = Un(e), i = a.filter((N) => N.type === "view"), o = Ko(t, r), s = Object.values(o).flat();
  let c;
  for (const N of s) {
    const S = $e(e, N);
    if (S) {
      c = S;
      break;
    }
  }
  const u = !c && n ? Bt(e, n) : void 0, m = c ? Bt(e, c.cube) : u, d = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, f = t.query.measures ?? [], g = f.length ? Pt(f[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: i, measureSource: g, allowedCubes: [d] };
  const v = g ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), k = v ? Bt(e, v) : void 0, y = a.filter((N) => N.type === "cube"), w = v ? mg(y, v) : y, x = v ? [v, ...w.map((N) => N.name)] : y.map((N) => N.name);
  return {
    sourceCube: (k == null ? void 0 : k.type) === "cube" ? k : void 0,
    relatedCubes: w,
    views: i,
    measureSource: g,
    allowedCubes: x
  };
}
function hg(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function fg(e, t, n, r, a, i) {
  var J, ue, Me, Tt, _t;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : pg(a), m = o.familyOptions ?? {}, d = Array.isArray(m.columns) ? m.columns : [], f = Ho(o), g = f[r], v = c === "table" && n.id === "columns", k = c === "bar" || c === "line" || c === "area", y = ((ue = (J = o.mapping) == null ? void 0 : J.series) == null ? void 0 : ue.mode) === "measures", w = k && n.id === "y", x = w && y, N = v ? (Me = d.find((Y) => Y.member === r)) == null ? void 0 : Me.label : x ? g == null ? void 0 : g.label : void 0, S = x ? g == null ? void 0 : g.colorToken : void 0, C = sn(s), M = n.kinds.includes("time") && (C == null ? void 0 : C.dimension) === r, _ = M ? C == null ? void 0 : C.granularity : void 0, I = M ? C == null ? void 0 : C.dateRange : void 0, E = (c === "line" || c === "area") && n.id === "y" && y, D = E ? g == null ? void 0 : g.curve : void 0, A = E ? g == null ? void 0 : g.dots : void 0, O = (Y) => {
    var ma, da;
    if ((ma = o.mapping) != null && ma.series && o.mapping.series.mode !== "measures") return;
    const he = ((da = o.mapping) != null && da.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ve = { ...f };
    Y && Object.keys(Y).length > 0 ? ve[r] = Y : delete ve[r];
    const Ot = on(o);
    Ot && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Ot }, series: Bo(he, ve) }
      }
    });
  }, F = (Y) => {
    const he = d.map((ve) => ve.member === r ? { ...ve, ...Y } : ve);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: he } } });
  }, K = (Y) => {
    v ? F({ label: Y }) : x && O({ ...g, label: Y });
  }, P = (Y) => {
    x && O({ ...g, colorToken: Y ?? void 0 });
  }, G = (Y) => {
    if (!C) return;
    const he = { ...C };
    for (const ve of Object.keys(Y)) {
      const Ot = Y[ve];
      Ot === void 0 ? delete he[ve] : he[ve] = Ot;
    }
    t({ ...e, query: { ...s, timeDimensions: [he] } });
  }, ne = (Y) => G({ granularity: Y }), H = (Y) => G({ dateRange: Y }), q = (Y) => {
    x && O({ ...g, curve: Y });
  }, j = (Y) => {
    x && O({ ...g, dots: Y });
  }, Z = () => t(Jf(e, c, n.id, r, i)), z = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), U = (Tt = o.mapping) == null ? void 0 : Tt.series, Q = (U && U.mode === "pivot" ? U.value : Sr(o)[0]) ?? ((_t = s.measures) == null ? void 0 : _t[0]), ie = z ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...Q ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...Q ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], le = (() => {
    const Y = hg(s.order)[0];
    if (!Y) return "none";
    const [he, ve] = Y;
    return Q && he === Q ? ve === "desc" ? "value-desc" : "value-asc" : he === r ? u === "time" ? ve === "desc" ? "time-desc" : "time-asc" : ve === "asc" ? "label-asc" : "label-desc" : "none";
  })(), fe = (Y) => {
    let he;
    switch (Y) {
      case "none":
        he = void 0;
        break;
      case "value-desc":
        he = Q ? [[Q, "desc"]] : void 0;
        break;
      case "value-asc":
        he = Q ? [[Q, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        he = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        he = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: he } });
  }, ae = typeof s.limit == "number" ? s.limit : void 0, re = (Y) => t({ ...e, query: { ...s, limit: Y && Y > 0 ? Y : void 0 } }), $ = (c === "bar" || c === "line" || c === "area") && M, W = $ && m.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: S,
    granularity: _,
    dateRange: I,
    curve: D,
    dots: A,
    canLineStyle: E,
    canRename: v || x,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && y,
    isTimeField: M,
    isCategoryField: z,
    sortValue: le,
    sortOptions: ie,
    onSort: fe,
    limit: ae,
    onLimit: re,
    canComparePrevious: $,
    comparePrevious: W,
    comparePreviousReady: $ && I !== void 0,
    onComparePrevious: (Y) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: Y || void 0 } } }),
    onRename: K,
    onRecolor: P,
    onGranularity: ne,
    onDateRange: H,
    onCurve: q,
    onDots: j,
    onRemove: Z
  };
}
function pg(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ii(e, t, n, r) {
  var d;
  const { chart: a, query: i } = e, o = a.family, s = (f) => {
    if (r < 0 || r >= f.length || n === r) return f;
    const g = f.slice(), [v] = g.splice(n, 1);
    return g.splice(r, 0, v), g;
  };
  if (o === "table" && t.id === "columns") {
    const f = a.familyOptions ?? {}, g = s(Array.isArray(f.columns) ? f.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...f, columns: g } } };
  }
  const c = s(i.measures ?? []), u = (d = a.mapping) == null ? void 0 : d.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const f = s(u.values);
    m = { ...a.mapping, series: { ...u, value: f[0], values: f } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const gg = Ye.options;
function vg({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ p(
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
        gg.map((i) => {
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
const bg = Ge.options, yg = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function ls({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: i,
  className: o
}) {
  const s = n && n.length > 0 ? n : bg;
  return /* @__PURE__ */ p(
    Re,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ l(_e, { id: i, className: o, children: /* @__PURE__ */ l(Te, { placeholder: r }) }),
        /* @__PURE__ */ l(Oe, { children: s.map((c) => /* @__PURE__ */ l(ge, { value: c, children: yg[c] }, c)) })
      ]
    }
  );
}
const kg = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function wg({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = et(), u = fg(e, t, n, r, a, c), m = b.useId(), d = b.useId(), f = b.useId(), g = b.useId(), v = b.useId(), k = b.useId(), y = (a == null ? void 0 : a.label) ?? r, w = u.label || y, x = u.canColor && i !== void 0, N = u.canRename || x || u.isTimeField || u.isCategoryField || u.canLineStyle || !!o, S = (M) => {
    const _ = M.trim();
    u.onRename(_.length > 0 ? _ : void 0);
  }, C = /* @__PURE__ */ p(se, { children: [
    x ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? Tn(a.type) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: w })
  ] });
  return /* @__PURE__ */ p("div", { "data-slot": "field-pill", className: R("cv-field-pill", s), children: [
    N ? /* @__PURE__ */ p(Ae, { children: [
      /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${w}`,
          children: C
        }
      ) }),
      /* @__PURE__ */ l(Le, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ p("div", { className: "cv-field-pill-config", children: [
        u.canRename ? /* @__PURE__ */ p("label", { className: "cv-ec-field", htmlFor: m, children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
          /* @__PURE__ */ l(
            me,
            {
              id: m,
              defaultValue: u.label ?? "",
              placeholder: y,
              className: "cv-ec-h8",
              onBlur: (M) => S(M.target.value),
              onKeyDown: (M) => {
                M.key === "Enter" && (S(M.target.value), M.target.blur());
              }
            }
          )
        ] }) : null,
        x ? /* @__PURE__ */ p("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l(vg, { value: u.colorToken, onChange: u.onRecolor })
        ] }) : null,
        u.isTimeField ? /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ p("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              St,
              {
                kind: "dateRange",
                value: u.dateRange,
                onChange: u.onDateRange,
                renderFixed: (M, _) => /* @__PURE__ */ l(ca, { value: M, onChange: _ })
              }
            )
          ] }),
          /* @__PURE__ */ p("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              St,
              {
                kind: "granularity",
                value: u.granularity,
                onChange: u.onGranularity,
                renderFixed: (M, _) => /* @__PURE__ */ l(ls, { value: M, onChange: _, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          u.canComparePrevious ? /* @__PURE__ */ p("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ p("label", { className: "cv-ec-row", htmlFor: v, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                Rr,
                {
                  id: v,
                  checked: u.comparePrevious,
                  onChange: u.onComparePrevious,
                  "aria-label": "Compare to previous period"
                }
              )
            ] }),
            u.comparePrevious && !u.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
          ] }) : null
        ] }) : null,
        u.isCategoryField ? /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ p("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: d, children: [
            /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Sort" }),
            /* @__PURE__ */ l(
              "select",
              {
                id: d,
                "aria-labelledby": f,
                value: u.sortValue,
                onChange: (M) => u.onSort(M.target.value),
                className: "cv-field-pill-select",
                children: u.sortOptions.map((M) => /* @__PURE__ */ l("option", { value: M.key, children: M.label }, M.key))
              }
            )
          ] }),
          /* @__PURE__ */ p("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: g, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
            /* @__PURE__ */ l(
              me,
              {
                id: g,
                type: "number",
                min: 1,
                defaultValue: u.limit ?? "",
                placeholder: "All",
                className: "cv-ec-h8",
                onBlur: (M) => {
                  const _ = M.target.value.trim();
                  u.onLimit(_ === "" ? void 0 : Number(_));
                },
                onKeyDown: (M) => {
                  if (M.key === "Enter") {
                    const _ = M.target.value.trim();
                    u.onLimit(_ === "" ? void 0 : Number(_)), M.target.blur();
                  }
                }
              }
            )
          ] })
        ] }) : null,
        u.canLineStyle ? /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ p("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: kg.map(([M, _]) => /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                onClick: () => u.onCurve(M),
                className: R(
                  "cv-line-shape-option",
                  (u.curve ?? "monotone") === M && "cv-line-shape-option--active"
                ),
                children: [
                  _,
                  (u.curve ?? "monotone") === M ? /* @__PURE__ */ l(Xe, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              M
            )) })
          ] }),
          /* @__PURE__ */ p("label", { className: "cv-ec-row", htmlFor: k, children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(Rr, { id: k, checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ p("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ p(
            B,
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
          /* @__PURE__ */ p(
            B,
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
        /* @__PURE__ */ p(
          B,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: u.onRemove,
            children: [
              /* @__PURE__ */ l(pa, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: w, children: C }),
    /* @__PURE__ */ l(
      B,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: u.onRemove,
        "aria-label": `Remove ${w}`,
        children: /* @__PURE__ */ l(pa, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function Ng({
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
  lockedSingle: f,
  disableReorder: g,
  label: v,
  note: k,
  pickerSide: y,
  pickerAlign: w,
  control: x
}) {
  const N = n.cardinality === "many" && !f, S = N || r.length === 0, C = r.length, M = d === "vertical", _ = v ?? n.label, I = ["number", "category", "time"].filter((A) => !be(n, A)).map((A) => aa(n, A, r)).find((A) => A !== void 0) ?? n.hint, E = a.length === 0 && !n.optional && be(n, "number") ? "Add a measure to start" : void 0, D = /* @__PURE__ */ l(
    Jo,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: y ?? (M ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          title: I,
          className: R(
            "cv-well-add",
            M && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(kt, { className: "cv-ec-icon" }),
            r.length === 0 ? _ : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "well-group",
      className: R("cv-well-group", !M && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ p("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: _ }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: x }) : null,
        /* @__PURE__ */ p("div", { className: R("cv-well-fields", M ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((A, O) => /* @__PURE__ */ l(
            wg,
            {
              spec: e,
              update: t,
              well: n,
              member: A,
              option: i(A),
              resolvedColor: o(A),
              className: M ? "cv-field-pill--full" : void 0,
              reorder: N && C > 1 && !g ? {
                canUp: O > 0,
                canDown: O < C - 1,
                onUp: () => t(ii(e, n, O, O - 1)),
                onDown: () => t(ii(e, n, O, O + 1))
              } : void 0
            },
            A
          )),
          S ? D : null
        ] }),
        E ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: E }) : null,
        k ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: k }) : null
      ]
    }
  );
}
function rr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ p(Ae, { children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ p("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(Je, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Le, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function ua(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Cg({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = ua(e, t), a = Wo(e), i = (u = e.query.timeDimensions) == null ? void 0 : u[0], o = n.display ?? "number", s = n.gauge, c = (m) => {
    const d = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!d) return;
    const f = { ...d };
    for (const g of Object.keys(m)) {
      const v = m[g];
      v === void 0 ? delete f[g] : f[g] = v;
    }
    delete f.granularity, t({ ...e, query: { ...e.query, timeDimensions: [f] } });
  };
  return /* @__PURE__ */ p("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Kt, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      Yo,
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
    i != null && i.dimension ? /* @__PURE__ */ l(Kt, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      St,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (d) => c({ dateRange: d }),
        renderFixed: (d, f) => /* @__PURE__ */ l(ca, { value: d, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ l(ce, { label: "Display", children: /* @__PURE__ */ l(
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
    o === "gauge" ? /* @__PURE__ */ l(Kt, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      me,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const f = parseFloat(d.target.value);
          r({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Sg({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = ua(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ p("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      pe,
      {
        label: "Show comparison",
        checked: i,
        onChange: (m) => r({
          comparison: m ? o.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    i ? /* @__PURE__ */ p(se, { children: [
      /* @__PURE__ */ l(ce, { label: "Against", children: /* @__PURE__ */ l(
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Kt, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        me,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const f = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ p("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(vi, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ p("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        pe,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ l(
        pe,
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
function xg({ spec: e, update: t }) {
  const { fo: n, setFO: r } = ua(e, t), a = n.sparkline, i = a !== void 0, o = n.comparison !== void 0, s = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ p("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      pe,
      {
        label: "Show sparkline",
        checked: i,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    i ? /* @__PURE__ */ p(se, { children: [
      /* @__PURE__ */ l(Kt, { label: "Trend granularity", children: ({ id: u, labelId: m }) => /* @__PURE__ */ l(
        St,
        {
          labelId: m,
          kind: "granularity",
          value: c,
          onChange: (d) => r({ sparkline: { ...a, granularity: d } }),
          renderFixed: (d, f) => /* @__PURE__ */ l(ls, { id: u, value: d, onChange: f, className: "cv-ec-h8 cv-ec-full" })
        }
      ) }),
      o ? null : /* @__PURE__ */ l(
        pe,
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
function Kt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ p("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function Mg({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var le, fe, ae, re;
  const { meta: a } = Ve(), { locale: i } = Ie(), o = et(), { chart: s } = e, c = s.family, u = o.require(c), m = u.queryless ?? !1, d = u.enforcesAxisUnit, f = Wo(e), g = b.useMemo(() => jn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), v = b.useCallback(
    (T) => T && (i == null ? void 0 : i.unitSystem) === "imperial" && g[T] ? g[T].imperialUnit : T,
    [i == null ? void 0 : i.unitSystem, g]
  ), k = b.useMemo(() => Qf(c, o), [c, o]), y = b.useMemo(() => Ko(e, o), [e, o]), w = b.useMemo(() => new Map(k.map((T) => [T.id, T])), [k]), [x, N] = b.useState(void 0), S = b.useMemo(
    () => dg(a, e, x, o),
    [a, e, x, o]
  ), C = b.useMemo(() => Object.values(y).flat(), [y]), M = b.useCallback(
    (T) => {
      N(T), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), _ = b.useMemo(
    () => {
      var T;
      return S.viewLocked ? [S.viewLocked] : [(T = S.sourceCube) == null ? void 0 : T.name, ...S.relatedCubes.map(($) => $.name)].filter(
        Boolean
      );
    },
    [S]
  ), I = b.useMemo(
    () => Object.values(y).every((T) => T.length === 0),
    [y]
  ), E = b.useMemo(() => {
    const T = (y.y ?? [])[0], $ = T ? $e(a, T) : void 0;
    return {
      leftKey: T ? qo($) : void 0,
      leftLabel: T ? Rg($, v($ == null ? void 0 : $.unit)) : void 0
    };
  }, [y, a, v]), D = b.useCallback(
    (T, $) => {
      var W;
      if ($) {
        if (!ug(S, $.cube))
          return "Clear the current fields to use a different dataset.";
        if ($.memberType === "measure" && S.measureSource && $.cube !== S.measureSource)
          return `Measures come from one table (${((W = S.sourceCube) == null ? void 0 : W.title) ?? S.measureSource}). Remove them to switch.`;
        if (d && T === "y" && $.memberType === "measure") {
          const { leftKey: L, leftLabel: V } = E;
          return np($, L, V);
        }
      }
    },
    [S, E, d]
  ), A = E.leftLabel, O = b.useMemo(() => {
    var $;
    const T = {};
    if (c === "bar" || c === "line" || c === "area") {
      const W = ($ = s.mapping) == null ? void 0 : $.series;
      if (W && W.mode === "measures") {
        const L = W.members.map((J) => {
          var ue, Me;
          return { key: J, colorToken: (Me = (ue = W.meta) == null ? void 0 : ue[J]) == null ? void 0 : Me.colorToken };
        }), V = lo(L, s.colors);
        W.members.forEach((J, ue) => {
          T[J] = V[ue];
        });
      }
    }
    return T;
  }, [c, s.mapping, s.colors]), F = b.useCallback(
    (T, $, W) => {
      const L = $e(a, $);
      if (D(T, L)) return;
      let V = W === "geoPoint" && (L != null && L.latMember) && L.lngMember ? Ft(
        Ft(e, c, "lat", L.latMember, "numberDimension", o),
        c,
        "lng",
        L.lngMember,
        "numberDimension",
        o
      ) : Ft(e, c, T, $, W, o);
      const J = u.canonicalTimeWell;
      if (J && T !== J && (y[J] ?? []).length === 0) {
        const ue = Af(a, L == null ? void 0 : L.cube);
        ue && ue.name !== $ && !D(J, ue) && (V = Ft(V, c, J, ue.name, "time", o));
      }
      t(V);
    },
    [D, a, t, e, c, o, u, y]
  ), K = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, P = K.left.map((T) => w.get(T)).filter(Boolean), G = K.bottom.map((T) => w.get(T)).filter(Boolean), ne = (le = y.color) == null ? void 0 : le[0], H = ((fe = y.y) == null ? void 0 : fe.length) ?? 0, q = ne && H > 1 ? `${H} measures × ${((ae = $e(a, ne)) == null ? void 0 : ae.label) ?? "this split"} — one series per measure per value.` : void 0, j = u.hasLegend, Z = (y.y ?? [])[0], z = (T) => {
    var L, V, J, ue;
    if (!T) return;
    const $ = (L = s.mapping) == null ? void 0 : L.series;
    return ($ && $.mode === "measures" ? (J = (V = $.meta) == null ? void 0 : V[T]) == null ? void 0 : J.label : void 0) ?? ((ue = $e(a, T)) == null ? void 0 : ue.label);
  }, U = (T) => {
    var W, L, V, J;
    const $ = (ue, Me) => Me ? /* @__PURE__ */ l(Tp, { spec: e, update: t, axis: ue, title: "Title", auto: z(Me) }) : null;
    switch (T) {
      case "y":
        return $("y", Z);
      // the single value axis
      case "x":
        return $("x", (L = (W = s.mapping) == null ? void 0 : W.category) == null ? void 0 : L.member);
      case "sy":
        return $("y", (V = y.sy) == null ? void 0 : V[0]);
      // scatter Y axis
      case "sx":
        return $("x", (J = y.sx) == null ? void 0 : J[0]);
      // scatter X axis
      default:
        return null;
    }
  }, Q = (T, $) => /* @__PURE__ */ l(
    Ng,
    {
      spec: e,
      update: t,
      well: T,
      placed: y[T.id] ?? [],
      allPlaced: C,
      optionFor: (W) => $e(a, W),
      colorFor: (W) => O[W],
      scope: S,
      blockReason: (W) => D(T.id, W),
      onAdd: (W, L) => F(T.id, W, L),
      badge: T.id === "y" ? A : void 0,
      orientation: $,
      note: T.id === "color" ? q : void 0,
      control: U(T.id)
    },
    T.id
  ), ie = () => {
    const T = w.get("value"), $ = (y.value ?? []).length > 0, W = s.familyOptions ?? {};
    return /* @__PURE__ */ p(se, { children: [
      /* @__PURE__ */ p("div", { className: "cv-edit-kpi-value", children: [
        T ? Q(T, "vertical") : null,
        $ ? /* @__PURE__ */ l(
          rr,
          {
            label: "Time, range & display",
            summary: W.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Cg, { spec: e, update: t })
          }
        ) : null
      ] }),
      $ ? /* @__PURE__ */ p(se, { children: [
        /* @__PURE__ */ l(rr, { label: "Comparison", summary: W.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Sg, { spec: e, update: t }) }),
        /* @__PURE__ */ l(rr, { label: "Sparkline", summary: W.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(xg, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ p("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ p("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !I || m ? /* @__PURE__ */ l(Yp, { spec: e, update: t }) : null,
      /* @__PURE__ */ p("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          Rp,
          {
            currentName: S.viewLocked ?? ((re = S.sourceCube) == null ? void 0 : re.name),
            hasFields: C.length > 0,
            onSelect: M
          }
        ),
        /* @__PURE__ */ l(xp, { spec: e, update: t, cube: f, scopeCubes: _, scope: S })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { className: "cv-edit-overlay-body", children: [
      P.length > 0 ? /* @__PURE__ */ l("div", { className: R("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ie() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        P.map((T) => Q(T, "vertical"))
      ) }) : null,
      /* @__PURE__ */ p("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ p("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Gp, { spec: e, update: t, empty: I && !m })
        ] }),
        G.length > 0 ? /* @__PURE__ */ p("div", { className: "cv-edit-overlay-bottom", children: [
          G.map((T) => Q(T, "horizontal")),
          j && !I ? /* @__PURE__ */ l(_p, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Rg(e, t) {
  const n = Uo(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function cs(e, t) {
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
function ar(e) {
  const t = $i.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Tg({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = b.useState(() => ({
    spec: e,
    issues: ar(e)
  })), [i, o] = b.useState(e);
  b.useEffect(() => {
    a({ spec: e, issues: ar(e) }), o(e);
  }, [e]);
  const s = cs((f) => t(f), n), c = r.spec, u = r.issues, m = u.length === 0, d = b.useCallback(
    (f) => {
      const g = ar(f);
      a({ spec: f, issues: g }), g.length === 0 && (o(f), s(f));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: d };
}
const _g = () => {
};
function Og({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = et(), { draft: s, issues: c, valid: u, committed: m, update: d } = Tg({
    spec: e,
    onChange: t ?? _g,
    debounceMs: r
  }), f = o.get(s.chart.family), g = (f == null ? void 0 : f.queryless) ?? !1, v = m, k = (_) => {
    var I, E, D;
    return (((I = _ == null ? void 0 : _.measures) == null ? void 0 : I.length) ?? 0) > 0 || (((E = _ == null ? void 0 : _.dimensions) == null ? void 0 : E.length) ?? 0) > 0 || (((D = _ == null ? void 0 : _.timeDimensions) == null ? void 0 : D.some((A) => typeof A.granularity == "string")) ?? !1);
  }, y = (_) => {
    var I;
    return (((I = _ == null ? void 0 : _.measures) == null ? void 0 : I.length) ?? 0) > 0;
  }, w = (f == null ? void 0 : f.requiresMeasure) ?? s.chart.family !== "table", x = g || k(s.query) && k(v.query) && (!w || y(s.query) && y(v.query)), N = w && !y(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = b.useCallback(
    (_) => {
      d({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ..._ }
        }
      });
    },
    [s, d]
  ), C = x ? /* @__PURE__ */ l(
    ea,
    {
      query: v.query ?? {},
      chart: v.chart,
      editing: !0,
      updateFamilyOptions: S
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: N }) }), M = n ? /* @__PURE__ */ p(B, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(Ri, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "chart-editor",
      className: R("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ p(Ln, { variant: "destructive", children: [
          /* @__PURE__ */ l(Lr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(En, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(In, { children: /* @__PURE__ */ p("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((_, I) => /* @__PURE__ */ p("li", { children: [
              _.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: _.path }) : null,
              " ",
              _.message
            ] }, I)),
            c.length > 3 ? /* @__PURE__ */ p("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Mg, { spec: s, update: d, toolbar: M, children: C }) })
      ]
    }
  );
}
function Ag({
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
  className: f
}) {
  const g = a || i, [v, k] = b.useState(!1);
  b.useEffect(() => {
    if (!v) return;
    const w = setTimeout(() => k(!1), 1600);
    return () => clearTimeout(w);
  }, [v]), b.useEffect(() => {
    d || k(!1);
  }, [d]);
  const y = () => {
    m == null || m(), k(!0);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: R("cv-editor-toolbar", f),
      children: [
        /* @__PURE__ */ l(
          me,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ p("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ p(B, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(bi, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ p(B, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Ir, {}),
            " Text"
          ] }),
          /* @__PURE__ */ p(B, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Xs, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ p(B, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Zs, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ p("div", { className: "cv-editor-toolbar-actions", children: [
          g ? /* @__PURE__ */ p(se, { children: [
            /* @__PURE__ */ l(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(el, {})
              }
            ),
            /* @__PURE__ */ l(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(tl, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ p(
            B,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(nl, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ p(
            B,
            {
              size: "sm",
              onClick: y,
              disabled: d,
              "aria-live": "polite",
              className: R(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                v && "cv-editor-toolbar-save--saved"
              ),
              children: [
                v ? /* @__PURE__ */ l(Xe, {}) : /* @__PURE__ */ l(Ri, {}),
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
const us = "lg", ms = 12;
function Dg(e, t) {
  const n = t[us];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function Lg(e, t) {
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
const Eg = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Ig(e, t, n, r = ms) {
  const a = Eg[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function ds(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? ms) {
  const a = Ig(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Pg(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return ds(e, a);
}
function Fg(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function $g(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const zg = 12, Vg = 900, jg = 0.4;
function Wg(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Hg({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = vo(), u = e.grid ?? {}, m = u.cols ?? zg, d = u.rowHeight ?? 40, f = u.margin ?? [12, 12], g = u.containerPadding ?? [0, 0], v = Math.max(jg, Math.min(1, c / Vg)), k = Math.round(v / 0.05) * 0.05, y = Math.max(8, Math.round(d * k)), w = [
    Math.round(f[0] * k),
    Math.round(f[1] * k)
  ], x = [
    Math.round(g[0] * k),
    Math.round(g[1] * k)
  ], N = b.useMemo(
    () => ({ [us]: Wg(e.layout) }),
    [e.layout]
  ), S = b.useMemo(
    () => new Map(e.widgets.map((E) => [E.id, E])),
    [e.widgets]
  ), C = b.useRef(o);
  b.useEffect(() => {
    C.current = o;
  }, [o]);
  const M = b.useRef(e.layout);
  b.useEffect(() => {
    M.current = e.layout;
  }, [e.layout]);
  const _ = b.useRef(null), I = b.useCallback(
    (E, D) => {
      const O = Dg(E, D).map((F) => ({ ...F }));
      Bg(M.current, O) || C.current(O);
    },
    []
  );
  return /* @__PURE__ */ l(Zr, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    _i,
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
      onLayoutChange: I,
      children: e.layout.map((E) => {
        const D = S.get(E.i);
        if (!D) return null;
        const A = D.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ p(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${D.title ?? D.type}`,
              "aria-pressed": A,
              onPointerDown: (O) => {
                _.current = { x: O.clientX, y: O.clientY };
              },
              onClick: (O) => {
                const F = _.current;
                F && Math.hypot(O.clientX - F.x, O.clientY - F.y) > 5 || n(D.id);
              },
              onKeyDown: (O) => {
                (O.key === "Enter" || O.key === " ") && (O.preventDefault(), n(D.id));
              },
              className: R(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                A && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(Nr, { widget: D, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: R(Sn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ p("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${D.title ?? D.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), r(D.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(rl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${D.title ?? D.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), a(D.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(al, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${D.title ?? D.type}`,
                      onClick: (O) => {
                        O.stopPropagation(), i(D.id);
                      },
                      className: R("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(xt, {})
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
function Bg(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const qg = b.memo(Hg);
function Ug(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Kg({
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
  const a = Oi({
    extensions: [Di],
    editable: !0,
    content: Ug(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: R(bo, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(ce, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ p("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Gg, { editor: a }),
    /* @__PURE__ */ l(Ai, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function Be({ active: e, onClick: t, title: n, children: r }) {
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
function Gg({ editor: e }) {
  const [, t] = b.useReducer((n) => n + 1, 0);
  return b.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          Be,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(il, {})
          }
        ),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(ol, {})
          }
        ),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(sl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(ll, {})
          }
        ),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(cl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(ul, {})
          }
        ),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(ml, {})
          }
        ),
        /* @__PURE__ */ l(
          Be,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(dl, {})
          }
        )
      ]
    }
  );
}
const Yg = Fr(
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
function Qg({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: R(Yg({ variant: t }), e), ...n });
}
function Jg({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = Ve(), c = b.useMemo(() => Un(o), [o]), u = c.filter((f) => f.type === "cube"), m = c.filter((f) => f.type === "view"), d = c.find((f) => f.name === e);
  return /* @__PURE__ */ p(Re, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(_e, { id: a, className: i, children: /* @__PURE__ */ l(Te, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(ir, { option: d }) : void 0 }) }),
    /* @__PURE__ */ p(Oe, { children: [
      m.length > 0 ? /* @__PURE__ */ p(yr, { children: [
        /* @__PURE__ */ l(kr, { children: "Views" }),
        m.map((f) => /* @__PURE__ */ l(ge, { value: f.name, children: /* @__PURE__ */ l(ir, { option: f }) }, f.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ p(yr, { children: [
        /* @__PURE__ */ l(kr, { children: "Cubes" }),
        u.map((f) => /* @__PURE__ */ l(ge, { value: f.name, children: /* @__PURE__ */ l(ir, { option: f }) }, f.name))
      ] }) : null
    ] })
  ] });
}
function ir({ option: e }) {
  const t = e.type === "view" ? Pr : Si;
  return /* @__PURE__ */ p("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Qg, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const Xg = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Zg(e) {
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
function ev({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(Zg(s));
  };
  return /* @__PURE__ */ p("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ce,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ p(
          Re,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Oe, { children: t.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ce, { label: "Control", children: /* @__PURE__ */ p(Re, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
      /* @__PURE__ */ l(Oe, { children: Dl.options.map((s) => /* @__PURE__ */ l(ge, { value: s, children: Xg[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(tv, { control: r, onChange: a, variables: t })
  ] });
}
function tv({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(nv, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(av, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(iv, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(ov, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(sv, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(lv, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function nv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ l(
      ce,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          rv,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      pe,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function rv({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(dn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === dn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ p(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ p(B, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(Je, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Le, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: dn.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ p(
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
                children: c ? /* @__PURE__ */ l(Xe, { className: "cv-ed-icon-xs" }) : null
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
function av({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = Ge.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ l(
      ce,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ p(
          Re,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ p(Oe, { children: [
                /* @__PURE__ */ l(ge, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ce, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Ge.options.map((s) => {
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
function iv({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ l(
      pe,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      ce,
      {
        label: "Options",
        action: /* @__PURE__ */ p(B, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(kt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ p("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            me,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            B,
            {
              variant: "ghost",
              size: "icon",
              className: R("cv-ed-btn-8", "cv-ed-muted"),
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
function ov({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ l(ce, { label: "From", children: /* @__PURE__ */ p(
      Re,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
          /* @__PURE__ */ p(Oe, { children: [
            /* @__PURE__ */ l(ge, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(ge, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(ge, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ce,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          B,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          Jg,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function sv({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(ce, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    me,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function lv({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(ce, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    me,
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
  return /* @__PURE__ */ p(se, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function cv(e) {
  return { schemaVersion: gt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function uv(e) {
  const t = {
    schemaVersion: gt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function mv(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function oi({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ p("div", { "data-slot": "widget-edit-panel", className: R("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ce,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          me,
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
      /* @__PURE__ */ l(Zr, { spec: cv(t), children: /* @__PURE__ */ l(fp, { createVariable: o, children: /* @__PURE__ */ l("div", { className: R(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Og,
        {
          fill: a,
          spec: uv(e),
          onChange: (s) => n(mv(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Kg, { widget: e, onChange: n }) : /* @__PURE__ */ l(ev, { widget: e, variables: t, onChange: n })
  ] });
}
function dv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ p(se, { children: [
    r ? /* @__PURE__ */ l(
      nn,
      {
        className: R("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ p(
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
function hv({
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
  const u = i !== void 0, [m, d] = b.useState(a), f = r ? u ? i : m : !0, g = b.useId(), v = b.useCallback(() => {
    const k = !f;
    u || d(k), o == null || o(k);
  }, [f, u, o]);
  return /* @__PURE__ */ p(
    "section",
    {
      "data-slot": "section",
      "data-state": f ? "open" : "closed",
      className: R("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          dv,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: f,
            onToggle: v,
            regionId: g
          }
        ),
        f ? /* @__PURE__ */ l("div", { id: g, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function fv(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function pv(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function gv(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function vv(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function bv(e, t) {
  switch (e) {
    case "chart":
      return pv(t);
    case "text":
      return gv(t);
    case "input":
      return vv(t);
  }
}
function yv(e) {
  return { name: e, type: "string" };
}
function kv(e) {
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
const si = {
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
function wv({
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
    t(e.map((d, f) => f === u ? Nv(d, m) : d));
  }, o = (u) => t(e.filter((m, d) => d !== u)), s = () => t([...e, yv(a())]), c = (u, m) => {
    const d = u + m;
    if (d < 0 || d >= e.length) return;
    const f = e.slice();
    [f[u], f[d]] = [f[d], f[u]], t(f);
  };
  return /* @__PURE__ */ l(
    hv,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ p(B, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(kt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ p("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ p("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ p(B, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(kt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        Cv,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((d, f) => f !== m && d.name === u.name && u.name !== ""),
          onChange: (d) => i(m, d),
          onRemove: () => o(m),
          onMove: (d) => c(m, d)
        },
        m
      )) })
    }
  );
}
function Nv(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = kv(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Cv({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, c] = b.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, m = b.useId();
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ p("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => c((d) => !d),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(Je, {}) : /* @__PURE__ */ l(nn, {})
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: si[e.type] }),
          /* @__PURE__ */ p("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(On, {})
              }
            ),
            /* @__PURE__ */ l(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(An, {})
              }
            ),
            /* @__PURE__ */ l(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: R("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(xt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ p("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ce, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ p(Re, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ l(_e, { children: /* @__PURE__ */ l(Te, {}) }),
            /* @__PURE__ */ l(Oe, { children: Pi.options.map((d) => /* @__PURE__ */ l(ge, { value: d, children: si[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ l(
            ce,
            {
              label: "Label",
              htmlFor: m,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                me,
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
            pe,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ l(Sv, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Sv({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      pe,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (i) => t(i)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ce, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      me,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : xv(e.default);
  return /* @__PURE__ */ l(ce, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    me,
    {
      id: n,
      value: a,
      placeholder: Mv(e.type),
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
function xv(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Mv(e) {
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
function fb({
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
  families: f,
  className: g
}) {
  var $, W;
  const [v, k] = b.useState(e), [y, w] = b.useState(e);
  b.useEffect(() => {
    k(e), w(e);
  }, [e]);
  const [x, N] = b.useState(null), S = b.useRef(0), [C, M] = b.useState(null), _ = b.useRef(x), I = b.useRef(C), E = b.useRef(v);
  b.useEffect(() => {
    _.current = x, I.current = C, E.current = v;
  });
  const D = b.useRef(null);
  D.current === null && (D.current = i ?? fv());
  const A = i ?? D.current, O = cs(
    (L) => r == null ? void 0 : r(L),
    o
  ), F = b.useCallback(
    (L) => {
      S.current = Date.now(), k((V) => {
        const J = L(V);
        return O(J), J;
      });
    },
    [O]
  ), K = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === K.current) return;
    const L = 500;
    let V = null;
    const J = () => {
      var _t;
      const ue = Date.now() - S.current;
      if (ue < L) {
        V = setTimeout(J, L - ue);
        return;
      }
      K.current = t;
      const Me = /* @__PURE__ */ new Set();
      ((_t = I.current) == null ? void 0 : _t.kind) === "widget" && Me.add(I.current.id), _.current && Me.add(_.current);
      const Tt = _v(t, E.current, Me);
      k(Tt), n == null || n(Tt);
    };
    return J(), () => {
      V && clearTimeout(V);
    };
  }, [t]);
  const P = b.useCallback(
    (L) => {
      const V = bv(L, A());
      F((J) => ds(J, V)), N(V.id), M({ kind: "widget", id: V.id });
    },
    [F, A]
  ), G = b.useCallback((L) => N(L), []), ne = b.useCallback((L) => {
    N(L), M({ kind: "widget", id: L });
  }, []), H = b.useCallback(
    (L) => {
      F((V) => Fg(V, L)), N((V) => V === L ? null : V), M((V) => (V == null ? void 0 : V.kind) === "widget" && V.id === L ? null : V);
    },
    [F]
  ), q = b.useCallback(
    (L) => {
      const V = A();
      F((J) => Pg(J, L, V)), N(V);
    },
    [F, A]
  ), j = b.useCallback(
    (L) => F((V) => $g(V, L)),
    [F]
  ), Z = b.useCallback(
    (L) => F((V) => {
      const J = Lg(V.layout, L);
      return Tv(V.layout, J) ? V : { ...V, layout: J };
    }),
    [F]
  ), z = b.useCallback(
    (L) => F((V) => ({ ...V, name: L || void 0 })),
    [F]
  ), U = b.useCallback(
    (L) => F((V) => ({ ...V, variables: L })),
    [F]
  ), Q = b.useDeferredValue(v), ie = b.useMemo(
    () => dr.safeParse(Q),
    [Q]
  ), le = b.useCallback(() => {
    const L = dr.safeParse(v);
    L.success && (a == null || a(L.data), w(v));
  }, [v, a]), fe = v !== y, ae = (C == null ? void 0 : C.kind) === "widget" ? v.widgets.find((L) => L.id === C.id) ?? null : null;
  b.useEffect(() => {
    (C == null ? void 0 : C.kind) === "widget" && !v.widgets.some((L) => L.id === C.id) && M(null);
  }, [C, v.widgets]);
  const re = b.useCallback(() => M(null), []), T = (C == null ? void 0 : C.kind) === "variables" ? "Dashboard variables" : ae ? ae.title ?? `${Rv(ae.type)} widget` : "";
  return /* @__PURE__ */ l(Xr, { families: f, children: /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((W = ($ = v.grid) == null ? void 0 : $.margin) == null ? void 0 : W[0]) ?? 12 },
      className: R("cv-dashboard-editor", g),
      children: [
        /* @__PURE__ */ l(
          Ag,
          {
            name: v.name ?? "",
            onNameChange: z,
            onAdd: P,
            onEditVariables: () => M({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: d,
            discardDisabled: !fe,
            onSave: a ? le : void 0,
            saveDisabled: !ie.success || !fe,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        ie.success ? null : /* @__PURE__ */ p("p", { className: "cv-dashboard-editor-validation", children: [
          ie.error.issues.length,
          " validation issue",
          ie.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: C ? null : /* @__PURE__ */ l(
          qg,
          {
            spec: v,
            selectedId: x,
            onSelect: G,
            onEdit: ne,
            onDuplicate: q,
            onDelete: H,
            onLayoutChange: Z
          }
        ) }),
        C ? /* @__PURE__ */ p(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": T,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ p("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ p("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ p(B, { variant: "ghost", size: "sm", onClick: re, children: [
                    /* @__PURE__ */ l(Er, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: T })
                ] }),
                ae ? /* @__PURE__ */ p(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => H(ae.id),
                    children: [
                      /* @__PURE__ */ l(xt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: C.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(wv, { variables: v.variables, onChange: U }) }) : (ae == null ? void 0 : ae.type) === "chart" ? /* @__PURE__ */ l(
                oi,
                {
                  fill: !0,
                  widget: ae,
                  variables: v.variables,
                  onChange: j,
                  onVariablesChange: U
                }
              ) : ae ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                oi,
                {
                  widget: ae,
                  variables: v.variables,
                  onChange: j,
                  onVariablesChange: U
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Rv(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Tv(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function _v(e, t, n) {
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
  Ac as AreaChartFamily,
  dc as AreaFamilyOptionsSchema,
  Rl as AxesOptionsSchema,
  ya as AxisOptionsSchema,
  rb as BUILTIN_CHART_FAMILIES,
  We as BUILTIN_DEFAULTS,
  je as BUILTIN_FAMILY_OPTION_SCHEMAS,
  _c as BarChartFamily,
  uc as BarFamilyOptionsSchema,
  us as CANONICAL_BREAKPOINT,
  Ye as ChartColorTokenSchema,
  Mg as ChartEditOverlay,
  Og as ChartEditor,
  Nl as ChartFamilySchema,
  Hr as ChartInteractionProvider,
  Ii as ChartOptionsSchema,
  so as ChartRenderer,
  $i as ChartSpecSchema,
  Ol as ChartTransformSchema,
  hb as ChartView,
  El as ChartWidgetSchema,
  Tl as ColorAssignmentSchema,
  vc as CondFormatRuleSchema,
  ea as CubeChart,
  Gd as CubeChartSpec,
  Ei as CubeQuerySchema,
  Wn as CubeVizContext,
  ub as CubeVizProvider,
  ut as DEFAULT_COLOR_RAMP,
  ms as DEFAULT_COLS,
  cn as DEFAULT_TRANSFORM_WINDOW,
  br as DEFAULT_UNIT_CONVERSIONS,
  Sn as DRAG_HANDLE_CLASS,
  db as Dashboard,
  fb as DashboardEditor,
  Zr as DashboardProvider,
  dr as DashboardSpecSchema,
  ur as DateRangeSchema,
  kc as EMPTY_FAMILY_DEFAULT,
  wa as EM_DASH,
  qg as EditorCanvas,
  Ag as EditorToolbar,
  Xr as FamilyRegistryOverride,
  bp as FilterBuilder,
  bl as FilterOperatorSchema,
  Cl as FormatKindSchema,
  Dn as FormatOptionsSchema,
  Xl as GRANULARITY_PATTERN,
  Ge as GranularitySchema,
  zl as GridConfigSchema,
  Vc as HeatmapChartFamily,
  yc as HeatmapFamilyOptionsSchema,
  Dl as InputControlKindSchema,
  Ll as InputControlSchema,
  ev as InputWidgetEditor,
  Pl as InputWidgetSchema,
  gh as InputWidgetView,
  Hc as KpiFamily,
  pc as KpiFamilyOptionsSchema,
  $l as LayoutItemSchema,
  yl as LeafFilterSchema,
  xl as LegendOptionsSchema,
  Oc as LineChartFamily,
  mc as LineFamilyOptionsSchema,
  oe as MemberSchema,
  ga as OrderDirSchema,
  wl as OrderSpecSchema,
  Dc as PieChartFamily,
  hc as PieFamilyOptionsSchema,
  mr as QueryFilterSchema,
  Pn as ReferenceLineOptSchema,
  Nr as RenderWidget,
  gt as SCHEMA_VERSION,
  vl as ScalarSchema,
  Ec as ScatterChartFamily,
  fc as ScatterFamilyOptionsSchema,
  Sl as SeriesMappingSchema,
  va as SeriesMetaSchema,
  zi as SpecSchema,
  gc as TableColumnOptSchema,
  nu as TableFamily,
  bc as TableFamilyOptionsSchema,
  Kg as TextWidgetEditor,
  Il as TextWidgetSchema,
  Qd as TextWidgetView,
  kl as TimeDimensionSchema,
  Al as TipTapDocSchema,
  Ml as TooltipOptionsSchema,
  _l as TransformKindSchema,
  kn as VarRefSchema,
  Vl as VariableDeclSchema,
  Pi as VariableTypeSchema,
  Li as VariableValueSchema,
  wv as VariablesPanel,
  So as WidgetChrome,
  oi as WidgetEditPanel,
  Fl as WidgetSpecSchema,
  zf as adaptiveGranularity,
  ds as appendWidget,
  ku as areaChartFamily,
  Aa as assignColors,
  Dd as axisKey,
  bu as barChartFamily,
  Qr as buildFamilyRegistry,
  cb as builtinCharts,
  ze as builtinFamilyDescriptors,
  $n as builtinFamilyRegistry,
  Gl as createCubeClient,
  fv as createIdFactory,
  mo as createQueryResolver,
  fo as createUnitsFormatter,
  Xu as createVariableStore,
  ec as datePattern,
  hr as deepMerge,
  Yr as defaultChartFamilies,
  kv as defaultForType,
  jr as defaultFormatter,
  Yl as fetchMeta,
  sb as formatCategory,
  Ht as formatDateValue,
  Of as geoPointId,
  Cu as heatmapChartFamily,
  Nt as isEmptyValue,
  xe as isVarRef,
  Su as kpiChartFamily,
  yu as lineChartFamily,
  Kl as loadSpec,
  Vr as looksLikeIsoDate,
  Wi as makeChartFormat,
  ob as makeDateFormatter,
  lb as makeFormatter,
  Lg as mergeLayout,
  jn as mergeUnitConversions,
  pv as newChartWidget,
  vv as newInputWidget,
  gv as newTextWidget,
  yv as newVariable,
  bv as newWidget,
  co as normalize,
  Dg as pickCanonicalLayout,
  wu as pieChartFamily,
  Ig as placeNewItem,
  Ed as quantityLabel,
  Fg as removeWidget,
  $g as replaceWidget,
  $d as resolveChart,
  Ru as resolveOptions,
  wc as resolveOptionsWith,
  uo as resolveQuery,
  Uu as resolveRelativeDateRange,
  lo as resolveSeriesColors,
  Gu as resolveValue,
  ab as safeLoadSpec,
  Nu as scatterChartFamily,
  xu as tableChartFamily,
  Vi as toDate,
  Fu as toResultAnnotation,
  Tg as useChartEditorState,
  qi as useChartInteractions,
  vo as useContainerWidth,
  Ve as useCubeMeta,
  po as useCubeQuery,
  Ie as useCubeVizContext,
  go as useDashboard,
  cs as useDebouncedCallback,
  et as useFamilyRegistry,
  mb as useFormatter,
  er as useNormalizedSeries,
  an as useOptionalDashboard,
  ib as validateSpec
};
//# sourceMappingURL=index.js.map
