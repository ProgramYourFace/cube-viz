var _c = Object.defineProperty;
var Mc = (e, t, n) => t in e ? _c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Lr = (e, t, n) => Mc(e, typeof t != "symbol" ? t + "" : t, n);
import { z as b } from "zod";
import { jsx as l, jsxs as C, Fragment as Ce } from "react/jsx-runtime";
import * as y from "react";
import { useMemo as ie, createContext as Xa, useContext as qo, useState as Lt, useCallback as ft, useEffect as In, useRef as $t, createElement as Fc, useSyncExternalStore as Ja, useId as $c, Component as Oc } from "react";
import { ruleX as Za, ruleY as es, text as Mn, colorLegend as Wo, group as Ac, stack as Ic, barX as Xi, barY as Ji, lineX as Tc, lineY as vr, defineChart as Ct, areaY as lo, dot as ts, cell as Pc } from "@tanstack/charts";
import { crosshair as ns } from "@tanstack/charts/crosshair";
import { scaleBand as Ec } from "@tanstack/charts/scales/band";
import { scaleLinear as Qn } from "@tanstack/charts/scales/linear";
import { scalePoint as Dc } from "@tanstack/charts/scales/point";
import { Chart as Lc } from "@tanstack/charts/react/core";
import { motion as rs } from "@tanstack/charts/motion";
import { tooltip as Uo } from "@tanstack/charts/tooltip";
import { d3Curve as Vr } from "@tanstack/charts/d3/shape";
import { brushX as Vc } from "@tanstack/charts/interaction/brush";
import { controlledSignal as zc } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Hc, scaleLog as Zi, scaleSqrt as Gc } from "d3-scale";
import { curveNatural as jc, curveStepAfter as Bc, curveMonotoneX as qc } from "d3-shape";
import { format as ke, isValid as gn, parseISO as Xn, subDays as Ae, startOfWeek as Jn, endOfWeek as Zn, startOfMonth as Ot, endOfMonth as wn, startOfQuarter as At, endOfQuarter as Cn, startOfYear as It, endOfYear as Sn, subWeeks as co, subMonths as Tt, subQuarters as Pt, subYears as Et, differenceInCalendarDays as Wc, parse as os } from "date-fns";
import { clsx as Uc } from "clsx";
import * as Te from "@radix-ui/react-select";
import { Minus as is, ArrowUp as Ko, ArrowDown as Yo, CalendarRange as as, Search as ss, ChevronsUpDown as Kc, AreaChart as Yc, BarChart3 as ls, Grid3X3 as Qc, Table as Xc, Gauge as Jc, ScatterChart as Zc, PieChart as eu, LineChart as tu, AlertCircle as Qo, ChevronLeft as Xo, ChevronRight as yr, ChevronDown as St, Check as an, ChevronUp as nu, CalendarIcon as cs, MoreVertical as ru, RefreshCw as ou, Image as iu, Sheet as au, ListChecks as su, Table2 as us, Database as ds, Layers as ms, Calendar as lu, Type as fs, Hash as ea, MapPin as cu, Variable as uu, Plus as Vt, Trash2 as sn, ListFilter as du, EyeOff as mu, Eye as fu, AlertTriangle as gu, GripVertical as pu, X as uo, ArrowLeftRight as hu, Save as gs, Braces as vu, Undo2 as yu, Redo2 as bu, RotateCcw as wu, SlidersHorizontal as Cu, Pencil as Su, Copy as ku, Bold as Ru, Italic as Nu, Strikethrough as xu, Heading1 as _u, Heading2 as Mu, List as Fu, ListOrdered as $u, Quote as Ou, Box as Au } from "lucide-react";
import * as er from "@radix-ui/react-popover";
import { cva as Jo } from "class-variance-authority";
import Iu from "@cubejs-client/core";
import { DayPicker as Tu, useDayPicker as Pu } from "react-day-picker";
import { pie as Eu, radialArc as mo, radialText as zr, polar as ps } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as hs } from "react-grid-layout";
import { useEditor as vs, EditorContent as ys } from "@tiptap/react";
import bs from "@tiptap/starter-kit";
const Kt = 5, tr = b.object({ var: b.string().min(1) }).strict();
function _e(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const nr = (e) => b.union([e, tr]), Du = b.union([b.string(), b.number(), b.boolean()]), ht = b.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Jt = "auto", Lu = b.union([ht, b.literal(Jt)]), fo = b.union([b.tuple([b.string(), b.string()]), b.string()]), ws = b.union([
  b.string(),
  b.number(),
  b.boolean(),
  b.tuple([b.string(), b.string()]),
  // absolute date range
  b.array(b.string()),
  b.array(b.number())
]), he = b.string().min(1), Vu = b.enum([
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
]), zu = b.object({
  member: he,
  operator: Vu,
  values: b.array(b.union([Du, tr])).optional()
}).strict(), go = b.lazy(
  () => b.union([
    zu,
    b.object({ and: b.array(go) }).strict(),
    b.object({ or: b.array(go) }).strict()
  ])
), Hu = b.object({
  dimension: he,
  granularity: nr(Lu).optional(),
  dateRange: nr(fo).optional(),
  compareDateRange: b.array(fo).optional()
}).strict(), ta = b.enum(["asc", "desc"]), Gu = b.union([
  b.record(he, ta),
  b.array(b.tuple([he, ta]))
]), Cs = b.object({
  measures: b.array(he).optional(),
  dimensions: b.array(he).optional(),
  timeDimensions: b.array(Hu).optional(),
  filters: b.array(go).optional(),
  segments: b.array(he).optional(),
  order: Gu.optional(),
  limit: nr(b.number()).optional(),
  offset: nr(b.number()).optional(),
  total: b.boolean().optional(),
  timezone: b.string().optional()
}).strict(), ju = b.string().min(1), hC = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], vt = b.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Bu = b.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Zo = b.object({
  kind: Bu.optional(),
  decimals: b.number().optional(),
  abbreviate: b.boolean().optional(),
  prefix: b.string().optional(),
  suffix: b.string().optional(),
  unitSystem: b.enum(["metric", "imperial"]).optional(),
  dateFormat: b.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: b.string().optional()
}).strict(), na = b.object({
  label: b.string().optional(),
  colorToken: vt.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: b.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: b.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), qu = b.object({
  category: b.object({ member: he }).strict(),
  series: b.union([
    b.object({
      mode: b.literal("measures"),
      members: b.array(he),
      meta: b.record(he, na).optional()
    }).strict(),
    b.object({
      mode: b.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: he,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: b.array(he).optional(),
      pivot: he,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: b.record(he, na).optional()
    }).strict()
  ])
}).strict(), Wu = b.object({
  show: b.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: b.enum(["top", "bottom"]).optional()
}).strict(), Uu = b.object({
  show: b.boolean().optional(),
  indicator: b.enum(["dot", "line", "dashed"]).optional(),
  showTotal: b.boolean().optional()
}).strict(), ra = b.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: b.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: b.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: b.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: b.tuple([b.number(), b.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Zo.optional()
}).strict(), Ku = b.object({
  x: ra.optional(),
  y: ra.optional()
}).strict(), Yu = b.object({
  byKey: b.record(b.string(), vt).optional(),
  ramp: b.array(vt).optional()
}).strict(), rr = 7, Qu = b.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Xu = b.object({
  kind: Qu,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: b.number().int().min(2).max(90).optional()
}).strict(), Ss = b.object({
  family: ju,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: qu.optional(),
  orientation: b.enum(["vertical", "horizontal"]).optional(),
  stackMode: b.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Wu.optional(),
  tooltip: Uu.optional(),
  axes: Ku.optional(),
  colors: Yu.optional(),
  format: Zo.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: Xu.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: b.record(b.string(), b.unknown()).optional()
}).strict(), Ju = b.object({ type: b.string(), content: b.array(b.unknown()).optional() }).passthrough(), Zu = b.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), ed = b.object({
  variable: b.string().min(1),
  control: b.discriminatedUnion("kind", [
    b.object({
      kind: b.literal("dateRange"),
      presets: b.array(b.string()).optional(),
      allowFuture: b.boolean().optional()
    }).strict(),
    b.object({
      kind: b.literal("granularity"),
      options: b.array(ht).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: b.string().optional()
    }).strict(),
    b.object({
      kind: b.literal("select"),
      options: b.array(b.object({ value: ws, label: b.string() }).strict()),
      multiple: b.boolean().optional()
    }).strict(),
    b.object({
      kind: b.literal("memberSelect"),
      from: b.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: b.string().optional()
    }).strict(),
    b.object({ kind: b.literal("text"), placeholder: b.string().optional() }).strict(),
    b.object({
      kind: b.literal("number"),
      min: b.number().optional(),
      max: b.number().optional(),
      step: b.number().optional()
    }).strict(),
    b.object({ kind: b.literal("toggle") }).strict()
  ])
}).strict(), ei = {
  id: b.string().min(1),
  title: b.string().optional()
}, td = b.object({ ...ei, type: b.literal("chart"), query: Cs.default({}), chart: Ss }).strict(), nd = b.object({ ...ei, type: b.literal("text"), doc: Ju }).strict(), rd = b.object({ ...ei, type: b.literal("input"), control: ed }).strict(), od = b.discriminatedUnion("type", [
  td,
  nd,
  rd
]), id = b.object({
  i: b.string(),
  x: b.number(),
  y: b.number(),
  w: b.number(),
  h: b.number(),
  minW: b.number().optional(),
  minH: b.number().optional(),
  static: b.boolean().optional()
}).strict(), ad = b.object({
  cols: b.number().optional(),
  rowHeight: b.number().optional(),
  margin: b.tuple([b.number(), b.number()]).optional(),
  containerPadding: b.tuple([b.number(), b.number()]).optional()
}).strict(), ks = b.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), sd = b.object({
  name: b.string().min(1),
  type: ks,
  label: b.string().optional(),
  array: b.boolean().optional(),
  default: ws.optional()
}).strict(), Rs = {
  schemaVersion: b.literal(Kt),
  id: b.string().min(1),
  name: b.string().optional(),
  description: b.string().optional(),
  createdAt: b.string().optional(),
  updatedAt: b.string().optional()
}, Ns = b.object({ ...Rs, kind: b.literal("chart"), query: Cs.default({}), chart: Ss }).strict(), po = b.object({
  ...Rs,
  kind: b.literal("dashboard"),
  variables: b.array(sd),
  widgets: b.array(od),
  layout: b.array(id),
  grid: ad.optional()
}).strict(), xs = b.discriminatedUnion("kind", [Ns, po]);
function J(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ot(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function ld(e) {
  if (!J(e.axes)) return;
  const t = ot(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function cd(e) {
  if (!J(e.mapping)) return;
  const t = e.mapping.series;
  if (!J(t) || !J(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!J(o)) continue;
    const i = ot(o, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function ud(e) {
  if (!J(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => J(n) ? ot(n, "side") ?? {} : n
  ));
}
function dd(e) {
  const t = J(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(J) : [];
  e.family = n.some((a) => a.render === "bar") ? "bar" : "line";
  const r = J(e.mapping) ? e.mapping : void 0, o = r && J(r.series) ? r.series : void 0, i = (o == null ? void 0 : o.mode) === "measures" && Array.isArray(o.members) ? o.members.filter((a) => typeof a == "string") : [];
  if (o && i.length > 0) {
    const a = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (a[s.member] = { colorToken: s.colorToken });
    if (Object.keys(a).length > 0) {
      const s = J(o.meta) ? o.meta : {};
      o.meta = { ...a, ...s };
    }
  }
  e.familyOptions = {};
}
function oa(e) {
  J(e) && (e.family === "combo" && dd(e), ld(e), cd(e), ud(e));
}
function md(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    oa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      J(n) && n.type === "chart" && oa(n.chart);
  return t;
}
function fd(e) {
  if (!J(e.mapping)) return;
  const t = e.mapping.series;
  if (!J(t) || !J(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!J(o)) continue;
    const i = ot(o, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function gd(e) {
  if (!J(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function pd(e) {
  if (J(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!J(n) || !Array.isArray(n.domain) || n.domain.every((o) => typeof o == "number")) continue;
      const r = ot(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function hd(e) {
  if (!J(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = ot(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function ia(e) {
  J(e) && (fd(e), gd(e), pd(e), hd(e));
}
function vd(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ia(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      J(n) && n.type === "chart" && ia(n.chart);
  return t;
}
const yd = {
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
function bd(e) {
  if (!J(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = yd[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const o of n) r = ot(r, o) ?? {};
  e.familyOptions = r;
}
function wd(e) {
  if (J(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!J(n) || n.labelHide !== !0) continue;
      const r = ot(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function aa(e) {
  J(e) && (bd(e), wd(e));
}
function Cd(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    aa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      J(n) && n.type === "chart" && aa(n.chart);
  return t;
}
function Sd(e) {
  if (!J(e.mapping)) return;
  const t = e.mapping.series;
  if (!J(t) || !J(t.meta)) return;
  let n;
  const r = {};
  for (const [a, s] of Object.entries(t.meta)) {
    if (!J(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = ot(s, "curve");
    c && (r[a] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const o = e.family;
  if (n === void 0 || o !== "line" && o !== "area") return;
  const i = J(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function kd(e) {
  const t = structuredClone(e), n = (r) => {
    J(r) && Sd(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      J(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Rd = {
  1: md,
  2: vd,
  3: Cd,
  4: kd
};
function Nd(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Kt} — update the library`
    );
  for (; n < Kt; ) {
    const r = Rd[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return xs.parse(t);
}
function vC(e) {
  try {
    return { ok: !0, spec: Nd(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function yC(e) {
  return xs.parse(e);
}
function xd(e) {
  return Iu(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function _d(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function A(...e) {
  return Uc(e);
}
function Md({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: A("cv-skeleton", e), ...t });
}
const Fd = Jo(
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
), br = y.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: A(Fd({ variant: t }), e),
    ...n
  }
));
br.displayName = "Alert";
const wr = y.forwardRef(
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
wr.displayName = "AlertTitle";
const Cr = y.forwardRef(
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
Cr.displayName = "AlertDescription";
const $d = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Od = "MMM d, yyyy";
function _s(e) {
  if (e instanceof Date) return gn(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return gn(r) ? r : null;
  }
  const t = Xn(e);
  if (gn(t)) return t;
  const n = new Date(e);
  return gn(n) ? n : null;
}
function Sr(e) {
  return /^\d{4}-\d{2}/.test(e) ? gn(Xn(e)) : !1;
}
function Ad(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? $d[t] : Od;
}
function Yt(e, t, n) {
  const r = _s(e);
  return r ? ke(r, Ad(t, n)) : String(e);
}
function bC(e, t) {
  return (n) => n == null ? "" : Yt(n, e, t);
}
function wC(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Yt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Yt(e, t.format, t.granularity) : String(e) : Sr(e) ? Yt(e, t.format, t.granularity) : e;
}
const sa = "—", Id = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function la(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Td(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: o } of Id)
    if (n >= r) return la((e / r).toFixed(t)) + o;
  return la(e.toFixed(t));
}
function Pd(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Ed(e, t) {
  const { format: n, meta: r, locale: o } = t, i = n != null && n.abbreviate ? Td(e, n.decimals ?? 1) : Pd(e, n, o), a = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${a ? ` ${a}` : ""}`;
}
function Ms(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Dd(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ms(e.value) ? !0 : typeof e.value == "string" ? Sr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const ti = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? sa : (Ms(t) || typeof t == "string" || typeof t == "number") && Dd(e) ? Yt(t, n, r) : typeof t == "number" ? Ed(t, e) : String(t);
};
function Ld(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function CC(e, t) {
  return (n, r) => {
    const o = r ? Ld(r, t) : void 0;
    return ti({
      value: n,
      meta: o == null ? void 0 : o.meta,
      title: (o == null ? void 0 : o.shortTitle) ?? (o == null ? void 0 : o.title),
      role: "value",
      format: e
    });
  };
}
function Vd(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function zd(e) {
  const t = ht.safeParse(e);
  return t.success ? t.data : void 0;
}
function Hd(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const o of Object.keys(e.timeDimensions))
      if (o !== n && o.startsWith(`${n}.`)) {
        const i = zd(o.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function ni(e, t, n, r) {
  const o = Hd(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (a) => !a || Object.keys(a).length === 0 ? i : ni(
      e,
      { ...t, format: { ...t.format, ...a } },
      n,
      r
    ),
    value(a, s, c = "value") {
      const u = s ? Vd(s, e) : void 0, m = u == null ? void 0 : u.meta;
      return n({
        value: a,
        member: s,
        meta: m,
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
const kr = b.object({
  axis: b.enum(["x", "y"]),
  value: b.number(),
  label: b.string().optional(),
  colorToken: vt.optional()
}).strict(), ri = b.boolean().optional(), Gd = b.object({
  showValueLabels: b.boolean().optional(),
  referenceLines: b.array(kr).optional(),
  comparePrevious: ri
}).strict(), Fs = b.enum(["linear", "monotone", "step", "natural"]), jd = b.object({
  curve: Fs.optional(),
  dots: b.union([b.boolean(), b.literal("active")]).optional(),
  connectNulls: b.boolean().optional(),
  chrome: b.enum(["full", "none"]).optional(),
  referenceLines: b.array(kr).optional(),
  showValueLabels: b.boolean().optional(),
  comparePrevious: ri
}).strict(), Bd = b.object({
  curve: Fs.optional(),
  connectNulls: b.boolean().optional(),
  dots: b.boolean().optional(),
  referenceLines: b.array(kr).optional(),
  comparePrevious: ri
}).strict(), qd = b.object({
  innerRadiusPct: b.number().optional(),
  showLabels: b.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: b.object({ value: b.string().optional(), label: b.string().optional() }).strict().optional(),
  maxSlices: b.number().optional()
}).strict(), Wd = b.object({
  x: he,
  y: he,
  size: he.optional(),
  groupBy: he.optional(),
  referenceLines: b.array(kr).optional()
}).strict(), Ud = b.object({
  display: b.enum(["number", "gauge"]).optional(),
  measure: he,
  comparison: b.object({
    mode: b.enum(["previousPeriod", "value"]),
    value: b.union([he, b.number()]).optional(),
    showAsPercent: b.boolean().optional(),
    goodDirection: b.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: b.object({
    member: he.optional(),
    timeDimension: he.optional(),
    granularity: b.union([ht, tr]).optional(),
    dateRange: b.union([fo, tr]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: b.enum(["up", "down"]).optional(),
  gauge: b.object({
    min: b.number().optional(),
    max: b.number(),
    thresholds: b.array(b.object({ at: b.number(), colorToken: vt }).strict()).optional()
  }).strict().optional()
}).strict(), Kd = b.object({
  member: he,
  label: b.string().optional(),
  format: Zo.optional(),
  align: b.enum(["left", "right", "center"]).optional(),
  width: b.number().optional(),
  hidden: b.boolean().optional()
}).strict(), Yd = b.object({
  member: he,
  when: b.object({
    op: b.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: b.number()
  }).strict(),
  colorToken: vt.optional()
}).strict(), Qd = b.object({
  columns: b.array(Kd).optional(),
  pageSize: b.number().optional(),
  conditionalFormat: b.array(Yd).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), Xd = b.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: vt.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), st = {
  bar: Gd,
  line: jd,
  area: Bd,
  pie: qd,
  scatter: Wd,
  heatmap: Xd,
  kpi: Ud,
  table: Qd
}, lt = {
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
function ca(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ho(e, t) {
  if (t === void 0) return e;
  if (!ca(e) || !ca(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const o = t[r];
    o !== void 0 && (n[r] = r in e ? ho(e[r], o) : o);
  }
  return n;
}
const Jd = { envelope: {}, familyOptions: {} };
function Zd(e, t) {
  return {
    ...ho({ ...t.envelope }, e),
    familyOptions: ho(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const $s = {}, ua = () => {
}, em = {
  target: $s,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: ua,
  emitPoint: ua
}, or = y.createContext(null);
or.displayName = "ChartInteractionContext";
function Os() {
  return y.useContext(or) ?? em;
}
function oi({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: o
}) {
  const i = y.useContext(or), a = y.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  y.useLayoutEffect(() => {
    a.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = y.useCallback((p) => {
    const { parent: h, widgetId: v, onRangeSelect: w } = a.current, S = p && p.widgetId === void 0 && v !== void 0 ? { ...p, widgetId: v } : p;
    w ? w(S) : h == null || h.emitRange(S);
  }, []), c = y.useCallback((p) => {
    const { parent: h, widgetId: v, onPointSelect: w } = a.current, S = p && p.widgetId === void 0 && v !== void 0 ? { ...p, widgetId: v } : p;
    w ? w(S) : h == null || h.emitPoint(S);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), f = i == null ? void 0 : i.target, g = y.useMemo(
    () => f || r ? { ...f, ...r } : $s,
    [f, r]
  ), d = y.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: g,
      rangeEnabled: u,
      pointEnabled: m,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, g, u, m, s, c]
  );
  return /* @__PURE__ */ l(or.Provider, { value: d, children: o });
}
function Dt(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((o, i) => {
    var s, c, u;
    const a = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const m of n) {
      const f = m.data[i] ?? null;
      f === null && (t != null && t.skipNull) || r.push({
        cat: typeof o == "number" ? o : String(o),
        ...a ? { t: a } : {},
        value: f,
        key: m.key,
        label: m.label,
        member: ((c = m.meta) == null ? void 0 : c.measure) ?? m.key,
        companion: ((u = m.meta) == null ? void 0 : u.companion) ?? !1,
        i
      });
    }
  }), r;
}
function vo(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function As(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = vo(n), o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function ir(e, t, n) {
  const r = [];
  return e.categories.forEach((o, i) => {
    var m, f, g;
    const a = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const d of t) {
      const p = d.data[i];
      if (typeof p == "number" && Number.isFinite(p)) {
        const h = vo(d);
        s.set(h, (s.get(h) ?? 0) + Math.abs(p));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const d of t) {
      const p = d.data[i] ?? null, h = vo(d), v = s.get(h) ?? 0, w = p === null || v === 0 ? null : Math.abs(p) / v;
      let S = 0, x = 0;
      if (p !== null) {
        const _ = p < 0 ? u : c;
        S = _.get(h) ?? 0, x = S + p, _.set(h, x);
      }
      const k = n != null && n.normalize && v > 0 ? 1 / v : 1;
      r.push({
        cat: typeof o == "number" ? o : String(o),
        ...a ? { t: a } : {},
        value: p,
        key: d.key,
        label: d.label,
        member: ((f = d.meta) == null ? void 0 : f.measure) ?? d.key,
        companion: ((g = d.meta) == null ? void 0 : g.companion) ?? !1,
        i,
        stack: h,
        y1: S * k,
        y2: x * k,
        share: w
      });
    }
  }), r;
}
function yo(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((o) => o.startsWith(r)) ?? t;
}
function Fn(e) {
  return e.label || e.key;
}
function dt(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ii(e, t) {
  const n = e.series.map(Fn), r = e.series.map(dt), o = { domain: n, range: r };
  return t != null && t.legend && (o.legend = Wo({ placement: ln(t.legendPlacement) })), o;
}
function ln(e) {
  return e === "top" ? "top" : "bottom";
}
function Tn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function ar(e = 0.2) {
  return Ec().padding(e);
}
function Is() {
  return Dc().padding(0.02);
}
const tm = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function nm(e) {
  if (typeof e == "string" && tm.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return _s(e);
}
function Ts(e) {
  return e.toISOString().slice(0, -1);
}
function da(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = ht.safeParse(n);
  return r.success ? r.data : void 0;
}
function Ps(e, t) {
  var m, f, g;
  const n = (f = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : f.member, r = (g = e.raw.annotation) == null ? void 0 : g.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let o;
  for (const d of Object.keys(r))
    if (d === n || d.startsWith(`${n}.`)) {
      o = d;
      break;
    }
  if (o === void 0) return null;
  const i = o === n ? da(n) : da(o, n), a = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const d of e.categories) {
    if (typeof d == "number" && i === void 0 || typeof d == "string" && !Sr(d)) return null;
    const p = nm(d);
    if (!p) return null;
    s.push(p);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((d) => c.has(d.getTime()) ? !1 : (c.add(d.getTime()), !0)).sort((d, p) => d.getTime() - p.getTime());
  return u.length < 2 ? null : { member: a, granularity: i, dates: s, categories: e.categories, values: u };
}
function Es(e) {
  return e ? Hc : Is;
}
function ai(e) {
  return e ? "t" : "cat";
}
function sr(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, o) => {
    const i = e.categories[o];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Ts(r)) : t.category(r);
}
function ma(e, t) {
  const n = e.dates.findIndex((o) => o.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Ts(t);
}
function Ds(e, t) {
  const n = Os(), [r, o] = y.useState(null), i = y.useRef({ opts: t, interactions: n, temporal: e });
  y.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const a = n.rangeEnabled && e !== null;
  return y.useMemo(() => {
    if (!a || !e) return;
    const s = e.values, c = (d) => d !== void 0 && s.some((p) => p.getTime() === d.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], f = u ?? { start: m, end: m }, g = u === null;
    return [
      Vc({
        id: "cv-brush-x",
        values: s,
        range: zc(
          f,
          (d, { reason: p }) => {
            if (p.type !== "commit") return;
            const h = i.current.temporal, v = d.start.getTime() === d.end.getTime();
            if (o(v ? null : d), v || !h) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: h.member,
              granularity: h.granularity,
              from: ma(h, d.start),
              to: ma(h, d.end)
            });
          }
        ),
        format: (d) => i.current.opts.label(d),
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
function rm(e, t) {
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
function Zt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const o = () => r ? Zi().domain(r) : Zi();
    return { scale: r ? o() : o, nice: !r };
  }
  return r ? { scale: Qn().domain(r), nice: !1 } : { scale: Qn, nice: !0 };
}
function Ls(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function $n(e) {
  switch (e) {
    case "monotone":
      return Vr(qc);
    case "step":
      return Vr(Bc);
    case "natural":
      return Vr(jc);
    default:
      return;
  }
}
function en(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function si(e, t) {
  var a, s, c, u;
  const n = e.raw.annotation, r = (m) => {
    var f, g, d, p, h, v;
    if (m)
      return ((f = n == null ? void 0 : n.measures[m]) == null ? void 0 : f.shortTitle) ?? ((g = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : g.shortTitle) ?? ((d = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : d.shortTitle) ?? ((p = n == null ? void 0 : n.measures[m]) == null ? void 0 : p.title) ?? ((h = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : h.title) ?? ((v = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : v.title) ?? m;
  }, o = e.series[0], i = (m) => {
    var f;
    return m ? (f = m.meta) != null && f.measure ? r(m.meta.measure) : m.label : void 0;
  };
  return {
    x: en((a = t.axes) == null ? void 0 : a.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: en((u = t.axes) == null ? void 0 : u.y, i(o))
  };
}
function Ze(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function li(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function om(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function yt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function ci(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Rr(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Uo,
    className: ci(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const o = r, i = o[0], a = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((f) => {
        var g;
        return { datum: f, color: (g = e.colorOf) == null ? void 0 : g.call(e, f) };
      }) : o.map((f) => ({ datum: f.datum, color: f.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const f of s) {
          const g = f.datum.value;
          f.datum.companion || typeof g != "number" || !Number.isFinite(g) || (c += g, u += 1);
        }
      const m = s.map((f) => ({
        label: f.datum.label,
        value: e.percentShare && c > 0 && typeof f.datum.value == "number" ? yt(f.datum.value / c, e.locale) : n(f.datum),
        color: f.color
      }));
      return e.showTotal && u > 1 && m.push({
        label: "Total",
        value: e.percentShare ? yt(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: a, rows: m };
    }
  };
}
function ui(e) {
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
function di(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], o = t[0];
  return e.forEach((i, a) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", m = u ? t[i.value] : void 0;
    if (u && m == null) return;
    const f = n != null && n.swap ? !u : u, g = f ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      f ? Za([g], { id: `cv-ref-${a}`, ...c }) : es([g], { id: `cv-ref-${a}`, ...c })
    ), !i.label) return;
    const d = u ? n == null ? void 0 : n.valueAnchor : o;
    if (d == null) return;
    const p = (n == null ? void 0 : n.swap) === !0;
    r.push(
      ui(
        Mn(
          [
            {
              x: f ? g : d,
              y: f ? d : g,
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
            dy: f ? p ? -6 : 8 : -6,
            dx: f ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function mi(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function Vs(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const o = ai((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, a = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? yt(c, n.locale) : "";
  };
  return [
    ui(
      Mn(r, {
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
const im = rs({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), am = rs({ initial: !1 });
function kt({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: o = !0,
  minHeight: i = 200,
  onSelect: a,
  resolveSelection: s
}) {
  const c = y.useRef(null), u = Os(), m = u.pointEnabled && !r, f = y.useRef(s);
  y.useLayoutEffect(() => {
    f.current = s;
  });
  const g = y.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const S = f.current, x = S ? S(w) : rm(w, u.target);
      x && u.emitPoint(x);
    },
    [u]
  ), [d, p] = y.useState({ w: 0, h: 0 }), h = y.useId().replace(/:/g, "");
  y.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((x) => {
      var _;
      const k = (_ = x[0]) == null ? void 0 : _.contentRect;
      k && p({ w: Math.floor(k.width), h: Math.floor(k.height) });
    });
    return S.observe(w), () => S.disconnect();
  }, []);
  const v = r ? Math.max(24, d.h || Math.round((d.w || 160) / 5)) : Math.max(i, d.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: d.w > 0 && /* @__PURE__ */ l(
        Lc,
        {
          definition: e,
          renderer: o ? im : am,
          width: d.w,
          height: v,
          ariaLabel: t,
          idPrefix: h,
          onSelect: a ?? (m ? g : void 0)
        }
      )
    }
  );
}
function sm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = y.useMemo(() => {
    var Z, ee, le, me, ce, ye, fe, L, re, ue, P, F;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, m = e.series.filter((N) => {
      var $;
      return ($ = N.meta) == null ? void 0 : $.companion;
    }), f = m.length ? e.series.filter((N) => {
      var $;
      return !(($ = N.meta) != null && $.companion);
    }) : e.series, g = u ? f : e.series, p = (u ? As(g) : []).length > 1, h = p ? ir(e, g, { normalize: c }) : Dt(e, { series: g }), v = new Map(e.series.map((N) => [Fn(N), dt(N)])), w = /* @__PURE__ */ new Map();
    if (p)
      for (const N of h) {
        const $ = w.get(N.i);
        $ ? $.push(N) : w.set(N.i, [N]);
      }
    const S = si(e, t), x = s ? (ee = (Z = t.axes) == null ? void 0 : Z.y) == null ? void 0 : ee.hide : (me = (le = t.axes) == null ? void 0 : le.x) == null ? void 0 : me.hide, k = s ? (ce = t.axes) == null ? void 0 : ce.x : (ye = t.axes) == null ? void 0 : ye.y, _ = Zt(k), R = r.barCategoryGap, M = s ? (fe = t.axes) == null ? void 0 : fe.y : (L = t.axes) == null ? void 0 : L.x, V = Ze(n, M), H = Ze(n, k), I = om(t) ?? li(e.series[0]), T = (N) => c ? yt(N) : H.value(N, I, "axis"), z = x ? !1 : {
      label: S.x,
      ticks: { format: (N) => V.category(N) }
    }, O = k != null && k.hide ? !1 : { label: S.y, ticks: { format: T } }, G = Ac({ padding: r.barGap }), E = p ? G : c ? Ic({ offset: "normalize" }) : u ? void 0 : G, D = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (N) => p ? N.stack : N.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (N) => `${N.label} ${N.i}`,
      layout: E,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (N) => {
        const $ = v.get(N.label) ?? "var(--chart-1)";
        return N.companion ? `color-mix(in oklab, ${$} 40%, transparent)` : $;
      }
    }, X = [
      p ? s ? Xi(h, { ...D, x1: "y1", x2: "y2", y: "cat" }) : Ji(h, { ...D, x: "cat", y1: "y1", y2: "y2" }) : s ? Xi(h, { ...D, x: "value", y: "cat" }) : Ji(h, { ...D, x: "cat", y: "value" })
    ];
    if (u && !c && m.length) {
      const N = e.categories.map(($, j) => {
        var q, Y, te;
        return {
          cat: typeof $ == "number" ? $ : String($),
          value: m.reduce((Ne, we) => {
            const Q = we.data[j];
            return typeof Q != "number" ? Ne : (Ne ?? 0) + Q;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((Y = (q = m[0]) == null ? void 0 : q.meta) == null ? void 0 : Y.measure) ?? ((te = m[0]) == null ? void 0 : te.key),
          companion: !0,
          i: j
        };
      });
      if (N.some(($) => $.value !== null)) {
        const $ = {
          id: "cv-bars-prev",
          key: (j) => `prev ${j.i}`,
          curve: $n("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        X.push(
          s ? Tc(N, { ...$, x: "value", y: "cat" }) : vr(N, { ...$, x: "cat", y: "value" })
        );
      }
    }
    if (X.push(
      ...di(o.referenceLines, e.categories, {
        swap: s,
        valueAnchor: mi(e)
      })
    ), o.showValueLabels) {
      const N = u ? p ? h : ir(e, g, { normalize: c }) : h;
      X.push(
        ...Vs(N, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return Ct({
      marks: X,
      x: s ? { scale: _.scale, nice: _.nice, grid: !0, axis: O } : { scale: () => ar(R), axis: z },
      y: s ? { scale: () => ar(R), axis: z } : { scale: _.scale, nice: _.nice, grid: !0, axis: O },
      color: ii(u ? { ...e, series: g } : e, {
        legend: Tn(t) && g.length > 1,
        legendPlacement: ln((re = t.legend) == null ? void 0 : re.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((ue = t.tooltip) == null ? void 0 : ue.show) === !1 ? void 0 : Rr({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !p,
        value: c && p ? (N) => {
          const $ = N.share;
          return typeof $ == "number" ? yt($) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: p ? (N) => w.get(N.i) ?? [N] : void 0,
        colorOf: p ? (N) => v.get(N.label) ?? "var(--chart-1)" : void 0,
        indicator: (P = t.tooltip) == null ? void 0 : P.indicator,
        showTotal: (F = t.tooltip) == null ? void 0 : F.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, o, r]), a = e.series.map(Fn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(kt, { definition: i, ariaLabel: a, className: "cv-chart--fill" });
}
function lm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var d;
  const o = t.familyOptions ?? {}, i = o.chrome === "none", a = y.useMemo(
    () => i ? null : Ps(e, t),
    [e, t, i]
  ), s = y.useMemo(() => sr(a, n), [a, n]), c = (d = t.axes) == null ? void 0 : d.x, u = y.useMemo(
    () => c != null && c.tickFormat ? sr(a, Ze(n, c)) : s,
    [a, n, c, s]
  ), m = Ds(a, {
    label: s,
    ariaLabel: "Time range"
  }), f = y.useMemo(() => {
    var R, M, V, H, I, T, z, O, G;
    const p = ai(a), h = o.connectNulls ?? !1, v = o.curve ?? "monotone", w = $n(v), S = si(e, t), x = Zt((R = t.axes) == null ? void 0 : R.y), k = e.categories.length <= 1, _ = e.series.map((E) => {
      var X, Z, ee;
      const D = Dt(e, { series: [E], skipNull: h, temporal: a });
      return vr(D, {
        id: `cv-line-${E.key}`,
        x: p,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (X = E.meta) != null && X.companion ? "5 4" : void 0,
        strokeOpacity: (Z = E.meta) != null && Z.companion ? 0.55 : void 0,
        stroke: dt(E),
        points: !i && !((ee = E.meta) != null && ee.companion) && (Ls(E, o.dots) || k)
      });
    });
    return i || (_.push(
      ...di(o.referenceLines, (a == null ? void 0 : a.dates) ?? e.categories, {
        valueAnchor: mi(e)
      }),
      ...Vs(
        o.showValueLabels ? Dt(e, { skipNull: !0, temporal: a }) : [],
        n,
        { temporal: a }
      )
    ), _.push(ns({ x: {}, y: !1, marker: o.dots !== !1 }))), Ct({
      marks: _,
      x: {
        scale: Es(a),
        axis: i || (V = (M = t.axes) == null ? void 0 : M.x) != null && V.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: x.scale,
        nice: x.nice,
        grid: !i,
        axis: i || (I = (H = t.axes) == null ? void 0 : H.y) != null && I.hide ? !1 : {
          label: S.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (E) => {
              var D, X, Z, ee;
              return Ze(n, (D = t.axes) == null ? void 0 : D.y).value(
                E,
                ((Z = (X = e.series[0]) == null ? void 0 : X.meta) == null ? void 0 : Z.measure) ?? ((ee = e.series[0]) == null ? void 0 : ee.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ii(e, {
        legend: !i && Tn(t) && e.series.length > 1,
        legendPlacement: ln((T = t.legend) == null ? void 0 : T.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((z = t.tooltip) == null ? void 0 : z.show) === !1 ? void 0 : Rr({
        format: n,
        category: s,
        indicator: (O = t.tooltip) == null ? void 0 : O.indicator,
        showTotal: (G = t.tooltip) == null ? void 0 : G.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, o, r, i, a, s, u, m]), g = e.series.map(Fn).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    kt,
    {
      definition: f,
      ariaLabel: g,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function cm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var v, w, S;
  const o = t.familyOptions ?? {}, i = ((w = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : w.mode) === "pivot", a = t.stackMode ?? (i ? "stacked" : "none"), s = a === "stacked" || a === "percent", c = a === "percent", u = y.useMemo(() => Ps(e, t), [e, t]), m = y.useMemo(() => sr(u, n), [u, n]), f = (S = t.axes) == null ? void 0 : S.x, g = y.useMemo(
    () => f != null && f.tickFormat ? sr(u, Ze(n, f)) : m,
    [u, n, f, m]
  ), d = Ds(u, { label: m, ariaLabel: "Time range" }), p = y.useMemo(() => {
    var le, me, ce, ye, fe, L, re, ue, P;
    const x = ai(u), k = o.connectNulls ?? !1, _ = o.curve ?? "monotone", R = $n(_), M = r.areaFillOpacity, V = r.stackedAreaFillOpacity, H = r.lineWidth, I = si(e, t), T = Zt((le = t.axes) == null ? void 0 : le.y), z = li(e.series[0]), O = e.series.filter((F) => {
      var N;
      return !((N = F.meta) != null && N.companion);
    }), G = c ? [] : e.series.filter((F) => {
      var N;
      return (N = F.meta) == null ? void 0 : N.companion;
    }), E = new Map(e.series.map((F) => [F.key, dt(F)])), D = [], X = (F) => `cv-area-fill-${F.replace(/[^a-zA-Z0-9_-]/g, "-")}`, Z = s ? void 0 : O.map((F) => ({
      id: X(F.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: dt(F), opacity: M * 0.15 },
        { offset: 1, color: dt(F), opacity: M }
      ]
    }));
    if (s)
      for (const { stackId: F, series: N } of As(O)) {
        const $ = ir(e, N, { normalize: c, temporal: u }).filter(
          // `connectNulls` drops the null rows so the curve bridges the gap; otherwise a
          // null row stays and breaks the segment (the mark skips a non-finite `y`).
          (j) => !(k && j.value === null)
        );
        D.push(
          lo($, {
            id: F ? `cv-area-stack-${F}` : "cv-area-stack",
            x,
            // `y` stays the RAW value (what the tooltip/focus reads); the explicit
            // interval carries the stacking.
            y: "value",
            y1: "y1",
            y2: "y2",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (j) => `${j.key}:${j.i}`,
            curve: R,
            fillOpacity: V,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (j) => E.get(j.key) ?? "currentColor",
            strokeWidth: H
          })
        );
      }
    else
      for (const F of O) {
        const N = Dt(e, { series: [F], skipNull: k, temporal: u });
        D.push(
          lo(N, {
            id: `cv-area-${F.key}`,
            x,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: R,
            fill: `url(#${X(F.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: dt(F),
            strokeWidth: H
          })
        );
      }
    for (const F of G) {
      const N = Dt(e, { series: [F], skipNull: k, temporal: u });
      D.push(
        vr(N, {
          id: `cv-area-prev-${F.key}`,
          x,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: R,
          strokeWidth: H,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: dt(F)
        })
      );
    }
    const ee = new Set(
      O.filter((F) => Ls(F, o.dots)).map((F) => F.key)
    );
    if (ee.size > 0) {
      const F = s ? ir(e, O, { normalize: c, temporal: u }).filter(
        (N) => ee.has(N.key) && N.value !== null
      ) : Dt(e, {
        series: O.filter((N) => ee.has(N.key)),
        skipNull: !0,
        temporal: u
      });
      D.push(
        ts(F, {
          id: "cv-area-dots",
          x,
          y: (N) => s ? N.y2 ?? null : N.value,
          z: "label",
          color: "label",
          key: (N) => `${N.key}:${N.i}`,
          r: 3
        })
      );
    }
    return D.push(
      ...di(o.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: mi(e)
      })
    ), D.push(ns({ x: {}, y: !1, marker: !0 })), Ct({
      marks: D,
      gradients: Z,
      x: {
        scale: Es(u),
        axis: (ce = (me = t.axes) == null ? void 0 : me.x) != null && ce.hide ? !1 : {
          label: I.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: T.scale,
        nice: T.nice,
        grid: !0,
        axis: (fe = (ye = t.axes) == null ? void 0 : ye.y) != null && fe.hide ? !1 : {
          label: I.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (F) => {
              var N;
              return c ? yt(F) : Ze(n, (N = t.axes) == null ? void 0 : N.y).value(F, z, "axis");
            }
          }
        }
      },
      color: ii(e, {
        legend: Tn(t) && e.series.length > 1,
        legendPlacement: ln((L = t.legend) == null ? void 0 : L.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((re = t.tooltip) == null ? void 0 : re.show) === !1 ? void 0 : Rr({
        format: n,
        percentShare: c,
        category: m,
        indicator: (ue = t.tooltip) == null ? void 0 : ue.indicator,
        showTotal: (P = t.tooltip) == null ? void 0 : P.showTotal
      }),
      keyboard: !0,
      controls: d
    });
  }, [e, t, n, o, r, s, c, u, m, g, d]), h = e.series.map(Fn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(kt, { definition: p, ariaLabel: h, className: "cv-chart--fill" });
}
const um = 0.26, dm = 0.03, fa = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function mm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var p, h;
  const o = t.familyOptions ?? {}, i = e.series[0], a = li(i), s = (h = (p = t.colors) == null ? void 0 : p.ramp) != null && h.length ? t.colors.ramp : _r, c = y.useMemo(() => {
    const v = e.categories.map((w, S) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[S]) ?? 0
    }));
    return fm(v, o.maxSlices).map((w, S) => ({
      ...w,
      token: s[S % s.length]
    }));
  }, [e, n, i, o.maxSlices, s]), u = c.reduce((v, w) => v + w.value, 0), m = c.some((v) => v.value < 0), f = m || c.length === 0 || u <= 0, g = y.useMemo(() => {
    var I, T, z;
    if (f) return null;
    const v = (o.innerRadiusPct ?? 0) / 100, w = v > 0, S = o.showLabels ?? "percent", x = S !== "none", k = x ? Math.min(r.pieRadiusPct / 100, 1 - um) : r.pieRadiusPct / 100, _ = Eu(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), M = [mo(_, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: O }) => O * v,
      outerRadius: ({ radius: O }) => O * k,
      cornerRadius: r.pieCornerRadius
    })];
    if (x) {
      const O = (G) => S === "name" ? G.label : S === "value" ? n.value(G.value, a, "label") : yt(G.fraction);
      M.push(
        zr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          _.filter((G) => G.value > 0 && G.fraction >= dm),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (G) => G.angle,
            radius: k,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: O,
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
    if (w && o.centerLabel) {
      const O = o.centerLabel.value === void 0 || o.centerLabel.value === "total" ? n.value(u, a, "label") : o.centerLabel.value;
      if (M.push(
        zr([{ id: "cv-pie-center" }], {
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
      ), o.centerLabel.label) {
        const G = o.centerLabel.label;
        M.push(
          zr([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => G,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const V = {
      domain: c.map((O) => O.label),
      range: c.map((O) => `var(--${O.token})`)
    };
    Tn(t) && (V.legend = Wo({ placement: ln((I = t.legend) == null ? void 0 : I.position) }));
    const H = i ? i.label || i.key : "";
    return Ct({
      marks: [
        ps({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Qn().domain([0, Math.PI * 2]) },
          radius: { scale: Qn().domain([0, 1]) },
          marks: M
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: V,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((T = t.tooltip) == null ? void 0 : T.show) === !1 ? void 0 : {
        use: Uo,
        className: ci((z = t.tooltip) == null ? void 0 : z.indicator),
        content: (O) => {
          const G = O[0];
          if (!G) return { rows: [] };
          const E = G.datum;
          return {
            title: E.label,
            rows: [
              {
                label: H,
                value: `${n.value(E.value, a, "tooltip")} (${yt(E.fraction)})`,
                color: G.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [f, c, u, t, n, o, r, i, a]);
  if (m)
    return /* @__PURE__ */ l("div", { style: fa, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: fa, children: "No data" });
  const d = c.map((v) => v.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(kt, { definition: g, ariaLabel: d, className: "cv-chart--fill" });
}
function fm(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, a) => a.value - i.value), r = n.slice(0, t - 1), o = n.slice(t - 1);
  return [...r, { label: "Other", value: o.reduce((i, a) => i + a.value, 0) }];
}
function gm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = e.raw.annotation, a = (d) => {
    var p, h;
    return ((p = i == null ? void 0 : i.measures[d]) == null ? void 0 : p.shortTitle) ?? ((h = i == null ? void 0 : i.dimensions[d]) == null ? void 0 : h.shortTitle) ?? d;
  }, s = o.x ? a(o.x) : "x", c = o.y ? a(o.y) : "y", u = o.size ? a(o.size) : void 0, m = y.useMemo(() => {
    var E, D, X, Z, ee, le, me, ce, ye, fe, L, re, ue, P;
    if (!o.x || !o.y) return null;
    const d = hm(e.raw.rows, o);
    if (d.length === 0) return null;
    const p = !!o.groupBy, h = [];
    if (p)
      for (const F of d)
        F.group !== void 0 && !h.includes(F.group) && h.push(F.group);
    const [v, w] = r.bubbleAreaRange, S = Math.sqrt(Math.max(v, 0) / Math.PI), x = Math.sqrt(Math.max(w, 0) / Math.PI), k = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, _ = (D = (E = t.colors) == null ? void 0 : E.ramp) != null && D.length ? t.colors.ramp : _r;
    p ? (k.z = "group", k.color = "group") : k.fill = `var(--${_[0]})`, o.size ? (k.r = (F) => F.size ?? 0, k.rScale = { scale: () => Gc().range([S, x]) }) : k.r = 4;
    const R = [ts(d, k)];
    (X = o.referenceLines) == null || X.forEach((F, N) => {
      const $ = `var(--${F.colorToken ?? "muted-foreground"})`, j = { stroke: $, strokeWidth: 1.25, strokeDasharray: "4 4" };
      F.axis === "y" ? (R.push(es([F.value], { id: `cv-ref-${N}`, ...j })), F.label && R.push(
        Mn([{ v: F.value, label: F.label }], {
          id: `cv-ref-label-${N}`,
          y: "v",
          text: "label",
          fill: $,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (R.push(Za([F.value], { id: `cv-ref-${N}`, ...j })), F.label && R.push(
        Mn([{ v: F.value, label: F.label }], {
          id: `cv-ref-label-${N}`,
          x: "v",
          text: "label",
          fill: $,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let M;
    p && (M = {
      domain: h,
      range: h.map((F, N) => `var(--${_[N % _.length]})`)
    }, Tn(t) && (M.legend = Wo({ placement: ln((Z = t.legend) == null ? void 0 : Z.position) })));
    const V = en((ee = t.axes) == null ? void 0 : ee.x, s), H = en((le = t.axes) == null ? void 0 : le.y, c), I = Zt((me = t.axes) == null ? void 0 : me.x), T = Zt((ce = t.axes) == null ? void 0 : ce.y), z = o.x, O = o.y, G = o.size;
    return Ct({
      marks: R,
      x: {
        scale: I.scale,
        nice: I.nice,
        grid: !0,
        axis: (fe = (ye = t.axes) == null ? void 0 : ye.x) != null && fe.hide ? !1 : {
          label: V,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (F) => {
              var N;
              return Ze(n, (N = t.axes) == null ? void 0 : N.x).value(F, z, "axis");
            }
          }
        }
      },
      y: {
        scale: T.scale,
        nice: T.nice,
        grid: !0,
        axis: (re = (L = t.axes) == null ? void 0 : L.y) != null && re.hide ? !1 : {
          label: H,
          ticks: {
            format: (F) => {
              var N;
              return Ze(n, (N = t.axes) == null ? void 0 : N.y).value(F, O, "axis");
            }
          }
        }
      },
      color: M,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((ue = t.tooltip) == null ? void 0 : ue.show) === !1 ? void 0 : {
        use: Uo,
        className: ci((P = t.tooltip) == null ? void 0 : P.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (F) => {
          const $ = F[0];
          if (!$) return { rows: [] };
          const j = $.datum, q = [
            { label: s, value: n.value(j.x, z, "tooltip") },
            { label: c, value: n.value(j.y, O, "tooltip") }
          ];
          return G && q.push({
            label: u ?? G,
            value: n.value(j.size, G, "tooltip")
          }), { title: j.group, color: $.color, rows: q };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, o, r, s, c, u]), f = o.groupBy, g = (d) => {
    var h;
    if (!d || !f) return null;
    const p = (h = d.datum) == null ? void 0 : h.group;
    return p === void 0 ? null : { member: f, value: p, label: p };
  };
  return m ? /* @__PURE__ */ l(
    kt,
    {
      definition: m,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: g
    }
  ) : /* @__PURE__ */ l("div", { style: pm, children: "No data" });
}
const pm = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function hm(e, t) {
  const n = [];
  return e.forEach((r, o) => {
    const i = Hr(r[t.x]), a = Hr(r[t.y]);
    i === null || a === null || n.push({
      x: i,
      y: a,
      size: t.size ? Hr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: o
    });
  }), n;
}
function Hr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function vm(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function ym(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function bm(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function zs(e, t, n) {
  const r = (o) => {
    const i = typeof o == "number" ? o : Number(o), a = Number.isFinite(i) ? bm(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(a * 100)}%, transparent)`;
  };
  return r.copy = () => zs(e, t, n), r;
}
function wm({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: o, y: i, value: a } = vm(t), s = e.raw.rows, c = e.raw.annotation, u = y.useMemo(() => {
    if (!o || !i || !a || s.length === 0) return [];
    const g = yo(s, o), d = yo(s, i), p = /* @__PURE__ */ new Map();
    return s.forEach((h, v) => {
      const w = ym(h[a]), S = h[g], x = h[d];
      if (w === null || S === null || S === void 0 || x === null || x === void 0)
        return;
      const k = typeof S == "number" ? S : String(S), _ = String(x);
      p.set(`${k}\0${_}`, {
        cat: k,
        label: _,
        value: w,
        key: `${k}|${_}`,
        member: a,
        i: v
      });
    }), [...p.values()];
  }, [s, o, i, a]), m = y.useMemo(() => {
    var S, x, k, _, R, M, V, H;
    let g = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY;
    for (const I of u)
      I.value < g && (g = I.value), I.value > d && (d = I.value);
    const p = (I) => {
      if (!I) return;
      const T = (c == null ? void 0 : c.dimensions[I]) ?? (c == null ? void 0 : c.timeDimensions[I]) ?? (c == null ? void 0 : c.measures[I]);
      return (T == null ? void 0 : T.shortTitle) ?? (T == null ? void 0 : T.title) ?? I;
    }, h = en((S = t.axes) == null ? void 0 : S.x, p(o)), v = en((x = t.axes) == null ? void 0 : x.y, p(i)), w = [
      Pc(u, {
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
      ui(
        Mn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (I) => n.value(I.value, I.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), Ct({
      marks: w,
      x: {
        scale: () => ar(0.05),
        axis: (_ = (k = t.axes) == null ? void 0 : k.x) != null && _.hide ? !1 : {
          label: h,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (I) => {
              var T;
              return Ze(n, (T = t.axes) == null ? void 0 : T.x).category(I);
            }
          }
        }
      },
      y: {
        scale: () => ar(0.05),
        axis: (M = (R = t.axes) == null ? void 0 : R.y) != null && M.hide ? !1 : {
          label: v,
          ticks: {
            format: (I) => {
              var T;
              return Ze(n, (T = t.axes) == null ? void 0 : T.y).category(I);
            }
          }
        }
      },
      color: {
        scale: zs(g, d, r.colorToken ?? "chart-1")
      },
      tooltip: ((V = t.tooltip) == null ? void 0 : V.show) === !1 ? void 0 : Rr({ format: n, indicator: (H = t.tooltip) == null ? void 0 : H.indicator })
    });
  }, [u, t, n, r, c, o, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const f = `Heatmap of ${a ?? "value"} by ${o ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(kt, { definition: m, ariaLabel: f, className: "cv-chart--fill" });
}
function Cm(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Sm(e) {
  return `cv-kpi-trend--${e}`;
}
function km(e) {
  var c, u, m, f;
  const { data: t, options: n, format: r } = e, o = n.familyOptions ?? {}, i = (g) => r.value(g, o.measure, "kpi"), a = Hs([t.raw.rows[0] ?? {}], o.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[o.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[o.measure]) == null ? void 0 : f.title) ?? o.measure;
  return o.display === "gauge" ? /* @__PURE__ */ l(Am, { value: a, label: s, fmt: i, fo: o }) : /* @__PURE__ */ l(Rm, { ...e, value: a, label: s, fo: o, fmt: i });
}
function Rm({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const o = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : Tm(e.raw.rows, t, n), a = !!n.comparison, s = a && !i && Nm(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((d) => d !== null), m = i ? i.diff : c ? Fm(c) : 0, f = Sm(Cm(m, o));
  return /* @__PURE__ */ C("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ C("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      a && (i ? /* @__PURE__ */ l($m, { delta: i, goodDirection: o, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(xm, {}) : /* @__PURE__ */ l(_m, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Mm, { data: e, series: c, colorClass: f }) })
  ] });
}
function Nm(e, t) {
  var r, o, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (o = e.timeDimensions) == null ? void 0 : o[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((a) => !a) : String(n).trim() === "";
}
function xm() {
  return /* @__PURE__ */ C(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(as, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function _m() {
  return /* @__PURE__ */ C("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(is, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Mm({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = y.useMemo(() => {
    const o = Dt(e, { series: [t], skipNull: !0 }), i = Zt(void 0);
    return Ct({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        lo(o, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: $n("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        vr(o, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: $n("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Is, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    kt,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Fm(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function $m({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const o = e.diff > 0, i = e.diff === 0, a = i ? !0 : o === (t === "up"), s = i ? is : o ? Ko : Yo, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ C(
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
const pn = -(2 * Math.PI) / 3, bo = 2 * Math.PI / 3, Om = bo - pn;
function Am({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, f;
  const o = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e ?? 0, 1), a = i > o ? i : o + 1, s = e === null ? o : Math.max(o, Math.min(a, e)), c = (e === null ? void 0 : Im(e, r)) ?? "chart-1", u = y.useMemo(() => {
    const g = (s - o) / (a - o), d = pn + g * Om, p = ({ radius: w }) => w * 0.7, h = mo([{ startAngle: pn, endAngle: bo }], {
      id: "cv-gauge-track",
      innerRadius: p,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), v = g > 0 ? [
      h,
      mo([{ startAngle: pn, endAngle: d }], {
        id: "cv-gauge-value",
        innerRadius: p,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [h];
    return Ct({
      marks: [
        ps({
          id: "cv-gauge",
          startAngle: pn,
          endAngle: bo,
          marks: v
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [o, a, s, c]);
  return /* @__PURE__ */ C("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      kt,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ C("div", { className: "cv-kpi-gauge-center", children: [
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
function Im(e, t) {
  var o;
  const n = (o = t.gauge) == null ? void 0 : o.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((a, s) => a.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Hs(e, t) {
  for (const n of e) {
    const r = Gs(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Tm(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let o = null;
  if (r.mode === "value")
    typeof r.value == "number" ? o = r.value : typeof r.value == "string" && (o = Hs(e, r.value));
  else {
    const s = e[1];
    o = s ? Gs(s[n.measure]) : null;
  }
  if (o === null) return null;
  const i = t - o, a = o !== 0 ? i / o : null;
  return { current: t, baseline: o, diff: i, pct: a };
}
function Gs(e) {
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
function mt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Le(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: mt(n, r[e])
    }));
  };
}
function Nr(e) {
  return e instanceof Function;
}
function Pm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Em(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const a = t(i);
      a != null && a.length && r(a);
    });
  };
  return r(e), n;
}
function U(e, t, n) {
  let r = [], o;
  return (i) => {
    let a;
    n.key && n.debug && (a = Date.now());
    const s = e(i);
    if (!(s.length !== r.length || s.some((m, f) => r[f] !== m)))
      return o;
    r = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), o = t(...s), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const m = Math.round((Date.now() - a) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, g = f / 16, d = (p, h) => {
        for (p = String(p); p.length < h; )
          p = " " + p;
        return p;
      };
      console.info(`%c⏱ ${d(f, 5)} /${d(m, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function K(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function Dm(e, t, n, r) {
  const o = () => {
    var a;
    return (a = i.getValue()) != null ? a : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: U(() => [e, n, t, i], (a, s, c, u) => ({
      table: a,
      column: s,
      row: c,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), K(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((a) => {
    a.createCell == null || a.createCell(i, n, t, e);
  }, {}), i;
}
function Lm(e, t, n, r) {
  var o, i;
  const s = {
    ...e._getDefaultColumnDef(),
    ...t
  }, c = s.accessorKey;
  let u = (o = (i = s.id) != null ? i : c ? typeof String.prototype.replaceAll == "function" ? c.replaceAll(".", "_") : c.replace(/\./g, "_") : void 0) != null ? o : typeof s.header == "string" ? s.header : void 0, m;
  if (s.accessorFn ? m = s.accessorFn : c && (c.includes(".") ? m = (g) => {
    let d = g;
    for (const h of c.split(".")) {
      var p;
      d = (p = d) == null ? void 0 : p[h], process.env.NODE_ENV !== "production" && d === void 0 && console.warn(`"${h}" in deeply nested key "${c}" returned undefined.`);
    }
    return d;
  } : m = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: m,
    parent: r,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: U(() => [!0], () => {
      var g;
      return [f, ...(g = f.columns) == null ? void 0 : g.flatMap((d) => d.getFlatColumns())];
    }, K(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: U(() => [e._getOrderColumnsFn()], (g) => {
      var d;
      if ((d = f.columns) != null && d.length) {
        let p = f.columns.flatMap((h) => h.getLeafColumns());
        return g(p);
      }
      return [f];
    }, K(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(f, e);
  return f;
}
const xe = "debugHeaders";
function ga(e, t, n) {
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
const Vm = {
  createTable: (e) => {
    e.getHeaderGroups = U(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, a;
      const s = (i = r == null ? void 0 : r.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? i : [], c = (a = o == null ? void 0 : o.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? a : [], u = n.filter((f) => !(r != null && r.includes(f.id)) && !(o != null && o.includes(f.id)));
      return Vn(t, [...s, ...u, ...c], e);
    }, K(e.options, xe, "getHeaderGroups")), e.getCenterHeaderGroups = U(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Vn(t, n, e, "center")), K(e.options, xe, "getCenterHeaderGroups")), e.getLeftHeaderGroups = U(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Vn(t, i, e, "left");
    }, K(e.options, xe, "getLeftHeaderGroups")), e.getRightHeaderGroups = U(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Vn(t, i, e, "right");
    }, K(e.options, xe, "getRightHeaderGroups")), e.getFooterGroups = U(() => [e.getHeaderGroups()], (t) => [...t].reverse(), K(e.options, xe, "getFooterGroups")), e.getLeftFooterGroups = U(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), K(e.options, xe, "getLeftFooterGroups")), e.getCenterFooterGroups = U(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), K(e.options, xe, "getCenterFooterGroups")), e.getRightFooterGroups = U(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), K(e.options, xe, "getRightFooterGroups")), e.getFlatHeaders = U(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, xe, "getFlatHeaders")), e.getLeftFlatHeaders = U(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, xe, "getLeftFlatHeaders")), e.getCenterFlatHeaders = U(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, xe, "getCenterFlatHeaders")), e.getRightFlatHeaders = U(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, xe, "getRightFlatHeaders")), e.getCenterLeafHeaders = U(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, xe, "getCenterLeafHeaders")), e.getLeftLeafHeaders = U(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, xe, "getLeftLeafHeaders")), e.getRightLeafHeaders = U(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, xe, "getRightLeafHeaders")), e.getLeafHeaders = U(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, a, s, c, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(a = (s = n[0]) == null ? void 0 : s.headers) != null ? a : [], ...(c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []].map((m) => m.getLeafHeaders()).flat();
    }, K(e.options, xe, "getLeafHeaders"));
  }
};
function Vn(e, t, n, r) {
  var o, i;
  let a = 0;
  const s = function(g, d) {
    d === void 0 && (d = 1), a = Math.max(a, d), g.filter((p) => p.getIsVisible()).forEach((p) => {
      var h;
      (h = p.columns) != null && h.length && s(p.columns, d + 1);
    }, 0);
  };
  s(e);
  let c = [];
  const u = (g, d) => {
    const p = {
      depth: d,
      id: [r, `${d}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    g.forEach((v) => {
      const w = [...h].reverse()[0], S = v.column.depth === p.depth;
      let x, k = !1;
      if (S && v.column.parent ? x = v.column.parent : (x = v.column, k = !0), w && (w == null ? void 0 : w.column) === x)
        w.subHeaders.push(v);
      else {
        const _ = ga(n, x, {
          id: [r, d, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: k,
          placeholderId: k ? `${h.filter((R) => R.column === x).length}` : void 0,
          depth: d,
          index: h.length
        });
        _.subHeaders.push(v), h.push(_);
      }
      p.headers.push(v), v.headerGroup = p;
    }), c.push(p), d > 0 && u(h, d - 1);
  }, m = t.map((g, d) => ga(n, g, {
    depth: a,
    index: d
  }));
  u(m, a - 1), c.reverse();
  const f = (g) => g.filter((p) => p.column.getIsVisible()).map((p) => {
    let h = 0, v = 0, w = [0];
    p.subHeaders && p.subHeaders.length ? (w = [], f(p.subHeaders).forEach((x) => {
      let {
        colSpan: k,
        rowSpan: _
      } = x;
      h += k, w.push(_);
    })) : h = 1;
    const S = Math.min(...w);
    return v = v + S, p.colSpan = h, p.rowSpan = v, {
      colSpan: h,
      rowSpan: v
    };
  });
  return f((o = (i = c[0]) == null ? void 0 : i.headers) != null ? o : []), c;
}
const fi = (e, t, n, r, o, i, a) => {
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
    getLeafRows: () => Em(s.subRows, (c) => c.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let c = [], u = s;
      for (; ; ) {
        const m = u.getParentRow();
        if (!m) break;
        c.push(m), u = m;
      }
      return c.reverse();
    },
    getAllCells: U(() => [e.getAllLeafColumns()], (c) => c.map((u) => Dm(e, s, u, u.id)), K(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: U(() => [s.getAllCells()], (c) => c.reduce((u, m) => (u[m.column.id] = m, u), {}), K(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let c = 0; c < e._features.length; c++) {
    const u = e._features[c];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, zm = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, js = (e, t, n) => {
  var r, o;
  const i = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(t)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
js.autoRemove = (e) => Xe(e);
const Bs = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Bs.autoRemove = (e) => Xe(e);
const qs = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
qs.autoRemove = (e) => Xe(e);
const Ws = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Ws.autoRemove = (e) => Xe(e);
const Us = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Us.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ks = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ks.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ys = (e, t, n) => e.getValue(t) === n;
Ys.autoRemove = (e) => Xe(e);
const Qs = (e, t, n) => e.getValue(t) == n;
Qs.autoRemove = (e) => Xe(e);
const gi = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
gi.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, a = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > a) {
    const s = i;
    i = a, a = s;
  }
  return [i, a];
};
gi.autoRemove = (e) => Xe(e) || Xe(e[0]) && Xe(e[1]);
const nt = {
  includesString: js,
  includesStringSensitive: Bs,
  equalsString: qs,
  arrIncludes: Ws,
  arrIncludesAll: Us,
  arrIncludesSome: Ks,
  equals: Ys,
  weakEquals: Qs,
  inNumberRange: gi
};
function Xe(e) {
  return e == null || e === "";
}
const Hm = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Le("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? nt.includesString : typeof r == "number" ? nt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? nt.equals : Array.isArray(r) ? nt.arrIncludes : nt.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return Nr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : nt[e.columnDef.filterFn]
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
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((m) => m.id === e.id), a = mt(n, i ? i.value : void 0);
        if (pa(o, a, e)) {
          var s;
          return (s = r == null ? void 0 : r.filter((m) => m.id !== e.id)) != null ? s : [];
        }
        const c = {
          id: e.id,
          value: a
        };
        if (i) {
          var u;
          return (u = r == null ? void 0 : r.map((m) => m.id === e.id ? c : m)) != null ? u : [];
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
        return (i = mt(t, o)) == null ? void 0 : i.filter((a) => {
          const s = n.find((c) => c.id === a.id);
          if (s) {
            const c = s.getFilterFn();
            if (pa(c, a.value, s))
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
function pa(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Gm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), jm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Bm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, qm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const a = i.getValue(e);
    a != null && (r === void 0 ? a >= a && (r = o = a) : (r > a && (r = a), o < a && (o = a)));
  }), [r, o];
}, Wm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n) return r / n;
}, Um = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Pm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, a) => i - a);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Km = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Ym = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Qm = (e, t) => t.length, Gr = {
  sum: Gm,
  min: jm,
  max: Bm,
  extent: qm,
  mean: Wm,
  median: Um,
  unique: Km,
  uniqueCount: Ym,
  count: Qm
}, Xm = {
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
    onGroupingChange: Le("grouping", e),
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
        return Gr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Gr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return Nr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Gr[e.columnDef.aggregationFn];
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
function Jm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((a) => a.id === i)).filter(Boolean), ...r];
}
const Zm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Le("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = U((n) => [kn(t, n)], (n) => n.findIndex((r) => r.id === e.id), K(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = kn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = kn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = U(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const a = [...t], s = [...o];
        for (; s.length && a.length; ) {
          const c = a.shift(), u = s.findIndex((m) => m.id === c);
          u > -1 && i.push(s.splice(u, 1)[0]);
        }
        i = [...i, ...s];
      }
      return Jm(i, n, r);
    }, K(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, jr = () => ({
  left: [],
  right: []
}), ef = {
  getInitialState: (e) => ({
    columnPinning: jr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Le("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, a;
        if (n === "right") {
          var s, c;
          return {
            left: ((s = o == null ? void 0 : o.left) != null ? s : []).filter((f) => !(r != null && r.includes(f))),
            right: [...((c = o == null ? void 0 : o.right) != null ? c : []).filter((f) => !(r != null && r.includes(f))), ...r]
          };
        }
        if (n === "left") {
          var u, m;
          return {
            left: [...((u = o == null ? void 0 : o.left) != null ? u : []).filter((f) => !(r != null && r.includes(f))), ...r],
            right: ((m = o == null ? void 0 : o.right) != null ? m : []).filter((f) => !(r != null && r.includes(f)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((f) => !(r != null && r.includes(f))),
          right: ((a = o == null ? void 0 : o.right) != null ? a : []).filter((f) => !(r != null && r.includes(f)))
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
    e.getCenterVisibleCells = U(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((a) => !i.includes(a.column.id));
    }, K(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = U(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), K(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = U(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), K(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? jr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : jr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = U(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), K(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = U(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), K(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = U(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, K(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function tf(e) {
  return e || (typeof document < "u" ? document : null);
}
const zn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Br = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), nf = {
  getDefaultColumnDef: () => zn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Br(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Le("columnSizing", e),
    onColumnSizingInfoChange: Le("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : zn.minSize, (r = i ?? e.columnDef.size) != null ? r : zn.size), (o = e.columnDef.maxSize) != null ? o : zn.maxSize);
    }, e.getStart = U((n) => [n, kn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), K(t.options, "debugColumns", "getStart")), e.getAfter = U((n) => [n, kn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), K(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), qr(i) && i.touches && i.touches.length > 1))
          return;
        const a = e.getSize(), s = e ? e.getLeafHeaders().map((w) => [w.column.id, w.column.getSize()]) : [[r.id, r.getSize()]], c = qr(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, m = (w, S) => {
          typeof S == "number" && (t.setColumnSizingInfo((x) => {
            var k, _;
            const R = t.options.columnResizeDirection === "rtl" ? -1 : 1, M = (S - ((k = x == null ? void 0 : x.startOffset) != null ? k : 0)) * R, V = Math.max(M / ((_ = x == null ? void 0 : x.startSize) != null ? _ : 0), -0.999999);
            return x.columnSizingStart.forEach((H) => {
              let [I, T] = H;
              u[I] = Math.round(Math.max(T + T * V, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: M,
              deltaPercentage: V
            };
          }), (t.options.columnResizeMode === "onChange" || w === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...u
          })));
        }, f = (w) => m("move", w), g = (w) => {
          m("end", w), t.setColumnSizingInfo((S) => ({
            ...S,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = tf(n), p = {
          moveHandler: (w) => f(w.clientX),
          upHandler: (w) => {
            d == null || d.removeEventListener("mousemove", p.moveHandler), d == null || d.removeEventListener("mouseup", p.upHandler), g(w.clientX);
          }
        }, h = {
          moveHandler: (w) => (w.cancelable && (w.preventDefault(), w.stopPropagation()), f(w.touches[0].clientX), !1),
          upHandler: (w) => {
            var S;
            d == null || d.removeEventListener("touchmove", h.moveHandler), d == null || d.removeEventListener("touchend", h.upHandler), w.cancelable && (w.preventDefault(), w.stopPropagation()), g((S = w.touches[0]) == null ? void 0 : S.clientX);
          }
        }, v = rf() ? {
          passive: !1
        } : !1;
        qr(i) ? (d == null || d.addEventListener("touchmove", h.moveHandler, v), d == null || d.addEventListener("touchend", h.upHandler, v)) : (d == null || d.addEventListener("mousemove", p.moveHandler, v), d == null || d.addEventListener("mouseup", p.upHandler, v)), t.setColumnSizingInfo((w) => ({
          ...w,
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
      e.setColumnSizingInfo(t ? Br() : (n = e.initialState.columnSizingInfo) != null ? n : Br());
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
let Hn = null;
function rf() {
  if (typeof Hn == "boolean") return Hn;
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
  return Hn = e, Hn;
}
function qr(e) {
  return e.type === "touchstart";
}
const of = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Le("columnVisibility", e)
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
    e._getAllVisibleCells = U(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), K(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = U(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], K(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => U(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), K(e.options, "debugColumns", n));
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
function kn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const af = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, sf = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Le("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => nt.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return Nr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : nt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, lf = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Le("expanded", e),
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
}, wo = 0, Co = 10, Wr = () => ({
  pageIndex: wo,
  pageSize: Co
}), cf = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Wr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Le("pagination", e)
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
      const o = (i) => mt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Wr() : (o = e.initialState.pagination) != null ? o : Wr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = mt(r, o.pageIndex);
        const a = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, a)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? wo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : wo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? Co : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : Co);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, mt(r, o.pageSize)), a = o.pageSize * o.pageIndex, s = Math.floor(a / i);
        return {
          ...o,
          pageIndex: s,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let a = mt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof a == "number" && (a = Math.max(-1, a)), {
        ...o,
        pageCount: a
      };
    }), e.getPageOptions = U(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, a) => a)), o;
    }, K(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
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
}, Ur = () => ({
  top: [],
  bottom: []
}), uf = {
  getInitialState: (e) => ({
    rowPinning: Ur(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Le("rowPinning", e)
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
        var u, m;
        if (n === "bottom") {
          var f, g;
          return {
            top: ((f = c == null ? void 0 : c.top) != null ? f : []).filter((h) => !(s != null && s.has(h))),
            bottom: [...((g = c == null ? void 0 : c.bottom) != null ? g : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var d, p;
          return {
            top: [...((d = c == null ? void 0 : c.top) != null ? d : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)],
            bottom: ((p = c == null ? void 0 : c.bottom) != null ? p : []).filter((h) => !(s != null && s.has(h)))
          };
        }
        return {
          top: ((u = c == null ? void 0 : c.top) != null ? u : []).filter((h) => !(s != null && s.has(h))),
          bottom: ((m = c == null ? void 0 : c.bottom) != null ? m : []).filter((h) => !(s != null && s.has(h)))
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
      return e.setRowPinning(t ? Ur() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Ur());
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
    }, e.getTopRows = U(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), K(e.options, "debugRows", "getTopRows")), e.getBottomRows = U(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), K(e.options, "debugRows", "getBottomRows")), e.getCenterRows = U(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, K(e.options, "debugRows", "getCenterRows"));
  }
}, df = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Le("rowSelection", e),
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
        So(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = U(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = U(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = U(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
        return So(s, e.id, n, (a = r == null ? void 0 : r.selectChildren) != null ? a : !0, t), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return pi(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ko(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ko(e, n) === "all";
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
}, So = (e, t, n, r, o) => {
  var i;
  const a = o.getRow(t, !0);
  n ? (a.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), a.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = a.subRows) != null && i.length && a.getCanSelectSubRows() && a.subRows.forEach((s) => So(e, s.id, n, r, o));
};
function Kr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(a, s) {
    return a.map((c) => {
      var u;
      const m = pi(c, n);
      if (m && (r.push(c), o[c.id] = c), (u = c.subRows) != null && u.length && (c = {
        ...c,
        subRows: i(c.subRows)
      }), m)
        return c;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function pi(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function ko(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((a) => {
    if (!(i && !o) && (a.getCanSelect() && (pi(a, t) ? i = !0 : o = !1), a.subRows && a.subRows.length)) {
      const s = ko(a, t);
      s === "all" ? i = !0 : (s === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const Ro = /([0-9]+)/gm, mf = (e, t, n) => Xs(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), ff = (e, t, n) => Xs(bt(e.getValue(n)), bt(t.getValue(n))), gf = (e, t, n) => hi(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), pf = (e, t, n) => hi(bt(e.getValue(n)), bt(t.getValue(n))), hf = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, vf = (e, t, n) => hi(e.getValue(n), t.getValue(n));
function hi(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function bt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Xs(e, t) {
  const n = e.split(Ro).filter(Boolean), r = t.split(Ro).filter(Boolean);
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
const mn = {
  alphanumeric: mf,
  alphanumericCaseSensitive: ff,
  text: gf,
  textCaseSensitive: pf,
  datetime: hf,
  basic: vf
}, yf = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Le("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return mn.datetime;
        if (typeof i == "string" && (r = !0, i.split(Ro).length > 1))
          return mn.alphanumeric;
      }
      return r ? mn.text : mn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return Nr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : mn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((a) => {
        const s = a == null ? void 0 : a.find((d) => d.id === e.id), c = a == null ? void 0 : a.findIndex((d) => d.id === e.id);
        let u = [], m, f = i ? n : o === "desc";
        if (a != null && a.length && e.getCanMultiSort() && r ? s ? m = "toggle" : m = "add" : a != null && a.length && c !== a.length - 1 ? m = "replace" : s ? m = "toggle" : m = "replace", m === "toggle" && (i || o || (m = "remove")), m === "add") {
          var g;
          u = [...a, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((g = t.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else m === "toggle" ? u = a.map((d) => d.id === e.id ? {
          ...d,
          desc: f
        } : d) : m === "remove" ? u = a.filter((d) => d.id !== e.id) : u = [{
          id: e.id,
          desc: f
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
}, bf = [
  Vm,
  of,
  Zm,
  ef,
  zm,
  Hm,
  af,
  //depends on ColumnFaceting
  sf,
  //depends on ColumnFiltering
  yf,
  Xm,
  //depends on RowSorting
  lf,
  cf,
  uf,
  df,
  nf
];
function wf(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...bf, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((g, d) => Object.assign(g, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(o)), {}), a = (g) => o.options.mergeOptions ? o.options.mergeOptions(i, g) : {
    ...i,
    ...g
  };
  let c = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((g) => {
    var d;
    c = (d = g.getInitialState == null ? void 0 : g.getInitialState(c)) != null ? d : c;
  });
  const u = [];
  let m = !1;
  const f = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: c,
    _queue: (g) => {
      u.push(g), m || (m = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        m = !1;
      }).catch((d) => setTimeout(() => {
        throw d;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (g) => {
      const d = mt(g, o.options);
      o.options = a(d);
    },
    getState: () => o.options.state,
    setState: (g) => {
      o.options.onStateChange == null || o.options.onStateChange(g);
    },
    _getRowId: (g, d, p) => {
      var h;
      return (h = o.options.getRowId == null ? void 0 : o.options.getRowId(g, d, p)) != null ? h : `${p ? [p.id, d].join(".") : d}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, d) => {
      let p = (d ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[g];
      if (!p && (p = o.getCoreRowModel().rowsById[g], !p))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return p;
    },
    _getDefaultColumnDef: U(() => [o.options.defaultColumn], (g) => {
      var d;
      return g = (d = g) != null ? d : {}, {
        header: (p) => {
          const h = p.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (p) => {
          var h, v;
          return (h = (v = p.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? h : null;
        },
        ...o._features.reduce((p, h) => Object.assign(p, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...g
      };
    }, K(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: U(() => [o._getColumnDefs()], (g) => {
      const d = function(p, h, v) {
        return v === void 0 && (v = 0), p.map((w) => {
          const S = Lm(o, w, v, h), x = w;
          return S.columns = x.columns ? d(x.columns, S, v + 1) : [], S;
        });
      };
      return d(g);
    }, K(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: U(() => [o.getAllColumns()], (g) => g.flatMap((d) => d.getFlatColumns()), K(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: U(() => [o.getAllFlatColumns()], (g) => g.reduce((d, p) => (d[p.id] = p, d), {}), K(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: U(() => [o.getAllColumns(), o._getOrderColumnsFn()], (g, d) => {
      let p = g.flatMap((h) => h.getLeafColumns());
      return d(p);
    }, K(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const d = o._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !d && console.error(`[Table] Column with id '${g}' does not exist.`), d;
    }
  };
  Object.assign(o, f);
  for (let g = 0; g < o._features.length; g++) {
    const d = o._features[g];
    d == null || d.createTable == null || d.createTable(o);
  }
  return o;
}
function Cf() {
  return (e) => U(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, a) {
      i === void 0 && (i = 0);
      const s = [];
      for (let u = 0; u < o.length; u++) {
        const m = fi(e, e._getRowId(o[u], u, a), o[u], u, i, void 0, a == null ? void 0 : a.id);
        if (n.flatRows.push(m), n.rowsById[m.id] = m, s.push(m), e.options.getSubRows) {
          var c;
          m.originalSubRows = e.options.getSubRows(o[u], u), (c = m.originalSubRows) != null && c.length && (m.subRows = r(m.originalSubRows, i + 1, m));
        }
      }
      return s;
    };
    return n.rows = r(t), n;
  }, K(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Sf(e) {
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
function kf(e, t, n) {
  return n.options.filterFromLeafRows ? Rf(e, t, n) : Nf(e, t, n);
}
function Rf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let g = 0; g < c.length; g++) {
      var f;
      let d = c[g];
      const p = fi(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
      if (p.columnFilters = d.columnFilters, (f = d.subRows) != null && f.length && u < a) {
        if (p.subRows = s(d.subRows, u + 1), d = p, t(d) && !p.subRows.length) {
          m.push(d), i[d.id] = d, o.push(d);
          continue;
        }
        if (t(d) || p.subRows.length) {
          m.push(d), i[d.id] = d, o.push(d);
          continue;
        }
      } else
        d = p, t(d) && (m.push(d), i[d.id] = d, o.push(d));
    }
    return m;
  };
  return {
    rows: s(e),
    flatRows: o,
    rowsById: i
  };
}
function Nf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let g = 0; g < c.length; g++) {
      let d = c[g];
      if (t(d)) {
        var f;
        if ((f = d.subRows) != null && f.length && u < a) {
          const h = fi(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
          h.subRows = s(d.subRows, u + 1), d = h;
        }
        m.push(d), o.push(d), i[d.id] = d;
      }
    }
    return m;
  };
  return {
    rows: s(e),
    flatRows: o,
    rowsById: i
  };
}
function xf() {
  return (e) => U(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let g = 0; g < t.flatRows.length; g++)
        t.flatRows[g].columnFilters = {}, t.flatRows[g].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((g) => {
      var d;
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
        resolvedValue: (d = h.resolveFilterValue == null ? void 0 : h.resolveFilterValue(g.value)) != null ? d : g.value
      });
    });
    const a = (n ?? []).map((g) => g.id), s = e.getGlobalFilterFn(), c = e.getAllLeafColumns().filter((g) => g.getCanGlobalFilter());
    r && s && c.length && (a.push("__global__"), c.forEach((g) => {
      var d;
      i.push({
        id: g.id,
        filterFn: s,
        resolvedValue: (d = s.resolveFilterValue == null ? void 0 : s.resolveFilterValue(r)) != null ? d : r
      });
    }));
    let u, m;
    for (let g = 0; g < t.flatRows.length; g++) {
      const d = t.flatRows[g];
      if (d.columnFilters = {}, o.length)
        for (let p = 0; p < o.length; p++) {
          u = o[p];
          const h = u.id;
          d.columnFilters[h] = u.filterFn(d, h, u.resolvedValue, (v) => {
            d.columnFiltersMeta[h] = v;
          });
        }
      if (i.length) {
        for (let p = 0; p < i.length; p++) {
          m = i[p];
          const h = m.id;
          if (m.filterFn(d, h, m.resolvedValue, (v) => {
            d.columnFiltersMeta[h] = v;
          })) {
            d.columnFilters.__global__ = !0;
            break;
          }
        }
        d.columnFilters.__global__ !== !0 && (d.columnFilters.__global__ = !1);
      }
    }
    const f = (g) => {
      for (let d = 0; d < a.length; d++)
        if (g.columnFilters[a[d]] === !1)
          return !1;
      return !0;
    };
    return kf(t.rows, f, e);
  }, K(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function _f(e) {
  return (t) => U(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
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
    const u = o * i, m = u + o;
    a = a.slice(u, m);
    let f;
    t.options.paginateExpandedRows ? f = {
      rows: a,
      flatRows: s,
      rowsById: c
    } : f = Sf({
      rows: a,
      flatRows: s,
      rowsById: c
    }), f.flatRows = [];
    const g = (d) => {
      f.flatRows.push(d), d.subRows.length && d.subRows.forEach(g);
    };
    return f.rows.forEach(g), f;
  }, K(t.options, "debugTable", "getPaginationRowModel"));
}
function Mf() {
  return (e) => U(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
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
      const u = c.map((m) => ({
        ...m
      }));
      return u.sort((m, f) => {
        for (let d = 0; d < i.length; d += 1) {
          var g;
          const p = i[d], h = a[p.id], v = h.sortUndefined, w = (g = p == null ? void 0 : p.desc) != null ? g : !1;
          let S = 0;
          if (v) {
            const x = m.getValue(p.id), k = f.getValue(p.id), _ = x === void 0, R = k === void 0;
            if (_ || R) {
              if (v === "first") return _ ? -1 : 1;
              if (v === "last") return _ ? 1 : -1;
              S = _ && R ? 0 : _ ? v : -v;
            }
          }
          if (S === 0 && (S = h.sortingFn(m, f, p.id)), S !== 0)
            return w && (S *= -1), h.invertSorting && (S *= -1), S;
        }
        return m.index - f.index;
      }), u.forEach((m) => {
        var f;
        o.push(m), (f = m.subRows) != null && f.length && (m.subRows = s(m.subRows));
      }), u;
    };
    return {
      rows: s(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, K(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
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
function ha(e, t) {
  return e ? Ff(e) ? /* @__PURE__ */ y.createElement(e, t) : e : null;
}
function Ff(e) {
  return $f(e) || typeof e == "function" || Of(e);
}
function $f(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function Of(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Af(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = y.useState(() => ({
    current: wf(t)
  })), [r, o] = y.useState(() => n.current.initialState);
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
const Js = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: A("cv-table", e), ...t }) })
);
Js.displayName = "Table";
const Zs = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: A("cv-table-header", e), ...t }));
Zs.displayName = "TableHeader";
const el = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: A("cv-table-body", e), ...t }));
el.displayName = "TableBody";
const qn = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: A("cv-table-row", e),
      ...t
    }
  )
);
qn.displayName = "TableRow";
const tl = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: A("cv-table-head", e),
    ...t
  }
));
tl.displayName = "TableHead";
const No = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: A("cv-table-cell", e),
    ...t
  }
));
No.displayName = "TableCell";
const If = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: A("cv-table-caption", e), ...t }));
If.displayName = "TableCaption";
const nl = Jo(
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
), ne = y.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...o }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: A(nl({ variant: t, size: n }), e),
      ...o
    }
  )
);
ne.displayName = "Button";
const be = y.forwardRef(
  ({ className: e, type: t, id: n, ...r }, o) => {
    const i = y.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: o,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: A("cv-input", e),
        ...r
      }
    );
  }
);
be.displayName = "Input";
const Tf = 8, Pf = 12;
function Ef({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, o = e.raw.rows, i = e.raw.annotation, a = y.useMemo(
    () => Df(o, i, r, n),
    [o, i, r, n]
  ), s = y.useMemo(
    () => a.map((R) => ({
      id: R.member,
      accessorFn: (M) => M[R.key],
      header: R.label,
      cell: (M) => R.render(M.getValue()),
      sortingFn: (M, V, H) => Gf(M.getValue(H), V.getValue(H)),
      // Global search matches what the reader SEES, not the raw number.
      filterFn: (M, V, H) => va(R.text(M.getValue(V)), H),
      meta: R
    })),
    [a]
  ), [c, u] = y.useState([]), [m, f] = y.useState(""), [g, d] = y.useState({
    pageIndex: 0,
    pageSize: r.pageSize ?? 25
  }), p = Af({
    data: o,
    columns: s,
    state: { sorting: c, globalFilter: m, pagination: g },
    onSortingChange: u,
    onGlobalFilterChange: f,
    onPaginationChange: d,
    globalFilterFn: (R, M, V) => a.some((H) => va(H.text(R.original[H.key]), V)),
    getCoreRowModel: Cf(),
    getFilteredRowModel: xf(),
    getSortedRowModel: Mf(),
    getPaginationRowModel: _f(),
    autoResetPageIndex: !0,
    enableMultiSort: !0,
    isMultiSortEvent: (R) => R.shiftKey
  }), h = p.getFilteredRowModel().rows.length, v = p.getPageCount(), { pageIndex: w, pageSize: S } = p.getState().pagination, x = o.length > Tf, k = h > Pf, _ = p.getRowModel().rows;
  return /* @__PURE__ */ C("div", { className: "cv-table-family", children: [
    x && /* @__PURE__ */ C("div", { className: "cv-table-toolbar", children: [
      /* @__PURE__ */ C("div", { className: "cv-table-search", children: [
        /* @__PURE__ */ l(ss, { className: "cv-table-search-icon" }),
        /* @__PURE__ */ l(
          be,
          {
            className: "cv-table-search-input",
            value: m,
            onChange: (R) => f(R.target.value),
            placeholder: "Search",
            "aria-label": "Search rows"
          }
        )
      ] }),
      m && /* @__PURE__ */ C("span", { className: "cv-table-meta", children: [
        h,
        " of ",
        o.length
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ C(Js, { children: [
      /* @__PURE__ */ l(Zs, { className: "cv-table-header--sticky", children: p.getHeaderGroups().map((R) => /* @__PURE__ */ l(qn, { children: R.headers.map((M) => {
        const V = M.column.columnDef.meta, H = M.column.getIsSorted();
        return /* @__PURE__ */ l(
          tl,
          {
            className: ya(V.align),
            style: V.width ? { width: V.width } : void 0,
            "aria-sort": H === "asc" ? "ascending" : H === "desc" ? "descending" : "none",
            children: /* @__PURE__ */ C(
              ne,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: M.column.getToggleSortingHandler(),
                title: "Sort (shift-click to add a column)",
                children: [
                  ha(M.column.columnDef.header, M.getContext()),
                  /* @__PURE__ */ l(Hf, { dir: H || void 0 })
                ]
              }
            )
          },
          M.id
        );
      }) }, R.id)) }),
      /* @__PURE__ */ C(el, { children: [
        _.map((R) => /* @__PURE__ */ l(qn, { children: R.getVisibleCells().map((M) => {
          const V = M.column.columnDef.meta, H = jf(V.member, M.getValue(), r.conditionalFormat);
          return /* @__PURE__ */ l(
            No,
            {
              className: A(ya(V.align), k && "cv-table-cell--compact"),
              style: H ? { color: H } : void 0,
              children: ha(M.column.columnDef.cell, M.getContext())
            },
            M.id
          );
        }) }, R.id)),
        _.length === 0 && /* @__PURE__ */ l(qn, { children: /* @__PURE__ */ l(No, { colSpan: Math.max(1, s.length), className: "cv-table-empty", children: m ? "No matches" : "No data" }) })
      ] })
    ] }) }),
    v > 1 && /* @__PURE__ */ C("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ C("span", { children: [
        w * S + 1,
        "–",
        Math.min((w + 1) * S, h),
        " of",
        " ",
        h
      ] }),
      /* @__PURE__ */ C("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          ne,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => p.previousPage(),
            disabled: !p.getCanPreviousPage(),
            children: "Prev"
          }
        ),
        /* @__PURE__ */ C("span", { className: "cv-table-meta", children: [
          w + 1,
          " / ",
          v
        ] }),
        /* @__PURE__ */ l(
          ne,
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
function Df(e, t, n, r) {
  var a;
  const o = e.length > 0 ? Object.keys(e[0]) : Vf(t);
  return ((a = n.columns) != null && a.length ? n.columns : o.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = yo(e, c), m = t ? zf(t, c) : void 0, f = t ? c in t.measures : !1, g = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, d = s.align ?? (f ? "right" : "left"), p = s.format && r.derive ? r.derive(s.format) : r, h = (v) => Lf(v, f, c, p, s.format);
    return {
      member: c,
      key: u,
      label: g,
      align: d,
      width: s.width,
      render: (v) => h(v),
      text: h
    };
  });
}
function Lf(e, t, n, r, o) {
  if (e == null || e === "" || typeof e == "number" && Number.isNaN(e)) return "—";
  if ((o == null ? void 0 : o.kind) === "date" || typeof e == "string" && Sr(e))
    return Yt(e, o);
  if (t) {
    const i = typeof e == "number" ? e : Number(e);
    return Number.isFinite(i) ? String(r.value(i, n)) : String(e);
  }
  return String(r.category(e));
}
function va(e, t) {
  const n = t.trim().toLowerCase();
  return n ? e.toLowerCase().includes(n) : !0;
}
function Vf(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function zf(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ya(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Hf({ dir: e }) {
  return e ? e === "asc" ? /* @__PURE__ */ l(Ko, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Yo, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Kc, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Gf(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function jf(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const o of n)
      if (o.member === e && Bf(r, o.when.op, o.when.value))
        return `var(--${o.colorToken ?? "chart-1"})`;
  }
}
function Bf(e, t, n) {
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
const Ft = "cv-sidebar--default", qf = "cv-sidebar--wide", rl = "a date or category", Yr = [
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
    hint: rl,
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
], Wf = [
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
    hint: rl,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Uf = [
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
], Kf = [
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
], Yf = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], Qf = [
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
], Xf = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], ct = (e) => Xf.indexOf(e), it = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: ls,
    order: ct("bar"),
    component: sm,
    optionsSchema: st.bar,
    defaults: lt.bar,
    wells: Yr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Ft
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: tu,
    order: ct("line"),
    component: lm,
    optionsSchema: st.line,
    defaults: lt.line,
    wells: Yr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Ft
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Yc,
    order: ct("area"),
    component: cm,
    optionsSchema: st.area,
    defaults: lt.area,
    wells: Yr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: Ft
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: eu,
    order: ct("pie"),
    component: mm,
    optionsSchema: st.pie,
    defaults: lt.pie,
    wells: Uf,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ft
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Zc,
    order: ct("scatter"),
    component: gm,
    optionsSchema: st.scatter,
    defaults: lt.scatter,
    wells: Kf,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ft
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Jc,
    order: ct("kpi"),
    component: km,
    optionsSchema: st.kpi,
    defaults: lt.kpi,
    wells: Yf,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: qf
  },
  table: {
    family: "table",
    label: "Table",
    icon: Xc,
    order: ct("table"),
    component: Ef,
    optionsSchema: st.table,
    defaults: lt.table,
    wells: Qf,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ft
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Qc,
    order: ct("heatmap"),
    component: wm,
    optionsSchema: st.heatmap,
    defaults: lt.heatmap,
    wells: Wf,
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
    sidebarWidthClass: Ft
  }
}, Jf = it.bar, Zf = it.line, eg = it.area, tg = it.pie, ng = it.scatter, rg = it.heatmap, og = it.kpi, ig = it.table, vi = [
  Jf,
  Zf,
  eg,
  tg,
  ng,
  rg,
  og,
  ig
], ag = b.any();
function yi(e, t) {
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
      return ((s = n.get(a)) == null ? void 0 : s.defaults) ?? Jd;
    },
    optionsSchema: (a) => {
      var s;
      return ((s = n.get(a)) == null ? void 0 : s.optionsSchema) ?? ag;
    },
    resolveOptions: (a) => Zd(a, i.defaults(a.family))
  };
  return i;
}
const xr = yi(vi);
function sg(e, t = xr) {
  return t.resolveOptions(e);
}
const ba = {
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
function ol(e) {
  return e ? { ...ba, ...e } : ba;
}
function bi(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function lg(e) {
  const t = Math.floor(e ?? rr);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function cg(e, t) {
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
function ug(e) {
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
function dg(e, t) {
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
function mg(e) {
  const { unit: t, quantity: n, convert: r, ...o } = e ?? {};
  return { ...o, format: { kind: "percent", decimals: 0 } };
}
function fg(e, t, n) {
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
function gg(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = dg(e.series, r);
    return {
      ...e,
      series: e.series.map((a, s) => ({
        ...a,
        data: i[s],
        meta: mg(a.meta)
      }))
    };
  }
  const o = lg(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? cg(i.data, o) : ug(i.data)
    }))
  };
}
function pg(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const SC = Object.fromEntries(
  Object.entries(it).map(([e, t]) => [e, t.component])
);
function il({
  data: e,
  options: t,
  config: n,
  format: r,
  state: o,
  components: i,
  editing: a,
  updateFamilyOptions: s,
  registry: c = xr,
  theme: u
}) {
  const m = ie(() => sg(t, c), [t, c]), f = ie(() => ol(u), [u]), g = c.get(m.family), d = (g == null ? void 0 : g.queryless) ?? !1, p = bi(g) ? m.transform : void 0, h = ie(() => gg(e, p), [e, p]);
  if (!d && (o != null && o.loading))
    return /* @__PURE__ */ l(Md, { className: "cv-chart-skeleton" });
  if (!d && (o != null && o.error))
    return /* @__PURE__ */ C(br, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Qo, {}),
      /* @__PURE__ */ l(wr, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Cr, { children: o.error.message })
    ] });
  if (!d && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : pg(h), w = fg(
    r ?? ni(e.raw.annotation, m, ti),
    p
  ), S = (i == null ? void 0 : i[m.family]) ?? c.require(m.family).component;
  return /* @__PURE__ */ l(
    S,
    {
      data: h,
      options: m,
      config: v,
      format: w,
      theme: f,
      state: o,
      editing: a,
      updateFamilyOptions: s
    }
  );
}
const _r = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Qr = 8;
function wa(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function al(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : _r, r = (t == null ? void 0 : t.byKey) ?? {}, o = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = o(u.key, u.colorToken);
    m && i.add(m);
  }
  let a = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const m = n[a++ % n.length];
      if (!i.has(m))
        return i.add(m), m;
    }
    return n[a++ % n.length];
  };
  return e.map((u) => o(u.key, u.colorToken) ?? s());
}
function Ca(e, t) {
  const n = al(e, t);
  return e.forEach((r, o) => {
    r.colorToken = n[o];
  }), e;
}
function hg(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Gn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = hg(e[n]);
  return t;
}
function vg(e) {
  return {
    measures: Gn(e.measures ?? {}),
    dimensions: Gn(e.dimensions ?? {}),
    segments: Gn(e.segments ?? {}),
    timeDimensions: Gn(e.timeDimensions ?? {})
  };
}
function Qt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Mr(e, t, n) {
  const r = e == null ? void 0 : e.meta, o = {};
  (r == null ? void 0 : r.unit) !== void 0 && (o.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (o.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (o.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && o.unit === void 0 && (o.unit = "%");
  let a = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!a || a.kind === void 0 || a.kind === "auto") && (a = { ...a, kind: "currency" }), a && (o.format = a), t != null && t.stackId && (o.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (o.dots = t.dots), o;
}
function yg(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function bg(e, t) {
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
function wg(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [o, i] of t) {
      const a = Fr(r[o]);
      a !== null && (r[o] = i.to(a));
    }
    return r;
  });
}
function Cg(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const o = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      o && (r.data = r.data.map((i) => i === null ? null : o.to(i)));
    }
}
function sl(e, t, n, r, o = xr) {
  const i = vg(e.annotation()), a = bg(i, r), s = wg(e.tablePivot(), a), c = t.mapping;
  if (!c) {
    const f = n.measures ?? [];
    if (o.require(t.family).measureOnly && f.length > 0) {
      const g = s[0] ?? {}, d = [
        {
          key: "value",
          label: "Value",
          data: f.map((h) => Fr(g[h])),
          meta: { ...Mr(Qt(i, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return Ca(d, t.colors), {
        categories: f.map(
          (h) => {
            var v, w;
            return ((v = Qt(i, h)) == null ? void 0 : v.shortTitle) ?? ((w = Qt(i, h)) == null ? void 0 : w.title) ?? h;
          }
        ),
        series: d,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || wa(d)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? kg(e, c.series, t, i) : Ng(e, c.category.member, c.series, t, i), m = Sg(e, c);
  return Cg(u, a), Ca(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || wa(u)
  };
}
function Sg(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((o) => o.x);
}
function kg(e, t, n, r) {
  const { members: o, meta: i } = t, a = e.chartPivot();
  return o.map((s) => {
    const c = Qt(r, s), u = i == null ? void 0 : i[s], m = a.map((f) => Fr(f[s]));
    return {
      key: s,
      label: yg(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Mr(c, u, n.format), measure: s }
    };
  });
}
function Rg(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function Ng(e, t, n, r, o) {
  const { value: i, values: a, pivot: s } = n, c = a && a.length > 0 ? a : [i], u = new Set(c), m = c.length > 1, f = { x: [t], y: [s, "measures"] }, d = e.seriesNames(f).filter((k) => {
    const _ = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return _ === void 0 || u.has(_);
  }), p = e.chartPivot(f), h = Qt(o, i), v = o.dimensions[s], w = (v == null ? void 0 : v.type) === "boolean", S = (v == null ? void 0 : v.shortTitle) ?? (v == null ? void 0 : v.title) ?? s, x = d.map((k) => {
    var E, D;
    const _ = (E = k.yValues) == null ? void 0 : E[0], R = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : i, M = Qt(o, R), V = (D = n.meta) == null ? void 0 : D[R], H = (V == null ? void 0 : V.label) ?? (M == null ? void 0 : M.shortTitle) ?? (M == null ? void 0 : M.title) ?? R, I = _ ?? k.shortTitle ?? k.title ?? k.key, T = w ? Rg(I) : void 0, z = T ? `${S}: ${T}` : I, O = m ? `${H} · ${z}` : z, G = p.map((X) => Fr(X[k.key]));
    return {
      key: k.key,
      label: O,
      data: G,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Mr(M ?? h, V, r.format),
        measure: R
      }
    };
  });
  return xg(x, h, r.format);
}
function xg(e, t, n) {
  var m, f, g;
  if (e.length <= Qr) return e;
  const r = (d) => d.data.reduce((p, h) => p + (h ?? 0), 0), o = [...e].sort((d, p) => r(p) - r(d)), i = o.slice(0, Qr - 1), a = o.slice(Qr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (d, p) => {
    let h = 0, v = !1;
    for (const w of a) {
      const S = w.data[p];
      S !== null && (h += S, v = !0);
    }
    return v ? h : null;
  }), u = {
    key: "__other",
    label: `Other (${a.length})`,
    data: c,
    meta: { ...Mr(t, void 0, n), ...(g = (f = i[0]) == null ? void 0 : f.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Fr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const se = (e) => ke(e, "yyyy-MM-dd");
function _g(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [se(t), se(t)];
  if (n === "yesterday") {
    const a = Ae(t, 1);
    return [se(a), se(a)];
  }
  if (n === "this week") return [se(Jn(t)), se(Zn(t))];
  if (n === "this month") return [se(Ot(t)), se(wn(t))];
  if (n === "this quarter") return [se(At(t)), se(Cn(t))];
  if (n === "this year") return [se(It(t)), se(Sn(t))];
  if (n === "last week") {
    const a = co(t, 1);
    return [se(Jn(a)), se(Zn(a))];
  }
  if (n === "last month") {
    const a = Tt(t, 1);
    return [se(Ot(a)), se(wn(a))];
  }
  if (n === "last quarter") {
    const a = Pt(t, 1);
    return [se(At(a)), se(Cn(a))];
  }
  if (n === "last year") {
    const a = Et(t, 1);
    return [se(It(a)), se(Sn(a))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const o = Number(r[1]);
  if (!Number.isFinite(o) || o < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [se(Ae(t, o - 1)), se(t)] : i.startsWith("week") ? [se(Ae(t, o * 7 - 1)), se(t)] : i.startsWith("month") ? [se(Ot(Tt(t, o))), se(wn(Tt(t, 1)))] : i.startsWith("quarter") ? [se(At(Pt(t, o))), se(Cn(Pt(t, 1)))] : [se(It(Et(t, o))), se(Sn(Et(t, 1)))];
}
function ll(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function wi(e) {
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
function cl(e) {
  const t = wi(e);
  return t === void 0 ? void 0 : ll(t);
}
function Ci(e) {
  const t = wi(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function tn(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Mg = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Fg(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((o) => o.name === e)) == null ? void 0 : r.default;
}
function On(e, t, n) {
  var r;
  if (_e(e)) {
    const o = e.var;
    return Object.prototype.hasOwnProperty.call(n, o) && n[o] !== void 0 ? n[o] : (r = t.get(o)) == null ? void 0 : r.default;
  }
  return e;
}
function $g(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const o = [];
  for (const a of e.values) {
    const s = On(a, t, n);
    if (!tn(s))
      if (Array.isArray(s))
        for (const c of s)
          tn(c) || o.push(c);
      else
        o.push(s);
  }
  if (o.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && o.length === 1 && typeof o[0] == "string" ? _g(o[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? o };
}
function Og(e, t, n) {
  if ("and" in e) {
    const r = xo(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = xo(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return $g(e, t, n);
}
function xo(e, t, n) {
  const r = [];
  for (const o of e) {
    const i = Og(o, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Ag(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const o = On(e.dateRange, t, n);
    tn(o) || (r.dateRange = o);
  }
  if (e.granularity !== void 0) {
    const o = On(e.granularity, t, n);
    tn(o) || (r.granularity = o === Jt ? Ci(r.dateRange) : o);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function ul(e, t, n) {
  const r = Mg(n), o = {};
  if (e.measures !== void 0 && (o.measures = [...e.measures]), e.dimensions !== void 0 && (o.dimensions = [...e.dimensions]), e.segments !== void 0 && (o.segments = [...e.segments]), e.timeDimensions !== void 0 && (o.timeDimensions = e.timeDimensions.map((i) => Ag(i, r, t))), e.filters !== void 0) {
    const i = xo(e.filters, r, t);
    i.length > 0 && (o.filters = i);
  }
  if (e.order !== void 0 && (o.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = On(e.limit, r, t);
    tn(i) || (o.limit = i);
  }
  if (e.offset !== void 0) {
    const i = On(e.offset, r, t);
    tn(i) || (o.offset = i);
  }
  return e.total !== void 0 && (o.total = e.total), e.timezone !== void 0 && (o.timezone = e.timezone), o;
}
function dl() {
  let e, t;
  return (n, r, o) => {
    const i = ul(n, r, o), a = JSON.stringify(i);
    return e !== void 0 && a === t ? e : (e = i, t = a, i);
  };
}
function Ig(e, t) {
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
class Tg extends Error {
}
const Pg = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Tg(`"${e}" cannot be parsed into a number`);
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
function Sa(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Eg extends Error {
}
class ka extends Error {
}
class Dg extends Error {
}
class Xr extends Error {
}
class Lg extends Error {
}
class Vg {
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
      throw new ka(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Sa(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Dg(`Cannot convert incompatible measures of ${o.measure} and ${i.measure}`);
    let a = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (a = this.cls.sub(a, this.convertFraction(i.unit.anchor_shift))), i.system != o.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Xr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${o.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Xr(`Unable to find anchor for "${i.measure}" to "${o.measure}". Please make sure it is defined.`);
      const m = (n = u[o.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[o.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        a = m(a, this.cls);
      else if (typeof f == "number")
        a = this.cls.mul(a, f);
      else if (Sa(f))
        a = this.cls.mul(a, this.convertFraction(f));
      else
        throw new Xr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new ka(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let a = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (a = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (o = t.system) !== null && o !== void 0 ? o : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const f = this.describe(m);
      if (a.indexOf(m) === -1 && f.system === c) {
        const d = this.to(m);
        if (i ? this.cls.gt(d, s) : this.cls.lt(d, s))
          continue;
        (u === null || (i ? this.cls.lte(d, s) && this.cls.gt(d, u.val) : this.cls.gte(d, s) && this.cls.lt(d, u.val))) && (u = {
          val: d,
          unit: m,
          singular: f.singular,
          plural: f.plural
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
        throw new Lg(`Meausure "${t}" not found.`);
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
    throw new Eg(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function zg(e) {
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
function Hg(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = zg(e);
  return (r) => new Vg({
    measures: e,
    unitCache: n,
    cls: Pg
  }, r);
}
const Gg = {
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
}, jg = {
  systems: {
    metric: Gg
  }
}, Bg = {
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
}, qg = {
  systems: {
    SI: Bg
  }
}, Wg = {
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
}, Ug = {
  systems: {
    SI: Wg
  }
}, Kg = {
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
}, Yg = {
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
}, Qg = {
  systems: {
    metric: Kg,
    imperial: Yg
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
}, Xg = {
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
}, Jg = {
  systems: {
    SI: Xg
  }
}, Zg = {
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
}, ep = {
  systems: {
    SI: Zg
  }
}, tp = {
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
}, np = {
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
}, rp = {
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
}, op = {
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
}, ip = {
  systems: {
    bit: tp,
    byte: np,
    IECBit: rp,
    IECByte: op
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
}, ap = {
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
}, sp = {
  systems: {
    metric: ap
  }
}, lp = {
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
}, cp = {
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
}, up = {
  systems: {
    SI: lp,
    nutrition: cp
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
}, dp = {
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
}, mp = {
  systems: {
    SI: dp
  }
}, fp = {
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
}, gp = {
  systems: {
    SI: fp
  }
}, pp = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, hp = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, vp = {
  systems: {
    metric: pp,
    imperial: hp
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
}, yp = {
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
}, bp = {
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
}, wp = {
  systems: {
    metric: yp,
    imperial: bp
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
}, Cp = {
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
}, Sp = {
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
}, Rp = {
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
}, Np = {
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
}, xp = {
  systems: {
    metric: Rp,
    imperial: Np
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
}, _p = {
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
}, Mp = {
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
}, Fp = {
  systems: {
    metric: _p,
    imperial: Mp
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
}, $p = {
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
}, Op = {
  systems: {
    SI: $p
  }
}, Ap = {
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
}, Ip = {
  systems: {
    unit: Ap
  }
}, Tp = {
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
}, Pp = {
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
}, Ep = {
  systems: {
    metric: Tp,
    imperial: Pp
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
}, Dp = {
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
}, Lp = {
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
}, Vp = {
  systems: {
    metric: Dp,
    imperial: Lp
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
}, zp = {
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
}, Hp = {
  systems: {
    SI: zp
  }
}, Gp = {
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
}, jp = {
  systems: {
    SI: Gp
  }
}, Bp = {
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
}, qp = {
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
}, Wp = {
  systems: {
    metric: Bp,
    imperial: qp
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
}, Up = {
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
}, Kp = {
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
}, Yp = {
  systems: {
    metric: Up,
    imperial: Kp
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
}, Qp = {
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
}, Xp = {
  systems: {
    SI: Qp
  }
}, Jp = {
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
}, Zp = {
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
}, eh = {
  systems: {
    metric: Jp,
    imperial: Zp
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
}, th = {
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
}, nh = {
  systems: {
    SI: th
  }
}, rh = {
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
}, oh = {
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
}, ih = {
  systems: {
    metric: rh,
    imperial: oh
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
}, ah = {
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
}, sh = {
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
}, lh = {
  systems: {
    metric: ah,
    imperial: sh
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
}, ch = {
  acceleration: jg,
  angle: qg,
  apparentPower: Ug,
  area: Qg,
  charge: Jg,
  current: ep,
  digital: ip,
  each: sp,
  energy: up,
  force: mp,
  frequency: gp,
  illuminance: vp,
  length: wp,
  mass: kp,
  massFlowRate: xp,
  pace: Fp,
  partsPer: Op,
  pieces: Ip,
  power: Ep,
  pressure: Vp,
  reactiveEnergy: Hp,
  reactivePower: jp,
  speed: Wp,
  torque: eh,
  temperature: Yp,
  time: Xp,
  voltage: nh,
  volume: ih,
  volumeFlowRate: lh
}, uh = Hg(ch), dh = {
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
function mh(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => uh(t).from(e.from).to(e.to)
  };
}
const _o = {
  ...Object.fromEntries(
    Object.entries(dh).map(([e, t]) => [e, mh(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function $r(e) {
  return e ? { ..._o, ...e } : _o;
}
function fh(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function gh(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function ph(e) {
  return e != null && e.quantity ? gh(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const hh = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function ml(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ra(e, t) {
  const n = e * (hh[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let o = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], a = i.map(([c, u], m) => {
    const f = m < i.length - 1 ? Math.floor(o / c) : Math.round(o / c);
    return o -= f * c, [f, u];
  }), s = a.findIndex((c) => c[0] > 0);
  if (s === -1) {
    const c = Math.abs(n);
    return c === 0 ? "0s" : c < 1e3 ? `${r}${ml(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + a.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Jr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const o = Math.abs(e);
    for (const [i, a] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (o >= i) return ml((e / i).toFixed(n.decimals ?? 1)) + a;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function vh(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Na(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function fl(e = _o) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return ti(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, o = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Ra(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Na(Jr(n, t), i.prefix, i.suffix);
    }
    if (o === "time") return Ra(n, r == null ? void 0 : r.unit);
    if (o === "count" || (r == null ? void 0 : r.convert) === !1) return Na(Jr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const a = r == null ? void 0 : r.unit, s = a ? vh(o, a) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Jr(n, t)}${u}`;
  };
}
const gl = y.createContext(null);
function yh({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(gl.Provider, { value: e, children: t });
}
function pl() {
  return y.useContext(gl) ?? void 0;
}
const Or = Xa(null);
Or.displayName = "CubeVizContext";
function et() {
  const e = qo(Or);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Rt() {
  return et().families;
}
function bh(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function kC({
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
    () => yi(vi, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ie(
    () => bh(e) ? xd(e) : e,
    [e]
  ), f = ie(
    () => {
      var S;
      return {
        chartRamp: (S = t == null ? void 0 : t.chartRamp) != null && S.length ? t.chartRamp : _r,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: ol(t == null ? void 0 : t.marks)
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
  ), d = ie(() => o ?? {}, [o]), p = ie(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), h = ie(
    () => ({
      cubeClient: m,
      registry: d,
      families: u,
      locale: g,
      theme: f,
      maps: p
    }),
    [m, d, u, g, f, p]
  ), [v, w] = Lt(null);
  return /* @__PURE__ */ l(Or.Provider, { value: h, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: A(
        "cv-root",
        f.mode === "dark" && "dark",
        f.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(yh, { container: v, children: /* @__PURE__ */ l(
        oi,
        {
          onRangeSelect: a == null ? void 0 : a.onRangeSelect,
          onPointSelect: a == null ? void 0 : a.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function Si({
  families: e,
  children: t
}) {
  const n = et(), r = (e ?? []).map((i) => i.family).join("|"), o = ie(() => !e || e.length === 0 ? n : { ...n, families: yi(vi, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(Ce, { children: t }) : /* @__PURE__ */ l(Or.Provider, { value: o, children: t });
}
function wh(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Ch = 5e3;
function hl(e, t) {
  const { cubeClient: n } = et(), r = (t == null ? void 0 : t.skip) ?? !1, o = ie(
    () => e.limit === void 0 ? { ...e, limit: Ch } : e,
    [e]
  ), i = ie(() => JSON.stringify(o), [o]), [a, s] = Lt({ isLoading: !r }), [c, u] = Lt(0), m = ft(() => u((f) => f + 1), []);
  return In(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    const g = new AbortController();
    return s((d) => ({ resultSet: d.resultSet, isLoading: !0 })), n.load(o, { castNumerics: !0, signal: g.signal }).then((d) => {
      f && s({
        resultSet: d,
        isLoading: !1
      });
    }).catch((d) => {
      f && s({
        isLoading: !1,
        error: d instanceof Error ? d : new Error(String(d))
      });
    }), () => {
      f = !1, g.abort();
    };
  }, [n, i, r, c]), { ...a, refetch: m };
}
const Ar = Xa(null);
Ar.displayName = "DashboardContext";
function ki({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, o = $t(null);
  (o.current === null || o.current.key !== r) && (o.current = { store: Ig(r, t), key: r });
  const i = o.current.store, a = Sh(i, r);
  return Fc(Ar.Provider, { value: a }, n);
}
function Sh(e, t) {
  const n = ft(
    (i, a) => e.set(i, a),
    [e]
  ), r = ft(
    (i) => ul(i, e.getAll(), t),
    [e, t]
  ), o = ft(
    (i) => Fg(i, e.getAll(), t),
    [e, t]
  );
  return ie(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: o, decls: t }),
    [e, n, r, o, t]
  );
}
function kh(e) {
  const t = Ja(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function vl() {
  const e = qo(Ar);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return kh(e);
}
function Pn() {
  return qo(Ar);
}
const Rh = () => () => {
}, Nh = Object.freeze({}), xh = Object.freeze([]);
function Zr(e, t, n) {
  var x;
  const r = Pn(), { locale: o } = et(), i = Rt(), a = $t(null);
  a.current === null && (a.current = dl());
  const s = a.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), m = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? Nh,
    (r == null ? void 0 : r.decls) ?? xh
  ) : e, f = Ja(
    u && r ? r.store.subscribe : Rh,
    m,
    m
  ), { resultSet: g, isLoading: d, error: p, refetch: h } = hl(f, { skip: n == null ? void 0 : n.skip }), v = ((x = t.format) == null ? void 0 : x.unitSystem) ?? (o == null ? void 0 : o.unitSystem), w = ie(() => $r(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]);
  return { data: ie(() => {
    if (g)
      return sl(g, t, f, { unitSystem: v, conversions: w }, i);
  }, [g, t, f, v, w, i]), isLoading: d, error: p, refetch: h, resolvedQuery: f };
}
function Nt() {
  const { cubeClient: e } = et(), [t, n] = Lt({ isLoading: !0 });
  return In(() => {
    let r = !0;
    return n({ isLoading: !0 }), _d(e).then((o) => {
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
function Ir() {
  const { locale: e } = et(), t = y.useMemo(() => $r(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return y.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function RC() {
  const { locale: e } = et(), { formatValue: t, units: n } = e;
  return ie(
    () => t ?? fl($r(n)),
    [t, n]
  );
}
function yl() {
  const [e, t] = Lt(0), n = $t(null), r = $t(null), o = $t(null), i = $t(0), a = ft((u) => {
    o.current === null && (o.current = requestAnimationFrame(() => {
      o.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = ft(() => {
    r.current && (r.current.disconnect(), r.current = null), o.current !== null && (cancelAnimationFrame(o.current), o.current = null);
  }, []), c = ft(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const f = new ResizeObserver((g) => {
        var d, p;
        for (const h of g) {
          const v = ((p = (d = h.contentBoxSize) == null ? void 0 : d[0]) == null ? void 0 : p.inlineSize) ?? h.contentRect.width;
          a(v);
        }
      });
      f.observe(u), r.current = f;
    },
    [a, s]
  );
  return In(() => s, [s]), [c, e];
}
const _h = "day";
function Mh(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const o = r.member ?? (n == null ? void 0 : n.measure), i = (m = e.timeDimensions) == null ? void 0 : m[0], a = r.timeDimension ?? (i == null ? void 0 : i.dimension);
  if (!o || !a) return null;
  const s = r.dateRange ?? (i == null ? void 0 : i.dateRange);
  return { query: {
    measures: [o],
    timeDimensions: [
      {
        dimension: a,
        granularity: r.granularity ?? _h,
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
const oe = (e) => ke(e, "yyyy-MM-dd");
function Fh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const o = Xn(e[0]), i = Xn(e[1]);
    if (Number.isNaN(o.getTime()) || Number.isNaN(i.getTime())) return;
    const a = Wc(i, o) + 1;
    return [oe(Ae(o, a)), oe(Ae(o, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const o = Ae(t, 1);
    return [oe(o), oe(o)];
  }
  if (n === "yesterday") {
    const o = Ae(t, 2);
    return [oe(o), oe(o)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const o = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [oe(Ae(t, 2 * o - 1)), oe(Ae(t, o))];
    if (i.startsWith("week")) return [oe(Ae(t, 14 * o - 1)), oe(Ae(t, 7 * o))];
    if (i.startsWith("month"))
      return [oe(Ot(Tt(t, 2 * o))), oe(Ae(Ot(Tt(t, o)), 1))];
    if (i.startsWith("quarter"))
      return [oe(At(Pt(t, 2 * o))), oe(Ae(At(Pt(t, o)), 1))];
    if (i.startsWith("year"))
      return [oe(It(Et(t, 2 * o))), oe(Ae(It(Et(t, o)), 1))];
  }
  if (n === "this week") {
    const o = co(t, 1);
    return [oe(Jn(o)), oe(Zn(o))];
  }
  if (n === "this month") {
    const o = Tt(t, 1);
    return [oe(Ot(o)), oe(wn(o))];
  }
  if (n === "this quarter") {
    const o = Pt(t, 1);
    return [oe(At(o)), oe(Cn(o))];
  }
  if (n === "this year") {
    const o = Et(t, 1);
    return [oe(It(o)), oe(Sn(o))];
  }
  if (n === "last week") {
    const o = co(t, 2);
    return [oe(Jn(o)), oe(Zn(o))];
  }
  if (n === "last month") {
    const o = Tt(t, 2);
    return [oe(Ot(o)), oe(wn(o))];
  }
  if (n === "last quarter") {
    const o = Pt(t, 2);
    return [oe(At(o)), oe(Cn(o))];
  }
  if (n === "last year") {
    const o = Et(t, 2);
    return [oe(It(o)), oe(Sn(o))];
  }
}
function $h(e, t, n = xr) {
  var u, m;
  const r = t.familyOptions ?? {}, o = n.require(t.family).comparePreviousMode;
  if (o === "series") {
    if (!r.comparePrevious) return null;
  } else if (o === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (m = e.timeDimensions) == null ? void 0 : m[0];
  if (!i) return null;
  const a = i.dateRange;
  if (a !== void 0 && typeof a == "object" && !Array.isArray(a)) return null;
  const s = Fh(a);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: o } : null;
}
const Oh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Ri({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: o,
  widgetId: i,
  onRangeSelect: a,
  onPointSelect: s
}) {
  var E;
  const { registry: c, locale: u, theme: m } = et(), f = Rt(), g = ((E = f.get(t.family)) == null ? void 0 : E.queryless) ?? !1, d = ie(() => {
    var D;
    return (D = t.format) != null && D.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), p = ie(() => {
    const D = e ?? {};
    return D.timezone || !(u != null && u.timezone) ? D : { ...D, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: h, isLoading: v, error: w, refetch: S, resolvedQuery: x } = Zr(
    p,
    d,
    { skip: g }
  ), k = ie(() => Mh(p, d), [p, d]), _ = Zr(
    (k == null ? void 0 : k.query) ?? p,
    (k == null ? void 0 : k.chart) ?? d,
    { skip: !k }
  ), R = ie(
    () => $h(x, d, f),
    [x, d, f]
  ), M = Zr(
    (R == null ? void 0 : R.query) ?? p,
    d,
    { skip: !R, skipResolve: !0 }
  ), V = ie(
    () => ({ [d.family]: wh(c, d.family, f) }),
    [c, d.family, f]
  ), H = ie(() => {
    let D = h ?? Oh;
    if (k && _.data) {
      D = { ...D, series: _.data.series, categories: _.data.categories };
      const X = D.raw.rows.length > 0, Z = D.series.some((ee) => ee.data.some((le) => le !== null));
      D = { ...D, empty: !X && !Z };
    }
    if (R && M.data) {
      if (R.mode === "kpiRow") {
        const X = M.data.raw.rows[0];
        if (X) {
          const Z = D.raw.rows[0];
          D = {
            ...D,
            raw: { ...D.raw, rows: Z ? [Z, X] : [X] }
          };
        }
      } else if (!M.data.empty) {
        const X = new Map(M.data.series.map((Z) => [Z.key, Z]));
        if (!D.empty && D.series.length > 0) {
          const Z = D.categories.length, ee = D.series.map((le) => {
            const me = X.get(le.key), ce = Array.from({ length: Z }, (ye, fe) => (me == null ? void 0 : me.data[fe]) ?? null);
            return {
              ...le,
              key: `${le.key}__prev`,
              label: `${le.label} (prev)`,
              colorToken: le.colorToken,
              data: ce,
              meta: { ...le.meta, companion: !0 }
            };
          });
          D = { ...D, series: [...D.series, ...ee] };
        } else {
          const Z = M.data.series.map((ee) => ({
            ...ee,
            key: `${ee.key}__prev`,
            label: `${ee.label} (prev)`,
            data: [...ee.data],
            meta: { ...ee.meta, companion: !0 }
          }));
          D = {
            ...D,
            categories: M.data.categories,
            series: Z,
            empty: !1
          };
        }
      }
    }
    return D;
  }, [h, k, _.data, R, M.data]);
  In(() => {
    n == null || n({ rows: H.raw.rows, refetch: S, isLoading: v });
  }, [n, H.raw.rows, S, v]);
  const I = {}, T = ie(
    () => u.formatValue ?? fl($r(u.units)),
    [u.formatValue, u.units]
  ), z = ie(
    () => ni(H.raw.annotation, d, T, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [H.raw.annotation, d, T, u.locale, u.unitSystem]
  ), O = d.mapping, G = ie(
    () => ({
      categoryMember: O == null ? void 0 : O.category.member,
      pivotMember: (O == null ? void 0 : O.series.mode) === "pivot" ? O.series.pivot : void 0,
      formatCategory: z.category
    }),
    [O, z]
  );
  return /* @__PURE__ */ l(
    oi,
    {
      widgetId: i,
      target: G,
      onRangeSelect: a,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        il,
        {
          data: H,
          options: d,
          config: I,
          format: z,
          state: g ? { loading: !1 } : { loading: v && !h, error: w },
          components: V,
          registry: f,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: o
        }
      )
    }
  );
}
function Ah({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Ri,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const bl = "cube-viz-prose";
function Ih(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Th({ doc: e }) {
  const t = Ih(e), n = ie(
    () => t ? e : null,
    [t, e]
  ), r = vs(
    {
      extensions: [bs],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: A(bl) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(ys, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Wn = [
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
], Ph = Object.fromEntries(
  Wn.map((e) => [e.value, e.label])
);
function xa(e) {
  return Ph[e.trim().toLowerCase()] ?? e;
}
const Eh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Dh({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Pu(), o = A(nl({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ C("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: A(o, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Xo, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: ke(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: A(o, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(yr, {})
      }
    )
  ] });
}
function Lh({ day: e, modifiers: t, className: n, style: r, ...o }) {
  const i = !!t.selected && !t.outside && !t.disabled, a = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...o,
      style: { ...r, color: i ? "var(--primary-foreground)" : a ? "var(--muted-foreground)" : "var(--foreground)" },
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
function wl({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Tu,
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
        MonthCaption: Dh,
        DayButton: Lh,
        Chevron: ({ orientation: o, className: i, ...a }) => /* @__PURE__ */ l(o === "left" ? Xo : yr, { className: A("cv-icon", i), ...a })
      },
      ...r
    }
  );
}
function We({
  ...e
}) {
  return /* @__PURE__ */ l(er.Root, { "data-slot": "popover", ...e });
}
function Ue({
  ...e
}) {
  return /* @__PURE__ */ l(er.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ke({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const o = pl();
  return /* @__PURE__ */ l(er.Portal, { container: o, children: /* @__PURE__ */ l(
    er.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: A("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Ge({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Root, { "data-slot": "select", ...e });
}
function Mo({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Group, { "data-slot": "select-group", ...e });
}
function je({
  ...e
}) {
  return /* @__PURE__ */ l(Te.Value, { "data-slot": "select-value", ...e });
}
function Be({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ C(
    Te.Trigger,
    {
      "data-slot": "select-trigger",
      className: A("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Te.Icon, { asChild: !0, children: /* @__PURE__ */ l(St, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Vh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Te.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: A("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(nu, {})
    }
  );
}
function zh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Te.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: A("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(St, {})
    }
  );
}
function qe({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const o = pl();
  return /* @__PURE__ */ l(Te.Portal, { container: o, children: /* @__PURE__ */ C(
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
        /* @__PURE__ */ l(Vh, {}),
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
        /* @__PURE__ */ l(zh, {})
      ]
    }
  ) });
}
function Fo({
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
function Re({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ C(
    Te.Item,
    {
      "data-slot": "select-item",
      className: A("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Te.ItemIndicator, { children: /* @__PURE__ */ l(an, {}) }) }),
        /* @__PURE__ */ l(Te.ItemText, { children: t })
      ]
    }
  );
}
const nn = "cv-field", Hh = "cv-field-label", hn = "yyyy-MM-dd";
function Gh(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function _a(e) {
  if (!e) return;
  const t = os(e, hn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function jh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, o = r.presets ?? Eh, [i, a] = Lt(!1), s = typeof e == "string", [c, u] = Gh(e), m = _a(c), f = _a(u), g = m ? { from: m, to: f } : void 0;
  let d;
  s ? d = xa(e) : m && f ? d = `${ke(m, "MMM d, yyyy")} – ${ke(f, "MMM d, yyyy")}` : m ? d = ke(m, "MMM d, yyyy") : d = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ C(We, { open: i, onOpenChange: a, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(
      ne,
      {
        variant: "outline",
        className: A(
          "cv-daterange-trigger",
          d === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(cs, {}),
          d
        ]
      }
    ) }),
    /* @__PURE__ */ C(Ke, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: o.map((h) => /* @__PURE__ */ l(
        ne,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(h), a(!1);
          },
          children: xa(h)
        },
        h
      )) }),
      /* @__PURE__ */ l(
        wl,
        {
          mode: "range",
          selected: g,
          defaultMonth: m,
          disabled: p,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([ke(h.from, hn), ke(h.to, hn)]) : h != null && h.from ? t([ke(h.from, hn), ke(h.from, hn)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Bh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function qh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: o } = vl(), i = r.rangeVariable ? wi(o(r.rangeVariable)) : void 0, a = r.options ?? (i !== void 0 ? ll(i) : Bh), s = typeof e == "string" ? e : "", c = a.join(",");
  return In(() => {
    s && !a.includes(s) && t(a[0]);
  }, [s, c]), /* @__PURE__ */ C(
    Ge,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Be, { className: nn, children: /* @__PURE__ */ l(je, { placeholder: "—" }) }),
        /* @__PURE__ */ l(qe, { children: a.map((u) => /* @__PURE__ */ l(Re, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Wh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((a) => String(a))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: A(nn, "cv-field--multi"),
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
  return /* @__PURE__ */ C(
    Ge,
    {
      value: o,
      onValueChange: (i) => {
        const a = r.options.find((s) => String(s.value) === i);
        t(a ? a.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Be, { className: nn, children: /* @__PURE__ */ l(je, { placeholder: "—" }) }),
        /* @__PURE__ */ l(qe, { children: r.options.map((i) => /* @__PURE__ */ l(Re, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Uh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: o, isLoading: i } = Nt(), a = ie(() => {
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
  return /* @__PURE__ */ C(
    "select",
    {
      className: nn,
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
function Kh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: nn,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (o) => t(o.target.value)
    }
  );
}
function Yh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: nn,
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
function Qh({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ C("label", { className: "cv-toggle", children: [
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
const Xh = {
  dateRange: jh,
  granularity: qh,
  select: Wh,
  memberSelect: Uh,
  text: Kh,
  number: Yh,
  toggle: Qh
};
function Jh({ control: e, title: t }) {
  var d;
  const { registry: n } = et(), { decls: r, resolveValue: o, setVar: i } = vl(), a = ie(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = $c();
  if (!a)
    return /* @__PURE__ */ C("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((d = n.controls) == null ? void 0 : d[c]) ?? Xh[c], m = o(e.variable), f = (p) => i(e.variable, p), g = t ?? a.label ?? a.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: f, decl: a, control: e.control }) : /* @__PURE__ */ C("div", { children: [
    /* @__PURE__ */ l("label", { className: Hh, htmlFor: s, children: g }),
    /* @__PURE__ */ l(
      u,
      {
        value: m,
        onChange: f,
        decl: a,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const Cl = y.forwardRef(
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
Cl.displayName = "Card";
const Sl = y.forwardRef(
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
Sl.displayName = "CardHeader";
const kl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: A("cv-card-title", e),
      ...t
    }
  )
);
kl.displayName = "CardTitle";
const Zh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-description", e), ...t })
);
Zh.displayName = "CardDescription";
const ev = y.forwardRef(
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
ev.displayName = "CardAction";
const Rl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-content", e), ...t })
);
Rl.displayName = "CardContent";
const tv = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: A("cv-card-footer", e), ...t })
);
tv.displayName = "CardFooter";
const lr = "cube-viz-drag-handle";
function Nl(e) {
  var s;
  const { registry: t } = et(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: o, dragHandleProps: i, children: a } = e;
  return /* @__PURE__ */ C(Cl, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ C(
      Sl,
      {
        ...i,
        className: A(lr, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(kl, { className: "cv-widget-chrome-title", children: r }),
          o
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Rl, { className: "cv-widget-chrome-body", children: a })
  ] });
}
class Ma extends Oc {
  constructor() {
    super(...arguments);
    Lr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ C(br, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Qo, {}),
      /* @__PURE__ */ l(wr, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Cr, { children: n.message })
    ] }) : this.props.children;
  }
}
function nv(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let a = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(a) && !Number.isFinite(Number(a)) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
  }, r = t.map(n).join(","), o = e.map((i) => t.map((a) => n(i[a])).join(",")).join(`
`);
  return `${r}
${o}`;
}
function rv(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), o = URL.createObjectURL(r), i = document.createElement("a");
  i.href = o, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(o), 0);
}
function ov(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), o.href = e, o.href;
}
const iv = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function gt(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let jt = null;
function xl(e = {}) {
  return jt || (e.includeStyleProperties ? (jt = e.includeStyleProperties, jt) : (jt = gt(window.getComputedStyle(document.documentElement)), jt));
}
function cr(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function av(e) {
  const t = cr(e, "border-left-width"), n = cr(e, "border-right-width");
  return e.clientWidth + t + n;
}
function sv(e) {
  const t = cr(e, "border-top-width"), n = cr(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function _l(e, t = {}) {
  const n = t.width || av(e), r = t.height || sv(e);
  return { width: n, height: r };
}
function lv() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ee = 16384;
function cv(e) {
  (e.width > Ee || e.height > Ee) && (e.width > Ee && e.height > Ee ? e.width > e.height ? (e.height *= Ee / e.width, e.width = Ee) : (e.width *= Ee / e.height, e.height = Ee) : e.width > Ee ? (e.height *= Ee / e.width, e.width = Ee) : (e.width *= Ee / e.height, e.height = Ee));
}
function ur(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function uv(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function dv(e, t, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${t}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(e), uv(o);
}
const Pe = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Pe(n, t);
};
function mv(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function fv(e, t) {
  return xl(t).map((n) => {
    const r = e.getPropertyValue(n), o = e.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function gv(e, t, n, r) {
  const o = `.${e}:${t}`, i = n.cssText ? mv(n) : fv(n, r);
  return document.createTextNode(`${o}{${i}}`);
}
function Fa(e, t, n, r) {
  const o = window.getComputedStyle(e, n), i = o.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const a = iv();
  try {
    t.className = `${t.className} ${a}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(gv(a, n, o, r)), t.appendChild(s);
}
function pv(e, t, n) {
  Fa(e, t, ":before", n), Fa(e, t, ":after", n);
}
const $a = "application/font-woff", Oa = "image/jpeg", hv = {
  woff: $a,
  woff2: $a,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Oa,
  jpeg: Oa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function vv(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Ni(e) {
  const t = vv(e).toLowerCase();
  return hv[t] || "";
}
function yv(e) {
  return e.split(/,/)[1];
}
function $o(e) {
  return e.search(/^(data:)/) !== -1;
}
function bv(e, t) {
  return `data:${t};base64,${e}`;
}
async function Ml(e, t, n) {
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
const eo = {};
function wv(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function xi(e, t, n) {
  const r = wv(e, t, n.includeQueryParams);
  if (eo[r] != null)
    return eo[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const i = await Ml(e, n.fetchRequestInit, ({ res: a, result: s }) => (t || (t = a.headers.get("Content-Type") || ""), yv(s)));
    o = bv(i, t);
  } catch (i) {
    o = n.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${e}`;
    i && (a = typeof i == "string" ? i : i.message), a && console.warn(a);
  }
  return eo[r] = o, o;
}
async function Cv(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : ur(t);
}
async function Sv(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), a = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, a == null || a.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return ur(s);
  }
  const n = e.poster, r = Ni(n), o = await xi(n, r, t);
  return ur(o);
}
async function kv(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Tr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Rv(e, t) {
  return Pe(e, HTMLCanvasElement) ? Cv(e) : Pe(e, HTMLVideoElement) ? Sv(e, t) : Pe(e, HTMLIFrameElement) ? kv(e, t) : e.cloneNode(Fl(e));
}
const Nv = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Fl = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function xv(e, t, n) {
  var r, o;
  if (Fl(t))
    return t;
  let i = [];
  return Nv(e) && e.assignedNodes ? i = gt(e.assignedNodes()) : Pe(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = gt(e.contentDocument.body.childNodes) : i = gt(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes), i.length === 0 || Pe(e, HTMLVideoElement) || await i.reduce((a, s) => a.then(() => Tr(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function _v(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const o = window.getComputedStyle(e);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : xl(n).forEach((i) => {
    let a = o.getPropertyValue(i);
    i === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), Pe(e, HTMLIFrameElement) && i === "display" && a === "inline" && (a = "block"), i === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(i, a, o.getPropertyPriority(i));
  });
}
function Mv(e, t) {
  Pe(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Pe(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Fv(e, t) {
  if (Pe(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((o) => e.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function $v(e, t, n) {
  return Pe(t, Element) && (_v(e, t, n), pv(e, t, n), Mv(e, t), Fv(e, t)), t;
}
async function Ov(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Tr(u, t, !0));
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
async function Tr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Rv(r, t)).then((r) => xv(e, r, t)).then((r) => $v(e, r, t)).then((r) => Ov(r, t));
}
const $l = /url\((['"]?)([^'"]+?)\1\)/g, Av = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Iv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Tv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Pv(e) {
  const t = [];
  return e.replace($l, (n, r, o) => (t.push(o), n)), t.filter((n) => !$o(n));
}
async function Ev(e, t, n, r, o) {
  try {
    const i = n ? ov(t, n) : t, a = Ni(t);
    let s;
    return o || (s = await xi(i, a, r)), e.replace(Tv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Dv(e, { preferredFontFormat: t }) {
  return t ? e.replace(Iv, (n) => {
    for (; ; ) {
      const [r, , o] = Av.exec(n) || [];
      if (!o)
        return "";
      if (o === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Ol(e) {
  return e.search($l) !== -1;
}
async function Al(e, t, n) {
  if (!Ol(e))
    return e;
  const r = Dv(e, n);
  return Pv(r).reduce((i, a) => i.then((s) => Ev(s, a, t, n)), Promise.resolve(r));
}
async function Bt(e, t, n) {
  var r;
  const o = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (o) {
    const i = await Al(o, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Lv(e, t) {
  await Bt("background", e, t) || await Bt("background-image", e, t), await Bt("mask", e, t) || await Bt("-webkit-mask", e, t) || await Bt("mask-image", e, t) || await Bt("-webkit-mask-image", e, t);
}
async function Vv(e, t) {
  const n = Pe(e, HTMLImageElement);
  if (!(n && !$o(e.src)) && !(Pe(e, SVGImageElement) && !$o(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, o = await xi(r, Ni(r), t);
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
async function zv(e, t) {
  const r = gt(e.childNodes).map((o) => Il(o, t));
  await Promise.all(r).then(() => e);
}
async function Il(e, t) {
  Pe(e, Element) && (await Lv(e, t), await Vv(e, t), await zv(e, t));
}
function Hv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), e;
}
const Aa = {};
async function Ia(e) {
  let t = Aa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Aa[e] = t, t;
}
async function Ta(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let s = a.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Ml(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(a, `url(${c})`), [a, c]));
  });
  return Promise.all(i).then(() => n);
}
function Pa(e) {
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
async function Gv(e, t) {
  const n = [], r = [];
  return e.forEach((o) => {
    if ("cssRules" in o)
      try {
        gt(o.cssRules || []).forEach((i, a) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = a + 1;
            const c = i.href, u = Ia(c).then((m) => Ta(m, t)).then((m) => Pa(m).forEach((f) => {
              try {
                o.insertRule(f, f.startsWith("@import") ? s += 1 : o.cssRules.length);
              } catch (g) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: g
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            r.push(u);
          }
        });
      } catch (i) {
        const a = e.find((s) => s.href == null) || document.styleSheets[0];
        o.href != null && r.push(Ia(o.href).then((s) => Ta(s, t)).then((s) => Pa(s).forEach((c) => {
          a.insertRule(c, a.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((o) => {
    if ("cssRules" in o)
      try {
        gt(o.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${o.href}`, i);
      }
  }), n));
}
function jv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Ol(t.style.getPropertyValue("src")));
}
async function Bv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = gt(e.ownerDocument.styleSheets), r = await Gv(n, t);
  return jv(r);
}
function Tl(e) {
  return e.trim().replace(/["']/g, "");
}
function qv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Tl(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Wv(e, t) {
  const n = await Bv(e, t), r = qv(e);
  return (await Promise.all(n.filter((i) => r.has(Tl(i.style.fontFamily))).map((i) => {
    const a = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Al(i.cssText, a, t);
  }))).join(`
`);
}
async function Uv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Wv(e, t);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Kv(e, t = {}) {
  const { width: n, height: r } = _l(e, t), o = await Tr(e, t, !0);
  return await Uv(o, t), await Il(o, t), Hv(o, t), await dv(o, n, r);
}
async function Yv(e, t = {}) {
  const { width: n, height: r } = _l(e, t), o = await Kv(e, t), i = await ur(o), a = document.createElement("canvas"), s = a.getContext("2d"), c = t.pixelRatio || lv(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return a.width = u * c, a.height = m * c, t.skipAutoScale || cv(a), a.style.width = `${u}`, a.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, a.width, a.height)), s.drawImage(i, 0, 0, a.width, a.height), a;
}
async function Qv(e, t = {}) {
  return (await Yv(e, t)).toDataURL();
}
function Xv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Jv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Zv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function ey(e, t, n = 2) {
  const r = await Qv(e, {
    pixelRatio: n,
    backgroundColor: Zv(e),
    cacheBust: !0
  });
  Jv(r, `${Xv(t)}.png`);
}
function ty({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [o, i] = y.useState(!1), [a, s] = y.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    rv(nv(t), `${p}.csv`);
  }, f = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || o)) {
      i(!0), s(null);
      try {
        await ey(p, e);
      } catch (h) {
        s(h instanceof Error ? h.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (p) => p.stopPropagation(), d = (p = !0) => A("cv-menu-item", !p && "cv-menu-item--disabled");
  return /* @__PURE__ */ C(We, { children: [
    /* @__PURE__ */ l(
      Ue,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(ru, {})
      }
    ),
    /* @__PURE__ */ C(Ke, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ C("button", { type: "button", onClick: n, className: d(), children: [
        /* @__PURE__ */ l(ou, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ C("button", { type: "button", onClick: f, disabled: o, className: d(!o), children: [
        /* @__PURE__ */ l(iu, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ C("button", { type: "button", onClick: m, disabled: !c, className: d(c), children: [
        /* @__PURE__ */ l(au, {}),
        "Export CSV"
      ] }),
      a ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: a }) : null
    ] })
  ] });
}
function Ea({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        Ri,
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
      return /* @__PURE__ */ l(Th, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Jh, { control: e.control, title: e.title });
  }
}
function Oo({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: o
}) {
  const [i, a] = Lt({ rows: [] }), s = ft(
    (m) => a({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = $t(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Ma, { children: /* @__PURE__ */ l(Ea, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    ty,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    Nl,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Ma, { children: /* @__PURE__ */ l(
        Ea,
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
const Pl = (e) => e.filter((t) => t.type === "chart");
function ny(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const o of Pl(e)) {
    const i = (r = (n = o.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && _e(i.dateRange) && t.set(o.id, i.dateRange.var);
  }
  return t;
}
function ry(e) {
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
  for (const o of Pl(e)) n(((r = o.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function oy({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: o
}) {
  const i = Pn(), a = i == null ? void 0 : i.setVar, s = y.useMemo(() => ny(e.widgets), [e.widgets]), c = y.useMemo(() => ry(e.widgets), [e.widgets]), u = y.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const m = y.useCallback(
    (p) => {
      var h, v;
      if (a) {
        const w = p != null && p.widgetId ? s.get(p.widgetId) : void 0;
        if (w) a(w, p ? [p.from, p.to] : void 0);
        else if (!p) for (const S of new Set(s.values())) a(S, void 0);
      }
      (v = (h = u.current).onRangeSelect) == null || v.call(h, p);
    },
    [a, s]
  ), f = y.useCallback(
    (p) => {
      var h, v;
      if (a)
        if (p) {
          const w = c.get(p.member);
          w && a(w, [String(p.value)]);
        } else
          for (const w of new Set(c.values())) a(w, void 0);
      (v = (h = u.current).onPointSelect) == null || v.call(h, p);
    },
    [a, c]
  ), g = !!(n || t && a && s.size), d = !!(r || t && a && c.size);
  return /* @__PURE__ */ l(
    oi,
    {
      onRangeSelect: g ? m : void 0,
      onPointSelect: d ? f : void 0,
      children: o
    }
  );
}
const iy = "lg", ay = 640;
function sy(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function ly(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function NC({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: o,
  onPointSelect: i
}) {
  const [a, s] = yl(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, f = c.margin ?? [12, 12], g = c.containerPadding ?? f, d = ie(
    () => ({ [iy]: ly(e.layout) }),
    [e.layout]
  ), p = ie(
    () => new Map(e.widgets.map((v) => [v.id, v])),
    [e.widgets]
  ), h = !t && s > 0 && s < ay;
  return /* @__PURE__ */ l(Si, { families: n, children: /* @__PURE__ */ l(ki, { spec: e, children: /* @__PURE__ */ l(
    oy,
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
            gap: f[1],
            padding: `${g[1]}px ${g[0]}px`
          },
          children: sy(e.layout).map((v) => {
            const w = p.get(v.i);
            if (!w) return null;
            const S = v.h * m + (v.h - 1) * f[1];
            return /* @__PURE__ */ l("div", { style: { height: S }, children: /* @__PURE__ */ l(Oo, { widget: w, editable: !1 }) }, v.i);
          })
        }
      ) : /* @__PURE__ */ l(
        hs,
        {
          width: s,
          layouts: d,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: f,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${lr}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((v) => {
            const w = p.get(v.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Oo, { widget: w, editable: t }) }, v.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function xC({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(Si, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Nl,
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
        Ah,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function El(e, t = "None") {
  if (_e(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => El(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function cy(e) {
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
function uy(e, t) {
  const n = new Set(cy(t));
  return e.filter((r) => n.has(r.type));
}
function dy(e) {
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
function my(e, t, n) {
  const r = new Set(n.map((s) => s.name)), o = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = o, a = 2;
  for (; r.has(i); ) i = `${o}_${a++}`;
  return i;
}
function fy(e, t, n) {
  const r = dy(e), o = { name: my(t, e, n), type: r }, i = t.trim();
  return i && (o.label = i), r === "dateRange" ? o.default = "last 7 days" : r === "granularity" && (o.default = "day"), o;
}
const to = ht.options, Ao = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function gy(e, t = "None") {
  const n = El(e, t);
  return n === Jt ? "Auto" : Ao[n] ?? n;
}
const no = "__none__";
function Dl({
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
  className: m
}) {
  const f = n && n.length > 0 ? n : to, g = e && e !== Jt && !f.includes(e) ? [...f, e].sort(
    (p, h) => to.indexOf(p) - to.indexOf(h)
  ) : f, d = o ? `Auto (${Ao[o]})` : "Auto";
  return /* @__PURE__ */ C(
    Ge,
    {
      value: e ?? (i ? no : ""),
      onValueChange: (p) => t(p === no ? void 0 : p),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Be, { id: u, className: m, children: /* @__PURE__ */ l(je, { placeholder: s }) }),
        /* @__PURE__ */ C(qe, { children: [
          i ? /* @__PURE__ */ l(Re, { value: no, children: a }) : null,
          r ? /* @__PURE__ */ l(Re, { value: Jt, children: d }) : null,
          g.map((p) => /* @__PURE__ */ l(Re, { value: p, children: Ao[p] }, p))
        ] })
      ]
    }
  );
}
function Pr(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function py(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function hy(e) {
  return Io(e, "category");
}
function Io(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function rt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Er(e) {
  return e ? e.cubes.filter((t) => rt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Pr(t),
    joinTargets: py(t),
    category: hy(t),
    path: Io(t, "path"),
    grain: Io(t, "grain")
  })) : [];
}
function vy(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function pt(e, t) {
  if (!(!e || !t))
    return Er(e).find((n) => n.name === t);
}
function _i(e) {
  return e.shortTitle || e.title || e.name;
}
function Ve(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Ll(e) {
  return Ve(e.meta, "group");
}
function yy(e) {
  return Ve(e.meta, "geoPoint");
}
function Da(e) {
  const t = Ve(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function by(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function Un(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Vl(e, t) {
  if (t)
    return zt(e, "time", t).find(Un);
}
function wy(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const i = Ll(o), a = i ? `g:${i.toLowerCase()}` : `f:${t(o)}`;
    let s = r.get(a);
    s || (s = { label: i ?? t(o), items: [] }, r.set(a, s), n.push(a)), s.items.push(o);
  }
  return n.map((o) => [r.get(o).label, r.get(o).items]);
}
function dr(e) {
  const t = Ve(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function Cy(e) {
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
function Mi(e) {
  return Ve(e.meta, "agg");
}
function mr(e) {
  const t = Ve(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function Sy(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = Cy(dr(e));
  return t !== void 0 && Mi(e) === t;
}
function ky(e) {
  return Ve(e.meta, "familyHint");
}
function Ry(e) {
  return Ve(e.meta, "soloHint");
}
function fr(e) {
  return Ve(e.meta, "familyTitle");
}
function Ny(e, t) {
  if (mr(t))
    return zl(e, t).map(fr).find((n) => n !== void 0);
}
function Fi(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function xy(e) {
  return `each ${Fi(e)}`;
}
function zl(e, t) {
  const n = mr(t);
  if (!n) return [t];
  const r = [
    ...zt(e, "measure", t.cube),
    ...zt(e, "numberDimension", t.cube)
  ], o = /* @__PURE__ */ new Set(), i = [];
  for (const a of r)
    mr(a) !== n || o.has(a.name) || (o.add(a.name), i.push(a));
  return i.length > 0 ? i : [t];
}
function _y(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = mr(r.option);
    if (!o) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(o);
    i || (i = { familyKey: o, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(o, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const o = r.variants.find((s) => fr(s.option)), i = r.variants.findIndex((s) => Sy(s.option)), a = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : a >= 0 ? a : 0, r.label = fr((o == null ? void 0 : o.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function $i(e, t) {
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
function Hl(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: _i(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ve(n, "quantity"),
    unit: Ve(n, "unit")
  };
}
function Kn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: _i(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ve(n, "quantity"),
    unit: Ve(n, "unit")
  };
}
function Gl(e, t) {
  return {
    name: e.name,
    label: _i(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function My(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e.dimensions) {
    const i = o.meta, a = yy({ meta: i });
    !a || !rt(o) || n.set(a, [...n.get(a) ?? [], o]);
  }
  const r = [];
  for (const [o, i] of n) {
    const a = i.filter(
      (c) => c.type === "number" && Da({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Da({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || a.length !== 1 || s.length !== 1 || r.push({
      name: by(a[0].name, s[0].name),
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
function La(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function zt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const o of e.cubes) {
    if (!rt(o) || n && o.name !== n) continue;
    const i = Pr(o), a = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...My(o, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of o.measures)
        rt(s) && a(Hl(s, o.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of o.dimensions)
        rt(s) && s.type !== "time" && !La(s) && a(Kn(s, o.name));
    if (t === "time")
      for (const s of o.dimensions)
        rt(s) && s.type === "time" && a(Kn(s, o.name));
    if (t === "numberDimension")
      for (const s of o.dimensions)
        rt(s) && s.type === "number" && !La(s) && a(Kn(s, o.name));
  }
  return r;
}
function Fy(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const o of e.cubes) {
    if (!rt(o) || n && !n.has(o.name)) continue;
    const i = Pr(o);
    for (const a of o.segments) {
      if (!rt(a)) continue;
      const s = Gl(a, o.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function De(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Pr(n), o = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? o(Hl(i, n.name)) : o(Kn(i, n.name)) : void 0;
      const a = n.segments.find((s) => s.name === t);
      if (a) return o(Gl(a, n.name));
    }
    return zt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Va(e) {
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
const To = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), jl = {
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
function $y(e) {
  return e === "number";
}
function tt(e) {
  return e.target !== void 0;
}
function Fe(e, t) {
  return e.kinds.includes(t);
}
function Oi(e, t, n) {
  if (!Fe(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function Ht(e) {
  return e.chart.familyOptions ?? {};
}
function Ai(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Bl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Oy(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Ay(e, t, n) {
  var a, s;
  const r = e.chart;
  if (Ai(r)) return;
  const o = En(r), i = new Set(n ?? []);
  o && i.add(o);
  for (const c of t)
    if (((a = c.target) == null ? void 0 : a.kind) === "option") {
      const u = Ht(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function cn(e, t, n) {
  var s;
  const r = {}, o = e.chart, i = Ht(e), a = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!tt(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = En(o);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = Bl(o), f = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = a(c, f);
        break;
      }
      case "pivot": {
        const m = Ai(o) ?? Ay(e, t, n);
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
        r[c.id] = m.map((f) => f && typeof f == "object" ? f.member : void 0).filter((f) => typeof f == "string");
        break;
      }
    }
  }
  return r;
}
function Ii(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Ti(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Iy(e, t) {
  return { ...e, dimensions: Ii(e.dimensions, t) };
}
function ql(e, t) {
  const n = Ti(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Wl(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function _C(e) {
  return e === void 0 ? Hy : Ci(e);
}
const Ty = "last 30 days";
function fn(e, t, n, r) {
  if ($y(n)) return { ...e, measures: Ii(e.measures, t) };
  if (n === "time") {
    const o = Dn(e) ?? r;
    return Wl(e, {
      dimension: t,
      granularity: (o == null ? void 0 : o.granularity) ?? Jt,
      dateRange: o ? o.dateRange : Ty
    });
  }
  return Iy(e, t);
}
function vn(e, t, n, r) {
  const o = e.query ?? {}, i = cn(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return o;
  const a = Dn(o);
  if ((a == null ? void 0 : a.dimension) === n) return Wl(o, void 0);
  if ((o.measures ?? []).includes(n)) {
    const s = Ti(o.measures, n);
    return { ...o, measures: s.length ? s : void 0 };
  }
  return ql(o, n);
}
function Py(e, t, n, r) {
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
  return { category: { member: e }, series: Yl(t, r) };
}
function Rn(e, t, n) {
  var c, u;
  const r = cn(e, t, n), o = (m) => t.find((f) => {
    var g;
    return ((g = f.target) == null ? void 0 : g.kind) === m;
  }), i = o("category"), a = o("measures"), s = o("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : En(e.chart),
    measures: a ? r[a.id] ?? [] : Bl(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Ai(e.chart)
  };
}
function Nn(e, t, n) {
  const r = { ...Kl(e.chart), ...Oy(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Py(n.category, n.measures, n.pivot, r)
    }
  };
}
function gr(e, t, n) {
  const r = { ...Ht(e), ...n };
  for (const [o, i] of Object.entries(n)) i === void 0 && delete r[o];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Pi(e, t, n, r, o) {
  const i = t.find((u) => u.id === n);
  if (!i || !tt(i)) return e;
  const a = i.target, s = cn(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (a.kind) {
    case "category": {
      const u = s[0], m = Dn(c);
      u && u !== r && (c = vn(e, t, u, n)), c = fn(c, r, o, m);
      const f = Rn({ ...e, query: c }, t, [r]);
      return Nn(e, c, { ...f, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Ii(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = vn(e, t, s[0], n)), c = fn(c, r, o);
      const m = Rn({ ...e, query: c }, t, [r]);
      return Nn(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = vn(e, t, u, n)), c = fn(c, r, o);
      const m = Rn({ ...e, query: c }, t, [r]);
      return Nn(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = vn(e, t, u, n)), c = fn(c, r, o), gr(e, c, { [a.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(Ht(e)[a.key]) ? [...Ht(e)[a.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = fn(c, r, o), gr(e, c, { [a.key]: u });
    }
  }
}
function Ey(e, t, n, r) {
  const o = t.find((s) => s.id === n);
  if (!o || !tt(o)) return e;
  const i = o.target, a = vn(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: a, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Rn(e, t), c = Ti(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? a : ql(a, s.pivot);
      return Nn(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Rn(e, t);
      return Nn(e, a, { ...s, pivot: void 0 });
    }
    case "option":
      return gr(e, a, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(Ht(e)[i.key]) ? Ht(e)[i.key] : [];
      return gr(e, a, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Dy(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = Dn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Ly(e, t) {
  if (Fe(t, e)) return e;
  if (e === "category" && Fe(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && Fe(t, "category") || e === "time" && Fe(t, "category")) return "category";
}
function Vy(e, t, n) {
  const r = cn(e, t), o = /* @__PURE__ */ new Map();
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
    if (!tt(a) || !a.channel) continue;
    const s = o.get(a.channel);
    if (!(s != null && s.length)) continue;
    const c = a.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = Ly(Dy(e, u), a);
      m && (i = Pi(i, n, a.id, u, m));
    }
  }
  return i;
}
function zy(e, t) {
  const n = [...t];
  let r = 0;
  for (const o of e) {
    if (!tt(o)) continue;
    const i = n.findIndex((a) => Fe(o, a));
    i >= 0 ? (n.splice(i, 1), r += o.optional ? 1 : 3) : o.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Wt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Ul(e) {
  var a, s, c, u, m;
  const t = e.query ?? {}, n = (a = t.measures) == null ? void 0 : a.find(Boolean);
  if (n) return Wt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Wt(r);
  const o = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (o) return Wt(o);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Wt(i);
}
function Po(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Kl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function En(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Dn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Yl(e, t) {
  const n = {};
  for (const o of e) {
    const i = t[o];
    i && Object.keys(i).length > 0 && (n[o] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Hy = "day";
function Eo(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Gy(e, t, n) {
  const r = n.require(e.chart.family), o = n.require(t), i = Eo(r) && Eo(o) ? Vy(e, r.wells, o.wells) : jy(e, o);
  return { ...i, chart: { ...i.chart, family: t } };
}
function jy(e, t) {
  var d;
  const { chart: n } = e, r = e.query ?? {}, o = Po(n).length ? Po(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((p) => p.dimension), a = En(n) ?? ((d = r.dimensions) == null ? void 0 : d[0]) ?? i[0], s = [a, ...r.dimensions ?? [], ...i].filter(
    (p, h, v) => !!p && v.indexOf(p) === h
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Eo(t)) {
    const p = a ? { category: { member: a }, series: { mode: "measures", members: o } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: p } } : c;
  }
  const u = [...o], m = [...s], f = (p) => i.includes(p) ? "time" : "category";
  let g = c;
  for (const p of t.wells) {
    if (!p.target || !p.channel) continue;
    const h = Fe(p, "category") ? [
      [m, f],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, f]
    ];
    let v = 0;
    for (const [w, S] of h)
      for (let x = 0; x < w.length; ) {
        if (p.cardinality === "one" && v > 0 || !Fe(p, S(w[x]))) {
          x += 1;
          continue;
        }
        g = Pi(g, t.wells, p.id, w[x], S(w[x])), w.splice(x, 1), v += 1;
      }
  }
  return g;
}
function Ql(e) {
  return fh(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Xl(e) {
  return ph(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function By(e, t) {
  return t.require(e).wells;
}
function xn(e, t) {
  var i;
  const n = t.require(e.chart.family), r = cn(e, n.wells), o = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return o ? { ...r, ...o } : r;
}
function qt(e, t, n, r, o, i) {
  const a = i.require(t);
  if (a.placeField) return a.placeField(e, n, r, o);
  const s = Pi(e, a.wells, n, r, o);
  return qy(e, s, a.wells);
}
function Jl(e, t, n, r, o) {
  const i = o.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const a = Ey(e, i.wells, n, r);
  return Zl(e, a, i.wells);
}
function qy(e, t, n) {
  return Wy(e, Zl(e, t, n));
}
function Wy(e, t) {
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
function Zl(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const o = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(o.map((m) => m.dimension)), a = new Set(Object.values(cn(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && a.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...o, ...s] } };
}
function ec({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: A("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ C(y.Fragment, { children: [
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
function tc(e, t) {
  var o;
  const n = (o = e.meta) == null ? void 0 : o.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = Mi(e) ?? "";
  return r === "value" ? xy(t == null ? void 0 : t.grain) : r === "max" && dr(e) === "counter" ? "latest" : r;
}
function Ei(e) {
  return Mi(e) === "value";
}
function Di(e) {
  return `Plots each ${Fi(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function Uy(e, t, n) {
  if (Ei(n)) return Di(t);
  switch (dr(n) ?? e.map(dr).find(Boolean)) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const o = Fi(t == null ? void 0 : t.grain);
      return `Describes one ${o} at a time — the average across ${o}s is usually right.`;
    }
    case "part":
      return e.map(ky).find(Boolean);
    default:
      return;
  }
}
function Do({ option: e }) {
  const t = Ir();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: $i(e, t) });
}
function nc({
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
  const { meta: u, isLoading: m } = Nt(), f = y.useMemo(() => {
    if (t) {
      const h = new Set(t);
      return zt(u, n).filter((v) => h.has(v.cube));
    }
    return zt(u, n, e);
  }, [u, n, e, t]), g = y.useMemo(() => {
    const h = Ky(f), v = h.length > 1, w = [];
    for (const [S, x] of h)
      for (const [k, _] of wy(x, () => "Other")) {
        const R = v ? k === "Other" ? S : `${S} · ${k}` : k;
        w.push({ key: `${S}:${k}`, label: R, items: _ });
      }
    return w;
  }, [f]), d = g.length > 1, p = f.find((h) => h.name === r);
  return /* @__PURE__ */ C(Ge, { value: r, onValueChange: o, disabled: a || m, children: [
    /* @__PURE__ */ l(Be, { id: s, className: c, children: /* @__PURE__ */ l(je, { placeholder: m ? "Loading…" : i, children: p ? /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Do, { option: p }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(qe, { children: g.map((h) => /* @__PURE__ */ C(Mo, { children: [
      d && h.label ? /* @__PURE__ */ l(Fo, { children: h.label }) : null,
      h.items.map((v) => /* @__PURE__ */ l(Re, { value: v.name, children: /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Do, { option: v }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
      ] }) }, v.name))
    ] }, h.key)) })
  ] });
}
function Ky(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Xt({
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
      className: A("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ C(
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
function Yy(e, t, n) {
  return n(e) !== t;
}
function Li({ value: e, parse: t, format: n, onChange: r }) {
  const o = n(e), [i, a] = y.useState(o), [s, c] = y.useState(o);
  o !== s && (c(o), Yy(i, o, (f) => n(t(f))) && a(o));
  const u = y.useCallback(
    (f) => {
      a(f), r(t(f));
    },
    [r, t]
  ), m = y.useCallback(() => {
    a((f) => n(t(f)));
  }, [n, t]);
  return { text: i, onText: u, onBlur: m };
}
function za(e) {
  return e.reason === void 0;
}
function rc(e, t, n, r, o) {
  const i = Oi(e, t, [...n]);
  return i ? Qy(i, e, r) : o == null ? void 0 : o(r);
}
function Qy(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function Xy(e, t, n) {
  if (t !== void 0 && Ql(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Xl(e)}`;
}
const Vi = "cube-viz:field-picker:only-compatible";
function oc() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function ic() {
  var e;
  try {
    return ((e = oc()) == null ? void 0 : e.getItem(Vi)) !== "0";
  } catch {
    return !0;
  }
}
function Jy(e) {
  try {
    const t = oc();
    if (!t) return;
    t.setItem(Vi, e ? "1" : "0");
  } catch {
  }
}
let Lo = ic();
const Yn = /* @__PURE__ */ new Set();
let Ut;
function Zy() {
  for (const e of [...Yn]) e();
}
function ac(e) {
  e !== Lo && (Lo = e, Zy());
}
function eb() {
  if (Ut) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Vi || ac(ic());
  };
  e.addEventListener("storage", t), Ut = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const jn = {
  get: () => Lo,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Jy(e), ac(e);
  },
  subscribe: (e) => (Yn.add(e), eb(), () => {
    Yn.delete(e), Yn.size === 0 && (Ut == null || Ut(), Ut = void 0);
  })
}, tb = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(cu, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(ea, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(ea, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(fs, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(lu, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Ha = ["geoPoint", "number", "numberDimension", "category", "time"];
function zi({
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
  var ye, fe;
  const { meta: u, isLoading: m } = Nt(), [f, g] = y.useState(!1), [d, p] = y.useState(""), h = y.useSyncExternalStore(
    jn.subscribe,
    jn.get,
    jn.getServer
  ), v = jn.set, w = y.useId(), [S, x] = y.useState(r.viewLocked ?? "tables"), [k, _] = y.useState({}), [R, M] = y.useState({});
  y.useEffect(() => {
    f && x(r.viewLocked ?? "tables");
  }, [f, r.viewLocked]);
  const V = y.useMemo(() => new Set(t), [t]), H = d.trim().toLowerCase(), I = Ir(), T = y.useMemo(() => {
    if (S !== "tables") {
      const $ = r.views.find((j) => j.name === S) ?? pt(u, S);
      return $ ? [{ cube: $, tag: "dataset" }] : [];
    }
    const L = [];
    r.sourceCube && L.push({ cube: r.sourceCube, tag: "source" });
    const ue = r.relatedCubes.some(($) => $.path ?? $.category) ? "More tables" : "Related tables", P = ($) => $.path ? vy($.path) : $.category, F = /* @__PURE__ */ new Map();
    for (const $ of r.relatedCubes) {
      const j = P($);
      j !== void 0 && !F.has(j) && F.set(j, F.size);
    }
    const N = [...r.relatedCubes].sort(($, j) => {
      const q = P($), Y = P(j);
      return q === Y ? 0 : q === void 0 ? 1 : Y === void 0 ? -1 : (F.get(q) ?? 0) - (F.get(Y) ?? 0);
    });
    for (const $ of N) L.push({ cube: $, tag: "related", heading: P($) ?? ue });
    return L;
  }, [S, r, u]), z = [
    ...Ha.filter((L) => Fe(e, L)),
    ...Ha.filter((L) => !Fe(e, L))
  ], O = (L) => {
    const re = [], ue = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set();
    for (const F of z) {
      const N = tb[F], $ = Oi(e, F, n ?? []);
      let j = zt(u, N.metaKind, L);
      F === "time" && (j = [...j].sort(
        (q, Y) => Number(Un(Y)) - Number(Un(q))
      ));
      for (const q of j) {
        if (V.has(q.name) || P.has(q.name)) continue;
        const Y = fr(q) ?? Ny(u, q);
        if (H && !(q.label.toLowerCase().includes(H) || q.name.toLowerCase().includes(H) || ((Y == null ? void 0 : Y.toLowerCase().includes(H)) ?? !1)))
          continue;
        P.add(q.name);
        const te = Ll(q), Ne = te ? `g:${te.toLowerCase()}` : `k:${N.label}`;
        let we = ue.get(Ne);
        we || (we = {
          key: Ne,
          label: te ?? N.label,
          headerIcon: te ? void 0 : N.icon,
          rejected: $ !== void 0,
          items: []
        }, ue.set(Ne, we), re.push(Ne)), $ === void 0 && (we.rejected = !1), we.items.push({
          option: q,
          kind: F,
          reason: rc(e, F, n ?? [], q, o)
        });
      }
    }
    return re.map((F) => ue.get(F));
  }, G = T.map((L) => ({ section: L, groups: O(L.cube.name) })).filter((L) => L.groups.length > 0), E = h ? G.reduce(
    (L, re) => L + re.groups.reduce((ue, P) => ue + P.items.filter((F) => !za(F)).length, 0),
    0
  ) : 0, D = h ? G.map((L) => ({
    section: L.section,
    groups: L.groups.map((re) => ({ ...re, rejected: !1, items: re.items.filter(za) })).filter((re) => re.items.length > 0)
  })).filter((L) => L.groups.length > 0) : G, X = D.length > 0, Z = !X && E > 0, ee = (L, re) => {
    i(L, re), g(!1), p("");
  }, le = S === "tables" ? "All related tables" : ((ye = r.views.find((L) => L.name === S)) == null ? void 0 : ye.title) ?? ((fe = pt(u, S)) == null ? void 0 : fe.title) ?? S, me = r.viewLocked ? r.views.filter((L) => L.name === r.viewLocked) : [], ce = h ? E > 0 ? `Only compatible fields — ${E} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ C(We, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: c }),
    /* @__PURE__ */ C(Ke, { align: a, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ C("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ C("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(ss, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: d,
              onChange: (L) => p(L.target.value),
              placeholder: m ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            "aria-pressed": h,
            "aria-label": ce,
            title: ce,
            onClick: () => v(!h),
            className: A("cv-picker-compat", h && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(su, { className: "cv-ec-icon" }),
              h && E > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: E }) : null
            ]
          }
        ),
        me.length > 0 ? /* @__PURE__ */ l(
          nb,
          {
            browse: S,
            label: le,
            views: me,
            onBrowse: x
          }
        ) : null
      ] }),
      S === "tables" && r.sourceCube ? /* @__PURE__ */ C("div", { className: "cv-picker-anchor", children: [
        "Reading from ",
        /* @__PURE__ */ l("strong", { children: r.sourceCube.title }),
        r.sourceCube.grain ? ` (${r.sourceCube.grain})` : "",
        " · joined tables included"
      ] }) : null,
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: X ? D.map(({ section: L, groups: re }, ue) => {
        const P = re.reduce((Y, te) => Y + te.items.length, 0), F = L.tag === "related", N = k[L.cube.name] ?? F, $ = H.length > 0 ? !0 : !N, j = ue > 0 ? D[ue - 1].section : void 0, q = L.tag === "related" && L.heading !== void 0 && ((j == null ? void 0 : j.tag) !== "related" || j.heading !== L.heading);
        return /* @__PURE__ */ C("div", { children: [
          q ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: L.heading }) : null,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => _((Y) => ({ ...Y, [L.cube.name]: !N })),
              className: "cv-picker-table",
              children: [
                $ ? /* @__PURE__ */ l(St, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(yr, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(us, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: L.cube.title }),
                L.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: L.cube.grain }) : null,
                L.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : L.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: P })
              ]
            }
          ),
          $ ? re.map((Y) => /* @__PURE__ */ C(
            "div",
            {
              className: A(
                "cv-picker-group",
                Y.rejected && "cv-picker-group--rejected"
              ),
              children: [
                re.length > 1 ? /* @__PURE__ */ C("div", { className: "cv-picker-group-header", children: [
                  Y.headerIcon,
                  Y.label,
                  Y.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                _y(Y.items).map((te) => {
                  const Ne = te.familyKey ? R[te.familyKey] : void 0, we = te.variants.findIndex(($e) => $e.option.name === Ne), Q = we >= 0 ? we : te.defaultIndex, { option: ae, kind: ge, reason: ze } = te.variants[Q], Je = te.familyKey ? {
                    options: te.variants.map(($e, xt) => {
                      const pe = pt(u, $e.option.cube), Ye = Ei($e.option);
                      return {
                        label: tc($e.option, pe),
                        selected: xt === Q,
                        disabled: $e.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: $e.reason ?? (Ye ? Di(pe) : void 0),
                        divider: Ye && xt > 0,
                        onSelect: () => {
                          M((He) => ({ ...He, [te.familyKey]: $e.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    rb,
                    {
                      option: ae,
                      label: te.familyKey ? te.label : void 0,
                      unitBadge: $i(ae, I),
                      badge: ge === "time" && Un(ae) ? "default" : void 0,
                      reason: ze,
                      agg: Je,
                      onPick: () => ee(ae.name, ge)
                    },
                    te.familyKey ?? ae.name
                  );
                })
              ]
            },
            Y.key
          )) : null
        ] }, L.cube.name);
      }) : Z ? /* @__PURE__ */ C("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ C("p", { children: [
          E,
          " ",
          H ? "matching " : "",
          "field",
          E === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          E === 1 ? "it" : "them",
          "."
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "cv-picker-show-all",
            onClick: () => v(!1),
            children: "Show all fields"
          }
        )
      ] }) : /* @__PURE__ */ l("p", { className: "cv-picker-empty", children: m ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function nb({ browse: e, label: t, views: n, onBrowse: r }) {
  const [o, i] = y.useState(!1), a = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ C(We, { open: o, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ue,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(ds, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ C(Ke, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Ga, { active: e === "tables", icon: /* @__PURE__ */ l(us, { className: "cv-ec-icon" }), onClick: () => a("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          Ga,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(ms, { className: "cv-ec-icon" }),
            onClick: () => a(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Ga({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ C(
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
        e ? /* @__PURE__ */ l(an, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function rb({ option: e, label: t, reason: n, onPick: r, unitBadge: o, badge: i, agg: a }) {
  const s = o ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: o }) : null, c = t ?? e.label, u = a ? /* @__PURE__ */ l(ec, { options: a.options }) : null, m = n ? /* @__PURE__ */ C(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: n,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ C("span", { className: "cv-picker-row-main", children: [
          s,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: c })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: n })
      ]
    }
  ) : /* @__PURE__ */ C(
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
  return u ? /* @__PURE__ */ C("span", { className: "cv-picker-rowwrap", children: [
    m,
    u
  ] }) : m;
}
const ob = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], yn = "yyyy-MM-dd";
function ib(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ja(e) {
  if (!e) return;
  const t = os(e, yn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Hi({ value: e, onChange: t }) {
  const [n, r] = y.useState(!1), o = typeof e == "string", [i, a] = ib(e), s = ja(i), c = ja(a), u = s ? { from: s, to: c } : void 0, m = o ? e : s && c ? `${ke(s, "MMM d, yyyy")} – ${ke(c, "MMM d, yyyy")}` : s ? ke(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ C(We, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(ne, { variant: "outline", size: "sm", className: A("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(cs, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: A("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ C(Ke, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ C("div", { className: "cv-daterange-presets", children: [
        ob.map((f) => /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "sm",
            className: A("cv-daterange-preset", e === f && "cv-daterange-preset--active"),
            onClick: () => {
              t(f), r(!1);
            },
            children: f
          },
          f
        )),
        /* @__PURE__ */ l(
          ne,
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
        wl,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([ke(f.from, yn), ke(f.to, yn)]) : f != null && f.from ? t([ke(f.from, yn), ke(f.from, yn)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const sc = y.createContext({});
function ab({
  createVariable: e,
  children: t
}) {
  const n = y.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(sc.Provider, { value: n, children: t });
}
function sb() {
  return y.useContext(sc);
}
function lb({ kind: e, value: t, onChange: n, className: r }) {
  const o = Pn(), i = (o == null ? void 0 : o.decls) ?? [], { createVariable: a } = sb(), [s, c] = y.useState(!1), [u, m] = y.useState(!1), [f, g] = y.useState(""), d = y.useMemo(() => uy(i, e), [i, e]), p = d.find((w) => w.name === t), h = (w) => {
    n(w), c(!1), m(!1);
  }, v = () => {
    if (!a) return;
    const w = fy(e, f || "Variable", i);
    a(w), h(w.name), g("");
  };
  return /* @__PURE__ */ C(
    We,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(ne, { variant: "outline", size: "sm", className: A("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(uu, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: A("cv-var-trigger-label", !p && "cv-var-trigger-label--placeholder"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ C(Ke, { align: "start", className: "cv-var-popover", children: [
          d.length > 0 ? d.map((w) => /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => h(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(an, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          a ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ C("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              be,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: f,
                onChange: (w) => g(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && v(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(ne, { size: "sm", className: "cv-var-new-add", onClick: v, children: "Add" })
          ] }) : /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(Vt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function rn({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: o
}) {
  const i = _e(t), [a, s] = y.useState(i ? "var" : "fixed");
  y.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => A("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ C("div", { className: "cv-bind", ...o ? { role: "group", "aria-labelledby": o } : {}, children: [
    /* @__PURE__ */ C("div", { className: "cv-bind-toggle", children: [
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
      lb,
      {
        kind: e,
        value: _e(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(_e(t) ? void 0 : t, (u) => n(u))
  ] });
}
const cb = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function ro(e) {
  return "member" in e && "operator" in e;
}
function ub({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: o,
  disabled: i,
  className: a
}) {
  var I;
  const { meta: s } = Nt(), c = ((I = Pn()) == null ? void 0 : I.decls) ?? [], [u, m] = y.useState(null), [f, g] = y.useState(null), d = r ?? [], p = d.length === 1 && !ro(d[0]) && "or" in d[0] && Array.isArray(d[0].or) && d[0].or.every(ro) ? d[0] : void 0, h = p ? "any" : "all", v = [], w = [];
  p || d.forEach((T) => ro(T) ? v.push(T) : w.push(T));
  const S = p ? p.or : v, x = w.length === 0 && (S.length >= 2 || h === "any"), k = (T) => h === "any" ? T.length ? [{ or: T }] : [] : [...T, ...w], _ = (T) => {
    const z = T.filter((G) => G.member.length > 0), O = k(z);
    o(O.length > 0 ? O : void 0);
  }, R = (T) => {
    const z = T === "any" ? S.length ? [{ or: S }] : [] : [...S];
    o(z.length > 0 ? z : void 0);
  }, M = (T, z) => _(S.map((O, G) => G === T ? { ...O, ...z } : O)), V = (T) => _(S.filter((z, O) => O !== T)), H = (T) => {
    const O = { ...f ?? { member: "", operator: "equals", values: [] }, ...T };
    O.member ? (g(null), m(S.length), _([...S, O])) : g(O);
  };
  return /* @__PURE__ */ C("div", { "data-slot": "filter-builder", className: A("cv-filter-builder", a), children: [
    S.length === 0 && !f ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    x ? /* @__PURE__ */ C("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Xt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: h,
          onChange: R
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    S.map((T, z) => {
      const O = De(s, T.member);
      return u === z ? /* @__PURE__ */ l(
        Ba,
        {
          leaf: T,
          member: O,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (G) => M(z, G),
          onDone: () => m(null),
          onRemove: () => V(z)
        },
        z
      ) : /* @__PURE__ */ l(
        db,
        {
          text: mb(T, O == null ? void 0 : O.label, c),
          disabled: i,
          onEdit: () => m(z),
          onRemove: () => V(z)
        },
        z
      );
    }),
    f ? /* @__PURE__ */ l(
      Ba,
      {
        leaf: f,
        member: De(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: H,
        onRemove: () => g(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ C("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ C(
      ne,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!f,
        onClick: () => {
          m(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Vt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function db({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ C("div", { className: "cv-filter-summary", children: [
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
      ne,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(sn, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function Ba({
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
  const { meta: u } = Nt(), m = Va(t == null ? void 0 : t.type), f = m.includes(e.operator) ? e.operator : m[0], g = !To.has(f), d = y.useId(), p = y.useId(), h = y.useId(), v = y.useId(), w = y.useId(), S = y.useId();
  y.useEffect(() => {
    f !== e.operator && a({ operator: f });
  }, [e.operator, a, f]);
  const x = (k) => {
    const _ = De(u, k);
    a({ member: k, operator: Va(_ == null ? void 0 : _.type)[0], values: [] });
  };
  return /* @__PURE__ */ C("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ C("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ C("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ C(ne, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(an, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(sn, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: d, className: "cv-ec-label", children: "Field" }),
      o ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          zi,
          {
            well: cb,
            placed: [],
            scope: o,
            blockReason: () => {
            },
            onSelect: x,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                id: p,
                disabled: i,
                "aria-labelledby": `${d} ${p}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ C("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(Do, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(St, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        nc,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: x,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ C(
        Ge,
        {
          value: f,
          onValueChange: (k) => a({
            operator: k,
            values: To.has(k) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              Be,
              {
                id: v,
                "aria-labelledby": `${h} ${v}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(je, {})
              }
            ),
            /* @__PURE__ */ l(qe, { children: m.map((k) => /* @__PURE__ */ l(Re, { value: k, children: jl[k] }, k)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: S, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        fb,
        {
          fieldId: S,
          labelId: w,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (k) => a({ values: k })
        }
      )
    ] }) : null
  ] });
}
function mb(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const o = jl[e.operator] ?? e.operator;
  if (To.has(e.operator)) return `${r} ${o}`;
  const i = (e.values ?? []).map((a) => {
    if (_e(a)) {
      const s = n.find((c) => c.name === a.var);
      return `{${((s == null ? void 0 : s.label) ?? a.var).replace(/[{}]/g, "")}}`;
    }
    return String(a);
  });
  return i.length > 0 ? `${r} ${o} ${i.join(", ")}` : `${r} ${o} …`;
}
function fb({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: o
}) {
  const i = e ?? [], a = i.length === 1 && _e(i[0]);
  if (t === "time") {
    const u = a ? i[0] : pb(i);
    return /* @__PURE__ */ l(
      rn,
      {
        labelId: o,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : _e(m) ? [m] : hb(m)),
        renderFixed: (m, f) => /* @__PURE__ */ l(Hi, { value: m, onChange: f })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? i[0] : i.filter((u) => !_e(u));
  return /* @__PURE__ */ l(
    rn,
    {
      labelId: o,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : _e(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(gb, { id: r, values: u, onChange: m })
    }
  );
}
function gb({
  id: e,
  values: t,
  onChange: n
}) {
  const { text: r, onText: o, onBlur: i } = Li({
    value: (t ?? []).map(String),
    parse: vb,
    format: yb,
    onChange: n
  });
  return /* @__PURE__ */ l(
    be,
    {
      id: e,
      value: r,
      onChange: (a) => o(a.target.value),
      onBlur: i,
      placeholder: "value, value…",
      className: "cv-ec-h8"
    }
  );
}
function pb(e) {
  const t = e.filter((n) => !_e(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function hb(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function vb(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function yb(e) {
  return e.join(", ");
}
function bb({ spec: e, update: t, cube: n, scopeCubes: r, scope: o }) {
  const { query: i } = e, a = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ C(We, { children: [
    /* @__PURE__ */ C(
      Ue,
      {
        className: A(
          "cv-filters-trigger",
          a > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(du, { className: "cv-ec-icon--lg" }),
          "Filter",
          a > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: a }) : null
        ]
      }
    ),
    /* @__PURE__ */ C(Ke, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ C("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(wb, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(ub, { cube: n, cubes: r, scope: o, value: i.filters, onChange: s })
    ] })
  ] });
}
function wb({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Nt(), o = Fy(r, n);
  if (o.length === 0) return null;
  const i = new Set(e.query.segments ?? []), a = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ C("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: o.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => a(s.name),
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
function Cb(e, t, n, r) {
  var i;
  const o = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...o, ...r } } } });
}
function Sb({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: o
}) {
  var f;
  const i = ((f = e.chart.axes) == null ? void 0 : f[n]) ?? {}, a = i.label ?? o ?? "", s = i.label === "", c = y.useId(), u = y.useId(), m = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ C("div", { className: A("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": m },
        value: a,
        placeholder: "No title",
        onChange: (g) => Cb(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function kb({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ C("div", { className: A("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(mu, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(fu, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const lc = y.forwardRef(
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
lc.displayName = "Label";
function ve({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: o,
  className: i,
  children: a
}) {
  return /* @__PURE__ */ C("div", { "data-slot": "field-row", className: A("cv-field-row", i), children: [
    /* @__PURE__ */ C("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(lc, { htmlFor: r, className: "cv-field-row-label", children: e }),
      o ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: o }) : null
    ] }),
    a,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Vo({
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
      className: A("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function wt({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: o,
  className: i
}) {
  const a = y.useId();
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "switch-row",
      className: A("cv-switch-row", i),
      children: [
        /* @__PURE__ */ C(
          "label",
          {
            htmlFor: a,
            className: A("cv-switch-row-label", o && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(Vo, { id: a, checked: n, onChange: r, disabled: o })
      ]
    }
  );
}
const Rb = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, Nb = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function xb({ spec: e, update: t }) {
  var w, S, x;
  const n = Rt(), { chart: r } = e, o = r.family, i = r.familyOptions ?? {}, a = n.require(o);
  if (a.Customize) {
    const k = a.Customize;
    return /* @__PURE__ */ l(k, { spec: e, update: t });
  }
  const s = (k) => t({ ...e, chart: { ...r, ...k } }), c = (k) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...k } } }), u = ((S = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : S.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (o === "area" ? u : n.defaults(o).envelope.stackMode) ?? "none", f = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", g = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", d = bi(a) ? /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ C(
          Ge,
          {
            value: g,
            onValueChange: (k) => {
              var _;
              return s({
                transform: k === "none" ? void 0 : k === "rollingAvg" ? { kind: "rollingAvg", window: ((_ = r.transform) == null ? void 0 : _.window) ?? rr } : { kind: k }
              });
            },
            children: [
              /* @__PURE__ */ l(Be, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(je, {}) }),
              /* @__PURE__ */ l(qe, { children: Nb.map((k) => /* @__PURE__ */ l(Re, { value: k, children: Rb[k] }, k)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(Ob, { label: "Window (points)", children: (k) => {
      var _;
      return /* @__PURE__ */ l(
        $b,
        {
          id: k,
          value: ((_ = r.transform) == null ? void 0 : _.window) ?? rr,
          onChange: (R) => s({ transform: { kind: "rollingAvg", window: R } })
        }
      );
    } }) : null
  ] }) : null, p = /* @__PURE__ */ l(ve, { label: "Line shape", children: /* @__PURE__ */ l(
    Xt,
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
  ) }), h = /* @__PURE__ */ l(ve, { label: "Stacked", children: /* @__PURE__ */ l(
    Xt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: f,
      onChange: (k) => s({ stackMode: k })
    }
  ) }), v = (() => {
    var k, _;
    switch (o) {
      case "bar":
        return /* @__PURE__ */ C(Ce, { children: [
          /* @__PURE__ */ l(
            wt,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (R) => s({ orientation: R ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return p;
      case "area":
        return /* @__PURE__ */ C(Ce, { children: [
          p,
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((_ = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : _.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ C(Ce, { children: [
          /* @__PURE__ */ l(
            wt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (R) => c({ innerRadiusPct: R ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ve, { label: "Slice labels", children: /* @__PURE__ */ l(
            Xt,
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
  return /* @__PURE__ */ C("div", { className: "cv-customize", children: [
    v,
    d
  ] });
}
function _b(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || bi(n);
}
const cc = 2, uc = 90;
function Mb(e) {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? Math.min(uc, Math.max(cc, t)) : rr;
}
function Fb(e) {
  return String(e);
}
function $b({
  id: e,
  value: t,
  onChange: n
}) {
  const { text: r, onText: o, onBlur: i } = Li({
    value: t,
    parse: Mb,
    format: Fb,
    onChange: n
  });
  return /* @__PURE__ */ l(
    be,
    {
      id: e,
      type: "number",
      min: cc,
      max: uc,
      className: "cv-ec-h8 cv-transform-window",
      value: r,
      onChange: (a) => o(a.target.value),
      onBlur: i
    }
  );
}
function Ob({
  label: e,
  children: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ C("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function dc(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function mc(e, t) {
  const n = [...t], r = [], o = [];
  for (const i of e) {
    if (!tt(i)) continue;
    const a = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < a; )
      Fe(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || o.push(i);
  }
  return { matched: r, missing: o, leftover: n };
}
function Ab(e) {
  let t = 0;
  for (const n of e)
    tt(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Ib(e, t) {
  return e.some((n) => tt(n) && n.cardinality === "many" && Fe(n, t));
}
const Tb = 0.35, Pb = 0.4, Eb = 0.3, Db = 0.1;
function Lb(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Eb : e.supportsCartesianAxes ? Db : e.wells.some(
    (o) => tt(o) && o.channel === "x" && Fe(o, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function fc(e) {
  const t = e.filter(tt);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Vb(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const zb = (e, t, n) => e === 1 ? t : n;
function Hb(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Vb(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const o = n.get("x") ?? [], i = n.get("y") ?? [], a = `${r} ${zb(r, "measure", "measures")}`;
  return fc(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : o.includes("number") && i.includes("number") ? "One measure against another" : o.includes("time") ? `${a} over time` : o.includes("category") ? n.has("color") ? `${a} by category, split in colours` : `${a} by category` : r === 1 ? "One headline number" : r > 1 ? `${a}, no breakdown` : "Fits your fields";
}
function Gb(e, t) {
  const n = dc(t), r = n.map((a) => a.kind), o = r.includes("time"), i = [];
  for (const a of e.list()) {
    if (a.queryless) continue;
    const s = a.wells, c = mc(s, n), u = Ab(s), m = Math.max(0, n.length - c.matched.length), f = zy(s, r) + 0.5 * m, g = u > 0 ? f / u : 0, d = c.leftover.filter(
      (h) => h.kind !== "time" && !Ib(s, h.kind)
    ).length, p = g - Tb * d + Lb(a, o) - (fc(s) ? Pb : 0);
    i.push({
      family: a.family,
      descriptor: a,
      score: Math.round(p * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Hb(a, c)
    });
  }
  return i.sort((a, s) => s.score - a.score || a.descriptor.order - s.descriptor.order);
}
function jb(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Bb(e, t, n) {
  const r = e.require(n), o = mc(r.wells, dc(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const a of o.matched)
    a.members.forEach((s, c) => {
      i = qt(i, n, a.well.id, s, a.kinds[c], e);
    });
  return i;
}
function gc(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Gy(e, r, n));
  };
}
function qb({ spec: e, update: t, empty: n }) {
  const r = Rt(), o = e.chart.family, i = gc(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ C("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(pc, { spec: e, family: o, onPick: i, families: r })
  ] }) }) : null;
}
function Wb({ spec: e, update: t }) {
  const n = Rt(), r = e.chart.family, o = gc(e, t, n), i = n.require(r), a = i.icon;
  return /* @__PURE__ */ C(We, { children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(a, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(St, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ C(Ke, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(pc, { spec: e, family: r, onPick: o, families: n }),
      _b(r, n) ? /* @__PURE__ */ C("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(xb, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function pc({ spec: e, family: t, onPick: n, families: r }) {
  const o = y.useMemo(() => Gb(r, e), [r, e]), i = y.useMemo(() => jb(o), [o]), a = y.useMemo(
    () => new Map(o.map((f) => [f.family, f])),
    [o]
  ), s = y.useMemo(
    () => new Set(o.filter((f) => f.fits).map((f) => f.family)),
    [o]
  ), c = Qb(e, r, s), u = (f, g) => /* @__PURE__ */ l(
    Ub,
    {
      fit: f,
      active: f.family === t,
      preview: c.get(f.family),
      families: r,
      reason: g ? f.reason : void 0,
      onPick: n
    },
    f.family
  ), m = r.list().map(
    (f) => a.get(f.family) ?? {
      family: f.family,
      descriptor: f,
      score: 0,
      fits: !1,
      reason: f.label
    }
  );
  return /* @__PURE__ */ C("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ C("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((f) => u(f, !0)) })
    ] }) : null,
    /* @__PURE__ */ C("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: m.map((f) => u(f, !1)) })
    ] })
  ] });
}
function Ub({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: o,
  onPick: i
}) {
  const a = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ C(
    "div",
    {
      className: A("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          i0,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(a, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(a, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ C("span", { className: "cv-type-tile-caption", children: [
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
function hc(e, t) {
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
function Kb(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((o) => o.granularity !== void 0)) ?? !1);
}
const qa = 200, Yb = () => () => {
};
function Qb(e, t, n) {
  const r = e.query, o = Kb(r), i = y.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, qa) : qa
    };
  }, [r]), a = Pn(), s = y.useRef(null);
  s.current === null && (s.current = dl());
  const c = s.current, u = () => a ? c(i, a.store.getAll(), a.decls) : i, m = y.useSyncExternalStore(
    a ? a.store.subscribe : Yb,
    u,
    u
  ), { resultSet: f } = hl(m, { skip: !o });
  return y.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const d of t.list()) {
      const p = d.family;
      if (d.queryless || o && n.has(p) && !f) continue;
      const w = (f && n.has(p) ? Xb(e, p, t, f, m) : void 0) ?? o0(p, t);
      w && g.set(p, w);
    }
    return g;
  }, [e, t, f, m, n, o]);
}
function Xb(e, t, n, r, o) {
  try {
    const i = t === e.chart.family ? e : Bb(n, e, t), a = hc(i.chart, n), s = sl(r, a, i.query ?? o, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(o)}`, data: s, options: a };
  } catch {
    return;
  }
}
const Gt = "sample.category", An = "sample.group", Ie = "sample.value", Qe = "sample.count", vc = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], zo = [18, 27, 21, 34, 26, 39], Ho = [12, 9, 17, 14, 22, 16], Jb = vc.flatMap((e, t) => [
  { [Gt]: e, [An]: "North", [Ie]: zo[t], [Qe]: Ho[t] },
  {
    [Gt]: e,
    [An]: "South",
    [Ie]: Math.round(zo[t] * 0.62),
    [Qe]: Math.round(Ho[t] * 0.78)
  }
]), Zb = {
  measures: [Ie, Qe],
  dimensions: [Gt, An]
}, e0 = {
  measures: {
    [Ie]: { title: "Value", shortTitle: "Value", type: "number" },
    [Qe]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [Gt]: { title: "Day", shortTitle: "Day", type: "string" },
    [An]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function yc(e) {
  const t = [
    { key: Ie, label: "Value", data: zo, colorToken: "chart-1" },
    { key: Qe, label: "Count", data: Ho, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: vc,
    series: t,
    raw: { rows: Jb, query: Zb, annotation: e0 },
    empty: !1
  };
}
const t0 = yc(1), n0 = yc(2), bn = (e, t) => ({
  family: e,
  mapping: { category: { member: Gt }, series: { mode: "measures", members: t } }
}), r0 = {
  bar: bn("bar", [Ie, Qe]),
  line: bn("line", [Ie, Qe]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: bn("area", [Ie, Qe]),
  pie: bn("pie", [Ie]),
  scatter: { family: "scatter", familyOptions: { x: Ie, y: Qe } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: Gt },
      series: { mode: "pivot", value: Ie, pivot: An }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ie, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: Gt }, { member: Ie }, { member: Qe }] }
  }
};
function o0(e, t) {
  const n = r0[e] ?? bn(e, [Ie, Qe]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? t0 : n0,
    options: hc(n, t)
  };
}
const i0 = y.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const o = y.useRef(null);
  return y.useEffect(() => {
    const i = o.current;
    if (i)
      for (const a of i.querySelectorAll("[tabindex]")) a.tabIndex = -1;
  }), /* @__PURE__ */ l(a0, { fallback: r, children: /* @__PURE__ */ l("div", { ref: o, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    il,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class a0 extends y.Component {
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
function s0(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function l0(e, t, n, r, o, i) {
  var q, Y, te, Ne, we;
  const { chart: a, query: s } = e, c = a.family, u = n.kinds.length === 1 ? n.kinds[0] : c0(o), m = a.familyOptions ?? {}, f = Array.isArray(m.columns) ? m.columns : [], g = Kl(a), d = g[r], p = c === "table" && n.id === "columns", h = c === "bar" || c === "line" || c === "area", v = ((Y = (q = a.mapping) == null ? void 0 : q.series) == null ? void 0 : Y.mode) === "measures", w = h && n.id === "y", S = w && v, x = p ? (te = f.find((Q) => Q.member === r)) == null ? void 0 : te.label : S ? d == null ? void 0 : d.label : void 0, k = S ? d == null ? void 0 : d.colorToken : void 0, _ = Dn(s), R = n.kinds.includes("time") && (_ == null ? void 0 : _.dimension) === r, M = R ? _ == null ? void 0 : _.granularity : void 0, V = R ? _ == null ? void 0 : _.dateRange : void 0, H = (c === "line" || c === "area") && n.id === "y" && v, I = H ? d == null ? void 0 : d.dots : void 0, T = (Q) => {
    var Je, $e;
    if ((Je = a.mapping) != null && Je.series && a.mapping.series.mode !== "measures") return;
    const ae = (($e = a.mapping) != null && $e.series && a.mapping.series.mode === "measures" ? a.mapping.series.members : s.measures) ?? [], ge = { ...g };
    Q && Object.keys(Q).length > 0 ? ge[r] = Q : delete ge[r];
    const ze = En(a);
    ze && t({
      ...e,
      chart: {
        ...a,
        mapping: { category: { member: ze }, series: Yl(ae, ge) }
      }
    });
  }, z = (Q) => {
    const ae = f.map((ge) => ge.member === r ? { ...ge, ...Q } : ge);
    t({ ...e, chart: { ...a, familyOptions: { ...m, columns: ae } } });
  }, O = (Q) => {
    p ? z({ label: Q }) : S && T({ ...d, label: Q });
  }, G = (Q) => {
    S && T({ ...d, colorToken: Q ?? void 0 });
  }, E = (Q) => {
    if (!_) return;
    const ae = { ..._ };
    for (const ge of Object.keys(Q)) {
      const ze = Q[ge];
      ze === void 0 ? delete ae[ge] : ae[ge] = ze;
    }
    t({ ...e, query: { ...s, timeDimensions: [ae] } });
  }, D = (Q) => E({ granularity: Q }), X = (Q) => E({ dateRange: Q }), Z = (Q) => {
    S && T({ ...d, dots: Q });
  }, ee = () => t(Jl(e, c, n.id, r, i)), le = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), me = (Ne = a.mapping) == null ? void 0 : Ne.series, ce = (me && me.mode === "pivot" ? me.value : Po(a)[0]) ?? ((we = s.measures) == null ? void 0 : we[0]), ye = le ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...ce ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...ce ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], fe = (() => {
    const Q = s0(s.order)[0];
    if (!Q) return "none";
    const [ae, ge] = Q;
    return ce && ae === ce ? ge === "desc" ? "value-desc" : "value-asc" : ae === r ? u === "time" ? ge === "desc" ? "time-desc" : "time-asc" : ge === "asc" ? "label-asc" : "label-desc" : "none";
  })(), L = (Q) => {
    let ae;
    switch (Q) {
      case "none":
        ae = void 0;
        break;
      case "value-desc":
        ae = ce ? [[ce, "desc"]] : void 0;
        break;
      case "value-asc":
        ae = ce ? [[ce, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ae = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ae = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ae } });
  }, re = typeof s.limit == "number" ? s.limit : void 0, ue = (Q) => t({ ...e, query: { ...s, limit: Q && Q > 0 ? Q : void 0 } }), F = (c === "bar" || c === "line" || c === "area") && R, N = F && m.comparePrevious === !0;
  return {
    kind: u,
    label: x,
    colorToken: k,
    granularity: M,
    dateRange: V,
    dots: I,
    canPoints: H,
    canRename: p || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && v,
    isTimeField: R,
    isCategoryField: le,
    sortValue: fe,
    sortOptions: ye,
    onSort: L,
    limit: re,
    onLimit: ue,
    canComparePrevious: F,
    comparePrevious: N,
    comparePreviousReady: F && V !== void 0,
    onComparePrevious: (Q) => t({ ...e, chart: { ...a, familyOptions: { ...m, comparePrevious: Q || void 0 } } }),
    onRename: O,
    onRecolor: G,
    onGranularity: D,
    onDateRange: X,
    onDots: Z,
    onRemove: ee
  };
}
function c0(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Go(e, t, n, r) {
  var f;
  const { chart: o, query: i } = e, a = o.family, s = (g) => {
    if (r < 0 || r >= g.length || n === r) return g;
    const d = g.slice(), [p] = d.splice(n, 1);
    return d.splice(r, 0, p), d;
  };
  if (a === "table" && t.id === "columns") {
    const g = o.familyOptions ?? {}, d = s(Array.isArray(g.columns) ? g.columns : []);
    return { ...e, chart: { ...o, familyOptions: { ...g, columns: d } } };
  }
  const c = s(i.measures ?? []), u = (f = o.mapping) == null ? void 0 : f.series;
  let m = o.mapping;
  if (u && u.mode === "measures")
    m = { ...o.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const g = s(u.values);
    m = { ...o.mapping, series: { ...u, value: g[0], values: g } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...o, mapping: m } };
}
function u0(e, t) {
  return e.allowedCubes.includes(t);
}
function d0(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const o = e.get(r.shift());
    for (const i of (o == null ? void 0 : o.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function bc(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function jo(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = d0(e, n);
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
function m0(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    jo(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function Wa(e, t, n, r) {
  var k;
  const o = Er(e), i = o.filter((_) => _.type === "view"), a = xn(t, r), s = Object.values(a).flat();
  let c;
  for (const _ of s) {
    const R = De(e, _);
    if (R) {
      c = R;
      break;
    }
  }
  const u = !c && n ? pt(e, n) : void 0, m = c ? pt(e, c.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, g = t.query.measures ?? [], d = g.length ? Wt(g[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: i, measureSource: d, allowedCubes: [f] };
  const p = d ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), h = p ? pt(e, p) : void 0, v = bc(o), w = /* @__PURE__ */ new Set();
  for (const _ of s) {
    const R = (k = De(e, _)) == null ? void 0 : k.cube;
    R && v.has(R) && w.add(R);
  }
  d && v.has(d) && w.add(d), !w.size && p && v.has(p) && w.add(p);
  const S = m0(v, w), x = S.filter((_) => _ !== p).map((_) => v.get(_)).sort((_, R) => _.title.localeCompare(R.title));
  return {
    sourceCube: (h == null ? void 0 : h.type) === "cube" ? h : void 0,
    relatedCubes: x,
    views: i,
    measureSource: d,
    allowedCubes: S
  };
}
function f0(e, t, n) {
  if (!t) return e;
  const r = bc(Er(t)), o = e.query ?? {}, i = new Set(Object.values(xn(e, n)).flat()), a = (h) => {
    const v = Wt(h);
    return v !== void 0 && r.has(v) ? v : void 0;
  }, s = /* @__PURE__ */ new Set();
  for (const h of [...o.measures ?? [], ...o.dimensions ?? []]) {
    const v = a(h);
    v && s.add(v);
  }
  const c = o.timeDimensions ?? [];
  for (const h of c) {
    const v = a(h.dimension);
    v && s.add(v);
  }
  if (jo(r, s)) return e;
  const u = (o.measures ?? []).map(a).find((h) => h !== void 0) ?? [...i].map((h) => {
    var v;
    return (v = De(t, h)) == null ? void 0 : v.cube;
  }).find((h) => h !== void 0 && r.has(h));
  if (!u) return e;
  const m = /* @__PURE__ */ new Set([u]), f = (h) => jo(r, /* @__PURE__ */ new Set([...m, h])) && (m.add(h), !0), g = [];
  for (const h of c) {
    const v = a(h.dimension);
    if (v && f(v)) {
      g.push(h);
      continue;
    }
    if (i.has(h.dimension))
      g.push(h);
    else {
      const w = Vl(t, u);
      w && !g.some((S) => S.dimension === w.name) && g.push({ ...h, dimension: w.name });
    }
  }
  const d = (h) => {
    if (i.has(h)) return !0;
    const v = a(h);
    return v !== void 0 && f(v);
  }, p = {
    ...o,
    measures: (o.measures ?? []).filter(d),
    dimensions: (o.dimensions ?? []).filter(d),
    timeDimensions: g
  };
  return { ...e, query: p };
}
class Dr extends y.Component {
  constructor() {
    super(...arguments);
    Lr(this, "state", { error: null, resetKey: this.props.resetKey });
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
    return n ? /* @__PURE__ */ C("div", { className: "cv-ed-broken", role: "alert", children: [
      /* @__PURE__ */ l(gu, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
      /* @__PURE__ */ C("div", { children: [
        /* @__PURE__ */ C("strong", { className: "cv-ed-broken-title", children: [
          this.props.label,
          " couldn’t be shown"
        ] }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-msg", children: n.message }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-hint", children: "The rest of the chart is still editable — undo the last change to this control, or clear the value it holds." })
      ] })
    ] }) : this.props.children;
  }
}
const g0 = vt.options;
function p0({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: o
}) {
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: A("cv-color-picker", o),
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
        g0.map((i) => {
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
              className: A(
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
function h0({
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
  const u = Rt(), m = Ir(), f = l0(e, t, n, r, o, u), g = y.useId(), d = y.useId(), p = y.useId(), h = y.useId(), v = y.useId(), w = y.useId(), S = (o == null ? void 0 : o.label) ?? r, x = f.label || S, k = f.canColor && i !== void 0, _ = f.canRename || k || f.isTimeField || f.isCategoryField || f.canPoints || s !== void 0, R = (I) => {
    const T = I.trim();
    f.onRename(T.length > 0 ? T : void 0);
  }, M = (I) => {
    !a || !I.altKey || (I.key === "ArrowUp" && a.index > 0 ? (I.preventDefault(), a.onMove(-1)) : I.key === "ArrowDown" && a.index < a.total - 1 && (I.preventDefault(), a.onMove(1)));
  }, V = /* @__PURE__ */ C(Ce, { children: [
    a ? /* @__PURE__ */ l(pu, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
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
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: $i(o, m) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: x })
  ] }), H = a ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "field-pill",
      className: A("cv-field-pill", (a == null ? void 0 : a.dragging) && "cv-field-pill--dragging", c),
      draggable: !!a,
      onDragStart: a == null ? void 0 : a.onDragStart,
      onDragOver: a ? (I) => {
        I.preventDefault(), a.onDragOver();
      } : void 0,
      onDragEnd: a == null ? void 0 : a.onDragEnd,
      onKeyDown: a ? M : void 0,
      children: [
        _ ? /* @__PURE__ */ C(We, { children: [
          /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${x}${H}`,
              ...a ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: V
            }
          ) }),
          /* @__PURE__ */ l(Ke, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ C("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(v0, { getSwap: s, display: x }) : null,
            f.canRename ? /* @__PURE__ */ C("label", { className: "cv-ec-field", htmlFor: g, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                be,
                {
                  id: g,
                  defaultValue: f.label ?? "",
                  placeholder: S,
                  className: "cv-ec-h8",
                  onBlur: (I) => R(I.target.value),
                  onKeyDown: (I) => {
                    I.key === "Enter" && (R(I.target.value), I.target.blur());
                  }
                }
              )
            ] }) : null,
            k ? /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(p0, { value: f.colorToken, onChange: f.onRecolor })
            ] }) : null,
            f.isTimeField ? /* @__PURE__ */ C(Ce, { children: [
              /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  rn,
                  {
                    kind: "dateRange",
                    value: f.dateRange,
                    onChange: f.onDateRange,
                    renderFixed: (I, T) => /* @__PURE__ */ l(Hi, { value: I, onChange: T })
                  }
                )
              ] }),
              /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  rn,
                  {
                    kind: "granularity",
                    value: f.granularity,
                    onChange: f.onGranularity,
                    renderFixed: (I, T) => /* @__PURE__ */ l(
                      Dl,
                      {
                        value: I,
                        onChange: T,
                        allowAuto: !0,
                        autoHint: Ci(f.dateRange),
                        options: cl(f.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              f.canComparePrevious ? /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ C("label", { className: "cv-ec-row", htmlFor: v, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    Vo,
                    {
                      id: v,
                      checked: f.comparePrevious,
                      onChange: f.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                f.comparePrevious && !f.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            f.isCategoryField ? /* @__PURE__ */ C(Ce, { children: [
              /* @__PURE__ */ C("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: d, children: [
                /* @__PURE__ */ l("span", { id: p, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: d,
                    "aria-labelledby": p,
                    value: f.sortValue,
                    onChange: (I) => f.onSort(I.target.value),
                    className: "cv-field-pill-select",
                    children: f.sortOptions.map((I) => /* @__PURE__ */ l("option", { value: I.key, children: I.label }, I.key))
                  }
                )
              ] }),
              /* @__PURE__ */ C("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: h, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  be,
                  {
                    id: h,
                    type: "number",
                    min: 1,
                    defaultValue: f.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (I) => {
                      const T = I.target.value.trim();
                      f.onLimit(T === "" ? void 0 : Number(T));
                    },
                    onKeyDown: (I) => {
                      if (I.key === "Enter") {
                        const T = I.target.value.trim();
                        f.onLimit(T === "" ? void 0 : Number(T)), I.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            f.canPoints ? /* @__PURE__ */ C("label", { className: "cv-ec-row", htmlFor: w, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Vo, { id: w, checked: f.dots === !0, onChange: f.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ C(
              ne,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: f.onRemove,
                children: [
                  /* @__PURE__ */ l(uo, { className: "cv-ec-icon" }),
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
              title: `${x}${H}`,
              ...a ? {
                tabIndex: 0,
                "aria-label": `${x}, position ${a.index + 1} of ${a.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: V
            }
          )
        ),
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: f.onRemove,
            "aria-label": `Remove ${x}`,
            children: /* @__PURE__ */ l(uo, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function v0({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ C(Ce, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(ec, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
      n.hint ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: n.hint }) : null
    ] }) : null,
    /* @__PURE__ */ l(
      zi,
      {
        well: n.picker.well,
        placed: n.picker.placed,
        inWell: n.picker.inWell,
        scope: n.picker.scope,
        blockReason: n.picker.blockReason,
        onSelect: n.picker.onSelect,
        side: "right",
        align: "start",
        children: /* @__PURE__ */ C("button", { type: "button", className: "cv-field-pill-swap", title: `Swap ${t} for another field`, children: [
          /* @__PURE__ */ l(hu, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function y0({
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
  swapFor: m,
  badge: f,
  orientation: g,
  lockedSingle: d,
  disableReorder: p,
  label: h,
  note: v,
  pickerSide: w,
  pickerAlign: S,
  control: x
}) {
  const k = n.cardinality === "many" && !d, _ = k || r.length === 0, R = r.length, M = g === "vertical", V = h ?? n.label, H = k && R > 1 && !p, [I, T] = y.useState(null), z = ["number", "category", "time"].filter((E) => !Fe(n, E)).map((E) => Oi(n, E, r)).find((E) => E !== void 0) ?? n.hint, O = o.length === 0 && !n.optional && Fe(n, "number") ? "Pick a number to get started" : void 0, G = /* @__PURE__ */ l(
    zi,
    {
      well: n,
      placed: o,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: w ?? (M ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          title: z,
          className: A(
            "cv-well-add",
            M && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Vt, { className: "cv-ec-icon" }),
            r.length === 0 ? V : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "well-group",
      className: A("cv-well-group", !M && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ C("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: V }),
          f ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: f }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: x }) : null,
        /* @__PURE__ */ l(Dr, { label: V, resetKey: e, children: /* @__PURE__ */ C("div", { className: A("cv-well-fields", M ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((E, D) => /* @__PURE__ */ l(
            h0,
            {
              spec: e,
              update: t,
              well: n,
              member: E,
              option: i(E),
              resolvedColor: a(E),
              getSwap: m ? () => m(E) : void 0,
              className: M ? "cv-field-pill--full" : void 0,
              reorder: H ? {
                index: D,
                total: R,
                dragging: I === D,
                onDragStart: () => T(D),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  I === null || I === D || (t(Go(e, n, I, D)), T(D));
                },
                onDragEnd: () => T(null),
                onMove: (X) => t(Go(e, n, D, D + X))
              } : void 0
            },
            E
          )),
          _ ? G : null
        ] }) }),
        O ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: O }) : null,
        v ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: v }) : null
      ]
    }
  );
}
function oo({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ C(We, { children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ C("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(St, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Ke, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Dr, { label: e, children: n }) })
  ] });
}
function Gi(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function b0({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = Gi(e, t), o = Ul(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], a = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (f) => {
    const g = i ?? (f.dimension ? { dimension: f.dimension } : void 0);
    if (!g) return;
    const d = { ...g };
    for (const p of Object.keys(f)) {
      const h = f[p];
      h === void 0 ? delete d[p] : d[p] = h;
    }
    delete d.granularity, t({ ...e, query: { ...e.query, timeDimensions: [d] } });
  };
  return /* @__PURE__ */ C("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(_n, { label: "Time field", children: ({ id: f }) => /* @__PURE__ */ l(
      nc,
      {
        id: f,
        cube: o,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (g) => u({ dimension: g }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(_n, { label: "Date range", children: ({ labelId: f }) => /* @__PURE__ */ l(
      rn,
      {
        labelId: f,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => u({ dateRange: g }),
        renderFixed: (g, d) => /* @__PURE__ */ l(Hi, { value: g, onChange: d })
      }
    ) }) : null,
    /* @__PURE__ */ l(ve, { label: "Display", children: /* @__PURE__ */ l(
      Xt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: a,
        onChange: (f) => r({ display: f })
      }
    ) }),
    /* @__PURE__ */ l(
      wt,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (f) => r({ goodDirection: f ? "up" : "down" })
      }
    ),
    a === "gauge" ? /* @__PURE__ */ l(_n, { label: "Gauge max", children: ({ id: f }) => /* @__PURE__ */ l(
      be,
      {
        id: f,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (g) => {
          const d = parseFloat(g.target.value);
          r({ gauge: Number.isFinite(d) ? { ...s ?? {}, max: d } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function w0({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Gi(e, t), o = n.comparison, i = o !== void 0, a = y.useRef(void 0);
  o && (a.current = o);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (o == null ? void 0 : o.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ve, { label: "Compare to", children: /* @__PURE__ */ l(
      Xt,
      {
        "aria-label": "Compare to",
        size: "sm",
        options: [
          { value: "none", label: "Nothing" },
          { value: "previousPeriod", label: "Prev period" },
          { value: "value", label: "Fixed value" }
        ],
        value: c,
        onChange: (m) => r({
          comparison: m === "none" ? void 0 : (
            // Re-entering restores the config the user last had, so toggling
            // through "Nothing" is not destructive.
            { ...a.current ?? { showAsPercent: !0 }, mode: m }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ C(Ce, { children: [
      (o == null ? void 0 : o.mode) === "value" ? /* @__PURE__ */ l(_n, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        be,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (o == null ? void 0 : o.value) ?? "",
          onChange: (f) => {
            const g = parseFloat(f.target.value);
            r({ comparison: { ...o, value: Number.isFinite(g) ? g : void 0 } });
          }
        }
      ) }) : null,
      (o == null ? void 0 : o.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ C("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(as, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ C("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        wt,
        {
          label: "Show as %",
          checked: ((o == null ? void 0 : o.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...o, showAsPercent: m } })
        }
      )
    ] }) : null
  ] });
}
function C0({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Gi(e, t), o = n.sparkline, i = o !== void 0, a = o == null ? void 0 : o.granularity, s = cl((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(_n, { label: "Trend", children: ({ id: m, labelId: f }) => /* @__PURE__ */ l(
      rn,
      {
        labelId: f,
        kind: "granularity",
        value: a,
        onChange: (g) => r({
          sparkline: g === void 0 ? void 0 : { ...o, granularity: g }
        }),
        renderFixed: (g, d) => /* @__PURE__ */ l(
          Dl,
          {
            id: m,
            value: g,
            onChange: d,
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
function _n({
  label: e,
  children: t
}) {
  const n = y.useId(), r = y.useId();
  return /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function S0({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var L, re, ue;
  const { meta: o } = Nt(), i = Rt(), a = y.useCallback(
    (P) => t(f0(P, o, i)),
    [t, o, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), m = u.queryless ?? !1, f = u.enforcesAxisUnit, g = Ul(e), d = Ir(), p = y.useMemo(() => By(c, i), [c, i]), h = y.useMemo(() => xn(e, i), [e, i]), v = y.useMemo(() => new Map(p.map((P) => [P.id, P])), [p]), w = y.useMemo(
    () => Wa(o, e, void 0, i),
    [o, e, i]
  ), S = y.useMemo(() => Object.values(h).flat(), [h]), x = y.useMemo(
    () => {
      var P;
      return w.viewLocked ? [w.viewLocked] : [(P = w.sourceCube) == null ? void 0 : P.name, ...w.relatedCubes.map((F) => F.name)].filter(
        Boolean
      );
    },
    [w]
  ), k = y.useMemo(
    () => Object.values(h).every((P) => P.length === 0),
    [h]
  ), _ = y.useCallback(
    (P) => {
      const F = (P.y ?? [])[0], N = F ? De(o, F) : void 0;
      return {
        leftKey: F ? Ql(N) : void 0,
        leftLabel: F ? k0(N, d(N == null ? void 0 : N.unit)) : void 0
      };
    },
    [o, d]
  ), R = y.useMemo(() => _(h), [_, h]), M = y.useCallback(
    (P, F) => (N, $) => {
      var j;
      if ($) {
        if (!u0(P, $.cube))
          return "Clear the current fields to use a different dataset.";
        if ($.memberType === "measure" && P.measureSource && $.cube !== P.measureSource)
          return `This chart's numbers come from ${((j = P.sourceCube) == null ? void 0 : j.title) ?? P.measureSource}. Remove them to use another table.`;
        if (f && N === "y" && $.memberType === "measure")
          return Xy($, F.leftKey, F.leftLabel);
      }
    },
    [f]
  ), V = y.useMemo(
    () => M(w, R),
    [M, w, R]
  ), H = R.leftLabel, I = y.useMemo(() => {
    var F;
    const P = {};
    if (c === "bar" || c === "line" || c === "area") {
      const N = (F = s.mapping) == null ? void 0 : F.series;
      if (N && N.mode === "measures") {
        const $ = N.members.map((q) => {
          var Y, te;
          return { key: q, colorToken: (te = (Y = N.meta) == null ? void 0 : Y[q]) == null ? void 0 : te.colorToken };
        }), j = al($, s.colors);
        N.members.forEach((q, Y) => {
          P[q] = j[Y];
        });
      }
    }
    return P;
  }, [c, s.mapping, s.colors]), T = y.useCallback(
    (P, F, N) => {
      const $ = De(o, F);
      if (V(P, $)) return;
      let j = N === "geoPoint" && ($ != null && $.latMember) && $.lngMember ? qt(
        qt(e, c, "lat", $.latMember, "numberDimension", i),
        c,
        "lng",
        $.lngMember,
        "numberDimension",
        i
      ) : qt(e, c, P, F, N, i);
      const q = u.canonicalTimeWell;
      if (q && P !== q && (h[q] ?? []).length === 0) {
        const Y = Vl(o, $ == null ? void 0 : $.cube);
        Y && Y.name !== F && !V(q, Y) && (j = qt(j, c, q, Y.name, "time", i));
      }
      a(j);
    },
    [V, o, a, e, c, i, u, h]
  ), z = y.useCallback(
    (P, F) => {
      if (m) return;
      const N = v.get(P), $ = De(o, F);
      if (!N || !$) return;
      const j = (h[P] ?? []).indexOf(F), q = Jl(e, c, P, F, i), Y = xn(q, i), te = Wa(o, q, void 0, i), Ne = M(te, _(Y)), we = Y[P] ?? [], Q = Object.values(Y).flat(), ae = (pe, Ye) => {
        if (pe === F) return;
        let He = qt(q, c, P, pe, Ye, i);
        const at = (xn(He, i)[P] ?? []).indexOf(pe);
        j >= 0 && at > j && (He = Go(He, N, at, j)), a(He);
      }, ge = zl(o, $), ze = pt(o, $.cube), Je = ge.length > 1 ? {
        options: ge.map((pe, Ye) => {
          const He = pe.memberType === "measure" ? "number" : "numberDimension", Se = pe.name === F ? void 0 : rc(N, He, we, pe, (dn) => Ne(P, dn)), at = Ei(pe);
          return {
            label: tc(pe, pt(o, pe.cube)),
            selected: pe.name === F,
            disabled: Se !== void 0,
            title: Se ?? (at ? Di(ze) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: at && Ye > 0,
            onSelect: () => ae(pe.name, He)
          };
        })
      } : void 0, xt = S.filter((pe) => {
        var Ye;
        return ((Ye = De(o, pe)) == null ? void 0 : Ye.cube) === $.cube;
      }).length === 1 ? Ry($) : void 0;
      return {
        picker: {
          well: N,
          placed: Q,
          inWell: we,
          scope: te,
          blockReason: (pe) => Ne(P, pe),
          onSelect: ae
        },
        agg: Je,
        hint: Je ? Uy(ge, ze, $) : void 0,
        notice: xt
      };
    },
    [m, v, o, h, S, e, c, i, M, _, a]
  ), O = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, G = O.left.map((P) => v.get(P)).filter(Boolean), E = O.bottom.map((P) => v.get(P)).filter(Boolean), D = (L = h.color) == null ? void 0 : L[0], X = ((re = h.y) == null ? void 0 : re.length) ?? 0, Z = D && X > 1 ? `${X} values × ${((ue = De(o, D)) == null ? void 0 : ue.label) ?? "this split"} — one series per value per group.` : void 0, ee = u.hasLegend, le = (h.y ?? [])[0], me = (P) => {
    var $, j, q, Y;
    if (!P) return;
    const F = ($ = s.mapping) == null ? void 0 : $.series;
    return (F && F.mode === "measures" ? (q = (j = F.meta) == null ? void 0 : j[P]) == null ? void 0 : q.label : void 0) ?? ((Y = De(o, P)) == null ? void 0 : Y.label);
  }, ce = (P) => {
    var N, $, j, q;
    const F = (Y, te) => te ? /* @__PURE__ */ l(Sb, { spec: e, update: a, axis: Y, title: "Title", auto: me(te) }) : null;
    switch (P) {
      case "y":
        return F("y", le);
      // the single value axis
      case "x":
        return F("x", ($ = (N = s.mapping) == null ? void 0 : N.category) == null ? void 0 : $.member);
      case "sy":
        return F("y", (j = h.sy) == null ? void 0 : j[0]);
      // scatter Y axis
      case "sx":
        return F("x", (q = h.sx) == null ? void 0 : q[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ye = (P, F) => /* @__PURE__ */ l(
    y0,
    {
      spec: e,
      update: a,
      well: P,
      placed: h[P.id] ?? [],
      allPlaced: S,
      optionFor: (N) => De(o, N),
      colorFor: (N) => I[N],
      scope: w,
      blockReason: (N) => V(P.id, N),
      onAdd: (N, $) => T(P.id, N, $),
      swapFor: (N) => z(P.id, N),
      badge: P.id === "y" ? H : void 0,
      orientation: F,
      note: P.id === "color" ? Z : void 0,
      control: ce(P.id)
    },
    P.id
  ), fe = () => {
    var $;
    const P = v.get("value"), F = (h.value ?? []).length > 0, N = s.familyOptions ?? {};
    return /* @__PURE__ */ C(Ce, { children: [
      /* @__PURE__ */ C("div", { className: "cv-edit-kpi-value", children: [
        P ? ye(P, "vertical") : null,
        F ? /* @__PURE__ */ l(
          oo,
          {
            label: "Time, range & display",
            summary: N.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(b0, { spec: e, update: a })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l(
          oo,
          {
            label: "Comparison",
            summary: N.comparison === void 0 ? "None" : N.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(w0, { spec: e, update: a })
          }
        ),
        /* @__PURE__ */ l(
          oo,
          {
            label: "Trend",
            summary: gy(
              ($ = N.sparkline) == null ? void 0 : $.granularity
            ),
            children: /* @__PURE__ */ l(C0, { spec: e, update: a })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ C("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !k || m ? /* @__PURE__ */ l(Wb, { spec: e, update: a }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-actions", children: [
        S.length > 0 && w.sourceCube ? /* @__PURE__ */ C(
          "span",
          {
            className: "cv-edit-anchor",
            title: w.sourceCube.grain ?? w.sourceCube.title,
            children: [
              /* @__PURE__ */ l(ds, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: w.sourceCube.title }),
              w.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: w.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(bb, { spec: e, update: a, cube: g, scopeCubes: x, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-body", children: [
      G.length > 0 ? /* @__PURE__ */ l("div", { className: A("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? fe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        G.map((P) => ye(P, "vertical"))
      ) }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ C("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(qb, { spec: e, update: a, empty: k && !m })
        ] }),
        E.length > 0 ? /* @__PURE__ */ C("div", { className: "cv-edit-overlay-bottom", children: [
          E.map((P) => ye(P, "horizontal")),
          ee && !k ? /* @__PURE__ */ l(kb, { spec: e, update: a }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function k0(e, t) {
  const n = Xl(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function wc(e, t) {
  const n = y.useRef(e);
  y.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = y.useRef(null), o = y.useRef(null);
  y.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, o.current !== null && (n.current(...o.current), o.current = null));
    },
    []
  );
  const i = y.useCallback(
    (...s) => {
      r.current !== null && clearTimeout(r.current), o.current = s, r.current = setTimeout(() => {
        r.current = null, o.current = null, n.current(...s);
      }, t);
    },
    [t]
  ), a = y.useCallback(() => {
    r.current !== null && clearTimeout(r.current), r.current = null, o.current = null;
  }, []);
  return y.useMemo(() => Object.assign(i, { cancel: a }), [i, a]);
}
function io(e) {
  const t = Ns.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function ao(e) {
  return JSON.stringify(e);
}
function R0(e, t) {
  return e !== t;
}
function N0({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, o] = y.useState(() => ({
    spec: e,
    issues: io(e)
  })), [i, a] = y.useState(e), s = y.useRef(ao(e)), c = wc((d) => {
    s.current = ao(d), t(d);
  }, n);
  y.useEffect(() => {
    const d = ao(e);
    R0(d, s.current) && (c.cancel(), s.current = d, o({ spec: e, issues: io(e) }), a(e));
  }, [e, c]);
  const u = r.spec, m = r.issues, f = m.length === 0, g = y.useCallback(
    (d) => {
      const p = io(d);
      o({ spec: d, issues: p }), p.length === 0 && (a(d), c(d));
    },
    [c]
  );
  return { draft: u, issues: m, valid: f, committed: i, update: g };
}
const x0 = () => {
};
function _0({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: o = !1,
  className: i
}) {
  const a = Rt(), { draft: s, issues: c, valid: u, committed: m, update: f } = N0({
    spec: e,
    onChange: t ?? x0,
    debounceMs: r
  }), g = a.get(s.chart.family), d = (g == null ? void 0 : g.queryless) ?? !1, p = m, h = (M) => {
    var V, H, I;
    return (((V = M == null ? void 0 : M.measures) == null ? void 0 : V.length) ?? 0) > 0 || (((H = M == null ? void 0 : M.dimensions) == null ? void 0 : H.length) ?? 0) > 0 || (((I = M == null ? void 0 : M.timeDimensions) == null ? void 0 : I.some((T) => typeof T.granularity == "string")) ?? !1);
  }, v = (M) => {
    var V;
    return (((V = M == null ? void 0 : M.measures) == null ? void 0 : V.length) ?? 0) > 0;
  }, w = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", S = d || h(s.query) && h(p.query) && (!w || v(s.query) && v(p.query)), x = w && !v(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", k = y.useCallback(
    (M) => {
      f({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...M }
        }
      });
    },
    [s, f]
  ), _ = S ? /* @__PURE__ */ l(
    Ri,
    {
      query: p.query ?? {},
      chart: p.chart,
      editing: !0,
      updateFamilyOptions: k
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: x }) }), R = n ? /* @__PURE__ */ C(ne, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(gs, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "chart-editor",
      className: A("cv-chart-editor", o ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ C(br, { variant: "destructive", children: [
          /* @__PURE__ */ l(Qo, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(wr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Cr, { children: /* @__PURE__ */ C("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((M, V) => /* @__PURE__ */ C("li", { children: [
              M.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: M.path }) : null,
              " ",
              M.message
            ] }, V)),
            c.length > 3 ? /* @__PURE__ */ C("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Dr, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(S0, { spec: s, update: f, toolbar: R, children: _ }) }) })
      ]
    }
  );
}
function M0({
  name: e,
  onNameChange: t,
  onToggleVariables: n,
  variablesOpen: r,
  variableCount: o,
  onUndo: i,
  onRedo: a,
  canUndo: s,
  canRedo: c,
  undoLabel: u,
  redoLabel: m,
  onDiscard: f,
  discardDisabled: g,
  onSave: d,
  saveDisabled: p,
  className: h
}) {
  const v = i || a, [w, S] = y.useState(!1);
  y.useEffect(() => {
    if (!w) return;
    const R = setTimeout(() => S(!1), 1600);
    return () => clearTimeout(R);
  }, [w]), y.useEffect(() => {
    p || S(!1);
  }, [p]);
  const x = () => {
    d == null || d(), S(!0);
  }, k = u ? `Undo ${u}` : "Undo", _ = m ? `Redo ${m}` : "Redo";
  return /* @__PURE__ */ C("div", { "data-slot": "editor-toolbar", className: A("cv-editor-toolbar", h), children: [
    /* @__PURE__ */ l(
      be,
      {
        value: e,
        placeholder: "Untitled dashboard",
        "aria-label": "Dashboard name",
        onChange: (R) => t(R.target.value),
        className: "cv-editor-toolbar-name"
      }
    ),
    n ? /* @__PURE__ */ l("div", { className: "cv-editor-toolbar-group", children: /* @__PURE__ */ C(
      ne,
      {
        variant: r ? "secondary" : "outline",
        size: "sm",
        onClick: n,
        "aria-pressed": r,
        className: A(r && "cv-editor-toolbar-variables--on"),
        children: [
          /* @__PURE__ */ l(vu, {}),
          " Variables",
          o ? /* @__PURE__ */ l("span", { className: "cv-editor-toolbar-badge", children: o }) : null
        ]
      }
    ) }) : null,
    /* @__PURE__ */ C("div", { className: "cv-editor-toolbar-actions", children: [
      v ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            onClick: i,
            disabled: !s,
            "aria-label": k,
            title: k,
            children: /* @__PURE__ */ l(yu, {})
          }
        ),
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            onClick: a,
            disabled: !c,
            "aria-label": _,
            title: _,
            children: /* @__PURE__ */ l(bu, {})
          }
        )
      ] }) : null,
      f ? /* @__PURE__ */ C(
        ne,
        {
          variant: "ghost",
          size: "sm",
          onClick: f,
          disabled: g,
          className: "cv-editor-toolbar-discard",
          children: [
            /* @__PURE__ */ l(wu, {}),
            " Discard"
          ]
        }
      ) : null,
      d ? /* @__PURE__ */ C(
        ne,
        {
          size: "sm",
          onClick: x,
          disabled: p,
          "aria-live": "polite",
          className: A(
            // Keep the confirmation vivid even though the button is (correctly) disabled
            // right after a save — there's nothing left to save.
            w && "cv-editor-toolbar-save--saved"
          ),
          children: [
            w ? /* @__PURE__ */ l(an, {}) : /* @__PURE__ */ l(gs, {}),
            " ",
            w ? "Saved" : "Save"
          ]
        }
      ) : null
    ] })
  ] });
}
const Cc = "lg", un = 12;
function F0(e, t) {
  const n = t[Cc];
  if (n && n.length > 0) return n;
  let r, o = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const a = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    a > o && (r = i, o = a);
  }
  return r ?? e;
}
function $0(e, t) {
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
const on = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function O0(e, t, n, r = un) {
  const o = on[n], i = Math.min(o.w, r), a = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function A0(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? un) {
  const o = O0(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, o]
  };
}
function I0(e, t, n, r = ((o) => (o = e.grid) == null ? void 0 : o.cols)() ?? un) {
  const i = on[t.type], a = Math.min(i.w, r), s = {
    i: t.id,
    x: 0,
    y: n,
    w: a,
    h: i.h,
    minW: Math.min(i.minW, a),
    minH: i.minH
  }, c = e.layout.map((u) => u.y >= n ? { ...u, y: u.y + i.h } : u);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...c, s]
  };
}
function ji(e) {
  const t = /* @__PURE__ */ new Set([0]);
  for (const n of e) t.add(n.y + n.h);
  return [...t].filter((n) => !e.some((r) => r.y < n && r.y + r.h > n)).sort((n, r) => n - r);
}
function T0(e, t = un) {
  const n = ji(e), r = [];
  for (let o = 0; o < n.length - 1; o++) {
    const i = n[o], a = n[o + 1], s = e.filter((u) => u.y >= i && u.y + u.h <= a);
    if (s.length === 0) continue;
    const c = [...new Set(s.map((u) => u.x + u.w))].sort((u, m) => u - m);
    for (const u of c)
      u <= 0 || u >= t || s.some((m) => m.x < u && m.x + m.w > u) || r.push({ rowY: i, rowBottom: a, x: u, free: !s.some((m) => m.x >= u) });
  }
  return r;
}
const P0 = 2;
function E0(e, t, n, r, o = ((i) => (i = e.grid) == null ? void 0 : i.cols)() ?? un) {
  const a = on[t.type], c = ji(e.layout).find((S) => S > n) ?? Number.POSITIVE_INFINITY, u = (S) => S.y >= n && S.y + S.h <= c, m = e.layout.filter((S) => u(S) && S.x >= r), f = (S, x) => {
    const k = {
      i: t.id,
      x: r,
      y: n,
      w: S,
      h: a.h,
      minW: Math.min(a.minW, S),
      minH: a.minH
    };
    return {
      ...e,
      widgets: [...e.widgets, t],
      layout: [...e.layout.map((_) => x.get(_.i) ?? _), k]
    };
  };
  if (m.length === 0)
    return f(Math.max(1, Math.min(a.w, o - r)), /* @__PURE__ */ new Map());
  const g = Math.min(a.w, o), d = m.map((S) => ({ ...S, x: S.x + g }));
  if (d.every((S) => S.x + S.w <= o))
    return f(g, new Map(d.map((S) => [S.i, S])));
  const p = o - r - g, h = Math.min(...m.map((S) => S.x)), v = Math.max(...m.map((S) => S.x + S.w)) - h;
  if (p >= 1 && v > 0) {
    const S = p / v, x = m.map((k) => ({
      ...k,
      x: r + g + Math.round((k.x - h) * S),
      w: Math.max(k.minW ?? P0, Math.round(k.w * S))
    }));
    if (x.every((k) => k.x >= r + g && k.x + k.w <= o))
      return f(g, new Map(x.map((k) => [k.i, k])));
  }
  const w = m.map((S) => ({ ...S, y: S.y + a.h }));
  return f(g, new Map(w.map((S) => [S.i, S])));
}
const D0 = 900, L0 = 0.4;
function V0(e, t) {
  const n = (e == null ? void 0 : e.cols) ?? un, r = (e == null ? void 0 : e.rowHeight) ?? 40, o = (e == null ? void 0 : e.margin) ?? [12, 12], i = (e == null ? void 0 : e.containerPadding) ?? [0, 0], a = Math.max(L0, Math.min(1, t / D0)), s = Math.round(a / 0.05) * 0.05;
  return {
    cols: n,
    rowHeight: Math.max(8, Math.round(r * s)),
    margin: [Math.round(o[0] * s), Math.round(o[1] * s)],
    containerPadding: [
      Math.round(i[0] * s),
      Math.round(i[1] * s)
    ],
    scale: s
  };
}
function Ua(e, t) {
  const n = t.containerPadding[1] + e * (t.rowHeight + t.margin[1]) - t.margin[1] / 2;
  return Math.max(0, n);
}
function z0(e, t) {
  return Math.max(0, e * (t.rowHeight + t.margin[1]) - t.margin[1]);
}
function H0(e, t) {
  const n = t - e.containerPadding[0] * 2 - e.margin[0] * Math.max(0, e.cols - 1);
  return Math.max(0, n / e.cols);
}
function G0(e, t, n) {
  const r = t.containerPadding[0] + e * (H0(t, n) + t.margin[0]) - t.margin[0] / 2;
  return Math.max(0, r);
}
function j0(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const o = JSON.parse(JSON.stringify(r));
  if (o.id = n, o.type === "chart") {
    const i = o.chart.familyOptions;
    i && typeof i.chartId == "string" && (o.chart = { ...o.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return A0(e, o);
}
function B0(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function q0(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const W0 = 10, Sc = [
  { kind: "chart", label: "Chart", Icon: ls },
  { kind: "text", label: "Text", Icon: fs },
  { kind: "input", label: "Input", Icon: Cu }
];
function U0({
  rows: e,
  columns: t,
  metrics: n,
  width: r,
  containerRef: o,
  onInsert: i,
  disabled: a
}) {
  const [s, c] = y.useState(null), [u, m] = y.useState(null), f = y.useMemo(() => {
    const d = e.map((p) => ({
      key: `row:${p}`,
      axis: "row",
      rowY: p,
      top: Ua(p, n)
    }));
    for (const p of t)
      d.push({
        key: `col:${p.rowY}:${p.x}`,
        axis: "col",
        rowY: p.rowY,
        colX: p.x,
        // The line spans its own row band only — a column gap means nothing outside it.
        top: Ua(p.rowY, n) + n.margin[1] / 2,
        left: G0(p.x, n, r),
        height: z0(p.rowBottom - p.rowY, n)
      });
    return d;
  }, [e, t, n, r]), g = y.useRef(f);
  return g.current = f, y.useEffect(() => {
    const d = o.current;
    if (!d || a) return;
    const p = (v) => {
      const w = d.getBoundingClientRect(), S = v.clientX - w.left, x = v.clientY - w.top;
      let k = null, _ = W0;
      for (const R of g.current) {
        let M;
        if (R.axis === "row")
          M = Math.abs(x - R.top);
        else {
          if (x < R.top || x > R.top + (R.height ?? 0)) continue;
          M = Math.abs(S - (R.left ?? 0));
        }
        M <= _ && (k = R.key, _ = M);
      }
      c(k);
    }, h = () => c(null);
    return d.addEventListener("pointermove", p), d.addEventListener("pointerleave", h), () => {
      d.removeEventListener("pointermove", p), d.removeEventListener("pointerleave", h);
    };
  }, [o, a]), y.useEffect(() => {
    a && (c(null), m(null));
  }, [a]), a ? null : /* @__PURE__ */ l("div", { "data-slot": "insert-lines", className: "cv-insert-lines", children: f.map((d) => {
    const p = u === d.key || s === d.key, h = d.axis === "col";
    return /* @__PURE__ */ C(
      "div",
      {
        style: h ? { top: d.top, left: d.left, height: d.height } : { top: d.top },
        className: A(
          "cv-insert-line",
          h && "cv-insert-line--col",
          p && "cv-insert-line--active"
        ),
        children: [
          /* @__PURE__ */ l("span", { className: "cv-insert-line-rule" }),
          /* @__PURE__ */ C(
            We,
            {
              open: u === d.key,
              onOpenChange: (v) => m(v ? d.key : null),
              children: [
                /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    "aria-label": h ? `Insert a widget beside row ${d.rowY}, at column ${d.colX}` : `Insert a widget at row ${d.rowY}`,
                    tabIndex: p ? 0 : -1,
                    className: "cv-insert-line-button",
                    children: /* @__PURE__ */ l(Vt, {})
                  }
                ) }),
                /* @__PURE__ */ l(
                  Ke,
                  {
                    align: "center",
                    side: h ? "right" : "bottom",
                    className: "cv-insert-menu",
                    children: Sc.map(({ kind: v, label: w, Icon: S }) => /* @__PURE__ */ C(
                      "button",
                      {
                        type: "button",
                        className: "cv-insert-menu-item",
                        onClick: () => {
                          m(null), c(null), i(v, d.rowY, d.colX);
                        },
                        children: [
                          /* @__PURE__ */ l(S, {}),
                          w
                        ]
                      },
                      v
                    ))
                  }
                )
              ]
            }
          )
        ]
      },
      d.key
    );
  }) });
}
function K0({
  onInsert: e
}) {
  return /* @__PURE__ */ C("div", { "data-slot": "editor-empty", className: "cv-editor-empty", children: [
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-title", children: "This dashboard is empty" }),
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-hint", children: "Add a widget to start — later ones drop in wherever you point on the canvas." }),
    /* @__PURE__ */ l("div", { className: "cv-editor-empty-tiles", children: Sc.map(({ kind: t, label: n, Icon: r }) => /* @__PURE__ */ C(
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
function Y0(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Q0({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: o,
  onDelete: i,
  onLayoutChange: a,
  onInsert: s,
  externalDrop: c
}) {
  const [u, m] = yl(), f = y.useRef(null), g = y.useCallback(
    (z) => {
      f.current = z, u(z);
    },
    [u]
  ), d = y.useMemo(() => V0(e.grid, m), [e.grid, m]), { cols: p, rowHeight: h } = d, v = d.margin, w = d.containerPadding, [S, x] = y.useState(!1), k = y.useMemo(() => ji(e.layout), [e.layout]), _ = y.useMemo(
    () => T0(e.layout, p),
    [e.layout, p]
  ), R = y.useMemo(
    () => ({ [Cc]: Y0(e.layout) }),
    [e.layout]
  ), M = y.useMemo(
    () => new Map(e.widgets.map((z) => [z.id, z])),
    [e.widgets]
  ), V = y.useRef(a);
  y.useEffect(() => {
    V.current = a;
  }, [a]);
  const H = y.useRef(e.layout);
  y.useEffect(() => {
    H.current = e.layout;
  }, [e.layout]);
  const I = y.useRef(null), T = y.useCallback(
    (z, O) => {
      const E = F0(z, O).map((D) => ({ ...D }));
      X0(H.current, E) || V.current(E);
    },
    []
  );
  return /* @__PURE__ */ l(ki, { spec: e, children: /* @__PURE__ */ C("div", { ref: g, className: "cv-editor-canvas", children: [
    m > 0 && s && e.widgets.length === 0 ? /* @__PURE__ */ l(K0, { onInsert: (z) => s(z, 0) }) : null,
    m > 0 ? /* @__PURE__ */ l(
      hs,
      {
        width: m,
        layouts: R,
        breakpoints: { lg: 0 },
        cols: { lg: p },
        rowHeight: h,
        margin: v,
        containerPadding: w,
        dragConfig: { enabled: !0, handle: `.${lr}` },
        resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
        onLayoutChange: T,
        ...c ? {
          dropConfig: {
            enabled: !0,
            defaultItem: { w: Math.min(on.chart.w, p), h: on.chart.h },
            // Only OUR payload draws the ghost; a stray file/text drag is rejected.
            onDragOver: (z) => {
              var O;
              return (O = z.dataTransfer) != null && O.types.includes(c.mimeType) ? void 0 : !1;
            }
          },
          onDrop: (z, O, G) => {
            var D;
            const E = (D = G.dataTransfer) == null ? void 0 : D.getData(c.mimeType);
            !E || !O || c.onDrop(E, { x: O.x, y: O.y, w: O.w, h: O.h });
          }
        } : {},
        onDragStart: () => x(!0),
        onDragStop: () => x(!1),
        onResizeStart: () => x(!0),
        onResizeStop: () => x(!1),
        children: e.layout.map((z) => {
          const O = M.get(z.i);
          if (!O) return null;
          const G = O.id === t;
          return (
            // Selecting = a click that bubbles up from anywhere in the widget;
            // RGL's drag (mousedown on the chrome header handle) wins for drags,
            // so we don't need a blocking overlay that would also block dragging.
            /* @__PURE__ */ C(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Select ${O.title ?? O.type}`,
                "aria-pressed": G,
                onPointerDown: (E) => {
                  I.current = { x: E.clientX, y: E.clientY };
                },
                onClick: (E) => {
                  const D = I.current;
                  D && Math.hypot(E.clientX - D.x, E.clientY - D.y) > 5 || n(O.id);
                },
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), n(O.id));
                },
                className: A(
                  "cv-editor-widget",
                  // Idle = no chrome at all; hover paints a faint 1px ring so the
                  // hover target (and its action cluster) is obvious, and the
                  // SELECTED widget keeps the strong ring.
                  G && "cv-editor-widget--selected"
                ),
                children: [
                  /* @__PURE__ */ l(Oo, { widget: O, editable: !0 }),
                  /* @__PURE__ */ l("div", { "aria-hidden": !0, className: A(lr, "cv-editor-widget-drag-layer") }),
                  /* @__PURE__ */ C("div", { className: "cv-editor-widget-actions", children: [
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Edit ${O.title ?? O.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), r(O.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(Su, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Duplicate ${O.title ?? O.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), o(O.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(ku, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Delete ${O.title ?? O.type}`,
                        onClick: (E) => {
                          E.stopPropagation(), i(O.id);
                        },
                        className: A("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                        children: /* @__PURE__ */ l(sn, {})
                      }
                    )
                  ] })
                ]
              },
              z.i
            )
          );
        })
      }
    ) : null,
    m > 0 && s && e.widgets.length > 0 ? /* @__PURE__ */ l(
      U0,
      {
        rows: k,
        columns: _,
        metrics: d,
        width: m,
        containerRef: f,
        onInsert: s,
        disabled: S
      }
    ) : null
  ] }) });
}
function X0(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const o = n.get(r.i);
    if (!o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h) return !1;
  }
  return !0;
}
const J0 = y.memo(Q0);
function Z0(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function ew({
  widget: e,
  onChange: t
}) {
  const n = y.useRef(t);
  y.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = y.useRef(e);
  y.useEffect(() => {
    r.current = e;
  }, [e]);
  const o = vs({
    extensions: [bs],
    editable: !0,
    content: Z0(e.doc),
    onUpdate: ({ editor: i }) => {
      const a = i.getJSON();
      n.current({ ...r.current, doc: a });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: A(bl, "cv-text-editor-content")
      }
    }
  });
  return o ? /* @__PURE__ */ l(ve, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ C("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(tw, { editor: o }),
    /* @__PURE__ */ l(ys, { editor: o })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function ut({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (o) => o.preventDefault(),
      onClick: t,
      className: A("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function tw({ editor: e }) {
  const [, t] = y.useReducer((n) => n + 1, 0);
  return y.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          ut,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Ru, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Nu, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(xu, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(_u, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Mu, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Fu, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l($u, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(Ou, {})
          }
        )
      ]
    }
  );
}
const nw = Jo(
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
function rw({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: A(nw({ variant: t }), e), ...n });
}
function ow({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: o,
  className: i
}) {
  const { meta: a, isLoading: s } = Nt(), c = y.useMemo(() => Er(a), [a]), u = c.filter((g) => g.type === "view"), m = c.find((g) => g.name === e), f = y.useMemo(() => {
    const g = c.filter((v) => v.type === "cube"), d = g.some((v) => v.category), p = [], h = /* @__PURE__ */ new Map();
    for (const v of g) {
      const w = v.category ?? (d ? "More tables" : "Tables");
      h.has(w) || (h.set(w, []), p.push(w)), h.get(w).push(v);
    }
    return p.sort((v, w) => v === "More tables" ? 1 : w === "More tables" ? -1 : v.localeCompare(w)), p.map((v) => ({ label: v, items: h.get(v) }));
  }, [c]);
  return /* @__PURE__ */ C(Ge, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Be, { id: o, className: i, children: /* @__PURE__ */ l(je, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(so, { option: m }) : void 0 }) }),
    /* @__PURE__ */ C(qe, { children: [
      u.length > 0 ? /* @__PURE__ */ C(Mo, { children: [
        /* @__PURE__ */ l(Fo, { children: "Saved datasets" }),
        u.map((g) => /* @__PURE__ */ l(Re, { value: g.name, children: /* @__PURE__ */ l(so, { option: g }) }, g.name))
      ] }) : null,
      f.map((g) => /* @__PURE__ */ C(Mo, { children: [
        /* @__PURE__ */ l(Fo, { children: g.label }),
        g.items.map((d) => /* @__PURE__ */ l(Re, { value: d.name, children: /* @__PURE__ */ l(so, { option: d }) }, d.name))
      ] }, g.label))
    ] })
  ] });
}
function so({ option: e }) {
  const t = e.type === "view" ? ms : Au;
  return /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(rw, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const iw = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function aw(e) {
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
function sw({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, o = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), a = (s) => {
    s !== r.kind && o(aw(s));
  };
  return /* @__PURE__ */ C("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ C(
          Ge,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(qe, { children: t.map((s) => /* @__PURE__ */ l(Re, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ve, { label: "Control", children: /* @__PURE__ */ C(Ge, { value: r.kind, onValueChange: (s) => a(s), children: [
      /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
      /* @__PURE__ */ l(qe, { children: Zu.options.map((s) => /* @__PURE__ */ l(Re, { value: s, children: iw[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(lw, { control: r, onChange: o, variables: t })
  ] });
}
function lw({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(cw, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(dw, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(mw, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(fw, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(gw, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(pw, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function cw({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          uw,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      wt,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function uw({
  selected: e,
  onChange: t
}) {
  const [n, r] = y.useState(!1), o = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(o);
    c.has(s) ? c.delete(s) : c.add(s), t(Wn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, a = o.size === 0 ? "Default set" : o.size === Wn.length ? "All presets" : `${o.size} selected`;
  return /* @__PURE__ */ C(We, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(ne, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: a }),
      /* @__PURE__ */ l(St, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Ke, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Wn.map((s) => {
      const c = o.has(s.value);
      return /* @__PURE__ */ C(
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
                children: c ? /* @__PURE__ */ l(an, { className: "cv-ed-icon-xs" }) : null
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
function dw({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), o = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = ht.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), a = "__none__";
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ C(
          Ge,
          {
            value: e.rangeVariable ?? a,
            onValueChange: (s) => t({ ...e, rangeVariable: s === a ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ C(qe, { children: [
                /* @__PURE__ */ l(Re, { value: a, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(Re, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ve, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: ht.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => o(s),
          className: A("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function mw({
  control: e,
  onChange: t
}) {
  const n = (i, a) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: a.value ?? String(c.value), label: a.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), o = (i) => t({ ...e, options: e.options.filter((a, s) => s !== i) });
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      wt,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      ve,
      {
        label: "Options",
        action: /* @__PURE__ */ C(ne, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Vt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, a) => /* @__PURE__ */ C("div", { className: "cv-select-option-row", children: [
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
            ne,
            {
              variant: "ghost",
              size: "icon",
              className: A("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => o(a),
              children: /* @__PURE__ */ l(sn, {})
            }
          )
        ] }, a)) })
      }
    )
  ] });
}
function fw({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(ve, { label: "From", children: /* @__PURE__ */ C(
      Ge,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
          /* @__PURE__ */ C(qe, { children: [
            /* @__PURE__ */ l(Re, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(Re, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(Re, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ve,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          ow,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function gw({
  control: e,
  onChange: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ l(ve, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    be,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function pw({
  control: e,
  onChange: t
}) {
  const n = y.useId(), r = (o, i) => /* @__PURE__ */ l(ve, { label: i, htmlFor: `${n}-${o}`, children: /* @__PURE__ */ l(
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
  return /* @__PURE__ */ C(Ce, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function hw(e) {
  const t = {
    schemaVersion: Kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function vw(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function yw(e) {
  return { schemaVersion: Kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
const Ka = y.memo(function({
  widget: t,
  variables: n,
  onChange: r,
  onVariablesChange: o,
  fill: i = !1
}) {
  const a = y.useId(), s = o ? (m) => o([...n, m]) : void 0, c = y.useMemo(
    () => t.type === "chart" ? hw(t) : null,
    [t]
  ), u = y.useMemo(() => yw(n), [n]);
  return /* @__PURE__ */ C("div", { "data-slot": "widget-edit-panel", className: A("cv-widget-panel", i && "cv-widget-panel--fill"), children: [
    t.type !== "text" ? /* @__PURE__ */ l(
      ve,
      {
        label: "Title",
        htmlFor: a,
        hint: t.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          be,
          {
            id: a,
            value: t.title ?? "",
            placeholder: "Untitled",
            onChange: (m) => r({ ...t, title: m.target.value || void 0 })
          }
        )
      }
    ) : null,
    t.type === "chart" && c ? (
      // The chart's query may carry {var} tokens bound to dashboard variables.
      // Provide a variable store (seeded from the dashboard's decls) so the live
      // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
      // Cube and 400s ("granularity must be a string").
      /* @__PURE__ */ l(ki, { spec: u, children: /* @__PURE__ */ l(ab, { createVariable: s, children: /* @__PURE__ */ l("div", { className: A(i && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        _0,
        {
          fill: i,
          spec: c,
          onChange: (m) => r(vw(t, m))
        }
      ) }) }) })
    ) : t.type === "text" ? /* @__PURE__ */ l(ew, { widget: t, onChange: r }) : t.type === "input" ? /* @__PURE__ */ l(sw, { widget: t, variables: n, onChange: r }) : null
  ] });
});
function bw(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function ww(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Cw(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Sw(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function kw(e, t) {
  switch (e) {
    case "chart":
      return ww(t);
    case "text":
      return Cw(t);
    case "input":
      return Sw(t);
  }
}
function Rw(e) {
  return { name: e, type: "string" };
}
function Nw(e) {
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
function xw(e) {
  const t = {}, n = (r) => t[r] ?? (t[r] = { inputs: [], refs: 0 });
  for (const r of e.variables) n(r.name);
  for (const r of e.widgets) {
    if (r.type === "input") {
      const o = r.control.variable;
      o && n(o).inputs.push(r.id);
      continue;
    }
    r.type === "chart" && (hr(r.query, (o) => void n(o.var).refs++), hr(r.chart, (o) => void n(o.var).refs++));
  }
  return t;
}
function _w(e) {
  const t = [], n = (e == null ? void 0 : e.inputs.length) ?? 0, r = (e == null ? void 0 : e.refs) ?? 0;
  return n > 0 && t.push(`${n} input${n === 1 ? "" : "s"}`), r > 0 && t.push(`${r} quer${r === 1 ? "y" : "ies"}`), t.length > 0 ? t.join(" · ") : "Unused";
}
function Mw(e, t, n) {
  if (t === n || n === "") return e;
  const r = e.variables;
  return !r.some((o) => o.name === t) || r.some((o) => o.name === n) ? e : {
    ...e,
    variables: r.map((o) => o.name === t ? { ...o, name: n } : o),
    widgets: e.widgets.map((o) => kc(o, t, () => ({ var: n }), n))
  };
}
function Fw(e, t) {
  const n = e.variables.find((o) => o.name === t), r = n == null ? void 0 : n.default;
  return {
    ...e,
    variables: e.variables.filter((o) => o.name !== t),
    widgets: e.widgets.map(
      (o) => kc(o, t, () => r === void 0 ? pr : r, "")
    )
  };
}
const pr = Symbol("cv.removeVarRef");
function kc(e, t, n, r) {
  let o = e;
  o.type === "input" && o.control.variable === t && (o = { ...o, control: { ...o.control, variable: r } });
  const i = Bo(o, t, n);
  return i === pr ? o : i;
}
function hr(e, t) {
  if (_e(e)) {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (const n of e) hr(n, t);
    return;
  }
  if (e && typeof e == "object")
    for (const n of Object.values(e)) hr(n, t);
}
function Bo(e, t, n) {
  if (_e(e)) return e.var === t ? n(e) : e;
  if (Array.isArray(e)) {
    let r = !1;
    const o = [];
    for (const i of e) {
      const a = Bo(i, t, n);
      if (a === pr) {
        r = !0;
        continue;
      }
      a !== i && (r = !0), o.push(a);
    }
    return r ? o : e;
  }
  if (e && typeof e == "object") {
    let r = !1;
    const o = {};
    for (const [i, a] of Object.entries(e)) {
      const s = Bo(a, t, n);
      if (s === pr) {
        r = !0;
        continue;
      }
      s !== a && (r = !0), o[i] = s;
    }
    return r ? o : e;
  }
  return e;
}
const Ya = {
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
function $w({
  spec: e,
  onChange: t,
  onClose: n,
  newName: r,
  className: o
}) {
  const i = e.variables, a = y.useMemo(() => xw(e), [e]), [s, c] = y.useState(null), u = y.useRef(0), m = () => {
    if (r) return r();
    let p;
    do
      p = `var_${++u.current}`;
    while (i.some((h) => h.name === p));
    return p;
  }, f = (p, h) => t((v) => ({
    ...v,
    variables: v.variables.map((w) => w.name === p ? Ow(w, h) : w)
  })), g = () => {
    const p = m();
    t((h) => ({ ...h, variables: [...h.variables, Rw(p)] })), c(p);
  }, d = (p, h) => t((v) => {
    const w = v.variables.findIndex((k) => k.name === p), S = w + h;
    if (w < 0 || S < 0 || S >= v.variables.length) return v;
    const x = v.variables.slice();
    return [x[w], x[S]] = [x[S], x[w]], { ...v, variables: x };
  });
  return /* @__PURE__ */ C(
    "aside",
    {
      "data-slot": "variables-dock",
      "aria-label": "Dashboard variables",
      className: A("cv-variables-dock", o),
      children: [
        /* @__PURE__ */ C("div", { className: "cv-variables-dock-header", children: [
          /* @__PURE__ */ C("span", { className: "cv-variables-dock-title", children: [
            "Variables",
            i.length > 0 ? /* @__PURE__ */ l("span", { className: "cv-variables-dock-count", children: i.length }) : null
          ] }),
          /* @__PURE__ */ C("div", { className: "cv-variables-dock-header-actions", children: [
            /* @__PURE__ */ C(ne, { variant: "outline", size: "sm", onClick: g, children: [
              /* @__PURE__ */ l(Vt, {}),
              " Add variable"
            ] }),
            n ? /* @__PURE__ */ l(
              ne,
              {
                variant: "ghost",
                size: "icon",
                className: "cv-ed-btn-7",
                "aria-label": "Close variables",
                onClick: n,
                children: /* @__PURE__ */ l(uo, {})
              }
            ) : null
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-variables-dock-body", children: i.length === 0 ? /* @__PURE__ */ C("div", { className: "cv-variables-empty", children: [
          /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
          /* @__PURE__ */ C("p", { className: "cv-variables-empty-hint", children: [
            "Variables bind input controls and resolve ",
            "{var}",
            " tokens in queries."
          ] }),
          /* @__PURE__ */ C(ne, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: g, children: [
            /* @__PURE__ */ l(Vt, {}),
            " Add variable"
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: i.map((p, h) => /* @__PURE__ */ l(
          Aw,
          {
            decl: p,
            index: h,
            total: i.length,
            usage: a[p.name],
            takenNames: i.filter((v, w) => w !== h).map((v) => v.name),
            autoFocusName: s === p.name,
            onNameCommitted: () => c(null),
            onRename: (v) => t((w) => Mw(w, p.name, v)),
            onPatch: (v) => f(p.name, v),
            onRemove: () => t((v) => Fw(v, p.name)),
            onMove: (v) => d(p.name, v)
          },
          p.name || `unnamed-${h}`
        )) }) })
      ]
    }
  );
}
function Ow(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Nw(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Aw({
  decl: e,
  index: t,
  total: n,
  usage: r,
  takenNames: o,
  autoFocusName: i,
  onNameCommitted: a,
  onRename: s,
  onPatch: c,
  onRemove: u,
  onMove: m
}) {
  const [f, g] = y.useState(!0), d = y.useId(), [p, h] = y.useState(e.name);
  y.useEffect(() => h(e.name), [e.name]);
  const v = p.trim(), w = v === "" ? "Name required" : o.includes(v) && v !== e.name ? "Name already used" : void 0, S = () => {
    if (w || v === e.name) {
      if (w) return;
      a();
      return;
    }
    s(v), a();
  }, x = ((r == null ? void 0 : r.inputs.length) ?? 0) + ((r == null ? void 0 : r.refs) ?? 0), [k, _] = y.useState(!1);
  return y.useEffect(() => {
    if (!k) return;
    const R = setTimeout(() => _(!1), 5e3);
    return () => clearTimeout(R);
  }, [k]), /* @__PURE__ */ C("div", { "data-slot": "variable-row", className: "cv-variable-row", children: [
    /* @__PURE__ */ C("div", { className: "cv-variable-row-header", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": f ? "Collapse variable" : "Expand variable",
          "aria-expanded": f,
          onClick: () => g((R) => !R),
          className: "cv-variable-row-toggle",
          children: f ? /* @__PURE__ */ l(St, {}) : /* @__PURE__ */ l(yr, {})
        }
      ),
      /* @__PURE__ */ l(
        be,
        {
          value: p,
          placeholder: "variable_name",
          "aria-label": "Variable name",
          "aria-invalid": w ? !0 : void 0,
          autoFocus: i,
          onChange: (R) => h(R.target.value),
          onBlur: S,
          onKeyDown: (R) => {
            R.key === "Enter" ? (R.preventDefault(), S()) : R.key === "Escape" && h(e.name);
          },
          className: "cv-variable-row-name"
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Ya[e.type] }),
      /* @__PURE__ */ C("div", { className: "cv-variable-row-actions", children: [
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            className: A("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable up",
            disabled: t === 0,
            onClick: () => m(-1),
            children: /* @__PURE__ */ l(Ko, {})
          }
        ),
        /* @__PURE__ */ l(
          ne,
          {
            variant: "ghost",
            size: "icon",
            className: A("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable down",
            disabled: t === n - 1,
            onClick: () => m(1),
            children: /* @__PURE__ */ l(Yo, {})
          }
        )
      ] })
    ] }),
    w ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: w }) : null,
    f ? /* @__PURE__ */ C("div", { className: "cv-variable-row-body", children: [
      /* @__PURE__ */ l(ve, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ C(Ge, { value: e.type, onValueChange: (R) => c({ type: R }), children: [
        /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
        /* @__PURE__ */ l(qe, { children: ks.options.map((R) => /* @__PURE__ */ l(Re, { value: R, children: Ya[R] }, R)) })
      ] }) }),
      /* @__PURE__ */ l(
        ve,
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
              onChange: (R) => c({ label: R.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ l(
        wt,
        {
          label: "Array",
          hint: "Holds multiple values (multi-select).",
          checked: e.array ?? !1,
          onChange: (R) => c({ array: R })
        }
      ),
      /* @__PURE__ */ l(Iw, { decl: e, onChange: (R) => c({ default: R }) }),
      /* @__PURE__ */ C("div", { className: "cv-variable-row-usage", children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: A(
              "cv-variable-row-usage-text",
              x === 0 && "cv-variable-row-usage-text--none"
            ),
            children: x === 0 ? "Unused" : `Used by ${_w(r)}`
          }
        ),
        /* @__PURE__ */ C(
          ne,
          {
            variant: "ghost",
            size: "sm",
            className: A("cv-ed-muted", "cv-ed-hover-danger", k && "cv-ed-danger"),
            onClick: () => {
              if (x > 0 && !k) {
                _(!0);
                return;
              }
              u();
            },
            children: [
              /* @__PURE__ */ l(sn, {}),
              k ? `Remove (in use by ${x})` : "Remove"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
}
function Iw({
  decl: e,
  onChange: t
}) {
  const n = y.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(wt, { label: "Default", checked: e.default === !0, onChange: (o) => t(o) });
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ve, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      be,
      {
        id: n,
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (o) => {
          const i = o.target.value;
          t(i === "" ? void 0 : Number(i));
        }
      }
    ) });
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0;
  return e.array ? /* @__PURE__ */ l(ve, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    Ew,
    {
      id: n,
      value: Array.isArray(e.default) ? e.default.map(String) : [],
      placeholder: Qa(e.type),
      onChange: t
    }
  ) }) : /* @__PURE__ */ l(ve, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    be,
    {
      id: n,
      value: Dw(e.default),
      placeholder: Qa(e.type),
      onChange: (o) => {
        const i = o.target.value;
        t(i === "" ? void 0 : i);
      }
    }
  ) });
}
function Tw(e) {
  return e.split(",").map((t) => t.trim()).filter(Boolean);
}
function Pw(e) {
  return e.join(", ");
}
function Ew({
  id: e,
  value: t,
  placeholder: n,
  onChange: r
}) {
  const { text: o, onText: i, onBlur: a } = Li({
    value: t,
    parse: Tw,
    format: Pw,
    onChange: (s) => r(s.length === 0 ? void 0 : s)
  });
  return /* @__PURE__ */ l(
    be,
    {
      id: e,
      value: o,
      placeholder: n,
      onChange: (s) => i(s.target.value),
      onBlur: a
    }
  );
}
function Dw(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Qa(e) {
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
function Lw(e, t, n, r = Vw) {
  const o = new Map(t.widgets.map((g) => [g.id, g])), i = new Set(e.widgets.map((g) => g.id)), a = e.widgets.map(
    (g) => n.has(g.id) && o.has(g.id) ? o.get(g.id) : g
  );
  for (const g of t.widgets)
    !i.has(g.id) && n.has(g.id) && a.push(g);
  const s = new Map(t.layout.map((g) => [g.i, g])), c = new Set(e.layout.map((g) => g.i)), u = e.layout.map(
    (g) => n.has(g.i) && s.has(g.i) ? s.get(g.i) : g
  );
  for (const g of t.layout)
    !c.has(g.i) && n.has(g.i) && u.push(g);
  const m = { ...e, widgets: a, layout: u }, f = t;
  for (const g of r)
    g === "widgets" || g === "layout" || (g in f ? m[g] = f[g] : delete m[g]);
  return m;
}
const Vw = /* @__PURE__ */ new Set(), zw = 2e3;
function MC({
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
  canRedo: m,
  undoLabel: f,
  redoLabel: g,
  onDiscard: d,
  families: p,
  onCreateChart: h,
  openWidgetId: v,
  renderWidgetAside: w,
  renderWidgetHeaderExtra: S,
  onEditingChange: x,
  adoptRemoteWidget: k,
  onDropWidget: _,
  className: R
}) {
  var Wi, Ui;
  const [M, V] = y.useState(e), [H, I] = y.useState(e);
  y.useEffect(() => {
    V(e), I(e);
  }, [e]);
  const [T, z] = y.useState(null), O = y.useRef(0), [G, E] = y.useState(null), [D, X] = y.useState(!1), Z = y.useRef(T), ee = y.useRef(G), le = y.useRef(M);
  y.useEffect(() => {
    Z.current = T, ee.current = G, le.current = M;
  });
  const me = y.useRef(null);
  me.current === null && (me.current = i ?? bw());
  const ce = i ?? me.current, ye = wc(
    (B, W) => r == null ? void 0 : r(B, W),
    a
  ), fe = y.useRef(/* @__PURE__ */ new Map()), L = y.useCallback(
    (B, W) => {
      const de = Date.now();
      O.current = de, W.widgetId && fe.current.set(`w:${W.widgetId}`, de), W.kind === "name" && fe.current.set("f:name", de), W.kind === "variables" && fe.current.set("f:variables", de), V((Me) => {
        const Oe = B(Me);
        if (Oe !== Me) {
          if (W.kind === "layout")
            for (const _t of Gw(Me.layout, Oe.layout))
              fe.current.set(`w:${_t}`, de);
          ye(Oe, W);
        }
        return Oe;
      });
    },
    [ye]
  ), re = y.useRef(/* @__PURE__ */ new Map()), ue = y.useCallback((B, W) => `${B}:${W}:${re.current.get(W) ?? 0}`, []), P = y.useRef(t), F = y.useRef(void 0), N = k == null ? void 0 : k.key, $ = k == null ? void 0 : k.id;
  y.useEffect(() => {
    const B = N !== void 0 && N !== F.current;
    if (!t || t === P.current && !B) return;
    const W = 500;
    let de = null;
    const Me = () => {
      var Qi;
      const Oe = Date.now() - O.current;
      if (Oe < W) {
        de = setTimeout(Me, W - Oe);
        return;
      }
      P.current = t;
      const _t = /* @__PURE__ */ new Set(), Ki = /* @__PURE__ */ new Set();
      ((Qi = ee.current) == null ? void 0 : Qi.kind) === "widget" && _t.add(ee.current.id), Z.current && _t.add(Z.current);
      const Nc = Date.now();
      for (const [Mt, xc] of fe.current) {
        if (Nc - xc > zw) {
          fe.current.delete(Mt);
          continue;
        }
        Mt.startsWith("w:") ? _t.add(Mt.slice(2)) : Mt.startsWith("f:") && Ki.add(Mt.slice(2));
      }
      B && $ && t.widgets.some((Mt) => Mt.id === $) && (F.current = N, _t.delete($), fe.current.delete(`w:${$}`));
      const Yi = Lw(t, le.current, _t, Ki);
      V(Yi), n == null || n(Yi);
    };
    return Me(), () => {
      de && clearTimeout(de);
    };
  }, [t, N, $]);
  const j = y.useMemo(
    () => _ ? {
      mimeType: _.mimeType,
      onDrop: (B, W) => {
        const de = _.parse(B);
        if (!de) return;
        const Me = on[de.type];
        L(
          (Oe) => ({
            ...Oe,
            widgets: [...Oe.widgets, de],
            layout: [...Oe.layout, { i: de.id, x: W.x, y: W.y, w: W.w, h: W.h, minW: Math.min(Me.minW, W.w), minH: Me.minH }]
          }),
          { kind: "add", widgetId: de.id, label: "add chart", coalesceKey: ue("add", de.id) }
        ), z(de.id);
      }
    } : void 0,
    [_, L, ue]
  ), q = y.useCallback(
    (B, W, de) => {
      if (B === "chart" && h) {
        h();
        return;
      }
      const Me = kw(B, ce());
      L(
        (Oe) => de === void 0 ? I0(Oe, Me, W) : E0(Oe, Me, W, de),
        {
          kind: "add",
          widgetId: Me.id,
          label: `add ${B}`
        }
      ), z(Me.id), B === "chart" && E({ kind: "widget", id: Me.id });
    },
    [L, ce, h]
  ), Y = y.useRef(void 0);
  y.useEffect(() => {
    !v || Y.current === v || M.widgets.some((B) => B.id === v) && (Y.current = v, z(v), E({ kind: "widget", id: v }));
  }, [v, M.widgets]);
  const te = y.useCallback((B) => z(B), []), Ne = y.useCallback((B) => {
    z(B), E({ kind: "widget", id: B });
  }, []), we = y.useCallback(
    (B) => {
      L((W) => B0(W, B), {
        kind: "remove",
        widgetId: B,
        label: `delete "${Bn(le.current.widgets.find((W) => W.id === B))}"`
      }), z((W) => W === B ? null : W), E((W) => (W == null ? void 0 : W.id) === B ? null : W);
    },
    [L]
  ), Q = y.useCallback(
    (B) => {
      const W = ce();
      L((de) => j0(de, B, W), {
        kind: "duplicate",
        widgetId: W,
        label: `duplicate "${Bn(le.current.widgets.find((de) => de.id === B))}"`
      }), z(W);
    },
    [L, ce]
  ), ae = y.useCallback(
    (B) => {
      const W = B.type === "text" ? "text" : "widget";
      L((de) => q0(de, B), {
        kind: W,
        widgetId: B.id,
        label: `edit "${Bn(B)}"`,
        coalesceKey: ue(W, B.id)
      });
    },
    [L, ue]
  ), ge = y.useCallback(
    (B) => L(
      (W) => {
        const de = $0(W.layout, B);
        return Hw(W.layout, de) ? W : { ...W, layout: de };
      },
      { kind: "layout", label: "layout change" }
    ),
    [L]
  ), ze = y.useCallback(
    (B) => L((W) => ({ ...W, name: B || void 0 }), {
      kind: "name",
      label: "rename dashboard",
      // Every keystroke is one commit; the host folds them into one undo step.
      coalesceKey: "name"
    }),
    [L]
  ), Je = y.useCallback(
    (B) => L((W) => ({ ...W, variables: B }), {
      kind: "variables",
      label: "edit variables",
      coalesceKey: "variables"
    }),
    [L]
  ), $e = y.useCallback(
    (B) => L(B, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
    [L]
  ), xt = y.useDeferredValue(M), pe = y.useMemo(
    () => po.safeParse(xt),
    [xt]
  ), Ye = y.useCallback(() => {
    const B = po.safeParse(M);
    B.success && (o == null || o(B.data), I(M));
  }, [M, o]), He = M !== H, Se = G ? M.widgets.find((B) => B.id === G.id) ?? null : null;
  y.useEffect(() => {
    G && !M.widgets.some((B) => B.id === G.id) && E(null);
  }, [G, M.widgets]);
  const at = y.useCallback(() => {
    E((B) => (B && re.current.set(B.id, (re.current.get(B.id) ?? 0) + 1), null));
  }, []), dn = Se ? Bn(Se) : "", Ln = (Se == null ? void 0 : Se.type) === "chart" ? { widget: Se, update: ae, close: at } : null, Bi = Ln && w ? w(Ln) : null, Rc = Ln && S ? S(Ln) : null, qi = (G == null ? void 0 : G.id) ?? null;
  return y.useEffect(() => {
    x == null || x(qi);
  }, [qi, x]), /* @__PURE__ */ l(Si, { families: p, children: /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Ui = (Wi = M.grid) == null ? void 0 : Wi.margin) == null ? void 0 : Ui[0]) ?? 12 },
      className: A("cv-dashboard-editor", R),
      children: [
        /* @__PURE__ */ l(
          M0,
          {
            name: M.name ?? "",
            onNameChange: ze,
            onToggleVariables: () => X((B) => !B),
            variablesOpen: D,
            variableCount: M.variables.length,
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            undoLabel: f,
            redoLabel: g,
            onDiscard: d,
            discardDisabled: !He,
            onSave: o ? Ye : void 0,
            saveDisabled: !pe.success || !He,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        pe.success ? null : /* @__PURE__ */ C("p", { className: "cv-dashboard-editor-validation", children: [
          pe.error.issues.length,
          " validation issue",
          pe.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-body", children: [
          /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: G ? null : /* @__PURE__ */ l(
            J0,
            {
              spec: M,
              selectedId: T,
              onSelect: te,
              onEdit: Ne,
              onDuplicate: Q,
              onDelete: we,
              onLayoutChange: ge,
              onInsert: q,
              externalDrop: j
            }
          ) }),
          D && !G ? /* @__PURE__ */ l(
            $w,
            {
              spec: M,
              onChange: $e,
              onClose: () => X(!1)
            }
          ) : null
        ] }),
        G ? /* @__PURE__ */ C(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": dn,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ C("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ C(ne, { variant: "ghost", size: "sm", onClick: at, children: [
                    /* @__PURE__ */ l(Xo, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: dn })
                ] }),
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-actions", children: [
                  Rc,
                  Se ? /* @__PURE__ */ C(
                    ne,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "cv-ed-danger",
                      onClick: () => we(Se.id),
                      children: [
                        /* @__PURE__ */ l(sn, {}),
                        " Delete"
                      ]
                    }
                  ) : null
                ] })
              ] }),
              /* @__PURE__ */ l(Dr, { label: dn, resetKey: M, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: (Se == null ? void 0 : Se.type) === "chart" ? /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-row", children: [
                /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-main", children: /* @__PURE__ */ l(
                  Ka,
                  {
                    fill: !0,
                    widget: Se,
                    variables: M.variables,
                    onChange: ae,
                    onVariablesChange: Je
                  }
                ) }),
                Bi ? /* @__PURE__ */ l("aside", { "data-slot": "dashboard-editor-aside", className: "cv-dashboard-editor-fullscreen-aside", children: Bi }) : null
              ] }) : Se ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Ka,
                {
                  widget: Se,
                  variables: M.variables,
                  onChange: ae,
                  onVariablesChange: Je
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Bn(e) {
  if (!e) return "widget";
  if (e.title) return e.title;
  const t = e.type;
  return `${t[0].toUpperCase()}${t.slice(1)} widget`;
}
function Hw(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = t[n];
    if (r.i !== o.i || r.x !== o.x || r.y !== o.y || r.w !== o.w || r.h !== o.h || r.minW !== o.minW || r.minH !== o.minH || r.static !== o.static)
      return !1;
  }
  return !0;
}
function Gw(e, t) {
  const n = new Map(e.map((r) => [r.i, r]));
  return t.filter((r) => {
    const o = n.get(r.i);
    return !o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h;
  }).map((r) => r.i);
}
export {
  Jt as AUTO_GRANULARITY,
  cm as AreaChartFamily,
  Bd as AreaFamilyOptionsSchema,
  Ku as AxesOptionsSchema,
  ra as AxisOptionsSchema,
  hC as BUILTIN_CHART_FAMILIES,
  lt as BUILTIN_DEFAULTS,
  st as BUILTIN_FAMILY_OPTION_SCHEMAS,
  sm as BarChartFamily,
  Gd as BarFamilyOptionsSchema,
  Cc as CANONICAL_BREAKPOINT,
  vt as ChartColorTokenSchema,
  S0 as ChartEditOverlay,
  _0 as ChartEditor,
  ju as ChartFamilySchema,
  oi as ChartInteractionProvider,
  Ss as ChartOptionsSchema,
  il as ChartRenderer,
  Ns as ChartSpecSchema,
  Xu as ChartTransformSchema,
  xC as ChartView,
  td as ChartWidgetSchema,
  Yu as ColorAssignmentSchema,
  Yd as CondFormatRuleSchema,
  Ri as CubeChart,
  Ah as CubeChartSpec,
  Cs as CubeQuerySchema,
  Or as CubeVizContext,
  kC as CubeVizProvider,
  _r as DEFAULT_COLOR_RAMP,
  un as DEFAULT_COLS,
  on as DEFAULT_FOOTPRINT,
  ba as DEFAULT_MARK_THEME,
  rr as DEFAULT_TRANSFORM_WINDOW,
  _o as DEFAULT_UNIT_CONVERSIONS,
  lr as DRAG_HANDLE_CLASS,
  NC as Dashboard,
  MC as DashboardEditor,
  ki as DashboardProvider,
  po as DashboardSpecSchema,
  fo as DateRangeSchema,
  Jd as EMPTY_FAMILY_DEFAULT,
  sa as EM_DASH,
  J0 as EditorCanvas,
  M0 as EditorToolbar,
  Si as FamilyRegistryOverride,
  ub as FilterBuilder,
  Vu as FilterOperatorSchema,
  Bu as FormatKindSchema,
  Zo as FormatOptionsSchema,
  $d as GRANULARITY_PATTERN,
  Lu as GranularityChoiceSchema,
  ht as GranularitySchema,
  ad as GridConfigSchema,
  wm as HeatmapChartFamily,
  Xd as HeatmapFamilyOptionsSchema,
  Zu as InputControlKindSchema,
  ed as InputControlSchema,
  sw as InputWidgetEditor,
  rd as InputWidgetSchema,
  Jh as InputWidgetView,
  U0 as InsertLines,
  km as KpiFamily,
  Ud as KpiFamilyOptionsSchema,
  id as LayoutItemSchema,
  zu as LeafFilterSchema,
  Wu as LegendOptionsSchema,
  lm as LineChartFamily,
  jd as LineFamilyOptionsSchema,
  he as MemberSchema,
  ta as OrderDirSchema,
  Gu as OrderSpecSchema,
  mm as PieChartFamily,
  qd as PieFamilyOptionsSchema,
  go as QueryFilterSchema,
  kr as ReferenceLineOptSchema,
  Oo as RenderWidget,
  Kt as SCHEMA_VERSION,
  Du as ScalarSchema,
  gm as ScatterChartFamily,
  Wd as ScatterFamilyOptionsSchema,
  qu as SeriesMappingSchema,
  na as SeriesMetaSchema,
  xs as SpecSchema,
  Kd as TableColumnOptSchema,
  Ef as TableFamily,
  Qd as TableFamilyOptionsSchema,
  ew as TextWidgetEditor,
  nd as TextWidgetSchema,
  Th as TextWidgetView,
  Hu as TimeDimensionSchema,
  Ju as TipTapDocSchema,
  Uu as TooltipOptionsSchema,
  Qu as TransformKindSchema,
  tr as VarRefSchema,
  sd as VariableDeclSchema,
  ks as VariableTypeSchema,
  ws as VariableValueSchema,
  $w as VariablesDock,
  Nl as WidgetChrome,
  Ka as WidgetEditPanel,
  od as WidgetSpecSchema,
  _C as adaptiveGranularity,
  A0 as appendWidget,
  eg as areaChartFamily,
  Ca as assignColors,
  Ci as autoGranularityFor,
  fh as axisKey,
  Jf as barChartFamily,
  yi as buildFamilyRegistry,
  SC as builtinCharts,
  it as builtinFamilyDescriptors,
  xr as builtinFamilyRegistry,
  Vl as canonicalTimeOf,
  _y as collapseFamilies,
  T0 as columnBoundaries,
  G0 as columnBoundaryLeft,
  H0 as columnWidth,
  xd as createCubeClient,
  bw as createIdFactory,
  dl as createQueryResolver,
  fl as createUnitsFormatter,
  Ig as createVariableStore,
  Ad as datePattern,
  ho as deepMerge,
  vi as defaultChartFamilies,
  Nw as defaultForType,
  ti as defaultFormatter,
  V0 as editorGridMetrics,
  mr as familyKeyOf,
  _d as fetchMeta,
  pt as findCube,
  De as findMember,
  wC as formatCategory,
  Yt as formatDateValue,
  by as geoPointId,
  xy as grainAggLabel,
  ll as granularitiesForSpan,
  cl as granularityOptionsFor,
  rg as heatmapChartFamily,
  E0 as insertWidgetAtColumn,
  I0 as insertWidgetAtRow,
  tn as isEmptyValue,
  _e as isVarRef,
  og as kpiChartFamily,
  Zf as lineChartFamily,
  Er as listCubes,
  zt as listMembers,
  Nd as loadSpec,
  Sr as looksLikeIsoDate,
  ni as makeChartFormat,
  bC as makeDateFormatter,
  CC as makeFormatter,
  Mi as memberAgg,
  Sy as memberAggDefault,
  Un as memberCanonicalTime,
  fr as memberFamilyTitle,
  Ll as memberGroup,
  $0 as mergeLayout,
  $r as mergeUnitConversions,
  ww as newChartWidget,
  Sw as newInputWidget,
  Cw as newTextWidget,
  Rw as newVariable,
  kw as newWidget,
  sl as normalize,
  vy as pathLabel,
  F0 as pickCanonicalLayout,
  tg as pieChartFamily,
  O0 as placeNewItem,
  ph as quantityLabel,
  wi as rangeSpanDays,
  Fw as removeVariable,
  B0 as removeWidget,
  Mw as renameVariable,
  q0 as replaceWidget,
  wh as resolveChart,
  ol as resolveMarkTheme,
  sg as resolveOptions,
  Zd as resolveOptionsWith,
  ul as resolveQuery,
  _g as resolveRelativeDateRange,
  al as resolveSeriesColors,
  Fg as resolveValue,
  ji as rowBoundaries,
  Ua as rowBoundaryTop,
  z0 as rowSpanHeight,
  vC as safeLoadSpec,
  ng as scatterChartFamily,
  ig as tableChartFamily,
  _s as toDate,
  vg as toResultAnnotation,
  _w as usageSummary,
  N0 as useChartEditorState,
  Os as useChartInteractions,
  yl as useContainerWidth,
  Nt as useCubeMeta,
  hl as useCubeQuery,
  et as useCubeVizContext,
  vl as useDashboard,
  wc as useDebouncedCallback,
  Ir as useDisplayUnit,
  Rt as useFamilyRegistry,
  RC as useFormatter,
  Zr as useNormalizedSeries,
  Pn as useOptionalDashboard,
  yC as validateSpec,
  xw as variableUsages
};
//# sourceMappingURL=index.js.map
