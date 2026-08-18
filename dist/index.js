var $s = Object.defineProperty;
var zs = (e, t, n) => t in e ? $s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Qn = (e, t, n) => zs(e, typeof t != "symbol" ? t + "" : t, n);
import { z as g } from "zod";
import { jsx as l, jsxs as v, Fragment as de } from "react/jsx-runtime";
import * as b from "react";
import { useMemo as ee, createContext as xi, useContext as zr, useState as dt, useCallback as Ge, useEffect as rn, useRef as it, createElement as Vs, useSyncExternalStore as Ti, useId as js, Component as Ws } from "react";
import { ruleX as Ri, ruleY as Oi, text as Jt, colorLegend as Vr, group as Bs, stack as _i, barX as Aa, barY as Da, lineX as qs, lineY as Dn, defineChart as et, areaY as dr, dot as Ai, cell as Us } from "@tanstack/charts";
import { crosshair as Di } from "@tanstack/charts/crosshair";
import { scaleBand as Ks } from "@tanstack/charts/scales/band";
import { scaleLinear as bn } from "@tanstack/charts/scales/linear";
import { scalePoint as Hs } from "@tanstack/charts/scales/point";
import { Chart as Gs } from "@tanstack/charts/react/core";
import { motion as Li } from "@tanstack/charts/motion";
import { tooltip as jr } from "@tanstack/charts/tooltip";
import { d3Curve as Jn } from "@tanstack/charts/d3/shape";
import { brushX as Ys } from "@tanstack/charts/interaction/brush";
import { controlledSignal as Qs } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Js, scaleLog as La, scaleSqrt as Xs } from "d3-scale";
import { curveNatural as Zs, curveStepAfter as el, curveMonotoneX as tl } from "d3-shape";
import { format as fe, isValid as It, parseISO as yn, subDays as be, startOfWeek as kn, endOfWeek as wn, startOfMonth as ot, endOfMonth as Bt, startOfQuarter as st, endOfQuarter as qt, startOfYear as lt, endOfYear as Ut, subWeeks as fr, subMonths as ct, subQuarters as ut, subYears as mt, differenceInCalendarDays as nl, parse as Ei } from "date-fns";
import { clsx as rl } from "clsx";
import * as we from "@radix-ui/react-select";
import { Minus as Ii, ArrowUp as Wr, ArrowDown as Br, CalendarRange as Fi, ChevronsUpDown as al, AreaChart as il, BarChart3 as Pi, Grid3X3 as ol, Table as sl, Gauge as ll, ScatterChart as cl, PieChart as ul, LineChart as ml, AlertCircle as qr, ChevronLeft as Ur, ChevronRight as an, ChevronDown as tt, Check as gt, ChevronUp as dl, CalendarIcon as $i, MoreVertical as fl, RefreshCw as hl, Image as pl, Sheet as gl, Search as vl, ListChecks as bl, Table2 as zi, Database as Vi, Layers as Kr, Calendar as yl, Type as ji, Hash as Ea, MapPin as kl, Variable as wl, Plus as Nt, Trash2 as _t, ListFilter as Cl, Box as Wi, EyeOff as Nl, Eye as Sl, AlertTriangle as Ml, GripVertical as xl, X as Ia, Save as Bi, SlidersHorizontal as Tl, Braces as Rl, Undo2 as Ol, Redo2 as _l, RotateCcw as Al, Pencil as Dl, Copy as Ll, Bold as El, Italic as Il, Strikethrough as Fl, Heading1 as Pl, Heading2 as $l, List as zl, ListOrdered as Vl, Quote as jl } from "lucide-react";
import * as Cn from "@radix-ui/react-popover";
import { cva as Hr } from "class-variance-authority";
import Wl from "@cubejs-client/core";
import { DayPicker as Bl, useDayPicker as ql } from "react-day-picker";
import { pie as Ul, radialArc as hr, radialText as Xn, polar as qi } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as Ui } from "react-grid-layout";
import { useEditor as Ki, EditorContent as Hi } from "@tiptap/react";
import Gi from "@tiptap/starter-kit";
const kt = 5, Nn = g.object({ var: g.string().min(1) }).strict();
function ke(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Sn = (e) => g.union([e, Nn]), Kl = g.union([g.string(), g.number(), g.boolean()]), Qe = g.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), St = "auto", Hl = g.union([Qe, g.literal(St)]), pr = g.union([g.tuple([g.string(), g.string()]), g.string()]), Yi = g.union([
  g.string(),
  g.number(),
  g.boolean(),
  g.tuple([g.string(), g.string()]),
  // absolute date range
  g.array(g.string()),
  g.array(g.number())
]), le = g.string().min(1), Gl = g.enum([
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
]), Yl = g.object({
  member: le,
  operator: Gl,
  values: g.array(g.union([Kl, Nn])).optional()
}).strict(), gr = g.lazy(
  () => g.union([
    Yl,
    g.object({ and: g.array(gr) }).strict(),
    g.object({ or: g.array(gr) }).strict()
  ])
), Ql = g.object({
  dimension: le,
  granularity: Sn(Hl).optional(),
  dateRange: Sn(pr).optional(),
  compareDateRange: g.array(pr).optional()
}).strict(), Fa = g.enum(["asc", "desc"]), Jl = g.union([
  g.record(le, Fa),
  g.array(g.tuple([le, Fa]))
]), Qi = g.object({
  measures: g.array(le).optional(),
  dimensions: g.array(le).optional(),
  timeDimensions: g.array(Ql).optional(),
  filters: g.array(gr).optional(),
  segments: g.array(le).optional(),
  order: Jl.optional(),
  limit: Sn(g.number()).optional(),
  offset: Sn(g.number()).optional(),
  total: g.boolean().optional(),
  timezone: g.string().optional()
}).strict(), Xl = g.string().min(1), Yb = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], Je = g.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Zl = g.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Gr = g.object({
  kind: Zl.optional(),
  decimals: g.number().optional(),
  abbreviate: g.boolean().optional(),
  prefix: g.string().optional(),
  suffix: g.string().optional(),
  unitSystem: g.enum(["metric", "imperial"]).optional(),
  dateFormat: g.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: g.string().optional()
}).strict(), Pa = g.object({
  label: g.string().optional(),
  colorToken: Je.optional(),
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
}).strict(), ec = g.object({
  category: g.object({ member: le }).strict(),
  series: g.union([
    g.object({
      mode: g.literal("measures"),
      members: g.array(le),
      meta: g.record(le, Pa).optional()
    }).strict(),
    g.object({
      mode: g.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: le,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: g.array(le).optional(),
      pivot: le,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: g.record(le, Pa).optional()
    }).strict()
  ])
}).strict(), tc = g.object({
  show: g.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: g.enum(["top", "bottom"]).optional()
}).strict(), nc = g.object({
  show: g.boolean().optional(),
  indicator: g.enum(["dot", "line", "dashed"]).optional(),
  showTotal: g.boolean().optional()
}).strict(), $a = g.object({
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
  tickFormat: Gr.optional()
}).strict(), rc = g.object({
  x: $a.optional(),
  y: $a.optional()
}).strict(), ac = g.object({
  byKey: g.record(g.string(), Je).optional(),
  ramp: g.array(Je).optional()
}).strict(), dn = 7, ic = g.enum(["rollingAvg", "cumulative", "percentOfTotal"]), oc = g.object({
  kind: ic,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: g.number().int().min(2).max(90).optional()
}).strict(), Ji = g.object({
  family: Xl,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: ec.optional(),
  orientation: g.enum(["vertical", "horizontal"]).optional(),
  stackMode: g.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: tc.optional(),
  tooltip: nc.optional(),
  axes: rc.optional(),
  colors: ac.optional(),
  format: Gr.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: oc.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: g.record(g.string(), g.unknown()).optional()
}).strict(), sc = g.object({ type: g.string(), content: g.array(g.unknown()).optional() }).passthrough(), lc = g.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), cc = g.object({
  variable: g.string().min(1),
  control: g.discriminatedUnion("kind", [
    g.object({
      kind: g.literal("dateRange"),
      presets: g.array(g.string()).optional(),
      allowFuture: g.boolean().optional()
    }).strict(),
    g.object({
      kind: g.literal("granularity"),
      options: g.array(Qe).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: g.string().optional()
    }).strict(),
    g.object({
      kind: g.literal("select"),
      options: g.array(g.object({ value: Yi, label: g.string() }).strict()),
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
}).strict(), Yr = {
  id: g.string().min(1),
  title: g.string().optional()
}, uc = g.object({ ...Yr, type: g.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), mc = g.object({ ...Yr, type: g.literal("text"), doc: sc }).strict(), dc = g.object({ ...Yr, type: g.literal("input"), control: cc }).strict(), fc = g.discriminatedUnion("type", [
  uc,
  mc,
  dc
]), hc = g.object({
  i: g.string(),
  x: g.number(),
  y: g.number(),
  w: g.number(),
  h: g.number(),
  minW: g.number().optional(),
  minH: g.number().optional(),
  static: g.boolean().optional()
}).strict(), pc = g.object({
  cols: g.number().optional(),
  rowHeight: g.number().optional(),
  margin: g.tuple([g.number(), g.number()]).optional(),
  containerPadding: g.tuple([g.number(), g.number()]).optional()
}).strict(), Xi = g.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), gc = g.object({
  name: g.string().min(1),
  type: Xi,
  label: g.string().optional(),
  array: g.boolean().optional(),
  default: Yi.optional()
}).strict(), Zi = {
  schemaVersion: g.literal(kt),
  id: g.string().min(1),
  name: g.string().optional(),
  description: g.string().optional(),
  createdAt: g.string().optional(),
  updatedAt: g.string().optional()
}, eo = g.object({ ...Zi, kind: g.literal("chart"), query: Qi.default({}), chart: Ji }).strict(), vr = g.object({
  ...Zi,
  kind: g.literal("dashboard"),
  variables: g.array(gc),
  widgets: g.array(fc),
  layout: g.array(hc),
  grid: pc.optional()
}).strict(), to = g.discriminatedUnion("kind", [eo, vr]);
function Q(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Pe(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function vc(e) {
  if (!Q(e.axes)) return;
  const t = Pe(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function bc(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Q(a)) continue;
    const i = Pe(a, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function yc(e) {
  if (!Q(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => Q(n) ? Pe(n, "side") ?? {} : n
  ));
}
function kc(e) {
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
function za(e) {
  Q(e) && (e.family === "combo" && kc(e), vc(e), bc(e), yc(e));
}
function wc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    za(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && za(n.chart);
  return t;
}
function Cc(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  const n = {};
  for (const [r, a] of Object.entries(t.meta)) {
    if (!Q(a)) continue;
    const i = Pe(a, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Nc(e) {
  if (!Q(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function Sc(e) {
  if (Q(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Q(n) || !Array.isArray(n.domain) || n.domain.every((a) => typeof a == "number")) continue;
      const r = Pe(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function Mc(e) {
  if (!Q(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = Pe(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Va(e) {
  Q(e) && (Cc(e), Nc(e), Sc(e), Mc(e));
}
function xc(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Va(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && Va(n.chart);
  return t;
}
const Tc = {
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
function Rc(e) {
  if (!Q(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = Tc[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const a of n) r = Pe(r, a) ?? {};
  e.familyOptions = r;
}
function Oc(e) {
  if (Q(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!Q(n) || n.labelHide !== !0) continue;
      const r = Pe(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function ja(e) {
  Q(e) && (Rc(e), Oc(e));
}
function _c(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    ja(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      Q(n) && n.type === "chart" && ja(n.chart);
  return t;
}
function Ac(e) {
  if (!Q(e.mapping)) return;
  const t = e.mapping.series;
  if (!Q(t) || !Q(t.meta)) return;
  let n;
  const r = {};
  for (const [o, s] of Object.entries(t.meta)) {
    if (!Q(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = Pe(s, "curve");
    c && (r[o] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const a = e.family;
  if (n === void 0 || a !== "line" && a !== "area") return;
  const i = Q(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function Dc(e) {
  const t = structuredClone(e), n = (r) => {
    Q(r) && Ac(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      Q(r) && r.type === "chart" && n(r.chart);
  return t;
}
const Lc = {
  1: wc,
  2: xc,
  3: _c,
  4: Dc
};
function Ec(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${kt} — update the library`
    );
  for (; n < kt; ) {
    const r = Lc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return to.parse(t);
}
function Qb(e) {
  try {
    return { ok: !0, spec: Ec(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Jb(e) {
  return to.parse(e);
}
function Ic(e) {
  return Wl(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Fc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function O(...e) {
  return rl(e);
}
function Pc({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: O("cv-skeleton", e), ...t });
}
const $c = Hr(
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
    className: O($c({ variant: t }), e),
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
      className: O("cv-alert-title", e),
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
      className: O("cv-alert-description", e),
      ...t
    }
  )
);
In.displayName = "AlertDescription";
const zc = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Vc = "MMM d, yyyy";
function no(e) {
  if (e instanceof Date) return It(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return It(r) ? r : null;
  }
  const t = yn(e);
  if (It(t)) return t;
  const n = new Date(e);
  return It(n) ? n : null;
}
function Qr(e) {
  return /^\d{4}-\d{2}/.test(e) ? It(yn(e)) : !1;
}
function jc(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? zc[t] : Vc;
}
function Kt(e, t, n) {
  const r = no(e);
  return r ? fe(r, jc(t, n)) : String(e);
}
function Xb(e, t) {
  return (n) => n == null ? "" : Kt(n, e, t);
}
function Zb(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Kt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Kt(e, t.format, t.granularity) : String(e) : Qr(e) ? Kt(e, t.format, t.granularity) : e;
}
const Wa = "—", Wc = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Ba(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Bc(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of Wc)
    if (n >= r) return Ba((e / r).toFixed(t)) + a;
  return Ba(e.toFixed(t));
}
function qc(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function Uc(e, t) {
  const { format: n, meta: r, locale: a } = t, i = n != null && n.abbreviate ? Bc(e, n.decimals ?? 1) : qc(e, n, a), o = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${o ? ` ${o}` : ""}`;
}
function ro(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Kc(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || ro(e.value) ? !0 : typeof e.value == "string" ? Qr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Jr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Wa : (ro(t) || typeof t == "string" || typeof t == "number") && Kc(e) ? Kt(t, n, r) : typeof t == "number" ? Uc(t, e) : String(t);
};
function Hc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function ey(e, t) {
  return (n, r) => {
    const a = r ? Hc(r, t) : void 0;
    return Jr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Gc(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Yc(e) {
  const t = Qe.safeParse(e);
  return t.success ? t.data : void 0;
}
function Qc(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const i = Yc(a.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Xr(e, t, n, r) {
  const a = Qc(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (o) => !o || Object.keys(o).length === 0 ? i : Xr(
      e,
      { ...t, format: { ...t.format, ...o } },
      n,
      r
    ),
    value(o, s, c = "value") {
      const u = s ? Gc(s, e) : void 0, m = u == null ? void 0 : u.meta;
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
const Fn = g.object({
  axis: g.enum(["x", "y"]),
  value: g.number(),
  label: g.string().optional(),
  colorToken: Je.optional()
}).strict(), Zr = g.boolean().optional(), Jc = g.object({
  showValueLabels: g.boolean().optional(),
  referenceLines: g.array(Fn).optional(),
  comparePrevious: Zr
}).strict(), ao = g.enum(["linear", "monotone", "step", "natural"]), Xc = g.object({
  curve: ao.optional(),
  dots: g.union([g.boolean(), g.literal("active")]).optional(),
  connectNulls: g.boolean().optional(),
  chrome: g.enum(["full", "none"]).optional(),
  referenceLines: g.array(Fn).optional(),
  showValueLabels: g.boolean().optional(),
  comparePrevious: Zr
}).strict(), Zc = g.object({
  curve: ao.optional(),
  connectNulls: g.boolean().optional(),
  dots: g.boolean().optional(),
  referenceLines: g.array(Fn).optional(),
  comparePrevious: Zr
}).strict(), eu = g.object({
  innerRadiusPct: g.number().optional(),
  showLabels: g.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: g.object({ value: g.string().optional(), label: g.string().optional() }).strict().optional(),
  maxSlices: g.number().optional()
}).strict(), tu = g.object({
  x: le,
  y: le,
  size: le.optional(),
  groupBy: le.optional(),
  referenceLines: g.array(Fn).optional()
}).strict(), nu = g.object({
  display: g.enum(["number", "gauge"]).optional(),
  measure: le,
  comparison: g.object({
    mode: g.enum(["previousPeriod", "value"]),
    value: g.union([le, g.number()]).optional(),
    showAsPercent: g.boolean().optional(),
    goodDirection: g.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: g.object({
    member: le.optional(),
    timeDimension: le.optional(),
    granularity: g.union([Qe, Nn]).optional(),
    dateRange: g.union([pr, Nn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: g.enum(["up", "down"]).optional(),
  gauge: g.object({
    min: g.number().optional(),
    max: g.number(),
    thresholds: g.array(g.object({ at: g.number(), colorToken: Je }).strict()).optional()
  }).strict().optional()
}).strict(), ru = g.object({
  member: le,
  label: g.string().optional(),
  format: Gr.optional(),
  align: g.enum(["left", "right", "center"]).optional(),
  width: g.number().optional(),
  hidden: g.boolean().optional()
}).strict(), au = g.object({
  member: le,
  when: g.object({
    op: g.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: g.number()
  }).strict(),
  colorToken: Je.optional()
}).strict(), iu = g.object({
  columns: g.array(ru).optional(),
  pageSize: g.number().optional(),
  conditionalFormat: g.array(au).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), ou = g.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: Je.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), We = {
  bar: Jc,
  line: Xc,
  area: Zc,
  pie: eu,
  scatter: tu,
  heatmap: ou,
  kpi: nu,
  table: iu
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
function qa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function br(e, t) {
  if (t === void 0) return e;
  if (!qa(e) || !qa(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? br(e[r], a) : a);
  }
  return n;
}
const su = { envelope: {}, familyOptions: {} };
function lu(e, t) {
  return {
    ...br({ ...t.envelope }, e),
    familyOptions: br(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const io = {}, Ua = () => {
}, cu = {
  target: io,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Ua,
  emitPoint: Ua
}, Mn = b.createContext(null);
Mn.displayName = "ChartInteractionContext";
function oo() {
  return b.useContext(Mn) ?? cu;
}
function ea({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: a
}) {
  const i = b.useContext(Mn), o = b.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  b.useLayoutEffect(() => {
    o.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = b.useCallback((f) => {
    const { parent: y, widgetId: k, onRangeSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : y == null || y.emitRange(C);
  }, []), c = b.useCallback((f) => {
    const { parent: y, widgetId: k, onPointSelect: w } = o.current, C = f && f.widgetId === void 0 && k !== void 0 ? { ...f, widgetId: k } : f;
    w ? w(C) : y == null || y.emitPoint(C);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), d = i == null ? void 0 : i.target, p = b.useMemo(
    () => d || r ? { ...d, ...r } : io,
    [d, r]
  ), h = b.useMemo(
    () => ({
      widgetId: e ?? (i == null ? void 0 : i.widgetId),
      target: p,
      rangeEnabled: u,
      pointEnabled: m,
      emitRange: s,
      emitPoint: c
    }),
    [e, i == null ? void 0 : i.widgetId, p, u, m, s, c]
  );
  return /* @__PURE__ */ l(Mn.Provider, { value: h, children: a });
}
function He(e, t) {
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
function yr(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function so(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = yr(n), a = t.get(r);
    a ? a.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function kr(e, t, n) {
  const r = [];
  return e.categories.forEach((a, i) => {
    var m, d, p;
    const o = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i];
      if (typeof f == "number" && Number.isFinite(f)) {
        const y = yr(h);
        s.set(y, (s.get(y) ?? 0) + Math.abs(f));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const h of t) {
      const f = h.data[i] ?? null, y = yr(h), k = s.get(y) ?? 0, w = f === null || k === 0 ? null : Math.abs(f) / k;
      let C = 0, x = 0;
      if (f !== null) {
        const M = f < 0 ? u : c;
        C = M.get(y) ?? 0, x = C + f, M.set(y, x);
      }
      const N = n != null && n.normalize && k > 0 ? 1 / k : 1;
      r.push({
        cat: typeof a == "number" ? a : String(a),
        ...o ? { t: o } : {},
        value: f,
        key: h.key,
        label: h.label,
        member: ((d = h.meta) == null ? void 0 : d.measure) ?? h.key,
        companion: ((p = h.meta) == null ? void 0 : p.companion) ?? !1,
        i,
        stack: y,
        y1: C * N,
        y2: x * N,
        share: w
      });
    }
  }), r;
}
function wr(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((a) => a.startsWith(r)) ?? t;
}
function Xt(e) {
  return e.label || e.key;
}
function Ke(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function ta(e, t) {
  const n = e.series.map(Xt), r = e.series.map(Ke), a = { domain: n, range: r };
  return t != null && t.legend && (a.legend = Vr({ placement: At(t.legendPlacement) })), a;
}
function At(e) {
  return e === "top" ? "top" : "bottom";
}
function on(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function xn(e = 0.2) {
  return Ks().padding(e);
}
function lo() {
  return Hs().padding(0.02);
}
const uu = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function mu(e) {
  if (typeof e == "string" && uu.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return no(e);
}
function co(e) {
  return e.toISOString().slice(0, -1);
}
function Ka(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = Qe.safeParse(n);
  return r.success ? r.data : void 0;
}
function uo(e, t) {
  var m, d, p;
  const n = (d = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : d.member, r = (p = e.raw.annotation) == null ? void 0 : p.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let a;
  for (const h of Object.keys(r))
    if (h === n || h.startsWith(`${n}.`)) {
      a = h;
      break;
    }
  if (a === void 0) return null;
  const i = a === n ? Ka(n) : Ka(a, n), o = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const h of e.categories) {
    if (typeof h == "number" && i === void 0 || typeof h == "string" && !Qr(h)) return null;
    const f = mu(h);
    if (!f) return null;
    s.push(f);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((h) => c.has(h.getTime()) ? !1 : (c.add(h.getTime()), !0)).sort((h, f) => h.getTime() - f.getTime());
  return u.length < 2 ? null : { member: o, granularity: i, dates: s, categories: e.categories, values: u };
}
function mo(e) {
  return e ? Js : lo;
}
function na(e) {
  return e ? "t" : "cat";
}
function Tn(e, t) {
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
    const s = e.values, c = (h) => h !== void 0 && s.some((f) => f.getTime() === h.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], d = u ?? { start: m, end: m }, p = u === null;
    return [
      Ys({
        id: "cv-brush-x",
        values: s,
        range: Qs(
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
        selectionStyle: p ? { fill: "none", stroke: "none" } : {
          fill: "var(--foreground)",
          fillOpacity: 0.08,
          stroke: "var(--foreground)",
          strokeOpacity: 0.35,
          strokeWidth: 1
        },
        // Resting handles paint nothing (they still keep their slider role +
        // tab stop, and charts.css gives them a visible focus ring).
        handleStyle: p ? { fill: "none" } : { fill: "var(--muted-foreground)", fillOpacity: 0.6 }
      })
    ];
  }, [o, e, r]);
}
function du(e, t) {
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
function Mt(e) {
  const t = (e == null ? void 0 : e.scale) === "log", n = e == null ? void 0 : e.domain, r = n && typeof n[0] == "number" && typeof n[1] == "number" ? [n[0], n[1]] : void 0;
  if (t) {
    const a = () => r ? La().domain(r) : La();
    return { scale: r ? a() : a, nice: !r };
  }
  return r ? { scale: bn().domain(r), nice: !1 } : { scale: bn, nice: !0 };
}
function ho(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function Zt(e) {
  switch (e) {
    case "monotone":
      return Jn(tl);
    case "step":
      return Jn(el);
    case "natural":
      return Jn(Zs);
    default:
      return;
  }
}
function xt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ra(e, t) {
  var o, s, c, u;
  const n = e.raw.annotation, r = (m) => {
    var d, p, h, f, y, k;
    if (m)
      return ((d = n == null ? void 0 : n.measures[m]) == null ? void 0 : d.shortTitle) ?? ((p = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : p.shortTitle) ?? ((h = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : h.shortTitle) ?? ((f = n == null ? void 0 : n.measures[m]) == null ? void 0 : f.title) ?? ((y = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : y.title) ?? ((k = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : k.title) ?? m;
  }, a = e.series[0], i = (m) => {
    var d;
    return m ? (d = m.meta) != null && d.measure ? r(m.meta.measure) : m.label : void 0;
  };
  return {
    x: xt((o = t.axes) == null ? void 0 : o.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: xt((u = t.axes) == null ? void 0 : u.y, i(a))
  };
}
function De(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function aa(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function fu(e) {
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
function Pn(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: jr,
    className: ia(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const a = r, i = a[0], o = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((d) => {
        var p;
        return { datum: d, color: (p = e.colorOf) == null ? void 0 : p.call(e, d) };
      }) : a.map((d) => ({ datum: d.datum, color: d.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const d of s) {
          const p = d.datum.value;
          d.datum.companion || typeof p != "number" || !Number.isFinite(p) || (c += p, u += 1);
        }
      const m = s.map((d) => ({
        label: d.datum.label,
        value: e.percentShare && c > 0 && typeof d.datum.value == "number" ? Xe(d.datum.value / c, e.locale) : n(d.datum),
        color: d.color
      }));
      return e.showTotal && u > 1 && m.push({
        label: "Total",
        value: e.percentShare ? Xe(1, e.locale) : e.format.value(c, i == null ? void 0 : i.datum.member, "tooltip")
      }), { title: o, rows: m };
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
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", m = u ? t[i.value] : void 0;
    if (u && m == null) return;
    const d = n != null && n.swap ? !u : u, p = d ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      d ? Ri([p], { id: `cv-ref-${o}`, ...c }) : Oi([p], { id: `cv-ref-${o}`, ...c })
    ), !i.label) return;
    const h = u ? n == null ? void 0 : n.valueAnchor : a;
    if (h == null) return;
    const f = (n == null ? void 0 : n.swap) === !0;
    r.push(
      oa(
        Jt(
          [
            {
              x: d ? p : h,
              y: d ? h : p,
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
function la(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function po(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const a = na((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, o = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? Xe(c, n.locale) : "";
  };
  return [
    oa(
      Jt(r, {
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
const hu = Li({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), pu = Li({ initial: !1 });
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
  const c = b.useRef(null), u = oo(), m = u.pointEnabled && !r, d = b.useRef(s);
  b.useLayoutEffect(() => {
    d.current = s;
  });
  const p = b.useCallback(
    (w) => {
      if (w === null) {
        u.emitPoint(null);
        return;
      }
      const C = d.current, x = C ? C(w) : du(w, u.target);
      x && u.emitPoint(x);
    },
    [u]
  ), [h, f] = b.useState({ w: 0, h: 0 }), y = b.useId().replace(/:/g, "");
  b.useLayoutEffect(() => {
    const w = c.current;
    if (!w || typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((x) => {
      var M;
      const N = (M = x[0]) == null ? void 0 : M.contentRect;
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
        Gs,
        {
          definition: e,
          renderer: a ? hu : pu,
          width: h.w,
          height: k,
          ariaLabel: t,
          idPrefix: y,
          onSelect: o ?? (m ? p : void 0)
        }
      )
    }
  );
}
function gu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = b.useMemo(() => {
    var Y, X, ae, ce, ie, V, J, re, se, K, S, T;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, m = e.series.filter((R) => {
      var E;
      return (E = R.meta) == null ? void 0 : E.companion;
    }), d = m.length ? e.series.filter((R) => {
      var E;
      return !((E = R.meta) != null && E.companion);
    }) : e.series, p = u ? d : e.series, f = (u ? so(p) : []).length > 1, y = f ? kr(e, p, { normalize: c }) : He(e, { series: p }), k = new Map(e.series.map((R) => [Xt(R), Ke(R)])), w = /* @__PURE__ */ new Map();
    if (f)
      for (const R of y) {
        const E = w.get(R.i);
        E ? E.push(R) : w.set(R.i, [R]);
      }
    const C = ra(e, t), x = s ? (X = (Y = t.axes) == null ? void 0 : Y.y) == null ? void 0 : X.hide : (ce = (ae = t.axes) == null ? void 0 : ae.x) == null ? void 0 : ce.hide, N = s ? (ie = t.axes) == null ? void 0 : ie.x : (V = t.axes) == null ? void 0 : V.y, M = Mt(N), F = r.barCategoryGap, D = s ? (J = t.axes) == null ? void 0 : J.y : (re = t.axes) == null ? void 0 : re.x, W = De(n, D), L = De(n, N), _ = fu(t) ?? aa(e.series[0]), P = (R) => c ? Xe(R) : L.value(R, _, "axis"), I = x ? !1 : {
      label: C.x,
      ticks: { format: (R) => W.category(R) }
    }, A = N != null && N.hide ? !1 : { label: C.y, ticks: { format: P } }, j = Bs({ padding: r.barGap }), q = f ? j : c ? _i({ offset: "normalize" }) : u ? void 0 : j, B = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (R) => f ? R.stack : R.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (R) => `${R.label} ${R.i}`,
      layout: q,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (R) => {
        const E = k.get(R.label) ?? "var(--chart-1)";
        return R.companion ? `color-mix(in oklab, ${E} 40%, transparent)` : E;
      }
    }, te = [
      f ? s ? Aa(y, { ...B, x1: "y1", x2: "y2", y: "cat" }) : Da(y, { ...B, x: "cat", y1: "y1", y2: "y2" }) : s ? Aa(y, { ...B, x: "value", y: "cat" }) : Da(y, { ...B, x: "cat", y: "value" })
    ];
    if (u && !c && m.length) {
      const R = e.categories.map((E, U) => {
        var $, z, oe;
        return {
          cat: typeof E == "number" ? E : String(E),
          value: m.reduce((Ve, je) => {
            const G = je.data[U];
            return typeof G != "number" ? Ve : (Ve ?? 0) + G;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((z = ($ = m[0]) == null ? void 0 : $.meta) == null ? void 0 : z.measure) ?? ((oe = m[0]) == null ? void 0 : oe.key),
          companion: !0,
          i: U
        };
      });
      if (R.some((E) => E.value !== null)) {
        const E = {
          id: "cv-bars-prev",
          key: (U) => `prev ${U.i}`,
          curve: Zt("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        te.push(
          s ? qs(R, { ...E, x: "value", y: "cat" }) : Dn(R, { ...E, x: "cat", y: "value" })
        );
      }
    }
    if (te.push(
      ...sa(a.referenceLines, e.categories, {
        swap: s,
        valueAnchor: la(e)
      })
    ), a.showValueLabels) {
      const R = u ? f ? y : kr(e, p, { normalize: c }) : y;
      te.push(
        ...po(R, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return et({
      marks: te,
      x: s ? { scale: M.scale, nice: M.nice, grid: !0, axis: A } : { scale: () => xn(F), axis: I },
      y: s ? { scale: () => xn(F), axis: I } : { scale: M.scale, nice: M.nice, grid: !0, axis: A },
      color: ta(u ? { ...e, series: p } : e, {
        legend: on(t) && p.length > 1,
        legendPlacement: At((se = t.legend) == null ? void 0 : se.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((K = t.tooltip) == null ? void 0 : K.show) === !1 ? void 0 : Pn({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !f,
        value: c && f ? (R) => {
          const E = R.share;
          return typeof E == "number" ? Xe(E) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: f ? (R) => w.get(R.i) ?? [R] : void 0,
        colorOf: f ? (R) => k.get(R.label) ?? "var(--chart-1)" : void 0,
        indicator: (S = t.tooltip) == null ? void 0 : S.indicator,
        showTotal: (T = t.tooltip) == null ? void 0 : T.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, a, r]), o = e.series.map(Xt).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(nt, { definition: i, ariaLabel: o, className: "cv-chart--fill" });
}
function vu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var h;
  const a = t.familyOptions ?? {}, i = a.chrome === "none", o = b.useMemo(
    () => i ? null : uo(e, t),
    [e, t, i]
  ), s = b.useMemo(() => Tn(o, n), [o, n]), c = (h = t.axes) == null ? void 0 : h.x, u = b.useMemo(
    () => c != null && c.tickFormat ? Tn(o, De(n, c)) : s,
    [o, n, c, s]
  ), m = fo(o, {
    label: s,
    ariaLabel: "Time range"
  }), d = b.useMemo(() => {
    var F, D, W, L, _, P, I, A, j;
    const f = na(o), y = a.connectNulls ?? !1, k = a.curve ?? "monotone", w = Zt(k), C = ra(e, t), x = Mt((F = t.axes) == null ? void 0 : F.y), N = e.categories.length <= 1, M = e.series.map((q) => {
      var te, Y, X;
      const B = He(e, { series: [q], skipNull: y, temporal: o });
      return Dn(B, {
        id: `cv-line-${q.key}`,
        x: f,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: w,
        strokeWidth: r.lineWidth,
        strokeDasharray: (te = q.meta) != null && te.companion ? "5 4" : void 0,
        strokeOpacity: (Y = q.meta) != null && Y.companion ? 0.55 : void 0,
        stroke: Ke(q),
        points: !i && !((X = q.meta) != null && X.companion) && (ho(q, a.dots) || N)
      });
    });
    return i || (M.push(
      ...sa(a.referenceLines, (o == null ? void 0 : o.dates) ?? e.categories, {
        valueAnchor: la(e)
      }),
      ...po(
        a.showValueLabels ? He(e, { skipNull: !0, temporal: o }) : [],
        n,
        { temporal: o }
      )
    ), M.push(Di({ x: {}, y: !1, marker: a.dots !== !1 }))), et({
      marks: M,
      x: {
        scale: mo(o),
        axis: i || (W = (D = t.axes) == null ? void 0 : D.x) != null && W.hide ? !1 : {
          label: C.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: x.scale,
        nice: x.nice,
        grid: !i,
        axis: i || (_ = (L = t.axes) == null ? void 0 : L.y) != null && _.hide ? !1 : {
          label: C.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (q) => {
              var B, te, Y, X;
              return De(n, (B = t.axes) == null ? void 0 : B.y).value(
                q,
                ((Y = (te = e.series[0]) == null ? void 0 : te.meta) == null ? void 0 : Y.measure) ?? ((X = e.series[0]) == null ? void 0 : X.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: ta(e, {
        legend: !i && on(t) && e.series.length > 1,
        legendPlacement: At((P = t.legend) == null ? void 0 : P.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((I = t.tooltip) == null ? void 0 : I.show) === !1 ? void 0 : Pn({
        format: n,
        category: s,
        indicator: (A = t.tooltip) == null ? void 0 : A.indicator,
        showTotal: (j = t.tooltip) == null ? void 0 : j.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, a, r, i, o, s, u, m]), p = e.series.map(Xt).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    nt,
    {
      definition: d,
      ariaLabel: p,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function bu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var k, w, C;
  const a = t.familyOptions ?? {}, i = ((w = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : w.mode) === "pivot", o = t.stackMode ?? (i ? "stacked" : "none"), s = o === "stacked" || o === "percent", c = o === "percent", u = b.useMemo(() => uo(e, t), [e, t]), m = b.useMemo(() => Tn(u, n), [u, n]), d = (C = t.axes) == null ? void 0 : C.x, p = b.useMemo(
    () => d != null && d.tickFormat ? Tn(u, De(n, d)) : m,
    [u, n, d, m]
  ), h = fo(u, { label: m, ariaLabel: "Time range" }), f = b.useMemo(() => {
    var X, ae, ce, ie, V, J, re, se, K;
    const x = na(u), N = a.connectNulls ?? !1, M = a.curve ?? "monotone", F = Zt(M), D = r.areaFillOpacity, W = r.lineWidth, L = ra(e, t), _ = Mt((X = t.axes) == null ? void 0 : X.y), P = aa(e.series[0]), I = e.series.filter((S) => {
      var T;
      return !((T = S.meta) != null && T.companion);
    }), A = c ? [] : e.series.filter((S) => {
      var T;
      return (T = S.meta) == null ? void 0 : T.companion;
    }), j = new Map(e.series.map((S) => [S.key, Ke(S)])), q = [], B = (S) => `cv-area-fill-${S.replace(/[^a-zA-Z0-9_-]/g, "-")}`, te = s ? void 0 : I.map((S) => ({
      id: B(S.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: Ke(S), opacity: D * 0.15 },
        { offset: 1, color: Ke(S), opacity: D }
      ]
    }));
    if (s)
      for (const { stackId: S, series: T } of so(I)) {
        const R = He(e, { series: T, skipNull: N, temporal: u });
        q.push(
          dr(R, {
            id: S ? `cv-area-stack-${S}` : "cv-area-stack",
            x,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (E) => `${E.key}:${E.i}`,
            curve: F,
            fillOpacity: D,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (E) => j.get(E.key) ?? "currentColor",
            strokeWidth: W,
            layout: c ? _i({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const S of I) {
        const T = He(e, { series: [S], skipNull: N, temporal: u });
        q.push(
          dr(T, {
            id: `cv-area-${S.key}`,
            x,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: F,
            fill: `url(#${B(S.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: Ke(S),
            strokeWidth: W
          })
        );
      }
    for (const S of A) {
      const T = He(e, { series: [S], skipNull: N, temporal: u });
      q.push(
        Dn(T, {
          id: `cv-area-prev-${S.key}`,
          x,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: F,
          strokeWidth: W,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: Ke(S)
        })
      );
    }
    const Y = new Set(
      I.filter((S) => ho(S, a.dots)).map((S) => S.key)
    );
    if (Y.size > 0) {
      const S = s ? kr(e, I, { normalize: c, temporal: u }).filter(
        (T) => Y.has(T.key) && T.value !== null
      ) : He(e, {
        series: I.filter((T) => Y.has(T.key)),
        skipNull: !0,
        temporal: u
      });
      q.push(
        Ai(S, {
          id: "cv-area-dots",
          x,
          y: (T) => s ? T.y2 ?? null : T.value,
          z: "label",
          color: "label",
          key: (T) => `${T.key}:${T.i}`,
          r: 3
        })
      );
    }
    return q.push(
      ...sa(a.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: la(e)
      })
    ), q.push(Di({ x: {}, y: !1, marker: !0 })), et({
      marks: q,
      gradients: te,
      x: {
        scale: mo(u),
        axis: (ce = (ae = t.axes) == null ? void 0 : ae.x) != null && ce.hide ? !1 : {
          label: L.x,
          ticks: { format: p }
        }
      },
      y: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (V = (ie = t.axes) == null ? void 0 : ie.y) != null && V.hide ? !1 : {
          label: L.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (S) => {
              var T;
              return c ? Xe(S) : De(n, (T = t.axes) == null ? void 0 : T.y).value(S, P, "axis");
            }
          }
        }
      },
      color: ta(e, {
        legend: on(t) && e.series.length > 1,
        legendPlacement: At((J = t.legend) == null ? void 0 : J.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((re = t.tooltip) == null ? void 0 : re.show) === !1 ? void 0 : Pn({
        format: n,
        percentShare: c,
        category: m,
        indicator: (se = t.tooltip) == null ? void 0 : se.indicator,
        showTotal: (K = t.tooltip) == null ? void 0 : K.showTotal
      }),
      keyboard: !0,
      controls: h
    });
  }, [e, t, n, a, r, s, c, u, m, p, h]), y = e.series.map(Xt).join(", ") || "Area chart";
  return /* @__PURE__ */ l(nt, { definition: f, ariaLabel: y, className: "cv-chart--fill" });
}
const yu = 0.26, ku = 0.03, Ga = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function wu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var f, y;
  const a = t.familyOptions ?? {}, i = e.series[0], o = aa(i), s = (y = (f = t.colors) == null ? void 0 : f.ramp) != null && y.length ? t.colors.ramp : zn, c = b.useMemo(() => {
    const k = e.categories.map((w, C) => ({
      label: n.category(w),
      value: (i == null ? void 0 : i.data[C]) ?? 0
    }));
    return Cu(k, a.maxSlices).map((w, C) => ({
      ...w,
      token: s[C % s.length]
    }));
  }, [e, n, i, a.maxSlices, s]), u = c.reduce((k, w) => k + w.value, 0), m = c.some((k) => k.value < 0), d = m || c.length === 0 || u <= 0, p = b.useMemo(() => {
    var _, P, I;
    if (d) return null;
    const k = (a.innerRadiusPct ?? 0) / 100, w = k > 0, C = a.showLabels ?? "percent", x = C !== "none", N = x ? Math.min(r.pieRadiusPct / 100, 1 - yu) : r.pieRadiusPct / 100, M = Ul(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), D = [hr(M, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: A }) => A * k,
      outerRadius: ({ radius: A }) => A * N,
      cornerRadius: r.pieCornerRadius
    })];
    if (x) {
      const A = (j) => C === "name" ? j.label : C === "value" ? n.value(j.value, o, "label") : Xe(j.fraction);
      D.push(
        Xn(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          M.filter((j) => j.value > 0 && j.fraction >= ku),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (j) => j.angle,
            radius: N,
            // A few px clear of the arc edge, in PIXELS so the gap is the same
            // whatever size the widget is.
            radiusOffset: 6,
            text: A,
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
      const A = a.centerLabel.value === void 0 || a.centerLabel.value === "total" ? n.value(u, o, "label") : a.centerLabel.value;
      if (D.push(
        Xn([{ id: "cv-pie-center" }], {
          id: "cv-pie-center",
          key: "id",
          angle: 0,
          radius: 0,
          text: () => A,
          fill: "var(--foreground)",
          fontSize: 24,
          fontWeight: 700,
          anchor: "middle",
          baseline: "middle"
        })
      ), a.centerLabel.label) {
        const j = a.centerLabel.label;
        D.push(
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
    const W = {
      domain: c.map((A) => A.label),
      range: c.map((A) => `var(--${A.token})`)
    };
    on(t) && (W.legend = Vr({ placement: At((_ = t.legend) == null ? void 0 : _.position) }));
    const L = i ? i.label || i.key : "";
    return et({
      marks: [
        qi({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: bn().domain([0, Math.PI * 2]) },
          radius: { scale: bn().domain([0, 1]) },
          marks: D
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: W,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((P = t.tooltip) == null ? void 0 : P.show) === !1 ? void 0 : {
        use: jr,
        className: ia((I = t.tooltip) == null ? void 0 : I.indicator),
        content: (A) => {
          const j = A[0];
          if (!j) return { rows: [] };
          const q = j.datum;
          return {
            title: q.label,
            rows: [
              {
                label: L,
                value: `${n.value(q.value, o, "tooltip")} (${Xe(q.fraction)})`,
                color: j.color
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
  if (!p)
    return /* @__PURE__ */ l("div", { style: Ga, children: "No data" });
  const h = c.map((k) => k.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(nt, { definition: p, ariaLabel: h, className: "cv-chart--fill" });
}
function Cu(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, o) => o.value - i.value), r = n.slice(0, t - 1), a = n.slice(t - 1);
  return [...r, { label: "Other", value: a.reduce((i, o) => i + o.value, 0) }];
}
function Nu({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const a = t.familyOptions ?? {}, i = e.raw.annotation, o = (h) => {
    var f, y;
    return ((f = i == null ? void 0 : i.measures[h]) == null ? void 0 : f.shortTitle) ?? ((y = i == null ? void 0 : i.dimensions[h]) == null ? void 0 : y.shortTitle) ?? h;
  }, s = a.x ? o(a.x) : "x", c = a.y ? o(a.y) : "y", u = a.size ? o(a.size) : void 0, m = b.useMemo(() => {
    var q, B, te, Y, X, ae, ce, ie, V, J, re, se, K, S;
    if (!a.x || !a.y) return null;
    const h = Mu(e.raw.rows, a);
    if (h.length === 0) return null;
    const f = !!a.groupBy, y = [];
    if (f)
      for (const T of h)
        T.group !== void 0 && !y.includes(T.group) && y.push(T.group);
    const [k, w] = r.bubbleAreaRange, C = Math.sqrt(Math.max(k, 0) / Math.PI), x = Math.sqrt(Math.max(w, 0) / Math.PI), N = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, M = (B = (q = t.colors) == null ? void 0 : q.ramp) != null && B.length ? t.colors.ramp : zn;
    f ? (N.z = "group", N.color = "group") : N.fill = `var(--${M[0]})`, a.size ? (N.r = (T) => T.size ?? 0, N.rScale = { scale: () => Xs().range([C, x]) }) : N.r = 4;
    const F = [Ai(h, N)];
    (te = a.referenceLines) == null || te.forEach((T, R) => {
      const E = `var(--${T.colorToken ?? "muted-foreground"})`, U = { stroke: E, strokeWidth: 1.25, strokeDasharray: "4 4" };
      T.axis === "y" ? (F.push(Oi([T.value], { id: `cv-ref-${R}`, ...U })), T.label && F.push(
        Jt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${R}`,
          y: "v",
          text: "label",
          fill: E,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (F.push(Ri([T.value], { id: `cv-ref-${R}`, ...U })), T.label && F.push(
        Jt([{ v: T.value, label: T.label }], {
          id: `cv-ref-label-${R}`,
          x: "v",
          text: "label",
          fill: E,
          fontSize: 10,
          dy: 8,
          anchor: "start"
        })
      ));
    });
    let D;
    f && (D = {
      domain: y,
      range: y.map((T, R) => `var(--${M[R % M.length]})`)
    }, on(t) && (D.legend = Vr({ placement: At((Y = t.legend) == null ? void 0 : Y.position) })));
    const W = xt((X = t.axes) == null ? void 0 : X.x, s), L = xt((ae = t.axes) == null ? void 0 : ae.y, c), _ = Mt((ce = t.axes) == null ? void 0 : ce.x), P = Mt((ie = t.axes) == null ? void 0 : ie.y), I = a.x, A = a.y, j = a.size;
    return et({
      marks: F,
      x: {
        scale: _.scale,
        nice: _.nice,
        grid: !0,
        axis: (J = (V = t.axes) == null ? void 0 : V.x) != null && J.hide ? !1 : {
          label: W,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (T) => {
              var R;
              return De(n, (R = t.axes) == null ? void 0 : R.x).value(T, I, "axis");
            }
          }
        }
      },
      y: {
        scale: P.scale,
        nice: P.nice,
        grid: !0,
        axis: (se = (re = t.axes) == null ? void 0 : re.y) != null && se.hide ? !1 : {
          label: L,
          ticks: {
            format: (T) => {
              var R;
              return De(n, (R = t.axes) == null ? void 0 : R.y).value(T, A, "axis");
            }
          }
        }
      },
      color: D,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((K = t.tooltip) == null ? void 0 : K.show) === !1 ? void 0 : {
        use: jr,
        className: ia((S = t.tooltip) == null ? void 0 : S.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (T) => {
          const E = T[0];
          if (!E) return { rows: [] };
          const U = E.datum, $ = [
            { label: s, value: n.value(U.x, I, "tooltip") },
            { label: c, value: n.value(U.y, A, "tooltip") }
          ];
          return j && $.push({
            label: u ?? j,
            value: n.value(U.size, j, "tooltip")
          }), { title: U.group, color: E.color, rows: $ };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, a, r, s, c, u]), d = a.groupBy, p = (h) => {
    var y;
    if (!h || !d) return null;
    const f = (y = h.datum) == null ? void 0 : y.group;
    return f === void 0 ? null : { member: d, value: f, label: f };
  };
  return m ? /* @__PURE__ */ l(
    nt,
    {
      definition: m,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: p
    }
  ) : /* @__PURE__ */ l("div", { style: Su, children: "No data" });
}
const Su = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Mu(e, t) {
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
function xu(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function Tu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ru(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function go(e, t, n) {
  const r = (a) => {
    const i = typeof a == "number" ? a : Number(a), o = Number.isFinite(i) ? Ru(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(o * 100)}%, transparent)`;
  };
  return r.copy = () => go(e, t, n), r;
}
function Ou({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: a, y: i, value: o } = xu(t), s = e.raw.rows, c = e.raw.annotation, u = b.useMemo(() => {
    if (!a || !i || !o || s.length === 0) return [];
    const p = wr(s, a), h = wr(s, i), f = /* @__PURE__ */ new Map();
    return s.forEach((y, k) => {
      const w = Tu(y[o]), C = y[p], x = y[h];
      if (w === null || C === null || C === void 0 || x === null || x === void 0)
        return;
      const N = typeof C == "number" ? C : String(C), M = String(x);
      f.set(`${N}\0${M}`, {
        cat: N,
        label: M,
        value: w,
        key: `${N}|${M}`,
        member: o,
        i: k
      });
    }), [...f.values()];
  }, [s, a, i, o]), m = b.useMemo(() => {
    var C, x, N, M, F, D, W, L;
    let p = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY;
    for (const _ of u)
      _.value < p && (p = _.value), _.value > h && (h = _.value);
    const f = (_) => {
      if (!_) return;
      const P = (c == null ? void 0 : c.dimensions[_]) ?? (c == null ? void 0 : c.timeDimensions[_]) ?? (c == null ? void 0 : c.measures[_]);
      return (P == null ? void 0 : P.shortTitle) ?? (P == null ? void 0 : P.title) ?? _;
    }, y = xt((C = t.axes) == null ? void 0 : C.x, f(a)), k = xt((x = t.axes) == null ? void 0 : x.y, f(i)), w = [
      Us(u, {
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
      oa(
        Jt(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (_) => n.value(_.value, _.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), et({
      marks: w,
      x: {
        scale: () => xn(0.05),
        axis: (M = (N = t.axes) == null ? void 0 : N.x) != null && M.hide ? !1 : {
          label: y,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (_) => {
              var P;
              return De(n, (P = t.axes) == null ? void 0 : P.x).category(_);
            }
          }
        }
      },
      y: {
        scale: () => xn(0.05),
        axis: (D = (F = t.axes) == null ? void 0 : F.y) != null && D.hide ? !1 : {
          label: k,
          ticks: {
            format: (_) => {
              var P;
              return De(n, (P = t.axes) == null ? void 0 : P.y).category(_);
            }
          }
        }
      },
      color: {
        scale: go(p, h, r.colorToken ?? "chart-1")
      },
      tooltip: ((W = t.tooltip) == null ? void 0 : W.show) === !1 ? void 0 : Pn({ format: n, indicator: (L = t.tooltip) == null ? void 0 : L.indicator })
    });
  }, [u, t, n, r, c, a, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const d = `Heatmap of ${o ?? "value"} by ${a ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(nt, { definition: m, ariaLabel: d, className: "cv-chart--fill" });
}
function _u(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Au(e) {
  return `cv-kpi-trend--${e}`;
}
function Du(e) {
  var c, u, m, d;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, i = (p) => r.value(p, a.measure, "kpi"), o = vo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((d = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : d.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ l(ju, { value: o, label: s, fmt: i, fo: a }) : /* @__PURE__ */ l(Lu, { ...e, value: o, label: s, fo: a, fmt: i });
}
function Lu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var p;
  const a = n.goodDirection ?? ((p = n.comparison) == null ? void 0 : p.goodDirection) ?? "up", i = t === null ? null : Bu(e.raw.rows, t, n), o = !!n.comparison, s = o && !i && Eu(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((h) => h !== null), m = i ? i.diff : c ? $u(c) : 0, d = Au(_u(m, a));
  return /* @__PURE__ */ v("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ v("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      o && (i ? /* @__PURE__ */ l(zu, { delta: i, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(Iu, {}) : /* @__PURE__ */ l(Fu, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(Pu, { data: e, series: c, colorClass: d }) })
  ] });
}
function Eu(e, t) {
  var r, a, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((o) => !o) : String(n).trim() === "";
}
function Iu() {
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
function Fu() {
  return /* @__PURE__ */ v("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Ii, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function Pu({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = b.useMemo(() => {
    const a = He(e, { series: [t], skipNull: !0 }), i = Mt(void 0);
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
          curve: Zt("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        Dn(a, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: Zt("monotone"),
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
function $u(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function zu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const a = e.diff > 0, i = e.diff === 0, o = i ? !0 : a === (t === "up"), s = i ? Ii : a ? Wr : Br, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const Ft = -(2 * Math.PI) / 3, Cr = 2 * Math.PI / 3, Vu = Cr - Ft;
function ju({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, d;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((d = r.gauge) == null ? void 0 : d.max) ?? Math.max(e ?? 0, 1), o = i > a ? i : a + 1, s = e === null ? a : Math.max(a, Math.min(o, e)), c = (e === null ? void 0 : Wu(e, r)) ?? "chart-1", u = b.useMemo(() => {
    const p = (s - a) / (o - a), h = Ft + p * Vu, f = ({ radius: w }) => w * 0.7, y = hr([{ startAngle: Ft, endAngle: Cr }], {
      id: "cv-gauge-track",
      innerRadius: f,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), k = p > 0 ? [
      y,
      hr([{ startAngle: Ft, endAngle: h }], {
        id: "cv-gauge-value",
        innerRadius: f,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [y];
    return et({
      marks: [
        qi({
          id: "cv-gauge",
          startAngle: Ft,
          endAngle: Cr,
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
      nt,
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
function Wu(e, t) {
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
function Bu(e, t, n) {
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
const fn = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: O("cv-table-row", e),
      ...t
    }
  )
);
fn.displayName = "TableRow";
const Co = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: O("cv-table-head", e),
    ...t
  }
));
Co.displayName = "TableHead";
const Nr = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: O("cv-table-cell", e),
    ...t
  }
));
Nr.displayName = "TableCell";
const qu = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: O("cv-table-caption", e), ...t }));
qu.displayName = "TableCaption";
const No = Hr(
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
), H = b.forwardRef(
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
H.displayName = "Button";
function Uu({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, i = e.raw.annotation, o = b.useMemo(
    () => Ku(a, i, r, n),
    [a, i, r, n]
  ), [s, c] = b.useState(null), [u, m] = b.useState(0), d = r.pageSize ?? 25, p = b.useMemo(() => {
    var N;
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1, x = ((N = o.find((M) => M.member === s.member)) == null ? void 0 : N.key) ?? s.member;
    return [...a].sort((M, F) => Ju(M[x], F[x]) * C);
  }, [a, s, o]), h = Math.max(1, Math.ceil(p.length / d)), f = Math.min(u, h - 1), y = p.slice(f * d, f * d + d), k = (C) => {
    c(
      (x) => (x == null ? void 0 : x.member) === C ? { member: C, dir: x.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0);
  }, w = p.length > 12;
  return /* @__PURE__ */ v("div", { className: "cv-table", children: [
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ v(yo, { children: [
      /* @__PURE__ */ l(ko, { className: "cv-table-header--sticky", children: /* @__PURE__ */ l(fn, { children: o.map((C) => /* @__PURE__ */ l(
        Co,
        {
          className: Ya(C.align),
          style: C.width ? { width: C.width } : void 0,
          children: /* @__PURE__ */ v(
            H,
            {
              variant: "ghost",
              className: "cv-table-sort",
              onClick: () => k(C.member),
              children: [
                C.label,
                /* @__PURE__ */ l(Qu, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
              ]
            }
          )
        },
        C.member
      )) }) }),
      /* @__PURE__ */ v(wo, { children: [
        y.map((C, x) => /* @__PURE__ */ l(fn, { children: o.map((N) => {
          const M = Xu(N.member, C[N.key], r.conditionalFormat);
          return /* @__PURE__ */ l(
            Nr,
            {
              className: O(Ya(N.align), w && "cv-table-cell--compact"),
              style: M ? { color: M } : void 0,
              children: N.render(C[N.key])
            },
            N.member
          );
        }) }, x)),
        y.length === 0 && /* @__PURE__ */ l(fn, { children: /* @__PURE__ */ l(
          Nr,
          {
            colSpan: o.length,
            className: "cv-table-empty",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    p.length > d && /* @__PURE__ */ v("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ v("span", { children: [
        f * d + 1,
        "–",
        Math.min((f + 1) * d, p.length),
        " of",
        " ",
        p.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv-table-pager", children: [
        /* @__PURE__ */ l(
          H,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: f === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          H,
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
function Ku(e, t, n, r) {
  var o;
  const a = e.length > 0 ? Object.keys(e[0]) : Gu(t);
  return ((o = n.columns) != null && o.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = wr(e, c), m = t ? Yu(t, c) : void 0, d = t ? c in t.measures : !1, p = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, h = s.align ?? (d ? "right" : "left"), f = s.format && r.derive ? r.derive(s.format) : r;
    return {
      member: c,
      key: u,
      label: p,
      align: h,
      width: s.width,
      render: (y) => Hu(y, d, c, f)
    };
  });
}
function Hu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Gu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Yu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ya(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Qu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ l(Wr, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Br, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(al, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Ju(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Xu(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Zu(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Zu(e, t, n) {
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
const at = "cv-sidebar--default", em = "cv-sidebar--wide", So = "a date or category", er = [
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
], tm = [
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
], nm = [
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
], rm = [
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
], am = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], im = [
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
], om = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], qe = (e) => om.indexOf(e), $e = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Pi,
    order: qe("bar"),
    component: gu,
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
    icon: ml,
    order: qe("line"),
    component: vu,
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
    icon: il,
    order: qe("area"),
    component: bu,
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
    icon: ul,
    order: qe("pie"),
    component: wu,
    optionsSchema: We.pie,
    defaults: Be.pie,
    wells: nm,
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
    icon: cl,
    order: qe("scatter"),
    component: Nu,
    optionsSchema: We.scatter,
    defaults: Be.scatter,
    wells: rm,
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
    icon: ll,
    order: qe("kpi"),
    component: Du,
    optionsSchema: We.kpi,
    defaults: Be.kpi,
    wells: am,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: em
  },
  table: {
    family: "table",
    label: "Table",
    icon: sl,
    order: qe("table"),
    component: Uu,
    optionsSchema: We.table,
    defaults: Be.table,
    wells: im,
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
    icon: ol,
    order: qe("heatmap"),
    component: Ou,
    optionsSchema: We.heatmap,
    defaults: Be.heatmap,
    wells: tm,
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
}, sm = $e.bar, lm = $e.line, cm = $e.area, um = $e.pie, mm = $e.scatter, dm = $e.heatmap, fm = $e.kpi, hm = $e.table, ca = [
  sm,
  lm,
  cm,
  um,
  mm,
  dm,
  fm,
  hm
], pm = g.any();
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
      return ((s = n.get(o)) == null ? void 0 : s.defaults) ?? su;
    },
    optionsSchema: (o) => {
      var s;
      return ((s = n.get(o)) == null ? void 0 : s.optionsSchema) ?? pm;
    },
    resolveOptions: (o) => lu(o, i.defaults(o.family))
  };
  return i;
}
const $n = ua(ca);
function gm(e, t = $n) {
  return t.resolveOptions(e);
}
const Qa = {
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
function Mo(e) {
  return e ? { ...Qa, ...e } : Qa;
}
function ma(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function vm(e) {
  const t = Math.floor(e ?? dn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function bm(e, t) {
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
function ym(e) {
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
function km(e, t) {
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
function wm(e) {
  const { unit: t, quantity: n, convert: r, ...a } = e ?? {};
  return { ...a, format: { kind: "percent", decimals: 0 } };
}
function Cm(e, t, n) {
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
function Nm(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = km(e.series, r);
    return {
      ...e,
      series: e.series.map((o, s) => ({
        ...o,
        data: i[s],
        meta: wm(o.meta)
      }))
    };
  }
  const a = vm(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? bm(i.data, a) : ym(i.data)
    }))
  };
}
function Sm(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const ty = Object.fromEntries(
  Object.entries($e).map(([e, t]) => [e, t.component])
);
function xo({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: i,
  editing: o,
  updateFamilyOptions: s,
  registry: c = $n,
  theme: u
}) {
  const m = ee(() => gm(t, c), [t, c]), d = ee(() => Mo(u), [u]), p = c.get(m.family), h = (p == null ? void 0 : p.queryless) ?? !1, f = ma(p) ? m.transform : void 0, y = ee(() => Nm(e, f), [e, f]);
  if (!h && (a != null && a.loading))
    return /* @__PURE__ */ l(Pc, { className: "cv-chart-skeleton" });
  if (!h && (a != null && a.error))
    return /* @__PURE__ */ v(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(qr, {}),
      /* @__PURE__ */ l(En, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(In, { children: a.error.message })
    ] });
  if (!h && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const k = n && Object.keys(n).length > 0 ? n : Sm(y), w = Cm(
    r ?? Xr(e.raw.annotation, m, Jr),
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
const zn = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], tr = 8;
function Ja(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function To(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : zn, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function Mm(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function un(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Mm(e[n]);
  return t;
}
function xm(e) {
  return {
    measures: un(e.measures ?? {}),
    dimensions: un(e.dimensions ?? {}),
    segments: un(e.segments ?? {}),
    timeDimensions: un(e.timeDimensions ?? {})
  };
}
function wt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Vn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let o = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!o || o.kind === void 0 || o.kind === "auto") && (o = { ...o, kind: "currency" }), o && (a.format = o), t != null && t.stackId && (a.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Tm(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Rm(e, t) {
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
function Om(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, i] of t) {
      const o = jn(r[a]);
      o !== null && (r[a] = i.to(o));
    }
    return r;
  });
}
function _m(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((i) => i === null ? null : a.to(i)));
    }
}
function Ro(e, t, n, r, a = $n) {
  const i = xm(e.annotation()), o = Rm(i, r), s = Om(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const d = n.measures ?? [];
    if (a.require(t.family).measureOnly && d.length > 0) {
      const p = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => jn(p[y])),
          meta: { ...Vn(wt(i, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Xa(h, t.colors), {
        categories: d.map(
          (y) => {
            var k, w;
            return ((k = wt(i, y)) == null ? void 0 : k.shortTitle) ?? ((w = wt(i, y)) == null ? void 0 : w.title) ?? y;
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
  const u = c.series.mode === "measures" ? Dm(e, c.series, t, i) : Lm(e, c.category.member, c.series, t, i), m = Am(e, c);
  return _m(u, o), Xa(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || Ja(u)
  };
}
function Am(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Dm(e, t, n, r) {
  const { members: a, meta: i } = t, o = e.chartPivot();
  return a.map((s) => {
    const c = wt(r, s), u = i == null ? void 0 : i[s], m = o.map((d) => jn(d[s]));
    return {
      key: s,
      label: Tm(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Vn(c, u, n.format), measure: s }
    };
  });
}
function Lm(e, t, n, r, a) {
  const { value: i, values: o, pivot: s } = n, c = o && o.length > 0 ? o : [i], u = new Set(c), m = c.length > 1, d = { x: [t], y: [s, "measures"] }, h = e.seriesNames(d).filter((w) => {
    const C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return C === void 0 || u.has(C);
  }), f = e.chartPivot(d), y = wt(a, i), k = h.map((w) => {
    var _, P;
    const C = (_ = w.yValues) == null ? void 0 : _[0], x = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : i, N = wt(a, x), M = (P = n.meta) == null ? void 0 : P[x], F = (M == null ? void 0 : M.label) ?? (N == null ? void 0 : N.shortTitle) ?? (N == null ? void 0 : N.title) ?? x, D = C ?? w.shortTitle ?? w.title ?? w.key, W = m ? `${F} · ${D}` : D, L = f.map((I) => jn(I[w.key]));
    return {
      key: w.key,
      label: W,
      data: L,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Vn(N ?? y, M, r.format),
        measure: x
      }
    };
  });
  return Em(k, y, r.format);
}
function Em(e, t, n) {
  var m, d, p;
  if (e.length <= tr) return e;
  const r = (h) => h.data.reduce((f, y) => f + (y ?? 0), 0), a = [...e].sort((h, f) => r(f) - r(h)), i = a.slice(0, tr - 1), o = a.slice(tr - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (h, f) => {
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
    meta: { ...Vn(t, void 0, n), ...(p = (d = i[0]) == null ? void 0 : d.meta) != null && p.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function jn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ne = (e) => fe(e, "yyyy-MM-dd");
function Im(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [ne(t), ne(t)];
  if (n === "yesterday") {
    const o = be(t, 1);
    return [ne(o), ne(o)];
  }
  if (n === "this week") return [ne(kn(t)), ne(wn(t))];
  if (n === "this month") return [ne(ot(t)), ne(Bt(t))];
  if (n === "this quarter") return [ne(st(t)), ne(qt(t))];
  if (n === "this year") return [ne(lt(t)), ne(Ut(t))];
  if (n === "last week") {
    const o = fr(t, 1);
    return [ne(kn(o)), ne(wn(o))];
  }
  if (n === "last month") {
    const o = ct(t, 1);
    return [ne(ot(o)), ne(Bt(o))];
  }
  if (n === "last quarter") {
    const o = ut(t, 1);
    return [ne(st(o)), ne(qt(o))];
  }
  if (n === "last year") {
    const o = mt(t, 1);
    return [ne(lt(o)), ne(Ut(o))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const a = Number(r[1]);
  if (!Number.isFinite(a) || a < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [ne(be(t, a - 1)), ne(t)] : i.startsWith("week") ? [ne(be(t, a * 7 - 1)), ne(t)] : i.startsWith("month") ? [ne(ot(ct(t, a))), ne(Bt(ct(t, 1)))] : i.startsWith("quarter") ? [ne(st(ut(t, a))), ne(qt(ut(t, 1)))] : [ne(lt(mt(t, a))), ne(Ut(mt(t, 1)))];
}
function Oo(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function da(e) {
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
  const t = da(e);
  return t === void 0 ? void 0 : Oo(t);
}
function fa(e) {
  const t = da(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Tt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Fm = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Pm(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function en(e, t, n) {
  var r;
  if (ke(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function $m(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = en(o, t, n);
    if (!Tt(s))
      if (Array.isArray(s))
        for (const c of s)
          Tt(c) || a.push(c);
      else
        a.push(s);
  }
  if (a.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && a.length === 1 && typeof a[0] == "string" ? Im(a[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? a };
}
function zm(e, t, n) {
  if ("and" in e) {
    const r = Sr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Sr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return $m(e, t, n);
}
function Sr(e, t, n) {
  const r = [];
  for (const a of e) {
    const i = zm(a, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function Vm(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const a = en(e.dateRange, t, n);
    Tt(a) || (r.dateRange = a);
  }
  if (e.granularity !== void 0) {
    const a = en(e.granularity, t, n);
    Tt(a) || (r.granularity = a === St ? fa(r.dateRange) : a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Ao(e, t, n) {
  const r = Fm(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((i) => Vm(i, r, t))), e.filters !== void 0) {
    const i = Sr(e.filters, r, t);
    i.length > 0 && (a.filters = i);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = en(e.limit, r, t);
    Tt(i) || (a.limit = i);
  }
  if (e.offset !== void 0) {
    const i = en(e.offset, r, t);
    Tt(i) || (a.offset = i);
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
function jm(e, t) {
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
class Wm extends Error {
}
const Bm = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Wm(`"${e}" cannot be parsed into a number`);
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
class qm extends Error {
}
class ei extends Error {
}
class Um extends Error {
}
class nr extends Error {
}
class Km extends Error {
}
class Hm {
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
      throw new Um(`Cannot convert incompatible measures of ${a.measure} and ${i.measure}`);
    let o = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (o = this.cls.sub(o, this.convertFraction(i.unit.anchor_shift))), i.system != a.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new nr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${a.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new nr(`Unable to find anchor for "${i.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, d = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        o = m(o, this.cls);
      else if (typeof d == "number")
        o = this.cls.mul(o, d);
      else if (Za(d))
        o = this.cls.mul(o, this.convertFraction(d));
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
        throw new Km(`Meausure "${t}" not found.`);
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
    throw new qm(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Gm(e) {
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
function Ym(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Gm(e);
  return (r) => new Hm({
    measures: e,
    unitCache: n,
    cls: Bm
  }, r);
}
const Qm = {
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
}, Jm = {
  systems: {
    metric: Qm
  }
}, Xm = {
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
}, Zm = {
  systems: {
    SI: Xm
  }
}, ed = {
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
}, td = {
  systems: {
    SI: ed
  }
}, nd = {
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
}, rd = {
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
}, ad = {
  systems: {
    metric: nd,
    imperial: rd
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
}, id = {
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
}, od = {
  systems: {
    SI: id
  }
}, sd = {
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
}, ld = {
  systems: {
    SI: sd
  }
}, cd = {
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
}, ud = {
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
}, md = {
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
}, dd = {
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
}, fd = {
  systems: {
    bit: cd,
    byte: ud,
    IECBit: md,
    IECByte: dd
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
}, hd = {
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
}, pd = {
  systems: {
    metric: hd
  }
}, gd = {
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
}, vd = {
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
}, bd = {
  systems: {
    SI: gd,
    nutrition: vd
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
}, yd = {
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
}, kd = {
  systems: {
    SI: yd
  }
}, wd = {
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
}, Cd = {
  systems: {
    SI: wd
  }
}, Nd = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Sd = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Md = {
  systems: {
    metric: Nd,
    imperial: Sd
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
}, xd = {
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
}, Td = {
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
}, Rd = {
  systems: {
    metric: xd,
    imperial: Td
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
}, Od = {
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
}, _d = {
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
}, Ad = {
  systems: {
    metric: Od,
    imperial: _d
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
}, Dd = {
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
}, Ld = {
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
}, Ed = {
  systems: {
    metric: Dd,
    imperial: Ld
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
}, Id = {
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
}, Fd = {
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
}, Pd = {
  systems: {
    metric: Id,
    imperial: Fd
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
}, $d = {
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
}, zd = {
  systems: {
    SI: $d
  }
}, Vd = {
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
}, jd = {
  systems: {
    unit: Vd
  }
}, Wd = {
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
}, Bd = {
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
}, qd = {
  systems: {
    metric: Wd,
    imperial: Bd
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
}, Ud = {
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
}, Kd = {
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
}, Hd = {
  systems: {
    metric: Ud,
    imperial: Kd
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
}, Gd = {
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
}, Yd = {
  systems: {
    SI: Gd
  }
}, Qd = {
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
}, Jd = {
  systems: {
    SI: Qd
  }
}, Xd = {
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
}, Zd = {
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
}, ef = {
  systems: {
    metric: Xd,
    imperial: Zd
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
}, tf = {
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
}, nf = {
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
}, rf = {
  systems: {
    metric: tf,
    imperial: nf
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
}, af = {
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
}, of = {
  systems: {
    SI: af
  }
}, sf = {
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
}, lf = {
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
}, cf = {
  systems: {
    metric: sf,
    imperial: lf
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
}, uf = {
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
}, mf = {
  systems: {
    SI: uf
  }
}, df = {
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
}, ff = {
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
}, hf = {
  systems: {
    metric: df,
    imperial: ff
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
}, pf = {
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
}, gf = {
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
}, vf = {
  systems: {
    metric: pf,
    imperial: gf
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
}, bf = {
  acceleration: Jm,
  angle: Zm,
  apparentPower: td,
  area: ad,
  charge: od,
  current: ld,
  digital: fd,
  each: pd,
  energy: bd,
  force: kd,
  frequency: Cd,
  illuminance: Md,
  length: Rd,
  mass: Ad,
  massFlowRate: Ed,
  pace: Pd,
  partsPer: zd,
  pieces: jd,
  power: qd,
  pressure: Hd,
  reactiveEnergy: Yd,
  reactivePower: Jd,
  speed: ef,
  torque: cf,
  temperature: rf,
  time: of,
  voltage: mf,
  volume: hf,
  volumeFlowRate: vf
}, yf = Ym(bf), kf = {
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
function wf(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => yf(t).from(e.from).to(e.to)
  };
}
const Mr = {
  ...Object.fromEntries(
    Object.entries(kf).map(([e, t]) => [e, wf(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Wn(e) {
  return e ? { ...Mr, ...e } : Mr;
}
function Cf(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Nf(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Sf(e) {
  return e != null && e.quantity ? Nf(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Mf = {
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
  const n = e * (Mf[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
function rr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [i, o] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= i) return Lo((e / i).toFixed(n.decimals ?? 1)) + o;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function xf(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ni(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Eo(e = Mr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Jr(t);
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
      if (i.kind === "number") return ni(rr(n, t), i.prefix, i.suffix);
    }
    if (a === "time") return ti(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return ni(rr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const o = r == null ? void 0 : r.unit, s = o ? xf(a, o) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${rr(n, t)}${u}`;
  };
}
const Io = b.createContext(null);
function Tf({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(Io.Provider, { value: e, children: t });
}
function Fo() {
  return b.useContext(Io) ?? void 0;
}
const Bn = xi(null);
Bn.displayName = "CubeVizContext";
function Le() {
  const e = zr(Bn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function rt() {
  return Le().families;
}
function Rf(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function ny({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: i,
  interactions: o,
  children: s
}) {
  const c = (i ?? []).map((C) => C.family).join("|"), u = ee(
    () => ua(ca, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ee(
    () => Rf(e) ? Ic(e) : e,
    [e]
  ), d = ee(
    () => {
      var C;
      return {
        chartRamp: (C = t == null ? void 0 : t.chartRamp) != null && C.length ? t.chartRamp : zn,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Mo(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), p = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ee(() => a ?? {}, [a]), f = ee(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), y = ee(
    () => ({
      cubeClient: m,
      registry: h,
      families: u,
      locale: p,
      theme: d,
      maps: f
    }),
    [m, h, u, p, d, f]
  ), [k, w] = dt(null);
  return /* @__PURE__ */ l(Bn.Provider, { value: y, children: /* @__PURE__ */ l(
    "div",
    {
      ref: w,
      className: O(
        "cv-root",
        d.mode === "dark" && "dark",
        d.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(Tf, { container: k, children: /* @__PURE__ */ l(
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
function ha({
  families: e,
  children: t
}) {
  const n = Le(), r = (e ?? []).map((i) => i.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: ua(ca, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(de, { children: t }) : /* @__PURE__ */ l(Bn.Provider, { value: a, children: t });
}
function Of(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const _f = 5e3;
function Po(e, t) {
  const { cubeClient: n } = Le(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: _f } : e,
    [e]
  ), i = ee(() => JSON.stringify(a), [a]), [o, s] = dt({ isLoading: !r }), [c, u] = dt(0), m = Ge(() => u((d) => d + 1), []);
  return rn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let d = !0;
    const p = new AbortController();
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: p.signal }).then((h) => {
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
      d = !1, p.abort();
    };
  }, [n, i, r, c]), { ...o, refetch: m };
}
const qn = xi(null);
qn.displayName = "DashboardContext";
function pa({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = it(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: jm(r, t), key: r });
  const i = a.current.store, o = Af(i, r);
  return Vs(qn.Provider, { value: o }, n);
}
function Af(e, t) {
  const n = Ge(
    (i, o) => e.set(i, o),
    [e]
  ), r = Ge(
    (i) => Ao(i, e.getAll(), t),
    [e, t]
  ), a = Ge(
    (i) => Pm(i, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Df(e) {
  const t = Ti(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function $o() {
  const e = zr(qn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Df(e);
}
function sn() {
  return zr(qn);
}
const Lf = () => () => {
}, Ef = Object.freeze({}), If = Object.freeze([]);
function ar(e, t, n) {
  var x;
  const r = sn(), { locale: a } = Le(), i = rt(), o = it(null);
  o.current === null && (o.current = Do());
  const s = o.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), m = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? Ef,
    (r == null ? void 0 : r.decls) ?? If
  ) : e, d = Ti(
    u && r ? r.store.subscribe : Lf,
    m,
    m
  ), { resultSet: p, isLoading: h, error: f, refetch: y } = Po(d, { skip: n == null ? void 0 : n.skip }), k = ((x = t.format) == null ? void 0 : x.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = ee(() => Wn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (p)
      return Ro(p, t, d, { unitSystem: k, conversions: w }, i);
  }, [p, t, d, k, w, i]), isLoading: h, error: f, refetch: y, resolvedQuery: d };
}
function ze() {
  const { cubeClient: e } = Le(), [t, n] = dt({ isLoading: !0 });
  return rn(() => {
    let r = !0;
    return n({ isLoading: !0 }), Fc(e).then((a) => {
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
function Un() {
  const { locale: e } = Le(), t = b.useMemo(() => Wn(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return b.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function ry() {
  const { locale: e } = Le(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? Eo(Wn(n)),
    [t, n]
  );
}
function zo() {
  const [e, t] = dt(0), n = it(null), r = it(null), a = it(null), i = it(0), o = Ge((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== i.current && (i.current = u, t(u));
    }));
  }, []), s = Ge(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = Ge(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== i.current && (i.current = m, t(m));
      const d = new ResizeObserver((p) => {
        var h, f;
        for (const y of p) {
          const k = ((f = (h = y.contentBoxSize) == null ? void 0 : h[0]) == null ? void 0 : f.inlineSize) ?? y.contentRect.width;
          o(k);
        }
      });
      d.observe(u), r.current = d;
    },
    [o, s]
  );
  return rn(() => s, [s]), [c, e];
}
const Ff = "day";
function Pf(e, t) {
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
        granularity: r.granularity ?? Ff,
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
const Z = (e) => fe(e, "yyyy-MM-dd");
function $f(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = yn(e[0]), i = yn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(i.getTime())) return;
    const o = nl(i, a) + 1;
    return [Z(be(a, o)), Z(be(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = be(t, 1);
    return [Z(a), Z(a)];
  }
  if (n === "yesterday") {
    const a = be(t, 2);
    return [Z(a), Z(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), i = r[2];
    if (i.startsWith("day")) return [Z(be(t, 2 * a - 1)), Z(be(t, a))];
    if (i.startsWith("week")) return [Z(be(t, 14 * a - 1)), Z(be(t, 7 * a))];
    if (i.startsWith("month"))
      return [Z(ot(ct(t, 2 * a))), Z(be(ot(ct(t, a)), 1))];
    if (i.startsWith("quarter"))
      return [Z(st(ut(t, 2 * a))), Z(be(st(ut(t, a)), 1))];
    if (i.startsWith("year"))
      return [Z(lt(mt(t, 2 * a))), Z(be(lt(mt(t, a)), 1))];
  }
  if (n === "this week") {
    const a = fr(t, 1);
    return [Z(kn(a)), Z(wn(a))];
  }
  if (n === "this month") {
    const a = ct(t, 1);
    return [Z(ot(a)), Z(Bt(a))];
  }
  if (n === "this quarter") {
    const a = ut(t, 1);
    return [Z(st(a)), Z(qt(a))];
  }
  if (n === "this year") {
    const a = mt(t, 1);
    return [Z(lt(a)), Z(Ut(a))];
  }
  if (n === "last week") {
    const a = fr(t, 2);
    return [Z(kn(a)), Z(wn(a))];
  }
  if (n === "last month") {
    const a = ct(t, 2);
    return [Z(ot(a)), Z(Bt(a))];
  }
  if (n === "last quarter") {
    const a = ut(t, 2);
    return [Z(st(a)), Z(qt(a))];
  }
  if (n === "last year") {
    const a = mt(t, 2);
    return [Z(lt(a)), Z(Ut(a))];
  }
}
function zf(e, t, n = $n) {
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
  const s = $f(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Vf = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function ga({
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
  const { registry: c, locale: u, theme: m } = Le(), d = rt(), p = ((q = d.get(t.family)) == null ? void 0 : q.queryless) ?? !1, h = ee(() => {
    var B;
    return (B = t.format) != null && B.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), f = ee(() => {
    const B = e ?? {};
    return B.timezone || !(u != null && u.timezone) ? B : { ...B, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: y, isLoading: k, error: w, refetch: C, resolvedQuery: x } = ar(
    f,
    h,
    { skip: p }
  ), N = ee(() => Pf(f, h), [f, h]), M = ar(
    (N == null ? void 0 : N.query) ?? f,
    (N == null ? void 0 : N.chart) ?? h,
    { skip: !N }
  ), F = ee(
    () => zf(x, h, d),
    [x, h, d]
  ), D = ar(
    (F == null ? void 0 : F.query) ?? f,
    h,
    { skip: !F, skipResolve: !0 }
  ), W = ee(
    () => ({ [h.family]: Of(c, h.family, d) }),
    [c, h.family, d]
  ), L = ee(() => {
    let B = y ?? Vf;
    if (N && M.data) {
      B = { ...B, series: M.data.series, categories: M.data.categories };
      const te = B.raw.rows.length > 0, Y = B.series.some((X) => X.data.some((ae) => ae !== null));
      B = { ...B, empty: !te && !Y };
    }
    if (F && D.data) {
      if (F.mode === "kpiRow") {
        const te = D.data.raw.rows[0];
        if (te) {
          const Y = B.raw.rows[0];
          B = {
            ...B,
            raw: { ...B.raw, rows: Y ? [Y, te] : [te] }
          };
        }
      } else if (!D.data.empty) {
        const te = new Map(D.data.series.map((Y) => [Y.key, Y]));
        if (!B.empty && B.series.length > 0) {
          const Y = B.categories.length, X = B.series.map((ae) => {
            const ce = te.get(ae.key), ie = Array.from({ length: Y }, (V, J) => (ce == null ? void 0 : ce.data[J]) ?? null);
            return {
              ...ae,
              key: `${ae.key}__prev`,
              label: `${ae.label} (prev)`,
              colorToken: ae.colorToken,
              data: ie,
              meta: { ...ae.meta, companion: !0 }
            };
          });
          B = { ...B, series: [...B.series, ...X] };
        } else {
          const Y = D.data.series.map((X) => ({
            ...X,
            key: `${X.key}__prev`,
            label: `${X.label} (prev)`,
            data: [...X.data],
            meta: { ...X.meta, companion: !0 }
          }));
          B = {
            ...B,
            categories: D.data.categories,
            series: Y,
            empty: !1
          };
        }
      }
    }
    return B;
  }, [y, N, M.data, F, D.data]);
  rn(() => {
    n == null || n({ rows: L.raw.rows, refetch: C, isLoading: k });
  }, [n, L.raw.rows, C, k]);
  const _ = {}, P = ee(
    () => u.formatValue ?? Eo(Wn(u.units)),
    [u.formatValue, u.units]
  ), I = ee(
    () => Xr(L.raw.annotation, h, P, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [L.raw.annotation, h, P, u.locale, u.unitSystem]
  ), A = h.mapping, j = ee(
    () => ({
      categoryMember: A == null ? void 0 : A.category.member,
      pivotMember: (A == null ? void 0 : A.series.mode) === "pivot" ? A.series.pivot : void 0,
      formatCategory: I.category
    }),
    [A, I]
  );
  return /* @__PURE__ */ l(
    ea,
    {
      widgetId: i,
      target: j,
      onRangeSelect: o,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        xo,
        {
          data: L,
          options: h,
          config: _,
          format: I,
          state: p ? { loading: !1 } : { loading: k && !y, error: w },
          components: W,
          registry: d,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: a
        }
      )
    }
  );
}
function jf({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    ga,
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
function Wf(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Bf({ doc: e }) {
  const t = Wf(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = Ki(
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
const hn = [
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
], qf = Object.fromEntries(
  hn.map((e) => [e.value, e.label])
);
function ri(e) {
  return qf[e.trim().toLowerCase()] ?? e;
}
const Uf = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Kf({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = ql(), a = O(No({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ v("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: O(a, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(Ur, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: fe(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: O(a, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(an, {})
      }
    )
  ] });
}
function Hf({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
    Bl,
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
        MonthCaption: Kf,
        DayButton: Hf,
        Chevron: ({ orientation: a, className: i, ...o }) => /* @__PURE__ */ l(a === "left" ? Ur : an, { className: O("cv-icon", i), ...o })
      },
      ...r
    }
  );
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Root, { "data-slot": "popover", ...e });
}
function Oe({
  ...e
}) {
  return /* @__PURE__ */ l(Cn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function _e({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const a = Fo();
  return /* @__PURE__ */ l(Cn.Portal, { container: a, children: /* @__PURE__ */ l(
    Cn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: O("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Se({
  ...e
}) {
  return /* @__PURE__ */ l(we.Root, { "data-slot": "select", ...e });
}
function xr({
  ...e
}) {
  return /* @__PURE__ */ l(we.Group, { "data-slot": "select-group", ...e });
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ l(we.Value, { "data-slot": "select-value", ...e });
}
function xe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    we.Trigger,
    {
      "data-slot": "select-trigger",
      className: O("cv-select-trigger", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(we.Icon, { asChild: !0, children: /* @__PURE__ */ l(tt, { className: "cv-select-trigger-icon" }) })
      ]
    }
  );
}
function Gf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    we.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(dl, {})
    }
  );
}
function Yf({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    we.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: O("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(tt, {})
    }
  );
}
function Te({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const a = Fo();
  return /* @__PURE__ */ l(we.Portal, { container: a, children: /* @__PURE__ */ v(
    we.Content,
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
        /* @__PURE__ */ l(Gf, {}),
        /* @__PURE__ */ l(
          we.Viewport,
          {
            className: O(
              "cv-select-viewport",
              n === "popper" && "cv-select-viewport--popper"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Yf, {})
      ]
    }
  ) });
}
function Tr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    we.Label,
    {
      "data-slot": "select-label",
      className: O("cv-select-label", e),
      ...t
    }
  );
}
function he({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    we.Item,
    {
      "data-slot": "select-item",
      className: O("cv-select-item", e),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "cv-select-item-indicator", children: /* @__PURE__ */ l(we.ItemIndicator, { children: /* @__PURE__ */ l(gt, {}) }) }),
        /* @__PURE__ */ l(we.ItemText, { children: t })
      ]
    }
  );
}
const Rt = "cv-field", Qf = "cv-field-label", Pt = "yyyy-MM-dd";
function Jf(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ai(e) {
  if (!e) return;
  const t = Ei(e, Pt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Xf({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Uf, [i, o] = dt(!1), s = typeof e == "string", [c, u] = Jf(e), m = ai(c), d = ai(u), p = m ? { from: m, to: d } : void 0;
  let h;
  s ? h = ri(e) : m && d ? h = `${fe(m, "MMM d, yyyy")} – ${fe(d, "MMM d, yyyy")}` : m ? h = fe(m, "MMM d, yyyy") : h = "Pick a date range";
  const f = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Re, { open: i, onOpenChange: o, children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(
      H,
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
    /* @__PURE__ */ v(_e, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: a.map((y) => /* @__PURE__ */ l(
        H,
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
          selected: p,
          defaultMonth: m,
          disabled: f,
          onSelect: (y) => {
            y != null && y.from && y.to ? t([fe(y.from, Pt), fe(y.to, Pt)]) : y != null && y.from ? t([fe(y.from, Pt), fe(y.from, Pt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Zf = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function eh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = $o(), i = r.rangeVariable ? da(a(r.rangeVariable)) : void 0, o = r.options ?? (i !== void 0 ? Oo(i) : Zf), s = typeof e == "string" ? e : "", c = o.join(",");
  return rn(() => {
    s && !o.includes(s) && t(o[0]);
  }, [s, c]), /* @__PURE__ */ v(
    Se,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(xe, { className: Rt, children: /* @__PURE__ */ l(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Te, { children: o.map((u) => /* @__PURE__ */ l(he, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function th({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const i = new Set(
      (Array.isArray(e) ? e : []).map((o) => String(o))
    );
    return /* @__PURE__ */ l(
      "select",
      {
        multiple: !0,
        className: O(Rt, "cv-field--multi"),
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
    Se,
    {
      value: a,
      onValueChange: (i) => {
        const o = r.options.find((s) => String(s.value) === i);
        t(o ? o.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(xe, { className: Rt, children: /* @__PURE__ */ l(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Te, { children: r.options.map((i) => /* @__PURE__ */ l(he, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function nh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: i } = ze(), o = ee(() => {
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
      className: Rt,
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
function rh({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: "text",
      className: Rt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function ah({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ l(
    "input",
    {
      type: "number",
      className: Rt,
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
function ih({ value: e, onChange: t, decl: n }) {
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
const oh = {
  dateRange: Xf,
  granularity: eh,
  select: th,
  memberSelect: nh,
  text: rh,
  number: ah,
  toggle: ih
};
function sh({ control: e, title: t }) {
  var h;
  const { registry: n } = Le(), { decls: r, resolveValue: a, setVar: i } = $o(), o = ee(
    () => r.find((f) => f.name === e.variable),
    [r, e.variable]
  ), s = js();
  if (!o)
    return /* @__PURE__ */ v("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((h = n.controls) == null ? void 0 : h[c]) ?? oh[c], m = a(e.variable), d = (f) => i(e.variable, f), p = t ?? o.label ?? o.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: d, decl: o, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ l("label", { className: Qf, htmlFor: s, children: p }),
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
const qo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: O("cv-card-title", e),
      ...t
    }
  )
);
qo.displayName = "CardTitle";
const lh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-description", e), ...t })
);
lh.displayName = "CardDescription";
const ch = b.forwardRef(
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
ch.displayName = "CardAction";
const Uo = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-content", e), ...t })
);
Uo.displayName = "CardContent";
const uh = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: O("cv-card-footer", e), ...t })
);
uh.displayName = "CardFooter";
const Rn = "cube-viz-drag-handle";
function Ko(e) {
  var s;
  const { registry: t } = Le(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: a, dragHandleProps: i, children: o } = e;
  return /* @__PURE__ */ v(Wo, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ v(
      Bo,
      {
        ...i,
        className: O(Rn, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(qo, { className: "cv-widget-chrome-title", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ l(Uo, { className: "cv-widget-chrome-body", children: o })
  ] });
}
class ii extends Ws {
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
    return n ? /* @__PURE__ */ v(Ln, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(qr, {}),
      /* @__PURE__ */ l(En, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(In, { children: n.message })
    ] }) : this.props.children;
  }
}
function mh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let o = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(o) && !Number.isFinite(Number(o)) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = t.map(n).join(","), a = e.map((i) => t.map((o) => n(i[o])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function dh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function fh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const hh = /* @__PURE__ */ (() => {
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
function Ho(e = {}) {
  return vt || (e.includeStyleProperties ? (vt = e.includeStyleProperties, vt) : (vt = Ye(window.getComputedStyle(document.documentElement)), vt));
}
function On(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function ph(e) {
  const t = On(e, "border-left-width"), n = On(e, "border-right-width");
  return e.clientWidth + t + n;
}
function gh(e) {
  const t = On(e, "border-top-width"), n = On(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Go(e, t = {}) {
  const n = t.width || ph(e), r = t.height || gh(e);
  return { width: n, height: r };
}
function vh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ne = 16384;
function bh(e) {
  (e.width > Ne || e.height > Ne) && (e.width > Ne && e.height > Ne ? e.width > e.height ? (e.height *= Ne / e.width, e.width = Ne) : (e.width *= Ne / e.height, e.height = Ne) : e.width > Ne ? (e.height *= Ne / e.width, e.width = Ne) : (e.width *= Ne / e.height, e.height = Ne));
}
function _n(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function yh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function kh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), a.appendChild(i), i.appendChild(e), yh(a);
}
const Ce = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ce(n, t);
};
function wh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Ch(e, t) {
  return Ho(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Nh(e, t, n, r) {
  const a = `.${e}:${t}`, i = n.cssText ? wh(n) : Ch(n, r);
  return document.createTextNode(`${a}{${i}}`);
}
function oi(e, t, n, r) {
  const a = window.getComputedStyle(e, n), i = a.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const o = hh();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Nh(o, n, a, r)), t.appendChild(s);
}
function Sh(e, t, n) {
  oi(e, t, ":before", n), oi(e, t, ":after", n);
}
const si = "application/font-woff", li = "image/jpeg", Mh = {
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
function xh(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function va(e) {
  const t = xh(e).toLowerCase();
  return Mh[t] || "";
}
function Th(e) {
  return e.split(/,/)[1];
}
function Rr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Rh(e, t) {
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
const ir = {};
function Oh(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function ba(e, t, n) {
  const r = Oh(e, t, n.includeQueryParams);
  if (ir[r] != null)
    return ir[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const i = await Yo(e, n.fetchRequestInit, ({ res: o, result: s }) => (t || (t = o.headers.get("Content-Type") || ""), Th(s)));
    a = Rh(i, t);
  } catch (i) {
    a = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${e}`;
    i && (o = typeof i == "string" ? i : i.message), o && console.warn(o);
  }
  return ir[r] = a, a;
}
async function _h(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : _n(t);
}
async function Ah(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), o = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, o == null || o.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return _n(s);
  }
  const n = e.poster, r = va(n), a = await ba(n, r, t);
  return _n(a);
}
async function Dh(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Kn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Lh(e, t) {
  return Ce(e, HTMLCanvasElement) ? _h(e) : Ce(e, HTMLVideoElement) ? Ah(e, t) : Ce(e, HTMLIFrameElement) ? Dh(e, t) : e.cloneNode(Qo(e));
}
const Eh = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Qo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Ih(e, t, n) {
  var r, a;
  if (Qo(t))
    return t;
  let i = [];
  return Eh(e) && e.assignedNodes ? i = Ye(e.assignedNodes()) : Ce(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = Ye(e.contentDocument.body.childNodes) : i = Ye(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), i.length === 0 || Ce(e, HTMLVideoElement) || await i.reduce((o, s) => o.then(() => Kn(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function Fh(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Ho(n).forEach((i) => {
    let o = a.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), Ce(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), r.setProperty(i, o, a.getPropertyPriority(i));
  });
}
function Ph(e, t) {
  Ce(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ce(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function $h(e, t) {
  if (Ce(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function zh(e, t, n) {
  return Ce(t, Element) && (Fh(e, t, n), Sh(e, t, n), Ph(e, t), $h(e, t)), t;
}
async function Vh(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Kn(u, t, !0));
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
async function Kn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Lh(r, t)).then((r) => Ih(e, r, t)).then((r) => zh(e, r, t)).then((r) => Vh(r, t));
}
const Jo = /url\((['"]?)([^'"]+?)\1\)/g, jh = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Wh = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Bh(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function qh(e) {
  const t = [];
  return e.replace(Jo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Rr(n));
}
async function Uh(e, t, n, r, a) {
  try {
    const i = n ? fh(t, n) : t, o = va(t);
    let s;
    return a || (s = await ba(i, o, r)), e.replace(Bh(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function Kh(e, { preferredFontFormat: t }) {
  return t ? e.replace(Wh, (n) => {
    for (; ; ) {
      const [r, , a] = jh.exec(n) || [];
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
  const r = Kh(e, n);
  return qh(r).reduce((i, o) => i.then((s) => Uh(s, o, t, n)), Promise.resolve(r));
}
async function bt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const i = await Zo(a, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Hh(e, t) {
  await bt("background", e, t) || await bt("background-image", e, t), await bt("mask", e, t) || await bt("-webkit-mask", e, t) || await bt("mask-image", e, t) || await bt("-webkit-mask-image", e, t);
}
async function Gh(e, t) {
  const n = Ce(e, HTMLImageElement);
  if (!(n && !Rr(e.src)) && !(Ce(e, SVGImageElement) && !Rr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await ba(r, va(r), t);
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
async function Yh(e, t) {
  const r = Ye(e.childNodes).map((a) => es(a, t));
  await Promise.all(r).then(() => e);
}
async function es(e, t) {
  Ce(e, Element) && (await Hh(e, t), await Gh(e, t), await Yh(e, t));
}
function Qh(e, t) {
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
async function Jh(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((i, o) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = o + 1;
            const c = i.href, u = ui(c).then((m) => mi(m, t)).then((m) => di(m).forEach((d) => {
              try {
                a.insertRule(d, d.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (p) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
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
        a.href != null && r.push(ui(a.href).then((s) => mi(s, t)).then((s) => di(s).forEach((c) => {
          o.insertRule(c, o.cssRules.length);
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
function Xh(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Xo(t.style.getPropertyValue("src")));
}
async function Zh(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ye(e.ownerDocument.styleSheets), r = await Jh(n, t);
  return Xh(r);
}
function ts(e) {
  return e.trim().replace(/["']/g, "");
}
function ep(e) {
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
async function tp(e, t) {
  const n = await Zh(e, t), r = ep(e);
  return (await Promise.all(n.filter((i) => r.has(ts(i.style.fontFamily))).map((i) => {
    const o = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Zo(i.cssText, o, t);
  }))).join(`
`);
}
async function np(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await tp(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function rp(e, t = {}) {
  const { width: n, height: r } = Go(e, t), a = await Kn(e, t, !0);
  return await np(a, t), await es(a, t), Qh(a, t), await kh(a, n, r);
}
async function ap(e, t = {}) {
  const { width: n, height: r } = Go(e, t), a = await rp(e, t), i = await _n(a), o = document.createElement("canvas"), s = o.getContext("2d"), c = t.pixelRatio || vh(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return o.width = u * c, o.height = m * c, t.skipAutoScale || bh(o), o.style.width = `${u}`, o.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, o.width, o.height)), s.drawImage(i, 0, 0, o.width, o.height), o;
}
async function ip(e, t = {}) {
  return (await ap(e, t)).toDataURL();
}
function op(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function sp(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function lp(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function cp(e, t, n = 2) {
  const r = await ip(e, {
    pixelRatio: n,
    backgroundColor: lp(e),
    cacheBust: !0
  });
  sp(r, `${op(t)}.png`);
}
function up({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, i] = b.useState(!1), [o, s] = b.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const f = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    dh(mh(t), `${f}.csv`);
  }, d = async () => {
    const f = r == null ? void 0 : r.current;
    if (!(!f || a)) {
      i(!0), s(null);
      try {
        await cp(f, e);
      } catch (y) {
        s(y instanceof Error ? y.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, p = (f) => f.stopPropagation(), h = (f = !0) => O("cv-menu-item", !f && "cv-menu-item--disabled");
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ l(
      Oe,
      {
        onMouseDown: p,
        onPointerDown: p,
        onTouchStart: p,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(fl, {})
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv-menu", onMouseDown: p, onPointerDown: p, onTouchStart: p, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: h(), children: [
        /* @__PURE__ */ l(hl, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ v("button", { type: "button", onClick: d, disabled: a, className: h(!a), children: [
        /* @__PURE__ */ l(pl, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !c, className: h(c), children: [
        /* @__PURE__ */ l(gl, {}),
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
        ga,
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
      return /* @__PURE__ */ l(Bf, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(sh, { control: e.control, title: e.title });
  }
}
function Or({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: a
}) {
  const [i, o] = dt({ rows: [] }), s = Ge(
    (m) => o({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = it(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(ii, { children: /* @__PURE__ */ l(fi, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    up,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    Ko,
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
function mp(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const a of ns(e)) {
    const i = (r = (n = a.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && ke(i.dateRange) && t.set(a.id, i.dateRange.var);
  }
  return t;
}
function dp(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (a) => {
    for (const i of a)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const o = (i.values ?? []).find(ke);
        o && t.set(i.member, o.var);
      }
  };
  for (const a of ns(e)) n(((r = a.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function fp({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: a
}) {
  const i = sn(), o = i == null ? void 0 : i.setVar, s = b.useMemo(() => mp(e.widgets), [e.widgets]), c = b.useMemo(() => dp(e.widgets), [e.widgets]), u = b.useRef({ onRangeSelect: n, onPointSelect: r });
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
  ), p = !!(n || t && o && s.size), h = !!(r || t && o && c.size);
  return /* @__PURE__ */ l(
    ea,
    {
      onRangeSelect: p ? m : void 0,
      onPointSelect: h ? d : void 0,
      children: a
    }
  );
}
const hp = "lg", pp = 640;
function gp(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function vp(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function ay({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: a,
  onPointSelect: i
}) {
  const [o, s] = zo(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, d = c.margin ?? [12, 12], p = c.containerPadding ?? d, h = ee(
    () => ({ [hp]: vp(e.layout) }),
    [e.layout]
  ), f = ee(
    () => new Map(e.widgets.map((k) => [k.id, k])),
    [e.widgets]
  ), y = !t && s > 0 && s < pp;
  return /* @__PURE__ */ l(ha, { families: n, children: /* @__PURE__ */ l(pa, { spec: e, children: /* @__PURE__ */ l(
    fp,
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
            padding: `${p[1]}px ${p[0]}px`
          },
          children: gp(e.layout).map((k) => {
            const w = f.get(k.i);
            if (!w) return null;
            const C = k.h * m + (k.h - 1) * d[1];
            return /* @__PURE__ */ l("div", { style: { height: C }, children: /* @__PURE__ */ l(Or, { widget: w, editable: !1 }) }, k.i);
          })
        }
      ) : /* @__PURE__ */ l(
        Ui,
        {
          width: s,
          layouts: h,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: d,
          containerPadding: p,
          dragConfig: { enabled: t, handle: `.${Rn}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((k) => {
            const w = f.get(k.i);
            return w ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(Or, { widget: w, editable: t }) }, k.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function iy({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(ha, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    Ko,
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
        jf,
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
  if (ke(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => rs(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function bp(e) {
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
function yp(e, t) {
  const n = new Set(bp(t));
  return e.filter((r) => n.has(r.type));
}
function kp(e) {
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
function wp(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = a, o = 2;
  for (; r.has(i); ) i = `${a}_${o++}`;
  return i;
}
function Cp(e, t, n) {
  const r = kp(e), a = { name: wp(t, e, n), type: r }, i = t.trim();
  return i && (a.label = i), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const or = Qe.options, _r = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Np(e, t = "None") {
  const n = rs(e, t);
  return n === St ? "Auto" : _r[n] ?? n;
}
const sr = "__none__";
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
  const d = n && n.length > 0 ? n : or, p = e && e !== St && !d.includes(e) ? [...d, e].sort(
    (f, y) => or.indexOf(f) - or.indexOf(y)
  ) : d, h = a ? `Auto (${_r[a]})` : "Auto";
  return /* @__PURE__ */ v(
    Se,
    {
      value: e ?? (i ? sr : ""),
      onValueChange: (f) => t(f === sr ? void 0 : f),
      disabled: c,
      children: [
        /* @__PURE__ */ l(xe, { id: u, className: m, children: /* @__PURE__ */ l(Me, { placeholder: s }) }),
        /* @__PURE__ */ v(Te, { children: [
          i ? /* @__PURE__ */ l(he, { value: sr, children: o }) : null,
          r ? /* @__PURE__ */ l(he, { value: St, children: h }) : null,
          p.map((f) => /* @__PURE__ */ l(he, { value: f, children: _r[f] }, f))
        ] })
      ]
    }
  );
}
function Hn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Sp(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Mp(e) {
  if (!e.meta || typeof e.meta != "object") return;
  const t = e.meta.category;
  return typeof t == "string" && t.length > 0 ? t : void 0;
}
function Ie(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Gn(e) {
  return e ? e.cubes.filter((t) => Ie(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Hn(t),
    joinTargets: Sp(t),
    category: Mp(t)
  })) : [];
}
function Ht(e, t) {
  if (!(!e || !t))
    return Gn(e).find((n) => n.name === t);
}
function ya(e) {
  return e.shortTitle || e.title || e.name;
}
function ft(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function is(e) {
  return ft(e.meta, "group");
}
function xp(e) {
  return ft(e.meta, "geoPoint");
}
function hi(e) {
  const t = ft(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Tp(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function pn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Rp(e, t) {
  if (t)
    return tn(e, "time", t).find(pn);
}
function Op(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = is(a), o = i ? `g:${i.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(o);
    s || (s = { label: i ?? t(a), items: [] }, r.set(o, s), n.push(o)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function ka(e, t) {
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
    label: ya(e),
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
function gn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ya(e),
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
function ss(e, t) {
  return {
    name: e.name,
    label: ya(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function _p(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e.dimensions) {
    const i = a.meta, o = xp({ meta: i });
    !o || !Ie(a) || n.set(o, [...n.get(o) ?? [], a]);
  }
  const r = [];
  for (const [a, i] of n) {
    const o = i.filter(
      (c) => c.type === "number" && hi({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && hi({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || o.length !== 1 || s.length !== 1 || r.push({
      name: Tp(o[0].name, s[0].name),
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
function tn(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Ie(a) || n && a.name !== n) continue;
    const i = Hn(a), o = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(..._p(a, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        Ie(s) && o(os(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        Ie(s) && s.type !== "time" && o(gn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        Ie(s) && s.type === "time" && o(gn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        Ie(s) && s.type === "number" && o(gn(s, a.name));
  }
  return r;
}
function Ap(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Ie(a) || n && !n.has(a.name)) continue;
    const i = Hn(a);
    for (const o of a.segments) {
      if (!Ie(o)) continue;
      const s = ss(o, a.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Fe(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Hn(n), a = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? a(os(i, n.name)) : a(gn(i, n.name)) : void 0;
      const o = n.segments.find((s) => s.name === t);
      if (o) return a(ss(o, n.name));
    }
    return tn(e, "geoPoint").find((n) => n.name === t);
  }
}
function pi(e) {
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
function Dp(e) {
  return e === "number";
}
function Ee(e) {
  return e.target !== void 0;
}
function ve(e, t) {
  return e.kinds.includes(t);
}
function wa(e, t, n) {
  if (!ve(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function ht(e) {
  return e.chart.familyOptions ?? {};
}
function Ca(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function cs(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function Lp(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function Ep(e, t, n) {
  var o, s;
  const r = e.chart;
  if (Ca(r)) return;
  const a = ln(r), i = new Set(n ?? []);
  a && i.add(a);
  for (const c of t)
    if (((o = c.target) == null ? void 0 : o.kind) === "option") {
      const u = ht(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function Dt(e, t, n) {
  var s;
  const r = {}, a = e.chart, i = ht(e), o = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!Ee(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = ln(a);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = cs(a), d = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = o(c, d);
        break;
      }
      case "pivot": {
        const m = Ca(a) ?? Ep(e, t, n);
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
function Na(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Sa(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Ip(e, t) {
  return { ...e, dimensions: Na(e.dimensions, t) };
}
function us(e, t) {
  const n = Sa(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function ms(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function oy(e) {
  return e === void 0 ? Bp : fa(e);
}
const Fp = "last 30 days";
function Et(e, t, n, r) {
  if (Dp(n)) return { ...e, measures: Na(e.measures, t) };
  if (n === "time") {
    const a = cn(e) ?? r;
    return ms(e, {
      dimension: t,
      granularity: (a == null ? void 0 : a.granularity) ?? St,
      dateRange: a ? a.dateRange : Fp
    });
  }
  return Ip(e, t);
}
function $t(e, t, n, r) {
  const a = e.query ?? {}, i = Dt(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return a;
  const o = cn(a);
  if ((o == null ? void 0 : o.dimension) === n) return ms(a, void 0);
  if ((a.measures ?? []).includes(n)) {
    const s = Sa(a.measures, n);
    return { ...a, measures: s.length ? s : void 0 };
  }
  return us(a, n);
}
function Pp(e, t, n, r) {
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
function Gt(e, t, n) {
  var c, u;
  const r = Dt(e, t, n), a = (m) => t.find((d) => {
    var p;
    return ((p = d.target) == null ? void 0 : p.kind) === m;
  }), i = a("category"), o = a("measures"), s = a("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : ln(e.chart),
    measures: o ? r[o.id] ?? [] : cs(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : Ca(e.chart)
  };
}
function Yt(e, t, n) {
  const r = { ...fs(e.chart), ...Lp(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: Pp(n.category, n.measures, n.pivot, r)
    }
  };
}
function An(e, t, n) {
  const r = { ...ht(e), ...n };
  for (const [a, i] of Object.entries(n)) i === void 0 && delete r[a];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Ma(e, t, n, r, a) {
  const i = t.find((u) => u.id === n);
  if (!i || !Ee(i)) return e;
  const o = i.target, s = Dt(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (o.kind) {
    case "category": {
      const u = s[0], m = cn(c);
      u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a, m);
      const d = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...d, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : Na(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = $t(e, t, s[0], n)), c = Et(c, r, a);
      const m = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a);
      const m = Gt({ ...e, query: c }, t, [r]);
      return Yt(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = $t(e, t, u, n)), c = Et(c, r, a), An(e, c, { [o.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(ht(e)[o.key]) ? [...ht(e)[o.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = Et(c, r, a), An(e, c, { [o.key]: u });
    }
  }
}
function $p(e, t, n, r) {
  const a = t.find((s) => s.id === n);
  if (!a || !Ee(a)) return e;
  const i = a.target, o = $t(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: o, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = Gt(e, t), c = Sa(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? o : us(o, s.pivot);
      return Yt(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = Gt(e, t);
      return Yt(e, o, { ...s, pivot: void 0 });
    }
    case "option":
      return An(e, o, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(ht(e)[i.key]) ? ht(e)[i.key] : [];
      return An(e, o, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function zp(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = cn(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Vp(e, t) {
  if (ve(t, e)) return e;
  if (e === "category" && ve(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && ve(t, "category") || e === "time" && ve(t, "category")) return "category";
}
function jp(e, t, n) {
  const r = Dt(e, t), a = /* @__PURE__ */ new Map();
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
    if (!Ee(o) || !o.channel) continue;
    const s = a.get(o.channel);
    if (!(s != null && s.length)) continue;
    const c = o.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = Vp(zp(e, u), o);
      m && (i = Ma(i, n, o.id, u, m));
    }
  }
  return i;
}
function Wp(e, t) {
  const n = [...t];
  let r = 0;
  for (const a of e) {
    if (!Ee(a)) continue;
    const i = n.findIndex((o) => ve(a, o));
    i >= 0 ? (n.splice(i, 1), r += a.optional ? 1 : 3) : a.optional || (r -= 2);
  }
  return r - n.length * 0.5;
}
function zt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ds(e) {
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
function Dr(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function fs(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function ln(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function cn(e) {
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
const Bp = "day";
function Lr(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function qp(e, t, n) {
  const r = n.require(e.chart.family), a = n.require(t), i = Lr(r) && Lr(a) ? jp(e, r.wells, a.wells) : Up(e, a);
  return { ...i, chart: { ...i.chart, family: t } };
}
function Up(e, t) {
  var h;
  const { chart: n } = e, r = e.query ?? {}, a = Dr(n).length ? Dr(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((f) => f.dimension), o = ln(n) ?? ((h = r.dimensions) == null ? void 0 : h[0]) ?? i[0], s = [o, ...r.dimensions ?? [], ...i].filter(
    (f, y, k) => !!f && k.indexOf(f) === y
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!Lr(t)) {
    const f = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: f } } : c;
  }
  const u = [...a], m = [...s], d = (f) => i.includes(f) ? "time" : "category";
  let p = c;
  for (const f of t.wells) {
    if (!f.target || !f.channel) continue;
    const y = ve(f, "category") ? [
      [m, d],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, d]
    ];
    let k = 0;
    for (const [w, C] of y)
      for (let x = 0; x < w.length; ) {
        if (f.cardinality === "one" && k > 0 || !ve(f, C(w[x]))) {
          x += 1;
          continue;
        }
        p = Ma(p, t.wells, f.id, w[x], C(w[x])), w.splice(x, 1), k += 1;
      }
  }
  return p;
}
function ps(e) {
  return Cf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function gs(e) {
  return Sf(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Kp(e, t) {
  return t.require(e).wells;
}
function vs(e, t) {
  var i;
  const n = t.require(e.chart.family), r = Dt(e, n.wells), a = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return a ? { ...r, ...a } : r;
}
function Vt(e, t, n, r, a, i) {
  const o = i.require(t);
  if (o.placeField) return o.placeField(e, n, r, a);
  const s = Ma(e, o.wells, n, r, a);
  return Gp(e, s, o.wells);
}
function Hp(e, t, n, r, a) {
  const i = a.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const o = $p(e, i.wells, n, r);
  return bs(e, o, i.wells);
}
function Gp(e, t, n) {
  return Yp(e, bs(e, t, n));
}
function Yp(e, t) {
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
  const a = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(a.map((m) => m.dimension)), o = new Set(Object.values(Dt(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && o.has(m.dimension));
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
        className: O("cv-input", e),
        ...r
      }
    );
  }
);
pe.displayName = "Input";
function Er({ option: e }) {
  const t = Un();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: ka(e, t) });
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
  const { meta: u, isLoading: m } = ze(), d = b.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return tn(u, n).filter((k) => y.has(k.cube));
    }
    return tn(u, n, e);
  }, [u, n, e, t]), p = b.useMemo(() => {
    const y = Qp(d), k = y.length > 1, w = [];
    for (const [C, x] of y)
      for (const [N, M] of Op(x, () => "Other")) {
        const F = k ? N === "Other" ? C : `${C} · ${N}` : N;
        w.push({ key: `${C}:${N}`, label: F, items: M });
      }
    return w;
  }, [d]), h = p.length > 1, f = d.find((y) => y.name === r);
  return /* @__PURE__ */ v(Se, { value: r, onValueChange: a, disabled: o || m, children: [
    /* @__PURE__ */ l(xe, { id: s, className: c, children: /* @__PURE__ */ l(Me, { placeholder: m ? "Loading…" : i, children: f ? /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Er, { option: f }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: f.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Te, { children: p.map((y) => /* @__PURE__ */ v(xr, { children: [
      h && y.label ? /* @__PURE__ */ l(Tr, { children: y.label }) : null,
      y.items.map((k) => /* @__PURE__ */ l(he, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Er, { option: k }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: k.label })
      ] }) }, k.name))
    ] }, y.key)) })
  ] });
}
function Qp(e) {
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
function gi(e) {
  return e.reason === void 0;
}
function Jp(e, t, n, r, a) {
  const i = wa(e, t, [...n]);
  return i ? Xp(i, e, r) : a == null ? void 0 : a(r);
}
function Xp(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function Zp(e, t, n) {
  if (t !== void 0 && ps(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${gs(e)}`;
}
const xa = "cube-viz:field-picker:only-compatible";
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
    return ((e = ks()) == null ? void 0 : e.getItem(xa)) !== "0";
  } catch {
    return !0;
  }
}
function eg(e) {
  try {
    const t = ks();
    if (!t) return;
    t.setItem(xa, e ? "1" : "0");
  } catch {
  }
}
let Ir = ws();
const vn = /* @__PURE__ */ new Set();
let yt;
function tg() {
  for (const e of [...vn]) e();
}
function Cs(e) {
  e !== Ir && (Ir = e, tg());
}
function ng() {
  if (yt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== xa || Cs(ws());
  };
  e.addEventListener("storage", t), yt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const mn = {
  get: () => Ir,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    eg(e), Cs(e);
  },
  subscribe: (e) => (vn.add(e), ng(), () => {
    vn.delete(e), vn.size === 0 && (yt == null || yt(), yt = void 0);
  })
}, rg = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(kl, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(Ea, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(Ea, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(ji, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(yl, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, vi = ["geoPoint", "number", "numberDimension", "category", "time"];
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
  var ce, ie;
  const { meta: u, isLoading: m } = ze(), [d, p] = b.useState(!1), [h, f] = b.useState(""), y = b.useSyncExternalStore(
    mn.subscribe,
    mn.get,
    mn.getServer
  ), k = mn.set, w = b.useId(), [C, x] = b.useState(r.viewLocked ?? "tables"), [N, M] = b.useState({});
  b.useEffect(() => {
    d && x(r.viewLocked ?? "tables");
  }, [d, r.viewLocked]);
  const F = b.useMemo(() => new Set(t), [t]), D = h.trim().toLowerCase(), W = Un(), L = b.useMemo(() => {
    if (C !== "tables") {
      const K = r.views.find((S) => S.name === C) ?? Ht(u, C);
      return K ? [{ cube: K, tag: "dataset" }] : [];
    }
    const V = [];
    r.sourceCube && V.push({ cube: r.sourceCube, tag: "source" });
    const re = r.relatedCubes.some((K) => K.category) ? "More tables" : "Related tables", se = [...r.relatedCubes].sort((K, S) => K.category !== S.category ? K.category === void 0 ? 1 : S.category === void 0 ? -1 : K.category.localeCompare(S.category) : 0);
    for (const K of se) V.push({ cube: K, tag: "related", heading: K.category ?? re });
    return V;
  }, [C, r, u]), _ = [
    ...vi.filter((V) => ve(e, V)),
    ...vi.filter((V) => !ve(e, V))
  ], P = (V) => {
    const J = [], re = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Set();
    for (const K of _) {
      const S = rg[K], T = wa(e, K, n ?? []);
      let R = tn(u, S.metaKind, V);
      K === "time" && (R = [...R].sort(
        (E, U) => Number(pn(U)) - Number(pn(E))
      ));
      for (const E of R) {
        if (F.has(E.name) || se.has(E.name) || D && !(E.label.toLowerCase().includes(D) || E.name.toLowerCase().includes(D))) continue;
        se.add(E.name);
        const U = is(E), $ = U ? `g:${U.toLowerCase()}` : `k:${S.label}`;
        let z = re.get($);
        z || (z = {
          key: $,
          label: U ?? S.label,
          headerIcon: U ? void 0 : S.icon,
          rejected: T !== void 0,
          items: []
        }, re.set($, z), J.push($)), T === void 0 && (z.rejected = !1), z.items.push({
          option: E,
          kind: K,
          reason: Jp(e, K, n ?? [], E, a)
        });
      }
    }
    return J.map((K) => re.get(K));
  }, I = L.map((V) => ({ section: V, groups: P(V.cube.name) })).filter((V) => V.groups.length > 0), A = y ? I.reduce(
    (V, J) => V + J.groups.reduce((re, se) => re + se.items.filter((K) => !gi(K)).length, 0),
    0
  ) : 0, j = y ? I.map((V) => ({
    section: V.section,
    groups: V.groups.map((J) => ({ ...J, rejected: !1, items: J.items.filter(gi) })).filter((J) => J.items.length > 0)
  })).filter((V) => V.groups.length > 0) : I, q = j.length > 0, B = !q && A > 0, te = (V, J) => {
    i(V, J), p(!1), f("");
  }, Y = C === "tables" ? "All related tables" : ((ce = r.views.find((V) => V.name === C)) == null ? void 0 : ce.title) ?? ((ie = Ht(u, C)) == null ? void 0 : ie.title) ?? C, X = r.viewLocked ? r.views.filter((V) => V.name === r.viewLocked) : [], ae = y ? A > 0 ? `Only compatible fields — ${A} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ v(Re, { open: d, onOpenChange: p, children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: c }),
    /* @__PURE__ */ v(_e, { align: o, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ v("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ v("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(vl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: w,
              "aria-label": "Search fields",
              value: h,
              onChange: (V) => f(V.target.value),
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
            "aria-label": ae,
            title: ae,
            onClick: () => k(!y),
            className: O("cv-picker-compat", y && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(bl, { className: "cv-ec-icon" }),
              y && A > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: A }) : null
            ]
          }
        ),
        X.length > 0 ? /* @__PURE__ */ l(
          ag,
          {
            browse: C,
            label: Y,
            views: X,
            onBrowse: x
          }
        ) : null
      ] }),
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: q ? j.map(({ section: V, groups: J }, re) => {
        const se = J.reduce((U, $) => U + $.items.length, 0), K = V.tag === "related", S = N[V.cube.name] ?? K, T = D.length > 0 ? !0 : !S, R = re > 0 ? j[re - 1].section : void 0, E = V.tag === "related" && V.heading !== void 0 && ((R == null ? void 0 : R.tag) !== "related" || R.heading !== V.heading);
        return /* @__PURE__ */ v("div", { children: [
          E ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: V.heading }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => M((U) => ({ ...U, [V.cube.name]: !S })),
              className: "cv-picker-table",
              children: [
                T ? /* @__PURE__ */ l(tt, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(an, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(zi, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: V.cube.title }),
                V.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : V.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: se })
              ]
            }
          ),
          T ? J.map((U) => /* @__PURE__ */ v(
            "div",
            {
              className: O(
                "cv-picker-group",
                U.rejected && "cv-picker-group--rejected"
              ),
              children: [
                J.length > 1 ? /* @__PURE__ */ v("div", { className: "cv-picker-group-header", children: [
                  U.headerIcon,
                  U.label,
                  U.rejected ? /* @__PURE__ */ l("span", { className: "cv-picker-group-note", children: "not for this slot" }) : null
                ] }) : null,
                U.items.map(({ option: $, kind: z, reason: oe }) => /* @__PURE__ */ l(
                  ig,
                  {
                    option: $,
                    unitBadge: ka($, W),
                    badge: z === "time" && pn($) ? "default" : void 0,
                    reason: oe,
                    onPick: () => te($.name, z)
                  },
                  $.name
                ))
              ]
            },
            U.key
          )) : null
        ] }, V.cube.name);
      }) : B ? /* @__PURE__ */ v("div", { className: "cv-picker-empty", children: [
        /* @__PURE__ */ v("p", { children: [
          A,
          " ",
          D ? "matching " : "",
          "field",
          A === 1 ? "" : "s",
          " cannot go in this slot, and “Only compatible fields” is hiding",
          " ",
          A === 1 ? "it" : "them",
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
function ag({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, i] = b.useState(!1), o = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ v(Re, { open: a, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Oe,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(Vi, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(bi, { active: e === "tables", icon: /* @__PURE__ */ l(zi, { className: "cv-ec-icon" }), onClick: () => o("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(de, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          bi,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(Kr, { className: "cv-ec-icon" }),
            onClick: () => o(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function bi({
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
        e ? /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }) : null
      ]
    }
  );
}
function ig({ option: e, reason: t, onPick: n, unitBadge: r, badge: a }) {
  const i = r ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: r }) : null;
  return t ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv-picker-row--disabled",
      children: [
        /* @__PURE__ */ v("span", { className: "cv-picker-row-main", children: [
          i,
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
        i,
        /* @__PURE__ */ l("span", { className: "cv-picker-row-label", children: e.label }),
        a ? /* @__PURE__ */ l("span", { className: "cv-picker-badge", children: a }) : null
      ]
    }
  );
}
const og = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], jt = "yyyy-MM-dd";
function sg(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function yi(e) {
  if (!e) return;
  const t = Ei(e, jt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Ta({ value: e, onChange: t }) {
  const [n, r] = b.useState(!1), a = typeof e == "string", [i, o] = sg(e), s = yi(i), c = yi(o), u = s ? { from: s, to: c } : void 0, m = a ? e : s && c ? `${fe(s, "MMM d, yyyy")} – ${fe(c, "MMM d, yyyy")}` : s ? fe(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: O("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l($i, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: O("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ v(_e, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-daterange-presets", children: [
        og.map((d) => /* @__PURE__ */ l(
          H,
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
        jo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (d) => {
            d != null && d.from && d.to ? t([fe(d.from, jt), fe(d.to, jt)]) : d != null && d.from ? t([fe(d.from, jt), fe(d.from, jt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Ss = b.createContext({});
function lg({
  createVariable: e,
  children: t
}) {
  const n = b.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Ss.Provider, { value: n, children: t });
}
function cg() {
  return b.useContext(Ss);
}
function ug({ kind: e, value: t, onChange: n, className: r }) {
  const a = sn(), i = (a == null ? void 0 : a.decls) ?? [], { createVariable: o } = cg(), [s, c] = b.useState(!1), [u, m] = b.useState(!1), [d, p] = b.useState(""), h = b.useMemo(() => yp(i, e), [i, e]), f = h.find((w) => w.name === t), y = (w) => {
    n(w), c(!1), m(!1);
  }, k = () => {
    if (!o) return;
    const w = Cp(e, d || "Variable", i);
    o(w), y(w.name), p("");
  };
  return /* @__PURE__ */ v(
    Re,
    {
      open: s,
      onOpenChange: (w) => {
        c(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: O("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(wl, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: O("cv-var-trigger-label", !f && "cv-var-trigger-label--placeholder"), children: f ? f.label ?? f.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(_e, { align: "start", className: "cv-var-popover", children: [
          h.length > 0 ? h.map((w) => /* @__PURE__ */ v(
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
          o ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ v("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              pe,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: d,
                onChange: (w) => p(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && k(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv-var-new-input"
              }
            ),
            /* @__PURE__ */ l(H, { size: "sm", className: "cv-var-new-add", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
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
  const i = ke(t), [o, s] = b.useState(i ? "var" : "fixed");
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
            s("fixed"), ke(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ l(
      ug,
      {
        kind: e,
        value: ke(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(ke(t) ? void 0 : t, (u) => n(u))
  ] });
}
const mg = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function lr(e) {
  return "member" in e && "operator" in e;
}
function dg({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: i,
  className: o
}) {
  var _;
  const { meta: s } = ze(), c = ((_ = sn()) == null ? void 0 : _.decls) ?? [], [u, m] = b.useState(null), [d, p] = b.useState(null), h = r ?? [], f = h.length === 1 && !lr(h[0]) && "or" in h[0] && Array.isArray(h[0].or) && h[0].or.every(lr) ? h[0] : void 0, y = f ? "any" : "all", k = [], w = [];
  f || h.forEach((P) => lr(P) ? k.push(P) : w.push(P));
  const C = f ? f.or : k, x = w.length === 0 && (C.length >= 2 || y === "any"), N = (P) => y === "any" ? P.length ? [{ or: P }] : [] : [...P, ...w], M = (P) => {
    const I = P.filter((j) => j.member.length > 0), A = N(I);
    a(A.length > 0 ? A : void 0);
  }, F = (P) => {
    const I = P === "any" ? C.length ? [{ or: C }] : [] : [...C];
    a(I.length > 0 ? I : void 0);
  }, D = (P, I) => M(C.map((A, j) => j === P ? { ...A, ...I } : A)), W = (P) => M(C.filter((I, A) => A !== P)), L = (P) => {
    const A = { ...d ?? { member: "", operator: "equals", values: [] }, ...P };
    A.member ? (p(null), m(C.length), M([...C, A])) : p(A);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: O("cv-filter-builder", o), children: [
    C.length === 0 && !d ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
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
          onChange: F
        }
      ),
      /* @__PURE__ */ l("span", { children: "of these" })
    ] }) : null,
    C.map((P, I) => {
      const A = Fe(s, P.member);
      return u === I ? /* @__PURE__ */ l(
        ki,
        {
          leaf: P,
          member: A,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (j) => D(I, j),
          onDone: () => m(null),
          onRemove: () => W(I)
        },
        I
      ) : /* @__PURE__ */ l(
        fg,
        {
          text: hg(P, A == null ? void 0 : A.label, c),
          disabled: i,
          onEdit: () => m(I),
          onRemove: () => W(I)
        },
        I
      );
    }),
    d ? /* @__PURE__ */ l(
      ki,
      {
        leaf: d,
        member: Fe(s, d.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: L,
        onRemove: () => p(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ v("p", { className: "cv-filter-groups-note", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      H,
      {
        variant: "outline",
        size: "sm",
        className: "cv-filter-add",
        disabled: i || !!d,
        onClick: () => {
          m(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Nt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function fg({
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
      H,
      {
        variant: "ghost",
        size: "icon",
        className: "cv-ec-remove cv-ec-remove--8",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ l(_t, { className: "cv-ec-icon--lg" })
      }
    )
  ] });
}
function ki({
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
  const { meta: u } = ze(), m = pi(t == null ? void 0 : t.type), d = m.includes(e.operator) ? e.operator : m[0], p = !Ar.has(d), h = b.useId(), f = b.useId(), y = b.useId(), k = b.useId(), w = b.useId(), C = b.useId();
  b.useEffect(() => {
    d !== e.operator && o({ operator: d });
  }, [e.operator, o, d]);
  const x = (N) => {
    const M = Fe(u, N);
    o({ member: N, operator: pi(M == null ? void 0 : M.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv-filter-edit", children: [
    /* @__PURE__ */ v("div", { className: "cv-filter-edit-header", children: [
      /* @__PURE__ */ l("span", { className: "cv-filter-edit-title", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv-filter-edit-actions", children: [
        s && e.member ? /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", className: "cv-filter-done", onClick: s, children: [
          /* @__PURE__ */ l(gt, { className: "cv-ec-icon" }),
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
            children: /* @__PURE__ */ l(_t, { className: "cv-ec-icon" })
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
            well: mg,
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
                id: f,
                disabled: i,
                "aria-labelledby": `${h} ${f}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ v("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(Er, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(tt, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
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
          onChange: x,
          placeholder: "Choose a field…",
          disabled: i
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("span", { id: y, className: "cv-ec-label", children: "Condition" }),
      /* @__PURE__ */ v(
        Se,
        {
          value: d,
          onValueChange: (N) => o({
            operator: N,
            values: Ar.has(N) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              xe,
              {
                id: k,
                "aria-labelledby": `${y} ${k}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(Me, {})
              }
            ),
            /* @__PURE__ */ l(Te, { children: m.map((N) => /* @__PURE__ */ l(he, { value: N, children: ls[N] }, N)) })
          ]
        }
      )
    ] }),
    p ? /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: w, htmlFor: C, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        pg,
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
function hg(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = ls[e.operator] ?? e.operator;
  if (Ar.has(e.operator)) return `${r} ${a}`;
  const i = (e.values ?? []).map((o) => {
    if (ke(o)) {
      const s = n.find((c) => c.name === o.var);
      return `{${((s == null ? void 0 : s.label) ?? o.var).replace(/[{}]/g, "")}}`;
    }
    return String(o);
  });
  return i.length > 0 ? `${r} ${a} ${i.join(", ")}` : `${r} ${a} …`;
}
function pg({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: a
}) {
  const i = e ?? [], o = i.length === 1 && ke(i[0]);
  if (t === "time") {
    const u = o ? i[0] : gg(i);
    return /* @__PURE__ */ l(
      Ot,
      {
        labelId: a,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : ke(m) ? [m] : vg(m)),
        renderFixed: (m, d) => /* @__PURE__ */ l(Ta, { value: m, onChange: d })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = o ? i[0] : i.filter((u) => !ke(u));
  return /* @__PURE__ */ l(
    Ot,
    {
      labelId: a,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : ke(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(
        pe,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (d) => m(bg(d.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function gg(e) {
  const t = e.filter((n) => !ke(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function vg(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function bg(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function yg({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: i } = e, o = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ v(
      Oe,
      {
        className: O(
          "cv-filters-trigger",
          o > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Cl, { className: "cv-ec-icon--lg" }),
          "Filter",
          o > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: o }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ v("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(kg, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(dg, { cube: n, cubes: r, scope: a, value: i.filters, onChange: s })
    ] })
  ] });
}
function kg({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ze(), a = Ap(r, n);
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
function wg({ currentName: e, hasFields: t, onSelect: n }) {
  var y;
  const { meta: r } = ze(), a = b.useMemo(() => Gn(r), [r]), i = a.filter((k) => k.type === "view"), o = a.filter((k) => k.type === "cube"), s = a.find((k) => k.name === e), [c, u] = b.useState(!1), [m, d] = b.useState(null), p = (k) => {
    if (k === e) {
      u(!1);
      return;
    }
    t ? d(k) : (n(k), u(!1));
  }, h = () => {
    m && n(m), d(null), u(!1);
  }, f = m ? ((y = a.find((k) => k.name === m)) == null ? void 0 : y.title) ?? m : "";
  return /* @__PURE__ */ v(
    Re,
    {
      open: c,
      onOpenChange: (k) => {
        u(k), k || d(null);
      },
      children: [
        /* @__PURE__ */ v(
          Oe,
          {
            className: "cv-source-trigger",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ l(Vi, { className: "cv-ec-icon cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: O("cv-source-trigger-label", !s && "cv-source-trigger-label--placeholder"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ l(_e, { align: "start", className: "cv-source-popover", children: m ? /* @__PURE__ */ v("div", { className: "cv-source-confirm", children: [
          /* @__PURE__ */ v("p", { className: "cv-source-confirm-title", children: [
            "Switch to ",
            /* @__PURE__ */ l("span", { className: "cv-ec-medium", children: f }),
            "?"
          ] }),
          /* @__PURE__ */ l("p", { className: "cv-source-confirm-note", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv-source-confirm-actions", children: [
            /* @__PURE__ */ l(H, { variant: "ghost", size: "sm", className: "cv-ec-h7", onClick: () => d(null), children: "Cancel" }),
            /* @__PURE__ */ l(H, { size: "sm", className: "cv-ec-h7", onClick: h, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv-source-list", children: [
          i.length > 0 ? /* @__PURE__ */ v(de, { children: [
            /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
            i.map((k) => /* @__PURE__ */ l(
              wi,
              {
                icon: /* @__PURE__ */ l(Kr, { className: "cv-ec-icon" }),
                label: k.title,
                active: k.name === e,
                onClick: () => p(k.name)
              },
              k.name
            ))
          ] }) : null,
          /* @__PURE__ */ l("p", { className: "cv-ec-menu-heading", children: "Tables" }),
          o.map((k) => /* @__PURE__ */ l(
            wi,
            {
              icon: /* @__PURE__ */ l(Wi, { className: "cv-ec-icon" }),
              label: k.title,
              active: k.name === e,
              onClick: () => p(k.name)
            },
            k.name
          ))
        ] }) })
      ]
    }
  );
}
function wi({
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
      className: O(
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
function Cg(e, t, n, r) {
  var i;
  const a = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Ng({
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
        onChange: (p) => Cg(e, t, n, { label: p.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function Sg({
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
          n ? /* @__PURE__ */ l(Nl, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Sl, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Ms = b.forwardRef(
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
Ms.displayName = "Label";
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
      /* @__PURE__ */ l(Ms, { htmlFor: r, className: "cv-field-row-label", children: e }),
      a ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: a }) : null
    ] }),
    o,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Fr({
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
        /* @__PURE__ */ l(Fr, { id: o, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
const Mg = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, xg = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function Tg({ spec: e, update: t }) {
  var w, C, x;
  const n = rt(), { chart: r } = e, a = r.family, i = r.familyOptions ?? {}, o = n.require(a);
  if (o.Customize) {
    const N = o.Customize;
    return /* @__PURE__ */ l(N, { spec: e, update: t });
  }
  const s = (N) => t({ ...e, chart: { ...r, ...N } }), c = (N) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...N } } }), u = ((C = (w = r.mapping) == null ? void 0 : w.series) == null ? void 0 : C.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", d = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", p = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", h = ma(o) ? /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      ue,
      {
        label: "Compare",
        hint: p === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ v(
          Se,
          {
            value: p,
            onValueChange: (N) => {
              var M;
              return s({
                transform: N === "none" ? void 0 : N === "rollingAvg" ? { kind: "rollingAvg", window: ((M = r.transform) == null ? void 0 : M.window) ?? dn } : { kind: N }
              });
            },
            children: [
              /* @__PURE__ */ l(xe, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(Me, {}) }),
              /* @__PURE__ */ l(Te, { children: xg.map((N) => /* @__PURE__ */ l(he, { value: N, children: Mg[N] }, N)) })
            ]
          }
        )
      }
    ),
    p === "rollingAvg" ? /* @__PURE__ */ l(Og, { label: "Window (points)", children: (N) => {
      var M;
      return /* @__PURE__ */ l(
        pe,
        {
          id: N,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((M = r.transform) == null ? void 0 : M.window) ?? dn,
          onChange: (F) => {
            const D = parseInt(F.target.value, 10), W = Number.isFinite(D) ? Math.min(90, Math.max(2, D)) : dn;
            s({ transform: { kind: "rollingAvg", window: W } });
          }
        }
      );
    } }) : null
  ] }) : null, f = /* @__PURE__ */ l(ue, { label: "Line shape", children: /* @__PURE__ */ l(
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
      onChange: (N) => c({ curve: N })
    }
  ) }), y = /* @__PURE__ */ l(ue, { label: "Stacked", children: /* @__PURE__ */ l(
    Ct,
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
    var N, M;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(de, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (F) => s({ orientation: F ? "horizontal" : "vertical" })
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
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((M = (N = r.mapping) == null ? void 0 : N.series) == null ? void 0 : M.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(de, { children: [
          /* @__PURE__ */ l(
            Ze,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (F) => c({ innerRadiusPct: F ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ue, { label: "Slice labels", children: /* @__PURE__ */ l(
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
              onChange: (F) => c({ showLabels: F })
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
function Rg(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || ma(n);
}
function Og({
  label: e,
  children: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function xs(e) {
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
    if (!Ee(i)) continue;
    const o = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < o; )
      ve(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || a.push(i);
  }
  return { matched: r, missing: a, leftover: n };
}
function _g(e) {
  let t = 0;
  for (const n of e)
    Ee(n) && (t += n.optional ? 1 : 3);
  return t;
}
function Ag(e, t) {
  return e.some((n) => Ee(n) && n.cardinality === "many" && ve(n, t));
}
const Dg = 0.35, Lg = 0.4, Eg = 0.3, Ig = 0.1;
function Fg(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? Eg : e.supportsCartesianAxes ? Ig : e.wells.some(
    (a) => Ee(a) && a.channel === "x" && ve(a, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function Rs(e) {
  const t = e.filter(Ee);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function Pg(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const $g = (e, t, n) => e === 1 ? t : n;
function zg(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${Pg(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const a = n.get("x") ?? [], i = n.get("y") ?? [], o = `${r} ${$g(r, "measure", "measures")}`;
  return Rs(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : a.includes("number") && i.includes("number") ? "One measure against another" : a.includes("time") ? `${o} over time` : a.includes("category") ? n.has("color") ? `${o} by category, split in colours` : `${o} by category` : r === 1 ? "One headline number" : r > 1 ? `${o}, no breakdown` : "Fits your fields";
}
function Vg(e, t) {
  const n = xs(t), r = n.map((o) => o.kind), a = r.includes("time"), i = [];
  for (const o of e.list()) {
    if (o.queryless) continue;
    const s = o.wells, c = Ts(s, n), u = _g(s), m = Math.max(0, n.length - c.matched.length), d = Wp(s, r) + 0.5 * m, p = u > 0 ? d / u : 0, h = c.leftover.filter(
      (y) => y.kind !== "time" && !Ag(s, y.kind)
    ).length, f = p - Dg * h + Fg(o, a) - (Rs(s) ? Lg : 0);
    i.push({
      family: o.family,
      descriptor: o,
      score: Math.round(f * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: zg(o, c)
    });
  }
  return i.sort((o, s) => s.score - o.score || o.descriptor.order - s.descriptor.order);
}
function jg(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Wg(e, t, n) {
  const r = e.require(n), a = Ts(r.wells, xs(t));
  let i = {
    ...t,
    chart: { family: n, mapping: void 0, familyOptions: void 0 }
  };
  for (const o of a.matched)
    o.members.forEach((s, c) => {
      i = Vt(i, n, o.well.id, s, o.kinds[c], e);
    });
  return i;
}
function Os(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(qp(e, r, n));
  };
}
function Bg({ spec: e, update: t, empty: n }) {
  const r = rt(), a = e.chart.family, i = Os(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ v("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(_s, { spec: e, family: a, onPick: i, families: r })
  ] }) }) : null;
}
function qg({ spec: e, update: t }) {
  const n = rt(), r = e.chart.family, a = Os(e, t, n), i = n.require(r), o = i.icon;
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(
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
    /* @__PURE__ */ v(_e, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(_s, { spec: e, family: r, onPick: a, families: n }),
      Rg(r, n) ? /* @__PURE__ */ v("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(Tg, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function _s({ spec: e, family: t, onPick: n, families: r }) {
  const a = b.useMemo(() => Vg(r, e), [r, e]), i = b.useMemo(() => jg(a), [a]), o = b.useMemo(
    () => new Map(a.map((d) => [d.family, d])),
    [a]
  ), s = b.useMemo(
    () => new Set(a.filter((d) => d.fits).map((d) => d.family)),
    [a]
  ), c = Gg(e, r, s), u = (d, p) => /* @__PURE__ */ l(
    Ug,
    {
      fit: d,
      active: d.family === t,
      preview: c.get(d.family),
      families: r,
      reason: p ? d.reason : void 0,
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
function Ug({
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
          rv,
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
function Kg(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((a) => a.granularity !== void 0)) ?? !1);
}
const Ci = 200, Hg = () => () => {
};
function Gg(e, t, n) {
  const r = e.query, a = Kg(r), i = b.useMemo(() => {
    const p = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof p == "number" ? Math.min(p, Ci) : Ci
    };
  }, [r]), o = sn(), s = b.useRef(null);
  s.current === null && (s.current = Do());
  const c = s.current, u = () => o ? c(i, o.store.getAll(), o.decls) : i, m = b.useSyncExternalStore(
    o ? o.store.subscribe : Hg,
    u,
    u
  ), { resultSet: d } = Po(m, { skip: !a });
  return b.useMemo(() => {
    const p = /* @__PURE__ */ new Map();
    for (const h of t.list()) {
      const f = h.family;
      if (h.queryless || a && n.has(f) && !d) continue;
      const w = (d && n.has(f) ? Yg(e, f, t, d, m) : void 0) ?? nv(f, t);
      w && p.set(f, w);
    }
    return p;
  }, [e, t, d, m, n, a]);
}
function Yg(e, t, n, r, a) {
  try {
    const i = t === e.chart.family ? e : Wg(n, e, t), o = As(i.chart, n), s = Ro(r, o, i.query ?? a, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(a)}`, data: s, options: o };
  } catch {
    return;
  }
}
const pt = "sample.category", nn = "sample.group", ye = "sample.value", Ae = "sample.count", Ds = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Pr = [18, 27, 21, 34, 26, 39], $r = [12, 9, 17, 14, 22, 16], Qg = Ds.flatMap((e, t) => [
  { [pt]: e, [nn]: "North", [ye]: Pr[t], [Ae]: $r[t] },
  {
    [pt]: e,
    [nn]: "South",
    [ye]: Math.round(Pr[t] * 0.62),
    [Ae]: Math.round($r[t] * 0.78)
  }
]), Jg = {
  measures: [ye, Ae],
  dimensions: [pt, nn]
}, Xg = {
  measures: {
    [ye]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ae]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [pt]: { title: "Day", shortTitle: "Day", type: "string" },
    [nn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function Ls(e) {
  const t = [
    { key: ye, label: "Value", data: Pr, colorToken: "chart-1" },
    { key: Ae, label: "Count", data: $r, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: Ds,
    series: t,
    raw: { rows: Qg, query: Jg, annotation: Xg },
    empty: !1
  };
}
const Zg = Ls(1), ev = Ls(2), Wt = (e, t) => ({
  family: e,
  mapping: { category: { member: pt }, series: { mode: "measures", members: t } }
}), tv = {
  bar: Wt("bar", [ye, Ae]),
  line: Wt("line", [ye, Ae]),
  area: { ...Wt("area", [ye, Ae]), stackMode: "stacked" },
  pie: Wt("pie", [ye]),
  scatter: { family: "scatter", familyOptions: { x: ye, y: Ae } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: pt },
      series: { mode: "pivot", value: ye, pivot: nn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: ye, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: pt }, { member: ye }, { member: Ae }] }
  }
};
function nv(e, t) {
  const n = tv[e] ?? Wt(e, [ye, Ae]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Zg : ev,
    options: As(n, t)
  };
}
const rv = b.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const a = b.useRef(null);
  return b.useEffect(() => {
    const i = a.current;
    if (i)
      for (const o of i.querySelectorAll("[tabindex]")) o.tabIndex = -1;
  }), /* @__PURE__ */ l(av, { fallback: r, children: /* @__PURE__ */ l("div", { ref: a, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    xo,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class av extends b.Component {
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
function iv(e, t) {
  return e.allowedCubes.includes(t);
}
function ov(e, t) {
  const n = new Map(e.filter((i) => i.type === "cube").map((i) => [i.name, i])), r = /* @__PURE__ */ new Set([t]), a = [t];
  for (; a.length > 0; ) {
    const i = n.get(a.shift());
    for (const o of (i == null ? void 0 : i.joinTargets) ?? [])
      !n.has(o) || r.has(o) || (r.add(o), a.push(o));
  }
  return [...r].filter((i) => i !== t).map((i) => n.get(i)).sort((i, o) => i.title.localeCompare(o.title));
}
function sv(e, t, n, r) {
  const a = Gn(e), i = a.filter((x) => x.type === "view"), o = vs(t, r), s = Object.values(o).flat();
  let c;
  for (const x of s) {
    const N = Fe(e, x);
    if (N) {
      c = N;
      break;
    }
  }
  const u = !c && n ? Ht(e, n) : void 0, m = c ? Ht(e, c.cube) : u, d = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, p = t.query.measures ?? [], h = p.length ? zt(p[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: i, measureSource: h, allowedCubes: [d] };
  const f = h ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), y = f ? Ht(e, f) : void 0, k = a.filter((x) => x.type === "cube"), w = f ? ov(k, f) : k, C = f ? [f, ...w.map((x) => x.name)] : k.map((x) => x.name);
  return {
    sourceCube: (y == null ? void 0 : y.type) === "cube" ? y : void 0,
    relatedCubes: w,
    views: i,
    measureSource: h,
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
      /* @__PURE__ */ l(Ml, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
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
function lv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function cv(e, t, n, r, a, i) {
  var $, z, oe, Ve, je;
  const { chart: o, query: s } = e, c = o.family, u = n.kinds.length === 1 ? n.kinds[0] : uv(a), m = o.familyOptions ?? {}, d = Array.isArray(m.columns) ? m.columns : [], p = fs(o), h = p[r], f = c === "table" && n.id === "columns", y = c === "bar" || c === "line" || c === "area", k = ((z = ($ = o.mapping) == null ? void 0 : $.series) == null ? void 0 : z.mode) === "measures", w = y && n.id === "y", C = w && k, x = f ? (oe = d.find((G) => G.member === r)) == null ? void 0 : oe.label : C ? h == null ? void 0 : h.label : void 0, N = C ? h == null ? void 0 : h.colorToken : void 0, M = cn(s), F = n.kinds.includes("time") && (M == null ? void 0 : M.dimension) === r, D = F ? M == null ? void 0 : M.granularity : void 0, W = F ? M == null ? void 0 : M.dateRange : void 0, L = (c === "line" || c === "area") && n.id === "y" && k, _ = L ? h == null ? void 0 : h.dots : void 0, P = (G) => {
    var Oa, _a;
    if ((Oa = o.mapping) != null && Oa.series && o.mapping.series.mode !== "measures") return;
    const me = ((_a = o.mapping) != null && _a.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ge = { ...p };
    G && Object.keys(G).length > 0 ? ge[r] = G : delete ge[r];
    const Lt = ln(o);
    Lt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Lt }, series: hs(me, ge) }
      }
    });
  }, I = (G) => {
    const me = d.map((ge) => ge.member === r ? { ...ge, ...G } : ge);
    t({ ...e, chart: { ...o, familyOptions: { ...m, columns: me } } });
  }, A = (G) => {
    f ? I({ label: G }) : C && P({ ...h, label: G });
  }, j = (G) => {
    C && P({ ...h, colorToken: G ?? void 0 });
  }, q = (G) => {
    if (!M) return;
    const me = { ...M };
    for (const ge of Object.keys(G)) {
      const Lt = G[ge];
      Lt === void 0 ? delete me[ge] : me[ge] = Lt;
    }
    t({ ...e, query: { ...s, timeDimensions: [me] } });
  }, B = (G) => q({ granularity: G }), te = (G) => q({ dateRange: G }), Y = (G) => {
    C && P({ ...h, dots: G });
  }, X = () => t(Hp(e, c, n.id, r, i)), ae = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), ce = (Ve = o.mapping) == null ? void 0 : Ve.series, ie = (ce && ce.mode === "pivot" ? ce.value : Dr(o)[0]) ?? ((je = s.measures) == null ? void 0 : je[0]), V = ae ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...ie ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...ie ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], J = (() => {
    const G = lv(s.order)[0];
    if (!G) return "none";
    const [me, ge] = G;
    return ie && me === ie ? ge === "desc" ? "value-desc" : "value-asc" : me === r ? u === "time" ? ge === "desc" ? "time-desc" : "time-asc" : ge === "asc" ? "label-asc" : "label-desc" : "none";
  })(), re = (G) => {
    let me;
    switch (G) {
      case "none":
        me = void 0;
        break;
      case "value-desc":
        me = ie ? [[ie, "desc"]] : void 0;
        break;
      case "value-asc":
        me = ie ? [[ie, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        me = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        me = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: me } });
  }, se = typeof s.limit == "number" ? s.limit : void 0, K = (G) => t({ ...e, query: { ...s, limit: G && G > 0 ? G : void 0 } }), T = (c === "bar" || c === "line" || c === "area") && F, R = T && m.comparePrevious === !0;
  return {
    kind: u,
    label: x,
    colorToken: N,
    granularity: D,
    dateRange: W,
    dots: _,
    canPoints: L,
    canRename: f || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && k,
    isTimeField: F,
    isCategoryField: ae,
    sortValue: J,
    sortOptions: V,
    onSort: re,
    limit: se,
    onLimit: K,
    canComparePrevious: T,
    comparePrevious: R,
    comparePreviousReady: T && W !== void 0,
    onComparePrevious: (G) => t({ ...e, chart: { ...o, familyOptions: { ...m, comparePrevious: G || void 0 } } }),
    onRename: A,
    onRecolor: j,
    onGranularity: B,
    onDateRange: te,
    onDots: Y,
    onRemove: X
  };
}
function uv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ni(e, t, n, r) {
  var d;
  const { chart: a, query: i } = e, o = a.family, s = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const h = p.slice(), [f] = h.splice(n, 1);
    return h.splice(r, 0, f), h;
  };
  if (o === "table" && t.id === "columns") {
    const p = a.familyOptions ?? {}, h = s(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...p, columns: h } } };
  }
  const c = s(i.measures ?? []), u = (d = a.mapping) == null ? void 0 : d.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = s(u.values);
    m = { ...a.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...a, mapping: m } };
}
const mv = Je.options;
function dv({
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
        mv.map((i) => {
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
function fv({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: i,
  reorder: o,
  className: s
}) {
  const c = rt(), u = Un(), m = cv(e, t, n, r, a, c), d = b.useId(), p = b.useId(), h = b.useId(), f = b.useId(), y = b.useId(), k = b.useId(), w = (a == null ? void 0 : a.label) ?? r, C = m.label || w, x = m.canColor && i !== void 0, N = m.canRename || x || m.isTimeField || m.isCategoryField || m.canPoints, M = (L) => {
    const _ = L.trim();
    m.onRename(_.length > 0 ? _ : void 0);
  }, F = (L) => {
    !o || !L.altKey || (L.key === "ArrowUp" && o.index > 0 ? (L.preventDefault(), o.onMove(-1)) : L.key === "ArrowDown" && o.index < o.total - 1 && (L.preventDefault(), o.onMove(1)));
  }, D = /* @__PURE__ */ v(de, { children: [
    o ? /* @__PURE__ */ l(xl, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
    x ? /* @__PURE__ */ l(
      "span",
      {
        className: "cv-field-pill-swatch",
        style: { backgroundColor: `var(--${i})` },
        "aria-hidden": !0
      }
    ) : a ? (
      // What the field HOLDS, in words ("km", "#", "date") — same chip as the
      // picker rows, converted to the viewer's unit system.
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: ka(a, u) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: C })
  ] }), W = o ? " · drag to reorder (Alt+↑/↓)" : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: O("cv-field-pill", (o == null ? void 0 : o.dragging) && "cv-field-pill--dragging", s),
      draggable: !!o,
      onDragStart: o == null ? void 0 : o.onDragStart,
      onDragOver: o ? (L) => {
        L.preventDefault(), o.onDragOver();
      } : void 0,
      onDragEnd: o == null ? void 0 : o.onDragEnd,
      onKeyDown: o ? F : void 0,
      children: [
        N ? /* @__PURE__ */ v(Re, { children: [
          /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${C}${W}`,
              ...o ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: D
            }
          ) }),
          /* @__PURE__ */ l(_e, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ v("div", { className: "cv-field-pill-config", children: [
            m.canRename ? /* @__PURE__ */ v("label", { className: "cv-ec-field", htmlFor: d, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                pe,
                {
                  id: d,
                  defaultValue: m.label ?? "",
                  placeholder: w,
                  className: "cv-ec-h8",
                  onBlur: (L) => M(L.target.value),
                  onKeyDown: (L) => {
                    L.key === "Enter" && (M(L.target.value), L.target.blur());
                  }
                }
              )
            ] }) : null,
            x ? /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Color" }),
              /* @__PURE__ */ l(dv, { value: m.colorToken, onChange: m.onRecolor })
            ] }) : null,
            m.isTimeField ? /* @__PURE__ */ v(de, { children: [
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  Ot,
                  {
                    kind: "dateRange",
                    value: m.dateRange,
                    onChange: m.onDateRange,
                    renderFixed: (L, _) => /* @__PURE__ */ l(Ta, { value: L, onChange: _ })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Group dates by" }),
                /* @__PURE__ */ l(
                  Ot,
                  {
                    kind: "granularity",
                    value: m.granularity,
                    onChange: m.onGranularity,
                    renderFixed: (L, _) => /* @__PURE__ */ l(
                      as,
                      {
                        value: L,
                        onChange: _,
                        allowAuto: !0,
                        autoHint: fa(m.dateRange),
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
                    Fr,
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
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: p, children: [
                /* @__PURE__ */ l("span", { id: h, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: p,
                    "aria-labelledby": h,
                    value: m.sortValue,
                    onChange: (L) => m.onSort(L.target.value),
                    className: "cv-field-pill-select",
                    children: m.sortOptions.map((L) => /* @__PURE__ */ l("option", { value: L.key, children: L.label }, L.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: f, children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ l(
                  pe,
                  {
                    id: f,
                    type: "number",
                    min: 1,
                    defaultValue: m.limit ?? "",
                    placeholder: "All",
                    className: "cv-ec-h8",
                    onBlur: (L) => {
                      const _ = L.target.value.trim();
                      m.onLimit(_ === "" ? void 0 : Number(_));
                    },
                    onKeyDown: (L) => {
                      if (L.key === "Enter") {
                        const _ = L.target.value.trim();
                        m.onLimit(_ === "" ? void 0 : Number(_)), L.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            m.canPoints ? /* @__PURE__ */ v("label", { className: "cv-ec-row", htmlFor: k, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Fr, { id: k, checked: m.dots === !0, onChange: m.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ v(
              H,
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
              title: `${C}${W}`,
              ...o ? {
                tabIndex: 0,
                "aria-label": `${C}, position ${o.index + 1} of ${o.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: D
            }
          )
        ),
        /* @__PURE__ */ l(
          H,
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
function hv({
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
  lockedSingle: p,
  disableReorder: h,
  label: f,
  note: y,
  pickerSide: k,
  pickerAlign: w,
  control: C
}) {
  const x = n.cardinality === "many" && !p, N = x || r.length === 0, M = r.length, F = d === "vertical", D = f ?? n.label, W = x && M > 1 && !h, [L, _] = b.useState(null), P = ["number", "category", "time"].filter((j) => !ve(n, j)).map((j) => wa(n, j, r)).find((j) => j !== void 0) ?? n.hint, I = a.length === 0 && !n.optional && ve(n, "number") ? "Pick a number to get started" : void 0, A = /* @__PURE__ */ l(
    Ns,
    {
      well: n,
      placed: a,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: k ?? (F ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          title: P,
          className: O(
            "cv-well-add",
            F && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Nt, { className: "cv-ec-icon" }),
            r.length === 0 ? D : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: O("cv-well-group", !F && "cv-well-group--h"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv-well-header", children: [
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: D }),
          m ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        C ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: C }) : null,
        /* @__PURE__ */ l(Yn, { label: D, resetKey: e, children: /* @__PURE__ */ v("div", { className: O("cv-well-fields", F ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((j, q) => /* @__PURE__ */ l(
            fv,
            {
              spec: e,
              update: t,
              well: n,
              member: j,
              option: i(j),
              resolvedColor: o(j),
              className: F ? "cv-field-pill--full" : void 0,
              reorder: W ? {
                index: q,
                total: M,
                dragging: L === q,
                onDragStart: () => _(q),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  L === null || L === q || (t(Ni(e, n, L, q)), _(q));
                },
                onDragEnd: () => _(null),
                onMove: (B) => t(Ni(e, n, q, q + B))
              } : void 0
            },
            j
          )),
          N ? A : null
        ] }) }),
        I ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: I }) : null,
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
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(
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
    /* @__PURE__ */ l(_e, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Yn, { label: e, children: n }) })
  ] });
}
function Ra(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function pv({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = Ra(e, t), a = ds(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], o = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (d) => {
    const p = i ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!p) return;
    const h = { ...p };
    for (const f of Object.keys(d)) {
      const y = d[f];
      y === void 0 ? delete h[f] : h[f] = y;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(Qt, { label: "Time field", children: ({ id: d }) => /* @__PURE__ */ l(
      ys,
      {
        id: d,
        cube: a,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (p) => u({ dimension: p }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(Qt, { label: "Date range", children: ({ labelId: d }) => /* @__PURE__ */ l(
      Ot,
      {
        labelId: d,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (p) => u({ dateRange: p }),
        renderFixed: (p, h) => /* @__PURE__ */ l(Ta, { value: p, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ l(ue, { label: "Display", children: /* @__PURE__ */ l(
      Ct,
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
      Ze,
      {
        label: "Higher is better",
        hint: "Off = a decrease is good — inverts the comparison and trend colors.",
        checked: c !== "down",
        onChange: (d) => r({ goodDirection: d ? "up" : "down" })
      }
    ),
    o === "gauge" ? /* @__PURE__ */ l(Qt, { label: "Gauge max", children: ({ id: d }) => /* @__PURE__ */ l(
      pe,
      {
        id: d,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (p) => {
          const h = parseFloat(p.target.value);
          r({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function gv({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ra(e, t), a = n.comparison, i = a !== void 0, o = b.useRef(void 0);
  a && (o.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (a == null ? void 0 : a.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ue, { label: "Compare to", children: /* @__PURE__ */ l(
      Ct,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ l(Qt, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        pe,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const p = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(p) ? p : void 0 } });
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
        Ze,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      )
    ] }) : null
  ] });
}
function vv({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Ra(e, t), a = n.sparkline, i = a !== void 0, o = a == null ? void 0 : a.granularity, s = _o((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ v("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(Qt, { label: "Trend", children: ({ id: m, labelId: d }) => /* @__PURE__ */ l(
      Ot,
      {
        labelId: d,
        kind: "granularity",
        value: o,
        onChange: (p) => r({
          sparkline: p === void 0 ? void 0 : { ...a, granularity: p }
        }),
        renderFixed: (p, h) => /* @__PURE__ */ l(
          as,
          {
            id: m,
            value: p,
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
function Qt({
  label: e,
  children: t
}) {
  const n = b.useId(), r = b.useId();
  return /* @__PURE__ */ v("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function bv({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var J, re, se, K;
  const { meta: a } = ze(), i = rt(), { chart: o } = e, s = o.family, c = i.require(s), u = c.queryless ?? !1, m = c.enforcesAxisUnit, d = ds(e), p = Un(), h = b.useMemo(() => Kp(s, i), [s, i]), f = b.useMemo(() => vs(e, i), [e, i]), y = b.useMemo(() => new Map(h.map((S) => [S.id, S])), [h]), [k, w] = b.useState(void 0), C = b.useMemo(
    () => sv(a, e, k, i),
    [a, e, k, i]
  ), x = b.useMemo(() => Object.values(f).flat(), [f]), N = b.useCallback(
    (S) => {
      w(S), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), M = b.useMemo(
    () => {
      var S;
      return C.viewLocked ? [C.viewLocked] : [(S = C.sourceCube) == null ? void 0 : S.name, ...C.relatedCubes.map((T) => T.name)].filter(
        Boolean
      );
    },
    [C]
  ), F = b.useMemo(
    () => Object.values(f).every((S) => S.length === 0),
    [f]
  ), D = b.useMemo(() => {
    const S = (f.y ?? [])[0], T = S ? Fe(a, S) : void 0;
    return {
      leftKey: S ? ps(T) : void 0,
      leftLabel: S ? yv(T, p(T == null ? void 0 : T.unit)) : void 0
    };
  }, [f, a, p]), W = b.useCallback(
    (S, T) => {
      var R;
      if (T) {
        if (!iv(C, T.cube))
          return "Clear the current fields to use a different dataset.";
        if (T.memberType === "measure" && C.measureSource && T.cube !== C.measureSource)
          return `This chart's numbers come from ${((R = C.sourceCube) == null ? void 0 : R.title) ?? C.measureSource}. Remove them to use another table.`;
        if (m && S === "y" && T.memberType === "measure") {
          const { leftKey: E, leftLabel: U } = D;
          return Zp(T, E, U);
        }
      }
    },
    [C, D, m]
  ), L = D.leftLabel, _ = b.useMemo(() => {
    var T;
    const S = {};
    if (s === "bar" || s === "line" || s === "area") {
      const R = (T = o.mapping) == null ? void 0 : T.series;
      if (R && R.mode === "measures") {
        const E = R.members.map(($) => {
          var z, oe;
          return { key: $, colorToken: (oe = (z = R.meta) == null ? void 0 : z[$]) == null ? void 0 : oe.colorToken };
        }), U = To(E, o.colors);
        R.members.forEach(($, z) => {
          S[$] = U[z];
        });
      }
    }
    return S;
  }, [s, o.mapping, o.colors]), P = b.useCallback(
    (S, T, R) => {
      const E = Fe(a, T);
      if (W(S, E)) return;
      let U = R === "geoPoint" && (E != null && E.latMember) && E.lngMember ? Vt(
        Vt(e, s, "lat", E.latMember, "numberDimension", i),
        s,
        "lng",
        E.lngMember,
        "numberDimension",
        i
      ) : Vt(e, s, S, T, R, i);
      const $ = c.canonicalTimeWell;
      if ($ && S !== $ && (f[$] ?? []).length === 0) {
        const z = Rp(a, E == null ? void 0 : E.cube);
        z && z.name !== T && !W($, z) && (U = Vt(U, s, $, z.name, "time", i));
      }
      t(U);
    },
    [W, a, t, e, s, i, c, f]
  ), I = s === "bar" && o.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : c.zones, A = I.left.map((S) => y.get(S)).filter(Boolean), j = I.bottom.map((S) => y.get(S)).filter(Boolean), q = (J = f.color) == null ? void 0 : J[0], B = ((re = f.y) == null ? void 0 : re.length) ?? 0, te = q && B > 1 ? `${B} values × ${((se = Fe(a, q)) == null ? void 0 : se.label) ?? "this split"} — one series per value per group.` : void 0, Y = c.hasLegend, X = (f.y ?? [])[0], ae = (S) => {
    var E, U, $, z;
    if (!S) return;
    const T = (E = o.mapping) == null ? void 0 : E.series;
    return (T && T.mode === "measures" ? ($ = (U = T.meta) == null ? void 0 : U[S]) == null ? void 0 : $.label : void 0) ?? ((z = Fe(a, S)) == null ? void 0 : z.label);
  }, ce = (S) => {
    var R, E, U, $;
    const T = (z, oe) => oe ? /* @__PURE__ */ l(Ng, { spec: e, update: t, axis: z, title: "Title", auto: ae(oe) }) : null;
    switch (S) {
      case "y":
        return T("y", X);
      // the single value axis
      case "x":
        return T("x", (E = (R = o.mapping) == null ? void 0 : R.category) == null ? void 0 : E.member);
      case "sy":
        return T("y", (U = f.sy) == null ? void 0 : U[0]);
      // scatter Y axis
      case "sx":
        return T("x", ($ = f.sx) == null ? void 0 : $[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ie = (S, T) => /* @__PURE__ */ l(
    hv,
    {
      spec: e,
      update: t,
      well: S,
      placed: f[S.id] ?? [],
      allPlaced: x,
      optionFor: (R) => Fe(a, R),
      colorFor: (R) => _[R],
      scope: C,
      blockReason: (R) => W(S.id, R),
      onAdd: (R, E) => P(S.id, R, E),
      badge: S.id === "y" ? L : void 0,
      orientation: T,
      note: S.id === "color" ? te : void 0,
      control: ce(S.id)
    },
    S.id
  ), V = () => {
    var E;
    const S = y.get("value"), T = (f.value ?? []).length > 0, R = o.familyOptions ?? {};
    return /* @__PURE__ */ v(de, { children: [
      /* @__PURE__ */ v("div", { className: "cv-edit-kpi-value", children: [
        S ? ie(S, "vertical") : null,
        T ? /* @__PURE__ */ l(
          cr,
          {
            label: "Time, range & display",
            summary: R.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(pv, { spec: e, update: t })
          }
        ) : null
      ] }),
      T ? /* @__PURE__ */ v(de, { children: [
        /* @__PURE__ */ l(
          cr,
          {
            label: "Comparison",
            summary: R.comparison === void 0 ? "None" : R.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(gv, { spec: e, update: t })
          }
        ),
        /* @__PURE__ */ l(
          cr,
          {
            label: "Trend",
            summary: Np(
              (E = R.sparkline) == null ? void 0 : E.granularity
            ),
            children: /* @__PURE__ */ l(vv, { spec: e, update: t })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !F || u ? /* @__PURE__ */ l(qg, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-actions", children: [
        /* @__PURE__ */ l(
          wg,
          {
            currentName: C.viewLocked ?? ((K = C.sourceCube) == null ? void 0 : K.name),
            hasFields: x.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ l(yg, { spec: e, update: t, cube: d, scopeCubes: M, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv-edit-overlay-body", children: [
      A.length > 0 ? /* @__PURE__ */ l("div", { className: O("cv-edit-sidebar", c.sidebarWidthClass), children: s === "kpi" ? V() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        A.map((S) => ie(S, "vertical"))
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ v("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Bg, { spec: e, update: t, empty: F && !u })
        ] }),
        j.length > 0 ? /* @__PURE__ */ v("div", { className: "cv-edit-overlay-bottom", children: [
          j.map((S) => ie(S, "horizontal")),
          Y && !F ? /* @__PURE__ */ l(Sg, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function yv(e, t) {
  const n = gs(e), r = t ?? (e == null ? void 0 : e.unit);
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
function ur(e) {
  const t = eo.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function kv({
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
  const s = Es((p) => t(p), n), c = r.spec, u = r.issues, m = u.length === 0, d = b.useCallback(
    (p) => {
      const h = ur(p);
      a({ spec: p, issues: h }), h.length === 0 && (o(p), s(p));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: d };
}
const wv = () => {
};
function Cv({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: i
}) {
  const o = rt(), { draft: s, issues: c, valid: u, committed: m, update: d } = kv({
    spec: e,
    onChange: t ?? wv,
    debounceMs: r
  }), p = o.get(s.chart.family), h = (p == null ? void 0 : p.queryless) ?? !1, f = m, y = (D) => {
    var W, L, _;
    return (((W = D == null ? void 0 : D.measures) == null ? void 0 : W.length) ?? 0) > 0 || (((L = D == null ? void 0 : D.dimensions) == null ? void 0 : L.length) ?? 0) > 0 || (((_ = D == null ? void 0 : D.timeDimensions) == null ? void 0 : _.some((P) => typeof P.granularity == "string")) ?? !1);
  }, k = (D) => {
    var W;
    return (((W = D == null ? void 0 : D.measures) == null ? void 0 : W.length) ?? 0) > 0;
  }, w = (p == null ? void 0 : p.requiresMeasure) ?? s.chart.family !== "table", C = h || y(s.query) && y(f.query) && (!w || k(s.query) && k(f.query)), x = w && !k(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", N = b.useCallback(
    (D) => {
      d({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...D }
        }
      });
    },
    [s, d]
  ), M = C ? /* @__PURE__ */ l(
    ga,
    {
      query: f.query ?? {},
      chart: f.chart,
      editing: !0,
      updateFamilyOptions: N
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: x }) }), F = n ? /* @__PURE__ */ v(H, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(Bi, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: O("cv-chart-editor", a ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ v(Ln, { variant: "destructive", children: [
          /* @__PURE__ */ l(qr, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(En, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(In, { children: /* @__PURE__ */ v("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((D, W) => /* @__PURE__ */ v("li", { children: [
              D.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: D.path }) : null,
              " ",
              D.message
            ] }, W)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Yn, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(bv, { spec: s, update: d, toolbar: F, children: M }) }) })
      ]
    }
  );
}
function Nv({
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
  className: p
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
      className: O("cv-editor-toolbar", p),
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
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ l(Pi, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ l(ji, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ l(Tl, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ l(Rl, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv-editor-toolbar-actions", children: [
          h ? /* @__PURE__ */ v(de, { children: [
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !o,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ l(Ol, {})
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
                children: /* @__PURE__ */ l(_l, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ v(
            H,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "cv-editor-toolbar-discard",
              children: [
                /* @__PURE__ */ l(Al, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(
            H,
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
                f ? /* @__PURE__ */ l(gt, {}) : /* @__PURE__ */ l(Bi, {}),
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
function Sv(e, t) {
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
function Mv(e, t) {
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
const xv = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Tv(e, t, n, r = Fs) {
  const a = xv[n], i = Math.min(a.w, r), o = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
  const a = Tv(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Rv(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const i = a.chart.familyOptions;
    i && typeof i.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return Ps(e, a);
}
function Ov(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function _v(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Av = 12, Dv = 900, Lv = 0.4;
function Ev(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Iv({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: i,
  onLayoutChange: o
}) {
  const [s, c] = zo(), u = e.grid ?? {}, m = u.cols ?? Av, d = u.rowHeight ?? 40, p = u.margin ?? [12, 12], h = u.containerPadding ?? [0, 0], f = Math.max(Lv, Math.min(1, c / Dv)), y = Math.round(f / 0.05) * 0.05, k = Math.max(8, Math.round(d * y)), w = [
    Math.round(p[0] * y),
    Math.round(p[1] * y)
  ], C = [
    Math.round(h[0] * y),
    Math.round(h[1] * y)
  ], x = b.useMemo(
    () => ({ [Is]: Ev(e.layout) }),
    [e.layout]
  ), N = b.useMemo(
    () => new Map(e.widgets.map((L) => [L.id, L])),
    [e.widgets]
  ), M = b.useRef(o);
  b.useEffect(() => {
    M.current = o;
  }, [o]);
  const F = b.useRef(e.layout);
  b.useEffect(() => {
    F.current = e.layout;
  }, [e.layout]);
  const D = b.useRef(null), W = b.useCallback(
    (L, _) => {
      const I = Sv(L, _).map((A) => ({ ...A }));
      Fv(F.current, I) || M.current(I);
    },
    []
  );
  return /* @__PURE__ */ l(pa, { spec: e, children: /* @__PURE__ */ l("div", { ref: s, className: "cv-editor-canvas", children: c > 0 ? /* @__PURE__ */ l(
    Ui,
    {
      width: c,
      layouts: x,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: k,
      margin: w,
      containerPadding: C,
      dragConfig: { enabled: !0, handle: `.${Rn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: W,
      children: e.layout.map((L) => {
        const _ = N.get(L.i);
        if (!_) return null;
        const P = _.id === t;
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
              "aria-pressed": P,
              onPointerDown: (I) => {
                D.current = { x: I.clientX, y: I.clientY };
              },
              onClick: (I) => {
                const A = D.current;
                A && Math.hypot(I.clientX - A.x, I.clientY - A.y) > 5 || n(_.id);
              },
              onKeyDown: (I) => {
                (I.key === "Enter" || I.key === " ") && (I.preventDefault(), n(_.id));
              },
              className: O(
                "cv-editor-widget",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring
                // (see .cv-editor-widget:focus-visible).
                P && "cv-editor-widget--selected"
              ),
              children: [
                /* @__PURE__ */ l(Or, { widget: _, editable: !0 }),
                /* @__PURE__ */ l("div", { "aria-hidden": !0, className: O(Rn, "cv-editor-widget-drag-layer") }),
                /* @__PURE__ */ v("div", { className: "cv-editor-widget-actions", children: [
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${_.title ?? _.type}`,
                      onClick: (I) => {
                        I.stopPropagation(), r(_.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Dl, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${_.title ?? _.type}`,
                      onClick: (I) => {
                        I.stopPropagation(), a(_.id);
                      },
                      className: "cv-editor-widget-action",
                      children: /* @__PURE__ */ l(Ll, {})
                    }
                  ),
                  /* @__PURE__ */ l(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${_.title ?? _.type}`,
                      onClick: (I) => {
                        I.stopPropagation(), i(_.id);
                      },
                      className: O("cv-editor-widget-action", "cv-editor-widget-action--danger"),
                      children: /* @__PURE__ */ l(_t, {})
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
function Fv(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const Pv = b.memo(Iv);
function $v(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function zv({
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
  const a = Ki({
    extensions: [Gi],
    editable: !0,
    content: $v(e.doc),
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
    /* @__PURE__ */ l(Vv, { editor: a }),
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
function Vv({ editor: e }) {
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
            children: /* @__PURE__ */ l(El, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(Il, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(Fl, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(Pl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l($l, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(zl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(Vl, {})
          }
        ),
        /* @__PURE__ */ l(
          Ue,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(jl, {})
          }
        )
      ]
    }
  );
}
const jv = Hr(
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
function Wv({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: O(jv({ variant: t }), e), ...n });
}
function Bv({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: i
}) {
  const { meta: o, isLoading: s } = ze(), c = b.useMemo(() => Gn(o), [o]), u = c.filter((p) => p.type === "view"), m = c.find((p) => p.name === e), d = b.useMemo(() => {
    const p = c.filter((k) => k.type === "cube"), h = p.some((k) => k.category), f = [], y = /* @__PURE__ */ new Map();
    for (const k of p) {
      const w = k.category ?? (h ? "More tables" : "Tables");
      y.has(w) || (y.set(w, []), f.push(w)), y.get(w).push(k);
    }
    return f.sort((k, w) => k === "More tables" ? 1 : w === "More tables" ? -1 : k.localeCompare(w)), f.map((k) => ({ label: k, items: y.get(k) }));
  }, [c]);
  return /* @__PURE__ */ v(Se, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(xe, { id: a, className: i, children: /* @__PURE__ */ l(Me, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(mr, { option: m }) : void 0 }) }),
    /* @__PURE__ */ v(Te, { children: [
      u.length > 0 ? /* @__PURE__ */ v(xr, { children: [
        /* @__PURE__ */ l(Tr, { children: "Saved datasets" }),
        u.map((p) => /* @__PURE__ */ l(he, { value: p.name, children: /* @__PURE__ */ l(mr, { option: p }) }, p.name))
      ] }) : null,
      d.map((p) => /* @__PURE__ */ v(xr, { children: [
        /* @__PURE__ */ l(Tr, { children: p.label }),
        p.items.map((h) => /* @__PURE__ */ l(he, { value: h.name, children: /* @__PURE__ */ l(mr, { option: h }) }, h.name))
      ] }, p.label))
    ] })
  ] });
}
function mr({ option: e }) {
  const t = e.type === "view" ? Kr : Wi;
  return /* @__PURE__ */ v("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(Wv, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const qv = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function Uv(e) {
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
function Kv({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), o = (s) => {
    s !== r.kind && a(Uv(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ue,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Se,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(xe, { children: /* @__PURE__ */ l(Me, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Te, { children: t.map((s) => /* @__PURE__ */ l(he, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ue, { label: "Control", children: /* @__PURE__ */ v(Se, { value: r.kind, onValueChange: (s) => o(s), children: [
      /* @__PURE__ */ l(xe, { children: /* @__PURE__ */ l(Me, {}) }),
      /* @__PURE__ */ l(Te, { children: lc.options.map((s) => /* @__PURE__ */ l(he, { value: s, children: qv[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(Hv, { control: r, onChange: a, variables: t })
  ] });
}
function Hv({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(Gv, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(Qv, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(Jv, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(Xv, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(Zv, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(eb, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Gv({
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
          Yv,
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
function Yv({
  selected: e,
  onChange: t
}) {
  const [n, r] = b.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s), t(hn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, o = a.size === 0 ? "Default set" : a.size === hn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Oe, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: o }),
      /* @__PURE__ */ l(tt, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(_e, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: hn.map((s) => {
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
                children: c ? /* @__PURE__ */ l(gt, { className: "cv-ed-icon-xs" }) : null
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
function Qv({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = Qe.options.filter((m) => c.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, i = n.filter((s) => s.type === "dateRange" || s.type === "time"), o = "__none__";
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(
      ue,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Se,
          {
            value: e.rangeVariable ?? o,
            onValueChange: (s) => t({ ...e, rangeVariable: s === o ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(xe, { children: /* @__PURE__ */ l(Me, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Te, { children: [
                /* @__PURE__ */ l(he, { value: o, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(he, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ue, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ l("div", { className: "cv-granularity-chips", children: Qe.options.map((s) => {
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
function Jv({
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
      Ze,
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
        action: /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", onClick: r, children: [
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
            H,
            {
              variant: "ghost",
              size: "icon",
              className: O("cv-ed-btn-8", "cv-ed-muted"),
              "aria-label": "Remove option",
              onClick: () => a(o),
              children: /* @__PURE__ */ l(_t, {})
            }
          )
        ] }, o)) })
      }
    )
  ] });
}
function Xv({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(de, { children: [
    /* @__PURE__ */ l(ue, { label: "From", children: /* @__PURE__ */ v(
      Se,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(xe, { children: /* @__PURE__ */ l(Me, {}) }),
          /* @__PURE__ */ v(Te, { children: [
            /* @__PURE__ */ l(he, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(he, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(he, { value: "dimensionOrMeasure", children: "All fields" })
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
          Bv,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Zv({
  control: e,
  onChange: t
}) {
  const n = b.useId();
  return /* @__PURE__ */ l(ue, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    pe,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function eb({
  control: e,
  onChange: t
}) {
  const n = b.useId(), r = (a, i) => /* @__PURE__ */ l(ue, { label: i, htmlFor: `${n}-${a}`, children: /* @__PURE__ */ l(
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
  return /* @__PURE__ */ v(de, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function tb(e) {
  return { schemaVersion: kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function nb(e) {
  const t = {
    schemaVersion: kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function rb(e, t) {
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
      /* @__PURE__ */ l(pa, { spec: tb(t), children: /* @__PURE__ */ l(lg, { createVariable: o, children: /* @__PURE__ */ l("div", { className: O(a && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        Cv,
        {
          fill: a,
          spec: nb(e),
          onChange: (s) => n(rb(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l(zv, { widget: e, onChange: n }) : /* @__PURE__ */ l(Kv, { widget: e, variables: t, onChange: n })
  ] });
}
function ab({
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
      an,
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
function ib({
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
  const u = i !== void 0, [m, d] = b.useState(a), p = r ? u ? i : m : !0, h = b.useId(), f = b.useCallback(() => {
    const y = !p;
    u || d(y), o == null || o(y);
  }, [p, u, o]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: O("cv-section", s),
      children: [
        /* @__PURE__ */ l(
          ab,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: p,
            onToggle: f,
            regionId: h
          }
        ),
        p ? /* @__PURE__ */ l("div", { id: h, "data-slot": "section-body", className: "cv-section-body", children: c }) : null
      ]
    }
  );
}
function ob(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function sb(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function lb(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function cb(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function ub(e, t) {
  switch (e) {
    case "chart":
      return sb(t);
    case "text":
      return lb(t);
    case "input":
      return cb(t);
  }
}
function mb(e) {
  return { name: e, type: "string" };
}
function db(e) {
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
const Mi = {
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
function fb({
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
    t(e.map((d, p) => p === u ? hb(d, m) : d));
  }, o = (u) => t(e.filter((m, d) => d !== u)), s = () => t([...e, mb(a())]), c = (u, m) => {
    const d = u + m;
    if (d < 0 || d >= e.length) return;
    const p = e.slice();
    [p[u], p[d]] = [p[d], p[u]], t(p);
  };
  return /* @__PURE__ */ l(
    ib,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: s, children: [
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
        /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: s, children: [
          /* @__PURE__ */ l(Nt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: e.map((u, m) => /* @__PURE__ */ l(
        pb,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((d, p) => p !== m && d.name === u.name && u.name !== ""),
          onChange: (d) => i(m, d),
          onRemove: () => o(m),
          onMove: (d) => c(m, d)
        },
        m
      )) })
    }
  );
}
function hb(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = db(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function pb({
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
              children: s ? /* @__PURE__ */ l(tt, {}) : /* @__PURE__ */ l(an, {})
            }
          ),
          /* @__PURE__ */ l(
            pe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv-variable-row-name"
            }
          ),
          /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: Mi[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv-variable-row-actions", children: [
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => o(-1),
                children: /* @__PURE__ */ l(Wr, {})
              }
            ),
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted"),
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => o(1),
                children: /* @__PURE__ */ l(Br, {})
              }
            ),
            /* @__PURE__ */ l(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: O("cv-ed-btn-7", "cv-ed-muted", "cv-ed-hover-danger"),
                "aria-label": "Remove variable",
                onClick: i,
                children: /* @__PURE__ */ l(_t, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv-variable-row-body", children: [
          /* @__PURE__ */ l(ue, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ v(Se, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ l(xe, { children: /* @__PURE__ */ l(Me, {}) }),
            /* @__PURE__ */ l(Te, { children: Xi.options.map((d) => /* @__PURE__ */ l(he, { value: d, children: Mi[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ l(
            ue,
            {
              label: "Label",
              htmlFor: m,
              hint: "Optional human label for controls.",
              className: "cv-ed-row-tight",
              children: /* @__PURE__ */ l(
                pe,
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
            Ze,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ l(gb, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function gb({
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
    return /* @__PURE__ */ l(ue, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
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
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : vb(e.default);
  return /* @__PURE__ */ l(ue, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    pe,
    {
      id: n,
      value: a,
      placeholder: bb(e.type),
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
function vb(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function bb(e) {
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
function sy({
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
  families: p,
  className: h
}) {
  var E, U;
  const [f, y] = b.useState(e), [k, w] = b.useState(e);
  b.useEffect(() => {
    y(e), w(e);
  }, [e]);
  const [C, x] = b.useState(null), N = b.useRef(0), [M, F] = b.useState(null), D = b.useRef(C), W = b.useRef(M), L = b.useRef(f);
  b.useEffect(() => {
    D.current = C, W.current = M, L.current = f;
  });
  const _ = b.useRef(null);
  _.current === null && (_.current = i ?? ob());
  const P = i ?? _.current, I = Es(
    ($) => r == null ? void 0 : r($),
    o
  ), A = b.useCallback(
    ($) => {
      N.current = Date.now(), y((z) => {
        const oe = $(z);
        return I(oe), oe;
      });
    },
    [I]
  ), j = b.useRef(t);
  b.useEffect(() => {
    if (!t || t === j.current) return;
    const $ = 500;
    let z = null;
    const oe = () => {
      var me;
      const Ve = Date.now() - N.current;
      if (Ve < $) {
        z = setTimeout(oe, $ - Ve);
        return;
      }
      j.current = t;
      const je = /* @__PURE__ */ new Set();
      ((me = W.current) == null ? void 0 : me.kind) === "widget" && je.add(W.current.id), D.current && je.add(D.current);
      const G = wb(t, L.current, je);
      y(G), n == null || n(G);
    };
    return oe(), () => {
      z && clearTimeout(z);
    };
  }, [t]);
  const q = b.useCallback(
    ($) => {
      const z = ub($, P());
      A((oe) => Ps(oe, z)), x(z.id), F({ kind: "widget", id: z.id });
    },
    [A, P]
  ), B = b.useCallback(($) => x($), []), te = b.useCallback(($) => {
    x($), F({ kind: "widget", id: $ });
  }, []), Y = b.useCallback(
    ($) => {
      A((z) => Ov(z, $)), x((z) => z === $ ? null : z), F((z) => (z == null ? void 0 : z.kind) === "widget" && z.id === $ ? null : z);
    },
    [A]
  ), X = b.useCallback(
    ($) => {
      const z = P();
      A((oe) => Rv(oe, $, z)), x(z);
    },
    [A, P]
  ), ae = b.useCallback(
    ($) => A((z) => _v(z, $)),
    [A]
  ), ce = b.useCallback(
    ($) => A((z) => {
      const oe = Mv(z.layout, $);
      return kb(z.layout, oe) ? z : { ...z, layout: oe };
    }),
    [A]
  ), ie = b.useCallback(
    ($) => A((z) => ({ ...z, name: $ || void 0 })),
    [A]
  ), V = b.useCallback(
    ($) => A((z) => ({ ...z, variables: $ })),
    [A]
  ), J = b.useDeferredValue(f), re = b.useMemo(
    () => vr.safeParse(J),
    [J]
  ), se = b.useCallback(() => {
    const $ = vr.safeParse(f);
    $.success && (a == null || a($.data), w(f));
  }, [f, a]), K = f !== k, S = (M == null ? void 0 : M.kind) === "widget" ? f.widgets.find(($) => $.id === M.id) ?? null : null;
  b.useEffect(() => {
    (M == null ? void 0 : M.kind) === "widget" && !f.widgets.some(($) => $.id === M.id) && F(null);
  }, [M, f.widgets]);
  const T = b.useCallback(() => F(null), []), R = (M == null ? void 0 : M.kind) === "variables" ? "Dashboard variables" : S ? S.title ?? `${yb(S.type)} widget` : "";
  return /* @__PURE__ */ l(ha, { families: p, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((U = (E = f.grid) == null ? void 0 : E.margin) == null ? void 0 : U[0]) ?? 12 },
      className: O("cv-dashboard-editor", h),
      children: [
        /* @__PURE__ */ l(
          Nv,
          {
            name: f.name ?? "",
            onNameChange: ie,
            onAdd: q,
            onEditVariables: () => F({ kind: "variables" }),
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            onDiscard: d,
            discardDisabled: !K,
            onSave: a ? se : void 0,
            saveDisabled: !re.success || !K,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        re.success ? null : /* @__PURE__ */ v("p", { className: "cv-dashboard-editor-validation", children: [
          re.error.issues.length,
          " validation issue",
          re.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: M ? null : /* @__PURE__ */ l(
          Pv,
          {
            spec: f,
            selectedId: C,
            onSelect: B,
            onEdit: te,
            onDuplicate: X,
            onDelete: Y,
            onLayoutChange: ce
          }
        ) }),
        M ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": R,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ v("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ v("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", onClick: T, children: [
                    /* @__PURE__ */ l(Ur, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: R })
                ] }),
                S ? /* @__PURE__ */ v(
                  H,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv-ed-danger",
                    onClick: () => Y(S.id),
                    children: [
                      /* @__PURE__ */ l(_t, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ l(Yn, { label: R, resetKey: f, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: M.kind === "variables" ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(fb, { variables: f.variables, onChange: V }) }) : (S == null ? void 0 : S.type) === "chart" ? /* @__PURE__ */ l(
                Si,
                {
                  fill: !0,
                  widget: S,
                  variables: f.variables,
                  onChange: ae,
                  onVariablesChange: V
                }
              ) : S ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Si,
                {
                  widget: S,
                  variables: f.variables,
                  onChange: ae,
                  onVariablesChange: V
                }
              ) }) : null }) })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function yb(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function kb(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function wb(e, t, n) {
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
  St as AUTO_GRANULARITY,
  bu as AreaChartFamily,
  Zc as AreaFamilyOptionsSchema,
  rc as AxesOptionsSchema,
  $a as AxisOptionsSchema,
  Yb as BUILTIN_CHART_FAMILIES,
  Be as BUILTIN_DEFAULTS,
  We as BUILTIN_FAMILY_OPTION_SCHEMAS,
  gu as BarChartFamily,
  Jc as BarFamilyOptionsSchema,
  Is as CANONICAL_BREAKPOINT,
  Je as ChartColorTokenSchema,
  bv as ChartEditOverlay,
  Cv as ChartEditor,
  Xl as ChartFamilySchema,
  ea as ChartInteractionProvider,
  Ji as ChartOptionsSchema,
  xo as ChartRenderer,
  eo as ChartSpecSchema,
  oc as ChartTransformSchema,
  iy as ChartView,
  uc as ChartWidgetSchema,
  ac as ColorAssignmentSchema,
  au as CondFormatRuleSchema,
  ga as CubeChart,
  jf as CubeChartSpec,
  Qi as CubeQuerySchema,
  Bn as CubeVizContext,
  ny as CubeVizProvider,
  zn as DEFAULT_COLOR_RAMP,
  Fs as DEFAULT_COLS,
  Qa as DEFAULT_MARK_THEME,
  dn as DEFAULT_TRANSFORM_WINDOW,
  Mr as DEFAULT_UNIT_CONVERSIONS,
  Rn as DRAG_HANDLE_CLASS,
  ay as Dashboard,
  sy as DashboardEditor,
  pa as DashboardProvider,
  vr as DashboardSpecSchema,
  pr as DateRangeSchema,
  su as EMPTY_FAMILY_DEFAULT,
  Wa as EM_DASH,
  Pv as EditorCanvas,
  Nv as EditorToolbar,
  ha as FamilyRegistryOverride,
  dg as FilterBuilder,
  Gl as FilterOperatorSchema,
  Zl as FormatKindSchema,
  Gr as FormatOptionsSchema,
  zc as GRANULARITY_PATTERN,
  Hl as GranularityChoiceSchema,
  Qe as GranularitySchema,
  pc as GridConfigSchema,
  Ou as HeatmapChartFamily,
  ou as HeatmapFamilyOptionsSchema,
  lc as InputControlKindSchema,
  cc as InputControlSchema,
  Kv as InputWidgetEditor,
  dc as InputWidgetSchema,
  sh as InputWidgetView,
  Du as KpiFamily,
  nu as KpiFamilyOptionsSchema,
  hc as LayoutItemSchema,
  Yl as LeafFilterSchema,
  tc as LegendOptionsSchema,
  vu as LineChartFamily,
  Xc as LineFamilyOptionsSchema,
  le as MemberSchema,
  Fa as OrderDirSchema,
  Jl as OrderSpecSchema,
  wu as PieChartFamily,
  eu as PieFamilyOptionsSchema,
  gr as QueryFilterSchema,
  Fn as ReferenceLineOptSchema,
  Or as RenderWidget,
  kt as SCHEMA_VERSION,
  Kl as ScalarSchema,
  Nu as ScatterChartFamily,
  tu as ScatterFamilyOptionsSchema,
  ec as SeriesMappingSchema,
  Pa as SeriesMetaSchema,
  to as SpecSchema,
  ru as TableColumnOptSchema,
  Uu as TableFamily,
  iu as TableFamilyOptionsSchema,
  zv as TextWidgetEditor,
  mc as TextWidgetSchema,
  Bf as TextWidgetView,
  Ql as TimeDimensionSchema,
  sc as TipTapDocSchema,
  nc as TooltipOptionsSchema,
  ic as TransformKindSchema,
  Nn as VarRefSchema,
  gc as VariableDeclSchema,
  Xi as VariableTypeSchema,
  Yi as VariableValueSchema,
  fb as VariablesPanel,
  Ko as WidgetChrome,
  Si as WidgetEditPanel,
  fc as WidgetSpecSchema,
  oy as adaptiveGranularity,
  Ps as appendWidget,
  cm as areaChartFamily,
  Xa as assignColors,
  fa as autoGranularityFor,
  Cf as axisKey,
  sm as barChartFamily,
  ua as buildFamilyRegistry,
  ty as builtinCharts,
  $e as builtinFamilyDescriptors,
  $n as builtinFamilyRegistry,
  Ic as createCubeClient,
  ob as createIdFactory,
  Do as createQueryResolver,
  Eo as createUnitsFormatter,
  jm as createVariableStore,
  jc as datePattern,
  br as deepMerge,
  ca as defaultChartFamilies,
  db as defaultForType,
  Jr as defaultFormatter,
  Fc as fetchMeta,
  Zb as formatCategory,
  Kt as formatDateValue,
  Tp as geoPointId,
  Oo as granularitiesForSpan,
  _o as granularityOptionsFor,
  dm as heatmapChartFamily,
  Tt as isEmptyValue,
  ke as isVarRef,
  fm as kpiChartFamily,
  lm as lineChartFamily,
  Ec as loadSpec,
  Qr as looksLikeIsoDate,
  Xr as makeChartFormat,
  Xb as makeDateFormatter,
  ey as makeFormatter,
  Mv as mergeLayout,
  Wn as mergeUnitConversions,
  sb as newChartWidget,
  cb as newInputWidget,
  lb as newTextWidget,
  mb as newVariable,
  ub as newWidget,
  Ro as normalize,
  Sv as pickCanonicalLayout,
  um as pieChartFamily,
  Tv as placeNewItem,
  Sf as quantityLabel,
  da as rangeSpanDays,
  Ov as removeWidget,
  _v as replaceWidget,
  Of as resolveChart,
  Mo as resolveMarkTheme,
  gm as resolveOptions,
  lu as resolveOptionsWith,
  Ao as resolveQuery,
  Im as resolveRelativeDateRange,
  To as resolveSeriesColors,
  Pm as resolveValue,
  Qb as safeLoadSpec,
  mm as scatterChartFamily,
  hm as tableChartFamily,
  no as toDate,
  xm as toResultAnnotation,
  kv as useChartEditorState,
  oo as useChartInteractions,
  zo as useContainerWidth,
  ze as useCubeMeta,
  Po as useCubeQuery,
  Le as useCubeVizContext,
  $o as useDashboard,
  Es as useDebouncedCallback,
  Un as useDisplayUnit,
  rt as useFamilyRegistry,
  ry as useFormatter,
  ar as useNormalizedSeries,
  sn as useOptionalDashboard,
  Jb as validateSpec
};
//# sourceMappingURL=index.js.map
