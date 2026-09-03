var pl = Object.defineProperty;
var gl = (e, t, n) => t in e ? pl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var dr = (e, t, n) => gl(e, typeof t != "symbol" ? t + "" : t, n);
import { z as v } from "zod";
import { jsx as l, jsxs as y, Fragment as be } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as ae, createContext as Ji, useContext as oa, useState as Ct, useCallback as nt, useEffect as hn, useRef as pt, createElement as vl, useSyncExternalStore as Xi, useId as bl, Component as yl } from "react";
import { ruleX as Zi, ruleY as eo, text as cn, colorLegend as sa, group as kl, stack as to, barX as ni, barY as ri, lineX as wl, lineY as Un, defineChart as ct, areaY as Tr, dot as no, cell as Cl } from "@tanstack/charts";
import { crosshair as ro } from "@tanstack/charts/crosshair";
import { scaleBand as Nl } from "@tanstack/charts/scales/band";
import { scaleLinear as Tn } from "@tanstack/charts/scales/linear";
import { scalePoint as Sl } from "@tanstack/charts/scales/point";
import { Chart as xl } from "@tanstack/charts/react/core";
import { motion as ao } from "@tanstack/charts/motion";
import { tooltip as la } from "@tanstack/charts/tooltip";
import { d3Curve as fr } from "@tanstack/charts/d3/shape";
import { brushX as Ml } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Rl } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Tl, scaleLog as ai, scaleSqrt as Ol } from "d3-scale";
import { curveNatural as _l, curveStepAfter as Al, curveMonotoneX as Dl } from "d3-shape";
import { format as ye, isValid as Gt, parseISO as On, subDays as Me, startOfWeek as _n, endOfWeek as An, startOfMonth as gt, endOfMonth as en, startOfQuarter as vt, endOfQuarter as tn, startOfYear as bt, endOfYear as nn, subWeeks as Or, subMonths as yt, subQuarters as kt, subYears as wt, differenceInCalendarDays as El, parse as io } from "date-fns";
import { clsx as Ll } from "clsx";
import * as Te from "@radix-ui/react-select";
import { Minus as oo, ArrowUp as ca, ArrowDown as ua, CalendarRange as so, ChevronsUpDown as Fl, AreaChart as Il, BarChart3 as lo, Grid3X3 as $l, Table as Pl, Gauge as zl, ScatterChart as Vl, PieChart as jl, LineChart as Wl, AlertCircle as ma, ChevronLeft as da, ChevronRight as Gn, ChevronDown as ut, Check as Wt, ChevronUp as Bl, CalendarIcon as co, MoreVertical as Kl, RefreshCw as Hl, Image as ql, Sheet as Ul, Search as Gl, ListChecks as Yl, Table2 as uo, Database as mo, Layers as fo, Calendar as Ql, Type as ho, Hash as ii, MapPin as Jl, Variable as Xl, Plus as Nt, Trash2 as Bt, ListFilter as Zl, EyeOff as ec, Eye as tc, AlertTriangle as nc, GripVertical as rc, X as _r, ArrowLeftRight as ac, Save as po, Braces as ic, Undo2 as oc, Redo2 as sc, RotateCcw as lc, SlidersHorizontal as cc, Pencil as uc, Copy as mc, Bold as dc, Italic as fc, Strikethrough as hc, Heading1 as pc, Heading2 as gc, List as vc, ListOrdered as bc, Quote as yc, Box as kc } from "lucide-react";
import * as Dn from "@radix-ui/react-popover";
import { cva as fa } from "class-variance-authority";
import wc from "@cubejs-client/core";
import { DayPicker as Cc, useDayPicker as Nc } from "react-day-picker";
import { pie as Sc, radialArc as Ar, radialText as hr, polar as go } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as vo } from "react-grid-layout";
import { useEditor as bo, EditorContent as yo } from "@tiptap/react";
import ko from "@tiptap/starter-kit";
const Et = 5, En = v.object({ var: v.string().min(1) }).strict();
function Se(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Ln = (e) => v.union([e, En]), xc = v.union([v.string(), v.number(), v.boolean()]), it = v.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), It = "auto", Mc = v.union([it, v.literal(It)]), Dr = v.union([v.tuple([v.string(), v.string()]), v.string()]), wo = v.union([
  v.string(),
  v.number(),
  v.boolean(),
  v.tuple([v.string(), v.string()]),
  // absolute date range
  v.array(v.string()),
  v.array(v.number())
]), de = v.string().min(1), Rc = v.enum([
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
]), Tc = v.object({
  member: de,
  operator: Rc,
  values: v.array(v.union([xc, En])).optional()
}).strict(), Er = v.lazy(
  () => v.union([
    Tc,
    v.object({ and: v.array(Er) }).strict(),
    v.object({ or: v.array(Er) }).strict()
  ])
), Oc = v.object({
  dimension: de,
  granularity: Ln(Mc).optional(),
  dateRange: Ln(Dr).optional(),
  compareDateRange: v.array(Dr).optional()
}).strict(), oi = v.enum(["asc", "desc"]), _c = v.union([
  v.record(de, oi),
  v.array(v.tuple([de, oi]))
]), Co = v.object({
  measures: v.array(de).optional(),
  dimensions: v.array(de).optional(),
  timeDimensions: v.array(Oc).optional(),
  filters: v.array(Er).optional(),
  segments: v.array(de).optional(),
  order: _c.optional(),
  limit: Ln(v.number()).optional(),
  offset: Ln(v.number()).optional(),
  total: v.boolean().optional(),
  timezone: v.string().optional()
}).strict(), Ac = v.string().min(1), Uy = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], ot = v.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Dc = v.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), ha = v.object({
  kind: Dc.optional(),
  decimals: v.number().optional(),
  abbreviate: v.boolean().optional(),
  prefix: v.string().optional(),
  suffix: v.string().optional(),
  unitSystem: v.enum(["metric", "imperial"]).optional(),
  dateFormat: v.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: v.string().optional()
}).strict(), si = v.object({
  label: v.string().optional(),
  colorToken: ot.optional(),
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
}).strict(), Ec = v.object({
  category: v.object({ member: de }).strict(),
  series: v.union([
    v.object({
      mode: v.literal("measures"),
      members: v.array(de),
      meta: v.record(de, si).optional()
    }).strict(),
    v.object({
      mode: v.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: de,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: v.array(de).optional(),
      pivot: de,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: v.record(de, si).optional()
    }).strict()
  ])
}).strict(), Lc = v.object({
  show: v.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: v.enum(["top", "bottom"]).optional()
}).strict(), Fc = v.object({
  show: v.boolean().optional(),
  indicator: v.enum(["dot", "line", "dashed"]).optional(),
  showTotal: v.boolean().optional()
}).strict(), li = v.object({
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
  tickFormat: ha.optional()
}).strict(), Ic = v.object({
  x: li.optional(),
  y: li.optional()
}).strict(), $c = v.object({
  byKey: v.record(v.string(), ot).optional(),
  ramp: v.array(ot).optional()
}).strict(), Cn = 7, Pc = v.enum(["rollingAvg", "cumulative", "percentOfTotal"]), zc = v.object({
  kind: Pc,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: v.number().int().min(2).max(90).optional()
}).strict(), No = v.object({
  family: Ac,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ec.optional(),
  orientation: v.enum(["vertical", "horizontal"]).optional(),
  stackMode: v.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Lc.optional(),
  tooltip: Fc.optional(),
  axes: Ic.optional(),
  colors: $c.optional(),
  format: ha.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: zc.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: v.record(v.string(), v.unknown()).optional()
}).strict(), Vc = v.object({ type: v.string(), content: v.array(v.unknown()).optional() }).passthrough(), jc = v.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Wc = v.object({
  variable: v.string().min(1),
  control: v.discriminatedUnion("kind", [
    v.object({
      kind: v.literal("dateRange"),
      presets: v.array(v.string()).optional(),
      allowFuture: v.boolean().optional()
    }).strict(),
    v.object({
      kind: v.literal("granularity"),
      options: v.array(it).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: v.string().optional()
    }).strict(),
    v.object({
      kind: v.literal("select"),
      options: v.array(v.object({ value: wo, label: v.string() }).strict()),
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
}).strict(), pa = {
  id: v.string().min(1),
  title: v.string().optional()
}, Bc = v.object({ ...pa, type: v.literal("chart"), query: Co.default({}), chart: No }).strict(), Kc = v.object({ ...pa, type: v.literal("text"), doc: Vc }).strict(), Hc = v.object({ ...pa, type: v.literal("input"), control: Wc }).strict(), qc = v.discriminatedUnion("type", [
  Bc,
  Kc,
  Hc
]), Uc = v.object({
  i: v.string(),
  x: v.number(),
  y: v.number(),
  w: v.number(),
  h: v.number(),
  minW: v.number().optional(),
  minH: v.number().optional(),
  static: v.boolean().optional()
}).strict(), Gc = v.object({
  cols: v.number().optional(),
  rowHeight: v.number().optional(),
  margin: v.tuple([v.number(), v.number()]).optional(),
  containerPadding: v.tuple([v.number(), v.number()]).optional()
}).strict(), So = v.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Yc = v.object({
  name: v.string().min(1),
  type: So,
  label: v.string().optional(),
  array: v.boolean().optional(),
  default: wo.optional()
}).strict(), xo = {
  schemaVersion: v.literal(Et),
  id: v.string().min(1),
  name: v.string().optional(),
  description: v.string().optional(),
  createdAt: v.string().optional(),
  updatedAt: v.string().optional()
}, Mo = v.object({ ...xo, kind: v.literal("chart"), query: Co.default({}), chart: No }).strict(), Lr = v.object({
  ...xo,
  kind: v.literal("dashboard"),
  variables: v.array(Yc),
  widgets: v.array(qc),
  layout: v.array(Uc),
  grid: Gc.optional()
}).strict(), Ro = v.discriminatedUnion("kind", [Mo, Lr]);
function Z(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Ue(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function Qc(e) {
  if (!Z(e.axes)) return;
  const t = Ue(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Jc(e) {
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
function Xc(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => Z(n) ? Ue(n, "side") ?? {} : n
  ));
}
function Zc(e) {
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
function ci(e) {
  Z(e) && (e.family === "combo" && Zc(e), Qc(e), Jc(e), Xc(e));
}
function eu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ci(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && ci(n.chart);
  return t;
}
function tu(e) {
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
function nu(e) {
  if (!Z(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function ru(e) {
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
function au(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = Ue(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function ui(e) {
  Z(e) && (tu(e), nu(e), ru(e), au(e));
}
function iu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ui(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && ui(n.chart);
  return t;
}
const ou = {
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
function su(e) {
  if (!Z(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = ou[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = Ue(r, a) ?? {};
  e.familyOptions = r;
}
function lu(e) {
  if (Z(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Z(n) || n.labelHide !== !0) continue;
      const r = Ue(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function mi(e) {
  Z(e) && (su(e), lu(e));
}
function cu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    mi(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && mi(n.chart);
  return t;
}
function uu(e) {
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
function mu(e) {
  const t = structuredClone(e), n = (r) => {
    Z(r) && uu(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      Z(r) && r.type === "chart" && n(r.chart);
  return t;
}
const du = {
  1: eu,
  2: iu,
  3: cu,
  4: mu
};
function fu(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Et)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Et} — update the library`
    );
  for (; n < Et; ) {
    const r = du[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return Ro.parse(t);
}
function Gy(e) {
  try {
    return { ok: !0, spec: fu(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Yy(e) {
  return Ro.parse(e);
}
function hu(e) {
  return wc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function pu(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function A(...e) {
  return Ll(e);
}
function gu({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: A("cv-skeleton", e), ...t });
}
const vu = fa(
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
), Yn = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: A(vu({ variant: t }), e),
    ...n
  }
));
Yn.displayName = "Alert";
const Qn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: A("cv-alert-title", e),
      ...t
    }
  )
);
Qn.displayName = "AlertTitle";
const Jn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: A("cv-alert-description", e),
      ...t
    }
  )
);
Jn.displayName = "AlertDescription";
const bu = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, yu = "MMM d, yyyy";
function To(e) {
  if (e instanceof Date) return Gt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Gt(r) ? r : null;
  }
  const t = On(e);
  if (Gt(t)) return t;
  const n = new Date(e);
  return Gt(n) ? n : null;
}
function ga(e) {
  return /^\d{4}-\d{2}/.test(e) ? Gt(On(e)) : !1;
}
function ku(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? bu[t] : yu;
}
function rn(e, t, n) {
  const r = To(e);
  return r ? ye(r, ku(t, n)) : String(e);
}
function Qy(e, t) {
  return (n) => n == null ? "" : rn(n, e, t);
}
function Jy(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? rn(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? rn(e, t.format, t.granularity) : String(e) : ga(e) ? rn(e, t.format, t.granularity) : e;
}
const di = "—", wu = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function fi(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Cu(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of wu)
    if (n >= r) return fi((e / r).toFixed(t)) + a;
  return fi(e.toFixed(t));
}
function Nu(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Su(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Cu(e, n.decimals ?? 1) : Nu(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function Oo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function xu(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Oo(e.value) ? !0 : typeof e.value == "string" ? ga(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const va = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? di : (Oo(t) || typeof t == "string" || typeof t == "number") && xu(e) ? rn(t, n, r) : typeof t == "number" ? Su(t, e) : String(t);
};
function Mu(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Xy(e, t) {
  return (n, r) => {
    const a = r ? Mu(r, t) : void 0;
    return va({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Ru(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Tu(e) {
  const t = it.safeParse(e);
  return t.success ? t.data : void 0;
}
function Ou(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Tu(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function ba(e, t, n, r) {
  const a = Ou(e, t), i = {
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
      const u = s ? Ru(s, e) : void 0, d = u == null ? void 0 : u.meta;
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
const Xn = v.object({
  axis: v.enum(["x", "y"]),
  value: v.number(),
  label: v.string().optional(),
  colorToken: ot.optional()
}).strict(), ya = v.boolean().optional(), _u = v.object({
  showValueLabels: v.boolean().optional(),
  referenceLines: v.array(Xn).optional(),
  comparePrevious: ya
}).strict(), _o = v.enum(["linear", "monotone", "step", "natural"]), Au = v.object({
  curve: _o.optional(),
  dots: v.union([v.boolean(), v.literal("active")]).optional(),
  connectNulls: v.boolean().optional(),
  chrome: v.enum(["full", "none"]).optional(),
  referenceLines: v.array(Xn).optional(),
  showValueLabels: v.boolean().optional(),
  comparePrevious: ya
}).strict(), Du = v.object({
  curve: _o.optional(),
  connectNulls: v.boolean().optional(),
  dots: v.boolean().optional(),
  referenceLines: v.array(Xn).optional(),
  comparePrevious: ya
}).strict(), Eu = v.object({
  innerRadiusPct: v.number().optional(),
  showLabels: v.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: v.object({ value: v.string().optional(), label: v.string().optional() }).strict().optional(),
  maxSlices: v.number().optional()
}).strict(), Lu = v.object({
  x: de,
  y: de,
  size: de.optional(),
  groupBy: de.optional(),
  referenceLines: v.array(Xn).optional()
}).strict(), Fu = v.object({
  display: v.enum(["number", "gauge"]).optional(),
  measure: de,
  comparison: v.object({
    mode: v.enum(["previousPeriod", "value"]),
    value: v.union([de, v.number()]).optional(),
    showAsPercent: v.boolean().optional(),
    goodDirection: v.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: v.object({
    member: de.optional(),
    timeDimension: de.optional(),
    granularity: v.union([it, En]).optional(),
    dateRange: v.union([Dr, En]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: v.enum(["up", "down"]).optional(),
  gauge: v.object({
    min: v.number().optional(),
    max: v.number(),
    thresholds: v.array(v.object({ at: v.number(), colorToken: ot }).strict()).optional()
  }).strict().optional()
}).strict(), Iu = v.object({
  member: de,
  label: v.string().optional(),
  format: ha.optional(),
  align: v.enum(["left", "right", "center"]).optional(),
  width: v.number().optional(),
  hidden: v.boolean().optional()
}).strict(), $u = v.object({
  member: de,
  when: v.object({
    op: v.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: v.number()
  }).strict(),
  colorToken: ot.optional()
}).strict(), Pu = v.object({
  columns: v.array(Iu).optional(),
  pageSize: v.number().optional(),
  conditionalFormat: v.array($u).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), zu = v.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: ot.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), Qe = {
  bar: _u,
  line: Au,
  area: Du,
  pie: Eu,
  scatter: Lu,
  heatmap: zu,
  kpi: Fu,
  table: Pu
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
function hi(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Fr(e, t) {
  if (t === void 0) return e;
  if (!hi(e) || !hi(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? Fr(e[r], a) : a);
  }
  return n;
}
const Vu = { envelope: {}, familyOptions: {} };
function ju(e, t) {
  return {
    ...Fr({ ...t.envelope }, e),
    familyOptions: Fr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Ao = {}, pi = () => {
}, Wu = {
  target: Ao,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: pi,
  emitPoint: pi
}, Fn = b.createContext(null);
Fn.displayName = "ChartInteractionContext";
function Do() {
  return b.useContext(Fn) ?? Wu;
}
function ka({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Fn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((h) => {
    const { parent: p, widgetId: k, onRangeSelect: C } = o.current, w = h && h.widgetId === void 0 && k !== void 0 ? { ...h, widgetId: k } : h;
    C ? C(w) : p == null || p.emitRange(w);
  }, []), c = b.useCallback((h) => {
    const { parent: p, widgetId: k, onPointSelect: C } = o.current, w = h && h.widgetId === void 0 && k !== void 0 ? { ...h, widgetId: k } : h;
    C ? C(w) : p == null || p.emitPoint(w);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), d = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), m = i == null ? void 0 : i.target, g = b.useMemo(
    () => m || r ? { ...m, ...r } : Ao,
    [m, r]
  ), f = b.useMemo(
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
  return /* @__PURE__ */ l(Fn.Provider, { value: f, children: a });
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
function Eo(e) {
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
    var d, m, g;
    const o = (d = n == null ? void 0 : n.temporal) == null ? void 0 : d.dates[i], s = /* @__PURE__ */ new Map();
    for (const f of t) {
      const h = f.data[i];
      if (typeof h == "number" && Number.isFinite(h)) {
        const p = Ir(f);
        s.set(p, (s.get(p) ?? 0) + Math.abs(h));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const f of t) {
      const h = f.data[i] ?? null, p = Ir(f), k = s.get(p) ?? 0, C = h === null || k === 0 ? null : Math.abs(h) / k;
      let w = 0, R = 0;
      if (h !== null) {
        const M = h < 0 ? u : c;
        w = M.get(p) ?? 0, R = w + h, M.set(p, R);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: h,
        key: f.key,
        label: f.label,
        member: ((m = f.meta) == null ? void 0 : m.measure) ?? f.key,
        companion: ((g = f.meta) == null ? void 0 : g.companion) ?? !1,
        i,
        stack: p,
        y1: w * N,
        y2: R * N,
        share: C
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
function un(e) {
  return e.label || e.key;
}
function et(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function wa(e, t) {
  const n = e.series.map(un), r = e.series.map(et), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = sa({ placement: Kt(t.legendPlacement) })), a;
}
function Kt(e) {
  return e === "top" ? "top" : "bottom";
}
function pn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function In(e = 0.2) {
  return Nl().padding(e);
}
function Lo() {
  return Sl().padding(0.02);
}
const Bu = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Ku(e) {
  if (typeof e == "string" && Bu.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return To(e);
}
function Fo(e) {
  return e.toISOString().slice(0, -1);
}
function gi(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = it.safeParse(n);
  return r.success ? r.data : void 0;
}
function Io(e, t) {
  var d, m, g;
  const n = (m = (d = t.mapping) == null ? void 0 : d.category) == null ? void 0 : m.member, r = (g = e.raw.annotation) == null ? void 0 : g.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const f of Object.keys(r))
    if (f === n || f.startsWith(`${n}.`)) {
      a = f;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? gi(n) : gi(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const f of e.categories) {
    if (typeof f == "number" && i === void 0 || typeof f == "string" && !ga(f)) return null;
    const h = Ku(f);
    if (!h) return null;
    s.push(h);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((f) => c.has(f.getTime()) ? !1 : (c.add(f.getTime()), !0)).sort((f, h) => f.getTime() - h.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function $o(e) {
  return e ? Tl : Lo;
}
function Ca(e) {
  return e ? "t" : "cat";
}
function $n(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Fo(r)) : t.category(r);
}
function vi(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Fo(t);
}
function Po(e, t) {
  const n = Do(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (f) => f !== void 0 && s.some((h) => h.getTime() === f.getTime()), u = r && c(r.start) && c(r.end) ? r : null, d = s[0], m = u ?? { start: d, end: d }, g = u === null;
    return [
      Ml({
        id: "cv-brush-x",
        values: s,
        range: Rl(
          m,
          (f, { reason: h }) => {
            if (h.type !== "commit") return;
            const p = i.current.temporal, k = f.start.getTime() === f.end.getTime();
            if (a(k ? null : f), k || !p) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: p.member,
              granularity: p.granularity,
              from: vi(p, f.start),
              to: vi(p, f.end)
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
  }, [o, e, r]);
}
function Hu(e, t) {
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
    const a = () => r ? ai().domain(r) : ai();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: Tn().domain(r), nice: !1 } : { scale: Tn, nice: !0 };
}
function zo(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function mn(e) {
  switch (e) {
    case "monotone":
      return fr(Dl);
    case "step":
      return fr(Al);
    case "natural":
      return fr(_l);
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
    var m, g, f, h, p, k;
    if (d)
      return ((m = n == null ? void 0 : n.measures[d]) == null ? void 0 : m.shortTitle) ?? ((g = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : g.shortTitle) ?? ((f = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : f.shortTitle) ?? ((h = n == null ? void 0 : n.measures[d]) == null ? void 0 : h.title) ?? ((p = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : p.title) ?? ((k = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : k.title) ?? d;
  }, a = e.series[0], i = (d) => {
    var m;
    return d ? (m = d.meta) != null && m.measure ? r(d.meta.measure) : d.label : void 0;
  };
  return {
    x: Pt((o = t.axes) == null ? void 0 : o.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Pt((u = t.axes) == null ? void 0 : u.y, i(a))
  };
}
function Be(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function Sa(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function qu(e) {
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
function Zn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: la,
    className: xa(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((m) => {
        var g;
        return { datum: m, color: (g = e.colorOf) == null ? void 0 : g.call(e, m) };
      }) : a.map((m) => ({ datum: m.datum, color: m.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const m of s) {
          const g = m.datum.value;
          m.datum.companion || typeof g != "number" || !Number.isFinite(g) || (c += g, u += 1);
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
    const m = n != null && n.swap ? !u : u, g = m ? n != null && n.swap ? i.value : d : n != null && n.swap ? d : i.value;
    if (r.push(
      m ? Zi([g], { id: `cv-ref-${o}`, ...c }) : eo([g], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const f = u ? n == null ? void 0 : n.valueAnchor : a;
    if (f == null) return;
    const h = (n == null ? void 0 : n.swap) === !0;
    r.push(
      Ma(
        cn(
          [
            {
              x: m ? g : f,
              y: m ? f : g,
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
            dy: m ? h ? -6 : 8 : -6,
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
function Vo(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = Ca((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? st(c, n.locale) : "";
  };
  return [
    Ma(
      cn(r, {
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
const Uu = ao({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Gu = ao({ initial: !1 });
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
  const c = b.useRef(null), u = Do(), d = u.pointEnabled && !r, m = b.useRef(s);
  b.useLayoutEffect(() => {
    m.current = s;
  });
  const g = b.useCallback(
    (C) => {
      if (C === null) {
        u.emitPoint(null);
        return;
      }
      const w = m.current, R = w ? w(C) : Hu(C, u.target);
      R && u.emitPoint(R);
    },
    [u]
  ), [f, h] = b.useState({ w: 0, h: 0 }), p = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const C = c.current;
    if (!C || typeof ResizeObserver > "u") return;
    const w = new ResizeObserver((R) => {
      var M;
      const N = (M = R[0]) == null ? void 0 : M.contentRect;
      N && h({ w: Math.floor(N.width), h: Math.floor(N.height) });
    });
    return w.observe(C), () => w.disconnect();
  }, []);
  const k = r ? Math.max(24, f.h || Math.round((f.w || 160) / 5)) : Math.max(i, f.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: f.w > 0 && /* @__PURE__ */ l(
        xl,
        {
          definition: e,
          renderer: a ? Uu : Gu,
          width: f.w,
          height: k,
          ariaLabel: t,
          idPrefix: p,
          onSelect: o ?? (d ? g : void 0)
        }
      )
    }
  );
}
function Yu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var te, U, oe, me, le, pe, ge, W, ne, ce, L, x;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, d = e.series.filter((S) => {
      var _;
      return (_ = S.meta) == null ? void 0 : _.companion;
    }), m = d.length ? e.series.filter((S) => {
      var _;
      return !((_ = S.meta) != null && _.companion);
    }) : e.series, g = u ? m : e.series, h = (u ? Eo(g) : []).length > 1, p = h ? $r(e, g, { normalize: c }) : tt(e, { series: g }), k = new Map(e.series.map((S) => [un(S), et(S)])), C = /* @__PURE__ */ new Map();
    if (h)
      for (const S of p) {
        const _ = C.get(S.i);
        _ ? _.push(S) : C.set(S.i, [S]);
      }
    const w = Na(e, t), R = s ? (U = (te = t.axes) == null ? void 0 : te.y) == null ? void 0 : U.hide : (me = (oe = t.axes) == null ? void 0 : oe.x) == null ? void 0 : me.hide, N = s ? (le = t.axes) == null ? void 0 : le.x : (pe = t.axes) == null ? void 0 : pe.y, M = $t(N), T = r.barCategoryGap, E = s ? (ge = t.axes) == null ? void 0 : ge.y : (W = t.axes) == null ? void 0 : W.x, B = Be(n, E), j = Be(n, N), D = qu(t) ?? Sa(e.series[0]), O = (S) => c ? st(S) : j.value(S, D, "axis"), z = R ? !1 : {
      label: w.x,
      ticks: { format: (S) => B.category(S) }
    }, F = N != null && N.hide ? !1 : { label: w.y, ticks: { format: O } }, $ = kl({ padding: r.barGap }), V = h ? $ : c ? to({ offset: "normalize" }) : u ? void 0 : $, I = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (S) => h ? S.stack : S.label,
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
        const _ = k.get(S.label) ?? "var(--chart-1)";
        return S.companion ? `color-mix(in oklab, ${_} 40%, transparent)` : _;
      }
    }, Q = [
      h ? s ? ni(p, { ...I, x1: "y1", x2: "y2", y: "cat" }) : ri(p, { ...I, x: "cat", y1: "y1", y2: "y2" }) : s ? ni(p, { ...I, x: "value", y: "cat" }) : ri(p, { ...I, x: "cat", y: "value" })
    ];
    if (u && !c && d.length) {
      const S = e.categories.map((_, K) => {
        var H, G, J;
        return {
          cat: typeof _ == "number" ? _ : String(_),
          value: d.reduce((Ce, ve) => {
            const q = ve.data[K];
            return typeof q != "number" ? Ce : (Ce ?? 0) + q;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((G = (H = d[0]) == null ? void 0 : H.meta) == null ? void 0 : G.measure) ?? ((J = d[0]) == null ? void 0 : J.key),
          companion: !0,
          i: K
        };
      });
      if (S.some((_) => _.value !== null)) {
        const _ = {
          id: "cv-bars-prev",
          key: (K) => `prev ${K.i}`,
          curve: mn("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        Q.push(
          s ? wl(S, { ..._, x: "value", y: "cat" }) : Un(S, { ..._, x: "cat", y: "value" })
        );
      }
    }
    if (Q.push(
      ...Ra(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: Ta(e)
      })
    ), a.showValueLabels) {
      const S = u ? h ? p : $r(e, g, { normalize: c }) : p;
      Q.push(
        ...Vo(S, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return ct({
      marks: Q,
      x: s ? { scale: M.scale, nice: M.nice, grid: !0, axis: F } : { scale: () => In(T), axis: z },
      y: s ? { scale: () => In(T), axis: z } : { scale: M.scale, nice: M.nice, grid: !0, axis: F },
      color: wa(u ? { ...e, series: g } : e, {
        legend: pn(t) && g.length > 1,
        legendPlacement: Kt((ne = t.legend) == null ? void 0 : ne.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((ce = t.tooltip) == null ? void 0 : ce.show) === !1 ? void 0 : Zn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !h,
        value: c && h ? (S) => {
          const _ = S.share;
          return typeof _ == "number" ? st(_) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: h ? (S) => C.get(S.i) ?? [S] : void 0,
        colorOf: h ? (S) => k.get(S.label) ?? "var(--chart-1)" : void 0,
        indicator: (L = t.tooltip) == null ? void 0 : L.indicator,
        showTotal: (x = t.tooltip) == null ? void 0 : x.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(un).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(mt, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function Qu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : Io(e, t),
    [e, t, i]
  ), s = b.useMemo(() => $n(o, n), [o, n]), c = (f = t.axes) == null ? void 0 : f.x, u = b.useMemo(
    () => c != null && c.tickFormat ? $n(o, Be(n, c)) : s,
    [o, n, c, s]
  ), d = Po(o, {
    label: s,
    ariaLabel: "Time range"
  }), m = b.useMemo(() => {
    var T, E, B, j, D, O, z, F, $;
    const h = Ca(o), p = a.connectNulls ?? !1, k = a.curve ?? "monotone", C = mn(k), w = Na(e, t), R = $t((T = t.axes) == null ? void 0 : T.y), N = e.categories.length <= 1, M = e.series.map((V) => {
      var Q, te, U;
      const I = tt(e, { series: [V], skipNull: p, temporal: o });
      return Un(I, {
        id: `cv-line-${V.key}`,
        x: h,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: C,
        strokeWidth: r.lineWidth,
        strokeDasharray: (Q = V.meta) != null && Q.companion ? "5 4" : void 0,
        strokeOpacity: (te = V.meta) != null && te.companion ? 0.55 : void 0,
        stroke: et(V),
        points: !i && !((U = V.meta) != null && U.companion) && (zo(V, a.dots) || N)
      });
    });
    return i || (M.push(
      ...Ra(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: Ta(e)
      }),
      ...Vo(
        a.showValueLabels ? tt(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), M.push(ro({ x: {}, y: !1, marker: a.dots !== !1 }))), ct({
      marks: M,
      x: {
        scale: $o(o),
        axis: i || (B = (E = t.axes) == null ? void 0 : E.x) != null && B.hide ? !1 : {
          label: w.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: R.scale,
        nice: R.nice,
        grid: !i,
        axis: i || (D = (j = t.axes) == null ? void 0 : j.y) != null && D.hide ? !1 : {
          label: w.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (V) => {
              var I, Q, te, U;
              return Be(n, (I = t.axes) == null ? void 0 : I.y).value(
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
        legend: !i && pn(t) && e.series.length > 1,
        legendPlacement: Kt((O = t.legend) == null ? void 0 : O.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((z = t.tooltip) == null ? void 0 : z.show) === !1 ? void 0 : Zn({
        format: n,
        category: s,
        indicator: (F = t.tooltip) == null ? void 0 : F.indicator,
        showTotal: ($ = t.tooltip) == null ? void 0 : $.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: d
    });
  }, [e, t, n, a, r, i, o, s, u, d]), g = e.series.map(un).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    mt,
    {
      definition: m,
      ariaLabel: g,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function Ju({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, C, w;
  const a = t.familyOptions ?? {}, i = ((C = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : C.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", c = o === "percent", u = b.useMemo(() => Io(e, t), [e, t]), d = b.useMemo(() => $n(u, n), [u, n]), m = (w = t.axes) == null ? void 0 : w.x, g = b.useMemo(
    () => m != null && m.tickFormat ? $n(u, Be(n, m)) : d,
    [u, n, m, d]
  ), f = Po(u, { label: d, ariaLabel: "Time range" }), h = b.useMemo(() => {
    var oe, me, le, pe, ge, W, ne, ce, L;
    const R = Ca(u), N = a.connectNulls ?? !1, M = a.curve ?? "monotone", T = mn(M), E = r.areaFillOpacity, B = r.stackedAreaFillOpacity, j = r.lineWidth, D = Na(e, t), O = $t((oe = t.axes) == null ? void 0 : oe.y), z = Sa(e.series[0]), F = e.series.filter((x) => {
      var S;
      return !((S = x.meta) != null && S.companion);
    }), $ = c ? [] : e.series.filter((x) => {
      var S;
      return (S = x.meta) == null ? void 0 : S.companion;
    }), V = new Map(e.series.map((x) => [x.key, et(x)])), I = [], Q = (x) => `cv-area-fill-${x.replace(/[^a-zA-Z0-9_-]/g, "-")}`, te = s ? void 0 : F.map((x) => ({
      id: Q(x.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: et(x), opacity: E * 0.15 },
        { offset: 1, color: et(x), opacity: E }
      ]
    }));
    if (s)
      for (const { stackId: x, series: S } of Eo(F)) {
        const _ = tt(e, { series: S, skipNull: N, temporal: u });
        I.push(
          Tr(_, {
            id: x ? `cv-area-stack-${x}` : "cv-area-stack",
            x: R,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (K) => `${K.key}:${K.i}`,
            curve: T,
            fillOpacity: B,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (K) => V.get(K.key) ?? "currentColor",
            strokeWidth: j,
            layout: c ? to({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const x of F) {
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
            strokeWidth: j
          })
        );
      }
    for (const x of $) {
      const S = tt(e, { series: [x], skipNull: N, temporal: u });
      I.push(
        Un(S, {
          id: `cv-area-prev-${x.key}`,
          x: R,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: T,
          strokeWidth: j,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: et(x)
        })
      );
    }
    const U = new Set(
      F.filter((x) => zo(x, a.dots)).map((x) => x.key)
    );
    if (U.size > 0) {
      const x = s ? $r(e, F, { normalize: c, temporal: u }).filter(
        (S) => U.has(S.key) && S.value !== null
      ) : tt(e, {
        series: F.filter((S) => U.has(S.key)),
        skipNull: !0,
        temporal: u
      });
      I.push(
        no(x, {
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
    ), I.push(ro({ x: {}, y: !1, marker: !0 })), ct({
      marks: I,
      gradients: te,
      x: {
        scale: $o(u),
        axis: (le = (me = t.axes) == null ? void 0 : me.x) != null && le.hide ? !1 : {
          label: D.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: O.scale,
        nice: O.nice,
        grid: !0,
        axis: (ge = (pe = t.axes) == null ? void 0 : pe.y) != null && ge.hide ? !1 : {
          label: D.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (x) => {
              var S;
              return c ? st(x) : Be(n, (S = t.axes) == null ? void 0 : S.y).value(x, z, "axis");
            }
          }
        }
      },
      color: wa(e, {
        legend: pn(t) && e.series.length > 1,
        legendPlacement: Kt((W = t.legend) == null ? void 0 : W.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((ne = t.tooltip) == null ? void 0 : ne.show) === !1 ? void 0 : Zn({
        format: n,
        percentShare: c,
        category: d,
        indicator: (ce = t.tooltip) == null ? void 0 : ce.indicator,
        showTotal: (L = t.tooltip) == null ? void 0 : L.showTotal
      }),
      keyboard: !0,
      controls: f
    });
  }, [e, t, n, a, r, s, c, u, d, g, f]), p = e.series.map(un).join(", ") || "Area chart";
  return /* @__PURE__ */ l(mt, { definition: h, ariaLabel: p, className: "cv-chart--fill" });
}
const Xu = 0.26, Zu = 0.03, bi = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function em({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var h, p;
  const a = t.familyOptions ?? {}, i = e.series[0], o = Sa(i), s = (p = (h = t.colors) == null ? void 0 : h.ramp) != null && p.length ? t.colors.ramp : tr, c = b.useMemo(() => {
    const k = e.categories.map((C, w) => ({
      label: n.category(C),
      value: (i == null ? void 0 : i.data[w]) ?? 0
    }));
    return tm(k, a.maxSlices).map((C, w) => ({
      ...C,
      token: s[w % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), u = c.reduce((k, C) => k + C.value, 0), d = c.some((k) => k.value < 0), m = d || c.length === 0 || u <= 0, g = b.useMemo(() => {
    var D, O, z;
    if (m) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, C = k > 0, w = a.showLabels ?? "percent", R = w !== "none", N = R ? Math.min(r.pieRadiusPct / 100, 1 - Xu) : r.pieRadiusPct / 100, M = Sc(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), E = [Ar(M, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: F }) => F * k,
      outerRadius: ({ radius: F }) => F * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (R) {
      const F = ($) => w === "name" ? $.label : w === "value" ? n.value($.value, o, "label") : st($.fraction);
      E.push(
        hr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          M.filter(($) => $.value > 0 && $.fraction >= Zu),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: ($) => $.angle,
            radius: N,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: F,
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
    if (C && a.centerLabel) {
      const F = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(u, o, "label") : a.centerLabel.value;
      if (E.push(
        hr([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => F,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), a.centerLabel.label) {
        const $ = a.centerLabel.label;
        E.push(
          hr([{ id: "cv-pie-center-sub" }], {
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
    const B = {
      domain: c.map((F) => F.label),
      range: c.map((F) => `var(--${F.token})`)
    };
    pn(t) && (B.legend = sa({ placement: Kt((D = t.legend) == null ? void 0 : D.position) }));
    const j = i ? i.label || i.key : "";
    return ct({
      marks: [
        go({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Tn().domain([0, Math.PI * 2]) },
          radius: { scale: Tn().domain([0, 1]) },
          marks: E
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: B,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((O = t.tooltip) == null ? void 0 : O.show) === !1 ? void 0 : {
        use: la,
        className: xa((z = t.tooltip) == null ? void 0 : z.indicator),
        content: (F) => {
          const $ = F[0];
          if (!$) return { rows: [] };
          const V = $.datum;
          return {
            title: V.label,
            rows: [
              {
                label: j,
                value: `${n.value(V.value, o, "tooltip")} (${st(V.fraction)})`,
                color: $.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, c, u, t, n, a, r, i, o]);
  if (d)
    return /* @__PURE__ */ l("div", { style: bi, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: bi, children: "No data" });
  const f = c.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(mt, { definition: g, ariaLabel: f, className: "cv-chart--fill" });
}
function tm(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function nm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (f) => {
    var h, p;
    return ((h = i == null ? void 0 : i.measures[f]) == null ? void 0 : h.shortTitle) ?? ((p = i == null ? void 0 : i.dimensions[f]) == null ? void 0 : p.shortTitle) ?? f;
  }, s = a.x ? o(a.x) : "x", c = a.y ? o(a.y) : "y", u = a.size ? o(a.size) : void 0, d = b.useMemo(() => {
    var V, I, Q, te, U, oe, me, le, pe, ge, W, ne, ce, L;
    if (!a.x || !a.y) return null;
    const f = am(e.raw.rows, a);
    if (f.length === 0) return null;
    const h = !!a.groupBy, p = [];
    if (h)
      for (const x of f)
        x.group !== void 0 && !p.includes(x.group) && p.push(x.group);
    const [k, C] = r.bubbleAreaRange, w = Math.sqrt(Math.max(k, 0) / Math.PI), R = Math.sqrt(Math.max(C, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, M = (I = (V = t.colors) == null ? void 0 : V.ramp) != null && I.length ? t.colors.ramp : tr;
    h ? (N.z = "group", N.color = "group") : N.fill = `var(--${M[0]})`, a.size ? (N.r = (x) => x.size ?? 0, N.rScale = { scale: () => Ol().range([w, R]) }) : N.r = 4;
    const T = [no(f, N)];
    (Q = a.referenceLines) == null || Q.forEach((x, S) => {
      const _ = `var(--${x.colorToken ?? "muted-foreground"})`, K = { stroke: _, strokeWidth: 1.25, strokeDasharray: "4 4" };
      x.axis === "y" ? (T.push(eo([x.value], { id: `cv-ref-${S}`, ...K })), x.label && T.push(
        cn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          y: "v",
          text: "label",
          fill: _,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (T.push(Zi([x.value], { id: `cv-ref-${S}`, ...K })), x.label && T.push(
        cn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          x: "v",
          text: "label",
          fill: _,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let E;
    h && (E = {
      domain: p,
      range: p.map((x, S) => `var(--${M[S % M.length]})`)
    }, pn(t) && (E.legend = sa({ placement: Kt((te = t.legend) == null ? void 0 : te.position) })));
    const B = Pt((U = t.axes) == null ? void 0 : U.x, s), j = Pt((oe = t.axes) == null ? void 0 : oe.y, c), D = $t((me = t.axes) == null ? void 0 : me.x), O = $t((le = t.axes) == null ? void 0 : le.y), z = a.x, F = a.y, $ = a.size;
    return ct({
      marks: T,
      x: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (ge = (pe = t.axes) == null ? void 0 : pe.x) != null && ge.hide ? !1 : {
          label: B,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (x) => {
              var S;
              return Be(n, (S = t.axes) == null ? void 0 : S.x).value(x, z, "axis");
            }
          }
        }
      },
      y: {
        scale: O.scale,
        nice: O.nice,
        grid: !0,
        axis: (ne = (W = t.axes) == null ? void 0 : W.y) != null && ne.hide ? !1 : {
          label: j,
          ticks: {
            format: (x) => {
              var S;
              return Be(n, (S = t.axes) == null ? void 0 : S.y).value(x, F, "axis");
            }
          }
        }
      },
      color: E,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((ce = t.tooltip) == null ? void 0 : ce.show) === !1 ? void 0 : {
        use: la,
        className: xa((L = t.tooltip) == null ? void 0 : L.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (x) => {
          const _ = x[0];
          if (!_) return { rows: [] };
          const K = _.datum, H = [
            { label: s, value: n.value(K.x, z, "tooltip") },
            { label: c, value: n.value(K.y, F, "tooltip") }
          ];
          return $ && H.push({
            label: u ?? $,
            value: n.value(K.size, $, "tooltip")
          }), { title: K.group, color: _.color, rows: H };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, c, u]), m = a.groupBy, g = (f) => {
    var p;
    if (!f || !m) return null;
    const h = (p = f.datum) == null ? void 0 : p.group;
    return h === void 0 ? null : { member: m, value: h, label: h };
  };
  return d ? /* @__PURE__ */ l(
    mt,
    {
      definition: d,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: g
    }
  ) : /* @__PURE__ */ l("div", { style: rm, children: "No data" });
}
const rm = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function am(e, t) {
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
function im(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function om(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function sm(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function jo(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? sm(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => jo(e, t, n), r;
}
function lm({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = im(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const g = Pr(s, a), f = Pr(s, i), h = /* @__PURE__ */ new Map();
    return s.forEach((p, k) => {
      const C = om(p[o]), w = p[g], R = p[f];
      if (C === null || w === null || w === void 0 || R === null || R === void 0)
        return;
      const N = typeof w == "number" ? w : String(w), M = String(R);
      h.set(`${N}\0${M}`, {
        cat: N,
        label: M,
        value: C,
        key: `${N}|${M}`,
        member: o,
        i: k
      });
    }), [...h.values()];
  }, [s, a, i, o]), d = b.useMemo(() => {
    var w, R, N, M, T, E, B, j;
    let g = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY;
    for (const D of u)
      D.value < g && (g = D.value), D.value > f && (f = D.value);
    const h = (D) => {
      if (!D) return;
      const O = (c == null ? void 0 : c.dimensions[D]) ?? (c == null ? void 0 : c.timeDimensions[D]) ?? (c == null ? void 0 : c.measures[D]);
      return (O == null ? void 0 : O.shortTitle) ?? (O == null ? void 0 : O.title) ?? D;
    }, p = Pt((w = t.axes) == null ? void 0 : w.x, h(a)), k = Pt((R = t.axes) == null ? void 0 : R.y, h(i)), C = [
      Cl(u, {
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
      Ma(
        cn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (D) => n.value(D.value, D.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), ct({
      marks: C,
      x: {
        scale: () => In(0.05),
        axis: (M = (N = t.axes) == null ? void 0 : N.x) != null && M.hide ? !1 : {
          label: p,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (D) => {
              var O;
              return Be(n, (O = t.axes) == null ? void 0 : O.x).category(D);
            }
          }
        }
      },
      y: {
        scale: () => In(0.05),
        axis: (E = (T = t.axes) == null ? void 0 : T.y) != null && E.hide ? !1 : {
          label: k,
          ticks: {
            format: (D) => {
              var O;
              return Be(n, (O = t.axes) == null ? void 0 : O.y).category(D);
            }
          }
        }
      },
      color: {
        scale: jo(g, f, r.colorToken ?? "chart-1")
      },
      tooltip: ((B = t.tooltip) == null ? void 0 : B.show) === !1 ? void 0 : Zn({ format: n, indicator: (j = t.tooltip) == null ? void 0 : j.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const m = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(mt, { definition: d, ariaLabel: m, className: "cv-chart--fill" });
}
function cm(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function um(e) {
  return `cv-kpi-trend--${e}`;
}
function mm(e) {
  var c, u, d, m;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (g) => r.value(g, a.measure, "kpi"), o = Wo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((m = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : m.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(km, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(dm, { ...e, value: o, label: s, fo: a, fmt: i });
}
function dm({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const a = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : Cm(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && fm(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((f) => f !== null), d = i ? i.diff : c ? vm(c) : 0, m = um(cm(d, a));
  return /* @__PURE__ */ y("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ y("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(bm, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(hm, {}) : /* @__PURE__ */ l(pm, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(gm, { data: e, series: c, colorClass: m }) })
  ] });
}
function fm(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function hm() {
  return /* @__PURE__ */ y(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(so, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function pm() {
  return /* @__PURE__ */ y("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(oo, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function gm({
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
          curve: mn("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Un(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: mn("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Lo, axis: !1 },
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
function vm(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function bm({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var d;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? oo : a ? ca : ua, c = (d = n.comparison) != null && d.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const Yt = -(2 * Math.PI) / 3, zr = 2 * Math.PI / 3, ym = zr - Yt;
function km({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, m;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, i = ((m = r.gauge) == null ? void 0 : m.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : wm(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const g = (s - a) / (o - a), f = Yt + g * ym, h = ({ radius: C }) => C * 0.7, p = Ar([{ startAngle: Yt, endAngle: zr }], {
      id: "cv-gauge-track",
      innerRadius: h,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = g > 0 ? [
      p,
      Ar([{ startAngle: Yt, endAngle: f }], {
        id: "cv-gauge-value",
        innerRadius: h,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [p];
    return ct({
      marks: [
        go({
          id: "cv-gauge",
          startAngle: Yt,
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
function wm(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Wo(e, t) {
  for (const n of e) {
    const r = Bo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Cm(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Wo(e, r.value));
  else {
    const s = e[1];
    a = s ? Bo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function Bo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Ko = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: A("cv-table", e), ...t }) })
);
Ko.displayName = "Table";
const Ho = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: A("cv-table-header", e), ...t }));
Ho.displayName = "TableHeader";
const qo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: A("cv-table-body", e), ...t }));
qo.displayName = "TableBody";
const Nn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: A("cv-table-row", e),
      ...t
    }
  )
);
Nn.displayName = "TableRow";
const Uo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: A("cv-table-head", e),
    ...t
  }
));
Uo.displayName = "TableHead";
const Vr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: A("cv-table-cell", e),
    ...t
  }
));
Vr.displayName = "TableCell";
const Nm = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: A("cv-table-caption", e), ...t }));
Nm.displayName = "TableCaption";
const Go = fa(
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
      className: A(Go({ variant: t, size: n }), e),
      ...a
    }
  )
);
ee.displayName = "Button";
function Sm({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => xm(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, d] = b.useState(0), m = r.pageSize ?? 25, g = b.useMemo(() => {
    var N;
    if (!s) return a;
    const w = s.dir === "asc" ? 1 : -1, R = ((N = o.find((M) => M.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((M, T) => _m(M[R], T[R]) * w);
  }, [a, s, o]), f = Math.max(1, Math.ceil(g.length / m)), h = Math.min(u, f - 1), p = g.slice(h * m, h * m + m), k = (w) => {
    c(
      (R) => (R == null ? void 0 : R.member) === w ? { member: w, dir: R.dir === "asc" ? "desc" : "asc" } : { member: w, dir: "desc" }
    ), d(0);
  }, C = g.length > 12;
  return /* @__PURE__ */ y("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ y(Ko, { children: [
      /* @__PURE__ */ l(Ho, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(Nn, { children: o.map((w) => /* @__PURE__ */ l(
        Uo,
        {
          className: yi(w.align),
          style: w.width ? { width: w.width } : void 0,
          children: /* @__PURE__ */ y(
            ee,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(w.member),
              children: [
                w.label,
                /* @__PURE__ */ l(Om, { active: (s == null ? void 0 : s.member) === w.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        w.member
      )) }) }),
      /* @__PURE__ */ y(qo, { children: [
        p.map((w, R) => /* @__PURE__ */ l(Nn, { children: o.map((N) => {
          const M = Am(N.member, w[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Vr,
            {
              className: A(yi(N.align), C && "cv-table-cell--compact"),
              style: M ? { color: M } : void 0,
              children: N.render(w[N.key])
            },
            N.member
          );
        }) }, R)),
        p.length === 0 && /* @__PURE__ */ l(Nn, { children: /* @__PURE__ */ l(
          Vr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    g.length > m && /* @__PURE__ */ y("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ y("span", { children: [
        h * m + 1,
        "–",
        Math.min((h + 1) * m, g.length),
        " of",
        " ",
        g.length
      ] }),
      /* @__PURE__ */ y("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((w) => Math.max(0, w - 1)),
            disabled: h === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          ee,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((w) => Math.min(f - 1, w + 1)),
            disabled: h >= f - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function xm(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Rm(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = Pr(e, c), d = t ? Tm(t, c) : void 0, m = t ? c in t.measures : !1, g = s.label ?? (d == null ? void 0 : d.shortTitle) ?? (d == null ? void 0 : d.title) ?? c, f = s.align ?? (m ? "right" : "left"), h = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: g,
      align: f,
      width: s.width,
      render: (p) => Mm(p, m, c, h)
    };
  });
}
function Mm(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Rm(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Tm(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function yi(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Om({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(ca, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(ua, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Fl, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function _m(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Am(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Dm(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Dm(e, t, n) {
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
const ht = "cv-sidebar--default", Em = "cv-sidebar--wide", Yo = "a date or category", gr = [
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
    hint: Yo,
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
], Lm = [
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
    hint: Yo,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Fm = [
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
], Im = [
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
], $m = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Pm = [
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
], zm = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], Xe = (e) => zm.indexOf(e), Ge = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: lo,
    order: Xe("bar"),
    component: Yu,
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
    icon: Wl,
    order: Xe("line"),
    component: Qu,
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
    icon: Il,
    order: Xe("area"),
    component: Ju,
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
    icon: jl,
    order: Xe("pie"),
    component: em,
    optionsSchema: Qe.pie,
    defaults: Je.pie,
    wells: Fm,
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
    icon: Vl,
    order: Xe("scatter"),
    component: nm,
    optionsSchema: Qe.scatter,
    defaults: Je.scatter,
    wells: Im,
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
    icon: zl,
    order: Xe("kpi"),
    component: mm,
    optionsSchema: Qe.kpi,
    defaults: Je.kpi,
    wells: $m,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Em
  },
  table: {
    family: "table",
    label: "Table",
    icon: Pl,
    order: Xe("table"),
    component: Sm,
    optionsSchema: Qe.table,
    defaults: Je.table,
    wells: Pm,
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
    icon: $l,
    order: Xe("heatmap"),
    component: lm,
    optionsSchema: Qe.heatmap,
    defaults: Je.heatmap,
    wells: Lm,
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
}, Vm = Ge.bar, jm = Ge.line, Wm = Ge.area, Bm = Ge.pie, Km = Ge.scatter, Hm = Ge.heatmap, qm = Ge.kpi, Um = Ge.table, Oa = [
  Vm,
  jm,
  Wm,
  Bm,
  Km,
  Hm,
  qm,
  Um
], Gm = v.any();
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? Vu;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? Gm;
    },
    resolveOptions: (o) => ju(o, i.defaults(o.family))
  };
  return i;
}
const er = _a(Oa);
function Ym(e, t = er) {
  return t.resolveOptions(e);
}
const ki = {
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
function Qo(e) {
  return e ? { ...ki, ...e } : ki;
}
function Aa(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function Qm(e) {
  const t = Math.floor(e ?? Cn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Jm(e, t) {
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
function Xm(e) {
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
function Zm(e, t) {
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
function ed(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function td(e, t, n) {
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
function nd(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Zm(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: ed(o.meta)
      }))
    };
  }
  const a = Qm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Jm(i.data, a) : Xm(i.data)
    }))
  };
}
function rd(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Zy = Object.fromEntries(
  Object.entries(Ge).map(([e, t]) => [e, t.component])
);
function Jo({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = er,
  theme: u
}) {
  const d = ae(() => Ym(t, c), [t, c]), m = ae(() => Qo(u), [u]), g = c.get(d.family), f = (g == null ? void 0 : g.queryless) ?? !1, h = Aa(g) ? d.transform : void 0, p = ae(() => nd(e, h), [e, h]);
  if (!f && (a != null && a.loading))
    return /* @__PURE__ */ l(gu, { className: "cv-chart-skeleton" });
  if (!f && (a != null && a.error))
    return /* @__PURE__ */ y(Yn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(ma, {}),
      /* @__PURE__ */ l(Qn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Jn, { children: a.error.message })
    ] });
  if (!f && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : rd(p), C = td(
    r ?? ba(e.raw.annotation, d, va),
    h
  ), w = (i == null ? void 0 : i[d.family]) ?? c.require(d.family).component;
  return /* @__PURE__ */ l(
    w,
    {
      data: p,
      options: d,
      config: k,
      format: C,
      theme: m,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const tr = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], vr = 8;
function wi(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Xo(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : tr, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, i = /* @__PURE__ */ new Set();
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
function Ci(e, t) {
  const n = Xo(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function ad(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function yn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = ad(e[n]);
  return t;
}
function id(e) {
  return {
    measures: yn(e.measures ?? {}),
    dimensions: yn(e.dimensions ?? {}),
    segments: yn(e.segments ?? {}),
    timeDimensions: yn(e.timeDimensions ?? {})
  };
}
function Lt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function nr(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function od(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function sd(e, t) {
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
function ld(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = rr(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function cd(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Zo(e, t, n, r, a = er) {
  const i = id(e.annotation()), o = sd(i, r), s = ld(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const m = n.measures ?? [];
    if (a.require(t.family).measureOnly && m.length > 0) {
      const g = s[0] ?? {}, f = [
        {
          key: "value",
          label: "Value",
          data: m.map((p) => rr(g[p])),
          meta: { ...nr(Lt(i, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return Ci(f, t.colors), {
        categories: m.map(
          (p) => {
            var k, C;
            return ((k = Lt(i, p)) == null ? void 0 : k.shortTitle) ?? ((C = Lt(i, p)) == null ? void 0 : C.title) ?? p;
          }
        ),
        series: f,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || wi(f)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? md(e, c.series, t, i) : fd(e, c.category.member, c.series, t, i), d = ud(e, c);
  return cd(u, o), Ci(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || wi(u)
  };
}
function ud(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function md(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = Lt(r, s), u = i == null ? void 0 : i[s], d = o.map((m) => rr(m[s]));
    return {
      key: s,
      label: od(c, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...nr(c, u, n.format), measure: s }
    };
  });
}
function dd(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function fd(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), d = c.length > 1, m = { x: [t], y: [s, "measures"] }, f = e.seriesNames(m).filter((N) => {
    const M = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : void 0;
    return M === void 0 || u.has(M);
  }), h = e.chartPivot(m), p = Lt(a, i), k = a.dimensions[s], C = (k == null ? void 0 : k.type) === "boolean", w = (k == null ? void 0 : k.shortTitle) ?? (k == null ? void 0 : k.title) ?? s, R = f.map((N) => {
    var V, I;
    const M = (V = N.yValues) == null ? void 0 : V[0], T = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : i, E = Lt(a, T), B = (I = n.meta) == null ? void 0 : I[T], j = (B == null ? void 0 : B.label) ?? (E == null ? void 0 : E.shortTitle) ?? (E == null ? void 0 : E.title) ?? T, D = M ?? N.shortTitle ?? N.title ?? N.key, O = C ? dd(D) : void 0, z = O ? `${w}: ${O}` : D, F = d ? `${j} · ${z}` : z, $ = h.map((Q) => rr(Q[N.key]));
    return {
      key: N.key,
      label: F,
      data: $,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...nr(E ?? p, B, r.format),
        measure: T
      }
    };
  });
  return hd(R, p, r.format);
}
function hd(e, t, n) {
  var d, m, g;
  if (e.length <= vr) return e;
  const r = (f) => f.data.reduce((h, p) => h + (p ?? 0), 0), a = [...e].sort((f, h) => r(h) - r(f)), i = a.slice(0, vr - 1), o = a.slice(vr - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: s }, (f, h) => {
    let p = 0, k = !1;
    for (const C of o) {
      const w = C.data[h];
      w !== null && (p += w, k = !0);
    }
    return k ? p : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...nr(t, void 0, n), ...(g = (m = i[0]) == null ? void 0 : m.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function rr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ie = (e) => ye(e, "yyyy-MM-dd");
function pd(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ie(t), ie(t)];
  if (n === "yesterday") {
    const o = Me(t, 1);
    return [ie(o), ie(o)];
  }
  if (n === "this week") return [ie(_n(t)), ie(An(t))];
  if (n === "this month") return [ie(gt(t)), ie(en(t))];
  if (n === "this quarter") return [ie(vt(t)), ie(tn(t))];
  if (n === "this year") return [ie(bt(t)), ie(nn(t))];
  if (n === "last week") {
    const o = Or(t, 1);
    return [ie(_n(o)), ie(An(o))];
  }
  if (n === "last month") {
    const o = yt(t, 1);
    return [ie(gt(o)), ie(en(o))];
  }
  if (n === "last quarter") {
    const o = kt(t, 1);
    return [ie(vt(o)), ie(tn(o))];
  }
  if (n === "last year") {
    const o = wt(t, 1);
    return [ie(bt(o)), ie(nn(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ie(Me(t, a - 1)), ie(t)] : i.startsWith("week") ? [ie(Me(t, a * 7 - 1)), ie(t)] : i.startsWith("month") ? [ie(gt(yt(t, a))), ie(en(yt(t, 1)))] : i.startsWith("quarter") ? [ie(vt(kt(t, a))), ie(tn(kt(t, 1)))] : [ie(bt(wt(t, a))), ie(nn(wt(t, 1)))];
}
function es(e) {
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
function ts(e) {
  const t = Da(e);
  return t === void 0 ? void 0 : es(t);
}
function Ea(e) {
  const t = Da(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function zt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const gd = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function vd(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function dn(e, t, n) {
  var r;
  if (Se(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function bd(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = dn(o, t, n);
    if (!zt(s))
      if (Array.isArray(s))
        for (const c of s)
          zt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? pd(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function yd(e, t, n) {
  if ("and" in e) {
    const r = jr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = jr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return bd(e, t, n);
}
function jr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = yd(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function kd(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const a = dn(e.dateRange, t, n);
    zt(a) || (r.dateRange = a);
  }
  if (e.granularity !== void 0) {
    const a = dn(e.granularity, t, n);
    zt(a) || (r.granularity = a === It ? Ea(r.dateRange) : a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function ns(e, t, n) {
  const r = gd(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => kd(i, r, t))), e.filters !== void 0) {
    const i = jr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = dn(e.limit, r, t);
    zt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = dn(e.offset, r, t);
    zt(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function rs() {
  let e, t;
  return (n, r, a) => {
    const i = ns(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function wd(e, t) {
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
class Cd extends Error {
}
const Nd = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Cd(`"${e}" cannot be parsed into a number`);
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
function Ni(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Sd extends Error {
}
class Si extends Error {
}
class xd extends Error {
}
class br extends Error {
}
class Md extends Error {
}
class Rd {
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
      throw new Si(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ni(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new xd(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
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
      else if (Ni(m))
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
      throw new Si(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const m = this.describe(d);
      if (o.indexOf(d) === -1 && m.system === c) {
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
        throw new Md(`Meausure "${t}" not found.`);
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
    throw new Sd(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Td(e) {
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
function Od(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Td(e);
  return (r) => new Rd({
    measures: e,
    unitCache: n,
    cls: Nd
  }, r);
}
const _d = {
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
}, Ad = {
  systems: {
    metric: _d
  }
}, Dd = {
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
}, Ed = {
  systems: {
    SI: Dd
  }
}, Ld = {
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
}, Fd = {
  systems: {
    SI: Ld
  }
}, Id = {
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
}, $d = {
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
}, Pd = {
  systems: {
    metric: Id,
    imperial: $d
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
}, zd = {
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
}, Vd = {
  systems: {
    SI: zd
  }
}, jd = {
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
}, Wd = {
  systems: {
    SI: jd
  }
}, Bd = {
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
}, Kd = {
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
}, Hd = {
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
}, qd = {
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
}, Ud = {
  systems: {
    bit: Bd,
    byte: Kd,
    IECBit: Hd,
    IECByte: qd
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
}, Gd = {
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
}, Yd = {
  systems: {
    metric: Gd
  }
}, Qd = {
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
}, Jd = {
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
}, Xd = {
  systems: {
    SI: Qd,
    nutrition: Jd
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
}, Zd = {
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
}, ef = {
  systems: {
    SI: Zd
  }
}, tf = {
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
}, nf = {
  systems: {
    SI: tf
  }
}, rf = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, af = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, of = {
  systems: {
    metric: rf,
    imperial: af
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
}, sf = {
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
}, lf = {
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
}, cf = {
  systems: {
    metric: sf,
    imperial: lf
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
}, uf = {
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
}, mf = {
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
}, df = {
  systems: {
    metric: uf,
    imperial: mf
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
}, ff = {
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
}, hf = {
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
}, pf = {
  systems: {
    metric: ff,
    imperial: hf
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
}, gf = {
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
}, vf = {
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
}, bf = {
  systems: {
    metric: gf,
    imperial: vf
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
}, yf = {
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
}, kf = {
  systems: {
    SI: yf
  }
}, wf = {
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
}, Cf = {
  systems: {
    unit: wf
  }
}, Nf = {
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
}, Sf = {
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
}, xf = {
  systems: {
    metric: Nf,
    imperial: Sf
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
}, Mf = {
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
}, Rf = {
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
}, Tf = {
  systems: {
    metric: Mf,
    imperial: Rf
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
}, Of = {
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
}, _f = {
  systems: {
    SI: Of
  }
}, Af = {
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
}, Df = {
  systems: {
    SI: Af
  }
}, Ef = {
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
}, Lf = {
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
}, Ff = {
  systems: {
    metric: Ef,
    imperial: Lf
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
}, If = {
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
}, $f = {
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
}, Pf = {
  systems: {
    metric: If,
    imperial: $f
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
}, zf = {
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
}, Vf = {
  systems: {
    SI: zf
  }
}, jf = {
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
}, Wf = {
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
}, Bf = {
  systems: {
    metric: jf,
    imperial: Wf
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
}, Kf = {
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
}, Hf = {
  systems: {
    SI: Kf
  }
}, qf = {
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
}, Uf = {
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
}, Gf = {
  systems: {
    metric: qf,
    imperial: Uf
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
}, Yf = {
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
}, Qf = {
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
}, Jf = {
  systems: {
    metric: Yf,
    imperial: Qf
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
}, Xf = {
  acceleration: Ad,
  angle: Ed,
  apparentPower: Fd,
  area: Pd,
  charge: Vd,
  current: Wd,
  digital: Ud,
  each: Yd,
  energy: Xd,
  force: ef,
  frequency: nf,
  illuminance: of,
  length: cf,
  mass: df,
  massFlowRate: pf,
  pace: bf,
  partsPer: kf,
  pieces: Cf,
  power: xf,
  pressure: Tf,
  reactiveEnergy: _f,
  reactivePower: Df,
  speed: Ff,
  torque: Bf,
  temperature: Pf,
  time: Vf,
  voltage: Hf,
  volume: Gf,
  volumeFlowRate: Jf
}, Zf = Od(Xf), eh = {
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
function th(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Zf(t).from(e.from).to(e.to)
  };
}
const Wr = {
  ...Object.fromEntries(
    Object.entries(eh).map(([e, t]) => [e, th(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function ar(e) {
  return e ? { ...Wr, ...e } : Wr;
}
function nh(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function rh(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function ah(e) {
  return e != null && e.quantity ? rh(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const ih = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function as(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function xi(e, t) {
  const n = e * (ih[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${as(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function yr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return as((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function oh(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Mi(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function is(e = Wr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return va(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return xi(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const d = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Mi(yr(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return xi(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Mi(yr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? oh(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${yr(n, t)}${u}`;
  };
}
const os = b.createContext(null);
function sh({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(os.Provider, { value: e, children: t });
}
function ss() {
  return b.useContext(os) ?? void 0;
}
const ir = Ji(null);
ir.displayName = "CubeVizContext";
function Ke() {
  const e = oa(ir);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function dt() {
  return Ke().families;
}
function lh(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function e0({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((w) => w.family).join("|"), u = ae(
    () => _a(Oa, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), d = ae(
    () => lh(e) ? hu(e) : e,
    [e]
  ), m = ae(
    () => {
      var w;
      return {
        chartRamp: (w = t == null ? void 0 : t.chartRamp) != null && w.length ? t.chartRamp : tr,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Qo(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), g = ae(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), f = ae(() => a ?? {}, [a]), h = ae(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), p = ae(
    () => ({
      cubeClient: d,
      registry: f,
      families: u,
      locale: g,
      theme: m,
      maps: h
    }),
    [d, f, u, g, m, h]
  ), [k, C] = Ct(null);
  return /* @__PURE__ */ l(ir.Provider, { value: p, children: /* @__PURE__ */ l(
    "div",
    {
      ref: C,
      className: A(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(sh, { container: k, children: /* @__PURE__ */ l(
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
  const n = Ke(), r = (e ?? []).map((i) => i.family).join("|"), a = ae(() => !e || e.length === 0 ? n : { ...n, families: _a(Oa, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(be, { children: t }) : /* @__PURE__ */ l(ir.Provider, { value: a, children: t });
}
function ch(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const uh = 5e3;
function ls(e, t) {
  const { cubeClient: n } = Ke(), r = (t == null ? void 0 : t.skip) ?? !1, a = ae(
    () => e.limit === void 0 ? { ...e, limit: uh } : e,
    [e]
  ), i = ae(() => JSON.stringify(a), [a]), [o, s] = Ct({ isLoading: !r }), [c, u] = Ct(0), d = nt(() => u((m) => m + 1), []);
  return hn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let m = !0;
    const g = new AbortController();
    return s((f) => ({ resultSet: f.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: g.signal }).then((f) => {
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
  }, [n, i, r, c]), { ...o, refetch: d };
}
const or = Ji(null);
or.displayName = "DashboardContext";
function Fa({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = pt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: wd(r, t), key: r });
  const i = a.current.store, o = mh(i, r);
  return vl(or.Provider, { value: o }, n);
}
function mh(e, t) {
  const n = nt(
    (i, o) => e.set(i, o),
    [e]
  ), r = nt(
    (i) => ns(i, e.getAll(), t),
    [e, t]
  ), a = nt(
    (i) => vd(i, e.getAll(), t),
    [e, t]
  );
  return ae(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function dh(e) {
  const t = Xi(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function cs() {
  const e = oa(or);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return dh(e);
}
function gn() {
  return oa(or);
}
const fh = () => () => {
}, hh = Object.freeze({}), ph = Object.freeze([]);
function kr(e, t, n) {
  var R;
  const r = gn(), { locale: a } = Ke(), i = dt(), o = pt(null);
  o.current === null && (o.current = rs());
  const s = o.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), d = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? hh,
    (r == null ? void 0 : r.decls) ?? ph
  ) : e, m = Xi(
    u && r ? r.store.subscribe : fh,
    d,
    d
  ), { resultSet: g, isLoading: f, error: h, refetch: p } = ls(m, { skip: n == null ? void 0 : n.skip }), k = ((R = t.format) == null ? void 0 : R.unitSystem) ?? (a == null ? void 0 : a.unitSystem), C = ae(() => ar(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ae(() => {
    if (g)
      return Zo(g, t, m, { unitSystem: k, conversions: C }, i);
  }, [g, t, m, k, C, i]), isLoading: f, error: h, refetch: p, resolvedQuery: m };
}
function ft() {
  const { cubeClient: e } = Ke(), [t, n] = Ct({ isLoading: !0 });
  return hn(() => {
    let r = !0;
    return n({ isLoading: !0 }), pu(e).then((a) => {
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
function sr() {
  const { locale: e } = Ke(), t = b.useMemo(() => ar(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return b.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function t0() {
  const { locale: e } = Ke(), { formatValue: t, units: n } = e;
  return ae(
    () => t ?? is(ar(n)),
    [t, n]
  );
}
function us() {
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
      const m = new ResizeObserver((g) => {
        var f, h;
        for (const p of g) {
          const k = ((h = (f = p.contentBoxSize) == null ? void 0 : f[0]) == null ? void 0 : h.inlineSize) ?? p.contentRect.width;
          o(k);
        }
      });
      m.observe(u), r.current = m;
    },
    [o, s]
  );
  return hn(() => s, [s]), [c, e];
}
const gh = "day";
function vh(e, t) {
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
        granularity: r.granularity ?? gh,
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
const re = (e) => ye(e, "yyyy-MM-dd");
function bh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = On(e[0]), i = On(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = El(i, a) + 1;
    return [re(Me(a, o)), re(Me(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = Me(t, 1);
    return [re(a), re(a)];
  }
  if (n === "yesterday") {
    const a = Me(t, 2);
    return [re(a), re(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [re(Me(t, 2 * a - 1)), re(Me(t, a))];
    if (i.startsWith("week")) return [re(Me(t, 14 * a - 1)), re(Me(t, 7 * a))];
    if (i.startsWith("month"))
      return [re(gt(yt(t, 2 * a))), re(Me(gt(yt(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [re(vt(kt(t, 2 * a))), re(Me(vt(kt(t, a)), 1))];
    if (i.startsWith("year"))
      return [re(bt(wt(t, 2 * a))), re(Me(bt(wt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = Or(t, 1);
    return [re(_n(a)), re(An(a))];
  }
  if (n === "this month") {
    const a = yt(t, 1);
    return [re(gt(a)), re(en(a))];
  }
  if (n === "this quarter") {
    const a = kt(t, 1);
    return [re(vt(a)), re(tn(a))];
  }
  if (n === "this year") {
    const a = wt(t, 1);
    return [re(bt(a)), re(nn(a))];
  }
  if (n === "last week") {
    const a = Or(t, 2);
    return [re(_n(a)), re(An(a))];
  }
  if (n === "last month") {
    const a = yt(t, 2);
    return [re(gt(a)), re(en(a))];
  }
  if (n === "last quarter") {
    const a = kt(t, 2);
    return [re(vt(a)), re(tn(a))];
  }
  if (n === "last year") {
    const a = wt(t, 2);
    return [re(bt(a)), re(nn(a))];
  }
}
function yh(e, t, n = er) {
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
  const s = bh(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const kh = {
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
  const { registry: c, locale: u, theme: d } = Ke(), m = dt(), g = ((V = m.get(t.family)) == null ? void 0 : V.queryless) ?? !1, f = ae(() => {
    var I;
    return (I = t.format) != null && I.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), h = ae(() => {
    const I = e ?? {};
    return I.timezone || !(u != null && u.timezone) ? I : { ...I, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: p, isLoading: k, error: C, refetch: w, resolvedQuery: R } = kr(
    h,
    f,
    { skip: g }
  ), N = ae(() => vh(h, f), [h, f]), M = kr(
    (N == null ? void 0 : N.query) ?? h,
    (N == null ? void 0 : N.chart) ?? f,
    { skip: !N }
  ), T = ae(
    () => yh(R, f, m),
    [R, f, m]
  ), E = kr(
    (T == null ? void 0 : T.query) ?? h,
    f,
    { skip: !T, skipResolve: !0 }
  ), B = ae(
    () => ({ [f.family]: ch(c, f.family, m) }),
    [c, f.family, m]
  ), j = ae(() => {
    let I = p ?? kh;
    if (N && M.data) {
      I = { ...I, series: M.data.series, categories: M.data.categories };
      const Q = I.raw.rows.length > 0, te = I.series.some((U) => U.data.some((oe) => oe !== null));
      I = { ...I, empty: !Q && !te };
    }
    if (T && E.data) {
      if (T.mode === "kpiRow") {
        const Q = E.data.raw.rows[0];
        if (Q) {
          const te = I.raw.rows[0];
          I = {
            ...I,
            raw: { ...I.raw, rows: te ? [te, Q] : [Q] }
          };
        }
      } else if (!E.data.empty) {
        const Q = new Map(E.data.series.map((te) => [te.key, te]));
        if (!I.empty && I.series.length > 0) {
          const te = I.categories.length, U = I.series.map((oe) => {
            const me = Q.get(oe.key), le = Array.from({ length: te }, (pe, ge) => (me == null ? void 0 : me.data[ge]) ?? null);
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
          const te = E.data.series.map((U) => ({
            ...U,
            key: `${U.key}__prev`,
            label: `${U.label} (prev)`,
            data: [...U.data],
            meta: { ...U.meta, companion: !0 }
          }));
          I = {
            ...I,
            categories: E.data.categories,
            series: te,
            empty: !1
          };
        }
      }
    }
    return I;
  }, [p, N, M.data, T, E.data]);
  hn(() => {
    n == null || n({ rows: j.raw.rows, refetch: w, isLoading: k });
  }, [n, j.raw.rows, w, k]);
  const D = {}, O = ae(
    () => u.formatValue ?? is(ar(u.units)),
    [u.formatValue, u.units]
  ), z = ae(
    () => ba(j.raw.annotation, f, O, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [j.raw.annotation, f, O, u.locale, u.unitSystem]
  ), F = f.mapping, $ = ae(
    () => ({
      categoryMember: F == null ? void 0 : F.category.member,
      pivotMember: (F == null ? void 0 : F.series.mode) === "pivot" ? F.series.pivot : void 0,
      formatCategory: z.category
    }),
    [F, z]
  );
  return /* @__PURE__ */ l(
    ka,
    {
      widgetId: i,
      target: $,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Jo,
        {
          data: j,
          options: f,
          config: D,
          format: z,
          state: g ? { loading: !1 } : { loading: k && !p, error: C },
          components: B,
          registry: m,
          theme: d.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function wh({
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
const ms = "cube-viz-prose";
function Ch(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Nh({ doc: e }) {
  const t = Ch(e), n = ae(
    () => t ? e : null,
    [t, e]
  ), r = bo(
    {
      extensions: [ko],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: A(ms) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(yo, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Sn = [
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
], Sh = Object.fromEntries(
  Sn.map((e) => [e.value, e.label])
);
function Ri(e) {
  return Sh[e.trim().toLowerCase()] ?? e;
}
const xh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Mh({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Nc(), a = A(Go({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ y("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: A(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(da, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: ye(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: A(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Gn, {})
      }
    )
  ] });
}
function Rh({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: A(
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
function ds({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Cc,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: A("cv-cal", e),
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
        MonthCaption: Mh,
        DayButton: Rh,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? da : Gn, { className: A("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Pe({
  ...e
}) {
  return /* @__PURE__ */ l(Dn.Root, { "data-slot": "popover", ...e });
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ l(Dn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ve({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = ss();
  return /* @__PURE__ */ l(Dn.Portal, { container: a, children: /* @__PURE__ */ l(
    Dn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: A("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Le({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Root, { "data-slot": "select", ...e });
}
function Br({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Group, { "data-slot": "select-group", ...e });
}
function Fe({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Value, { "data-slot": "select-value", ...e });
}
function Ie({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ y(
    Te.Trigger,
    {
      "data-slot": "select-trigger",
      className: A("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Te.Icon, { asChild: !0, children: /* @__PURE__ */ l(ut, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Th({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Te.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: A("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Bl, {})
    }
  );
}
function Oh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Te.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: A("cv-select-scroll-btn", e),
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
  const a = ss();
  return /* @__PURE__ */ l(Te.Portal, { container: a, children: /* @__PURE__ */ y(
    Te.Content,
    {
      "data-slot": "select-content",
      className: A(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Th, {}),
        /* @__PURE__ */ l(
          Te.Viewport,
          {
            className: A(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Oh, {})
      ]
    }
  ) });
}
function Kr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Te.Label,
    {
      "data-slot": "select-label",
      className: A("cv-select-label", e),
      ...t
    }
  );
}
function ke({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ y(
    Te.Item,
    {
      "data-slot": "select-item",
      className: A("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Te.ItemIndicator, { children: /* @__PURE__ */ l(Wt, {}) }) }),
        /* @__PURE__ */ l(Te.ItemText, { children: t })
      ]
    }
  );
}
const Vt = "cv-field", _h = "cv-field-label", Qt = "yyyy-MM-dd";
function Ah(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ti(e) {
  if (!e) return;
  const t = io(e, Qt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Dh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? xh, [i, o] = Ct(!1), s = typeof e == "string", [c, u] = Ah(e), d = Ti(c), m = Ti(u), g = d ? { from: d, to: m } : void 0;
  let f;
  s ? f = Ri(e) : d && m ? f = `${ye(d, "MMM d, yyyy")} – ${ye(m, "MMM d, yyyy")}` : d ? f = ye(d, "MMM d, yyyy") : f = "Pick a date range";
  const h = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ y(Pe, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(
      ee,
      {
        variant: "outline",
        className: A(
          "cv-daterange-trigger",
          f === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(co, {}),
          f
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
          children: Ri(p)
        },
        p
      )) }),
      /* @__PURE__ */ l(
        ds,
        {
          mode: "range",
          selected: g,
          defaultMonth: d,
          disabled: h,
          onSelect: (p) => {
            p != null && p.from && p.to ? t([ye(p.from, Qt), ye(p.to, Qt)]) : p != null && p.from ? t([ye(p.from, Qt), ye(p.from, Qt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Eh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Lh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = cs(), i = r.rangeVariable ? Da(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? es(i) : Eh), s = typeof e == "string" ? e : "", c = o.join(",");
  return hn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ y(
    Le,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Ie, { className: Vt, children: /* @__PURE__ */ l(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ l($e, { children: o.map((u) => /* @__PURE__ */ l(ke, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Fh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: A(Vt, "cv-field--multi"),
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
        /* @__PURE__ */ l($e, { children: r.options.map((i) => /* @__PURE__ */ l(ke, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Ih({
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
function $h({ value: e, onChange: t, control: n }) {
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
function Ph({ value: e, onChange: t, control: n }) {
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
function zh({ value: e, onChange: t, decl: n }) {
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
const Vh = {
  dateRange: Dh,
  granularity: Lh,
  select: Fh,
  memberSelect: Ih,
  text: $h,
  number: Ph,
  toggle: zh
};
function jh({ control: e, title: t }) {
  var f;
  const { registry: n } = Ke(), { decls: r, resolveValue: a, setVar: i } = cs(), o = ae(
    () => r.find((h) => h.name === e.variable),
    [r, e.variable]
  ), s = bl();
  if (!o)
    return /* @__PURE__ */ y("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((f = n.controls) == null ? void 0 : f[c]) ?? Vh[c], d = a(e.variable), m = (h) => i(e.variable, h), g = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: d, onChange: m, decl: o, control: e.control }) : /* @__PURE__ */ y("div", { children: [
    /* @__PURE__ */ l("label", { className: _h, htmlFor: s, children: g }),
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
const fs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: A(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
fs.displayName = "Card";
const hs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: A(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
hs.displayName = "CardHeader";
const ps = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: A("cv-card-title", e),
      ...t
    }
  )
);
ps.displayName = "CardTitle";
const Wh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-description", e), ...t })
);
Wh.displayName = "CardDescription";
const Bh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: A("cv-card-action", e),
      ...t
    }
  )
);
Bh.displayName = "CardAction";
const gs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-content", e), ...t })
);
gs.displayName = "CardContent";
const Kh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-footer", e), ...t })
);
Kh.displayName = "CardFooter";
const Pn = "cube-viz-drag-handle";
function vs(e) {
  var s;
  const { registry: t } = Ke(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ y(fs, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ y(
      hs,
      {
        ...i,
        className: A(Pn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(ps, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(gs, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class Oi extends yl {
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
    return n ? /* @__PURE__ */ y(Yn, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(ma, {}),
      /* @__PURE__ */ l(Qn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Jn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Hh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function qh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Uh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Gh = /* @__PURE__ */ (() => {
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
function bs(e = {}) {
  return Tt || (e.includeStyleProperties ? (Tt = e.includeStyleProperties, Tt) : (Tt = rt(window.getComputedStyle(document.documentElement)), Tt));
}
function zn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Yh(e) {
  const t = zn(e, "border-left-width"), n = zn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Qh(e) {
  const t = zn(e, "border-top-width"), n = zn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function ys(e, t = {}) {
  const n = t.width || Yh(e), r = t.height || Qh(e);
  return { width: n, height: r };
}
function Jh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ae = 16384;
function Xh(e) {
  (e.width > Ae || e.height > Ae) && (e.width > Ae && e.height > Ae ? e.width > e.height ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae) : e.width > Ae ? (e.height *= Ae / e.width, e.width = Ae) : (e.width *= Ae / e.height, e.height = Ae));
}
function Vn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Zh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function ep(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Zh(a);
}
const Oe = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Oe(n, t);
};
function tp(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function np(e, t) {
  return bs(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function rp(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? tp(n) : np(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function _i(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = Gh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(rp(o, n, a, r)), t.appendChild(s);
}
function ap(e, t, n) {
  _i(e, t, ":before", n), _i(e, t, ":after", n);
}
const Ai = "application/font-woff", Di = "image/jpeg", ip = {
  woff: Ai,
  woff2: Ai,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Di,
  jpeg: Di,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function op(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function $a(e) {
  const t = op(e).toLowerCase();
  return ip[t] || "";
}
function sp(e) {
  return e.split(/,/)[1];
}
function Hr(e) {
  return e.search(/^(data:)/) !== -1;
}
function lp(e, t) {
  return `data:${t};base64,${e}`;
}
async function ks(e, t, n) {
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
function cp(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Pa(e, t, n) {
  const r = cp(e, t, n.includeQueryParams);
  if (wr[r] != null)
    return wr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await ks(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), sp(s)));
    a = lp(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return wr[r] = a, a;
}
async function up(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Vn(t);
}
async function mp(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Vn(s);
  }
  const n = e.poster, r = $a(n), a = await Pa(n, r, t);
  return Vn(a);
}
async function dp(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await lr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function fp(e, t) {
  return Oe(e, HTMLCanvasElement) ? up(e) : Oe(e, HTMLVideoElement) ? mp(e, t) : Oe(e, HTMLIFrameElement) ? dp(e, t) : e.cloneNode(ws(e));
}
const hp = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", ws = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function pp(e, t, n) {
  var r, a;
  if (ws(t))
    return t;
  let i = [];
  return hp(e) && e.assignedNodes ? i = rt(e.assignedNodes()) : Oe(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = rt(e.contentDocument.body.childNodes) : i = rt(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Oe(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => lr(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function gp(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : bs(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Oe(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function vp(e, t) {
  Oe(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Oe(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function bp(e, t) {
  if (Oe(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function yp(e, t, n) {
  return Oe(t, Element) && (gp(e, t, n), ap(e, t, n), vp(e, t), bp(e, t)), t;
}
async function kp(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await lr(u, t, !0));
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
async function lr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => fp(r, t)).then((r) => pp(e, r, t)).then((r) => yp(e, r, t)).then((r) => kp(r, t));
}
const Cs = /url\((['"]?)([^'"]+?)\1\)/g, wp = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Cp = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Np(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Sp(e) {
  const t = [];
  return e.replace(Cs, (n, r, a) => (t.push(a), n)), t.filter((n) => !Hr(n));
}
async function xp(e, t, n, r, a) {
  try {
    const i = n ? Uh(t, n) : t, o = $a(t);
    let s;
    return a || (s = await Pa(i, o, r)), e.replace(Np(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Mp(e, { preferredFontFormat: t }) {
  return t ? e.replace(Cp, (n) => {
    for (; ; ) {
      const [r, , a] = wp.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Ns(e) {
  return e.search(Cs) !== -1;
}
async function Ss(e, t, n) {
  if (!Ns(e))
    return e;
  const r = Mp(e, n);
  return Sp(r).reduce((i, o) => i.then((s) => xp(s, o, t, n)), Promise.resolve(r));
}
async function Ot(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Ss(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Rp(e, t) {
  await Ot("background", e, t) || await Ot("background-image", e, t), await Ot("mask", e, t) || await Ot("-webkit-mask", e, t) || await Ot("mask-image", e, t) || await Ot("-webkit-mask-image", e, t);
}
async function Tp(e, t) {
  const n = Oe(e, HTMLImageElement);
  if (!(n && !Hr(e.src)) && !(Oe(e, SVGImageElement) && !Hr(e.href.baseVal)))
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
async function Op(e, t) {
  const r = rt(e.childNodes).map((a) => xs(a, t));
  await Promise.all(r).then(() => e);
}
async function xs(e, t) {
  Oe(e, Element) && (await Rp(e, t), await Tp(e, t), await Op(e, t));
}
function _p(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ei = {};
async function Li(e) {
  let t = Ei[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ei[e] = t, t;
}
async function Fi(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), ks(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function Ii(e) {
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
async function Ap(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        rt(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = Li(c).then((d) => Fi(d, t)).then((d) => Ii(d).forEach((m) => {
              try {
                a.insertRule(m, m.startsWith("@import") ? s += 1 : a.cssRules.length);
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
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(Li(a.href).then((s) => Fi(s, t)).then((s) => Ii(s).forEach((c) => {
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
function Dp(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Ns(t.style.getPropertyValue("src")));
}
async function Ep(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = rt(e.ownerDocument.styleSheets), r = await Ap(n, t);
  return Dp(r);
}
function Ms(e) {
  return e.trim().replace(/["']/g, "");
}
function Lp(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Ms(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Fp(e, t) {
  const n = await Ep(e, t), r = Lp(e);
  return (await Promise.all(n.filter((i) => r.has(Ms(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Ss(i.cssText, o, t);
  }))).join(`
`);
}
async function Ip(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Fp(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function $p(e, t = {}) {
  const { width: n, height: r } = ys(e, t), a = await lr(e, t, !0);
  return await Ip(a, t), await xs(a, t), _p(a, t), await ep(a, n, r);
}
async function Pp(e, t = {}) {
  const { width: n, height: r } = ys(e, t), a = await $p(e, t), i = await Vn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Jh(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return o.width = u * c, o.height = d * c, t.skipAutoScale || Xh(o), o.style.width = `${u}`, o.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function zp(e, t = {}) {
  return (await Pp(e, t)).toDataURL();
}
function Vp(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function jp(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Wp(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Bp(e, t, n = 2) {
  const r = await zp(e, {
    pixelRatio: n,
    backgroundColor: Wp(e),
    cacheBust: !0
  });
  jp(r, `${Vp(t)}.png`);
}
function Kp({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const d = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    qh(Hh(t), `${h}.csv`);
  }, m = async () => {
    const h = r == null ? void 0 : r.current;
    if (!(!h || a)) {
      i(!0), s(null);
      try {
        await Bp(h, e);
      } catch (p) {
        s(p instanceof Error ? p.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (h) => h.stopPropagation(), f = (h = !0) => A("cv-menu-item", !h && "cv-menu-item--disabled");
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ l(
      ze,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Kl, {})
      }
    ),
    /* @__PURE__ */ y(Ve, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ y("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ l(Hl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ y("button", { type: "button", onClick: m, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ l(ql, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ y("button", { type: "button", onClick: d, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ l(Ul, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function $i({
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
      return /* @__PURE__ */ l(Nh, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(jh, { control: e.control, title: e.title });
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
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Oi, { children: /* @__PURE__ */ l($i, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Kp,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    vs,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Oi, { children: /* @__PURE__ */ l(
        $i,
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
const Rs = (e) => e.filter((t) => t.type === "chart");
function Hp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of Rs(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Se(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function qp(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(Se);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of Rs(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Up({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = gn(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => Hp(e.widgets), [e.widgets]), c = b.useMemo(() => qp(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const d = b.useCallback(
    (h) => {
      var p, k;
      if (o) {
        const C = h != null && h.widgetId ? s.get(h.widgetId) : void 0;
        if (C) o(C, h ? [h.from, h.to] : void 0);
        else if (!h) for (const w of new Set(s.values())) o(w, void 0);
      }
      (k = (p = u.current).onRangeSelect) == null || k.call(p, h);
    },
    [o, s]
  ), m = b.useCallback(
    (h) => {
      var p, k;
      if (o)
        if (h) {
          const C = c.get(h.member);
          C && o(C, [String(h.value)]);
        } else
          for (const C of new Set(c.values())) o(C, void 0);
      (k = (p = u.current).onPointSelect) == null || k.call(p, h);
    },
    [o, c]
  ), g = !!(n || t && o && s.size), f = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    ka,
    {
      onRangeSelect: g ? d : void 0,
      onPointSelect: f ? m : void 0,
      children: a
    }
  );
}
const Gp = "lg", Yp = 640;
function Qp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Jp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function n0({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = us(), c = e.grid ?? {}, u = c.cols ?? 12, d = c.rowHeight ?? 40, m = c.margin ?? [12, 12], g = c.containerPadding ?? m, f = ae(
    () => ({ [Gp]: Jp(e.layout) }),
    [e.layout]
  ), h = ae(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), p = !t && s > 0 && s < Yp;
  return /* @__PURE__ */ l(La, { families: n, children: /* @__PURE__ */ l(Fa, { spec: e, children: /* @__PURE__ */ l(
    Up,
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
            padding: `${g[1]}px ${g[0]}px`
          },
          children: Qp(e.layout).map((k) => {
            const C = h.get(k.i);
            if (!C) return null;
            const w = k.h * d + (k.h - 1) * m[1];
            return /* @__PURE__ */ l("div", { style: { height: w }, children: /* @__PURE__ */ l(qr, { widget: C, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        vo,
        {
          width: s,
          layouts: f,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: d,
          margin: m,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${Pn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const C = h.get(k.i);
            return C ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(qr, { widget: C, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function r0({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(La, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    vs,
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
        wh,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function Ts(e, t = "None") {
  if (Se(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => Ts(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Xp(e) {
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
function Zp(e, t) {
  const n = new Set(Xp(t));
  return e.filter((r) => n.has(r.type));
}
function eg(e) {
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
function tg(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function ng(e, t, n) {
  const r = eg(e), a = { name: tg(t, e, n), type: r }, i = t.trim();
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
function rg(e, t = "None") {
  const n = Ts(e, t);
  return n === It ? "Auto" : Ur[n] ?? n;
}
const Nr = "__none__";
function Os({
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
  const m = n && n.length > 0 ? n : Cr, g = e && e !== It && !m.includes(e) ? [...m, e].sort(
    (h, p) => Cr.indexOf(h) - Cr.indexOf(p)
  ) : m, f = a ? `Auto (${Ur[a]})` : "Auto";
  return /* @__PURE__ */ y(
    Le,
    {
      value: e ?? (i ? Nr : ""),
      onValueChange: (h) => t(h === Nr ? void 0 : h),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Ie, { id: u, className: d, children: /* @__PURE__ */ l(Fe, { placeholder: s }) }),
        /* @__PURE__ */ y($e, { children: [
          i ? /* @__PURE__ */ l(ke, { value: Nr, children: o }) : null,
          r ? /* @__PURE__ */ l(ke, { value: It, children: f }) : null,
          g.map((h) => /* @__PURE__ */ l(ke, { value: h, children: Ur[h] }, h))
        ] })
      ]
    }
  );
}
function cr(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function ag(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function ig(e) {
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
function ur(e) {
  return e ? e.cubes.filter((t) => qe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: cr(t),
    joinTargets: ag(t),
    category: ig(t),
    path: Gr(t, "path"),
    grain: Gr(t, "grain")
  })) : [];
}
function og(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function at(e, t) {
  if (!(!e || !t))
    return ur(e).find((n) => n.name === t);
}
function za(e) {
  return e.shortTitle || e.title || e.name;
}
function Ee(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function _s(e) {
  return Ee(e.meta, "group");
}
function sg(e) {
  return Ee(e.meta, "geoPoint");
}
function Pi(e) {
  const t = Ee(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function lg(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function xn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function As(e, t) {
  if (t)
    return St(e, "time", t).find(xn);
}
function cg(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = _s(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function jn(e) {
  const t = Ee(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function ug(e) {
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
function Wn(e) {
  const t = Ee(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function mg(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = ug(jn(e));
  return t !== void 0 && Va(e) === t;
}
function dg(e) {
  return Ee(e.meta, "familyHint");
}
function fg(e) {
  return Ee(e.meta, "soloHint");
}
function Bn(e) {
  return Ee(e.meta, "familyTitle");
}
function hg(e, t) {
  if (Wn(t))
    return Ds(e, t).map(Bn).find((n) => n !== void 0);
}
function ja(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function pg(e) {
  return `each ${ja(e)}`;
}
function Ds(e, t) {
  const n = Wn(t);
  if (!n) return [t];
  const r = [
    ...St(e, "measure", t.cube),
    ...St(e, "numberDimension", t.cube)
  ], a = /* @__PURE__ */ new Set(), i = [];
  for (const o of r)
    Wn(o) !== n || a.has(o.name) || (a.add(o.name), i.push(o));
  return i.length > 0 ? i : [t];
}
function gg(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const a = Wn(r.option);
    if (!a) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(a);
    i || (i = { familyKey: a, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(a, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const a = r.variants.find((s) => Bn(s.option)), i = r.variants.findIndex((s) => mg(s.option)), o = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : o >= 0 ? o : 0, r.label = Bn((a == null ? void 0 : a.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
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
function Es(e, t) {
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
function Mn(e, t) {
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
function Ls(e, t) {
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
function vg(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = sg({ meta: i });
    !o || !qe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Pi({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Pi({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: lg(o[0].name, s[0].name),
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
function zi(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function St(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!qe(a) || n && a.name !== n) continue;
    const i = cr(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...vg(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        qe(s) && o(Es(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        qe(s) && s.type !== "time" && !zi(s) && o(Mn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        qe(s) && s.type === "time" && o(Mn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        qe(s) && s.type === "number" && !zi(s) && o(Mn(s, a.name));
  }
  return r;
}
function bg(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!qe(a) || n && !n.has(a.name)) continue;
    const i = cr(a);
    for (const o of a.segments) {
      if (!qe(o)) continue;
      const s = Ls(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function De(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = cr(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(Es(i, n.name)) : a(Mn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(Ls(o, n.name));
    }
    return St(e, "geoPoint").find((n) => n.name === t);
  }
}
function Vi(e) {
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
]), Fs = {
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
function yg(e) {
  return e === "number";
}
function He(e) {
  return e.target !== void 0;
}
function xe(e, t) {
  return e.kinds.includes(t);
}
function Ba(e, t, n) {
  if (!xe(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function xt(e) {
  return e.chart.familyOptions ?? {};
}
function Ka(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Is(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function kg(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function wg(e, t, n) {
  var o, s;
  const r = e.chart;
  if (Ka(r)) return;
  const a = vn(r), i = new Set(n ?? []);
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
        const d = vn(a);
        r[c.id] = d ? [d] : [];
        break;
      }
      case "measures": {
        const d = Is(a), m = d.length ? d : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, m);
        break;
      }
      case "pivot": {
        const d = Ka(a) ?? wg(e, t, n);
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
function Cg(e, t) {
  return { ...e, dimensions: Ha(e.dimensions, t) };
}
function $s(e, t) {
  const n = qa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ps(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function a0(e) {
  return e === void 0 ? _g : Ea(e);
}
const Ng = "last 30 days";
function Ut(e, t, n, r) {
  if (yg(n)) return { ...e, measures: Ha(e.measures, t) };
  if (n === "time") {
    const a = bn(e) ?? r;
    return Ps(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? It,
      dateRange: a ? a.dateRange : Ng
    });
  }
  return Cg(e, t);
}
function Jt(e, t, n, r) {
  const a = e.query ?? {}, i = Ht(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = bn(a);
  if ((o == null ? void 0 : o.dimension) === n) return Ps(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = qa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return $s(a, n);
}
function Sg(e, t, n, r) {
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
  return { category: { member: e }, series: js(t, r) };
}
function an(e, t, n) {
  var c, u;
  const r = Ht(e, t, n), a = (d) => t.find((m) => {
    var g;
    return ((g = m.target) == null ? void 0 : g.kind) === d;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : vn(e.chart),
    measures: o ? r[o.id] ?? [] : Is(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Ka(e.chart)
  };
}
function on(e, t, n) {
  const r = { ...Vs(e.chart), ...kg(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Sg(n.category, n.measures, n.pivot, r)
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
      const u = s[0], d = bn(c);
      u && u !== r && (c = Jt(e, t, u, n)), c = Ut(c, r, a, d);
      const m = an({ ...e, query: c }, t, [r]);
      return on(e, c, { ...m, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Ha(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = Jt(e, t, s[0], n)), c = Ut(c, r, a);
      const d = an({ ...e, query: c }, t, [r]);
      return on(e, c, { ...d, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = Jt(e, t, u, n)), c = Ut(c, r, a);
      const d = an({ ...e, query: c }, t, [r]);
      return on(e, c, { ...d, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = Jt(e, t, u, n)), c = Ut(c, r, a), Kn(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(xt(e)[o.key]) ? [...xt(e)[o.key]] : [];
      return u.some((d) => (d == null ? void 0 : d.member) === r) || u.push({ member: r }), c = Ut(c, r, a), Kn(e, c, { [o.key]: u });
    }
  }
}
function xg(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !He(a)) return e;
  const i = a.target, o = Jt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = an(e, t), c = qa(s.measures, r), u = c.length ? s.pivot : void 0, d = c.length || !s.pivot ? o : $s(o, s.pivot);
      return on(e, d, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = an(e, t);
      return on(e, o, { ...s, pivot: void 0 });
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
function Mg(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = bn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Rg(e, t) {
  if (xe(t, e)) return e;
  if (e === "category" && xe(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && xe(t, "category") || e === "time" && xe(t, "category")) return "category";
}
function Tg(e, t, n) {
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
      const d = Rg(Mg(e, u), o);
      d && (i = Ua(i, n, o.id, u, d));
    }
  }
  return i;
}
function Og(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!He(a)) continue;
    const i = n.findIndex((o) => xe(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function At(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function zs(e) {
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
function Vs(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function vn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function bn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function js(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const _g = "day";
function Jr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Ag(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Jr(r) && Jr(a) ? Tg(e, r.wells, a.wells) : Dg(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Dg(e, t) {
  var f;
  const { chart: n } = e, r = e.query ?? {}, a = Qr(n).length ? Qr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((h) => h.dimension), o = vn(n) ?? ((f = r.dimensions) == null ? void 0 : f[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (h, p, k) => !!h && k.indexOf(h) === p
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Jr(t)) {
    const h = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: h } } : c;
  }
  const u = [...a], d = [...s], m = (h) => i.includes(h) ? "time" : "category";
  let g = c;
  for (const h of t.wells) {
    if (!h.target || !h.channel) continue;
    const p = xe(h, "category") ? [
      [d, m],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [d, m]
    ];
    let k = 0;
    for (const [C, w] of p)
      for (let R = 0; R < C.length; ) {
        if (h.cardinality === "one" && k > 0 || !xe(h, w(C[R]))) {
          R += 1;
          continue;
        }
        g = Ua(g, t.wells, h.id, C[R], w(C[R])), C.splice(R, 1), k += 1;
      }
  }
  return g;
}
function Ws(e) {
  return nh(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Bs(e) {
  return ah(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Eg(e, t) {
  return t.require(e).wells;
}
function sn(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Ht(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function _t(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Ua(e, o.wells, n, r, a);
  return Lg(e, s, o.wells);
}
function Ks(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = xg(e, i.wells, n, r);
  return Hs(e, o, i.wells);
}
function Lg(e, t, n) {
  return Fg(e, Hs(e, t, n));
}
function Fg(e, t) {
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
function Hs(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((d) => d.dimension)), o = new Set(Object.values(Ht(t, n)).flat()), s = r.filter((d) => !i.has(d.dimension) && o.has(d.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
function qs({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: A("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ y(b.Fragment, { children: [
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
        className: A("cv-picker-aggseg-opt", n.selected && "cv-picker-aggseg-opt--on"),
        children: n.label
      }
    )
  ] }, n.label)) });
}
function Us(e, t) {
  var a;
  const n = (a = e.meta) == null ? void 0 : a.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = Va(e) ?? "";
  return r === "value" ? pg(t == null ? void 0 : t.grain) : r === "max" && jn(e) === "counter" ? "latest" : r;
}
function Ga(e) {
  return Va(e) === "value";
}
function Ya(e) {
  return `Plots each ${ja(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function Ig(e, t, n) {
  if (Ga(n)) return Ya(t);
  switch (jn(n) ?? e.map(jn).find(Boolean)) {
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
      return e.map(dg).find(Boolean);
    default:
      return;
  }
}
const we = b.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = b.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: A("cv-input", e),
        ...r
      }
    );
  }
);
we.displayName = "Input";
function Xr({ option: e }) {
  const t = sr();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Wa(e, t) });
}
function Gs({
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
  }, [u, n, e, t]), g = b.useMemo(() => {
    const p = $g(m), k = p.length > 1, C = [];
    for (const [w, R] of p)
      for (const [N, M] of cg(R, () => "Other")) {
        const T = k ? N === "Other" ? w : `${w} · ${N}` : N;
        C.push({ key: `${w}:${N}`, label: T, items: M });
      }
    return C;
  }, [m]), f = g.length > 1, h = m.find((p) => p.name === r);
  return /* @__PURE__ */ y(Le, { value: r, onValueChange: a, disabled: o || d, children: [
    /* @__PURE__ */ l(Ie, { id: s, className: c, children: /* @__PURE__ */ l(Fe, { placeholder: d ? "Loading…" : i, children: h ? /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Xr, { option: h }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: h.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l($e, { children: g.map((p) => /* @__PURE__ */ y(Br, { children: [
      f && p.label ? /* @__PURE__ */ l(Kr, { children: p.label }) : null,
      p.items.map((k) => /* @__PURE__ */ l(ke, { value: k.name, children: /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Xr, { option: k }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, p.key)) })
  ] });
}
function $g(e) {
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
      className: A("cv-segmented", s),
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
            className: A(
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
function ji(e) {
  return e.reason === void 0;
}
function Ys(e, t, n, r, a) {
  const i = Ba(e, t, [...n]);
  return i ? Pg(i, e, r) : a == null ? void 0 : a(r);
}
function Pg(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function zg(e, t, n) {
  if (t !== void 0 && Ws(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Bs(e)}`;
}
const Qa = "cube-viz:field-picker:only-compatible";
function Qs() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Js() {
  var e;
  try {
    return ((e = Qs()) == null ? void 0 : e.getItem(Qa)) !== "0";
  } catch {
    return !0;
  }
}
function Vg(e) {
  try {
    const t = Qs();
    if (!t) return;
    t.setItem(Qa, e ? "1" : "0");
  } catch {
  }
}
let Zr = Js();
const Rn = /* @__PURE__ */ new Set();
let Dt;
function jg() {
  for (const e of [...Rn]) e();
}
function Xs(e) {
  e !== Zr && (Zr = e, jg());
}
function Wg() {
  if (Dt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Qa || Xs(Js());
  };
  e.addEventListener("storage", t), Dt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const kn = {
  get: () => Zr,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Vg(e), Xs(e);
  },
  subscribe: (e) => (Rn.add(e), Wg(), () => {
    Rn.delete(e), Rn.size === 0 && (Dt == null || Dt(), Dt = void 0);
  })
}, Bg = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Jl, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(ii, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(ii, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(ho, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Ql, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Wi = ["geoPoint", "number", "numberDimension", "category", "time"];
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
  var pe, ge;
  const { meta: u, isLoading: d } = ft(), [m, g] = b.useState(!1), [f, h] = b.useState(""), p = b.useSyncExternalStore(
    kn.subscribe,
    kn.get,
    kn.getServer
  ), k = kn.set, C = b.useId(), [w, R] = b.useState(r.viewLocked ?? "tables"), [N, M] = b.useState({}), [T, E] = b.useState({});
  b.useEffect(() => {
    m && R(r.viewLocked ?? "tables");
  }, [m, r.viewLocked]);
  const B = b.useMemo(() => new Set(t), [t]), j = f.trim().toLowerCase(), D = sr(), O = b.useMemo(() => {
    if (w !== "tables") {
      const _ = r.views.find((K) => K.name === w) ?? at(u, w);
      return _ ? [{ cube: _, tag: "dataset" }] : [];
    }
    const W = [];
    r.sourceCube && W.push({ cube: r.sourceCube, tag: "source" });
    const ce = r.relatedCubes.some((_) => _.path ?? _.category) ? "More tables" : "Related tables", L = (_) => _.path ? og(_.path) : _.category, x = /* @__PURE__ */ new Map();
    for (const _ of r.relatedCubes) {
      const K = L(_);
      K !== void 0 && !x.has(K) && x.set(K, x.size);
    }
    const S = [...r.relatedCubes].sort((_, K) => {
      const H = L(_), G = L(K);
      return H === G ? 0 : H === void 0 ? 1 : G === void 0 ? -1 : (x.get(H) ?? 0) - (x.get(G) ?? 0);
    });
    for (const _ of S) W.push({ cube: _, tag: "related", heading: L(_) ?? ce });
    return W;
  }, [w, r, u]), z = [
    ...Wi.filter((W) => xe(e, W)),
    ...Wi.filter((W) => !xe(e, W))
  ], F = (W) => {
    const ne = [], ce = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Set();
    for (const x of z) {
      const S = Bg[x], _ = Ba(e, x, n ?? []);
      let K = St(u, S.metaKind, W);
      x === "time" && (K = [...K].sort(
        (H, G) => Number(xn(G)) - Number(xn(H))
      ));
      for (const H of K) {
        if (B.has(H.name) || L.has(H.name)) continue;
        const G = Bn(H) ?? hg(u, H);
        if (j && !(H.label.toLowerCase().includes(j) || H.name.toLowerCase().includes(j) || ((G == null ? void 0 : G.toLowerCase().includes(j)) ?? !1)))
          continue;
        L.add(H.name);
        const J = _s(H), Ce = J ? `g:${J.toLowerCase()}` : `k:${S.label}`;
        let ve = ce.get(Ce);
        ve || (ve = {
          key: Ce,
          label: J ?? S.label,
          headerIcon: J ? void 0 : S.icon,
          rejected: _ !== void 0,
          items: []
        }, ce.set(Ce, ve), ne.push(Ce)), _ === void 0 && (ve.rejected = !1), ve.items.push({
          option: H,
          kind: x,
          reason: Ys(e, x, n ?? [], H, a)
        });
      }
    }
    return ne.map((x) => ce.get(x));
  }, $ = O.map((W) => ({ section: W, groups: F(W.cube.name) })).filter((W) => W.groups.length > 0), V = p ? $.reduce(
    (W, ne) => W + ne.groups.reduce((ce, L) => ce + L.items.filter((x) => !ji(x)).length, 0),
    0
  ) : 0, I = p ? $.map((W) => ({
    section: W.section,
    groups: W.groups.map((ne) => ({ ...ne, rejected: !1, items: ne.items.filter(ji) })).filter((ne) => ne.items.length > 0)
  })).filter((W) => W.groups.length > 0) : $, Q = I.length > 0, te = !Q && V > 0, U = (W, ne) => {
    i(W, ne), g(!1), h("");
  }, oe = w === "tables" ? "All related tables" : ((pe = r.views.find((W) => W.name === w)) == null ? void 0 : pe.title) ?? ((ge = at(u, w)) == null ? void 0 : ge.title) ?? w, me = r.viewLocked ? r.views.filter((W) => W.name === r.viewLocked) : [], le = p ? V > 0 ? `Only compatible fields — ${V} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ y(Pe, { open: m, onOpenChange: g, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: c }),
    /* @__PURE__ */ y(Ve, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ y("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ y("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Gl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: C,
              "aria-label": "Search fields",
              value: f,
              onChange: (W) => h(W.target.value),
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
            className: A("cv-picker-compat", p && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(Yl, { className: "cv-ec-icon" }),
              p && V > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: V }) : null
            ]
          }
        ),
        me.length > 0 ? /* @__PURE__ */ l(
          Kg,
          {
            browse: w,
            label: oe,
            views: me,
            onBrowse: R
          }
        ) : null
      ] }),
      w === "tables" && r.sourceCube ? /* @__PURE__ */ y("div", { className: "cv-picker-anchor", children: [
        "Reading from ",
        /* @__PURE__ */ l("strong", { children: r.sourceCube.title }),
        r.sourceCube.grain ? ` (${r.sourceCube.grain})` : "",
        " · joined tables included"
      ] }) : null,
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: Q ? I.map(({ section: W, groups: ne }, ce) => {
        const L = ne.reduce((G, J) => G + J.items.length, 0), x = W.tag === "related", S = N[W.cube.name] ?? x, _ = j.length > 0 ? !0 : !S, K = ce > 0 ? I[ce - 1].section : void 0, H = W.tag === "related" && W.heading !== void 0 && ((K == null ? void 0 : K.tag) !== "related" || K.heading !== W.heading);
        return /* @__PURE__ */ y("div", { children: [
          H ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: W.heading }) : null,
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => M((G) => ({ ...G, [W.cube.name]: !S })),
              className: "cv-picker-table",
              children: [
                _ ? /* @__PURE__ */ l(ut, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(Gn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(uo, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: W.cube.title }),
                W.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: W.cube.grain }) : null,
                W.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : W.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: L })
              ]
            }
          ),
          _ ? ne.map((G) => /* @__PURE__ */ y(
            "div",
            {
              className: A(
                "cv-picker-group",
                G.rejected && "cv-picker-group--rejected"
              ),
              children: [
                ne.length > 1 ? /* @__PURE__ */ y("div", { className: "cv-picker-group-header", children: [
                  G.headerIcon,
                  G.label,
                  G.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                gg(G.items).map((J) => {
                  const Ce = J.familyKey ? T[J.familyKey] : void 0, ve = J.variants.findIndex((P) => P.option.name === Ce), q = ve >= 0 ? ve : J.defaultIndex, { option: se, kind: ue, reason: _e } = J.variants[q], We = J.familyKey ? {
                    options: J.variants.map((P, Y) => {
                      const X = at(u, P.option.cube), he = Ga(P.option);
                      return {
                        label: Us(P.option, X),
                        selected: Y === q,
                        disabled: P.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: P.reason ?? (he ? Ya(X) : void 0),
                        divider: he && Y > 0,
                        onSelect: () => {
                          E((Ne) => ({ ...Ne, [J.familyKey]: P.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Hg,
                    {
                      option: se,
                      label: J.familyKey ? J.label : void 0,
                      unitBadge: Wa(se, D),
                      badge: ue === "time" && xn(se) ? "default" : void 0,
                      reason: _e,
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
        ] }, W.cube.name);
      }) : te ? /* @__PURE__ */ y("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ y("p", { children: [
          V,
          " ",
          j ? "matching " : "",
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
function Kg({ browse: e, label: t, views: n, onBrowse: r }) {
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
        children: /* @__PURE__ */ l(mo, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ y(Ve, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Bi, { active: e === "tables", icon: /* @__PURE__ */ l(uo, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ y(be, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          Bi,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(fo, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Bi({
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
      className: A(
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
function Hg({ option: e, label: t, reason: n, onPick: r, unitBadge: a, badge: i, agg: o }) {
  const s = a ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: a }) : null, c = t ?? e.label, u = o ? /* @__PURE__ */ l(qs, { options: o.options }) : null, d = n ? /* @__PURE__ */ y(
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
const qg = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Xt = "yyyy-MM-dd";
function Ug(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ki(e) {
  if (!e) return;
  const t = io(e, Xt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Xa({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = Ug(e), s = Ki(i), c = Ki(o), u = s ? { from: s, to: c } : void 0, d = a ? e : s && c ? `${ye(s, "MMM d, yyyy")} – ${ye(c, "MMM d, yyyy")}` : s ? ye(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ y(Pe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: A("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(co, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: A("cv-daterange-label", d === "Any time" && "cv-daterange-label--placeholder"), children: d })
    ] }) }),
    /* @__PURE__ */ y(Ve, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ y("div", { className: "cv-daterange-presets", children: [
        qg.map((m) => /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "sm",
            className: A("cv-daterange-preset", e === m && "cv-daterange-preset--active"),
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
        ds,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (m) => {
            m != null && m.from && m.to ? t([ye(m.from, Xt), ye(m.to, Xt)]) : m != null && m.from ? t([ye(m.from, Xt), ye(m.from, Xt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Zs = b.createContext({});
function Gg({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Zs.Provider, { value: n, children: t });
}
function Yg() {
  return b.useContext(Zs);
}
function Qg({ kind: e, value: t, onChange: n, className: r }) {
  const a = gn(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Yg(), [s, c] = b.useState(!1), [u, d] = b.useState(!1), [m, g] = b.useState(""), f = b.useMemo(() => Zp(i, e), [i, e]), h = f.find((C) => C.name === t), p = (C) => {
    n(C), c(!1), d(!1);
  }, k = () => {
    if (!o) return;
    const C = ng(e, m || "Variable", i);
    o(C), p(C.name), g("");
  };
  return /* @__PURE__ */ y(
    Pe,
    {
      open: s,
      onOpenChange: (C) => {
        c(C), C || d(!1);
      },
      children: [
        /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: A("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Xl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: A("cv-var-trigger-label", !h && "cv-var-trigger-label--placeholder"), children: h ? h.label ?? h.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ y(Ve, { align: "start", className: "cv-var-popover", children: [
          f.length > 0 ? f.map((C) => /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => p(C.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: C.label ?? C.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: C.type }),
                C.name === t ? /* @__PURE__ */ l(Wt, { className: "cv-ec-icon" }) : null
              ]
            },
            C.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ y("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              we,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: m,
                onChange: (C) => g(C.target.value),
                onKeyDown: (C) => {
                  C.key === "Enter" && k(), C.key === "Escape" && d(!1);
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
  const i = Se(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => A("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ y("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ y("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), Se(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      Qg,
      {
        kind: e,
        value: Se(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(Se(t) ? void 0 : t, (u) => n(u))
  ] });
}
const Jg = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Sr(e) {
  return "member" in e && "operator" in e;
}
function Xg({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var D;
  const { meta: s } = ft(), c = ((D = gn()) == null ? void 0 : D.decls) ?? [], [u, d] = b.useState(null), [m, g] = b.useState(null), f = r ?? [], h = f.length === 1 && !Sr(f[0]) && "or" in f[0] && Array.isArray(f[0].or) && f[0].or.every(Sr) ? f[0] : void 0, p = h ? "any" : "all", k = [], C = [];
  h || f.forEach((O) => Sr(O) ? k.push(O) : C.push(O));
  const w = h ? h.or : k, R = C.length === 0 && (w.length >= 2 || p === "any"), N = (O) => p === "any" ? O.length ? [{ or: O }] : [] : [...O, ...C], M = (O) => {
    const z = O.filter(($) => $.member.length > 0), F = N(z);
    a(F.length > 0 ? F : void 0);
  }, T = (O) => {
    const z = O === "any" ? w.length ? [{ or: w }] : [] : [...w];
    a(z.length > 0 ? z : void 0);
  }, E = (O, z) => M(w.map((F, $) => $ === O ? { ...F, ...z } : F)), B = (O) => M(w.filter((z, F) => F !== O)), j = (O) => {
    const F = { ...m ?? { member: "", operator: "equals", values: [] }, ...O };
    F.member ? (g(null), d(w.length), M([...w, F])) : g(F);
  };
  return /* @__PURE__ */ y("div", { "data-slot": "filter-builder", className: A("cv-filter-builder", o), children: [
    w.length === 0 && !m ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
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
    w.map((O, z) => {
      const F = De(s, O.member);
      return u === z ? /* @__PURE__ */ l(
        Hi,
        {
          leaf: O,
          member: F,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: ($) => E(z, $),
          onDone: () => d(null),
          onRemove: () => B(z)
        },
        z
      ) : /* @__PURE__ */ l(
        Zg,
        {
          text: ev(O, F == null ? void 0 : F.label, c),
          disabled: i,
          onEdit: () => d(z),
          onRemove: () => B(z)
        },
        z
      );
    }),
    m ? /* @__PURE__ */ l(
      Hi,
      {
        leaf: m,
        member: De(s, m.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: j,
        onRemove: () => g(null)
      }
    ) : null,
    C.length > 0 ? /* @__PURE__ */ y("p", { className: "cv-filter-groups-note", children: [
      C.length,
      " grouped filter",
      C.length === 1 ? "" : "s",
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
          d(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Nt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Zg({
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
        children: /* @__PURE__ */ l(Bt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function Hi({
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
  const { meta: u } = ft(), d = Vi(t == null ? void 0 : t.type), m = d.includes(e.operator) ? e.operator : d[0], g = !Yr.has(m), f = b.useId(), h = b.useId(), p = b.useId(), k = b.useId(), C = b.useId(), w = b.useId();
  b.useEffect(() => {
    m !== e.operator && o({ operator: m });
  }, [e.operator, o, m]);
  const R = (N) => {
    const M = De(u, N);
    o({ member: N, operator: Vi(M == null ? void 0 : M.type)[0], values: [] });
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
            children: /* @__PURE__ */ l(Bt, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Ja,
          {
            well: Jg,
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
                id: h,
                disabled: i,
                "aria-labelledby": `${f} ${h}`,
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
        Gs,
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
            /* @__PURE__ */ l($e, { children: d.map((N) => /* @__PURE__ */ l(ke, { value: N, children: Fs[N] }, N)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: C, htmlFor: w, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        tv,
        {
          fieldId: w,
          labelId: C,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (N) => o({ values: N })
        }
      )
    ] }) : null
  ] });
}
function ev(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = Fs[e.operator] ?? e.operator;
  if (Yr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Se(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function tv({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Se(i[0]);
  if (t === "time") {
    const u = o ? i[0] : nv(i);
    return /* @__PURE__ */ l(
      jt,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (d) => n(d === void 0 ? [] : Se(d) ? [d] : rv(d)),
        renderFixed: (d, m) => /* @__PURE__ */ l(Xa, { value: d, onChange: m })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !Se(u));
  return /* @__PURE__ */ l(
    jt,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : Se(u) ? [u] : u),
      renderFixed: (u, d) => /* @__PURE__ */ l(
        we,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (m) => d(av(m.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function nv(e) {
  const t = e.filter((n) => !Se(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function rv(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function av(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function iv({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ y(Pe, { children: [
    /* @__PURE__ */ y(
      ze,
      {
        className: A(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Zl, { className: "cv-ec-icon--lg" }),
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
      /* @__PURE__ */ l(ov, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Xg, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function ov({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ft(), a = bg(r, n);
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
        className: A(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function sv(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function lv({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", c = b.useId(), u = b.useId(), d = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ y("div", { className: A("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": d },
        value: o,
        placeholder: "No title",
        onChange: (g) => sv(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function cv({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ y("div", { className: A("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
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
          n ? /* @__PURE__ */ l(ec, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(tc, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const el = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: A("cv-label", e),
      ...t
    }
  )
);
el.displayName = "Label";
function fe({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ y("div", { "data-slot": "field-row", className: A("cv-field-row", i), children: [
    /* @__PURE__ */ y("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(el, { htmlFor: r, className: "cv-field-row-label", children: e }),
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
      className: A("cv-switch", i),
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
      className: A("cv-switch-row", i),
      children: [
        /* @__PURE__ */ y(
          "label",
          {
            htmlFor: o,
            className: A("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
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
const uv = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, mv = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function dv({ spec: e, update: t }) {
  var C, w, R;
  const n = dt(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((w = (C = r.mapping) == null ? void 0 : C.series) == null ? void 0 : w.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", m = d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none", g = ((R = r.transform) == null ? void 0 : R.kind) ?? "none", f = Aa(o) ? /* @__PURE__ */ y(be, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ y(
          Le,
          {
            value: g,
            onValueChange: (N) => {
              var M;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((M = r.transform) == null ? void 0 : M.window) ?? Cn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(Ie, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Fe, {}) }),
              /* @__PURE__ */ l($e, { children: mv.map((N) => /* @__PURE__ */ l(ke, { value: N, children: uv[N] }, N)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(hv, { label: "Window (points)", children: (N) => {
      var M;
      return /* @__PURE__ */ l(
        we,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((M = r.transform) == null ? void 0 : M.window) ?? Cn,
          onChange: (T) => {
            const E = parseInt(T.target.value, 10), B = Number.isFinite(E) ? Math.min(90, Math.max(2, E)) : Cn;
            s({ transform: { kind: "rollingAvg", window: B } });
          }
        }
      );
    } }) : null
  ] }) : null, h = /* @__PURE__ */ l(fe, { label: "Line shape", children: /* @__PURE__ */ l(
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
        return /* @__PURE__ */ y(be, { children: [
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
        return h;
      case "area":
        return /* @__PURE__ */ y(be, { children: [
          h,
          p,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((M = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : M.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ y(be, { children: [
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
    f
  ] });
}
function fv(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || Aa(n);
}
function hv({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ y("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function tl(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function nl(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!He(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      xe(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function pv(e) {
  let t = 0;
  for (const n of e)
    He(n) && (t += n.optional ? 1 : 3);
  return t;
}
function gv(e, t) {
  return e.some((n) => He(n) && n.cardinality === "many" && xe(n, t));
}
const vv = 0.35, bv = 0.4, yv = 0.3, kv = 0.1;
function wv(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? yv : e.supportsCartesianAxes ? kv : e.wells.some(
    (a) => He(a) && a.channel === "x" && xe(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function rl(e) {
  const t = e.filter(He);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Cv(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Nv = (e, t, n) => e === 1 ? t : n;
function Sv(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Cv(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${Nv(r, "measure", "measures")}`;
  return rl(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function xv(e, t) {
  const n = tl(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = nl(s, n), u = pv(s), d = Math.max(0, n.length - c.matched.length), m = Og(s, r) + 0.5 * d, g = u > 0 ? m / u : 0, f = c.leftover.filter(
      (p) => p.kind !== "time" && !gv(s, p.kind)
    ).length, h = g - vv * f + wv(o, a) - (rl(s) ? bv : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(h * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Sv(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function Mv(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Rv(e, t, n) {
  const r = e.require(n), a = nl(r.wells, tl(t));
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
function al(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Ag(e, r, n));
  };
}
function Tv({ spec: e, update: t, empty: n }) {
  const r = dt(), a = e.chart.family, i = al(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ y("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(il, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function Ov({ spec: e, update: t }) {
  const n = dt(), r = e.chart.family, a = al(e, t, n), i = n.require(r), o = i.icon;
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
      /* @__PURE__ */ l(il, { spec: e, family: r, onPick: a, families: n }),
      fv(r, n) ? /* @__PURE__ */ y("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(dv, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function il({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => xv(r, e), [r, e]), i = b.useMemo(() => Mv(a), [a]), o = b.useMemo(
    () => new Map(a.map((m) => [m.family, m])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((m) => m.fits).map((m) => m.family)),
    [a]
  ), c = Ev(e, r, s), u = (m, g) => /* @__PURE__ */ l(
    _v,
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
function _v({
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
      className: A("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Wv,
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
function ol(e, t) {
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
function Av(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const qi = 200, Dv = () => () => {
};
function Ev(e, t, n) {
  const r = e.query, a = Av(r), i = b.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, qi) : qi
    };
  }, [r]), o = gn(), s = b.useRef(null);
  s.current === null && (s.current = rs());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, d = b.useSyncExternalStore(
    o ? o.store.subscribe : Dv,
    u,
    u
  ), { resultSet: m } = ls(d, { skip: !a });
  return b.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const f of t.list()) {
      const h = f.family;
      if (f.queryless || a && n.has(h) && !m) continue;
      const C = (m && n.has(h) ? Lv(e, h, t, m, d) : void 0) ?? jv(h, t);
      C && g.set(h, C);
    }
    return g;
  }, [e, t, m, d, n, a]);
}
function Lv(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Rv(n, e, t), o = ol(i.chart, n), s = Zo(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const Mt = "sample.category", fn = "sample.group", Re = "sample.value", je = "sample.count", sl = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ta = [18, 27, 21, 34, 26, 39], na = [12, 9, 17, 14, 22, 16], Fv = sl.flatMap((e, t) => [
  { [Mt]: e, [fn]: "North", [Re]: ta[t], [je]: na[t] },
  {
    [Mt]: e,
    [fn]: "South",
    [Re]: Math.round(ta[t] * 0.62),
    [je]: Math.round(na[t] * 0.78)
  }
]), Iv = {
  measures: [Re, je],
  dimensions: [Mt, fn]
}, $v = {
  measures: {
    [Re]: { title: "Value", shortTitle: "Value", type: "number" },
    [je]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [Mt]: { title: "Day", shortTitle: "Day", type: "string" },
    [fn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function ll(e) {
  const t = [
    { key: Re, label: "Value", data: ta, colorToken: "chart-1" },
    { key: je, label: "Count", data: na, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: sl,
    series: t,
    raw: { rows: Fv, query: Iv, annotation: $v },
    empty: !1
  };
}
const Pv = ll(1), zv = ll(2), Zt = (e, t) => ({
  family: e,
  mapping: { category: { member: Mt }, series: { mode: "measures", members: t } }
}), Vv = {
  bar: Zt("bar", [Re, je]),
  line: Zt("line", [Re, je]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: Zt("area", [Re, je]),
  pie: Zt("pie", [Re]),
  scatter: { family: "scatter", familyOptions: { x: Re, y: je } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: Mt },
      series: { mode: "pivot", value: Re, pivot: fn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Re, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: Mt }, { member: Re }, { member: je }] }
  }
};
function jv(e, t) {
  const n = Vv[e] ?? Zt(e, [Re, je]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Pv : zv,
    options: ol(n, t)
  };
}
const Wv = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(Bv, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Jo,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Bv extends b.Component {
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
function Kv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Hv(e, t, n, r, a, i) {
  var H, G, J, Ce, ve;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : qv(a), d = o.familyOptions ?? {}, m = Array.isArray(d.columns) ? d.columns : [], g = Vs(o), f = g[r], h = c === "table" && n.id === "columns", p = c === "bar" || c === "line" || c === "area", k = ((G = (H = o.mapping) == null ? void 0 : H.series) == null ? void 0 : G.mode) === "measures", C = p && n.id === "y", w = C && k, R = h ? (J = m.find((q) => q.member === r)) == null ? void 0 : J.label : w ? f == null ? void 0 : f.label : void 0, N = w ? f == null ? void 0 : f.colorToken : void 0, M = bn(s), T = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, E = T ? M == null ? void 0 : M.granularity : void 0, B = T ? M == null ? void 0 : M.dateRange : void 0, j = (c === "line" || c === "area") && n.id === "y" && k, D = j ? f == null ? void 0 : f.dots : void 0, O = (q) => {
    var We, P;
    if ((We = o.mapping) != null && We.series && o.mapping.series.mode !== "measures") return;
    const se = ((P = o.mapping) != null && P.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ue = { ...g };
    q && Object.keys(q).length > 0 ? ue[r] = q : delete ue[r];
    const _e = vn(o);
    _e && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: _e }, series: js(se, ue) }
      }
    });
  }, z = (q) => {
    const se = m.map((ue) => ue.member === r ? { ...ue, ...q } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...d, columns: se } } });
  }, F = (q) => {
    h ? z({ label: q }) : w && O({ ...f, label: q });
  }, $ = (q) => {
    w && O({ ...f, colorToken: q ?? void 0 });
  }, V = (q) => {
    if (!M) return;
    const se = { ...M };
    for (const ue of Object.keys(q)) {
      const _e = q[ue];
      _e === void 0 ? delete se[ue] : se[ue] = _e;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, I = (q) => V({ granularity: q }), Q = (q) => V({ dateRange: q }), te = (q) => {
    w && O({ ...f, dots: q });
  }, U = () => t(Ks(e, c, n.id, r, i)), oe = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), me = (Ce = o.mapping) == null ? void 0 : Ce.series, le = (me && me.mode === "pivot" ? me.value : Qr(o)[0]) ?? ((ve = s.measures) == null ? void 0 : ve[0]), pe = oe ? u === "time" ? [
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
  ] : [], ge = (() => {
    const q = Kv(s.order)[0];
    if (!q) return "none";
    const [se, ue] = q;
    return le && se === le ? ue === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? ue === "desc" ? "time-desc" : "time-asc" : ue === "asc" ? "label-asc" : "label-desc" : "none";
  })(), W = (q) => {
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
    granularity: E,
    dateRange: B,
    dots: D,
    canPoints: j,
    canRename: h || w,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && k,
    isTimeField: T,
    isCategoryField: oe,
    sortValue: ge,
    sortOptions: pe,
    onSort: W,
    limit: ne,
    onLimit: ce,
    canComparePrevious: x,
    comparePrevious: S,
    comparePreviousReady: x && B !== void 0,
    onComparePrevious: (q) => t({ ...e, chart: { ...o, familyOptions: { ...d, comparePrevious: q || void 0 } } }),
    onRename: F,
    onRecolor: $,
    onGranularity: I,
    onDateRange: Q,
    onDots: te,
    onRemove: U
  };
}
function qv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ra(e, t, n, r) {
  var m;
  const { chart: a, query: i } = e, o = a.family, s = (g) => {
    if (r < 0 || r >= g.length || n === r) return g;
    const f = g.slice(), [h] = f.splice(n, 1);
    return f.splice(r, 0, h), f;
  };
  if (o === "table" && t.id === "columns") {
    const g = a.familyOptions ?? {}, f = s(Array.isArray(g.columns) ? g.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...g, columns: f } } };
  }
  const c = s(i.measures ?? []), u = (m = a.mapping) == null ? void 0 : m.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const g = s(u.values);
    d = { ...a.mapping, series: { ...u, value: g[0], values: g } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: d } };
}
function Uv(e, t) {
  return e.allowedCubes.includes(t);
}
function Gv(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const a = e.get(r.shift());
    for (const i of (a == null ? void 0 : a.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function cl(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function aa(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = Gv(e, n);
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
function Yv(e, t) {
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
function Ui(e, t, n, r) {
  var N;
  const a = ur(e), i = a.filter((M) => M.type === "view"), o = sn(t, r), s = Object.values(o).flat();
  let c;
  for (const M of s) {
    const T = De(e, M);
    if (T) {
      c = T;
      break;
    }
  }
  const u = !c && n ? at(e, n) : void 0, d = c ? at(e, c.cube) : u, m = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, g = t.query.measures ?? [], f = g.length ? At(g[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: i, measureSource: f, allowedCubes: [m] };
  const h = f ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), p = h ? at(e, h) : void 0, k = cl(a), C = /* @__PURE__ */ new Set();
  for (const M of s) {
    const T = (N = De(e, M)) == null ? void 0 : N.cube;
    T && k.has(T) && C.add(T);
  }
  f && k.has(f) && C.add(f), !C.size && h && k.has(h) && C.add(h);
  const w = Yv(k, C), R = w.filter((M) => M !== h).map((M) => k.get(M)).sort((M, T) => M.title.localeCompare(T.title));
  return {
    sourceCube: (p == null ? void 0 : p.type) === "cube" ? p : void 0,
    relatedCubes: R,
    views: i,
    measureSource: f,
    allowedCubes: w
  };
}
function Qv(e, t, n) {
  if (!t) return e;
  const r = cl(ur(t)), a = e.query ?? {}, i = new Set(Object.values(sn(e, n)).flat()), o = (p) => {
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
  const d = /* @__PURE__ */ new Set([u]), m = (p) => aa(r, /* @__PURE__ */ new Set([...d, p])) && (d.add(p), !0), g = [];
  for (const p of c) {
    const k = o(p.dimension);
    if (k && m(k)) {
      g.push(p);
      continue;
    }
    if (i.has(p.dimension))
      g.push(p);
    else {
      const C = As(t, u);
      C && !g.some((w) => w.dimension === C.name) && g.push({ ...p, dimension: C.name });
    }
  }
  const f = (p) => {
    if (i.has(p)) return !0;
    const k = o(p);
    return k !== void 0 && m(k);
  }, h = {
    ...a,
    measures: (a.measures ?? []).filter(f),
    dimensions: (a.dimensions ?? []).filter(f),
    timeDimensions: g
  };
  return { ...e, query: h };
}
class mr extends b.Component {
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
      /* @__PURE__ */ l(nc, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
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
const Jv = ot.options;
function Xv({
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
      className: A("cv-color-picker", a),
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
            className: A(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        Jv.map((i) => {
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
              className: A(
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
function Zv({
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
  const u = dt(), d = sr(), m = Hv(e, t, n, r, a, u), g = b.useId(), f = b.useId(), h = b.useId(), p = b.useId(), k = b.useId(), C = b.useId(), w = (a == null ? void 0 : a.label) ?? r, R = m.label || w, N = m.canColor && i !== void 0, M = m.canRename || N || m.isTimeField || m.isCategoryField || m.canPoints || s !== void 0, T = (D) => {
    const O = D.trim();
    m.onRename(O.length > 0 ? O : void 0);
  }, E = (D) => {
    !o || !D.altKey || (D.key === "ArrowUp" && o.index > 0 ? (D.preventDefault(), o.onMove(-1)) : D.key === "ArrowDown" && o.index < o.total - 1 && (D.preventDefault(), o.onMove(1)));
  }, B = /* @__PURE__ */ y(be, { children: [
    o ? /* @__PURE__ */ l(rc, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
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
  ] }), j = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "field-pill",
      className: A("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", c),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (D) => {
        D.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? E : void 0,
      children: [
        M ? /* @__PURE__ */ y(Pe, { children: [
          /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${R}${j}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: B
            }
          ) }),
          /* @__PURE__ */ l(Ve, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ y("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(eb, { getSwap: s, display: R }) : null,
            m.canRename ? /* @__PURE__ */ y("label", { className: "cv-ec-field", htmlFor: g, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                we,
                {
                  id: g,
                  defaultValue: m.label ?? "",
                  placeholder: w,
                  className: "cv-ec-h8",
                  onBlur: (D) => T(D.target.value),
                  onKeyDown: (D) => {
                    D.key === "Enter" && (T(D.target.value), D.target.blur());
                  }
                }
              )
            ] }) : null,
            N ? /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(Xv, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ y(be, { children: [
              /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  jt,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (D, O) => /* @__PURE__ */ l(Xa, { value: D, onChange: O })
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
                    renderFixed: (D, O) => /* @__PURE__ */ l(
                      Os,
                      {
                        value: D,
                        onChange: O,
                        allowAuto: !0,
                        autoHint: Ea(m.dateRange),
                        options: ts(m.dateRange),
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
            m.isCategoryField ? /* @__PURE__ */ y(be, { children: [
              /* @__PURE__ */ y("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: f, children: [
                /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: f,
                    "aria-labelledby": h,
                    value: m.sortValue,
                    onChange: (D) => m.onSort(D.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((D) => /* @__PURE__ */ l("option", { value: D.key, children: D.label }, D.key))
                  }
                )
              ] }),
              /* @__PURE__ */ y("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: p, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  we,
                  {
                    id: p,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (D) => {
                      const O = D.target.value.trim();
                      m.onLimit(O === "" ? void 0 : Number(O));
                    },
                    onKeyDown: (D) => {
                      if (D.key === "Enter") {
                        const O = D.target.value.trim();
                        m.onLimit(O === "" ? void 0 : Number(O)), D.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ y("label", { className: "cv-ec-row", htmlFor: C, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(ea, { id: C, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
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
              title: `${R}${j}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${R}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: B
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
function eb({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ y(be, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ y("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(qs, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
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
          /* @__PURE__ */ l(ac, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function tb({
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
  orientation: g,
  lockedSingle: f,
  disableReorder: h,
  label: p,
  note: k,
  pickerSide: C,
  pickerAlign: w,
  control: R
}) {
  const N = n.cardinality === "many" && !f, M = N || r.length === 0, T = r.length, E = g === "vertical", B = p ?? n.label, j = N && T > 1 && !h, [D, O] = b.useState(null), z = ["number", "category", "time"].filter((V) => !xe(n, V)).map((V) => Ba(n, V, r)).find((V) => V !== void 0) ?? n.hint, F = a.length === 0 && !n.optional && xe(n, "number") ? "Pick a number to get started" : void 0, $ = /* @__PURE__ */ l(
    Ja,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: C ?? (E ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          title: z,
          className: A(
            "cv-well-add",
            E && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Nt, { className: "cv-ec-icon" }),
            r.length === 0 ? B : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "well-group",
      className: A("cv-well-group", !E && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ y("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: B }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        R ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: R }) : null,
        /* @__PURE__ */ l(mr, { label: B, resetKey: e, children: /* @__PURE__ */ y("div", { className: A("cv-well-fields", E ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((V, I) => /* @__PURE__ */ l(
            Zv,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: i(V),
              resolvedColor: o(V),
              getSwap: d ? () => d(V) : void 0,
              className: E ? "cv-field-pill--full" : void 0,
              reorder: j ? {
                index: I,
                total: T,
                dragging: D === I,
                onDragStart: () => O(I),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  D === null || D === I || (t(ra(e, n, D, I)), O(I));
                },
                onDragEnd: () => O(null),
                onMove: (Q) => t(ra(e, n, I, I + Q))
              } : void 0
            },
            V
          )),
          M ? $ : null
        ] }) }),
        F ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: F }) : null,
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
    /* @__PURE__ */ l(Ve, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(mr, { label: e, children: n }) })
  ] });
}
function Za(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function nb({ spec: e, update: t }) {
  var d;
  const { fo: n, setFO: r } = Za(e, t), a = zs(e), i = (d = e.query.timeDimensions) == null ? void 0 : d[0], o = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (m) => {
    const g = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!g) return;
    const f = { ...g };
    for (const h of Object.keys(m)) {
      const p = m[h];
      p === void 0 ? delete f[h] : f[h] = p;
    }
    delete f.granularity, t({ ...e, query: { ...e.query, timeDimensions: [f] } });
  };
  return /* @__PURE__ */ y("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(ln, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      Gs,
      {
        id: m,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (g) => u({ dimension: g }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(ln, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      jt,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => u({ dateRange: g }),
        renderFixed: (g, f) => /* @__PURE__ */ l(Xa, { value: g, onChange: f })
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
    o === "gauge" ? /* @__PURE__ */ l(ln, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      we,
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
function rb({ spec: e, update: t }) {
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
    i ? /* @__PURE__ */ y(be, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(ln, { label: "Baseline value", children: ({ id: d }) => /* @__PURE__ */ l(
        we,
        {
          id: d,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const g = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(g) ? g : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ y("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(so, { className: "cv-kpi-warn-icon" }),
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
function ab({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Za(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = ts((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ y("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ln, { label: "Trend", children: ({ id: d, labelId: m }) => /* @__PURE__ */ l(
      jt,
      {
        labelId: m,
        kind: "granularity",
        value: o,
        onChange: (g) => r({
          sparkline: g === void 0 ? void 0 : { ...a, granularity: g }
        }),
        renderFixed: (g, f) => /* @__PURE__ */ l(
          Os,
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
function ln({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ y("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function ib({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var W, ne, ce;
  const { meta: a } = ft(), i = dt(), o = b.useCallback(
    (L) => t(Qv(L, a, i)),
    [t, a, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), d = u.queryless ?? !1, m = u.enforcesAxisUnit, g = zs(e), f = sr(), h = b.useMemo(() => Eg(c, i), [c, i]), p = b.useMemo(() => sn(e, i), [e, i]), k = b.useMemo(() => new Map(h.map((L) => [L.id, L])), [h]), C = b.useMemo(
    () => Ui(a, e, void 0, i),
    [a, e, i]
  ), w = b.useMemo(() => Object.values(p).flat(), [p]), R = b.useMemo(
    () => {
      var L;
      return C.viewLocked ? [C.viewLocked] : [(L = C.sourceCube) == null ? void 0 : L.name, ...C.relatedCubes.map((x) => x.name)].filter(
        Boolean
      );
    },
    [C]
  ), N = b.useMemo(
    () => Object.values(p).every((L) => L.length === 0),
    [p]
  ), M = b.useCallback(
    (L) => {
      const x = (L.y ?? [])[0], S = x ? De(a, x) : void 0;
      return {
        leftKey: x ? Ws(S) : void 0,
        leftLabel: x ? ob(S, f(S == null ? void 0 : S.unit)) : void 0
      };
    },
    [a, f]
  ), T = b.useMemo(() => M(p), [M, p]), E = b.useCallback(
    (L, x) => (S, _) => {
      var K;
      if (_) {
        if (!Uv(L, _.cube))
          return "Clear the current fields to use a different dataset.";
        if (_.memberType === "measure" && L.measureSource && _.cube !== L.measureSource)
          return `This chart's numbers come from ${((K = L.sourceCube) == null ? void 0 : K.title) ?? L.measureSource}. Remove them to use another table.`;
        if (m && S === "y" && _.memberType === "measure")
          return zg(_, x.leftKey, x.leftLabel);
      }
    },
    [m]
  ), B = b.useMemo(
    () => E(C, T),
    [E, C, T]
  ), j = T.leftLabel, D = b.useMemo(() => {
    var x;
    const L = {};
    if (c === "bar" || c === "line" || c === "area") {
      const S = (x = s.mapping) == null ? void 0 : x.series;
      if (S && S.mode === "measures") {
        const _ = S.members.map((H) => {
          var G, J;
          return { key: H, colorToken: (J = (G = S.meta) == null ? void 0 : G[H]) == null ? void 0 : J.colorToken };
        }), K = Xo(_, s.colors);
        S.members.forEach((H, G) => {
          L[H] = K[G];
        });
      }
    }
    return L;
  }, [c, s.mapping, s.colors]), O = b.useCallback(
    (L, x, S) => {
      const _ = De(a, x);
      if (B(L, _)) return;
      let K = S === "geoPoint" && (_ != null && _.latMember) && _.lngMember ? _t(
        _t(e, c, "lat", _.latMember, "numberDimension", i),
        c,
        "lng",
        _.lngMember,
        "numberDimension",
        i
      ) : _t(e, c, L, x, S, i);
      const H = u.canonicalTimeWell;
      if (H && L !== H && (p[H] ?? []).length === 0) {
        const G = As(a, _ == null ? void 0 : _.cube);
        G && G.name !== x && !B(H, G) && (K = _t(K, c, H, G.name, "time", i));
      }
      o(K);
    },
    [B, a, o, e, c, i, u, p]
  ), z = b.useCallback(
    (L, x) => {
      if (d) return;
      const S = k.get(L), _ = De(a, x);
      if (!S || !_) return;
      const K = (p[L] ?? []).indexOf(x), H = Ks(e, c, L, x, i), G = sn(H, i), J = Ui(a, H, void 0, i), Ce = E(J, M(G)), ve = G[L] ?? [], q = Object.values(G).flat(), se = (X, he) => {
        if (X === x) return;
        let Ne = _t(H, c, L, X, he, i);
        const Ye = (sn(Ne, i)[L] ?? []).indexOf(X);
        K >= 0 && Ye > K && (Ne = ra(Ne, S, Ye, K)), o(Ne);
      }, ue = Ds(a, _), _e = at(a, _.cube), We = ue.length > 1 ? {
        options: ue.map((X, he) => {
          const Ne = X.memberType === "measure" ? "number" : "numberDimension", Rt = X.name === x ? void 0 : Ys(S, Ne, ve, X, (hl) => Ce(L, hl)), Ye = Ga(X);
          return {
            label: Us(X, at(a, X.cube)),
            selected: X.name === x,
            disabled: Rt !== void 0,
            title: Rt ?? (Ye ? Ya(_e) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: Ye && he > 0,
            onSelect: () => se(X.name, Ne)
          };
        })
      } : void 0, Y = w.filter((X) => {
        var he;
        return ((he = De(a, X)) == null ? void 0 : he.cube) === _.cube;
      }).length === 1 ? fg(_) : void 0;
      return {
        picker: {
          well: S,
          placed: q,
          inWell: ve,
          scope: J,
          blockReason: (X) => Ce(L, X),
          onSelect: se
        },
        agg: We,
        hint: We ? Ig(ue, _e, _) : void 0,
        notice: Y
      };
    },
    [d, k, a, p, w, e, c, i, E, M, o]
  ), F = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, $ = F.left.map((L) => k.get(L)).filter(Boolean), V = F.bottom.map((L) => k.get(L)).filter(Boolean), I = (W = p.color) == null ? void 0 : W[0], Q = ((ne = p.y) == null ? void 0 : ne.length) ?? 0, te = I && Q > 1 ? `${Q} values × ${((ce = De(a, I)) == null ? void 0 : ce.label) ?? "this split"} — one series per value per group.` : void 0, U = u.hasLegend, oe = (p.y ?? [])[0], me = (L) => {
    var _, K, H, G;
    if (!L) return;
    const x = (_ = s.mapping) == null ? void 0 : _.series;
    return (x && x.mode === "measures" ? (H = (K = x.meta) == null ? void 0 : K[L]) == null ? void 0 : H.label : void 0) ?? ((G = De(a, L)) == null ? void 0 : G.label);
  }, le = (L) => {
    var S, _, K, H;
    const x = (G, J) => J ? /* @__PURE__ */ l(lv, { spec: e, update: o, axis: G, title: "Title", auto: me(J) }) : null;
    switch (L) {
      case "y":
        return x("y", oe);
      // the single value axis
      case "x":
        return x("x", (_ = (S = s.mapping) == null ? void 0 : S.category) == null ? void 0 : _.member);
      case "sy":
        return x("y", (K = p.sy) == null ? void 0 : K[0]);
      // scatter Y axis
      case "sx":
        return x("x", (H = p.sx) == null ? void 0 : H[0]);
      // scatter X axis
      default:
        return null;
    }
  }, pe = (L, x) => /* @__PURE__ */ l(
    tb,
    {
      spec: e,
      update: o,
      well: L,
      placed: p[L.id] ?? [],
      allPlaced: w,
      optionFor: (S) => De(a, S),
      colorFor: (S) => D[S],
      scope: C,
      blockReason: (S) => B(L.id, S),
      onAdd: (S, _) => O(L.id, S, _),
      swapFor: (S) => z(L.id, S),
      badge: L.id === "y" ? j : void 0,
      orientation: x,
      note: L.id === "color" ? te : void 0,
      control: le(L.id)
    },
    L.id
  ), ge = () => {
    var _;
    const L = k.get("value"), x = (p.value ?? []).length > 0, S = s.familyOptions ?? {};
    return /* @__PURE__ */ y(be, { children: [
      /* @__PURE__ */ y("div", { className: "cv-edit-kpi-value", children: [
        L ? pe(L, "vertical") : null,
        x ? /* @__PURE__ */ l(
          xr,
          {
            label: "Time, range & display",
            summary: S.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(nb, { spec: e, update: o })
          }
        ) : null
      ] }),
      x ? /* @__PURE__ */ y(be, { children: [
        /* @__PURE__ */ l(
          xr,
          {
            label: "Comparison",
            summary: S.comparison === void 0 ? "None" : S.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(rb, { spec: e, update: o })
          }
        ),
        /* @__PURE__ */ l(
          xr,
          {
            label: "Trend",
            summary: rg(
              (_ = S.sparkline) == null ? void 0 : _.granularity
            ),
            children: /* @__PURE__ */ l(ab, { spec: e, update: o })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ y("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ y("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !N || d ? /* @__PURE__ */ l(Ov, { spec: e, update: o }) : null,
      /* @__PURE__ */ y("div", { className: "cv-edit-overlay-actions", children: [
        w.length > 0 && C.sourceCube ? /* @__PURE__ */ y(
          "span",
          {
            className: "cv-edit-anchor",
            title: C.sourceCube.grain ?? C.sourceCube.title,
            children: [
              /* @__PURE__ */ l(mo, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: C.sourceCube.title }),
              C.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: C.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(iv, { spec: e, update: o, cube: g, scopeCubes: R, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ y("div", { className: "cv-edit-overlay-body", children: [
      $.length > 0 ? /* @__PURE__ */ l("div", { className: A("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ge() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        $.map((L) => pe(L, "vertical"))
      ) }) : null,
      /* @__PURE__ */ y("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ y("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Tv, { spec: e, update: o, empty: N && !d })
        ] }),
        V.length > 0 ? /* @__PURE__ */ y("div", { className: "cv-edit-overlay-bottom", children: [
          V.map((L) => pe(L, "horizontal")),
          U && !N ? /* @__PURE__ */ l(cv, { spec: e, update: o }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function ob(e, t) {
  const n = Bs(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function ul(e, t) {
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
  const t = Mo.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function sb({
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
  const s = ul((g) => t(g), n), c = r.spec, u = r.issues, d = u.length === 0, m = b.useCallback(
    (g) => {
      const f = Mr(g);
      a({ spec: g, issues: f }), f.length === 0 && (o(g), s(g));
    },
    [s]
  );
  return { draft: c, issues: u, valid: d, committed: i, update: m };
}
const lb = () => {
};
function cb({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = dt(), { draft: s, issues: c, valid: u, committed: d, update: m } = sb({
    spec: e,
    onChange: t ?? lb,
    debounceMs: r
  }), g = o.get(s.chart.family), f = (g == null ? void 0 : g.queryless) ?? !1, h = d, p = (E) => {
    var B, j, D;
    return (((B = E == null ? void 0 : E.measures) == null ? void 0 : B.length) ?? 0) > 0 || (((j = E == null ? void 0 : E.dimensions) == null ? void 0 : j.length) ?? 0) > 0 || (((D = E == null ? void 0 : E.timeDimensions) == null ? void 0 : D.some((O) => typeof O.granularity == "string")) ?? !1);
  }, k = (E) => {
    var B;
    return (((B = E == null ? void 0 : E.measures) == null ? void 0 : B.length) ?? 0) > 0;
  }, C = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", w = f || p(s.query) && p(h.query) && (!C || k(s.query) && k(h.query)), R = C && !k(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = b.useCallback(
    (E) => {
      m({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...E }
        }
      });
    },
    [s, m]
  ), M = w ? /* @__PURE__ */ l(
    Ia,
    {
      query: h.query ?? {},
      chart: h.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: R }) }), T = n ? /* @__PURE__ */ y(ee, { size: "sm", disabled: !u, onClick: () => n(d), children: [
    /* @__PURE__ */ l(po, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "chart-editor",
      className: A("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ y(Yn, { variant: "destructive", children: [
          /* @__PURE__ */ l(ma, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(Qn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Jn, { children: /* @__PURE__ */ y("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((E, B) => /* @__PURE__ */ y("li", { children: [
              E.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: E.path }) : null,
              " ",
              E.message
            ] }, B)),
            c.length > 3 ? /* @__PURE__ */ y("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(mr, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(ib, { spec: s, update: m, toolbar: T, children: M }) }) })
      ]
    }
  );
}
function ub({
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
  discardDisabled: g,
  onSave: f,
  saveDisabled: h,
  className: p
}) {
  const k = i || o, [C, w] = b.useState(!1);
  b.useEffect(() => {
    if (!C) return;
    const T = setTimeout(() => w(!1), 1600);
    return () => clearTimeout(T);
  }, [C]), b.useEffect(() => {
    h || w(!1);
  }, [h]);
  const R = () => {
    f == null || f(), w(!0);
  }, N = u ? `Undo ${u}` : "Undo", M = d ? `Redo ${d}` : "Redo";
  return /* @__PURE__ */ y("div", { "data-slot": "editor-toolbar", className: A("cv-editor-toolbar", p), children: [
    /* @__PURE__ */ l(
      we,
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
        className: A(r && "cv-editor-toolbar-variables--on"),
        children: [
          /* @__PURE__ */ l(ic, {}),
          " Variables",
          a ? /* @__PURE__ */ l("span", { className: "cv-editor-toolbar-badge", children: a }) : null
        ]
      }
    ) }) : null,
    /* @__PURE__ */ y("div", { className: "cv-editor-toolbar-actions", children: [
      k ? /* @__PURE__ */ y(be, { children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            onClick: i,
            disabled: !s,
            "aria-label": N,
            title: N,
            children: /* @__PURE__ */ l(oc, {})
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
            children: /* @__PURE__ */ l(sc, {})
          }
        )
      ] }) : null,
      m ? /* @__PURE__ */ y(
        ee,
        {
          variant: "ghost",
          size: "sm",
          onClick: m,
          disabled: g,
          className: "cv-editor-toolbar-discard",
          children: [
            /* @__PURE__ */ l(lc, {}),
            " Discard"
          ]
        }
      ) : null,
      f ? /* @__PURE__ */ y(
        ee,
        {
          size: "sm",
          onClick: R,
          disabled: h,
          "aria-live": "polite",
          className: A(
            // Keep the confirmation vivid even though the button is (correctly) disabled
            // right after a save — there's nothing left to save.
            C && "cv-editor-toolbar-save--saved"
          ),
          children: [
            C ? /* @__PURE__ */ l(Wt, {}) : /* @__PURE__ */ l(po, {}),
            " ",
            C ? "Saved" : "Save"
          ]
        }
      ) : null
    ] })
  ] });
}
const ml = "lg", qt = 12;
function mb(e, t) {
  const n = t[ml];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function db(e, t) {
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
const ei = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function fb(e, t, n, r = qt) {
  const a = ei[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function hb(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? qt) {
  const a = fb(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function pb(e, t, n, r = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? qt) {
  const i = ei[t.type], o = Math.min(i.w, r), s = {
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
function ti(e) {
  const t = /* @__PURE__ */ new Set([0]);
  for (const n of e) t.add(n.y + n.h);
  return [...t].filter((n) => !e.some((r) => r.y < n && r.y + r.h > n)).sort((n, r) => n - r);
}
function gb(e, t = qt) {
  const n = ti(e), r = [];
  for (let a = 0; a < n.length - 1; a++) {
    const i = n[a], o = n[a + 1], s = e.filter((u) => u.y >= i && u.y + u.h <= o);
    if (s.length === 0) continue;
    const c = [...new Set(s.map((u) => u.x + u.w))].sort((u, d) => u - d);
    for (const u of c)
      u <= 0 || u >= t || s.some((d) => d.x < u && d.x + d.w > u) || r.push({ rowY: i, rowBottom: o, x: u, free: !s.some((d) => d.x >= u) });
  }
  return r;
}
const vb = 2;
function bb(e, t, n, r, a = ((i) => (i = e.grid) == null ? void 0 : i.cols)() ?? qt) {
  const o = ei[t.type], c = ti(e.layout).find((w) => w > n) ?? Number.POSITIVE_INFINITY, u = (w) => w.y >= n && w.y + w.h <= c, d = e.layout.filter((w) => u(w) && w.x >= r), m = (w, R) => {
    const N = {
      i: t.id,
      x: r,
      y: n,
      w,
      h: o.h,
      minW: Math.min(o.minW, w),
      minH: o.minH
    };
    return {
      ...e,
      widgets: [...e.widgets, t],
      layout: [...e.layout.map((M) => R.get(M.i) ?? M), N]
    };
  };
  if (d.length === 0)
    return m(Math.max(1, Math.min(o.w, a - r)), /* @__PURE__ */ new Map());
  const g = Math.min(o.w, a), f = d.map((w) => ({ ...w, x: w.x + g }));
  if (f.every((w) => w.x + w.w <= a))
    return m(g, new Map(f.map((w) => [w.i, w])));
  const h = a - r - g, p = Math.min(...d.map((w) => w.x)), k = Math.max(...d.map((w) => w.x + w.w)) - p;
  if (h >= 1 && k > 0) {
    const w = h / k, R = d.map((N) => ({
      ...N,
      x: r + g + Math.round((N.x - p) * w),
      w: Math.max(N.minW ?? vb, Math.round(N.w * w))
    }));
    if (R.every((N) => N.x >= r + g && N.x + N.w <= a))
      return m(g, new Map(R.map((N) => [N.i, N])));
  }
  const C = d.map((w) => ({ ...w, y: w.y + o.h }));
  return m(g, new Map(C.map((w) => [w.i, w])));
}
const yb = 900, kb = 0.4;
function wb(e, t) {
  const n = (e == null ? void 0 : e.cols) ?? qt, r = (e == null ? void 0 : e.rowHeight) ?? 40, a = (e == null ? void 0 : e.margin) ?? [12, 12], i = (e == null ? void 0 : e.containerPadding) ?? [0, 0], o = Math.max(kb, Math.min(1, t / yb)), s = Math.round(o / 0.05) * 0.05;
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
function Gi(e, t) {
  const n = t.containerPadding[1] + e * (t.rowHeight + t.margin[1]) - t.margin[1] / 2;
  return Math.max(0, n);
}
function Cb(e, t) {
  return Math.max(0, e * (t.rowHeight + t.margin[1]) - t.margin[1]);
}
function Nb(e, t) {
  const n = t - e.containerPadding[0] * 2 - e.margin[0] * Math.max(0, e.cols - 1);
  return Math.max(0, n / e.cols);
}
function Sb(e, t, n) {
  const r = t.containerPadding[0] + e * (Nb(t, n) + t.margin[0]) - t.margin[0] / 2;
  return Math.max(0, r);
}
function xb(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return hb(e, a);
}
function Mb(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Rb(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Tb = 10, dl = [
  { kind: "chart", label: "Chart", Icon: lo },
  { kind: "text", label: "Text", Icon: ho },
  { kind: "input", label: "Input", Icon: cc }
];
function Ob({
  rows: e,
  columns: t,
  metrics: n,
  width: r,
  containerRef: a,
  onInsert: i,
  disabled: o
}) {
  const [s, c] = b.useState(null), [u, d] = b.useState(null), m = b.useMemo(() => {
    const f = e.map((h) => ({
      key: `row:${h}`,
      axis: "row",
      rowY: h,
      top: Gi(h, n)
    }));
    for (const h of t)
      f.push({
        key: `col:${h.rowY}:${h.x}`,
        axis: "col",
        rowY: h.rowY,
        colX: h.x,
        // The line spans its own row band only — a column gap means nothing outside it.
        top: Gi(h.rowY, n) + n.margin[1] / 2,
        left: Sb(h.x, n, r),
        height: Cb(h.rowBottom - h.rowY, n)
      });
    return f;
  }, [e, t, n, r]), g = b.useRef(m);
  return g.current = m, b.useEffect(() => {
    const f = a.current;
    if (!f || o) return;
    const h = (k) => {
      const C = f.getBoundingClientRect(), w = k.clientX - C.left, R = k.clientY - C.top;
      let N = null, M = Tb;
      for (const T of g.current) {
        let E;
        if (T.axis === "row")
          E = Math.abs(R - T.top);
        else {
          if (R < T.top || R > T.top + (T.height ?? 0)) continue;
          E = Math.abs(w - (T.left ?? 0));
        }
        E <= M && (N = T.key, M = E);
      }
      c(N);
    }, p = () => c(null);
    return f.addEventListener("pointermove", h), f.addEventListener("pointerleave", p), () => {
      f.removeEventListener("pointermove", h), f.removeEventListener("pointerleave", p);
    };
  }, [a, o]), b.useEffect(() => {
    o && (c(null), d(null));
  }, [o]), o ? null : /* @__PURE__ */ l("div", { "data-slot": "insert-lines", className: "cv-insert-lines", children: m.map((f) => {
    const h = u === f.key || s === f.key, p = f.axis === "col";
    return /* @__PURE__ */ y(
      "div",
      {
        style: p ? { top: f.top, left: f.left, height: f.height } : { top: f.top },
        className: A(
          "cv-insert-line",
          p && "cv-insert-line--col",
          h && "cv-insert-line--active"
        ),
        children: [
          /* @__PURE__ */ l("span", { className: "cv-insert-line-rule" }),
          /* @__PURE__ */ y(
            Pe,
            {
              open: u === f.key,
              onOpenChange: (k) => d(k ? f.key : null),
              children: [
                /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    "aria-label": p ? `Insert a widget beside row ${f.rowY}, at column ${f.colX}` : `Insert a widget at row ${f.rowY}`,
                    tabIndex: h ? 0 : -1,
                    className: "cv-insert-line-button",
                    children: /* @__PURE__ */ l(Nt, {})
                  }
                ) }),
                /* @__PURE__ */ l(
                  Ve,
                  {
                    align: "center",
                    side: p ? "right" : "bottom",
                    className: "cv-insert-menu",
                    children: dl.map(({ kind: k, label: C, Icon: w }) => /* @__PURE__ */ y(
                      "button",
                      {
                        type: "button",
                        className: "cv-insert-menu-item",
                        onClick: () => {
                          d(null), c(null), i(k, f.rowY, f.colX);
                        },
                        children: [
                          /* @__PURE__ */ l(w, {}),
                          C
                        ]
                      },
                      k
                    ))
                  }
                )
              ]
            }
          )
        ]
      },
      f.key
    );
  }) });
}
function _b({
  onInsert: e
}) {
  return /* @__PURE__ */ y("div", { "data-slot": "editor-empty", className: "cv-editor-empty", children: [
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-title", children: "This dashboard is empty" }),
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-hint", children: "Add a widget to start — later ones drop in wherever you point on the canvas." }),
    /* @__PURE__ */ l("div", { className: "cv-editor-empty-tiles", children: dl.map(({ kind: t, label: n, Icon: r }) => /* @__PURE__ */ y(
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
function Ab(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Db({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o,
  onInsert: s
}) {
  const [c, u] = us(), d = b.useRef(null), m = b.useCallback(
    (O) => {
      d.current = O, c(O);
    },
    [c]
  ), g = b.useMemo(() => wb(e.grid, u), [e.grid, u]), { cols: f, rowHeight: h } = g, p = g.margin, k = g.containerPadding, [C, w] = b.useState(!1), R = b.useMemo(() => ti(e.layout), [e.layout]), N = b.useMemo(
    () => gb(e.layout, f),
    [e.layout, f]
  ), M = b.useMemo(
    () => ({ [ml]: Ab(e.layout) }),
    [e.layout]
  ), T = b.useMemo(
    () => new Map(e.widgets.map((O) => [O.id, O])),
    [e.widgets]
  ), E = b.useRef(o);
  b.useEffect(() => {
    E.current = o;
  }, [o]);
  const B = b.useRef(e.layout);
  b.useEffect(() => {
    B.current = e.layout;
  }, [e.layout]);
  const j = b.useRef(null), D = b.useCallback(
    (O, z) => {
      const $ = mb(O, z).map((V) => ({ ...V }));
      Eb(B.current, $) || E.current($);
    },
    []
  );
  return /* @__PURE__ */ l(Fa, { spec: e, children: /* @__PURE__ */ y("div", { ref: m, className: "cv-editor-canvas", children: [
    u > 0 && s && e.widgets.length === 0 ? /* @__PURE__ */ l(_b, { onInsert: (O) => s(O, 0) }) : null,
    u > 0 ? /* @__PURE__ */ l(
      vo,
      {
        width: u,
        layouts: M,
        breakpoints: { lg: 0 },
        cols: { lg: f },
        rowHeight: h,
        margin: p,
        containerPadding: k,
        dragConfig: { enabled: !0, handle: `.${Pn}` },
        resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
        onLayoutChange: D,
        onDragStart: () => w(!0),
        onDragStop: () => w(!1),
        onResizeStart: () => w(!0),
        onResizeStop: () => w(!1),
        children: e.layout.map((O) => {
          const z = T.get(O.i);
          if (!z) return null;
          const F = z.id === t;
          return (
            // Selecting = a click that bubbles up from anywhere in the widget;
            // RGL's drag (mousedown on the chrome header handle) wins for drags,
            // so we don't need a blocking overlay that would also block dragging.
            /* @__PURE__ */ y(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Select ${z.title ?? z.type}`,
                "aria-pressed": F,
                onPointerDown: ($) => {
                  j.current = { x: $.clientX, y: $.clientY };
                },
                onClick: ($) => {
                  const V = j.current;
                  V && Math.hypot($.clientX - V.x, $.clientY - V.y) > 5 || n(z.id);
                },
                onKeyDown: ($) => {
                  ($.key === "Enter" || $.key === " ") && ($.preventDefault(), n(z.id));
                },
                className: A(
                  "cv-editor-widget",
                  // Idle = no chrome at all; hover paints a faint 1px ring so the
                  // hover target (and its action cluster) is obvious, and the
                  // SELECTED widget keeps the strong ring.
                  F && "cv-editor-widget--selected"
                ),
                children: [
                  /* @__PURE__ */ l(qr, { widget: z, editable: !0 }),
                  /* @__PURE__ */ l("div", { "aria-hidden": !0, className: A(Pn, "cv-editor-widget-drag-layer") }),
                  /* @__PURE__ */ y("div", { className: "cv-editor-widget-actions", children: [
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Edit ${z.title ?? z.type}`,
                        onClick: ($) => {
                          $.stopPropagation(), r(z.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(uc, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Duplicate ${z.title ?? z.type}`,
                        onClick: ($) => {
                          $.stopPropagation(), a(z.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(mc, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Delete ${z.title ?? z.type}`,
                        onClick: ($) => {
                          $.stopPropagation(), i(z.id);
                        },
                        className: A("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                        children: /* @__PURE__ */ l(Bt, {})
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
      Ob,
      {
        rows: R,
        columns: N,
        metrics: g,
        width: u,
        containerRef: d,
        onInsert: s,
        disabled: C
      }
    ) : null
  ] }) });
}
function Eb(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Lb = b.memo(Db);
function Fb(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Ib({
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
  const a = bo({
    extensions: [ko],
    editable: !0,
    content: Fb(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: A(ms, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(fe, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ y("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l($b, { editor: a }),
    /* @__PURE__ */ l(yo, { editor: a })
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
      className: A("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function $b({ editor: e }) {
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
            children: /* @__PURE__ */ l(dc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(fc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(hc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(pc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(gc, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(vc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(bc, {})
          }
        ),
        /* @__PURE__ */ l(
          Ze,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(yc, {})
          }
        )
      ]
    }
  );
}
const Pb = fa(
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
function zb({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: A(Pb({ variant: t }), e), ...n });
}
function Vb({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = ft(), c = b.useMemo(() => ur(o), [o]), u = c.filter((g) => g.type === "view"), d = c.find((g) => g.name === e), m = b.useMemo(() => {
    const g = c.filter((k) => k.type === "cube"), f = g.some((k) => k.category), h = [], p = /* @__PURE__ */ new Map();
    for (const k of g) {
      const C = k.category ?? (f ? "More tables" : "Tables");
      p.has(C) || (p.set(C, []), h.push(C)), p.get(C).push(k);
    }
    return h.sort((k, C) => k === "More tables" ? 1 : C === "More tables" ? -1 : k.localeCompare(C)), h.map((k) => ({ label: k, items: p.get(k) }));
  }, [c]);
  return /* @__PURE__ */ y(Le, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Ie, { id: a, className: i, children: /* @__PURE__ */ l(Fe, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(Rr, { option: d }) : void 0 }) }),
    /* @__PURE__ */ y($e, { children: [
      u.length > 0 ? /* @__PURE__ */ y(Br, { children: [
        /* @__PURE__ */ l(Kr, { children: "Saved datasets" }),
        u.map((g) => /* @__PURE__ */ l(ke, { value: g.name, children: /* @__PURE__ */ l(Rr, { option: g }) }, g.name))
      ] }) : null,
      m.map((g) => /* @__PURE__ */ y(Br, { children: [
        /* @__PURE__ */ l(Kr, { children: g.label }),
        g.items.map((f) => /* @__PURE__ */ l(ke, { value: f.name, children: /* @__PURE__ */ l(Rr, { option: f }) }, f.name))
      ] }, g.label))
    ] })
  ] });
}
function Rr({ option: e }) {
  const t = e.type === "view" ? fo : kc;
  return /* @__PURE__ */ y("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(zb, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const jb = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function Wb(e) {
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
function Bb({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(Wb(s));
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
              /* @__PURE__ */ l($e, { children: t.map((s) => /* @__PURE__ */ l(ke, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(fe, { label: "Control", children: /* @__PURE__ */ y(Le, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
      /* @__PURE__ */ l($e, { children: jc.options.map((s) => /* @__PURE__ */ l(ke, { value: s, children: jb[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Kb, { control: r, onChange: a, variables: t })
  ] });
}
function Kb({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Hb, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Ub, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Gb, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Yb, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Qb, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Jb, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Hb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ y(be, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          qb,
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
function qb({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(Sn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === Sn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ y(Pe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(ze, { asChild: !0, children: /* @__PURE__ */ y(ee, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(ut, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Ve, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Sn.map((s) => {
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
                className: A("cv-preset-select-check", c && "cv-preset-select-check--checked"),
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
function Ub({
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
  return /* @__PURE__ */ y(be, { children: [
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
                /* @__PURE__ */ l(ke, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ke, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
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
          className: A("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Gb({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ y(be, { children: [
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
            we,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            we,
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
              className: A("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(Bt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Yb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ y(be, { children: [
    /* @__PURE__ */ l(fe, { label: "From", children: /* @__PURE__ */ y(
      Le,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
          /* @__PURE__ */ y($e, { children: [
            /* @__PURE__ */ l(ke, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(ke, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(ke, { value: "dimensionOrMeasure", children: "All fields" })
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
          Vb,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Qb({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(fe, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    we,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function Jb({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(fe, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    we,
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
  return /* @__PURE__ */ y(be, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function Xb(e) {
  return { schemaVersion: Et, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Zb(e) {
  const t = {
    schemaVersion: Et,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function ey(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Yi({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ y("div", { "data-slot": "widget-edit-panel", className: A("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      fe,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          we,
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
      /* @__PURE__ */ l(Fa, { spec: Xb(t), children: /* @__PURE__ */ l(Gg, { createVariable: o, children: /* @__PURE__ */ l("div", { className: A(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        cb,
        {
          fill: a,
          spec: Zb(e),
          onChange: (s) => n(ey(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Ib, { widget: e, onChange: n }) : /* @__PURE__ */ l(Bb, { widget: e, variables: t, onChange: n })
  ] });
}
function ty(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function ny(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function ry(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function ay(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function iy(e, t) {
  switch (e) {
    case "chart":
      return ny(t);
    case "text":
      return ry(t);
    case "input":
      return ay(t);
  }
}
function oy(e) {
  return { name: e, type: "string" };
}
function sy(e) {
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
function ly(e) {
  const t = {}, n = (r) => t[r] ?? (t[r] = { inputs: [], refs: 0 });
  for (const r of e.variables) n(r.name);
  for (const r of e.widgets) {
    if (r.type === "input") {
      const a = r.control.variable;
      a && n(a).inputs.push(r.id);
      continue;
    }
    r.type === "chart" && (qn(r.query, (a) => void n(a.var).refs++), qn(r.chart, (a) => void n(a.var).refs++));
  }
  return t;
}
function cy(e) {
  const t = [], n = (e == null ? void 0 : e.inputs.length) ?? 0, r = (e == null ? void 0 : e.refs) ?? 0;
  return n > 0 && t.push(`${n} input${n === 1 ? "" : "s"}`), r > 0 && t.push(`${r} quer${r === 1 ? "y" : "ies"}`), t.length > 0 ? t.join(" · ") : "Unused";
}
function uy(e, t, n) {
  if (t === n || n === "") return e;
  const r = e.variables;
  return !r.some((a) => a.name === t) || r.some((a) => a.name === n) ? e : {
    ...e,
    variables: r.map((a) => a.name === t ? { ...a, name: n } : a),
    widgets: e.widgets.map((a) => fl(a, t, () => ({ var: n }), n))
  };
}
function my(e, t) {
  const n = e.variables.find((a) => a.name === t), r = n == null ? void 0 : n.default;
  return {
    ...e,
    variables: e.variables.filter((a) => a.name !== t),
    widgets: e.widgets.map(
      (a) => fl(a, t, () => r === void 0 ? Hn : r, "")
    )
  };
}
const Hn = Symbol("cv.removeVarRef");
function fl(e, t, n, r) {
  let a = e;
  a.type === "input" && a.control.variable === t && (a = { ...a, control: { ...a.control, variable: r } });
  const i = ia(a, t, n);
  return i === Hn ? a : i;
}
function qn(e, t) {
  if (Se(e)) {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (const n of e) qn(n, t);
    return;
  }
  if (e && typeof e == "object")
    for (const n of Object.values(e)) qn(n, t);
}
function ia(e, t, n) {
  if (Se(e)) return e.var === t ? n(e) : e;
  if (Array.isArray(e)) {
    let r = !1;
    const a = [];
    for (const i of e) {
      const o = ia(i, t, n);
      if (o === Hn) {
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
      if (s === Hn) {
        r = !0;
        continue;
      }
      s !== o && (r = !0), a[i] = s;
    }
    return r ? a : e;
  }
  return e;
}
const Qi = {
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
function dy({
  spec: e,
  onChange: t,
  onClose: n,
  newName: r,
  className: a
}) {
  const i = e.variables, o = b.useMemo(() => ly(e), [e]), [s, c] = b.useState(null), u = b.useRef(0), d = () => {
    if (r) return r();
    let h;
    do
      h = `var_${++u.current}`;
    while (i.some((p) => p.name === h));
    return h;
  }, m = (h, p) => t((k) => ({
    ...k,
    variables: k.variables.map((C) => C.name === h ? fy(C, p) : C)
  })), g = () => {
    const h = d();
    t((p) => ({ ...p, variables: [...p.variables, oy(h)] })), c(h);
  }, f = (h, p) => t((k) => {
    const C = k.variables.findIndex((N) => N.name === h), w = C + p;
    if (C < 0 || w < 0 || w >= k.variables.length) return k;
    const R = k.variables.slice();
    return [R[C], R[w]] = [R[w], R[C]], { ...k, variables: R };
  });
  return /* @__PURE__ */ y(
    "aside",
    {
      "data-slot": "variables-dock",
      "aria-label": "Dashboard variables",
      className: A("cv-variables-dock", a),
      children: [
        /* @__PURE__ */ y("div", { className: "cv-variables-dock-header", children: [
          /* @__PURE__ */ y("span", { className: "cv-variables-dock-title", children: [
            "Variables",
            i.length > 0 ? /* @__PURE__ */ l("span", { className: "cv-variables-dock-count", children: i.length }) : null
          ] }),
          /* @__PURE__ */ y("div", { className: "cv-variables-dock-header-actions", children: [
            /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", onClick: g, children: [
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
          /* @__PURE__ */ y(ee, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: g, children: [
            /* @__PURE__ */ l(Nt, {}),
            " Add variable"
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: i.map((h, p) => /* @__PURE__ */ l(
          hy,
          {
            decl: h,
            index: p,
            total: i.length,
            usage: o[h.name],
            takenNames: i.filter((k, C) => C !== p).map((k) => k.name),
            autoFocusName: s === h.name,
            onNameCommitted: () => c(null),
            onRename: (k) => t((C) => uy(C, h.name, k)),
            onPatch: (k) => m(h.name, k),
            onRemove: () => t((k) => my(k, h.name)),
            onMove: (k) => f(h.name, k)
          },
          h.name || `unnamed-${p}`
        )) }) })
      ]
    }
  );
}
function fy(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = sy(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function hy({
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
  const [m, g] = b.useState(!0), f = b.useId(), [h, p] = b.useState(e.name);
  b.useEffect(() => p(e.name), [e.name]);
  const k = h.trim(), C = k === "" ? "Name required" : a.includes(k) && k !== e.name ? "Name already used" : void 0, w = () => {
    if (C || k === e.name) {
      if (C) return;
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
          onClick: () => g((T) => !T),
          className: "cv-variable-row-toggle",
          children: m ? /* @__PURE__ */ l(ut, {}) : /* @__PURE__ */ l(Gn, {})
        }
      ),
      /* @__PURE__ */ l(
        we,
        {
          value: h,
          placeholder: "variable_name",
          "aria-label": "Variable name",
          "aria-invalid": C ? !0 : void 0,
          autoFocus: i,
          onChange: (T) => p(T.target.value),
          onBlur: w,
          onKeyDown: (T) => {
            T.key === "Enter" ? (T.preventDefault(), w()) : T.key === "Escape" && p(e.name);
          },
          className: "cv-variable-row-name"
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Qi[e.type] }),
      /* @__PURE__ */ y("div", { className: "cv-variable-row-actions", children: [
        /* @__PURE__ */ l(
          ee,
          {
            variant: "ghost",
            size: "icon",
            className: A("cv-ed-btn-7", "cv-ed-muted"),
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
            className: A("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable down",
            disabled: t === n - 1,
            onClick: () => d(1),
            children: /* @__PURE__ */ l(ua, {})
          }
        )
      ] })
    ] }),
    C ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: C }) : null,
    m ? /* @__PURE__ */ y("div", { className: "cv-variable-row-body", children: [
      /* @__PURE__ */ l(fe, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ y(Le, { value: e.type, onValueChange: (T) => c({ type: T }), children: [
        /* @__PURE__ */ l(Ie, { children: /* @__PURE__ */ l(Fe, {}) }),
        /* @__PURE__ */ l($e, { children: So.options.map((T) => /* @__PURE__ */ l(ke, { value: T, children: Qi[T] }, T)) })
      ] }) }),
      /* @__PURE__ */ l(
        fe,
        {
          label: "Label",
          htmlFor: f,
          hint: "Optional human label for controls.",
          className: "cv-ed-row-tight",
          children: /* @__PURE__ */ l(
            we,
            {
              id: f,
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
      /* @__PURE__ */ l(py, { decl: e, onChange: (T) => c({ default: T }) }),
      /* @__PURE__ */ y("div", { className: "cv-variable-row-usage", children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: A(
              "cv-variable-row-usage-text",
              R === 0 && "cv-variable-row-usage-text--none"
            ),
            children: R === 0 ? "Unused" : `Used by ${cy(r)}`
          }
        ),
        /* @__PURE__ */ y(
          ee,
          {
            variant: "ghost",
            size: "sm",
            className: A("cv-ed-muted", "cv-ed-hover-danger", N && "cv-ed-danger"),
            onClick: () => {
              if (R > 0 && !N) {
                M(!0);
                return;
              }
              u();
            },
            children: [
              /* @__PURE__ */ l(Bt, {}),
              N ? `Remove (in use by ${R})` : "Remove"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
}
function py({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(lt, { label: "Default", checked: e.default === !0, onChange: (i) => t(i) });
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(fe, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      we,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : gy(e.default);
  return /* @__PURE__ */ l(fe, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    we,
    {
      id: n,
      value: a,
      placeholder: vy(e.type),
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
function gy(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function vy(e) {
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
function i0({
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
  redoLabel: g,
  onDiscard: f,
  families: h,
  onCreateChart: p,
  openWidgetId: k,
  className: C
}) {
  var _e, We;
  const [w, R] = b.useState(e), [N, M] = b.useState(e);
  b.useEffect(() => {
    R(e), M(e);
  }, [e]);
  const [T, E] = b.useState(null), B = b.useRef(0), [j, D] = b.useState(null), [O, z] = b.useState(!1), F = b.useRef(T), $ = b.useRef(j), V = b.useRef(w);
  b.useEffect(() => {
    F.current = T, $.current = j, V.current = w;
  });
  const I = b.useRef(null);
  I.current === null && (I.current = i ?? ty());
  const Q = i ?? I.current, te = ul(
    (P, Y) => r == null ? void 0 : r(P, Y),
    o
  ), U = b.useCallback(
    (P, Y) => {
      B.current = Date.now(), R((X) => {
        const he = P(X);
        return te(he, Y), he;
      });
    },
    [te]
  ), oe = b.useRef(/* @__PURE__ */ new Map()), me = b.useCallback((P, Y) => `${P}:${Y}:${oe.current.get(Y) ?? 0}`, []), le = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === le.current) return;
    const P = 500;
    let Y = null;
    const X = () => {
      var Ye;
      const he = Date.now() - B.current;
      if (he < P) {
        Y = setTimeout(X, P - he);
        return;
      }
      le.current = t;
      const Ne = /* @__PURE__ */ new Set();
      ((Ye = $.current) == null ? void 0 : Ye.kind) === "widget" && Ne.add($.current.id), F.current && Ne.add(F.current);
      const Rt = yy(t, V.current, Ne);
      R(Rt), n == null || n(Rt);
    };
    return X(), () => {
      Y && clearTimeout(Y);
    };
  }, [t]);
  const pe = b.useCallback(
    (P, Y, X) => {
      if (P === "chart" && p) {
        p();
        return;
      }
      const he = iy(P, Q());
      U(
        (Ne) => X === void 0 ? pb(Ne, he, Y) : bb(Ne, he, Y, X),
        {
          kind: "add",
          widgetId: he.id,
          label: `add ${P}`
        }
      ), E(he.id), P === "chart" && D({ kind: "widget", id: he.id });
    },
    [U, Q, p]
  ), ge = b.useRef(void 0);
  b.useEffect(() => {
    !k || ge.current === k || w.widgets.some((P) => P.id === k) && (ge.current = k, E(k), D({ kind: "widget", id: k }));
  }, [k, w.widgets]);
  const W = b.useCallback((P) => E(P), []), ne = b.useCallback((P) => {
    E(P), D({ kind: "widget", id: P });
  }, []), ce = b.useCallback(
    (P) => {
      U((Y) => Mb(Y, P), {
        kind: "remove",
        widgetId: P,
        label: `delete "${wn(V.current.widgets.find((Y) => Y.id === P))}"`
      }), E((Y) => Y === P ? null : Y), D((Y) => (Y == null ? void 0 : Y.id) === P ? null : Y);
    },
    [U]
  ), L = b.useCallback(
    (P) => {
      const Y = Q();
      U((X) => xb(X, P, Y), {
        kind: "duplicate",
        widgetId: Y,
        label: `duplicate "${wn(V.current.widgets.find((X) => X.id === P))}"`
      }), E(Y);
    },
    [U, Q]
  ), x = b.useCallback(
    (P) => {
      const Y = P.type === "text" ? "text" : "widget";
      U((X) => Rb(X, P), {
        kind: Y,
        widgetId: P.id,
        label: `edit "${wn(P)}"`,
        coalesceKey: me(Y, P.id)
      });
    },
    [U, me]
  ), S = b.useCallback(
    (P) => U(
      (Y) => {
        const X = db(Y.layout, P);
        return by(Y.layout, X) ? Y : { ...Y, layout: X };
      },
      { kind: "layout", label: "layout change" }
    ),
    [U]
  ), _ = b.useCallback(
    (P) => U((Y) => ({ ...Y, name: P || void 0 }), {
      kind: "name",
      label: "rename dashboard",
      // Every keystroke is one commit; the host folds them into one undo step.
      coalesceKey: "name"
    }),
    [U]
  ), K = b.useCallback(
    (P) => U((Y) => ({ ...Y, variables: P }), {
      kind: "variables",
      label: "edit variables",
      coalesceKey: "variables"
    }),
    [U]
  ), H = b.useCallback(
    (P) => U(P, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
    [U]
  ), G = b.useDeferredValue(w), J = b.useMemo(
    () => Lr.safeParse(G),
    [G]
  ), Ce = b.useCallback(() => {
    const P = Lr.safeParse(w);
    P.success && (a == null || a(P.data), M(w));
  }, [w, a]), ve = w !== N, q = j ? w.widgets.find((P) => P.id === j.id) ?? null : null;
  b.useEffect(() => {
    j && !w.widgets.some((P) => P.id === j.id) && D(null);
  }, [j, w.widgets]);
  const se = b.useCallback(() => {
    D((P) => (P && oe.current.set(P.id, (oe.current.get(P.id) ?? 0) + 1), null));
  }, []), ue = q ? wn(q) : "";
  return /* @__PURE__ */ l(La, { families: h, children: /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((We = (_e = w.grid) == null ? void 0 : _e.margin) == null ? void 0 : We[0]) ?? 12 },
      className: A("cv-dashboard-editor", C),
      children: [
        /* @__PURE__ */ l(
          ub,
          {
            name: w.name ?? "",
            onNameChange: _,
            onToggleVariables: () => z((P) => !P),
            variablesOpen: O,
            variableCount: w.variables.length,
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: d,
            undoLabel: m,
            redoLabel: g,
            onDiscard: f,
            discardDisabled: !ve,
            onSave: a ? Ce : void 0,
            saveDisabled: !J.success || !ve,
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
          /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: j ? null : /* @__PURE__ */ l(
            Lb,
            {
              spec: w,
              selectedId: T,
              onSelect: W,
              onEdit: ne,
              onDuplicate: L,
              onDelete: ce,
              onLayoutChange: S,
              onInsert: pe
            }
          ) }),
          O && !j ? /* @__PURE__ */ l(
            dy,
            {
              spec: w,
              onChange: H,
              onClose: () => z(!1)
            }
          ) : null
        ] }),
        j ? /* @__PURE__ */ y(
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
                      /* @__PURE__ */ l(Bt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(mr, { label: ue, resetKey: w, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: (q == null ? void 0 : q.type) === "chart" ? /* @__PURE__ */ l(
                Yi,
                {
                  fill: !0,
                  widget: q,
                  variables: w.variables,
                  onChange: x,
                  onVariablesChange: K
                }
              ) : q ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Yi,
                {
                  widget: q,
                  variables: w.variables,
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
function wn(e) {
  if (!e) return "widget";
  if (e.title) return e.title;
  const t = e.type;
  return `${t[0].toUpperCase()}${t.slice(1)} widget`;
}
function by(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function yy(e, t, n) {
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
  Ju as AreaChartFamily,
  Du as AreaFamilyOptionsSchema,
  Ic as AxesOptionsSchema,
  li as AxisOptionsSchema,
  Uy as BUILTIN_CHART_FAMILIES,
  Je as BUILTIN_DEFAULTS,
  Qe as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Yu as BarChartFamily,
  _u as BarFamilyOptionsSchema,
  ml as CANONICAL_BREAKPOINT,
  ot as ChartColorTokenSchema,
  ib as ChartEditOverlay,
  cb as ChartEditor,
  Ac as ChartFamilySchema,
  ka as ChartInteractionProvider,
  No as ChartOptionsSchema,
  Jo as ChartRenderer,
  Mo as ChartSpecSchema,
  zc as ChartTransformSchema,
  r0 as ChartView,
  Bc as ChartWidgetSchema,
  $c as ColorAssignmentSchema,
  $u as CondFormatRuleSchema,
  Ia as CubeChart,
  wh as CubeChartSpec,
  Co as CubeQuerySchema,
  ir as CubeVizContext,
  e0 as CubeVizProvider,
  tr as DEFAULT_COLOR_RAMP,
  qt as DEFAULT_COLS,
  ei as DEFAULT_FOOTPRINT,
  ki as DEFAULT_MARK_THEME,
  Cn as DEFAULT_TRANSFORM_WINDOW,
  Wr as DEFAULT_UNIT_CONVERSIONS,
  Pn as DRAG_HANDLE_CLASS,
  n0 as Dashboard,
  i0 as DashboardEditor,
  Fa as DashboardProvider,
  Lr as DashboardSpecSchema,
  Dr as DateRangeSchema,
  Vu as EMPTY_FAMILY_DEFAULT,
  di as EM_DASH,
  Lb as EditorCanvas,
  ub as EditorToolbar,
  La as FamilyRegistryOverride,
  Xg as FilterBuilder,
  Rc as FilterOperatorSchema,
  Dc as FormatKindSchema,
  ha as FormatOptionsSchema,
  bu as GRANULARITY_PATTERN,
  Mc as GranularityChoiceSchema,
  it as GranularitySchema,
  Gc as GridConfigSchema,
  lm as HeatmapChartFamily,
  zu as HeatmapFamilyOptionsSchema,
  jc as InputControlKindSchema,
  Wc as InputControlSchema,
  Bb as InputWidgetEditor,
  Hc as InputWidgetSchema,
  jh as InputWidgetView,
  Ob as InsertLines,
  mm as KpiFamily,
  Fu as KpiFamilyOptionsSchema,
  Uc as LayoutItemSchema,
  Tc as LeafFilterSchema,
  Lc as LegendOptionsSchema,
  Qu as LineChartFamily,
  Au as LineFamilyOptionsSchema,
  de as MemberSchema,
  oi as OrderDirSchema,
  _c as OrderSpecSchema,
  em as PieChartFamily,
  Eu as PieFamilyOptionsSchema,
  Er as QueryFilterSchema,
  Xn as ReferenceLineOptSchema,
  qr as RenderWidget,
  Et as SCHEMA_VERSION,
  xc as ScalarSchema,
  nm as ScatterChartFamily,
  Lu as ScatterFamilyOptionsSchema,
  Ec as SeriesMappingSchema,
  si as SeriesMetaSchema,
  Ro as SpecSchema,
  Iu as TableColumnOptSchema,
  Sm as TableFamily,
  Pu as TableFamilyOptionsSchema,
  Ib as TextWidgetEditor,
  Kc as TextWidgetSchema,
  Nh as TextWidgetView,
  Oc as TimeDimensionSchema,
  Vc as TipTapDocSchema,
  Fc as TooltipOptionsSchema,
  Pc as TransformKindSchema,
  En as VarRefSchema,
  Yc as VariableDeclSchema,
  So as VariableTypeSchema,
  wo as VariableValueSchema,
  dy as VariablesDock,
  vs as WidgetChrome,
  Yi as WidgetEditPanel,
  qc as WidgetSpecSchema,
  a0 as adaptiveGranularity,
  hb as appendWidget,
  Wm as areaChartFamily,
  Ci as assignColors,
  Ea as autoGranularityFor,
  nh as axisKey,
  Vm as barChartFamily,
  _a as buildFamilyRegistry,
  Zy as builtinCharts,
  Ge as builtinFamilyDescriptors,
  er as builtinFamilyRegistry,
  As as canonicalTimeOf,
  gg as collapseFamilies,
  gb as columnBoundaries,
  Sb as columnBoundaryLeft,
  Nb as columnWidth,
  hu as createCubeClient,
  ty as createIdFactory,
  rs as createQueryResolver,
  is as createUnitsFormatter,
  wd as createVariableStore,
  ku as datePattern,
  Fr as deepMerge,
  Oa as defaultChartFamilies,
  sy as defaultForType,
  va as defaultFormatter,
  wb as editorGridMetrics,
  Wn as familyKeyOf,
  pu as fetchMeta,
  at as findCube,
  De as findMember,
  Jy as formatCategory,
  rn as formatDateValue,
  lg as geoPointId,
  pg as grainAggLabel,
  es as granularitiesForSpan,
  ts as granularityOptionsFor,
  Hm as heatmapChartFamily,
  bb as insertWidgetAtColumn,
  pb as insertWidgetAtRow,
  zt as isEmptyValue,
  Se as isVarRef,
  qm as kpiChartFamily,
  jm as lineChartFamily,
  ur as listCubes,
  St as listMembers,
  fu as loadSpec,
  ga as looksLikeIsoDate,
  ba as makeChartFormat,
  Qy as makeDateFormatter,
  Xy as makeFormatter,
  Va as memberAgg,
  mg as memberAggDefault,
  xn as memberCanonicalTime,
  Bn as memberFamilyTitle,
  _s as memberGroup,
  db as mergeLayout,
  ar as mergeUnitConversions,
  ny as newChartWidget,
  ay as newInputWidget,
  ry as newTextWidget,
  oy as newVariable,
  iy as newWidget,
  Zo as normalize,
  og as pathLabel,
  mb as pickCanonicalLayout,
  Bm as pieChartFamily,
  fb as placeNewItem,
  ah as quantityLabel,
  Da as rangeSpanDays,
  my as removeVariable,
  Mb as removeWidget,
  uy as renameVariable,
  Rb as replaceWidget,
  ch as resolveChart,
  Qo as resolveMarkTheme,
  Ym as resolveOptions,
  ju as resolveOptionsWith,
  ns as resolveQuery,
  pd as resolveRelativeDateRange,
  Xo as resolveSeriesColors,
  vd as resolveValue,
  ti as rowBoundaries,
  Gi as rowBoundaryTop,
  Cb as rowSpanHeight,
  Gy as safeLoadSpec,
  Km as scatterChartFamily,
  Um as tableChartFamily,
  To as toDate,
  id as toResultAnnotation,
  cy as usageSummary,
  sb as useChartEditorState,
  Do as useChartInteractions,
  us as useContainerWidth,
  ft as useCubeMeta,
  ls as useCubeQuery,
  Ke as useCubeVizContext,
  cs as useDashboard,
  ul as useDebouncedCallback,
  sr as useDisplayUnit,
  dt as useFamilyRegistry,
  t0 as useFormatter,
  kr as useNormalizedSeries,
  gn as useOptionalDashboard,
  Yy as validateSpec,
  ly as variableUsages
};
//# sourceMappingURL=index.js.map
