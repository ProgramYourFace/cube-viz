var wc = Object.defineProperty;
var Cc = (e, t, n) => t in e ? wc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Er = (e, t, n) => Cc(e, typeof t != "symbol" ? t + "" : t, n);
import { z as b } from "zod";
import { jsx as l, jsxs as C, Fragment as Ce } from "react/jsx-runtime";
import * as y from "react";
import { useMemo as ae, createContext as Wa, useContext as jo, useState as Pt, useCallback as ft, useEffect as $n, useRef as _t, createElement as Sc, useSyncExternalStore as qa, useId as kc, Component as Rc } from "react";
import { ruleX as Ua, ruleY as Ka, text as Nn, colorLegend as Bo, group as Nc, stack as xc, barX as Wi, barY as qi, lineX as _c, lineY as pr, defineChart as Ct, areaY as ao, dot as Ya, cell as Mc } from "@tanstack/charts";
import { crosshair as Qa } from "@tanstack/charts/crosshair";
import { scaleBand as Fc } from "@tanstack/charts/scales/band";
import { scaleLinear as Kn } from "@tanstack/charts/scales/linear";
import { scalePoint as $c } from "@tanstack/charts/scales/point";
import { Chart as Ac } from "@tanstack/charts/react/core";
import { motion as Xa } from "@tanstack/charts/motion";
import { tooltip as Wo } from "@tanstack/charts/tooltip";
import { d3Curve as Dr } from "@tanstack/charts/d3/shape";
import { brushX as Oc } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Ic } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Tc, scaleLog as Ui, scaleSqrt as Pc } from "d3-scale";
import { curveNatural as Ec, curveStepAfter as Dc, curveMonotoneX as Lc } from "d3-shape";
import { format as Re, isValid as dn, parseISO as Yn, subDays as $e, startOfWeek as Qn, endOfWeek as Xn, startOfMonth as Mt, endOfMonth as vn, startOfQuarter as Ft, endOfQuarter as yn, startOfYear as $t, endOfYear as bn, subWeeks as so, subMonths as At, subQuarters as Ot, subYears as It, differenceInCalendarDays as Vc, parse as Ja } from "date-fns";
import { clsx as zc } from "clsx";
import * as Oe from "@radix-ui/react-select";
import { Minus as Za, ArrowUp as qo, ArrowDown as Uo, CalendarRange as es, Search as ts, ChevronsUpDown as Hc, AreaChart as Gc, BarChart3 as ns, Grid3X3 as jc, Table as Bc, Gauge as Wc, ScatterChart as qc, PieChart as Uc, LineChart as Kc, AlertCircle as Ko, ChevronLeft as Yo, ChevronRight as hr, ChevronDown as St, Check as nn, ChevronUp as Yc, CalendarIcon as rs, MoreVertical as Qc, RefreshCw as Xc, Image as Jc, Sheet as Zc, ListChecks as eu, Table2 as os, Database as is, Layers as as, Calendar as tu, Type as ss, Hash as Ki, MapPin as nu, Variable as ru, Plus as Et, Trash2 as rn, ListFilter as ou, EyeOff as iu, Eye as au, AlertTriangle as su, GripVertical as lu, X as lo, ArrowLeftRight as cu, Save as ls, Braces as uu, Undo2 as du, Redo2 as mu, RotateCcw as fu, SlidersHorizontal as gu, Pencil as pu, Copy as hu, Bold as vu, Italic as yu, Strikethrough as bu, Heading1 as wu, Heading2 as Cu, List as Su, ListOrdered as ku, Quote as Ru, Box as Nu } from "lucide-react";
import * as Jn from "@radix-ui/react-popover";
import { cva as Qo } from "class-variance-authority";
import xu from "@cubejs-client/core";
import { DayPicker as _u, useDayPicker as Mu } from "react-day-picker";
import { pie as Fu, radialArc as co, radialText as Lr, polar as cs } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as us } from "react-grid-layout";
import { useEditor as ds, EditorContent as ms } from "@tiptap/react";
import fs from "@tiptap/starter-kit";
const qt = 5, Zn = b.object({ var: b.string().min(1) }).strict();
function _e(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const er = (e) => b.union([e, Zn]), $u = b.union([b.string(), b.number(), b.boolean()]), ht = b.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Qt = "auto", Au = b.union([ht, b.literal(Qt)]), uo = b.union([b.tuple([b.string(), b.string()]), b.string()]), gs = b.union([
  b.string(),
  b.number(),
  b.boolean(),
  b.tuple([b.string(), b.string()]),
  // absolute date range
  b.array(b.string()),
  b.array(b.number())
]), pe = b.string().min(1), Ou = b.enum([
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
]), Iu = b.object({
  member: pe,
  operator: Ou,
  values: b.array(b.union([$u, Zn])).optional()
}).strict(), mo = b.lazy(
  () => b.union([
    Iu,
    b.object({ and: b.array(mo) }).strict(),
    b.object({ or: b.array(mo) }).strict()
  ])
), Tu = b.object({
  dimension: pe,
  granularity: er(Au).optional(),
  dateRange: er(uo).optional(),
  compareDateRange: b.array(uo).optional()
}).strict(), Yi = b.enum(["asc", "desc"]), Pu = b.union([
  b.record(pe, Yi),
  b.array(b.tuple([pe, Yi]))
]), ps = b.object({
  measures: b.array(pe).optional(),
  dimensions: b.array(pe).optional(),
  timeDimensions: b.array(Tu).optional(),
  filters: b.array(mo).optional(),
  segments: b.array(pe).optional(),
  order: Pu.optional(),
  limit: er(b.number()).optional(),
  offset: er(b.number()).optional(),
  total: b.boolean().optional(),
  timezone: b.string().optional()
}).strict(), Eu = b.string().min(1), cC = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], vt = b.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Du = b.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Xo = b.object({
  kind: Du.optional(),
  decimals: b.number().optional(),
  abbreviate: b.boolean().optional(),
  prefix: b.string().optional(),
  suffix: b.string().optional(),
  unitSystem: b.enum(["metric", "imperial"]).optional(),
  dateFormat: b.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: b.string().optional()
}).strict(), Qi = b.object({
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
}).strict(), Lu = b.object({
  category: b.object({ member: pe }).strict(),
  series: b.union([
    b.object({
      mode: b.literal("measures"),
      members: b.array(pe),
      meta: b.record(pe, Qi).optional()
    }).strict(),
    b.object({
      mode: b.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: pe,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: b.array(pe).optional(),
      pivot: pe,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: b.record(pe, Qi).optional()
    }).strict()
  ])
}).strict(), Vu = b.object({
  show: b.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: b.enum(["top", "bottom"]).optional()
}).strict(), zu = b.object({
  show: b.boolean().optional(),
  indicator: b.enum(["dot", "line", "dashed"]).optional(),
  showTotal: b.boolean().optional()
}).strict(), Xi = b.object({
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
  tickFormat: Xo.optional()
}).strict(), Hu = b.object({
  x: Xi.optional(),
  y: Xi.optional()
}).strict(), Gu = b.object({
  byKey: b.record(b.string(), vt).optional(),
  ramp: b.array(vt).optional()
}).strict(), tr = 7, ju = b.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Bu = b.object({
  kind: ju,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: b.number().int().min(2).max(90).optional()
}).strict(), hs = b.object({
  family: Eu,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Lu.optional(),
  orientation: b.enum(["vertical", "horizontal"]).optional(),
  stackMode: b.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Vu.optional(),
  tooltip: zu.optional(),
  axes: Hu.optional(),
  colors: Gu.optional(),
  format: Xo.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: Bu.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: b.record(b.string(), b.unknown()).optional()
}).strict(), Wu = b.object({ type: b.string(), content: b.array(b.unknown()).optional() }).passthrough(), qu = b.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Uu = b.object({
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
      options: b.array(b.object({ value: gs, label: b.string() }).strict()),
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
}).strict(), Jo = {
  id: b.string().min(1),
  title: b.string().optional()
}, Ku = b.object({ ...Jo, type: b.literal("chart"), query: ps.default({}), chart: hs }).strict(), Yu = b.object({ ...Jo, type: b.literal("text"), doc: Wu }).strict(), Qu = b.object({ ...Jo, type: b.literal("input"), control: Uu }).strict(), Xu = b.discriminatedUnion("type", [
  Ku,
  Yu,
  Qu
]), Ju = b.object({
  i: b.string(),
  x: b.number(),
  y: b.number(),
  w: b.number(),
  h: b.number(),
  minW: b.number().optional(),
  minH: b.number().optional(),
  static: b.boolean().optional()
}).strict(), Zu = b.object({
  cols: b.number().optional(),
  rowHeight: b.number().optional(),
  margin: b.tuple([b.number(), b.number()]).optional(),
  containerPadding: b.tuple([b.number(), b.number()]).optional()
}).strict(), vs = b.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), ed = b.object({
  name: b.string().min(1),
  type: vs,
  label: b.string().optional(),
  array: b.boolean().optional(),
  default: gs.optional()
}).strict(), ys = {
  schemaVersion: b.literal(qt),
  id: b.string().min(1),
  name: b.string().optional(),
  description: b.string().optional(),
  createdAt: b.string().optional(),
  updatedAt: b.string().optional()
}, bs = b.object({ ...ys, kind: b.literal("chart"), query: ps.default({}), chart: hs }).strict(), fo = b.object({
  ...ys,
  kind: b.literal("dashboard"),
  variables: b.array(ed),
  widgets: b.array(Xu),
  layout: b.array(Ju),
  grid: Zu.optional()
}).strict(), ws = b.discriminatedUnion("kind", [bs, fo]);
function Z(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function rt(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function td(e) {
  if (!Z(e.axes)) return;
  const t = rt(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function nd(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!Z(o)) continue;
    const i = rt(o, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function rd(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => Z(n) ? rt(n, "side") ?? {} : n
  ));
}
function od(e) {
  const t = Z(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(Z) : [];
  e.family = n.some((a) => a.render === "bar") ? "bar" : "line";
  const r = Z(e.mapping) ? e.mapping : void 0, o = r && Z(r.series) ? r.series : void 0, i = (o == null ? void 0 : o.mode) === "measures" && Array.isArray(o.members) ? o.members.filter((a) => typeof a == "string") : [];
  if (o && i.length > 0) {
    const a = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (a[s.member] = { colorToken: s.colorToken });
    if (Object.keys(a).length > 0) {
      const s = Z(o.meta) ? o.meta : {};
      o.meta = { ...a, ...s };
    }
  }
  e.familyOptions = {};
}
function Ji(e) {
  Z(e) && (e.family === "combo" && od(e), td(e), nd(e), rd(e));
}
function id(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ji(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && Ji(n.chart);
  return t;
}
function ad(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!Z(o)) continue;
    const i = rt(o, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function sd(e) {
  if (!Z(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function ld(e) {
  if (Z(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Z(n) || !Array.isArray(n.domain) || n.domain.every((o) => typeof o == "number")) continue;
      const r = rt(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function cd(e) {
  if (!Z(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = rt(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Zi(e) {
  Z(e) && (ad(e), sd(e), ld(e), cd(e));
}
function ud(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Zi(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && Zi(n.chart);
  return t;
}
const dd = {
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
function md(e) {
  if (!Z(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = dd[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const o of n) r = rt(r, o) ?? {};
  e.familyOptions = r;
}
function fd(e) {
  if (Z(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Z(n) || n.labelHide !== !0) continue;
      const r = rt(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function ea(e) {
  Z(e) && (md(e), fd(e));
}
function gd(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ea(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Z(n) && n.type === "chart" && ea(n.chart);
  return t;
}
function pd(e) {
  if (!Z(e.mapping)) return;
  const t = e.mapping.series;
  if (!Z(t) || !Z(t.meta)) return;
  let n;
  const r = {};
  for (const [a, s] of Object.entries(t.meta)) {
    if (!Z(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = rt(s, "curve");
    c && (r[a] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const o = e.family;
  if (n === void 0 || o !== "line" && o !== "area") return;
  const i = Z(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function hd(e) {
  const t = structuredClone(e), n = (r) => {
    Z(r) && pd(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      Z(r) && r.type === "chart" && n(r.chart);
  return t;
}
const vd = {
  1: id,
  2: ud,
  3: gd,
  4: hd
};
function yd(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > qt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${qt} — update the library`
    );
  for (; n < qt; ) {
    const r = vd[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return ws.parse(t);
}
function uC(e) {
  try {
    return { ok: !0, spec: yd(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function dC(e) {
  return ws.parse(e);
}
function bd(e) {
  return xu(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function wd(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function I(...e) {
  return zc(e);
}
function Cd({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: I("cv-skeleton", e), ...t });
}
const Sd = Qo(
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
), vr = y.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: I(Sd({ variant: t }), e),
    ...n
  }
));
vr.displayName = "Alert";
const yr = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: I("cv-alert-title", e),
      ...t
    }
  )
);
yr.displayName = "AlertTitle";
const br = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: I("cv-alert-description", e),
      ...t
    }
  )
);
br.displayName = "AlertDescription";
const kd = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Rd = "MMM d, yyyy";
function Cs(e) {
  if (e instanceof Date) return dn(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return dn(r) ? r : null;
  }
  const t = Yn(e);
  if (dn(t)) return t;
  const n = new Date(e);
  return dn(n) ? n : null;
}
function wr(e) {
  return /^\d{4}-\d{2}/.test(e) ? dn(Yn(e)) : !1;
}
function Nd(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? kd[t] : Rd;
}
function Ut(e, t, n) {
  const r = Cs(e);
  return r ? Re(r, Nd(t, n)) : String(e);
}
function mC(e, t) {
  return (n) => n == null ? "" : Ut(n, e, t);
}
function fC(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ut(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ut(e, t.format, t.granularity) : String(e) : wr(e) ? Ut(e, t.format, t.granularity) : e;
}
const ta = "—", xd = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function na(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function _d(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: o } of xd)
    if (n >= r) return na((e / r).toFixed(t)) + o;
  return na(e.toFixed(t));
}
function Md(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Fd(e, t) {
  const { format: n, meta: r, locale: o } = t, i = n != null && n.abbreviate ? _d(e, n.decimals ?? 1) : Md(e, n, o), a = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${a ? ` ${a}` : ""}`;
}
function Ss(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function $d(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ss(e.value) ? !0 : typeof e.value == "string" ? wr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Zo = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? ta : (Ss(t) || typeof t == "string" || typeof t == "number") && $d(e) ? Ut(t, n, r) : typeof t == "number" ? Fd(t, e) : String(t);
};
function Ad(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function gC(e, t) {
  return (n, r) => {
    const o = r ? Ad(r, t) : void 0;
    return Zo({
      value: n,
      meta: o == null ? void 0 : o.meta,
      title: (o == null ? void 0 : o.shortTitle) ?? (o == null ? void 0 : o.title),
      role: "value",
      format: e
    });
  };
}
function Od(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Id(e) {
  const t = ht.safeParse(e);
  return t.success ? t.data : void 0;
}
function Td(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const o of Object.keys(e.timeDimensions))
      if (o !== n && o.startsWith(`${n}.`)) {
        const i = Id(o.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function ei(e, t, n, r) {
  const o = Td(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (a) => !a || Object.keys(a).length === 0 ? i : ei(
      e,
      { ...t, format: { ...t.format, ...a } },
      n,
      r
    ),
    value(a, s, c = "value") {
      const u = s ? Od(s, e) : void 0, m = u == null ? void 0 : u.meta;
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
const Cr = b.object({
  axis: b.enum(["x", "y"]),
  value: b.number(),
  label: b.string().optional(),
  colorToken: vt.optional()
}).strict(), ti = b.boolean().optional(), Pd = b.object({
  showValueLabels: b.boolean().optional(),
  referenceLines: b.array(Cr).optional(),
  comparePrevious: ti
}).strict(), ks = b.enum(["linear", "monotone", "step", "natural"]), Ed = b.object({
  curve: ks.optional(),
  dots: b.union([b.boolean(), b.literal("active")]).optional(),
  connectNulls: b.boolean().optional(),
  chrome: b.enum(["full", "none"]).optional(),
  referenceLines: b.array(Cr).optional(),
  showValueLabels: b.boolean().optional(),
  comparePrevious: ti
}).strict(), Dd = b.object({
  curve: ks.optional(),
  connectNulls: b.boolean().optional(),
  dots: b.boolean().optional(),
  referenceLines: b.array(Cr).optional(),
  comparePrevious: ti
}).strict(), Ld = b.object({
  innerRadiusPct: b.number().optional(),
  showLabels: b.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: b.object({ value: b.string().optional(), label: b.string().optional() }).strict().optional(),
  maxSlices: b.number().optional()
}).strict(), Vd = b.object({
  x: pe,
  y: pe,
  size: pe.optional(),
  groupBy: pe.optional(),
  referenceLines: b.array(Cr).optional()
}).strict(), zd = b.object({
  display: b.enum(["number", "gauge"]).optional(),
  measure: pe,
  comparison: b.object({
    mode: b.enum(["previousPeriod", "value"]),
    value: b.union([pe, b.number()]).optional(),
    showAsPercent: b.boolean().optional(),
    goodDirection: b.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: b.object({
    member: pe.optional(),
    timeDimension: pe.optional(),
    granularity: b.union([ht, Zn]).optional(),
    dateRange: b.union([uo, Zn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: b.enum(["up", "down"]).optional(),
  gauge: b.object({
    min: b.number().optional(),
    max: b.number(),
    thresholds: b.array(b.object({ at: b.number(), colorToken: vt }).strict()).optional()
  }).strict().optional()
}).strict(), Hd = b.object({
  member: pe,
  label: b.string().optional(),
  format: Xo.optional(),
  align: b.enum(["left", "right", "center"]).optional(),
  width: b.number().optional(),
  hidden: b.boolean().optional()
}).strict(), Gd = b.object({
  member: pe,
  when: b.object({
    op: b.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: b.number()
  }).strict(),
  colorToken: vt.optional()
}).strict(), jd = b.object({
  columns: b.array(Hd).optional(),
  pageSize: b.number().optional(),
  conditionalFormat: b.array(Gd).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), Bd = b.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: vt.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), st = {
  bar: Pd,
  line: Ed,
  area: Dd,
  pie: Ld,
  scatter: Vd,
  heatmap: Bd,
  kpi: zd,
  table: jd
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
function ra(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function go(e, t) {
  if (t === void 0) return e;
  if (!ra(e) || !ra(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const o = t[r];
    o !== void 0 && (n[r] = r in e ? go(e[r], o) : o);
  }
  return n;
}
const Wd = { envelope: {}, familyOptions: {} };
function qd(e, t) {
  return {
    ...go({ ...t.envelope }, e),
    familyOptions: go(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Rs = {}, oa = () => {
}, Ud = {
  target: Rs,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: oa,
  emitPoint: oa
}, nr = y.createContext(null);
nr.displayName = "ChartInteractionContext";
function Ns() {
  return y.useContext(nr) ?? Ud;
}
function ni({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: o
}) {
  const i = y.useContext(nr), a = y.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
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
    () => f || r ? { ...f, ...r } : Rs,
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
  return /* @__PURE__ */ l(nr.Provider, { value: d, children: o });
}
function Tt(e, t) {
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
function po(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function xs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = po(n), o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function rr(e, t, n) {
  const r = [];
  return e.categories.forEach((o, i) => {
    var m, f, g;
    const a = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const d of t) {
      const p = d.data[i];
      if (typeof p == "number" && Number.isFinite(p)) {
        const h = po(d);
        s.set(h, (s.get(h) ?? 0) + Math.abs(p));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const d of t) {
      const p = d.data[i] ?? null, h = po(d), v = s.get(h) ?? 0, w = p === null || v === 0 ? null : Math.abs(p) / v;
      let S = 0, _ = 0;
      if (p !== null) {
        const R = p < 0 ? u : c;
        S = R.get(h) ?? 0, _ = S + p, R.set(h, _);
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
        y2: _ * k,
        share: w
      });
    }
  }), r;
}
function ho(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((o) => o.startsWith(r)) ?? t;
}
function xn(e) {
  return e.label || e.key;
}
function dt(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ri(e, t) {
  const n = e.series.map(xn), r = e.series.map(dt), o = { domain: n, range: r };
  return t != null && t.legend && (o.legend = Bo({ placement: on(t.legendPlacement) })), o;
}
function on(e) {
  return e === "top" ? "top" : "bottom";
}
function An(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function or(e = 0.2) {
  return Fc().padding(e);
}
function _s() {
  return $c().padding(0.02);
}
const Kd = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Yd(e) {
  if (typeof e == "string" && Kd.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return Cs(e);
}
function Ms(e) {
  return e.toISOString().slice(0, -1);
}
function ia(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = ht.safeParse(n);
  return r.success ? r.data : void 0;
}
function Fs(e, t) {
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
  const i = o === n ? ia(n) : ia(o, n), a = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const d of e.categories) {
    if (typeof d == "number" && i === void 0 || typeof d == "string" && !wr(d)) return null;
    const p = Yd(d);
    if (!p) return null;
    s.push(p);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((d) => c.has(d.getTime()) ? !1 : (c.add(d.getTime()), !0)).sort((d, p) => d.getTime() - p.getTime());
  return u.length < 2 ? null : { member: a, granularity: i, dates: s, categories: e.categories, values: u };
}
function $s(e) {
  return e ? Tc : _s;
}
function oi(e) {
  return e ? "t" : "cat";
}
function ir(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, o) => {
    const i = e.categories[o];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? Ms(r)) : t.category(r);
}
function aa(e, t) {
  const n = e.dates.findIndex((o) => o.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : Ms(t);
}
function As(e, t) {
  const n = Ns(), [r, o] = y.useState(null), i = y.useRef({ opts: t, interactions: n, temporal: e });
  y.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const a = n.rangeEnabled && e !== null;
  return y.useMemo(() => {
    if (!a || !e) return;
    const s = e.values, c = (d) => d !== void 0 && s.some((p) => p.getTime() === d.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], f = u ?? { start: m, end: m }, g = u === null;
    return [
      Oc({
        id: "cv-brush-x",
        values: s,
        range: Ic(
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
              from: aa(h, d.start),
              to: aa(h, d.end)
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
function Qd(e, t) {
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
function Xt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const o = () => r ? Ui().domain(r) : Ui();
    return { scale: r ? o() : o, nice: !r };
  }
  return r ? { scale: Kn().domain(r), nice: !1 } : { scale: Kn, nice: !0 };
}
function Os(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function _n(e) {
  switch (e) {
    case "monotone":
      return Dr(Lc);
    case "step":
      return Dr(Dc);
    case "natural":
      return Dr(Ec);
    default:
      return;
  }
}
function Jt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ii(e, t) {
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
    x: Jt((a = t.axes) == null ? void 0 : a.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Jt((u = t.axes) == null ? void 0 : u.y, i(o))
  };
}
function Je(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function ai(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Xd(e) {
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
function si(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Sr(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Wo,
    className: si(e.indicator),
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
function li(e) {
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
function ci(e, t, n) {
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
      f ? Ua([g], { id: `cv-ref-${a}`, ...c }) : Ka([g], { id: `cv-ref-${a}`, ...c })
    ), !i.label) return;
    const d = u ? n == null ? void 0 : n.valueAnchor : o;
    if (d == null) return;
    const p = (n == null ? void 0 : n.swap) === !0;
    r.push(
      li(
        Nn(
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
function ui(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function Is(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const o = oi((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, a = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? yt(c, n.locale) : "";
  };
  return [
    li(
      Nn(r, {
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
const Jd = Xa({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), Zd = Xa({ initial: !1 });
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
  const c = y.useRef(null), u = Ns(), m = u.pointEnabled && !r, f = y.useRef(s);
  y.useLayoutEffect(() => {
    f.current = s;
  });
  const g = y.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const S = f.current, _ = S ? S(w) : Qd(w, u.target);
      _ && u.emitPoint(_);
    },
    [u]
  ), [d, p] = y.useState({ w: 0, h: 0 }), h = y.useId().replace(/:/g, "");
  y.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((_) => {
      var R;
      const k = (R = _[0]) == null ? void 0 : R.contentRect;
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
        Ac,
        {
          definition: e,
          renderer: o ? Jd : Zd,
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
function em({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = y.useMemo(() => {
    var J, ee, ue, me, se, te, ye, G, oe, de, T, M;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, m = e.series.filter((x) => {
      var A;
      return (A = x.meta) == null ? void 0 : A.companion;
    }), f = m.length ? e.series.filter((x) => {
      var A;
      return !((A = x.meta) != null && A.companion);
    }) : e.series, g = u ? f : e.series, p = (u ? xs(g) : []).length > 1, h = p ? rr(e, g, { normalize: c }) : Tt(e, { series: g }), v = new Map(e.series.map((x) => [xn(x), dt(x)])), w = /* @__PURE__ */ new Map();
    if (p)
      for (const x of h) {
        const A = w.get(x.i);
        A ? A.push(x) : w.set(x.i, [x]);
      }
    const S = ii(e, t), _ = s ? (ee = (J = t.axes) == null ? void 0 : J.y) == null ? void 0 : ee.hide : (me = (ue = t.axes) == null ? void 0 : ue.x) == null ? void 0 : me.hide, k = s ? (se = t.axes) == null ? void 0 : se.x : (te = t.axes) == null ? void 0 : te.y, R = Xt(k), N = r.barCategoryGap, F = s ? (ye = t.axes) == null ? void 0 : ye.y : (G = t.axes) == null ? void 0 : G.x, L = Je(n, F), V = Je(n, k), O = Xd(t) ?? ai(e.series[0]), $ = (x) => c ? yt(x) : V.value(x, O, "axis"), P = _ ? !1 : {
      label: S.x,
      ticks: { format: (x) => L.category(x) }
    }, E = k != null && k.hide ? !1 : { label: S.y, ticks: { format: $ } }, z = Nc({ padding: r.barGap }), H = p ? z : c ? xc({ offset: "normalize" }) : u ? void 0 : z, D = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (x) => p ? x.stack : x.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (x) => `${x.label} ${x.i}`,
      layout: H,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (x) => {
        const A = v.get(x.label) ?? "var(--chart-1)";
        return x.companion ? `color-mix(in oklab, ${A} 40%, transparent)` : A;
      }
    }, X = [
      p ? s ? Wi(h, { ...D, x1: "y1", x2: "y2", y: "cat" }) : qi(h, { ...D, x: "cat", y1: "y1", y2: "y2" }) : s ? Wi(h, { ...D, x: "value", y: "cat" }) : qi(h, { ...D, x: "cat", y: "value" })
    ];
    if (u && !c && m.length) {
      const x = e.categories.map((A, j) => {
        var W, K, ne;
        return {
          cat: typeof A == "number" ? A : String(A),
          value: m.reduce((Se, ke) => {
            const Q = ke.data[j];
            return typeof Q != "number" ? Se : (Se ?? 0) + Q;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((K = (W = m[0]) == null ? void 0 : W.meta) == null ? void 0 : K.measure) ?? ((ne = m[0]) == null ? void 0 : ne.key),
          companion: !0,
          i: j
        };
      });
      if (x.some((A) => A.value !== null)) {
        const A = {
          id: "cv-bars-prev",
          key: (j) => `prev ${j.i}`,
          curve: _n("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        X.push(
          s ? _c(x, { ...A, x: "value", y: "cat" }) : pr(x, { ...A, x: "cat", y: "value" })
        );
      }
    }
    if (X.push(
      ...ci(o.referenceLines, e.categories, {
        swap: s,
        valueAnchor: ui(e)
      })
    ), o.showValueLabels) {
      const x = u ? p ? h : rr(e, g, { normalize: c }) : h;
      X.push(
        ...Is(x, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return Ct({
      marks: X,
      x: s ? { scale: R.scale, nice: R.nice, grid: !0, axis: E } : { scale: () => or(N), axis: P },
      y: s ? { scale: () => or(N), axis: P } : { scale: R.scale, nice: R.nice, grid: !0, axis: E },
      color: ri(u ? { ...e, series: g } : e, {
        legend: An(t) && g.length > 1,
        legendPlacement: on((oe = t.legend) == null ? void 0 : oe.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((de = t.tooltip) == null ? void 0 : de.show) === !1 ? void 0 : Sr({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !p,
        value: c && p ? (x) => {
          const A = x.share;
          return typeof A == "number" ? yt(A) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: p ? (x) => w.get(x.i) ?? [x] : void 0,
        colorOf: p ? (x) => v.get(x.label) ?? "var(--chart-1)" : void 0,
        indicator: (T = t.tooltip) == null ? void 0 : T.indicator,
        showTotal: (M = t.tooltip) == null ? void 0 : M.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, o, r]), a = e.series.map(xn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(kt, { definition: i, ariaLabel: a, className: "cv-chart--fill" });
}
function tm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var d;
  const o = t.familyOptions ?? {}, i = o.chrome === "none", a = y.useMemo(
    () => i ? null : Fs(e, t),
    [e, t, i]
  ), s = y.useMemo(() => ir(a, n), [a, n]), c = (d = t.axes) == null ? void 0 : d.x, u = y.useMemo(
    () => c != null && c.tickFormat ? ir(a, Je(n, c)) : s,
    [a, n, c, s]
  ), m = As(a, {
    label: s,
    ariaLabel: "Time range"
  }), f = y.useMemo(() => {
    var N, F, L, V, O, $, P, E, z;
    const p = oi(a), h = o.connectNulls ?? !1, v = o.curve ?? "monotone", w = _n(v), S = ii(e, t), _ = Xt((N = t.axes) == null ? void 0 : N.y), k = e.categories.length <= 1, R = e.series.map((H) => {
      var X, J, ee;
      const D = Tt(e, { series: [H], skipNull: h, temporal: a });
      return pr(D, {
        id: `cv-line-${H.key}`,
        x: p,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (X = H.meta) != null && X.companion ? "5 4" : void 0,
        strokeOpacity: (J = H.meta) != null && J.companion ? 0.55 : void 0,
        stroke: dt(H),
        points: !i && !((ee = H.meta) != null && ee.companion) && (Os(H, o.dots) || k)
      });
    });
    return i || (R.push(
      ...ci(o.referenceLines, (a == null ? void 0 : a.dates) ?? e.categories, {
        valueAnchor: ui(e)
      }),
      ...Is(
        o.showValueLabels ? Tt(e, { skipNull: !0, temporal: a }) : [],
        n,
        { temporal: a }
      )
    ), R.push(Qa({ x: {}, y: !1, marker: o.dots !== !1 }))), Ct({
      marks: R,
      x: {
        scale: $s(a),
        axis: i || (L = (F = t.axes) == null ? void 0 : F.x) != null && L.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: _.scale,
        nice: _.nice,
        grid: !i,
        axis: i || (O = (V = t.axes) == null ? void 0 : V.y) != null && O.hide ? !1 : {
          label: S.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (H) => {
              var D, X, J, ee;
              return Je(n, (D = t.axes) == null ? void 0 : D.y).value(
                H,
                ((J = (X = e.series[0]) == null ? void 0 : X.meta) == null ? void 0 : J.measure) ?? ((ee = e.series[0]) == null ? void 0 : ee.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ri(e, {
        legend: !i && An(t) && e.series.length > 1,
        legendPlacement: on(($ = t.legend) == null ? void 0 : $.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((P = t.tooltip) == null ? void 0 : P.show) === !1 ? void 0 : Sr({
        format: n,
        category: s,
        indicator: (E = t.tooltip) == null ? void 0 : E.indicator,
        showTotal: (z = t.tooltip) == null ? void 0 : z.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, o, r, i, a, s, u, m]), g = e.series.map(xn).join(", ") || "Line chart";
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
function nm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var v, w, S;
  const o = t.familyOptions ?? {}, i = ((w = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : w.mode) === "pivot", a = t.stackMode ?? (i ? "stacked" : "none"), s = a === "stacked" || a === "percent", c = a === "percent", u = y.useMemo(() => Fs(e, t), [e, t]), m = y.useMemo(() => ir(u, n), [u, n]), f = (S = t.axes) == null ? void 0 : S.x, g = y.useMemo(
    () => f != null && f.tickFormat ? ir(u, Je(n, f)) : m,
    [u, n, f, m]
  ), d = As(u, { label: m, ariaLabel: "Time range" }), p = y.useMemo(() => {
    var ue, me, se, te, ye, G, oe, de, T;
    const _ = oi(u), k = o.connectNulls ?? !1, R = o.curve ?? "monotone", N = _n(R), F = r.areaFillOpacity, L = r.stackedAreaFillOpacity, V = r.lineWidth, O = ii(e, t), $ = Xt((ue = t.axes) == null ? void 0 : ue.y), P = ai(e.series[0]), E = e.series.filter((M) => {
      var x;
      return !((x = M.meta) != null && x.companion);
    }), z = c ? [] : e.series.filter((M) => {
      var x;
      return (x = M.meta) == null ? void 0 : x.companion;
    }), H = new Map(e.series.map((M) => [M.key, dt(M)])), D = [], X = (M) => `cv-area-fill-${M.replace(/[^a-zA-Z0-9_-]/g, "-")}`, J = s ? void 0 : E.map((M) => ({
      id: X(M.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: dt(M), opacity: F * 0.15 },
        { offset: 1, color: dt(M), opacity: F }
      ]
    }));
    if (s)
      for (const { stackId: M, series: x } of xs(E)) {
        const A = rr(e, x, { normalize: c, temporal: u }).filter(
          // `connectNulls` drops the null rows so the curve bridges the gap; otherwise a
          // null row stays and breaks the segment (the mark skips a non-finite `y`).
          (j) => !(k && j.value === null)
        );
        D.push(
          ao(A, {
            id: M ? `cv-area-stack-${M}` : "cv-area-stack",
            x: _,
            // `y` stays the RAW value (what the tooltip/focus reads); the explicit
            // interval carries the stacking.
            y: "value",
            y1: "y1",
            y2: "y2",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (j) => `${j.key}:${j.i}`,
            curve: N,
            fillOpacity: L,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (j) => H.get(j.key) ?? "currentColor",
            strokeWidth: V
          })
        );
      }
    else
      for (const M of E) {
        const x = Tt(e, { series: [M], skipNull: k, temporal: u });
        D.push(
          ao(x, {
            id: `cv-area-${M.key}`,
            x: _,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: N,
            fill: `url(#${X(M.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: dt(M),
            strokeWidth: V
          })
        );
      }
    for (const M of z) {
      const x = Tt(e, { series: [M], skipNull: k, temporal: u });
      D.push(
        pr(x, {
          id: `cv-area-prev-${M.key}`,
          x: _,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: N,
          strokeWidth: V,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: dt(M)
        })
      );
    }
    const ee = new Set(
      E.filter((M) => Os(M, o.dots)).map((M) => M.key)
    );
    if (ee.size > 0) {
      const M = s ? rr(e, E, { normalize: c, temporal: u }).filter(
        (x) => ee.has(x.key) && x.value !== null
      ) : Tt(e, {
        series: E.filter((x) => ee.has(x.key)),
        skipNull: !0,
        temporal: u
      });
      D.push(
        Ya(M, {
          id: "cv-area-dots",
          x: _,
          y: (x) => s ? x.y2 ?? null : x.value,
          z: "label",
          color: "label",
          key: (x) => `${x.key}:${x.i}`,
          r: 3
        })
      );
    }
    return D.push(
      ...ci(o.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: ui(e)
      })
    ), D.push(Qa({ x: {}, y: !1, marker: !0 })), Ct({
      marks: D,
      gradients: J,
      x: {
        scale: $s(u),
        axis: (se = (me = t.axes) == null ? void 0 : me.x) != null && se.hide ? !1 : {
          label: O.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: $.scale,
        nice: $.nice,
        grid: !0,
        axis: (ye = (te = t.axes) == null ? void 0 : te.y) != null && ye.hide ? !1 : {
          label: O.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (M) => {
              var x;
              return c ? yt(M) : Je(n, (x = t.axes) == null ? void 0 : x.y).value(M, P, "axis");
            }
          }
        }
      },
      color: ri(e, {
        legend: An(t) && e.series.length > 1,
        legendPlacement: on((G = t.legend) == null ? void 0 : G.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : Sr({
        format: n,
        percentShare: c,
        category: m,
        indicator: (de = t.tooltip) == null ? void 0 : de.indicator,
        showTotal: (T = t.tooltip) == null ? void 0 : T.showTotal
      }),
      keyboard: !0,
      controls: d
    });
  }, [e, t, n, o, r, s, c, u, m, g, d]), h = e.series.map(xn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(kt, { definition: p, ariaLabel: h, className: "cv-chart--fill" });
}
const rm = 0.26, om = 0.03, sa = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function im({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var p, h;
  const o = t.familyOptions ?? {}, i = e.series[0], a = ai(i), s = (h = (p = t.colors) == null ? void 0 : p.ramp) != null && h.length ? t.colors.ramp : Nr, c = y.useMemo(() => {
    const v = e.categories.map((w, S) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[S]) ?? 0
    }));
    return am(v, o.maxSlices).map((w, S) => ({
      ...w,
      token: s[S % s.length]
    }));
  }, [e, n, i, o.maxSlices, s]), u = c.reduce((v, w) => v + w.value, 0), m = c.some((v) => v.value < 0), f = m || c.length === 0 || u <= 0, g = y.useMemo(() => {
    var O, $, P;
    if (f) return null;
    const v = (o.innerRadiusPct ?? 0) / 100, w = v > 0, S = o.showLabels ?? "percent", _ = S !== "none", k = _ ? Math.min(r.pieRadiusPct / 100, 1 - rm) : r.pieRadiusPct / 100, R = Fu(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), F = [co(R, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: E }) => E * v,
      outerRadius: ({ radius: E }) => E * k,
      cornerRadius: r.pieCornerRadius
    })];
    if (_) {
      const E = (z) => S === "name" ? z.label : S === "value" ? n.value(z.value, a, "label") : yt(z.fraction);
      F.push(
        Lr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          R.filter((z) => z.value > 0 && z.fraction >= om),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (z) => z.angle,
            radius: k,
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
    if (w && o.centerLabel) {
      const E = o.centerLabel.value === void 0 || o.centerLabel.value === "total" ? n.value(u, a, "label") : o.centerLabel.value;
      if (F.push(
        Lr([{ id: "cv-pie-center" }], {
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
      ), o.centerLabel.label) {
        const z = o.centerLabel.label;
        F.push(
          Lr([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => z,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const L = {
      domain: c.map((E) => E.label),
      range: c.map((E) => `var(--${E.token})`)
    };
    An(t) && (L.legend = Bo({ placement: on((O = t.legend) == null ? void 0 : O.position) }));
    const V = i ? i.label || i.key : "";
    return Ct({
      marks: [
        cs({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Kn().domain([0, Math.PI * 2]) },
          radius: { scale: Kn().domain([0, 1]) },
          marks: F
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: L,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: (($ = t.tooltip) == null ? void 0 : $.show) === !1 ? void 0 : {
        use: Wo,
        className: si((P = t.tooltip) == null ? void 0 : P.indicator),
        content: (E) => {
          const z = E[0];
          if (!z) return { rows: [] };
          const H = z.datum;
          return {
            title: H.label,
            rows: [
              {
                label: V,
                value: `${n.value(H.value, a, "tooltip")} (${yt(H.fraction)})`,
                color: z.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [f, c, u, t, n, o, r, i, a]);
  if (m)
    return /* @__PURE__ */ l("div", { style: sa, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: sa, children: "No data" });
  const d = c.map((v) => v.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(kt, { definition: g, ariaLabel: d, className: "cv-chart--fill" });
}
function am(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, a) => a.value - i.value), r = n.slice(0, t - 1), o = n.slice(t - 1);
  return [...r, { label: "Other", value: o.reduce((i, a) => i + a.value, 0) }];
}
function sm({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = e.raw.annotation, a = (d) => {
    var p, h;
    return ((p = i == null ? void 0 : i.measures[d]) == null ? void 0 : p.shortTitle) ?? ((h = i == null ? void 0 : i.dimensions[d]) == null ? void 0 : h.shortTitle) ?? d;
  }, s = o.x ? a(o.x) : "x", c = o.y ? a(o.y) : "y", u = o.size ? a(o.size) : void 0, m = y.useMemo(() => {
    var H, D, X, J, ee, ue, me, se, te, ye, G, oe, de, T;
    if (!o.x || !o.y) return null;
    const d = cm(e.raw.rows, o);
    if (d.length === 0) return null;
    const p = !!o.groupBy, h = [];
    if (p)
      for (const M of d)
        M.group !== void 0 && !h.includes(M.group) && h.push(M.group);
    const [v, w] = r.bubbleAreaRange, S = Math.sqrt(Math.max(v, 0) / Math.PI), _ = Math.sqrt(Math.max(w, 0) / Math.PI), k = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, R = (D = (H = t.colors) == null ? void 0 : H.ramp) != null && D.length ? t.colors.ramp : Nr;
    p ? (k.z = "group", k.color = "group") : k.fill = `var(--${R[0]})`, o.size ? (k.r = (M) => M.size ?? 0, k.rScale = { scale: () => Pc().range([S, _]) }) : k.r = 4;
    const N = [Ya(d, k)];
    (X = o.referenceLines) == null || X.forEach((M, x) => {
      const A = `var(--${M.colorToken ?? "muted-foreground"})`, j = { stroke: A, strokeWidth: 1.25, strokeDasharray: "4 4" };
      M.axis === "y" ? (N.push(Ka([M.value], { id: `cv-ref-${x}`, ...j })), M.label && N.push(
        Nn([{ v: M.value, label: M.label }], {
          id: `cv-ref-label-${x}`,
          y: "v",
          text: "label",
          fill: A,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (N.push(Ua([M.value], { id: `cv-ref-${x}`, ...j })), M.label && N.push(
        Nn([{ v: M.value, label: M.label }], {
          id: `cv-ref-label-${x}`,
          x: "v",
          text: "label",
          fill: A,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let F;
    p && (F = {
      domain: h,
      range: h.map((M, x) => `var(--${R[x % R.length]})`)
    }, An(t) && (F.legend = Bo({ placement: on((J = t.legend) == null ? void 0 : J.position) })));
    const L = Jt((ee = t.axes) == null ? void 0 : ee.x, s), V = Jt((ue = t.axes) == null ? void 0 : ue.y, c), O = Xt((me = t.axes) == null ? void 0 : me.x), $ = Xt((se = t.axes) == null ? void 0 : se.y), P = o.x, E = o.y, z = o.size;
    return Ct({
      marks: N,
      x: {
        scale: O.scale,
        nice: O.nice,
        grid: !0,
        axis: (ye = (te = t.axes) == null ? void 0 : te.x) != null && ye.hide ? !1 : {
          label: L,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (M) => {
              var x;
              return Je(n, (x = t.axes) == null ? void 0 : x.x).value(M, P, "axis");
            }
          }
        }
      },
      y: {
        scale: $.scale,
        nice: $.nice,
        grid: !0,
        axis: (oe = (G = t.axes) == null ? void 0 : G.y) != null && oe.hide ? !1 : {
          label: V,
          ticks: {
            format: (M) => {
              var x;
              return Je(n, (x = t.axes) == null ? void 0 : x.y).value(M, E, "axis");
            }
          }
        }
      },
      color: F,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((de = t.tooltip) == null ? void 0 : de.show) === !1 ? void 0 : {
        use: Wo,
        className: si((T = t.tooltip) == null ? void 0 : T.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (M) => {
          const A = M[0];
          if (!A) return { rows: [] };
          const j = A.datum, W = [
            { label: s, value: n.value(j.x, P, "tooltip") },
            { label: c, value: n.value(j.y, E, "tooltip") }
          ];
          return z && W.push({
            label: u ?? z,
            value: n.value(j.size, z, "tooltip")
          }), { title: j.group, color: A.color, rows: W };
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
  ) : /* @__PURE__ */ l("div", { style: lm, children: "No data" });
}
const lm = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function cm(e, t) {
  const n = [];
  return e.forEach((r, o) => {
    const i = Vr(r[t.x]), a = Vr(r[t.y]);
    i === null || a === null || n.push({
      x: i,
      y: a,
      size: t.size ? Vr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: o
    });
  }), n;
}
function Vr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function um(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function dm(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function mm(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Ts(e, t, n) {
  const r = (o) => {
    const i = typeof o == "number" ? o : Number(o), a = Number.isFinite(i) ? mm(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(a * 100)}%, transparent)`;
  };
  return r.copy = () => Ts(e, t, n), r;
}
function fm({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: o, y: i, value: a } = um(t), s = e.raw.rows, c = e.raw.annotation, u = y.useMemo(() => {
    if (!o || !i || !a || s.length === 0) return [];
    const g = ho(s, o), d = ho(s, i), p = /* @__PURE__ */ new Map();
    return s.forEach((h, v) => {
      const w = dm(h[a]), S = h[g], _ = h[d];
      if (w === null || S === null || S === void 0 || _ === null || _ === void 0)
        return;
      const k = typeof S == "number" ? S : String(S), R = String(_);
      p.set(`${k}\0${R}`, {
        cat: k,
        label: R,
        value: w,
        key: `${k}|${R}`,
        member: a,
        i: v
      });
    }), [...p.values()];
  }, [s, o, i, a]), m = y.useMemo(() => {
    var S, _, k, R, N, F, L, V;
    let g = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY;
    for (const O of u)
      O.value < g && (g = O.value), O.value > d && (d = O.value);
    const p = (O) => {
      if (!O) return;
      const $ = (c == null ? void 0 : c.dimensions[O]) ?? (c == null ? void 0 : c.timeDimensions[O]) ?? (c == null ? void 0 : c.measures[O]);
      return ($ == null ? void 0 : $.shortTitle) ?? ($ == null ? void 0 : $.title) ?? O;
    }, h = Jt((S = t.axes) == null ? void 0 : S.x, p(o)), v = Jt((_ = t.axes) == null ? void 0 : _.y, p(i)), w = [
      Mc(u, {
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
      li(
        Nn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (O) => n.value(O.value, O.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), Ct({
      marks: w,
      x: {
        scale: () => or(0.05),
        axis: (R = (k = t.axes) == null ? void 0 : k.x) != null && R.hide ? !1 : {
          label: h,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (O) => {
              var $;
              return Je(n, ($ = t.axes) == null ? void 0 : $.x).category(O);
            }
          }
        }
      },
      y: {
        scale: () => or(0.05),
        axis: (F = (N = t.axes) == null ? void 0 : N.y) != null && F.hide ? !1 : {
          label: v,
          ticks: {
            format: (O) => {
              var $;
              return Je(n, ($ = t.axes) == null ? void 0 : $.y).category(O);
            }
          }
        }
      },
      color: {
        scale: Ts(g, d, r.colorToken ?? "chart-1")
      },
      tooltip: ((L = t.tooltip) == null ? void 0 : L.show) === !1 ? void 0 : Sr({ format: n, indicator: (V = t.tooltip) == null ? void 0 : V.indicator })
    });
  }, [u, t, n, r, c, o, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const f = `Heatmap of ${a ?? "value"} by ${o ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(kt, { definition: m, ariaLabel: f, className: "cv-chart--fill" });
}
function gm(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function pm(e) {
  return `cv-kpi-trend--${e}`;
}
function hm(e) {
  var c, u, m, f;
  const { data: t, options: n, format: r } = e, o = n.familyOptions ?? {}, i = (g) => r.value(g, o.measure, "kpi"), a = Ps([t.raw.rows[0] ?? {}], o.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[o.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[o.measure]) == null ? void 0 : f.title) ?? o.measure;
  return o.display === "gauge" ? /* @__PURE__ */ l(Nm, { value: a, label: s, fmt: i, fo: o }) : /* @__PURE__ */ l(vm, { ...e, value: a, label: s, fo: o, fmt: i });
}
function vm({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const o = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : _m(e.raw.rows, t, n), a = !!n.comparison, s = a && !i && ym(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((d) => d !== null), m = i ? i.diff : c ? Sm(c) : 0, f = pm(gm(m, o));
  return /* @__PURE__ */ C("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ C("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      a && (i ? /* @__PURE__ */ l(km, { delta: i, goodDirection: o, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(bm, {}) : /* @__PURE__ */ l(wm, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Cm, { data: e, series: c, colorClass: f }) })
  ] });
}
function ym(e, t) {
  var r, o, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (o = e.timeDimensions) == null ? void 0 : o[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((a) => !a) : String(n).trim() === "";
}
function bm() {
  return /* @__PURE__ */ C(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(es, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function wm() {
  return /* @__PURE__ */ C("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Za, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Cm({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = y.useMemo(() => {
    const o = Tt(e, { series: [t], skipNull: !0 }), i = Xt(void 0);
    return Ct({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        ao(o, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: _n("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        pr(o, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: _n("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: _s, axis: !1 },
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
function Sm(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function km({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const o = e.diff > 0, i = e.diff === 0, a = i ? !0 : o === (t === "up"), s = i ? Za : o ? qo : Uo, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const mn = -(2 * Math.PI) / 3, vo = 2 * Math.PI / 3, Rm = vo - mn;
function Nm({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, f;
  const o = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e ?? 0, 1), a = i > o ? i : o + 1, s = e === null ? o : Math.max(o, Math.min(a, e)), c = (e === null ? void 0 : xm(e, r)) ?? "chart-1", u = y.useMemo(() => {
    const g = (s - o) / (a - o), d = mn + g * Rm, p = ({ radius: w }) => w * 0.7, h = co([{ startAngle: mn, endAngle: vo }], {
      id: "cv-gauge-track",
      innerRadius: p,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), v = g > 0 ? [
      h,
      co([{ startAngle: mn, endAngle: d }], {
        id: "cv-gauge-value",
        innerRadius: p,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [h];
    return Ct({
      marks: [
        cs({
          id: "cv-gauge",
          startAngle: mn,
          endAngle: vo,
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
function xm(e, t) {
  var o;
  const n = (o = t.gauge) == null ? void 0 : o.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((a, s) => a.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Ps(e, t) {
  for (const n of e) {
    const r = Es(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function _m(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let o = null;
  if (r.mode === "value")
    typeof r.value == "number" ? o = r.value : typeof r.value == "string" && (o = Ps(e, r.value));
  else {
    const s = e[1];
    o = s ? Es(s[n.measure]) : null;
  }
  if (o === null) return null;
  const i = t - o, a = o !== 0 ? i / o : null;
  return { current: t, baseline: o, diff: i, pct: a };
}
function Es(e) {
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
function De(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: mt(n, r[e])
    }));
  };
}
function kr(e) {
  return e instanceof Function;
}
function Mm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Fm(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const a = t(i);
      a != null && a.length && r(a);
    });
  };
  return r(e), n;
}
function q(e, t, n) {
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
function U(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function $m(e, t, n, r) {
  const o = () => {
    var a;
    return (a = i.getValue()) != null ? a : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: q(() => [e, n, t, i], (a, s, c, u) => ({
      table: a,
      column: s,
      row: c,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), U(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((a) => {
    a.createCell == null || a.createCell(i, n, t, e);
  }, {}), i;
}
function Am(e, t, n, r) {
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
    getFlatColumns: q(() => [!0], () => {
      var g;
      return [f, ...(g = f.columns) == null ? void 0 : g.flatMap((d) => d.getFlatColumns())];
    }, U(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: q(() => [e._getOrderColumnsFn()], (g) => {
      var d;
      if ((d = f.columns) != null && d.length) {
        let p = f.columns.flatMap((h) => h.getLeafColumns());
        return g(p);
      }
      return [f];
    }, U(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(f, e);
  return f;
}
const xe = "debugHeaders";
function la(e, t, n) {
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
const Om = {
  createTable: (e) => {
    e.getHeaderGroups = q(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, a;
      const s = (i = r == null ? void 0 : r.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? i : [], c = (a = o == null ? void 0 : o.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? a : [], u = n.filter((f) => !(r != null && r.includes(f.id)) && !(o != null && o.includes(f.id)));
      return Dn(t, [...s, ...u, ...c], e);
    }, U(e.options, xe, "getHeaderGroups")), e.getCenterHeaderGroups = q(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Dn(t, n, e, "center")), U(e.options, xe, "getCenterHeaderGroups")), e.getLeftHeaderGroups = q(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Dn(t, i, e, "left");
    }, U(e.options, xe, "getLeftHeaderGroups")), e.getRightHeaderGroups = q(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Dn(t, i, e, "right");
    }, U(e.options, xe, "getRightHeaderGroups")), e.getFooterGroups = q(() => [e.getHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getFooterGroups")), e.getLeftFooterGroups = q(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getLeftFooterGroups")), e.getCenterFooterGroups = q(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getCenterFooterGroups")), e.getRightFooterGroups = q(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getRightFooterGroups")), e.getFlatHeaders = q(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getFlatHeaders")), e.getLeftFlatHeaders = q(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getLeftFlatHeaders")), e.getCenterFlatHeaders = q(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getCenterFlatHeaders")), e.getRightFlatHeaders = q(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getRightFlatHeaders")), e.getCenterLeafHeaders = q(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getCenterLeafHeaders")), e.getLeftLeafHeaders = q(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getLeftLeafHeaders")), e.getRightLeafHeaders = q(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getRightLeafHeaders")), e.getLeafHeaders = q(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, a, s, c, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(a = (s = n[0]) == null ? void 0 : s.headers) != null ? a : [], ...(c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []].map((m) => m.getLeafHeaders()).flat();
    }, U(e.options, xe, "getLeafHeaders"));
  }
};
function Dn(e, t, n, r) {
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
      let _, k = !1;
      if (S && v.column.parent ? _ = v.column.parent : (_ = v.column, k = !0), w && (w == null ? void 0 : w.column) === _)
        w.subHeaders.push(v);
      else {
        const R = la(n, _, {
          id: [r, d, _.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: k,
          placeholderId: k ? `${h.filter((N) => N.column === _).length}` : void 0,
          depth: d,
          index: h.length
        });
        R.subHeaders.push(v), h.push(R);
      }
      p.headers.push(v), v.headerGroup = p;
    }), c.push(p), d > 0 && u(h, d - 1);
  }, m = t.map((g, d) => la(n, g, {
    depth: a,
    index: d
  }));
  u(m, a - 1), c.reverse();
  const f = (g) => g.filter((p) => p.column.getIsVisible()).map((p) => {
    let h = 0, v = 0, w = [0];
    p.subHeaders && p.subHeaders.length ? (w = [], f(p.subHeaders).forEach((_) => {
      let {
        colSpan: k,
        rowSpan: R
      } = _;
      h += k, w.push(R);
    })) : h = 1;
    const S = Math.min(...w);
    return v = v + S, p.colSpan = h, p.rowSpan = v, {
      colSpan: h,
      rowSpan: v
    };
  });
  return f((o = (i = c[0]) == null ? void 0 : i.headers) != null ? o : []), c;
}
const di = (e, t, n, r, o, i, a) => {
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
    getLeafRows: () => Fm(s.subRows, (c) => c.subRows),
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
    getAllCells: q(() => [e.getAllLeafColumns()], (c) => c.map((u) => $m(e, s, u, u.id)), U(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: q(() => [s.getAllCells()], (c) => c.reduce((u, m) => (u[m.column.id] = m, u), {}), U(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let c = 0; c < e._features.length; c++) {
    const u = e._features[c];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, Im = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Ds = (e, t, n) => {
  var r, o;
  const i = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(t)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
Ds.autoRemove = (e) => Xe(e);
const Ls = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Ls.autoRemove = (e) => Xe(e);
const Vs = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Vs.autoRemove = (e) => Xe(e);
const zs = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
zs.autoRemove = (e) => Xe(e);
const Hs = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Hs.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Gs = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Gs.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const js = (e, t, n) => e.getValue(t) === n;
js.autoRemove = (e) => Xe(e);
const Bs = (e, t, n) => e.getValue(t) == n;
Bs.autoRemove = (e) => Xe(e);
const mi = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
mi.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, a = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > a) {
    const s = i;
    i = a, a = s;
  }
  return [i, a];
};
mi.autoRemove = (e) => Xe(e) || Xe(e[0]) && Xe(e[1]);
const tt = {
  includesString: Ds,
  includesStringSensitive: Ls,
  equalsString: Vs,
  arrIncludes: zs,
  arrIncludesAll: Hs,
  arrIncludesSome: Gs,
  equals: js,
  weakEquals: Bs,
  inNumberRange: mi
};
function Xe(e) {
  return e == null || e === "";
}
const Tm = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: De("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? tt.includesString : typeof r == "number" ? tt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? tt.equals : Array.isArray(r) ? tt.arrIncludes : tt.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return kr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : tt[e.columnDef.filterFn]
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
        if (ca(o, a, e)) {
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
            if (ca(c, a.value, s))
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
function ca(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Pm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Em = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Dm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Lm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const a = i.getValue(e);
    a != null && (r === void 0 ? a >= a && (r = o = a) : (r > a && (r = a), o < a && (o = a)));
  }), [r, o];
}, Vm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n) return r / n;
}, zm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Mm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, a) => i - a);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Hm = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Gm = (e, t) => new Set(t.map((n) => n.getValue(e))).size, jm = (e, t) => t.length, zr = {
  sum: Pm,
  min: Em,
  max: Dm,
  extent: Lm,
  mean: Vm,
  median: zm,
  unique: Hm,
  uniqueCount: Gm,
  count: jm
}, Bm = {
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
    onGroupingChange: De("grouping", e),
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
        return zr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return zr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return kr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : zr[e.columnDef.aggregationFn];
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
function Wm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((a) => a.id === i)).filter(Boolean), ...r];
}
const qm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: De("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = q((n) => [wn(t, n)], (n) => n.findIndex((r) => r.id === e.id), U(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = wn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = wn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = q(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
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
      return Wm(i, n, r);
    }, U(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Hr = () => ({
  left: [],
  right: []
}), Um = {
  getInitialState: (e) => ({
    columnPinning: Hr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: De("columnPinning", e)
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
    e.getCenterVisibleCells = q(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((a) => !i.includes(a.column.id));
    }, U(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = q(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), U(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = q(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), U(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Hr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Hr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = q(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), U(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = q(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), U(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = q(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, U(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function Km(e) {
  return e || (typeof document < "u" ? document : null);
}
const Ln = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Gr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Ym = {
  getDefaultColumnDef: () => Ln,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Gr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: De("columnSizing", e),
    onColumnSizingInfoChange: De("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Ln.minSize, (r = i ?? e.columnDef.size) != null ? r : Ln.size), (o = e.columnDef.maxSize) != null ? o : Ln.maxSize);
    }, e.getStart = q((n) => [n, wn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), U(t.options, "debugColumns", "getStart")), e.getAfter = q((n) => [n, wn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), U(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), jr(i) && i.touches && i.touches.length > 1))
          return;
        const a = e.getSize(), s = e ? e.getLeafHeaders().map((w) => [w.column.id, w.column.getSize()]) : [[r.id, r.getSize()]], c = jr(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, m = (w, S) => {
          typeof S == "number" && (t.setColumnSizingInfo((_) => {
            var k, R;
            const N = t.options.columnResizeDirection === "rtl" ? -1 : 1, F = (S - ((k = _ == null ? void 0 : _.startOffset) != null ? k : 0)) * N, L = Math.max(F / ((R = _ == null ? void 0 : _.startSize) != null ? R : 0), -0.999999);
            return _.columnSizingStart.forEach((V) => {
              let [O, $] = V;
              u[O] = Math.round(Math.max($ + $ * L, 0) * 100) / 100;
            }), {
              ..._,
              deltaOffset: F,
              deltaPercentage: L
            };
          }), (t.options.columnResizeMode === "onChange" || w === "end") && t.setColumnSizing((_) => ({
            ..._,
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
        }, d = Km(n), p = {
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
        }, v = Qm() ? {
          passive: !1
        } : !1;
        jr(i) ? (d == null || d.addEventListener("touchmove", h.moveHandler, v), d == null || d.addEventListener("touchend", h.upHandler, v)) : (d == null || d.addEventListener("mousemove", p.moveHandler, v), d == null || d.addEventListener("mouseup", p.upHandler, v)), t.setColumnSizingInfo((w) => ({
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
      e.setColumnSizingInfo(t ? Gr() : (n = e.initialState.columnSizingInfo) != null ? n : Gr());
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
let Vn = null;
function Qm() {
  if (typeof Vn == "boolean") return Vn;
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
  return Vn = e, Vn;
}
function jr(e) {
  return e.type === "touchstart";
}
const Xm = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: De("columnVisibility", e)
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
    e._getAllVisibleCells = q(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), U(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = q(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], U(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => q(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), U(e.options, "debugColumns", n));
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
function wn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Jm = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Zm = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: De("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => tt.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return kr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : tt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, ef = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: De("expanded", e),
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
}, yo = 0, bo = 10, Br = () => ({
  pageIndex: yo,
  pageSize: bo
}), tf = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Br(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: De("pagination", e)
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
      e.setPagination(r ? Br() : (o = e.initialState.pagination) != null ? o : Br());
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
      e.setPageIndex(r ? yo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : yo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? bo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : bo);
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
    }), e.getPageOptions = q(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, a) => a)), o;
    }, U(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
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
}, Wr = () => ({
  top: [],
  bottom: []
}), nf = {
  getInitialState: (e) => ({
    rowPinning: Wr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: De("rowPinning", e)
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
      return e.setRowPinning(t ? Wr() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Wr());
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
    }, e.getTopRows = q(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), U(e.options, "debugRows", "getTopRows")), e.getBottomRows = q(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), U(e.options, "debugRows", "getBottomRows")), e.getCenterRows = q(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, U(e.options, "debugRows", "getCenterRows"));
  }
}, rf = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: De("rowSelection", e),
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
        wo(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = q(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, U(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = q(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, U(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = q(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, U(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
        return wo(s, e.id, n, (a = r == null ? void 0 : r.selectChildren) != null ? a : !0, t), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return fi(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Co(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Co(e, n) === "all";
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
}, wo = (e, t, n, r, o) => {
  var i;
  const a = o.getRow(t, !0);
  n ? (a.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), a.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = a.subRows) != null && i.length && a.getCanSelectSubRows() && a.subRows.forEach((s) => wo(e, s.id, n, r, o));
};
function qr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(a, s) {
    return a.map((c) => {
      var u;
      const m = fi(c, n);
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
function fi(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function Co(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((a) => {
    if (!(i && !o) && (a.getCanSelect() && (fi(a, t) ? i = !0 : o = !1), a.subRows && a.subRows.length)) {
      const s = Co(a, t);
      s === "all" ? i = !0 : (s === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const So = /([0-9]+)/gm, of = (e, t, n) => Ws(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), af = (e, t, n) => Ws(bt(e.getValue(n)), bt(t.getValue(n))), sf = (e, t, n) => gi(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), lf = (e, t, n) => gi(bt(e.getValue(n)), bt(t.getValue(n))), cf = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, uf = (e, t, n) => gi(e.getValue(n), t.getValue(n));
function gi(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function bt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ws(e, t) {
  const n = e.split(So).filter(Boolean), r = t.split(So).filter(Boolean);
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
const cn = {
  alphanumeric: of,
  alphanumericCaseSensitive: af,
  text: sf,
  textCaseSensitive: lf,
  datetime: cf,
  basic: uf
}, df = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: De("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return cn.datetime;
        if (typeof i == "string" && (r = !0, i.split(So).length > 1))
          return cn.alphanumeric;
      }
      return r ? cn.text : cn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return kr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : cn[e.columnDef.sortingFn];
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
}, mf = [
  Om,
  Xm,
  qm,
  Um,
  Im,
  Tm,
  Jm,
  //depends on ColumnFaceting
  Zm,
  //depends on ColumnFiltering
  df,
  Bm,
  //depends on RowSorting
  ef,
  tf,
  nf,
  rf,
  Ym
];
function ff(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...mf, ...(t = e._features) != null ? t : []];
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
    _getDefaultColumnDef: q(() => [o.options.defaultColumn], (g) => {
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
    }, U(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: q(() => [o._getColumnDefs()], (g) => {
      const d = function(p, h, v) {
        return v === void 0 && (v = 0), p.map((w) => {
          const S = Am(o, w, v, h), _ = w;
          return S.columns = _.columns ? d(_.columns, S, v + 1) : [], S;
        });
      };
      return d(g);
    }, U(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: q(() => [o.getAllColumns()], (g) => g.flatMap((d) => d.getFlatColumns()), U(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: q(() => [o.getAllFlatColumns()], (g) => g.reduce((d, p) => (d[p.id] = p, d), {}), U(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: q(() => [o.getAllColumns(), o._getOrderColumnsFn()], (g, d) => {
      let p = g.flatMap((h) => h.getLeafColumns());
      return d(p);
    }, U(e, "debugColumns", "getAllLeafColumns")),
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
function gf() {
  return (e) => q(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, a) {
      i === void 0 && (i = 0);
      const s = [];
      for (let u = 0; u < o.length; u++) {
        const m = di(e, e._getRowId(o[u], u, a), o[u], u, i, void 0, a == null ? void 0 : a.id);
        if (n.flatRows.push(m), n.rowsById[m.id] = m, s.push(m), e.options.getSubRows) {
          var c;
          m.originalSubRows = e.options.getSubRows(o[u], u), (c = m.originalSubRows) != null && c.length && (m.subRows = r(m.originalSubRows, i + 1, m));
        }
      }
      return s;
    };
    return n.rows = r(t), n;
  }, U(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function pf(e) {
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
function hf(e, t, n) {
  return n.options.filterFromLeafRows ? vf(e, t, n) : yf(e, t, n);
}
function vf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let g = 0; g < c.length; g++) {
      var f;
      let d = c[g];
      const p = di(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
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
function yf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let g = 0; g < c.length; g++) {
      let d = c[g];
      if (t(d)) {
        var f;
        if ((f = d.subRows) != null && f.length && u < a) {
          const h = di(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
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
function bf() {
  return (e) => q(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
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
    return hf(t.rows, f, e);
  }, U(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function wf(e) {
  return (t) => q(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
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
    } : f = pf({
      rows: a,
      flatRows: s,
      rowsById: c
    }), f.flatRows = [];
    const g = (d) => {
      f.flatRows.push(d), d.subRows.length && d.subRows.forEach(g);
    };
    return f.rows.forEach(g), f;
  }, U(t.options, "debugTable", "getPaginationRowModel"));
}
function Cf() {
  return (e) => q(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
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
            const _ = m.getValue(p.id), k = f.getValue(p.id), R = _ === void 0, N = k === void 0;
            if (R || N) {
              if (v === "first") return R ? -1 : 1;
              if (v === "last") return R ? 1 : -1;
              S = R && N ? 0 : R ? v : -v;
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
  }, U(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
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
function ua(e, t) {
  return e ? Sf(e) ? /* @__PURE__ */ y.createElement(e, t) : e : null;
}
function Sf(e) {
  return kf(e) || typeof e == "function" || Rf(e);
}
function kf(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function Rf(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Nf(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = y.useState(() => ({
    current: ff(t)
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
const qs = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: I("cv-table", e), ...t }) })
);
qs.displayName = "Table";
const Us = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: I("cv-table-header", e), ...t }));
Us.displayName = "TableHeader";
const Ks = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: I("cv-table-body", e), ...t }));
Ks.displayName = "TableBody";
const jn = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: I("cv-table-row", e),
      ...t
    }
  )
);
jn.displayName = "TableRow";
const Ys = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: I("cv-table-head", e),
    ...t
  }
));
Ys.displayName = "TableHead";
const ko = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: I("cv-table-cell", e),
    ...t
  }
));
ko.displayName = "TableCell";
const xf = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: I("cv-table-caption", e), ...t }));
xf.displayName = "TableCaption";
const Qs = Qo(
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
), re = y.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...o }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: I(Qs({ variant: t, size: n }), e),
      ...o
    }
  )
);
re.displayName = "Button";
const we = y.forwardRef(
  ({ className: e, type: t, id: n, ...r }, o) => {
    const i = y.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: o,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: I("cv-input", e),
        ...r
      }
    );
  }
);
we.displayName = "Input";
const _f = 8, Mf = 12;
function Ff({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, o = e.raw.rows, i = e.raw.annotation, a = y.useMemo(
    () => $f(o, i, r, n),
    [o, i, r, n]
  ), s = y.useMemo(
    () => a.map((N) => ({
      id: N.member,
      accessorFn: (F) => F[N.key],
      header: N.label,
      cell: (F) => N.render(F.getValue()),
      sortingFn: (F, L, V) => Pf(F.getValue(V), L.getValue(V)),
      // Global search matches what the reader SEES, not the raw number.
      filterFn: (F, L, V) => da(N.text(F.getValue(L)), V),
      meta: N
    })),
    [a]
  ), [c, u] = y.useState([]), [m, f] = y.useState(""), [g, d] = y.useState({
    pageIndex: 0,
    pageSize: r.pageSize ?? 25
  }), p = Nf({
    data: o,
    columns: s,
    state: { sorting: c, globalFilter: m, pagination: g },
    onSortingChange: u,
    onGlobalFilterChange: f,
    onPaginationChange: d,
    globalFilterFn: (N, F, L) => a.some((V) => da(V.text(N.original[V.key]), L)),
    getCoreRowModel: gf(),
    getFilteredRowModel: bf(),
    getSortedRowModel: Cf(),
    getPaginationRowModel: wf(),
    autoResetPageIndex: !0,
    enableMultiSort: !0,
    isMultiSortEvent: (N) => N.shiftKey
  }), h = p.getFilteredRowModel().rows.length, v = p.getPageCount(), { pageIndex: w, pageSize: S } = p.getState().pagination, _ = o.length > _f, k = h > Mf, R = p.getRowModel().rows;
  return /* @__PURE__ */ C("div", { className: "cv-table-family", children: [
    _ && /* @__PURE__ */ C("div", { className: "cv-table-toolbar", children: [
      /* @__PURE__ */ C("div", { className: "cv-table-search", children: [
        /* @__PURE__ */ l(ts, { className: "cv-table-search-icon" }),
        /* @__PURE__ */ l(
          we,
          {
            className: "cv-table-search-input",
            value: m,
            onChange: (N) => f(N.target.value),
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
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ C(qs, { children: [
      /* @__PURE__ */ l(Us, { className: "cv-table-header--sticky", children: p.getHeaderGroups().map((N) => /* @__PURE__ */ l(jn, { children: N.headers.map((F) => {
        const L = F.column.columnDef.meta, V = F.column.getIsSorted();
        return /* @__PURE__ */ l(
          Ys,
          {
            className: ma(L.align),
            style: L.width ? { width: L.width } : void 0,
            "aria-sort": V === "asc" ? "ascending" : V === "desc" ? "descending" : "none",
            children: /* @__PURE__ */ C(
              re,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: F.column.getToggleSortingHandler(),
                title: "Sort (shift-click to add a column)",
                children: [
                  ua(F.column.columnDef.header, F.getContext()),
                  /* @__PURE__ */ l(Tf, { dir: V || void 0 })
                ]
              }
            )
          },
          F.id
        );
      }) }, N.id)) }),
      /* @__PURE__ */ C(Ks, { children: [
        R.map((N) => /* @__PURE__ */ l(jn, { children: N.getVisibleCells().map((F) => {
          const L = F.column.columnDef.meta, V = Ef(L.member, F.getValue(), r.conditionalFormat);
          return /* @__PURE__ */ l(
            ko,
            {
              className: I(ma(L.align), k && "cv-table-cell--compact"),
              style: V ? { color: V } : void 0,
              children: ua(F.column.columnDef.cell, F.getContext())
            },
            F.id
          );
        }) }, N.id)),
        R.length === 0 && /* @__PURE__ */ l(jn, { children: /* @__PURE__ */ l(ko, { colSpan: Math.max(1, s.length), className: "cv-table-empty", children: m ? "No matches" : "No data" }) })
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
          re,
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
          re,
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
function $f(e, t, n, r) {
  var a;
  const o = e.length > 0 ? Object.keys(e[0]) : Of(t);
  return ((a = n.columns) != null && a.length ? n.columns : o.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = ho(e, c), m = t ? If(t, c) : void 0, f = t ? c in t.measures : !1, g = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, d = s.align ?? (f ? "right" : "left"), p = s.format && r.derive ? r.derive(s.format) : r, h = (v) => Af(v, f, c, p, s.format);
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
function Af(e, t, n, r, o) {
  if (e == null || e === "" || typeof e == "number" && Number.isNaN(e)) return "—";
  if ((o == null ? void 0 : o.kind) === "date" || typeof e == "string" && wr(e))
    return Ut(e, o);
  if (t) {
    const i = typeof e == "number" ? e : Number(e);
    return Number.isFinite(i) ? String(r.value(i, n)) : String(e);
  }
  return String(r.category(e));
}
function da(e, t) {
  const n = t.trim().toLowerCase();
  return n ? e.toLowerCase().includes(n) : !0;
}
function Of(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function If(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ma(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Tf({ dir: e }) {
  return e ? e === "asc" ? /* @__PURE__ */ l(qo, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Uo, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Hc, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Pf(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Ef(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const o of n)
      if (o.member === e && Df(r, o.when.op, o.when.value))
        return `var(--${o.colorToken ?? "chart-1"})`;
  }
}
function Df(e, t, n) {
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
const xt = "cv-sidebar--default", Lf = "cv-sidebar--wide", Xs = "a date or category", Ur = [
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
    hint: Xs,
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
], Vf = [
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
    hint: Xs,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], zf = [
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
], Hf = [
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
], Gf = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], jf = [
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
], Bf = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], ct = (e) => Bf.indexOf(e), ot = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: ns,
    order: ct("bar"),
    component: em,
    optionsSchema: st.bar,
    defaults: lt.bar,
    wells: Ur,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: xt
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Kc,
    order: ct("line"),
    component: tm,
    optionsSchema: st.line,
    defaults: lt.line,
    wells: Ur,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: xt
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Gc,
    order: ct("area"),
    component: nm,
    optionsSchema: st.area,
    defaults: lt.area,
    wells: Ur,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: xt
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Uc,
    order: ct("pie"),
    component: im,
    optionsSchema: st.pie,
    defaults: lt.pie,
    wells: zf,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: xt
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: qc,
    order: ct("scatter"),
    component: sm,
    optionsSchema: st.scatter,
    defaults: lt.scatter,
    wells: Hf,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: xt
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Wc,
    order: ct("kpi"),
    component: hm,
    optionsSchema: st.kpi,
    defaults: lt.kpi,
    wells: Gf,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Lf
  },
  table: {
    family: "table",
    label: "Table",
    icon: Bc,
    order: ct("table"),
    component: Ff,
    optionsSchema: st.table,
    defaults: lt.table,
    wells: jf,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: xt
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: jc,
    order: ct("heatmap"),
    component: fm,
    optionsSchema: st.heatmap,
    defaults: lt.heatmap,
    wells: Vf,
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
    sidebarWidthClass: xt
  }
}, Wf = ot.bar, qf = ot.line, Uf = ot.area, Kf = ot.pie, Yf = ot.scatter, Qf = ot.heatmap, Xf = ot.kpi, Jf = ot.table, pi = [
  Wf,
  qf,
  Uf,
  Kf,
  Yf,
  Qf,
  Xf,
  Jf
], Zf = b.any();
function hi(e, t) {
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
      return ((s = n.get(a)) == null ? void 0 : s.defaults) ?? Wd;
    },
    optionsSchema: (a) => {
      var s;
      return ((s = n.get(a)) == null ? void 0 : s.optionsSchema) ?? Zf;
    },
    resolveOptions: (a) => qd(a, i.defaults(a.family))
  };
  return i;
}
const Rr = hi(pi);
function eg(e, t = Rr) {
  return t.resolveOptions(e);
}
const fa = {
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
function Js(e) {
  return e ? { ...fa, ...e } : fa;
}
function vi(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function tg(e) {
  const t = Math.floor(e ?? tr);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function ng(e, t) {
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
function rg(e) {
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
function og(e, t) {
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
function ig(e) {
  const { unit: t, quantity: n, convert: r, ...o } = e ?? {};
  return { ...o, format: { kind: "percent", decimals: 0 } };
}
function ag(e, t, n) {
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
function sg(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = og(e.series, r);
    return {
      ...e,
      series: e.series.map((a, s) => ({
        ...a,
        data: i[s],
        meta: ig(a.meta)
      }))
    };
  }
  const o = tg(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? ng(i.data, o) : rg(i.data)
    }))
  };
}
function lg(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const pC = Object.fromEntries(
  Object.entries(ot).map(([e, t]) => [e, t.component])
);
function Zs({
  data: e,
  options: t,
  config: n,
  format: r,
  state: o,
  components: i,
  editing: a,
  updateFamilyOptions: s,
  registry: c = Rr,
  theme: u
}) {
  const m = ae(() => eg(t, c), [t, c]), f = ae(() => Js(u), [u]), g = c.get(m.family), d = (g == null ? void 0 : g.queryless) ?? !1, p = vi(g) ? m.transform : void 0, h = ae(() => sg(e, p), [e, p]);
  if (!d && (o != null && o.loading))
    return /* @__PURE__ */ l(Cd, { className: "cv-chart-skeleton" });
  if (!d && (o != null && o.error))
    return /* @__PURE__ */ C(vr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ko, {}),
      /* @__PURE__ */ l(yr, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(br, { children: o.error.message })
    ] });
  if (!d && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : lg(h), w = ag(
    r ?? ei(e.raw.annotation, m, Zo),
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
const Nr = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Kr = 8;
function ga(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function el(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : Nr, r = (t == null ? void 0 : t.byKey) ?? {}, o = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function pa(e, t) {
  const n = el(e, t);
  return e.forEach((r, o) => {
    r.colorToken = n[o];
  }), e;
}
function cg(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function zn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = cg(e[n]);
  return t;
}
function ug(e) {
  return {
    measures: zn(e.measures ?? {}),
    dimensions: zn(e.dimensions ?? {}),
    segments: zn(e.segments ?? {}),
    timeDimensions: zn(e.timeDimensions ?? {})
  };
}
function Kt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function xr(e, t, n) {
  const r = e == null ? void 0 : e.meta, o = {};
  (r == null ? void 0 : r.unit) !== void 0 && (o.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (o.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (o.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && o.unit === void 0 && (o.unit = "%");
  let a = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!a || a.kind === void 0 || a.kind === "auto") && (a = { ...a, kind: "currency" }), a && (o.format = a), t != null && t.stackId && (o.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (o.dots = t.dots), o;
}
function dg(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function mg(e, t) {
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
function fg(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [o, i] of t) {
      const a = _r(r[o]);
      a !== null && (r[o] = i.to(a));
    }
    return r;
  });
}
function gg(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const o = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      o && (r.data = r.data.map((i) => i === null ? null : o.to(i)));
    }
}
function tl(e, t, n, r, o = Rr) {
  const i = ug(e.annotation()), a = mg(i, r), s = fg(e.tablePivot(), a), c = t.mapping;
  if (!c) {
    const f = n.measures ?? [];
    if (o.require(t.family).measureOnly && f.length > 0) {
      const g = s[0] ?? {}, d = [
        {
          key: "value",
          label: "Value",
          data: f.map((h) => _r(g[h])),
          meta: { ...xr(Kt(i, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return pa(d, t.colors), {
        categories: f.map(
          (h) => {
            var v, w;
            return ((v = Kt(i, h)) == null ? void 0 : v.shortTitle) ?? ((w = Kt(i, h)) == null ? void 0 : w.title) ?? h;
          }
        ),
        series: d,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || ga(d)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? hg(e, c.series, t, i) : yg(e, c.category.member, c.series, t, i), m = pg(e, c);
  return gg(u, a), pa(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || ga(u)
  };
}
function pg(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((o) => o.x);
}
function hg(e, t, n, r) {
  const { members: o, meta: i } = t, a = e.chartPivot();
  return o.map((s) => {
    const c = Kt(r, s), u = i == null ? void 0 : i[s], m = a.map((f) => _r(f[s]));
    return {
      key: s,
      label: dg(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...xr(c, u, n.format), measure: s }
    };
  });
}
function vg(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function yg(e, t, n, r, o) {
  const { value: i, values: a, pivot: s } = n, c = a && a.length > 0 ? a : [i], u = new Set(c), m = c.length > 1, f = { x: [t], y: [s, "measures"] }, d = e.seriesNames(f).filter((k) => {
    const R = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return R === void 0 || u.has(R);
  }), p = e.chartPivot(f), h = Kt(o, i), v = o.dimensions[s], w = (v == null ? void 0 : v.type) === "boolean", S = (v == null ? void 0 : v.shortTitle) ?? (v == null ? void 0 : v.title) ?? s, _ = d.map((k) => {
    var H, D;
    const R = (H = k.yValues) == null ? void 0 : H[0], N = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : i, F = Kt(o, N), L = (D = n.meta) == null ? void 0 : D[N], V = (L == null ? void 0 : L.label) ?? (F == null ? void 0 : F.shortTitle) ?? (F == null ? void 0 : F.title) ?? N, O = R ?? k.shortTitle ?? k.title ?? k.key, $ = w ? vg(O) : void 0, P = $ ? `${S}: ${$}` : O, E = m ? `${V} · ${P}` : P, z = p.map((X) => _r(X[k.key]));
    return {
      key: k.key,
      label: E,
      data: z,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...xr(F ?? h, L, r.format),
        measure: N
      }
    };
  });
  return bg(_, h, r.format);
}
function bg(e, t, n) {
  var m, f, g;
  if (e.length <= Kr) return e;
  const r = (d) => d.data.reduce((p, h) => p + (h ?? 0), 0), o = [...e].sort((d, p) => r(p) - r(d)), i = o.slice(0, Kr - 1), a = o.slice(Kr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (d, p) => {
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
    meta: { ...xr(t, void 0, n), ...(g = (f = i[0]) == null ? void 0 : f.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function _r(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ce = (e) => Re(e, "yyyy-MM-dd");
function wg(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ce(t), ce(t)];
  if (n === "yesterday") {
    const a = $e(t, 1);
    return [ce(a), ce(a)];
  }
  if (n === "this week") return [ce(Qn(t)), ce(Xn(t))];
  if (n === "this month") return [ce(Mt(t)), ce(vn(t))];
  if (n === "this quarter") return [ce(Ft(t)), ce(yn(t))];
  if (n === "this year") return [ce($t(t)), ce(bn(t))];
  if (n === "last week") {
    const a = so(t, 1);
    return [ce(Qn(a)), ce(Xn(a))];
  }
  if (n === "last month") {
    const a = At(t, 1);
    return [ce(Mt(a)), ce(vn(a))];
  }
  if (n === "last quarter") {
    const a = Ot(t, 1);
    return [ce(Ft(a)), ce(yn(a))];
  }
  if (n === "last year") {
    const a = It(t, 1);
    return [ce($t(a)), ce(bn(a))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const o = Number(r[1]);
  if (!Number.isFinite(o) || o < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ce($e(t, o - 1)), ce(t)] : i.startsWith("week") ? [ce($e(t, o * 7 - 1)), ce(t)] : i.startsWith("month") ? [ce(Mt(At(t, o))), ce(vn(At(t, 1)))] : i.startsWith("quarter") ? [ce(Ft(Ot(t, o))), ce(yn(Ot(t, 1)))] : [ce($t(It(t, o))), ce(bn(It(t, 1)))];
}
function nl(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function yi(e) {
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
function rl(e) {
  const t = yi(e);
  return t === void 0 ? void 0 : nl(t);
}
function bi(e) {
  const t = yi(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Zt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Cg = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Sg(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((o) => o.name === e)) == null ? void 0 : r.default;
}
function Mn(e, t, n) {
  var r;
  if (_e(e)) {
    const o = e.var;
    return Object.prototype.hasOwnProperty.call(n, o) && n[o] !== void 0 ? n[o] : (r = t.get(o)) == null ? void 0 : r.default;
  }
  return e;
}
function kg(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const o = [];
  for (const a of e.values) {
    const s = Mn(a, t, n);
    if (!Zt(s))
      if (Array.isArray(s))
        for (const c of s)
          Zt(c) || o.push(c);
      else
        o.push(s);
  }
  if (o.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && o.length === 1 && typeof o[0] == "string" ? wg(o[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? o };
}
function Rg(e, t, n) {
  if ("and" in e) {
    const r = Ro(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Ro(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return kg(e, t, n);
}
function Ro(e, t, n) {
  const r = [];
  for (const o of e) {
    const i = Rg(o, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Ng(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const o = Mn(e.dateRange, t, n);
    Zt(o) || (r.dateRange = o);
  }
  if (e.granularity !== void 0) {
    const o = Mn(e.granularity, t, n);
    Zt(o) || (r.granularity = o === Qt ? bi(r.dateRange) : o);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function ol(e, t, n) {
  const r = Cg(n), o = {};
  if (e.measures !== void 0 && (o.measures = [...e.measures]), e.dimensions !== void 0 && (o.dimensions = [...e.dimensions]), e.segments !== void 0 && (o.segments = [...e.segments]), e.timeDimensions !== void 0 && (o.timeDimensions = e.timeDimensions.map((i) => Ng(i, r, t))), e.filters !== void 0) {
    const i = Ro(e.filters, r, t);
    i.length > 0 && (o.filters = i);
  }
  if (e.order !== void 0 && (o.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = Mn(e.limit, r, t);
    Zt(i) || (o.limit = i);
  }
  if (e.offset !== void 0) {
    const i = Mn(e.offset, r, t);
    Zt(i) || (o.offset = i);
  }
  return e.total !== void 0 && (o.total = e.total), e.timezone !== void 0 && (o.timezone = e.timezone), o;
}
function il() {
  let e, t;
  return (n, r, o) => {
    const i = ol(n, r, o), a = JSON.stringify(i);
    return e !== void 0 && a === t ? e : (e = i, t = a, i);
  };
}
function xg(e, t) {
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
class _g extends Error {
}
const Mg = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new _g(`"${e}" cannot be parsed into a number`);
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
function ha(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Fg extends Error {
}
class va extends Error {
}
class $g extends Error {
}
class Yr extends Error {
}
class Ag extends Error {
}
class Og {
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
    return ha(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new $g(`Cannot convert incompatible measures of ${o.measure} and ${i.measure}`);
    let a = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (a = this.cls.sub(a, this.convertFraction(i.unit.anchor_shift))), i.system != o.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new Yr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${o.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new Yr(`Unable to find anchor for "${i.measure}" to "${o.measure}". Please make sure it is defined.`);
      const m = (n = u[o.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[o.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        a = m(a, this.cls);
      else if (typeof f == "number")
        a = this.cls.mul(a, f);
      else if (ha(f))
        a = this.cls.mul(a, this.convertFraction(f));
      else
        throw new Yr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new va(".toBest must be called after .from");
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
        throw new Ag(`Meausure "${t}" not found.`);
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
    throw new Fg(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Ig(e) {
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
function Tg(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Ig(e);
  return (r) => new Og({
    measures: e,
    unitCache: n,
    cls: Mg
  }, r);
}
const Pg = {
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
}, Eg = {
  systems: {
    metric: Pg
  }
}, Dg = {
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
}, Lg = {
  systems: {
    SI: Dg
  }
}, Vg = {
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
}, zg = {
  systems: {
    SI: Vg
  }
}, Hg = {
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
}, Gg = {
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
}, jg = {
  systems: {
    metric: Hg,
    imperial: Gg
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
}, Bg = {
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
}, Wg = {
  systems: {
    SI: Bg
  }
}, qg = {
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
}, Ug = {
  systems: {
    SI: qg
  }
}, Kg = {
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
}, Yg = {
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
}, Qg = {
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
}, Xg = {
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
}, Jg = {
  systems: {
    bit: Kg,
    byte: Yg,
    IECBit: Qg,
    IECByte: Xg
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
}, Zg = {
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
}, ep = {
  systems: {
    metric: Zg
  }
}, tp = {
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
}, np = {
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
}, rp = {
  systems: {
    SI: tp,
    nutrition: np
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
}, op = {
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
}, ip = {
  systems: {
    SI: op
  }
}, ap = {
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
}, sp = {
  systems: {
    SI: ap
  }
}, lp = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, cp = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, up = {
  systems: {
    metric: lp,
    imperial: cp
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
}, dp = {
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
}, mp = {
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
}, fp = {
  systems: {
    metric: dp,
    imperial: mp
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
}, gp = {
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
}, pp = {
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
}, hp = {
  systems: {
    metric: gp,
    imperial: pp
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
}, vp = {
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
}, yp = {
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
}, bp = {
  systems: {
    metric: vp,
    imperial: yp
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
}, wp = {
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
}, Cp = {
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
}, Sp = {
  systems: {
    metric: wp,
    imperial: Cp
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
}, kp = {
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
}, Rp = {
  systems: {
    SI: kp
  }
}, Np = {
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
}, xp = {
  systems: {
    unit: Np
  }
}, _p = {
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
}, Mp = {
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
}, Fp = {
  systems: {
    metric: _p,
    imperial: Mp
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
}, $p = {
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
}, Ap = {
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
}, Op = {
  systems: {
    metric: $p,
    imperial: Ap
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
}, Ip = {
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
}, Tp = {
  systems: {
    SI: Ip
  }
}, Pp = {
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
}, Ep = {
  systems: {
    SI: Pp
  }
}, Dp = {
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
}, Lp = {
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
}, Vp = {
  systems: {
    metric: Dp,
    imperial: Lp
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
}, zp = {
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
}, Hp = {
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
}, Gp = {
  systems: {
    metric: zp,
    imperial: Hp
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
}, jp = {
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
}, Bp = {
  systems: {
    SI: jp
  }
}, Wp = {
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
}, qp = {
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
}, Up = {
  systems: {
    metric: Wp,
    imperial: qp
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
}, Kp = {
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
}, Yp = {
  systems: {
    SI: Kp
  }
}, Qp = {
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
}, Xp = {
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
}, Jp = {
  systems: {
    metric: Qp,
    imperial: Xp
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
}, Zp = {
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
}, eh = {
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
}, th = {
  systems: {
    metric: Zp,
    imperial: eh
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
}, nh = {
  acceleration: Eg,
  angle: Lg,
  apparentPower: zg,
  area: jg,
  charge: Wg,
  current: Ug,
  digital: Jg,
  each: ep,
  energy: rp,
  force: ip,
  frequency: sp,
  illuminance: up,
  length: fp,
  mass: hp,
  massFlowRate: bp,
  pace: Sp,
  partsPer: Rp,
  pieces: xp,
  power: Fp,
  pressure: Op,
  reactiveEnergy: Tp,
  reactivePower: Ep,
  speed: Vp,
  torque: Up,
  temperature: Gp,
  time: Bp,
  voltage: Yp,
  volume: Jp,
  volumeFlowRate: th
}, rh = Tg(nh), oh = {
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
function ih(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => rh(t).from(e.from).to(e.to)
  };
}
const No = {
  ...Object.fromEntries(
    Object.entries(oh).map(([e, t]) => [e, ih(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Mr(e) {
  return e ? { ...No, ...e } : No;
}
function ah(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function sh(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function lh(e) {
  return e != null && e.quantity ? sh(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const ch = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function al(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ya(e, t) {
  const n = e * (ch[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${al(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + a.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Qr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const o = Math.abs(e);
    for (const [i, a] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (o >= i) return al((e / i).toFixed(n.decimals ?? 1)) + a;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function uh(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ba(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function sl(e = No) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Zo(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, o = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return ya(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ba(Qr(n, t), i.prefix, i.suffix);
    }
    if (o === "time") return ya(n, r == null ? void 0 : r.unit);
    if (o === "count" || (r == null ? void 0 : r.convert) === !1) return ba(Qr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const a = r == null ? void 0 : r.unit, s = a ? uh(o, a) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Qr(n, t)}${u}`;
  };
}
const ll = y.createContext(null);
function dh({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(ll.Provider, { value: e, children: t });
}
function cl() {
  return y.useContext(ll) ?? void 0;
}
const Fr = Wa(null);
Fr.displayName = "CubeVizContext";
function Ze() {
  const e = jo(Fr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Rt() {
  return Ze().families;
}
function mh(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function hC({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: o,
  families: i,
  interactions: a,
  children: s
}) {
  const c = (i ?? []).map((S) => S.family).join("|"), u = ae(
    () => hi(pi, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ae(
    () => mh(e) ? bd(e) : e,
    [e]
  ), f = ae(
    () => {
      var S;
      return {
        chartRamp: (S = t == null ? void 0 : t.chartRamp) != null && S.length ? t.chartRamp : Nr,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Js(t == null ? void 0 : t.marks)
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
  ), d = ae(() => o ?? {}, [o]), p = ae(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), h = ae(
    () => ({
      cubeClient: m,
      registry: d,
      families: u,
      locale: g,
      theme: f,
      maps: p
    }),
    [m, d, u, g, f, p]
  ), [v, w] = Pt(null);
  return /* @__PURE__ */ l(Fr.Provider, { value: h, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: I(
        "cv-root",
        f.mode === "dark" && "dark",
        f.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(dh, { container: v, children: /* @__PURE__ */ l(
        ni,
        {
          onRangeSelect: a == null ? void 0 : a.onRangeSelect,
          onPointSelect: a == null ? void 0 : a.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function wi({
  families: e,
  children: t
}) {
  const n = Ze(), r = (e ?? []).map((i) => i.family).join("|"), o = ae(() => !e || e.length === 0 ? n : { ...n, families: hi(pi, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(Ce, { children: t }) : /* @__PURE__ */ l(Fr.Provider, { value: o, children: t });
}
function fh(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const gh = 5e3;
function ul(e, t) {
  const { cubeClient: n } = Ze(), r = (t == null ? void 0 : t.skip) ?? !1, o = ae(
    () => e.limit === void 0 ? { ...e, limit: gh } : e,
    [e]
  ), i = ae(() => JSON.stringify(o), [o]), [a, s] = Pt({ isLoading: !r }), [c, u] = Pt(0), m = ft(() => u((f) => f + 1), []);
  return $n(() => {
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
const $r = Wa(null);
$r.displayName = "DashboardContext";
function Ci({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, o = _t(null);
  (o.current === null || o.current.key !== r) && (o.current = { store: xg(r, t), key: r });
  const i = o.current.store, a = ph(i, r);
  return Sc($r.Provider, { value: a }, n);
}
function ph(e, t) {
  const n = ft(
    (i, a) => e.set(i, a),
    [e]
  ), r = ft(
    (i) => ol(i, e.getAll(), t),
    [e, t]
  ), o = ft(
    (i) => Sg(i, e.getAll(), t),
    [e, t]
  );
  return ae(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: o, decls: t }),
    [e, n, r, o, t]
  );
}
function hh(e) {
  const t = qa(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function dl() {
  const e = jo($r);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return hh(e);
}
function On() {
  return jo($r);
}
const vh = () => () => {
}, yh = Object.freeze({}), bh = Object.freeze([]);
function Xr(e, t, n) {
  var _;
  const r = On(), { locale: o } = Ze(), i = Rt(), a = _t(null);
  a.current === null && (a.current = il());
  const s = a.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), m = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? yh,
    (r == null ? void 0 : r.decls) ?? bh
  ) : e, f = qa(
    u && r ? r.store.subscribe : vh,
    m,
    m
  ), { resultSet: g, isLoading: d, error: p, refetch: h } = ul(f, { skip: n == null ? void 0 : n.skip }), v = ((_ = t.format) == null ? void 0 : _.unitSystem) ?? (o == null ? void 0 : o.unitSystem), w = ae(() => Mr(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]);
  return { data: ae(() => {
    if (g)
      return tl(g, t, f, { unitSystem: v, conversions: w }, i);
  }, [g, t, f, v, w, i]), isLoading: d, error: p, refetch: h, resolvedQuery: f };
}
function Nt() {
  const { cubeClient: e } = Ze(), [t, n] = Pt({ isLoading: !0 });
  return $n(() => {
    let r = !0;
    return n({ isLoading: !0 }), wd(e).then((o) => {
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
function Ar() {
  const { locale: e } = Ze(), t = y.useMemo(() => Mr(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return y.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function vC() {
  const { locale: e } = Ze(), { formatValue: t, units: n } = e;
  return ae(
    () => t ?? sl(Mr(n)),
    [t, n]
  );
}
function ml() {
  const [e, t] = Pt(0), n = _t(null), r = _t(null), o = _t(null), i = _t(0), a = ft((u) => {
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
  return $n(() => s, [s]), [c, e];
}
const wh = "day";
function Ch(e, t) {
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
        granularity: r.granularity ?? wh,
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
const ie = (e) => Re(e, "yyyy-MM-dd");
function Sh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const o = Yn(e[0]), i = Yn(e[1]);
    if (Number.isNaN(o.getTime()) || Number.isNaN(i.getTime())) return;
    const a = Vc(i, o) + 1;
    return [ie($e(o, a)), ie($e(o, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const o = $e(t, 1);
    return [ie(o), ie(o)];
  }
  if (n === "yesterday") {
    const o = $e(t, 2);
    return [ie(o), ie(o)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const o = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [ie($e(t, 2 * o - 1)), ie($e(t, o))];
    if (i.startsWith("week")) return [ie($e(t, 14 * o - 1)), ie($e(t, 7 * o))];
    if (i.startsWith("month"))
      return [ie(Mt(At(t, 2 * o))), ie($e(Mt(At(t, o)), 1))];
    if (i.startsWith("quarter"))
      return [ie(Ft(Ot(t, 2 * o))), ie($e(Ft(Ot(t, o)), 1))];
    if (i.startsWith("year"))
      return [ie($t(It(t, 2 * o))), ie($e($t(It(t, o)), 1))];
  }
  if (n === "this week") {
    const o = so(t, 1);
    return [ie(Qn(o)), ie(Xn(o))];
  }
  if (n === "this month") {
    const o = At(t, 1);
    return [ie(Mt(o)), ie(vn(o))];
  }
  if (n === "this quarter") {
    const o = Ot(t, 1);
    return [ie(Ft(o)), ie(yn(o))];
  }
  if (n === "this year") {
    const o = It(t, 1);
    return [ie($t(o)), ie(bn(o))];
  }
  if (n === "last week") {
    const o = so(t, 2);
    return [ie(Qn(o)), ie(Xn(o))];
  }
  if (n === "last month") {
    const o = At(t, 2);
    return [ie(Mt(o)), ie(vn(o))];
  }
  if (n === "last quarter") {
    const o = Ot(t, 2);
    return [ie(Ft(o)), ie(yn(o))];
  }
  if (n === "last year") {
    const o = It(t, 2);
    return [ie($t(o)), ie(bn(o))];
  }
}
function kh(e, t, n = Rr) {
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
  const s = Sh(a);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: o } : null;
}
const Rh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Si({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: o,
  widgetId: i,
  onRangeSelect: a,
  onPointSelect: s
}) {
  var H;
  const { registry: c, locale: u, theme: m } = Ze(), f = Rt(), g = ((H = f.get(t.family)) == null ? void 0 : H.queryless) ?? !1, d = ae(() => {
    var D;
    return (D = t.format) != null && D.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), p = ae(() => {
    const D = e ?? {};
    return D.timezone || !(u != null && u.timezone) ? D : { ...D, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: h, isLoading: v, error: w, refetch: S, resolvedQuery: _ } = Xr(
    p,
    d,
    { skip: g }
  ), k = ae(() => Ch(p, d), [p, d]), R = Xr(
    (k == null ? void 0 : k.query) ?? p,
    (k == null ? void 0 : k.chart) ?? d,
    { skip: !k }
  ), N = ae(
    () => kh(_, d, f),
    [_, d, f]
  ), F = Xr(
    (N == null ? void 0 : N.query) ?? p,
    d,
    { skip: !N, skipResolve: !0 }
  ), L = ae(
    () => ({ [d.family]: fh(c, d.family, f) }),
    [c, d.family, f]
  ), V = ae(() => {
    let D = h ?? Rh;
    if (k && R.data) {
      D = { ...D, series: R.data.series, categories: R.data.categories };
      const X = D.raw.rows.length > 0, J = D.series.some((ee) => ee.data.some((ue) => ue !== null));
      D = { ...D, empty: !X && !J };
    }
    if (N && F.data) {
      if (N.mode === "kpiRow") {
        const X = F.data.raw.rows[0];
        if (X) {
          const J = D.raw.rows[0];
          D = {
            ...D,
            raw: { ...D.raw, rows: J ? [J, X] : [X] }
          };
        }
      } else if (!F.data.empty) {
        const X = new Map(F.data.series.map((J) => [J.key, J]));
        if (!D.empty && D.series.length > 0) {
          const J = D.categories.length, ee = D.series.map((ue) => {
            const me = X.get(ue.key), se = Array.from({ length: J }, (te, ye) => (me == null ? void 0 : me.data[ye]) ?? null);
            return {
              ...ue,
              key: `${ue.key}__prev`,
              label: `${ue.label} (prev)`,
              colorToken: ue.colorToken,
              data: se,
              meta: { ...ue.meta, companion: !0 }
            };
          });
          D = { ...D, series: [...D.series, ...ee] };
        } else {
          const J = F.data.series.map((ee) => ({
            ...ee,
            key: `${ee.key}__prev`,
            label: `${ee.label} (prev)`,
            data: [...ee.data],
            meta: { ...ee.meta, companion: !0 }
          }));
          D = {
            ...D,
            categories: F.data.categories,
            series: J,
            empty: !1
          };
        }
      }
    }
    return D;
  }, [h, k, R.data, N, F.data]);
  $n(() => {
    n == null || n({ rows: V.raw.rows, refetch: S, isLoading: v });
  }, [n, V.raw.rows, S, v]);
  const O = {}, $ = ae(
    () => u.formatValue ?? sl(Mr(u.units)),
    [u.formatValue, u.units]
  ), P = ae(
    () => ei(V.raw.annotation, d, $, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [V.raw.annotation, d, $, u.locale, u.unitSystem]
  ), E = d.mapping, z = ae(
    () => ({
      categoryMember: E == null ? void 0 : E.category.member,
      pivotMember: (E == null ? void 0 : E.series.mode) === "pivot" ? E.series.pivot : void 0,
      formatCategory: P.category
    }),
    [E, P]
  );
  return /* @__PURE__ */ l(
    ni,
    {
      widgetId: i,
      target: z,
      onRangeSelect: a,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Zs,
        {
          data: V,
          options: d,
          config: O,
          format: P,
          state: g ? { loading: !1 } : { loading: v && !h, error: w },
          components: L,
          registry: f,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: o
        }
      )
    }
  );
}
function Nh({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Si,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const fl = "cube-viz-prose";
function xh(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function _h({ doc: e }) {
  const t = xh(e), n = ae(
    () => t ? e : null,
    [t, e]
  ), r = ds(
    {
      extensions: [fs],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: I(fl) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(ms, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Bn = [
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
], Mh = Object.fromEntries(
  Bn.map((e) => [e.value, e.label])
);
function wa(e) {
  return Mh[e.trim().toLowerCase()] ?? e;
}
const Fh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function $h({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Mu(), o = I(Qs({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ C("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: I(o, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Yo, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: Re(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: I(o, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(hr, {})
      }
    )
  ] });
}
function Ah({ day: e, modifiers: t, className: n, style: r, ...o }) {
  const i = !!t.selected && !t.outside && !t.disabled, a = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...o,
      style: { ...r, color: i ? "var(--primary-foreground)" : a ? "var(--muted-foreground)" : "var(--foreground)" },
      className: I(
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
function gl({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    _u,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: I("cv-cal", e),
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
        MonthCaption: $h,
        DayButton: Ah,
        Chevron: ({ orientation: o, className: i, ...a }) => /* @__PURE__ */ l(o === "left" ? Yo : hr, { className: I("cv-icon", i), ...a })
      },
      ...r
    }
  );
}
function qe({
  ...e
}) {
  return /* @__PURE__ */ l(Jn.Root, { "data-slot": "popover", ...e });
}
function Ue({
  ...e
}) {
  return /* @__PURE__ */ l(Jn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ke({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const o = cl();
  return /* @__PURE__ */ l(Jn.Portal, { container: o, children: /* @__PURE__ */ l(
    Jn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: I("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Ge({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Root, { "data-slot": "select", ...e });
}
function xo({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Group, { "data-slot": "select-group", ...e });
}
function je({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Value, { "data-slot": "select-value", ...e });
}
function Be({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ C(
    Oe.Trigger,
    {
      "data-slot": "select-trigger",
      className: I("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Oe.Icon, { asChild: !0, children: /* @__PURE__ */ l(St, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Oh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Oe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: I("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Yc, {})
    }
  );
}
function Ih({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Oe.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: I("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(St, {})
    }
  );
}
function We({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const o = cl();
  return /* @__PURE__ */ l(Oe.Portal, { container: o, children: /* @__PURE__ */ C(
    Oe.Content,
    {
      "data-slot": "select-content",
      className: I(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Oh, {}),
        /* @__PURE__ */ l(
          Oe.Viewport,
          {
            className: I(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Ih, {})
      ]
    }
  ) });
}
function _o({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Oe.Label,
    {
      "data-slot": "select-label",
      className: I("cv-select-label", e),
      ...t
    }
  );
}
function Ne({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ C(
    Oe.Item,
    {
      "data-slot": "select-item",
      className: I("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Oe.ItemIndicator, { children: /* @__PURE__ */ l(nn, {}) }) }),
        /* @__PURE__ */ l(Oe.ItemText, { children: t })
      ]
    }
  );
}
const en = "cv-field", Th = "cv-field-label", fn = "yyyy-MM-dd";
function Ph(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ca(e) {
  if (!e) return;
  const t = Ja(e, fn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Eh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, o = r.presets ?? Fh, [i, a] = Pt(!1), s = typeof e == "string", [c, u] = Ph(e), m = Ca(c), f = Ca(u), g = m ? { from: m, to: f } : void 0;
  let d;
  s ? d = wa(e) : m && f ? d = `${Re(m, "MMM d, yyyy")} – ${Re(f, "MMM d, yyyy")}` : m ? d = Re(m, "MMM d, yyyy") : d = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ C(qe, { open: i, onOpenChange: a, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(
      re,
      {
        variant: "outline",
        className: I(
          "cv-daterange-trigger",
          d === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(rs, {}),
          d
        ]
      }
    ) }),
    /* @__PURE__ */ C(Ke, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: o.map((h) => /* @__PURE__ */ l(
        re,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(h), a(!1);
          },
          children: wa(h)
        },
        h
      )) }),
      /* @__PURE__ */ l(
        gl,
        {
          mode: "range",
          selected: g,
          defaultMonth: m,
          disabled: p,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([Re(h.from, fn), Re(h.to, fn)]) : h != null && h.from ? t([Re(h.from, fn), Re(h.from, fn)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Dh = [
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
  const r = n, { resolveValue: o } = dl(), i = r.rangeVariable ? yi(o(r.rangeVariable)) : void 0, a = r.options ?? (i !== void 0 ? nl(i) : Dh), s = typeof e == "string" ? e : "", c = a.join(",");
  return $n(() => {
    s && !a.includes(s) && t(a[0]);
  }, [s, c]), /* @__PURE__ */ C(
    Ge,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Be, { className: en, children: /* @__PURE__ */ l(je, { placeholder: "—" }) }),
        /* @__PURE__ */ l(We, { children: a.map((u) => /* @__PURE__ */ l(Ne, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Vh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((a) => String(a))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: I(en, "cv-field--multi"),
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
        /* @__PURE__ */ l(Be, { className: en, children: /* @__PURE__ */ l(je, { placeholder: "—" }) }),
        /* @__PURE__ */ l(We, { children: r.options.map((i) => /* @__PURE__ */ l(Ne, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function zh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: o, isLoading: i } = Nt(), a = ae(() => {
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
      className: en,
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
function Hh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: en,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (o) => t(o.target.value)
    }
  );
}
function Gh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: en,
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
function jh({ value: e, onChange: t, decl: n }) {
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
const Bh = {
  dateRange: Eh,
  granularity: Lh,
  select: Vh,
  memberSelect: zh,
  text: Hh,
  number: Gh,
  toggle: jh
};
function Wh({ control: e, title: t }) {
  var d;
  const { registry: n } = Ze(), { decls: r, resolveValue: o, setVar: i } = dl(), a = ae(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = kc();
  if (!a)
    return /* @__PURE__ */ C("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((d = n.controls) == null ? void 0 : d[c]) ?? Bh[c], m = o(e.variable), f = (p) => i(e.variable, p), g = t ?? a.label ?? a.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: f, decl: a, control: e.control }) : /* @__PURE__ */ C("div", { children: [
    /* @__PURE__ */ l("label", { className: Th, htmlFor: s, children: g }),
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
const pl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: I(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
pl.displayName = "Card";
const hl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: I(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
hl.displayName = "CardHeader";
const vl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: I("cv-card-title", e),
      ...t
    }
  )
);
vl.displayName = "CardTitle";
const qh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-description", e), ...t })
);
qh.displayName = "CardDescription";
const Uh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: I("cv-card-action", e),
      ...t
    }
  )
);
Uh.displayName = "CardAction";
const yl = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-content", e), ...t })
);
yl.displayName = "CardContent";
const Kh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-footer", e), ...t })
);
Kh.displayName = "CardFooter";
const ar = "cube-viz-drag-handle";
function bl(e) {
  var s;
  const { registry: t } = Ze(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: o, dragHandleProps: i, children: a } = e;
  return /* @__PURE__ */ C(pl, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ C(
      hl,
      {
        ...i,
        className: I(ar, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(vl, { className: "cv-widget-chrome-title", children: r }),
          o
        ]
      }
    ) : null,
    /* @__PURE__ */ l(yl, { className: "cv-widget-chrome-body", children: a })
  ] });
}
class Sa extends Rc {
  constructor() {
    super(...arguments);
    Er(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ C(vr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ko, {}),
      /* @__PURE__ */ l(yr, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(br, { children: n.message })
    ] }) : this.props.children;
  }
}
function Yh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let a = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(a) && !Number.isFinite(Number(a)) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
  }, r = t.map(n).join(","), o = e.map((i) => t.map((a) => n(i[a])).join(",")).join(`
`);
  return `${r}
${o}`;
}
function Qh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), o = URL.createObjectURL(r), i = document.createElement("a");
  i.href = o, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(o), 0);
}
function Xh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), o.href = e, o.href;
}
const Jh = /* @__PURE__ */ (() => {
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
let Ht = null;
function wl(e = {}) {
  return Ht || (e.includeStyleProperties ? (Ht = e.includeStyleProperties, Ht) : (Ht = gt(window.getComputedStyle(document.documentElement)), Ht));
}
function sr(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Zh(e) {
  const t = sr(e, "border-left-width"), n = sr(e, "border-right-width");
  return e.clientWidth + t + n;
}
function ev(e) {
  const t = sr(e, "border-top-width"), n = sr(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Cl(e, t = {}) {
  const n = t.width || Zh(e), r = t.height || ev(e);
  return { width: n, height: r };
}
function tv() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Pe = 16384;
function nv(e) {
  (e.width > Pe || e.height > Pe) && (e.width > Pe && e.height > Pe ? e.width > e.height ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe) : e.width > Pe ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe));
}
function lr(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function rv(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function ov(e, t, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${t}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(e), rv(o);
}
const Ie = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ie(n, t);
};
function iv(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function av(e, t) {
  return wl(t).map((n) => {
    const r = e.getPropertyValue(n), o = e.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function sv(e, t, n, r) {
  const o = `.${e}:${t}`, i = n.cssText ? iv(n) : av(n, r);
  return document.createTextNode(`${o}{${i}}`);
}
function ka(e, t, n, r) {
  const o = window.getComputedStyle(e, n), i = o.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const a = Jh();
  try {
    t.className = `${t.className} ${a}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(sv(a, n, o, r)), t.appendChild(s);
}
function lv(e, t, n) {
  ka(e, t, ":before", n), ka(e, t, ":after", n);
}
const Ra = "application/font-woff", Na = "image/jpeg", cv = {
  woff: Ra,
  woff2: Ra,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Na,
  jpeg: Na,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function uv(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ki(e) {
  const t = uv(e).toLowerCase();
  return cv[t] || "";
}
function dv(e) {
  return e.split(/,/)[1];
}
function Mo(e) {
  return e.search(/^(data:)/) !== -1;
}
function mv(e, t) {
  return `data:${t};base64,${e}`;
}
async function Sl(e, t, n) {
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
const Jr = {};
function fv(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Ri(e, t, n) {
  const r = fv(e, t, n.includeQueryParams);
  if (Jr[r] != null)
    return Jr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const i = await Sl(e, n.fetchRequestInit, ({ res: a, result: s }) => (t || (t = a.headers.get("Content-Type") || ""), dv(s)));
    o = mv(i, t);
  } catch (i) {
    o = n.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${e}`;
    i && (a = typeof i == "string" ? i : i.message), a && console.warn(a);
  }
  return Jr[r] = o, o;
}
async function gv(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : lr(t);
}
async function pv(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), a = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, a == null || a.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return lr(s);
  }
  const n = e.poster, r = ki(n), o = await Ri(n, r, t);
  return lr(o);
}
async function hv(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Or(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function vv(e, t) {
  return Ie(e, HTMLCanvasElement) ? gv(e) : Ie(e, HTMLVideoElement) ? pv(e, t) : Ie(e, HTMLIFrameElement) ? hv(e, t) : e.cloneNode(kl(e));
}
const yv = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", kl = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function bv(e, t, n) {
  var r, o;
  if (kl(t))
    return t;
  let i = [];
  return yv(e) && e.assignedNodes ? i = gt(e.assignedNodes()) : Ie(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = gt(e.contentDocument.body.childNodes) : i = gt(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes), i.length === 0 || Ie(e, HTMLVideoElement) || await i.reduce((a, s) => a.then(() => Or(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function wv(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const o = window.getComputedStyle(e);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : wl(n).forEach((i) => {
    let a = o.getPropertyValue(i);
    i === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), Ie(e, HTMLIFrameElement) && i === "display" && a === "inline" && (a = "block"), i === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(i, a, o.getPropertyPriority(i));
  });
}
function Cv(e, t) {
  Ie(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ie(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Sv(e, t) {
  if (Ie(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((o) => e.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function kv(e, t, n) {
  return Ie(t, Element) && (wv(e, t, n), lv(e, t, n), Cv(e, t), Sv(e, t)), t;
}
async function Rv(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Or(u, t, !0));
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
async function Or(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => vv(r, t)).then((r) => bv(e, r, t)).then((r) => kv(e, r, t)).then((r) => Rv(r, t));
}
const Rl = /url\((['"]?)([^'"]+?)\1\)/g, Nv = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, xv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function _v(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Mv(e) {
  const t = [];
  return e.replace(Rl, (n, r, o) => (t.push(o), n)), t.filter((n) => !Mo(n));
}
async function Fv(e, t, n, r, o) {
  try {
    const i = n ? Xh(t, n) : t, a = ki(t);
    let s;
    return o || (s = await Ri(i, a, r)), e.replace(_v(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function $v(e, { preferredFontFormat: t }) {
  return t ? e.replace(xv, (n) => {
    for (; ; ) {
      const [r, , o] = Nv.exec(n) || [];
      if (!o)
        return "";
      if (o === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Nl(e) {
  return e.search(Rl) !== -1;
}
async function xl(e, t, n) {
  if (!Nl(e))
    return e;
  const r = $v(e, n);
  return Mv(r).reduce((i, a) => i.then((s) => Fv(s, a, t, n)), Promise.resolve(r));
}
async function Gt(e, t, n) {
  var r;
  const o = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (o) {
    const i = await xl(o, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Av(e, t) {
  await Gt("background", e, t) || await Gt("background-image", e, t), await Gt("mask", e, t) || await Gt("-webkit-mask", e, t) || await Gt("mask-image", e, t) || await Gt("-webkit-mask-image", e, t);
}
async function Ov(e, t) {
  const n = Ie(e, HTMLImageElement);
  if (!(n && !Mo(e.src)) && !(Ie(e, SVGImageElement) && !Mo(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, o = await Ri(r, ki(r), t);
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
async function Iv(e, t) {
  const r = gt(e.childNodes).map((o) => _l(o, t));
  await Promise.all(r).then(() => e);
}
async function _l(e, t) {
  Ie(e, Element) && (await Av(e, t), await Ov(e, t), await Iv(e, t));
}
function Tv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), e;
}
const xa = {};
async function _a(e) {
  let t = xa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, xa[e] = t, t;
}
async function Ma(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let s = a.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Sl(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(a, `url(${c})`), [a, c]));
  });
  return Promise.all(i).then(() => n);
}
function Fa(e) {
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
async function Pv(e, t) {
  const n = [], r = [];
  return e.forEach((o) => {
    if ("cssRules" in o)
      try {
        gt(o.cssRules || []).forEach((i, a) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = a + 1;
            const c = i.href, u = _a(c).then((m) => Ma(m, t)).then((m) => Fa(m).forEach((f) => {
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
        o.href != null && r.push(_a(o.href).then((s) => Ma(s, t)).then((s) => Fa(s).forEach((c) => {
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
function Ev(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Nl(t.style.getPropertyValue("src")));
}
async function Dv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = gt(e.ownerDocument.styleSheets), r = await Pv(n, t);
  return Ev(r);
}
function Ml(e) {
  return e.trim().replace(/["']/g, "");
}
function Lv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Ml(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Vv(e, t) {
  const n = await Dv(e, t), r = Lv(e);
  return (await Promise.all(n.filter((i) => r.has(Ml(i.style.fontFamily))).map((i) => {
    const a = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return xl(i.cssText, a, t);
  }))).join(`
`);
}
async function zv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Vv(e, t);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Hv(e, t = {}) {
  const { width: n, height: r } = Cl(e, t), o = await Or(e, t, !0);
  return await zv(o, t), await _l(o, t), Tv(o, t), await ov(o, n, r);
}
async function Gv(e, t = {}) {
  const { width: n, height: r } = Cl(e, t), o = await Hv(e, t), i = await lr(o), a = document.createElement("canvas"), s = a.getContext("2d"), c = t.pixelRatio || tv(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return a.width = u * c, a.height = m * c, t.skipAutoScale || nv(a), a.style.width = `${u}`, a.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, a.width, a.height)), s.drawImage(i, 0, 0, a.width, a.height), a;
}
async function jv(e, t = {}) {
  return (await Gv(e, t)).toDataURL();
}
function Bv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Wv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function qv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Uv(e, t, n = 2) {
  const r = await jv(e, {
    pixelRatio: n,
    backgroundColor: qv(e),
    cacheBust: !0
  });
  Wv(r, `${Bv(t)}.png`);
}
function Kv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [o, i] = y.useState(!1), [a, s] = y.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Qh(Yh(t), `${p}.csv`);
  }, f = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || o)) {
      i(!0), s(null);
      try {
        await Uv(p, e);
      } catch (h) {
        s(h instanceof Error ? h.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (p) => p.stopPropagation(), d = (p = !0) => I("cv-menu-item", !p && "cv-menu-item--disabled");
  return /* @__PURE__ */ C(qe, { children: [
    /* @__PURE__ */ l(
      Ue,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Qc, {})
      }
    ),
    /* @__PURE__ */ C(Ke, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ C("button", { type: "button", onClick: n, className: d(), children: [
        /* @__PURE__ */ l(Xc, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ C("button", { type: "button", onClick: f, disabled: o, className: d(!o), children: [
        /* @__PURE__ */ l(Jc, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ C("button", { type: "button", onClick: m, disabled: !c, className: d(c), children: [
        /* @__PURE__ */ l(Zc, {}),
        "Export CSV"
      ] }),
      a ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: a }) : null
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
        Si,
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
      return /* @__PURE__ */ l(_h, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Wh, { control: e.control, title: e.title });
  }
}
function Fo({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: o
}) {
  const [i, a] = Pt({ rows: [] }), s = ft(
    (m) => a({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = _t(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(Sa, { children: /* @__PURE__ */ l($a, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Kv,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    bl,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(Sa, { children: /* @__PURE__ */ l(
        $a,
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
const Fl = (e) => e.filter((t) => t.type === "chart");
function Yv(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const o of Fl(e)) {
    const i = (r = (n = o.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && _e(i.dateRange) && t.set(o.id, i.dateRange.var);
  }
  return t;
}
function Qv(e) {
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
  for (const o of Fl(e)) n(((r = o.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Xv({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: o
}) {
  const i = On(), a = i == null ? void 0 : i.setVar, s = y.useMemo(() => Yv(e.widgets), [e.widgets]), c = y.useMemo(() => Qv(e.widgets), [e.widgets]), u = y.useRef({ onRangeSelect: n, onPointSelect: r });
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
    ni,
    {
      onRangeSelect: g ? m : void 0,
      onPointSelect: d ? f : void 0,
      children: o
    }
  );
}
const Jv = "lg", Zv = 640;
function ey(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function ty(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function yC({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: o,
  onPointSelect: i
}) {
  const [a, s] = ml(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, f = c.margin ?? [12, 12], g = c.containerPadding ?? f, d = ae(
    () => ({ [Jv]: ty(e.layout) }),
    [e.layout]
  ), p = ae(
    () => new Map(e.widgets.map((v) => [v.id, v])),
    [e.widgets]
  ), h = !t && s > 0 && s < Zv;
  return /* @__PURE__ */ l(wi, { families: n, children: /* @__PURE__ */ l(Ci, { spec: e, children: /* @__PURE__ */ l(
    Xv,
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
          children: ey(e.layout).map((v) => {
            const w = p.get(v.i);
            if (!w) return null;
            const S = v.h * m + (v.h - 1) * f[1];
            return /* @__PURE__ */ l("div", { style: { height: S }, children: /* @__PURE__ */ l(Fo, { widget: w, editable: !1 }) }, v.i);
          })
        }
      ) : /* @__PURE__ */ l(
        us,
        {
          width: s,
          layouts: d,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: f,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${ar}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((v) => {
            const w = p.get(v.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Fo, { widget: w, editable: t }) }, v.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function bC({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(wi, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    bl,
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
        Nh,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function $l(e, t = "None") {
  if (_e(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => $l(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function ny(e) {
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
function ry(e, t) {
  const n = new Set(ny(t));
  return e.filter((r) => n.has(r.type));
}
function oy(e) {
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
function iy(e, t, n) {
  const r = new Set(n.map((s) => s.name)), o = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = o, a = 2;
  for (; r.has(i); ) i = `${o}_${a++}`;
  return i;
}
function ay(e, t, n) {
  const r = oy(e), o = { name: iy(t, e, n), type: r }, i = t.trim();
  return i && (o.label = i), r === "dateRange" ? o.default = "last 7 days" : r === "granularity" && (o.default = "day"), o;
}
const Zr = ht.options, $o = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function sy(e, t = "None") {
  const n = $l(e, t);
  return n === Qt ? "Auto" : $o[n] ?? n;
}
const eo = "__none__";
function Al({
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
  const f = n && n.length > 0 ? n : Zr, g = e && e !== Qt && !f.includes(e) ? [...f, e].sort(
    (p, h) => Zr.indexOf(p) - Zr.indexOf(h)
  ) : f, d = o ? `Auto (${$o[o]})` : "Auto";
  return /* @__PURE__ */ C(
    Ge,
    {
      value: e ?? (i ? eo : ""),
      onValueChange: (p) => t(p === eo ? void 0 : p),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Be, { id: u, className: m, children: /* @__PURE__ */ l(je, { placeholder: s }) }),
        /* @__PURE__ */ C(We, { children: [
          i ? /* @__PURE__ */ l(Ne, { value: eo, children: a }) : null,
          r ? /* @__PURE__ */ l(Ne, { value: Qt, children: d }) : null,
          g.map((p) => /* @__PURE__ */ l(Ne, { value: p, children: $o[p] }, p))
        ] })
      ]
    }
  );
}
function Ir(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function ly(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function cy(e) {
  return Ao(e, "category");
}
function Ao(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function nt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Tr(e) {
  return e ? e.cubes.filter((t) => nt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Ir(t),
    joinTargets: ly(t),
    category: cy(t),
    path: Ao(t, "path"),
    grain: Ao(t, "grain")
  })) : [];
}
function uy(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function pt(e, t) {
  if (!(!e || !t))
    return Tr(e).find((n) => n.name === t);
}
function Ni(e) {
  return e.shortTitle || e.title || e.name;
}
function Le(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Ol(e) {
  return Le(e.meta, "group");
}
function dy(e) {
  return Le(e.meta, "geoPoint");
}
function Aa(e) {
  const t = Le(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function my(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function Wn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Il(e, t) {
  if (t)
    return Dt(e, "time", t).find(Wn);
}
function fy(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const i = Ol(o), a = i ? `g:${i.toLowerCase()}` : `f:${t(o)}`;
    let s = r.get(a);
    s || (s = { label: i ?? t(o), items: [] }, r.set(a, s), n.push(a)), s.items.push(o);
  }
  return n.map((o) => [r.get(o).label, r.get(o).items]);
}
function cr(e) {
  const t = Le(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function gy(e) {
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
function xi(e) {
  return Le(e.meta, "agg");
}
function ur(e) {
  const t = Le(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function py(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = gy(cr(e));
  return t !== void 0 && xi(e) === t;
}
function hy(e) {
  return Le(e.meta, "familyHint");
}
function vy(e) {
  return Le(e.meta, "soloHint");
}
function dr(e) {
  return Le(e.meta, "familyTitle");
}
function yy(e, t) {
  if (ur(t))
    return Tl(e, t).map(dr).find((n) => n !== void 0);
}
function _i(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function by(e) {
  return `each ${_i(e)}`;
}
function Tl(e, t) {
  const n = ur(t);
  if (!n) return [t];
  const r = [
    ...Dt(e, "measure", t.cube),
    ...Dt(e, "numberDimension", t.cube)
  ], o = /* @__PURE__ */ new Set(), i = [];
  for (const a of r)
    ur(a) !== n || o.has(a.name) || (o.add(a.name), i.push(a));
  return i.length > 0 ? i : [t];
}
function wy(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = ur(r.option);
    if (!o) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(o);
    i || (i = { familyKey: o, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(o, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const o = r.variants.find((s) => dr(s.option)), i = r.variants.findIndex((s) => py(s.option)), a = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : a >= 0 ? a : 0, r.label = dr((o == null ? void 0 : o.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function Mi(e, t) {
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
function Pl(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ni(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Le(n, "quantity"),
    unit: Le(n, "unit")
  };
}
function qn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ni(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Le(n, "quantity"),
    unit: Le(n, "unit")
  };
}
function El(e, t) {
  return {
    name: e.name,
    label: Ni(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Cy(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e.dimensions) {
    const i = o.meta, a = dy({ meta: i });
    !a || !nt(o) || n.set(a, [...n.get(a) ?? [], o]);
  }
  const r = [];
  for (const [o, i] of n) {
    const a = i.filter(
      (c) => c.type === "number" && Aa({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Aa({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || a.length !== 1 || s.length !== 1 || r.push({
      name: my(a[0].name, s[0].name),
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
function Oa(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function Dt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const o of e.cubes) {
    if (!nt(o) || n && o.name !== n) continue;
    const i = Ir(o), a = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Cy(o, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of o.measures)
        nt(s) && a(Pl(s, o.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of o.dimensions)
        nt(s) && s.type !== "time" && !Oa(s) && a(qn(s, o.name));
    if (t === "time")
      for (const s of o.dimensions)
        nt(s) && s.type === "time" && a(qn(s, o.name));
    if (t === "numberDimension")
      for (const s of o.dimensions)
        nt(s) && s.type === "number" && !Oa(s) && a(qn(s, o.name));
  }
  return r;
}
function Sy(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const o of e.cubes) {
    if (!nt(o) || n && !n.has(o.name)) continue;
    const i = Ir(o);
    for (const a of o.segments) {
      if (!nt(a)) continue;
      const s = El(a, o.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Ee(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Ir(n), o = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? o(Pl(i, n.name)) : o(qn(i, n.name)) : void 0;
      const a = n.segments.find((s) => s.name === t);
      if (a) return o(El(a, n.name));
    }
    return Dt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Ia(e) {
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
const Oo = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Dl = {
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
function ky(e) {
  return e === "number";
}
function et(e) {
  return e.target !== void 0;
}
function Fe(e, t) {
  return e.kinds.includes(t);
}
function Fi(e, t, n) {
  if (!Fe(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function Lt(e) {
  return e.chart.familyOptions ?? {};
}
function $i(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Ll(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Ry(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Ny(e, t, n) {
  var a, s;
  const r = e.chart;
  if ($i(r)) return;
  const o = In(r), i = new Set(n ?? []);
  o && i.add(o);
  for (const c of t)
    if (((a = c.target) == null ? void 0 : a.kind) === "option") {
      const u = Lt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function an(e, t, n) {
  var s;
  const r = {}, o = e.chart, i = Lt(e), a = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!et(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = In(o);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = Ll(o), f = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = a(c, f);
        break;
      }
      case "pivot": {
        const m = $i(o) ?? Ny(e, t, n);
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
function Ai(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Oi(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function xy(e, t) {
  return { ...e, dimensions: Ai(e.dimensions, t) };
}
function Vl(e, t) {
  const n = Oi(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function zl(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function wC(e) {
  return e === void 0 ? Ty : bi(e);
}
const _y = "last 30 days";
function un(e, t, n, r) {
  if (ky(n)) return { ...e, measures: Ai(e.measures, t) };
  if (n === "time") {
    const o = Tn(e) ?? r;
    return zl(e, {
      dimension: t,
      granularity: (o == null ? void 0 : o.granularity) ?? Qt,
      dateRange: o ? o.dateRange : _y
    });
  }
  return xy(e, t);
}
function gn(e, t, n, r) {
  const o = e.query ?? {}, i = an(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return o;
  const a = Tn(o);
  if ((a == null ? void 0 : a.dimension) === n) return zl(o, void 0);
  if ((o.measures ?? []).includes(n)) {
    const s = Oi(o.measures, n);
    return { ...o, measures: s.length ? s : void 0 };
  }
  return Vl(o, n);
}
function My(e, t, n, r) {
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
  return { category: { member: e }, series: jl(t, r) };
}
function Cn(e, t, n) {
  var c, u;
  const r = an(e, t, n), o = (m) => t.find((f) => {
    var g;
    return ((g = f.target) == null ? void 0 : g.kind) === m;
  }), i = o("category"), a = o("measures"), s = o("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : In(e.chart),
    measures: a ? r[a.id] ?? [] : Ll(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : $i(e.chart)
  };
}
function Sn(e, t, n) {
  const r = { ...Gl(e.chart), ...Ry(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: My(n.category, n.measures, n.pivot, r)
    }
  };
}
function mr(e, t, n) {
  const r = { ...Lt(e), ...n };
  for (const [o, i] of Object.entries(n)) i === void 0 && delete r[o];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Ii(e, t, n, r, o) {
  const i = t.find((u) => u.id === n);
  if (!i || !et(i)) return e;
  const a = i.target, s = an(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (a.kind) {
    case "category": {
      const u = s[0], m = Tn(c);
      u && u !== r && (c = gn(e, t, u, n)), c = un(c, r, o, m);
      const f = Cn({ ...e, query: c }, t, [r]);
      return Sn(e, c, { ...f, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Ai(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = gn(e, t, s[0], n)), c = un(c, r, o);
      const m = Cn({ ...e, query: c }, t, [r]);
      return Sn(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = gn(e, t, u, n)), c = un(c, r, o);
      const m = Cn({ ...e, query: c }, t, [r]);
      return Sn(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = gn(e, t, u, n)), c = un(c, r, o), mr(e, c, { [a.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(Lt(e)[a.key]) ? [...Lt(e)[a.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = un(c, r, o), mr(e, c, { [a.key]: u });
    }
  }
}
function Fy(e, t, n, r) {
  const o = t.find((s) => s.id === n);
  if (!o || !et(o)) return e;
  const i = o.target, a = gn(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: a, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Cn(e, t), c = Oi(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? a : Vl(a, s.pivot);
      return Sn(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Cn(e, t);
      return Sn(e, a, { ...s, pivot: void 0 });
    }
    case "option":
      return mr(e, a, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(Lt(e)[i.key]) ? Lt(e)[i.key] : [];
      return mr(e, a, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function $y(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = Tn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Ay(e, t) {
  if (Fe(t, e)) return e;
  if (e === "category" && Fe(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && Fe(t, "category") || e === "time" && Fe(t, "category")) return "category";
}
function Oy(e, t, n) {
  const r = an(e, t), o = /* @__PURE__ */ new Map();
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
    if (!et(a) || !a.channel) continue;
    const s = o.get(a.channel);
    if (!(s != null && s.length)) continue;
    const c = a.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = Ay($y(e, u), a);
      m && (i = Ii(i, n, a.id, u, m));
    }
  }
  return i;
}
function Iy(e, t) {
  const n = [...t];
  let r = 0;
  for (const o of e) {
    if (!et(o)) continue;
    const i = n.findIndex((a) => Fe(o, a));
    i >= 0 ? (n.splice(i, 1), r += o.optional ? 1 : 3) : o.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function Bt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Hl(e) {
  var a, s, c, u, m;
  const t = e.query ?? {}, n = (a = t.measures) == null ? void 0 : a.find(Boolean);
  if (n) return Bt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Bt(r);
  const o = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (o) return Bt(o);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Bt(i);
}
function Io(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Gl(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function In(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Tn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function jl(e, t) {
  const n = {};
  for (const o of e) {
    const i = t[o];
    i && Object.keys(i).length > 0 && (n[o] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Ty = "day";
function To(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Py(e, t, n) {
  const r = n.require(e.chart.family), o = n.require(t), i = To(r) && To(o) ? Oy(e, r.wells, o.wells) : Ey(e, o);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Ey(e, t) {
  var d;
  const { chart: n } = e, r = e.query ?? {}, o = Io(n).length ? Io(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((p) => p.dimension), a = In(n) ?? ((d = r.dimensions) == null ? void 0 : d[0]) ?? i[0], s = [a, ...r.dimensions ?? [], ...i].filter(
    (p, h, v) => !!p && v.indexOf(p) === h
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!To(t)) {
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
      for (let _ = 0; _ < w.length; ) {
        if (p.cardinality === "one" && v > 0 || !Fe(p, S(w[_]))) {
          _ += 1;
          continue;
        }
        g = Ii(g, t.wells, p.id, w[_], S(w[_])), w.splice(_, 1), v += 1;
      }
  }
  return g;
}
function Bl(e) {
  return ah(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Wl(e) {
  return lh(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Dy(e, t) {
  return t.require(e).wells;
}
function kn(e, t) {
  var i;
  const n = t.require(e.chart.family), r = an(e, n.wells), o = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return o ? { ...r, ...o } : r;
}
function jt(e, t, n, r, o, i) {
  const a = i.require(t);
  if (a.placeField) return a.placeField(e, n, r, o);
  const s = Ii(e, a.wells, n, r, o);
  return Ly(e, s, a.wells);
}
function ql(e, t, n, r, o) {
  const i = o.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const a = Fy(e, i.wells, n, r);
  return Ul(e, a, i.wells);
}
function Ly(e, t, n) {
  return Vy(e, Ul(e, t, n));
}
function Vy(e, t) {
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
function Ul(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const o = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(o.map((m) => m.dimension)), a = new Set(Object.values(an(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && a.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...o, ...s] } };
}
function Kl({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: I("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ C(y.Fragment, { children: [
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
        className: I("cv-picker-aggseg-opt", n.selected && "cv-picker-aggseg-opt--on"),
        children: n.label
      }
    )
  ] }, n.label)) });
}
function Yl(e, t) {
  var o;
  const n = (o = e.meta) == null ? void 0 : o.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = xi(e) ?? "";
  return r === "value" ? by(t == null ? void 0 : t.grain) : r === "max" && cr(e) === "counter" ? "latest" : r;
}
function Ti(e) {
  return xi(e) === "value";
}
function Pi(e) {
  return `Plots each ${_i(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function zy(e, t, n) {
  if (Ti(n)) return Pi(t);
  switch (cr(n) ?? e.map(cr).find(Boolean)) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const o = _i(t == null ? void 0 : t.grain);
      return `Describes one ${o} at a time — the average across ${o}s is usually right.`;
    }
    case "part":
      return e.map(hy).find(Boolean);
    default:
      return;
  }
}
function Po({ option: e }) {
  const t = Ar();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Mi(e, t) });
}
function Ql({
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
      return Dt(u, n).filter((v) => h.has(v.cube));
    }
    return Dt(u, n, e);
  }, [u, n, e, t]), g = y.useMemo(() => {
    const h = Hy(f), v = h.length > 1, w = [];
    for (const [S, _] of h)
      for (const [k, R] of fy(_, () => "Other")) {
        const N = v ? k === "Other" ? S : `${S} · ${k}` : k;
        w.push({ key: `${S}:${k}`, label: N, items: R });
      }
    return w;
  }, [f]), d = g.length > 1, p = f.find((h) => h.name === r);
  return /* @__PURE__ */ C(Ge, { value: r, onValueChange: o, disabled: a || m, children: [
    /* @__PURE__ */ l(Be, { id: s, className: c, children: /* @__PURE__ */ l(je, { placeholder: m ? "Loading…" : i, children: p ? /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Po, { option: p }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(We, { children: g.map((h) => /* @__PURE__ */ C(xo, { children: [
      d && h.label ? /* @__PURE__ */ l(_o, { children: h.label }) : null,
      h.items.map((v) => /* @__PURE__ */ l(Ne, { value: v.name, children: /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Po, { option: v }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
      ] }) }, v.name))
    ] }, h.key)) })
  ] });
}
function Hy(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Yt({
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
      className: I("cv-segmented", s),
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
            className: I(
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
function Gy(e, t, n) {
  return n(e) !== t;
}
function Ei({ value: e, parse: t, format: n, onChange: r }) {
  const o = n(e), [i, a] = y.useState(o), [s, c] = y.useState(o);
  o !== s && (c(o), Gy(i, o, (f) => n(t(f))) && a(o));
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
function Ta(e) {
  return e.reason === void 0;
}
function Xl(e, t, n, r, o) {
  const i = Fi(e, t, [...n]);
  return i ? jy(i, e, r) : o == null ? void 0 : o(r);
}
function jy(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function By(e, t, n) {
  if (t !== void 0 && Bl(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Wl(e)}`;
}
const Di = "cube-viz:field-picker:only-compatible";
function Jl() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Zl() {
  var e;
  try {
    return ((e = Jl()) == null ? void 0 : e.getItem(Di)) !== "0";
  } catch {
    return !0;
  }
}
function Wy(e) {
  try {
    const t = Jl();
    if (!t) return;
    t.setItem(Di, e ? "1" : "0");
  } catch {
  }
}
let Eo = Zl();
const Un = /* @__PURE__ */ new Set();
let Wt;
function qy() {
  for (const e of [...Un]) e();
}
function ec(e) {
  e !== Eo && (Eo = e, qy());
}
function Uy() {
  if (Wt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Di || ec(Zl());
  };
  e.addEventListener("storage", t), Wt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const Hn = {
  get: () => Eo,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Wy(e), ec(e);
  },
  subscribe: (e) => (Un.add(e), Uy(), () => {
    Un.delete(e), Un.size === 0 && (Wt == null || Wt(), Wt = void 0);
  })
}, Ky = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(nu, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(Ki, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(Ki, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(ss, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(tu, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Pa = ["geoPoint", "number", "numberDimension", "category", "time"];
function Li({
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
  var te, ye;
  const { meta: u, isLoading: m } = Nt(), [f, g] = y.useState(!1), [d, p] = y.useState(""), h = y.useSyncExternalStore(
    Hn.subscribe,
    Hn.get,
    Hn.getServer
  ), v = Hn.set, w = y.useId(), [S, _] = y.useState(r.viewLocked ?? "tables"), [k, R] = y.useState({}), [N, F] = y.useState({});
  y.useEffect(() => {
    f && _(r.viewLocked ?? "tables");
  }, [f, r.viewLocked]);
  const L = y.useMemo(() => new Set(t), [t]), V = d.trim().toLowerCase(), O = Ar(), $ = y.useMemo(() => {
    if (S !== "tables") {
      const A = r.views.find((j) => j.name === S) ?? pt(u, S);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const G = [];
    r.sourceCube && G.push({ cube: r.sourceCube, tag: "source" });
    const de = r.relatedCubes.some((A) => A.path ?? A.category) ? "More tables" : "Related tables", T = (A) => A.path ? uy(A.path) : A.category, M = /* @__PURE__ */ new Map();
    for (const A of r.relatedCubes) {
      const j = T(A);
      j !== void 0 && !M.has(j) && M.set(j, M.size);
    }
    const x = [...r.relatedCubes].sort((A, j) => {
      const W = T(A), K = T(j);
      return W === K ? 0 : W === void 0 ? 1 : K === void 0 ? -1 : (M.get(W) ?? 0) - (M.get(K) ?? 0);
    });
    for (const A of x) G.push({ cube: A, tag: "related", heading: T(A) ?? de });
    return G;
  }, [S, r, u]), P = [
    ...Pa.filter((G) => Fe(e, G)),
    ...Pa.filter((G) => !Fe(e, G))
  ], E = (G) => {
    const oe = [], de = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Set();
    for (const M of P) {
      const x = Ky[M], A = Fi(e, M, n ?? []);
      let j = Dt(u, x.metaKind, G);
      M === "time" && (j = [...j].sort(
        (W, K) => Number(Wn(K)) - Number(Wn(W))
      ));
      for (const W of j) {
        if (L.has(W.name) || T.has(W.name)) continue;
        const K = dr(W) ?? yy(u, W);
        if (V && !(W.label.toLowerCase().includes(V) || W.name.toLowerCase().includes(V) || ((K == null ? void 0 : K.toLowerCase().includes(V)) ?? !1)))
          continue;
        T.add(W.name);
        const ne = Ol(W), Se = ne ? `g:${ne.toLowerCase()}` : `k:${x.label}`;
        let ke = de.get(Se);
        ke || (ke = {
          key: Se,
          label: ne ?? x.label,
          headerIcon: ne ? void 0 : x.icon,
          rejected: A !== void 0,
          items: []
        }, de.set(Se, ke), oe.push(Se)), A === void 0 && (ke.rejected = !1), ke.items.push({
          option: W,
          kind: M,
          reason: Xl(e, M, n ?? [], W, o)
        });
      }
    }
    return oe.map((M) => de.get(M));
  }, z = $.map((G) => ({ section: G, groups: E(G.cube.name) })).filter((G) => G.groups.length > 0), H = h ? z.reduce(
    (G, oe) => G + oe.groups.reduce((de, T) => de + T.items.filter((M) => !Ta(M)).length, 0),
    0
  ) : 0, D = h ? z.map((G) => ({
    section: G.section,
    groups: G.groups.map((oe) => ({ ...oe, rejected: !1, items: oe.items.filter(Ta) })).filter((oe) => oe.items.length > 0)
  })).filter((G) => G.groups.length > 0) : z, X = D.length > 0, J = !X && H > 0, ee = (G, oe) => {
    i(G, oe), g(!1), p("");
  }, ue = S === "tables" ? "All related tables" : ((te = r.views.find((G) => G.name === S)) == null ? void 0 : te.title) ?? ((ye = pt(u, S)) == null ? void 0 : ye.title) ?? S, me = r.viewLocked ? r.views.filter((G) => G.name === r.viewLocked) : [], se = h ? H > 0 ? `Only compatible fields — ${H} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ C(qe, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: c }),
    /* @__PURE__ */ C(Ke, { align: a, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ C("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ C("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(ts, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: d,
              onChange: (G) => p(G.target.value),
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
            "aria-label": se,
            title: se,
            onClick: () => v(!h),
            className: I("cv-picker-compat", h && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(eu, { className: "cv-ec-icon" }),
              h && H > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: H }) : null
            ]
          }
        ),
        me.length > 0 ? /* @__PURE__ */ l(
          Yy,
          {
            browse: S,
            label: ue,
            views: me,
            onBrowse: _
          }
        ) : null
      ] }),
      S === "tables" && r.sourceCube ? /* @__PURE__ */ C("div", { className: "cv-picker-anchor", children: [
        "Reading from ",
        /* @__PURE__ */ l("strong", { children: r.sourceCube.title }),
        r.sourceCube.grain ? ` (${r.sourceCube.grain})` : "",
        " · joined tables included"
      ] }) : null,
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: X ? D.map(({ section: G, groups: oe }, de) => {
        const T = oe.reduce((K, ne) => K + ne.items.length, 0), M = G.tag === "related", x = k[G.cube.name] ?? M, A = V.length > 0 ? !0 : !x, j = de > 0 ? D[de - 1].section : void 0, W = G.tag === "related" && G.heading !== void 0 && ((j == null ? void 0 : j.tag) !== "related" || j.heading !== G.heading);
        return /* @__PURE__ */ C("div", { children: [
          W ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: G.heading }) : null,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => R((K) => ({ ...K, [G.cube.name]: !x })),
              className: "cv-picker-table",
              children: [
                A ? /* @__PURE__ */ l(St, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(hr, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(os, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: G.cube.title }),
                G.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: G.cube.grain }) : null,
                G.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : G.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: T })
              ]
            }
          ),
          A ? oe.map((K) => /* @__PURE__ */ C(
            "div",
            {
              className: I(
                "cv-picker-group",
                K.rejected && "cv-picker-group--rejected"
              ),
              children: [
                oe.length > 1 ? /* @__PURE__ */ C("div", { className: "cv-picker-group-header", children: [
                  K.headerIcon,
                  K.label,
                  K.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                wy(K.items).map((ne) => {
                  const Se = ne.familyKey ? N[ne.familyKey] : void 0, ke = ne.variants.findIndex((Me) => Me.option.name === Se), Q = ke >= 0 ? ke : ne.defaultIndex, { option: le, kind: fe, reason: Te } = ne.variants[Q], ve = ne.familyKey ? {
                    options: ne.variants.map((Me, it) => {
                      const ge = pt(u, Me.option.cube), Ve = Ti(Me.option);
                      return {
                        label: Yl(Me.option, ge),
                        selected: it === Q,
                        disabled: Me.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: Me.reason ?? (Ve ? Pi(ge) : void 0),
                        divider: Ve && it > 0,
                        onSelect: () => {
                          F((Ye) => ({ ...Ye, [ne.familyKey]: Me.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Qy,
                    {
                      option: le,
                      label: ne.familyKey ? ne.label : void 0,
                      unitBadge: Mi(le, O),
                      badge: fe === "time" && Wn(le) ? "default" : void 0,
                      reason: Te,
                      agg: ve,
                      onPick: () => ee(le.name, fe)
                    },
                    ne.familyKey ?? le.name
                  );
                })
              ]
            },
            K.key
          )) : null
        ] }, G.cube.name);
      }) : J ? /* @__PURE__ */ C("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ C("p", { children: [
          H,
          " ",
          V ? "matching " : "",
          "field",
          H === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          H === 1 ? "it" : "them",
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
function Yy({ browse: e, label: t, views: n, onBrowse: r }) {
  const [o, i] = y.useState(!1), a = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ C(qe, { open: o, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ue,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(is, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ C(Ke, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Ea, { active: e === "tables", icon: /* @__PURE__ */ l(os, { className: "cv-ec-icon" }), onClick: () => a("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          Ea,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(as, { className: "cv-ec-icon" }),
            onClick: () => a(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Ea({
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
      className: I(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(nn, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Qy({ option: e, label: t, reason: n, onPick: r, unitBadge: o, badge: i, agg: a }) {
  const s = o ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: o }) : null, c = t ?? e.label, u = a ? /* @__PURE__ */ l(Kl, { options: a.options }) : null, m = n ? /* @__PURE__ */ C(
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
const Xy = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], pn = "yyyy-MM-dd";
function Jy(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Da(e) {
  if (!e) return;
  const t = Ja(e, pn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Vi({ value: e, onChange: t }) {
  const [n, r] = y.useState(!1), o = typeof e == "string", [i, a] = Jy(e), s = Da(i), c = Da(a), u = s ? { from: s, to: c } : void 0, m = o ? e : s && c ? `${Re(s, "MMM d, yyyy")} – ${Re(c, "MMM d, yyyy")}` : s ? Re(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ C(qe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: I("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(rs, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: I("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ C(Ke, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ C("div", { className: "cv-daterange-presets", children: [
        Xy.map((f) => /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "sm",
            className: I("cv-daterange-preset", e === f && "cv-daterange-preset--active"),
            onClick: () => {
              t(f), r(!1);
            },
            children: f
          },
          f
        )),
        /* @__PURE__ */ l(
          re,
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
        gl,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([Re(f.from, pn), Re(f.to, pn)]) : f != null && f.from ? t([Re(f.from, pn), Re(f.from, pn)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const tc = y.createContext({});
function Zy({
  createVariable: e,
  children: t
}) {
  const n = y.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(tc.Provider, { value: n, children: t });
}
function eb() {
  return y.useContext(tc);
}
function tb({ kind: e, value: t, onChange: n, className: r }) {
  const o = On(), i = (o == null ? void 0 : o.decls) ?? [], { createVariable: a } = eb(), [s, c] = y.useState(!1), [u, m] = y.useState(!1), [f, g] = y.useState(""), d = y.useMemo(() => ry(i, e), [i, e]), p = d.find((w) => w.name === t), h = (w) => {
    n(w), c(!1), m(!1);
  }, v = () => {
    if (!a) return;
    const w = ay(e, f || "Variable", i);
    a(w), h(w.name), g("");
  };
  return /* @__PURE__ */ C(
    qe,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: I("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(ru, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: I("cv-var-trigger-label", !p && "cv-var-trigger-label--placeholder"), children: p ? p.label ?? p.name : t || "Choose variable…" })
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
                w.name === t ? /* @__PURE__ */ l(nn, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          a ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ C("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              we,
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
            /* @__PURE__ */ l(re, { size: "sm", className: "cv-var-new-add", onClick: v, children: "Add" })
          ] }) : /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(Et, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function tn({
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
  const c = (u) => I("cv-bind-seg", u && "cv-bind-seg--active");
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
      tb,
      {
        kind: e,
        value: _e(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(_e(t) ? void 0 : t, (u) => n(u))
  ] });
}
const nb = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function to(e) {
  return "member" in e && "operator" in e;
}
function rb({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: o,
  disabled: i,
  className: a
}) {
  var O;
  const { meta: s } = Nt(), c = ((O = On()) == null ? void 0 : O.decls) ?? [], [u, m] = y.useState(null), [f, g] = y.useState(null), d = r ?? [], p = d.length === 1 && !to(d[0]) && "or" in d[0] && Array.isArray(d[0].or) && d[0].or.every(to) ? d[0] : void 0, h = p ? "any" : "all", v = [], w = [];
  p || d.forEach(($) => to($) ? v.push($) : w.push($));
  const S = p ? p.or : v, _ = w.length === 0 && (S.length >= 2 || h === "any"), k = ($) => h === "any" ? $.length ? [{ or: $ }] : [] : [...$, ...w], R = ($) => {
    const P = $.filter((z) => z.member.length > 0), E = k(P);
    o(E.length > 0 ? E : void 0);
  }, N = ($) => {
    const P = $ === "any" ? S.length ? [{ or: S }] : [] : [...S];
    o(P.length > 0 ? P : void 0);
  }, F = ($, P) => R(S.map((E, z) => z === $ ? { ...E, ...P } : E)), L = ($) => R(S.filter((P, E) => E !== $)), V = ($) => {
    const E = { ...f ?? { member: "", operator: "equals", values: [] }, ...$ };
    E.member ? (g(null), m(S.length), R([...S, E])) : g(E);
  };
  return /* @__PURE__ */ C("div", { "data-slot": "filter-builder", className: I("cv-filter-builder", a), children: [
    S.length === 0 && !f ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    _ ? /* @__PURE__ */ C("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Yt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: h,
          onChange: N
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    S.map(($, P) => {
      const E = Ee(s, $.member);
      return u === P ? /* @__PURE__ */ l(
        La,
        {
          leaf: $,
          member: E,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (z) => F(P, z),
          onDone: () => m(null),
          onRemove: () => L(P)
        },
        P
      ) : /* @__PURE__ */ l(
        ob,
        {
          text: ib($, E == null ? void 0 : E.label, c),
          disabled: i,
          onEdit: () => m(P),
          onRemove: () => L(P)
        },
        P
      );
    }),
    f ? /* @__PURE__ */ l(
      La,
      {
        leaf: f,
        member: Ee(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: V,
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
      re,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!f,
        onClick: () => {
          m(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Et, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function ob({
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
      re,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(rn, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function La({
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
  const { meta: u } = Nt(), m = Ia(t == null ? void 0 : t.type), f = m.includes(e.operator) ? e.operator : m[0], g = !Oo.has(f), d = y.useId(), p = y.useId(), h = y.useId(), v = y.useId(), w = y.useId(), S = y.useId();
  y.useEffect(() => {
    f !== e.operator && a({ operator: f });
  }, [e.operator, a, f]);
  const _ = (k) => {
    const R = Ee(u, k);
    a({ member: k, operator: Ia(R == null ? void 0 : R.type)[0], values: [] });
  };
  return /* @__PURE__ */ C("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ C("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ C("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ C(re, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(nn, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(rn, { className: "cv-ec-icon" })
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
          Li,
          {
            well: nb,
            placed: [],
            scope: o,
            blockReason: () => {
            },
            onSelect: _,
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
                    /* @__PURE__ */ l(Po, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(St, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        Ql,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: _,
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
            values: Oo.has(k) ? [] : e.values
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
            /* @__PURE__ */ l(We, { children: m.map((k) => /* @__PURE__ */ l(Ne, { value: k, children: Dl[k] }, k)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: S, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        ab,
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
function ib(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const o = Dl[e.operator] ?? e.operator;
  if (Oo.has(e.operator)) return `${r} ${o}`;
  const i = (e.values ?? []).map((a) => {
    if (_e(a)) {
      const s = n.find((c) => c.name === a.var);
      return `{${((s == null ? void 0 : s.label) ?? a.var).replace(/[{}]/g, "")}}`;
    }
    return String(a);
  });
  return i.length > 0 ? `${r} ${o} ${i.join(", ")}` : `${r} ${o} …`;
}
function ab({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: o
}) {
  const i = e ?? [], a = i.length === 1 && _e(i[0]);
  if (t === "time") {
    const u = a ? i[0] : lb(i);
    return /* @__PURE__ */ l(
      tn,
      {
        labelId: o,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : _e(m) ? [m] : cb(m)),
        renderFixed: (m, f) => /* @__PURE__ */ l(Vi, { value: m, onChange: f })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? i[0] : i.filter((u) => !_e(u));
  return /* @__PURE__ */ l(
    tn,
    {
      labelId: o,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : _e(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(sb, { id: r, values: u, onChange: m })
    }
  );
}
function sb({
  id: e,
  values: t,
  onChange: n
}) {
  const { text: r, onText: o, onBlur: i } = Ei({
    value: (t ?? []).map(String),
    parse: ub,
    format: db,
    onChange: n
  });
  return /* @__PURE__ */ l(
    we,
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
function lb(e) {
  const t = e.filter((n) => !_e(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function cb(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function ub(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function db(e) {
  return e.join(", ");
}
function mb({ spec: e, update: t, cube: n, scopeCubes: r, scope: o }) {
  const { query: i } = e, a = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ C(qe, { children: [
    /* @__PURE__ */ C(
      Ue,
      {
        className: I(
          "cv-filters-trigger",
          a > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(ou, { className: "cv-ec-icon--lg" }),
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
      /* @__PURE__ */ l(fb, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(rb, { cube: n, cubes: r, scope: o, value: i.filters, onChange: s })
    ] })
  ] });
}
function fb({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Nt(), o = Sy(r, n);
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
        className: I(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function gb(e, t, n, r) {
  var i;
  const o = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...o, ...r } } } });
}
function pb({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: o
}) {
  var f;
  const i = ((f = e.chart.axes) == null ? void 0 : f[n]) ?? {}, a = i.label ?? o ?? "", s = i.label === "", c = y.useId(), u = y.useId(), m = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ C("div", { className: I("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": m },
        value: a,
        placeholder: "No title",
        onChange: (g) => gb(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function hb({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ C("div", { className: I("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
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
          n ? /* @__PURE__ */ l(iu, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(au, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const nc = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: I("cv-label", e),
      ...t
    }
  )
);
nc.displayName = "Label";
function he({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: o,
  className: i,
  children: a
}) {
  return /* @__PURE__ */ C("div", { "data-slot": "field-row", className: I("cv-field-row", i), children: [
    /* @__PURE__ */ C("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(nc, { htmlFor: r, className: "cv-field-row-label", children: e }),
      o ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: o }) : null
    ] }),
    a,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Do({
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
      className: I("cv-switch", i),
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
      className: I("cv-switch-row", i),
      children: [
        /* @__PURE__ */ C(
          "label",
          {
            htmlFor: a,
            className: I("cv-switch-row-label", o && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(Do, { id: a, checked: n, onChange: r, disabled: o })
      ]
    }
  );
}
const vb = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, yb = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function bb({ spec: e, update: t }) {
  var w, S, _;
  const n = Rt(), { chart: r } = e, o = r.family, i = r.familyOptions ?? {}, a = n.require(o);
  if (a.Customize) {
    const k = a.Customize;
    return /* @__PURE__ */ l(k, { spec: e, update: t });
  }
  const s = (k) => t({ ...e, chart: { ...r, ...k } }), c = (k) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...k } } }), u = ((S = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : S.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (o === "area" ? u : n.defaults(o).envelope.stackMode) ?? "none", f = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", g = ((_ = r.transform) == null ? void 0 : _.kind) ?? "none", d = vi(a) ? /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      he,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ C(
          Ge,
          {
            value: g,
            onValueChange: (k) => {
              var R;
              return s({
                transform: k === "none" ? void 0 : k === "rollingAvg" ? { kind: "rollingAvg", window: ((R = r.transform) == null ? void 0 : R.window) ?? tr } : { kind: k }
              });
            },
            children: [
              /* @__PURE__ */ l(Be, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(je, {}) }),
              /* @__PURE__ */ l(We, { children: yb.map((k) => /* @__PURE__ */ l(Ne, { value: k, children: vb[k] }, k)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(Rb, { label: "Window (points)", children: (k) => {
      var R;
      return /* @__PURE__ */ l(
        kb,
        {
          id: k,
          value: ((R = r.transform) == null ? void 0 : R.window) ?? tr,
          onChange: (N) => s({ transform: { kind: "rollingAvg", window: N } })
        }
      );
    } }) : null
  ] }) : null, p = /* @__PURE__ */ l(he, { label: "Line shape", children: /* @__PURE__ */ l(
    Yt,
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
  ) }), h = /* @__PURE__ */ l(he, { label: "Stacked", children: /* @__PURE__ */ l(
    Yt,
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
    var k, R;
    switch (o) {
      case "bar":
        return /* @__PURE__ */ C(Ce, { children: [
          /* @__PURE__ */ l(
            wt,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (N) => s({ orientation: N ? "horizontal" : "vertical" })
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
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((R = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : R.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ C(Ce, { children: [
          /* @__PURE__ */ l(
            wt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (N) => c({ innerRadiusPct: N ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(he, { label: "Slice labels", children: /* @__PURE__ */ l(
            Yt,
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
function wb(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || vi(n);
}
const rc = 2, oc = 90;
function Cb(e) {
  const t = parseInt(e, 10);
  return Number.isFinite(t) ? Math.min(oc, Math.max(rc, t)) : tr;
}
function Sb(e) {
  return String(e);
}
function kb({
  id: e,
  value: t,
  onChange: n
}) {
  const { text: r, onText: o, onBlur: i } = Ei({
    value: t,
    parse: Cb,
    format: Sb,
    onChange: n
  });
  return /* @__PURE__ */ l(
    we,
    {
      id: e,
      type: "number",
      min: rc,
      max: oc,
      className: "cv-ec-h8 cv-transform-window",
      value: r,
      onChange: (a) => o(a.target.value),
      onBlur: i
    }
  );
}
function Rb({
  label: e,
  children: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ C("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function ic(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function ac(e, t) {
  const n = [...t], r = [], o = [];
  for (const i of e) {
    if (!et(i)) continue;
    const a = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < a; )
      Fe(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || o.push(i);
  }
  return { matched: r, missing: o, leftover: n };
}
function Nb(e) {
  let t = 0;
  for (const n of e)
    et(n) && (t += n.optional ? 1 : 3);
  return t;
}
function xb(e, t) {
  return e.some((n) => et(n) && n.cardinality === "many" && Fe(n, t));
}
const _b = 0.35, Mb = 0.4, Fb = 0.3, $b = 0.1;
function Ab(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Fb : e.supportsCartesianAxes ? $b : e.wells.some(
    (o) => et(o) && o.channel === "x" && Fe(o, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function sc(e) {
  const t = e.filter(et);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Ob(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Ib = (e, t, n) => e === 1 ? t : n;
function Tb(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Ob(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const o = n.get("x") ?? [], i = n.get("y") ?? [], a = `${r} ${Ib(r, "measure", "measures")}`;
  return sc(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : o.includes("number") && i.includes("number") ? "One measure against another" : o.includes("time") ? `${a} over time` : o.includes("category") ? n.has("color") ? `${a} by category, split in colours` : `${a} by category` : r === 1 ? "One headline number" : r > 1 ? `${a}, no breakdown` : "Fits your fields";
}
function Pb(e, t) {
  const n = ic(t), r = n.map((a) => a.kind), o = r.includes("time"), i = [];
  for (const a of e.list()) {
    if (a.queryless) continue;
    const s = a.wells, c = ac(s, n), u = Nb(s), m = Math.max(0, n.length - c.matched.length), f = Iy(s, r) + 0.5 * m, g = u > 0 ? f / u : 0, d = c.leftover.filter(
      (h) => h.kind !== "time" && !xb(s, h.kind)
    ).length, p = g - _b * d + Ab(a, o) - (sc(s) ? Mb : 0);
    i.push({
      family: a.family,
      descriptor: a,
      score: Math.round(p * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Tb(a, c)
    });
  }
  return i.sort((a, s) => s.score - a.score || a.descriptor.order - s.descriptor.order);
}
function Eb(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Db(e, t, n) {
  const r = e.require(n), o = ac(r.wells, ic(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const a of o.matched)
    a.members.forEach((s, c) => {
      i = jt(i, n, a.well.id, s, a.kinds[c], e);
    });
  return i;
}
function lc(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Py(e, r, n));
  };
}
function Lb({ spec: e, update: t, empty: n }) {
  const r = Rt(), o = e.chart.family, i = lc(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ C("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(cc, { spec: e, family: o, onPick: i, families: r })
  ] }) }) : null;
}
function Vb({ spec: e, update: t }) {
  const n = Rt(), r = e.chart.family, o = lc(e, t, n), i = n.require(r), a = i.icon;
  return /* @__PURE__ */ C(qe, { children: [
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
      /* @__PURE__ */ l(cc, { spec: e, family: r, onPick: o, families: n }),
      wb(r, n) ? /* @__PURE__ */ C("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(bb, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function cc({ spec: e, family: t, onPick: n, families: r }) {
  const o = y.useMemo(() => Pb(r, e), [r, e]), i = y.useMemo(() => Eb(o), [o]), a = y.useMemo(
    () => new Map(o.map((f) => [f.family, f])),
    [o]
  ), s = y.useMemo(
    () => new Set(o.filter((f) => f.fits).map((f) => f.family)),
    [o]
  ), c = jb(e, r, s), u = (f, g) => /* @__PURE__ */ l(
    zb,
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
function zb({
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
      className: I("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Jb,
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
function uc(e, t) {
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
function Hb(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((o) => o.granularity !== void 0)) ?? !1);
}
const Va = 200, Gb = () => () => {
};
function jb(e, t, n) {
  const r = e.query, o = Hb(r), i = y.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, Va) : Va
    };
  }, [r]), a = On(), s = y.useRef(null);
  s.current === null && (s.current = il());
  const c = s.current, u = () => a ? c(i, a.store.getAll(), a.decls) : i, m = y.useSyncExternalStore(
    a ? a.store.subscribe : Gb,
    u,
    u
  ), { resultSet: f } = ul(m, { skip: !o });
  return y.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const d of t.list()) {
      const p = d.family;
      if (d.queryless || o && n.has(p) && !f) continue;
      const w = (f && n.has(p) ? Bb(e, p, t, f, m) : void 0) ?? Xb(p, t);
      w && g.set(p, w);
    }
    return g;
  }, [e, t, f, m, n, o]);
}
function Bb(e, t, n, r, o) {
  try {
    const i = t === e.chart.family ? e : Db(n, e, t), a = uc(i.chart, n), s = tl(r, a, i.query ?? o, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(o)}`, data: s, options: a };
  } catch {
    return;
  }
}
const Vt = "sample.category", Fn = "sample.group", Ae = "sample.value", Qe = "sample.count", dc = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Lo = [18, 27, 21, 34, 26, 39], Vo = [12, 9, 17, 14, 22, 16], Wb = dc.flatMap((e, t) => [
  { [Vt]: e, [Fn]: "North", [Ae]: Lo[t], [Qe]: Vo[t] },
  {
    [Vt]: e,
    [Fn]: "South",
    [Ae]: Math.round(Lo[t] * 0.62),
    [Qe]: Math.round(Vo[t] * 0.78)
  }
]), qb = {
  measures: [Ae, Qe],
  dimensions: [Vt, Fn]
}, Ub = {
  measures: {
    [Ae]: { title: "Value", shortTitle: "Value", type: "number" },
    [Qe]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [Vt]: { title: "Day", shortTitle: "Day", type: "string" },
    [Fn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function mc(e) {
  const t = [
    { key: Ae, label: "Value", data: Lo, colorToken: "chart-1" },
    { key: Qe, label: "Count", data: Vo, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: dc,
    series: t,
    raw: { rows: Wb, query: qb, annotation: Ub },
    empty: !1
  };
}
const Kb = mc(1), Yb = mc(2), hn = (e, t) => ({
  family: e,
  mapping: { category: { member: Vt }, series: { mode: "measures", members: t } }
}), Qb = {
  bar: hn("bar", [Ae, Qe]),
  line: hn("line", [Ae, Qe]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: hn("area", [Ae, Qe]),
  pie: hn("pie", [Ae]),
  scatter: { family: "scatter", familyOptions: { x: Ae, y: Qe } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: Vt },
      series: { mode: "pivot", value: Ae, pivot: Fn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ae, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: Vt }, { member: Ae }, { member: Qe }] }
  }
};
function Xb(e, t) {
  const n = Qb[e] ?? hn(e, [Ae, Qe]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Kb : Yb,
    options: uc(n, t)
  };
}
const Jb = y.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const o = y.useRef(null);
  return y.useEffect(() => {
    const i = o.current;
    if (i)
      for (const a of i.querySelectorAll("[tabindex]")) a.tabIndex = -1;
  }), /* @__PURE__ */ l(Zb, { fallback: r, children: /* @__PURE__ */ l("div", { ref: o, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Zs,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Zb extends y.Component {
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
function e0(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function t0(e, t, n, r, o, i) {
  var W, K, ne, Se, ke;
  const { chart: a, query: s } = e, c = a.family, u = n.kinds.length === 1 ? n.kinds[0] : n0(o), m = a.familyOptions ?? {}, f = Array.isArray(m.columns) ? m.columns : [], g = Gl(a), d = g[r], p = c === "table" && n.id === "columns", h = c === "bar" || c === "line" || c === "area", v = ((K = (W = a.mapping) == null ? void 0 : W.series) == null ? void 0 : K.mode) === "measures", w = h && n.id === "y", S = w && v, _ = p ? (ne = f.find((Q) => Q.member === r)) == null ? void 0 : ne.label : S ? d == null ? void 0 : d.label : void 0, k = S ? d == null ? void 0 : d.colorToken : void 0, R = Tn(s), N = n.kinds.includes("time") && (R == null ? void 0 : R.dimension) === r, F = N ? R == null ? void 0 : R.granularity : void 0, L = N ? R == null ? void 0 : R.dateRange : void 0, V = (c === "line" || c === "area") && n.id === "y" && v, O = V ? d == null ? void 0 : d.dots : void 0, $ = (Q) => {
    var ve, Me;
    if ((ve = a.mapping) != null && ve.series && a.mapping.series.mode !== "measures") return;
    const le = ((Me = a.mapping) != null && Me.series && a.mapping.series.mode === "measures" ? a.mapping.series.members : s.measures) ?? [], fe = { ...g };
    Q && Object.keys(Q).length > 0 ? fe[r] = Q : delete fe[r];
    const Te = In(a);
    Te && t({
      ...e,
      chart: {
        ...a,
        mapping: { category: { member: Te }, series: jl(le, fe) }
      }
    });
  }, P = (Q) => {
    const le = f.map((fe) => fe.member === r ? { ...fe, ...Q } : fe);
    t({ ...e, chart: { ...a, familyOptions: { ...m, columns: le } } });
  }, E = (Q) => {
    p ? P({ label: Q }) : S && $({ ...d, label: Q });
  }, z = (Q) => {
    S && $({ ...d, colorToken: Q ?? void 0 });
  }, H = (Q) => {
    if (!R) return;
    const le = { ...R };
    for (const fe of Object.keys(Q)) {
      const Te = Q[fe];
      Te === void 0 ? delete le[fe] : le[fe] = Te;
    }
    t({ ...e, query: { ...s, timeDimensions: [le] } });
  }, D = (Q) => H({ granularity: Q }), X = (Q) => H({ dateRange: Q }), J = (Q) => {
    S && $({ ...d, dots: Q });
  }, ee = () => t(ql(e, c, n.id, r, i)), ue = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), me = (Se = a.mapping) == null ? void 0 : Se.series, se = (me && me.mode === "pivot" ? me.value : Io(a)[0]) ?? ((ke = s.measures) == null ? void 0 : ke[0]), te = ue ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...se ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...se ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ye = (() => {
    const Q = e0(s.order)[0];
    if (!Q) return "none";
    const [le, fe] = Q;
    return se && le === se ? fe === "desc" ? "value-desc" : "value-asc" : le === r ? u === "time" ? fe === "desc" ? "time-desc" : "time-asc" : fe === "asc" ? "label-asc" : "label-desc" : "none";
  })(), G = (Q) => {
    let le;
    switch (Q) {
      case "none":
        le = void 0;
        break;
      case "value-desc":
        le = se ? [[se, "desc"]] : void 0;
        break;
      case "value-asc":
        le = se ? [[se, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        le = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        le = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: le } });
  }, oe = typeof s.limit == "number" ? s.limit : void 0, de = (Q) => t({ ...e, query: { ...s, limit: Q && Q > 0 ? Q : void 0 } }), M = (c === "bar" || c === "line" || c === "area") && N, x = M && m.comparePrevious === !0;
  return {
    kind: u,
    label: _,
    colorToken: k,
    granularity: F,
    dateRange: L,
    dots: O,
    canPoints: V,
    canRename: p || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && v,
    isTimeField: N,
    isCategoryField: ue,
    sortValue: ye,
    sortOptions: te,
    onSort: G,
    limit: oe,
    onLimit: de,
    canComparePrevious: M,
    comparePrevious: x,
    comparePreviousReady: M && L !== void 0,
    onComparePrevious: (Q) => t({ ...e, chart: { ...a, familyOptions: { ...m, comparePrevious: Q || void 0 } } }),
    onRename: E,
    onRecolor: z,
    onGranularity: D,
    onDateRange: X,
    onDots: J,
    onRemove: ee
  };
}
function n0(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function zo(e, t, n, r) {
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
function r0(e, t) {
  return e.allowedCubes.includes(t);
}
function o0(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const o = e.get(r.shift());
    for (const i of (o == null ? void 0 : o.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function fc(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function Ho(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = o0(e, n);
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
function i0(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    Ho(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function za(e, t, n, r) {
  var k;
  const o = Tr(e), i = o.filter((R) => R.type === "view"), a = kn(t, r), s = Object.values(a).flat();
  let c;
  for (const R of s) {
    const N = Ee(e, R);
    if (N) {
      c = N;
      break;
    }
  }
  const u = !c && n ? pt(e, n) : void 0, m = c ? pt(e, c.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, g = t.query.measures ?? [], d = g.length ? Bt(g[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: i, measureSource: d, allowedCubes: [f] };
  const p = d ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), h = p ? pt(e, p) : void 0, v = fc(o), w = /* @__PURE__ */ new Set();
  for (const R of s) {
    const N = (k = Ee(e, R)) == null ? void 0 : k.cube;
    N && v.has(N) && w.add(N);
  }
  d && v.has(d) && w.add(d), !w.size && p && v.has(p) && w.add(p);
  const S = i0(v, w), _ = S.filter((R) => R !== p).map((R) => v.get(R)).sort((R, N) => R.title.localeCompare(N.title));
  return {
    sourceCube: (h == null ? void 0 : h.type) === "cube" ? h : void 0,
    relatedCubes: _,
    views: i,
    measureSource: d,
    allowedCubes: S
  };
}
function a0(e, t, n) {
  if (!t) return e;
  const r = fc(Tr(t)), o = e.query ?? {}, i = new Set(Object.values(kn(e, n)).flat()), a = (h) => {
    const v = Bt(h);
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
  if (Ho(r, s)) return e;
  const u = (o.measures ?? []).map(a).find((h) => h !== void 0) ?? [...i].map((h) => {
    var v;
    return (v = Ee(t, h)) == null ? void 0 : v.cube;
  }).find((h) => h !== void 0 && r.has(h));
  if (!u) return e;
  const m = /* @__PURE__ */ new Set([u]), f = (h) => Ho(r, /* @__PURE__ */ new Set([...m, h])) && (m.add(h), !0), g = [];
  for (const h of c) {
    const v = a(h.dimension);
    if (v && f(v)) {
      g.push(h);
      continue;
    }
    if (i.has(h.dimension))
      g.push(h);
    else {
      const w = Il(t, u);
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
class Pr extends y.Component {
  constructor() {
    super(...arguments);
    Er(this, "state", { error: null, resetKey: this.props.resetKey });
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
      /* @__PURE__ */ l(su, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
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
const s0 = vt.options;
function l0({
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
      className: I("cv-color-picker", o),
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
            className: I(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        s0.map((i) => {
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
              className: I(
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
function c0({
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
  const u = Rt(), m = Ar(), f = t0(e, t, n, r, o, u), g = y.useId(), d = y.useId(), p = y.useId(), h = y.useId(), v = y.useId(), w = y.useId(), S = (o == null ? void 0 : o.label) ?? r, _ = f.label || S, k = f.canColor && i !== void 0, R = f.canRename || k || f.isTimeField || f.isCategoryField || f.canPoints || s !== void 0, N = (O) => {
    const $ = O.trim();
    f.onRename($.length > 0 ? $ : void 0);
  }, F = (O) => {
    !a || !O.altKey || (O.key === "ArrowUp" && a.index > 0 ? (O.preventDefault(), a.onMove(-1)) : O.key === "ArrowDown" && a.index < a.total - 1 && (O.preventDefault(), a.onMove(1)));
  }, L = /* @__PURE__ */ C(Ce, { children: [
    a ? /* @__PURE__ */ l(lu, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
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
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Mi(o, m) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: _ })
  ] }), V = a ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "field-pill",
      className: I("cv-field-pill", (a == null ? void 0 : a.dragging) && "cv-field-pill--dragging", c),
      draggable: !!a,
      onDragStart: a == null ? void 0 : a.onDragStart,
      onDragOver: a ? (O) => {
        O.preventDefault(), a.onDragOver();
      } : void 0,
      onDragEnd: a == null ? void 0 : a.onDragEnd,
      onKeyDown: a ? F : void 0,
      children: [
        R ? /* @__PURE__ */ C(qe, { children: [
          /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${_}${V}`,
              ...a ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: L
            }
          ) }),
          /* @__PURE__ */ l(Ke, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ C("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(u0, { getSwap: s, display: _ }) : null,
            f.canRename ? /* @__PURE__ */ C("label", { className: "cv-ec-field", htmlFor: g, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                we,
                {
                  id: g,
                  defaultValue: f.label ?? "",
                  placeholder: S,
                  className: "cv-ec-h8",
                  onBlur: (O) => N(O.target.value),
                  onKeyDown: (O) => {
                    O.key === "Enter" && (N(O.target.value), O.target.blur());
                  }
                }
              )
            ] }) : null,
            k ? /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(l0, { value: f.colorToken, onChange: f.onRecolor })
            ] }) : null,
            f.isTimeField ? /* @__PURE__ */ C(Ce, { children: [
              /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  tn,
                  {
                    kind: "dateRange",
                    value: f.dateRange,
                    onChange: f.onDateRange,
                    renderFixed: (O, $) => /* @__PURE__ */ l(Vi, { value: O, onChange: $ })
                  }
                )
              ] }),
              /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  tn,
                  {
                    kind: "granularity",
                    value: f.granularity,
                    onChange: f.onGranularity,
                    renderFixed: (O, $) => /* @__PURE__ */ l(
                      Al,
                      {
                        value: O,
                        onChange: $,
                        allowAuto: !0,
                        autoHint: bi(f.dateRange),
                        options: rl(f.dateRange),
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
                    Do,
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
                    onChange: (O) => f.onSort(O.target.value),
                    className: "cv-field-pill-select",
                    children: f.sortOptions.map((O) => /* @__PURE__ */ l("option", { value: O.key, children: O.label }, O.key))
                  }
                )
              ] }),
              /* @__PURE__ */ C("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: h, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  we,
                  {
                    id: h,
                    type: "number",
                    min: 1,
                    defaultValue: f.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (O) => {
                      const $ = O.target.value.trim();
                      f.onLimit($ === "" ? void 0 : Number($));
                    },
                    onKeyDown: (O) => {
                      if (O.key === "Enter") {
                        const $ = O.target.value.trim();
                        f.onLimit($ === "" ? void 0 : Number($)), O.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            f.canPoints ? /* @__PURE__ */ C("label", { className: "cv-ec-row", htmlFor: w, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Do, { id: w, checked: f.dots === !0, onChange: f.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ C(
              re,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: f.onRemove,
                children: [
                  /* @__PURE__ */ l(lo, { className: "cv-ec-icon" }),
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
              title: `${_}${V}`,
              ...a ? {
                tabIndex: 0,
                "aria-label": `${_}, position ${a.index + 1} of ${a.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: L
            }
          )
        ),
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: f.onRemove,
            "aria-label": `Remove ${_}`,
            children: /* @__PURE__ */ l(lo, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function u0({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ C(Ce, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(Kl, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
      n.hint ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: n.hint }) : null
    ] }) : null,
    /* @__PURE__ */ l(
      Li,
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
          /* @__PURE__ */ l(cu, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function d0({
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
  control: _
}) {
  const k = n.cardinality === "many" && !d, R = k || r.length === 0, N = r.length, F = g === "vertical", L = h ?? n.label, V = k && N > 1 && !p, [O, $] = y.useState(null), P = ["number", "category", "time"].filter((H) => !Fe(n, H)).map((H) => Fi(n, H, r)).find((H) => H !== void 0) ?? n.hint, E = o.length === 0 && !n.optional && Fe(n, "number") ? "Pick a number to get started" : void 0, z = /* @__PURE__ */ l(
    Li,
    {
      well: n,
      placed: o,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: w ?? (F ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          title: P,
          className: I(
            "cv-well-add",
            F && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Et, { className: "cv-ec-icon" }),
            r.length === 0 ? L : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "well-group",
      className: I("cv-well-group", !F && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ C("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: L }),
          f ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: f }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        _ ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: _ }) : null,
        /* @__PURE__ */ l(Pr, { label: L, resetKey: e, children: /* @__PURE__ */ C("div", { className: I("cv-well-fields", F ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((H, D) => /* @__PURE__ */ l(
            c0,
            {
              spec: e,
              update: t,
              well: n,
              member: H,
              option: i(H),
              resolvedColor: a(H),
              getSwap: m ? () => m(H) : void 0,
              className: F ? "cv-field-pill--full" : void 0,
              reorder: V ? {
                index: D,
                total: N,
                dragging: O === D,
                onDragStart: () => $(D),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  O === null || O === D || (t(zo(e, n, O, D)), $(D));
                },
                onDragEnd: () => $(null),
                onMove: (X) => t(zo(e, n, D, D + X))
              } : void 0
            },
            H
          )),
          R ? z : null
        ] }) }),
        E ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: E }) : null,
        v ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: v }) : null
      ]
    }
  );
}
function no({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ C(qe, { children: [
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
    /* @__PURE__ */ l(Ke, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Pr, { label: e, children: n }) })
  ] });
}
function zi(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function m0({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = zi(e, t), o = Hl(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], a = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (f) => {
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
    /* @__PURE__ */ l(Rn, { label: "Time field", children: ({ id: f }) => /* @__PURE__ */ l(
      Ql,
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
    i != null && i.dimension ? /* @__PURE__ */ l(Rn, { label: "Date range", children: ({ labelId: f }) => /* @__PURE__ */ l(
      tn,
      {
        labelId: f,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => u({ dateRange: g }),
        renderFixed: (g, d) => /* @__PURE__ */ l(Vi, { value: g, onChange: d })
      }
    ) }) : null,
    /* @__PURE__ */ l(he, { label: "Display", children: /* @__PURE__ */ l(
      Yt,
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
    a === "gauge" ? /* @__PURE__ */ l(Rn, { label: "Gauge max", children: ({ id: f }) => /* @__PURE__ */ l(
      we,
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
function f0({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = zi(e, t), o = n.comparison, i = o !== void 0, a = y.useRef(void 0);
  o && (a.current = o);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (o == null ? void 0 : o.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(he, { label: "Compare to", children: /* @__PURE__ */ l(
      Yt,
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
      (o == null ? void 0 : o.mode) === "value" ? /* @__PURE__ */ l(Rn, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        we,
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
        /* @__PURE__ */ l(es, { className: "cv-kpi-warn-icon" }),
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
function g0({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = zi(e, t), o = n.sparkline, i = o !== void 0, a = o == null ? void 0 : o.granularity, s = rl((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(Rn, { label: "Trend", children: ({ id: m, labelId: f }) => /* @__PURE__ */ l(
      tn,
      {
        labelId: f,
        kind: "granularity",
        value: a,
        onChange: (g) => r({
          sparkline: g === void 0 ? void 0 : { ...o, granularity: g }
        }),
        renderFixed: (g, d) => /* @__PURE__ */ l(
          Al,
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
function Rn({
  label: e,
  children: t
}) {
  const n = y.useId(), r = y.useId();
  return /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function p0({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var G, oe, de;
  const { meta: o } = Nt(), i = Rt(), a = y.useCallback(
    (T) => t(a0(T, o, i)),
    [t, o, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), m = u.queryless ?? !1, f = u.enforcesAxisUnit, g = Hl(e), d = Ar(), p = y.useMemo(() => Dy(c, i), [c, i]), h = y.useMemo(() => kn(e, i), [e, i]), v = y.useMemo(() => new Map(p.map((T) => [T.id, T])), [p]), w = y.useMemo(
    () => za(o, e, void 0, i),
    [o, e, i]
  ), S = y.useMemo(() => Object.values(h).flat(), [h]), _ = y.useMemo(
    () => {
      var T;
      return w.viewLocked ? [w.viewLocked] : [(T = w.sourceCube) == null ? void 0 : T.name, ...w.relatedCubes.map((M) => M.name)].filter(
        Boolean
      );
    },
    [w]
  ), k = y.useMemo(
    () => Object.values(h).every((T) => T.length === 0),
    [h]
  ), R = y.useCallback(
    (T) => {
      const M = (T.y ?? [])[0], x = M ? Ee(o, M) : void 0;
      return {
        leftKey: M ? Bl(x) : void 0,
        leftLabel: M ? h0(x, d(x == null ? void 0 : x.unit)) : void 0
      };
    },
    [o, d]
  ), N = y.useMemo(() => R(h), [R, h]), F = y.useCallback(
    (T, M) => (x, A) => {
      var j;
      if (A) {
        if (!r0(T, A.cube))
          return "Clear the current fields to use a different dataset.";
        if (A.memberType === "measure" && T.measureSource && A.cube !== T.measureSource)
          return `This chart's numbers come from ${((j = T.sourceCube) == null ? void 0 : j.title) ?? T.measureSource}. Remove them to use another table.`;
        if (f && x === "y" && A.memberType === "measure")
          return By(A, M.leftKey, M.leftLabel);
      }
    },
    [f]
  ), L = y.useMemo(
    () => F(w, N),
    [F, w, N]
  ), V = N.leftLabel, O = y.useMemo(() => {
    var M;
    const T = {};
    if (c === "bar" || c === "line" || c === "area") {
      const x = (M = s.mapping) == null ? void 0 : M.series;
      if (x && x.mode === "measures") {
        const A = x.members.map((W) => {
          var K, ne;
          return { key: W, colorToken: (ne = (K = x.meta) == null ? void 0 : K[W]) == null ? void 0 : ne.colorToken };
        }), j = el(A, s.colors);
        x.members.forEach((W, K) => {
          T[W] = j[K];
        });
      }
    }
    return T;
  }, [c, s.mapping, s.colors]), $ = y.useCallback(
    (T, M, x) => {
      const A = Ee(o, M);
      if (L(T, A)) return;
      let j = x === "geoPoint" && (A != null && A.latMember) && A.lngMember ? jt(
        jt(e, c, "lat", A.latMember, "numberDimension", i),
        c,
        "lng",
        A.lngMember,
        "numberDimension",
        i
      ) : jt(e, c, T, M, x, i);
      const W = u.canonicalTimeWell;
      if (W && T !== W && (h[W] ?? []).length === 0) {
        const K = Il(o, A == null ? void 0 : A.cube);
        K && K.name !== M && !L(W, K) && (j = jt(j, c, W, K.name, "time", i));
      }
      a(j);
    },
    [L, o, a, e, c, i, u, h]
  ), P = y.useCallback(
    (T, M) => {
      if (m) return;
      const x = v.get(T), A = Ee(o, M);
      if (!x || !A) return;
      const j = (h[T] ?? []).indexOf(M), W = ql(e, c, T, M, i), K = kn(W, i), ne = za(o, W, void 0, i), Se = F(ne, R(K)), ke = K[T] ?? [], Q = Object.values(K).flat(), le = (ge, Ve) => {
        if (ge === M) return;
        let Ye = jt(W, c, T, ge, Ve, i);
        const at = (kn(Ye, i)[T] ?? []).indexOf(ge);
        j >= 0 && at > j && (Ye = zo(Ye, x, at, j)), a(Ye);
      }, fe = Tl(o, A), Te = pt(o, A.cube), ve = fe.length > 1 ? {
        options: fe.map((ge, Ve) => {
          const Ye = ge.memberType === "measure" ? "number" : "numberDimension", zt = ge.name === M ? void 0 : Xl(x, Ye, ke, ge, (Pn) => Se(T, Pn)), at = Ti(ge);
          return {
            label: Yl(ge, pt(o, ge.cube)),
            selected: ge.name === M,
            disabled: zt !== void 0,
            title: zt ?? (at ? Pi(Te) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: at && Ve > 0,
            onSelect: () => le(ge.name, Ye)
          };
        })
      } : void 0, it = S.filter((ge) => {
        var Ve;
        return ((Ve = Ee(o, ge)) == null ? void 0 : Ve.cube) === A.cube;
      }).length === 1 ? vy(A) : void 0;
      return {
        picker: {
          well: x,
          placed: Q,
          inWell: ke,
          scope: ne,
          blockReason: (ge) => Se(T, ge),
          onSelect: le
        },
        agg: ve,
        hint: ve ? zy(fe, Te, A) : void 0,
        notice: it
      };
    },
    [m, v, o, h, S, e, c, i, F, R, a]
  ), E = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, z = E.left.map((T) => v.get(T)).filter(Boolean), H = E.bottom.map((T) => v.get(T)).filter(Boolean), D = (G = h.color) == null ? void 0 : G[0], X = ((oe = h.y) == null ? void 0 : oe.length) ?? 0, J = D && X > 1 ? `${X} values × ${((de = Ee(o, D)) == null ? void 0 : de.label) ?? "this split"} — one series per value per group.` : void 0, ee = u.hasLegend, ue = (h.y ?? [])[0], me = (T) => {
    var A, j, W, K;
    if (!T) return;
    const M = (A = s.mapping) == null ? void 0 : A.series;
    return (M && M.mode === "measures" ? (W = (j = M.meta) == null ? void 0 : j[T]) == null ? void 0 : W.label : void 0) ?? ((K = Ee(o, T)) == null ? void 0 : K.label);
  }, se = (T) => {
    var x, A, j, W;
    const M = (K, ne) => ne ? /* @__PURE__ */ l(pb, { spec: e, update: a, axis: K, title: "Title", auto: me(ne) }) : null;
    switch (T) {
      case "y":
        return M("y", ue);
      // the single value axis
      case "x":
        return M("x", (A = (x = s.mapping) == null ? void 0 : x.category) == null ? void 0 : A.member);
      case "sy":
        return M("y", (j = h.sy) == null ? void 0 : j[0]);
      // scatter Y axis
      case "sx":
        return M("x", (W = h.sx) == null ? void 0 : W[0]);
      // scatter X axis
      default:
        return null;
    }
  }, te = (T, M) => /* @__PURE__ */ l(
    d0,
    {
      spec: e,
      update: a,
      well: T,
      placed: h[T.id] ?? [],
      allPlaced: S,
      optionFor: (x) => Ee(o, x),
      colorFor: (x) => O[x],
      scope: w,
      blockReason: (x) => L(T.id, x),
      onAdd: (x, A) => $(T.id, x, A),
      swapFor: (x) => P(T.id, x),
      badge: T.id === "y" ? V : void 0,
      orientation: M,
      note: T.id === "color" ? J : void 0,
      control: se(T.id)
    },
    T.id
  ), ye = () => {
    var A;
    const T = v.get("value"), M = (h.value ?? []).length > 0, x = s.familyOptions ?? {};
    return /* @__PURE__ */ C(Ce, { children: [
      /* @__PURE__ */ C("div", { className: "cv-edit-kpi-value", children: [
        T ? te(T, "vertical") : null,
        M ? /* @__PURE__ */ l(
          no,
          {
            label: "Time, range & display",
            summary: x.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(m0, { spec: e, update: a })
          }
        ) : null
      ] }),
      M ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l(
          no,
          {
            label: "Comparison",
            summary: x.comparison === void 0 ? "None" : x.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(f0, { spec: e, update: a })
          }
        ),
        /* @__PURE__ */ l(
          no,
          {
            label: "Trend",
            summary: sy(
              (A = x.sparkline) == null ? void 0 : A.granularity
            ),
            children: /* @__PURE__ */ l(g0, { spec: e, update: a })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ C("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !k || m ? /* @__PURE__ */ l(Vb, { spec: e, update: a }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-actions", children: [
        S.length > 0 && w.sourceCube ? /* @__PURE__ */ C(
          "span",
          {
            className: "cv-edit-anchor",
            title: w.sourceCube.grain ?? w.sourceCube.title,
            children: [
              /* @__PURE__ */ l(is, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: w.sourceCube.title }),
              w.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: w.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(mb, { spec: e, update: a, cube: g, scopeCubes: _, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-body", children: [
      z.length > 0 ? /* @__PURE__ */ l("div", { className: I("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ye() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        z.map((T) => te(T, "vertical"))
      ) }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ C("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Lb, { spec: e, update: a, empty: k && !m })
        ] }),
        H.length > 0 ? /* @__PURE__ */ C("div", { className: "cv-edit-overlay-bottom", children: [
          H.map((T) => te(T, "horizontal")),
          ee && !k ? /* @__PURE__ */ l(hb, { spec: e, update: a }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function h0(e, t) {
  const n = Wl(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function gc(e, t) {
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
function ro(e) {
  const t = bs.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function oo(e) {
  return JSON.stringify(e);
}
function v0(e, t) {
  return e !== t;
}
function y0({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, o] = y.useState(() => ({
    spec: e,
    issues: ro(e)
  })), [i, a] = y.useState(e), s = y.useRef(oo(e)), c = gc((d) => {
    s.current = oo(d), t(d);
  }, n);
  y.useEffect(() => {
    const d = oo(e);
    v0(d, s.current) && (c.cancel(), s.current = d, o({ spec: e, issues: ro(e) }), a(e));
  }, [e, c]);
  const u = r.spec, m = r.issues, f = m.length === 0, g = y.useCallback(
    (d) => {
      const p = ro(d);
      o({ spec: d, issues: p }), p.length === 0 && (a(d), c(d));
    },
    [c]
  );
  return { draft: u, issues: m, valid: f, committed: i, update: g };
}
const b0 = () => {
};
function w0({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: o = !1,
  className: i
}) {
  const a = Rt(), { draft: s, issues: c, valid: u, committed: m, update: f } = y0({
    spec: e,
    onChange: t ?? b0,
    debounceMs: r
  }), g = a.get(s.chart.family), d = (g == null ? void 0 : g.queryless) ?? !1, p = m, h = (F) => {
    var L, V, O;
    return (((L = F == null ? void 0 : F.measures) == null ? void 0 : L.length) ?? 0) > 0 || (((V = F == null ? void 0 : F.dimensions) == null ? void 0 : V.length) ?? 0) > 0 || (((O = F == null ? void 0 : F.timeDimensions) == null ? void 0 : O.some(($) => typeof $.granularity == "string")) ?? !1);
  }, v = (F) => {
    var L;
    return (((L = F == null ? void 0 : F.measures) == null ? void 0 : L.length) ?? 0) > 0;
  }, w = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", S = d || h(s.query) && h(p.query) && (!w || v(s.query) && v(p.query)), _ = w && !v(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", k = y.useCallback(
    (F) => {
      f({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...F }
        }
      });
    },
    [s, f]
  ), R = S ? /* @__PURE__ */ l(
    Si,
    {
      query: p.query ?? {},
      chart: p.chart,
      editing: !0,
      updateFamilyOptions: k
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: _ }) }), N = n ? /* @__PURE__ */ C(re, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(ls, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "chart-editor",
      className: I("cv-chart-editor", o ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ C(vr, { variant: "destructive", children: [
          /* @__PURE__ */ l(Ko, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(yr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(br, { children: /* @__PURE__ */ C("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((F, L) => /* @__PURE__ */ C("li", { children: [
              F.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: F.path }) : null,
              " ",
              F.message
            ] }, L)),
            c.length > 3 ? /* @__PURE__ */ C("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Pr, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(p0, { spec: s, update: f, toolbar: N, children: R }) }) })
      ]
    }
  );
}
function C0({
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
    const N = setTimeout(() => S(!1), 1600);
    return () => clearTimeout(N);
  }, [w]), y.useEffect(() => {
    p || S(!1);
  }, [p]);
  const _ = () => {
    d == null || d(), S(!0);
  }, k = u ? `Undo ${u}` : "Undo", R = m ? `Redo ${m}` : "Redo";
  return /* @__PURE__ */ C("div", { "data-slot": "editor-toolbar", className: I("cv-editor-toolbar", h), children: [
    /* @__PURE__ */ l(
      we,
      {
        value: e,
        placeholder: "Untitled dashboard",
        "aria-label": "Dashboard name",
        onChange: (N) => t(N.target.value),
        className: "cv-editor-toolbar-name"
      }
    ),
    n ? /* @__PURE__ */ l("div", { className: "cv-editor-toolbar-group", children: /* @__PURE__ */ C(
      re,
      {
        variant: r ? "secondary" : "outline",
        size: "sm",
        onClick: n,
        "aria-pressed": r,
        className: I(r && "cv-editor-toolbar-variables--on"),
        children: [
          /* @__PURE__ */ l(uu, {}),
          " Variables",
          o ? /* @__PURE__ */ l("span", { className: "cv-editor-toolbar-badge", children: o }) : null
        ]
      }
    ) }) : null,
    /* @__PURE__ */ C("div", { className: "cv-editor-toolbar-actions", children: [
      v ? /* @__PURE__ */ C(Ce, { children: [
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            onClick: i,
            disabled: !s,
            "aria-label": k,
            title: k,
            children: /* @__PURE__ */ l(du, {})
          }
        ),
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            onClick: a,
            disabled: !c,
            "aria-label": R,
            title: R,
            children: /* @__PURE__ */ l(mu, {})
          }
        )
      ] }) : null,
      f ? /* @__PURE__ */ C(
        re,
        {
          variant: "ghost",
          size: "sm",
          onClick: f,
          disabled: g,
          className: "cv-editor-toolbar-discard",
          children: [
            /* @__PURE__ */ l(fu, {}),
            " Discard"
          ]
        }
      ) : null,
      d ? /* @__PURE__ */ C(
        re,
        {
          size: "sm",
          onClick: _,
          disabled: p,
          "aria-live": "polite",
          className: I(
            // Keep the confirmation vivid even though the button is (correctly) disabled
            // right after a save — there's nothing left to save.
            w && "cv-editor-toolbar-save--saved"
          ),
          children: [
            w ? /* @__PURE__ */ l(nn, {}) : /* @__PURE__ */ l(ls, {}),
            " ",
            w ? "Saved" : "Save"
          ]
        }
      ) : null
    ] })
  ] });
}
const pc = "lg", sn = 12;
function S0(e, t) {
  const n = t[pc];
  if (n && n.length > 0) return n;
  let r, o = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const a = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    a > o && (r = i, o = a);
  }
  return r ?? e;
}
function k0(e, t) {
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
const Hi = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function R0(e, t, n, r = sn) {
  const o = Hi[n], i = Math.min(o.w, r), a = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function N0(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? sn) {
  const o = R0(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, o]
  };
}
function x0(e, t, n, r = ((o) => (o = e.grid) == null ? void 0 : o.cols)() ?? sn) {
  const i = Hi[t.type], a = Math.min(i.w, r), s = {
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
function Gi(e) {
  const t = /* @__PURE__ */ new Set([0]);
  for (const n of e) t.add(n.y + n.h);
  return [...t].filter((n) => !e.some((r) => r.y < n && r.y + r.h > n)).sort((n, r) => n - r);
}
function _0(e, t = sn) {
  const n = Gi(e), r = [];
  for (let o = 0; o < n.length - 1; o++) {
    const i = n[o], a = n[o + 1], s = e.filter((u) => u.y >= i && u.y + u.h <= a);
    if (s.length === 0) continue;
    const c = [...new Set(s.map((u) => u.x + u.w))].sort((u, m) => u - m);
    for (const u of c)
      u <= 0 || u >= t || s.some((m) => m.x < u && m.x + m.w > u) || r.push({ rowY: i, rowBottom: a, x: u, free: !s.some((m) => m.x >= u) });
  }
  return r;
}
const M0 = 2;
function F0(e, t, n, r, o = ((i) => (i = e.grid) == null ? void 0 : i.cols)() ?? sn) {
  const a = Hi[t.type], c = Gi(e.layout).find((S) => S > n) ?? Number.POSITIVE_INFINITY, u = (S) => S.y >= n && S.y + S.h <= c, m = e.layout.filter((S) => u(S) && S.x >= r), f = (S, _) => {
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
      layout: [...e.layout.map((R) => _.get(R.i) ?? R), k]
    };
  };
  if (m.length === 0)
    return f(Math.max(1, Math.min(a.w, o - r)), /* @__PURE__ */ new Map());
  const g = Math.min(a.w, o), d = m.map((S) => ({ ...S, x: S.x + g }));
  if (d.every((S) => S.x + S.w <= o))
    return f(g, new Map(d.map((S) => [S.i, S])));
  const p = o - r - g, h = Math.min(...m.map((S) => S.x)), v = Math.max(...m.map((S) => S.x + S.w)) - h;
  if (p >= 1 && v > 0) {
    const S = p / v, _ = m.map((k) => ({
      ...k,
      x: r + g + Math.round((k.x - h) * S),
      w: Math.max(k.minW ?? M0, Math.round(k.w * S))
    }));
    if (_.every((k) => k.x >= r + g && k.x + k.w <= o))
      return f(g, new Map(_.map((k) => [k.i, k])));
  }
  const w = m.map((S) => ({ ...S, y: S.y + a.h }));
  return f(g, new Map(w.map((S) => [S.i, S])));
}
const $0 = 900, A0 = 0.4;
function O0(e, t) {
  const n = (e == null ? void 0 : e.cols) ?? sn, r = (e == null ? void 0 : e.rowHeight) ?? 40, o = (e == null ? void 0 : e.margin) ?? [12, 12], i = (e == null ? void 0 : e.containerPadding) ?? [0, 0], a = Math.max(A0, Math.min(1, t / $0)), s = Math.round(a / 0.05) * 0.05;
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
function Ha(e, t) {
  const n = t.containerPadding[1] + e * (t.rowHeight + t.margin[1]) - t.margin[1] / 2;
  return Math.max(0, n);
}
function I0(e, t) {
  return Math.max(0, e * (t.rowHeight + t.margin[1]) - t.margin[1]);
}
function T0(e, t) {
  const n = t - e.containerPadding[0] * 2 - e.margin[0] * Math.max(0, e.cols - 1);
  return Math.max(0, n / e.cols);
}
function P0(e, t, n) {
  const r = t.containerPadding[0] + e * (T0(t, n) + t.margin[0]) - t.margin[0] / 2;
  return Math.max(0, r);
}
function E0(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const o = JSON.parse(JSON.stringify(r));
  if (o.id = n, o.type === "chart") {
    const i = o.chart.familyOptions;
    i && typeof i.chartId == "string" && (o.chart = { ...o.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return N0(e, o);
}
function D0(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function L0(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const V0 = 10, hc = [
  { kind: "chart", label: "Chart", Icon: ns },
  { kind: "text", label: "Text", Icon: ss },
  { kind: "input", label: "Input", Icon: gu }
];
function z0({
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
      top: Ha(p, n)
    }));
    for (const p of t)
      d.push({
        key: `col:${p.rowY}:${p.x}`,
        axis: "col",
        rowY: p.rowY,
        colX: p.x,
        // The line spans its own row band only — a column gap means nothing outside it.
        top: Ha(p.rowY, n) + n.margin[1] / 2,
        left: P0(p.x, n, r),
        height: I0(p.rowBottom - p.rowY, n)
      });
    return d;
  }, [e, t, n, r]), g = y.useRef(f);
  return g.current = f, y.useEffect(() => {
    const d = o.current;
    if (!d || a) return;
    const p = (v) => {
      const w = d.getBoundingClientRect(), S = v.clientX - w.left, _ = v.clientY - w.top;
      let k = null, R = V0;
      for (const N of g.current) {
        let F;
        if (N.axis === "row")
          F = Math.abs(_ - N.top);
        else {
          if (_ < N.top || _ > N.top + (N.height ?? 0)) continue;
          F = Math.abs(S - (N.left ?? 0));
        }
        F <= R && (k = N.key, R = F);
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
        className: I(
          "cv-insert-line",
          h && "cv-insert-line--col",
          p && "cv-insert-line--active"
        ),
        children: [
          /* @__PURE__ */ l("span", { className: "cv-insert-line-rule" }),
          /* @__PURE__ */ C(
            qe,
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
                    children: /* @__PURE__ */ l(Et, {})
                  }
                ) }),
                /* @__PURE__ */ l(
                  Ke,
                  {
                    align: "center",
                    side: h ? "right" : "bottom",
                    className: "cv-insert-menu",
                    children: hc.map(({ kind: v, label: w, Icon: S }) => /* @__PURE__ */ C(
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
function H0({
  onInsert: e
}) {
  return /* @__PURE__ */ C("div", { "data-slot": "editor-empty", className: "cv-editor-empty", children: [
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-title", children: "This dashboard is empty" }),
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-hint", children: "Add a widget to start — later ones drop in wherever you point on the canvas." }),
    /* @__PURE__ */ l("div", { className: "cv-editor-empty-tiles", children: hc.map(({ kind: t, label: n, Icon: r }) => /* @__PURE__ */ C(
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
function G0(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function j0({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: o,
  onDelete: i,
  onLayoutChange: a,
  onInsert: s
}) {
  const [c, u] = ml(), m = y.useRef(null), f = y.useCallback(
    ($) => {
      m.current = $, c($);
    },
    [c]
  ), g = y.useMemo(() => O0(e.grid, u), [e.grid, u]), { cols: d, rowHeight: p } = g, h = g.margin, v = g.containerPadding, [w, S] = y.useState(!1), _ = y.useMemo(() => Gi(e.layout), [e.layout]), k = y.useMemo(
    () => _0(e.layout, d),
    [e.layout, d]
  ), R = y.useMemo(
    () => ({ [pc]: G0(e.layout) }),
    [e.layout]
  ), N = y.useMemo(
    () => new Map(e.widgets.map(($) => [$.id, $])),
    [e.widgets]
  ), F = y.useRef(a);
  y.useEffect(() => {
    F.current = a;
  }, [a]);
  const L = y.useRef(e.layout);
  y.useEffect(() => {
    L.current = e.layout;
  }, [e.layout]);
  const V = y.useRef(null), O = y.useCallback(
    ($, P) => {
      const z = S0($, P).map((H) => ({ ...H }));
      B0(L.current, z) || F.current(z);
    },
    []
  );
  return /* @__PURE__ */ l(Ci, { spec: e, children: /* @__PURE__ */ C("div", { ref: f, className: "cv-editor-canvas", children: [
    u > 0 && s && e.widgets.length === 0 ? /* @__PURE__ */ l(H0, { onInsert: ($) => s($, 0) }) : null,
    u > 0 ? /* @__PURE__ */ l(
      us,
      {
        width: u,
        layouts: R,
        breakpoints: { lg: 0 },
        cols: { lg: d },
        rowHeight: p,
        margin: h,
        containerPadding: v,
        dragConfig: { enabled: !0, handle: `.${ar}` },
        resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
        onLayoutChange: O,
        onDragStart: () => S(!0),
        onDragStop: () => S(!1),
        onResizeStart: () => S(!0),
        onResizeStop: () => S(!1),
        children: e.layout.map(($) => {
          const P = N.get($.i);
          if (!P) return null;
          const E = P.id === t;
          return (
            // Selecting = a click that bubbles up from anywhere in the widget;
            // RGL's drag (mousedown on the chrome header handle) wins for drags,
            // so we don't need a blocking overlay that would also block dragging.
            /* @__PURE__ */ C(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Select ${P.title ?? P.type}`,
                "aria-pressed": E,
                onPointerDown: (z) => {
                  V.current = { x: z.clientX, y: z.clientY };
                },
                onClick: (z) => {
                  const H = V.current;
                  H && Math.hypot(z.clientX - H.x, z.clientY - H.y) > 5 || n(P.id);
                },
                onKeyDown: (z) => {
                  (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(P.id));
                },
                className: I(
                  "cv-editor-widget",
                  // Idle = no chrome at all; hover paints a faint 1px ring so the
                  // hover target (and its action cluster) is obvious, and the
                  // SELECTED widget keeps the strong ring.
                  E && "cv-editor-widget--selected"
                ),
                children: [
                  /* @__PURE__ */ l(Fo, { widget: P, editable: !0 }),
                  /* @__PURE__ */ l("div", { "aria-hidden": !0, className: I(ar, "cv-editor-widget-drag-layer") }),
                  /* @__PURE__ */ C("div", { className: "cv-editor-widget-actions", children: [
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Edit ${P.title ?? P.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), r(P.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(pu, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Duplicate ${P.title ?? P.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), o(P.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(hu, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Delete ${P.title ?? P.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), i(P.id);
                        },
                        className: I("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                        children: /* @__PURE__ */ l(rn, {})
                      }
                    )
                  ] })
                ]
              },
              $.i
            )
          );
        })
      }
    ) : null,
    u > 0 && s && e.widgets.length > 0 ? /* @__PURE__ */ l(
      z0,
      {
        rows: _,
        columns: k,
        metrics: g,
        width: u,
        containerRef: m,
        onInsert: s,
        disabled: w
      }
    ) : null
  ] }) });
}
function B0(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const o = n.get(r.i);
    if (!o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h) return !1;
  }
  return !0;
}
const W0 = y.memo(j0);
function q0(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function U0({
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
  const o = ds({
    extensions: [fs],
    editable: !0,
    content: q0(e.doc),
    onUpdate: ({ editor: i }) => {
      const a = i.getJSON();
      n.current({ ...r.current, doc: a });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: I(fl, "cv-text-editor-content")
      }
    }
  });
  return o ? /* @__PURE__ */ l(he, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ C("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(K0, { editor: o }),
    /* @__PURE__ */ l(ms, { editor: o })
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
      className: I("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function K0({ editor: e }) {
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
            children: /* @__PURE__ */ l(vu, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(yu, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(bu, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(wu, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Cu, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Su, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(ku, {})
          }
        ),
        /* @__PURE__ */ l(
          ut,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(Ru, {})
          }
        )
      ]
    }
  );
}
const Y0 = Qo(
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
function Q0({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: I(Y0({ variant: t }), e), ...n });
}
function X0({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: o,
  className: i
}) {
  const { meta: a, isLoading: s } = Nt(), c = y.useMemo(() => Tr(a), [a]), u = c.filter((g) => g.type === "view"), m = c.find((g) => g.name === e), f = y.useMemo(() => {
    const g = c.filter((v) => v.type === "cube"), d = g.some((v) => v.category), p = [], h = /* @__PURE__ */ new Map();
    for (const v of g) {
      const w = v.category ?? (d ? "More tables" : "Tables");
      h.has(w) || (h.set(w, []), p.push(w)), h.get(w).push(v);
    }
    return p.sort((v, w) => v === "More tables" ? 1 : w === "More tables" ? -1 : v.localeCompare(w)), p.map((v) => ({ label: v, items: h.get(v) }));
  }, [c]);
  return /* @__PURE__ */ C(Ge, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Be, { id: o, className: i, children: /* @__PURE__ */ l(je, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(io, { option: m }) : void 0 }) }),
    /* @__PURE__ */ C(We, { children: [
      u.length > 0 ? /* @__PURE__ */ C(xo, { children: [
        /* @__PURE__ */ l(_o, { children: "Saved datasets" }),
        u.map((g) => /* @__PURE__ */ l(Ne, { value: g.name, children: /* @__PURE__ */ l(io, { option: g }) }, g.name))
      ] }) : null,
      f.map((g) => /* @__PURE__ */ C(xo, { children: [
        /* @__PURE__ */ l(_o, { children: g.label }),
        g.items.map((d) => /* @__PURE__ */ l(Ne, { value: d.name, children: /* @__PURE__ */ l(io, { option: d }) }, d.name))
      ] }, g.label))
    ] })
  ] });
}
function io({ option: e }) {
  const t = e.type === "view" ? as : Nu;
  return /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Q0, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const J0 = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function Z0(e) {
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
function ew({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, o = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), a = (s) => {
    s !== r.kind && o(Z0(s));
  };
  return /* @__PURE__ */ C("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      he,
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
              /* @__PURE__ */ l(We, { children: t.map((s) => /* @__PURE__ */ l(Ne, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(he, { label: "Control", children: /* @__PURE__ */ C(Ge, { value: r.kind, onValueChange: (s) => a(s), children: [
      /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
      /* @__PURE__ */ l(We, { children: qu.options.map((s) => /* @__PURE__ */ l(Ne, { value: s, children: J0[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(tw, { control: r, onChange: o, variables: t })
  ] });
}
function tw({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(nw, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(ow, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(iw, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(aw, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(sw, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(lw, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function nw({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(
      he,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          rw,
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
function rw({
  selected: e,
  onChange: t
}) {
  const [n, r] = y.useState(!1), o = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(o);
    c.has(s) ? c.delete(s) : c.add(s), t(Bn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, a = o.size === 0 ? "Default set" : o.size === Bn.length ? "All presets" : `${o.size} selected`;
  return /* @__PURE__ */ C(qe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ue, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: a }),
      /* @__PURE__ */ l(St, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Ke, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Bn.map((s) => {
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
                className: I("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(nn, { className: "cv-ed-icon-xs" }) : null
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
function ow({
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
      he,
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
              /* @__PURE__ */ C(We, { children: [
                /* @__PURE__ */ l(Ne, { value: a, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(Ne, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(he, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: ht.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => o(s),
          className: I("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function iw({
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
      he,
      {
        label: "Options",
        action: /* @__PURE__ */ C(re, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Et, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, a) => /* @__PURE__ */ C("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            we,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${a + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(a, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            we,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${a + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(a, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            re,
            {
              variant: "ghost",
              size: "icon",
              className: I("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => o(a),
              children: /* @__PURE__ */ l(rn, {})
            }
          )
        ] }, a)) })
      }
    )
  ] });
}
function aw({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(Ce, { children: [
    /* @__PURE__ */ l(he, { label: "From", children: /* @__PURE__ */ C(
      Ge,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
          /* @__PURE__ */ C(We, { children: [
            /* @__PURE__ */ l(Ne, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(Ne, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(Ne, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      he,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          X0,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function sw({
  control: e,
  onChange: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ l(he, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    we,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function lw({
  control: e,
  onChange: t
}) {
  const n = y.useId(), r = (o, i) => /* @__PURE__ */ l(he, { label: i, htmlFor: `${n}-${o}`, children: /* @__PURE__ */ l(
    we,
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
function cw(e) {
  const t = {
    schemaVersion: qt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function uw(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function dw(e) {
  return { schemaVersion: qt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
const Ga = y.memo(function({
  widget: t,
  variables: n,
  onChange: r,
  onVariablesChange: o,
  fill: i = !1
}) {
  const a = y.useId(), s = o ? (m) => o([...n, m]) : void 0, c = y.useMemo(
    () => t.type === "chart" ? cw(t) : null,
    [t]
  ), u = y.useMemo(() => dw(n), [n]);
  return /* @__PURE__ */ C("div", { "data-slot": "widget-edit-panel", className: I("cv-widget-panel", i && "cv-widget-panel--fill"), children: [
    t.type !== "text" ? /* @__PURE__ */ l(
      he,
      {
        label: "Title",
        htmlFor: a,
        hint: t.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          we,
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
      /* @__PURE__ */ l(Ci, { spec: u, children: /* @__PURE__ */ l(Zy, { createVariable: s, children: /* @__PURE__ */ l("div", { className: I(i && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        w0,
        {
          fill: i,
          spec: c,
          onChange: (m) => r(uw(t, m))
        }
      ) }) }) })
    ) : t.type === "text" ? /* @__PURE__ */ l(U0, { widget: t, onChange: r }) : t.type === "input" ? /* @__PURE__ */ l(ew, { widget: t, variables: n, onChange: r }) : null
  ] });
});
function mw(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function fw(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function gw(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function pw(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function hw(e, t) {
  switch (e) {
    case "chart":
      return fw(t);
    case "text":
      return gw(t);
    case "input":
      return pw(t);
  }
}
function vw(e) {
  return { name: e, type: "string" };
}
function yw(e) {
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
function bw(e) {
  const t = {}, n = (r) => t[r] ?? (t[r] = { inputs: [], refs: 0 });
  for (const r of e.variables) n(r.name);
  for (const r of e.widgets) {
    if (r.type === "input") {
      const o = r.control.variable;
      o && n(o).inputs.push(r.id);
      continue;
    }
    r.type === "chart" && (gr(r.query, (o) => void n(o.var).refs++), gr(r.chart, (o) => void n(o.var).refs++));
  }
  return t;
}
function ww(e) {
  const t = [], n = (e == null ? void 0 : e.inputs.length) ?? 0, r = (e == null ? void 0 : e.refs) ?? 0;
  return n > 0 && t.push(`${n} input${n === 1 ? "" : "s"}`), r > 0 && t.push(`${r} quer${r === 1 ? "y" : "ies"}`), t.length > 0 ? t.join(" · ") : "Unused";
}
function Cw(e, t, n) {
  if (t === n || n === "") return e;
  const r = e.variables;
  return !r.some((o) => o.name === t) || r.some((o) => o.name === n) ? e : {
    ...e,
    variables: r.map((o) => o.name === t ? { ...o, name: n } : o),
    widgets: e.widgets.map((o) => vc(o, t, () => ({ var: n }), n))
  };
}
function Sw(e, t) {
  const n = e.variables.find((o) => o.name === t), r = n == null ? void 0 : n.default;
  return {
    ...e,
    variables: e.variables.filter((o) => o.name !== t),
    widgets: e.widgets.map(
      (o) => vc(o, t, () => r === void 0 ? fr : r, "")
    )
  };
}
const fr = Symbol("cv.removeVarRef");
function vc(e, t, n, r) {
  let o = e;
  o.type === "input" && o.control.variable === t && (o = { ...o, control: { ...o.control, variable: r } });
  const i = Go(o, t, n);
  return i === fr ? o : i;
}
function gr(e, t) {
  if (_e(e)) {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (const n of e) gr(n, t);
    return;
  }
  if (e && typeof e == "object")
    for (const n of Object.values(e)) gr(n, t);
}
function Go(e, t, n) {
  if (_e(e)) return e.var === t ? n(e) : e;
  if (Array.isArray(e)) {
    let r = !1;
    const o = [];
    for (const i of e) {
      const a = Go(i, t, n);
      if (a === fr) {
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
      const s = Go(a, t, n);
      if (s === fr) {
        r = !0;
        continue;
      }
      s !== a && (r = !0), o[i] = s;
    }
    return r ? o : e;
  }
  return e;
}
const ja = {
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
function kw({
  spec: e,
  onChange: t,
  onClose: n,
  newName: r,
  className: o
}) {
  const i = e.variables, a = y.useMemo(() => bw(e), [e]), [s, c] = y.useState(null), u = y.useRef(0), m = () => {
    if (r) return r();
    let p;
    do
      p = `var_${++u.current}`;
    while (i.some((h) => h.name === p));
    return p;
  }, f = (p, h) => t((v) => ({
    ...v,
    variables: v.variables.map((w) => w.name === p ? Rw(w, h) : w)
  })), g = () => {
    const p = m();
    t((h) => ({ ...h, variables: [...h.variables, vw(p)] })), c(p);
  }, d = (p, h) => t((v) => {
    const w = v.variables.findIndex((k) => k.name === p), S = w + h;
    if (w < 0 || S < 0 || S >= v.variables.length) return v;
    const _ = v.variables.slice();
    return [_[w], _[S]] = [_[S], _[w]], { ...v, variables: _ };
  });
  return /* @__PURE__ */ C(
    "aside",
    {
      "data-slot": "variables-dock",
      "aria-label": "Dashboard variables",
      className: I("cv-variables-dock", o),
      children: [
        /* @__PURE__ */ C("div", { className: "cv-variables-dock-header", children: [
          /* @__PURE__ */ C("span", { className: "cv-variables-dock-title", children: [
            "Variables",
            i.length > 0 ? /* @__PURE__ */ l("span", { className: "cv-variables-dock-count", children: i.length }) : null
          ] }),
          /* @__PURE__ */ C("div", { className: "cv-variables-dock-header-actions", children: [
            /* @__PURE__ */ C(re, { variant: "outline", size: "sm", onClick: g, children: [
              /* @__PURE__ */ l(Et, {}),
              " Add variable"
            ] }),
            n ? /* @__PURE__ */ l(
              re,
              {
                variant: "ghost",
                size: "icon",
                className: "cv-ed-btn-7",
                "aria-label": "Close variables",
                onClick: n,
                children: /* @__PURE__ */ l(lo, {})
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
          /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: g, children: [
            /* @__PURE__ */ l(Et, {}),
            " Add variable"
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: i.map((p, h) => /* @__PURE__ */ l(
          Nw,
          {
            decl: p,
            index: h,
            total: i.length,
            usage: a[p.name],
            takenNames: i.filter((v, w) => w !== h).map((v) => v.name),
            autoFocusName: s === p.name,
            onNameCommitted: () => c(null),
            onRename: (v) => t((w) => Cw(w, p.name, v)),
            onPatch: (v) => f(p.name, v),
            onRemove: () => t((v) => Sw(v, p.name)),
            onMove: (v) => d(p.name, v)
          },
          p.name || `unnamed-${h}`
        )) }) })
      ]
    }
  );
}
function Rw(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = yw(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Nw({
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
  }, _ = ((r == null ? void 0 : r.inputs.length) ?? 0) + ((r == null ? void 0 : r.refs) ?? 0), [k, R] = y.useState(!1);
  return y.useEffect(() => {
    if (!k) return;
    const N = setTimeout(() => R(!1), 5e3);
    return () => clearTimeout(N);
  }, [k]), /* @__PURE__ */ C("div", { "data-slot": "variable-row", className: "cv-variable-row", children: [
    /* @__PURE__ */ C("div", { className: "cv-variable-row-header", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-label": f ? "Collapse variable" : "Expand variable",
          "aria-expanded": f,
          onClick: () => g((N) => !N),
          className: "cv-variable-row-toggle",
          children: f ? /* @__PURE__ */ l(St, {}) : /* @__PURE__ */ l(hr, {})
        }
      ),
      /* @__PURE__ */ l(
        we,
        {
          value: p,
          placeholder: "variable_name",
          "aria-label": "Variable name",
          "aria-invalid": w ? !0 : void 0,
          autoFocus: i,
          onChange: (N) => h(N.target.value),
          onBlur: S,
          onKeyDown: (N) => {
            N.key === "Enter" ? (N.preventDefault(), S()) : N.key === "Escape" && h(e.name);
          },
          className: "cv-variable-row-name"
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: ja[e.type] }),
      /* @__PURE__ */ C("div", { className: "cv-variable-row-actions", children: [
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            className: I("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable up",
            disabled: t === 0,
            onClick: () => m(-1),
            children: /* @__PURE__ */ l(qo, {})
          }
        ),
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            className: I("cv-ed-btn-7", "cv-ed-muted"),
            "aria-label": "Move variable down",
            disabled: t === n - 1,
            onClick: () => m(1),
            children: /* @__PURE__ */ l(Uo, {})
          }
        )
      ] })
    ] }),
    w ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: w }) : null,
    f ? /* @__PURE__ */ C("div", { className: "cv-variable-row-body", children: [
      /* @__PURE__ */ l(he, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ C(Ge, { value: e.type, onValueChange: (N) => c({ type: N }), children: [
        /* @__PURE__ */ l(Be, { children: /* @__PURE__ */ l(je, {}) }),
        /* @__PURE__ */ l(We, { children: vs.options.map((N) => /* @__PURE__ */ l(Ne, { value: N, children: ja[N] }, N)) })
      ] }) }),
      /* @__PURE__ */ l(
        he,
        {
          label: "Label",
          htmlFor: d,
          hint: "Optional human label for controls.",
          className: "cv-ed-row-tight",
          children: /* @__PURE__ */ l(
            we,
            {
              id: d,
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (N) => c({ label: N.target.value })
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
          onChange: (N) => c({ array: N })
        }
      ),
      /* @__PURE__ */ l(xw, { decl: e, onChange: (N) => c({ default: N }) }),
      /* @__PURE__ */ C("div", { className: "cv-variable-row-usage", children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: I(
              "cv-variable-row-usage-text",
              _ === 0 && "cv-variable-row-usage-text--none"
            ),
            children: _ === 0 ? "Unused" : `Used by ${ww(r)}`
          }
        ),
        /* @__PURE__ */ C(
          re,
          {
            variant: "ghost",
            size: "sm",
            className: I("cv-ed-muted", "cv-ed-hover-danger", k && "cv-ed-danger"),
            onClick: () => {
              if (_ > 0 && !k) {
                R(!0);
                return;
              }
              u();
            },
            children: [
              /* @__PURE__ */ l(rn, {}),
              k ? `Remove (in use by ${_})` : "Remove"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
}
function xw({
  decl: e,
  onChange: t
}) {
  const n = y.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(wt, { label: "Default", checked: e.default === !0, onChange: (o) => t(o) });
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(he, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      we,
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
  return e.array ? /* @__PURE__ */ l(he, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    Fw,
    {
      id: n,
      value: Array.isArray(e.default) ? e.default.map(String) : [],
      placeholder: Ba(e.type),
      onChange: t
    }
  ) }) : /* @__PURE__ */ l(he, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    we,
    {
      id: n,
      value: $w(e.default),
      placeholder: Ba(e.type),
      onChange: (o) => {
        const i = o.target.value;
        t(i === "" ? void 0 : i);
      }
    }
  ) });
}
function _w(e) {
  return e.split(",").map((t) => t.trim()).filter(Boolean);
}
function Mw(e) {
  return e.join(", ");
}
function Fw({
  id: e,
  value: t,
  placeholder: n,
  onChange: r
}) {
  const { text: o, onText: i, onBlur: a } = Ei({
    value: t,
    parse: _w,
    format: Mw,
    onChange: (s) => r(s.length === 0 ? void 0 : s)
  });
  return /* @__PURE__ */ l(
    we,
    {
      id: e,
      value: o,
      placeholder: n,
      onChange: (s) => i(s.target.value),
      onBlur: a
    }
  );
}
function $w(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Ba(e) {
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
function Aw(e, t, n, r = Ow) {
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
const Ow = /* @__PURE__ */ new Set(), Iw = 2e3;
function CC({
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
  onEditingChange: _,
  className: k
}) {
  var at, Pn;
  const [R, N] = y.useState(e), [F, L] = y.useState(e);
  y.useEffect(() => {
    N(e), L(e);
  }, [e]);
  const [V, O] = y.useState(null), $ = y.useRef(0), [P, E] = y.useState(null), [z, H] = y.useState(!1), D = y.useRef(V), X = y.useRef(P), J = y.useRef(R);
  y.useEffect(() => {
    D.current = V, X.current = P, J.current = R;
  });
  const ee = y.useRef(null);
  ee.current === null && (ee.current = i ?? mw());
  const ue = i ?? ee.current, me = gc(
    (B, Y) => r == null ? void 0 : r(B, Y),
    a
  ), se = y.useRef(/* @__PURE__ */ new Map()), te = y.useCallback(
    (B, Y) => {
      const be = Date.now();
      $.current = be, Y.widgetId && se.current.set(`w:${Y.widgetId}`, be), Y.kind === "name" && se.current.set("f:name", be), Y.kind === "variables" && se.current.set("f:variables", be), N((ze) => {
        const He = B(ze);
        if (He !== ze) {
          if (Y.kind === "layout")
            for (const En of Pw(ze.layout, He.layout))
              se.current.set(`w:${En}`, be);
          me(He, Y);
        }
        return He;
      });
    },
    [me]
  ), ye = y.useRef(/* @__PURE__ */ new Map()), G = y.useCallback((B, Y) => `${B}:${Y}:${ye.current.get(Y) ?? 0}`, []), oe = y.useRef(t);
  y.useEffect(() => {
    if (!t || t === oe.current) return;
    const B = 500;
    let Y = null;
    const be = () => {
      var Bi;
      const ze = Date.now() - $.current;
      if (ze < B) {
        Y = setTimeout(be, B - ze);
        return;
      }
      oe.current = t;
      const He = /* @__PURE__ */ new Set(), En = /* @__PURE__ */ new Set();
      ((Bi = X.current) == null ? void 0 : Bi.kind) === "widget" && He.add(X.current.id), D.current && He.add(D.current);
      const yc = Date.now();
      for (const [ln, bc] of se.current) {
        if (yc - bc > Iw) {
          se.current.delete(ln);
          continue;
        }
        ln.startsWith("w:") ? He.add(ln.slice(2)) : ln.startsWith("f:") && En.add(ln.slice(2));
      }
      const ji = Aw(t, J.current, He, En);
      N(ji), n == null || n(ji);
    };
    return be(), () => {
      Y && clearTimeout(Y);
    };
  }, [t]);
  const de = y.useCallback(
    (B, Y, be) => {
      if (B === "chart" && h) {
        h();
        return;
      }
      const ze = hw(B, ue());
      te(
        (He) => be === void 0 ? x0(He, ze, Y) : F0(He, ze, Y, be),
        {
          kind: "add",
          widgetId: ze.id,
          label: `add ${B}`
        }
      ), O(ze.id), B === "chart" && E({ kind: "widget", id: ze.id });
    },
    [te, ue, h]
  ), T = y.useRef(void 0);
  y.useEffect(() => {
    !v || T.current === v || R.widgets.some((B) => B.id === v) && (T.current = v, O(v), E({ kind: "widget", id: v }));
  }, [v, R.widgets]);
  const M = y.useCallback((B) => O(B), []), x = y.useCallback((B) => {
    O(B), E({ kind: "widget", id: B });
  }, []), A = y.useCallback(
    (B) => {
      te((Y) => D0(Y, B), {
        kind: "remove",
        widgetId: B,
        label: `delete "${Gn(J.current.widgets.find((Y) => Y.id === B))}"`
      }), O((Y) => Y === B ? null : Y), E((Y) => (Y == null ? void 0 : Y.id) === B ? null : Y);
    },
    [te]
  ), j = y.useCallback(
    (B) => {
      const Y = ue();
      te((be) => E0(be, B, Y), {
        kind: "duplicate",
        widgetId: Y,
        label: `duplicate "${Gn(J.current.widgets.find((be) => be.id === B))}"`
      }), O(Y);
    },
    [te, ue]
  ), W = y.useCallback(
    (B) => {
      const Y = B.type === "text" ? "text" : "widget";
      te((be) => L0(be, B), {
        kind: Y,
        widgetId: B.id,
        label: `edit "${Gn(B)}"`,
        coalesceKey: G(Y, B.id)
      });
    },
    [te, G]
  ), K = y.useCallback(
    (B) => te(
      (Y) => {
        const be = k0(Y.layout, B);
        return Tw(Y.layout, be) ? Y : { ...Y, layout: be };
      },
      { kind: "layout", label: "layout change" }
    ),
    [te]
  ), ne = y.useCallback(
    (B) => te((Y) => ({ ...Y, name: B || void 0 }), {
      kind: "name",
      label: "rename dashboard",
      // Every keystroke is one commit; the host folds them into one undo step.
      coalesceKey: "name"
    }),
    [te]
  ), Se = y.useCallback(
    (B) => te((Y) => ({ ...Y, variables: B }), {
      kind: "variables",
      label: "edit variables",
      coalesceKey: "variables"
    }),
    [te]
  ), ke = y.useCallback(
    (B) => te(B, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
    [te]
  ), Q = y.useDeferredValue(R), le = y.useMemo(
    () => fo.safeParse(Q),
    [Q]
  ), fe = y.useCallback(() => {
    const B = fo.safeParse(R);
    B.success && (o == null || o(B.data), L(R));
  }, [R, o]), Te = R !== F, ve = P ? R.widgets.find((B) => B.id === P.id) ?? null : null;
  y.useEffect(() => {
    P && !R.widgets.some((B) => B.id === P.id) && E(null);
  }, [P, R.widgets]);
  const Me = y.useCallback(() => {
    E((B) => (B && ye.current.set(B.id, (ye.current.get(B.id) ?? 0) + 1), null));
  }, []), it = ve ? Gn(ve) : "", ge = (ve == null ? void 0 : ve.type) === "chart" ? { widget: ve, update: W, close: Me } : null, Ve = ge && w ? w(ge) : null, Ye = ge && S ? S(ge) : null, zt = (P == null ? void 0 : P.id) ?? null;
  return y.useEffect(() => {
    _ == null || _(zt);
  }, [zt, _]), /* @__PURE__ */ l(wi, { families: p, children: /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Pn = (at = R.grid) == null ? void 0 : at.margin) == null ? void 0 : Pn[0]) ?? 12 },
      className: I("cv-dashboard-editor", k),
      children: [
        /* @__PURE__ */ l(
          C0,
          {
            name: R.name ?? "",
            onNameChange: ne,
            onToggleVariables: () => H((B) => !B),
            variablesOpen: z,
            variableCount: R.variables.length,
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            undoLabel: f,
            redoLabel: g,
            onDiscard: d,
            discardDisabled: !Te,
            onSave: o ? fe : void 0,
            saveDisabled: !le.success || !Te,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        le.success ? null : /* @__PURE__ */ C("p", { className: "cv-dashboard-editor-validation", children: [
          le.error.issues.length,
          " validation issue",
          le.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-body", children: [
          /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: P ? null : /* @__PURE__ */ l(
            W0,
            {
              spec: R,
              selectedId: V,
              onSelect: M,
              onEdit: x,
              onDuplicate: j,
              onDelete: A,
              onLayoutChange: K,
              onInsert: de
            }
          ) }),
          z && !P ? /* @__PURE__ */ l(
            kw,
            {
              spec: R,
              onChange: ke,
              onClose: () => H(!1)
            }
          ) : null
        ] }),
        P ? /* @__PURE__ */ C(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": it,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ C("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ C(re, { variant: "ghost", size: "sm", onClick: Me, children: [
                    /* @__PURE__ */ l(Yo, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: it })
                ] }),
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-actions", children: [
                  Ye,
                  ve ? /* @__PURE__ */ C(
                    re,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "cv-ed-danger",
                      onClick: () => A(ve.id),
                      children: [
                        /* @__PURE__ */ l(rn, {}),
                        " Delete"
                      ]
                    }
                  ) : null
                ] })
              ] }),
              /* @__PURE__ */ l(Pr, { label: it, resetKey: R, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: (ve == null ? void 0 : ve.type) === "chart" ? /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-row", children: [
                /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-main", children: /* @__PURE__ */ l(
                  Ga,
                  {
                    fill: !0,
                    widget: ve,
                    variables: R.variables,
                    onChange: W,
                    onVariablesChange: Se
                  }
                ) }),
                Ve ? /* @__PURE__ */ l("aside", { "data-slot": "dashboard-editor-aside", className: "cv-dashboard-editor-fullscreen-aside", children: Ve }) : null
              ] }) : ve ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Ga,
                {
                  widget: ve,
                  variables: R.variables,
                  onChange: W,
                  onVariablesChange: Se
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Gn(e) {
  if (!e) return "widget";
  if (e.title) return e.title;
  const t = e.type;
  return `${t[0].toUpperCase()}${t.slice(1)} widget`;
}
function Tw(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = t[n];
    if (r.i !== o.i || r.x !== o.x || r.y !== o.y || r.w !== o.w || r.h !== o.h || r.minW !== o.minW || r.minH !== o.minH || r.static !== o.static)
      return !1;
  }
  return !0;
}
function Pw(e, t) {
  const n = new Map(e.map((r) => [r.i, r]));
  return t.filter((r) => {
    const o = n.get(r.i);
    return !o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h;
  }).map((r) => r.i);
}
export {
  Qt as AUTO_GRANULARITY,
  nm as AreaChartFamily,
  Dd as AreaFamilyOptionsSchema,
  Hu as AxesOptionsSchema,
  Xi as AxisOptionsSchema,
  cC as BUILTIN_CHART_FAMILIES,
  lt as BUILTIN_DEFAULTS,
  st as BUILTIN_FAMILY_OPTION_SCHEMAS,
  em as BarChartFamily,
  Pd as BarFamilyOptionsSchema,
  pc as CANONICAL_BREAKPOINT,
  vt as ChartColorTokenSchema,
  p0 as ChartEditOverlay,
  w0 as ChartEditor,
  Eu as ChartFamilySchema,
  ni as ChartInteractionProvider,
  hs as ChartOptionsSchema,
  Zs as ChartRenderer,
  bs as ChartSpecSchema,
  Bu as ChartTransformSchema,
  bC as ChartView,
  Ku as ChartWidgetSchema,
  Gu as ColorAssignmentSchema,
  Gd as CondFormatRuleSchema,
  Si as CubeChart,
  Nh as CubeChartSpec,
  ps as CubeQuerySchema,
  Fr as CubeVizContext,
  hC as CubeVizProvider,
  Nr as DEFAULT_COLOR_RAMP,
  sn as DEFAULT_COLS,
  Hi as DEFAULT_FOOTPRINT,
  fa as DEFAULT_MARK_THEME,
  tr as DEFAULT_TRANSFORM_WINDOW,
  No as DEFAULT_UNIT_CONVERSIONS,
  ar as DRAG_HANDLE_CLASS,
  yC as Dashboard,
  CC as DashboardEditor,
  Ci as DashboardProvider,
  fo as DashboardSpecSchema,
  uo as DateRangeSchema,
  Wd as EMPTY_FAMILY_DEFAULT,
  ta as EM_DASH,
  W0 as EditorCanvas,
  C0 as EditorToolbar,
  wi as FamilyRegistryOverride,
  rb as FilterBuilder,
  Ou as FilterOperatorSchema,
  Du as FormatKindSchema,
  Xo as FormatOptionsSchema,
  kd as GRANULARITY_PATTERN,
  Au as GranularityChoiceSchema,
  ht as GranularitySchema,
  Zu as GridConfigSchema,
  fm as HeatmapChartFamily,
  Bd as HeatmapFamilyOptionsSchema,
  qu as InputControlKindSchema,
  Uu as InputControlSchema,
  ew as InputWidgetEditor,
  Qu as InputWidgetSchema,
  Wh as InputWidgetView,
  z0 as InsertLines,
  hm as KpiFamily,
  zd as KpiFamilyOptionsSchema,
  Ju as LayoutItemSchema,
  Iu as LeafFilterSchema,
  Vu as LegendOptionsSchema,
  tm as LineChartFamily,
  Ed as LineFamilyOptionsSchema,
  pe as MemberSchema,
  Yi as OrderDirSchema,
  Pu as OrderSpecSchema,
  im as PieChartFamily,
  Ld as PieFamilyOptionsSchema,
  mo as QueryFilterSchema,
  Cr as ReferenceLineOptSchema,
  Fo as RenderWidget,
  qt as SCHEMA_VERSION,
  $u as ScalarSchema,
  sm as ScatterChartFamily,
  Vd as ScatterFamilyOptionsSchema,
  Lu as SeriesMappingSchema,
  Qi as SeriesMetaSchema,
  ws as SpecSchema,
  Hd as TableColumnOptSchema,
  Ff as TableFamily,
  jd as TableFamilyOptionsSchema,
  U0 as TextWidgetEditor,
  Yu as TextWidgetSchema,
  _h as TextWidgetView,
  Tu as TimeDimensionSchema,
  Wu as TipTapDocSchema,
  zu as TooltipOptionsSchema,
  ju as TransformKindSchema,
  Zn as VarRefSchema,
  ed as VariableDeclSchema,
  vs as VariableTypeSchema,
  gs as VariableValueSchema,
  kw as VariablesDock,
  bl as WidgetChrome,
  Ga as WidgetEditPanel,
  Xu as WidgetSpecSchema,
  wC as adaptiveGranularity,
  N0 as appendWidget,
  Uf as areaChartFamily,
  pa as assignColors,
  bi as autoGranularityFor,
  ah as axisKey,
  Wf as barChartFamily,
  hi as buildFamilyRegistry,
  pC as builtinCharts,
  ot as builtinFamilyDescriptors,
  Rr as builtinFamilyRegistry,
  Il as canonicalTimeOf,
  wy as collapseFamilies,
  _0 as columnBoundaries,
  P0 as columnBoundaryLeft,
  T0 as columnWidth,
  bd as createCubeClient,
  mw as createIdFactory,
  il as createQueryResolver,
  sl as createUnitsFormatter,
  xg as createVariableStore,
  Nd as datePattern,
  go as deepMerge,
  pi as defaultChartFamilies,
  yw as defaultForType,
  Zo as defaultFormatter,
  O0 as editorGridMetrics,
  ur as familyKeyOf,
  wd as fetchMeta,
  pt as findCube,
  Ee as findMember,
  fC as formatCategory,
  Ut as formatDateValue,
  my as geoPointId,
  by as grainAggLabel,
  nl as granularitiesForSpan,
  rl as granularityOptionsFor,
  Qf as heatmapChartFamily,
  F0 as insertWidgetAtColumn,
  x0 as insertWidgetAtRow,
  Zt as isEmptyValue,
  _e as isVarRef,
  Xf as kpiChartFamily,
  qf as lineChartFamily,
  Tr as listCubes,
  Dt as listMembers,
  yd as loadSpec,
  wr as looksLikeIsoDate,
  ei as makeChartFormat,
  mC as makeDateFormatter,
  gC as makeFormatter,
  xi as memberAgg,
  py as memberAggDefault,
  Wn as memberCanonicalTime,
  dr as memberFamilyTitle,
  Ol as memberGroup,
  k0 as mergeLayout,
  Mr as mergeUnitConversions,
  fw as newChartWidget,
  pw as newInputWidget,
  gw as newTextWidget,
  vw as newVariable,
  hw as newWidget,
  tl as normalize,
  uy as pathLabel,
  S0 as pickCanonicalLayout,
  Kf as pieChartFamily,
  R0 as placeNewItem,
  lh as quantityLabel,
  yi as rangeSpanDays,
  Sw as removeVariable,
  D0 as removeWidget,
  Cw as renameVariable,
  L0 as replaceWidget,
  fh as resolveChart,
  Js as resolveMarkTheme,
  eg as resolveOptions,
  qd as resolveOptionsWith,
  ol as resolveQuery,
  wg as resolveRelativeDateRange,
  el as resolveSeriesColors,
  Sg as resolveValue,
  Gi as rowBoundaries,
  Ha as rowBoundaryTop,
  I0 as rowSpanHeight,
  uC as safeLoadSpec,
  Yf as scatterChartFamily,
  Jf as tableChartFamily,
  Cs as toDate,
  ug as toResultAnnotation,
  ww as usageSummary,
  y0 as useChartEditorState,
  Ns as useChartInteractions,
  ml as useContainerWidth,
  Nt as useCubeMeta,
  ul as useCubeQuery,
  Ze as useCubeVizContext,
  dl as useDashboard,
  gc as useDebouncedCallback,
  Ar as useDisplayUnit,
  Rt as useFamilyRegistry,
  vC as useFormatter,
  Xr as useNormalizedSeries,
  On as useOptionalDashboard,
  dC as validateSpec,
  bw as variableUsages
};
//# sourceMappingURL=index.js.map
