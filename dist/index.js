var fl = Object.defineProperty;
var hl = (e, t, n) => t in e ? fl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var dr = (e, t, n) => hl(e, typeof t != "symbol" ? t + "" : t, n);
import { z as g } from "zod";
import { jsx as l, jsxs as y, Fragment as ve } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as ae, createContext as Gi, useContext as oa, useState as Ct, useCallback as nt, useEffect as fn, useRef as pt, createElement as pl, useSyncExternalStore as Yi, useId as gl, Component as vl } from "react";
import { ruleX as Qi, ruleY as Ji, text as ln, colorLegend as sa, group as bl, stack as Xi, barX as ei, barY as ti, lineX as yl, lineY as qn, defineChart as ct, areaY as Tr, dot as Zi, cell as kl } from "@tanstack/charts";
import { crosshair as eo } from "@tanstack/charts/crosshair";
import { scaleBand as wl } from "@tanstack/charts/scales/band";
import { scaleLinear as Rn } from "@tanstack/charts/scales/linear";
import { scalePoint as Cl } from "@tanstack/charts/scales/point";
import { Chart as Nl } from "@tanstack/charts/react/core";
import { motion as to } from "@tanstack/charts/motion";
import { tooltip as la } from "@tanstack/charts/tooltip";
import { d3Curve as fr } from "@tanstack/charts/d3/shape";
import { brushX as Sl } from "@tanstack/charts/interaction/brush";
import { controlledSignal as xl } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Ml, scaleLog as ni, scaleSqrt as Rl } from "d3-scale";
import { curveNatural as Tl, curveStepAfter as Ol, curveMonotoneX as _l } from "d3-shape";
import { format as be, isValid as Ut, parseISO as Tn, subDays as xe, startOfWeek as On, endOfWeek as _n, startOfMonth as gt, endOfMonth as Zt, startOfQuarter as vt, endOfQuarter as en, startOfYear as bt, endOfYear as tn, subWeeks as Or, subMonths as yt, subQuarters as kt, subYears as wt, differenceInCalendarDays as Al, parse as no } from "date-fns";
import { clsx as Dl } from "clsx";
import * as Re from "@radix-ui/react-select";
import { Minus as ro, ArrowUp as ca, ArrowDown as ua, CalendarRange as ao, ChevronsUpDown as El, AreaChart as Ll, BarChart3 as io, Grid3X3 as Fl, Table as Il, Gauge as $l, ScatterChart as Pl, PieChart as zl, LineChart as Vl, AlertCircle as ma, ChevronLeft as da, ChevronRight as Un, ChevronDown as ut, Check as Wt, ChevronUp as jl, CalendarIcon as oo, MoreVertical as Wl, RefreshCw as Kl, Image as Bl, Sheet as Hl, Search as ql, ListChecks as Ul, Table2 as so, Database as lo, Layers as co, Calendar as Gl, Type as uo, Hash as ri, MapPin as Yl, Variable as Ql, Plus as Nt, Trash2 as Kt, ListFilter as Jl, EyeOff as Xl, Eye as Zl, AlertTriangle as ec, GripVertical as tc, X as _r, ArrowLeftRight as nc, Save as mo, Braces as rc, Undo2 as ac, Redo2 as ic, RotateCcw as oc, SlidersHorizontal as sc, Pencil as lc, Copy as cc, Bold as uc, Italic as mc, Strikethrough as dc, Heading1 as fc, Heading2 as hc, List as pc, ListOrdered as gc, Quote as vc, Box as bc } from "lucide-react";
import * as An from "@radix-ui/react-popover";
import { cva as fa } from "class-variance-authority";
import yc from "@cubejs-client/core";
import { DayPicker as kc, useDayPicker as wc } from "react-day-picker";
import { pie as Cc, radialArc as Ar, radialText as hr, polar as fo } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as ho } from "react-grid-layout";
import { useEditor as po, EditorContent as go } from "@tiptap/react";
import vo from "@tiptap/starter-kit";
const Et = 5, Dn = g.object({ var: g.string().min(1) }).strict();
function Ne(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const En = (e) => g.union([e, Dn]), Nc = g.union([g.string(), g.number(), g.boolean()]), it = g.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), It = "auto", Sc = g.union([it, g.literal(It)]), Dr = g.union([g.tuple([g.string(), g.string()]), g.string()]), bo = g.union([
  g.string(),
  g.number(),
  g.boolean(),
  g.tuple([g.string(), g.string()]),
  // absolute date range
  g.array(g.string()),
  g.array(g.number())
]), de = g.string().min(1), xc = g.enum([
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
]), Mc = g.object({
  member: de,
  operator: xc,
  values: g.array(g.union([Nc, Dn])).optional()
}).strict(), Er = g.lazy(
  () => g.union([
    Mc,
    g.object({ and: g.array(Er) }).strict(),
    g.object({ or: g.array(Er) }).strict()
  ])
), Rc = g.object({
  dimension: de,
  granularity: En(Sc).optional(),
  dateRange: En(Dr).optional(),
  compareDateRange: g.array(Dr).optional()
}).strict(), ai = g.enum(["asc", "desc"]), Tc = g.union([
  g.record(de, ai),
  g.array(g.tuple([de, ai]))
]), yo = g.object({
  measures: g.array(de).optional(),
  dimensions: g.array(de).optional(),
  timeDimensions: g.array(Rc).optional(),
  filters: g.array(Er).optional(),
  segments: g.array(de).optional(),
  order: Tc.optional(),
  limit: En(g.number()).optional(),
  offset: En(g.number()).optional(),
  total: g.boolean().optional(),
  timezone: g.string().optional()
}).strict(), Oc = g.string().min(1), jy = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], ot = g.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), _c = g.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), ha = g.object({
  kind: _c.optional(),
  decimals: g.number().optional(),
  abbreviate: g.boolean().optional(),
  prefix: g.string().optional(),
  suffix: g.string().optional(),
  unitSystem: g.enum(["metric", "imperial"]).optional(),
  dateFormat: g.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: g.string().optional()
}).strict(), ii = g.object({
  label: g.string().optional(),
  colorToken: ot.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: g.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: g.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), Ac = g.object({
  category: g.object({ member: de }).strict(),
  series: g.union([
    g.object({
      mode: g.literal("measures"),
      members: g.array(de),
      meta: g.record(de, ii).optional()
    }).strict(),
    g.object({
      mode: g.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: de,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: g.array(de).optional(),
      pivot: de,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: g.record(de, ii).optional()
    }).strict()
  ])
}).strict(), Dc = g.object({
  show: g.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: g.enum(["top", "bottom"]).optional()
}).strict(), Ec = g.object({
  show: g.boolean().optional(),
  indicator: g.enum(["dot", "line", "dashed"]).optional(),
  showTotal: g.boolean().optional()
}).strict(), oi = g.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: g.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: g.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: g.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: g.tuple([g.number(), g.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: ha.optional()
}).strict(), Lc = g.object({
  x: oi.optional(),
  y: oi.optional()
}).strict(), Fc = g.object({
  byKey: g.record(g.string(), ot).optional(),
  ramp: g.array(ot).optional()
}).strict(), wn = 7, Ic = g.enum(["rollingAvg", "cumulative", "percentOfTotal"]), $c = g.object({
  kind: Ic,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: g.number().int().min(2).max(90).optional()
}).strict(), ko = g.object({
  family: Oc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ac.optional(),
  orientation: g.enum(["vertical", "horizontal"]).optional(),
  stackMode: g.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Dc.optional(),
  tooltip: Ec.optional(),
  axes: Lc.optional(),
  colors: Fc.optional(),
  format: ha.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: $c.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: g.record(g.string(), g.unknown()).optional()
}).strict(), Pc = g.object({ type: g.string(), content: g.array(g.unknown()).optional() }).passthrough(), zc = g.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Vc = g.object({
  variable: g.string().min(1),
  control: g.discriminatedUnion("kind", [
    g.object({
      kind: g.literal("dateRange"),
      presets: g.array(g.string()).optional(),
      allowFuture: g.boolean().optional()
    }).strict(),
    g.object({
      kind: g.literal("granularity"),
      options: g.array(it).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: g.string().optional()
    }).strict(),
    g.object({
      kind: g.literal("select"),
      options: g.array(g.object({ value: bo, label: g.string() }).strict()),
      multiple: g.boolean().optional()
    }).strict(),
    g.object({
      kind: g.literal("memberSelect"),
      from: g.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: g.string().optional()
    }).strict(),
    g.object({ kind: g.literal("text"), placeholder: g.string().optional() }).strict(),
    g.object({
      kind: g.literal("number"),
      min: g.number().optional(),
      max: g.number().optional(),
      step: g.number().optional()
    }).strict(),
    g.object({ kind: g.literal("toggle") }).strict()
  ])
}).strict(), pa = {
  id: g.string().min(1),
  title: g.string().optional()
}, jc = g.object({ ...pa, type: g.literal("chart"), query: yo.default({}), chart: ko }).strict(), Wc = g.object({ ...pa, type: g.literal("text"), doc: Pc }).strict(), Kc = g.object({ ...pa, type: g.literal("input"), control: Vc }).strict(), Bc = g.discriminatedUnion("type", [
  jc,
  Wc,
  Kc
]), Hc = g.object({
  i: g.string(),
  x: g.number(),
  y: g.number(),
  w: g.number(),
  h: g.number(),
  minW: g.number().optional(),
  minH: g.number().optional(),
  static: g.boolean().optional()
}).strict(), qc = g.object({
  cols: g.number().optional(),
  rowHeight: g.number().optional(),
  margin: g.tuple([g.number(), g.number()]).optional(),
  containerPadding: g.tuple([g.number(), g.number()]).optional()
}).strict(), wo = g.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Uc = g.object({
  name: g.string().min(1),
  type: wo,
  label: g.string().optional(),
  array: g.boolean().optional(),
  default: bo.optional()
}).strict(), Co = {
  schemaVersion: g.literal(Et),
  id: g.string().min(1),
  name: g.string().optional(),
  description: g.string().optional(),
  createdAt: g.string().optional(),
  updatedAt: g.string().optional()
}, No = g.object({ ...Co, kind: g.literal("chart"), query: yo.default({}), chart: ko }).strict(), Lr = g.object({
  ...Co,
  kind: g.literal("dashboard"),
  variables: g.array(Uc),
  widgets: g.array(Bc),
  layout: g.array(Hc),
  grid: qc.optional()
}).strict(), So = g.discriminatedUnion("kind", [No, Lr]);
function Z(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Ue(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function Gc(e) {
  if (!Z(e.axes)) return;
  const t = Ue(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Yc(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Z(a)) continue;
    const i = Ue(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Qc(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => Z(n) ? Ue(n, "side") ?? {} : n
  ));
}
function Jc(e) {
  const t = Z(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(Z) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = Z(e.mapping) ? e.mapping : void 0, a = r && Z(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = Z(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function si(e) {
  Z(e) && (e.family === "combo" && Jc(e), Gc(e), Yc(e), Qc(e));
}
function Xc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    si(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && si(n.chart);
  return t;
}
function Zc(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Z(a)) continue;
    const i = Ue(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function eu(e) {
  if (!Z(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function tu(e) {
  if (Z(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Z(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = Ue(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function nu(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = Ue(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function li(e) {
  Z(e) && (Zc(e), eu(e), tu(e), nu(e));
}
function ru(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    li(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && li(n.chart);
  return t;
}
const au = {
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
function iu(e) {
  if (!Z(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = au[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = Ue(r, a) ?? {};
  e.familyOptions = r;
}
function ou(e) {
  if (Z(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Z(n) || n.labelHide !== !0) continue;
      const r = Ue(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function ci(e) {
  Z(e) && (iu(e), ou(e));
}
function su(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ci(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && ci(n.chart);
  return t;
}
function lu(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  let n;
  const r = {};
  for (const [o, s] of Object.entries(t.meta)) {
    if (!Z(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = Ue(s, "curve");
    c && (r[o] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const a = e.family;
  if (n === void 0 || a !== "line" && a !== "area") return;
  const i = Z(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function cu(e) {
  const t = structuredClone(e), n = (r) => {
    Z(r) && lu(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      Z(r) && r.type === "chart" && n(r.chart);
  return t;
}
const uu = {
  1: Xc,
  2: ru,
  3: su,
  4: cu
};
function mu(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Et)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Et} — update the library`
    );
  for (; n < Et; ) {
    const r = uu[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return So.parse(t);
}
function Wy(e) {
  try {
    return { ok: !0, spec: mu(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Ky(e) {
  return So.parse(e);
}
function du(e) {
  return yc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function fu(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function D(...e) {
  return Dl(e);
}
function hu({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: D("cv-skeleton", e), ...t });
}
const pu = fa(
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
), Gn = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: D(pu({ variant: t }), e),
    ...n
  }
));
Gn.displayName = "Alert";
const Yn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: D("cv-alert-title", e),
      ...t
    }
  )
);
Yn.displayName = "AlertTitle";
const Qn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: D("cv-alert-description", e),
      ...t
    }
  )
);
Qn.displayName = "AlertDescription";
const gu = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, vu = "MMM d, yyyy";
function xo(e) {
  if (e instanceof Date) return Ut(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Ut(r) ? r : null;
  }
  const t = Tn(e);
  if (Ut(t)) return t;
  const n = new Date(e);
  return Ut(n) ? n : null;
}
function ga(e) {
  return /^\d{4}-\d{2}/.test(e) ? Ut(Tn(e)) : !1;
}
function bu(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? gu[t] : vu;
}
function nn(e, t, n) {
  const r = xo(e);
  return r ? be(r, bu(t, n)) : String(e);
}
function By(e, t) {
  return (n) => n == null ? "" : nn(n, e, t);
}
function Hy(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? nn(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? nn(e, t.format, t.granularity) : String(e) : ga(e) ? nn(e, t.format, t.granularity) : e;
}
const ui = "—", yu = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function mi(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ku(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of yu)
    if (n >= r) return mi((e / r).toFixed(t)) + a;
  return mi(e.toFixed(t));
}
function wu(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Cu(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? ku(e, n.decimals ?? 1) : wu(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function Mo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Nu(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Mo(e.value) ? !0 : typeof e.value == "string" ? ga(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const va = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? ui : (Mo(t) || typeof t == "string" || typeof t == "number") && Nu(e) ? nn(t, n, r) : typeof t == "number" ? Cu(t, e) : String(t);
};
function Su(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function qy(e, t) {
  return (n, r) => {
    const a = r ? Su(r, t) : void 0;
    return va({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function xu(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Mu(e) {
  const t = it.safeParse(e);
  return t.success ? t.data : void 0;
}
function Ru(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Mu(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function ba(e, t, n, r) {
  const a = Ru(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : ba(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, c = "value") {
      const u = s ? xu(s, e) : void 0, d = u == null ? void 0 : u.meta;
      return n({
        value: o,
        member: s,
        meta: d,
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
const Jn = g.object({
  axis: g.enum(["x", "y"]),
  value: g.number(),
  label: g.string().optional(),
  colorToken: ot.optional()
}).strict(), ya = g.boolean().optional(), Tu = g.object({
  showValueLabels: g.boolean().optional(),
  referenceLines: g.array(Jn).optional(),
  comparePrevious: ya
}).strict(), Ro = g.enum(["linear", "monotone", "step", "natural"]), Ou = g.object({
  curve: Ro.optional(),
  dots: g.union([g.boolean(), g.literal("active")]).optional(),
  connectNulls: g.boolean().optional(),
  chrome: g.enum(["full", "none"]).optional(),
  referenceLines: g.array(Jn).optional(),
  showValueLabels: g.boolean().optional(),
  comparePrevious: ya
}).strict(), _u = g.object({
  curve: Ro.optional(),
  connectNulls: g.boolean().optional(),
  dots: g.boolean().optional(),
  referenceLines: g.array(Jn).optional(),
  comparePrevious: ya
}).strict(), Au = g.object({
  innerRadiusPct: g.number().optional(),
  showLabels: g.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: g.object({ value: g.string().optional(), label: g.string().optional() }).strict().optional(),
  maxSlices: g.number().optional()
}).strict(), Du = g.object({
  x: de,
  y: de,
  size: de.optional(),
  groupBy: de.optional(),
  referenceLines: g.array(Jn).optional()
}).strict(), Eu = g.object({
  display: g.enum(["number", "gauge"]).optional(),
  measure: de,
  comparison: g.object({
    mode: g.enum(["previousPeriod", "value"]),
    value: g.union([de, g.number()]).optional(),
    showAsPercent: g.boolean().optional(),
    goodDirection: g.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: g.object({
    member: de.optional(),
    timeDimension: de.optional(),
    granularity: g.union([it, Dn]).optional(),
    dateRange: g.union([Dr, Dn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: g.enum(["up", "down"]).optional(),
  gauge: g.object({
    min: g.number().optional(),
    max: g.number(),
    thresholds: g.array(g.object({ at: g.number(), colorToken: ot }).strict()).optional()
  }).strict().optional()
}).strict(), Lu = g.object({
  member: de,
  label: g.string().optional(),
  format: ha.optional(),
  align: g.enum(["left", "right", "center"]).optional(),
  width: g.number().optional(),
  hidden: g.boolean().optional()
}).strict(), Fu = g.object({
  member: de,
  when: g.object({
    op: g.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: g.number()
  }).strict(),
  colorToken: ot.optional()
}).strict(), Iu = g.object({
  columns: g.array(Lu).optional(),
  pageSize: g.number().optional(),
  conditionalFormat: g.array(Fu).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), $u = g.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: ot.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), Qe = {
  bar: Tu,
  line: Ou,
  area: _u,
  pie: Au,
  scatter: Du,
  heatmap: $u,
  kpi: Eu,
  table: Iu
}, Je = {
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
function di(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Fr(e, t) {
  if (t === void 0) return e;
  if (!di(e) || !di(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? Fr(e[r], a) : a);
  }
  return n;
}
const Pu = { envelope: {}, familyOptions: {} };
function zu(e, t) {
  return {
    ...Fr({ ...t.envelope }, e),
    familyOptions: Fr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const To = {}, fi = () => {
}, Vu = {
  target: To,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: fi,
  emitPoint: fi
}, Ln = b.createContext(null);
Ln.displayName = "ChartInteractionContext";
function Oo() {
  return b.useContext(Ln) ?? Vu;
}
function ka({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Ln), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((f) => {
    const { parent: p, widgetId: k, onRangeSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : p == null || p.emitRange(C);
  }, []), c = b.useCallback((f) => {
    const { parent: p, widgetId: k, onPointSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : p == null || p.emitPoint(C);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), d = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), m = i == null ? void 0 : i.target, v = b.useMemo(
    () => m || r ? { ...m, ...r } : To,
    [m, r]
  ), h = b.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: v,
      rangeEnabled: u,
      pointEnabled: d,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, v, u, d, s, c]
  );
  return /* @__PURE__ */ l(Ln.Provider, { value: h, children: a });
}
function tt(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var s, c, u;
    const o = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const d of n) {
      const m = d.data[i] ?? null;
      m === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
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
function Ir(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function _o(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = Ir(n), a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function $r(e, t, n) {
  const r = [];
  return e.categories.forEach((a, i) => {
    var d, m, v;
    const o = (d = n == null ? void 0 : n.temporal) == null ? void 0 : d.dates[i], s = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i];
      if (typeof f == "number" && Number.isFinite(f)) {
        const p = Ir(h);
        s.set(p, (s.get(p) ?? 0) + Math.abs(f));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i] ?? null, p = Ir(h), k = s.get(p) ?? 0, w = f === null || k === 0 ? null : Math.abs(f) / k;
      let C = 0, R = 0;
      if (f !== null) {
        const M = f < 0 ? u : c;
        C = M.get(p) ?? 0, R = C + f, M.set(p, R);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: f,
        key: h.key,
        label: h.label,
        member: ((m = h.meta) == null ? void 0 : m.measure) ?? h.key,
        companion: ((v = h.meta) == null ? void 0 : v.companion) ?? !1,
        i,
        stack: p,
        y1: C * N,
        y2: R * N,
        share: w
      });
    }
  }), r;
}
function Pr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function cn(e) {
  return e.label || e.key;
}
function et(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function wa(e, t) {
  const n = e.series.map(cn), r = e.series.map(et), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = sa({ placement: Bt(t.legendPlacement) })), a;
}
function Bt(e) {
  return e === "top" ? "top" : "bottom";
}
function hn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Fn(e = 0.2) {
  return wl().padding(e);
}
function Ao() {
  return Cl().padding(0.02);
}
const ju = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Wu(e) {
  if (typeof e == "string" && ju.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return xo(e);
}
function Do(e) {
  return e.toISOString().slice(0, -1);
}
function hi(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = it.safeParse(n);
  return r.success ? r.data : void 0;
}
function Eo(e, t) {
  var d, m, v;
  const n = (m = (d = t.mapping) == null ? void 0 : d.category) == null ? void 0 : m.member, r = (v = e.raw.annotation) == null ? void 0 : v.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const h of Object.keys(r))
    if (h === n || h.startsWith(`${n}.`)) {
      a = h;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? hi(n) : hi(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const h of e.categories) {
    if (typeof h == "number" && i === void 0 || typeof h == "string" && !ga(h)) return null;
    const f = Wu(h);
    if (!f) return null;
    s.push(f);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((h) => c.has(h.getTime()) ? !1 : (c.add(h.getTime()), !0)).sort((h, f) => h.getTime() - f.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function Lo(e) {
  return e ? Ml : Ao;
}
function Ca(e) {
  return e ? "t" : "cat";
}
function In(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Do(r)) : t.category(r);
}
function pi(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Do(t);
}
function Fo(e, t) {
  const n = Oo(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (h) => h !== void 0 && s.some((f) => f.getTime() === h.getTime()), u = r && c(r.start) && c(r.end) ? r : null, d = s[0], m = u ?? { start: d, end: d }, v = u === null;
    return [
      Sl({
        id: "cv-brush-x",
        values: s,
        range: xl(
          m,
          (h, { reason: f }) => {
            if (f.type !== "commit") return;
            const p = i.current.temporal, k = h.start.getTime() === h.end.getTime();
            if (a(k ? null : h), k || !p) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: p.member,
              granularity: p.granularity,
              from: pi(p, h.start),
              to: pi(p, h.end)
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
        selectionStyle: v ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: v ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function Ku(e, t) {
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
function $t(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? ni().domain(r) : ni();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: Rn().domain(r), nice: !1 } : { scale: Rn, nice: !0 };
}
function Io(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function un(e) {
  switch (e) {
    case "monotone":
      return fr(_l);
    case "step":
      return fr(Ol);
    case "natural":
      return fr(Tl);
    default:
      return;
  }
}
function Pt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function Na(e, t) {
  var o, s, c, u;
  const n = e.raw.annotation, r = (d) => {
    var m, v, h, f, p, k;
    if (d)
      return ((m = n == null ? void 0 : n.measures[d]) == null ? void 0 : m.shortTitle) ?? ((v = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : v.shortTitle) ?? ((h = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : h.shortTitle) ?? ((f = n == null ? void 0 : n.measures[d]) == null ? void 0 : f.title) ?? ((p = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : p.title) ?? ((k = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : k.title) ?? d;
  }, a = e.series[0], i = (d) => {
    var m;
    return d ? (m = d.meta) != null && m.measure ? r(d.meta.measure) : d.label : void 0;
  };
  return {
    x: Pt((o = t.axes) == null ? void 0 : o.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Pt((u = t.axes) == null ? void 0 : u.y, i(a))
  };
}
function Ke(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function Sa(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Bu(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function st(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function xa(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Xn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: la,
    className: xa(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((m) => {
        var v;
        return { datum: m, color: (v = e.colorOf) == null ? void 0 : v.call(e, m) };
      }) : a.map((m) => ({ datum: m.datum, color: m.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const m of s) {
          const v = m.datum.value;
          m.datum.companion || typeof v != "number" || !Number.isFinite(v) || (c += v, u += 1);
        }
      const d = s.map((m) => ({
        label: m.datum.label,
        value: e.percentShare && c > 0 && typeof m.datum.value == "number" ? st(m.datum.value / c, e.locale) : n(m.datum),
        color: m.color
      }));
      return e.showTotal && u > 1 && d.push({
        label: "Total",
        value: e.percentShare ? st(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: d };
    }
  };
}
function Ma(e) {
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
function Ra(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], a = t[0];
  return e.forEach((i, o) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", d = u ? t[i.value] : void 0;
    if (u && d == null) return;
    const m = n != null && n.swap ? !u : u, v = m ? n != null && n.swap ? i.value : d : n != null && n.swap ? d : i.value;
    if (r.push(
      m ? Qi([v], { id: `cv-ref-${o}`, ...c }) : Ji([v], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const h = u ? n == null ? void 0 : n.valueAnchor : a;
    if (h == null) return;
    const f = (n == null ? void 0 : n.swap) === !0;
    r.push(
      Ma(
        ln(
          [
            {
              x: m ? v : h,
              y: m ? h : v,
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
            dy: m ? f ? -6 : 8 : -6,
            dx: m ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function Ta(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function $o(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = Ca((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? st(c, n.locale) : "";
  };
  return [
    Ma(
      ln(r, {
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
const Hu = to({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), qu = to({ initial: !1 });
function mt({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = b.useRef(null), u = Oo(), d = u.pointEnabled && !r, m = b.useRef(s);
  b.useLayoutEffect(() => {
    m.current = s;
  });
  const v = b.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const C = m.current, R = C ? C(w) : Ku(w, u.target);
      R && u.emitPoint(R);
    },
    [u]
  ), [h, f] = b.useState({ w: 0, h: 0 }), p = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((R) => {
      var M;
      const N = (M = R[0]) == null ? void 0 : M.contentRect;
      N && f({ w: Math.floor(N.width), h: Math.floor(N.height) });
    });
    return C.observe(w), () => C.disconnect();
  }, []);
  const k = r ? Math.max(24, h.h || Math.round((h.w || 160) / 5)) : Math.max(i, h.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: h.w > 0 && /* @__PURE__ */ l(
        Nl,
        {
          definition: e,
          renderer: a ? Hu : qu,
          width: h.w,
          height: k,
          ariaLabel: t,
          idPrefix: p,
          onSelect: o ?? (d ? v : void 0)
        }
      )
    }
  );
}
function Uu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var te, U, oe, me, le, he, pe, P, ne, ce, F, x;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, d = e.series.filter((S) => {
      var A;
      return (A = S.meta) == null ? void 0 : A.companion;
    }), m = d.length ? e.series.filter((S) => {
      var A;
      return !((A = S.meta) != null && A.companion);
    }) : e.series, v = u ? m : e.series, f = (u ? _o(v) : []).length > 1, p = f ? $r(e, v, { normalize: c }) : tt(e, { series: v }), k = new Map(e.series.map((S) => [cn(S), et(S)])), w = /* @__PURE__ */ new Map();
    if (f)
      for (const S of p) {
        const A = w.get(S.i);
        A ? A.push(S) : w.set(S.i, [S]);
      }
    const C = Na(e, t), R = s ? (U = (te = t.axes) == null ? void 0 : te.y) == null ? void 0 : U.hide : (me = (oe = t.axes) == null ? void 0 : oe.x) == null ? void 0 : me.hide, N = s ? (le = t.axes) == null ? void 0 : le.x : (he = t.axes) == null ? void 0 : he.y, M = $t(N), T = r.barCategoryGap, L = s ? (pe = t.axes) == null ? void 0 : pe.y : (P = t.axes) == null ? void 0 : P.x, j = Ke(n, L), z = Ke(n, N), O = Bu(t) ?? Sa(e.series[0]), _ = (S) => c ? st(S) : z.value(S, O, "axis"), B = R ? !1 : {
      label: C.x,
      ticks: { format: (S) => j.category(S) }
    }, E = N != null && N.hide ? !1 : { label: C.y, ticks: { format: _ } }, W = bl({ padding: r.barGap }), V = f ? W : c ? Xi({ offset: "normalize" }) : u ? void 0 : W, I = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (S) => f ? S.stack : S.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (S) => `${S.label} ${S.i}`,
      layout: V,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (S) => {
        const A = k.get(S.label) ?? "var(--chart-1)";
        return S.companion ? `color-mix(in oklab, ${A} 40%, transparent)` : A;
      }
    }, Q = [
      f ? s ? ei(p, { ...I, x1: "y1", x2: "y2", y: "cat" }) : ti(p, { ...I, x: "cat", y1: "y1", y2: "y2" }) : s ? ei(p, { ...I, x: "value", y: "cat" }) : ti(p, { ...I, x: "cat", y: "value" })
    ];
    if (u && !c && d.length) {
      const S = e.categories.map((A, K) => {
        var H, G, J;
        return {
          cat: typeof A == "number" ? A : String(A),
          value: d.reduce((we, ge) => {
            const q = ge.data[K];
            return typeof q != "number" ? we : (we ?? 0) + q;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((G = (H = d[0]) == null ? void 0 : H.meta) == null ? void 0 : G.measure) ?? ((J = d[0]) == null ? void 0 : J.key),
          companion: !0,
          i: K
        };
      });
      if (S.some((A) => A.value !== null)) {
        const A = {
          id: "cv-bars-prev",
          key: (K) => `prev ${K.i}`,
          curve: un("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        Q.push(
          s ? yl(S, { ...A, x: "value", y: "cat" }) : qn(S, { ...A, x: "cat", y: "value" })
        );
      }
    }
    if (Q.push(
      ...Ra(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: Ta(e)
      })
    ), a.showValueLabels) {
      const S = u ? f ? p : $r(e, v, { normalize: c }) : p;
      Q.push(
        ...$o(S, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return ct({
      marks: Q,
      x: s ? { scale: M.scale, nice: M.nice, grid: !0, axis: E } : { scale: () => Fn(T), axis: B },
      y: s ? { scale: () => Fn(T), axis: B } : { scale: M.scale, nice: M.nice, grid: !0, axis: E },
      color: wa(u ? { ...e, series: v } : e, {
        legend: hn(t) && v.length > 1,
        legendPlacement: Bt((ne = t.legend) == null ? void 0 : ne.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((ce = t.tooltip) == null ? void 0 : ce.show) === !1 ? void 0 : Xn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !f,
        value: c && f ? (S) => {
          const A = S.share;
          return typeof A == "number" ? st(A) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: f ? (S) => w.get(S.i) ?? [S] : void 0,
        colorOf: f ? (S) => k.get(S.label) ?? "var(--chart-1)" : void 0,
        indicator: (F = t.tooltip) == null ? void 0 : F.indicator,
        showTotal: (x = t.tooltip) == null ? void 0 : x.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(cn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(mt, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function Gu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var h;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : Eo(e, t),
    [e, t, i]
  ), s = b.useMemo(() => In(o, n), [o, n]), c = (h = t.axes) == null ? void 0 : h.x, u = b.useMemo(
    () => c != null && c.tickFormat ? In(o, Ke(n, c)) : s,
    [o, n, c, s]
  ), d = Fo(o, {
    label: s,
    ariaLabel: "Time range"
  }), m = b.useMemo(() => {
    var T, L, j, z, O, _, B, E, W;
    const f = Ca(o), p = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = un(k), C = Na(e, t), R = $t((T = t.axes) == null ? void 0 : T.y), N = e.categories.length <= 1, M = e.series.map((V) => {
      var Q, te, U;
      const I = tt(e, { series: [V], skipNull: p, temporal: o });
      return qn(I, {
        id: `cv-line-${V.key}`,
        x: f,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (Q = V.meta) != null && Q.companion ? "5 4" : void 0,
        strokeOpacity: (te = V.meta) != null && te.companion ? 0.55 : void 0,
        stroke: et(V),
        points: !i && !((U = V.meta) != null && U.companion) && (Io(V, a.dots) || N)
      });
    });
    return i || (M.push(
      ...Ra(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: Ta(e)
      }),
      ...$o(
        a.showValueLabels ? tt(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), M.push(eo({ x: {}, y: !1, marker: a.dots !== !1 }))), ct({
      marks: M,
      x: {
        scale: Lo(o),
        axis: i || (j = (L = t.axes) == null ? void 0 : L.x) != null && j.hide ? !1 : {
          label: C.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: R.scale,
        nice: R.nice,
        grid: !i,
        axis: i || (O = (z = t.axes) == null ? void 0 : z.y) != null && O.hide ? !1 : {
          label: C.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (V) => {
              var I, Q, te, U;
              return Ke(n, (I = t.axes) == null ? void 0 : I.y).value(
                V,
                ((te = (Q = e.series[0]) == null ? void 0 : Q.meta) == null ? void 0 : te.measure) ?? ((U = e.series[0]) == null ? void 0 : U.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: wa(e, {
        legend: !i && hn(t) && e.series.length > 1,
        legendPlacement: Bt((_ = t.legend) == null ? void 0 : _.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((B = t.tooltip) == null ? void 0 : B.show) === !1 ? void 0 : Xn({
        format: n,
        category: s,
        indicator: (E = t.tooltip) == null ? void 0 : E.indicator,
        showTotal: (W = t.tooltip) == null ? void 0 : W.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: d
    });
  }, [e, t, n, a, r, i, o, s, u, d]), v = e.series.map(cn).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    mt,
    {
      definition: m,
      ariaLabel: v,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function Yu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, C;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", c = o === "percent", u = b.useMemo(() => Eo(e, t), [e, t]), d = b.useMemo(() => In(u, n), [u, n]), m = (C = t.axes) == null ? void 0 : C.x, v = b.useMemo(
    () => m != null && m.tickFormat ? In(u, Ke(n, m)) : d,
    [u, n, m, d]
  ), h = Fo(u, { label: d, ariaLabel: "Time range" }), f = b.useMemo(() => {
    var oe, me, le, he, pe, P, ne, ce, F;
    const R = Ca(u), N = a.connectNulls ?? !1, M = a.curve ?? "monotone", T = un(M), L = r.areaFillOpacity, j = r.stackedAreaFillOpacity, z = r.lineWidth, O = Na(e, t), _ = $t((oe = t.axes) == null ? void 0 : oe.y), B = Sa(e.series[0]), E = e.series.filter((x) => {
      var S;
      return !((S = x.meta) != null && S.companion);
    }), W = c ? [] : e.series.filter((x) => {
      var S;
      return (S = x.meta) == null ? void 0 : S.companion;
    }), V = new Map(e.series.map((x) => [x.key, et(x)])), I = [], Q = (x) => `cv-area-fill-${x.replace(/[^a-zA-Z0-9_-]/g, "-")}`, te = s ? void 0 : E.map((x) => ({
      id: Q(x.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: et(x), opacity: L * 0.15 },
        { offset: 1, color: et(x), opacity: L }
      ]
    }));
    if (s)
      for (const { stackId: x, series: S } of _o(E)) {
        const A = tt(e, { series: S, skipNull: N, temporal: u });
        I.push(
          Tr(A, {
            id: x ? `cv-area-stack-${x}` : "cv-area-stack",
            x: R,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (K) => `${K.key}:${K.i}`,
            curve: T,
            fillOpacity: j,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (K) => V.get(K.key) ?? "currentColor",
            strokeWidth: z,
            layout: c ? Xi({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const x of E) {
        const S = tt(e, { series: [x], skipNull: N, temporal: u });
        I.push(
          Tr(S, {
            id: `cv-area-${x.key}`,
            x: R,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: T,
            fill: `url(#${Q(x.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: et(x),
            strokeWidth: z
          })
        );
      }
    for (const x of W) {
      const S = tt(e, { series: [x], skipNull: N, temporal: u });
      I.push(
        qn(S, {
          id: `cv-area-prev-${x.key}`,
          x: R,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: T,
          strokeWidth: z,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: et(x)
        })
      );
    }
    const U = new Set(
      E.filter((x) => Io(x, a.dots)).map((x) => x.key)
    );
    if (U.size > 0) {
      const x = s ? $r(e, E, { normalize: c, temporal: u }).filter(
        (S) => U.has(S.key) && S.value !== null
      ) : tt(e, {
        series: E.filter((S) => U.has(S.key)),
        skipNull: !0,
        temporal: u
      });
      I.push(
        Zi(x, {
          id: "cv-area-dots",
          x: R,
          y: (S) => s ? S.y2 ?? null : S.value,
          z: "label",
          color: "label",
          key: (S) => `${S.key}:${S.i}`,
          r: 3
        })
      );
    }
    return I.push(
      ...Ra(a.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: Ta(e)
      })
    ), I.push(eo({ x: {}, y: !1, marker: !0 })), ct({
      marks: I,
      gradients: te,
      x: {
        scale: Lo(u),
        axis: (le = (me = t.axes) == null ? void 0 : me.x) != null && le.hide ? !1 : {
          label: O.x,
          ticks: { format: v }
        }
      },
      y: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (pe = (he = t.axes) == null ? void 0 : he.y) != null && pe.hide ? !1 : {
          label: O.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (x) => {
              var S;
              return c ? st(x) : Ke(n, (S = t.axes) == null ? void 0 : S.y).value(x, B, "axis");
            }
          }
        }
      },
      color: wa(e, {
        legend: hn(t) && e.series.length > 1,
        legendPlacement: Bt((P = t.legend) == null ? void 0 : P.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((ne = t.tooltip) == null ? void 0 : ne.show) === !1 ? void 0 : Xn({
        format: n,
        percentShare: c,
        category: d,
        indicator: (ce = t.tooltip) == null ? void 0 : ce.indicator,
        showTotal: (F = t.tooltip) == null ? void 0 : F.showTotal
      }),
      keyboard: !0,
      controls: h
    });
  }, [e, t, n, a, r, s, c, u, d, v, h]), p = e.series.map(cn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(mt, { definition: f, ariaLabel: p, className: "cv-chart--fill" });
}
const Qu = 0.26, Ju = 0.03, gi = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Xu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f, p;
  const a = t.familyOptions ?? {}, i = e.series[0], o = Sa(i), s = (p = (f = t.colors) == null ? void 0 : f.ramp) != null && p.length ? t.colors.ramp : er, c = b.useMemo(() => {
    const k = e.categories.map((w, C) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[C]) ?? 0
    }));
    return Zu(k, a.maxSlices).map((w, C) => ({
      ...w,
      token: s[C % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), u = c.reduce((k, w) => k + w.value, 0), d = c.some((k) => k.value < 0), m = d || c.length === 0 || u <= 0, v = b.useMemo(() => {
    var O, _, B;
    if (m) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = k > 0, C = a.showLabels ?? "percent", R = C !== "none", N = R ? Math.min(r.pieRadiusPct / 100, 1 - Qu) : r.pieRadiusPct / 100, M = Cc(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), L = [Ar(M, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: E }) => E * k,
      outerRadius: ({ radius: E }) => E * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (R) {
      const E = (W) => C === "name" ? W.label : C === "value" ? n.value(W.value, o, "label") : st(W.fraction);
      L.push(
        hr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          M.filter((W) => W.value > 0 && W.fraction >= Ju),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (W) => W.angle,
            radius: N,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: E,
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
    if (w && a.centerLabel) {
      const E = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(u, o, "label") : a.centerLabel.value;
      if (L.push(
        hr([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => E,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), a.centerLabel.label) {
        const W = a.centerLabel.label;
        L.push(
          hr([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => W,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const j = {
      domain: c.map((E) => E.label),
      range: c.map((E) => `var(--${E.token})`)
    };
    hn(t) && (j.legend = sa({ placement: Bt((O = t.legend) == null ? void 0 : O.position) }));
    const z = i ? i.label || i.key : "";
    return ct({
      marks: [
        fo({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Rn().domain([0, Math.PI * 2]) },
          radius: { scale: Rn().domain([0, 1]) },
          marks: L
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: j,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((_ = t.tooltip) == null ? void 0 : _.show) === !1 ? void 0 : {
        use: la,
        className: xa((B = t.tooltip) == null ? void 0 : B.indicator),
        content: (E) => {
          const W = E[0];
          if (!W) return { rows: [] };
          const V = W.datum;
          return {
            title: V.label,
            rows: [
              {
                label: z,
                value: `${n.value(V.value, o, "tooltip")} (${st(V.fraction)})`,
                color: W.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, c, u, t, n, a, r, i, o]);
  if (d)
    return /* @__PURE__ */ l("div", { style: gi, children: "Pie charts can't show negative values" });
  if (!v)
    return /* @__PURE__ */ l("div", { style: gi, children: "No data" });
  const h = c.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(mt, { definition: v, ariaLabel: h, className: "cv-chart--fill" });
}
function Zu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function em({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (h) => {
    var f, p;
    return ((f = i == null ? void 0 : i.measures[h]) == null ? void 0 : f.shortTitle) ?? ((p = i == null ? void 0 : i.dimensions[h]) == null ? void 0 : p.shortTitle) ?? h;
  }, s = a.x ? o(a.x) : "x", c = a.y ? o(a.y) : "y", u = a.size ? o(a.size) : void 0, d = b.useMemo(() => {
    var V, I, Q, te, U, oe, me, le, he, pe, P, ne, ce, F;
    if (!a.x || !a.y) return null;
    const h = nm(e.raw.rows, a);
    if (h.length === 0) return null;
    const f = !!a.groupBy, p = [];
    if (f)
      for (const x of h)
        x.group !== void 0 && !p.includes(x.group) && p.push(x.group);
    const [k, w] = r.bubbleAreaRange, C = Math.sqrt(Math.max(k, 0) / Math.PI), R = Math.sqrt(Math.max(w, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, M = (I = (V = t.colors) == null ? void 0 : V.ramp) != null && I.length ? t.colors.ramp : er;
    f ? (N.z = "group", N.color = "group") : N.fill = `var(--${M[0]})`, a.size ? (N.r = (x) => x.size ?? 0, N.rScale = { scale: () => Rl().range([C, R]) }) : N.r = 4;
    const T = [Zi(h, N)];
    (Q = a.referenceLines) == null || Q.forEach((x, S) => {
      const A = `var(--${x.colorToken ?? "muted-foreground"})`, K = { stroke: A, strokeWidth: 1.25, strokeDasharray: "4 4" };
      x.axis === "y" ? (T.push(Ji([x.value], { id: `cv-ref-${S}`, ...K })), x.label && T.push(
        ln([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          y: "v",
          text: "label",
          fill: A,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (T.push(Qi([x.value], { id: `cv-ref-${S}`, ...K })), x.label && T.push(
        ln([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          x: "v",
          text: "label",
          fill: A,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let L;
    f && (L = {
      domain: p,
      range: p.map((x, S) => `var(--${M[S % M.length]})`)
    }, hn(t) && (L.legend = sa({ placement: Bt((te = t.legend) == null ? void 0 : te.position) })));
    const j = Pt((U = t.axes) == null ? void 0 : U.x, s), z = Pt((oe = t.axes) == null ? void 0 : oe.y, c), O = $t((me = t.axes) == null ? void 0 : me.x), _ = $t((le = t.axes) == null ? void 0 : le.y), B = a.x, E = a.y, W = a.size;
    return ct({
      marks: T,
      x: {
        scale: O.scale,
        nice: O.nice,
        grid: !0,
        axis: (pe = (he = t.axes) == null ? void 0 : he.x) != null && pe.hide ? !1 : {
          label: j,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (x) => {
              var S;
              return Ke(n, (S = t.axes) == null ? void 0 : S.x).value(x, B, "axis");
            }
          }
        }
      },
      y: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (ne = (P = t.axes) == null ? void 0 : P.y) != null && ne.hide ? !1 : {
          label: z,
          ticks: {
            format: (x) => {
              var S;
              return Ke(n, (S = t.axes) == null ? void 0 : S.y).value(x, E, "axis");
            }
          }
        }
      },
      color: L,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((ce = t.tooltip) == null ? void 0 : ce.show) === !1 ? void 0 : {
        use: la,
        className: xa((F = t.tooltip) == null ? void 0 : F.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (x) => {
          const A = x[0];
          if (!A) return { rows: [] };
          const K = A.datum, H = [
            { label: s, value: n.value(K.x, B, "tooltip") },
            { label: c, value: n.value(K.y, E, "tooltip") }
          ];
          return W && H.push({
            label: u ?? W,
            value: n.value(K.size, W, "tooltip")
          }), { title: K.group, color: A.color, rows: H };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, c, u]), m = a.groupBy, v = (h) => {
    var p;
    if (!h || !m) return null;
    const f = (p = h.datum) == null ? void 0 : p.group;
    return f === void 0 ? null : { member: m, value: f, label: f };
  };
  return d ? /* @__PURE__ */ l(
    mt,
    {
      definition: d,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: v
    }
  ) : /* @__PURE__ */ l("div", { style: tm, children: "No data" });
}
const tm = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function nm(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = pr(r[t.x]), o = pr(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? pr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function pr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function rm(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function am(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function im(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Po(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? im(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => Po(e, t, n), r;
}
function om({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = rm(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const v = Pr(s, a), h = Pr(s, i), f = /* @__PURE__ */ new Map();
    return s.forEach((p, k) => {
      const w = am(p[o]), C = p[v], R = p[h];
      if (w === null || C === null || C === void 0 || R === null || R === void 0)
        return;
      const N = typeof C == "number" ? C : String(C), M = String(R);
      f.set(`${N}\0${M}`, {
        cat: N,
        label: M,
        value: w,
        key: `${N}|${M}`,
        member: o,
        i: k
      });
    }), [...f.values()];
  }, [s, a, i, o]), d = b.useMemo(() => {
    var C, R, N, M, T, L, j, z;
    let v = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY;
    for (const O of u)
      O.value < v && (v = O.value), O.value > h && (h = O.value);
    const f = (O) => {
      if (!O) return;
      const _ = (c == null ? void 0 : c.dimensions[O]) ?? (c == null ? void 0 : c.timeDimensions[O]) ?? (c == null ? void 0 : c.measures[O]);
      return (_ == null ? void 0 : _.shortTitle) ?? (_ == null ? void 0 : _.title) ?? O;
    }, p = Pt((C = t.axes) == null ? void 0 : C.x, f(a)), k = Pt((R = t.axes) == null ? void 0 : R.y, f(i)), w = [
      kl(u, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return u.length > 0 && u.length <= 100 && w.push(
      // Decorative: the in-cell number restates the cell's own value, so it must
      // not emit a second focus point (the tooltip would list the cell twice).
      Ma(
        ln(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (O) => n.value(O.value, O.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), ct({
      marks: w,
      x: {
        scale: () => Fn(0.05),
        axis: (M = (N = t.axes) == null ? void 0 : N.x) != null && M.hide ? !1 : {
          label: p,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (O) => {
              var _;
              return Ke(n, (_ = t.axes) == null ? void 0 : _.x).category(O);
            }
          }
        }
      },
      y: {
        scale: () => Fn(0.05),
        axis: (L = (T = t.axes) == null ? void 0 : T.y) != null && L.hide ? !1 : {
          label: k,
          ticks: {
            format: (O) => {
              var _;
              return Ke(n, (_ = t.axes) == null ? void 0 : _.y).category(O);
            }
          }
        }
      },
      color: {
        scale: Po(v, h, r.colorToken ?? "chart-1")
      },
      tooltip: ((j = t.tooltip) == null ? void 0 : j.show) === !1 ? void 0 : Xn({ format: n, indicator: (z = t.tooltip) == null ? void 0 : z.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const m = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(mt, { definition: d, ariaLabel: m, className: "cv-chart--fill" });
}
function sm(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function lm(e) {
  return `cv-kpi-trend--${e}`;
}
function cm(e) {
  var c, u, d, m;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (v) => r.value(v, a.measure, "kpi"), o = zo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((m = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : m.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(bm, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(um, { ...e, value: o, label: s, fo: a, fmt: i });
}
function um({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var v;
  const a = n.goodDirection ?? ((v = n.comparison) == null ? void 0 : v.goodDirection) ?? "up", i = t === null ? null : km(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && mm(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((h) => h !== null), d = i ? i.diff : c ? pm(c) : 0, m = lm(sm(d, a));
  return /* @__PURE__ */ y("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ y("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(gm, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(dm, {}) : /* @__PURE__ */ l(fm, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(hm, { data: e, series: c, colorClass: m }) })
  ] });
}
function mm(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function dm() {
  return /* @__PURE__ */ y(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(ao, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function fm() {
  return /* @__PURE__ */ y("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(ro, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function hm({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = tt(e, { series: [t], skipNull: !0 }), i = $t(void 0);
    return ct({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        Tr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: un("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        qn(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: un("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Ao, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    mt,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function pm(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function gm({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var d;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? ro : a ? ca : ua, c = (d = n.comparison) != null && d.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ y(
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
const Gt = -(2 * Math.PI) / 3, zr = 2 * Math.PI / 3, vm = zr - Gt;
function bm({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, m;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, i = ((m = r.gauge) == null ? void 0 : m.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : ym(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const v = (s - a) / (o - a), h = Gt + v * vm, f = ({ radius: w }) => w * 0.7, p = Ar([{ startAngle: Gt, endAngle: zr }], {
      id: "cv-gauge-track",
      innerRadius: f,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = v > 0 ? [
      p,
      Ar([{ startAngle: Gt, endAngle: h }], {
        id: "cv-gauge-value",
        innerRadius: f,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [p];
    return ct({
      marks: [
        fo({
          id: "cv-gauge",
          startAngle: Gt,
          endAngle: zr,
          marks: k
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ y("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      mt,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ y("div", { className: "cv-kpi-gauge-center", children: [
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
function ym(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function zo(e, t) {
  for (const n of e) {
    const r = Vo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function km(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = zo(e, r.value));
  else {
    const s = e[1];
    a = s ? Vo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function Vo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const jo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: D("cv-table", e), ...t }) })
);
jo.displayName = "Table";
const Wo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: D("cv-table-header", e), ...t }));
Wo.displayName = "TableHeader";
const Ko = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: D("cv-table-body", e), ...t }));
Ko.displayName = "TableBody";
const Cn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: D("cv-table-row", e),
      ...t
    }
  )
);
Cn.displayName = "TableRow";
const Bo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: D("cv-table-head", e),
    ...t
  }
));
Bo.displayName = "TableHead";
const Vr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: D("cv-table-cell", e),
    ...t
  }
));
Vr.displayName = "TableCell";
const wm = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: D("cv-table-caption", e), ...t }));
wm.displayName = "TableCaption";
const Ho = fa(
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
), ee = b.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: D(Ho({ variant: t, size: n }), e),
      ...a
    }
  )
);
ee.displayName = "Button";
function Cm({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Nm(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, d] = b.useState(0), m = r.pageSize ?? 25, v = b.useMemo(() => {
    var N;
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1, R = ((N = o.find((M) => M.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((M, T) => Tm(M[R], T[R]) * C);
  }, [a, s, o]), h = Math.max(1, Math.ceil(v.length / m)), f = Math.min(u, h - 1), p = v.slice(f * m, f * m + m), k = (C) => {
    c(
      (R) => (R == null ? void 0 : R.member) === C ? { member: C, dir: R.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), d(0);
  }, w = v.length > 12;
  return /* @__PURE__ */ y("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ y(jo, { children: [
      /* @__PURE__ */ l(Wo, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(Cn, { children: o.map((C) => /* @__PURE__ */ l(
        Bo,
        {
          className: vi(C.align),
          style: C.width ? { width: C.width } : void 0,
          children: /* @__PURE__ */ y(
            ee,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(C.member),
              children: [
                C.label,
                /* @__PURE__ */ l(Rm, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        C.member
      )) }) }),
      /* @__PURE__ */ y(Ko, { children: [
        p.map((C, R) => /* @__PURE__ */ l(Cn, { children: o.map((N) => {
          const M = Om(N.member, C[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Vr,
            {
              className: D(vi(N.align), w && "cv-table-cell--compact"),
              style: M ? { color: M } : void 0,
              children: N.render(C[N.key])
            },
            N.member
          );
        }) }, R)),
        p.length === 0 && /* @__PURE__ */ l(Cn, { children: /* @__PURE__ */ l(
          Vr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    v.length > m && /* @__PURE__ */ y("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ y("span", { children: [
        f * m + 1,
        "–",
        Math.min((f + 1) * m, v.length),
        " of",
        " ",
        v.length
      ] }),
      /* @__PURE__ */ y("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.max(0, C - 1)),
            disabled: f === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          ee,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.min(h - 1, C + 1)),
            disabled: f >= h - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Nm(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : xm(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = Pr(e, c), d = t ? Mm(t, c) : void 0, m = t ? c in t.measures : !1, v = s.label ?? (d == null ? void 0 : d.shortTitle) ?? (d == null ? void 0 : d.title) ?? c, h = s.align ?? (m ? "right" : "left"), f = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: v,
      align: h,
      width: s.width,
      render: (p) => Sm(p, m, c, f)
    };
  });
}
function Sm(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function xm(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Mm(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function vi(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Rm({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(ca, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(ua, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(El, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Tm(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Om(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && _m(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function _m(e, t, n) {
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
const ht = "cv-sidebar--default", Am = "cv-sidebar--wide", qo = "a date or category", gr = [
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
    hint: qo,
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
], Dm = [
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
    hint: qo,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Em = [
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
], Lm = [
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
], Fm = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Im = [
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
], $m = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], Xe = (e) => $m.indexOf(e), Ge = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: io,
    order: Xe("bar"),
    component: Uu,
    optionsSchema: Qe.bar,
    defaults: Je.bar,
    wells: gr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ht
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Vl,
    order: Xe("line"),
    component: Gu,
    optionsSchema: Qe.line,
    defaults: Je.line,
    wells: gr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ht
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Ll,
    order: Xe("area"),
    component: Yu,
    optionsSchema: Qe.area,
    defaults: Je.area,
    wells: gr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ht
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: zl,
    order: Xe("pie"),
    component: Xu,
    optionsSchema: Qe.pie,
    defaults: Je.pie,
    wells: Em,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ht
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Pl,
    order: Xe("scatter"),
    component: em,
    optionsSchema: Qe.scatter,
    defaults: Je.scatter,
    wells: Lm,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ht
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: $l,
    order: Xe("kpi"),
    component: cm,
    optionsSchema: Qe.kpi,
    defaults: Je.kpi,
    wells: Fm,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Am
  },
  table: {
    family: "table",
    label: "Table",
    icon: Il,
    order: Xe("table"),
    component: Cm,
    optionsSchema: Qe.table,
    defaults: Je.table,
    wells: Im,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ht
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Fl,
    order: Xe("heatmap"),
    component: om,
    optionsSchema: Qe.heatmap,
    defaults: Je.heatmap,
    wells: Dm,
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
    sidebarWidthClass: ht
  }
}, Pm = Ge.bar, zm = Ge.line, Vm = Ge.area, jm = Ge.pie, Wm = Ge.scatter, Km = Ge.heatmap, Bm = Ge.kpi, Hm = Ge.table, Oa = [
  Pm,
  zm,
  Vm,
  jm,
  Wm,
  Km,
  Bm,
  Hm
], qm = g.any();
function _a(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? Pu;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? qm;
    },
    resolveOptions: (o) => zu(o, i.defaults(o.family))
  };
  return i;
}
const Zn = _a(Oa);
function Um(e, t = Zn) {
  return t.resolveOptions(e);
}
const bi = {
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
function Uo(e) {
  return e ? { ...bi, ...e } : bi;
}
function Aa(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function Gm(e) {
  const t = Math.floor(e ?? wn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Ym(e, t) {
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
function Qm(e) {
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
function Jm(e, t) {
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
function Xm(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function Zm(e, t, n) {
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
function ed(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Jm(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Xm(o.meta)
      }))
    };
  }
  const a = Gm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Ym(i.data, a) : Qm(i.data)
    }))
  };
}
function td(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Uy = Object.fromEntries(
  Object.entries(Ge).map(([e, t]) => [e, t.component])
);
function Go({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = Zn,
  theme: u
}) {
  const d = ae(() => Um(t, c), [t, c]), m = ae(() => Uo(u), [u]), v = c.get(d.family), h = (v == null ? void 0 : v.queryless) ?? !1, f = Aa(v) ? d.transform : void 0, p = ae(() => ed(e, f), [e, f]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(hu, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ y(Gn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(ma, {}),
      /* @__PURE__ */ l(Yn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Qn, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : td(p), w = Zm(
    r ?? ba(e.raw.annotation, d, va),
    f
  ), C = (i == null ? void 0 : i[d.family]) ?? c.require(d.family).component;
  return /* @__PURE__ */ l(
    C,
    {
      data: p,
      options: d,
      config: k,
      format: w,
      theme: m,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const er = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], vr = 8;
function yi(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Yo(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : er, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, i = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = a(u.key, u.colorToken);
    d && i.add(d);
  }
  let o = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[o++ % n.length];
      if (!i.has(d))
        return i.add(d), d;
    }
    return n[o++ % n.length];
  };
  return e.map((u) => a(u.key, u.colorToken) ?? s());
}
function ki(e, t) {
  const n = Yo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function nd(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function bn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = nd(e[n]);
  return t;
}
function rd(e) {
  return {
    measures: bn(e.measures ?? {}),
    dimensions: bn(e.dimensions ?? {}),
    segments: bn(e.segments ?? {}),
    timeDimensions: bn(e.timeDimensions ?? {})
  };
}
function Lt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function tr(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function ad(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function id(e, t) {
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
function od(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = nr(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function sd(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Qo(e, t, n, r, a = Zn) {
  const i = rd(e.annotation()), o = id(i, r), s = od(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const m = n.measures ?? [];
    if (a.require(t.family).measureOnly && m.length > 0) {
      const v = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: m.map((p) => nr(v[p])),
          meta: { ...tr(Lt(i, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return ki(h, t.colors), {
        categories: m.map(
          (p) => {
            var k, w;
            return ((k = Lt(i, p)) == null ? void 0 : k.shortTitle) ?? ((w = Lt(i, p)) == null ? void 0 : w.title) ?? p;
          }
        ),
        series: h,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || yi(h)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? cd(e, c.series, t, i) : md(e, c.category.member, c.series, t, i), d = ld(e, c);
  return sd(u, o), ki(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || yi(u)
  };
}
function ld(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function cd(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = Lt(r, s), u = i == null ? void 0 : i[s], d = o.map((m) => nr(m[s]));
    return {
      key: s,
      label: ad(c, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...tr(c, u, n.format), measure: s }
    };
  });
}
function ud(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function md(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), d = c.length > 1, m = { x: [t], y: [s, "measures"] }, h = e.seriesNames(m).filter((N) => {
    const M = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : void 0;
    return M === void 0 || u.has(M);
  }), f = e.chartPivot(m), p = Lt(a, i), k = a.dimensions[s], w = (k == null ? void 0 : k.type) === "boolean", C = (k == null ? void 0 : k.shortTitle) ?? (k == null ? void 0 : k.title) ?? s, R = h.map((N) => {
    var V, I;
    const M = (V = N.yValues) == null ? void 0 : V[0], T = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : i, L = Lt(a, T), j = (I = n.meta) == null ? void 0 : I[T], z = (j == null ? void 0 : j.label) ?? (L == null ? void 0 : L.shortTitle) ?? (L == null ? void 0 : L.title) ?? T, O = M ?? N.shortTitle ?? N.title ?? N.key, _ = w ? ud(O) : void 0, B = _ ? `${C}: ${_}` : O, E = d ? `${z} · ${B}` : B, W = f.map((Q) => nr(Q[N.key]));
    return {
      key: N.key,
      label: E,
      data: W,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...tr(L ?? p, j, r.format),
        measure: T
      }
    };
  });
  return dd(R, p, r.format);
}
function dd(e, t, n) {
  var d, m, v;
  if (e.length <= vr) return e;
  const r = (h) => h.data.reduce((f, p) => f + (p ?? 0), 0), a = [...e].sort((h, f) => r(f) - r(h)), i = a.slice(0, vr - 1), o = a.slice(vr - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: s }, (h, f) => {
    let p = 0, k = !1;
    for (const w of o) {
      const C = w.data[f];
      C !== null && (p += C, k = !0);
    }
    return k ? p : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...tr(t, void 0, n), ...(v = (m = i[0]) == null ? void 0 : m.meta) != null && v.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function nr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ie = (e) => be(e, "yyyy-MM-dd");
function fd(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ie(t), ie(t)];
  if (n === "yesterday") {
    const o = xe(t, 1);
    return [ie(o), ie(o)];
  }
  if (n === "this week") return [ie(On(t)), ie(_n(t))];
  if (n === "this month") return [ie(gt(t)), ie(Zt(t))];
  if (n === "this quarter") return [ie(vt(t)), ie(en(t))];
  if (n === "this year") return [ie(bt(t)), ie(tn(t))];
  if (n === "last week") {
    const o = Or(t, 1);
    return [ie(On(o)), ie(_n(o))];
  }
  if (n === "last month") {
    const o = yt(t, 1);
    return [ie(gt(o)), ie(Zt(o))];
  }
  if (n === "last quarter") {
    const o = kt(t, 1);
    return [ie(vt(o)), ie(en(o))];
  }
  if (n === "last year") {
    const o = wt(t, 1);
    return [ie(bt(o)), ie(tn(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ie(xe(t, a - 1)), ie(t)] : i.startsWith("week") ? [ie(xe(t, a * 7 - 1)), ie(t)] : i.startsWith("month") ? [ie(gt(yt(t, a))), ie(Zt(yt(t, 1)))] : i.startsWith("quarter") ? [ie(vt(kt(t, a))), ie(en(kt(t, 1)))] : [ie(bt(wt(t, a))), ie(tn(wt(t, 1)))];
}
function Jo(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Da(e) {
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
function Xo(e) {
  const t = Da(e);
  return t === void 0 ? void 0 : Jo(t);
}
function Ea(e) {
  const t = Da(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function zt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const hd = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function pd(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function mn(e, t, n) {
  var r;
  if (Ne(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function gd(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = mn(o, t, n);
    if (!zt(s))
      if (Array.isArray(s))
        for (const c of s)
          zt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? fd(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function vd(e, t, n) {
  if ("and" in e) {
    const r = jr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = jr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return gd(e, t, n);
}
function jr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = vd(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function bd(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const a = mn(e.dateRange, t, n);
    zt(a) || (r.dateRange = a);
  }
  if (e.granularity !== void 0) {
    const a = mn(e.granularity, t, n);
    zt(a) || (r.granularity = a === It ? Ea(r.dateRange) : a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Zo(e, t, n) {
  const r = hd(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => bd(i, r, t))), e.filters !== void 0) {
    const i = jr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = mn(e.limit, r, t);
    zt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = mn(e.offset, r, t);
    zt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function es() {
  let e, t;
  return (n, r, a) => {
    const i = Zo(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function yd(e, t) {
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
class kd extends Error {
}
const wd = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new kd(`"${e}" cannot be parsed into a number`);
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
function wi(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Cd extends Error {
}
class Ci extends Error {
}
class Nd extends Error {
}
class br extends Error {
}
class Sd extends Error {
}
class xd {
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
      throw new Ci(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return wi(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Nd(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new br(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new br(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, m = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        o = d(o, this.cls);
      else if (typeof m == "number")
        o = this.cls.mul(o, m);
      else if (wi(m))
        o = this.cls.mul(o, this.convertFraction(m));
      else
        throw new br("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new Ci(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const m = this.describe(d);
      if (o.indexOf(d) === -1 && m.system === c) {
        const h = this.to(d);
        if (i ? this.cls.gt(h, s) : this.cls.lt(h, s))
          continue;
        (u === null || (i ? this.cls.lte(h, s) && this.cls.gt(h, u.val) : this.cls.gte(h, s) && this.cls.lt(h, u.val))) && (u = {
          val: h,
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
        throw new Sd(`Meausure "${t}" not found.`);
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
    throw new Cd(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Md(e) {
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
function Rd(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Md(e);
  return (r) => new xd({
    measures: e,
    unitCache: n,
    cls: wd
  }, r);
}
const Td = {
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
}, Od = {
  systems: {
    metric: Td
  }
}, _d = {
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
}, Ad = {
  systems: {
    SI: _d
  }
}, Dd = {
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
}, Ed = {
  systems: {
    SI: Dd
  }
}, Ld = {
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
}, Fd = {
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
}, Id = {
  systems: {
    metric: Ld,
    imperial: Fd
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
}, $d = {
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
}, Pd = {
  systems: {
    SI: $d
  }
}, zd = {
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
}, Vd = {
  systems: {
    SI: zd
  }
}, jd = {
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
}, Wd = {
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
}, Kd = {
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
}, Bd = {
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
}, Hd = {
  systems: {
    bit: jd,
    byte: Wd,
    IECBit: Kd,
    IECByte: Bd
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
}, qd = {
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
}, Ud = {
  systems: {
    metric: qd
  }
}, Gd = {
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
}, Yd = {
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
}, Qd = {
  systems: {
    SI: Gd,
    nutrition: Yd
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
}, Jd = {
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
}, Xd = {
  systems: {
    SI: Jd
  }
}, Zd = {
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
}, ef = {
  systems: {
    SI: Zd
  }
}, tf = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, nf = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, rf = {
  systems: {
    metric: tf,
    imperial: nf
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
}, af = {
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
}, of = {
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
}, sf = {
  systems: {
    metric: af,
    imperial: of
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
}, lf = {
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
}, cf = {
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
}, uf = {
  systems: {
    metric: lf,
    imperial: cf
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
}, mf = {
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
}, df = {
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
}, ff = {
  systems: {
    metric: mf,
    imperial: df
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
}, hf = {
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
}, pf = {
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
}, gf = {
  systems: {
    metric: hf,
    imperial: pf
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
}, vf = {
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
}, bf = {
  systems: {
    SI: vf
  }
}, yf = {
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
}, kf = {
  systems: {
    unit: yf
  }
}, wf = {
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
}, Cf = {
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
}, Nf = {
  systems: {
    metric: wf,
    imperial: Cf
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
}, Sf = {
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
}, xf = {
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
}, Mf = {
  systems: {
    metric: Sf,
    imperial: xf
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
}, Rf = {
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
}, Tf = {
  systems: {
    SI: Rf
  }
}, Of = {
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
}, _f = {
  systems: {
    SI: Of
  }
}, Af = {
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
}, Df = {
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
}, Ef = {
  systems: {
    metric: Af,
    imperial: Df
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
}, Lf = {
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
}, Ff = {
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
}, If = {
  systems: {
    metric: Lf,
    imperial: Ff
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
}, $f = {
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
}, Pf = {
  systems: {
    SI: $f
  }
}, zf = {
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
}, Vf = {
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
}, jf = {
  systems: {
    metric: zf,
    imperial: Vf
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
}, Wf = {
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
}, Kf = {
  systems: {
    SI: Wf
  }
}, Bf = {
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
}, Hf = {
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
}, qf = {
  systems: {
    metric: Bf,
    imperial: Hf
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
}, Uf = {
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
}, Gf = {
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
}, Yf = {
  systems: {
    metric: Uf,
    imperial: Gf
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
}, Qf = {
  acceleration: Od,
  angle: Ad,
  apparentPower: Ed,
  area: Id,
  charge: Pd,
  current: Vd,
  digital: Hd,
  each: Ud,
  energy: Qd,
  force: Xd,
  frequency: ef,
  illuminance: rf,
  length: sf,
  mass: uf,
  massFlowRate: ff,
  pace: gf,
  partsPer: bf,
  pieces: kf,
  power: Nf,
  pressure: Mf,
  reactiveEnergy: Tf,
  reactivePower: _f,
  speed: Ef,
  torque: jf,
  temperature: If,
  time: Pf,
  voltage: Kf,
  volume: qf,
  volumeFlowRate: Yf
}, Jf = Rd(Qf), Xf = {
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
function Zf(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Jf(t).from(e.from).to(e.to)
  };
}
const Wr = {
  ...Object.fromEntries(
    Object.entries(Xf).map(([e, t]) => [e, Zf(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function rr(e) {
  return e ? { ...Wr, ...e } : Wr;
}
function eh(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function th(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function nh(e) {
  return e != null && e.quantity ? th(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const rh = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function ts(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ni(e, t) {
  const n = e * (rh[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], o = i.map(([c, u], d) => {
    const m = d < i.length - 1 ? Math.floor(a / c) : Math.round(a / c);
    return a -= m * c, [m, u];
  }), s = o.findIndex((c) => c[0] > 0);
  if (s === -1) {
    const c = Math.abs(n);
    return c === 0 ? "0s" : c < 1e3 ? `${r}${ts(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function yr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return ts((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function ah(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Si(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function ns(e = Wr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return va(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Ni(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const d = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Si(yr(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Ni(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Si(yr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? ah(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${yr(n, t)}${u}`;
  };
}
const rs = b.createContext(null);
function ih({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(rs.Provider, { value: e, children: t });
}
function as() {
  return b.useContext(rs) ?? void 0;
}
const ar = Gi(null);
ar.displayName = "CubeVizContext";
function Be() {
  const e = oa(ar);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function dt() {
  return Be().families;
}
function oh(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Gy({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((C) => C.family).join("|"), u = ae(
    () => _a(Oa, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), d = ae(
    () => oh(e) ? du(e) : e,
    [e]
  ), m = ae(
    () => {
      var C;
      return {
        chartRamp: (C = t == null ? void 0 : t.chartRamp) != null && C.length ? t.chartRamp : er,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Uo(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), v = ae(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ae(() => a ?? {}, [a]), f = ae(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), p = ae(
    () => ({
      cubeClient: d,
      registry: h,
      families: u,
      locale: v,
      theme: m,
      maps: f
    }),
    [d, h, u, v, m, f]
  ), [k, w] = Ct(null);
  return /* @__PURE__ */ l(ar.Provider, { value: p, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: D(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(ih, { container: k, children: /* @__PURE__ */ l(
        ka,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function La({
  families: e,
  children: t
}) {
  const n = Be(), r = (e ?? []).map((i) => i.family).join("|"), a = ae(() => !e || e.length === 0 ? n : { ...n, families: _a(Oa, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(ve, { children: t }) : /* @__PURE__ */ l(ar.Provider, { value: a, children: t });
}
function sh(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const lh = 5e3;
function is(e, t) {
  const { cubeClient: n } = Be(), r = (t == null ? void 0 : t.skip) ?? !1, a = ae(
    () => e.limit === void 0 ? { ...e, limit: lh } : e,
    [e]
  ), i = ae(() => JSON.stringify(a), [a]), [o, s] = Ct({ isLoading: !r }), [c, u] = Ct(0), d = nt(() => u((m) => m + 1), []);
  return fn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let m = !0;
    const v = new AbortController();
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: v.signal }).then((h) => {
      m && s({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      m && s({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      m = !1, v.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: d };
}
const ir = Gi(null);
ir.displayName = "DashboardContext";
function Fa({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = pt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: yd(r, t), key: r });
  const i = a.current.store, o = ch(i, r);
  return pl(ir.Provider, { value: o }, n);
}
function ch(e, t) {
  const n = nt(
    (i, o) => e.set(i, o),
    [e]
  ), r = nt(
    (i) => Zo(i, e.getAll(), t),
    [e, t]
  ), a = nt(
    (i) => pd(i, e.getAll(), t),
    [e, t]
  );
  return ae(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function uh(e) {
  const t = Yi(e.store.subscribe, e.store.getAll, e.store.getAll);
  return ae(
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
function os() {
  const e = oa(ir);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return uh(e);
}
function pn() {
  return oa(ir);
}
const mh = () => () => {
}, dh = Object.freeze({}), fh = Object.freeze([]);
function kr(e, t, n) {
  var R;
  const r = pn(), { locale: a } = Be(), i = dt(), o = pt(null);
  o.current === null && (o.current = es());
  const s = o.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), d = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? dh,
    (r == null ? void 0 : r.decls) ?? fh
  ) : e, m = Yi(
    u && r ? r.store.subscribe : mh,
    d,
    d
  ), { resultSet: v, isLoading: h, error: f, refetch: p } = is(m, { skip: n == null ? void 0 : n.skip }), k = ((R = t.format) == null ? void 0 : R.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = ae(() => rr(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ae(() => {
    if (v)
      return Qo(v, t, m, { unitSystem: k, conversions: w }, i);
  }, [v, t, m, k, w, i]), isLoading: h, error: f, refetch: p, resolvedQuery: m };
}
function ft() {
  const { cubeClient: e } = Be(), [t, n] = Ct({ isLoading: !0 });
  return fn(() => {
    let r = !0;
    return n({ isLoading: !0 }), fu(e).then((a) => {
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
function or() {
  const { locale: e } = Be(), t = b.useMemo(() => rr(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return b.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function Yy() {
  const { locale: e } = Be(), { formatValue: t, units: n } = e;
  return ae(
    () => t ?? ns(rr(n)),
    [t, n]
  );
}
function ss() {
  const [e, t] = Ct(0), n = pt(null), r = pt(null), a = pt(null), i = pt(0), o = nt((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = nt(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = nt(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== i.current && (i.current = d, t(d));
      const m = new ResizeObserver((v) => {
        var h, f;
        for (const p of v) {
          const k = ((f = (h = p.contentBoxSize) == null ? void 0 : h[0]) == null ? void 0 : f.inlineSize) ?? p.contentRect.width;
          o(k);
        }
      });
      m.observe(u), r.current = m;
    },
    [o, s]
  );
  return fn(() => s, [s]), [c, e];
}
const hh = "day";
function ph(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), i = (d = e.timeDimensions) == null ? void 0 : d[0], o = r.timeDimension ?? (i == null ? void 0 : i.dimension);
  if (!a || !o) return null;
  const s = r.dateRange ?? (i == null ? void 0 : i.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: o,
        granularity: r.granularity ?? hh,
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
const re = (e) => be(e, "yyyy-MM-dd");
function gh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = Tn(e[0]), i = Tn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = Al(i, a) + 1;
    return [re(xe(a, o)), re(xe(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = xe(t, 1);
    return [re(a), re(a)];
  }
  if (n === "yesterday") {
    const a = xe(t, 2);
    return [re(a), re(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [re(xe(t, 2 * a - 1)), re(xe(t, a))];
    if (i.startsWith("week")) return [re(xe(t, 14 * a - 1)), re(xe(t, 7 * a))];
    if (i.startsWith("month"))
      return [re(gt(yt(t, 2 * a))), re(xe(gt(yt(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [re(vt(kt(t, 2 * a))), re(xe(vt(kt(t, a)), 1))];
    if (i.startsWith("year"))
      return [re(bt(wt(t, 2 * a))), re(xe(bt(wt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = Or(t, 1);
    return [re(On(a)), re(_n(a))];
  }
  if (n === "this month") {
    const a = yt(t, 1);
    return [re(gt(a)), re(Zt(a))];
  }
  if (n === "this quarter") {
    const a = kt(t, 1);
    return [re(vt(a)), re(en(a))];
  }
  if (n === "this year") {
    const a = wt(t, 1);
    return [re(bt(a)), re(tn(a))];
  }
  if (n === "last week") {
    const a = Or(t, 2);
    return [re(On(a)), re(_n(a))];
  }
  if (n === "last month") {
    const a = yt(t, 2);
    return [re(gt(a)), re(Zt(a))];
  }
  if (n === "last quarter") {
    const a = kt(t, 2);
    return [re(vt(a)), re(en(a))];
  }
  if (n === "last year") {
    const a = wt(t, 2);
    return [re(bt(a)), re(tn(a))];
  }
}
function vh(e, t, n = Zn) {
  var u, d;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (d = e.timeDimensions) == null ? void 0 : d[0];
  if (!i) return null;
  const o = i.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = gh(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const bh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Ia({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var V;
  const { registry: c, locale: u, theme: d } = Be(), m = dt(), v = ((V = m.get(t.family)) == null ? void 0 : V.queryless) ?? !1, h = ae(() => {
    var I;
    return (I = t.format) != null && I.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), f = ae(() => {
    const I = e ?? {};
    return I.timezone || !(u != null && u.timezone) ? I : { ...I, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: p, isLoading: k, error: w, refetch: C, resolvedQuery: R } = kr(
    f,
    h,
    { skip: v }
  ), N = ae(() => ph(f, h), [f, h]), M = kr(
    (N == null ? void 0 : N.query) ?? f,
    (N == null ? void 0 : N.chart) ?? h,
    { skip: !N }
  ), T = ae(
    () => vh(R, h, m),
    [R, h, m]
  ), L = kr(
    (T == null ? void 0 : T.query) ?? f,
    h,
    { skip: !T, skipResolve: !0 }
  ), j = ae(
    () => ({ [h.family]: sh(c, h.family, m) }),
    [c, h.family, m]
  ), z = ae(() => {
    let I = p ?? bh;
    if (N && M.data) {
      I = { ...I, series: M.data.series, categories: M.data.categories };
      const Q = I.raw.rows.length > 0, te = I.series.some((U) => U.data.some((oe) => oe !== null));
      I = { ...I, empty: !Q && !te };
    }
    if (T && L.data) {
      if (T.mode === "kpiRow") {
        const Q = L.data.raw.rows[0];
        if (Q) {
          const te = I.raw.rows[0];
          I = {
            ...I,
            raw: { ...I.raw, rows: te ? [te, Q] : [Q] }
          };
        }
      } else if (!L.data.empty) {
        const Q = new Map(L.data.series.map((te) => [te.key, te]));
        if (!I.empty && I.series.length > 0) {
          const te = I.categories.length, U = I.series.map((oe) => {
            const me = Q.get(oe.key), le = Array.from({ length: te }, (he, pe) => (me == null ? void 0 : me.data[pe]) ?? null);
            return {
              ...oe,
              key: `${oe.key}__prev`,
              label: `${oe.label} (prev)`,
              colorToken: oe.colorToken,
              data: le,
              meta: { ...oe.meta, companion: !0 }
            };
          });
          I = { ...I, series: [...I.series, ...U] };
        } else {
          const te = L.data.series.map((U) => ({
            ...U,
            key: `${U.key}__prev`,
            label: `${U.label} (prev)`,
            data: [...U.data],
            meta: { ...U.meta, companion: !0 }
          }));
          I = {
            ...I,
            categories: L.data.categories,
            series: te,
            empty: !1
          };
        }
      }
    }
    return I;
  }, [p, N, M.data, T, L.data]);
  fn(() => {
    n == null || n({ rows: z.raw.rows, refetch: C, isLoading: k });
  }, [n, z.raw.rows, C, k]);
  const O = {}, _ = ae(
    () => u.formatValue ?? ns(rr(u.units)),
    [u.formatValue, u.units]
  ), B = ae(
    () => ba(z.raw.annotation, h, _, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [z.raw.annotation, h, _, u.locale, u.unitSystem]
  ), E = h.mapping, W = ae(
    () => ({
      categoryMember: E == null ? void 0 : E.category.member,
      pivotMember: (E == null ? void 0 : E.series.mode) === "pivot" ? E.series.pivot : void 0,
      formatCategory: B.category
    }),
    [E, B]
  );
  return /* @__PURE__ */ l(
    ka,
    {
      widgetId: i,
      target: W,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Go,
        {
          data: z,
          options: h,
          config: O,
          format: B,
          state: v ? { loading: !1 } : { loading: k && !p, error: w },
          components: j,
          registry: m,
          theme: d.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function yh({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Ia,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const ls = "cube-viz-prose";
function kh(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function wh({ doc: e }) {
  const t = kh(e), n = ae(
    () => t ? e : null,
    [t, e]
  ), r = po(
    {
      extensions: [vo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: D(ls) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(go, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Nn = [
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
], Ch = Object.fromEntries(
  Nn.map((e) => [e.value, e.label])
);
function xi(e) {
  return Ch[e.trim().toLowerCase()] ?? e;
}
const Nh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Sh({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = wc(), a = D(Ho({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ y("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: D(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(da, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: be(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: D(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Un, {})
      }
    )
  ] });
}
function xh({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: D(
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
function cs({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    kc,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: D("cv-cal", e),
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
        MonthCaption: Sh,
        DayButton: xh,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? da : Un, { className: D("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Pe({
  ...e
}) {
  return /* @__PURE__ */ l(An.Root, { "data-slot": "popover", ...e });
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ l(An.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ve({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = as();
  return /* @__PURE__ */ l(An.Portal, { container: a, children: /* @__PURE__ */ l(
    An.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: D("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Le({
  ...e
}) {
  return /* @__PURE__ */ l(Re.Root, { "data-slot": "select", ...e });
}
function Kr({
  ...e
}) {
  return /* @__PURE__ */ l(Re.Group, { "data-slot": "select-group", ...e });
}
function Fe({
  ...e
}) {
  return /* @__PURE__ */ l(Re.Value, { "data-slot": "select-value", ...e });
}
function Ie({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ y(
    Re.Trigger,
    {
      "data-slot": "select-trigger",
      className: D("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Re.Icon, { asChild: !0, children: /* @__PURE__ */ l(ut, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Mh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Re.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: D("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(jl, {})
    }
  );
}
function Rh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Re.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: D("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(ut, {})
    }
  );
}
function $e({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const a = as();
  return /* @__PURE__ */ l(Re.Portal, { container: a, children: /* @__PURE__ */ y(
    Re.Content,
    {
      "data-slot": "select-content",
      className: D(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Mh, {}),
        /* @__PURE__ */ l(
          Re.Viewport,
          {
            className: D(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Rh, {})
      ]
    }
  ) });
}
function Br({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Re.Label,
    {
      "data-slot": "select-label",
      className: D("cv-select-label", e),
      ...t
    }
  );
}
function ye({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ y(
    Re.Item,
    {
      "data-slot": "select-item",
      className: D("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Re.ItemIndicator, { children: /* @__PURE__ */ l(Wt, {}) }) }),
        /* @__PURE__ */ l(Re.ItemText, { children: t })
      ]
    }
  );
}
const Vt = "cv-field", Th = "cv-field-label", Yt = "yyyy-MM-dd";
function Oh(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Mi(e) {
  if (!e) return;
  const t = no(e, Yt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function _h({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Nh, [i, o] = Ct(!1), s = typeof e == "string", [c, u] = Oh(e), d = Mi(c), m = Mi(u), v = d ? { from: d, to: m } : void 0;
  let h;
  s ? h = xi(e) : d && m ? h = `${be(d, "MMM d, yyyy")} – ${be(m, "MMM d, yyyy")}` : d ? h = be(d, "MMM d, yyyy") : h = "Pick a date range";
  const f = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ y(Pe, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(
      ee,
      {
        variant: "outline",
        className: D(
          "cv-daterange-trigger",
          h === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(oo, {}),
          h
        ]
      }
    ) }),
    /* @__PURE__ */ y(Ve, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((p) => /* @__PURE__ */ l(
        ee,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(p), o(!1);
          },
          children: xi(p)
        },
        p
      )) }),
      /* @__PURE__ */ l(
        cs,
        {
          mode: "range",
          selected: v,
          defaultMonth: d,
          disabled: f,
          onSelect: (p) => {
            p != null && p.from && p.to ? t([be(p.from, Yt), be(p.to, Yt)]) : p != null && p.from ? t([be(p.from, Yt), be(p.from, Yt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Ah = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Dh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = os(), i = r.rangeVariable ? Da(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? Jo(i) : Ah), s = typeof e == "string" ? e : "", c = o.join(",");
  return fn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ y(
    Le,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Ie, { className: Vt, children: /* @__PURE__ */ l(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ l($e, { children: o.map((u) => /* @__PURE__ */ l(ye, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Eh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: D(Vt, "cv-field--multi"),
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
  return /* @__PURE__ */ y(
    Le,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Ie, { className: Vt, children: /* @__PURE__ */ l(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ l($e, { children: r.options.map((i) => /* @__PURE__ */ l(ye, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Lh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = ft(), o = ae(() => {
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
  return /* @__PURE__ */ y(
    "select",
    {
      className: Vt,
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
function Fh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Vt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function Ih({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Vt,
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
function $h({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ y("label", { className: "cv-toggle", children: [
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
const Ph = {
  dateRange: _h,
  granularity: Dh,
  select: Eh,
  memberSelect: Lh,
  text: Fh,
  number: Ih,
  toggle: $h
};
function zh({ control: e, title: t }) {
  var h;
  const { registry: n } = Be(), { decls: r, resolveValue: a, setVar: i } = os(), o = ae(
    () => r.find((f) => f.name === e.variable),
    [r, e.variable]
  ), s = gl();
  if (!o)
    return /* @__PURE__ */ y("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((h = n.controls) == null ? void 0 : h[c]) ?? Ph[c], d = a(e.variable), m = (f) => i(e.variable, f), v = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: d, onChange: m, decl: o, control: e.control }) : /* @__PURE__ */ y("div", { children: [
    /* @__PURE__ */ l("label", { className: Th, htmlFor: s, children: v }),
    /* @__PURE__ */ l(
      u,
      {
        value: d,
        onChange: m,
        decl: o,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const us = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: D(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
us.displayName = "Card";
const ms = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: D(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
ms.displayName = "CardHeader";
const ds = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: D("cv-card-title", e),
      ...t
    }
  )
);
ds.displayName = "CardTitle";
const Vh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: D("cv-card-description", e), ...t })
);
Vh.displayName = "CardDescription";
const jh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: D("cv-card-action", e),
      ...t
    }
  )
);
jh.displayName = "CardAction";
const fs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: D("cv-card-content", e), ...t })
);
fs.displayName = "CardContent";
const Wh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: D("cv-card-footer", e), ...t })
);
Wh.displayName = "CardFooter";
const $n = "cube-viz-drag-handle";
function hs(e) {
  var s;
  const { registry: t } = Be(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ y(us, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ y(
      ms,
      {
        ...i,
        className: D($n, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(ds, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(fs, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class Ri extends vl {
  constructor() {
    super(...arguments);
    dr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ y(Gn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(ma, {}),
      /* @__PURE__ */ l(Yn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Qn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Kh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Bh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Hh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const qh = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function rt(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let Tt = null;
function ps(e = {}) {
  return Tt || (e.includeStyleProperties ? (Tt = e.includeStyleProperties, Tt) : (Tt = rt(window.getComputedStyle(document.documentElement)), Tt));
}
function Pn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Uh(e) {
  const t = Pn(e, "border-left-width"), n = Pn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Gh(e) {
  const t = Pn(e, "border-top-width"), n = Pn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function gs(e, t = {}) {
  const n = t.width || Uh(e), r = t.height || Gh(e);
  return { width: n, height: r };
}
function Yh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ae = 16384;
function Qh(e) {
  (e.width > Ae || e.height > Ae) && (e.width > Ae && e.height > Ae ? e.width > e.height ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae) : e.width > Ae ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae));
}
function zn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Jh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Xh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Jh(a);
}
const Te = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Te(n, t);
};
function Zh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function ep(e, t) {
  return ps(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function tp(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? Zh(n) : ep(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function Ti(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = qh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(tp(o, n, a, r)), t.appendChild(s);
}
function np(e, t, n) {
  Ti(e, t, ":before", n), Ti(e, t, ":after", n);
}
const Oi = "application/font-woff", _i = "image/jpeg", rp = {
  woff: Oi,
  woff2: Oi,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: _i,
  jpeg: _i,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ap(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function $a(e) {
  const t = ap(e).toLowerCase();
  return rp[t] || "";
}
function ip(e) {
  return e.split(/,/)[1];
}
function Hr(e) {
  return e.search(/^(data:)/) !== -1;
}
function op(e, t) {
  return `data:${t};base64,${e}`;
}
async function vs(e, t, n) {
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
const wr = {};
function sp(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Pa(e, t, n) {
  const r = sp(e, t, n.includeQueryParams);
  if (wr[r] != null)
    return wr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await vs(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), ip(s)));
    a = op(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return wr[r] = a, a;
}
async function lp(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : zn(t);
}
async function cp(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return zn(s);
  }
  const n = e.poster, r = $a(n), a = await Pa(n, r, t);
  return zn(a);
}
async function up(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await sr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function mp(e, t) {
  return Te(e, HTMLCanvasElement) ? lp(e) : Te(e, HTMLVideoElement) ? cp(e, t) : Te(e, HTMLIFrameElement) ? up(e, t) : e.cloneNode(bs(e));
}
const dp = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", bs = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function fp(e, t, n) {
  var r, a;
  if (bs(t))
    return t;
  let i = [];
  return dp(e) && e.assignedNodes ? i = rt(e.assignedNodes()) : Te(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = rt(e.contentDocument.body.childNodes) : i = rt(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Te(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => sr(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function hp(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : ps(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Te(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function pp(e, t) {
  Te(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Te(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function gp(e, t) {
  if (Te(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function vp(e, t, n) {
  return Te(t, Element) && (hp(e, t, n), np(e, t, n), pp(e, t), gp(e, t)), t;
}
async function bp(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await sr(u, t, !0));
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
async function sr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => mp(r, t)).then((r) => fp(e, r, t)).then((r) => vp(e, r, t)).then((r) => bp(r, t));
}
const ys = /url\((['"]?)([^'"]+?)\1\)/g, yp = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, kp = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function wp(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Cp(e) {
  const t = [];
  return e.replace(ys, (n, r, a) => (t.push(a), n)), t.filter((n) => !Hr(n));
}
async function Np(e, t, n, r, a) {
  try {
    const i = n ? Hh(t, n) : t, o = $a(t);
    let s;
    return a || (s = await Pa(i, o, r)), e.replace(wp(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Sp(e, { preferredFontFormat: t }) {
  return t ? e.replace(kp, (n) => {
    for (; ; ) {
      const [r, , a] = yp.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function ks(e) {
  return e.search(ys) !== -1;
}
async function ws(e, t, n) {
  if (!ks(e))
    return e;
  const r = Sp(e, n);
  return Cp(r).reduce((i, o) => i.then((s) => Np(s, o, t, n)), Promise.resolve(r));
}
async function Ot(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await ws(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function xp(e, t) {
  await Ot("background", e, t) || await Ot("background-image", e, t), await Ot("mask", e, t) || await Ot("-webkit-mask", e, t) || await Ot("mask-image", e, t) || await Ot("-webkit-mask-image", e, t);
}
async function Mp(e, t) {
  const n = Te(e, HTMLImageElement);
  if (!(n && !Hr(e.src)) && !(Te(e, SVGImageElement) && !Hr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Pa(r, $a(r), t);
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
async function Rp(e, t) {
  const r = rt(e.childNodes).map((a) => Cs(a, t));
  await Promise.all(r).then(() => e);
}
async function Cs(e, t) {
  Te(e, Element) && (await xp(e, t), await Mp(e, t), await Rp(e, t));
}
function Tp(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ai = {};
async function Di(e) {
  let t = Ai[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ai[e] = t, t;
}
async function Ei(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), vs(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function Li(e) {
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
async function Op(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        rt(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = Di(c).then((d) => Ei(d, t)).then((d) => Li(d).forEach((m) => {
              try {
                a.insertRule(m, m.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (v) {
                console.error("Error inserting rule from remote css", {
                  rule: m,
                  error: v
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(u);
          }
        });
      } catch (i) {
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(Di(a.href).then((s) => Ei(s, t)).then((s) => Li(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        rt(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function _p(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ks(t.style.getPropertyValue("src")));
}
async function Ap(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = rt(e.ownerDocument.styleSheets), r = await Op(n, t);
  return _p(r);
}
function Ns(e) {
  return e.trim().replace(/["']/g, "");
}
function Dp(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Ns(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Ep(e, t) {
  const n = await Ap(e, t), r = Dp(e);
  return (await Promise.all(n.filter((i) => r.has(Ns(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return ws(i.cssText, o, t);
  }))).join(`
`);
}
async function Lp(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Ep(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Fp(e, t = {}) {
  const { width: n, height: r } = gs(e, t), a = await sr(e, t, !0);
  return await Lp(a, t), await Cs(a, t), Tp(a, t), await Xh(a, n, r);
}
async function Ip(e, t = {}) {
  const { width: n, height: r } = gs(e, t), a = await Fp(e, t), i = await zn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Yh(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return o.width = u * c, o.height = d * c, t.skipAutoScale || Qh(o), o.style.width = `${u}`, o.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function $p(e, t = {}) {
  return (await Ip(e, t)).toDataURL();
}
function Pp(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function zp(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Vp(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function jp(e, t, n = 2) {
  const r = await $p(e, {
    pixelRatio: n,
    backgroundColor: Vp(e),
    cacheBust: !0
  });
  zp(r, `${Pp(t)}.png`);
}
function Wp({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const d = () => {
    const f = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Bh(Kh(t), `${f}.csv`);
  }, m = async () => {
    const f = r == null ? void 0 : r.current;
    if (!(!f || a)) {
      i(!0), s(null);
      try {
        await jp(f, e);
      } catch (p) {
        s(p instanceof Error ? p.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, v = (f) => f.stopPropagation(), h = (f = !0) => D("cv-menu-item", !f && "cv-menu-item--disabled");
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ l(
      ze,
      {
        onMouseDown: v,
        onPointerDown: v,
        onTouchStart: v,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Wl, {})
      }
    ),
    /* @__PURE__ */ y(Ve, { align: "end", className: "cv-menu", onMouseDown: v, onPointerDown: v, onTouchStart: v, children: [
      n ? /* @__PURE__ */ y("button", { type: "button", onClick: n, className: h(), children: [
        /* @__PURE__ */ l(Kl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ y("button", { type: "button", onClick: m, disabled: a, className: h(!a), children: [
        /* @__PURE__ */ l(Bl, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ y("button", { type: "button", onClick: d, disabled: !c, className: h(c), children: [
        /* @__PURE__ */ l(Hl, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function Fi({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        Ia,
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
      return /* @__PURE__ */ l(wh, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(zh, { control: e.control, title: e.title });
  }
}
function qr({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = Ct({ rows: [] }), s = nt(
    (d) => o({ rows: d.rows, refetch: d.refetch }),
    []
  ), c = pt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Ri, { children: /* @__PURE__ */ l(Fi, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Wp,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    hs,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Ri, { children: /* @__PURE__ */ l(
        Fi,
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
const Ss = (e) => e.filter((t) => t.type === "chart");
function Kp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Ss(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Ne(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function Bp(e) {
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
  for (const a of Ss(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Hp({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = pn(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => Kp(e.widgets), [e.widgets]), c = b.useMemo(() => Bp(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const d = b.useCallback(
    (f) => {
      var p, k;
      if (o) {
        const w = f != null && f.widgetId ? s.get(f.widgetId) : void 0;
        if (w) o(w, f ? [f.from, f.to] : void 0);
        else if (!f) for (const C of new Set(s.values())) o(C, void 0);
      }
      (k = (p = u.current).onRangeSelect) == null || k.call(p, f);
    },
    [o, s]
  ), m = b.useCallback(
    (f) => {
      var p, k;
      if (o)
        if (f) {
          const w = c.get(f.member);
          w && o(w, [String(f.value)]);
        } else
          for (const w of new Set(c.values())) o(w, void 0);
      (k = (p = u.current).onPointSelect) == null || k.call(p, f);
    },
    [o, c]
  ), v = !!(n || t && o && s.size), h = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    ka,
    {
      onRangeSelect: v ? d : void 0,
      onPointSelect: h ? m : void 0,
      children: a
    }
  );
}
const qp = "lg", Up = 640;
function Gp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Yp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Qy({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = ss(), c = e.grid ?? {}, u = c.cols ?? 12, d = c.rowHeight ?? 40, m = c.margin ?? [12, 12], v = c.containerPadding ?? m, h = ae(
    () => ({ [qp]: Yp(e.layout) }),
    [e.layout]
  ), f = ae(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), p = !t && s > 0 && s < Up;
  return /* @__PURE__ */ l(La, { families: n, children: /* @__PURE__ */ l(Fa, { spec: e, children: /* @__PURE__ */ l(
    Hp,
    {
      spec: e,
      drill: r,
      onRangeSelect: a,
      onPointSelect: i,
      children: /* @__PURE__ */ l("div", { ref: o, className: "cv-dashboard", children: s <= 0 ? null : p ? /* @__PURE__ */ l(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: m[1],
            padding: `${v[1]}px ${v[0]}px`
          },
          children: Gp(e.layout).map((k) => {
            const w = f.get(k.i);
            if (!w) return null;
            const C = k.h * d + (k.h - 1) * m[1];
            return /* @__PURE__ */ l("div", { style: { height: C }, children: /* @__PURE__ */ l(qr, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        ho,
        {
          width: s,
          layouts: h,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: d,
          margin: m,
          containerPadding: v,
          dragConfig: { enabled: t, handle: `.${$n}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = f.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(qr, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function Jy({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(La, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    hs,
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
        yh,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function xs(e, t = "None") {
  if (Ne(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => xs(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Qp(e) {
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
function Jp(e, t) {
  const n = new Set(Qp(t));
  return e.filter((r) => n.has(r.type));
}
function Xp(e) {
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
function Zp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function eg(e, t, n) {
  const r = Xp(e), a = { name: Zp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Cr = it.options, Ur = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function tg(e, t = "None") {
  const n = xs(e, t);
  return n === It ? "Auto" : Ur[n] ?? n;
}
const Nr = "__none__";
function Ms({
  value: e,
  onChange: t,
  options: n,
  allowAuto: r,
  autoHint: a,
  allowNone: i,
  noneLabel: o = "None",
  placeholder: s = "Group dates by…",
  disabled: c,
  id: u,
  className: d
}) {
  const m = n && n.length > 0 ? n : Cr, v = e && e !== It && !m.includes(e) ? [...m, e].sort(
    (f, p) => Cr.indexOf(f) - Cr.indexOf(p)
  ) : m, h = a ? `Auto (${Ur[a]})` : "Auto";
  return /* @__PURE__ */ y(
    Le,
    {
      value: e ?? (i ? Nr : ""),
      onValueChange: (f) => t(f === Nr ? void 0 : f),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Ie, { id: u, className: d, children: /* @__PURE__ */ l(Fe, { placeholder: s }) }),
        /* @__PURE__ */ y($e, { children: [
          i ? /* @__PURE__ */ l(ye, { value: Nr, children: o }) : null,
          r ? /* @__PURE__ */ l(ye, { value: It, children: h }) : null,
          v.map((f) => /* @__PURE__ */ l(ye, { value: f, children: Ur[f] }, f))
        ] })
      ]
    }
  );
}
function lr(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function ng(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function rg(e) {
  return Gr(e, "category");
}
function Gr(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function qe(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function cr(e) {
  return e ? e.cubes.filter((t) => qe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: lr(t),
    joinTargets: ng(t),
    category: rg(t),
    path: Gr(t, "path"),
    grain: Gr(t, "grain")
  })) : [];
}
function ag(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function at(e, t) {
  if (!(!e || !t))
    return cr(e).find((n) => n.name === t);
}
function za(e) {
  return e.shortTitle || e.title || e.name;
}
function Ee(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Rs(e) {
  return Ee(e.meta, "group");
}
function ig(e) {
  return Ee(e.meta, "geoPoint");
}
function Ii(e) {
  const t = Ee(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function og(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function Sn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Ts(e, t) {
  if (t)
    return St(e, "time", t).find(Sn);
}
function sg(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = Rs(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Vn(e) {
  const t = Ee(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function lg(e) {
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
function Va(e) {
  return Ee(e.meta, "agg");
}
function jn(e) {
  const t = Ee(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function cg(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = lg(Vn(e));
  return t !== void 0 && Va(e) === t;
}
function ug(e) {
  return Ee(e.meta, "familyHint");
}
function mg(e) {
  return Ee(e.meta, "soloHint");
}
function Wn(e) {
  return Ee(e.meta, "familyTitle");
}
function dg(e, t) {
  if (jn(t))
    return Os(e, t).map(Wn).find((n) => n !== void 0);
}
function ja(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function fg(e) {
  return `each ${ja(e)}`;
}
function Os(e, t) {
  const n = jn(t);
  if (!n) return [t];
  const r = [
    ...St(e, "measure", t.cube),
    ...St(e, "numberDimension", t.cube)
  ], a = /* @__PURE__ */ new Set(), i = [];
  for (const o of r)
    jn(o) !== n || a.has(o.name) || (a.add(o.name), i.push(o));
  return i.length > 0 ? i : [t];
}
function hg(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const a = jn(r.option);
    if (!a) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(a);
    i || (i = { familyKey: a, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(a, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const a = r.variants.find((s) => Wn(s.option)), i = r.variants.findIndex((s) => cg(s.option)), o = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : o >= 0 ? o : 0, r.label = Wn((a == null ? void 0 : a.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function Wa(e, t) {
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
function _s(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: za(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ee(n, "quantity"),
    unit: Ee(n, "unit")
  };
}
function xn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: za(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ee(n, "quantity"),
    unit: Ee(n, "unit")
  };
}
function As(e, t) {
  return {
    name: e.name,
    label: za(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function pg(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = ig({ meta: i });
    !o || !qe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Ii({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Ii({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: og(o[0].name, s[0].name),
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
function $i(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function St(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!qe(a) || n && a.name !== n) continue;
    const i = lr(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...pg(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        qe(s) && o(_s(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        qe(s) && s.type !== "time" && !$i(s) && o(xn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        qe(s) && s.type === "time" && o(xn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        qe(s) && s.type === "number" && !$i(s) && o(xn(s, a.name));
  }
  return r;
}
function gg(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!qe(a) || n && !n.has(a.name)) continue;
    const i = lr(a);
    for (const o of a.segments) {
      if (!qe(o)) continue;
      const s = As(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function De(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = lr(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(_s(i, n.name)) : a(xn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(As(o, n.name));
    }
    return St(e, "geoPoint").find((n) => n.name === t);
  }
}
function Pi(e) {
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
const Yr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Ds = {
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
function vg(e) {
  return e === "number";
}
function He(e) {
  return e.target !== void 0;
}
function Se(e, t) {
  return e.kinds.includes(t);
}
function Ka(e, t, n) {
  if (!Se(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function xt(e) {
  return e.chart.familyOptions ?? {};
}
function Ba(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Es(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function bg(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function yg(e, t, n) {
  var o, s;
  const r = e.chart;
  if (Ba(r)) return;
  const a = gn(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = xt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Ht(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = xt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!He(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const d = gn(a);
        r[c.id] = d ? [d] : [];
        break;
      }
      case "measures": {
        const d = Es(a), m = d.length ? d : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, m);
        break;
      }
      case "pivot": {
        const d = Ba(a) ?? yg(e, t, n);
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
function Ha(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function qa(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function kg(e, t) {
  return { ...e, dimensions: Ha(e.dimensions, t) };
}
function Ls(e, t) {
  const n = qa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Fs(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Xy(e) {
  return e === void 0 ? Tg : Ea(e);
}
const wg = "last 30 days";
function qt(e, t, n, r) {
  if (vg(n)) return { ...e, measures: Ha(e.measures, t) };
  if (n === "time") {
    const a = vn(e) ?? r;
    return Fs(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? It,
      dateRange: a ? a.dateRange : wg
    });
  }
  return kg(e, t);
}
function Qt(e, t, n, r) {
  const a = e.query ?? {}, i = Ht(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = vn(a);
  if ((o == null ? void 0 : o.dimension) === n) return Fs(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = qa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return Ls(a, n);
}
function Cg(e, t, n, r) {
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
  return { category: { member: e }, series: Ps(t, r) };
}
function rn(e, t, n) {
  var c, u;
  const r = Ht(e, t, n), a = (d) => t.find((m) => {
    var v;
    return ((v = m.target) == null ? void 0 : v.kind) === d;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : gn(e.chart),
    measures: o ? r[o.id] ?? [] : Es(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Ba(e.chart)
  };
}
function an(e, t, n) {
  const r = { ...$s(e.chart), ...bg(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Cg(n.category, n.measures, n.pivot, r)
    }
  };
}
function Kn(e, t, n) {
  const r = { ...xt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Ua(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !He(i)) return e;
  const o = i.target, s = Ht(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], d = vn(c);
      u && u !== r && (c = Qt(e, t, u, n)), c = qt(c, r, a, d);
      const m = rn({ ...e, query: c }, t, [r]);
      return an(e, c, { ...m, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Ha(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = Qt(e, t, s[0], n)), c = qt(c, r, a);
      const d = rn({ ...e, query: c }, t, [r]);
      return an(e, c, { ...d, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = Qt(e, t, u, n)), c = qt(c, r, a);
      const d = rn({ ...e, query: c }, t, [r]);
      return an(e, c, { ...d, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = Qt(e, t, u, n)), c = qt(c, r, a), Kn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(xt(e)[o.key]) ? [...xt(e)[o.key]] : [];
      return u.some((d) => (d == null ? void 0 : d.member) === r) || u.push({ member: r }), c = qt(c, r, a), Kn(e, c, { [o.key]: u });
    }
  }
}
function Ng(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !He(a)) return e;
  const i = a.target, o = Qt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = rn(e, t), c = qa(s.measures, r), u = c.length ? s.pivot : void 0, d = c.length || !s.pivot ? o : Ls(o, s.pivot);
      return an(e, d, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = rn(e, t);
      return an(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Kn(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(xt(e)[i.key]) ? xt(e)[i.key] : [];
      return Kn(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Sg(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = vn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function xg(e, t) {
  if (Se(t, e)) return e;
  if (e === "category" && Se(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && Se(t, "category") || e === "time" && Se(t, "category")) return "category";
}
function Mg(e, t, n) {
  const r = Ht(e, t), a = /* @__PURE__ */ new Map();
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
    if (!He(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const d = xg(Sg(e, u), o);
      d && (i = Ua(i, n, o.id, u, d));
    }
  }
  return i;
}
function Rg(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!He(a)) continue;
    const i = n.findIndex((o) => Se(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function At(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Is(e) {
  var o, s, c, u, d;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return At(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return At(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return At(a);
  const i = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return At(i);
}
function Qr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function $s(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function gn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function vn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Ps(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Tg = "day";
function Jr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Og(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Jr(r) && Jr(a) ? Mg(e, r.wells, a.wells) : _g(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function _g(e, t) {
  var h;
  const { chart: n } = e, r = e.query ?? {}, a = Qr(n).length ? Qr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((f) => f.dimension), o = gn(n) ?? ((h = r.dimensions) == null ? void 0 : h[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (f, p, k) => !!f && k.indexOf(f) === p
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Jr(t)) {
    const f = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: f } } : c;
  }
  const u = [...a], d = [...s], m = (f) => i.includes(f) ? "time" : "category";
  let v = c;
  for (const f of t.wells) {
    if (!f.target || !f.channel) continue;
    const p = Se(f, "category") ? [
      [d, m],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [d, m]
    ];
    let k = 0;
    for (const [w, C] of p)
      for (let R = 0; R < w.length; ) {
        if (f.cardinality === "one" && k > 0 || !Se(f, C(w[R]))) {
          R += 1;
          continue;
        }
        v = Ua(v, t.wells, f.id, w[R], C(w[R])), w.splice(R, 1), k += 1;
      }
  }
  return v;
}
function zs(e) {
  return eh(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Vs(e) {
  return nh(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Ag(e, t) {
  return t.require(e).wells;
}
function on(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Ht(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function _t(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Ua(e, o.wells, n, r, a);
  return Dg(e, s, o.wells);
}
function js(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = Ng(e, i.wells, n, r);
  return Ws(e, o, i.wells);
}
function Dg(e, t, n) {
  return Eg(e, Ws(e, t, n));
}
function Eg(e, t) {
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
function Ws(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((d) => d.dimension)), o = new Set(Object.values(Ht(t, n)).flat()), s = r.filter((d) => !i.has(d.dimension) && o.has(d.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
function Ks({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: D("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ y(b.Fragment, { children: [
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
        className: D("cv-picker-aggseg-opt", n.selected && "cv-picker-aggseg-opt--on"),
        children: n.label
      }
    )
  ] }, n.label)) });
}
function Bs(e, t) {
  var a;
  const n = (a = e.meta) == null ? void 0 : a.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = Va(e) ?? "";
  return r === "value" ? fg(t == null ? void 0 : t.grain) : r === "max" && Vn(e) === "counter" ? "latest" : r;
}
function Ga(e) {
  return Va(e) === "value";
}
function Ya(e) {
  return `Plots each ${ja(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function Lg(e, t, n) {
  if (Ga(n)) return Ya(t);
  switch (Vn(n) ?? e.map(Vn).find(Boolean)) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const a = ja(t == null ? void 0 : t.grain);
      return `Describes one ${a} at a time — the average across ${a}s is usually right.`;
    }
    case "part":
      return e.map(ug).find(Boolean);
    default:
      return;
  }
}
const ke = b.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = b.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: D("cv-input", e),
        ...r
      }
    );
  }
);
ke.displayName = "Input";
function Xr({ option: e }) {
  const t = or();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Wa(e, t) });
}
function Hs({
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
  const { meta: u, isLoading: d } = ft(), m = b.useMemo(() => {
    if (t) {
      const p = new Set(t);
      return St(u, n).filter((k) => p.has(k.cube));
    }
    return St(u, n, e);
  }, [u, n, e, t]), v = b.useMemo(() => {
    const p = Fg(m), k = p.length > 1, w = [];
    for (const [C, R] of p)
      for (const [N, M] of sg(R, () => "Other")) {
        const T = k ? N === "Other" ? C : `${C} · ${N}` : N;
        w.push({ key: `${C}:${N}`, label: T, items: M });
      }
    return w;
  }, [m]), h = v.length > 1, f = m.find((p) => p.name === r);
  return /* @__PURE__ */ y(Le, { value: r, onValueChange: a, disabled: o || d, children: [
    /* @__PURE__ */ l(Ie, { id: s, className: c, children: /* @__PURE__ */ l(Fe, { placeholder: d ? "Loading…" : i, children: f ? /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Xr, { option: f }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: f.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l($e, { children: v.map((p) => /* @__PURE__ */ y(Kr, { children: [
      h && p.label ? /* @__PURE__ */ l(Br, { children: p.label }) : null,
      p.items.map((k) => /* @__PURE__ */ l(ye, { value: k.name, children: /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Xr, { option: k }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, p.key)) })
  ] });
}
function Fg(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ft({
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
      className: D("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: D(
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
function zi(e) {
  return e.reason === void 0;
}
function qs(e, t, n, r, a) {
  const i = Ka(e, t, [...n]);
  return i ? Ig(i, e, r) : a == null ? void 0 : a(r);
}
function Ig(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function $g(e, t, n) {
  if (t !== void 0 && zs(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Vs(e)}`;
}
const Qa = "cube-viz:field-picker:only-compatible";
function Us() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Gs() {
  var e;
  try {
    return ((e = Us()) == null ? void 0 : e.getItem(Qa)) !== "0";
  } catch {
    return !0;
  }
}
function Pg(e) {
  try {
    const t = Us();
    if (!t) return;
    t.setItem(Qa, e ? "1" : "0");
  } catch {
  }
}
let Zr = Gs();
const Mn = /* @__PURE__ */ new Set();
let Dt;
function zg() {
  for (const e of [...Mn]) e();
}
function Ys(e) {
  e !== Zr && (Zr = e, zg());
}
function Vg() {
  if (Dt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Qa || Ys(Gs());
  };
  e.addEventListener("storage", t), Dt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const yn = {
  get: () => Zr,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Pg(e), Ys(e);
  },
  subscribe: (e) => (Mn.add(e), Vg(), () => {
    Mn.delete(e), Mn.size === 0 && (Dt == null || Dt(), Dt = void 0);
  })
}, jg = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Yl, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(ri, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(ri, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(uo, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Gl, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Vi = ["geoPoint", "number", "numberDimension", "category", "time"];
function Ja({
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
  var he, pe;
  const { meta: u, isLoading: d } = ft(), [m, v] = b.useState(!1), [h, f] = b.useState(""), p = b.useSyncExternalStore(
    yn.subscribe,
    yn.get,
    yn.getServer
  ), k = yn.set, w = b.useId(), [C, R] = b.useState(r.viewLocked ?? "tables"), [N, M] = b.useState({}), [T, L] = b.useState({});
  b.useEffect(() => {
    m && R(r.viewLocked ?? "tables");
  }, [m, r.viewLocked]);
  const j = b.useMemo(() => new Set(t), [t]), z = h.trim().toLowerCase(), O = or(), _ = b.useMemo(() => {
    if (C !== "tables") {
      const A = r.views.find((K) => K.name === C) ?? at(u, C);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const P = [];
    r.sourceCube && P.push({ cube: r.sourceCube, tag: "source" });
    const ce = r.relatedCubes.some((A) => A.path ?? A.category) ? "More tables" : "Related tables", F = (A) => A.path ? ag(A.path) : A.category, x = /* @__PURE__ */ new Map();
    for (const A of r.relatedCubes) {
      const K = F(A);
      K !== void 0 && !x.has(K) && x.set(K, x.size);
    }
    const S = [...r.relatedCubes].sort((A, K) => {
      const H = F(A), G = F(K);
      return H === G ? 0 : H === void 0 ? 1 : G === void 0 ? -1 : (x.get(H) ?? 0) - (x.get(G) ?? 0);
    });
    for (const A of S) P.push({ cube: A, tag: "related", heading: F(A) ?? ce });
    return P;
  }, [C, r, u]), B = [
    ...Vi.filter((P) => Se(e, P)),
    ...Vi.filter((P) => !Se(e, P))
  ], E = (P) => {
    const ne = [], ce = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Set();
    for (const x of B) {
      const S = jg[x], A = Ka(e, x, n ?? []);
      let K = St(u, S.metaKind, P);
      x === "time" && (K = [...K].sort(
        (H, G) => Number(Sn(G)) - Number(Sn(H))
      ));
      for (const H of K) {
        if (j.has(H.name) || F.has(H.name)) continue;
        const G = Wn(H) ?? dg(u, H);
        if (z && !(H.label.toLowerCase().includes(z) || H.name.toLowerCase().includes(z) || ((G == null ? void 0 : G.toLowerCase().includes(z)) ?? !1)))
          continue;
        F.add(H.name);
        const J = Rs(H), we = J ? `g:${J.toLowerCase()}` : `k:${S.label}`;
        let ge = ce.get(we);
        ge || (ge = {
          key: we,
          label: J ?? S.label,
          headerIcon: J ? void 0 : S.icon,
          rejected: A !== void 0,
          items: []
        }, ce.set(we, ge), ne.push(we)), A === void 0 && (ge.rejected = !1), ge.items.push({
          option: H,
          kind: x,
          reason: qs(e, x, n ?? [], H, a)
        });
      }
    }
    return ne.map((x) => ce.get(x));
  }, W = _.map((P) => ({ section: P, groups: E(P.cube.name) })).filter((P) => P.groups.length > 0), V = p ? W.reduce(
    (P, ne) => P + ne.groups.reduce((ce, F) => ce + F.items.filter((x) => !zi(x)).length, 0),
    0
  ) : 0, I = p ? W.map((P) => ({
    section: P.section,
    groups: P.groups.map((ne) => ({ ...ne, rejected: !1, items: ne.items.filter(zi) })).filter((ne) => ne.items.length > 0)
  })).filter((P) => P.groups.length > 0) : W, Q = I.length > 0, te = !Q && V > 0, U = (P, ne) => {
    i(P, ne), v(!1), f("");
  }, oe = C === "tables" ? "All related tables" : ((he = r.views.find((P) => P.name === C)) == null ? void 0 : he.title) ?? ((pe = at(u, C)) == null ? void 0 : pe.title) ?? C, me = r.viewLocked ? r.views.filter((P) => P.name === r.viewLocked) : [], le = p ? V > 0 ? `Only compatible fields — ${V} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ y(Pe, { open: m, onOpenChange: v, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: c }),
    /* @__PURE__ */ y(Ve, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ y("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ y("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(ql, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: h,
              onChange: (P) => f(P.target.value),
              placeholder: d ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            "aria-pressed": p,
            "aria-label": le,
            title: le,
            onClick: () => k(!p),
            className: D("cv-picker-compat", p && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(Ul, { className: "cv-ec-icon" }),
              p && V > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: V }) : null
            ]
          }
        ),
        me.length > 0 ? /* @__PURE__ */ l(
          Wg,
          {
            browse: C,
            label: oe,
            views: me,
            onBrowse: R
          }
        ) : null
      ] }),
      C === "tables" && r.sourceCube ? /* @__PURE__ */ y("div", { className: "cv-picker-anchor", children: [
        "Reading from ",
        /* @__PURE__ */ l("strong", { children: r.sourceCube.title }),
        r.sourceCube.grain ? ` (${r.sourceCube.grain})` : "",
        " · joined tables included"
      ] }) : null,
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: Q ? I.map(({ section: P, groups: ne }, ce) => {
        const F = ne.reduce((G, J) => G + J.items.length, 0), x = P.tag === "related", S = N[P.cube.name] ?? x, A = z.length > 0 ? !0 : !S, K = ce > 0 ? I[ce - 1].section : void 0, H = P.tag === "related" && P.heading !== void 0 && ((K == null ? void 0 : K.tag) !== "related" || K.heading !== P.heading);
        return /* @__PURE__ */ y("div", { children: [
          H ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: P.heading }) : null,
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => M((G) => ({ ...G, [P.cube.name]: !S })),
              className: "cv-picker-table",
              children: [
                A ? /* @__PURE__ */ l(ut, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(Un, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(so, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: P.cube.title }),
                P.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: P.cube.grain }) : null,
                P.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : P.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: F })
              ]
            }
          ),
          A ? ne.map((G) => /* @__PURE__ */ y(
            "div",
            {
              className: D(
                "cv-picker-group",
                G.rejected && "cv-picker-group--rejected"
              ),
              children: [
                ne.length > 1 ? /* @__PURE__ */ y("div", { className: "cv-picker-group-header", children: [
                  G.headerIcon,
                  G.label,
                  G.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                hg(G.items).map((J) => {
                  const we = J.familyKey ? T[J.familyKey] : void 0, ge = J.variants.findIndex(($) => $.option.name === we), q = ge >= 0 ? ge : J.defaultIndex, { option: se, kind: ue, reason: Oe } = J.variants[q], We = J.familyKey ? {
                    options: J.variants.map(($, Y) => {
                      const X = at(u, $.option.cube), Ce = Ga($.option);
                      return {
                        label: Bs($.option, X),
                        selected: Y === q,
                        disabled: $.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: $.reason ?? (Ce ? Ya(X) : void 0),
                        divider: Ce && Y > 0,
                        onSelect: () => {
                          L((_e) => ({ ..._e, [J.familyKey]: $.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Kg,
                    {
                      option: se,
                      label: J.familyKey ? J.label : void 0,
                      unitBadge: Wa(se, O),
                      badge: ue === "time" && Sn(se) ? "default" : void 0,
                      reason: Oe,
                      agg: We,
                      onPick: () => U(se.name, ue)
                    },
                    J.familyKey ?? se.name
                  );
                })
              ]
            },
            G.key
          )) : null
        ] }, P.cube.name);
      }) : te ? /* @__PURE__ */ y("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ y("p", { children: [
          V,
          " ",
          z ? "matching " : "",
          "field",
          V === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          V === 1 ? "it" : "them",
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
      ] }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: d ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Wg({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ y(Pe, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      ze,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(lo, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ y(Ve, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(ji, { active: e === "tables", icon: /* @__PURE__ */ l(so, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ y(ve, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          ji,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(co, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function ji({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ y(
    "button",
    {
      type: "button",
      onClick: n,
      className: D(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Wt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Kg({ option: e, label: t, reason: n, onPick: r, unitBadge: a, badge: i, agg: o }) {
  const s = a ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: a }) : null, c = t ?? e.label, u = o ? /* @__PURE__ */ l(Ks, { options: o.options }) : null, d = n ? /* @__PURE__ */ y(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: n,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ y("span", { className: "cv-picker-row-main", children: [
          s,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: c })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: n })
      ]
    }
  ) : /* @__PURE__ */ y(
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
  return u ? /* @__PURE__ */ y("span", { className: "cv-picker-rowwrap", children: [
    d,
    u
  ] }) : d;
}
const Bg = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Jt = "yyyy-MM-dd";
function Hg(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Wi(e) {
  if (!e) return;
  const t = no(e, Jt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Xa({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = Hg(e), s = Wi(i), c = Wi(o), u = s ? { from: s, to: c } : void 0, d = a ? e : s && c ? `${be(s, "MMM d, yyyy")} – ${be(c, "MMM d, yyyy")}` : s ? be(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ y(Pe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: D("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(oo, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: D("cv-daterange-label", d === "Any time" && "cv-daterange-label--placeholder"), children: d })
    ] }) }),
    /* @__PURE__ */ y(Ve, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ y("div", { className: "cv-daterange-presets", children: [
        Bg.map((m) => /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "sm",
            className: D("cv-daterange-preset", e === m && "cv-daterange-preset--active"),
            onClick: () => {
              t(m), r(!1);
            },
            children: m
          },
          m
        )),
        /* @__PURE__ */ l(
          ee,
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
        cs,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (m) => {
            m != null && m.from && m.to ? t([be(m.from, Jt), be(m.to, Jt)]) : m != null && m.from ? t([be(m.from, Jt), be(m.from, Jt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Qs = b.createContext({});
function qg({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Qs.Provider, { value: n, children: t });
}
function Ug() {
  return b.useContext(Qs);
}
function Gg({ kind: e, value: t, onChange: n, className: r }) {
  const a = pn(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Ug(), [s, c] = b.useState(!1), [u, d] = b.useState(!1), [m, v] = b.useState(""), h = b.useMemo(() => Jp(i, e), [i, e]), f = h.find((w) => w.name === t), p = (w) => {
    n(w), c(!1), d(!1);
  }, k = () => {
    if (!o) return;
    const w = eg(e, m || "Variable", i);
    o(w), p(w.name), v("");
  };
  return /* @__PURE__ */ y(
    Pe,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || d(!1);
      },
      children: [
        /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: D("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Ql, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: D("cv-var-trigger-label", !f && "cv-var-trigger-label--placeholder"), children: f ? f.label ?? f.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ y(Ve, { align: "start", className: "cv-var-popover", children: [
          h.length > 0 ? h.map((w) => /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => p(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Wt, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ y("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              ke,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: m,
                onChange: (w) => v(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(ee, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(Nt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function jt({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = Ne(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => D("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ y("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ y("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), Ne(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      Gg,
      {
        kind: e,
        value: Ne(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(Ne(t) ? void 0 : t, (u) => n(u))
  ] });
}
const Yg = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Sr(e) {
  return "member" in e && "operator" in e;
}
function Qg({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var O;
  const { meta: s } = ft(), c = ((O = pn()) == null ? void 0 : O.decls) ?? [], [u, d] = b.useState(null), [m, v] = b.useState(null), h = r ?? [], f = h.length === 1 && !Sr(h[0]) && "or" in h[0] && Array.isArray(h[0].or) && h[0].or.every(Sr) ? h[0] : void 0, p = f ? "any" : "all", k = [], w = [];
  f || h.forEach((_) => Sr(_) ? k.push(_) : w.push(_));
  const C = f ? f.or : k, R = w.length === 0 && (C.length >= 2 || p === "any"), N = (_) => p === "any" ? _.length ? [{ or: _ }] : [] : [..._, ...w], M = (_) => {
    const B = _.filter((W) => W.member.length > 0), E = N(B);
    a(E.length > 0 ? E : void 0);
  }, T = (_) => {
    const B = _ === "any" ? C.length ? [{ or: C }] : [] : [...C];
    a(B.length > 0 ? B : void 0);
  }, L = (_, B) => M(C.map((E, W) => W === _ ? { ...E, ...B } : E)), j = (_) => M(C.filter((B, E) => E !== _)), z = (_) => {
    const E = { ...m ?? { member: "", operator: "equals", values: [] }, ..._ };
    E.member ? (v(null), d(C.length), M([...C, E])) : v(E);
  };
  return /* @__PURE__ */ y("div", { "data-slot": "filter-builder", className: D("cv-filter-builder", o), children: [
    C.length === 0 && !m ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    R ? /* @__PURE__ */ y("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Ft,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: p,
          onChange: T
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    C.map((_, B) => {
      const E = De(s, _.member);
      return u === B ? /* @__PURE__ */ l(
        Ki,
        {
          leaf: _,
          member: E,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (W) => L(B, W),
          onDone: () => d(null),
          onRemove: () => j(B)
        },
        B
      ) : /* @__PURE__ */ l(
        Jg,
        {
          text: Xg(_, E == null ? void 0 : E.label, c),
          disabled: i,
          onEdit: () => d(B),
          onRemove: () => j(B)
        },
        B
      );
    }),
    m ? /* @__PURE__ */ l(
      Ki,
      {
        leaf: m,
        member: De(s, m.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: z,
        onRemove: () => v(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ y("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ y(
      ee,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!m,
        onClick: () => {
          d(null), v({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Nt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Jg({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ y("div", { className: "cv-filter-summary", children: [
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
      ee,
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
function Ki({
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
  const { meta: u } = ft(), d = Pi(t == null ? void 0 : t.type), m = d.includes(e.operator) ? e.operator : d[0], v = !Yr.has(m), h = b.useId(), f = b.useId(), p = b.useId(), k = b.useId(), w = b.useId(), C = b.useId();
  b.useEffect(() => {
    m !== e.operator && o({ operator: m });
  }, [e.operator, o, m]);
  const R = (N) => {
    const M = De(u, N);
    o({ member: N, operator: Pi(M == null ? void 0 : M.type)[0], values: [] });
  };
  return /* @__PURE__ */ y("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ y("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ y("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ y(ee, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Wt, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          ee,
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
    /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Ja,
          {
            well: Yg,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: R,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ y(
              "button",
              {
                type: "button",
                id: f,
                disabled: i,
                "aria-labelledby": `${h} ${f}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ y("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(Xr, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(ut, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Hs,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: R,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: p, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ y(
        Le,
        {
          value: m,
          onValueChange: (N) => o({
            operator: N,
            values: Yr.has(N) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              Ie,
              {
                id: k,
                "aria-labelledby": `${p} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Fe, {})
              }
            ),
            /* @__PURE__ */ l($e, { children: d.map((N) => /* @__PURE__ */ l(ye, { value: N, children: Ds[N] }, N)) })
          ]
        }
      )
    ] }),
    v ? /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: C, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Zg,
        {
          fieldId: C,
          labelId: w,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (N) => o({ values: N })
        }
      )
    ] }) : null
  ] });
}
function Xg(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = Ds[e.operator] ?? e.operator;
  if (Yr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Ne(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Zg({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Ne(i[0]);
  if (t === "time") {
    const u = o ? i[0] : ev(i);
    return /* @__PURE__ */ l(
      jt,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (d) => n(d === void 0 ? [] : Ne(d) ? [d] : tv(d)),
        renderFixed: (d, m) => /* @__PURE__ */ l(Xa, { value: d, onChange: m })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !Ne(u));
  return /* @__PURE__ */ l(
    jt,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : Ne(u) ? [u] : u),
      renderFixed: (u, d) => /* @__PURE__ */ l(
        ke,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (m) => d(nv(m.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function ev(e) {
  const t = e.filter((n) => !Ne(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function tv(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function nv(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function rv({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ y(
      ze,
      {
        className: D(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Jl, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ y(Ve, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ y("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(av, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Qg, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function av({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ft(), a = gg(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ y("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: a.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o(s.name),
        title: s.description ?? s.name,
        className: D(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function iv(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function ov({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", c = b.useId(), u = b.useId(), d = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ y("div", { className: D("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": d },
        value: o,
        placeholder: "No title",
        onChange: (v) => iv(e, t, n, { label: v.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function sv({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ y("div", { className: D("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(Xl, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Zl, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Js = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: D("cv-label", e),
      ...t
    }
  )
);
Js.displayName = "Label";
function fe({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ y("div", { "data-slot": "field-row", className: D("cv-field-row", i), children: [
    /* @__PURE__ */ y("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Js, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function ea({
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
      className: D("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function lt({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: i
}) {
  const o = b.useId();
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "switch-row",
      className: D("cv-switch-row", i),
      children: [
        /* @__PURE__ */ y(
          "label",
          {
            htmlFor: o,
            className: D("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(ea, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const lv = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, cv = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function uv({ spec: e, update: t }) {
  var w, C, R;
  const n = dt(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((C = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : C.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", m = d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none", v = ((R = r.transform) == null ? void 0 : R.kind) ?? "none", h = Aa(o) ? /* @__PURE__ */ y(ve, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Compare",
        hint: v === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ y(
          Le,
          {
            value: v,
            onValueChange: (N) => {
              var M;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((M = r.transform) == null ? void 0 : M.window) ?? wn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(Ie, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Fe, {}) }),
              /* @__PURE__ */ l($e, { children: cv.map((N) => /* @__PURE__ */ l(ye, { value: N, children: lv[N] }, N)) })
            ]
          }
        )
      }
    ),
    v === "rollingAvg" ? /* @__PURE__ */ l(dv, { label: "Window (points)", children: (N) => {
      var M;
      return /* @__PURE__ */ l(
        ke,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((M = r.transform) == null ? void 0 : M.window) ?? wn,
          onChange: (T) => {
            const L = parseInt(T.target.value, 10), j = Number.isFinite(L) ? Math.min(90, Math.max(2, L)) : wn;
            s({ transform: { kind: "rollingAvg", window: j } });
          }
        }
      );
    } }) : null
  ] }) : null, f = /* @__PURE__ */ l(fe, { label: "Line shape", children: /* @__PURE__ */ l(
    Ft,
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
      onChange: (N) => c({ curve: N })
    }
  ) }), p = /* @__PURE__ */ l(fe, { label: "Stacked", children: /* @__PURE__ */ l(
    Ft,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: m,
      onChange: (N) => s({ stackMode: N })
    }
  ) }), k = (() => {
    var N, M;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ y(ve, { children: [
          /* @__PURE__ */ l(
            lt,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (T) => s({ orientation: T ? "horizontal" : "vertical" })
            }
          ),
          p
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return f;
      case "area":
        return /* @__PURE__ */ y(ve, { children: [
          f,
          p,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((M = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : M.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ y(ve, { children: [
          /* @__PURE__ */ l(
            lt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (T) => c({ innerRadiusPct: T ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(fe, { label: "Slice labels", children: /* @__PURE__ */ l(
            Ft,
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
              onChange: (T) => c({ showLabels: T })
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
  return /* @__PURE__ */ y("div", { className: "cv-customize", children: [
    k,
    h
  ] });
}
function mv(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || Aa(n);
}
function dv({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ y("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function Xs(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function Zs(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!He(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      Se(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function fv(e) {
  let t = 0;
  for (const n of e)
    He(n) && (t += n.optional ? 1 : 3);
  return t;
}
function hv(e, t) {
  return e.some((n) => He(n) && n.cardinality === "many" && Se(n, t));
}
const pv = 0.35, gv = 0.4, vv = 0.3, bv = 0.1;
function yv(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? vv : e.supportsCartesianAxes ? bv : e.wells.some(
    (a) => He(a) && a.channel === "x" && Se(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function el(e) {
  const t = e.filter(He);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function kv(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const wv = (e, t, n) => e === 1 ? t : n;
function Cv(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${kv(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${wv(r, "measure", "measures")}`;
  return el(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function Nv(e, t) {
  const n = Xs(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = Zs(s, n), u = fv(s), d = Math.max(0, n.length - c.matched.length), m = Rg(s, r) + 0.5 * d, v = u > 0 ? m / u : 0, h = c.leftover.filter(
      (p) => p.kind !== "time" && !hv(s, p.kind)
    ).length, f = v - pv * h + yv(o, a) - (el(s) ? gv : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(f * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Cv(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function Sv(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function xv(e, t, n) {
  const r = e.require(n), a = Zs(r.wells, Xs(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = _t(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function tl(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Og(e, r, n));
  };
}
function Mv({ spec: e, update: t, empty: n }) {
  const r = dt(), a = e.chart.family, i = tl(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ y("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(nl, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function Rv({ spec: e, update: t }) {
  const n = dt(), r = e.chart.family, a = tl(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(ut, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ y(Ve, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(nl, { spec: e, family: r, onPick: a, families: n }),
      mv(r, n) ? /* @__PURE__ */ y("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(uv, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function nl({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => Nv(r, e), [r, e]), i = b.useMemo(() => Sv(a), [a]), o = b.useMemo(
    () => new Map(a.map((m) => [m.family, m])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((m) => m.fits).map((m) => m.family)),
    [a]
  ), c = Av(e, r, s), u = (m, v) => /* @__PURE__ */ l(
    Tv,
    {
      fit: m,
      active: m.family === t,
      preview: c.get(m.family),
      families: r,
      reason: v ? m.reason : void 0,
      onPick: n
    },
    m.family
  ), d = r.list().map(
    (m) => o.get(m.family) ?? {
      family: m.family,
      descriptor: m,
      score: 0,
      fits: !1,
      reason: m.label
    }
  );
  return /* @__PURE__ */ y("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ y("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((m) => u(m, !0)) })
    ] }) : null,
    /* @__PURE__ */ y("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: d.map((m) => u(m, !1)) })
    ] })
  ] });
}
function Tv({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: a,
  onPick: i
}) {
  const o = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ y(
    "div",
    {
      className: D("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Vv,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ y("span", { className: "cv-type-tile-caption", children: [
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
function rl(e, t) {
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
function Ov(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const Bi = 200, _v = () => () => {
};
function Av(e, t, n) {
  const r = e.query, a = Ov(r), i = b.useMemo(() => {
    const v = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof v == "number" ? Math.min(v, Bi) : Bi
    };
  }, [r]), o = pn(), s = b.useRef(null);
  s.current === null && (s.current = es());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, d = b.useSyncExternalStore(
    o ? o.store.subscribe : _v,
    u,
    u
  ), { resultSet: m } = is(d, { skip: !a });
  return b.useMemo(() => {
    const v = /* @__PURE__ */ new Map();
    for (const h of t.list()) {
      const f = h.family;
      if (h.queryless || a && n.has(f) && !m) continue;
      const w = (m && n.has(f) ? Dv(e, f, t, m, d) : void 0) ?? zv(f, t);
      w && v.set(f, w);
    }
    return v;
  }, [e, t, m, d, n, a]);
}
function Dv(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : xv(n, e, t), o = rl(i.chart, n), s = Qo(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const Mt = "sample.category", dn = "sample.group", Me = "sample.value", je = "sample.count", al = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ta = [18, 27, 21, 34, 26, 39], na = [12, 9, 17, 14, 22, 16], Ev = al.flatMap((e, t) => [
  { [Mt]: e, [dn]: "North", [Me]: ta[t], [je]: na[t] },
  {
    [Mt]: e,
    [dn]: "South",
    [Me]: Math.round(ta[t] * 0.62),
    [je]: Math.round(na[t] * 0.78)
  }
]), Lv = {
  measures: [Me, je],
  dimensions: [Mt, dn]
}, Fv = {
  measures: {
    [Me]: { title: "Value", shortTitle: "Value", type: "number" },
    [je]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [Mt]: { title: "Day", shortTitle: "Day", type: "string" },
    [dn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function il(e) {
  const t = [
    { key: Me, label: "Value", data: ta, colorToken: "chart-1" },
    { key: je, label: "Count", data: na, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: al,
    series: t,
    raw: { rows: Ev, query: Lv, annotation: Fv },
    empty: !1
  };
}
const Iv = il(1), $v = il(2), Xt = (e, t) => ({
  family: e,
  mapping: { category: { member: Mt }, series: { mode: "measures", members: t } }
}), Pv = {
  bar: Xt("bar", [Me, je]),
  line: Xt("line", [Me, je]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: Xt("area", [Me, je]),
  pie: Xt("pie", [Me]),
  scatter: { family: "scatter", familyOptions: { x: Me, y: je } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: Mt },
      series: { mode: "pivot", value: Me, pivot: dn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Me, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: Mt }, { member: Me }, { member: je }] }
  }
};
function zv(e, t) {
  const n = Pv[e] ?? Xt(e, [Me, je]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Iv : $v,
    options: rl(n, t)
  };
}
const Vv = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(jv, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Go,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class jv extends b.Component {
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
function Wv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Kv(e, t, n, r, a, i) {
  var H, G, J, we, ge;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : Bv(a), d = o.familyOptions ?? {}, m = Array.isArray(d.columns) ? d.columns : [], v = $s(o), h = v[r], f = c === "table" && n.id === "columns", p = c === "bar" || c === "line" || c === "area", k = ((G = (H = o.mapping) == null ? void 0 : H.series) == null ? void 0 : G.mode) === "measures", w = p && n.id === "y", C = w && k, R = f ? (J = m.find((q) => q.member === r)) == null ? void 0 : J.label : C ? h == null ? void 0 : h.label : void 0, N = C ? h == null ? void 0 : h.colorToken : void 0, M = vn(s), T = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, L = T ? M == null ? void 0 : M.granularity : void 0, j = T ? M == null ? void 0 : M.dateRange : void 0, z = (c === "line" || c === "area") && n.id === "y" && k, O = z ? h == null ? void 0 : h.dots : void 0, _ = (q) => {
    var We, $;
    if ((We = o.mapping) != null && We.series && o.mapping.series.mode !== "measures") return;
    const se = (($ = o.mapping) != null && $.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ue = { ...v };
    q && Object.keys(q).length > 0 ? ue[r] = q : delete ue[r];
    const Oe = gn(o);
    Oe && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Oe }, series: Ps(se, ue) }
      }
    });
  }, B = (q) => {
    const se = m.map((ue) => ue.member === r ? { ...ue, ...q } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...d, columns: se } } });
  }, E = (q) => {
    f ? B({ label: q }) : C && _({ ...h, label: q });
  }, W = (q) => {
    C && _({ ...h, colorToken: q ?? void 0 });
  }, V = (q) => {
    if (!M) return;
    const se = { ...M };
    for (const ue of Object.keys(q)) {
      const Oe = q[ue];
      Oe === void 0 ? delete se[ue] : se[ue] = Oe;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, I = (q) => V({ granularity: q }), Q = (q) => V({ dateRange: q }), te = (q) => {
    C && _({ ...h, dots: q });
  }, U = () => t(js(e, c, n.id, r, i)), oe = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), me = (we = o.mapping) == null ? void 0 : we.series, le = (me && me.mode === "pivot" ? me.value : Qr(o)[0]) ?? ((ge = s.measures) == null ? void 0 : ge[0]), he = oe ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...le ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...le ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], pe = (() => {
    const q = Wv(s.order)[0];
    if (!q) return "none";
    const [se, ue] = q;
    return le && se === le ? ue === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? ue === "desc" ? "time-desc" : "time-asc" : ue === "asc" ? "label-asc" : "label-desc" : "none";
  })(), P = (q) => {
    let se;
    switch (q) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = le ? [[le, "desc"]] : void 0;
        break;
      case "value-asc":
        se = le ? [[le, "asc"]] : void 0;
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
  }, ne = typeof s.limit == "number" ? s.limit : void 0, ce = (q) => t({ ...e, query: { ...s, limit: q && q > 0 ? q : void 0 } }), x = (c === "bar" || c === "line" || c === "area") && T, S = x && d.comparePrevious === !0;
  return {
    kind: u,
    label: R,
    colorToken: N,
    granularity: L,
    dateRange: j,
    dots: O,
    canPoints: z,
    canRename: f || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: T,
    isCategoryField: oe,
    sortValue: pe,
    sortOptions: he,
    onSort: P,
    limit: ne,
    onLimit: ce,
    canComparePrevious: x,
    comparePrevious: S,
    comparePreviousReady: x && j !== void 0,
    onComparePrevious: (q) => t({ ...e, chart: { ...o, familyOptions: { ...d, comparePrevious: q || void 0 } } }),
    onRename: E,
    onRecolor: W,
    onGranularity: I,
    onDateRange: Q,
    onDots: te,
    onRemove: U
  };
}
function Bv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ra(e, t, n, r) {
  var m;
  const { chart: a, query: i } = e, o = a.family, s = (v) => {
    if (r < 0 || r >= v.length || n === r) return v;
    const h = v.slice(), [f] = h.splice(n, 1);
    return h.splice(r, 0, f), h;
  };
  if (o === "table" && t.id === "columns") {
    const v = a.familyOptions ?? {}, h = s(Array.isArray(v.columns) ? v.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...v, columns: h } } };
  }
  const c = s(i.measures ?? []), u = (m = a.mapping) == null ? void 0 : m.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const v = s(u.values);
    d = { ...a.mapping, series: { ...u, value: v[0], values: v } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: d } };
}
function Hv(e, t) {
  return e.allowedCubes.includes(t);
}
function qv(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const a = e.get(r.shift());
    for (const i of (a == null ? void 0 : a.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function ol(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function aa(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = qv(e, n);
    let a = !0;
    for (const i of t)
      if (!r.has(i)) {
        a = !1;
        break;
      }
    if (a) return !0;
  }
  return !1;
}
function Uv(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    aa(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function Hi(e, t, n, r) {
  var N;
  const a = cr(e), i = a.filter((M) => M.type === "view"), o = on(t, r), s = Object.values(o).flat();
  let c;
  for (const M of s) {
    const T = De(e, M);
    if (T) {
      c = T;
      break;
    }
  }
  const u = !c && n ? at(e, n) : void 0, d = c ? at(e, c.cube) : u, m = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, v = t.query.measures ?? [], h = v.length ? At(v[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: i, measureSource: h, allowedCubes: [m] };
  const f = h ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), p = f ? at(e, f) : void 0, k = ol(a), w = /* @__PURE__ */ new Set();
  for (const M of s) {
    const T = (N = De(e, M)) == null ? void 0 : N.cube;
    T && k.has(T) && w.add(T);
  }
  h && k.has(h) && w.add(h), !w.size && f && k.has(f) && w.add(f);
  const C = Uv(k, w), R = C.filter((M) => M !== f).map((M) => k.get(M)).sort((M, T) => M.title.localeCompare(T.title));
  return {
    sourceCube: (p == null ? void 0 : p.type) === "cube" ? p : void 0,
    relatedCubes: R,
    views: i,
    measureSource: h,
    allowedCubes: C
  };
}
function Gv(e, t, n) {
  if (!t) return e;
  const r = ol(cr(t)), a = e.query ?? {}, i = new Set(Object.values(on(e, n)).flat()), o = (p) => {
    const k = At(p);
    return k !== void 0 && r.has(k) ? k : void 0;
  }, s = /* @__PURE__ */ new Set();
  for (const p of [...a.measures ?? [], ...a.dimensions ?? []]) {
    const k = o(p);
    k && s.add(k);
  }
  const c = a.timeDimensions ?? [];
  for (const p of c) {
    const k = o(p.dimension);
    k && s.add(k);
  }
  if (aa(r, s)) return e;
  const u = (a.measures ?? []).map(o).find((p) => p !== void 0) ?? [...i].map((p) => {
    var k;
    return (k = De(t, p)) == null ? void 0 : k.cube;
  }).find((p) => p !== void 0 && r.has(p));
  if (!u) return e;
  const d = /* @__PURE__ */ new Set([u]), m = (p) => aa(r, /* @__PURE__ */ new Set([...d, p])) && (d.add(p), !0), v = [];
  for (const p of c) {
    const k = o(p.dimension);
    if (k && m(k)) {
      v.push(p);
      continue;
    }
    if (i.has(p.dimension))
      v.push(p);
    else {
      const w = Ts(t, u);
      w && !v.some((C) => C.dimension === w.name) && v.push({ ...p, dimension: w.name });
    }
  }
  const h = (p) => {
    if (i.has(p)) return !0;
    const k = o(p);
    return k !== void 0 && m(k);
  }, f = {
    ...a,
    measures: (a.measures ?? []).filter(h),
    dimensions: (a.dimensions ?? []).filter(h),
    timeDimensions: v
  };
  return { ...e, query: f };
}
class ur extends b.Component {
  constructor() {
    super(...arguments);
    dr(this, "state", { error: null, resetKey: this.props.resetKey });
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
    return n ? /* @__PURE__ */ y("div", { className: "cv-ed-broken", role: "alert", children: [
      /* @__PURE__ */ l(ec, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
      /* @__PURE__ */ y("div", { children: [
        /* @__PURE__ */ y("strong", { className: "cv-ed-broken-title", children: [
          this.props.label,
          " couldn’t be shown"
        ] }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-msg", children: n.message }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-hint", children: "The rest of the chart is still editable — undo the last change to this control, or clear the value it holds." })
      ] })
    ] }) : this.props.children;
  }
}
const Yv = ot.options;
function Qv({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: D("cv-color-picker", a),
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
            className: D(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        Yv.map((i) => {
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
              className: D(
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
function Jv({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  getSwap: s,
  className: c
}) {
  const u = dt(), d = or(), m = Kv(e, t, n, r, a, u), v = b.useId(), h = b.useId(), f = b.useId(), p = b.useId(), k = b.useId(), w = b.useId(), C = (a == null ? void 0 : a.label) ?? r, R = m.label || C, N = m.canColor && i !== void 0, M = m.canRename || N || m.isTimeField || m.isCategoryField || m.canPoints || s !== void 0, T = (O) => {
    const _ = O.trim();
    m.onRename(_.length > 0 ? _ : void 0);
  }, L = (O) => {
    !o || !O.altKey || (O.key === "ArrowUp" && o.index > 0 ? (O.preventDefault(), o.onMove(-1)) : O.key === "ArrowDown" && o.index < o.total - 1 && (O.preventDefault(), o.onMove(1)));
  }, j = /* @__PURE__ */ y(ve, { children: [
    o ? /* @__PURE__ */ l(tc, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
    N ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? (
      // What the field HOLDS, in words ("km", "#", "date") — same chip as the
      // picker rows, converted to the viewer's unit system.
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Wa(a, d) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: R })
  ] }), z = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "field-pill",
      className: D("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", c),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (O) => {
        O.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? L : void 0,
      children: [
        M ? /* @__PURE__ */ y(Pe, { children: [
          /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${R}${z}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: j
            }
          ) }),
          /* @__PURE__ */ l(Ve, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ y("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(Xv, { getSwap: s, display: R }) : null,
            m.canRename ? /* @__PURE__ */ y("label", { className: "cv-ec-field", htmlFor: v, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                ke,
                {
                  id: v,
                  defaultValue: m.label ?? "",
                  placeholder: C,
                  className: "cv-ec-h8",
                  onBlur: (O) => T(O.target.value),
                  onKeyDown: (O) => {
                    O.key === "Enter" && (T(O.target.value), O.target.blur());
                  }
                }
              )
            ] }) : null,
            N ? /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(Qv, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ y(ve, { children: [
              /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  jt,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (O, _) => /* @__PURE__ */ l(Xa, { value: O, onChange: _ })
                  }
                )
              ] }),
              /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  jt,
                  {
                    kind: "granularity",
                    value: m.granularity,
                    onChange: m.onGranularity,
                    renderFixed: (O, _) => /* @__PURE__ */ l(
                      Ms,
                      {
                        value: O,
                        onChange: _,
                        allowAuto: !0,
                        autoHint: Ea(m.dateRange),
                        options: Xo(m.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              m.canComparePrevious ? /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ y("label", { className: "cv-ec-row", htmlFor: k, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    ea,
                    {
                      id: k,
                      checked: m.comparePrevious,
                      onChange: m.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                m.comparePrevious && !m.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            m.isCategoryField ? /* @__PURE__ */ y(ve, { children: [
              /* @__PURE__ */ y("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: h, children: [
                /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: h,
                    "aria-labelledby": f,
                    value: m.sortValue,
                    onChange: (O) => m.onSort(O.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((O) => /* @__PURE__ */ l("option", { value: O.key, children: O.label }, O.key))
                  }
                )
              ] }),
              /* @__PURE__ */ y("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: p, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  ke,
                  {
                    id: p,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (O) => {
                      const _ = O.target.value.trim();
                      m.onLimit(_ === "" ? void 0 : Number(_));
                    },
                    onKeyDown: (O) => {
                      if (O.key === "Enter") {
                        const _ = O.target.value.trim();
                        m.onLimit(_ === "" ? void 0 : Number(_)), O.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ y("label", { className: "cv-ec-row", htmlFor: w, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(ea, { id: w, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ y(
              ee,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: m.onRemove,
                children: [
                  /* @__PURE__ */ l(_r, { className: "cv-ec-icon" }),
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
              title: `${R}${z}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${R}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: j
            }
          )
        ),
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: m.onRemove,
            "aria-label": `Remove ${R}`,
            children: /* @__PURE__ */ l(_r, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function Xv({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ y(ve, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(Ks, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
      n.hint ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: n.hint }) : null
    ] }) : null,
    /* @__PURE__ */ l(
      Ja,
      {
        well: n.picker.well,
        placed: n.picker.placed,
        inWell: n.picker.inWell,
        scope: n.picker.scope,
        blockReason: n.picker.blockReason,
        onSelect: n.picker.onSelect,
        side: "right",
        align: "start",
        children: /* @__PURE__ */ y("button", { type: "button", className: "cv-field-pill-swap", title: `Swap ${t} for another field`, children: [
          /* @__PURE__ */ l(nc, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function Zv({
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
  swapFor: d,
  badge: m,
  orientation: v,
  lockedSingle: h,
  disableReorder: f,
  label: p,
  note: k,
  pickerSide: w,
  pickerAlign: C,
  control: R
}) {
  const N = n.cardinality === "many" && !h, M = N || r.length === 0, T = r.length, L = v === "vertical", j = p ?? n.label, z = N && T > 1 && !f, [O, _] = b.useState(null), B = ["number", "category", "time"].filter((V) => !Se(n, V)).map((V) => Ka(n, V, r)).find((V) => V !== void 0) ?? n.hint, E = a.length === 0 && !n.optional && Se(n, "number") ? "Pick a number to get started" : void 0, W = /* @__PURE__ */ l(
    Ja,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: w ?? (L ? "right" : "top"),
      align: C ?? "start",
      children: /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          title: B,
          className: D(
            "cv-well-add",
            L && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Nt, { className: "cv-ec-icon" }),
            r.length === 0 ? j : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "well-group",
      className: D("cv-well-group", !L && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ y("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: j }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        R ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: R }) : null,
        /* @__PURE__ */ l(ur, { label: j, resetKey: e, children: /* @__PURE__ */ y("div", { className: D("cv-well-fields", L ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((V, I) => /* @__PURE__ */ l(
            Jv,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: i(V),
              resolvedColor: o(V),
              getSwap: d ? () => d(V) : void 0,
              className: L ? "cv-field-pill--full" : void 0,
              reorder: z ? {
                index: I,
                total: T,
                dragging: O === I,
                onDragStart: () => _(I),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  O === null || O === I || (t(ra(e, n, O, I)), _(I));
                },
                onDragEnd: () => _(null),
                onMove: (Q) => t(ra(e, n, I, I + Q))
              } : void 0
            },
            V
          )),
          M ? W : null
        ] }) }),
        E ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: E }) : null,
        k ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: k }) : null
      ]
    }
  );
}
function xr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ y("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(ut, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Ve, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(ur, { label: e, children: n }) })
  ] });
}
function Za(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function eb({ spec: e, update: t }) {
  var d;
  const { fo: n, setFO: r } = Za(e, t), a = Is(e), i = (d = e.query.timeDimensions) == null ? void 0 : d[0], o = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (m) => {
    const v = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!v) return;
    const h = { ...v };
    for (const f of Object.keys(m)) {
      const p = m[f];
      p === void 0 ? delete h[f] : h[f] = p;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ y("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(sn, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      Hs,
      {
        id: m,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (v) => u({ dimension: v }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(sn, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      jt,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (v) => u({ dateRange: v }),
        renderFixed: (v, h) => /* @__PURE__ */ l(Xa, { value: v, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(fe, { label: "Display", children: /* @__PURE__ */ l(
      Ft,
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
    /* @__PURE__ */ l(
      lt,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (m) => r({ goodDirection: m ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(sn, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      ke,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (v) => {
          const h = parseFloat(v.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function tb({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Za(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ y("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(fe, { label: "Compare to", children: /* @__PURE__ */ l(
      Ft,
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
            { ...o.current ?? { showAsPercent: !0 }, mode: d }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ y(ve, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(sn, { label: "Baseline value", children: ({ id: d }) => /* @__PURE__ */ l(
        ke,
        {
          id: d,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const v = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(v) ? v : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ y("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(ao, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ y("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        lt,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      )
    ] }) : null
  ] });
}
function nb({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Za(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = Xo((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ y("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(sn, { label: "Trend", children: ({ id: d, labelId: m }) => /* @__PURE__ */ l(
      jt,
      {
        labelId: m,
        kind: "granularity",
        value: o,
        onChange: (v) => r({
          sparkline: v === void 0 ? void 0 : { ...a, granularity: v }
        }),
        renderFixed: (v, h) => /* @__PURE__ */ l(
          Ms,
          {
            id: d,
            value: v,
            onChange: h,
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
function sn({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function rb({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var P, ne, ce;
  const { meta: a } = ft(), i = dt(), o = b.useCallback(
    (F) => t(Gv(F, a, i)),
    [t, a, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), d = u.queryless ?? !1, m = u.enforcesAxisUnit, v = Is(e), h = or(), f = b.useMemo(() => Ag(c, i), [c, i]), p = b.useMemo(() => on(e, i), [e, i]), k = b.useMemo(() => new Map(f.map((F) => [F.id, F])), [f]), w = b.useMemo(
    () => Hi(a, e, void 0, i),
    [a, e, i]
  ), C = b.useMemo(() => Object.values(p).flat(), [p]), R = b.useMemo(
    () => {
      var F;
      return w.viewLocked ? [w.viewLocked] : [(F = w.sourceCube) == null ? void 0 : F.name, ...w.relatedCubes.map((x) => x.name)].filter(
        Boolean
      );
    },
    [w]
  ), N = b.useMemo(
    () => Object.values(p).every((F) => F.length === 0),
    [p]
  ), M = b.useCallback(
    (F) => {
      const x = (F.y ?? [])[0], S = x ? De(a, x) : void 0;
      return {
        leftKey: x ? zs(S) : void 0,
        leftLabel: x ? ab(S, h(S == null ? void 0 : S.unit)) : void 0
      };
    },
    [a, h]
  ), T = b.useMemo(() => M(p), [M, p]), L = b.useCallback(
    (F, x) => (S, A) => {
      var K;
      if (A) {
        if (!Hv(F, A.cube))
          return "Clear the current fields to use a different dataset.";
        if (A.memberType === "measure" && F.measureSource && A.cube !== F.measureSource)
          return `This chart's numbers come from ${((K = F.sourceCube) == null ? void 0 : K.title) ?? F.measureSource}. Remove them to use another table.`;
        if (m && S === "y" && A.memberType === "measure")
          return $g(A, x.leftKey, x.leftLabel);
      }
    },
    [m]
  ), j = b.useMemo(
    () => L(w, T),
    [L, w, T]
  ), z = T.leftLabel, O = b.useMemo(() => {
    var x;
    const F = {};
    if (c === "bar" || c === "line" || c === "area") {
      const S = (x = s.mapping) == null ? void 0 : x.series;
      if (S && S.mode === "measures") {
        const A = S.members.map((H) => {
          var G, J;
          return { key: H, colorToken: (J = (G = S.meta) == null ? void 0 : G[H]) == null ? void 0 : J.colorToken };
        }), K = Yo(A, s.colors);
        S.members.forEach((H, G) => {
          F[H] = K[G];
        });
      }
    }
    return F;
  }, [c, s.mapping, s.colors]), _ = b.useCallback(
    (F, x, S) => {
      const A = De(a, x);
      if (j(F, A)) return;
      let K = S === "geoPoint" && (A != null && A.latMember) && A.lngMember ? _t(
        _t(e, c, "lat", A.latMember, "numberDimension", i),
        c,
        "lng",
        A.lngMember,
        "numberDimension",
        i
      ) : _t(e, c, F, x, S, i);
      const H = u.canonicalTimeWell;
      if (H && F !== H && (p[H] ?? []).length === 0) {
        const G = Ts(a, A == null ? void 0 : A.cube);
        G && G.name !== x && !j(H, G) && (K = _t(K, c, H, G.name, "time", i));
      }
      o(K);
    },
    [j, a, o, e, c, i, u, p]
  ), B = b.useCallback(
    (F, x) => {
      if (d) return;
      const S = k.get(F), A = De(a, x);
      if (!S || !A) return;
      const K = (p[F] ?? []).indexOf(x), H = js(e, c, F, x, i), G = on(H, i), J = Hi(a, H, void 0, i), we = L(J, M(G)), ge = G[F] ?? [], q = Object.values(G).flat(), se = (X, Ce) => {
        if (X === x) return;
        let _e = _t(H, c, F, X, Ce, i);
        const Ye = (on(_e, i)[F] ?? []).indexOf(X);
        K >= 0 && Ye > K && (_e = ra(_e, S, Ye, K)), o(_e);
      }, ue = Os(a, A), Oe = at(a, A.cube), We = ue.length > 1 ? {
        options: ue.map((X, Ce) => {
          const _e = X.memberType === "measure" ? "number" : "numberDimension", Rt = X.name === x ? void 0 : qs(S, _e, ge, X, (dl) => we(F, dl)), Ye = Ga(X);
          return {
            label: Bs(X, at(a, X.cube)),
            selected: X.name === x,
            disabled: Rt !== void 0,
            title: Rt ?? (Ye ? Ya(Oe) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: Ye && Ce > 0,
            onSelect: () => se(X.name, _e)
          };
        })
      } : void 0, Y = C.filter((X) => {
        var Ce;
        return ((Ce = De(a, X)) == null ? void 0 : Ce.cube) === A.cube;
      }).length === 1 ? mg(A) : void 0;
      return {
        picker: {
          well: S,
          placed: q,
          inWell: ge,
          scope: J,
          blockReason: (X) => we(F, X),
          onSelect: se
        },
        agg: We,
        hint: We ? Lg(ue, Oe, A) : void 0,
        notice: Y
      };
    },
    [d, k, a, p, C, e, c, i, L, M, o]
  ), E = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, W = E.left.map((F) => k.get(F)).filter(Boolean), V = E.bottom.map((F) => k.get(F)).filter(Boolean), I = (P = p.color) == null ? void 0 : P[0], Q = ((ne = p.y) == null ? void 0 : ne.length) ?? 0, te = I && Q > 1 ? `${Q} values × ${((ce = De(a, I)) == null ? void 0 : ce.label) ?? "this split"} — one series per value per group.` : void 0, U = u.hasLegend, oe = (p.y ?? [])[0], me = (F) => {
    var A, K, H, G;
    if (!F) return;
    const x = (A = s.mapping) == null ? void 0 : A.series;
    return (x && x.mode === "measures" ? (H = (K = x.meta) == null ? void 0 : K[F]) == null ? void 0 : H.label : void 0) ?? ((G = De(a, F)) == null ? void 0 : G.label);
  }, le = (F) => {
    var S, A, K, H;
    const x = (G, J) => J ? /* @__PURE__ */ l(ov, { spec: e, update: o, axis: G, title: "Title", auto: me(J) }) : null;
    switch (F) {
      case "y":
        return x("y", oe);
      // the single value axis
      case "x":
        return x("x", (A = (S = s.mapping) == null ? void 0 : S.category) == null ? void 0 : A.member);
      case "sy":
        return x("y", (K = p.sy) == null ? void 0 : K[0]);
      // scatter Y axis
      case "sx":
        return x("x", (H = p.sx) == null ? void 0 : H[0]);
      // scatter X axis
      default:
        return null;
    }
  }, he = (F, x) => /* @__PURE__ */ l(
    Zv,
    {
      spec: e,
      update: o,
      well: F,
      placed: p[F.id] ?? [],
      allPlaced: C,
      optionFor: (S) => De(a, S),
      colorFor: (S) => O[S],
      scope: w,
      blockReason: (S) => j(F.id, S),
      onAdd: (S, A) => _(F.id, S, A),
      swapFor: (S) => B(F.id, S),
      badge: F.id === "y" ? z : void 0,
      orientation: x,
      note: F.id === "color" ? te : void 0,
      control: le(F.id)
    },
    F.id
  ), pe = () => {
    var A;
    const F = k.get("value"), x = (p.value ?? []).length > 0, S = s.familyOptions ?? {};
    return /* @__PURE__ */ y(ve, { children: [
      /* @__PURE__ */ y("div", { className: "cv-edit-kpi-value", children: [
        F ? he(F, "vertical") : null,
        x ? /* @__PURE__ */ l(
          xr,
          {
            label: "Time, range & display",
            summary: S.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(eb, { spec: e, update: o })
          }
        ) : null
      ] }),
      x ? /* @__PURE__ */ y(ve, { children: [
        /* @__PURE__ */ l(
          xr,
          {
            label: "Comparison",
            summary: S.comparison === void 0 ? "None" : S.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(tb, { spec: e, update: o })
          }
        ),
        /* @__PURE__ */ l(
          xr,
          {
            label: "Trend",
            summary: tg(
              (A = S.sparkline) == null ? void 0 : A.granularity
            ),
            children: /* @__PURE__ */ l(nb, { spec: e, update: o })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ y("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ y("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !N || d ? /* @__PURE__ */ l(Rv, { spec: e, update: o }) : null,
      /* @__PURE__ */ y("div", { className: "cv-edit-overlay-actions", children: [
        C.length > 0 && w.sourceCube ? /* @__PURE__ */ y(
          "span",
          {
            className: "cv-edit-anchor",
            title: w.sourceCube.grain ?? w.sourceCube.title,
            children: [
              /* @__PURE__ */ l(lo, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: w.sourceCube.title }),
              w.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: w.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(rv, { spec: e, update: o, cube: v, scopeCubes: R, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ y("div", { className: "cv-edit-overlay-body", children: [
      W.length > 0 ? /* @__PURE__ */ l("div", { className: D("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? pe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        W.map((F) => he(F, "vertical"))
      ) }) : null,
      /* @__PURE__ */ y("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ y("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Mv, { spec: e, update: o, empty: N && !d })
        ] }),
        V.length > 0 ? /* @__PURE__ */ y("div", { className: "cv-edit-overlay-bottom", children: [
          V.map((F) => he(F, "horizontal")),
          U && !N ? /* @__PURE__ */ l(sv, { spec: e, update: o }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function ab(e, t) {
  const n = Vs(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function sl(e, t) {
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
function Mr(e) {
  const t = No.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function ib({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = b.useState(() => ({
    spec: e,
    issues: Mr(e)
  })), [i, o] = b.useState(e);
  b.useEffect(() => {
    a({ spec: e, issues: Mr(e) }), o(e);
  }, [e]);
  const s = sl((v) => t(v), n), c = r.spec, u = r.issues, d = u.length === 0, m = b.useCallback(
    (v) => {
      const h = Mr(v);
      a({ spec: v, issues: h }), h.length === 0 && (o(v), s(v));
    },
    [s]
  );
  return { draft: c, issues: u, valid: d, committed: i, update: m };
}
const ob = () => {
};
function sb({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = dt(), { draft: s, issues: c, valid: u, committed: d, update: m } = ib({
    spec: e,
    onChange: t ?? ob,
    debounceMs: r
  }), v = o.get(s.chart.family), h = (v == null ? void 0 : v.queryless) ?? !1, f = d, p = (L) => {
    var j, z, O;
    return (((j = L == null ? void 0 : L.measures) == null ? void 0 : j.length) ?? 0) > 0 || (((z = L == null ? void 0 : L.dimensions) == null ? void 0 : z.length) ?? 0) > 0 || (((O = L == null ? void 0 : L.timeDimensions) == null ? void 0 : O.some((_) => typeof _.granularity == "string")) ?? !1);
  }, k = (L) => {
    var j;
    return (((j = L == null ? void 0 : L.measures) == null ? void 0 : j.length) ?? 0) > 0;
  }, w = (v == null ? void 0 : v.requiresMeasure) ?? s.chart.family !== "table", C = h || p(s.query) && p(f.query) && (!w || k(s.query) && k(f.query)), R = w && !k(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = b.useCallback(
    (L) => {
      m({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...L }
        }
      });
    },
    [s, m]
  ), M = C ? /* @__PURE__ */ l(
    Ia,
    {
      query: f.query ?? {},
      chart: f.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: R }) }), T = n ? /* @__PURE__ */ y(ee, { size: "sm", disabled: !u, onClick: () => n(d), children: [
    /* @__PURE__ */ l(mo, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "chart-editor",
      className: D("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ y(Gn, { variant: "destructive", children: [
          /* @__PURE__ */ l(ma, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(Yn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Qn, { children: /* @__PURE__ */ y("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((L, j) => /* @__PURE__ */ y("li", { children: [
              L.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: L.path }) : null,
              " ",
              L.message
            ] }, j)),
            c.length > 3 ? /* @__PURE__ */ y("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(ur, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(rb, { spec: s, update: m, toolbar: T, children: M }) }) })
      ]
    }
  );
}
function lb({
  name: e,
  onNameChange: t,
  onToggleVariables: n,
  variablesOpen: r,
  variableCount: a,
  onUndo: i,
  onRedo: o,
  canUndo: s,
  canRedo: c,
  undoLabel: u,
  redoLabel: d,
  onDiscard: m,
  discardDisabled: v,
  onSave: h,
  saveDisabled: f,
  className: p
}) {
  const k = i || o, [w, C] = b.useState(!1);
  b.useEffect(() => {
    if (!w) return;
    const T = setTimeout(() => C(!1), 1600);
    return () => clearTimeout(T);
  }, [w]), b.useEffect(() => {
    f || C(!1);
  }, [f]);
  const R = () => {
    h == null || h(), C(!0);
  }, N = u ? `Undo ${u}` : "Undo", M = d ? `Redo ${d}` : "Redo";
  return /* @__PURE__ */ y("div", { "data-slot": "editor-toolbar", className: D("cv-editor-toolbar", p), children: [
    /* @__PURE__ */ l(
      ke,
      {
        value: e,
        placeholder: "Untitled dashboard",
        "aria-label": "Dashboard name",
        onChange: (T) => t(T.target.value),
        className: "cv-editor-toolbar-name"
      }
    ),
    n ? /* @__PURE__ */ l("div", { className: "cv-editor-toolbar-group", children: /* @__PURE__ */ y(
      ee,
      {
        variant: r ? "secondary" : "outline",
        size: "sm",
        onClick: n,
        "aria-pressed": r,
        className: D(r && "cv-editor-toolbar-variables--on"),
        children: [
          /* @__PURE__ */ l(rc, {}),
          " Variables",
          a ? /* @__PURE__ */ l("span", { className: "cv-editor-toolbar-badge", children: a }) : null
        ]
      }
    ) }) : null,
    /* @__PURE__ */ y("div", { className: "cv-editor-toolbar-actions", children: [
      k ? /* @__PURE__ */ y(ve, { children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            onClick: i,
            disabled: !s,
            "aria-label": N,
            title: N,
            children: /* @__PURE__ */ l(ac, {})
          }
        ),
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            onClick: o,
            disabled: !c,
            "aria-label": M,
            title: M,
            children: /* @__PURE__ */ l(ic, {})
          }
        )
      ] }) : null,
      m ? /* @__PURE__ */ y(
        ee,
        {
          variant: "ghost",
          size: "sm",
          onClick: m,
          disabled: v,
          className: "cv-editor-toolbar-discard",
          children: [
            /* @__PURE__ */ l(oc, {}),
            " Discard"
          ]
        }
      ) : null,
      h ? /* @__PURE__ */ y(
        ee,
        {
          size: "sm",
          onClick: R,
          disabled: f,
          "aria-live": "polite",
          className: D(
            // Keep the confirmation vivid even though the button is (correctly) disabled
            // right after a save — there's nothing left to save.
            w && "cv-editor-toolbar-save--saved"
          ),
          children: [
            w ? /* @__PURE__ */ l(Wt, {}) : /* @__PURE__ */ l(mo, {}),
            " ",
            w ? "Saved" : "Save"
          ]
        }
      ) : null
    ] })
  ] });
}
const ll = "lg", mr = 12;
function cb(e, t) {
  const n = t[ll];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function ub(e, t) {
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
const cl = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function mb(e, t, n, r = mr) {
  const a = cl[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function db(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? mr) {
  const a = mb(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function fb(e, t, n, r = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? mr) {
  const i = cl[t.type], o = Math.min(i.w, r), s = {
    i: t.id,
    x: 0,
    y: n,
    w: o,
    h: i.h,
    minW: Math.min(i.minW, o),
    minH: i.minH
  }, c = e.layout.map((u) => u.y >= n ? { ...u, y: u.y + i.h } : u);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...c, s]
  };
}
function hb(e) {
  const t = /* @__PURE__ */ new Set([0]);
  for (const n of e) t.add(n.y + n.h);
  return [...t].filter((n) => !e.some((r) => r.y < n && r.y + r.h > n)).sort((n, r) => n - r);
}
const pb = 900, gb = 0.4;
function vb(e, t) {
  const n = (e == null ? void 0 : e.cols) ?? mr, r = (e == null ? void 0 : e.rowHeight) ?? 40, a = (e == null ? void 0 : e.margin) ?? [12, 12], i = (e == null ? void 0 : e.containerPadding) ?? [0, 0], o = Math.max(gb, Math.min(1, t / pb)), s = Math.round(o / 0.05) * 0.05;
  return {
    cols: n,
    rowHeight: Math.max(8, Math.round(r * s)),
    margin: [Math.round(a[0] * s), Math.round(a[1] * s)],
    containerPadding: [
      Math.round(i[0] * s),
      Math.round(i[1] * s)
    ],
    scale: s
  };
}
function bb(e, t) {
  const n = t.containerPadding[1] + e * (t.rowHeight + t.margin[1]) - t.margin[1] / 2;
  return Math.max(0, n);
}
function yb(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return db(e, a);
}
function kb(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function wb(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Cb = 10, ul = [
  { kind: "chart", label: "Chart", Icon: io },
  { kind: "text", label: "Text", Icon: uo },
  { kind: "input", label: "Input", Icon: sc }
];
function Nb({
  rows: e,
  metrics: t,
  containerRef: n,
  onInsert: r,
  disabled: a
}) {
  const [i, o] = b.useState(null), [s, c] = b.useState(null), u = b.useMemo(
    () => e.map((m) => ({ row: m, top: bb(m, t) })),
    [e, t]
  ), d = b.useRef(u);
  return d.current = u, b.useEffect(() => {
    const m = n.current;
    if (!m || a) return;
    const v = (f) => {
      const p = m.getBoundingClientRect(), k = f.clientY - p.top;
      let w = null, C = Cb;
      for (const { row: R, top: N } of d.current) {
        const M = Math.abs(k - N);
        M <= C && (w = R, C = M);
      }
      o(w);
    }, h = () => o(null);
    return m.addEventListener("pointermove", v), m.addEventListener("pointerleave", h), () => {
      m.removeEventListener("pointermove", v), m.removeEventListener("pointerleave", h);
    };
  }, [n, a]), b.useEffect(() => {
    a && (o(null), c(null));
  }, [a]), a ? null : /* @__PURE__ */ l("div", { "aria-hidden": !1, "data-slot": "insert-lines", className: "cv-insert-lines", children: u.map(({ row: m, top: v }) => {
    const h = s === m || i === m;
    return /* @__PURE__ */ y(
      "div",
      {
        style: { top: v },
        className: D("cv-insert-line", h && "cv-insert-line--active"),
        children: [
          /* @__PURE__ */ l("span", { className: "cv-insert-line-rule" }),
          /* @__PURE__ */ y(
            Pe,
            {
              open: s === m,
              onOpenChange: (f) => c(f ? m : null),
              children: [
                /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Insert a widget at row ${m}`,
                    tabIndex: h ? 0 : -1,
                    className: "cv-insert-line-button",
                    children: /* @__PURE__ */ l(Nt, {})
                  }
                ) }),
                /* @__PURE__ */ l(Ve, { align: "center", side: "bottom", className: "cv-insert-menu", children: ul.map(({ kind: f, label: p, Icon: k }) => /* @__PURE__ */ y(
                  "button",
                  {
                    type: "button",
                    className: "cv-insert-menu-item",
                    onClick: () => {
                      c(null), o(null), r(f, m);
                    },
                    children: [
                      /* @__PURE__ */ l(k, {}),
                      p
                    ]
                  },
                  f
                )) })
              ]
            }
          )
        ]
      },
      m
    );
  }) });
}
function Sb({
  onInsert: e
}) {
  return /* @__PURE__ */ y("div", { "data-slot": "editor-empty", className: "cv-editor-empty", children: [
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-title", children: "This dashboard is empty" }),
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-hint", children: "Add a widget to start — later ones drop in wherever you point on the canvas." }),
    /* @__PURE__ */ l("div", { className: "cv-editor-empty-tiles", children: ul.map(({ kind: t, label: n, Icon: r }) => /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        className: "cv-editor-empty-tile",
        onClick: () => e(t),
        children: [
          /* @__PURE__ */ l(r, {}),
          n
        ]
      },
      t
    )) })
  ] });
}
function xb(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Mb({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o,
  onInsert: s
}) {
  const [c, u] = ss(), d = b.useRef(null), m = b.useCallback(
    (O) => {
      d.current = O, c(O);
    },
    [c]
  ), v = b.useMemo(() => vb(e.grid, u), [e.grid, u]), { cols: h, rowHeight: f } = v, p = v.margin, k = v.containerPadding, [w, C] = b.useState(!1), R = b.useMemo(() => hb(e.layout), [e.layout]), N = b.useMemo(
    () => ({ [ll]: xb(e.layout) }),
    [e.layout]
  ), M = b.useMemo(
    () => new Map(e.widgets.map((O) => [O.id, O])),
    [e.widgets]
  ), T = b.useRef(o);
  b.useEffect(() => {
    T.current = o;
  }, [o]);
  const L = b.useRef(e.layout);
  b.useEffect(() => {
    L.current = e.layout;
  }, [e.layout]);
  const j = b.useRef(null), z = b.useCallback(
    (O, _) => {
      const E = cb(O, _).map((W) => ({ ...W }));
      Rb(L.current, E) || T.current(E);
    },
    []
  );
  return /* @__PURE__ */ l(Fa, { spec: e, children: /* @__PURE__ */ y("div", { ref: m, className: "cv-editor-canvas", children: [
    u > 0 && s && e.widgets.length === 0 ? /* @__PURE__ */ l(Sb, { onInsert: (O) => s(O, 0) }) : null,
    u > 0 ? /* @__PURE__ */ l(
      ho,
      {
        width: u,
        layouts: N,
        breakpoints: { lg: 0 },
        cols: { lg: h },
        rowHeight: f,
        margin: p,
        containerPadding: k,
        dragConfig: { enabled: !0, handle: `.${$n}` },
        resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
        onLayoutChange: z,
        onDragStart: () => C(!0),
        onDragStop: () => C(!1),
        onResizeStart: () => C(!0),
        onResizeStop: () => C(!1),
        children: e.layout.map((O) => {
          const _ = M.get(O.i);
          if (!_) return null;
          const B = _.id === t;
          return (
            // Selecting = a click that bubbles up from anywhere in the widget;
            // RGL's drag (mousedown on the chrome header handle) wins for drags,
            // so we don't need a blocking overlay that would also block dragging.
            /* @__PURE__ */ y(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Select ${_.title ?? _.type}`,
                "aria-pressed": B,
                onPointerDown: (E) => {
                  j.current = { x: E.clientX, y: E.clientY };
                },
                onClick: (E) => {
                  const W = j.current;
                  W && Math.hypot(E.clientX - W.x, E.clientY - W.y) > 5 || n(_.id);
                },
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), n(_.id));
                },
                className: D(
                  "cv-editor-widget",
                  // Idle = no chrome at all; hover paints a faint 1px ring so the
                  // hover target (and its action cluster) is obvious, and the
                  // SELECTED widget keeps the strong ring.
                  B && "cv-editor-widget--selected"
                ),
                children: [
                  /* @__PURE__ */ l(qr, { widget: _, editable: !0 }),
                  /* @__PURE__ */ l("div", { "aria-hidden": !0, className: D($n, "cv-editor-widget-drag-layer") }),
                  /* @__PURE__ */ y("div", { className: "cv-editor-widget-actions", children: [
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Edit ${_.title ?? _.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), r(_.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(lc, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Duplicate ${_.title ?? _.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), a(_.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(cc, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Delete ${_.title ?? _.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), i(_.id);
                        },
                        className: D("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                        children: /* @__PURE__ */ l(Kt, {})
                      }
                    )
                  ] })
                ]
              },
              O.i
            )
          );
        })
      }
    ) : null,
    u > 0 && s && e.widgets.length > 0 ? /* @__PURE__ */ l(
      Nb,
      {
        rows: R,
        metrics: v,
        containerRef: d,
        onInsert: s,
        disabled: w
      }
    ) : null
  ] }) });
}
function Rb(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Tb = b.memo(Mb);
function Ob(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function _b({
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
  const a = po({
    extensions: [vo],
    editable: !0,
    content: Ob(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: D(ls, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(fe, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ y("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Ab, { editor: a }),
    /* @__PURE__ */ l(go, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function Ze({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: D("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function Ab({ editor: e }) {
  const [, t] = b.useReducer((n) => n + 1, 0);
  return b.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(uc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(mc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(dc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(fc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(hc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(pc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(gc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(vc, {})
          }
        )
      ]
    }
  );
}
const Db = fa(
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
function Eb({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: D(Db({ variant: t }), e), ...n });
}
function Lb({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = ft(), c = b.useMemo(() => cr(o), [o]), u = c.filter((v) => v.type === "view"), d = c.find((v) => v.name === e), m = b.useMemo(() => {
    const v = c.filter((k) => k.type === "cube"), h = v.some((k) => k.category), f = [], p = /* @__PURE__ */ new Map();
    for (const k of v) {
      const w = k.category ?? (h ? "More tables" : "Tables");
      p.has(w) || (p.set(w, []), f.push(w)), p.get(w).push(k);
    }
    return f.sort((k, w) => k === "More tables" ? 1 : w === "More tables" ? -1 : k.localeCompare(w)), f.map((k) => ({ label: k, items: p.get(k) }));
  }, [c]);
  return /* @__PURE__ */ y(Le, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Ie, { id: a, className: i, children: /* @__PURE__ */ l(Fe, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(Rr, { option: d }) : void 0 }) }),
    /* @__PURE__ */ y($e, { children: [
      u.length > 0 ? /* @__PURE__ */ y(Kr, { children: [
        /* @__PURE__ */ l(Br, { children: "Saved datasets" }),
        u.map((v) => /* @__PURE__ */ l(ye, { value: v.name, children: /* @__PURE__ */ l(Rr, { option: v }) }, v.name))
      ] }) : null,
      m.map((v) => /* @__PURE__ */ y(Kr, { children: [
        /* @__PURE__ */ l(Br, { children: v.label }),
        v.items.map((h) => /* @__PURE__ */ l(ye, { value: h.name, children: /* @__PURE__ */ l(Rr, { option: h }) }, h.name))
      ] }, v.label))
    ] })
  ] });
}
function Rr({ option: e }) {
  const t = e.type === "view" ? co : bc;
  return /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Eb, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const Fb = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function Ib(e) {
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
function $b({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(Ib(s));
  };
  return /* @__PURE__ */ y("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ y(
          Le,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l($e, { children: t.map((s) => /* @__PURE__ */ l(ye, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(fe, { label: "Control", children: /* @__PURE__ */ y(Le, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
      /* @__PURE__ */ l($e, { children: zc.options.map((s) => /* @__PURE__ */ l(ye, { value: s, children: Fb[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Pb, { control: r, onChange: a, variables: t })
  ] });
}
function Pb({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(zb, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(jb, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Wb, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Kb, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Bb, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Hb, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function zb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ y(ve, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          Vb,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      lt,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function Vb({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(Nn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === Nn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ y(Pe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(ut, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Ve, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Nn.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ y(
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
                className: D("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Wt, { className: "cv-ed-icon-xs" }) : null
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
function jb({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = it.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ y(ve, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ y(
          Le,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ y($e, { children: [
                /* @__PURE__ */ l(ye, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ye, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(fe, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: it.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: D("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Wb({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ y(ve, { children: [
    /* @__PURE__ */ l(
      lt,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Options",
        action: /* @__PURE__ */ y(ee, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Nt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ y("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            ke,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            ke,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            ee,
            {
              variant: "ghost",
              size: "icon",
              className: D("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(Kt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Kb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ y(ve, { children: [
    /* @__PURE__ */ l(fe, { label: "From", children: /* @__PURE__ */ y(
      Le,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
          /* @__PURE__ */ y($e, { children: [
            /* @__PURE__ */ l(ye, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(ye, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(ye, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      fe,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          Lb,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Bb({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(fe, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    ke,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function Hb({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(fe, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    ke,
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
  return /* @__PURE__ */ y(ve, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function qb(e) {
  return { schemaVersion: Et, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Ub(e) {
  const t = {
    schemaVersion: Et,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Gb(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function qi({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ y("div", { "data-slot": "widget-edit-panel", className: D("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      fe,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          ke,
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
      /* @__PURE__ */ l(Fa, { spec: qb(t), children: /* @__PURE__ */ l(qg, { createVariable: o, children: /* @__PURE__ */ l("div", { className: D(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        sb,
        {
          fill: a,
          spec: Ub(e),
          onChange: (s) => n(Gb(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(_b, { widget: e, onChange: n }) : /* @__PURE__ */ l($b, { widget: e, variables: t, onChange: n })
  ] });
}
function Yb(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Qb(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Jb(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Xb(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Zb(e, t) {
  switch (e) {
    case "chart":
      return Qb(t);
    case "text":
      return Jb(t);
    case "input":
      return Xb(t);
  }
}
function ey(e) {
  return { name: e, type: "string" };
}
function ty(e) {
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
function ny(e) {
  const t = {}, n = (r) => t[r] ?? (t[r] = { inputs: [], refs: 0 });
  for (const r of e.variables) n(r.name);
  for (const r of e.widgets) {
    if (r.type === "input") {
      const a = r.control.variable;
      a && n(a).inputs.push(r.id);
      continue;
    }
    r.type === "chart" && (Hn(r.query, (a) => void n(a.var).refs++), Hn(r.chart, (a) => void n(a.var).refs++));
  }
  return t;
}
function ry(e) {
  const t = [], n = (e == null ? void 0 : e.inputs.length) ?? 0, r = (e == null ? void 0 : e.refs) ?? 0;
  return n > 0 && t.push(`${n} input${n === 1 ? "" : "s"}`), r > 0 && t.push(`${r} quer${r === 1 ? "y" : "ies"}`), t.length > 0 ? t.join(" · ") : "Unused";
}
function ay(e, t, n) {
  if (t === n || n === "") return e;
  const r = e.variables;
  return !r.some((a) => a.name === t) || r.some((a) => a.name === n) ? e : {
    ...e,
    variables: r.map((a) => a.name === t ? { ...a, name: n } : a),
    widgets: e.widgets.map((a) => ml(a, t, () => ({ var: n }), n))
  };
}
function iy(e, t) {
  const n = e.variables.find((a) => a.name === t), r = n == null ? void 0 : n.default;
  return {
    ...e,
    variables: e.variables.filter((a) => a.name !== t),
    widgets: e.widgets.map(
      (a) => ml(a, t, () => r === void 0 ? Bn : r, "")
    )
  };
}
const Bn = Symbol("cv.removeVarRef");
function ml(e, t, n, r) {
  let a = e;
  a.type === "input" && a.control.variable === t && (a = { ...a, control: { ...a.control, variable: r } });
  const i = ia(a, t, n);
  return i === Bn ? a : i;
}
function Hn(e, t) {
  if (Ne(e)) {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (const n of e) Hn(n, t);
    return;
  }
  if (e && typeof e == "object")
    for (const n of Object.values(e)) Hn(n, t);
}
function ia(e, t, n) {
  if (Ne(e)) return e.var === t ? n(e) : e;
  if (Array.isArray(e)) {
    let r = !1;
    const a = [];
    for (const i of e) {
      const o = ia(i, t, n);
      if (o === Bn) {
        r = !0;
        continue;
      }
      o !== i && (r = !0), a.push(o);
    }
    return r ? a : e;
  }
  if (e && typeof e == "object") {
    let r = !1;
    const a = {};
    for (const [i, o] of Object.entries(e)) {
      const s = ia(o, t, n);
      if (s === Bn) {
        r = !0;
        continue;
      }
      s !== o && (r = !0), a[i] = s;
    }
    return r ? a : e;
  }
  return e;
}
const Ui = {
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
function oy({
  spec: e,
  onChange: t,
  onClose: n,
  newName: r,
  className: a
}) {
  const i = e.variables, o = b.useMemo(() => ny(e), [e]), [s, c] = b.useState(null), u = b.useRef(0), d = () => {
    if (r) return r();
    let f;
    do
      f = `var_${++u.current}`;
    while (i.some((p) => p.name === f));
    return f;
  }, m = (f, p) => t((k) => ({
    ...k,
    variables: k.variables.map((w) => w.name === f ? sy(w, p) : w)
  })), v = () => {
    const f = d();
    t((p) => ({ ...p, variables: [...p.variables, ey(f)] })), c(f);
  }, h = (f, p) => t((k) => {
    const w = k.variables.findIndex((N) => N.name === f), C = w + p;
    if (w < 0 || C < 0 || C >= k.variables.length) return k;
    const R = k.variables.slice();
    return [R[w], R[C]] = [R[C], R[w]], { ...k, variables: R };
  });
  return /* @__PURE__ */ y(
    "aside",
    {
      "data-slot": "variables-dock",
      "aria-label": "Dashboard variables",
      className: D("cv-variables-dock", a),
      children: [
        /* @__PURE__ */ y("div", { className: "cv-variables-dock-header", children: [
          /* @__PURE__ */ y("span", { className: "cv-variables-dock-title", children: [
            "Variables",
            i.length > 0 ? /* @__PURE__ */ l("span", { className: "cv-variables-dock-count", children: i.length }) : null
          ] }),
          /* @__PURE__ */ y("div", { className: "cv-variables-dock-header-actions", children: [
            /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", onClick: v, children: [
              /* @__PURE__ */ l(Nt, {}),
              " Add variable"
            ] }),
            n ? /* @__PURE__ */ l(
              ee,
              {
                variant: "ghost",
                size: "icon",
                className: "cv-ed-btn-7",
                "aria-label": "Close variables",
                onClick: n,
                children: /* @__PURE__ */ l(_r, {})
              }
            ) : null
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-variables-dock-body", children: i.length === 0 ? /* @__PURE__ */ y("div", { className: "cv-variables-empty", children: [
          /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
          /* @__PURE__ */ y("p", { className: "cv-variables-empty-hint", children: [
            "Variables bind input controls and resolve ",
            "{var}",
            " tokens in queries."
          ] }),
          /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: v, children: [
            /* @__PURE__ */ l(Nt, {}),
            " Add variable"
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: i.map((f, p) => /* @__PURE__ */ l(
          ly,
          {
            decl: f,
            index: p,
            total: i.length,
            usage: o[f.name],
            takenNames: i.filter((k, w) => w !== p).map((k) => k.name),
            autoFocusName: s === f.name,
            onNameCommitted: () => c(null),
            onRename: (k) => t((w) => ay(w, f.name, k)),
            onPatch: (k) => m(f.name, k),
            onRemove: () => t((k) => iy(k, f.name)),
            onMove: (k) => h(f.name, k)
          },
          f.name || `unnamed-${p}`
        )) }) })
      ]
    }
  );
}
function sy(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = ty(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function ly({
  decl: e,
  index: t,
  total: n,
  usage: r,
  takenNames: a,
  autoFocusName: i,
  onNameCommitted: o,
  onRename: s,
  onPatch: c,
  onRemove: u,
  onMove: d
}) {
  const [m, v] = b.useState(!0), h = b.useId(), [f, p] = b.useState(e.name);
  b.useEffect(() => p(e.name), [e.name]);
  const k = f.trim(), w = k === "" ? "Name required" : a.includes(k) && k !== e.name ? "Name already used" : void 0, C = () => {
    if (w || k === e.name) {
      if (w) return;
      o();
      return;
    }
    s(k), o();
  }, R = ((r == null ? void 0 : r.inputs.length) ?? 0) + ((r == null ? void 0 : r.refs) ?? 0), [N, M] = b.useState(!1);
  return b.useEffect(() => {
    if (!N) return;
    const T = setTimeout(() => M(!1), 5e3);
    return () => clearTimeout(T);
  }, [N]), /* @__PURE__ */ y("div", { "data-slot": "variable-row", className: "cv-variable-row", children: [
    /* @__PURE__ */ y("div", { className: "cv-variable-row-header", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": m ? "Collapse variable" : "Expand variable",
          "aria-expanded": m,
          onClick: () => v((T) => !T),
          className: "cv-variable-row-toggle",
          children: m ? /* @__PURE__ */ l(ut, {}) : /* @__PURE__ */ l(Un, {})
        }
      ),
      /* @__PURE__ */ l(
        ke,
        {
          value: f,
          placeholder: "variable_name",
          "aria-label": "Variable name",
          "aria-invalid": w ? !0 : void 0,
          autoFocus: i,
          onChange: (T) => p(T.target.value),
          onBlur: C,
          onKeyDown: (T) => {
            T.key === "Enter" ? (T.preventDefault(), C()) : T.key === "Escape" && p(e.name);
          },
          className: "cv-variable-row-name"
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Ui[e.type] }),
      /* @__PURE__ */ y("div", { className: "cv-variable-row-actions", children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            className: D("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable up",
            disabled: t === 0,
            onClick: () => d(-1),
            children: /* @__PURE__ */ l(ca, {})
          }
        ),
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            className: D("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable down",
            disabled: t === n - 1,
            onClick: () => d(1),
            children: /* @__PURE__ */ l(ua, {})
          }
        )
      ] })
    ] }),
    w ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: w }) : null,
    m ? /* @__PURE__ */ y("div", { className: "cv-variable-row-body", children: [
      /* @__PURE__ */ l(fe, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ y(Le, { value: e.type, onValueChange: (T) => c({ type: T }), children: [
        /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
        /* @__PURE__ */ l($e, { children: wo.options.map((T) => /* @__PURE__ */ l(ye, { value: T, children: Ui[T] }, T)) })
      ] }) }),
      /* @__PURE__ */ l(
        fe,
        {
          label: "Label",
          htmlFor: h,
          hint: "Optional human label for controls.",
          className: "cv-ed-row-tight",
          children: /* @__PURE__ */ l(
            ke,
            {
              id: h,
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (T) => c({ label: T.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ l(
        lt,
        {
          label: "Array",
          hint: "Holds multiple values (multi-select).",
          checked: e.array ?? !1,
          onChange: (T) => c({ array: T })
        }
      ),
      /* @__PURE__ */ l(cy, { decl: e, onChange: (T) => c({ default: T }) }),
      /* @__PURE__ */ y("div", { className: "cv-variable-row-usage", children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: D(
              "cv-variable-row-usage-text",
              R === 0 && "cv-variable-row-usage-text--none"
            ),
            children: R === 0 ? "Unused" : `Used by ${ry(r)}`
          }
        ),
        /* @__PURE__ */ y(
          ee,
          {
            variant: "ghost",
            size: "sm",
            className: D("cv-ed-muted", "cv-ed-hover-danger", N && "cv-ed-danger"),
            onClick: () => {
              if (R > 0 && !N) {
                M(!0);
                return;
              }
              u();
            },
            children: [
              /* @__PURE__ */ l(Kt, {}),
              N ? `Remove (in use by ${R})` : "Remove"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
}
function cy({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(lt, { label: "Default", checked: e.default === !0, onChange: (i) => t(i) });
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(fe, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      ke,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : uy(e.default);
  return /* @__PURE__ */ l(fe, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    ke,
    {
      id: n,
      value: a,
      placeholder: my(e.type),
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
function uy(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function my(e) {
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
function Zy({
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
  canRedo: d,
  undoLabel: m,
  redoLabel: v,
  onDiscard: h,
  families: f,
  onCreateChart: p,
  openWidgetId: k,
  className: w
}) {
  var Oe, We;
  const [C, R] = b.useState(e), [N, M] = b.useState(e);
  b.useEffect(() => {
    R(e), M(e);
  }, [e]);
  const [T, L] = b.useState(null), j = b.useRef(0), [z, O] = b.useState(null), [_, B] = b.useState(!1), E = b.useRef(T), W = b.useRef(z), V = b.useRef(C);
  b.useEffect(() => {
    E.current = T, W.current = z, V.current = C;
  });
  const I = b.useRef(null);
  I.current === null && (I.current = i ?? Yb());
  const Q = i ?? I.current, te = sl(
    ($, Y) => r == null ? void 0 : r($, Y),
    o
  ), U = b.useCallback(
    ($, Y) => {
      j.current = Date.now(), R((X) => {
        const Ce = $(X);
        return te(Ce, Y), Ce;
      });
    },
    [te]
  ), oe = b.useRef(/* @__PURE__ */ new Map()), me = b.useCallback(($, Y) => `${$}:${Y}:${oe.current.get(Y) ?? 0}`, []), le = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === le.current) return;
    const $ = 500;
    let Y = null;
    const X = () => {
      var Ye;
      const Ce = Date.now() - j.current;
      if (Ce < $) {
        Y = setTimeout(X, $ - Ce);
        return;
      }
      le.current = t;
      const _e = /* @__PURE__ */ new Set();
      ((Ye = W.current) == null ? void 0 : Ye.kind) === "widget" && _e.add(W.current.id), E.current && _e.add(E.current);
      const Rt = fy(t, V.current, _e);
      R(Rt), n == null || n(Rt);
    };
    return X(), () => {
      Y && clearTimeout(Y);
    };
  }, [t]);
  const he = b.useCallback(
    ($, Y) => {
      if ($ === "chart" && p) {
        p();
        return;
      }
      const X = Zb($, Q());
      U((Ce) => fb(Ce, X, Y), {
        kind: "add",
        widgetId: X.id,
        label: `add ${$}`
      }), L(X.id), $ === "chart" && O({ kind: "widget", id: X.id });
    },
    [U, Q, p]
  ), pe = b.useRef(void 0);
  b.useEffect(() => {
    !k || pe.current === k || C.widgets.some(($) => $.id === k) && (pe.current = k, L(k), O({ kind: "widget", id: k }));
  }, [k, C.widgets]);
  const P = b.useCallback(($) => L($), []), ne = b.useCallback(($) => {
    L($), O({ kind: "widget", id: $ });
  }, []), ce = b.useCallback(
    ($) => {
      U((Y) => kb(Y, $), {
        kind: "remove",
        widgetId: $,
        label: `delete "${kn(V.current.widgets.find((Y) => Y.id === $))}"`
      }), L((Y) => Y === $ ? null : Y), O((Y) => (Y == null ? void 0 : Y.id) === $ ? null : Y);
    },
    [U]
  ), F = b.useCallback(
    ($) => {
      const Y = Q();
      U((X) => yb(X, $, Y), {
        kind: "duplicate",
        widgetId: Y,
        label: `duplicate "${kn(V.current.widgets.find((X) => X.id === $))}"`
      }), L(Y);
    },
    [U, Q]
  ), x = b.useCallback(
    ($) => {
      const Y = $.type === "text" ? "text" : "widget";
      U((X) => wb(X, $), {
        kind: Y,
        widgetId: $.id,
        label: `edit "${kn($)}"`,
        coalesceKey: me(Y, $.id)
      });
    },
    [U, me]
  ), S = b.useCallback(
    ($) => U(
      (Y) => {
        const X = ub(Y.layout, $);
        return dy(Y.layout, X) ? Y : { ...Y, layout: X };
      },
      { kind: "layout", label: "layout change" }
    ),
    [U]
  ), A = b.useCallback(
    ($) => U((Y) => ({ ...Y, name: $ || void 0 }), {
      kind: "name",
      label: "rename dashboard",
      // Every keystroke is one commit; the host folds them into one undo step.
      coalesceKey: "name"
    }),
    [U]
  ), K = b.useCallback(
    ($) => U((Y) => ({ ...Y, variables: $ }), {
      kind: "variables",
      label: "edit variables",
      coalesceKey: "variables"
    }),
    [U]
  ), H = b.useCallback(
    ($) => U($, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
    [U]
  ), G = b.useDeferredValue(C), J = b.useMemo(
    () => Lr.safeParse(G),
    [G]
  ), we = b.useCallback(() => {
    const $ = Lr.safeParse(C);
    $.success && (a == null || a($.data), M(C));
  }, [C, a]), ge = C !== N, q = z ? C.widgets.find(($) => $.id === z.id) ?? null : null;
  b.useEffect(() => {
    z && !C.widgets.some(($) => $.id === z.id) && O(null);
  }, [z, C.widgets]);
  const se = b.useCallback(() => {
    O(($) => ($ && oe.current.set($.id, (oe.current.get($.id) ?? 0) + 1), null));
  }, []), ue = q ? kn(q) : "";
  return /* @__PURE__ */ l(La, { families: f, children: /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((We = (Oe = C.grid) == null ? void 0 : Oe.margin) == null ? void 0 : We[0]) ?? 12 },
      className: D("cv-dashboard-editor", w),
      children: [
        /* @__PURE__ */ l(
          lb,
          {
            name: C.name ?? "",
            onNameChange: A,
            onToggleVariables: () => B(($) => !$),
            variablesOpen: _,
            variableCount: C.variables.length,
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: d,
            undoLabel: m,
            redoLabel: v,
            onDiscard: h,
            discardDisabled: !ge,
            onSave: a ? we : void 0,
            saveDisabled: !J.success || !ge,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        J.success ? null : /* @__PURE__ */ y("p", { className: "cv-dashboard-editor-validation", children: [
          J.error.issues.length,
          " validation issue",
          J.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ y("div", { className: "cv-dashboard-editor-body", children: [
          /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: z ? null : /* @__PURE__ */ l(
            Tb,
            {
              spec: C,
              selectedId: T,
              onSelect: P,
              onEdit: ne,
              onDuplicate: F,
              onDelete: ce,
              onLayoutChange: S,
              onInsert: he
            }
          ) }),
          _ && !z ? /* @__PURE__ */ l(
            oy,
            {
              spec: C,
              onChange: H,
              onClose: () => B(!1)
            }
          ) : null
        ] }),
        z ? /* @__PURE__ */ y(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": ue,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ y("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ y("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ y(ee, { variant: "ghost", size: "sm", onClick: se, children: [
                    /* @__PURE__ */ l(da, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: ue })
                ] }),
                q ? /* @__PURE__ */ y(
                  ee,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => ce(q.id),
                    children: [
                      /* @__PURE__ */ l(Kt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(ur, { label: ue, resetKey: C, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: (q == null ? void 0 : q.type) === "chart" ? /* @__PURE__ */ l(
                qi,
                {
                  fill: !0,
                  widget: q,
                  variables: C.variables,
                  onChange: x,
                  onVariablesChange: K
                }
              ) : q ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                qi,
                {
                  widget: q,
                  variables: C.variables,
                  onChange: x,
                  onVariablesChange: K
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function kn(e) {
  if (!e) return "widget";
  if (e.title) return e.title;
  const t = e.type;
  return `${t[0].toUpperCase()}${t.slice(1)} widget`;
}
function dy(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function fy(e, t, n) {
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
  It as AUTO_GRANULARITY,
  Yu as AreaChartFamily,
  _u as AreaFamilyOptionsSchema,
  Lc as AxesOptionsSchema,
  oi as AxisOptionsSchema,
  jy as BUILTIN_CHART_FAMILIES,
  Je as BUILTIN_DEFAULTS,
  Qe as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Uu as BarChartFamily,
  Tu as BarFamilyOptionsSchema,
  ll as CANONICAL_BREAKPOINT,
  ot as ChartColorTokenSchema,
  rb as ChartEditOverlay,
  sb as ChartEditor,
  Oc as ChartFamilySchema,
  ka as ChartInteractionProvider,
  ko as ChartOptionsSchema,
  Go as ChartRenderer,
  No as ChartSpecSchema,
  $c as ChartTransformSchema,
  Jy as ChartView,
  jc as ChartWidgetSchema,
  Fc as ColorAssignmentSchema,
  Fu as CondFormatRuleSchema,
  Ia as CubeChart,
  yh as CubeChartSpec,
  yo as CubeQuerySchema,
  ar as CubeVizContext,
  Gy as CubeVizProvider,
  er as DEFAULT_COLOR_RAMP,
  mr as DEFAULT_COLS,
  cl as DEFAULT_FOOTPRINT,
  bi as DEFAULT_MARK_THEME,
  wn as DEFAULT_TRANSFORM_WINDOW,
  Wr as DEFAULT_UNIT_CONVERSIONS,
  $n as DRAG_HANDLE_CLASS,
  Qy as Dashboard,
  Zy as DashboardEditor,
  Fa as DashboardProvider,
  Lr as DashboardSpecSchema,
  Dr as DateRangeSchema,
  Pu as EMPTY_FAMILY_DEFAULT,
  ui as EM_DASH,
  Tb as EditorCanvas,
  lb as EditorToolbar,
  La as FamilyRegistryOverride,
  Qg as FilterBuilder,
  xc as FilterOperatorSchema,
  _c as FormatKindSchema,
  ha as FormatOptionsSchema,
  gu as GRANULARITY_PATTERN,
  Sc as GranularityChoiceSchema,
  it as GranularitySchema,
  qc as GridConfigSchema,
  om as HeatmapChartFamily,
  $u as HeatmapFamilyOptionsSchema,
  zc as InputControlKindSchema,
  Vc as InputControlSchema,
  $b as InputWidgetEditor,
  Kc as InputWidgetSchema,
  zh as InputWidgetView,
  Nb as InsertLines,
  cm as KpiFamily,
  Eu as KpiFamilyOptionsSchema,
  Hc as LayoutItemSchema,
  Mc as LeafFilterSchema,
  Dc as LegendOptionsSchema,
  Gu as LineChartFamily,
  Ou as LineFamilyOptionsSchema,
  de as MemberSchema,
  ai as OrderDirSchema,
  Tc as OrderSpecSchema,
  Xu as PieChartFamily,
  Au as PieFamilyOptionsSchema,
  Er as QueryFilterSchema,
  Jn as ReferenceLineOptSchema,
  qr as RenderWidget,
  Et as SCHEMA_VERSION,
  Nc as ScalarSchema,
  em as ScatterChartFamily,
  Du as ScatterFamilyOptionsSchema,
  Ac as SeriesMappingSchema,
  ii as SeriesMetaSchema,
  So as SpecSchema,
  Lu as TableColumnOptSchema,
  Cm as TableFamily,
  Iu as TableFamilyOptionsSchema,
  _b as TextWidgetEditor,
  Wc as TextWidgetSchema,
  wh as TextWidgetView,
  Rc as TimeDimensionSchema,
  Pc as TipTapDocSchema,
  Ec as TooltipOptionsSchema,
  Ic as TransformKindSchema,
  Dn as VarRefSchema,
  Uc as VariableDeclSchema,
  wo as VariableTypeSchema,
  bo as VariableValueSchema,
  oy as VariablesDock,
  hs as WidgetChrome,
  qi as WidgetEditPanel,
  Bc as WidgetSpecSchema,
  Xy as adaptiveGranularity,
  db as appendWidget,
  Vm as areaChartFamily,
  ki as assignColors,
  Ea as autoGranularityFor,
  eh as axisKey,
  Pm as barChartFamily,
  _a as buildFamilyRegistry,
  Uy as builtinCharts,
  Ge as builtinFamilyDescriptors,
  Zn as builtinFamilyRegistry,
  Ts as canonicalTimeOf,
  hg as collapseFamilies,
  du as createCubeClient,
  Yb as createIdFactory,
  es as createQueryResolver,
  ns as createUnitsFormatter,
  yd as createVariableStore,
  bu as datePattern,
  Fr as deepMerge,
  Oa as defaultChartFamilies,
  ty as defaultForType,
  va as defaultFormatter,
  vb as editorGridMetrics,
  jn as familyKeyOf,
  fu as fetchMeta,
  at as findCube,
  De as findMember,
  Hy as formatCategory,
  nn as formatDateValue,
  og as geoPointId,
  fg as grainAggLabel,
  Jo as granularitiesForSpan,
  Xo as granularityOptionsFor,
  Km as heatmapChartFamily,
  fb as insertWidgetAtRow,
  zt as isEmptyValue,
  Ne as isVarRef,
  Bm as kpiChartFamily,
  zm as lineChartFamily,
  cr as listCubes,
  St as listMembers,
  mu as loadSpec,
  ga as looksLikeIsoDate,
  ba as makeChartFormat,
  By as makeDateFormatter,
  qy as makeFormatter,
  Va as memberAgg,
  cg as memberAggDefault,
  Sn as memberCanonicalTime,
  Wn as memberFamilyTitle,
  Rs as memberGroup,
  ub as mergeLayout,
  rr as mergeUnitConversions,
  Qb as newChartWidget,
  Xb as newInputWidget,
  Jb as newTextWidget,
  ey as newVariable,
  Zb as newWidget,
  Qo as normalize,
  ag as pathLabel,
  cb as pickCanonicalLayout,
  jm as pieChartFamily,
  mb as placeNewItem,
  nh as quantityLabel,
  Da as rangeSpanDays,
  iy as removeVariable,
  kb as removeWidget,
  ay as renameVariable,
  wb as replaceWidget,
  sh as resolveChart,
  Uo as resolveMarkTheme,
  Um as resolveOptions,
  zu as resolveOptionsWith,
  Zo as resolveQuery,
  fd as resolveRelativeDateRange,
  Yo as resolveSeriesColors,
  pd as resolveValue,
  hb as rowBoundaries,
  bb as rowBoundaryTop,
  Wy as safeLoadSpec,
  Wm as scatterChartFamily,
  Hm as tableChartFamily,
  xo as toDate,
  rd as toResultAnnotation,
  ry as usageSummary,
  ib as useChartEditorState,
  Oo as useChartInteractions,
  ss as useContainerWidth,
  ft as useCubeMeta,
  is as useCubeQuery,
  Be as useCubeVizContext,
  os as useDashboard,
  sl as useDebouncedCallback,
  or as useDisplayUnit,
  dt as useFamilyRegistry,
  Yy as useFormatter,
  kr as useNormalizedSeries,
  pn as useOptionalDashboard,
  Ky as validateSpec,
  ny as variableUsages
};
//# sourceMappingURL=index.js.map
