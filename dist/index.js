var Vs = Object.defineProperty;
var js = (e, t, n) => t in e ? Vs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Jn = (e, t, n) => js(e, typeof t != "symbol" ? t + "" : t, n);
import { z as p } from "zod";
import { jsx as l, jsxs as v, Fragment as de } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as re, createContext as Mi, useContext as jr, useState as pt, useCallback as Ye, useEffect as an, useRef as lt, createElement as Ws, useSyncExternalStore as Ti, useId as Bs, Component as Ks } from "react";
import { ruleX as Ri, ruleY as Oi, text as Xt, colorLegend as Wr, group as qs, stack as _i, barX as Aa, barY as Da, lineX as Us, lineY as En, defineChart as tt, areaY as fr, dot as Ai, cell as Hs } from "@tanstack/charts";
import { crosshair as Di } from "@tanstack/charts/crosshair";
import { scaleBand as Gs } from "@tanstack/charts/scales/band";
import { scaleLinear as kn } from "@tanstack/charts/scales/linear";
import { scalePoint as Ys } from "@tanstack/charts/scales/point";
import { Chart as Qs } from "@tanstack/charts/react/core";
import { motion as Li } from "@tanstack/charts/motion";
import { tooltip as Br } from "@tanstack/charts/tooltip";
import { d3Curve as Xn } from "@tanstack/charts/d3/shape";
import { brushX as Js } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Xs } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Zs, scaleLog as La, scaleSqrt as el } from "d3-scale";
import { curveNatural as tl, curveStepAfter as nl, curveMonotoneX as rl } from "d3-shape";
import { format as he, isValid as Pt, parseISO as wn, subDays as ye, startOfWeek as Cn, endOfWeek as Nn, startOfMonth as ct, endOfMonth as qt, startOfQuarter as ut, endOfQuarter as Ut, startOfYear as mt, endOfYear as Ht, subWeeks as hr, subMonths as dt, subQuarters as ft, subYears as ht, differenceInCalendarDays as al, parse as Ei } from "date-fns";
import { clsx as il } from "clsx";
import * as Ce from "@radix-ui/react-select";
import { Minus as Ii, ArrowUp as Kr, ArrowDown as qr, CalendarRange as Fi, ChevronsUpDown as ol, AreaChart as sl, BarChart3 as Pi, Grid3X3 as ll, Table as cl, Gauge as ul, ScatterChart as ml, PieChart as dl, LineChart as fl, AlertCircle as Ur, ChevronLeft as Hr, ChevronRight as on, ChevronDown as nt, Check as Dt, ChevronUp as hl, CalendarIcon as $i, MoreVertical as pl, RefreshCw as gl, Image as vl, Sheet as bl, Search as yl, ListChecks as kl, Table2 as zi, Database as Vi, Layers as ji, Calendar as wl, Type as Wi, Hash as Ea, MapPin as Cl, Variable as Nl, Plus as xt, Trash2 as Lt, ListFilter as Sl, EyeOff as xl, Eye as Ml, AlertTriangle as Tl, GripVertical as Rl, X as Ia, Save as Bi, SlidersHorizontal as Ol, Braces as _l, Undo2 as Al, Redo2 as Dl, RotateCcw as Ll, Pencil as El, Copy as Il, Bold as Fl, Italic as Pl, Strikethrough as $l, Heading1 as zl, Heading2 as Vl, List as jl, ListOrdered as Wl, Quote as Bl, Box as Kl } from "lucide-react";
import * as Sn from "@radix-ui/react-popover";
import { cva as Gr } from "class-variance-authority";
import ql from "@cubejs-client/core";
import { DayPicker as Ul, useDayPicker as Hl } from "react-day-picker";
import { pie as Gl, radialArc as pr, radialText as Zn, polar as Ki } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as qi } from "react-grid-layout";
import { useEditor as Ui, EditorContent as Hi } from "@tiptap/react";
import Gi from "@tiptap/starter-kit";
const wt = 5, xn = p.object({ var: p.string().min(1) }).strict();
function we(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Mn = (e) => p.union([e, xn]), Yl = p.union([p.string(), p.number(), p.boolean()]), Je = p.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Mt = "auto", Ql = p.union([Je, p.literal(Mt)]), gr = p.union([p.tuple([p.string(), p.string()]), p.string()]), Yi = p.union([
  p.string(),
  p.number(),
  p.boolean(),
  p.tuple([p.string(), p.string()]),
  // absolute date range
  p.array(p.string()),
  p.array(p.number())
]), ce = p.string().min(1), Jl = p.enum([
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
]), Xl = p.object({
  member: ce,
  operator: Jl,
  values: p.array(p.union([Yl, xn])).optional()
}).strict(), vr = p.lazy(
  () => p.union([
    Xl,
    p.object({ and: p.array(vr) }).strict(),
    p.object({ or: p.array(vr) }).strict()
  ])
), Zl = p.object({
  dimension: ce,
  granularity: Mn(Ql).optional(),
  dateRange: Mn(gr).optional(),
  compareDateRange: p.array(gr).optional()
}).strict(), Fa = p.enum(["asc", "desc"]), ec = p.union([
  p.record(ce, Fa),
  p.array(p.tuple([ce, Fa]))
]), Qi = p.object({
  measures: p.array(ce).optional(),
  dimensions: p.array(ce).optional(),
  timeDimensions: p.array(Zl).optional(),
  filters: p.array(vr).optional(),
  segments: p.array(ce).optional(),
  order: ec.optional(),
  limit: Mn(p.number()).optional(),
  offset: Mn(p.number()).optional(),
  total: p.boolean().optional(),
  timezone: p.string().optional()
}).strict(), tc = p.string().min(1), iy = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Xe = p.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), nc = p.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Yr = p.object({
  kind: nc.optional(),
  decimals: p.number().optional(),
  abbreviate: p.boolean().optional(),
  prefix: p.string().optional(),
  suffix: p.string().optional(),
  unitSystem: p.enum(["metric", "imperial"]).optional(),
  dateFormat: p.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: p.string().optional()
}).strict(), Pa = p.object({
  label: p.string().optional(),
  colorToken: Xe.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: p.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: p.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), rc = p.object({
  category: p.object({ member: ce }).strict(),
  series: p.union([
    p.object({
      mode: p.literal("measures"),
      members: p.array(ce),
      meta: p.record(ce, Pa).optional()
    }).strict(),
    p.object({
      mode: p.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ce,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: p.array(ce).optional(),
      pivot: ce,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: p.record(ce, Pa).optional()
    }).strict()
  ])
}).strict(), ac = p.object({
  show: p.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: p.enum(["top", "bottom"]).optional()
}).strict(), ic = p.object({
  show: p.boolean().optional(),
  indicator: p.enum(["dot", "line", "dashed"]).optional(),
  showTotal: p.boolean().optional()
}).strict(), $a = p.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: p.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: p.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: p.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: p.tuple([p.number(), p.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Yr.optional()
}).strict(), oc = p.object({
  x: $a.optional(),
  y: $a.optional()
}).strict(), sc = p.object({
  byKey: p.record(p.string(), Xe).optional(),
  ramp: p.array(Xe).optional()
}).strict(), hn = 7, lc = p.enum(["rollingAvg", "cumulative", "percentOfTotal"]), cc = p.object({
  kind: lc,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: p.number().int().min(2).max(90).optional()
}).strict(), Ji = p.object({
  family: tc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: rc.optional(),
  orientation: p.enum(["vertical", "horizontal"]).optional(),
  stackMode: p.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: ac.optional(),
  tooltip: ic.optional(),
  axes: oc.optional(),
  colors: sc.optional(),
  format: Yr.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: cc.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: p.record(p.string(), p.unknown()).optional()
}).strict(), uc = p.object({ type: p.string(), content: p.array(p.unknown()).optional() }).passthrough(), mc = p.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), dc = p.object({
  variable: p.string().min(1),
  control: p.discriminatedUnion("kind", [
    p.object({
      kind: p.literal("dateRange"),
      presets: p.array(p.string()).optional(),
      allowFuture: p.boolean().optional()
    }).strict(),
    p.object({
      kind: p.literal("granularity"),
      options: p.array(Je).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: p.string().optional()
    }).strict(),
    p.object({
      kind: p.literal("select"),
      options: p.array(p.object({ value: Yi, label: p.string() }).strict()),
      multiple: p.boolean().optional()
    }).strict(),
    p.object({
      kind: p.literal("memberSelect"),
      from: p.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: p.string().optional()
    }).strict(),
    p.object({ kind: p.literal("text"), placeholder: p.string().optional() }).strict(),
    p.object({
      kind: p.literal("number"),
      min: p.number().optional(),
      max: p.number().optional(),
      step: p.number().optional()
    }).strict(),
    p.object({ kind: p.literal("toggle") }).strict()
  ])
}).strict(), Qr = {
  id: p.string().min(1),
  title: p.string().optional()
}, fc = p.object({ ...Qr, type: p.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), hc = p.object({ ...Qr, type: p.literal("text"), doc: uc }).strict(), pc = p.object({ ...Qr, type: p.literal("input"), control: dc }).strict(), gc = p.discriminatedUnion("type", [
  fc,
  hc,
  pc
]), vc = p.object({
  i: p.string(),
  x: p.number(),
  y: p.number(),
  w: p.number(),
  h: p.number(),
  minW: p.number().optional(),
  minH: p.number().optional(),
  static: p.boolean().optional()
}).strict(), bc = p.object({
  cols: p.number().optional(),
  rowHeight: p.number().optional(),
  margin: p.tuple([p.number(), p.number()]).optional(),
  containerPadding: p.tuple([p.number(), p.number()]).optional()
}).strict(), Xi = p.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), yc = p.object({
  name: p.string().min(1),
  type: Xi,
  label: p.string().optional(),
  array: p.boolean().optional(),
  default: Yi.optional()
}).strict(), Zi = {
  schemaVersion: p.literal(wt),
  id: p.string().min(1),
  name: p.string().optional(),
  description: p.string().optional(),
  createdAt: p.string().optional(),
  updatedAt: p.string().optional()
}, eo = p.object({ ...Zi, kind: p.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), br = p.object({
  ...Zi,
  kind: p.literal("dashboard"),
  variables: p.array(yc),
  widgets: p.array(gc),
  layout: p.array(vc),
  grid: bc.optional()
}).strict(), to = p.discriminatedUnion("kind", [eo, br]);
function X(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function je(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function kc(e) {
  if (!X(e.axes)) return;
  const t = je(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function wc(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!X(a)) continue;
    const i = je(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Cc(e) {
  if (!X(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => X(n) ? je(n, "side") ?? {} : n
  ));
}
function Nc(e) {
  const t = X(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(X) : [];
  e.family = n.some((o) => o.render === "bar") ? "bar" : "line";
  const r = X(e.mapping) ? e.mapping : void 0, a = r && X(r.series) ? r.series : void 0, i = (a == null ? void 0 : a.mode) === "measures" && Array.isArray(a.members) ? a.members.filter((o) => typeof o == "string") : [];
  if (a && i.length > 0) {
    const o = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (o[s.member] = { colorToken: s.colorToken });
    if (Object.keys(o).length > 0) {
      const s = X(a.meta) ? a.meta : {};
      a.meta = { ...o, ...s };
    }
  }
  e.familyOptions = {};
}
function za(e) {
  X(e) && (e.family === "combo" && Nc(e), kc(e), wc(e), Cc(e));
}
function Sc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    za(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && za(n.chart);
  return t;
}
function xc(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!X(a)) continue;
    const i = je(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Mc(e) {
  if (!X(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function Tc(e) {
  if (X(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!X(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = je(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function Rc(e) {
  if (!X(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = je(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Va(e) {
  X(e) && (xc(e), Mc(e), Tc(e), Rc(e));
}
function Oc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Va(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && Va(n.chart);
  return t;
}
const _c = {
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
function Ac(e) {
  if (!X(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = _c[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = je(r, a) ?? {};
  e.familyOptions = r;
}
function Dc(e) {
  if (X(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!X(n) || n.labelHide !== !0) continue;
      const r = je(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function ja(e) {
  X(e) && (Ac(e), Dc(e));
}
function Lc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ja(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && ja(n.chart);
  return t;
}
function Ec(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  let n;
  const r = {};
  for (const [o, s] of Object.entries(t.meta)) {
    if (!X(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = je(s, "curve");
    c && (r[o] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const a = e.family;
  if (n === void 0 || a !== "line" && a !== "area") return;
  const i = X(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function Ic(e) {
  const t = structuredClone(e), n = (r) => {
    X(r) && Ec(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      X(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Fc = {
  1: Sc,
  2: Oc,
  3: Lc,
  4: Ic
};
function Pc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > wt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${wt} — update the library`
    );
  for (; n < wt; ) {
    const r = Fc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return to.parse(t);
}
function oy(e) {
  try {
    return { ok: !0, spec: Pc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function sy(e) {
  return to.parse(e);
}
function $c(e) {
  return ql(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function zc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function O(...e) {
  return il(e);
}
function Vc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: O("cv-skeleton", e), ...t });
}
const jc = Gr(
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
), In = b.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: O(jc({ variant: t }), e),
    ...n
  }
));
In.displayName = "Alert";
const Fn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: O("cv-alert-title", e),
      ...t
    }
  )
);
Fn.displayName = "AlertTitle";
const Pn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: O("cv-alert-description", e),
      ...t
    }
  )
);
Pn.displayName = "AlertDescription";
const Wc = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Bc = "MMM d, yyyy";
function no(e) {
  if (e instanceof Date) return Pt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Pt(r) ? r : null;
  }
  const t = wn(e);
  if (Pt(t)) return t;
  const n = new Date(e);
  return Pt(n) ? n : null;
}
function Jr(e) {
  return /^\d{4}-\d{2}/.test(e) ? Pt(wn(e)) : !1;
}
function Kc(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Wc[t] : Bc;
}
function Gt(e, t, n) {
  const r = no(e);
  return r ? he(r, Kc(t, n)) : String(e);
}
function ly(e, t) {
  return (n) => n == null ? "" : Gt(n, e, t);
}
function cy(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Gt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Gt(e, t.format, t.granularity) : String(e) : Jr(e) ? Gt(e, t.format, t.granularity) : e;
}
const Wa = "—", qc = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Ba(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Uc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of qc)
    if (n >= r) return Ba((e / r).toFixed(t)) + a;
  return Ba(e.toFixed(t));
}
function Hc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Gc(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Uc(e, n.decimals ?? 1) : Hc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function ro(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Yc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || ro(e.value) ? !0 : typeof e.value == "string" ? Jr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Xr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Wa : (ro(t) || typeof t == "string" || typeof t == "number") && Yc(e) ? Gt(t, n, r) : typeof t == "number" ? Gc(t, e) : String(t);
};
function Qc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function uy(e, t) {
  return (n, r) => {
    const a = r ? Qc(r, t) : void 0;
    return Xr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Jc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Xc(e) {
  const t = Je.safeParse(e);
  return t.success ? t.data : void 0;
}
function Zc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Xc(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Zr(e, t, n, r) {
  const a = Zc(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : Zr(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, c = "value") {
      const u = s ? Jc(s, e) : void 0, m = u == null ? void 0 : u.meta;
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
const $n = p.object({
  axis: p.enum(["x", "y"]),
  value: p.number(),
  label: p.string().optional(),
  colorToken: Xe.optional()
}).strict(), ea = p.boolean().optional(), eu = p.object({
  showValueLabels: p.boolean().optional(),
  referenceLines: p.array($n).optional(),
  comparePrevious: ea
}).strict(), ao = p.enum(["linear", "monotone", "step", "natural"]), tu = p.object({
  curve: ao.optional(),
  dots: p.union([p.boolean(), p.literal("active")]).optional(),
  connectNulls: p.boolean().optional(),
  chrome: p.enum(["full", "none"]).optional(),
  referenceLines: p.array($n).optional(),
  showValueLabels: p.boolean().optional(),
  comparePrevious: ea
}).strict(), nu = p.object({
  curve: ao.optional(),
  connectNulls: p.boolean().optional(),
  dots: p.boolean().optional(),
  referenceLines: p.array($n).optional(),
  comparePrevious: ea
}).strict(), ru = p.object({
  innerRadiusPct: p.number().optional(),
  showLabels: p.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: p.object({ value: p.string().optional(), label: p.string().optional() }).strict().optional(),
  maxSlices: p.number().optional()
}).strict(), au = p.object({
  x: ce,
  y: ce,
  size: ce.optional(),
  groupBy: ce.optional(),
  referenceLines: p.array($n).optional()
}).strict(), iu = p.object({
  display: p.enum(["number", "gauge"]).optional(),
  measure: ce,
  comparison: p.object({
    mode: p.enum(["previousPeriod", "value"]),
    value: p.union([ce, p.number()]).optional(),
    showAsPercent: p.boolean().optional(),
    goodDirection: p.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: p.object({
    member: ce.optional(),
    timeDimension: ce.optional(),
    granularity: p.union([Je, xn]).optional(),
    dateRange: p.union([gr, xn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: p.enum(["up", "down"]).optional(),
  gauge: p.object({
    min: p.number().optional(),
    max: p.number(),
    thresholds: p.array(p.object({ at: p.number(), colorToken: Xe }).strict()).optional()
  }).strict().optional()
}).strict(), ou = p.object({
  member: ce,
  label: p.string().optional(),
  format: Yr.optional(),
  align: p.enum(["left", "right", "center"]).optional(),
  width: p.number().optional(),
  hidden: p.boolean().optional()
}).strict(), su = p.object({
  member: ce,
  when: p.object({
    op: p.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: p.number()
  }).strict(),
  colorToken: Xe.optional()
}).strict(), lu = p.object({
  columns: p.array(ou).optional(),
  pageSize: p.number().optional(),
  conditionalFormat: p.array(su).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), cu = p.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Xe.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), Be = {
  bar: eu,
  line: tu,
  area: nu,
  pie: ru,
  scatter: au,
  heatmap: cu,
  kpi: iu,
  table: lu
}, Ke = {
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
function Ka(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function yr(e, t) {
  if (t === void 0) return e;
  if (!Ka(e) || !Ka(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? yr(e[r], a) : a);
  }
  return n;
}
const uu = { envelope: {}, familyOptions: {} };
function mu(e, t) {
  return {
    ...yr({ ...t.envelope }, e),
    familyOptions: yr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const io = {}, qa = () => {
}, du = {
  target: io,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: qa,
  emitPoint: qa
}, Tn = b.createContext(null);
Tn.displayName = "ChartInteractionContext";
function oo() {
  return b.useContext(Tn) ?? du;
}
function ta({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Tn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((f) => {
    const { parent: y, widgetId: k, onRangeSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : y == null || y.emitRange(C);
  }, []), c = b.useCallback((f) => {
    const { parent: y, widgetId: k, onPointSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : y == null || y.emitPoint(C);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), d = i == null ? void 0 : i.target, g = b.useMemo(
    () => d || r ? { ...d, ...r } : io,
    [d, r]
  ), h = b.useMemo(
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
  return /* @__PURE__ */ l(Tn.Provider, { value: h, children: a });
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
    var m, d, g;
    const o = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i];
      if (typeof f == "number" && Number.isFinite(f)) {
        const y = kr(h);
        s.set(y, (s.get(y) ?? 0) + Math.abs(f));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i] ?? null, y = kr(h), k = s.get(y) ?? 0, w = f === null || k === 0 ? null : Math.abs(f) / k;
      let C = 0, M = 0;
      if (f !== null) {
        const S = f < 0 ? u : c;
        C = S.get(y) ?? 0, M = C + f, S.set(y, M);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: f,
        key: h.key,
        label: h.label,
        member: ((d = h.meta) == null ? void 0 : d.measure) ?? h.key,
        companion: ((g = h.meta) == null ? void 0 : g.companion) ?? !1,
        i,
        stack: y,
        y1: C * N,
        y2: M * N,
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
function Zt(e) {
  return e.label || e.key;
}
function He(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function na(e, t) {
  const n = e.series.map(Zt), r = e.series.map(He), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Wr({ placement: Et(t.legendPlacement) })), a;
}
function Et(e) {
  return e === "top" ? "top" : "bottom";
}
function sn(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function Rn(e = 0.2) {
  return Gs().padding(e);
}
function lo() {
  return Ys().padding(0.02);
}
const fu = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function hu(e) {
  if (typeof e == "string" && fu.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return no(e);
}
function co(e) {
  return e.toISOString().slice(0, -1);
}
function Ua(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Je.safeParse(n);
  return r.success ? r.data : void 0;
}
function uo(e, t) {
  var m, d, g;
  const n = (d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member, r = (g = e.raw.annotation) == null ? void 0 : g.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const h of Object.keys(r))
    if (h === n || h.startsWith(`${n}.`)) {
      a = h;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? Ua(n) : Ua(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const h of e.categories) {
    if (typeof h == "number" && i === void 0 || typeof h == "string" && !Jr(h)) return null;
    const f = hu(h);
    if (!f) return null;
    s.push(f);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((h) => c.has(h.getTime()) ? !1 : (c.add(h.getTime()), !0)).sort((h, f) => h.getTime() - f.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function mo(e) {
  return e ? Zs : lo;
}
function ra(e) {
  return e ? "t" : "cat";
}
function On(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? co(r)) : t.category(r);
}
function Ha(e, t) {
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
    const s = e.values, c = (h) => h !== void 0 && s.some((f) => f.getTime() === h.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], d = u ?? { start: m, end: m }, g = u === null;
    return [
      Js({
        id: "cv-brush-x",
        values: s,
        range: Xs(
          d,
          (h, { reason: f }) => {
            if (f.type !== "commit") return;
            const y = i.current.temporal, k = h.start.getTime() === h.end.getTime();
            if (a(k ? null : h), k || !y) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: y.member,
              granularity: y.granularity,
              from: Ha(y, h.start),
              to: Ha(y, h.end)
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
function pu(e, t) {
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
function Tt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? La().domain(r) : La();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: kn().domain(r), nice: !1 } : { scale: kn, nice: !0 };
}
function ho(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function en(e) {
  switch (e) {
    case "monotone":
      return Xn(rl);
    case "step":
      return Xn(nl);
    case "natural":
      return Xn(tl);
    default:
      return;
  }
}
function Rt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function aa(e, t) {
  var o, s, c, u;
  const n = e.raw.annotation, r = (m) => {
    var d, g, h, f, y, k;
    if (m)
      return ((d = n == null ? void 0 : n.measures[m]) == null ? void 0 : d.shortTitle) ?? ((g = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : g.shortTitle) ?? ((h = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : h.shortTitle) ?? ((f = n == null ? void 0 : n.measures[m]) == null ? void 0 : f.title) ?? ((y = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : y.title) ?? ((k = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : k.title) ?? m;
  }, a = e.series[0], i = (m) => {
    var d;
    return m ? (d = m.meta) != null && d.measure ? r(m.meta.measure) : m.label : void 0;
  };
  return {
    x: Rt((o = t.axes) == null ? void 0 : o.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Rt((u = t.axes) == null ? void 0 : u.y, i(a))
  };
}
function Ie(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function ia(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function gu(e) {
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
function oa(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function zn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Br,
    className: oa(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((d) => {
        var g;
        return { datum: d, color: (g = e.colorOf) == null ? void 0 : g.call(e, d) };
      }) : a.map((d) => ({ datum: d.datum, color: d.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const d of s) {
          const g = d.datum.value;
          d.datum.companion || typeof g != "number" || !Number.isFinite(g) || (c += g, u += 1);
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
function sa(e) {
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
function la(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], a = t[0];
  return e.forEach((i, o) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", m = u ? t[i.value] : void 0;
    if (u && m == null) return;
    const d = n != null && n.swap ? !u : u, g = d ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      d ? Ri([g], { id: `cv-ref-${o}`, ...c }) : Oi([g], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const h = u ? n == null ? void 0 : n.valueAnchor : a;
    if (h == null) return;
    const f = (n == null ? void 0 : n.swap) === !0;
    r.push(
      sa(
        Xt(
          [
            {
              x: d ? g : h,
              y: d ? h : g,
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
            dy: d ? f ? -6 : 8 : -6,
            dx: d ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function ca(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function po(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = ra((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? Ze(c, n.locale) : "";
  };
  return [
    sa(
      Xt(r, {
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
const vu = Li({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), bu = Li({ initial: !1 });
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
  const g = b.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const C = d.current, M = C ? C(w) : pu(w, u.target);
      M && u.emitPoint(M);
    },
    [u]
  ), [h, f] = b.useState({ w: 0, h: 0 }), y = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((M) => {
      var S;
      const N = (S = M[0]) == null ? void 0 : S.contentRect;
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
        Qs,
        {
          definition: e,
          renderer: a ? vu : bu,
          width: h.w,
          height: k,
          ariaLabel: t,
          idPrefix: y,
          onSelect: o ?? (m ? g : void 0)
        }
      )
    }
  );
}
function yu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var te, ee, ie, le, oe, me, P, R, B, U, H, T;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, m = e.series.filter((x) => {
      var $;
      return ($ = x.meta) == null ? void 0 : $.companion;
    }), d = m.length ? e.series.filter((x) => {
      var $;
      return !(($ = x.meta) != null && $.companion);
    }) : e.series, g = u ? d : e.series, f = (u ? so(g) : []).length > 1, y = f ? wr(e, g, { normalize: c }) : Ge(e, { series: g }), k = new Map(e.series.map((x) => [Zt(x), He(x)])), w = /* @__PURE__ */ new Map();
    if (f)
      for (const x of y) {
        const $ = w.get(x.i);
        $ ? $.push(x) : w.set(x.i, [x]);
      }
    const C = aa(e, t), M = s ? (ee = (te = t.axes) == null ? void 0 : te.y) == null ? void 0 : ee.hide : (le = (ie = t.axes) == null ? void 0 : ie.x) == null ? void 0 : le.hide, N = s ? (oe = t.axes) == null ? void 0 : oe.x : (me = t.axes) == null ? void 0 : me.y, S = Tt(N), I = r.barCategoryGap, L = s ? (P = t.axes) == null ? void 0 : P.y : (R = t.axes) == null ? void 0 : R.x, K = Ie(n, L), A = Ie(n, N), _ = gu(t) ?? ia(e.series[0]), E = (x) => c ? Ze(x) : A.value(x, _, "axis"), F = M ? !1 : {
      label: C.x,
      ticks: { format: (x) => K.category(x) }
    }, D = N != null && N.hide ? !1 : { label: C.y, ticks: { format: E } }, W = qs({ padding: r.barGap }), q = f ? W : c ? _i({ offset: "normalize" }) : u ? void 0 : W, z = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (x) => f ? x.stack : x.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (x) => `${x.label} ${x.i}`,
      layout: q,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (x) => {
        const $ = k.get(x.label) ?? "var(--chart-1)";
        return x.companion ? `color-mix(in oklab, ${$} 40%, transparent)` : $;
      }
    }, Z = [
      f ? s ? Aa(y, { ...z, x1: "y1", x2: "y2", y: "cat" }) : Da(y, { ...z, x: "cat", y1: "y1", y2: "y2" }) : s ? Aa(y, { ...z, x: "value", y: "cat" }) : Da(y, { ...z, x: "cat", y: "value" })
    ];
    if (u && !c && m.length) {
      const x = e.categories.map(($, Y) => {
        var j, V, Q;
        return {
          cat: typeof $ == "number" ? $ : String($),
          value: m.reduce((ve, Oe) => {
            const G = Oe.data[Y];
            return typeof G != "number" ? ve : (ve ?? 0) + G;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((V = (j = m[0]) == null ? void 0 : j.meta) == null ? void 0 : V.measure) ?? ((Q = m[0]) == null ? void 0 : Q.key),
          companion: !0,
          i: Y
        };
      });
      if (x.some(($) => $.value !== null)) {
        const $ = {
          id: "cv-bars-prev",
          key: (Y) => `prev ${Y.i}`,
          curve: en("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        Z.push(
          s ? Us(x, { ...$, x: "value", y: "cat" }) : En(x, { ...$, x: "cat", y: "value" })
        );
      }
    }
    if (Z.push(
      ...la(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: ca(e)
      })
    ), a.showValueLabels) {
      const x = u ? f ? y : wr(e, g, { normalize: c }) : y;
      Z.push(
        ...po(x, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return tt({
      marks: Z,
      x: s ? { scale: S.scale, nice: S.nice, grid: !0, axis: D } : { scale: () => Rn(I), axis: F },
      y: s ? { scale: () => Rn(I), axis: F } : { scale: S.scale, nice: S.nice, grid: !0, axis: D },
      color: na(u ? { ...e, series: g } : e, {
        legend: sn(t) && g.length > 1,
        legendPlacement: Et((B = t.legend) == null ? void 0 : B.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((U = t.tooltip) == null ? void 0 : U.show) === !1 ? void 0 : zn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !f,
        value: c && f ? (x) => {
          const $ = x.share;
          return typeof $ == "number" ? Ze($) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: f ? (x) => w.get(x.i) ?? [x] : void 0,
        colorOf: f ? (x) => k.get(x.label) ?? "var(--chart-1)" : void 0,
        indicator: (H = t.tooltip) == null ? void 0 : H.indicator,
        showTotal: (T = t.tooltip) == null ? void 0 : T.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(Zt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(rt, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function ku({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var h;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : uo(e, t),
    [e, t, i]
  ), s = b.useMemo(() => On(o, n), [o, n]), c = (h = t.axes) == null ? void 0 : h.x, u = b.useMemo(
    () => c != null && c.tickFormat ? On(o, Ie(n, c)) : s,
    [o, n, c, s]
  ), m = fo(o, {
    label: s,
    ariaLabel: "Time range"
  }), d = b.useMemo(() => {
    var I, L, K, A, _, E, F, D, W;
    const f = ra(o), y = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = en(k), C = aa(e, t), M = Tt((I = t.axes) == null ? void 0 : I.y), N = e.categories.length <= 1, S = e.series.map((q) => {
      var Z, te, ee;
      const z = Ge(e, { series: [q], skipNull: y, temporal: o });
      return En(z, {
        id: `cv-line-${q.key}`,
        x: f,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (Z = q.meta) != null && Z.companion ? "5 4" : void 0,
        strokeOpacity: (te = q.meta) != null && te.companion ? 0.55 : void 0,
        stroke: He(q),
        points: !i && !((ee = q.meta) != null && ee.companion) && (ho(q, a.dots) || N)
      });
    });
    return i || (S.push(
      ...la(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: ca(e)
      }),
      ...po(
        a.showValueLabels ? Ge(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), S.push(Di({ x: {}, y: !1, marker: a.dots !== !1 }))), tt({
      marks: S,
      x: {
        scale: mo(o),
        axis: i || (K = (L = t.axes) == null ? void 0 : L.x) != null && K.hide ? !1 : {
          label: C.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: M.scale,
        nice: M.nice,
        grid: !i,
        axis: i || (_ = (A = t.axes) == null ? void 0 : A.y) != null && _.hide ? !1 : {
          label: C.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (q) => {
              var z, Z, te, ee;
              return Ie(n, (z = t.axes) == null ? void 0 : z.y).value(
                q,
                ((te = (Z = e.series[0]) == null ? void 0 : Z.meta) == null ? void 0 : te.measure) ?? ((ee = e.series[0]) == null ? void 0 : ee.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: na(e, {
        legend: !i && sn(t) && e.series.length > 1,
        legendPlacement: Et((E = t.legend) == null ? void 0 : E.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((F = t.tooltip) == null ? void 0 : F.show) === !1 ? void 0 : zn({
        format: n,
        category: s,
        indicator: (D = t.tooltip) == null ? void 0 : D.indicator,
        showTotal: (W = t.tooltip) == null ? void 0 : W.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, a, r, i, o, s, u, m]), g = e.series.map(Zt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    rt,
    {
      definition: d,
      ariaLabel: g,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function wu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, C;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", c = o === "percent", u = b.useMemo(() => uo(e, t), [e, t]), m = b.useMemo(() => On(u, n), [u, n]), d = (C = t.axes) == null ? void 0 : C.x, g = b.useMemo(
    () => d != null && d.tickFormat ? On(u, Ie(n, d)) : m,
    [u, n, d, m]
  ), h = fo(u, { label: m, ariaLabel: "Time range" }), f = b.useMemo(() => {
    var ie, le, oe, me, P, R, B, U, H;
    const M = ra(u), N = a.connectNulls ?? !1, S = a.curve ?? "monotone", I = en(S), L = r.areaFillOpacity, K = r.stackedAreaFillOpacity, A = r.lineWidth, _ = aa(e, t), E = Tt((ie = t.axes) == null ? void 0 : ie.y), F = ia(e.series[0]), D = e.series.filter((T) => {
      var x;
      return !((x = T.meta) != null && x.companion);
    }), W = c ? [] : e.series.filter((T) => {
      var x;
      return (x = T.meta) == null ? void 0 : x.companion;
    }), q = new Map(e.series.map((T) => [T.key, He(T)])), z = [], Z = (T) => `cv-area-fill-${T.replace(/[^a-zA-Z0-9_-]/g, "-")}`, te = s ? void 0 : D.map((T) => ({
      id: Z(T.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: He(T), opacity: L * 0.15 },
        { offset: 1, color: He(T), opacity: L }
      ]
    }));
    if (s)
      for (const { stackId: T, series: x } of so(D)) {
        const $ = Ge(e, { series: x, skipNull: N, temporal: u });
        z.push(
          fr($, {
            id: T ? `cv-area-stack-${T}` : "cv-area-stack",
            x: M,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (Y) => `${Y.key}:${Y.i}`,
            curve: I,
            fillOpacity: K,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (Y) => q.get(Y.key) ?? "currentColor",
            strokeWidth: A,
            layout: c ? _i({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const T of D) {
        const x = Ge(e, { series: [T], skipNull: N, temporal: u });
        z.push(
          fr(x, {
            id: `cv-area-${T.key}`,
            x: M,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: I,
            fill: `url(#${Z(T.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: He(T),
            strokeWidth: A
          })
        );
      }
    for (const T of W) {
      const x = Ge(e, { series: [T], skipNull: N, temporal: u });
      z.push(
        En(x, {
          id: `cv-area-prev-${T.key}`,
          x: M,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: I,
          strokeWidth: A,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: He(T)
        })
      );
    }
    const ee = new Set(
      D.filter((T) => ho(T, a.dots)).map((T) => T.key)
    );
    if (ee.size > 0) {
      const T = s ? wr(e, D, { normalize: c, temporal: u }).filter(
        (x) => ee.has(x.key) && x.value !== null
      ) : Ge(e, {
        series: D.filter((x) => ee.has(x.key)),
        skipNull: !0,
        temporal: u
      });
      z.push(
        Ai(T, {
          id: "cv-area-dots",
          x: M,
          y: (x) => s ? x.y2 ?? null : x.value,
          z: "label",
          color: "label",
          key: (x) => `${x.key}:${x.i}`,
          r: 3
        })
      );
    }
    return z.push(
      ...la(a.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: ca(e)
      })
    ), z.push(Di({ x: {}, y: !1, marker: !0 })), tt({
      marks: z,
      gradients: te,
      x: {
        scale: mo(u),
        axis: (oe = (le = t.axes) == null ? void 0 : le.x) != null && oe.hide ? !1 : {
          label: _.x,
          ticks: { format: g }
        }
      },
      y: {
        scale: E.scale,
        nice: E.nice,
        grid: !0,
        axis: (P = (me = t.axes) == null ? void 0 : me.y) != null && P.hide ? !1 : {
          label: _.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (T) => {
              var x;
              return c ? Ze(T) : Ie(n, (x = t.axes) == null ? void 0 : x.y).value(T, F, "axis");
            }
          }
        }
      },
      color: na(e, {
        legend: sn(t) && e.series.length > 1,
        legendPlacement: Et((R = t.legend) == null ? void 0 : R.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((B = t.tooltip) == null ? void 0 : B.show) === !1 ? void 0 : zn({
        format: n,
        percentShare: c,
        category: m,
        indicator: (U = t.tooltip) == null ? void 0 : U.indicator,
        showTotal: (H = t.tooltip) == null ? void 0 : H.showTotal
      }),
      keyboard: !0,
      controls: h
    });
  }, [e, t, n, a, r, s, c, u, m, g, h]), y = e.series.map(Zt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(rt, { definition: f, ariaLabel: y, className: "cv-chart--fill" });
}
const Cu = 0.26, Nu = 0.03, Ga = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Su({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f, y;
  const a = t.familyOptions ?? {}, i = e.series[0], o = ia(i), s = (y = (f = t.colors) == null ? void 0 : f.ramp) != null && y.length ? t.colors.ramp : jn, c = b.useMemo(() => {
    const k = e.categories.map((w, C) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[C]) ?? 0
    }));
    return xu(k, a.maxSlices).map((w, C) => ({
      ...w,
      token: s[C % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), u = c.reduce((k, w) => k + w.value, 0), m = c.some((k) => k.value < 0), d = m || c.length === 0 || u <= 0, g = b.useMemo(() => {
    var _, E, F;
    if (d) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = k > 0, C = a.showLabels ?? "percent", M = C !== "none", N = M ? Math.min(r.pieRadiusPct / 100, 1 - Cu) : r.pieRadiusPct / 100, S = Gl(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), L = [pr(S, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: D }) => D * k,
      outerRadius: ({ radius: D }) => D * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (M) {
      const D = (W) => C === "name" ? W.label : C === "value" ? n.value(W.value, o, "label") : Ze(W.fraction);
      L.push(
        Zn(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          S.filter((W) => W.value > 0 && W.fraction >= Nu),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (W) => W.angle,
            radius: N,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: D,
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
      const D = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(u, o, "label") : a.centerLabel.value;
      if (L.push(
        Zn([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => D,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), a.centerLabel.label) {
        const W = a.centerLabel.label;
        L.push(
          Zn([{ id: "cv-pie-center-sub" }], {
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
    const K = {
      domain: c.map((D) => D.label),
      range: c.map((D) => `var(--${D.token})`)
    };
    sn(t) && (K.legend = Wr({ placement: Et((_ = t.legend) == null ? void 0 : _.position) }));
    const A = i ? i.label || i.key : "";
    return tt({
      marks: [
        Ki({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: kn().domain([0, Math.PI * 2]) },
          radius: { scale: kn().domain([0, 1]) },
          marks: L
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: K,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((E = t.tooltip) == null ? void 0 : E.show) === !1 ? void 0 : {
        use: Br,
        className: oa((F = t.tooltip) == null ? void 0 : F.indicator),
        content: (D) => {
          const W = D[0];
          if (!W) return { rows: [] };
          const q = W.datum;
          return {
            title: q.label,
            rows: [
              {
                label: A,
                value: `${n.value(q.value, o, "tooltip")} (${Ze(q.fraction)})`,
                color: W.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [d, c, u, t, n, a, r, i, o]);
  if (m)
    return /* @__PURE__ */ l("div", { style: Ga, children: "Pie charts can't show negative values" });
  if (!g)
    return /* @__PURE__ */ l("div", { style: Ga, children: "No data" });
  const h = c.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(rt, { definition: g, ariaLabel: h, className: "cv-chart--fill" });
}
function xu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function Mu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (h) => {
    var f, y;
    return ((f = i == null ? void 0 : i.measures[h]) == null ? void 0 : f.shortTitle) ?? ((y = i == null ? void 0 : i.dimensions[h]) == null ? void 0 : y.shortTitle) ?? h;
  }, s = a.x ? o(a.x) : "x", c = a.y ? o(a.y) : "y", u = a.size ? o(a.size) : void 0, m = b.useMemo(() => {
    var q, z, Z, te, ee, ie, le, oe, me, P, R, B, U, H;
    if (!a.x || !a.y) return null;
    const h = Ru(e.raw.rows, a);
    if (h.length === 0) return null;
    const f = !!a.groupBy, y = [];
    if (f)
      for (const T of h)
        T.group !== void 0 && !y.includes(T.group) && y.push(T.group);
    const [k, w] = r.bubbleAreaRange, C = Math.sqrt(Math.max(k, 0) / Math.PI), M = Math.sqrt(Math.max(w, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, S = (z = (q = t.colors) == null ? void 0 : q.ramp) != null && z.length ? t.colors.ramp : jn;
    f ? (N.z = "group", N.color = "group") : N.fill = `var(--${S[0]})`, a.size ? (N.r = (T) => T.size ?? 0, N.rScale = { scale: () => el().range([C, M]) }) : N.r = 4;
    const I = [Ai(h, N)];
    (Z = a.referenceLines) == null || Z.forEach((T, x) => {
      const $ = `var(--${T.colorToken ?? "muted-foreground"})`, Y = { stroke: $, strokeWidth: 1.25, strokeDasharray: "4 4" };
      T.axis === "y" ? (I.push(Oi([T.value], { id: `cv-ref-${x}`, ...Y })), T.label && I.push(
        Xt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${x}`,
          y: "v",
          text: "label",
          fill: $,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (I.push(Ri([T.value], { id: `cv-ref-${x}`, ...Y })), T.label && I.push(
        Xt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${x}`,
          x: "v",
          text: "label",
          fill: $,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let L;
    f && (L = {
      domain: y,
      range: y.map((T, x) => `var(--${S[x % S.length]})`)
    }, sn(t) && (L.legend = Wr({ placement: Et((te = t.legend) == null ? void 0 : te.position) })));
    const K = Rt((ee = t.axes) == null ? void 0 : ee.x, s), A = Rt((ie = t.axes) == null ? void 0 : ie.y, c), _ = Tt((le = t.axes) == null ? void 0 : le.x), E = Tt((oe = t.axes) == null ? void 0 : oe.y), F = a.x, D = a.y, W = a.size;
    return tt({
      marks: I,
      x: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (P = (me = t.axes) == null ? void 0 : me.x) != null && P.hide ? !1 : {
          label: K,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (T) => {
              var x;
              return Ie(n, (x = t.axes) == null ? void 0 : x.x).value(T, F, "axis");
            }
          }
        }
      },
      y: {
        scale: E.scale,
        nice: E.nice,
        grid: !0,
        axis: (B = (R = t.axes) == null ? void 0 : R.y) != null && B.hide ? !1 : {
          label: A,
          ticks: {
            format: (T) => {
              var x;
              return Ie(n, (x = t.axes) == null ? void 0 : x.y).value(T, D, "axis");
            }
          }
        }
      },
      color: L,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((U = t.tooltip) == null ? void 0 : U.show) === !1 ? void 0 : {
        use: Br,
        className: oa((H = t.tooltip) == null ? void 0 : H.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (T) => {
          const $ = T[0];
          if (!$) return { rows: [] };
          const Y = $.datum, j = [
            { label: s, value: n.value(Y.x, F, "tooltip") },
            { label: c, value: n.value(Y.y, D, "tooltip") }
          ];
          return W && j.push({
            label: u ?? W,
            value: n.value(Y.size, W, "tooltip")
          }), { title: Y.group, color: $.color, rows: j };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, c, u]), d = a.groupBy, g = (h) => {
    var y;
    if (!h || !d) return null;
    const f = (y = h.datum) == null ? void 0 : y.group;
    return f === void 0 ? null : { member: d, value: f, label: f };
  };
  return m ? /* @__PURE__ */ l(
    rt,
    {
      definition: m,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: g
    }
  ) : /* @__PURE__ */ l("div", { style: Tu, children: "No data" });
}
const Tu = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Ru(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = er(r[t.x]), o = er(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? er(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function er(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ou(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function _u(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Au(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function go(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Au(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => go(e, t, n), r;
}
function Du({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = Ou(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const g = Cr(s, a), h = Cr(s, i), f = /* @__PURE__ */ new Map();
    return s.forEach((y, k) => {
      const w = _u(y[o]), C = y[g], M = y[h];
      if (w === null || C === null || C === void 0 || M === null || M === void 0)
        return;
      const N = typeof C == "number" ? C : String(C), S = String(M);
      f.set(`${N}\0${S}`, {
        cat: N,
        label: S,
        value: w,
        key: `${N}|${S}`,
        member: o,
        i: k
      });
    }), [...f.values()];
  }, [s, a, i, o]), m = b.useMemo(() => {
    var C, M, N, S, I, L, K, A;
    let g = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY;
    for (const _ of u)
      _.value < g && (g = _.value), _.value > h && (h = _.value);
    const f = (_) => {
      if (!_) return;
      const E = (c == null ? void 0 : c.dimensions[_]) ?? (c == null ? void 0 : c.timeDimensions[_]) ?? (c == null ? void 0 : c.measures[_]);
      return (E == null ? void 0 : E.shortTitle) ?? (E == null ? void 0 : E.title) ?? _;
    }, y = Rt((C = t.axes) == null ? void 0 : C.x, f(a)), k = Rt((M = t.axes) == null ? void 0 : M.y, f(i)), w = [
      Hs(u, {
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
      sa(
        Xt(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (_) => n.value(_.value, _.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), tt({
      marks: w,
      x: {
        scale: () => Rn(0.05),
        axis: (S = (N = t.axes) == null ? void 0 : N.x) != null && S.hide ? !1 : {
          label: y,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (_) => {
              var E;
              return Ie(n, (E = t.axes) == null ? void 0 : E.x).category(_);
            }
          }
        }
      },
      y: {
        scale: () => Rn(0.05),
        axis: (L = (I = t.axes) == null ? void 0 : I.y) != null && L.hide ? !1 : {
          label: k,
          ticks: {
            format: (_) => {
              var E;
              return Ie(n, (E = t.axes) == null ? void 0 : E.y).category(_);
            }
          }
        }
      },
      color: {
        scale: go(g, h, r.colorToken ?? "chart-1")
      },
      tooltip: ((K = t.tooltip) == null ? void 0 : K.show) === !1 ? void 0 : zn({ format: n, indicator: (A = t.tooltip) == null ? void 0 : A.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const d = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(rt, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function Lu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Eu(e) {
  return `cv-kpi-trend--${e}`;
}
function Iu(e) {
  var c, u, m, d;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (g) => r.value(g, a.measure, "kpi"), o = vo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((d = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : d.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(Ku, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Fu, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Fu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var g;
  const a = n.goodDirection ?? ((g = n.comparison) == null ? void 0 : g.goodDirection) ?? "up", i = t === null ? null : Uu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Pu(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((h) => h !== null), m = i ? i.diff : c ? ju(c) : 0, d = Eu(Lu(m, a));
  return /* @__PURE__ */ v("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ v("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(Wu, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l($u, {}) : /* @__PURE__ */ l(zu, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Vu, { data: e, series: c, colorClass: d }) })
  ] });
}
function Pu(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function $u() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Fi, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function zu() {
  return /* @__PURE__ */ v("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Ii, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Vu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = Ge(e, { series: [t], skipNull: !0 }), i = Tt(void 0);
    return tt({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        fr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: en("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        En(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: en("monotone"),
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
function ju(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Wu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Ii : a ? Kr : qr, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const $t = -(2 * Math.PI) / 3, Nr = 2 * Math.PI / 3, Bu = Nr - $t;
function Ku({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, d;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((d = r.gauge) == null ? void 0 : d.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : qu(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const g = (s - a) / (o - a), h = $t + g * Bu, f = ({ radius: w }) => w * 0.7, y = pr([{ startAngle: $t, endAngle: Nr }], {
      id: "cv-gauge-track",
      innerRadius: f,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = g > 0 ? [
      y,
      pr([{ startAngle: $t, endAngle: h }], {
        id: "cv-gauge-value",
        innerRadius: f,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [y];
    return tt({
      marks: [
        Ki({
          id: "cv-gauge",
          startAngle: $t,
          endAngle: Nr,
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
function qu(e, t) {
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
function Uu(e, t, n) {
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
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: O("cv-table", e), ...t }) })
);
yo.displayName = "Table";
const ko = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: O("cv-table-header", e), ...t }));
ko.displayName = "TableHeader";
const wo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: O("cv-table-body", e), ...t }));
wo.displayName = "TableBody";
const pn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: O("cv-table-row", e),
      ...t
    }
  )
);
pn.displayName = "TableRow";
const Co = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: O("cv-table-head", e),
    ...t
  }
));
Co.displayName = "TableHead";
const Sr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: O("cv-table-cell", e),
    ...t
  }
));
Sr.displayName = "TableCell";
const Hu = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: O("cv-table-caption", e), ...t }));
Hu.displayName = "TableCaption";
const No = Gr(
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
), J = b.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: O(No({ variant: t, size: n }), e),
      ...a
    }
  )
);
J.displayName = "Button";
function Gu({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Yu(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, m] = b.useState(0), d = r.pageSize ?? 25, g = b.useMemo(() => {
    var N;
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1, M = ((N = o.find((S) => S.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((S, I) => em(S[M], I[M]) * C);
  }, [a, s, o]), h = Math.max(1, Math.ceil(g.length / d)), f = Math.min(u, h - 1), y = g.slice(f * d, f * d + d), k = (C) => {
    c(
      (M) => (M == null ? void 0 : M.member) === C ? { member: C, dir: M.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0);
  }, w = g.length > 12;
  return /* @__PURE__ */ v("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ v(yo, { children: [
      /* @__PURE__ */ l(ko, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(pn, { children: o.map((C) => /* @__PURE__ */ l(
        Co,
        {
          className: Ya(C.align),
          style: C.width ? { width: C.width } : void 0,
          children: /* @__PURE__ */ v(
            J,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(C.member),
              children: [
                C.label,
                /* @__PURE__ */ l(Zu, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        C.member
      )) }) }),
      /* @__PURE__ */ v(wo, { children: [
        y.map((C, M) => /* @__PURE__ */ l(pn, { children: o.map((N) => {
          const S = tm(N.member, C[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Sr,
            {
              className: O(Ya(N.align), w && "cv-table-cell--compact"),
              style: S ? { color: S } : void 0,
              children: N.render(C[N.key])
            },
            N.member
          );
        }) }, M)),
        y.length === 0 && /* @__PURE__ */ l(pn, { children: /* @__PURE__ */ l(
          Sr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    g.length > d && /* @__PURE__ */ v("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ v("span", { children: [
        f * d + 1,
        "–",
        Math.min((f + 1) * d, g.length),
        " of",
        " ",
        g.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          J,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: f === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          J,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((C) => Math.min(h - 1, C + 1)),
            disabled: f >= h - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Yu(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Ju(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = Cr(e, c), m = t ? Xu(t, c) : void 0, d = t ? c in t.measures : !1, g = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, h = s.align ?? (d ? "right" : "left"), f = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: g,
      align: h,
      width: s.width,
      render: (y) => Qu(y, d, c, f)
    };
  });
}
function Qu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Ju(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Xu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ya(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Zu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Kr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(qr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(ol, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function em(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function tm(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && nm(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function nm(e, t, n) {
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
const st = "cv-sidebar--default", rm = "cv-sidebar--wide", So = "a date or category", tr = [
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
    hint: So,
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
], am = [
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
    hint: So,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], im = [
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
], om = [
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
], sm = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], lm = [
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
], cm = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], qe = (e) => cm.indexOf(e), We = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Pi,
    order: qe("bar"),
    component: yu,
    optionsSchema: Be.bar,
    defaults: Ke.bar,
    wells: tr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: st
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: fl,
    order: qe("line"),
    component: ku,
    optionsSchema: Be.line,
    defaults: Ke.line,
    wells: tr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: st
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: sl,
    order: qe("area"),
    component: wu,
    optionsSchema: Be.area,
    defaults: Ke.area,
    wells: tr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: st
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: dl,
    order: qe("pie"),
    component: Su,
    optionsSchema: Be.pie,
    defaults: Ke.pie,
    wells: im,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: st
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: ml,
    order: qe("scatter"),
    component: Mu,
    optionsSchema: Be.scatter,
    defaults: Ke.scatter,
    wells: om,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: st
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: ul,
    order: qe("kpi"),
    component: Iu,
    optionsSchema: Be.kpi,
    defaults: Ke.kpi,
    wells: sm,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: rm
  },
  table: {
    family: "table",
    label: "Table",
    icon: cl,
    order: qe("table"),
    component: Gu,
    optionsSchema: Be.table,
    defaults: Ke.table,
    wells: lm,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: st
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: ll,
    order: qe("heatmap"),
    component: Du,
    optionsSchema: Be.heatmap,
    defaults: Ke.heatmap,
    wells: am,
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
    sidebarWidthClass: st
  }
}, um = We.bar, mm = We.line, dm = We.area, fm = We.pie, hm = We.scatter, pm = We.heatmap, gm = We.kpi, vm = We.table, ua = [
  um,
  mm,
  dm,
  fm,
  hm,
  pm,
  gm,
  vm
], bm = p.any();
function ma(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? uu;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? bm;
    },
    resolveOptions: (o) => mu(o, i.defaults(o.family))
  };
  return i;
}
const Vn = ma(ua);
function ym(e, t = Vn) {
  return t.resolveOptions(e);
}
const Qa = {
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
function xo(e) {
  return e ? { ...Qa, ...e } : Qa;
}
function da(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function km(e) {
  const t = Math.floor(e ?? hn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function wm(e, t) {
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
function Cm(e) {
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
function Nm(e, t) {
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
function Sm(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function xm(e, t, n) {
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
function Mm(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Nm(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Sm(o.meta)
      }))
    };
  }
  const a = km(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? wm(i.data, a) : Cm(i.data)
    }))
  };
}
function Tm(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const my = Object.fromEntries(
  Object.entries(We).map(([e, t]) => [e, t.component])
);
function Mo({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = Vn,
  theme: u
}) {
  const m = re(() => ym(t, c), [t, c]), d = re(() => xo(u), [u]), g = c.get(m.family), h = (g == null ? void 0 : g.queryless) ?? !1, f = da(g) ? m.transform : void 0, y = re(() => Mm(e, f), [e, f]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(Vc, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ v(In, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ur, {}),
      /* @__PURE__ */ l(Fn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Pn, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : Tm(y), w = xm(
    r ?? Zr(e.raw.annotation, m, Xr),
    f
  ), C = (i == null ? void 0 : i[m.family]) ?? c.require(m.family).component;
  return /* @__PURE__ */ l(
    C,
    {
      data: y,
      options: m,
      config: k,
      format: w,
      theme: d,
      state: a,
      editing: o,
      updateFamilyOptions: s
    }
  );
}
const jn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], nr = 8;
function Ja(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function To(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : jn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function Xa(e, t) {
  const n = To(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Rm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function dn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Rm(e[n]);
  return t;
}
function Om(e) {
  return {
    measures: dn(e.measures ?? {}),
    dimensions: dn(e.dimensions ?? {}),
    segments: dn(e.segments ?? {}),
    timeDimensions: dn(e.timeDimensions ?? {})
  };
}
function Ct(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Wn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function _m(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Am(e, t) {
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
function Dm(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Bn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function Lm(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Ro(e, t, n, r, a = Vn) {
  const i = Om(e.annotation()), o = Am(i, r), s = Dm(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const d = n.measures ?? [];
    if (a.require(t.family).measureOnly && d.length > 0) {
      const g = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => Bn(g[y])),
          meta: { ...Wn(Ct(i, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Xa(h, t.colors), {
        categories: d.map(
          (y) => {
            var k, w;
            return ((k = Ct(i, y)) == null ? void 0 : k.shortTitle) ?? ((w = Ct(i, y)) == null ? void 0 : w.title) ?? y;
          }
        ),
        series: h,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || Ja(h)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Im(e, c.series, t, i) : Pm(e, c.category.member, c.series, t, i), m = Em(e, c);
  return Lm(u, o), Xa(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Ja(u)
  };
}
function Em(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Im(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = Ct(r, s), u = i == null ? void 0 : i[s], m = o.map((d) => Bn(d[s]));
    return {
      key: s,
      label: _m(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Wn(c, u, n.format), measure: s }
    };
  });
}
function Fm(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function Pm(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, d = { x: [t], y: [s, "measures"] }, h = e.seriesNames(d).filter((N) => {
    const S = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : void 0;
    return S === void 0 || u.has(S);
  }), f = e.chartPivot(d), y = Ct(a, i), k = a.dimensions[s], w = (k == null ? void 0 : k.type) === "boolean", C = (k == null ? void 0 : k.shortTitle) ?? (k == null ? void 0 : k.title) ?? s, M = h.map((N) => {
    var q, z;
    const S = (q = N.yValues) == null ? void 0 : q[0], I = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : i, L = Ct(a, I), K = (z = n.meta) == null ? void 0 : z[I], A = (K == null ? void 0 : K.label) ?? (L == null ? void 0 : L.shortTitle) ?? (L == null ? void 0 : L.title) ?? I, _ = S ?? N.shortTitle ?? N.title ?? N.key, E = w ? Fm(_) : void 0, F = E ? `${C}: ${E}` : _, D = m ? `${A} · ${F}` : F, W = f.map((Z) => Bn(Z[N.key]));
    return {
      key: N.key,
      label: D,
      data: W,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Wn(L ?? y, K, r.format),
        measure: I
      }
    };
  });
  return $m(M, y, r.format);
}
function $m(e, t, n) {
  var m, d, g;
  if (e.length <= nr) return e;
  const r = (h) => h.data.reduce((f, y) => f + (y ?? 0), 0), a = [...e].sort((h, f) => r(f) - r(h)), i = a.slice(0, nr - 1), o = a.slice(nr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (h, f) => {
    let y = 0, k = !1;
    for (const w of o) {
      const C = w.data[f];
      C !== null && (y += C, k = !0);
    }
    return k ? y : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...Wn(t, void 0, n), ...(g = (d = i[0]) == null ? void 0 : d.meta) != null && g.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Bn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ae = (e) => he(e, "yyyy-MM-dd");
function zm(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ae(t), ae(t)];
  if (n === "yesterday") {
    const o = ye(t, 1);
    return [ae(o), ae(o)];
  }
  if (n === "this week") return [ae(Cn(t)), ae(Nn(t))];
  if (n === "this month") return [ae(ct(t)), ae(qt(t))];
  if (n === "this quarter") return [ae(ut(t)), ae(Ut(t))];
  if (n === "this year") return [ae(mt(t)), ae(Ht(t))];
  if (n === "last week") {
    const o = hr(t, 1);
    return [ae(Cn(o)), ae(Nn(o))];
  }
  if (n === "last month") {
    const o = dt(t, 1);
    return [ae(ct(o)), ae(qt(o))];
  }
  if (n === "last quarter") {
    const o = ft(t, 1);
    return [ae(ut(o)), ae(Ut(o))];
  }
  if (n === "last year") {
    const o = ht(t, 1);
    return [ae(mt(o)), ae(Ht(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ae(ye(t, a - 1)), ae(t)] : i.startsWith("week") ? [ae(ye(t, a * 7 - 1)), ae(t)] : i.startsWith("month") ? [ae(ct(dt(t, a))), ae(qt(dt(t, 1)))] : i.startsWith("quarter") ? [ae(ut(ft(t, a))), ae(Ut(ft(t, 1)))] : [ae(mt(ht(t, a))), ae(Ht(ht(t, 1)))];
}
function Oo(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function fa(e) {
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
  const t = fa(e);
  return t === void 0 ? void 0 : Oo(t);
}
function ha(e) {
  const t = fa(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Ot(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Vm = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function jm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function tn(e, t, n) {
  var r;
  if (we(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Wm(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = tn(o, t, n);
    if (!Ot(s))
      if (Array.isArray(s))
        for (const c of s)
          Ot(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? zm(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function Bm(e, t, n) {
  if ("and" in e) {
    const r = xr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = xr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Wm(e, t, n);
}
function xr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = Bm(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Km(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const a = tn(e.dateRange, t, n);
    Ot(a) || (r.dateRange = a);
  }
  if (e.granularity !== void 0) {
    const a = tn(e.granularity, t, n);
    Ot(a) || (r.granularity = a === Mt ? ha(r.dateRange) : a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Ao(e, t, n) {
  const r = Vm(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Km(i, r, t))), e.filters !== void 0) {
    const i = xr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = tn(e.limit, r, t);
    Ot(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = tn(e.offset, r, t);
    Ot(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Do() {
  let e, t;
  return (n, r, a) => {
    const i = Ao(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function qm(e, t) {
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
class Um extends Error {
}
const Hm = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Um(`"${e}" cannot be parsed into a number`);
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
function Za(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Gm extends Error {
}
class ei extends Error {
}
class Ym extends Error {
}
class rr extends Error {
}
class Qm extends Error {
}
class Jm {
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
      throw new ei(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Za(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Ym(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new rr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new rr(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, d = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof d == "number")
        o = this.cls.mul(o, d);
      else if (Za(d))
        o = this.cls.mul(o, this.convertFraction(d));
      else
        throw new rr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new ei(".toBest must be called after .from");
    const i = this.cls.lt(this.val, 0);
    let o = [], s = i ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (o = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const d = this.describe(m);
      if (o.indexOf(m) === -1 && d.system === c) {
        const h = this.to(m);
        if (i ? this.cls.gt(h, s) : this.cls.lt(h, s))
          continue;
        (u === null || (i ? this.cls.lte(h, s) && this.cls.gt(h, u.val) : this.cls.gte(h, s) && this.cls.lt(h, u.val))) && (u = {
          val: h,
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
        throw new Qm(`Meausure "${t}" not found.`);
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
    throw new Gm(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Xm(e) {
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
function Zm(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Xm(e);
  return (r) => new Jm({
    measures: e,
    unitCache: n,
    cls: Hm
  }, r);
}
const ed = {
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
}, td = {
  systems: {
    metric: ed
  }
}, nd = {
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
}, rd = {
  systems: {
    SI: nd
  }
}, ad = {
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
}, id = {
  systems: {
    SI: ad
  }
}, od = {
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
}, sd = {
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
}, ld = {
  systems: {
    metric: od,
    imperial: sd
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
}, cd = {
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
}, ud = {
  systems: {
    SI: cd
  }
}, md = {
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
}, dd = {
  systems: {
    SI: md
  }
}, fd = {
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
}, hd = {
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
}, pd = {
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
}, gd = {
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
}, vd = {
  systems: {
    bit: fd,
    byte: hd,
    IECBit: pd,
    IECByte: gd
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
}, bd = {
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
}, yd = {
  systems: {
    metric: bd
  }
}, kd = {
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
}, wd = {
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
}, Cd = {
  systems: {
    SI: kd,
    nutrition: wd
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
}, Nd = {
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
}, Sd = {
  systems: {
    SI: Nd
  }
}, xd = {
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
}, Md = {
  systems: {
    SI: xd
  }
}, Td = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Rd = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Od = {
  systems: {
    metric: Td,
    imperial: Rd
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
}, _d = {
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
}, Ad = {
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
}, Dd = {
  systems: {
    metric: _d,
    imperial: Ad
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
}, Ld = {
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
}, Ed = {
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
}, Id = {
  systems: {
    metric: Ld,
    imperial: Ed
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
}, Fd = {
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
}, Pd = {
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
}, $d = {
  systems: {
    metric: Fd,
    imperial: Pd
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
}, zd = {
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
}, Vd = {
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
}, jd = {
  systems: {
    metric: zd,
    imperial: Vd
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
}, Wd = {
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
}, Bd = {
  systems: {
    SI: Wd
  }
}, Kd = {
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
}, qd = {
  systems: {
    unit: Kd
  }
}, Ud = {
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
}, Hd = {
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
}, Gd = {
  systems: {
    metric: Ud,
    imperial: Hd
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
}, Yd = {
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
}, Qd = {
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
}, Jd = {
  systems: {
    metric: Yd,
    imperial: Qd
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
}, Xd = {
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
}, Zd = {
  systems: {
    SI: Xd
  }
}, ef = {
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
}, tf = {
  systems: {
    SI: ef
  }
}, nf = {
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
}, rf = {
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
}, of = {
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
}, sf = {
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
}, lf = {
  systems: {
    metric: of,
    imperial: sf
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
}, cf = {
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
}, uf = {
  systems: {
    SI: cf
  }
}, mf = {
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
}, df = {
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
}, hf = {
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
}, pf = {
  systems: {
    SI: hf
  }
}, gf = {
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
}, vf = {
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
}, bf = {
  systems: {
    metric: gf,
    imperial: vf
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
}, yf = {
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
}, kf = {
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
}, wf = {
  systems: {
    metric: yf,
    imperial: kf
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
}, Cf = {
  acceleration: td,
  angle: rd,
  apparentPower: id,
  area: ld,
  charge: ud,
  current: dd,
  digital: vd,
  each: yd,
  energy: Cd,
  force: Sd,
  frequency: Md,
  illuminance: Od,
  length: Dd,
  mass: Id,
  massFlowRate: $d,
  pace: jd,
  partsPer: Bd,
  pieces: qd,
  power: Gd,
  pressure: Jd,
  reactiveEnergy: Zd,
  reactivePower: tf,
  speed: af,
  torque: ff,
  temperature: lf,
  time: uf,
  voltage: pf,
  volume: bf,
  volumeFlowRate: wf
}, Nf = Zm(Cf), Sf = {
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
function xf(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Nf(t).from(e.from).to(e.to)
  };
}
const Mr = {
  ...Object.fromEntries(
    Object.entries(Sf).map(([e, t]) => [e, xf(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Kn(e) {
  return e ? { ...Mr, ...e } : Mr;
}
function Mf(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Tf(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Rf(e) {
  return e != null && e.quantity ? Tf(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Of = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Lo(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ti(e, t) {
  const n = e * (Of[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${Lo(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function ar(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Lo((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function _f(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ni(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Eo(e = Mr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Xr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return ti(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ni(ar(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return ti(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return ni(ar(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? _f(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${ar(n, t)}${u}`;
  };
}
const Io = b.createContext(null);
function Af({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(Io.Provider, { value: e, children: t });
}
function Fo() {
  return b.useContext(Io) ?? void 0;
}
const qn = Mi(null);
qn.displayName = "CubeVizContext";
function Pe() {
  const e = jr(qn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function at() {
  return Pe().families;
}
function Df(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function dy({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((C) => C.family).join("|"), u = re(
    () => ma(ua, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = re(
    () => Df(e) ? $c(e) : e,
    [e]
  ), d = re(
    () => {
      var C;
      return {
        chartRamp: (C = t == null ? void 0 : t.chartRamp) != null && C.length ? t.chartRamp : jn,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: xo(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), g = re(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = re(() => a ?? {}, [a]), f = re(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), y = re(
    () => ({
      cubeClient: m,
      registry: h,
      families: u,
      locale: g,
      theme: d,
      maps: f
    }),
    [m, h, u, g, d, f]
  ), [k, w] = pt(null);
  return /* @__PURE__ */ l(qn.Provider, { value: y, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: O(
        "cv-root",
        d.mode === "dark" && "dark",
        d.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(Af, { container: k, children: /* @__PURE__ */ l(
        ta,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function pa({
  families: e,
  children: t
}) {
  const n = Pe(), r = (e ?? []).map((i) => i.family).join("|"), a = re(() => !e || e.length === 0 ? n : { ...n, families: ma(ua, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(de, { children: t }) : /* @__PURE__ */ l(qn.Provider, { value: a, children: t });
}
function Lf(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Ef = 5e3;
function Po(e, t) {
  const { cubeClient: n } = Pe(), r = (t == null ? void 0 : t.skip) ?? !1, a = re(
    () => e.limit === void 0 ? { ...e, limit: Ef } : e,
    [e]
  ), i = re(() => JSON.stringify(a), [a]), [o, s] = pt({ isLoading: !r }), [c, u] = pt(0), m = Ye(() => u((d) => d + 1), []);
  return an(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let d = !0;
    const g = new AbortController();
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: g.signal }).then((h) => {
      d && s({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      d && s({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      d = !1, g.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const Un = Mi(null);
Un.displayName = "DashboardContext";
function ga({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = lt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: qm(r, t), key: r });
  const i = a.current.store, o = If(i, r);
  return Ws(Un.Provider, { value: o }, n);
}
function If(e, t) {
  const n = Ye(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ye(
    (i) => Ao(i, e.getAll(), t),
    [e, t]
  ), a = Ye(
    (i) => jm(i, e.getAll(), t),
    [e, t]
  );
  return re(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Ff(e) {
  const t = Ti(e.store.subscribe, e.store.getAll, e.store.getAll);
  return re(
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
function $o() {
  const e = jr(Un);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Ff(e);
}
function ln() {
  return jr(Un);
}
const Pf = () => () => {
}, $f = Object.freeze({}), zf = Object.freeze([]);
function ir(e, t, n) {
  var M;
  const r = ln(), { locale: a } = Pe(), i = at(), o = lt(null);
  o.current === null && (o.current = Do());
  const s = o.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), m = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? $f,
    (r == null ? void 0 : r.decls) ?? zf
  ) : e, d = Ti(
    u && r ? r.store.subscribe : Pf,
    m,
    m
  ), { resultSet: g, isLoading: h, error: f, refetch: y } = Po(d, { skip: n == null ? void 0 : n.skip }), k = ((M = t.format) == null ? void 0 : M.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = re(() => Kn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: re(() => {
    if (g)
      return Ro(g, t, d, { unitSystem: k, conversions: w }, i);
  }, [g, t, d, k, w, i]), isLoading: h, error: f, refetch: y, resolvedQuery: d };
}
function it() {
  const { cubeClient: e } = Pe(), [t, n] = pt({ isLoading: !0 });
  return an(() => {
    let r = !0;
    return n({ isLoading: !0 }), zc(e).then((a) => {
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
function Hn() {
  const { locale: e } = Pe(), t = b.useMemo(() => Kn(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return b.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function fy() {
  const { locale: e } = Pe(), { formatValue: t, units: n } = e;
  return re(
    () => t ?? Eo(Kn(n)),
    [t, n]
  );
}
function zo() {
  const [e, t] = pt(0), n = lt(null), r = lt(null), a = lt(null), i = lt(0), o = Ye((u) => {
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
      const d = new ResizeObserver((g) => {
        var h, f;
        for (const y of g) {
          const k = ((f = (h = y.contentBoxSize) == null ? void 0 : h[0]) == null ? void 0 : f.inlineSize) ?? y.contentRect.width;
          o(k);
        }
      });
      d.observe(u), r.current = d;
    },
    [o, s]
  );
  return an(() => s, [s]), [c, e];
}
const Vf = "day";
function jf(e, t) {
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
        granularity: r.granularity ?? Vf,
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
const ne = (e) => he(e, "yyyy-MM-dd");
function Wf(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = wn(e[0]), i = wn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = al(i, a) + 1;
    return [ne(ye(a, o)), ne(ye(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = ye(t, 1);
    return [ne(a), ne(a)];
  }
  if (n === "yesterday") {
    const a = ye(t, 2);
    return [ne(a), ne(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [ne(ye(t, 2 * a - 1)), ne(ye(t, a))];
    if (i.startsWith("week")) return [ne(ye(t, 14 * a - 1)), ne(ye(t, 7 * a))];
    if (i.startsWith("month"))
      return [ne(ct(dt(t, 2 * a))), ne(ye(ct(dt(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [ne(ut(ft(t, 2 * a))), ne(ye(ut(ft(t, a)), 1))];
    if (i.startsWith("year"))
      return [ne(mt(ht(t, 2 * a))), ne(ye(mt(ht(t, a)), 1))];
  }
  if (n === "this week") {
    const a = hr(t, 1);
    return [ne(Cn(a)), ne(Nn(a))];
  }
  if (n === "this month") {
    const a = dt(t, 1);
    return [ne(ct(a)), ne(qt(a))];
  }
  if (n === "this quarter") {
    const a = ft(t, 1);
    return [ne(ut(a)), ne(Ut(a))];
  }
  if (n === "this year") {
    const a = ht(t, 1);
    return [ne(mt(a)), ne(Ht(a))];
  }
  if (n === "last week") {
    const a = hr(t, 2);
    return [ne(Cn(a)), ne(Nn(a))];
  }
  if (n === "last month") {
    const a = dt(t, 2);
    return [ne(ct(a)), ne(qt(a))];
  }
  if (n === "last quarter") {
    const a = ft(t, 2);
    return [ne(ut(a)), ne(Ut(a))];
  }
  if (n === "last year") {
    const a = ht(t, 2);
    return [ne(mt(a)), ne(Ht(a))];
  }
}
function Bf(e, t, n = Vn) {
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
  const s = Wf(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Kf = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function va({
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
  const { registry: c, locale: u, theme: m } = Pe(), d = at(), g = ((q = d.get(t.family)) == null ? void 0 : q.queryless) ?? !1, h = re(() => {
    var z;
    return (z = t.format) != null && z.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), f = re(() => {
    const z = e ?? {};
    return z.timezone || !(u != null && u.timezone) ? z : { ...z, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: y, isLoading: k, error: w, refetch: C, resolvedQuery: M } = ir(
    f,
    h,
    { skip: g }
  ), N = re(() => jf(f, h), [f, h]), S = ir(
    (N == null ? void 0 : N.query) ?? f,
    (N == null ? void 0 : N.chart) ?? h,
    { skip: !N }
  ), I = re(
    () => Bf(M, h, d),
    [M, h, d]
  ), L = ir(
    (I == null ? void 0 : I.query) ?? f,
    h,
    { skip: !I, skipResolve: !0 }
  ), K = re(
    () => ({ [h.family]: Lf(c, h.family, d) }),
    [c, h.family, d]
  ), A = re(() => {
    let z = y ?? Kf;
    if (N && S.data) {
      z = { ...z, series: S.data.series, categories: S.data.categories };
      const Z = z.raw.rows.length > 0, te = z.series.some((ee) => ee.data.some((ie) => ie !== null));
      z = { ...z, empty: !Z && !te };
    }
    if (I && L.data) {
      if (I.mode === "kpiRow") {
        const Z = L.data.raw.rows[0];
        if (Z) {
          const te = z.raw.rows[0];
          z = {
            ...z,
            raw: { ...z.raw, rows: te ? [te, Z] : [Z] }
          };
        }
      } else if (!L.data.empty) {
        const Z = new Map(L.data.series.map((te) => [te.key, te]));
        if (!z.empty && z.series.length > 0) {
          const te = z.categories.length, ee = z.series.map((ie) => {
            const le = Z.get(ie.key), oe = Array.from({ length: te }, (me, P) => (le == null ? void 0 : le.data[P]) ?? null);
            return {
              ...ie,
              key: `${ie.key}__prev`,
              label: `${ie.label} (prev)`,
              colorToken: ie.colorToken,
              data: oe,
              meta: { ...ie.meta, companion: !0 }
            };
          });
          z = { ...z, series: [...z.series, ...ee] };
        } else {
          const te = L.data.series.map((ee) => ({
            ...ee,
            key: `${ee.key}__prev`,
            label: `${ee.label} (prev)`,
            data: [...ee.data],
            meta: { ...ee.meta, companion: !0 }
          }));
          z = {
            ...z,
            categories: L.data.categories,
            series: te,
            empty: !1
          };
        }
      }
    }
    return z;
  }, [y, N, S.data, I, L.data]);
  an(() => {
    n == null || n({ rows: A.raw.rows, refetch: C, isLoading: k });
  }, [n, A.raw.rows, C, k]);
  const _ = {}, E = re(
    () => u.formatValue ?? Eo(Kn(u.units)),
    [u.formatValue, u.units]
  ), F = re(
    () => Zr(A.raw.annotation, h, E, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [A.raw.annotation, h, E, u.locale, u.unitSystem]
  ), D = h.mapping, W = re(
    () => ({
      categoryMember: D == null ? void 0 : D.category.member,
      pivotMember: (D == null ? void 0 : D.series.mode) === "pivot" ? D.series.pivot : void 0,
      formatCategory: F.category
    }),
    [D, F]
  );
  return /* @__PURE__ */ l(
    ta,
    {
      widgetId: i,
      target: W,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Mo,
        {
          data: A,
          options: h,
          config: _,
          format: F,
          state: g ? { loading: !1 } : { loading: k && !y, error: w },
          components: K,
          registry: d,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function qf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    va,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const Vo = "cube-viz-prose";
function Uf(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Hf({ doc: e }) {
  const t = Uf(e), n = re(
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
        attributes: { class: O(Vo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(Hi, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const gn = [
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
], Gf = Object.fromEntries(
  gn.map((e) => [e.value, e.label])
);
function ri(e) {
  return Gf[e.trim().toLowerCase()] ?? e;
}
const Yf = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Qf({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Hl(), a = O(No({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ v("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: O(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Hr, {})
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
        className: O(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(on, {})
      }
    )
  ] });
}
function Jf({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: O(
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
function jo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Ul,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: O("cv-cal", e),
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
        MonthCaption: Qf,
        DayButton: Jf,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? Hr : on, { className: O("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(Sn.Root, { "data-slot": "popover", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ l(Sn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Le({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = Fo();
  return /* @__PURE__ */ l(Sn.Portal, { container: a, children: /* @__PURE__ */ l(
    Sn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: O("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function xe({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Root, { "data-slot": "select", ...e });
}
function Tr({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Group, { "data-slot": "select-group", ...e });
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ l(Ce.Value, { "data-slot": "select-value", ...e });
}
function Te({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Trigger,
    {
      "data-slot": "select-trigger",
      className: O("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Ce.Icon, { asChild: !0, children: /* @__PURE__ */ l(nt, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Xf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(hl, {})
    }
  );
}
function Zf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(nt, {})
    }
  );
}
function Re({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const a = Fo();
  return /* @__PURE__ */ l(Ce.Portal, { container: a, children: /* @__PURE__ */ v(
    Ce.Content,
    {
      "data-slot": "select-content",
      className: O(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Xf, {}),
        /* @__PURE__ */ l(
          Ce.Viewport,
          {
            className: O(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Zf, {})
      ]
    }
  ) });
}
function Rr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ce.Label,
    {
      "data-slot": "select-label",
      className: O("cv-select-label", e),
      ...t
    }
  );
}
function pe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Item,
    {
      "data-slot": "select-item",
      className: O("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(Ce.ItemIndicator, { children: /* @__PURE__ */ l(Dt, {}) }) }),
        /* @__PURE__ */ l(Ce.ItemText, { children: t })
      ]
    }
  );
}
const _t = "cv-field", eh = "cv-field-label", zt = "yyyy-MM-dd";
function th(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ai(e) {
  if (!e) return;
  const t = Ei(e, zt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function nh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Yf, [i, o] = pt(!1), s = typeof e == "string", [c, u] = th(e), m = ai(c), d = ai(u), g = m ? { from: m, to: d } : void 0;
  let h;
  s ? h = ri(e) : m && d ? h = `${he(m, "MMM d, yyyy")} – ${he(d, "MMM d, yyyy")}` : m ? h = he(m, "MMM d, yyyy") : h = "Pick a date range";
  const f = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Ae, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(
      J,
      {
        variant: "outline",
        className: O(
          "cv-daterange-trigger",
          h === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l($i, {}),
          h
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((y) => /* @__PURE__ */ l(
        J,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(y), o(!1);
          },
          children: ri(y)
        },
        y
      )) }),
      /* @__PURE__ */ l(
        jo,
        {
          mode: "range",
          selected: g,
          defaultMonth: m,
          disabled: f,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([he(y.from, zt), he(y.to, zt)]) : y != null && y.from ? t([he(y.from, zt), he(y.from, zt)]) : t(["", ""]);
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
function ah({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = $o(), i = r.rangeVariable ? fa(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? Oo(i) : rh), s = typeof e == "string" ? e : "", c = o.join(",");
  return an(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ v(
    xe,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(Te, { className: _t, children: /* @__PURE__ */ l(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: o.map((u) => /* @__PURE__ */ l(pe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function ih({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: O(_t, "cv-field--multi"),
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
    xe,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(Te, { className: _t, children: /* @__PURE__ */ l(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Re, { children: r.options.map((i) => /* @__PURE__ */ l(pe, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function oh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = it(), o = re(() => {
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
      className: _t,
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
function sh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: _t,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function lh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: _t,
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
function ch({ value: e, onChange: t, decl: n }) {
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
const uh = {
  dateRange: nh,
  granularity: ah,
  select: ih,
  memberSelect: oh,
  text: sh,
  number: lh,
  toggle: ch
};
function mh({ control: e, title: t }) {
  var h;
  const { registry: n } = Pe(), { decls: r, resolveValue: a, setVar: i } = $o(), o = re(
    () => r.find((f) => f.name === e.variable),
    [r, e.variable]
  ), s = Bs();
  if (!o)
    return /* @__PURE__ */ v("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((h = n.controls) == null ? void 0 : h[c]) ?? uh[c], m = a(e.variable), d = (f) => i(e.variable, f), g = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: d, decl: o, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ l("label", { className: eh, htmlFor: s, children: g }),
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
const Wo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
Wo.displayName = "Card";
const Bo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
Bo.displayName = "CardHeader";
const Ko = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O("cv-card-title", e),
      ...t
    }
  )
);
Ko.displayName = "CardTitle";
const dh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-description", e), ...t })
);
dh.displayName = "CardDescription";
const fh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: O("cv-card-action", e),
      ...t
    }
  )
);
fh.displayName = "CardAction";
const qo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-content", e), ...t })
);
qo.displayName = "CardContent";
const hh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-footer", e), ...t })
);
hh.displayName = "CardFooter";
const _n = "cube-viz-drag-handle";
function Uo(e) {
  var s;
  const { registry: t } = Pe(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ v(Wo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ v(
      Bo,
      {
        ...i,
        className: O(_n, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(Ko, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(qo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class ii extends Ks {
  constructor() {
    super(...arguments);
    Jn(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v(In, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Ur, {}),
      /* @__PURE__ */ l(Fn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Pn, { children: n.message })
    ] }) : this.props.children;
  }
}
function ph(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function gh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function vh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const bh = /* @__PURE__ */ (() => {
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
let bt = null;
function Ho(e = {}) {
  return bt || (e.includeStyleProperties ? (bt = e.includeStyleProperties, bt) : (bt = Qe(window.getComputedStyle(document.documentElement)), bt));
}
function An(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function yh(e) {
  const t = An(e, "border-left-width"), n = An(e, "border-right-width");
  return e.clientWidth + t + n;
}
function kh(e) {
  const t = An(e, "border-top-width"), n = An(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Go(e, t = {}) {
  const n = t.width || yh(e), r = t.height || kh(e);
  return { width: n, height: r };
}
function wh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Se = 16384;
function Ch(e) {
  (e.width > Se || e.height > Se) && (e.width > Se && e.height > Se ? e.width > e.height ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se) : e.width > Se ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se));
}
function Dn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Nh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Sh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Nh(a);
}
const Ne = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ne(n, t);
};
function xh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Mh(e, t) {
  return Ho(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Th(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? xh(n) : Mh(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function oi(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = bh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Th(o, n, a, r)), t.appendChild(s);
}
function Rh(e, t, n) {
  oi(e, t, ":before", n), oi(e, t, ":after", n);
}
const si = "application/font-woff", li = "image/jpeg", Oh = {
  woff: si,
  woff2: si,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: li,
  jpeg: li,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function _h(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ba(e) {
  const t = _h(e).toLowerCase();
  return Oh[t] || "";
}
function Ah(e) {
  return e.split(/,/)[1];
}
function Or(e) {
  return e.search(/^(data:)/) !== -1;
}
function Dh(e, t) {
  return `data:${t};base64,${e}`;
}
async function Yo(e, t, n) {
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
const or = {};
function Lh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ya(e, t, n) {
  const r = Lh(e, t, n.includeQueryParams);
  if (or[r] != null)
    return or[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Yo(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Ah(s)));
    a = Dh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return or[r] = a, a;
}
async function Eh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Dn(t);
}
async function Ih(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Dn(s);
  }
  const n = e.poster, r = ba(n), a = await ya(n, r, t);
  return Dn(a);
}
async function Fh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Gn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Ph(e, t) {
  return Ne(e, HTMLCanvasElement) ? Eh(e) : Ne(e, HTMLVideoElement) ? Ih(e, t) : Ne(e, HTMLIFrameElement) ? Fh(e, t) : e.cloneNode(Qo(e));
}
const $h = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Qo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function zh(e, t, n) {
  var r, a;
  if (Qo(t))
    return t;
  let i = [];
  return $h(e) && e.assignedNodes ? i = Qe(e.assignedNodes()) : Ne(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Qe(e.contentDocument.body.childNodes) : i = Qe(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Ne(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Gn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Vh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Ho(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Ne(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function jh(e, t) {
  Ne(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ne(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Wh(e, t) {
  if (Ne(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Bh(e, t, n) {
  return Ne(t, Element) && (Vh(e, t, n), Rh(e, t, n), jh(e, t), Wh(e, t)), t;
}
async function Kh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Gn(u, t, !0));
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
async function Gn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Ph(r, t)).then((r) => zh(e, r, t)).then((r) => Bh(e, r, t)).then((r) => Kh(r, t));
}
const Jo = /url\((['"]?)([^'"]+?)\1\)/g, qh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Uh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Hh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Gh(e) {
  const t = [];
  return e.replace(Jo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Or(n));
}
async function Yh(e, t, n, r, a) {
  try {
    const i = n ? vh(t, n) : t, o = ba(t);
    let s;
    return a || (s = await ya(i, o, r)), e.replace(Hh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Qh(e, { preferredFontFormat: t }) {
  return t ? e.replace(Uh, (n) => {
    for (; ; ) {
      const [r, , a] = qh.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Xo(e) {
  return e.search(Jo) !== -1;
}
async function Zo(e, t, n) {
  if (!Xo(e))
    return e;
  const r = Qh(e, n);
  return Gh(r).reduce((i, o) => i.then((s) => Yh(s, o, t, n)), Promise.resolve(r));
}
async function yt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Zo(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Jh(e, t) {
  await yt("background", e, t) || await yt("background-image", e, t), await yt("mask", e, t) || await yt("-webkit-mask", e, t) || await yt("mask-image", e, t) || await yt("-webkit-mask-image", e, t);
}
async function Xh(e, t) {
  const n = Ne(e, HTMLImageElement);
  if (!(n && !Or(e.src)) && !(Ne(e, SVGImageElement) && !Or(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await ya(r, ba(r), t);
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
async function Zh(e, t) {
  const r = Qe(e.childNodes).map((a) => es(a, t));
  await Promise.all(r).then(() => e);
}
async function es(e, t) {
  Ne(e, Element) && (await Jh(e, t), await Xh(e, t), await Zh(e, t));
}
function ep(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const ci = {};
async function ui(e) {
  let t = ci[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, ci[e] = t, t;
}
async function mi(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), Yo(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function di(e) {
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
async function tp(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Qe(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = ui(c).then((m) => mi(m, t)).then((m) => di(m).forEach((d) => {
              try {
                a.insertRule(d, d.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (g) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
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
        const o = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(ui(a.href).then((s) => mi(s, t)).then((s) => di(s).forEach((c) => {
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
function np(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Xo(t.style.getPropertyValue("src")));
}
async function rp(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Qe(e.ownerDocument.styleSheets), r = await tp(n, t);
  return np(r);
}
function ts(e) {
  return e.trim().replace(/["']/g, "");
}
function ap(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(ts(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function ip(e, t) {
  const n = await rp(e, t), r = ap(e);
  return (await Promise.all(n.filter((i) => r.has(ts(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Zo(i.cssText, o, t);
  }))).join(`
`);
}
async function op(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await ip(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function sp(e, t = {}) {
  const { width: n, height: r } = Go(e, t), a = await Gn(e, t, !0);
  return await op(a, t), await es(a, t), ep(a, t), await Sh(a, n, r);
}
async function lp(e, t = {}) {
  const { width: n, height: r } = Go(e, t), a = await sp(e, t), i = await Dn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || wh(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || Ch(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function cp(e, t = {}) {
  return (await lp(e, t)).toDataURL();
}
function up(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function mp(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function dp(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function fp(e, t, n = 2) {
  const r = await cp(e, {
    pixelRatio: n,
    backgroundColor: dp(e),
    cacheBust: !0
  });
  mp(r, `${up(t)}.png`);
}
function hp({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const f = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    gh(ph(t), `${f}.csv`);
  }, d = async () => {
    const f = r == null ? void 0 : r.current;
    if (!(!f || a)) {
      i(!0), s(null);
      try {
        await fp(f, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, g = (f) => f.stopPropagation(), h = (f = !0) => O("cv-menu-item", !f && "cv-menu-item--disabled");
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ l(
      De,
      {
        onMouseDown: g,
        onPointerDown: g,
        onTouchStart: g,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(pl, {})
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv-menu", onMouseDown: g, onPointerDown: g, onTouchStart: g, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: h(), children: [
        /* @__PURE__ */ l(gl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ v("button", { type: "button", onClick: d, disabled: a, className: h(!a), children: [
        /* @__PURE__ */ l(vl, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !c, className: h(c), children: [
        /* @__PURE__ */ l(bl, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function fi({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        va,
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
      return /* @__PURE__ */ l(Hf, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(mh, { control: e.control, title: e.title });
  }
}
function _r({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = pt({ rows: [] }), s = Ye(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = lt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(ii, { children: /* @__PURE__ */ l(fi, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    hp,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    Uo,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(ii, { children: /* @__PURE__ */ l(
        fi,
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
const ns = (e) => e.filter((t) => t.type === "chart");
function pp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of ns(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && we(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function gp(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(we);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of ns(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function vp({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = ln(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => pp(e.widgets), [e.widgets]), c = b.useMemo(() => gp(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const m = b.useCallback(
    (f) => {
      var y, k;
      if (o) {
        const w = f != null && f.widgetId ? s.get(f.widgetId) : void 0;
        if (w) o(w, f ? [f.from, f.to] : void 0);
        else if (!f) for (const C of new Set(s.values())) o(C, void 0);
      }
      (k = (y = u.current).onRangeSelect) == null || k.call(y, f);
    },
    [o, s]
  ), d = b.useCallback(
    (f) => {
      var y, k;
      if (o)
        if (f) {
          const w = c.get(f.member);
          w && o(w, [String(f.value)]);
        } else
          for (const w of new Set(c.values())) o(w, void 0);
      (k = (y = u.current).onPointSelect) == null || k.call(y, f);
    },
    [o, c]
  ), g = !!(n || t && o && s.size), h = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    ta,
    {
      onRangeSelect: g ? m : void 0,
      onPointSelect: h ? d : void 0,
      children: a
    }
  );
}
const bp = "lg", yp = 640;
function kp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function wp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function hy({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = zo(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, d = c.margin ?? [12, 12], g = c.containerPadding ?? d, h = re(
    () => ({ [bp]: wp(e.layout) }),
    [e.layout]
  ), f = re(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), y = !t && s > 0 && s < yp;
  return /* @__PURE__ */ l(pa, { families: n, children: /* @__PURE__ */ l(ga, { spec: e, children: /* @__PURE__ */ l(
    vp,
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
            padding: `${g[1]}px ${g[0]}px`
          },
          children: kp(e.layout).map((k) => {
            const w = f.get(k.i);
            if (!w) return null;
            const C = k.h * m + (k.h - 1) * d[1];
            return /* @__PURE__ */ l("div", { style: { height: C }, children: /* @__PURE__ */ l(_r, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        qi,
        {
          width: s,
          layouts: h,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: d,
          containerPadding: g,
          dragConfig: { enabled: t, handle: `.${_n}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = f.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(_r, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function py({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(pa, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Uo,
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
        qf,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function rs(e, t = "None") {
  if (we(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => rs(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Cp(e) {
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
function Np(e, t) {
  const n = new Set(Cp(t));
  return e.filter((r) => n.has(r.type));
}
function Sp(e) {
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
function xp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function Mp(e, t, n) {
  const r = Sp(e), a = { name: xp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const sr = Je.options, Ar = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Tp(e, t = "None") {
  const n = rs(e, t);
  return n === Mt ? "Auto" : Ar[n] ?? n;
}
const lr = "__none__";
function as({
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
  className: m
}) {
  const d = n && n.length > 0 ? n : sr, g = e && e !== Mt && !d.includes(e) ? [...d, e].sort(
    (f, y) => sr.indexOf(f) - sr.indexOf(y)
  ) : d, h = a ? `Auto (${Ar[a]})` : "Auto";
  return /* @__PURE__ */ v(
    xe,
    {
      value: e ?? (i ? lr : ""),
      onValueChange: (f) => t(f === lr ? void 0 : f),
      disabled: c,
      children: [
        /* @__PURE__ */ l(Te, { id: u, className: m, children: /* @__PURE__ */ l(Me, { placeholder: s }) }),
        /* @__PURE__ */ v(Re, { children: [
          i ? /* @__PURE__ */ l(pe, { value: lr, children: o }) : null,
          r ? /* @__PURE__ */ l(pe, { value: Mt, children: h }) : null,
          g.map((f) => /* @__PURE__ */ l(pe, { value: f, children: Ar[f] }, f))
        ] })
      ]
    }
  );
}
function Yn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Rp(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Op(e) {
  return Dr(e, "category");
}
function Dr(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function ze(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function ka(e) {
  return e ? e.cubes.filter((t) => ze(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Yn(t),
    joinTargets: Rp(t),
    category: Op(t),
    path: Dr(t, "path"),
    grain: Dr(t, "grain")
  })) : [];
}
function _p(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function Nt(e, t) {
  if (!(!e || !t))
    return ka(e).find((n) => n.name === t);
}
function wa(e) {
  return e.shortTitle || e.title || e.name;
}
function Fe(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function is(e) {
  return Fe(e.meta, "group");
}
function Ap(e) {
  return Fe(e.meta, "geoPoint");
}
function hi(e) {
  const t = Fe(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Dp(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function vn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Lp(e, t) {
  if (t)
    return nn(e, "time", t).find(vn);
}
function Ep(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = is(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Ip(e) {
  return Fe(e.meta, "agg");
}
function Fp(e) {
  const t = Fe(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function Pp(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.aggDefault) === !0;
}
function pi(e) {
  return Fe(e.meta, "familyTitle");
}
function $p(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? `per ${t[1]}` : "per row";
}
function zp(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const a = Fp(r.option);
    if (!a) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(a);
    i || (i = { familyKey: a, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(a, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const a = r.variants.find((s) => pi(s.option)), i = r.variants.findIndex((s) => Pp(s.option)), o = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : o >= 0 ? o : 0, r.label = pi((a == null ? void 0 : a.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function Ca(e, t) {
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
function os(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: wa(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Fe(n, "quantity"),
    unit: Fe(n, "unit")
  };
}
function bn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: wa(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Fe(n, "quantity"),
    unit: Fe(n, "unit")
  };
}
function ss(e, t) {
  return {
    name: e.name,
    label: wa(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Vp(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = Ap({ meta: i });
    !o || !ze(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && hi({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && hi({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Dp(o[0].name, s[0].name),
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
function nn(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!ze(a) || n && a.name !== n) continue;
    const i = Yn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Vp(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        ze(s) && o(os(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        ze(s) && s.type !== "time" && o(bn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        ze(s) && s.type === "time" && o(bn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        ze(s) && s.type === "number" && o(bn(s, a.name));
  }
  return r;
}
function jp(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!ze(a) || n && !n.has(a.name)) continue;
    const i = Yn(a);
    for (const o of a.segments) {
      if (!ze(o)) continue;
      const s = ss(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Ve(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Yn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(os(i, n.name)) : a(bn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(ss(o, n.name));
    }
    return nn(e, "geoPoint").find((n) => n.name === t);
  }
}
function gi(e) {
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
const Lr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), ls = {
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
function Wp(e) {
  return e === "number";
}
function $e(e) {
  return e.target !== void 0;
}
function be(e, t) {
  return e.kinds.includes(t);
}
function Na(e, t, n) {
  if (!be(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function gt(e) {
  return e.chart.familyOptions ?? {};
}
function Sa(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function cs(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Bp(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Kp(e, t, n) {
  var o, s;
  const r = e.chart;
  if (Sa(r)) return;
  const a = cn(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = gt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function It(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = gt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!$e(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = cn(a);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = cs(a), d = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, d);
        break;
      }
      case "pivot": {
        const m = Sa(a) ?? Kp(e, t, n);
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
function xa(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Ma(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function qp(e, t) {
  return { ...e, dimensions: xa(e.dimensions, t) };
}
function us(e, t) {
  const n = Ma(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function ms(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function gy(e) {
  return e === void 0 ? Zp : ha(e);
}
const Up = "last 30 days";
function Ft(e, t, n, r) {
  if (Wp(n)) return { ...e, measures: xa(e.measures, t) };
  if (n === "time") {
    const a = un(e) ?? r;
    return ms(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? Mt,
      dateRange: a ? a.dateRange : Up
    });
  }
  return qp(e, t);
}
function Vt(e, t, n, r) {
  const a = e.query ?? {}, i = It(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = un(a);
  if ((o == null ? void 0 : o.dimension) === n) return ms(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = Ma(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return us(a, n);
}
function Hp(e, t, n, r) {
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
  return { category: { member: e }, series: hs(t, r) };
}
function Yt(e, t, n) {
  var c, u;
  const r = It(e, t, n), a = (m) => t.find((d) => {
    var g;
    return ((g = d.target) == null ? void 0 : g.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : cn(e.chart),
    measures: o ? r[o.id] ?? [] : cs(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Sa(e.chart)
  };
}
function Qt(e, t, n) {
  const r = { ...fs(e.chart), ...Bp(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Hp(n.category, n.measures, n.pivot, r)
    }
  };
}
function Ln(e, t, n) {
  const r = { ...gt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Ta(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !$e(i)) return e;
  const o = i.target, s = It(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = un(c);
      u && u !== r && (c = Vt(e, t, u, n)), c = Ft(c, r, a, m);
      const d = Yt({ ...e, query: c }, t, [r]);
      return Qt(e, c, { ...d, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : xa(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = Vt(e, t, s[0], n)), c = Ft(c, r, a);
      const m = Yt({ ...e, query: c }, t, [r]);
      return Qt(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = Vt(e, t, u, n)), c = Ft(c, r, a);
      const m = Yt({ ...e, query: c }, t, [r]);
      return Qt(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = Vt(e, t, u, n)), c = Ft(c, r, a), Ln(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(gt(e)[o.key]) ? [...gt(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = Ft(c, r, a), Ln(e, c, { [o.key]: u });
    }
  }
}
function Gp(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !$e(a)) return e;
  const i = a.target, o = Vt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Yt(e, t), c = Ma(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : us(o, s.pivot);
      return Qt(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Yt(e, t);
      return Qt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return Ln(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(gt(e)[i.key]) ? gt(e)[i.key] : [];
      return Ln(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function Yp(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = un(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Qp(e, t) {
  if (be(t, e)) return e;
  if (e === "category" && be(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && be(t, "category") || e === "time" && be(t, "category")) return "category";
}
function Jp(e, t, n) {
  const r = It(e, t), a = /* @__PURE__ */ new Map();
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
    if (!$e(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = Qp(Yp(e, u), o);
      m && (i = Ta(i, n, o.id, u, m));
    }
  }
  return i;
}
function Xp(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!$e(a)) continue;
    const i = n.findIndex((o) => be(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function jt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ds(e) {
  var o, s, c, u, m;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return jt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return jt(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return jt(a);
  const i = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return jt(i);
}
function Er(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function fs(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function cn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function un(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function hs(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Zp = "day";
function Ir(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function eg(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Ir(r) && Ir(a) ? Jp(e, r.wells, a.wells) : tg(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function tg(e, t) {
  var h;
  const { chart: n } = e, r = e.query ?? {}, a = Er(n).length ? Er(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((f) => f.dimension), o = cn(n) ?? ((h = r.dimensions) == null ? void 0 : h[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (f, y, k) => !!f && k.indexOf(f) === y
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Ir(t)) {
    const f = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: f } } : c;
  }
  const u = [...a], m = [...s], d = (f) => i.includes(f) ? "time" : "category";
  let g = c;
  for (const f of t.wells) {
    if (!f.target || !f.channel) continue;
    const y = be(f, "category") ? [
      [m, d],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, d]
    ];
    let k = 0;
    for (const [w, C] of y)
      for (let M = 0; M < w.length; ) {
        if (f.cardinality === "one" && k > 0 || !be(f, C(w[M]))) {
          M += 1;
          continue;
        }
        g = Ta(g, t.wells, f.id, w[M], C(w[M])), w.splice(M, 1), k += 1;
      }
  }
  return g;
}
function ps(e) {
  return Mf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function gs(e) {
  return Rf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function ng(e, t) {
  return t.require(e).wells;
}
function vs(e, t) {
  var i;
  const n = t.require(e.chart.family), r = It(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function Wt(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Ta(e, o.wells, n, r, a);
  return ag(e, s, o.wells);
}
function rg(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = Gp(e, i.wells, n, r);
  return bs(e, o, i.wells);
}
function ag(e, t, n) {
  return ig(e, bs(e, t, n));
}
function ig(e, t) {
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
function bs(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(It(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
const ge = b.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = b.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: O("cv-input", e),
        ...r
      }
    );
  }
);
ge.displayName = "Input";
function Fr({ option: e }) {
  const t = Hn();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ca(e, t) });
}
function ys({
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
  const { meta: u, isLoading: m } = it(), d = b.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return nn(u, n).filter((k) => y.has(k.cube));
    }
    return nn(u, n, e);
  }, [u, n, e, t]), g = b.useMemo(() => {
    const y = og(d), k = y.length > 1, w = [];
    for (const [C, M] of y)
      for (const [N, S] of Ep(M, () => "Other")) {
        const I = k ? N === "Other" ? C : `${C} · ${N}` : N;
        w.push({ key: `${C}:${N}`, label: I, items: S });
      }
    return w;
  }, [d]), h = g.length > 1, f = d.find((y) => y.name === r);
  return /* @__PURE__ */ v(xe, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(Te, { id: s, className: c, children: /* @__PURE__ */ l(Me, { placeholder: m ? "Loading…" : i, children: f ? /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Fr, { option: f }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: f.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Re, { children: g.map((y) => /* @__PURE__ */ v(Tr, { children: [
      h && y.label ? /* @__PURE__ */ l(Rr, { children: y.label }) : null,
      y.items.map((k) => /* @__PURE__ */ l(pe, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Fr, { option: k }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, y.key)) })
  ] });
}
function og(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function St({
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
      className: O("cv-segmented", s),
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
            className: O(
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
function vi(e) {
  return e.reason === void 0;
}
function sg(e, t, n, r, a) {
  const i = Na(e, t, [...n]);
  return i ? lg(i, e, r) : a == null ? void 0 : a(r);
}
function lg(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function cg(e, t, n) {
  if (t !== void 0 && ps(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${gs(e)}`;
}
const Ra = "cube-viz:field-picker:only-compatible";
function ks() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function ws() {
  var e;
  try {
    return ((e = ks()) == null ? void 0 : e.getItem(Ra)) !== "0";
  } catch {
    return !0;
  }
}
function ug(e) {
  try {
    const t = ks();
    if (!t) return;
    t.setItem(Ra, e ? "1" : "0");
  } catch {
  }
}
let Pr = ws();
const yn = /* @__PURE__ */ new Set();
let kt;
function mg() {
  for (const e of [...yn]) e();
}
function Cs(e) {
  e !== Pr && (Pr = e, mg());
}
function dg() {
  if (kt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Ra || Cs(ws());
  };
  e.addEventListener("storage", t), kt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const fn = {
  get: () => Pr,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    ug(e), Cs(e);
  },
  subscribe: (e) => (yn.add(e), dg(), () => {
    yn.delete(e), yn.size === 0 && (kt == null || kt(), kt = void 0);
  })
}, fg = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Cl, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(Ea, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(Ea, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Wi, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(wl, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, bi = ["geoPoint", "number", "numberDimension", "category", "time"];
function Ns({
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
  var me, P;
  const { meta: u, isLoading: m } = it(), [d, g] = b.useState(!1), [h, f] = b.useState(""), y = b.useSyncExternalStore(
    fn.subscribe,
    fn.get,
    fn.getServer
  ), k = fn.set, w = b.useId(), [C, M] = b.useState(r.viewLocked ?? "tables"), [N, S] = b.useState({}), [I, L] = b.useState({});
  b.useEffect(() => {
    d && M(r.viewLocked ?? "tables");
  }, [d, r.viewLocked]);
  const K = b.useMemo(() => new Set(t), [t]), A = h.trim().toLowerCase(), _ = Hn(), E = b.useMemo(() => {
    if (C !== "tables") {
      const $ = r.views.find((Y) => Y.name === C) ?? Nt(u, C);
      return $ ? [{ cube: $, tag: "dataset" }] : [];
    }
    const R = [];
    r.sourceCube && R.push({ cube: r.sourceCube, tag: "source" });
    const U = r.relatedCubes.some(($) => $.path ?? $.category) ? "More tables" : "Related tables", H = ($) => $.path ? _p($.path) : $.category, T = /* @__PURE__ */ new Map();
    for (const $ of r.relatedCubes) {
      const Y = H($);
      Y !== void 0 && !T.has(Y) && T.set(Y, T.size);
    }
    const x = [...r.relatedCubes].sort(($, Y) => {
      const j = H($), V = H(Y);
      return j === V ? 0 : j === void 0 ? 1 : V === void 0 ? -1 : (T.get(j) ?? 0) - (T.get(V) ?? 0);
    });
    for (const $ of x) R.push({ cube: $, tag: "related", heading: H($) ?? U });
    return R;
  }, [C, r, u]), F = [
    ...bi.filter((R) => be(e, R)),
    ...bi.filter((R) => !be(e, R))
  ], D = (R) => {
    const B = [], U = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Set();
    for (const T of F) {
      const x = fg[T], $ = Na(e, T, n ?? []);
      let Y = nn(u, x.metaKind, R);
      T === "time" && (Y = [...Y].sort(
        (j, V) => Number(vn(V)) - Number(vn(j))
      ));
      for (const j of Y) {
        if (K.has(j.name) || H.has(j.name) || A && !(j.label.toLowerCase().includes(A) || j.name.toLowerCase().includes(A))) continue;
        H.add(j.name);
        const V = is(j), Q = V ? `g:${V.toLowerCase()}` : `k:${x.label}`;
        let ve = U.get(Q);
        ve || (ve = {
          key: Q,
          label: V ?? x.label,
          headerIcon: V ? void 0 : x.icon,
          rejected: $ !== void 0,
          items: []
        }, U.set(Q, ve), B.push(Q)), $ === void 0 && (ve.rejected = !1), ve.items.push({
          option: j,
          kind: T,
          reason: sg(e, T, n ?? [], j, a)
        });
      }
    }
    return B.map((T) => U.get(T));
  }, W = E.map((R) => ({ section: R, groups: D(R.cube.name) })).filter((R) => R.groups.length > 0), q = y ? W.reduce(
    (R, B) => R + B.groups.reduce((U, H) => U + H.items.filter((T) => !vi(T)).length, 0),
    0
  ) : 0, z = y ? W.map((R) => ({
    section: R.section,
    groups: R.groups.map((B) => ({ ...B, rejected: !1, items: B.items.filter(vi) })).filter((B) => B.items.length > 0)
  })).filter((R) => R.groups.length > 0) : W, Z = z.length > 0, te = !Z && q > 0, ee = (R, B) => {
    i(R, B), g(!1), f("");
  }, ie = C === "tables" ? "All related tables" : ((me = r.views.find((R) => R.name === C)) == null ? void 0 : me.title) ?? ((P = Nt(u, C)) == null ? void 0 : P.title) ?? C, le = r.viewLocked ? r.views.filter((R) => R.name === r.viewLocked) : [], oe = y ? q > 0 ? `Only compatible fields — ${q} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ v(Ae, { open: d, onOpenChange: g, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: c }),
    /* @__PURE__ */ v(Le, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ v("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ v("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(yl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: h,
              onChange: (R) => f(R.target.value),
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
            "aria-label": oe,
            title: oe,
            onClick: () => k(!y),
            className: O("cv-picker-compat", y && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(kl, { className: "cv-ec-icon" }),
              y && q > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: q }) : null
            ]
          }
        ),
        le.length > 0 ? /* @__PURE__ */ l(
          hg,
          {
            browse: C,
            label: ie,
            views: le,
            onBrowse: M
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: Z ? z.map(({ section: R, groups: B }, U) => {
        const H = B.reduce((V, Q) => V + Q.items.length, 0), T = R.tag === "related", x = N[R.cube.name] ?? T, $ = A.length > 0 ? !0 : !x, Y = U > 0 ? z[U - 1].section : void 0, j = R.tag === "related" && R.heading !== void 0 && ((Y == null ? void 0 : Y.tag) !== "related" || Y.heading !== R.heading);
        return /* @__PURE__ */ v("div", { children: [
          j ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: R.heading }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => S((V) => ({ ...V, [R.cube.name]: !x })),
              className: "cv-picker-table",
              children: [
                $ ? /* @__PURE__ */ l(nt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(on, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(zi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: R.cube.title }),
                R.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: R.cube.grain }) : null,
                R.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : R.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: H })
              ]
            }
          ),
          $ ? B.map((V) => /* @__PURE__ */ v(
            "div",
            {
              className: O(
                "cv-picker-group",
                V.rejected && "cv-picker-group--rejected"
              ),
              children: [
                B.length > 1 ? /* @__PURE__ */ v("div", { className: "cv-picker-group-header", children: [
                  V.headerIcon,
                  V.label,
                  V.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                zp(V.items).map((Q) => {
                  const ve = Q.familyKey ? I[Q.familyKey] : void 0, Oe = Q.variants.findIndex((Ee) => Ee.option.name === ve), G = Oe >= 0 ? Oe : Q.defaultIndex, { option: se, kind: fe, reason: ot } = Q.variants[G], mn = Q.familyKey ? {
                    options: Q.variants.map((Ee, $s) => ({
                      label: pg(Ee.option, Nt(u, Ee.option.cube)),
                      selected: $s === G,
                      disabled: Ee.reason !== void 0,
                      title: Ee.reason,
                      onSelect: () => {
                        L((zs) => ({ ...zs, [Q.familyKey]: Ee.option.name }));
                      }
                    }))
                  } : void 0;
                  return /* @__PURE__ */ l(
                    gg,
                    {
                      option: se,
                      label: Q.familyKey ? Q.label : void 0,
                      unitBadge: Ca(se, _),
                      badge: fe === "time" && vn(se) ? "default" : void 0,
                      reason: ot,
                      agg: mn,
                      onPick: () => ee(se.name, fe)
                    },
                    Q.familyKey ?? se.name
                  );
                })
              ]
            },
            V.key
          )) : null
        ] }, R.cube.name);
      }) : te ? /* @__PURE__ */ v("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ v("p", { children: [
          q,
          " ",
          A ? "matching " : "",
          "field",
          q === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          q === 1 ? "it" : "them",
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
function hg({ browse: e, label: t, views: n, onBrowse: r }) {
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
        children: /* @__PURE__ */ l(Vi, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(yi, { active: e === "tables", icon: /* @__PURE__ */ l(zi, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(de, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          yi,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(ji, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function yi({
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
      className: O(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Dt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function pg(e, t) {
  const n = Ip(e) ?? "";
  return n === "value" ? $p(t == null ? void 0 : t.grain) : n;
}
function gg({ option: e, label: t, reason: n, onPick: r, unitBadge: a, badge: i, agg: o }) {
  const s = a ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: a }) : null, c = t ?? e.label, u = o ? /* @__PURE__ */ l("span", { className: "cv-picker-aggseg", role: "radiogroup", "aria-label": "Aggregation", children: o.options.map((d) => /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": d.selected,
      disabled: d.disabled,
      title: d.title ?? `Aggregation: ${d.label}`,
      onClick: d.onSelect,
      className: O("cv-picker-aggseg-opt", d.selected && "cv-picker-aggseg-opt--on"),
      children: d.label
    },
    d.label
  )) }) : null, m = n ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: n,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ v("span", { className: "cv-picker-row-main", children: [
          s,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: c })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: n })
      ]
    }
  ) : /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: r,
      title: e.description ?? e.name,
      className: "cv-picker-row",
      children: [
        s,
        /* @__PURE__ */ l("span", { className: "cv-picker-row-label", children: c }),
        i ? /* @__PURE__ */ l("span", { className: "cv-picker-badge", children: i }) : null
      ]
    }
  );
  return u ? /* @__PURE__ */ v("span", { className: "cv-picker-rowwrap", children: [
    m,
    u
  ] }) : m;
}
const vg = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Bt = "yyyy-MM-dd";
function bg(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ki(e) {
  if (!e) return;
  const t = Ei(e, Bt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Oa({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = bg(e), s = ki(i), c = ki(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${he(s, "MMM d, yyyy")} – ${he(c, "MMM d, yyyy")}` : s ? he(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(J, { variant: "outline", size: "sm", className: O("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l($i, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: O("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Le, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-daterange-presets", children: [
        vg.map((d) => /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "sm",
            className: O("cv-daterange-preset", e === d && "cv-daterange-preset--active"),
            onClick: () => {
              t(d), r(!1);
            },
            children: d
          },
          d
        )),
        /* @__PURE__ */ l(
          J,
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
        jo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (d) => {
            d != null && d.from && d.to ? t([he(d.from, Bt), he(d.to, Bt)]) : d != null && d.from ? t([he(d.from, Bt), he(d.from, Bt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Ss = b.createContext({});
function yg({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Ss.Provider, { value: n, children: t });
}
function kg() {
  return b.useContext(Ss);
}
function wg({ kind: e, value: t, onChange: n, className: r }) {
  const a = ln(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = kg(), [s, c] = b.useState(!1), [u, m] = b.useState(!1), [d, g] = b.useState(""), h = b.useMemo(() => Np(i, e), [i, e]), f = h.find((w) => w.name === t), y = (w) => {
    n(w), c(!1), m(!1);
  }, k = () => {
    if (!o) return;
    const w = Mp(e, d || "Variable", i);
    o(w), y(w.name), g("");
  };
  return /* @__PURE__ */ v(
    Ae,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(J, { variant: "outline", size: "sm", className: O("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Nl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: O("cv-var-trigger-label", !f && "cv-var-trigger-label--placeholder"), children: f ? f.label ?? f.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Le, { align: "start", className: "cv-var-popover", children: [
          h.length > 0 ? h.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => y(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Dt, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ v("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              ge,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: d,
                onChange: (w) => g(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(J, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(xt, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function At({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = we(t), [o, s] = b.useState(i ? "var" : "fixed");
  b.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => O("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ v("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ v("div", { className: "cv-bind-toggle", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), we(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      wg,
      {
        kind: e,
        value: we(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(we(t) ? void 0 : t, (u) => n(u))
  ] });
}
const Cg = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function cr(e) {
  return "member" in e && "operator" in e;
}
function Ng({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var _;
  const { meta: s } = it(), c = ((_ = ln()) == null ? void 0 : _.decls) ?? [], [u, m] = b.useState(null), [d, g] = b.useState(null), h = r ?? [], f = h.length === 1 && !cr(h[0]) && "or" in h[0] && Array.isArray(h[0].or) && h[0].or.every(cr) ? h[0] : void 0, y = f ? "any" : "all", k = [], w = [];
  f || h.forEach((E) => cr(E) ? k.push(E) : w.push(E));
  const C = f ? f.or : k, M = w.length === 0 && (C.length >= 2 || y === "any"), N = (E) => y === "any" ? E.length ? [{ or: E }] : [] : [...E, ...w], S = (E) => {
    const F = E.filter((W) => W.member.length > 0), D = N(F);
    a(D.length > 0 ? D : void 0);
  }, I = (E) => {
    const F = E === "any" ? C.length ? [{ or: C }] : [] : [...C];
    a(F.length > 0 ? F : void 0);
  }, L = (E, F) => S(C.map((D, W) => W === E ? { ...D, ...F } : D)), K = (E) => S(C.filter((F, D) => D !== E)), A = (E) => {
    const D = { ...d ?? { member: "", operator: "equals", values: [] }, ...E };
    D.member ? (g(null), m(C.length), S([...C, D])) : g(D);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: O("cv-filter-builder", o), children: [
    C.length === 0 && !d ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    M ? /* @__PURE__ */ v("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        St,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: y,
          onChange: I
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    C.map((E, F) => {
      const D = Ve(s, E.member);
      return u === F ? /* @__PURE__ */ l(
        wi,
        {
          leaf: E,
          member: D,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (W) => L(F, W),
          onDone: () => m(null),
          onRemove: () => K(F)
        },
        F
      ) : /* @__PURE__ */ l(
        Sg,
        {
          text: xg(E, D == null ? void 0 : D.label, c),
          disabled: i,
          onEdit: () => m(F),
          onRemove: () => K(F)
        },
        F
      );
    }),
    d ? /* @__PURE__ */ l(
      wi,
      {
        leaf: d,
        member: Ve(s, d.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: A,
        onRemove: () => g(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ v("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      J,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!d,
        onClick: () => {
          m(null), g({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(xt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Sg({
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
      J,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(Lt, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function wi({
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
  const { meta: u } = it(), m = gi(t == null ? void 0 : t.type), d = m.includes(e.operator) ? e.operator : m[0], g = !Lr.has(d), h = b.useId(), f = b.useId(), y = b.useId(), k = b.useId(), w = b.useId(), C = b.useId();
  b.useEffect(() => {
    d !== e.operator && o({ operator: d });
  }, [e.operator, o, d]);
  const M = (N) => {
    const S = Ve(u, N);
    o({ member: N, operator: gi(S == null ? void 0 : S.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ v("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ v(J, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Dt, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l(Lt, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Ns,
          {
            well: Cg,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: M,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                id: f,
                disabled: i,
                "aria-labelledby": `${h} ${f}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ v("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(Fr, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(nt, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        ys,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: M,
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
          value: d,
          onValueChange: (N) => o({
            operator: N,
            values: Lr.has(N) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              Te,
              {
                id: k,
                "aria-labelledby": `${y} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Me, {})
              }
            ),
            /* @__PURE__ */ l(Re, { children: m.map((N) => /* @__PURE__ */ l(pe, { value: N, children: ls[N] }, N)) })
          ]
        }
      )
    ] }),
    g ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: C, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Mg,
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
function xg(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = ls[e.operator] ?? e.operator;
  if (Lr.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (we(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Mg({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && we(i[0]);
  if (t === "time") {
    const u = o ? i[0] : Tg(i);
    return /* @__PURE__ */ l(
      At,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : we(m) ? [m] : Rg(m)),
        renderFixed: (m, d) => /* @__PURE__ */ l(Oa, { value: m, onChange: d })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !we(u));
  return /* @__PURE__ */ l(
    At,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : we(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(
        ge,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (d) => m(Og(d.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Tg(e) {
  const t = e.filter((n) => !we(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Rg(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Og(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function _g({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ v(
      De,
      {
        className: O(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Sl, { className: "cv-ec-icon--lg" }),
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
      /* @__PURE__ */ l(Ag, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Ng, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function Ag({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = it(), a = jp(r, n);
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
        className: O(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function Dg(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Lg({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var d;
  const i = ((d = e.chart.axes) == null ? void 0 : d[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", c = b.useId(), u = b.useId(), m = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ v("div", { className: O("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": m },
        value: o,
        placeholder: "No title",
        onChange: (g) => Dg(e, t, n, { label: g.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function Eg({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ v("div", { className: O("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
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
          n ? /* @__PURE__ */ l(xl, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Ml, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const xs = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: O("cv-label", e),
      ...t
    }
  )
);
xs.displayName = "Label";
function ue({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: O("cv-field-row", i), children: [
    /* @__PURE__ */ v("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(xs, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function $r({
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
      className: O("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function et({
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
      className: O("cv-switch-row", i),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: o,
            className: O("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l($r, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Ig = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, Fg = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function Pg({ spec: e, update: t }) {
  var w, C, M;
  const n = at(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((C = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : C.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", d = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", g = ((M = r.transform) == null ? void 0 : M.kind) ?? "none", h = da(o) ? /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      ue,
      {
        label: "Compare",
        hint: g === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ v(
          xe,
          {
            value: g,
            onValueChange: (N) => {
              var S;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((S = r.transform) == null ? void 0 : S.window) ?? hn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(Te, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Me, {}) }),
              /* @__PURE__ */ l(Re, { children: Fg.map((N) => /* @__PURE__ */ l(pe, { value: N, children: Ig[N] }, N)) })
            ]
          }
        )
      }
    ),
    g === "rollingAvg" ? /* @__PURE__ */ l(zg, { label: "Window (points)", children: (N) => {
      var S;
      return /* @__PURE__ */ l(
        ge,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((S = r.transform) == null ? void 0 : S.window) ?? hn,
          onChange: (I) => {
            const L = parseInt(I.target.value, 10), K = Number.isFinite(L) ? Math.min(90, Math.max(2, L)) : hn;
            s({ transform: { kind: "rollingAvg", window: K } });
          }
        }
      );
    } }) : null
  ] }) : null, f = /* @__PURE__ */ l(ue, { label: "Line shape", children: /* @__PURE__ */ l(
    St,
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
  ) }), y = /* @__PURE__ */ l(ue, { label: "Stacked", children: /* @__PURE__ */ l(
    St,
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
        return /* @__PURE__ */ v(de, { children: [
          /* @__PURE__ */ l(
            et,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (I) => s({ orientation: I ? "horizontal" : "vertical" })
            }
          ),
          y
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return f;
      case "area":
        return /* @__PURE__ */ v(de, { children: [
          f,
          y,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((S = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : S.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(de, { children: [
          /* @__PURE__ */ l(
            et,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (I) => c({ innerRadiusPct: I ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ue, { label: "Slice labels", children: /* @__PURE__ */ l(
            St,
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
              onChange: (I) => c({ showLabels: I })
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
    h
  ] });
}
function $g(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || da(n);
}
function zg({
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
function Ts(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!$e(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      be(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function Vg(e) {
  let t = 0;
  for (const n of e)
    $e(n) && (t += n.optional ? 1 : 3);
  return t;
}
function jg(e, t) {
  return e.some((n) => $e(n) && n.cardinality === "many" && be(n, t));
}
const Wg = 0.35, Bg = 0.4, Kg = 0.3, qg = 0.1;
function Ug(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Kg : e.supportsCartesianAxes ? qg : e.wells.some(
    (a) => $e(a) && a.channel === "x" && be(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Rs(e) {
  const t = e.filter($e);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Hg(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const Gg = (e, t, n) => e === 1 ? t : n;
function Yg(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Hg(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${Gg(r, "measure", "measures")}`;
  return Rs(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function Qg(e, t) {
  const n = Ms(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = Ts(s, n), u = Vg(s), m = Math.max(0, n.length - c.matched.length), d = Xp(s, r) + 0.5 * m, g = u > 0 ? d / u : 0, h = c.leftover.filter(
      (y) => y.kind !== "time" && !jg(s, y.kind)
    ).length, f = g - Wg * h + Ug(o, a) - (Rs(s) ? Bg : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(f * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: Yg(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function Jg(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Xg(e, t, n) {
  const r = e.require(n), a = Ts(r.wells, Ms(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = Wt(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function Os(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(eg(e, r, n));
  };
}
function Zg({ spec: e, update: t, empty: n }) {
  const r = at(), a = e.chart.family, i = Os(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ v("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(_s, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function ev({ spec: e, update: t }) {
  const n = at(), r = e.chart.family, a = Os(e, t, n), i = n.require(r), o = i.icon;
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
          /* @__PURE__ */ l(nt, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(_s, { spec: e, family: r, onPick: a, families: n }),
      $g(r, n) ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Pg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function _s({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => Qg(r, e), [r, e]), i = b.useMemo(() => Jg(a), [a]), o = b.useMemo(
    () => new Map(a.map((d) => [d.family, d])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((d) => d.fits).map((d) => d.family)),
    [a]
  ), c = av(e, r, s), u = (d, g) => /* @__PURE__ */ l(
    tv,
    {
      fit: d,
      active: d.family === t,
      preview: c.get(d.family),
      families: r,
      reason: g ? d.reason : void 0,
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
function tv({
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
      className: O("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          fv,
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
function As(e, t) {
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
function nv(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const Ci = 200, rv = () => () => {
};
function av(e, t, n) {
  const r = e.query, a = nv(r), i = b.useMemo(() => {
    const g = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof g == "number" ? Math.min(g, Ci) : Ci
    };
  }, [r]), o = ln(), s = b.useRef(null);
  s.current === null && (s.current = Do());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, m = b.useSyncExternalStore(
    o ? o.store.subscribe : rv,
    u,
    u
  ), { resultSet: d } = Po(m, { skip: !a });
  return b.useMemo(() => {
    const g = /* @__PURE__ */ new Map();
    for (const h of t.list()) {
      const f = h.family;
      if (h.queryless || a && n.has(f) && !d) continue;
      const w = (d && n.has(f) ? iv(e, f, t, d, m) : void 0) ?? dv(f, t);
      w && g.set(f, w);
    }
    return g;
  }, [e, t, d, m, n, a]);
}
function iv(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Xg(n, e, t), o = As(i.chart, n), s = Ro(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const vt = "sample.category", rn = "sample.group", ke = "sample.value", _e = "sample.count", Ds = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], zr = [18, 27, 21, 34, 26, 39], Vr = [12, 9, 17, 14, 22, 16], ov = Ds.flatMap((e, t) => [
  { [vt]: e, [rn]: "North", [ke]: zr[t], [_e]: Vr[t] },
  {
    [vt]: e,
    [rn]: "South",
    [ke]: Math.round(zr[t] * 0.62),
    [_e]: Math.round(Vr[t] * 0.78)
  }
]), sv = {
  measures: [ke, _e],
  dimensions: [vt, rn]
}, lv = {
  measures: {
    [ke]: { title: "Value", shortTitle: "Value", type: "number" },
    [_e]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [vt]: { title: "Day", shortTitle: "Day", type: "string" },
    [rn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function Ls(e) {
  const t = [
    { key: ke, label: "Value", data: zr, colorToken: "chart-1" },
    { key: _e, label: "Count", data: Vr, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: Ds,
    series: t,
    raw: { rows: ov, query: sv, annotation: lv },
    empty: !1
  };
}
const cv = Ls(1), uv = Ls(2), Kt = (e, t) => ({
  family: e,
  mapping: { category: { member: vt }, series: { mode: "measures", members: t } }
}), mv = {
  bar: Kt("bar", [ke, _e]),
  line: Kt("line", [ke, _e]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: Kt("area", [ke, _e]),
  pie: Kt("pie", [ke]),
  scatter: { family: "scatter", familyOptions: { x: ke, y: _e } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: vt },
      series: { mode: "pivot", value: ke, pivot: rn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: ke, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: vt }, { member: ke }, { member: _e }] }
  }
};
function dv(e, t) {
  const n = mv[e] ?? Kt(e, [ke, _e]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? cv : uv,
    options: As(n, t)
  };
}
const fv = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(hv, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Mo,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class hv extends b.Component {
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
function pv(e, t) {
  return e.allowedCubes.includes(t);
}
function gv(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function vv(e, t, n, r) {
  const a = ka(e), i = a.filter((M) => M.type === "view"), o = vs(t, r), s = Object.values(o).flat();
  let c;
  for (const M of s) {
    const N = Ve(e, M);
    if (N) {
      c = N;
      break;
    }
  }
  const u = !c && n ? Nt(e, n) : void 0, m = c ? Nt(e, c.cube) : u, d = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, g = t.query.measures ?? [], h = g.length ? jt(g[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: i, measureSource: h, allowedCubes: [d] };
  const f = h ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), y = f ? Nt(e, f) : void 0, k = a.filter((M) => M.type === "cube"), w = f ? gv(k, f) : k, C = f ? [f, ...w.map((M) => M.name)] : k.map((M) => M.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: w,
    views: i,
    measureSource: h,
    allowedCubes: C
  };
}
class Qn extends b.Component {
  constructor() {
    super(...arguments);
    Jn(this, "state", { error: null, resetKey: this.props.resetKey });
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
      /* @__PURE__ */ l(Tl, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
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
function bv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function yv(e, t, n, r, a, i) {
  var j, V, Q, ve, Oe;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : kv(a), m = o.familyOptions ?? {}, d = Array.isArray(m.columns) ? m.columns : [], g = fs(o), h = g[r], f = c === "table" && n.id === "columns", y = c === "bar" || c === "line" || c === "area", k = ((V = (j = o.mapping) == null ? void 0 : j.series) == null ? void 0 : V.mode) === "measures", w = y && n.id === "y", C = w && k, M = f ? (Q = d.find((G) => G.member === r)) == null ? void 0 : Q.label : C ? h == null ? void 0 : h.label : void 0, N = C ? h == null ? void 0 : h.colorToken : void 0, S = un(s), I = n.kinds.includes("time") && (S == null ? void 0 : S.dimension) === r, L = I ? S == null ? void 0 : S.granularity : void 0, K = I ? S == null ? void 0 : S.dateRange : void 0, A = (c === "line" || c === "area") && n.id === "y" && k, _ = A ? h == null ? void 0 : h.dots : void 0, E = (G) => {
    var mn, Ee;
    if ((mn = o.mapping) != null && mn.series && o.mapping.series.mode !== "measures") return;
    const se = ((Ee = o.mapping) != null && Ee.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], fe = { ...g };
    G && Object.keys(G).length > 0 ? fe[r] = G : delete fe[r];
    const ot = cn(o);
    ot && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: ot }, series: hs(se, fe) }
      }
    });
  }, F = (G) => {
    const se = d.map((fe) => fe.member === r ? { ...fe, ...G } : fe);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: se } } });
  }, D = (G) => {
    f ? F({ label: G }) : C && E({ ...h, label: G });
  }, W = (G) => {
    C && E({ ...h, colorToken: G ?? void 0 });
  }, q = (G) => {
    if (!S) return;
    const se = { ...S };
    for (const fe of Object.keys(G)) {
      const ot = G[fe];
      ot === void 0 ? delete se[fe] : se[fe] = ot;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, z = (G) => q({ granularity: G }), Z = (G) => q({ dateRange: G }), te = (G) => {
    C && E({ ...h, dots: G });
  }, ee = () => t(rg(e, c, n.id, r, i)), ie = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), le = (ve = o.mapping) == null ? void 0 : ve.series, oe = (le && le.mode === "pivot" ? le.value : Er(o)[0]) ?? ((Oe = s.measures) == null ? void 0 : Oe[0]), me = ie ? u === "time" ? [
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
  ] : [], P = (() => {
    const G = bv(s.order)[0];
    if (!G) return "none";
    const [se, fe] = G;
    return oe && se === oe ? fe === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? fe === "desc" ? "time-desc" : "time-asc" : fe === "asc" ? "label-asc" : "label-desc" : "none";
  })(), R = (G) => {
    let se;
    switch (G) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = oe ? [[oe, "desc"]] : void 0;
        break;
      case "value-asc":
        se = oe ? [[oe, "asc"]] : void 0;
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
  }, B = typeof s.limit == "number" ? s.limit : void 0, U = (G) => t({ ...e, query: { ...s, limit: G && G > 0 ? G : void 0 } }), T = (c === "bar" || c === "line" || c === "area") && I, x = T && m.comparePrevious === !0;
  return {
    kind: u,
    label: M,
    colorToken: N,
    granularity: L,
    dateRange: K,
    dots: _,
    canPoints: A,
    canRename: f || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: I,
    isCategoryField: ie,
    sortValue: P,
    sortOptions: me,
    onSort: R,
    limit: B,
    onLimit: U,
    canComparePrevious: T,
    comparePrevious: x,
    comparePreviousReady: T && K !== void 0,
    onComparePrevious: (G) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: G || void 0 } } }),
    onRename: D,
    onRecolor: W,
    onGranularity: z,
    onDateRange: Z,
    onDots: te,
    onRemove: ee
  };
}
function kv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ni(e, t, n, r) {
  var d;
  const { chart: a, query: i } = e, o = a.family, s = (g) => {
    if (r < 0 || r >= g.length || n === r) return g;
    const h = g.slice(), [f] = h.splice(n, 1);
    return h.splice(r, 0, f), h;
  };
  if (o === "table" && t.id === "columns") {
    const g = a.familyOptions ?? {}, h = s(Array.isArray(g.columns) ? g.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...g, columns: h } } };
  }
  const c = s(i.measures ?? []), u = (d = a.mapping) == null ? void 0 : d.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const g = s(u.values);
    m = { ...a.mapping, series: { ...u, value: g[0], values: g } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const wv = Xe.options;
function Cv({
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
      className: O("cv-color-picker", a),
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
            className: O(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        wv.map((i) => {
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
              className: O(
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
function Nv({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = at(), u = Hn(), m = yv(e, t, n, r, a, c), d = b.useId(), g = b.useId(), h = b.useId(), f = b.useId(), y = b.useId(), k = b.useId(), w = (a == null ? void 0 : a.label) ?? r, C = m.label || w, M = m.canColor && i !== void 0, N = m.canRename || M || m.isTimeField || m.isCategoryField || m.canPoints, S = (A) => {
    const _ = A.trim();
    m.onRename(_.length > 0 ? _ : void 0);
  }, I = (A) => {
    !o || !A.altKey || (A.key === "ArrowUp" && o.index > 0 ? (A.preventDefault(), o.onMove(-1)) : A.key === "ArrowDown" && o.index < o.total - 1 && (A.preventDefault(), o.onMove(1)));
  }, L = /* @__PURE__ */ v(de, { children: [
    o ? /* @__PURE__ */ l(Rl, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
    M ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? (
      // What the field HOLDS, in words ("km", "#", "date") — same chip as the
      // picker rows, converted to the viewer's unit system.
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ca(a, u) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: C })
  ] }), K = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: O("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", s),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (A) => {
        A.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? I : void 0,
      children: [
        N ? /* @__PURE__ */ v(Ae, { children: [
          /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${C}${K}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: L
            }
          ) }),
          /* @__PURE__ */ l(Le, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ v("div", { className: "cv-field-pill-config", children: [
            m.canRename ? /* @__PURE__ */ v("label", { className: "cv-ec-field", htmlFor: d, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                ge,
                {
                  id: d,
                  defaultValue: m.label ?? "",
                  placeholder: w,
                  className: "cv-ec-h8",
                  onBlur: (A) => S(A.target.value),
                  onKeyDown: (A) => {
                    A.key === "Enter" && (S(A.target.value), A.target.blur());
                  }
                }
              )
            ] }) : null,
            M ? /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(Cv, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ v(de, { children: [
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  At,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (A, _) => /* @__PURE__ */ l(Oa, { value: A, onChange: _ })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  At,
                  {
                    kind: "granularity",
                    value: m.granularity,
                    onChange: m.onGranularity,
                    renderFixed: (A, _) => /* @__PURE__ */ l(
                      as,
                      {
                        value: A,
                        onChange: _,
                        allowAuto: !0,
                        autoHint: ha(m.dateRange),
                        options: _o(m.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              m.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: y, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    $r,
                    {
                      id: y,
                      checked: m.comparePrevious,
                      onChange: m.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                m.comparePrevious && !m.comparePreviousReady ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            m.isCategoryField ? /* @__PURE__ */ v(de, { children: [
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: g, children: [
                /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: g,
                    "aria-labelledby": h,
                    value: m.sortValue,
                    onChange: (A) => m.onSort(A.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((A) => /* @__PURE__ */ l("option", { value: A.key, children: A.label }, A.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: f, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  ge,
                  {
                    id: f,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (A) => {
                      const _ = A.target.value.trim();
                      m.onLimit(_ === "" ? void 0 : Number(_));
                    },
                    onKeyDown: (A) => {
                      if (A.key === "Enter") {
                        const _ = A.target.value.trim();
                        m.onLimit(_ === "" ? void 0 : Number(_)), A.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: k, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l($r, { id: k, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ v(
              J,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: m.onRemove,
                children: [
                  /* @__PURE__ */ l(Ia, { className: "cv-ec-icon" }),
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
              title: `${C}${K}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${C}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: L
            }
          )
        ),
        /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: m.onRemove,
            "aria-label": `Remove ${C}`,
            children: /* @__PURE__ */ l(Ia, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function Sv({
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
  lockedSingle: g,
  disableReorder: h,
  label: f,
  note: y,
  pickerSide: k,
  pickerAlign: w,
  control: C
}) {
  const M = n.cardinality === "many" && !g, N = M || r.length === 0, S = r.length, I = d === "vertical", L = f ?? n.label, K = M && S > 1 && !h, [A, _] = b.useState(null), E = ["number", "category", "time"].filter((W) => !be(n, W)).map((W) => Na(n, W, r)).find((W) => W !== void 0) ?? n.hint, F = a.length === 0 && !n.optional && be(n, "number") ? "Pick a number to get started" : void 0, D = /* @__PURE__ */ l(
    Ns,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: k ?? (I ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          title: E,
          className: O(
            "cv-well-add",
            I && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(xt, { className: "cv-ec-icon" }),
            r.length === 0 ? L : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: O("cv-well-group", !I && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: L }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        C ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: C }) : null,
        /* @__PURE__ */ l(Qn, { label: L, resetKey: e, children: /* @__PURE__ */ v("div", { className: O("cv-well-fields", I ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((W, q) => /* @__PURE__ */ l(
            Nv,
            {
              spec: e,
              update: t,
              well: n,
              member: W,
              option: i(W),
              resolvedColor: o(W),
              className: I ? "cv-field-pill--full" : void 0,
              reorder: K ? {
                index: q,
                total: S,
                dragging: A === q,
                onDragStart: () => _(q),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  A === null || A === q || (t(Ni(e, n, A, q)), _(q));
                },
                onDragEnd: () => _(null),
                onMove: (z) => t(Ni(e, n, q, q + z))
              } : void 0
            },
            W
          )),
          N ? D : null
        ] }) }),
        F ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: F }) : null,
        y ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: y }) : null
      ]
    }
  );
}
function ur({
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
            /* @__PURE__ */ l(nt, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Le, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Qn, { label: e, children: n }) })
  ] });
}
function _a(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function xv({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = _a(e, t), a = ds(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], o = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (d) => {
    const g = i ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!g) return;
    const h = { ...g };
    for (const f of Object.keys(d)) {
      const y = d[f];
      y === void 0 ? delete h[f] : h[f] = y;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Jt, { label: "Time field", children: ({ id: d }) => /* @__PURE__ */ l(
      ys,
      {
        id: d,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (g) => u({ dimension: g }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Jt, { label: "Date range", children: ({ labelId: d }) => /* @__PURE__ */ l(
      At,
      {
        labelId: d,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (g) => u({ dateRange: g }),
        renderFixed: (g, h) => /* @__PURE__ */ l(Oa, { value: g, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(ue, { label: "Display", children: /* @__PURE__ */ l(
      St,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: o,
        onChange: (d) => r({ display: d })
      }
    ) }),
    /* @__PURE__ */ l(
      et,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (d) => r({ goodDirection: d ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(Jt, { label: "Gauge max", children: ({ id: d }) => /* @__PURE__ */ l(
      ge,
      {
        id: d,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (g) => {
          const h = parseFloat(g.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Mv({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = _a(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ue, { label: "Compare to", children: /* @__PURE__ */ l(
      St,
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
            { ...o.current ?? { showAsPercent: !0 }, mode: m }
          )
        })
      }
    ) }),
    i ? /* @__PURE__ */ v(de, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Jt, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        ge,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const g = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(g) ? g : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Fi, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        et,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      )
    ] }) : null
  ] });
}
function Tv({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = _a(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = _o((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(Jt, { label: "Trend", children: ({ id: m, labelId: d }) => /* @__PURE__ */ l(
      At,
      {
        labelId: d,
        kind: "granularity",
        value: o,
        onChange: (g) => r({
          sparkline: g === void 0 ? void 0 : { ...a, granularity: g }
        }),
        renderFixed: (g, h) => /* @__PURE__ */ l(
          as,
          {
            id: m,
            value: g,
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
function Jt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function Rv({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var le, oe, me;
  const { meta: a } = it(), i = at(), { chart: o } = e, s = o.family, c = i.require(s), u = c.queryless ?? !1, m = c.enforcesAxisUnit, d = ds(e), g = Hn(), h = b.useMemo(() => ng(s, i), [s, i]), f = b.useMemo(() => vs(e, i), [e, i]), y = b.useMemo(() => new Map(h.map((P) => [P.id, P])), [h]), k = b.useMemo(
    () => vv(a, e, void 0, i),
    [a, e, i]
  ), w = b.useMemo(() => Object.values(f).flat(), [f]), C = b.useMemo(
    () => {
      var P;
      return k.viewLocked ? [k.viewLocked] : [(P = k.sourceCube) == null ? void 0 : P.name, ...k.relatedCubes.map((R) => R.name)].filter(
        Boolean
      );
    },
    [k]
  ), M = b.useMemo(
    () => Object.values(f).every((P) => P.length === 0),
    [f]
  ), N = b.useMemo(() => {
    const P = (f.y ?? [])[0], R = P ? Ve(a, P) : void 0;
    return {
      leftKey: P ? ps(R) : void 0,
      leftLabel: P ? Ov(R, g(R == null ? void 0 : R.unit)) : void 0
    };
  }, [f, a, g]), S = b.useCallback(
    (P, R) => {
      var B;
      if (R) {
        if (!pv(k, R.cube))
          return "Clear the current fields to use a different dataset.";
        if (R.memberType === "measure" && k.measureSource && R.cube !== k.measureSource)
          return `This chart's numbers come from ${((B = k.sourceCube) == null ? void 0 : B.title) ?? k.measureSource}. Remove them to use another table.`;
        if (m && P === "y" && R.memberType === "measure") {
          const { leftKey: U, leftLabel: H } = N;
          return cg(R, U, H);
        }
      }
    },
    [k, N, m]
  ), I = N.leftLabel, L = b.useMemo(() => {
    var R;
    const P = {};
    if (s === "bar" || s === "line" || s === "area") {
      const B = (R = o.mapping) == null ? void 0 : R.series;
      if (B && B.mode === "measures") {
        const U = B.members.map((T) => {
          var x, $;
          return { key: T, colorToken: ($ = (x = B.meta) == null ? void 0 : x[T]) == null ? void 0 : $.colorToken };
        }), H = To(U, o.colors);
        B.members.forEach((T, x) => {
          P[T] = H[x];
        });
      }
    }
    return P;
  }, [s, o.mapping, o.colors]), K = b.useCallback(
    (P, R, B) => {
      const U = Ve(a, R);
      if (S(P, U)) return;
      let H = B === "geoPoint" && (U != null && U.latMember) && U.lngMember ? Wt(
        Wt(e, s, "lat", U.latMember, "numberDimension", i),
        s,
        "lng",
        U.lngMember,
        "numberDimension",
        i
      ) : Wt(e, s, P, R, B, i);
      const T = c.canonicalTimeWell;
      if (T && P !== T && (f[T] ?? []).length === 0) {
        const x = Lp(a, U == null ? void 0 : U.cube);
        x && x.name !== R && !S(T, x) && (H = Wt(H, s, T, x.name, "time", i));
      }
      t(H);
    },
    [S, a, t, e, s, i, c, f]
  ), A = s === "bar" && o.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : c.zones, _ = A.left.map((P) => y.get(P)).filter(Boolean), E = A.bottom.map((P) => y.get(P)).filter(Boolean), F = (le = f.color) == null ? void 0 : le[0], D = ((oe = f.y) == null ? void 0 : oe.length) ?? 0, W = F && D > 1 ? `${D} values × ${((me = Ve(a, F)) == null ? void 0 : me.label) ?? "this split"} — one series per value per group.` : void 0, q = c.hasLegend, z = (f.y ?? [])[0], Z = (P) => {
    var U, H, T, x;
    if (!P) return;
    const R = (U = o.mapping) == null ? void 0 : U.series;
    return (R && R.mode === "measures" ? (T = (H = R.meta) == null ? void 0 : H[P]) == null ? void 0 : T.label : void 0) ?? ((x = Ve(a, P)) == null ? void 0 : x.label);
  }, te = (P) => {
    var B, U, H, T;
    const R = (x, $) => $ ? /* @__PURE__ */ l(Lg, { spec: e, update: t, axis: x, title: "Title", auto: Z($) }) : null;
    switch (P) {
      case "y":
        return R("y", z);
      // the single value axis
      case "x":
        return R("x", (U = (B = o.mapping) == null ? void 0 : B.category) == null ? void 0 : U.member);
      case "sy":
        return R("y", (H = f.sy) == null ? void 0 : H[0]);
      // scatter Y axis
      case "sx":
        return R("x", (T = f.sx) == null ? void 0 : T[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ee = (P, R) => /* @__PURE__ */ l(
    Sv,
    {
      spec: e,
      update: t,
      well: P,
      placed: f[P.id] ?? [],
      allPlaced: w,
      optionFor: (B) => Ve(a, B),
      colorFor: (B) => L[B],
      scope: k,
      blockReason: (B) => S(P.id, B),
      onAdd: (B, U) => K(P.id, B, U),
      badge: P.id === "y" ? I : void 0,
      orientation: R,
      note: P.id === "color" ? W : void 0,
      control: te(P.id)
    },
    P.id
  ), ie = () => {
    var U;
    const P = y.get("value"), R = (f.value ?? []).length > 0, B = o.familyOptions ?? {};
    return /* @__PURE__ */ v(de, { children: [
      /* @__PURE__ */ v("div", { className: "cv-edit-kpi-value", children: [
        P ? ee(P, "vertical") : null,
        R ? /* @__PURE__ */ l(
          ur,
          {
            label: "Time, range & display",
            summary: B.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(xv, { spec: e, update: t })
          }
        ) : null
      ] }),
      R ? /* @__PURE__ */ v(de, { children: [
        /* @__PURE__ */ l(
          ur,
          {
            label: "Comparison",
            summary: B.comparison === void 0 ? "None" : B.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(Mv, { spec: e, update: t })
          }
        ),
        /* @__PURE__ */ l(
          ur,
          {
            label: "Trend",
            summary: Tp(
              (U = B.sparkline) == null ? void 0 : U.granularity
            ),
            children: /* @__PURE__ */ l(Tv, { spec: e, update: t })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !M || u ? /* @__PURE__ */ l(ev, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-actions", children: [
        w.length > 0 && k.sourceCube ? /* @__PURE__ */ v(
          "span",
          {
            className: "cv-edit-anchor",
            title: k.sourceCube.grain ?? k.sourceCube.title,
            children: [
              /* @__PURE__ */ l(Vi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: k.sourceCube.title }),
              k.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: k.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(_g, { spec: e, update: t, cube: d, scopeCubes: C, scope: k })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-body", children: [
      _.length > 0 ? /* @__PURE__ */ l("div", { className: O("cv-edit-sidebar", c.sidebarWidthClass), children: s === "kpi" ? ie() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        _.map((P) => ee(P, "vertical"))
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ v("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Zg, { spec: e, update: t, empty: M && !u })
        ] }),
        E.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-edit-overlay-bottom", children: [
          E.map((P) => ee(P, "horizontal")),
          q && !M ? /* @__PURE__ */ l(Eg, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Ov(e, t) {
  const n = gs(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Es(e, t) {
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
function mr(e) {
  const t = eo.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function _v({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = b.useState(() => ({
    spec: e,
    issues: mr(e)
  })), [i, o] = b.useState(e);
  b.useEffect(() => {
    a({ spec: e, issues: mr(e) }), o(e);
  }, [e]);
  const s = Es((g) => t(g), n), c = r.spec, u = r.issues, m = u.length === 0, d = b.useCallback(
    (g) => {
      const h = mr(g);
      a({ spec: g, issues: h }), h.length === 0 && (o(g), s(g));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: d };
}
const Av = () => {
};
function Dv({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = at(), { draft: s, issues: c, valid: u, committed: m, update: d } = _v({
    spec: e,
    onChange: t ?? Av,
    debounceMs: r
  }), g = o.get(s.chart.family), h = (g == null ? void 0 : g.queryless) ?? !1, f = m, y = (L) => {
    var K, A, _;
    return (((K = L == null ? void 0 : L.measures) == null ? void 0 : K.length) ?? 0) > 0 || (((A = L == null ? void 0 : L.dimensions) == null ? void 0 : A.length) ?? 0) > 0 || (((_ = L == null ? void 0 : L.timeDimensions) == null ? void 0 : _.some((E) => typeof E.granularity == "string")) ?? !1);
  }, k = (L) => {
    var K;
    return (((K = L == null ? void 0 : L.measures) == null ? void 0 : K.length) ?? 0) > 0;
  }, w = (g == null ? void 0 : g.requiresMeasure) ?? s.chart.family !== "table", C = h || y(s.query) && y(f.query) && (!w || k(s.query) && k(f.query)), M = w && !k(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = b.useCallback(
    (L) => {
      d({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...L }
        }
      });
    },
    [s, d]
  ), S = C ? /* @__PURE__ */ l(
    va,
    {
      query: f.query ?? {},
      chart: f.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: M }) }), I = n ? /* @__PURE__ */ v(J, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(Bi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: O("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ v(In, { variant: "destructive", children: [
          /* @__PURE__ */ l(Ur, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(Fn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Pn, { children: /* @__PURE__ */ v("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((L, K) => /* @__PURE__ */ v("li", { children: [
              L.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: L.path }) : null,
              " ",
              L.message
            ] }, K)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Qn, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(Rv, { spec: s, update: d, toolbar: I, children: S }) }) })
      ]
    }
  );
}
function Lv({
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
  className: g
}) {
  const h = a || i, [f, y] = b.useState(!1);
  b.useEffect(() => {
    if (!f) return;
    const w = setTimeout(() => y(!1), 1600);
    return () => clearTimeout(w);
  }, [f]), b.useEffect(() => {
    d || y(!1);
  }, [d]);
  const k = () => {
    m == null || m(), y(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: O("cv-editor-toolbar", g),
      children: [
        /* @__PURE__ */ l(
          ge,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ v(J, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Pi, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(J, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Wi, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(J, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Ol, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(J, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(_l, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-actions", children: [
          h ? /* @__PURE__ */ v(de, { children: [
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(Al, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(Dl, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ v(
            J,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(Ll, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(
            J,
            {
              size: "sm",
              onClick: k,
              disabled: d,
              "aria-live": "polite",
              className: O(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                f && "cv-editor-toolbar-save--saved"
              ),
              children: [
                f ? /* @__PURE__ */ l(Dt, {}) : /* @__PURE__ */ l(Bi, {}),
                " ",
                f ? "Saved" : "Save"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
const Is = "lg", Fs = 12;
function Ev(e, t) {
  const n = t[Is];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function Iv(e, t) {
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
const Fv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Pv(e, t, n, r = Fs) {
  const a = Fv[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function Ps(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Fs) {
  const a = Pv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function $v(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Ps(e, a);
}
function zv(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Vv(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const jv = 12, Wv = 900, Bv = 0.4;
function Kv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function qv({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = zo(), u = e.grid ?? {}, m = u.cols ?? jv, d = u.rowHeight ?? 40, g = u.margin ?? [12, 12], h = u.containerPadding ?? [0, 0], f = Math.max(Bv, Math.min(1, c / Wv)), y = Math.round(f / 0.05) * 0.05, k = Math.max(8, Math.round(d * y)), w = [
    Math.round(g[0] * y),
    Math.round(g[1] * y)
  ], C = [
    Math.round(h[0] * y),
    Math.round(h[1] * y)
  ], M = b.useMemo(
    () => ({ [Is]: Kv(e.layout) }),
    [e.layout]
  ), N = b.useMemo(
    () => new Map(e.widgets.map((A) => [A.id, A])),
    [e.widgets]
  ), S = b.useRef(o);
  b.useEffect(() => {
    S.current = o;
  }, [o]);
  const I = b.useRef(e.layout);
  b.useEffect(() => {
    I.current = e.layout;
  }, [e.layout]);
  const L = b.useRef(null), K = b.useCallback(
    (A, _) => {
      const F = Ev(A, _).map((D) => ({ ...D }));
      Uv(I.current, F) || S.current(F);
    },
    []
  );
  return /* @__PURE__ */ l(ga, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    qi,
    {
      width: c,
      layouts: M,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: k,
      margin: w,
      containerPadding: C,
      dragConfig: { enabled: !0, handle: `.${_n}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: K,
      children: e.layout.map((A) => {
        const _ = N.get(A.i);
        if (!_) return null;
        const E = _.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${_.title ?? _.type}`,
              "aria-pressed": E,
              onPointerDown: (F) => {
                L.current = { x: F.clientX, y: F.clientY };
              },
              onClick: (F) => {
                const D = L.current;
                D && Math.hypot(F.clientX - D.x, F.clientY - D.y) > 5 || n(_.id);
              },
              onKeyDown: (F) => {
                (F.key === "Enter" || F.key === " ") && (F.preventDefault(), n(_.id));
              },
              className: O(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                E && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(_r, { widget: _, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: O(_n, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ v("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${_.title ?? _.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), r(_.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(El, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${_.title ?? _.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), a(_.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Il, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${_.title ?? _.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), i(_.id);
                      },
                      className: O("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(Lt, {})
                    }
                  )
                ] })
              ]
            },
            A.i
          )
        );
      })
    }
  ) : null }) });
}
function Uv(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Hv = b.memo(qv);
function Gv(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Yv({
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
    content: Gv(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: O(Vo, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(ue, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(Qv, { editor: a }),
    /* @__PURE__ */ l(Hi, { editor: a })
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
      className: O("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function Qv({ editor: e }) {
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
            children: /* @__PURE__ */ l(Fl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Pl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l($l, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(zl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Vl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(jl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Wl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(Bl, {})
          }
        )
      ]
    }
  );
}
const Jv = Gr(
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
function Xv({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: O(Jv({ variant: t }), e), ...n });
}
function Zv({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = it(), c = b.useMemo(() => ka(o), [o]), u = c.filter((g) => g.type === "view"), m = c.find((g) => g.name === e), d = b.useMemo(() => {
    const g = c.filter((k) => k.type === "cube"), h = g.some((k) => k.category), f = [], y = /* @__PURE__ */ new Map();
    for (const k of g) {
      const w = k.category ?? (h ? "More tables" : "Tables");
      y.has(w) || (y.set(w, []), f.push(w)), y.get(w).push(k);
    }
    return f.sort((k, w) => k === "More tables" ? 1 : w === "More tables" ? -1 : k.localeCompare(w)), f.map((k) => ({ label: k, items: y.get(k) }));
  }, [c]);
  return /* @__PURE__ */ v(xe, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(Te, { id: a, className: i, children: /* @__PURE__ */ l(Me, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(dr, { option: m }) : void 0 }) }),
    /* @__PURE__ */ v(Re, { children: [
      u.length > 0 ? /* @__PURE__ */ v(Tr, { children: [
        /* @__PURE__ */ l(Rr, { children: "Saved datasets" }),
        u.map((g) => /* @__PURE__ */ l(pe, { value: g.name, children: /* @__PURE__ */ l(dr, { option: g }) }, g.name))
      ] }) : null,
      d.map((g) => /* @__PURE__ */ v(Tr, { children: [
        /* @__PURE__ */ l(Rr, { children: g.label }),
        g.items.map((h) => /* @__PURE__ */ l(pe, { value: h.name, children: /* @__PURE__ */ l(dr, { option: h }) }, h.name))
      ] }, g.label))
    ] })
  ] });
}
function dr({ option: e }) {
  const t = e.type === "view" ? ji : Kl;
  return /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Xv, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const eb = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function tb(e) {
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
function nb({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(tb(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ue,
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
              /* @__PURE__ */ l(Te, { children: /* @__PURE__ */ l(Me, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Re, { children: t.map((s) => /* @__PURE__ */ l(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ue, { label: "Control", children: /* @__PURE__ */ v(xe, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(Te, { children: /* @__PURE__ */ l(Me, {}) }),
      /* @__PURE__ */ l(Re, { children: mc.options.map((s) => /* @__PURE__ */ l(pe, { value: s, children: eb[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(rb, { control: r, onChange: a, variables: t })
  ] });
}
function rb({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(ab, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(ob, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(sb, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(lb, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(cb, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(ub, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function ab({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      ue,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          ib,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      et,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function ib({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(gn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === gn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(De, { asChild: !0, children: /* @__PURE__ */ v(J, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(nt, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Le, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: gn.map((s) => {
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
                className: O("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Dt, { className: "cv-ed-icon-xs" }) : null
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
function ob({
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
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      ue,
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
              /* @__PURE__ */ l(Te, { children: /* @__PURE__ */ l(Me, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Re, { children: [
                /* @__PURE__ */ l(pe, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ue, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Je.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: O("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function sb({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      et,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      ue,
      {
        label: "Options",
        action: /* @__PURE__ */ v(J, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(xt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ v("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            ge,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            ge,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            J,
            {
              variant: "ghost",
              size: "icon",
              className: O("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(Lt, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function lb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(ue, { label: "From", children: /* @__PURE__ */ v(
      xe,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(Te, { children: /* @__PURE__ */ l(Me, {}) }),
          /* @__PURE__ */ v(Re, { children: [
            /* @__PURE__ */ l(pe, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(pe, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(pe, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      ue,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          J,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          Zv,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function cb({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(ue, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    ge,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function ub({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(ue, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    ge,
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
  return /* @__PURE__ */ v(de, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function mb(e) {
  return { schemaVersion: wt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function db(e) {
  const t = {
    schemaVersion: wt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function fb(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Si({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = b.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: O("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ue,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          ge,
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
      /* @__PURE__ */ l(ga, { spec: mb(t), children: /* @__PURE__ */ l(yg, { createVariable: o, children: /* @__PURE__ */ l("div", { className: O(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Dv,
        {
          fill: a,
          spec: db(e),
          onChange: (s) => n(fb(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(Yv, { widget: e, onChange: n }) : /* @__PURE__ */ l(nb, { widget: e, variables: t, onChange: n })
  ] });
}
function hb({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ v(de, { children: [
    r ? /* @__PURE__ */ l(
      on,
      {
        className: O("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "section-header",
      className: O("cv-section-header", s),
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
function pb({
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
  const u = i !== void 0, [m, d] = b.useState(a), g = r ? u ? i : m : !0, h = b.useId(), f = b.useCallback(() => {
    const y = !g;
    u || d(y), o == null || o(y);
  }, [g, u, o]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": g ? "open" : "closed",
      className: O("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          hb,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: g,
            onToggle: f,
            regionId: h
          }
        ),
        g ? /* @__PURE__ */ l("div", { id: h, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function gb(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function vb(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function bb(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function yb(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function kb(e, t) {
  switch (e) {
    case "chart":
      return vb(t);
    case "text":
      return bb(t);
    case "input":
      return yb(t);
  }
}
function wb(e) {
  return { name: e, type: "string" };
}
function Cb(e) {
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
const xi = {
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
function Nb({
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
    t(e.map((d, g) => g === u ? Sb(d, m) : d));
  }, o = (u) => t(e.filter((m, d) => d !== u)), s = () => t([...e, wb(a())]), c = (u, m) => {
    const d = u + m;
    if (d < 0 || d >= e.length) return;
    const g = e.slice();
    [g[u], g[d]] = [g[d], g[u]], t(g);
  };
  return /* @__PURE__ */ l(
    pb,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(J, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(xt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(J, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(xt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        xb,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((d, g) => g !== m && d.name === u.name && u.name !== ""),
          onChange: (d) => i(m, d),
          onRemove: () => o(m),
          onMove: (d) => c(m, d)
        },
        m
      )) })
    }
  );
}
function Sb(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Cb(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function xb({
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
              children: s ? /* @__PURE__ */ l(nt, {}) : /* @__PURE__ */ l(on, {})
            }
          ),
          /* @__PURE__ */ l(
            ge,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: xi[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Kr, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(qr, {})
              }
            ),
            /* @__PURE__ */ l(
              J,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(Lt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ue, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ v(xe, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ l(Te, { children: /* @__PURE__ */ l(Me, {}) }),
            /* @__PURE__ */ l(Re, { children: Xi.options.map((d) => /* @__PURE__ */ l(pe, { value: d, children: xi[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ l(
            ue,
            {
              label: "Label",
              htmlFor: m,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                ge,
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
            et,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ l(Mb, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Mb({
  decl: e,
  onChange: t
}) {
  const n = b.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      et,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (i) => t(i)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ue, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      ge,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : Tb(e.default);
  return /* @__PURE__ */ l(ue, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    ge,
    {
      id: n,
      value: a,
      placeholder: Rb(e.type),
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
function Tb(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Rb(e) {
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
function vy({
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
  families: g,
  className: h
}) {
  var $, Y;
  const [f, y] = b.useState(e), [k, w] = b.useState(e);
  b.useEffect(() => {
    y(e), w(e);
  }, [e]);
  const [C, M] = b.useState(null), N = b.useRef(0), [S, I] = b.useState(null), L = b.useRef(C), K = b.useRef(S), A = b.useRef(f);
  b.useEffect(() => {
    L.current = C, K.current = S, A.current = f;
  });
  const _ = b.useRef(null);
  _.current === null && (_.current = i ?? gb());
  const E = i ?? _.current, F = Es(
    (j) => r == null ? void 0 : r(j),
    o
  ), D = b.useCallback(
    (j) => {
      N.current = Date.now(), y((V) => {
        const Q = j(V);
        return F(Q), Q;
      });
    },
    [F]
  ), W = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === W.current) return;
    const j = 500;
    let V = null;
    const Q = () => {
      var se;
      const ve = Date.now() - N.current;
      if (ve < j) {
        V = setTimeout(Q, j - ve);
        return;
      }
      W.current = t;
      const Oe = /* @__PURE__ */ new Set();
      ((se = K.current) == null ? void 0 : se.kind) === "widget" && Oe.add(K.current.id), L.current && Oe.add(L.current);
      const G = Ab(t, A.current, Oe);
      y(G), n == null || n(G);
    };
    return Q(), () => {
      V && clearTimeout(V);
    };
  }, [t]);
  const q = b.useCallback(
    (j) => {
      const V = kb(j, E());
      D((Q) => Ps(Q, V)), M(V.id), I({ kind: "widget", id: V.id });
    },
    [D, E]
  ), z = b.useCallback((j) => M(j), []), Z = b.useCallback((j) => {
    M(j), I({ kind: "widget", id: j });
  }, []), te = b.useCallback(
    (j) => {
      D((V) => zv(V, j)), M((V) => V === j ? null : V), I((V) => (V == null ? void 0 : V.kind) === "widget" && V.id === j ? null : V);
    },
    [D]
  ), ee = b.useCallback(
    (j) => {
      const V = E();
      D((Q) => $v(Q, j, V)), M(V);
    },
    [D, E]
  ), ie = b.useCallback(
    (j) => D((V) => Vv(V, j)),
    [D]
  ), le = b.useCallback(
    (j) => D((V) => {
      const Q = Iv(V.layout, j);
      return _b(V.layout, Q) ? V : { ...V, layout: Q };
    }),
    [D]
  ), oe = b.useCallback(
    (j) => D((V) => ({ ...V, name: j || void 0 })),
    [D]
  ), me = b.useCallback(
    (j) => D((V) => ({ ...V, variables: j })),
    [D]
  ), P = b.useDeferredValue(f), R = b.useMemo(
    () => br.safeParse(P),
    [P]
  ), B = b.useCallback(() => {
    const j = br.safeParse(f);
    j.success && (a == null || a(j.data), w(f));
  }, [f, a]), U = f !== k, H = (S == null ? void 0 : S.kind) === "widget" ? f.widgets.find((j) => j.id === S.id) ?? null : null;
  b.useEffect(() => {
    (S == null ? void 0 : S.kind) === "widget" && !f.widgets.some((j) => j.id === S.id) && I(null);
  }, [S, f.widgets]);
  const T = b.useCallback(() => I(null), []), x = (S == null ? void 0 : S.kind) === "variables" ? "Dashboard variables" : H ? H.title ?? `${Ob(H.type)} widget` : "";
  return /* @__PURE__ */ l(pa, { families: g, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Y = ($ = f.grid) == null ? void 0 : $.margin) == null ? void 0 : Y[0]) ?? 12 },
      className: O("cv-dashboard-editor", h),
      children: [
        /* @__PURE__ */ l(
          Lv,
          {
            name: f.name ?? "",
            onNameChange: oe,
            onAdd: q,
            onEditVariables: () => I({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: d,
            discardDisabled: !U,
            onSave: a ? B : void 0,
            saveDisabled: !R.success || !U,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        R.success ? null : /* @__PURE__ */ v("p", { className: "cv-dashboard-editor-validation", children: [
          R.error.issues.length,
          " validation issue",
          R.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: S ? null : /* @__PURE__ */ l(
          Hv,
          {
            spec: f,
            selectedId: C,
            onSelect: z,
            onEdit: Z,
            onDuplicate: ee,
            onDelete: te,
            onLayoutChange: le
          }
        ) }),
        S ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": x,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ v("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ v("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ v(J, { variant: "ghost", size: "sm", onClick: T, children: [
                    /* @__PURE__ */ l(Hr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: x })
                ] }),
                H ? /* @__PURE__ */ v(
                  J,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => te(H.id),
                    children: [
                      /* @__PURE__ */ l(Lt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(Qn, { label: x, resetKey: f, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: S.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(Nb, { variables: f.variables, onChange: me }) }) : (H == null ? void 0 : H.type) === "chart" ? /* @__PURE__ */ l(
                Si,
                {
                  fill: !0,
                  widget: H,
                  variables: f.variables,
                  onChange: ie,
                  onVariablesChange: me
                }
              ) : H ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Si,
                {
                  widget: H,
                  variables: f.variables,
                  onChange: ie,
                  onVariablesChange: me
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Ob(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function _b(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Ab(e, t, n) {
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
  Mt as AUTO_GRANULARITY,
  wu as AreaChartFamily,
  nu as AreaFamilyOptionsSchema,
  oc as AxesOptionsSchema,
  $a as AxisOptionsSchema,
  iy as BUILTIN_CHART_FAMILIES,
  Ke as BUILTIN_DEFAULTS,
  Be as BUILTIN_FAMILY_OPTION_SCHEMAS,
  yu as BarChartFamily,
  eu as BarFamilyOptionsSchema,
  Is as CANONICAL_BREAKPOINT,
  Xe as ChartColorTokenSchema,
  Rv as ChartEditOverlay,
  Dv as ChartEditor,
  tc as ChartFamilySchema,
  ta as ChartInteractionProvider,
  Ji as ChartOptionsSchema,
  Mo as ChartRenderer,
  eo as ChartSpecSchema,
  cc as ChartTransformSchema,
  py as ChartView,
  fc as ChartWidgetSchema,
  sc as ColorAssignmentSchema,
  su as CondFormatRuleSchema,
  va as CubeChart,
  qf as CubeChartSpec,
  Qi as CubeQuerySchema,
  qn as CubeVizContext,
  dy as CubeVizProvider,
  jn as DEFAULT_COLOR_RAMP,
  Fs as DEFAULT_COLS,
  Qa as DEFAULT_MARK_THEME,
  hn as DEFAULT_TRANSFORM_WINDOW,
  Mr as DEFAULT_UNIT_CONVERSIONS,
  _n as DRAG_HANDLE_CLASS,
  hy as Dashboard,
  vy as DashboardEditor,
  ga as DashboardProvider,
  br as DashboardSpecSchema,
  gr as DateRangeSchema,
  uu as EMPTY_FAMILY_DEFAULT,
  Wa as EM_DASH,
  Hv as EditorCanvas,
  Lv as EditorToolbar,
  pa as FamilyRegistryOverride,
  Ng as FilterBuilder,
  Jl as FilterOperatorSchema,
  nc as FormatKindSchema,
  Yr as FormatOptionsSchema,
  Wc as GRANULARITY_PATTERN,
  Ql as GranularityChoiceSchema,
  Je as GranularitySchema,
  bc as GridConfigSchema,
  Du as HeatmapChartFamily,
  cu as HeatmapFamilyOptionsSchema,
  mc as InputControlKindSchema,
  dc as InputControlSchema,
  nb as InputWidgetEditor,
  pc as InputWidgetSchema,
  mh as InputWidgetView,
  Iu as KpiFamily,
  iu as KpiFamilyOptionsSchema,
  vc as LayoutItemSchema,
  Xl as LeafFilterSchema,
  ac as LegendOptionsSchema,
  ku as LineChartFamily,
  tu as LineFamilyOptionsSchema,
  ce as MemberSchema,
  Fa as OrderDirSchema,
  ec as OrderSpecSchema,
  Su as PieChartFamily,
  ru as PieFamilyOptionsSchema,
  vr as QueryFilterSchema,
  $n as ReferenceLineOptSchema,
  _r as RenderWidget,
  wt as SCHEMA_VERSION,
  Yl as ScalarSchema,
  Mu as ScatterChartFamily,
  au as ScatterFamilyOptionsSchema,
  rc as SeriesMappingSchema,
  Pa as SeriesMetaSchema,
  to as SpecSchema,
  ou as TableColumnOptSchema,
  Gu as TableFamily,
  lu as TableFamilyOptionsSchema,
  Yv as TextWidgetEditor,
  hc as TextWidgetSchema,
  Hf as TextWidgetView,
  Zl as TimeDimensionSchema,
  uc as TipTapDocSchema,
  ic as TooltipOptionsSchema,
  lc as TransformKindSchema,
  xn as VarRefSchema,
  yc as VariableDeclSchema,
  Xi as VariableTypeSchema,
  Yi as VariableValueSchema,
  Nb as VariablesPanel,
  Uo as WidgetChrome,
  Si as WidgetEditPanel,
  gc as WidgetSpecSchema,
  gy as adaptiveGranularity,
  Ps as appendWidget,
  dm as areaChartFamily,
  Xa as assignColors,
  ha as autoGranularityFor,
  Mf as axisKey,
  um as barChartFamily,
  ma as buildFamilyRegistry,
  my as builtinCharts,
  We as builtinFamilyDescriptors,
  Vn as builtinFamilyRegistry,
  Lp as canonicalTimeOf,
  zp as collapseFamilies,
  $c as createCubeClient,
  gb as createIdFactory,
  Do as createQueryResolver,
  Eo as createUnitsFormatter,
  qm as createVariableStore,
  Kc as datePattern,
  yr as deepMerge,
  ua as defaultChartFamilies,
  Cb as defaultForType,
  Xr as defaultFormatter,
  Fp as familyKeyOf,
  zc as fetchMeta,
  Nt as findCube,
  Ve as findMember,
  cy as formatCategory,
  Gt as formatDateValue,
  Dp as geoPointId,
  $p as grainAggLabel,
  Oo as granularitiesForSpan,
  _o as granularityOptionsFor,
  pm as heatmapChartFamily,
  Ot as isEmptyValue,
  we as isVarRef,
  gm as kpiChartFamily,
  mm as lineChartFamily,
  ka as listCubes,
  nn as listMembers,
  Pc as loadSpec,
  Jr as looksLikeIsoDate,
  Zr as makeChartFormat,
  ly as makeDateFormatter,
  uy as makeFormatter,
  Ip as memberAgg,
  Pp as memberAggDefault,
  vn as memberCanonicalTime,
  pi as memberFamilyTitle,
  is as memberGroup,
  Iv as mergeLayout,
  Kn as mergeUnitConversions,
  vb as newChartWidget,
  yb as newInputWidget,
  bb as newTextWidget,
  wb as newVariable,
  kb as newWidget,
  Ro as normalize,
  _p as pathLabel,
  Ev as pickCanonicalLayout,
  fm as pieChartFamily,
  Pv as placeNewItem,
  Rf as quantityLabel,
  fa as rangeSpanDays,
  zv as removeWidget,
  Vv as replaceWidget,
  Lf as resolveChart,
  xo as resolveMarkTheme,
  ym as resolveOptions,
  mu as resolveOptionsWith,
  Ao as resolveQuery,
  zm as resolveRelativeDateRange,
  To as resolveSeriesColors,
  jm as resolveValue,
  oy as safeLoadSpec,
  hm as scatterChartFamily,
  vm as tableChartFamily,
  no as toDate,
  Om as toResultAnnotation,
  _v as useChartEditorState,
  oo as useChartInteractions,
  zo as useContainerWidth,
  it as useCubeMeta,
  Po as useCubeQuery,
  Pe as useCubeVizContext,
  $o as useDashboard,
  Es as useDebouncedCallback,
  Hn as useDisplayUnit,
  at as useFamilyRegistry,
  fy as useFormatter,
  ir as useNormalizedSeries,
  ln as useOptionalDashboard,
  sy as validateSpec
};
//# sourceMappingURL=index.js.map
