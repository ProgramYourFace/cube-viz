var wo = Object.defineProperty;
var No = (e, t, n) => t in e ? wo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Zr = (e, t, n) => No(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as f, Fragment as re } from "react/jsx-runtime";
import * as k from "react";
import { useMemo as ee, createContext as Ha, useContext as kr, useState as kt, useCallback as Be, useEffect as Jt, useRef as tt, createElement as So, useSyncExternalStore as Wa, useId as xo, Component as Mo } from "react";
import { ruleX as Ba, text as Ct, ruleY as Ka, colorLegend as Cr, stack as Ua, group as Ro, barX as _o, barY as Oo, lineX as To, lineY as wr, defineChart as Ge, areaY as nr, dot as Do, cell as Ao } from "@tanstack/charts";
import { crosshair as Ga } from "@tanstack/charts/crosshair";
import { scaleBand as Lo } from "@tanstack/charts/scales/band";
import { scaleLinear as cn } from "@tanstack/charts/scales/linear";
import { scalePoint as Eo } from "@tanstack/charts/scales/point";
import { Chart as Po } from "@tanstack/charts/react/core";
import { motion as Ya } from "@tanstack/charts/motion";
import { tooltip as Nr } from "@tanstack/charts/tooltip";
import { d3Curve as Hn } from "@tanstack/charts/d3/shape";
import { scaleLog as ea, scaleSqrt as $o } from "d3-scale";
import { curveNatural as Fo, curveStepAfter as zo, curveMonotoneX as Io } from "d3-shape";
import { z as d } from "zod";
import { clsx as Vo } from "clsx";
import { Minus as Qa, ArrowUp as Nn, ArrowDown as Sn, CalendarRange as Ja, ChevronsUpDown as qo, AreaChart as jo, BarChart3 as Xa, Grid3X3 as Ho, Table as Wo, Gauge as Bo, ScatterChart as Ko, PieChart as Uo, LineChart as Go, AlertCircle as Sr, ChevronLeft as xr, ChevronRight as Xt, ChevronDown as Ye, Check as Qe, ChevronUp as Yo, CalendarIcon as Za, MoreVertical as Qo, RefreshCw as Jo, Image as Xo, Sheet as Zo, Type as Mr, MapPin as ei, Hash as rr, Calendar as ti, Search as es, Table2 as ni, Database as ri, Layers as Rr, Variable as ts, Plus as wt, Trash2 as Ot, ListFilter as ns, Box as ai, EyeOff as ii, Eye as oi, X as ta, Save as si, SlidersHorizontal as rs, Braces as as, Undo2 as is, Redo2 as os, RotateCcw as ss, Pencil as ls, Copy as cs, Bold as us, Italic as ms, Strikethrough as ds, Heading1 as hs, Heading2 as fs, List as ps, ListOrdered as gs, Quote as vs } from "lucide-react";
import * as un from "@radix-ui/react-popover";
import { cva as _r } from "class-variance-authority";
import * as ve from "@radix-ui/react-select";
import bs from "@cubejs-client/core";
import { format as se, isValid as Pt, parseISO as mn, subDays as pe, startOfWeek as dn, endOfWeek as hn, startOfMonth as nt, endOfMonth as Vt, startOfQuarter as rt, endOfQuarter as qt, startOfYear as at, endOfYear as jt, subWeeks as ar, subMonths as it, subQuarters as ot, subYears as st, differenceInCalendarDays as ys, parse as li } from "date-fns";
import { DayPicker as ks, useDayPicker as Cs } from "react-day-picker";
import { pie as ws, radialArc as ir, radialText as Wn, polar as ci } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as ui } from "react-grid-layout";
import { useEditor as mi, EditorContent as di } from "@tiptap/react";
import hi from "@tiptap/starter-kit";
const vt = 2, fn = d.object({ var: d.string().min(1) }).strict();
function Me(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const pn = (e) => d.union([e, fn]), Ns = d.union([d.string(), d.number(), d.boolean()]), ut = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), or = d.union([d.tuple([d.string(), d.string()]), d.string()]), fi = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), ne = d.string().min(1), Ss = d.enum([
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
]), xs = d.object({
  member: ne,
  operator: Ss,
  values: d.array(d.union([Ns, fn])).optional()
}).strict(), sr = d.lazy(
  () => d.union([
    xs,
    d.object({ and: d.array(sr) }).strict(),
    d.object({ or: d.array(sr) }).strict()
  ])
), Ms = d.object({
  dimension: ne,
  granularity: pn(ut).optional(),
  dateRange: pn(or).optional(),
  compareDateRange: d.array(or).optional()
}).strict(), na = d.enum(["asc", "desc"]), Rs = d.union([
  d.record(ne, na),
  d.array(d.tuple([ne, na]))
]), pi = d.object({
  measures: d.array(ne).optional(),
  dimensions: d.array(ne).optional(),
  timeDimensions: d.array(Ms).optional(),
  filters: d.array(sr).optional(),
  segments: d.array(ne).optional(),
  order: Rs.optional(),
  limit: pn(d.number()).optional(),
  offset: pn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), _s = d.string().min(1), kg = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Ue = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Os = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), xn = d.object({
  kind: Os.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: d.string().optional()
}).strict(), ra = d.object({
  label: d.string().optional(),
  colorToken: Ue.optional(),
  stackId: d.string().optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: xn.optional()
}).strict(), Ts = d.object({
  category: d.object({ member: ne }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(ne),
      meta: d.record(ne, ra).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ne,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(ne).optional(),
      pivot: ne,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: d.record(ne, ra).optional()
    }).strict()
  ])
}).strict(), Ds = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), As = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), aa = d.union([d.number(), d.literal("auto")]), ia = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([aa, aa]).optional(),
  tickFormat: xn.optional()
}).strict(), Ls = d.object({
  x: ia.optional(),
  y: ia.optional()
}).strict(), Es = d.object({
  byKey: d.record(d.string(), Ue).optional(),
  ramp: d.array(Ue).optional()
}).strict(), gi = d.object({
  family: _s,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ts.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Ds.optional(),
  tooltip: As.optional(),
  axes: Ls.optional(),
  colors: Es.optional(),
  format: xn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), Ps = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), $s = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Fs = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(ut).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: fi, label: d.string() }).strict()),
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
}).strict(), Or = {
  id: d.string().min(1),
  title: d.string().optional()
}, zs = d.object({ ...Or, type: d.literal("chart"), query: pi.default({}), chart: gi }).strict(), Is = d.object({ ...Or, type: d.literal("text"), doc: Ps }).strict(), Vs = d.object({ ...Or, type: d.literal("input"), control: Fs }).strict(), qs = d.discriminatedUnion("type", [
  zs,
  Is,
  Vs
]), js = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), Hs = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), vi = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Ws = d.object({
  name: d.string().min(1),
  type: vi,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: fi.optional()
}).strict(), bi = {
  schemaVersion: d.literal(vt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, yi = d.object({ ...bi, kind: d.literal("chart"), query: pi.default({}), chart: gi }).strict(), lr = d.object({
  ...bi,
  kind: d.literal("dashboard"),
  variables: d.array(Ws),
  widgets: d.array(qs),
  layout: d.array(js),
  grid: Hs.optional()
}).strict(), ki = d.discriminatedUnion("kind", [yi, lr]);
function ge(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Tr(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function Bs(e) {
  if (!ge(e.axes)) return;
  const t = Tr(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Ks(e) {
  if (!ge(e.mapping)) return;
  const t = e.mapping.series;
  if (!ge(t) || !ge(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!ge(a)) continue;
    const i = Tr(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Us(e) {
  if (!ge(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => ge(n) ? Tr(n, "side") ?? {} : n
  ));
}
function Gs(e) {
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
function oa(e) {
  ge(e) && (e.family === "combo" && Gs(e), Bs(e), Ks(e), Us(e));
}
function Ys(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    oa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      ge(n) && n.type === "chart" && oa(n.chart);
  return t;
}
const Qs = {
  1: Ys
};
function Js(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > vt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${vt} — update the library`
    );
  for (; n < vt; ) {
    const r = Qs[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return ki.parse(t);
}
function Cg(e) {
  try {
    return { ok: !0, spec: Js(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function wg(e) {
  return ki.parse(e);
}
function Xs(e) {
  return bs(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Zs(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function S(...e) {
  return Vo(e);
}
function el({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: S("cv-skeleton", e), ...t });
}
const tl = _r(
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
    className: S(tl({ variant: t }), e),
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
      className: S("cv-alert-title", e),
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
      className: S("cv-alert-description", e),
      ...t
    }
  )
);
_n.displayName = "AlertDescription";
const nl = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, rl = "MMM d, yyyy";
function al(e) {
  if (e instanceof Date) return Pt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Pt(r) ? r : null;
  }
  const t = mn(e);
  if (Pt(t)) return t;
  const n = new Date(e);
  return Pt(n) ? n : null;
}
function Ci(e) {
  return /^\d{4}-\d{2}/.test(e) ? Pt(mn(e)) : !1;
}
function il(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? nl[t] : rl;
}
function Ht(e, t, n) {
  const r = al(e);
  return r ? se(r, il(t, n)) : String(e);
}
function Ng(e, t) {
  return (n) => n == null ? "" : Ht(n, e, t);
}
function Sg(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ht(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ht(e, t.format, t.granularity) : String(e) : Ci(e) ? Ht(e, t.format, t.granularity) : e;
}
const sa = "—", ol = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function la(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function sl(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of ol)
    if (n >= r) return la((e / r).toFixed(t)) + a;
  return la(e.toFixed(t));
}
function ll(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function cl(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? sl(e, n.decimals ?? 1) : ll(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function wi(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ul(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || wi(e.value) ? !0 : typeof e.value == "string" ? Ci(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Dr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? sa : (wi(t) || typeof t == "string" || typeof t == "number") && ul(e) ? Ht(t, n, r) : typeof t == "number" ? cl(t, e) : String(t);
};
function ml(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function xg(e, t) {
  return (n, r) => {
    const a = r ? ml(r, t) : void 0;
    return Dr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function dl(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function hl(e) {
  const t = ut.safeParse(e);
  return t.success ? t.data : void 0;
}
function fl(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = hl(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Ni(e, t, n, r) {
  const a = fl(e, t);
  return {
    value(i, o, s = "value") {
      const c = o ? dl(o, e) : void 0, u = c == null ? void 0 : c.meta;
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
const On = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: Ue.optional()
}).strict(), Ar = d.boolean().optional(), pl = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(On).optional(),
  comparePrevious: Ar
}).strict(), Si = d.enum(["linear", "monotone", "step", "natural"]), gl = d.object({
  curve: Si.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(On).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Ar
}).strict(), vl = d.object({
  curve: Si.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(On).optional(),
  comparePrevious: Ar
}).strict(), bl = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), yl = d.object({
  x: ne,
  y: ne,
  size: ne.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: ne.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(On).optional()
}).strict(), kl = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: ne,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([ne, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: ne.optional(),
    timeDimension: ne.optional(),
    granularity: d.union([ut, fn]).optional(),
    dateRange: d.union([or, fn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: Ue }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), Cl = d.object({
  member: ne,
  label: d.string().optional(),
  format: xn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), wl = d.object({
  member: ne,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: Ue.optional()
}).strict(), Nl = d.object({
  columns: d.array(Cl).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(wl).optional()
}).strict(), Sl = d.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Ue.optional(),
  /** Print each cell's formatted value inside the cell. */
  showValues: d.boolean().optional()
}).strict(), Ve = {
  bar: pl,
  line: gl,
  area: vl,
  pie: bl,
  scatter: yl,
  heatmap: Sl,
  kpi: kl,
  table: Nl
}, qe = {
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
function ca(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function cr(e, t) {
  if (t === void 0) return e;
  if (!ca(e) || !ca(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? cr(e[r], a) : a);
  }
  return n;
}
const xl = { envelope: {}, familyOptions: {} };
function Ml(e, t) {
  return {
    ...cr({ ...t.envelope }, e),
    familyOptions: cr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
function lt(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var o, s;
    for (const c of n) {
      const u = c.data[i] ?? null;
      u === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        value: u,
        key: c.key,
        label: c.label,
        member: ((o = c.meta) == null ? void 0 : o.measure) ?? c.key,
        companion: ((s = c.meta) == null ? void 0 : s.companion) ?? !1,
        i
      });
    }
  }), r;
}
function Kt(e) {
  return e.label || e.key;
}
function We(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Lr(e, t) {
  const n = e.series.map(Kt), r = e.series.map(We), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Cr({ placement: Tt(t.legendPlacement) })), a;
}
function Tt(e) {
  return e === "top" ? "top" : "bottom";
}
function Zt(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function gn(e = 0.2) {
  return Lo().padding(e);
}
function Er() {
  return Eo().padding(0.02);
}
function Nt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? ea().domain(r) : ea();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: cn().domain(r), nice: !1 } : { scale: cn, nice: !0 };
}
function Tn(e) {
  switch (e) {
    case "monotone":
      return Hn(Io);
    case "step":
      return Hn(zo);
    case "natural":
      return Hn(Fo);
    default:
      return;
  }
}
function Pr(e, t) {
  var o, s, c, u, m, h, p, g, v, y;
  const n = e.raw.annotation, r = (b) => {
    var C, N, w, O, M, D;
    if (b)
      return ((C = n == null ? void 0 : n.measures[b]) == null ? void 0 : C.shortTitle) ?? ((N = n == null ? void 0 : n.dimensions[b]) == null ? void 0 : N.shortTitle) ?? ((w = n == null ? void 0 : n.timeDimensions[b]) == null ? void 0 : w.shortTitle) ?? ((O = n == null ? void 0 : n.measures[b]) == null ? void 0 : O.title) ?? ((M = n == null ? void 0 : n.dimensions[b]) == null ? void 0 : M.title) ?? ((D = n == null ? void 0 : n.timeDimensions[b]) == null ? void 0 : D.title) ?? b;
  }, a = e.series[0], i = (b) => {
    var C;
    return b ? (C = b.meta) != null && C.measure ? r(b.meta.measure) : b.label : void 0;
  };
  return {
    x: (s = (o = t.axes) == null ? void 0 : o.x) != null && s.labelHide ? void 0 : ((u = (c = t.axes) == null ? void 0 : c.x) == null ? void 0 : u.label) ?? r((h = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : h.member),
    y: (g = (p = t.axes) == null ? void 0 : p.y) != null && g.labelHide ? void 0 : ((y = (v = t.axes) == null ? void 0 : v.y) == null ? void 0 : y.label) ?? i(a)
  };
}
function $r(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Rl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function Ut(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function Dn(e) {
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
          value: e.percentShare && s > 0 && typeof c.datum.value == "number" ? Ut(c.datum.value / s, e.locale) : n(c),
          color: c.color
        }))
      };
    }
  };
}
function Fr(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [];
  return e.forEach((a, i) => {
    const o = `var(--${a.colorToken ?? "muted-foreground"})`, s = { stroke: o, strokeWidth: 1.25, strokeDasharray: "4 4" }, c = a.axis === "x", u = c ? t[a.value] : void 0;
    if (c && u == null) return;
    if (n != null && n.swap ? !c : c) {
      const h = n != null && n.swap ? a.value : u;
      r.push(Ba([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        Ct([{ v: h, label: a.label }], {
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
      r.push(Ka([h], { id: `cv-ref-${i}`, ...s })), a.label && !c && r.push(
        Ct([{ v: h, label: a.label }], {
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
function xi(e, t, n) {
  const r = e.filter((a) => a.value !== null && !a.companion);
  return r.length ? [
    Ct(r, {
      id: "cv-value-labels",
      x: n != null && n.swap ? "value" : "cat",
      y: n != null && n.swap ? "cat" : "value",
      text: (a) => t.value(a.value, a.member, "label"),
      fill: "currentColor",
      fontSize: 10,
      dy: n != null && n.swap ? 0 : -8,
      dx: n != null && n.swap ? 12 : 0
    })
  ] : [];
}
const _l = Ya({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Ol = Ya({ initial: !1 });
function Je({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o
}) {
  const s = k.useRef(null), [c, u] = k.useState({ w: 0, h: 0 }), m = k.useId().replace(/:/g, "");
  k.useLayoutEffect(() => {
    const p = s.current;
    if (!p || typeof ResizeObserver > "u") return;
    const g = new ResizeObserver((v) => {
      var b;
      const y = (b = v[0]) == null ? void 0 : b.contentRect;
      y && u({ w: Math.floor(y.width), h: Math.floor(y.height) });
    });
    return g.observe(p), () => g.disconnect();
  }, []);
  const h = r ? Math.max(24, c.h || Math.round((c.w || 160) / 5)) : Math.max(i, c.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: s,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: c.w > 0 && /* @__PURE__ */ l(
        Po,
        {
          definition: e,
          renderer: a ? _l : Ol,
          width: c.w,
          height: h,
          ariaLabel: t,
          idPrefix: m,
          onSelect: o
        }
      )
    }
  );
}
function ua(e, t) {
  let n;
  return e === void 0 ? n = t : typeof e == "string" ? n = Number.parseFloat(e) / 100 : n = e > 1 ? e / 100 : e, Number.isFinite(n) || (n = t), Math.min(0.9, Math.max(0, n));
}
function Tl({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = k.useMemo(() => {
    var R, E, T, x, V, q, P, U;
    const o = t.orientation === "horizontal", s = t.stackMode === "percent", c = t.stackMode === "stacked" || s, u = e.series.filter((W) => {
      var K;
      return (K = W.meta) == null ? void 0 : K.companion;
    }), m = u.length ? e.series.filter((W) => {
      var K;
      return !((K = W.meta) != null && K.companion);
    }) : e.series, h = c ? m : e.series, p = lt(e, { series: h }), g = new Map(e.series.map((W) => [Kt(W), We(W)])), v = Pr(e, t), y = o ? (E = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : E.hide : (x = (T = t.axes) == null ? void 0 : T.x) == null ? void 0 : x.hide, b = o ? (V = t.axes) == null ? void 0 : V.x : (q = t.axes) == null ? void 0 : q.y, C = Nt(b), N = ua(r.barCategoryGap, 0.2), w = Rl(t) ?? $r(e.series[0]), O = (W) => s ? Ut(W) : n.value(W, w, "axis"), M = y ? !1 : {
      label: v.x,
      ticks: { format: (W) => n.category(W) }
    }, D = b != null && b.hide ? !1 : { label: v.y, ticks: { format: O } }, _ = s ? Ua({ offset: "normalize" }) : c ? void 0 : Ro(r.barGap === void 0 ? {} : { padding: ua(r.barGap, 0.1) }), $ = {
      id: "cv-bars",
      z: "label",
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (W) => `${W.label} ${W.i}`,
      layout: _,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (W) => {
        const K = g.get(W.label) ?? "var(--chart-1)";
        return W.companion ? `color-mix(in oklab, ${K} 40%, transparent)` : K;
      }
    }, L = [
      o ? _o(p, { ...$, x: "value", y: "cat" }) : Oo(p, { ...$, x: "cat", y: "value" })
    ];
    if (c && !s && u.length) {
      const W = e.categories.map((K, J) => {
        var te, ae, ce;
        return {
          cat: typeof K == "number" ? K : String(K),
          value: u.reduce((oe, fe) => {
            const ke = fe.data[J];
            return typeof ke != "number" ? oe : (oe ?? 0) + ke;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((ae = (te = u[0]) == null ? void 0 : te.meta) == null ? void 0 : ae.measure) ?? ((ce = u[0]) == null ? void 0 : ce.key),
          companion: !0,
          i: J
        };
      });
      if (W.some((K) => K.value !== null)) {
        const K = {
          id: "cv-bars-prev",
          key: (J) => `prev ${J.i}`,
          curve: Tn("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        L.push(
          o ? To(W, { ...K, x: "value", y: "cat" }) : wr(W, { ...K, x: "cat", y: "value" })
        );
      }
    }
    return L.push(...Fr(r.referenceLines, e.categories, { swap: o })), r.showValueLabels && !s && L.push(...xi(p, n, { swap: o })), Ge({
      marks: L,
      x: o ? { scale: C.scale, nice: C.nice, grid: !0, axis: D } : { scale: () => gn(N), axis: M },
      y: o ? { scale: () => gn(N), axis: M } : { scale: C.scale, nice: C.nice, grid: !0, axis: D },
      color: Lr(c ? { ...e, series: h } : e, {
        legend: Zt(t) && h.length > 1,
        legendPlacement: Tt((P = t.legend) == null ? void 0 : P.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: o ? "group-y" : "group-x",
      tooltip: ((U = t.tooltip) == null ? void 0 : U.show) === !1 ? void 0 : Dn({ format: n, percentShare: s }),
      keyboard: !0
    });
  }, [e, t, n, r]), i = e.series.map(Kt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(Je, { definition: a, ariaLabel: i, className: "cv-chart--fill" });
}
function Dl({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, a = r.chrome === "none", i = k.useMemo(() => {
    var g, v, y, b, C, N, w;
    const s = r.connectNulls ?? !1, c = Tn(r.curve ?? "monotone"), u = Pr(e, t), m = Nt((g = t.axes) == null ? void 0 : g.y), h = e.categories.length <= 1, p = e.series.map((O) => {
      var D, _, $, L;
      const M = lt(e, { series: [O], skipNull: s });
      return wr(M, {
        id: `cv-line-${O.key}`,
        x: "cat",
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: c,
        strokeWidth: r.strokeWidth ?? 2,
        strokeDasharray: (D = O.meta) != null && D.companion ? "5 4" : void 0,
        strokeOpacity: (_ = O.meta) != null && _.companion ? 0.55 : void 0,
        stroke: We(O),
        points: !a && !(($ = O.meta) != null && $.companion) && ((((L = O.meta) == null ? void 0 : L.dots) ?? r.dots) === !0 || h)
      });
    });
    return a || (p.push(
      ...Fr(r.referenceLines, e.categories),
      ...xi(
        r.showValueLabels ? lt(e, { skipNull: !0 }) : [],
        n
      )
    ), p.push(Ga({ x: {}, y: !1 }))), Ge({
      marks: p,
      x: {
        scale: Er,
        axis: a || (y = (v = t.axes) == null ? void 0 : v.x) != null && y.hide ? !1 : {
          label: u.x,
          ticks: { format: (O) => n.category(O) }
        }
      },
      y: {
        scale: m.scale,
        nice: m.nice,
        grid: !a,
        axis: a || (C = (b = t.axes) == null ? void 0 : b.y) != null && C.hide ? !1 : {
          label: u.y,
          ticks: {
            format: (O) => {
              var M, D, _;
              return n.value(O, ((D = (M = e.series[0]) == null ? void 0 : M.meta) == null ? void 0 : D.measure) ?? ((_ = e.series[0]) == null ? void 0 : _.key), "axis");
            }
          }
        }
      },
      guides: !a,
      color: Lr(e, {
        legend: !a && Zt(t) && e.series.length > 1,
        legendPlacement: Tt((N = t.legend) == null ? void 0 : N.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: a || ((w = t.tooltip) == null ? void 0 : w.show) === !1 ? void 0 : Dn({ format: n }),
      margin: a ? 4 : void 0,
      keyboard: !a
    });
  }, [e, t, n, r, a]), o = e.series.map(Kt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    Je,
    {
      definition: i,
      ariaLabel: o,
      sparkline: a,
      className: a ? void 0 : "cv-chart--fill"
    }
  );
}
function Al({
  data: e,
  options: t,
  format: n
}) {
  var m, h;
  const r = t.familyOptions ?? {}, a = ((h = (m = t.mapping) == null ? void 0 : m.series) == null ? void 0 : h.mode) === "pivot", i = t.stackMode ?? (a ? "stacked" : "none"), o = i === "stacked" || i === "percent", s = i === "percent", c = k.useMemo(() => {
    var L, R, E, T, x, V, q;
    const p = r.connectNulls ?? !1, g = Tn(r.curve ?? "monotone"), v = r.fillOpacity ?? 0.4, y = r.strokeWidth ?? 2, b = Pr(e, t), C = Nt((L = t.axes) == null ? void 0 : L.y), N = $r(e.series[0]), w = e.series.filter((P) => {
      var U;
      return !((U = P.meta) != null && U.companion);
    }), O = s ? [] : e.series.filter((P) => {
      var U;
      return (U = P.meta) == null ? void 0 : U.companion;
    }), M = new Map(e.series.map((P) => [P.key, We(P)])), D = [], _ = (P) => `cv-area-fill-${P.replace(/[^a-zA-Z0-9_-]/g, "-")}`, $ = o ? void 0 : w.map((P) => ({
      id: _(P.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: We(P), opacity: v * 0.15 },
        { offset: 1, color: We(P), opacity: v }
      ]
    }));
    if (o) {
      const P = lt(e, { series: w, skipNull: p });
      D.push(
        nr(P, {
          id: "cv-area-stack",
          x: "cat",
          y: "value",
          z: "label",
          color: "label",
          // "i" alone collides across series inside a single multi-series mark.
          key: (U) => `${U.key}:${U.i}`,
          curve: g,
          fillOpacity: v,
          // Boundary stroke; evaluated from each z-group's first row → per-series color.
          stroke: (U) => M.get(U.key) ?? "currentColor",
          strokeWidth: y,
          layout: s ? Ua({ offset: "normalize" }) : void 0
        })
      );
    } else
      for (const P of w) {
        const U = lt(e, { series: [P], skipNull: p });
        D.push(
          nr(U, {
            id: `cv-area-${P.key}`,
            x: "cat",
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: g,
            fill: `url(#${_(P.key)})`,
            stroke: We(P),
            strokeWidth: y
          })
        );
      }
    for (const P of O) {
      const U = lt(e, { series: [P], skipNull: p });
      D.push(
        wr(U, {
          id: `cv-area-prev-${P.key}`,
          x: "cat",
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: g,
          strokeWidth: y,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: We(P)
        })
      );
    }
    return D.push(...Fr(r.referenceLines, e.categories)), D.push(Ga({ x: {}, y: !1 })), Ge({
      marks: D,
      gradients: $,
      x: {
        scale: Er,
        axis: (E = (R = t.axes) == null ? void 0 : R.x) != null && E.hide ? !1 : {
          label: b.x,
          ticks: { format: (P) => n.category(P) }
        }
      },
      y: {
        scale: C.scale,
        nice: C.nice,
        grid: !0,
        axis: (x = (T = t.axes) == null ? void 0 : T.y) != null && x.hide ? !1 : {
          label: b.y,
          ticks: {
            format: (P) => s ? Ut(P) : n.value(P, N, "axis")
          }
        }
      },
      color: Lr(e, {
        legend: Zt(t) && e.series.length > 1,
        legendPlacement: Tt((V = t.legend) == null ? void 0 : V.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((q = t.tooltip) == null ? void 0 : q.show) === !1 ? void 0 : Dn({ format: n, percentShare: s }),
      keyboard: !0
    });
  }, [e, t, n, r, o, s]), u = e.series.map(Kt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(Je, { definition: c, ariaLabel: u, className: "cv-chart--fill" });
}
const ma = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Ll({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.series[0], i = $r(a), o = k.useMemo(() => {
    const p = e.categories.map((g, v) => ({
      label: n.category(g),
      value: (a == null ? void 0 : a.data[v]) ?? 0
    }));
    return El(p, r.maxSlices).map((g, v) => ({
      ...g,
      token: ct[v % ct.length]
    }));
  }, [e, n, a, r.maxSlices]), s = o.reduce((p, g) => p + g.value, 0), c = o.some((p) => p.value < 0), u = c || o.length === 0 || s <= 0, m = k.useMemo(() => {
    var M, D;
    if (u) return null;
    const p = (r.innerRadiusPct ?? 0) / 100, g = (r.outerRadiusPct ?? 80) / 100, v = p > 0, y = r.showLabels ?? "percent", b = ws(o, {
      value: "value",
      gapAngle: (r.padAngle ?? 0) * Math.PI / 180
    }), N = [ir(b, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: _ }) => _ * p,
      outerRadius: ({ radius: _ }) => _ * g,
      cornerRadius: r.cornerRadius
    })];
    if (y !== "none") {
      const _ = (L) => y === "name" ? L.label : y === "value" ? n.value(L.value, i, "label") : Ut(L.fraction), $ = v ? (p + g) / 2 : g * 0.75;
      N.push(
        Wn(
          b.filter((L) => L.value > 0),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (L) => L.angle,
            radius: $,
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
      if (N.push(
        Wn([{ id: "cv-pie-center" }], {
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
        const $ = r.centerLabel.label;
        N.push(
          Wn([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => $,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const w = {
      domain: o.map((_) => _.label),
      range: o.map((_) => `var(--${_.token})`)
    };
    Zt(t) && (w.legend = Cr({ placement: Tt((M = t.legend) == null ? void 0 : M.position) }));
    const O = a ? a.label || a.key : "";
    return Ge({
      marks: [
        ci({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: cn().domain([0, Math.PI * 2]) },
          radius: { scale: cn().domain([0, 1]) },
          marks: N
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: w,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((D = t.tooltip) == null ? void 0 : D.show) === !1 ? void 0 : {
        use: Nr,
        className: "cv-chart-tooltip",
        content: (_) => {
          const $ = _[0];
          if (!$) return { rows: [] };
          const L = $.datum;
          return {
            title: L.label,
            rows: [
              {
                label: O,
                value: `${n.value(L.value, i, "tooltip")} (${Ut(L.fraction)})`,
                color: $.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [u, o, s, t, n, r, a, i]);
  if (c)
    return /* @__PURE__ */ l("div", { style: ma, children: "Pie charts can't show negative values" });
  if (!m)
    return /* @__PURE__ */ l("div", { style: ma, children: "No data" });
  const h = o.map((p) => p.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(Je, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function El(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function Pl({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.annotation, i = (m) => {
    var h, p;
    return ((h = a == null ? void 0 : a.measures[m]) == null ? void 0 : h.shortTitle) ?? ((p = a == null ? void 0 : a.dimensions[m]) == null ? void 0 : p.shortTitle) ?? m;
  }, o = r.x ? i(r.x) : "x", s = r.y ? i(r.y) : "y", c = r.size ? i(r.size) : void 0, u = k.useMemo(() => {
    var E, T, x, V, q, P, U, W, K, J, te, ae, ce, oe, fe, ke, De;
    if (!r.x || !r.y) return null;
    const m = Fl(e.raw.rows, r);
    if (m.length === 0) return null;
    const h = !!r.groupBy, p = [];
    if (h)
      for (const B of m)
        B.group !== void 0 && !p.includes(B.group) && p.push(B.group);
    const [g, v] = r.sizeRange ?? [40, 400], y = Math.sqrt(Math.max(g, 0) / Math.PI), b = Math.sqrt(Math.max(v, 0) / Math.PI), C = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    };
    h ? (C.z = "group", C.color = "group") : C.fill = `var(--${ct[0]})`, r.size ? (C.r = (B) => B.size ?? 0, C.rScale = { scale: () => $o().range([y, b]) }) : C.r = 4;
    const N = [Do(m, C)];
    (E = r.referenceLines) == null || E.forEach((B, A) => {
      const z = `var(--${B.colorToken ?? "muted-foreground"})`, j = { stroke: z, strokeWidth: 1.25, strokeDasharray: "4 4" };
      B.axis === "y" ? (N.push(Ka([B.value], { id: `cv-ref-${A}`, ...j })), B.label && N.push(
        Ct([{ v: B.value, label: B.label }], {
          id: `cv-ref-label-${A}`,
          y: "v",
          text: "label",
          fill: z,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (N.push(Ba([B.value], { id: `cv-ref-${A}`, ...j })), B.label && N.push(
        Ct([{ v: B.value, label: B.label }], {
          id: `cv-ref-label-${A}`,
          x: "v",
          text: "label",
          fill: z,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let w;
    h && (w = {
      domain: p,
      range: p.map(
        (B, A) => `var(--${ct[A % ct.length]})`
      )
    }, Zt(t) && (w.legend = Cr({ placement: Tt((T = t.legend) == null ? void 0 : T.position) })));
    const O = (V = (x = t.axes) == null ? void 0 : x.x) != null && V.labelHide ? void 0 : ((P = (q = t.axes) == null ? void 0 : q.x) == null ? void 0 : P.label) ?? o, M = (W = (U = t.axes) == null ? void 0 : U.y) != null && W.labelHide ? void 0 : ((J = (K = t.axes) == null ? void 0 : K.y) == null ? void 0 : J.label) ?? s, D = Nt((te = t.axes) == null ? void 0 : te.x), _ = Nt((ae = t.axes) == null ? void 0 : ae.y), $ = r.x, L = r.y, R = r.size;
    return Ge({
      marks: N,
      x: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (oe = (ce = t.axes) == null ? void 0 : ce.x) != null && oe.hide ? !1 : {
          label: O,
          ticks: { format: (B) => n.value(B, $, "axis") }
        }
      },
      y: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (ke = (fe = t.axes) == null ? void 0 : fe.y) != null && ke.hide ? !1 : {
          label: M,
          ticks: { format: (B) => n.value(B, L, "axis") }
        }
      },
      color: w,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((De = t.tooltip) == null ? void 0 : De.show) === !1 ? void 0 : {
        use: Nr,
        className: "cv-chart-tooltip",
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (B) => {
          const z = B[0];
          if (!z) return { rows: [] };
          const j = z.datum, Y = [
            { label: o, value: n.value(j.x, $, "tooltip") },
            { label: s, value: n.value(j.y, L, "tooltip") }
          ];
          return R && Y.push({
            label: c ?? R,
            value: n.value(j.size, R, "tooltip")
          }), { title: j.group, color: z.color, rows: Y };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, r, o, s, c]);
  return u ? /* @__PURE__ */ l(
    Je,
    {
      definition: u,
      ariaLabel: `${o} vs ${s} scatter chart`,
      className: "cv-chart--fill"
    }
  ) : /* @__PURE__ */ l("div", { style: $l, children: "No data" });
}
const $l = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Fl(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = Bn(r[t.x]), o = Bn(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? Bn(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function Bn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function zl(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function da(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Il(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Vl(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Mi(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Vl(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => Mi(e, t, n), r;
}
function ql({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = zl(t), s = e.raw.rows, c = e.raw.annotation, u = k.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const p = da(s, a), g = da(s, i), v = /* @__PURE__ */ new Map();
    return s.forEach((y, b) => {
      const C = Il(y[o]), N = y[p], w = y[g];
      if (C === null || N === null || N === void 0 || w === null || w === void 0)
        return;
      const O = typeof N == "number" ? N : String(N), M = String(w);
      v.set(`${O}\0${M}`, {
        cat: O,
        label: M,
        value: C,
        key: `${O}|${M}`,
        member: o,
        i: b
      });
    }), [...v.values()];
  }, [s, a, i, o]), m = k.useMemo(() => {
    var N, w, O, M, D, _, $, L, R, E, T, x, V;
    let p = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY;
    for (const q of u)
      q.value < p && (p = q.value), q.value > g && (g = q.value);
    const v = (q) => {
      if (!q) return;
      const P = (c == null ? void 0 : c.dimensions[q]) ?? (c == null ? void 0 : c.timeDimensions[q]) ?? (c == null ? void 0 : c.measures[q]);
      return (P == null ? void 0 : P.shortTitle) ?? (P == null ? void 0 : P.title) ?? q;
    }, y = (w = (N = t.axes) == null ? void 0 : N.x) != null && w.labelHide ? void 0 : ((M = (O = t.axes) == null ? void 0 : O.x) == null ? void 0 : M.label) ?? v(a), b = (_ = (D = t.axes) == null ? void 0 : D.y) != null && _.labelHide ? void 0 : ((L = ($ = t.axes) == null ? void 0 : $.y) == null ? void 0 : L.label) ?? v(i), C = [
      Ao(u, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return r.showValues && C.push(
      Ct(u, {
        id: "cv-heatmap-values",
        x: "cat",
        y: "label",
        text: (q) => n.value(q.value, q.member, "label"),
        fill: "currentColor",
        fontSize: 10
      })
    ), Ge({
      marks: C,
      x: {
        scale: () => gn(0.05),
        axis: (E = (R = t.axes) == null ? void 0 : R.x) != null && E.hide ? !1 : {
          label: y,
          ticks: { format: (q) => n.category(q) }
        }
      },
      y: {
        scale: () => gn(0.05),
        axis: (x = (T = t.axes) == null ? void 0 : T.y) != null && x.hide ? !1 : { label: b }
      },
      color: {
        scale: Mi(p, g, r.colorToken ?? "chart-1")
      },
      tooltip: ((V = t.tooltip) == null ? void 0 : V.show) === !1 ? void 0 : Dn({ format: n })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const h = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(Je, { definition: m, ariaLabel: h, className: "cv-chart--fill" });
}
function jl(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Hl(e) {
  return `cv-kpi-trend--${e}`;
}
function Wl(e) {
  var c, u, m, h;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (p) => r.value(p, a.measure, "kpi"), o = Ri([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : h.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Zl, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Bl, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Bl({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var p;
  const a = n.goodDirection ?? ((p = n.comparison) == null ? void 0 : p.goodDirection) ?? "up", i = t === null ? null : tc(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Kl(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((g) => g !== null), m = i ? i.diff : c ? Ql(c) : 0, h = Hl(jl(m, a));
  return /* @__PURE__ */ f("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ f("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Jl, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Ul, {}) : /* @__PURE__ */ l(Gl, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Yl, { data: e, series: c, colorClass: h }) })
  ] });
}
function Kl(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Ul() {
  return /* @__PURE__ */ f(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Ja, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Gl() {
  return /* @__PURE__ */ f("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Qa, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Yl({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = k.useMemo(() => {
    const a = lt(e, { series: [t], skipNull: !0 }), i = Nt(void 0);
    return Ge({
      marks: [
        nr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: Tn("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15,
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Er, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    Je,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Ql(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Jl({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Qa : a ? Nn : Sn, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ f(
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
const $t = -(2 * Math.PI) / 3, ur = 2 * Math.PI / 3, Xl = ur - $t;
function Zl({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, h;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : ec(e, r)) ?? "chart-1", u = k.useMemo(() => {
    const p = (s - a) / (o - a), g = $t + p * Xl, v = ({ radius: C }) => C * 0.7, y = ir([{ startAngle: $t, endAngle: ur }], {
      id: "cv-gauge-track",
      innerRadius: v,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), b = p > 0 ? [
      y,
      ir([{ startAngle: $t, endAngle: g }], {
        id: "cv-gauge-value",
        innerRadius: v,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [y];
    return Ge({
      marks: [
        ci({
          id: "cv-gauge",
          startAngle: $t,
          endAngle: ur,
          marks: b
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ f("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      Je,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ f("div", { className: "cv-kpi-gauge-center", children: [
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
function ec(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Ri(e, t) {
  for (const n of e) {
    const r = _i(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function tc(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Ri(e, r.value));
  else {
    const s = e[1];
    a = s ? _i(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function _i(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Oi = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: S("cv-table", e), ...t }) })
);
Oi.displayName = "Table";
const Ti = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: S("cv-table-header", e), ...t }));
Ti.displayName = "TableHeader";
const Di = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: S("cv-table-body", e), ...t }));
Di.displayName = "TableBody";
const rn = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: S("cv-table-row", e),
      ...t
    }
  )
);
rn.displayName = "TableRow";
const mr = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: S("cv-table-head", e),
    ...t
  }
));
mr.displayName = "TableHead";
const an = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: S("cv-table-cell", e),
    ...t
  }
));
an.displayName = "TableCell";
const nc = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: S("cv-table-caption", e), ...t }));
nc.displayName = "TableCaption";
const Ai = _r(
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
), H = k.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: S(Ai({ variant: t, size: n }), e),
      ...a
    }
  )
);
H.displayName = "Button";
function rc({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = k.useMemo(
    () => ac(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = k.useState(null), [u, m] = k.useState(0), h = r.sortable !== !1, p = r.pageSize ?? 25, g = k.useMemo(() => {
    if (!s) return a;
    const w = s.dir === "asc" ? 1 : -1;
    return [...a].sort((O, M) => cc(O[s.member], M[s.member]) * w);
  }, [a, s]), v = Math.max(1, Math.ceil(g.length / p)), y = Math.min(u, v - 1), b = g.slice(y * p, y * p + p), C = (w) => {
    h && (c(
      (O) => (O == null ? void 0 : O.member) === w ? { member: w, dir: O.dir === "asc" ? "desc" : "asc" } : { member: w, dir: "desc" }
    ), m(0));
  }, N = r.rowHeight === "compact";
  return /* @__PURE__ */ f("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: S("cv-table-scroll", r.stickyHeader && "cv-table-scroll--sticky"), children: /* @__PURE__ */ f(Oi, { children: [
      /* @__PURE__ */ l(Ti, { className: S(r.stickyHeader && "cv-table-header--sticky"), children: /* @__PURE__ */ f(rn, { children: [
        r.showRowNumbers && /* @__PURE__ */ l(mr, { className: "cv-table-rownum", children: "#" }),
        o.map((w) => /* @__PURE__ */ l(
          mr,
          {
            className: ha(w.align),
            style: w.width ? { width: w.width } : void 0,
            children: h ? /* @__PURE__ */ f(
              H,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: () => C(w.member),
                children: [
                  w.label,
                  /* @__PURE__ */ l(lc, { active: (s == null ? void 0 : s.member) === w.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : w.label
          },
          w.member
        ))
      ] }) }),
      /* @__PURE__ */ f(Di, { children: [
        b.map((w, O) => /* @__PURE__ */ f(rn, { children: [
          r.showRowNumbers && /* @__PURE__ */ l(
            an,
            {
              className: S(
                "cv-table-cell--right cv-table-cell--muted",
                N && "cv-table-cell--compact"
              ),
              children: y * p + O + 1
            }
          ),
          o.map((M) => {
            const D = uc(M.member, w[M.member], r.conditionalFormat);
            return /* @__PURE__ */ l(
              an,
              {
                className: S(ha(M.align), N && "cv-table-cell--compact"),
                style: D ? { color: D } : void 0,
                children: M.render(w[M.member])
              },
              M.member
            );
          })
        ] }, O)),
        b.length === 0 && /* @__PURE__ */ l(rn, { children: /* @__PURE__ */ l(
          an,
          {
            colSpan: o.length + (r.showRowNumbers ? 1 : 0),
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    g.length > p && /* @__PURE__ */ f("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ f("span", { children: [
        y * p + 1,
        "–",
        Math.min((y + 1) * p, g.length),
        " of",
        " ",
        g.length
      ] }),
      /* @__PURE__ */ f("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          H,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((w) => Math.max(0, w - 1)),
            disabled: y === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          H,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((w) => Math.min(v - 1, w + 1)),
            disabled: y >= v - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function ac(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : oc(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = t ? sc(t, c) : void 0, m = t ? c in t.measures : !1, h = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, p = s.align ?? (m ? "right" : "left");
    return {
      member: c,
      label: h,
      align: p,
      width: s.width,
      render: (g) => ic(g, m, c, r)
    };
  });
}
function ic(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function oc(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function sc(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ha(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function lc({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Nn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Sn, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(qo, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function cc(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function uc(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && mc(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function mc(e, t, n) {
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
const et = "cv-sidebar--default", dc = "cv-sidebar--wide", Li = "a date or category", Kn = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: Li, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], hc = [
  { id: "value", label: "Value", hint: "the number that colors each cell", cardinality: "one", kinds: ["number"] },
  { id: "hy", label: "Rows", hint: "a category (one row each)", cardinality: "one", kinds: ["category"] },
  { id: "hx", label: "Columns", hint: Li, cardinality: "one", kinds: ["time", "category"] }
], fc = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], pc = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], gc = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], vc = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], bc = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], je = (e) => bc.indexOf(e), ze = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Xa,
    order: je("bar"),
    component: Tl,
    optionsSchema: Ve.bar,
    defaults: qe.bar,
    wells: Kn,
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
    icon: Go,
    order: je("line"),
    component: Dl,
    optionsSchema: Ve.line,
    defaults: qe.line,
    wells: Kn,
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
    icon: jo,
    order: je("area"),
    component: Al,
    optionsSchema: Ve.area,
    defaults: qe.area,
    wells: Kn,
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
    icon: Uo,
    order: je("pie"),
    component: Ll,
    optionsSchema: Ve.pie,
    defaults: qe.pie,
    wells: fc,
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
    icon: Ko,
    order: je("scatter"),
    component: Pl,
    optionsSchema: Ve.scatter,
    defaults: qe.scatter,
    wells: pc,
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
    icon: Bo,
    order: je("kpi"),
    component: Wl,
    optionsSchema: Ve.kpi,
    defaults: qe.kpi,
    wells: gc,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: dc
  },
  table: {
    family: "table",
    label: "Table",
    icon: Wo,
    order: je("table"),
    component: rc,
    optionsSchema: Ve.table,
    defaults: qe.table,
    wells: vc,
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
    icon: Ho,
    order: je("heatmap"),
    component: ql,
    optionsSchema: Ve.heatmap,
    defaults: qe.heatmap,
    wells: hc,
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
}, yc = ze.bar, kc = ze.line, Cc = ze.area, wc = ze.pie, Nc = ze.scatter, Sc = ze.heatmap, xc = ze.kpi, Mc = ze.table, zr = [
  yc,
  kc,
  Cc,
  wc,
  Nc,
  Sc,
  xc,
  Mc
], Rc = d.any();
function Ir(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? xl;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Rc;
    },
    resolveOptions: (o) => Ml(o, i.defaults(o.family))
  };
  return i;
}
const An = Ir(zr);
function _c(e, t = An) {
  return t.resolveOptions(e);
}
function Oc(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Mg = Object.fromEntries(
  Object.entries(ze).map(([e, t]) => [e, t.component])
);
function Tc({
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
  var v;
  const u = ee(() => _c(t, c), [t, c]), m = ((v = c.get(u.family)) == null ? void 0 : v.queryless) ?? !1;
  if (!m && (a != null && a.loading))
    return /* @__PURE__ */ l(el, { className: "cv-chart-skeleton" });
  if (!m && (a != null && a.error))
    return /* @__PURE__ */ f(Mn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Sr, {}),
      /* @__PURE__ */ l(Rn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(_n, { children: a.error.message })
    ] });
  if (!m && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const h = n && Object.keys(n).length > 0 ? n : Oc(e), p = r ?? Ni(e.raw.annotation, u, Dr), g = (i == null ? void 0 : i[u.family]) ?? c.require(u.family).component;
  return /* @__PURE__ */ l(
    g,
    {
      data: e,
      options: u,
      config: h,
      format: p,
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
], Un = 8;
function fa(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Ei(e, t) {
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
function pa(e, t) {
  const n = Ei(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Dc(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function tn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Dc(e[n]);
  return t;
}
function Ac(e) {
  return {
    measures: tn(e.measures ?? {}),
    dimensions: tn(e.dimensions ?? {}),
    segments: tn(e.segments ?? {}),
    timeDimensions: tn(e.timeDimensions ?? {})
  };
}
function bt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Ln(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = (t == null ? void 0 : t.format) ?? n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Lc(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Ec(e, t) {
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
function Pc(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = En(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function $c(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Fc(e, t, n, r, a = An) {
  const i = Ac(e.annotation()), o = Ec(i, r), s = Pc(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const h = n.measures ?? [];
    if (a.require(t.family).measureOnly && h.length > 0) {
      const p = s[0] ?? {}, g = [
        {
          key: "value",
          label: "Value",
          data: h.map((y) => En(p[y])),
          meta: { ...Ln(bt(i, h[0]), void 0, t.format), measure: h[0] }
        }
      ];
      return pa(g, t.colors), {
        categories: h.map(
          (y) => {
            var b, C;
            return ((b = bt(i, y)) == null ? void 0 : b.shortTitle) ?? ((C = bt(i, y)) == null ? void 0 : C.title) ?? y;
          }
        ),
        series: g,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || fa(g)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Ic(e, c.series, t, i) : Vc(e, c.category.member, c.series, t, i), m = zc(e, c);
  return $c(u, o), pa(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || fa(u)
  };
}
function zc(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Ic(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = bt(r, s), u = i == null ? void 0 : i[s], m = o.map((h) => En(h[s]));
    return {
      key: s,
      label: Lc(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Ln(c, u, n.format), measure: s }
    };
  });
}
function Vc(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, h = { x: [t], y: [s, "measures"] }, g = e.seriesNames(h).filter((C) => {
    const N = C.yValues && C.yValues.length >= 2 ? C.yValues[C.yValues.length - 1] : void 0;
    return N === void 0 || u.has(N);
  }), v = e.chartPivot(h), y = bt(a, i), b = g.map((C) => {
    var R, E;
    const N = (R = C.yValues) == null ? void 0 : R[0], w = C.yValues && C.yValues.length >= 2 ? C.yValues[C.yValues.length - 1] : i, O = bt(a, w), M = (O == null ? void 0 : O.shortTitle) ?? (O == null ? void 0 : O.title) ?? w, D = N ?? C.shortTitle ?? C.title ?? C.key, _ = m ? `${M} · ${D}` : D, $ = v.map((T) => En(T[C.key])), L = (E = n.meta) == null ? void 0 : E[w];
    return {
      key: C.key,
      label: _,
      data: $,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Ln(O ?? y, L, r.format),
        measure: w
      }
    };
  });
  return qc(b, y, r.format);
}
function qc(e, t, n) {
  var m, h, p;
  if (e.length <= Un) return e;
  const r = (g) => g.data.reduce((v, y) => v + (y ?? 0), 0), a = [...e].sort((g, v) => r(v) - r(g)), i = a.slice(0, Un - 1), o = a.slice(Un - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (g, v) => {
    let y = 0, b = !1;
    for (const C of o) {
      const N = C.data[v];
      N !== null && (y += N, b = !0);
    }
    return b ? y : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...Ln(t, void 0, n), ...(p = (h = i[0]) == null ? void 0 : h.meta) != null && p.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function En(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Z = (e) => se(e, "yyyy-MM-dd");
function jc(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [Z(t), Z(t)];
  if (n === "yesterday") {
    const o = pe(t, 1);
    return [Z(o), Z(o)];
  }
  if (n === "this week") return [Z(dn(t)), Z(hn(t))];
  if (n === "this month") return [Z(nt(t)), Z(Vt(t))];
  if (n === "this quarter") return [Z(rt(t)), Z(qt(t))];
  if (n === "this year") return [Z(at(t)), Z(jt(t))];
  if (n === "last week") {
    const o = ar(t, 1);
    return [Z(dn(o)), Z(hn(o))];
  }
  if (n === "last month") {
    const o = it(t, 1);
    return [Z(nt(o)), Z(Vt(o))];
  }
  if (n === "last quarter") {
    const o = ot(t, 1);
    return [Z(rt(o)), Z(qt(o))];
  }
  if (n === "last year") {
    const o = st(t, 1);
    return [Z(at(o)), Z(jt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [Z(pe(t, a - 1)), Z(t)] : i.startsWith("week") ? [Z(pe(t, a * 7 - 1)), Z(t)] : i.startsWith("month") ? [Z(nt(it(t, a))), Z(Vt(it(t, 1)))] : i.startsWith("quarter") ? [Z(rt(ot(t, a))), Z(qt(ot(t, 1)))] : [Z(at(st(t, a))), Z(jt(st(t, 1)))];
}
function St(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Hc = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Wc(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Gt(e, t, n) {
  var r;
  if (Me(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Bc(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Gt(o, t, n);
    if (!St(s))
      if (Array.isArray(s))
        for (const c of s)
          St(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? jc(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Kc(e, t, n) {
  if ("and" in e) {
    const r = dr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = dr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Bc(e, t, n);
}
function dr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Kc(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Uc(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Gt(e.granularity, t, n);
    St(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Gt(e.dateRange, t, n);
    St(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Pi(e, t, n) {
  const r = Hc(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Uc(i, r, t))), e.filters !== void 0) {
    const i = dr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = Gt(e.limit, r, t);
    St(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = Gt(e.offset, r, t);
    St(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Gc() {
  let e, t;
  return (n, r, a) => {
    const i = Pi(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Yc(e, t) {
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
class Qc extends Error {
}
const Jc = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Qc(`"${e}" cannot be parsed into a number`);
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
function ga(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Xc extends Error {
}
class va extends Error {
}
class Zc extends Error {
}
class Gn extends Error {
}
class eu extends Error {
}
class tu {
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
      throw new va(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return ga(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Zc(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Gn(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Gn(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, h = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof h == "number")
        o = this.cls.mul(o, h);
      else if (ga(h))
        o = this.cls.mul(o, this.convertFraction(h));
      else
        throw new Gn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new va(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const h = this.describe(m);
      if (o.indexOf(m) === -1 && h.system === c) {
        const g = this.to(m);
        if (i ? this.cls.gt(g, s) : this.cls.lt(g, s))
          continue;
        (u === null || (i ? this.cls.lte(g, s) && this.cls.gt(g, u.val) : this.cls.gte(g, s) && this.cls.lt(g, u.val))) && (u = {
          val: g,
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
        throw new eu(`Meausure "${t}" not found.`);
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
    throw new Xc(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function nu(e) {
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
function ru(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = nu(e);
  return (r) => new tu({
    measures: e,
    unitCache: n,
    cls: Jc
  }, r);
}
const au = {
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
}, iu = {
  systems: {
    metric: au
  }
}, ou = {
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
}, su = {
  systems: {
    SI: ou
  }
}, lu = {
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
}, cu = {
  systems: {
    SI: lu
  }
}, uu = {
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
}, mu = {
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
}, du = {
  systems: {
    metric: uu,
    imperial: mu
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
}, hu = {
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
}, fu = {
  systems: {
    SI: hu
  }
}, pu = {
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
}, gu = {
  systems: {
    SI: pu
  }
}, vu = {
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
}, bu = {
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
}, yu = {
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
}, ku = {
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
}, Cu = {
  systems: {
    bit: vu,
    byte: bu,
    IECBit: yu,
    IECByte: ku
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
}, wu = {
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
}, Nu = {
  systems: {
    metric: wu
  }
}, Su = {
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
}, xu = {
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
}, Mu = {
  systems: {
    SI: Su,
    nutrition: xu
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
}, Ru = {
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
}, _u = {
  systems: {
    SI: Ru
  }
}, Ou = {
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
}, Tu = {
  systems: {
    SI: Ou
  }
}, Du = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Au = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Lu = {
  systems: {
    metric: Du,
    imperial: Au
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
}, Eu = {
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
}, Pu = {
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
}, $u = {
  systems: {
    metric: Eu,
    imperial: Pu
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
}, Fu = {
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
}, zu = {
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
}, Iu = {
  systems: {
    metric: Fu,
    imperial: zu
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
}, Vu = {
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
}, qu = {
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
}, ju = {
  systems: {
    metric: Vu,
    imperial: qu
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
}, Hu = {
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
}, Wu = {
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
}, Bu = {
  systems: {
    metric: Hu,
    imperial: Wu
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
}, Ku = {
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
}, Uu = {
  systems: {
    SI: Ku
  }
}, Gu = {
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
}, Yu = {
  systems: {
    unit: Gu
  }
}, Qu = {
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
}, Ju = {
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
}, Xu = {
  systems: {
    metric: Qu,
    imperial: Ju
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
}, Zu = {
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
}, em = {
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
}, tm = {
  systems: {
    metric: Zu,
    imperial: em
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
}, nm = {
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
}, rm = {
  systems: {
    SI: nm
  }
}, am = {
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
}, im = {
  systems: {
    SI: am
  }
}, om = {
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
}, sm = {
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
}, lm = {
  systems: {
    metric: om,
    imperial: sm
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
}, cm = {
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
}, um = {
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
}, mm = {
  systems: {
    metric: cm,
    imperial: um
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
}, dm = {
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
}, hm = {
  systems: {
    SI: dm
  }
}, fm = {
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
}, pm = {
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
}, vm = {
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
}, bm = {
  systems: {
    SI: vm
  }
}, ym = {
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
}, km = {
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
}, Cm = {
  systems: {
    metric: ym,
    imperial: km
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
}, wm = {
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
}, Nm = {
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
}, Sm = {
  systems: {
    metric: wm,
    imperial: Nm
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
}, xm = {
  acceleration: iu,
  angle: su,
  apparentPower: cu,
  area: du,
  charge: fu,
  current: gu,
  digital: Cu,
  each: Nu,
  energy: Mu,
  force: _u,
  frequency: Tu,
  illuminance: Lu,
  length: $u,
  mass: Iu,
  massFlowRate: ju,
  pace: Bu,
  partsPer: Uu,
  pieces: Yu,
  power: Xu,
  pressure: tm,
  reactiveEnergy: rm,
  reactivePower: im,
  speed: lm,
  torque: gm,
  temperature: mm,
  time: hm,
  voltage: bm,
  volume: Cm,
  volumeFlowRate: Sm
}, Mm = ru(xm), Rm = {
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
function _m(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Mm(t).from(e.from).to(e.to)
  };
}
const hr = {
  ...Object.fromEntries(
    Object.entries(Rm).map(([e, t]) => [e, _m(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Pn(e) {
  return e ? { ...hr, ...e } : hr;
}
function Om(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Tm(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Dm(e) {
  return e != null && e.quantity ? Tm(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Am = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function $i(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ba(e, t) {
  const n = e * (Am[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${$i(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Yn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return $i((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Lm(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ya(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Fi(e = hr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Dr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return ba(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ya(Yn(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return ba(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return ya(Yn(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? Lm(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Yn(n, t)}${u}`;
  };
}
const $n = Ha(null);
$n.displayName = "CubeVizContext";
function Le() {
  const e = kr($n);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Xe() {
  return Le().families;
}
function Em(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Rg({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  children: o
}) {
  const s = (i ?? []).map((y) => y.family).join("|"), c = ee(
    () => Ir(zr, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [s]
  ), u = ee(
    () => Em(e) ? Xs(e) : e,
    [e]
  ), m = ee(
    () => {
      var y;
      return {
        chartRamp: (y = t == null ? void 0 : t.chartRamp) != null && y.length ? t.chartRamp : ct,
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
  ), v = ee(
    () => ({
      cubeClient: u,
      registry: p,
      families: c,
      locale: h,
      theme: m,
      maps: g
    }),
    [u, p, c, h, m, g]
  );
  return /* @__PURE__ */ l($n.Provider, { value: v, children: /* @__PURE__ */ l(
    "div",
    {
      className: S(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: o
    }
  ) });
}
function Vr({
  families: e,
  children: t
}) {
  const n = Le(), r = (e ?? []).map((i) => i.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: Ir(zr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(re, { children: t }) : /* @__PURE__ */ l($n.Provider, { value: a, children: t });
}
function Pm(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const $m = 5e3;
function Fm(e, t) {
  const { cubeClient: n } = Le(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: $m } : e,
    [e]
  ), i = ee(() => JSON.stringify(a), [a]), [o, s] = kt({ isLoading: !r }), [c, u] = kt(0), m = Be(() => u((h) => h + 1), []);
  return Jt(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let h = !0;
    const p = new AbortController();
    return s((g) => ({ resultSet: g.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: p.signal }).then((g) => {
      h && s({
        resultSet: g,
        isLoading: !1
      });
    }).catch((g) => {
      h && s({
        isLoading: !1,
        error: g instanceof Error ? g : new Error(String(g))
      });
    }), () => {
      h = !1, p.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Fn = Ha(null);
Fn.displayName = "DashboardContext";
function qr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = tt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Yc(r, t), key: r });
  const i = a.current.store, o = zm(i, r);
  return So(Fn.Provider, { value: o }, n);
}
function zm(e, t) {
  const n = Be(
    (i, o) => e.set(i, o),
    [e]
  ), r = Be(
    (i) => Pi(i, e.getAll(), t),
    [e, t]
  ), a = Be(
    (i) => Wc(i, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Im(e) {
  const t = Wa(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function zi() {
  const e = kr(Fn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Im(e);
}
function jr() {
  return kr(Fn);
}
const Vm = () => () => {
};
function Qn(e, t, n) {
  var w;
  const r = jr(), { locale: a } = Le(), i = Xe(), o = tt(null);
  o.current === null && (o.current = Gc());
  const s = o.current, c = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !c, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), h = Wa(
    u && r ? r.store.subscribe : Vm,
    m,
    m
  ), { resultSet: p, isLoading: g, error: v, refetch: y } = Fm(h, { skip: n == null ? void 0 : n.skip }), b = ((w = t.format) == null ? void 0 : w.unitSystem) ?? (a == null ? void 0 : a.unitSystem), C = ee(() => Pn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (p)
      return Fc(p, t, h, { unitSystem: b, conversions: C }, i);
  }, [p, t, h, b, C, i]), isLoading: g, error: v, refetch: y, resolvedQuery: h };
}
function Ie() {
  const { cubeClient: e } = Le(), [t, n] = kt({ isLoading: !0 });
  return Jt(() => {
    let r = !0;
    return n({ isLoading: !0 }), Zs(e).then((a) => {
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
function _g() {
  const { locale: e } = Le(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? Fi(Pn(n)),
    [t, n]
  );
}
function Ii() {
  const [e, t] = kt(0), n = tt(null), r = tt(null), a = tt(null), i = tt(0), o = Be((u) => {
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
      const h = new ResizeObserver((p) => {
        var g, v;
        for (const y of p) {
          const b = ((v = (g = y.contentBoxSize) == null ? void 0 : g[0]) == null ? void 0 : v.inlineSize) ?? y.contentRect.width;
          o(b);
        }
      });
      h.observe(u), r.current = h;
    },
    [o, s]
  );
  return Jt(() => s, [s]), [c, e];
}
const qm = "day";
function jm(e, t) {
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
        granularity: r.granularity ?? qm,
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
const Q = (e) => se(e, "yyyy-MM-dd");
function Hm(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = mn(e[0]), i = mn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = ys(i, a) + 1;
    return [Q(pe(a, o)), Q(pe(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = pe(t, 1);
    return [Q(a), Q(a)];
  }
  if (n === "yesterday") {
    const a = pe(t, 2);
    return [Q(a), Q(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [Q(pe(t, 2 * a - 1)), Q(pe(t, a))];
    if (i.startsWith("week")) return [Q(pe(t, 14 * a - 1)), Q(pe(t, 7 * a))];
    if (i.startsWith("month"))
      return [Q(nt(it(t, 2 * a))), Q(pe(nt(it(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [Q(rt(ot(t, 2 * a))), Q(pe(rt(ot(t, a)), 1))];
    if (i.startsWith("year"))
      return [Q(at(st(t, 2 * a))), Q(pe(at(st(t, a)), 1))];
  }
  if (n === "this week") {
    const a = ar(t, 1);
    return [Q(dn(a)), Q(hn(a))];
  }
  if (n === "this month") {
    const a = it(t, 1);
    return [Q(nt(a)), Q(Vt(a))];
  }
  if (n === "this quarter") {
    const a = ot(t, 1);
    return [Q(rt(a)), Q(qt(a))];
  }
  if (n === "this year") {
    const a = st(t, 1);
    return [Q(at(a)), Q(jt(a))];
  }
  if (n === "last week") {
    const a = ar(t, 2);
    return [Q(dn(a)), Q(hn(a))];
  }
  if (n === "last month") {
    const a = it(t, 2);
    return [Q(nt(a)), Q(Vt(a))];
  }
  if (n === "last quarter") {
    const a = ot(t, 2);
    return [Q(rt(a)), Q(qt(a))];
  }
  if (n === "last year") {
    const a = st(t, 2);
    return [Q(at(a)), Q(jt(a))];
  }
}
function Wm(e, t, n = An) {
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
  const s = Hm(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Bm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Hr({ query: e, chart: t, onState: n, editing: r, updateFamilyOptions: a }) {
  var L;
  const { registry: i, locale: o } = Le(), s = Xe(), c = ((L = s.get(t.family)) == null ? void 0 : L.queryless) ?? !1, u = ee(() => {
    var R;
    return (R = t.format) != null && R.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), m = ee(() => {
    const R = e ?? {};
    return R.timezone || !(o != null && o.timezone) ? R : { ...R, timezone: o.timezone };
  }, [e, o == null ? void 0 : o.timezone]), { data: h, isLoading: p, error: g, refetch: v, resolvedQuery: y } = Qn(
    m,
    u,
    { skip: c }
  ), b = ee(() => jm(m, u), [m, u]), C = Qn(
    (b == null ? void 0 : b.query) ?? m,
    (b == null ? void 0 : b.chart) ?? u,
    { skip: !b }
  ), N = ee(
    () => Wm(y, u, s),
    [y, u, s]
  ), w = Qn(
    (N == null ? void 0 : N.query) ?? m,
    u,
    { skip: !N, skipResolve: !0 }
  ), O = ee(
    () => ({ [u.family]: Pm(i, u.family, s) }),
    [i, u.family, s]
  ), M = ee(() => {
    let R = h ?? Bm;
    if (b && C.data) {
      R = { ...R, series: C.data.series, categories: C.data.categories };
      const E = R.raw.rows.length > 0, T = R.series.some((x) => x.data.some((V) => V !== null));
      R = { ...R, empty: !E && !T };
    }
    if (N && w.data) {
      if (N.mode === "kpiRow") {
        const E = w.data.raw.rows[0];
        if (E) {
          const T = R.raw.rows[0];
          R = {
            ...R,
            raw: { ...R.raw, rows: T ? [T, E] : [E] }
          };
        }
      } else if (!w.data.empty) {
        const E = new Map(w.data.series.map((T) => [T.key, T]));
        if (!R.empty && R.series.length > 0) {
          const T = R.categories.length, x = R.series.map((V) => {
            const q = E.get(V.key), P = Array.from({ length: T }, (U, W) => (q == null ? void 0 : q.data[W]) ?? null);
            return {
              ...V,
              key: `${V.key}__prev`,
              label: `${V.label} (prev)`,
              colorToken: V.colorToken,
              data: P,
              meta: { ...V.meta, companion: !0 }
            };
          });
          R = { ...R, series: [...R.series, ...x] };
        } else {
          const T = w.data.series.map((x) => ({
            ...x,
            key: `${x.key}__prev`,
            label: `${x.label} (prev)`,
            data: [...x.data],
            meta: { ...x.meta, companion: !0 }
          }));
          R = {
            ...R,
            categories: w.data.categories,
            series: T,
            empty: !1
          };
        }
      }
    }
    return R;
  }, [h, b, C.data, N, w.data]);
  Jt(() => {
    n == null || n({ rows: M.raw.rows, refetch: v, isLoading: p });
  }, [n, M.raw.rows, v, p]);
  const D = {}, _ = ee(
    () => o.formatValue ?? Fi(Pn(o.units)),
    [o.formatValue, o.units]
  ), $ = ee(
    () => Ni(M.raw.annotation, u, _, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [M.raw.annotation, u, _, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ l(
    Tc,
    {
      data: M,
      options: u,
      config: D,
      format: $,
      state: c ? { loading: !1 } : { loading: p && !h, error: g },
      components: O,
      registry: s,
      editing: r,
      updateFamilyOptions: a
    }
  );
}
function Km({ spec: e }) {
  return /* @__PURE__ */ l(Hr, { query: e.query, chart: e.chart });
}
const Vi = "cube-viz-prose";
function Um(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Gm({ doc: e }) {
  const t = Um(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = mi(
    {
      extensions: [hi],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(Vi) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(di, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const on = [
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
], Ym = Object.fromEntries(
  on.map((e) => [e.value, e.label])
);
function ka(e) {
  return Ym[e.trim().toLowerCase()] ?? e;
}
const Qm = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Jm({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Cs(), a = S(Ai({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ f("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: S(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(xr, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: se(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: S(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Xt, {})
      }
    )
  ] });
}
function Xm({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: S(
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
function qi({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    ks,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: S("cv-cal", e),
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
        MonthCaption: Jm,
        DayButton: Xm,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? xr : Xt, { className: S("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function we({
  ...e
}) {
  return /* @__PURE__ */ l(un.Root, { "data-slot": "popover", ...e });
}
function Ne({
  ...e
}) {
  return /* @__PURE__ */ l(un.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Se({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(un.Portal, { children: /* @__PURE__ */ l(
    un.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: S("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Root, { "data-slot": "select", ...e });
}
function fr({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Group, { "data-slot": "select-group", ...e });
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ l(ve.Value, { "data-slot": "select-value", ...e });
}
function Oe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    ve.Trigger,
    {
      "data-slot": "select-trigger",
      className: S("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(ve.Icon, { asChild: !0, children: /* @__PURE__ */ l(Ye, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Zm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Yo, {})
    }
  );
}
function ed({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Ye, {})
    }
  );
}
function Te({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ l(ve.Portal, { children: /* @__PURE__ */ f(
    ve.Content,
    {
      "data-slot": "select-content",
      className: S(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Zm, {}),
        /* @__PURE__ */ l(
          ve.Viewport,
          {
            className: S(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(ed, {})
      ]
    }
  ) });
}
function pr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ve.Label,
    {
      "data-slot": "select-label",
      className: S("cv-select-label", e),
      ...t
    }
  );
}
function he({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    ve.Item,
    {
      "data-slot": "select-item",
      className: S("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(ve.ItemIndicator, { children: /* @__PURE__ */ l(Qe, {}) }) }),
        /* @__PURE__ */ l(ve.ItemText, { children: t })
      ]
    }
  );
}
const xt = "cv-field", td = "cv-field-label", Ft = "yyyy-MM-dd";
function nd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ca(e) {
  if (!e) return;
  const t = li(e, Ft, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function rd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Qm, [i, o] = kt(!1), s = typeof e == "string", [c, u] = nd(e), m = Ca(c), h = Ca(u), p = m ? { from: m, to: h } : void 0;
  let g;
  s ? g = ka(e) : m && h ? g = `${se(m, "MMM d, yyyy")} – ${se(h, "MMM d, yyyy")}` : m ? g = se(m, "MMM d, yyyy") : g = "Pick a date range";
  const v = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ f(we, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      H,
      {
        variant: "outline",
        className: S(
          "cv-daterange-trigger",
          g === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Za, {}),
          g
        ]
      }
    ) }),
    /* @__PURE__ */ f(Se, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((y) => /* @__PURE__ */ l(
        H,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(y), o(!1);
          },
          children: ka(y)
        },
        y
      )) }),
      /* @__PURE__ */ l(
        qi,
        {
          mode: "range",
          selected: p,
          defaultMonth: m,
          disabled: v,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([se(y.from, Ft), se(y.to, Ft)]) : y != null && y.from ? t([se(y.from, Ft), se(y.from, Ft)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const ad = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function id(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function od(e) {
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
function sd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = zi(), i = r.rangeVariable ? od(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? id(i) : ad), s = typeof e == "string" ? e : "", c = o.join(",");
  return Jt(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ f(
    Re,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Oe, { className: xt, children: /* @__PURE__ */ l(_e, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Te, { children: o.map((u) => /* @__PURE__ */ l(he, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function ld({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: S(xt, "cv-field--multi"),
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
  return /* @__PURE__ */ f(
    Re,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Oe, { className: xt, children: /* @__PURE__ */ l(_e, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Te, { children: r.options.map((i) => /* @__PURE__ */ l(he, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function cd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = Ie(), o = ee(() => {
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
  return /* @__PURE__ */ f(
    "select",
    {
      className: xt,
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
function ud({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: xt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function md({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: xt,
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
function dd({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ f("label", { className: "cv-toggle", children: [
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
const hd = {
  dateRange: rd,
  granularity: sd,
  select: ld,
  memberSelect: cd,
  text: ud,
  number: md,
  toggle: dd
};
function fd({ control: e, title: t }) {
  var g;
  const { registry: n } = Le(), { decls: r, resolveValue: a, setVar: i } = zi(), o = ee(
    () => r.find((v) => v.name === e.variable),
    [r, e.variable]
  ), s = xo();
  if (!o)
    return /* @__PURE__ */ f("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((g = n.controls) == null ? void 0 : g[c]) ?? hd[c], m = a(e.variable), h = (v) => i(e.variable, v), p = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: h, decl: o, control: e.control }) : /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ l("label", { className: td, htmlFor: s, children: p }),
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
const ji = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: S(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
ji.displayName = "Card";
const Hi = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: S(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
Hi.displayName = "CardHeader";
const Wi = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: S("cv-card-title", e),
      ...t
    }
  )
);
Wi.displayName = "CardTitle";
const pd = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: S("cv-card-description", e), ...t })
);
pd.displayName = "CardDescription";
const gd = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: S("cv-card-action", e),
      ...t
    }
  )
);
gd.displayName = "CardAction";
const Bi = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: S("cv-card-content", e), ...t })
);
Bi.displayName = "CardContent";
const vd = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: S("cv-card-footer", e), ...t })
);
vd.displayName = "CardFooter";
const vn = "cube-viz-drag-handle";
function Ki(e) {
  var s;
  const { registry: t } = Le(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ f(ji, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ f(
      Hi,
      {
        ...i,
        className: S(vn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(Wi, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Bi, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class wa extends Mo {
  constructor() {
    super(...arguments);
    Zr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ f(Mn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Sr, {}),
      /* @__PURE__ */ l(Rn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(_n, { children: n.message })
    ] }) : this.props.children;
  }
}
function bd(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function yd(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function kd(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Cd = /* @__PURE__ */ (() => {
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
let pt = null;
function Ui(e = {}) {
  return pt || (e.includeStyleProperties ? (pt = e.includeStyleProperties, pt) : (pt = Ke(window.getComputedStyle(document.documentElement)), pt));
}
function bn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function wd(e) {
  const t = bn(e, "border-left-width"), n = bn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Nd(e) {
  const t = bn(e, "border-top-width"), n = bn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Gi(e, t = {}) {
  const n = t.width || wd(e), r = t.height || Nd(e);
  return { width: n, height: r };
}
function Sd() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ye = 16384;
function xd(e) {
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
async function Md(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Rd(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Md(a);
}
const be = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || be(n, t);
};
function _d(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Od(e, t) {
  return Ui(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Td(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? _d(n) : Od(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function Na(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = Cd();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Td(o, n, a, r)), t.appendChild(s);
}
function Dd(e, t, n) {
  Na(e, t, ":before", n), Na(e, t, ":after", n);
}
const Sa = "application/font-woff", xa = "image/jpeg", Ad = {
  woff: Sa,
  woff2: Sa,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: xa,
  jpeg: xa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Ld(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Wr(e) {
  const t = Ld(e).toLowerCase();
  return Ad[t] || "";
}
function Ed(e) {
  return e.split(/,/)[1];
}
function gr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Pd(e, t) {
  return `data:${t};base64,${e}`;
}
async function Yi(e, t, n) {
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
const Jn = {};
function $d(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Br(e, t, n) {
  const r = $d(e, t, n.includeQueryParams);
  if (Jn[r] != null)
    return Jn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Yi(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Ed(s)));
    a = Pd(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return Jn[r] = a, a;
}
async function Fd(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : yn(t);
}
async function zd(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return yn(s);
  }
  const n = e.poster, r = Wr(n), a = await Br(n, r, t);
  return yn(a);
}
async function Id(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await zn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Vd(e, t) {
  return be(e, HTMLCanvasElement) ? Fd(e) : be(e, HTMLVideoElement) ? zd(e, t) : be(e, HTMLIFrameElement) ? Id(e, t) : e.cloneNode(Qi(e));
}
const qd = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Qi = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function jd(e, t, n) {
  var r, a;
  if (Qi(t))
    return t;
  let i = [];
  return qd(e) && e.assignedNodes ? i = Ke(e.assignedNodes()) : be(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ke(e.contentDocument.body.childNodes) : i = Ke(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || be(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => zn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Hd(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Ui(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), be(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Wd(e, t) {
  be(e, HTMLTextAreaElement) && (t.innerHTML = e.value), be(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Bd(e, t) {
  if (be(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Kd(e, t, n) {
  return be(t, Element) && (Hd(e, t, n), Dd(e, t, n), Wd(e, t), Bd(e, t)), t;
}
async function Ud(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await zn(u, t, !0));
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
async function zn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Vd(r, t)).then((r) => jd(e, r, t)).then((r) => Kd(e, r, t)).then((r) => Ud(r, t));
}
const Ji = /url\((['"]?)([^'"]+?)\1\)/g, Gd = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Yd = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Qd(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Jd(e) {
  const t = [];
  return e.replace(Ji, (n, r, a) => (t.push(a), n)), t.filter((n) => !gr(n));
}
async function Xd(e, t, n, r, a) {
  try {
    const i = n ? kd(t, n) : t, o = Wr(t);
    let s;
    return a || (s = await Br(i, o, r)), e.replace(Qd(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Zd(e, { preferredFontFormat: t }) {
  return t ? e.replace(Yd, (n) => {
    for (; ; ) {
      const [r, , a] = Gd.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Xi(e) {
  return e.search(Ji) !== -1;
}
async function Zi(e, t, n) {
  if (!Xi(e))
    return e;
  const r = Zd(e, n);
  return Jd(r).reduce((i, o) => i.then((s) => Xd(s, o, t, n)), Promise.resolve(r));
}
async function gt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Zi(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function eh(e, t) {
  await gt("background", e, t) || await gt("background-image", e, t), await gt("mask", e, t) || await gt("-webkit-mask", e, t) || await gt("mask-image", e, t) || await gt("-webkit-mask-image", e, t);
}
async function th(e, t) {
  const n = be(e, HTMLImageElement);
  if (!(n && !gr(e.src)) && !(be(e, SVGImageElement) && !gr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Br(r, Wr(r), t);
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
async function nh(e, t) {
  const r = Ke(e.childNodes).map((a) => eo(a, t));
  await Promise.all(r).then(() => e);
}
async function eo(e, t) {
  be(e, Element) && (await eh(e, t), await th(e, t), await nh(e, t));
}
function rh(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ma = {};
async function Ra(e) {
  let t = Ma[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ma[e] = t, t;
}
async function _a(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Yi(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function Oa(e) {
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
async function ah(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ke(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = Ra(c).then((m) => _a(m, t)).then((m) => Oa(m).forEach((h) => {
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
        a.href != null && r.push(Ra(a.href).then((s) => _a(s, t)).then((s) => Oa(s).forEach((c) => {
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
function ih(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Xi(t.style.getPropertyValue("src")));
}
async function oh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ke(e.ownerDocument.styleSheets), r = await ah(n, t);
  return ih(r);
}
function to(e) {
  return e.trim().replace(/["']/g, "");
}
function sh(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(to(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function lh(e, t) {
  const n = await oh(e, t), r = sh(e);
  return (await Promise.all(n.filter((i) => r.has(to(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Zi(i.cssText, o, t);
  }))).join(`
`);
}
async function ch(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await lh(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function uh(e, t = {}) {
  const { width: n, height: r } = Gi(e, t), a = await zn(e, t, !0);
  return await ch(a, t), await eo(a, t), rh(a, t), await Rd(a, n, r);
}
async function mh(e, t = {}) {
  const { width: n, height: r } = Gi(e, t), a = await uh(e, t), i = await yn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Sd(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || xd(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function dh(e, t = {}) {
  return (await mh(e, t)).toDataURL();
}
function hh(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function fh(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function ph(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function gh(e, t, n = 2) {
  const r = await dh(e, {
    pixelRatio: n,
    backgroundColor: ph(e),
    cacheBust: !0
  });
  fh(r, `${hh(t)}.png`);
}
function vh({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = k.useState(!1), [o, s] = k.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const v = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    yd(bd(t), `${v}.csv`);
  }, h = async () => {
    const v = r == null ? void 0 : r.current;
    if (!(!v || a)) {
      i(!0), s(null);
      try {
        await gh(v, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, p = (v) => v.stopPropagation(), g = (v = !0) => S("cv-menu-item", !v && "cv-menu-item--disabled");
  return /* @__PURE__ */ f(we, { children: [
    /* @__PURE__ */ l(
      Ne,
      {
        onMouseDown: p,
        onPointerDown: p,
        onTouchStart: p,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Qo, {})
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "cv-menu", onMouseDown: p, onPointerDown: p, onTouchStart: p, children: [
      n ? /* @__PURE__ */ f("button", { type: "button", onClick: n, className: g(), children: [
        /* @__PURE__ */ l(Jo, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ f("button", { type: "button", onClick: h, disabled: a, className: g(!a), children: [
        /* @__PURE__ */ l(Xo, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ f("button", { type: "button", onClick: m, disabled: !c, className: g(c), children: [
        /* @__PURE__ */ l(Zo, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function Ta({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(Hr, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ l(Gm, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(fd, { control: e.control, title: e.title });
  }
}
function vr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = kt({ rows: [] }), i = Be(
    (c) => a({ rows: c.rows, refetch: c.refetch }),
    []
  ), o = tt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(wa, { children: /* @__PURE__ */ l(Ta, { widget: e }) }) });
  const s = n ? null : /* @__PURE__ */ l(
    vh,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: o
    }
  );
  return /* @__PURE__ */ l(
    Ki,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: o, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(wa, { children: /* @__PURE__ */ l(Ta, { widget: e, onState: i }) }) })
    }
  );
}
const bh = "lg", yh = 640;
function kh(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Ch(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Og({ spec: e, editable: t = !1, families: n }) {
  const [r, a] = Ii(), i = e.grid ?? {}, o = i.cols ?? 12, s = i.rowHeight ?? 40, c = i.margin ?? [12, 12], u = i.containerPadding ?? c, m = ee(
    () => ({ [bh]: Ch(e.layout) }),
    [e.layout]
  ), h = ee(
    () => new Map(e.widgets.map((g) => [g.id, g])),
    [e.widgets]
  ), p = !t && a > 0 && a < yh;
  return /* @__PURE__ */ l(Vr, { families: n, children: /* @__PURE__ */ l(qr, { spec: e, children: /* @__PURE__ */ l("div", { ref: r, className: "cv-dashboard", children: a <= 0 ? null : p ? /* @__PURE__ */ l(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: c[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: kh(e.layout).map((g) => {
        const v = h.get(g.i);
        if (!v) return null;
        const y = g.h * s + (g.h - 1) * c[1];
        return /* @__PURE__ */ l("div", { style: { height: y }, children: /* @__PURE__ */ l(vr, { widget: v, editable: !1 }) }, g.i);
      })
    }
  ) : /* @__PURE__ */ l(
    ui,
    {
      width: a,
      layouts: m,
      breakpoints: { lg: 0 },
      cols: { lg: o },
      rowHeight: s,
      margin: c,
      containerPadding: u,
      dragConfig: { enabled: t, handle: `.${vn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((g) => {
        const v = h.get(g.i);
        return v ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(vr, { widget: v, editable: t }) }, g.i) : null;
      })
    }
  ) }) }) });
}
function Tg({ spec: e, families: t }) {
  return /* @__PURE__ */ l(Vr, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Ki,
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
      children: /* @__PURE__ */ l(Km, { spec: e })
    }
  ) }) });
}
function In(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function wh(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Ee(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Vn(e) {
  return e ? e.cubes.filter((t) => Ee(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: In(t),
    joinTargets: wh(t)
  })) : [];
}
function Wt(e, t) {
  if (!(!e || !t))
    return Vn(e).find((n) => n.name === t);
}
function Kr(e) {
  return e.shortTitle || e.title || e.name;
}
function mt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function no(e) {
  return mt(e.meta, "group");
}
function Nh(e) {
  return mt(e.meta, "geoPoint");
}
function Da(e) {
  const t = mt(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Sh(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function sn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function xh(e, t) {
  if (t)
    return Yt(e, "time", t).find(sn);
}
function Mh(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = no(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function ro(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Kr(e),
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
function ln(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Kr(e),
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
function ao(e, t) {
  return {
    name: e.name,
    label: Kr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Rh(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = Nh({ meta: i });
    !o || !Ee(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Da({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Da({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Sh(o[0].name, s[0].name),
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
function Yt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Ee(a) || n && a.name !== n) continue;
    const i = In(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Rh(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Ee(s) && o(ro(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Ee(s) && s.type !== "time" && o(ln(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Ee(s) && s.type === "time" && o(ln(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Ee(s) && s.type === "number" && o(ln(s, a.name));
  }
  return r;
}
function _h(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Ee(a) || n && !n.has(a.name)) continue;
    const i = In(a);
    for (const o of a.segments) {
      if (!Ee(o)) continue;
      const s = ao(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Pe(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = In(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(ro(i, n.name)) : a(ln(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(ao(o, n.name));
    }
    return Yt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Aa(e) {
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
const br = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), io = {
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
function zt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function oo(e) {
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
function Mt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Dt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ae(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Ze(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function so(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Oh = "day";
function Th(e, t, n) {
  var m, h, p, g, v;
  const { chart: r } = e, a = e.query ?? {}, i = Mt(r).length ? Mt(r) : a.measures ?? [], o = Ae(r) ?? ((m = a.dimensions) == null ? void 0 : m[0]) ?? ((p = (h = a.timeDimensions) == null ? void 0 : h[0]) == null ? void 0 : p.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: i } } : void 0, c = {
    ...e,
    chart: { ...r, family: t, mapping: void 0, familyOptions: void 0 }
  }, u = (y) => ({
    ...c,
    chart: { ...c.chart, ...y }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return u({ mapping: s });
    case "heatmap": {
      const y = (g = a.dimensions) == null ? void 0 : g.find((N) => N !== o), b = i[0];
      return u({ mapping: o ? y && b ? { category: { member: o }, series: { mode: "pivot", value: b, pivot: y } } : { category: { member: o }, series: { mode: "measures", members: b ? [b] : [] } } : void 0 });
    }
    case "kpi":
      return u({
        familyOptions: { display: "number", ...i[0] ? { measure: i[0] } : {} }
      });
    case "scatter":
      return u({
        familyOptions: {
          ...i[0] ? { x: i[0] } : {},
          ...i[1] ? { y: i[1] } : {}
        }
      });
    case "table": {
      const y = [
        ...a.dimensions ?? [],
        ...((v = a.timeDimensions) == null ? void 0 : v.map((b) => b.dimension)) ?? [],
        ...i
      ].map((b) => ({ member: b }));
      return u({ familyOptions: y.length ? { columns: y } : void 0 });
    }
    default:
      return n.require(t).supportsMapping ? u({ mapping: s }) : c;
  }
}
function La(e) {
  return Om(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function lo(e) {
  return Dm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Dh(e, t) {
  return t.require(e).wells;
}
function $e(e) {
  return e.chart.familyOptions ?? {};
}
function Ur(e) {
  const t = $e(e).columns;
  return Array.isArray(t) ? t : [];
}
function Ah(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function en(e, t) {
  var o;
  const { chart: n } = e, r = n.family, a = (s) => s ? [s] : [], i = t.require(r).readWells;
  if (i) return i(e);
  switch (r) {
    case "bar":
    case "line":
    case "area": {
      const s = Ah(e), c = (o = n.mapping) == null ? void 0 : o.series;
      return { y: c && c.mode === "pivot" ? c.values && c.values.length > 0 ? c.values : a(c.value) : Mt(n), x: a(Ae(n)), color: a(s) };
    }
    case "heatmap":
      return zh(e);
    case "pie":
      return { slices: a(Ae(n)), size: a(Mt(n)[0]) };
    case "scatter": {
      const s = $e(e);
      return {
        sx: a(s.x),
        sy: a(s.y),
        size: a(s.size),
        color: a(s.groupBy)
      };
    }
    case "kpi":
      return { value: a($e(e).measure) };
    case "table":
      return { columns: Ur(e).map((s) => s.member) };
    default:
      return {};
  }
}
function qn(e) {
  const t = Lh(e);
  return t === void 0 ? Oh : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Lh(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function jn(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Rt(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function dt(e, t) {
  return { ...e, dimensions: jn(e.dimensions, t) };
}
function Ce(e, t) {
  const n = Rt(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Fe(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function ht(e, t, n) {
  if (e)
    return { category: { member: e }, series: so(t, n) };
}
function kn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function Cn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const s of t) {
    const c = r == null ? void 0 : r[s];
    c && Object.keys(c).length > 0 && (a[s] = c);
  }
  const i = Object.keys(a).length > 0, o = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...i ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...i ? { meta: a } : {} };
  return { category: { member: e }, series: o };
}
function nn(e, t, n, r, a, i) {
  const o = i.require(t).placeField;
  if (o) return o(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Ph(e, n, r, a, i);
    case "heatmap":
      return Ih(e, n, r, a);
    case "pie":
      return qh(e, n, r, a);
    case "scatter":
      return Hh(e, n, r);
    case "kpi":
      return Bh(e, r);
    case "table":
      return Uh(e, r, a);
    default:
      return e;
  }
}
function Eh(e, t, n, r, a) {
  const i = a.require(t).removeField;
  if (i) return i(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Fh(e, n, r, a);
    case "heatmap":
      return Vh(e, n, r);
    case "pie":
      return jh(e, n, r);
    case "scatter":
      return Wh(e, n, r);
    case "kpi":
      return Kh(e, r);
    case "table":
      return Gh(e, r);
    default:
      return e;
  }
}
function Ph(e, t, n, r, a) {
  const { query: i, chart: o } = e, s = en(e, a), c = s.color[0], u = Ae(o), m = Dt(o);
  if (t === "y") {
    const h = s.y, p = jn(h, n);
    return c ? {
      ...e,
      query: { ...i, measures: p },
      chart: { ...o, mapping: Cn(u, p, c, kn(o)) }
    } : {
      ...e,
      query: { ...i, measures: p },
      chart: { ...o, mapping: ht(u, p, m) }
    };
  }
  if (t === "x")
    return $h(e, n, r, c, a);
  if (t === "color") {
    const h = s.y;
    if (h.length === 0) return e;
    const p = dt({ ...i, measures: h }, n);
    return {
      ...e,
      query: p,
      chart: { ...o, mapping: Cn(u, h, n, kn(o)) }
    };
  }
  return e;
}
function $h(e, t, n, r, a) {
  const { query: i, chart: o } = e, s = Ae(o), c = en(e, a).y, u = Dt(o);
  let m = i;
  const h = Ze(i);
  if (h && s === h.dimension ? m = Fe(m, void 0) : s && (m = Ce(m, s)), n === "time") {
    const g = (h == null ? void 0 : h.granularity) ?? qn(h == null ? void 0 : h.dateRange);
    m = Fe(m, {
      dimension: t,
      granularity: g,
      dateRange: h == null ? void 0 : h.dateRange
    });
  } else
    m = dt(m, t);
  const p = r ? Cn(t, c, r, kn(o)) : ht(t, c, u);
  return { ...e, query: m, chart: { ...o, mapping: p } };
}
function Fh(e, t, n, r) {
  const { query: a, chart: i } = e, o = en(e, r), s = Ae(i), c = o.color[0], u = Dt(i);
  if (t === "y") {
    const m = Rt(o.y, n);
    if (c && m.length >= 1)
      return {
        ...e,
        query: { ...a, measures: m },
        chart: { ...i, mapping: Cn(s, m, c, kn(i)) }
      };
    const h = c ? Ce({ ...a, measures: m }, c) : { ...a, measures: m };
    return { ...e, query: h, chart: { ...i, mapping: ht(s, m, u) } };
  }
  if (t === "x") {
    let m = a;
    const h = Ze(a);
    return h && h.dimension === n ? m = Fe(m, void 0) : m = Ce(m, n), { ...e, query: m, chart: { ...i, mapping: void 0 } };
  }
  if (t === "color") {
    const m = Ce(a, n);
    return {
      ...e,
      query: m,
      chart: { ...i, mapping: ht(s, o.y, u) }
    };
  }
  return e;
}
function Gr(e) {
  var i, o, s;
  const { chart: t, query: n } = e, r = (i = t.mapping) == null ? void 0 : i.series, a = n.dimensions ?? [];
  if (t.mapping && r && r.mode === "pivot")
    return { x: t.mapping.category.member, y: r.pivot, value: r.value };
  if (t.mapping && r && r.mode === "measures") {
    const c = t.mapping.category.member;
    return {
      x: c,
      y: a.find((u) => u !== c),
      value: r.members[0] ?? ((o = n.measures) == null ? void 0 : o[0])
    };
  }
  return { x: void 0, y: a[0], value: (s = n.measures) == null ? void 0 : s[0] };
}
function zh(e) {
  const { x: t, y: n, value: r } = Gr(e), a = (i) => i ? [i] : [];
  return { hx: a(t), hy: a(n), value: a(r) };
}
function yt(e, t, n) {
  if (e)
    return t && n ? { category: { member: e }, series: { mode: "pivot", value: n, pivot: t } } : { category: { member: e }, series: { mode: "measures", members: n ? [n] : [] } };
}
function Ih(e, t, n, r) {
  const { query: a, chart: i } = e, o = Gr(e);
  if (t === "hx") {
    let s = a;
    const c = Ze(a);
    if (c && o.x === c.dimension ? s = Fe(s, void 0) : o.x && (s = Ce(s, o.x)), r === "time") {
      const u = (c == null ? void 0 : c.granularity) ?? qn(c == null ? void 0 : c.dateRange);
      s = Fe(s, { dimension: n, granularity: u, dateRange: c == null ? void 0 : c.dateRange });
    } else
      s = dt(s, n);
    return { ...e, query: s, chart: { ...i, mapping: yt(n, o.y, o.value) } };
  }
  if (t === "hy") {
    let s = a;
    return o.y && o.y !== n && (s = Ce(s, o.y)), s = dt(s, n), { ...e, query: s, chart: { ...i, mapping: yt(o.x, n, o.value) } };
  }
  return t === "value" ? {
    ...e,
    query: { ...a, measures: [n] },
    chart: { ...i, mapping: yt(o.x, o.y, n) }
  } : e;
}
function Vh(e, t, n) {
  const { query: r, chart: a } = e, i = Gr(e);
  if (t === "hx") {
    let o = r;
    const s = Ze(r);
    return s && s.dimension === n ? o = Fe(o, void 0) : o = Ce(o, n), { ...e, query: o, chart: { ...a, mapping: yt(void 0, i.y, i.value) } };
  }
  return t === "hy" ? {
    ...e,
    query: Ce(r, n),
    chart: { ...a, mapping: yt(i.x, void 0, i.value) }
  } : t === "value" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: yt(i.x, i.y, void 0) }
  } : e;
}
function qh(e, t, n, r) {
  const { query: a, chart: i } = e, o = Dt(i);
  if (t === "slices") {
    let s = a;
    const c = Ae(i), u = Ze(a);
    if (u && c === u.dimension ? s = Fe(s, void 0) : c && (s = Ce(s, c)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? qn(u == null ? void 0 : u.dateRange);
      s = Fe(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = dt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...i, mapping: ht(n, Mt(i), o) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...i, mapping: ht(Ae(i), s, o) }
    };
  }
  return e;
}
function jh(e, t, n) {
  const { query: r, chart: a } = e, i = Dt(a);
  if (t === "slices") {
    let o = r;
    const s = Ze(r);
    return s && s.dimension === n ? o = Fe(o, void 0) : o = Ce(o, n), { ...e, query: o, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: ht(Ae(a), [], i) }
  } : e;
}
const co = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Hh(e, t, n) {
  const r = co[t];
  if (!r) return e;
  const { query: a, chart: i } = e, o = { ...$e(e) }, s = o[r];
  o[r] = n;
  let c = a;
  if (r === "groupBy")
    s && s !== n && (c = Ce(c, s)), c = dt(c, n);
  else {
    const u = s ? Rt(a.measures, s) : a.measures;
    c = { ...a, measures: jn(u, n) };
  }
  return { ...e, query: c, chart: { ...i, familyOptions: o } };
}
function Wh(e, t, n) {
  const r = co[t];
  if (!r) return e;
  const { query: a, chart: i } = e, o = { ...$e(e) };
  delete o[r];
  let s = a;
  if (r === "groupBy") s = Ce(s, n);
  else {
    const c = Rt(a.measures, n);
    s = { ...a, measures: c.length ? c : [] };
  }
  return { ...e, query: s, chart: { ...i, familyOptions: o } };
}
function Bh(e, t) {
  const { query: n, chart: r } = e, a = { ...$e(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function Kh(e, t) {
  const { query: n, chart: r } = e, a = { ...$e(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function Uh(e, t, n) {
  const { query: r, chart: a } = e, i = Ur(e);
  if (i.some((c) => c.member === t)) return e;
  let o = r;
  if (n === "number") o = { ...r, measures: jn(r.measures, t) };
  else if (n === "time") {
    const c = Ze(r), u = (c == null ? void 0 : c.granularity) ?? qn(c == null ? void 0 : c.dateRange), m = r.timeDimensions ?? [];
    m.some((h) => h.dimension === t) || (o = { ...r, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else o = dt(r, t);
  const s = { ...$e(e), columns: [...i, { member: t }] };
  return { ...e, query: o, chart: { ...a, familyOptions: s } };
}
function Gh(e, t) {
  var m, h, p;
  const { query: n, chart: r } = e, a = Ur(e).filter((g) => g.member !== t);
  let i = n;
  const o = Rt(n.measures, t);
  o.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (i = { ...i, measures: o.length ? o : void 0 });
  const s = Rt(n.dimensions, t);
  s.length !== (((h = n.dimensions) == null ? void 0 : h.length) ?? 0) && (i = { ...i, dimensions: s.length ? s : void 0 });
  const c = (n.timeDimensions ?? []).filter((g) => g.dimension !== t);
  c.length !== (((p = n.timeDimensions) == null ? void 0 : p.length) ?? 0) && (i = { ...i, timeDimensions: c.length ? c : void 0 });
  const u = { ...$e(e), columns: a };
  return { ...e, query: i, chart: { ...r, familyOptions: u } };
}
const le = k.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ l(
    "input",
    {
      ref: r,
      type: t,
      "data-slot": "input",
      className: S("cv-input", e),
      ...n
    }
  )
);
le.displayName = "Input";
function wn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(ti, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(rr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(ei, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Mr, { className: "cv-member-type-icon" });
  }
}
function uo({
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
  const { meta: u, isLoading: m } = Ie(), h = k.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return Yt(u, n).filter((b) => y.has(b.cube));
    }
    return Yt(u, n, e);
  }, [u, n, e, t]), p = k.useMemo(() => {
    const y = Yh(h), b = y.length > 1, C = [];
    for (const [N, w] of y)
      for (const [O, M] of Mh(w, () => "Other")) {
        const D = b ? O === "Other" ? N : `${N} · ${O}` : O;
        C.push({ key: `${N}:${O}`, label: D, items: M });
      }
    return C;
  }, [h]), g = p.length > 1, v = h.find((y) => y.name === r);
  return /* @__PURE__ */ f(Re, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(Oe, { id: s, className: c, children: /* @__PURE__ */ l(_e, { placeholder: m ? "Loading…" : i, children: v ? /* @__PURE__ */ f("span", { className: "cv-member-option", children: [
      wn(v.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Te, { children: p.map((y) => /* @__PURE__ */ f(fr, { children: [
      g && y.label ? /* @__PURE__ */ l(pr, { children: y.label }) : null,
      y.items.map((b) => /* @__PURE__ */ l(he, { value: b.name, children: /* @__PURE__ */ f("span", { className: "cv-member-option", children: [
        wn(b.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: b.label })
      ] }) }, b.name))
    ] }, y.key)) })
  ] });
}
function Yh(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Qt({
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
      className: S("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: S(
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
const Ea = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(ei, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(rr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(rr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Mr, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(ti, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Qh = ["geoPoint", "number", "numberDimension", "category", "time"];
function mo({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: i = "start",
  side: o = "bottom",
  children: s
}) {
  var E, T;
  const { meta: c, isLoading: u } = Ie(), [m, h] = k.useState(!1), [p, g] = k.useState(""), [v, y] = k.useState(n.viewLocked ?? "tables"), [b, C] = k.useState({});
  k.useEffect(() => {
    m && y(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const N = k.useMemo(() => new Set(t), [t]), w = p.trim().toLowerCase(), O = k.useMemo(() => {
    if (v !== "tables") {
      const V = n.views.find((q) => q.name === v) ?? Wt(c, v);
      return V ? [{ cube: V, tag: "dataset" }] : [];
    }
    const x = [];
    n.sourceCube && x.push({ cube: n.sourceCube, tag: "source" });
    for (const V of n.relatedCubes) x.push({ cube: V, tag: "related" });
    return x;
  }, [v, n, c]), M = e.kinds.length > 1, D = (x) => {
    const V = [], q = /* @__PURE__ */ new Map();
    for (const P of Qh) {
      if (!e.kinds.includes(P)) continue;
      const U = Ea[P];
      let W = Yt(c, U.metaKind, x);
      P === "time" && (W = [...W].sort(
        (K, J) => Number(sn(J)) - Number(sn(K))
      ));
      for (const K of W) {
        if (N.has(K.name) || w && !(K.label.toLowerCase().includes(w) || K.name.toLowerCase().includes(w))) continue;
        const J = no(K), te = J ? `g:${J.toLowerCase()}` : `k:${U.label}`;
        let ae = q.get(te);
        ae || (ae = { key: te, label: J ?? U.label, headerIcon: J ? void 0 : U.icon, items: [] }, q.set(te, ae), V.push(te)), ae.items.push({ option: K, kind: P });
      }
    }
    return V.map((P) => q.get(P));
  }, _ = O.map((x) => ({ section: x, groups: D(x.cube.name) })).filter((x) => x.groups.length > 0), $ = _.length > 0, L = (x, V) => {
    a(x, V), h(!1), g("");
  }, R = v === "tables" ? "All related tables" : ((E = n.views.find((x) => x.name === v)) == null ? void 0 : E.title) ?? ((T = Wt(c, v)) == null ? void 0 : T.title) ?? v;
  return /* @__PURE__ */ f(we, { open: m, onOpenChange: h, children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: s }),
    /* @__PURE__ */ f(Se, { align: i, side: o, className: "cv-picker", children: [
      /* @__PURE__ */ f("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ f("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(es, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (x) => g(x.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ l(
          Jh,
          {
            browse: v,
            label: R,
            views: n.viewLocked ? n.views.filter((x) => x.name === n.viewLocked) : [],
            onBrowse: y
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: $ ? _.map(({ section: x, groups: V }, q) => {
        const P = V.reduce((J, te) => J + te.items.length, 0), U = x.tag === "related", W = b[x.cube.name] ?? U, K = w.length > 0 ? !0 : !W;
        return /* @__PURE__ */ f("div", { children: [
          x.tag === "related" && q > 0 && _[q - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => C((J) => ({ ...J, [x.cube.name]: !W })),
              className: "cv-picker-table",
              children: [
                K ? /* @__PURE__ */ l(Ye, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(Xt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(ni, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: x.cube.title }),
                x.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : x.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: P })
              ]
            }
          ),
          K ? V.map((J) => /* @__PURE__ */ f("div", { className: "cv-picker-group", children: [
            V.length > 1 ? /* @__PURE__ */ f("div", { className: "cv-picker-group-header", children: [
              J.headerIcon,
              J.label
            ] }) : null,
            J.items.map(({ option: te, kind: ae }) => /* @__PURE__ */ l(
              Xh,
              {
                option: te,
                kindIcon: M ? Ea[ae].icon : void 0,
                badge: ae === "time" && sn(te) ? "default" : void 0,
                reason: r(te),
                onPick: () => L(te.name, ae)
              },
              te.name
            ))
          ] }, J.key)) : null
        ] }, x.cube.name);
      }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Jh({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = k.useState(!1), o = (s) => {
    r(s), i(!1);
  };
  return /* @__PURE__ */ f(we, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ f(
      Ne,
      {
        className: "cv-picker-source-trigger",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ l(ri, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Pa, { active: e === "tables", icon: /* @__PURE__ */ l(ni, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ l(
          Pa,
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
function Pa({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: n,
      className: S(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Qe, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Xh({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
  return t ? /* @__PURE__ */ f(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ f("span", { className: "cv-picker-row-main", children: [
          r,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e.label })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: "Not available" })
      ]
    }
  ) : /* @__PURE__ */ f(
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
const Zh = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], It = "yyyy-MM-dd";
function ef(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function $a(e) {
  if (!e) return;
  const t = li(e, It, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Yr({ value: e, onChange: t }) {
  const [n, r] = k.useState(!1), a = typeof e == "string", [i, o] = ef(e), s = $a(i), c = $a(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${se(s, "MMM d, yyyy")} – ${se(c, "MMM d, yyyy")}` : s ? se(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ f(we, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(H, { variant: "outline", size: "sm", className: S("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Za, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: S("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ f(Se, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ f("div", { className: "cv-daterange-presets", children: [
        Zh.map((h) => /* @__PURE__ */ l(
          H,
          {
            variant: "ghost",
            size: "sm",
            className: S("cv-daterange-preset", e === h && "cv-daterange-preset--active"),
            onClick: () => {
              t(h), r(!1);
            },
            children: h
          },
          h
        )),
        /* @__PURE__ */ l(
          H,
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
        qi,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([se(h.from, It), se(h.to, It)]) : h != null && h.from ? t([se(h.from, It), se(h.from, It)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function tf(e) {
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
function nf(e, t) {
  const n = new Set(tf(t));
  return e.filter((r) => n.has(r.type));
}
function rf(e) {
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
function af(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function of(e, t, n) {
  const r = rf(e), a = { name: af(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const ho = k.createContext({});
function sf({
  createVariable: e,
  children: t
}) {
  const n = k.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(ho.Provider, { value: n, children: t });
}
function lf() {
  return k.useContext(ho);
}
function cf({ kind: e, value: t, onChange: n, className: r }) {
  const a = jr(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = lf(), [s, c] = k.useState(!1), [u, m] = k.useState(!1), [h, p] = k.useState(""), g = k.useMemo(() => nf(i, e), [i, e]), v = g.find((C) => C.name === t), y = (C) => {
    n(C), c(!1), m(!1);
  }, b = () => {
    if (!o) return;
    const C = of(e, h || "Variable", i);
    o(C), y(C.name), p("");
  };
  return /* @__PURE__ */ f(
    we,
    {
      open: s,
      onOpenChange: (C) => {
        c(C), C || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(H, { variant: "outline", size: "sm", className: S("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(ts, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: S("cv-var-trigger-label", !v && "cv-var-trigger-label--placeholder"), children: v ? v.label ?? v.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ f(Se, { align: "start", className: "cv-var-popover", children: [
          g.length > 0 ? g.map((C) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => y(C.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: C.label ?? C.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: C.type }),
                C.name === t ? /* @__PURE__ */ l(Qe, { className: "cv-ec-icon" }) : null
              ]
            },
            C.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ f("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              le,
              {
                autoFocus: !0,
                value: h,
                onChange: (C) => p(C.target.value),
                onKeyDown: (C) => {
                  C.key === "Enter" && b(), C.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(H, { size: "sm", className: "cv-var-new-add", onClick: b, children: "Add" })
          ] }) : /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(wt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function _t({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Me(t), [i, o] = k.useState(a ? "var" : "fixed");
  k.useEffect(() => {
    a && o("var");
  }, [a]);
  const s = (c) => S("cv-bind-seg", c && "cv-bind-seg--active");
  return /* @__PURE__ */ f("div", { className: "cv-bind", children: [
    /* @__PURE__ */ f("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: s(i === "fixed"),
          onClick: () => {
            o("fixed"), Me(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: s(i === "var"), onClick: () => o("var"), children: "Variable" })
    ] }),
    i === "var" ? /* @__PURE__ */ l(
      cf,
      {
        kind: e,
        value: Me(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(Me(t) ? void 0 : t, (c) => n(c))
  ] });
}
const uf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Xn(e) {
  return "member" in e && "operator" in e;
}
function mf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var R;
  const { meta: s } = Ie(), c = ((R = jr()) == null ? void 0 : R.decls) ?? [], [u, m] = k.useState(null), [h, p] = k.useState(null), g = r ?? [], v = g.length === 1 && !Xn(g[0]) && "or" in g[0] && Array.isArray(g[0].or) && g[0].or.every(Xn) ? g[0] : void 0, y = v ? "any" : "all", b = [], C = [];
  v || g.forEach((E) => Xn(E) ? b.push(E) : C.push(E));
  const N = v ? v.or : b, w = C.length === 0 && (N.length >= 2 || y === "any"), O = (E) => y === "any" ? E.length ? [{ or: E }] : [] : [...E, ...C], M = (E) => {
    const T = E.filter((V) => V.member.length > 0), x = O(T);
    a(x.length > 0 ? x : void 0);
  }, D = (E) => {
    const T = E === "any" ? N.length ? [{ or: N }] : [] : [...N];
    a(T.length > 0 ? T : void 0);
  }, _ = (E, T) => M(N.map((x, V) => V === E ? { ...x, ...T } : x)), $ = (E) => M(N.filter((T, x) => x !== E)), L = (E) => {
    const x = { ...h ?? { member: "", operator: "equals", values: [] }, ...E };
    x.member ? (p(null), m(N.length), M([...N, x])) : p(x);
  };
  return /* @__PURE__ */ f("div", { "data-slot": "filter-builder", className: S("cv-filter-builder", o), children: [
    N.length === 0 && !h ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    w ? /* @__PURE__ */ f("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Qt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: y,
          onChange: D
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    N.map((E, T) => {
      const x = Pe(s, E.member);
      return u === T ? /* @__PURE__ */ l(
        Fa,
        {
          leaf: E,
          member: x,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (V) => _(T, V),
          onDone: () => m(null),
          onRemove: () => $(T)
        },
        T
      ) : /* @__PURE__ */ l(
        df,
        {
          text: hf(E, x == null ? void 0 : x.label, c),
          disabled: i,
          onEdit: () => m(T),
          onRemove: () => $(T)
        },
        T
      );
    }),
    h ? /* @__PURE__ */ l(
      Fa,
      {
        leaf: h,
        member: Pe(s, h.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: L,
        onRemove: () => p(null)
      }
    ) : null,
    C.length > 0 ? /* @__PURE__ */ f("p", { className: "cv-filter-groups-note", children: [
      C.length,
      " grouped filter",
      C.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ f(
      H,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!h,
        onClick: () => {
          m(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(wt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function df({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ f("div", { className: "cv-filter-summary", children: [
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
      H,
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
function Fa({
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
  const { meta: u } = Ie(), m = Aa(t == null ? void 0 : t.type), h = m.includes(e.operator) ? e.operator : m[0], p = !br.has(h);
  k.useEffect(() => {
    h !== e.operator && o({ operator: h });
  }, [e.operator, o, h]);
  const g = (v) => {
    const y = Pe(u, v);
    o({ member: v, operator: Aa(y == null ? void 0 : y.type)[0], values: [] });
  };
  return /* @__PURE__ */ f("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ f("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ f("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Qe, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          H,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(Ot, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          mo,
          {
            well: uf,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: g,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                disabled: i,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ f("span", { className: "cv-filter-field-value", children: [
                    wn(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(Ye, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        uo,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: g,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ f("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ f(
        Re,
        {
          value: h,
          onValueChange: (v) => o({
            operator: v,
            values: br.has(v) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(Oe, { className: "cv-ec-full", children: /* @__PURE__ */ l(_e, {}) }),
            /* @__PURE__ */ l(Te, { children: m.map((v) => /* @__PURE__ */ l(he, { value: v, children: io[v] }, v)) })
          ]
        }
      )
    ] }),
    p ? /* @__PURE__ */ f("label", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        ff,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (v) => o({ values: v })
        }
      )
    ] }) : null
  ] });
}
function hf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = io[e.operator] ?? e.operator;
  if (br.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Me(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function ff({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Me(r[0]);
  if (t === "time") {
    const s = a ? r[0] : pf(r);
    return /* @__PURE__ */ l(
      _t,
      {
        kind: "dateRange",
        value: s,
        onChange: (c) => n(c === void 0 ? [] : Me(c) ? [c] : gf(c)),
        renderFixed: (c, u) => /* @__PURE__ */ l(Yr, { value: c, onChange: u })
      }
    );
  }
  const i = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", o = a ? r[0] : r.filter((s) => !Me(s));
  return /* @__PURE__ */ l(
    _t,
    {
      kind: i,
      value: o,
      onChange: (s) => n(s === void 0 ? [] : Me(s) ? [s] : s),
      renderFixed: (s, c) => /* @__PURE__ */ l(
        le,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => c(vf(u.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function pf(e) {
  const t = e.filter((n) => !Me(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function gf(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function vf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function bf({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ f(we, { children: [
    /* @__PURE__ */ f(
      Ne,
      {
        className: S(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(ns, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ f("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(yf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(mf, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function yf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Ie(), a = _h(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ f("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: a.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o(s.name),
        title: s.description ?? s.name,
        className: S(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function kf({ currentName: e, hasFields: t, onSelect: n }) {
  var y;
  const { meta: r } = Ie(), a = k.useMemo(() => Vn(r), [r]), i = a.filter((b) => b.type === "view"), o = a.filter((b) => b.type === "cube"), s = a.find((b) => b.name === e), [c, u] = k.useState(!1), [m, h] = k.useState(null), p = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? h(b) : (n(b), u(!1));
  }, g = () => {
    m && n(m), h(null), u(!1);
  }, v = m ? ((y = a.find((b) => b.name === m)) == null ? void 0 : y.title) ?? m : "";
  return /* @__PURE__ */ f(
    we,
    {
      open: c,
      onOpenChange: (b) => {
        u(b), b || h(null);
      },
      children: [
        /* @__PURE__ */ f(
          Ne,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(ri, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: S("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(Se, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ f("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ f("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: v }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ f("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(H, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => h(null), children: "Cancel" }),
            /* @__PURE__ */ l(H, { size: "sm", className: "cv-ec-h7", onClick: g, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ f("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ f(re, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((b) => /* @__PURE__ */ l(
              za,
              {
                icon: /* @__PURE__ */ l(Rr, { className: "cv-ec-icon" }),
                label: b.title,
                active: b.name === e,
                onClick: () => p(b.name)
              },
              b.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((b) => /* @__PURE__ */ l(
            za,
            {
              icon: /* @__PURE__ */ l(ai, { className: "cv-ec-icon" }),
              label: b.title,
              active: b.name === e,
              onClick: () => p(b.name)
            },
            b.name
          ))
        ] }) })
      ]
    }
  );
}
function za({
  icon: e,
  label: t,
  active: n,
  onClick: r
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: r,
      className: S(
        "cv-ec-menu-item",
        n && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: e }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: t }),
        n ? /* @__PURE__ */ l(Qe, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Ia(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Cf({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var s;
  const i = ((s = e.chart.axes) == null ? void 0 : s[n]) ?? {}, o = i.labelHide === !0;
  return /* @__PURE__ */ f(
    "div",
    {
      className: S(
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
            onChange: (c) => Ia(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv-axis-chrome-input"
          }
        ),
        /* @__PURE__ */ l(
          Nf,
          {
            hidden: o,
            what: "axis title",
            onClick: () => Ia(e, t, n, { labelHide: o ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function wf({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ f("div", { className: S("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(ii, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(oi, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Nf({
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
      children: e ? /* @__PURE__ */ l(ii, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(oi, { className: "cv-ec-icon" })
    }
  );
}
const fo = k.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: S("cv-label", e),
      ...t
    }
  )
);
fo.displayName = "Label";
function ie({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ f("div", { "data-slot": "field-row", className: S("cv-field-row", i), children: [
    /* @__PURE__ */ f("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(fo, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function yr({
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
      className: S("cv-switch", i),
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
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "switch-row",
      className: S("cv-switch-row", i),
      children: [
        /* @__PURE__ */ f(
          "label",
          {
            htmlFor: o,
            className: S("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(yr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function Sf({ spec: e, update: t }) {
  var v, y;
  const n = Xe(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const b = o.Customize;
    return /* @__PURE__ */ l(b, { spec: e, update: t });
  }
  const s = (b) => t({ ...e, chart: { ...r, ...b } }), c = (b) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...b } } }), u = ((y = (v = r.mapping) == null ? void 0 : v.series) == null ? void 0 : y.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", p = /* @__PURE__ */ l(ie, { label: "Stacked", children: /* @__PURE__ */ l(
    Qt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none",
      onChange: (b) => s({ stackMode: b })
    }
  ) }), g = (() => {
    var b, C;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (N) => s({ orientation: N ? "horizontal" : "vertical" })
            }
          ),
          p
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ f(re, { children: [
          p,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((C = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : C.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (N) => c({ innerRadiusPct: N ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ie, { label: "Slice labels", children: /* @__PURE__ */ l(
            Qt,
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
              onChange: (N) => c({ showLabels: N })
            }
          ) }),
          /* @__PURE__ */ l(Mf, { label: "Max slices", children: /* @__PURE__ */ l(
            le,
            {
              type: "number",
              min: 1,
              className: "cv-ec-h8",
              value: i.maxSlices ?? "",
              placeholder: "8",
              onChange: (N) => {
                const w = parseInt(N.target.value, 10);
                c({ maxSlices: Number.isFinite(w) && w > 0 ? w : void 0 });
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
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ l(
            me,
            {
              label: "Compact rows",
              checked: i.rowHeight === "compact",
              onChange: (N) => c({ rowHeight: N ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sortable columns",
              checked: i.sortable !== !1,
              onChange: (N) => c({ sortable: N })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Sticky header",
              checked: i.stickyHeader !== !1,
              onChange: (N) => c({ stickyHeader: N })
            }
          ),
          /* @__PURE__ */ l(
            me,
            {
              label: "Row numbers",
              checked: i.showRowNumbers === !0,
              onChange: (N) => c({ showRowNumbers: N })
            }
          )
        ] });
      case "heatmap":
        return /* @__PURE__ */ l(
          me,
          {
            label: "Show values",
            checked: i.showValues === !0,
            onChange: (N) => c({ showValues: N || void 0 })
          }
        );
      case "scatter":
        return null;
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ l("div", { className: "cv-customize", children: g });
}
function xf(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function Mf({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function po(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Th(e, r, n));
  };
}
function Rf({ spec: e, update: t, empty: n }) {
  const r = Xe(), a = e.chart.family, i = po(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ f("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(go, { family: a, onPick: i, families: r })
  ] }) }) : null;
}
function _f({ spec: e, update: t }) {
  const n = Xe(), r = e.chart.family, a = po(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ f(we, { children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(Ye, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ f(Se, { align: "center", className: "cv-type-popover", children: [
      /* @__PURE__ */ f("div", { className: "cv-type-popover-section", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Chart type" }),
        /* @__PURE__ */ l(go, { family: r, onPick: a, families: n })
      ] }),
      xf(r, n) ? /* @__PURE__ */ f("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Sf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function go({ family: e, onPick: t, families: n }) {
  return /* @__PURE__ */ l("div", { className: "cv-type-grid", children: n.families().map((r) => {
    const a = n.require(r).icon, i = r === e;
    return /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t(r),
        "aria-pressed": i,
        className: S(
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
function Of(e, t) {
  return e.allowedCubes.includes(t);
}
function Tf(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function Df(e, t, n, r) {
  const a = Vn(e), i = a.filter((w) => w.type === "view"), o = en(t, r), s = Object.values(o).flat();
  let c;
  for (const w of s) {
    const O = Pe(e, w);
    if (O) {
      c = O;
      break;
    }
  }
  const u = !c && n ? Wt(e, n) : void 0, m = c ? Wt(e, c.cube) : u, h = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, p = t.query.measures ?? [], g = p.length ? zt(p[0]) : void 0;
  if (h)
    return { viewLocked: h, relatedCubes: [], views: i, measureSource: g, allowedCubes: [h] };
  const v = g ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), y = v ? Wt(e, v) : void 0, b = a.filter((w) => w.type === "cube"), C = v ? Tf(b, v) : b, N = v ? [v, ...C.map((w) => w.name)] : b.map((w) => w.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: C,
    views: i,
    measureSource: g,
    allowedCubes: N
  };
}
function Af(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Lf(e, t, n, r, a, i) {
  var X, xe, ft, At, Lt;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : Ef(a), m = o.familyOptions ?? {}, h = Array.isArray(m.columns) ? m.columns : [], p = Dt(o), g = p[r], v = c === "table" && n.id === "columns", y = c === "bar" || c === "line" || c === "area", b = ((xe = (X = o.mapping) == null ? void 0 : X.series) == null ? void 0 : xe.mode) === "measures", C = y && n.id === "y", N = C && b, w = v ? (ft = h.find((G) => G.member === r)) == null ? void 0 : ft.label : N ? g == null ? void 0 : g.label : void 0, O = N ? g == null ? void 0 : g.colorToken : void 0, M = Ze(s), D = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, _ = D ? M == null ? void 0 : M.granularity : void 0, $ = D ? M == null ? void 0 : M.dateRange : void 0, L = (c === "line" || c === "area") && n.id === "y" && b, R = L ? g == null ? void 0 : g.curve : void 0, E = L ? g == null ? void 0 : g.dots : void 0, T = (G) => {
    var Jr, Xr;
    if ((Jr = o.mapping) != null && Jr.series && o.mapping.series.mode !== "measures") return;
    const ue = ((Xr = o.mapping) != null && Xr.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], de = { ...p };
    G && Object.keys(G).length > 0 ? de[r] = G : delete de[r];
    const Et = Ae(o);
    Et && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Et }, series: so(ue, de) }
      }
    });
  }, x = (G) => {
    const ue = h.map((de) => de.member === r ? { ...de, ...G } : de);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: ue } } });
  }, V = (G) => {
    v ? x({ label: G }) : N && T({ ...g, label: G });
  }, q = (G) => {
    N && T({ ...g, colorToken: G ?? void 0 });
  }, P = (G) => {
    if (!M) return;
    const ue = { ...M };
    for (const de of Object.keys(G)) {
      const Et = G[de];
      Et === void 0 ? delete ue[de] : ue[de] = Et;
    }
    t({ ...e, query: { ...s, timeDimensions: [ue] } });
  }, U = (G) => P({ granularity: G }), W = (G) => P({ dateRange: G }), K = (G) => {
    N && T({ ...g, curve: G });
  }, J = (G) => {
    N && T({ ...g, dots: G });
  }, te = () => t(Eh(e, c, n.id, r, i)), ae = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), ce = (At = o.mapping) == null ? void 0 : At.series, oe = (ce && ce.mode === "pivot" ? ce.value : Mt(o)[0]) ?? ((Lt = s.measures) == null ? void 0 : Lt[0]), fe = ae ? u === "time" ? [
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
  ] : [], ke = (() => {
    const G = Af(s.order)[0];
    if (!G) return "none";
    const [ue, de] = G;
    return oe && ue === oe ? de === "desc" ? "value-desc" : "value-asc" : ue === r ? u === "time" ? de === "desc" ? "time-desc" : "time-asc" : de === "asc" ? "label-asc" : "label-desc" : "none";
  })(), De = (G) => {
    let ue;
    switch (G) {
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
  }, B = typeof s.limit == "number" ? s.limit : void 0, A = (G) => t({ ...e, query: { ...s, limit: G && G > 0 ? G : void 0 } }), j = (c === "bar" || c === "line" || c === "area") && D, Y = j && m.comparePrevious === !0;
  return {
    kind: u,
    label: w,
    colorToken: O,
    granularity: _,
    dateRange: $,
    curve: R,
    dots: E,
    canLineStyle: L,
    canRename: v || N,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && b,
    isTimeField: D,
    isCategoryField: ae,
    sortValue: ke,
    sortOptions: fe,
    onSort: De,
    limit: B,
    onLimit: A,
    canComparePrevious: j,
    comparePrevious: Y,
    comparePreviousReady: j && $ !== void 0,
    onComparePrevious: (G) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: G || void 0 } } }),
    onRename: V,
    onRecolor: q,
    onGranularity: U,
    onDateRange: W,
    onCurve: K,
    onDots: J,
    onRemove: te
  };
}
function Ef(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Va(e, t, n, r) {
  var h;
  const { chart: a, query: i } = e, o = a.family, s = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const g = p.slice(), [v] = g.splice(n, 1);
    return g.splice(r, 0, v), g;
  };
  if (o === "table" && t.id === "columns") {
    const p = a.familyOptions ?? {}, g = s(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...p, columns: g } } };
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
const Pf = Ue.options;
function $f({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: S("cv-color-picker", a),
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
            className: S(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        Pf.map((i) => {
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
              className: S(
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
const Ff = ut.options, zf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function vo({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: i,
  className: o
}) {
  const s = n && n.length > 0 ? n : Ff;
  return /* @__PURE__ */ f(
    Re,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ l(Oe, { id: i, className: o, children: /* @__PURE__ */ l(_e, { placeholder: r }) }),
        /* @__PURE__ */ l(Te, { children: s.map((c) => /* @__PURE__ */ l(he, { value: c, children: zf[c] }, c)) })
      ]
    }
  );
}
const If = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Vf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = Xe(), u = Lf(e, t, n, r, a, c), m = (a == null ? void 0 : a.label) ?? r, h = u.label || m, p = u.canColor && i !== void 0, g = u.canRename || p || u.isTimeField || u.isCategoryField || u.canLineStyle || !!o, v = (b) => {
    const C = b.trim();
    u.onRename(C.length > 0 ? C : void 0);
  }, y = /* @__PURE__ */ f(re, { children: [
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
  return /* @__PURE__ */ f("div", { "data-slot": "field-pill", className: S("cv-field-pill", s), children: [
    g ? /* @__PURE__ */ f(we, { children: [
      /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: "cv-field-pill-body cv-field-pill-trigger",
          title: `Edit ${h}`,
          children: y
        }
      ) }),
      /* @__PURE__ */ l(Se, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ f("div", { className: "cv-field-pill-config", children: [
        u.canRename ? /* @__PURE__ */ f("label", { className: "cv-ec-field", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
          /* @__PURE__ */ l(
            le,
            {
              defaultValue: u.label ?? "",
              placeholder: m,
              className: "cv-ec-h8",
              onBlur: (b) => v(b.target.value),
              onKeyDown: (b) => {
                b.key === "Enter" && (v(b.target.value), b.target.blur());
              }
            }
          )
        ] }) : null,
        p ? /* @__PURE__ */ f("div", { className: "cv-ec-field cv-ec-field--loose", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
          /* @__PURE__ */ l($f, { value: u.colorToken, onChange: u.onRecolor })
        ] }) : null,
        u.isTimeField ? /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ f("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
            /* @__PURE__ */ l(
              _t,
              {
                kind: "dateRange",
                value: u.dateRange,
                onChange: u.onDateRange,
                renderFixed: (b, C) => /* @__PURE__ */ l(Yr, { value: b, onChange: C })
              }
            )
          ] }),
          /* @__PURE__ */ f("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
            /* @__PURE__ */ l(
              _t,
              {
                kind: "granularity",
                value: u.granularity,
                onChange: u.onGranularity,
                renderFixed: (b, C) => /* @__PURE__ */ l(vo, { value: b, onChange: C, className: "cv-ec-h8 cv-ec-full" })
              }
            )
          ] }),
          u.canComparePrevious ? /* @__PURE__ */ f("div", { className: "cv-ec-field", children: [
            /* @__PURE__ */ f("label", { className: "cv-ec-row", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
              /* @__PURE__ */ l(
                yr,
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
        u.isCategoryField ? /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ f("label", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Sort" }),
            /* @__PURE__ */ l(
              "select",
              {
                value: u.sortValue,
                onChange: (b) => u.onSort(b.target.value),
                className: "cv-field-pill-select",
                children: u.sortOptions.map((b) => /* @__PURE__ */ l("option", { value: b.key, children: b.label }, b.key))
              }
            )
          ] }),
          /* @__PURE__ */ f("label", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
            /* @__PURE__ */ l(
              le,
              {
                type: "number",
                min: 1,
                defaultValue: u.limit ?? "",
                placeholder: "All",
                className: "cv-ec-h8",
                onBlur: (b) => {
                  const C = b.target.value.trim();
                  u.onLimit(C === "" ? void 0 : Number(C));
                },
                onKeyDown: (b) => {
                  if (b.key === "Enter") {
                    const C = b.target.value.trim();
                    u.onLimit(C === "" ? void 0 : Number(C)), b.target.blur();
                  }
                }
              }
            )
          ] })
        ] }) : null,
        u.canLineStyle ? /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ f("div", { className: "cv-ec-field cv-ec-field--loose", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Line shape" }),
            /* @__PURE__ */ l("div", { className: "cv-line-shape-grid", children: If.map(([b, C]) => /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                onClick: () => u.onCurve(b),
                className: S(
                  "cv-line-shape-option",
                  (u.curve ?? "monotone") === b && "cv-line-shape-option--active"
                ),
                children: [
                  C,
                  (u.curve ?? "monotone") === b ? /* @__PURE__ */ l(Qe, { className: "cv-ec-icon--sm" }) : null
                ]
              },
              b
            )) })
          ] }),
          /* @__PURE__ */ f("label", { className: "cv-ec-row", children: [
            /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
            /* @__PURE__ */ l(yr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
          ] })
        ] }) : null,
        o ? /* @__PURE__ */ f("div", { className: "cv-field-pill-reorder", children: [
          /* @__PURE__ */ f(
            H,
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
          /* @__PURE__ */ f(
            H,
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
        /* @__PURE__ */ f(
          H,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-field-pill-remove",
            onClick: u.onRemove,
            children: [
              /* @__PURE__ */ l(ta, { className: "cv-ec-icon" }),
              "Remove"
            ]
          }
        )
      ] }) })
    ] }) : /* @__PURE__ */ l("span", { className: "cv-field-pill-body", title: h, children: y }),
    /* @__PURE__ */ l(
      H,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--6",
        onClick: u.onRemove,
        "aria-label": `Remove ${h}`,
        children: /* @__PURE__ */ l(ta, { className: "cv-ec-icon" })
      }
    )
  ] });
}
function qf({
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
  disableReorder: g,
  label: v,
  note: y,
  pickerSide: b,
  pickerAlign: C,
  control: N
}) {
  const w = n.cardinality === "many" && !p, O = w || r.length === 0, M = r.length, D = h === "vertical", _ = v ?? n.label, $ = /* @__PURE__ */ l(
    mo,
    {
      well: n,
      placed: a,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: b ?? (D ? "right" : "top"),
      align: C ?? "start",
      children: /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          className: S(
            "cv-well-add",
            D && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(wt, { className: "cv-ec-icon" }),
            r.length === 0 ? _ : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "well-group",
      className: S("cv-well-group", !D && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ f("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: _ }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        N ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: N }) : null,
        /* @__PURE__ */ f("div", { className: S("cv-well-fields", D ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((L, R) => /* @__PURE__ */ l(
            Vf,
            {
              spec: e,
              update: t,
              well: n,
              member: L,
              option: i(L),
              resolvedColor: o(L),
              className: D ? "cv-field-pill--full" : void 0,
              reorder: w && M > 1 && !g ? {
                canUp: R > 0,
                canDown: R < M - 1,
                onUp: () => t(Va(e, n, R, R - 1)),
                onDown: () => t(Va(e, n, R, R + 1))
              } : void 0
            },
            L
          )),
          O ? $ : null
        ] }),
        y ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: y }) : null
      ]
    }
  );
}
function Zn({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ f(we, { children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ f("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(Ye, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Se, { align: "start", className: "cv-kpi-section-popover", children: n })
  ] });
}
function Qr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function jf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Qr(e, t), a = oo(e), i = (u = e.query.timeDimensions) == null ? void 0 : u[0], o = n.display ?? "number", s = n.gauge, c = (m) => {
    const h = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!h) return;
    const p = { ...h };
    for (const g of Object.keys(m)) {
      const v = m[g];
      v === void 0 ? delete p[g] : p[g] = v;
    }
    delete p.granularity, t({ ...e, query: { ...e.query, timeDimensions: [p] } });
  };
  return /* @__PURE__ */ f("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Bt, { label: "Time field", children: /* @__PURE__ */ l(
      uo,
      {
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (m) => c({ dimension: m }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Bt, { label: "Date range", children: /* @__PURE__ */ l(
      _t,
      {
        kind: "dateRange",
        value: i.dateRange,
        onChange: (m) => c({ dateRange: m }),
        renderFixed: (m, h) => /* @__PURE__ */ l(Yr, { value: m, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(ie, { label: "Display", children: /* @__PURE__ */ l(
      Qt,
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
    o === "gauge" ? /* @__PURE__ */ l(Bt, { label: "Gauge max", children: /* @__PURE__ */ l(
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
function Hf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Qr(e, t), a = n.comparison, i = a !== void 0, o = k.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ f("div", { className: "cv-kpi-options", children: [
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
    i ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ l(ie, { label: "Against", children: /* @__PURE__ */ l(
        Qt,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Bt, { label: "Baseline value", children: /* @__PURE__ */ l(
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
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ f("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Ja, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ f("span", { children: [
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
function Wf({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Qr(e, t), a = n.sparkline, i = a !== void 0, o = n.comparison !== void 0, s = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ f("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Show sparkline",
        checked: i,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    i ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ l(Bt, { label: "Trend granularity", children: /* @__PURE__ */ l(
        _t,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ l(vo, { value: u, onChange: m, className: "cv-ec-h8 cv-ec-full" })
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
function Bt({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("span", { className: "cv-ec-label", children: e }),
    t
  ] });
}
function Bf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var fe, ke, De, B;
  const { meta: a } = Ie(), { locale: i } = Le(), o = Xe(), { chart: s } = e, c = s.family, u = o.require(c), m = u.queryless ?? !1, h = oo(e), p = k.useMemo(() => Pn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), g = k.useCallback(
    (A) => A && (i == null ? void 0 : i.unitSystem) === "imperial" && p[A] ? p[A].imperialUnit : A,
    [i == null ? void 0 : i.unitSystem, p]
  ), v = k.useMemo(() => Dh(c, o), [c, o]), y = k.useMemo(() => en(e, o), [e, o]), b = k.useMemo(() => new Map(v.map((A) => [A.id, A])), [v]), [C, N] = k.useState(void 0), w = k.useMemo(
    () => Df(a, e, C, o),
    [a, e, C, o]
  ), O = k.useMemo(() => Object.values(y).flat(), [y]), M = k.useCallback(
    (A) => {
      N(A), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), D = k.useMemo(
    () => {
      var A;
      return w.viewLocked ? [w.viewLocked] : [(A = w.sourceCube) == null ? void 0 : A.name, ...w.relatedCubes.map((z) => z.name)].filter(
        Boolean
      );
    },
    [w]
  ), _ = k.useMemo(
    () => Object.values(y).every((A) => A.length === 0),
    [y]
  ), $ = k.useMemo(() => {
    const A = (y.y ?? [])[0], z = A ? Pe(a, A) : void 0;
    return {
      leftKey: A ? La(z) : void 0,
      leftLabel: A ? Kf(z, g(z == null ? void 0 : z.unit)) : void 0
    };
  }, [y, a, g]), L = k.useCallback(
    (A, z) => {
      var j;
      if (z) {
        if (!Of(w, z.cube))
          return "Clear the current fields to use a different dataset.";
        if (z.memberType === "measure" && w.measureSource && z.cube !== w.measureSource)
          return `Measures come from one table (${((j = w.sourceCube) == null ? void 0 : j.title) ?? w.measureSource}). Remove them to switch.`;
        if (A === "y" && z.memberType === "measure") {
          const { leftKey: Y, leftLabel: I } = $;
          if (Y !== void 0 && La(z) !== Y)
            return `This axis shows ${I}; ${z.label ?? "this field"} is ${lo(z)}`;
        }
      }
    },
    [w, $]
  ), R = $.leftLabel, E = k.useMemo(() => {
    var z;
    const A = {};
    if (c === "bar" || c === "line" || c === "area") {
      const j = (z = s.mapping) == null ? void 0 : z.series;
      if (j && j.mode === "measures") {
        const Y = j.members.map((F) => {
          var X, xe;
          return { key: F, colorToken: (xe = (X = j.meta) == null ? void 0 : X[F]) == null ? void 0 : xe.colorToken };
        }), I = Ei(Y, s.colors);
        j.members.forEach((F, X) => {
          A[F] = I[X];
        });
      }
    }
    return A;
  }, [c, s.mapping, s.colors]), T = k.useCallback(
    (A, z, j) => {
      const Y = Pe(a, z);
      if (L(A, Y)) return;
      let I = j === "geoPoint" && (Y != null && Y.latMember) && Y.lngMember ? nn(
        nn(e, c, "lat", Y.latMember, "numberDimension", o),
        c,
        "lng",
        Y.lngMember,
        "numberDimension",
        o
      ) : nn(e, c, A, z, j, o);
      const F = u.canonicalTimeWell;
      if (F && A !== F && (y[F] ?? []).length === 0) {
        const X = xh(a, Y == null ? void 0 : Y.cube);
        X && X.name !== z && !L(F, X) && (I = nn(I, c, F, X.name, "time", o));
      }
      t(I);
    },
    [L, a, t, e, c, o, u, y]
  ), x = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, V = x.left.map((A) => b.get(A)).filter(Boolean), q = x.bottom.map((A) => b.get(A)).filter(Boolean), P = (fe = y.color) == null ? void 0 : fe[0], U = ((ke = y.y) == null ? void 0 : ke.length) ?? 0, W = P && U > 1 ? `${U} measures × ${((De = Pe(a, P)) == null ? void 0 : De.label) ?? "this split"} — one series per measure per value.` : void 0, K = u.hasLegend, J = (y.y ?? [])[0], te = (A) => {
    var Y, I, F, X;
    if (!A) return;
    const z = (Y = s.mapping) == null ? void 0 : Y.series;
    return (z && z.mode === "measures" ? (F = (I = z.meta) == null ? void 0 : I[A]) == null ? void 0 : F.label : void 0) ?? ((X = Pe(a, A)) == null ? void 0 : X.label);
  }, ae = (A) => {
    var j, Y, I, F;
    const z = (X, xe) => xe ? /* @__PURE__ */ l(Cf, { spec: e, update: t, axis: X, title: "Title", auto: te(xe) }) : null;
    switch (A) {
      case "y":
        return z("y", J);
      // the single value axis
      case "x":
        return z("x", (Y = (j = s.mapping) == null ? void 0 : j.category) == null ? void 0 : Y.member);
      case "sy":
        return z("y", (I = y.sy) == null ? void 0 : I[0]);
      // scatter Y axis
      case "sx":
        return z("x", (F = y.sx) == null ? void 0 : F[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ce = (A, z) => /* @__PURE__ */ l(
    qf,
    {
      spec: e,
      update: t,
      well: A,
      placed: y[A.id] ?? [],
      allPlaced: O,
      optionFor: (j) => Pe(a, j),
      colorFor: (j) => E[j],
      scope: w,
      blockReason: (j) => L(A.id, j),
      onAdd: (j, Y) => T(A.id, j, Y),
      badge: A.id === "y" ? R : void 0,
      orientation: z,
      note: A.id === "color" ? W : void 0,
      control: ae(A.id)
    },
    A.id
  ), oe = () => {
    const A = b.get("value"), z = (y.value ?? []).length > 0, j = s.familyOptions ?? {};
    return /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ f("div", { className: "cv-edit-kpi-value", children: [
        A ? ce(A, "vertical") : null,
        z ? /* @__PURE__ */ l(
          Zn,
          {
            label: "Time, range & display",
            summary: j.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(jf, { spec: e, update: t })
          }
        ) : null
      ] }),
      z ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ l(Zn, { label: "Comparison", summary: j.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Hf, { spec: e, update: t }) }),
        /* @__PURE__ */ l(Zn, { label: "Sparkline", summary: j.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ l(Wf, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ f("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ f("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !_ || m ? /* @__PURE__ */ l(_f, { spec: e, update: t }) : null,
      /* @__PURE__ */ f("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          kf,
          {
            currentName: w.viewLocked ?? ((B = w.sourceCube) == null ? void 0 : B.name),
            hasFields: O.length > 0,
            onSelect: M
          }
        ),
        /* @__PURE__ */ l(bf, { spec: e, update: t, cube: h, scopeCubes: D, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "cv-edit-overlay-body", children: [
      V.length > 0 ? /* @__PURE__ */ l("div", { className: S("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? oe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        V.map((A) => ce(A, "vertical"))
      ) }) : null,
      /* @__PURE__ */ f("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ f("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Rf, { spec: e, update: t, empty: _ && !m })
        ] }),
        q.length > 0 ? /* @__PURE__ */ f("div", { className: "cv-edit-overlay-bottom", children: [
          q.map((A) => ce(A, "horizontal")),
          K && !_ ? /* @__PURE__ */ l(wf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Kf(e, t) {
  const n = lo(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function bo(e, t) {
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
function er(e) {
  const t = yi.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Uf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = k.useState(() => ({
    spec: e,
    issues: er(e)
  })), [i, o] = k.useState(e);
  k.useEffect(() => {
    a({ spec: e, issues: er(e) }), o(e);
  }, [e]);
  const s = bo((p) => t(p), n), c = r.spec, u = r.issues, m = u.length === 0, h = k.useCallback(
    (p) => {
      const g = er(p);
      a({ spec: p, issues: g }), g.length === 0 && (o(p), s(p));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: h };
}
const Gf = () => {
};
function Yf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = Xe(), { draft: s, issues: c, valid: u, committed: m, update: h } = Uf({
    spec: e,
    onChange: t ?? Gf,
    debounceMs: r
  }), p = o.get(s.chart.family), g = (p == null ? void 0 : p.queryless) ?? !1, v = m, y = (_) => {
    var $, L, R;
    return ((($ = _ == null ? void 0 : _.measures) == null ? void 0 : $.length) ?? 0) > 0 || (((L = _ == null ? void 0 : _.dimensions) == null ? void 0 : L.length) ?? 0) > 0 || (((R = _ == null ? void 0 : _.timeDimensions) == null ? void 0 : R.some((E) => typeof E.granularity == "string")) ?? !1);
  }, b = (_) => {
    var $;
    return ((($ = _ == null ? void 0 : _.measures) == null ? void 0 : $.length) ?? 0) > 0;
  }, C = (p == null ? void 0 : p.requiresMeasure) ?? s.chart.family !== "table", N = g || y(s.query) && y(v.query) && (!C || b(s.query) && b(v.query)), w = C && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", O = k.useCallback(
    (_) => {
      h({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ..._ }
        }
      });
    },
    [s, h]
  ), M = N ? /* @__PURE__ */ l(
    Hr,
    {
      query: v.query ?? {},
      chart: v.chart,
      editing: !0,
      updateFamilyOptions: O
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: w }) }), D = n ? /* @__PURE__ */ f(H, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(si, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ f(Mn, { variant: "destructive", children: [
          /* @__PURE__ */ l(Sr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(Rn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(_n, { children: /* @__PURE__ */ f("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((_, $) => /* @__PURE__ */ f("li", { children: [
              _.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: _.path }) : null,
              " ",
              _.message
            ] }, $)),
            c.length > 3 ? /* @__PURE__ */ f("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Bf, { spec: s, update: h, toolbar: D, children: M }) })
      ]
    }
  );
}
function Qf({
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
  const g = a || i, [v, y] = k.useState(!1);
  k.useEffect(() => {
    if (!v) return;
    const C = setTimeout(() => y(!1), 1600);
    return () => clearTimeout(C);
  }, [v]), k.useEffect(() => {
    h || y(!1);
  }, [h]);
  const b = () => {
    m == null || m(), y(!0);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: S("cv-editor-toolbar", p),
      children: [
        /* @__PURE__ */ l(
          le,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (C) => t(C.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ f("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Xa, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Mr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(rs, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(as, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ f("div", { className: "cv-editor-toolbar-actions", children: [
          g ? /* @__PURE__ */ f(re, { children: [
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(is, {})
              }
            ),
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(os, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ f(
            H,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(ss, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ f(
            H,
            {
              size: "sm",
              onClick: b,
              disabled: h,
              "aria-live": "polite",
              className: S(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                v && "cv-editor-toolbar-save--saved"
              ),
              children: [
                v ? /* @__PURE__ */ l(Qe, {}) : /* @__PURE__ */ l(si, {}),
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
const yo = "lg", ko = 12;
function Jf(e, t) {
  const n = t[yo];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function Xf(e, t) {
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
const Zf = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function ep(e, t, n, r = ko) {
  const a = Zf[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function Co(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? ko) {
  const a = ep(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function tp(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Co(e, a);
}
function np(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function rp(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const ap = 12, ip = 900, op = 0.4;
function sp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function lp({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = Ii(), u = e.grid ?? {}, m = u.cols ?? ap, h = u.rowHeight ?? 40, p = u.margin ?? [12, 12], g = u.containerPadding ?? [0, 0], v = Math.max(op, Math.min(1, c / ip)), y = Math.round(v / 0.05) * 0.05, b = Math.max(8, Math.round(h * y)), C = [
    Math.round(p[0] * y),
    Math.round(p[1] * y)
  ], N = [
    Math.round(g[0] * y),
    Math.round(g[1] * y)
  ], w = k.useMemo(
    () => ({ [yo]: sp(e.layout) }),
    [e.layout]
  ), O = k.useMemo(
    () => new Map(e.widgets.map((L) => [L.id, L])),
    [e.widgets]
  ), M = k.useRef(o);
  k.useEffect(() => {
    M.current = o;
  }, [o]);
  const D = k.useRef(e.layout);
  k.useEffect(() => {
    D.current = e.layout;
  }, [e.layout]);
  const _ = k.useRef(null), $ = k.useCallback(
    (L, R) => {
      const T = Jf(L, R).map((x) => ({ ...x }));
      cp(D.current, T) || M.current(T);
    },
    []
  );
  return /* @__PURE__ */ l(qr, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    ui,
    {
      width: c,
      layouts: w,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: b,
      margin: C,
      containerPadding: N,
      dragConfig: { enabled: !0, handle: `.${vn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: $,
      children: e.layout.map((L) => {
        const R = O.get(L.i);
        if (!R) return null;
        const E = R.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${R.title ?? R.type}`,
              "aria-pressed": E,
              onPointerDown: (T) => {
                _.current = { x: T.clientX, y: T.clientY };
              },
              onClick: (T) => {
                const x = _.current;
                x && Math.hypot(T.clientX - x.x, T.clientY - x.y) > 5 || n(R.id);
              },
              onKeyDown: (T) => {
                (T.key === "Enter" || T.key === " ") && (T.preventDefault(), n(R.id));
              },
              className: S(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                E && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(vr, { widget: R, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: S(vn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ f("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${R.title ?? R.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), r(R.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(ls, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${R.title ?? R.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), a(R.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(cs, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${R.title ?? R.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), i(R.id);
                      },
                      className: S("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Ot, {})
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
function cp(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const up = k.memo(lp);
function mp(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function dp({
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
  const a = mi({
    extensions: [hi],
    editable: !0,
    content: mp(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(Vi, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(ie, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ f("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(hp, { editor: a }),
    /* @__PURE__ */ l(di, { editor: a })
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
      className: S("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function hp({ editor: e }) {
  const [, t] = k.useReducer((n) => n + 1, 0);
  return k.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ f(
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
            children: /* @__PURE__ */ l(us, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(ms, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(ds, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          He,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(hs, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(fs, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          He,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(ps, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(gs, {})
          }
        ),
        /* @__PURE__ */ l(
          He,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(vs, {})
          }
        )
      ]
    }
  );
}
const fp = _r(
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
function pp({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: S(fp({ variant: t }), e), ...n });
}
function gp({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = Ie(), c = k.useMemo(() => Vn(o), [o]), u = c.filter((p) => p.type === "cube"), m = c.filter((p) => p.type === "view"), h = c.find((p) => p.name === e);
  return /* @__PURE__ */ f(Re, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Oe, { id: a, className: i, children: /* @__PURE__ */ l(_e, { placeholder: s ? "Loading…" : n, children: h ? /* @__PURE__ */ l(tr, { option: h }) : void 0 }) }),
    /* @__PURE__ */ f(Te, { children: [
      m.length > 0 ? /* @__PURE__ */ f(fr, { children: [
        /* @__PURE__ */ l(pr, { children: "Views" }),
        m.map((p) => /* @__PURE__ */ l(he, { value: p.name, children: /* @__PURE__ */ l(tr, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ f(fr, { children: [
        /* @__PURE__ */ l(pr, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ l(he, { value: p.name, children: /* @__PURE__ */ l(tr, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function tr({ option: e }) {
  const t = e.type === "view" ? Rr : ai;
  return /* @__PURE__ */ f("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(pp, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const vp = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function bp(e) {
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
function yp({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(bp(s));
  };
  return /* @__PURE__ */ f("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ie,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ f(
          Re,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(_e, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Te, { children: t.map((s) => /* @__PURE__ */ l(he, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ie, { label: "Control", children: /* @__PURE__ */ f(Re, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(_e, {}) }),
      /* @__PURE__ */ l(Te, { children: $s.options.map((s) => /* @__PURE__ */ l(he, { value: s, children: vp[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(kp, { control: r, onChange: a, variables: t })
  ] });
}
function kp({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Cp, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Np, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Sp, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(xp, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Mp, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Rp, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Cp({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ l(
      ie,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          wp,
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
function wp({
  selected: e,
  onChange: t
}) {
  const [n, r] = k.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(on.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === on.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ f(we, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ne, { asChild: !0, children: /* @__PURE__ */ f(H, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(Ye, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Se, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: on.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ f(
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
                className: S("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Qe, { className: "cv-ed-icon-xs" }) : null
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
function Np({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = ut.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ l(
      ie,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ f(
          Re,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(_e, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ f(Te, { children: [
                /* @__PURE__ */ l(he, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(he, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ie, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: ut.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: S("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Sp({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ f(re, { children: [
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
      ie,
      {
        label: "Options",
        action: /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(wt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ f("div", { className: "cv-select-option-row", children: [
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
            H,
            {
              variant: "ghost",
              size: "icon",
              className: S("cv-ed-btn-8", "cv-ed-muted"),
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
function xp({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ l(ie, { label: "From", children: /* @__PURE__ */ f(
      Re,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(_e, {}) }),
          /* @__PURE__ */ f(Te, { children: [
            /* @__PURE__ */ l(he, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(he, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(he, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ie,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          H,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          gp,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Mp({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ l(ie, { label: "Placeholder", children: /* @__PURE__ */ l(
    le,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function Rp({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ l(ie, { label: a, children: /* @__PURE__ */ l(
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
  return /* @__PURE__ */ f(re, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function _p(e) {
  return { schemaVersion: vt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Op(e) {
  const t = {
    schemaVersion: vt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Tp(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function qa({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = r ? (o) => r([...t, o]) : void 0;
  return /* @__PURE__ */ f("div", { "data-slot": "widget-edit-panel", className: S("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ie,
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
      /* @__PURE__ */ l(qr, { spec: _p(t), children: /* @__PURE__ */ l(sf, { createVariable: i, children: /* @__PURE__ */ l("div", { className: S(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Yf,
        {
          fill: a,
          spec: Op(e),
          onChange: (o) => n(Tp(e, o))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(dp, { widget: e, onChange: n }) : /* @__PURE__ */ l(yp, { widget: e, variables: t, onChange: n })
  ] });
}
function Dp({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ f(re, { children: [
    r ? /* @__PURE__ */ l(
      Xt,
      {
        className: S("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "section-header",
      className: S("cv-section-header", s),
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
function Ap({
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
  const u = i !== void 0, [m, h] = k.useState(a), p = r ? u ? i : m : !0, g = k.useId(), v = k.useCallback(() => {
    const y = !p;
    u || h(y), o == null || o(y);
  }, [p, u, o]);
  return /* @__PURE__ */ f(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: S("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          Dp,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: p,
            onToggle: v,
            regionId: g
          }
        ),
        p ? /* @__PURE__ */ l("div", { id: g, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function Lp(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Ep(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Pp(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function $p(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Fp(e, t) {
  switch (e) {
    case "chart":
      return Ep(t);
    case "text":
      return Pp(t);
    case "input":
      return $p(t);
  }
}
function zp(e) {
  return { name: e, type: "string" };
}
function Ip(e) {
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
const ja = {
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
function Vp({
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
    t(e.map((h, p) => p === u ? qp(h, m) : h));
  }, o = (u) => t(e.filter((m, h) => h !== u)), s = () => t([...e, zp(a())]), c = (u, m) => {
    const h = u + m;
    if (h < 0 || h >= e.length) return;
    const p = e.slice();
    [p[u], p[h]] = [p[h], p[u]], t(p);
  };
  return /* @__PURE__ */ l(
    Ap,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(wt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ f("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ f("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ f(H, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(wt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        jp,
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
function qp(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Ip(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function jp({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, c] = k.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ f("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => c((m) => !m),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(Ye, {}) : /* @__PURE__ */ l(Xt, {})
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
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: ja[e.type] }),
          /* @__PURE__ */ f("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: S("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Nn, {})
              }
            ),
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: S("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Sn, {})
              }
            ),
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: S("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Ot, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ f("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ie, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ f(Re, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(_e, {}) }),
            /* @__PURE__ */ l(Te, { children: vi.options.map((m) => /* @__PURE__ */ l(he, { value: m, children: ja[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(ie, { label: "Label", hint: "Optional human label for controls.", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
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
          /* @__PURE__ */ l(Hp, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function Hp({
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
    return /* @__PURE__ */ l(ie, { label: "Default", className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Wp(e.default);
  return /* @__PURE__ */ l(ie, { label: "Default", hint: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    le,
    {
      value: r,
      placeholder: Bp(e.type),
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
function Wp(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Bp(e) {
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
function Dg({
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
  className: g
}) {
  var j, Y;
  const [v, y] = k.useState(e), [b, C] = k.useState(e);
  k.useEffect(() => {
    y(e), C(e);
  }, [e]);
  const [N, w] = k.useState(null), O = k.useRef(0), [M, D] = k.useState(null), _ = k.useRef(N), $ = k.useRef(M), L = k.useRef(v);
  k.useEffect(() => {
    _.current = N, $.current = M, L.current = v;
  });
  const R = k.useRef(null);
  R.current === null && (R.current = i ?? Lp());
  const E = i ?? R.current, T = bo(
    (I) => r == null ? void 0 : r(I),
    o
  ), x = k.useCallback(
    (I) => {
      O.current = Date.now(), y((F) => {
        const X = I(F);
        return T(X), X;
      });
    },
    [T]
  ), V = k.useRef(t);
  k.useEffect(() => {
    if (!t || t === V.current) return;
    const I = 500;
    let F = null;
    const X = () => {
      var Lt;
      const xe = Date.now() - O.current;
      if (xe < I) {
        F = setTimeout(X, I - xe);
        return;
      }
      V.current = t;
      const ft = /* @__PURE__ */ new Set();
      ((Lt = $.current) == null ? void 0 : Lt.kind) === "widget" && ft.add($.current.id), _.current && ft.add(_.current);
      const At = Gp(t, L.current, ft);
      y(At), n == null || n(At);
    };
    return X(), () => {
      F && clearTimeout(F);
    };
  }, [t]);
  const q = k.useCallback(
    (I) => {
      const F = Fp(I, E());
      x((X) => Co(X, F)), w(F.id), D({ kind: "widget", id: F.id });
    },
    [x, E]
  ), P = k.useCallback((I) => w(I), []), U = k.useCallback((I) => {
    w(I), D({ kind: "widget", id: I });
  }, []), W = k.useCallback(
    (I) => {
      x((F) => np(F, I)), w((F) => F === I ? null : F), D((F) => (F == null ? void 0 : F.kind) === "widget" && F.id === I ? null : F);
    },
    [x]
  ), K = k.useCallback(
    (I) => {
      const F = E();
      x((X) => tp(X, I, F)), w(F);
    },
    [x, E]
  ), J = k.useCallback(
    (I) => x((F) => rp(F, I)),
    [x]
  ), te = k.useCallback(
    (I) => x((F) => {
      const X = Xf(F.layout, I);
      return Up(F.layout, X) ? F : { ...F, layout: X };
    }),
    [x]
  ), ae = k.useCallback(
    (I) => x((F) => ({ ...F, name: I || void 0 })),
    [x]
  ), ce = k.useCallback(
    (I) => x((F) => ({ ...F, variables: I })),
    [x]
  ), oe = k.useDeferredValue(v), fe = k.useMemo(
    () => lr.safeParse(oe),
    [oe]
  ), ke = k.useCallback(() => {
    const I = lr.safeParse(v);
    I.success && (a == null || a(I.data), C(v));
  }, [v, a]), De = v !== b, B = (M == null ? void 0 : M.kind) === "widget" ? v.widgets.find((I) => I.id === M.id) ?? null : null;
  k.useEffect(() => {
    (M == null ? void 0 : M.kind) === "widget" && !v.widgets.some((I) => I.id === M.id) && D(null);
  }, [M, v.widgets]);
  const A = k.useCallback(() => D(null), []), z = (M == null ? void 0 : M.kind) === "variables" ? "Dashboard variables" : B ? B.title ?? `${Kp(B.type)} widget` : "";
  return /* @__PURE__ */ l(Vr, { families: p, children: /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Y = (j = v.grid) == null ? void 0 : j.margin) == null ? void 0 : Y[0]) ?? 12 },
      className: S("cv-dashboard-editor", g),
      children: [
        /* @__PURE__ */ l(
          Qf,
          {
            name: v.name ?? "",
            onNameChange: ae,
            onAdd: q,
            onEditVariables: () => D({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: h,
            discardDisabled: !De,
            onSave: a ? ke : void 0,
            saveDisabled: !fe.success || !De,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        fe.success ? null : /* @__PURE__ */ f("p", { className: "cv-dashboard-editor-validation", children: [
          fe.error.issues.length,
          " validation issue",
          fe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: M ? null : /* @__PURE__ */ l(
          up,
          {
            spec: v,
            selectedId: N,
            onSelect: P,
            onEdit: U,
            onDuplicate: K,
            onDelete: W,
            onLayoutChange: te
          }
        ) }),
        M ? /* @__PURE__ */ f(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": z,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ f("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ f("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", onClick: A, children: [
                    /* @__PURE__ */ l(xr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: z })
                ] }),
                B ? /* @__PURE__ */ f(
                  H,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => W(B.id),
                    children: [
                      /* @__PURE__ */ l(Ot, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: M.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(Vp, { variables: v.variables, onChange: ce }) }) : (B == null ? void 0 : B.type) === "chart" ? /* @__PURE__ */ l(
                qa,
                {
                  fill: !0,
                  widget: B,
                  variables: v.variables,
                  onChange: J,
                  onVariablesChange: ce
                }
              ) : B ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                qa,
                {
                  widget: B,
                  variables: v.variables,
                  onChange: J,
                  onVariablesChange: ce
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Kp(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Up(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Gp(e, t, n) {
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
  Al as AreaChartFamily,
  vl as AreaFamilyOptionsSchema,
  Ls as AxesOptionsSchema,
  ia as AxisOptionsSchema,
  kg as BUILTIN_CHART_FAMILIES,
  qe as BUILTIN_DEFAULTS,
  Ve as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Tl as BarChartFamily,
  pl as BarFamilyOptionsSchema,
  yo as CANONICAL_BREAKPOINT,
  Ue as ChartColorTokenSchema,
  Bf as ChartEditOverlay,
  Yf as ChartEditor,
  _s as ChartFamilySchema,
  gi as ChartOptionsSchema,
  Tc as ChartRenderer,
  yi as ChartSpecSchema,
  Tg as ChartView,
  zs as ChartWidgetSchema,
  Es as ColorAssignmentSchema,
  wl as CondFormatRuleSchema,
  Hr as CubeChart,
  Km as CubeChartSpec,
  pi as CubeQuerySchema,
  $n as CubeVizContext,
  Rg as CubeVizProvider,
  ct as DEFAULT_COLOR_RAMP,
  ko as DEFAULT_COLS,
  hr as DEFAULT_UNIT_CONVERSIONS,
  vn as DRAG_HANDLE_CLASS,
  Og as Dashboard,
  Dg as DashboardEditor,
  qr as DashboardProvider,
  lr as DashboardSpecSchema,
  or as DateRangeSchema,
  xl as EMPTY_FAMILY_DEFAULT,
  sa as EM_DASH,
  up as EditorCanvas,
  Qf as EditorToolbar,
  Vr as FamilyRegistryOverride,
  mf as FilterBuilder,
  Ss as FilterOperatorSchema,
  Os as FormatKindSchema,
  xn as FormatOptionsSchema,
  nl as GRANULARITY_PATTERN,
  ut as GranularitySchema,
  Hs as GridConfigSchema,
  ql as HeatmapChartFamily,
  Sl as HeatmapFamilyOptionsSchema,
  $s as InputControlKindSchema,
  Fs as InputControlSchema,
  yp as InputWidgetEditor,
  Vs as InputWidgetSchema,
  fd as InputWidgetView,
  Wl as KpiFamily,
  kl as KpiFamilyOptionsSchema,
  js as LayoutItemSchema,
  xs as LeafFilterSchema,
  Ds as LegendOptionsSchema,
  Dl as LineChartFamily,
  gl as LineFamilyOptionsSchema,
  ne as MemberSchema,
  na as OrderDirSchema,
  Rs as OrderSpecSchema,
  Ll as PieChartFamily,
  bl as PieFamilyOptionsSchema,
  sr as QueryFilterSchema,
  On as ReferenceLineOptSchema,
  vr as RenderWidget,
  vt as SCHEMA_VERSION,
  Ns as ScalarSchema,
  Pl as ScatterChartFamily,
  yl as ScatterFamilyOptionsSchema,
  Ts as SeriesMappingSchema,
  ra as SeriesMetaSchema,
  ki as SpecSchema,
  Cl as TableColumnOptSchema,
  rc as TableFamily,
  Nl as TableFamilyOptionsSchema,
  dp as TextWidgetEditor,
  Is as TextWidgetSchema,
  Gm as TextWidgetView,
  Ms as TimeDimensionSchema,
  Ps as TipTapDocSchema,
  As as TooltipOptionsSchema,
  fn as VarRefSchema,
  Ws as VariableDeclSchema,
  vi as VariableTypeSchema,
  fi as VariableValueSchema,
  Vp as VariablesPanel,
  Ki as WidgetChrome,
  qa as WidgetEditPanel,
  qs as WidgetSpecSchema,
  Co as appendWidget,
  Cc as areaChartFamily,
  pa as assignColors,
  Om as axisKey,
  yc as barChartFamily,
  Ir as buildFamilyRegistry,
  Mg as builtinCharts,
  ze as builtinFamilyDescriptors,
  An as builtinFamilyRegistry,
  Xs as createCubeClient,
  Lp as createIdFactory,
  Gc as createQueryResolver,
  Fi as createUnitsFormatter,
  Yc as createVariableStore,
  il as datePattern,
  cr as deepMerge,
  zr as defaultChartFamilies,
  Ip as defaultForType,
  Dr as defaultFormatter,
  Zs as fetchMeta,
  Sg as formatCategory,
  Ht as formatDateValue,
  Sh as geoPointId,
  Sc as heatmapChartFamily,
  St as isEmptyValue,
  Me as isVarRef,
  xc as kpiChartFamily,
  kc as lineChartFamily,
  Js as loadSpec,
  Ci as looksLikeIsoDate,
  Ni as makeChartFormat,
  Ng as makeDateFormatter,
  xg as makeFormatter,
  Xf as mergeLayout,
  Pn as mergeUnitConversions,
  Ep as newChartWidget,
  $p as newInputWidget,
  Pp as newTextWidget,
  zp as newVariable,
  Fp as newWidget,
  Fc as normalize,
  Jf as pickCanonicalLayout,
  wc as pieChartFamily,
  ep as placeNewItem,
  Dm as quantityLabel,
  np as removeWidget,
  rp as replaceWidget,
  Pm as resolveChart,
  _c as resolveOptions,
  Ml as resolveOptionsWith,
  Pi as resolveQuery,
  jc as resolveRelativeDateRange,
  Ei as resolveSeriesColors,
  Wc as resolveValue,
  Cg as safeLoadSpec,
  Nc as scatterChartFamily,
  Mc as tableChartFamily,
  al as toDate,
  Ac as toResultAnnotation,
  Uf as useChartEditorState,
  Ii as useContainerWidth,
  Ie as useCubeMeta,
  Fm as useCubeQuery,
  Le as useCubeVizContext,
  zi as useDashboard,
  bo as useDebouncedCallback,
  Xe as useFamilyRegistry,
  _g as useFormatter,
  Qn as useNormalizedSeries,
  jr as useOptionalDashboard,
  wg as validateSpec
};
//# sourceMappingURL=index.js.map
