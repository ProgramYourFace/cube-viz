var Ps = Object.defineProperty;
var $s = (e, t, n) => t in e ? Ps(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Qn = (e, t, n) => $s(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as l, jsxs as v, Fragment as fe } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as te, createContext as Ci, useContext as $r, useState as dt, useCallback as Ge, useEffect as nn, useRef as it, createElement as zs, useSyncExternalStore as Ni, useId as Vs, Component as js } from "react";
import { ruleX as Si, ruleY as Mi, text as Qt, colorLegend as zr, group as Ws, stack as xi, barX as Ta, barY as Oa, lineX as Bs, lineY as Ln, defineChart as et, areaY as dr, dot as Ti, cell as qs } from "@tanstack/charts";
import { crosshair as Oi } from "@tanstack/charts/crosshair";
import { scaleBand as Ks } from "@tanstack/charts/scales/band";
import { scaleLinear as vn } from "@tanstack/charts/scales/linear";
import { scalePoint as Us } from "@tanstack/charts/scales/point";
import { Chart as Hs } from "@tanstack/charts/react/core";
import { motion as Ri } from "@tanstack/charts/motion";
import { tooltip as Vr } from "@tanstack/charts/tooltip";
import { d3Curve as Jn } from "@tanstack/charts/d3/shape";
import { brushX as Gs } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Ys } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Qs, scaleLog as Ra, scaleSqrt as Js } from "d3-scale";
import { curveNatural as Xs, curveStepAfter as Zs, curveMonotoneX as el } from "d3-shape";
import { format as he, isValid as Et, parseISO as bn, subDays as ke, startOfWeek as yn, endOfWeek as kn, startOfMonth as ot, endOfMonth as Wt, startOfQuarter as st, endOfQuarter as Bt, startOfYear as lt, endOfYear as qt, subWeeks as fr, subMonths as ct, subQuarters as ut, subYears as mt, differenceInCalendarDays as tl, parse as _i } from "date-fns";
import { z as h } from "zod";
import { clsx as nl } from "clsx";
import * as Ne from "@radix-ui/react-select";
import { Minus as Ai, ArrowUp as jr, ArrowDown as Wr, CalendarRange as Di, ChevronsUpDown as rl, AreaChart as al, BarChart3 as Li, Grid3X3 as il, Table as ol, Gauge as sl, ScatterChart as ll, PieChart as cl, LineChart as ul, AlertCircle as Br, ChevronLeft as qr, ChevronRight as rn, ChevronDown as tt, Check as gt, ChevronUp as ml, CalendarIcon as Ei, MoreVertical as dl, RefreshCw as fl, Image as hl, Sheet as pl, Type as Kr, MapPin as Ii, Hash as hr, Calendar as Fi, Search as gl, ListChecks as vl, Table2 as Pi, Database as $i, Layers as Ur, Variable as bl, Plus as Nt, Trash2 as Rt, ListFilter as yl, Box as zi, EyeOff as kl, Eye as wl, AlertTriangle as Cl, GripVertical as Nl, X as _a, Save as Vi, SlidersHorizontal as Sl, Braces as Ml, Undo2 as xl, Redo2 as Tl, RotateCcw as Ol, Pencil as Rl, Copy as _l, Bold as Al, Italic as Dl, Strikethrough as Ll, Heading1 as El, Heading2 as Il, List as Fl, ListOrdered as Pl, Quote as $l } from "lucide-react";
import * as wn from "@radix-ui/react-popover";
import { cva as Hr } from "class-variance-authority";
import zl from "@cubejs-client/core";
import { DayPicker as Vl, useDayPicker as jl } from "react-day-picker";
import { pie as Wl, radialArc as pr, radialText as Xn, polar as ji } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as Wi } from "react-grid-layout";
import { useEditor as Bi, EditorContent as qi } from "@tiptap/react";
import Ki from "@tiptap/starter-kit";
const kt = 5, Cn = h.object({ var: h.string().min(1) }).strict();
function Ce(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Nn = (e) => h.union([e, Cn]), Bl = h.union([h.string(), h.number(), h.boolean()]), Qe = h.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), gr = h.union([h.tuple([h.string(), h.string()]), h.string()]), Ui = h.union([
  h.string(),
  h.number(),
  h.boolean(),
  h.tuple([h.string(), h.string()]),
  // absolute date range
  h.array(h.string()),
  h.array(h.number())
]), le = h.string().min(1), ql = h.enum([
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
]), Kl = h.object({
  member: le,
  operator: ql,
  values: h.array(h.union([Bl, Cn])).optional()
}).strict(), vr = h.lazy(
  () => h.union([
    Kl,
    h.object({ and: h.array(vr) }).strict(),
    h.object({ or: h.array(vr) }).strict()
  ])
), Ul = h.object({
  dimension: le,
  granularity: Nn(Qe).optional(),
  dateRange: Nn(gr).optional(),
  compareDateRange: h.array(gr).optional()
}).strict(), Aa = h.enum(["asc", "desc"]), Hl = h.union([
  h.record(le, Aa),
  h.array(h.tuple([le, Aa]))
]), Hi = h.object({
  measures: h.array(le).optional(),
  dimensions: h.array(le).optional(),
  timeDimensions: h.array(Ul).optional(),
  filters: h.array(vr).optional(),
  segments: h.array(le).optional(),
  order: Hl.optional(),
  limit: Nn(h.number()).optional(),
  offset: Nn(h.number()).optional(),
  total: h.boolean().optional(),
  timezone: h.string().optional()
}).strict(), Gl = h.string().min(1), Bb = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Je = h.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Yl = h.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Gr = h.object({
  kind: Yl.optional(),
  decimals: h.number().optional(),
  abbreviate: h.boolean().optional(),
  prefix: h.string().optional(),
  suffix: h.string().optional(),
  unitSystem: h.enum(["metric", "imperial"]).optional(),
  dateFormat: h.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: h.string().optional()
}).strict(), Da = h.object({
  label: h.string().optional(),
  colorToken: Je.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: h.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: h.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), Ql = h.object({
  category: h.object({ member: le }).strict(),
  series: h.union([
    h.object({
      mode: h.literal("measures"),
      members: h.array(le),
      meta: h.record(le, Da).optional()
    }).strict(),
    h.object({
      mode: h.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: le,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: h.array(le).optional(),
      pivot: le,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: h.record(le, Da).optional()
    }).strict()
  ])
}).strict(), Jl = h.object({
  show: h.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: h.enum(["top", "bottom"]).optional()
}).strict(), Xl = h.object({
  show: h.boolean().optional(),
  indicator: h.enum(["dot", "line", "dashed"]).optional(),
  showTotal: h.boolean().optional()
}).strict(), La = h.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: h.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: h.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: h.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: h.tuple([h.number(), h.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Gr.optional()
}).strict(), Zl = h.object({
  x: La.optional(),
  y: La.optional()
}).strict(), ec = h.object({
  byKey: h.record(h.string(), Je).optional(),
  ramp: h.array(Je).optional()
}).strict(), mn = 7, tc = h.enum(["rollingAvg", "cumulative", "percentOfTotal"]), nc = h.object({
  kind: tc,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: h.number().int().min(2).max(90).optional()
}).strict(), Gi = h.object({
  family: Gl,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ql.optional(),
  orientation: h.enum(["vertical", "horizontal"]).optional(),
  stackMode: h.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Jl.optional(),
  tooltip: Xl.optional(),
  axes: Zl.optional(),
  colors: ec.optional(),
  format: Gr.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: nc.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: h.record(h.string(), h.unknown()).optional()
}).strict(), rc = h.object({ type: h.string(), content: h.array(h.unknown()).optional() }).passthrough(), ac = h.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), ic = h.object({
  variable: h.string().min(1),
  control: h.discriminatedUnion("kind", [
    h.object({
      kind: h.literal("dateRange"),
      presets: h.array(h.string()).optional(),
      allowFuture: h.boolean().optional()
    }).strict(),
    h.object({
      kind: h.literal("granularity"),
      options: h.array(Qe).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: h.string().optional()
    }).strict(),
    h.object({
      kind: h.literal("select"),
      options: h.array(h.object({ value: Ui, label: h.string() }).strict()),
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
}).strict(), Yr = {
  id: h.string().min(1),
  title: h.string().optional()
}, oc = h.object({ ...Yr, type: h.literal("chart"), query: Hi.default({}), chart: Gi }).strict(), sc = h.object({ ...Yr, type: h.literal("text"), doc: rc }).strict(), lc = h.object({ ...Yr, type: h.literal("input"), control: ic }).strict(), cc = h.discriminatedUnion("type", [
  oc,
  sc,
  lc
]), uc = h.object({
  i: h.string(),
  x: h.number(),
  y: h.number(),
  w: h.number(),
  h: h.number(),
  minW: h.number().optional(),
  minH: h.number().optional(),
  static: h.boolean().optional()
}).strict(), mc = h.object({
  cols: h.number().optional(),
  rowHeight: h.number().optional(),
  margin: h.tuple([h.number(), h.number()]).optional(),
  containerPadding: h.tuple([h.number(), h.number()]).optional()
}).strict(), Yi = h.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), dc = h.object({
  name: h.string().min(1),
  type: Yi,
  label: h.string().optional(),
  array: h.boolean().optional(),
  default: Ui.optional()
}).strict(), Qi = {
  schemaVersion: h.literal(kt),
  id: h.string().min(1),
  name: h.string().optional(),
  description: h.string().optional(),
  createdAt: h.string().optional(),
  updatedAt: h.string().optional()
}, Ji = h.object({ ...Qi, kind: h.literal("chart"), query: Hi.default({}), chart: Gi }).strict(), br = h.object({
  ...Qi,
  kind: h.literal("dashboard"),
  variables: h.array(dc),
  widgets: h.array(cc),
  layout: h.array(uc),
  grid: mc.optional()
}).strict(), Xi = h.discriminatedUnion("kind", [Ji, br]);
function Q(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ze(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function fc(e) {
  if (!Q(e.axes)) return;
  const t = ze(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function hc(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Q(a)) continue;
    const i = ze(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function pc(e) {
  if (!Q(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => Q(n) ? ze(n, "side") ?? {} : n
  ));
}
function gc(e) {
  const t = Q(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(Q) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = Q(e.mapping) ? e.mapping : void 0, a = r && Q(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = Q(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function Ea(e) {
  Q(e) && (e.family === "combo" && gc(e), fc(e), hc(e), pc(e));
}
function vc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ea(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && Ea(n.chart);
  return t;
}
function bc(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Q(a)) continue;
    const i = ze(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function yc(e) {
  if (!Q(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function kc(e) {
  if (Q(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Q(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = ze(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function wc(e) {
  if (!Q(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = ze(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Ia(e) {
  Q(e) && (bc(e), yc(e), kc(e), wc(e));
}
function Cc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ia(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && Ia(n.chart);
  return t;
}
const Nc = {
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
function Sc(e) {
  if (!Q(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = Nc[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = ze(r, a) ?? {};
  e.familyOptions = r;
}
function Mc(e) {
  if (Q(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Q(n) || n.labelHide !== !0) continue;
      const r = ze(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function Fa(e) {
  Q(e) && (Sc(e), Mc(e));
}
function xc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Fa(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && Fa(n.chart);
  return t;
}
function Tc(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  let n;
  const r = {};
  for (const [o, s] of Object.entries(t.meta)) {
    if (!Q(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const u = ze(s, "curve");
    u && (r[o] = u);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const a = e.family;
  if (n === void 0 || a !== "line" && a !== "area") return;
  const i = Q(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function Oc(e) {
  const t = structuredClone(e), n = (r) => {
    Q(r) && Tc(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      Q(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Rc = {
  1: vc,
  2: Cc,
  3: xc,
  4: Oc
};
function _c(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${kt} — update the library`
    );
  for (; n < kt; ) {
    const r = Rc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return Xi.parse(t);
}
function qb(e) {
  try {
    return { ok: !0, spec: _c(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Kb(e) {
  return Xi.parse(e);
}
function Ac(e) {
  return zl(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Dc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function T(...e) {
  return nl(e);
}
function Lc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: T("cv-skeleton", e), ...t });
}
const Ec = Hr(
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
), En = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: T(Ec({ variant: t }), e),
    ...n
  }
));
En.displayName = "Alert";
const In = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: T("cv-alert-title", e),
      ...t
    }
  )
);
In.displayName = "AlertTitle";
const Fn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: T("cv-alert-description", e),
      ...t
    }
  )
);
Fn.displayName = "AlertDescription";
const Ic = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Fc = "MMM d, yyyy";
function Zi(e) {
  if (e instanceof Date) return Et(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Et(r) ? r : null;
  }
  const t = bn(e);
  if (Et(t)) return t;
  const n = new Date(e);
  return Et(n) ? n : null;
}
function Qr(e) {
  return /^\d{4}-\d{2}/.test(e) ? Et(bn(e)) : !1;
}
function Pc(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Ic[t] : Fc;
}
function Kt(e, t, n) {
  const r = Zi(e);
  return r ? he(r, Pc(t, n)) : String(e);
}
function Ub(e, t) {
  return (n) => n == null ? "" : Kt(n, e, t);
}
function Hb(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Kt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Kt(e, t.format, t.granularity) : String(e) : Qr(e) ? Kt(e, t.format, t.granularity) : e;
}
const Pa = "—", $c = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function $a(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function zc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of $c)
    if (n >= r) return $a((e / r).toFixed(t)) + a;
  return $a(e.toFixed(t));
}
function Vc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function jc(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? zc(e, n.decimals ?? 1) : Vc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function eo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Wc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || eo(e.value) ? !0 : typeof e.value == "string" ? Qr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Jr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Pa : (eo(t) || typeof t == "string" || typeof t == "number") && Wc(e) ? Kt(t, n, r) : typeof t == "number" ? jc(t, e) : String(t);
};
function Bc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Gb(e, t) {
  return (n, r) => {
    const a = r ? Bc(r, t) : void 0;
    return Jr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function qc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Kc(e) {
  const t = Qe.safeParse(e);
  return t.success ? t.data : void 0;
}
function Uc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Kc(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Xr(e, t, n, r) {
  const a = Uc(e, t), i = {
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
      const c = s ? qc(s, e) : void 0, d = c == null ? void 0 : c.meta;
      return n({
        value: o,
        member: s,
        meta: d,
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
const Pn = h.object({
  axis: h.enum(["x", "y"]),
  value: h.number(),
  label: h.string().optional(),
  colorToken: Je.optional()
}).strict(), Zr = h.boolean().optional(), Hc = h.object({
  showValueLabels: h.boolean().optional(),
  referenceLines: h.array(Pn).optional(),
  comparePrevious: Zr
}).strict(), to = h.enum(["linear", "monotone", "step", "natural"]), Gc = h.object({
  curve: to.optional(),
  dots: h.union([h.boolean(), h.literal("active")]).optional(),
  connectNulls: h.boolean().optional(),
  chrome: h.enum(["full", "none"]).optional(),
  referenceLines: h.array(Pn).optional(),
  showValueLabels: h.boolean().optional(),
  comparePrevious: Zr
}).strict(), Yc = h.object({
  curve: to.optional(),
  connectNulls: h.boolean().optional(),
  dots: h.boolean().optional(),
  referenceLines: h.array(Pn).optional(),
  comparePrevious: Zr
}).strict(), Qc = h.object({
  innerRadiusPct: h.number().optional(),
  showLabels: h.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: h.object({ value: h.string().optional(), label: h.string().optional() }).strict().optional(),
  maxSlices: h.number().optional()
}).strict(), Jc = h.object({
  x: le,
  y: le,
  size: le.optional(),
  groupBy: le.optional(),
  referenceLines: h.array(Pn).optional()
}).strict(), Xc = h.object({
  display: h.enum(["number", "gauge"]).optional(),
  measure: le,
  comparison: h.object({
    mode: h.enum(["previousPeriod", "value"]),
    value: h.union([le, h.number()]).optional(),
    showAsPercent: h.boolean().optional(),
    goodDirection: h.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: h.object({
    member: le.optional(),
    timeDimension: le.optional(),
    granularity: h.union([Qe, Cn]).optional(),
    dateRange: h.union([gr, Cn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: h.enum(["up", "down"]).optional(),
  gauge: h.object({
    min: h.number().optional(),
    max: h.number(),
    thresholds: h.array(h.object({ at: h.number(), colorToken: Je }).strict()).optional()
  }).strict().optional()
}).strict(), Zc = h.object({
  member: le,
  label: h.string().optional(),
  format: Gr.optional(),
  align: h.enum(["left", "right", "center"]).optional(),
  width: h.number().optional(),
  hidden: h.boolean().optional()
}).strict(), eu = h.object({
  member: le,
  when: h.object({
    op: h.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: h.number()
  }).strict(),
  colorToken: Je.optional()
}).strict(), tu = h.object({
  columns: h.array(Zc).optional(),
  pageSize: h.number().optional(),
  conditionalFormat: h.array(eu).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), nu = h.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Je.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), We = {
  bar: Hc,
  line: Gc,
  area: Yc,
  pie: Qc,
  scatter: Jc,
  heatmap: nu,
  kpi: Xc,
  table: tu
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
function za(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function yr(e, t) {
  if (t === void 0) return e;
  if (!za(e) || !za(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? yr(e[r], a) : a);
  }
  return n;
}
const ru = { envelope: {}, familyOptions: {} };
function au(e, t) {
  return {
    ...yr({ ...t.envelope }, e),
    familyOptions: yr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const no = {}, Va = () => {
}, iu = {
  target: no,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Va,
  emitPoint: Va
}, Sn = b.createContext(null);
Sn.displayName = "ChartInteractionContext";
function ro() {
  return b.useContext(Sn) ?? iu;
}
function ea({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Sn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((g) => {
    const { parent: y, widgetId: k, onRangeSelect: w } = o.current, C = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(C) : y == null || y.emitRange(C);
  }, []), u = b.useCallback((g) => {
    const { parent: y, widgetId: k, onPointSelect: w } = o.current, C = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(C) : y == null || y.emitPoint(C);
  }, []), c = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), d = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), m = i == null ? void 0 : i.target, f = b.useMemo(
    () => m || r ? { ...m, ...r } : no,
    [m, r]
  ), p = b.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: f,
      rangeEnabled: c,
      pointEnabled: d,
      emitRange: s,
      emitPoint: u
    }),
    [e, i == null ? void 0 : i.widgetId, f, c, d, s, u]
  );
  return /* @__PURE__ */ l(Sn.Provider, { value: p, children: a });
}
function He(e, t) {
  const n = (t == null ? void 0 : t.series) ?? e.series, r = [];
  return e.categories.forEach((a, i) => {
    var s, u, c;
    const o = (s = t == null ? void 0 : t.temporal) == null ? void 0 : s.dates[i];
    for (const d of n) {
      const m = d.data[i] ?? null;
      m === null && (t != null && t.skipNull) || r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: m,
        key: d.key,
        label: d.label,
        member: ((u = d.meta) == null ? void 0 : u.measure) ?? d.key,
        companion: ((c = d.meta) == null ? void 0 : c.companion) ?? !1,
        i
      });
    }
  }), r;
}
function kr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function ao(e) {
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
    var d, m, f;
    const o = (d = n == null ? void 0 : n.temporal) == null ? void 0 : d.dates[i], s = /* @__PURE__ */ new Map();
    for (const p of t) {
      const g = p.data[i];
      if (typeof g == "number" && Number.isFinite(g)) {
        const y = kr(p);
        s.set(y, (s.get(y) ?? 0) + Math.abs(g));
      }
    }
    const u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
    for (const p of t) {
      const g = p.data[i] ?? null, y = kr(p), k = s.get(y) ?? 0, w = g === null || k === 0 ? null : Math.abs(g) / k;
      let C = 0, x = 0;
      if (g !== null) {
        const M = g < 0 ? c : u;
        C = M.get(y) ?? 0, x = C + g, M.set(y, x);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: g,
        key: p.key,
        label: p.label,
        member: ((m = p.meta) == null ? void 0 : m.measure) ?? p.key,
        companion: ((f = p.meta) == null ? void 0 : f.companion) ?? !1,
        i,
        stack: y,
        y1: C * N,
        y2: x * N,
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
function Jt(e) {
  return e.label || e.key;
}
function Ue(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ta(e, t) {
  const n = e.series.map(Jt), r = e.series.map(Ue), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = zr({ placement: _t(t.legendPlacement) })), a;
}
function _t(e) {
  return e === "top" ? "top" : "bottom";
}
function an(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Mn(e = 0.2) {
  return Ks().padding(e);
}
function io() {
  return Us().padding(0.02);
}
const ou = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function su(e) {
  if (typeof e == "string" && ou.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return Zi(e);
}
function oo(e) {
  return e.toISOString().slice(0, -1);
}
function ja(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Qe.safeParse(n);
  return r.success ? r.data : void 0;
}
function so(e, t) {
  var d, m, f;
  const n = (m = (d = t.mapping) == null ? void 0 : d.category) == null ? void 0 : m.member, r = (f = e.raw.annotation) == null ? void 0 : f.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const p of Object.keys(r))
    if (p === n || p.startsWith(`${n}.`)) {
      a = p;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? ja(n) : ja(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const p of e.categories) {
    if (typeof p == "number" && i === void 0 || typeof p == "string" && !Qr(p)) return null;
    const g = su(p);
    if (!g) return null;
    s.push(g);
  }
  const u = /* @__PURE__ */ new Set(), c = s.filter((p) => u.has(p.getTime()) ? !1 : (u.add(p.getTime()), !0)).sort((p, g) => p.getTime() - g.getTime());
  return c.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: c };
}
function lo(e) {
  return e ? Qs : io;
}
function na(e) {
  return e ? "t" : "cat";
}
function xn(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? oo(r)) : t.category(r);
}
function Wa(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : oo(t);
}
function co(e, t) {
  const n = ro(), [r, a] = b.useState(null), i = b.useRef({ opts: t, interactions: n, temporal: e });
  b.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return b.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, u = (p) => p !== void 0 && s.some((g) => g.getTime() === p.getTime()), c = r && u(r.start) && u(r.end) ? r : null, d = s[0], m = c ?? { start: d, end: d }, f = c === null;
    return [
      Gs({
        id: "cv-brush-x",
        values: s,
        range: Ys(
          m,
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
              from: Wa(y, p.start),
              to: Wa(y, p.end)
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
function lu(e, t) {
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
    const a = () => r ? Ra().domain(r) : Ra();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: vn().domain(r), nice: !1 } : { scale: vn, nice: !0 };
}
function uo(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function Xt(e) {
  switch (e) {
    case "monotone":
      return Jn(el);
    case "step":
      return Jn(Zs);
    case "natural":
      return Jn(Xs);
    default:
      return;
  }
}
function Mt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ra(e, t) {
  var o, s, u, c;
  const n = e.raw.annotation, r = (d) => {
    var m, f, p, g, y, k;
    if (d)
      return ((m = n == null ? void 0 : n.measures[d]) == null ? void 0 : m.shortTitle) ?? ((f = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : f.shortTitle) ?? ((p = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : p.shortTitle) ?? ((g = n == null ? void 0 : n.measures[d]) == null ? void 0 : g.title) ?? ((y = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : y.title) ?? ((k = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : k.title) ?? d;
  }, a = e.series[0], i = (d) => {
    var m;
    return d ? (m = d.meta) != null && m.measure ? r(d.meta.measure) : d.label : void 0;
  };
  return {
    x: Mt((o = t.axes) == null ? void 0 : o.x, r((u = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : u.member)),
    y: Mt((c = t.axes) == null ? void 0 : c.y, i(a))
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
function cu(e) {
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
function $n(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Vr,
    className: ia(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((m) => {
        var f;
        return { datum: m, color: (f = e.colorOf) == null ? void 0 : f.call(e, m) };
      }) : a.map((m) => ({ datum: m.datum, color: m.color }));
      let u = 0, c = 0;
      if (e.percentShare || e.showTotal)
        for (const m of s) {
          const f = m.datum.value;
          m.datum.companion || typeof f != "number" || !Number.isFinite(f) || (u += f, c += 1);
        }
      const d = s.map((m) => ({
        label: m.datum.label,
        value: e.percentShare && u > 0 && typeof m.datum.value == "number" ? Xe(m.datum.value / u, e.locale) : n(m.datum),
        color: m.color
      }));
      return e.showTotal && c > 1 && d.push({
        label: "Total",
        value: e.percentShare ? Xe(1, e.locale) : e.format.value(u, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: d };
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
    }, c = i.axis === "x", d = c ? t[i.value] : void 0;
    if (c && d == null) return;
    const m = n != null && n.swap ? !c : c, f = m ? n != null && n.swap ? i.value : d : n != null && n.swap ? d : i.value;
    if (r.push(
      m ? Si([f], { id: `cv-ref-${o}`, ...u }) : Mi([f], { id: `cv-ref-${o}`, ...u })
    ), !i.label) return;
    const p = c ? n == null ? void 0 : n.valueAnchor : a;
    if (p == null) return;
    const g = (n == null ? void 0 : n.swap) === !0;
    r.push(
      oa(
        Qt(
          [
            {
              x: m ? f : p,
              y: m ? p : f,
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
            dy: m ? g ? -6 : 8 : -6,
            dx: m ? 4 : 0,
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
function mo(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = na((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const u = s.share;
    return typeof u == "number" ? Xe(u, n.locale) : "";
  };
  return [
    oa(
      Qt(r, {
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
const uu = Ri({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), mu = Ri({ initial: !1 });
function nt({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const u = b.useRef(null), c = ro(), d = c.pointEnabled && !r, m = b.useRef(s);
  b.useLayoutEffect(() => {
    m.current = s;
  });
  const f = b.useCallback(
    (w) => {
      if (w === null) {
        c.emitPoint(null);
        return;
      }
      const C = m.current, x = C ? C(w) : lu(w, c.target);
      x && c.emitPoint(x);
    },
    [c]
  ), [p, g] = b.useState({ w: 0, h: 0 }), y = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = u.current;
    if (!w || typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((x) => {
      var M;
      const N = (M = x[0]) == null ? void 0 : M.contentRect;
      N && g({ w: Math.floor(N.width), h: Math.floor(N.height) });
    });
    return C.observe(w), () => C.disconnect();
  }, []);
  const k = r ? Math.max(24, p.h || Math.round((p.w || 160) / 5)) : Math.max(i, p.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: u,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: p.w > 0 && /* @__PURE__ */ l(
        Hs,
        {
          definition: e,
          renderer: a ? uu : mu,
          width: p.w,
          height: k,
          ariaLabel: t,
          idPrefix: y,
          onSelect: o ?? (d ? f : void 0)
        }
      )
    }
  );
}
function du({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var H, X, ae, ce, z, G, ne, oe, ie, se, V, I;
    const s = t.orientation === "horizontal", u = t.stackMode === "percent", c = t.stackMode === "stacked" || u, d = e.series.filter((S) => {
      var O;
      return (O = S.meta) == null ? void 0 : O.companion;
    }), m = d.length ? e.series.filter((S) => {
      var O;
      return !((O = S.meta) != null && O.companion);
    }) : e.series, f = c ? m : e.series, g = (c ? ao(f) : []).length > 1, y = g ? wr(e, f, { normalize: u }) : He(e, { series: f }), k = new Map(e.series.map((S) => [Jt(S), Ue(S)])), w = /* @__PURE__ */ new Map();
    if (g)
      for (const S of y) {
        const O = w.get(S.i);
        O ? O.push(S) : w.set(S.i, [S]);
      }
    const C = ra(e, t), x = s ? (X = (H = t.axes) == null ? void 0 : H.y) == null ? void 0 : X.hide : (ce = (ae = t.axes) == null ? void 0 : ae.x) == null ? void 0 : ce.hide, N = s ? (z = t.axes) == null ? void 0 : z.x : (G = t.axes) == null ? void 0 : G.y, M = St(N), P = r.barCategoryGap, A = s ? (ne = t.axes) == null ? void 0 : ne.y : (oe = t.axes) == null ? void 0 : oe.x, R = Ee(n, A), $ = Ee(n, N), L = cu(t) ?? aa(e.series[0]), E = (S) => u ? Xe(S) : $.value(S, L, "axis"), D = x ? !1 : {
      label: C.x,
      ticks: { format: (S) => R.category(S) }
    }, _ = N != null && N.hide ? !1 : { label: C.y, ticks: { format: E } }, j = Ws({ padding: r.barGap }), K = g ? j : u ? xi({ offset: "normalize" }) : c ? void 0 : j, W = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (S) => g ? S.stack : S.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (S) => `${S.label} ${S.i}`,
      layout: K,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (S) => {
        const O = k.get(S.label) ?? "var(--chart-1)";
        return S.companion ? `color-mix(in oklab, ${O} 40%, transparent)` : O;
      }
    }, Z = [
      g ? s ? Ta(y, { ...W, x1: "y1", x2: "y2", y: "cat" }) : Oa(y, { ...W, x: "cat", y1: "y1", y2: "y2" }) : s ? Ta(y, { ...W, x: "value", y: "cat" }) : Oa(y, { ...W, x: "cat", y: "value" })
    ];
    if (c && !u && d.length) {
      const S = e.categories.map((O, q) => {
        var F, B, J;
        return {
          cat: typeof O == "number" ? O : String(O),
          value: d.reduce((ue, ye) => {
            const Y = ye.data[q];
            return typeof Y != "number" ? ue : (ue ?? 0) + Y;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((B = (F = d[0]) == null ? void 0 : F.meta) == null ? void 0 : B.measure) ?? ((J = d[0]) == null ? void 0 : J.key),
          companion: !0,
          i: q
        };
      });
      if (S.some((O) => O.value !== null)) {
        const O = {
          id: "cv-bars-prev",
          key: (q) => `prev ${q.i}`,
          curve: Xt("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        Z.push(
          s ? Bs(S, { ...O, x: "value", y: "cat" }) : Ln(S, { ...O, x: "cat", y: "value" })
        );
      }
    }
    if (Z.push(
      ...sa(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: la(e)
      })
    ), a.showValueLabels) {
      const S = c ? g ? y : wr(e, f, { normalize: u }) : y;
      Z.push(
        ...mo(S, n, {
          swap: s,
          share: u,
          stacked: c
        })
      );
    }
    return et({
      marks: Z,
      x: s ? { scale: M.scale, nice: M.nice, grid: !0, axis: _ } : { scale: () => Mn(P), axis: D },
      y: s ? { scale: () => Mn(P), axis: D } : { scale: M.scale, nice: M.nice, grid: !0, axis: _ },
      color: ta(c ? { ...e, series: f } : e, {
        legend: an(t) && f.length > 1,
        legendPlacement: _t((ie = t.legend) == null ? void 0 : ie.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((se = t.tooltip) == null ? void 0 : se.show) === !1 ? void 0 : $n({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: u && !g,
        value: u && g ? (S) => {
          const O = S.share;
          return typeof O == "number" ? Xe(O) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: g ? (S) => w.get(S.i) ?? [S] : void 0,
        colorOf: g ? (S) => k.get(S.label) ?? "var(--chart-1)" : void 0,
        indicator: (V = t.tooltip) == null ? void 0 : V.indicator,
        showTotal: (I = t.tooltip) == null ? void 0 : I.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(Jt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(nt, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function fu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var p;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : so(e, t),
    [e, t, i]
  ), s = b.useMemo(() => xn(o, n), [o, n]), u = (p = t.axes) == null ? void 0 : p.x, c = b.useMemo(
    () => u != null && u.tickFormat ? xn(o, Ee(n, u)) : s,
    [o, n, u, s]
  ), d = co(o, {
    label: s,
    ariaLabel: "Time range"
  }), m = b.useMemo(() => {
    var P, A, R, $, L, E, D, _, j;
    const g = na(o), y = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = Xt(k), C = ra(e, t), x = St((P = t.axes) == null ? void 0 : P.y), N = e.categories.length <= 1, M = e.series.map((K) => {
      var Z, H, X;
      const W = He(e, { series: [K], skipNull: y, temporal: o });
      return Ln(W, {
        id: `cv-line-${K.key}`,
        x: g,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (Z = K.meta) != null && Z.companion ? "5 4" : void 0,
        strokeOpacity: (H = K.meta) != null && H.companion ? 0.55 : void 0,
        stroke: Ue(K),
        points: !i && !((X = K.meta) != null && X.companion) && (uo(K, a.dots) || N)
      });
    });
    return i || (M.push(
      ...sa(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: la(e)
      }),
      ...mo(
        a.showValueLabels ? He(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), M.push(Oi({ x: {}, y: !1, marker: a.dots !== !1 }))), et({
      marks: M,
      x: {
        scale: lo(o),
        axis: i || (R = (A = t.axes) == null ? void 0 : A.x) != null && R.hide ? !1 : {
          label: C.x,
          ticks: { format: c }
        }
      },
      y: {
        scale: x.scale,
        nice: x.nice,
        grid: !i,
        axis: i || (L = ($ = t.axes) == null ? void 0 : $.y) != null && L.hide ? !1 : {
          label: C.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (K) => {
              var W, Z, H, X;
              return Ee(n, (W = t.axes) == null ? void 0 : W.y).value(
                K,
                ((H = (Z = e.series[0]) == null ? void 0 : Z.meta) == null ? void 0 : H.measure) ?? ((X = e.series[0]) == null ? void 0 : X.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ta(e, {
        legend: !i && an(t) && e.series.length > 1,
        legendPlacement: _t((E = t.legend) == null ? void 0 : E.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((D = t.tooltip) == null ? void 0 : D.show) === !1 ? void 0 : $n({
        format: n,
        category: s,
        indicator: (_ = t.tooltip) == null ? void 0 : _.indicator,
        showTotal: (j = t.tooltip) == null ? void 0 : j.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: d
    });
  }, [e, t, n, a, r, i, o, s, c, d]), f = e.series.map(Jt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    nt,
    {
      definition: m,
      ariaLabel: f,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function hu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, C;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", u = o === "percent", c = b.useMemo(() => so(e, t), [e, t]), d = b.useMemo(() => xn(c, n), [c, n]), m = (C = t.axes) == null ? void 0 : C.x, f = b.useMemo(
    () => m != null && m.tickFormat ? xn(c, Ee(n, m)) : d,
    [c, n, m, d]
  ), p = co(c, { label: d, ariaLabel: "Time range" }), g = b.useMemo(() => {
    var X, ae, ce, z, G, ne, oe, ie, se;
    const x = na(c), N = a.connectNulls ?? !1, M = a.curve ?? "monotone", P = Xt(M), A = r.areaFillOpacity, R = r.lineWidth, $ = ra(e, t), L = St((X = t.axes) == null ? void 0 : X.y), E = aa(e.series[0]), D = e.series.filter((V) => {
      var I;
      return !((I = V.meta) != null && I.companion);
    }), _ = u ? [] : e.series.filter((V) => {
      var I;
      return (I = V.meta) == null ? void 0 : I.companion;
    }), j = new Map(e.series.map((V) => [V.key, Ue(V)])), K = [], W = (V) => `cv-area-fill-${V.replace(/[^a-zA-Z0-9_-]/g, "-")}`, Z = s ? void 0 : D.map((V) => ({
      id: W(V.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: Ue(V), opacity: A * 0.15 },
        { offset: 1, color: Ue(V), opacity: A }
      ]
    }));
    if (s)
      for (const { stackId: V, series: I } of ao(D)) {
        const S = He(e, { series: I, skipNull: N, temporal: c });
        K.push(
          dr(S, {
            id: V ? `cv-area-stack-${V}` : "cv-area-stack",
            x,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (O) => `${O.key}:${O.i}`,
            curve: P,
            fillOpacity: A,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (O) => j.get(O.key) ?? "currentColor",
            strokeWidth: R,
            layout: u ? xi({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const V of D) {
        const I = He(e, { series: [V], skipNull: N, temporal: c });
        K.push(
          dr(I, {
            id: `cv-area-${V.key}`,
            x,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: P,
            fill: `url(#${W(V.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: Ue(V),
            strokeWidth: R
          })
        );
      }
    for (const V of _) {
      const I = He(e, { series: [V], skipNull: N, temporal: c });
      K.push(
        Ln(I, {
          id: `cv-area-prev-${V.key}`,
          x,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: P,
          strokeWidth: R,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: Ue(V)
        })
      );
    }
    const H = new Set(
      D.filter((V) => uo(V, a.dots)).map((V) => V.key)
    );
    if (H.size > 0) {
      const V = s ? wr(e, D, { normalize: u, temporal: c }).filter(
        (I) => H.has(I.key) && I.value !== null
      ) : He(e, {
        series: D.filter((I) => H.has(I.key)),
        skipNull: !0,
        temporal: c
      });
      K.push(
        Ti(V, {
          id: "cv-area-dots",
          x,
          y: (I) => s ? I.y2 ?? null : I.value,
          z: "label",
          color: "label",
          key: (I) => `${I.key}:${I.i}`,
          r: 3
        })
      );
    }
    return K.push(
      ...sa(a.referenceLines, (c == null ? void 0 : c.dates) ?? e.categories, {
        valueAnchor: la(e)
      })
    ), K.push(Oi({ x: {}, y: !1, marker: !0 })), et({
      marks: K,
      gradients: Z,
      x: {
        scale: lo(c),
        axis: (ce = (ae = t.axes) == null ? void 0 : ae.x) != null && ce.hide ? !1 : {
          label: $.x,
          ticks: { format: f }
        }
      },
      y: {
        scale: L.scale,
        nice: L.nice,
        grid: !0,
        axis: (G = (z = t.axes) == null ? void 0 : z.y) != null && G.hide ? !1 : {
          label: $.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (V) => {
              var I;
              return u ? Xe(V) : Ee(n, (I = t.axes) == null ? void 0 : I.y).value(V, E, "axis");
            }
          }
        }
      },
      color: ta(e, {
        legend: an(t) && e.series.length > 1,
        legendPlacement: _t((ne = t.legend) == null ? void 0 : ne.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : $n({
        format: n,
        percentShare: u,
        category: d,
        indicator: (ie = t.tooltip) == null ? void 0 : ie.indicator,
        showTotal: (se = t.tooltip) == null ? void 0 : se.showTotal
      }),
      keyboard: !0,
      controls: p
    });
  }, [e, t, n, a, r, s, u, c, d, f, p]), y = e.series.map(Jt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(nt, { definition: g, ariaLabel: y, className: "cv-chart--fill" });
}
const pu = 0.26, gu = 0.03, Ba = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function vu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var g, y;
  const a = t.familyOptions ?? {}, i = e.series[0], o = aa(i), s = (y = (g = t.colors) == null ? void 0 : g.ramp) != null && y.length ? t.colors.ramp : Vn, u = b.useMemo(() => {
    const k = e.categories.map((w, C) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[C]) ?? 0
    }));
    return bu(k, a.maxSlices).map((w, C) => ({
      ...w,
      token: s[C % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), c = u.reduce((k, w) => k + w.value, 0), d = u.some((k) => k.value < 0), m = d || u.length === 0 || c <= 0, f = b.useMemo(() => {
    var L, E, D;
    if (m) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = k > 0, C = a.showLabels ?? "percent", x = C !== "none", N = x ? Math.min(r.pieRadiusPct / 100, 1 - pu) : r.pieRadiusPct / 100, M = Wl(u, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), A = [pr(M, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: _ }) => _ * k,
      outerRadius: ({ radius: _ }) => _ * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (x) {
      const _ = (j) => C === "name" ? j.label : C === "value" ? n.value(j.value, o, "label") : Xe(j.fraction);
      A.push(
        Xn(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          M.filter((j) => j.value > 0 && j.fraction >= gu),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (j) => j.angle,
            radius: N,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: _,
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
      const _ = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(c, o, "label") : a.centerLabel.value;
      if (A.push(
        Xn([{ id: "cv-pie-center" }], {
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
      ), a.centerLabel.label) {
        const j = a.centerLabel.label;
        A.push(
          Xn([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => j,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const R = {
      domain: u.map((_) => _.label),
      range: u.map((_) => `var(--${_.token})`)
    };
    an(t) && (R.legend = zr({ placement: _t((L = t.legend) == null ? void 0 : L.position) }));
    const $ = i ? i.label || i.key : "";
    return et({
      marks: [
        ji({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: vn().domain([0, Math.PI * 2]) },
          radius: { scale: vn().domain([0, 1]) },
          marks: A
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: R,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((E = t.tooltip) == null ? void 0 : E.show) === !1 ? void 0 : {
        use: Vr,
        className: ia((D = t.tooltip) == null ? void 0 : D.indicator),
        content: (_) => {
          const j = _[0];
          if (!j) return { rows: [] };
          const K = j.datum;
          return {
            title: K.label,
            rows: [
              {
                label: $,
                value: `${n.value(K.value, o, "tooltip")} (${Xe(K.fraction)})`,
                color: j.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, u, c, t, n, a, r, i, o]);
  if (d)
    return /* @__PURE__ */ l("div", { style: Ba, children: "Pie charts can't show negative values" });
  if (!f)
    return /* @__PURE__ */ l("div", { style: Ba, children: "No data" });
  const p = u.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(nt, { definition: f, ariaLabel: p, className: "cv-chart--fill" });
}
function bu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function yu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (p) => {
    var g, y;
    return ((g = i == null ? void 0 : i.measures[p]) == null ? void 0 : g.shortTitle) ?? ((y = i == null ? void 0 : i.dimensions[p]) == null ? void 0 : y.shortTitle) ?? p;
  }, s = a.x ? o(a.x) : "x", u = a.y ? o(a.y) : "y", c = a.size ? o(a.size) : void 0, d = b.useMemo(() => {
    var K, W, Z, H, X, ae, ce, z, G, ne, oe, ie, se, V;
    if (!a.x || !a.y) return null;
    const p = wu(e.raw.rows, a);
    if (p.length === 0) return null;
    const g = !!a.groupBy, y = [];
    if (g)
      for (const I of p)
        I.group !== void 0 && !y.includes(I.group) && y.push(I.group);
    const [k, w] = r.bubbleAreaRange, C = Math.sqrt(Math.max(k, 0) / Math.PI), x = Math.sqrt(Math.max(w, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, M = (W = (K = t.colors) == null ? void 0 : K.ramp) != null && W.length ? t.colors.ramp : Vn;
    g ? (N.z = "group", N.color = "group") : N.fill = `var(--${M[0]})`, a.size ? (N.r = (I) => I.size ?? 0, N.rScale = { scale: () => Js().range([C, x]) }) : N.r = 4;
    const P = [Ti(p, N)];
    (Z = a.referenceLines) == null || Z.forEach((I, S) => {
      const O = `var(--${I.colorToken ?? "muted-foreground"})`, q = { stroke: O, strokeWidth: 1.25, strokeDasharray: "4 4" };
      I.axis === "y" ? (P.push(Mi([I.value], { id: `cv-ref-${S}`, ...q })), I.label && P.push(
        Qt([{ v: I.value, label: I.label }], {
          id: `cv-ref-label-${S}`,
          y: "v",
          text: "label",
          fill: O,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (P.push(Si([I.value], { id: `cv-ref-${S}`, ...q })), I.label && P.push(
        Qt([{ v: I.value, label: I.label }], {
          id: `cv-ref-label-${S}`,
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
    g && (A = {
      domain: y,
      range: y.map((I, S) => `var(--${M[S % M.length]})`)
    }, an(t) && (A.legend = zr({ placement: _t((H = t.legend) == null ? void 0 : H.position) })));
    const R = Mt((X = t.axes) == null ? void 0 : X.x, s), $ = Mt((ae = t.axes) == null ? void 0 : ae.y, u), L = St((ce = t.axes) == null ? void 0 : ce.x), E = St((z = t.axes) == null ? void 0 : z.y), D = a.x, _ = a.y, j = a.size;
    return et({
      marks: P,
      x: {
        scale: L.scale,
        nice: L.nice,
        grid: !0,
        axis: (ne = (G = t.axes) == null ? void 0 : G.x) != null && ne.hide ? !1 : {
          label: R,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (I) => {
              var S;
              return Ee(n, (S = t.axes) == null ? void 0 : S.x).value(I, D, "axis");
            }
          }
        }
      },
      y: {
        scale: E.scale,
        nice: E.nice,
        grid: !0,
        axis: (ie = (oe = t.axes) == null ? void 0 : oe.y) != null && ie.hide ? !1 : {
          label: $,
          ticks: {
            format: (I) => {
              var S;
              return Ee(n, (S = t.axes) == null ? void 0 : S.y).value(I, _, "axis");
            }
          }
        }
      },
      color: A,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((se = t.tooltip) == null ? void 0 : se.show) === !1 ? void 0 : {
        use: Vr,
        className: ia((V = t.tooltip) == null ? void 0 : V.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (I) => {
          const O = I[0];
          if (!O) return { rows: [] };
          const q = O.datum, F = [
            { label: s, value: n.value(q.x, D, "tooltip") },
            { label: u, value: n.value(q.y, _, "tooltip") }
          ];
          return j && F.push({
            label: c ?? j,
            value: n.value(q.size, j, "tooltip")
          }), { title: q.group, color: O.color, rows: F };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, u, c]), m = a.groupBy, f = (p) => {
    var y;
    if (!p || !m) return null;
    const g = (y = p.datum) == null ? void 0 : y.group;
    return g === void 0 ? null : { member: m, value: g, label: g };
  };
  return d ? /* @__PURE__ */ l(
    nt,
    {
      definition: d,
      ariaLabel: `${s} vs ${u} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: f
    }
  ) : /* @__PURE__ */ l("div", { style: ku, children: "No data" });
}
const ku = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function wu(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = Zn(r[t.x]), o = Zn(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? Zn(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function Zn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Cu(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function Nu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Su(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function fo(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Su(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => fo(e, t, n), r;
}
function Mu({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = Cu(t), s = e.raw.rows, u = e.raw.annotation, c = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const f = Cr(s, a), p = Cr(s, i), g = /* @__PURE__ */ new Map();
    return s.forEach((y, k) => {
      const w = Nu(y[o]), C = y[f], x = y[p];
      if (w === null || C === null || C === void 0 || x === null || x === void 0)
        return;
      const N = typeof C == "number" ? C : String(C), M = String(x);
      g.set(`${N}\0${M}`, {
        cat: N,
        label: M,
        value: w,
        key: `${N}|${M}`,
        member: o,
        i: k
      });
    }), [...g.values()];
  }, [s, a, i, o]), d = b.useMemo(() => {
    var C, x, N, M, P, A, R, $;
    let f = Number.POSITIVE_INFINITY, p = Number.NEGATIVE_INFINITY;
    for (const L of c)
      L.value < f && (f = L.value), L.value > p && (p = L.value);
    const g = (L) => {
      if (!L) return;
      const E = (u == null ? void 0 : u.dimensions[L]) ?? (u == null ? void 0 : u.timeDimensions[L]) ?? (u == null ? void 0 : u.measures[L]);
      return (E == null ? void 0 : E.shortTitle) ?? (E == null ? void 0 : E.title) ?? L;
    }, y = Mt((C = t.axes) == null ? void 0 : C.x, g(a)), k = Mt((x = t.axes) == null ? void 0 : x.y, g(i)), w = [
      qs(c, {
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
        Qt(c, {
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
        scale: () => Mn(0.05),
        axis: (M = (N = t.axes) == null ? void 0 : N.x) != null && M.hide ? !1 : {
          label: y,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (L) => {
              var E;
              return Ee(n, (E = t.axes) == null ? void 0 : E.x).category(L);
            }
          }
        }
      },
      y: {
        scale: () => Mn(0.05),
        axis: (A = (P = t.axes) == null ? void 0 : P.y) != null && A.hide ? !1 : {
          label: k,
          ticks: {
            format: (L) => {
              var E;
              return Ee(n, (E = t.axes) == null ? void 0 : E.y).category(L);
            }
          }
        }
      },
      color: {
        scale: fo(f, p, r.colorToken ?? "chart-1")
      },
      tooltip: ((R = t.tooltip) == null ? void 0 : R.show) === !1 ? void 0 : $n({ format: n, indicator: ($ = t.tooltip) == null ? void 0 : $.indicator })
    });
  }, [c, t, n, r, u, a, i]);
  if (c.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const m = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(nt, { definition: d, ariaLabel: m, className: "cv-chart--fill" });
}
function xu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Tu(e) {
  return `cv-kpi-trend--${e}`;
}
function Ou(e) {
  var u, c, d, m;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (f) => r.value(f, a.measure, "kpi"), o = ho([t.raw.rows[0] ?? {}], a.measure), s = ((c = (u = t.raw.annotation) == null ? void 0 : u.measures[a.measure]) == null ? void 0 : c.shortTitle) ?? ((m = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : m.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Pu, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Ru, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Ru({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var f;
  const a = n.goodDirection ?? ((f = n.comparison) == null ? void 0 : f.goodDirection) ?? "up", i = t === null ? null : zu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && _u(e.raw.query, n), u = n.sparkline ? e.series[0] : void 0, c = !!u && u.data.some((p) => p !== null), d = i ? i.diff : u ? Eu(u) : 0, m = Tu(xu(d, a));
  return /* @__PURE__ */ v("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ v("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Iu, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Au, {}) : /* @__PURE__ */ l(Du, {}))
    ] }),
    c && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Lu, { data: e, series: u, colorClass: m }) })
  ] });
}
function _u(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Au() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Di, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Du() {
  return /* @__PURE__ */ v("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Ai, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Lu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = He(e, { series: [t], skipNull: !0 }), i = St(void 0);
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
          curve: Xt("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Ln(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: Xt("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: io, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    nt,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Eu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Iu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var d;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Ai : a ? jr : Wr, u = (d = n.comparison) != null && d.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const It = -(2 * Math.PI) / 3, Nr = 2 * Math.PI / 3, Fu = Nr - It;
function Pu({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, m;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, i = ((m = r.gauge) == null ? void 0 : m.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), u = (e === null ? void 0 : $u(e, r)) ?? "chart-1", c = b.useMemo(() => {
    const f = (s - a) / (o - a), p = It + f * Fu, g = ({ radius: w }) => w * 0.7, y = pr([{ startAngle: It, endAngle: Nr }], {
      id: "cv-gauge-track",
      innerRadius: g,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = f > 0 ? [
      y,
      pr([{ startAngle: It, endAngle: p }], {
        id: "cv-gauge-value",
        innerRadius: g,
        cornerRadius: 8,
        fill: `var(--${u})`
      })
    ] : [y];
    return et({
      marks: [
        ji({
          id: "cv-gauge",
          startAngle: It,
          endAngle: Nr,
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
      nt,
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
function $u(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function ho(e, t) {
  for (const n of e) {
    const r = po(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function zu(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = ho(e, r.value));
  else {
    const s = e[1];
    a = s ? po(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function po(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const go = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: T("cv-table", e), ...t }) })
);
go.displayName = "Table";
const vo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: T("cv-table-header", e), ...t }));
vo.displayName = "TableHeader";
const bo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: T("cv-table-body", e), ...t }));
bo.displayName = "TableBody";
const dn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: T("cv-table-row", e),
      ...t
    }
  )
);
dn.displayName = "TableRow";
const yo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: T("cv-table-head", e),
    ...t
  }
));
yo.displayName = "TableHead";
const Sr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: T("cv-table-cell", e),
    ...t
  }
));
Sr.displayName = "TableCell";
const Vu = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: T("cv-table-caption", e), ...t }));
Vu.displayName = "TableCaption";
const ko = Hr(
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
      className: T(ko({ variant: t, size: n }), e),
      ...a
    }
  )
);
U.displayName = "Button";
function ju({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Wu(a, i, r, n),
    [a, i, r, n]
  ), [s, u] = b.useState(null), [c, d] = b.useState(0), m = r.pageSize ?? 25, f = b.useMemo(() => {
    var N;
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1, x = ((N = o.find((M) => M.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((M, P) => Hu(M[x], P[x]) * C);
  }, [a, s, o]), p = Math.max(1, Math.ceil(f.length / m)), g = Math.min(c, p - 1), y = f.slice(g * m, g * m + m), k = (C) => {
    u(
      (x) => (x == null ? void 0 : x.member) === C ? { member: C, dir: x.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), d(0);
  }, w = f.length > 12;
  return /* @__PURE__ */ v("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ v(go, { children: [
      /* @__PURE__ */ l(vo, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(dn, { children: o.map((C) => /* @__PURE__ */ l(
        yo,
        {
          className: qa(C.align),
          style: C.width ? { width: C.width } : void 0,
          children: /* @__PURE__ */ v(
            U,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(C.member),
              children: [
                C.label,
                /* @__PURE__ */ l(Uu, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        C.member
      )) }) }),
      /* @__PURE__ */ v(bo, { children: [
        y.map((C, x) => /* @__PURE__ */ l(dn, { children: o.map((N) => {
          const M = Gu(N.member, C[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Sr,
            {
              className: T(qa(N.align), w && "cv-table-cell--compact"),
              style: M ? { color: M } : void 0,
              children: N.render(C[N.key])
            },
            N.member
          );
        }) }, x)),
        y.length === 0 && /* @__PURE__ */ l(dn, { children: /* @__PURE__ */ l(
          Sr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    f.length > m && /* @__PURE__ */ v("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ v("span", { children: [
        g * m + 1,
        "–",
        Math.min((g + 1) * m, f.length),
        " of",
        " ",
        f.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          U,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.min(p - 1, C + 1)),
            disabled: g >= p - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Wu(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : qu(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const u = s.member, c = Cr(e, u), d = t ? Ku(t, u) : void 0, m = t ? u in t.measures : !1, f = s.label ?? (d == null ? void 0 : d.shortTitle) ?? (d == null ? void 0 : d.title) ?? u, p = s.align ?? (m ? "right" : "left"), g = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: u,
      key: c,
      label: f,
      align: p,
      width: s.width,
      render: (y) => Bu(y, m, u, g)
    };
  });
}
function Bu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function qu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Ku(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function qa(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Uu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(jr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Wr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(rl, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Hu(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Gu(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Yu(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Yu(e, t, n) {
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
const at = "cv-sidebar--default", Qu = "cv-sidebar--wide", wo = "a date or category", er = [
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
    hint: wo,
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
], Ju = [
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
    hint: wo,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], Xu = [
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
], Zu = [
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
], em = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], tm = [
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
], nm = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], qe = (e) => nm.indexOf(e), Ve = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Li,
    order: qe("bar"),
    component: du,
    optionsSchema: We.bar,
    defaults: Be.bar,
    wells: er,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: at
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: ul,
    order: qe("line"),
    component: fu,
    optionsSchema: We.line,
    defaults: Be.line,
    wells: er,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: at
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: al,
    order: qe("area"),
    component: hu,
    optionsSchema: We.area,
    defaults: Be.area,
    wells: er,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: at
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: cl,
    order: qe("pie"),
    component: vu,
    optionsSchema: We.pie,
    defaults: Be.pie,
    wells: Xu,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: at
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: ll,
    order: qe("scatter"),
    component: yu,
    optionsSchema: We.scatter,
    defaults: Be.scatter,
    wells: Zu,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: at
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: sl,
    order: qe("kpi"),
    component: Ou,
    optionsSchema: We.kpi,
    defaults: Be.kpi,
    wells: em,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Qu
  },
  table: {
    family: "table",
    label: "Table",
    icon: ol,
    order: qe("table"),
    component: ju,
    optionsSchema: We.table,
    defaults: Be.table,
    wells: tm,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: at
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: il,
    order: qe("heatmap"),
    component: Mu,
    optionsSchema: We.heatmap,
    defaults: Be.heatmap,
    wells: Ju,
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
    sidebarWidthClass: at
  }
}, rm = Ve.bar, am = Ve.line, im = Ve.area, om = Ve.pie, sm = Ve.scatter, lm = Ve.heatmap, cm = Ve.kpi, um = Ve.table, ca = [
  rm,
  am,
  im,
  om,
  sm,
  lm,
  cm,
  um
], mm = h.any();
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? ru;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? mm;
    },
    resolveOptions: (o) => au(o, i.defaults(o.family))
  };
  return i;
}
const zn = ua(ca);
function dm(e, t = zn) {
  return t.resolveOptions(e);
}
const Ka = {
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
  return e ? { ...Ka, ...e } : Ka;
}
function ma(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function fm(e) {
  const t = Math.floor(e ?? mn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function hm(e, t) {
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
function pm(e) {
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
function gm(e, t) {
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
function vm(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function bm(e, t, n) {
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
function ym(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = gm(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: vm(o.meta)
      }))
    };
  }
  const a = fm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? hm(i.data, a) : pm(i.data)
    }))
  };
}
function km(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Yb = Object.fromEntries(
  Object.entries(Ve).map(([e, t]) => [e, t.component])
);
function No({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: u = zn,
  theme: c
}) {
  const d = te(() => dm(t, u), [t, u]), m = te(() => Co(c), [c]), f = u.get(d.family), p = (f == null ? void 0 : f.queryless) ?? !1, g = ma(f) ? d.transform : void 0, y = te(() => ym(e, g), [e, g]);
  if (!p && (a != null && a.loading))
    return /* @__PURE__ */ l(Lc, { className: "cv-chart-skeleton" });
  if (!p && (a != null && a.error))
    return /* @__PURE__ */ v(En, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Br, {}),
      /* @__PURE__ */ l(In, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Fn, { children: a.error.message })
    ] });
  if (!p && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : km(y), w = bm(
    r ?? Xr(e.raw.annotation, d, Jr),
    g
  ), C = (i == null ? void 0 : i[d.family]) ?? u.require(d.family).component;
  return /* @__PURE__ */ l(
    C,
    {
      data: y,
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
const Vn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], tr = 8;
function Ua(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function So(e, t) {
  var u;
  const n = (u = t == null ? void 0 : t.ramp) != null && u.length ? t.ramp : Vn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (c, d) => r[c] ?? d, i = /* @__PURE__ */ new Set();
  for (const c of e) {
    const d = a(c.key, c.colorToken);
    d && i.add(d);
  }
  let o = 0;
  const s = () => {
    for (let c = 0; c < n.length; c++) {
      const d = n[o++ % n.length];
      if (!i.has(d))
        return i.add(d), d;
    }
    return n[o++ % n.length];
  };
  return e.map((c) => a(c.key, c.colorToken) ?? s());
}
function Ha(e, t) {
  const n = So(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function wm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function cn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = wm(e[n]);
  return t;
}
function Cm(e) {
  return {
    measures: cn(e.measures ?? {}),
    dimensions: cn(e.dimensions ?? {}),
    segments: cn(e.segments ?? {}),
    timeDimensions: cn(e.timeDimensions ?? {})
  };
}
function wt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function jn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Nm(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Sm(e, t) {
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
function Mm(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Wn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function xm(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Mo(e, t, n, r, a = zn) {
  const i = Cm(e.annotation()), o = Sm(i, r), s = Mm(e.tablePivot(), o), u = t.mapping;
  if (!u) {
    const m = n.measures ?? [];
    if (a.require(t.family).measureOnly && m.length > 0) {
      const f = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: m.map((y) => Wn(f[y])),
          meta: { ...jn(wt(i, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return Ha(p, t.colors), {
        categories: m.map(
          (y) => {
            var k, w;
            return ((k = wt(i, y)) == null ? void 0 : k.shortTitle) ?? ((w = wt(i, y)) == null ? void 0 : w.title) ?? y;
          }
        ),
        series: p,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || Ua(p)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const c = u.series.mode === "measures" ? Om(e, u.series, t, i) : Rm(e, u.category.member, u.series, t, i), d = Tm(e, u);
  return xm(c, o), Ha(c, t.colors), {
    categories: d,
    series: c,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Ua(c)
  };
}
function Tm(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Om(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const u = wt(r, s), c = i == null ? void 0 : i[s], d = o.map((m) => Wn(m[s]));
    return {
      key: s,
      label: Nm(u, c, s),
      data: d,
      ...c != null && c.colorToken ? { colorToken: c.colorToken } : {},
      meta: { ...jn(u, c, n.format), measure: s }
    };
  });
}
function Rm(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, u = o && o.length > 0 ? o : [i], c = new Set(u), d = u.length > 1, m = { x: [t], y: [s, "measures"] }, p = e.seriesNames(m).filter((w) => {
    const C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return C === void 0 || c.has(C);
  }), g = e.chartPivot(m), y = wt(a, i), k = p.map((w) => {
    var L, E;
    const C = (L = w.yValues) == null ? void 0 : L[0], x = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, N = wt(a, x), M = (E = n.meta) == null ? void 0 : E[x], P = (M == null ? void 0 : M.label) ?? (N == null ? void 0 : N.shortTitle) ?? (N == null ? void 0 : N.title) ?? x, A = C ?? w.shortTitle ?? w.title ?? w.key, R = d ? `${P} · ${A}` : A, $ = g.map((D) => Wn(D[w.key]));
    return {
      key: w.key,
      label: R,
      data: $,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...jn(N ?? y, M, r.format),
        measure: x
      }
    };
  });
  return _m(k, y, r.format);
}
function _m(e, t, n) {
  var d, m, f;
  if (e.length <= tr) return e;
  const r = (p) => p.data.reduce((g, y) => g + (y ?? 0), 0), a = [...e].sort((p, g) => r(g) - r(p)), i = a.slice(0, tr - 1), o = a.slice(tr - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, u = Array.from({ length: s }, (p, g) => {
    let y = 0, k = !1;
    for (const w of o) {
      const C = w.data[g];
      C !== null && (y += C, k = !0);
    }
    return k ? y : null;
  }), c = {
    key: "__other",
    label: `Other (${o.length})`,
    data: u,
    meta: { ...jn(t, void 0, n), ...(f = (m = i[0]) == null ? void 0 : m.meta) != null && f.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, c];
}
function Wn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const re = (e) => he(e, "yyyy-MM-dd");
function Am(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [re(t), re(t)];
  if (n === "yesterday") {
    const o = ke(t, 1);
    return [re(o), re(o)];
  }
  if (n === "this week") return [re(yn(t)), re(kn(t))];
  if (n === "this month") return [re(ot(t)), re(Wt(t))];
  if (n === "this quarter") return [re(st(t)), re(Bt(t))];
  if (n === "this year") return [re(lt(t)), re(qt(t))];
  if (n === "last week") {
    const o = fr(t, 1);
    return [re(yn(o)), re(kn(o))];
  }
  if (n === "last month") {
    const o = ct(t, 1);
    return [re(ot(o)), re(Wt(o))];
  }
  if (n === "last quarter") {
    const o = ut(t, 1);
    return [re(st(o)), re(Bt(o))];
  }
  if (n === "last year") {
    const o = mt(t, 1);
    return [re(lt(o)), re(qt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [re(ke(t, a - 1)), re(t)] : i.startsWith("week") ? [re(ke(t, a * 7 - 1)), re(t)] : i.startsWith("month") ? [re(ot(ct(t, a))), re(Wt(ct(t, 1)))] : i.startsWith("quarter") ? [re(st(ut(t, a))), re(Bt(ut(t, 1)))] : [re(lt(mt(t, a))), re(qt(mt(t, 1)))];
}
function xt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Dm = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Lm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Zt(e, t, n) {
  var r;
  if (Ce(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Em(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Zt(o, t, n);
    if (!xt(s))
      if (Array.isArray(s))
        for (const u of s)
          xt(u) || a.push(u);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? Am(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Im(e, t, n) {
  if ("and" in e) {
    const r = Mr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Mr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Em(e, t, n);
}
function Mr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Im(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Fm(e, t, n) {
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
function xo(e, t, n) {
  const r = Dm(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Fm(i, r, t))), e.filters !== void 0) {
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
function To() {
  let e, t;
  return (n, r, a) => {
    const i = xo(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function Oo(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Ro(e) {
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
function _o(e) {
  const t = Ro(e);
  return t === void 0 ? void 0 : Oo(t);
}
function Pm(e, t) {
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
class $m extends Error {
}
const zm = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new $m(`"${e}" cannot be parsed into a number`);
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
function Ga(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Vm extends Error {
}
class Ya extends Error {
}
class jm extends Error {
}
class nr extends Error {
}
class Wm extends Error {
}
class Bm {
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
      throw new Ya(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ga(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new jm(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const u = this.measureData[i.measure].anchors;
      if (u == null)
        throw new nr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const c = u[i.system];
      if (c == null)
        throw new nr(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = c[a.system]) === null || n === void 0 ? void 0 : n.transform, m = (r = c[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        o = d(o, this.cls);
      else if (typeof m == "number")
        o = this.cls.mul(o, m);
      else if (Ga(m))
        o = this.cls.mul(o, this.convertFraction(m));
      else
        throw new nr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new Ya(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, u = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, u = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let c = null;
    for (const d of this.possibilities()) {
      const m = this.describe(d);
      if (o.indexOf(d) === -1 && m.system === u) {
        const p = this.to(d);
        if (i ? this.cls.gt(p, s) : this.cls.lt(p, s))
          continue;
        (c === null || (i ? this.cls.lte(p, s) && this.cls.gt(p, c.val) : this.cls.gte(p, s) && this.cls.lt(p, c.val))) && (c = {
          val: p,
          unit: d,
          singular: m.singular,
          plural: m.plural
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
        throw new Wm(`Meausure "${t}" not found.`);
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
    throw new Vm(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function qm(e) {
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
function Km(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = qm(e);
  return (r) => new Bm({
    measures: e,
    unitCache: n,
    cls: zm
  }, r);
}
const Um = {
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
}, Hm = {
  systems: {
    metric: Um
  }
}, Gm = {
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
}, Ym = {
  systems: {
    SI: Gm
  }
}, Qm = {
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
}, Jm = {
  systems: {
    SI: Qm
  }
}, Xm = {
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
}, Zm = {
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
}, ed = {
  systems: {
    metric: Xm,
    imperial: Zm
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
}, td = {
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
}, nd = {
  systems: {
    SI: td
  }
}, rd = {
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
}, ad = {
  systems: {
    SI: rd
  }
}, id = {
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
}, od = {
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
}, sd = {
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
}, ld = {
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
}, cd = {
  systems: {
    bit: id,
    byte: od,
    IECBit: sd,
    IECByte: ld
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
}, ud = {
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
}, md = {
  systems: {
    metric: ud
  }
}, dd = {
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
}, fd = {
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
}, hd = {
  systems: {
    SI: dd,
    nutrition: fd
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
}, pd = {
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
}, gd = {
  systems: {
    SI: pd
  }
}, vd = {
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
}, bd = {
  systems: {
    SI: vd
  }
}, yd = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, kd = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
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
}, Cd = {
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
}, Nd = {
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
}, Sd = {
  systems: {
    metric: Cd,
    imperial: Nd
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
}, Md = {
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
}, xd = {
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
}, Td = {
  systems: {
    metric: Md,
    imperial: xd
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
}, Od = {
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
}, Rd = {
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
}, _d = {
  systems: {
    metric: Od,
    imperial: Rd
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
}, Ad = {
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
}, Dd = {
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
}, Ld = {
  systems: {
    metric: Ad,
    imperial: Dd
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
}, Ed = {
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
}, Id = {
  systems: {
    SI: Ed
  }
}, Fd = {
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
}, Pd = {
  systems: {
    unit: Fd
  }
}, $d = {
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
}, zd = {
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
}, Vd = {
  systems: {
    metric: $d,
    imperial: zd
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
}, jd = {
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
}, Wd = {
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
}, Bd = {
  systems: {
    metric: jd,
    imperial: Wd
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
}, qd = {
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
}, Kd = {
  systems: {
    SI: qd
  }
}, Ud = {
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
}, Hd = {
  systems: {
    SI: Ud
  }
}, Gd = {
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
}, Yd = {
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
}, Qd = {
  systems: {
    metric: Gd,
    imperial: Yd
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
}, Jd = {
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
}, Xd = {
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
}, Zd = {
  systems: {
    metric: Jd,
    imperial: Xd
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
}, ef = {
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
}, tf = {
  systems: {
    SI: ef
  }
}, nf = {
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
}, rf = {
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
}, af = {
  systems: {
    metric: nf,
    imperial: rf
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
}, of = {
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
}, sf = {
  systems: {
    SI: of
  }
}, lf = {
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
}, cf = {
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
}, uf = {
  systems: {
    metric: lf,
    imperial: cf
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
}, mf = {
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
}, df = {
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
}, ff = {
  systems: {
    metric: mf,
    imperial: df
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
}, hf = {
  acceleration: Hm,
  angle: Ym,
  apparentPower: Jm,
  area: ed,
  charge: nd,
  current: ad,
  digital: cd,
  each: md,
  energy: hd,
  force: gd,
  frequency: bd,
  illuminance: wd,
  length: Sd,
  mass: Td,
  massFlowRate: _d,
  pace: Ld,
  partsPer: Id,
  pieces: Pd,
  power: Vd,
  pressure: Bd,
  reactiveEnergy: Kd,
  reactivePower: Hd,
  speed: Qd,
  torque: af,
  temperature: Zd,
  time: tf,
  voltage: sf,
  volume: uf,
  volumeFlowRate: ff
}, pf = Km(hf), gf = {
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
function vf(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => pf(t).from(e.from).to(e.to)
  };
}
const xr = {
  ...Object.fromEntries(
    Object.entries(gf).map(([e, t]) => [e, vf(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Bn(e) {
  return e ? { ...xr, ...e } : xr;
}
function bf(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function yf(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function kf(e) {
  return e != null && e.quantity ? yf(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const wf = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Ao(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Qa(e, t) {
  const n = e * (wf[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const i = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], o = i.map(([u, c], d) => {
    const m = d < i.length - 1 ? Math.floor(a / u) : Math.round(a / u);
    return a -= m * u, [m, c];
  }), s = o.findIndex((u) => u[0] > 0);
  if (s === -1) {
    const u = Math.abs(n);
    return u === 0 ? "0s" : u < 1e3 ? `${r}${Ao(u.toFixed(u < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((u) => u[0] > 0).map(([u, c]) => `${u}${c}`).join(" ");
}
function rr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Ao((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Cf(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ja(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Do(e = xr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Jr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return Qa(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const d = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return Ja(rr(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return Qa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Ja(rr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? Cf(a, o) : {}, u = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", c = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${u}${rr(n, t)}${c}`;
  };
}
const Lo = b.createContext(null);
function Nf({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(Lo.Provider, { value: e, children: t });
}
function Eo() {
  return b.useContext(Lo) ?? void 0;
}
const qn = Ci(null);
qn.displayName = "CubeVizContext";
function Ie() {
  const e = $r(qn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function rt() {
  return Ie().families;
}
function Sf(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Qb({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const u = (i ?? []).map((C) => C.family).join("|"), c = te(
    () => ua(ca, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [u]
  ), d = te(
    () => Sf(e) ? Ac(e) : e,
    [e]
  ), m = te(
    () => {
      var C;
      return {
        chartRamp: (C = t == null ? void 0 : t.chartRamp) != null && C.length ? t.chartRamp : Vn,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Co(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), f = te(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), p = te(() => a ?? {}, [a]), g = te(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), y = te(
    () => ({
      cubeClient: d,
      registry: p,
      families: c,
      locale: f,
      theme: m,
      maps: g
    }),
    [d, p, c, f, m, g]
  ), [k, w] = dt(null);
  return /* @__PURE__ */ l(qn.Provider, { value: y, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: T(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(Nf, { container: k, children: /* @__PURE__ */ l(
        ea,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function da({
  families: e,
  children: t
}) {
  const n = Ie(), r = (e ?? []).map((i) => i.family).join("|"), a = te(() => !e || e.length === 0 ? n : { ...n, families: ua(ca, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(fe, { children: t }) : /* @__PURE__ */ l(qn.Provider, { value: a, children: t });
}
function Mf(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const xf = 5e3;
function Io(e, t) {
  const { cubeClient: n } = Ie(), r = (t == null ? void 0 : t.skip) ?? !1, a = te(
    () => e.limit === void 0 ? { ...e, limit: xf } : e,
    [e]
  ), i = te(() => JSON.stringify(a), [a]), [o, s] = dt({ isLoading: !r }), [u, c] = dt(0), d = Ge(() => c((m) => m + 1), []);
  return nn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let m = !0;
    const f = new AbortController();
    return s((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: f.signal }).then((p) => {
      m && s({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      m && s({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      m = !1, f.abort();
    };
  }, [n, i, r, u]), { ...o, refetch: d };
}
const Kn = Ci(null);
Kn.displayName = "DashboardContext";
function fa({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = it(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Pm(r, t), key: r });
  const i = a.current.store, o = Tf(i, r);
  return zs(Kn.Provider, { value: o }, n);
}
function Tf(e, t) {
  const n = Ge(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ge(
    (i) => xo(i, e.getAll(), t),
    [e, t]
  ), a = Ge(
    (i) => Lm(i, e.getAll(), t),
    [e, t]
  );
  return te(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Of(e) {
  const t = Ni(e.store.subscribe, e.store.getAll, e.store.getAll);
  return te(
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
function Fo() {
  const e = $r(Kn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Of(e);
}
function on() {
  return $r(Kn);
}
const Rf = () => () => {
}, _f = Object.freeze({}), Af = Object.freeze([]);
function ar(e, t, n) {
  var x;
  const r = on(), { locale: a } = Ie(), i = rt(), o = it(null);
  o.current === null && (o.current = To());
  const s = o.current, c = !((n == null ? void 0 : n.skipResolve) ?? !1), d = () => c ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? _f,
    (r == null ? void 0 : r.decls) ?? Af
  ) : e, m = Ni(
    c && r ? r.store.subscribe : Rf,
    d,
    d
  ), { resultSet: f, isLoading: p, error: g, refetch: y } = Io(m, { skip: n == null ? void 0 : n.skip }), k = ((x = t.format) == null ? void 0 : x.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = te(() => Bn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: te(() => {
    if (f)
      return Mo(f, t, m, { unitSystem: k, conversions: w }, i);
  }, [f, t, m, k, w, i]), isLoading: p, error: g, refetch: y, resolvedQuery: m };
}
function je() {
  const { cubeClient: e } = Ie(), [t, n] = dt({ isLoading: !0 });
  return nn(() => {
    let r = !0;
    return n({ isLoading: !0 }), Dc(e).then((a) => {
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
function Jb() {
  const { locale: e } = Ie(), { formatValue: t, units: n } = e;
  return te(
    () => t ?? Do(Bn(n)),
    [t, n]
  );
}
function Po() {
  const [e, t] = dt(0), n = it(null), r = it(null), a = it(null), i = it(0), o = Ge((c) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, c !== i.current && (i.current = c, t(c));
    }));
  }, []), s = Ge(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), u = Ge(
    (c) => {
      if (s(), n.current = c, !c || typeof ResizeObserver > "u") return;
      const d = c.getBoundingClientRect().width;
      d > 0 && d !== i.current && (i.current = d, t(d));
      const m = new ResizeObserver((f) => {
        var p, g;
        for (const y of f) {
          const k = ((g = (p = y.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : g.inlineSize) ?? y.contentRect.width;
          o(k);
        }
      });
      m.observe(c), r.current = m;
    },
    [o, s]
  );
  return nn(() => s, [s]), [u, e];
}
const Df = "day";
function Lf(e, t) {
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
        granularity: r.granularity ?? Df,
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
const ee = (e) => he(e, "yyyy-MM-dd");
function Ef(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = bn(e[0]), i = bn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = tl(i, a) + 1;
    return [ee(ke(a, o)), ee(ke(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = ke(t, 1);
    return [ee(a), ee(a)];
  }
  if (n === "yesterday") {
    const a = ke(t, 2);
    return [ee(a), ee(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [ee(ke(t, 2 * a - 1)), ee(ke(t, a))];
    if (i.startsWith("week")) return [ee(ke(t, 14 * a - 1)), ee(ke(t, 7 * a))];
    if (i.startsWith("month"))
      return [ee(ot(ct(t, 2 * a))), ee(ke(ot(ct(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [ee(st(ut(t, 2 * a))), ee(ke(st(ut(t, a)), 1))];
    if (i.startsWith("year"))
      return [ee(lt(mt(t, 2 * a))), ee(ke(lt(mt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = fr(t, 1);
    return [ee(yn(a)), ee(kn(a))];
  }
  if (n === "this month") {
    const a = ct(t, 1);
    return [ee(ot(a)), ee(Wt(a))];
  }
  if (n === "this quarter") {
    const a = ut(t, 1);
    return [ee(st(a)), ee(Bt(a))];
  }
  if (n === "this year") {
    const a = mt(t, 1);
    return [ee(lt(a)), ee(qt(a))];
  }
  if (n === "last week") {
    const a = fr(t, 2);
    return [ee(yn(a)), ee(kn(a))];
  }
  if (n === "last month") {
    const a = ct(t, 2);
    return [ee(ot(a)), ee(Wt(a))];
  }
  if (n === "last quarter") {
    const a = ut(t, 2);
    return [ee(st(a)), ee(Bt(a))];
  }
  if (n === "last year") {
    const a = mt(t, 2);
    return [ee(lt(a)), ee(qt(a))];
  }
}
function If(e, t, n = zn) {
  var c, d;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((c = r.comparison) == null ? void 0 : c.mode) !== "previousPeriod") return null;
  } else
    return null;
  const i = (d = e.timeDimensions) == null ? void 0 : d[0];
  if (!i) return null;
  const o = i.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = Ef(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Ff = {
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
  var K;
  const { registry: u, locale: c, theme: d } = Ie(), m = rt(), f = ((K = m.get(t.family)) == null ? void 0 : K.queryless) ?? !1, p = te(() => {
    var W;
    return (W = t.format) != null && W.unitSystem || !(c != null && c.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: c.unitSystem } };
  }, [t, c == null ? void 0 : c.unitSystem]), g = te(() => {
    const W = e ?? {};
    return W.timezone || !(c != null && c.timezone) ? W : { ...W, timezone: c.timezone };
  }, [e, c == null ? void 0 : c.timezone]), { data: y, isLoading: k, error: w, refetch: C, resolvedQuery: x } = ar(
    g,
    p,
    { skip: f }
  ), N = te(() => Lf(g, p), [g, p]), M = ar(
    (N == null ? void 0 : N.query) ?? g,
    (N == null ? void 0 : N.chart) ?? p,
    { skip: !N }
  ), P = te(
    () => If(x, p, m),
    [x, p, m]
  ), A = ar(
    (P == null ? void 0 : P.query) ?? g,
    p,
    { skip: !P, skipResolve: !0 }
  ), R = te(
    () => ({ [p.family]: Mf(u, p.family, m) }),
    [u, p.family, m]
  ), $ = te(() => {
    let W = y ?? Ff;
    if (N && M.data) {
      W = { ...W, series: M.data.series, categories: M.data.categories };
      const Z = W.raw.rows.length > 0, H = W.series.some((X) => X.data.some((ae) => ae !== null));
      W = { ...W, empty: !Z && !H };
    }
    if (P && A.data) {
      if (P.mode === "kpiRow") {
        const Z = A.data.raw.rows[0];
        if (Z) {
          const H = W.raw.rows[0];
          W = {
            ...W,
            raw: { ...W.raw, rows: H ? [H, Z] : [Z] }
          };
        }
      } else if (!A.data.empty) {
        const Z = new Map(A.data.series.map((H) => [H.key, H]));
        if (!W.empty && W.series.length > 0) {
          const H = W.categories.length, X = W.series.map((ae) => {
            const ce = Z.get(ae.key), z = Array.from({ length: H }, (G, ne) => (ce == null ? void 0 : ce.data[ne]) ?? null);
            return {
              ...ae,
              key: `${ae.key}__prev`,
              label: `${ae.label} (prev)`,
              colorToken: ae.colorToken,
              data: z,
              meta: { ...ae.meta, companion: !0 }
            };
          });
          W = { ...W, series: [...W.series, ...X] };
        } else {
          const H = A.data.series.map((X) => ({
            ...X,
            key: `${X.key}__prev`,
            label: `${X.label} (prev)`,
            data: [...X.data],
            meta: { ...X.meta, companion: !0 }
          }));
          W = {
            ...W,
            categories: A.data.categories,
            series: H,
            empty: !1
          };
        }
      }
    }
    return W;
  }, [y, N, M.data, P, A.data]);
  nn(() => {
    n == null || n({ rows: $.raw.rows, refetch: C, isLoading: k });
  }, [n, $.raw.rows, C, k]);
  const L = {}, E = te(
    () => c.formatValue ?? Do(Bn(c.units)),
    [c.formatValue, c.units]
  ), D = te(
    () => Xr($.raw.annotation, p, E, {
      locale: c.locale,
      unitSystem: c.unitSystem
    }),
    [$.raw.annotation, p, E, c.locale, c.unitSystem]
  ), _ = p.mapping, j = te(
    () => ({
      categoryMember: _ == null ? void 0 : _.category.member,
      pivotMember: (_ == null ? void 0 : _.series.mode) === "pivot" ? _.series.pivot : void 0,
      formatCategory: D.category
    }),
    [_, D]
  );
  return /* @__PURE__ */ l(
    ea,
    {
      widgetId: i,
      target: j,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        No,
        {
          data: $,
          options: p,
          config: L,
          format: D,
          state: f ? { loading: !1 } : { loading: k && !y, error: w },
          components: R,
          registry: m,
          theme: d.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function Pf({
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
const $o = "cube-viz-prose";
function $f(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function zf({ doc: e }) {
  const t = $f(e), n = te(
    () => t ? e : null,
    [t, e]
  ), r = Bi(
    {
      extensions: [Ki],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: T($o) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(qi, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const fn = [
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
], Vf = Object.fromEntries(
  fn.map((e) => [e.value, e.label])
);
function Xa(e) {
  return Vf[e.trim().toLowerCase()] ?? e;
}
const jf = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Wf({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = jl(), a = T(ko({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ v("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: T(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(qr, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: he(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: T(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(rn, {})
      }
    )
  ] });
}
function Bf({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: T(
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
function zo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Vl,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: T("cv-cal", e),
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
        MonthCaption: Wf,
        DayButton: Bf,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? qr : rn, { className: T("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ l(wn.Root, { "data-slot": "popover", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(wn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function De({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = Eo();
  return /* @__PURE__ */ l(wn.Portal, { container: a, children: /* @__PURE__ */ l(
    wn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: T("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function xe({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Root, { "data-slot": "select", ...e });
}
function Tr({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Group, { "data-slot": "select-group", ...e });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ l(Ne.Value, { "data-slot": "select-value", ...e });
}
function Oe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ne.Trigger,
    {
      "data-slot": "select-trigger",
      className: T("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Ne.Icon, { asChild: !0, children: /* @__PURE__ */ l(tt, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function qf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: T("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(ml, {})
    }
  );
}
function Kf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ne.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: T("cv-select-scroll-btn", e),
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
  const a = Eo();
  return /* @__PURE__ */ l(Ne.Portal, { container: a, children: /* @__PURE__ */ v(
    Ne.Content,
    {
      "data-slot": "select-content",
      className: T(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(qf, {}),
        /* @__PURE__ */ l(
          Ne.Viewport,
          {
            className: T(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Kf, {})
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
      className: T("cv-select-label", e),
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
      className: T("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Ne.ItemIndicator, { children: /* @__PURE__ */ l(gt, {}) }) }),
        /* @__PURE__ */ l(Ne.ItemText, { children: t })
      ]
    }
  );
}
const Tt = "cv-field", Uf = "cv-field-label", Ft = "yyyy-MM-dd";
function Hf(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Za(e) {
  if (!e) return;
  const t = _i(e, Ft, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Gf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? jf, [i, o] = dt(!1), s = typeof e == "string", [u, c] = Hf(e), d = Za(u), m = Za(c), f = d ? { from: d, to: m } : void 0;
  let p;
  s ? p = Xa(e) : d && m ? p = `${he(d, "MMM d, yyyy")} – ${he(m, "MMM d, yyyy")}` : d ? p = he(d, "MMM d, yyyy") : p = "Pick a date range";
  const g = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(_e, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      U,
      {
        variant: "outline",
        className: T(
          "cv-daterange-trigger",
          p === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Ei, {}),
          p
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
          children: Xa(y)
        },
        y
      )) }),
      /* @__PURE__ */ l(
        zo,
        {
          mode: "range",
          selected: f,
          defaultMonth: d,
          disabled: g,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([he(y.from, Ft), he(y.to, Ft)]) : y != null && y.from ? t([he(y.from, Ft), he(y.from, Ft)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Yf = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Qf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Fo(), i = r.rangeVariable ? Ro(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? Oo(i) : Yf), s = typeof e == "string" ? e : "", u = o.join(",");
  return nn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, u]), /* @__PURE__ */ v(
    xe,
    {
      value: s,
      onValueChange: (c) => t(c),
      children: [
        /* @__PURE__ */ l(Oe, { className: Tt, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: o.map((c) => /* @__PURE__ */ l(ge, { value: c, children: c[0].toUpperCase() + c.slice(1) }, c)) })
      ]
    }
  );
}
function Jf({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: T(Tt, "cv-field--multi"),
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
        /* @__PURE__ */ l(Oe, { className: Tt, children: /* @__PURE__ */ l(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: r.options.map((i) => /* @__PURE__ */ l(ge, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function Xf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = je(), o = te(() => {
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
      className: Tt,
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
function Zf({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Tt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function eh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Tt,
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
function th({ value: e, onChange: t, decl: n }) {
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
const nh = {
  dateRange: Gf,
  granularity: Qf,
  select: Jf,
  memberSelect: Xf,
  text: Zf,
  number: eh,
  toggle: th
};
function rh({ control: e, title: t }) {
  var p;
  const { registry: n } = Ie(), { decls: r, resolveValue: a, setVar: i } = Fo(), o = te(
    () => r.find((g) => g.name === e.variable),
    [r, e.variable]
  ), s = Vs();
  if (!o)
    return /* @__PURE__ */ v("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const u = e.control.kind, c = ((p = n.controls) == null ? void 0 : p[u]) ?? nh[u], d = a(e.variable), m = (g) => i(e.variable, g), f = t ?? o.label ?? o.name;
  return u === "toggle" ? /* @__PURE__ */ l(c, { value: d, onChange: m, decl: o, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ l("label", { className: Uf, htmlFor: s, children: f }),
    /* @__PURE__ */ l(
      c,
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
const Vo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: T(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
Vo.displayName = "Card";
const jo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: T(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
jo.displayName = "CardHeader";
const Wo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: T("cv-card-title", e),
      ...t
    }
  )
);
Wo.displayName = "CardTitle";
const ah = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: T("cv-card-description", e), ...t })
);
ah.displayName = "CardDescription";
const ih = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: T("cv-card-action", e),
      ...t
    }
  )
);
ih.displayName = "CardAction";
const Bo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: T("cv-card-content", e), ...t })
);
Bo.displayName = "CardContent";
const oh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: T("cv-card-footer", e), ...t })
);
oh.displayName = "CardFooter";
const Tn = "cube-viz-drag-handle";
function qo(e) {
  var s;
  const { registry: t } = Ie(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ v(Vo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ v(
      jo,
      {
        ...i,
        className: T(Tn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(Wo, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Bo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class ei extends js {
  constructor() {
    super(...arguments);
    Qn(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v(En, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Br, {}),
      /* @__PURE__ */ l(In, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Fn, { children: n.message })
    ] }) : this.props.children;
  }
}
function sh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function lh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function ch(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const uh = /* @__PURE__ */ (() => {
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
let vt = null;
function Ko(e = {}) {
  return vt || (e.includeStyleProperties ? (vt = e.includeStyleProperties, vt) : (vt = Ye(window.getComputedStyle(document.documentElement)), vt));
}
function On(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function mh(e) {
  const t = On(e, "border-left-width"), n = On(e, "border-right-width");
  return e.clientWidth + t + n;
}
function dh(e) {
  const t = On(e, "border-top-width"), n = On(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Uo(e, t = {}) {
  const n = t.width || mh(e), r = t.height || dh(e);
  return { width: n, height: r };
}
function fh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Me = 16384;
function hh(e) {
  (e.width > Me || e.height > Me) && (e.width > Me && e.height > Me ? e.width > e.height ? (e.height *= Me / e.width, e.width = Me) : (e.width *= Me / e.height, e.height = Me) : e.width > Me ? (e.height *= Me / e.width, e.width = Me) : (e.width *= Me / e.height, e.height = Me));
}
function Rn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function ph(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function gh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), ph(a);
}
const Se = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Se(n, t);
};
function vh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function bh(e, t) {
  return Ko(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function yh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? vh(n) : bh(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function ti(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = uh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(yh(o, n, a, r)), t.appendChild(s);
}
function kh(e, t, n) {
  ti(e, t, ":before", n), ti(e, t, ":after", n);
}
const ni = "application/font-woff", ri = "image/jpeg", wh = {
  woff: ni,
  woff2: ni,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: ri,
  jpeg: ri,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Ch(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function pa(e) {
  const t = Ch(e).toLowerCase();
  return wh[t] || "";
}
function Nh(e) {
  return e.split(/,/)[1];
}
function Rr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Sh(e, t) {
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
      } catch (u) {
        o(u);
      }
    }, s.readAsDataURL(a);
  });
}
const ir = {};
function Mh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ga(e, t, n) {
  const r = Mh(e, t, n.includeQueryParams);
  if (ir[r] != null)
    return ir[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Ho(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Nh(s)));
    a = Sh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return ir[r] = a, a;
}
async function xh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Rn(t);
}
async function Th(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Rn(s);
  }
  const n = e.poster, r = pa(n), a = await ga(n, r, t);
  return Rn(a);
}
async function Oh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Un(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Rh(e, t) {
  return Se(e, HTMLCanvasElement) ? xh(e) : Se(e, HTMLVideoElement) ? Th(e, t) : Se(e, HTMLIFrameElement) ? Oh(e, t) : e.cloneNode(Go(e));
}
const _h = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Go = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Ah(e, t, n) {
  var r, a;
  if (Go(t))
    return t;
  let i = [];
  return _h(e) && e.assignedNodes ? i = Ye(e.assignedNodes()) : Se(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ye(e.contentDocument.body.childNodes) : i = Ye(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Se(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Un(s, n)).then((u) => {
    u && t.appendChild(u);
  }), Promise.resolve()), t;
}
function Dh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Ko(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Se(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Lh(e, t) {
  Se(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Se(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Eh(e, t) {
  if (Se(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Ih(e, t, n) {
  return Se(t, Element) && (Dh(e, t, n), kh(e, t, n), Lh(e, t), Eh(e, t)), t;
}
async function Fh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const u = e.querySelector(s), c = document.querySelector(s);
      !u && c && !r[s] && (r[s] = await Un(c, t, !0));
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
async function Un(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Rh(r, t)).then((r) => Ah(e, r, t)).then((r) => Ih(e, r, t)).then((r) => Fh(r, t));
}
const Yo = /url\((['"]?)([^'"]+?)\1\)/g, Ph = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, $h = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function zh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Vh(e) {
  const t = [];
  return e.replace(Yo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Rr(n));
}
async function jh(e, t, n, r, a) {
  try {
    const i = n ? ch(t, n) : t, o = pa(t);
    let s;
    return a || (s = await ga(i, o, r)), e.replace(zh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Wh(e, { preferredFontFormat: t }) {
  return t ? e.replace($h, (n) => {
    for (; ; ) {
      const [r, , a] = Ph.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Qo(e) {
  return e.search(Yo) !== -1;
}
async function Jo(e, t, n) {
  if (!Qo(e))
    return e;
  const r = Wh(e, n);
  return Vh(r).reduce((i, o) => i.then((s) => jh(s, o, t, n)), Promise.resolve(r));
}
async function bt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Jo(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Bh(e, t) {
  await bt("background", e, t) || await bt("background-image", e, t), await bt("mask", e, t) || await bt("-webkit-mask", e, t) || await bt("mask-image", e, t) || await bt("-webkit-mask-image", e, t);
}
async function qh(e, t) {
  const n = Se(e, HTMLImageElement);
  if (!(n && !Rr(e.src)) && !(Se(e, SVGImageElement) && !Rr(e.href.baseVal)))
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
async function Kh(e, t) {
  const r = Ye(e.childNodes).map((a) => Xo(a, t));
  await Promise.all(r).then(() => e);
}
async function Xo(e, t) {
  Se(e, Element) && (await Bh(e, t), await qh(e, t), await Kh(e, t));
}
function Uh(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const ai = {};
async function ii(e) {
  let t = ai[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, ai[e] = t, t;
}
async function oi(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Ho(s, t.fetchRequestInit, ({ result: u }) => (n = n.replace(o, `url(${u})`), [o, u]));
  });
  return Promise.all(i).then(() => n);
}
function si(e) {
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
async function Hh(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const u = i.href, c = ii(u).then((d) => oi(d, t)).then((d) => si(d).forEach((m) => {
              try {
                a.insertRule(m, m.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (f) {
                console.error("Error inserting rule from remote css", {
                  rule: m,
                  error: f
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(c);
          }
        });
      } catch (i) {
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(ii(a.href).then((s) => oi(s, t)).then((s) => si(s).forEach((u) => {
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
function Gh(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Qo(t.style.getPropertyValue("src")));
}
async function Yh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ye(e.ownerDocument.styleSheets), r = await Hh(n, t);
  return Gh(r);
}
function Zo(e) {
  return e.trim().replace(/["']/g, "");
}
function Qh(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(Zo(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Jh(e, t) {
  const n = await Yh(e, t), r = Qh(e);
  return (await Promise.all(n.filter((i) => r.has(Zo(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Jo(i.cssText, o, t);
  }))).join(`
`);
}
async function Xh(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Jh(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Zh(e, t = {}) {
  const { width: n, height: r } = Uo(e, t), a = await Un(e, t, !0);
  return await Xh(a, t), await Xo(a, t), Uh(a, t), await gh(a, n, r);
}
async function ep(e, t = {}) {
  const { width: n, height: r } = Uo(e, t), a = await Zh(e, t), i = await Rn(a), o = document.createElement("canvas"), s = o.getContext("2d"), u = t.pixelRatio || fh(), c = t.canvasWidth || n, d = t.canvasHeight || r;
  return o.width = c * u, o.height = d * u, t.skipAutoScale || hh(o), o.style.width = `${c}`, o.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function tp(e, t = {}) {
  return (await ep(e, t)).toDataURL();
}
function np(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function rp(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function ap(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function ip(e, t, n = 2) {
  const r = await tp(e, {
    pixelRatio: n,
    backgroundColor: ap(e),
    cacheBust: !0
  });
  rp(r, `${np(t)}.png`);
}
function op({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), u = t.length > 0, c = !!r;
  if (!u && !n && !c) return null;
  const d = () => {
    const g = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    lh(sh(t), `${g}.csv`);
  }, m = async () => {
    const g = r == null ? void 0 : r.current;
    if (!(!g || a)) {
      i(!0), s(null);
      try {
        await ip(g, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, f = (g) => g.stopPropagation(), p = (g = !0) => T("cv-menu-item", !g && "cv-menu-item--disabled");
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ l(
      Ae,
      {
        onMouseDown: f,
        onPointerDown: f,
        onTouchStart: f,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(dl, {})
      }
    ),
    /* @__PURE__ */ v(De, { align: "end", className: "cv-menu", onMouseDown: f, onPointerDown: f, onTouchStart: f, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: p(), children: [
        /* @__PURE__ */ l(fl, {}),
        "Refresh"
      ] }) : null,
      c ? /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: a, className: p(!a), children: [
        /* @__PURE__ */ l(hl, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: d, disabled: !u, className: p(u), children: [
        /* @__PURE__ */ l(pl, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function li({
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
      return /* @__PURE__ */ l(zf, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(rh, { control: e.control, title: e.title });
  }
}
function _r({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = dt({ rows: [] }), s = Ge(
    (d) => o({ rows: d.rows, refetch: d.refetch }),
    []
  ), u = it(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(ei, { children: /* @__PURE__ */ l(li, { widget: e }) }) });
  const c = n ? null : /* @__PURE__ */ l(
    op,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: u
    }
  );
  return /* @__PURE__ */ l(
    qo,
    {
      widget: e,
      title: e.title,
      menu: c,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: u, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(ei, { children: /* @__PURE__ */ l(
        li,
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
const es = (e) => e.filter((t) => t.type === "chart");
function sp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of es(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Ce(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function lp(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(Ce);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of es(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function cp({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = on(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => sp(e.widgets), [e.widgets]), u = b.useMemo(() => lp(e.widgets), [e.widgets]), c = b.useRef({ onRangeSelect: n, onPointSelect: r });
  c.current = { onRangeSelect: n, onPointSelect: r };
  const d = b.useCallback(
    (g) => {
      var y, k;
      if (o) {
        const w = g != null && g.widgetId ? s.get(g.widgetId) : void 0;
        if (w) o(w, g ? [g.from, g.to] : void 0);
        else if (!g) for (const C of new Set(s.values())) o(C, void 0);
      }
      (k = (y = c.current).onRangeSelect) == null || k.call(y, g);
    },
    [o, s]
  ), m = b.useCallback(
    (g) => {
      var y, k;
      if (o)
        if (g) {
          const w = u.get(g.member);
          w && o(w, [String(g.value)]);
        } else
          for (const w of new Set(u.values())) o(w, void 0);
      (k = (y = c.current).onPointSelect) == null || k.call(y, g);
    },
    [o, u]
  ), f = !!(n || t && o && s.size), p = !!(r || t && o && u.size);
  return /* @__PURE__ */ l(
    ea,
    {
      onRangeSelect: f ? d : void 0,
      onPointSelect: p ? m : void 0,
      children: a
    }
  );
}
const up = "lg", mp = 640;
function dp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function fp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Xb({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = Po(), u = e.grid ?? {}, c = u.cols ?? 12, d = u.rowHeight ?? 40, m = u.margin ?? [12, 12], f = u.containerPadding ?? m, p = te(
    () => ({ [up]: fp(e.layout) }),
    [e.layout]
  ), g = te(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), y = !t && s > 0 && s < mp;
  return /* @__PURE__ */ l(da, { families: n, children: /* @__PURE__ */ l(fa, { spec: e, children: /* @__PURE__ */ l(
    cp,
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
            gap: m[1],
            padding: `${f[1]}px ${f[0]}px`
          },
          children: dp(e.layout).map((k) => {
            const w = g.get(k.i);
            if (!w) return null;
            const C = k.h * d + (k.h - 1) * m[1];
            return /* @__PURE__ */ l("div", { style: { height: C }, children: /* @__PURE__ */ l(_r, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        Wi,
        {
          width: s,
          layouts: p,
          breakpoints: { lg: 0 },
          cols: { lg: c },
          rowHeight: d,
          margin: m,
          containerPadding: f,
          dragConfig: { enabled: t, handle: `.${Tn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = g.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(_r, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function Zb({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(da, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    qo,
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
        Pf,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function ts(e, t = "None") {
  if (Ce(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => ts(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function hp(e) {
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
function pp(e, t) {
  const n = new Set(hp(t));
  return e.filter((r) => n.has(r.type));
}
function gp(e) {
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
function vp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function bp(e, t, n) {
  const r = gp(e), a = { name: vp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const or = Qe.options, ns = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function yp(e, t = "None") {
  const n = ts(e, t);
  return ns[n] ?? n;
}
const sr = "__none__";
function rs({
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
  const c = n && n.length > 0 ? n : or, d = e && !c.includes(e) ? [...c, e].sort(
    (m, f) => or.indexOf(m) - or.indexOf(f)
  ) : c;
  return /* @__PURE__ */ v(
    xe,
    {
      value: e ?? (r ? sr : ""),
      onValueChange: (m) => t(m === sr ? void 0 : m),
      disabled: o,
      children: [
        /* @__PURE__ */ l(Oe, { id: s, className: u, children: /* @__PURE__ */ l(Te, { placeholder: i }) }),
        /* @__PURE__ */ v(Re, { children: [
          r ? /* @__PURE__ */ l(ge, { value: sr, children: a }) : null,
          d.map((m) => /* @__PURE__ */ l(ge, { value: m, children: ns[m] }, m))
        ] })
      ]
    }
  );
}
function Hn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function kp(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Pe(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Gn(e) {
  return e ? e.cubes.filter((t) => Pe(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Hn(t),
    joinTargets: kp(t)
  })) : [];
}
function Ut(e, t) {
  if (!(!e || !t))
    return Gn(e).find((n) => n.name === t);
}
function va(e) {
  return e.shortTitle || e.title || e.name;
}
function ft(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function as(e) {
  return ft(e.meta, "group");
}
function wp(e) {
  return ft(e.meta, "geoPoint");
}
function ci(e) {
  const t = ft(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Cp(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function hn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Np(e, t) {
  if (t)
    return en(e, "time", t).find(hn);
}
function Sp(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = as(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function is(e, t) {
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
    quantity: ft(n, "quantity"),
    unit: ft(n, "unit")
  };
}
function pn(e, t) {
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
    quantity: ft(n, "quantity"),
    unit: ft(n, "unit")
  };
}
function os(e, t) {
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
function Mp(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = wp({ meta: i });
    !o || !Pe(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (u) => u.type === "number" && ci({ meta: u.meta }) === "latitude"
    ), s = i.filter(
      (u) => u.type === "number" && ci({ meta: u.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Cp(o[0].name, s[0].name),
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
    if (!Pe(a) || n && a.name !== n) continue;
    const i = Hn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Mp(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Pe(s) && o(is(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Pe(s) && s.type !== "time" && o(pn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Pe(s) && s.type === "time" && o(pn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Pe(s) && s.type === "number" && o(pn(s, a.name));
  }
  return r;
}
function xp(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Pe(a) || n && !n.has(a.name)) continue;
    const i = Hn(a);
    for (const o of a.segments) {
      if (!Pe(o)) continue;
      const s = os(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function $e(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Hn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(is(i, n.name)) : a(pn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(os(o, n.name));
    }
    return en(e, "geoPoint").find((n) => n.name === t);
  }
}
function ui(e) {
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
const Ar = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), ss = {
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
function Tp(e) {
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
function ht(e) {
  return e.chart.familyOptions ?? {};
}
function ya(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function ls(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Op(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Rp(e, t, n) {
  var o, s;
  const r = e.chart;
  if (ya(r)) return;
  const a = sn(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const u of t)
    if (((o = u.target) == null ? void 0 : o.kind) === "option") {
      const c = ht(e)[u.target.key];
      typeof c == "string" && i.add(c);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((u) => !i.has(u));
}
function At(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = ht(e), o = (u, c) => u.cardinality === "one" ? c.slice(0, 1) : c;
  for (const u of t) {
    if (!Fe(u)) continue;
    const c = u.target;
    switch (c.kind) {
      case "category": {
        const d = sn(a);
        r[u.id] = d ? [d] : [];
        break;
      }
      case "measures": {
        const d = ls(a), m = d.length ? d : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[u.id] = o(u, m);
        break;
      }
      case "pivot": {
        const d = ya(a) ?? Rp(e, t, n);
        r[u.id] = d ? [d] : [];
        break;
      }
      case "option": {
        const d = i[c.key];
        r[u.id] = typeof d == "string" && d ? [d] : [];
        break;
      }
      case "optionList": {
        const d = Array.isArray(i[c.key]) ? i[c.key] : [];
        r[u.id] = d.map((m) => m && typeof m == "object" ? m.member : void 0).filter((m) => typeof m == "string");
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
function _p(e, t) {
  return { ...e, dimensions: ka(e.dimensions, t) };
}
function cs(e, t) {
  const n = wa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function us(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Ap(e) {
  const t = Dp(e);
  return t === void 0 ? zp : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Dp(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Lt(e, t, n, r) {
  if (Tp(n)) return { ...e, measures: ka(e.measures, t) };
  if (n === "time") {
    const a = ln(e) ?? r;
    return us(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? Ap(a == null ? void 0 : a.dateRange),
      dateRange: a == null ? void 0 : a.dateRange
    });
  }
  return _p(e, t);
}
function Pt(e, t, n, r) {
  const a = e.query ?? {}, i = At(e, t);
  for (const [s, u] of Object.entries(i))
    if (s !== r && u.includes(n))
      return a;
  const o = ln(a);
  if ((o == null ? void 0 : o.dimension) === n) return us(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = wa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return cs(a, n);
}
function Lp(e, t, n, r) {
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
  return { category: { member: e }, series: fs(t, r) };
}
function Ht(e, t, n) {
  var u, c;
  const r = At(e, t, n), a = (d) => t.find((m) => {
    var f;
    return ((f = m.target) == null ? void 0 : f.kind) === d;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (u = r[i.id]) == null ? void 0 : u[0] : sn(e.chart),
    measures: o ? r[o.id] ?? [] : ls(e.chart),
    pivot: s ? (c = r[s.id]) == null ? void 0 : c[0] : ya(e.chart)
  };
}
function Gt(e, t, n) {
  const r = { ...ds(e.chart), ...Op(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Lp(n.category, n.measures, n.pivot, r)
    }
  };
}
function _n(e, t, n) {
  const r = { ...ht(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Ca(e, t, n, r, a) {
  const i = t.find((c) => c.id === n);
  if (!i || !Fe(i)) return e;
  const o = i.target, s = At(e, t)[n] ?? [];
  let u = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const c = s[0], d = ln(u);
      c && c !== r && (u = Pt(e, t, c, n)), u = Lt(u, r, a, d);
      const m = Ht({ ...e, query: u }, t, [r]);
      return Gt(e, u, { ...m, category: r });
    }
    case "measures": {
      const c = i.cardinality === "one" ? [r] : ka(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (u = Pt(e, t, s[0], n)), u = Lt(u, r, a);
      const d = Ht({ ...e, query: u }, t, [r]);
      return Gt(e, u, { ...d, measures: c });
    }
    case "pivot": {
      const c = s[0];
      c && c !== r && (u = Pt(e, t, c, n)), u = Lt(u, r, a);
      const d = Ht({ ...e, query: u }, t, [r]);
      return Gt(e, u, { ...d, pivot: r });
    }
    case "option": {
      const c = s[0];
      return c && c !== r && (u = Pt(e, t, c, n)), u = Lt(u, r, a), _n(e, u, { [o.key]: r });
    }
    case "optionList": {
      const c = Array.isArray(ht(e)[o.key]) ? [...ht(e)[o.key]] : [];
      return c.some((d) => (d == null ? void 0 : d.member) === r) || c.push({ member: r }), u = Lt(u, r, a), _n(e, u, { [o.key]: c });
    }
  }
}
function Ep(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Fe(a)) return e;
  const i = a.target, o = Pt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Ht(e, t), u = wa(s.measures, r), c = u.length ? s.pivot : void 0, d = u.length || !s.pivot ? o : cs(o, s.pivot);
      return Gt(e, d, { ...s, measures: u, pivot: c });
    }
    case "pivot": {
      const s = Ht(e, t);
      return Gt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return _n(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(ht(e)[i.key]) ? ht(e)[i.key] : [];
      return _n(e, o, {
        [i.key]: s.filter((u) => (u == null ? void 0 : u.member) !== r)
      });
    }
  }
}
function Ip(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = ln(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Fp(e, t) {
  if (be(t, e)) return e;
  if (e === "category" && be(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && be(t, "category") || e === "time" && be(t, "category")) return "category";
}
function Pp(e, t, n) {
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
    if (!Fe(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const u = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const c of u) {
      const d = Fp(Ip(e, c), o);
      d && (i = Ca(i, n, o.id, c, d));
    }
  }
  return i;
}
function $p(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Fe(a)) continue;
    const i = n.findIndex((o) => be(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function $t(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ms(e) {
  var o, s, u, c, d;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return $t(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return $t(r);
  const a = (c = (u = t.timeDimensions) == null ? void 0 : u[0]) == null ? void 0 : c.dimension;
  if (a) return $t(a);
  const i = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return $t(i);
}
function Dr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function ds(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function sn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function ln(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function fs(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const zp = "day";
function Lr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Vp(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Lr(r) && Lr(a) ? Pp(e, r.wells, a.wells) : jp(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function jp(e, t) {
  var p;
  const { chart: n } = e, r = e.query ?? {}, a = Dr(n).length ? Dr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((g) => g.dimension), o = sn(n) ?? ((p = r.dimensions) == null ? void 0 : p[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (g, y, k) => !!g && k.indexOf(g) === y
  ), u = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Lr(t)) {
    const g = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...u, chart: { ...u.chart, mapping: g } } : u;
  }
  const c = [...a], d = [...s], m = (g) => i.includes(g) ? "time" : "category";
  let f = u;
  for (const g of t.wells) {
    if (!g.target || !g.channel) continue;
    const y = be(g, "category") ? [
      [d, m],
      [c, () => "number"]
    ] : [
      [c, () => "number"],
      [d, m]
    ];
    let k = 0;
    for (const [w, C] of y)
      for (let x = 0; x < w.length; ) {
        if (g.cardinality === "one" && k > 0 || !be(g, C(w[x]))) {
          x += 1;
          continue;
        }
        f = Ca(f, t.wells, g.id, w[x], C(w[x])), w.splice(x, 1), k += 1;
      }
  }
  return f;
}
function hs(e) {
  return bf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function ps(e) {
  return kf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Wp(e, t) {
  return t.require(e).wells;
}
function gs(e, t) {
  var i;
  const n = t.require(e.chart.family), r = At(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function zt(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Ca(e, o.wells, n, r, a);
  return qp(e, s, o.wells);
}
function Bp(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = Ep(e, i.wells, n, r);
  return vs(e, o, i.wells);
}
function qp(e, t, n) {
  return Kp(e, vs(e, t, n));
}
function Kp(e, t) {
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
function vs(e, t, n) {
  var u, c;
  const r = ((u = e.query) == null ? void 0 : u.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((c = t.query) == null ? void 0 : c.timeDimensions) ?? [], i = new Set(a.map((d) => d.dimension)), o = new Set(Object.values(At(t, n)).flat()), s = r.filter((d) => !i.has(d.dimension) && o.has(d.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
const pe = b.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = b.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: T("cv-input", e),
        ...r
      }
    );
  }
);
pe.displayName = "Input";
function An(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ l(Fi, { className: "cv-member-type-icon" });
    case "number":
      return /* @__PURE__ */ l(hr, { className: "cv-member-type-icon" });
    case "geoPoint":
      return /* @__PURE__ */ l(Ii, { className: "cv-member-type-icon" });
    default:
      return /* @__PURE__ */ l(Kr, { className: "cv-member-type-icon" });
  }
}
function bs({
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
  const { meta: c, isLoading: d } = je(), m = b.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return en(c, n).filter((k) => y.has(k.cube));
    }
    return en(c, n, e);
  }, [c, n, e, t]), f = b.useMemo(() => {
    const y = Up(m), k = y.length > 1, w = [];
    for (const [C, x] of y)
      for (const [N, M] of Sp(x, () => "Other")) {
        const P = k ? N === "Other" ? C : `${C} · ${N}` : N;
        w.push({ key: `${C}:${N}`, label: P, items: M });
      }
    return w;
  }, [m]), p = f.length > 1, g = m.find((y) => y.name === r);
  return /* @__PURE__ */ v(xe, { value: r, onValueChange: a, disabled: o || d, children: [
    /* @__PURE__ */ l(Oe, { id: s, className: u, children: /* @__PURE__ */ l(Te, { placeholder: d ? "Loading…" : i, children: g ? /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
      An(g.type),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: g.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Re, { children: f.map((y) => /* @__PURE__ */ v(Tr, { children: [
      p && y.label ? /* @__PURE__ */ l(Or, { children: y.label }) : null,
      y.items.map((k) => /* @__PURE__ */ l(ge, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
        An(k.type),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, y.key)) })
  ] });
}
function Up(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ct({
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
      className: T("cv-segmented", s),
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
            className: T(
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
function mi(e) {
  return e.reason === void 0;
}
function Hp(e, t, n, r, a) {
  return ba(e, t, [...n]) ?? (a == null ? void 0 : a(r));
}
function Gp(e, t, n) {
  if (t !== void 0 && hs(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${ps(e)}`;
}
const Dn = "cube-viz:field-picker:only-compatible";
function ys() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function ks() {
  var e;
  try {
    return ((e = ys()) == null ? void 0 : e.getItem(Dn)) === "1";
  } catch {
    return !1;
  }
}
function Yp(e) {
  try {
    const t = ys();
    if (!t) return;
    e ? t.setItem(Dn, "1") : t.removeItem(Dn);
  } catch {
  }
}
let Er = ks();
const gn = /* @__PURE__ */ new Set();
let yt;
function Qp() {
  for (const e of [...gn]) e();
}
function ws(e) {
  e !== Er && (Er = e, Qp());
}
function Jp() {
  if (yt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Dn || ws(ks());
  };
  e.addEventListener("storage", t), yt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const un = {
  get: () => Er,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Yp(e), ws(e);
  },
  subscribe: (e) => (gn.add(e), Jp(), () => {
    gn.delete(e), gn.size === 0 && (yt == null || yt(), yt = void 0);
  })
}, di = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Ii, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(hr, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(hr, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Kr, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Fi, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, fi = ["geoPoint", "number", "numberDimension", "category", "time"];
function Cs({
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
  var ae, ce;
  const { meta: c, isLoading: d } = je(), [m, f] = b.useState(!1), [p, g] = b.useState(""), y = b.useSyncExternalStore(
    un.subscribe,
    un.get,
    un.getServer
  ), k = un.set, w = b.useId(), [C, x] = b.useState(r.viewLocked ?? "tables"), [N, M] = b.useState({});
  b.useEffect(() => {
    m && x(r.viewLocked ?? "tables");
  }, [m, r.viewLocked]);
  const P = b.useMemo(() => new Set(t), [t]), A = p.trim().toLowerCase(), R = b.useMemo(() => {
    if (C !== "tables") {
      const G = r.views.find((ne) => ne.name === C) ?? Ut(c, C);
      return G ? [{ cube: G, tag: "dataset" }] : [];
    }
    const z = [];
    r.sourceCube && z.push({ cube: r.sourceCube, tag: "source" });
    for (const G of r.relatedCubes) z.push({ cube: G, tag: "related" });
    return z;
  }, [C, r, c]), $ = [
    ...fi.filter((z) => be(e, z)),
    ...fi.filter((z) => !be(e, z))
  ], L = (z) => {
    const G = [], ne = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Set();
    for (const ie of $) {
      const se = di[ie], V = ba(e, ie, n ?? []);
      let I = en(c, se.metaKind, z);
      ie === "time" && (I = [...I].sort(
        (S, O) => Number(hn(O)) - Number(hn(S))
      ));
      for (const S of I) {
        if (P.has(S.name) || oe.has(S.name) || A && !(S.label.toLowerCase().includes(A) || S.name.toLowerCase().includes(A))) continue;
        oe.add(S.name);
        const O = as(S), q = O ? `g:${O.toLowerCase()}` : `k:${se.label}`;
        let F = ne.get(q);
        F || (F = {
          key: q,
          label: O ?? se.label,
          headerIcon: O ? void 0 : se.icon,
          rejected: V !== void 0,
          items: []
        }, ne.set(q, F), G.push(q)), V === void 0 && (F.rejected = !1), F.items.push({
          option: S,
          kind: ie,
          reason: Hp(e, ie, n ?? [], S, a)
        });
      }
    }
    return G.map((ie) => ne.get(ie));
  }, E = R.map((z) => ({ section: z, groups: L(z.cube.name) })).filter((z) => z.groups.length > 0), D = y ? E.reduce(
    (z, G) => z + G.groups.reduce((ne, oe) => ne + oe.items.filter((ie) => !mi(ie)).length, 0),
    0
  ) : 0, _ = y ? E.map((z) => ({
    section: z.section,
    groups: z.groups.map((G) => ({ ...G, rejected: !1, items: G.items.filter(mi) })).filter((G) => G.items.length > 0)
  })).filter((z) => z.groups.length > 0) : E, j = _.length > 0, K = !j && D > 0, W = (z, G) => {
    i(z, G), f(!1), g("");
  }, Z = C === "tables" ? "All related tables" : ((ae = r.views.find((z) => z.name === C)) == null ? void 0 : ae.title) ?? ((ce = Ut(c, C)) == null ? void 0 : ce.title) ?? C, H = r.viewLocked ? r.views.filter((z) => z.name === r.viewLocked) : [], X = y ? D > 0 ? `Only compatible fields — ${D} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ v(_e, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: u }),
    /* @__PURE__ */ v(De, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ v("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ v("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(gl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: p,
              onChange: (z) => g(z.target.value),
              placeholder: d ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            "aria-pressed": y,
            "aria-label": X,
            title: X,
            onClick: () => k(!y),
            className: T("cv-picker-compat", y && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(vl, { className: "cv-ec-icon" }),
              y && D > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: D }) : null
            ]
          }
        ),
        H.length > 0 ? /* @__PURE__ */ l(
          Xp,
          {
            browse: C,
            label: Z,
            views: H,
            onBrowse: x
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: j ? _.map(({ section: z, groups: G }, ne) => {
        const oe = G.reduce((I, S) => I + S.items.length, 0), ie = z.tag === "related", se = N[z.cube.name] ?? ie, V = A.length > 0 ? !0 : !se;
        return /* @__PURE__ */ v("div", { children: [
          z.tag === "related" && ne > 0 && _[ne - 1].section.tag !== "related" ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => M((I) => ({ ...I, [z.cube.name]: !se })),
              className: "cv-picker-table",
              children: [
                V ? /* @__PURE__ */ l(tt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(rn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(Pi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: z.cube.title }),
                z.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : z.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: oe })
              ]
            }
          ),
          V ? G.map((I) => /* @__PURE__ */ v(
            "div",
            {
              className: T(
                "cv-picker-group",
                I.rejected && "cv-picker-group--rejected"
              ),
              children: [
                G.length > 1 ? /* @__PURE__ */ v("div", { className: "cv-picker-group-header", children: [
                  I.headerIcon,
                  I.label,
                  I.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                I.items.map(({ option: S, kind: O, reason: q }) => /* @__PURE__ */ l(
                  Zp,
                  {
                    option: S,
                    kindIcon: di[O].icon,
                    badge: O === "time" && hn(S) ? "default" : void 0,
                    reason: q,
                    onPick: () => W(S.name, O)
                  },
                  S.name
                ))
              ]
            },
            I.key
          )) : null
        ] }, z.cube.name);
      }) : K ? /* @__PURE__ */ v("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ v("p", { children: [
          D,
          " ",
          A ? "matching " : "",
          "field",
          D === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          D === 1 ? "it" : "them",
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
function Xp({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (u) => {
    r(u), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ v(_e, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ae,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l($i, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ v(De, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(hi, { active: e === "tables", icon: /* @__PURE__ */ l(Pi, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(fe, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((u) => /* @__PURE__ */ l(
          hi,
          {
            active: e === u.name,
            icon: /* @__PURE__ */ l(Ur, { className: "cv-ec-icon" }),
            onClick: () => o(u.name),
            children: u.title
          },
          u.name
        ))
      ] }) : null
    ] })
  ] });
}
function hi({
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
      className: T(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Zp({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
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
const eg = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Vt = "yyyy-MM-dd";
function tg(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function pi(e) {
  if (!e) return;
  const t = _i(e, Vt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Na({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = tg(e), s = pi(i), u = pi(o), c = s ? { from: s, to: u } : void 0, d = a ? e : s && u ? `${he(s, "MMM d, yyyy")} – ${he(u, "MMM d, yyyy")}` : s ? he(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: T("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Ei, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: T("cv-daterange-label", d === "Any time" && "cv-daterange-label--placeholder"), children: d })
    ] }) }),
    /* @__PURE__ */ v(De, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-daterange-presets", children: [
        eg.map((m) => /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: T("cv-daterange-preset", e === m && "cv-daterange-preset--active"),
            onClick: () => {
              t(m), r(!1);
            },
            children: m
          },
          m
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
        zo,
        {
          mode: "range",
          selected: c,
          defaultMonth: s,
          onSelect: (m) => {
            m != null && m.from && m.to ? t([he(m.from, Vt), he(m.to, Vt)]) : m != null && m.from ? t([he(m.from, Vt), he(m.from, Vt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Ns = b.createContext({});
function ng({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Ns.Provider, { value: n, children: t });
}
function rg() {
  return b.useContext(Ns);
}
function ag({ kind: e, value: t, onChange: n, className: r }) {
  const a = on(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = rg(), [s, u] = b.useState(!1), [c, d] = b.useState(!1), [m, f] = b.useState(""), p = b.useMemo(() => pp(i, e), [i, e]), g = p.find((w) => w.name === t), y = (w) => {
    n(w), u(!1), d(!1);
  }, k = () => {
    if (!o) return;
    const w = bp(e, m || "Variable", i);
    o(w), y(w.name), f("");
  };
  return /* @__PURE__ */ v(
    _e,
    {
      open: s,
      onOpenChange: (w) => {
        u(w), w || d(!1);
      },
      children: [
        /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: T("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(bl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: T("cv-var-trigger-label", !g && "cv-var-trigger-label--placeholder"), children: g ? g.label ?? g.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(De, { align: "start", className: "cv-var-popover", children: [
          p.length > 0 ? p.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => y(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: c ? /* @__PURE__ */ v("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              pe,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: m,
                onChange: (w) => f(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && d(!1);
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
function Ot({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = Ce(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const u = (c) => T("cv-bind-seg", c && "cv-bind-seg--active");
  return /* @__PURE__ */ v("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ v("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: u(o === "fixed"),
          onClick: () => {
            s("fixed"), Ce(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: u(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      ag,
      {
        kind: e,
        value: Ce(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(Ce(t) ? void 0 : t, (c) => n(c))
  ] });
}
const ig = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function lr(e) {
  return "member" in e && "operator" in e;
}
function og({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var L;
  const { meta: s } = je(), u = ((L = on()) == null ? void 0 : L.decls) ?? [], [c, d] = b.useState(null), [m, f] = b.useState(null), p = r ?? [], g = p.length === 1 && !lr(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(lr) ? p[0] : void 0, y = g ? "any" : "all", k = [], w = [];
  g || p.forEach((E) => lr(E) ? k.push(E) : w.push(E));
  const C = g ? g.or : k, x = w.length === 0 && (C.length >= 2 || y === "any"), N = (E) => y === "any" ? E.length ? [{ or: E }] : [] : [...E, ...w], M = (E) => {
    const D = E.filter((j) => j.member.length > 0), _ = N(D);
    a(_.length > 0 ? _ : void 0);
  }, P = (E) => {
    const D = E === "any" ? C.length ? [{ or: C }] : [] : [...C];
    a(D.length > 0 ? D : void 0);
  }, A = (E, D) => M(C.map((_, j) => j === E ? { ..._, ...D } : _)), R = (E) => M(C.filter((D, _) => _ !== E)), $ = (E) => {
    const _ = { ...m ?? { member: "", operator: "equals", values: [] }, ...E };
    _.member ? (f(null), d(C.length), M([...C, _])) : f(_);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: T("cv-filter-builder", o), children: [
    C.length === 0 && !m ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    x ? /* @__PURE__ */ v("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Ct,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: y,
          onChange: P
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    C.map((E, D) => {
      const _ = $e(s, E.member);
      return c === D ? /* @__PURE__ */ l(
        gi,
        {
          leaf: E,
          member: _,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (j) => A(D, j),
          onDone: () => d(null),
          onRemove: () => R(D)
        },
        D
      ) : /* @__PURE__ */ l(
        sg,
        {
          text: lg(E, _ == null ? void 0 : _.label, u),
          disabled: i,
          onEdit: () => d(D),
          onRemove: () => R(D)
        },
        D
      );
    }),
    m ? /* @__PURE__ */ l(
      gi,
      {
        leaf: m,
        member: $e(s, m.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: $,
        onRemove: () => f(null)
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
        disabled: i || !!m,
        onClick: () => {
          d(null), f({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Nt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function sg({
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
        children: /* @__PURE__ */ l(Rt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function gi({
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
  const { meta: c } = je(), d = ui(t == null ? void 0 : t.type), m = d.includes(e.operator) ? e.operator : d[0], f = !Ar.has(m), p = b.useId(), g = b.useId(), y = b.useId(), k = b.useId(), w = b.useId(), C = b.useId();
  b.useEffect(() => {
    m !== e.operator && o({ operator: m });
  }, [e.operator, o, m]);
  const x = (N) => {
    const M = $e(c, N);
    o({ member: N, operator: ui(M == null ? void 0 : M.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ v("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }),
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
          Cs,
          {
            well: ig,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: x,
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
                    An(t.type),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(tt, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        bs,
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
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: y, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ v(
        xe,
        {
          value: m,
          onValueChange: (N) => o({
            operator: N,
            values: Ar.has(N) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              Oe,
              {
                id: k,
                "aria-labelledby": `${y} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Te, {})
              }
            ),
            /* @__PURE__ */ l(Re, { children: d.map((N) => /* @__PURE__ */ l(ge, { value: N, children: ss[N] }, N)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: C, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        cg,
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
function lg(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = ss[e.operator] ?? e.operator;
  if (Ar.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Ce(o)) {
      const s = n.find((u) => u.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function cg({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Ce(i[0]);
  if (t === "time") {
    const c = o ? i[0] : ug(i);
    return /* @__PURE__ */ l(
      Ot,
      {
        labelId: a,
        kind: "dateRange",
        value: c,
        onChange: (d) => n(d === void 0 ? [] : Ce(d) ? [d] : mg(d)),
        renderFixed: (d, m) => /* @__PURE__ */ l(Na, { value: d, onChange: m })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", u = o ? i[0] : i.filter((c) => !Ce(c));
  return /* @__PURE__ */ l(
    Ot,
    {
      labelId: a,
      kind: s,
      value: u,
      onChange: (c) => n(c === void 0 ? [] : Ce(c) ? [c] : c),
      renderFixed: (c, d) => /* @__PURE__ */ l(
        pe,
        {
          id: r,
          value: (c ?? []).map(String).join(", "),
          onChange: (m) => d(dg(m.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function ug(e) {
  const t = e.filter((n) => !Ce(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function mg(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function dg(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function fg({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (u) => t({ ...e, query: { ...i, filters: u } });
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: T(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(yl, { className: "cv-ec-icon--lg" }),
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
      /* @__PURE__ */ l(hg, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(og, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function hg({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = je(), a = xp(r, n);
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
        className: T(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function pg({ currentName: e, hasFields: t, onSelect: n }) {
  var y;
  const { meta: r } = je(), a = b.useMemo(() => Gn(r), [r]), i = a.filter((k) => k.type === "view"), o = a.filter((k) => k.type === "cube"), s = a.find((k) => k.name === e), [u, c] = b.useState(!1), [d, m] = b.useState(null), f = (k) => {
    if (k === e) {
      c(!1);
      return;
    }
    t ? m(k) : (n(k), c(!1));
  }, p = () => {
    d && n(d), m(null), c(!1);
  }, g = d ? ((y = a.find((k) => k.name === d)) == null ? void 0 : y.title) ?? d : "";
  return /* @__PURE__ */ v(
    _e,
    {
      open: u,
      onOpenChange: (k) => {
        c(k), k || m(null);
      },
      children: [
        /* @__PURE__ */ v(
          Ae,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l($i, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: T("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(De, { align: "start", className: "cv-source-popover", children: d ? /* @__PURE__ */ v("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ v("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: g }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(U, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => m(null), children: "Cancel" }),
            /* @__PURE__ */ l(U, { size: "sm", className: "cv-ec-h7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ v(fe, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((k) => /* @__PURE__ */ l(
              vi,
              {
                icon: /* @__PURE__ */ l(Ur, { className: "cv-ec-icon" }),
                label: k.title,
                active: k.name === e,
                onClick: () => f(k.name)
              },
              k.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((k) => /* @__PURE__ */ l(
            vi,
            {
              icon: /* @__PURE__ */ l(zi, { className: "cv-ec-icon" }),
              label: k.title,
              active: k.name === e,
              onClick: () => f(k.name)
            },
            k.name
          ))
        ] }) })
      ]
    }
  );
}
function vi({
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
      className: T(
        "cv-ec-menu-item",
        n && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: e }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: t }),
        n ? /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function gg(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function vg({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", u = b.useId(), c = b.useId(), d = n === "y" ? "Value axis title" : "Category axis title";
  return /* @__PURE__ */ v("div", { className: T("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: u, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: c,
        ...r ? { "aria-labelledby": u } : { "aria-label": d },
        value: o,
        placeholder: "No title",
        onChange: (f) => gg(e, t, n, { label: f.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function bg({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ v("div", { className: T("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
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
          n ? /* @__PURE__ */ l(kl, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(wl, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Ss = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: T("cv-label", e),
      ...t
    }
  )
);
Ss.displayName = "Label";
function me({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: T("cv-field-row", i), children: [
    /* @__PURE__ */ v("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Ss, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Ir({
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
      className: T("cv-switch", i),
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
      className: T("cv-switch-row", i),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: o,
            className: T("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(Ir, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const yg = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, kg = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function wg({ spec: e, update: t }) {
  var w, C, x;
  const n = rt(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), u = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), c = ((C = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : C.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? c : n.defaults(a).envelope.stackMode) ?? "none", m = d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none", f = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", p = ma(o) ? /* @__PURE__ */ v(fe, { children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Compare",
        hint: f === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ v(
          xe,
          {
            value: f,
            onValueChange: (N) => {
              var M;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((M = r.transform) == null ? void 0 : M.window) ?? mn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(Oe, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Te, {}) }),
              /* @__PURE__ */ l(Re, { children: kg.map((N) => /* @__PURE__ */ l(ge, { value: N, children: yg[N] }, N)) })
            ]
          }
        )
      }
    ),
    f === "rollingAvg" ? /* @__PURE__ */ l(Ng, { label: "Window (points)", children: (N) => {
      var M;
      return /* @__PURE__ */ l(
        pe,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((M = r.transform) == null ? void 0 : M.window) ?? mn,
          onChange: (P) => {
            const A = parseInt(P.target.value, 10), R = Number.isFinite(A) ? Math.min(90, Math.max(2, A)) : mn;
            s({ transform: { kind: "rollingAvg", window: R } });
          }
        }
      );
    } }) : null
  ] }) : null, g = /* @__PURE__ */ l(me, { label: "Line shape", children: /* @__PURE__ */ l(
    Ct,
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
      onChange: (N) => u({ curve: N })
    }
  ) }), y = /* @__PURE__ */ l(me, { label: "Stacked", children: /* @__PURE__ */ l(
    Ct,
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
        return /* @__PURE__ */ v(fe, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (P) => s({ orientation: P ? "horizontal" : "vertical" })
            }
          ),
          y
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return g;
      case "area":
        return /* @__PURE__ */ v(fe, { children: [
          g,
          y,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((M = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : M.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(fe, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (P) => u({ innerRadiusPct: P ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(me, { label: "Slice labels", children: /* @__PURE__ */ l(
            Ct,
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
              onChange: (P) => u({ showLabels: P })
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
    k,
    p
  ] });
}
function Cg(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ma(n);
}
function Ng({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function Ms(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function xs(e, t) {
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
function Sg(e) {
  let t = 0;
  for (const n of e)
    Fe(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Mg(e, t) {
  return e.some((n) => Fe(n) && n.cardinality === "many" && be(n, t));
}
const xg = 0.35, Tg = 0.4, Og = 0.3, Rg = 0.1;
function _g(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Og : e.supportsCartesianAxes ? Rg : e.wells.some(
    (a) => Fe(a) && a.channel === "x" && be(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Ts(e) {
  const t = e.filter(Fe);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Ag(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Dg = (e, t, n) => e === 1 ? t : n;
function Lg(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Ag(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((u) => u === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${Dg(r, "measure", "measures")}`;
  return Ts(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function Eg(e, t) {
  const n = Ms(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, u = xs(s, n), c = Sg(s), d = Math.max(0, n.length - u.matched.length), m = $p(s, r) + 0.5 * d, f = c > 0 ? m / c : 0, p = u.leftover.filter(
      (y) => y.kind !== "time" && !Mg(s, y.kind)
    ).length, g = f - xg * p + _g(o, a) - (Ts(s) ? Tg : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(g * 1e3) / 1e3,
      fits: c > 0 && u.missing.length === 0,
      reason: Lg(o, u)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function Ig(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Fg(e, t, n) {
  const r = e.require(n), a = xs(r.wells, Ms(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, u) => {
      i = zt(i, n, o.well.id, s, o.kinds[u], e);
    });
  return i;
}
function Os(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Vp(e, r, n));
  };
}
function Pg({ spec: e, update: t, empty: n }) {
  const r = rt(), a = e.chart.family, i = Os(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ v("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Rs, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function $g({ spec: e, update: t }) {
  const n = rt(), r = e.chart.family, a = Os(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ v(_e, { children: [
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
      /* @__PURE__ */ l(Rs, { spec: e, family: r, onPick: a, families: n }),
      Cg(r, n) ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(wg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Rs({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => Eg(r, e), [r, e]), i = b.useMemo(() => Ig(a), [a]), o = b.useMemo(
    () => new Map(a.map((m) => [m.family, m])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((m) => m.fits).map((m) => m.family)),
    [a]
  ), u = Wg(e, r, s), c = (m, f) => /* @__PURE__ */ l(
    zg,
    {
      fit: m,
      active: m.family === t,
      preview: u.get(m.family),
      families: r,
      reason: f ? m.reason : void 0,
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
  return /* @__PURE__ */ v("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((m) => c(m, !0)) })
    ] }) : null,
    /* @__PURE__ */ v("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: d.map((m) => c(m, !1)) })
    ] })
  ] });
}
function zg({
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
      className: T("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          Jg,
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
function _s(e, t) {
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
function Vg(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const bi = 200, jg = () => () => {
};
function Wg(e, t, n) {
  const r = e.query, a = Vg(r), i = b.useMemo(() => {
    const f = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof f == "number" ? Math.min(f, bi) : bi
    };
  }, [r]), o = on(), s = b.useRef(null);
  s.current === null && (s.current = To());
  const u = s.current, c = () => o ? u(i, o.store.getAll(), o.decls) : i, d = b.useSyncExternalStore(
    o ? o.store.subscribe : jg,
    c,
    c
  ), { resultSet: m } = Io(d, { skip: !a });
  return b.useMemo(() => {
    const f = /* @__PURE__ */ new Map();
    for (const p of t.list()) {
      const g = p.family;
      if (p.queryless || a && n.has(g) && !m) continue;
      const w = (m && n.has(g) ? Bg(e, g, t, m, d) : void 0) ?? Qg(g, t);
      w && f.set(g, w);
    }
    return f;
  }, [e, t, m, d, n, a]);
}
function Bg(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Fg(n, e, t), o = _s(i.chart, n), s = Mo(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const pt = "sample.category", tn = "sample.group", we = "sample.value", Le = "sample.count", As = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Fr = [18, 27, 21, 34, 26, 39], Pr = [12, 9, 17, 14, 22, 16], qg = As.flatMap((e, t) => [
  { [pt]: e, [tn]: "North", [we]: Fr[t], [Le]: Pr[t] },
  {
    [pt]: e,
    [tn]: "South",
    [we]: Math.round(Fr[t] * 0.62),
    [Le]: Math.round(Pr[t] * 0.78)
  }
]), Kg = {
  measures: [we, Le],
  dimensions: [pt, tn]
}, Ug = {
  measures: {
    [we]: { title: "Value", shortTitle: "Value", type: "number" },
    [Le]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [pt]: { title: "Day", shortTitle: "Day", type: "string" },
    [tn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function Ds(e) {
  const t = [
    { key: we, label: "Value", data: Fr, colorToken: "chart-1" },
    { key: Le, label: "Count", data: Pr, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: As,
    series: t,
    raw: { rows: qg, query: Kg, annotation: Ug },
    empty: !1
  };
}
const Hg = Ds(1), Gg = Ds(2), jt = (e, t) => ({
  family: e,
  mapping: { category: { member: pt }, series: { mode: "measures", members: t } }
}), Yg = {
  bar: jt("bar", [we, Le]),
  line: jt("line", [we, Le]),
  area: { ...jt("area", [we, Le]), stackMode: "stacked" },
  pie: jt("pie", [we]),
  scatter: { family: "scatter", familyOptions: { x: we, y: Le } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: pt },
      series: { mode: "pivot", value: we, pivot: tn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: we, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: pt }, { member: we }, { member: Le }] }
  }
};
function Qg(e, t) {
  const n = Yg[e] ?? jt(e, [we, Le]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Hg : Gg,
    options: _s(n, t)
  };
}
const Jg = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(Xg, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    No,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Xg extends b.Component {
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
function Zg(e, t) {
  return e.allowedCubes.includes(t);
}
function ev(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function tv(e, t, n, r) {
  const a = Gn(e), i = a.filter((x) => x.type === "view"), o = gs(t, r), s = Object.values(o).flat();
  let u;
  for (const x of s) {
    const N = $e(e, x);
    if (N) {
      u = N;
      break;
    }
  }
  const c = !u && n ? Ut(e, n) : void 0, d = u ? Ut(e, u.cube) : c, m = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, f = t.query.measures ?? [], p = f.length ? $t(f[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: i, measureSource: p, allowedCubes: [m] };
  const g = p ?? (u == null ? void 0 : u.cube) ?? (c == null ? void 0 : c.name), y = g ? Ut(e, g) : void 0, k = a.filter((x) => x.type === "cube"), w = g ? ev(k, g) : k, C = g ? [g, ...w.map((x) => x.name)] : k.map((x) => x.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: w,
    views: i,
    measureSource: p,
    allowedCubes: C
  };
}
class Yn extends b.Component {
  constructor() {
    super(...arguments);
    Qn(this, "state", { error: null, resetKey: this.props.resetKey });
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
    return n ? /* @__PURE__ */ v("div", { className: "cv-ed-broken", role: "alert", children: [
      /* @__PURE__ */ l(Cl, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
      /* @__PURE__ */ v("div", { children: [
        /* @__PURE__ */ v("strong", { className: "cv-ed-broken-title", children: [
          this.props.label,
          " couldn’t be shown"
        ] }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-msg", children: n.message }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-hint", children: "The rest of the chart is still editable — undo the last change to this control, or clear the value it holds." })
      ] })
    ] }) : this.props.children;
  }
}
function nv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function rv(e, t, n, r, a, i) {
  var F, B, J, ue, ye;
  const { chart: o, query: s } = e, u = o.family, c = n.kinds.length === 1 ? n.kinds[0] : av(a), d = o.familyOptions ?? {}, m = Array.isArray(d.columns) ? d.columns : [], f = ds(o), p = f[r], g = u === "table" && n.id === "columns", y = u === "bar" || u === "line" || u === "area", k = ((B = (F = o.mapping) == null ? void 0 : F.series) == null ? void 0 : B.mode) === "measures", w = y && n.id === "y", C = w && k, x = g ? (J = m.find((Y) => Y.member === r)) == null ? void 0 : J.label : C ? p == null ? void 0 : p.label : void 0, N = C ? p == null ? void 0 : p.colorToken : void 0, M = ln(s), P = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, A = P ? M == null ? void 0 : M.granularity : void 0, R = P ? M == null ? void 0 : M.dateRange : void 0, $ = (u === "line" || u === "area") && n.id === "y" && k, L = $ ? p == null ? void 0 : p.dots : void 0, E = (Y) => {
    var Ma, xa;
    if ((Ma = o.mapping) != null && Ma.series && o.mapping.series.mode !== "measures") return;
    const de = ((xa = o.mapping) != null && xa.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ve = { ...f };
    Y && Object.keys(Y).length > 0 ? ve[r] = Y : delete ve[r];
    const Dt = sn(o);
    Dt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Dt }, series: fs(de, ve) }
      }
    });
  }, D = (Y) => {
    const de = m.map((ve) => ve.member === r ? { ...ve, ...Y } : ve);
    t({ ...e, chart: { ...o, familyOptions: { ...d, columns: de } } });
  }, _ = (Y) => {
    g ? D({ label: Y }) : C && E({ ...p, label: Y });
  }, j = (Y) => {
    C && E({ ...p, colorToken: Y ?? void 0 });
  }, K = (Y) => {
    if (!M) return;
    const de = { ...M };
    for (const ve of Object.keys(Y)) {
      const Dt = Y[ve];
      Dt === void 0 ? delete de[ve] : de[ve] = Dt;
    }
    t({ ...e, query: { ...s, timeDimensions: [de] } });
  }, W = (Y) => K({ granularity: Y }), Z = (Y) => K({ dateRange: Y }), H = (Y) => {
    C && E({ ...p, dots: Y });
  }, X = () => t(Bp(e, u, n.id, r, i)), ae = (n.id === "x" || n.id === "slices" || n.id === "hx") && (c === "category" || c === "time"), ce = (ue = o.mapping) == null ? void 0 : ue.series, z = (ce && ce.mode === "pivot" ? ce.value : Dr(o)[0]) ?? ((ye = s.measures) == null ? void 0 : ye[0]), G = ae ? c === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...z ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...z ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ne = (() => {
    const Y = nv(s.order)[0];
    if (!Y) return "none";
    const [de, ve] = Y;
    return z && de === z ? ve === "desc" ? "value-desc" : "value-asc" : de === r ? c === "time" ? ve === "desc" ? "time-desc" : "time-asc" : ve === "asc" ? "label-asc" : "label-desc" : "none";
  })(), oe = (Y) => {
    let de;
    switch (Y) {
      case "none":
        de = void 0;
        break;
      case "value-desc":
        de = z ? [[z, "desc"]] : void 0;
        break;
      case "value-asc":
        de = z ? [[z, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        de = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        de = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: de } });
  }, ie = typeof s.limit == "number" ? s.limit : void 0, se = (Y) => t({ ...e, query: { ...s, limit: Y && Y > 0 ? Y : void 0 } }), I = (u === "bar" || u === "line" || u === "area") && P, S = I && d.comparePrevious === !0;
  return {
    kind: c,
    label: x,
    colorToken: N,
    granularity: A,
    dateRange: R,
    dots: L,
    canPoints: $,
    canRename: g || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: P,
    isCategoryField: ae,
    sortValue: ne,
    sortOptions: G,
    onSort: oe,
    limit: ie,
    onLimit: se,
    canComparePrevious: I,
    comparePrevious: S,
    comparePreviousReady: I && R !== void 0,
    onComparePrevious: (Y) => t({ ...e, chart: { ...o, familyOptions: { ...d, comparePrevious: Y || void 0 } } }),
    onRename: _,
    onRecolor: j,
    onGranularity: W,
    onDateRange: Z,
    onDots: H,
    onRemove: X
  };
}
function av(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function yi(e, t, n, r) {
  var m;
  const { chart: a, query: i } = e, o = a.family, s = (f) => {
    if (r < 0 || r >= f.length || n === r) return f;
    const p = f.slice(), [g] = p.splice(n, 1);
    return p.splice(r, 0, g), p;
  };
  if (o === "table" && t.id === "columns") {
    const f = a.familyOptions ?? {}, p = s(Array.isArray(f.columns) ? f.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...f, columns: p } } };
  }
  const u = s(i.measures ?? []), c = (m = a.mapping) == null ? void 0 : m.series;
  let d = a.mapping;
  if (c && c.mode === "measures")
    d = { ...a.mapping, series: { ...c, members: u } };
  else if (c && c.mode === "pivot" && c.values && c.values.length > 1) {
    const f = s(c.values);
    d = { ...a.mapping, series: { ...c, value: f[0], values: f } };
  }
  return { ...e, query: { ...i, measures: u }, chart: { ...a, mapping: d } };
}
const iv = Je.options;
function ov({
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
      className: T("cv-color-picker", a),
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
            className: T(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        iv.map((i) => {
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
              className: T(
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
function sv({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const u = rt(), c = rv(e, t, n, r, a, u), d = b.useId(), m = b.useId(), f = b.useId(), p = b.useId(), g = b.useId(), y = b.useId(), k = (a == null ? void 0 : a.label) ?? r, w = c.label || k, C = c.canColor && i !== void 0, x = c.canRename || C || c.isTimeField || c.isCategoryField || c.canPoints, N = (R) => {
    const $ = R.trim();
    c.onRename($.length > 0 ? $ : void 0);
  }, M = (R) => {
    !o || !R.altKey || (R.key === "ArrowUp" && o.index > 0 ? (R.preventDefault(), o.onMove(-1)) : R.key === "ArrowDown" && o.index < o.total - 1 && (R.preventDefault(), o.onMove(1)));
  }, P = /* @__PURE__ */ v(fe, { children: [
    o ? /* @__PURE__ */ l(Nl, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
    C ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? An(a.type) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: w })
  ] }), A = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: T("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", s),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (R) => {
        R.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? M : void 0,
      children: [
        x ? /* @__PURE__ */ v(_e, { children: [
          /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${w}${A}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: P
            }
          ) }),
          /* @__PURE__ */ l(De, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ v("div", { className: "cv-field-pill-config", children: [
            c.canRename ? /* @__PURE__ */ v("label", { className: "cv-ec-field", htmlFor: d, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                pe,
                {
                  id: d,
                  defaultValue: c.label ?? "",
                  placeholder: k,
                  className: "cv-ec-h8",
                  onBlur: (R) => N(R.target.value),
                  onKeyDown: (R) => {
                    R.key === "Enter" && (N(R.target.value), R.target.blur());
                  }
                }
              )
            ] }) : null,
            C ? /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(ov, { value: c.colorToken, onChange: c.onRecolor })
            ] }) : null,
            c.isTimeField ? /* @__PURE__ */ v(fe, { children: [
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  Ot,
                  {
                    kind: "dateRange",
                    value: c.dateRange,
                    onChange: c.onDateRange,
                    renderFixed: (R, $) => /* @__PURE__ */ l(Na, { value: R, onChange: $ })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  Ot,
                  {
                    kind: "granularity",
                    value: c.granularity,
                    onChange: c.onGranularity,
                    renderFixed: (R, $) => /* @__PURE__ */ l(
                      rs,
                      {
                        value: R,
                        onChange: $,
                        options: _o(c.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              c.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: g, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    Ir,
                    {
                      id: g,
                      checked: c.comparePrevious,
                      onChange: c.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                c.comparePrevious && !c.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            c.isCategoryField ? /* @__PURE__ */ v(fe, { children: [
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: m, children: [
                /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: m,
                    "aria-labelledby": f,
                    value: c.sortValue,
                    onChange: (R) => c.onSort(R.target.value),
                    className: "cv-field-pill-select",
                    children: c.sortOptions.map((R) => /* @__PURE__ */ l("option", { value: R.key, children: R.label }, R.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: p, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  pe,
                  {
                    id: p,
                    type: "number",
                    min: 1,
                    defaultValue: c.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (R) => {
                      const $ = R.target.value.trim();
                      c.onLimit($ === "" ? void 0 : Number($));
                    },
                    onKeyDown: (R) => {
                      if (R.key === "Enter") {
                        const $ = R.target.value.trim();
                        c.onLimit($ === "" ? void 0 : Number($)), R.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            c.canPoints ? /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: y, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Ir, { id: y, checked: c.dots === !0, onChange: c.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ v(
              U,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: c.onRemove,
                children: [
                  /* @__PURE__ */ l(_a, { className: "cv-ec-icon" }),
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
              title: `${w}${A}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${w}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: P
            }
          )
        ),
        /* @__PURE__ */ l(
          U,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: c.onRemove,
            "aria-label": `Remove ${w}`,
            children: /* @__PURE__ */ l(_a, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function lv({
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
  badge: d,
  orientation: m,
  lockedSingle: f,
  disableReorder: p,
  label: g,
  note: y,
  pickerSide: k,
  pickerAlign: w,
  control: C
}) {
  const x = n.cardinality === "many" && !f, N = x || r.length === 0, M = r.length, P = m === "vertical", A = g ?? n.label, R = x && M > 1 && !p, [$, L] = b.useState(null), E = ["number", "category", "time"].filter((j) => !be(n, j)).map((j) => ba(n, j, r)).find((j) => j !== void 0) ?? n.hint, D = a.length === 0 && !n.optional && be(n, "number") ? "Add a measure to start" : void 0, _ = /* @__PURE__ */ l(
    Cs,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: u,
      onSelect: c,
      side: k ?? (P ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          title: E,
          className: T(
            "cv-well-add",
            P && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Nt, { className: "cv-ec-icon" }),
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
      className: T("cv-well-group", !P && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: A }),
          d ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: d }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        C ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: C }) : null,
        /* @__PURE__ */ l(Yn, { label: A, resetKey: e, children: /* @__PURE__ */ v("div", { className: T("cv-well-fields", P ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((j, K) => /* @__PURE__ */ l(
            sv,
            {
              spec: e,
              update: t,
              well: n,
              member: j,
              option: i(j),
              resolvedColor: o(j),
              className: P ? "cv-field-pill--full" : void 0,
              reorder: R ? {
                index: K,
                total: M,
                dragging: $ === K,
                onDragStart: () => L(K),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  $ === null || $ === K || (t(yi(e, n, $, K)), L(K));
                },
                onDragEnd: () => L(null),
                onMove: (W) => t(yi(e, n, K, K + W))
              } : void 0
            },
            j
          )),
          N ? _ : null
        ] }) }),
        D ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: D }) : null,
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
  return /* @__PURE__ */ v(_e, { children: [
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
    /* @__PURE__ */ l(De, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Yn, { label: e, children: n }) })
  ] });
}
function Sa(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function cv({ spec: e, update: t }) {
  var d;
  const { fo: n, setFO: r } = Sa(e, t), a = ms(e), i = (d = e.query.timeDimensions) == null ? void 0 : d[0], o = n.display ?? "number", s = n.gauge, u = n.goodDirection ?? "up", c = (m) => {
    const f = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!f) return;
    const p = { ...f };
    for (const g of Object.keys(m)) {
      const y = m[g];
      y === void 0 ? delete p[g] : p[g] = y;
    }
    delete p.granularity, t({ ...e, query: { ...e.query, timeDimensions: [p] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Yt, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      bs,
      {
        id: m,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (f) => c({ dimension: f }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Yt, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      Ot,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (f) => c({ dateRange: f }),
        renderFixed: (f, p) => /* @__PURE__ */ l(Na, { value: f, onChange: p })
      }
    ) }) : null,
    /* @__PURE__ */ l(me, { label: "Display", children: /* @__PURE__ */ l(
      Ct,
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
      Ze,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: u !== "down",
        onChange: (m) => r({ goodDirection: m ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(Yt, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      pe,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (f) => {
          const p = parseFloat(f.target.value);
          r({ gauge: Number.isFinite(p) ? { ...s ?? {}, max: p } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function uv({ spec: e, update: t }) {
  var c;
  const { fo: n, setFO: r } = Sa(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (c = e.query.timeDimensions) == null ? void 0 : c[0], u = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(me, { label: "Compare to", children: /* @__PURE__ */ l(
      Ct,
      {
        "aria-label": "Compare to",
        size: "sm",
        options: [
          { value: "none", label: "Nothing" },
          { value: "previousPeriod", label: "Prev period" },
          { value: "value", label: "Fixed value" }
        ],
        value: u,
        onChange: (d) => r({
          comparison: d === "none" ? void 0 : (
            // Re-entering restores the config the user last had, so toggling
            // through "Nothing" is not destructive.
            { ...o.current ?? { showAsPercent: !0 }, mode: d }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ v(fe, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Yt, { label: "Baseline value", children: ({ id: d }) => /* @__PURE__ */ l(
        pe,
        {
          id: d,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const f = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Di, { className: "cv-kpi-warn-icon" }),
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
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      )
    ] }) : null
  ] });
}
function mv({ spec: e, update: t }) {
  var u, c;
  const { fo: n, setFO: r } = Sa(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = _o((c = (u = e.query.timeDimensions) == null ? void 0 : u[0]) == null ? void 0 : c.dateRange);
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(Yt, { label: "Trend", children: ({ id: d, labelId: m }) => /* @__PURE__ */ l(
      Ot,
      {
        labelId: m,
        kind: "granularity",
        value: o,
        onChange: (f) => r({
          sparkline: f === void 0 ? void 0 : { ...a, granularity: f }
        }),
        renderFixed: (f, p) => /* @__PURE__ */ l(
          rs,
          {
            id: d,
            value: f,
            onChange: p,
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
function Yt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function dv({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var ie, se, V, I;
  const { meta: a } = je(), { locale: i } = Ie(), o = rt(), { chart: s } = e, u = s.family, c = o.require(u), d = c.queryless ?? !1, m = c.enforcesAxisUnit, f = ms(e), p = b.useMemo(() => Bn(i == null ? void 0 : i.units), [i == null ? void 0 : i.units]), g = b.useCallback(
    (S) => S && (i == null ? void 0 : i.unitSystem) === "imperial" && p[S] ? p[S].imperialUnit : S,
    [i == null ? void 0 : i.unitSystem, p]
  ), y = b.useMemo(() => Wp(u, o), [u, o]), k = b.useMemo(() => gs(e, o), [e, o]), w = b.useMemo(() => new Map(y.map((S) => [S.id, S])), [y]), [C, x] = b.useState(void 0), N = b.useMemo(
    () => tv(a, e, C, o),
    [a, e, C, o]
  ), M = b.useMemo(() => Object.values(k).flat(), [k]), P = b.useCallback(
    (S) => {
      x(S), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), A = b.useMemo(
    () => {
      var S;
      return N.viewLocked ? [N.viewLocked] : [(S = N.sourceCube) == null ? void 0 : S.name, ...N.relatedCubes.map((O) => O.name)].filter(
        Boolean
      );
    },
    [N]
  ), R = b.useMemo(
    () => Object.values(k).every((S) => S.length === 0),
    [k]
  ), $ = b.useMemo(() => {
    const S = (k.y ?? [])[0], O = S ? $e(a, S) : void 0;
    return {
      leftKey: S ? hs(O) : void 0,
      leftLabel: S ? fv(O, g(O == null ? void 0 : O.unit)) : void 0
    };
  }, [k, a, g]), L = b.useCallback(
    (S, O) => {
      var q;
      if (O) {
        if (!Zg(N, O.cube))
          return "Clear the current fields to use a different dataset.";
        if (O.memberType === "measure" && N.measureSource && O.cube !== N.measureSource)
          return `Measures come from one table (${((q = N.sourceCube) == null ? void 0 : q.title) ?? N.measureSource}). Remove them to switch.`;
        if (m && S === "y" && O.memberType === "measure") {
          const { leftKey: F, leftLabel: B } = $;
          return Gp(O, F, B);
        }
      }
    },
    [N, $, m]
  ), E = $.leftLabel, D = b.useMemo(() => {
    var O;
    const S = {};
    if (u === "bar" || u === "line" || u === "area") {
      const q = (O = s.mapping) == null ? void 0 : O.series;
      if (q && q.mode === "measures") {
        const F = q.members.map((J) => {
          var ue, ye;
          return { key: J, colorToken: (ye = (ue = q.meta) == null ? void 0 : ue[J]) == null ? void 0 : ye.colorToken };
        }), B = So(F, s.colors);
        q.members.forEach((J, ue) => {
          S[J] = B[ue];
        });
      }
    }
    return S;
  }, [u, s.mapping, s.colors]), _ = b.useCallback(
    (S, O, q) => {
      const F = $e(a, O);
      if (L(S, F)) return;
      let B = q === "geoPoint" && (F != null && F.latMember) && F.lngMember ? zt(
        zt(e, u, "lat", F.latMember, "numberDimension", o),
        u,
        "lng",
        F.lngMember,
        "numberDimension",
        o
      ) : zt(e, u, S, O, q, o);
      const J = c.canonicalTimeWell;
      if (J && S !== J && (k[J] ?? []).length === 0) {
        const ue = Np(a, F == null ? void 0 : F.cube);
        ue && ue.name !== O && !L(J, ue) && (B = zt(B, u, J, ue.name, "time", o));
      }
      t(B);
    },
    [L, a, t, e, u, o, c, k]
  ), j = u === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : c.zones, K = j.left.map((S) => w.get(S)).filter(Boolean), W = j.bottom.map((S) => w.get(S)).filter(Boolean), Z = (ie = k.color) == null ? void 0 : ie[0], H = ((se = k.y) == null ? void 0 : se.length) ?? 0, X = Z && H > 1 ? `${H} measures × ${((V = $e(a, Z)) == null ? void 0 : V.label) ?? "this split"} — one series per measure per value.` : void 0, ae = c.hasLegend, ce = (k.y ?? [])[0], z = (S) => {
    var F, B, J, ue;
    if (!S) return;
    const O = (F = s.mapping) == null ? void 0 : F.series;
    return (O && O.mode === "measures" ? (J = (B = O.meta) == null ? void 0 : B[S]) == null ? void 0 : J.label : void 0) ?? ((ue = $e(a, S)) == null ? void 0 : ue.label);
  }, G = (S) => {
    var q, F, B, J;
    const O = (ue, ye) => ye ? /* @__PURE__ */ l(vg, { spec: e, update: t, axis: ue, title: "Title", auto: z(ye) }) : null;
    switch (S) {
      case "y":
        return O("y", ce);
      // the single value axis
      case "x":
        return O("x", (F = (q = s.mapping) == null ? void 0 : q.category) == null ? void 0 : F.member);
      case "sy":
        return O("y", (B = k.sy) == null ? void 0 : B[0]);
      // scatter Y axis
      case "sx":
        return O("x", (J = k.sx) == null ? void 0 : J[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ne = (S, O) => /* @__PURE__ */ l(
    lv,
    {
      spec: e,
      update: t,
      well: S,
      placed: k[S.id] ?? [],
      allPlaced: M,
      optionFor: (q) => $e(a, q),
      colorFor: (q) => D[q],
      scope: N,
      blockReason: (q) => L(S.id, q),
      onAdd: (q, F) => _(S.id, q, F),
      badge: S.id === "y" ? E : void 0,
      orientation: O,
      note: S.id === "color" ? X : void 0,
      control: G(S.id)
    },
    S.id
  ), oe = () => {
    var F;
    const S = w.get("value"), O = (k.value ?? []).length > 0, q = s.familyOptions ?? {};
    return /* @__PURE__ */ v(fe, { children: [
      /* @__PURE__ */ v("div", { className: "cv-edit-kpi-value", children: [
        S ? ne(S, "vertical") : null,
        O ? /* @__PURE__ */ l(
          cr,
          {
            label: "Time, range & display",
            summary: q.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(cv, { spec: e, update: t })
          }
        ) : null
      ] }),
      O ? /* @__PURE__ */ v(fe, { children: [
        /* @__PURE__ */ l(
          cr,
          {
            label: "Comparison",
            summary: q.comparison === void 0 ? "None" : q.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(uv, { spec: e, update: t })
          }
        ),
        /* @__PURE__ */ l(
          cr,
          {
            label: "Trend",
            summary: yp(
              (F = q.sparkline) == null ? void 0 : F.granularity
            ),
            children: /* @__PURE__ */ l(mv, { spec: e, update: t })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !R || d ? /* @__PURE__ */ l($g, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          pg,
          {
            currentName: N.viewLocked ?? ((I = N.sourceCube) == null ? void 0 : I.name),
            hasFields: M.length > 0,
            onSelect: P
          }
        ),
        /* @__PURE__ */ l(fg, { spec: e, update: t, cube: f, scopeCubes: A, scope: N })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-body", children: [
      K.length > 0 ? /* @__PURE__ */ l("div", { className: T("cv-edit-sidebar", c.sidebarWidthClass), children: u === "kpi" ? oe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        K.map((S) => ne(S, "vertical"))
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ v("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Pg, { spec: e, update: t, empty: R && !d })
        ] }),
        W.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-edit-overlay-bottom", children: [
          W.map((S) => ne(S, "horizontal")),
          ae && !R ? /* @__PURE__ */ l(bg, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function fv(e, t) {
  const n = ps(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ls(e, t) {
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
  const t = Ji.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function hv({
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
  const s = Ls((f) => t(f), n), u = r.spec, c = r.issues, d = c.length === 0, m = b.useCallback(
    (f) => {
      const p = ur(f);
      a({ spec: f, issues: p }), p.length === 0 && (o(f), s(f));
    },
    [s]
  );
  return { draft: u, issues: c, valid: d, committed: i, update: m };
}
const pv = () => {
};
function gv({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = rt(), { draft: s, issues: u, valid: c, committed: d, update: m } = hv({
    spec: e,
    onChange: t ?? pv,
    debounceMs: r
  }), f = o.get(s.chart.family), p = (f == null ? void 0 : f.queryless) ?? !1, g = d, y = (A) => {
    var R, $, L;
    return (((R = A == null ? void 0 : A.measures) == null ? void 0 : R.length) ?? 0) > 0 || ((($ = A == null ? void 0 : A.dimensions) == null ? void 0 : $.length) ?? 0) > 0 || (((L = A == null ? void 0 : A.timeDimensions) == null ? void 0 : L.some((E) => typeof E.granularity == "string")) ?? !1);
  }, k = (A) => {
    var R;
    return (((R = A == null ? void 0 : A.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, w = (f == null ? void 0 : f.requiresMeasure) ?? s.chart.family !== "table", C = p || y(s.query) && y(g.query) && (!w || k(s.query) && k(g.query)), x = w && !k(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = b.useCallback(
    (A) => {
      m({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...A }
        }
      });
    },
    [s, m]
  ), M = C ? /* @__PURE__ */ l(
    ha,
    {
      query: g.query ?? {},
      chart: g.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: x }) }), P = n ? /* @__PURE__ */ v(U, { size: "sm", disabled: !c, onClick: () => n(d), children: [
    /* @__PURE__ */ l(Vi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: T("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        c ? null : /* @__PURE__ */ v(En, { variant: "destructive", children: [
          /* @__PURE__ */ l(Br, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(In, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Fn, { children: /* @__PURE__ */ v("ul", { className: "cv-chart-editor-issues", children: [
            u.slice(0, 3).map((A, R) => /* @__PURE__ */ v("li", { children: [
              A.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: A.path }) : null,
              " ",
              A.message
            ] }, R)),
            u.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              u.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Yn, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(dv, { spec: s, update: m, toolbar: P, children: M }) }) })
      ]
    }
  );
}
function vv({
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
  onSave: d,
  saveDisabled: m,
  className: f
}) {
  const p = a || i, [g, y] = b.useState(!1);
  b.useEffect(() => {
    if (!g) return;
    const w = setTimeout(() => y(!1), 1600);
    return () => clearTimeout(w);
  }, [g]), b.useEffect(() => {
    m || y(!1);
  }, [m]);
  const k = () => {
    d == null || d(), y(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: T("cv-editor-toolbar", f),
      children: [
        /* @__PURE__ */ l(
          pe,
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
            /* @__PURE__ */ l(Li, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Kr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Sl, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Ml, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-actions", children: [
          p ? /* @__PURE__ */ v(fe, { children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(xl, {})
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
                children: /* @__PURE__ */ l(Tl, {})
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
                /* @__PURE__ */ l(Ol, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ v(
            U,
            {
              size: "sm",
              onClick: k,
              disabled: m,
              "aria-live": "polite",
              className: T(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                g && "cv-editor-toolbar-save--saved"
              ),
              children: [
                g ? /* @__PURE__ */ l(gt, {}) : /* @__PURE__ */ l(Vi, {}),
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
const Es = "lg", Is = 12;
function bv(e, t) {
  const n = t[Es];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, u) => Math.max(s, u.x + u.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function yv(e, t) {
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
const kv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function wv(e, t, n, r = Is) {
  const a = kv[n], i = Math.min(a.w, r), o = e.reduce((s, u) => Math.max(s, u.y + u.h), 0);
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
function Fs(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Is) {
  const a = wv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Cv(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Fs(e, a);
}
function Nv(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Sv(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Mv = 12, xv = 900, Tv = 0.4;
function Ov(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Rv({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, u] = Po(), c = e.grid ?? {}, d = c.cols ?? Mv, m = c.rowHeight ?? 40, f = c.margin ?? [12, 12], p = c.containerPadding ?? [0, 0], g = Math.max(Tv, Math.min(1, u / xv)), y = Math.round(g / 0.05) * 0.05, k = Math.max(8, Math.round(m * y)), w = [
    Math.round(f[0] * y),
    Math.round(f[1] * y)
  ], C = [
    Math.round(p[0] * y),
    Math.round(p[1] * y)
  ], x = b.useMemo(
    () => ({ [Es]: Ov(e.layout) }),
    [e.layout]
  ), N = b.useMemo(
    () => new Map(e.widgets.map(($) => [$.id, $])),
    [e.widgets]
  ), M = b.useRef(o);
  b.useEffect(() => {
    M.current = o;
  }, [o]);
  const P = b.useRef(e.layout);
  b.useEffect(() => {
    P.current = e.layout;
  }, [e.layout]);
  const A = b.useRef(null), R = b.useCallback(
    ($, L) => {
      const D = bv($, L).map((_) => ({ ..._ }));
      _v(P.current, D) || M.current(D);
    },
    []
  );
  return /* @__PURE__ */ l(fa, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: u > 0 ? /* @__PURE__ */ l(
    Wi,
    {
      width: u,
      layouts: x,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: k,
      margin: w,
      containerPadding: C,
      dragConfig: { enabled: !0, handle: `.${Tn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: R,
      children: e.layout.map(($) => {
        const L = N.get($.i);
        if (!L) return null;
        const E = L.id === t;
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
              "aria-pressed": E,
              onPointerDown: (D) => {
                A.current = { x: D.clientX, y: D.clientY };
              },
              onClick: (D) => {
                const _ = A.current;
                _ && Math.hypot(D.clientX - _.x, D.clientY - _.y) > 5 || n(L.id);
              },
              onKeyDown: (D) => {
                (D.key === "Enter" || D.key === " ") && (D.preventDefault(), n(L.id));
              },
              className: T(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                E && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(_r, { widget: L, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: T(Tn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ v("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), r(L.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Rl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), a(L.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(_l, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), i(L.id);
                      },
                      className: T("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Rt, {})
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
  ) : null }) });
}
function _v(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Av = b.memo(Rv);
function Dv(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Lv({
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
  const a = Bi({
    extensions: [Ki],
    editable: !0,
    content: Dv(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: T($o, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(me, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Ev, { editor: a }),
    /* @__PURE__ */ l(qi, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function Ke({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: T("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function Ev({ editor: e }) {
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
          Ke,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Al, {})
          }
        ),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Dl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Ll, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(El, {})
          }
        ),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Il, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Fl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Pl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ke,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l($l, {})
          }
        )
      ]
    }
  );
}
const Iv = Hr(
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
function Fv({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: T(Iv({ variant: t }), e), ...n });
}
function Pv({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = je(), u = b.useMemo(() => Gn(o), [o]), c = u.filter((f) => f.type === "cube"), d = u.filter((f) => f.type === "view"), m = u.find((f) => f.name === e);
  return /* @__PURE__ */ v(xe, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Oe, { id: a, className: i, children: /* @__PURE__ */ l(Te, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(mr, { option: m }) : void 0 }) }),
    /* @__PURE__ */ v(Re, { children: [
      d.length > 0 ? /* @__PURE__ */ v(Tr, { children: [
        /* @__PURE__ */ l(Or, { children: "Views" }),
        d.map((f) => /* @__PURE__ */ l(ge, { value: f.name, children: /* @__PURE__ */ l(mr, { option: f }) }, f.name))
      ] }) : null,
      c.length > 0 ? /* @__PURE__ */ v(Tr, { children: [
        /* @__PURE__ */ l(Or, { children: "Cubes" }),
        c.map((f) => /* @__PURE__ */ l(ge, { value: f.name, children: /* @__PURE__ */ l(mr, { option: f }) }, f.name))
      ] }) : null
    ] })
  ] });
}
function mr({ option: e }) {
  const t = e.type === "view" ? Ur : zi;
  return /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Fv, { variant: "secondary", className: "cv-cube-badge", children: e.type })
  ] });
}
const $v = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function zv(e) {
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
function Vv({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(zv(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      me,
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
              /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(Te, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Re, { children: t.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(me, { label: "Control", children: /* @__PURE__ */ v(xe, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(Te, {}) }),
      /* @__PURE__ */ l(Re, { children: ac.options.map((s) => /* @__PURE__ */ l(ge, { value: s, children: $v[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(jv, { control: r, onChange: a, variables: t })
  ] });
}
function jv({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Wv, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(qv, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Kv, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Uv, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Hv, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(Gv, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Wv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(fe, { children: [
    /* @__PURE__ */ l(
      me,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          Bv,
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
function Bv({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const u = new Set(a);
    u.has(s) ? u.delete(s) : u.add(s), t(fn.filter((c) => u.has(c.value)).map((c) => c.value));
  }, o = a.size === 0 ? "Default set" : a.size === fn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ae, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(tt, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(De, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: fn.map((s) => {
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
                className: T("cv-preset-select-check", u && "cv-preset-select-check--checked"),
                children: u ? /* @__PURE__ */ l(gt, { className: "cv-ed-icon-xs" }) : null
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
function qv({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const u = new Set(r);
    u.has(s) ? u.delete(s) : u.add(s);
    const c = Qe.options.filter((d) => u.has(d));
    t({ ...e, options: c.length > 0 ? c : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ v(fe, { children: [
    /* @__PURE__ */ l(
      me,
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
              /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(Te, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Re, { children: [
                /* @__PURE__ */ l(ge, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ge, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(me, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Qe.options.map((s) => {
      const u = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": u,
          onClick: () => a(s),
          className: T("cv-granularity-chip", u && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Kv({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (u, c) => c === i ? { value: o.value ?? String(u.value), label: o.label ?? u.label } : u
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ v(fe, { children: [
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
      me,
      {
        label: "Options",
        action: /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Nt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ v("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            pe,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            pe,
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
              className: T("cv-ed-btn-8", "cv-ed-muted"),
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
function Uv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(fe, { children: [
    /* @__PURE__ */ l(me, { label: "From", children: /* @__PURE__ */ v(
      xe,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(Te, {}) }),
          /* @__PURE__ */ v(Re, { children: [
            /* @__PURE__ */ l(ge, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ l(ge, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ l(ge, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      me,
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
          Pv,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Hv({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(me, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    pe,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function Gv({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(me, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    pe,
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
  return /* @__PURE__ */ v(fe, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function Yv(e) {
  return { schemaVersion: kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Qv(e) {
  const t = {
    schemaVersion: kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Jv(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function ki({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: T("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      me,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          pe,
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
      /* @__PURE__ */ l(fa, { spec: Yv(t), children: /* @__PURE__ */ l(ng, { createVariable: o, children: /* @__PURE__ */ l("div", { className: T(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        gv,
        {
          fill: a,
          spec: Qv(e),
          onChange: (s) => n(Jv(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Lv, { widget: e, onChange: n }) : /* @__PURE__ */ l(Vv, { widget: e, variables: t, onChange: n })
  ] });
}
function Xv({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const u = /* @__PURE__ */ v(fe, { children: [
    r ? /* @__PURE__ */ l(
      rn,
      {
        className: T("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "section-header",
      className: T("cv-section-header", s),
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
function Zv({
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
  const c = i !== void 0, [d, m] = b.useState(a), f = r ? c ? i : d : !0, p = b.useId(), g = b.useCallback(() => {
    const y = !f;
    c || m(y), o == null || o(y);
  }, [f, c, o]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": f ? "open" : "closed",
      className: T("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          Xv,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: f,
            onToggle: g,
            regionId: p
          }
        ),
        f ? /* @__PURE__ */ l("div", { id: p, "data-slot": "section-body", className: "cv-section-body", children: u }) : null
      ]
    }
  );
}
function eb(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function tb(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function nb(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function rb(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function ab(e, t) {
  switch (e) {
    case "chart":
      return tb(t);
    case "text":
      return nb(t);
    case "input":
      return rb(t);
  }
}
function ib(e) {
  return { name: e, type: "string" };
}
function ob(e) {
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
const wi = {
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
function sb({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = b.useRef(0), a = () => {
    if (n) return n();
    let c;
    do
      c = `var_${++r.current}`;
    while (e.some((d) => d.name === c));
    return c;
  }, i = (c, d) => {
    t(e.map((m, f) => f === c ? lb(m, d) : m));
  }, o = (c) => t(e.filter((d, m) => m !== c)), s = () => t([...e, ib(a())]), u = (c, d) => {
    const m = c + d;
    if (m < 0 || m >= e.length) return;
    const f = e.slice();
    [f[c], f[m]] = [f[m], f[c]], t(f);
  };
  return /* @__PURE__ */ l(
    Zv,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(Nt, {}),
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
          /* @__PURE__ */ l(Nt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((c, d) => /* @__PURE__ */ l(
        cb,
        {
          decl: c,
          index: d,
          total: e.length,
          duplicate: e.some((m, f) => f !== d && m.name === c.name && c.name !== ""),
          onChange: (m) => i(d, m),
          onRemove: () => o(d),
          onMove: (m) => u(d, m)
        },
        d
      )) })
    }
  );
}
function lb(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = ob(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function cb({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, u] = b.useState(!0), c = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, d = b.useId();
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
              onClick: () => u((m) => !m),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(tt, {}) : /* @__PURE__ */ l(rn, {})
            }
          ),
          /* @__PURE__ */ l(
            pe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": c ? !0 : void 0,
              onChange: (m) => a({ name: m.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: wi[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: T("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(jr, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: T("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Wr, {})
              }
            ),
            /* @__PURE__ */ l(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: T("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Rt, {})
              }
            )
          ] })
        ] }),
        c ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: c }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(me, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ v(xe, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ l(Oe, { children: /* @__PURE__ */ l(Te, {}) }),
            /* @__PURE__ */ l(Re, { children: Yi.options.map((m) => /* @__PURE__ */ l(ge, { value: m, children: wi[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(
            me,
            {
              label: "Label",
              htmlFor: d,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                pe,
                {
                  id: d,
                  value: e.label ?? "",
                  placeholder: e.name,
                  onChange: (m) => a({ label: m.target.value })
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
              onChange: (m) => a({ array: m })
            }
          ),
          /* @__PURE__ */ l(ub, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function ub({
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
    return /* @__PURE__ */ l(me, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      pe,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : mb(e.default);
  return /* @__PURE__ */ l(me, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    pe,
    {
      id: n,
      value: a,
      placeholder: db(e.type),
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
function mb(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function db(e) {
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
function ey({
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
  canRedo: d,
  onDiscard: m,
  families: f,
  className: p
}) {
  var O, q;
  const [g, y] = b.useState(e), [k, w] = b.useState(e);
  b.useEffect(() => {
    y(e), w(e);
  }, [e]);
  const [C, x] = b.useState(null), N = b.useRef(0), [M, P] = b.useState(null), A = b.useRef(C), R = b.useRef(M), $ = b.useRef(g);
  b.useEffect(() => {
    A.current = C, R.current = M, $.current = g;
  });
  const L = b.useRef(null);
  L.current === null && (L.current = i ?? eb());
  const E = i ?? L.current, D = Ls(
    (F) => r == null ? void 0 : r(F),
    o
  ), _ = b.useCallback(
    (F) => {
      N.current = Date.now(), y((B) => {
        const J = F(B);
        return D(J), J;
      });
    },
    [D]
  ), j = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === j.current) return;
    const F = 500;
    let B = null;
    const J = () => {
      var de;
      const ue = Date.now() - N.current;
      if (ue < F) {
        B = setTimeout(J, F - ue);
        return;
      }
      j.current = t;
      const ye = /* @__PURE__ */ new Set();
      ((de = R.current) == null ? void 0 : de.kind) === "widget" && ye.add(R.current.id), A.current && ye.add(A.current);
      const Y = pb(t, $.current, ye);
      y(Y), n == null || n(Y);
    };
    return J(), () => {
      B && clearTimeout(B);
    };
  }, [t]);
  const K = b.useCallback(
    (F) => {
      const B = ab(F, E());
      _((J) => Fs(J, B)), x(B.id), P({ kind: "widget", id: B.id });
    },
    [_, E]
  ), W = b.useCallback((F) => x(F), []), Z = b.useCallback((F) => {
    x(F), P({ kind: "widget", id: F });
  }, []), H = b.useCallback(
    (F) => {
      _((B) => Nv(B, F)), x((B) => B === F ? null : B), P((B) => (B == null ? void 0 : B.kind) === "widget" && B.id === F ? null : B);
    },
    [_]
  ), X = b.useCallback(
    (F) => {
      const B = E();
      _((J) => Cv(J, F, B)), x(B);
    },
    [_, E]
  ), ae = b.useCallback(
    (F) => _((B) => Sv(B, F)),
    [_]
  ), ce = b.useCallback(
    (F) => _((B) => {
      const J = yv(B.layout, F);
      return hb(B.layout, J) ? B : { ...B, layout: J };
    }),
    [_]
  ), z = b.useCallback(
    (F) => _((B) => ({ ...B, name: F || void 0 })),
    [_]
  ), G = b.useCallback(
    (F) => _((B) => ({ ...B, variables: F })),
    [_]
  ), ne = b.useDeferredValue(g), oe = b.useMemo(
    () => br.safeParse(ne),
    [ne]
  ), ie = b.useCallback(() => {
    const F = br.safeParse(g);
    F.success && (a == null || a(F.data), w(g));
  }, [g, a]), se = g !== k, V = (M == null ? void 0 : M.kind) === "widget" ? g.widgets.find((F) => F.id === M.id) ?? null : null;
  b.useEffect(() => {
    (M == null ? void 0 : M.kind) === "widget" && !g.widgets.some((F) => F.id === M.id) && P(null);
  }, [M, g.widgets]);
  const I = b.useCallback(() => P(null), []), S = (M == null ? void 0 : M.kind) === "variables" ? "Dashboard variables" : V ? V.title ?? `${fb(V.type)} widget` : "";
  return /* @__PURE__ */ l(da, { families: f, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((q = (O = g.grid) == null ? void 0 : O.margin) == null ? void 0 : q[0]) ?? 12 },
      className: T("cv-dashboard-editor", p),
      children: [
        /* @__PURE__ */ l(
          vv,
          {
            name: g.name ?? "",
            onNameChange: z,
            onAdd: K,
            onEditVariables: () => P({ kind: "variables" }),
            onUndo: s,
            onRedo: u,
            canUndo: c,
            canRedo: d,
            onDiscard: m,
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
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: M ? null : /* @__PURE__ */ l(
          Av,
          {
            spec: g,
            selectedId: C,
            onSelect: W,
            onEdit: Z,
            onDuplicate: X,
            onDelete: H,
            onLayoutChange: ce
          }
        ) }),
        M ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": S,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ v("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ v("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: I, children: [
                    /* @__PURE__ */ l(qr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: S })
                ] }),
                V ? /* @__PURE__ */ v(
                  U,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => H(V.id),
                    children: [
                      /* @__PURE__ */ l(Rt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(Yn, { label: S, resetKey: g, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: M.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(sb, { variables: g.variables, onChange: G }) }) : (V == null ? void 0 : V.type) === "chart" ? /* @__PURE__ */ l(
                ki,
                {
                  fill: !0,
                  widget: V,
                  variables: g.variables,
                  onChange: ae,
                  onVariablesChange: G
                }
              ) : V ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                ki,
                {
                  widget: V,
                  variables: g.variables,
                  onChange: ae,
                  onVariablesChange: G
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function fb(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function hb(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function pb(e, t, n) {
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
  hu as AreaChartFamily,
  Yc as AreaFamilyOptionsSchema,
  Zl as AxesOptionsSchema,
  La as AxisOptionsSchema,
  Bb as BUILTIN_CHART_FAMILIES,
  Be as BUILTIN_DEFAULTS,
  We as BUILTIN_FAMILY_OPTION_SCHEMAS,
  du as BarChartFamily,
  Hc as BarFamilyOptionsSchema,
  Es as CANONICAL_BREAKPOINT,
  Je as ChartColorTokenSchema,
  dv as ChartEditOverlay,
  gv as ChartEditor,
  Gl as ChartFamilySchema,
  ea as ChartInteractionProvider,
  Gi as ChartOptionsSchema,
  No as ChartRenderer,
  Ji as ChartSpecSchema,
  nc as ChartTransformSchema,
  Zb as ChartView,
  oc as ChartWidgetSchema,
  ec as ColorAssignmentSchema,
  eu as CondFormatRuleSchema,
  ha as CubeChart,
  Pf as CubeChartSpec,
  Hi as CubeQuerySchema,
  qn as CubeVizContext,
  Qb as CubeVizProvider,
  Vn as DEFAULT_COLOR_RAMP,
  Is as DEFAULT_COLS,
  Ka as DEFAULT_MARK_THEME,
  mn as DEFAULT_TRANSFORM_WINDOW,
  xr as DEFAULT_UNIT_CONVERSIONS,
  Tn as DRAG_HANDLE_CLASS,
  Xb as Dashboard,
  ey as DashboardEditor,
  fa as DashboardProvider,
  br as DashboardSpecSchema,
  gr as DateRangeSchema,
  ru as EMPTY_FAMILY_DEFAULT,
  Pa as EM_DASH,
  Av as EditorCanvas,
  vv as EditorToolbar,
  da as FamilyRegistryOverride,
  og as FilterBuilder,
  ql as FilterOperatorSchema,
  Yl as FormatKindSchema,
  Gr as FormatOptionsSchema,
  Ic as GRANULARITY_PATTERN,
  Qe as GranularitySchema,
  mc as GridConfigSchema,
  Mu as HeatmapChartFamily,
  nu as HeatmapFamilyOptionsSchema,
  ac as InputControlKindSchema,
  ic as InputControlSchema,
  Vv as InputWidgetEditor,
  lc as InputWidgetSchema,
  rh as InputWidgetView,
  Ou as KpiFamily,
  Xc as KpiFamilyOptionsSchema,
  uc as LayoutItemSchema,
  Kl as LeafFilterSchema,
  Jl as LegendOptionsSchema,
  fu as LineChartFamily,
  Gc as LineFamilyOptionsSchema,
  le as MemberSchema,
  Aa as OrderDirSchema,
  Hl as OrderSpecSchema,
  vu as PieChartFamily,
  Qc as PieFamilyOptionsSchema,
  vr as QueryFilterSchema,
  Pn as ReferenceLineOptSchema,
  _r as RenderWidget,
  kt as SCHEMA_VERSION,
  Bl as ScalarSchema,
  yu as ScatterChartFamily,
  Jc as ScatterFamilyOptionsSchema,
  Ql as SeriesMappingSchema,
  Da as SeriesMetaSchema,
  Xi as SpecSchema,
  Zc as TableColumnOptSchema,
  ju as TableFamily,
  tu as TableFamilyOptionsSchema,
  Lv as TextWidgetEditor,
  sc as TextWidgetSchema,
  zf as TextWidgetView,
  Ul as TimeDimensionSchema,
  rc as TipTapDocSchema,
  Xl as TooltipOptionsSchema,
  tc as TransformKindSchema,
  Cn as VarRefSchema,
  dc as VariableDeclSchema,
  Yi as VariableTypeSchema,
  Ui as VariableValueSchema,
  sb as VariablesPanel,
  qo as WidgetChrome,
  ki as WidgetEditPanel,
  cc as WidgetSpecSchema,
  Ap as adaptiveGranularity,
  Fs as appendWidget,
  im as areaChartFamily,
  Ha as assignColors,
  bf as axisKey,
  rm as barChartFamily,
  ua as buildFamilyRegistry,
  Yb as builtinCharts,
  Ve as builtinFamilyDescriptors,
  zn as builtinFamilyRegistry,
  Ac as createCubeClient,
  eb as createIdFactory,
  To as createQueryResolver,
  Do as createUnitsFormatter,
  Pm as createVariableStore,
  Pc as datePattern,
  yr as deepMerge,
  ca as defaultChartFamilies,
  ob as defaultForType,
  Jr as defaultFormatter,
  Dc as fetchMeta,
  Hb as formatCategory,
  Kt as formatDateValue,
  Cp as geoPointId,
  Oo as granularitiesForSpan,
  _o as granularityOptionsFor,
  lm as heatmapChartFamily,
  xt as isEmptyValue,
  Ce as isVarRef,
  cm as kpiChartFamily,
  am as lineChartFamily,
  _c as loadSpec,
  Qr as looksLikeIsoDate,
  Xr as makeChartFormat,
  Ub as makeDateFormatter,
  Gb as makeFormatter,
  yv as mergeLayout,
  Bn as mergeUnitConversions,
  tb as newChartWidget,
  rb as newInputWidget,
  nb as newTextWidget,
  ib as newVariable,
  ab as newWidget,
  Mo as normalize,
  bv as pickCanonicalLayout,
  om as pieChartFamily,
  wv as placeNewItem,
  kf as quantityLabel,
  Ro as rangeSpanDays,
  Nv as removeWidget,
  Sv as replaceWidget,
  Mf as resolveChart,
  Co as resolveMarkTheme,
  dm as resolveOptions,
  au as resolveOptionsWith,
  xo as resolveQuery,
  Am as resolveRelativeDateRange,
  So as resolveSeriesColors,
  Lm as resolveValue,
  qb as safeLoadSpec,
  sm as scatterChartFamily,
  um as tableChartFamily,
  Zi as toDate,
  Cm as toResultAnnotation,
  hv as useChartEditorState,
  ro as useChartInteractions,
  Po as useContainerWidth,
  je as useCubeMeta,
  Io as useCubeQuery,
  Ie as useCubeVizContext,
  Fo as useDashboard,
  Ls as useDebouncedCallback,
  rt as useFamilyRegistry,
  Jb as useFormatter,
  ar as useNormalizedSeries,
  on as useOptionalDashboard,
  Kb as validateSpec
};
//# sourceMappingURL=index.js.map
