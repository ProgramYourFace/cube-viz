var Js = Object.defineProperty;
var Xs = (e, t, n) => t in e ? Js(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var tr = (e, t, n) => Xs(e, typeof t != "symbol" ? t + "" : t, n);
import { z as p } from "zod";
import { jsx as l, jsxs as b, Fragment as pe } from "react/jsx-runtime";
import * as y from "react";
import { useMemo as re, createContext as Fi, useContext as Gr, useState as bt, useCallback as Xe, useEffect as ln, useRef as ut, createElement as Zs, useSyncExternalStore as Ii, useId as el, Component as tl } from "react";
import { ruleX as Pi, ruleY as $i, text as nn, colorLegend as Yr, group as nl, stack as zi, barX as za, barY as Va, lineX as rl, lineY as Pn, defineChart as at, areaY as vr, dot as Vi, cell as al } from "@tanstack/charts";
import { crosshair as ji } from "@tanstack/charts/crosshair";
import { scaleBand as il } from "@tanstack/charts/scales/band";
import { scaleLinear as Nn } from "@tanstack/charts/scales/linear";
import { scalePoint as ol } from "@tanstack/charts/scales/point";
import { Chart as sl } from "@tanstack/charts/react/core";
import { motion as Wi } from "@tanstack/charts/motion";
import { tooltip as Qr } from "@tanstack/charts/tooltip";
import { d3Curve as nr } from "@tanstack/charts/d3/shape";
import { brushX as ll } from "@tanstack/charts/interaction/brush";
import { controlledSignal as cl } from "@tanstack/charts/interaction/signal";
import { scaleUtc as ul, scaleLog as ja, scaleSqrt as ml } from "d3-scale";
import { curveNatural as dl, curveStepAfter as fl, curveMonotoneX as hl } from "d3-shape";
import { format as ve, isValid as Wt, parseISO as Sn, subDays as Ce, startOfWeek as xn, endOfWeek as Mn, startOfMonth as mt, endOfMonth as Gt, startOfQuarter as dt, endOfQuarter as Yt, startOfYear as ft, endOfYear as Qt, subWeeks as br, subMonths as ht, subQuarters as pt, subYears as gt, differenceInCalendarDays as pl, parse as Bi } from "date-fns";
import { clsx as gl } from "clsx";
import * as xe from "@radix-ui/react-select";
import { Minus as Ki, ArrowUp as Jr, ArrowDown as Xr, CalendarRange as qi, ChevronsUpDown as vl, AreaChart as bl, BarChart3 as Ui, Grid3X3 as yl, Table as kl, Gauge as wl, ScatterChart as Cl, PieChart as Nl, LineChart as Sl, AlertCircle as Zr, ChevronLeft as ea, ChevronRight as cn, ChevronDown as it, Check as Pt, ChevronUp as xl, CalendarIcon as Hi, MoreVertical as Ml, RefreshCw as Tl, Image as Rl, Sheet as Ol, Search as _l, ListChecks as Al, Table2 as Gi, Database as Yi, Layers as Qi, Calendar as Dl, Type as Ji, Hash as Wa, MapPin as Ll, Variable as El, Plus as _t, Trash2 as $t, ListFilter as Fl, EyeOff as Il, Eye as Pl, AlertTriangle as $l, GripVertical as zl, X as Ba, ArrowLeftRight as Vl, Save as Xi, SlidersHorizontal as jl, Braces as Wl, Undo2 as Bl, Redo2 as Kl, RotateCcw as ql, Pencil as Ul, Copy as Hl, Bold as Gl, Italic as Yl, Strikethrough as Ql, Heading1 as Jl, Heading2 as Xl, List as Zl, ListOrdered as ec, Quote as tc, Box as nc } from "lucide-react";
import * as Tn from "@radix-ui/react-popover";
import { cva as ta } from "class-variance-authority";
import rc from "@cubejs-client/core";
import { DayPicker as ac, useDayPicker as ic } from "react-day-picker";
import { pie as oc, radialArc as yr, radialText as rr, polar as Zi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as eo } from "react-grid-layout";
import { useEditor as to, EditorContent as no } from "@tiptap/react";
import ro from "@tiptap/starter-kit";
const Tt = 5, Rn = p.object({ var: p.string().min(1) }).strict();
function Se(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const On = (e) => p.union([e, Rn]), sc = p.union([p.string(), p.number(), p.boolean()]), et = p.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), At = "auto", lc = p.union([et, p.literal(At)]), kr = p.union([p.tuple([p.string(), p.string()]), p.string()]), ao = p.union([
  p.string(),
  p.number(),
  p.boolean(),
  p.tuple([p.string(), p.string()]),
  // absolute date range
  p.array(p.string()),
  p.array(p.number())
]), me = p.string().min(1), cc = p.enum([
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
]), uc = p.object({
  member: me,
  operator: cc,
  values: p.array(p.union([sc, Rn])).optional()
}).strict(), wr = p.lazy(
  () => p.union([
    uc,
    p.object({ and: p.array(wr) }).strict(),
    p.object({ or: p.array(wr) }).strict()
  ])
), mc = p.object({
  dimension: me,
  granularity: On(lc).optional(),
  dateRange: On(kr).optional(),
  compareDateRange: p.array(kr).optional()
}).strict(), Ka = p.enum(["asc", "desc"]), dc = p.union([
  p.record(me, Ka),
  p.array(p.tuple([me, Ka]))
]), io = p.object({
  measures: p.array(me).optional(),
  dimensions: p.array(me).optional(),
  timeDimensions: p.array(mc).optional(),
  filters: p.array(wr).optional(),
  segments: p.array(me).optional(),
  order: dc.optional(),
  limit: On(p.number()).optional(),
  offset: On(p.number()).optional(),
  total: p.boolean().optional(),
  timezone: p.string().optional()
}).strict(), fc = p.string().min(1), py = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], tt = p.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), hc = p.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), na = p.object({
  kind: hc.optional(),
  decimals: p.number().optional(),
  abbreviate: p.boolean().optional(),
  prefix: p.string().optional(),
  suffix: p.string().optional(),
  unitSystem: p.enum(["metric", "imperial"]).optional(),
  dateFormat: p.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: p.string().optional()
}).strict(), qa = p.object({
  label: p.string().optional(),
  colorToken: tt.optional(),
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
}).strict(), pc = p.object({
  category: p.object({ member: me }).strict(),
  series: p.union([
    p.object({
      mode: p.literal("measures"),
      members: p.array(me),
      meta: p.record(me, qa).optional()
    }).strict(),
    p.object({
      mode: p.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: me,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: p.array(me).optional(),
      pivot: me,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: p.record(me, qa).optional()
    }).strict()
  ])
}).strict(), gc = p.object({
  show: p.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: p.enum(["top", "bottom"]).optional()
}).strict(), vc = p.object({
  show: p.boolean().optional(),
  indicator: p.enum(["dot", "line", "dashed"]).optional(),
  showTotal: p.boolean().optional()
}).strict(), Ua = p.object({
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
  tickFormat: na.optional()
}).strict(), bc = p.object({
  x: Ua.optional(),
  y: Ua.optional()
}).strict(), yc = p.object({
  byKey: p.record(p.string(), tt).optional(),
  ramp: p.array(tt).optional()
}).strict(), vn = 7, kc = p.enum(["rollingAvg", "cumulative", "percentOfTotal"]), wc = p.object({
  kind: kc,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: p.number().int().min(2).max(90).optional()
}).strict(), oo = p.object({
  family: fc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: pc.optional(),
  orientation: p.enum(["vertical", "horizontal"]).optional(),
  stackMode: p.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: gc.optional(),
  tooltip: vc.optional(),
  axes: bc.optional(),
  colors: yc.optional(),
  format: na.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: wc.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: p.record(p.string(), p.unknown()).optional()
}).strict(), Cc = p.object({ type: p.string(), content: p.array(p.unknown()).optional() }).passthrough(), Nc = p.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Sc = p.object({
  variable: p.string().min(1),
  control: p.discriminatedUnion("kind", [
    p.object({
      kind: p.literal("dateRange"),
      presets: p.array(p.string()).optional(),
      allowFuture: p.boolean().optional()
    }).strict(),
    p.object({
      kind: p.literal("granularity"),
      options: p.array(et).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: p.string().optional()
    }).strict(),
    p.object({
      kind: p.literal("select"),
      options: p.array(p.object({ value: ao, label: p.string() }).strict()),
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
}).strict(), ra = {
  id: p.string().min(1),
  title: p.string().optional()
}, xc = p.object({ ...ra, type: p.literal("chart"), query: io.default({}), chart: oo }).strict(), Mc = p.object({ ...ra, type: p.literal("text"), doc: Cc }).strict(), Tc = p.object({ ...ra, type: p.literal("input"), control: Sc }).strict(), Rc = p.discriminatedUnion("type", [
  xc,
  Mc,
  Tc
]), Oc = p.object({
  i: p.string(),
  x: p.number(),
  y: p.number(),
  w: p.number(),
  h: p.number(),
  minW: p.number().optional(),
  minH: p.number().optional(),
  static: p.boolean().optional()
}).strict(), _c = p.object({
  cols: p.number().optional(),
  rowHeight: p.number().optional(),
  margin: p.tuple([p.number(), p.number()]).optional(),
  containerPadding: p.tuple([p.number(), p.number()]).optional()
}).strict(), so = p.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Ac = p.object({
  name: p.string().min(1),
  type: so,
  label: p.string().optional(),
  array: p.boolean().optional(),
  default: ao.optional()
}).strict(), lo = {
  schemaVersion: p.literal(Tt),
  id: p.string().min(1),
  name: p.string().optional(),
  description: p.string().optional(),
  createdAt: p.string().optional(),
  updatedAt: p.string().optional()
}, co = p.object({ ...lo, kind: p.literal("chart"), query: io.default({}), chart: oo }).strict(), Cr = p.object({
  ...lo,
  kind: p.literal("dashboard"),
  variables: p.array(Ac),
  widgets: p.array(Rc),
  layout: p.array(Oc),
  grid: _c.optional()
}).strict(), uo = p.discriminatedUnion("kind", [co, Cr]);
function X(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Ke(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function Dc(e) {
  if (!X(e.axes)) return;
  const t = Ke(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Lc(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!X(a)) continue;
    const i = Ke(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Ec(e) {
  if (!X(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => X(n) ? Ke(n, "side") ?? {} : n
  ));
}
function Fc(e) {
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
function Ha(e) {
  X(e) && (e.family === "combo" && Fc(e), Dc(e), Lc(e), Ec(e));
}
function Ic(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ha(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && Ha(n.chart);
  return t;
}
function Pc(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!X(a)) continue;
    const i = Ke(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function $c(e) {
  if (!X(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function zc(e) {
  if (X(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!X(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = Ke(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function Vc(e) {
  if (!X(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = Ke(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Ga(e) {
  X(e) && (Pc(e), $c(e), zc(e), Vc(e));
}
function jc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ga(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && Ga(n.chart);
  return t;
}
const Wc = {
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
function Bc(e) {
  if (!X(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = Wc[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = Ke(r, a) ?? {};
  e.familyOptions = r;
}
function Kc(e) {
  if (X(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!X(n) || n.labelHide !== !0) continue;
      const r = Ke(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function Ya(e) {
  X(e) && (Bc(e), Kc(e));
}
function qc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ya(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      X(n) && n.type === "chart" && Ya(n.chart);
  return t;
}
function Uc(e) {
  if (!X(e.mapping)) return;
  const t = e.mapping.series;
  if (!X(t) || !X(t.meta)) return;
  let n;
  const r = {};
  for (const [o, s] of Object.entries(t.meta)) {
    if (!X(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = Ke(s, "curve");
    c && (r[o] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const a = e.family;
  if (n === void 0 || a !== "line" && a !== "area") return;
  const i = X(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function Hc(e) {
  const t = structuredClone(e), n = (r) => {
    X(r) && Uc(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      X(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Gc = {
  1: Ic,
  2: jc,
  3: qc,
  4: Hc
};
function Yc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Tt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Tt} — update the library`
    );
  for (; n < Tt; ) {
    const r = Gc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return uo.parse(t);
}
function gy(e) {
  try {
    return { ok: !0, spec: Yc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function vy(e) {
  return uo.parse(e);
}
function Qc(e) {
  return rc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Jc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function _(...e) {
  return gl(e);
}
function Xc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: _("cv-skeleton", e), ...t });
}
const Zc = ta(
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
), $n = y.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: _(Zc({ variant: t }), e),
    ...n
  }
));
$n.displayName = "Alert";
const zn = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: _("cv-alert-title", e),
      ...t
    }
  )
);
zn.displayName = "AlertTitle";
const Vn = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: _("cv-alert-description", e),
      ...t
    }
  )
);
Vn.displayName = "AlertDescription";
const eu = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, tu = "MMM d, yyyy";
function mo(e) {
  if (e instanceof Date) return Wt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Wt(r) ? r : null;
  }
  const t = Sn(e);
  if (Wt(t)) return t;
  const n = new Date(e);
  return Wt(n) ? n : null;
}
function aa(e) {
  return /^\d{4}-\d{2}/.test(e) ? Wt(Sn(e)) : !1;
}
function nu(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? eu[t] : tu;
}
function Jt(e, t, n) {
  const r = mo(e);
  return r ? ve(r, nu(t, n)) : String(e);
}
function by(e, t) {
  return (n) => n == null ? "" : Jt(n, e, t);
}
function yy(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Jt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Jt(e, t.format, t.granularity) : String(e) : aa(e) ? Jt(e, t.format, t.granularity) : e;
}
const Qa = "—", ru = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Ja(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function au(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of ru)
    if (n >= r) return Ja((e / r).toFixed(t)) + a;
  return Ja(e.toFixed(t));
}
function iu(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function ou(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? au(e, n.decimals ?? 1) : iu(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function fo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function su(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || fo(e.value) ? !0 : typeof e.value == "string" ? aa(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const ia = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Qa : (fo(t) || typeof t == "string" || typeof t == "number") && su(e) ? Jt(t, n, r) : typeof t == "number" ? ou(t, e) : String(t);
};
function lu(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function ky(e, t) {
  return (n, r) => {
    const a = r ? lu(r, t) : void 0;
    return ia({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function cu(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function uu(e) {
  const t = et.safeParse(e);
  return t.success ? t.data : void 0;
}
function mu(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = uu(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function oa(e, t, n, r) {
  const a = mu(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : oa(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, c = "value") {
      const u = s ? cu(s, e) : void 0, d = u == null ? void 0 : u.meta;
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
const jn = p.object({
  axis: p.enum(["x", "y"]),
  value: p.number(),
  label: p.string().optional(),
  colorToken: tt.optional()
}).strict(), sa = p.boolean().optional(), du = p.object({
  showValueLabels: p.boolean().optional(),
  referenceLines: p.array(jn).optional(),
  comparePrevious: sa
}).strict(), ho = p.enum(["linear", "monotone", "step", "natural"]), fu = p.object({
  curve: ho.optional(),
  dots: p.union([p.boolean(), p.literal("active")]).optional(),
  connectNulls: p.boolean().optional(),
  chrome: p.enum(["full", "none"]).optional(),
  referenceLines: p.array(jn).optional(),
  showValueLabels: p.boolean().optional(),
  comparePrevious: sa
}).strict(), hu = p.object({
  curve: ho.optional(),
  connectNulls: p.boolean().optional(),
  dots: p.boolean().optional(),
  referenceLines: p.array(jn).optional(),
  comparePrevious: sa
}).strict(), pu = p.object({
  innerRadiusPct: p.number().optional(),
  showLabels: p.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: p.object({ value: p.string().optional(), label: p.string().optional() }).strict().optional(),
  maxSlices: p.number().optional()
}).strict(), gu = p.object({
  x: me,
  y: me,
  size: me.optional(),
  groupBy: me.optional(),
  referenceLines: p.array(jn).optional()
}).strict(), vu = p.object({
  display: p.enum(["number", "gauge"]).optional(),
  measure: me,
  comparison: p.object({
    mode: p.enum(["previousPeriod", "value"]),
    value: p.union([me, p.number()]).optional(),
    showAsPercent: p.boolean().optional(),
    goodDirection: p.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: p.object({
    member: me.optional(),
    timeDimension: me.optional(),
    granularity: p.union([et, Rn]).optional(),
    dateRange: p.union([kr, Rn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: p.enum(["up", "down"]).optional(),
  gauge: p.object({
    min: p.number().optional(),
    max: p.number(),
    thresholds: p.array(p.object({ at: p.number(), colorToken: tt }).strict()).optional()
  }).strict().optional()
}).strict(), bu = p.object({
  member: me,
  label: p.string().optional(),
  format: na.optional(),
  align: p.enum(["left", "right", "center"]).optional(),
  width: p.number().optional(),
  hidden: p.boolean().optional()
}).strict(), yu = p.object({
  member: me,
  when: p.object({
    op: p.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: p.number()
  }).strict(),
  colorToken: tt.optional()
}).strict(), ku = p.object({
  columns: p.array(bu).optional(),
  pageSize: p.number().optional(),
  conditionalFormat: p.array(yu).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), wu = p.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: tt.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), Ue = {
  bar: du,
  line: fu,
  area: hu,
  pie: pu,
  scatter: gu,
  heatmap: wu,
  kpi: vu,
  table: ku
}, He = {
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
function Xa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Nr(e, t) {
  if (t === void 0) return e;
  if (!Xa(e) || !Xa(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? Nr(e[r], a) : a);
  }
  return n;
}
const Cu = { envelope: {}, familyOptions: {} };
function Nu(e, t) {
  return {
    ...Nr({ ...t.envelope }, e),
    familyOptions: Nr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const po = {}, Za = () => {
}, Su = {
  target: po,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Za,
  emitPoint: Za
}, _n = y.createContext(null);
_n.displayName = "ChartInteractionContext";
function go() {
  return y.useContext(_n) ?? Su;
}
function la({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = y.useContext(_n), o = y.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  y.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = y.useCallback((g) => {
    const { parent: v, widgetId: k, onRangeSelect: w } = o.current, C = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(C) : v == null || v.emitRange(C);
  }, []), c = y.useCallback((g) => {
    const { parent: v, widgetId: k, onPointSelect: w } = o.current, C = g && g.widgetId === void 0 && k !== void 0 ? { ...g, widgetId: k } : g;
    w ? w(C) : v == null || v.emitPoint(C);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), d = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), m = i == null ? void 0 : i.target, h = y.useMemo(
    () => m || r ? { ...m, ...r } : po,
    [m, r]
  ), f = y.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: h,
      rangeEnabled: u,
      pointEnabled: d,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, h, u, d, s, c]
  );
  return /* @__PURE__ */ l(_n.Provider, { value: f, children: a });
}
function Je(e, t) {
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
function Sr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function vo(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = Sr(n), a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function xr(e, t, n) {
  const r = [];
  return e.categories.forEach((a, i) => {
    var d, m, h;
    const o = (d = n == null ? void 0 : n.temporal) == null ? void 0 : d.dates[i], s = /* @__PURE__ */ new Map();
    for (const f of t) {
      const g = f.data[i];
      if (typeof g == "number" && Number.isFinite(g)) {
        const v = Sr(f);
        s.set(v, (s.get(v) ?? 0) + Math.abs(g));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const f of t) {
      const g = f.data[i] ?? null, v = Sr(f), k = s.get(v) ?? 0, w = g === null || k === 0 ? null : Math.abs(g) / k;
      let C = 0, A = 0;
      if (g !== null) {
        const M = g < 0 ? u : c;
        C = M.get(v) ?? 0, A = C + g, M.set(v, A);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: g,
        key: f.key,
        label: f.label,
        member: ((m = f.meta) == null ? void 0 : m.measure) ?? f.key,
        companion: ((h = f.meta) == null ? void 0 : h.companion) ?? !1,
        i,
        stack: v,
        y1: C * N,
        y2: A * N,
        share: w
      });
    }
  }), r;
}
function Mr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function rn(e) {
  return e.label || e.key;
}
function Qe(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ca(e, t) {
  const n = e.series.map(rn), r = e.series.map(Qe), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Yr({ placement: zt(t.legendPlacement) })), a;
}
function zt(e) {
  return e === "top" ? "top" : "bottom";
}
function un(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function An(e = 0.2) {
  return il().padding(e);
}
function bo() {
  return ol().padding(0.02);
}
const xu = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Mu(e) {
  if (typeof e == "string" && xu.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return mo(e);
}
function yo(e) {
  return e.toISOString().slice(0, -1);
}
function ei(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = et.safeParse(n);
  return r.success ? r.data : void 0;
}
function ko(e, t) {
  var d, m, h;
  const n = (m = (d = t.mapping) == null ? void 0 : d.category) == null ? void 0 : m.member, r = (h = e.raw.annotation) == null ? void 0 : h.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const f of Object.keys(r))
    if (f === n || f.startsWith(`${n}.`)) {
      a = f;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? ei(n) : ei(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const f of e.categories) {
    if (typeof f == "number" && i === void 0 || typeof f == "string" && !aa(f)) return null;
    const g = Mu(f);
    if (!g) return null;
    s.push(g);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((f) => c.has(f.getTime()) ? !1 : (c.add(f.getTime()), !0)).sort((f, g) => f.getTime() - g.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function wo(e) {
  return e ? ul : bo;
}
function ua(e) {
  return e ? "t" : "cat";
}
function Dn(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, a) => {
    const i = e.categories[a];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? yo(r)) : t.category(r);
}
function ti(e, t) {
  const n = e.dates.findIndex((a) => a.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : yo(t);
}
function Co(e, t) {
  const n = go(), [r, a] = y.useState(null), i = y.useRef({ opts: t, interactions: n, temporal: e });
  y.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const o = n.rangeEnabled && e !== null;
  return y.useMemo(() => {
    if (!o || !e) return;
    const s = e.values, c = (f) => f !== void 0 && s.some((g) => g.getTime() === f.getTime()), u = r && c(r.start) && c(r.end) ? r : null, d = s[0], m = u ?? { start: d, end: d }, h = u === null;
    return [
      ll({
        id: "cv-brush-x",
        values: s,
        range: cl(
          m,
          (f, { reason: g }) => {
            if (g.type !== "commit") return;
            const v = i.current.temporal, k = f.start.getTime() === f.end.getTime();
            if (a(k ? null : f), k || !v) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: v.member,
              granularity: v.granularity,
              from: ti(v, f.start),
              to: ti(v, f.end)
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
        selectionStyle: h ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: h ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function Tu(e, t) {
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
function Dt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? ja().domain(r) : ja();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: Nn().domain(r), nice: !1 } : { scale: Nn, nice: !0 };
}
function No(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function an(e) {
  switch (e) {
    case "monotone":
      return nr(hl);
    case "step":
      return nr(fl);
    case "natural":
      return nr(dl);
    default:
      return;
  }
}
function Lt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ma(e, t) {
  var o, s, c, u;
  const n = e.raw.annotation, r = (d) => {
    var m, h, f, g, v, k;
    if (d)
      return ((m = n == null ? void 0 : n.measures[d]) == null ? void 0 : m.shortTitle) ?? ((h = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : h.shortTitle) ?? ((f = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : f.shortTitle) ?? ((g = n == null ? void 0 : n.measures[d]) == null ? void 0 : g.title) ?? ((v = n == null ? void 0 : n.dimensions[d]) == null ? void 0 : v.title) ?? ((k = n == null ? void 0 : n.timeDimensions[d]) == null ? void 0 : k.title) ?? d;
  }, a = e.series[0], i = (d) => {
    var m;
    return d ? (m = d.meta) != null && m.measure ? r(d.meta.measure) : d.label : void 0;
  };
  return {
    x: Lt((o = t.axes) == null ? void 0 : o.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Lt((u = t.axes) == null ? void 0 : u.y, i(a))
  };
}
function $e(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function da(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Ru(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.value : void 0;
}
function nt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function fa(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function Wn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Qr,
    className: fa(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((m) => {
        var h;
        return { datum: m, color: (h = e.colorOf) == null ? void 0 : h.call(e, m) };
      }) : a.map((m) => ({ datum: m.datum, color: m.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const m of s) {
          const h = m.datum.value;
          m.datum.companion || typeof h != "number" || !Number.isFinite(h) || (c += h, u += 1);
        }
      const d = s.map((m) => ({
        label: m.datum.label,
        value: e.percentShare && c > 0 && typeof m.datum.value == "number" ? nt(m.datum.value / c, e.locale) : n(m.datum),
        color: m.color
      }));
      return e.showTotal && u > 1 && d.push({
        label: "Total",
        value: e.percentShare ? nt(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: d };
    }
  };
}
function ha(e) {
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
function pa(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], a = t[0];
  return e.forEach((i, o) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", d = u ? t[i.value] : void 0;
    if (u && d == null) return;
    const m = n != null && n.swap ? !u : u, h = m ? n != null && n.swap ? i.value : d : n != null && n.swap ? d : i.value;
    if (r.push(
      m ? Pi([h], { id: `cv-ref-${o}`, ...c }) : $i([h], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const f = u ? n == null ? void 0 : n.valueAnchor : a;
    if (f == null) return;
    const g = (n == null ? void 0 : n.swap) === !0;
    r.push(
      ha(
        nn(
          [
            {
              x: m ? h : f,
              y: m ? f : h,
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
function ga(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function So(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = ua((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? nt(c, n.locale) : "";
  };
  return [
    ha(
      nn(r, {
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
const Ou = Wi({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), _u = Wi({ initial: !1 });
function ot({
  definition: e,
  ariaLabel: t,
  className: n,
  sparkline: r,
  animateInitial: a = !0,
  minHeight: i = 200,
  onSelect: o,
  resolveSelection: s
}) {
  const c = y.useRef(null), u = go(), d = u.pointEnabled && !r, m = y.useRef(s);
  y.useLayoutEffect(() => {
    m.current = s;
  });
  const h = y.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const C = m.current, A = C ? C(w) : Tu(w, u.target);
      A && u.emitPoint(A);
    },
    [u]
  ), [f, g] = y.useState({ w: 0, h: 0 }), v = y.useId().replace(/:/g, "");
  y.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((A) => {
      var M;
      const N = (M = A[0]) == null ? void 0 : M.contentRect;
      N && g({ w: Math.floor(N.width), h: Math.floor(N.height) });
    });
    return C.observe(w), () => C.disconnect();
  }, []);
  const k = r ? Math.max(24, f.h || Math.round((f.w || 160) / 5)) : Math.max(i, f.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: f.w > 0 && /* @__PURE__ */ l(
        sl,
        {
          definition: e,
          renderer: a ? Ou : _u,
          width: f.w,
          height: k,
          ariaLabel: t,
          idPrefix: v,
          onSelect: o ?? (d ? h : void 0)
        }
      )
    }
  );
}
function Au({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = y.useMemo(() => {
    var Z, te, se, ue, le, fe, ge, V, ee, oe, L, x;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, d = e.series.filter((S) => {
      var R;
      return (R = S.meta) == null ? void 0 : R.companion;
    }), m = d.length ? e.series.filter((S) => {
      var R;
      return !((R = S.meta) != null && R.companion);
    }) : e.series, h = u ? m : e.series, g = (u ? vo(h) : []).length > 1, v = g ? xr(e, h, { normalize: c }) : Je(e, { series: h }), k = new Map(e.series.map((S) => [rn(S), Qe(S)])), w = /* @__PURE__ */ new Map();
    if (g)
      for (const S of v) {
        const R = w.get(S.i);
        R ? R.push(S) : w.set(S.i, [S]);
      }
    const C = ma(e, t), A = s ? (te = (Z = t.axes) == null ? void 0 : Z.y) == null ? void 0 : te.hide : (ue = (se = t.axes) == null ? void 0 : se.x) == null ? void 0 : ue.hide, N = s ? (le = t.axes) == null ? void 0 : le.x : (fe = t.axes) == null ? void 0 : fe.y, M = Dt(N), E = r.barCategoryGap, O = s ? (ge = t.axes) == null ? void 0 : ge.y : (V = t.axes) == null ? void 0 : V.x, z = $e(n, O), j = $e(n, N), T = Ru(t) ?? da(e.series[0]), D = (S) => c ? nt(S) : j.value(S, T, "axis"), P = A ? !1 : {
      label: C.x,
      ticks: { format: (S) => z.category(S) }
    }, F = N != null && N.hide ? !1 : { label: C.y, ticks: { format: D } }, U = nl({ padding: r.barGap }), $ = g ? U : c ? zi({ offset: "normalize" }) : u ? void 0 : U, I = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (S) => g ? S.stack : S.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (S) => `${S.label} ${S.i}`,
      layout: $,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (S) => {
        const R = k.get(S.label) ?? "var(--chart-1)";
        return S.companion ? `color-mix(in oklab, ${R} 40%, transparent)` : R;
      }
    }, Y = [
      g ? s ? za(v, { ...I, x1: "y1", x2: "y2", y: "cat" }) : Va(v, { ...I, x: "cat", y1: "y1", y2: "y2" }) : s ? za(v, { ...I, x: "value", y: "cat" }) : Va(v, { ...I, x: "cat", y: "value" })
    ];
    if (u && !c && d.length) {
      const S = e.categories.map((R, W) => {
        var q, H, J;
        return {
          cat: typeof R == "number" ? R : String(R),
          value: d.reduce((B, G) => {
            const K = G.data[W];
            return typeof K != "number" ? B : (B ?? 0) + K;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((H = (q = d[0]) == null ? void 0 : q.meta) == null ? void 0 : H.measure) ?? ((J = d[0]) == null ? void 0 : J.key),
          companion: !0,
          i: W
        };
      });
      if (S.some((R) => R.value !== null)) {
        const R = {
          id: "cv-bars-prev",
          key: (W) => `prev ${W.i}`,
          curve: an("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        Y.push(
          s ? rl(S, { ...R, x: "value", y: "cat" }) : Pn(S, { ...R, x: "cat", y: "value" })
        );
      }
    }
    if (Y.push(
      ...pa(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: ga(e)
      })
    ), a.showValueLabels) {
      const S = u ? g ? v : xr(e, h, { normalize: c }) : v;
      Y.push(
        ...So(S, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return at({
      marks: Y,
      x: s ? { scale: M.scale, nice: M.nice, grid: !0, axis: F } : { scale: () => An(E), axis: P },
      y: s ? { scale: () => An(E), axis: P } : { scale: M.scale, nice: M.nice, grid: !0, axis: F },
      color: ca(u ? { ...e, series: h } : e, {
        legend: un(t) && h.length > 1,
        legendPlacement: zt((ee = t.legend) == null ? void 0 : ee.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : Wn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !g,
        value: c && g ? (S) => {
          const R = S.share;
          return typeof R == "number" ? nt(R) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: g ? (S) => w.get(S.i) ?? [S] : void 0,
        colorOf: g ? (S) => k.get(S.label) ?? "var(--chart-1)" : void 0,
        indicator: (L = t.tooltip) == null ? void 0 : L.indicator,
        showTotal: (x = t.tooltip) == null ? void 0 : x.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(rn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(ot, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function Du({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = y.useMemo(
    () => i ? null : ko(e, t),
    [e, t, i]
  ), s = y.useMemo(() => Dn(o, n), [o, n]), c = (f = t.axes) == null ? void 0 : f.x, u = y.useMemo(
    () => c != null && c.tickFormat ? Dn(o, $e(n, c)) : s,
    [o, n, c, s]
  ), d = Co(o, {
    label: s,
    ariaLabel: "Time range"
  }), m = y.useMemo(() => {
    var E, O, z, j, T, D, P, F, U;
    const g = ua(o), v = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = an(k), C = ma(e, t), A = Dt((E = t.axes) == null ? void 0 : E.y), N = e.categories.length <= 1, M = e.series.map(($) => {
      var Y, Z, te;
      const I = Je(e, { series: [$], skipNull: v, temporal: o });
      return Pn(I, {
        id: `cv-line-${$.key}`,
        x: g,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (Y = $.meta) != null && Y.companion ? "5 4" : void 0,
        strokeOpacity: (Z = $.meta) != null && Z.companion ? 0.55 : void 0,
        stroke: Qe($),
        points: !i && !((te = $.meta) != null && te.companion) && (No($, a.dots) || N)
      });
    });
    return i || (M.push(
      ...pa(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: ga(e)
      }),
      ...So(
        a.showValueLabels ? Je(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), M.push(ji({ x: {}, y: !1, marker: a.dots !== !1 }))), at({
      marks: M,
      x: {
        scale: wo(o),
        axis: i || (z = (O = t.axes) == null ? void 0 : O.x) != null && z.hide ? !1 : {
          label: C.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: A.scale,
        nice: A.nice,
        grid: !i,
        axis: i || (T = (j = t.axes) == null ? void 0 : j.y) != null && T.hide ? !1 : {
          label: C.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: ($) => {
              var I, Y, Z, te;
              return $e(n, (I = t.axes) == null ? void 0 : I.y).value(
                $,
                ((Z = (Y = e.series[0]) == null ? void 0 : Y.meta) == null ? void 0 : Z.measure) ?? ((te = e.series[0]) == null ? void 0 : te.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ca(e, {
        legend: !i && un(t) && e.series.length > 1,
        legendPlacement: zt((D = t.legend) == null ? void 0 : D.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((P = t.tooltip) == null ? void 0 : P.show) === !1 ? void 0 : Wn({
        format: n,
        category: s,
        indicator: (F = t.tooltip) == null ? void 0 : F.indicator,
        showTotal: (U = t.tooltip) == null ? void 0 : U.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: d
    });
  }, [e, t, n, a, r, i, o, s, u, d]), h = e.series.map(rn).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    ot,
    {
      definition: m,
      ariaLabel: h,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function Lu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, C;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", c = o === "percent", u = y.useMemo(() => ko(e, t), [e, t]), d = y.useMemo(() => Dn(u, n), [u, n]), m = (C = t.axes) == null ? void 0 : C.x, h = y.useMemo(
    () => m != null && m.tickFormat ? Dn(u, $e(n, m)) : d,
    [u, n, m, d]
  ), f = Co(u, { label: d, ariaLabel: "Time range" }), g = y.useMemo(() => {
    var se, ue, le, fe, ge, V, ee, oe, L;
    const A = ua(u), N = a.connectNulls ?? !1, M = a.curve ?? "monotone", E = an(M), O = r.areaFillOpacity, z = r.stackedAreaFillOpacity, j = r.lineWidth, T = ma(e, t), D = Dt((se = t.axes) == null ? void 0 : se.y), P = da(e.series[0]), F = e.series.filter((x) => {
      var S;
      return !((S = x.meta) != null && S.companion);
    }), U = c ? [] : e.series.filter((x) => {
      var S;
      return (S = x.meta) == null ? void 0 : S.companion;
    }), $ = new Map(e.series.map((x) => [x.key, Qe(x)])), I = [], Y = (x) => `cv-area-fill-${x.replace(/[^a-zA-Z0-9_-]/g, "-")}`, Z = s ? void 0 : F.map((x) => ({
      id: Y(x.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: Qe(x), opacity: O * 0.15 },
        { offset: 1, color: Qe(x), opacity: O }
      ]
    }));
    if (s)
      for (const { stackId: x, series: S } of vo(F)) {
        const R = Je(e, { series: S, skipNull: N, temporal: u });
        I.push(
          vr(R, {
            id: x ? `cv-area-stack-${x}` : "cv-area-stack",
            x: A,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (W) => `${W.key}:${W.i}`,
            curve: E,
            fillOpacity: z,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (W) => $.get(W.key) ?? "currentColor",
            strokeWidth: j,
            layout: c ? zi({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const x of F) {
        const S = Je(e, { series: [x], skipNull: N, temporal: u });
        I.push(
          vr(S, {
            id: `cv-area-${x.key}`,
            x: A,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: E,
            fill: `url(#${Y(x.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: Qe(x),
            strokeWidth: j
          })
        );
      }
    for (const x of U) {
      const S = Je(e, { series: [x], skipNull: N, temporal: u });
      I.push(
        Pn(S, {
          id: `cv-area-prev-${x.key}`,
          x: A,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: E,
          strokeWidth: j,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: Qe(x)
        })
      );
    }
    const te = new Set(
      F.filter((x) => No(x, a.dots)).map((x) => x.key)
    );
    if (te.size > 0) {
      const x = s ? xr(e, F, { normalize: c, temporal: u }).filter(
        (S) => te.has(S.key) && S.value !== null
      ) : Je(e, {
        series: F.filter((S) => te.has(S.key)),
        skipNull: !0,
        temporal: u
      });
      I.push(
        Vi(x, {
          id: "cv-area-dots",
          x: A,
          y: (S) => s ? S.y2 ?? null : S.value,
          z: "label",
          color: "label",
          key: (S) => `${S.key}:${S.i}`,
          r: 3
        })
      );
    }
    return I.push(
      ...pa(a.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: ga(e)
      })
    ), I.push(ji({ x: {}, y: !1, marker: !0 })), at({
      marks: I,
      gradients: Z,
      x: {
        scale: wo(u),
        axis: (le = (ue = t.axes) == null ? void 0 : ue.x) != null && le.hide ? !1 : {
          label: T.x,
          ticks: { format: h }
        }
      },
      y: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (ge = (fe = t.axes) == null ? void 0 : fe.y) != null && ge.hide ? !1 : {
          label: T.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (x) => {
              var S;
              return c ? nt(x) : $e(n, (S = t.axes) == null ? void 0 : S.y).value(x, P, "axis");
            }
          }
        }
      },
      color: ca(e, {
        legend: un(t) && e.series.length > 1,
        legendPlacement: zt((V = t.legend) == null ? void 0 : V.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((ee = t.tooltip) == null ? void 0 : ee.show) === !1 ? void 0 : Wn({
        format: n,
        percentShare: c,
        category: d,
        indicator: (oe = t.tooltip) == null ? void 0 : oe.indicator,
        showTotal: (L = t.tooltip) == null ? void 0 : L.showTotal
      }),
      keyboard: !0,
      controls: f
    });
  }, [e, t, n, a, r, s, c, u, d, h, f]), v = e.series.map(rn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(ot, { definition: g, ariaLabel: v, className: "cv-chart--fill" });
}
const Eu = 0.26, Fu = 0.03, ni = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Iu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var g, v;
  const a = t.familyOptions ?? {}, i = e.series[0], o = da(i), s = (v = (g = t.colors) == null ? void 0 : g.ramp) != null && v.length ? t.colors.ramp : Kn, c = y.useMemo(() => {
    const k = e.categories.map((w, C) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[C]) ?? 0
    }));
    return Pu(k, a.maxSlices).map((w, C) => ({
      ...w,
      token: s[C % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), u = c.reduce((k, w) => k + w.value, 0), d = c.some((k) => k.value < 0), m = d || c.length === 0 || u <= 0, h = y.useMemo(() => {
    var T, D, P;
    if (m) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = k > 0, C = a.showLabels ?? "percent", A = C !== "none", N = A ? Math.min(r.pieRadiusPct / 100, 1 - Eu) : r.pieRadiusPct / 100, M = oc(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), O = [yr(M, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: F }) => F * k,
      outerRadius: ({ radius: F }) => F * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (A) {
      const F = (U) => C === "name" ? U.label : C === "value" ? n.value(U.value, o, "label") : nt(U.fraction);
      O.push(
        rr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          M.filter((U) => U.value > 0 && U.fraction >= Fu),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (U) => U.angle,
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
    if (w && a.centerLabel) {
      const F = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(u, o, "label") : a.centerLabel.value;
      if (O.push(
        rr([{ id: "cv-pie-center" }], {
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
        const U = a.centerLabel.label;
        O.push(
          rr([{ id: "cv-pie-center-sub" }], {
            id: "cv-pie-center-sub",
            key: "id",
            angle: 0,
            radius: 0,
            dy: 20,
            text: () => U,
            fill: "var(--muted-foreground)",
            fontSize: 10,
            anchor: "middle",
            baseline: "middle"
          })
        );
      }
    }
    const z = {
      domain: c.map((F) => F.label),
      range: c.map((F) => `var(--${F.token})`)
    };
    un(t) && (z.legend = Yr({ placement: zt((T = t.legend) == null ? void 0 : T.position) }));
    const j = i ? i.label || i.key : "";
    return at({
      marks: [
        Zi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Nn().domain([0, Math.PI * 2]) },
          radius: { scale: Nn().domain([0, 1]) },
          marks: O
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: z,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((D = t.tooltip) == null ? void 0 : D.show) === !1 ? void 0 : {
        use: Qr,
        className: fa((P = t.tooltip) == null ? void 0 : P.indicator),
        content: (F) => {
          const U = F[0];
          if (!U) return { rows: [] };
          const $ = U.datum;
          return {
            title: $.label,
            rows: [
              {
                label: j,
                value: `${n.value($.value, o, "tooltip")} (${nt($.fraction)})`,
                color: U.color
              }
            ]
          };
        }
      },
      keyboard: !0
    });
  }, [m, c, u, t, n, a, r, i, o]);
  if (d)
    return /* @__PURE__ */ l("div", { style: ni, children: "Pie charts can't show negative values" });
  if (!h)
    return /* @__PURE__ */ l("div", { style: ni, children: "No data" });
  const f = c.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(ot, { definition: h, ariaLabel: f, className: "cv-chart--fill" });
}
function Pu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function $u({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (f) => {
    var g, v;
    return ((g = i == null ? void 0 : i.measures[f]) == null ? void 0 : g.shortTitle) ?? ((v = i == null ? void 0 : i.dimensions[f]) == null ? void 0 : v.shortTitle) ?? f;
  }, s = a.x ? o(a.x) : "x", c = a.y ? o(a.y) : "y", u = a.size ? o(a.size) : void 0, d = y.useMemo(() => {
    var $, I, Y, Z, te, se, ue, le, fe, ge, V, ee, oe, L;
    if (!a.x || !a.y) return null;
    const f = Vu(e.raw.rows, a);
    if (f.length === 0) return null;
    const g = !!a.groupBy, v = [];
    if (g)
      for (const x of f)
        x.group !== void 0 && !v.includes(x.group) && v.push(x.group);
    const [k, w] = r.bubbleAreaRange, C = Math.sqrt(Math.max(k, 0) / Math.PI), A = Math.sqrt(Math.max(w, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, M = (I = ($ = t.colors) == null ? void 0 : $.ramp) != null && I.length ? t.colors.ramp : Kn;
    g ? (N.z = "group", N.color = "group") : N.fill = `var(--${M[0]})`, a.size ? (N.r = (x) => x.size ?? 0, N.rScale = { scale: () => ml().range([C, A]) }) : N.r = 4;
    const E = [Vi(f, N)];
    (Y = a.referenceLines) == null || Y.forEach((x, S) => {
      const R = `var(--${x.colorToken ?? "muted-foreground"})`, W = { stroke: R, strokeWidth: 1.25, strokeDasharray: "4 4" };
      x.axis === "y" ? (E.push($i([x.value], { id: `cv-ref-${S}`, ...W })), x.label && E.push(
        nn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          y: "v",
          text: "label",
          fill: R,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (E.push(Pi([x.value], { id: `cv-ref-${S}`, ...W })), x.label && E.push(
        nn([{ v: x.value, label: x.label }], {
          id: `cv-ref-label-${S}`,
          x: "v",
          text: "label",
          fill: R,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let O;
    g && (O = {
      domain: v,
      range: v.map((x, S) => `var(--${M[S % M.length]})`)
    }, un(t) && (O.legend = Yr({ placement: zt((Z = t.legend) == null ? void 0 : Z.position) })));
    const z = Lt((te = t.axes) == null ? void 0 : te.x, s), j = Lt((se = t.axes) == null ? void 0 : se.y, c), T = Dt((ue = t.axes) == null ? void 0 : ue.x), D = Dt((le = t.axes) == null ? void 0 : le.y), P = a.x, F = a.y, U = a.size;
    return at({
      marks: E,
      x: {
        scale: T.scale,
        nice: T.nice,
        grid: !0,
        axis: (ge = (fe = t.axes) == null ? void 0 : fe.x) != null && ge.hide ? !1 : {
          label: z,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (x) => {
              var S;
              return $e(n, (S = t.axes) == null ? void 0 : S.x).value(x, P, "axis");
            }
          }
        }
      },
      y: {
        scale: D.scale,
        nice: D.nice,
        grid: !0,
        axis: (ee = (V = t.axes) == null ? void 0 : V.y) != null && ee.hide ? !1 : {
          label: j,
          ticks: {
            format: (x) => {
              var S;
              return $e(n, (S = t.axes) == null ? void 0 : S.y).value(x, F, "axis");
            }
          }
        }
      },
      color: O,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : {
        use: Qr,
        className: fa((L = t.tooltip) == null ? void 0 : L.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (x) => {
          const R = x[0];
          if (!R) return { rows: [] };
          const W = R.datum, q = [
            { label: s, value: n.value(W.x, P, "tooltip") },
            { label: c, value: n.value(W.y, F, "tooltip") }
          ];
          return U && q.push({
            label: u ?? U,
            value: n.value(W.size, U, "tooltip")
          }), { title: W.group, color: R.color, rows: q };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, c, u]), m = a.groupBy, h = (f) => {
    var v;
    if (!f || !m) return null;
    const g = (v = f.datum) == null ? void 0 : v.group;
    return g === void 0 ? null : { member: m, value: g, label: g };
  };
  return d ? /* @__PURE__ */ l(
    ot,
    {
      definition: d,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: h
    }
  ) : /* @__PURE__ */ l("div", { style: zu, children: "No data" });
}
const zu = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Vu(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const i = ar(r[t.x]), o = ar(r[t.y]);
    i === null || o === null || n.push({
      x: i,
      y: o,
      size: t.size ? ar(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: a
    });
  }), n;
}
function ar(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function ju(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function Wu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Bu(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function xo(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Bu(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => xo(e, t, n), r;
}
function Ku({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = ju(t), s = e.raw.rows, c = e.raw.annotation, u = y.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const h = Mr(s, a), f = Mr(s, i), g = /* @__PURE__ */ new Map();
    return s.forEach((v, k) => {
      const w = Wu(v[o]), C = v[h], A = v[f];
      if (w === null || C === null || C === void 0 || A === null || A === void 0)
        return;
      const N = typeof C == "number" ? C : String(C), M = String(A);
      g.set(`${N}\0${M}`, {
        cat: N,
        label: M,
        value: w,
        key: `${N}|${M}`,
        member: o,
        i: k
      });
    }), [...g.values()];
  }, [s, a, i, o]), d = y.useMemo(() => {
    var C, A, N, M, E, O, z, j;
    let h = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY;
    for (const T of u)
      T.value < h && (h = T.value), T.value > f && (f = T.value);
    const g = (T) => {
      if (!T) return;
      const D = (c == null ? void 0 : c.dimensions[T]) ?? (c == null ? void 0 : c.timeDimensions[T]) ?? (c == null ? void 0 : c.measures[T]);
      return (D == null ? void 0 : D.shortTitle) ?? (D == null ? void 0 : D.title) ?? T;
    }, v = Lt((C = t.axes) == null ? void 0 : C.x, g(a)), k = Lt((A = t.axes) == null ? void 0 : A.y, g(i)), w = [
      al(u, {
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
      ha(
        nn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (T) => n.value(T.value, T.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), at({
      marks: w,
      x: {
        scale: () => An(0.05),
        axis: (M = (N = t.axes) == null ? void 0 : N.x) != null && M.hide ? !1 : {
          label: v,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (T) => {
              var D;
              return $e(n, (D = t.axes) == null ? void 0 : D.x).category(T);
            }
          }
        }
      },
      y: {
        scale: () => An(0.05),
        axis: (O = (E = t.axes) == null ? void 0 : E.y) != null && O.hide ? !1 : {
          label: k,
          ticks: {
            format: (T) => {
              var D;
              return $e(n, (D = t.axes) == null ? void 0 : D.y).category(T);
            }
          }
        }
      },
      color: {
        scale: xo(h, f, r.colorToken ?? "chart-1")
      },
      tooltip: ((z = t.tooltip) == null ? void 0 : z.show) === !1 ? void 0 : Wn({ format: n, indicator: (j = t.tooltip) == null ? void 0 : j.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const m = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(ot, { definition: d, ariaLabel: m, className: "cv-chart--fill" });
}
function qu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Uu(e) {
  return `cv-kpi-trend--${e}`;
}
function Hu(e) {
  var c, u, d, m;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (h) => r.value(h, a.measure, "kpi"), o = Mo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((m = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : m.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(nm, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Gu, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Gu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var h;
  const a = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", i = t === null ? null : am(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Yu(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((f) => f !== null), d = i ? i.diff : c ? Zu(c) : 0, m = Uu(qu(d, a));
  return /* @__PURE__ */ b("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ b("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(em, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Qu, {}) : /* @__PURE__ */ l(Ju, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Xu, { data: e, series: c, colorClass: m }) })
  ] });
}
function Yu(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Qu() {
  return /* @__PURE__ */ b(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(qi, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function Ju() {
  return /* @__PURE__ */ b("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Ki, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Xu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = y.useMemo(() => {
    const a = Je(e, { series: [t], skipNull: !0 }), i = Dt(void 0);
    return at({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        vr(a, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: an("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Pn(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: an("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: bo, axis: !1 },
      y: { scale: i.scale, nice: i.nice, axis: !1 },
      guides: !1,
      margin: { top: 3, right: 0, bottom: 0, left: 0 },
      keyboard: !1
    });
  }, [e, t]);
  return /* @__PURE__ */ l(
    ot,
    {
      definition: r,
      ariaLabel: `${t.label || t.key} trend`,
      sparkline: !0,
      animateInitial: !1,
      className: `cv-kpi-sparkline ${n}`
    }
  );
}
function Zu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function em({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var d;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Ki : a ? Jr : Xr, c = (d = n.comparison) != null && d.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ b(
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
const Bt = -(2 * Math.PI) / 3, Tr = 2 * Math.PI / 3, tm = Tr - Bt;
function nm({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, m;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, i = ((m = r.gauge) == null ? void 0 : m.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : rm(e, r)) ?? "chart-1", u = y.useMemo(() => {
    const h = (s - a) / (o - a), f = Bt + h * tm, g = ({ radius: w }) => w * 0.7, v = yr([{ startAngle: Bt, endAngle: Tr }], {
      id: "cv-gauge-track",
      innerRadius: g,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = h > 0 ? [
      v,
      yr([{ startAngle: Bt, endAngle: f }], {
        id: "cv-gauge-value",
        innerRadius: g,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [v];
    return at({
      marks: [
        Zi({
          id: "cv-gauge",
          startAngle: Bt,
          endAngle: Tr,
          marks: k
        })
      ],
      guides: !1,
      margin: 0,
      keyboard: !1
    });
  }, [a, o, s, c]);
  return /* @__PURE__ */ b("div", { className: "cv-kpi-gauge", children: [
    /* @__PURE__ */ l(
      ot,
      {
        definition: u,
        ariaLabel: t,
        animateInitial: !1,
        minHeight: 180,
        className: "cv-kpi-gauge-chart"
      }
    ),
    /* @__PURE__ */ b("div", { className: "cv-kpi-gauge-center", children: [
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
function rm(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((o, s) => o.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function Mo(e, t) {
  for (const n of e) {
    const r = To(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function am(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Mo(e, r.value));
  else {
    const s = e[1];
    a = s ? To(s[n.measure]) : null;
  }
  if (a === null) return null;
  const i = t - a, o = a !== 0 ? i / a : null;
  return { current: t, baseline: a, diff: i, pct: o };
}
function To(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Ro = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: _("cv-table", e), ...t }) })
);
Ro.displayName = "Table";
const Oo = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: _("cv-table-header", e), ...t }));
Oo.displayName = "TableHeader";
const _o = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: _("cv-table-body", e), ...t }));
_o.displayName = "TableBody";
const bn = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: _("cv-table-row", e),
      ...t
    }
  )
);
bn.displayName = "TableRow";
const Ao = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: _("cv-table-head", e),
    ...t
  }
));
Ao.displayName = "TableHead";
const Rr = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: _("cv-table-cell", e),
    ...t
  }
));
Rr.displayName = "TableCell";
const im = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: _("cv-table-caption", e), ...t }));
im.displayName = "TableCaption";
const Do = ta(
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
), Q = y.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: _(Do({ variant: t, size: n }), e),
      ...a
    }
  )
);
Q.displayName = "Button";
function om({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = y.useMemo(
    () => sm(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = y.useState(null), [u, d] = y.useState(0), m = r.pageSize ?? 25, h = y.useMemo(() => {
    var N;
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1, A = ((N = o.find((M) => M.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((M, E) => dm(M[A], E[A]) * C);
  }, [a, s, o]), f = Math.max(1, Math.ceil(h.length / m)), g = Math.min(u, f - 1), v = h.slice(g * m, g * m + m), k = (C) => {
    c(
      (A) => (A == null ? void 0 : A.member) === C ? { member: C, dir: A.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), d(0);
  }, w = h.length > 12;
  return /* @__PURE__ */ b("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ b(Ro, { children: [
      /* @__PURE__ */ l(Oo, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(bn, { children: o.map((C) => /* @__PURE__ */ l(
        Ao,
        {
          className: ri(C.align),
          style: C.width ? { width: C.width } : void 0,
          children: /* @__PURE__ */ b(
            Q,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(C.member),
              children: [
                C.label,
                /* @__PURE__ */ l(mm, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        C.member
      )) }) }),
      /* @__PURE__ */ b(_o, { children: [
        v.map((C, A) => /* @__PURE__ */ l(bn, { children: o.map((N) => {
          const M = fm(N.member, C[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Rr,
            {
              className: _(ri(N.align), w && "cv-table-cell--compact"),
              style: M ? { color: M } : void 0,
              children: N.render(C[N.key])
            },
            N.member
          );
        }) }, A)),
        v.length === 0 && /* @__PURE__ */ l(bn, { children: /* @__PURE__ */ l(
          Rr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    h.length > m && /* @__PURE__ */ b("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ b("span", { children: [
        g * m + 1,
        "–",
        Math.min((g + 1) * m, h.length),
        " of",
        " ",
        h.length
      ] }),
      /* @__PURE__ */ b("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          Q,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          Q,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => d((C) => Math.min(f - 1, C + 1)),
            disabled: g >= f - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function sm(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : cm(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = Mr(e, c), d = t ? um(t, c) : void 0, m = t ? c in t.measures : !1, h = s.label ?? (d == null ? void 0 : d.shortTitle) ?? (d == null ? void 0 : d.title) ?? c, f = s.align ?? (m ? "right" : "left"), g = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: h,
      align: f,
      width: s.width,
      render: (v) => lm(v, m, c, g)
    };
  });
}
function lm(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function cm(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function um(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ri(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function mm({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Jr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Xr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(vl, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function dm(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function fm(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && hm(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function hm(e, t, n) {
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
const ct = "cv-sidebar--default", pm = "cv-sidebar--wide", Lo = "a date or category", ir = [
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
    hint: Lo,
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
], gm = [
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
    hint: Lo,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], vm = [
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
], bm = [
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
], ym = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], km = [
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
], wm = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], Ge = (e) => wm.indexOf(e), qe = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Ui,
    order: Ge("bar"),
    component: Au,
    optionsSchema: Ue.bar,
    defaults: He.bar,
    wells: ir,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ct
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Sl,
    order: Ge("line"),
    component: Du,
    optionsSchema: Ue.line,
    defaults: He.line,
    wells: ir,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ct
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: bl,
    order: Ge("area"),
    component: Lu,
    optionsSchema: Ue.area,
    defaults: He.area,
    wells: ir,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ct
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Nl,
    order: Ge("pie"),
    component: Iu,
    optionsSchema: Ue.pie,
    defaults: He.pie,
    wells: vm,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ct
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Cl,
    order: Ge("scatter"),
    component: $u,
    optionsSchema: Ue.scatter,
    defaults: He.scatter,
    wells: bm,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ct
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: wl,
    order: Ge("kpi"),
    component: Hu,
    optionsSchema: Ue.kpi,
    defaults: He.kpi,
    wells: ym,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: pm
  },
  table: {
    family: "table",
    label: "Table",
    icon: kl,
    order: Ge("table"),
    component: om,
    optionsSchema: Ue.table,
    defaults: He.table,
    wells: km,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ct
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: yl,
    order: Ge("heatmap"),
    component: Ku,
    optionsSchema: Ue.heatmap,
    defaults: He.heatmap,
    wells: gm,
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
    sidebarWidthClass: ct
  }
}, Cm = qe.bar, Nm = qe.line, Sm = qe.area, xm = qe.pie, Mm = qe.scatter, Tm = qe.heatmap, Rm = qe.kpi, Om = qe.table, va = [
  Cm,
  Nm,
  Sm,
  xm,
  Mm,
  Tm,
  Rm,
  Om
], _m = p.any();
function ba(e, t) {
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? Cu;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? _m;
    },
    resolveOptions: (o) => Nu(o, i.defaults(o.family))
  };
  return i;
}
const Bn = ba(va);
function Am(e, t = Bn) {
  return t.resolveOptions(e);
}
const ai = {
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
function Eo(e) {
  return e ? { ...ai, ...e } : ai;
}
function ya(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function Dm(e) {
  const t = Math.floor(e ?? vn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Lm(e, t) {
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
function Em(e) {
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
function Fm(e, t) {
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
function Im(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function Pm(e, t, n) {
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
function $m(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Fm(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: Im(o.meta)
      }))
    };
  }
  const a = Dm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Lm(i.data, a) : Em(i.data)
    }))
  };
}
function zm(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const wy = Object.fromEntries(
  Object.entries(qe).map(([e, t]) => [e, t.component])
);
function Fo({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = Bn,
  theme: u
}) {
  const d = re(() => Am(t, c), [t, c]), m = re(() => Eo(u), [u]), h = c.get(d.family), f = (h == null ? void 0 : h.queryless) ?? !1, g = ya(h) ? d.transform : void 0, v = re(() => $m(e, g), [e, g]);
  if (!f && (a != null && a.loading))
    return /* @__PURE__ */ l(Xc, { className: "cv-chart-skeleton" });
  if (!f && (a != null && a.error))
    return /* @__PURE__ */ b($n, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Zr, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(Vn, { children: a.error.message })
    ] });
  if (!f && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : zm(v), w = Pm(
    r ?? oa(e.raw.annotation, d, ia),
    g
  ), C = (i == null ? void 0 : i[d.family]) ?? c.require(d.family).component;
  return /* @__PURE__ */ l(
    C,
    {
      data: v,
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
const Kn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], or = 8;
function ii(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Io(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : Kn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, i = /* @__PURE__ */ new Set();
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
function oi(e, t) {
  const n = Io(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Vm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function pn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Vm(e[n]);
  return t;
}
function jm(e) {
  return {
    measures: pn(e.measures ?? {}),
    dimensions: pn(e.dimensions ?? {}),
    segments: pn(e.segments ?? {}),
    timeDimensions: pn(e.timeDimensions ?? {})
  };
}
function Rt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function qn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Wm(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Bm(e, t) {
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
function Km(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = Un(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function qm(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Po(e, t, n, r, a = Bn) {
  const i = jm(e.annotation()), o = Bm(i, r), s = Km(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const m = n.measures ?? [];
    if (a.require(t.family).measureOnly && m.length > 0) {
      const h = s[0] ?? {}, f = [
        {
          key: "value",
          label: "Value",
          data: m.map((v) => Un(h[v])),
          meta: { ...qn(Rt(i, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return oi(f, t.colors), {
        categories: m.map(
          (v) => {
            var k, w;
            return ((k = Rt(i, v)) == null ? void 0 : k.shortTitle) ?? ((w = Rt(i, v)) == null ? void 0 : w.title) ?? v;
          }
        ),
        series: f,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || ii(f)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? Hm(e, c.series, t, i) : Ym(e, c.category.member, c.series, t, i), d = Um(e, c);
  return qm(u, o), oi(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || ii(u)
  };
}
function Um(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Hm(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = Rt(r, s), u = i == null ? void 0 : i[s], d = o.map((m) => Un(m[s]));
    return {
      key: s,
      label: Wm(c, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...qn(c, u, n.format), measure: s }
    };
  });
}
function Gm(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function Ym(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), d = c.length > 1, m = { x: [t], y: [s, "measures"] }, f = e.seriesNames(m).filter((N) => {
    const M = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : void 0;
    return M === void 0 || u.has(M);
  }), g = e.chartPivot(m), v = Rt(a, i), k = a.dimensions[s], w = (k == null ? void 0 : k.type) === "boolean", C = (k == null ? void 0 : k.shortTitle) ?? (k == null ? void 0 : k.title) ?? s, A = f.map((N) => {
    var $, I;
    const M = ($ = N.yValues) == null ? void 0 : $[0], E = N.yValues && N.yValues.length >= 2 ? N.yValues[N.yValues.length - 1] : i, O = Rt(a, E), z = (I = n.meta) == null ? void 0 : I[E], j = (z == null ? void 0 : z.label) ?? (O == null ? void 0 : O.shortTitle) ?? (O == null ? void 0 : O.title) ?? E, T = M ?? N.shortTitle ?? N.title ?? N.key, D = w ? Gm(T) : void 0, P = D ? `${C}: ${D}` : T, F = d ? `${j} · ${P}` : P, U = g.map((Y) => Un(Y[N.key]));
    return {
      key: N.key,
      label: F,
      data: U,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...qn(O ?? v, z, r.format),
        measure: E
      }
    };
  });
  return Qm(A, v, r.format);
}
function Qm(e, t, n) {
  var d, m, h;
  if (e.length <= or) return e;
  const r = (f) => f.data.reduce((g, v) => g + (v ?? 0), 0), a = [...e].sort((f, g) => r(g) - r(f)), i = a.slice(0, or - 1), o = a.slice(or - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: s }, (f, g) => {
    let v = 0, k = !1;
    for (const w of o) {
      const C = w.data[g];
      C !== null && (v += C, k = !0);
    }
    return k ? v : null;
  }), u = {
    key: "__other",
    label: `Other (${o.length})`,
    data: c,
    meta: { ...qn(t, void 0, n), ...(h = (m = i[0]) == null ? void 0 : m.meta) != null && h.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function Un(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ae = (e) => ve(e, "yyyy-MM-dd");
function Jm(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ae(t), ae(t)];
  if (n === "yesterday") {
    const o = Ce(t, 1);
    return [ae(o), ae(o)];
  }
  if (n === "this week") return [ae(xn(t)), ae(Mn(t))];
  if (n === "this month") return [ae(mt(t)), ae(Gt(t))];
  if (n === "this quarter") return [ae(dt(t)), ae(Yt(t))];
  if (n === "this year") return [ae(ft(t)), ae(Qt(t))];
  if (n === "last week") {
    const o = br(t, 1);
    return [ae(xn(o)), ae(Mn(o))];
  }
  if (n === "last month") {
    const o = ht(t, 1);
    return [ae(mt(o)), ae(Gt(o))];
  }
  if (n === "last quarter") {
    const o = pt(t, 1);
    return [ae(dt(o)), ae(Yt(o))];
  }
  if (n === "last year") {
    const o = gt(t, 1);
    return [ae(ft(o)), ae(Qt(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ae(Ce(t, a - 1)), ae(t)] : i.startsWith("week") ? [ae(Ce(t, a * 7 - 1)), ae(t)] : i.startsWith("month") ? [ae(mt(ht(t, a))), ae(Gt(ht(t, 1)))] : i.startsWith("quarter") ? [ae(dt(pt(t, a))), ae(Yt(pt(t, 1)))] : [ae(ft(gt(t, a))), ae(Qt(gt(t, 1)))];
}
function $o(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function ka(e) {
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
function zo(e) {
  const t = ka(e);
  return t === void 0 ? void 0 : $o(t);
}
function wa(e) {
  const t = ka(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Et(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Xm = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Zm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function on(e, t, n) {
  var r;
  if (Se(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function ed(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = on(o, t, n);
    if (!Et(s))
      if (Array.isArray(s))
        for (const c of s)
          Et(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? Jm(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function td(e, t, n) {
  if ("and" in e) {
    const r = Or(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Or(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return ed(e, t, n);
}
function Or(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = td(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function nd(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const a = on(e.dateRange, t, n);
    Et(a) || (r.dateRange = a);
  }
  if (e.granularity !== void 0) {
    const a = on(e.granularity, t, n);
    Et(a) || (r.granularity = a === At ? wa(r.dateRange) : a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Vo(e, t, n) {
  const r = Xm(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => nd(i, r, t))), e.filters !== void 0) {
    const i = Or(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = on(e.limit, r, t);
    Et(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = on(e.offset, r, t);
    Et(i) || (a.offset = i);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function jo() {
  let e, t;
  return (n, r, a) => {
    const i = Vo(n, r, a), o = JSON.stringify(i);
    return e !== void 0 && o === t ? e : (e = i, t = o, i);
  };
}
function rd(e, t) {
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
class ad extends Error {
}
const id = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new ad(`"${e}" cannot be parsed into a number`);
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
function si(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class od extends Error {
}
class li extends Error {
}
class sd extends Error {
}
class sr extends Error {
}
class ld extends Error {
}
class cd {
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
      throw new li(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return si(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new sd(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new sr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new sr(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, m = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        o = d(o, this.cls);
      else if (typeof m == "number")
        o = this.cls.mul(o, m);
      else if (si(m))
        o = this.cls.mul(o, this.convertFraction(m));
      else
        throw new sr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new li(".toBest must be called after .from");
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
        throw new ld(`Meausure "${t}" not found.`);
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
    throw new od(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function ud(e) {
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
function md(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = ud(e);
  return (r) => new cd({
    measures: e,
    unitCache: n,
    cls: id
  }, r);
}
const dd = {
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
}, fd = {
  systems: {
    metric: dd
  }
}, hd = {
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
}, pd = {
  systems: {
    SI: hd
  }
}, gd = {
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
}, vd = {
  systems: {
    SI: gd
  }
}, bd = {
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
}, yd = {
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
}, kd = {
  systems: {
    metric: bd,
    imperial: yd
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
}, wd = {
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
}, Cd = {
  systems: {
    SI: wd
  }
}, Nd = {
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
}, Sd = {
  systems: {
    SI: Nd
  }
}, xd = {
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
}, Md = {
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
}, Td = {
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
}, Rd = {
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
}, Od = {
  systems: {
    bit: xd,
    byte: Md,
    IECBit: Td,
    IECByte: Rd
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
}, _d = {
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
}, Ad = {
  systems: {
    metric: _d
  }
}, Dd = {
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
}, Ld = {
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
}, Ed = {
  systems: {
    SI: Dd,
    nutrition: Ld
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
}, Fd = {
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
}, Id = {
  systems: {
    SI: Fd
  }
}, Pd = {
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
}, $d = {
  systems: {
    SI: Pd
  }
}, zd = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Vd = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
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
}, Wd = {
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
}, Bd = {
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
}, Kd = {
  systems: {
    metric: Wd,
    imperial: Bd
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
}, qd = {
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
}, Ud = {
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
}, Hd = {
  systems: {
    metric: qd,
    imperial: Ud
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
}, Gd = {
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
}, Yd = {
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
}, Jd = {
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
}, Xd = {
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
}, Zd = {
  systems: {
    metric: Jd,
    imperial: Xd
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
}, ef = {
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
}, tf = {
  systems: {
    SI: ef
  }
}, nf = {
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
}, rf = {
  systems: {
    unit: nf
  }
}, af = {
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
}, of = {
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
}, sf = {
  systems: {
    metric: af,
    imperial: of
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
}, lf = {
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
}, cf = {
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
}, uf = {
  systems: {
    metric: lf,
    imperial: cf
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
}, mf = {
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
}, df = {
  systems: {
    SI: mf
  }
}, ff = {
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
}, hf = {
  systems: {
    SI: ff
  }
}, pf = {
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
}, gf = {
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
}, vf = {
  systems: {
    metric: pf,
    imperial: gf
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
}, bf = {
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
}, yf = {
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
}, kf = {
  systems: {
    metric: bf,
    imperial: yf
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
}, wf = {
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
}, Cf = {
  systems: {
    SI: wf
  }
}, Nf = {
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
}, Sf = {
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
}, xf = {
  systems: {
    metric: Nf,
    imperial: Sf
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
}, Mf = {
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
}, Tf = {
  systems: {
    SI: Mf
  }
}, Rf = {
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
}, Of = {
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
}, _f = {
  systems: {
    metric: Rf,
    imperial: Of
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
}, Af = {
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
}, Df = {
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
}, Lf = {
  systems: {
    metric: Af,
    imperial: Df
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
}, Ef = {
  acceleration: fd,
  angle: pd,
  apparentPower: vd,
  area: kd,
  charge: Cd,
  current: Sd,
  digital: Od,
  each: Ad,
  energy: Ed,
  force: Id,
  frequency: $d,
  illuminance: jd,
  length: Kd,
  mass: Hd,
  massFlowRate: Qd,
  pace: Zd,
  partsPer: tf,
  pieces: rf,
  power: sf,
  pressure: uf,
  reactiveEnergy: df,
  reactivePower: hf,
  speed: vf,
  torque: xf,
  temperature: kf,
  time: Cf,
  voltage: Tf,
  volume: _f,
  volumeFlowRate: Lf
}, Ff = md(Ef), If = {
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
function Pf(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Ff(t).from(e.from).to(e.to)
  };
}
const _r = {
  ...Object.fromEntries(
    Object.entries(If).map(([e, t]) => [e, Pf(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Hn(e) {
  return e ? { ..._r, ...e } : _r;
}
function $f(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function zf(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Vf(e) {
  return e != null && e.quantity ? zf(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const jf = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Wo(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ci(e, t) {
  const n = e * (jf[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${Wo(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + o.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function lr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Wo((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Wf(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ui(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Bo(e = _r) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return ia(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return ci(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const d = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ui(lr(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return ci(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return ui(lr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? Wf(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${lr(n, t)}${u}`;
  };
}
const Ko = y.createContext(null);
function Bf({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(Ko.Provider, { value: e, children: t });
}
function qo() {
  return y.useContext(Ko) ?? void 0;
}
const Gn = Fi(null);
Gn.displayName = "CubeVizContext";
function Ve() {
  const e = Gr(Gn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function st() {
  return Ve().families;
}
function Kf(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Cy({
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
    () => ba(va, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), d = re(
    () => Kf(e) ? Qc(e) : e,
    [e]
  ), m = re(
    () => {
      var C;
      return {
        chartRamp: (C = t == null ? void 0 : t.chartRamp) != null && C.length ? t.chartRamp : Kn,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Eo(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), h = re(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), f = re(() => a ?? {}, [a]), g = re(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), v = re(
    () => ({
      cubeClient: d,
      registry: f,
      families: u,
      locale: h,
      theme: m,
      maps: g
    }),
    [d, f, u, h, m, g]
  ), [k, w] = bt(null);
  return /* @__PURE__ */ l(Gn.Provider, { value: v, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: _(
        "cv-root",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(Bf, { container: k, children: /* @__PURE__ */ l(
        la,
        {
          onRangeSelect: o == null ? void 0 : o.onRangeSelect,
          onPointSelect: o == null ? void 0 : o.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function Ca({
  families: e,
  children: t
}) {
  const n = Ve(), r = (e ?? []).map((i) => i.family).join("|"), a = re(() => !e || e.length === 0 ? n : { ...n, families: ba(va, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(pe, { children: t }) : /* @__PURE__ */ l(Gn.Provider, { value: a, children: t });
}
function qf(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Uf = 5e3;
function Uo(e, t) {
  const { cubeClient: n } = Ve(), r = (t == null ? void 0 : t.skip) ?? !1, a = re(
    () => e.limit === void 0 ? { ...e, limit: Uf } : e,
    [e]
  ), i = re(() => JSON.stringify(a), [a]), [o, s] = bt({ isLoading: !r }), [c, u] = bt(0), d = Xe(() => u((m) => m + 1), []);
  return ln(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let m = !0;
    const h = new AbortController();
    return s((f) => ({ resultSet: f.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: h.signal }).then((f) => {
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
      m = !1, h.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: d };
}
const Yn = Fi(null);
Yn.displayName = "DashboardContext";
function Na({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = ut(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: rd(r, t), key: r });
  const i = a.current.store, o = Hf(i, r);
  return Zs(Yn.Provider, { value: o }, n);
}
function Hf(e, t) {
  const n = Xe(
    (i, o) => e.set(i, o),
    [e]
  ), r = Xe(
    (i) => Vo(i, e.getAll(), t),
    [e, t]
  ), a = Xe(
    (i) => Zm(i, e.getAll(), t),
    [e, t]
  );
  return re(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Gf(e) {
  const t = Ii(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function Ho() {
  const e = Gr(Yn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Gf(e);
}
function mn() {
  return Gr(Yn);
}
const Yf = () => () => {
}, Qf = Object.freeze({}), Jf = Object.freeze([]);
function cr(e, t, n) {
  var A;
  const r = mn(), { locale: a } = Ve(), i = st(), o = ut(null);
  o.current === null && (o.current = jo());
  const s = o.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), d = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? Qf,
    (r == null ? void 0 : r.decls) ?? Jf
  ) : e, m = Ii(
    u && r ? r.store.subscribe : Yf,
    d,
    d
  ), { resultSet: h, isLoading: f, error: g, refetch: v } = Uo(m, { skip: n == null ? void 0 : n.skip }), k = ((A = t.format) == null ? void 0 : A.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = re(() => Hn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: re(() => {
    if (h)
      return Po(h, t, m, { unitSystem: k, conversions: w }, i);
  }, [h, t, m, k, w, i]), isLoading: f, error: g, refetch: v, resolvedQuery: m };
}
function lt() {
  const { cubeClient: e } = Ve(), [t, n] = bt({ isLoading: !0 });
  return ln(() => {
    let r = !0;
    return n({ isLoading: !0 }), Jc(e).then((a) => {
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
function Qn() {
  const { locale: e } = Ve(), t = y.useMemo(() => Hn(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return y.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function Ny() {
  const { locale: e } = Ve(), { formatValue: t, units: n } = e;
  return re(
    () => t ?? Bo(Hn(n)),
    [t, n]
  );
}
function Go() {
  const [e, t] = bt(0), n = ut(null), r = ut(null), a = ut(null), i = ut(0), o = Xe((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = Xe(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = Xe(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== i.current && (i.current = d, t(d));
      const m = new ResizeObserver((h) => {
        var f, g;
        for (const v of h) {
          const k = ((g = (f = v.contentBoxSize) == null ? void 0 : f[0]) == null ? void 0 : g.inlineSize) ?? v.contentRect.width;
          o(k);
        }
      });
      m.observe(u), r.current = m;
    },
    [o, s]
  );
  return ln(() => s, [s]), [c, e];
}
const Xf = "day";
function Zf(e, t) {
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
        granularity: r.granularity ?? Xf,
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
const ne = (e) => ve(e, "yyyy-MM-dd");
function eh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = Sn(e[0]), i = Sn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = pl(i, a) + 1;
    return [ne(Ce(a, o)), ne(Ce(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = Ce(t, 1);
    return [ne(a), ne(a)];
  }
  if (n === "yesterday") {
    const a = Ce(t, 2);
    return [ne(a), ne(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [ne(Ce(t, 2 * a - 1)), ne(Ce(t, a))];
    if (i.startsWith("week")) return [ne(Ce(t, 14 * a - 1)), ne(Ce(t, 7 * a))];
    if (i.startsWith("month"))
      return [ne(mt(ht(t, 2 * a))), ne(Ce(mt(ht(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [ne(dt(pt(t, 2 * a))), ne(Ce(dt(pt(t, a)), 1))];
    if (i.startsWith("year"))
      return [ne(ft(gt(t, 2 * a))), ne(Ce(ft(gt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = br(t, 1);
    return [ne(xn(a)), ne(Mn(a))];
  }
  if (n === "this month") {
    const a = ht(t, 1);
    return [ne(mt(a)), ne(Gt(a))];
  }
  if (n === "this quarter") {
    const a = pt(t, 1);
    return [ne(dt(a)), ne(Yt(a))];
  }
  if (n === "this year") {
    const a = gt(t, 1);
    return [ne(ft(a)), ne(Qt(a))];
  }
  if (n === "last week") {
    const a = br(t, 2);
    return [ne(xn(a)), ne(Mn(a))];
  }
  if (n === "last month") {
    const a = ht(t, 2);
    return [ne(mt(a)), ne(Gt(a))];
  }
  if (n === "last quarter") {
    const a = pt(t, 2);
    return [ne(dt(a)), ne(Yt(a))];
  }
  if (n === "last year") {
    const a = gt(t, 2);
    return [ne(ft(a)), ne(Qt(a))];
  }
}
function th(e, t, n = Bn) {
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
  const s = eh(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const nh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Sa({
  query: e,
  chart: t,
  onState: n,
  editing: r,
  updateFamilyOptions: a,
  widgetId: i,
  onRangeSelect: o,
  onPointSelect: s
}) {
  var $;
  const { registry: c, locale: u, theme: d } = Ve(), m = st(), h = (($ = m.get(t.family)) == null ? void 0 : $.queryless) ?? !1, f = re(() => {
    var I;
    return (I = t.format) != null && I.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), g = re(() => {
    const I = e ?? {};
    return I.timezone || !(u != null && u.timezone) ? I : { ...I, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: v, isLoading: k, error: w, refetch: C, resolvedQuery: A } = cr(
    g,
    f,
    { skip: h }
  ), N = re(() => Zf(g, f), [g, f]), M = cr(
    (N == null ? void 0 : N.query) ?? g,
    (N == null ? void 0 : N.chart) ?? f,
    { skip: !N }
  ), E = re(
    () => th(A, f, m),
    [A, f, m]
  ), O = cr(
    (E == null ? void 0 : E.query) ?? g,
    f,
    { skip: !E, skipResolve: !0 }
  ), z = re(
    () => ({ [f.family]: qf(c, f.family, m) }),
    [c, f.family, m]
  ), j = re(() => {
    let I = v ?? nh;
    if (N && M.data) {
      I = { ...I, series: M.data.series, categories: M.data.categories };
      const Y = I.raw.rows.length > 0, Z = I.series.some((te) => te.data.some((se) => se !== null));
      I = { ...I, empty: !Y && !Z };
    }
    if (E && O.data) {
      if (E.mode === "kpiRow") {
        const Y = O.data.raw.rows[0];
        if (Y) {
          const Z = I.raw.rows[0];
          I = {
            ...I,
            raw: { ...I.raw, rows: Z ? [Z, Y] : [Y] }
          };
        }
      } else if (!O.data.empty) {
        const Y = new Map(O.data.series.map((Z) => [Z.key, Z]));
        if (!I.empty && I.series.length > 0) {
          const Z = I.categories.length, te = I.series.map((se) => {
            const ue = Y.get(se.key), le = Array.from({ length: Z }, (fe, ge) => (ue == null ? void 0 : ue.data[ge]) ?? null);
            return {
              ...se,
              key: `${se.key}__prev`,
              label: `${se.label} (prev)`,
              colorToken: se.colorToken,
              data: le,
              meta: { ...se.meta, companion: !0 }
            };
          });
          I = { ...I, series: [...I.series, ...te] };
        } else {
          const Z = O.data.series.map((te) => ({
            ...te,
            key: `${te.key}__prev`,
            label: `${te.label} (prev)`,
            data: [...te.data],
            meta: { ...te.meta, companion: !0 }
          }));
          I = {
            ...I,
            categories: O.data.categories,
            series: Z,
            empty: !1
          };
        }
      }
    }
    return I;
  }, [v, N, M.data, E, O.data]);
  ln(() => {
    n == null || n({ rows: j.raw.rows, refetch: C, isLoading: k });
  }, [n, j.raw.rows, C, k]);
  const T = {}, D = re(
    () => u.formatValue ?? Bo(Hn(u.units)),
    [u.formatValue, u.units]
  ), P = re(
    () => oa(j.raw.annotation, f, D, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [j.raw.annotation, f, D, u.locale, u.unitSystem]
  ), F = f.mapping, U = re(
    () => ({
      categoryMember: F == null ? void 0 : F.category.member,
      pivotMember: (F == null ? void 0 : F.series.mode) === "pivot" ? F.series.pivot : void 0,
      formatCategory: P.category
    }),
    [F, P]
  );
  return /* @__PURE__ */ l(
    la,
    {
      widgetId: i,
      target: U,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Fo,
        {
          data: j,
          options: f,
          config: T,
          format: P,
          state: h ? { loading: !1 } : { loading: k && !v, error: w },
          components: z,
          registry: m,
          theme: d.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function rh({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    Sa,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const Yo = "cube-viz-prose";
function ah(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function ih({ doc: e }) {
  const t = ah(e), n = re(
    () => t ? e : null,
    [t, e]
  ), r = to(
    {
      extensions: [ro],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: _(Yo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(no, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const yn = [
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
], oh = Object.fromEntries(
  yn.map((e) => [e.value, e.label])
);
function mi(e) {
  return oh[e.trim().toLowerCase()] ?? e;
}
const sh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function lh({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = ic(), a = _(Do({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ b("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: _(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(ea, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: ve(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: _(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(cn, {})
      }
    )
  ] });
}
function ch({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const i = !!t.selected && !t.outside && !t.disabled, o = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ l(
    "button",
    {
      ...a,
      style: { ...r, color: i ? "var(--primary-foreground)" : o ? "var(--muted-foreground)" : "var(--foreground)" },
      className: _(
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
function Qo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    ac,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: _("cv-cal", e),
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
        MonthCaption: lh,
        DayButton: ch,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? ea : cn, { className: _("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Fe({
  ...e
}) {
  return /* @__PURE__ */ l(Tn.Root, { "data-slot": "popover", ...e });
}
function Ie({
  ...e
}) {
  return /* @__PURE__ */ l(Tn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Pe({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = qo();
  return /* @__PURE__ */ l(Tn.Portal, { container: a, children: /* @__PURE__ */ l(
    Tn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: _("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Root, { "data-slot": "select", ...e });
}
function Ar({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Group, { "data-slot": "select-group", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ l(xe.Value, { "data-slot": "select-value", ...e });
}
function De({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ b(
    xe.Trigger,
    {
      "data-slot": "select-trigger",
      className: _("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(xe.Icon, { asChild: !0, children: /* @__PURE__ */ l(it, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function uh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: _("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(xl, {})
    }
  );
}
function mh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: _("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(it, {})
    }
  );
}
function Le({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const a = qo();
  return /* @__PURE__ */ l(xe.Portal, { container: a, children: /* @__PURE__ */ b(
    xe.Content,
    {
      "data-slot": "select-content",
      className: _(
        "cv-select-content cv-popper-anim",
        n === "popper" && "cv-select-content--popper",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ l(uh, {}),
        /* @__PURE__ */ l(
          xe.Viewport,
          {
            className: _(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(mh, {})
      ]
    }
  ) });
}
function Dr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xe.Label,
    {
      "data-slot": "select-label",
      className: _("cv-select-label", e),
      ...t
    }
  );
}
function be({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ b(
    xe.Item,
    {
      "data-slot": "select-item",
      className: _("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(xe.ItemIndicator, { children: /* @__PURE__ */ l(Pt, {}) }) }),
        /* @__PURE__ */ l(xe.ItemText, { children: t })
      ]
    }
  );
}
const Ft = "cv-field", dh = "cv-field-label", Kt = "yyyy-MM-dd";
function fh(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function di(e) {
  if (!e) return;
  const t = Bi(e, Kt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function hh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? sh, [i, o] = bt(!1), s = typeof e == "string", [c, u] = fh(e), d = di(c), m = di(u), h = d ? { from: d, to: m } : void 0;
  let f;
  s ? f = mi(e) : d && m ? f = `${ve(d, "MMM d, yyyy")} – ${ve(m, "MMM d, yyyy")}` : d ? f = ve(d, "MMM d, yyyy") : f = "Pick a date range";
  const g = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ b(Fe, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(
      Q,
      {
        variant: "outline",
        className: _(
          "cv-daterange-trigger",
          f === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Hi, {}),
          f
        ]
      }
    ) }),
    /* @__PURE__ */ b(Pe, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((v) => /* @__PURE__ */ l(
        Q,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(v), o(!1);
          },
          children: mi(v)
        },
        v
      )) }),
      /* @__PURE__ */ l(
        Qo,
        {
          mode: "range",
          selected: h,
          defaultMonth: d,
          disabled: g,
          onSelect: (v) => {
            v != null && v.from && v.to ? t([ve(v.from, Kt), ve(v.to, Kt)]) : v != null && v.from ? t([ve(v.from, Kt), ve(v.from, Kt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const ph = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function gh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Ho(), i = r.rangeVariable ? ka(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? $o(i) : ph), s = typeof e == "string" ? e : "", c = o.join(",");
  return ln(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ b(
    _e,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(De, { className: Ft, children: /* @__PURE__ */ l(Ae, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Le, { children: o.map((u) => /* @__PURE__ */ l(be, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function vh({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: _(Ft, "cv-field--multi"),
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
  return /* @__PURE__ */ b(
    _e,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(De, { className: Ft, children: /* @__PURE__ */ l(Ae, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Le, { children: r.options.map((i) => /* @__PURE__ */ l(be, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function bh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = lt(), o = re(() => {
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
  return /* @__PURE__ */ b(
    "select",
    {
      className: Ft,
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
function yh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Ft,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function kh({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Ft,
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
function wh({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ b("label", { className: "cv-toggle", children: [
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
const Ch = {
  dateRange: hh,
  granularity: gh,
  select: vh,
  memberSelect: bh,
  text: yh,
  number: kh,
  toggle: wh
};
function Nh({ control: e, title: t }) {
  var f;
  const { registry: n } = Ve(), { decls: r, resolveValue: a, setVar: i } = Ho(), o = re(
    () => r.find((g) => g.name === e.variable),
    [r, e.variable]
  ), s = el();
  if (!o)
    return /* @__PURE__ */ b("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((f = n.controls) == null ? void 0 : f[c]) ?? Ch[c], d = a(e.variable), m = (g) => i(e.variable, g), h = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: d, onChange: m, decl: o, control: e.control }) : /* @__PURE__ */ b("div", { children: [
    /* @__PURE__ */ l("label", { className: dh, htmlFor: s, children: h }),
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
const Jo = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: _(
        "cv-card",
        e
      ),
      ...t
    }
  )
);
Jo.displayName = "Card";
const Xo = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: _(
        "cv-card-header",
        e
      ),
      ...t
    }
  )
);
Xo.displayName = "CardHeader";
const Zo = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: _("cv-card-title", e),
      ...t
    }
  )
);
Zo.displayName = "CardTitle";
const Sh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: _("cv-card-description", e), ...t })
);
Sh.displayName = "CardDescription";
const xh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: _("cv-card-action", e),
      ...t
    }
  )
);
xh.displayName = "CardAction";
const es = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: _("cv-card-content", e), ...t })
);
es.displayName = "CardContent";
const Mh = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: _("cv-card-footer", e), ...t })
);
Mh.displayName = "CardFooter";
const Ln = "cube-viz-drag-handle";
function ts(e) {
  var s;
  const { registry: t } = Ve(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ b(Jo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ b(
      Xo,
      {
        ...i,
        className: _(Ln, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(Zo, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(es, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class fi extends tl {
  constructor() {
    super(...arguments);
    tr(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ b($n, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Zr, {}),
      /* @__PURE__ */ l(zn, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(Vn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Th(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Rh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Oh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const _h = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Ze(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let Ct = null;
function ns(e = {}) {
  return Ct || (e.includeStyleProperties ? (Ct = e.includeStyleProperties, Ct) : (Ct = Ze(window.getComputedStyle(document.documentElement)), Ct));
}
function En(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Ah(e) {
  const t = En(e, "border-left-width"), n = En(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Dh(e) {
  const t = En(e, "border-top-width"), n = En(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function rs(e, t = {}) {
  const n = t.width || Ah(e), r = t.height || Dh(e);
  return { width: n, height: r };
}
function Lh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Te = 16384;
function Eh(e) {
  (e.width > Te || e.height > Te) && (e.width > Te && e.height > Te ? e.width > e.height ? (e.height *= Te / e.width, e.width = Te) : (e.width *= Te / e.height, e.height = Te) : e.width > Te ? (e.height *= Te / e.width, e.width = Te) : (e.width *= Te / e.height, e.height = Te));
}
function Fn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Fh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Ih(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), Fh(a);
}
const Me = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Me(n, t);
};
function Ph(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function $h(e, t) {
  return ns(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function zh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? Ph(n) : $h(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function hi(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = _h();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(zh(o, n, a, r)), t.appendChild(s);
}
function Vh(e, t, n) {
  hi(e, t, ":before", n), hi(e, t, ":after", n);
}
const pi = "application/font-woff", gi = "image/jpeg", jh = {
  woff: pi,
  woff2: pi,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: gi,
  jpeg: gi,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Wh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function xa(e) {
  const t = Wh(e).toLowerCase();
  return jh[t] || "";
}
function Bh(e) {
  return e.split(/,/)[1];
}
function Lr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Kh(e, t) {
  return `data:${t};base64,${e}`;
}
async function as(e, t, n) {
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
const ur = {};
function qh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Ma(e, t, n) {
  const r = qh(e, t, n.includeQueryParams);
  if (ur[r] != null)
    return ur[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await as(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Bh(s)));
    a = Kh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return ur[r] = a, a;
}
async function Uh(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Fn(t);
}
async function Hh(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return Fn(s);
  }
  const n = e.poster, r = xa(n), a = await Ma(n, r, t);
  return Fn(a);
}
async function Gh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Jn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Yh(e, t) {
  return Me(e, HTMLCanvasElement) ? Uh(e) : Me(e, HTMLVideoElement) ? Hh(e, t) : Me(e, HTMLIFrameElement) ? Gh(e, t) : e.cloneNode(is(e));
}
const Qh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", is = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Jh(e, t, n) {
  var r, a;
  if (is(t))
    return t;
  let i = [];
  return Qh(e) && e.assignedNodes ? i = Ze(e.assignedNodes()) : Me(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ze(e.contentDocument.body.childNodes) : i = Ze(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Me(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Jn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Xh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : ns(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Me(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Zh(e, t) {
  Me(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Me(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function ep(e, t) {
  if (Me(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function tp(e, t, n) {
  return Me(t, Element) && (Xh(e, t, n), Vh(e, t, n), Zh(e, t), ep(e, t)), t;
}
async function np(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Jn(u, t, !0));
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
async function Jn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Yh(r, t)).then((r) => Jh(e, r, t)).then((r) => tp(e, r, t)).then((r) => np(r, t));
}
const os = /url\((['"]?)([^'"]+?)\1\)/g, rp = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, ap = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ip(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function op(e) {
  const t = [];
  return e.replace(os, (n, r, a) => (t.push(a), n)), t.filter((n) => !Lr(n));
}
async function sp(e, t, n, r, a) {
  try {
    const i = n ? Oh(t, n) : t, o = xa(t);
    let s;
    return a || (s = await Ma(i, o, r)), e.replace(ip(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function lp(e, { preferredFontFormat: t }) {
  return t ? e.replace(ap, (n) => {
    for (; ; ) {
      const [r, , a] = rp.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function ss(e) {
  return e.search(os) !== -1;
}
async function ls(e, t, n) {
  if (!ss(e))
    return e;
  const r = lp(e, n);
  return op(r).reduce((i, o) => i.then((s) => sp(s, o, t, n)), Promise.resolve(r));
}
async function Nt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await ls(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function cp(e, t) {
  await Nt("background", e, t) || await Nt("background-image", e, t), await Nt("mask", e, t) || await Nt("-webkit-mask", e, t) || await Nt("mask-image", e, t) || await Nt("-webkit-mask-image", e, t);
}
async function up(e, t) {
  const n = Me(e, HTMLImageElement);
  if (!(n && !Lr(e.src)) && !(Me(e, SVGImageElement) && !Lr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Ma(r, xa(r), t);
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
async function mp(e, t) {
  const r = Ze(e.childNodes).map((a) => cs(a, t));
  await Promise.all(r).then(() => e);
}
async function cs(e, t) {
  Me(e, Element) && (await cp(e, t), await up(e, t), await mp(e, t));
}
function dp(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const vi = {};
async function bi(e) {
  let t = vi[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, vi[e] = t, t;
}
async function yi(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let s = o.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), as(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(o, `url(${c})`), [o, c]));
  });
  return Promise.all(i).then(() => n);
}
function ki(e) {
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
async function fp(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ze(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = bi(c).then((d) => yi(d, t)).then((d) => ki(d).forEach((m) => {
              try {
                a.insertRule(m, m.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: m,
                  error: h
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
        a.href != null && r.push(bi(a.href).then((s) => yi(s, t)).then((s) => ki(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ze(a.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${a.href}`, i);
      }
  }), n));
}
function hp(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ss(t.style.getPropertyValue("src")));
}
async function pp(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ze(e.ownerDocument.styleSheets), r = await fp(n, t);
  return hp(r);
}
function us(e) {
  return e.trim().replace(/["']/g, "");
}
function gp(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(us(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function vp(e, t) {
  const n = await pp(e, t), r = gp(e);
  return (await Promise.all(n.filter((i) => r.has(us(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return ls(i.cssText, o, t);
  }))).join(`
`);
}
async function bp(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await vp(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function yp(e, t = {}) {
  const { width: n, height: r } = rs(e, t), a = await Jn(e, t, !0);
  return await bp(a, t), await cs(a, t), dp(a, t), await Ih(a, n, r);
}
async function kp(e, t = {}) {
  const { width: n, height: r } = rs(e, t), a = await yp(e, t), i = await Fn(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || Lh(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return o.width = u * c, o.height = d * c, t.skipAutoScale || Eh(o), o.style.width = `${u}`, o.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function wp(e, t = {}) {
  return (await kp(e, t)).toDataURL();
}
function Cp(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Np(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Sp(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function xp(e, t, n = 2) {
  const r = await wp(e, {
    pixelRatio: n,
    backgroundColor: Sp(e),
    cacheBust: !0
  });
  Np(r, `${Cp(t)}.png`);
}
function Mp({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = y.useState(!1), [o, s] = y.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const d = () => {
    const g = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Rh(Th(t), `${g}.csv`);
  }, m = async () => {
    const g = r == null ? void 0 : r.current;
    if (!(!g || a)) {
      i(!0), s(null);
      try {
        await xp(g, e);
      } catch (v) {
        s(v instanceof Error ? v.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, h = (g) => g.stopPropagation(), f = (g = !0) => _("cv-menu-item", !g && "cv-menu-item--disabled");
  return /* @__PURE__ */ b(Fe, { children: [
    /* @__PURE__ */ l(
      Ie,
      {
        onMouseDown: h,
        onPointerDown: h,
        onTouchStart: h,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(Ml, {})
      }
    ),
    /* @__PURE__ */ b(Pe, { align: "end", className: "cv-menu", onMouseDown: h, onPointerDown: h, onTouchStart: h, children: [
      n ? /* @__PURE__ */ b("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ l(Tl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ b("button", { type: "button", onClick: m, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ l(Rl, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ b("button", { type: "button", onClick: d, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ l(Ol, {}),
        "Export CSV"
      ] }),
      o ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: o }) : null
    ] })
  ] });
}
function wi({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        Sa,
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
      return /* @__PURE__ */ l(ih, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Nh, { control: e.control, title: e.title });
  }
}
function Er({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = bt({ rows: [] }), s = Xe(
    (d) => o({ rows: d.rows, refetch: d.refetch }),
    []
  ), c = ut(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(fi, { children: /* @__PURE__ */ l(wi, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Mp,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    ts,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(fi, { children: /* @__PURE__ */ l(
        wi,
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
const ms = (e) => e.filter((t) => t.type === "chart");
function Tp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of ms(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Se(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function Rp(e) {
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
  for (const a of ms(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Op({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = mn(), o = i == null ? void 0 : i.setVar, s = y.useMemo(() => Tp(e.widgets), [e.widgets]), c = y.useMemo(() => Rp(e.widgets), [e.widgets]), u = y.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const d = y.useCallback(
    (g) => {
      var v, k;
      if (o) {
        const w = g != null && g.widgetId ? s.get(g.widgetId) : void 0;
        if (w) o(w, g ? [g.from, g.to] : void 0);
        else if (!g) for (const C of new Set(s.values())) o(C, void 0);
      }
      (k = (v = u.current).onRangeSelect) == null || k.call(v, g);
    },
    [o, s]
  ), m = y.useCallback(
    (g) => {
      var v, k;
      if (o)
        if (g) {
          const w = c.get(g.member);
          w && o(w, [String(g.value)]);
        } else
          for (const w of new Set(c.values())) o(w, void 0);
      (k = (v = u.current).onPointSelect) == null || k.call(v, g);
    },
    [o, c]
  ), h = !!(n || t && o && s.size), f = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    la,
    {
      onRangeSelect: h ? d : void 0,
      onPointSelect: f ? m : void 0,
      children: a
    }
  );
}
const _p = "lg", Ap = 640;
function Dp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Lp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Sy({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = Go(), c = e.grid ?? {}, u = c.cols ?? 12, d = c.rowHeight ?? 40, m = c.margin ?? [12, 12], h = c.containerPadding ?? m, f = re(
    () => ({ [_p]: Lp(e.layout) }),
    [e.layout]
  ), g = re(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), v = !t && s > 0 && s < Ap;
  return /* @__PURE__ */ l(Ca, { families: n, children: /* @__PURE__ */ l(Na, { spec: e, children: /* @__PURE__ */ l(
    Op,
    {
      spec: e,
      drill: r,
      onRangeSelect: a,
      onPointSelect: i,
      children: /* @__PURE__ */ l("div", { ref: o, className: "cv-dashboard", children: s <= 0 ? null : v ? /* @__PURE__ */ l(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: m[1],
            padding: `${h[1]}px ${h[0]}px`
          },
          children: Dp(e.layout).map((k) => {
            const w = g.get(k.i);
            if (!w) return null;
            const C = k.h * d + (k.h - 1) * m[1];
            return /* @__PURE__ */ l("div", { style: { height: C }, children: /* @__PURE__ */ l(Er, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        eo,
        {
          width: s,
          layouts: f,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: d,
          margin: m,
          containerPadding: h,
          dragConfig: { enabled: t, handle: `.${Ln}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = g.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Er, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function xy({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(Ca, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    ts,
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
        rh,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function ds(e, t = "None") {
  if (Se(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => ds(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Ep(e) {
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
function Fp(e, t) {
  const n = new Set(Ep(t));
  return e.filter((r) => n.has(r.type));
}
function Ip(e) {
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
function Pp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function $p(e, t, n) {
  const r = Ip(e), a = { name: Pp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const mr = et.options, Fr = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function zp(e, t = "None") {
  const n = ds(e, t);
  return n === At ? "Auto" : Fr[n] ?? n;
}
const dr = "__none__";
function fs({
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
  const m = n && n.length > 0 ? n : mr, h = e && e !== At && !m.includes(e) ? [...m, e].sort(
    (g, v) => mr.indexOf(g) - mr.indexOf(v)
  ) : m, f = a ? `Auto (${Fr[a]})` : "Auto";
  return /* @__PURE__ */ b(
    _e,
    {
      value: e ?? (i ? dr : ""),
      onValueChange: (g) => t(g === dr ? void 0 : g),
      disabled: c,
      children: [
        /* @__PURE__ */ l(De, { id: u, className: d, children: /* @__PURE__ */ l(Ae, { placeholder: s }) }),
        /* @__PURE__ */ b(Le, { children: [
          i ? /* @__PURE__ */ l(be, { value: dr, children: o }) : null,
          r ? /* @__PURE__ */ l(be, { value: At, children: f }) : null,
          h.map((g) => /* @__PURE__ */ l(be, { value: g, children: Fr[g] }, g))
        ] })
      ]
    }
  );
}
function Xn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Vp(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function jp(e) {
  return Ir(e, "category");
}
function Ir(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function Be(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Zn(e) {
  return e ? e.cubes.filter((t) => Be(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Xn(t),
    joinTargets: Vp(t),
    category: jp(t),
    path: Ir(t, "path"),
    grain: Ir(t, "grain")
  })) : [];
}
function Wp(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function vt(e, t) {
  if (!(!e || !t))
    return Zn(e).find((n) => n.name === t);
}
function Ta(e) {
  return e.shortTitle || e.title || e.name;
}
function ze(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function hs(e) {
  return ze(e.meta, "group");
}
function Bp(e) {
  return ze(e.meta, "geoPoint");
}
function Ci(e) {
  const t = ze(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Kp(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function kn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function ps(e, t) {
  if (t)
    return yt(e, "time", t).find(kn);
}
function qp(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = hs(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function Up(e) {
  return ze(e.meta, "agg");
}
function Pr(e) {
  const t = ze(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function Hp(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.aggDefault) === !0;
}
function Ni(e) {
  return ze(e.meta, "familyTitle");
}
function Gp(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? `per ${t[1]}` : "per row";
}
function Yp(e, t) {
  const n = Pr(t);
  if (!n) return [t];
  const r = [
    ...yt(e, "measure", t.cube),
    ...yt(e, "numberDimension", t.cube)
  ], a = /* @__PURE__ */ new Set(), i = [];
  for (const o of r)
    Pr(o) !== n || a.has(o.name) || (a.add(o.name), i.push(o));
  return i.length > 0 ? i : [t];
}
function Qp(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const a = Pr(r.option);
    if (!a) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(a);
    i || (i = { familyKey: a, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(a, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const a = r.variants.find((s) => Ni(s.option)), i = r.variants.findIndex((s) => Hp(s.option)), o = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : o >= 0 ? o : 0, r.label = Ni((a == null ? void 0 : a.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function Ra(e, t) {
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
function gs(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ze(n, "quantity"),
    unit: ze(n, "unit")
  };
}
function wn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ze(n, "quantity"),
    unit: ze(n, "unit")
  };
}
function vs(e, t) {
  return {
    name: e.name,
    label: Ta(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Jp(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = Bp({ meta: i });
    !o || !Be(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && Ci({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && Ci({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Kp(o[0].name, s[0].name),
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
function Si(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function yt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Be(a) || n && a.name !== n) continue;
    const i = Xn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...Jp(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Be(s) && o(gs(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Be(s) && s.type !== "time" && !Si(s) && o(wn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Be(s) && s.type === "time" && o(wn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Be(s) && s.type === "number" && !Si(s) && o(wn(s, a.name));
  }
  return r;
}
function Xp(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Be(a) || n && !n.has(a.name)) continue;
    const i = Xn(a);
    for (const o of a.segments) {
      if (!Be(o)) continue;
      const s = vs(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Oe(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Xn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(gs(i, n.name)) : a(wn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(vs(o, n.name));
    }
    return yt(e, "geoPoint").find((n) => n.name === t);
  }
}
function xi(e) {
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
const $r = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), bs = {
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
function Zp(e) {
  return e === "number";
}
function je(e) {
  return e.target !== void 0;
}
function we(e, t) {
  return e.kinds.includes(t);
}
function Oa(e, t, n) {
  if (!we(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function kt(e) {
  return e.chart.familyOptions ?? {};
}
function _a(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function ys(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function eg(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function tg(e, t, n) {
  var o, s;
  const r = e.chart;
  if (_a(r)) return;
  const a = dn(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = kt(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Vt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = kt(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!je(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const d = dn(a);
        r[c.id] = d ? [d] : [];
        break;
      }
      case "measures": {
        const d = ys(a), m = d.length ? d : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, m);
        break;
      }
      case "pivot": {
        const d = _a(a) ?? tg(e, t, n);
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
function Aa(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Da(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function ng(e, t) {
  return { ...e, dimensions: Aa(e.dimensions, t) };
}
function ks(e, t) {
  const n = Da(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function ws(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function My(e) {
  return e === void 0 ? ug : wa(e);
}
const rg = "last 30 days";
function jt(e, t, n, r) {
  if (Zp(n)) return { ...e, measures: Aa(e.measures, t) };
  if (n === "time") {
    const a = fn(e) ?? r;
    return ws(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? At,
      dateRange: a ? a.dateRange : rg
    });
  }
  return ng(e, t);
}
function qt(e, t, n, r) {
  const a = e.query ?? {}, i = Vt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = fn(a);
  if ((o == null ? void 0 : o.dimension) === n) return ws(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = Da(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return ks(a, n);
}
function ag(e, t, n, r) {
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
  return { category: { member: e }, series: Ss(t, r) };
}
function Xt(e, t, n) {
  var c, u;
  const r = Vt(e, t, n), a = (d) => t.find((m) => {
    var h;
    return ((h = m.target) == null ? void 0 : h.kind) === d;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : dn(e.chart),
    measures: o ? r[o.id] ?? [] : ys(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : _a(e.chart)
  };
}
function Zt(e, t, n) {
  const r = { ...Ns(e.chart), ...eg(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: ag(n.category, n.measures, n.pivot, r)
    }
  };
}
function In(e, t, n) {
  const r = { ...kt(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function La(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !je(i)) return e;
  const o = i.target, s = Vt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], d = fn(c);
      u && u !== r && (c = qt(e, t, u, n)), c = jt(c, r, a, d);
      const m = Xt({ ...e, query: c }, t, [r]);
      return Zt(e, c, { ...m, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Aa(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = qt(e, t, s[0], n)), c = jt(c, r, a);
      const d = Xt({ ...e, query: c }, t, [r]);
      return Zt(e, c, { ...d, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = qt(e, t, u, n)), c = jt(c, r, a);
      const d = Xt({ ...e, query: c }, t, [r]);
      return Zt(e, c, { ...d, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = qt(e, t, u, n)), c = jt(c, r, a), In(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(kt(e)[o.key]) ? [...kt(e)[o.key]] : [];
      return u.some((d) => (d == null ? void 0 : d.member) === r) || u.push({ member: r }), c = jt(c, r, a), In(e, c, { [o.key]: u });
    }
  }
}
function ig(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !je(a)) return e;
  const i = a.target, o = qt(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Xt(e, t), c = Da(s.measures, r), u = c.length ? s.pivot : void 0, d = c.length || !s.pivot ? o : ks(o, s.pivot);
      return Zt(e, d, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Xt(e, t);
      return Zt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return In(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(kt(e)[i.key]) ? kt(e)[i.key] : [];
      return In(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function og(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = fn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function sg(e, t) {
  if (we(t, e)) return e;
  if (e === "category" && we(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && we(t, "category") || e === "time" && we(t, "category")) return "category";
}
function lg(e, t, n) {
  const r = Vt(e, t), a = /* @__PURE__ */ new Map();
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
    if (!je(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const d = sg(og(e, u), o);
      d && (i = La(i, n, o.id, u, d));
    }
  }
  return i;
}
function cg(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!je(a)) continue;
    const i = n.findIndex((o) => we(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function xt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Cs(e) {
  var o, s, c, u, d;
  const t = e.query ?? {}, n = (o = t.measures) == null ? void 0 : o.find(Boolean);
  if (n) return xt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return xt(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return xt(a);
  const i = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return xt(i);
}
function zr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Ns(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function dn(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function fn(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Ss(e, t) {
  const n = {};
  for (const a of e) {
    const i = t[a];
    i && Object.keys(i).length > 0 && (n[a] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const ug = "day";
function Vr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function mg(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Vr(r) && Vr(a) ? lg(e, r.wells, a.wells) : dg(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function dg(e, t) {
  var f;
  const { chart: n } = e, r = e.query ?? {}, a = zr(n).length ? zr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((g) => g.dimension), o = dn(n) ?? ((f = r.dimensions) == null ? void 0 : f[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (g, v, k) => !!g && k.indexOf(g) === v
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Vr(t)) {
    const g = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: g } } : c;
  }
  const u = [...a], d = [...s], m = (g) => i.includes(g) ? "time" : "category";
  let h = c;
  for (const g of t.wells) {
    if (!g.target || !g.channel) continue;
    const v = we(g, "category") ? [
      [d, m],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [d, m]
    ];
    let k = 0;
    for (const [w, C] of v)
      for (let A = 0; A < w.length; ) {
        if (g.cardinality === "one" && k > 0 || !we(g, C(w[A]))) {
          A += 1;
          continue;
        }
        h = La(h, t.wells, g.id, w[A], C(w[A])), w.splice(A, 1), k += 1;
      }
  }
  return h;
}
function xs(e) {
  return $f(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Ms(e) {
  return Vf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function fg(e, t) {
  return t.require(e).wells;
}
function en(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Vt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function St(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = La(e, o.wells, n, r, a);
  return hg(e, s, o.wells);
}
function Ts(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = ig(e, i.wells, n, r);
  return Rs(e, o, i.wells);
}
function hg(e, t, n) {
  return pg(e, Rs(e, t, n));
}
function pg(e, t) {
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
function Rs(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((d) => d.dimension)), o = new Set(Object.values(Vt(t, n)).flat()), s = r.filter((d) => !i.has(d.dimension) && o.has(d.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...a, ...s] } };
}
function Os({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: _("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": n.selected,
      disabled: n.disabled,
      title: n.title ?? `Aggregation: ${n.label}`,
      onClick: n.onSelect,
      className: _("cv-picker-aggseg-opt", n.selected && "cv-picker-aggseg-opt--on"),
      children: n.label
    },
    n.label
  )) });
}
function _s(e, t) {
  var a;
  const n = (a = e.meta) == null ? void 0 : a.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = Up(e) ?? "";
  return r === "value" ? Gp(t == null ? void 0 : t.grain) : r;
}
const ye = y.forwardRef(
  ({ className: e, type: t, id: n, ...r }, a) => {
    const i = y.useId();
    return /* @__PURE__ */ l(
      "input",
      {
        ref: a,
        type: t,
        id: n ?? i,
        "data-slot": "input",
        className: _("cv-input", e),
        ...r
      }
    );
  }
);
ye.displayName = "Input";
function jr({ option: e }) {
  const t = Qn();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ra(e, t) });
}
function As({
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
  const { meta: u, isLoading: d } = lt(), m = y.useMemo(() => {
    if (t) {
      const v = new Set(t);
      return yt(u, n).filter((k) => v.has(k.cube));
    }
    return yt(u, n, e);
  }, [u, n, e, t]), h = y.useMemo(() => {
    const v = gg(m), k = v.length > 1, w = [];
    for (const [C, A] of v)
      for (const [N, M] of qp(A, () => "Other")) {
        const E = k ? N === "Other" ? C : `${C} · ${N}` : N;
        w.push({ key: `${C}:${N}`, label: E, items: M });
      }
    return w;
  }, [m]), f = h.length > 1, g = m.find((v) => v.name === r);
  return /* @__PURE__ */ b(_e, { value: r, onValueChange: a, disabled: o || d, children: [
    /* @__PURE__ */ l(De, { id: s, className: c, children: /* @__PURE__ */ l(Ae, { placeholder: d ? "Loading…" : i, children: g ? /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(jr, { option: g }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: g.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Le, { children: h.map((v) => /* @__PURE__ */ b(Ar, { children: [
      f && v.label ? /* @__PURE__ */ l(Dr, { children: v.label }) : null,
      v.items.map((k) => /* @__PURE__ */ l(be, { value: k.name, children: /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(jr, { option: k }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, v.key)) })
  ] });
}
function gg(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ot({
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
      className: _("cv-segmented", s),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ b(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: i || c.disabled,
            onClick: () => n(c.value),
            className: _(
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
function Mi(e) {
  return e.reason === void 0;
}
function Ds(e, t, n, r, a) {
  const i = Oa(e, t, [...n]);
  return i ? vg(i, e, r) : a == null ? void 0 : a(r);
}
function vg(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function bg(e, t, n) {
  if (t !== void 0 && xs(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${Ms(e)}`;
}
const Ea = "cube-viz:field-picker:only-compatible";
function Ls() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Es() {
  var e;
  try {
    return ((e = Ls()) == null ? void 0 : e.getItem(Ea)) !== "0";
  } catch {
    return !0;
  }
}
function yg(e) {
  try {
    const t = Ls();
    if (!t) return;
    t.setItem(Ea, e ? "1" : "0");
  } catch {
  }
}
let Wr = Es();
const Cn = /* @__PURE__ */ new Set();
let Mt;
function kg() {
  for (const e of [...Cn]) e();
}
function Fs(e) {
  e !== Wr && (Wr = e, kg());
}
function wg() {
  if (Mt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Ea || Fs(Es());
  };
  e.addEventListener("storage", t), Mt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const gn = {
  get: () => Wr,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    yg(e), Fs(e);
  },
  subscribe: (e) => (Cn.add(e), wg(), () => {
    Cn.delete(e), Cn.size === 0 && (Mt == null || Mt(), Mt = void 0);
  })
}, Cg = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Ll, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(Wa, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(Wa, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(Ji, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(Dl, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, Ti = ["geoPoint", "number", "numberDimension", "category", "time"];
function Fa({
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
  var fe, ge;
  const { meta: u, isLoading: d } = lt(), [m, h] = y.useState(!1), [f, g] = y.useState(""), v = y.useSyncExternalStore(
    gn.subscribe,
    gn.get,
    gn.getServer
  ), k = gn.set, w = y.useId(), [C, A] = y.useState(r.viewLocked ?? "tables"), [N, M] = y.useState({}), [E, O] = y.useState({});
  y.useEffect(() => {
    m && A(r.viewLocked ?? "tables");
  }, [m, r.viewLocked]);
  const z = y.useMemo(() => new Set(t), [t]), j = f.trim().toLowerCase(), T = Qn(), D = y.useMemo(() => {
    if (C !== "tables") {
      const R = r.views.find((W) => W.name === C) ?? vt(u, C);
      return R ? [{ cube: R, tag: "dataset" }] : [];
    }
    const V = [];
    r.sourceCube && V.push({ cube: r.sourceCube, tag: "source" });
    const oe = r.relatedCubes.some((R) => R.path ?? R.category) ? "More tables" : "Related tables", L = (R) => R.path ? Wp(R.path) : R.category, x = /* @__PURE__ */ new Map();
    for (const R of r.relatedCubes) {
      const W = L(R);
      W !== void 0 && !x.has(W) && x.set(W, x.size);
    }
    const S = [...r.relatedCubes].sort((R, W) => {
      const q = L(R), H = L(W);
      return q === H ? 0 : q === void 0 ? 1 : H === void 0 ? -1 : (x.get(q) ?? 0) - (x.get(H) ?? 0);
    });
    for (const R of S) V.push({ cube: R, tag: "related", heading: L(R) ?? oe });
    return V;
  }, [C, r, u]), P = [
    ...Ti.filter((V) => we(e, V)),
    ...Ti.filter((V) => !we(e, V))
  ], F = (V) => {
    const ee = [], oe = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Set();
    for (const x of P) {
      const S = Cg[x], R = Oa(e, x, n ?? []);
      let W = yt(u, S.metaKind, V);
      x === "time" && (W = [...W].sort(
        (q, H) => Number(kn(H)) - Number(kn(q))
      ));
      for (const q of W) {
        if (z.has(q.name) || L.has(q.name) || j && !(q.label.toLowerCase().includes(j) || q.name.toLowerCase().includes(j))) continue;
        L.add(q.name);
        const H = hs(q), J = H ? `g:${H.toLowerCase()}` : `k:${S.label}`;
        let B = oe.get(J);
        B || (B = {
          key: J,
          label: H ?? S.label,
          headerIcon: H ? void 0 : S.icon,
          rejected: R !== void 0,
          items: []
        }, oe.set(J, B), ee.push(J)), R === void 0 && (B.rejected = !1), B.items.push({
          option: q,
          kind: x,
          reason: Ds(e, x, n ?? [], q, a)
        });
      }
    }
    return ee.map((x) => oe.get(x));
  }, U = D.map((V) => ({ section: V, groups: F(V.cube.name) })).filter((V) => V.groups.length > 0), $ = v ? U.reduce(
    (V, ee) => V + ee.groups.reduce((oe, L) => oe + L.items.filter((x) => !Mi(x)).length, 0),
    0
  ) : 0, I = v ? U.map((V) => ({
    section: V.section,
    groups: V.groups.map((ee) => ({ ...ee, rejected: !1, items: ee.items.filter(Mi) })).filter((ee) => ee.items.length > 0)
  })).filter((V) => V.groups.length > 0) : U, Y = I.length > 0, Z = !Y && $ > 0, te = (V, ee) => {
    i(V, ee), h(!1), g("");
  }, se = C === "tables" ? "All related tables" : ((fe = r.views.find((V) => V.name === C)) == null ? void 0 : fe.title) ?? ((ge = vt(u, C)) == null ? void 0 : ge.title) ?? C, ue = r.viewLocked ? r.views.filter((V) => V.name === r.viewLocked) : [], le = v ? $ > 0 ? `Only compatible fields — ${$} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ b(Fe, { open: m, onOpenChange: h, children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: c }),
    /* @__PURE__ */ b(Pe, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ b("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ b("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(_l, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: f,
              onChange: (V) => g(V.target.value),
              placeholder: d ? "Loading fields…" : "Search fields…",
              className: "cv-picker-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ b(
          "button",
          {
            type: "button",
            "aria-pressed": v,
            "aria-label": le,
            title: le,
            onClick: () => k(!v),
            className: _("cv-picker-compat", v && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(Al, { className: "cv-ec-icon" }),
              v && $ > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: $ }) : null
            ]
          }
        ),
        ue.length > 0 ? /* @__PURE__ */ l(
          Ng,
          {
            browse: C,
            label: se,
            views: ue,
            onBrowse: A
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: Y ? I.map(({ section: V, groups: ee }, oe) => {
        const L = ee.reduce((H, J) => H + J.items.length, 0), x = V.tag === "related", S = N[V.cube.name] ?? x, R = j.length > 0 ? !0 : !S, W = oe > 0 ? I[oe - 1].section : void 0, q = V.tag === "related" && V.heading !== void 0 && ((W == null ? void 0 : W.tag) !== "related" || W.heading !== V.heading);
        return /* @__PURE__ */ b("div", { children: [
          q ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: V.heading }) : null,
          /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => M((H) => ({ ...H, [V.cube.name]: !S })),
              className: "cv-picker-table",
              children: [
                R ? /* @__PURE__ */ l(it, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(cn, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(Gi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: V.cube.title }),
                V.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: V.cube.grain }) : null,
                V.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : V.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: L })
              ]
            }
          ),
          R ? ee.map((H) => /* @__PURE__ */ b(
            "div",
            {
              className: _(
                "cv-picker-group",
                H.rejected && "cv-picker-group--rejected"
              ),
              children: [
                ee.length > 1 ? /* @__PURE__ */ b("div", { className: "cv-picker-group-header", children: [
                  H.headerIcon,
                  H.label,
                  H.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                Qp(H.items).map((J) => {
                  const B = J.familyKey ? E[J.familyKey] : void 0, G = J.variants.findIndex((ke) => ke.option.name === B), K = G >= 0 ? G : J.defaultIndex, { option: ie, kind: ce, reason: Re } = J.variants[K], he = J.familyKey ? {
                    options: J.variants.map((ke, We) => ({
                      label: _s(ke.option, vt(u, ke.option.cube)),
                      selected: We === K,
                      disabled: ke.reason !== void 0,
                      title: ke.reason,
                      onSelect: () => {
                        O((hn) => ({ ...hn, [J.familyKey]: ke.option.name }));
                      }
                    }))
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Sg,
                    {
                      option: ie,
                      label: J.familyKey ? J.label : void 0,
                      unitBadge: Ra(ie, T),
                      badge: ce === "time" && kn(ie) ? "default" : void 0,
                      reason: Re,
                      agg: he,
                      onPick: () => te(ie.name, ce)
                    },
                    J.familyKey ?? ie.name
                  );
                })
              ]
            },
            H.key
          )) : null
        ] }, V.cube.name);
      }) : Z ? /* @__PURE__ */ b("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ b("p", { children: [
          $,
          " ",
          j ? "matching " : "",
          "field",
          $ === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          $ === 1 ? "it" : "them",
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
function Ng({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = y.useState(!1), o = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ b(Fe, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Ie,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(Yi, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ b(Pe, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Ri, { active: e === "tables", icon: /* @__PURE__ */ l(Gi, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ b(pe, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          Ri,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(Qi, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Ri({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ b(
    "button",
    {
      type: "button",
      onClick: n,
      className: _(
        "cv-ec-menu-item",
        e && "cv-ec-menu-item--active"
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-icon", children: t }),
        /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: r }),
        e ? /* @__PURE__ */ l(Pt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function Sg({ option: e, label: t, reason: n, onPick: r, unitBadge: a, badge: i, agg: o }) {
  const s = a ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: a }) : null, c = t ?? e.label, u = o ? /* @__PURE__ */ l(Os, { options: o.options }) : null, d = n ? /* @__PURE__ */ b(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: n,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ b("span", { className: "cv-picker-row-main", children: [
          s,
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: c })
        ] }),
        /* @__PURE__ */ l("span", { className: "cv-picker-row-reason", children: n })
      ]
    }
  ) : /* @__PURE__ */ b(
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
  return u ? /* @__PURE__ */ b("span", { className: "cv-picker-rowwrap", children: [
    d,
    u
  ] }) : d;
}
const xg = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Ut = "yyyy-MM-dd";
function Mg(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Oi(e) {
  if (!e) return;
  const t = Bi(e, Ut, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Ia({ value: e, onChange: t }) {
  const [n, r] = y.useState(!1), a = typeof e == "string", [i, o] = Mg(e), s = Oi(i), c = Oi(o), u = s ? { from: s, to: c } : void 0, d = a ? e : s && c ? `${ve(s, "MMM d, yyyy")} – ${ve(c, "MMM d, yyyy")}` : s ? ve(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ b(Fe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", className: _("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Hi, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: _("cv-daterange-label", d === "Any time" && "cv-daterange-label--placeholder"), children: d })
    ] }) }),
    /* @__PURE__ */ b(Pe, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ b("div", { className: "cv-daterange-presets", children: [
        xg.map((m) => /* @__PURE__ */ l(
          Q,
          {
            variant: "ghost",
            size: "sm",
            className: _("cv-daterange-preset", e === m && "cv-daterange-preset--active"),
            onClick: () => {
              t(m), r(!1);
            },
            children: m
          },
          m
        )),
        /* @__PURE__ */ l(
          Q,
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
        Qo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (m) => {
            m != null && m.from && m.to ? t([ve(m.from, Ut), ve(m.to, Ut)]) : m != null && m.from ? t([ve(m.from, Ut), ve(m.from, Ut)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Is = y.createContext({});
function Tg({
  createVariable: e,
  children: t
}) {
  const n = y.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Is.Provider, { value: n, children: t });
}
function Rg() {
  return y.useContext(Is);
}
function Og({ kind: e, value: t, onChange: n, className: r }) {
  const a = mn(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = Rg(), [s, c] = y.useState(!1), [u, d] = y.useState(!1), [m, h] = y.useState(""), f = y.useMemo(() => Fp(i, e), [i, e]), g = f.find((w) => w.name === t), v = (w) => {
    n(w), c(!1), d(!1);
  }, k = () => {
    if (!o) return;
    const w = $p(e, m || "Variable", i);
    o(w), v(w.name), h("");
  };
  return /* @__PURE__ */ b(
    Fe,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || d(!1);
      },
      children: [
        /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", className: _("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(El, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: _("cv-var-trigger-label", !g && "cv-var-trigger-label--placeholder"), children: g ? g.label ?? g.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ b(Pe, { align: "start", className: "cv-var-popover", children: [
          f.length > 0 ? f.map((w) => /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => v(w.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: w.label ?? w.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: w.type }),
                w.name === t ? /* @__PURE__ */ l(Pt, { className: "cv-ec-icon" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ b("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              ye,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: m,
                onChange: (w) => h(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(Q, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ b(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv-ec-menu-item cv-var-new-trigger",
              children: [
                /* @__PURE__ */ l(_t, { className: "cv-ec-icon" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function It({
  kind: e,
  value: t,
  onChange: n,
  renderFixed: r,
  labelId: a
}) {
  const i = Se(t), [o, s] = y.useState(i ? "var" : "fixed");
  y.useEffect(() => {
    i && s("var");
  }, [i]);
  const c = (u) => _("cv-bind-seg", u && "cv-bind-seg--active");
  return /* @__PURE__ */ b("div", { className: "cv-bind", ...a ? { role: "group", "aria-labelledby": a } : {}, children: [
    /* @__PURE__ */ b("div", { className: "cv-bind-toggle", children: [
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
      Og,
      {
        kind: e,
        value: Se(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(Se(t) ? void 0 : t, (u) => n(u))
  ] });
}
const _g = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function fr(e) {
  return "member" in e && "operator" in e;
}
function Ag({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var T;
  const { meta: s } = lt(), c = ((T = mn()) == null ? void 0 : T.decls) ?? [], [u, d] = y.useState(null), [m, h] = y.useState(null), f = r ?? [], g = f.length === 1 && !fr(f[0]) && "or" in f[0] && Array.isArray(f[0].or) && f[0].or.every(fr) ? f[0] : void 0, v = g ? "any" : "all", k = [], w = [];
  g || f.forEach((D) => fr(D) ? k.push(D) : w.push(D));
  const C = g ? g.or : k, A = w.length === 0 && (C.length >= 2 || v === "any"), N = (D) => v === "any" ? D.length ? [{ or: D }] : [] : [...D, ...w], M = (D) => {
    const P = D.filter((U) => U.member.length > 0), F = N(P);
    a(F.length > 0 ? F : void 0);
  }, E = (D) => {
    const P = D === "any" ? C.length ? [{ or: C }] : [] : [...C];
    a(P.length > 0 ? P : void 0);
  }, O = (D, P) => M(C.map((F, U) => U === D ? { ...F, ...P } : F)), z = (D) => M(C.filter((P, F) => F !== D)), j = (D) => {
    const F = { ...m ?? { member: "", operator: "equals", values: [] }, ...D };
    F.member ? (h(null), d(C.length), M([...C, F])) : h(F);
  };
  return /* @__PURE__ */ b("div", { "data-slot": "filter-builder", className: _("cv-filter-builder", o), children: [
    C.length === 0 && !m ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    A ? /* @__PURE__ */ b("div", { className: "cv-filter-match", children: [
      /* @__PURE__ */ l("span", { children: "Match" }),
      /* @__PURE__ */ l(
        Ot,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: v,
          onChange: E
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    C.map((D, P) => {
      const F = Oe(s, D.member);
      return u === P ? /* @__PURE__ */ l(
        _i,
        {
          leaf: D,
          member: F,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (U) => O(P, U),
          onDone: () => d(null),
          onRemove: () => z(P)
        },
        P
      ) : /* @__PURE__ */ l(
        Dg,
        {
          text: Lg(D, F == null ? void 0 : F.label, c),
          disabled: i,
          onEdit: () => d(P),
          onRemove: () => z(P)
        },
        P
      );
    }),
    m ? /* @__PURE__ */ l(
      _i,
      {
        leaf: m,
        member: Oe(s, m.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: j,
        onRemove: () => h(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ b("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ b(
      Q,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!m,
        onClick: () => {
          d(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(_t, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Dg({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ b("div", { className: "cv-filter-summary", children: [
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
      Q,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l($t, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function _i({
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
  const { meta: u } = lt(), d = xi(t == null ? void 0 : t.type), m = d.includes(e.operator) ? e.operator : d[0], h = !$r.has(m), f = y.useId(), g = y.useId(), v = y.useId(), k = y.useId(), w = y.useId(), C = y.useId();
  y.useEffect(() => {
    m !== e.operator && o({ operator: m });
  }, [e.operator, o, m]);
  const A = (N) => {
    const M = Oe(u, N);
    o({ member: N, operator: xi(M == null ? void 0 : M.type)[0], values: [] });
  };
  return /* @__PURE__ */ b("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ b("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ b("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ b(Q, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(Pt, { className: "cv-ec-icon" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ l(
          Q,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--7",
            disabled: i,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ l($t, { className: "cv-ec-icon" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: f, className: "cv-ec-label", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ l(
          Fa,
          {
            well: _g,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: A,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ b(
              "button",
              {
                type: "button",
                id: g,
                disabled: i,
                "aria-labelledby": `${f} ${g}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ b("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(jr, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(it, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        As,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: A,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: v, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ b(
        _e,
        {
          value: m,
          onValueChange: (N) => o({
            operator: N,
            values: $r.has(N) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              De,
              {
                id: k,
                "aria-labelledby": `${v} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Ae, {})
              }
            ),
            /* @__PURE__ */ l(Le, { children: d.map((N) => /* @__PURE__ */ l(be, { value: N, children: bs[N] }, N)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: C, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Eg,
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
function Lg(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = bs[e.operator] ?? e.operator;
  if ($r.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (Se(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function Eg({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && Se(i[0]);
  if (t === "time") {
    const u = o ? i[0] : Fg(i);
    return /* @__PURE__ */ l(
      It,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (d) => n(d === void 0 ? [] : Se(d) ? [d] : Ig(d)),
        renderFixed: (d, m) => /* @__PURE__ */ l(Ia, { value: d, onChange: m })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !Se(u));
  return /* @__PURE__ */ l(
    It,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : Se(u) ? [u] : u),
      renderFixed: (u, d) => /* @__PURE__ */ l(
        ye,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (m) => d(Pg(m.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Fg(e) {
  const t = e.filter((n) => !Se(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Ig(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Pg(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function $g({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ b(Fe, { children: [
    /* @__PURE__ */ b(
      Ie,
      {
        className: _(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Fl, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ b(Pe, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ b("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(zg, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Ag, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function zg({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = lt(), a = Xp(r, n);
  if (a.length === 0) return null;
  const i = new Set(e.query.segments ?? []), o = (s) => {
    const c = new Set(i);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ b("div", { className: "cv-filter-segments", children: [
    /* @__PURE__ */ l("p", { className: "cv-filter-segments-heading", children: "Segments" }),
    /* @__PURE__ */ l("div", { className: "cv-filter-segments-list", children: a.map((s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o(s.name),
        title: s.description ?? s.name,
        className: _(
          "cv-segment-chip",
          i.has(s.name) && "cv-segment-chip--active"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function Vg(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function jg({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var m;
  const i = ((m = e.chart.axes) == null ? void 0 : m[n]) ?? {}, o = i.label ?? a ?? "", s = i.label === "", c = y.useId(), u = y.useId(), d = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ b("div", { className: _("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": d },
        value: o,
        placeholder: "No title",
        onChange: (h) => Vg(e, t, n, { label: h.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function Wg({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ b("div", { className: _("cv-legend-chrome", n && "cv-legend-chrome--hidden"), children: [
    /* @__PURE__ */ l("span", { className: "cv-legend-chrome-label", children: "Show legend" }),
    /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv-legend-chrome-toggle",
        children: [
          n ? /* @__PURE__ */ l(Il, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Pl, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Ps = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: _("cv-label", e),
      ...t
    }
  )
);
Ps.displayName = "Label";
function de({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: i,
  children: o
}) {
  return /* @__PURE__ */ b("div", { "data-slot": "field-row", className: _("cv-field-row", i), children: [
    /* @__PURE__ */ b("div", { className: "cv-field-row-header", children: [
      /* @__PURE__ */ l(Ps, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Br({
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
      className: _("cv-switch", i),
      children: /* @__PURE__ */ l("span", { className: "cv-switch-thumb" })
    }
  );
}
function rt({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: i
}) {
  const o = y.useId();
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "switch-row",
      className: _("cv-switch-row", i),
      children: [
        /* @__PURE__ */ b(
          "label",
          {
            htmlFor: o,
            className: _("cv-switch-row-label", a && "cv-switch-row-label--disabled"),
            children: [
              /* @__PURE__ */ l("span", { className: "cv-switch-row-title", children: e }),
              t ? /* @__PURE__ */ l("span", { className: "cv-switch-row-hint", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ l(Br, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Bg = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, Kg = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function qg({ spec: e, update: t }) {
  var w, C, A;
  const n = st(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((C = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : C.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", m = d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none", h = ((A = r.transform) == null ? void 0 : A.kind) ?? "none", f = ya(o) ? /* @__PURE__ */ b(pe, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Compare",
        hint: h === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ b(
          _e,
          {
            value: h,
            onValueChange: (N) => {
              var M;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((M = r.transform) == null ? void 0 : M.window) ?? vn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(De, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Ae, {}) }),
              /* @__PURE__ */ l(Le, { children: Kg.map((N) => /* @__PURE__ */ l(be, { value: N, children: Bg[N] }, N)) })
            ]
          }
        )
      }
    ),
    h === "rollingAvg" ? /* @__PURE__ */ l(Hg, { label: "Window (points)", children: (N) => {
      var M;
      return /* @__PURE__ */ l(
        ye,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((M = r.transform) == null ? void 0 : M.window) ?? vn,
          onChange: (E) => {
            const O = parseInt(E.target.value, 10), z = Number.isFinite(O) ? Math.min(90, Math.max(2, O)) : vn;
            s({ transform: { kind: "rollingAvg", window: z } });
          }
        }
      );
    } }) : null
  ] }) : null, g = /* @__PURE__ */ l(de, { label: "Line shape", children: /* @__PURE__ */ l(
    Ot,
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
  ) }), v = /* @__PURE__ */ l(de, { label: "Stacked", children: /* @__PURE__ */ l(
    Ot,
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
        return /* @__PURE__ */ b(pe, { children: [
          /* @__PURE__ */ l(
            rt,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (E) => s({ orientation: E ? "horizontal" : "vertical" })
            }
          ),
          v
        ] });
      // Point markers stay per-measure (the field-pill popover) — each series has its
      // own dot mark, so that one genuinely applies per series.
      case "line":
        return g;
      case "area":
        return /* @__PURE__ */ b(pe, { children: [
          g,
          v,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((M = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : M.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ b(pe, { children: [
          /* @__PURE__ */ l(
            rt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (E) => c({ innerRadiusPct: E ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(de, { label: "Slice labels", children: /* @__PURE__ */ l(
            Ot,
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
              onChange: (E) => c({ showLabels: E })
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
  return /* @__PURE__ */ b("div", { className: "cv-customize", children: [
    k,
    f
  ] });
}
function Ug(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ya(n);
}
function Hg({
  label: e,
  children: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ b("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function $s(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function zs(e, t) {
  const n = [...t], r = [], a = [];
  for (const i of e) {
    if (!je(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      we(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function Gg(e) {
  let t = 0;
  for (const n of e)
    je(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Yg(e, t) {
  return e.some((n) => je(n) && n.cardinality === "many" && we(n, t));
}
const Qg = 0.35, Jg = 0.4, Xg = 0.3, Zg = 0.1;
function ev(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Xg : e.supportsCartesianAxes ? Zg : e.wells.some(
    (a) => je(a) && a.channel === "x" && we(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Vs(e) {
  const t = e.filter(je);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function tv(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const nv = (e, t, n) => e === 1 ? t : n;
function rv(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${tv(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${nv(r, "measure", "measures")}`;
  return Vs(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function av(e, t) {
  const n = $s(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = zs(s, n), u = Gg(s), d = Math.max(0, n.length - c.matched.length), m = cg(s, r) + 0.5 * d, h = u > 0 ? m / u : 0, f = c.leftover.filter(
      (v) => v.kind !== "time" && !Yg(s, v.kind)
    ).length, g = h - Qg * f + ev(o, a) - (Vs(s) ? Jg : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(g * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: rv(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function iv(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function ov(e, t, n) {
  const r = e.require(n), a = zs(r.wells, $s(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = St(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function js(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(mg(e, r, n));
  };
}
function sv({ spec: e, update: t, empty: n }) {
  const r = st(), a = e.chart.family, i = js(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ b("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(Ws, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function lv({ spec: e, update: t }) {
  const n = st(), r = e.chart.family, a = js(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ b(Fe, { children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        className: "cv-type-pill",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ l(o, { className: "cv-ec-icon cv-ec-icon--muted" }),
          i.label,
          /* @__PURE__ */ l(it, { className: "cv-ec-icon--sm cv-ec-icon--muted" })
        ]
      }
    ) }),
    /* @__PURE__ */ b(Pe, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(Ws, { spec: e, family: r, onPick: a, families: n }),
      Ug(r, n) ? /* @__PURE__ */ b("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(qg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Ws({ spec: e, family: t, onPick: n, families: r }) {
  const a = y.useMemo(() => av(r, e), [r, e]), i = y.useMemo(() => iv(a), [a]), o = y.useMemo(
    () => new Map(a.map((m) => [m.family, m])),
    [a]
  ), s = y.useMemo(
    () => new Set(a.filter((m) => m.fits).map((m) => m.family)),
    [a]
  ), c = dv(e, r, s), u = (m, h) => /* @__PURE__ */ l(
    cv,
    {
      fit: m,
      active: m.family === t,
      preview: c.get(m.family),
      families: r,
      reason: h ? m.reason : void 0,
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
  return /* @__PURE__ */ b("div", { className: "cv-type-picker", children: [
    i.length > 0 ? /* @__PURE__ */ b("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Suggested for your fields" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: i.map((m) => u(m, !0)) })
    ] }) : null,
    /* @__PURE__ */ b("div", { className: "cv-type-popover-section", children: [
      /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: i.length > 0 ? "All types" : "Chart type" }),
      /* @__PURE__ */ l("div", { className: "cv-type-grid cv-type-grid--preview", children: d.map((m) => u(m, !1)) })
    ] })
  ] });
}
function cv({
  fit: e,
  active: t,
  preview: n,
  families: r,
  reason: a,
  onPick: i
}) {
  const o = e.descriptor.icon, s = e.descriptor.label;
  return /* @__PURE__ */ b(
    "div",
    {
      className: _("cv-type-tile", "cv-type-tile--card", t && "cv-type-tile--active"),
      "data-family": e.family,
      children: [
        /* @__PURE__ */ l("div", { className: "cv-type-tile-figure", children: n ? /* @__PURE__ */ l(
          wv,
          {
            preview: n,
            families: r,
            fallback: /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" })
          },
          n.key
        ) : /* @__PURE__ */ l(o, { className: "cv-ec-icon--lg" }) }),
        /* @__PURE__ */ b("span", { className: "cv-type-tile-caption", children: [
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
function Bs(e, t) {
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
function uv(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const Ai = 200, mv = () => () => {
};
function dv(e, t, n) {
  const r = e.query, a = uv(r), i = y.useMemo(() => {
    const h = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof h == "number" ? Math.min(h, Ai) : Ai
    };
  }, [r]), o = mn(), s = y.useRef(null);
  s.current === null && (s.current = jo());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, d = y.useSyncExternalStore(
    o ? o.store.subscribe : mv,
    u,
    u
  ), { resultSet: m } = Uo(d, { skip: !a });
  return y.useMemo(() => {
    const h = /* @__PURE__ */ new Map();
    for (const f of t.list()) {
      const g = f.family;
      if (f.queryless || a && n.has(g) && !m) continue;
      const w = (m && n.has(g) ? fv(e, g, t, m, d) : void 0) ?? kv(g, t);
      w && h.set(g, w);
    }
    return h;
  }, [e, t, m, d, n, a]);
}
function fv(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : ov(n, e, t), o = Bs(i.chart, n), s = Po(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const wt = "sample.category", sn = "sample.group", Ne = "sample.value", Ee = "sample.count", Ks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Kr = [18, 27, 21, 34, 26, 39], qr = [12, 9, 17, 14, 22, 16], hv = Ks.flatMap((e, t) => [
  { [wt]: e, [sn]: "North", [Ne]: Kr[t], [Ee]: qr[t] },
  {
    [wt]: e,
    [sn]: "South",
    [Ne]: Math.round(Kr[t] * 0.62),
    [Ee]: Math.round(qr[t] * 0.78)
  }
]), pv = {
  measures: [Ne, Ee],
  dimensions: [wt, sn]
}, gv = {
  measures: {
    [Ne]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ee]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [wt]: { title: "Day", shortTitle: "Day", type: "string" },
    [sn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function qs(e) {
  const t = [
    { key: Ne, label: "Value", data: Kr, colorToken: "chart-1" },
    { key: Ee, label: "Count", data: qr, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: Ks,
    series: t,
    raw: { rows: hv, query: pv, annotation: gv },
    empty: !1
  };
}
const vv = qs(1), bv = qs(2), Ht = (e, t) => ({
  family: e,
  mapping: { category: { member: wt }, series: { mode: "measures", members: t } }
}), yv = {
  bar: Ht("bar", [Ne, Ee]),
  line: Ht("line", [Ne, Ee]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: Ht("area", [Ne, Ee]),
  pie: Ht("pie", [Ne]),
  scatter: { family: "scatter", familyOptions: { x: Ne, y: Ee } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: wt },
      series: { mode: "pivot", value: Ne, pivot: sn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ne, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: wt }, { member: Ne }, { member: Ee }] }
  }
};
function kv(e, t) {
  const n = yv[e] ?? Ht(e, [Ne, Ee]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? vv : bv,
    options: Bs(n, t)
  };
}
const wv = y.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = y.useRef(null);
  return y.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(Cv, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Fo,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Cv extends y.Component {
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
function Nv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Sv(e, t, n, r, a, i) {
  var q, H, J, B, G;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : xv(a), d = o.familyOptions ?? {}, m = Array.isArray(d.columns) ? d.columns : [], h = Ns(o), f = h[r], g = c === "table" && n.id === "columns", v = c === "bar" || c === "line" || c === "area", k = ((H = (q = o.mapping) == null ? void 0 : q.series) == null ? void 0 : H.mode) === "measures", w = v && n.id === "y", C = w && k, A = g ? (J = m.find((K) => K.member === r)) == null ? void 0 : J.label : C ? f == null ? void 0 : f.label : void 0, N = C ? f == null ? void 0 : f.colorToken : void 0, M = fn(s), E = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, O = E ? M == null ? void 0 : M.granularity : void 0, z = E ? M == null ? void 0 : M.dateRange : void 0, j = (c === "line" || c === "area") && n.id === "y" && k, T = j ? f == null ? void 0 : f.dots : void 0, D = (K) => {
    var he, ke;
    if ((he = o.mapping) != null && he.series && o.mapping.series.mode !== "measures") return;
    const ie = ((ke = o.mapping) != null && ke.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ce = { ...h };
    K && Object.keys(K).length > 0 ? ce[r] = K : delete ce[r];
    const Re = dn(o);
    Re && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Re }, series: Ss(ie, ce) }
      }
    });
  }, P = (K) => {
    const ie = m.map((ce) => ce.member === r ? { ...ce, ...K } : ce);
    t({ ...e, chart: { ...o, familyOptions: { ...d, columns: ie } } });
  }, F = (K) => {
    g ? P({ label: K }) : C && D({ ...f, label: K });
  }, U = (K) => {
    C && D({ ...f, colorToken: K ?? void 0 });
  }, $ = (K) => {
    if (!M) return;
    const ie = { ...M };
    for (const ce of Object.keys(K)) {
      const Re = K[ce];
      Re === void 0 ? delete ie[ce] : ie[ce] = Re;
    }
    t({ ...e, query: { ...s, timeDimensions: [ie] } });
  }, I = (K) => $({ granularity: K }), Y = (K) => $({ dateRange: K }), Z = (K) => {
    C && D({ ...f, dots: K });
  }, te = () => t(Ts(e, c, n.id, r, i)), se = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), ue = (B = o.mapping) == null ? void 0 : B.series, le = (ue && ue.mode === "pivot" ? ue.value : zr(o)[0]) ?? ((G = s.measures) == null ? void 0 : G[0]), fe = se ? u === "time" ? [
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
    const K = Nv(s.order)[0];
    if (!K) return "none";
    const [ie, ce] = K;
    return le && ie === le ? ce === "desc" ? "value-desc" : "value-asc" : ie === r ? u === "time" ? ce === "desc" ? "time-desc" : "time-asc" : ce === "asc" ? "label-asc" : "label-desc" : "none";
  })(), V = (K) => {
    let ie;
    switch (K) {
      case "none":
        ie = void 0;
        break;
      case "value-desc":
        ie = le ? [[le, "desc"]] : void 0;
        break;
      case "value-asc":
        ie = le ? [[le, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ie = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ie = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ie } });
  }, ee = typeof s.limit == "number" ? s.limit : void 0, oe = (K) => t({ ...e, query: { ...s, limit: K && K > 0 ? K : void 0 } }), x = (c === "bar" || c === "line" || c === "area") && E, S = x && d.comparePrevious === !0;
  return {
    kind: u,
    label: A,
    colorToken: N,
    granularity: O,
    dateRange: z,
    dots: T,
    canPoints: j,
    canRename: g || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: E,
    isCategoryField: se,
    sortValue: ge,
    sortOptions: fe,
    onSort: V,
    limit: ee,
    onLimit: oe,
    canComparePrevious: x,
    comparePrevious: S,
    comparePreviousReady: x && z !== void 0,
    onComparePrevious: (K) => t({ ...e, chart: { ...o, familyOptions: { ...d, comparePrevious: K || void 0 } } }),
    onRename: F,
    onRecolor: U,
    onGranularity: I,
    onDateRange: Y,
    onDots: Z,
    onRemove: te
  };
}
function xv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ur(e, t, n, r) {
  var m;
  const { chart: a, query: i } = e, o = a.family, s = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const f = h.slice(), [g] = f.splice(n, 1);
    return f.splice(r, 0, g), f;
  };
  if (o === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, f = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: f } } };
  }
  const c = s(i.measures ?? []), u = (m = a.mapping) == null ? void 0 : m.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    d = { ...a.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: d } };
}
function Mv(e, t) {
  return e.allowedCubes.includes(t);
}
function Tv(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const a = e.get(r.shift());
    for (const i of (a == null ? void 0 : a.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function Us(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function Hr(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = Tv(e, n);
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
function Rv(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    Hr(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function Di(e, t, n, r) {
  var N;
  const a = Zn(e), i = a.filter((M) => M.type === "view"), o = en(t, r), s = Object.values(o).flat();
  let c;
  for (const M of s) {
    const E = Oe(e, M);
    if (E) {
      c = E;
      break;
    }
  }
  const u = !c && n ? vt(e, n) : void 0, d = c ? vt(e, c.cube) : u, m = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, h = t.query.measures ?? [], f = h.length ? xt(h[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: i, measureSource: f, allowedCubes: [m] };
  const g = f ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), v = g ? vt(e, g) : void 0, k = Us(a), w = /* @__PURE__ */ new Set();
  for (const M of s) {
    const E = (N = Oe(e, M)) == null ? void 0 : N.cube;
    E && k.has(E) && w.add(E);
  }
  f && k.has(f) && w.add(f), !w.size && g && k.has(g) && w.add(g);
  const C = Rv(k, w), A = C.filter((M) => M !== g).map((M) => k.get(M)).sort((M, E) => M.title.localeCompare(E.title));
  return {
    sourceCube: (v == null ? void 0 : v.type) === "cube" ? v : void 0,
    relatedCubes: A,
    views: i,
    measureSource: f,
    allowedCubes: C
  };
}
function Ov(e, t, n) {
  if (!t) return e;
  const r = Us(Zn(t)), a = e.query ?? {}, i = new Set(Object.values(en(e, n)).flat()), o = (v) => {
    const k = xt(v);
    return k !== void 0 && r.has(k) ? k : void 0;
  }, s = /* @__PURE__ */ new Set();
  for (const v of [...a.measures ?? [], ...a.dimensions ?? []]) {
    const k = o(v);
    k && s.add(k);
  }
  const c = a.timeDimensions ?? [];
  for (const v of c) {
    const k = o(v.dimension);
    k && s.add(k);
  }
  if (Hr(r, s)) return e;
  const u = (a.measures ?? []).map(o).find((v) => v !== void 0) ?? [...i].map((v) => {
    var k;
    return (k = Oe(t, v)) == null ? void 0 : k.cube;
  }).find((v) => v !== void 0 && r.has(v));
  if (!u) return e;
  const d = /* @__PURE__ */ new Set([u]), m = (v) => Hr(r, /* @__PURE__ */ new Set([...d, v])) && (d.add(v), !0), h = [];
  for (const v of c) {
    const k = o(v.dimension);
    if (k && m(k)) {
      h.push(v);
      continue;
    }
    if (i.has(v.dimension))
      h.push(v);
    else {
      const w = ps(t, u);
      w && !h.some((C) => C.dimension === w.name) && h.push({ ...v, dimension: w.name });
    }
  }
  const f = (v) => {
    if (i.has(v)) return !0;
    const k = o(v);
    return k !== void 0 && m(k);
  }, g = {
    ...a,
    measures: (a.measures ?? []).filter(f),
    dimensions: (a.dimensions ?? []).filter(f),
    timeDimensions: h
  };
  return { ...e, query: g };
}
class er extends y.Component {
  constructor() {
    super(...arguments);
    tr(this, "state", { error: null, resetKey: this.props.resetKey });
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
    return n ? /* @__PURE__ */ b("div", { className: "cv-ed-broken", role: "alert", children: [
      /* @__PURE__ */ l($l, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
      /* @__PURE__ */ b("div", { children: [
        /* @__PURE__ */ b("strong", { className: "cv-ed-broken-title", children: [
          this.props.label,
          " couldn’t be shown"
        ] }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-msg", children: n.message }),
        /* @__PURE__ */ l("p", { className: "cv-ed-broken-hint", children: "The rest of the chart is still editable — undo the last change to this control, or clear the value it holds." })
      ] })
    ] }) : this.props.children;
  }
}
const _v = tt.options;
function Av({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: _("cv-color-picker", a),
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
            className: _(
              "cv-color-swatch cv-color-swatch--auto",
              e === void 0 && "cv-color-swatch--selected"
            ),
            children: "A"
          }
        ) : null,
        _v.map((i) => {
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
              className: _(
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
function Dv({
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
  const u = st(), d = Qn(), m = Sv(e, t, n, r, a, u), h = y.useId(), f = y.useId(), g = y.useId(), v = y.useId(), k = y.useId(), w = y.useId(), C = (a == null ? void 0 : a.label) ?? r, A = m.label || C, N = m.canColor && i !== void 0, M = m.canRename || N || m.isTimeField || m.isCategoryField || m.canPoints || s !== void 0, E = (T) => {
    const D = T.trim();
    m.onRename(D.length > 0 ? D : void 0);
  }, O = (T) => {
    !o || !T.altKey || (T.key === "ArrowUp" && o.index > 0 ? (T.preventDefault(), o.onMove(-1)) : T.key === "ArrowDown" && o.index < o.total - 1 && (T.preventDefault(), o.onMove(1)));
  }, z = /* @__PURE__ */ b(pe, { children: [
    o ? /* @__PURE__ */ l(zl, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
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
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ra(a, d) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: A })
  ] }), j = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "field-pill",
      className: _("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", c),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (T) => {
        T.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? O : void 0,
      children: [
        M ? /* @__PURE__ */ b(Fe, { children: [
          /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${A}${j}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: z
            }
          ) }),
          /* @__PURE__ */ l(Pe, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ b("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(Lv, { getSwap: s, display: A }) : null,
            m.canRename ? /* @__PURE__ */ b("label", { className: "cv-ec-field", htmlFor: h, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                ye,
                {
                  id: h,
                  defaultValue: m.label ?? "",
                  placeholder: C,
                  className: "cv-ec-h8",
                  onBlur: (T) => E(T.target.value),
                  onKeyDown: (T) => {
                    T.key === "Enter" && (E(T.target.value), T.target.blur());
                  }
                }
              )
            ] }) : null,
            N ? /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(Av, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ b(pe, { children: [
              /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  It,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (T, D) => /* @__PURE__ */ l(Ia, { value: T, onChange: D })
                  }
                )
              ] }),
              /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  It,
                  {
                    kind: "granularity",
                    value: m.granularity,
                    onChange: m.onGranularity,
                    renderFixed: (T, D) => /* @__PURE__ */ l(
                      fs,
                      {
                        value: T,
                        onChange: D,
                        allowAuto: !0,
                        autoHint: wa(m.dateRange),
                        options: zo(m.dateRange),
                        className: "cv-ec-h8 cv-ec-full"
                      }
                    )
                  }
                )
              ] }),
              m.canComparePrevious ? /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
                /* @__PURE__ */ b("label", { className: "cv-ec-row", htmlFor: k, children: [
                  /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Compare to previous period" }),
                  /* @__PURE__ */ l(
                    Br,
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
            m.isCategoryField ? /* @__PURE__ */ b(pe, { children: [
              /* @__PURE__ */ b("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: f, children: [
                /* @__PURE__ */ l("span", { id: g, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: f,
                    "aria-labelledby": g,
                    value: m.sortValue,
                    onChange: (T) => m.onSort(T.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((T) => /* @__PURE__ */ l("option", { value: T.key, children: T.label }, T.key))
                  }
                )
              ] }),
              /* @__PURE__ */ b("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: v, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  ye,
                  {
                    id: v,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (T) => {
                      const D = T.target.value.trim();
                      m.onLimit(D === "" ? void 0 : Number(D));
                    },
                    onKeyDown: (T) => {
                      if (T.key === "Enter") {
                        const D = T.target.value.trim();
                        m.onLimit(D === "" ? void 0 : Number(D)), T.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ b("label", { className: "cv-ec-row", htmlFor: w, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Br, { id: w, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ b(
              Q,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: m.onRemove,
                children: [
                  /* @__PURE__ */ l(Ba, { className: "cv-ec-icon" }),
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
              title: `${A}${j}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${A}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: z
            }
          )
        ),
        /* @__PURE__ */ l(
          Q,
          {
            variant: "ghost",
            size: "icon",
            className: "cv-ec-remove cv-ec-remove--6",
            onClick: m.onRemove,
            "aria-label": `Remove ${A}`,
            children: /* @__PURE__ */ l(Ba, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function Lv({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ b(pe, { children: [
    n.agg ? /* @__PURE__ */ b("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(Os, { options: n.agg.options, className: "cv-field-pill-aggseg" })
    ] }) : null,
    /* @__PURE__ */ l(
      Fa,
      {
        well: n.picker.well,
        placed: n.picker.placed,
        inWell: n.picker.inWell,
        scope: n.picker.scope,
        blockReason: n.picker.blockReason,
        onSelect: n.picker.onSelect,
        side: "right",
        align: "start",
        children: /* @__PURE__ */ b("button", { type: "button", className: "cv-field-pill-swap", title: `Swap ${t} for another field`, children: [
          /* @__PURE__ */ l(Vl, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function Ev({
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
  orientation: h,
  lockedSingle: f,
  disableReorder: g,
  label: v,
  note: k,
  pickerSide: w,
  pickerAlign: C,
  control: A
}) {
  const N = n.cardinality === "many" && !f, M = N || r.length === 0, E = r.length, O = h === "vertical", z = v ?? n.label, j = N && E > 1 && !g, [T, D] = y.useState(null), P = ["number", "category", "time"].filter(($) => !we(n, $)).map(($) => Oa(n, $, r)).find(($) => $ !== void 0) ?? n.hint, F = a.length === 0 && !n.optional && we(n, "number") ? "Pick a number to get started" : void 0, U = /* @__PURE__ */ l(
    Fa,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: w ?? (O ? "right" : "top"),
      align: C ?? "start",
      children: /* @__PURE__ */ b(
        "button",
        {
          type: "button",
          title: P,
          className: _(
            "cv-well-add",
            O && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(_t, { className: "cv-ec-icon" }),
            r.length === 0 ? z : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "well-group",
      className: _("cv-well-group", !O && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ b("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: z }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        A ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: A }) : null,
        /* @__PURE__ */ l(er, { label: z, resetKey: e, children: /* @__PURE__ */ b("div", { className: _("cv-well-fields", O ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map(($, I) => /* @__PURE__ */ l(
            Dv,
            {
              spec: e,
              update: t,
              well: n,
              member: $,
              option: i($),
              resolvedColor: o($),
              getSwap: d ? () => d($) : void 0,
              className: O ? "cv-field-pill--full" : void 0,
              reorder: j ? {
                index: I,
                total: E,
                dragging: T === I,
                onDragStart: () => D(I),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  T === null || T === I || (t(Ur(e, n, T, I)), D(I));
                },
                onDragEnd: () => D(null),
                onMove: (Y) => t(Ur(e, n, I, I + Y))
              } : void 0
            },
            $
          )),
          M ? U : null
        ] }) }),
        F ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: F }) : null,
        k ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: k }) : null
      ]
    }
  );
}
function hr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ b(Fe, { children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(
      "button",
      {
        type: "button",
        className: "cv-kpi-section-trigger",
        title: e,
        children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: e }),
          /* @__PURE__ */ b("span", { className: "cv-kpi-section-state", children: [
            t ? /* @__PURE__ */ l("span", { className: "cv-kpi-section-summary", children: t }) : null,
            /* @__PURE__ */ l(it, { className: "cv-ec-icon" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Pe, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(er, { label: e, children: n }) })
  ] });
}
function Pa(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Fv({ spec: e, update: t }) {
  var d;
  const { fo: n, setFO: r } = Pa(e, t), a = Cs(e), i = (d = e.query.timeDimensions) == null ? void 0 : d[0], o = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (m) => {
    const h = i ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!h) return;
    const f = { ...h };
    for (const g of Object.keys(m)) {
      const v = m[g];
      v === void 0 ? delete f[g] : f[g] = v;
    }
    delete f.granularity, t({ ...e, query: { ...e.query, timeDimensions: [f] } });
  };
  return /* @__PURE__ */ b("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(tn, { label: "Time field", children: ({ id: m }) => /* @__PURE__ */ l(
      As,
      {
        id: m,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (h) => u({ dimension: h }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(tn, { label: "Date range", children: ({ labelId: m }) => /* @__PURE__ */ l(
      It,
      {
        labelId: m,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (h) => u({ dateRange: h }),
        renderFixed: (h, f) => /* @__PURE__ */ l(Ia, { value: h, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ l(de, { label: "Display", children: /* @__PURE__ */ l(
      Ot,
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
      rt,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (m) => r({ goodDirection: m ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(tn, { label: "Gauge max", children: ({ id: m }) => /* @__PURE__ */ l(
      ye,
      {
        id: m,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (h) => {
          const f = parseFloat(h.target.value);
          r({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Iv({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Pa(e, t), a = n.comparison, i = a !== void 0, o = y.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ b("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(de, { label: "Compare to", children: /* @__PURE__ */ l(
      Ot,
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
    i ? /* @__PURE__ */ b(pe, { children: [
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(tn, { label: "Baseline value", children: ({ id: d }) => /* @__PURE__ */ l(
        ye,
        {
          id: d,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const h = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(h) ? h : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ b("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(qi, { className: "cv-kpi-warn-icon" }),
        /* @__PURE__ */ b("span", { children: [
          /* @__PURE__ */ l("strong", { children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ l(
        rt,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      )
    ] }) : null
  ] });
}
function Pv({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Pa(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = zo((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ b("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(tn, { label: "Trend", children: ({ id: d, labelId: m }) => /* @__PURE__ */ l(
      It,
      {
        labelId: m,
        kind: "granularity",
        value: o,
        onChange: (h) => r({
          sparkline: h === void 0 ? void 0 : { ...a, granularity: h }
        }),
        renderFixed: (h, f) => /* @__PURE__ */ l(
          fs,
          {
            id: d,
            value: h,
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
function tn({
  label: e,
  children: t
}) {
  const n = y.useId(), r = y.useId();
  return /* @__PURE__ */ b("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function $v({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var V, ee, oe;
  const { meta: a } = lt(), i = st(), o = y.useCallback(
    (L) => t(Ov(L, a, i)),
    [t, a, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), d = u.queryless ?? !1, m = u.enforcesAxisUnit, h = Cs(e), f = Qn(), g = y.useMemo(() => fg(c, i), [c, i]), v = y.useMemo(() => en(e, i), [e, i]), k = y.useMemo(() => new Map(g.map((L) => [L.id, L])), [g]), w = y.useMemo(
    () => Di(a, e, void 0, i),
    [a, e, i]
  ), C = y.useMemo(() => Object.values(v).flat(), [v]), A = y.useMemo(
    () => {
      var L;
      return w.viewLocked ? [w.viewLocked] : [(L = w.sourceCube) == null ? void 0 : L.name, ...w.relatedCubes.map((x) => x.name)].filter(
        Boolean
      );
    },
    [w]
  ), N = y.useMemo(
    () => Object.values(v).every((L) => L.length === 0),
    [v]
  ), M = y.useCallback(
    (L) => {
      const x = (L.y ?? [])[0], S = x ? Oe(a, x) : void 0;
      return {
        leftKey: x ? xs(S) : void 0,
        leftLabel: x ? zv(S, f(S == null ? void 0 : S.unit)) : void 0
      };
    },
    [a, f]
  ), E = y.useMemo(() => M(v), [M, v]), O = y.useCallback(
    (L, x) => (S, R) => {
      var W;
      if (R) {
        if (!Mv(L, R.cube))
          return "Clear the current fields to use a different dataset.";
        if (R.memberType === "measure" && L.measureSource && R.cube !== L.measureSource)
          return `This chart's numbers come from ${((W = L.sourceCube) == null ? void 0 : W.title) ?? L.measureSource}. Remove them to use another table.`;
        if (m && S === "y" && R.memberType === "measure")
          return bg(R, x.leftKey, x.leftLabel);
      }
    },
    [m]
  ), z = y.useMemo(
    () => O(w, E),
    [O, w, E]
  ), j = E.leftLabel, T = y.useMemo(() => {
    var x;
    const L = {};
    if (c === "bar" || c === "line" || c === "area") {
      const S = (x = s.mapping) == null ? void 0 : x.series;
      if (S && S.mode === "measures") {
        const R = S.members.map((q) => {
          var H, J;
          return { key: q, colorToken: (J = (H = S.meta) == null ? void 0 : H[q]) == null ? void 0 : J.colorToken };
        }), W = Io(R, s.colors);
        S.members.forEach((q, H) => {
          L[q] = W[H];
        });
      }
    }
    return L;
  }, [c, s.mapping, s.colors]), D = y.useCallback(
    (L, x, S) => {
      const R = Oe(a, x);
      if (z(L, R)) return;
      let W = S === "geoPoint" && (R != null && R.latMember) && R.lngMember ? St(
        St(e, c, "lat", R.latMember, "numberDimension", i),
        c,
        "lng",
        R.lngMember,
        "numberDimension",
        i
      ) : St(e, c, L, x, S, i);
      const q = u.canonicalTimeWell;
      if (q && L !== q && (v[q] ?? []).length === 0) {
        const H = ps(a, R == null ? void 0 : R.cube);
        H && H.name !== x && !z(q, H) && (W = St(W, c, q, H.name, "time", i));
      }
      o(W);
    },
    [z, a, o, e, c, i, u, v]
  ), P = y.useCallback(
    (L, x) => {
      if (d) return;
      const S = k.get(L), R = Oe(a, x);
      if (!S || !R) return;
      const W = (v[L] ?? []).indexOf(x), q = Ts(e, c, L, x, i), H = en(q, i), J = Di(a, q, void 0, i), B = O(J, M(H)), G = H[L] ?? [], K = Object.values(H).flat(), ie = (he, ke) => {
        if (he === x) return;
        let We = St(q, c, L, he, ke, i);
        const $a = (en(We, i)[L] ?? []).indexOf(he);
        W >= 0 && $a > W && (We = Ur(We, S, $a, W)), o(We);
      }, ce = Yp(a, R), Re = ce.length > 1 ? {
        options: ce.map((he) => {
          const ke = he.memberType === "measure" ? "number" : "numberDimension", We = he.name === x ? void 0 : Ds(S, ke, G, he, (hn) => B(L, hn));
          return {
            label: _s(he, vt(a, he.cube)),
            selected: he.name === x,
            disabled: We !== void 0,
            title: We,
            onSelect: () => ie(he.name, ke)
          };
        })
      } : void 0;
      return {
        picker: {
          well: S,
          placed: K,
          inWell: G,
          scope: J,
          blockReason: (he) => B(L, he),
          onSelect: ie
        },
        agg: Re
      };
    },
    [d, k, a, v, e, c, i, O, M, o]
  ), F = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, U = F.left.map((L) => k.get(L)).filter(Boolean), $ = F.bottom.map((L) => k.get(L)).filter(Boolean), I = (V = v.color) == null ? void 0 : V[0], Y = ((ee = v.y) == null ? void 0 : ee.length) ?? 0, Z = I && Y > 1 ? `${Y} values × ${((oe = Oe(a, I)) == null ? void 0 : oe.label) ?? "this split"} — one series per value per group.` : void 0, te = u.hasLegend, se = (v.y ?? [])[0], ue = (L) => {
    var R, W, q, H;
    if (!L) return;
    const x = (R = s.mapping) == null ? void 0 : R.series;
    return (x && x.mode === "measures" ? (q = (W = x.meta) == null ? void 0 : W[L]) == null ? void 0 : q.label : void 0) ?? ((H = Oe(a, L)) == null ? void 0 : H.label);
  }, le = (L) => {
    var S, R, W, q;
    const x = (H, J) => J ? /* @__PURE__ */ l(jg, { spec: e, update: o, axis: H, title: "Title", auto: ue(J) }) : null;
    switch (L) {
      case "y":
        return x("y", se);
      // the single value axis
      case "x":
        return x("x", (R = (S = s.mapping) == null ? void 0 : S.category) == null ? void 0 : R.member);
      case "sy":
        return x("y", (W = v.sy) == null ? void 0 : W[0]);
      // scatter Y axis
      case "sx":
        return x("x", (q = v.sx) == null ? void 0 : q[0]);
      // scatter X axis
      default:
        return null;
    }
  }, fe = (L, x) => /* @__PURE__ */ l(
    Ev,
    {
      spec: e,
      update: o,
      well: L,
      placed: v[L.id] ?? [],
      allPlaced: C,
      optionFor: (S) => Oe(a, S),
      colorFor: (S) => T[S],
      scope: w,
      blockReason: (S) => z(L.id, S),
      onAdd: (S, R) => D(L.id, S, R),
      swapFor: (S) => P(L.id, S),
      badge: L.id === "y" ? j : void 0,
      orientation: x,
      note: L.id === "color" ? Z : void 0,
      control: le(L.id)
    },
    L.id
  ), ge = () => {
    var R;
    const L = k.get("value"), x = (v.value ?? []).length > 0, S = s.familyOptions ?? {};
    return /* @__PURE__ */ b(pe, { children: [
      /* @__PURE__ */ b("div", { className: "cv-edit-kpi-value", children: [
        L ? fe(L, "vertical") : null,
        x ? /* @__PURE__ */ l(
          hr,
          {
            label: "Time, range & display",
            summary: S.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Fv, { spec: e, update: o })
          }
        ) : null
      ] }),
      x ? /* @__PURE__ */ b(pe, { children: [
        /* @__PURE__ */ l(
          hr,
          {
            label: "Comparison",
            summary: S.comparison === void 0 ? "None" : S.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(Iv, { spec: e, update: o })
          }
        ),
        /* @__PURE__ */ l(
          hr,
          {
            label: "Trend",
            summary: zp(
              (R = S.sparkline) == null ? void 0 : R.granularity
            ),
            children: /* @__PURE__ */ l(Pv, { spec: e, update: o })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ b("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ b("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !N || d ? /* @__PURE__ */ l(lv, { spec: e, update: o }) : null,
      /* @__PURE__ */ b("div", { className: "cv-edit-overlay-actions", children: [
        C.length > 0 && w.sourceCube ? /* @__PURE__ */ b(
          "span",
          {
            className: "cv-edit-anchor",
            title: w.sourceCube.grain ?? w.sourceCube.title,
            children: [
              /* @__PURE__ */ l(Yi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: w.sourceCube.title }),
              w.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: w.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l($g, { spec: e, update: o, cube: h, scopeCubes: A, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ b("div", { className: "cv-edit-overlay-body", children: [
      U.length > 0 ? /* @__PURE__ */ l("div", { className: _("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ge() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        U.map((L) => fe(L, "vertical"))
      ) }) : null,
      /* @__PURE__ */ b("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ b("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(sv, { spec: e, update: o, empty: N && !d })
        ] }),
        $.length > 0 ? /* @__PURE__ */ b("div", { className: "cv-edit-overlay-bottom", children: [
          $.map((L) => fe(L, "horizontal")),
          te && !N ? /* @__PURE__ */ l(Wg, { spec: e, update: o }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function zv(e, t) {
  const n = Ms(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Hs(e, t) {
  const n = y.useRef(e);
  y.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = y.useRef(null), a = y.useRef(null);
  return y.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, a.current !== null && (n.current(...a.current), a.current = null));
    },
    []
  ), y.useCallback(
    (...i) => {
      r.current !== null && clearTimeout(r.current), a.current = i, r.current = setTimeout(() => {
        r.current = null, a.current = null, n.current(...i);
      }, t);
    },
    [t]
  );
}
function pr(e) {
  const t = co.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Vv({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = y.useState(() => ({
    spec: e,
    issues: pr(e)
  })), [i, o] = y.useState(e);
  y.useEffect(() => {
    a({ spec: e, issues: pr(e) }), o(e);
  }, [e]);
  const s = Hs((h) => t(h), n), c = r.spec, u = r.issues, d = u.length === 0, m = y.useCallback(
    (h) => {
      const f = pr(h);
      a({ spec: h, issues: f }), f.length === 0 && (o(h), s(h));
    },
    [s]
  );
  return { draft: c, issues: u, valid: d, committed: i, update: m };
}
const jv = () => {
};
function Wv({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = st(), { draft: s, issues: c, valid: u, committed: d, update: m } = Vv({
    spec: e,
    onChange: t ?? jv,
    debounceMs: r
  }), h = o.get(s.chart.family), f = (h == null ? void 0 : h.queryless) ?? !1, g = d, v = (O) => {
    var z, j, T;
    return (((z = O == null ? void 0 : O.measures) == null ? void 0 : z.length) ?? 0) > 0 || (((j = O == null ? void 0 : O.dimensions) == null ? void 0 : j.length) ?? 0) > 0 || (((T = O == null ? void 0 : O.timeDimensions) == null ? void 0 : T.some((D) => typeof D.granularity == "string")) ?? !1);
  }, k = (O) => {
    var z;
    return (((z = O == null ? void 0 : O.measures) == null ? void 0 : z.length) ?? 0) > 0;
  }, w = (h == null ? void 0 : h.requiresMeasure) ?? s.chart.family !== "table", C = f || v(s.query) && v(g.query) && (!w || k(s.query) && k(g.query)), A = w && !k(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = y.useCallback(
    (O) => {
      m({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...O }
        }
      });
    },
    [s, m]
  ), M = C ? /* @__PURE__ */ l(
    Sa,
    {
      query: g.query ?? {},
      chart: g.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: A }) }), E = n ? /* @__PURE__ */ b(Q, { size: "sm", disabled: !u, onClick: () => n(d), children: [
    /* @__PURE__ */ l(Xi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "chart-editor",
      className: _("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ b($n, { variant: "destructive", children: [
          /* @__PURE__ */ l(Zr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(zn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(Vn, { children: /* @__PURE__ */ b("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((O, z) => /* @__PURE__ */ b("li", { children: [
              O.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: O.path }) : null,
              " ",
              O.message
            ] }, z)),
            c.length > 3 ? /* @__PURE__ */ b("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(er, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l($v, { spec: s, update: m, toolbar: E, children: M }) }) })
      ]
    }
  );
}
function Bv({
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
  onSave: d,
  saveDisabled: m,
  className: h
}) {
  const f = a || i, [g, v] = y.useState(!1);
  y.useEffect(() => {
    if (!g) return;
    const w = setTimeout(() => v(!1), 1600);
    return () => clearTimeout(w);
  }, [g]), y.useEffect(() => {
    m || v(!1);
  }, [m]);
  const k = () => {
    d == null || d(), v(!0);
  };
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: _("cv-editor-toolbar", h),
      children: [
        /* @__PURE__ */ l(
          ye,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv-editor-toolbar-name"
          }
        ),
        /* @__PURE__ */ b("div", { className: "cv-editor-toolbar-group", children: [
          /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Ui, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(Ji, {}),
            " Text"
          ] }),
          /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(jl, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Wl, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ b("div", { className: "cv-editor-toolbar-actions", children: [
          f ? /* @__PURE__ */ b(pe, { children: [
            /* @__PURE__ */ l(
              Q,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(Bl, {})
              }
            ),
            /* @__PURE__ */ l(
              Q,
              {
                variant: "ghost",
                size: "icon",
                onClick: i,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ l(Kl, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ b(
            Q,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(ql, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ b(
            Q,
            {
              size: "sm",
              onClick: k,
              disabled: m,
              "aria-live": "polite",
              className: _(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                g && "cv-editor-toolbar-save--saved"
              ),
              children: [
                g ? /* @__PURE__ */ l(Pt, {}) : /* @__PURE__ */ l(Xi, {}),
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
const Gs = "lg", Ys = 12;
function Kv(e, t) {
  const n = t[Gs];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const o = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    o > a && (r = i, a = o);
  }
  return r ?? e;
}
function qv(e, t) {
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
const Uv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Hv(e, t, n, r = Ys) {
  const a = Uv[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function Qs(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Ys) {
  const a = Hv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Gv(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Qs(e, a);
}
function Yv(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Qv(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Jv = 12, Xv = 900, Zv = 0.4;
function eb(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function tb({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = Go(), u = e.grid ?? {}, d = u.cols ?? Jv, m = u.rowHeight ?? 40, h = u.margin ?? [12, 12], f = u.containerPadding ?? [0, 0], g = Math.max(Zv, Math.min(1, c / Xv)), v = Math.round(g / 0.05) * 0.05, k = Math.max(8, Math.round(m * v)), w = [
    Math.round(h[0] * v),
    Math.round(h[1] * v)
  ], C = [
    Math.round(f[0] * v),
    Math.round(f[1] * v)
  ], A = y.useMemo(
    () => ({ [Gs]: eb(e.layout) }),
    [e.layout]
  ), N = y.useMemo(
    () => new Map(e.widgets.map((j) => [j.id, j])),
    [e.widgets]
  ), M = y.useRef(o);
  y.useEffect(() => {
    M.current = o;
  }, [o]);
  const E = y.useRef(e.layout);
  y.useEffect(() => {
    E.current = e.layout;
  }, [e.layout]);
  const O = y.useRef(null), z = y.useCallback(
    (j, T) => {
      const P = Kv(j, T).map((F) => ({ ...F }));
      nb(E.current, P) || M.current(P);
    },
    []
  );
  return /* @__PURE__ */ l(Na, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    eo,
    {
      width: c,
      layouts: A,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: k,
      margin: w,
      containerPadding: C,
      dragConfig: { enabled: !0, handle: `.${Ln}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: z,
      children: e.layout.map((j) => {
        const T = N.get(j.i);
        if (!T) return null;
        const D = T.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ b(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${T.title ?? T.type}`,
              "aria-pressed": D,
              onPointerDown: (P) => {
                O.current = { x: P.clientX, y: P.clientY };
              },
              onClick: (P) => {
                const F = O.current;
                F && Math.hypot(P.clientX - F.x, P.clientY - F.y) > 5 || n(T.id);
              },
              onKeyDown: (P) => {
                (P.key === "Enter" || P.key === " ") && (P.preventDefault(), n(T.id));
              },
              className: _(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                D && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(Er, { widget: T, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: _(Ln, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ b("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${T.title ?? T.type}`,
                      onClick: (P) => {
                        P.stopPropagation(), r(T.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Ul, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${T.title ?? T.type}`,
                      onClick: (P) => {
                        P.stopPropagation(), a(T.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Hl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${T.title ?? T.type}`,
                      onClick: (P) => {
                        P.stopPropagation(), i(T.id);
                      },
                      className: _("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l($t, {})
                    }
                  )
                ] })
              ]
            },
            j.i
          )
        );
      })
    }
  ) : null }) });
}
function nb(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const rb = y.memo(tb);
function ab(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function ib({
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
  const a = to({
    extensions: [ro],
    editable: !0,
    content: ab(e.doc),
    onUpdate: ({ editor: i }) => {
      const o = i.getJSON();
      n.current({ ...r.current, doc: o });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: _(Yo, "cv-text-editor-content")
      }
    }
  });
  return a ? /* @__PURE__ */ l(de, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ b("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(ob, { editor: a }),
    /* @__PURE__ */ l(no, { editor: a })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function Ye({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: _("cv-text-toolbar-button", e && "cv-text-toolbar-button--active"),
      children: r
    }
  );
}
function ob({ editor: e }) {
  const [, t] = y.useReducer((n) => n + 1, 0);
  return y.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv-text-toolbar",
      children: [
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(Gl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Yl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Ql, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(Jl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(Xl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(Zl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(ec, {})
          }
        ),
        /* @__PURE__ */ l(
          Ye,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(tc, {})
          }
        )
      ]
    }
  );
}
const sb = ta(
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
function lb({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: _(sb({ variant: t }), e), ...n });
}
function cb({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = lt(), c = y.useMemo(() => Zn(o), [o]), u = c.filter((h) => h.type === "view"), d = c.find((h) => h.name === e), m = y.useMemo(() => {
    const h = c.filter((k) => k.type === "cube"), f = h.some((k) => k.category), g = [], v = /* @__PURE__ */ new Map();
    for (const k of h) {
      const w = k.category ?? (f ? "More tables" : "Tables");
      v.has(w) || (v.set(w, []), g.push(w)), v.get(w).push(k);
    }
    return g.sort((k, w) => k === "More tables" ? 1 : w === "More tables" ? -1 : k.localeCompare(w)), g.map((k) => ({ label: k, items: v.get(k) }));
  }, [c]);
  return /* @__PURE__ */ b(_e, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(De, { id: a, className: i, children: /* @__PURE__ */ l(Ae, { placeholder: s ? "Loading…" : n, children: d ? /* @__PURE__ */ l(gr, { option: d }) : void 0 }) }),
    /* @__PURE__ */ b(Le, { children: [
      u.length > 0 ? /* @__PURE__ */ b(Ar, { children: [
        /* @__PURE__ */ l(Dr, { children: "Saved datasets" }),
        u.map((h) => /* @__PURE__ */ l(be, { value: h.name, children: /* @__PURE__ */ l(gr, { option: h }) }, h.name))
      ] }) : null,
      m.map((h) => /* @__PURE__ */ b(Ar, { children: [
        /* @__PURE__ */ l(Dr, { children: h.label }),
        h.items.map((f) => /* @__PURE__ */ l(be, { value: f.name, children: /* @__PURE__ */ l(gr, { option: f }) }, f.name))
      ] }, h.label))
    ] })
  ] });
}
function gr({ option: e }) {
  const t = e.type === "view" ? Qi : nc;
  return /* @__PURE__ */ b("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(lb, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const ub = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function mb(e) {
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
function db({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(mb(s));
  };
  return /* @__PURE__ */ b("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ b(
          _e,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(De, { children: /* @__PURE__ */ l(Ae, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Le, { children: t.map((s) => /* @__PURE__ */ l(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Control", children: /* @__PURE__ */ b(_e, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(De, { children: /* @__PURE__ */ l(Ae, {}) }),
      /* @__PURE__ */ l(Le, { children: Nc.options.map((s) => /* @__PURE__ */ l(be, { value: s, children: ub[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(fb, { control: r, onChange: a, variables: t })
  ] });
}
function fb({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(hb, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(gb, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(vb, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(bb, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(yb, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(kb, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function hb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ b(pe, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          pb,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ l(
      rt,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function pb({
  selected: e,
  onChange: t
}) {
  const [n, r] = y.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(yn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === yn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ b(Fe, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Ie, { asChild: !0, children: /* @__PURE__ */ b(Q, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(it, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(Pe, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: yn.map((s) => {
      const c = a.has(s.value);
      return /* @__PURE__ */ b(
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
                className: _("cv-preset-select-check", c && "cv-preset-select-check--checked"),
                children: c ? /* @__PURE__ */ l(Pt, { className: "cv-ed-icon-xs" }) : null
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
function gb({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = et.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ b(pe, { children: [
    /* @__PURE__ */ l(
      de,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ b(
          _e,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(De, { children: /* @__PURE__ */ l(Ae, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ b(Le, { children: [
                /* @__PURE__ */ l(be, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: et.options.map((s) => {
      const c = r.has(s);
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(s),
          className: _("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function vb({
  control: e,
  onChange: t
}) {
  const n = (i, o) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: o.value ?? String(c.value), label: o.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (i) => t({ ...e, options: e.options.filter((o, s) => s !== i) });
  return /* @__PURE__ */ b(pe, { children: [
    /* @__PURE__ */ l(
      rt,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (i) => t({ ...e, multiple: i })
      }
    ),
    /* @__PURE__ */ l(
      de,
      {
        label: "Options",
        action: /* @__PURE__ */ b(Q, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(_t, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, o) => /* @__PURE__ */ b("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            ye,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(o, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            ye,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${o + 1} value`,
              placeholder: "Value",
              value: String(i.value),
              onChange: (s) => n(o, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            Q,
            {
              variant: "ghost",
              size: "icon",
              className: _("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l($t, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function bb({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ b(pe, { children: [
    /* @__PURE__ */ l(de, { label: "From", children: /* @__PURE__ */ b(
      _e,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(De, { children: /* @__PURE__ */ l(Ae, {}) }),
          /* @__PURE__ */ b(Le, { children: [
            /* @__PURE__ */ l(be, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(be, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(be, { value: "dimensionOrMeasure", children: "All fields" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(
      de,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ l(
          Q,
          {
            variant: "ghost",
            size: "sm",
            className: "cv-ed-clear-btn",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ l(
          cb,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function yb({
  control: e,
  onChange: t
}) {
  const n = y.useId();
  return /* @__PURE__ */ l(de, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    ye,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function kb({
  control: e,
  onChange: t
}) {
  const n = y.useId(), r = (a, i) => /* @__PURE__ */ l(de, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
    ye,
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
  return /* @__PURE__ */ b(pe, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function wb(e) {
  return { schemaVersion: Tt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Cb(e) {
  const t = {
    schemaVersion: Tt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Nb(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Li({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const i = y.useId(), o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ b("div", { "data-slot": "widget-edit-panel", className: _("cv-widget-panel", a && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      de,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          ye,
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
      /* @__PURE__ */ l(Na, { spec: wb(t), children: /* @__PURE__ */ l(Tg, { createVariable: o, children: /* @__PURE__ */ l("div", { className: _(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Wv,
        {
          fill: a,
          spec: Cb(e),
          onChange: (s) => n(Nb(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(ib, { widget: e, onChange: n }) : /* @__PURE__ */ l(db, { widget: e, variables: t, onChange: n })
  ] });
}
function Sb({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: i,
  regionId: o,
  className: s
}) {
  const c = /* @__PURE__ */ b(pe, { children: [
    r ? /* @__PURE__ */ l(
      cn,
      {
        className: _("cv-section-chevron", a && "cv-section-chevron--open")
      }
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-section-title", children: e }),
    t != null ? /* @__PURE__ */ l("span", { className: "cv-section-summary", children: t }) : null
  ] });
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "section-header",
      className: _("cv-section-header", s),
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
function xb({
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
  const u = i !== void 0, [d, m] = y.useState(a), h = r ? u ? i : d : !0, f = y.useId(), g = y.useCallback(() => {
    const v = !h;
    u || m(v), o == null || o(v);
  }, [h, u, o]);
  return /* @__PURE__ */ b(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: _("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          Sb,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: h,
            onToggle: g,
            regionId: f
          }
        ),
        h ? /* @__PURE__ */ l("div", { id: f, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function Mb(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Tb(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Rb(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Ob(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function _b(e, t) {
  switch (e) {
    case "chart":
      return Tb(t);
    case "text":
      return Rb(t);
    case "input":
      return Ob(t);
  }
}
function Ab(e) {
  return { name: e, type: "string" };
}
function Db(e) {
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
const Ei = {
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
function Lb({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = y.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((d) => d.name === u));
    return u;
  }, i = (u, d) => {
    t(e.map((m, h) => h === u ? Eb(m, d) : m));
  }, o = (u) => t(e.filter((d, m) => m !== u)), s = () => t([...e, Ab(a())]), c = (u, d) => {
    const m = u + d;
    if (m < 0 || m >= e.length) return;
    const h = e.slice();
    [h[u], h[m]] = [h[m], h[u]], t(h);
  };
  return /* @__PURE__ */ l(
    xb,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ l(_t, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ b("div", { className: "cv-variables-empty", children: [
        /* @__PURE__ */ l("p", { className: "cv-variables-empty-title", children: "No variables yet" }),
        /* @__PURE__ */ b("p", { className: "cv-variables-empty-hint", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ b(Q, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(_t, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, d) => /* @__PURE__ */ l(
        Fb,
        {
          decl: u,
          index: d,
          total: e.length,
          duplicate: e.some((m, h) => h !== d && m.name === u.name && u.name !== ""),
          onChange: (m) => i(d, m),
          onRemove: () => o(d),
          onMove: (m) => c(d, m)
        },
        d
      )) })
    }
  );
}
function Eb(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Db(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Fb({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: i,
  onMove: o
}) {
  const [s, c] = y.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0, d = y.useId();
  return /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv-variable-row",
      children: [
        /* @__PURE__ */ b("div", { className: "cv-variable-row-header", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => c((m) => !m),
              className: "cv-variable-row-toggle",
              children: s ? /* @__PURE__ */ l(it, {}) : /* @__PURE__ */ l(cn, {})
            }
          ),
          /* @__PURE__ */ l(
            ye,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => a({ name: m.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Ei[e.type] }),
          /* @__PURE__ */ b("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              Q,
              {
                variant: "ghost",
                size: "icon",
                className: _("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Jr, {})
              }
            ),
            /* @__PURE__ */ l(
              Q,
              {
                variant: "ghost",
                size: "icon",
                className: _("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Xr, {})
              }
            ),
            /* @__PURE__ */ l(
              Q,
              {
                variant: "ghost",
                size: "icon",
                className: _("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l($t, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ b("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(de, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ b(_e, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ l(De, { children: /* @__PURE__ */ l(Ae, {}) }),
            /* @__PURE__ */ l(Le, { children: so.options.map((m) => /* @__PURE__ */ l(be, { value: m, children: Ei[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ l(
            de,
            {
              label: "Label",
              htmlFor: d,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                ye,
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
            rt,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => a({ array: m })
            }
          ),
          /* @__PURE__ */ l(Ib, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function Ib({
  decl: e,
  onChange: t
}) {
  const n = y.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(
      rt,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (i) => t(i)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(de, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      ye,
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : Pb(e.default);
  return /* @__PURE__ */ l(de, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    ye,
    {
      id: n,
      value: a,
      placeholder: $b(e.type),
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
function Pb(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function $b(e) {
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
function Ty({
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
  onDiscard: m,
  families: h,
  onCreateChart: f,
  openWidgetId: g,
  className: v
}) {
  var H, J;
  const [k, w] = y.useState(e), [C, A] = y.useState(e);
  y.useEffect(() => {
    w(e), A(e);
  }, [e]);
  const [N, M] = y.useState(null), E = y.useRef(0), [O, z] = y.useState(null), j = y.useRef(N), T = y.useRef(O), D = y.useRef(k);
  y.useEffect(() => {
    j.current = N, T.current = O, D.current = k;
  });
  const P = y.useRef(null);
  P.current === null && (P.current = i ?? Mb());
  const F = i ?? P.current, U = Hs(
    (B) => r == null ? void 0 : r(B),
    o
  ), $ = y.useCallback(
    (B) => {
      E.current = Date.now(), w((G) => {
        const K = B(G);
        return U(K), K;
      });
    },
    [U]
  ), I = y.useRef(t);
  y.useEffect(() => {
    if (!t || t === I.current) return;
    const B = 500;
    let G = null;
    const K = () => {
      var he;
      const ie = Date.now() - E.current;
      if (ie < B) {
        G = setTimeout(K, B - ie);
        return;
      }
      I.current = t;
      const ce = /* @__PURE__ */ new Set();
      ((he = T.current) == null ? void 0 : he.kind) === "widget" && ce.add(T.current.id), j.current && ce.add(j.current);
      const Re = jb(t, D.current, ce);
      w(Re), n == null || n(Re);
    };
    return K(), () => {
      G && clearTimeout(G);
    };
  }, [t]);
  const Y = y.useCallback(
    (B) => {
      if (B === "chart" && f) {
        f();
        return;
      }
      const G = _b(B, F());
      $((K) => Qs(K, G)), M(G.id), z({ kind: "widget", id: G.id });
    },
    [$, F, f]
  ), Z = y.useRef(void 0);
  y.useEffect(() => {
    !g || Z.current === g || k.widgets.some((B) => B.id === g) && (Z.current = g, M(g), z({ kind: "widget", id: g }));
  }, [g, k.widgets]);
  const te = y.useCallback((B) => M(B), []), se = y.useCallback((B) => {
    M(B), z({ kind: "widget", id: B });
  }, []), ue = y.useCallback(
    (B) => {
      $((G) => Yv(G, B)), M((G) => G === B ? null : G), z((G) => (G == null ? void 0 : G.kind) === "widget" && G.id === B ? null : G);
    },
    [$]
  ), le = y.useCallback(
    (B) => {
      const G = F();
      $((K) => Gv(K, B, G)), M(G);
    },
    [$, F]
  ), fe = y.useCallback(
    (B) => $((G) => Qv(G, B)),
    [$]
  ), ge = y.useCallback(
    (B) => $((G) => {
      const K = qv(G.layout, B);
      return Vb(G.layout, K) ? G : { ...G, layout: K };
    }),
    [$]
  ), V = y.useCallback(
    (B) => $((G) => ({ ...G, name: B || void 0 })),
    [$]
  ), ee = y.useCallback(
    (B) => $((G) => ({ ...G, variables: B })),
    [$]
  ), oe = y.useDeferredValue(k), L = y.useMemo(
    () => Cr.safeParse(oe),
    [oe]
  ), x = y.useCallback(() => {
    const B = Cr.safeParse(k);
    B.success && (a == null || a(B.data), A(k));
  }, [k, a]), S = k !== C, R = (O == null ? void 0 : O.kind) === "widget" ? k.widgets.find((B) => B.id === O.id) ?? null : null;
  y.useEffect(() => {
    (O == null ? void 0 : O.kind) === "widget" && !k.widgets.some((B) => B.id === O.id) && z(null);
  }, [O, k.widgets]);
  const W = y.useCallback(() => z(null), []), q = (O == null ? void 0 : O.kind) === "variables" ? "Dashboard variables" : R ? R.title ?? `${zb(R.type)} widget` : "";
  return /* @__PURE__ */ l(Ca, { families: h, children: /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((J = (H = k.grid) == null ? void 0 : H.margin) == null ? void 0 : J[0]) ?? 12 },
      className: _("cv-dashboard-editor", v),
      children: [
        /* @__PURE__ */ l(
          Bv,
          {
            name: k.name ?? "",
            onNameChange: V,
            onAdd: Y,
            onEditVariables: () => z({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: d,
            onDiscard: m,
            discardDisabled: !S,
            onSave: a ? x : void 0,
            saveDisabled: !L.success || !S,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        L.success ? null : /* @__PURE__ */ b("p", { className: "cv-dashboard-editor-validation", children: [
          L.error.issues.length,
          " validation issue",
          L.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: O ? null : /* @__PURE__ */ l(
          rb,
          {
            spec: k,
            selectedId: N,
            onSelect: te,
            onEdit: se,
            onDuplicate: le,
            onDelete: ue,
            onLayoutChange: ge
          }
        ) }),
        O ? /* @__PURE__ */ b(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": q,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ b("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ b("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ b(Q, { variant: "ghost", size: "sm", onClick: W, children: [
                    /* @__PURE__ */ l(ea, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: q })
                ] }),
                R ? /* @__PURE__ */ b(
                  Q,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => ue(R.id),
                    children: [
                      /* @__PURE__ */ l($t, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(er, { label: q, resetKey: k, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: O.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(Lb, { variables: k.variables, onChange: ee }) }) : (R == null ? void 0 : R.type) === "chart" ? /* @__PURE__ */ l(
                Li,
                {
                  fill: !0,
                  widget: R,
                  variables: k.variables,
                  onChange: fe,
                  onVariablesChange: ee
                }
              ) : R ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Li,
                {
                  widget: R,
                  variables: k.variables,
                  onChange: fe,
                  onVariablesChange: ee
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function zb(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Vb(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function jb(e, t, n) {
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
  At as AUTO_GRANULARITY,
  Lu as AreaChartFamily,
  hu as AreaFamilyOptionsSchema,
  bc as AxesOptionsSchema,
  Ua as AxisOptionsSchema,
  py as BUILTIN_CHART_FAMILIES,
  He as BUILTIN_DEFAULTS,
  Ue as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Au as BarChartFamily,
  du as BarFamilyOptionsSchema,
  Gs as CANONICAL_BREAKPOINT,
  tt as ChartColorTokenSchema,
  $v as ChartEditOverlay,
  Wv as ChartEditor,
  fc as ChartFamilySchema,
  la as ChartInteractionProvider,
  oo as ChartOptionsSchema,
  Fo as ChartRenderer,
  co as ChartSpecSchema,
  wc as ChartTransformSchema,
  xy as ChartView,
  xc as ChartWidgetSchema,
  yc as ColorAssignmentSchema,
  yu as CondFormatRuleSchema,
  Sa as CubeChart,
  rh as CubeChartSpec,
  io as CubeQuerySchema,
  Gn as CubeVizContext,
  Cy as CubeVizProvider,
  Kn as DEFAULT_COLOR_RAMP,
  Ys as DEFAULT_COLS,
  ai as DEFAULT_MARK_THEME,
  vn as DEFAULT_TRANSFORM_WINDOW,
  _r as DEFAULT_UNIT_CONVERSIONS,
  Ln as DRAG_HANDLE_CLASS,
  Sy as Dashboard,
  Ty as DashboardEditor,
  Na as DashboardProvider,
  Cr as DashboardSpecSchema,
  kr as DateRangeSchema,
  Cu as EMPTY_FAMILY_DEFAULT,
  Qa as EM_DASH,
  rb as EditorCanvas,
  Bv as EditorToolbar,
  Ca as FamilyRegistryOverride,
  Ag as FilterBuilder,
  cc as FilterOperatorSchema,
  hc as FormatKindSchema,
  na as FormatOptionsSchema,
  eu as GRANULARITY_PATTERN,
  lc as GranularityChoiceSchema,
  et as GranularitySchema,
  _c as GridConfigSchema,
  Ku as HeatmapChartFamily,
  wu as HeatmapFamilyOptionsSchema,
  Nc as InputControlKindSchema,
  Sc as InputControlSchema,
  db as InputWidgetEditor,
  Tc as InputWidgetSchema,
  Nh as InputWidgetView,
  Hu as KpiFamily,
  vu as KpiFamilyOptionsSchema,
  Oc as LayoutItemSchema,
  uc as LeafFilterSchema,
  gc as LegendOptionsSchema,
  Du as LineChartFamily,
  fu as LineFamilyOptionsSchema,
  me as MemberSchema,
  Ka as OrderDirSchema,
  dc as OrderSpecSchema,
  Iu as PieChartFamily,
  pu as PieFamilyOptionsSchema,
  wr as QueryFilterSchema,
  jn as ReferenceLineOptSchema,
  Er as RenderWidget,
  Tt as SCHEMA_VERSION,
  sc as ScalarSchema,
  $u as ScatterChartFamily,
  gu as ScatterFamilyOptionsSchema,
  pc as SeriesMappingSchema,
  qa as SeriesMetaSchema,
  uo as SpecSchema,
  bu as TableColumnOptSchema,
  om as TableFamily,
  ku as TableFamilyOptionsSchema,
  ib as TextWidgetEditor,
  Mc as TextWidgetSchema,
  ih as TextWidgetView,
  mc as TimeDimensionSchema,
  Cc as TipTapDocSchema,
  vc as TooltipOptionsSchema,
  kc as TransformKindSchema,
  Rn as VarRefSchema,
  Ac as VariableDeclSchema,
  so as VariableTypeSchema,
  ao as VariableValueSchema,
  Lb as VariablesPanel,
  ts as WidgetChrome,
  Li as WidgetEditPanel,
  Rc as WidgetSpecSchema,
  My as adaptiveGranularity,
  Qs as appendWidget,
  Sm as areaChartFamily,
  oi as assignColors,
  wa as autoGranularityFor,
  $f as axisKey,
  Cm as barChartFamily,
  ba as buildFamilyRegistry,
  wy as builtinCharts,
  qe as builtinFamilyDescriptors,
  Bn as builtinFamilyRegistry,
  ps as canonicalTimeOf,
  Qp as collapseFamilies,
  Qc as createCubeClient,
  Mb as createIdFactory,
  jo as createQueryResolver,
  Bo as createUnitsFormatter,
  rd as createVariableStore,
  nu as datePattern,
  Nr as deepMerge,
  va as defaultChartFamilies,
  Db as defaultForType,
  ia as defaultFormatter,
  Pr as familyKeyOf,
  Jc as fetchMeta,
  vt as findCube,
  Oe as findMember,
  yy as formatCategory,
  Jt as formatDateValue,
  Kp as geoPointId,
  Gp as grainAggLabel,
  $o as granularitiesForSpan,
  zo as granularityOptionsFor,
  Tm as heatmapChartFamily,
  Et as isEmptyValue,
  Se as isVarRef,
  Rm as kpiChartFamily,
  Nm as lineChartFamily,
  Zn as listCubes,
  yt as listMembers,
  Yc as loadSpec,
  aa as looksLikeIsoDate,
  oa as makeChartFormat,
  by as makeDateFormatter,
  ky as makeFormatter,
  Up as memberAgg,
  Hp as memberAggDefault,
  kn as memberCanonicalTime,
  Ni as memberFamilyTitle,
  hs as memberGroup,
  qv as mergeLayout,
  Hn as mergeUnitConversions,
  Tb as newChartWidget,
  Ob as newInputWidget,
  Rb as newTextWidget,
  Ab as newVariable,
  _b as newWidget,
  Po as normalize,
  Wp as pathLabel,
  Kv as pickCanonicalLayout,
  xm as pieChartFamily,
  Hv as placeNewItem,
  Vf as quantityLabel,
  ka as rangeSpanDays,
  Yv as removeWidget,
  Qv as replaceWidget,
  qf as resolveChart,
  Eo as resolveMarkTheme,
  Am as resolveOptions,
  Nu as resolveOptionsWith,
  Vo as resolveQuery,
  Jm as resolveRelativeDateRange,
  Io as resolveSeriesColors,
  Zm as resolveValue,
  gy as safeLoadSpec,
  Mm as scatterChartFamily,
  Om as tableChartFamily,
  mo as toDate,
  jm as toResultAnnotation,
  Vv as useChartEditorState,
  go as useChartInteractions,
  Go as useContainerWidth,
  lt as useCubeMeta,
  Uo as useCubeQuery,
  Ve as useCubeVizContext,
  Ho as useDashboard,
  Hs as useDebouncedCallback,
  Qn as useDisplayUnit,
  st as useFamilyRegistry,
  Ny as useFormatter,
  cr as useNormalizedSeries,
  mn as useOptionalDashboard,
  vy as validateSpec
};
//# sourceMappingURL=index.js.map
